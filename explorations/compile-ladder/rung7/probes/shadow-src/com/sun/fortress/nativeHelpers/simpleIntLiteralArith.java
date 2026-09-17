package com.sun.fortress.nativeHelpers;

import com.sun.fortress.compiler.runtimeValues.FIntLiteral;
import java.math.BigInteger;

public class simpleIntLiteralArith {

    private static BigInteger bi(fortress.CompilerBuiltin.IntLiteral a) {
        return new BigInteger(a.toString());
    }

    private static fortress.CompilerBuiltin.IntLiteral lit(BigInteger r) {
        if (r.bitLength() < 64) return FIntLiteral.make(r.longValue());
        return FIntLiteral.make(r.toString());
    }

    public static fortress.CompilerBuiltin.IntLiteral add(fortress.CompilerBuiltin.IntLiteral a, fortress.CompilerBuiltin.IntLiteral b) { return lit(bi(a).add(bi(b))); }
    public static fortress.CompilerBuiltin.IntLiteral sub(fortress.CompilerBuiltin.IntLiteral a, fortress.CompilerBuiltin.IntLiteral b) { return lit(bi(a).subtract(bi(b))); }
    public static fortress.CompilerBuiltin.IntLiteral mul(fortress.CompilerBuiltin.IntLiteral a, fortress.CompilerBuiltin.IntLiteral b) { return lit(bi(a).multiply(bi(b))); }
    public static fortress.CompilerBuiltin.IntLiteral neg(fortress.CompilerBuiltin.IntLiteral a) { return lit(bi(a).negate()); }
}
