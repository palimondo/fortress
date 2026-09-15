// bench1, form B: every RR64 value is a freshly allocated object, modelled on
// com.sun.fortress.compiler.runtimeValues.FRR64 (final class, final double
// field, private constructor, static make(), no caching whatsoever) and on the
// generated native wrapper for simpleDoubleArith, which does
//   getValue(); getValue(); <primitive op>; FRR64.make(...)
// Four allocations per iteration: one per float literal, one per arithmetic
// result -- the same count the generated bench1 bytecode performs.
public class Bench1Boxed {

    static final class FRR64 {
        final double val;
        private FRR64(double x) { val = x; }
        public double getValue() { return val; }
        public static FRR64 make(double x) { return new FRR64(x); }
    }

    // the generated native wrapper's shape, exactly
    static FRR64 doubleMul(FRR64 a, FRR64 b) { return FRR64.make(a.getValue() * b.getValue()); }
    static FRR64 doubleAdd(FRR64 a, FRR64 b) { return FRR64.make(a.getValue() + b.getValue()); }

    public static void main(String[] args) {
        FRR64 acc = FRR64.make(0.0);
        long t0 = System.nanoTime();
        for (int i = 1; i <= 20000000; i++) {
            acc = doubleAdd(doubleMul(acc, FRR64.make(0.9999999)), FRR64.make(0.0000001));
        }
        long t1 = System.nanoTime();
        System.out.println("bench1 " + acc.getValue());
        System.out.println("loop_ns " + (t1 - t0));
    }
}
