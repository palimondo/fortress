// bench1h boxed with escape analysis defeated: the accumulator box is stored
// through a volatile field, as com.sun.fortress.compiler.runtimeValues.
// MutableFValue.value is, so the JIT cannot scalar-replace the allocations.
// The honest upper bracket on what boxing alone costs.
public class Bench1HBoxedSink {
    static final int N = 20000000;
    static volatile Box cell;
    static double work() {
        Box a = Box.make(0.9999999), b = Box.make(0.0000001);
        cell = Box.make(0.0);
        for (int i = 1; i <= N; i++) cell = Box.add(Box.mul(cell, a), b);
        return cell.getValue(); }
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
