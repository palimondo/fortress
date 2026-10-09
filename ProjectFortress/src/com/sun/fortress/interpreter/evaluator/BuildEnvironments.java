/*******************************************************************************
    Copyright 2008,2010, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.evaluator;

import com.sun.fortress.compiler.WellKnownNames;
import com.sun.fortress.exceptions.FortressException;
import static com.sun.fortress.exceptions.InterpreterBug.bug;
import static com.sun.fortress.exceptions.ProgramError.error;
import static com.sun.fortress.exceptions.ProgramError.errorMsg;
import com.sun.fortress.interpreter.env.CUWrapper;
import com.sun.fortress.interpreter.env.LazilyEvaluatedCell;
import com.sun.fortress.interpreter.evaluator.types.*;
import com.sun.fortress.interpreter.evaluator.values.*;
import com.sun.fortress.nodes.*;
import com.sun.fortress.nodes_util.ExprFactory;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.useful.HasAt;
import com.sun.fortress.useful.Useful;
import edu.rice.cs.plt.tuple.Option;

import java.util.ArrayList;
import java.util.Collections;
import java.util.IdentityHashMap;
import java.util.List;
import java.util.Map;

/**
 * This comment is not yet true; it is a goal.
 * <p/>
 * BuildEnvironments is a multiple-pass visitor pattern.
 * <p/>
 * The first pass, applied to a node that contains things (for example, a
 * component contains top-level declarations, a trait contains method
 * declarations) it creates entries for those things in the bindInto
 * environment.  In the top-level environment, traits and objects export
 * the names and definitions for the functional methods that they contain.
 * <p/>
 * The bindings created are not complete after the first pass.
 * <p/>
 * The second pass completes the type initialization. For contained things that
 * have internal structure (e.g., a trait within a top level list) this may
 * require a recursive visit, but with a newly allocated environment running its
 * first and second passes. This includes singleton object types.
 * <p/>
 * The third pass initializes functions and methods; these may depend on types.
 * The third pass must extract functional methods from traits and objects.
 * <p/>
 * The fourth pass performs value initialization. These may depend on functions.
 * This includes singleton object values.
 * <p/>
 * The evaluation order is slightly relaxed to make the interpreter tractable;
 * value cells (and variable cells?) are initialized with thunks. (How do we
 * thunk a singleton object?)
 * <p/>
 * It may be necessary to thunk the types as well; this is not yet entirely
 * clear because the type system is so complex. Because types already contain
 * references to their defining environment, this may proceed in an ad-hoc
 * fashion with lazy memoization.
 * <p/>
 * Note that not all passes are required in all contexts; only the top level has
 * the combination of types, functions, variables, and unordered access.
 * Different initializations are assigned to different (numbered) passes so that
 * environment building in some contexts can skip passes (for example, skip the
 * type pass in any non-top-level environment).
 */
public class BuildEnvironments extends NodeAbstractVisitor<Boolean> {


    private int pass = 1;

    public void resetPass() {
        setPass(1);
    }

    public void assertPass(int p) {
        if (getPass() != p) bug("Expected pass " + p + " got pass " + getPass());
    }

    public void secondPass() {
        assertPass(1);
        setPass(2);
        // An environment must be blessed before it can be cloned.
        bindInto.bless();
    }

    public void thirdPass() {
        assertPass(2);
        setPass(3);
    }

    public void fourthPass() {
        assertPass(3);
        setPass(4);
    }

    public void visit(CompilationUnit n) {
        n.accept(this);
    }

    Environment containing;

    Environment bindInto;

    /**
     * Creates an environment builder that will inject bindings into 'within'.
     * The visit is suspended at generics (com.sun.fortress.interpreter.nodes
     * with type parameters) until they can be instantiated.
     */
    public BuildEnvironments(Environment within) {
        this.containing = within;
        this.bindInto = within;
    }

    protected BuildEnvironments(Environment within, Environment bind_into) {
        this.containing = within;
        this.bindInto = bind_into;
    }

    private BuildEnvironments(Environment within, int pass) {
        this.containing = within;
        this.bindInto = within;
        this.setPass(pass);
    }

    public Environment getEnvironment() {
        return containing;
    }

    /*
    static FunctionClosure instantiate(FGenericFunction x) {
        return null;
    }

    static Constructor instantiate(GenericConstructor x) {
        return null;
    }

    static FTypeTrait instantiate(TypeGeneric x) {
        return null;
    }
    */

    protected static void doDefs(BuildEnvironments inner, List<Decl> defs) {
        for (Decl def : defs) {
            try {
                def.accept(inner);
            }
            catch (FortressException x) {
                throw x.setWhere(def);
            }
        }
    }

    protected void doDefs(List<Decl> defs) {
        doDefs(this, defs);
    }

    //    /**
    //     * Put the mappings into "into", but create closures against forTraitMethods.
    //     *
    //     * @param into
    //     * @param forTraitMethods
    //     * @param defs
    //     * @param fields
    //     */
    //    private void doTraitMethodDefs(FTypeTrait ftt, Set<String> fields) {
    //        BetterEnv into = ftt.getMembers();
    //        BetterEnv forTraitMethods = ftt.getMethodExecutionEnv();
    //        List<Decl> defs = ftt.getASTmembers();
    //
    //        BuildTraitEnvironment inner = new BuildTraitEnvironment(into,
    //                forTraitMethods, ftt, fields);
    //
    //        inner.doDefs1234(defs);
    //
    //    }

    //
    public void doDefs1234(List<Decl> defs) {
        doDefs(defs);
        doDefs234(defs);
    }

    public void doDefs234(List<Decl> defs) {
        secondPass();
        doDefs(defs);
        thirdPass();
        doDefs(defs);
        fourthPass();
        doDefs(defs);
    }

