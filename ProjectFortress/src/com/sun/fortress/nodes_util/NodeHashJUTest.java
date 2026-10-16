package com.sun.fortress.nodes_util;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import junit.framework.TestCase;

import com.sun.fortress.nodes.APIName;
import com.sun.fortress.nodes.Node;
import com.sun.fortress.nodes.StaticArg;
import com.sun.fortress.nodes.Type;

/* A syntax tree node's hash, and so the order of a hash set of nodes, does not depend on the
 * identity hashes that the JVM handed out before it. */
public class NodeHashJUTest extends TestCase {

    /** Asks for as many identity hashes as its argument says, then prints the hashes of a few
     *  nodes and the order of a hash set of api names. */
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

            Set<APIName> apis = new HashSet<APIName>();
            for (String a : new String[] { "AnyType", "FortressBuiltin", "FortressLibrary", "RangeInternals",
                                           "NativeArray", "List", "Set", "Map", "File", "Stream" })
                apis.add(NodeFactory.makeAPIName(span, NodeFactory.makeId(span, a)));
            System.out.println("apis in order " + apis);
        }
    }

    /** What Print prints in a JVM of its own that asks for that many identity hashes first. */
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
