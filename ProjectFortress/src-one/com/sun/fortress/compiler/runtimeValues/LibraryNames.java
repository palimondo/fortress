package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;

/**
 * The names of the compiled library's classes that the run time reaches by name.  This is
 * the second set's copy, for the one library, the interpreter's; ProjectFortress/src holds
 * the first set's, for the compiler's prelude.  The class path puts this set first where
 * FORTRESS_LIBRARY=one selects the one library (bin/fortress_classpath).
 *
 * The one library's built-in number types, its Boolean and Char, and its FlatString are
 * objects whose classes the code generator writes over the payload classes of this package:
 * a payload class reaches its object's class by the name that this class gives.
 */
public final class LibraryNames {
    private LibraryNames() {}

    /** Whether this JVM's compiled path reads the one library, the interpreter's. */
    static final boolean ONE_LIBRARY = com.sun.fortress.compiler.WellKnownNames.compiledPathUsesOneLibrary;

    /** The component of the one library that declares most of its built-in types and exceptions. */
    private static final String LIBRARY_CLASS_PREFIX = "fortress.FortressLibrary$";

    /**
     * The JVM name of the class of the object that is the type t, in the one library:
     * FortressBuiltin's NN32, RR32, Boolean and Char, FlatString's FlatString, and
     * FortressLibrary's ZZ32, ZZ64, ZZ, NN64 and RR64; null where the one library is not
     * selected, which the first set's copy of this class serves.
     */
    public static String numberObjectClass(String t) {
        if (!ONE_LIBRARY) return null;
        switch (t) {
            case "NN32": case "RR32": case "Boolean": case "Char": return "fortress.FortressBuiltin$" + t;
            case "FlatString": return "FlatString$FlatString";
            default: return LIBRARY_CLASS_PREFIX + t;
        }
    }

    /**
     * The JVM name of the class of the exception object that a helper raises by its simple
     * name, as Utility.makeFortressException("IntegerOverflow"): FortressLibrary declares each.
     */
    public static String exceptionClass(String name) {
        return LIBRARY_CLASS_PREFIX + name;
    }

    /** The JVM name of the library's trait String, the parameter type of an exception's constructor. */
    public static String stringClass() {
        return LIBRARY_CLASS_PREFIX + "String";
    }

    /** The static make(value) of the object's class of the type t, which answers a payload. */
    static MethodHandle factory(String t, Class<?> payload, Class<?> value) {
        return LibraryObjects.factory(numberObjectClass(t), t, payload, value);
    }

    /** The RTTI of the object's class of the type t. */
    static RTTI rtti(String t, Class<?> payload) {
        return LibraryObjects.rtti(numberObjectClass(t), t, payload);
    }
}
