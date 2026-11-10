package com.sun.fortress.interpreter.evaluator.values;

import com.sun.fortress.exceptions.FortressException;
import static com.sun.fortress.exceptions.ProgramError.error;
import static com.sun.fortress.exceptions.ProgramError.errorMsg;
import com.sun.fortress.interpreter.Driver;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.types.FType;
import com.sun.fortress.interpreter.evaluator.types.FTypeRange;
import com.sun.fortress.interpreter.evaluator.types.FTypeTop;
import com.sun.fortress.interpreter.evaluator.types.FTypeVoid;
import com.sun.fortress.interpreter.evaluator.types.FTypeTuple;
import com.sun.fortress.interpreter.evaluator.types.BottomType;
import com.sun.fortress.nativeHelpers.simpleDoubleArith;
import com.sun.fortress.interpreter.evaluator.Evaluator;
import com.sun.fortress.interpreter.evaluator.types.GenericTypeInstance;
import com.sun.fortress.nodes.FnDecl;
import com.sun.fortress.nodes.IntArg;
import com.sun.fortress.nodes.IntBase;
import com.sun.fortress.nodes.IntBinaryOp;
import com.sun.fortress.nodes.IntConstraint;
import com.sun.fortress.nodes.IntExpr;
import com.sun.fortress.nodes.IntRef;
import com.sun.fortress.nodes.StaticArg;
import com.sun.fortress.nodes.TraitType;
import com.sun.fortress.nodes.WhereClause;
import com.sun.fortress.nodes.WhereConstraint;
import com.sun.fortress.nodes_util.NumeralNumbers;
import com.sun.fortress.nodes.FloatLiteralExpr;
import com.sun.fortress.nodes.IntLiteralExpr;
import com.sun.fortress.nodes.Param;
import com.sun.fortress.nodes.StaticParam;
import com.sun.fortress.nodes.Type;
import com.sun.fortress.nodes.TypeOrPattern;
import com.sun.fortress.nodes.VarType;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.useful.EquivalenceClass;
import com.sun.fortress.useful.Useful;
import edu.rice.cs.plt.tuple.Option;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.IdentityHashMap;
import java.util.List;
import java.util.Map;

/**
 * Walk's numerals (literals.tex, "Literals").  A numeral evaluates to its
 * default, a ZZ32, a ZZ64 or a ZZ by its value, or an RR64 with a radix point,
 * as a value that also carries the numeral's four numbers: its digit count,
 * the digits after the radix point, its radix, and its digits read as one
 * integer.  Where a place fixes a type the numeral converts there from those
 * numbers, through that type's coercion from the numeral type, generic over
 * the four numbers: the coercion's body runs once with the numbers bound, and
 * a site gives one value at each type.  A numeral's own type exists only at
 * compile time, so no value has it.  Elsewhere the numeral is its default,
 * and a binding keeps the default alone (plain).
 */
public final class Numerals {

    private Numerals() {
    }

    /** A numeral's value at its default. */
    public interface Numeral {
        Site site();
    }

    /** One numeral of the program: its four numbers, its default, and what it converts to. */
    public static final class Site {
        final int digits;
        final int fractionDigits;
        final int radix;
        final BigInteger digitValue;
        final boolean radixPoint;
        /** The numeral's kind: as written, prefix minus on one, or a folded static expression. */
        final NumeralNumbers.Kind kind;
        /** The signed exact value of an integer numeral; of a radix-point numeral, its numerator over exactDen. */
        final BigInteger signed;
        /** The denominator of a radix-point numeral's exact value, signed over denomBase^denomPower; one for an integer numeral. */
        int denomBase = 10;
        int denomPower = 0;
        FValue value;
        FValue plain;
        /** Which float types the exact value rounds to an infinity at: -1 not yet known, 0 none, 1 RR32, 2 RR32 and RR64. */
        private int infiniteAt = -1;
        private final Map<FType, FValue> converted = new HashMap<FType, FValue>();

        Site(NumeralNumbers x, BigInteger signed) {
            this.digits = x.n.intValue();
            this.fractionDigits = x.m.intValue();
            this.radix = x.r.intValue();
            this.digitValue = x.v;
            this.radixPoint = x.radixPoint;
            this.kind = x.kind;
            this.signed = signed;
        }
    }

