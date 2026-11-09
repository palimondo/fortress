package com.sun.fortress.compiler.codegen;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.sun.fortress.compiler.NamingCzar;
import com.sun.fortress.nodes.*;
import com.sun.fortress.nodes_util.ASTIO;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.repository.ProjectProperties;
import com.sun.fortress.runtimeSystem.Naming;

import edu.rice.cs.plt.tuple.Option;

/**
 * The fold of a numeral coercion (P-176): the body of a coercion generic over
 * a numeral's four numbers, read in the component that declares it and
 * evaluated at compile time with the four numbers bound to their exact
 * values. The fold evaluates a closed fragment: an integer, float or boolean
 * constant; one of the four numbers or another bound name; and a call of a
 * native over the built-in number types (a generated import java of a helper
 * of nativeHelpers/, run through its Java method on constant arguments) or
 * of a function or method, getter included, whose body is itself in the
 * fragment, to a depth of a few calls. What it knows of the built-in types is
 * their representations, for the natives' arguments and results; it knows no
 * target type and no method by its name. Anything else, or a native that
 * raises, is not folded, and the place then takes its coercion's call once,
 * into a static final.
 */
public final class NumeralCoercionFold {

    private NumeralCoercionFold() {}

    /** Where the fold finds a component's analyzed tree. */
    public interface Components {
        /** The component of that name, or null. */
        Component get(APIName api);
    }

    /** The depth of calls the fold follows. */
    private static final int DEPTH = 8;

    /** The packages whose static methods the fold runs. */
    private static final String HELPERS = "com.sun.fortress.nativeHelpers.";

    /** The apis of the libraries, whose number types have the representations below. */
    private static final java.util.Set<String> LIBRARY_APIS = new java.util.HashSet<String>(java.util.Arrays.asList(
        "CompilerBuiltin", "FortressBuiltin", "FortressLibrary"));

    /** The representation of each built-in type, as the natives take and give it. */
    private static final Map<String, Class<?>> REPRESENTATION = new HashMap<String, Class<?>>();
    static {
        REPRESENTATION.put("ZZ32", Integer.class);
        REPRESENTATION.put("NN32", Integer.class);
        REPRESENTATION.put("ZZ64", Long.class);
        REPRESENTATION.put("NN64", Long.class);
        REPRESENTATION.put("RR32", Float.class);
        REPRESENTATION.put("RR64", Double.class);
        REPRESENTATION.put("ZZ", BigInteger.class);
        REPRESENTATION.put("Boolean", Boolean.class);
    }

    /** The Java type that represents a value of type t, or null for a type of no built-in representation. */
    static Class<?> representation(Type t) {
        if (t instanceof TraitSelfType) t = ((TraitSelfType) t).getNamed();
        if (!(t instanceof TraitType) || !((TraitType) t).getArgs().isEmpty()) return null;
        Id name = ((TraitType) t).getName();
        if (name.getApiName().isSome() && !LIBRARY_APIS.contains(name.getApiName().unwrap().getText())) return null;
        return REPRESENTATION.get(name.getText());
    }

    /** The JVM constant a place of a coercion with this result holds: an int, long, float or double; or null. */
    static boolean isJvmConstant(Object value) {
        return value instanceof Integer || value instanceof Long || value instanceof Float || value instanceof Double;
    }

    private static final Map<String, Object[]> analyzed = new ConcurrentHashMap<String, Object[]>();

    /**
     * Each component's analyzed tree: the component in compilation, given, and
     * any other read from the analyzed cache, as the repository loads one,
     * where the cache holds an entry no older than its source. A stale or
     * missing entry gives null: the fold never compiles a component.
     */
    public static Components components(final Component current) {
        return new Components() {
            public Component get(APIName api) {
                if (current != null && current.getName().getText().equals(api.getText())) return current;
                return cached(api);
            }
        };
    }

