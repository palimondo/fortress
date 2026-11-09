package com.sun.fortress.compiler.desugarer;

import java.math.BigInteger;

import com.sun.fortress.nodes.BooleanLiteralExpr;
import com.sun.fortress.nodes.Expr;
import com.sun.fortress.nodes.FloatLiteralExpr;
import com.sun.fortress.nodes.FunctionalRef;
import com.sun.fortress.nodes.IntLiteralExpr;
import com.sun.fortress.nodes.Node;
import com.sun.fortress.nodes.Op;
import com.sun.fortress.nodes.OpExpr;
import com.sun.fortress.nodes.TupleExpr;
import com.sun.fortress.nodes_util.ExprFactory;
import com.sun.fortress.nodes_util.NodeFactory;
import com.sun.fortress.nodes_util.Span;
import com.sun.fortress.useful.TestCaseWrapper;

/** The numeral fold writes each result as a numeral or an operation on numerals, leaves each operator whose meaning needs a width, a division by zero and a possible negative zero, and gives CHOOSE outside 0..n the answer 0. */
public class NumeralFoldJUTest extends TestCaseWrapper {

    private static final Span S = NodeFactory.testSpan;

    private static Expr num(long v) {
        return ExprFactory.makeIntLiteralExpr(S, BigInteger.valueOf(v));
    }

    private static Expr dec(String s) {
        return ExprFactory.makeFloatLiteralExpr(S, s);
    }

    private static Expr infix(String op, Expr a, Expr b) {
        return ExprFactory.makeOpExpr(S, NodeFactory.makeOpInfix(S, op), a, b);
    }

    private static Expr prefix(String op, Expr a) {
        return ExprFactory.makeOpExpr(S, NodeFactory.makeOpPrefix(S, op), a);
    }

    private static Node fold(Expr e) {
        return e.accept(new IntegerLiteralFoldingVisitor());
    }

    private static void assertLeft(String what, Expr e) {
        Node n = fold(e);
        assertTrue(what + " is left as written, not folded into a " + n.getClass().getSimpleName(),
                   n instanceof OpExpr);
        OpExpr folded = (OpExpr) n;
        OpExpr written = (OpExpr) e;
        FunctionalRef op = folded.getOp();
        assertEquals(what + ": its operator", written.getOp().getOriginalName(), op.getOriginalName());
        assertEquals(what + ": its operands", written.getArgs(), folded.getArgs());
    }

    private static void assertInteger(String what, long expected, Expr e) {
        Node n = fold(e);
        assertTrue(what + " folds into an integer numeral, not a " + n.getClass().getSimpleName(),
                   n instanceof IntLiteralExpr);
        assertEquals(what, BigInteger.valueOf(expected), ((IntLiteralExpr) n).getIntVal());
    }

    public void testWrappingAndSaturatingOperatorsAreLeft() {
        String[] ops = { "BOXPLUS", "DOTPLUS", "BOXMINUS", "DOTMINUS", "BOXDOT", "BOXCROSS", "DOTCROSS", "DOTTIMES" };
        for (String op : ops) {
            assertLeft("2147483647 " + op + " 1", infix(op, num(2147483647), num(1)));
        }
        assertLeft("prefix DOTMINUS 2147483648", prefix("DOTMINUS", num(2147483648L)));
        assertLeft("prefix BOXMINUS 2147483648", prefix("BOXMINUS", num(2147483648L)));
    }

    public void testBitwiseOperatorsAndShiftsAreLeft() {
        String[] ops = { "BITAND", "BITOR", "BITXOR", "AND", "OR", "XOR", "LSHIFT", "RSHIFT", "<<", ">>" };
        for (String op : ops) {
            assertLeft("12 " + op + " 10", infix(op, num(12), num(10)));
        }
        assertLeft("BITNOT 12", prefix("BITNOT", num(12)));
        assertLeft("NOT 12", prefix("NOT", num(12)));
    }

    public void testDivisionByZeroIsLeft() {
        assertLeft("1 DIV 0", infix("DIV", num(1), num(0)));
        assertLeft("0 DIV 0", infix("DIV", num(0), num(0)));
        assertLeft("-1 DIV 0", infix("DIV", num(-1), num(0)));
        assertLeft("1 REM 0", infix("REM", num(1), num(0)));
        assertLeft("1 MOD 0", infix("MOD", num(1), num(0)));
        assertLeft("1 / 0", infix("/", num(1), num(0)));
        assertLeft("1.5 / 0", infix("/", dec("1.5"), num(0)));
    }

    public void testNegativeZeroIsLeft() {
        assertLeft("-(0.0)", prefix("-", dec("0.0")));
        assertLeft("0.0 DOT -1", infix("DOT", dec("0.0"), num(-1)));
        assertLeft("0.0 / -3", infix("/", dec("0.0"), num(-3)));
    }

    public void testChooseOutsideItsRangeIsZero() {
        assertInteger("3 CHOOSE 5", 0, infix("CHOOSE", num(3), num(5)));
        assertInteger("5 CHOOSE -1", 0, infix("CHOOSE", num(5), num(-1)));
        assertInteger("-5 CHOOSE 2", 0, infix("CHOOSE", num(-5), num(2)));
        assertInteger("-5 CHOOSE 0", 0, infix("CHOOSE", num(-5), num(0)));
        assertInteger("10 CHOOSE 3", 120, infix("CHOOSE", num(10), num(3)));
        assertInteger("5 CHOOSE 0", 1, infix("CHOOSE", num(5), num(0)));
    }

