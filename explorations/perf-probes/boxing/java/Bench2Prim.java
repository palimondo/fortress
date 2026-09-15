// bench2, form P: primitive double, no V object at all.
// Fortress: for i <- seq(1#2000000) do s := (s + V(1.0)) DOT V(0.9999999) end
public class Bench2Prim {
    public static void main(String[] args) {
        double s = 0.0;
        long t0 = System.nanoTime();
        for (int i = 1; i <= 2000000; i++) {
            s = (s + 1.0) * 0.9999999;
        }
        long t1 = System.nanoTime();
        System.out.println("bench2 " + s);
        System.out.println("loop_ns " + (t1 - t0));
    }
}
