# Rung G, rung-walk-language-types: walk's generics and messages at language types

- problem: walk instantiates a generic inferred from a number or string value at the value's run-time class, `Int` or `FlatString`, so `Cell(3)` dispatches past `kind(c: Cell[\ZZ32\])` and `Cell("s")` is a `Cell[\FlatString\]` (row 364; the review's probe `R364A`, `explorations/reviews/row-364-walk-generics-2026-11-08.md:9-35`); on the base `tests/LanguageTypeInstancesWalk` fails 'FAIL: J3/0:Any =/= J4/0:ZZ32' at `ProjectFortress/tests/LanguageTypeInstancesWalk.fss:21`
- spec: `Specification/basic/inference.tex:45` ("The Static Arguments of a Call"; its revision box at `:234-236`: the interpreter infers "from the run-time types of the arguments", and the specification knows no `Int`); `Specification/basic/expressions/literals.tex:57` ("A string literal has type String"); `Library/FortressLibrary.fsi:560-562` (`ZZ32 comprises { Int }`)
- precedent: `ObjectPrims.traitOf`, the test of the five by name and declaring component (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java:61-77` at b430f9f42), moved; `StaticNativeApp.declaringComponent` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:148-158`), copied for the component test
- deviation: the helper returns an `FType`, the trait found among the object's transitive supertypes, not a name (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/LanguageTypes.java:62-80`), and maps the four string objects too (fork G2)
- deviation: walk's type text of the nine is now the trait's name (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java:189-192`), while the ilk keeps a string object's own name (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java:54-66`)
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java`, `ProjectFortress/tests/LongStringTests.fss`

## What changed and why

Commits on `wip/rung-walk-language-types`, cut from b430f9f42 (the worktree seeded by `seed-worktree.sh` from `/home/user/fortress-base29`, exit 0, 3 s): `57bddc15c` the tests first, `bfdc5b74c` the fix, `1a48fc6cc` two `XXX` tests of what remains of rows 717 and 824.

- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/LanguageTypes.java:1-97`, new. A table of the nine objects, each with the trait it stands for and the component that declares it (`:30-41`): `Int`, `Long`, `BigNum`, `Float`, `UnsignedLong` of `FortressBuiltin` at `ZZ32`, `ZZ64`, `ZZ`, `RR64`, `NN64`; `FlatString` of `FlatString` and `CatString`, `EmptyString`, `SubString` of `String` at `String`. `traitName(FType)` (`:45-50`) answers the trait's name for an `FTypeObject` that is no generic instance, whose name is in the table and whose declaring component (`declaringComponent`, `:86-96`, the lines of `StaticNativeApp.declaringComponent`) is the table's; so a program's own `Int` or `FlatString` keeps its name. `numberTraitName` (`:53-56`) answers it for the five number objects only. `traitOf(FType)` (`:62-80`) maps a tuple type element by element through `FTypeTuple.make`, and returns for one of the nine the `FTypeTrait` of the trait's name among its transitive supertypes, else the type itself. `FloatLiteral` is not in the table (fork G2).
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java`: the three reads of a value's type, each now `LanguageTypes.traitOf(...)`: `inferWithCoercion`'s first pass, `FType at = LanguageTypes.traitOf(a.type());` (`:602`), whose `at` the varargs unification (`:606-611`) and the unification of a parameter type that mentions a static parameter (`:634-637`) read; `narrowest`'s candidates (`:783-785`); `inferByUnification`'s first pass (`:937`). Nothing else in the file changed; N's head of `inferAndInstantiateGenericFunction` (`:72-94`) is untouched.
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java:189-192`: a trait or object that is no generic instance prints `LanguageTypes.traitName(this)` where it has one, else its name. A generic instance prints its static arguments through their own text, a tuple type its elements', an arrow its domain's and range's, so the nine print by their traits everywhere walk makes a type's text: in every message that prints an `FType` or an object value (`FObject.getString`, `interpreter/evaluator/values/FObject.java:33-35`, answers `type().toString()`), and in `Reflect`'s `toString` (`interpreter/glue/prim/Reflect.java:434-437`, `ty.toString()`), which needed no edit.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java`: `traitOf` and `NUMBERS_COMPONENT` moved out (old `:52-77`); `ilk` (`:54-66`) reads `LanguageTypes.numberTraitName` and prints any other trait or object, the string objects among them, by its own name (`:64`), so the ilk's text is the base's: `"s".ilkName` is still `FlatString` (team test `tests/StringTests.fss:82`, revival test `tests/StringPieces.fss:34`, `:41`, `:45`).
- Tests (below): two new, six promoted, three keys, two team lines, one revival line, two new `XXX` tests.