    protected void guardedPutValue(Environment e, String name, FValue value, HasAt where) {
        guardedPutValue(e, name, value, null, where);

    }

    /**
     * Put a value, perhaps unconditionally depending on subtype's choice
     *
     * @param e
     * @param name
     * @param value
     * @param ft
     */
    protected void putValue(Environment e, String name, FValue value, FType ft) {
        e.putVariable(name, value, ft);
    }

    /**
     * Put a value, perhaps unconditionally depending on subtype's choice
     */
    protected void putValue(Environment e, String name, FValue value) {
        e.putValue(name, value);
    }

    protected void guardedPutValue(Environment e, String name, FValue value, FType ft, HasAt where) {
        try {
            if (ft != null) {
                if (!ft.typeMatch(value)) {
                    error(where, e, errorMsg("Type mismatch binding ",
                                             value,
                                             " (type ",
                                             value.type(),
                                             ") to ",
                                             name,
                                             " (type ",
                                             ft,
                                             ")"));
                }
                putValue(e, name, value, ft);
            } else {
                putValue(e, name, value);
            }
        }
        catch (FortressException pe) {
            throw pe.setContext(where, e);
        }
    }

    protected void guardedPutType(String name, FType type, HasAt where) {
        EvalType.guardedPutType(name, type, where, containing);
    }

    protected FValue newGenericClosure(Environment e, FnDecl x) {
        return new FGenericFunction(e, x);
    }


    private void forFnDecl1(FnDecl x) {
        List<StaticParam> optStaticParams = NodeUtil.getStaticParams(x);
        String fname = NodeUtil.nameAsMethod(x);
        FValue cl;

        if (!optStaticParams.isEmpty()) {
            cl = newGenericClosure(containing, x);
        } else {
            // NOT GENERIC
            cl = newClosure(containing, x);
        }
        // TODO this isn't right if it was a test function.
        // it belongs in a different namespace if it is.
        bindInto.putValue(fname, cl); // was "shadow"
        //LINKER putOrOverloadOrShadowGeneric(x, containing, name, cl);
    }

    private void forFnDecl2(FnDecl x) {
    }

    // Overridden in BuildTraitEnvironment
    protected void forFnDecl3(FnDecl x) {
        //List<StaticParam> optStaticParams = NodeUtil.getStaticParams(x);
        String fname = NodeUtil.nameAsMethod(x);
        Fcn fcn = (Fcn) containing.getLeafValue(fname);
        fcn.finishInitializing();
    }

    private void forFnDecl4(FnDecl x) {
    }

    /*
    * (non-Javadoc)
    *
    * @see com.sun.fortress.interpreter.nodes.NodeVisitor#forFnDecl(com.sun.fortress.interpreter.nodes.FnDecl)
    */
    @Override
    public Boolean forFnDecl(FnDecl x) {
        if (NodeUtil.getBody(x).isNone()) bug("Function definition should have a body expression.");

        switch (getPass()) {
            case 1:
                forFnDecl1(x);
                break;
            case 2:
                forFnDecl2(x);
                break;
            case 3:
                forFnDecl3(x);
                break;
            case 4:
                forFnDecl4(x);
                break;
        }
        return Boolean.valueOf(false);
    }

    //    public void putOrOverloadOrShadow(HasAt x, BetterEnv e, IdOrOpOrAnonymousName name,
    //            Simple_fcn cl) {
    //        Fcn g = (Fcn) e.getValueNull(name.name());
    //        if (g == null) {
    //            putFunction(e, name, cl, x);
    //
    //            // This is delicate temporary code (below), and breaks the
    //            // property that adding another layer of environment is an OK
    //            // thing to do.
    //        } else if (g.getWithin().equals(e)) {
    //            // OVERLOADING
    //            OverloadedFunction og;
    //            if (g instanceof OverloadedFunction) {
    //                og = (OverloadedFunction) g;
    //                og.addOverload(cl);
    //            } else if (g instanceof GenericMethodSet
    //                    || g instanceof GenericMethod) {
    //                error(x, e,
    //                        "Cannot combine generic method and nongeneric method "
    //                                + name.name() + " in an overloading");
    //            } else if (g instanceof GenericFunctionSet
    //                    || g instanceof FGenericFunction) {
    //                error(x, e,
    //                        "Cannot combine generic function and nongeneric function "
    //                                + name.name() + " in an overloading");
    //            } else {
    //                og = new OverloadedFunction(name, e);
    //                og.addOverload(cl);
    //                og.addOverload((Simple_fcn) g);
    //
    //                assignFunction(e, name, og);
    //            }
    //        } else {
    //            // SHADOWING
    //            putFunction(e, name, cl, x);
    //        }
    //    }

