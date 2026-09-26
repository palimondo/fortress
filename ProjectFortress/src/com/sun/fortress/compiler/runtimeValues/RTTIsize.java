package com.sun.fortress.compiler.runtimeValues;

import java.util.concurrent.ConcurrentHashMap;

/**
 * The run-time descriptor of a nat or int static argument.  One exists per
 * number, made by {@link #of} from the number's text; the name begins with
 * "RTTI" so that the instantiating class loader leaves it to the system loader.
 */
public final class RTTIsize extends RTTI {

    private static final ConcurrentHashMap<String, RTTIsize> made =
        new ConcurrentHashMap<String, RTTIsize>();

    private final String size;

    private RTTIsize(String size) {
        // A size has no Java class; Object is a placeholder that the
        // overrides below never consult.
        super(java.lang.Object.class);
        this.size = size;
    }

    public static RTTI of(String size) {
        RTTIsize d = made.get(size);
        if (d == null) {
            RTTIsize fresh = new RTTIsize(size);
            d = made.putIfAbsent(size, fresh);
            if (d == null)
                d = fresh;
        }
        return d;
    }

    public boolean runtimeSupertypeOf(RTTI other) {
        return (other instanceof RTTIsize) && ((RTTIsize) other).size.equals(size);
    }

    public int hashCode() {
        return size.hashCode();
    }

    public String className() {
        return size;
    }

    public String toString() {
        return getSN() + ":" + size;
    }
}
