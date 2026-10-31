package com.sun.fortress.compiler;

import com.sun.fortress.nodes.*;
import com.sun.fortress.nodes_util.ExprFactory;
import com.sun.fortress.nodes_util.NodeFactory;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.nodes_util.Span;
import edu.rice.cs.plt.tuple.Option;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.*;

/**
 * The compiled path's reading of a native binding.  A declaration whose body is
 * exactly builtinPrimitive("pkg.Class.method"), the tight juxtaposition that walk's
 * NativeApp.checkAndLoadNative recognizes, where the string names a public static
 * method of a class of the helpers' package, com.sun.fortress.nativeHelpers., becomes
 * a call of that method through the import java machinery: the component gains
 * import java pkg.{Class.method => alias}, and the body becomes alias(args), the
 * parameters in order, self first for a method of a trait or object (a dotted
 * method's self added, a functional method's moved to the front), as walk's
 * NativeMeth passes them.  Where the declaration gives an argument or the result
 * the type NN32, NN64 or Char (Character in the compiler's prelude), and the helper's
 * Java type there is an int or a long, which the checker reads as ZZ32 or ZZ64, that
 * argument or the call goes through the matching one of the six transfer helpers,
 * whose names the checker reads at the declared type (NamingCzar), as the prelude
 * composes them: makeNN32FromZZ32(unsignedIntOverflowingAdd(makeZZ32FromNN32(self),
 * makeZZ32FromNN32(b))); a position that the helper's own name already reads at the
 * declared type, as each transfer's, gets none.  A declaration with a varargs
 * parameter is left alone.
 * A string under the helpers' package that names no public static method is a
 * static error at the string.  Any other string is left alone, walk's glue classes
 * ("pkg.Class$Op") among them, so that its body stays a call of builtinPrimitive.
 *
 * Shell.specificRepository turns it on for the compiled path's repository and off
 * for walk's, which loads such a body itself.  Parser applies it to the parse of a
 * component (parseFileConvertExn) and to the import collector's view of a component
 * that names a helper (importCollector), so that the repository knows the foreign
 * api when it builds its graph, before every phase.
 */
public final class BuiltinPrimitiveRewriter {
    private BuiltinPrimitiveRewriter() {}

    public static final String HELPERS = "com.sun.fortress.nativeHelpers.";
    private static volatile boolean on = false;
    public static void setEnabled(boolean b) { on = b; }
    public static boolean enabled() { return on; }

    /** pkg -> (Class.method -> alias), in order of first use */
    private static final class Aliases extends LinkedHashMap<String, LinkedHashMap<String, String>> {}

    /** The component with each binding that names a static method rewritten; any other unit as it is. */
    public static CompilationUnit rewrite(CompilationUnit cu) {
        if (!enabled() || !(cu instanceof Component)) return cu;
        Component c = (Component) cu;
        Aliases aliases = new Aliases();
        List<Decl> decls = new ArrayList<Decl>();
        for (Decl d : c.getDecls()) decls.add(decl(d, null, aliases));
        if (aliases.isEmpty()) return cu;
        List<Import> imports = new ArrayList<Import>(c.getImports());
        Span span = NodeUtil.getSpan(c);
        for (Map.Entry<String, LinkedHashMap<String, String>> e : aliases.entrySet()) {
            List<AliasedSimpleName> names = new ArrayList<AliasedSimpleName>();
            for (Map.Entry<String, String> n : e.getValue().entrySet())
                names.add(NodeFactory.makeAliasedSimpleName(span, NodeFactory.makeId(span, n.getKey()),
                          Option.<IdOrOpOrAnonymousName>some(NodeFactory.makeId(span, n.getValue()))));
            imports.add(NodeFactory.makeImportNames(span, Option.some("java"),
                                                    NodeFactory.makeAPIName(span, e.getKey()), names));
        }
        return new Component(c.getInfo(), c.getName(), imports, decls, c.getComprises(), c.is_native(), c.getExports());
    }