    static final class IntNumeral extends FInt implements Numeral {
        private final Site site;

        IntNumeral(int x, Site s) {
            super(x);
            site = s;
        }

        public Site site() {
            return site;
        }
    }

    static final class LongNumeral extends FLong implements Numeral {
        private final Site site;

        LongNumeral(long x, Site s) {
            super(x);
            site = s;
        }

        public Site site() {
            return site;
        }
    }

    static final class BigNumeral extends FBigNum implements Numeral {
        private final Site site;

        BigNumeral(BigInteger x, Site s) {
            super(x);
            site = s;
        }

        public Site site() {
            return site;
        }
    }

    static final class FloatNumeral extends FFloat implements Numeral {
        private final Site site;

        FloatNumeral(double x, Site s) {
            super(x);
            site = s;
        }

        public Site site() {
            return site;
        }
    }

    private static final Map<Object, Site> sites = new IdentityHashMap<Object, Site>();

    public static synchronized void reset() {
        sites.clear();
    }

    private static final BigInteger INT_MIN = BigInteger.valueOf(Integer.MIN_VALUE);
    private static final BigInteger INT_MAX = BigInteger.valueOf(Integer.MAX_VALUE);
    private static final BigInteger LONG_MIN = BigInteger.valueOf(Long.MIN_VALUE);
    private static final BigInteger LONG_MAX = BigInteger.valueOf(Long.MAX_VALUE);
    private static final BigInteger NN32_MAX = BigInteger.ONE.shiftLeft(32).subtract(BigInteger.ONE);
    private static final BigInteger NN64_MAX = BigInteger.ONE.shiftLeft(64).subtract(BigInteger.ONE);

    /** The digit part of a numeral's text, before its radix: digit-group separators and the radix point removed. */
    private static String digitPart(String text) {
        String s = text.replace("'", "").replace(" ", "");
        int under = s.indexOf('_');
        if (under >= 0) s = s.substring(0, under);
        return s.replace(".", "").replace("-", "");
    }

    private static int radixOf(String text) {
        int under = text.indexOf('_');
        if (under < 0) return 10;
        try {
            return Integer.parseInt(text.substring(under + 1).trim());
        }
        catch (NumberFormatException ex) {
            return 10;
        }
    }

    /** The value of the integer numeral x at its site. */
    public static FValue integer(IntLiteralExpr x) {
        synchronized (Numerals.class) {
            Site s = sites.get(x);
            if (s != null) return s.value;
            BigInteger v = x.getIntVal();
            s = new Site(NumeralNumbers.of(x), v);
            if (v.compareTo(INT_MIN) >= 0 && v.compareTo(INT_MAX) <= 0) {
                s.value = new IntNumeral(v.intValue(), s);
                s.plain = FInt.make(v.intValue());
            } else if (v.compareTo(LONG_MIN) >= 0 && v.compareTo(LONG_MAX) <= 0) {
                s.value = new LongNumeral(v.longValue(), s);
                s.plain = FLong.make(v.longValue());
            } else {
                s.value = new BigNumeral(v, s);
                s.plain = FBigNum.make(v);
            }
            sites.put(x, s);
            return s.value;
        }
    }

    /** The value of the numeral with a radix point x at its site. */
    public static FValue radixPoint(FloatLiteralExpr x) {
        synchronized (Numerals.class) {
            Site s = sites.get(x);
            if (s != null) return s.value;
            NumeralNumbers nn = NumeralNumbers.of(x);
            BigInteger v = nn.v;
            int r = nn.r.intValue();
            int m = nn.m.intValue();
            // The exact value as the node holds it, a negated numeral's magnitude negated.
            BigInteger den = BigInteger.valueOf(x.getDenomBase()).pow(x.getDenomPower());
            BigInteger num = x.getIntPart().multiply(den).add(x.getNumerator());
            if (nn.kind == NumeralNumbers.Kind.NEGATED) num = num.abs().negate();
            s = new Site(nn, num);
            s.denomBase = x.getDenomBase();
            s.denomPower = x.getDenomPower();
            double d = simpleDoubleArith.numeralToDouble(v, r, m);
            if (nn.kind == NumeralNumbers.Kind.NEGATED) d = -d;   // -0.0 keeps its sign
            s.value = new FloatNumeral(d, s);
            s.plain = FFloat.make(d);
            sites.put(x, s);
            return s.value;
        }
    }

