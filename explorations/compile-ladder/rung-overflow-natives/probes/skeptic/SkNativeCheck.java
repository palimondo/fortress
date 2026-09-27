package com.sun.fortress.interpreter.glue.prim;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/* Calls the f methods of the eighteen natives as built in ProjectFortress/build and compares each
   answer with exact BigInteger arithmetic: an exact result that fits must come back unchanged, and
   one that does not fit must throw. Outside the interpreter Int.overflow() cannot reach the
   library, so any Throwable counts as "raised"; which exception is raised is checked by the
   Fortress probes. Run: java -cp <this dir>:<fortress classpath> com.sun.fortress.interpreter.glue.prim.SkNativeCheck */
public class SkNativeCheck {
    static final BigInteger I_MIN = BigInteger.valueOf(Integer.MIN_VALUE), I_MAX = BigInteger.valueOf(Integer.MAX_VALUE);
    static final BigInteger L_MIN = BigInteger.valueOf(java.lang.Long.MIN_VALUE), L_MAX = BigInteger.valueOf(java.lang.Long.MAX_VALUE);
    static final BigInteger U32_MAX = BigInteger.ONE.shiftLeft(32).subtract(BigInteger.ONE);
    static final BigInteger U64_MAX = BigInteger.ONE.shiftLeft(64).subtract(BigInteger.ONE);
    static long checked = 0, bad = 0;
    static final long[] raised = new long[18];
    static final String[] names = {"Int$Negate","Int$Add","Int$Sub","Int$Mul","Int$Div","Long$Negate","Long$Add","Long$Sub","Long$Mul","Long$Div",
                                   "NN32$Negate","NN32$Add","NN32$Sub","NN32$Mul","UnsignedLong$Negate","UnsignedLong$Add","UnsignedLong$Sub","UnsignedLong$Mul"};

    interface Op { BigInteger run(); }

    static void check(int k, BigInteger exact, BigInteger lo, BigInteger hi, Op op, String what) {
        checked++;
        boolean fits = exact.compareTo(lo) >= 0 && exact.compareTo(hi) <= 0;
        BigInteger got = null; boolean threw = false;
        try { got = op.run(); } catch (Throwable t) { threw = true; }
        if (threw) raised[k]++;
        if (fits ? (threw || !got.equals(exact)) : !threw) {
            bad++;
            if (bad <= 20) System.out.println("MISMATCH " + names[k] + " " + what + " exact=" + exact + " got=" + (threw ? "THROWS" : got));
        }
    }

    static BigInteger u32(int x) { return BigInteger.valueOf(x & 0xffffffffL); }
    static BigInteger u64(long x) { BigInteger b = BigInteger.valueOf(x); return x < 0 ? b.add(BigInteger.ONE.shiftLeft(64)) : b; }

