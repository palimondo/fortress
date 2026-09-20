"""Generate the probe's shadow sources from the tracked ones by textual patch.

Nothing tracked is modified: the copies are written under <shadow-src>, compiled
into <shadow-classes>, and put FIRST on the run-time classpath, ahead of
ProjectFortress/build.  usage: shadow-patch.py <src-root> <shadow-src>

Three shadows, each one edit:

  DesugarPhase         tolerate a missing type-checker map, so DESUGAR can run
                       with TYPECHECK left out of the phase order (Desugarer
                       passes the map on only to CaseExprDesugarer).
  CodeGenerationPhase  wrap the whole per-component body in try/catch, and print
                       the stack trace of whatever ends it.
  CodeGen              wrap the per-declaration loop of forComponent in
                       try/catch, so one refused declaration does not end the
                       run and the whole hole list comes out of one pass.
"""
import sys, io, os

src, shadow = sys.argv[1], sys.argv[2]

def patch(rel, edits, out):
    t = io.open(os.path.join(src, rel), encoding="utf-8").read()
    for old, new in edits:
        assert old in t, rel + ": anchor not found: " + old[:60]
        t = t.replace(old, new, 1)
    p = os.path.join(shadow, out)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    io.open(p, "w", encoding="utf-8").write(t)

# ---------------------------------------------------------------- DesugarPhase
patch("compiler/phases/DesugarPhase.java", [(
"        Desugarer.ComponentResult componentDSR = Desugarer.desugarComponents(previous.components(), apiEnv, previous.typeCheckers());",
"""        // PROBE: TYPECHECK may be absent from the phase order, in which case the
        // previous result carries no type-checker map and typeCheckers() throws.
        // Desugarer passes the map on only to CaseExprDesugarer, so an empty map
        // is enough for every other desugaring to run.
        java.util.Map<com.sun.fortress.nodes.APIName, com.sun.fortress.scala_src.typechecker.STypeChecker> __tcs;
        try { __tcs = previous.typeCheckers(); }
        catch (Error __e) {
            __tcs = new java.util.HashMap<com.sun.fortress.nodes.APIName, com.sun.fortress.scala_src.typechecker.STypeChecker>();
            System.out.println("@@PROBE DesugarPhase: no type-checker map (TYPECHECK omitted); using an empty one");
        }
        Desugarer.ComponentResult componentDSR = Desugarer.desugarComponents(previous.components(), apiEnv, __tcs);"""
)], "com/sun/fortress/compiler/phases/DesugarPhase.java")

# ------------------------------------------------------------- TypeCheckPhase
# Tolerant mode (-Dprobe.tolerant=1): report what the checker found and let the
# partially checked result travel on to DESUGAR / OVERLOADREWRITE / CODEGEN,
# instead of ending the run with a MultipleStaticError.
patch("compiler/phases/TypeCheckPhase.java", [
("""        if (!apiSR.isSuccessful()) {
            throw new MultipleStaticError(apiSR.errors());
        }""",
 """        if (!apiSR.isSuccessful()) {
            if (Boolean.getBoolean("probe.tolerant")) {
                System.out.println("@@TC APIS-NOT-SUCCESSFUL\\t"
                                   + edu.rice.cs.plt.iter.IterUtil.sizeOf(apiSR.errors()) + " errors kept");
                if (Boolean.getBoolean("probe.dumpErrors"))
                    for (StaticError __e : apiSR.errors())
                        System.out.println("@@TC APIERR\\t" + __e.toString().replace('\\n', ' ').replace('\\t', ' '));
            } else throw new MultipleStaticError(apiSR.errors());
        }"""),
("""        if (!componentSR.isSuccessful()) {
            throw new MultipleStaticError(componentSR.errors());
        }""",
 """        if (!componentSR.isSuccessful()) {
            if (Boolean.getBoolean("probe.tolerant")) {
                System.out.println("@@TC COMPONENTS-NOT-SUCCESSFUL\\t"
                                   + edu.rice.cs.plt.iter.IterUtil.sizeOf(componentSR.errors()) + " errors kept");
                if (Boolean.getBoolean("probe.dumpErrors"))
                    for (StaticError __e : componentSR.errors())
                        System.out.println("@@TC COMPERR\\t" + __e.toString().replace('\\n', ' ').replace('\\t', ' '));
            } else throw new MultipleStaticError(componentSR.errors());
        }"""),
], "com/sun/fortress/compiler/phases/TypeCheckPhase.java")

