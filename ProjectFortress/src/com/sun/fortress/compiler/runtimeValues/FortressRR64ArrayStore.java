package com.sun.fortress.compiler.runtimeValues;

/**
 * The compiled store of an immutable array of RR64 values, which FortressLibrary's trait
 * JavaRR64ArrayStore names through the helpers of nativeHelpers.arrayOps: a double[], as walk's
 * PrimImmutableRR64Array holds one.  It takes no part in a transaction, and an initialisation writes the
 * element and answers true, as walk's does.
 */
public final class FortressRR64ArrayStore {
    private final double[] elements;

    public FortressRR64ArrayStore(int size) {
        elements = new double[size];
    }

    public int size() {
        return elements.length;
    }

    public double get(int i) {
        return elements[i];
    }

    public boolean init(int i, double v) {
        elements[i] = v;
        return true;
    }

    public String toString() {
        return "[RR64 array store of " + elements.length + "]";
    }
}
