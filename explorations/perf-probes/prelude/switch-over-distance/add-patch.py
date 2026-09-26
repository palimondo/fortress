"""Edits made on top of desugar-codegen's shadow StaticChecker.java, in place.

usage: add-patch.py <shadow-src>

<shadow-src> holds the shadow sources that ../desugar-codegen/shadow-patch.py wrote from
the tracked ones; this script edits the copy of StaticChecker.java there, and writes two
more shadows from the tracked sources (Desugarer, NodeComparator; the end of this file).
Run from $FORTRESS_HOME.  Nothing tracked is modified.  Every edit is inert unless its
-D switch is given (probe.all; probe.tolerant; probe.bottomCompare).

With -Dprobe.all=true, StaticChecker.checkCompilationUnit
  * runs every stage of the check whatever the earlier stages reported: the tracked
    method returns after the hierarchy check, after the api-type extraction, after the
    second well-formedness check and after the overloading check whenever an error
    exists (StaticChecker.java:191-193, :200-201, :269-272, :276-279 on the tree of
    2026-09-26, commit 8f806ba67);
  * catches a crash in any stage, prints it and goes on;
  * prints every error each stage added, one line each:
        @@SC ERR <tab> api|component <name> <tab> <stage> <tab> <the error, on one line>
    and a count per stage:
        @@SC STAGE <tab> api|component <name> <tab> <stage> <tab> errors=<n>
Stages: hierarchy, apiextract (components), acyclic, wellformed1, typecheck
(components), wellformed2, overloading, export (components), variance (components,
compile-path setting only, as in the tracked method).
"""
import io, os, sys

shadow = sys.argv[1]
p = os.path.join(shadow, "com/sun/fortress/compiler/StaticChecker.java")
t = io.open(p, encoding="utf-8").read()

def rep(old, new):
    global t
    assert t.count(old) == 1, ("anchor not unique or missing", old[:70], t.count(old))
    t = t.replace(old, new, 1)

CATCH = "catch (RuntimeException | Error __t) { if (!PROBE_ALL) throw __t; probeCrash(__unit, \"%s\", __t); }"

# helpers
rep("    private static CompilationUnitIndex buildIndex(CompilationUnit ast, boolean isApi) {",
"""    // PROBE (switch-over-distance): -Dprobe.all=true runs every stage, see add-patch.py.
    static final boolean PROBE_ALL = Boolean.getBoolean("probe.all");
    static int probeStage(String unit, String stage, List<StaticError> errors, int mark) {
        if (!PROBE_ALL) return errors.size();
        System.out.println("@@SC STAGE\\t" + unit + "\\t" + stage + "\\terrors=" + (errors.size() - mark));
        for (int i = mark; i < errors.size(); i++)
            System.out.println("@@SC ERR\\t" + unit + "\\t" + stage + "\\t"
                               + String.valueOf(errors.get(i)).replace('\\n', ' ').replace('\\t', ' '));
        return errors.size();
    }
    static void probeCrash(String unit, String stage, Throwable t) {
        StackTraceElement[] st = t.getStackTrace();
        System.out.println("@@SC CRASH\\t" + unit + "\\t" + stage + "\\t" + t.getClass().getName() + "\\t"
                           + (st.length > 0 ? st[0].toString() : "?") + "\\t"
                           + String.valueOf(t.getMessage()).replace('\\n', ' ').replace('\\t', ' '));
        for (int i = 0; i < Math.min(8, st.length); i++)
            System.out.println("@@SC CRASHAT\\t" + unit + "\\t" + stage + "\\t" + st[i]);
    }

    private static CompilationUnitIndex buildIndex(CompilationUnit ast, boolean isApi) {""")

rep("""            List<StaticError> errors = new ArrayList<StaticError>();

            if (isApi) {""",
"""            List<StaticError> errors = new ArrayList<StaticError>();
            final String __unit = (isApi ? "api " : "component ") + index.ast().getName();
            int __mark = 0;

            if (isApi) {""")

# hierarchy
rep("""            errors.addAll(typeHierarchyChecker.checkHierarchy());
            if (! errors.isEmpty()) {
                return new TypeCheckerResult(ast, errors);
            }""",
"""            __mark = errors.size();
            try { errors.addAll(typeHierarchyChecker.checkHierarchy()); } """ + CATCH % "hierarchy" + """
            __mark = probeStage(__unit, "hierarchy", errors, __mark);
            if (! errors.isEmpty() && !PROBE_ALL) {
                return new TypeCheckerResult(ast, errors);
            }""")

# api type extraction (components)
rep("""                ast = (Component)typeExtractor.check();
                errors.addAll(typeExtractor.getErrors());
                if(!errors.isEmpty())
                    return new TypeCheckerResult(ast,errors);""",
"""                try {
                    ast = (Component)typeExtractor.check();
                    errors.addAll(typeExtractor.getErrors());
                } """ + CATCH % "apiextract" + """
                __mark = probeStage(__unit, "apiextract", errors, __mark);
                if(!errors.isEmpty() && !PROBE_ALL)
                    return new TypeCheckerResult(ast,errors);""")

