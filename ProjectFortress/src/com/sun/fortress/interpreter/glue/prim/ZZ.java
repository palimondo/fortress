/*******************************************************************************
 Copyright 2008,2009, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.glue.prim;

import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.types.FTypeObject;
import com.sun.fortress.interpreter.evaluator.values.*;
import com.sun.fortress.nodes.ObjectConstructor;

import java.math.BigInteger;
import java.util.List;

/**
 * The constructor of the library's object ZZ, whose values are FBigNum, and the power of a
 * BigInteger that the glue class of IntLiteral uses.
 */
public class ZZ extends NativeConstructor {

    public ZZ(Environment env, FTypeObject selfType, ObjectConstructor def) {
        super(env, selfType, def);
    }

    protected FNativeObject makeNativeObject(List<FValue> args, NativeConstructor con) {
        FBigNum.setConstructor(con);
        return FBigNum.ZERO;
    }

    @Override
    protected void unregister() {
        FBigNum.resetConstructor();
    }

    /** u^v for any exponent v: at a negative exponent, or one beyond the
        int's range, the bases 1 and -1 give their exact power and 0 gives 0,
        or throws DivisionByZero at a negative one; any other base throws
        IntegerOverflow, as it does where the power exceeds a BigInteger. */
    public static BigInteger pow(BigInteger u, long v) {
        if (v >= 0 && v <= Integer.MAX_VALUE) {
            try {
                return u.pow((int) v);
            }
            catch (ArithmeticException e) {
                throw ZZ32.overflow();
            }
        }
        if (u.equals(BigInteger.ONE)) return u;
        if (u.equals(BigInteger.ONE.negate())) return ((v & 1) == 0) ? BigInteger.ONE : u;
        if (u.signum() == 0) {
            if (v < 0) throw ZZ32.divisionByZero();
            return u;
        }
        throw ZZ32.overflow();
    }
}
