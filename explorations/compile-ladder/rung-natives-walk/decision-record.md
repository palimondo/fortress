<!-- The decision record of the revision of builtinPrimitive's printed comment (Appendix I, "A native binding that names a static helper"): the passage, the original and the new text, the reason, and the way back. -->

# Decision record: builtinPrimitive's comment names a static helper

## 1. The passage

`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`, the comment of `builtinPrimitive[\T\](javaClass:String):T` (`:30`). The specification prints it: `Specification/library/default-libraries.tex:37-39` inputs `library/apis/FortressBuiltin.tex`, which the specification's build typesets from the `.fsi` (`Specification/fortress/build.xml:129-139`, the `fortex` task over `${library.builtin.home}`). The Working Draft of February 2011 holds no copy of the comment: `Specification-1.0-frozen/library/default-libraries.tex:39` inputs the same generated file, which neither tree tracks (`git ls-files Specification-1.0-frozen/library/apis Specification/library/apis` prints nothing). So the original is quoted from the `.fsi` at the base, `3cd653815`, whose lines 14-29 equal those of the team's last commit, `a874948ac` (compared with `cmp`).

## 2. The original

```
(** The %builtinPrimitive% function is actually recognized as a special piece
    of built-in magic by the Fortress interpreter.  The %javaClass%
    argument names a Java Class which is a subclass of
    \texttt{com.sun.fortress.interpreter.glue.NativeApp}, which provides code
    for the closure which is used in place of the call to
    %builtinPrimitive%.  Meanwhile all the necessary type information,
    argument names, etc. must be declared here in Fortress-land.  For
    examples, see the end of this file.

    In practice, if you are extending the interpreter you will probably
    want to extend \texttt{com.sun.fortress.interpreter.glue.NativeFn0,1,2,3,4}
    or one of their subclasses defined in
    \texttt{com.sun.fortress.interpreter.glue.primitive}.  These types are
    generally easier to work with, and the boilerplate packing and
    unpacking of values is done for you.
**)
```

## 3. The new text

The same sixteen lines, so that no later line of the api moves (354 citations of `FortressBuiltin.fsi:<line>` under `explorations/` name lines below it):

- The first sentence: recognized "by the Fortress interpreter and, where its argument names a helper, by the compiler".
- The argument "names either a glue class, a Java Class which is a subclass of `com.sun.fortress.interpreter.glue.NativeApp`, which provides code for the closure ... and which only the interpreter runs, or a helper, a public static method of a Java class of the package `com.sun.fortress.nativeHelpers`, written `com.sun.fortress.nativeHelpers.`*Class*`.`*method*, which both the interpreter and the compiled code call."
- "The interpreter loads a helper beside its glue classes: among the methods of that name it takes the one whose Java parameter and result types carry the declared types, `self` first, and it carries each value at its declared type. The compiler, before type checking, rewrites the body into a call of the helper, which the type checker checks against the helper's Java signature. A string under `com.sun.fortress.nativeHelpers` that names no such method is an error on both."
- The callout `\revision{revival-native-helpers}{...}` after the first paragraph: "The argument names a glue class, which only the interpreter runs, or a static helper of com.sun.fortress.nativeHelpers, which both the interpreter and the compiled code call; and the package that defines the subclasses of the NativeFn classes is named as the implementation names it." The api's typesetting carries it: the built PDF prints the box under the first paragraph, "REVISED BY THE 2026 REVIVAL SEE Section I.1.44" (`pdftotext` of `Specification/fortress/fortress.pdf`).
- The second paragraph: `com.sun.fortress.interpreter.glue.primitive` becomes `com.sun.fortress.interpreter.glue.prim`, the package that holds the subclasses of `NativeFn0` to `NativeFn4` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/`; `interpreter/glue/` has no `primitive/`, and `git log --all -- 'ProjectFortress/src/com/sun/fortress/interpreter/glue/primitive/*'` prints nothing). Otherwise unchanged.

## 4. The reason

The curator's decision of 10 October 2026 (P-58): every native binding of the one library keeps the library's own form, a body that is exactly `builtinPrimitive("…")`, and its string names a static helper of `nativeHelpers/` in place of a glue class, which the compiled path cannot use, since a glue class takes walk's boxed values (`interpreter/glue/prim/Util.java:253-254`, `SS2B.applyToArgs(FValue x, FValue y)`), where the compiled path calls static helpers over plain Java values. Walk loads the helper through a loader beside its glue classes (this rung, `interpreter/glue/StaticNativeApp.java`, hooked in `NativeApp.checkAndLoadNative`), and the compiled path rewrites each such body at the parse into a call (the batch's other half). Twenty-one bindings now name helpers (`Library/FortressLibrary.fss:741-810`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:371`, `:373`), so the comment's "names a Java Class which is a subclass of ... NativeApp" no longer covers every binding. The second paragraph's package name was already false; it is corrected in the same revision because the comment is revised whole and the revision vouches for it.

The sentences of the comment that the batch's tests show:
- walk loads a helper and carries values at the declared types: `ProjectFortress/tests/NativeHelperBindingWalk.fss`, the family `NativeHelperFamilyZZ32Walk.fss`;
- walk takes the overload by the declared types: `NativeHelperBindingWalk.fss`, `bazS` and `bazI` over `simpleOverload.baz`;
- a string under the package that names no such method is refused at load: `NativeHelperMisspeltWalk.fss` with its `.test`; no overload that fits, `NativeHelperMisfitWalk`; a declared type that no Java type carries, `NativeHelperUncarriedWalk`;
- the compiled half's rewrite and refusal: the other half's compiled tests.

## 5. The way back

Restore the sixteen lines of section 2, put the 21 strings back on their glue classes (`Int$Eq` to `ZZ32$ToNN32`, `Int$ToString`), drop the loader's hook, and the compiled path again has no binding of the one library's natives that it can call (row 309). The alternative not taken in P-58, `import java` declarations written in the library, would need the comment to say that the library also binds natives that way, and walk's `import java` path, which five gaps stop (F-180).