    private static void assertRadixPoint(String what, String text, Node n) {
        assertTrue(what + " folds into a numeral with a radix point, not a " + n.getClass().getSimpleName(),
                   n instanceof FloatLiteralExpr);
        assertEquals(what, text, ((FloatLiteralExpr) n).getText());
    }

    private static void assertQuotient(String what, String numerator, long denominator, Node n) {
        assertTrue(what + " folds into a quotient, not a " + n.getClass().getSimpleName(), n instanceof OpExpr);
        OpExpr o = (OpExpr) n;
        assertEquals(what + ": its operator", "/", ((Op) o.getOp().getOriginalName()).getText());
        Expr num = o.getArgs().get(0);
        String written = num instanceof IntLiteralExpr ? ((IntLiteralExpr) num).getText()
                       : num instanceof FloatLiteralExpr ? ((FloatLiteralExpr) num).getText() : num.toString();
        assertEquals(what + ": its numerator", numerator, written);
        assertEquals(what + ": its denominator", BigInteger.valueOf(denominator), ((IntLiteralExpr) o.getArgs().get(1)).getIntVal());
    }

    public void testIntegerResultsAreIntegerNumerals() {
        assertInteger("2147483647 + 1", 2147483648L, infix("+", num(2147483647), num(1)));
        assertInteger("-2147483648", -2147483648L, prefix("-", num(2147483648L)));
        assertInteger("2^40", 1099511627776L, infix("^", num(2), num(40)));
        assertInteger("65536 DOT 65536", 4294967296L, infix("DOT", num(65536), num(65536)));
        assertInteger("65536 TIMES 65536", 4294967296L, infix("TIMES", num(65536), num(65536)));
        assertInteger("65536 65536", 4294967296L, ExprFactory.makeTightJuxt(S, num(65536), num(65536)));
        assertInteger("-7 DIV 2", -3, infix("DIV", num(-7), num(2)));
        assertInteger("-7 REM 2", -1, infix("REM", num(-7), num(2)));
        assertInteger("-7 MOD 2", 1, infix("MOD", num(-7), num(2)));
        assertInteger("7 MOD -2", -1, infix("MOD", num(7), num(-2)));
        assertInteger("12 GCD 18", 6, infix("GCD", num(12), num(18)));
        assertInteger("4 LCM 6", 12, infix("LCM", num(4), num(6)));
        assertInteger("3 MIN 5", 3, infix("MIN", num(3), num(5)));
        assertInteger("deadc_16 || 0de_16", 0xdeadc0deL,
                      infix("||", ExprFactory.makeIntLiteralExpr(S, "deadc_16"), ExprFactory.makeIntLiteralExpr(S, "0de_16")));
        assertEquals("deadc_16 || 0de_16 keeps its digits and radix", "deadc0de_16",
                     ((IntLiteralExpr) fold(infix("||", ExprFactory.makeIntLiteralExpr(S, "deadc_16"),
                                                  ExprFactory.makeIntLiteralExpr(S, "0de_16")))).getText());
        assertLeft("12 || 34_16, two radixes", infix("||", num(12), ExprFactory.makeIntLiteralExpr(S, "34_16")));
    }

    public void testRadixPointResultsAreDecimals() {
        assertRadixPoint("0.1 + 0.2", "0.3", fold(infix("+", dec("0.1"), dec("0.2"))));
        assertRadixPoint("0.5 + 0.5", "1.0", fold(infix("+", dec("0.5"), dec("0.5"))));
        assertRadixPoint("10.0^(-5)", "0.00001", fold(infix("^", dec("10.0"), num(-5))));
        assertRadixPoint("0.5 MAX 1", "1.0", fold(infix("MAX", dec("0.5"), num(1))));
        assertRadixPoint("2.50 MAX 1, the written numeral", "2.50", fold(infix("MAX", dec("2.50"), num(1))));
        Node t = fold(ExprFactory.makeTupleExpr(S, prefix("-", dec("0.5")), infix("-", dec("0.1"), dec("0.3"))));
        Expr negative = ((TupleExpr) t).getExprs().get(1);
        assertTrue("0.1 - 0.3 folds into prefix minus on a numeral", negative instanceof OpExpr);
        assertEquals("0.1 - 0.3: its operator", "-", ((Op) ((OpExpr) negative).getOp().getOriginalName()).getText());
        assertRadixPoint("0.1 - 0.3", "0.2", ((OpExpr) negative).getArgs().get(0));
    }

    public void testQuotientsAreQuotientsOfNumerals() {
        assertQuotient("7 / 2", "7", 2, fold(infix("/", num(7), num(2))));
        assertQuotient("14 / 4", "7", 2, fold(infix("/", num(14), num(4))));
        assertQuotient("6 / 3", "2", 1, fold(infix("/", num(6), num(3))));
        assertQuotient("0.1 / 3", "1.0", 30, fold(infix("/", dec("0.1"), num(3))));
        assertQuotient("(1/3) + (1/6)", "1", 2,
                       fold(infix("+", infix("/", num(1), num(3)), infix("/", num(1), num(6)))));
    }

    public void testComparisonsFoldExactly() {
        Node n = fold(infix("=", dec("0.3"), infix("+", dec("0.1"), dec("0.2"))));
        assertTrue("0.3 = 0.1 + 0.2 folds into a boolean", n instanceof BooleanLiteralExpr);
        assertEquals("0.3 = 0.1 + 0.2", 1, ((BooleanLiteralExpr) n).getBooleanVal());
        Node m = fold(infix("<", infix("/", num(1), num(3)), dec("0.3333333333333333")));
        assertEquals("1/3 < 0.3333333333333333", 0, ((BooleanLiteralExpr) m).getBooleanVal());
    }
}
