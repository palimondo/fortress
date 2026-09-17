/*******************************************************************************
    Copyright 2011, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.runtimeValues;

import com.sun.fortress.compiler.runtimeValues.FIntLiteral.RTTIc;

public final class FFloatLiteral extends fortress.CompilerBuiltin.FloatLiteral.DefaultTraitMethods
        implements fortress.CompilerBuiltin.FloatLiteral {

    /* The literal as written, when this value came from source text; null when
       it was built from a double.  dval is the same number as a primitive and
       is what asRR64 hands out, so the decimal round trip happens at most once
       per literal instead of once per use. */
    private final String val;
    private final double dval;

    private FFloatLiteral(String val) {
        this.val = val;
        this.dval = Double.valueOf(val);
    }

    private FFloatLiteral(double val) {
        this.val = null;
        this.dval = val;
    }

    public static FFloatLiteral make(float x) {
        return new FFloatLiteral((double)x);
    }

    public static FFloatLiteral make(double x) {
        return new FFloatLiteral(x);
    }

    public static FFloatLiteral make(String s) {
        return new FFloatLiteral(s);
    }

    public String toString() {
        return val != null ? val : Double.toString(dval);
    }

    public FJavaString asString() {
        return null; /* replaced in generated code; necessary for primitive hierarchy */
    }

    public Error outOfRange(String t) {
        return new Error("Not in range for "+t+": "+this);
    }

    public FRR64 asRR64() {
        return FRR64.make(dval);
    }


    public FRR32 asRR32() {
        /* The written text, where there is one, rounds to the nearest float in
           one step; the double-built path narrows the double it already holds. */
        return val != null ? FRR32.make(Float.valueOf(val)) : FRR32.make((float) dval);
    }
    
    @Override
    public RTTI getRTTI() { return RTTIc.ONLY; }
    
    public static class RTTIc extends RTTI {
        private RTTIc() { super(FFloatLiteral.class); };
        public static final RTTI ONLY = new RTTIc();
    }
    
}
