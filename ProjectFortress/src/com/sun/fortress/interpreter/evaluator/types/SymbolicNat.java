/*******************************************************************************
 Copyright 2008,2009, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.evaluator.types;

import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.nodes.IntArg;
import com.sun.fortress.nodes.IntExpr;
import com.sun.fortress.nodes.IntRef;
import com.sun.fortress.nodes.StaticArg;
import com.sun.fortress.useful.BoundingMap;
import java.util.Set;

public class SymbolicNat extends FTypeNat {

    public SymbolicNat(String name) {
        super(name);
        isSymbolic = true;
    }

    /**
     * A symbolic size unifies with a size parameter of the signature, which
     * it then stands for, as a size does (IntNat.unifyStaticArg); it equals
     * no literal size.
     */
    @Override
    public void unifyStaticArg(Environment env,
                               Set<String> tp_set,
                               BoundingMap<String, FType, TypeLatticeOps> abm,
                               StaticArg val) {
        if (val instanceof IntArg) {
            IntExpr n = ((IntArg) val).getIntVal();
            if (n instanceof IntRef) {
                abm.joinPut(((IntRef) n).getName().getText(), this);
                return;
            }
        }
        super.unifyStaticArg(env, tp_set, abm, val);
    }

}
