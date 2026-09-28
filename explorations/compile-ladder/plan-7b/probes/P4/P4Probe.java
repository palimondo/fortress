/* Probe P4 (climb batch 7b, explorations/coordinator/CLIMB-BATCH-7.md section 6): walk's choice of
 * declaration on declared domains, as a logging shadow.  Called from the shadow copy of
 * OverloadedFunction.java (make-shadow.py) only when -Dprobe.p4 is set; it never changes a choice or
 * a verdict, it writes each disagreement to the file -Dprobe.p4.log names, each distinct line once.
 *
 * The declared-domain relation (reviews/overloading-judgement.md sections 3.5 and 3.7, defect 1;
 * the Types paper's existential reading of a generic declaration's domain):
 *   a <= b  when b is plain:   a's declared parameter types, a type variable standing for itself
 *                              with its declared bounds as its supertypes (walk's SymbolicType), are
 *                              a subtype of b's, as tuples (FTypeTuple.make ... subtypeOf);
 *   a <= b  when b is generic: b's static arguments inferred from a's declared parameter types by
 *                              walk's own inference (EvaluatorBase.inferAndInstantiateGenericFunction,
 *                              given values that carry only those types), and a's declared types a
 *                              subtype of the instance's domain.
 * The choice: among the declarations today's code finds applicable (a generic one instantiated at the
 * arguments, as today), the one strictly below every other on this relation, taken greedily in the
 * order bestMatchInternal walks (the first kept on a tie, as today).
 * Only a declaration with static parameters of its own is read this way (ownGeneric): a functional
 * method of a generic trait (walk's GenericFunctionalMethod) carries only its trait's parameters, is
 * instantiated from its self argument's type, and keeps today's instance domain; a set with no
 * own-generic declaration is not compared.  The load-time verdict is compared only for pairs with an
 * own-generic declaration.
 */
package com.sun.fortress.interpreter.evaluator.values;

import com.sun.fortress.interpreter.evaluator.EvaluatorBase;
import com.sun.fortress.interpreter.evaluator.types.*;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.*;

public final class P4Probe {
    public static final boolean ON = System.getProperty("probe.p4") != null;
    private static final String LOG = System.getProperty("probe.p4.log");
    private static final Set<String> seen = new HashSet<String>();
    private static final Map<String, Boolean> leCache = new HashMap<String, Boolean>();

    static synchronized void log(String line) {
        if (!seen.add(line)) return;
        if (LOG == null) { System.err.println("@@P4 " + line); return; }
        try {
            PrintWriter w = new PrintWriter(new FileWriter(LOG, true));
            w.println(line);
            w.close();
        } catch (Throwable t) {
            System.err.println("@@P4 " + line);
        }
    }

    static String decl(Overload o) {
        SingleFcn f = o.getFn();
        String at;
        try { at = o.at(); } catch (Throwable t) { at = "?"; }
        return (f instanceof GenericFunctionOrMethod ? "generic " : "plain ") + f + " @ " + at;
    }

    static String types(List<FValue> args) {
        StringBuilder b = new StringBuilder("(");
        for (int i = 0; i < args.size(); i++) {
            if (i > 0) b.append(", ");
            FType t = null;
            try { t = args.get(i).type(); } catch (Throwable x) { }
            b.append(t == null ? "?" : t.toString());
        }
        return b.append(")").toString();
    }

    /** A value that carries a type and nothing else, for inference from declared types. */
    static final class TypeOnly extends FValue {
        private final FType t;
        TypeOnly(FType t) { this.t = t; }
        public FType type() { return t; }
        public boolean seqv(FValue other) { return this == other; }
        public String getString() { return "<" + t + ">"; }
    }

    /** The declared domain as the comparison reads it: an own-generic declaration's declared parameter
     *  types; otherwise the instance's domain today's code compares (inst), or the declared ones. */
    static List<FType> form(Overload o, SingleFcn inst) {
        if (ownGeneric(o) || inst == null) return o.getParams();
        return inst.getDomain();
    }

