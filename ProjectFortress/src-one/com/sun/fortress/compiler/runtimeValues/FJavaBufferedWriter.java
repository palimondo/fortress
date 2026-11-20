package com.sun.fortress.compiler.runtimeValues;

import com.sun.fortress.compiler.runtimeValues.FortressBufferedWriter;

/**
 * The second set's FJavaBufferedWriter, for the one library: the compiled value of the one
 * library's trait JavaBufferedWriter, a FortressBufferedWriter in a field.  It extends the trait's
 * generated class, as the first set's extends the compiler prelude's.
 */
public class FJavaBufferedWriter extends fortress.FortressLibrary.JavaBufferedWriter.DefaultTraitMethods implements fortress.FortressLibrary.JavaBufferedWriter {
    final FortressBufferedWriter val;

    FJavaBufferedWriter(FortressBufferedWriter x) { val = x; }

    public String toString() {
	return "[buffered reader " + val + "]";
    }

    public FortressBufferedWriter getValue() {return val;}
    public static FJavaBufferedWriter make(FortressBufferedWriter x) {return new FJavaBufferedWriter(x);}

    @Override
    public RTTI getRTTI() { return RTTIjbw.ONLY; }
    
    public static class RTTIjbw extends RTTI {
        private RTTIjbw() { super(FJavaBufferedWriter.class); };
        public static final RTTI ONLY = new RTTIjbw();
    }

}
