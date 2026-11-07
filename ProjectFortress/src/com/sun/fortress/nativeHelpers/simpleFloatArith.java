package com.sun.fortress.nativeHelpers;

import com.sun.fortress.numerics.DirectedRounding;

/**
 * Static helpers over a Java float, which carries RR32, for the library's
 * builtinPrimitive bindings of RR32.
 */
public class simpleFloatArith {

    public static String floatToString(float a) {
        return java.lang.Float.toString(a);
    }

    public static boolean floatIsNaN(float a) {
        return java.lang.Float.isNaN(a);
    }

    public static boolean floatIsInfinite(float a) {
        return java.lang.Float.isInfinite(a);
    }

    public static int floatRawBits(float a) {
        return java.lang.Float.floatToRawIntBits(a);
    }

    public static float floatNextUp(float a) {
        return DirectedRounding.nextUp(a);
    }

    public static float floatNextDown(float a) {
        return DirectedRounding.nextDown(a);
    }

    public static float floatAbs(float a) {
        return Math.abs(a);
    }

    public static boolean floatEQ(float a, float b) {
        return a == b;
    }

    public static boolean floatNE(float a, float b) {
        return a != b;
    }

    public static boolean floatLT(float a, float b) {
        return a < b;
    }

    public static boolean floatLE(float a, float b) {
        return a <= b;
    }

    public static boolean floatGT(float a, float b) {
        return a > b;
    }

    public static boolean floatGE(float a, float b) {
        return a >= b;
    }

    public static float floatMin(float a, float b) {
        return Math.min(a, b);
    }

    public static float floatMax(float a, float b) {
        return Math.max(a, b);
    }

    public static float floatNeg(float a) {
        return -a;
    }

    public static float floatAdd(float a, float b) {
        return a + b;
    }

    public static float floatSub(float a, float b) {
        return a - b;
    }

    public static float floatMul(float a, float b) {
        return a * b;
    }

    public static float floatDiv(float a, float b) {
        return a / b;
    }

    public static float floatSQRT(float a) {
        return (float) Math.sqrt(a);
    }

    public static float floatAddUpNoNaN(float a, float b) {
        return DirectedRounding.addUpNoNaN(a, b);
    }

    public static float floatSubUpNoNaN(float a, float b) {
        return DirectedRounding.subtractUpNoNaN(a, b);
    }

    public static float floatMulUpNoNaN(float a, float b) {
        return DirectedRounding.multiplyUpNoNaN(a, b);
    }

    public static float floatDivUpNoNaN(float a, float b) {
        return DirectedRounding.divideUpNoNaN(a, b);
    }

    public static float floatSQRTUp(float a) {
        return DirectedRounding.sqrtUp(a);
    }

    public static float floatAddDownNoNaN(float a, float b) {
        return DirectedRounding.addDownNoNaN(a, b);
    }

    public static float floatSubDownNoNaN(float a, float b) {
        return DirectedRounding.subtractDownNoNaN(a, b);
    }

    public static float floatMulDownNoNaN(float a, float b) {
        return DirectedRounding.multiplyDownNoNaN(a, b);
    }

    public static float floatDivDownNoNaN(float a, float b) {
        return DirectedRounding.divideDownNoNaN(a, b);
    }

    public static float floatSQRTDown(float a) {
        return DirectedRounding.sqrtDown(a);
    }

    public static float floatAddUp(float a, float b) {
        return DirectedRounding.addUp(a, b);
    }

    public static float floatSubUp(float a, float b) {
        return DirectedRounding.subtractUp(a, b);
    }

    public static float floatMulUp(float a, float b) {
        return DirectedRounding.multiplyUp(a, b);
    }

    public static float floatDivUp(float a, float b) {
        return DirectedRounding.divideUp(a, b);
    }

    public static float floatAddDown(float a, float b) {
        return DirectedRounding.addDown(a, b);
    }

    public static float floatSubDown(float a, float b) {
        return DirectedRounding.subtractDown(a, b);
    }

    public static float floatMulDown(float a, float b) {
        return DirectedRounding.multiplyDown(a, b);
    }

    public static float floatDivDown(float a, float b) {
        return DirectedRounding.divideDown(a, b);
    }

    public static float floatPow(float a, float b) {
        return (float) Math.pow(a, b);
    }

    public static double floatPowDouble(float a, double b) {
        return Math.pow(a, b);
    }

    public static float floatFloor(float a) {
        return (float) Math.floor(a);
    }

    public static float floatCeiling(float a) {
        return (float) Math.ceil(a);
    }

    public static long floatIFloor(float a) {
        return (long) Math.floor(a);
    }

    public static long floatICeiling(float a) {
        return (long) Math.ceil(a);
    }

    public static long floatTruncate(float a) {
        return (long) a;
    }

    public static long floatRound(float a) {
        return (long) Math.rint((double) a);
    }
}
