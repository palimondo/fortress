<!-- Climb batch 31b, rung O (rung-number-objects): the one library's ZZ32, ZZ64, ZZ, NN64 and RR64 each merged with its one native object (Int, Long, BigNum, UnsignedLong, Float) into one value object under the type's own name, and walk's five native number objects removed (P-178; rows 1003, 1000, 551, 550); the change, its tests, the stages, what a program sees differently, and the record it hands over. -->

# Rung O: the five number types as value objects in the one library and walk

- problem: on the base the one library declares each of the five as a trait that comprises one native object (`Library/FortressLibrary.fss:384-387` at 647163a9c4, row 1003), and a program's object below `ZZ32` loads and prints `Mine` (`ProjectFortress/tests/NumberTypeExtendRefusedWalk.fss:5`, row 551)
- spec: `Specification/basic/objects.tex:166-168` ("Object declarations extend a set of traits"), with P-178 for the library's form
- precedent: `value object NN32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:262` at 3fd0924cb0) and `value object RR32` (`:65`), the probe's patch `explorations/compile-ladder/plan-31/probes/number-object-merge.patch:1`
- deviation: the five stay in `FortressLibrary`, not beside `NN32` in the native component `FortressBuiltin` (fork O1), so walk names them in a table (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:459`)
- deviation: the api drops `abstract` from the five objects' `asFloat` (`Library/FortressLibrary.fsi:321`, `:522`, `:589`, `:661`, `:727`), as `NN32`'s api writes it (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:132`); the probe kept it
- deviation: the specification presents `ZZ` as a trait (`Specification/basic-lib/basic-integers.tex:229`), as it presents `Boolean` (`Specification/basic-lib/booleans.tex:80`), which the library declares as a value object; left as it is
- historical: `Library/FortressLibrary.fss`, `Library/FortressLibrary.fsi`, `Library/ReflectiveQuickCheck.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java`, `.../evaluator/BuildNativeEnvironment.java`, `.../interpreter/glue/prim/Int.java`, `Long.java`, `Float.java`, `BigNum.java`, `UnsignedLong.java`, `ZZ32.java`, `NN32.java`, `IntLiteral.java`, `ObjectPrims.java`, `ProjectFortress/tests/NumberPrintTest.fss`, `Specification/appendices/changes.tex` (all at a874948ac:path)

Two launches: no. This launch seeded the worktree (the seeding script exited 0) and made every commit on the branch: 4af62e89ea (tests), 046c410c43 (the change), 3fd0924cb0 (Appendix I), and the commit of this report.

## What changed and why

P-178 asks that each built-in number type be one `value object` under its own name, as `NN32` and `RR32` already are, and that walk's native objects `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` go. The one library had the pattern `trait ZZ32 ... excludes {...} comprises { Int }` with `value object Int extends ZZ32` in `FortressBuiltin`; a program could not name the object as a type to good effect, but it could extend the trait (row 551), and the trait's 56 bodies through `asFloat(self)` ran only under `asif RR64`.

### The library's text, by file (`git diff --numstat -M 647163a9c4 HEAD`)

| File | Added | Deleted | What |
|---|---|---|---|
| `Library/FortressLibrary.fss` | 164 | 80 | five `trait X ... excludes ... comprises { O }` become `value object X ...`; each takes its object's members |
| `Library/FortressLibrary.fsi` | 11 | 21 | the five headers; `abstract` off the five `asFloat` |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` | 1 | 186 | the five objects deleted; `RR32`'s `opr ^(self, b:Float)` names `RR64` (`:191`) |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` | 1 | 15 | the five objects' declarations deleted; `RR32`'s `^` at `RR64` (`:107`) |
| `Library/ReflectiveQuickCheck.fss` | 4 | 4 | the comment of `adaptType`: its example `Float` below `RR64` becomes `FlatString` below `String` |

