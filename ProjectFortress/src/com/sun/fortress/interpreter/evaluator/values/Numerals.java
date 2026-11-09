package com.sun.fortress.interpreter.evaluator.values;

import com.sun.fortress.exceptions.FortressException;
import com.sun.fortress.interpreter.Driver;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.types.FType;
import com.sun.fortress.interpreter.evaluator.types.FTypeTuple;
import com.sun.fortress.interpreter.evaluator.types.BottomType;
import com.sun.fortress.nativeHelpers.simpleDoubleArith;
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
        FValue value;
        FValue plain;
        private FValue object;
        private final Map<FType, FValue> converted = new HashMap<FType, FValue>();

        Site(int digits, int fractionDigits, int radix, BigInteger digitValue, boolean radixPoint) {
            this.digits = digits;
            this.fractionDigits = fractionDigits;
            this.radix = radix;
            this.digitValue = digitValue;
            this.radixPoint = radixPoint;
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
            s = new Site(Math.max(1, digitPart(x.getText()).length()), 0, radixOf(x.getText()), v, false);
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
            // The radix as written: the node's base is 1 where every digit after the point is 0.
            int r = radixOf(x.getText());
            int m = x.getDenomPower();
            BigInteger v = x.getIntPart().multiply(BigInteger.valueOf(r).pow(m)).add(x.getNumerator());
            int n = Math.max(1, digitPart(x.getText()).length());
            // The digits as written: the node keeps the value, not the trailing zeros.
            String t = x.getText().replace("'", "").replace("\u202F", "");
            int under = t.indexOf('_');
            String written = under >= 0 ? t.substring(0, under) : t;
            int point = written.indexOf('.');
            if (point >= 0) {
                String digits = written.substring(0, point) + written.substring(point + 1);
                if (r == 12) digits = digits.replace('x', 'A').replace('X', 'A').replace('e', 'B').replace('E', 'B');
                try {
                    BigInteger w = new BigInteger(digits, r);
                    int wm = written.length() - point - 1;
                    if (w.multiply(BigInteger.valueOf(r).pow(m)).equals(v.multiply(BigInteger.valueOf(r).pow(wm)))) {
                        v = w;
                        m = wm;
                        n = digits.length();
                    }
                }
                catch (NumberFormatException ex) {
                    // the node's numbers stand
                }
            }
            s = new Site(n, m, r, v, true);
            double d = simpleDoubleArith.numeralToDouble(v, r, m);
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

    /** The numeral's own type, NaturalNumeral or RadixPointNumeral, or null where the library has none. */
    public static FType numeralType(FValue v) {
        if (!(v instanceof Numeral)) return null;
        return libraryType(((Numeral) v).site().radixPoint ? "RadixPointNumeral" : "NaturalNumeral");
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
        if (target != libraryType(n)) return true;
        return s.digitValue.compareTo(lo) >= 0 && s.digitValue.compareTo(hi) <= 0;
    }

    /** The numeral v converted to target by c, one value for its site at each type. */
    static FValue converted(FValue v, FType target, SingleFcn c) {
        Site s = ((Numeral) v).site();
        synchronized (s) {
            FValue r = s.converted.get(target);
            if (r == null) {
                r = c.applyInnerPossiblyGeneric(java.util.Collections.singletonList(v));
                s.converted.put(target, r);
            }
            return r;
        }
    }

    /**
     * The value a function declared with the return type range answers, where
     * its body's value is v: a numeral converted where range fixes a type, as
     * a binding converts it; otherwise its default.  Walk checks no return
     * type, so a numeral that does not convert is its default.
     */
    public static FValue atReturn(FType range, FValue v) {
        if (!hasNumeral(v)) return v;
        if (range != null) {
            try {
                if (!range.typeMatch(v)) {
                    FValue c = Coercions.coerce(range, v);
                    if (c != null) return c;
                }
            }
            catch (FortressException ex) {
                // the default stands
            }
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
     * for a numeral the bottom type, its default's type and its own type, so
     * that a numeral and a value of its default type have different keys.
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

    /** A tuple that holds a numeral is keyed by its plain type, and is told apart from one that does not. */
    private static FType keyType(FValue v) {
        return v.type();
    }
}
