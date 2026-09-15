// kernel (b) over an array of the runtime's boxes: Box[] storage, one fresh
// box per multiply and per add.  200 products of 16x16 by 16x16.
public class KMatBoxed {
    static final int N = 16, REPS = 200;
    static Box[] a, b;
    static void init() {
        a = new Box[N * N]; b = new Box[N * N];
        for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) {
            a[i * N + j] = Box.make((3 * i + j) % 7); b[i * N + j] = Box.make((5 * i + 2 * j) % 9); } }
    static Box[] work() { Box[] c = null; for (int r = 0; r < REPS; r++) c = mul(a, b); return c; }
    static Box[] mul(Box[] a, Box[] b) {
        Box[] c = new Box[N * N];
        for (int i = 0; i < N; i++) for (int j = 0; j < N; j++) {
            Box s = Box.make(0.0);
            for (int k = 0; k < N; k++) s = Box.add(s, Box.mul(a[i * N + k], b[k * N + j]));
            c[i * N + j] = s; }
        return c; }
    public static void main(String[] args) {
        int mult = args.length > 0 ? Integer.parseInt(args[0]) : 20;
        init();
        Box[] c = work();
        long t0 = System.nanoTime();
        for (int m = 0; m < mult; m++) c = work();
        long t1 = System.nanoTime();
        System.out.println("kmat " + c[0].getValue() + " " + c[N * N - 1].getValue());
        System.out.println("loop_ns " + ((t1 - t0) / mult));
    }
}
