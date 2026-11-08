package com.sun.fortress.interpreter.glue.prim;

import static com.sun.fortress.exceptions.ProgramError.error;
import static com.sun.fortress.exceptions.ProgramError.errorMsg;
import com.sun.fortress.interpreter.evaluator.transactions.AtomicArray;
import com.sun.fortress.interpreter.evaluator.values.FBool;
import com.sun.fortress.interpreter.evaluator.values.FFloat;
import com.sun.fortress.interpreter.evaluator.values.FObject;
import com.sun.fortress.interpreter.evaluator.values.FValue;
import com.sun.fortress.interpreter.evaluator.values.FVoid;
import com.sun.fortress.interpreter.glue.NativeFn1;
import com.sun.fortress.interpreter.glue.NativeMeth1;
import com.sun.fortress.interpreter.glue.NativeMeth2;

/**
 * Walk's own operations for the helpers of nativeHelpers.arrayOps, which FortressLibrary's array stores
 * bind: the loader answers the helper com.sun.fortress.nativeHelpers.arrayOps.NAME with the class NAME
 * here (interpreter/glue/NativeApp.java), so walk's arrays keep walk's stores.  get, put and init are the
 * operations of PrimitiveArray's glue over its AtomicArray, and getRR64 and initRR64 those of
 * PrimImmutableRR64Array's glue over its double[], each over the value of FortressBuiltin's
 * JavaArrayStoreObject or JavaRR64ArrayStoreObject.
 */
public class ArrayOps {

    public static final class make extends NativeFn1 {
        protected FValue applyToArgs(FValue size) {
            return JavaArrayStoreObject.make(size.getInt());
        }
    }

    public static final class get extends NativeMeth1 {
        public FValue applyMethod(FObject self, FValue ii) {
            AtomicArray v = (AtomicArray) self;
            int i = ii.getInt();
            FValue r = (FValue) v.get(i);
            if (r == null) {
                error(errorMsg("Access to uninitialized element ", i, " of array ", v));
            }
            return r;
        }
    }

    public static final class put extends NativeMeth2 {
        public FValue applyMethod(FObject self, FValue ii, FValue x) {
            ((AtomicArray) self).set(ii.getInt(), x);
            return FVoid.V;
        }
    }

    public static final class init extends NativeMeth2 {
        public FValue applyMethod(FObject self, FValue ii, FValue x) {
            return FBool.make(((AtomicArray) self).init(ii.getInt(), x));
        }
    }

    public static final class makeRR64 extends NativeFn1 {
        protected FValue applyToArgs(FValue size) {
            return JavaRR64ArrayStoreObject.make(size.getInt());
        }
    }

    public static final class getRR64 extends NativeMeth1 {
        public FValue applyMethod(FObject self, FValue ii) {
            return FFloat.make(((JavaRR64ArrayStoreObject.Value) self).contents[ii.getInt()]);
        }
    }

    public static final class initRR64 extends NativeMeth2 {
        public FValue applyMethod(FObject self, FValue ii, FValue x) {
            ((JavaRR64ArrayStoreObject.Value) self).contents[ii.getInt()] = x.getFloat();
            return FBool.make(true);
        }
    }
}
