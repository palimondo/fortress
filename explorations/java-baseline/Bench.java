// Bench -- the timing harness of the pure-Java microGPT, with no dependency.
// One run of it is one fork: a fresh JVM that warms up, then takes samples of
// three workloads in turn, so that a change in the machine's load during the
// run reaches all three alike.  A sample is the mean time of one call over a
// block of consecutive calls, timed by System.nanoTime around each call.
//
//   java Bench fork <warm-up seconds> <samples> <milliseconds per sample>
//   java Bench kernels <warm-up ms> <samples> <ms per sample>   each operation alone, at the model's sizes
//   java Bench scale <warm-up ms> <samples> <ms per sample> <n> ...   one product and one dot product, by size
//   java Bench stats < numbers, one per line
//   java Bench nothing       returns at once: the cost of a JVM alone
//
// The three workloads:
//   train5   the flat program's run after its loading: from the initial
//            parameters, five times step and adam at batch 1 on documents 0..4
//            (MicroGptFlat.fss:91-96 without the println).  The copy that
//            resets p, m and v is outside the timed span.
//   step1    one step at batch 1 on document 0, at the initial parameters
//   step4    one step at batch 4 on documents 0..3, at the initial parameters
// Run from explorations/run-c4/src, as the programs are.

import java.util.Arrays;
import java.util.Scanner;

final class Bench {
    static double sink;     // every loss and one gradient element are added here, so no call is dead code

    static int np;          // set in main for a fork, so that the other modes load no model class
    static double[] p0, p, m, v, g;
    static final int[][] docs = {{0}, {1}, {2}, {3}, {4}};
    static final int[] batch4 = {0, 1, 2, 3};

    // one timed call of each workload; returns nanoseconds
    static long train5() {
        System.arraycopy(p0, 0, p, 0, np); Arrays.fill(m, 0.0); Arrays.fill(v, 0.0);
        long t0 = System.nanoTime();
        for (int s = 0; s < 5; s++) {
            sink += MicroGptFlat.step(p, docs[s], g);
            MicroGptFlat.adam(p, m, v, g, s + 1, MicroGptFlat.learningRate(s));
        }
        long t = System.nanoTime() - t0;
        sink += p[np - 1];
        return t;
    }
    static long step1() {
        long t0 = System.nanoTime();
        sink += MicroGptFlat.step(p0, docs[0], g);
        long t = System.nanoTime() - t0;
        sink += g[np - 1];
        return t;
    }
    static long step4() {
        long t0 = System.nanoTime();
        sink += MicroGptFlat.step(p0, batch4, g);
        long t = System.nanoTime() - t0;
        sink += g[np - 1];
        return t;
    }
    static long call(int w) { return w == 0 ? train5() : w == 1 ? step1() : step4(); }
    static final String[] names = {"train5", "step1", "step4"};

    // n, min, the quartiles, max, mean and the sample standard deviation
    static String stats(double[] x) {
        double[] s = x.clone(); Arrays.sort(s);
        int n = s.length;
        double mean = 0.0; for (double e : s) mean += e; mean /= n;
        double var = 0.0; for (double e : s) var += (e - mean) * (e - mean);
        double sd = n > 1 ? Math.sqrt(var / (n - 1)) : 0.0;
        return String.format("n %d min %.2f q1 %.2f median %.2f q3 %.2f max %.2f mean %.2f sd %.2f",
                             n, s[0], quantile(s, 0.25), quantile(s, 0.5), quantile(s, 0.75), s[n - 1], mean, sd);
    }
    // linear interpolation between the order statistics
    static double quantile(double[] sorted, double q) {
        double h = (sorted.length - 1) * q;
        int lo = (int) Math.floor(h), hi = (int) Math.ceil(h);
        return sorted[lo] + (h - lo) * (sorted[hi] - sorted[lo]);
    }

