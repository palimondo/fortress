package fortress;

import com.sun.fortress.compiler.runtimeValues.FValue;
import com.sun.fortress.compiler.runtimeValues.RTTI;

/**
 * Bootstrap stubs of the one library's traits that the second set's hand-written classes
 * extend, as fortress/CompilerBuiltin.java is for the compiler's prelude.  At a run the
 * classes of FortressLibrary's jar, which comes first on the class path, take their place.
 */
public class FortressLibrary {
    public static interface JavaBufferedReader extends fortress.AnyType.Any {
        public static class RTTIc extends RTTI {
            public RTTIc(Class javaRep) { super(javaRep); }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements JavaBufferedReader {}
    }

    public static interface JavaBufferedWriter extends fortress.AnyType.Any {
        public static class RTTIc extends RTTI {
            public RTTIc(Class javaRep) { super(javaRep); }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements JavaBufferedWriter {}
    }

    public static interface JavaArrayStore extends fortress.AnyType.Any {
        public static class RTTIc extends RTTI {
            public RTTIc(Class javaRep) { super(javaRep); }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements JavaArrayStore {}
    }

    public static interface JavaRR64ArrayStore extends fortress.AnyType.Any {
        public static class RTTIc extends RTTI {
            public RTTIc(Class javaRep) { super(javaRep); }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements JavaRR64ArrayStore {}
    }
}
