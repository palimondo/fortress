package com.sun.fortress.nodes_util;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import junit.framework.TestCase;

import com.sun.fortress.nodes.APIName;
import com.sun.fortress.nodes.ExprInfo;
import com.sun.fortress.nodes.Id;
import com.sun.fortress.nodes.Level;
import com.sun.fortress.nodes.Node;
import com.sun.fortress.nodes.StaticArg;
import com.sun.fortress.nodes.TemplateGapExpr;
import com.sun.fortress.nodes.Type;
import com.sun.fortress.nodes._EllipsesExpr;
import com.sun.fortress.nodes._SyntaxTransformationExpr;
import com.sun.fortress.parser_util.precedence_opexpr.Higher;
import com.sun.fortress.parser_util.precedence_opexpr.RealExpr;
import com.sun.fortress.useful.PureList;

/* The hashes of syntax tree nodes and of the parser's lists and precedences, and the order of a hash set of nodes, do not depend on the identity hashes that the JVM handed out before. */
public class NodeHashJUTest extends TestCase {

    public static class Print {
        public static void main(String[] args) {
            int first = Integer.parseInt(args[0]);
            for (int i = 0; i < first; i++) new Object().hashCode();

            Span span = NodeFactory.typeSpan;
            Type t = NodeFactory.makeVarType(span, "T");
            List<StaticArg> targs = new ArrayList<StaticArg>();
            targs.add(NodeFactory.makeTypeArg(span, t));
            List<Node> nodes = Arrays.<Node>asList(
                NodeFactory.makeId(span, "x"),
                NodeFactory.makeId(span, "FortressLibrary", "x"),
                NodeFactory.makeAPIName(span, NodeFactory.makeId(span, "FortressLibrary")),
                t,
                NodeFactory.makeTraitType(span, "Generator", targs),
                NodeFactory.makeArrowType(span, t, NodeFactory.makeTraitType(span, "Boolean")));
            for (Node n : nodes)
                System.out.println(n.getClass().getSimpleName() + " " + n + " " + n.hashCode());

            Id x = NodeFactory.makeId(span, "x");
            ExprInfo info = NodeFactory.makeExprInfo(span);
            List<Object> others = Arrays.<Object>asList(
                new TemplateGapExpr(info, x, Collections.<Id>emptyList()),
                new _EllipsesExpr(info, x),
                new _SyntaxTransformationExpr(info, new HashMap<String, Level>(),
                                              Collections.<String>emptyList(), "f"),
                PureList.make("a", "b"),
                PureList.make(),
                new Higher(),
                new RealExpr(ExprFactory.makeVarRef(span, "y")));
            for (Object o : others)
                System.out.println(o.getClass().getSimpleName() + " " + o.hashCode());

            Set<APIName> apis = new HashSet<APIName>();
            for (String a : new String[] { "AnyType", "FortressBuiltin", "FortressLibrary", "RangeInternals",
                                           "NativeArray", "List", "Set", "Map", "File", "Stream" })
                apis.add(NodeFactory.makeAPIName(span, NodeFactory.makeId(span, a)));
            System.out.println("apis in order " + apis);
        }
    }

    private static String print(int identityHashesFirst) throws Exception {
        String java = System.getProperty("java.home") + File.separator + "bin" + File.separator + "java";
        ProcessBuilder pb = new ProcessBuilder(java, "-cp", System.getProperty("java.class.path"),
                                               Print.class.getName(), Integer.toString(identityHashesFirst));
        pb.redirectError(ProcessBuilder.Redirect.INHERIT);
        Process p = pb.start();
        String out = new String(p.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        assertEquals("exit code of Print " + identityHashesFirst + ", which printed:\n" + out, 0, p.waitFor());
        return out;
    }

    public void testHashesDoNotDependOnIdentityHashes() throws Exception {
        String none = print(0);
        assertTrue(none, none.contains("apis in order"));
        assertEquals("one identity hash asked for first", none, print(1));
        assertEquals("a thousand identity hashes asked for first", none, print(1000));
    }
}
