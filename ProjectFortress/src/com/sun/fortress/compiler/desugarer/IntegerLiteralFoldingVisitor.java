/*******************************************************************************
    Copyright 2012, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.desugarer;

import com.sun.fortress.compiler.Types;
import com.sun.fortress.compiler.WellKnownNames;
import com.sun.fortress.nodes.*;
import com.sun.fortress.nodes_util.*;
import com.sun.fortress.useful.*;
import com.sun.fortress.exceptions.CompilerError;
import edu.rice.cs.plt.collect.IndexedRelation;
import edu.rice.cs.plt.collect.Relation;
import edu.rice.cs.plt.iter.IterUtil;
import edu.rice.cs.plt.tuple.Option;
import edu.rice.cs.plt.tuple.Pair;
import com.sun.fortress.parser_util.precedence_resolver.PrecedenceMap;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.LinkedList;
import java.util.Map;
import java.util.Set;
import java.math.BigDecimal;
import java.math.BigInteger;
import static com.sun.fortress.exceptions.InterpreterBug.bug;
import com.sun.fortress.nodes_util.NumeralNumbers;

/**
 * Folds an expression of numerals alone, before the checker, exactly into a
 * numeral as written or an operation on such numerals (the Working Draft's
 * static expressions: constant.tex, "Types of Static Expressions";
 * literals.tex, "Literals"). An integer result is an integer numeral, negative
 * as a numeral node with a negative value; a result of operands among which one
 * has a radix point is a decimal numeral with a radix point where its
 * denominator divides a power of ten, negative as prefix minus on it; any other
 * quotient is the quotient of two numerals, n / d for operands without a radix
 * point and p.0 / d where one has one. The operators whose meaning needs a
 * width (the wrapping and saturating ones, the bitwise ones and the shifts), a
 * division by zero, and a result that IEEE arithmetic could make a negative
 * zero are left as written. Two natural numerals of one radix joined by ||
 * fold into one natural numeral of that radix.
 */
public class IntegerLiteralFoldingVisitor extends NodeUpdateVisitor {

	/** The kind of a constant, which sets its default: an integer numeral, a QQ, or an RR64. */
	private enum Kind { INTEGER, QUOTIENT, RADIX_POINT }

	/** An exact value, numerator and positive denominator in lowest terms, with its kind. */
	private static final class Constant {
		final BigInteger num;
		final BigInteger den;
		final Kind kind;
		Constant(BigInteger n, BigInteger d, Kind k) {
			if (d.signum() < 0) { n = n.negate(); d = d.negate(); }
			BigInteger g = n.gcd(d);
			if (g.signum() != 0 && !g.equals(BigInteger.ONE)) { n = n.divide(g); d = d.divide(g); }
			num = n; den = d; kind = k;
		}
		boolean isInteger() { return den.equals(BigInteger.ONE); }
		int compareTo(Constant o) { return num.multiply(o.den).compareTo(o.num.multiply(den)); }
	}

	private static String canon(String s) { return PrecedenceMap.ONLY.canon(s); }

	private static Set<String> canonSet(String... spellings) {
		Set<String> r = new HashSet<String>();
		for (String s : spellings) r.add(canon(s));
		return r;
	}

	private static final String PLUS = canon("+"), MINUS = canon("-"), SLASH = canon("/"),
		POWER = canon("^"), DIV = canon("DIV"), REM = canon("REM"), MOD = canon("MOD"),
		GCD = canon("GCD"), LCM = canon("LCM"), CHOOSE = canon("CHOOSE"), MIN = canon("MIN"),
		MAX = canon("MAX"), MINMAX = canon("MINMAX"), CONCAT = canon("||");
	private static final Set<String> TIMES = canonSet("DOT", "TIMES", "·", "×");
	private static final Set<String> COMPARISONS = canonSet("<", "<=", ">", ">=", "=", "NE");
	private static final BigInteger MAX_EXPONENT = BigInteger.valueOf(4096);
	private static final BigInteger TWO = BigInteger.valueOf(2), FIVE = BigInteger.valueOf(5);
	private static final BigInteger DOUBLE_EXACT = BigInteger.ONE.shiftLeft(53);

