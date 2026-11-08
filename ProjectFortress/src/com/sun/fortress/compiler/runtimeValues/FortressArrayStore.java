package com.sun.fortress.compiler.runtimeValues;

import java.lang.invoke.MethodHandles;
import java.lang.invoke.VarHandle;

import com.sun.fortress.runtimeSystem.BaseTask;
import com.sun.fortress.runtimeSystem.FortressTaskRunner;
import com.sun.fortress.runtimeSystem.Transaction;

import fortress.AnyType.Any;

/**
 * The compiled store of an array's elements, which FortressLibrary's trait JavaArrayStore names through
 * the helpers of nativeHelpers.arrayOps: an Object[] of the elements, each a Fortress value.  Inside a
 * transaction, a read, a write and an initialisation of an element go through the transaction, which
 * keys the element by the array and the index (Transaction.TXReadSlot and TXWriteSlot), as compiled code
 * sends a mutable variable's cell through it; outside one, they read and write the element with a
 * cell's volatile semantics.  An element is initialised once: a second initialisation leaves the first
 * value and answers false.  A read of an element that holds nothing raises IllegalStateException.
 */
public final class FortressArrayStore {
    private static final VarHandle ELEMENT = MethodHandles.arrayElementVarHandle(Object[].class);

    private final Object[] elements;

    public FortressArrayStore(int size) {
        elements = new Object[size];
    }

    public int size() {
        return elements.length;
    }

    /** The transaction of the current compiled task, or null outside one and off the compiled pool. */
    private static Transaction transaction() {
        return Thread.currentThread() instanceof FortressTaskRunner ? BaseTask.getCurrentTransaction() : null;
    }

    /** A transaction stores its writes when it commits, so an index is checked before it is written. */
    private void checkIndex(int i) {
        if (i < 0 || i >= elements.length)
            throw new ArrayIndexOutOfBoundsException("Index " + i + " out of bounds for length " + elements.length);
    }

    public Object get(int i) {
        Transaction t = transaction();
        Object r = t == null ? ELEMENT.getVolatile(elements, i) : t.TXReadSlot(elements, i);
        if (r == null) throw new IllegalStateException("Access to uninitialized element " + i + " of an array");
        return r;
    }

    public void put(int i, Object v) {
        checkIndex(i);
        Transaction t = transaction();
        if (t == null) ELEMENT.setVolatile(elements, i, v);
        else t.TXWriteSlot(elements, i, (Any) v);
    }

    /** Initialises element i to v where it holds nothing yet, and answers whether it did. */
    public boolean init(int i, Object v) {
        checkIndex(i);
        Transaction t = transaction();
        if (t == null) return ELEMENT.compareAndSet(elements, i, null, v);
        if (t.TXReadSlot(elements, i) != null) return false;
        t.TXWriteSlot(elements, i, (Any) v);
        return true;
    }

    public String toString() {
        return "[array store of " + elements.length + "]";
    }
}
