/*******************************************************************************
    Copyright 2008,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.evaluator.types;

public class BottomType extends FType {

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.types.FType#subtypeOf(com.sun.fortress.interpreter.evaluator.types.FType)
     */
    @Override
    public boolean subtypeOf(FType other) {
        return true;
    }

    private BottomType(String s) {
        super(s);
    }

    static public final BottomType ONLY = new BottomType("BottomType");

    /**
     * The instance of a type parameter that is left open, one whose bound
     * mentions the parameter itself and that nothing at a call fixes: below
     * every type, as ONLY is, and matched by every value where a value is
     * checked against a type.
     */
    static public final BottomType OPEN = new BottomType("OpenType") {
        @Override
        public boolean typeMatch(com.sun.fortress.interpreter.evaluator.values.FValue val) {
            return val != null;
        }

        @Override
        public String toString() {
            return "OPEN";
        }
    };

    public String toString() {
        return "BOTTOM";
    }
}