# -------------------------------------------------------------- StaticChecker
# Tolerant mode: (a) a compilation unit whose check throws is reported and its
# unchecked AST kept, instead of ending the run; (b) the component is checked
# one top-level declaration at a time, so a declaration the checker crashes on
# is dropped and every other declaration keeps its type annotations.
patch("compiler/StaticChecker.java", [
("""        for (Map.Entry<APIName, ApiIndex> api : apis.entrySet()) {
            TypeCheckerResult checked = checkCompilationUnit(api.getValue(), env, true);""",
 """        for (Map.Entry<APIName, ApiIndex> api : apis.entrySet()) {
            TypeCheckerResult checked;
            if (Boolean.getBoolean("probe.tolerant")) {
                try {
                    checked = checkCompilationUnit(api.getValue(), env, true);
                    System.out.println("@@TC API\\t" + api.getKey() + "\\terrors="
                                       + edu.rice.cs.plt.iter.IterUtil.sizeOf(checked.errors()));
                } catch (Throwable __t) {
                    StackTraceElement[] __st = __t.getStackTrace();
                    System.out.println("@@TC API-CRASH\\t" + api.getKey() + "\\t" + __t.getClass().getName()
                                       + "\\t" + (__st.length > 0 ? __st[0].toString() : "?")
                                       + "\\t" + String.valueOf(__t.getMessage()).replace('\\n', ' '));
                    checked = new TypeCheckerResult(api.getValue().ast(), IterUtil.<StaticError>empty());
                }
            } else checked = checkCompilationUnit(api.getValue(), env, true);"""),
("""            TypeCheckerResult checked = checkCompilationUnit(component.getValue(),
                                                             env, false);""",
 """            TypeCheckerResult checked;
            if (Boolean.getBoolean("probe.tolerant")) {
                try {
                    checked = checkCompilationUnit(component.getValue(), env, false);
                    System.out.println("@@TC COMPONENT\\t" + component.getKey() + "\\terrors="
                                       + edu.rice.cs.plt.iter.IterUtil.sizeOf(checked.errors()));
                } catch (Throwable __t) {
                    StackTraceElement[] __st = __t.getStackTrace();
                    System.out.println("@@TC COMPONENT-CRASH\\t" + component.getKey() + "\\t" + __t.getClass().getName()
                                       + "\\t" + (__st.length > 0 ? __st[0].toString() : "?")
                                       + "\\t" + String.valueOf(__t.getMessage()).replace('\\n', ' '));
                    checked = new TypeCheckerResult(component.getValue().ast(), IterUtil.<StaticError>empty());
                }
            } else checked = checkCompilationUnit(component.getValue(), env, false);"""),
("                    ast = (Component)typeChecker.typeCheck(component_ast);",
 """                    if (Boolean.getBoolean("probe.tolerant")) {
                        // One top-level declaration at a time.  Decls.checkDecls maps
                        // check() over the component's declarations with no extra
                        // environment, so this is the same traversal, split up.
                        java.util.List<com.sun.fortress.nodes.Decl> __nd =
                            new java.util.ArrayList<com.sun.fortress.nodes.Decl>();
                        for (com.sun.fortress.nodes.Decl __d : component_ast.getDecls()) {
                            int __before = Lists.toJavaList(typeChecker.getErrors()).size();
                            String __what = com.sun.fortress.nodes_util.NodeUtil.getSpan(__d).toString();
                            try {
                                __nd.add((com.sun.fortress.nodes.Decl) typeChecker.typeCheck(__d));
                                int __after = Lists.toJavaList(typeChecker.getErrors()).size();
                                System.out.println("@@TC DECL-OK\\t" + __d.getClass().getSimpleName()
                                                   + "\\t" + __what + "\\terrors=" + (__after - __before));
                            } catch (Throwable __t) {
                                StackTraceElement[] __st = __t.getStackTrace();
                                System.out.println("@@TC DECL-CRASH\\t" + __d.getClass().getSimpleName()
                                                   + "\\t" + __what + "\\t" + __t.getClass().getName()
                                                   + "\\t" + (__st.length > 0 ? __st[0].toString() : "?")
                                                   + "\\t" + String.valueOf(__t.getMessage()).replace('\\n', ' ').replace('\\t', ' '));
                                // Keep the UNCHECKED declaration: dropping it punches a
                                // hole in the component's trait table and the failure
                                // moves to every declaration that names it.
                                __nd.add(__d);
                                for (int __i = 0; __i < Math.min(6, __st.length); __i++)
                                    System.out.println("@@TC DECLAT\\t" + __what + "\\t" + __st[__i]);
                            }
                        }
                        ast = new Component(component_ast.getInfo(), component_ast.getName(),
                                            component_ast.getImports(), __nd,
                                            component_ast.getComprises(), component_ast.is_native(),
                                            component_ast.getExports());
                    } else
                    ast = (Component)typeChecker.typeCheck(component_ast);"""),
], "com/sun/fortress/compiler/StaticChecker.java")

