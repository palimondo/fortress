// bench1, form P: primitive double.
// Fortress: for i <- seq(1#20000000) do acc := acc 0.9999999 + 0.0000001 end
// (juxtaposition is multiplication).  Loop only is timed, as in bench1t.fss.
public class Bench1Prim {
    public static void main(String[] args) {
        double acc = 0.0;
        long t0 = System.nanoTime();
        for (int i = 1; i <= 20000000; i++) {
            acc = acc * 0.9999999 + 0.0000001;
        }
        long t1 = System.nanoTime();
        System.out.println("bench1 " + acc);
        System.out.println("loop_ns " + (t1 - t0));
    }
}
