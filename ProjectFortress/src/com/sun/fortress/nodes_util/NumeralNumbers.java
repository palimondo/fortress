package com.sun.fortress.nodes_util;

import com.sun.fortress.nodes.Expr;
import com.sun.fortress.nodes.FloatLiteralExpr;
import com.sun.fortress.nodes.IntLiteralExpr;

import java.math.BigInteger;

/**
 * A numeral's four numbers (literals.tex, "Literals"): its digit count n, the
 * digits after its radix point m, its radix r, and its digits read as one
 * integer in that radix v, which are the static arguments of its type
 * NaturalNumeral[\n, r, v\] or RadixPointNumeral[\n, m, r, v\]; and the kind of
 * numeral node, by the text that the numeral fold gives it: a numeral as
 * written, prefix minus on one ("-" before its text), or any other folded
 * static expression (its value in parentheses). A numeral has no sign, so v
 * is the magnitude and the kind carries the minus.
 */
public final class NumeralNumbers {

    public enum Kind { WRITTEN, NEGATED, STATIC }

    public final Kind kind;
    public final boolean radixPoint;
    public final BigInteger n, m, r, v;

    private NumeralNumbers(Kind kind, boolean radixPoint, BigInteger n, BigInteger m, BigInteger r, BigInteger v) {
        this.kind = kind;
        this.radixPoint = radixPoint;
        this.n = n;
        this.m = m;
        this.r = r;
        this.v = v;
    }

    /** The text that marks a folded static expression of value v. */
    public static String staticText(BigInteger v) {
        return "(" + v + ")";
    }

    public static Kind kindOf(String text) {
        if (text.startsWith("(")) return Kind.STATIC;
        if (text.startsWith("-")) return Kind.NEGATED;
        return Kind.WRITTEN;
    }

    /** The numbers of e, a numeral node, or null for any other expression. */
    public static NumeralNumbers of(Expr e) {
        if (e instanceof IntLiteralExpr) return of((IntLiteralExpr) e);
        if (e instanceof FloatLiteralExpr) return of((FloatLiteralExpr) e);
        return null;
    }

    public static NumeralNumbers of(IntLiteralExpr x) {
        String text = x.getText();
        Kind k = kindOf(text);
        BigInteger v = x.getIntVal().abs();
        int n;
        int r;
        if (k == Kind.STATIC) {
            n = v.toString().length();
            r = 10;
        } else {
            String t = k == Kind.NEGATED ? text.substring(1) : text;
            n = Math.max(1, digitPart(t).length());
            r = radixOf(t);
        }
        return new NumeralNumbers(k, false, BigInteger.valueOf(n), BigInteger.ZERO, BigInteger.valueOf(r), v);
    }

    public static NumeralNumbers of(FloatLiteralExpr x) {
        String text = x.getText();
        Kind k = kindOf(text);
        String t0 = k == Kind.WRITTEN ? text : text.substring(1, k == Kind.STATIC ? text.length() - 1 : text.length());
        int r = radixOf(t0);
        int m = x.getDenomPower();
        BigInteger v = x.getIntPart().multiply(BigInteger.valueOf(r).pow(m)).add(x.getNumerator()).abs();
        int n = Math.max(1, digitPart(t0).length());
        // The digits as written: the node keeps the value, not the trailing zeros.
        String t = t0.replace("'", "").replace(" ", "");
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
            } catch (NumberFormatException ex) {
                // the node's numbers stand
            }
        }
        return new NumeralNumbers(k, true, BigInteger.valueOf(n), BigInteger.valueOf(m), BigInteger.valueOf(r), v);
    }

    /** The digit part of a numeral's text, before its radix: digit-group separators and the radix point removed. */
    private static String digitPart(String text) {
        String s = text.replace("'", "").replace(" ", "").replace(" ", "");
        int under = s.indexOf('_');
        if (under >= 0) s = s.substring(0, under);
        return s.replace(".", "").replace("-", "");
    }

    private static int radixOf(String text) {
        int under = text.indexOf('_');
        if (under < 0) return 10;
        try {
            return Integer.parseInt(text.substring(under + 1).trim());
        } catch (NumberFormatException ex) {
            return 10;
        }
    }

    /** The signed value of an integer numeral node. */
    public BigInteger signedValue() {
        return kind == Kind.NEGATED ? v.negate() : v;
    }
}