# --------------------------------------------------------- CodeGenerationPhase
patch("compiler/phases/CodeGenerationPhase.java", [
("            TypeAnalyzer sta = newTypeAnalyzer(new TraitTable(ci, apiEnv));",
 "            try {  // PROBE\n            TypeAnalyzer sta = newTypeAnalyzer(new TraitTable(ci, apiEnv));"),
("""            CodeGen c = new CodeGen(component, sta, pa, lbv, fvt, ci, apiEnv);
            component.accept(c);""",
 """            CodeGen c = new CodeGen(component, sta, pa, lbv, fvt, ci, apiEnv);
            component.accept(c);
            System.out.println("@@CG COMPONENT-OK\\t" + component.getName());
            } catch (Throwable __t) {   // PROBE: what ended code generation here?
                System.out.println("@@CG COMPONENT-FAIL\\t" + component.getName()
                                   + "\\t" + __t.getClass().getName()
                                   + "\\t" + String.valueOf(__t.getMessage()).replace('\\n', ' '));
                StackTraceElement[] __st = __t.getStackTrace();
                for (int __i = 0; __i < Math.min(80, __st.length); __i++)
                    System.out.println("@@CG CAT\\t" + __st[__i]);
            }"""),
], "com/sun/fortress/compiler/phases/CodeGenerationPhase.java")

