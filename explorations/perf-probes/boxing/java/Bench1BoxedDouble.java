// bench1, form B': the brief's literal reading -- java.lang.Double objects,
// a fresh one per arithmetic result and per literal, no caching
// (Double.valueOf(double) caches nothing; unlike Integer.valueOf it is
// specified to return a new instance whenever needed).  Kept beside form B
// (the FRR64-shaped box) to show the two agree: the box's identity does not
// matter, only that one is allocated per value.
public class Bench1BoxedDouble {
    static Double mul(Double a, Double b) { return Double.valueOf(a.doubleValue() * b.doubleValue()); }
    static Double add(Double a, Double b) { return Double.valueOf(a.doubleValue() + b.doubleValue()); }
    public static void main(String[] args) {
        Double acc = Double.valueOf(0.0);
        long t0 = System.nanoTime();
        for (int i = 1; i <= 20000000; i++) {
            acc = add(mul(acc, Double.valueOf(0.9999999)), Double.valueOf(0.0000001));
        }
        long t1 = System.nanoTime();
        System.out.println("bench1 " + acc.doubleValue());
        System.out.println("loop_ns " + (t1 - t0));
    }
}