    public static boolean isNumeral(FValue v) {
        return v instanceof Numeral;
    }

    /** Some argument is a numeral. */
    public static boolean anyNumeral(List<FValue> args) {
        for (FValue v : args) if (v instanceof Numeral) return true;
        return false;
    }

    /** v is a numeral, or a tuple that holds one. */
    public static boolean hasNumeral(FValue v) {
        if (v instanceof Numeral) return true;
        if (v instanceof FTuple) for (FValue e : ((FTuple) v).getVals()) if (hasNumeral(e)) return true;
        return false;
    }

    /** v without its numeral: a numeral's default alone, a tuple element by element. */
    public static FValue plain(FValue v) {
        if (v instanceof Numeral) return ((Numeral) v).site().plain;
        if (v instanceof FTuple) {
            if (!hasNumeral(v)) return v;
            return FTuple.make(plain(((FTuple) v).getVals()));
        }
        return v;
    }

    public static List<FValue> plain(List<FValue> args) {
        boolean any = false;
        for (FValue v : args) if (hasNumeral(v)) any = true;
        if (!any) return args;
        List<FValue> l = new ArrayList<FValue>(args.size());
        for (FValue v : args) l.add(plain(v));
        return l;
    }

    private static Environment library() {
        return Driver.getFortressLibrary();
    }

    private static FType libraryType(String name) {
        try {
            return library().getRootTypeNull(name);
        }
        catch (RuntimeException ex) {
            return null;
        }
    }

    /** NN32's type, which FortressBuiltin declares, so that FortressLibrary's root types do not hold it; or null. */
    private static FType nn32Type() {
        try {
            return FNN32.ZERO.type();
        }
        catch (RuntimeException ex) {
            return null;
        }
    }

    /** The numeral's own type, NaturalNumeral or RadixPointNumeral, or null where the library has none. */
    public static FType numeralType(FValue v) {
        // The static numerals: a numeral's type exists only at compile time, so
        // no value has it when the program runs.
        return null;
    }

    /** v is a numeral whose own type fits t as it is. */
    public static boolean fitsAsIs(FType t, FValue v) {
        FType nt = numeralType(v);
        return nt != null && !(t instanceof BottomType) && nt.subtypeOf(t);
    }

    /**
     * Which of the float types the exact value of the site's numeral, as
     * written or folded, rounds to an infinity at: 0 none, 1 RR32 alone, 2
     * RR32 and RR64.
     */
    private static int infiniteAt(Site s) {
        synchronized (s) {
            if (s.infiniteAt < 0) {
                BigInteger mag = s.signed.abs();
                // a magnitude below 2^127 rounds to a finite float
                if (mag.bitLength() <= 127) s.infiniteAt = 0;
                else if (!Float.isInfinite(simpleDoubleArith.numeralToFloat(mag, s.denomBase, s.denomPower))) s.infiniteAt = 0;
                else s.infiniteAt = Double.isInfinite(simpleDoubleArith.numeralToDouble(mag, s.denomBase, s.denomPower)) ? 2 : 1;
            }
            return s.infiniteAt;
        }
    }

    /** RR32's type, which FortressBuiltin declares, as NN32's; or null. */
    private static FType rr32Type() {
        try {
            return FRR32.ZERO.type();
        }
        catch (RuntimeException ex) {
            return null;
        }
    }

