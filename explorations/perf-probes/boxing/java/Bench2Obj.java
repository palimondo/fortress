// bench2, form O: the user object V is allocated exactly as often as the
// generated code allocates bench2$V (four per iteration: one per literal,
// one per operator result), but its field is a primitive double -- no RR64
// box.  Isolates "user object churn" from "the numbers inside are boxed".
public class Bench2Obj {
    static final class V {
        final double data;
        V(double d) { data = d; }
        V plus(V o) { return new V(data + o.data); }
        V dot(V o)  { return new V(data * o.data); }
    }
    public static void main(String[] args) {
        V s = new V(0.0);
        long t0 = System.nanoTime();
        for (int i = 1; i <= 2000000; i++) {
            s = s.plus(new V(1.0)).dot(new V(0.9999999));
        }
        long t1 = System.nanoTime();
        System.out.println("bench2 " + s.data);
        System.out.println("loop_ns " + (t1 - t0));
    }
}
