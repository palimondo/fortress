package com.sun.fortress.compiler.runtimeValues;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.CountDownLatch;

import com.sun.fortress.useful.MagicNumbers;
import com.sun.fortress.useful.TestCaseWrapper;

public class RTTIsizeJUTest extends TestCaseWrapper {

    public void testClassNameIsTheText() {
        assertEquals("3", RTTIsize.of("3").className());
        assertEquals("16", RTTIsize.of("16").className());
        assertEquals("-2", RTTIsize.of("-2").className());
    }

    public void testOneDescriptorPerNumber() {
        assertSame(RTTIsize.of("3"), RTTIsize.of("3"));
        assertNotSame(RTTIsize.of("3"), RTTIsize.of("4"));
        assertFalse(RTTIsize.of("3").equals(RTTIsize.of("4")));
    }

    public void testSupertypeOnlyOfAnEqualSize() {
        RTTI three = RTTIsize.of("3");
        RTTI four = RTTIsize.of("4");
        assertTrue(three.runtimeSupertypeOf(RTTIsize.of("3")));
        assertFalse(three.runtimeSupertypeOf(four));
        assertFalse(four.runtimeSupertypeOf(three));
        assertFalse(three.runtimeSupertypeOf(new JavaRTTI(Object.class)));
    }

    public void testSeventeenSizesHashApart() {
        Set<Integer> own = new HashSet<Integer>();
        Set<Integer> key = new HashSet<Integer>();
        for (int i = 0; i <= 16; i++) {
            RTTI r = RTTIsize.of(Integer.toString(i));
            own.add(r.hashCode());
            key.add(MagicNumbers.hashArray(new Object[] { r }));
        }
        assertEquals("distinct hashCode() of the sizes 0 to 16", 17, own.size());
        assertEquals("distinct factory-dictionary keys of the sizes 0 to 16", 17, key.size());
    }

    public void testFirstReachFromManyThreadsGivesOneDescriptor() throws Exception {
        final int threads = 8;
        final int sizes = 2000;
        for (int round = 0; round < 10; round++) {
            final int base = 700000 + round * sizes;
            final RTTI[][] seen = new RTTI[threads][sizes];
            final CountDownLatch start = new CountDownLatch(1);
            Thread[] ts = new Thread[threads];
            for (int t = 0; t < threads; t++) {
                final int me = t;
                ts[t] = new Thread() {
                    public void run() {
                        try {
                            start.await();
                        } catch (InterruptedException e) {
                            return;
                        }
                        for (int i = 0; i < sizes; i++)
                            seen[me][i] = RTTIsize.of(Integer.toString(base + i));
                    }
                };
                ts[t].start();
            }
            start.countDown();
            for (Thread t : ts) t.join();
            for (int i = 0; i < sizes; i++)
                for (int t = 1; t < threads; t++)
                    assertSame("size " + (base + i) + " seen by thread " + t, seen[0][i], seen[t][i]);
        }
    }
}
