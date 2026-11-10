// Probes -- two small measurements that REPORT.md cites.  Run from
// explorations/run-c4/src, as the programs are (run.sh parse, run.sh axpy).

final class Probes {
    // the inner loop of FlatArrays.mul and tMul: two rows at different offsets
    static void axpyOffsets(double[] o, int oo, double s, double[] w, int wo, int n) {
        for (int j = 0; j < n; j++) o[oo + j] += s * w[wo + j];
    }
    // the same loop on two arrays at the same index, the form that row arrays (double[][]) would give
    static void axpySameIndex(double[] o, double s, double[] w, int n) {
        for (int j = 0; j < n; j++) o[j] += s * w[j];
    }

    public static void main(String[] args) {
        if (args[0].equals("parse")) {
            // every number of the nine weight files: FlatData.parseFloat against Double.parseDouble
            int n = 0, differ = 0;
            double worst = 0.0;
            for (int i = 0; i < 9; i++)
                for (String line : FlatData.readLines(MicroGptFlat.weightsDir + "/" + MicroGptFlat.matName(i) + ".txt"))
                    for (String tok : line.trim().split(" +")) {
                        double x = FlatData.parseFloat(tok), y = Double.parseDouble(tok.replace('¯', '-'));
                        n++;
                        if (x != y) { differ++; worst = Math.max(worst, Math.abs(x - y) / Math.ulp(y)); }
                    }
            System.out.println(n + " numbers, " + differ + " differ from Double.parseDouble, the worst by " + worst + " ulp");
            return;
        }
        // ns per element of the loop, by its length; the third repetition is printed
        double[][] o = new double[4][4096], w = new double[4][4096];
        for (int i = 0; i < 4096; i++) for (int r = 0; r < 4; r++) w[r][i] = i * 1e-3;
        for (int len : new int[] {16, 64, 256, 4096}) {
            double a = 0, b = 0;
            int reps = 200_000_000 / len;
            for (int rep = 0; rep < 3; rep++) {
                long t = System.nanoTime();
                for (int r = 0; r < reps; r++) axpyOffsets(o[0], (r & 3) * len % (4096 - len + 1), 1e-9, w[0], 0, len);
                a = (double) (System.nanoTime() - t) / reps / len;
                t = System.nanoTime();
                for (int r = 0; r < reps; r++) axpySameIndex(o[r & 3], 1e-9, w[(r >> 2) & 3], len);
                b = (double) (System.nanoTime() - t) / reps / len;
            }
            System.out.printf("length %4d: offsets %.3f ns/element, same index %.3f ns/element%n", len, a, b);
        }
        System.out.println("(checksum " + (o[0][5] + o[1][5]) + ")");
    }
}
