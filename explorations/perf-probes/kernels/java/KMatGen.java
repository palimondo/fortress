// kernel (b) over the generic array object: Object[] behind an interface,
// checkcast on every read, boxes as in KMatBoxed.
public class KMatGen {
    static final int N = 16, REPS = 200;
    static Gen.Arr2 a, b;
    static void init() {
        a = new Gen.Prim2(N, N); b = new Gen.Prim2(N, N);
        for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) {
            a.put(i, j, Box.make((3 * i + j) % 7)); b.put(i, j, Box.make((5 * i + 2 * j) % 9)); } }
    static Gen.Arr2 work() { Gen.Arr2 c = null; for (int r = 0; r < REPS; r++) c = mul(a, b); return c; }
    static Gen.Arr2 mul(Gen.Arr2 a, Gen.Arr2 b) {
        Gen.Arr2 c = new Gen.Prim2(N, N);
        for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) {
            Box s = Box.make(0.0);
            for (int k = 0; k < N; k++) s = Box.add(s, Box.mul((Box) a.get(i, k), (Box) b.get(k, j)));
            c.put(i, j, s); }
        return c; }
    public static void main(String[] args) {
        int mult = args.length > 0 ? Integer.parseInt(args[0]) : 20;
        init();
        Gen.Arr2 c = work();
        long t0 = System.nanoTime();
        for (int m = 0; m < mult; m++) c = work();
        long t1 = System.nanoTime();
        System.out.println("kmat " + ((Box) c.get(0, 0)).getValue() + " " + ((Box) c.get(N - 1, N - 1)).getValue());
        System.out.println("loop_ns " + ((t1 - t0) / mult));
    }
}