# -------------------------------------------------------------------- CodeGen
patch("compiler/codegen/CodeGen.java", [
("""        for (Map.Entry<Id,TypeConsIndex> ent : some_traits.entrySet()) {
            TypeConsIndex tci = ent.getValue();""",
 """        for (Map.Entry<Id,TypeConsIndex> ent : some_traits.entrySet()) {
            try {   // PROBE: one trait whose inherited methods cannot be computed
                    // must not end the whole component.
            TypeConsIndex tci = ent.getValue();"""),
("""                }
               
            }
        }
        
        this.topLevelOverloads =""",
 """                }
               
            }
            } catch (Throwable __t) {   // PROBE
                StackTraceElement[] __st = __t.getStackTrace();
                System.out.println("@@CG CTORFAIL\\t" + ent.getKey()
                                   + "\\t" + com.sun.fortress.nodes_util.NodeUtil.getSpan((com.sun.fortress.nodes.ASTNode) ent.getValue().ast())
                                   + "\\t" + __t.getClass().getName()
                                   + "\\t" + (__st.length > 0 ? __st[0].toString() : "?")
                                   + "\\t" + String.valueOf(__t.getMessage()).replace('\\n', ' ').replace('\\t', ' '));
            }
        }
        
        this.topLevelOverloads ="""),
("        Set<String> overloaded_names_and_sigs = new HashSet<String>();\n",
 """        Set<String> overloaded_names_and_sigs = new HashSet<String>();
        // PROBE: OverloadSet.split's exclusion tests do not terminate in any
        // usable time on this library's comprises hierarchy.  With
        // -Dprobe.skipOverloads=true the overload dispatch methods are not
        // generated at all, so the per-declaration loop below is reached.
        if (Boolean.getBoolean("probe.skipOverloads")) {
            System.out.println("@@CG OVLSKIP\\t" + api_name + "\\tsets=" + size_partitioned_overloads.size());
            return overloaded_names_and_sigs;
        }
"""),
("                Functional one_f = fs.iterator().next();\n",
 """                Functional one_f = fs.iterator().next();
                try {   // PROBE: one refused overload set must not end the component
"""),
("                overloaded_names_and_sigs.addAll(os.getOtherKeys());\n",
 """                overloaded_names_and_sigs.addAll(os.getOtherKeys());
                } catch (Throwable __t) {
                    StackTraceElement[] __st = __t.getStackTrace();
                    String __where = __st.length > 0 ? (__st[0].getClassName() + "." + __st[0].getMethodName()
                                                        + ":" + __st[0].getLineNumber()) : "?";
                    System.out.println("@@CG OVLFAIL\\t" + name.stringName() + "/" + i
                                       + "\\t" + __t.getClass().getName() + "\\t" + __where
                                       + "\\t" + String.valueOf(__t.getMessage()).replace('\\n', ' ').replace('\\t', ' '));
                    for (int __i = 0; __i < Math.min(10, __st.length); __i++)
                        System.out.println("@@CG OVLAT\\t" + name.stringName() + "/" + i + "\\t" + __st[__i]);
                }
"""),
("\n    public void forComponent(Component x) {",
 """
    // PROBE helper: a short name for a top-level declaration.
    static String probeDeclName(Decl d) {
        String kind = d.getClass().getSimpleName();
        String name;
        try {
            if (d instanceof TraitObjectDecl) name = ((TraitObjectDecl) d).getHeader().getName().toString();
            else if (d instanceof FnDecl) name = ((FnDecl) d).getHeader().getName().toString();
            else if (d instanceof VarDecl) name = ((VarDecl) d).getLhs().toString();
            else name = d.toString();
        } catch (Throwable t) { name = "?"; }
        if (name.length() > 90) name = name.substring(0, 90) + "...";
        return kind + " " + name.replace('\\n', ' ').replace('\\t', ' ');
    }

    public void forComponent(Component x) {"""),
("""        for (Decl d : x.getDecls()) {
            if (d instanceof ObjectDecl) {
                ObjectDecl od = (ObjectDecl) d;
                TraitTypeHeader tth = od.getHeader();
                CodeGen newcg = new CodeGen(this,
                        typeAnalyzer.extendJ(tth.getStaticParams(), tth.getWhereClause()));
                newcg.forObjectDeclPrePass(od);
            } else if (d instanceof VarDecl) {
                this.forVarDeclPrePass((VarDecl)d);
            }
        }""",
 """        for (Decl d : x.getDecls()) {
            // PROBE: the pre-pass over objects and top-level variables runs before
            // the declaration loop below; one failure here must not end the run.
            try {
            if (d instanceof ObjectDecl) {
                ObjectDecl od = (ObjectDecl) d;
                TraitTypeHeader tth = od.getHeader();
                CodeGen newcg = new CodeGen(this,
                        typeAnalyzer.extendJ(tth.getStaticParams(), tth.getWhereClause()));
                newcg.forObjectDeclPrePass(od);
            } else if (d instanceof VarDecl) {
                this.forVarDeclPrePass((VarDecl)d);
            }
            } catch (Throwable __t) {
                StackTraceElement[] __st = __t.getStackTrace();
                String __where = __st.length > 0 ? (__st[0].getClassName() + "." + __st[0].getMethodName()
                                                    + ":" + __st[0].getLineNumber()) : "?";
                System.out.println("@@CG PREFAIL\\t" + probeDeclName(d) + "\\t" + NodeUtil.getSpan(d)
                                   + "\\t" + __t.getClass().getName() + "\\t" + __where
                                   + "\\t" + String.valueOf(__t.getMessage()).replace('\\n', ' ').replace('\\t', ' '));
                for (int __i = 0; __i < Math.min(10, __st.length); __i++)
                    System.out.println("@@CG PREAT\\t" + probeDeclName(d) + "\\t" + __st[__i]);
                inATrait = false; inAnObject = false; inABlock = false;
                currentTraitObjectDecl = null; traitOrObjectName = null;
                emittingFunctionalMethodWrappers = false; mv = null;
            }
        }"""),
("""        for ( Decl d : x.getDecls() ) {
            d.accept(this);
        }""",
 """        for ( Decl d : x.getDecls() ) {
            // PROBE: one declaration that code generation refuses must not end
            // the run; record it and go on to the next.
            try {
                d.accept(this);
                System.out.println("@@CG OK\\t" + probeDeclName(d) + "\\t" + NodeUtil.getSpan(d));
            } catch (Throwable __t) {
                StackTraceElement[] __st = __t.getStackTrace();
                String __where = __st.length > 0 ? (__st[0].getClassName() + "." + __st[0].getMethodName()
                                                    + ":" + __st[0].getLineNumber()) : "?";
                String __msg = String.valueOf(__t.getMessage()).replace('\\n', ' ').replace('\\t', ' ');
                System.out.println("@@CG FAIL\\t" + probeDeclName(d) + "\\t" + NodeUtil.getSpan(d)
                                   + "\\t" + __t.getClass().getName() + "\\t" + __where + "\\t" + __msg);
                for (int __i = 0; __i < Math.min(10, __st.length); __i++)
                    System.out.println("@@CG AT\\t" + probeDeclName(d) + "\\t" + __st[__i]);
                // PROBE: put back the state that forTraitDecl / forObjectDecl set on
                // the way in and clear on the way out.  There is no try/finally there,
                // so a caught failure would otherwise leave inATrait / inAnObject set
                // and every later top-level function would take the method path with a
                // null currentTraitObjectDecl -- a failure of the probe, not of codegen.
                inATrait = false;
                inAnObject = false;
                inABlock = false;
                currentTraitObjectDecl = null;
                traitOrObjectName = null;
                emittingFunctionalMethodWrappers = false;
                mv = null;
            }
        }"""),
], "com/sun/fortress/compiler/codegen/CodeGen.java")

print("shadow sources written to " + shadow)
