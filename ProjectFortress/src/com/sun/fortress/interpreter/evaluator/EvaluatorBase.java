/*******************************************************************************
    Copyright 2008,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.evaluator;

import com.sun.fortress.compiler.typechecker.StaticTypeReplacer;
import com.sun.fortress.exceptions.FortressException;
import com.sun.fortress.exceptions.ProgramError;
import static com.sun.fortress.exceptions.InterpreterBug.bug;
import static com.sun.fortress.exceptions.ProgramError.error;
import static com.sun.fortress.exceptions.ProgramError.errorMsg;
import com.sun.fortress.interpreter.evaluator.types.*;
import com.sun.fortress.interpreter.evaluator.values.*;
import com.sun.fortress.nodes.ArrowType;
import com.sun.fortress.nodes.BigFixity;
import com.sun.fortress.nodes.BoolRef;
import com.sun.fortress.nodes.IntRef;
import com.sun.fortress.nodes.KeywordType;
import com.sun.fortress.nodes.NodeAbstractVisitor;
import com.sun.fortress.nodes.NodeDepthFirstVisitor_void;
import com.sun.fortress.nodes.Op;
import com.sun.fortress.nodes.Param;
import com.sun.fortress.nodes.Pattern;
import com.sun.fortress.nodes.StaticParam;
import com.sun.fortress.nodes.StaticArg;
import com.sun.fortress.nodes.TraitObjectDecl;
import com.sun.fortress.nodes.TraitType;
import com.sun.fortress.nodes.TraitTypeWhere;
import com.sun.fortress.nodes.TypeArg;
import com.sun.fortress.nodes.TupleType;
import com.sun.fortress.nodes.Type;
import com.sun.fortress.nodes.TypeOrPattern;
import com.sun.fortress.nodes.VarType;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.useful.BoundingMap;
import com.sun.fortress.useful.DefaultComparator;
import com.sun.fortress.useful.EmptyLatticeIntervalError;
import com.sun.fortress.useful.HasAt;
import com.sun.fortress.useful.LatticeIntervalMap;
import com.sun.fortress.useful.Useful;
import edu.rice.cs.plt.tuple.Option;

import java.io.FileWriter;
import java.io.IOException;
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
        BigOperatorHint h = choosing.get();
        return inferAndInstantiateGenericFunction(args, appliedThing, envForInference,
                                                  h != null && h.covers(appliedThing) ? h : null);
    }

    /**
     * As above, a big operator under the hint h of a reduction or a
     * comprehension that writes no static argument, where h is not null: the
     * instance that the hint gives, where inferWithCoercion finds one, and
     * otherwise the instance that no hint gives.
     */
    static Simple_fcn inferAndInstantiateGenericFunction(List<FValue> args,
                                                         GenericFunctionOrMethod appliedThing,
                                                         Environment envForInference,
                                                         BigOperatorHint h) throws ProgramError {
        Simple_fcn sfcn = h != null && bigOperator(appliedThing) ?
                          inferWithCoercion(args, appliedThing, envForInference, h) : null;
        if (sfcn == null) sfcn = inferWithCoercion(args, appliedThing, envForInference, null);
        return sfcn != null ? sfcn : inferByUnification(args, appliedThing, envForInference, true);
    }

    /**
     * Where the system property fortress.inference.trace names a file, each
     * instance that the bound rules below give in place of the instance the
     * earlier rules gave is appended to it, one line per type parameter.
     */
    private static final String TRACE = System.getProperty("fortress.inference.trace");

    private static void traceInstance(String rule, Object decl, String param, Object before, Object after, Object args) {
        if (TRACE == null) return;
        synchronized (EvaluatorBase.class) {
            try {
                FileWriter w = new FileWriter(TRACE, true);
                w.write(rule + "\t" + decl + "\t" + param + "\t" + before + "\t" + after + "\t" + args + "\n");
                w.close();
            }
            catch (IOException ex) {
                // the trace is best effort
            }
        }
    }

    private static List<FType> typesOf(List<FValue> vals) {
        List<FType> l = new ArrayList<FType>(vals.size());
        for (FValue v : vals) l.add(v.type());
        return l;
    }

    /**
     * A bounding map for a call's static parameters.  With bounded, where a
     * type joined into a lower bound has several minimal common supertypes
     * with it, or none, and both lie under the upper bound, the lower bound
     * becomes that upper bound, Any where there is none: the type parameter
     * takes its bound, not one of those supertypes.  Without, the lattice's
     * join decides, as when a declaration is chosen.
     */
    static final class BoundingIntervals extends LatticeIntervalMap<String, FType, TypeLatticeOps> {
        private final boolean bounded;

        BoundingIntervals(boolean bounded) {
            super(TypeLatticeOps.V, DefaultComparator.V);
            this.bounded = bounded;
        }

        @Override
        public FType joinPut(String k, FType v) {
            FType lower = bounded ? getLower(k) : null;
            if (lower != null && lower.join(v).size() != 1) {
                FType upper = getUpper(k);
                FType bound = upper == null ? FTypeTop.ONLY : upper;
                if (lower.subtypeOf(bound) && v.subtypeOf(bound)) {
                    traceInstance("several", k, k, lower + " join " + v, bound, "");
                    putPair(k, bound, bound);
                    return bound;
                }
            }
            return super.joinPut(k, v);
        }
    }

    /**
     * The bound of the type parameter n: the upper end of its interval, the
     * meet of its declared bounds, or Any where it has none.
     */
    private static FType boundOf(LatticeIntervalMap<String, FType, TypeLatticeOps> abm, String n) {
        FType upper = abm.getUpper(n);
        return upper == null ? FTypeTop.ONLY : upper;
    }

    /**
     * What instantiates the big operator of a reduction or a comprehension
     * that writes no static argument, the run-time counterpart of the
     * desugaring by the type of the expression: the declared type of the
     * variable or the declared return type of the function whose value the
     * clause form is (expected), which constrains the instance as a call's
     * static return type does, and else the join of the run-time types of
     * the elements that its generator clauses gave (elements).  Either may be
     * null.  It names the operator value it is for, and it is passed to that
     * operator's instantiation alone (instantiateBigOperator).
     */
    public static final class BigOperatorHint {
        final FValue operator;
        final FType elements;
        final FType expected;
        private volatile boolean byExpected;

        public BigOperatorHint(FValue operator, FType elements, FType expected) {
            this.operator = operator;
            this.elements = elements;
            this.expected = expected;
        }

        /** Whether the instance was fixed by the declared type. */
        public boolean byExpected() {
            return byExpected;
        }

        /** Whether g is the operator, or one of its overloads. */
        boolean covers(GenericFunctionOrMethod g) {
            if (operator == g) return true;
            if (!(operator instanceof OverloadedFunction)) return false;
            for (Overload o : ((OverloadedFunction) operator).getOverloads()) if (o.getFn() == g) return true;
            return false;
        }
    }

    /**
     * The hint of the overloaded big operator whose overload this thread is
     * choosing and instantiating, set by instantiateBigOperator around
     * OverloadedFunction.bestMatch alone.  bestMatch evaluates no Fortress
     * expression and starts and joins no task, so no other evaluation runs on
     * this thread while it is set; inferAndInstantiateGenericFunction reads it
     * only for an overload of the operator it names.
     */
    private static final ThreadLocal<BigOperatorHint> choosing = new ThreadLocal<BigOperatorHint>();

    /**
     * Whether a reduction's or a comprehension's big operator value opv has
     * static parameters to instantiate: a generic function, or an overloaded
     * one with a generic overload.
     */
    public static boolean instantiable(FValue opv) {
        if (opv instanceof GenericFunctionOrConstructor) return true;
        if (!(opv instanceof OverloadedFunction)) return false;
        for (Overload o : ((OverloadedFunction) opv).getOverloads()) {
            if (o.getFn() instanceof GenericFunctionOrMethod) return true;
        }
        return false;
    }

    /**
     * The big operator value opv, which instantiable accepts, applied to no
     * argument as a reduction or a comprehension that writes no static
     * argument applies it: the declaration is chosen and instantiated under
     * the hint h, outside the per-argument-type caches, which hold the
     * instance that no hint gives, and the instance is then applied with no
     * hint in reach.
     */
    public static FValue instantiateBigOperator(FValue opv, BigOperatorHint h, HasAt site) {
        List<FValue> none = Collections.<FValue>emptyList();
        SingleFcn inst;
        try {
            if (opv instanceof GenericFunctionOrConstructor) {
                GenericFunctionOrConstructor g = (GenericFunctionOrConstructor) opv;
                inst = inferAndInstantiateGenericFunction(none, g, g.getWithin(), h);
            } else {
                OverloadedFunction of = (OverloadedFunction) opv;
                BigOperatorHint before = choosing.get();
                choosing.set(h);
                try {
                    inst = of.bestMatch(none, of.getOverloads());
                }
                finally {
                    if (before == null) choosing.remove();
                    else choosing.set(before);
                }
                if (inst instanceof GenericFunctionOrMethod) {
                    return bug(site, errorMsg("overload res yielded generic ", inst));
                }
            }
        }
        catch (FortressException ex) {
            throw ex.setWhere(site);
        }
        return inst.functionInvocation(none, site);
    }

    /**
     * The join of the run-time types of the elements that the library's
     * collector __elemsOf gave, the static argument of its __Elems[\T\]; null
     * where it gave no element.
     */
    public static FType elementsType(FValue elems) {
        if (!(elems.type() instanceof GenericTypeInstance)) return null;
        List<FType> ps = ((GenericTypeInstance) elems.type()).getTypeParams();
        return ps.size() == 1 ? ps.get(0) : null;
    }

    /**
     * The static argument at position k of a big operator's declared result,
     * where it is one of the library's BigReduction, Comprehension or
     * BigOperator, or of the one of those three that the declared result
     * extends (libraryBigResult); null otherwise.  For the element type I, k
     * is 0 in each; for the result type O, k is 0 in BigReduction[\R,L\],
     * whose O is R, and 1 in the other two.
     */
    private static Type resultArgOf(GenericFunctionOrMethod g, boolean result) {
        Option<Type> rt = g.getReturnType();
        if (rt.isNone() || !(rt.unwrap() instanceof TraitType)) return null;
        TraitType tt = libraryBigResult((TraitType) rt.unwrap(), g.getWithin(), 0);
        if (tt == null) return null;
        int k = bareName(tt).equals("BigReduction") ? 0 : result ? 1 : 0;
        List<StaticArg> sas = tt.getArgs();
        if (sas.size() <= k || !(sas.get(k) instanceof TypeArg)) return null;
        return ((TypeArg) sas.get(k)).getTypeArg();
    }

    /** The name of the trait tt, without the api that qualifies it. */
    private static String bareName(TraitType tt) {
        String head = NodeUtil.nameString(tt.getName());
        int dot = head.lastIndexOf('.');
        return dot >= 0 ? head.substring(dot + 1) : head;
    }

    /** How many declarations up the extends clauses libraryBigResult reads. */
    private static final int BIG_RESULT_DEPTH = 16;

    /**
     * The type tt, named in the environment env, where it is the library's
     * BigReduction, Comprehension or BigOperator; else the first of those
     * three that tt extends, read through the extends clause of tt's trait
     * or object declaration and up its supertypes' in turn, each with tt's
     * static arguments put for the declaration's static parameters; null
     * where none is found.
     */
    private static TraitType libraryBigResult(TraitType tt, Environment env, int depth) {
        String head = bareName(tt);
        if (head.equals("BigReduction") || head.equals("Comprehension") || head.equals("BigOperator")) return tt;
        if (depth >= BIG_RESULT_DEPTH) return null;
        FType ft;
        try {
            ft = env.getType(tt);
        }
        catch (FortressException ex) {
            return null;
        }
        if (!(ft instanceof FTraitOrObjectOrGeneric)) return null;
        FTraitOrObjectOrGeneric declared = (FTraitOrObjectOrGeneric) ft;
        Object d = declared instanceof FTypeGeneric ? ((FTypeGeneric) declared).getDef() : declared.getDecl();
        if (!(d instanceof TraitObjectDecl)) return null;
        TraitObjectDecl decl = (TraitObjectDecl) d;
        List<StaticParam> sps = NodeUtil.getStaticParams(decl);
        if (sps.size() != tt.getArgs().size()) return null;
        StaticTypeReplacer args = new StaticTypeReplacer(sps, tt.getArgs());
        for (TraitTypeWhere ttw : NodeUtil.getExtendsClause(decl)) {
            Type sup = args.replaceIn(ttw.getBaseType());
            if (!(sup instanceof TraitType)) continue;
            TraitType found = libraryBigResult((TraitType) sup, declared.getWithin(), depth + 1);
            if (found != null) return found;
        }
        return null;
    }

    /**
     * Whether g is a big operator, whose static parameters a reduction or a
     * comprehension that writes none leaves to the declared type of its value
     * or to the elements its generator clauses produce (BigOperatorHint).
     */
    private static boolean bigOperator(GenericFunctionOrMethod g) {
        if (!(g.getName() instanceof Op)) return false;
        Op op = (Op) g.getName();
        return op.getFixity() instanceof BigFixity || op.getText().startsWith("BIG ");
    }

    /**
     * The instance of each static parameter: its lower bound in abm, except
     * that, with bounded, a type parameter that the arguments do not fix, or
     * that they bound only from above (aboveOnly), takes its bound: where its
     * bounds mention no static parameter (rechecks), its interval's upper end;
     * where they mention others but not itself, its bounds at their instances.  The arguments fix
     * a type parameter that an argument's declared parameter type mentions
     * (fixable), and one that a bound of a type parameter they fix mentions.
     * With bounded, a type parameter that the arguments do not fix and whose
     * bound mentions the parameter itself, of any declaration, a big
     * operator's included, is left open (BottomType.OPEN).  Any other left
     * open is BottomType.
     */
    private static ArrayList<FType> instanceOf(List<StaticParam> tparams,
                                               LatticeIntervalMap<String, FType, TypeLatticeOps> abm,
                                               Set<String> fixable, Set<String> aboveOnly,
                                               Collection<StaticParam> rechecks,
                                               boolean bounded, GenericFunctionOrMethod appliedThing,
                                               List<FValue> args) {
        ArrayList<FType> tl = new ArrayList<FType>(tparams.size());
        Set<String> fixed = bounded ? fixedThroughBounds(tparams, fixable) : fixable;
        for (StaticParam tp : tparams) {
            String n = NodeUtil.getName(tp);
            FType t = abm.get(n);
            boolean unfixed = !fixed.contains(n);
            if (bounded && NodeUtil.isTypeParam(tp) && (unfixed || aboveOnly.contains(n)) &&
                (rechecks == null || !rechecks.contains(tp)) && (t == null || t instanceof BottomType)) {
                t = boundOf(abm, n);
                traceInstance(unfixed ? "unfixed" : "above", appliedThing, n, BottomType.ONLY, t, typesOf(args));
            }
            if (t == null) t = BottomType.ONLY;
            tl.add(t);
        }
        if (bounded && rechecks != null) {
            Set<String> fixedAll = fixedThroughBounds(tparams, fixable);
            for (int i = 0; i < tparams.size(); i++) {
                StaticParam tp = tparams.get(i);
                String n = NodeUtil.getName(tp);
                if (!NodeUtil.isTypeParam(tp) || fixedAll.contains(n) || !rechecks.contains(tp) ||
                    !(tl.get(i) instanceof BottomType) || !mentionsItself(tp)) continue;
                traceInstance("open", appliedThing, n, BottomType.ONLY, BottomType.OPEN, typesOf(args));
                tl.set(i, BottomType.OPEN);
            }
        }
        if (!bounded || rechecks == null) return tl;
        for (int i = 0; i < tparams.size(); i++) {
            StaticParam tp = tparams.get(i);
            String n = NodeUtil.getName(tp);
            if (!NodeUtil.isTypeParam(tp) || fixed.contains(n) || !rechecks.contains(tp) ||
                !(tl.get(i) instanceof BottomType)) continue;
            FType b = boundAtInstances(tp, tparams, tl, appliedThing);
            if (b != null) {
                traceInstance("unfixed", appliedThing, n, BottomType.ONLY, b, typesOf(args));
                tl.set(i, b);
            }
        }
        return tl;
    }

    /**
     * The type parameters of typeParams that the declared types of params
     * mention only where an argument bounds them from above, as the domain of
     * a function type does: in an odd number of arrow domains, and never as
     * a static argument of a type.
     */
    private static Set<String> boundedOnlyAbove(List<Param> params, Set<String> typeParams) {
        Set<String> above = new HashSet<String>();
        Set<String> below = new HashSet<String>();
        for (Param p : params) {
            Type ty;
            if (NodeUtil.isVarargsParam(p)) ty = p.getVarargsType().unwrap();
            else if (p.getIdType().isSome()) ty = NodeUtil.optTypeOrPatternToType(p.getIdType()).unwrap();
            else continue;
            polarities(ty, true, typeParams, below, above);
        }
        above.removeAll(below);
        return above;
    }

    /**
     * Files each name of names that ty mentions under below where an argument
     * of type ty bounds it from below (positive) and under above where it
     * bounds it from above; a mention inside a static argument goes under
     * both.
     */
    private static void polarities(Type ty, boolean positive, Set<String> names, Set<String> below,
                                   Set<String> above) {
        if (ty instanceof VarType) {
            String n = NodeUtil.nameString(((VarType) ty).getName());
            if (names.contains(n)) (positive ? below : above).add(n);
        } else if (ty instanceof ArrowType) {
            polarities(((ArrowType) ty).getRange(), positive, names, below, above);
            polarities(((ArrowType) ty).getDomain(), !positive, names, below, above);
        } else if (ty instanceof TupleType) {
            TupleType tt = (TupleType) ty;
            for (Type e : tt.getElements()) polarities(e, positive, names, below, above);
            if (tt.getVarargs().isSome()) polarities(tt.getVarargs().unwrap(), positive, names, below, above);
            for (KeywordType k : tt.getKeywords()) polarities(k.getKeywordType(), positive, names, below, above);
        } else {
            Set<String> m = mentions(ty, names);
            below.addAll(m);
            above.addAll(m);
        }
    }

    /**
     * The static parameters of tparams named in fixable, and those that a
     * bound of one of them mentions, as A extends T mentions T.
     */
    private static Set<String> fixedThroughBounds(List<StaticParam> tparams, Set<String> fixable) {
        Set<String> names = new HashSet<String>();
        for (StaticParam tp : tparams) names.add(NodeUtil.getName(tp));
        Set<String> fixed = new HashSet<String>(fixable);
        boolean grew = true;
        while (grew) {
            grew = false;
            for (StaticParam tp : tparams) {
                if (!fixed.contains(NodeUtil.getName(tp))) continue;
                for (Type tr : tp.getExtendsClause()) {
                    for (String m : mentions(tr, names)) grew |= fixed.add(m);
                }
            }
        }
        return fixed;
    }

    /**
     * The meet of the bounds of the type parameter tp of g at the instances
     * tl of the static parameters they mention; null where they mention tp
     * itself or a static parameter whose instance is BottomType, or where
     * they cannot be evaluated.
     */
    private static FType boundAtInstances(StaticParam tp, List<StaticParam> tparams, List<FType> tl,
                                          GenericFunctionOrMethod g) {
        Map<String, FType> inst = new HashMap<String, FType>();
        for (int i = 0; i < tparams.size(); i++) inst.put(NodeUtil.getName(tparams.get(i)), tl.get(i));
        for (Type tr : tp.getExtendsClause()) {
            for (String m : mentions(tr, inst.keySet())) {
                if (m.equals(NodeUtil.getName(tp)) || inst.get(m) instanceof BottomType) return null;
            }
        }
        try {
            Environment env = declarationEnv(g).extendAt(tp);
            EvalType.bindGenericParameters(tparams, tl, env, tp, tp);
            EvalType et = new EvalType(env);
            FType b = null;
            for (Type tr : tp.getExtendsClause()) {
                FType t = et.evalType(tr);
                b = b == null ? t : TypeLatticeOps.V.meet(b, t);
            }
            return b;
        }
        catch (FortressException ex) {
            return null;
        }
    }

    /**
     * The environment in which the bounds of g's static parameters and the
     * coercions of its arguments are read: where g is declared, as for a
     * generic function, and for a method that a trait declares, the trait's
     * method environment (GenericMethod.getTypeEnv).
     */
    private static Environment declarationEnv(GenericFunctionOrMethod g) {
        return g instanceof GenericMethod ? ((GenericMethod) g).getTypeEnv() : g.getWithin();
    }

    /**
     * An instantiation of a generic function that admits every argument by
     * subtyping or by one coercion, or null.  An argument whose declared type
     * mentions a static parameter other than as the whole type is unified with
     * it; an argument whose declared type mentions no static parameter is left
     * to the coercion at binding; a type parameter that is the whole declared
     * type of some argument and that nothing else fixes takes the narrowest of
     * its arguments' types, the types they coerce to and its bounds that each
     * of those arguments is a subtype of or coerces to, and, when no one is
     * narrowest, its bound, where each of those arguments is a subtype of it;
     * one whose bound mentions a static parameter takes the narrowest of those
     * and of the arguments' supertypes, and otherwise the join of its
     * arguments' types.  A type parameter that no argument fixes takes its
     * bound (instanceOf).
     */
    private static Simple_fcn inferWithCoercion(List<FValue> args,
                                                GenericFunctionOrMethod appliedThing,
                                                Environment envForInference, BigOperatorHint h) {
        try {
            return inferWithCoercionOrFail(args, appliedThing, envForInference, h);
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
                                                      Environment envForInference, BigOperatorHint h) {
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
        Environment declared = declarationEnv(appliedThing);
        EvalType et = new EvalType(declared);
        BoundingIntervals abm = new BoundingIntervals(true);
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
                boolean isSelf = p.getName().toString().equals("self");
                if (isSelf && appliedThing instanceof GenericFunctionalMethod.Own) continue;
                if (!(isSelf && appliedThing instanceof GenericFunctionalMethod)) {
                    return null;
                }
                Type selfInst = selfType.getGeneric().getInstantiationForFunctionalMethodInference();
                at.unify(envForInference, tp_set, abm, selfInst);
                fixedElsewhere.addAll(mentions(selfInst, tp_set));
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
            boolean selfBounded = selfBounded(n, rechecks);
            FType chosen = narrowest(n, e.getValue(), abm, rechecks, tp_set, envForInference, bounds.get(n),
                                     declared, selfBounded);
            FType bound = boundOf(abm, n);
            if (chosen == null && !selfBounded && allSubtypes(e.getValue(), bound)) chosen = bound;
            if (TRACE != null && !selfBounded) {
                FType before = narrowest(n, e.getValue(), abm, rechecks, tp_set, envForInference, bounds.get(n),
                                         declared, true);
                if (before == null || !before.equals(chosen)) {
                    traceInstance("lone", appliedThing, n, before == null ? "join" : before, chosen,
                                  typesOf(e.getValue()));
                }
            }
            if (chosen != null) {
                abm.joinPut(n, chosen);
            } else {
                for (FValue a : e.getValue()) a.type().unify(envForInference, tp_set, abm, loneType.get(n));
            }
        }
        /* A big operator under a hint: the declared type first, unified with the result type O of the
           declared result, and else the elements' join, unified with its element type I; each on a
           trial copy first, so that a hint that does not fit leaves the inference as it was. */
        boolean byExpected = false;
        if (h != null && h.expected != null) {
            Type ot = resultArgOf(appliedThing, true);
            if (ot != null) {
                try {
                    h.expected.unify(envForInference, tp_set, abm.copy(), ot);
                    h.expected.unify(envForInference, tp_set, abm, ot);
                    fixedElsewhere.addAll(mentions(ot, tp_set));
                    byExpected = true;
                    traceInstance("expected", appliedThing, String.valueOf(ot), BottomType.ONLY, h.expected, "");
                }
                catch (FortressException ex) {
                    // the elements' type, or the bound
                }
            }
        }
        if (h != null && !byExpected && h.elements != null) {
            Type it = resultArgOf(appliedThing, false);
            if (it != null) {
                try {
                    h.elements.unify(envForInference, tp_set, abm.copy(), it);
                    h.elements.unify(envForInference, tp_set, abm, it);
                    fixedElsewhere.addAll(mentions(it, tp_set));
                    traceInstance("elements", appliedThing, String.valueOf(it), BottomType.ONLY, h.elements, "");
                }
                catch (FortressException ex) {
                    // the bound, as where no element is given
                }
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
        Set<String> fixable = new HashSet<String>(fixedElsewhere);
        fixable.addAll(lone.keySet());
        ArrayList<FType> tl = instanceOf(tparams, abm, fixable, boundedOnlyAbove(params, typeParams), rechecks, true,
                                         appliedThing, originalArgs);
        Simple_fcn sfcn = appliedThing.typeApply(tl);
        /* Every argument admitted by the instance's domain, by subtyping or by one coercion. */
        List<FValue> fargs = sfcn.fixupArgCount(originalArgs);
        if (fargs == null) return null;
        List<FType> dom = sfcn.getDomain();
        for (int j = 0; j < fargs.size(); j++) {
            if (!Coercions.admits(Useful.clampedGet(dom, j).deRest(), fargs.get(j))) return null;
        }
        if (byExpected) h.byExpected = true;
        return sfcn;
    }

    /**
     * Whether a bound of the type parameter tp mentions tp itself (an F-bound).
     */
    private static boolean mentionsItself(StaticParam tp) {
        Set<String> self = Collections.singleton(NodeUtil.getName(tp));
        for (Type tr : tp.getExtendsClause()) if (!mentions(tr, self).isEmpty()) return true;
        return false;
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
     * Whether a bound of the type parameter n mentions a static parameter of
     * the declaration, so that it is checked only once n is bound (rechecks).
     */
    private static boolean selfBounded(String n, List<StaticParam> rechecks) {
        for (StaticParam tp : rechecks) if (NodeUtil.getName(tp).equals(n)) return true;
        return false;
    }

    private static boolean allSubtypes(List<FValue> vals, FType t) {
        for (FValue v : vals) if (!v.type().subtypeOf(t)) return false;
        return true;
    }

    /**
     * The narrowest type for the type parameter n whose arguments are vals, or
     * null: among the arguments' types, the types they coerce to and n's
     * bounds, and with supertypes the arguments' supertypes as well, those
     * that each argument is a subtype of or coerces to and that n's bounds
     * admit, the one that is a subtype of every other or coerces to it.
     */
    private static FType narrowest(String n, List<FValue> vals,
                                   BoundingMap<String, FType, TypeLatticeOps> abm,
                                   List<StaticParam> rechecks, Set<String> tp_set, Environment env,
                                   List<FType> bounds, Environment within, boolean supertypes) {
        LinkedHashSet<FType> candidates = new LinkedHashSet<FType>();
        for (FValue v : vals) {
            if (supertypes) candidates.addAll(v.type().getTransitiveExtends());
            else candidates.add(v.type());
        }
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
        return inferByUnification(args, appliedThing, envForInference, false);
    }

    /**
     * With bounded, a type parameter that no argument fixes and whose bounds
     * mention no static parameter takes its bound, as in inferWithCoercion;
     * without, it is BottomType, which is how a declaration is chosen.
     */
    private static Simple_fcn inferByUnification(List<FValue> args,
                                                 GenericFunctionOrMethod appliedThing,
                                                 Environment envForInference,
                                                 boolean bounded) throws ProgramError {

        if (DUMP_INFERENCE) System.err.println("IAIGF " + appliedThing + " with " + args);
        final List<FValue> originalArgs = args;

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
        BoundingIntervals abm = new BoundingIntervals(bounded);
        Set<String> fixable = new HashSet<String>();
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
                        if (p.getName().toString().equals("self") &&
                            appliedThing instanceof GenericFunctionalMethod.Own) {
                            continue;
                        } else if (p.getName().toString().equals("self") &&
                                   appliedThing instanceof GenericFunctionalMethod) {
                            // Use precomputed selfType that will match declared
                            GenericTypeInstance gi = (GenericTypeInstance) selfType;
                            Type selfInst = gi.getGeneric().getInstantiationForFunctionalMethodInference();
                            fixable.addAll(mentions(selfInst, tp_set));
                            at.unify(envForInference,
                                     tp_set,
                                     abm,
                                     selfInst);// instantiationAST());
                        } else {
                            if (DUMP_INFERENCE) System.err.println("Parameter lacks type.");
                            error("Parameter needs type for generic resolution");
                        }
                    } else {
                        Type ty = NodeUtil.optTypeOrPatternToType(t).unwrap();
                        if (DUMP_INFERENCE) System.err.println("Unifying " + at + " and " + ty);
                        fixable.addAll(mentions(ty, tp_set));
                        at.unify(envForInference, tp_set, abm, ty);
                    }
                } else { // a varargs param
                    Type ty = p.getVarargsType().unwrap();
                    if (DUMP_INFERENCE) System.err.println("Unifying " + at + " and vararg type " + ty);
                    fixable.addAll(mentions(ty, tp_set));
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
        ArrayList<FType> tl = instanceOf(tparams, abm, fixable, boundedOnlyAbove(params, tp_set), rechecks, bounded,
                                         appliedThing, originalArgs);
        Simple_fcn sfcn = appliedThing.typeApply(tl);
        if (DUMP_INFERENCE) System.err.println("Result " + sfcn);
        return sfcn;
    }


}
