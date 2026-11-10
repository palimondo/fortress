// FlatArrays -- the array vocabulary of the pure-Java microGPT: what the
// model's lines need of explorations/run-c4/src/FlatArrays.fss and of the
// library's Vector and Matrix, as plain loops over double[].
//
// A matrix is row-major in a double[], at an offset where it is one of the
// nine views of the parameter vector (FlatArrays.fss:55-64, PView and view).  A view of
// the Fortress (a transpose, a row, the per-head planes) is here an index
// computation inside the loop, never a copy.  Every method writes into an
// array that the caller owns and allocates nothing.
//
// Arithmetic: each element is computed by the operations of the Fortress
// source, in its order (a division stays a division).  Every sum runs left to
// right from 0.0.  The library's matrix product adds its terms in the same
// order (Library/FortressLibrary.fss:3044-3102: it splits the summed dimension
// in sequence); its dot product and SUM join the halves of a range that is
// longer than its grain of 16, so a sum of more than 16 terms can differ from
// the Fortress's in the last bits.

final class FlatArrays {
    private FlatArrays() {}

    // ------------------------------------------- loops and reductions ----
    // The model reaches every loop over rows or elements and every sum
    // through these four, so that a variant (variants/) can give them another
    // shape without a change to the model.

    // A program's body.  The baseline runs it where it stands.
    static void inRuntime(Runnable main) { main.run(); }

    // "for i <- lo#(hi-lo)" (FlatArrays.fss:142-165, the loop of rows; the
    // library's map over an array): the body on the whole range, in order.
    static void forRange(int lo, int hi, RangeBody body) { body.run(lo, hi); }

    // x DOT y (the library's Vector dot, Library/FortressLibrary.fss:2718-2719):
    // the sum of the n products, left to right from 0.0.
    static double dot(double[] x, int xo, double[] y, int yo, int n) {
        double s = 0.0;
        for (int j = 0; j < n; j++) s += x[xo + j] * y[yo + j];
        return s;
    }
    // SUM x: left to right from 0.0.
    static double sum(double[] x, int xo, int n) {
        double s = 0.0;
        for (int j = 0; j < n; j++) s += x[xo + j];
        return s;
    }
    // BIG MAX x
    static double max(double[] x, int xo, int n) {
        double m = x[xo];
        for (int j = 1; j < n; j++) m = Math.max(m, x[xo + j]);
        return m;
    }

    // ------------------------------------------------------------ keys ----

    // MicroGptFlat.fss:57, gather(wte, ids) + gather(wpe, pos)
    // (FlatArrays.fss:169-172, gather, twice, and the library's + of two matrices):
    // out[i,] = A[ka[i],] + B[kb[i],], both A and B of c columns.
    static void gatherAdd(double[] out, double[] a, int aOff, int[] ka, double[] b, int bOff, int[] kb, int n, int c) {
        for (int i = 0; i < n; i++) {
            int ra = aOff + ka[i] * c, rb = bOff + kb[i] * c, ro = i * c;
            for (int j = 0; j < c; j++) out[ro + j] = a[ra + j] + b[rb + j];
        }
    }

    // MicroGptFlat.fss:71, transpose(onehot(ks, width)) dX
    // (FlatArrays.fss:174-175, onehot, and the library's matrix product):
    // G[t,] = the sum of the rows i of dx with ks[i] = t.  The Fortress forms
    // the 0/1 matrix and multiplies; the terms that it adds beside these are
    // products by 0.0.
    static void onehotTMul(double[] g, int gOff, int width, int[] ks, double[] dx, int n, int c) {
        java.util.Arrays.fill(g, gOff, gOff + width * c, 0.0);
        for (int i = 0; i < n; i++) {
            int rg = gOff + ks[i] * c, rx = i * c;
            for (int j = 0; j < c; j++) g[rg + j] += dx[rx + j];
        }
    }

    // ------------------------------------------------- matrix products ----

    // "a w^T" (MicroGptFlat.fss:58, 60, 61): out (n x r) = a (n x c) times the
    // transpose of W (r x c).  The transpose is the Fortress's view
    // (MicroGptFlat.fss:23): each element is the dot product of a row of a
    // and a row of W, both read in place.
    static void mulT(double[] out, double[] a, int n, int c, double[] w, int wOff, int r) {
        for (int i = 0; i < n; i++) {
            int ra = i * c;
            for (int j = 0; j < r; j++) {
                int rw = wOff + j * c;
                double s = 0.0;
                for (int k = 0; k < c; k++) s += a[ra + k] * w[rw + k];
                out[i * r + j] = s;
            }
        }
    }

    // "base + a w^T" (MicroGptFlat.fss:60, x2 and x4): the same product, each
    // finished sum added to the element of base.
    static void addMulT(double[] out, double[] base, double[] a, int n, int c, double[] w, int wOff, int r) {
        for (int i = 0; i < n; i++) {
            int ra = i * c;
            for (int j = 0; j < r; j++) {
                int rw = wOff + j * c;
                double s = 0.0;
                for (int k = 0; k < c; k++) s += a[ra + k] * w[rw + k];
                out[i * r + j] = base[i * r + j] + s;
            }
        }
    }

