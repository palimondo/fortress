package com.sun.fortress.tests.unit_tests;

import java.lang.classfile.Attributes;
import java.lang.classfile.ClassFile;
import java.lang.classfile.ClassModel;
import java.lang.classfile.MethodModel;
import java.lang.classfile.attribute.CodeAttribute;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import junit.framework.TestCase;

/* Every method of the build is within HotSpot's 8,000-byte limit for compiling it, but the listed ones, each with its size and what runs it. */
public class MethodSizeJUTest extends TestCase {

    private static final int HUGE_METHOD_LIMIT = 8000;

    private static final Map<String, Integer> OVER_THE_LIMIT = new TreeMap<String, Integer>();
    private static final Map<String, String> RUN_BY = new TreeMap<String, String>();

    private static void listed(String method, int size, String runBy) {
        OVER_THE_LIMIT.put(method, size);
        RUN_BY.put(method, runBy);
    }

    static {
        listed("com.sun.fortress.nodes.NodeReader.readNode", 14026,
               "each read of a syntax tree from a cache entry (FortressNodeReader.readNode)");
        listed("com.sun.fortress.parser.Fortress.pCharLiteralContent$1", 23717,
               "the parser, at each character literal");
        listed("com.sun.fortress.parser.preparser.PreFortress.pCharLiteralContent$1", 23717,
               "the preparser, at each character literal");
        listed("com.sun.fortress.parser.templateparser.TemplateParser.pCharLiteralContent$1", 23717,
               "the template parser, at each character literal");
        listed("com.sun.fortress.scala_src.disambiguator.ExprDisambiguator.walk", 8518,
               "the disambiguator, on both paths");
        listed("com.sun.fortress.scala_src.typechecker.impls.Misc.checkExprMisc", 12893,
               "the compiled checker, at each expression that Dispatch sends to checkExprMisc");
        listed("com.sun.fortress.scala_src.linker.HygienicRenamer.walk", 11599,
               "nothing: no code of the tree constructs a HygienicRenamer");
        listed("com.sun.fortress.useful.MagicNumbers.<clinit>", 16677,
               "the class's initializer, once");
        listed("com.sun.fortress.numerics.DirectedRoundingTestData.make_double_divide_data", 21975,
               "DirectedRoundingTest's main, which no suite runs");
        listed("com.sun.fortress.numerics.DirectedRoundingTestData.make_double_multiply_data", 10229,
               "DirectedRoundingTest's main, which no suite runs");
        listed("com.sun.fortress.numerics.DirectedRoundingTestData.make_float_divide_data", 10425,
               "DirectedRoundingTest's main, which no suite runs");
        listed("com.sun.fortress.numerics.DirectedRoundingTestData.make_float_multiply_data", 9715,
               "DirectedRoundingTest's main, which no suite runs");
    }

    private static Path buildFolder() throws Exception {
        return Paths.get(MethodSizeJUTest.class.getProtectionDomain().getCodeSource().getLocation().toURI());
    }

    private static Map<String, Integer> methodSizes() throws Exception {
        List<Path> classes;
        try (Stream<Path> files = Files.walk(buildFolder())) {
            classes = files.filter(p -> p.toString().endsWith(".class")).collect(Collectors.toList());
        }
        Map<String, Integer> sizes = new TreeMap<String, Integer>();
        for (Path p : classes) {
            ClassModel model = ClassFile.of().parse(Files.readAllBytes(p));
            String owner = model.thisClass().asInternalName().replace('/', '.');
            for (MethodModel m : model.methods()) {
                Optional<CodeAttribute> code = m.findAttribute(Attributes.code());
                if (code.isPresent())
                    sizes.merge(owner + "." + m.methodName().stringValue(), code.get().codeLength(), Math::max);
            }
        }
        return sizes;
    }

    public void testNoUnlistedMethodOverTheLimit() throws Exception {
        Map<String, Integer> sizes = methodSizes();
        assertTrue("the build has more than a few classes: " + sizes.size() + " methods", sizes.size() > 1000);
        List<String> over = new ArrayList<String>();
        for (Map.Entry<String, Integer> e : sizes.entrySet())
            if (e.getValue() > HUGE_METHOD_LIMIT && !OVER_THE_LIMIT.containsKey(e.getKey()))
                over.add(e.getKey() + " is " + e.getValue() + " bytes of bytecode, more than " + HUGE_METHOD_LIMIT);
        assertTrue(String.join("; ", over), over.isEmpty());
    }

    public void testEveryListedMethodStillOverTheLimit() throws Exception {
        Map<String, Integer> sizes = methodSizes();
        List<String> stale = new ArrayList<String>();
        for (Map.Entry<String, Integer> e : OVER_THE_LIMIT.entrySet()) {
            Integer size = sizes.get(e.getKey());
            String listedAs = " (listed at " + e.getValue() + " bytes, run by " + RUN_BY.get(e.getKey()) + ")";
            if (size == null)
                stale.add(e.getKey() + listedAs + " is not in the build");
            else if (size <= HUGE_METHOD_LIMIT)
                stale.add(e.getKey() + listedAs + " is " + size +
                          " bytes, within the limit of " + HUGE_METHOD_LIMIT + ": take it off the list");
        }
        assertTrue(String.join("; ", stale), stale.isEmpty());
    }
}