# acyclic hierarchy and first well-formedness check
rep("""            errors.addAll(typeHierarchyChecker.checkAcyclicHierarchy(typeAnalyzer));
            errors.addAll(new TypeWellFormedChecker(index, env, typeAnalyzer).check());""",
"""            try { errors.addAll(typeHierarchyChecker.checkAcyclicHierarchy(typeAnalyzer)); } """ + CATCH % "acyclic" + """
            __mark = probeStage(__unit, "acyclic", errors, __mark);
            try { errors.addAll(new TypeWellFormedChecker(index, env, typeAnalyzer).check()); } """ + CATCH % "wellformed1" + """
            __mark = probeStage(__unit, "wellformed1", errors, __mark);""")

# the thunks, which run over the whole component before the declarations are checked
rep("""                    thunker.walk(component_ast);""",
"""                    try { thunker.walk(component_ast); } """ + CATCH % "thunker")
rep("""                    com.sun.fortress.scala_src.typechecker.Thunker$.MODULE$.primeFunctionals(componentIndex.parametricOperators(), tryChecker, cycleChecker);
                    com.sun.fortress.scala_src.typechecker.Thunker$.MODULE$.primeFunctionals(componentIndex.functions().secondSet(), tryChecker, cycleChecker);""",
"""                    try {
                    com.sun.fortress.scala_src.typechecker.Thunker$.MODULE$.primeFunctionals(componentIndex.parametricOperators(), tryChecker, cycleChecker);
                    com.sun.fortress.scala_src.typechecker.Thunker$.MODULE$.primeFunctionals(componentIndex.functions().secondSet(), tryChecker, cycleChecker);
                    } """ + CATCH % "prime")

# the component's declarations
rep("""                    errors.addAll(Lists.toJavaList(typeChecker.getErrors()));
                    result = new TypeCheckerResult(ast, errors, typeChecker);""",
"""                    errors.addAll(Lists.toJavaList(typeChecker.getErrors()));
                    __mark = probeStage(__unit, "typecheck", errors, __mark);
                    result = new TypeCheckerResult(ast, errors, typeChecker);""")

# the leftover-inference-variable assertion, reached only when there is no error
rep("""            if( errors.isEmpty() && STypesUtil.assertAfterTypeChecking(result.ast()) )
                bug("Result of typechecking still contains intermediate nodes.\\n" +
                    result.ast());""",
"""            try {
            if( errors.isEmpty() && STypesUtil.assertAfterTypeChecking(result.ast()) )
                bug("Result of typechecking still contains intermediate nodes.\\n" +
                    result.ast());
            } """ + CATCH % "leftover")

# second well-formedness check, then the overloading checker
rep("""            errors.addAll(new TypeWellFormedChecker(index, env, typeAnalyzer).check());
            if ( ! errors.isEmpty() ) {
                result = addErrors(errors, result);
                return result;
            }""",
"""            try { errors.addAll(new TypeWellFormedChecker(index, env, typeAnalyzer).check()); } """ + CATCH % "wellformed2" + """
            __mark = probeStage(__unit, "wellformed2", errors, __mark);
            if ( ! errors.isEmpty() && !PROBE_ALL ) {
                result = addErrors(errors, result);
                return result;
            }""")
rep("""            errors.addAll(new OverloadingChecker(index, env).checkOverloading());
            if ( ! errors.isEmpty() ) {
                result = addErrors(errors, result);
                return result;
            }""",
"""            try { errors.addAll(new OverloadingChecker(index, env).checkOverloading()); } """ + CATCH % "overloading" + """
            __mark = probeStage(__unit, "overloading", errors, __mark);
            if ( ! errors.isEmpty() && !PROBE_ALL ) {
                result = addErrors(errors, result);
                return result;
            }""")

# export and variance (components)
rep("""                errors.addAll(ExportChecker.checkExports((ComponentIndex)index, env));
                result = addErrors(errors, result);""",
"""                try { errors.addAll(ExportChecker.checkExports((ComponentIndex)index, env)); } """ + CATCH % "export" + """
                __mark = probeStage(__unit, "export", errors, __mark);
                result = addErrors(errors, result);""")
rep("""                errors.addAll(VarianceChecker.run((Component) result.ast()));""",
"""                try { errors.addAll(VarianceChecker.run((Component) result.ast())); } """ + CATCH % "variance" + """
                __mark = probeStage(__unit, "variance", errors, __mark);""")

io.open(p, "w", encoding="utf-8").write(t)
print("probe.all edits written to " + p)

