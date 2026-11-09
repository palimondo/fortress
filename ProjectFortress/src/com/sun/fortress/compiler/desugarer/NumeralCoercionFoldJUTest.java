package com.sun.fortress.compiler.desugarer;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sun.fortress.compiler.codegen.NumeralCoercionFold;
import com.sun.fortress.nodes.APIName;
import com.sun.fortress.nodes.Component;
import com.sun.fortress.nodes.Expr;
import com.sun.fortress.nodes.Id;
import com.sun.fortress.nodes.IdOrOp;
import com.sun.fortress.nodes_util.ExprFactory;
import com.sun.fortress.nodes_util.NodeFactory;
import com.sun.fortress.nodes_util.Span;
import com.sun.fortress.repository.ProjectProperties;
import com.sun.fortress.runtimeSystem.Naming;
import com.sun.fortress.useful.TestCaseWrapper;

/** The fold of a numeral coercion evaluates the body of each of the prelude's numeral coercions at a numeral's four numbers, to the value the type's constant holds, and folds no constructor call, do block or native over a type that is not a number. */
public class NumeralCoercionFoldJUTest extends TestCaseWrapper {

    private static final Span S = NodeFactory.testSpan;

    private static Component prelude;
    private static NumeralCoercionFold.Components components;

    private static APIName api(String name) {
        return NodeFactory.makeAPIName(S, name);
    }

    /** The analyzed prelude, compiled first where the caches lack it. */
    private static synchronized Component prelude() throws Throwable {
        if (prelude != null) return prelude;
        // The compiled path's library names, before any class reads them.
        com.sun.fortress.Shell.useCompilerLibraries();
        components = NumeralCoercionFold.components(null);
        prelude = components.get(api("CompilerBuiltin"));
        if (prelude == null) {
            String lib = ProjectProperties.BASEDIR + "LibraryBuiltin/";
            com.sun.fortress.Shell.subMain(new String[] { "compile", lib + "AnyType.fss" });
            com.sun.fortress.Shell.subMain(new String[] { "compile", lib + "CompilerBuiltin.fss" });
            components = NumeralCoercionFold.components(null);
            prelude = components.get(api("CompilerBuiltin"));
        }
        assertNotNull("the analyzed prelude, CompilerBuiltin", prelude);
        return prelude;
    }

    /** The coercion of the type from a natural numeral of these digits in radix 10. */
    private static Object natural(String type, String digits) throws Throwable {
        List<BigInteger> numbers = Arrays.asList(BigInteger.valueOf(digits.length()), BigInteger.TEN, new BigInteger(digits));
        return NumeralCoercionFold.coercion(prelude(), "coerce_" + type, false, numbers, components);
    }

    /** The coercion of the type from a radix-point numeral of these digits in radix 10. */
    private static Object radixPoint(String type, String numeral) throws Throwable {
        int point = numeral.indexOf('.');
        String digits = numeral.substring(0, point) + numeral.substring(point + 1);
        List<BigInteger> numbers = Arrays.asList(BigInteger.valueOf(digits.length()),
                                                 BigInteger.valueOf(numeral.length() - point - 1),
                                                 BigInteger.TEN, new BigInteger(digits));
        return NumeralCoercionFold.coercion(prelude(), "coerce_" + type, true, numbers, components);
    }

    public void testZZ32() throws Throwable {
        assertEquals("0 at ZZ32", Integer.valueOf(0), natural("ZZ32", "0"));
        assertEquals("2147483647 at ZZ32", Integer.valueOf(2147483647), natural("ZZ32", "2147483647"));
    }

    public void testNN32() throws Throwable {
        assertEquals("0 at NN32", Integer.valueOf(0), natural("NN32", "0"));
        // An NN32 holds its value's 32 bits in a JVM int.
        assertEquals("4294967295 at NN32", Integer.valueOf((int) 4294967295L), natural("NN32", "4294967295"));
    }

    public void testZZ64() throws Throwable {
        assertEquals("0 at ZZ64", Long.valueOf(0), natural("ZZ64", "0"));
        assertEquals("9223372036854775807 at ZZ64", Long.valueOf(Long.MAX_VALUE), natural("ZZ64", "9223372036854775807"));
    }

    public void testNN64() throws Throwable {
        assertEquals("0 at NN64", Long.valueOf(0), natural("NN64", "0"));
        // An NN64 holds its value's 64 bits in a JVM long.
        assertEquals("18446744073709551615 at NN64", Long.valueOf(-1L), natural("NN64", "18446744073709551615"));
    }

