/*******************************************************************************
 Copyright 2009,2010, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.nativeHelpers;

import com.sun.fortress.compiler.runtimeValues.FException;
import com.sun.fortress.compiler.runtimeValues.Utility;

public class simpleUnsignedIntArith {

    public static long toLong(int i) {
	long l = i;
	l &= 0x00000000FFFFFFFFL;
	return l;
    }

    public static int toUnsignedIntOverflow(long l) {
	long t = l & 0xFFFFFFFF00000000L;
	if (t != 0) throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
	return (int) l; 
    }

    public static String unsignedIntToString(int x) {
        return Long.toString(toLong(x));
    }

    public static int parseUnsignedInt(String s) {  
        try { 
	    if (s.charAt(0) == '-') throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
	}
	catch (IndexOutOfBoundsException e) { 
	    throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
	}
	long c = Long.parseLong(s);
        return toUnsignedIntOverflow(c);
    }

    public static int unsignedIntOverflowingAdd(int a, int b) {
        long c = toLong(a) + toLong(b);
        return toUnsignedIntOverflow(c);
    }

    public static int unsignedIntOverflowingSub(int a, int b) {
	long c = toLong(a) - toLong(b);
	return toUnsignedIntOverflow(c);
    }

    public static int unsignedIntOverflowingMul(int a, int b) {
	long c = toLong(a) * toLong(b);
        return toUnsignedIntOverflow(c);
    }

    public static int unsignedIntOverflowingDiv(int a, int b) {
	if (b==0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
	long c = toLong(a) / toLong(b);
        return (int) c; 
    }

    /* REM and MOD, the same for natural numbers; each raises DivisionByZero at a zero divisor. */
    public static int unsignedIntRem(int a, int b) {
        if (b == 0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
        return Integer.remainderUnsigned(a, b);
    }

    public static int unsignedIntMod(int a, int b) {
        if (b == 0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
        return Integer.remainderUnsigned(a, b);
    }

    public static int unsignedIntOverflowingNeg(int a) {  
	if (a == 0) return 0;
	throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
    }

    public static int unsignedIntOverflowingAbs(int a) {
        return a;
    }

    public static int longOverflowingToUnsignedInt(long l) {
        return toUnsignedIntOverflow(l);
    }

    public static int unsignedIntOverflowingChoose(int n, int k) {
	return toUnsignedIntOverflow(simpleLongArith.longOverflowingChoose(toLong(n),toLong(k)));
    }

    public static int unsignedIntWrappingAdd(int a, int b) {
        return a + b;
    }

    public static int unsignedIntWrappingSub(int a, int b) {
        return a - b;
    }

    public static int unsignedIntWrappingMul(int a, int b) {
        return a * b;
    }

    public static int unsignedIntWrappingDiv(int a, int b) { 
	if (b==0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
        return (int) (toLong(a) / toLong(b));
    }

    public static int unsignedIntWrappingNeg(int a) { 
        return -a;
    }

    public static int unsignedIntWrappingAbs(int a) {
        return a;
    }

    public static int longWrappingToUnsignedInt(long l) {
        return (int)l;
    }

    public static int unsignedIntSaturatingAdd(int a, int b) {
        long c = toLong(a) + toLong(b);
	if (c > 0x00000000FFFFFFFFL) return -1;
	return (int) c;
    }

    public static int unsignedIntSaturatingSub(int a, int b) {
	if (toLong(b) > toLong(a)) return 0;
        long c = toLong(a) - toLong(b);
        return (int) c;
    }

    public static int unsignedIntSaturatingMul(int a, int b) {
	long c = toLong(a) * toLong(b);
	if (c > 0x00000000FFFFFFFFL) return -1;
	return (int) c;
    }

    public static int unsignedIntSaturatingDiv(int a, int b) {
	if (b==0) throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero");
        return (int) (toLong(a) / toLong(b)); 
    }

    public static int unsignedIntSaturatingNeg(int a) { 
        return 0;
    }

    public static int unsignedIntSaturatingAbs(int a) {
        return a;
    }

    public static int longSaturatingToUnsignedInt(long l) {
	int c = (int)l;
	if (c != l) return ((int)(l >> 63)) ^ Integer.MAX_VALUE;
        return c;
    }

    public static boolean unsignedIntLT(int a, int b) {
	return toLong(a) < toLong(b);
    }
	
    public static boolean unsignedIntLE(int a, int b) {
        return toLong(a) <= toLong(b);
    }

    public static boolean unsignedIntGT(int a, int b) {
        return toLong(a) > toLong(b);
    }    

    public static boolean unsignedIntGE(int a, int b) {
        return toLong(a) >= toLong(b);
    }

    public static boolean unsignedIntEQ(int a, int b) {
        return toLong(a) == toLong(b);
    }

    public static int unsignedIntBitNot(int a) {
        return ~a;
    }

    public static int unsignedIntBitAnd(int a, int b) {
        return a & b;
    }

    public static int unsignedIntBitOr(int a, int b) {
        return a | b;
    }

    public static int unsignedIntBitXor(int a, int b) {
        return a ^ b;
    }

    public static int unsignedIntLeftShiftByIntMod32(int a, int b) {
        return a << b;
    }

    public static int unsignedIntRightShiftByIntMod32(int a, int b) {
        return a >>> b;
    }

    public static int unsignedIntLeftShiftByLongMod32(int a, long b) {
        return a << b;
    }

    public static int unsignedIntRightShiftByLongMod32(int a, long b) {
        return a >>> b;
    }

    // This version handles signed shift distances and checks for arithmetic overflow.
    public static int unsignedIntShift(int a, int b) {
	if (b < 0) {
	    if (b < -31) return 0;
	    else return a >>> (-b);
        } else if (b > 31) {
	    if (a == 0) return 0;
	    else throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        }
	else {
	    int result = a << b;
	    if ((result >>> b) == a) return result;
	    else throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
	}
    }

    public static int unsignedIntExp(int a, int b) {  
        double result = java.lang.Math.pow(unsignedIntToDouble(a),unsignedIntToDouble(b));
        if (result > 0x00000000FFFFFFFFL)
	    throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        else
            return (int) result;
    }

    public static double unsignedIntToDouble(int a) {
        return (double) toLong(a);
    }
    
    public static int makeNN32FromZZ32WithSpecialCompilerHackForNN32ResultType(int x) {return x;}
    public static int makeZZ32FromNN32WithSpecialCompilerHackForNN32ArgumentType(int x) {return x;}

    // GCD, LCM and partitionL of NN32, as walk's NN32$Gcd, NN32$Lcm and NN32$Partition compute them.

    public static int unsignedIntGcd(int u, int v) {
        return (int) simpleUnsignedLongArith.unsignedLongGcd(toLong(u), toLong(v));
    }

    public static int unsignedIntLcm(int u, int v) {
        if (u == 0 || v == 0) return 0;
        long a = toLong(u);
        long b = toLong(v);
        // The multiple is below 2^64, and one of 2^63 or more reads negative.
        long m = (a / simpleUnsignedLongArith.unsignedLongGcd(a, b)) * b;
        if ((m >> 32) != 0) throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        return (int) m;
    }

    public static int unsignedIntPartition(int u) {
        return Integer.highestOneBit(u - 1);
    }

    // The shifts of an NN32 by a signed count: the bits shifted out are lost, a count at or
    // beyond 32 gives 0, and a negative count shifts the other way.
    public static int unsignedIntBitLeftShift(int a, int b) {
        if (b < 0) return (b > -32) ? (a >>> (-b)) : 0;
        return (b < 32) ? (a << b) : 0;
    }

    public static int unsignedIntBitRightShift(int a, int b) {
        if (b < 0) return (b > -32) ? (a << (-b)) : 0;
        return (b < 32) ? (a >>> b) : 0;
    }

    // a^b as an NN32, a read unsigned: at a negative exponent the base 1 gives 1, 0 throws
    // DivisionByZero and any other base IntegerOverflow; a power of 2^32 or more throws IntegerOverflow.
    public static int unsignedIntPower(int a, int b) {
        long r = simpleUnsignedLongArith.unsignedLongPower(toLong(a), b);
        if ((r >> 32) != 0) throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");
        return (int) r;
    }

}
