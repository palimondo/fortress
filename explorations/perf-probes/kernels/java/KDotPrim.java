// kernel (a), primitive double[]: 4192-element dot product, 200 reps -- 4192 is exactly
// nParams() of MicroGptFlat, the flat parameter vector Adam touches.
// work() is one Fortress run of the timed loop (200 reps).  One untimed
// warm-up pass, then MULT timed passes; loop_ns is their mean, so it is
// directly comparable with the Fortress loop_ns.
public class KDotPrim {
    static final int N = 4192, REPS = 200;
    static double work() {
        double[] x = new double[N], y = new double[N];
        for (int i = 0; i < N; i++) { x[i] = (i % 17 + 1) / 17.0; y[i] = (i % 23 + 1) / 23.0; }
        double s = 0.0;
        for (int r = 0; r < REPS; r++) { double d = 0.0; for (int i = 0; i < N; i++) d += x[i] * y[i]; s += d; }
        return s; }

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