    public void testZZ() throws Throwable {
        assertEquals("0 at ZZ", BigInteger.ZERO, natural("ZZ", "0"));
        assertEquals("a numeral of 30 digits at ZZ", new BigInteger("123456789012345678901234567890"),
                     natural("ZZ", "123456789012345678901234567890"));
    }

    public void testRR64() throws Throwable {
        assertEquals("0.1 at RR64", Double.valueOf(0.1), radixPoint("RR64", "0.1"));
        assertEquals("0.0 at RR64", Double.valueOf(0.0), radixPoint("RR64", "0.0"));
        assertEquals("the largest double at RR64", Double.valueOf(Double.MAX_VALUE),
                     radixPoint("RR64", "179769313486231570814527423731704356798070567525844996598917476803157260780028538760589558632766878171540458953514382464234321326889464182768467546703537516986049910576551282076245490090389328944075868508455133942304583236903222948165808559332123348274797826204144723168738177180919299881250404026184124858368.0"));
        assertEquals("a numeral of 23 digits at RR64", Double.valueOf(3.141592653589793),
                     radixPoint("RR64", "3.1415926535897932384626"));
    }

    public void testRR32() throws Throwable {
        assertEquals("0.1 at RR32", Float.valueOf(0.1f), radixPoint("RR32", "0.1"));
        assertEquals("16777217.0 at RR32", Float.valueOf(16777216.0f), radixPoint("RR32", "16777217.0"));
        assertEquals("the largest float at RR32", Float.valueOf(Float.MAX_VALUE),
                     radixPoint("RR32", "340282346638528859811704183484516925440.0"));
        // One rounding from the exact value: through a double first it rounds to the midpoint, then to 1.0.
        assertEquals("a numeral of 24 digits at RR32", Float.valueOf(Float.intBitsToFloat(1065353217)),
                     radixPoint("RR32", "1.00000005960464477539063"));
    }

    private static Object evaluate(Expr e) throws Throwable {
        Map<String, Object> bindings = new HashMap<String, Object>();
        bindings.put("v", BigInteger.TEN);
        return NumeralCoercionFold.evaluate(e, bindings, prelude(), components);
    }

    public void testOutsideTheFragmentIsNotFolded() throws Throwable {
        Expr v = ExprFactory.makeVarRef(S, "v");
        assertEquals("one of the four numbers", BigInteger.TEN, evaluate(v));
        assertNull("a do block", evaluate(ExprFactory.makeDo(S, edu.rice.cs.plt.tuple.Option.<com.sun.fortress.nodes.Type>none(), v)));
        Id infinity = NodeFactory.makeId(api("CompilerBuiltin"), NodeFactory.makeId(S, "Infinity"));
        com.sun.fortress.nodes.Type ctor = NodeFactory.makeArrowType(S, NodeFactory.makeVoidType(S), NodeFactory.makeTraitType(infinity));
        Expr construct = ExprFactory.make_RewriteFnApp(S,
            ExprFactory.makeFnRef(S, false, edu.rice.cs.plt.tuple.Option.<com.sun.fortress.nodes.Type>some(ctor),
                                  Collections.<com.sun.fortress.nodes.StaticArg>emptyList(), ExprFactory.defaultLexicalDepth,
                                  infinity, Collections.<IdOrOp>singletonList(infinity),
                                  Collections.<com.sun.fortress.nodes.Overloading>emptyList(),
                                  Collections.<com.sun.fortress.nodes.Overloading>emptyList(),
                                  edu.rice.cs.plt.tuple.Option.<com.sun.fortress.nodes.Type>none()),
            ExprFactory.makeVoidLiteralExpr(S));
        assertNull("a constructor call", evaluate(construct));
        Id toString = NodeFactory.makeId(api("com.sun.fortress.nativeHelpers"),
                                         NodeFactory.makeId(S, "simpleArbitraryPrecisionArith" + Naming.FOREIGN_TAG + "toString(Ljava/math/BigInteger;)Ljava/lang/String;"));
        Expr nativeString = ExprFactory.make_RewriteFnApp(S, ExprFactory.makeFnRef(toString, Collections.<IdOrOp>singletonList(toString)), v);
        assertNull("a native whose result is a String", evaluate(nativeString));
        Id toLong = NodeFactory.makeId(api("com.sun.fortress.nativeHelpers"),
                                       NodeFactory.makeId(S, "simpleArbitraryPrecisionArith" + Naming.FOREIGN_TAG + "bigOverflowingToLong(Ljava/math/BigInteger;)J"));
        Expr nativeLong = ExprFactory.make_RewriteFnApp(S, ExprFactory.makeFnRef(toLong, Collections.<IdOrOp>singletonList(toLong)), v);
        assertEquals("a native over the number types", Long.valueOf(10), evaluate(nativeLong));
    }
}
