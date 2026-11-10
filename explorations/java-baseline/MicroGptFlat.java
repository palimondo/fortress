// MicroGptFlat -- the flat microGPT program in plain Java: what
// explorations/run-c4/src/MicroGptFlat.fss computes, on the same data, from the
// same initial parameters, through the same steps.  Storage is double[], the
// loops are plain loops, one thread.  Each method is named after the model
// line or the vocabulary operation that it stands for, and its comment gives
// the line of MicroGptFlat.fss.  Run from explorations/run-c4/src: the paths
// are those of the Fortress program, relative.

import static java.lang.Math.sqrt;

final class MicroGptFlat {
    private MicroGptFlat() {}

    // ------------------------------------------------ hyperparameters ----
    // MicroGptFlat.fss:17-19
    static final int nEmbd = 16, blockSize = 16, nHead = 4, headDim = 4, vocabSize = 27, bosId = 26;
    static final double epsilon = 1e-5, lr0 = 0.01, beta1 = 0.85, beta2 = 0.99, epsilon_A = 1e-8;
    static final int nSteps = 1000;
    static final String corpusPath = "../../apl/reference/dzaima/docs.txt", weightsDir = "../../apl/reference/dzaima/w";

    // --------------------------------- rmsn, sm and their backward ----
    // Each works on one row: n elements of x at xo, written to out at oo.

    // MicroGptFlat.fss:27, rmsn
    static void rmsn(double[] out, int oo, double[] x, int xo, int n) {
        double r = sqrt(epsilon + FlatArrays.dot(x, xo, x, xo, n) / n);
        for (int j = 0; j < n; j++) out[oo + j] = x[xo + j] / r;
    }

    // MicroGptFlat.fss:28, sm.  out may be z itself.
    static void sm(double[] out, int oo, double[] z, int zo, int n) {
        double max = FlatArrays.max(z, zo, n);
        for (int j = 0; j < n; j++) out[oo + j] = Math.exp(z[zo + j] - max);
        double sum = FlatArrays.sum(out, oo, n);
        for (int j = 0; j < n; j++) out[oo + j] /= sum;
    }

    // MicroGptFlat.fss:29, mask
    static final double[] mask = new double[blockSize * blockSize];
    static { for (int i = 0; i < blockSize; i++) for (int j = 0; j < blockSize; j++) mask[i * blockSize + j] = j > i ? -1e10 : 0.0; }

    // MicroGptFlat.fss:30-33, rmsn_b.  out holds y between the two loops, so
    // it must not be dy or x.
    static void rmsn_b(double[] out, int oo, double[] dy, int dyo, double[] x, int xo, int n) {
        double r = sqrt(epsilon + FlatArrays.dot(x, xo, x, xo, n) / n);
        for (int j = 0; j < n; j++) out[oo + j] = x[xo + j] / r;
        double c = FlatArrays.dot(out, oo, dy, dyo, n) / n;
        for (int j = 0; j < n; j++) out[oo + j] = (dy[dyo + j] - out[oo + j] * c) / r;
    }

    // MicroGptFlat.fss:34, sm_b, with the "/ SQRT (1.0 headDim)" of line 66
    // applied to each element as it is written.
    static void sm_b(double[] out, int oo, double[] p, int po, double[] dy, int dyo, int n, double s) {
        double pdy = FlatArrays.dot(p, po, dy, dyo, n);
        for (int j = 0; j < n; j++) out[oo + j] = (p[po + j] * (dy[dyo + j] - pdy)) / s;
    }

    // rows(f, m), FlatArrays.fss:142-165: f on every row, the results stacked.
    // The bodies are anonymous classes, not lambdas: the first lambda of a
    // JVM costs tens of milliseconds, which a cold run would pay.
    static void rowsRmsn(double[] out, double[] x, int n, int d) {
        FlatArrays.forRange(0, n, new RangeBody() { public void run(int lo, int hi) {
            for (int i = lo; i < hi; i++) rmsn(out, i * d, x, i * d, d);
        } });
    }
    static void rowsSm(double[] out, double[] z, int n, int d) {
        FlatArrays.forRange(0, n, new RangeBody() { public void run(int lo, int hi) {
            for (int i = lo; i < hi; i++) sm(out, i * d, z, i * d, d);
        } });
    }
    static void rowsRmsnB(double[] out, double[] dy, double[] x, int n, int d) {
        FlatArrays.forRange(0, n, new RangeBody() { public void run(int lo, int hi) {
            for (int i = lo; i < hi; i++) rmsn_b(out, i * d, dy, i * d, x, i * d, d);
        } });
    }
    static void rowsSmB(double[] out, double[] p, double[] dy, int n, int d, double s) {
        FlatArrays.forRange(0, n, new RangeBody() { public void run(int lo, int hi) {
            for (int i = lo; i < hi; i++) sm_b(out, i * d, p, i * d, dy, i * d, d, s);
        } });
    }