    static Boolean declLE(Overload a, Overload b) { return declLE(a, null, b, null); }

    /** a <= b on declared domains; null when it cannot be decided. */
    static synchronized Boolean declLE(Overload a, SingleFcn ia, Overload b, SingleFcn ib) {
        String key = System.identityHashCode(a) + "/" + System.identityHashCode(ia) + ":" + System.identityHashCode(b) + "/" + System.identityHashCode(ib);
        if (leCache.containsKey(key)) return leCache.get(key);
        Boolean r;
        try {
            List<FType> pa = form(a, ia);
            SingleFcn fb = b.getFn();
            if (ownGeneric(b)) {
                List<FValue> dummies = new ArrayList<FValue>();
                for (FType t : pa) dummies.add(new TypeOnly(t.deRest()));
                GenericFunctionOrMethod gb = (GenericFunctionOrMethod) fb;
                // walk's inference takes a functional method's self argument only as an instance of
                // the generic trait (EvaluatorBase.java:63-76); a declared self type that is a plain
                // type or a type variable is read as its supertype that instantiates that trait.
                if (gb instanceof GenericFunctionalMethod) {
                    GenericFunctionalMethod gfm = (GenericFunctionalMethod) gb;
                    int spi = gfm.getSelfParameterIndex();
                    if (spi >= 0 && spi < pa.size() && !(pa.get(spi).deRest() instanceof GenericTypeInstance)) {
                        FTypeGeneric want = gfm.getSelfParameterTypeAsGeneric();
                        for (FType ft : pa.get(spi).deRest().getTransitiveExtends())
                            if (ft instanceof GenericTypeInstance && ((GenericTypeInstance) ft).getGeneric().equals(want)) {
                                dummies.set(spi, new TypeOnly(ft));
                                break;
                            }
                    }
                }
                SingleFcn inst;
                try {
                    inst = EvaluatorBase.inferAndInstantiateGenericFunction(dummies, gb, gb.getWithin());
                } catch (Throwable x) {
                    inst = null;  // no instance of b takes a's declared types: not below
                    if (System.getProperty("probe.p4.debug") != null)
                        log("DEBUG infer " + decl(b) + " from " + pa + " (" + dummies + "): " + x);
                }
                if (inst != null && System.getProperty("probe.p4.debug") != null
                    && !FTypeTuple.make(pa).subtypeOf(FTypeTuple.make(inst.getDomain())))
                    log("DEBUG not below " + decl(b) + ": " + pa + " against instance " + inst.getDomain());
                r = inst != null && FTypeTuple.make(pa).subtypeOf(FTypeTuple.make(inst.getDomain()));
            } else {
                r = FTypeTuple.make(pa).subtypeOf(FTypeTuple.make(form(b, ib)));
            }
        } catch (Throwable t) {
            r = null;
        }
        leCache.put(key, r);
        return r;
    }

    /** A declaration whose own static parameters (not a generic trait's, lifted into its functional
     *  methods) are instantiated from the arguments: the reading the judgement's defect 1 is about.
     *  A functional method whose only static parameters are its trait's is instantiated from its self
     *  argument's type (EvaluatorBase.java:63-76) and keeps today's instance. */
    static boolean ownGeneric(Overload o) {
        // walk's GenericFunctionalMethod carries its trait's static parameters only
        // (GenericFunctionalMethod.getStaticParams(): the self type's declaration's)
        return o.getFn() instanceof GenericFunctionOrMethod && !(o.getFn() instanceof GenericFunctionalMethod);
    }

    /** A functional method of a generic trait sits in the set both as its generic declaration and as
     *  its instance for each trait instance made so far (the load check skips those pairs,
     *  genericFMAndInstance).  Its declared domain is the generic declaration's: an entry is read as
     *  the generic entry at the same source position when the set holds one. */
    static Overload canon(Overload o, List<Overload> all) {
        if (o.getFn() instanceof GenericFunctionOrMethod || all == null) return o;
        for (Overload g : all)
            if (g != o && g.getFn() instanceof GenericFunctionOrMethod && samePlace(g, o)) return g;
        return o;
    }

