// kernel (c) over the generic array object: Object[] behind an interface, a
// row view object per row as FlatArrays.RowView is, checkcast on every read.
public class KRowsGen {
    static final int N = 16, REPS = 400;
    static final Box EPS = Box.make(1e-5), NN = Box.make(N);
    static Gen.Arr2 m;
    static void init() { m = new Gen.Prim2(N, N);
        for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) m.put(i, j, Box.make(((3 * i + j) % 7) - 3.0)); }
    static Gen.Arr2 work() { Gen.Arr2 o = null; for (int r = 0; r < REPS; r++) o = rows(m); return o; }
    static Gen.Arr2 rows(Gen.Arr2 m) {
        Gen.Arr2 out = new Gen.Prim2(N, N);
        for (int i = 0; i < N; i++) {
            Gen.Arr1 y = rmsn(new Gen.RowView(m, i, N));
            Gen.Arr1 o = new Gen.RowView(out, i, N);
            for (int j = 0; j < N; j++) o.put(j, y.get(j)); }
        return out; }
    static Gen.Arr1 rmsn(Gen.Arr1 x) {
        Box d = Box.make(0.0);
        for (int j = 0; j < x.size(); j++) d = Box.add(d, Box.mul((Box) x.get(j), (Box) x.get(j)));
        Box s = Box.sqrt(Box.add(EPS, Box.div(d, NN)));
        Gen.Arr1 y = new Gen.Prim1(x.size());
        for (int j = 0; j < x.size(); j++) y.put(j, Box.div((Box) x.get(j), s));
        return y; }
    public static void main(String[] args) {
        int mult = args.length > 0 ? Integer.parseInt(args[0]) : 20;
        init();
        Gen.Arr2 o = work();
        long t0 = System.nanoTime();
        for (int k = 0; k < mult; k++) o = work();
        long t1 = System.nanoTime();
        System.out.println("krows " + ((Box) o.get(0, 0)).getValue() + " " + ((Box) o.get(N - 1, N - 1)).getValue());
        System.out.println("loop_ns " + ((t1 - t0) / mult));
    }
}
