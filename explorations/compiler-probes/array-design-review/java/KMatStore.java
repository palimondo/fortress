// kernel (b) over UNBOXED storage read through a BOXING accessor (see
// KDotStore.java): 200 products of 16x16 by 16x16, each element read a fresh
// Box, each element written through put(), arithmetic boxed as the runtime's.
public class KMatStore {
    static final int N = 16, REPS = 200;
    static final class Store {
        final double[] v;
        Store(int n) { v = new double[n]; }
        Box get(int i) { return Box.make(v[i]); }
        void put(int i, Box b) { v[i] = b.getValue(); }
    }
    static Store a, b;
    static void init() {
        a = new Store(N * N); b = new Store(N * N);
        for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) {
            a.put(i * N + j, Box.make((3 * i + j) % 7)); b.put(i * N + j, Box.make((5 * i + 2 * j) % 9)); } }
    static Store work() { Store c = null; for (int r = 0; r < REPS; r++) c = mul(a, b); return c; }
    static Store mul(Store a, Store b) {
        Store c = new Store(N * N);
        for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) {
            Box s = Box.make(0.0);
            for (int k = 0; k < N; k++) s = Box.add(s, Box.mul(a.get(i * N + k), b.get(k * N + j)));
            c.put(i * N + j, s); }
        return c; }
    public static void main(String[] args) {
        int mult = args.length > 0 ? Integer.parseInt(args[0]) : 20;
        init();
        Store c = work();
        long t0 = System.nanoTime();
        for (int m = 0; m < mult; m++) c = work();
        long t1 = System.nanoTime();
        System.out.println("kmat " + c.get(0).getValue() + " " + c.get(N * N - 1).getValue());
        System.out.println("loop_ns " + ((t1 - t0) / mult));
    }
}
