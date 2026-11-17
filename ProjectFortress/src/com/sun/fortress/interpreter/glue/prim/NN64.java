/*******************************************************************************
 Copyright 2008,2009, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.glue.prim;

import com.naturalbridge.misc.Unsigned;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.types.FTypeObject;
import com.sun.fortress.interpreter.evaluator.values.*;
import com.sun.fortress.nodes.ObjectConstructor;

import java.util.List;

/**
 * The constructor of the library's object NN64, whose values are FNN64, and the unsigned
 * greatest common divisor, binomial coefficient and powers that the glue class of NN32 uses.
 */
public class NN64 extends NativeConstructor {

    public NN64(Environment env, FTypeObject selfType, ObjectConstructor def) {
        super(env, selfType, def);
    }

    protected FNativeObject makeNativeObject(List<FValue> args, NativeConstructor con) {
        FNN64.setConstructor(this);
        return FNN64.ZERO;
    }

    public static long gcd(long u, long v) {
        /* Thank you, Wikipedia. */
        /* But is this faster than just dividing on a modern
     * architecture? -Jan */
        if (u == 0) return v;
        if (v == 0) return u;
        long k = 0;
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
            if (Unsigned.greaterThanOrEqual(u, v)) {
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
        if (Unsigned.greaterThan(k, n)) return 0;
        if (Unsigned.greaterThan(k, Unsigned.divide(n, 2))) k = Unsigned.subtract(n, k);
        if (k == 0) return 1;
        if (k == 1) return n;
        // k <= n/2
        // Will multiply (k) terms, n-k+1 through n-k+k
        // will divide by k terms, 1 through k
        // Note that if we divide after multiplying, it will
        // always be evenly divisible.
        // Proof: when we divide by k, we've multiplied by k consecutive integers,
        // at least one of which will be a multiple of k.
        // A step overflows only if its coefficient does.
        long accum = 1;
        for (long j = 1; j <= k; j++) {
            long m = n - k + j;
            long g = gcd(accum, j);
            accum = multiplyExact(Unsigned.divide(accum, g), Unsigned.divide(m, Unsigned.divide(j, g)));
        }
        return accum;
    }

    /** x times y, unsigned; a catchable IntegerOverflow if it is not an NN64 value. */
    public static long multiplyExact(long x, long y) {
        long p = Unsigned.multiplyToLong(x, y);
        if (y != 0 && Unsigned.divide(p, y) != x) throw ZZ32.overflow();
        return p;
    }

    /** x^y, x unsigned, for y >= 0; a catchable IntegerOverflow if it is not an NN64 value. */
    public static long powExact(long x, long y) {
        long r = 1;
        while (y > 0) {
            if ((y & 1) != 0) r = multiplyExact(r, x);
            y >>>= 1;
            if (y > 0) x = multiplyExact(x, x);
        }
        return r;
    }

    /** An unsigned base to a negative exponent: the base 1 gives 1, 0 throws
        DivisionByZero, and any other base, whose power is no integer, throws
        IntegerOverflow. */
    public static long negativePow(long base) {
        if (base == 1) return 1;
        if (base == 0) throw ZZ32.divisionByZero();
        throw ZZ32.overflow();
    }

    @Override
    protected void unregister() {
        FNN64.resetConstructor();

    }
}
