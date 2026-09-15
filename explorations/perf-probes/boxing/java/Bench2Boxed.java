// bench2, form B: form O plus the RR64 boxing the generated code does --
// bench2$V's field is declared FRR64 (javap/bench2.V.javap.txt), and
// "+?0?"/"DOT?0?" go through CompilerBuiltin's static forwarders to the native
// wrapper, which unboxes both operands and allocates a fresh FRR64 result.
// Four V + four FRR64 allocations per iteration, and the getter indirection
// data() -> data?() that the generated class has.
public class Bench2Boxed {
    static final class FRR64 {
        final double val;
        private FRR64(double x) { val = x; }
        public double getValue() { return val; }
        public static FRR64 make(double x) { return new FRR64(x); }
    }
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
        V s = new V(FRR64.make(0.0));
        long t0 = System.nanoTime();
        for (int i = 1; i <= 2000000; i++) {
            s = s.plus(new V(FRR64.make(1.0))).dot(new V(FRR64.make(0.9999999)));
        }
        long t1 = System.nanoTime();
        System.out.println("bench2 " + s.data.getValue());
        System.out.println("loop_ns " + (t1 - t0));
    }
}
