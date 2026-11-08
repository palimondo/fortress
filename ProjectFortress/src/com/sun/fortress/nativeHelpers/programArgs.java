package com.sun.fortress.nativeHelpers;

import com.sun.fortress.runtimeSystem.MainWrapper;

/* The program's command-line arguments, which System's args reads: MainWrapper.cachedArgs, which the compiled main and walk's driver each set before the program runs. */
public class programArgs {

    /* The number of arguments. */
    public static int count() {
        String[] args = MainWrapper.cachedArgs;
        return args == null ? 0 : args.length;
    }

    /* The argument at index i, from 0. */
    public static String at(int i) {
        return MainWrapper.cachedArgs[i];
    }

}
