/*******************************************************************************
    Copyright 2007 Sun Microsystems, Inc.,
    4150 Network Circle, Santa Clara, California 95054, U.S.A.
    All rights reserved.

    U.S. Government Rights - Commercial software.
    Government users are subject to the Sun Microsystems, Inc. standard
    license agreement and applicable provisions of the FAR and its supplements.

    Use is subject to license terms.

    This distribution may include materials developed by third parties.

    Sun, Sun Microsystems, the Sun logo and Java are trademarks or registered
    trademarks of Sun Microsystems, Inc. in the U.S. and other countries.
 ******************************************************************************/

package com.sun.fortress.interpreter.nodes;

import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import com.sun.fortress.interpreter.reader.Lex;
import com.sun.fortress.interpreter.useful.Pair;


/**
 * A collection of methods for converting from a readable AST to an AST data
 * structure. It assumes input generated by the companion class Printer.
 *
 * The Unprinter uses reflection to allocate com.sun.fortress.interpreter.nodes and fill in fields. The first
 * element X in an S-sexpression is assumed to be a class name, which is assumed
 * to denote the class com.sun.fortress.interpreter.nodes.X.
 *
 * Fields are specified by name, and data types are indicated either by
 * reflected field information, or by syntactic queues in the input (double
 * quotes, square brackets, at signs, and so on). For many types, there is a
 * canonical value for missing information, zero, false, empty string, empty
 * list, absent, and so on, so that the input can be less verbose. In
 * particular, a missing location is supposed to be the same as the previous
 * location.
 *
 * Sample input follows. The first line indicates the beginning of a component,
 * and further (after the "@") supplies location information. The fields of a
 * component include name (a DottedId) and defs (a List).
 *
 * (Component
 *
 * @"../samples/let_fn.fss",7:3 name=(DottedId
 * @1:24 names=["samples" "let_fn"]) defs=[ (VarDecl
 * @6:11 init=(Block exprs=[ (LetFn
 * @4:21 body=[ (TightJuxt
 * @5:10~12 exprs=[ (VarRefExpr
 * @5:10 var=(Id name="f")) (IntLiteral
 * @5:12 text="7" val=7 props=["parenthesized"])])] fns=[ (FnDecl
 * @4:21 body=(OprExpr
 * @4:17~21 op=(Opr
 * @4:19 op=(Op name="+")) args=[ (VarRefExpr
 * @4:17 var=(Id name="y")) (IntLiteral
 * @4:21 text="1" val=1)]) contract=(Contract
 * @4:13) name=(Fun name_=(Id
 * @4:10 name="f")) params=[ (Param
 * @4:12 name=(Id
 * @4:11 name="y"))])])]) name=(Id
 * @3:1 name="x") type=(Some val=(IdType
 * @3:5 name=(DottedId names=["int"]))))])
 */
public class Unprinter extends NodeReflection {

    public Span lastSpan = new Span(); // Default value is all empty and zero.

    Lex l;

    /**
     * An unprinter wraps a primitive Lexer.
     */
    public Unprinter(Lex l) {
        this.l = l;
    }

