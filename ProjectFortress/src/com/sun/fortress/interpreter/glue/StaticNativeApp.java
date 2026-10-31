package com.sun.fortress.interpreter.glue;

import static com.sun.fortress.exceptions.ProgramError.error;
import com.sun.fortress.compiler.runtimeValues.FortressImplementationError;
import com.sun.fortress.exceptions.FortressError;
import com.sun.fortress.interpreter.Driver;
import com.sun.fortress.interpreter.evaluator.values.*;
import com.sun.fortress.nodes.*;
import com.sun.fortress.nodes_util.NodeUtil;
import edu.rice.cs.plt.tuple.Option;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * A native whose builtinPrimitive string names a static Java method of the
 * package com.sun.fortress.nativeHelpers, "com.sun.fortress.nativeHelpers.Class.method",
 * in place of a glue class.  Among the class's public static methods of that
 * name it takes the one whose Java parameter and result types carry the
 * declaration's types; a functional method's self, and a dotted method's self,
 * go first.  It calls the method by reflection, each argument unboxed and the
 * result boxed at the declared result type.  A helper's raise of an exception
 * class of the compiled path, "fortress.<Api>$<Name>", becomes the raise of the
 * library's own exception object <Name>, as Int.overflow() raises IntegerOverflow.
 */
public class StaticNativeApp extends NativeMeth {
    public static final String HELPERS = "com.sun.fortress.nativeHelpers.";

    /** Does s name a helper (a static method of nativeHelpers), not a glue class? */
    public static boolean isHelperString(String s) {
        return s.startsWith(HELPERS);
    }

    private final Method m;
    private final Class<?>[] ps;
    private final String result;     // the declared result type's name
    private final int selfAt;        // index of self among the declared parameters, or -1
    private int arity;

    /** The Java type that carries a value of the named Fortress type, or null. */
    static Class<?> javaFor(String t) {
        if (t == null) return null;
        if (t.equals("ZZ32") || t.equals("NN32") || t.equals("Char")) return int.class;
        if (t.equals("ZZ64") || t.equals("NN64")) return long.class;
        if (t.equals("RR64") || t.equals("Float")) return double.class;
        if (t.equals("RR32")) return float.class;
        if (t.equals("Boolean")) return boolean.class;
        if (t.equals("String") || t.equals("FlatString") || t.equals("JavaString")) return String.class;
        if (t.equals("ZZ")) return BigInteger.class;
        if (t.equals("()")) return void.class;
        return null;
    }

    static String typeName(TypeOrPattern t) {
        if (t instanceof TupleType && ((TupleType) t).getElements().isEmpty()) return "()";
        if (t instanceof NamedType) return ((NamedType) t).getName().getText();
        return null;
    }

    static boolean hasResultType(Applicable defn) {
        Option<Type> r = NodeUtil.getReturnType(defn);
        return r != null && r.isSome();
    }

    /** The name of the declared result type, or null. */
    static String declaredResult(Applicable defn) {
        return hasResultType(defn) ? typeName(NodeUtil.getReturnType(defn).unwrap()) : null;
    }

    static boolean carried(Class<?> c) {
        return c == int.class || c == long.class || c == double.class || c == float.class
            || c == boolean.class || c == String.class || c == BigInteger.class;
    }

    /**
     * The helper that the string s names for the declaration defn, or an error message.  Among the
     * class's public static methods of that name, it takes the one whose parameters are the
     * declaration's, self first where the declaration has one (a functional method), or one more
     * in front for a dotted method's self, at the Java types that carry the declared types.
     */
    static Object find(String s, Applicable defn) {
        int dot = s.lastIndexOf('.');
        String cls = s.substring(0, dot), name = s.substring(dot + 1);
        Class<?> c;
        try { c = Class.forName(cls); }
        catch (ClassNotFoundException e) { return "Native helper class " + cls + " not found."; }
        List<Method> named = new ArrayList<Method>();
        for (Method x : c.getMethods())
            if (x.getName().equals(name) && Modifier.isStatic(x.getModifiers())) named.add(x);
        if (named.isEmpty()) return "Native helper " + s + " names no static method of " + cls + ".";
        List<Class<?>> want = new ArrayList<Class<?>>();
        boolean hasSelf = false;
        for (Param p : NodeUtil.getParams(defn)) {
            String pn = p.getName().getText();
            if (pn.equals("self")) { hasSelf = true; continue; }
            Class<?> j = javaFor(p.getIdType().isSome() ? typeName(p.getIdType().unwrap()) : null);
            if (j == null || j == void.class)
                return "Native helper " + s + ": no Java type carries the declared type of parameter " + pn + ".";
            want.add(j);
        }
        Class<?> res = null;    // a declaration without a result type is refused by NativeApp.init
        if (hasResultType(defn)) {
            res = javaFor(declaredResult(defn));
            if (res == null) return "Native helper " + s + ": no Java type carries the declared result type.";
        }
        List<Method> fits = new ArrayList<Method>();
        for (Method x : named) {
            Class<?>[] xs = x.getParameterTypes();
            int off = xs.length - want.size();          // 1: self first
            if (off < 0 || off > 1 || (hasSelf && off != 1)) continue;
            boolean ok = (res == null || x.getReturnType() == res)
                         && (x.getReturnType() == void.class || carried(x.getReturnType()));
            for (int i = 0; ok && i < xs.length; i++) {
                if (!carried(xs[i])) ok = false;
                else if (i >= off && xs[i] != want.get(i - off)) ok = false;
            }
            if (ok) fits.add(x);
        }
        if (fits.size() == 1) return fits.get(0);
        if (fits.isEmpty()) return "Native helper " + s + " has no overload that fits the declaration's types.";
        return "Native helper " + s + " has " + fits.size() + " overloads that fit the declaration's types.";
    }

