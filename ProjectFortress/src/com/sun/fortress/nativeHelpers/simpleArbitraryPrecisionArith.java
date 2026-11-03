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

}
