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

package com.sun.fortress.interpreter.nodes;

public class CharLiteral extends Literal {

    public int value() {
        return val;
    }

    int val;

    public CharLiteral(Span span) {
        super(span);
    }

    public CharLiteral(Span span, String s) {
        super(span);
        text = s;
        val = s.charAt(0);
    }

    @Override
    public <T> T accept(NodeVisitor<T> v) {
        return v.forCharLiteral(this);
    }

}
