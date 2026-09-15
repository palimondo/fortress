// bench1h in Java over the runtime's box: the two literal boxes made once
// before the loop, one fresh box per arithmetic result inside it (two per
// iteration).  The JIT may scalar-replace the results; Bench1HBoxedSink is the
// same loop with escape analysis defeated.
public class Bench1HBoxed {
    static final int N = 20000000;
    static double work() {
        Box a = Box.make(0.9999999), b = Box.make(0.0000001), acc = Box.make(0.0);
        for (int i = 1; i <= N; i++) acc = Box.add(Box.mul(acc, a), b);
        return acc.getValue(); }
    public static void main(String[] args) {
        int mult = args.length > 0 ? Integer.parseInt(args[0]) : 3;
        double acc = work();
        long t0 = System.nanoTime();
        for (int m = 0; m < mult; m++) acc = work();
        long t1 = System.nanoTime();
        System.out.println("bench1h " + acc);
        System.out.println("loop_ns " + ((t1 - t0) / mult));
    }
}