    //    /**
    //     * @param x
    //     * @param e
    //     * @param name
    //     * @param cl
    //     */
    //    private void putOrOverloadOrShadowGeneric(HasAt x, BetterEnv e,
    //            IdOrOpOrAnonymousName name, FValue cl) {
    //        FValue fv = e.getValueNull(name.name());
    //        if (fv != null && !(fv instanceof Fcn)) {
    //            error(x, e, "Generic not generic? " + name.name());
    //        }
    //        Fcn g = (Fcn) fv;
    //        // Actually need to test for diff types of g.
    //        if (g == null) {
    //            putFunction(e, name, cl, x);
    //        } else if (g.getWithin().equals(e)) {
    //            // OVERLOADING
    //            if (cl instanceof GenericMethod) {
    //                GenericMethod clg = (GenericMethod) cl;
    //                GenericMethodSet og;
    //                if (g instanceof GenericMethodSet) {
    //                    og = (GenericMethodSet) g;
    //                    og.addOverload(clg);
    //                } else if (g instanceof GenericMethod) {
    //                    og = new GenericMethodSet(name, e);
    //                    og.addOverload(clg);
    //                    og.addOverload((GenericMethod) g);
    //
    //                    assignFunction(e, name, og);
    //                } else {
    //                    error(x, e, "Overload of generic method "
    //                            + cl + " with non-generic/method " + g);
    //                }
    //            } else if (cl instanceof FGenericFunction) {
    //                FGenericFunction clg = (FGenericFunction) cl;
    //                GenericFunctionSet og;
    //                if (g instanceof GenericFunctionSet) {
    //                    og = (GenericFunctionSet) g;
    //                    og.addOverload(clg);
    //                } else if (g instanceof FGenericFunction) {
    //                    og = new GenericFunctionSet(name, e);
    //                    og.addOverload(clg);
    //                    og.addOverload((FGenericFunction) g);
    //
    //                    assignFunction(e, name, og);
    //                } else {
    //                    error(x, e, "Overload of function method "
    //                            + cl + " with non-generic/method " + g);
    //                }
    //            } else {
    //                error(x, e,
    //                        "Overload of generic, but not a method/function" + cl
    //                                + " with generic/method " + g);
    //
    //            }
    //        } else {
    //            // SHADOWING
    //            putFunction(e, name, cl, x);
    //        }
    //    }

    protected Simple_fcn newClosure(Environment e, Applicable x) {
        return new FunctionClosure(e, x);
    }

    private void putFunction(Environment e, IdOrOpOrAnonymousName name, FValue f, HasAt x) {
        String s = NodeUtil.nameString(name);
        guardedPutValue(e, s, f, x);
        e.noteName(s);
    }

    private static void assignFunction(Environment e, IdOrOpOrAnonymousName name, FValue f) {
        e.putValueRaw(NodeUtil.nameString(name), f);
    }

    /*
     * (non-Javadoc)
     *
     * @see com.sun.fortress.interpreter.nodes.NodeVisitor#forObjectDef(com.sun.fortress.interpreter.nodes.ObjectDecl)
     */
    @Override
    public Boolean forObjectDecl(ObjectDecl x) {
        switch (getPass()) {
            case 1:
                forObjectDecl1(x);
                break;
            case 2:
                forObjectDecl2(x);
                break;
            case 3:
                forObjectDecl3(x);
                break;
            case 4:
                forObjectDecl4(x);
                break;
        }
        return Boolean.valueOf(false);
    }

    protected void forObjectDecl1(ObjectDecl x) {
        // List<Modifier> mods;

        Environment e = containing;
        Id name = NodeUtil.getName(x);

        List<StaticParam> staticParams = NodeUtil.getStaticParams(x);
        Option<List<Param>> params = NodeUtil.getParams(x);

        // List<Type> throws_;
        // Contract contract;
        // List<Decl> defs = NodeUtil.getDecls(x);
        String fname = NodeUtil.nameString(name);
        FTraitOrObjectOrGeneric ft;
        ft = staticParams.isEmpty() ?
             new FTypeObject(fname, e, x, params, NodeUtil.getDecls(x), x) :
             new FTypeGeneric(e, x, NodeUtil.getDecls(x), x);

        // Need to check for overloaded constructor.

        guardedPutType(fname, ft, x);

        if (params.isSome()) {
            if (!staticParams.isEmpty()) {
                // A generic, not yet a constructor
                GenericConstructor gen = new GenericConstructor(e, x, name);
                guardedPutValue(containing, fname, gen, x);
            } else {
                // TODO need to deal with constructor overloading.

                // If parameters are present, it is really a constructor
                // BetterEnv interior = new SpineEnv(e, x);
                Constructor cl = new Constructor(containing, (FTypeObject) ft, x);
                guardedPutValue(containing, fname, cl, x);
                // doDefs(interior, defs);
            }

        } else {
            if (!staticParams.isEmpty()) {
                // A parameterized singleton is a sort of generic value.
                // bug(x,"Generic singleton objects not yet implemented");
                makeGenericSingleton(x, e, name, fname, ft);

            } else {
                // It is a singleton; do not expose the constructor, do
                // visit the interior environment.
                // BetterEnv interior = new SpineEnv(e, x);

                // TODO - binding into "containing", or "bindInto"?

                Constructor cl = new Constructor(containing, (FTypeObject) ft, x);
                guardedPutValue(containing, WellKnownNames.obfuscatedSingletonConstructorName(fname, x), cl, x);

                // Create a little expression to run the constructor.
                Expr init = ExprFactory.makeTightJuxt(NodeUtil.getSpan(x),
                                                      ExprFactory.makeVarRef(NodeUtil.getSpan(x),
                                                                             WellKnownNames.obfuscatedSingletonConstructorName(
                                                                                     fname,
                                                                                     x),
                                                                             0),
                                                      ExprFactory.makeVoidLiteralExpr(NodeUtil.getSpan(x)));
                FValue init_value = new LazilyEvaluatedCell(init, containing);
                putValue(bindInto, fname, init_value);

                // doDefs(interior, defs);
            }
        }

        scanForFunctionalMethodNames(ft, NodeUtil.getDecls(x));

    }

    private void makeGenericSingleton(ObjectDecl x, Environment e, Id name, String fname, FTraitOrObjectOrGeneric ft) {
        GenericConstructor gen = new GenericConstructor(e, x, name);
        guardedPutValue(containing, WellKnownNames.obfuscatedSingletonConstructorName(fname, x), gen, x);
        guardedPutValue(containing, fname, new GenericSingleton(x, ft, gen), x);
    }

    public void scanForFunctionalMethodNames(FTraitOrObjectOrGeneric x, List<Decl> defs) {
        scanForFunctionalMethodNames(x, defs, false);
    }

    public void scanForFunctionalMethodNames(FTraitOrObjectOrGeneric x, List<Decl> defs, boolean bogus) {
        // This is probably going away.
        Environment topLevel = containing;
        if (getPass() == 1) {
            x.initializeFunctionalMethods();
        } else if (getPass() == 3) {
            x.finishFunctionalMethods();
        }

    }