    // ------------------------------------- one vector, nine views ----
    // MicroGptFlat.fss:37-39, matName
    static String matName(int i) {
        return i == 0 ? "wte" : i == 1 ? "wpe" : i == 2 ? "lm_head" : i == 3 ? "attn_wq" : i == 4 ? "attn_wk"
             : i == 5 ? "attn_wv" : i == 6 ? "attn_wo" : i == 7 ? "mlp_fc1" : "mlp_fc2";
    }
    static final java.util.function.IntFunction<String> matNames = new java.util.function.IntFunction<String>() {
        public String apply(int i) { return matName(i); }
    };
    // MicroGptFlat.fss:40-42, matShape and matCount: rows, columns, their product
    static int matRows(int i) { return (i == 0 || i == 2) ? vocabSize : i == 7 ? 4 * nEmbd : nEmbd; }
    static int matCols(int i) { return i == 8 ? 4 * nEmbd : nEmbd; }
    static int matCount(int i) { return matRows(i) * matCols(i); }
    // MicroGptFlat.fss:43, matOffset
    static int matOffset(int i) { int s = 0; for (int j = 0; j < i; j++) s += matCount(j); return s; }
    // MicroGptFlat.fss:44, nParams
    static int nParams() { return N_PARAMS; }
    // MicroGptFlat.fss:45 and 53, view(p, i): a view is its offset in p
    static final int WTE = matOffset(0), WPE = matOffset(1), LM = matOffset(2), WQ = matOffset(3), WK = matOffset(4),
                     WV = matOffset(5), WO = matOffset(6), F1 = matOffset(7), F2 = matOffset(8), N_PARAMS = matOffset(9);

    // --------------------------- the corpus as one padded integer matrix ----
    // MicroGptFlat.fss:48
    static final FlatData.Corpus corpus = FlatData.loadCorpus(corpusPath, blockSize, bosId);

    // ------------------------------------------------------- the step ----
    // The arrays of one step at one batch size, allocated once and reused.
    // In the Fortress every one of these is a fresh array or a view.
    static final class Work {
        final int docs, n;
        final int[] ids, tg, pos;
        final double[] vm, lp, x, xp, x1, q, k, v, a, hc, x2, x3, m0, mr, x4, pr;
        final double[] dL, dX4, dM0, dX3, dX2, dh, dV, t3, dS, dQ, dK, dX1, tn, dXp, dX;
        Work(int docs) {
            this.docs = docs; n = docs * blockSize;
            int planes = docs * nHead * blockSize * blockSize;
            ids = new int[n]; tg = new int[n]; pos = new int[n]; vm = new double[n]; lp = new double[n];
            x = new double[n * nEmbd]; xp = new double[n * nEmbd]; x1 = new double[n * nEmbd];
            q = new double[n * nEmbd]; k = new double[n * nEmbd]; v = new double[n * nEmbd];
            a = new double[planes]; hc = new double[n * nEmbd];
            x2 = new double[n * nEmbd]; x3 = new double[n * nEmbd];
            m0 = new double[n * 4 * nEmbd]; mr = new double[n * 4 * nEmbd];
            x4 = new double[n * nEmbd]; pr = new double[n * vocabSize];
            dL = new double[n * vocabSize]; dX4 = new double[n * nEmbd]; dM0 = new double[n * 4 * nEmbd];
            dX3 = new double[n * nEmbd]; dX2 = new double[n * nEmbd]; dh = new double[n * nEmbd];
            dV = new double[n * nEmbd]; t3 = new double[planes]; dS = new double[planes];
            dQ = new double[n * nEmbd]; dK = new double[n * nEmbd]; dX1 = new double[n * nEmbd]; tn = new double[n * nEmbd];
            dXp = new double[n * nEmbd]; dX = new double[n * nEmbd];
        }
    }
    private static Work work;
    private static Work work(int docs) {
        Work w = work;
        if (w == null || w.docs != docs) work = w = new Work(docs);
        return w;
    }

