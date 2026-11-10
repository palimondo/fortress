package com.sun.fortress.compiler.runtimeValues;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.TimeUnit;

import com.sun.fortress.nativeHelpers.arrayOps;
import com.sun.fortress.runtimeSystem.BaseTask;
import com.sun.fortress.runtimeSystem.FortressTaskRunnerGroup;
import com.sun.fortress.runtimeSystem.TransactionAbortException;
import com.sun.fortress.useful.TestCaseWrapper;

import fortress.AnyType.Any;

/**
 * The helpers of nativeHelpers.arrayOps over the compiled array stores: outside a transaction, inside
 * one, nested, after an abort, after an exception that leaves a block, and from four tasks on the compiled task pool at four threads, each adding
 * into one element inside a compiled atomic block; two tasks that each initialise one empty element
 * inside a compiled atomic block; and the RR64 store over a double[].
 */
public class ArrayStoreJUTest extends TestCaseWrapper {

    private static final int TASKS = 4;
    private static final int ADDS = 2000;
    private static final int ROUNDS = 1000;

    /** A task on the compiled pool, which makes itself the worker's current task as generated code does. */
    private static abstract class Task extends BaseTask {
        Task() { super(); }
        Task(BaseTask parent) { super(parent); }
        public final void compute() {
            BaseTask.setTask(this);
            body();
        }
        abstract void body();
    }

    /** Runs body as a compiled atomic block runs: begin, body, commit; the handler ends the transaction, and on its abort, back off, again. */
    private static void atomic(Runnable body) {
        while (true) {
            BaseTask.startTransaction();
            try {
                body.run();
                BaseTask.endTransaction();
                return;
            } catch (Throwable e) {
                BaseTask.leaveTransaction(e);
                BaseTask.delayTransaction();
            }
        }
    }

    /** Runs body as the primordial task of a compiled pool of the given number of threads. */
    private static void onPool(int threads, final Runnable body) {
        FortressTaskRunnerGroup pool = new FortressTaskRunnerGroup(threads);
        try {
            pool.invoke(new Task() { void body() { body.run(); } });
        } finally {
            pool.shutdown();
        }
    }

    private static Any zz(int i) { return FZZ32.make(i); }
    private static int zz(Object o) { return ((FZZ32) o).getValue(); }

    private static void outsideATransaction() {
        FortressArrayStore s = arrayOps.make(3);
        assertTrue(arrayOps.init(s, 0, zz(5)));
        assertFalse("a second initialisation is ignored", arrayOps.init(s, 0, zz(6)));
        assertEquals(5, zz(arrayOps.get(s, 0)));
        arrayOps.put(s, 1, zz(7));
        assertEquals(7, zz(arrayOps.get(s, 1)));
        arrayOps.put(s, 1, zz(8));
        assertEquals(8, zz(arrayOps.get(s, 1)));
        assertFalse("an element that put wrote is initialised", arrayOps.init(s, 1, zz(9)));
        try {
            arrayOps.get(s, 2);
            fail("read an uninitialised element");
        } catch (IllegalStateException e) {
            assertTrue(e.getMessage(), e.getMessage().contains("uninitialized element 2"));
        }
        try {
            arrayOps.get(s, 3);
            fail("read past the end");
        } catch (ArrayIndexOutOfBoundsException e) {
        }
    }

    public void testOutsideATransactionOnAThreadOfNoPool() {
        outsideATransaction();
    }

    public void testOutsideATransactionOnThePool() {
        onPool(1, new Runnable() { public void run() {
            assertFalse(BaseTask.inATransaction());
            outsideATransaction();
        }});
    }

