/*******************************************************************************
    Copyright 2009,2011, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;

/**
 * The payload of the value object ZZ32, its JVM int.  The code generator writes the
 * object's class, which extends this one; this class extends nothing generated, and
 * LibraryNames gives the name of the object's class.  Compiled descriptors name the
 * type ZZ32 by this class.
 */
public abstract class FZZ32 extends FValue {
    final int val;

    protected FZZ32(int x) { val = x; }
    public String toString() { return String.valueOf(val);}
    public FJavaString asString() { return FJavaString.make(String.valueOf(val));}
    public int getValue() {return val;}
    /**
     * A size read as a value, which the class loader stamps as its text where
     * it lies beyond ZZ32: a ZZ32, or the error of a size out of its range.
     */
    public static FZZ32 makeSize(String s) {
        java.math.BigInteger b = new java.math.BigInteger(s);
        if (b.bitLength() > 31) throw new Error("Not in range for ZZ32: " + s);
        return make(b.intValue());
    }

    /** A ZZ32 of the value x: an instance of the object's class, made by its make. */
    public static FZZ32 make(int x) {
        try {
            return (FZZ32) Make.MAKE.invokeExact(x);
        } catch (RuntimeException | Error e) {
            throw e;
        } catch (Throwable t) {
            throw new Error(t);
        }
    }
    public static FZZ32 plus(FZZ32 a, FZZ32 b) {return make(a.getValue() + b.getValue());}

    /** The object's class's make, found when the first value is made. */
    private static final class Make {
        static final MethodHandle MAKE = LibraryNames.factory("ZZ32", FZZ32.class, int.class);
    }

    /**
     * The RTTI of ZZ32.  Compiled code names a static argument ZZ32 by this class, and the
     * run time reads its RTTI here: the RTTI of the object's class.
     */
    public static final class RTTIc {
        public static final RTTI ONLY = LibraryNames.rtti("ZZ32", FZZ32.class);
    }
}
