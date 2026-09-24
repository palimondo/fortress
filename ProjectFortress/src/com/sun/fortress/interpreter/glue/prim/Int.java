/*******************************************************************************
 Copyright 2008,2009, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.glue.prim;

import static com.sun.fortress.exceptions.ProgramError.error;
import com.sun.fortress.compiler.WellKnownNames;
import com.sun.fortress.exceptions.FortressError;
import com.sun.fortress.interpreter.Driver;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.types.FTypeObject;
import com.sun.fortress.interpreter.evaluator.values.*;
import com.sun.fortress.interpreter.glue.NativeMeth0;
import com.sun.fortress.interpreter.glue.NativeMeth1;
import com.sun.fortress.nodes.ObjectConstructor;

import java.math.BigInteger;
import java.util.List;

/**
 * Functions from ZZ32.
 */
public class Int extends NativeConstructor {

    public Int(Environment env, FTypeObject selfType, ObjectConstructor def) {
        super(env, selfType, def);
    }

    protected FNativeObject makeNativeObject(List<FValue> args, NativeConstructor con) {
        FInt.setConstructor(this);
        return FInt.ZERO;
    }

    static private abstract class ZZ2B extends NativeMeth1 {
        protected abstract boolean f(int x, int y);

        public final FValue applyMethod(FObject x, FValue y) {
            return FBool.make(f(x.getInt(), y.getInt()));
        }
    }

    static private abstract class Z2Z extends NativeMeth0 {
        protected abstract int f(int x);

        public final FValue applyMethod(FObject x) {
            return FInt.make(f(x.getInt()));
        }
    }

    static private abstract class Z2L extends NativeMeth0 {
        protected abstract long f(int x);

        public final FValue applyMethod(FObject x) {
            return FLong.make(f(x.getInt()));
        }
    }

    static private abstract class Z2R extends NativeMeth0 {
        protected abstract double f(int x);

        public final FValue applyMethod(FObject x) {
            return FFloat.make(f(x.getInt()));
        }
    }

    static private abstract class Z2S extends NativeMeth0 {
        protected abstract java.lang.String f(int x);

        public final FValue applyMethod(FObject x) {
            return FString.make(f(x.getInt()));
        }
    }

    static private abstract class ZZ2Z extends NativeMeth1 {
        protected abstract int f(int x, int y);

        public final FValue applyMethod(FObject x, FValue y) {
            return FInt.make(f(x.getInt(), y.getInt()));
        }
    }

    static private abstract class ZL2Z extends NativeMeth1 {
        protected abstract int f(int x, long y);

        public final FValue applyMethod(FObject x, FValue y) {
            return FInt.make(f(x.getInt(), shiftCount(y)));
        }
    }

    public static final class Negate extends Z2Z {
        protected int f(int x) {
            return -x;
        }
    }

    public static final class Add extends ZZ2Z {
        protected int f(int x, int y) {
            return x + y;
        }
    }

    public static final class Sub extends ZZ2Z {
        protected int f(int x, int y) {
            return x - y;
        }
    }

    public static final class Mul extends ZZ2Z {
        protected int f(int x, int y) {
            return x * y;
        }
    }

    public static final class Div extends ZZ2Z {
        protected int f(int x, int y) {
            return x / y;
        }
    }

    public static final class Rem extends ZZ2Z {
        protected int f(int x, int y) {
            return x % y;
        }
    }

    public static final class Gcd extends ZZ2Z {
        protected int f(int u, int v) {
            long g = gcd(u, v);
            if (g > Integer.MAX_VALUE) throw overflow();
            return (int) g;
        }
    }

    public static final class Lcm extends ZZ2Z {
        protected int f(int u, int v) {
            long m = lcm(u, v);
            if (m > Integer.MAX_VALUE) throw overflow();
            return (int) m;
        }
    }

    public static final class Choose extends ZZ2Z {
        protected int f(int u, int v) {
            return rc(choose(u, v));
        }
    }

    public static final class Mod extends ZZ2Z {
        protected int f(int u, int v) {
            return (int) mod(u, v);
        }
    }

    public static final class BitAnd extends ZZ2Z {
        protected int f(int u, int v) {
            return u & v;
        }
    }

    public static final class BitOr extends ZZ2Z {
        protected int f(int u, int v) {
            return u | v;
        }
    }

    public static final class BitXor extends ZZ2Z {
        protected int f(int u, int v) {
            return u ^ v;
        }
    }

    public static final class LShift extends ZL2Z {
        protected int f(int u, long v) {
            if (v < 0) return (v > -32) ? (u >> (int) -v) : (u >> 31);
            return ((v & ~31) == 0) ? (u << (int) v) : 0;
        }
    }

    public static final class RShift extends ZL2Z {
        protected int f(int u, long v) {
            if (v < 0) return (v > -32) ? (u << (int) -v) : 0;
            return ((v & ~31) == 0) ? (u >> (int) v) : (u >> 31);
        }
    }