# ------------------------------------------------------------------------------------
# Two more shadows, copied from the tracked sources (run from $FORTRESS_HOME), for the
# code-generation run of step `codegen`, which on today's tree does not get past
# DESUGAR and OVERLOADREWRITE as it did on 2026-09-20:
#
#   Desugarer      under -Dprobe.tolerant, a desugaring that throws on the whole
#                  component is applied again one top-level declaration at a time; a
#                  declaration it throws on is printed (@@DS FAIL) and kept undesugared.
#   NodeComparator under -Dprobe.bottomCompare, two BottomTypes compare equal instead of
#                  throwing "subtypeCompareTo(BottomType BottomType) is not implemented!"
#                  (NodeComparator.java:469-471); the first three comparisons print the
#                  stack that reached them (@@NC BOTTOM).
def copy_patch(rel, edits):
    src = os.path.join("ProjectFortress/src/com/sun/fortress", rel)
    s = io.open(src, encoding="utf-8").read()
    for old, new in edits:
        assert s.count(old) == 1, (rel, old[:70], s.count(old))
        s = s.replace(old, new, 1)
    out = os.path.join(shadow, "com/sun/fortress", rel)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    io.open(out, "w", encoding="utf-8").write(s)
    print("shadow " + out)

copy_patch("compiler/Desugarer.java", [
("""    public static Component
        desugarComponent(ComponentIndex component,""",
"""    // PROBE (switch-over-distance): see add-patch.py.
    interface ProbeStep { com.sun.fortress.nodes.Node apply(com.sun.fortress.nodes.Node n); }
    static Component probeApply(Component comp, String name, ProbeStep step) {
        if (!Boolean.getBoolean("probe.tolerant")) return (Component) step.apply(comp);
        try { return (Component) step.apply(comp); }
        catch (RuntimeException | Error t) {
            System.out.println("@@DS WHOLE-FAIL\\t" + name + "\\t" + t.getClass().getName() + "\\t"
                               + String.valueOf(t.getMessage()).replace('\\n', ' ').replace('\\t', ' '));
            java.util.List<com.sun.fortress.nodes.Decl> nd = new java.util.ArrayList<com.sun.fortress.nodes.Decl>();
            int bad = 0;
            for (com.sun.fortress.nodes.Decl d : comp.getDecls()) {
                try { nd.add((com.sun.fortress.nodes.Decl) step.apply(d)); }
                catch (RuntimeException | Error u) {
                    bad++;
                    StackTraceElement[] st = u.getStackTrace();
                    System.out.println("@@DS FAIL\\t" + name + "\\t" + com.sun.fortress.nodes_util.NodeUtil.getSpan(d)
                                       + "\\t" + u.getClass().getName() + "\\t" + (st.length > 0 ? st[0].toString() : "?")
                                       + "\\t" + String.valueOf(u.getMessage()).replace('\\n', ' ').replace('\\t', ' '));
                    nd.add(d);
                }
            }
            System.out.println("@@DS PERDECL\\t" + name + "\\tdecls=" + nd.size() + "\\tfailed=" + bad);
            return new Component(comp.getInfo(), comp.getName(), comp.getImports(), nd,
                                 comp.getComprises(), comp.is_native(), comp.getExports());
        }
    }

    public static Component
        desugarComponent(ComponentIndex component,"""),
("""        	comp = (Component) comp.accept(caseExprDesugarer);""",
 """        	comp = probeApply(comp, "case", n -> n.accept(caseExprDesugarer));"""),
("""            comp = (Component) coercionDesugarer.walk(comp);""",
 """            comp = probeApply(comp, "coercion", n -> (com.sun.fortress.nodes.Node) coercionDesugarer.walk(n));"""),
("""            comp = (Component) comp.accept(desugaringVisitor);""",
 """            comp = probeApply(comp, "getset", n -> n.accept(desugaringVisitor));"""),
("""        	comp = (Component) comp.accept(typeAscriptionDesugarer);""",
 """        	comp = probeApply(comp, "ascription", n -> n.accept(typeAscriptionDesugarer));"""),
])

copy_patch("nodes_util/NodeComparator.java", [
("""	} else if (left instanceof AnyType) {
	    return 0;
	} else {""",
"""	} else if (left instanceof AnyType) {
	    return 0;
	} else if (left instanceof BottomType && Boolean.getBoolean("probe.bottomCompare")) {
	    // PROBE (switch-over-distance): see add-patch.py
	    if (probeBottomSeen++ < 3) {
	        System.out.println("@@NC BOTTOM\\t" + NodeUtil.getSpan(left));
	        StackTraceElement[] st = new Throwable().getStackTrace();
	        for (int i = 0; i < Math.min(40, st.length); i++) System.out.println("@@NC BOTTOMAT\\t" + st[i]);
	    }
	    return 0;
	} else {"""),
("""    private static int subtypeCompareTo(Type left, Type right) {""",
 """    static int probeBottomSeen = 0;
    private static int subtypeCompareTo(Type left, Type right) {"""),
])
