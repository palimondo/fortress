/*******************************************************************************
 Copyright 2009,2010, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.nativeHelpers;

import com.sun.fortress.compiler.runtimeValues.FException;
import com.sun.fortress.compiler.runtimeValues.Utility;

public class simpleUnsignedLongArith {
	
    public static long parseUnsignedLong(String s) {  
    	return 0;
    }

    public static String unsignedLongToString(long x) {
        return Long.toUnsignedString(x);
    }

    /* asFloat of an NN64, rounded to the nearest double, as walk's UnsignedLong$AsFloat computes it: a value above
       the signed half is halved, its low bit kept as a sticky bit, converted and doubled. */
    public static double unsignedLongToDouble(long a) {
        if (a >= 0) return (double) a;
        return ((double) ((a >>> 1) | (a & 1L))) * 2.0;
    }
    
    public static boolean ltu(long a, long b) {
    	return ((((~a & b) | ((~a | b) & (a - b))) >>> 63) == 1);
    }
	
    public static boolean leu(long a, long b) {
    	return ((((~a | b) & ((a ^ b) | ~(b - a))) >>> 63) == 1);
    }

    public static boolean gtu(long b, long a) {
    	return ((((~a & b) | ((~a | b) & (a - b))) >>> 63) == 1);
    }    

    public static boolean geu(long b, long a) {
    	return ((((~a | b) & ((a ^ b) | ~(b - a))) >>> 63) == 1);
    }
    
    public static long divu(long n, long d) {
    	if (d < 0) {
    		if (ltu(n,d)) return 0;
    		else return 1;
    	}
    	else {
    		long q = ((n >>> 1) / d) << 1;
    		long r = n - (q * d);
    		if (geu(r,d)) q = q + 1; 
    		return q;
    	}
    }
    
    public static long unsignedLongOverflowingAdd(long a, long b) {
    	long r = a + b;
    	if (ltu(r,a)) throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
    	return r;
    }

    public static long unsignedLongOverflowingSub(long a, long b) {
    	long r = a - b;
    	if (gtu(r,a)) throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
    	return r;
    }

    public static long unsignedLongOverflowingMul(long a, long b) {
    	long r = a * b;
    	if (b == 0) return r; 
    	if (divu(r,b) != a) throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
    	return r;
    }

    public static long unsignedLongOverflowingDiv(long n, long d) {
    	if (d==0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
    	return divu(n,d);
    }

    /* REM and MOD, the same for natural numbers; each raises DivisionByZero at a zero divisor. */
    public static long unsignedLongRem(long a, long b) {
        if (b == 0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
        return Long.remainderUnsigned(a, b);
    }

    public static long unsignedLongMod(long a, long b) {
        if (b == 0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
        return Long.remainderUnsigned(a, b);
    }

    public static long unsignedLongOverflowingNeg(long a) {  
    	if (a == 0) return 0;
    	throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
    }

    public static long unsignedLongOverflowingAbs(long a) {
    	return a;
    }

    public static long unsignedLongWrappingAdd(long a, long b) {
    	return a + b;
    }

    public static long unsignedLongWrappingSub(long a, long b) {
    	return a - b;
    }

    public static long unsignedLongWrappingMul(long a, long b) {
    	return a * b;
    }

    public static long unsignedLongWrappingDiv(long n, long d) { 
    	if (d==0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
    	return divu(n,d);
    }

    public static long unsignedLongWrappingNeg(long a) { 
    	return -a;
    }

    public static long unsignedLongWrappingAbs(long a) {
    	return a;
    }

    public static int longWrappingToUnsignedInt(long l) {
    	return (int) l;
    }

    public static long unsignedLongSaturatingAdd(long a, long b) {
    	long r = a + b;
    	if (ltu(r,a)) return -1;
    	return r;
    }

    public static long unsignedLongSaturatingSub(long a, long b) {
    	long r = a - b;
    	if (gtu(r,a)) return 0;
    	return r;
    }

    public static long unsignedLongSaturatingMul(long a, long b) {
    	long r = a * b;
    	long q = divu(r,b);
    	if (q != a) return -1;
    	return r;
    }

    public static long unsignedLongSaturatingDiv(long n, long d) {
    	if (d==0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
    	return divu(n,d);
    }

    public static long unsignedLongSaturatingNeg(long a) {  
    	return 0;
    }

    public static long unsignedLongSaturatingAbs(long a) {
    	return a;
    }

    public static int longSaturatingToUnsignedInt(long l) {
    	return (int) l;
    }

    public static boolean unsignedLongLT(long a, long b) {
    	return ltu(a,b);
    }
	
    public static boolean unsignedLongLE(long a, long b) {
    	return leu(a,b);
    }

    public static boolean unsignedLongGT(long a, long b) {
    	return gtu(a,b);
    }    

    public static boolean unsignedLongGE(long a, long b) {
    	return geu(a,b);
    }

    public static boolean unsignedLongEQ(long a, long b) {
    	return a == b;
    }

    public static long unsignedLongBitNot(long a) {
    	return ~a;
    }

    public static long unsignedLongBitAnd(long a, long b) {
    	return a & b;
    }

    public static long unsignedLongBitOr(long a, long b) {
    	return a | b;
    }

    public static long unsignedLongBitXor(long a, long b) {
    	return a ^ b;
    }

    public static long unsignedLongLeftShiftByIntMod64(long a, int b) {
        return a << b;
    }

    public static long unsignedLongRightShiftByIntMod64(long a, int b) {
        return a >>> b;
    }

    public static long unsignedLongLeftShiftByLongMod64(long a, long b) {
        return a << b;
    }

    public static long unsignedLongRightShiftByLongMod64(long a, long b) {
        return a >>> b;
    }

    // This version handles signed shift distances and checks for arithmetic overflow.
    public static long unsignedLongShift(long a, int b) {
	if (b < 0) {
	    if (b < -63) return 0;
	    else return a >>> (-b);
        } else if (b > 63) {
	    if (a == 0) return 0;
	    else throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        }
	else {
	    long result = a << b;
	    if ((result >>> b) == a) return result;
	    else throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
	}
    }

    // NIY
    public static long unsignedLongExp(long a, long b) {  
    	return a + b;
    }
	
    public static long makeNN64FromZZ64WithSpecialCompilerHackForNN64ResultType(long x) {return x;}
    public static long makeZZ64FromNN64WithSpecialCompilerHackForNN64ArgumentType(long x) {return x;}
    
    // GCD, LCM, CHOOSE and partitionL of NN64, as walk's UnsignedLong$Gcd, UnsignedLong$Lcm,
    // UnsignedLong$Choose and UnsignedLong$Partition compute them.

    public static long unsignedLongGcd(long u, long v) {
        while (v != 0) {
            long t = Long.remainderUnsigned(u, v);
            u = v;
            v = t;
        }
        return u;
    }

    public static long unsignedLongLcm(long u, long v) {
        if (u == 0 || v == 0) return 0;
        return unsignedLongOverflowingMul(Long.divideUnsigned(u, unsignedLongGcd(u, v)), v);
    }

    // Each call keeps its state in its own locals, so calls can run in parallel.
    public static long unsignedLongOverflowingChoose(long n, long k) {
        if (Long.compareUnsigned(k, n) > 0) return 0;
        if (Long.compareUnsigned(k, n >>> 1) > 0) k = n - k;
        if (k == 0) return 1;
        if (k == 1) return n;
        // Here k <= n/2 < 2^63. Dividing by g = gcd(accum, j) first leaves j/g dividing m,
        // so a step overflows only if its coefficient, which grows with j, does.
        long accum = 1;
        for (long j = 1; j <= k; j++) {
            long m = n - k + j;
            long g = unsignedLongGcd(accum, j);
            accum = unsignedLongOverflowingMul(Long.divideUnsigned(accum, g), Long.divideUnsigned(m, j / g));
        }
        return accum;
    }

    public static long unsignedLongPartition(long u) {
        return Long.highestOneBit(u - 1);
    }

    // The shifts of an NN64 by a signed count: the bits shifted out are lost, a count at or
    // beyond 64 gives 0, and a negative count shifts the other way.
    public static long unsignedLongBitLeftShift(long a, long b) {
        if (b < 0) return (b > -64) ? (a >>> (-b)) : 0;
        return (b < 64) ? (a << b) : 0;
    }

    public static long unsignedLongBitRightShift(long a, long b) {
        if (b < 0) return (b > -64) ? (a << (-b)) : 0;
        return (b < 64) ? (a >>> b) : 0;
    }

    // a^b as an NN64, a read unsigned: at a negative exponent the base 1 gives 1, 0 throws
    // DivisionByZero and any other base IntegerOverflow; a power of 2^64 or more throws IntegerOverflow.
    public static long unsignedLongPower(long a, int b) {
        if (b < 0) {
            if (a == 1) return 1;
            if (a == 0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
            throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        }
        long r = 1;
        long x = a;
        int y = b;
        while (y > 0) {
            if ((y & 1) != 0) r = unsignedLongOverflowingMul(r, x);
            y >>>= 1;
            if (y > 0) x = unsignedLongOverflowingMul(x, x);
        }
        return r;
    }

}
