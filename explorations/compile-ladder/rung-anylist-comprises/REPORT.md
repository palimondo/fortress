# Rung A of climb batch 17: AnyList's comprises clause live, the rest of AnyList moved into List (row 636)

- problem: the distance's four sites of row 636, `explorations/compile-ladder/gate/distance-sites.tsv:12`, `:13`, `:14` and `:46` (`List.fss:89`, `:90`, `:88` and `:179` at the base)
- spec: `Specification/basic/traits.tex:235-245` (a listed type may hold a `where`-clause variable of the declaration, at every value of it)
- precedent: the size opening, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:853-885` at the base, and walk's symbolic type parameter, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/SingleFcn.java:170-171`, `:205-217`
- deviation: the probe's parent rule is scoped to a type `where`-clause variable; a parent that opens only sizes is opened as on the base, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:303-309`
- deviation: walk's comprises check at load reads a type `where`-clause variable as standing for any type, before the environment, beyond `processWhereClauses`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1197-1198`, `:1463-1467`
- deviation: walk sets a type `where`-clause variable's bounds in a second pass, after every binding is in scope, as `SingleFcn.createSymbolicInstantiation` does, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:966-970`
- deviation: both calls of `openWhereSizes` pass the trait's static arguments, where the probe passed them in one of the two, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:852`, `:939-940`
- historical: `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala`, `Library/List.fsi`, `Library/List.fss`, `Specification/appendices/changes.tex` (all in the tree since `5a68404fd`, 2012-07-19)

## What changed and why

P-151 makes the team's comment on `AnyList` live (`Library/List.fsi:56`, `List.fss:87` at the base: "Not yet: comprises List[\E\] where [\E\]") and moves the rest of `AnyList` into `List`. The where-clause probe built the clause as a checker shadow (its REPORT, B.1). This rung takes B.1's lines only, re-based onto climb batch 16's `TypeAnalyzer`, and writes the library from the record.

- **The disambiguator** (`TypeDisambiguator.java:88-99`, `:111`, `:115-116`, `:120`, `:122`): a trait's type `where`-clause variables are in scope in its `where` clause, `comprises` clause, self type, parameters and members, not in its extends clause (`trait-parameters.tex`, "Where Clauses": a `where`-clause variable may not appear as a static argument in an extends clause). The phase is shared: on the base both paths refused the clause, "E is undefined."
- **The checker** (`TypeAnalyzer.scala`):
  - `whereSizes` (`:860-875`) returns a type binding too, as a type parameter with its binding's bounds;
  - `openWhereSizes` (`:901-915`) makes a fresh name `E#k` (`Formula.openedSizeName`, the counter the sizes use), bounded by its binding's bounds at the trait's static arguments. It registers the name in `KindEnv` and substitutes it. Both callers pass the arguments (`:852`, `:939-940`);
  - `opensTypes` (`:889-895`), new: a trait whose clause lists a type at a type `where`-clause variable;
  - the trait case of `pSubInner` (`:303-309`) does not open such a trait where it is reached as a parent of the type asked about. So `List[\E\]`, below `AnyList`, is not opened a second time to a fresh `List[\E#k\]`. A parent that opens only sizes is opened as on the base ("Decisions", 2).
  - The other code that opens reads `whereSizes`, and so takes types with no edit: the argument opening of a call (`impls/Functionals.scala:331-336`), the check of the extenders (`TypeHierarchyChecker.scala:319-323`, one inference variable per binding), `comprisedTypes` and `comprisesClause`.
- **The kind environment** (`KindEnv.scala:77-79`, `:142-155`): `EmptyKindEnv.lookup` finds an opened name in a registry at the end of `object KindEnv`, after `extractNodeBindings`, as the brief places it, apart from rung L's member after `makeFresh`. A name is registered once, with its bound, and never rebound.
- **Walk** (`BuildEnvironments.java`):
  - `processWhereClauses` (`:948-970`) binds a type `where`-clause variable as a `SymbolicInstantiatedType` with its bounds, as `SingleFcn.createSymbolicInstantiation` binds a type parameter, and sets the bounds in a second pass;
  - the comprises check at load (`ComprisesCheck`, `:1185`, `:1197-1198`, `:1463-1467`) reads such a variable as standing for any type. Without this, walk refused `object Box[\E\] extends AnyBox`: "Invalid comprises clause: AnyBox has a comprises clause but its immediate subtype Box is not eligible to extend it". The check reads the variable before the environment. A trait without static parameters has its component's environment as its interior (`BuildEnvironments.java:844`), so `processWhereClauses` binds the variable there, and the environment would answer with the symbolic type.
