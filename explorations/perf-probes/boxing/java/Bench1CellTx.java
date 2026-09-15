// bench1, ablation CT: ablation C plus the two BaseTask.inATransaction() calls
// the generated loop body makes per iteration (one guarding the read of the
// accumulator cell, one guarding the write).  BaseTask.java:246-254 builds the
// debug message eagerly at the call site --
//   debug("inATransaction: ftr = " + ftr + " task = " + ftr.getTask())
// -- and debug is a private static Boolean (boxed, non-final) that is false.
public class Bench1CellTx {
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
    private static Boolean debug = false;
    private static Object task = new Object();
    private static void debug(String s) {
        if (debug) System.out.println("BaseTaskDebug: " + Thread.currentThread().getName() + ":" + s);
    }
    public static boolean inATransaction() {
        debug("inATransaction: ftr = " + Thread.currentThread() + " task = " + task);
        return false;
    }
    static FRR64 doubleMul(FRR64 a, FRR64 b) { return FRR64.make(a.getValue() * b.getValue()); }
    static FRR64 doubleAdd(FRR64 a, FRR64 b) { return FRR64.make(a.getValue() + b.getValue()); }

    public static void main(String[] args) {
        MutableFValue acc = new MutableFValue();
        acc.setValue(FRR64.make(0.0));
        long t0 = System.nanoTime();
        for (int i = 1; i <= 20000000; i++) {
            Object v = inATransaction() ? acc.getValue() : acc.getValue();
            FRR64 r = doubleAdd(doubleMul((FRR64) v, FRR64.make(0.9999999)), FRR64.make(0.0000001));
            if (inATransaction()) acc.setValue(r); else acc.setValue(r);
        }
        long t1 = System.nanoTime();
        System.out.println("bench1 " + ((FRR64) acc.getValue()).getValue());
        System.out.println("loop_ns " + (t1 - t0));
    }
}
