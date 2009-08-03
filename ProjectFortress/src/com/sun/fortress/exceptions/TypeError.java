/*******************************************************************************
    Copyright 2009 Sun Microsystems, Inc.,
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

package com.sun.fortress.exceptions;

import com.sun.fortress.useful.HasAt;

/**
 * A static error generated by the type checker.
 */
public class TypeError extends StaticError {

    /**
     * Make Eclipse happy
     */
    private static final long serialVersionUID = -3586975274806304888L;

    /**
     * Make a simple static error with the given location.
     */
    public static StaticError make(String description, HasAt location) {
        return StaticError.make(description, location);
    }
}
