// Probe 2 (a Java model, not Fortress): what the SHAPE of the one library's Matrix.mul
// (Library/FortressLibrary.fss:3044-3102: recursive halving down to one element product,
// do...also at each row/column split, element access through get/put) costs on the JVM
// against a triple loop over double[], with the elements unboxed in every variant but the last.
import java.util.concurrent.*;
public class MulShape {
    interface M { double get(int i, int j); void put(int i, int j, double x); }
    static final class Dense implements M {            // row-major double[]
        final double[] a; final int r, c;
        Dense(int r, int c) { this.r = r; this.c = c; a = new double[r * c]; }
        public double get(int i, int j) { return a[i * c + j]; }
        public void put(int i, int j, double x) { a[i * c + j] = x; }
    }
    static final class PView implements M {             // C4's PView: a matrix at an offset of a flat vector
        final double[] base; final int off, c;
        PView(double[] base, int off, int c) { this.base = base; this.off = off; this.c = c; }
        public double get(int i, int j) { return base[off + i * c + j]; }
        public void put(int i, int j, double x) { base[off + i * c + j] = x; }
    }
    static final class Transposed implements M {        // the library's TransposedMatrix
        final M m; Transposed(M m) { this.m = m; }
        public double get(int i, int j) { return m.get(j, i); }
        public void put(int i, int j, double x) { m.put(j, i, x); }
    }
    // boxed variant: elements are objects, as FRR64; index is a tuple object, as get(ij:(ZZ32,ZZ32))
    static final class Box { final double v; private Box(double v) { this.v = v; } static Box make(double v) { return new Box(v); } }
    static final class IJ { final int i, j; IJ(int i, int j) { this.i = i; this.j = j; } }
    interface MB { Box get(IJ ij); void put(IJ ij, Box x); }
    static final class DenseB implements MB {
        final Object[] a; final int c;
        DenseB(int r, int c) { this.c = c; a = new Object[r * c]; for (int k = 0; k < a.length; k++) a[k] = Box.make(0.0); }
        public Box get(IJ ij) { return (Box) a[ij.i * c + ij.j]; }
        public void put(IJ ij, Box x) { a[ij.i * c + ij.j] = x; }
    }
    static final class TransposedB implements MB {
        final MB m; TransposedB(MB m) { this.m = m; }
        public Box get(IJ ij) { return m.get(new IJ(ij.j, ij.i)); }
        public void put(IJ ij, Box x) { m.put(new IJ(ij.j, ij.i), x); }
    }
    static int part(int x) { int h = Integer.highestOneBit(x); return (h == x) ? x / 2 : h; }  // partition(n): a power of two below n