    public void testInsideATransaction() {
        onPool(1, new Runnable() { public void run() {
            final FortressArrayStore s = arrayOps.make(2);
            arrayOps.init(s, 0, zz(1));
            arrayOps.init(s, 1, zz(10));
            atomic(new Runnable() { public void run() {
                assertTrue(BaseTask.inATransaction());
                arrayOps.put(s, 1, zz(20));
                assertEquals("a transaction reads its own write", 20, zz(arrayOps.get(s, 1)));
                arrayOps.put(s, 1, zz(10));
            }});
            assertEquals(10, zz(arrayOps.get(s, 1)));
            atomic(new Runnable() { public void run() {
                assertEquals(1, zz(arrayOps.get(s, 0)));
                arrayOps.put(s, 0, zz(2));
                atomic(new Runnable() { public void run() {
                    assertEquals("a nested transaction reads its parent's write", 2, zz(arrayOps.get(s, 0)));
                    arrayOps.put(s, 0, zz(3));
                    arrayOps.put(s, 1, zz(zz(arrayOps.get(s, 1)) + 1));
                }});
                assertEquals("the parent reads its nested transaction's write", 3, zz(arrayOps.get(s, 0)));
            }});
            assertFalse(BaseTask.inATransaction());
            assertEquals(3, zz(arrayOps.get(s, 0)));
            assertEquals(11, zz(arrayOps.get(s, 1)));
        }});
    }

    public void testAnAbortedTransactionWritesNothing() {
        onPool(1, new Runnable() { public void run() {
            final FortressArrayStore s = arrayOps.make(2);
            arrayOps.init(s, 0, zz(1));
            final int[] attempts = { 0 };
            atomic(new Runnable() { public void run() {
                attempts[0]++;
                if (attempts[0] == 1) {
                    arrayOps.put(s, 0, zz(99));
                    assertTrue(arrayOps.init(s, 1, zz(98)));
                    throw new TransactionAbortException();
                }
                assertEquals("the aborted write is not seen", 1, zz(arrayOps.get(s, 0)));
                arrayOps.put(s, 0, zz(zz(arrayOps.get(s, 0)) + 1));
                assertTrue("the aborted initialisation is not seen", arrayOps.init(s, 1, zz(7)));
                assertFalse("a second initialisation in one transaction", arrayOps.init(s, 1, zz(8)));
            }});
            assertEquals(2, attempts[0]);
            assertEquals(2, zz(arrayOps.get(s, 0)));
            assertEquals(7, zz(arrayOps.get(s, 1)));
        }});
    }

    public void testAnExceptionLeavesATransactionWithoutItsWrites() {
        onPool(1, new Runnable() { public void run() {
            final FortressArrayStore s = arrayOps.make(3);
            arrayOps.init(s, 0, zz(1));
            try {
                atomic(new Runnable() { public void run() {
                    arrayOps.put(s, 0, zz(99));
                    assertTrue(arrayOps.init(s, 1, zz(98)));
                    arrayOps.get(s, 2);     // an exception of Java's, not a Fortress exception
                }});
                fail("read an uninitialised element");
            } catch (IllegalStateException e) {
                assertTrue(e.getMessage(), e.getMessage().contains("uninitialized element 2"));
            }
            assertFalse("the exception ended the transaction", BaseTask.inATransaction());
            assertEquals("the write is not seen", 1, zz(arrayOps.get(s, 0)));
            assertTrue("the initialisation is not seen", arrayOps.init(s, 1, zz(7)));
            atomic(new Runnable() { public void run() {
                arrayOps.put(s, 0, zz(2));
                try {
                    atomic(new Runnable() { public void run() {
                        arrayOps.put(s, 0, zz(3));
                        arrayOps.put(s, 1, zz(8));
                        arrayOps.get(s, 2);
                    }});
                    fail("read an uninitialised element");
                } catch (IllegalStateException e) {
                }
                assertTrue("the exception ended the nested transaction only", BaseTask.inATransaction());
                assertEquals("the outer transaction's write, not the nested one's", 2, zz(arrayOps.get(s, 0)));
                arrayOps.put(s, 1, zz(zz(arrayOps.get(s, 1)) + 10));
            }});
            assertFalse(BaseTask.inATransaction());
            assertEquals(2, zz(arrayOps.get(s, 0)));
            assertEquals(17, zz(arrayOps.get(s, 1)));
        }});
    }

