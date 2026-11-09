/*******************************************************************************
 Copyright 2009,2010, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.nativeHelpers;

public class simpleDoubleArith {

    public static String doubleToString(double x) {
        return Double.toString(x);
    }

     public static double parseDouble(String s) {
        return Double.parseDouble(s);
    }

    public static double doubleAdd(double a, double b) {
        return a + b;
    }

    public static double doubleSub(double a, double b) {
        return a - b;
    }

    public static double doubleMul(double a, double b) {
        return a * b;
    }

    public static double doubleDiv(double a, double b) {
        return a / b;
    }

    public static double doubleNeg(double a) {
        return -a;
    }

    public static boolean doubleLT(double a, double b) {
        return a < b;
    }

    public static boolean doubleLE(double a, double b) {
        return a <= b;
    }

    public static boolean doubleGT(double a, double b) {
        return a > b;
    }

    public static boolean doubleGE(double a, double b) {
        return a >= b;
    }

    public static boolean doubleEQ(double a, double b) {
        return a == b;
    }

    public static double doubleAbs(double a) {
        return Math.abs(a);
    }

    public static double doublePow(double a, double b) {
        return Math.pow(a,b);
    }

    public static double doublePowFloat(double a, float b) {
        return Math.pow(a, b);
    }

    public static double doublePowInt(double a, int b) {
        return Math.pow(a, b);
    }

    public static double doubleNanoTime() {
        return (double)System.nanoTime();
    }

    public static double floatToDouble(float f) {
        return (double)f;
    }

    public static double doubleSQRT(double a) {
        return Math.sqrt(a);
    }

    public static double doubleFloor(double a) {
        return Math.floor(a);
    }

    public static double doubleCeiling(double a) {
        return Math.ceil(a);
    }

    public static long doubleIFloor(double a) {
        return (long) Math.floor(a);
    }

    public static long doubleICeiling(double a) {
        return (long) Math.ceil(a);
    }

    public static double doubleSin(double a) {
        return Math.sin(a);
    }

    public static double doubleCos(double a) {
        return Math.cos(a);
    }

    public static double doubleTan(double a) {
        return Math.tan(a);
    }

    public static double doubleASin(double a) {
        return Math.asin(a);
    }

    public static double doubleACos(double a) {
        return Math.acos(a);
    }

    public static double doubleATan(double a) {
        return Math.atan(a);
    }

    public static double doubleATan2(double a, double b) {
        return Math.atan2(a, b);
    }

    public static double doubleLog(double a) {
        return Math.log(a);
    }

    public static double doubleExp(double a) {
        return Math.exp(a);
    }

    public static long doubleTruncate(double a) {
        return (long) a;
    }

    public static long doubleRound(double a) {
        return (long) Math.rint(a);
    }

    public static boolean doubleIsNaN(double a) {
        return Double.isNaN(a);
    }

    public static boolean doubleIsInfinite(double a) {
        return Double.isInfinite(a);
    }

    public static long doubleRawBits(double a) {
        return Double.doubleToRawLongBits(a);
    }

    public static double doubleNextUp(double a) {
        return com.sun.fortress.numerics.DirectedRounding.nextUp(a);
    }

    public static double doubleNextDown(double a) {
        return com.sun.fortress.numerics.DirectedRounding.nextDown(a);
    }

    public static float doubleToFloat(double a) {
        return (float) a;
    }

    public static boolean doubleNE(double a, double b) {
        return a != b;
    }

    public static double doubleMin(double a, double b) {
        return Math.min(a, b);
    }

    public static double doubleMax(double a, double b) {
        return Math.max(a, b);
    }

    public static double doubleAddUpNoNaN(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.addUpNoNaN(a, b);
    }

    public static double doubleSubUpNoNaN(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.subtractUpNoNaN(a, b);
    }

    public static double doubleMulUpNoNaN(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.multiplyUpNoNaN(a, b);
    }

    public static double doubleDivUpNoNaN(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.divideUpNoNaN(a, b);
    }

    public static double doubleSqrtUp(double a) {
        return com.sun.fortress.numerics.DirectedRounding.sqrtUp(a);
    }

    public static double doubleAddDownNoNaN(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.addDownNoNaN(a, b);
    }

    public static double doubleSubDownNoNaN(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.subtractDownNoNaN(a, b);
    }

    public static double doubleMulDownNoNaN(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.multiplyDownNoNaN(a, b);
    }

    public static double doubleDivDownNoNaN(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.divideDownNoNaN(a, b);
    }

    public static double doubleSqrtDown(double a) {
        return com.sun.fortress.numerics.DirectedRounding.sqrtDown(a);
    }

    public static double doubleAddUp(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.addUp(a, b);
    }

    public static double doubleSubUp(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.subtractUp(a, b);
    }

    public static double doubleMulUp(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.multiplyUp(a, b);
    }

    public static double doubleDivUp(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.divideUp(a, b);
    }

    public static double doubleAddDown(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.addDown(a, b);
    }

    public static double doubleSubDown(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.subtractDown(a, b);
    }

    public static double doubleMulDown(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.multiplyDown(a, b);
    }

    public static double doubleDivDown(double a, double b) {
        return com.sun.fortress.numerics.DirectedRounding.divideDown(a, b);
    }

    public static double doubleFromRawBits(long a) {
        return Double.longBitsToDouble(a);
    }

    /**
     * A numeral's value v / r^m, for v not negative, rounded once to the
     * nearest double, ties to even.
     */
    public static double numeralToDouble(java.math.BigInteger v, int r, int m) {
        if (v.signum() == 0) return 0.0;
        java.math.BigInteger den = java.math.BigInteger.valueOf(r).pow(m);
        int lsb = lsbExponent(v, den, 53, -1074);
        return Math.scalb(roundedQuotient(v, den, lsb).doubleValue(), lsb);
    }

    /**
     * A numeral's value v / r^m, for v not negative, rounded once to the
     * nearest float, ties to even.
     */
    public static float numeralToFloat(java.math.BigInteger v, int r, int m) {
        if (v.signum() == 0) return 0.0f;
        java.math.BigInteger den = java.math.BigInteger.valueOf(r).pow(m);
        int lsb = lsbExponent(v, den, 24, -149);
        return Math.scalb(roundedQuotient(v, den, lsb).floatValue(), lsb);
    }

    /**
     * The exponent of the last significand bit of num / den in a binary
     * format of p significand bits whose least subnormal is 2^least.
     */
    private static int lsbExponent(java.math.BigInteger num, java.math.BigInteger den, int p, int least) {
        int e = num.bitLength() - den.bitLength();
        boolean atLeast = e >= 0 ? num.compareTo(den.shiftLeft(e)) >= 0 : num.shiftLeft(-e).compareTo(den) >= 0;
        int top = atLeast ? e : e - 1;
        return Math.max(top - (p - 1), least);
    }

    /** num / den / 2^lsb rounded to the nearest integer, ties to even. */
    private static java.math.BigInteger roundedQuotient(java.math.BigInteger num, java.math.BigInteger den, int lsb) {
        java.math.BigInteger n = lsb <= 0 ? num.shiftLeft(-lsb) : num;
        java.math.BigInteger d = lsb <= 0 ? den : den.shiftLeft(lsb);
        java.math.BigInteger[] qr = n.divideAndRemainder(d);
        int c = qr[1].shiftLeft(1).compareTo(d);
        java.math.BigInteger q = qr[0];
        if (c > 0 || (c == 0 && q.testBit(0))) q = q.add(java.math.BigInteger.ONE);
        return q;
    }

}
