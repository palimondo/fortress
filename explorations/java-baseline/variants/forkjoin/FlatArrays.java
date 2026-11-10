// FlatArrays, the fork/join variant -- a measurement beside the baseline, not
// the baseline.  It gives the baseline's loops and sums the shape that the
// Fortress library and its compiled runtime give parallel work, on a
// java.util.concurrent.ForkJoinPool; what a piece computes once it is no
// longer split is the baseline's plain loop.  The model and the checks are
// unchanged.  (FlatArraysPlain is ../../FlatArrays.java, renamed by run.sh.)
//
//   -Dbaseline.threads=N   the pool's threads (FORTRESS_THREADS; default 1)
//   -Dbaseline.grain=G     a range of at most G elements is not split (the library's grainSize, 16)
//   -Dbaseline.mmgrain=M   a matrix product whose three dimensions are at most M is not split
//                          (the library's product splits down to one element: M = 1)
//   -Dbaseline.spawn=T     the runtime's spawn threshold (FORTRESS_SPAWN_THRESHOLD; default 5)
//
// The shapes, and where each is in the tree:
//   a parallel range     Library/RangeInternals.fss:1310-1345 (CompactFullParScalarRange):
//                        a range lo..hi of more than G elements splits at the highest
//                        power-of-two boundary inside it, and the two parts are the arms of
//                        a "do ... also do"
//   a reduction          the same split; the two results are joined (Reduction.join), no
//                        shared accumulator; below the grain a left fold from the identity
//                        (RangeInternals.fss:1365-1373)
//   the matrix product   Library/FortressLibrary.fss:3044-3102 (Matrix.mul): the largest of
//                        the three dimensions is halved by partition; the halves of the rows
//                        and of the columns are the arms of a "do ... also do", the halves of
//                        the summed dimension run one after the other
//   the arms             ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1717-1770
//                        and runtimeSystem/BaseTask.java: every arm but the first becomes a
//                        task object; forkIfProfitable forks it when the pool has more than
//                        one thread and the worker's surplus of queued tasks is at most the
//                        spawn threshold; the first arm runs in place; joinOrRun then joins
//                        the task, or runs it in place if it was not forked
// The program's body runs as a task of the pool (inRuntime), as a compiled
// Fortress program's does.

import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.ForkJoinTask;
import java.util.concurrent.RecursiveAction;

final class FlatArrays {
    private FlatArrays() {}
    static final int threads = Integer.getInteger("baseline.threads", 1);
    static final int grain = Integer.getInteger("baseline.grain", 16);
    static final int mmGrain = Integer.getInteger("baseline.mmgrain", 1);
    static final int spawnThreshold = Integer.getInteger("baseline.spawn", 5);
    static final ForkJoinPool pool = new ForkJoinPool(threads);

    static void inRuntime(Runnable main) { pool.invoke(ForkJoinTask.adapt(main)); }

    // BaseTask: forkIfProfitable and joinOrRun
    @SuppressWarnings("serial")
    abstract static class Arm extends RecursiveAction {
        private boolean forked;
        final void forkIfProfitable() {
            if (threads > 1 && (spawnThreshold < 0 || getSurplusQueuedTaskCount() <= spawnThreshold)) { fork(); forked = true; }
        }
        final void joinOrRun() { if (forked) join(); else compute(); }
    }
    // partition(x): the largest power of two below x (simpleIntArith.intPartition)
    static int partition(int x) { return Integer.highestOneBit(x - 1); }
    // where a range lo..hi, both inclusive, splits: the second part starts here
    static int mid(int lo, int hi) { return hi & ~(partition((lo ^ hi) + 1) - 1); }

    // ------------------------------------------------ a parallel range ----
    static void forRange(int lo, int hi, RangeBody body) { if (lo < hi) lop(lo, hi - 1, body); }
    private static void lop(final int lo, final int hi, final RangeBody body) {
        if (hi - lo < grain) { body.run(lo, hi + 1); return; }
        final int mid = mid(lo, hi);
        Arm arm = new Arm() { protected void compute() { lop(mid, hi, body); } };
        arm.forkIfProfitable();
        lop(lo, mid - 1, body);
        arm.joinOrRun();
    }