- **The library** (`List.fsi:56`, `List.fss:87-90`, `:173`):
  - the clause `comprises { List[\E\] } where [\E\]`;
  - `addLeft(e) = singleton(e) || self` and `addRight(e) = self || singleton(e)`, with the private `addL` and `addR` removed;
  - the list comprehension's unwrap: `cast[\CovariantCollection[\T\]\](cc).toImmutableArray()`.
  `AnyList`'s `||` stays `app(self, f)`, now accepted through the opened type. Part A's `appendAny` and `appendedTo` were not needed: the distance shows `app`'s site gone.
- **The specification** (`Specification/appendices/changes.tex:1438-1443`, `:1486-1508`, `:1537-1540`): the Effect of "The traits that extend a closed trait" says what the checker and the interpreter now do, with the departures as rows. Its Rationale names the decision, and its last item says what undoing it needs.

## The test first, then the fix

The failing runs ended before the edit was first built (`ant compileAll` started at 14:35:01 UTC).

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests OpenTypeChecker.test XXXOpenTypeEscapeChecker.test XXXOpenTypeTwoChecker.test XXXOpenTypeBoundEvidenceChecker.test
    (14:28:38 to 14:28:40 UTC, on the base's code)
        E is undefined.
    1) ProjectFortress/compiler_tests/OpenTypeChecker(...)AssertionFailedError: Must satisfy FAIL or fail should not appear in output typecheck
    2) ProjectFortress/compiler_tests/XXXOpenTypeEscapeChecker(...)AssertionFailedError: Saw wrong failure. compile
    4) ProjectFortress/compiler_tests/XXXOpenTypeBoundEvidenceChecker(...)AssertionFailedError: Saw wrong failure. compile
    Tests run: 4,  Failures: 4,  Errors: 0

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-anylist-comprises/h1 ProjectFortress/tests/OpenTypeWalk.fss
    (14:29:07 UTC, on the base's code and library)
    tmp/rung-anylist-comprises/h1/tests/OpenTypeWalk.fss:5:31:
        E is undefined.
    Tests run: 1,  Failures: 1,  Errors: 0

The brief expected walk to stop at load with "Missing type E". That was the probe's run, with its disambiguator change in. On the base, the shared disambiguator refuses first.

`AnyListElementTypeWalk` guards the element types that `AnyList`'s bodies give under walk, the probe's A.2.2 cases. It passed on the base library before the library edit (14:30:35 UTC, `OK (1 test)`).

`NatOpenThroughSubtraitChecker` is the test of the second fix, the parent rule scoped to types. It passes on the old code, and it failed on `b6cb13000`, the first change, before `c6adc85f1` was built:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base17 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/NatOpenThroughSubtraitChecker.test
    . typecheck .../NatOpenThroughSubtraitChecker  OK (time = 1927ms)
    OK (1 test)
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh subtrait ProjectFortress/compiler_tests NatOpenThroughSubtraitChecker.test XXXOpenTypeThroughSubtraitChecker.test
    (14:57:39 UTC, on b6cb13000)
        - [\nat m\]Nt[\m\]->ZZ32 is not applicable to an argument of type Mid[\3\].
    1) ProjectFortress/compiler_tests/NatOpenThroughSubtraitChecker(...)AssertionFailedError: Must satisfy FAIL or fail should not appear in output typecheck
    Tests run: 2,  Failures: 1,  Errors: 0

The passing runs are on the final code: `c6adc85f1`, built at 14:58. `fa7f66b44` adds a test and text, in the same code state.

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests OpenTypeChecker.test XXXOpenTypeEscapeChecker.test XXXOpenTypeTwoChecker.test XXXOpenTypeBoundEvidenceChecker.test XXXOpenTypeThroughSubtraitChecker.test XXXOpenTypeOverloadChecker.test NatOpenThroughSubtraitChecker.test NatOpenChecker.test XXXNatOpenKeepChecker.test XXXNatOpenOverloadChecker.test XXXNatOpenRun.test XXXWhereBoundChecker.test
    OK (12 tests)
    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-anylist-comprises/h2 <the 30 walk tests below>
    OK (30 tests)