    // "a w" (MicroGptFlat.fss:63-65, 68): out (n x c) = a (n x r) times W (r x c).
    // Row i of out accumulates a[i,k] times row k of W, k ascending: each
    // element's sum has the order of the dot product, and the inner loop runs
    // along two rows.
    static void mul(double[] out, double[] a, int n, int r, double[] w, int wOff, int c) {
        for (int i = 0; i < n; i++) {
            int ro = i * c;
            for (int j = 0; j < c; j++) out[ro + j] = 0.0;
            for (int k = 0; k < r; k++) {
                double aik = a[i * r + k];
                int rw = wOff + k * c;
                for (int j = 0; j < c; j++) out[ro + j] += aik * w[rw + j];
            }
        }
    }

    // "a^T b" (MicroGptFlat.fss:63-65, 68: every gradient of a weight matrix):
    // G (r x c) = the transpose of a (n x r) times b (n x c), written into the
    // flat gradient at gOff.  G[j,] accumulates a[i,j] times row i of b, i ascending.
    static void tMul(double[] g, int gOff, double[] a, int n, int r, double[] b, int c) {
        java.util.Arrays.fill(g, gOff, gOff + r * c, 0.0);
        for (int i = 0; i < n; i++) {
            int rb = i * c;
            for (int j = 0; j < r; j++) {
                double aij = a[i * r + j];
                int rg = gOff + j * c;
                for (int t = 0; t < c; t++) g[rg + t] += aij * b[rb + t];
            }
        }
    }

    // the library's + of two matrices, in place: a = a + b (the three terms
    // of dX1, MicroGptFlat.fss:68)
    static void addInto(double[] a, double[] b, int len) {
        for (int i = 0; i < len; i++) a[i] += b[i];
    }

    // ------------------------------------------------ the per-head planes ----
    // FlatArrays.fss:84-110, heads and unheads.  An activation is docs.p rows
    // by nh.k columns; plane q = d nh + h of the rank-3 view is the p x k block
    // of document d's rows and head h's columns.  A rank-3 array proper (the
    // attention weights) is planes x p x p, row-major.

    // MicroGptFlat.fss:59, mask + (h(x) h(y)^T) / s
    // (FlatArrays.fss:127-133, the product on every pair of planes; :135-136,
    // a matrix added to every plane; :27, an array over a scalar):
    // out[q,i,j] = mask[i,j] + (row i of x's plane q) . (row j of y's plane q) / s.
    static void headsMulTScaleMask(double[] out, double[] mask, double[] x, double[] y, double s, int docs, int p, int nh, int k) {
        int cols = nh * k;
        for (int d = 0; d < docs; d++)
            for (int h = 0; h < nh; h++) {
                int po = (d * nh + h) * p * p;
                for (int i = 0; i < p; i++) {
                    int rx = (d * p + i) * cols + h * k;
                    for (int j = 0; j < p; j++) {
                        int ry = (d * p + j) * cols + h * k;
                        double dot = 0.0;
                        for (int c = 0; c < k; c++) dot += x[rx + c] * y[ry + c];
                        out[po + i * p + j] = mask[i * p + j] + dot / s;
                    }
                }
            }
    }

    // MicroGptFlat.fss:66, h(x) h(y)^T: the same product without the mask
    // and the scale.
    static void headsMulT(double[] out, double[] x, double[] y, int docs, int p, int nh, int k) {
        int cols = nh * k;
        for (int d = 0; d < docs; d++)
            for (int h = 0; h < nh; h++) {
                int po = (d * nh + h) * p * p;
                for (int i = 0; i < p; i++) {
                    int rx = (d * p + i) * cols + h * k;
                    for (int j = 0; j < p; j++) {
                        int ry = (d * p + j) * cols + h * k;
                        double dot = 0.0;
                        for (int c = 0; c < k; c++) dot += x[rx + c] * y[ry + c];
                        out[po + i * p + j] = dot;
                    }
                }
            }
    }

    // MicroGptFlat.fss:59 and 67, u(a h(y)): on every plane, a (p x p) times
    // y's plane (p x k), the result seen again as docs.p x nh.k.
    static void headsMul(double[] out, double[] a, double[] y, int docs, int p, int nh, int k) {
        int cols = nh * k;
        for (int d = 0; d < docs; d++)
            for (int h = 0; h < nh; h++) {
                int po = (d * nh + h) * p * p;
                for (int i = 0; i < p; i++) {
                    int ro = (d * p + i) * cols + h * k;
                    for (int c = 0; c < k; c++) out[ro + c] = 0.0;
                    for (int j = 0; j < p; j++) {
                        double aij = a[po + i * p + j];
                        int ry = (d * p + j) * cols + h * k;
                        for (int c = 0; c < k; c++) out[ro + c] += aij * y[ry + c];
                    }
                }
            }
    }

    // MicroGptFlat.fss:66 and 67, u(a^T h(y)): on every plane, the transpose of
    // a (p x p) times y's plane (p x k).
    static void headsTMul(double[] out, double[] a, double[] y, int docs, int p, int nh, int k) {
        int cols = nh * k;
        for (int d = 0; d < docs; d++)
            for (int h = 0; h < nh; h++) {
                int po = (d * nh + h) * p * p;
                for (int j = 0; j < p; j++) {
                    int ro = (d * p + j) * cols + h * k;
                    for (int c = 0; c < k; c++) out[ro + c] = 0.0;
                }
                for (int i = 0; i < p; i++) {
                    int ry = (d * p + i) * cols + h * k;
                    for (int j = 0; j < p; j++) {
                        double aij = a[po + i * p + j];
                        int ro = (d * p + j) * cols + h * k;
                        for (int c = 0; c < k; c++) out[ro + c] += aij * y[ry + c];
                    }
                }
            }
    }
}
