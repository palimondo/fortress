/*******************************************************************************
 Copyright 2009,2010, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.nativeHelpers;

import com.sun.fortress.compiler.runtimeValues.FException;
import com.sun.fortress.compiler.runtimeValues.FZZ;
import com.sun.fortress.compiler.runtimeValues.Utility;
import java.math.BigInteger;

public class simpleArbitraryPrecisionArith {
	
	
    public static BigInteger parse(String s) {  
    	return new BigInteger(s);
    }
  
    public static String toString(BigInteger b) {  
    	return b.toString();
    }
    
    /* asFloat of a ZZ: the nearest double, ties to even, and an infinity past the double range. */
    public static double toDouble(BigInteger a) {
        return a.doubleValue();
    }

    public static BigInteger add(BigInteger a, BigInteger b) {
    	return a.add(b);
    }

    public static BigInteger sub(BigInteger a, BigInteger b) {
    	return a.subtract(b);
    }

    public static BigInteger mul(BigInteger a, BigInteger b) {
    	return a.multiply(b);
    }

    public static BigInteger div(BigInteger a, BigInteger b) { 
    	if (b.equals(BigInteger.ZERO)) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero"); 
    	return a.divide(b);
    }

    /* REM, the remainder of the truncating division, and MOD, the remainder of the floor division, which has the
       sign of the divisor; each raises DivisionByZero at a zero divisor. */
    public static BigInteger rem(BigInteger a, BigInteger b) {
        if (b.signum() == 0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
        return a.remainder(b);
    }

    public static BigInteger mod(BigInteger a, BigInteger b) {
        if (b.signum() == 0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
        if (b.signum() < 0) return a.negate().mod(b.negate()).negate();
        return a.mod(b);
    }

    public static BigInteger neg(BigInteger a) { 
    	return a.negate();
    }

    public static BigInteger abs(BigInteger a) {
    	return a.abs();
    }

    public static boolean lt(BigInteger a, BigInteger b) {
    	return (a.compareTo(b) == -1? true : false);
    }
	
    public static boolean le(BigInteger a, BigInteger b) {
    	int x = a.compareTo(b);
    	return (x == -1 || x == 0 ? true : false);
    }

    public static boolean gt(BigInteger a, BigInteger b) {
    	return (a.compareTo(b) == 1? true : false);
    }    

    public static boolean ge(BigInteger a, BigInteger b) {
    	int x = a.compareTo(b);
    	return (x == 1 || x == 0 ? true : false);
    }

    public static boolean eq(BigInteger a, BigInteger b) {
    	return (a.compareTo(b) == 0? true : false);
    }

    public static BigInteger not(BigInteger a) {
    	return a.not();
    }

    public static BigInteger and(BigInteger a, BigInteger b) {
    	return a.and(b);
    }

    public static BigInteger oor(BigInteger a, BigInteger b) {
    	return a.or(b);
    }

    public static BigInteger xor(BigInteger a, BigInteger b) {
    	return a.xor(b);
    }

    public static BigInteger shiftLeft(BigInteger a, int k) {
        if (k > 0 && a.signum() != 0 && (long) a.abs().bitLength() + k > Integer.MAX_VALUE)
            throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        try {
            return a.shiftLeft(k);
        }
        catch (ArithmeticException e) {
            throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        }
    }
	
    public static BigInteger ZZtoBI(BigInteger i) {
    	return i;
    }
    
    public static BigInteger BItoZZ(BigInteger i) {
    	return i;
    }

    public static BigInteger makeZZfromZZ32(int k) {
    	return BigInteger.valueOf(k);
    }

    public static BigInteger makeZZfromZZ64(long k) {
    	return BigInteger.valueOf(k);
    }

    public static BigInteger makeZZfromNN32(int k) {
    	return BigInteger.valueOf(((long)k) & 0x00000000FFFFFFFFL);
    }

    public static BigInteger makeZZfromNN64(long k) {
	if (k >= 0) return BigInteger.valueOf(k);
	else return BigInteger.valueOf((k << 1) >>> 1).setBit(63);
    }

    // GCD, LCM, CHOOSE and cmp of ZZ, as walk's BigNum$Gcd, BigNum$Lcm, BigNum$Choose and
    // BigNum$Cmp compute them.

    public static BigInteger gcd(BigInteger u, BigInteger v) {
        return u.gcd(v);
    }

    public static BigInteger lcm(BigInteger u, BigInteger v) {
        if (u.signum() == 0 || v.signum() == 0) return BigInteger.ZERO;
        u = u.abs();
        v = v.abs();
        // The smaller divided by the divisor, then multiplied.
        return u.min(v).divide(u.gcd(v)).multiply(u.max(v));
    }

    // Each call keeps its state in its own locals, so calls can run in parallel.
    // Where k < 0 or k > n, it answers 1, as BigNum$Choose does.
    public static BigInteger choose(BigInteger n, BigInteger k) {
        BigInteger nmk = n.subtract(k);
        if (nmk.compareTo(k) < 0) {
            BigInteger t = k;
            k = nmk;
            nmk = t;
        }
        BigInteger accum = BigInteger.ONE;
        for (BigInteger j = BigInteger.ONE; j.compareTo(k) <= 0; j = j.add(BigInteger.ONE)) {
            nmk = nmk.add(BigInteger.ONE);
            accum = accum.multiply(nmk).divide(j);
        }
        return accum;
    }

    public static int cmp(BigInteger a, BigInteger b) {
        return a.compareTo(b);
    }

    // floor(a 2^-k) at every int count, as shiftLeft(a, -k) where -k is an int; the count
    // Integer.MIN_VALUE shifts left by 2^31, which overflows unless a is 0.
    public static BigInteger bigBitRightShift(BigInteger a, int k) {
        if (k == Integer.MIN_VALUE) {
            if (a.signum() == 0) return a;
            throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        }
        return shiftLeft(a, -k);
    }

    // a^b as a ZZ: at a negative exponent the bases 1 and -1 give their power, 0 throws
    // DivisionByZero and any other base IntegerOverflow; a power beyond BigInteger's range throws
    // IntegerOverflow, tested before the power is built where |a|^b reaches 2^(2^31-1).
    public static BigInteger bigPower(BigInteger a, int b) {
        if (b < 0) {
            if (a.equals(BigInteger.ONE)) return a;
            if (a.equals(BigInteger.ONE.negate())) return ((b & 1) == 0) ? BigInteger.ONE : a;
            if (a.signum() == 0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
            throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        }
        BigInteger m = a.abs();
        if (m.compareTo(BigInteger.ONE) > 0 && (long) (m.bitLength() - 1) * b >= Integer.MAX_VALUE)
            throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        try {
            return a.pow(b);
        }
        catch (ArithmeticException e) {
            throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        }
    }

}