    private void forObjectDecl2(ObjectDecl x) {

        // Environment e = containing;
        Id name = NodeUtil.getName(x);

        List<StaticParam> staticParams = NodeUtil.getStaticParams(x);
        Option<List<Param>> params = NodeUtil.getParams(x);

        String fname = NodeUtil.nameString(name);

        if (params.isSome()) {
            if (!staticParams.isEmpty()) {
                // Do nothing.
            } else {
                FTypeObject fto = (FTypeObject) containing.getRootType(fname); // top level
                containing.getLeafValue(fname); // Must be done!!!
                //Constructor cl = (Constructor) containing.getValue(fname);
                finishObjectTrait(x, fto);
            }
        } else {
            // If there are no parameters, it is a singleton.
            // Not clear we can evaluate it yet.
            if (!staticParams.isEmpty()) {
                // Do nothing.
            } else {
                FTypeObject fto = (FTypeObject) containing.getRootType(fname); // top level

                finishObjectTrait(x, fto);
            }

        }

    }

    private void forObjectDecl3(ObjectDecl x) {
        // Environment e = containing;
        Id name = NodeUtil.getName(x);

        List<StaticParam> staticParams = NodeUtil.getStaticParams(x);
        Option<List<Param>> params = NodeUtil.getParams(x);

        String fname = NodeUtil.nameString(name);
        FTraitOrObjectOrGeneric ft = (FTraitOrObjectOrGeneric) containing.getRootType(fname); // toplevel
        if (!staticParams.isEmpty()) {
            // Do nothing
        } else if (params.isSome()) {
            //FTypeObject fto = (FTypeObject) ft;
            Fcn cl = (Fcn) containing.getLeafValue(fname);
            //                List<Parameter> fparams = EvalType.paramsToParameters(
            //                        containing, params.unwrap());
            //                cl.setParams(fparams);
            cl.finishInitializing();
        } else {
            Constructor cl = (Constructor) containing.getLeafValue(WellKnownNames.obfuscatedSingletonConstructorName(
                    fname,
                    x));
            //  cl.setParams(Collections.<Parameter> emptyList());
            cl.finishInitializing();
        }
        scanForFunctionalMethodNames(ft, NodeUtil.getDecls(x));
    }

    private void forObjectDecl4(ObjectDecl x) {
        //Environment e = containing;
        Id name = NodeUtil.getName(x);
        Option<List<Param>> params = NodeUtil.getParams(x);
        String fname = NodeUtil.nameString(name);

        if (params.isSome()) {

        } else {
            // TODO - Blindly assuming a non-generic singleton.
            // TODO - Need to insert the name much, much, earlier; this is too late.

            bindInto.getLeafValue(fname); // Must be done!!!

            //            Constructor cl = (Constructor) containing
            //                    .getValue(obfuscated(fname));
            //
            //            guardedPutValue(containing, fname, cl.apply(java.util.Collections
            //                    .<FValue> emptyList(), x, e), x);

        }
    }


    private String obfuscatedConstructorName(String fname) {
        // TODO Auto-generated method stub
        return "*1_" + fname;
    }

    /*
     * (non-Javadoc)
     *
     * @see com.sun.fortress.interpreter.nodes.NodeVisitor#forVarDef(com.sun.fortress.interpreter.nodes.VarDecl)
     */
    @Override
    public Boolean forVarDecl(VarDecl x) {
        switch (getPass()) {
            case 1:
                forVarDecl1(x);
                break;
            case 2:
                forVarDecl2(x);
                break;
            case 3:
                forVarDecl3(x);
                break;
            case 4:
                forVarDecl4(x);
                break;
        }
        return Boolean.valueOf(false);
    }

    private void forVarDecl1(VarDecl x) {
        List<LValue> lhs = x.getLhs();

        // List<Modifier> mods;
        // Id name = x.getName();
        // Option<Type> type = x.getType();

        if (x.getInit().isNone()) bug("Variable definition should have an expression.");

        Expr init = x.getInit().unwrap();
        LValue lvb = lhs.get(0);

        //Option<TypeOrPattern> type = lvb.getIdType();
        Id name = lvb.getName();
        String sname = NodeUtil.nameString(name);

        try {
            /* Ignore the type, until later */

            if (lvb.isMutable()) {
                bindInto.putVariablePlaceholder(sname);
            } else {
                TypeOrPattern declared = lvb.getIdType().unwrap(null);
                FValue init_val = declared instanceof Type ?
                                  new LazilyEvaluatedCell(init, containing, (Type) declared) :
                                  new LazilyEvaluatedCell(init, containing);
                putValue(bindInto, sname, init_val);
            }
        }
        catch (FortressException pe) {
            throw pe.setContext(x, bindInto);
        }
    }

    private void forVarDecl2(VarDecl x) {

    }

    private void forVarDecl3(VarDecl x) {
        List<LValue> lhs = x.getLhs();

        Expr init = x.getInit().unwrap();
        LValue lvb = lhs.get(0);

        Option<TypeOrPattern> type = lvb.getIdType();
        Id name = lvb.getName();
        String sname = NodeUtil.nameString(name);

        try {
            if (lvb.isMutable()) {
                /*
                * re-initialize the reference cell of a mutable
                * late in the game (with the now-available type);
                * cannot reallocate, because it may have been exported.
                */
                FType ft = (new EvalType(containing)).evalType(NodeUtil.optTypeOrPatternToType(type).unwrap());
                FValue value = new LazilyEvaluatedCell(init, containing);
                bindInto.assignValue(x, sname, value);
                bindInto.storeType(x, sname, ft);
            }
        }
        catch (FortressException pe) {
            throw pe.setContext(x, bindInto);
        }


    }