	/**
	 * A prefix minus and a / written in the component, which the forms of a
	 * folded result reuse where the expression folded holds none: each carries
	 * the overloadings its own place was given, the same for every place of the
	 * component.
	 */
	private FunctionalRef prefixMinus = null, slash = null;

	public IntegerLiteralFoldingVisitor() { }

	@Override
	public Node forComponent(Component that) {
		that.accept(new NodeDepthFirstVisitor_void() {
			@Override
			public void forOpRef(OpRef ref) {
				String k = opKey(ref);
				if (!ref.getStaticArgs().isEmpty()) return;
				if (prefixMinus == null && ("prefix " + MINUS).equals(k)) prefixMinus = ref;
				if (slash == null && SLASH.equals(k)) slash = ref;
			}
		});
		if (prefixMinus != null) PREFIX_MINUS.put(that.getName().getText(), prefixMinus);
		return super.forComponent(that);
	}

	/**
	 * The prefix minus that each component writes, disambiguated, by the
	 * component's name: the type checker applies a program's own type's minus
	 * to a numeral's coercion with it (a numeral has no sign).
	 */
	private static final java.util.Map<String, FunctionalRef> PREFIX_MINUS =
		new java.util.concurrent.ConcurrentHashMap<String, FunctionalRef>();

	/** The component's prefix minus at the given place, or null where it writes none. */
	public static FunctionalRef prefixMinusOf(String component, Span span) {
		FunctionalRef ref = PREFIX_MINUS.get(component);
		return ref == null ? null : at(ref, span);
	}

	/** The operator's canonical text, "prefix " before a prefix one; null for anything else. */
	private static String opKey(FunctionalRef ref) {
		IdOrOp n = ref.getOriginalName();
		if (!(n instanceof Op)) return null;
		Op op = (Op) n;
		if (op.isEnclosing()) return op.getText();
		if (op.getFixity() instanceof PreFixity) return "prefix " + op.getText();
		if (op.getFixity() instanceof InFixity) return op.getText();
		return null;
	}

	/** A reference like the given one, at another place. */
	private static FunctionalRef at(FunctionalRef ref, Span span) {
		return ExprFactory.makeOpRef(span, false, Option.<Type>none(), ref.getStaticArgs(),
		                             ref.getLexicalDepth(), ref.getOriginalName(), ref.getNames(),
		                             ref.getInterpOverloadings(), ref.getNewOverloadings(),
		                             ref.getOverloadingType());
	}

	/** The exact value of a numeral, or of a form a fold makes; null for any other expression. */
	private static Constant constantOf(Expr e) {
		if (e instanceof IntLiteralExpr)
			return new Constant(((IntLiteralExpr) e).getIntVal(), BigInteger.ONE, Kind.INTEGER);
		if (e instanceof FloatLiteralExpr) {
			FloatLiteralExpr f = (FloatLiteralExpr) e;
			BigInteger den = BigInteger.valueOf(f.getDenomBase()).pow(f.getDenomPower());
			BigInteger num = f.getIntPart().multiply(den).add(f.getNumerator());
			// prefix minus on a numeral as written keeps the magnitude in the node
			if (NumeralNumbers.kindOf(f.getText()) == NumeralNumbers.Kind.NEGATED) {
				if (num.signum() == 0) return null; // -0.0 is IEEE's negative zero, no exact constant
				num = num.negate();
			}
			return new Constant(num, den, Kind.RADIX_POINT);
		}
		if (e instanceof OpExpr) {
			OpExpr o = (OpExpr) e;
			String k = opKey(o.getOp());
			List<Expr> args = o.getArgs();
			if (("prefix " + MINUS).equals(k) && args.size() == 1 && args.get(0) instanceof FloatLiteralExpr) {
				Constant c = constantOf(args.get(0));
				if (c.num.signum() != 0) return new Constant(c.num.negate(), c.den, c.kind);
			}
			if (SLASH.equals(k) && args.size() == 2 && args.get(1) instanceof IntLiteralExpr
			    && ((IntLiteralExpr) args.get(1)).getIntVal().signum() > 0) {
				Expr n = args.get(0);
				Constant c = (n instanceof IntLiteralExpr || n instanceof FloatLiteralExpr
				              || (n instanceof OpExpr && ((OpExpr) n).getArgs().size() == 1)) ? constantOf(n) : null;
				if (c != null && c.isInteger())
					return new Constant(c.num, ((IntLiteralExpr) args.get(1)).getIntVal(),
					                    c.kind == Kind.RADIX_POINT ? Kind.RADIX_POINT : Kind.QUOTIENT);
			}
		}
		return null;
	}

