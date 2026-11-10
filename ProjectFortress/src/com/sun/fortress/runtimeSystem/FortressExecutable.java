/*******************************************************************************
    Copyright 2009,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.runtimeSystem;


import com.sun.fortress.nativeHelpers.systemHelper;
import java.util.concurrent.RecursiveAction;

/** Superclass of the generated component class.  We can't refer to
 *  that one until we have defined it and we need to pass an instance
 *  of it to the primordial task.  We need a run method here because
 *  the one in the generated class isn't visisble yet.
 */

public abstract class FortressExecutable extends RecursiveAction {
    public static final int numThreads = getNumThreads();
    public static final int defaultSpawnThreshold = 5;
    public static final int spawnThreshold = getSpawnThreshold();
    public static final int loopChunk = getLoopChunk();
    public static final FortressTaskRunnerGroup group =
        new FortressTaskRunnerGroup(numThreads);
    public static final boolean useHelpJoin = getHelpJoin();
    public static final boolean useExponentialBackoff = getBackoffStrategy();
    public static final boolean defaultBackoffExponential = false; // no evidence that it helps

    public static final int machineConstant = getMachineConst();

    public static int getNumThreads() {
        String numThreadsString = System.getenv("FORTRESS_THREADS");
        if (numThreadsString != null) return Integer.parseInt(numThreadsString);
        else {
            int availThreads = Runtime.getRuntime().availableProcessors();
            if (availThreads <= 2) return availThreads;
            else return (int) Math.floor((double) availThreads / 2.0);
        }
    }

    static int getSpawnThreshold() {
        String spawnThresholdString = System.getenv("FORTRESS_SPAWN_THRESHOLD");
        if (spawnThresholdString != null) return Integer.parseInt(spawnThresholdString);
        return defaultSpawnThreshold;
    }

    static int getLoopChunk() {
        String loopChunkString = System.getenv("FORTRESS_LOOP_CHUNK");
        if (loopChunkString != null) return Integer.parseInt(loopChunkString);
        return 1;
    }

    static boolean getHelpJoin() {
        String getHelpJoinString = System.getenv("FORTRESS_HELP_JOIN");
        return envToBoolean(getHelpJoinString);
    }

    static boolean getBackoffStrategy() {
        String backoffStrategyString = System.getenv("FORTRESS_EXP_BACKOFF");
        if (backoffStrategyString != null) return envToBoolean(backoffStrategyString);
        return useExponentialBackoff;
    }

    static int getMachineConst() {
        String mc = System.getenv("FORTRESS_MACHINE_CONSTANT");
        if (mc != null) return Integer.parseInt(mc);
        return 0;
    }

    private static boolean envToBoolean(String s) {
        return s != null && s.length() > 0 &&
               s.substring(0,1).matches("[TtYy]");
    }

//     public final void runExecutable(String args[]) {
//         try {
//             systemHelper.registerArgs(args);
//             //group.invoke(this);
//             group.execute(primordialTask);
//             this.join();
//         } finally {
//             String printOnOutput = System.getenv("FORTRESS_THREAD_STATISTICS");
//             if (envToBoolean(printOnOutput)) {
//                 System.err.println("numThreads = " + numThreads +
//                                    ", spawnThreshold = " + spawnThreshold +
//                                    " helpJoin = " + useHelpJoin);
//                 System.err.println("activeThreads = " + group.getActiveThreadCount());
//                 System.err.println(group);
//             }
//         }
//     }


    /**
     * Loads and initializes the named classes, in their order, inside a root
     * task on a pool of one thread of its own, and waits for it; answers the
     * first.  The classes are a program's component classes.  A component
     * class's initializer fills each numeral's place by its coercion, whose
     * body may start tasks: a task's constructor asks for the thread's
     * current task, so the initializer needs a worker thread that has one.
     * The pool has one thread, so no other worker takes a task that the
     * initializer forked: that worker would call into the class and wait for
     * its initialization, while the initializer waits to join the task.  The
     * initializer joins each task that it forked by running it in place.
     * What a load or an initialization throws is thrown here unchanged.
     */
    public static Class<?> initializeInRootTask(final String[] names, final ClassLoader loader)
            throws ClassNotFoundException {
        final Class<?>[] loaded = new Class<?>[1];
        final Throwable[] thrown = new Throwable[1];
        FortressTaskRunnerGroup pool = new FortressTaskRunnerGroup(1);
        try {
            pool.invoke(new BaseTask() {
                public void compute() {
                    BaseTask.setTask(this);
                    try {
                        for (String name : names) {
                            Class<?> c = Class.forName(name, true, loader);
                            if (loaded[0] == null) loaded[0] = c;
                        }
                    } catch (Throwable t) {
                        thrown[0] = t;
                    }
                }
            });
        } finally {
            pool.shutdown();
        }
        Throwable t = thrown[0];
        if (t instanceof ClassNotFoundException) throw (ClassNotFoundException) t;
        if (t instanceof Error) throw (Error) t;
        if (t instanceof RuntimeException) throw (RuntimeException) t;
        if (t != null) throw new RuntimeException(t);
        return loaded[0];
    }

    /**
     * Should simply call through to static run() method in the
     * implementing class.  run() used to be an abstract method here,
     * but that requires us to make it non-static and thus totally
     * unlike every single other top-level function that we codegen.
     */
    public abstract void compute();

}