    private void forVarDecl4(VarDecl x) {

        List<LValue> lhs = x.getLhs();

        // List<Modifier> mods;
        // Id name = x.getName();
        // Option<Type> type = x.getType();
        if (x.getInit().isNone()) bug("Variable definition should have an expression.");

        Expr init = x.getInit().unwrap();
        // int index = 0;
        LValue lvb = lhs.get(0);


        {
            Option<TypeOrPattern> type = lvb.getIdType();
            Id name = lvb.getName();
            String sname = NodeUtil.nameString(name);

            FType ft = type.isSome() ? (new EvalType(containing)).evalType(NodeUtil.optTypeOrPatternToType(type).unwrap()) : null;

            if (lvb.isMutable()) {
                Expr rhs = init;

                FValue value = (new Evaluator(containing)).eval(rhs);

                // TODO When new environment are created, need to insert
                // into containing AND bindInto

                if (ft != null) {
                    if (!ft.typeMatch(value)) {
                        FValue v = Coercions.coerce(ft, value);
                        if (v != null) value = v;
                        else ft = error(x, bindInto, errorMsg("Type mismatch binding ",
                                                         value,
                                                         " (type ",
                                                         value.type(),
                                                         ") to ",
                                                         name,
                                                         " (type ",
                                                         ft,
                                                         ")"));
                    }
                } else {
                    //ft = FTypeTop.ONLY;
                }
                /* Finally, can finish this initialiation. */
                // bindInto.storeType(x, sname, ft);
                bindInto.assignValue(x, sname, value);
            } else {
                // Force evaluation, snap the link, check the type!
                FValue value = bindInto.getLeafValue(sname);
                if (ft != null) {
                    if (!ft.typeMatch(value)) {
                        error(x, bindInto, errorMsg("Type mismatch binding ",
                                                    value,
                                                    " (type ",
                                                    value.type(),
                                                    ") to ",
                                                    name,
                                                    " (type ",
                                                    ft,
                                                    ")"));
                    }
                }
            }
        }

    }

    /*
     * (non-Javadoc)
     *
     * @see com.sun.fortress.interpreter.nodes.NodeVisitor#forTraitDef(com.sun.fortress.interpreter.nodes.TraitDecl)
     */
    @Override
    public Boolean forTraitDecl(TraitDecl x) {
        switch (getPass()) {
            case 1:
                forTraitDecl1(x);
                break;
            case 2:
                forTraitDecl2(x);
                break;
            case 3:
                forTraitDecl3(x);
                break;
            case 4:
                forTraitDecl4(x);
                break;
        }
        return Boolean.valueOf(false);
    }

    private void forTraitDecl1(TraitDecl x) {
        // TODO Auto-generated method stub
        List<StaticParam> staticParams = NodeUtil.getStaticParams(x);
        // List<Modifier> mods;
        Id name = NodeUtil.getName(x);
        // List<Type> excludes;
        // Option<List<Type>> bounds;
        FTraitOrObjectOrGeneric ft;

        String fname = NodeUtil.nameString(name);

        if (!staticParams.isEmpty()) {

            FTypeGeneric ftg = new FTypeGeneric(containing, x, NodeUtil.getDecls(x), x);
            guardedPutType(fname, ftg, x);
            //scanForFunctionalMethodNames(ftg, NodeUtil.getDecls(x), ftg);
            ft = ftg;
        } else {

            Environment interior = containing; // new BetterEnv(containing, x);
            FTypeTrait ftt = new FTypeTrait(fname, interior, x, NodeUtil.getDecls(x), x);
            guardedPutType(fname, ftt, x);
            //scanForFunctionalMethodNames(ftt, NodeUtil.getDecls(x), ftt);
            ft = ftt;
        }

        scanForFunctionalMethodNames(ft, NodeUtil.getDecls(x));
    }

    private void forTraitDecl2(TraitDecl x) {
        // TODO Auto-generated method stub
        List<StaticParam> staticParams = NodeUtil.getStaticParams(x);
        // List<Modifier> mods;
        // List<Type> excludes;
        // Option<List<Type>> bounds;

        if (staticParams.isEmpty()) {
            Id name = NodeUtil.getName(x);
            FTypeTrait ftt = (FTypeTrait) containing.getRootType(NodeUtil.nameString(name)); // toplevel
            Environment interior = ftt.getWithin();
            finishTrait(x, ftt, interior);
        }
    }

    private void forTraitDecl3(TraitDecl x) {
        Id name = NodeUtil.getName(x);
        String fname = NodeUtil.nameString(name);
        FTraitOrObjectOrGeneric ft = (FTraitOrObjectOrGeneric) containing.getRootType(fname); // toplevel
        scanForFunctionalMethodNames(ft, NodeUtil.getDecls(x));
    }

    private void forTraitDecl4(TraitDecl x) {
    }

    /**
     * @param x
     * @param ftt
     * @param interior
     */
    public void finishTrait(TraitDecl x, FTypeTrait ftt, Environment interior) {
        List<BaseType> extends_ = NodeUtil.getTypes(NodeUtil.getExtendsClause(x));
        // TODO What if I don't
        // interior = interior.extendAt(x);

        EvalType et;
        if (NodeUtil.getWhereClause(x).isSome()) et = processWhereClauses(NodeUtil.getWhereClause(x).unwrap(),
                                                                          interior);
        else et = new EvalType(interior);

        List<FType> extl = et.getFTypeListFromList(extends_);
        List<FType> excl = et.getFTypeListFromList(NodeUtil.getExcludesClause(x));
        ftt.setExtendsAndExcludes(extl, excl, interior);
        Option<List<NamedType>> comprs = NodeUtil.getComprisesClause(x);
        if (!comprs.isNone()) {
            List<FType> c = et.getFTypeListFromList(comprs.unwrap());
            ftt.setComprises(Useful.<FType>set(c));
        }
        //List<Decl> fns = NodeUtil.getDecls(x);

        // doTraitMethodDefs(ftt, null); /* NOTICE THE DIFFERENT ENVIRONMENT! */

    }


