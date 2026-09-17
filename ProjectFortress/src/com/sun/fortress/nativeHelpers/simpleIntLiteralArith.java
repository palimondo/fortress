/*******************************************************************************
 Copyright 2011, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.nativeHelpers;

import com.sun.fortress.compiler.runtimeValues.FIntLiteral;
import java.math.BigInteger;

// The parameters and the results are declared over the generated interface
// fortress.CompilerBuiltin.IntLiteral and not over the implementation class
// FIntLiteral, because the call site the code generator emits uses the
// interface descriptor: IntLiteral is not one of the types in NamingCzar's
// specialFortressDescriptors table.  A helper declared over FIntLiteral
// compiles clean and then fails to link at run time.

public class simpleIntLiteralArith {

    private static BigInteger toBigInteger(fortress.CompilerBuiltin.IntLiteral a) {
        return new BigInteger(a.toString());
    }

    private static fortress.CompilerBuiltin.IntLiteral fromBigInteger(BigInteger r) {
        if (r.bitLength() < 64) return FIntLiteral.make(r.longValue());
        else return FIntLiteral.make(r.toString());
    }

    public static fortress.CompilerBuiltin.IntLiteral add(fortress.CompilerBuiltin.IntLiteral a,
                                                          fortress.CompilerBuiltin.IntLiteral b) {
        return fromBigInteger(toBigInteger(a).add(toBigInteger(b)));
    }

    public static fortress.CompilerBuiltin.IntLiteral sub(fortress.CompilerBuiltin.IntLiteral a,
                                                          fortress.CompilerBuiltin.IntLiteral b) {
        return fromBigInteger(toBigInteger(a).subtract(toBigInteger(b)));
    }

    public static fortress.CompilerBuiltin.IntLiteral mul(fortress.CompilerBuiltin.IntLiteral a,
                                                          fortress.CompilerBuiltin.IntLiteral b) {
        return fromBigInteger(toBigInteger(a).multiply(toBigInteger(b)));
    }

    public static fortress.CompilerBuiltin.IntLiteral neg(fortress.CompilerBuiltin.IntLiteral a) {
        return fromBigInteger(toBigInteger(a).negate());
    }

}