    // ---- one operation alone ----
    interface Op { void run(); }
    // warm-up for the given time, then samples as in a fork; prints us per call
    static void time(String name, double warmMs, int samples, double sampleMs, Op op) {
        long end = System.nanoTime() + (long) (warmMs * 1e6), calls = 0, t0 = System.nanoTime();
        while (System.nanoTime() < end) { op.run(); calls++; }
        double per = (System.nanoTime() - t0) / (double) calls;
        int block = Math.max(1, (int) Math.round(sampleMs * 1e6 / per));
        double[] us = new double[samples];
        for (int s = 0; s < samples; s++) {
            long t = System.nanoTime();
            for (int i = 0; i < block; i++) op.run();
            us[s] = (System.nanoTime() - t) / 1e3 / block;
        }
        System.out.println(String.format("%-34s", name) + stats(us));
    }
    static double[] random(int n, long seed, double scale) {
        java.util.Random r = new java.util.Random(seed);
        double[] x = new double[n];
        for (int i = 0; i < n; i++) x[i] = r.nextGaussian() * scale;
        return x;
    }
    // every operation of one step at batch 1, with the step's shapes: n = 16 rows
    static void kernels(final double warm, final int samples, final double ms) {
        final int n = 16, E = 16, M = 64, V = 27, T = 16, H = 4, K = 4;
        final double[] w = random(4192, 1, 0.08), x = random(n * M, 2, 1.0), y = random(n * M, 3, 1.0), o = new double[n * M];
        final double[] g = new double[4192], pl = new double[H * T * T], pl2 = random(H * T * T, 4, 1.0), pl3 = new double[H * T * T];
        final double[] gg = random(4192, 5, 0.01), mm = new double[4192], vv = new double[4192], pp = random(4192, 6, 0.08);
        final int[] ids = new int[n];
        for (int i = 0; i < n; i++) ids[i] = i;
        time("mulT    16x16 . (16x16)^T  q,k,v", warm, samples, ms, new Op() { public void run() { FlatArrays.mulT(o, x, n, E, w, 0, E); } });
        time("mulT    16x16 . (64x16)^T  m0", warm, samples, ms, new Op() { public void run() { FlatArrays.mulT(o, x, n, E, w, 0, M); } });
        time("mulT    16x16 . (27x16)^T  pr", warm, samples, ms, new Op() { public void run() { FlatArrays.mulT(o, x, n, E, w, 0, V); } });
        time("addMulT 16x16 . (16x16)^T  x2", warm, samples, ms, new Op() { public void run() { FlatArrays.addMulT(o, y, x, n, E, w, 0, E); } });
        time("addMulT 16x64 . (16x64)^T  x4", warm, samples, ms, new Op() { public void run() { FlatArrays.addMulT(o, y, x, n, M, w, 0, E); } });
        time("mul     16x16 . 16x16  dh,dX1", warm, samples, ms, new Op() { public void run() { FlatArrays.mul(o, x, n, E, w, 0, E); } });
        time("mul     16x27 . 27x16  dX4", warm, samples, ms, new Op() { public void run() { FlatArrays.mul(o, x, n, V, w, 0, E); } });
        time("mul     16x16 . 16x64  dM0", warm, samples, ms, new Op() { public void run() { FlatArrays.mul(o, x, n, E, w, 0, M); } });
        time("mul     16x64 . 64x16  dX3", warm, samples, ms, new Op() { public void run() { FlatArrays.mul(o, x, n, M, w, 0, E); } });
        time("tMul    (16x16)^T . 16x16  gW*", warm, samples, ms, new Op() { public void run() { FlatArrays.tMul(g, 0, x, n, E, y, E); } });
        time("tMul    (16x27)^T . 16x16  gLM", warm, samples, ms, new Op() { public void run() { FlatArrays.tMul(g, 0, x, n, V, y, E); } });
        time("tMul    (16x16)^T . 16x64  gF2", warm, samples, ms, new Op() { public void run() { FlatArrays.tMul(g, 0, x, n, E, y, M); } });
        time("tMul    (16x64)^T . 16x16  gF1", warm, samples, ms, new Op() { public void run() { FlatArrays.tMul(g, 0, x, n, M, y, E); } });
        time("headsMulTScaleMask  4 planes", warm, samples, ms, new Op() { public void run() { FlatArrays.headsMulTScaleMask(pl, MicroGptFlat.mask, x, y, 2.0, 1, T, H, K); } });
        time("headsMulT           4 planes", warm, samples, ms, new Op() { public void run() { FlatArrays.headsMulT(pl3, x, y, 1, T, H, K); } });
        time("headsMul            4 planes", warm, samples, ms, new Op() { public void run() { FlatArrays.headsMul(o, pl2, y, 1, T, H, K); } });
        time("headsTMul           4 planes", warm, samples, ms, new Op() { public void run() { FlatArrays.headsTMul(o, pl2, y, 1, T, H, K); } });
        time("rows(sm)     64 rows of 16", warm, samples, ms, new Op() { public void run() { MicroGptFlat.rowsSm(pl3, pl2, H * T, T); } });
        time("rows(sm)     16 rows of 27", warm, samples, ms, new Op() { public void run() { MicroGptFlat.rowsSm(o, x, n, V); } });
        time("rows(sm_b)   64 rows of 16", warm, samples, ms, new Op() { public void run() { MicroGptFlat.rowsSmB(pl, pl2, pl2, H * T, T, 2.0); } });
        time("rows(rmsn)   16 rows of 16", warm, samples, ms, new Op() { public void run() { MicroGptFlat.rowsRmsn(o, x, n, E); } });
        time("rows(rmsn_b) 16 rows of 16", warm, samples, ms, new Op() { public void run() { MicroGptFlat.rowsRmsnB(o, y, x, n, E); } });
        time("onehotTMul   27x16", warm, samples, ms, new Op() { public void run() { FlatArrays.onehotTMul(g, 0, V, ids, x, n, E); } });
        time("adam         4192 elements", warm, samples, ms, new Op() { public void run() { MicroGptFlat.adam(pp, mm, vv, gg, 3, 0.01); } });
        final double[] p0 = FlatData.loadParams(MicroGptFlat.weightsDir, MicroGptFlat.matNames, 9, 4192);
        final int[] doc0 = {0};
        time("step         batch 1, document 0", warm, samples, ms, new Op() { public void run() { sink += MicroGptFlat.step(p0, doc0, g); } });
    }
    // one product, n x n times n x n, and one dot product of n*n elements, by n
    static void scale(final double warm, final int samples, final double ms, String[] sizes) {
        for (String size : sizes) {
            final int n = Integer.parseInt(size);
            final double[] a = random(n * n, 1, 1.0), b = random(n * n, 2, 1.0), o = new double[n * n];
            time("mul " + n + "x" + n + " . " + n + "x" + n, warm, samples, ms, new Op() { public void run() { FlatArrays.mul(o, a, n, n, b, 0, n); } });
            time("dot of " + n * n, warm, samples, ms, new Op() { public void run() { sink += FlatArrays.dot(a, 0, b, 0, n * n); } });
        }
    }