    StaticNativeApp(Method m, Applicable defn) {
        this.m = m;
        this.ps = m.getParameterTypes();
        this.result = declaredResult(defn);
        int at = -1, i = 0;
        for (Param p : NodeUtil.getParams(defn)) { if (p.getName().getText().equals("self")) at = i; i++; }
        this.selfAt = at;
    }

    public int getArity() { return arity; }

    protected void init(Applicable app, boolean isFunctionalMethod) {
        arity = NodeUtil.getParams(app).size() - (isFunctionalMethod ? 1 : 0);
        super.init(app, isFunctionalMethod);
    }

    /** A function, or a functional method with its self among the arguments: self goes first. */
    public FValue applyToArgs(List<FValue> args) {
        if (selfAt <= 0) return call(args);
        List<FValue> all = new ArrayList<FValue>(args);
        all.add(0, all.remove(selfAt));
        return call(all);
    }

    /** A dotted method: self first. */
    public FValue applyMethod(FObject self, List<FValue> args) {
        List<FValue> all = new ArrayList<FValue>(args.size() + 1);
        all.add(self);
        all.addAll(args);
        return call(all);
    }

    private FValue call(List<FValue> args) {
        if (args.size() != ps.length) return error("Native " + m + " given " + args.size() + " arguments");
        Object[] xs = new Object[ps.length];
        for (int i = 0; i < ps.length; i++) xs[i] = unbox(ps[i], args.get(i));
        try {
            return box(m.getReturnType(), result, m.invoke(null, xs));
        }
        catch (InvocationTargetException e) {
            Throwable t = e.getCause();
            FortressError f = raised(t);
            if (f != null) throw f;
            if (t instanceof RuntimeException) throw (RuntimeException) t;
            if (t instanceof Error) throw (Error) t;
            return error(t.toString());
        }
        catch (IllegalAccessException e) {
            return error(e.toString());
        }
    }

    private static final Pattern RAISE = Pattern.compile("^fortress\\.\\w+\\$(\\w+)$");

    /** A helper's Utility.makeFortressException("fortress.<Api>$<Name>") names a compiled class;
        under walk it becomes the library's own exception object <Name>. */
    static FortressError raised(Throwable t) {
        if (!(t instanceof FortressImplementationError) || t.getMessage() == null) return null;
        Matcher x = RAISE.matcher(t.getMessage());
        if (!x.matches()) return null;
        return new FortressError((FObject) Driver.getFortressLibrary().getRootValue(x.group(1)));
    }

    static Object unbox(Class<?> c, FValue v) {
        if (c == int.class) return v instanceof FChar ? ((FChar) v).getChar() : v.getInt();
        if (c == long.class) return v.getLong();
        if (c == double.class) return v.getFloat();
        if (c == float.class) return (float) v.getFloat();
        if (c == boolean.class) return ((FBool) v).getBool();
        if (c == String.class) return v.getString();
        if (c == BigInteger.class) return v.getBigInteger();
        return error("No interpreter value for a Java " + c.getName());
    }

    /** The result at the declared type: int as ZZ32, NN32 or Char; long as ZZ64 or NN64. */
    static FValue box(Class<?> c, String declared, Object r) {
        if (c == void.class) return FVoid.V;
        if (c == int.class) {
            int i = (Integer) r;
            if ("NN32".equals(declared)) return FNN32.make(i);
            if ("Char".equals(declared)) return FChar.make(i);
            return FInt.make(i);
        }
        if (c == long.class) {
            long l = (Long) r;
            if ("NN64".equals(declared)) return FNN64.make(l);
            return FLong.make(l);
        }
        if (c == double.class) return FFloat.make((Double) r);
        if (c == float.class) return FRR32.make((Float) r);
        if (c == boolean.class) return FBool.make((Boolean) r);
        if (c == String.class) return FString.make((String) r);
        if (c == BigInteger.class) return FBigNum.make((BigInteger) r);
        return error("No interpreter value for a Java " + c.getName());
    }
}
