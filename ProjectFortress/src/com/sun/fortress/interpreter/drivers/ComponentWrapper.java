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

package com.sun.fortress.interpreter.drivers;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sun.fortress.interpreter.env.BetterEnv;
import com.sun.fortress.interpreter.evaluator.BuildEnvironments;
import com.sun.fortress.interpreter.evaluator.BuildNativeEnvironment;
import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.nodes.Api;
import com.sun.fortress.nodes.CompilationUnit;
import com.sun.fortress.nodes.Component;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.interpreter.rewrite.Desugarer;
import com.sun.fortress.interpreter.rewrite.RewriteInAbsenceOfTypeInfo;
import com.sun.fortress.useful.Useful;


public class ComponentWrapper {
    CompilationUnit p;

    HashMap<String, ComponentWrapper> exports = new  HashMap<String, ComponentWrapper>();

    BuildEnvironments be;
    Desugarer dis;
    boolean isNative; 

    int visitState;
    private final static int UNVISITED=0, POPULATED=1, TYPED=2, FUNCTIONED=3, FINISHED=4;

    public ComponentWrapper(CompilationUnit comp, boolean is_native) {
        if (comp == null)
            throw new NullPointerException("Null compilation unit not allowed");
        p = comp;
        BetterEnv e = BetterEnv.empty();
        e.setTopLevel();
        isNative = is_native;
        be = isNative ? new BuildNativeEnvironment(e) : new BuildEnvironments(e);
    }

    /**
     * Simple/stupid wrapper constructor for the non-general 1-1 case.
     * @param comp
     * @param api
     */
    public ComponentWrapper(Component comp, ComponentWrapper api, boolean is_native) {
        this(comp, is_native);
        
        exports.put(NodeUtil.nameString(api.getComponent().getName()), api);
    }

    @Override
    public String toString() {
        return ("Wrapper for "+p.toString()+" exports: "+exports);
    }

    public boolean populated() {
        return visitState > UNVISITED;
    }

    public boolean finished() {
        return visitState == FINISHED;
    }

    public boolean populatedNotFinished() {
        return visitState == POPULATED;
    }

    /**
     * Inject names into all the appropriate environments.
     * 
     * isLibrary exists only to allow more focussed debugging dumps,
     * and is propagated forward to the Desugarer.
     *
     * This populates both the component environment and all the
     * API environments.  The relationship between these two
     * environments is a little delicate and probably is not yet
     * implemented correctly.
     *
     * A separate API environment must be maintained to ensure that
     * imports are filtered through the API, and do not inadvertently
     * pick up names from the implementing component.
     *
     * Currently, the API names are not additionally initialized,
     * though that may need to change.
     *
     */
    public void populateEnvironment(boolean isLibrary) {
        if (visitState != UNVISITED)
            return;

        visitState = POPULATED;

        p = populateOne(p, be, isLibrary);

        for (ComponentWrapper api: exports.values()) {
            api.populateEnvironment(isLibrary);
        }
    }

    /**
     *
     */
    private CompilationUnit populateOne(CompilationUnit cu, BuildEnvironments build_env, boolean isLibrary) {
        dis = new Desugarer(isLibrary);
        cu = (CompilationUnit) RewriteInAbsenceOfTypeInfo.Only.visit(cu);
        cu = (CompilationUnit) dis.visit(cu); // Rewrites p!
                                      // Caches information in dis!
        build_env.visit(cu);

        return cu;
    }

    public void initTypes() {
        if (visitState == POPULATED) {
            visitState = TYPED;

            be.secondPass();

            be.visit(p);

        } else
            throw new IllegalStateException("Must be populated before init types");
    }

    public void initFuncs() {
        if (visitState == TYPED) {
            visitState = FUNCTIONED;

            be.thirdPass();

            be.visit(p);

        } else
            throw new IllegalStateException("Must be typed before init funcs");
    }

    public void initVars() {
        if (visitState == FUNCTIONED) {
            visitState = FINISHED;

            be.fourthPass();
            be.visit(p);

                /*
                 * TODO Need to figure out why this works (or seems to).
                 */
            dis.registerObjectExprs(be.getEnvironment());

        } else if (visitState == UNVISITED)
            throw new IllegalStateException("Must be populated, typed, and functioned before init vars");
    }

    public BetterEnv getEnvironment() {
        return be.getEnvironment();
    }

    public CompilationUnit getComponent() {
       return p;
    }

    /**
     * Returns the component wrapper for the API apiname that this component
     * exports.
     */
    public ComponentWrapper getExportedCW(String apiname) {
        return exports.get(apiname);
    }

}
