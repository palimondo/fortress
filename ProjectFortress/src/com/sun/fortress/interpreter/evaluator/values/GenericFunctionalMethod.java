/*******************************************************************************
    Copyright 2008,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

******************************************************************************/

package com.sun.fortress.interpreter.evaluator.values;

import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.types.FTraitOrObjectOrGeneric;
import com.sun.fortress.interpreter.evaluator.types.FType;
import com.sun.fortress.interpreter.evaluator.types.FTypeGeneric;
import com.sun.fortress.nodes.FnDecl;
import com.sun.fortress.nodes.StaticParam;
import com.sun.fortress.nodes.WhereClause;
import com.sun.fortress.nodes_util.ErrorMsgMaker;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.useful.Useful;
import edu.rice.cs.plt.tuple.Option;

import java.util.ArrayList;
import java.util.List;

public class GenericFunctionalMethod extends FGenericFunction implements HasSelfParameter {


    int selfParameterIndex;
    private FTypeGeneric selfParameterType;

    public GenericFunctionalMethod(Environment e,
                                   FnDecl fndef,
                                   int self_parameter_index,
                                   FTypeGeneric self_parameter_type) {
        super(e, fndef);
        this.selfParameterIndex = self_parameter_index;
        this.selfParameterType = self_parameter_type;
    }

    @Override
    protected Simple_fcn newClosure(Environment clenv, List<FType> args) {
        // BUG IS HERE, NEED TO instantiate the selfParameterType! ;

        List<FType> traitArgs = args.subList(0, NodeUtil.getStaticParams(selfParameterType.getDef()).size());
        FTraitOrObjectOrGeneric instantiatedSelfType = ((FTypeGeneric) selfParameterType).make(traitArgs,
                                                                                              getFnDecl());

        List<FType> ownArgs = args.subList(traitArgs.size(), args.size());
        FunctionalMethod cl = FType.anyAreSymbolic(args) ?
                              new FunctionalMethodInstance(clenv,
                                                           fndef,
                                                           args,
                                                           this,
                                                           selfParameterIndex,
                                                           instantiatedSelfType) :
                              ownArgs.isEmpty() ?
                              new FunctionalMethod(clenv, fndef, args, selfParameterIndex, instantiatedSelfType) :
                              new OwnClosure(clenv, fndef, args, ownArgs, selfParameterIndex, instantiatedSelfType);
        cl.finishInitializing();
        return cl;
    }

    /**
     * An instance of a functional method with static parameters of its own:
     * it invokes the receiver's method at the method's static arguments
     * ownArgs, where the receiver's method is generic.
     */
    static class OwnClosure extends FunctionalMethod {
        private final List<FType> ownArgs;

        OwnClosure(Environment e,
                   FnDecl fndef,
                   List<FType> args,
                   List<FType> ownArgs,
                   int self_parameter_index,
                   FTraitOrObjectOrGeneric self_parameter_type) {
            super(e, fndef, args, self_parameter_index, self_parameter_type);
            this.ownArgs = new ArrayList<FType>(ownArgs);
        }

        @Override
        public MethodClosure getApplicableClosure(List<FValue> args) {
            DottedMethodApplication app = DottedMethodApplication.make(args.get(getSelfParameterIndex()),
                                                                       s(def),
                                                                       NodeUtil.nameAsMethod(getDef()));
            Method m = app.getMethod();
            if (!(m instanceof MethodInstance)) return super.getApplicableClosure(args);
            return (MethodClosure) ((MethodInstance) m).getGenerator().typeApply(ownArgs);
        }

        @Override
        public FValue applyInnerPossiblyGeneric(List<FValue> args) {
            return getApplicableClosure(args).applyInnerPossiblyGeneric(args);
        }
    }

    /**
     * The static parameters of the trait, then those the method declares.
     */
    @Override
    public List<StaticParam> getStaticParams() {
        List<StaticParam> own = NodeUtil.getStaticParams(fndef);
        List<StaticParam> traits = NodeUtil.getStaticParams(selfParameterType.getDef());
        if (own.isEmpty()) return traits;
        List<StaticParam> all = new ArrayList<StaticParam>(traits);
        all.addAll(own);
        return all;
    }

    protected Option<WhereClause> getWhere() {
        // TODO need to get where clause from generics, in general.
        return Option.<WhereClause>none();
    }

    public int hashCode() {
        return getDef().hashCode() + selfParameterType.hashCode();
    }

    public boolean equals(Object o) {
        if (o == null) return false;
        if (this == o) return true;
        if (o.getClass().equals(this.getClass())) {
            GenericFunctionalMethod oc = (GenericFunctionalMethod) o;
            return getDef() == oc.getDef() && selfParameterType.equals(oc.selfParameterType);
        }
        return false;
    }

    public int getSelfParameterIndex() {
        return selfParameterIndex;
    }

    public FTraitOrObjectOrGeneric getSelfParameterType() {
        return selfParameterType;
    }

    public FTypeGeneric getSelfParameterTypeAsGeneric() {
        return selfParameterType;
    }


    /**
     * A functional method with static parameters of its own, of a trait
     * without static parameters or of an instance of a generic trait: generic
     * in the method's own static parameters alone.
     */
    public static class Own extends FGenericFunction implements HasSelfParameter {
        private final int selfParameterIndex;
        private final FTraitOrObjectOrGeneric selfParameterType;

        public Own(Environment e, FnDecl fndef, int self_parameter_index, FTraitOrObjectOrGeneric self_parameter_type) {
            super(e, fndef);
            this.selfParameterIndex = self_parameter_index;
            this.selfParameterType = self_parameter_type;
        }

        @Override
        protected Simple_fcn newClosure(Environment clenv, List<FType> args) {
            FunctionalMethod cl = FType.anyAreSymbolic(args) ?
                                  new FunctionalMethodInstance(clenv,
                                                               fndef,
                                                               args,
                                                               this,
                                                               selfParameterIndex,
                                                               selfParameterType) :
                                  new OwnClosure(clenv, fndef, args, args, selfParameterIndex, selfParameterType);
            cl.finishInitializing();
            return cl;
        }

        public int getSelfParameterIndex() {
            return selfParameterIndex;
        }

        public FTraitOrObjectOrGeneric getSelfParameterType() {
            return selfParameterType;
        }

        public int hashCode() {
            return getDef().hashCode() + selfParameterType.hashCode();
        }

        public boolean equals(Object o) {
            if (o == null) return false;
            if (this == o) return true;
            if (o.getClass().equals(this.getClass())) {
                Own oc = (Own) o;
                return getDef() == oc.getDef() && selfParameterType.equals(oc.selfParameterType);
            }
            return false;
        }

        public String toString() {
            return selfParameterType.toString() + "." + super.toString();
        }
    }

    public String toString() {
        FnDecl node = fndef;
        // Code lifted from ErrorMsgMaker.forFnDecl
        return selfParameterType.toString() + Useful.listInOxfords(ErrorMsgMaker.ONLY.mapSelf(getStaticParams())) +
               "." + NodeUtil.nameString(NodeUtil.getName(node))
               //+ Useful.listInOxfords(ErrorMsgMaker.ONLY.mapSelf(getStaticParams()))
               + Useful.listInParens(ErrorMsgMaker.ONLY.mapSelf(NodeUtil.getParams(node))) + (NodeUtil.getReturnType(
                node).isSome() ? (":" + NodeUtil.getReturnType(node).unwrap().accept(ErrorMsgMaker.ONLY)) : "") +
               fndef.at();
    }

}