    /**
     * Whether the numeral v is inside the range of target, where target is
     * one of the library's integer types, or rounds to a finite value there,
     * where target is the library's RR64 or RR32 (literals.tex, "Literals": a
     * numeral that rounds to an infinity is refused); true for every other
     * type.
     */
    static boolean inRange(FType target, FValue v) {
        Site s = ((Numeral) v).site();
        String n = target.getName();
        if (n.equals("RR64") || n.equals("RR32")) {
            if (target != (n.equals("RR32") ? rr32Type() : libraryType(n))) return true;
            return infiniteAt(s) < (n.equals("RR64") ? 2 : 1);
        }
        BigInteger lo, hi;
        if (n.equals("ZZ32")) { lo = INT_MIN; hi = INT_MAX; }
        else if (n.equals("ZZ64")) { lo = LONG_MIN; hi = LONG_MAX; }
        else if (n.equals("NN32")) { lo = BigInteger.ZERO; hi = NN32_MAX; }
        else if (n.equals("NN64")) { lo = BigInteger.ZERO; hi = NN64_MAX; }
        else return true;
        if (target != (n.equals("NN32") ? nn32Type() : libraryType(n))) return true;
        BigInteger value = s.radixPoint ? s.digitValue : s.signed;
        return value.compareTo(lo) >= 0 && value.compareTo(hi) <= 0;
    }

    /** The numeral v converted to target by its coercion c, one value for its site at each type. */
    static FValue converted(FValue v, FType target, SingleFcn c) {
        Site s = ((Numeral) v).site();
        synchronized (s) {
            FValue r = s.converted.get(target);
            if (r == null) {
                r = convert(target, s, c);
                s.converted.put(target, r);
            }
            return r;
        }
    }

    private static final java.util.Set<String> NUMBER_TYPES = new java.util.HashSet<String>(java.util.Arrays.asList(
        "ZZ32", "ZZ64", "NN32", "NN64", "ZZ", "QQ", "RR64", "RR32"));

    /** Whether t is one of the library's eight number types, whose names no program may declare. */
    public static boolean isLibraryNumber(FType t) {
        return NUMBER_TYPES.contains(t.getName());
    }

    /** Whether v is the value of a folded static expression, not a numeral as written. */
    public static boolean isStaticExpression(FValue v) {
        return v instanceof Numeral && ((Numeral) v).site().kind == NumeralNumbers.Kind.STATIC;
    }

    /**
     * The coercion to target that is generic over the numeral v's four
     * numbers, where its where clause holds at them; or null. For a negative
     * constant at a program's own type, also null where the type's prefix
     * minus does not apply to the coercion's result. The conversion runs here,
     * once for the site and the type, so that a refusal is known.
     */
    static SingleFcn numeralCoercion(FType target, FValue v) {
        Site s = ((Numeral) v).site();
        for (FGenericFunction g : Coercions.numeralCoercions(target, s.radixPoint)) {
            if (!whereHolds(g.getFnDecl(), numbers(g.getFnDecl(), s))) continue;
            synchronized (s) {
                if (!s.converted.containsKey(target)) {
                    FValue r = convert(target, s, g);
                    if (r == null) return null;
                    s.converted.put(target, r);
                }
            }
            return g;
        }
        return null;
    }

    /**
     * The four numbers by the names the coercion's parameter type gives them:
     * NaturalNumeral[\n, r, v\] or RadixPointNumeral[\n, m, r, v\]. A numeral
     * has no sign: v is the numeral's digits read as one integer.
     */
    private static Map<String, BigInteger> numbers(FnDecl fd, Site s) {
        Map<String, BigInteger> m = new HashMap<String, BigInteger>();
        Type pt = (Type) fd.getHeader().getParams().get(0).getIdType().unwrap();
        List<StaticArg> args = ((TraitType) pt).getArgs();
        BigInteger last = s.digitValue;
        BigInteger[] ns = s.radixPoint
            ? new BigInteger[] { BigInteger.valueOf(s.digits), BigInteger.valueOf(s.fractionDigits), BigInteger.valueOf(s.radix), last }
            : new BigInteger[] { BigInteger.valueOf(s.digits), BigInteger.valueOf(s.radix), last };
        for (int i = 0; i < args.size() && i < ns.length; i++) {
            StaticArg a = args.get(i);
            if (a instanceof IntArg && ((IntArg) a).getIntVal() instanceof IntRef)
                m.put(((IntRef) ((IntArg) a).getIntVal()).getName().getText(), ns[i]);
        }
        return m;
    }

