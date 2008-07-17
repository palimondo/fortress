/*******************************************************************************
    Copyright 2008 Sun Microsystems, Inc.,
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

package com.sun.fortress.astgen;

import edu.rice.cs.astgen.ASTModel;
import edu.rice.cs.astgen.NodeType;
import edu.rice.cs.astgen.TabPrintWriter;

public class DepthFirstVoidVisitorGenerator extends edu.rice.cs.astgen.DepthFirstVoidVisitorGenerator {

    public DepthFirstVoidVisitorGenerator(ASTModel ast) {
        super(ast);
    }

    protected void outputDelegatingForCase(NodeType t, TabPrintWriter writer, NodeType root,
            String retType, String suff, String defaultMethod) {
        if (!(t instanceof TemplateGapClass)) {
            super.outputDelegatingForCase(t, writer, root, retType, suff, defaultMethod);
        }
    }
    
    protected void outputVisitMethod(NodeType t, TabPrintWriter writer, NodeType root) {
        if (t instanceof TemplateGapClass) {
            outputForCaseHeader(t, writer, "void", "");
            writer.indent();
            writer.startLine("throw new RuntimeException(\"Please use TemplateDepthFirstVoidVisitor if you intend to visit template gaps, if not then a template gap survived longer than its expected life time.\");");
            writer.unindent();
            writer.startLine("}");
            writer.println();
        }
        else {
            super.outputVisitMethod(t, writer, root);
        }
    }
}