    /**
     * Reads the location-describing information that follows an at-sign (@)
     * following the class name in an S-expression. The most general location is
     * <br>
     * "startfile",startline:startcolumn~"endfile",endline:endcolumn <br>
     * The full list of accepted location forms appears below. Missing
     * information is inferred; missing file is copied from the previous
     * location's ending file, missing endpoint is copied from the start point,
     * and missing line is copied from the same line.
     * <p>
     * "f1",1:2~"f2",3:4<br>
     * "f3",5:6~7:8<br>
     * "f4",9:10~11 (range of columns)<br>
     * "f5",12:13<br>
     * 14:15~16:17<br>
     * 18:19~20 (range of columns)<br>
     * 21:22<br>
     *
     * @return
     * @throws IOException
     */
    public String readSpan() throws IOException {
        // Begin by copying the old source span,
        // and then overwrite as information appears.
        SourceLoc b = new SourceLocRats(lastSpan.begin);
        SourceLoc e = new SourceLocRats(lastSpan.end);
        lastSpan = new Span(b, e);

        SourceLoc sloc = lastSpan.begin;

        String fname = sloc.getFileName();
        int line = sloc.getLine();
        int column = sloc.column();

        String next = l.name(false);
        if (next.startsWith("\"") && next.endsWith("\"")) {
            fname = deQuote(next);
            String comma = l.name(false);
            if (!",".equals(comma)) {
                throw new Error("Expected comma, got " + comma);
            }
            next = l.name(false);
        }
        String l1 = next;
        String colon = l.name(false);
        String c1 = l.name(false);
        line = Integer.parseInt(l1, 10);
        column = Integer.parseInt(c1, 10);

        sloc.setFileName(fname);
        sloc.setLine(line);
        sloc.setColumn(column);

        sloc = lastSpan.end;

        String sep = l.name(false);
        if (Printer.tilde.equals(sep)) {
            next = l.name(false);
            boolean sawFile = false;
            if (next.startsWith("\"") && next.endsWith("\"")) {
                fname = deQuote(next);
                String comma = l.name(false);
                if (!",".equals(comma)) {
                    throw new Error("Expected comma, got " + comma);
                }
                next = l.name(false);
                sawFile = true;
            }
            String l_or_c = next; // or perhaps column
            colon = l.name(false);
            if (":".equals(colon)) {
                l1 = l_or_c;
                c1 = l.name(false);
                next = l.name();
            } else if (sawFile) {
                throw new Error("Saw f,l:c~f,l with no following colon");
            } else {
                c1 = l_or_c;
                if (")".equals(colon)) {
                    next = colon;
                } else if (colon.length() == 0) {
                    next = l.name();
                } else {
                    throw new Error("Did we expect this?");
                }

            }

        } else if (sep.length() == 0) {
            next = l.name();
        } else {
            next = sep;
        }
        line = Integer.parseInt(l1, 10);
        column = Integer.parseInt(c1, 10);

        sloc.setFileName(fname);
        sloc.setLine(line);
        sloc.setColumn(column);

        return next;
    }

    static Class[] oneSpanArg = { Span.class };

    @Override
    protected Constructor defaultConstructorFor(Class cl)
            throws NoSuchMethodException {
        return cl.getDeclaredConstructor(oneSpanArg);
    }

    /**
     * Expects a String representation of an AST, beginning with left
     * parentheses and name of the AST node being read.
     *
     * @return The AST whose represenation appears on the input, including all
     *         of its substructure.
     * @throws IOException
     */
    public Node read() throws IOException {
        l.lp();
        return readNode(l.name());
    }