The 30 walk tests:
- the where-clause probe's 19: `ArrayListQuick`, `CovariantTest`, `Generator2Test`, `GeneratorDeclarations`, `LibraryOverloadFamilies`, `ListTest`, `NatReflectTest`, `NumberOrderListDeclarations`, `OverrideAfterWhereBoundWalk`, `OverrideConditionalExtensionWalk`, `OverrideObjectExpressionWhereBoundWalk`, `PureListQuick`, `ResultBoundsRungB`, `WhereBoundOverloadWalk`, `XXXEmptyGroupSumRungF`, `XXXOverrideNothingConditionalExtensionWalk`, `XXXextendOprParam2`, `conditionalExtension`, `whereTest`;
- `NatOpenWalk`, `NatOpenUnlistedExtender`, `OpenTypeWalk`, `AnyListElementTypeWalk`;
- the comprehension tests: `NestedListComprehensionWalk`, `UnwrittenComprehensionDeclaredTypeWalk`, `UnwrittenComprehensionElementsWalk`, `UnwrittenListMapComprehensionWalk`, `XXXNestedComprehensionDeclaredTypeWalk`, `parametricListCompr`, `IntMapTest`.

The first `XXX` test, `XXXOpenTypeEscapeChecker`, was shown red through the harness, with its program made well typed (`asInt(b) = 1`, `y: AnyBox = same(mk())`), then restored:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh red ProjectFortress/compiler_tests XXXOpenTypeEscapeChecker.test
     Did not satisfy compile_err_contains; expected
        Can't compile TraitDecl AnyBox at ProjectFortress/compiler_tests/XXXOpenTypeEscapeChecker.fss:5.1
    Tests run: 1,  Failures: 1,  Errors: 0
    (restored) ... Saw expected failure ... OK (1 test)

## Suites, once on the final code state

