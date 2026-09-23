package com.sun.fortress.interpreter.evaluator.types;

// Probe for price-keep-the-rule.md, item 2: records, at run time, every place where the
// interpreter's library or a test relies on the NESTED numeric tower
// (ZZ32 <: ZZ64 <: ZZ <: AnyIntegral <: QQ <: RR64 <: Number, with the algebra at every level)
// in a way the flat tower of the compiler prelude would not provide.
//
// A value's "leaf" is the tower trait its object extends directly (Int -> ZZ32, Long -> ZZ64,
// BigNum -> ZZ, NN32 -> NN32, UnsignedLong -> NN64, Ratio -> QQ, Float/FloatLiteral -> RR64,
// RR32 -> RR32).  Under the flat tower a leaf keeps, as supertypes, itself, Number and (for the
// integer leaves) AnyIntegral, plus the self-typed algebra traits instantiated at itself.
// A record is written when a check SUCCEEDS only because of something the flat tower removes:
//   tower   : a declared type that is another tower trait (ZZ32 value where ZZ64/ZZ/QQ/RR64 is declared)
//   alg     : a self-typed algebra trait at another leaf (Integral[\ZZ64\] for a ZZ32 value)
//   numalg  : a self-typed algebra trait at Number (StandardPartialOrder[\Number\], AdditiveGroup[\Number\], ...)
//   inherit : a method body defined in another tower trait runs with this value as self
//   numdef  : a method body defined in Number itself runs (the flat Number of the prelude has none)
// Off unless the environment variable NESTPROBE_OUT names the file the counts are written to at exit.
// Nothing here changes what the interpreter does: every hook only observes a check that already passed.

