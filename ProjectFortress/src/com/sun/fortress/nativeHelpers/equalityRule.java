package com.sun.fortress.nativeHelpers;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

import com.sun.fortress.compiler.runtimeValues.FBoolean;
import com.sun.fortress.compiler.runtimeValues.FCharacter;
import com.sun.fortress.compiler.runtimeValues.FFloatLiteral;
import com.sun.fortress.compiler.runtimeValues.FIntLiteral;
import com.sun.fortress.compiler.runtimeValues.FJavaString;
import com.sun.fortress.compiler.runtimeValues.FNN32;
import com.sun.fortress.compiler.runtimeValues.FNN64;
import com.sun.fortress.compiler.runtimeValues.FRR32;
import com.sun.fortress.compiler.runtimeValues.FRR64;
import com.sun.fortress.compiler.runtimeValues.FZZ;
import com.sun.fortress.compiler.runtimeValues.FZZ32;
import com.sun.fortress.compiler.runtimeValues.FZZ64;
import com.sun.fortress.compiler.runtimeValues.ValueObjectMark;

/**
 * The rule of strict equivalence over the compiled run time's values, for
 * equality.sEquiv.  It is a class of its own because its Java types have no
 * Fortress counterpart, and the wrapper generator reads every method of a
 * helper class that a binding names.
 */
final class equalityRule {

    private static final String CONCRETE_TUPLE_CLASS = "AnyConcreteTuple";

    private equalityRule() {}

    static boolean sEquiv(Object a, Object b) {
        if (a == b) return true;
        if (a == null || b == null) return false;
        Class<?> ca = a.getClass();
        Class<?> cb = b.getClass();
        if (isTuple(ca) && isTuple(cb)) return tuples(a, b);
        if (ca != cb) return false;
        if (a instanceof FZZ32) return ((FZZ32) a).getValue() == ((FZZ32) b).getValue();
        if (a instanceof FZZ64) return ((FZZ64) a).getValue() == ((FZZ64) b).getValue();
        if (a instanceof FZZ) return ((FZZ) a).getValue().equals(((FZZ) b).getValue());
        if (a instanceof FNN32) return ((FNN32) a).getValue() == ((FNN32) b).getValue();
        if (a instanceof FNN64) return ((FNN64) a).getValue() == ((FNN64) b).getValue();
        if (a instanceof FBoolean) return ((FBoolean) a).getValue() == ((FBoolean) b).getValue();
        if (a instanceof FCharacter) return ((FCharacter) a).getValue() == ((FCharacter) b).getValue();
        if (a instanceof FIntLiteral) {
            FIntLiteral x = (FIntLiteral) a;
            FIntLiteral y = (FIntLiteral) b;
            return x.smallerVal == y.smallerVal
                && (x.largerVal == null ? y.largerVal == null : x.largerVal.equals(y.largerVal));
        }
        if (a instanceof FRR64)
            return Double.doubleToRawLongBits(((FRR64) a).getValue())
                == Double.doubleToRawLongBits(((FRR64) b).getValue());
        if (a instanceof FRR32)
            return Float.floatToRawIntBits(((FRR32) a).getValue())
                == Float.floatToRawIntBits(((FRR32) b).getValue());
        if (a instanceof FFloatLiteral)
            return Double.doubleToRawLongBits(((FFloatLiteral) a).asRR64().getValue())
                == Double.doubleToRawLongBits(((FFloatLiteral) b).asRR64().getValue());
        if (a instanceof ValueObjectMark) return fields(ca, a, b);
        // A string is a reference object, one with the Java string it carries:
        // two string literals of one text carry one interned Java string.
        if (a instanceof FJavaString) return ((FJavaString) a).getValue() == ((FJavaString) b).getValue();
        // Every other value is a reference object.
        return false;
    }

    private static boolean isTuple(Class<?> c) {
        for (Class<?> s = c.getSuperclass(); s != null; s = s.getSuperclass()) {
            if (s.getName().startsWith(CONCRETE_TUPLE_CLASS)) return true;
        }
        return false;
    }

    private static boolean tuples(Object a, Object b) {
        try {
            Method sizeA = a.getClass().getMethod("size");
            Method sizeB = b.getClass().getMethod("size");
            int n = (Integer) sizeA.invoke(a);
            if (n != (Integer) sizeB.invoke(b)) return false;
            Method getA = a.getClass().getMethod("get", int.class);
            Method getB = b.getClass().getMethod("get", int.class);
            for (int i = 0; i < n; i++) {
                if (!sEquiv(getA.invoke(a, i), getB.invoke(b, i))) return false;
            }
            return true;
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException("SEQV cannot read the elements of a tuple", e);
        }
    }

    private static boolean fields(Class<?> c, Object a, Object b) {
        try {
            for (Field f : c.getDeclaredFields()) {
                if (Modifier.isStatic(f.getModifiers())) continue;
                f.setAccessible(true);
                Object x = f.get(a);
                Object y = f.get(b);
                if (x instanceof fortress.AnyType.Any || y instanceof fortress.AnyType.Any) {
                    if (!sEquiv(x, y)) return false;
                } else if (x == null ? y != null : !x.equals(y)) {
                    return false;
                }
            }
            return true;
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException("SEQV cannot read the fields of a value object", e);
        }
    }
}
