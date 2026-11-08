package com.sun.fortress.interpreter.glue.prim;

import static com.sun.fortress.exceptions.ProgramError.error;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.types.FTypeObject;
import com.sun.fortress.interpreter.evaluator.values.FNativeObject;
import com.sun.fortress.interpreter.evaluator.values.FValue;
import com.sun.fortress.interpreter.evaluator.values.NativeConstructor;
import com.sun.fortress.nodes.ObjectConstructor;

import java.util.List;

/**
 * The native constructor of FortressBuiltin's private object JavaRR64ArrayStoreObject, which extends
 * FortressLibrary's trait JavaRR64ArrayStore.  Its value holds a double[], as the native object
 * PrimImmutableRR64Array's value did.  The trait's factory makes one through ArrayOps.makeRR64; the
 * object's own singleton is an empty store.
 */
public class JavaRR64ArrayStoreObject extends NativeConstructor {
    private static volatile NativeConstructor con = null;

    public JavaRR64ArrayStoreObject(Environment env, FTypeObject selfType, ObjectConstructor def) {
        super(env, selfType, def);
        con = this;
    }

    @Override
    protected FNativeObject makeNativeObject(List<FValue> args, NativeConstructor c) {
        return new Value(c, 0);
    }

    /** A new store of size elements, each 0.0. */
    public static FValue make(int size) {
        if (con == null) return error("JavaRR64ArrayStoreObject is not registered");
        return new Value(con, size);
    }

    /** A walk value of JavaRR64ArrayStore: a double[]. */
    public static final class Value extends FNativeObject {
        private final NativeConstructor made;
        final double[] contents;

        Value(NativeConstructor made, int size) {
            super(made);
            this.made = made;
            this.contents = new double[size];
        }

        @Override
        public NativeConstructor getConstructor() {
            return made;
        }

        @Override
        public boolean seqv(FValue v) {
            return v == this;
        }
    }

    @Override
    protected void unregister() {
        con = null;
    }
}