    // ----------------------------------------------------- reductions ----
    // the body of a reduction: the fold of the piece lo..hi-1
    interface Fold { double of(int lo, int hi); }
    @SuppressWarnings("serial")
    abstract static class ResultArm extends Arm { double result; }
    // join is + (SumReduction) or MAX (MaxReduction)
    private static double reduce(final int lo, final int hi, final Fold f, final boolean max) {
        if (hi - lo < grain) return f.of(lo, hi + 1);
        final int mid = mid(lo, hi);
        ResultArm arm = new ResultArm() { protected void compute() { result = reduce(mid, hi, f, max); } };
        arm.forkIfProfitable();
        double left = reduce(lo, mid - 1, f, max);
        arm.joinOrRun();
        return max ? Math.max(left, arm.result) : left + arm.result;
    }
    static double dot(final double[] x, final int xo, final double[] y, final int yo, int n) {
        return reduce(0, n - 1, new Fold() { public double of(int lo, int hi) { return FlatArraysPlain.dot(x, xo + lo, y, yo + lo, hi - lo); } }, false);
    }
    static double sum(final double[] x, final int xo, int n) {
        return reduce(0, n - 1, new Fold() { public double of(int lo, int hi) { return FlatArraysPlain.sum(x, xo + lo, hi - lo); } }, false);
    }
    static double max(final double[] x, final int xo, int n) {
        return reduce(0, n - 1, new Fold() { public double of(int lo, int hi) { return FlatArraysPlain.max(x, xo + lo, hi - lo); } }, true);
    }

    // ------------------------------------------------ the matrix product ----
    // One block of a product: the rows a..a+i-1 and the columns c..c+k-1 of
    // the result each gain the terms b..b+j-1 of their sums, b ascending.
    interface Block { void add(int a, int i, int b, int j, int c, int k); }
    // Matrix.mul's mma.  The result is zeroed first, so mm (which stores the
    // first term where mma adds it) is not told apart.
    private static void mma(final int a, final int i, final int b, final int j, final int c, final int k, final Block blk) {
        if (i <= mmGrain && j <= mmGrain && k <= mmGrain) { blk.add(a, i, b, j, c, k); return; }
        if (k >= i && k >= j) {
            final int k0 = partition(k);
            Arm arm = new Arm() { protected void compute() { mma(a, i, b, j, c + k0, k - k0, blk); } };
            arm.forkIfProfitable();
            mma(a, i, b, j, c, k0, blk);
            arm.joinOrRun();
        } else if (j >= i) {
            final int j0 = partition(j);
            mma(a, i, b, j0, c, k, blk);
            mma(a, i, b + j0, j - j0, c, k, blk);
        } else {
            final int i0 = partition(i);
            Arm arm = new Arm() { protected void compute() { mma(a + i0, i - i0, b, j, c, k, blk); } };
            arm.forkIfProfitable();
            mma(a, i0, b, j, c, k, blk);
            arm.joinOrRun();
        }
    }

    // out (n x c) = a (n x r) times W (r x c)
    static void mul(final double[] out, final double[] a, int n, final int r, final double[] w, final int wOff, final int c) {
        java.util.Arrays.fill(out, 0, n * c, 0.0);
        mma(0, n, 0, r, 0, c, new Block() { public void add(int a0, int i, int b0, int j, int c0, int k) {
            for (int ii = a0; ii < a0 + i; ii++)
                for (int bb = b0; bb < b0 + j; bb++) {
                    double aik = a[ii * r + bb];
                    for (int cc = c0; cc < c0 + k; cc++) out[ii * c + cc] += aik * w[wOff + bb * c + cc];
                }
        } });
    }
    // out (n x r) = a (n x c) times the transpose of W (r x c)
    static void mulT(final double[] out, final double[] a, int n, final int c, final double[] w, final int wOff, final int r) {
        java.util.Arrays.fill(out, 0, n * r, 0.0);
        mma(0, n, 0, c, 0, r, new Block() { public void add(int a0, int i, int b0, int j, int c0, int k) {
            for (int ii = a0; ii < a0 + i; ii++)
                for (int cc = c0; cc < c0 + k; cc++) {
                    double s = out[ii * r + cc];
                    for (int bb = b0; bb < b0 + j; bb++) s += a[ii * c + bb] * w[wOff + cc * c + bb];
                    out[ii * r + cc] = s;
                }
        } });
    }
    // out = base + a W^T: the product, then the library's + of two matrices, a parallel range over the rows
    static void addMulT(final double[] out, final double[] base, double[] a, int n, int c, double[] w, int wOff, final int r) {
        mulT(out, a, n, c, w, wOff, r);
        forRange(0, n, new RangeBody() { public void run(int lo, int hi) {
            for (int e = lo * r; e < hi * r; e++) out[e] = base[e] + out[e];
        } });
    }
    // G (r x c) at gOff = the transpose of a (n x r) times b (n x c)
    static void tMul(final double[] g, final int gOff, final double[] a, int n, final int r, final double[] b, final int c) {
        java.util.Arrays.fill(g, gOff, gOff + r * c, 0.0);
        mma(0, r, 0, n, 0, c, new Block() { public void add(int a0, int i, int b0, int j, int c0, int k) {
            for (int bb = b0; bb < b0 + j; bb++)
                for (int ii = a0; ii < a0 + i; ii++) {
                    double aij = a[bb * r + ii];
                    for (int cc = c0; cc < c0 + k; cc++) g[gOff + ii * c + cc] += aij * b[bb * c + cc];
                }
        } });
    }

