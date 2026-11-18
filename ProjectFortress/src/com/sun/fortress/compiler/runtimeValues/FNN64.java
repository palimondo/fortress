/*******************************************************************************
    Copyright 2009,2011, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;

/**
 * The payload of the value object NN64, its JVM long.  The code generator writes the
 * object's class, which extends this one; this class extends nothing generated, and
 * LibraryNames gives the name of the object's class.  Compiled descriptors name the
 * type NN64 by this class.
 */
public abstract class FNN64 extends FValue {
    final long val;

    protected FNN64(long x) { val = x; }
    public String toString() { return Long.toUnsignedString(val);}
    public long getValue() {return val;}

    /** A NN64 of the value x: an instance of the object's class, made by its make. */
    public static FNN64 make(long x) {
        try {
            return (FNN64) Make.MAKE.invokeExact(x);
        } catch (RuntimeException | Error e) {
            throw e;
        } catch (Throwable t) {
            throw new Error(t);
        }
    }

    /** The object's class's make, found when the first value is made. */
    private static final class Make {
        static final MethodHandle MAKE = LibraryNames.factory("NN64", FNN64.class, long.class);
    }

    /**
     * The RTTI of NN64.  Compiled code names a static argument NN64 by this class, and the
     * run time reads its RTTI here: the RTTI of the object's class.
     */
    public static final class RTTIc {
        public static final RTTI ONLY = LibraryNames.rtti("NN64", FNN64.class);
    }
}
