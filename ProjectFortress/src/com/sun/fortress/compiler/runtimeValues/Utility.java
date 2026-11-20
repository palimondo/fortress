/*******************************************************************************
 Copyright 2011 Oracle and/or its affiliates.
 All rights reserved.


 Use is subject to license terms.

 This distribution may include materials developed by third parties.

 ******************************************************************************/

package com.sun.fortress.compiler.runtimeValues;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

import com.sun.fortress.compiler.runtimeValues.FException;
import com.sun.fortress.compiler.runtimeValues.FString;
import com.sun.fortress.compiler.runtimeValues.FValue;
import com.sun.fortress.compiler.runtimeValues.FortressImplementationError;

public final class Utility {

    public static FException makeFortressException(String name, Throwable e) {
	return makeFortressException(name, e.getMessage());
    }

    /**
     * The class of the exception object that a helper raises, named by its simple name, as
     * "IntegerOverflow", in the library that the run time's classes serve (LibraryNames), or
     * by its whole class name.  A class that is not found raises FortressImplementationError
     * with the class name as its message, which walk reads (StaticNativeApp.raised).
     */
    private static Class<?> exceptionClass(String name) throws ClassNotFoundException {
        return Class.forName(name.indexOf('.') >= 0 ? name : LibraryNames.exceptionClass(name));
    }

    /**
     * The exception object name with the message msg: by its constructor over the library's
     * String, or, for an object without one, as the one library's IOFailure, by its
     * constructor without parameters.
     */
    public static FException makeFortressException(String name, String msg) {
	try {
	    Class<?> c = exceptionClass(name);
	    Constructor fortressIOException;
	    try {
		fortressIOException = c.getConstructor(new Class[]{ Class.forName(LibraryNames.stringClass(), false, c.getClassLoader()) });
	    } catch (NoSuchMethodException x) {
		return new FException((FValue) c.getConstructor().newInstance());
	    }
	    return new FException((FValue)fortressIOException.newInstance(FJavaString.make(msg == null ? "" : msg)));
	} catch (ClassNotFoundException x) {
	    throw new FortressImplementationError(x);
	} catch (NoSuchMethodException x) {
	    throw new FortressImplementationError(x);
	} catch (InstantiationException x) {
	    throw new FortressImplementationError(x);
	} catch (IllegalAccessException x) {
	    throw new FortressImplementationError(x);
	} catch (InvocationTargetException x) {
	    throw new FortressImplementationError(x);
	}
    }

    public static FException makeFortressException(String name) {
	try {
	    Constructor fortressIOException = exceptionClass(name).getConstructor();
	    return new FException((FValue)fortressIOException.newInstance());
	} catch (ClassNotFoundException x) {
	    throw new FortressImplementationError(x);
	} catch (NoSuchMethodException x) {
	    throw new FortressImplementationError(x);
	} catch (InstantiationException x) {
	    throw new FortressImplementationError(x);
	} catch (IllegalAccessException x) {
	    throw new FortressImplementationError(x);
	} catch (InvocationTargetException x) {
	    throw new FortressImplementationError(x);
	}
    }

    // public static FException makeFortressException(String name) {
    // 	try {
    // 	    System.out.println("Class: " + Class.forName(name));
    // 	    System.out.println("Constructors: " + Class.forName(name).getConstructors());
    // 	    Constructor fortressIOException = Class.forName(name).getConstructor(new Class[]{ String.class });
    // 	    System.out.println("Check");
    // 	    return new FException((FValue)fortressIOException.newInstance(FString.make("")));
    // 	} catch (ClassNotFoundException x) {
    // 	    throw new FortressImplementationError(x);
    // 	} catch (NoSuchMethodException x) {
    // 	    throw new FortressImplementationError(x);
    // 	} catch (InstantiationException x) {
    // 	    throw new FortressImplementationError(x);
    // 	} catch (IllegalAccessException x) {
    // 	    throw new FortressImplementationError(x);
    // 	} catch (InvocationTargetException x) {
    // 	    throw new FortressImplementationError(x);
    // 	}
    // }

}
