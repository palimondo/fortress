// DotU -- the loop of the switch-over rehearsal's program DotU
// (explorations/compile-ladder/plan-31/probes/switch-rehearsal.md, section 5)
// in plain Java: two arrays of 1,000 doubles, and the loop "s += a[i] b[i]"
// over them run 5,000 times, 5 million iterations.  The rehearsal's source is
// not in the tree; the fill (a[i] = i, b[i] = 1.0) is the one that gives the
// values that its report prints, dot = 499500.0 and total = 2.4975E9.
//
//   java DotU          the program once: prints the total and its loops' own time
//   java DotU warm     2 s of warm-up, then the 5 million iterations 30 times: ms each

final class DotU {
    static double loops(double[] a, double[] b) {
        double total = 0.0;
        for (int r = 0; r < 5000; r++) {
            double s = 0.0;
            for (int i = 0; i < 1000; i++) s += a[i] * b[i];
            total += s;
        }
        return total;
    }
    public static void main(String[] args) {
        double[] a = new double[1000], b = new double[1000];
        for (int i = 0; i < 1000; i++) { a[i] = i; b[i] = 1.0; }
        if (args.length == 0) {
            long t0 = System.nanoTime();
            double total = loops(a, b);
            System.out.println("total = " + total + "  (" + (System.nanoTime() - t0) / 1e6 + " ms)");
            return;
        }
        double sink = 0.0;
        long end = System.nanoTime() + 2_000_000_000L;
        while (System.nanoTime() < end) sink += loops(a, b);
        double[] ms = new double[30];
        for (int s = 0; s < 30; s++) { long t0 = System.nanoTime(); sink += loops(a, b); ms[s] = (System.nanoTime() - t0) / 1e6; }
        System.out.println("5 million iterations, ms: " + Bench.stats(ms) + "  (sink " + sink + ")");
    }
}
