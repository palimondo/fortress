package com.sun.fortress.compiler.runtimeValues;

/**
 * The second set's FJavaArrayStore, for the one library: the compiled value of the one library's
 * trait JavaArrayStore, a FortressArrayStore in a field, as FJavaBufferedReader holds its reader.
 */
public class FJavaArrayStore extends fortress.FortressLibrary.JavaArrayStore.DefaultTraitMethods implements fortress.FortressLibrary.JavaArrayStore {
    final FortressArrayStore val;

    FJavaArrayStore(FortressArrayStore x) { val = x; }

    public String toString() {
        return "[JavaArrayStore " + val + "]";
    }

    public FortressArrayStore getValue() { return val; }
    public static FJavaArrayStore make(FortressArrayStore x) { return new FJavaArrayStore(x); }

    @Override
    public RTTI getRTTI() { return RTTIc.ONLY; }

    public static class RTTIc extends RTTI {
        private RTTIc() { super(FJavaArrayStore.class); }
        public static final RTTI ONLY = new RTTIc();
    }
}
