/*******************************************************************************
    Copyright 2008,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.evaluator.values;

import com.sun.fortress.exceptions.FortressException;
import static com.sun.fortress.exceptions.InterpreterBug.bug;
import com.sun.fortress.exceptions.ProgramError;
import static com.sun.fortress.exceptions.ProgramError.error;
import static com.sun.fortress.exceptions.ProgramError.errorMsg;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.EvalType;
import com.sun.fortress.interpreter.evaluator.EvaluatorBase;
import com.sun.fortress.interpreter.evaluator.InstantiationLock;
import com.sun.fortress.interpreter.evaluator.types.*;
import com.sun.fortress.nodes.BaseType;
import com.sun.fortress.nodes.BoolRef;
import com.sun.fortress.nodes.IdOrOpOrAnonymousName;
import com.sun.fortress.nodes.IntRef;
import com.sun.fortress.nodes.NodeDepthFirstVisitor_void;
import com.sun.fortress.nodes.Op;
import com.sun.fortress.nodes.Param;
import com.sun.fortress.nodes.StaticArg;
import com.sun.fortress.nodes.StaticParam;
import com.sun.fortress.nodes.Type;
import com.sun.fortress.nodes.TupleType;
import com.sun.fortress.nodes.TypeOrPattern;
import com.sun.fortress.nodes.VarType;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.useful.*;
import edu.rice.cs.plt.tuple.Option;

import java.io.IOException;
import java.util.*;

public class OverloadedFunction extends Fcn implements Factory1P<List<FType>, Fcn, HasAt> {

    private final static boolean debug = false;
    private final static boolean debugMatch = false;
    /**
     * Disables ALL consistency checking of overloaded functions.
     */
    private final static boolean noCheck = false;

    protected volatile List<Overload> overloads = new ArrayList<Overload>();
    protected List<Overload> pendingOverloads = new ArrayList<Overload>();
    private Map<Overload, Overload> allOverloadsEver = new Hashtable<Overload, Overload>();
    private volatile boolean needsInference;

    protected volatile boolean finishedFirst = true; // an empty overload is consistent
    protected volatile boolean finishedSecond = true;
    protected IdOrOpOrAnonymousName fnName;

    static final boolean DUMP_EXCLUSION = false;
    static int excl_skip = 100000;

    public static void exclDump(Object... os) {
        if (DUMP_EXCLUSION && excl_skip <= 0) {
            for (Object o : os) {
                System.out.print(o);
            }
        }
    }

    public static void exclDumpln(Object... os) {
        if (DUMP_EXCLUSION && excl_skip <= 0) {
            for (Object o : os) {
                System.out.print(o);
            }
            System.out.println();
        } else {
            excl_skip--;
        }

    }

    public static void exclDumpSkip() {
        if (DUMP_EXCLUSION && excl_skip > 0) {
            System.out.print("excl_skip = " + excl_skip + "; ");
        }
    }

    BATreeEC<List<FValue>, List<FType>, SingleFcn> cache =
            new BATreeEC<List<FValue>, List<FType>, SingleFcn>(FValue.asTypesList);

    @Override
    public boolean needsInference() {
        return needsInference;
    }

    public String getString() {
        if (pendingOverloads.size() > 0) {
            return Useful.listInDelimiters("{\n\t", overloads, " PENDING BELOW", "\n\t") + Useful.listInDelimiters(
                    "\n*\t",
                    pendingOverloads,
                    "}",
                    "\n*\t");
        }
        return Useful.listInDelimiters("{\n\t", overloads, "}", "\n\t");
    }

    public boolean getFinished() {
        return finishedFirst;
    }

    public boolean getFinishedSecond() {
        return finishedSecond;
    }

    public IdOrOpOrAnonymousName getFnName() {
        return fnName;
    }

    public boolean seqv(FValue v) {
        return false;
    }

    public boolean hasSelfDotMethodInvocation() {
        return false;
    }

    public void finishInitializing() {
        finishInitializingFirstPart();
        finishInitializingSecondPart();
        return;
    }

    /**
     * The first part of finishing makes sure that all the
     * Closures in the overload have their types assigned.
     * It is not possible to Determine the goodness or badness
     * of an overloading until actual types are known.
     */
    public void finishInitializingFirstPart() {
        if (finishedFirst) return;

        Overload ol;
        for (int i = 0; i < pendingOverloads.size(); i++) {
            // Cannot be an iterator -- will get comodification exception
            // iteration to the growing end is perfectly ok.
            ol = pendingOverloads.get(i);
            SingleFcn sfcn = ol.getFn();

            String ps = ol.ps != null ? String.valueOf(ol.ps) + " " : "";

            if (sfcn instanceof FunctionClosure) {
                FunctionClosure cl = (FunctionClosure) sfcn;
                if (!cl.getFinished()) cl.finishInitializing();

                if (debug) {
                    System.err.println("Overload " + ps + cl);
                }

            } else if (sfcn instanceof Constructor) {
                Constructor cl = (Constructor) sfcn;
                if (!cl.getFinished()) cl.finishInitializing();

                if (debug) {
                    System.err.println("Overload " + ps + cl);
                }

            } else if (sfcn instanceof GenericConstructor) {
                if (debug) {
                    System.err.println("Overload " + ps + sfcn);
                }

            } else if (sfcn instanceof Dummy_fcn) {
                if (debug) System.err.println("Overload primitive " + ps + sfcn);

            } else if (sfcn instanceof FGenericFunction) {
                if (debug) System.err.println("Overload generic " + ps + sfcn);

            } else {
                bug(errorMsg("Expected a closure or primitive, instead got ", sfcn));
            }

            if (ol.ps != null) ol.ps.close();
        }
        finishedFirst = true;
    }

    /**
     * The second part of finishing ensures that the overloadings
     * are consistent, and assigns a type to the value.
     */
    @SuppressWarnings ("unchecked")
    public synchronized boolean finishInitializingSecondPart() {

        boolean change = false;

        if (finishedSecond) return change;

        while (true) {

            List<Overload> old_pendingOverloads = pendingOverloads;
            pendingOverloads = new ArrayList<Overload>();
            List<Overload> new_overloads = new ArrayList<Overload>();

            for (Overload overload : old_pendingOverloads) {
                // Duplicate detector
                if (allOverloadsEver.containsKey(overload)) {
                    SingleFcn thisFn = overload.getFn();
                    SingleFcn otherFn = allOverloadsEver.get(overload).getFn();
                    // Debugging output
                    if (debug) {
                        String ps = overload.ps != null ? String.valueOf(overload.ps) + " " : "";
                        System.err.println("Not putting " + ps + overload + "\n   equal to " + otherFn);
                    }
                    continue;
                } else {
                    change = true;
                    new_overloads.add(overload);
                    allOverloadsEver.put(overload, overload);
                }
            }

            if (new_overloads.size() == 0) {
                bless();
                return change;
            }

            new_overloads.addAll(overloads);

            // Put shorter parameter lists first (it's a funny sort order).
            // TODO I don't understand what's "unchecked" about the next line.
            java.util.Collections.<Overload>sort(new_overloads);
            ArrayList<FType> ftalist = new ArrayList<FType>(new_overloads.size());

            OverloadComparisonResult ocr = new OverloadComparisonResult();

            for (int i = 0; i < new_overloads.size(); i++) {
                Overload o1 = new_overloads.get(i);
                Fcn fn = o1.getFn();
                if (fn instanceof GenericFunctionOrConstructor) {
                    needsInference = true;
                } else {
                    FType ty = fn.type();
                    if (ty != null) ftalist.add(ty);
                }

                if (!noCheck && !o1.guaranteedOK) {

                    for (int j = i - 1; j >= 0; j--) {

                        Overload o2 = new_overloads.get(j);
                        if (o2.guaranteedOK) continue;
                        SingleFcn f1 = o1.getFn();
                        SingleFcn f2 = o2.getFn();

                        if (genericFMAndInstance(f1, f2) || genericFMAndInstance(f2, f1)) continue;

                        ocr.reset();
                        ocr.completeOverloadingCheck(o1, o2, new_overloads, within);

                    }
                }
            }
            FType ftoa = FTypeOverloadedArrow.make(ftalist);
            this.setFtypeUnconditionally(ftoa);
            //String ftoas = ftoa.toString();
            //System.err.println(ftoas);
            this.overloads = new_overloads;

            if (!finishedFirst) {
                // Come here if we generated MORE overloads as a side-effect.
                finishInitializingFirstPart();
            }

        }
    }

    // FUTURE REFACTORING -- the static methods below will
    // become methods of this class.  The intent is to allow
    // function-by-function queries from within a trait,
    // to permit correctness/overlap checking of overrides.
    public static class OverloadComparisonResult {
        private int p1better; // set to index where p1 is subtype
        private int p2better; // set to index where p2 is subtype
        private boolean meetOk;

        boolean distinct; // known to exclude
        private int unrelated; // neither subtype nor exclude nor identical
        private boolean unequal;
        private boolean sawSymbolic1;
        private boolean sawSymbolic2;
        private int selfIndex;
        private int min;
        private boolean allObjInstance1;
        private boolean allObjInstance2;
        private boolean result1Subtype2Failure;
        private boolean result2Subtype1Failure;

        private int l1;
        private int l2;
        ;

        private boolean rest1;
        private boolean rest2;

        public OverloadComparisonResult() {
            reset();
        }

        public void reset() {
            p1better = -1; // set to index where p1 is subtype
            p2better = -1; // set to index where p2 is subtype

            distinct = false; // known to exclude
            unrelated = -1; // neither subtype nor exclude nor identical
            unequal = false;
            sawSymbolic1 = false;
            sawSymbolic2 = false;
            selfIndex = -1;
            min = Integer.MAX_VALUE;
            allObjInstance1 = true;
            allObjInstance2 = true;
            result1Subtype2Failure = false;
            result2Subtype1Failure = false;

            l1 = -1;
            l2 = -2;
            rest1 = false;
            rest2 = false;
            meetOk = false;

        }

        public void completeOverloadingCheck(Overload o1,
                                             Overload o2,
                                             Collection<Overload> new_overloads,
                                             Environment within) {

            //OverloadComparisonResult ocr = this;

            List<FType> pl1 = o1.getParams();
            List<FType> pl2 = o2.getParams();

            {
                l1 = pl1.size();
                l2 = pl2.size();

                rest1 = (l1 > 0 && pl1.get(l1 - 1) instanceof FTypeRest);
                rest2 = (l2 > 0 && pl2.get(l2 - 1) instanceof FTypeRest);

                // by construction, l1 is bigger.
                // (see sort order above)
                // possibilities
                // rest1 l2 can be no smaller than l1-1; iterate to l2
                // rest2 test out to l1
                // both  test out to l1
                // neither = required


                if (rest2) {
                    // both, rest2
                    min = l1;
                } else if (rest1) {
                    // rest1
                    if (l2 < l1 - 1) return;
                    min = l2;
                } else {
                    // neither
                    if (l1 != l2) return;
                    min = l1;
                }

                //    if (!do_continue) {


                //                  int p1better = -1; // set to index where p1 is subtype
                //                  int p2better = -1; // set to index where p2 is subtype

                //                  boolean distinct = false; // known to exclude
                //                  int unrelated = -1; // neither subtype nor exclude nor identical
                //                  boolean unequal = false;
                //                  boolean sawSymbolic1 = false;
                //                  boolean sawSymbolic2 = false;
                //                  int selfIndex = -1;

                /* This is a hack for dealing with cases like
                *
  trait Bar[\A,nat n\]
      get():ZZ32 = n
  end

  object Baz[\A,nat n\]() extends Bar[\A,n\]
  end

  f[\A\](x:Bar[\A,17\]) = 20
  g[\A\](x:Baz[\A,17\]) = 21
  h[\A\](x:Bar[\A,17\]) = 22
  h[\A\](x:Baz[\A,17\]) = 23



                */
                //                  boolean allObjInstance1 = true;
                //                  boolean allObjInstance2 = true;

                exclDumpln("Checking exclusion of ", pl1, " and ", pl2, ":");
                for (int k = 0; k < min; k++) {
                    FType p1 = pl1.get(k);
                    FType p2 = k < l2 ? pl2.get(k) : pl2.get(l2 - 1);
                    exclDump(k, ": ", p1, " and ", p2, ", ", p1.getExtends(), " and ", p2.getExtends(), ", ");

                    p1 = deRest(p1);
                    p2 = deRest(p2);

                    if (p1 == p2 && !p1.isSymbolic() && !p2.isSymbolic()) {
                        exclDumpln("equal.");
                        continue;
                    }

                    allObjInstance1 &= p1 instanceof FTypeObject;
                    allObjInstance2 &= p2 instanceof FTypeObject;

                    unequal = true;

                    if (o1.getSelfParameterIndex() == k && o1.getSelfParameterIndex() == o2.getSelfParameterIndex()) {
                        exclDumpln("self params.");
                        // ONLY set this when the self indices coincide -- otherwise, they obey the same rules.
                        selfIndex = k;
                        /*
                        * Somebody Else's Problem -- if self parameters are different,
                        * any problems will be flagged at the object level.
                        */
                        if (!p1.equals(p2)) distinct = true; // This seems wrong/unnecessary
                    }

                    if ( o1.getFn().getFnName() instanceof Op &&
                         o2.getFn().getFnName() instanceof Op &&
                         ((Op)o1.getFn().getFnName()).getFixity() !=
                         ((Op)o2.getFn().getFnName()).getFixity() )
                        distinct = true;

                    if (p1.excludesOther(p2)) {
                        exclDumpln("distinct.");
                        distinct = true;
                    } else {

                        boolean local_unrelated = true;
                        // Check for subtype constraint.
                        boolean p1subp2 = p1.subtypeOf(p2);
                        boolean p2subp1 = p2.subtypeOf(p1);
                        if (p1subp2 && !p2subp1) {
                            p1better = k;
                            local_unrelated = false;
                            exclDumpln(" left better.");
                        } else if (p2subp1 && !p1subp2) {
                            p2better = k;
                            local_unrelated = false;
                            exclDumpln(" right better.");
                        } else if (selfIndex != k) {
                            if (p1.isSymbolic()) sawSymbolic1 = true;

                            if (p2.isSymbolic()) sawSymbolic2 = true;
                        }
                        if (local_unrelated && unrelated == -1) {
                            // Here we check for self parameters!
                            if (selfIndex != k) {
                                unrelated = k;
                                exclDumpln("Unrelated.");
                            }
                        }
                    }
                }

                distinct |= unequal && (allObjInstance1 || allObjInstance2);
            }
            //      }

            if (!distinct) {
                if (p1better >= 0 && p2better >= 0) {
                    meetOk = meetExistsIn(o1, o2, new_overloads);
                } else {
                    FType r1 = o1.getFn().getRange();
                    FType r2 = o2.getFn().getRange();
                    if (p1better >= 0) {
                        // subtype rule applies
                        result1Subtype2Failure = !r1.subtypeOf(r2);
                    } else if (p2better >= 0) {
                        // subtype rule applies
                        result2Subtype1Failure = !r2.subtypeOf(r1);
                    }
                }
            }


            if (!distinct && !overloadOk()) {
                if (validOnDeclaredDomains(o1, o2, new_overloads)) return;
                if (unrelated != -1 && !sawSymbolic1 && !sawSymbolic2 && overlapCovered(o1, pl1, o2, pl2, new_overloads)) return;
            }

            describeOverloadingFailure(o1, o2, within, pl1, pl2);

            return;
        }

        public boolean overloadOk() {

            // exclusion is good.
            if (distinct) return true;

            // non-ground types need exclusion
            if (sawSymbolic1 || sawSymbolic2 || unrelated != -1) {
                return false;
            }

            // meet rule
            if (p1better >= 0 && p2better >= 0 && !meetOk) return false;

            // neither is better, not a functional method
            if (p1better < 0 && p2better < 0 && selfIndex < 0) return false;

            if (result1Subtype2Failure || result2Subtype1Failure) return false;

            return true;
        }

        private void describeOverloadingFailure(Overload o1,
                                                Overload o2,
                                                Environment within,
                                                List<FType> pl1,
                                                List<FType> pl2) {
            if (distinct) return;
            //OverloadComparisonResult ocr = this;
            if (sawSymbolic1 || sawSymbolic2) {
                exclDumpSkip();
                String explanation;
                if (sawSymbolic1 && sawSymbolic2) explanation = errorMsg("\n", o1, " and\n", o2, " have parameters\n");
                else if (sawSymbolic1) explanation = errorMsg("\n", o1, " has a parameter\n");
                else explanation = errorMsg("\n", o2, " has a parameter\n");
                explanation =
                        explanation + "with generic type, at least one pair of parameters must have excluding types";
                error(o1, o2, within, explanation);
            }

            if (unrelated != -1) {
                exclDumpSkip();
                String s1 = parameterName(unrelated, o1);
                String s2 = parameterName(unrelated, o2);

                String explanation = errorMsg(Ordinal.ordinal(unrelated + 1),
                                              " parameters ",
                                              s1,
                                              ":",
                                              pl1,
                                              " and ",
                                              s2,
                                              ":",
                                              pl2,
                                              " are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present");
                error(o1, o2, within, explanation);
            }

            if (p1better >= 0 && p2better >= 0 && !meetOk) {
                exclDumpSkip();
                error(o1, o2, within, errorMsg("Overloading of\n\t(first) ",
                                               o1,
                                               " and\n\t(second) ",
                                               o2,
                                               " fails because\n\t",
                                               formatParameterComparison(p1better, o1, o2, "more"),
                                               " but\n\t",
                                               formatParameterComparison(p2better, o1, o2, "less")));
            }
            if (p1better < 0 && p2better < 0 && selfIndex < 0) {
                exclDumpSkip();
                String explanation = null;
                if (l1 == l2 && rest1 == rest2) {
                    if (unequal) explanation = errorMsg("Overloading of ",
                                                        o1,
                                                        " and ",
                                                        o2,
                                                        " fails because their parameter lists have potentially overlapping (non-excluding) types");
                    else explanation = errorMsg("Overloading of ",
                                                o1,
                                                " and ",
                                                o2,
                                                " fails because their parameter lists have the same types");
                } else explanation = errorMsg("Overloading of ",
                                              o1,
                                              " and ",
                                              o2,
                                              " fails because of ambiguity in overlapping rest (...) parameters");
                error(o1, o2, within, explanation);
            }

            if (result1Subtype2Failure) {
                String explanation = errorMsg("Overloading of ",
                                              o1,
                                              " and ",
                                              o2,
                                              " fails because the first parameter list is a subtype of the second, but the first result is not a subtype of the second");
                // System.err.println("FAIL " + explanation);
                error(o1, o2, within, explanation);
            }
            if (result2Subtype1Failure) {
                String explanation = errorMsg("Overloading of ",
                                              o1,
                                              " and ",
                                              o2,
                                              " fails because the second parameter list is a subtype of the first, but the second result is not a subtype of the first");
                // System.err.println("FAIL " + explanation);
                error(o1, o2, within, explanation);
            }

        }
    }

    private boolean genericFMAndInstance(SingleFcn f1, SingleFcn f2) {
        if (f1 instanceof GenericFunctionalMethod && f2 instanceof FunctionalMethod) {
            GenericFunctionalMethod gfm = (GenericFunctionalMethod) f1;
            FunctionalMethod fm = (FunctionalMethod) f2;
            FTraitOrObjectOrGeneric tgfm = gfm.getSelfParameterType();
            FTraitOrObjectOrGeneric tfm = fm.getSelfParameterType();
            return tgfm.getDecl() == tfm.getDecl();
        }
        return false;
    }

    static private String formatParameterComparison(int i, Overload o1, Overload o2, String how) {
        String s1 = parameterName(i, o1);
        String s2 = parameterName(i, o2);
        return "(first) " + s1 + " is " + how + " specific than (second) " + s2;
    }

    /**
     * @param i
     * @param f1
     */
    static private String parameterName(int i, Overload o) {
        SingleFcn f1 = o.getFn();
        String s1;
        if (f1 instanceof NonPrimitive) {
            NonPrimitive np = (NonPrimitive) f1;
            s1 = np.getParameters().get(i).getName();
        } else {
            s1 = "parameter " + (i + 1);
        }
        return s1;
    }

    /**
     * Computes a conservative meet of o1 and o2, and checks for its existence.
     *
     * @param o1
     * @param o2
     * @param overloads2
     * @return
     */
    static private boolean meetExistsIn(Overload o1, Overload o2, Collection<Overload> overloads2) {
        List<FType> pl1 = o1.getParams();
        List<FType> pl2 = o2.getParams();

        Set<List<FType>> meet_set = FTypeTuple.meet(pl1, pl2);

        if (meet_set.size() != 1) return false;

        List<FType> meet = meet_set.iterator().next();

        for (Overload o : overloads2) {
            if (meet.equals(o.getParams())) return true;
        }
        // TODO finish this.

        return false;
    }

    static private FType deRest(FType p1) {
        if (p1 instanceof FTypeRest) p1 = ((FTypeRest) p1).getType();
        return p1;
    }

    /**
     * A pair of one own generic and one declaration without static
     * parameters that the parameter-by-parameter check refuses, read on the
     * two declared domains: valid when one lies strictly inside the other and
     * the inner one's return type is below the outer one's for every
     * instance of the generic, its type parameters standing for themselves;
     * or when neither lies inside the other and declarations below both
     * cover their overlap (genericOverlapCovered).  Pairs of two generics
     * keep that check.
     */
    static private boolean validOnDeclaredDomains(Overload o1, Overload o2, Collection<Overload> all) {
        SingleFcn f1 = o1.getFn();
        SingleFcn f2 = o2.getFn();
        Overload gen;
        Overload plain;
        if (ownGeneric(f1) && !(f2 instanceof GenericFunctionOrMethod)) {
            gen = o1;
            plain = o2;
        } else if (ownGeneric(f2) && !(f1 instanceof GenericFunctionOrMethod)) {
            gen = o2;
            plain = o1;
        } else {
            return false;
        }
        if (hasRest(gen.getParams()) || hasRest(plain.getParams())) return false;
        if (gen.getParams().size() != plain.getParams().size()) return false;
        try {
            SingleFcn g = gen.getFn();
            SingleFcn p = plain.getFn();
            boolean plainInside = instanceHolding(g, plain.getParams(), true) != null;
            boolean genInside = declaredBelow(g, null, p, p, true);
            if (plainInside && genInside) return false;
            if (plainInside) return p.getRange().subtypeOf(g.getRange());
            if (genInside) return g.getRange().subtypeOf(p.getRange());
            return genericOverlapCovered(gen, plain, all);
        }
        catch (FortressException ex) {
            return false;
        }
    }

    static private boolean hasRest(List<FType> l) {
        return l.size() > 0 && l.get(l.size() - 1) instanceof FTypeRest;
    }

    /**
     * The overlap of an own generic and a plain declaration, neither inside
     * the other, is covered by declarations below both.  Each parameter of
     * the generic is read as the types whose intersection holds every value
     * it takes in any instance: a type parameter as its bounds that name no
     * static parameter, a type that mentions a static parameter as Any, and
     * any other type as itself.
     */
    static private boolean genericOverlapCovered(Overload gen, Overload plain, Collection<Overload> all) {
        GenericFunctionOrMethod g = (GenericFunctionOrMethod) gen.getFn();
        List<StaticParam> sps = g.getStaticParams();
        Set<String> names = new HashSet<String>();
        for (StaticParam sp : sps) names.add(NodeUtil.getName(sp));
        List<Type> types = new ArrayList<Type>();
        for (Param prm : g.getParams()) {
            if (NodeUtil.isVarargsParam(prm)) return false;
            Option<TypeOrPattern> ot = prm.getIdType();
            if (ot.isNone()) return false;
            types.add(NodeUtil.optTypeOrPatternToType(ot).unwrap());
        }
        List<FType> plainDomain = plain.getParams();
        int n = plainDomain.size();
        if (types.size() == 1 && n != 1 && types.get(0) instanceof TupleType) {
            TupleType tt = (TupleType) types.get(0);
            if (tt.getVarargs().isSome() || !tt.getKeywords().isEmpty()) return false;
            types = tt.getElements();
        }
        if (types.size() != n) return false;
        EvalType et = new EvalType(g.getWithin());
        List<List<FType>> genDomain = new ArrayList<List<FType>>(n);
        for (Type ty : types) {
            List<FType> holds = new ArrayList<FType>();
            StaticParam tp = null;
            if (ty instanceof VarType) {
                String v = NodeUtil.nameString(((VarType) ty).getName());
                for (StaticParam sp : sps) {
                    if (NodeUtil.isTypeParam(sp) && NodeUtil.getName(sp).equals(v)) tp = sp;
                }
            }
            if (tp != null) {
                for (BaseType b : tp.getExtendsClause()) {
                    if (staticParamsNamed(b, names).isEmpty()) holds.add(et.evalType(b));
                }
            } else if (staticParamsNamed(ty, names).isEmpty()) {
                holds.add(et.evalType(ty));
            }
            if (holds.isEmpty()) holds.add(FTypeTop.ONLY);
            genDomain.add(holds);
        }
        return overlapCoveredBy(gen, genDomain, plain, plainDomain, all);
    }

    /**
     * The names of names that ty mentions.
     */
    static private Set<String> staticParamsNamed(Type ty, final Set<String> names) {
        final Set<String> found = new HashSet<String>();
        ty.accept(new NodeDepthFirstVisitor_void() {
            @Override
            public void forVarTypeOnly(VarType that) {
                String n = NodeUtil.nameString(that.getName());
                if (names.contains(n)) found.add(n);
            }

            @Override
            public void forIntRefOnly(IntRef that) {
                String n = NodeUtil.nameString(that.getName());
                if (names.contains(n)) found.add(n);
            }

            @Override
            public void forBoolRefOnly(BoolRef that) {
                String n = NodeUtil.nameString(that.getName());
                if (names.contains(n)) found.add(n);
            }
        });
        return found;
    }

    /**
     * Two declarations without static parameters, neither below the other
     * in some parameter and not excluding, whose overlap is covered by
     * declarations below both, the overlap read through comprises clauses
     * (overlapPieces).  Not for functional methods or dotted methods, whose
     * Meet Rule is another.
     */
    static private boolean overlapCovered(Overload o1, List<FType> pl1, Overload o2, List<FType> pl2,
                                          Collection<Overload> all) {
        if (o1 instanceof Overload.MethodOverload || o2 instanceof Overload.MethodOverload) return false;
        SingleFcn f1 = o1.getFn();
        SingleFcn f2 = o2.getFn();
        if (f1 instanceof GenericFunctionOrMethod || f2 instanceof GenericFunctionOrMethod) return false;
        if (o1.getSelfParameterIndex() >= 0 || o2.getSelfParameterIndex() >= 0) return false;
        if (hasRest(pl1) || hasRest(pl2) || pl1.size() != pl2.size()) return false;
        List<List<FType>> d1 = new ArrayList<List<FType>>(pl1.size());
        for (FType t : pl1) d1.add(Collections.singletonList(t));
        return overlapCoveredBy(o1, d1, o2, pl2, all);
    }

    /** The bound on the steps of one overlap search. */
    static private final int OVERLAP_STEPS = 10000;

    /** The bound on the parts of one overlap, position by position. */
    static private final int OVERLAP_PARTS = 4096;

    /**
     * The overlap of the domains d1 of o1 and d2 of o2 is covered by
     * declarations of all without static parameters whose domains lie below
     * both: the overlap, position by position, is a union of parts, each part
     * an intersection of types (intersectionPieces), and every combination of
     * parts across the positions lies inside the domain of one such
     * declaration.  Each position of d1 is the types whose intersection it
     * holds, one type unless o1 is an own generic.  An empty overlap needs no
     * declaration.  A search that does not settle refuses.
     */
    static private boolean overlapCoveredBy(Overload o1, List<List<FType>> d1, Overload o2, List<FType> d2,
                                            Collection<Overload> all) {
        int n = d1.size();
        int[] steps = {OVERLAP_STEPS};
        List<List<Set<FType>>> parts = new ArrayList<List<Set<FType>>>(n);
        long combinations = 1;
        for (int k = 0; k < n; k++) {
            List<FType> both = new ArrayList<FType>(d1.get(k));
            both.add(d2.get(k));
            List<Set<FType>> pk = intersectionPieces(both, new HashSet<List<FType>>(), steps);
            if (pk == null) return false;
            if (pk.isEmpty()) return true;
            parts.add(pk);
            combinations *= pk.size();
            if (combinations > OVERLAP_PARTS) return false;
        }
        List<List<FType>> covers = new ArrayList<List<FType>>();
        for (Overload o : all) {
            if (o == o1 || o == o2 || o instanceof Overload.MethodOverload) continue;
            SingleFcn f = o.getFn();
            if (f instanceof GenericFunctionOrMethod) continue;
            List<FType> d = o.getParams();
            if (d.size() != n || hasRest(d)) continue;
            FType dt = FTypeTuple.make(d);
            try {
                if (!dt.subtypeOf(FTypeTuple.make(d2))) continue;
                if (o1.getFn() instanceof GenericFunctionOrMethod) {
                    if (instanceHolding(o1.getFn(), d, true) == null) continue;
                } else {
                    List<FType> d1Types = new ArrayList<FType>(n);
                    for (List<FType> ts : d1) d1Types.add(ts.get(0));
                    if (!dt.subtypeOf(FTypeTuple.make(d1Types))) continue;
                }
            }
            catch (FortressException ex) {
                continue;
            }
            covers.add(d);
        }
        int[] index = new int[n];
        while (true) {
            boolean covered = false;
            for (List<FType> c : covers) {
                boolean inside = true;
                for (int k = 0; inside && k < n; k++) {
                    inside = someBelow(parts.get(k).get(index[k]), c.get(k));
                }
                if (inside) {
                    covered = true;
                    break;
                }
            }
            if (!covered) return false;
            int k = 0;
            while (k < n && ++index[k] == parts.get(k).size()) {
                index[k] = 0;
                k++;
            }
            if (k == n) return true;
        }
    }

    static private boolean someBelow(Set<FType> part, FType t) {
        for (FType p : part) {
            try {
                if (p.subtypeOf(t)) return true;
            }
            catch (FortressException ex) {
                // not known to be below
            }
        }
        return false;
    }

    /**
     * Parts whose union holds every value of every type of ts, each part a
     * set of types standing for their intersection: overlapPieces for two
     * types; for more, the types with none of the others below them, none
     * when two of them exclude, otherwise the parts of each type the first
     * comprises clause among them lists, with the others, and the types
     * themselves when none is closed.  Null when the search meets a cycle or
     * runs out of steps, or a type is symbolic.
     */
    static private List<Set<FType>> intersectionPieces(List<FType> ts, Set<List<FType>> path, int[] steps) {
        if (ts.size() == 2) return overlapPieces(ts.get(0), ts.get(1), path, steps);
        List<Set<FType>> res = new ArrayList<Set<FType>>();
        if (ts.size() == 1) {
            res.add(Collections.singleton(ts.get(0)));
            return res;
        }
        if (--steps[0] < 0) return null;
        for (FType t : ts) {
            if (t instanceof SymbolicType) return null;
        }
        try {
            List<FType> least = new ArrayList<FType>(ts.size());
            for (int i = 0; i < ts.size(); i++) {
                FType t = ts.get(i);
                boolean above = false;
                for (int j = 0; !above && j < ts.size(); j++) {
                    FType u = ts.get(j);
                    if (j != i && u.subtypeOf(t) && (j < i || !t.subtypeOf(u))) above = true;
                }
                if (!above) least.add(t);
            }
            if (least.size() < ts.size()) return intersectionPieces(least, path, steps);
            for (int i = 0; i < least.size(); i++) {
                for (int j = i + 1; j < least.size(); j++) {
                    if (least.get(i).excludesOther(least.get(j))) return res;
                }
            }
            int closed = -1;
            for (int i = 0; closed < 0 && i < least.size(); i++) {
                if (least.get(i).getComprises() != null) closed = i;
            }
            if (closed < 0) {
                res.add(new HashSet<FType>(least));
                return res;
            }
            if (!path.add(least)) return null;
            for (FType c : least.get(closed).getComprises()) {
                List<FType> next = new ArrayList<FType>(least);
                next.set(closed, c);
                List<Set<FType>> sub = intersectionPieces(next, path, steps);
                if (sub == null) return null;
                res.addAll(sub);
            }
            path.remove(least);
            return res;
        }
        catch (FortressException ex) {
            return null;
        }
    }

    /**
     * Parts whose union holds every value of both p and q, each part a set
     * of types standing for their intersection: p or q when one is a subtype
     * of the other; none when they exclude; otherwise the parts of each type
     * a comprises clause of p (else of q) lists, with the other; and p with q
     * when neither is closed.  Null when the search meets a cycle or runs
     * out of steps, or a type is symbolic.
     */
    static private List<Set<FType>> overlapPieces(FType p, FType q, Set<List<FType>> path, int[] steps) {
        if (--steps[0] < 0) return null;
        if (p instanceof SymbolicType || q instanceof SymbolicType) return null;
        List<Set<FType>> res = new ArrayList<Set<FType>>();
        try {
            if (p.subtypeOf(q)) {
                res.add(Collections.singleton(p));
                return res;
            }
            if (q.subtypeOf(p)) {
                res.add(Collections.singleton(q));
                return res;
            }
            if (p.excludesOther(q)) return res;
            Set<FType> pc = p.getComprises();
            Set<FType> qc = q.getComprises();
            if (pc == null && qc == null) {
                Set<FType> both = new HashSet<FType>();
                both.add(p);
                both.add(q);
                res.add(both);
                return res;
            }
            List<FType> key = Useful.<FType>list(p, q);
            if (!path.add(key)) return null;
            if (pc != null) {
                for (FType c : pc) {
                    List<Set<FType>> sub = overlapPieces(c, q, path, steps);
                    if (sub == null) return null;
                    res.addAll(sub);
                }
            } else {
                for (FType c : qc) {
                    List<Set<FType>> sub = overlapPieces(p, c, path, steps);
                    if (sub == null) return null;
                    res.addAll(sub);
                }
            }
            path.remove(key);
            return res;
        }
        catch (FortressException ex) {
            return null;
        }
    }

    /**
     * Needs an environment to construct its supertype,
     * but otherwise it is never examined.
     *
     * @param within
     */
    public OverloadedFunction(IdOrOpOrAnonymousName fnName, Environment within) {
        super(within);
        this.fnName = fnName;
    }

    public OverloadedFunction(IdOrOpOrAnonymousName fnName, Set<? extends Simple_fcn> ssf, Environment within) {
        this(fnName, within);
        for (Simple_fcn sf : ssf) {
            addOverload(sf);
        }
        finishInitializingSecondPart();
    }

    public void addOverload(SingleFcn fn) {
        //      if (finishedFirst && !fn.getFinished())
        //          throw new IllegalStateException("Any functions added after finishedFirst must have types assigned.");
        addOverload(new Overload(fn));
    }

    public void addOverload(SingleFcn fn, boolean guaranteedOK) {
        //      if (finishedFirst && !fn.getFinished())
        //          throw new IllegalStateException("Any functions added after finishedFirst must have types assigned.");
        addOverload(new Overload(fn, this, guaranteedOK));
    }

    public void addOverloads(OverloadedFunction cls) {
        if (cls == this) return; // Prevents a comodification exception if
        // we import FortressLibrary a second time.

        List<Overload> clso = cls.overloads;
        for (Overload cl : clso) {
            addOverload(cl);
        }
        clso = cls.pendingOverloads;
        try {
            for (Overload cl : clso) {

                addOverload(cl);
            }
        }
        catch (ConcurrentModificationException ex) {
            bug("Whoops, concurrent modification");
        }

    }

    /**
     * Add an overload to the list of overloads. Not Allowed after the
     * overloaded function has been (completely) finished.
     *
     * @param overload
     */
    public void addOverload(Overload overload) {

        if (!finishedSecond) {
            // Reset finishedFirst -- new overloads can appear as side-effect
            // of finishing first overloads.
            finishedFirst = false;
            pendingOverloads.add(overload);
            // InstantiationLock.lastOverload = this;
            // InstantiationLock.lastOverloadThrowable = Useful.backtrace(0, 1000);
        } else {
            // InstantiationLock.L.lock();
            if (debug) System.err.println("Lock " + fnName.stringName());
            finishedFirst = false;
            finishedSecond = false;
            pendingOverloads.add(overload);
            // InstantiationLock.lastOverload = this;
            // InstantiationLock.lastOverloadThrowable = Useful.backtrace(0, 1000);
        }

        if (debug) {
            try {
                DebugletPrintStream ps = DebugletPrintStream.make("OVERLOADS");
                overload.ps = ps;
                System.err.println("add " + ps + " " + overload);
                ps.backtrace().flush();
            } catch (IOException e) {}
        }

    }

    // TODO continue audit of functions in here.
    @Override
    public FValue applyInnerPossiblyGeneric(List<FValue> args) {

        SingleFcn best_f = cache.get(args);

        if (best_f == null) {

            best_f = bestMatch(args, overloads);

            if (best_f instanceof FunctionalMethod) {
                FunctionalMethod fm = (FunctionalMethod) best_f;
                if (debugMatch) System.err.print("\nRefining functional method " + best_f);
                best_f = fm.getApplicableClosure(args);
            }
            if (best_f instanceof GenericFunctionOrMethod) {
                return bug(errorMsg("overload res yielded generic ", best_f));
            }

            if (debugMatch) System.err.println("Choosing " + best_f + " for args " + args);
            cache.syncPut(args, best_f);
        }

        return best_f.applyInnerPossiblyGeneric(args);
    }

    /**
     * Returns index of best match for args among the overloaded functions.
     *
     * @throws Error
     */
    public SingleFcn bestMatch(List<FValue> args, List<Overload> someOverloads) throws Error {
        if (!finishedSecond && InstantiationLock.L.isHeldByCurrentThread()) bug("Cannot call before 'setFinished()'");

        SingleFcn best = bestMatchInternal(args, someOverloads, true);
        if (best == null) {
            best = bestMatchWithCoercion(args, someOverloads);
        }
        if (best == null) {
            // Replay the test for debugging
            // best = bestMatchInternal(args, someOverloads);
            error(errorMsg("Failed to find any matching overload, args = ",
                           Useful.listInParens(args),
                           ", overload = ",
                           this));
        }
        return best;
    }

    /**
     * The most specific overload applicable to args without coercion, or null.
     */
    public SingleFcn bestMatchWithoutCoercion(List<FValue> args) {
        return bestMatchInternal(args, overloads, false);
    }

    /**
     * For args that no overload takes without coercion: the most specific of
     * the overloads applicable with coercion, a generic one instantiated by
     * EvaluatorBase.inferAndInstantiateGenericFunction, as a call that
     * converts its arguments first and then dispatches the converted
     * arguments as an ordinary call; or null.  The coercions depend only on
     * the argument types, so the call may be kept in the per-argument-type
     * cache.  It is an error when no one of them is more specific than all
     * the others.  A generic overload whose instance takes args without a
     * coercion is that instance.
     */
    private SingleFcn bestMatchWithCoercion(List<FValue> args, List<Overload> someOverloads) {
        Coercions.CoercedCall best = null;
        SingleFcn bestUnconverted = null;
        List<Coercions.CoercedCall> applicable = new ArrayList<Coercions.CoercedCall>();
        for (Overload o : someOverloads) {
            SingleFcn sfn = o.getFn();
            if (sfn instanceof GenericFunctionOrMethod) {
                GenericFunctionOrMethod gsfn = (GenericFunctionOrMethod) sfn;
                try {
                    sfn = EvaluatorBase.inferAndInstantiateGenericFunction(args, gsfn, gsfn.getWithin());
                }
                catch (FortressException pe) {
                    continue;
                }
            }
            List<FValue> oargs = sfn.fixupArgCount(args);
            if (oargs == null) continue;
            List<FType> domain = sfn.getDomain();
            SingleFcn[] coercions = new SingleFcn[oargs.size()];
            boolean applies = true;
            boolean converts = false;
            for (int j = 0; applies && j < oargs.size(); j++) {
                FType t = Useful.clampedGet(domain, j).deRest();
                FValue a = oargs.get(j);
                if (!argsMatchTypes(Collections.singletonList(a), Collections.singletonList(t))) {
                    coercions[j] = Coercions.coercionFor(t, a);
                    applies = coercions[j] != null;
                    converts = true;
                }
            }
            if (!applies) continue;
            Coercions.CoercedCall c = new Coercions.CoercedCall(sfn, coercions, this);
            applicable.add(c);
            if (best == null || Coercions.moreSpecific(domain, best.getDomain(), oargs.size())) {
                best = c;
                bestUnconverted = converts ? null : sfn;
            }
        }
        for (Coercions.CoercedCall c : applicable) {
            if (c != best && !Coercions.moreSpecific(best.getDomain(), c.getDomain(), best.arity())) {
                return error(errorMsg("Ambiguous coercion, args = ",
                                      Useful.listInParens(args),
                                      ", applicable with coercion = ",
                                      Useful.listInDelimiters("{", applicable, "}")));
            }
        }
        return bestUnconverted != null ? bestUnconverted : best;
    }

    /**
     * The most specific overload applicable to args without coercion, a
     * generic one instantiated by EvaluatorBase.inferByUnification, or null.
     * Overloads are compared by moreSpecificDeclaration, on their declared
     * domains where one of them has static parameters of its own.
     * With reinstantiate, a generic overload chosen is instantiated again by
     * EvaluatorBase.inferAndInstantiateGenericFunction; when that instance
     * converts an argument, the result is a call that converts the arguments
     * and dispatches the converted ones again (convertedCall).
     */
    private SingleFcn bestMatchInternal(List<FValue> args, List<Overload> someOverloads, boolean reinstantiate) {
        SingleFcn best_sfn = null;
        SingleFcn best_decl = null;
        GenericFunctionOrMethod best_generic = null;

        if (debugMatch) {
            System.err.println("Seeking best match for " + args);
        }

        for (Overload o : someOverloads) {
            if (o.getParams() == null) {
                bug(errorMsg("Unfinished overloaded function ", this));
            }
            SingleFcn sfn = o.getFn();

            List<FValue> oargs = args;

            if (sfn instanceof GenericFunctionOrMethod) {
                GenericFunctionOrMethod gsfn = (GenericFunctionOrMethod) sfn;
                try {
                    sfn = EvaluatorBase.inferByUnification(oargs, gsfn, gsfn.getWithin());
                    if (debugMatch) System.err.println("Inferred from " + gsfn + " to " + sfn);
                }
                catch (FortressException pe) {
                    if (debugMatch) System.err.println("No match for " + gsfn);
                    continue; // No match, means no dice.
                }

            } else if (debugMatch) {
                System.err.println("Trying w/o instantiation: " + sfn);
            }

            oargs = sfn.fixupArgCount(args);

            if (oargs != null && argsMatchTypes(oargs, sfn.getDomain()) &&
                (best_sfn == null || moreSpecificDeclaration(o.getFn(), sfn, best_decl, best_sfn))) {
                best_sfn = sfn;
                best_decl = o.getFn();
                best_generic = o.getFn() instanceof GenericFunctionOrMethod ? (GenericFunctionOrMethod) o.getFn() : null;
            }

        }
        if (reinstantiate && best_generic != null) {
            try {
                best_sfn = EvaluatorBase.inferAndInstantiateGenericFunction(args, best_generic, best_generic.getWithin());
                best_sfn = convertedCall(best_sfn, args);
            }
            catch (FortressException pe) {
                // the instance chosen stands
            }
        }
        return best_sfn;
    }

    /**
     * The instance inst itself when it takes args without a coercion, or when
     * this is an overloaded method; otherwise a call that converts args to
     * inst's domain and dispatches the converted arguments again, so that
     * they reach the most specific overload that fits them.  inst also stands
     * when some converted argument has no coercion that coercionFor finds.
     */
    private SingleFcn convertedCall(SingleFcn inst, List<FValue> args) {
        if (this instanceof OverloadedMethod) return inst;
        List<FValue> oargs = inst.fixupArgCount(args);
        if (oargs == null) return inst;
        List<FType> domain = inst.getDomain();
        SingleFcn[] coercions = new SingleFcn[oargs.size()];
        boolean converts = false;
        for (int j = 0; j < oargs.size(); j++) {
            FType t = Useful.clampedGet(domain, j).deRest();
            FValue a = oargs.get(j);
            if (!argsMatchTypes(Collections.singletonList(a), Collections.singletonList(t))) {
                coercions[j] = Coercions.coercionFor(t, a);
                if (coercions[j] == null) return inst;
                converts = true;
            }
        }
        return converts ? new Coercions.CoercedCall(inst, coercions, this) : inst;
    }

    /**
     * A declaration whose own static parameters a call's arguments
     * instantiate: a generic function or constructor.  A functional method
     * of a generic trait is instantiated from its self argument, and a
     * generic dotted method has no symbolic instantiation to read its
     * declared domain from; both are compared on the instance a call makes.
     */
    static boolean ownGeneric(SingleFcn f) {
        return f instanceof GenericFunctionOrConstructor && !(f instanceof GenericFunctionalMethod);
    }

    /**
     * The domain f is compared on: an own generic's declared parameter types,
     * each type parameter standing for itself with its bounds as its
     * supertypes; otherwise the domain of inst, the instance a call made.
     */
    private static List<FType> declaredDomain(SingleFcn f, SingleFcn inst, boolean normalized) {
        SingleFcn d = ownGeneric(f) || inst == null ? f : inst;
        return normalized ? d.getNormalizedDomain() : d.getDomain();
    }

    /**
     * A value that carries a type and nothing else, for finding an instance
     * of a generic declaration from declared types.
     */
    private static final class TypeOnly extends FValue {
        private final FType t;

        TypeOnly(FType t) {
            this.t = t;
        }

        public FType type() {
            return t;
        }

        public boolean seqv(FValue other) {
            return this == other;
        }

        public String getString() {
            return "<" + t + ">";
        }
    }

    /**
     * An instance of the own generic g whose domain holds the types ts, as
     * walk's inference finds it from values that carry only those types; or
     * null.
     */
    static SingleFcn instanceHolding(SingleFcn g, List<FType> ts, boolean normalized) {
        GenericFunctionOrMethod gg = (GenericFunctionOrMethod) g;
        List<FValue> dummies = new ArrayList<FValue>(ts.size());
        for (FType t : ts) dummies.add(new TypeOnly(t.deRest()));
        try {
            SingleFcn inst = EvaluatorBase.inferByUnification(dummies, gg, gg.getWithin());
            List<FType> d = normalized ? inst.getNormalizedDomain() : inst.getDomain();
            return FTypeTuple.make(ts).subtypeOf(FTypeTuple.make(d)) ? inst : null;
        }
        catch (FortressException ex) {
            return null;
        }
        catch (EmptyLatticeIntervalError ex) {
            return null;
        }
    }

    /**
     * The declared domain of f lies inside that of g: when g is an own
     * generic, some instance of g holds f's declared domain; otherwise f's
     * domain is a subtype of g's.  inf and ing are the instances a call made,
     * read for a declaration that is not an own generic.
     */
    static boolean declaredBelow(SingleFcn f, SingleFcn inf, SingleFcn g, SingleFcn ing, boolean normalized) {
        try {
            List<FType> df = declaredDomain(f, inf, normalized);
            if (ownGeneric(g)) return instanceHolding(g, df, normalized) != null;
            return FTypeTuple.make(df).subtypeOf(FTypeTuple.make(declaredDomain(g, ing, normalized)));
        }
        catch (FortressException ex) {
            return false;
        }
    }

    private final Map<List<SingleFcn>, Boolean> declaredBelowMemo =
            Collections.synchronizedMap(new HashMap<List<SingleFcn>, Boolean>());

    /**
     * Whether a call should prefer the declaration f, applicable at its
     * instance inf, to g, applicable at ing.  When one of them is an own
     * generic and exactly one declared domain lies inside the other, the
     * inner one; otherwise the instance with the more specific domain, as
     * for two plain declarations.
     */
    private boolean moreSpecificDeclaration(SingleFcn f, SingleFcn inf, SingleFcn g, SingleFcn ing) {
        if (ownGeneric(f) || ownGeneric(g)) {
            boolean fg = memoDeclaredBelow(f, inf, g, ing);
            boolean gf = memoDeclaredBelow(g, ing, f, inf);
            if (fg != gf) return fg;
        }
        return FTypeTuple.moreSpecificThan(inf.getDomain(), ing.getDomain());
    }

    private boolean memoDeclaredBelow(SingleFcn f, SingleFcn inf, SingleFcn g, SingleFcn ing) {
        if (!stableDomain(f) || !stableDomain(g)) return declaredBelow(f, inf, g, ing, false);
        List<SingleFcn> key = Useful.<SingleFcn>list(f, g);
        Boolean b = declaredBelowMemo.get(key);
        if (b == null) {
            b = declaredBelow(f, inf, g, ing, false);
            declaredBelowMemo.put(key, b);
        }
        return b;
    }

    /**
     * The domain the comparison reads for f does not depend on the instance
     * a call made.
     */
    private static boolean stableDomain(SingleFcn f) {
        return ownGeneric(f) || !(f instanceof GenericFunctionOrMethod) && !(f instanceof FunctionalMethod);
    }

    /**
     * @param args
     * @param args_len
     * @param i
     * @param o
     * @return
     */
    // private boolean argsMatchTypes(List<FValue> args, Overload o) {
    //     List<FType> l = o.getParams();
    //     return argsMatchTypes(args, l);
    // }

    public static boolean argsMatchTypes(List<FValue> args, List<FType> l) {
        for (int j = 0; j < args.size(); j++) {
            FValue a = args.get(j);
            FType t = Useful.clampedGet(l, j).deRest();
            try {
                if (!t.typeMatch(a)) {
                    return false;
                }
            }
            catch (FortressException e) {
                return false;
            }
        }
        return true;
    }

    /**
     * @return Returns the overloads.
     */
    public List<Overload> getOverloads() {
        return overloads;
    }

    /**
     * To be used for those overloaded functions that are
     * "correct by construction" and do not require the
     * very exciting overload consistency test.
     */
    public void bless() {
        if (finishedSecond) return;
        finishedSecond = true;
        finishedFirst = true;
        if (debug) System.err.println("Unlock " + fnName.stringName());
    }

    /* This code gives overloaded functions the interface of a set of generic
     * functions.
     *
     */

    private class Factory implements Factory1P<List<FType>, Fcn, HasAt> {

        public Fcn make(List<FType> args, HasAt location) {
            // TODO finish this.

            SingleFcn f = null;
            OverloadedFunction of = null;

            for (Overload ol : getOverloads()) {
                SingleFcn sfcn = ol.getFn();
                if (sfcn instanceof GenericFunctionOrMethod) {
                    GenericFunctionOrMethod gf = (GenericFunctionOrMethod) sfcn;

                    // Check that args matches the static parameters of the generic function
                    // TODO -- can a generic instantiation result in an unfulfillable overloading?

                    if (compatible(args, gf.getStaticParams())) {

                        SingleFcn tf = gf.typeApply(args, location);
                        if (f == null) {
                            f = tf;
                        } else if (of == null) {
                            of = new OverloadedFunction(getFnName(), getWithin());
                            of.addOverload(f);
                            of.addOverload(tf);
                        } else {
                            of.addOverload(tf);
                        }
                    }

                }
            }
            if (of != null) {
                of.finishInitializing();
                return of;
            }
            if (f != null) return f;
            return error(location, errorMsg("No matches for instantiation of overloaded function ",
                                            OverloadedFunction.this,
                                            " with ",
                                            Useful.listInParens(args)));
        }
    }

    Memo1P<List<FType>, Fcn, HasAt> memo = new Memo1P<List<FType>, Fcn, HasAt>(new Factory());

    public Fcn make(List<FType> l, HasAt location) {
        return memo.make(l, location);
    }


    public static boolean compatible(List<FType> args, List<StaticParam> val) {
        if (args.size() != val.size()) return false;
        for (int i = 0; i < args.size(); i++) {
            // TODO need to make this check more comprehensive and detailed.
            FType a = args.get(i);
            StaticParam p = val.get(i);
            if (NodeUtil.isTypeParam(p)) {
                if (a instanceof FTypeNat) return false;
            }
        }
        return true;
    }

    public Fcn typeApply(List<StaticArg> args, Environment e, HasAt location) {
        EvalType et = new EvalType(e);
        // TODO Can combine these two functions if we enhance the memo and factory
        // to pass two parameters instead of one.
        ArrayList<FType> argValues = et.forStaticArgList(args);

        return typeApply(argValues, location);
    }

    /**
     * Same as typeApply, but with the types evaluated already.
     *
     * @param args
     * @param e
     * @param within
     * @param argValues
     * @return
     * @throws ProgramError
     */
    Fcn typeApply(List<FType> argValues, HasAt location) throws ProgramError {
        // Need to filter for matching generics in the overloaded type.
        return make(argValues, location);
    }


}