    /** owner: the simple name of the enclosing trait or object, "" for a generic one, null at the top level */
    private static Decl decl(Decl d, String owner, Aliases aliases) {
        if (d instanceof FnDecl) return fn((FnDecl) d, owner, aliases);
        if (d instanceof TraitDecl) {
            TraitDecl t = (TraitDecl) d;
            return new TraitDecl(t.getInfo(), header(t.getHeader(), aliases), t.getSelfType(),
                                 t.getExcludesClause(), t.getComprisesClause(), t.isComprisesEllipses());
        }
        if (d instanceof ObjectDecl) {
            ObjectDecl o = (ObjectDecl) d;
            return new ObjectDecl(o.getInfo(), header(o.getHeader(), aliases), o.getSelfType());
        }
        return d;
    }

    private static TraitTypeHeader header(TraitTypeHeader h, Aliases aliases) {
        List<Decl> ds = new ArrayList<Decl>();
        String owner = h.getStaticParams().isEmpty() ? NodeUtil.nameString(h.getName()) : "";
        for (Decl d : h.getDecls()) ds.add(decl(d, owner, aliases));
        return new TraitTypeHeader(h.getStaticParams(), h.getMods(), h.getName(), h.getWhereClause(),
                                   h.getThrowsClause(), h.getContract(), h.getExtendsClause(), h.getParams(), ds);
    }

    private static FnDecl fn(FnDecl f, String owner, Aliases aliases) {
        boolean inType = owner != null;
        if (f.getBody().isNone() || !(f.getBody().unwrap() instanceof Juxt)) return f;
        Juxt body = (Juxt) f.getBody().unwrap();
        List<Expr> es = body.getExprs();
        if (!body.isTight() || es.size() != 2 || !(es.get(0) instanceof VarRef) || !(es.get(1) instanceof StringLiteralExpr))
            return f;
        if (!((VarRef) es.get(0)).getVarId().getText().equals("builtinPrimitive")) return f;
        String s = ((StringLiteralExpr) es.get(1)).getText();
        if (!s.startsWith(HELPERS)) return f;
        int m = s.lastIndexOf('.'), k = s.lastIndexOf('.', m - 1);
        if (!namesStaticMethod(s.substring(0, m), s.substring(m + 1)))
            throw com.sun.fortress.exceptions.StaticError.make(
                "builtinPrimitive names no static helper: " + s, es.get(1));

        Span span = NodeUtil.getSpan(body);
        List<Expr> args = new ArrayList<Expr>();
        List<String> declared = new ArrayList<String>();   // each argument's declared type, by simple name
        boolean hasSelf = false;
        for (Param p : NodeUtil.getParams(f)) {
            if (p.getVarargsType().isSome()) return f;
            if (p.getName().getText().equals("self")) hasSelf = true;
            else {
                args.add(ExprFactory.makeVarRef(span, p.getName().getText()));
                declared.add(simpleName(p.getIdType().isSome() ? p.getIdType().unwrap() : null));
            }
        }
        if (inType || hasSelf) {
            args.add(0, ExprFactory.makeVarRef(span, "self"));
            declared.add(0, owner);
        }

        String pkg = s.substring(0, k), item = s.substring(k + 1);   // item = Class.method
        String alias = alias(aliases, pkg, item);

        /* Where the declaration gives a position a type that the helper's Java type carries but the
         * foreign-type table reads otherwise (an int as NN32 or Char, a long as NN64), the call goes
         * through the transfer helpers, whose special names the table reads (NamingCzar). */
        Method jm = soleMethod(s.substring(0, m), s.substring(m + 1), args.size());
        String helperName = s.substring(m + 1);
        if (jm != null) {
            Class<?>[] pts = jm.getParameterTypes();
            for (int i = 0; i < args.size(); i++) {
                String t = transfer(declared.get(i), pts[i], helperName, false);
                if (t != null)
                    args.set(i, ExprFactory.makeTightJuxt(span, ExprFactory.makeVarRef(span, alias(aliases, HELPERS.substring(0, HELPERS.length() - 1), t)),
                                                          ExprFactory.makeInParentheses(args.get(i))));
            }
        }

        Expr arg = args.isEmpty() ? ExprFactory.makeVoidLiteralExpr(span)
                 : args.size() == 1 ? ExprFactory.makeInParentheses(args.get(0))
                 : ExprFactory.makeTupleExpr(span, args);
        Expr call = ExprFactory.makeTightJuxt(body, Arrays.asList(ExprFactory.makeVarRef(span, alias), arg));
        if (jm != null && f.getHeader().getReturnType().isSome()) {
            String t = transfer(simpleName(f.getHeader().getReturnType().unwrap()), jm.getReturnType(), helperName, true);
            if (t != null)
                call = ExprFactory.makeTightJuxt(span, ExprFactory.makeVarRef(span, alias(aliases, HELPERS.substring(0, HELPERS.length() - 1), t)),
                                                 ExprFactory.makeInParentheses(call));
        }
        return new FnDecl(f.getInfo(), f.getHeader(), f.getUnambiguousName(), Option.some(call),
                          f.getImplementsUnambiguousName());
    }

