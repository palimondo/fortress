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

package com.sun.fortress.interpreter.evaluator;
import com.sun.fortress.interpreter.env.FortressTests;
import com.sun.fortress.interpreter.evaluator.types.BottomType;
import com.sun.fortress.interpreter.evaluator.types.FTypeArrow;
import com.sun.fortress.interpreter.evaluator.types.FTypeBool;
import com.sun.fortress.interpreter.evaluator.types.FTypeChar;
import com.sun.fortress.interpreter.evaluator.types.FTypeDynamic;
import com.sun.fortress.interpreter.evaluator.types.FTypeFloat;
import com.sun.fortress.interpreter.evaluator.types.FTypeFloatLiteral;
import com.sun.fortress.interpreter.evaluator.types.FTypeInt;
import com.sun.fortress.interpreter.evaluator.types.FTypeIntLiteral;
import com.sun.fortress.interpreter.evaluator.types.FTypeIntegral;
import com.sun.fortress.interpreter.evaluator.types.FTypeLong;
import com.sun.fortress.interpreter.evaluator.types.FTypeNumber;
import com.sun.fortress.interpreter.evaluator.types.FTypeOverloadedArrow;
import com.sun.fortress.interpreter.evaluator.types.FTypeRange;
import com.sun.fortress.interpreter.evaluator.types.FTypeRest;
import com.sun.fortress.interpreter.evaluator.types.FTypeString;
import com.sun.fortress.interpreter.evaluator.types.FTypeStringLiteral;
import com.sun.fortress.interpreter.evaluator.types.FTypeTop;
import com.sun.fortress.interpreter.evaluator.types.FTypeTuple;
import com.sun.fortress.interpreter.evaluator.types.FTypeVoid;
import com.sun.fortress.interpreter.evaluator.types.IntNat;


/*
 * Created on Oct 27, 2006
 *
 */

public class Init {

    public static void initializeEverything() {
        FTypeArrow.reset();
        FTypeTuple.reset();
        FTypeRest.reset();
        FTypeOverloadedArrow.reset();
        FortressTests.reset();
        IntNat.reset();

        FTypeVoid.T.resetState();
        FTypeTop.T.resetState();
        FTypeDynamic.T.resetState();

        FTypeBool.T.resetState();
        FTypeChar.T.resetState();

        FTypeInt.T.resetState();
        FTypeFloat.T.resetState();
        FTypeString.T.resetState();
        FTypeNumber.T.resetState();
        FTypeIntegral.T.resetState();
	FTypeLong.T.resetState();
	BottomType.T.resetState();
	FTypeRange.T.resetState();

        FTypeIntLiteral.T.resetState();
        FTypeFloatLiteral.T.resetState();
        FTypeStringLiteral.T.resetState();

    }

}