    static boolean strictlyBelow(Overload a, SingleFcn ia, Overload b, SingleFcn ib) {
        Boolean ab = declLE(a, ia, b, ib), ba = declLE(b, ib, a, ia);
        return ab != null && ab && !(ba != null && ba);
    }

    /** At a call: today's choice against the declared-domain choice over the same applicable set. */
    static void dispatch(Object fn, List<FValue> args, List<Overload> applicable, List<SingleFcn> insts, Overload today) {
        if (applicable.size() < 2) return;
        boolean anyOwn = false;
        for (Overload o : applicable) anyOwn |= ownGeneric(o);
        if (!anyOwn) return;   // no own-generic declaration: the comparison is today's
        int best = -1;
        for (int k = 0; k < applicable.size(); k++)
            if (best < 0 || strictlyBelow(applicable.get(k), insts.get(k), applicable.get(best), insts.get(best))) best = k;
        boolean unique = true;
        String undecided = "";
        StringBuilder notBelow = new StringBuilder();
        for (int k = 0; k < applicable.size(); k++) {
            if (k == best) continue;
            Boolean le = declLE(applicable.get(best), insts.get(best), applicable.get(k), insts.get(k));
            if (le == null) { undecided = " undecided"; notBelow.append("\n    undecided against: ").append(decl(applicable.get(k))); }
            else if (!le) { unique = false; notBelow.append("\n    not below: ").append(decl(applicable.get(k))); }
        }
        Overload b = applicable.get(best);
        String name = String.valueOf(fn);
        if (b != today && !samePlace(b, today)) {
            log("DISPATCH " + name + " args=" + types(args) + undecided
                + "\n    today:    " + decl(today) + "\n    declared: " + decl(b) + notBelow);
        } else if (!unique) {
            log("DECL-AMBIGUOUS " + name + " args=" + types(args) + undecided + "\n    today and declared: " + decl(today)
                + notBelow);
        }
    }

    /** At load: today's pairwise verdict against the declared-domain verdict, for pairs with a generic. */
    static void load(Overload o1, Overload o2, boolean todayOk, boolean distinct, boolean meetFound, List<Overload> all) {
        if (!ownGeneric(o1) && !ownGeneric(o2)) return;
        if (samePlace(o1, o2)) return;
        Boolean le12 = declLE(o1, o2), le21 = declLE(o2, o1);
        boolean ok;
        String why;
        if (distinct) { ok = true; why = "exclude"; }
        else if (le12 == null || le21 == null) { ok = todayOk; why = "undecided"; }
        else if (le12 && le21) { ok = false; why = "equal domains"; }
        else if (le12) { ok = retOk(o1, o2); why = "first below, return " + (ok ? "ok" : "fails"); }
        else if (le21) { ok = retOk(o2, o1); why = "second below, return " + (ok ? "ok" : "fails"); }
        else { ok = meetFound; why = "neither below, meet " + (meetFound ? "found" : "missing"); }
        if (ok != todayOk || why.equals("undecided"))
            log("LOAD today=" + (todayOk ? "ok" : "refused") + " declared=" + (ok ? "ok" : "refused") + " (" + why + ")"
                + "\n    first:  " + decl(o1) + "\n    second: " + decl(o2));
    }

    static boolean samePlace(Overload a, Overload b) {
        try { return a.at().equals(b.at()); } catch (Throwable t) { return false; }
    }

    /** The return type rule as walk's load check reads it today (OverloadedFunction's
     *  result1Subtype2Failure): the declared ranges, a type variable standing for itself. */
    static boolean retOk(Overload more, Overload less) {
        try {
            return more.getFn().getRange().subtypeOf(less.getFn().getRange());
        } catch (Throwable t) {
            return true;
        }
    }
}
