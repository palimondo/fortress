package com.sun.fortress.interpreter.glue.prim;

import static com.sun.fortress.exceptions.ProgramError.error;
import com.sun.fortress.compiler.runtimeValues.FortressBufferedWriter;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.types.FTypeObject;
import com.sun.fortress.interpreter.evaluator.values.FNativeObject;
import com.sun.fortress.interpreter.evaluator.values.FValue;
import com.sun.fortress.interpreter.evaluator.values.NativeConstructor;
import com.sun.fortress.nodes.ObjectConstructor;

import java.util.List;

/**
 * The native constructor of FortressBuiltin's private object JavaBufferedWriterObject, which extends
 * FortressLibrary's trait JavaBufferedWriter.  Walk carries a JavaBufferedWriter in a Java
 * FortressBufferedWriter (StaticNativeApp); a helper's FortressBufferedWriter becomes a Value of this
 * object, as an int becomes an FInt of the object Int below ZZ32.  No program makes one: the
 * constructor registers itself when its component's environment is built, so that the loader can box
 * a helper's result.  The object's own singleton, which walk makes as it initialises the component,
 * holds no writer, and the loader passes it to no helper.
 */
public class JavaBufferedWriterObject extends NativeConstructor {
    private static volatile NativeConstructor con = null;

    public JavaBufferedWriterObject(Environment env, FTypeObject selfType, ObjectConstructor def) {
        super(env, selfType, def);
        con = this;
    }

    @Override
    protected FNativeObject makeNativeObject(List<FValue> args, NativeConstructor c) {
        return new Value(c, null);
    }

    /** The walk value that carries w. */
    public static Value make(FortressBufferedWriter w) {
        if (con == null) return error("JavaBufferedWriterObject is not registered");
        return new Value(con, w);
    }

    /** A walk value of JavaBufferedWriter: a FortressBufferedWriter. */
    public static final class Value extends FNativeObject {
        private final NativeConstructor made;
        private final FortressBufferedWriter writer;

        Value(NativeConstructor made, FortressBufferedWriter writer) {
            super(made);
            this.made = made;
            this.writer = writer;
        }

        /** The Java writer; the singleton has none. */
        public FortressBufferedWriter getWriter() {
            return writer == null ? (FortressBufferedWriter) error("No Java writer is held by " + getString()) : writer;
        }

        @Override
        public NativeConstructor getConstructor() {
            return made;
        }

        @Override
        public String getString() {
            return writer == null ? "JavaBufferedWriterObject" : writer.toString();
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