    public static void main(final String[] args) {
        if (args[0].equals("stats")) {
            Scanner in = new Scanner(System.in);
            double[] x = new double[1 << 16]; int n = 0;
            while (in.hasNextDouble()) x[n++] = in.nextDouble();
            System.out.println(stats(Arrays.copyOf(x, n)));
            return;
        }
        if (args[0].equals("nothing")) return;
        FlatArrays.inRuntime(new Runnable() { public void run() {
            if (args[0].equals("kernels")) kernels(Double.parseDouble(args[1]), Integer.parseInt(args[2]), Double.parseDouble(args[3]));
            else if (args[0].equals("scale")) scale(Double.parseDouble(args[1]), Integer.parseInt(args[2]), Double.parseDouble(args[3]), Arrays.copyOfRange(args, 4, args.length));
            else fork(args);
        } });
        if (sink != sink) System.out.println("sink " + sink);
    }
    static void fork(String[] args) {
        double warmSeconds = Double.parseDouble(args[1]);
        int samples = Integer.parseInt(args[2]);
        double sampleMs = Double.parseDouble(args[3]);
        np = MicroGptFlat.nParams();
        p = new double[np]; m = new double[np]; v = new double[np]; g = new double[np];
        p0 = FlatData.loadParams(MicroGptFlat.weightsDir, MicroGptFlat.matNames, 9, np);

        // the first call of each workload in this JVM, before any warm-up
        long[] first = new long[3];
        for (int w = 0; w < 3; w++) first[w] = call(w);
        // warm-up: the three workloads in turn, for the given time
        long warmEnd = System.nanoTime() + (long) (warmSeconds * 1e9), warmCalls = 0;
        while (System.nanoTime() < warmEnd) { for (int w = 0; w < 3; w++) call(w); warmCalls++; }
        // block sizes: the calls that fill one sample's time
        int[] block = new int[3];
        for (int w = 0; w < 3; w++) {
            long t = 0; for (int i = 0; i < 20; i++) t += call(w);
            block[w] = Math.max(1, (int) Math.round(sampleMs * 1e6 / (t / 20.0)));
        }
        // the samples, the workloads in turn
        double[][] us = new double[3][samples];
        for (int s = 0; s < samples; s++)
            for (int w = 0; w < 3; w++) {
                long t = 0;
                for (int i = 0; i < block[w]; i++) t += call(w);
                us[w][s] = t / 1e3 / block[w];
            }
        for (int w = 0; w < 3; w++)
            System.out.println(names[w] + " us/call: first " + String.format("%.0f", first[w] / 1e3) + " | block " + block[w] + " | " + stats(us[w])
                               + " | halves " + String.format("%.2f %.2f", median(us[w], 0, samples / 2), median(us[w], samples / 2, samples)));
        System.out.println("warm-up rounds " + warmCalls + " | sink " + sink);
    }
    static double median(double[] x, int from, int to) {
        double[] s = Arrays.copyOfRange(x, from, to); Arrays.sort(s);
        return quantile(s, 0.5);
    }
}
