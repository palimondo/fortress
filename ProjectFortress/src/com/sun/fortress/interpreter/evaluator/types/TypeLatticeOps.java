/*******************************************************************************
 Copyright 2008,2009, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.evaluator.types;

import static com.sun.fortress.exceptions.InterpreterBug.bug;
import static com.sun.fortress.exceptions.ProgramError.errorMsg;
import com.sun.fortress.interpreter.evaluator.EvaluatorBase;
import com.sun.fortress.useful.DualLattice;
import com.sun.fortress.useful.LatticeOps;

import java.util.Set;

public class TypeLatticeOps implements LatticeOps<FType> {
    public boolean isForward() {
        return true;
    }

    public LatticeOps<FType> dual() {
        return dualLattice;
    }

    /**
     * The least common supertype of x and y, or Any, the lattice's top, where
     * they have several minimal common supertypes or none.
     */
    public FType join(FType x, FType y) {
        // if (x.subtypeOf(y)) return y;
        // if (y.subtypeOf(x)) return x;
        Set<FType> s = x.join(y);
        if (s.size() != 1) {
            EvaluatorBase.traceInstance("join", x, "", s, one(), y);
            return one();
        }
        return s.iterator().next();
    }

    public FType meet(FType x, FType y) {
        // if (x.subtypeOf(y)) return x;
        // if (y.subtypeOf(x)) return y;
        Set<FType> s = x.meet(y);
        if (s.size() != 1) bug(errorMsg("Meet(", x, ", ", y, ") not a singleton: ", s));
        return s.iterator().next();
    }

    public FType one() {
        return FTypeTop.ONLY;
    }

    public FType zero() {
        return BottomType.ONLY;
    }

    public final static LatticeOps<FType> V = new TypeLatticeOps();
    public final static LatticeOps<FType> dualLattice = new DualLattice<FType>(V);


}
