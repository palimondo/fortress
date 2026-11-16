package com.sun.fortress.interpreter.evaluator.types;

/**
 * The type of a function with static parameters as a value, before a place
 * of arrow type has received it: below Any, and below each arrow type that
 * the function can be received at (Source.receivedAt).  It is below no
 * other type, and unifies with no declared type but a type parameter.
 */
public class FTypeGenericArrow extends FType {

    /** The function value that this is the type of. */
    public interface Source {
        /** Whether a place of the arrow type a can receive the function. */
        boolean receivedAt(FTypeArrow a);
    }

    private final Source source;

    public FTypeGenericArrow(String name, Source source) {
        super(name);
        this.source = source;
    }

    @Override
    public boolean subtypeOf(FType other) {
        if (commonSubtypeOf(other)) return true;
        return other instanceof FTypeArrow && source.receivedAt((FTypeArrow) other);
    }

    @Override
    public boolean excludesOther(FType other) {
        if (other == this || other instanceof FTypeArrow || other instanceof FTypeGenericArrow ||
            other instanceof FTypeOverloadedArrow || other instanceof FTypeTop || other instanceof BottomType) {
            return false;
        }
        return true;
    }
}
