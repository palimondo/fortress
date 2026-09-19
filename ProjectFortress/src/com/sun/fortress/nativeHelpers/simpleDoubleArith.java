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

}