    private static Component cached(APIName api) {
        try {
            File source = ProjectProperties.SOURCE_PATH.findFile(api.getText() + "." + ProjectProperties.COMP_SOURCE_SUFFIX);
            String sourcePath = source.getCanonicalPath();
            String entry = NamingCzar.cachedPathNameForCompAst(ProjectProperties.ANALYZED_CACHE_DIR, sourcePath, api);
            File f = new File(entry);
            if (!f.exists() || f.lastModified() < source.lastModified()) return null;
            Object[] memo = analyzed.get(entry);
            if (memo != null && ((Long) memo[0]).longValue() == f.lastModified()) return (Component) memo[1];
            Option<CompilationUnit> cu = ASTIO.readJavaAst(entry);
            if (cu.isNone() || !(cu.unwrap() instanceof Component)) return null;
            analyzed.put(entry, new Object[] { Long.valueOf(f.lastModified()), cu.unwrap() });
            return (Component) cu.unwrap();
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * The constant of a numeral's place: the value of the coercion that ref
     * names, at the four numbers of its static arguments, where it is a JVM
     * int, long, float or double of the representation of the coercion's
     * declared result; null otherwise.
     */
    public static Object fold(FnRef ref, Expr numeral, Component current) {
        boolean point = numeral instanceof FloatLiteralExpr;
        int k = point ? 4 : 3;
        List<StaticArg> sargs = ref.getStaticArgs();
        if (sargs.size() < k) return null;
        List<BigInteger> numbers = new ArrayList<BigInteger>();
        for (StaticArg a : sargs.subList(sargs.size() - k, sargs.size())) {
            BigInteger b = sizeValue(a);
            if (b == null) return null;
            numbers.add(b);
        }
        Components cs = components(current);
        Component c = componentOf(ref, cs, current);
        if (c == null) return null;
        FnDecl d = numeralCoercion(c, ref.getOriginalName().getText(), point, sargs.size());
        if (d == null || d.getHeader().getReturnType().isNone()) return null;
        Object value = evaluateCoercion(d, numbers, c, cs);
        Class<?> rep = representation(d.getHeader().getReturnType().unwrap());
        if (value == null || rep == null || !rep.isInstance(value) || !isJvmConstant(value)) return null;
        return value;
    }

    /**
     * The value of the lifted numeral coercion of this name in component c, of
     * a natural numeral or one with a radix point, at its four numbers (n, r, v,
     * or n, m, r, v); null where the fragment does not cover it.
     */
    public static Object coercion(Component c, String name, boolean radixPoint, List<BigInteger> numbers, Components cs) {
        FnDecl d = numeralCoercion(c, name, radixPoint, -1);
        if (d == null) return null;
        return evaluateCoercion(d, numbers, c, cs);
    }

    /** The value of the expression with these names bound, read in component c; null where it is outside the fragment. */
    public static Object evaluate(Expr e, Map<String, Object> bindings, Component c, Components cs) {
        return new Fold(cs).eval(e, bindings, c, DEPTH);
    }

    private static Object evaluateCoercion(FnDecl d, List<BigInteger> numbers, Component c, Components cs) {
        List<StaticParam> sps = d.getHeader().getStaticParams();
        if (sps.size() < numbers.size()) return null;
        Map<String, Object> env = new HashMap<String, Object>();
        List<StaticParam> own = sps.subList(sps.size() - numbers.size(), sps.size());
        for (int i = 0; i < own.size(); i++) env.put(own.get(i).getName().getText(), numbers.get(i));
        return new Fold(cs).eval(d.getBody().unwrap(), env, c, DEPTH);
    }

    /**
     * The lifted coercion of this name declared at the top level of c, whose
     * one parameter has the numeral type of the numeral's kind, generic over
     * its four numbers, with this many static parameters where it is not -1.
     */
    static FnDecl numeralCoercion(Component c, String name, boolean point, int staticParams) {
        for (Decl decl : c.getDecls()) {
            if (!(decl instanceof FnDecl)) continue;
            FnDecl f = (FnDecl) decl;
            if (!simpleName(NodeUtil.getName(f)).equals(name) || f.getBody().isNone()) continue;
            List<Param> ps = f.getHeader().getParams();
            if (ps.size() != 1 || ps.get(0).getIdType().isNone()) continue;
            Type pt = (Type) ps.get(0).getIdType().unwrap();
            if (!numeralType(pt, point)) continue;
            if (staticParams >= 0 && f.getHeader().getStaticParams().size() != staticParams) continue;
            return f;
        }
        return null;
    }

    /** Whether t is a library's numeral type of this kind, NaturalNumeral or RadixPointNumeral, at any static arguments. */
    private static boolean numeralType(Type t, boolean point) {
        if (!(t instanceof TraitType)) return false;
        Id n = ((TraitType) t).getName();
        if (n.getApiName().isSome() && !LIBRARY_APIS.contains(n.getApiName().unwrap().getText())) return false;
        return n.getText().equals(point ? "RadixPointNumeral" : "NaturalNumeral");
    }

    /** A declaration's or a reference's name without its api: an identifier's text, an operator with its fixity. */
    private static String simpleName(IdOrOpOrAnonymousName n) {
        if (n instanceof Id) return ((Id) n).getText();
        return NodeUtil.nameString(n);
    }

    private static BigInteger sizeValue(StaticArg a) {
        if (a instanceof IntArg && ((IntArg) a).getIntVal() instanceof IntBase)
            return ((IntBase) ((IntArg) a).getIntVal()).getIntVal().getIntVal();
        return null;
    }

    private static Component componentOf(FunctionalRef ref, Components cs, Component current) {
        List<IdOrOp> names = ref.getNames();
        Option<APIName> api = names.size() == 1 ? names.get(0).getApiName() : ref.getOriginalName().getApiName();
        if (api.isNone()) return current;
        return cs.get(api.unwrap());
    }

    /** One evaluation, with the components it reads. */
    private static final class Fold {
        private final Components cs;

        Fold(Components cs) { this.cs = cs; }

        Object eval(Expr e, Map<String, Object> env, Component c, int depth) {
            if (e instanceof VarRef) {
                Id id = ((VarRef) e).getVarId();
                if (id.getApiName().isSome() || !((VarRef) e).getStaticArgs().isEmpty()) return null;
                return env.get(id.getText());
            }
            if (e instanceof IntLiteralExpr) return integer(((IntLiteralExpr) e).getIntVal(), typeOf(e));
            if (e instanceof FloatLiteralExpr) return radixPoint((FloatLiteralExpr) e, typeOf(e));
            if (e instanceof BooleanLiteralExpr) return Boolean.valueOf(((BooleanLiteralExpr) e).getBooleanVal() != 0);
            if (depth <= 0) return null;
            if (e instanceof _RewriteFnApp) {
                _RewriteFnApp app = (_RewriteFnApp) e;
                if (!(app.getFunction() instanceof FunctionalRef)) return null;
                List<Object> args = args(app.getArgument(), env, c, depth);
                return args == null ? null : call((FunctionalRef) app.getFunction(), args, c, depth);
            }
            if (e instanceof OpExpr) {
                OpExpr x = (OpExpr) e;
                List<Object> args = new ArrayList<Object>();
                for (Expr a : x.getArgs()) {
                    Object v = eval(a, env, c, depth);
                    if (v == null) return null;
                    args.add(v);
                }
                return call(x.getOp(), args, c, depth);
            }
            if (e instanceof MethodInvocation) {
                MethodInvocation m = (MethodInvocation) e;
                if (!m.getStaticArgs().isEmpty()) return null;
                Object self = eval(m.getObj(), env, c, depth);
                List<Object> args = args(m.getArg(), env, c, depth);
                if (self == null || args == null) return null;
                Option<Type> rt = m.getObj().getInfo().getExprType();
                if (rt.isNone()) return null;
                FnDecl d = method(rt.unwrap(), simpleName(m.getMethod()), -1, args.size());
                if (d == null) return null;
                Map<String, Object> inner = new HashMap<String, Object>();
                inner.put("self", self);
                return bindAndEval(d, args, inner, componentOfType(rt.unwrap()), depth - 1);
            }
            return null;
        }

        private List<Object> args(Expr arg, Map<String, Object> env, Component c, int depth) {
            List<Expr> es;
            if (arg instanceof VoidLiteralExpr) es = Collections.emptyList();
            else if (arg instanceof TupleExpr) {
                TupleExpr t = (TupleExpr) arg;
                if (t.getVarargs().isSome() || !t.getKeywords().isEmpty()) return null;
                es = t.getExprs();
            } else es = Collections.singletonList(arg);
            List<Object> vs = new ArrayList<Object>();
            for (Expr x : es) {
                Object v = eval(x, env, c, depth);
                if (v == null) return null;
                vs.add(v);
            }
            return vs;
        }

        private Object call(FunctionalRef ref, List<Object> args, Component c, int depth) {
            List<IdOrOp> names = ref.getNames();
            if (names.size() == 1 && names.get(0).getText().indexOf(Naming.FOREIGN_TAG) >= 0)
                return foreign(names.get(0), args);
            Option<Type> t = ref.getInfo().getExprType();
            if (t.isNone() || !(t.unwrap() instanceof ArrowType)) return null;
            ArrowType arrow = (ArrowType) t.unwrap();
            String name = simpleName(ref.getOriginalName());
            if (arrow.getMethodInfo().isSome()) {
                // A functional method of the type of its self parameter.
                MethodInfo mi = arrow.getMethodInfo().unwrap();
                if (!ref.getStaticArgs().isEmpty()) return null;
                FnDecl d = method(mi.getSelfType(), name, mi.getSelfPosition(), args.size());
                if (d == null) return null;
                return bindAndEval(d, args, new HashMap<String, Object>(), componentOfType(mi.getSelfType()), depth - 1);
            }
            Component dc = componentOf(ref, cs, c);
            if (dc == null) return null;
            FnDecl d = null;
            for (Decl decl : dc.getDecls()) {
                if (!(decl instanceof FnDecl)) continue;
                FnDecl f = (FnDecl) decl;
                if (!simpleName(NodeUtil.getName(f)).equals(name) || f.getBody().isNone()) continue;
                if (f.getHeader().getParams().size() != args.size()) continue;
                if (d != null) return null; // overloaded: not chosen here
                d = f;
            }
            if (d == null) return null;
            Map<String, Object> env = new HashMap<String, Object>();
            List<StaticParam> sps = d.getHeader().getStaticParams();
            List<StaticArg> sas = ref.getStaticArgs();
            if (sps.size() != sas.size()) return null;
            for (int i = 0; i < sps.size(); i++) {
                BigInteger b = sizeValue(sas.get(i));
                if (b != null) env.put(sps.get(i).getName().getText(), b);
            }
            return bindAndEval(d, args, env, dc, depth - 1);
        }

        private Object bindAndEval(FnDecl d, List<Object> args, Map<String, Object> env, Component c, int depth) {
            if (c == null || d.getBody().isNone()) return null;
            List<Param> ps = d.getHeader().getParams();
            int self = NodeUtil.selfParameterIndex(ps);
            if (ps.size() != args.size() && !(self == Naming.NO_SELF && ps.isEmpty() && args.isEmpty())) return null;
            for (int i = 0; i < ps.size(); i++) env.put(ps.get(i).getName().getText(), args.get(i));
            return eval(d.getBody().unwrap(), env, c, depth);
        }

        /**
         * The method of the trait or object named by t, of this name, with
         * self at selfPosition (a functional method) or without self (dotted, at
         * -1), and this many arguments, declared in the component of t's api.
         */
        private FnDecl method(Type t, String name, int selfPosition, int arity) {
            if (t instanceof TraitSelfType) t = ((TraitSelfType) t).getNamed();
            if (!(t instanceof TraitType)) return null;
            Id tn = ((TraitType) t).getName();
            Component c = componentOfType(t);
            if (c == null) return null;
            FnDecl found = null;
            for (Decl decl : c.getDecls()) {
                if (!(decl instanceof TraitObjectDecl)) continue;
                TraitObjectDecl td = (TraitObjectDecl) decl;
                if (!NodeUtil.getName(td).getText().equals(tn.getText())) continue;
                for (Decl m : NodeUtil.getDecls(td)) {
                    if (!(m instanceof FnDecl)) continue;
                    FnDecl f = (FnDecl) m;
                    if (!simpleName(NodeUtil.getName(f)).equals(name) || f.getBody().isNone()) continue;
                    List<Param> ps = f.getHeader().getParams();
                    int self = NodeUtil.selfParameterIndex(ps);
                    int count = selfPosition < 0 ? ps.size() : ps.size();
                    if (selfPosition < 0 ? self != Naming.NO_SELF || count != arity
                                         : self != selfPosition || count != arity) continue;
                    if (found != null) return null; // overloaded: not chosen here
                    found = f;
                }
            }
            return found;
        }

        private Component componentOfType(Type t) {
            if (t instanceof TraitSelfType) t = ((TraitSelfType) t).getNamed();
            if (!(t instanceof TraitType)) return null;
            Option<APIName> api = ((TraitType) t).getName().getApiName();
            return api.isSome() ? cs.get(api.unwrap()) : null;
        }

        private Type typeOf(Expr e) {
            Option<Type> t = e.getInfo().getExprType();
            return t.isSome() ? t.unwrap() : null;
        }

        /** An integer constant in the representation of its type, its default where its type is its own. */
        private Object integer(BigInteger v, Type t) {
            Class<?> rep = t == null ? null : representation(t);
            if (rep == null) {
                int l = v.bitLength();
                rep = l <= 31 ? Integer.class : l <= 63 ? Long.class : BigInteger.class;
            }
            if (rep == Integer.class) return Integer.valueOf(v.intValue());
            if (rep == Long.class) return Long.valueOf(v.longValue());
            if (rep == BigInteger.class) return v;
            if (rep == Double.class) return Double.valueOf(CodeGen.roundToDouble(v, BigInteger.ONE));
            if (rep == Float.class) return Float.valueOf(CodeGen.roundToFloat(v, BigInteger.ONE));
            return null;
        }

        /** A radix-point constant, rounded once into the representation of its type, an RR64 by default. */
        private Object radixPoint(FloatLiteralExpr x, Type t) {
            Class<?> rep = t == null ? null : representation(t);
            if (rep == null) rep = Double.class;
            BigInteger den = BigInteger.valueOf(x.getDenomBase()).pow(x.getDenomPower());
            BigInteger num = x.getIntPart().multiply(den).add(x.getNumerator());
            boolean negated = com.sun.fortress.nodes_util.NumeralNumbers.kindOf(x.getText()) ==
                              com.sun.fortress.nodes_util.NumeralNumbers.Kind.NEGATED;
            if (rep == Double.class) {
                double d = CodeGen.roundToDouble(num, den);
                return Double.valueOf(negated ? -d : d);
            }
            if (rep == Float.class) {
                float f = CodeGen.roundToFloat(num, den);
                return Float.valueOf(negated ? -f : f);
            }
            return null;
        }

        /** A generated import java of a helper: its static method, run on the arguments, where its Java types are the representations. */
        private Object foreign(IdOrOp n, List<Object> args) {
            if (n.getApiName().isNone()) return null;
            // The name is the tag, the helper's class, the tag, its method and its descriptor.
            String text = n.getText();
            if (text.startsWith(Naming.FOREIGN_TAG)) text = text.substring(Naming.FOREIGN_TAG.length());
            int tag = text.indexOf(Naming.FOREIGN_TAG);
            if (tag <= 0) return null;
            String cls = n.getApiName().unwrap().getText() + "." + text.substring(0, tag);
            if (!cls.startsWith(HELPERS)) return null;
            String rest = text.substring(tag + Naming.FOREIGN_TAG.length());
            int paren = rest.indexOf('(');
            int close = rest.indexOf(')');
            if (paren < 0 || close < paren) return null;
            String method = rest.substring(0, paren);
            List<Class<?>> params = new ArrayList<Class<?>>();
            List<Class<?>> boxes = new ArrayList<Class<?>>();
            String ps = rest.substring(paren + 1, close);
            int i = 0;
            while (i < ps.length()) {
                int j = descriptorEnd(ps, i);
                if (j < 0) return null;
                Class<?>[] pair = javaType(ps.substring(i, j));
                if (pair == null) return null;
                params.add(pair[0]);
                boxes.add(pair[1]);
                i = j;
            }
            Class<?>[] result = javaType(rest.substring(close + 1));
            if (result == null || params.size() != args.size()) return null;
            for (int a = 0; a < args.size(); a++)
                if (!boxes.get(a).isInstance(args.get(a))) return null;
            try {
                Method m = Class.forName(cls).getMethod(method, params.toArray(new Class<?>[0]));
                if (!Modifier.isStatic(m.getModifiers())) return null;
                Object r = m.invoke(null, args.toArray());
                return result[1].isInstance(r) ? r : null;
            } catch (InvocationTargetException ex) {
                return null; // a native that raises: the place takes the call
            } catch (Exception ex) {
                return null;
            } catch (LinkageError ex) {
                return null;
            }
        }

        private int descriptorEnd(String s, int i) {
            char ch = s.charAt(i);
            if (ch == 'L') {
                int semi = s.indexOf(';', i);
                return semi < 0 ? -1 : semi + 1;
            }
            return "IJFDZ".indexOf(ch) >= 0 ? i + 1 : -1;
        }

        /** The Java type of a descriptor and its box, for the representations only. */
        private Class<?>[] javaType(String d) {
            if (d.equals("I")) return new Class<?>[] { int.class, Integer.class };
            if (d.equals("J")) return new Class<?>[] { long.class, Long.class };
            if (d.equals("F")) return new Class<?>[] { float.class, Float.class };
            if (d.equals("D")) return new Class<?>[] { double.class, Double.class };
            if (d.equals("Z")) return new Class<?>[] { boolean.class, Boolean.class };
            if (d.equals("Ljava/math/BigInteger;")) return new Class<?>[] { BigInteger.class, BigInteger.class };
            return null;
        }
    }
}
