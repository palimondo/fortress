/*******************************************************************************
 Copyright 2009,2010, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.nativeHelpers;
import com.sun.fortress.compiler.runtimeValues.Utility;
import com.sun.fortress.runtimeSystem.BaseTask;
import com.sun.fortress.runtimeSystem.FortressExecutable;
import com.sun.fortress.runtimeSystem.FortressTaskRunner;
import com.sun.fortress.runtimeSystem.TransactionAbortException;

/**
 * The run time's own operations over the compiled run time.  Walk answers the
 * names of abort, printTaskTrace and Thread's four with its own glue
 * (interpreter/glue/NativeApp.java, OWN_OPERATIONS), so only the compiled path
 * runs these bodies.  Every method has a signature that maps to Fortress.
 */
public class runtime {
    public static int loopChunk()  { return FortressExecutable.loopChunk;}
    public static int numThreads() { return FortressExecutable.numThreads;}

    private static final String FAIL_CALLED = "fortress.CompilerLibrary$FailCalled";
    private static final String SPAWN_NOT_COMPILED = "spawn is not compiled yet";

    /** Abandons the innermost atomic block, which the compiled atomic then runs
        again from its start; outside a transaction it does nothing. */
    public static void abort() {
        if (java.lang.Thread.currentThread() instanceof FortressTaskRunner && BaseTask.inATransaction())
            throw new TransactionAbortException();
    }

    /** Prints the compiled task chain, from the current task through each
        parent to the program's primordial task, one line a task, in one write. */
    public static void printTaskTrace() {
        if (!(java.lang.Thread.currentThread() instanceof FortressTaskRunner)) return;
        StringBuilder lines = new StringBuilder();
        for (BaseTask t = BaseTask.getCurrentTask(); t != null; t = TaskParent.of(t))
            lines.append("Task: ").append(t.getClass().getName()).append('\n');
        System.out.print(lines);
        System.out.flush();
    }

    /* Thread's val, wait, ready and stop, until the code generator compiles spawn. */

    public static fortress.AnyType.Any threadVal(fortress.AnyType.Any self) {
        throw Utility.makeFortressException(FAIL_CALLED, SPAWN_NOT_COMPILED);
    }

    public static void threadWait(fortress.AnyType.Any self) {
        throw Utility.makeFortressException(FAIL_CALLED, SPAWN_NOT_COMPILED);
    }

    public static boolean threadReady(fortress.AnyType.Any self) {
        throw Utility.makeFortressException(FAIL_CALLED, SPAWN_NOT_COMPILED);
    }

    public static void threadStop(fortress.AnyType.Any self) {
        throw Utility.makeFortressException(FAIL_CALLED, SPAWN_NOT_COMPILED);
    }

    /** A task's parent, which runtimeSystem keeps package-private.  A nested
        class, so that the helper class itself declares only methods over
        Fortress's types. */
    static final class TaskParent {
        private static final java.lang.reflect.Field PARENT = parentField();

        private static java.lang.reflect.Field parentField() {
            try {
                java.lang.reflect.Field f = BaseTask.class.getDeclaredField("parent");
                f.setAccessible(true);
                return f;
            } catch (NoSuchFieldException e) {
                throw new Error(e);
            }
        }

        static BaseTask of(BaseTask t) {
            try {
                return (BaseTask) PARENT.get(t);
            } catch (IllegalAccessException e) {
                throw new Error(e);
            }
        }
    }
}
