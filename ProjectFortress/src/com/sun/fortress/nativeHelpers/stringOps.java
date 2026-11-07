/*******************************************************************************
 Copyright 2011, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.nativeHelpers;

import java.util.List;

import com.sun.fortress.compiler.runtimeValues.FValue;
import com.sun.fortress.runtimeSystem.Naming;
import com.sun.fortress.runtimeSystem.RTHelpers;
import com.sun.fortress.useful.Useful;

public class stringOps {

    public static int compareTo(String s, String t) {
        return s.compareTo(t);
    }

    public static boolean stringEquals(String s, String t) {
        return s.equals(t);
    }
    
    public static String substring(String s, int start, int finish) {
        return Useful.substring(s, start, finish);
    }
    
    public static int charAt(String s, int at) {
        return s.charAt(at);
    }

    public static int indexOf(String s, int t) {
	return s.indexOf(t);
    }

    public static int lastIndexOf(String s, int t) {
	return s.lastIndexOf(t);
    }

    /* The string quoted and escaped as walk's FString.toString renders it: FlatString's asExprString. */
    public static String asExprString(String s) {
        return "\"" + com.sun.fortress.nodes_util.Unprinter.enQuote(s) + "\"";
    }

    public static int compareToIgnoreCase(String s, String t) {
        return s.compareToIgnoreCase(t);
    }

    /* Java's substring, which raises out of range, unlike substring above, which clamps. */
    public static String javaSubstr(String s, int lo, int hi) {
        return s.substring(lo, hi);
    }

    public static boolean javaRegExpMatches(String s, String regex) {
        return java.util.regex.Pattern.matches(regex, s);
    }

    /* The piece at index i of s split at regex, or the empty string past the last piece. */
    public static String javaRegExpSplit(String s, String regex, int i) {
        String[] pieces = java.util.regex.Pattern.compile(regex).split(s);
        return i < pieces.length ? pieces[i] : "";
    }

    public static boolean match(String regex, String some) {
        return some.matches(regex);
    }

    /* The JVM's line separator, FlatString's lineSeparator. */
    public static String lineSeparator() {
        return System.getProperty("line.separator");
    }
    
    public static String asString(fortress.AnyType.Any a) { // this can't be right! DRC
        //        return "<" + a.getClass() + ">";
        return a.toString(); // I think this is better CHF
    }

    /* The Fortress type name of a value, static arguments included: Box[\ZZ32\]. */
    public static String typeName(fortress.AnyType.Any a) {
        return fortressTypeName(Naming.demangleFortressIdentifier(Naming.dotToSep(a.getClass().getName())));
    }

    private static String fortressTypeName(String s) {
        if (s.equals(Naming.SNOWMAN)) return "()";
        int left = s.indexOf(Naming.LEFT_OXFORD_CHAR);
        String stem = left == -1 ? s : s.substring(0, left);
        String name = stem.substring(Math.max(stem.lastIndexOf('/'), stem.lastIndexOf('$')) + 1);
        if (stem.startsWith(Naming.RT_VALUES_PKG)) name = name.substring(1); // FZZ32 is ZZ32
        if (left == -1) return name;
        List<String> args = RTHelpers.extractStringParameters(s);
        boolean arrow = stem.equals(Naming.ARROW_TAG) || stem.equals(Naming.ABSTRACT_ARROW);
        int last = arrow ? args.size() - 1 : args.size();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < last; i++)
            sb.append(i == 0 ? "" : ",").append(fortressTypeName(args.get(i)));
        String inner = sb.toString();
        if (arrow)
            return (last == 1 ? inner : "(" + inner + ")") + "->" + fortressTypeName(args.get(last));
        if (stem.equals(Naming.TUPLE_TAG) || stem.equals(Naming.CONCRETE_TUPLE))
            return "(" + inner + ")";
        return name + "[\\" + inner + "\\]";
    }

    /* The compiled default asString: the Java rendering a value's class has of its own, else its Fortress type name. */
    public static String defaultAsString(fortress.AnyType.Any a) {
        return hasOwnToString(a) ? a.toString() : typeName(a);
    }

    private static boolean hasOwnToString(fortress.AnyType.Any a) {
        try {
            Class<?> d = a.getClass().getMethod("toString").getDeclaringClass();
            return d != FValue.class && d != Object.class;
        } catch (NoSuchMethodException e) {
            return false;
        }
    }

}
