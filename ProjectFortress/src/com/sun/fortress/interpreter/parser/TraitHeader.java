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

/*
 * Fortress trait headers.
 * Fortress AST node local to the Rats! com.sun.fortress.interpreter.parser.
 */
package com.sun.fortress.interpreter.parser;
import java.util.List;

import com.sun.fortress.interpreter.nodes.Id;
import com.sun.fortress.interpreter.nodes.StaticParam;
import com.sun.fortress.interpreter.nodes.TypeRef;
import com.sun.fortress.interpreter.useful.MagicNumbers;

public class TraitHeader {

    private Id name;
    private List<StaticParam> staticParams;
    private List<TypeRef> extendsClause;

    public TraitHeader(Id name, List<StaticParam> staticParams,
                       List<TypeRef> extendsClause) {
        this.name = name;
        this.staticParams = staticParams;
        this.extendsClause = extendsClause;
    }

    public Id getName() {
        return name;
    }

    public List<StaticParam> getStaticParams() {
        return staticParams;
    }

    public List<TypeRef> getExtendsClause() {
        return extendsClause;
    }

    public int hashCode() {
        return name.hashCode() * MagicNumbers.n
            + MagicNumbers.hashList(staticParams, MagicNumbers.e)
            + MagicNumbers.hashList(extendsClause, MagicNumbers.l);
    }

    public boolean equals(Object o) {
        if (o.getClass().equals(this.getClass())) {
            TraitHeader th = (TraitHeader) o;
            return name.equals(th.getName())
                && staticParams.equals(th.getStaticParams())
                && extendsClause.equals(th.getExtendsClause());
        }
        return false;
    }

    public String toString() {
        StringBuffer sb = new StringBuffer();
        sb.append("trait ");
        sb.append(String.valueOf(name));
        return sb.toString();
    }
}
