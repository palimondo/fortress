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

/* Every method of the build is short enough for the JVM to compile, but the listed ones. */
public class MethodSizeJUTest extends TestCase {

    // HotSpot does not compile a method of more bytes of bytecode than this (HugeMethodLimit,
    // under the default DontCompileHugeMethods), so such a method always runs in the interpreter.
    private static final int HUGE_METHOD_LIMIT = 8000;

    /* The methods over the limit that the build holds, each with its size when it was listed
     * and what runs it. A method that is not here fails the test once it passes the limit, and a
     * method here fails it once it is gone or back under the limit, so that the list stays true. */
    private static final Map<String, Integer> OVER_THE_LIMIT = new TreeMap<String, Integer>();
    static {
        // Each read of a syntax tree from a cache entry (FortressNodeReader.readNode).
        OVER_THE_LIMIT.put("com.sun.fortress.nodes.NodeReader.readNode", 14026);
        // The Rats! parsers, the preparser and the template parser, at each character literal.
        OVER_THE_LIMIT.put("com.sun.fortress.parser.Fortress.pCharLiteralContent$1", 23717);
        OVER_THE_LIMIT.put("com.sun.fortress.parser.preparser.PreFortress.pCharLiteralContent$1", 23717);
        OVER_THE_LIMIT.put("com.sun.fortress.parser.templateparser.TemplateParser.pCharLiteralContent$1", 23717);
        // The disambiguator, on both paths.
        OVER_THE_LIMIT.put("com.sun.fortress.scala_src.disambiguator.ExprDisambiguator.walk", 8518);
        // The compiled checker, at each expression that Dispatch sends to checkExprMisc.
        OVER_THE_LIMIT.put("com.sun.fortress.scala_src.typechecker.impls.Misc.checkExprMisc", 12893);
        // Nothing in the tree constructs a HygienicRenamer.
        OVER_THE_LIMIT.put("com.sun.fortress.scala_src.linker.HygienicRenamer.walk", 11599);
        // The class's initializer, once.
        OVER_THE_LIMIT.put("com.sun.fortress.useful.MagicNumbers.<clinit>", 16677);
        // The data of DirectedRoundingTest's main, which no suite runs.
        OVER_THE_LIMIT.put("com.sun.fortress.numerics.DirectedRoundingTestData.make_double_divide_data", 21975);
        OVER_THE_LIMIT.put("com.sun.fortress.numerics.DirectedRoundingTestData.make_double_multiply_data", 10229);
        OVER_THE_LIMIT.put("com.sun.fortress.numerics.DirectedRoundingTestData.make_float_divide_data", 10425);
        OVER_THE_LIMIT.put("com.sun.fortress.numerics.DirectedRoundingTestData.make_float_multiply_data", 9715);
    }

    /** The folder this class was loaded from: ProjectFortress/build. */
    private static Path buildFolder() throws Exception {
        return Paths.get(MethodSizeJUTest.class.getProtectionDomain().getCodeSource().getLocation().toURI());
    }

    /** Each method of the build with code, by class and name, with its largest size. */
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
            if (size == null)
                stale.add(e.getKey() + " (listed at " + e.getValue() + " bytes) is not in the build");
            else if (size <= HUGE_METHOD_LIMIT)
                stale.add(e.getKey() + " (listed at " + e.getValue() + " bytes) is " + size +
                          " bytes, within the limit of " + HUGE_METHOD_LIMIT + ": take it off the list");
        }
        assertTrue(String.join("; ", stale), stale.isEmpty());
    }
}
