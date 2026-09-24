import java.math.BigInteger;

public class PrecheckBoundary {
    public static void main(String[] args) {
        long[] us = {1, -1, 3, -3, 4, -4, 5, -5};
        int mismatches = 0;
        for (long ul : us) {
            BigInteger u = BigInteger.valueOf(ul);
            int edge = Integer.MAX_VALUE - u.abs().bitLength();
            for (int v = edge - 1; v <= edge + 1 && v >= 0; v++) {
                boolean precheckRefuses = u.abs().bitLength() + (long) v > Integer.MAX_VALUE;
                boolean jvmRefuses;
                try {
                    BigInteger r = u.shiftLeft(v);
                    jvmRefuses = false;
                    r = null;
                } catch (ArithmeticException e) {
                    jvmRefuses = true;
                }
                boolean same = precheckRefuses == jvmRefuses;
                if (!same) mismatches++;
                System.out.println(ul + " << " + v + ": precheck " + (precheckRefuses ? "refuses" : "allows")
                                   + ", JVM " + (jvmRefuses ? "throws" : "returns") + (same ? "" : "   MISMATCH"));
                System.gc();
            }
        }
        System.out.println("mismatches " + mismatches + ", " + System.getProperty("java.version"));
    }
}
