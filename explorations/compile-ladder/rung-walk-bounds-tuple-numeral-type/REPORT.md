<!-- Climb batch 36, rung G (rung-walk-bounds-tuple-numeral-type): walk keys an object's generic dotted methods by their bounds, reads a tuple result element by element at every instance of a generic declaration, and refuses at load a numeral type written as a return, a variable's or a field's type (rows 1125, 1122, 1124). -->
# Rung G: three of walk's departures

- problem: the planner's probe on the base, `explorations/compile-ladder/plan-36/probes/fixes-36.md:12` (row 1125, a wrong answer) and `:13` (row 1122, a refusal at load); row 1124's reproducer, `explorations/fortress-gap-ledger.md:732`
- spec: `Specification/basic/expressions/literals.tex:263-266` (a numeral type is written only as a parameter's type, "never as the type of a variable, a field or a functional's result"); for rows 1125 and 1122 none in basic or basic-lib (`grep -rln 'overloading-static-params\|Declarations with Static Parameters' Specification/basic Specification/basic-lib` prints nothing): the governing passage is `Specification/advanced/overloading.tex:531-571`
- precedent: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:911-930` at b5a758846d (`belowAtObjectArguments`, a tuple result element by element); `OverloadedFunction.java:2764-2790` at b5a758846d (`methodDeclaredBelow`, a symbolic instance's generic method inferred from its declared domain); `Constructor.java:902-906` at b5a758846d (`genericKey`); `BuildEnvironments.java:1211-1246` at b5a758846d (`checkNumeralTypesWritten`, `refuseNumeralType`) and `scala_src/typechecker/TypeWellFormedChecker.scala:67-71` (the checker's `numeralTypeWritten`)
- deviation: the key writes a bound's names without their apis (`Constructor.java:955-957`); the load check reads two generic dotted methods' symbolic instances on their declared domains only where one lies inside the other, and leaves the Meet Rule's pairs to the parameter-by-parameter check (`OverloadedFunction.java:1126-1149`); an object's value parameters count as fields (`BuildEnvironments.java:1249-1258`, after `Specification/basic/objects.tex:291`)
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java`, `Specification/appendices/changes.tex`, `Specification/basic/inference.tex`

One launch worked this rung; the worktree was seeded by `seed-worktree.sh` (exit 0, 3 s) and the branch pushed. Commits on `wip/rung-walk-bounds-tuple-numeral-type`: `f091a9e573` (the tests), `d2ec1ec544` (the three fixes), `bc8330a285` (the key's names without apis; three cases added to the bounds test), `0b2141429f` (the specification), and this report's commit.

## 1. What changed and why

**Row 1125 (fork G1).** An object instantiates each generic method of a name at symbolic static arguments, one instantiation per key (`Constructor.java:203-216`). The key held the name and the static parameters' kinds, so `tk[\U extends Number\](y: U)` and `tk[\U extends ZZ32\](y: U)` shared one instantiation, their instances one signature, and `putIfAbsent` kept the first met. `genericKey` (`Constructor.java:906-926`) now writes, for each static parameter, its kind and its bounds: each bound through `BoundWriter` (`:933-962`) as the classes and names of its nodes, nested, with every reference to one of the method's own static parameters written as its position, names without their apis, a bound of `Any` dropped, the bounds sorted. So `Generator`'s `map[\G\]` and `Indexed`'s `map[\R\]` still share a key, and an object's redeclaration at the same bound under another name still hides the trait's; two methods that differ in their bounds get instances of their own.

With two instances, walk's load check met a pair that its parameter-by-parameter check refuses: the first build of the key alone refused the test's `Nested` at load, 'tk[\U extends FortressLibrary.ZZ32\](y:U) ... and tk[\U extends FortressLibrary.Number\](y:U) ... have parameters with generic type, at least one pair of parameters must have excluding types' (section 2, the run after the first build). P-45 has walk judge two generic declarations by the checker's rules on their declared domains. So `validOnDeclaredDomains` (`OverloadedFunction.java:795-801`) reads a pair of two generic dotted methods' symbolic instances through the new `methodPairValid` (`:1126-1149`): the No Duplicates Rule where each declared domain lies inside the other, the Return Type Rule where one does, through `returnRuleAtEveryInstance`; a pair neither of whose domains lies inside the other is not read there and keeps the parameter-by-parameter check, as before. `methodInstanceHolding` (`:1156-1169`) finds the instance of a symbolic instance's generic method that holds a domain as `methodDeclaredBelow` does at a call (`:2864-2890`, the same inference from values that carry only types), and `symbolicStatics` (`:1176-1181`) gives `returnRuleAtEveryInstance` the static arguments of either kind of declaration. A call then chooses as rung L built it (`preferredDeclaration`, F-405): `Nested.tk(n)` for a `ZZ32` answers 3.

**Row 1122 (fork G2).** `returnRuleAtEveryInstance` (`OverloadedFunction.java:1364-1378`) refused a returned type other than the type parameter itself, `if (rOut != p) return false`. Its test of a returned type parameter moved into `belowAtEveryInstance` (`:1392-1427`), which reads a tuple result element by element, as `belowAtObjectArguments` does at object arguments (`:911-930` at b5a758846d): an element that does not mention the parameter is left to the comparison with the instance that holds the inner domain (`genericPairValid`, `f.getRange().subtypeOf(gHolding.getRange())`). The precedent repaired one of the two Return Type Rule readings of `OverloadedFunction.java` that compare a result at a static parameter; this was the other, the only other site.

**Row 1124 (fork G3).** `checkNumeralTypesWritten` (`BuildEnvironments.java:1212-1261`) read the types that a trait or an object extends, a trait's `comprises` clause and the static arguments. It now also reads a function's or a function expression's return type (`forFnHeader`, `:1238-1242`), a variable's and a field's declared type (`forLValue`, `:1244-1248`: a top-level, local or field declaration, `var` or not, abstract or not), and an object's value parameters (`forObjectDecl`, `:1250-1258`), each whole, so that a numeral type inside a tuple or an arrow there is refused too (`refuseNumeralTypesIn`, `:1264-1272`), with the message of an `extends` clause, 'NaturalNumeral cannot be written in a program except as a parameter's type.' A function's own parameter types stay unread, as in the checker (`TypeWellFormedChecker.scala:48-71`). Walk runs this check (`Driver.java:227`) before it binds the top-level variables (`Driver.java:249`), so `tests/NumeralTypeNoValueWalk`'s top-level `three: NaturalNumeral[\1, 10, 3\] = 3` is now refused at load, before its numeral binds: its pinned message changes from 'Type mismatch binding 3' to that refusal (a reserved point, section 7).

## 2. The runs: failing on the base, passing after

The first run, through the harness on the base's code, before any edit of code and before the first build (tests renamed and written, the tree at b5a758846d):

    echo "Expected failure: GenericMethodBoundsDifferWalk red, 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; a ZZ32 takes the declaration bounded by ZZ32, the more specific'"
    echo "Expected failure: GenericPairTupleReturnWalk red, refused at load, 'Overloading of ident[\T extends Round\](x:T):(T, FortressLibrary.ZZ32) ... fails the Return Type Rule'"
    echo "Expected failure: NumeralTypeReturnTypeWalk red, 'Missing expected refusal at load' after its line 'REACHED: a numeral type is a return type'"
    echo "Expected failure: NumeralTypeVariableTypeWalk red, 'Missing expected refusal at load' after its line 'REACHED: a numeral type is a local variable's type'"
    echo "Expected failure: NumeralTypeFieldTypeWalk red, 'Missing expected refusal at load' after its line 'REACHED: a numeral type is a field's type'"
    echo "Expected failure: NumeralTypeObjectParameterWalk red, 'Missing expected refusal at load' after its line 'REACHED: a numeral type is an object's value parameter type'"
    echo "Expected failure: NumeralTypeNoValueWalk red, refused when its numeral binds, 'Type mismatch binding 3', a message without the pinned 'NaturalNumeral cannot be written in a program except as a parameter's type'"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-bounds-tuple-numeral-type/h-base \
      ProjectFortress/tests/GenericMethodBoundsDifferWalk.fss ProjectFortress/tests/GenericPairTupleReturnWalk.fss \
      ProjectFortress/tests/NumeralTypeReturnTypeWalk.fss ProjectFortress/tests/NumeralTypeReturnTypeWalk.test \
      ... (the variable, field, object-parameter and no-value tests, each .fss with its .test)

    # harness-one 2026-11-24T03:26:09Z; tree b5a758846d; nproc=4; load 1.61 0.85 1.93; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    Overloading of ident[\T extends Round\](x:T):(T, FortressLibrary.ZZ32)GenericPairTupleReturnWalk.fss:11:1-51 and ident[\T extends Shape\](x:T):(T, FortressLibrary.ZZ32)GenericPairTupleReturnWalk.fss:10:1-50 fails the Return Type Rule: the first is more specific, and its return type is not found to be a subtype of the return type of every instance of the second that applies to its arguments
    FAIL: a ZZ32: 2 =/= a ZZ32: 3; a ZZ32 takes the declaration bounded by ZZ32, the more specific
    Type mismatch binding 3: ZZ32 (type ZZ32) to three (type NaturalNumeral[\1,10,3\])
    REACHED: a numeral type is a field's type
     Missing expected refusal at load
    Tests run: 7,  Failures: 7,  Errors: 0

Each failed as echoed: the return, variable, field and object-parameter tests each printed their `REACHED` line and 'Missing expected refusal at load'; NumeralTypeNoValueWalk: 'Refused at load, but did not satisfy load_exception_contains'.

After the first build of the three edits (key, tuple, numeral types), the same seven: six passed, and GenericMethodBoundsDifferWalk failed another way, refused at load, '... have parameters with generic type, at least one pair of parameters must have excluding types' (section 1, row 1125): its cause, the parameter-by-parameter check meeting the two instances, was settled by `methodPairValid` before the next run.

Three cases were added to GenericMethodBoundsDifferWalk after the fix (`bc8330a285`): a trait's generic method beside an object's at another bound, and two traits' at two bounds. Seen failing through the base build's harness on the old code (`FORTRESS_HOME=/home/user/fortress-wsuite /home/user/fortress-wsuite/explorations/compile-ladder/rung-inference-walk/harness-one.sh ...`; the base build's head `4b0e3abd6a` has the base's `ProjectFortress/` and `Library/`), first the whole test and a copy holding only the added assertions, then a copy holding only the two traits' assertions:

    echo "Expected failure (old code): GenericMethodBoundsDifferWalk red, 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; a ZZ32 takes the declaration bounded by ZZ32, the more specific'"
    echo "Expected failure (old code): GenericMethodBoundsInheritedCopy red, an exception at the trait-and-object pair's ZZ64 call, 'Meet(ZZ64, ZZ32) not a singleton', the trait's declaration dropped"
    # harness-one 2026-11-24T03:43:11Z; tree 4b0e3abd6a; nproc=4; load 3.38 5.02 3.78; ...; cache empty
    com.sun.fortress.exceptions.InterpreterBug: ... GenericMethodBoundsInheritedCopy.fss:46:12-22:
    ** bug! Meet(ZZ64, ZZ32) not a singleton: []
    FAIL: a ZZ32: 2 =/= a ZZ32: 3; a ZZ32 takes the declaration bounded by ZZ32, the more specific
    Tests run: 2,  Failures: 2,  Errors: 0

    echo "Expected failure (old code): GenericMethodBoundsTwoTraitsCopy red, one of the two traits' declarations dropped: a wrong answer, or an exception at the ZZ64 call"
    # harness-one 2026-11-24T03:43:33Z; tree 4b0e3abd6a; ...
    FAIL: a ZZ32: 2 =/= a ZZ32: 3; a ZZ32 takes one trait's declaration bounded by ZZ32 beside the other's
    Tests run: 1,  Failures: 1,  Errors: 0

The last run, after the last change of code (the key's names without apis, built in `build3`), the seven through the harness:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-bounds-tuple-numeral-type/h-final <the seven tests, each .fss with its .test>
    # harness-one 2026-11-24T03:43:55Z; tree d2ec1ec544; ...; cache empty
    OK (7 tests)

The tree line names the commit before `bc8330a285`, whose one change of code, `Constructor.java`, was then built and uncommitted; `bc8330a285` committed it as built.

## 3. Walk's suite

`ant testSystem`, once on the final code state (`bc8330a285`; `0b2141429f` after it changes only the specification):

    [junit] Tests run: 215, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 321.007 sec
    [junit] Tests run: 232, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 325.367 sec
    [junit] Tests run: 225, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 338.092 sec
    [junit] Tests run: 228, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 350.833 sec
    BUILD SUCCESSFUL
    Total time: 5 minutes 58 seconds

900 tests, no failure: no test failed after the change, and walk refuses at load no line of the library and no test that it loaded before. One expected failure fails another way: `tests/XXXGenericTraitFunctionalMethodsNestedWalk.fss` (row 780) answered "shape" on the base and now stops at its object's first instance, 'at least one pair of parameters must have excluding types' (the skeptic's run, SKEPTIC.md). An earlier run on `d2ec1ec544`, a code state that the last edit replaced, also had 900 and no failure. Each JVM of the suite starts from empty caches, so walk's load check read the library in each. `bin/fortress explorations/claude_demo.fss` after the first fix, with the caches that the build had emptied, printed `SUM[i <- 1#100] i = 5050` and exited 0.

## 4. Where the fix belongs, and the precedent search

`explorations/coordinator/map/spec-to-implementation.md:214` puts walk's overload resolution in `values/OverloadedFunction.java`, and `:129` binds walk's declarations in `evaluator/BuildEnvironments.java`; the generic dotted methods' instantiation is `Constructor.java`'s (F-405). The skill's `interpreter.md`, "What walk checks", gives walk's load check as these three. No library line changes, so `library.md` has no way to follow here.

Ways the tree offers, and the one taken for each:

- Row 1125. The key could be (a) the bounds written as syntax with the method's static parameters renamed by position, taken; (b) the bounds evaluated as types in the declaration's type environment (`GenericMethod.getTypeEnv`), with a placeholder type for each static parameter, so that a bound naming a trait's static parameter reads at the trait's instance; (c) the kinds key kept, the methods of one key then grouped again by comparing their bounds as types pairwise. (b) and (c) instantiate generic bounds at placeholders, which can fail a bound's own bound and adds instances to the memo of generic types; and the case they alone read, a bound that names the trait's parameter, stops on the base and after before any key matters (row 762; `TraitParamBoundProbe`, section 5).
- Row 1125's load check: (a) read the two symbolic instances on their declared domains where one lies inside the other, taken, with the inference that a call already uses; (b) leave them to the parameter-by-parameter check, which refuses the valid pair; (c) also read their Meet Rule here: `genericMeetCovered` and `domainsExcludeTogether` read `FGenericFunction`s only, and a pair neither of whose domains lies inside the other kept the old check before this rung too.
- Row 1122: the precedent's recursion, a helper for one element (`belowAtEveryInstance`), taken; an inline loop over the elements was the other way.
- Row 1124: (a) read the return type, the variable's and field's type and the object's value parameters whole, taken, as the checker reads every place but a function's parameter (`TypeWellFormedChecker.scala:67-71`); (b) read only the type at the top of each form, which leaves `(NaturalNumeral[\1, 10, 3\], ZZ32)` as a return type loading.

## 5. Programs run old against new

Each under `tmp/rung-walk-bounds-tuple-numeral-type/probes/`, the old code by `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-wsuite <worktree>/tmp/old-caches P.fss`, or, before the first edit was built, by my worktree's own `bin/fortress`; the new by my worktree's `bin/fortress`:

- `HideProbe.fss`, a trait's `hd[\U extends Number\]` redeclared in an object as `hd[\V extends Number\]`: old and new `Hider.hd(n) = 4`.
- `MapProbe.fss`, the one library's `map` on an array with and without a static argument, on a range and on a list: old and new `array map: 11 12 13`, `array map inferred: 21 23`, `range map: 93`, `list map: 5`.
- `InheritBoundsProbe.fss`, a trait's method and an object's at two bounds, and two traits' at two bounds: old '** bug! Meet(ZZ64, ZZ32) not a singleton: []' at `Narrow.wd(m)`; new `Narrow.wd(n) = 3, Narrow.wd(m) = 2` and `Both.tb(n) = 3, Both.tb(m) = 2`.
- `TraitParamBoundProbe.fss`, `trait HiddenAt[\E\]` with `ha[\U extends E\]` and `object HiderAt extends HiddenAt[\Number\]` with `ha[\V extends Number\]`: old and new 'Missing type E' at `:5:19`, row 762's stop.
- `ObjParamProbe.fss` through `bin/fortress typecheck` (the compiled checker, which this rung does not change), an object's value parameter and an object's field of numeral type: '...ObjParamProbe.fss:4:18-41: NaturalNumeral cannot be written in a program except as a parameter's type.', the same at `:7:8-31`, 'File ObjParamProbe.fss has 2 errors.' Walk now refuses both forms (NumeralTypeObjectParameterWalk, NumeralTypeFieldTypeWalk).

The siblings, once after the fix (`d2ec1ec544`), through the harness and directly: row 1123's `tests/XXXGenericFunctionalMethodsExcludingWalk.fss` still fails, 'Failed to find any matching overload, args = (4: ZZ32,"a")'; row 1126's `tests/XXXAsIfGenericMethodOverloadsWalk.fss` still fails, 'Missing type U'. The harness: 'OK Saw expected exception' for each, 'OK (2 tests)'. Both are in the final suite run, green as expected failures.

## 6. What the specification settles, and the sentences the change makes false

`Specification/advanced/overloading.tex:531-571` reads a declaration with static parameters over every instance within its bounds, the more specific one decides, and the Return Type Rule is checked over every instance; tuple types are covariant, so a tuple result compares element by element. `Specification/basic/expressions/literals.tex:263-266` writes a numeral type only as a parameter's type, "never as the type of a variable, a field or a functional's result"; `Specification/basic/objects.tex:291` makes a non-transient value parameter of an object a field.

`grep -rn '~1125\|~1122\|~1124' Specification --include=*.tex` on the base printed `changes.tex:2426`, `inference.tex:347` and `changes.tex:3131`; each made false, each edited:

1. `Specification/appendices/changes.tex:2424-2429` at b5a758846d, before: "Of two generic dotted methods of one name, one number of parameters and static parameters of the same kinds that differ only in their bounds, it keeps the first that it meets and drops the other (row~1125); and a call on a receiver assumed at a trait, of a name that the trait overloads by two generic dotted methods, stops, since it reads their parameter types without their static parameters (row~1126)." After (`changes.tex:2424-2427`): "A call on a receiver assumed at a trait, of a name that the trait overloads by two generic dotted methods, stops, since it reads their parameter types without their static parameters (row~1126)."
2. `Specification/basic/inference.tex:345-350` at b5a758846d, the same sentence in the interpreter's box; after (`inference.tex:345-348`), the same text as 1.
3. `Specification/appendices/changes.tex:3125-3131` at b5a758846d, the sentence's last clause, before: "... so that it refuses that example (row~539); and it refuses at load, as failing the Return Type Rule, two declarations with static parameters one of whose declared domains lies inside the other's where their results are tuples that each hold the declaration's own type parameter, a pair that these rules allow (row~1122)." After (`changes.tex:3125-3126`): "... so that it refuses that example (row~539)."

Row 1124 is named in no effect. The numeral entry's sentence on walk's refusals at load, `changes.tex:5447-5448` at b5a758846d, before: "It refuses when it loads a program a numeral type written as a type that an object or a trait extends, or as a static argument." After (`changes.tex:5442-5445`): "It refuses when it loads a program a numeral type written as a type that an object or a trait extends, as a type that a trait's \KWD{comprises} clause lists, as a static argument, or in a return type or the type of a variable or of a field, an object's value parameters among the fields."

One more sentence the change makes false, not edited here: `changes.tex:5437-5446` at b5a758846d (`:5432-5441` now), "The interpreter, which has no static types, applies a coercion from a numeral type at the place's first evaluation, with the four numbers bound as values of type \EXP{\mathbb{Z}}, ...; it refuses a numeral only when the place is evaluated: ..., a folded constant at a type of a program's own without a coercion from the constant's default type, and a numeral bound to a variable declared of a numeral type." Its last item is false: such a variable is now refused at load, before any numeral binds. The words that make it true: end the list at "...from the constant's default type." Rung N rewrites the same sentence's four numbers. The skeptic's correction edits this item on the branch, four unchanged lines below rung N's edit (SKEPTIC.md).

No `\revision` callout, front-matter paragraph or decision record changes: the three edits correct the effects of Appendix I entries and a callout's account of the interpreter, and change no rule of the language.

## 7. Points to report

- **Each fix as made, by file and member.** `interpreter/evaluator/values/Constructor.java`: `genericKey` and the new `BoundWriter` (`:896-962`). `interpreter/evaluator/values/OverloadedFunction.java`: `returnRuleAtEveryInstance` and the new `belowAtEveryInstance` (`:1348-1427`); beyond the member that the section names, `validOnDeclaredDomains` (`:789-801`) and the new `methodPairValid`, `methodInstanceHolding` and `symbolicStatics` (`:1115-1181`), which row 1125's fix needs (section 1). `interpreter/evaluator/BuildEnvironments.java`: `checkNumeralTypesWritten` and the new `refuseNumeralTypesIn` (`:1203-1272`). Not edited: `accumulateGenericMethods` and the instantiation that reads the key, which read the new key as they read the old.
- **The three expected failures promoted, each failing on the base and passing after.** `tests/XXXGenericMethodBoundsDifferWalk.fss` as `GenericMethodBoundsDifferWalk.fss`, `XXXGenericPairTupleReturnWalk.fss` as `GenericPairTupleReturnWalk.fss`, `XXXNumeralTypeReturnTypeWalk.fss` and `.test` as `NumeralTypeReturnTypeWalk.fss` and `.test` (section 2).
- **Walk's suite.** No test failed after the change (section 3). No line of the library or a test is newly refused at load.
- **Each sentence of the specification made false, before and after.** Section 6.
- **P-174's sentence on row 1124, for the record-landing.** It reads: "Row 1124 holds where the tree departs: walk loading a numeral type written as a return type, a variable's or a field's type, which it refuses only where a numeral meets it." After this rung it is false. Words that make it true: "Walk refuses at load, as the checker refuses statically, a numeral type written as a return type, a variable's or a field's type, an object's value parameters among the fields." Or the sentence goes, with no departure left to name.
- **The files edited, for `STAGE_BLIND`.** `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java`, `.../values/OverloadedFunction.java`, `.../interpreter/evaluator/BuildEnvironments.java`; `Specification/appendices/changes.tex`, `Specification/basic/inference.tex`; under `ProjectFortress/tests/`: `GenericMethodBoundsDifferWalk.fss`, `GenericPairTupleReturnWalk.fss`, `NumeralTypeReturnTypeWalk.fss` and `.test` (promoted), `NumeralTypeVariableTypeWalk.fss` and `.test`, `NumeralTypeFieldTypeWalk.fss` and `.test`, `NumeralTypeObjectParameterWalk.fss` and `.test` (new), `NumeralTypeNoValueWalk.test` (repinned); and this folder. No file beyond those the section names, besides the tests; members beyond those named, above.
- **Reserved point: a pinned message changed.** `ProjectFortress/tests/NumeralTypeNoValueWalk.test:1`, before `load_exception_contains=Type mismatch binding 3`, after `load_exception_contains=NaturalNumeral cannot be written in a program except as a parameter's type`: the refusal at load comes first (`Driver.java:227` before `:249`), as the section allows. The test's program and its value are unchanged; it is a revival test (`a26e74f5c8`).
- **Reserved points not reached.** No model line changed. No line of the library or a team test is refused at load (section 3). The demos were not run (the brief leaves them to the gather).

## 8. The stages, and the compiled path

Every path the rung changes is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/`, `Specification/` or `explorations/` (`git diff --name-only b5a758846d HEAD`), so neither the count stage nor the distance stage can move; neither ran (`STAGE_BLIND`). The change is walk's only, so the interpreter's suite on the compiled path (the gate's step 7) has no program that it can make pass: no list was run.

## 9. Decisions

1. **The key writes the bounds as syntax, renamed by position**, not as evaluated types, nor by a pairwise comparison of types (section 4). Evidence: `MapProbe` and `HideProbe` alike old and new; row 762's shape stops before any key matters (`TraitParamBoundProbe`, old and new 'Missing type E').
2. **The key writes names without their apis** (`bc8330a285`), so that a trait's bound naming a type of its own component, and an object's in another component naming it through the api, key alike and the redeclaration still hides. Not taken: qualified names, which would split them. The cost: two types of one simple name from two apis key alike, which is the base's reading of every pair. No test exercises the cross-component case.
3. **A bound of `Any` is no bound, and a parameter's bounds are sorted**, so `[\G\]` keys as `[\G extends Any\]` and `{A, B}` as `{B, A}`.
4. **The load check reads two generic dotted methods' symbolic instances on their declared domains where one lies inside the other**, through the inference that a call already uses (`methodDeclaredBelow`), not through `instanceHolding`'s normalized domains, so that load and call read one relation. Not taken: the parameter check alone (it refuses the valid pair, section 2); the Meet Rule read for them too (its helpers read `FGenericFunction` only). Evidence: the run after the first build. P-45: walk judges two generic declarations by the checker's rules on their declared domains.
5. **Row 1122's element-by-element reading follows `belowAtObjectArguments`**, a recursive helper with the type-parameter test at each element.
6. **A numeral type is refused anywhere inside the three forms**, also inside a tuple or an arrow, as the checker refuses it (`TypeWellFormedChecker.scala:67-71`); and the return type of a function expression and of a local function counts, being a functional's result (`literals.tex:263-265`).
7. **An object's value parameters count as fields** (`objects.tex:291`), refused as the checker refuses them (`ObjParamProbe`, `:4:18-41`). Not taken: the narrower reading of "a field's type" as a field declaration only, which leaves walk loading what the checker refuses. A transient value parameter, which is no field, is refused too, as the checker refuses it.
8. **Each new numeral test is a form no test held**: a local variable in a function that no call reaches (the top-level variable is `NumeralTypeNoValueWalk`'s), a field of an object that is never made, an object's value parameter; the field's test writes `RadixPointNumeral`, so both names' messages are pinned in new tests.
9. **`NumeralTypeNoValueWalk`'s pinned message changed**, since the refusal at load now comes first (section 7).
10. **The three cases added to `GenericMethodBoundsDifferWalk`**, not a new test, since they are cases of its kind (the skill's tests-writing.md, "Names, comments, citations"). Seen failing on the old code through the harness (section 2).
11. **The specification's clauses taken out, as the section says**, rather than kept as dated history as earlier fixes in the same entries were (`changes.tex:2406-2415`). The brief holds.
12. **`changes.tex:5432-5441` not edited** (section 6): rung N rewrites the same sentence.
13. **The three fixes built and tested together**, not one after another as the section orders; the library-loading program (`claude_demo.fss`) ran once after them, and the suite's 900 programs each load the library cold.

## 10. Defects and their homes

- Row 1125, two generic dotted methods that differ only in their bounds: home 1, repaired; `tests/GenericMethodBoundsDifferWalk.fss` asserts the more specific declaration's answer in one object, a trait beside an object, and two traits, and the hiding redeclaration.
- Row 1122, the tuple result at every instance: home 1, repaired; `tests/GenericPairTupleReturnWalk.fss`.
- Row 1124, a numeral type as a return, a variable's or a field's type: home 1, repaired; `tests/NumeralTypeReturnTypeWalk`, `NumeralTypeVariableTypeWalk`, `NumeralTypeFieldTypeWalk`, `NumeralTypeObjectParameterWalk` and `NumeralTypeNoValueWalk`, each refused at load.
- Row 762, a trait's generic method bounded by the trait's static parameter: measured again (`TraitParamBoundProbe`, old and new 'Missing type E'), home 2 as it stands (`tests/XXXTraitBoundGenericMethod.fss`); a note in record.md on how the new key reads it.
- Rows 1123 and 1126: still fail after the fix, homes as they stand (their `XXX` tests).

The skeptic's programs measured three more, recorded in record.md: NEW-G-1, a Meet Rule set of generic dotted methods refused at load (`tests/XXXGenericMethodBoundsMeetWalk.fss`); NEW-G-2, bounds that name types of one simple name in two apis (`tests/XXXGenericMethodBoundSameNameWalk.fss`); and row 780's changed failure, its row rewritten.

## 11. Not done, and questions

- Walk's load check still does not read a numeral type written as a static parameter's bound, in an `excludes` or `throws` clause, a `where` clause, a `typecase` arm or a type ascription, which the checker refuses (`TypeWellFormedChecker.scala:67-71` refuses every place but a function's parameter) and `literals.tex:263-266` excludes. Not measured here; row 1124's notes left the forms beyond `extends`, `comprises` and static arguments to the checker once walk runs it (P-12), and the batch's fork G3 names three. A question for the curator (record.md).
- No `XXX` test was added, so no deliberate red.

## For FACTS

record.md gives F-405's new text and the corrections of F-26, F-257 and F-341.

## Commands

None that the skill does not give: the old code's harness on a copy is `worktrees.md`'s "Running the old code".
