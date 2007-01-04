/*******************************************************************************
    Copyright 2007 Sun Microsystems, Inc.,
    4150 Network Circle, Santa Clara, California 95054, U.S.A.
    All rights reserved.

    U.S. Government Rights - Commercial software.
    Government users are subject to the Sun Microsystems, Inc. standard
    license agreement and applicable provisions of the FAR and its supplements.

    Use is subject to license terms.

    This distribution may include materials developed by third parties.

    Sun, Sun Microsystems, the Sun logo and Java are trademarks or registered
    trademarks of Sun Microsystems, Inc. in the U.S. and other countries.
 ******************************************************************************/

package com.sun.fortress.interpreter.env;

import com.sun.fortress.interpreter.evaluator.InterpreterError;
import com.sun.fortress.interpreter.evaluator.ProgramError;
import com.sun.fortress.interpreter.evaluator.values.FValue;


public class IndirectionCell extends FValue {
    protected volatile FValue theValue;
    public String toString() {
        return theValue.toString();
    }

    public IndirectionCell() {
    }

    public void storeValue(FValue f2) {
        if (theValue != null)
            throw new InterpreterError("Internal error, second store of indirection cell");
        theValue = f2;
    }

    public boolean isInitialized() {
        return theValue != null;
    }

    public FValue getValue() {
        if (theValue == null) {
            throw new ProgramError("Attempt to read uninitialized variable");
        }
        return theValue;
    }

}