So under walk `Cell(3)` and `Cell(z)` are `Cell[\ZZ32\]`, `Cell(r)` for a computed `r: RR64` a `Cell[\RR64\]`, `Cell("s")` a `Cell[\String\]`, `Cell((z, "s"))` a `Cell[\(ZZ32,String)\]`; `<|1, 2, 3|>` is an `ArrayList[\ZZ32\]` and `SUM` of it is 6; `filled(z)` is a vector; `openAt(z)` an `OpenRange[\ZZ32\]`; `typeOf(3).toString` is `ZZ32`. A `typecase 3 of Int => ...` still takes the `Int` arm (probe P4 below): the types keep their names and identities, only their text and the inference's reading change.

## The tests: failing on the base, passing after

The base run ended at 02:56:25Z; the first Java edit was made after it and first built at 03:00:31Z (`tmp/` logs, not cited).

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-language-types/h-base \
        ProjectFortress/tests/{LanguageTypeInstancesWalk.fss,LanguageTypeRefusedBindingWalk.fss,LanguageTypeRefusedBindingWalk.test,
        InferredIntegerBindingWalk.fss,ArrayInferredElementVectorWalk.fss,OpenRangeInferredIndexWalk.fss,
        NestedComprehensionDeclaredTypeWalk.fss,InferredStringStaticArgWalk.fss,PureListStridedSubscriptWalk.fss,
        TupleOrder{Mixed,Nested,Unit}Refused.{fss,test},LongStringTests.fss}

