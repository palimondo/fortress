import com.naturalbridge.misc.Unsigned;
public class UCheck {
    public static void main(String[] a) {
        System.out.println("toLong(-1)=" + Unsigned.toLong(-1));
        System.out.println("lessThan(int 1,-1)=" + Unsigned.lessThan(1, -1) + " lessThan(int -1,1)=" + Unsigned.lessThan(-1, 1));
        System.out.println("lessThan(long 1,-1)=" + Unsigned.lessThan(1L, -1L) + " greaterThan(long -1,1)=" + Unsigned.greaterThan(-1L, 1L));
        System.out.println("divide(long -1,2)=" + Long.toUnsignedString(Unsigned.divide(-1L, 2L)) + " divide(long -1,-1)=" + Unsigned.divide(-1L, -1L) + " divide(long 5,-1)=" + Unsigned.divide(5L, -1L));
        System.out.println("multiplyToLong(2^63,2)=" + Unsigned.multiplyToLong(1L<<63, 2L) + " add(-1,1)=" + Unsigned.add(-1L, 1L) + " subtract(0,1)=" + Unsigned.subtract(0L,1L));
        System.out.println("multiply(int -1,-1)=" + Long.toUnsignedString(Unsigned.multiply(-1, -1)));
        // exhaustive-ish check of the divu-style multiply test against unsignedMultiplyHigh
        java.util.Random r = new java.util.Random(1);
        long bad = 0;
        long[] edge = {0,1,2,3,-1,-2,1L<<32,(1L<<32)-1,(1L<<32)+1,1L<<63,(1L<<63)-1,(1L<<63)+1,0xFFFFFFFFL,1L<<31};
        java.util.List<Long> vals = new java.util.ArrayList<>();
        for (long e : edge) vals.add(e);
        for (int i = 0; i < 2000; i++) { vals.add(r.nextLong()); vals.add(r.nextLong() >>> r.nextInt(64)); }
        for (long x : vals) for (long y : vals) {
            boolean ovA = y != 0 && Unsigned.divide(Unsigned.multiplyToLong(x, y), y) != x;
            boolean ovB = Math.unsignedMultiplyHigh(x, y) != 0;
            long s = Unsigned.add(x, y);
            boolean addA = Unsigned.lessThan(s, x);
            boolean addB = java.lang.Long.compareUnsigned(x + y, x) < 0;
            boolean subA = Unsigned.greaterThan(Unsigned.subtract(x, y), x);
            boolean subB = java.lang.Long.compareUnsigned(x, y) < 0;
            if (ovA != ovB || addA != addB || subA != subB) bad++;
        }
        System.out.println("NN64 checks disagree on " + bad + " of " + ((long)vals.size()*vals.size()) + " pairs");
        long bad32 = 0; long n32 = 0;
        int[] e32 = {0,1,2,-1,-2,65536,65535,65537,1<<31,Integer.MAX_VALUE};
        java.util.List<Integer> v32 = new java.util.ArrayList<>();
        for (int e : e32) v32.add(e);
        for (int i = 0; i < 2000; i++) { v32.add(r.nextInt()); v32.add(r.nextInt() >>> r.nextInt(32)); }
        for (int x : v32) for (int y : v32) {
            n32++;
            long X = x & 0xffffffffL, Y = y & 0xffffffffL;
            boolean addA = ((Unsigned.toLong(x) + Unsigned.toLong(y)) >>> 32) != 0, addB = X + Y > 0xffffffffL;
            boolean subA = ((Unsigned.toLong(x) - Unsigned.toLong(y)) >>> 32) != 0, subB = X < Y;
            boolean mulA = ((Unsigned.toLong(x) * Unsigned.toLong(y)) >>> 32) != 0, mulB = java.math.BigInteger.valueOf(X).multiply(java.math.BigInteger.valueOf(Y)).compareTo(java.math.BigInteger.valueOf(0xffffffffL)) > 0;
            if (addA != addB || subA != subB || mulA != mulB) bad32++;
        }
        System.out.println("NN32 checks disagree on " + bad32 + " of " + n32 + " pairs");
    }
}
