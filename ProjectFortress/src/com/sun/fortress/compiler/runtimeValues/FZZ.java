/*******************************************************************************
    Copyright 2009,2011, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;
import java.math.BigInteger;

/**
 * The payload of the value object ZZ, a java.math.BigInteger made from its digits.  The
 * code generator writes the object's class, which extends this one; this class extends
 * nothing generated, and LibraryNames gives the name of the object's class.  Compiled
 * descriptors name the type ZZ by this class.
 */
public abstract class FZZ extends FValue {
    final BigInteger val;

    protected FZZ(String x) { val = new BigInteger(x); }
    public String toString() { return val.toString();}
    public BigInteger getValue() {return val;}

    /** A ZZ of the value x: an instance of the object's class, made by its make. */
    public static FZZ make(String x) {
        try {
            return (FZZ) Make.MAKE.invokeExact(x);
        } catch (RuntimeException | Error e) {
            throw e;
        } catch (Throwable t) {
            throw new Error(t);
        }
    }
    public static FZZ make(BigInteger x) {return make(x.toString());}

    /** The object's class's make, found when the first value is made. */
    private static final class Make {
        static final MethodHandle MAKE = LibraryNames.factory("ZZ", FZZ.class, String.class);
    }

    /**
     * The RTTI of ZZ.  Compiled code names a static argument ZZ by this class, and the
     * run time reads its RTTI here: the RTTI of the object's class.
     */
    public static final class RTTIc {
        public static final RTTI ONLY = LibraryNames.rtti("ZZ", FZZ.class);
    }
}
