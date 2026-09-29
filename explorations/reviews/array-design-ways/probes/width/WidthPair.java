// Question 5, the element width: the two kernels of perf-probes/kernels/java/KDotPrim.java and
// KMatPrim.java (the 4192-element dot product, 200 reps; the 16x16 matrix product, 200 products)
// over double[] and over float[], timed interleaved in one JVM so that each pair comes from one run
// (protocol principle 2).  Accumulation is in the element's own width, as a store-width choice
// would give with no Extended type.  Prints each kernel's loop_ns per round and the checksums.
public class WidthPair {
    static final int N = 4192, REPS = 200, M = 16;
    static double[] xd = new double[N], yd = new double[N], ad = new double[M * M], bd = new double[M * M];
    static float[] xf = new float[N], yf = new float[N], af = new float[M * M], bf = new float[M * M];
    static void init() {
        for (int i = 0; i < N; i++) { xd[i] = (i % 17 + 1) / 17.0; yd[i] = (i % 23 + 1) / 23.0; xf[i] = (float) xd[i]; yf[i] = (float) yd[i]; }
        for (int i = 0; i < M; i++) for (int j = 0; j < M; j++) {
            ad[i * M + j] = (3 * i + j) % 7; bd[i * M + j] = (5 * i + 2 * j) % 9; af[i * M + j] = (float) ad[i * M + j]; bf[i * M + j] = (float) bd[i * M + j]; } }
    static double dotD() { double s = 0.0; for (int r = 0; r < REPS; r++) { double d = 0.0; for (int i = 0; i < N; i++) d += xd[i] * yd[i]; s += d; } return s; }
    static float dotF() { float s = 0.0f; for (int r = 0; r < REPS; r++) { float d = 0.0f; for (int i = 0; i < N; i++) d += xf[i] * yf[i]; s += d; } return s; }
    static double[] matD() { double[] c = null; for (int r = 0; r < REPS; r++) { c = new double[M * M];
        for (int i = 0; i < M; i++) for (int j = 0; j < M; j++) { double s = 0.0; for (int k = 0; k < M; k++) s += ad[i * M + k] * bd[k * M + j]; c[i * M + j] = s; } } return c; }
    static float[] matF() { float[] c = null; for (int r = 0; r < REPS; r++) { c = new float[M * M];
        for (int i = 0; i < M; i++) for (int j = 0; j < M; j++) { float s = 0.0f; for (int k = 0; k < M; k++) s += af[i * M + k] * bf[k * M + j]; c[i * M + j] = s; } } return c; }
    static double sinkD; static float sinkF;
    public static void main(String[] args) {
        int rounds = args.length > 0 ? Integer.parseInt(args[0]) : 5, mult = args.length > 1 ? Integer.parseInt(args[1]) : 20;
        init();
        for (int w = 0; w < 3; w++) { sinkD += dotD(); sinkF += dotF(); sinkD += matD()[0]; sinkF += matF()[0]; }
        for (int r = 1; r <= rounds; r++) {
            long t0 = System.nanoTime(); for (int m = 0; m < mult; m++) sinkD += dotD(); long t1 = System.nanoTime();
            for (int m = 0; m < mult; m++) sinkF += dotF(); long t2 = System.nanoTime();
            for (int m = 0; m < mult; m++) sinkD += matD()[M * M - 1]; long t3 = System.nanoTime();
            for (int m = 0; m < mult; m++) sinkF += matF()[M * M - 1]; long t4 = System.nanoTime();
            System.out.printf("round %d  kdot double %d ns  kdot float %d ns  kmat double %d ns  kmat float %d ns%n",
                r, (t1 - t0) / mult, (t2 - t1) / mult, (t3 - t2) / mult, (t4 - t3) / mult);
        }
        System.out.println("checksums: dot double " + dotD() + " float " + dotF() + "; mat double " + matD()[M * M - 1] + " float " + matF()[M * M - 1]);
        System.out.println("sinks " + sinkD + " " + sinkF);
    }
}
