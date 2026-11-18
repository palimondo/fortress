package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;

/**
 * Each built-in number type is a value object whose class the code generator writes
 * over a payload class of this package, which holds the JVM value: FZZ32, FZZ64, FZZ,
 * FNN32, FNN64, FRR32 and FRR64.  A payload class reaches its object's class by the
 * name that this class gives, in the library that the compiled path reads
 * (WellKnownNames.compiledPathUsesOneLibrary): its make calls the object's class's
 * make, and its RTTIc gives the object's RTTI.
 */
public final class LibraryNames {
    private LibraryNames() {}

    /** Whether this JVM's compiled path reads the one library, the interpreter's. */
    static final boolean ONE_LIBRARY = com.sun.fortress.compiler.WellKnownNames.compiledPathUsesOneLibrary;

    /** The component of the compiler's prelude that declares the seven number objects. */
    private static final String PRELUDE_CLASS_PREFIX = "fortress.CompilerBuiltin$";

    /**
     * The JVM name of the class of the value object that is the number type t, in the
     * library that the compiled path reads; null where that library's number objects
     * are not written over their payload classes.  The one library's are not yet:
     * FortressLibrary's ZZ32, ZZ64, ZZ, NN64 and RR64, and FortressBuiltin's NN32 and RR32.
     */
    public static String numberObjectClass(String t) {
        return ONE_LIBRARY ? null : PRELUDE_CLASS_PREFIX + t;
    }

    /** The object's class of the number type t, loaded by payload's loader without its initialisation. */
    private static Class<?> objectClass(String t, Class<?> payload, boolean initialize) {
        String name = numberObjectClass(t);
        if (name == null)
            throw new Error("The number type " + t + " of the library that the compiled path reads is not compiled over " +
                            payload.getName());
        try {
            return Class.forName(name, initialize, payload.getClassLoader());
        } catch (ClassNotFoundException e) {
            throw new Error("No class " + name + " for the number type " + t, e);
        }
    }

    /** The static make(value) of the object's class of the number type t, which answers a payload. */
    static MethodHandle factory(String t, Class<?> payload, Class<?> value) {
        try {
            return MethodHandles.publicLookup().findStatic(objectClass(t, payload, false), "make",
                                                           MethodType.methodType(payload, value));
        } catch (ReflectiveOperationException e) {
            throw new Error("No factory make of the number type " + t, e);
        }
    }

    /** The RTTI of the object's class of the number type t. */
    static RTTI rtti(String t, Class<?> payload) {
        try {
            return (RTTI) objectClass(t, payload, true).getField("RTTI").get(null);
        } catch (ReflectiveOperationException e) {
            throw new Error("No RTTI of the number type " + t, e);
        }
    }
}
