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

    private void TXAbort() {
        if (debug) debug("TXAbort");
        throw new TransactionAbortException();
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

    private Any TXReadLocation(Object v) {

        Any val = committedValue(v);

        while (snapshot.get() != global_lock.get()) {
            snapshot.set(TXValidate());
            val = committedValue(v);
        }
        Any AncestrialValue = AncestrialWrite(v);
        if (AncestrialValue != null) {
            if (debug) debug("TXRead: v = " + v + " ancestrial val = " + AncestrialValue );
            reads.put(v,AncestrialValue);
            return AncestrialValue;
        } else {
            if (debug) debug("TXRead: v = " + v + " val = " + val);
            if (val == null) return null;  // an element that holds nothing yet: the store refuses the read
            reads.put(v, val);
            return val;
        }
    }

    public int TXValidateHelper() {
        if (this == topLevelTransaction) 
            return TXValidateHelperTopLevelTransaction();
        else return TXValidateHelperNestedTransaction();
    }
     
    public int TXValidateHelperTopLevelTransaction() {
        int time = waitForGlobalLock();
        if (debug) debug("TXValidateTopLevel: time = " + time);

        for (Map.Entry<Object,Any> entry : reads.entrySet()) {
            Object key = entry.getKey();
            Any val = entry.getValue();
            if (debug) debug("TXValidate: key = " + key + " val = " + val);
            if (committedValue(key) != val)
                TXAbort();
        }

        if (time == waitForGlobalLock())
            return time;
        else return TXValidateHelper();

    }

    public int TXValidateHelperNestedTransaction() {
        int time = waitForGlobalLock();
        if (debug) debug("TXValidateNested: time = " + time);
        for (Map.Entry<Object,Any> entry : reads.entrySet()) {
            Object key = entry.getKey();
            Any val = entry.getValue();
            Any ancestrialWrite = parent.AncestrialWrite(key);
            if (debug) debug("TXValidateNested: key = " + key + " val = " + val + " ancestrialWrite = " + ancestrialWrite);
            if (ancestrialWrite == null) {
                if (committedValue(key) != val)
                    TXAbort();
            } else {
                if (ancestrialWrite != val)
                    TXAbort();
            }
        }

        if (time == waitForGlobalLock())
            return time;
        else return TXValidateHelper();

    }

    public int TXValidate() {
        int time = TXValidateHelper();
        if ((time & 1) != 0)
            throw new RuntimeException(Thread.currentThread().getName() + " TXValidate should always be even");
        return time;
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
    
    public void TXCommit() {
        if (debug) debug("TXCommit: reads = " + reads + " writers = " + writes);
        if (writes.isEmpty())
            return;

        int time = snapshot.get();
            
        while (! getGlobalLock(time)) {
            time = TXValidate();
            if (debug) debug("TXCommitFail: time " + time);
            snapshot.set(time);
        }
            
        if (this == topLevelTransaction) {
       
            for (Map.Entry<Object,Any> entry : writes.entrySet()) {
                Object key = entry.getKey();
                Any val = entry.getValue();
                if (debug) debug("TXCommitting:  time = " + time + " key = " + key + " val = " + val);
                commitValue(key, val);
            }
       
        } else {

            for (Map.Entry<Object,Any> entry : reads.entrySet()) {
                Object key = entry.getKey();
                Any val = entry.getValue();
                Any ancestrialValue = parent.AncestrialWrite(key);

                // This is subtle.  If the child read a value written by a grandparent, then it has to go in the 
                // the parent's read set, because otherwise a cousin transaction could update the value written
                // in the grandparent and the parent transaction wouldn't know to abort.
                if (parent.writes.get(key) == null) {
                    parent.reads.put(key, val);
                    if (debug) debug("TXCommitting: read to parent without ancestrial write: snapshot = " + snapshot + " time = " + time + " key = " + key + " val = " + val);
                }
            }


            for (Map.Entry<Object,Any> entry : writes.entrySet()) {
                Object key = entry.getKey();
                Any val = entry.getValue();
                parent.writes.put(key, val);
                if (debug) debug("TXCommitting: write to parent: snapshot = " + snapshot.get() + " time = " + time + " key = " + key + " val = " + val);
            }
        }

        if (! releaseGlobalLock(time+1))
            throw new RuntimeException("Who messed with a committing transaction?");
    }

}