	private static Kind join(Kind a, Kind b) {
		if (a == Kind.RADIX_POINT || b == Kind.RADIX_POINT) return Kind.RADIX_POINT;
		if (a == Kind.QUOTIENT || b == Kind.QUOTIENT) return Kind.QUOTIENT;
		return Kind.INTEGER;
	}

	private static Expr integer(Span span, BigInteger v) {
		return ExprFactory.makeIntLiteralExpr(span, v);
	}

	/** Prefix minus on e, the whole expression at the given info; null where the component writes no prefix minus. */
	private Expr negated(ExprInfo info, Expr e) {
		if (prefixMinus == null) return null;
		return new OpExpr(info, at(prefixMinus, info.getSpan()), Collections.singletonList(e));
	}

	/** n / d, the whole expression at the given info; null where the component writes no /. */
	private Expr quotient(ExprInfo info, Expr n, BigInteger d) {
		if (slash == null || n == null) return null;
		return new OpExpr(info, at(slash, info.getSpan()), Arrays.asList(n, integer(info.getSpan(), d)));
	}

	/** A numeral with a radix point, written as the text, at the given info. */
	private static Expr radixPoint(ExprInfo info, String text) {
		FloatLiteralExpr f = ExprFactory.makeFloatLiteralExpr(info.getSpan(), text);
		return new FloatLiteralExpr(info, "(" + f.getText() + ")", f.getIntPart(), f.getNumerator(), f.getDenomBase(), f.getDenomPower());
	}

	/**
	 * The expression that writes a constant: an integer numeral; n / d for a
	 * quotient; for a constant of radix-point kind a decimal numeral where the
	 * denominator divides a power of ten, else p.0 / d, both exact doubles;
	 * negative by prefix minus on the numeral with a radix point. Null where
	 * the form needs an operator the component does not write, or p and d
	 * are not both exact doubles.
	 */
	private Expr written(ExprInfo info, Constant c) {
		Span span = info.getSpan();
		switch (c.kind) {
		case INTEGER:
			return new IntLiteralExpr(info, NumeralNumbers.staticText(c.num), c.num);
		case QUOTIENT:
			return quotient(info, integer(span, c.num), c.den);
		default:
			BigInteger m = c.num.abs();
			boolean negative = c.num.signum() < 0;
			int twos = 0, fives = 0;
			BigInteger r = c.den;
			while (r.mod(TWO).signum() == 0) { r = r.divide(TWO); twos++; }
			while (r.mod(FIVE).signum() == 0) { r = r.divide(FIVE); fives++; }
			if (r.equals(BigInteger.ONE)) {
				int k = Math.max(Math.max(twos, fives), 1);
				String text = new BigDecimal(m.multiply(BigInteger.TEN.pow(k)).divide(c.den), k).toPlainString();
				return negative ? negated(info, radixPoint(NodeFactory.makeExprInfo(span), text)) : radixPoint(info, text);
			}
			if (m.compareTo(DOUBLE_EXACT) > 0 || c.den.compareTo(DOUBLE_EXACT) > 0) return null;
			Expr p = radixPoint(NodeFactory.makeExprInfo(span), m.toString() + ".0");
			return quotient(info, negative ? negated(NodeFactory.makeExprInfo(span), p) : p, c.den);
		}
	}

