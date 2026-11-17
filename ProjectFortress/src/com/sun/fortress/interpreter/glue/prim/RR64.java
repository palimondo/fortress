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

import java.util.List;

/**
 * The constructor of the library's object RR64, whose values are FFloat.
 */
public class RR64 extends NativeConstructor {

    public RR64(Environment env, FTypeObject selfType, ObjectConstructor def) {
        super(env, selfType, def);
    }

    protected FNativeObject makeNativeObject(List<FValue> args, NativeConstructor con) {
        FFloat.setConstructor(this);
        return FFloat.ZERO;
    }

    @Override
    protected void unregister() {
        FFloat.resetConstructor();

    }
}
