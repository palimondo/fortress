package com.sun.fortress.interpreter.evaluator.values;

import com.sun.fortress.compiler.NamingCzar;
import com.sun.fortress.exceptions.FortressException;
import static com.sun.fortress.exceptions.ProgramError.error;
import static com.sun.fortress.exceptions.ProgramError.errorMsg;
import com.sun.fortress.interpreter.Driver;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.EvalType;
import com.sun.fortress.interpreter.evaluator.EvaluatorBase;
import com.sun.fortress.interpreter.evaluator.types.FTraitOrObject;
import com.sun.fortress.interpreter.evaluator.types.FTraitOrObjectOrGeneric;
import com.sun.fortress.interpreter.evaluator.types.FType;
import com.sun.fortress.interpreter.evaluator.types.FTypeGeneric;
import com.sun.fortress.interpreter.evaluator.types.FTypeRest;
import com.sun.fortress.interpreter.evaluator.types.FTypeTuple;
import com.sun.fortress.interpreter.evaluator.types.GenericTypeInstance;
import com.sun.fortress.nodes.IdOrOpOrAnonymousName;
import com.sun.fortress.nodes.FnDecl;
import com.sun.fortress.nodes.TraitType;
import com.sun.fortress.nodes.TypeOrPattern;
import edu.rice.cs.plt.tuple.Option;
import com.sun.fortress.nodes.Type;
import com.sun.fortress.useful.Useful;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.IdentityHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Coercion at run time.  A trait's or object's coerce declarations reach the
 * interpreter as top-level functions, lifted by the disambiguator's
 * CoercionLifter and named with NamingCzar.LIFTED_COERCION_PREFIX; a coercion
 * is chosen here on the value the program has.
 */
public final class Coercions {

    private Coercions() {
    }

    /**
     * The lifted coercions to target, or null when target declares none.
     */
    private static Fcn liftedCoercions(FType target) {
        if (!(target instanceof FTraitOrObject)) return null;
        Environment e = target.getWithin();
        if (e == null) return null;
        FValue f = e.getTopLevel().getRootValueNull(NamingCzar.LIFTED_COERCION_PREFIX + target.getName());
        return f instanceof Fcn ? (Fcn) f : null;
    }

    /**
     * The coercion to target that applies to v without a coercion (coercions
     * do not chain), or null.  A generic target's coercions are instantiated
     * with the target's own static arguments first.
     */
    static SingleFcn coercionFor(FType target, FValue v) {
        // Only a numeral as written reaches a program's coercion from the
        // numeral types: a folded static expression reaches it as its default.
        if (Numerals.isStaticExpression(v) && !Numerals.isLibraryNumber(target)) v = Numerals.plain(v);
        if (Numerals.isNumeral(v)) return numeralCoercionFor(target, v);
        if (target instanceof GenericTypeInstance) {
            SingleFcn g = genericCoercionFor((GenericTypeInstance) target, v);
            if (g != null) return g;
        }
        Fcn lifted = liftedCoercions(target);
        if (lifted == null) return null;
        List<FValue> args = Collections.singletonList(v);
        if (lifted instanceof OverloadedFunction) {
            return ((OverloadedFunction) lifted).bestMatchWithoutCoercion(args);
        }
        SingleFcn f;
        if (lifted instanceof GenericFunctionOrMethod) {
            GenericFunctionOrMethod g = (GenericFunctionOrMethod) lifted;
            try {
                f = EvaluatorBase.inferByUnification(args, g, g.getWithin());
            }
            catch (FortressException ex) {
                return null;
            }
        } else if (lifted instanceof SingleFcn) {
            f = (SingleFcn) lifted;
        } else {
            return null;
        }
        List<FValue> fargs = f.fixupArgCount(args);
        return fargs != null && OverloadedFunction.argsMatchTypes(fargs, f.getDomain()) ? f : null;
    }