    /**
     * Reads the remainder of the S expression for the class whose name is
     * passed in as a parameter. Expect that leading "(" and class name have
     * both already been read from the stream.
     *
     * @return The AST whose represenation appears on the input, including all
     *         of its substructure.
     * @throws IOException
     */
    public Node readNode(String class_name) throws IOException {
        classFor(class_name); // Loads other tables as a side-effect
        Constructor con = constructorFor(class_name);
        Node node = null;
        String next = l.name();

        // Next token is either a field, or a span.
        if ("@".equals(next)) {
            next = readSpan();
        }

        // Begins by constructing an empty node.
        // To be readable, a node class must supply a constructor for
        // a single Span argument.
        try {
            Object[] args = new Object[1];
            args[0] = lastSpan;
            node = (Node) con.newInstance(args);
        } catch (InvocationTargetException e) {
            e.printStackTrace();
            throw new Error("Error reading node type " + class_name);
        } catch (InstantiationException e) {
            e.printStackTrace();
            throw new Error("Error reading node type " + class_name);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
            throw new Error("Error reading node type " + class_name);
        }
        // Iteratively read field names and values, and assign them into
        // the (increasingly less-) empty node.
        try {
            while (!")".equals(next)) {
                Field f = fieldFor(class_name, next);
                expectPrefix("=");
                // Try to figure out, based on reflected type, what we are
                // reading.
                // Fail if the syntax doesn't match.

                // There is some, not too much, consistency checking
                // between Field type and input syntax.
                if (f.getType() == List.class) {
                    expectPrefix("[");
                    // This is an actual hole. Might want to add a
                    // structure-verification
                    // frob to any methods containing List or Pair.
                    f.set(node, readList());
                } else if (f.getType() == Pair.class) {
                    expectPrefix("(Pair");
                    // This is an actual hole. Might want to add a
                    // structure-verification
                    // frob to any methods containing List or Pair.
                    f.set(node, readPair());
                } else if (f.getType() == String.class) {
                    f.set(node, deQuote(l.name())); // Lexer returns an
                                                    // escape-containing
                    // string, deQuote converts to Unicode.
                } else if (f.getType() == Integer.TYPE) {
                    f.setInt(node, readInt(l.name()));
                } else if (f.getType() == Boolean.TYPE) {
                    f.setBoolean(node, readBoolean(l.name()));
                } else if (f.getType() == Double.TYPE) {
                    f.setDouble(node, readDouble(l.string()));
                } else if (f.getType() == BigInteger.class) {
                    f.set(node, readBigInteger(l.name()));
                } else if (Option.class.isAssignableFrom(f.getType())) {
                    f.set(node, readOption());
                } else if (Node.class.isAssignableFrom(f.getType())
                        || LHS.class.isAssignableFrom(f.getType())) {
                    expectPrefix("(");
                    f.set(node, readNode(l.name()));
                }
                next = l.name();
            }

            // Check for unassigned fields, pick sensible defaults.
            for (Field f : fieldArrayFor(class_name)) {
                Class fcl = f.getType();
                // Happily, primitives all wake up with good default values.
                if (!fcl.isPrimitive() && f.get(node) == null) {
                    if (fcl == List.class) {
                        // empty list
                        f.set(node, new ArrayList());
                    } else if (fcl == String.class) {
                        // empty string
                        f.set(node, "");
                    } else if (fcl == Option.class) {
                        // missing option
                        f.set(node, new None());
                    } else {
                        throw new Error("Unexpected missing data, field "
                                + f.getName() + " of class " + class_name);
                    }
                }
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            throw new Error("Error reading node type " + class_name);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
            throw new Error("Error reading node type " + class_name);
        } catch (IOException e) {
            e.printStackTrace();
            throw new Error("Error reading node type " + class_name);
        }
        return node;
    }

    public void expectPrefix(String string) throws IOException {
        l.expectPrefix(string);
    }

    private final static int NORMAL = 0;

    private final static int SAW_BACKSLASH = 1;

    private final static int SAW_BACKSLASH_TICK = 2;

    /**
     * Given a quoted string, return the Unicode string encoded within. The
     * input should be quoted, but the quotes do not appear in the resulting
     * Unicode.
     *
     * @param first
     * @return
     */
    public static String deQuote(CharSequence s) {
        int l = s.length();
        if (s.charAt(0) != '\"') {
            throw new Error("Malformed input, missing initial \"");
        }
        if (s.charAt(l - 1) != '\"') {
            throw new Error("Malformed input, missing final \"");
        }
        StringBuffer sb = new StringBuffer(l - 2);
        StringBuffer escaped = null;
        int state = NORMAL;
        for (int i = 1; i < l - 1; i++) {
            char c = s.charAt(i);
            if (state == NORMAL) {
                if (c == '\"') {
                    throw new Error(
                            "Malformed input, unescaped \" seen at position "
                                    + i);
                } else if (c == '\\') {
                    state = SAW_BACKSLASH;
                } else {
                    sb.append(c);
                }
            } else if (state == SAW_BACKSLASH) {
                if (c == 'b') {
                    sb.append('\b');
                    state = NORMAL;
                } else if (c == 't') {
                    sb.append('\t');
                    state = NORMAL;
                } else if (c == 'n') {
                    sb.append('\n');
                    state = NORMAL;
                } else if (c == 'f') {
                    sb.append('\f');
                    state = NORMAL;
                } else if (c == 'r') {
                    sb.append('\r');
                    state = NORMAL;
                } else if (c == '\"') {
                    sb.append('\"');
                    state = NORMAL;
                } else if (c == '\\') {
                    sb.append('\\');
                    state = NORMAL;
                } else if (c == '\'') {
                    state = SAW_BACKSLASH_TICK;
                    escaped = new StringBuffer();
                } else {
                    throw new Error(
                            "Malformed input, unexpected backslash escape " + c
                                    + "(hex " + Integer.toHexString(c)
                                    + ") at index " + i);
                }
            } else if (state == SAW_BACKSLASH_TICK) {
                if (c == '\'') {
                    // Decipher string accumulated in escaped.
                    state = NORMAL;
                    if (escaped.length() == 0) {
                        sb.append('\'');
                    } else if (Character.isDigit(escaped.charAt(0))) {
                        int fromHex;
                        try {
                            fromHex = Integer.parseInt(escaped.toString(), 16);
                            if (fromHex < 0 || fromHex > 0xFFFF) {
                                throw new Error("Unicode " + escaped
                                        + " too large for Java-hosted tool");
                            }
                            sb.append((char) fromHex);
                        } catch (NumberFormatException ex) {
                            throw new Error("Malformed hex encoding " + escaped);
                        }
                    } else {
                        translateUnicode(escaped.toString(), sb);

                    }
                } else {
                    escaped.append(c);
                }
            }

        }
        return sb.toString();
    }

    /**
     * Appends to sb the Unicode characters specified by name in escaped.
     * Incomplete implementation of the Fortress Unicode escaping spec.
     *
     * @param escaped
     * @param sb
     */
    public static void translateUnicode(String escaped, StringBuffer sb) {
        // TODO Need to implement full generality of Unicode name encoding.
        StringTokenizer st = new StringTokenizer(escaped, "&", false);
        while (st.hasMoreTokens()) {
            String tok = st.nextToken();
            String mapped = Unicode.byNameLC(tok);
            if (Character.isUpperCase(tok.charAt(0))) {
                mapped = mapped.toUpperCase();
            }
            sb.append(mapped);
        }
    }

    public static String enQuote(CharSequence s) {
        StringBuffer sb = new StringBuffer(s.length() + 2);
        int l = s.length();
        for (int i = 0; i < l; i++) {
            char c = s.charAt(i);
            if (needsBackslash(c)) {
                sb.append('\\');
                sb.append(afterBackslash(c));
            } else if (needsUnicoding(c)) {
                // At least two characters following \',
                // and also beginning with 0-9.
                sb.append('\\');
                sb.append('\'');
                String hex = Integer.toHexString(c);
                if (hex.length() < 2 || hex.charAt(0) > '9') {
                    sb.append('0');
                }
                sb.append(hex);
                sb.append('\'');
            } else {
                sb.append(c);
            }

        }
        return sb.toString();
    }

    private static boolean needsUnicoding(char c) {
        return c < ' ' || c > '~';
    }

    private static boolean needsBackslash(char c) {
        return c == '\b' || c == '\t' || c == '\n' || c == '\f' || c == '\r'
                || c == '\"' || c == '\\';
    }

    private static char afterBackslash(char c) {
        switch (c) {
        case '\b':
            return 'b';
        case '\t':
            return 't';
        case '\n':
            return 'n';
        case '\f':
            return 'f';
        case '\r':
            return 'r';
        case '\"':
            return '\"';
        case '\\':
            return '\\';
        default:
            throw new Error("Invalid input, character value 0x"
                    + Integer.toHexString(c));
        }
    }

    private Pair<Object, Object> readPair() throws IOException {
        String a = l.name();
        Object x, y;
        if ("(".equals(a)) {
            x = readNode(l.name());
            expectPrefix("(");
            y = readNode(l.name());
        } else if ("[".equals(a)) {
            x = readList();
            expectPrefix("[");
            y = readList();
        } else if (a.startsWith("\"")) {
            x = deQuote(a); // Internal form is quoted
            y = deQuote(l.name()); // Internal form is quoted
        } else {
            throw new Error("Pair of unknown stuff beginning " + a);
        }
        expectPrefix(")");
        return new Pair<Object, Object>(x, y);
    }

    int readInt(String s) throws IOException {
        return Integer.parseInt(s, 10);

    }

    double readDouble(String s) throws IOException {
        return Double.parseDouble(s);

    }

    boolean readBoolean(String s) throws IOException {
        return Boolean.parseBoolean(s);
    }

    BigInteger readBigInteger(String s) throws IOException {
        return new BigInteger(s);
    }

    public List<Object> readList() throws IOException {
        String s = l.name();
        ArrayList<Object> a = new ArrayList<Object>();
        Object x;
        while (true) {
            if ("(".equals(s)) {
                s = l.name();
                if ("Pair".equals(s)) {
                    x = readPair();
                } else {
                    x = readNode(s);
                }
            } else if ("[".equals(s)) {
                x = readList();
            } else if (s.startsWith("\"")) {
                x = deQuote(s); // Intermediate form is quoted.
            } else if (s.startsWith("]")) {
                return a;
            } else {
                throw new Error("List of unknown element beginning " + s);
            }
            a.add(x);
            s = l.name();
        }
    }

    public Option readOption() throws IOException {
        // Reading options is slightly different because
        // there is no detailed reflection information for
        // generics in Java. This code simply chooses to
        // believes the types in the input.
        expectPrefix("(Some");
        String s = l.name();
        if (")".equals(s)) {
            return new None();
        } else if (!"val".equals(s)) {
            throw new Error("Expected 'val' saw '" + s + "'");
        }
        expectPrefix("=");
        Object x;
        s = l.name();
        if ("(".equals(s)) {
            s = l.name();
            if ("Pair".equals(s)) {
                x = readPair();
            } else {
                x = readNode(s);
            }
        } else if ("[".equals(s)) {
            x = readList();
        } else if (s.startsWith("\"")) {
            x = deQuote(s); // Internal form is quoted. deQuoteQuoted(s);
        } else {
            x = null;
        }
        expectPrefix(")");
        return new Some<Object>(x);
    }

}