    private static BigInteger evalSize(IntExpr e, Map<String, BigInteger> vals) {
        if (e instanceof IntBase) return ((IntBase) e).getIntVal().getIntVal();
        if (e instanceof IntRef) return vals.get(((IntRef) e).getName().getText());
        if (e instanceof IntBinaryOp) {
            IntBinaryOp b = (IntBinaryOp) e;
            BigInteger l = evalSize(b.getLeft(), vals), r = evalSize(b.getRight(), vals);
            if (l == null || r == null) return null;
            String op = b.getOp().getText();
            if (op.equals("+")) return l.add(r);
            if (op.equals("-")) return l.subtract(r);
            if (op.equals("^")) return l.pow(r.intValue());
            return l.multiply(r);
        }
        return null;
    }

    /** Whether each comparison of sizes in the coercion's where clause holds at the four numbers. */
    private static boolean whereHolds(FnDecl fd, Map<String, BigInteger> vals) {
        Option<WhereClause> w = fd.getHeader().getWhereClause();
        if (w.isNone()) return true;
        for (WhereConstraint c : w.unwrap().getConstraints()) {
            if (!(c instanceof IntConstraint)) continue;
            IntConstraint ic = (IntConstraint) c;
            BigInteger l = evalSize(ic.getLeft(), vals), r = evalSize(ic.getRight(), vals);
            if (l == null || r == null) continue;
            int k = l.compareTo(r);
            String op = ic.getOp().getText();
            boolean ok = op.equals("<") ? k < 0 : op.equals("<=") ? k <= 0 : op.equals(">") ? k > 0
                       : op.equals(">=") ? k >= 0 : op.equals("=") ? k == 0 : true;
            if (!ok) return false;
        }
        return true;
    }

    /**
     * The coercion's body, run once with the four numbers bound as exact
     * integers, ZZ values, and the coercion's type's own static parameters
     * bound to target's; its parameter is bound to no numeral value, since
     * none exists. For a negative constant at a program's own type, the
     * type's own prefix minus on the result; null where it does not apply.
     */
    private static FValue convert(FType target, Site s, SingleFcn c) {
        FGenericFunction g = (FGenericFunction) c;
        FnDecl fd = g.getFnDecl();
        boolean library = isLibraryNumber(target);
        // A folded constant at a library type, a negative constant among them,
        // converts from its exact value (P-173): only a numeral as written
        // reaches a numeral coercion. At a program's type a negative constant
        // is the type's own minus on the coercion of its magnitude (P-174).
        if (library && s.kind != NumeralNumbers.Kind.WRITTEN) return exactAt(target, s);
        boolean minusAfter = s.kind == NumeralNumbers.Kind.NEGATED;
        Map<String, BigInteger> vals = numbers(fd, s);
        Environment clenv = g.getEnv().extendAt(fd);
        List<StaticParam> sps = fd.getHeader().getStaticParams();
        if (target instanceof GenericTypeInstance) {
            List<FType> targs = ((GenericTypeInstance) target).getTypeParams();
            for (int i = 0; i < targs.size() && i < sps.size(); i++) clenv.putType(NodeUtil.getName(sps.get(i)), targs.get(i));
        }
        for (Map.Entry<String, BigInteger> e : vals.entrySet()) clenv.putValue(e.getKey(), FBigNum.make(e.getValue()));
        clenv.bless();
        Environment penv = clenv.extendAt(fd);
        penv.putValue(NodeUtil.nameString(fd.getHeader().getParams().get(0).getName()), FVoid.V);
        penv.bless();
        FValue r = new Evaluator(penv).eval(fd.getBody().unwrap());
        if (minusAfter) {
            Environment within = target.getWithin();
            // walk keys a prefix operator by its fixity (OprUtil.fixityDecorator)
            FValue minus = within == null ? null : within.getTopLevel().getRootValueNull("prefix -");
            if (minus == null && within != null) minus = within.getTopLevel().getRootValueNull("-");
            if (!(minus instanceof Fcn)) return null;
            try {
                r = ((Fcn) minus).applyToArgs(r);
            } catch (FortressException ex) {
                return null;
            }
            if (!target.typeMatch(r)) return null;
        }
        return r;
    }

