// MicroGptFlatCheck -- the full check of the pure-Java microGPT: the 40 checks
// of explorations/run-c4/src/MicroGptFlatCheck.fss, against the same reference
// files, with the same asserted values and the same tolerances.  One line per
// check with the measured difference and PASS or FAIL, then the verdict; any
// FAIL ends the run with a non-zero status.  Run from explorations/run-c4/src.

final class MicroGptFlatCheck {
    static final String goldensDir = MicroGptFlatQuick.goldensDir;               // MicroGptFlatCheck.fss:15
    static final double tolLoss = 1e-12, tolGrad = 1e-12, tolFd = 1e-8;         // MicroGptFlatCheck.fss:16-18

    static void report(String name, double diff, double tol) { MicroGptFlatQuick.report(name, diff, tol); }
    static double maxAbsDiff(double[] a, double[] b) { return MicroGptFlatQuick.maxAbsDiff(a, b); }

    // MicroGptFlatCheck.fss:74-90, checkFd: central differences, eps 1e-6, at
    // the golden indices
    static void checkFd(String tag, String path, int[] bk, double[] g, double[] p0) {
        final double eps = 1e-6;
        String[] fdRows = FlatData.readLines(path);
        double[] scratch = new double[p0.length];
        double worst = 0.0;
        for (String row : fdRows) {
            double[] nums = FlatData.numbersOf(row);
            int idx = (int) Math.ceil(nums[0]);
            double[] pp = p0.clone(); pp[idx] = p0[idx] + eps;
            double[] pm = p0.clone(); pm[idx] = p0[idx] - eps;
            double lp = MicroGptFlat.step(pp, bk, scratch);
            double lm = MicroGptFlat.step(pm, bk, scratch);
            double fd = (lp - lm) / (2 * eps);
            double diff = Math.abs(fd - g[idx]);
            worst = Math.max(worst, diff);
            report(tag + " P[" + idx + "] backprop " + g[idx] + " fd " + fd + " (golden fd " + nums[2] + ")", diff, tolFd);
        }
        report(tag + " worst |fd - backprop|", worst, tolFd);
    }

    // MicroGptFlatCheck.fss:29-98, run
    public static void main(String[] args) { FlatArrays.inRuntime(new Runnable() { public void run() { MicroGptFlatCheck.run(); } }); }
    static void run() {
        System.out.println("MicroGptFlat checks (pure Java) | threads 1 | tolerances: loss " + tolLoss + " grad " + tolGrad + " fd " + tolFd);
        long wall0 = System.nanoTime();
        FlatData.Corpus corpus = MicroGptFlat.corpus;
        int np = MicroGptFlat.nParams();
        double[] p0 = FlatData.loadParams("../../apl/reference/dzaima/w", MicroGptFlat.matNames, 9, np);
        // 0. the loaders against the goldens' P0 and corpus rows
        report("loader: max |P - P0| over 4192", maxAbsDiff(p0, FlatData.readVector(goldensDir + "/P0.txt", 4192)), 0.0);
        report("corpus: max |row - golden| over documents 0..15", MicroGptFlatQuick.corpusDiff(FlatData.readLines(goldensDir + "/corpus_first16.txt")), 0.0);
        // 1. batch 1, five Adam steps from the committed weights on documents 0..4
        double[] losses = FlatData.readVector(goldensDir + "/losses_batch1_5steps.txt", 5);
        double[] p = p0.clone(), m = new double[np], v = new double[np], g = new double[np], g0 = new double[np];
        for (int s = 0; s < 5; s++) {
            int[] b = {s};
            long t0 = System.nanoTime();
            double l = MicroGptFlat.step(p, b, g);
            if (s == 0) System.arraycopy(g, 0, g0, 0, np);
            MicroGptFlat.adam(p, m, v, g, s + 1, MicroGptFlat.learningRate(s));
            if (s == 0) {
                report("step 0 batch 1: max |gradient - golden| over 4192", maxAbsDiff(g0, FlatData.readVector(goldensDir + "/grad_step0.txt", 4192)), tolGrad);
                report("step 0 batch 1: max |P after Adam - golden| over 4192", maxAbsDiff(p, FlatData.readVector(goldensDir + "/P_after_adam.txt", 4192)), tolGrad);
                report("step 0 batch 1: zero gradient entries - 464", Math.abs(1.0 * MicroGptFlatQuick.zeroCount(g0) - 464.0), 0.0);
            }
            report("batch 1 step " + (s + 1) + " loss " + l + " vs " + losses[s] + " (" + (System.nanoTime() - t0) / 1e6 + " ms)", Math.abs(l - losses[s]), tolLoss);
        }
        // 2. batch 4 on documents 0..3 from the initial weights
        double[] b4 = FlatData.readVector(goldensDir + "/batch4.txt", 9);      // loss, 4 single losses, 4 lengths
        double[] g4 = new double[np], gd = new double[np];
        long t4 = System.nanoTime();
        double l4 = MicroGptFlat.step(p0, new int[] {0, 1, 2, 3}, g4);
        report("batch 4 loss " + l4 + " vs golden " + b4[0] + " (" + (System.nanoTime() - t4) / 1e6 + " ms)", Math.abs(l4 - b4[0]), tolLoss);
        double[] singles = new double[4];
        for (int d = 0; d < 4; d++) {
            double ld = MicroGptFlat.step(p0, new int[] {d}, gd);
            singles[d] = ld;
            report("batch 4: single-document loss " + ld + " vs golden " + b4[1 + d] + " (document " + d + ")", Math.abs(ld - b4[1 + d]), tolLoss);
        }
        double num = 0.0, den = 0.0;
        for (int d = 0; d < 4; d++) { num += singles[d] * (1.0 * corpus.length(d)); den += 1.0 * corpus.length(d); }
        double weighted = num / den;
        report("batch 4 loss vs token-weighted mean of single-document losses " + weighted, Math.abs(l4 - weighted), tolLoss);
        // 3. finite differences at the eleven golden indices, central, eps 1e-6
        checkFd("fd doc 0", goldensDir + "/fd_doc0.txt", new int[] {0}, g0, p0);
        checkFd("fd batch 4", goldensDir + "/fd_batch4.txt", new int[] {0, 1, 2, 3}, g4, p0);
        System.out.println("total " + (System.nanoTime() - wall0) / 1e6 + " ms");
        System.out.println("VERDICT: " + MicroGptFlatQuick.passed + " PASS, " + MicroGptFlatQuick.failed + " FAIL of " + (MicroGptFlatQuick.passed + MicroGptFlatQuick.failed) + (MicroGptFlatQuick.failed == 0 ? " -- ALL PASS" : " -- FAILED"));
        if (MicroGptFlatQuick.failed > 0) { System.err.println("MicroGptFlatCheck: " + MicroGptFlatQuick.failed + " check(s) failed"); System.exit(1); }
    }
}
