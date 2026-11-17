package com.sun.fortress.runtimeSystem;

import com.sun.fortress.compiler.runtimeValues.FValue;

/**
 * The abrupt completion of a compiled exit expression
 * (Specification/basic/expressions/label.tex, section "Label and Exit").
 * It names the evaluation of the label block that it leaves, and carries
 * the value of its with clause.  It is no FException, so that no catch
 * clause of a try takes it.  It has no constructor of no argument or of one
 * Throwable, so that a join of a forked task throws this object itself, and
 * not a copy made by reflection.
 */
public final class LabelExit extends Error {

    /** One evaluation of a label block.  A function expression or a task
     *  made in the block holds it as it holds an immutable variable of
     *  the block, so it is a Fortress value. */
    public static final class Target extends FValue {
        public Target() { super(); }
    }

    private final Object target;
    private final Object value;

    private LabelExit(Object value, Object target) {
        // Control flow: no cause and no stack trace.  The message is read
        // only where the exit runs after its label block has completed,
        // and so ends the program.
        super("exit from a label block that has completed", null, false, false);
        this.value = value;
        this.target = target;
    }

    /** The exit that leaves the evaluation target with value. */
    public static LabelExit of(Object value, Object target) {
        return new LabelExit(value, target);
    }

    /** The value of this exit where it leaves the evaluation target; an
     *  exit that leaves another evaluation is thrown on. */
    public Object valueAt(Object target) {
        if (this.target == target) return value;
        throw this;
    }
}
