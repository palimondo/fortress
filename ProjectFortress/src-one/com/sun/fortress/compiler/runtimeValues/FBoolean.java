package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;

/**
 * The second set's FBoolean, for the one library: the payload of the value object Boolean,
 * its JVM boolean.  The code generator writes the object's class, which extends this one;
 * this class extends nothing generated, and LibraryNames gives the name of the object's
 * class, as for the number types (FZZ32).  Compiled descriptors name the type Boolean by
 * this class.
 */
public abstract class FBoolean extends FValue {
    final boolean val;

    protected FBoolean(boolean x) { val = x; }
    public String toString() { return String.valueOf(val); }
    public boolean getValue() { return val; }

    /** A Boolean of the value x: an instance of the object's class, made by its make. */
    public static FBoolean make(boolean x) {
        try {
            return (FBoolean) Make.MAKE.invokeExact(x);
        } catch (RuntimeException | Error e) {
            throw e;
        } catch (Throwable t) {
            throw new Error(t);
        }
    }

    /** The object's class's make, found when the first value is made. */
    private static final class Make {
        static final MethodHandle MAKE = LibraryNames.factory("Boolean", FBoolean.class, boolean.class);
    }

    /**
     * The RTTI of Boolean.  Compiled code names a static argument Boolean by this class, and the
     * run time reads its RTTI here: the RTTI of the object's class.
     */
    public static final class RTTIc {
        public static final RTTI ONLY = LibraryNames.rtti("Boolean", FBoolean.class);
    }
}
