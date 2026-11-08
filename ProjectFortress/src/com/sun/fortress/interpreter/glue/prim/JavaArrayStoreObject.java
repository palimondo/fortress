package com.sun.fortress.interpreter.glue.prim;

import static com.sun.fortress.exceptions.ProgramError.error;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.transactions.AtomicArray;
import com.sun.fortress.interpreter.evaluator.types.FTypeObject;
import com.sun.fortress.interpreter.evaluator.values.FNativeObject;
import com.sun.fortress.interpreter.evaluator.values.FValue;
import com.sun.fortress.interpreter.evaluator.values.NativeConstructor;
import com.sun.fortress.nodes.ObjectConstructor;

import java.util.List;

/**
 * The native constructor of FortressBuiltin's private object JavaArrayStoreObject, which extends
 * FortressLibrary's trait JavaArrayStore.  Its value is walk's store of an array's elements, an
 * AtomicArray, a transactional cell for each element, as the native object PrimitiveArray's value was.
 * The trait's factory makes one through ArrayOps.make; the object's own singleton, which walk makes as it
 * initialises the component, is an empty store that no array holds.
 */
public class JavaArrayStoreObject extends NativeConstructor {
    private static volatile NativeConstructor con = null;

    public JavaArrayStoreObject(Environment env, FTypeObject selfType, ObjectConstructor def) {
        super(env, selfType, def);
        con = this;
    }

    @Override
    protected FNativeObject makeNativeObject(List<FValue> args, NativeConstructor c) {
        return new AtomicArray(c, 0);
    }

    /** A new store of size elements, none initialised. */
    public static FValue make(int size) {
        if (con == null) return error("JavaArrayStoreObject is not registered");
        return new AtomicArray(con, size);
    }

    @Override
    protected void unregister() {
        con = null;
    }
}
