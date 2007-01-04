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

package com.sun.fortress.interpreter.rewrite;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.List;

import com.sun.fortress.interpreter.nodes.Node;
import com.sun.fortress.interpreter.nodes.NodeReflection;
import com.sun.fortress.interpreter.nodes.Some;
import com.sun.fortress.interpreter.useful.NI;
import com.sun.fortress.interpreter.useful.Pair;


abstract public class Visit extends NodeReflection {

    @Override
    protected Constructor defaultConstructorFor(Class cl)
            throws NoSuchMethodException {
        return NI.na("Visitors cannot modify tree structure");
    }

    /**
     * Called by VisitObject for each Node; expected to perform
     * any customized rewriting operations needed.
     *
     * @param node
     * @return
     */
    abstract protected void visit(Node node);

    /**
     * Based on the type of o, recursively visits its pieces.
     *
     * @param o
     * @return
     */
    protected void visitObject(Object o) {
        if (o instanceof List) {
             visitList((List) o);
        } else if (o instanceof Pair) {
             visitPair((Pair) o);
        } else if (o instanceof Some) {
             visitSome((Some) o);
        } else if (o instanceof Number) {

        } else if (o instanceof Boolean) {

        } else if (o instanceof Node) {
             visit((Node) o);
        } else {
        }
            return;
    }


   /**
     * Visits the pieces of a node using reflection,
     * returning either the original if nothing has changed,
     * or a new node if something has changed.
     *
     * @param n
     * @return
     */
    protected void visitNode(Node n) {
        Field[] fields = getCachedPrintableFields(n.getClass());
        for (int i = 0; i < fields.length; i++) {
            Field f = fields[i];
            try {
                Object o = f.get(n);
                visitObject(o);

            // Should be impossible, we set them to be accessible.
            } catch (IllegalArgumentException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
        return;
    }

     /**
     * VisitObject each element of the list
     *
     * @param list
     * @return
     */
    protected  void visitList(List list) {
        for (int i = 0; i < list.size(); i++) {
            Object o = list.get(i);
            visitObject(o);

        }
        return;
    }

    /**
     * VisitObject the value of the Some,
     *
     * @param list
     * @return
     */
    protected void visitSome(Some some) {
        Object o = some.getVal();
        visitObject(o);
    }

    /**
     * VisitObject the two elements of the pair, returning a different
     * Pair if either one changed, otherwise returning the original.
     *
     * @param pair
     * @return
     */
    protected void visitPair(Pair pair) {
        Object a = pair.getA();
        Object b = pair.getB();
        visitObject(a);
        visitObject(b);

     }


    protected Visit() {
        super();
    }



}
