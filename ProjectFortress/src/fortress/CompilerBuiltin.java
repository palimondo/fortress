/*******************************************************************************
 Copyright 2009,2010, Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package fortress;

import com.sun.fortress.compiler.runtimeValues.FValue;
import com.sun.fortress.compiler.runtimeValues.RTTI;

public class CompilerBuiltin {
    public static interface Number extends fortress.CompilerBuiltin.Object {
        public static class RTTIc extends RTTI{
            public RTTIc(Class javaRep) {
                super(javaRep);
            }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements Number {}
    }

    public static interface Boolean extends fortress.CompilerBuiltin.Object {
        public static class RTTIc extends RTTI{
            public RTTIc(Class javaRep) {
                super(javaRep);
            }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements Boolean {}
    }

    public static interface String extends fortress.CompilerBuiltin.Object {
        public static class RTTIc extends RTTI{
            public RTTIc(Class javaRep) {
                super(javaRep);
            }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements String {}
    }

    public static interface JavaString extends fortress.CompilerBuiltin.String {
        public static class RTTIc extends RTTI{
            public RTTIc(Class javaRep) {
                super(javaRep);
            }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements JavaString {}
    }

    public static interface Character extends fortress.CompilerBuiltin.Object {
        public static class RTTIc extends RTTI{
            public RTTIc(Class javaRep) {
                super(javaRep);
            }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements Character {}
    }

    public static interface JavaBufferedReader extends fortress.CompilerBuiltin.Object {
        public static class RTTIc extends RTTI{
            public RTTIc(Class javaRep) {
                super(javaRep);
            }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements JavaBufferedReader {}
    }

    public static interface JavaBufferedWriter extends fortress.CompilerBuiltin.Object {
        public static class RTTIc extends RTTI{
            public RTTIc(Class javaRep) {
                super(javaRep);
            }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements JavaBufferedWriter {}
    }

    public static interface ZZ32Vector extends fortress.CompilerBuiltin.Object {
        public static class RTTIc extends RTTI{
            public RTTIc(Class javaRep) {
                super(javaRep);
            }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements ZZ32Vector {}
    }

    public static interface StringVector extends fortress.CompilerBuiltin.Object {
        public static class RTTIc extends RTTI{
            public RTTIc(Class javaRep) {
                super(javaRep);
            }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements StringVector {}
    }
  
    public static interface Object extends fortress.AnyType.Any {
        public static class RTTIc extends RTTI{
            public RTTIc(Class javaRep) {
                super(javaRep);
            }
            public static RTTI ONLY;
        }
        public static abstract class DefaultTraitMethods extends FValue implements Object {}
    }
}
