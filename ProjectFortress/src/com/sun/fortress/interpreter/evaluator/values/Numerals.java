package com.sun.fortress.interpreter.evaluator.values;

import com.sun.fortress.exceptions.FortressException;
import static com.sun.fortress.exceptions.ProgramError.error;
import static com.sun.fortress.exceptions.ProgramError.errorMsg;
import com.sun.fortress.interpreter.Driver;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.types.FType;
import com.sun.fortress.interpreter.evaluator.types.FTypeTop;
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
 * numbers: into a numeral type as the library's NaturalNumeral or
 * RadixPointNumeral object, and into any other type through that type's
 * coercion from the numeral type, called with that object; a site gives one
 * value at each type.  Elsewhere the numeral is its default, and a binding
 * keeps the default alone (plain).
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
        /** The signed exact value of an integer numeral. */
        final BigInteger signed;
        FValue value;
        FValue plain;
        private FValue object;
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
            s = new Site(nn, v);
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

    /** The library's NaturalNumeral or RadixPointNumeral object of the numeral v, one for its site. */
    public static FValue object(FValue v) {
        Site s = ((Numeral) v).site();
        synchronized (s) {
            if (s.object == null) {
                List<FValue> args = new ArrayList<FValue>(4);
                args.add(FInt.make(s.digits));
                if (s.radixPoint) args.add(FInt.make(s.fractionDigits));
                args.add(FInt.make(s.radix));
                args.add(FBigNum.make(s.digitValue));
                Fcn c = (Fcn) library().getRootValue(s.radixPoint ? "RadixPointNumeral" : "NaturalNumeral");
                s.object = c.applyToArgs(args);
            }
            return s.object;
        }
    }

    /**
     * Whether the numeral v is inside the range of target, where target is
     * one of the library's integer types; true for every other type.
     */
    static boolean inRange(FType target, FValue v) {
        Site s = ((Numeral) v).site();
        String n = target.getName();
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
            if (!whereHolds(g.getFnDecl(), numbers(g.getFnDecl(), s, false))) continue;
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
     * NaturalNumeral[\n, r, v\] or RadixPointNumeral[\n, m, r, v\]; at one of
     * the library's number types the last is the folded signed value, so that
     * a negative constant converts exactly first (-2147483648 at ZZ32).
     */
    private static Map<String, BigInteger> numbers(FnDecl fd, Site s, boolean signed) {
        Map<String, BigInteger> m = new HashMap<String, BigInteger>();
        Type pt = (Type) fd.getHeader().getParams().get(0).getIdType().unwrap();
        List<StaticArg> args = ((TraitType) pt).getArgs();
        BigInteger last = signed && !s.radixPoint ? s.signed : s.digitValue;
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
        // A negative integer constant converts exactly first at a library type;
        // any other negative constant is the type's minus on the coercion of its magnitude.
        boolean minusAfter = s.kind == NumeralNumbers.Kind.NEGATED && (s.radixPoint || !library);
        Map<String, BigInteger> vals = numbers(fd, s, library && !minusAfter);
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

    /** Whether o is the library's NaturalNumeral or RadixPointNumeral object. */
    static boolean isNumeralObject(FValue o) {
        if (!(o instanceof FObject)) return false;
        FType t = o.type();
        String n = t.getName();
        if (!n.equals("NaturalNumeral") && !n.equals("RadixPointNumeral")) return false;
        return t == libraryType(n);
    }

    /** The value of the field name of o, which a getter of the same name may hide from select. */
    private static FValue fieldValue(FObject o, String name) {
        FValue f = null;
        try {
            f = o.selectField(name);
        }
        catch (RuntimeException ex) {
            f = null;
        }
        return f != null ? f : o.select(name);
    }

    private static BigInteger field(FObject o, String name) {
        return fieldValue(o, name).getBigInteger();
    }

    private static int intField(FObject o, String name) {
        return fieldValue(o, name).getInt();
    }

    /**
     * Two numeral objects are strictly equivalent when their values are
     * equal: digitValue / radix^fractionDigits, reduced.
     */
    static boolean sameValue(FObject a, FObject b) {
        BigInteger va = field(a, "digitValue"), vb = field(b, "digitValue");
        BigInteger da = BigInteger.valueOf(intField(a, "radix")).pow(fractionDigits(a));
        BigInteger db = BigInteger.valueOf(intField(b, "radix")).pow(fractionDigits(b));
        return va.multiply(db).equals(vb.multiply(da));
    }

    private static int fractionDigits(FObject o) {
        return o.type().getName().equals("RadixPointNumeral") ? intField(o, "fractionDigits") : 0;
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
     * as the bottom type, else the top type: the one part of a numeral's
     * dispatch that its default's type does not fix (inRange).
     */
    private static FType rangeKey(FValue v) {
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