	/** The written operand itself, at the given info, where it already writes the result; else the result's form. */
	private Expr result(ExprInfo info, Constant c, Expr operand) {
		Constant o = constantOf(operand);
		if (o == null || o.kind != c.kind || o.compareTo(c) != 0) return written(info, c);
		if (operand instanceof IntLiteralExpr) {
			IntLiteralExpr i = (IntLiteralExpr) operand;
			return new IntLiteralExpr(info, NumeralNumbers.staticText(i.getIntVal()), i.getIntVal());
		}
		if (operand instanceof FloatLiteralExpr) {
			FloatLiteralExpr f = (FloatLiteralExpr) operand;
			String t = f.getText().startsWith("(") ? f.getText() : "(" + f.getText() + ")";
			return new FloatLiteralExpr(info, t, f.getIntPart(), f.getNumerator(), f.getDenomBase(), f.getDenomPower());
		}
		OpExpr o2 = (OpExpr) operand;
		return new OpExpr(info, o2.getOp(), o2.getArgs());
	}

	private static BigInteger choose(BigInteger n, BigInteger k) {
		if (k.signum() < 0 || n.signum() < 0 || k.compareTo(n) > 0) return BigInteger.ZERO;
		BigInteger j = k.min(n.subtract(k));
		if (j.compareTo(MAX_EXPONENT) > 0 || n.bitLength() > 64) return null;
		BigInteger acc = BigInteger.ONE;
		for (int i = 1; i <= j.intValue(); i++)
			acc = acc.multiply(n.subtract(j).add(BigInteger.valueOf(i))).divide(BigInteger.valueOf(i));
		return acc;
	}

	private static boolean compare(String op, int c) {
		if (op.equals(canon("<"))) return c < 0;
		if (op.equals(canon("<="))) return c <= 0;
		if (op.equals(canon(">"))) return c > 0;
		if (op.equals(canon(">="))) return c >= 0;
		if (op.equals(canon("="))) return c == 0;
		return c != 0;
	}

	/** The product of several constants, or null where IEEE arithmetic could make it a negative zero. */
	private static Constant product(List<Constant> cs) {
		BigInteger n = BigInteger.ONE, d = BigInteger.ONE;
		Kind k = Kind.INTEGER;
		boolean negative = false;
		for (Constant c : cs) {
			n = n.multiply(c.num); d = d.multiply(c.den); k = join(k, c.kind);
			negative |= c.num.signum() < 0;
		}
		if (k == Kind.RADIX_POINT && n.signum() == 0 && negative) return null;
		return new Constant(n, d, k);
	}

