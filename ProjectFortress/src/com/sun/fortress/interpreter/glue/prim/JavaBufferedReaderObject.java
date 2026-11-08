package com.sun.fortress.interpreter.glue.prim;

import static com.sun.fortress.exceptions.ProgramError.error;
import com.sun.fortress.compiler.runtimeValues.FortressBufferedReader;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.types.FTypeObject;
import com.sun.fortress.interpreter.evaluator.values.FNativeObject;
import com.sun.fortress.interpreter.evaluator.values.FValue;
import com.sun.fortress.interpreter.evaluator.values.NativeConstructor;
import com.sun.fortress.nodes.ObjectConstructor;

import java.util.List;

/**
 * The native constructor of FortressBuiltin's private object JavaBufferedReaderObject, which extends
 * FortressLibrary's trait JavaBufferedReader.  Walk carries a JavaBufferedReader in a Java
 * FortressBufferedReader (StaticNativeApp); a helper's FortressBufferedReader becomes a Value of this
 * object, as an int becomes an FInt of the object Int below ZZ32.  No program makes one: the
 * constructor registers itself when its component's environment is built, so that the loader can box
 * a helper's result.  The object's own singleton, which walk makes as it initialises the component,
 * holds no reader, and the loader passes it to no helper.
 */
public class JavaBufferedReaderObject extends NativeConstructor {
    private static volatile NativeConstructor con = null;

    public JavaBufferedReaderObject(Environment env, FTypeObject selfType, ObjectConstructor def) {
        super(env, selfType, def);
        con = this;
    }

    @Override
    protected FNativeObject makeNativeObject(List<FValue> args, NativeConstructor c) {
        return new Value(c, null);
    }

    /** The walk value that carries r. */
    public static Value make(FortressBufferedReader r) {
        if (con == null) return error("JavaBufferedReaderObject is not registered");
        return new Value(con, r);
    }

    /** A walk value of JavaBufferedReader: a FortressBufferedReader. */
    public static final class Value extends FNativeObject {
        private final NativeConstructor made;
        private final FortressBufferedReader reader;

        Value(NativeConstructor made, FortressBufferedReader reader) {
            super(made);
            this.made = made;
            this.reader = reader;
        }

        /** The Java reader; the singleton has none. */
        public FortressBufferedReader getReader() {
            return reader == null ? (FortressBufferedReader) error("No Java reader is held by " + getString()) : reader;
        }

        @Override
        public NativeConstructor getConstructor() {
            return made;
        }

        @Override
        public String getString() {
            return reader == null ? "JavaBufferedReaderObject" : reader.toString();
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