    /**
     * A folded constant's exact value at one of the library's number types:
     * exactly into an integer type or QQ, by one rounding into RR64 or RR32,
     * a negated zero IEEE's negative zero; null for a value the type cannot
     * hold exactly, a fraction at an integer type, which the range check and
     * the coercions' kinds already exclude.
     */
    private static FValue exactAt(FType target, Site s) {
        BigInteger num = s.signed;
        BigInteger den = BigInteger.valueOf(s.denomBase).pow(s.denomPower);
        String n = target.getName();
        if (n.equals("RR64") || n.equals("RR32")) {
            // the magnitude rounded once, then negated, as rounding to nearest is
            // symmetric; a negated zero is IEEE's negative zero
            BigInteger mag = num.abs();
            boolean neg = num.signum() < 0 || (s.kind == NumeralNumbers.Kind.NEGATED && num.signum() == 0);
            if (n.equals("RR64")) {
                double d = simpleDoubleArith.numeralToDouble(mag, s.denomBase, s.denomPower);
                return FFloat.make(neg ? -d : d);
            }
            float f = simpleDoubleArith.numeralToFloat(mag, s.denomBase, s.denomPower);
            return FRR32.make(neg ? -f : f);
        }
        if (n.equals("QQ")) {
            BigInteger g = num.gcd(den);
            if (g.signum() == 0) g = BigInteger.ONE;
            FValue ratio = library().getRootValueNull("Ratio");
            if (!(ratio instanceof Fcn)) return null;
            List<FValue> args = new ArrayList<FValue>(2);
            args.add(FBigNum.make(num.divide(g)));
            args.add(FBigNum.make(den.divide(g)));
            return ((Fcn) ratio).applyToArgs(args);
        }
        if (!den.equals(BigInteger.ONE)) return null;
        if (n.equals("ZZ32")) return FInt.make(num.intValue());
        if (n.equals("ZZ64")) return FLong.make(num.longValue());
        if (n.equals("NN32")) return FNN32.make(num.intValue());
        if (n.equals("NN64")) return FNN64.make(num.longValue());
        if (n.equals("ZZ")) return FBigNum.make(num);
        return null;
    }

    /**
     * The value a function declared with the return type range answers, where
     * its body's value is v: a numeral converted where range fixes a type, as
     * a binding converts it, and refused there where it does not convert;
     * without a declared return type, its default.
     */
    public static FValue atReturn(FType range, FValue v) {
        if (!hasNumeral(v)) return v;
        if (range != null && !range.typeMatch(v)) {
            FValue c = Coercions.coerce(range, v);
            if (c == null) {
                return error(errorMsg("Type mismatch returning ", v, " (type ", v.type(), ") at the declared return type ", range));
            }
            return c;
        }
        return plain(v);
    }

    /**
     * The arguments a generic call infers its static arguments from: each
     * numeral at its default, which walk's promotion joins into the
     * narrowest type into which every argument coerces (P-74).  Where the
     * numerals at the positions of one type parameter include one with a
     * radix point, the narrowest default holding them all is an RR64, into
     * which an integer numeral beyond ZZ32 converts exactly though its
     * default does not coerce: such a numeral is read as a ZZ32 stand-in,
     * which promotes with an RR64 to RR64.  The call itself receives the
     * numerals, which convert at the instance's parameters.
     */
    public static List<FValue> forInference(List<FValue> args, GenericFunctionOrMethod g) {
        if (!anyNumeral(args)) return args;
        List<FValue> res = plain(args);
        List<Param> params;
        List<StaticParam> sps;
        try {
            params = g.getParams();
            sps = g.getStaticParams();
        }
        catch (RuntimeException ex) {
            return res;
        }
        if (params == null || sps == null || params.size() != args.size()) return res;
        Map<String, List<Integer>> byParam = new HashMap<String, List<Integer>>();
        for (int j = 0; j < params.size(); j++) {
            if (!(args.get(j) instanceof Numeral)) continue;
            Option<TypeOrPattern> ot = params.get(j).getIdType();
            if (ot.isNone() || !(ot.unwrap() instanceof VarType)) continue;
            String n = NodeUtil.nameString(((VarType) ot.unwrap()).getName());
            boolean isStatic = false;
            for (StaticParam sp : sps) if (NodeUtil.getName(sp).equals(n)) isStatic = true;
            if (!isStatic) continue;
            List<Integer> l = byParam.get(n);
            if (l == null) byParam.put(n, l = new ArrayList<Integer>());
            l.add(j);
        }
        for (List<Integer> group : byParam.values()) {
            if (group.size() < 2) continue;
            boolean point = false;
            for (int j : group) if (((Numeral) args.get(j)).site().radixPoint) point = true;
            if (!point) continue;
            for (int j : group) {
                Site s = ((Numeral) args.get(j)).site();
                if (!s.radixPoint && !(s.plain instanceof FInt)) res.set(j, FInt.make(0));
            }
        }
        return res;
    }

