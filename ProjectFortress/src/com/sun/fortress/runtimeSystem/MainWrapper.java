/*******************************************************************************
    Copyright 2009,2011, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

******************************************************************************/
package com.sun.fortress.runtimeSystem;

import java.lang.reflect.InvocationTargetException;

import com.sun.fortress.useful.Useful;

public class MainWrapper {

    public static ClassLoader icl = InstantiatingClassloader.ONLY;
;
    public static String[] cachedArgs;
    
    /**
     * The named component class, loaded and initialized by
     * FortressExecutable.initializeInRootTask, and after it the class of each
     * component that it imports, at any depth.  The class loader has its own
     * copies of the run time's classes, of the task pool and of BaseTask
     * among them, so the call goes through icl.
     */
    private static Class initializeInRootTask(String name)
            throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException {
        String[] names = InstantiatingClassloader.ONLY.componentClasses(name).toArray(new String[0]);
        Class executable = Class.forName("com.sun.fortress.runtimeSystem.FortressExecutable", true, icl);
        java.lang.reflect.Method init = executable.getMethod("initializeInRootTask", String[].class, ClassLoader.class);
        try {
            return (Class) init.invoke(null, names, icl);
        } catch (InvocationTargetException e) {
            // What the class's load or initialization threw, as main threw it
            // when it loaded the class itself.
            Throwable t = e.getCause();
            if (t instanceof ClassNotFoundException) throw (ClassNotFoundException) t;
            if (t instanceof Error) throw (Error) t;
            if (t instanceof RuntimeException) throw (RuntimeException) t;
            throw new RuntimeException(t);
        }
    }

    /**
     * @param args
     * @throws ClassNotFoundException
     */
    public static void main(String[] args) {
        int l = args.length;
        if (l == 0) {
            System.err.println("The wrapper class needs the name of a class to run.");
            return;
        }

        String[] subargs = new String[l-1];
        System.arraycopy(args, 1, subargs, 0, l-1);

        String whatToRun = args[0];

        if (whatToRun.indexOf('\\') >= 0 ||
            whatToRun.indexOf('/') >= 0) {
            if (whatToRun.endsWith(".class")) {
                /* If . is on the classpath, which is common, this allows
                 * use of filename completion to locate the file, if it is
                 * not cached.
                 */
                whatToRun = Useful.substring(whatToRun, 0, -6);
            }
            /*
             * Graceful behavior on windows REQUIRES handling both / and \
             * as pathname separators; both work at the OS level.
             * This does inhibit use of backslashes in the names of classes
             * on Unix machines, but such classfile names are not portable to
             * windows, and are also very rare.
             */
            whatToRun = sepToDot(whatToRun);
        }


        try {
            String cp = System.getProperty("java.class.path");
            
            // ensure that FortressExecutable is loaded and statically initialized
            // so that there is a task pool before any user code is run.
            // The component class is initialized inside a root task on a pool
            // of one thread of its own: its initializer runs user code, the
            // coercion of each numeral's place, which may start tasks.
            // The program's arguments are set first: a component's
            // top-level variable may read them as its class is initialized.
            cachedArgs = subargs;
            Class cl = initializeInRootTask(whatToRun);
            java.lang.reflect.Method m = cl.getDeclaredMethod("main");
            try {
                m.invoke(null);
            } finally {
                InstantiatingClassloader.exitProgram();
            }
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            System.err.println("Could not load " + whatToRun);
            e.printStackTrace();
            System.exit(1);
        } catch (SecurityException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            System.exit(1);
        } catch (NoSuchMethodException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            System.exit(1);
        } catch (IllegalArgumentException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            System.exit(1);
        } catch (IllegalAccessException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            System.exit(1);
        } catch (InvocationTargetException e) {
            // TODO Auto-generated catch block
            e.getCause().printStackTrace();
            System.exit(1);
//        } catch (NoSuchFieldException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//            System.exit(1);
        }

    }

    /**
     * @param filepath
     * @return
     */
    public static String sepToDot(String filepath) {
        filepath = filepath.replace('/', '.');
        filepath = filepath.replace('\\', '.');
        return filepath;
    }

}
