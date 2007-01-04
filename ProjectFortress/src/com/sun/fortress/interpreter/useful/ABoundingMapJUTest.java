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

package com.sun.fortress.interpreter.useful;

import junit.framework.TestCase;

public class ABoundingMapJUTest extends TestCase {

    public static void main(String[] args) {
        junit.swingui.TestRunner.run(ABoundingMapJUTest.class);
    }

    LongBitsLatticeOps ops = LongBitsLatticeOps.V;
    ABoundingMap<String, Long, LongBitsLatticeOps> abm = new
    ABoundingMap<String, Long, LongBitsLatticeOps>(new BATree<String, Long>(StringComparer.V), ops);

    /*
     * Test method for 'com.sun.fortress.interpreter.useful.ABoundingMap.ABoundingMap(Map<T, U>, LatticeOps<U>)'
     */
    public void testABoundingMapMapOfTULatticeOpsOfU() {
        // TODO Auto-generated method stub

    }

    /*
     * Test method for 'com.sun.fortress.interpreter.useful.ABoundingMap.dual()'
     */
    public void testDual() {
        // TODO Auto-generated method stub

    }

    /*
     * Test method for 'com.sun.fortress.interpreter.useful.ABoundingMap.meetPut(T, U)'
     */
    public void testMeetPut() {
        Long o = abm.meetPut("3", new Long(11));
        assertEquals(o, null);
        o = abm.meetPut("3", new Long(7));
        assertEquals(o.longValue(), 11);
        o = abm.get("3");
        assertEquals(o.longValue(), 3);

        o = abm.meetPut("3", ops.one());
        assertEquals(o.longValue(), 3);
        o = abm.get("3");
        assertEquals(o.longValue(), 3);
        o = abm.meetPut("3", ops.zero());
        assertEquals(o.longValue(), 3);
        o = abm.get("3");
        assertEquals(o, ops.zero());


    }

    /*
     * Test method for 'com.sun.fortress.interpreter.useful.ABoundingMap.joinPut(T, U)'
     */
    public void testJoinPut() {
        Long o = abm.joinPut("15", new Long(11));
        assertEquals(o, null);
        o = abm.joinPut("15", new Long(7));
        assertEquals(o.longValue(), 11);
        o = abm.get("15");
        assertEquals(o.longValue(), 15);


        o = abm.joinPut("15", ops.zero());
        assertEquals(o.longValue(), 15);
        o = abm.get("15");
        assertEquals(o.longValue(), 15);
        o = abm.joinPut("15", ops.one());
        assertEquals(o.longValue(), 15);
        o = abm.get("15");
        assertEquals(o, ops.one());


    }

}
