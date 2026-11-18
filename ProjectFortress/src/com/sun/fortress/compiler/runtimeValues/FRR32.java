/*******************************************************************************
    Copyright 2009,2011, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;

/**
 * The payload of the value object RR32, its JVM float.  The code generator writes the
 * object's class, which extends this one; this class extends nothing generated, and
 * LibraryNames gives the name of the object's class.  Compiled descriptors name the
 * type RR32 by this class.
 */
public abstract class FRR32 extends FValue {
    final float val;

    protected FRR32(float x) { val = x; }
    public String toString() { return "" + val;}
    public float getValue() {return val;}

    /** A RR32 of the value x: an instance of the object's class, made by its make. */
    public static FRR32 make(float x) {
        try {
            return (FRR32) Make.MAKE.invokeExact(x);
        } catch (RuntimeException | Error e) {
            throw e;
        } catch (Throwable t) {
            throw new Error(t);
        }
    }

    /** The object's class's make, found when the first value is made. */
    private static final class Make {
        static final MethodHandle MAKE = LibraryNames.factory("RR32", FRR32.class, float.class);
    }

    /**
     * The RTTI of RR32.  Compiled code names a static argument RR32 by this class, and the
     * run time reads its RTTI here: the RTTI of the object's class.
     */
    public static final class RTTIc {
        public static final RTTI ONLY = LibraryNames.rtti("RR32", FRR32.class);
    }
}
