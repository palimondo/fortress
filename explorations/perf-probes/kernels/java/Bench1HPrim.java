// bench1h in Java over primitive double: the two literals hoisted into locals
// bound once before the loop, the accumulator a primitive local.
// One untimed warm-up pass, then MULT timed passes; loop_ns is the mean of the
// timed passes, i.e. directly comparable with one Fortress run of the loop.
public class Bench1HPrim {
    static final int N = 20000000;
    static double work() { double a = 0.9999999, b = 0.0000001, acc = 0.0;
        for (int i = 1; i <= N; i++) acc = acc * a + b; return acc; }
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