    /**
     * Processes a where clause,
     * both using and augmenting the environment
     * "interior" passed in as a parameter.
     *
     * @param wheres
     * @param interior
     * @return
     */
    private static EvalType processWhereClauses(WhereClause wheres, Environment interior) {

        if (wheres != null) {
            for (WhereConstraint w : wheres.getConstraints()) {
                if (w instanceof WhereExtends) {
                    WhereExtends we = (WhereExtends) w;
                    Id name = we.getName();
                    String string_name = NodeUtil.nameString(name);
                    // List<Type> types = we.getSupers();
                    FType ft = interior.getLeafTypeNull(string_name); // leaf
                    if (ft == null) {
                        ft = new SymbolicWhereType(string_name, interior, we);
                        interior.putType(string_name, ft);
                    }
                } else {
                    bug(w, errorMsg("Where clause ", w));
                }
            }
        }

        EvalType et = new EvalType(interior);

        if (wheres != null) {
            for (WhereConstraint w : wheres.getConstraints()) {
                if (w instanceof WhereExtends) {
                    WhereExtends we = (WhereExtends) w;
                    Id name = we.getName();
                    String string_name = NodeUtil.nameString(name);
                    List<BaseType> types = we.getSupers();
                    FType ft = interior.getLeafTypeNull(string_name); // leaf
                    for (Type t : types) {
                        FType st = et.evalType(t); // t.visit(et);
                        if (ft instanceof SymbolicType) {
                            // Treat as "extends".
                            ((SymbolicType) ft).addExtend(st);
                        } else if (st instanceof SymbolicWhereType) {
                            // Record subtype ft of st.
                            SymbolicWhereType swt = (SymbolicWhereType) st;
                            swt.addSubtype(ft);
                        } else {
                            ft.mustExtend(st, w);
                            // Check that constraint holds.
                            // NI.nyi("need to verify constraint stated in where clause");
                        }
                    }
                } else {
                    bug(w, errorMsg("Where clause ", w));
                }
            }
        }
        return et;
    }

    public void finishObjectTrait(ObjectDecl x, FTypeObject ftt) {
        List<BaseType> extends_ = NodeUtil.getTypes(NodeUtil.getExtendsClause(x));
        finishObjectTrait(extends_, null, NodeUtil.getWhereClause(x), ftt, containing, x);
    }

    public void finishObjectTrait(_RewriteObjectExpr x, FTypeObject ftt) {
        List<BaseType> extends_ = NodeUtil.getTypes(NodeUtil.getExtendsClause(x));
        // _RewriteObjectExpr has no excludes clause.
        finishObjectTrait(extends_, null, null, ftt, containing, x);
    }

    static public void finishObjectTrait(List<BaseType> extends_,
                                         List<? extends Type> excludes,
                                         Option<WhereClause> wheres,
                                         FTypeObject ftt,
                                         Environment interior,
                                         HasAt x) {
        interior = interior.extendAt(x);
        EvalType et;
        if (wheres != null && wheres.isSome()) et = processWhereClauses(wheres.unwrap(), interior);
        else et = new EvalType(interior);
        ftt.setExtendsAndExcludes(et.getFTypeListFromList(extends_), et.getFTypeListFromList(excludes), interior);
        if (x instanceof _RewriteObjectExpr && NodeUtil.getStaticParams((_RewriteObjectExpr) x).isEmpty()) {
            // An object expression without static parameters provides its functional
            // methods as a declared object does (checkFunctionalMethodMeets).
            new OverloadedFunction.FunctionalMethodMeets().check(ftt, x);
        }
    }

    @Override
    public Boolean forTypeAlias(TypeAlias x) {
        // Id name;
        // List<Id> params;
        // Type type;
        // TODO Auto-generated method stub
        return Boolean.valueOf(false);
    }

    @Override
    public Boolean forDimUnitDecl(DimUnitDecl x) {
        // TODO Auto-generated method stub
        return Boolean.valueOf(false);
    }

    @Override
    public Boolean forDimArg(DimArg x) {
        // TODO Auto-generated method stub
        return Boolean.valueOf(false);
    }

    @Override
    public Boolean forImportApi(ImportApi x) {
        // TODO Auto-generated method stub
        return Boolean.valueOf(false);
    }

    @Override
    public Boolean forImportNames(ImportNames x) {
        // TODO Auto-generated method stub
        return Boolean.valueOf(false);
    }

    @Override
    public Boolean forImportStar(ImportStar x) {
        // TODO Auto-generated method stub
        return Boolean.valueOf(false);
    }

    public Environment getBindingEnv() {
        return bindInto;
    }

    @Override
    public Boolean forGrammarDecl(GrammarDecl that) {
        return Boolean.valueOf(false); // Do nothing
    }

    public void setPass(int pass) {
        this.pass = pass;
    }

    public int getPass() {
        return pass;
    }

    /**
     * Refuses a program whose types break a comprises clause of its main
     * component.  A trait or object of the program that explicitly extends a
     * trait with a comprises clause declared in main must be a subtype of a
     * type the clause lists, or a trait with a comprises clause of its own each
     * of whose listed types meets this requirement, or a trait with static
     * parameters that at least one trait or object of the program extends,
     * each of them a subtype of a listed type.  Types are read from the
     * declarations as written, each name resolved in its declaration's
     * environment and each static parameter replaced by the static argument
     * given it.  Then refuses a program one of whose traits or objects
     * without static parameters breaks the Meet Rule for Functional Methods
     * (OverloadedFunction.FunctionalMethodMeets).
     */
    public static void checkComprisesClauses(List<? extends CUWrapper> units, CUWrapper main) {
        int m = units.indexOf(main);
        if (m < 0) return;
        ComprisesCheck check = new ComprisesCheck(units);
        check.check(m);
        check.checkFunctionalMethodMeets();
    }

