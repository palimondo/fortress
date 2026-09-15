// kernel (a) over an array of the runtime's boxes: Box[] storage, one fresh
// box per multiply and per add, as CompilerBuiltin's arithmetic does.
// 4192-element dot product, 200 reps; 4192 is exactly nParams() of
// MicroGptFlat, the flat parameter vector Adam touches.
// work() is one Fortress run of the timed loop (200 reps).  One untimed
// warm-up pass, then MULT timed passes; loop_ns is their mean, so it is
// directly comparable with the Fortress loop_ns.
public class KDotBoxed {
    static final int N = 4192, REPS = 200;
    static double work() {
        Box[] x = new Box[N], y = new Box[N];
        for (int i = 0; i < N; i++) { x[i] = Box.make((i % 17 + 1) / 17.0); y[i] = Box.make((i % 23 + 1) / 23.0); }
        Box s = Box.make(0.0);
        for (int r = 0; r < REPS; r++) {
            Box d = Box.make(0.0);
            for (int i = 0; i < N; i++) d = Box.add(d, Box.mul(x[i], y[i]));
            s = Box.add(s, d); }
        return s.getValue(); }

    public static void main(String[] args) {
        int mult = args.length > 0 ? Integer.parseInt(args[0]) : 20;
        double s = work();
        long t0 = System.nanoTime();
        for (int m = 0; m < mult; m++) s = work();
        long t1 = System.nanoTime();
        System.out.println("kdot " + s);
        System.out.println("loop_ns " + ((t1 - t0) / mult));
    }
}
