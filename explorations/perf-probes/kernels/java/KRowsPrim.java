// kernel (c) over primitive double[]: rows(rmsn, m) on a 16x16 matrix, 400
// reps.  rmsn(x) = x / SQRT(epsilon + (x DOT x) / |x|).  The allocations
// mirror FlatArrays.rows: one result matrix per call and one temporary vector
// per row (the `/` in rmsn is a map that builds a fresh array).
public class KRowsPrim {
    static final int N = 16, REPS = 400;
    static final double EPS = 1e-5;
    static double[] m;
    static void init() { m = new double[N * N];
        for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) m[i * N + j] = ((3 * i + j) % 7) - 3.0; }
    static double[] work() { double[] o = null; for (int r = 0; r < REPS; r++) o = rows(m); return o; }
    static double[] rows(double[] m) {
        double[] out = new double[N * N];
        for (int i = 0; i < N; i++) {
            double[] y = rmsn(m, i * N);
            for (int j = 0; j < N; j++) out[i * N + j] = y[j]; }
        return out; }
    static double[] rmsn(double[] m, int off) {
        double d = 0.0;
        for (int j = 0; j < N; j++) d += m[off + j] * m[off + j];
        double s = Math.sqrt(EPS + d / N);
        double[] y = new double[N];
        for (int j = 0; j < N; j++) y[j] = m[off + j] / s;
        return y; }
    public static void main(String[] args) {
        int mult = args.length > 0 ? Integer.parseInt(args[0]) : 20;
        init();
        double[] o = work();
        long t0 = System.nanoTime();
        for (int k = 0; k < mult; k++) o = work();
        long t1 = System.nanoTime();
        System.out.println("krows " + o[0] + " " + o[N * N - 1]);
        System.out.println("loop_ns " + ((t1 - t0) / mult));
    }
}