    private static final class ComprisesCheck {

        /** A trait or object declaration of the program, in unit unit. */
        private static final class Declared {
            final TraitObjectDecl decl;
            final FType type;
            final Environment env;
            final int unit;
            final List<String> params = new ArrayList<String>();

            Declared(TraitObjectDecl decl, FType type, Environment env, int unit) {
                this.decl = decl;
                this.type = type;
                this.env = env;
                this.unit = unit;
                for (StaticParam sp : NodeUtil.getStaticParams(decl)) params.add(NodeUtil.getName(sp));
            }

            String name() {
                return NodeUtil.getName(decl).getText();
            }
        }

        /**
         * A type or static argument as a declaration writes it: a declared
         * type with its static arguments, a static parameter of the
         * declaration being read (by position), or other text with its parts.
         */
        private static final class Term {
            final FType head;
            final int param;
            final String text;
            final List<Term> args;

            Term(FType head, int param, String text, List<Term> args) {
                this.head = head;
                this.param = param;
                this.text = text;
                this.args = args;
            }

            /** This term with each static parameter replaced by actuals' term at its position. */
            Term with(List<Term> actuals) {
                if (param >= 0) return actuals.get(param);
                if (args.isEmpty()) return this;
                List<Term> as = new ArrayList<Term>(args.size());
                for (Term a : args) as.add(a.with(actuals));
                return new Term(head, -1, text, as);
            }

            @Override
            public boolean equals(Object o) {
                if (!(o instanceof Term)) return false;
                Term t = (Term) o;
                return head == t.head && param == t.param && (text == null ? t.text == null : text.equals(t.text)) &&
                       args.equals(t.args);
            }

            @Override
            public int hashCode() {
                return System.identityHashCode(head) + 31 * param + (text == null ? 0 : text.hashCode()) +
                       args.hashCode();
            }
        }

        /** A declaration's extends entry, over that declaration's static parameters. */
        private static final class Extension {
            final Declared by;
            final Term entry;

            Extension(Declared by, Term entry) {
                this.by = by;
                this.entry = entry;
            }
        }

        private final List<Declared> declarations = new ArrayList<Declared>();
        private final Map<FType, Declared> declared = new IdentityHashMap<FType, Declared>();
        private final Map<Declared, List<Term>> supertypes = new IdentityHashMap<Declared, List<Term>>();
        private final Map<FType, List<Extension>> extenders = new IdentityHashMap<FType, List<Extension>>();

        ComprisesCheck(List<? extends CUWrapper> units) {
            int unit = 0;
            for (CUWrapper cw : units) {
                CompilationUnit cu = cw.getCompilationUnit();
                Environment env = cw.getEnvironment();
                if (cu instanceof Component) {
                    for (Decl d : ((Component) cu).getDecls()) {
                        if (!(d instanceof TraitDecl || d instanceof ObjectDecl)) continue;
                        TraitObjectDecl tod = (TraitObjectDecl) d;
                        FType t = env.getRootTypeNull(NodeUtil.getName(tod).getText());
                        if (t == null || declared.containsKey(t)) continue;
                        Declared x = new Declared(tod, t, env, unit);
                        declarations.add(x);
                        declared.put(t, x);
                    }
                }
                unit++;
            }
            for (Declared x : declarations) {
                for (Term e : supertypesOf(x)) {
                    if (e.head == null) continue;
                    List<Extension> l = extenders.get(e.head);
                    if (l == null) {
                        l = new ArrayList<Extension>();
                        extenders.put(e.head, l);
                    }
                    l.add(new Extension(x, e));
                }
            }
        }

        /** Checks every explicit extension of a trait with a comprises clause declared in unit main. */
        void check(int main) {
            for (Declared x : declarations) {
                for (Term e : supertypesOf(x)) {
                    Declared h = e.head == null ? null : declared.get(e.head);
                    if (h == null || h.unit != main) continue;
                    List<Term> listed = listedBy(h, e.args);
                    if (listed == null) continue;
                    String why = ineligible(x, listed);
                    if (why != null) error(x.decl, errorMsg("Invalid comprises clause: ",
                                                            h.name(),
                                                            " has a comprises clause but its immediate subtype ",
                                                            x.name(),
                                                            " is not eligible to extend it",
                                                            why));
                }
            }
        }

        /**
         * Checks the Meet Rule for Functional Methods for every trait or object
         * without static parameters; an object expression without static
         * parameters is checked where its type is finished (finishObjectTrait).
         */
        void checkFunctionalMethodMeets() {
            OverloadedFunction.FunctionalMethodMeets meets = new OverloadedFunction.FunctionalMethodMeets();
            for (Declared x : declarations) {
                if (x.type instanceof FTraitOrObject && !(x.type instanceof GenericTypeInstance) && x.params.isEmpty()) {
                    meets.check((FTraitOrObject) x.type, x.decl);
                }
            }
        }

        /**
         * Null when x may extend a trait whose clause lists listed (over x's
         * static parameters); otherwise the reason it may not, to follow the
         * message, or the empty string.
         */
        private String ineligible(Declared x, List<Term> listed) {
            Term self = self(x);
            if (below(self, listed)) return null;
            if (closedAndCovered(self, listed, new ArrayList<Declared>())) return null;
            if (!x.params.isEmpty() && x.decl instanceof TraitDecl) {
                List<Extension> exts = extenders.get(x.type);
                if (exts == null) return "; no trait or object extends it";
                for (Extension ext : exts) {
                    if (ext.entry.args.size() != x.params.size()) continue;
                    List<Term> forExt = new ArrayList<Term>(listed.size());
                    for (Term l : listed) forExt.add(l.with(ext.entry.args));
                    if (!below(self(ext.by), forExt)) return errorMsg("; ",
                                                                      ext.by.name(),
                                                                      " extends it and is a subtype of none of the types the clause lists");
                }
                return null;
            }
            return "";
        }