    /**
     * The dispatch caches' key of an argument list: each argument's type, and
     * for a numeral the bottom type, its default's type, its own type and its
     * range, so that a numeral and a value of its default type have different
     * keys, and so do two numerals of one default that an unsigned type of
     * its width holds and does not.
     */
    public static final class Keys implements EquivalenceClass<List<FValue>, List<FType>> {
        public int compare(List<FValue> x, List<FType> y) {
            int k = 0;
            int ly = y.size();
            for (FValue v : x) {
                if (v instanceof Numeral) {
                    int c = cmp(BottomType.ONLY, y, k++, ly);
                    if (c != 0) return c;
                    c = cmp(v.type(), y, k++, ly);
                    if (c != 0) return c;
                    c = cmp(numeralKey(v), y, k++, ly);
                    if (c != 0) return c;
                    c = cmp(rangeKey(v), y, k++, ly);
                    if (c != 0) return c;
                } else {
                    int c = cmp(keyType(v), y, k++, ly);
                    if (c != 0) return c;
                }
            }
            return k < ly ? -1 : 0;
        }

        private static int cmp(FType t, List<FType> y, int k, int ly) {
            if (k >= ly) return 1;
            return t.compareTo(y.get(k));
        }

        public int compareRightKeys(List<FType> x, List<FType> y) {
            return FValue.asTypesList.compareRightKeys(x, y);
        }

        public int compareLeftKeys(List<FValue> x, List<FValue> y) {
            return compareRightKeys(translate(x), translate(y));
        }

        public List<FType> translate(List<FValue> x) {
            List<FType> l = new ArrayList<FType>(x.size());
            for (FValue v : x) {
                if (v instanceof Numeral) {
                    l.add(BottomType.ONLY);
                    l.add(v.type());
                    l.add(numeralKey(v));
                    l.add(rangeKey(v));
                } else l.add(keyType(v));
            }
            return l;
        }
    }

    public static final Keys keys = new Keys();

    private static FType numeralKey(FValue v) {
        FType t = numeralType(v);
        return t != null ? t : v.type();
    }

    /**
     * Whether the integer numeral v lies in the range of the unsigned type of
     * its default's width, NN32 for a ZZ64 default and NN64 for a ZZ default,
     * as the bottom type, else the top type; and for a numeral that rounds to
     * an infinity at RR32 alone the void type, at RR32 and RR64 the range
     * type: the parts of a numeral's dispatch that its default's type does
     * not fix (inRange).
     */
    private static FType rangeKey(FValue v) {
        int inf = infiniteAt(((Numeral) v).site());
        if (inf > 0) return inf == 1 ? FTypeVoid.ONLY : FTypeRange.ONLY;
        BigInteger d = ((Numeral) v).site().digitValue;
        boolean fits = v instanceof LongNumeral ? d.compareTo(NN32_MAX) <= 0
                       : v instanceof BigNumeral ? d.compareTo(NN64_MAX) <= 0 : true;
        return fits ? BottomType.ONLY : FTypeTop.ONLY;
    }

    /** A tuple that holds a numeral is keyed by its plain type, and is told apart from one that does not. */
    private static FType keyType(FValue v) {
        return v.type();
    }
}
