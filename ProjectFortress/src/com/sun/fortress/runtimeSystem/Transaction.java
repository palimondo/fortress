/*******************************************************************************
    Copyright 2012, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/
package com.sun.fortress.runtimeSystem;

import java.lang.invoke.MethodHandles;
import java.lang.invoke.VarHandle;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.Hashtable;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Stack;

import com.sun.fortress.compiler.runtimeValues.MutableFValue;
import com.sun.fortress.compiler.runtimeValues.RTTI;
import fortress.AnyType.Any;

public class Transaction {

    /**
     * A location that a transaction reads and writes: a cell, the MutableFValue of a mutable variable,
     * or a Slot, one element of the Object[] of a compiled array store.  The read and write sets key
     * both kinds; a slot is its array and its index.
     */
    static final class Slot {
        private static final VarHandle ELEMENT = MethodHandles.arrayElementVarHandle(Object[].class);

        final Object[] array;
        final int index;

        Slot(Object[] array, int index) {
            this.array = array;
            this.index = index;
        }

        /** The element, read with the memory semantics of a cell's volatile value. */
        Any getValue() {
            return (Any) ELEMENT.getVolatile(array, index);
        }

        void setValue(Any v) {
            ELEMENT.setVolatile(array, index, v);
        }

        public boolean equals(Object o) {
            return o instanceof Slot && ((Slot) o).array == array && ((Slot) o).index == index;
        }

        public int hashCode() {
            return System.identityHashCode(array) * 31 + index;
        }

        public String toString() {
            return "Slot " + index + " of array@" + Integer.toHexString(System.identityHashCode(array));
        }
    }

    /** The committed value of a location, a cell or a slot. */
    private static Any committedValue(Object location) {
        if (location instanceof Slot) return ((Slot) location).getValue();
        return ((MutableFValue) location).getValue();
    }

    private static void commitValue(Object location, Any v) {
        if (location instanceof Slot) ((Slot) location).setValue(v);
        else ((MutableFValue) location).setValue(v);
    }

    /** What a read set holds for the read of an element that held nothing, since it holds no null. */
    private static final Any EMPTY = new Any() {
        public RTTI getRTTI() { return null; }
        public String toString() { return "an empty element"; }
    };

    private Transaction parent;
    private static AtomicInteger global_lock = new AtomicInteger(0);
    private AtomicInteger snapshot;
    Hashtable<Object, Any> reads;
    Hashtable<Object, Any> writes;
    private Transaction topLevelTransaction;
    private static boolean debug = false;
    private static AtomicInteger counter = new AtomicInteger(0);
    private int transactionNumber;

    private String ancestrialString() {
        Transaction current = this;
        Stack transactionHistory = new Stack();
        while (current != null) {
            transactionHistory.push(current.transactionNumber);
            current = current.parent;
        }

        String result = "";
        Boolean first = true;
        while (!transactionHistory.empty()) {
            if (first) {
                result = result + transactionHistory.pop();
                first = false;
            } else {
                result = result +  ":=>" + transactionHistory.pop();
            }
        }
        return result;
    }
        

    private void debug(String s) {
        if (debug)
            System.out.println("TransactionDebug: " + Thread.currentThread().getName() + " Transaction: " + ancestrialString() + " : " +  s);
    }

    public String toString() {
        return "Transaction: " + transactionNumber + " parent = " + parent;
    }

    public Transaction getParent() {
        return parent;
    }

    private static boolean globalLockHeld() {
        return ((global_lock.get() & 1) != 0);
    }

    private static boolean globalLockFree() {
        return !globalLockHeld();
    }

    public boolean isTopLevelTransaction() {
        if (parent == null)
            return true;
        else return false;
    }

    private static int waitForGlobalLock() {
        int temp = global_lock.get();
        while ((temp & 1) != 0)
            temp = global_lock.get();
        return temp;
    }

    private static boolean getGlobalLock(int i) {
        if (( i & 1) == 0)
            return global_lock.compareAndSet(i, i+1);
        else throw new RuntimeException(Thread.currentThread().getName() + "Tried to get an already held lock");
    }

    private static boolean releaseGlobalLock(int i) {
        if ((i & 1) != 0)
            return global_lock.compareAndSet(i, i+1);
        else throw new RuntimeException(Thread.currentThread().getName() + "Tried to release unheld lock");
    }

    private static int snapshotGlobalLock() {
        int time = global_lock.get();
        while ((time & 1) != 0)
            time = global_lock.get();
        return time;
    }

    private Transaction(Transaction parent) {
        this.parent = parent;
        this.snapshot = new AtomicInteger(parent.snapshot.get());
        this.reads = new Hashtable<Object, Any>();
        this.writes = new Hashtable<Object, Any>();
        this.topLevelTransaction = parent.topLevelTransaction;
        this.transactionNumber = counter.getAndIncrement();
    }

    private Transaction(int snapshot) {
        this.parent = null;
        this.snapshot = new AtomicInteger(snapshot);
        this.reads = new Hashtable<Object, Any>();
        this.writes = new Hashtable<Object, Any>();
        this.topLevelTransaction = this;
        this.transactionNumber = counter.getAndIncrement();
    }        

    /** Abandons this transaction, whose read failed: the block that began it starts again. */
    private void TXAbort() {
        if (debug) debug("TXAbort");
        throw new TransactionAbortException(this);
    }

    public static Transaction TXBegin(Transaction parent) {
        Transaction result;
        if (parent == null) {
            result = new Transaction(snapshotGlobalLock());
        } else {
            result = new Transaction(parent);
            //throw new RuntimeException(Thread.currentThread().getName() + ": Only single level transactions for now");
        }
        if (debug) result.debug("TXBegin:");
        return result;
    }

    private Any AncestrialWrite(Object v) {
        if (writes.containsKey(v))
            return writes.get(v);
        else if (parent == null)
            return null;
        else return parent.AncestrialWrite(v);
    }

    public Any TXRead(MutableFValue v) {
        return TXReadLocation(v);
    }

    /** A read of element index of a compiled array store's array; null where the element holds nothing. */
    public Any TXReadSlot(Object[] array, int index) {
        return TXReadLocation(new Slot(array, index));
    }

    /**
     * A read of a location.  A read of this transaction's own write is no read of the committed state
     * and records nothing.  Any other read is recorded with what it saw, an ancestor's write or the
     * committed value, for the validation to compare; an element that held nothing is recorded as
     * EMPTY.  The threads of one block share its sets, so the read and its record are one step under
     * the read set's lock, which a validation holds while it iterates.  No thread waits for the global
     * lock while it holds a set's lock, since a commit takes the sets' locks while it holds the global one.
     */
    private Any TXReadLocation(Object v) {
        Any own = writes.get(v);
        if (own != null) {
            if (debug) debug("TXRead: v = " + v + " own val = " + own);
            return own;
        }
        while (true) {
            if (snapshot.get() != global_lock.get())
                snapshot.set(TXValidate());
            synchronized (reads) {
                Any val = (parent == null) ? null : parent.AncestrialWrite(v);
                if (val == null)
                    val = committedValue(v);
                if (snapshot.get() != global_lock.get())
                    continue;           // a commit began meanwhile: validate, and read again
                if (debug) debug("TXRead: v = " + v + " val = " + val);
                reads.put(v, val == null ? EMPTY : val);
                return val;             // null for an element that holds nothing yet: the store refuses the read
            }
        }
    }

    /**
     * Compares each read of this transaction with what the location holds now for it: the write of
     * the nearest ancestor that wrote it, else the committed value.  A read that differs abandons
     * this transaction.
     */
    private void validateReads() {
        synchronized (reads) {
            for (Map.Entry<Object,Any> entry : reads.entrySet()) {
                Object key = entry.getKey();
                Any val = entry.getValue();
                Any now = (parent == null) ? null : parent.AncestrialWrite(key);
                if (now == null)
                    now = committedValue(key);
                if (debug) debug("TXValidate: key = " + key + " val = " + val + " now = " + now);
                if (now != (val == EMPTY ? null : val))
                    TXAbort();
            }
        }
    }

    /**
     * Validates this transaction and each of its ancestors at one time of the global lock, and answers
     * that time.  A nested transaction runs on its ancestors' reads too, so a stale read of an ancestor
     * abandons that ancestor: the abort names it, and passes through the nested blocks' handlers.
     */
    public int TXValidate() {
        while (true) {
            int time = waitForGlobalLock();
            if (debug) debug("TXValidate: time = " + time);
            for (Transaction t = this; t != null; t = t.parent)
                t.validateReads();
            if (time == global_lock.get())
                return time;
        }
    }

    public void TXWrite(MutableFValue v, Any f) {
        if (debug) debug("TXWrite: v = " + v + " f = " + f + " reads.getValue = " + reads.get(v) + " writes.getValue = " + writes.get(v));
        writes.put(v, f);
    }

    /** A write of element index of a compiled array store's array, which the commit stores. */
    public void TXWriteSlot(Object[] array, int index, Any f) {
        Slot v = new Slot(array, index);
        if (debug) debug("TXWriteSlot: v = " + v + " f = " + f);
        writes.put(v, f);
    }
    
    /**
     * Commits.  A top-level transaction stores its writes; one that wrote nothing has nothing to do.
     * A nested transaction hands its parent its reads, also where it wrote nothing, and its writes.
     */
    public void TXCommit() {
        if (debug) debug("TXCommit: reads = " + reads + " writers = " + writes);
        if (parent == null && writes.isEmpty())
            return;
        handOver(true);
    }

    /**
     * Ends a transaction whose block an exception leaves.  Its writes are dropped with it.  The exception
     * was thrown on what a nested transaction read, so the parent takes those reads and answers for them
     * at its own commit; where they no longer hold, this aborts, and the block starts again.
     */
    void TXLeave() {
        if (debug) debug("TXLeave: reads = " + reads + " writers = " + writes);
        if (parent != null)
            handOver(false);
    }

    /** Under the global lock, taken at a time at which every read holds: the reads, and the writes if asked, go to the parent, or the writes to their locations. */
    private void handOver(boolean withWrites) {
        int time = snapshot.get();

        while (! getGlobalLock(time)) {
            time = TXValidate();
            if (debug) debug("TXCommitFail: time " + time);
            snapshot.set(time);
        }

        try {
            if (parent == null) {
                synchronized (writes) {
                    for (Map.Entry<Object,Any> entry : writes.entrySet()) {
                        Object key = entry.getKey();
                        Any val = entry.getValue();
                        if (debug) debug("TXCommitting:  time = " + time + " key = " + key + " val = " + val);
                        commitValue(key, val);
                    }
                }
            } else {
                synchronized (reads) {
                    for (Map.Entry<Object,Any> entry : reads.entrySet()) {
                        Object key = entry.getKey();
                        Any val = entry.getValue();

                        // This is subtle.  If the child read a value written by a grandparent, then it has to go in the
                        // the parent's read set, because otherwise a cousin transaction could update the value written
                        // in the grandparent and the parent transaction wouldn't know to abort.
                        if (parent.writes.get(key) == null) {
                            parent.reads.put(key, val);
                            if (debug) debug("TXCommitting: read to parent without ancestrial write: snapshot = " + snapshot + " time = " + time + " key = " + key + " val = " + val);
                        }
                    }
                }

                if (withWrites) {
                    synchronized (writes) {
                        for (Map.Entry<Object,Any> entry : writes.entrySet()) {
                            Object key = entry.getKey();
                            Any val = entry.getValue();
                            parent.writes.put(key, val);
                            if (debug) debug("TXCommitting: write to parent: snapshot = " + snapshot.get() + " time = " + time + " key = " + key + " val = " + val);
                        }
                    }
                }
            }
        } finally {
            if (! releaseGlobalLock(time+1))
                throw new RuntimeException("Who messed with a committing transaction?");
        }
    }

}