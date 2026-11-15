/*******************************************************************************
 Copyright 2008,2009, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/
package com.sun.fortress.interpreter.evaluator.values;

import com.sun.fortress.exceptions.ProgramError;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.EvaluatorBase;
import com.sun.fortress.interpreter.evaluator.types.FType;
import com.sun.fortress.interpreter.evaluator.types.FTypeArrow;
import com.sun.fortress.interpreter.evaluator.types.FTypeGenericArrow;
import com.sun.fortress.nodes.StaticParam;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.useful.BATreeEC;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

abstract public class GenericFunctionOrConstructor extends SingleFcn
        implements GenericFunctionOrMethod, FTypeGenericArrow.Source {

    BATreeEC<List<FValue>, List<FType>, Simple_fcn> cache =
            new BATreeEC<List<FValue>, List<FType>, Simple_fcn>(Numerals.keys);

    volatile Simple_fcn symbolicInstantiation;

    public GenericFunctionOrConstructor(Environment within) {
        super(within);
        // TODO Auto-generated constructor stub
    }

    @Override
    public boolean needsInference() {
        return true;
    }

    /**
     * The type of the function as a value that no place of arrow type has
     * received yet (FTypeGenericArrow).
     */
    private volatile FType genericType;

    /** The instance received at each arrow type asked for; NONE where there is none. */
    private final ConcurrentHashMap<FTypeArrow, Object> receivedInstances = new ConcurrentHashMap<FTypeArrow, Object>();

    private static final Object NONE = new Object();

    @Override
    public FType type() {
        FType t = genericType;
        if (t == null) {
            synchronized (this) {
                if (genericType == null) {
                    StringBuilder sb = new StringBuilder(asMethodName()).append("[\\");
                    String sep = "";
                    for (StaticParam sp : getStaticParams()) {
                        sb.append(sep).append(NodeUtil.getName(sp));
                        sep = ", ";
                    }
                    genericType = new FTypeGenericArrow(sb.append("\\]").toString(), this);
                }
                t = genericType;
            }
        }
        return t;
    }

    /**
     * The instance of the function that a place of the arrow type a
     * receives: the one a direct call with arguments of a's domain types
     * runs, where its type is a subtype of a; null where a leaves a static
     * parameter of the function open (EvaluatorBase.leavesOpen), and where
     * no instance fits.
     */
    public Simple_fcn instanceAt(FTypeArrow a) {
        Object o = receivedInstances.get(a);
        if (o == null) {
            Simple_fcn inst = EvaluatorBase.instanceReceivedAt(this, a);
            o = inst == null ? NONE : inst;
            receivedInstances.put(a, o);
        }
        return o == NONE ? null : (Simple_fcn) o;
    }

    /**
     * A place of the arrow type a receives the function where a fixes an
     * instance of it (instanceAt), and where a leaves a static parameter
     * open: the value then stays generic, and its first application fixes
     * its static arguments, as a direct call does.
     */
    public boolean receivedAt(FTypeArrow a) {
        return EvaluatorBase.leavesOpen(this, a) || instanceAt(a) != null;
    }

    @Override
    public List<FType> getDomain() {
        return getSymbolic().getDomain();

    }

    @Override
    public FType getRange() {
        return getSymbolic().getRange();

    }

    @Override
    public FValue applyInnerPossiblyGeneric(List<FValue> args) {
        Simple_fcn foo = cache.get(args);
        if (foo == null) {
            foo = EvaluatorBase.inferAndInstantiateGenericFunction(args, this, getWithin());
            cache.syncPut(args, foo);
        }
        return foo.applyInnerPossiblyGeneric(args);
    }


    abstract protected Simple_fcn getSymbolic() throws Error, ProgramError;

}
