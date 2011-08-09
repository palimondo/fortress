package com.sun.fortress.compiler.runtimeValues;

import com.sun.fortress.runtimeSystem.Naming;

public class VoidRTTI extends RTTI {
	
	public static final RTTI ONLY = new VoidRTTI(VoidRTTI.class);
	
	public VoidRTTI(Class javaRep) {
		super(javaRep);
	}
	
	public boolean argExtendsThis(RTTI other) {
        if (other instanceof VoidRTTI) return true;
		return false;
    }
	
	public String className() {
	    return Naming.SNOWMAN;
	}

}
