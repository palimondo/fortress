// bench1, ablation C: boxed arithmetic (form B) with the accumulator held in a
// MutableFValue-shaped cell whose field is volatile, as the real one is
// (runtimeValues/MutableFValue.java).  Storing through a volatile field also
// stops escape analysis from scalar-replacing the boxes, so this is the
// honest cost of the boxing, not the JIT-can-see-through-it cost.
// No transaction checks, no literal round-trip, plain counted loop.
public class Bench1Cell {
    static final class FRR64 {
        final double val;
        private FRR64(double x) { val = x; }
        public double getValue() { return val; }
        public static FRR64 make(double x) { return new FRR64(x); }
    }
    static class MutableFValue {
        volatile Object value;
        public Object getValue() { return value; }
        public void setValue(Object v) { value = v; }
    }
    static FRR64 doubleMul(FRR64 a, FRR64 b) { return FRR64.make(a.getValue() * b.getValue()); }
    static FRR64 doubleAdd(FRR64 a, FRR64 b) { return FRR64.make(a.getValue() + b.getValue()); }

    public static void main(String[] args) {
        MutableFValue acc = new MutableFValue();
        acc.setValue(FRR64.make(0.0));
        long t0 = System.nanoTime();
        for (int i = 1; i <= 20000000; i++) {
            FRR64 a = (FRR64) acc.getValue();
            acc.setValue(doubleAdd(doubleMul(a, FRR64.make(0.9999999)), FRR64.make(0.0000001)));
        }
        long t1 = System.nanoTime();
        System.out.println("bench1 " + ((FRR64) acc.getValue()).getValue());
        System.out.println("loop_ns " + (t1 - t0));
    }
}
