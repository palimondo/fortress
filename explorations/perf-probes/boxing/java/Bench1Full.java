// bench1, form F: a Java model of *everything* the generated bench1 bytecode
// does per iteration, not only the boxing.  Modelled line by line on:
//   javap/bench1.javap.txt, javap/bench1.loopbody.javap.txt  (the generated code)
//   runtimeValues/{FRR64,FFloatLiteral,FZZ32,MutableFValue}.java
//   runtimeSystem/BaseTask.java            (inATransaction + its debug() call)
//   Library/CompilerLibrary.fss:340-348    (countedseqloop: the "sequential"
//                                           loop is a binary recursive split)
// Everything here is modelled, not measured; its purpose is to check that the
// named costs add up to the measured compiled-Fortress time.
public class Bench1Full {

    // ---- runtimeValues ----
    static final class FRR64 {
        final double val;
        private FRR64(double x) { val = x; }
        public double getValue() { return val; }
        public static FRR64 make(double x) { return new FRR64(x); }
        public String toString() { return String.valueOf(val); }
    }
    static final class FFloatLiteral {
        private String val;
        private FFloatLiteral(double v) { this.val = Double.valueOf(v).toString(); }
        public static FFloatLiteral make(double x) { return new FFloatLiteral(x); }
        public FRR64 asRR64() { return FRR64.make(Double.valueOf(val)); }
    }
    static final class FZZ32 {
        final int val;
        private FZZ32(int x) { val = x; }
        public int getValue() { return val; }
        public static FZZ32 make(int x) { return new FZZ32(x); }
        public String toString() { return String.valueOf(val); }
    }
    static final class FBoolean {
        final boolean val;
        private FBoolean(boolean b) { val = b; }
        public boolean getValue() { return val; }
        public static FBoolean make(boolean b) { return new FBoolean(b); }
    }
    static class MutableFValue {
        volatile Object value;            // volatile, as in the real class
        public Object getValue() { return value; }
        public void setValue(Object v) { value = v; }
    }

    // ---- runtimeSystem/BaseTask ----
    private static Boolean debug = false;                     // boxed, non-final
    private static Object task = new Object();
    private static void debug(String s) {
        if (debug) System.out.println("BaseTaskDebug: " + Thread.currentThread().getName() + ":" + s);
    }
    public static boolean inATransaction() {
        // the argument string is built on every call, as in BaseTask.java:248
        debug("inATransaction: ftr = " + Thread.currentThread() + " task = " + task);
        return false;
    }

    // ---- arrows ----
    interface Arrow { Object apply(FZZ32 x); }
    interface Pred  { FBoolean apply(FZZ32 x); }

    static final class Body implements Arrow {
        final MutableFValue acc;
        Body(MutableFValue acc) { this.acc = acc; }
        public Object apply(FZZ32 i) {
            Object v = inATransaction() ? acc.getValue() : acc.getValue();
            FRR64 a = (FRR64) v;
            FRR64 r = doubleAdd(doubleMul(a, FFloatLiteral.make(0.9999999).asRR64()),
                                FFloatLiteral.make(0.0000001).asRR64());
            if (inATransaction()) acc.setValue(r); else acc.setValue(r);
            return null;                                       // FVoid.make() is a singleton
        }
    }
    static final class AlwaysTrue implements Pred {
        public FBoolean apply(FZZ32 x) { return FBoolean.make(true); }
    }

    static FRR64 doubleMul(FRR64 a, FRR64 b) { return FRR64.make(a.getValue() * b.getValue()); }
    static FRR64 doubleAdd(FRR64 a, FRR64 b) { return FRR64.make(a.getValue() + b.getValue()); }
    static FZZ32 zzPlus(FZZ32 a, FZZ32 b) { return FZZ32.make(a.getValue() + b.getValue()); }
    static FZZ32 zzDiv(FZZ32 a, FZZ32 b) { return FZZ32.make(a.getValue() / b.getValue()); }
    static FBoolean zzEq(FZZ32 a, FZZ32 b) { return FBoolean.make(a.getValue() == b.getValue()); }
    static FBoolean zzGe(FZZ32 a, FZZ32 b) { return FBoolean.make(a.getValue() >= b.getValue()); }
    static final FZZ32 TWO = FZZ32.make(2);
    static final FZZ32 ONE = FZZ32.make(1);

    // CompilerLibrary.fss:340-348
    static void countedseqloop(FZZ32 lo, FZZ32 hi, Pred p, Arrow body) {
        if (zzEq(lo, hi).getValue()) {
            if (p.apply(lo).getValue()) body.apply(lo);
        } else {
            FZZ32 z = zzPlus(lo, hi);
            FZZ32 mid = zzGe(z, FZZ32.make(0)).getValue() ? zzDiv(z, TWO)
                                                          : zzDiv(zzPlus(z, FZZ32.make(-1)), TWO);
            countedseqloop(lo, mid, p, body);
            countedseqloop(zzPlus(mid, ONE), hi, p, body);
        }
    }

    public static void main(String[] args) {
        MutableFValue acc = new MutableFValue();
        acc.setValue(FFloatLiteral.make(0.0).asRR64());
        Body body = new Body(acc);
        AlwaysTrue p = new AlwaysTrue();
        long t0 = System.nanoTime();
        countedseqloop(FZZ32.make(1), FZZ32.make(20000000), p, body);
        long t1 = System.nanoTime();
        System.out.println("bench1 " + ((FRR64) acc.getValue()).getValue());
        System.out.println("loop_ns " + (t1 - t0));
    }
}
