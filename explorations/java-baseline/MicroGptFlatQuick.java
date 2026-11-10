// MicroGptFlatQuick -- the quick check of the pure-Java microGPT: the 7 checks
// of explorations/run-c4/src/MicroGptFlatQuick.fss, against the same reference
// files, with the same asserted values and the same tolerances.  One line per
// check with the measured difference and PASS or FAIL, then the verdict; any
// FAIL ends the run with a non-zero status.  Run from explorations/run-c4/src.

final class MicroGptFlatQuick {
    static final String goldensDir = "../../run-c/goldens";     // MicroGptFlatQuick.fss:18
    static final double tolLoss = 1e-12, tolGrad = 1e-12;       // MicroGptFlatQuick.fss:19-20

    static int passed = 0, failed = 0;
    // MicroGptFlatQuick.fss:24-28, report
    static void report(String name, double diff, double tol) {
        boolean ok = diff <= tol;
        if (ok) passed += 1; else failed += 1;
        System.out.println(name + ": diff " + diff + " " + (ok ? "PASS" : "FAIL"));
    }
    // MicroGptFlatQuick.fss:29, maxAbsDiff
    static double maxAbsDiff(double[] a, double[] b) {
        double d = Math.abs(a[0] - b[0]);
        for (int i = 1; i < a.length; i++) d = Math.max(d, Math.abs(a[i] - b[i]));
        return d;
    }
    // MicroGptFlatQuick.fss:38-42, corpusDiff: the line is "name len t0 .. t16"
    static double corpusDiff(String[] lines) {
        FlatData.Corpus corpus = MicroGptFlat.corpus;
        double worst = 0.0;
        for (int d = 0; d < 16; d++) {
            double[] nums = FlatData.numbersOf(lines[d].substring(lines[d].indexOf(' ') + 1));
            double row = Math.abs(nums[0] - 1.0 * corpus.length(d));
            for (int j = 0; j < 17; j++) row = Math.max(row, Math.abs(nums[1 + j] - 1.0 * corpus.token(d, j)));
            worst = Math.max(worst, row);
        }
        return worst;
    }
    static int zeroCount(double[] g) {
        int z = 0;
        for (double e : g) if (e == 0.0) z += 1;
        return z;
    }

    // MicroGptFlatQuick.fss:31-59, run
    public static void main(String[] args) { FlatArrays.inRuntime(new Runnable() { public void run() { MicroGptFlatQuick.run(); } }); }
    static void run() {
        System.out.println("MicroGptFlat quick checks (pure Java, two steps) | threads 1 | tolerances: loss " + tolLoss + " grad " + tolGrad);
        long wall0 = System.nanoTime();
        int np = MicroGptFlat.nParams();
        double[] p0 = FlatData.loadParams("../../apl/reference/dzaima/w", MicroGptFlat.matNames, 9, np);
        // 0. the loaders against the goldens' P0 and corpus rows
        report("loader: max |P - P0| over 4192", maxAbsDiff(p0, FlatData.readVector(goldensDir + "/P0.txt", 4192)), 0.0);
        report("corpus: max |row - golden| over documents 0..15", corpusDiff(FlatData.readLines(goldensDir + "/corpus_first16.txt")), 0.0);
        // 1. batch 1, the first two of the full check's five Adam steps, on documents 0 and 1
        double[] losses = FlatData.readVector(goldensDir + "/losses_batch1_5steps.txt", 5);
        double[] g0 = new double[np], g1 = new double[np];
        long t0 = System.nanoTime();
        double l0 = MicroGptFlat.step(p0, new int[] {0}, g0);
        report("batch 1 step 1 loss " + l0 + " vs " + losses[0] + " (" + (System.nanoTime() - t0) / 1e6 + " ms)", Math.abs(l0 - losses[0]), tolLoss);
        report("step 0 batch 1: max |gradient - golden| over 4192", maxAbsDiff(g0, FlatData.readVector(goldensDir + "/grad_step0.txt", 4192)), tolGrad);
        report("step 0 batch 1: zero gradient entries - 464", Math.abs(1.0 * zeroCount(g0) - 464.0), 0.0);
        double[] p1 = p0.clone();
        MicroGptFlat.adam(p1, new double[np], new double[np], g0, 1, MicroGptFlat.learningRate(0));
        report("step 0 batch 1: max |P after Adam - golden| over 4192", maxAbsDiff(p1, FlatData.readVector(goldensDir + "/P_after_adam.txt", 4192)), tolGrad);
        long t1 = System.nanoTime();
        double l1 = MicroGptFlat.step(p1, new int[] {1}, g1);
        report("batch 1 step 2 loss " + l1 + " vs " + losses[1] + " (" + (System.nanoTime() - t1) / 1e6 + " ms)", Math.abs(l1 - losses[1]), tolLoss);
        System.out.println("total " + (System.nanoTime() - wall0) / 1e6 + " ms");
        System.out.println("VERDICT: " + passed + " PASS, " + failed + " FAIL of " + (passed + failed) + (failed == 0 ? " -- ALL PASS" : " -- FAILED"));
        if (failed > 0) { System.err.println("MicroGptFlatQuick: " + failed + " check(s) failed"); System.exit(1); }
    }
}
