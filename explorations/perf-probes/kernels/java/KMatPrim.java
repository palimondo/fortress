// kernel (b) over primitive double[]: 16x16 by 16x16, 200 products, a fresh
// result matrix per product (which is what the Fortress program asks for).
// work() is one Fortress run of the timed loop (200 products).  One untimed
// warm-up pass, then MULT timed passes; loop_ns is their mean.
public class KMatPrim {
    static final int N = 16, REPS = 200;
    static double[] a, b;
    static void init() {
        a = new double[N * N]; b = new double[N * N];
        for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) {
            a[i * N + j] = (3 * i + j) % 7; b[i * N + j] = (5 * i + 2 * j) % 9; } }
    static double[] work() { double[] c = null; for (int r = 0; r < REPS; r++) c = mul(a, b); return c; }
    static double[] mul(double[] a, double[] b) {
        double[] c = new double[N * N];
        for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) {
            double s = 0.0;
            for (int k = 0; k < N; k++) s += a[i * N + k] * b[k * N + j];
            c[i * N + j] = s; }
        return c; }
    public static void main(String[] args) {
        int mult = args.length > 0 ? Integer.parseInt(args[0]) : 20;
        init();
        double[] c = work();
        long t0 = System.nanoTime();
        for (int m = 0; m < mult; m++) c = work();
        long t1 = System.nanoTime();
        System.out.println("kmat " + c[0] + " " + c[N * N - 1]);
        System.out.println("loop_ns " + ((t1 - t0) / mult));
    }
}
