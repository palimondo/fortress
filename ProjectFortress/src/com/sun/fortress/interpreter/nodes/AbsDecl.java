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

public interface AbsDecl extends DefOrDecl {

    public <T> T accept(NodeVisitor<T> v);

}

// / and decl =
// / [
// / | `AbsTraitDecl of trait_decl
// / | `AbsFnDecl of fn_decl
// / | `AbsObjectDecl of object_decl
// / | `AbsVarDecl of var_decl
// / | `DefOrDecl of def_or_decl
// / ] node
// /
