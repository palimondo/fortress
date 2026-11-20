package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandle;

/**
 * The second set's FCharacter, for the one library: the payload of the value object Char,
 * a Unicode code point in a JVM int, since a Fortress character has 21 bits.  The code
 * generator writes the object's class, which extends this one; this class extends nothing
 * generated, and LibraryNames gives the name of the object's class, as for the number types
 * (FZZ32).  Compiled descriptors name the type Char by this class.
 */
public abstract class FCharacter extends FValue {
    final int val;

    protected FCharacter(int x) { val = x; }
    public String toString() {
        if (0 <= val && val <= 0xFFFF) return String.valueOf((char) val);
        return new String(new int[] { val }, 0, 1);
    }
    public int getValue() { return val; }

    /** A Char of the value x: an instance of the object's class, made by its make. */
    public static FCharacter make(int x) {
        try {
            return (FCharacter) Make.MAKE.invokeExact(x);
        } catch (RuntimeException | Error e) {
            throw e;
        } catch (Throwable t) {
            throw new Error(t);
        }
    }

    /** The object's class's make, found when the first value is made. */
    private static final class Make {
        static final MethodHandle MAKE = LibraryNames.factory("Char", FCharacter.class, int.class);
    }

    /**
     * The RTTI of Char.  Compiled code names a static argument Char by this class, and the
     * run time reads its RTTI here: the RTTI of the object's class.
     */
    public static final class RTTIc {
        public static final RTTI ONLY = LibraryNames.rtti("Char", FCharacter.class);
    }
}