import com.sun.fortress.interpreter.evaluator.values.FValue;
import com.sun.fortress.useful.HasAt;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.ArrayDeque;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public final class NestProbe {
    public static final boolean ON = System.getenv("NESTPROBE_OUT") != null;
    private static final ConcurrentHashMap<String, AtomicLong> COUNTS = new ConcurrentHashMap<String, AtomicLong>();
    private static final ThreadLocal<ArrayDeque<HasAt>> SITES = new ThreadLocal<ArrayDeque<HasAt>>() {
        protected ArrayDeque<HasAt> initialValue() { return new ArrayDeque<HasAt>(); }
    };
    private static final ThreadLocal<int[]> SUPPRESS = new ThreadLocal<int[]>() {
        protected int[] initialValue() { return new int[1]; }
    };
    static {
        if (ON) Runtime.getRuntime().addShutdownHook(new Thread() { public void run() { dump(); } });
    }

    private static final Map<String, String> LEAF = Map.of(
        "Int", "ZZ32", "IntLiteral", "ZZ32", "Long", "ZZ64", "BigNum", "ZZ", "NN32", "NN32",
        "UnsignedLong", "NN64", "Ratio", "QQ", "Float", "RR64", "FloatLiteral", "RR64", "RR32", "RR32");
    private static final Set<String> TOWER = Set.of(
        "ZZ32", "ZZ64", "ZZ", "NN32", "NN64", "QQ", "RR64", "RR32", "AnyIntegral", "Number");
    private static final Set<String> ALGEBRA = Set.of(
        "Equality", "StandardPartialOrder", "StandardMin", "StandardMax", "StandardMinMax",
        "StandardTotalOrder", "Integral", "AdditiveGroup", "MultiplicativeRing");
    private static final Set<String> INTEGRAL = Set.of("ZZ32", "ZZ64", "ZZ", "NN32", "NN64");

    private static String base(String s) {
        int i = s.lastIndexOf('.');
        return i < 0 ? s : s.substring(i + 1);
    }

    private static String tname(FType t) {
        if (t instanceof GenericTypeInstance) {
            GenericTypeInstance g = (GenericTypeInstance) t;
            List<FType> ps = g.getTypeParams();
            return base(g.getGeneric().getName()) + "[" + (ps.isEmpty() ? "" : base(ps.get(0).getName())) + "]";
        }
        return base(t.getName());
    }

    private static String leafOf(FValue v) {
        if (v == null) return null;
        FType t = v.type();
        if (t == null) return null;
        return LEAF.get(base(t.getName()));
    }

    /** The category if `target` holds for a value whose leaf is `leaf` only in the nested tower, else null. */
    private static String category(FType target, String leaf) {
        if (target instanceof GenericTypeInstance) {
            GenericTypeInstance g = (GenericTypeInstance) target;
            if (!ALGEBRA.contains(base(g.getGeneric().getName()))) return null;
            List<FType> ps = g.getTypeParams();
            if (ps.isEmpty()) return null;
            String a = base(ps.get(0).getName());
            if (a.equals(leaf)) return null;
            return a.equals("Number") ? "numalg" : "alg";
        }
        String n = base(target.getName());
        if (!TOWER.contains(n) || n.equals(leaf) || n.equals("Number")) return null;
        if (n.equals("AnyIntegral") && INTEGRAL.contains(leaf)) return null;
        return "tower";
    }

    public static void push(HasAt site) { if (ON) SITES.get().push(site == null ? new HasAt.FromString("?") : site); }
    public static void pop() { if (ON) { ArrayDeque<HasAt> d = SITES.get(); if (!d.isEmpty()) d.pop(); } }
    public static void suppress() { if (ON) SUPPRESS.get()[0]++; }
    public static void unsuppress() { if (ON) SUPPRESS.get()[0]--; }

    /** FType.typeMatch with `site` as the location a passing check is attributed to. */
    public static boolean typeMatchAt(FType ft, FValue v, HasAt site) {
        push(site);
        try { return ft.typeMatch(v); } finally { pop(); }
    }

    /** A type check that PASSED: FType.typeMatch, a typed local declaration, a typecase arm. */
    public static void passed(FType target, FValue v, String kind, HasAt site) {
        if (!ON || SUPPRESS.get()[0] > 0 || target == null) return;
        String leaf = leafOf(v);
        if (leaf == null) return;
        String cat = category(target, leaf);
        if (cat == null) return;
        if (kind == null) kind = caller();
        record(kind, cat, tname(target), leaf, site);
    }

    /** A method body about to run with `self`; `definer` is the trait or object that declares it. */
    public static void method(FType definer, FValue self, java.util.function.Supplier<String> mname) {
        if (!ON || definer == null) return;
        String leaf = leafOf(self);
        if (leaf == null) return;
        String cat;
        if (base(definer.getName()).equals("Number") && !(definer instanceof GenericTypeInstance)) cat = "numdef";
        else {
            cat = category(definer, leaf);
            if (cat == null) return;
            if (cat.equals("tower")) cat = "inherit";
        }
        record("method", cat, tname(definer) + "." + mname.get(), leaf, null);
    }

    private static String caller() {
        return StackWalker.getInstance().walk(s -> s
            .map(f -> f.getClassName().substring(f.getClassName().lastIndexOf('.') + 1) + "." + f.getMethodName())
            .filter(n -> !n.startsWith("NestProbe.") && !n.startsWith("FType.") && !n.startsWith("SymbolicType."))
            .findFirst().orElse("?"));
    }

    private static void record(String kind, String cat, String target, String leaf, HasAt site) {
        if (site == null) {
            ArrayDeque<HasAt> d = SITES.get();
            site = d.isEmpty() ? null : d.peek();
        }
        String at;
        try { at = site == null ? "?" : site.at(); } catch (RuntimeException e) { at = "?"; }
        String key = kind + "\t" + cat + "\t" + target + "\t" + leaf + "\t" + at;
        AtomicLong c = COUNTS.get(key);
        if (c == null) { COUNTS.putIfAbsent(key, new AtomicLong()); c = COUNTS.get(key); }
        c.incrementAndGet();
    }

    private static void dump() {
        try (PrintWriter w = new PrintWriter(new FileWriter(System.getenv("NESTPROBE_OUT")))) {
            for (Map.Entry<String, AtomicLong> e : COUNTS.entrySet()) w.println(e.getValue().get() + "\t" + e.getKey());
        } catch (Exception e) {
            System.err.println("NestProbe: could not write " + System.getenv("NESTPROBE_OUT") + ": " + e);
        }
    }
}
