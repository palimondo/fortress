/*******************************************************************************
    Copyright 2009,2011 Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.runtimeValues;

/**
 * The second set's FValue, for the one library: the first set's, with asString typed at
 * FValue, so that the run time names no class of the compiler's prelude.  The first set's
 * answers the prelude's String, which compiled generic code reaches through the payload
 * classes' bridges.
 */
public abstract class FValue implements fortress.AnyType.Any {
    
    @Override
    public RTTI getRTTI() {
        return null;
    }
    
    public FValue asString() {
        return FJavaString.make("Bogus value from FValue.asString()"); /* replaced in generated code; necessary for primitive hierarchy */
    }
    
    public String toString() {
        return this.asString().toString();
    }

}
