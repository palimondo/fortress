package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;
import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;

/**
 * How a payload class reaches the class of its object, which the code generator writes: by
 * the name that LibraryNames gives, in the set of run-time classes on the class path.  Both
 * sets use this class; each set has its own LibraryNames.
 */
final class LibraryObjects {
    private LibraryObjects() {}

    /** The class name of the object t, loaded by payload's loader without its initialisation. */
    private static Class<?> objectClass(String name, String t, Class<?> payload, boolean initialize) {
        if (name == null)
            throw new Error("The type " + t + " of the library that the compiled path reads is not compiled over " +
                            payload.getName() + " of the run-time classes on the class path");
        try {
            return Class.forName(name, initialize, payload.getClassLoader());
        } catch (ClassNotFoundException e) {
            throw new Error("No class " + name + " for the type " + t, e);
        }
    }

    /** The static make(value) of the class name of the object t, which answers a payload. */
    static MethodHandle factory(String name, String t, Class<?> payload, Class<?> value) {
        try {
            return MethodHandles.publicLookup().findStatic(objectClass(name, t, payload, false), "make",
                                                           MethodType.methodType(payload, value));
        } catch (ReflectiveOperationException e) {
            throw new Error("No factory make of the type " + t, e);
        }
    }

    /** The RTTI of the class name of the object t. */
    static RTTI rtti(String name, String t, Class<?> payload) {
        try {
            return (RTTI) objectClass(name, t, payload, true).getField("RTTI").get(null);
        } catch (ReflectiveOperationException e) {
            throw new Error("No RTTI of the type " + t, e);
        }
    }
}