    public static void main(String[] a) {
        Random r = new Random(20260927L);
        List<java.lang.Long> vals = new ArrayList<>();
        long[] edges = {0, 1, -1, 2, -2, 3, 46340, 46341, 65535, 65536, 65537, 3037000499L, 3037000500L,
                        Integer.MAX_VALUE, Integer.MIN_VALUE, Integer.MAX_VALUE - 1L, Integer.MIN_VALUE + 1L,
                        0xffffffffL, 0x100000000L, 0x80000000L, java.lang.Long.MAX_VALUE, java.lang.Long.MIN_VALUE, java.lang.Long.MAX_VALUE - 1, java.lang.Long.MIN_VALUE + 1,
                        1L << 62, (1L << 62) - 1, 0x5555555555555555L, 0x5555555555555556L, 6148914691236517205L};
        for (long e : edges) { vals.add(e); vals.add(-e); }
        for (int i = 0; i < 250; i++) { vals.add(r.nextLong()); vals.add(r.nextLong() >> r.nextInt(64)); vals.add((long) r.nextInt()); }
        Int.Negate iN = new Int.Negate(); Int.Add iA = new Int.Add(); Int.Sub iS = new Int.Sub(); Int.Mul iM = new Int.Mul(); Int.Div iD = new Int.Div();
        Long.Negate lN = new Long.Negate(); Long.Add lA = new Long.Add(); Long.Sub lS = new Long.Sub(); Long.Mul lM = new Long.Mul(); Long.Div lD = new Long.Div();
        NN32.Negate nN = new NN32.Negate(); NN32.Add nA = new NN32.Add(); NN32.Sub nS = new NN32.Sub(); NN32.Mul nM = new NN32.Mul();
        UnsignedLong.Negate uN = new UnsignedLong.Negate(); UnsignedLong.Add uA = new UnsignedLong.Add(); UnsignedLong.Sub uS = new UnsignedLong.Sub(); UnsignedLong.Mul uM = new UnsignedLong.Mul();
        for (java.lang.Long X : vals) {
            final long xl = X; final int xi = (int) xl;
            check(0, BigInteger.valueOf(xi).negate(), I_MIN, I_MAX, () -> BigInteger.valueOf(iN.f(xi)), "-" + xi);
            check(5, BigInteger.valueOf(xl).negate(), L_MIN, L_MAX, () -> BigInteger.valueOf(lN.f(xl)), "-" + xl);
            check(10, u32(xi).negate(), BigInteger.ZERO, U32_MAX, () -> u32(nN.f(xi)), "-" + u32(xi));
            check(14, u64(xl).negate(), BigInteger.ZERO, U64_MAX, () -> u64(uN.f(xl)), "-" + u64(xl));
            for (java.lang.Long Y : vals) {
                final long yl = Y; final int yi = (int) yl;
                BigInteger bx = BigInteger.valueOf(xi), by = BigInteger.valueOf(yi);
                check(1, bx.add(by), I_MIN, I_MAX, () -> BigInteger.valueOf(iA.f(xi, yi)), xi + "+" + yi);
                check(2, bx.subtract(by), I_MIN, I_MAX, () -> BigInteger.valueOf(iS.f(xi, yi)), xi + "-" + yi);
                check(3, bx.multiply(by), I_MIN, I_MAX, () -> BigInteger.valueOf(iM.f(xi, yi)), xi + "*" + yi);
                if (yi != 0) {
                    BigInteger q = bx.divide(by);
                    check(4, q, I_MIN, I_MAX, () -> BigInteger.valueOf(iD.f(xi, yi)), xi + " DIV " + yi);
                }
                BigInteger lx = BigInteger.valueOf(xl), ly = BigInteger.valueOf(yl);
                check(6, lx.add(ly), L_MIN, L_MAX, () -> BigInteger.valueOf(lA.f(xl, yl)), xl + "+" + yl);
                check(7, lx.subtract(ly), L_MIN, L_MAX, () -> BigInteger.valueOf(lS.f(xl, yl)), xl + "-" + yl);
                check(8, lx.multiply(ly), L_MIN, L_MAX, () -> BigInteger.valueOf(lM.f(xl, yl)), xl + "*" + yl);
                if (yl != 0) {
                    BigInteger q = lx.divide(ly);
                    check(9, q, L_MIN, L_MAX, () -> BigInteger.valueOf(lD.f(xl, yl)), xl + " DIV " + yl);
                }
                BigInteger ux = u32(xi), uy = u32(yi);
                check(11, ux.add(uy), BigInteger.ZERO, U32_MAX, () -> u32(nA.f(xi, yi)), ux + "+" + uy);
                check(12, ux.subtract(uy), BigInteger.ZERO, U32_MAX, () -> u32(nS.f(xi, yi)), ux + "-" + uy);
                check(13, ux.multiply(uy), BigInteger.ZERO, U32_MAX, () -> u32(nM.f(xi, yi)), ux + "*" + uy);
                BigInteger vx = u64(xl), vy = u64(yl);
                check(15, vx.add(vy), BigInteger.ZERO, U64_MAX, () -> u64(uA.f(xl, yl)), vx + "+" + vy);
                check(16, vx.subtract(vy), BigInteger.ZERO, U64_MAX, () -> u64(uS.f(xl, yl)), vx + "-" + vy);
                check(17, vx.multiply(vy), BigInteger.ZERO, U64_MAX, () -> u64(uM.f(xl, yl)), vx + "*" + vy);
            }
        }
        System.out.println("operand values: " + vals.size() + "; checks: " + checked + "; mismatches: " + bad);
        for (int k = 0; k < 18; k++) System.out.println("  " + names[k] + " raised on " + raised[k]);
    }
}
