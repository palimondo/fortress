/*******************************************************************************
    Copyright 2009,2011, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.runtimeValues;

import com.sun.fortress.compiler.runtimeValues.FortressBufferedReader;

/**
 * The second set's FJavaBufferedReader, for the one library: the compiled value of the one
 * library's trait JavaBufferedReader, a FortressBufferedReader in a field.  It extends the trait's
 * generated class, as the first set's extends the compiler prelude's.
 */
public class FJavaBufferedReader extends fortress.FortressLibrary.JavaBufferedReader.DefaultTraitMethods implements fortress.FortressLibrary.JavaBufferedReader {
    final FortressBufferedReader val;

    FJavaBufferedReader(FortressBufferedReader x) { val = x; }

    public String toString() {
	return "[buffered reader " + val + "]";
    }

    public FortressBufferedReader getValue() {return val;}
    public static FJavaBufferedReader make(FortressBufferedReader x) {return new FJavaBufferedReader(x);}

    @Override
    public RTTI getRTTI() { return RTTIjbr.ONLY; }
    
    public static class RTTIjbr extends RTTI {
        private RTTIjbr() { super(FJavaBufferedReader.class); };
        public static final RTTI ONLY = new RTTIjbr();
    }

}
