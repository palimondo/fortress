/*******************************************************************************
    Copyright 2009,2011, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;

/**
 * The payload of the value object NN32, its JVM int.  The code generator writes the
 * object's class, which extends this one; this class extends nothing generated, and
 * LibraryNames gives the name of the object's class.  Compiled descriptors name the
 * type NN32 by this class.
 */
public abstract class FNN32 extends FValue {
    final int val;

    protected FNN32(int x) { val = x; }
    public String toString() { return Integer.toUnsignedString(val);}
    public FJavaString asString() { return FJavaString.make(Integer.toUnsignedString(val));}
    public int getValue() {return val;}

    /** A NN32 of the value x: an instance of the object's class, made by its make. */
    public static FNN32 make(int x) {
        try {
            return (FNN32) Make.MAKE.invokeExact(x);
        } catch (RuntimeException | Error e) {
            throw e;
        } catch (Throwable t) {
            throw new Error(t);
        }
    }
    public static FNN32 plus(FNN32 a, FNN32 b) {return make(a.getValue() + b.getValue());}

    /** The object's class's make, found when the first value is made. */
    private static final class Make {
        static final MethodHandle MAKE = LibraryNames.factory("NN32", FNN32.class, int.class);
    }

    /**
     * The RTTI of NN32.  Compiled code names a static argument NN32 by this class, and the
     * run time reads its RTTI here: the RTTI of the object's class.
     */
    public static final class RTTIc {
        public static final RTTI ONLY = LibraryNames.rtti("NN32", FNN32.class);
    }
}
