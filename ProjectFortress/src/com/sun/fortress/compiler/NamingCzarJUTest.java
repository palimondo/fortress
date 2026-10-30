/*******************************************************************************
    Copyright 2009, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/
package com.sun.fortress.compiler;

import com.sun.fortress.runtimeSystem.Naming;
import com.sun.fortress.useful.TestCaseWrapper;
import com.sun.fortress.useful.UsefulJUTest;

public class NamingCzarJUTest extends TestCaseWrapper {

    public NamingCzarJUTest() {
    }

    public NamingCzarJUTest(String arg0) {
        super(arg0);
    }

    /**
     * @param args
     */
    public static void main(String[] args) {
        junit.swingui.TestRunner.run(NamingCzarJUTest.class);
    }

    public void testForeign() {
        assertEquals("Lcom/sun/fortress/compiler/runtimeValues/FZZ32;", 
                     NamingCzar.jvmTypeDesc(NamingCzar.fortressTypeForForeignJavaType("I"), null));
        assertEquals("Lcom/sun/fortress/compiler/runtimeValues/FJavaString;",
                NamingCzar.jvmTypeDesc(NamingCzar.fortressTypeForForeignJavaType("Ljava/lang/String;"), null));
    }
    
    // In walk's world an imported Java method's types read as the one library's, else as the prelude's.
    public void testForeignOneLibrary() {
        boolean compilerWorld = WellKnownNames.areCompilerLibraries();
        try {
            WellKnownNames.useFortressLibraries();
            assertEquals("FortressLibrary.ZZ32", foreign("I", "intLT", false));
            assertEquals("FortressLibrary.ZZ64", foreign("J", "longAdd", true));
            assertEquals("FortressLibrary.RR64", foreign("D", "doubleAdd", true));
            assertEquals("FortressLibrary.String", foreign("Ljava/lang/String;", "typeName", true));
            assertEquals("FortressLibrary.ZZ", foreign("Ljava/math/BigInteger;", "bigAdd", true));
            assertEquals("FortressBuiltin.Boolean", foreign("Z", "intLT", true));
            assertEquals("FortressBuiltin.RR32", foreign("F", "floatAdd", true));
            assertEquals("FortressBuiltin.Char",
                         foreign("I", "charCodePointWithSpecialCompilerHackForCharacterArgumentType", false));
            assertEquals("FortressBuiltin.NN32",
                         foreign("I", "makeNN32FromZZ32WithSpecialCompilerHackForNN32ResultType", true));
            assertEquals("FortressLibrary.NN64",
                         foreign("J", "makeNN64FromZZ64WithSpecialCompilerHackForNN64ResultType", true));
            String vector = foreign("[I", "getSize", false);
            WellKnownNames.useCompilerLibraries();
            assertEquals(vector, foreign("[I", "getSize", false));
            assertEquals(NamingCzar.fortressTypeForForeignJavaType("I"),
                         NamingCzar.fortressTypeForForeignJavaType("I", "intLT", false));
        } finally {
            if (compilerWorld) WellKnownNames.useCompilerLibraries();
            else WellKnownNames.useFortressLibraries();
        }
    }

    private static String foreign(String desc, String method, boolean isResultType) {
        com.sun.fortress.nodes.Type t = NamingCzar.fortressTypeForForeignJavaType(desc, method, isResultType);
        return com.sun.fortress.nodes_util.NodeUtil.nameString(((com.sun.fortress.nodes.TraitType) t).getName());
    }

    public void testNameMangling() {
        String input = "/.;$<>[]:\\%\\%\\";
        String mangledInput = "\\|\\,\\?\\%\\^\\_\\{\\}\\!\\-%\\-%\\";
        String s = Naming.mangleIdentifier(input);
        assertEquals(s, mangledInput);
        input = "hello" + input;
        mangledInput = "\\=" + "hello" + mangledInput;
        s = Naming.mangleIdentifier(input);
        assertEquals(s, mangledInput);
    }

    
}
