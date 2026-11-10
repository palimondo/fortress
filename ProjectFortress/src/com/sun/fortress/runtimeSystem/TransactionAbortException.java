/********************************************************************************
 Copyright 2013, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ********************************************************************************/

package com.sun.fortress.runtimeSystem;

/**
 * Abandons a transaction: the atomic block that began it discards its writes and starts again.
 * A failed validation names the transaction whose read failed, which can be an ancestor of the one
 * that found it; a block's handler starts only its own transaction again and passes any other
 * abort outward.  The abort() of a program names none, and the innermost block takes it.
 */
public class TransactionAbortException extends RuntimeException {

    private final Transaction transaction;

    public TransactionAbortException() {
        this.transaction = null;
    }

    public TransactionAbortException(Transaction transaction) {
        this.transaction = transaction;
    }

    /**
     * The copy that the join of a task makes on the joining thread, with the task's exception as
     * its cause (java.util.concurrent.ForkJoinTask): it names the transaction that the cause names.
     */
    public TransactionAbortException(Throwable cause) {
        super(cause);
        this.transaction = (cause instanceof TransactionAbortException)
            ? ((TransactionAbortException) cause).transaction : null;
    }

    /** The transaction to start again, or null for the innermost one. */
    public Transaction transaction() {
        return transaction;
    }
}
