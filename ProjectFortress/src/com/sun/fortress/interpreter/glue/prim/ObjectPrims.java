/*******************************************************************************
 Copyright 2008,2009, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.glue.prim;

import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.interpreter.evaluator.types.FTraitOrObjectOrGeneric;
import com.sun.fortress.interpreter.evaluator.types.FType;
import com.sun.fortress.interpreter.evaluator.types.FTypeArrow;
import com.sun.fortress.interpreter.evaluator.types.FTypeObject;
import com.sun.fortress.interpreter.evaluator.types.FTypeTuple;
import com.sun.fortress.interpreter.evaluator.types.GenericTypeInstance;
import com.sun.fortress.interpreter.evaluator.values.FObject;
import com.sun.fortress.interpreter.evaluator.values.FString;
import com.sun.fortress.interpreter.glue.NativeMeth0;
import com.sun.fortress.nodes.Component;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.useful.HasAt;

/**
 * Functions from String.
 */
public class ObjectPrims {

    protected static abstract class O2S extends NativeMeth0 {
        protected abstract java.lang.String f(FObject o);

        public final FString applyMethod(FObject self) {
            return FString.make(f(self));
        }
    }

    public static final class ToString extends O2S {
        protected final java.lang.String f(FObject o) {
            return (o.toString());
        }
    }

    public static final class ClassName extends O2S {
        protected final java.lang.String f(FObject o) {
            return ilk(o.type());
        }
    }

    /** The component that declares the native number objects. */
    static final java.lang.String NUMBERS_COMPONENT = "FortressBuiltin";

    /**
     * The trait that a native number object of the library stands for, or null: Int, Long, BigNum,
     * Float and UnsignedLong of FortressBuiltin, told by the component that declares them, so that a
     * program's own type of one of these names keeps its name.
     */
    static java.lang.String traitOf(FType t) {
        if (!(t instanceof FTypeObject) || t instanceof GenericTypeInstance) return null;
        java.lang.String n = t.getName();
        java.lang.String trait =
            "Int".equals(n) ? "ZZ32" : "Long".equals(n) ? "ZZ64" : "BigNum".equals(n) ? "ZZ"
            : "Float".equals(n) ? "RR64" : "UnsignedLong".equals(n) ? "NN64" : null;
        if (trait == null) return null;
        Environment e = ((FTraitOrObjectOrGeneric) t).getWithin();
        if (e == null) return null;
        try {
            HasAt at = (e.isTopLevel() ? e : e.getTopLevel()).getAt();
            return at instanceof Component
                && NUMBERS_COMPONENT.equals(NodeUtil.nameString(((Component) at).getName())) ? trait : null;
        } catch (RuntimeException x) {    // an environment with no top level
            return null;
        }
    }

    /**
     * The type's text, as FType.toString gives it, with each native number object of the library
     * named by its trait, at the top level and inside static arguments, tuples and arrows.
     */
    static java.lang.String ilk(FType t) {
        java.lang.String trait = traitOf(t);
        if (trait != null) return trait;
        if (t instanceof GenericTypeInstance)
            return t.getName() + "[\\" + ilks(((GenericTypeInstance) t).getTypeParamsForName()) + "\\]";
        if (t instanceof FTypeTuple) return "(" + ilks(((FTypeTuple) t).getTypes()) + ")";
        if (t instanceof FTypeArrow) {
            FTypeArrow a = (FTypeArrow) t;
            return ilk(a.getDomain()) + "->" + ilk(a.getRange());
        }
        return t.toString();
    }

    private static java.lang.String ilks(java.util.List<FType> l) {
        StringBuilder b = new StringBuilder();
        boolean first = true;
        for (FType t : l) {
            if (first) first = false;
            else b.append(",");
            b.append(ilk(t));
        }
        return b.toString();
    }

}
