// FlatArrays, the Vector API variant -- a measurement beside the baseline, not
// the baseline.  It replaces the four matrix products of ../../FlatArrays.java
// by explicit vectors (jdk.incubator.vector, an incubator module of this JDK:
// compile and run with --add-modules jdk.incubator.vector); every other
// operation is the baseline's (FlatArraysPlain is ../../FlatArrays.java,
// renamed by run.sh).  The model and the checks are unchanged.
//
// mul and tMul keep each element's sum in the baseline's order: a vector holds
// several elements, and each lane adds its terms one after another, with no
// fused multiply-add.  mulT and addMulT are dot products: their sum is split
// over the lanes and the lanes are added at the end, so it has another order
// than the baseline's.

import jdk.incubator.vector.DoubleVector;
import jdk.incubator.vector.VectorOperators;
import jdk.incubator.vector.VectorSpecies;

final class FlatArrays {
    private FlatArrays() {}
    static final VectorSpecies<Double> S = DoubleVector.SPECIES_PREFERRED;

    // out (n x c) = a (n x r) times W (r x c): row i of out accumulates a[i,k] times row k of W
    static void mul(double[] out, double[] a, int n, int r, double[] w, int wOff, int c) {
        final int cv = S.loopBound(c);
        for (int i = 0; i < n; i++) {
            int ro = i * c;
            java.util.Arrays.fill(out, ro, ro + c, 0.0);
            for (int k = 0; k < r; k++) {
                double aik = a[i * r + k];
                int rw = wOff + k * c;
                int j = 0;
                for (; j < cv; j += S.length())
                    DoubleVector.fromArray(S, out, ro + j).add(DoubleVector.fromArray(S, w, rw + j).mul(aik)).intoArray(out, ro + j);
                for (; j < c; j++) out[ro + j] += aik * w[rw + j];
            }
        }
    }

    // G (r x c) at gOff = the transpose of a (n x r) times b (n x c)
    static void tMul(double[] g, int gOff, double[] a, int n, int r, double[] b, int c) {
        final int cv = S.loopBound(c);
        java.util.Arrays.fill(g, gOff, gOff + r * c, 0.0);
        for (int i = 0; i < n; i++) {
            int rb = i * c;
            for (int j = 0; j < r; j++) {
                double aij = a[i * r + j];
                int rg = gOff + j * c;
                int t = 0;
                for (; t < cv; t += S.length())
                    DoubleVector.fromArray(S, g, rg + t).add(DoubleVector.fromArray(S, b, rb + t).mul(aij)).intoArray(g, rg + t);
                for (; t < c; t++) g[rg + t] += aij * b[rb + t];
            }
        }
    }

    // the dot product of c elements, the lanes added at the end
    private static double vdot(double[] a, int ra, double[] w, int rw, int c) {
        final int cv = S.loopBound(c);
        DoubleVector acc = DoubleVector.zero(S);
        int k = 0;
        for (; k < cv; k += S.length()) acc = acc.add(DoubleVector.fromArray(S, a, ra + k).mul(DoubleVector.fromArray(S, w, rw + k)));
        double s = acc.reduceLanes(VectorOperators.ADD);
        for (; k < c; k++) s += a[ra + k] * w[rw + k];
        return s;
    }
    // out (n x r) = a (n x c) times the transpose of W (r x c)
    static void mulT(double[] out, double[] a, int n, int c, double[] w, int wOff, int r) {
        for (int i = 0; i < n; i++)
            for (int j = 0; j < r; j++) out[i * r + j] = vdot(a, i * c, w, wOff + j * c, c);
    }
    static void addMulT(double[] out, double[] base, double[] a, int n, int c, double[] w, int wOff, int r) {
        for (int i = 0; i < n; i++)
            for (int j = 0; j < r; j++) out[i * r + j] = base[i * r + j] + vdot(a, i * c, w, wOff + j * c, c);
    }

    // ---- the baseline's, unchanged ----
    static void inRuntime(Runnable main) { FlatArraysPlain.inRuntime(main); }
    static void forRange(int lo, int hi, RangeBody body) { FlatArraysPlain.forRange(lo, hi, body); }
    static double dot(double[] x, int xo, double[] y, int yo, int n) { return FlatArraysPlain.dot(x, xo, y, yo, n); }
    static double sum(double[] x, int xo, int n) { return FlatArraysPlain.sum(x, xo, n); }
    static double max(double[] x, int xo, int n) { return FlatArraysPlain.max(x, xo, n); }
    static void gatherAdd(double[] out, double[] a, int aOff, int[] ka, double[] b, int bOff, int[] kb, int n, int c) { FlatArraysPlain.gatherAdd(out, a, aOff, ka, b, bOff, kb, n, c); }
    static void onehotTMul(double[] g, int gOff, int width, int[] ks, double[] dx, int n, int c) { FlatArraysPlain.onehotTMul(g, gOff, width, ks, dx, n, c); }
    static void addInto(double[] a, double[] b, int len) { FlatArraysPlain.addInto(a, b, len); }
    static void headsMulTScaleMask(double[] out, double[] mask, double[] x, double[] y, double s, int docs, int p, int nh, int k) { FlatArraysPlain.headsMulTScaleMask(out, mask, x, y, s, docs, p, nh, k); }
    static void headsMulT(double[] out, double[] x, double[] y, int docs, int p, int nh, int k) { FlatArraysPlain.headsMulT(out, x, y, docs, p, nh, k); }
    static void headsMul(double[] out, double[] a, double[] y, int docs, int p, int nh, int k) { FlatArraysPlain.headsMul(out, a, y, docs, p, nh, k); }
    static void headsTMul(double[] out, double[] a, double[] y, int docs, int p, int nh, int k) { FlatArraysPlain.headsTMul(out, a, y, docs, p, nh, k); }
}
