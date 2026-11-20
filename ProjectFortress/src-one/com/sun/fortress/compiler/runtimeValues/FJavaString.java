package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;

/**
 * The second set's FJavaString, for the one library: the payload of the native object
 * FlatString, its Java String.  The code generator writes the object's class, which extends
 * this one; this class extends nothing generated, and LibraryNames gives the name of the
 * object's class, as for the number types (FZZ32).  Compiled descriptors name the type
 * FlatString by this class.
 */
public abstract class FJavaString extends FValue {
    final String val;

    protected FJavaString(String x) { val = x; }
    public String toString() { return val; }
    public String getValue() { return val; }

    /** A FlatString of the value x: an instance of the object's class, made by its make. */
    public static FJavaString make(String x) {
        try {
            return (FJavaString) Make.MAKE.invokeExact(x);
        } catch (RuntimeException | Error e) {
            throw e;
        } catch (Throwable t) {
            throw new Error(t);
        }
    }

    /** The object's class's make, found when the first value is made. */
    private static final class Make {
        static final MethodHandle MAKE = LibraryNames.factory("FlatString", FJavaString.class, String.class);
    }

    /**
     * The RTTI of FlatString.  Compiled code names a static argument FlatString by this class, and the
     * run time reads its RTTI here: the RTTI of the object's class.
     */
    public static final class RTTIc {
        public static final RTTI ONLY = LibraryNames.rtti("FlatString", FJavaString.class);
    }
}