    // ------------------------------------------------ the per-head planes ----
    // FlatArrays.fss:127-133: a parallel range over the planes, the library's
    // product on each plane.
    static void headsMulT(final double[] out, final double[] x, final double[] y, final int docs, final int p, final int nh, final int k) {
        final int cols = nh * k;
        java.util.Arrays.fill(out, 0, docs * nh * p * p, 0.0);
        forRange(0, docs * nh, new RangeBody() { public void run(int lo, int hi) {
            for (int q = lo; q < hi; q++) {
                final int po = q * p * p, base = (q / nh) * p * cols + (q % nh) * k;
                mma(0, p, 0, k, 0, p, new Block() { public void add(int a0, int i, int b0, int j, int c0, int kk) {
                    for (int ii = a0; ii < a0 + i; ii++)
                        for (int cc = c0; cc < c0 + kk; cc++) {
                            double s = out[po + ii * p + cc];
                            for (int bb = b0; bb < b0 + j; bb++) s += x[base + ii * cols + bb] * y[base + cc * cols + bb];
                            out[po + ii * p + cc] = s;
                        }
                } });
            }
        } });
    }
    // mask + (the planes' product) / s: the product, then the two elementwise
    // operations as a parallel range over the rows of all planes
    static void headsMulTScaleMask(final double[] out, final double[] mask, double[] x, double[] y, final double s, int docs, final int p, int nh, int k) {
        headsMulT(out, x, y, docs, p, nh, k);
        forRange(0, docs * nh * p, new RangeBody() { public void run(int lo, int hi) {
            for (int row = lo; row < hi; row++)
                for (int j = 0; j < p; j++) out[row * p + j] = mask[(row % p) * p + j] + out[row * p + j] / s;
        } });
    }
    static void headsMul(final double[] out, final double[] a, final double[] y, final int docs, final int p, final int nh, final int k) {
        final int cols = nh * k;
        java.util.Arrays.fill(out, 0, docs * p * cols, 0.0);
        forRange(0, docs * nh, new RangeBody() { public void run(int lo, int hi) {
            for (int q = lo; q < hi; q++) {
                final int po = q * p * p, base = (q / nh) * p * cols + (q % nh) * k;
                mma(0, p, 0, p, 0, k, new Block() { public void add(int a0, int i, int b0, int j, int c0, int kk) {
                    for (int ii = a0; ii < a0 + i; ii++)
                        for (int bb = b0; bb < b0 + j; bb++) {
                            double aij = a[po + ii * p + bb];
                            for (int cc = c0; cc < c0 + kk; cc++) out[base + ii * cols + cc] += aij * y[base + bb * cols + cc];
                        }
                } });
            }
        } });
    }
    static void headsTMul(final double[] out, final double[] a, final double[] y, final int docs, final int p, final int nh, final int k) {
        final int cols = nh * k;
        java.util.Arrays.fill(out, 0, docs * p * cols, 0.0);
        forRange(0, docs * nh, new RangeBody() { public void run(int lo, int hi) {
            for (int q = lo; q < hi; q++) {
                final int po = q * p * p, base = (q / nh) * p * cols + (q % nh) * k;
                mma(0, p, 0, p, 0, k, new Block() { public void add(int a0, int i, int b0, int j, int c0, int kk) {
                    for (int bb = b0; bb < b0 + j; bb++)
                        for (int ii = a0; ii < a0 + i; ii++) {
                            double aij = a[po + bb * p + ii];
                            for (int cc = c0; cc < c0 + kk; cc++) out[base + ii * cols + cc] += aij * y[base + bb * cols + cc];
                        }
                } });
            }
        } });
    }

    // ---- the baseline's, unchanged: the two key operations and the in-place + ----
    static void gatherAdd(double[] out, double[] a, int aOff, int[] ka, double[] b, int bOff, int[] kb, int n, int c) { FlatArraysPlain.gatherAdd(out, a, aOff, ka, b, bOff, kb, n, c); }
    static void onehotTMul(double[] g, int gOff, int width, int[] ks, double[] dx, int n, int c) { FlatArraysPlain.onehotTMul(g, gOff, width, ks, dx, n, c); }
    static void addInto(double[] a, double[] b, int len) { FlatArraysPlain.addInto(a, b, len); }
}
