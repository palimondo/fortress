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

package com.sun.fortress.interpreter.evaluator;

import com.sun.fortress.interpreter.env.BetterEnv;
import com.sun.fortress.interpreter.nodes.AbsFnDecl;
import com.sun.fortress.interpreter.nodes.AbsObjectDecl;
import com.sun.fortress.interpreter.nodes.AbsTraitDecl;
import com.sun.fortress.interpreter.nodes.Api;
import com.sun.fortress.interpreter.nodes.Component;
import com.sun.fortress.interpreter.nodes.Dimension;
import com.sun.fortress.interpreter.nodes.FnDecl;
import com.sun.fortress.interpreter.nodes.ImportApi;
import com.sun.fortress.interpreter.nodes.ImportIds;
import com.sun.fortress.interpreter.nodes.ImportNames;
import com.sun.fortress.interpreter.nodes.ImportStar;
import com.sun.fortress.interpreter.nodes.ObjectDecl;
import com.sun.fortress.interpreter.nodes.TraitDecl;
import com.sun.fortress.interpreter.nodes.TypeAlias;
import com.sun.fortress.interpreter.nodes.UnitDim;
import com.sun.fortress.interpreter.nodes.UnitVar;
import com.sun.fortress.interpreter.useful.Voidoid;


/**
 * Like a BuildEnvironments, but all the object/method/trait methods
 * have been stubbed out so it is only good for declaring and
 * evaluating variables.
 */
public class EvalVarsEnvironment extends BuildEnvironments {

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forApi(com.sun.fortress.interpreter.nodes.Api)
     */
    @Override
    public Voidoid forApi(Api x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forComponent(com.sun.fortress.interpreter.nodes.Component)
     */
    @Override
    public Voidoid forComponent(Component x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forDimension(com.sun.fortress.interpreter.nodes.Dimension)
     */
    @Override
    public Voidoid forDimension(Dimension x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forFnDecl(com.sun.fortress.interpreter.nodes.AbsFnDecl)
     */
    @Override
    public Voidoid forAbsFnDecl(AbsFnDecl x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forFnDef(com.sun.fortress.interpreter.nodes.FnDecl)
     */
    @Override
    public Voidoid forFnDecl(FnDecl x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forImportApi(com.sun.fortress.interpreter.nodes.ImportApi)
     */
    @Override
    public Voidoid forImportApi(ImportApi x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forImportIds(com.sun.fortress.interpreter.nodes.ImportIds)
     */
    @Override
    public Voidoid forImportIds(ImportIds x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forImportNames(com.sun.fortress.interpreter.nodes.ImportNames)
     */
    @Override
    public Voidoid forImportNames(ImportNames x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forImportStar(com.sun.fortress.interpreter.nodes.ImportStar)
     */
    @Override
    public Voidoid forImportStar(ImportStar x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forObjectDecl(com.sun.fortress.interpreter.nodes.AbsObjectDecl)
     */
    @Override
    public Voidoid forAbsObjectDecl(AbsObjectDecl x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forObjectDef(com.sun.fortress.interpreter.nodes.ObjectDecl)
     */
    @Override
    public Voidoid forObjectDecl(ObjectDecl x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forTraitDecl(com.sun.fortress.interpreter.nodes.AbsTraitDecl)
     */
    @Override
    public Voidoid forAbsTraitDecl(AbsTraitDecl x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forTraitDef(com.sun.fortress.interpreter.nodes.TraitDecl)
     */
    @Override
    public Voidoid forTraitDecl(TraitDecl x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forTypeAlias(com.sun.fortress.interpreter.nodes.TypeAlias)
     */
    @Override
    public Voidoid forTypeAlias(TypeAlias x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forUnitDim(com.sun.fortress.interpreter.nodes.UnitDim)
     */
    @Override
    public Voidoid forUnitDim(UnitDim x) {
        return null;

    }

    /* (non-Javadoc)
     * @see com.sun.fortress.interpreter.evaluator.BuildEnvironments#forUnitVar(com.sun.fortress.interpreter.nodes.UnitVar)
     */
    @Override
    public Voidoid forUnitVar(UnitVar x) {
        return null;

    }

    public EvalVarsEnvironment(BetterEnv within, BetterEnv bind_into) {
        super(within, bind_into);
        // TODO Auto-generated constructor stub
    }

}
