/*******************************************************************************
    Copyright 2009,2011, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;

/**
 * The payload of the value object RR64, its JVM double.  The code generator writes the
 * object's class, which extends this one; this class extends nothing generated, and
 * LibraryNames gives the name of the object's class.  Compiled descriptors name the
 * type RR64 by this class.
 */
public abstract class FRR64 extends FValue {
    final double val;

    protected FRR64(double x) { val = x; }
    public String toString() { return String.valueOf(val); }
    public FJavaString asString() { return FJavaString.make(String.valueOf(val)); }
    public double getValue() {return val;}

    /** A RR64 of the value x: an instance of the object's class, made by its make. */
    public static FRR64 make(double x) {
        try {
            return (FRR64) Make.MAKE.invokeExact(x);
        } catch (RuntimeException | Error e) {
            throw e;
        } catch (Throwable t) {
            throw new Error(t);
        }
    }

    /** The object's class's make, found when the first value is made. */
    private static final class Make {
        static final MethodHandle MAKE = LibraryNames.factory("RR64", FRR64.class, double.class);
    }

    /**
     * The RTTI of RR64.  Compiled code names a static argument RR64 by this class, and the
     * run time reads its RTTI here: the RTTI of the object's class.
     */
    public static final class RTTIc {
        public static final RTTI ONLY = LibraryNames.rtti("RR64", FRR64.class);
    }
}