    public void testFourTasksAddIntoOneElementInsideAtomic() {
        final FortressArrayStore s = arrayOps.make(1);
        arrayOps.init(s, 0, zz(0));
        final MutableFValue cell = MutableFValue.make(zz(0));
        final Set<String> threads = Collections.synchronizedSet(new HashSet<String>());
        final CyclicBarrier together = new CyclicBarrier(TASKS);
        onPool(TASKS, new Runnable() { public void run() {
            final BaseTask primordial = BaseTask.getCurrentTask();
            Task[] tasks = new Task[TASKS];
            for (int t = 0; t < TASKS; t++) {
                tasks[t] = new Task(primordial) { void body() {
                    threads.add(Thread.currentThread().getName());
                    try {
                        together.await(60, TimeUnit.SECONDS);   // the four tasks run at once, on four threads
                    } catch (Exception e) {
                        throw new AssertionError("the four tasks did not run at once: " + e);
                    }
                    for (int k = 0; k < ADDS; k++) {
                        atomic(new Runnable() { public void run() {
                            int v = zz(arrayOps.get(s, 0));
                            arrayOps.put(s, 0, zz(v + 1));
                            Any c = BaseTask.getCurrentTransaction().TXRead(cell);
                            BaseTask.getCurrentTransaction().TXWrite(cell, zz(zz(c) + 1));
                        }});
                    }
                }};
            }
            for (Task t : tasks) t.fork();
            for (Task t : tasks) t.join();
            BaseTask.setTask(primordial);
        }});
        assertEquals("the element's total", TASKS * ADDS, zz(arrayOps.get(s, 0)));
        assertEquals("a cell updated in the same transactions", TASKS * ADDS, zz(cell.getValue()));
        assertEquals("the threads that ran the tasks", TASKS, threads.size());
    }

    public void testTwoTransactionsInitialiseOneElementOnce() {
        final FortressArrayStore s = arrayOps.make(ROUNDS);
        final int[] both = { 0 };
        final int[] neither = { 0 };
        final int[] lost = { 0 };
        onPool(TASKS, new Runnable() { public void run() {
            final BaseTask primordial = BaseTask.getCurrentTask();
            for (int r = 0; r < ROUNDS; r++) {
                final int round = r;
                final CyclicBarrier together = new CyclicBarrier(2);
                final boolean[] won = new boolean[2];
                Task[] tasks = new Task[2];
                for (int t = 0; t < 2; t++) {
                    final int me = t;
                    tasks[t] = new Task(primordial) { void body() {
                        try {
                            together.await(60, TimeUnit.SECONDS);   // the two tasks run at once, on two threads
                        } catch (Exception e) {
                            throw new AssertionError("the two tasks did not run at once: " + e);
                        }
                        atomic(new Runnable() { public void run() {
                            won[me] = arrayOps.init(s, round, zz(me + 1));
                        }});
                    }};
                }
                for (Task t : tasks) t.fork();
                for (Task t : tasks) t.join();
                BaseTask.setTask(primordial);
                if (won[0] && won[1]) both[0]++;
                else if (!won[0] && !won[1]) neither[0]++;
                else if (zz(arrayOps.get(s, round)) != (won[0] ? 1 : 2)) lost[0]++;
            }
        }});
        assertEquals("rounds in which both initialisations answered true", 0, both[0]);
        assertEquals("rounds in which neither initialisation answered true", 0, neither[0]);
        assertEquals("rounds in which the element does not hold the winner's value", 0, lost[0]);
    }

    public void testTheRR64Store() {
        FortressRR64ArrayStore r = arrayOps.makeRR64(3);
        assertTrue(arrayOps.initRR64(r, 0, 1.5));
        assertTrue(arrayOps.initRR64(r, 1, 2.5));
        assertTrue(arrayOps.initRR64(r, 2, 0.25));
        assertEquals(4.25, arrayOps.getRR64(r, 0) + arrayOps.getRR64(r, 1) + arrayOps.getRR64(r, 2), 0.0);
        try {
            arrayOps.getRR64(r, 3);
            fail("read past the end");
        } catch (ArrayIndexOutOfBoundsException e) {
        }
    }
}
