package com.sun.fortress.scala_src.nodes;

import java.io.InputStream;
import java.lang.classfile.Attributes;
import java.lang.classfile.ClassFile;
import java.lang.classfile.ClassModel;
import java.lang.classfile.MethodModel;
import java.lang.classfile.attribute.CodeAttribute;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import junit.framework.TestCase;

import com.sun.fortress.compiler.Types;
import com.sun.fortress.nodes.KindOp;
import com.sun.fortress.nodes.StaticArg;
import com.sun.fortress.nodes.Type;
import com.sun.fortress.nodes.VarType;
import com.sun.fortress.nodes_util.NodeFactory;
import com.sun.fortress.nodes_util.Span;

/* The generated walker: every method of it is short enough for the JVM to compile, a walk
 * rebuilds each node it reaches from its walked fields, and every other value comes back as it is. */
public class WalkerJUTest extends TestCase {

    // HotSpot does not compile a method of more bytes of bytecode than this (HugeMethodLimit,
    // under the default DontCompileHugeMethods), so such a method always runs in the interpreter.
    private static final int HUGE_METHOD_LIMIT = 8000;

    private static final Span SPAN = NodeFactory.typeSpan;

    private static Type trait(String name, Type... args) {
        List<StaticArg> sargs = new ArrayList<StaticArg>();
        for (Type a : args) sargs.add(NodeFactory.makeTypeArg(SPAN, a));
        return NodeFactory.makeTraitType(SPAN, name, sargs);
    }
    private static Type var(String name) { return NodeFactory.makeVarType(SPAN, name); }
    private static Type tuple(Type... ts) { return NodeFactory.makeMaybeTupleType(SPAN, Arrays.asList(ts)); }
    private static Type arrow(Type d, Type r) { return NodeFactory.makeArrowType(SPAN, d, r); }
    private static Type and(Type... ts) { return NodeFactory.makeMaybeIntersectionType(Arrays.asList(ts)); }
    private static Type or(Type... ts) { return NodeFactory.makeMaybeUnionType(Arrays.asList(ts)); }

    /** A walker that changes nothing. */
    private static Walker identity() { return new Walker() {}; }

    /** A walker that puts Zz in place of the type variable T. */
    private static Walker replacingT() {
        return new Walker() {
            public Object walk(Object node) {
                if (node instanceof VarType && ((VarType)node).getName().getText().equals("T"))
                    return trait("Zz");
                return Walker.super.walk(node);
            }
        };
    }

    public void testEveryMethodCompilable() throws Exception {
        ClassModel model;
        try (InputStream in = Walker.class.getResourceAsStream("Walker.class")) {
            model = ClassFile.of().parse(in.readAllBytes());
        }
        int withCode = 0;
        for (MethodModel m : model.methods()) {
            Optional<CodeAttribute> code = m.findAttribute(Attributes.code());
            if (code.isPresent()) {
                withCode++;
                int size = code.get().codeLength();
                assertTrue("Walker." + m.methodName().stringValue() + " is " + size +
                           " bytes of bytecode, more than " + HUGE_METHOD_LIMIT,
                           size <= HUGE_METHOD_LIMIT);
            }
        }
        assertTrue("Walker has methods with code", withCode > 0);
    }

    public void testIdentityWalkRebuildsNodes() {
        Walker w = identity();
        List<Type> types = Arrays.asList(
            trait("Ab", var("T"), arrow(tuple(trait("Cd"), var("D")), trait("Ef"))),
            and(trait("Ab"), or(trait("Cd"), trait("Ef"))),
            arrow(tuple(trait("Ab"), var("U")), Types.BOTTOM),
            Types.ANY,
            Types.OBJECT);
        for (Type t : types) {
            Object r = w.apply(t);
            assertEquals(t.toString(), t, r);
            assertNotSame(t.toString(), t, r);
        }
    }

    public void testOtherValuesComeBackAsTheyAre() {
        Walker w = identity();
        String str = "x";
        assertSame(str, w.apply(str));
        assertSame(SPAN, w.apply(SPAN));
        Integer n = Integer.valueOf(7);
        assertSame(n, w.apply(n));
        // A node class with no fields matches no case of the walker.
        KindOp kindOp = new KindOp();
        assertSame(kindOp, w.apply(kindOp));
        assertEquals(scala.None$.MODULE$, w.apply(scala.None$.MODULE$));
        Object nil = scala.collection.immutable.Nil$.MODULE$;
        assertEquals(nil, w.apply(nil));
    }

    public void testOverrideReachesNestedNodes() {
        Walker w = replacingT();
        Type zz = trait("Zz");
        assertEquals(trait("Ab", zz, arrow(tuple(trait("Cd"), zz), trait("Ef"))),
                     w.apply(trait("Ab", var("T"), arrow(tuple(trait("Cd"), var("T")), trait("Ef")))));
        assertEquals(and(zz, or(trait("Cd"), zz)),
                     w.apply(and(var("T"), or(trait("Cd"), var("T")))));
        assertEquals(scala.Option.apply(zz), w.apply(scala.Option.apply(var("T"))));
        scala.collection.immutable.List<Type> in =
            scala.jdk.javaapi.CollectionConverters.asScala(Arrays.asList(var("T"), trait("Ab", var("T")))).toList();
        scala.collection.immutable.List<Type> out =
            scala.jdk.javaapi.CollectionConverters.asScala(Arrays.asList(zz, trait("Ab", zz))).toList();
        assertEquals(out, w.apply(in));
    }
}