    private static String alias(Aliases aliases, String pkg, String item) {
        LinkedHashMap<String, String> inPkg = aliases.get(pkg);
        if (inPkg == null) aliases.put(pkg, inPkg = new LinkedHashMap<String, String>());
        String alias = inPkg.get(item);
        if (alias == null) inPkg.put(item, alias = "builtinPrimitive_" + item.replace('.', '_'));
        return alias;
    }

    private static String simpleName(Object t) {
        if (t instanceof TraitType && ((TraitType) t).getArgs().isEmpty()) return ((TraitType) t).getName().getText();
        if (t instanceof VarType) return ((VarType) t).getName().getText();
        return null;
    }

    /** The transfer helper, Class.method, that carries a declared type in the Java type c where the table reads c otherwise. */
    private static String transfer(String declared, Class<?> c, String helper, boolean result) {
        if (declared == null) return null;
        String desc = c == int.class ? "I" : c == long.class ? "J" : null;
        if (desc == null) return null;
        com.sun.fortress.nodes.Type read = NamingCzar.fortressTypeForForeignJavaType(desc, helper, result);
        String r = simpleName(read);
        if (declared.equals(r)) return null;
        if (desc.equals("I") && declared.equals("NN32"))
            return result ? "simpleUnsignedIntArith.makeNN32FromZZ32WithSpecialCompilerHackForNN32ResultType"
                          : "simpleUnsignedIntArith.makeZZ32FromNN32WithSpecialCompilerHackForNN32ArgumentType";
        if (desc.equals("I") && (declared.equals("Char") || declared.equals("Character")))
            return result ? "simpleChar.charMakeCharacterWithSpecialCompilerHackForCharacterResultType"
                          : "simpleChar.charCodePointWithSpecialCompilerHackForCharacterArgumentType";
        if (desc.equals("J") && declared.equals("NN64"))
            return result ? "simpleUnsignedLongArith.makeNN64FromZZ64WithSpecialCompilerHackForNN64ResultType"
                          : "simpleUnsignedLongArith.makeZZ64FromNN64WithSpecialCompilerHackForNN64ArgumentType";
        return null;
    }

    /** The one public static method of that name and arity, or null. */
    private static Method soleMethod(String cls, String method, int arity) {
        Method found = null;
        try {
            for (Method x : Class.forName(cls, false, BuiltinPrimitiveRewriter.class.getClassLoader()).getMethods())
                if (x.getName().equals(method) && Modifier.isStatic(x.getModifiers()) && x.getParameterTypes().length == arity) {
                    if (found != null) return null;
                    found = x;
                }
        } catch (ClassNotFoundException e) { } catch (LinkageError e) { }
        return found;
    }

    /** Does the file's text hold a builtinPrimitive string that names a helper? */
    public static boolean namesHelpers(java.io.File file) {
        try {
            return new String(java.nio.file.Files.readAllBytes(file.toPath()), "UTF-8").contains("\"" + HELPERS);
        } catch (java.io.IOException e) { return false; }
    }

    private static boolean namesStaticMethod(String cls, String method) {
        try {
            for (Method x : Class.forName(cls, false, BuiltinPrimitiveRewriter.class.getClassLoader()).getMethods())
                if (x.getName().equals(method) && Modifier.isStatic(x.getModifiers())) return true;
        } catch (ClassNotFoundException e) { } catch (LinkageError e) { }
        return false;
    }
}