	/** The fold of a binary operator over two constants, or null where it is left as written. */
	private Expr foldBinary(ExprInfo info, String op, FunctionalRef ref, Expr arg0, Expr arg1, Constant a, Constant b) {
		Kind k = join(a.kind, b.kind);
		if (op.equals(PLUS))
			return written(info, new Constant(a.num.multiply(b.den).add(b.num.multiply(a.den)), a.den.multiply(b.den), k));
		if (op.equals(MINUS))
			return written(info, new Constant(a.num.multiply(b.den).subtract(b.num.multiply(a.den)), a.den.multiply(b.den), k));
		if (TIMES.contains(op)) {
			Constant p = product(Arrays.asList(a, b));
			return p == null ? null : written(info, p);
		}
		if (op.equals(SLASH)) {
			if (b.num.signum() == 0) return null;
			if (k == Kind.RADIX_POINT && a.num.signum() == 0 && b.num.signum() < 0) return null;
			Constant q = new Constant(a.num.multiply(b.den), a.den.multiply(b.num),
			                          k == Kind.RADIX_POINT ? Kind.RADIX_POINT : Kind.QUOTIENT);
			if (slash == null && ref.getStaticArgs().isEmpty()) slash = ref;
			return written(info, q);
		}
		if (op.equals(POWER)) {
			if (b.kind != Kind.INTEGER) return null;
			BigInteger e = b.num;
			if (e.abs().compareTo(MAX_EXPONENT) > 0) return null;
			int x = e.intValue();
			if ((long) Math.abs(x) * Math.max(a.num.bitLength(), a.den.bitLength()) > 65536) return null;
			if (x < 0) {
				if (a.kind == Kind.INTEGER || a.num.signum() == 0) return null;
				return written(info, new Constant(a.den.pow(-x), a.num.pow(-x), a.kind));
			}
			return written(info, new Constant(a.num.pow(x), a.den.pow(x), a.kind));
		}
		if (op.equals(MIN) || op.equals(MAX)) {
			boolean first = op.equals(MIN) ? a.compareTo(b) <= 0 : a.compareTo(b) >= 0;
			Constant c = first ? a : b;
			return result(info, new Constant(c.num, c.den, k), first ? arg0 : arg1);
		}
		if (COMPARISONS.contains(op))
			return ExprFactory.makeBooleanLiteralExpr(info, compare(op, a.compareTo(b)));
		if (k != Kind.INTEGER) return null;
		BigInteger v0 = a.num, v1 = b.num;
		if (op.equals(DIV) || op.equals(REM) || op.equals(MOD)) {
			if (v1.signum() == 0) return null;
			if (op.equals(DIV)) return written(info, new Constant(v0.divide(v1), BigInteger.ONE, k));
			if (op.equals(REM)) return written(info, new Constant(v0.remainder(v1), BigInteger.ONE, k));
			BigInteger m = v1.signum() < 0 ? v0.negate().mod(v1.negate()).negate() : v0.mod(v1);
			return written(info, new Constant(m, BigInteger.ONE, k));
		}
		if (op.equals(GCD)) return written(info, new Constant(v0.gcd(v1), BigInteger.ONE, k));
		if (op.equals(LCM)) {
			BigInteger l = (v0.signum() == 0 || v1.signum() == 0) ? BigInteger.ZERO
				: v0.abs().divide(v0.gcd(v1)).multiply(v1.abs());
			return written(info, new Constant(l, BigInteger.ONE, k));
		}
		if (op.equals(CHOOSE)) {
			BigInteger c = choose(v0, v1);
			return c == null ? null : written(info, new Constant(c, BigInteger.ONE, k));
		}
		if (op.equals(MINMAX))
			return ExprFactory.makeTupleExpr(info.getSpan(), integer(NodeUtil.getSpan(arg0), v0.min(v1)),
			                                 integer(NodeUtil.getSpan(arg1), v0.max(v1)));
		return null;
	}

	/** The radix of a natural numeral's text, as the parser reads it. */
	private static int radixOf(String text) {
		int under = text.indexOf('_');
		if (under == -1) return 10;
		String base = text.substring(under + 1);
		return Unicode.charactersOverlap(base, "0123456789") ? Integer.parseInt(base) : Unicode.numberToValue(base);
	}

	private static String digitsOf(String text) {
		int under = text.indexOf('_');
		return under == -1 ? text : text.substring(0, under);
	}

	/**
	 * Two natural numerals of one radix joined by || are one natural numeral
	 * of that radix, whose digits are both numerals' digits in order, leading
	 * zeros kept (constant.tex, "Types of Static Expressions").
	 */
	private static Expr concatenated(ExprInfo info, Expr written0, Expr written1) {
		if (!(written0 instanceof IntLiteralExpr && written1 instanceof IntLiteralExpr)) return null;
		String t0 = ((IntLiteralExpr) written0).getText(), t1 = ((IntLiteralExpr) written1).getText();
		if (t0.startsWith("-") || t1.startsWith("-")) return null;
		int r = radixOf(t0);
		if (r != radixOf(t1)) return null;
		int under = t0.indexOf('_');
		String text = digitsOf(t0) + digitsOf(t1) + (under == -1 ? "" : t0.substring(under));
		IntLiteralExpr parsed = ExprFactory.makeIntLiteralExpr(info.getSpan(), text);
		return new IntLiteralExpr(info, parsed.getText(), parsed.getIntVal());
	}