    /**
     * The coercion to target from the numeral v's own type, NaturalNumeral or
     * RadixPointNumeral: the one of target's coercions whose parameter type
     * is the narrowest that holds the numeral type, which it receives as the
     * numeral object; or null, also where v is outside target's range when
     * target is an integer type.  A numeral does not reach target through a
     * coercion from its default, since coercions do not chain.
     */
    private static SingleFcn numeralCoercionFor(FType target, FValue v) {
        if (!Numerals.inRange(target, v)) return null;
        return Numerals.numeralCoercion(target, v);
    }

    /**
     * The target's lifted coercions whose one parameter has the numeral type
     * of the kind given, generic over the numeral's four numbers.
     */
    static List<FGenericFunction> numeralCoercions(FType target, boolean radixPoint) {
        List<FGenericFunction> res = new ArrayList<FGenericFunction>();
        Fcn lifted = null;
        if (target instanceof GenericTypeInstance) {
            FTypeGeneric generic = ((GenericTypeInstance) target).getGeneric();
            String name = NamingCzar.LIFTED_COERCION_PREFIX + generic.getName();
            for (Environment e : new Environment[] {((FType) target).getWithin(), generic.getWithin()}) {
                if (e == null) continue;
                FValue f = e.getTopLevel().getRootValueNull(name);
                if (f instanceof Fcn) { lifted = (Fcn) f; break; }
            }
        } else {
            lifted = liftedCoercions(target);
        }
        List<SingleFcn> fs = new ArrayList<SingleFcn>();
        if (lifted instanceof OverloadedFunction) {
            for (Overload o : ((OverloadedFunction) lifted).getOverloads()) fs.add(o.getFn());
        } else if (lifted instanceof SingleFcn) {
            fs.add((SingleFcn) lifted);
        }
        for (SingleFcn f : fs) {
            if (!(f instanceof FGenericFunction)) continue;
            FnDecl fd = ((FGenericFunction) f).getFnDecl();
            if (fd.getHeader().getParams().size() != 1 || fd.getBody().isNone()) continue;
            Option<TypeOrPattern> pt = fd.getHeader().getParams().get(0).getIdType();
            if (pt.isNone() || !(pt.unwrap() instanceof TraitType)) continue;
            String n = ((TraitType) pt.unwrap()).getName().getText();
            if (n.equals(radixPoint ? "RadixPointNumeral" : "NaturalNumeral")) res.add((FGenericFunction) f);
        }
        return res;
    }

    /**
     * The generic target's lifted coercions, each instantiated with the
     * target's static arguments.
     */
    private static List<SingleFcn> instantiatedCoercions(GenericTypeInstance target) {
        List<SingleFcn> res = new ArrayList<SingleFcn>();
        FTypeGeneric generic = target.getGeneric();
        String name = NamingCzar.LIFTED_COERCION_PREFIX + generic.getName();
        Fcn lifted = null;
        for (Environment e : new Environment[] {((FType) target).getWithin(), generic.getWithin()}) {
            if (e == null) continue;
            FValue f = e.getTopLevel().getRootValueNull(name);
            if (f instanceof Fcn) {
                lifted = (Fcn) f;
                break;
            }
        }
        if (lifted == null) return res;
        List<GenericFunctionOrMethod> generics = new ArrayList<GenericFunctionOrMethod>();
        if (lifted instanceof OverloadedFunction) {
            for (Overload o : ((OverloadedFunction) lifted).getOverloads()) {
                if (o.getFn() instanceof GenericFunctionOrMethod) generics.add((GenericFunctionOrMethod) o.getFn());
            }
        } else if (lifted instanceof GenericFunctionOrMethod) {
            generics.add((GenericFunctionOrMethod) lifted);
        }
        List<FType> targs = target.getTypeParams();
        for (GenericFunctionOrMethod g : generics) {
            if (g.getStaticParams().size() != targs.size()) continue;
            try {
                res.add(g.typeApply(targs));
            }
            catch (FortressException ex) {
                // not an instance at these static arguments
            }
        }
        return res;
    }

