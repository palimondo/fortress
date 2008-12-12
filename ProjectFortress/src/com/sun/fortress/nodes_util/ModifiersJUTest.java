/*******************************************************************************
    Copyright 2008 Sun Microsystems, Inc.,
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

package com.sun.fortress.nodes_util;

import com.sun.fortress.useful.TestCaseWrapper;
import static com.sun.fortress.nodes_util.Modifiers.*;

/**
 * More tests are needed over NodeFactory. This is a start.
 */
public class ModifiersJUTest extends TestCaseWrapper {
    public void checkPairing(Modifiers m, Modifiers n, Modifiers mn) {
        assertFalse(m.equals(n));
        assertEquals(mn,n.combine(m));
        assertEquals(mn,combine(n,m));
        assertEquals(mn,combine(null,mn));
        assertEquals(mn,combine(mn,null));
        assertEquals(mn,combine(null,n,m));
        assertEquals(mn,combine(n,null,m));
        assertEquals(mn,combine(n,m,null));
        assertEquals(mn.remove(m),n.remove(m));
        assertEquals(mn.remove(n),m.remove(n));
        assertEquals(mn.equals(m),m.containsAll(n));
        assertTrue(mn.containsAny(m));
        assertTrue(mn.containsAny(n));
        assertTrue(mn.containsAny(mn));
        assertTrue(m.containsAny(mn));
        assertTrue(n.containsAny(mn));
        assertTrue(mn.containsAll(m));
        assertTrue(mn.containsAll(n));
        assertTrue(mn.containsAll(mn));
        assertEquals(m.containsAll(mn), m.containsAll(n));
        assertEquals(n.containsAll(mn), n.containsAll(m));
        assertEquals(decode(mn.encode()), mn);
    }
    public void testModifierNames() {
        assertEquals(None.toString(),"");
        assertEquals(Abstract.toString(),"abstract");
        assertEquals(Atomic.toString(),"atomic");
        assertEquals(Getter.toString(),"getter");
        assertEquals(Hidden.toString(),"hidden");
        assertEquals(IO.toString(),"io");
        assertEquals(Override.toString(),"override");
        assertEquals(Private.toString(),"private");
        assertEquals(Settable.toString(),"settable");
        assertEquals(Setter.toString(),"setter");
        assertEquals(Test.toString(),"test");
        assertEquals(Value.toString(),"value");
        assertEquals(Var.toString(),"var");
        assertEquals(Widens.toString(),"widens");
        assertEquals(Wrapped.toString(),"wrapped");
        assertEquals(GetterSetter.toString(),"getter setter");
        assertEquals(Mutable.toString(),"settable var");
    }
    public void testThoroughSimples() {
        assertEquals(None.encode(),"\"\"");
        for (int i=0; i < modifiersByBit.length; i++) {
            Modifiers m = modifiersByBit[i];
            assertEquals(m,m);
            assertEquals(m.combine(m),m);
            assertEquals(m.combine(m).hashCode(),m.hashCode());
            assertEquals(m.combine(None),m);
            assertEquals(None.combine(m),m);
            assertEquals(None,m.remove(m));
            assertEquals(decode(m.encode()), m);
            assertEquals(m.encode().length(), 3);
            for (int j=i+1; j < modifiersByBit.length; j++) {
                Modifiers n = modifiersByBit[j];
                Modifiers mn = m.combine(n);
                checkPairing(m,n,mn);
                assertEquals(mn.remove(m),n);
                assertEquals(mn.remove(n),m);
                assertFalse(m.containsAll(mn));
                assertFalse(n.containsAll(mn));
                assertFalse(mn.equals(m));
                assertEquals(mn.encode().length(), 4);
            }
        }
    }
    public void testRandomly() {
        for (int i = 0; i < 1000; i++) {
            Modifiers m = randomForTest();
            Modifiers n = randomForTest();
            Modifiers mn = m.combine(n);
            checkPairing(m,n,mn);
            assertTrue(m.containsAll(m.remove(n)));
            assertEquals(mn.containsAny(m),!m.equals(None));
            assertEquals(m.containsAny(mn),!m.equals(None));
            assertTrue(mn.containsAll(m));
            assertEquals(m.containsAny(n), !m.remove(n).equals(m));
        }
    }
}
