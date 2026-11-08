package com.sun.fortress.nativeHelpers;

import com.sun.fortress.compiler.runtimeValues.FortressArrayStore;
import com.sun.fortress.compiler.runtimeValues.FortressRR64ArrayStore;

/**
 * The helpers of FortressLibrary's array stores: JavaArrayStore, over a FortressArrayStore, and
 * JavaRR64ArrayStore, over a FortressRR64ArrayStore.  The checker reads the two classes as the two
 * traits (NamingCzar's table of the one library's foreign types).  Walk answers each of these names with
 * the operation of the same name of its own store, an AtomicArray or a double[]
 * (interpreter/glue/NativeApp.java, interpreter/glue/prim/ArrayOps.java), and never calls them.
 */
public class arrayOps {

    public static FortressArrayStore make(int size) {
        return new FortressArrayStore(size);
    }

    public static Object get(FortressArrayStore s, int i) {
        return s.get(i);
    }

    public static void put(FortressArrayStore s, int i, Object v) {
        s.put(i, v);
    }

    public static boolean init(FortressArrayStore s, int i, Object v) {
        return s.init(i, v);
    }

    public static FortressRR64ArrayStore makeRR64(int size) {
        return new FortressRR64ArrayStore(size);
    }

    public static double getRR64(FortressRR64ArrayStore s, int i) {
        return s.get(i);
    }

    public static boolean initRR64(FortressRR64ArrayStore s, int i, double v) {
        return s.init(i, v);
    }
}
