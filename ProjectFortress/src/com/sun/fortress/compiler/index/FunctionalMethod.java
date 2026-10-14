/*******************************************************************************
    Copyright 2008,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.index;

import com.sun.fortress.nodes.*;
import com.sun.fortress.nodes_util.Modifiers;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.nodes_util.Span;
import com.sun.fortress.nodes_util.NodeFactory;
import com.sun.fortress.compiler.NamingCzar;
import com.sun.fortress.compiler.typechecker.StaticTypeReplacer;

import edu.rice.cs.plt.collect.CollectUtil;
import edu.rice.cs.plt.iter.IterUtil;
import edu.rice.cs.plt.lambda.SimpleBox;
import edu.rice.cs.plt.lambda.Thunk;
import edu.rice.cs.plt.tuple.Option;

import java.util.Collections;
import java.util.List;

/**
 * Note that this is a {@link Function}, not a {@link Method}, despite the name
 * (methods have distinct receivers).
 */
public class FunctionalMethod extends Function implements HasSelfType, HasTraitStaticParameters {
    protected final FnDecl _ast;
    protected final Id _declaringTrait;
    protected final List<StaticParam> _traitParams;
    protected final Option<SelfType> _selfType;
    protected final int _selfPosition;
    private final boolean _declarerIsObject;

    /* A self type read from the F-bound (a trait with no comprises clause whose self type
     * lists its self parameter) types self in the body only: the declaration's signature,
     * read by overloading, the Return Type Rule and call resolution, keeps the trait type. */
    private final boolean _selfFromBound;

    private static boolean selfFromBound(TraitObjectDecl d) {
        if (!(d instanceof TraitDecl) || d.getSelfType().isNone()) return false;
        Option<List<NamedType>> c = ((TraitDecl) d).getComprisesClause();
        SelfType s = d.getSelfType().unwrap();
        return (c.isNone() || c.unwrap().isEmpty()) && s instanceof TraitSelfType &&
               !((TraitSelfType) s).getComprised().isEmpty();
    }

    private static SelfType plain(SelfType s) {
        return s instanceof TraitSelfType
            ? new TraitSelfType(s.getInfo(), ((TraitSelfType) s).getNamed(), Collections.<NamedType>emptyList())
            : s;
    }

    public FunctionalMethod(FnDecl ast, TraitObjectDecl traitDecl, List<StaticParam> traitParams) {
        _ast = ast;
        _declaringTrait = NodeUtil.getName(traitDecl);
        _traitParams = CollectUtil.makeList(IterUtil.map(traitParams, liftStaticParam));
        _selfFromBound = selfFromBound(traitDecl);
        _selfType = _selfFromBound ? Option.some(plain(traitDecl.getSelfType().unwrap())) : traitDecl.getSelfType();
        _declarerIsObject = traitDecl instanceof ObjectDecl;
        int i = 0;
        for (Param p : NodeUtil.getParams(ast)) {
            if (p.getName().equals(NamingCzar.SELF_NAME)) break;
            ++i;
        }
        _selfPosition = i;

        if (NodeUtil.getReturnType(_ast).isSome())
            _thunk = Option.<Thunk<Option<Type>>>some(SimpleBox.make(NodeUtil.getReturnType(_ast)));
    }

    /**
     * Copy another FunctionalMethod, performing a substitution with the visitor.
     */
    public FunctionalMethod(FunctionalMethod that, List<StaticParam> params, StaticTypeReplacer visitor) {
        _ast = (FnDecl) that._ast.accept(visitor);
        _declaringTrait = that._declaringTrait;
        _traitParams = params;
        _selfType = visitor.recurOnOptionOfSelfType(that._selfType);
        _selfFromBound = that._selfFromBound;
        _selfPosition = that._selfPosition;
        _declarerIsObject = that._declarerIsObject;
        _thunk = that._thunk;
        _thunkVisitors = that._thunkVisitors;
        pushVisitor(visitor);
    }

    public FnDecl ast() {
        return _ast;
    }

    public boolean declarerIsObject() {
        return _declarerIsObject;
    }
    
    public Modifiers mods() {
        return NodeUtil.getMods(ast());
    }

    @Override
    public Span getSpan() {
        return NodeUtil.getSpan(_ast);
    }

    public IdOrOpOrAnonymousName toUndecoratedName() {
        return ast().getHeader().getName();
    }

    @Override
    public IdOrOp name() {
        // Functional methods cannot have anonymous names.
        return (IdOrOp) NodeUtil.getName(_ast);
    }

    public IdOrOp unambiguousName() {
        return (IdOrOp) _ast.getUnambiguousName();
    }

    public Id declaringTrait() {
        return _declaringTrait;
    }
    
    @Override
    public List<StaticParam> traitStaticParameters() {
        return _traitParams;
    }

    @Override
    public Option<Expr> body() {
        return _ast.accept(new NodeDepthFirstVisitor<Option<Expr>>() {
            @Override
            public Option<Expr> defaultCase(Node that) {
                return Option.none();
            }

            @Override
            public Option<Expr> forFnDecl(FnDecl that) {
                return that.getBody();
            }
        });
    }


    @Override
    public List<Param> parameters() {
        List<Param> ps = NodeUtil.getParams(_ast);
        if (!_selfFromBound) return ps;
        List<Param> out = new java.util.ArrayList<Param>(ps.size());
        for (Param p : ps) {
            Option<TypeOrPattern> t = p.getIdType();
            if (p.getName().equals(NamingCzar.SELF_NAME) && t.isSome() && t.unwrap() instanceof SelfType)
                out.add(new Param(p.getInfo(), p.getName(), p.getMods(),
                                  Option.<TypeOrPattern>some(plain((SelfType) t.unwrap())),
                                  p.getDefaultExpr(), p.getVarargsType()));
            else out.add(p);
        }
        return out;
    }

    /**
     * Returns a list containing first the trait static parameters (if any),
     * followed by the method static parameters.
     */
    @Override
    public List<StaticParam> staticParameters() {
        return NodeUtil.getStaticParams(_ast);
    }

    @Override
    public List<Type> thrownTypes() {
        if (NodeUtil.getThrowsClause(_ast).isNone()) return Collections.emptyList();
        else return Collections.unmodifiableList(NodeUtil.getThrowsClause(_ast).unwrap());
    }

    @Override
    public boolean hasDeclaredReturnType() {
        return NodeUtil.getReturnType(_ast).isSome();
    }

    @Override
    public String toString() {
        String receiver;
        if (selfType().isSome()) {
            receiver = selfType().unwrap().toString();
        } else {
            receiver = declaringTrait().getText();
        }
        return String.format("%s.%s", receiver, super.toString());
    }

    public Option<SelfType> selfType() {
        return _selfType;
    }

    /**
     * Numbering begins at zero.
     */
    public int selfPosition() {
        return _selfPosition;
    }

    @Override    
    public FunctionalMethod instantiateTraitStaticParameters(List<StaticParam> params, List<StaticArg> args) {
        return new FunctionalMethod(this, params, new StaticTypeReplacer(_traitParams, args));
    }

    @Override    
    public FunctionalMethod instantiateTraitStaticParameters(List<StaticParam> params, StaticTypeReplacer str) {
        return new FunctionalMethod(this, params, str);
    }

}
