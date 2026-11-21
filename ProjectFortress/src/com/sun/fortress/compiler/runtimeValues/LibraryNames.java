package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;

/**
 * The names of the compiled library's classes that the run time reaches by name, for the
 * library that the compiled path reads (WellKnownNames.compiledPathUsesOneLibrary).  This is
 * the first set's copy, for the compiler's prelude; the second set, in ProjectFortress/src-one,
 * which the class path puts first where the one library is selected, has the one library's.
 *
 * Each built-in number type is a value object whose class the code generator writes over a
 * payload class of this package, which holds the JVM value: FZZ32, FZZ64, FZZ, FNN32, FNN64,
 * FRR32 and FRR64.  A payload class reaches its object's class by the name that this class
 * gives: its make calls the object's class's make, and its RTTIc gives the object's RTTI.
 */
public final class LibraryNames {
    private LibraryNames() {}

    /** Whether this JVM's compiled path reads the one library, the interpreter's. */
    static final boolean ONE_LIBRARY = com.sun.fortress.compiler.WellKnownNames.compiledPathUsesOneLibrary;

    /** The component of the compiler's prelude that declares the seven number objects. */
    private static final String PRELUDE_CLASS_PREFIX = "fortress.CompilerBuiltin$";

    /**
     * The JVM name of the class of the value object that is the number type t, in the
     * compiler's prelude; null where the one library is selected, whose objects the second
     * set's copy of this class names.
     */
    public static String numberObjectClass(String t) {
        return ONE_LIBRARY ? null : PRELUDE_CLASS_PREFIX + t;
    }

    /**
     * The JVM name of the class of the exception object that a helper raises by its simple
     * name, as Utility.makeFortressException("IntegerOverflow"): in the compiler's prelude,
     * CompilerLibrary declares FailCalled, CompilerBuiltin the others.
     */
    public static String exceptionClass(String name) {
        return (name.equals("FailCalled") ? "fortress.CompilerLibrary$" : PRELUDE_CLASS_PREFIX) + name;
    }

    /** The JVM name of the library's trait String, the parameter type of an exception's constructor. */
    public static String stringClass() {
        return PRELUDE_CLASS_PREFIX + "String";
    }

    /** The static make(value) of the object's class of the number type t, which answers a payload. */
    static MethodHandle factory(String t, Class<?> payload, Class<?> value) {
        return LibraryObjects.factory(numberObjectClass(t), t, payload, value);
    }

    /** The RTTI of the object's class of the number type t. */
    static RTTI rtti(String t, Class<?> payload) {
        return LibraryObjects.rtti(numberObjectClass(t), t, payload);
    }
}
