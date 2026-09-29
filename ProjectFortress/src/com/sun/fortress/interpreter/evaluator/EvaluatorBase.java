/*******************************************************************************
    Copyright 2008,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.evaluator;

import com.sun.fortress.exceptions.FortressException;
import com.sun.fortress.exceptions.ProgramError;
import static com.sun.fortress.exceptions.ProgramError.error;
import static com.sun.fortress.exceptions.ProgramError.errorMsg;
import com.sun.fortress.interpreter.evaluator.types.*;
import com.sun.fortress.interpreter.evaluator.values.*;
import com.sun.fortress.nodes.BoolRef;
import com.sun.fortress.nodes.IntRef;
import com.sun.fortress.nodes.NodeAbstractVisitor;
import com.sun.fortress.nodes.NodeDepthFirstVisitor_void;
import com.sun.fortress.nodes.Param;
import com.sun.fortress.nodes.Pattern;
import com.sun.fortress.nodes.StaticParam;
import com.sun.fortress.nodes.Type;
import com.sun.fortress.nodes.TypeOrPattern;
import com.sun.fortress.nodes.VarType;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.useful.BoundingMap;
import com.sun.fortress.useful.DefaultComparator;
import com.sun.fortress.useful.EmptyLatticeIntervalError;
import com.sun.fortress.useful.LatticeIntervalMap;
import com.sun.fortress.useful.Useful;
import edu.rice.cs.plt.tuple.Option;

import java.util.*;

public class EvaluatorBase<T> extends NodeAbstractVisitor<T> {

    protected static final boolean DUMP_INFERENCE = false;

    final public Environment e;

    protected EvaluatorBase(Environment e) {
        this.e = e;
    }

    /**
     * Given args, infers the appropriate instantiation of a generic function:
     * the one inferWithCoercion finds, or, when it finds none, the one
     * inferByUnification finds.
     *
     * @throws ProgramError
     */
    public static Simple_fcn inferAndInstantiateGenericFunction(List<FValue> args,
                                                                GenericFunctionOrMethod appliedThing,
                                                                Environment envForInference) throws ProgramError {
        Simple_fcn sfcn = inferWithCoercion(args, appliedThing, envForInference);
        return sfcn != null ? sfcn : inferByUnification(args, appliedThing, envForInference);
    }

    /**
     * An instantiation of a generic function that admits every argument by
     * subtyping or by one coercion, or null.  An argument whose declared type
     * mentions a static parameter other than as the whole type is unified with
     * it; an argument whose declared type mentions no static parameter is left
     * to the coercion at binding; a type parameter that is the whole declared
     * type of some argument and that nothing else fixes takes the narrowest of
     * its arguments' types, their supertypes, the types they coerce to and its
     * bounds that each of those arguments is a subtype of or coerces to, and,
     * when no one is narrowest, the join of its arguments' types.
     */
    private static Simple_fcn inferWithCoercion(List<FValue> args,
                                                GenericFunctionOrMethod appliedThing,
                                                Environment envForInference) {
        try {
            return inferWithCoercionOrFail(args, appliedThing, envForInference);
        }
        catch (FortressException ex) {
            return null;
        }
        catch (EmptyLatticeIntervalError ex) {
            return null;
        }
    }

    private static Simple_fcn inferWithCoercionOrFail(List<FValue> args,
                                                      GenericFunctionOrMethod appliedThing,
                                                      Environment envForInference) {
        final List<FValue> originalArgs = args;
        GenericTypeInstance selfType = null;
        if (appliedThing instanceof GenericFunctionalMethod) {
            GenericFunctionalMethod gfm = (GenericFunctionalMethod) appliedThing;
            FTypeGeneric declaredSelfType = gfm.getSelfParameterTypeAsGeneric();
            FValue selfArg = args.get(gfm.getSelfParameterIndex());
            if (!(selfArg.type() instanceof GenericTypeInstance)) return null;
            selfType = (GenericTypeInstance) selfArg.type();
            for (FType ft : selfType.getTransitiveExtends()) {
                if (ft instanceof GenericTypeInstance && ((GenericTypeInstance) ft).getGeneric().equals(
                        declaredSelfType)) {
                    selfType = (GenericTypeInstance) ft;
                    break;
                }
            }
            envForInference = selfType.getWithin();
        }
        List<StaticParam> tparams = appliedThing.getStaticParams();
        List<Param> params = appliedThing.getParams();
        EvalType et = new EvalType(appliedThing.getWithin());
        BoundingMap<String, FType, TypeLatticeOps> abm = new LatticeIntervalMap<String, FType, TypeLatticeOps>(
                TypeLatticeOps.V,
                DefaultComparator.V);
        Set<String> tp_set = new HashSet<String>();
        Set<String> typeParams = new HashSet<String>();
        Map<String, List<FType>> bounds = new HashMap<String, List<FType>>();
        List<StaticParam> rechecks = new ArrayList<StaticParam>();
        for (StaticParam sp : tparams) {
            String name = NodeUtil.getName(sp);
            tp_set.add(name);
            if (!NodeUtil.isTypeParam(sp)) continue;
            typeParams.add(name);
            List<FType> bs = new ArrayList<FType>();
            bounds.put(name, bs);
            for (Type tr : sp.getExtendsClause()) {
                try {
                    FType tt = et.evalType(tr);
                    abm.meetPut(name, tt);
                    bs.add(tt);
                }
                catch (FortressException pe) {
                    if (!rechecks.contains(sp)) rechecks.add(sp);
                }
            }
        }
        if (params.size() == 1 && args.size() != 1 && !NodeUtil.isVarargsParam(params.get(0))) {
            args = Useful.<FValue>list(FTuple.make(args));
        }
        /* The first pass: the arguments whose declared type is not a type parameter alone. */
        Map<String, List<FValue>> lone = new LinkedHashMap<String, List<FValue>>();
        Map<String, Type> loneType = new HashMap<String, Type>();
        Set<String> fixedElsewhere = new HashSet<String>();
        Iterator<Param> pit = params.iterator();
        Param p = null;
        for (FValue a : args) {
            FType at = a.type();
            if (at == null) return null;
            if (pit.hasNext()) p = pit.next();
            else if (p == null) return null;
            if (NodeUtil.isVarargsParam(p)) {
                Type ty = p.getVarargsType().unwrap();
                fixedElsewhere.addAll(mentions(ty, tp_set));
                at.unify(envForInference, tp_set, abm, ty);
                continue;
            }
            Option<TypeOrPattern> t = p.getIdType();
            if (t.isNone()) {
                if (!(p.getName().toString().equals("self") && appliedThing instanceof GenericFunctionalMethod)) {
                    return null;
                }
                at.unify(envForInference, tp_set, abm,
                         selfType.getGeneric().getInstantiationForFunctionalMethodInference());
                fixedElsewhere.addAll(tp_set);
                continue;
            }
            Type ty = NodeUtil.optTypeOrPatternToType(t).unwrap();
            if (ty instanceof VarType && typeParams.contains(NodeUtil.nameString(((VarType) ty).getName()))) {
                String n = NodeUtil.nameString(((VarType) ty).getName());
                if (!lone.containsKey(n)) {
                    lone.put(n, new ArrayList<FValue>());
                    loneType.put(n, ty);
                }
                lone.get(n).add(a);
                continue;
            }
            Set<String> m = mentions(ty, tp_set);
            if (m.isEmpty()) continue;
            fixedElsewhere.addAll(m);
            at.unify(envForInference, tp_set, abm, ty);
        }
        /* The second pass: each type parameter that stands alone and that the first pass did not fix. */
        for (Map.Entry<String, List<FValue>> e : lone.entrySet()) {
            String n = e.getKey();
            FType fixed = abm.get(n);
            if (fixedElsewhere.contains(n) && fixed != null && !(fixed instanceof BottomType)) continue;
            FType chosen = narrowest(n, e.getValue(), abm, rechecks, tp_set, envForInference, bounds.get(n),
                                     appliedThing.getWithin());
            if (chosen != null) {
                abm.joinPut(n, chosen);
            } else {
                for (FValue a : e.getValue()) a.type().unify(envForInference, tp_set, abm, loneType.get(n));
            }
        }
        MakeInferenceSpecific mis = new MakeInferenceSpecific(abm);
        Option<Type> opt_rt = appliedThing.getReturnType();
        if (opt_rt.isSome()) opt_rt.unwrap().accept(mis);
        for (StaticParam tp : rechecks) {
            FType t = abm.get(NodeUtil.getName(tp));
            if (t == null) t = BottomType.ONLY;
            for (Type tr : tp.getExtendsClause()) t.unify(envForInference, tp_set, abm, tr);
        }
        ArrayList<FType> tl = new ArrayList<FType>(tparams.size());
        for (StaticParam tp : tparams) {
            FType t = abm.get(NodeUtil.getName(tp));
            if (t == null) t = BottomType.ONLY;
            tl.add(t);
        }
        Simple_fcn sfcn = appliedThing.typeApply(tl);
        /* Every argument admitted by the instance's domain, by subtyping or by one coercion. */
        List<FValue> fargs = sfcn.fixupArgCount(originalArgs);
        if (fargs == null) return null;
        List<FType> dom = sfcn.getDomain();
        for (int j = 0; j < fargs.size(); j++) {
            if (!Coercions.admits(Useful.clampedGet(dom, j).deRest(), fargs.get(j))) return null;
        }
        return sfcn;
    }

    /**
     * The names of tp_set that ty mentions.
     */
    private static Set<String> mentions(Type ty, final Set<String> tp_set) {
        final Set<String> found = new HashSet<String>();
        ty.accept(new NodeDepthFirstVisitor_void() {
            @Override
            public void forVarTypeOnly(VarType that) {
                String n = NodeUtil.nameString(that.getName());
                if (tp_set.contains(n)) found.add(n);
            }

            @Override
            public void forIntRefOnly(IntRef that) {
                String n = NodeUtil.nameString(that.getName());
                if (tp_set.contains(n)) found.add(n);
            }

            @Override
            public void forBoolRefOnly(BoolRef that) {
                String n = NodeUtil.nameString(that.getName());
                if (tp_set.contains(n)) found.add(n);
            }
        });
        return found;
    }

    /**
     * The narrowest type for the type parameter n whose arguments are vals, or
     * null: among the arguments' types, their supertypes, the types they coerce
     * to and n's bounds, those that each argument is a subtype of or coerces to
     * and that n's bounds admit, the one that is a subtype of every other or
     * coerces to it.
     */
    private static FType narrowest(String n, List<FValue> vals,
                                   BoundingMap<String, FType, TypeLatticeOps> abm,
                                   List<StaticParam> rechecks, Set<String> tp_set, Environment env,
                                   List<FType> bounds, Environment within) {
        LinkedHashSet<FType> candidates = new LinkedHashSet<FType>();
        for (FValue v : vals) candidates.addAll(v.type().getTransitiveExtends());
        for (FValue v : vals) candidates.addAll(Coercions.coercionTargets(v, within));
        if (bounds != null) candidates.addAll(bounds);
        List<FType> admitted = new ArrayList<FType>();
        for (FType c : candidates) {
            if (c instanceof BottomType || c instanceof FTypeTop) continue;
            boolean all = true;
            for (FValue v : vals) {
                if (!Coercions.admits(c, v)) {
                    all = false;
                    break;
                }
            }
            if (!all) continue;
            BoundingMap<String, FType, TypeLatticeOps> trial = abm.copy();
            try {
                trial.joinPut(n, c);
                for (StaticParam tp : rechecks) {
                    if (!NodeUtil.getName(tp).equals(n)) continue;
                    for (Type tr : tp.getExtendsClause()) c.unify(env, tp_set, trial, tr);
                }
            }
            catch (FortressException ex) {
                continue;
            }
            catch (EmptyLatticeIntervalError ex) {
                continue;
            }
            admitted.add(c);
        }
        FType best = null;
        for (FType c : admitted) {
            boolean narrower = true;
            for (FType d : admitted) {
                if (d != c && !c.subtypeOf(d) && !Coercions.convertsInto(c, d)) {
                    narrower = false;
                    break;
                }
            }
            if (narrower) {
                if (best != null && best != c) return null;
                best = c;
            }
        }
        return best;
    }

    /**
     * Infers an instantiation of a generic function by unifying every
     * argument's type with its parameter's declared type.
     *
     * @throws ProgramError
     */
    public static Simple_fcn inferByUnification(List<FValue> args,
                                                GenericFunctionOrMethod appliedThing,
                                                Environment envForInference) throws ProgramError {

        if (DUMP_INFERENCE) System.err.println("IAIGF " + appliedThing + " with " + args);

        GenericTypeInstance selfType = null; // initialized if generic functional method

        if (appliedThing instanceof GenericFunctionalMethod) {
            GenericFunctionalMethod gfm = (GenericFunctionalMethod) appliedThing;
            int spi = gfm.getSelfParameterIndex();
            FTypeGeneric declaredSelfType = gfm.getSelfParameterTypeAsGeneric();
            FValue selfArg = args.get(spi);

            if (selfArg.type() instanceof GenericTypeInstance) {
                selfType = (GenericTypeInstance) selfArg.type();
                // Find the supertype that exactly matches "self"
                for (FType ft : selfType.getTransitiveExtends()) {
                    if (ft instanceof GenericTypeInstance && ((GenericTypeInstance) ft).getGeneric().equals(
                            declaredSelfType)) {
                        selfType = (GenericTypeInstance) ft;
                        break;
                    }
                }
                envForInference = selfType.getWithin();
            } else return error(errorMsg("Non-generic-instance type for self argument ",
                                         selfArg,
                                         " to generic functional method ",
                                         appliedThing));
        }

        List<StaticParam> tparams = appliedThing.getStaticParams();
        List<Param> params = appliedThing.getParams();
        // Must use the right environment for unifying against the generic.
        // It was "e", which is wrong.
        EvalType et = new EvalType(appliedThing.getWithin());// e);
        // The types of the actual parameters ought to unify with the
        // types of the formal parameters.
        BoundingMap<String, FType, TypeLatticeOps> abm = new
                // ABoundingMap
                LatticeIntervalMap<String, FType, TypeLatticeOps>(TypeLatticeOps.V, DefaultComparator.V);
        Param p = null;
        Set<String> tp_set = new HashSet<String>();
        List<StaticParam> rechecks = null;
        for (StaticParam sp : tparams) {
            boolean rechecked = false;
            String name = NodeUtil.getName(sp);
            tp_set.add(name);
            if (NodeUtil.isTypeParam(sp)) {
                if (DUMP_INFERENCE) System.err.println("TypeParam " + sp);
                for (Type tr : sp.getExtendsClause()) {
                    // Preinstall bounds in the boundingmap
                    try {
                        FType tt = et.evalType(tr);
                        if (DUMP_INFERENCE) System.err.println("    extends " + tr + " = " + tt);
                        abm.meetPut(name, tt);
                    }
                    catch (FortressException pe) {
                        if (DUMP_INFERENCE) System.err.println("    extends with failed evalType " + tr);
                        if (!rechecked) {
                            rechecked = true;
                            if (rechecks == null) {
                                rechecks = new ArrayList<StaticParam>();
                            }
                            rechecks.add(sp);
                        }
                    }
                }
            } else if (DUMP_INFERENCE) System.err.println("Non-simple StaticParam " + sp);
        }
        /* FIX FOR #62 */
        if (params.size() == 1 && args.size() != 1) {
            Iterator<Param> pit = params.iterator();
            Param pa = pit.next();

            if (!NodeUtil.isVarargsParam(pa)) {
                /* Tuple (or even re-tuple) arguments when inferring type
                 * if passing different # of args to 1-arg function. */
                if (DUMP_INFERENCE) {
                    System.err.println("Tupling args to match single-arg context.");
                }
                args = Useful.<FValue>list(FTuple.make(args));
            }
        }
        Iterator<Param> pit = params.iterator();
        for (FValue a : args) {
            FType at = a.type();
            if (at == null) {
                if (DUMP_INFERENCE) System.err.println("Argument " + a + " without type info.");
                return error(errorMsg("Argument ", a, " has no type information"));
            }
            if (pit.hasNext()) {
                p = pit.next();
            } else if (p == null) {
                if (DUMP_INFERENCE) System.err.println("Arguments " + args + " to 0-arg function.");
                error(errorMsg(" Arguments ", args, " given to 0-argument generic function ", appliedThing));
            }
            try {
                if (!NodeUtil.isVarargsParam(p)) {
                    Option<TypeOrPattern> t = p.getIdType();
                    // why can't we just skip if missing?
                    if (t.isNone()) {
                        /*
                         * Fake the type for a generic functional method
                         * invocation.
                         */
                        if (p.getName().toString().equals("self") && appliedThing instanceof GenericFunctionalMethod) {
                            // Use precomputed selfType that will match declared
                            GenericTypeInstance gi = (GenericTypeInstance) selfType;

                            at.unify(envForInference,
                                     tp_set,
                                     abm,
                                     gi.getGeneric().getInstantiationForFunctionalMethodInference());// instantiationAST());
                        } else {
                            if (DUMP_INFERENCE) System.err.println("Parameter lacks type.");
                            error("Parameter needs type for generic resolution");
                        }
                    } else {
                        Type ty = NodeUtil.optTypeOrPatternToType(t).unwrap();
                        if (DUMP_INFERENCE) System.err.println("Unifying " + at + " and " + ty);
                        at.unify(envForInference, tp_set, abm, ty);
                    }
                } else { // a varargs param
                    Type ty = p.getVarargsType().unwrap();
                    if (DUMP_INFERENCE) System.err.println("Unifying " + at + " and vararg type " + ty);
                    at.unify(envForInference, tp_set, abm, ty);
                }
            }
            catch (FortressException ex) {
                /* Give decent feedback when unification fails. */
                throw ex.setWithin(envForInference);
            }
        }

        if (DUMP_INFERENCE) System.err.println("ABM 0={" + abm + "}");

        /*
         * Filter the inference through the result type, making it more specific
         * (which is less-specific, for arrow domain types).
         */
        MakeInferenceSpecific mis = new MakeInferenceSpecific(abm);

        // TODO: There is still a lurking error in inference, probably in arrow
        // types.

        // for (Param param : params) {
        // Option<Type> t = param.getType();
        // t.getVal().accept(mis);
        // }
        // if (DUMP_INFERENCE)
        // System.err.println("ABM 1={" + abm + "}");

        Option<Type> opt_rt = appliedThing.getReturnType();

        if (opt_rt.isSome()) opt_rt.unwrap().accept(mis);

        if (DUMP_INFERENCE) System.err.println("ABM 2={" + abm + "}");

        /* Enforce upper bounds that we could not enforce up front.
         * We're worried here about self-typing idioms.  What we have to do
         * is find the (unique) occurrence of the type stem of the bounding type
         * in the supertypes of the bounded type.
         *
         * What do we do with variable upper bounds?  We should impose the bounds
         * derived for the given type variable.
         */
        if (rechecks != null) {
            for (StaticParam tp : rechecks) {
                FType t = abm.get(NodeUtil.getName(tp));
                if (t == null) {
                    if (DUMP_INFERENCE) {
                        System.err.println(
                                "Can't constrain the type " + tp + "\n    enough to enforce its upper bounds " +
                                tp.getExtendsClause() + "\n    Choosing to erase to bottom.");
                    }
                    t = BottomType.ONLY;
                }
                for (Type tr : tp.getExtendsClause()) {
                    if (DUMP_INFERENCE) {
                        System.err.println("Unifying " + tp + " lower bound " + t + "\n    with its bound " + tr + " " +
                                           tr.getClass());
                    }
                    t.unify(envForInference, tp_set, abm, tr);
                }
            }
        }

        /*
         * Iterate over static parameters, choosing least-general binding for
         * each one.
         */
        ArrayList<FType> tl = new ArrayList<FType>(tparams.size());
        for (StaticParam tp : tparams) {
            FType t = abm.get(NodeUtil.getName(tp));
            if (t == null) t = BottomType.ONLY;
            tl.add(t);
        }
        Simple_fcn sfcn = appliedThing.typeApply(tl);
        if (DUMP_INFERENCE) System.err.println("Result " + sfcn);
        return sfcn;
    }


}