    /**
     * The most specific of the generic target's lifted coercions, each
     * instantiated with the target's static arguments, that applies to v
     * without a coercion; or null.
     */
    private static SingleFcn genericCoercionFor(GenericTypeInstance target, FValue v) {
        List<FValue> args = Collections.singletonList(v);
        SingleFcn best = null;
        for (SingleFcn f : instantiatedCoercions(target)) {
            List<FValue> fargs = f.fixupArgCount(args);
            if (fargs == null || !OverloadedFunction.argsMatchTypes(fargs, f.getDomain())) continue;
            if (best == null || FTypeTuple.moreSpecificThan(f.getDomain(), best.getDomain())) best = f;
        }
        return best;
    }

    /**
     * t admits v: v is a t, or converts to t by one coercion (a tuple element
     * by element).
     */
    public static boolean admits(FType t, FValue v) {
        if (t.typeMatch(v) || Numerals.fitsAsIs(t, v)) return true;
        if (t instanceof FTypeTuple) {
            if (!(v instanceof FTuple)) return false;
            List<FType> types = ((FTypeTuple) t).getTypes();
            List<FValue> vals = ((FTuple) v).getVals();
            if (types.size() != vals.size()) return false;
            for (int j = 0; j < types.size(); j++) {
                if (types.get(j) instanceof FTypeRest) return false;
                if (!admits(types.get(j), vals.get(j))) return false;
            }
            return true;
        }
        return coercionFor(t, v) != null;
    }

    /**
     * A value of type c converts to d: d declares a coercion from a supertype
     * of c.
     */
    public static boolean convertsInto(FType c, FType d) {
        for (FType a : coercionSources(d)) {
            if (c.subtypeOf(a)) return true;
        }
        return false;
    }

    private static final Map<Environment, List<FType>> coercionTypesByEnv =
            new IdentityHashMap<Environment, List<FType>>();

    public static synchronized void reset() {
        coercionTypesByEnv.clear();
    }

    /**
     * The non-generic trait and object types named at the top level of e that
     * declare a coercion.
     */
    private static synchronized List<FType> coercionTypes(Environment e) {
        List<FType> l = coercionTypesByEnv.get(e);
        if (l != null) return l;
        l = new ArrayList<FType>();
        Set<String> seen = new HashSet<String>();
        for (String s : e.youngestFrame()) {
            if (!s.startsWith(NamingCzar.LIFTED_COERCION_PREFIX) || !seen.add(s)) continue;
            FType t;
            try {
                t = e.getTypeNull(s.substring(NamingCzar.LIFTED_COERCION_PREFIX.length()));
            }
            catch (FortressException ex) {
                t = null;
            }
            if (t instanceof FTraitOrObject && !(t instanceof FTypeGeneric)) l.add(t);
        }
        coercionTypesByEnv.put(e, l);
        return l;
    }

    /**
     * The types v converts to by one coercion and is not already of: the
     * coercions declared at the top level of the library, of within, and of
     * the component of v's type.
     */
    public static List<FType> coercionTargets(FValue v, Environment within) {
        Set<Environment> envs = new LinkedHashSet<Environment>();
        Environment library = null;
        try {
            library = Driver.getFortressLibrary();
        }
        catch (RuntimeException ex) {
            library = null;
        }
        if (library != null) envs.add(library.getTopLevel());
        if (within != null) envs.add(within.getTopLevel());
        FType vt = v.type();
        if (vt instanceof FTraitOrObjectOrGeneric && vt.getWithin() != null) envs.add(vt.getWithin().getTopLevel());
        List<FType> targets = new ArrayList<FType>();
        for (Environment e : envs) {
            for (FType t : coercionTypes(e)) {
                if (!targets.contains(t) && !t.typeMatch(v) && coercionFor(t, v) != null) targets.add(t);
            }
        }
        return targets;
    }

