# Rung A, rung-any-carrier: the carrier of `Any`

- problem: three bindings of the one library over `Any` named glue classes, which the compiled path cannot call, and walk's loader has no Java type that carries `Any`: F-32, F-299; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:38-41` and `Library/FortressLibrary.fss:4650-4651` at ed8652dc0; and walk's ilk printed `Int` for a `ZZ32` (the planner's probe 14, `CLIMB-BATCH-27.md:1313-1322`)
- spec: `Specification/basic-lib/objects.tex:126-130` (trait `Any`, method `toString`: a string that "textually represents" the object); the specification names no `ilkName` (`grep -rn ilkName Specification/` prints nothing) and is silent on `match`
- precedent: P-58's bare binding, as `FlatString`'s bindings to `stringOps` (`Library/FlatString.fss:36-38`); walk's carrier by the declaring component, `StaticNativeApp.declaringComponent` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:121-144`); the two-argument flattening overload `getEnvironment(name:String, defaultValue:String)` (`Library/System.fss:42-46`)
- deviation: for the two names of its table walk runs its own glue operation and does not load the named helper, P-58's walk half bent as P-167 says (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:47-53`, `:209-210`)
- deviation: the declaring component is read by a copy of `declaringComponent`'s three lines in `ObjectPrims.java:61-79`, since that method is package-private in `StaticNativeApp.java`, which this rung does not edit
- deviation: `match` over `String` flattens in `System`'s pair `typecase`, not in the nested single `typecase` of `printlnWithThread` that the brief names (`Library/FortressLibrary.fss:4616-4620`)
- historical: `Library/FortressLibrary.fss`, `Library/FortressLibrary.fsi`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java`

## What changed and why

Commit `f5be3b7e7` on `wip/rung-any-carrier` (cut from ed8652dc0; the worktree seeded by `seed-worktree.sh` in 3 s, exit 0).

- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:38-40`: `getter ilkName(): String = builtinPrimitive("com.sun.fortress.nativeHelpers.stringOps.typeName")`; `getter asString(): String = self.ilkName`, with no native. The api (`FortressBuiltin.fsi:33-34`) is unchanged.
- `Library/FortressLibrary.fss:4655-4656`: `opr SEQV(a:Any, b:Any):Boolean = builtinPrimitive("com.sun.fortress.nativeHelpers.equality.sEquiv")`; its api line is unchanged.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:41-53`: the table `OWN_OPERATIONS`, as written:

      static final java.util.Map<String, String> OWN_OPERATIONS = new java.util.HashMap<String, String>();
      static {
          OWN_OPERATIONS.put("com.sun.fortress.nativeHelpers.stringOps.typeName",
                             "com.sun.fortress.interpreter.glue.prim.ObjectPrims$ClassName");
          OWN_OPERATIONS.put("com.sun.fortress.nativeHelpers.equality.sEquiv",
                             "com.sun.fortress.interpreter.glue.prim.AnyPrim$SEquiv");
      }

  read at `:209-210`, right after the string is read and before the cache and `StaticNativeApp.isHelperString`: `String own = OWN_OPERATIONS.get(str); if (own != null) str = own;`. The glue classes stay, as walk's operations.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java:46-105`: `ClassName` answers `ilk(o.type())`. `traitOf` names `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` as `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64` when the type is an `FTypeObject`, no generic instance, whose environment's top level is the component `FortressBuiltin`; `ilk` renders a generic instance's static arguments, a tuple's elements and an arrow's domain and range by the same rule, with `FType.toString`'s delimiters (`[\`, `,`, `\]`, `(`, `)`, `->`), and every other type by `toString`. `ToString` stays, now bound by nothing in the library.
- `Library/FortressLibrary.fss:4616-4620`, `.fsi:2577`: `match(regex:String, some:String):Boolean = typecase (regex.asFlatString, some.asFlatString) of (r:FlatString, f:FlatString) ⇒ match(r, f); (r:String, f:String) ⇒ fail[\Boolean\]("match: asFlatString answered a string that is not flat") end`.
- The 48 lines of `ProjectFortress/tests/ArrayElementAlgebra.fss` and `ProjectFortress/tests/FlatTowerRungF.fss` (below).
- New tests: `ProjectFortress/tests/AnyNativesIntrinsicWalk.fss`; `ProjectFortress/compiler_tests/AnyNativesIntrinsicCompiled.fss` and `.test`.

Why: P-167. `ilkName` and `SEQV` keep P-58's form and name the compiled helpers, whose answers are the definition; walk answers them as a virtual machine answers an intrinsic; `asString` over `ilkName` is P-91's rule as text and keeps row 321's recursion out of the one library; the ilk is the trait's name (fork A1), only for the five (fork A2). What `SEQV` answers is rung E's: walk's `AnyPrim$SEquiv` still answers, and every SEQV answer is the base's.

## Tests, failing then passing

Failing on the base's code, before the edit was first built (08:17:05 to 08:17:14 UTC; the build began after 08:18):

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-any-carrier/h1 ProjectFortress/tests/AnyNativesIntrinsicWalk.fss ProjectFortress/tests/ArrayElementAlgebra.fss ProjectFortress/tests/FlatTowerRungF.fss
    FAIL: J17/0:2147483648 : Long =/= J17/0:2147483648 : ZZ64; row 146, POSITIONS.md:159: a ZZ64 bound to a numeral holds 64 bits
    FAIL: J8/0:32 : Int =/= J9/0:32 : ZZ32; an integer vector's dot product stays an integer; Library/FortressLibrary.fsi, trait Vector, dot
    FAIL: J10/0:Box[\Int\] =/= J11/0:Box[\ZZ32\]; an inferred static argument is named by the trait
    Tests run: 3,  Failures: 3,  Errors: 0

The walk test stops at its first failing assertion, the inferred static argument; its `match` lines on the base were seen by a probe on the old code (`old-fortress.sh ... MatchRopeP.fss`): 'Closure/Constructor for match parameter 2 (some:FlatString) got type CatString'.

The compiled guard on the base (08:17:27):

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests AnyNativesIntrinsicCompiled.test
    . run ProjectFortress/compiler_tests/AnyNativesIntrinsicCompiled (390ms) Named
    OK (2 tests)

Passing after, the last run after the last change of code (the `match` form and the walk test's added `match(rope, rope)`, 08:22:37):

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-any-carrier/h1 ProjectFortress/tests/AnyNativesIntrinsicWalk.fss ProjectFortress/tests/ArrayElementAlgebra.fss ProjectFortress/tests/FlatTowerRungF.fss ProjectFortress/tests/NativeHelperStringRopeWalk.fss
    OK (4 tests)

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh after ProjectFortress/compiler_tests AnyNativesIntrinsicCompiled.test NativeHelperBindingCompiled.test DefaultRenderRungS.test XXXFortToStringRungS.test FortToStringRungSLink.test
    . run ProjectFortress/compiler_tests/XXXFortToStringRungS (850ms) REACHED
    Saw expected failure (Exit code != 0)
    OK (8 tests)

(after the library order on the rebuilt caches, five compiles, each rc=0). On the final code, after the last edit (08:36:29):

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests AnyNativesIntrinsicCompiled.test
    OK (2 tests)

`ant testSystem` once, on `f5be3b7e7`'s code: 'BUILD SUCCESSFUL', 'Total time: 3 minutes 46 seconds', shards 'Tests run: 194, Failures: 0', '185, Failures: 0', '192, Failures: 0', '186, Failures: 0': 757 tests, the landed 756 and the new walk test. No verdict changed but the two respelled tests' (failing on the base's code with their new text, passing after) and the new test; `sequivTest`, `BooleanOps`, `ExtendsAnyIsObjectWalk`, `XXXInferredStaticArgRungS` (still an expected failure) and `XXXInferredIntBindingRungT` keep theirs. A first start of the suite was stopped after about a minute, before any shard ended, because the `match` form then changed.

## Where the fix belongs, and the precedent

`map/compile-path-walkthrough.md`, section 7, gives the two bindings, walk's `builtinPrimitive` and the compiled `import java`; the binding's text is the library's, the table walk's loader (`interpreter/glue/`), the ilk walk's glue operation. The ways the language and the tree offer: (a) a helper over `Object` that both paths call, which the review's prototype A needed four edits of `StaticNativeApp` and one of the wrapper generator for; (b) the mirror form, glue strings in the library mapped by the compiled path (against P-58); (c) the table, P-167's choice. For the ilk: change `FType.toString` or `FTraitOrObject.toString` (every message of walk would change, row 364's 'RHS expression type BoxT[\Int\]' among them, and the load check's texts); render in `ClassName` only (taken). Precedent sites counted: walk's loader tells a library type by its component at one site (`StaticNativeApp.java:121-125`, `FlatString`); the library's overloads over `String` that flatten by `typecase` on `asFlatString`: five (`FortressLibrary.fss` `printThreadInfo`, `printWithThread`, `printlnWithThread`; `System.fss` `getEnvironment`, `getProperty`), two of them over two arguments in the pair form followed here.

## What the specification settles

`objects.tex:126-130`: `toString` returns a string that "textually represents" the object. The specification names no `ilkName`, no printed name of a number's run-time class and no `match`. P-91 and P-167 settle the texts.

## Old against new

- `tmp/rung-any-carrier/probe/IlkProbeA.fss`, walk, new then old (`old-fortress.sh /home/user/fortress-base27 tmp/old-caches IlkProbeA.fss`):

      1 Box[\Box[\ZZ32\]\] Two[\ZZ32,ZZ64\] Box[\(ZZ32,ZZ64)\]      | 1 Box[\Box[\Int\]\] Two[\Int,Long\] Box[\(Int,Long)\]
      4 FlatString Char Ratio FloatLiteral                          | 4 FlatString Char Ratio FloatLiteral
      5 RR32 Box[\RR32\] Box[\RR64\]                                | 5 RR32 Box[\RR32\] Box[\Float\]

  A program's own top-level `object Long` is refused by both: 'Type name may refer to: Long, FortressBuiltin.Long'.
- `tmp/rung-any-carrier/probe/MatchRopeP.fss`: old 'Closure/Constructor for match parameter 2 (some:FlatString) got type CatString'; new `match: true`.

## The printed texts that change

`Object`'s `asString` as written: `getter asString(): String = self.ilkName`. Its text and `ilkName`'s change only for a value whose type is one of the five or holds one in its static arguments, a tuple or an arrow: `i.ilkName` `Int` to `ZZ32`, `l.ilkName` `Long` to `ZZ64`, `b.ilkName` `BigNum` to `ZZ`, `(1.5 + 1.5).ilkName` `Float` to `RR64`, `u.ilkName` `UnsignedLong` to `NN64`; `Box(i).asString` `Box[\Int\]` to `Box[\ZZ32\]`; `i.asDebugString` `a Int: 3` to `a ZZ32: 3`; `Box(1.5 + 1.5).asString` `Box[\Float\]` to `Box[\RR64\]`. Every library object below `Object` that the old glue `ToString` reached printed `FObject.getString()`, `type().toString()` (`interpreter/evaluator/values/FObject.java:33-38`); the native objects that override `getString` all declare their own `asString` (`FortressBuiltin.fss`, the eleven native objects; `File.fss:28`, `:70`; `Writer.fss:29`, `:53`), so no other text moves.

## The 48 respelled lines (before -> after; each line's value and message kept)

- `tests/ArrayElementAlgebra.fss:17`: "32 : Int" -> "32 : ZZ32"
- `tests/ArrayElementAlgebra.fss:19`: "6 : Int" -> "6 : ZZ32"
- `tests/ArrayElementAlgebra.fss:20`: "7 : Int" -> "7 : ZZ32"
- `tests/ArrayElementAlgebra.fss:35`: "7 : Int" -> "7 : ZZ32"
- `tests/ArrayElementAlgebra.fss:41`: "0 : Int" -> "0 : ZZ32"
- `tests/ArrayElementAlgebra.fss:42`: "0 : Int" -> "0 : ZZ32"
- `tests/ArrayElementAlgebra.fss:43`: "0 : Int" -> "0 : ZZ32"
- `tests/ArrayElementAlgebra.fss:44`: "2 : Int" -> "2 : ZZ32"
- `tests/FlatTowerRungF.fss:42`: "2147483648 : Long" -> "2147483648 : ZZ64"
- `tests/FlatTowerRungF.fss:43`: "8 : Long" -> "8 : ZZ64"
- `tests/FlatTowerRungF.fss:45`: "3 : Long" -> "3 : ZZ64"
- `tests/FlatTowerRungF.fss:47`: "3 : Long" -> "3 : ZZ64"
- `tests/FlatTowerRungF.fss:49`: "3 : UnsignedLong" -> "3 : NN64"
- `tests/FlatTowerRungF.fss:51`: "3 : BigNum" -> "3 : ZZ"
- `tests/FlatTowerRungF.fss:53`: "5 : BigNum" -> "5 : ZZ"
- `tests/FlatTowerRungF.fss:55`: "3 : BigNum" -> "3 : ZZ"
- `tests/FlatTowerRungF.fss:57`: "3 : BigNum" -> "3 : ZZ"
- `tests/FlatTowerRungF.fss:69`: "3.0 : Float" -> "3.0 : RR64"
- `tests/FlatTowerRungF.fss:71`: "7.0 : Float" -> "7.0 : RR64"
- `tests/FlatTowerRungF.fss:72`: "1.5 : Float" -> "1.5 : RR64"
- `tests/FlatTowerRungF.fss:98`: "0 : Int" -> "0 : ZZ32"
- `tests/FlatTowerRungF.fss:99`: "6 : Int" -> "6 : ZZ32"
- `tests/FlatTowerRungF.fss:102`: "3.75 : Float" -> "3.75 : RR64"
- `tests/FlatTowerRungF.fss:103`: "3.75 : Float" -> "3.75 : RR64"
- `tests/FlatTowerRungF.fss:105`: "7.3125 : Float" -> "7.3125 : RR64"
- `tests/FlatTowerRungF.fss:106`: "0 : Int" -> "0 : ZZ32"
- `tests/FlatTowerRungF.fss:107`: "14 : Int" -> "14 : ZZ32"
- `tests/FlatTowerRungF.fss:108`: "7.3125 : Float" -> "7.3125 : RR64"
- `tests/FlatTowerRungF.fss:110`: "14 : Int" -> "14 : ZZ32"
- `tests/FlatTowerRungF.fss:111`: "1 : Int" -> "1 : ZZ32"
- `tests/FlatTowerRungF.fss:112`: "24 : Int" -> "24 : ZZ32"
- `tests/FlatTowerRungF.fss:114`: "3.375 : Float" -> "3.375 : RR64"
- `tests/FlatTowerRungF.fss:115`: "0 : Long" -> "0 : ZZ64"
- `tests/FlatTowerRungF.fss:116`: "0 : BigNum" -> "0 : ZZ"
- `tests/FlatTowerRungF.fss:119`: "0 : UnsignedLong" -> "0 : NN64"
- `tests/FlatTowerRungF.fss:121`: "1 : Long" -> "1 : ZZ64"
- `tests/FlatTowerRungF.fss:123`: "1 : UnsignedLong" -> "1 : NN64"
- `tests/FlatTowerRungF.fss:124`: "1 : BigNum" -> "1 : ZZ"
- `tests/FlatTowerRungF.fss:127`: "6 : Long" -> "6 : ZZ64"
- `tests/FlatTowerRungF.fss:128`: "3.25 : Float" -> "3.25 : RR64"
- `tests/FlatTowerRungF.fss:160`: "14.0 : Float" -> "14.0 : RR64"
- `tests/FlatTowerRungF.fss:161`: "32.0 : Float" -> "32.0 : RR64"
- `tests/FlatTowerRungF.fss:162`: "77.0 : Float" -> "77.0 : RR64"
- `tests/FlatTowerRungF.fss:172`: "15 : Int" -> "15 : ZZ32"
- `tests/FlatTowerRungF.fss:177`: "7 : Int" -> "7 : ZZ32"
- `tests/FlatTowerRungF.fss:182`: "2.25 : Float" -> "2.25 : RR64"
- `tests/FlatTowerRungF.fss:186`: "5.0 : Float" -> "5.0 : RR64"
- `tests/FlatTowerRungF.fss:190`: "1.0 : Float" -> "1.0 : RR64"

## The stages

The count stage on `f5be3b7e7`, the final code (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-any-carrier/checker-count-postedit.txt tmp/rung-any-carrier/cc-post`, rc=0): `diff explorations/compile-ladder/climb-batch-26/gate/checker-count.txt tmp/rung-any-carrier/checker-count-postedit.txt` prints nothing: `#total 0`, `#locations 0`, `#crash none`.

The distance stage on `f5be3b7e7`, the final code (`explorations/coordinator/tools/distance/run.sh tmp/rung-any-carrier/distance-postedit.txt tmp/rung-any-carrier/dist-post`), its second run, rc=0: `#total 0`, `#crash none`, `#seconds 167 FortressLibrary 121`. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-26/gate/distance.txt tmp/rung-any-carrier/distance-postedit.txt` prints 'DISTANCE SAME   0'. `tmp/rung-any-carrier/dist-post/errors.tsv` holds its header only, against a per-site list (`explorations/compile-ladder/gate/distance-sites.tsv`) of no site: no site moved. Its first run, on the same code, ended at '### target-crash Library/FortressLibrary.fss com.sun.fortress.exceptions.shell.ShellException: java.io.IOException: No space left on device' with no table (the container's disk had 23 MB left); this rung's scratch caches were deleted (about 400 MB) and the stage run again. No change of code followed either stage's start.

## The ladder subset

Empty. No file of the newest landed `climb-batch-26/gate/ladder/ladder.tsv` or of the baseline's `ladder.tsv` has a first error that names `ilkName`, `asString`, `SEQV`, `typeName`, `sEquiv`, `ObjectPrims`, `AnyPrim` or the function `match` (awk over the `first_error` column; its two hits, 'Component/API names must match their enclosing file names.', are the word, not the function). The compiled path's ladder links the compiler's prelude, which this rung does not touch.

## Competing declarations

`grep -rn` over `ProjectFortress/tests`, `ProjectFortress/compiler_tests` and `ProjectFortress/src/com/sun/fortress`: no other `OWN_OPERATIONS`, `NUMBERS_COMPONENT`, `traitOf` or `ilk` in the glue; `match` was already a top-level function of `FortressLibrary`, so its new overload reserves no new name, and no test declares a variable `match`.

## Sentences made false

- `Specification/appendices/changes.tex:4444-4446`, entry "A native binding that names a static helper": "that the interpreter loads a helper beside its glue classes" is false for `stringOps.typeName` and `equality.sEquiv`, which walk answers with its glue operations; and `:4495`, "The other 143 still name a glue class", falls by three for this rung (the gather corrects both, fork 7).
- F-32's "143" (140 for this rung); F-299's "306" (308) and its "Walk loads a `builtinPrimitive` string that names a static helper", false for the table's two names.
- F-57's "which it prints `Int`, `Long` and `BigNum`" (`FACTS.md:54`): walk now prints `ZZ32`, `ZZ64`, `ZZ`.
- Review-queue item 372 (`explorations/coordinator/review-queue.md:46`, `:292`): its default is now built; the five stay public.
- PLAN's natives line (`explorations/coordinator/PLAN.md:49`): the three over `Any` have left glue; and `PLAN.md:67`, that once the compiled path reads the one library every object meets row 321's overflow, which the one library's `Object` no longer reaches.
- Row 364's claim, "`Cell(3)` `Cell[\Int\]`" (record.md gives its new line); row 321's (narrowed).
- The fortress-repo skill: `references/revival-changes.md:80` ("Walk gives a numeral the class `Int`, `Long` or `BigNum` ... `Box[\Int\]` is not `Box[\ZZ32\]`") stays true of the classes; it says nothing of their printed names, so none is false, but a reader can no longer see `Int` in walk's printed output; `references/interpreter.md:101` stays true.

## Points to report

- The loader's table as written (above): `com.sun.fortress.nativeHelpers.stringOps.typeName` to `com.sun.fortress.interpreter.glue.prim.ObjectPrims$ClassName`, `com.sun.fortress.nativeHelpers.equality.sEquiv` to `...AnyPrim$SEquiv`; `NativeApp.java:41-53`, `:209-210`.
- The ilk's rendering: `ObjectPrims.java:46-105`; the five by their traits, at the top level and inside static arguments, tuples and arrows; told by the component `FortressBuiltin`.
- `Object`'s asString as written, `FortressBuiltin.fss:40`, and the texts that change (above).
- The 48 lines (above).
- `match` over `String`: `Library/FortressLibrary.fss:4616-4620`, `.fsi:2577`; at a rope on the base 'got type CatString', after `true`.
- The tests through the harness and junit.sh (above).
- The count table: unchanged, 0; the distance table: below.
- `ant testSystem`: no verdict changed beyond the respelled two and the new test.
- The sentences made false (above).
- Files edited beyond those named: none; no edit of a helper's body, of a walk value class, of the checker or of the compiler. `ObjectPrims.java` is the glue class that the brief names.

Reserved points: no model line calls the three (the review, section 5); no helper's body was edited.

## Decisions, each with the ways not taken

1. The table maps each helper name to the glue class's name and replaces the string before the loader's cache and helper test, so the loader's own glue path makes and initialises the operation. Not taken: a table of `NativeApp` instances (a second construction path); a check after `isHelperString` in `StaticNativeApp` (rung W's file).
2. The five told by their declaring component, by a copy of `declaringComponent`'s lines in `ObjectPrims`. Not taken: matching by name only, as the planner's prototype did (a program's own top-level `Long` is refused anyway, but a type of that name in another component would print as a trait); making `StaticNativeApp.declaringComponent` public (rung W's file).
3. The rendering inside `ClassName` only, recursive over generic instances, tuples and arrows. Not taken: `FType.toString` or `FTraitOrObject.toString` (would rename walk's types in every message, the load check's and row 364's 'RHS expression type BoxT[\Int\]' among them); the top level only (keeps `Box[\Int\]`, fork A1); generic instances only (keeps `Box[\(Int,Long)\]`).
4. `match` over `String` in `System`'s pair `typecase` (`System.fss:42-46`), with `fail[\Boolean\]` so that the checker types the arm. Not taken: the nested single `typecase` of `printlnWithThread` that the brief names (my first draft; two `typecase`s where the library's own two-argument overloads use one); the one-line `match(regex.asFlatString, some.asFlatString)` (fork A6).
5. The walk test asserts SEQV only at a reference object with itself, two of equal fields and one against a `ZZ32` (fork A5); it also asserts `match(rope, rope)`, a rope pattern, beyond the brief's one case.
6. Row 321 keeps its class `implementation gap (runtime)`: the recursion runs through the runtime's `FValue.toString`, which stays; only the claim narrows to the prelude's `Object` (fork A4).
7. The distance stage was run twice: the first run ended at 'java.io.IOException: No space left on device' in `FortressLibrary.fss` (the container's disk, 23 MB left, filled by the batch), with no table; after this rung's scratch caches were deleted, the second run (below).

## Defects and their homes

- Walk's ilk printed walk's classes, `Int` for a `ZZ32`: home 1, repaired; `AnyNativesIntrinsicWalk`.
- Three bindings over `Any` on glue classes: home 1, repaired; `AnyNativesIntrinsicWalk`, `AnyNativesIntrinsicCompiled` (both paths), the count stage.
- `match` refused a rope (row 916): home 1, repaired; `AnyNativesIntrinsicWalk`. The gather closes the row.
- Row 321 in the one library: home 1 for the one library (`AnyNativesIntrinsicCompiled`); the prelude's remains home 2, `XXXFortToStringRungS`, unchanged.
- Row 364's printed `Cell[\Int\]`: text repaired; the row's gap, instantiation at the run-time class, stays home 2 (`XXXInferredStaticArgRungS`); new line in record.md.