The edit changes the checker (Scala), walk (Java) and a shared phase, the disambiguator. So both suites ran, and `ant testSpecData` ran because walk loads the new clause (P-124). All three ran on `c6adc85f1`'s code.

    ant testQuick      BUILD SUCCESSFUL, Total time: 6 minutes 3 seconds
                       CompilerJUTest 1230 0 0 (the gate's 1224 + 6 new); LibraryJUTest 86 0 0; OtherCompilerJUTest 263 0 0
    ant testSystem     BUILD SUCCESSFUL, Total time: 6 minutes 36 seconds
                       Tests run 157 + 154 + 162 + 159 = 632, Failures 0 (the base's 630 + OpenTypeWalk, AnyListElementTypeWalk)
    ant testSpecData   BUILD SUCCESSFUL, Total time: 1 minute 17 seconds; Tests run: 130, Failures: 0

- A testQuick started on `b6cb13000` was stopped halfway, when the size regression was found. It is no result.
- No second testQuick ran after the pass, since the pass changed no code (below).
- `XXXOpenTypeOverloadChecker` was added after testQuick, and ran in the 12-test run above.

## The checker's count and time (P-148)

Each run is `time explorations/coordinator/tools/checker-count/run.sh $W/tmp/rung-anylist-comprises/count/$N.txt $W/tmp/rung-anylist-comprises/count/$N`, all in one session, on a machine shared with rung C (load 6 to 10).

| run | tree | real | user |
|---|---|---|---|
| base | `/home/user/fortress-base17` (3aea3da53) | 76.4 s | 120.0 s |
| change, first | `b6cb13000` (superseded by the size fix) | 101.6 s | 125.9 s |
| change | `c6adc85f1`, the final code | 93.4 s | 119.5 s |
| pass | none: the profile shows no gain, so no code changed | | |

- **The tables**: `diff explorations/compile-ladder/climb-batch-16/gate/checker-count.txt` against the change's table prints nothing (`#total 39`, `#locations 38`, `#crash none`). The base run's table equals the gate's too.
- **The whole outputs**: the base's and the change's `run.txt` (the first change's as well) are equal, 178 lines each, once each tree's path is replaced by `TREE`. Row 737's error at `FortressLibrary.fss:130` is in both.
- **The time**: the difference in real time comes from the load; the user time is the same. Not a finding.
- **The profile**: JFR, `settings=profile`, of the count's driver on the final code, 6,744 samples.
  - Its top frames are the base's: `Walker.walkCases7$` 5.25 %, `ASTGenHelper$.scalaify` 4.34 %, `Walker.walkCases0` 3.97 %, `Statics.anyHash` 3.93 %, `Walker.walkCases2` 3.50 %, `BoxesRunTime.equals2` 3.48 %.
  - The change's own methods: `opensTypes` in 23 samples (0.34 %), `whereSizes` in 5, `openWhereSizes` in 2, `KindEnv.lookupOpened` in 0. `opensTypes`'s time is spent in the trait table's name memo (the key hash of `TraitTable.typeCons`).
  - No gain within the rung's declarations is worth a pass, so none was made.
- **The memo keys**: no memo was added. An opened name is fresh at each opening, and is registered once with its bound. So a key that holds `E#k` holds every input that an answer about it reads.
  - The subtype memo and the ground memo skip a question whose left type opens (`TypeAnalyzer.scala:114`, now true of a type opening too).
  - The trait case no longer opens a type-opening parent, so no fresh type arises inside a memoized question on that path.
  - The exclusion memo and the reduction memo keep no answer whose computation opened (`:426-428`, `:605-607`; the counter is shared with the sizes).
  - One way remains: an opening inside a memoized question about a compound type. The size opening has it too, and its arrow form is row NEW-A-1.
  - Audit: 13 programs with openings were typechecked with all twelve `fortress.analyzer.*.cache` switches off, and on. The outputs are equal, with the fresh-name counter masked. The 13: the rung's six compiled tests of that time, `NatOpenChecker`, `XXXNatOpenKeepChecker`, `XXXNatOpenOverloadChecker`, and the probes `ArrowType`, `ArrowSize`, `MidSize` and `MidType`.

## The distance

    explorations/coordinator/tools/distance/run.sh tmp/rung-anylist-comprises/distance-postedit.txt tmp/rung-anylist-comprises/dist-post     (on c6adc85f1, 202 s)
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-16/gate/distance.txt tmp/rung-anylist-comprises/distance-postedit.txt
    DISTANCE DOWN   49 -> 45 (-4)
        kind typecheck               40 -> 36     (-4)
        class NM                      3 -> 2      (-1)  names the api does not declare (getters and methods of Range, String, Generator)
        class OT                     12 -> 9      (-3)  other body errors (one-off library slips and checker limits)
        unit component List           5 -> 1      (-4)

By row, against `explorations/compile-ladder/gate/distance-sites.tsv`, by location and message (`dist-post/errors.tsv`):

- gone: row 636's four:
  - `List.fss:88` (`app`, "not applicable to an argument of type (List.AnyList, List.AnyList)");
  - `:89` (`addL`) and `:90` (`addR`);
  - `:179` ("No such method CovariantCollection.AnyCovColl.toImmutableArray");
- moved, not new: `List.fss:146`, "Function body has type OR(List.List[\Any\],List.List[\E\]), but declared return type is List.List[\E\].", is now at `List.fss:140`, after the six lines of `addL` and `addR` above it were removed;
- came: none.

A first run, on `b6cb13000`, read 44. The same four sites were gone, and so was row 737's error at `FortressLibrary.fss:130`, by identity-hash order (`compiler.md`, "The checker's time"). That error is back on the final code.

## Where the fix belongs, and the precedent

- `explorations/coordinator/map/spec-to-implementation.md:237` (where clauses: `KindEnv`, `TypeAnalyzer`, `BuildEnvironments.processWhereClauses`) and `:194` (`comprises`) place the fix in the files that the brief names.
- The precedent is the size opening of climb batch 13's rung N (row 664's note):
  - in the checker, `whereSizes`, `opensSizes`, and `openWhereSizes` with its two calls (`TypeAnalyzer.scala:846`, `:908` at the base);
  - in walk, the `SymbolicNat` binding (`BuildEnvironments.java:946-955` at the base).
  - Its other sites read `whereSizes`, and take types with no edit: `TypeAnalyzer.scala:114` and `:290`, `impls/Functionals.scala:331-336`, `TypeHierarchyChecker.scala:319-323`.
  - Walk's type binding follows `SingleFcn.createSymbolicInstantiation` (`SingleFcn.java:170-171`, `:205-217`).
- The unwrap's `cast` follows `List.fss:307` (`:313` at the base) and `FortressLibrary.fss:33-37`. Six other users of `covariantCompr` have the same shape. They are left as they are, being outside the distance's twelve components and outside the brief: `IntMap.fss:733`, `Map.fss:192`, `PrefixMap.fss:414`, `PrefixSet.fss:410`, `PureList.fss:100`, `Set.fss:110`.
- The bodies follow the probe's A.2.2. `singleton` is `List`'s own factory.

## What the specification settles

- `traits.tex`, "Trait Declarations" (`:235-245`): a listed type may hold a `where`-clause variable of the declaration, "which the listed type then holds at every value of"; every value of the trait is a value of a listed type.
- `trait-parameters.tex`, "Where Clauses": a `where`-clause variable may not appear in an extends clause. The disambiguator's scope keeps this rule.
- The text has a sentence on opening a size at a call (`trait-parameters.tex:106-115`), and none on opening a type. The type opening follows from the same reading of the clause and of inference, so no normative sentence changes, as the brief says.

## Programs run old against new

| program | old (base) | new (final) |
|---|---|---|
| `OpenTypeWalk` (walk) | "E is undefined." | runs, `OK` |
| `AnyListElementTypeWalk` (walk) | `OK` | `OK`, the same element types |
| `OpenTypeChecker`, the three `XXXOpenType*` refusals (checker) | "E is undefined." | accepted, and refused as keyed |
| `NatOpenThroughSubtraitChecker` (checker) | accepted | accepted (refused on `b6cb13000`) |
| probe `MidType` (checker; walk) | "E is undefined." | refused, row NEW-A-2; walk prints 2 |
| probe `ArrowSize` (checker; walk) | accepted; walk "Cannot unify ZZ32->NatParamT ... with ZZ32->Nt[\n\]" | the same, row NEW-A-1 |
| probe `ArrowType` (checker; walk) | "E is undefined." | accepted, row NEW-A-1; walk "Cannot unify ZZ32->AnyBox ..." |
| probe `OverloadType` (checker; walk) | not run | refused, "There are multiple declarations of f with the same parameter type: AnyBox"; walk prints 2 (row 682) |
| probes `LeakTwo`, `LeakTop` (walk) | not run | run: two traits of one component with `where [\E\]`, and a top-level trait `E` beside one |

The probes are scratch, under `tmp/rung-anylist-comprises/probe/`. They ran with `bin/fortress typecheck P.fss` and `bin/fortress P.fss`, with a private caches folder, and with `old-fortress.sh` for the base.

**The rung's ladder subset** (`gate.md`, "The ladder regression", with the drivers copied under `tmp/rung-anylist-comprises/ladder/`): the five files whose baseline first error names a `where` clause or a `comprises` clause, `GenericFnWithExcludes`, `NatReflectTest`, `atomicList`, `conditionalExtension` and `whereTest`. None is in climb batch 16's landed `ladder.tsv`, so they are read against the baseline's.
- `atomicList` (typecheck), `conditionalExtension` (typecheck) and `whereTest` (disambiguate) are where they were.
- `NatReflectTest` is UP, from codegen to link.
- `GenericFnWithExcludes` stays at typecheck. Its first error is now "No such method U.f.", in place of "non-type where clause bindings: Not yet implemented", because `KindEnv` has read the `nat` binding since the baseline (`KindEnv.scala:125-131`).
- Nothing is DOWN, MISSING or STDOUT.

Names added, grepped in both test corpora and in `ProjectFortress/src/com/sun/fortress/` whole: the eight component names, `opensTypes`, `registerOpened` and `lookupOpened`. No competing declaration.

## Sentences made false

- `Specification/appendices/changes.tex:1480-1486` at the base: "It does not yet open a type where-clause variable, as in List's commented clause (row 636)", and "The interpreter binds such a variable as a size when it loads the trait ...". Edited, now `:1486-1508`.
- FACTS F-244, as the brief summarises it: "no hole was measured in this form". The opening under a function type's result is a hole of this form, and of the sizes' (row NEW-A-1). F-244's own sentence, that the opened type passes the escape, two-value, and Amin and Tate tests, holds.
- FACTS F-243: its counts are the probe's and hold. With the clause live and the bodies moved, the four sites go together, which the probe had not measured.
- POSITIONS P-151's "Still to build: the batch after climb batch 16" is built for its `AnyList` part.
- Row 636's notes, "the team's comprises clause made live clears app alone": true of the probe's run. The row closes.
- `Library/List.fsi:56`'s documentation comment, "Not yet: comprises ...", is replaced by the clause itself.

## Points to report

1. **The distance**, 49 to 45, site by site above: all four of row 636's sites went; `List.fss:146` moved to `:140`; none came (`explorations/compile-ladder/gate/distance-sites.tsv:12-14`, `:46`, and `compare.sh`'s lines above).
2. **The count's seconds**: base 76.4 s; change 93.4 s (101.6 s on the superseded first change); no pass. Every memo key stays whole, by the argument above, audited on 13 programs with every switch off.
3. **The refusal tests' messages**: the same as the probe's, without its conditional extension and constraint bounds (B.2, B.3):
   - `XXXOpenTypeEscapeChecker`: "Function body has type E#7, but declared return type is ZZ32." and "Right-hand side has type Box[\E#25\], but declared type is Box[\ZZ32\].";
   - `XXXOpenTypeTwoChecker`: "Could not check call to function two - [\E extends Object\](Box[\E\], Box[\E\])->ZZ32 is not applicable to an argument of type (AnyBox, AnyBox).";
   - `XXXOpenTypeBoundEvidenceChecker`: "Could not check call to function upcast - [\A extends Object, T extends Object, B extends A\](Constrain[\A,T,B\], B)->A is not applicable to an argument of type (Witness[\U,T\], T).";
   - `XXXOpenTypeThroughSubtraitChecker`: "... is not applicable to an argument of type Mid[\ZZ32\].";
   - `XXXOpenTypeOverloadChecker`: "There are multiple declarations of f with the same parameter type: AnyBox".
4. **A walk test or a specification example whose verdict changes**: none of the gated ones (632 and 130, no failure). The new `OpenTypeWalk` goes from refused to running.
5. **Part A's `appendAny`** was not needed: `List.fss:88` is gone with `app(self, f)` kept.
6. **The sentences made false** are listed above. The Appendix I sentences edited are `changes.tex:1480-1486` at the base, now `:1486-1508`, and `:1438-1443` and `:1537-1540` are added to the same entry.
7. **Files beyond those named**: no checker file is edited beyond the four named. `BuildEnvironments.java` is edited beyond `processWhereClauses`, in its comprises check (`:1185`, `:1197-1198`, `:1463-1467`), and `TypeAnalyzer.scala` gains `opensTypes` (`:889-895`). No line of B.2 (class `KindEnv`'s extend methods, `constraintBounds`, `STypesUtil.scala`) or of B.3 (`Decls.scala`, `TypeWellFormedChecker.scala`, conditional parents, `List`'s conditional extends) is edited.
8. **The parent rule** of the brief and the probe is scoped to a type `where`-clause variable (Decision 2).
9. **A hole was measured** in the opened form, where the brief and F-244 recorded none: row NEW-A-1.

## Decisions

1. **The opening's form**: a fresh rigid type per opening, bounded by its binding (the probe's, after Papers/Types' existential opening).
   - Not taken: an inference variable, by which two values would be taken as one.
   - Not taken: the binding's bound as the type, `List[\Any\]`, which invariance refuses.
2. **The parent rule**: a parent that lists a type at a type `where`-clause variable is not opened on the way up, as in the probe, but only such a parent. A size-only parent is opened as on the base.
   - Evidence: applied to sizes, as the probe applied it, the rule refused `viaMid(x: Mid[\3\]) = size(x)`, which the base accepts (`NatOpenThroughSubtraitChecker`, red on `b6cb13000`).
   - Not taken: the probe's unscoped rule, for that regression.
   - Not taken: opening a type parent unless the type asked about is itself listed. That would accept `MidType`, but it opens inside a memoized subtype question whose key holds no trace of the opening, so two arguments of one such type would share one opened type.
   - Not taken: no rule at all. List then loses 22 sites to the second opening (the probe's B.1).
3. **Where the opened names live**: a registry that `EmptyKindEnv.lookup` reads (the probe's).
   - Not taken: threading the opened parameters through the analyzer's environment, which a subtype question cannot return.
   - Not taken: reading the bound off the name.
4. **Walk's binding**: a `SymbolicInstantiatedType` with its bounds, set after every binding is in scope (`SingleFcn`'s order).
   - Not taken: `SymbolicWhereType`, whose constructor throws "Where clauses cause a stack overflow error" (`types/SymbolicWhereType.java:30`).
   - Not taken: the probe's single pass, which reads a bound before a later binding is in scope.
5. **Walk's comprises check**: a type `where`-clause variable is a variable for any type, read before the environment.
   - Not taken: an interior environment of its own for a trait without static parameters. `BuildEnvironments.java:844` keeps the team's `containing`, and members that name the variable then find it.
   - Not taken: leaving the check as it was, which refuses `OpenTypeWalk`.
6. **The library**: the brief's bodies. `singleton(e) || self` and `self || singleton(e)` keep walk's element types (`AnyListElementTypeWalk`).
   - Not taken: Part A's `appendAny` and `appendedTo`, not needed.
   - Not taken: `addL[\Any,Any,E\]`, by which walk's result would be a `List[\Any\]` (A.2.2).
7. **The compiled tests' bound**: the compiled tests write `where [\E extends Object\]`, as the probe's do; the walk test and the library write `where [\E\]`. Before disambiguation, the compiled path bounds an unbounded static parameter by `Object` (row 412), but not a `where` binding.
8. **The second pass**: none. The profile's 0.34 % in `opensTypes` is spent in the trait table's name memo, outside the rung's declarations.
9. **NEW-A-1 as a row only**, reproducer none. The specification settles it, and walk refuses the call. But a compiled refusal test is red while the program is accepted, so no gated test can pass while the defect shows.
   - Not taken: a plain typecheck test that asserts the wrong acceptance.

## Defects and their homes

- Row 636 (the four sites): home 1, repaired. Shown by `OpenTypeChecker` (the opening), `AnyListElementTypeWalk` (walk unchanged) and the distance.
- NEW-A-1, the opening under a function type's result (sizes on the base, types now): the specification settles it (an argument whose own type is such a trait is opened), and walk refuses the call. But no gated test can pass while it shows and assert the refusal, since a compiled refusal test is red while the program is accepted. So it gets the row only: reproducer none, with the commands and outputs in its notes (`tests-writing.md`, "How a defect is recorded").
- NEW-A-2, a trait between a type-opening trait and its listed type is not opened: the text is silent on opening a type at a call. Home 3: `XXXOpenTypeThroughSubtraitChecker` (today's refusal) and the row.
- Row 682's type face: `f(x: AnyBox)` beside `f[\E\](x: Box[\E\])` is refused as duplicates; walk runs the generic one. The row is CONTESTED: home 3, `XXXOpenTypeOverloadChecker` and a note on the row.
- Row 701 (the code generator refuses a trait with a `where` clause): measured again, "Can't compile TraitDecl AnyBox", in the red run above. A note.
- By reading, not measured as a defect: walk binds a trait's `where`-clause variables in its component's environment when the trait has no static parameters (`BuildEnvironments.java:844`, `:954-963`), as it already did for sizes. The probes `LeakTwo` and `LeakTop` run, so no program was seen to observe it.

## For the gather

`Specification/appendices/changes.tex:1497` and `:1502` cite rows `NEW-A-2` and `NEW-A-1`. Put the rows' numbers there too.

The branch `wip/rung-anylist-comprises` is at `fa7f66b44`, pushed. Its commits: `920d23b08` (the tests), `3aab602c4` (the guard test), `b6cb13000` (the change), `c6adc85f1` (the parent rule scoped to types), `fa7f66b44` (Appendix I and row 682's type face). The harness refused the write of this report and of `record.md`, so both texts are in the result.
