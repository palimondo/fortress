package com.sun.fortress.compiler.runtimeValues;

/**
 * The second set's FJavaRR64ArrayStore, for the one library: the compiled value of the one library's
 * trait JavaRR64ArrayStore, a FortressRR64ArrayStore in a field, as FJavaBufferedReader holds its reader.
 */
public class FJavaRR64ArrayStore extends fortress.FortressLibrary.JavaRR64ArrayStore.DefaultTraitMethods implements fortress.FortressLibrary.JavaRR64ArrayStore {
    final FortressRR64ArrayStore val;

    FJavaRR64ArrayStore(FortressRR64ArrayStore x) { val = x; }

    public String toString() {
        return "[JavaRR64ArrayStore " + val + "]";
    }

    public FortressRR64ArrayStore getValue() { return val; }
    public static FJavaRR64ArrayStore make(FortressRR64ArrayStore x) { return new FJavaRR64ArrayStore(x); }

    @Override
    public RTTI getRTTI() { return RTTIc.ONLY; }

    public static class RTTIc extends RTTI {
        private RTTIc() { super(FJavaRR64ArrayStore.class); }
        public static final RTTI ONLY = new RTTIc();
    }
}