    // MicroGptFlat.fss:51-72, step: keys -> loss, and the flat gradient written
    // into g in the layout of p.  One Java statement for each expression of
    // the Fortress, in its order; the comment before each group is its line.
    static double step(double[] p, int[] b, double[] g) {
        final Work w = work(b.length);
        final int n = w.n, docs = w.docs, E = nEmbd, T = blockSize, H = nHead, K = headDim, V = vocabSize, M = 4 * nEmbd;
        final double sqrtK = sqrt(1.0 * headDim);
        // :52  ids, tg, vm, nv, pos
        corpus.tokens(b, 0, w.ids); corpus.tokens(b, 1, w.tg); corpus.valid(b, w.vm); corpus.positions(b, w.pos);
        final double nv = FlatArrays.sum(w.vm, 0, n);
        // :53-55  the nine views are the offsets WTE .. F2; h and u are index
        //         computations inside the heads* methods of FlatArrays

        // -- forward, all (doc, pos) rows at once --
        // :57  x = gather(wte, ids) + gather(wpe, pos); xp = rows(rmsn, x); x1 = rows(rmsn, xp)
        FlatArrays.gatherAdd(w.x, p, WTE, w.ids, p, WPE, w.pos, n, E);
        rowsRmsn(w.xp, w.x, n, E);
        rowsRmsn(w.x1, w.xp, n, E);
        // :58  (q, k, v) = (x1 wq^T, x1 wk^T, x1 wv^T)
        FlatArrays.mulT(w.q, w.x1, n, E, p, WQ, E);
        FlatArrays.mulT(w.k, w.x1, n, E, p, WK, E);
        FlatArrays.mulT(w.v, w.x1, n, E, p, WV, E);
        // :59  a = rows(sm, mask + (qh kh^T) / SQRT (1.0 headDim)); hc = u(a vh)
        FlatArrays.headsMulTScaleMask(w.a, mask, w.q, w.k, sqrtK, docs, T, H, K);
        rowsSm(w.a, w.a, docs * H * T, T);
        FlatArrays.headsMul(w.hc, w.a, w.v, docs, T, H, K);
        // :60  x2 = xp + hc wo^T; x3 = rows(rmsn, x2); m0 = x3 f1^T; mr = 0.0 MAX m0; x4 = x2 + mr f2^T
        FlatArrays.addMulT(w.x2, w.xp, w.hc, n, E, p, WO, E);
        rowsRmsn(w.x3, w.x2, n, E);
        FlatArrays.mulT(w.m0, w.x3, n, E, p, F1, M);
        for (int i = 0; i < n * M; i++) w.mr[i] = Math.max(0.0, w.m0[i]);
        FlatArrays.addMulT(w.x4, w.x2, w.mr, n, M, p, F2, E);
        // :61  pr = rows(sm, x4 lm^T); loss = -(vm DOT log(pick(pr, tg))) / nv
        FlatArrays.mulT(w.pr, w.x4, n, E, p, LM, V);
        rowsSm(w.pr, w.pr, n, V);
        for (int i = 0; i < n; i++) w.lp[i] = Math.log(w.pr[i * V + w.tg[i]]);
        final double loss = -FlatArrays.dot(w.vm, 0, w.lp, 0, n) / nv;

        // -- backward, one line under each forward line, bottom-up --
        // :63  dL = diag(vm / nv) (pr - onehot(tg, vocabSize)); gLM = dL^T x4; dX4 = dL lm
        for (int i = 0; i < n; i++) {
            double di = w.vm[i] / nv;
            int tgi = w.tg[i];
            for (int j = 0; j < V; j++) w.dL[i * V + j] = di * (w.pr[i * V + j] - (j == tgi ? 1.0 : 0.0));
        }
        FlatArrays.tMul(g, LM, w.dL, n, V, w.x4, E);
        FlatArrays.mul(w.dX4, w.dL, n, V, p, LM, E);
        // :64  gF2 = dX4^T mr; dM0 = (dX4 f2) × (m0 > 0.0); gF1 = dM0^T x3; dX3 = dM0 f1
        FlatArrays.tMul(g, F2, w.dX4, n, E, w.mr, M);
        FlatArrays.mul(w.dM0, w.dX4, n, E, p, F2, M);
        for (int i = 0; i < n * M; i++) w.dM0[i] *= (w.m0[i] > 0.0 ? 1.0 : 0.0);
        FlatArrays.tMul(g, F1, w.dM0, n, M, w.x3, E);
        FlatArrays.mul(w.dX3, w.dM0, n, M, p, F1, E);
        // :65  dX2 = dX4 + rows(rmsn_b, dX3, x2); gWO = dX2^T hc; dh = h(dX2 wo)
        rowsRmsnB(w.dX2, w.dX3, w.x2, n, E);
        FlatArrays.addInto(w.dX2, w.dX4, n * E);
        FlatArrays.tMul(g, WO, w.dX2, n, E, w.hc, E);
        FlatArrays.mul(w.dh, w.dX2, n, E, p, WO, E);
        // :66  dVh = a^T dh; dS = rows(sm_b, a, dh vh^T) / SQRT (1.0 headDim)
        FlatArrays.headsTMul(w.dV, w.a, w.dh, docs, T, H, K);
        FlatArrays.headsMulT(w.t3, w.dh, w.v, docs, T, H, K);
        rowsSmB(w.dS, w.a, w.t3, docs * H * T, T, sqrtK);
        // :67  dQh = dS kh; dKh = dS^T qh; (dQ, dK, dV) = (u(dQh), u(dKh), u(dVh))
        FlatArrays.headsMul(w.dQ, w.dS, w.k, docs, T, H, K);
        FlatArrays.headsTMul(w.dK, w.dS, w.q, docs, T, H, K);
        // :68  (gWQ, gWK, gWV) = (dQ^T x1, dK^T x1, dV^T x1); dX1 = dQ wq + dK wk + dV wv
        FlatArrays.tMul(g, WQ, w.dQ, n, E, w.x1, E);
        FlatArrays.tMul(g, WK, w.dK, n, E, w.x1, E);
        FlatArrays.tMul(g, WV, w.dV, n, E, w.x1, E);
        FlatArrays.mul(w.dX1, w.dQ, n, E, p, WQ, E);
        FlatArrays.mul(w.tn, w.dK, n, E, p, WK, E);
        FlatArrays.addInto(w.dX1, w.tn, n * E);
        FlatArrays.mul(w.tn, w.dV, n, E, p, WV, E);
        FlatArrays.addInto(w.dX1, w.tn, n * E);
        // :69  dXp = dX2 + rows(rmsn_b, dX1, xp); dX = rows(rmsn_b, dXp, x)
        rowsRmsnB(w.dXp, w.dX1, w.xp, n, E);
        FlatArrays.addInto(w.dXp, w.dX2, n * E);
        rowsRmsnB(w.dX, w.dXp, w.x, n, E);
        // :70  gWTE = transpose(onehot(ids, vocabSize)) dX; gWPE = transpose(onehot(pos, blockSize)) dX
        FlatArrays.onehotTMul(g, WTE, V, w.ids, w.dX, n, E);
        FlatArrays.onehotTMul(g, WPE, T, w.pos, w.dX, n, E);
        // :71  (loss, flat(gWTE, gWPE, gLM, gWQ, gWK, gWV, gWO, gF1, gF2)): every
        //      gradient above was written at its matrix's offset in g, which is flat's order
        return loss;
    }

