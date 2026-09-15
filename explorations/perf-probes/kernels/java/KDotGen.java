// kernel (a) over the generic array object: Object[] storage behind an
// interface, a checkcast on every element read -- the representation that
// array[\RR64\](n) actually has -- with boxes as in KDotBoxed.
// 4192-element dot product, 200 reps; 4192 is exactly nParams() of
// MicroGptFlat, the flat parameter vector Adam touches.
// work() is one Fortress run of the timed loop (200 reps).  One untimed
// warm-up pass, then MULT timed passes; loop_ns is their mean, so it is
// directly comparable with the Fortress loop_ns.
public class KDotGen {
    static final int N = 4192, REPS = 200;
    static double work() {
        Gen.Arr1 x = new Gen.Prim1(N), y = new Gen.Prim1(N);
        for (int i = 0; i < N; i++) { x.put(i, Box.make((i % 17 + 1) / 17.0)); y.put(i, Box.make((i % 23 + 1) / 23.0)); }
        Box s = Box.make(0.0);
        for (int r = 0; r < REPS; r++) {
            Box d = Box.make(0.0);
            for (int i = 0; i < N; i++) d = Box.add(d, Box.mul((Box) x.get(i), (Box) y.get(i)));
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
