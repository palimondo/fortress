import java.util.Arrays;

public class NanVec {
    static final int N = 1 << 24;          // 16,777,216 elements
    static final int WARM = 20, TIMED = 10;

    // (1) plain comparison
    static int plain(double[] a, double[] b) {
        int c = 0;
        for (int i = 0; i < a.length; i++) {
            if (a[i] < b[i]) c++;
        }
        return c;
    }

    // (2) NaN check that throws, as the Fortress helper would
    static int throwing(double[] a, double[] b) {
        int c = 0;
        for (int i = 0; i < a.length; i++) {
            if (Double.isNaN(a[i]) || Double.isNaN(b[i]))
                throw new ArithmeticException("FloatingComparisonError");
            if (a[i] < b[i]) c++;
        }
        return c;
    }

    // (3) NaN recorded in a flag, tested once after the loop
    static int flagged(double[] a, double[] b) {
        int c = 0;
        boolean nan = false;
        for (int i = 0; i < a.length; i++) {
            nan |= Double.isNaN(a[i]) | Double.isNaN(b[i]);
            if (a[i] < b[i]) c++;
        }
        if (nan) throw new ArithmeticException("FloatingComparisonError");
        return c;
    }

    static int run(int k, double[] a, double[] b) {
        switch (k) {
            case 1: return plain(a, b);
            case 2: return throwing(a, b);
            default: return flagged(a, b);
        }
    }

    public static void main(String[] args) {
        double[] a = new double[N], b = new double[N];
        double x = 0.1234567, y = 0.7654321;
        for (int i = 0; i < N; i++) {
            x = 3.9 * x * (1.0 - x);
            y = 3.9 * y * (1.0 - y);
            a[i] = x; b[i] = y;
        }
        int[] loops = args.length == 0 ? new int[]{1, 2, 3}
                                       : Arrays.stream(args).mapToInt(Integer::parseInt).toArray();
        String[] names = {"", "plain", "throwing", "flagged"};
        for (int k : loops) {
            int count = 0;
            for (int p = 0; p < WARM; p++) count = run(k, a, b);
            long[] t = new long[TIMED];
            for (int p = 0; p < TIMED; p++) {
                long s = System.nanoTime();
                int r = run(k, a, b);
                t[p] = System.nanoTime() - s;
                if (r != count) throw new IllegalStateException("count changed");
            }
            Arrays.sort(t);
            long med = (t[TIMED / 2 - 1] + t[TIMED / 2]) / 2;
            System.out.printf("%-9s count=%d  median=%.3f ms/pass  %.3f ns/element  (min %.3f, max %.3f ms)%n",
                names[k], count, med / 1e6, (double) med / N, t[0] / 1e6, t[TIMED - 1] / 1e6);
        }
    }
}
