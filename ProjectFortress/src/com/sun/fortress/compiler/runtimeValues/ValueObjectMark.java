package com.sun.fortress.compiler.runtimeValues;

/**
 * The code generator adds this interface to the class of every object
 * declared with the value modifier, so that the run time can tell a value
 * object from a reference object (equality.sEquiv).
 */
public interface ValueObjectMark {
}