    /**
     * v converted by the coercion c to target.
     */
    static FValue apply(SingleFcn c, FType target, FValue v) {
        FValue r = Numerals.isNumeral(v) && c instanceof FGenericFunction && !(Numerals.isStaticExpression(v) && !Numerals.isLibraryNumber(target))
                   ? Numerals.converted(v, target, c)
                   : c.applyInnerPossiblyGeneric(Collections.singletonList(Numerals.plain(v)));
        if (!target.typeMatch(r)) {
            return error(errorMsg("Coercion ", c, " to ", target, " returned ", r, " of type ", r.type()));
        }
        return r;
    }

    /**
     * v converted to target by one of target's coercions, or null when none
     * applies to v.  A tuple converts element by element.
     */
    public static FValue coerce(FType target, FValue v) {
        if (target instanceof FTypeTuple) return coerceTuple((FTypeTuple) target, v);
        SingleFcn c = coercionFor(target, v);
        return c == null ? null : apply(c, target, v);
    }

    /**
     * The tuple v with each element that is not of its element type of target
     * converted to it; or null when v is not a tuple of target's size, when
     * target has a varargs element, or when an element does not convert.
     */
    private static FValue coerceTuple(FTypeTuple target, FValue v) {
        if (!(v instanceof FTuple)) return null;
        List<FType> types = target.getTypes();
        List<FValue> vals = ((FTuple) v).getVals();
        if (types.size() != vals.size()) return null;
        List<FValue> converted = new ArrayList<FValue>(vals.size());
        for (int j = 0; j < types.size(); j++) {
            FType t = types.get(j);
            if (t instanceof FTypeRest) return null;
            FValue e = vals.get(j);
            if (!t.typeMatch(e)) {
                e = coerce(t, e);
                if (e == null) return null;
            }
            converted.add(e);
        }
        return FTuple.make(converted);
    }

    /**
     * The value of a variable declared with type t in e, converted when it is
     * not a t and a coercion to t applies.  Anything that goes wrong before a
     * coercion is found leaves the value as it is, for the declaration's own
     * check to report.
     */
    public static FValue coerceToDeclared(Type t, Environment e, FValue v) {
        FType ft;
        try {
            ft = new EvalType(e).evalType(t);
            if (ft.typeMatch(v)) return v;
        }
        catch (FortressException ex) {
            return v;
        }
        FValue c = coerce(ft, v);
        return c == null ? v : c;
    }

    /**
     * The types a coercion to u is declared from.
     */
    private static List<FType> coercionSources(FType u) {
        Fcn lifted = liftedCoercions(u);
        List<FType> sources = new ArrayList<FType>();
        if (lifted instanceof OverloadedFunction) {
            for (Overload o : ((OverloadedFunction) lifted).getOverloads()) {
                addSource(o.getFn(), sources);
            }
        } else if (lifted instanceof SingleFcn) {
            addSource((SingleFcn) lifted, sources);
        }
        return sources;
    }

    private static void addSource(SingleFcn f, List<FType> sources) {
        if (f instanceof GenericFunctionOrMethod) return;
        List<FType> d = f.getDomain();
        if (d.size() == 1) sources.add(d.get(0));
    }

    /**
     * t is no less specific than u: t is a subtype of u, or t excludes, can be
     * coerced to, and rejects u.
     */
    private static boolean noLessSpecific(FType t, FType u) {
        if (t.subtypeOf(u)) return true;
        if (!t.excludesOther(u)) return false;
        boolean coercesTo = false;
        for (FType a : coercionSources(u)) {
            if (t.subtypeOf(a)) coercesTo = true;
        }
        if (!coercesTo) return false;
        for (FType a : coercionSources(t)) {
            if (!a.excludesOther(u)) return false;
        }
        return true;
    }

