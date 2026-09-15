// bench2, form B+L: form B plus the FFloatLiteral string round-trip the
// generated loop body performs for each of the two float literals on every
// iteration (FFloatLiteral.make(D) then coerce_RR64 -> asRR64, i.e.
// Double.toString followed by Double.valueOf).
public class Bench2BoxedLit {
    static final class FRR64 {
        final double val;
        private FRR64(double x) { val = x; }
        public double getValue() { return val; }
        public static FRR64 make(double x) { return new FRR64(x); }
    }
    static final class FFloatLiteral {
        private String val;
        private FFloatLiteral(double v) { this.val = Double.valueOf(v).toString(); }
        public static FFloatLiteral make(double x) { return new FFloatLiteral(x); }
        public FRR64 asRR64() { return FRR64.make(Double.valueOf(val)); }
    }
    static FRR64 coerce_RR64(FFloatLiteral l) { return l.asRR64(); }
    static FRR64 doubleMul(FRR64 a, FRR64 b) { return FRR64.make(a.getValue() * b.getValue()); }
    static FRR64 doubleAdd(FRR64 a, FRR64 b) { return FRR64.make(a.getValue() + b.getValue()); }

    static final class V {
        final FRR64 data;
        V(FRR64 d) { data = d; }
        FRR64 data()  { return dataP(); }
        FRR64 dataP() { return data; }
        V plus(V o) { return plusP(o); }
        V plusP(V o) { return new V(doubleAdd(data, o.data())); }
        V dot(V o)  { return dotP(o); }
        V dotP(V o) { return new V(doubleMul(data, o.data())); }
    }
    public static void main(String[] args) {
        V s = new V(coerce_RR64(FFloatLiteral.make(0.0)));
        long t0 = System.nanoTime();
        for (int i = 1; i <= 2000000; i++) {
            s = s.plus(new V(coerce_RR64(FFloatLiteral.make(1.0))))
                 .dot(new V(coerce_RR64(FFloatLiteral.make(0.9999999))));
        }
        long t1 = System.nanoTime();
        System.out.println("bench2 " + s.data.getValue());
        System.out.println("loop_ns " + (t1 - t0));
    }
}