    public static final class BitNot extends Z2Z {
        protected int f(int x) {
            return ~x;
        }
    }

    public static final class Eq extends ZZ2B {
        protected boolean f(int x, int y) {
            return x == y;
        }
    }

    public static final class Less extends ZZ2B {
        protected boolean f(int x, int y) {
            return x < y;
        }
    }

    public static final class Partition extends Z2Z {
        protected int f(int u) {
            return Integer.highestOneBit(u - 1);
        }
    }

    public static final class Pow extends NativeMeth1 {
        public FValue applyMethod(FObject x, FValue y) {
            int base = x.getInt();
            long exp = y.getLong();
            if (exp < 0) {
                return FFloat.make(1.0 / (double) pow(base, -exp));
            } else {
                return FInt.make(rc(pow(base, exp)));
            }
        }
    }

    public static final class ToLong extends Z2L {
        protected long f(int x) {
            return (long) x;
        }
    }

    public static final class ToString extends Z2S {
        protected java.lang.String f(int x) {
            return Integer.toString(x);
        }
    }

    public static final class AsFloat extends Z2R {
        protected double f(int x) {
            return (double) x;
        }
    }

    public static int rc(long i) {
        int r = (int) i;
        if ((long) r != i) {
            error("Overflow of ZZ32 " + i);
        }
        return r;
    }

    public static FortressError overflow() {
        FObject f = (FObject) Driver.getFortressLibrary().getRootValue(WellKnownNames.integerOverflowException);
        return new FortressError(f);
    }

    public static long shiftCount(FValue y) {
        if (y instanceof FNN64) {
            long v = y.getNN64();
            return (v < 0) ? java.lang.Long.MAX_VALUE : v;
        }
        if (y instanceof FBigNum) {
            BigInteger b = y.getBigInteger();
            if (b.bitLength() < 64) return b.longValue();
            return (b.signum() < 0) ? java.lang.Long.MIN_VALUE : java.lang.Long.MAX_VALUE;
        }
        return y.getLong();
    }

    public static long lcm(long u, long v) {
        if (u == 0 || v == 0) return 0;
        long q = u / gcd(u, v);
        if (q == java.lang.Long.MIN_VALUE || v == java.lang.Long.MIN_VALUE) throw overflow();
        try {
            return Math.multiplyExact(Math.abs(q), Math.abs(v));
        }
        catch (ArithmeticException e) {
            throw overflow();
        }
    }

    public static long gcd(long u, long v) {
        /* Thank you, Wikipedia. */
        /* But is this faster than just dividing on a modern
     * architecture? -Jan */
        long k = 0;
        if (u <= 0) {
            if (u == 0) return (v < 0) ? -v : v;
            u = -u;
        }
        if (v <= 0) {
            if (v == 0) return u;
            v = -v;
        }
        long uv = u | v;
        for (; (uv & 1) == 0; uv >>>= 1) { /* While both u and v are even */
            k++;  /* Store their common power of 2 */
        }
        /* At this point either u or v (or both) is odd */
        u >>>= k;
        for (; (u & 1) == 0; u >>>= 1) {
        } /* Divide u by 2 until odd. */
        v >>>= k;
        for (; (v & 1) == 0; v >>>= 1) {
        } /* Divide v by 2 until odd. */
        while (true) {
            /* u and v are both odd */
            if (u >= v) {
                u = (u - v) >>> 1;
                if (u == 0) return (v << k);
                for (; (u & 1) == 0; u >>>= 1) {
                } /* Divide u by 2 until odd. */
            } else {
                /* u and v both odd, v > u */
                v = (v - u) >>> 1;
                for (; (v & 1) == 0; v >>>= 1) {
                } /* Divide v by 2 until odd. */
            }
        }
    }

    public static long choose(long n, long k) {
        if (k > n / 2) k = n - k;
        if (k == 0) return 1;
        if (k == 1) return n;
        // k <= n/2
        // Will multiply (k) terms, n-k+1 through n-k+k
        // will divide by k terms, 1 through k
        // Note that if we divide after multiplying, it will
        // always be evenly divisible.
        // Proof: when we divide by k, we've multiplied by k consecutive integers,
        // at least one of which will be a multiple of k.
        long accum = 1;
        for (long j = 1; j <= k; j++) {
            long m = n - k + j;
            accum = accum * m;
            accum = accum / j;
        }
        return accum;
    }

    public static long mod(long xi, long yi) {
        long ri = xi % yi;
        if (ri == 0) return 0;

        if (yi > 0) {
            if (xi >= 0) return ri;
            return ri + yi;
        } else {
            if (xi >= 0) return ri + yi;
            return ri;
        }
    }

    public static long pow(long x, long y) {
        long r = 1;
        while (y > 0) {
            if ((y & 1) != 0) {
                r *= x;
                y--;
            }
            x *= x;
            y >>>= 1;
        }
        return r;
    }

    @Override
    protected void unregister() {
        FInt.resetConstructor();

    }

}
