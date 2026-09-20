// kernel (a) over UNBOXED storage read through a BOXING accessor: a double[]
// store whose get() returns a fresh Box and whose put() unwraps one, with the
// arithmetic boxed as the runtime boxes it (Box.add/Box.mul).  This is the
// shape array-design.md section 2 describes for ZZ32Vector today ("the
// storage is unboxed; the traffic is not") and the shape every trait-level
// get()/put() has under the design's question-3 default; the report's
// KDotBoxed is Box[] storage and KDotPrim is double[] with no boxes.
// Same harness as perf-probes/kernels/java: one untimed pass, MULT timed.
public class KDotStore {
    static final int N = 4192, REPS = 200;
    static final class Store {
        final double[] v;
        Store(int n) { v = new double[n]; }
        Box get(int i) { return Box.make(v[i]); }
        void put(int i, Box b) { v[i] = b.getValue(); }
    }
    static double work() {
        Store x = new Store(N), y = new Store(N);
        for (int i = 0; i < N; i++) { x.put(i, Box.make((i % 17 + 1) / 17.0)); y.put(i, Box.make((i % 23 + 1) / 23.0)); }
        Box s = Box.make(0.0);
        for (int r = 0; r < REPS; r++) {
            Box d = Box.make(0.0);
            for (int i = 0; i < N; i++) d = Box.add(d, Box.mul(x.get(i), y.get(i)));
            s = Box.add(s, d); }
        return s.getValue(); }
    public static void main(String[] args) {
        int mult = args.length > 0 ? Integer.parseInt(args[0]) : 20;
        double s = work();
        long t0 = System.nanoTime();
        for (int m = 0; m < mult; m++) s = work();
        long t1 = System.nanoTime();
        System.out.println("kdot " + s);
        System.out.println("loop_ns " + ((t1 - t0) / mult));
    }
}
