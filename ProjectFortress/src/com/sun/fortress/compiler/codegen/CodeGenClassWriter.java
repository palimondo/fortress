/*******************************************************************************
    Copyright 2009,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

******************************************************************************/
package com.sun.fortress.compiler.codegen;

// This class allows us to wrap ClassWriters.
// It gives us the ability to turn bytecode debugging on and off.
// It also handles output to a jar.

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.jar.JarOutputStream;

import org.objectweb.asm.*;
import org.objectweb.asm.tree.MethodNode;
import org.objectweb.asm.util.*;

import com.sun.fortress.repository.ProjectProperties;
import com.sun.fortress.runtimeSystem.ByteCodeWriter;
import com.sun.fortress.runtimeSystem.Naming;
import com.sun.fortress.useful.Debug;
import com.sun.fortress.useful.Pair;

public class CodeGenClassWriter extends ManglingClassWriter {

    private final JarOutputStream jos;
    private final boolean isRoot;

    /*
     * A class holds one method of each name and descriptor (the JVM's rule; a second one stops
     * the class as it loads, with ClassFormatError).  The methods that the code generator
     * writes between startBridges and endBridges are bridges: methods at the signature of a
     * declaration that the class inherits, which forward to the body that takes the call, and
     * the dispatch methods among inherited declarations.  Each is held until the class ends
     * and written there only where no other method of the class has its name and descriptor
     * and no bridge before it had them.  So the class's own method is written over a bridge at
     * its own signature, as a declaration of a type below replaces one of a type above at the
     * same parameter types (Specification/basic/traits.tex, section "Method Declarations"),
     * and two parents that give one bridge give it once.
     */
    private final Set<String> written = new HashSet<String>();
    private final List<MethodNode> bridges = new ArrayList<MethodNode>();
    private int bridging = 0;

    public CodeGenClassWriter(int flags, JarOutputStream jos) {
        super(flags);
        this.jos = jos;
        this.isRoot = true;
        if (jos==null) throw new Error("CodeGenClassWriter: null JarOutputStream to constructor");
    }

    public CodeGenClassWriter(int flags, CodeGenClassWriter parent) {
        super(flags);
        this.jos = parent==null ? null : parent.jos;
        this.isRoot = false;
    }

    public MethodVisitor visitMethod(int access, String name, String desc, String signature, String[] exceptions) {
        name = Naming.mangleMemberName(name);
        signature = Naming.mangleFortressIdentifier(signature);
        desc = Naming.mangleMethodSignature(desc);

        return new CodeGenMethodVisitor(access, name, desc, signature, exceptions,
                                        visitNoMangleMethod(access, name, desc, signature, exceptions));
    }

    public CodeGenMethodVisitor visitCGMethod(int access, String name, String desc, String signature, String[] exceptions) {
        name = Naming.mangleMemberName(name);
        signature = Naming.mangleFortressIdentifier(signature);
        desc = Naming.mangleMethodSignature(desc);

        return new CodeGenMethodVisitor(access, name, desc, signature, exceptions,
                                        visitNoMangleMethod(access, name, desc, signature, exceptions));
    }

    /* The methods written from here to endBridges are bridges (above). */
    public void startBridges() {
        bridging++;
    }

    public void endBridges() {
        bridging--;
    }

    public ManglingMethodVisitor visitNoMangleMethod(int access, String name, String desc, String signature, String[] exceptions) {
        if (bridging > 0) {
            MethodNode bridge = new MethodNode(Opcodes.ASM9, access, name, desc, signature, exceptions);
            bridges.add(bridge);
            return new ManglingMethodVisitor(TRACE_METHODS ? new TraceMethodVisitor(bridge, new Textifier()) : bridge,
                                             access, name, desc);
        }
        written.add(name + desc);
        return super.visitNoMangleMethod(access, name, desc, signature, exceptions);
    }

    /* The bridges, each where the class has no method of its name and descriptor yet. */
    public void visitEnd() {
        for (MethodNode bridge : bridges)
            if (written.add(bridge.name + bridge.desc))
                bridge.accept(cv);
        bridges.clear();
        super.visitEnd();
    }

    private String dumpClass0( String unmangledFileName ) {
        visitEnd();

        String file = Naming.mangleFortressIdentifier(unmangledFileName);
        byte [] bytes = toByteArray();
        if (ProjectProperties.getBoolean("fortress.bytecode.verify", false)) {
            PrintWriter pw = new PrintWriter(System.out);
            CheckClassAdapter.verify(new ClassReader(bytes), true, pw);
        }

        ByteCodeWriter.writeJarredClass(jos, file, bytes);
        return file;
    }

    private void dumpClass1() {
        if (!isRoot) return;
        try {
            jos.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void dumpClass( String unmangledFileName ) {
        String file = dumpClass0(unmangledFileName);
        Debug.debug(Debug.Type.CODEGEN,1,"Wrote class ", file);
        dumpClass1();
    }

    public void dumpClass( String unmangledFileName, Naming.XlationData splist) {
        if (splist == null) {
            dumpClass(unmangledFileName);
        } else {
            String file = dumpClass0( unmangledFileName );
            ByteCodeWriter.writeJarredFile(jos, file, "xlation", splist.toBytes());
            Debug.debug(Debug.Type.CODEGEN,1,"Wrote generic class ", file);
            dumpClass1();
        }
    }

}
