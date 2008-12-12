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

package com.sun.fortress.compiler.desugarer;

import java.util.LinkedList;
import java.util.List;


import com.sun.fortress.nodes.Id;
import com.sun.fortress.nodes.IdOrOp;
import com.sun.fortress.nodes.Decl;
import com.sun.fortress.nodes.Expr;
import com.sun.fortress.nodes.FnRef;
import com.sun.fortress.nodes.Juxt;
import com.sun.fortress.nodes.MethodInvocation;
import com.sun.fortress.nodes.Node;
import com.sun.fortress.nodes.NodeUpdateVisitor;
import com.sun.fortress.nodes.ObjectDecl;
import com.sun.fortress.nodes.VarRef;
import com.sun.fortress.nodes._RewriteFnApp;
import com.sun.fortress.nodes_util.ExprFactory;
import static com.sun.fortress.exceptions.InterpreterBug.bug;

public class DottedMethodRewriteVisitor extends NodeUpdateVisitor {
    private VarRef receiver;
    private List<FnRef> methodRefs;

    public DottedMethodRewriteVisitor(VarRef receiver,
                                List<FnRef> fnRefs) {
        this.receiver = receiver;
        this.methodRefs = fnRefs;
    }

    @Override
    public Node forObjectDecl(ObjectDecl that) {
        List<Decl> decls_result = recurOnListOfDecl(that.getDecls());
        return super.forObjectDeclOnly(that, that.getName(),
                                       that.getStaticParams(),
                                       that.getExtendsClause(), that.getWhereClause(),
                                       decls_result, that.getParams(),
                                       that.getThrowsClause(), that.getContract());
    }

    @Override
    public Node forJuxt(Juxt that) {
        // FIXME: Not sure if I really need to recur on other things
        List<Expr> exprs_result = recurOnListOfExpr(that.getExprs());
        Expr first = exprs_result.get(0);
        if(first instanceof FnRef && methodRefs.contains(first)) {
            FnRef fnRef = (FnRef) first;
            MethodInvocation mi = makeMethodInvocationFrom(fnRef, exprs_result.subList(1, exprs_result.size()) );
            exprs_result = new LinkedList<Expr>();
            exprs_result.add(mi);
        }
        return forJuxtOnly(that,
                           that.getExprType(), that.getMultiJuxt(),
                           that.getInfixJuxt(), exprs_result);
    }

    public Node for_RewriteFnApp(_RewriteFnApp that) {
        Expr function = (Expr) recur(that.getFunction());
        Expr arg = (Expr) recur(that.getArgument());

        if(function instanceof FnRef && methodRefs.contains(function)) {
           FnRef fnRef = (FnRef) function;
           IdOrOp name = fnRef.getOriginalName();
           if ( ! (name instanceof Id) )
               bug(name, "The name field of FnRef should be Id.");
           MethodInvocation mi = ExprFactory.makeMethodInvocation( fnRef.getSpan(),
                                                                   fnRef.isParenthesized(),
                                                                   fnRef.getExprType(),
                                                                   receiver, (Id)name,
                                                                   fnRef.getStaticArgs(),
                                                                   arg );
           return mi;
        }

        return for_RewriteFnAppOnly(that, that.getExprType(), function, arg);
    }

    private MethodInvocation makeMethodInvocationFrom(FnRef fnRef,
                                                      List<Expr> args) {
        MethodInvocation mi = null;
        Expr argExpr = null;

        if(args.size() == 1) {
            argExpr = args.get(0);
        } else {
            argExpr = ExprFactory.makeTupleExpr(fnRef.getSpan(), args);
        }
        IdOrOp name = fnRef.getOriginalName();
        if ( ! (name instanceof Id) )
            bug(name, "The name field of FnRef should be Id.");

        mi = ExprFactory.makeMethodInvocation( fnRef.getSpan(),
                                               fnRef.isParenthesized(),
                                               fnRef.getExprType(),
                                               receiver, (Id)name,
                                               fnRef.getStaticArgs(),
                                               argExpr );

        return mi;
    }


}