on the base's code (the worktree before any Java edit):

    # harness-one 2026-11-09T02:56:04Z; tree b430f9f428; nproc=4; load 0.38 0.65 1.54; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    FAIL: J3/0:Any =/= J4/0:ZZ32; Cell(z) for z: ZZ32 is a Cell[\ZZ32\] and runs the declaration over Cell[\ZZ32\] (inference.tex, section "The Static Arguments of a Call")
    Type mismatch binding 3: ZZ32 (type Int) to s (type String)
    Failed to find any matching overload, args = ((1,2): (Int,Int),(1,2.5): (Int,FloatLiteral)), overload = {
    Tests run: 12,  Failures: 12,  Errors: 0

The respelled line of `NativeGlueNonFlatStringWalk`, on the old code through the base build's harness (`FORTRESS_HOME=/home/user/fortress-base29 /home/user/fortress-base29/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-language-types/old-harness ProjectFortress/tests/NativeGlueNonFlatStringWalk.fss`):

    FAIL: J9/0:CatString =/= J6/0:String; the glue at the non-flat string answers the text of its type, String
    Tests run: 1,  Failures: 1,  Errors: 0

The last run after the last change of code (`1a48fc6cc`, the code of `bfdc5b74c`), the same harness over the twelve tests above with `NativeGlueNonFlatStringWalk.fss`, `XXXNestedComprehensionObjectElementsWalk.fss` and `XXXPureListStridedSubscriptObjectsWalk.fss`, fifteen in all:

    # harness-one 2026-11-09T03:12:25Z; tree 1a48fc6cc9; nproc=4; load 10.36 8.70 5.45; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    OK (15 tests)

`ant testSystem`, once, on `bfdc5b74c` (03:03 to 03:08Z), after the last edit of code; the two new `XXX` tests were added after it and ran green in the harness runs above and below:

    [junit] Tests run: 199, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 238.179 sec
    [junit] Tests run: 195, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 252.417 sec
    [junit] Tests run: 201, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 260.374 sec
    [junit] Tests run: 198, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 272.359 sec
    BUILD SUCCESSFUL

793 tests, 0 failures, against climb batch 28's landed 791 (`explorations/compile-ladder/climb-batch-28/gate/summary.txt`, `system-0` to `system-3`), the two new plain tests added; the renames keep the count.

The first `XXX` test this rung adds, shown through the harness (`harness-one.sh $PWD/tmp/rung-walk-language-types/h-xxx ProjectFortress/tests/XXXNestedComprehensionObjectElementsWalk.fss ProjectFortress/tests/XXXPureListStridedSubscriptObjectsWalk.fss`, then a copy of the first with `<|[\Shape\] y | y <- ys |>` written, run from `tmp/`):

    OK Saw expected exception
    OK (2 tests)
    ...
     Missing expected failure
    Tests run: 1,  Failures: 1,  Errors: 0

### The tests

- `ProjectFortress/tests/LanguageTypeInstancesWalk.fss`, new: `kind(Cell(z))`, `kind(Cell(3))` give `ZZ32`, `kind(Cell(r))` for `r: RR64 = asFloat(z)` gives `RR64`, `kind(Cell("s"))` gives `String`; `instanceOf[\Cell[\ZZ32\]\](Cell(3))` and `instanceOf[\Cell[\(ZZ32, String)\]\](Cell((z, "s")))` true; `Just(3) = Just[\ZZ32\](3)` and `Just(z) = Just[\ZZ32\](z)` true; `SUM <|1, 2, 3|>` and `SUM <|z, z|>` 6; `filled(z)` a vector; `openAt(z)` an `OpenRange[\ZZ32\]`; `typeOf(3)`, `typeOf(z)`, `typeOf("s")`, `typeOf((z, "s"))` printing `ZZ32`, `ZZ32`, `String`, `(ZZ32,String)`. Not `Cell(0.5)` (N's).
- `ProjectFortress/tests/LanguageTypeRefusedBindingWalk.fss` and `.test`, new: top-level `z: ZZ32 = 3` and `s: String = z`, refused at load, `load_exception_contains=(type ZZ32) to s (type String)`; a walk refusal is a Java error no `catch` sees, so the refused binding's message is its own test, a refusal while the top-level variables are initialised.
- Promoted, each renamed with `git mv` before the edit and seen red on the base above (fork G and the brief): `XXXInferredIntBindingRungT` as `InferredIntegerBindingWalk`, `XXXArrayInferredElementVectorWalk` as `ArrayInferredElementVectorWalk`, `XXXOpenRangeInferredIndexWalk` as `OpenRangeInferredIndexWalk`, `XXXNestedComprehensionDeclaredTypeWalk` as `NestedComprehensionDeclaredTypeWalk`, `XXXInferredStaticArgRungS` as `InferredStringStaticArgWalk`, `XXXPureListStridedSubscriptWalk` as `PureListStridedSubscriptWalk`, each whole (its string half too); the two with a record pointer for their comment got a comment of what they check, and `InferredIntegerBindingWalk`'s messages lost "; row 364", `InferredStringStaticArgWalk`'s ", walk prints Cell[\\FlatString\\]"; every assertion kept.
- The three keys (fork G4), before and after:
  - `TupleOrderMixedRefused.test:1`: `load_exception_contains=Failed to find any matching overload, args = ((1,2): (Int,Int),(1,2.5): (Int,FloatLiteral))` became `load_exception_contains=Failed to find any matching overload, args = ((1,2): (ZZ32,ZZ32),(1,2.5): (ZZ32,`.
  - `TupleOrderNestedRefused.test:1`: `... args = (((1,2),3): ((Int,Int),Int),((1,3),0): ((Int,Int),Int))` became `... args = (((1,2),3): ((ZZ32,ZZ32),ZZ32),((1,3),0): ((ZZ32,ZZ32),ZZ32))`.
  - `TupleOrderUnitRefused.test:1`: `... args = ((1,()): (Int,()),(2,()): (Int,()))` became `... args = ((1,()): (ZZ32,()),(2,()): (ZZ32,()))`.
- `ProjectFortress/tests/LongStringTests.fss`, a team test (fork G5), before and after:
  - `:121`: `"concurrent" PRINTTIME: tryGen(⟨7, 9, 17 , 36, 98, 274, 1020, 2030⟩, identity⟦Generator⟦Int⟧⟧)` became `... identity⟦Generator⟦ZZ32⟧⟧)`.
  - `:141`: `tryGen(⟨7, 9, 17 , 36, 275, 1032⟩, identity⟦Generator⟦Int⟧⟧)` became `... identity⟦Generator⟦ZZ32⟧⟧)`.
  - The respelled file fails on the base ('Unification error: Closure/Constructor for identity param 1 (x:Generator[\ZZ32\]) got arg ArrayList[\Int\] of type ArrayList[\Int\]', base run above) and passes after. The base's file, renamed `LongStringTestsOrig`, fails after, as the review predicted ('Unification error: Closure/Constructor for identity param 1 (x:Generator[\ZZ32\]) got arg ArrayList[\ZZ32\] of type ArrayList[\ZZ32\]', the final harness call, `harness-one.sh $PWD/tmp/rung-walk-language-types/h-lstorig tmp/.../LongStringTestsOrig.fss`, 'Tests run: 1,  Failures: 1'); the written `Generator[\Int\]` prints as `Generator[\ZZ32\]` there (decision 9).
- `ProjectFortress/tests/NativeGlueNonFlatStringWalk.fss:13`, a revival test of row 846, before `assert(env(unset, s), "CatString", "the glue at the non-flat string answers its type name CatString")`, after `assert(env(unset, s), "String", "the glue at the non-flat string answers the text of its type, String")`: the glue receives `FObject.getString`, the type's text, now `String` for a `CatString` (decision 7).
- `ProjectFortress/tests/XXXNestedComprehensionObjectElementsWalk.fss` and `XXXPureListStridedSubscriptObjectsWalk.fss`, new: what remains of rows 717 and 824 (below), in the specification's answer.

## Where the fix belongs, and the precedent

- The place: fork G1 and G3 (`explorations/coordinator/CLIMB-BATCH-29.md:384-390`) put the helper in `interpreter/evaluator/types/`, walk's run-time type objects (`explorations/coordinator/map/modules-and-phases.md:79`), its calls at `EvaluatorBase`'s three reads, and the text where a type's text is made, `FTraitOrObject.toString` (the review, section 3: messages "print `FType.toString`, which is the class name", `types/FType.java:115-117`, `types/FTraitOrObject.java:183-191`). Under walk a static argument is matched at dispatch, not inferred statically (`explorations/coordinator/map/spec-to-implementation.md:193`).
- The precedent: `ObjectPrims.traitOf` (`glue/prim/ObjectPrims.java:61-77` at b430f9f42), which made the ilk print the trait (F-328), with one caller in its file (`ilk`); it is moved, not copied. Its component test is `StaticNativeApp.declaringComponent`'s, copied once more (rung A of climb batch 27 copied it into `traitOf` for the same reason: `declaringComponent` is package-private in `glue/`, and `evaluator/types/` must not reach into `glue/`).
- The other sites of the same kind in `EvaluatorBase.java`: 13 reads of a value's `type()` at the base (`grep -n '\.type()'`), at `:119`, `:268-269`, `:554-555`, `:602`, `:660`, `:766`, `:783-784`, `:865-866`, `:936`. Four lines changed, the three reads the fork names. Left: `:119` (the trace's text), `:268-269` (`elementsType`, which reads the static argument of an `__Elems[\T\]` that inference built, already at the trait), `:554-555` and `:865-866` (a generic functional method's `self`, a generic instance, which no entry of the table is), `:660` (the second pass's unification of each argument where `narrowest` found no type and the bound did not admit them, reached only for a self-bounded parameter or a bound that refuses an argument), `:766` (`allSubtypes`, where an object of the nine is a subtype of a bound exactly where its trait is, unless the bound is the object itself).
- The ways the language and the tree offer (the review, section 2): A, the trait read at inference (chosen); B, every instance made at the trait at the four factories; C, `G[\Int\]` and `G[\ZZ32\]` equal in walk's subtyping; D, the value's run-time type the trait; E, wait for the switch-over; F, the expected type into inference; G, write the static argument. Decision 1.

## What the specification settles

The specification gives a numeral's and a string literal's types (`literals.tex:57`; `:159-165`, the interpreter "gives such a numeral the type ℤ32") and walk's inference "from the run-time types of the arguments" (`inference.tex:234-236`); it names no `Int`, `FlatString` or the other seven, so a run-time type of `3` is `ZZ32` and of `"s"` is `String`. It says nothing of walk's message text or of `Reflect`.

## Programs run old against new

Each under walk, `bin/fortress P.fss` from `tmp/rung-walk-language-types/probe/` (scratch, not kept); the base's output from the worktree before the edit, the new after the build.

- P1 (`kind`, `instanceOf`, `Just`, `filled`, `openRange`, `typeOf`, `ilkName`): base `1 Any Any Any Any`, `2 false false`, `3 false true`, `4 Int Cell[\Int\] FlatString (Int,FlatString)`, `5 ZZ32 Cell[\ZZ32\] FlatString`; new `1 ZZ32 ZZ32 RR64 String`, `2 true true`, `3 true true`, `4 ZZ32 Cell[\ZZ32\] String (ZZ32,String)`, `5 ZZ32 Cell[\ZZ32\] FlatString`.
- P2 (`c: Cell[\String\] = Cell(z)` at top level): base 'Type mismatch binding Cell[\Int\] (type Cell[\Int\]) to c (type Cell[\String\])'; new 'Type mismatch binding Cell[\ZZ32\] (type Cell[\ZZ32\]) to c (type Cell[\String\])'.
- P3 (`s: String = z` at top level): base 'Type mismatch binding 3: ZZ32 (type Int) to s (type String)'; new 'Type mismatch binding 3: ZZ32 (type ZZ32) to s (type String)'.
- P4, new only: `typecase` of `3` and of `z: ZZ32` with arms `Int`, `ZZ32`, `else`: 'Int arm Int arm'; `Cell(z).ilkName` 'Cell[\ZZ32\]', `Cell("s").ilkName` 'Cell[\String\]', `"s".ilkName` 'FlatString'; `<|z, z|>` 'ArrayList[\ZZ32\]', `<|"a", "b"|>` 'ArrayList[\String\]'; `Cell(w)` for `w: ZZ64` 'Cell[\ZZ64\]', `Cell((z, w))` 'Cell[\(ZZ32,ZZ64)\]'; `BIG MAX <|1, 2, 3|>` 3, `PROD <|1, 2, 3|>` 6; `<|"a", "b"|> < <|"a", "c"|>` true.
- P5, new only, what stays: `l: List[\RR64\] = <|1.0, 1.0|>` 'RHS expression type ArrayList[\FloatLiteral\] is not assignable to LHS type List[\RR64\]' (row 20); `SUM <|1.5, 2.5|>` 'Failed to find any matching overload, args = (ArrayList[\FloatLiteral\])' (row 432's float example); `instanceOf[\AnyVector\](filled(0.5))` false (row 721's float numeral); `a: BoxK[\ZZ64\] = wrapK(3)` 'RHS expression type BoxK[\ZZ32\] is not assignable to LHS type BoxK[\ZZ64\]' (row 510, its message renamed); `g(z)` for `g(x: String)` 'Unification error: Closure/Constructor for g param 1 (x:String) got arg 3: ZZ32 of type ZZ32'.
- P6 and P7, new only, what remains of rows 717 and 824: lists of `Shape` holding `Circle`s, 'Unification error: Closure/Constructor for body param 1 (i:List[\Shape\]) got arg ArrayList[\Circle\] of type ArrayList[\Circle\]' and 'RHS expression type PureList[\Circle\] is not assignable to LHS type List[\Shape\]', now the two new `XXX` tests.

## The messages that now print a trait

Measured: `LHSEvaluator`'s 'RHS expression type ... is not assignable' (P5, row 510), `BuildEnvironments`' 'Type mismatch binding ...' (P2, P3, `LanguageTypeRefusedBindingWalk`), `OverloadedFunction`'s 'Failed to find any matching overload, args = ...' (the three keys; P5), `NonPrimitive`'s 'Unification error: ... got arg 3: ZZ32 of type ZZ32' (P5, `LongStringTestsOrig`). By reading, every other message that prints an `FType` or an object's text, the review's section 3 list (`types/FType.java:553`, `:576-583`, `:595`, `:616`, `:626`; `Evaluator.java:106`, `:115`; `BuildEnvironments.java:230`, `:764`, `:785`; `BaseEnv.java:317`; `LHSEvaluator.java:102`; `values/Coercions.java:227`; `glue/prim/ReflectMethod.java:93`), and the text a glue class bound over `String` receives for a non-flat string (row 846). No message's site was edited; `LHSEvaluator.java` and `OverloadedFunction.java` are untouched.

## The stages and the ladder

The stages: STAGE_BLIND. Every path the rung adds or changes (`git diff --name-only b430f9f42800e98b0c9848edd654a78b0808dd15`, and `git status --short` empty) is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/` (`EvaluatorBase.java`, `types/FTraitOrObject.java`, `types/LanguageTypes.java`), `ProjectFortress/src/com/sun/fortress/interpreter/glue/` (`prim/ObjectPrims.java`), `ProjectFortress/tests/` and `explorations/`; neither the count nor the distance can move, and neither ran.

The ladder subset: empty. No file of the baseline's `raw/` (`explorations/compile-ladder/baseline-2026-09-19/raw/`, 85 files) names anything the rung touched (`grep -rlE 'EvaluatorBase|FTraitOrObject|ObjectPrims|LanguageTypes|inferAndInstantiate|traitOf|ilkName|interpreter\.evaluator'` prints nothing): the compiled path runs none of walk's evaluator, so no driver ran.

The demos and `ant testSpecData` are the gather's and the gate's (the brief).

## Sentences made false

The specification: none (the review, section 4; `inference.tex:233-275`, `:384-405`, `reductions.tex:27-43` say "run-time types", never `Int`). No Appendix I effect names walk's `Int` instance.

The record, for the gather:

- F-74: "Walk instantiates a generic at it, so a `Box[\Int\]` is a type apart from `Box[\ZZ32\]` and dispatches past it (row 364)." (`explorations/coordinator/FACTS.md:71`); and its title's "a generic's static argument take[s] [its] type from the values" holds only read at the trait.
- F-328: "and walk still instantiates generics at the run-time class (F-74)" (`FACTS.md:152`).
- F-229: "Under walk, a type parameter inferred from a `ZZ32` value is `Int`, the one type that `ZZ32` comprises (row 364), and one inferred from a `ZZ64` or `RR64` value is that value's run-time class. Such a type parameter gets a plain array, where the specification gives a vector (row 721)." (`FACTS.md:253`).
- F-55: "`a: BoxK[\ZZ64\] = wrapK(3)` infers `T` from `3` as `Int` and is refused, since no coercion converts a `BoxK[\Int\]` (row 510)" (`FACTS.md:52`): it infers `ZZ32`, and no coercion converts a `BoxK[\ZZ32\]`.
- F-228: "a comprehension that no declared type reaches is built at its elements' run-time class, as `ArrayList[\Int\]`, which a declared `List[\ZZ32\]` refuses (rows 20, 717)" (`FACTS.md:218`): it is built at the join of its elements' run-time types read at the trait, so `ArrayList[\ZZ32\]`; the refusal stays for objects of an extender (row 717).
- F-285: its test `tests/XXXPureListStridedSubscriptWalk` is `tests/PureListStridedSubscriptWalk`, and "`PureList`'s ... still does (row 824)" holds for objects of an extender only (`FACTS.md:122`).
- The skill: `.claude/skills/fortress-repo/references/interpreter.md:23`, the bullet "Walk gives an integer numeral the Java class `Int`, `Long` or `BigNum` by its value, and a generic built from a number value instantiates at that class. So `Cell(3)` is a `Cell[\Int\]`, ... its error messages say `Int` (ledger row 364). For the same reason, `array1` and `array2` at an inferred element type give a plain array ... (ledger row 721)."; `references/revival-changes.md:89`, "Walk today builds a generic from it at its own class instead (row 364; `interpreter.md`)" and "(rows 364, 721, 943, 944)"; `references/revival-changes.md:48`, "Walk takes it (row 364)", still true, its row closed.

## Points to report

None holds the push; each is reversible.

1. The helper as written and each read that calls it: `interpreter/evaluator/types/LanguageTypes.java:1-97` (`traitName` `:45-50`, `numberTraitName` `:53-56`, `traitOf` `:62-80`, `declaringComponent` `:86-96`); calls at `EvaluatorBase.java:602`, `:783`, `:937`; `traitName` at `FTraitOrObject.java:190`; `numberTraitName` at `ObjectPrims.java:55`.
2. Where a type's text is made: `FTraitOrObject.java:184-193`; `Reflect`'s text through `Reflect.java:434-437` unedited; the messages that now print a trait (section above); the three keys before and after (section "The tests").
3. `LongStringTests.fss:121` and `:141`, before and after (section "The tests").
4. Each `XXX` test promoted (six, section "The tests"); rows closed: 364, 721, 722, and 432 on the merged tree (below); narrowed with their whole new lines in `record.md`: 717, 824, 20, and 432 if the merged tree still refuses its float example; rewritten for a renamed message or text: 510, 846; 774's notes.
5. Tests whose verdict changes in `ant testSystem`: none turned red (793 run, 0 failures). Against the base: the six promoted run as plain tests and pass, the three `TupleOrder*Refused` tests and `LongStringTests` pass with their new keys and lines, `NativeGlueNonFlatStringWalk` passes with its new line, and two new plain tests pass; no other `XXX` test began to pass (each would be red).
6. Every sentence made false: section above (F-74, F-229, F-328, F-55, F-228, F-285; `interpreter.md:23`, `revival-changes.md:89`, `:48`).
7. Files edited beyond those named: `ProjectFortress/tests/NativeGlueNonFlatStringWalk.fss:13` (a revival test, decision 7); the two new `XXX` tests (decision 12). No edit of `LHSEvaluator.java`, of `OverloadedFunction.java` or of the library; `Reflect.java` is named and needed no edit.

## Decisions

1. Way A, the trait read at inference's three reads (fork G1), not B (every instance made at the trait at `FTypeGeneric.make`, `GenericConstructor.make`, `FGenericFunction.make`, `GenericMethod.make`), which identifies two types a program can name (`types-vals-vars.tex:51-52`), nor C (`G[\Int\]` equal to `G[\ZZ32\]` in subtyping), D (the value's type the trait, which changes every number dispatch and how natives carry `self`, against F-74), E (wait for P-12), F (the expected type into inference, row 510's repair, which fixes typed bindings only) or G (write the argument). Evidence: the review, section 2; the batch record's fork G1.
2. The helper's form: a table of name, trait and declaring component, the trait found as the `FTypeTrait` of its name among the object's transitive supertypes. Not the object's single `extends` entry, which the review proposes for the five: `FlatString` extends `{ String, DelegatedIndexed[\Char, ZZ32\] }` (`Library/FlatString.fss:34`) and `CatString` reaches `String` only through `Concatenable` (`Library/String.fss:33`, `:75`); not a lookup of the trait by name in the library's environment (`Driver.getFortressLibrary()`), which ties the helper to the library's load; not names alone, which would map a program's own `FlatString` (row 877's case). Evidence: `tests/NativeHelperUncarriedSelfFlatStringWalk.test` still green (testSystem).
3. Tuples mapped element by element through the memo `FTypeTuple.make`, so `(Int,FlatString)` reads `(ZZ32,String)` (fork G2's "also inside tuples"; the review's J6). Generic instances are not mapped inside: an instance a program writes, `Cell[\Int\]`, stays its own type (way B not taken).
4. `FloatLiteral` not mapped (fork G2): N gives a float numeral its default before inference; on this tree `Cell(0.5)` stays a `Cell[\FloatLiteral\]`, as the checker gives it (F-57).
5. The text at `FTraitOrObject.toString` (fork G3), not at each message's site, not at `FType.toString` (the base class, whose subclasses for traits and objects override it), not by editing `FObject.getString` (`values/`, not this rung's). So every text of the nine, messages, `Reflect` and an object value's text, prints the trait.
6. The ilk keeps a string object's own name: `ObjectPrims.ilk` prints a trait or object by `getName()` (`ObjectPrims.java:64`), the five numbers by their traits as before. The way not taken, the ilk printing `String` for the four, breaks a team test (`tests/StringTests.fss:82`, `hello.ilkName` is `"FlatString"`, the team's line, 5a68404fd) and `tests/StringPieces.fss:34`, `:41`, `:45`, `:50`, `:110`, and F-328 records the ilk of strings as their names. So `"s".ilkName` is `FlatString` while `typeOf("s").toString` is `String` (forCurator 2).
7. `NativeGlueNonFlatStringWalk.fss:13` respelled `"String"`, the glue's new text for a `CatString`: the test records row 846's departure as it stands (home 3), and the text it receives is the type's text, which fork G3 changes. The way not taken: keep `CatString` there by having `FObject.getString` print the object's own name, an edit of `values/FObject.java` beyond the rung's files that would also leave the nine's object text in messages unchanged.
8. Not mapping `EvaluatorBase.java:660` and `:766` (section "Where the fix belongs"): the brief names three reads only, and by reading they are reached only where the three already decide or cannot.
9. Fork G3's "A type a program names, as a `typecase` arm `Int` or `BigNum`, keeps its name" read as: such a type keeps its name and identity (its `getName()`, its `typecase` arm, `NumberPrintTest.fss:32`'s `BigNum` arm), not its text. A type's text is made in one place for the type object, which a written `Int` and the class of `3` share, so a message about a written `Int` prints `ZZ32`: the base's `LongStringTests` after the change, '(x:Generator[\ZZ32\]) got arg ArrayList[\ZZ32\]' (forCurator 1). The way not taken: carry a written-ness on each type text, which no type object has.
10. The refused binding's message as a test of its own with `load_exception_contains`, at top level, since walk's refusal is a Java error that no `catch` sees; the key `(type ZZ32) to s (type String)` names no class (the batch's rule).
11. `LanguageTypeInstancesWalk` asserts the numeral cases the rung's section lists (`Cell(3)`, `instanceOf[\Cell[\ZZ32\]\](Cell(3))`, `Just(3)`, `SUM <|1, 2, 3|>`, `typeOf(3)`), beside a computed twin of each (`Cell(z)`, `Just(z)`, `SUM <|z, z|>`, `typeOf(z)`), though the batch's first rule asks no test to assert a static argument of a generic built from a numeral under walk: the rule is written for the rungs that meet G's change ("N gives the value, G the instance", `CLIMB-BATCH-29.md:657`), and on the merged tree N's default makes such a numeral a `ZZ32` before inference (fork N7, `CLIMB-BATCH-29.md:355`). The way not taken: computed values only, which leaves row 364's own example, `Cell(3)`, unasserted (forCurator 3).
12. Rows 717 and 824 narrowed, not closed: their integer and string cases pass, but the mechanism remains for objects of an extender of a declared trait (P6, P7), which the specification settles (a comprehension's type is its expression's, `comprehensions.tex`, "Comprehensions"), so each gets a gated `XXX` test in this change (home 2).
13. Row 432 closed with `LanguageTypeInstancesWalk` where the merged tree passes `SUM <|1.5, 2.5|>` (N's default makes the float numeral an `RR64`), else narrowed to that example by its new line; row 721 closed though `filled(0.5)` stays plain on this tree, the float numeral being N's: the brief says both close, and this tree measures only their integer and computed cases.
14. The promoted names, by topic: `InferredIntegerBindingWalk`, `ArrayInferredElementVectorWalk`, `OpenRangeInferredIndexWalk`, `NestedComprehensionDeclaredTypeWalk`, `InferredStringStaticArgWalk`, `PureListStridedSubscriptWalk`; none collides (grep of both corpora and `ProjectFortress/src/com/sun/fortress/`).
15. `LongStringTests.fss:121` and `:141` respelled `Generator⟦ZZ32⟧` (fork G5), the value each checks kept.

## Defects and their homes

- Row 364, both halves: home 1, `LanguageTypeInstancesWalk`, `InferredIntegerBindingWalk`, `InferredStringStaticArgWalk`.
- Row 721 (its `ZZ32` case): home 1, `ArrayInferredElementVectorWalk`, `LanguageTypeInstancesWalk`.
- Row 722: home 1, `OpenRangeInferredIndexWalk`, `LanguageTypeInstancesWalk`.
- Row 432's integer cases: home 1, `LanguageTypeInstancesWalk`; its float example: N's default, else home 3 as the row stands (the specification silent, the row's citation), a ledger row only, since a test of today's refusal would turn red on the merged tree.
- Row 717's integer case: home 1, `NestedComprehensionDeclaredTypeWalk`; what remains: home 2, `XXXNestedComprehensionObjectElementsWalk`.
- Row 824's number and string cases: home 1, `PureListStridedSubscriptWalk`; what remains: home 2, `XXXPureListStridedSubscriptObjectsWalk`.
- Row 20's integer and string displays: home 1, `LanguageTypeInstancesWalk` (`SUM <|1, 2, 3|>`); its float example stays the row's, reproducer none (N's).
- The messages printing walk's classes (row 364's messages half, the review's section 3): home 1, `LanguageTypeRefusedBindingWalk`, the three keys, `LanguageTypeInstancesWalk`'s `typeOf` lines.
- No new defect: P5's lines are rows 20, 432, 721 and 510 as they stand.

## For FACTS

- **Under walk, a value of the five native number objects or of the four string objects is read at its trait where walk infers a static argument, and walk's type text prints each of the nine by its trait.** `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` of `FortressBuiltin` read and print as `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64`; `FlatString`, `CatString`, `EmptyString` and `SubString` as `String`; also inside tuple types; each told by its declaring component (`interpreter/evaluator/types/LanguageTypes.java`), at `EvaluatorBase`'s three reads and in `FTraitOrObject.toString`. So `Cell(3)` is a `Cell[\ZZ32\]`, `Cell("s")` a `Cell[\String\]`, `<|1, 2, 3|>` an `ArrayList[\ZZ32\]`, `typeOf(3).toString` `ZZ32`, and messages print `ZZ32` where they printed `Int`. The types keep their names: a `typecase` arm `Int` still matches `3`, and the ilk still names a string object by its own name, `FlatString`. A float numeral stays a `FloatLiteral`. What it means: rows 364, 721, 722 close, and walk's instances agree with the checker's for computed values. Test: `tests/LanguageTypeInstancesWalk`. Detail: this report, "What changed and why".

## Commands worked out

- The base's `LongStringTests` on the new code: `git show b430f9f42:ProjectFortress/tests/LongStringTests.fss`, its component renamed `LongStringTestsOrig`, run through `harness-one.sh` from `tmp/`.
- An `XXX` test's deliberate fix from a copy under `tmp/` with the same file name, run through `harness-one.sh`, leaving the tree's file as it is.