    // (1) the baseline: a triple loop over double[]
    static void loop(double[] x, double[] y, double[] z, int n, int m, int p) {
        for (int i = 0; i < n; i++) for (int k = 0; k < p; k++) {
            double s = 0; for (int j = 0; j < m; j++) s += x[i * m + j] * y[j * p + k]; z[i * p + k] = s; }
    }
    // (2) the library's recursion, elements unboxed, access through the interface
    static final class Rec {
        final M x, y, res; Rec(M x, M y, M res) { this.x = x; this.y = y; this.res = res; }
        void mma(int a, int i, int b, int j, int c, int k) {
            if (k >= i && k >= j) {
                if (k == 1) { double pr = x.get(a, b) * y.get(b, c); res.put(a, c, res.get(a, c) + pr); }
                else { int k0 = part(k); mma(a, i, b, j, c, k0); mma(a, i, b, j, c + k0, k - k0); }
            } else if (j >= i) { int j0 = part(j); mma(a, i, b, j0, c, k); mma(a, i, b + j0, j - j0, c, k); }
            else { int i0 = part(i); mma(a, i0, b, j, c, k); mma(a + i0, i - i0, b, j, c, k); }
        }
        void mm(int a, int i, int b, int j, int c, int k) {
            if (k >= i && k >= j) {
                if (k == 1) res.put(a, c, x.get(a, b) * y.get(b, c));
                else { int k0 = part(k); mm(a, i, b, j, c, k0); mm(a, i, b, j, c + k0, k - k0); }
            } else if (j >= i) { int j0 = part(j); mm(a, i, b, j0, c, k); mma(a, i, b + j0, j - j0, c, k); }
            else { int i0 = part(i); mm(a, i0, b, j, c, k); mm(a + i0, i - i0, b, j, c, k); }
        }
    }
    // (3) the same, each row/column split a task object that is made and run in place
    //     (the compiled path builds a task object per split even when it does not fork)
    static final class RecT {
        final M x, y, res; RecT(M x, M y, M res) { this.x = x; this.y = y; this.res = res; }
        final class T extends RecursiveAction { final boolean acc; final int a, i, b, j, c, k;
            T(boolean acc, int a, int i, int b, int j, int c, int k) { this.acc = acc; this.a = a; this.i = i; this.b = b; this.j = j; this.c = c; this.k = k; }
            protected void compute() { if (acc) mma(a, i, b, j, c, k); else mm(a, i, b, j, c, k); } }
        void two(boolean acc, int a, int i, int b, int j, int c, int k, int a2, int i2, int c2, int k2) {
            T t = new T(acc, a2, i2, b, j, c2, k2);
            if (acc) mma(a, i, b, j, c, k); else mm(a, i, b, j, c, k);
            t.compute();
        }
        void mma(int a, int i, int b, int j, int c, int k) {
            if (k >= i && k >= j) {
                if (k == 1) { double pr = x.get(a, b) * y.get(b, c); res.put(a, c, res.get(a, c) + pr); }
                else { int k0 = part(k); two(true, a, i, b, j, c, k0, a, i, c + k0, k - k0); }
            } else if (j >= i) { int j0 = part(j); mma(a, i, b, j0, c, k); mma(a, i, b + j0, j - j0, c, k); }
            else { int i0 = part(i); two(true, a, i0, b, j, c, k, a + i0, i - i0, c, k); }
        }
        void mm(int a, int i, int b, int j, int c, int k) {
            if (k >= i && k >= j) {
                if (k == 1) res.put(a, c, x.get(a, b) * y.get(b, c));
                else { int k0 = part(k); two(false, a, i, b, j, c, k0, a, i, c + k0, k - k0); }
            } else if (j >= i) { int j0 = part(j); mm(a, i, b, j0, c, k); mma(a, i, b + j0, j - j0, c, k); }
            else { int i0 = part(i); two(false, a, i0, b, j, c, k, a + i0, i - i0, c, k); }
        }
    }
    // (4) the recursion with boxed elements and a tuple object per index
    static final class RecB {
        final MB x, y, res; RecB(MB x, MB y, MB res) { this.x = x; this.y = y; this.res = res; }
        void mma(int a, int i, int b, int j, int c, int k) {
            if (k >= i && k >= j) {
                if (k == 1) { Box pr = Box.make(x.get(new IJ(a, b)).v * y.get(new IJ(b, c)).v); res.put(new IJ(a, c), Box.make(res.get(new IJ(a, c)).v + pr.v)); }
                else { int k0 = part(k); mma(a, i, b, j, c, k0); mma(a, i, b, j, c + k0, k - k0); }
            } else if (j >= i) { int j0 = part(j); mma(a, i, b, j0, c, k); mma(a, i, b + j0, j - j0, c, k); }
            else { int i0 = part(i); mma(a, i0, b, j, c, k); mma(a + i0, i - i0, b, j, c, k); }
        }
        void mm(int a, int i, int b, int j, int c, int k) {
            if (k >= i && k >= j) {
                if (k == 1) res.put(new IJ(a, c), Box.make(x.get(new IJ(a, b)).v * y.get(new IJ(b, c)).v));
                else { int k0 = part(k); mm(a, i, b, j, c, k0); mm(a, i, b, j, c + k0, k - k0); }
            } else if (j >= i) { int j0 = part(j); mm(a, i, b, j0, c, k); mma(a, i, b + j0, j - j0, c, k); }
            else { int i0 = part(i); mm(a, i0, b, j, c, k); mm(a + i0, i - i0, b, j, c, k); }
        }
    }
    // (6) the recursion stopped at a grain: a block of at most G in each direction runs as loops through get/put
    static final class RecG {
        final M x, y, res; final int G; RecG(M x, M y, M res, int G) { this.x = x; this.y = y; this.res = res; this.G = G; }
        void leaf(boolean acc, int a, int i, int b, int j, int c, int k) {
            for (int ii = a; ii < a + i; ii++) for (int kk = c; kk < c + k; kk++) {
                double s = acc ? res.get(ii, kk) : 0; for (int jj = b; jj < b + j; jj++) s += x.get(ii, jj) * y.get(jj, kk); res.put(ii, kk, s); }
        }
        void go(boolean acc, int a, int i, int b, int j, int c, int k) {
            if (i <= G && j <= G && k <= G) { leaf(acc, a, i, b, j, c, k); return; }
            if (k >= i && k >= j) { int k0 = part(k); go(acc, a, i, b, j, c, k0); go(acc, a, i, b, j, c + k0, k - k0); }
            else if (j >= i) { int j0 = part(j); go(acc, a, i, b, j0, c, k); go(true, a, i, b + j0, j - j0, c, k); }
            else { int i0 = part(i); go(acc, a, i0, b, j, c, k); go(acc, a + i0, i - i0, b, j, c, k); }
        }
    }
    static double sink;
    interface Run { void run(); }
    static double time(String name, int reps, Run r) {
        for (int w = 0; w < 5; w++) for (int q = 0; q < reps; q++) r.run();     // warm-up
        double best = 1e99;
        for (int t = 0; t < 7; t++) { long s = System.nanoTime(); for (int q = 0; q < reps; q++) r.run(); best = Math.min(best, (System.nanoTime() - s) / (double) reps); }
        System.out.printf("%-58s %10.0f ns a product%n", name, best);
        return best;
    }
    public static void main(String[] args) {
        int n = Integer.parseInt(args[0]), m = Integer.parseInt(args[1]), p = Integer.parseInt(args[2]);
        int reps = Integer.parseInt(args[3]);
        java.util.Random rnd = new java.util.Random(1);
        double[] xa = new double[n * m], flat = new double[1000 + p * m], za = new double[n * p];
        for (int k = 0; k < xa.length; k++) xa[k] = rnd.nextDouble();
        for (int k = 0; k < flat.length; k++) flat[k] = rnd.nextDouble();
        // y = (the p x m weight matrix at offset 1000 of the flat vector) transposed: m x p, as x1 wq^T
        double[] ya = new double[m * p];
        for (int j = 0; j < m; j++) for (int k = 0; k < p; k++) ya[j * p + k] = flat[1000 + k * m + j];
        Dense x = new Dense(n, m); System.arraycopy(xa, 0, x.a, 0, xa.length);
        Dense yd = new Dense(m, p); System.arraycopy(ya, 0, yd.a, 0, ya.length);
        M yv = new Transposed(new PView(flat, 1000, m));
        Dense z1 = new Dense(n, p), z2 = new Dense(n, p), z3 = new Dense(n, p);
        DenseB xb = new DenseB(n, m), wb = new DenseB(p, m), zb = new DenseB(n, p);
        for (int k = 0; k < xa.length; k++) xb.a[k] = Box.make(xa[k]);
        for (int k = 0; k < p * m; k++) wb.a[k] = Box.make(flat[1000 + k]);
        MB yb = new TransposedB(wb);
        double t1 = time("1 triple loop, double[]", reps, () -> { loop(xa, ya, za, n, m, p); sink += za[0]; });
        double t2 = time("2 the library's recursion, unboxed, dense operands", reps, () -> { new Rec(x, yd, z1).mm(0, n, 0, m, 0, p); sink += z1.a[0]; });
        double t3 = time("3 as 2, the right operand a transposed view of a flat vector", reps, () -> { new Rec(x, yv, z2).mm(0, n, 0, m, 0, p); sink += z2.a[0]; });
        double t4 = time("4 as 3, a task object made at each row and column split", reps, () -> { new RecT(x, yv, z3).mm(0, n, 0, m, 0, p); sink += z3.a[0]; });
        double t5 = time("5 as 3, boxed elements and a tuple object per index", reps, () -> { new RecB(xb, yb, zb).mm(0, n, 0, m, 0, p); sink += ((Box) zb.a[0]).v; });
        Dense z6 = new Dense(n, p);
        double t6 = time("6 as 3, the recursion stopped at blocks of 16", reps, () -> { new RecG(x, yv, z6, 16).go(false, 0, n, 0, m, 0, p); sink += z6.a[0]; });
        double d6 = 0; for (int k = 0; k < za.length; k++) d6 = Math.max(d6, Math.abs(za[k] - z6.a[k]));
        System.out.printf("6 to 1: %.1f   max difference of 6 from 1: %s%n", t6 / t1, d6);
        System.out.printf("ratios to 1:  2 %.1f   3 %.1f   4 %.1f   5 %.1f   (%dx%d by %dx%d)%n", t2 / t1, t3 / t1, t4 / t1, t5 / t1, n, m, m, p);
        // the answers agree
        double d = 0; for (int k = 0; k < za.length; k++) d = Math.max(d, Math.abs(za[k] - z2.a[k])); 
        double d5 = 0; for (int k = 0; k < za.length; k++) d5 = Math.max(d5, Math.abs(za[k] - ((Box) zb.a[k]).v));
        System.out.println("max difference of 3 and of 5 from 1: " + d + " " + d5 + "  sink " + (sink != 0));
    }
}