    // ----------------- Adam: three whole-vector expressions over p, m, v ----
    // MicroGptFlat.fss:75-81, adam.  The Fortress returns three new vectors;
    // this updates p, m and v in place, element by element by the same
    // expressions.
    static void adam(double[] p, double[] m, double[] v, double[] g, int t, double lr) {
        final double c1 = 1 - Math.pow(beta1, t), c2 = 1 - Math.pow(beta2, t);
        FlatArrays.forRange(0, p.length, new RangeBody() { public void run(int lo, int hi) {
            for (int i = lo; i < hi; i++) {
                double gi = g[i];
                double mi = beta1 * m[i] + (1 - beta1) * gi;                       // :77
                double vi = beta2 * v[i] + (1 - beta2) * (gi * gi);                // :78
                p[i] = p[i] - (lr * (mi / c1)) / (sqrt(vi / c2) + epsilon_A);      // :79
                m[i] = mi; v[i] = vi;
            }
        } });
    }
    // MicroGptFlat.fss:82, learningRate
    static double learningRate(int s) { return lr0 * (1 - (1.0 * s) / nSteps); }

    // FlatArrays.fss:16, keys(n, f) for the two forms that the programs use
    static int[] keysFrom(int n, int first) {
        int[] b = new int[n];
        for (int i = 0; i < n; i++) b[i] = (first + i) % corpus.size();
        return b;
    }

    // ------------------------------------------------------ training ----
    // MicroGptFlat.fss:85-97, run.  The step's time is printed in ms with a
    // fraction, where the Fortress prints whole ms.
    public static void main(String[] args) { FlatArrays.inRuntime(new Runnable() { public void run() { MicroGptFlat.run(); } }); }
    static void run() {
        System.out.println("microgpt flat | params " + nParams() + " | corpus " + corpus.size() + " x " + (blockSize + 1) + " | batch 1, 5 steps");
        int bsz = 1;
        double[] p = FlatData.loadParams(weightsDir, matNames, 9, nParams());
        double[] m = new double[nParams()];
        double[] v = new double[nParams()];
        double[] g = new double[nParams()];
        for (int s = 0; s < 5; s++) {
            long t0 = System.nanoTime();
            double l = step(p, keysFrom(bsz, s * bsz), g);
            adam(p, m, v, g, s + 1, learningRate(s));
            System.out.println("step " + (s + 1) + " loss " + l + "  (" + (System.nanoTime() - t0) / 1e6 + " ms)");
        }
    }
}
