// kernel (c) over an array of the runtime's boxes.
public class KRowsBoxed {
    static final int N = 16, REPS = 400;
    static final Box EPS = Box.make(1e-5), NN = Box.make(N);
    static Box[] m;
    static void init() { m = new Box[N * N];
        for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) m[i * N + j] = Box.make(((3 * i + j) % 7) - 3.0); }
    static Box[] work() { Box[] o = null; for (int r = 0; r < REPS; r++) o = rows(m); return o; }
    static Box[] rows(Box[] m) {
        Box[] out = new Box[N * N];
        for (int i = 0; i < N; i++) {
            Box[] y = rmsn(m, i * N);
            for (int j = 0; j < N; j++) out[i * N + j] = y[j]; }
        return out; }
    static Box[] rmsn(Box[] m, int off) {
        Box d = Box.make(0.0);
        for (int j = 0; j < N; j++) d = Box.add(d, Box.mul(m[off + j], m[off + j]));
        Box s = Box.sqrt(Box.add(EPS, Box.div(d, NN)));
        Box[] y = new Box[N];
        for (int j = 0; j < N; j++) y[j] = Box.div(m[off + j], s);
        return y; }
    public static void main(String[] args) {
        int mult = args.length > 0 ? Integer.parseInt(args[0]) : 20;
        init();
        Box[] o = work();
        long t0 = System.nanoTime();
        for (int k = 0; k < mult; k++) o = work();
        long t1 = System.nanoTime();
        System.out.println("krows " + o[0].getValue() + " " + o[N * N - 1].getValue());
        System.out.println("loop_ns " + ((t1 - t0) / mult));
    }
}
