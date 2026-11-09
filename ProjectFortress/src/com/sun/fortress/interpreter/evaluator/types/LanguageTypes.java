package com.sun.fortress.interpreter.evaluator.types;

import com.sun.fortress.interpreter.evaluator.Environment;
import com.sun.fortress.nodes.Component;
import com.sun.fortress.nodes_util.NodeUtil;
import com.sun.fortress.useful.HasAt;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The language's types that nine objects of the library stand for: the native number objects Int,
 * Long, BigNum, Float and UnsignedLong of FortressBuiltin, values of ZZ32, ZZ64, ZZ, RR64 and NN64,
 * which comprise them, and the string objects FlatString of FlatString and CatString, EmptyString
 * and SubString of String, values of String.  Each object is told by the component that declares
 * it, so that a program's own type of one of these names keeps its name.  Walk reads a value's type
 * through traitOf where it infers a static argument, and prints each of the nine by its trait.
 */
public final class LanguageTypes {

    private LanguageTypes() {
    }

    /** The component that declares the native number objects. */
    static final String NUMBERS_COMPONENT = "FortressBuiltin";

    /** Each object's name, with the trait it stands for and the component that declares it. */
    private static final Map<String, String[]> OBJECTS = new HashMap<String, String[]>();

    static {
        OBJECTS.put("Int", new String[]{"ZZ32", NUMBERS_COMPONENT});
        OBJECTS.put("Long", new String[]{"ZZ64", NUMBERS_COMPONENT});
        OBJECTS.put("BigNum", new String[]{"ZZ", NUMBERS_COMPONENT});
        OBJECTS.put("Float", new String[]{"RR64", NUMBERS_COMPONENT});
        OBJECTS.put("UnsignedLong", new String[]{"NN64", NUMBERS_COMPONENT});
        OBJECTS.put("FlatString", new String[]{"String", "FlatString"});
        OBJECTS.put("CatString", new String[]{"String", "String"});
        OBJECTS.put("EmptyString", new String[]{"String", "String"});
        OBJECTS.put("SubString", new String[]{"String", "String"});
    }

    /** The name of the trait that t, one of the nine objects, stands for; or null. */
    public static String traitName(FType t) {
        if (!(t instanceof FTypeObject) || t instanceof GenericTypeInstance) return null;
        String[] entry = OBJECTS.get(t.getName());
        if (entry == null) return null;
        return entry[1].equals(declaringComponent(t)) ? entry[0] : null;
    }

    /** The name of the number trait that t, one of the five number objects, stands for; or null. */
    public static String numberTraitName(FType t) {
        String trait = traitName(t);
        return trait != null && NUMBERS_COMPONENT.equals(OBJECTS.get(t.getName())[1]) ? trait : null;
    }

    /**
     * The type at which walk reads a value of the type t: the trait that t stands for, where t is one
     * of the nine objects; a tuple type with each element type read so; else t itself.
     */
    public static FType traitOf(FType t) {
        if (t instanceof FTypeTuple) {
            List<FType> elements = ((FTypeTuple) t).getTypes();
            List<FType> read = new ArrayList<FType>(elements.size());
            boolean changed = false;
            for (FType e : elements) {
                FType r = traitOf(e);
                changed |= r != e;
                read.add(r);
            }
            return changed ? FTypeTuple.make(read) : t;
        }
        String trait = traitName(t);
        if (trait == null) return t;
        for (FType s : t.getTransitiveExtends()) {
            if (s instanceof FTypeTrait && trait.equals(s.getName())) return s;
        }
        return t;
    }

    /**
     * The name of the component that declares the trait or object t, read from the top level of the
     * environment in which t was built, whose location is that component's node; or null.
     */
    static String declaringComponent(FType t) {
        if (!(t instanceof FTraitOrObjectOrGeneric)) return null;
        Environment e = ((FTraitOrObjectOrGeneric) t).getWithin();
        if (e == null) return null;
        try {
            HasAt at = (e.isTopLevel() ? e : e.getTopLevel()).getAt();
            return at instanceof Component ? NodeUtil.nameString(((Component) at).getName()) : null;
        } catch (RuntimeException x) {    // an environment with no top level
            return null;
        }
    }
}
