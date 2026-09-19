/*******************************************************************************
    Copyright 2013 Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.runtimeValues;

// This is just a level of indirection to allow us to pass mutable FValues to tasks.

public class MutableFValue {

    volatile fortress.AnyType.Any value;

    public static MutableFValue make(fortress.AnyType.Any v) {
        MutableFValue result = new MutableFValue();
        result.value = v;
        return result;
    }

    public fortress.AnyType.Any getValue() {
        return value;
    }

    public void setValue(fortress.AnyType.Any v) {
        value = v;
    }
    
    public fortress.CompilerBuiltin.String asString() {
        return FJavaString.make("Bogus value from MutableFValue.asString()"); /* replaced in generated code; necessary for primitive hierarchy */
    }
    
    public String toString() {
        return "Mutable Value: " + String.valueOf(value);
    }

}