    /**
     * The domain c is more specific than the domain d over the first n
     * parameter positions, element by element.
     */
    static boolean moreSpecific(List<FType> c, List<FType> d, int n) {
        boolean differ = false;
        for (int j = 0; j < n; j++) {
            FType t = Useful.clampedGet(c, j).deRest();
            FType u = Useful.clampedGet(d, j).deRest();
            if (!noLessSpecific(t, u)) return false;
            if (t != u) differ = true;
        }
        return differ;
    }

    /**
     * target itself, or, where some argument is a numeral at a parameter that
     * its own numeral type fits and its default does not, a call that makes
     * each such numeral its numeral object and dispatches the arguments again,
     * so that a functional method of the numeral type is found on that object.
     */
    static SingleFcn withNumeralObjects(SingleFcn target, List<FValue> args, OverloadedFunction owner) {
        if (target instanceof CoercedCall) return target;   // its converted arguments are dispatched again
        List<FValue> oargs = target.fixupArgCount(args);
        if (oargs == null) return target;
        List<FType> domain = target.getDomain();
        boolean[] objects = new boolean[oargs.size()];
        boolean any = false;
        for (int j = 0; j < oargs.size(); j++) {
            FType t = Useful.clampedGet(domain, j).deRest();
            FValue a = oargs.get(j);
            if (Numerals.isNumeral(a) && !t.typeMatch(a) && Numerals.fitsAsIs(t, a)) {
                objects[j] = true;
                any = true;
            }
        }
        return any ? new CoercedCall(target, new SingleFcn[oargs.size()], owner, objects) : target;
    }

    /**
     * The coercions for each argument position of an overloaded call, chosen
     * by the argument types and kept in the per-argument-type cache: for each
     * position the coercion that converts it, or null, together with the
     * overload that makes them applicable.  The converted arguments are
     * dispatched as an ordinary call.
     */
    static final class CoercedCall extends SingleFcn {
        private final SingleFcn target;
        private final SingleFcn[] coercions;
        private final OverloadedFunction owner;
        private final boolean[] objects;   // the positions of numerals that become their numeral objects, or null

        CoercedCall(SingleFcn target, SingleFcn[] coercions, OverloadedFunction owner) {
            this(target, coercions, owner, null);
        }

        CoercedCall(SingleFcn target, SingleFcn[] coercions, OverloadedFunction owner, boolean[] objects) {
            super(target.getWithin());
            this.target = target;
            this.coercions = coercions;
            this.owner = owner;
            this.objects = objects;
        }

        int arity() {
            return coercions.length;
        }

        List<FValue> convert(List<FValue> args) {
            List<FValue> oargs = target.fixupArgCount(args);
            List<FValue> res = new ArrayList<FValue>(oargs);
            List<FType> domain = target.getDomain();
            for (int j = 0; j < coercions.length; j++) {
                if (objects != null && objects[j]) {
                    res.set(j, Numerals.object(oargs.get(j)));
                } else if (coercions[j] != null) {
                    res.set(j, apply(coercions[j], Useful.clampedGet(domain, j).deRest(), oargs.get(j)));
                }
            }
            return res;
        }

        @Override
        public FValue applyInnerPossiblyGeneric(List<FValue> args) {
            return owner.applyInnerPossiblyGeneric(convert(args));
        }

        @Override
        public String at() {
            return target.at();
        }

        public String stringName() {
            return target.stringName();
        }

        @Override
        public List<FType> getDomain() {
            return target.getDomain();
        }

        @Override
        public FType getRange() {
            return target.getRange();
        }

        @Override
        public IdOrOpOrAnonymousName getFnName() {
            return target.getFnName();
        }

        @Override
        public FType type() {
            return target.type();
        }

        @Override
        public boolean seqv(FValue other) {
            return this == other;
        }

        @Override
        public String toString() {
            return "coerced " + target;
        }
    }
}
