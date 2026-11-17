/*******************************************************************************
 Copyright 2008,2009, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.glue.prim;

import com.sun.fortress.compiler.WellKnownNames;
import com.sun.fortress.exceptions.FortressError;
import com.sun.fortress.interpreter.Driver;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.types.FTypeObject;
import com.sun.fortress.interpreter.evaluator.values.*;
import com.sun.fortress.nodes.ObjectConstructor;

import java.math.BigInteger;
import java.util.List;

/**
 * The constructor of the library's object ZZ32, whose values are FInt, and the raise of
 * IntegerOverflow and DivisionByZero and the exponent and shift counts that the glue classes of
 * NN32, NN64, ZZ and IntLiteral share.
 */
public class ZZ32 extends NativeConstructor {

    public ZZ32(Environment env, FTypeObject selfType, ObjectConstructor def) {
        super(env, selfType, def);
    }

    protected FNativeObject makeNativeObject(List<FValue> args, NativeConstructor con) {
        FInt.setConstructor(this);
        return FInt.ZERO;
    }

    public static FortressError overflow() {
        FObject f = (FObject) Driver.getFortressLibrary().getRootValue(WellKnownNames.integerOverflowException);
        return new FortressError(f);
    }

    public static FortressError divisionByZero() {
        FObject f = (FObject) Driver.getFortressLibrary().getRootValue(WellKnownNames.divisionByZeroException);
        return new FortressError(f);
    }

    /** The exponent of a power, of any integer type, as a long. One beyond
        64 bits becomes the long of its sign and parity nearest it, to which
        only the bases 0, 1 and -1 can be raised. */
    public static long powCount(FValue y) {
        if (y instanceof FNN64) {
            long v = y.getNN64();
            return (v < 0) ? java.lang.Long.MAX_VALUE - 1 + (v & 1) : v;
        }
        if (y instanceof FBigNum) {
            BigInteger b = y.getBigInteger();
            if (b.bitLength() < 64) return b.longValue();
            long odd = b.testBit(0) ? 1 : 0;
            return (b.signum() < 0) ? java.lang.Long.MIN_VALUE + odd : java.lang.Long.MAX_VALUE - 1 + odd;
        }
        return y.getLong();
    }

    public static long shiftCount(FValue y) {
        if (y instanceof FNN64) {
            long v = y.getNN64();
            return (v < 0) ? java.lang.Long.MAX_VALUE : v;
        }
        if (y instanceof FBigNum) {
            BigInteger b = y.getBigInteger();
            if (b.bitLength() < 64) return b.longValue();
            return (b.signum() < 0) ? java.lang.Long.MIN_VALUE : java.lang.Long.MAX_VALUE;
        }
        return y.getLong();
    }

    @Override
    protected void unregister() {
        FInt.resetConstructor();

    }
}
