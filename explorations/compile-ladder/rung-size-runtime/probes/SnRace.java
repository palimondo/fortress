import com.sun.fortress.compiler.runtimeValues.RTTI;
import com.sun.fortress.compiler.runtimeValues.RTTIsize;
import java.util.*;
import java.util.concurrent.CountDownLatch;
public class SnRace {
    public static void main(String[] a) throws Exception {
        final int threads = 8, sizes = 2000, rounds = 10;
        int dupRounds = 0; long dups = 0;
        for (int round = 0; round < rounds; round++) {
            final int base = 900000 + round * threads * sizes;
            final RTTI[][] made = new RTTI[threads][sizes];
            final CountDownLatch start = new CountDownLatch(1);
            Thread[] ts = new Thread[threads];
            for (int t = 0; t < threads; t++) {
                final int me = t;
                ts[t] = new Thread() { public void run() {
                    try { start.await(); } catch (InterruptedException e) { return; }
                    for (int i = 0; i < sizes; i++) made[me][i] = RTTIsize.of(Integer.toString(base + me * sizes + i));
                }};
                ts[t].start();
            }
            start.countDown();
            for (Thread t : ts) t.join();
            Map<Long, String> seen = new HashMap<Long, String>();
            int d = 0; String ex = null;
            for (int t = 0; t < threads; t++) for (int i = 0; i < sizes; i++) {
                RTTI r = made[t][i];
                String prev = seen.put(r.getSN(), r.className());
                if (prev != null) { d++; if (ex == null) ex = "serial " + r.getSN() + " given to size " + prev + " and to size " + r.className(); }
            }
            System.out.println("round " + round + ": " + (threads * sizes) + " distinct sizes made on " + threads + " threads at once, " + d + " serial numbers shared" + (ex == null ? "" : "; e.g. " + ex));
            if (d > 0) dupRounds++; dups += d;
        }
        System.out.println("rounds with a shared serial number: " + dupRounds + " of " + rounds + "; shared in all: " + dups);
    }
}
