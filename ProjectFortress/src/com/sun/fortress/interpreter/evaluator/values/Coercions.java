package com.sun.fortress.interpreter.evaluator.values;

import com.sun.fortress.compiler.NamingCzar;
import com.sun.fortress.exceptions.FortressException;
import static com.sun.fortress.exceptions.ProgramError.error;
import static com.sun.fortress.exceptions.ProgramError.errorMsg;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.EvalType;
import com.sun.fortress.interpreter.evaluator.EvaluatorBase;
import com.sun.fortress.interpreter.evaluator.types.FTraitOrObject;
import com.sun.fortress.interpreter.evaluator.types.FType;
import com.sun.fortress.interpreter.evaluator.types.FTypeRest;
import com.sun.fortress.interpreter.evaluator.types.FTypeTuple;
import com.sun.fortress.nodes.IdOrOpOrAnonymousName;
import com.sun.fortress.nodes.Type;
import com.sun.fortress.useful.Useful;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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
     * do not chain), or null.
     */
    static SingleFcn coercionFor(FType target, FValue v) {
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
                f = EvaluatorBase.inferAndInstantiateGenericFunction(args, g, g.getWithin());
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
     * v converted by the coercion c to target.
     */
    static FValue apply(SingleFcn c, FType target, FValue v) {
        FValue r = c.applyInnerPossiblyGeneric(Collections.singletonList(v));
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

        CoercedCall(SingleFcn target, SingleFcn[] coercions, OverloadedFunction owner) {
            super(target.getWithin());
            this.target = target;
            this.coercions = coercions;
            this.owner = owner;
        }

        int arity() {
            return coercions.length;
        }

        List<FValue> convert(List<FValue> args) {
            List<FValue> oargs = target.fixupArgCount(args);
            List<FValue> res = new ArrayList<FValue>(oargs);
            List<FType> domain = target.getDomain();
            for (int j = 0; j < coercions.length; j++) {
                if (coercions[j] != null) {
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