	private Expr fold(OpExpr that, ExprInfo info, FunctionalRef ref, List<Expr> args) {
		String op = opKey(ref);
		if (op == null) return null;
		if (args.size() == 1) {
			Expr arg = args.get(0);
			Constant c = constantOf(arg);
			if (c == null) return null;
			if (op.equals("prefix " + MINUS)) {
				if (prefixMinus == null && ref.getStaticArgs().isEmpty()) prefixMinus = ref;
				// prefix minus on a radix-point numeral as written: the numeral with its
				// minus, its node the magnitude, so that -0.0 keeps its sign where it converts
				if (arg instanceof FloatLiteralExpr) {
					FloatLiteralExpr f = (FloatLiteralExpr) arg;
					if (NumeralNumbers.kindOf(f.getText()) != NumeralNumbers.Kind.WRITTEN) return null;
					return new FloatLiteralExpr(info, "-" + f.getText(), f.getIntPart(), f.getNumerator(), f.getDenomBase(), f.getDenomPower());
				}
				if (c.kind == Kind.RADIX_POINT && c.num.signum() == 0) return null;
				if (arg instanceof IntLiteralExpr && NumeralNumbers.kindOf(((IntLiteralExpr) arg).getText()) == NumeralNumbers.Kind.WRITTEN)
					return new IntLiteralExpr(info, "-" + ((IntLiteralExpr) arg).getText(), c.num.negate());
				return result(info, new Constant(c.num.negate(), c.den, c.kind), arg);
			}
			if (op.equals("|_|"))
				return result(info, new Constant(c.num.abs(), c.den, c.kind), arg);
			return null;
		}
		if (args.size() == 2) {
			if (op.equals(CONCAT)) return concatenated(info, that.getArgs().get(0), that.getArgs().get(1));
			Constant a = constantOf(args.get(0)), b = constantOf(args.get(1));
			if (a == null || b == null) return null;
			return foldBinary(info, op, ref, args.get(0), args.get(1), a, b);
		}
		return null;
	}

	@Override
	public Node forChainExprOnly(ChainExpr that, ExprInfo info_result, Expr first_result, List<Link> links_result) {
		Constant prev = constantOf(first_result);
		boolean value = true;
		for (Link link : links_result) {
			if (prev == null) break;
			Constant next = constantOf(link.getExpr());
			String op = opKey(link.getOp());
			if (next == null || op == null || !COMPARISONS.contains(op)) { prev = null; break; }
			value = value && compare(op, prev.compareTo(next));
			prev = next;
		}
		if (prev != null && !links_result.isEmpty())
			return ExprFactory.makeBooleanLiteralExpr(info_result, value);
		return super.forChainExprOnly(that, info_result, first_result, links_result);
	}

	@Override
	public Node forOpExprOnly(OpExpr that, ExprInfo info_result, FunctionalRef op_result, List<Expr> args_result) {
		Expr folded = fold(that, info_result, op_result, args_result);
		if (folded != null) return folded;
		return super.forOpExprOnly(that, info_result, op_result, args_result);
	}

	/** A juxtaposition of numerals alone is their product. */
	@Override
	public Node forJuxtOnly(Juxt that, ExprInfo info_result, FunctionalRef multiJuxt_result,
	                        FunctionalRef infixJuxt_result, List<Expr> exprs_result) {
		if (!that.isFnApp() && exprs_result.size() >= 2) {
			List<Constant> cs = new ArrayList<Constant>();
			for (Expr e : exprs_result) {
				Constant c = constantOf(e);
				if (c == null) { cs = null; break; }
				cs.add(c);
			}
			if (cs != null) {
				Constant p = product(cs);
				Expr folded = p == null ? null : written(info_result, p);
				if (folded != null) return folded;
			}
		}
		return super.forJuxtOnly(that, info_result, multiJuxt_result, infixJuxt_result, exprs_result);
	}

}
