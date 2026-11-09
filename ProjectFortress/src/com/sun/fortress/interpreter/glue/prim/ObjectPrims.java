/*******************************************************************************
 Copyright 2008,2009, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.interpreter.glue.prim;

import com.sun.fortress.interpreter.evaluator.types.FTraitOrObject;
import com.sun.fortress.interpreter.evaluator.types.FType;
import com.sun.fortress.interpreter.evaluator.types.FTypeArrow;
import com.sun.fortress.interpreter.evaluator.types.FTypeTuple;
import com.sun.fortress.interpreter.evaluator.types.GenericTypeInstance;
import com.sun.fortress.interpreter.evaluator.types.LanguageTypes;
import com.sun.fortress.interpreter.evaluator.values.FObject;
import com.sun.fortress.interpreter.evaluator.values.FString;
import com.sun.fortress.interpreter.glue.NativeMeth0;

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

    /**
     * The type's text, with each native number object of the library named by its trait, at the top
     * level and inside static arguments, tuples and arrows, and every other trait or object, the
     * library's string objects among them, by its own name.
     */
    static java.lang.String ilk(FType t) {
        java.lang.String trait = LanguageTypes.numberTraitName(t);
        if (trait != null) return trait;
        if (t instanceof GenericTypeInstance)
            return t.getName() + "[\\" + ilks(((GenericTypeInstance) t).getTypeParamsForName()) + "\\]";
        if (t instanceof FTypeTuple) return "(" + ilks(((FTypeTuple) t).getTypes()) + ")";
        if (t instanceof FTypeArrow) {
            FTypeArrow a = (FTypeArrow) t;
            return ilk(a.getDomain()) + "->" + ilk(a.getRange());
        }
        if (t instanceof FTraitOrObject) return t.getName();
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