        /**
         * t is a trait with a comprises clause of its own, each of whose
         * listed types is a subtype of one of listed or is such a trait.
         */
        private boolean closedAndCovered(Term t, List<Term> listed, List<Declared> seen) {
            Declared d = t.head == null ? null : declared.get(t.head);
            if (d == null || seen.contains(d)) return false;
            List<Term> own = listedBy(d, t.args);
            if (own == null) return false;
            seen.add(d);
            for (Term l : own) {
                if (!below(l, listed) && !closedAndCovered(l, listed, seen)) return false;
            }
            seen.remove(d);
            return true;
        }

        /** The types h's comprises clause lists, its static parameters given actuals; null if it has none. */
        private List<Term> listedBy(Declared h, List<Term> actuals) {
            if (!(h.decl instanceof TraitDecl) || actuals.size() != h.params.size()) return null;
            TraitDecl td = (TraitDecl) h.decl;
            Option<List<NamedType>> comprs = td.getComprisesClause();
            if (comprs.isNone() || comprs.unwrap().isEmpty() || td.isComprisesEllipses()) return null;
            List<Term> res = new ArrayList<Term>();
            for (NamedType n : comprs.unwrap()) res.add(termOf(n, h).with(actuals));
            return res;
        }

        private boolean below(Term t, List<Term> listed) {
            for (Term l : listed) {
                if (subtype(t, l, 0)) return true;
            }
            return false;
        }

        /** a is b, or extends b through the declarations' extends clauses. */
        private boolean subtype(Term a, Term b, int depth) {
            if (a.equals(b)) return true;
            if (depth > 64 || a.head == null) return false;
            Declared d = declared.get(a.head);
            if (d == null || a.args.size() != d.params.size()) return false;
            for (Term s : supertypesOf(d)) {
                if (subtype(s.with(a.args), b, depth + 1)) return true;
            }
            return false;
        }

        private Term self(Declared x) {
            List<Term> as = new ArrayList<Term>(x.params.size());
            for (int i = 0; i < x.params.size(); i++) as.add(new Term(null, i, null, Collections.<Term>emptyList()));
            return new Term(x.type, -1, null, as);
        }

        private List<Term> supertypesOf(Declared x) {
            List<Term> res = supertypes.get(x);
            if (res == null) {
                res = new ArrayList<Term>();
                for (BaseType b : NodeUtil.getTypes(NodeUtil.getExtendsClause(x.decl))) res.add(termOf(b, x));
                supertypes.put(x, res);
            }
            return res;
        }

        /** n as declaration x writes it, x's static parameters by position. */
        private Term termOf(Node n, Declared x) {
            List<Term> none = Collections.<Term>emptyList();
            if (n instanceof TypeArg) return termOf(((TypeArg) n).getTypeArg(), x);
            if (n instanceof IntArg) {
                IntExpr ie = ((IntArg) n).getIntVal();
                if (ie instanceof IntRef) return named(((IntRef) ie).getName(), x);
                if (ie instanceof IntBase) return new Term(null, -1, "nat " + ((IntBase) ie).getIntVal().getIntVal(), none);
            }
            if (n instanceof BoolArg) {
                BoolExpr be = ((BoolArg) n).getBoolArg();
                if (be instanceof BoolRef) return named(((BoolRef) be).getName(), x);
                if (be instanceof BoolBase) return new Term(null, -1, "bool " + ((BoolBase) be).isBoolVal(), none);
            }
            if (n instanceof VarType) {
                VarType v = (VarType) n;
                if (x.params.contains(NodeUtil.nameString(v.getName()))) return named(v.getName(), x);
                FType h;
                try {
                    h = x.env.getTypeNull(v);
                }
                catch (RuntimeException ex) {
                    h = null;
                }
                if (h != null) return new Term(h, -1, null, none);
                return named(v.getName(), x);
            }
            if (n instanceof AnyType) return new Term(FTypeTop.ONLY, -1, null, none);
            if (n instanceof TraitType) {
                TraitType tt = (TraitType) n;
                FType h;
                try {
                    h = x.env.getType(tt);
                }
                catch (RuntimeException ex) {
                    h = null;
                }
                if (h != null) {
                    List<Term> as = new ArrayList<Term>(tt.getArgs().size());
                    for (StaticArg a : tt.getArgs()) as.add(termOf(a, x));
                    return new Term(h, -1, null, as);
                }
            }
            if (n instanceof TupleType && ((TupleType) n).getVarargs().isNone() &&
                ((TupleType) n).getKeywords().isEmpty()) {
                List<Term> as = new ArrayList<Term>();
                for (Type t : ((TupleType) n).getElements()) as.add(termOf(t, x));
                return new Term(null, -1, "( )", as);
            }
            if (n instanceof ArrowType) {
                List<Term> as = new ArrayList<Term>(2);
                as.add(termOf(((ArrowType) n).getDomain(), x));
                as.add(termOf(((ArrowType) n).getRange(), x));
                return new Term(null, -1, "->", as);
            }
            return new Term(null, -1, "@" + System.identityHashCode(n), none);
        }

        private Term named(Id name, Declared x) {
            String s = NodeUtil.nameString(name);
            int i = x.params.indexOf(s);
            if (i >= 0) return new Term(null, i, null, Collections.<Term>emptyList());
            return new Term(null, -1, "var " + s, Collections.<Term>emptyList());
        }
    }

}