The members each type took from its object (the merge was made by a script that matched members by name and parameter types, the object's `Float` read as `RR64`):

- `ZZ32` (`Library/FortressLibrary.fss:846`) from `Int`: the getters `asString` and `asExprString` (`simpleIntArith.intToString`), placed after `one`, since an object's getters stand before its methods; the body of `asFloat` (`intToDouble`) in place of the trait's abstract declaration.
- `ZZ64` (`:951`) from `Long`: `asString`, `asExprString` (`longToString`), `asFloat` (`longToDouble`).
- `ZZ` (`:1170`) from `BigNum`: `asString`, `asExprString` (`simpleArbitraryPrecisionArith.toString`), `asFloat` (`toDouble`).
- `NN64` (`:1063`) from `UnsignedLong`: the getters `zero` and `one`, which the trait lacked, and `asString`, `asExprString` (`unsignedLongToString`), before the trait's first getter; `asFloat` (`unsignedLongToDouble`).
- `RR64` (`:384`) from `Float`, 61 bindings: the getters `asString` and `asExprString` (new, after `one`); the bodies of the getters `isNaN`, `isInfinite`, `rawBits`, `signBit`, `nextUp`, `nextDown`; `asFloat(self) = self`; `narrow`, `|self|`, `=`, `<`, `<=`, `>`, `>=`, `MIN`, `MAX`, `MINMAX`, prefix and infix `-`, `+`, `DOT`, `TIMES`, juxtaposition, `/`, `SQRT`, the ten directed operators without NaN and the eight `IEEE_` ones, `^` at `RR64` and at `AnyIntegral`, `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`, `log`, `exp`, `floor`, `|\self/|`, `ceiling`, `|/self\|`, `truncate` and `round(self): ZZ64`, each in the trait's place; and two the trait lacked, `=/=` after `=`, `^` at `RR32` and at `ZZ32` after `^` at `RR64`. `Float`'s `opr ^(self, b:Float)`, which bound the same helper `doublePow` as its `^` at `RR64`, gives one `^` at `RR64`.

The bodies of the five traits that went, by kind:

- In `RR64`, 56 bodies through `asFloat(self)` (`opr +(self,b:RR64):RR64 = asFloat(self) + asFloat(b)` and its like, `round(self): ZZ = round(asFloat(self))` among them): each called the object's own body on `asFloat(self)`, which is `self`, so the object's own body is the one that runs (fork O7).
- In `RR64`, three bodies the object overrode: `isNaN` and `isInfinite` (`false`) and `signBit` (the same text as the object's).
- In each of the five, the abstract `asFloat(self): RR64`, which the object's body defines.
- Kept in `RR64`, the trait's 15 members at which the object had no body: the four `coerce`, `zero`, `one`, `isNumber`, `isFinite`, `check`, `check_star`, `=` at `ZZ32` and at `RR32`, `CMP`, `MINNUM`, `MAXNUM`. The other four traits keep every member.
- `round` (fork O3): one declaration, `round(self):ZZ64` (`:548`), over `simpleDoubleArith.doubleRound`, the body that ran on the base; the trait's `round(self): ZZ` went with the bodies through `asFloat(self)`.

The excludes clauses go because an object excludes each type that it does not extend; `AnyIntegral comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }` now lists five objects. The library's bindings: 401, of which 372 by a grep of `builtinPrimitive("com.sun.fortress.nativeHelpers.` (373 with `FlatString`'s binding whose string is on its next line), one fewer of each than the base, the duplicate `^`.

### Walk's Java, by file

| File | Added | Deleted | What |
|---|---|---|---|
| `interpreter/evaluator/BuildEnvironments.java` | 29 | 1 | `NATIVE_NUMBER_OBJECTS` (`:459`), the five names; `isNativeNumberObject` (`:465`), true for those names in the component `FortressLibrary` (`WellKnownNames.fortressLibrary()`); `forObjectDecl1` builds such a singleton's constructor from the class `com.sun.fortress.interpreter.glue.prim.<name>` (`:526-529`) and applies it once when made (`:533`), so that its values' class knows its constructor before a top-level variable of the component makes a value |
| `interpreter/evaluator/BuildNativeEnvironment.java` | 8 | 1 | `nativeConstructorOfClass`, split from `nativeConstructor`, takes the class name |
| `interpreter/glue/prim/ZZ32.java` (was `Int.java`) | 86 lines | | constructor, `makeNativeObject`, `unregister`, and the helpers other glue classes call: `overflow`, `divisionByZero`, `powCount`, `shiftCount` |
| `interpreter/glue/prim/ZZ64.java` (was `Long.java`) | 40 lines | | constructor, `makeNativeObject`, `unregister` |
| `interpreter/glue/prim/RR64.java` (was `Float.java`) | 40 lines | | the same |
| `interpreter/glue/prim/ZZ.java` (was `BigNum.java`) | 63 lines | | the same and `pow`, which `IntLiteral.java` calls |
| `interpreter/glue/prim/NN64.java` (was `UnsignedLong.java`) | 125 lines | | the same and `gcd`, `choose`, `multiplyExact`, `powExact`, `negativePow`, which `NN32.java` calls |
| the five old classes | | 2,041 | `Int.java` 460, `Long.java` 397, `Float.java` 448, `BigNum.java` 347, `UnsignedLong.java` 389: their nested native classes (no `builtinPrimitive` string of the library names a number glue class: a grep of `glue\.prim\.` in `Library/` and `LibraryBuiltin/` finds `Reflect*` and `StringPrim` only), their private bases, and the helpers only those called |
| the team's `interpreter/glue/prim/ZZ32.java` | | 238 | a constructor class of the name `ZZ32` that no object used, replaced by the renamed `Int.java` (git pairs the two) |
| `interpreter/evaluator/types/LanguageTypes.java` | 7 | 22 | the five number entries of `OBJECTS`, `NUMBERS_COMPONENT` and `numberTraitName` go; the class keeps the four string objects |
| `interpreter/glue/prim/ObjectPrims.java` | 2 | 6 | `ilk` loses its call of `numberTraitName` and the import |
| `interpreter/glue/StaticNativeApp.java` | 3 | 7 | `"Float"` in `javaFor`; the four lines for `Int`, `Long`, `UnsignedLong`, `Float`, `BigNum` in `javaForSelf`; the comments |
| `interpreter/glue/prim/NN32.java`, `IntLiteral.java` | 14 | 14 | `Int.`, `UnsignedLong.` and `BigNum.` become `ZZ32.`, `NN64.` and `ZZ.` at their calls of the kept helpers (files beyond those named) |
| `compiler/BuiltinPrimitiveRewriter.java` | 1 | 2 | the `UnsignedLong` clause of `transfer` (`:189`) |

### Tests

- `ProjectFortress/tests/NumberTypesAreObjectsWalk.fss` (new, a guard): `asif` at each of the five is the value itself, `(3.0 asif RR64) + 17` is `20.0`, a `typecase` arm at each name takes its values and no other number type's (NN32, RR32, QQ included), and the ilk of each is its name.
- `ProjectFortress/tests/NumberTypeExtendRefusedWalk.fss` and `.test` (new): `object Mine extends ZZ32` with its own `asFloat` is refused at load, `load_exception_contains=Attempt to extend object type ZZ32`.
- `ProjectFortress/tests/GenericBesidePlainReturnParam.fss`: row 550's `XXXGenericBesidePlainReturnParam` promoted (renamed, its component line and comment).
- `tests/NativeHelperFloatCarriedWalk.fss:5-6`: the two bindings declared `Float` name `RR64`; its comment and one message.
- `tests/NumberPrintTest.fss:31`, `:35` (the team's): `BigNum => println "BigNum"` became `ZZ => println "ZZ"`, and `UnsignedLong => println "UnsignedLong"` became `NN64 => println "NN64"`; the test asserts nothing there, and its output is the same, `ZZ64` twice.
- Comments and assertion messages that named the objects, no checked value changed: walk tests `FloatNextUpSignedZeroWalk`, `NativeHelperFamilyFloatBitsWalk`, `NativeHelperFamilyFloatWalk`, `NativeHelperFamilySmallWalk`, `NativeHelperFamilyUnsignedWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperFloatMixedWalk`, `NumberOrderListDeclarations` (`"a BigNum is a ZZ"` became `"big(5) is a ZZ"`), `OverloadZZ32BesideUserTraitWalk`, `RoundHalfEvenRungR` (`"RR64 Float round(...)"` became `"RR64 round(...)"`); compiled tests `NativeHelperFamilyFloatBitsCompiled`, `NativeHelperFamilyFloatCompiled`, `NativeHelperFamilySmallCompiled`, `NativeHelperFamilyUnsignedCompiled`, `XXXOverloadZZ32BesideUserTrait`.
- `compiler_tests/XXXNativeHelperOwnUnsignedLongCompiled.test:3`, a pinned message changed: `compile_err_contains=NN64->ZZ64 is not applicable to an argument of type UnsignedLong` became `compile_err_contains=ZZ64->ZZ64 is not applicable to an argument of type UnsignedLong`, with its comment; the program, its own `trait UnsignedLong`, is left. The brief asked to leave this test; its step 4 removes the rewriter's `UnsignedLong` clause, and with the clause gone a program's own `UnsignedLong` takes no NN64 transfer, so the refusal names the helper's own type (row 886's `UnsignedLong` half).
- Left: `tests/simpleExp.fss:15`, the team's comment "that Int and Long exponentiation work", and `tests/BigNum.fss`, the team's test of that component name and its message "BigNum + doesn't work"; `CompilerLibrary/FortressLibrary.fsi`, the stubs off the source path; `ProjectFortress/not_working_static_tests/BuiltinTest.fss`, which nothing runs and which binds `Int$Eq` and the like.

## The failing run and the passing run

The failing run, on the base's code (the worktree at 4af62e89ea, tests only, before the first build of the edit at 07:07):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-number-objects/h-base ProjectFortress/tests/NumberTypesAreObjectsWalk.fss ProjectFortress/tests/NumberTypeExtendRefusedWalk.fss ProjectFortress/tests/NumberTypeExtendRefusedWalk.test ProjectFortress/tests/GenericBesidePlainReturnParam.fss
    # harness-one 2026-11-17T07:01:57Z; tree 647163a9c4; nproc=4; load 1.19 0.71 0.67; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache filled
    Overloading of pickFirst(a:FortressLibrary.ZZ64,b:FortressLibrary.ZZ64):FortressLibrary.ZZ64 (ZZ64,ZZ64)->ZZ64 ... fails the Return Type Rule: ...
    Mine
     Missing expected refusal at load
    Tests run: 3,  Failures: 2,  Errors: 0

The guard `NumberTypesAreObjectsWalk` was `OK` in that run. A first run at 07:01:24Z stopped at a syntax error of the guard's one-line `typecase`, which was rewritten before this run.

The passing run, after the last change of code (046c410c43; the later commits change only prose):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-number-objects/h-final ProjectFortress/tests/NumberTypesAreObjectsWalk.fss ProjectFortress/tests/NumberTypeExtendRefusedWalk.fss ProjectFortress/tests/NumberTypeExtendRefusedWalk.test ProjectFortress/tests/GenericBesidePlainReturnParam.fss ProjectFortress/tests/asifTest.fss ProjectFortress/tests/NumberPrintTest.fss ProjectFortress/tests/NativeHelperFloatCarriedWalk.fss
    # harness-one 2026-11-17T07:36:10Z; tree 046c410c43; ... cache empty
     OK Saw expected refusal at load
    OK (6 tests)

`asifTest` prints `PASS, got RR64 20.0` after the change, as before. The changed compiled test, on the base's code and after:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base36 $PWD/tmp/rung-number-objects/old-caches junit $PWD/ProjectFortress/compiler_tests/XXXNativeHelperOwnUnsignedLongCompiled.test
        - NN64->ZZ64 is not applicable to an argument of type UnsignedLong.
     Saw failure, but did not satisfy compile_err_contains; expected
    Tests run: 1,  Failures: 1,  Errors: 0
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh c2 ProjectFortress/compiler_tests XXXNativeHelperOwnUnsignedLongCompiled.test
     Saw expected failure
    OK (1 test)

### Whole suites, once on 046c410c43

`ant testSystem` (walk's Java changed): `BUILD SUCCESSFUL`, `Total time: 5 minutes 48 seconds`; shards 213, 222, 221, 213, 0 failures: 869 tests, the gate's 867 (`explorations/compile-ladder/climb-batch-31/gate/summary.txt`) and the two new files.

`ant testQuick` (the rewriter is the compiled path's parse, `tests-running.md`'s "the parser"): `BUILD SUCCESSFUL`, `Total time: 9 minutes 52 seconds`; `fast-compiler` 1667, `fast-library` 86, `fast-othercompiler` 263, 0 failures, the gate's counts. The library track is the library tests of `ant testFast`.

## The two stages, on 046c410c43

Both ran once, on the final code; nothing but prose changed after their start.

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-number-objects/checker-count-postedit.txt tmp/rung-number-objects/cc-post
    #total	0
    #locations	0
    #crash	none
    diff explorations/compile-ladder/climb-batch-31/gate/checker-count.txt tmp/rung-number-objects/checker-count-postedit.txt    (no output: identical)

    explorations/coordinator/tools/distance/run.sh tmp/rung-number-objects/distance-postedit.txt tmp/rung-number-objects/dist-post
    #total	0
    #crash	none
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-31/gate/distance.txt tmp/rung-number-objects/distance-postedit.txt
    DISTANCE SAME   0

No site moved: `dist-post/errors.tsv` holds its header only, as `explorations/compile-ladder/gate/distance-sites.tsv` does. The count stage now checks the bindings that were `Float`'s and the other four objects', since they are in the `FortressLibrary` component. The change touches no Scala under `scala_src/` and no code the build generates for the checker, so "The checker's time" does not apply.

## The ladder subset

Ten files, after the edit only (`tmp/rung-number-objects/ladder/`, the drivers copied as `gate.md` says): the edited `NumberPrintTest.fss`; the five whose first error in `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` names `builtinPrimitive`, the rewriter's subject (`XXXarityTestFn`, `XXXfailTestFn`, `XXXnoclassNativeFn`, `nativeTestFn`, `testPrim`); and the four new or changed tests. The newest landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-31/gate/ladder/ladder.tsv`) holds none of them, so the comparand is the baseline's: the six that it holds keep their phase and first error (`disambiguate`, 'Variable big is not defined.' for `NumberPrintTest`; `disambiguate`, 'Variable builtinPrimitive is not defined.' for the five). Of the new: `NumberTypeExtendRefusedWalk.fss` compiles against the prelude and dies at link, 'class NumberTypeExtendRefusedWalk$Mine can not implement com.sun.fortress.compiler.runtimeValues.FZZ32, because it is not an interface' (row 866, the prelude's open `ZZ32`).

## Where the fix belongs, and the precedent

`explorations/coordinator/map/modules-and-phases.md`, B.13: walk reads `AnyType`, `FortressLibrary` and `FortressBuiltin`; a native component's objects get their constructor classes in `BuildNativeEnvironment` (`interpreter/env/CUWrapper.java:122` chooses it by the component). The library's own way for a number type is `value object NN32` and `value object RR32` in `FortressBuiltin`; of the eight number types, those two were objects, `QQ` is a trait with an open clause, and the five were traits each comprising one object. After the change seven of the eight are objects. The ways the language and the library offer, and the choice (fork O1): the five as objects in `FortressLibrary`, with walk told their names (chosen, as the probe built it); the five moved into `FortressBuiltin` with six private functions and their api (not taken: about 620 lines of objects and 50 of helpers move); the old objects kept under new names as subclasses (the probe's four classes; not taken, fork O6).

## What the specification settles

`Specification/basic/objects.tex:166-168`: an object declaration extends traits, so no declaration extends an object, which is why walk's desugarer refuses `object Mine extends ZZ32` once `ZZ32` is an object ('Attempt to extend object type ZZ32, saw ...', `ProjectFortress/src/com/sun/fortress/interpreter/rewrite/DesugarerVisitor.java:1436`). P-160 gives a program's own number type below `Number`. The library chapter prints the api (`Specification/library/default-libraries.tex:27`), so it follows the five headers.

## Programs run old against new

Each on the old code with `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base36 $PWD/tmp/rung-number-objects/old-caches P.fss` and on the edit with `bin/fortress P.fss`, from `tmp/rung-number-objects/progs/`.

- A plain declaration with no written return type beside a generic one over `ZZ64` (`pick[\T extends Number\](a: T): ZZ32 = 1`, `pick(a: ZZ64) = 2`): old, refused at load, 'Overloading of pick(a:FortressLibrary.ZZ64) ZZ64->BOTTOM ... fails the Return Type Rule', rc=1 (row 785); new, `pick(ZZ64) 2`, `pick(ZZ32) 1`, rc=0 (row 1044's reading, now over the five).
- What a value shows: the arms `ZZ32 ZZ64 ZZ NN64 RR64` of a `typecase` over the eight number types, the ilks `ZZ32 ZZ64 ZZ NN64 RR64`, `Cell[\ZZ32\] Cell[\RR64\] Cell[\ZZ64\] Cell[\NN64\]`, `ArrayList[\ZZ32\]`, `asString` and `asExprString`, `asif 18.5 20.0`, `round 2 ZZ64 ZZ64`, `zero one 0 1 NN64`, `isNaN`, `rawBits`, `signBit`, `=/=`, `^` at `RR64`, `ZZ64` and `RR32`, and `SUM 5050`: line for line the same on both (`diff` printed nothing).
- A `typecase` with arms `Int`, `Float` and `else`, on `3`, `1.5` and `"s"`: old `3 Int; 1.5 Float; s else`; new `3 Int; 1.5 Int; s Int` (row 959: the names declare no type now).
- `f(x: Float): RR64 = x`: old prints `1.5`; new is refused, 'Float is undefined.', rc=255.
- `x + "s"` for `x: RR64`: 'Failed to find any matching overload' lists 34 lines of overloads on the old code and 33 on the new: the old list holds two `(RR64,RR64)->RR64`, the object's native one and the trait's `+(self:(FortressLibrary.RR64 & {FortressBuiltin.Float}),b:FortressLibrary.RR64)`, the one place where a message showed `Float`; the new holds one, at `Library/FortressLibrary.fss:455`. Positions of the five types' members name `FortressLibrary.fss`.

## What a program sees differently

- A printed type: none for a value; a type's text, the ilk and `Reflect` print the five names as before (F-344's reading at the trait now has nothing to read for numbers: the values' type is the object of that name).
- A message: 'Attempt to extend object type ZZ32' for a program's object below one of the five, which loaded before; 'Float is undefined.' (and so for `Int`, `Long`, `BigNum`, `UnsignedLong`) where a program names one as a type; the list of overloads for `+` one entry shorter; on the compiled path, the refusal of a binding over a program's own `UnsignedLong` names `ZZ64->ZZ64`, not `NN64->ZZ64`.
- A `typecase` arm at `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong` takes every value, with no message (row 959; fork O4).
- An overloading: `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: ZZ64, b: ZZ64): ZZ64` loads (row 550, the promoted test); a plain declaration with no written return type beside a generic one over the five loads unjudged (row 1044), where it was refused (row 785).
- `x asif RR64` and the like are the value itself; `(3.0 asif RR64) + 17` runs the object's `+`, where the base ran the trait's body through `asFloat(self)`, with the same value.
- Added by the skeptic: an overloading that loads where the base refused it, two plain declarations over one of the five whose more specific one breaks the Subtype Rule: `f(x: Number): ZZ32` beside `f(x: ZZ64): String` is refused on the base, 'Overloading of f(x:FortressLibrary.ZZ64):FortressLibrary.String ZZ64->String ... and f(x:FortressLibrary.Number):FortressLibrary.ZZ32 Number->ZZ32', and loads after, printing `f(ZZ64) s f(ZZ32) s`; so too at `RR64` (row 697's reading of an object type as excluding; `SKEPTIC.md`, "Programs").

## Every pair that walk refuses at load after the change and loaded before

None among the library and the plain tests: every test of `ant testSystem` loads the library, and all 869 passed. For the 163 expected-failure walk tests, which stay green whether their failure is a refusal at load or a failure at run time, the comparison of their outputs on the old code and the new was not made: the session's automatic permission check refused the run of the base build's `harness-one.sh` with `FORTRESS_HOME` set to the base build (the form of `worktrees.md`, "Running the old code"), "Destructive or Unwanted Actions", and by `session.md` that run was not tried another way. On the edit all 163 passed (`Saw expected failure` or `Saw expected exception`).

Added by the skeptic: the 163 expected-failure walk tests, run directly with `old-fortress.sh` and with `bin/fortress`, keep their failures; none moves between a refusal at load and a failure at run time. Their outputs differ only in lists of overloads and in the counts of one race, `XXXAtomicNestedReadsKeptWalk` (`SKEPTIC.md`, "The expected-failure tests").

## Sentences of the specification

Changed, in the Effect of the entry on the natives' bindings, in place, as Appendix I's Effects are amended (`Specification/appendices/changes.tex:4808-4829`, `:4858-4862`):

- before: "374 of the 402 bindings of \library\ name a helper" / after: "373 of the 401 bindings ...".
- before: "\OPR{CHOOSE} of the traits ℤ32 and ℤ64" / after: "of the objects ℤ32 and ℤ64"; before: "but < of the trait ℤ" / after: "of the object ℤ".
- before: "the power of these three traits, of the trait ℕ64 and of the interpreter's object ℕ32" / after: "the power of these three objects and of the objects ℕ64 and ℕ32".
- before: "twenty-nine bindings of the trait ℕ64, its getter asNN32 among them, and of the interpreter's objects thirty-one of ℕ32, three of UnsignedLong, forty-one of Char, sixty-two of Float and fifty-one of ℝ32; the getters asString, asExprString and asFloat of the interpreter's objects Int, Long and BigNum" / after: "thirty-two bindings of the object ℕ64, its getter asNN32 among them, thirty-one of ℕ32, forty-one of Char, sixty-one of ℝ64 and fifty-one of ℝ32; the getters asString, asExprString and asFloat of ℤ32, ℤ64 and ℤ".
- before: "Where a binding declares ℕ32, ℕ64 or Char at a position at which its helper takes or answers a Java int or long, or UnsignedLong, the interpreter's object of ℕ64, at an argument, the compiler composes ..." / after: "... a Java int or long, the compiler composes ...".

Made false and not edited, for the gather: `Specification/appendices/changes.tex:4882-4886`, "and it reads the declaring type, not the value's, so a program's object that extends a carried trait of \library\ against its \KWD{comprises} clause, which the interpreter loads (row~551 of the revival's gap ledger), still reaches the helper with a value that no Java type carries": no carried type of the library has a `comprises` clause now (the five were the ones), and a program's object below one of the five is refused at load. No other Effect or note names the five objects (a grep of `Specification/` for the five names as words finds only these lines and the dimensions chapter's unrelated `Float` example). The trait wording of `Specification/basic-lib/basic-integers.tex:16`, `:106`, `:229` is the chapter's presentation of a built-in type, as for `Boolean`; it is listed under the questions.

Added by the skeptic: that sentence is brought in line on the branch, after the change, citing row 928 (`SKEPTIC.md`, "Corrections").

## Points to report

- The library's text by file: the tables above (`Library/FortressLibrary.fss` 164/80, `.fsi` 11/21, `FortressBuiltin.fss` 1/186, `.fsi` 1/15, `ReflectiveQuickCheck.fss` 4/4).
- Walk's Java by file: the five get native values at `BuildEnvironments.java:459-470`, `:526-533`; the classes renamed `Int` to `ZZ32`, `Long` to `ZZ64`, `Float` to `RR64`, `BigNum` to `ZZ`, `UnsignedLong` to `NN64`; the lines deleted that served the two names: `LanguageTypes.java`'s five entries, `NUMBERS_COMPONENT`, `numberTraitName`; `ObjectPrims.java`'s call and import; `StaticNativeApp.java`'s five names; the rewriter's clause.
- The tests of step 1: failing on the base, passing after (above); `asifTest`, `NumberPrintTest`, `NativeHelperFloatCarriedWalk` pass after.
- Tests whose pinned message changed: `XXXNativeHelperOwnUnsignedLongCompiled.test:3` (not the team's). The team's `NumberPrintTest.fss:31`, `:35` changed two arms, no checked value. No checked value of any test changed.
- Row 550's test promoted: failing on the base ('fails the Return Type Rule'), passing after.
- What a program sees differently: the section above; the plain declaration with no written return type beside a generic one over `ZZ64` refused on the base and loading after.
- Pairs refused at load after and loaded before: none among the library and the plain tests; the expected-failure tests not compared (the refusal above).
- The stages: count identical to the gate's, 0; distance `DISTANCE SAME 0`.
- The specification's sentences changed: above.
- Model lines: none; no line of microGPT or of its helper files names the five objects, and none changed (`git diff --name-only 647163a9c4 HEAD -- explorations/run-c4 explorations/apl` prints nothing).
- Files edited beyond those named: `interpreter/glue/prim/NN32.java` and `IntLiteral.java` (their calls of the kept helpers), the team's unused `interpreter/glue/prim/ZZ32.java` (replaced by the renamed class), `compiler_tests/XXXNativeHelperOwnUnsignedLongCompiled.fss` and `.test` (the brief said to leave them).

## Decisions

1. The five stay in `FortressLibrary`, and walk names them in a table read only in that component (fork O1's default). Not taken: the move into `FortressBuiltin`; the literal `"FortressLibrary"`, where `WellKnownNames.fortressLibrary()` is the tree's name for it.
2. Members merged in the trait's order: a member both had keeps the trait's place and doc comment and takes the object's body; the object's new getters go after the trait's `one` (before the first getter in `NN64`, which had no `one`), since getters stand before methods; the object's new methods go after their kin (`=/=` after `=`, `^` at `RR32` and `ZZ32` after `^` at `RR64`). Not taken: the object's order (the probe's for `RR64`), which moves more lines.
3. The api's five `asFloat` lose `abstract`: `library.md` writes `abstract` only on a member the component leaves without a body, and `NN32`'s api has none. Not taken: keep it, as the probe did. The distance stage, which runs the export check, is 0.
4. One `^` at `RR64`, `Float`'s first (`doublePow`), the duplicate at `Float` dropped (the brief).
5. `round(self): ZZ64` stays the one `round` (fork O3).
6. The five classes keep the public static helpers that other glue classes still call, and lose the nested natives, their private bases and the helpers that only those called (`Int`'s `rc`, `negativePow`, `lcm`, `gcd`, `choose`, `mod`, `powExact`, `pow`; `Long`'s `gcd`, `choose`, `mod`, `pow`; `UnsignedLong`'s `pow`; `BigNum`'s `toB`, `shiftLeft`, `choose`). Not taken: keep every static helper, about 200 dead lines; delete the dead natives of `NN32.java` and `IntLiteral.java` too, which no rung named.
7. The rewriter's `UnsignedLong` clause goes (step 4), and the test that pinned its message is repinned. Not taken: keep the clause, a line that served the removed name; leave the test as it was, which turns it red ('Saw wrong failure').
8. `NumberPrintTest`'s arms and their printed labels take the types' names. Not taken: the arm alone, which would print `ZZ` under a label `BigNum`.
9. The team's prose that names the objects in `tests/simpleExp.fss:15` and `tests/BigNum.fss` is left: neither is a comment of the revival nor a checked value. Not taken: respell them.
10. `ReflectiveQuickCheck.fss`'s comment keeps its argument with `FlatString` below `String`, for which `genFromType` answers `genString` by `SUBTYPEOF` (`Library/ReflectiveQuickCheck.fss:153-166`). Not taken: delete the example.
11. The Effect's whole sentence is brought in line, its counts and its "traits" included, since the lines named are inside that sentence. Not taken: the named lines only; editing `:4882-4886` too, which the brief leaves to the gather.
12. `ant testQuick` ran beside `ant testSystem`, the rewriter being the compiled path's parse. Not taken: `testSystem` alone.
13. The test of a refusal at load is plain (`load_exception_contains`); the guard is one file of the five types. Not taken: five guard files.

## Defects and their homes

- Row 1003's one-library half (the five as traits with one object): repaired, home 1, `ProjectFortress/tests/NumberTypesAreObjectsWalk.fss`; the prelude's half remains, row 1003 rewritten.
- Row 551 at the five types (a program's object below one loads): repaired for the five, home 1, `ProjectFortress/tests/NumberTypeExtendRefusedWalk.fss`; the row stays for other library clauses.
- Row 550 (the valid pair at `ZZ64` refused): repaired, home 1, `ProjectFortress/tests/GenericBesidePlainReturnParam.fss`.
- Row 1000 (`round` declared twice at two types): one declaration now, by the text; what remains is the api's missing `round` and P-68's type, home 3, row 1000 rewritten, its reproducer `RoundHalfEvenRungR` asserting the values.
- Row 886's `UnsignedLong` half (the message names the library's transfer): repaired, home 1, `ProjectFortress/compiler_tests/XXXNativeHelperOwnUnsignedLongCompiled.test` (a refusal at compile time, which compiled folders write as an `XXX` compile test); the `Char` half stays, row 886 rewritten.
- Row 959 widened to the five removed names: home 2, its test `ProjectFortress/tests/XXXTypecaseUndefinedArmWalk.fss`, a note.
- Row 1044 widened to the five types: home 2, its test `ProjectFortress/tests/XXXGenericBesidePlainObjectNoReturnTypeWalk.fss`, a note.
- The compiled path's `object Mine extends ZZ32`: row 866, home 2, `ProjectFortress/compiler_tests/XXXObjectExtendsZZ32Compiled.test`.

No new defect, so no new row.

## Commands worked out

- The merge: `tmp/rung-number-objects/merge.py`, a parser of an object's and a trait's member blocks that keys each by name and parameter types; and `slim.py`, which keeps a glue class's constructor, `makeNativeObject`, `unregister` and named helpers. Neither is committed: they ran once.
- The ladder subset: `gate.md`'s step 1 with `subset.txt` written by hand and `microgpt-phase` left out, since no microGPT component reads the one library on the compiled path.

## For the skill writer

Sentences of the skill that the change makes false: `references/interpreter.md:118` ("`RR64` and `Float`, the library's object that extends `RR64`, in `double`"), `:124` (the library's objects `Int`, `Long`, `UnsignedLong`, `BigNum`), `:138` ("So a program's object that extends `ZZ32` loads ... 'getInt not implemented for FOrdinaryObject'"), `:144` (`Int.overflow()` in `interpreter/glue/prim/Int.java`, now `ZZ32.overflow()` in `ZZ32.java:41`); `references/compiler.md:22` (`Int.java`, `Long.java`), `:99` ("`UnsignedLong` (the one library's object that extends `NN64`)"); `references/library.md:39` (`Float`'s natives at `FortressBuiltin.fss:184-191`, now `RR64`'s own at `Library/FortressLibrary.fss:538-547`).
