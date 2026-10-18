# Rung X of climb batch 18: conditional extension in the compiled checker, for the list comparisons' site

problem: the distance stage's site `LexicographicOrder`'s `a CMP b` over an unbounded `E`, 'Could not check call to operator CMP ... is not applicable to an argument of type (E, E)', class G1, row 634's list half: explorations/compile-ladder/gate/distance-sites.tsv:13
spec: lists "use lexicographic order when used to compare lists whose elements support these same comparison operators": Specification/basic/operators/opr-overview.tex:294-295
precedent: the where-clause probe's B.3 shadow (`/home/user/fortress-probe-where`, its TypeAnalyzer, KindEnv, Decls and TypeWellFormedChecker lines), placed on rung L's `constraintBounds` and rung A's reading of a parent that opens: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:116-131
deviation: a conditional parent is read on the way up as the case reads its other parents, rung A's `throughParent` in the main trait-type case and plain `pSub` in the case of a trait that opens sizes, where the probe added conditional parents to the main case only, by plain `pSub`: ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:291
deviation: the rule of which entries are conditional is one function, `KindEnv.extendsConditions`, read by both `isConditional` and `withExtendsConditions`; the probe's `withExtendsConditions` took the trait constraints of any clause that binds no variable, also one that holds other constraints, which its `isConditional` read as unconditional: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:184-188
deviation: a third new member in TypeAnalyzer, `withConditionalParents`, shared by the two cases, beside the brief's `isConditional` and `conditionalParents`: ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:956-962
deviation: the second pass answers a type with no entry under a `where` clause before reading its static arguments (not in the probe): ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:938-939
deviation: `List` keeps an element-wise `=` outside the condition, which the probe did not add, and the conditional entry is written on a second line of the `extends` clause: Library/List.fss:106-107
deviation: no decision record; the Appendix I entry points to this report for its full reasoning, as the brief allows only REPORT.md and record.md under explorations/: Specification/appendices/changes.tex:198-200
historical: TypeAnalyzer.scala, KindEnv.scala, Decls.scala and TypeWellFormedChecker.scala under ProjectFortress/src/com/sun/fortress/scala_src/, Library/FortressLibrary.fsi, Library/FortressLibrary.fss, Library/List.fsi, Library/List.fss, Library/PureList.fss, Specification/basic/trait-parameters.tex and Specification/appendices/changes.tex, each in the team's tree at a874948ac (`git cat-file -e a874948ac:<path>`): Specification/appendices/changes.tex:156

Branch `wip/rung-checker-conditional-extension`, from `db8fecd22`. Commits: `fae60b135` (the tests, before the fix), `a2a068aac` (the change, correct), `ea8b4bf36` (the second pass), `e8a842d97` (the specification), `706db7314` (record.md). The worktree was seeded by `seed-worktree.sh` from the base build (exit 0). This report's write was refused by the harness; its text is the run's result.

## 1. What changed, and why

**The checker** (P-151, built from the where-clause probe's B.3 and re-based onto climb batch 17's rungs A and L):

- `TypeAnalyzer.parents` leaves out an `extends` entry whose `where` clause binds no variable and holds trait constraints only (`isConditional`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:919-932`). `conditionalParents` gives each such entry at the type's static arguments with its conditions there, a pair `(X, B)` for each `X extends B` (`:934-950`). `withConditionalParents` adds to the answer of `s <: t` through `s`'s parents the answer through each conditional parent, `pAnd(conditions, through(p))`, a formula, so an inference variable a condition names is bounded by it (`:952-962`). The main trait-type case keeps rung A's reading of a parent that opens, now named `throughParent`, and reads a conditional parent the same way (`:303-315`); the case of a trait that opens sizes reads its conditional parents too, by `pSub` as it reads its other parents (`:290-291`). With no conditional parent the answer is the one the base computed, untouched.
- `KindEnv.extendsConditions` is the one rule of which entries are conditional, and `KindEnv.withExtendsConditions` adds a declaration's conditions to its own `where` clause (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:179-203`), so that rung L's `constraintBounds` (`:116-131`) reads them as bounds.
- Decls' trait and object cases check the members with the conditions holding (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:87-89`, `:134-136`), and TypeWellFormedChecker's trait and object declaration cases check the `extends` clause and the members' types with them holding (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:193-194`, `:204-205`). Without the second, the condition's own `Ord[\E\]` was ill formed ('The static argument E does not satisfy the corresponding bound Ord[\E\]', the base's run in section 2).

**The library** (the tuple-comparisons judgement's way 3; the batch record's question 2 by its default, one entry under `StandardTotalOrder`; calls 6 to 8):

- `LexicographicOrder[\T extends LexicographicOrder[\T,E\], E extends StandardTotalOrder[\E\]\]` (`Library/FortressLibrary.fsi:1344`, `Library/FortressLibrary.fss:2058`), so that `a CMP b` over `E` at `FortressLibrary.fss:2063` resolves through `StandardTotalOrder`'s `CMP`.
- `trait List[\E\] extends { AnyList, ZeroIndexed[\E\], LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] } }` (`Library/List.fsi:67-68`, `Library/List.fss:106-107`), and `PureList`'s `List` the same without `AnyList` (`Library/PureList.fss:41-42`). `ZeroIndexed[\E\]` is written outside the condition, as the probe found it must be (without it 22 sites came: `|l|`, `generate`, `filter` lost where `E` is unbounded, the probe's B.3).
- `opr =(self, other: List[\E\]): Boolean`, with `LexicographicOrder`'s body (`Library/FortressLibrary.fss:2067-2069`), on `List` outside the condition (`Library/List.fsi:83-85`, `Library/List.fss:124-128`): without it a list of pairs, not ordered, would have only the identity `opr =(a:Any, b:Any)` on the checker (the judgement, way 3; `NumberOrderListDeclarations.fss:48`). `PureList`'s `List` gets none: the brief names `List.fsi` and `List.fss` only, `PureList` reaches the checker's count through no api (the count's table has no `PureList` row) and its own api is ill formed (row 355).
- The team's comment "a hack to avoid the error of overloaded methods", above the generic `distribute` since climb batch 17, removed (`Library/FortressLibrary.fss:3231`; the team's tree has it at `:2865` of `a874948ac`), call 8.

How the checker and walk read the two `=` of a list: where `E extends StandardTotalOrder[\E\]` holds, a `List[\E\]` has its own `=` and `LexicographicOrder`'s, both at the parameter type `List[\E\]`; `List`'s is declared in the subtype, so it is the more specific, and the count stage reports no overloading error on the pair (section 6). Where the condition fails, only `List`'s applies on the checker. Walk reads the extension at every instance (NEW-X-2), so it sees both `=` at every element type and dispatches to `List`'s, which has the same body: no walk value moves (section 8).

**The specification**: a paragraph, an example and a box in `Specification/basic/trait-parameters.tex`, "Where Clauses" (`:368-391`), and the Appendix I entry "Conditional extension" (`Specification/appendices/changes.tex:156-242`), section 9.

## 2. The tests, failing and passing

Written first, committed in `fae60b135` before the edit was built:

- `ProjectFortress/compiler_tests/CondExtendChecker.fss` and `.test` (typecheck): a pair is ordered when its elements are, and a vector adds when its elements do. The probe's file.
- `ProjectFortress/compiler_tests/XXXCondExtendRefuseChecker.fss` and `.test` (compile, keyed on 'File XXXCondExtendRefuseChecker.fss has 2 errors.'): a pair of functions is not ordered and a vector of strings does not add. The probe's file.
- `ProjectFortress/tests/XXXConditionalExtensionTypeTestWalk.fss`: a type test of an instance whose static argument fails the clause answers false, under walk (NEW-X-2).

The failing run, on the base's code, before the edit was first built (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests CondExtendChecker.test XXXCondExtendRefuseChecker.test`, 2026-10-18T00:51:25Z, tree db8fecd22):

    ProjectFortress/compiler_tests/CondExtendChecker.fss:18:73-78:
        Ill-formed type: Ord[\E\]
    File CondExtendChecker.fss has 4 errors.
    2) ProjectFortress/compiler_tests/XXXCondExtendRefuseChecker(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 2,  Failures: 2,  Errors: 0

The walk test on the base's code (`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/XXXConditionalExtensionTypeTestWalk.fss`, 2026-10-18T00:51:34Z, tree db8fecd22), an expected failure at the second assertion:

    FAIL: a Boolean: true =/= a Boolean: false; a box of integers does not show, since ZZ32 does not extend Shows
     OK Saw expected exception
    OK (1 test)

The same walk test shown red once, its second assertion changed for one run to expect `true` and then restored (the first XXX test this rung adds that records a defect; `harness-one.sh $PWD/tmp/h1 ...`): "Missing expected failure", "Tests run: 1,  Failures: 1,  Errors: 0".

The passing runs, after the last change of code (`ea8b4bf36`):

- `ONE_JVM=1 .../junit.sh pass1 ProjectFortress/compiler_tests` over the two new tests and the open-type, NatOpen and where-bound tests (17 files): "OK (17 tests)", with "typecheck ProjectFortress/compiler_tests/CondExtendChecker  OK" and "File XXXCondExtendRefuseChecker.fss has 2 errors. ... Saw expected failure".
- `ant testSystem`: " interpret .../ProjectFortress/tests/XXXConditionalExtensionTypeTestWalk  OK Saw expected exception"; `ant testQuick`: " typecheck .../compiler_tests/CondExtendChecker  OK (time = 74ms)" and " compile .../compiler_tests/XXXCondExtendRefuseChecker  Saw expected failure" (section 7).

The library part's test is the distance stage, before and after, site by site (section 6).

## 3. Where the fix belongs, and the precedent

- The place: the checker's subtype relation on trait types (`TypeAnalyzer.pSubInner`, `parents`) and the kind environment a declaration is checked in (`STypeChecker.extend` with the declaration's `where` clause, `KindEnv.extend` with `constraintBounds`), by `explorations/coordinator/map/modules-and-phases.md` B.6 (type checking). The library's half is `List`'s `extends` line and `LexicographicOrder`'s static parameters.
- The precedent followed: the probe's B.3 lines, line by line, for `isConditional`, `conditionalParents`, the formula in the trait-type case, `withExtendsConditions` and the four call sites; rung L's `constraintBounds` (`KindEnv.scala:116-131`), which reads a declaration's trait constraints as bounds and so reads the added conditions with no change; rung A's reading of a parent that opens (`TypeAnalyzer.scala:303-310` at db8fecd22), kept and applied to the conditional parent. No earlier repair of the same defect exists: the team's checker never read an `extends` entry's clause (`TypeHierarchyChecker.scala:89`, `:125`, `:172` at a874948ac, "TODO: Extend to handle non-empty where clauses."), and the probe's shadow is the only attempt, so there are no other sites in a precedent file to count.
- The ways the language and the library offer for the list half, from the judgement's section 2 and the probe's A.2.4: bound `LexicographicOrder`'s `E` alone (way 1c: every list needs an ordered element, against P-42); a `typecase` per element type (way 7); an `Any` fallback (way 6); moving the order to bounded top-level operators (way 2, `Set`'s shape); conditional members (way 4); conditional extension (way 3, taken by the curator's answer).
- The library's own practice for the `=`: `LexicographicOrder`'s `=` (`FortressLibrary.fss:2065-2069`), with its doc comment, copied onto `List` (P-27).

## 4. What the specification settles

- Lists are compared lexicographically when their elements support the comparison (`Specification/basic/operators/opr-overview.tex:293-295`); after the change this holds of the compiled checker for totally ordered elements.
- A lexicographic order "may be partial or total depending on whether the ordering of the elements is partial or total" (`Specification/advanced-lib/algebraic-constraints.tex:519-522`): not built; the checker gives no order to a list of partially ordered elements, the batch's question 2 by its default, stated in the Appendix I entry's Effect.
- The meaning of an `extends` entry's `where` clause was stated nowhere (the grammar only, `Specification-1.0-frozen/basic/traits.tex:83`); the revision box now states it, by P-151.
- The front matter's "where clauses and conditional extension" among the features not yet supported (`Specification/fortress/preamble.tex:95`) stays true: walk and the compiled run time read the extension at every instance (NEW-X-2), and the code generator refuses a declaration's own `where` clause (row 701).

## 5. Old against new

| program | old (base build, `old-fortress.sh`) | new |
|---|---|---|
| `CondExtendChecker` typecheck | 4 errors ('Ill-formed type: Ord[\E\]', 'No such method E.lt.', the same for `Add`) | OK |
| `XXXCondExtendRefuseChecker` compile | 4 errors (the declarations') | exactly 2, at `less(Lst[\Fn\]...)` and `sum(Vec[\String\]...)` |
| `CondExtendChecker`, compiled and run, and under walk | refused by the checker | `true`, `false`, `PASS` on both paths |
| NEW-X-1's program (`tmp/newx1/CondExtendMember.fss`), compile | 2 errors, 'Ill-formed type: Ord[\E\]', 'No such method E.lt.' | exits 0; the run dies, 'NoSuchMethodError: 'com.sun.fortress.compiler.runtimeValues.FBoolean CondExtendMember$Fn.lt(CondExtendMember$Fn)''; walk, 'Cannot find definition for method lt given receiver Fn' |
| NEW-X-2's program compiled (`tmp/newx2/CondExtendTypeTest.fss`) | 1 error, 'No such method E.show.' | prints `true`, `true`; walk prints `true`, `true` |
| the 32 walk tests of lists, `where` clauses and generators (`harness-one.sh`, list in section 7) | green (the tree passes) | "OK (32 tests)" |

So the change lets the compiled path compile a declaration whose `extends` entry carries a `where` clause where the checker refused it before because a member needed the condition; the code generator's class extends the entry's type at every instance (NEW-X-2), and a member called where the condition fails dies at link time (NEW-X-1). A program whose members needed no condition compiled before too: the code generator's behaviour is unchanged.

NEW-X-1's program: `trait Ord[\T extends Ord[\T\]\] lt(o: T): Boolean end`, `object Fn(f: ZZ32 -> ZZ32) end`, `object Lst[\E\](a: E, b: E) extends { Ord[\Lst[\E\]\] where { E extends Ord[\E\] } } lt(o: Lst[\E\]): Boolean = a.lt(o.a) end`, `inc(n: ZZ32): ZZ32 = n + 1`, `run(): () = println(Lst[\Fn\](Fn(inc), Fn(inc)).lt(Lst[\Fn\](Fn(inc), Fn(inc))))` (the probe's `XXXCondExtendMemberChecker`, renamed). NEW-X-2's program: the walk test's declarations with `println(shows(Box[\Word\](Word("w"))))` and `println(shows(Box[\ZZ32\](1)))`.

## 6. The count and the distance

**The count** (the after run is the timed `pass` run of section 7, on the final code, copied to `tmp/rung-checker-conditional-extension/checker-count-postedit.txt`; before is `explorations/compile-ladder/climb-batch-17/gate/checker-count.txt`). `diff` of the two tables:

    14,15c14,15
    < #total	31
    < #locations	30
    ---
    > #total	30
    > #locations	29

**The distance** (`explorations/coordinator/tools/distance/run.sh tmp/rung-checker-conditional-extension/distance-postedit.txt tmp/rung-checker-conditional-extension/dist-post`, 155 s, load at start 4.36), against `explorations/compile-ladder/climb-batch-17/gate/distance.txt`, by `explorations/coordinator/tools/distance/compare.sh`:

    DISTANCE DOWN   35 -> 34 (-1)
        kind typecheck               32 -> 31     (-1)
        class G1                      1 -> 0      (-1)  generic code with no bound compares its values (tuples' <, CMP; LexicographicOrder)
        unit component FortressLibrary     33 -> 32     (-1)

Site by site, `tmp/rung-checker-conditional-extension/dist-post/errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv`, by row (location and kind, the old lines mapped across the edit: `FortressLibrary.fss` after `:3232` one line up, `List.fss` after `:106` one down and after `:122` six down): 35 rows before, 34 after; gone: `FortressLibrary.fss:2063` (typecheck, G1); came: none. Every other row's message is unchanged with its positions masked. Row 634's last site is gone.

## 7. The checker's time, and the suites

Machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, FORTRESS_THREADS=1, every run under `nice -n 19`, beside rung K's agent. The command, for each `N` (`base` in a call set up for `/home/user/fortress-base18`, the others in this tree): `time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N`.

| run | code | load at start | seconds | total | locations |
|---|---|---|---|---|---|
| base | db8fecd22 (the base build) | 0.38 | 76.4 | 31 | 30 |
| change | a2a068aac | 0.70 | 72.4 | 30 | 29 |
| pass | ea8b4bf36 | 8.96 | 76.5 | 30 | 29 |

The timing is a smoke test; the three are within the noise of one another, the `pass` run under another agent's load.

- `base` against `change`: the tables differ by the total and the locations only (section 6). The two `run.txt` files, each tree's path replaced by `TREE`, differ in the 27 lines of the `:2063` error, which is gone, in the error count ('has 31 errors' to 'has 30 errors'), and in the line numbers of the positions in `FortressLibrary.fss` after `:3232`, each one line up (`:4369` to `:4368`, `:4375` to `:4374`, `:4394` to `:4393`, `:4395` to `:4394`, `:4541` to `:4540`, `:4545` to `:4544`, `:4557` to `:4556`), moved by the removed comment line; nothing else.
- `change` against `pass`: the tables are equal (`diff` prints nothing) and the two `run.txt` files, paths replaced, are byte-equal (`cmp` prints nothing).

**The profile and the second pass.** A JFR recording of the count stage's checker on `change` (`java -Xmx4g -Xss64m -XX:FlightRecorderOptions:stackdepth=2048 -XX:StartFlightRecording=filename=tmp/prof/change.jfr,settings=profile,dumponexit=true -Dfortress.caches=tmp/prof/caches -Dfortress.analyzer.overload.cache=false -cp "tmp/count/change/classes:$CP" WorldFlip Library/FortressLibrary.fss`), counted by a `jdk.jfr.consumer` program: 5,170 samples; `TypeAnalyzer.conditionalParents` inclusive 26 (0.50 %), its callees `typeCons` 10, `toListFromImmutable` 6, `STraitType.unapply` 4, self 5; `pSubInner` inclusive 1,505 (29.1 %). The top frames (`jfr view hot-methods`): `Walker.walkCases7$` 5.47 %, `Walker.walkCases0` 3.85 %, `BoxesRunTime.equals2` 3.79 %, `Walker.walkCases2` 3.66 %, `ASTGenHelper$.scalaify` 3.56 %, `Statics.anyHash` 3.40 %; the new code is not among them. The pass: `conditionalParents` answers a type none of whose entries has a `where` clause before it reads the type's static arguments or converts the entries (`TypeAnalyzer.scala:936-939`). On a recording of the same run with the pass's class first on the class path, 6,355 samples, `conditionalParents` is 15 (0.24 %), of which `typeCons` 11, the lookup that `parents`' memo also makes. The pass reuses no answer, so no audit of reuse applies.

**The memo keys** (the brief's point). Every memo that can hold an answer through a conditional parent keeps every input that answer reads:

- `traits.memoParents` (`TraitTable.scala:118-121`), keyed by the type: `parents` now leaves out conditional entries by `isConditional`, which reads the trait table's index only.
- `pSubMemo` (`TypeAnalyzer.scala:97`), keyed by `(x, y, negate, history)` in one analyzer, whose kind environment is fixed: a conditional answer reads `conditionalParents(s)` (the table and `s`) and `pSub(X, B)` for each condition, which reads `X`'s bounds from that environment.
- The shared ground answers (`TraitTable.scala:138-148`), which store only `True` or `False` computed with no read of the environment or the history: a condition `pSub(X, B)` whose `X` is a type variable reads its bound through the type-variable cases, which call `traits.readContext()` (`TypeAnalyzer.scala:174`, `:202`, `:239`), or through a hit in the analyzer's own memo, which counts as a read (`:117`); an opened type's bound is read through `staticParam` (`:1017-1019`, a read). So an answer that read a type variable's bound under a condition is never shared, and one over ground arguments depends on the table and the question alone. A condition over an inference variable gives a formula, never shared.

**The suites.**

- `ant testQuick` on `change` (a2a068aac): BUILD SUCCESSFUL, 6 minutes 4 seconds; CompilerJUTest 1,254, LibraryJUTest 86, OtherCompilerJUTest 263, no failure or error. On `pass` (ea8b4bf36): BUILD SUCCESSFUL, 5 minutes 27 seconds, the same counts, no failure or error. The landed gate had 1,251 compiler tests; this rung adds two `.test` files.
- `ant testSystem` on ea8b4bf36: BUILD SUCCESSFUL, 3 minutes 35 seconds; shards 156 + 169 + 161 + 164 = 650, no failure or error (the landed gate's sum 649; this rung adds one test).
- `ant testSpecData` on ea8b4bf36: BUILD SUCCESSFUL, 59 seconds, 130 tests, no failure.
- The walk tests the brief names, run on a2a068aac through `harness-one.sh` (`AnyListElementTypeWalk ArrayListQuick ComparisonLazyLexico Generator2Test GeneratorDeclarations GeneratorNullPointer GeneratorSize ListNullPointer ListTest NestedListComprehensionWalk NumberOrderListDeclarations OverrideAfterWhereBoundWalk(.test) OverrideConditionalExtensionWalk OverrideObjectExpressionWhereBoundWalk PureListQuick SequentialGeneratorMap SkipListTest UnwrittenListMapComprehensionWalk WhereBoundOverloadWalk XXXConditionalExtensionTypeTestWalk XXXLexicoUnorderedRungH XXXOverrideNothingConditionalExtensionWalk(.test) XXXWhereVariableMemberWalk atomicList conditionalExtension conditionalGenerator generatorTest parametricListCompr whereTest ResultBoundsRungB OpenTypeWalk GenericMethodBesideConditionedMethodWalk`): "OK (32 tests)"; all ran again in `ant testSystem` on the final code.

**The ladder subset.** Its `subset.txt` holds the 61 files whose recorded first error in `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` names `LexicographicOrder`, an undefined `ImmutableArray`, a `where` clause, conditional extension, an `extends` clause, an inherited abstract method, a `comprises` clause or a cycle of the hierarchy; none is in the gate's 85, so each is compared with the baseline's row. The drivers were copied under `tmp/rung-checker-conditional-extension/ladder/` (`run-subset.sh`, then `classify.py`), run after the edit only. No file moved its phase: no DOWN, no MISSING, no UP. The first error's text moved in 25 files. In 22 that import `List` it went from 'LexicographicOrder is undefined.' to 'ZeroIndexed is undefined.', at `List.fsi`'s `extends` line, whose `ZeroIndexed[\E\]` now comes first (the compiler's prelude has neither); these are the change's own. In `GenericFnWithExcludes`, `IntMapTest` and `XXXextendOprParam2` the old code gives the same new first error (`old-fortress.sh /home/user/fortress-base18 ... compile tests/X.fss`: 'Could not check call to function g', 'ImmutableArray is undefined.', the `NamedOp` cast), so the change does not cause them.

**Competing declarations.** `grep` of `ProjectFortress/src/com/sun/fortress/` for `isConditional`, `conditionalParents`, `withConditionalParents`, `throughParent`, `extendsConditions` and `withExtendsConditions` outside the four edited files finds none. Of both test corpora and the library for the components `CondExtendChecker`, `XXXCondExtendRefuseChecker` and `XXXConditionalExtensionTypeTestWalk` it finds none. Of the library for another `opr =(self, other: List[...])` it finds none.

## 8. Walk

The library change moves no walk value that a test sees: `ant testSystem` and `ant testSpecData` pass whole, and no walk test or specification example changes its verdict. Walk reads `List`'s conditional entry at every instance, as it read the unconditional one, and checks neither `LexicographicOrder`'s new bound nor the condition: lists of pairs, functions and `()` still load and compare (`NumberOrderListDeclarations`, `ResultBoundsRungB`). A list's `=` under walk now dispatches to `List`'s own, with `LexicographicOrder`'s body. NEW-X-2 records that walk does not read the condition; building that would take the `<` of a list of tuples or floats away under walk (call 5).

## 9. The specification's text

- `Specification/basic/trait-parameters.tex:368-391`: a paragraph, the example of `List`, and `\revision{revival-conditional}{...}`.
- `Specification/appendices/changes.tex:156-242`: the entry "Conditional extension" (`\seclabel{revival-conditional}`), after "Where-clause variables in extends clauses": the change, its rationale (the decision of 16 October 2026, the peers, the grammar, the text on lists, the team's internal note at `Specification-1.0-frozen/appendices/internal-document.tex:538-543`), the alternative not taken, its Effect on each path (the checker as built; no order for a list of partially ordered elements, against `algebraic-constraints.tex:519-522`; members callable where the condition fails, NEW-X-1; walk and the compiled run time at every instance, NEW-X-2; the code generator's compile of such an entry and its refusal of a declaration's own clause, row 701), the original text and route C.
- The build (`cd Specification/fortress && ./ant genSource && ./ant tex`): both BUILD SUCCESSFUL; the label resolves (`\newlabel{sec:revival-conditional}{{I.1.3}{607}...}` in `fortress.aux`); the log holds no line "LaTeX Warning: Reference", "! Undefined control sequence" or "multiply defined" (`grep -c` of those lines prints 0; the skill's looser `grep -c 'Reference .* undefined\|...'` prints 42, every match inside the log's trace of macro definitions, `x@warning {Reference `#1' on page ...`). Cleaned with `git clean -fXq -- Specification`.
- The front matter's paragraph on the revision (`Specification/fortress/preamble.tex:54-64`) stays true.

## 10. The other readers of a type's extends clause, and what each does with a conditional parent

Through `parents`, which leaves it out:

- `TypeAnalyzer.ancestors` (`TypeAnalyzer.scala:964-968`): no conditional ancestor. So instantiation exclusion's `checkP` (`:536-537`) does not compare a conditional ancestor's static arguments. The overloading checker's `above` (`OverloadingChecker.scala:143-148`), which lets a concrete functional method implement an abstract one of a trait above its declarer, does not see a trait that is above only conditionally. The solver's heuristic that tries a single lower bound's ancestors (`Formula.scala:609`) does not try one. Nor do the hierarchy check of an object expression (`TypeHierarchyChecker.scala:92`) and `Functionals.scala:434`, `:1343`.

Reading the `extends` clause directly, at every instance:

- `TypeAnalyzer.excludesClause` (`TypeAnalyzer.scala:999-1014`) and `ExclusionOracle.transitivelyExcludes` (`ExclusionOracle.scala:184-190`): a type inherits a conditional parent's `excludes` clauses at every instance.
- `TypeHierarchyChecker`: `checkDeclSelfParams` (`:119`), `checkDeclAcyclicity` (`:206`), `checkAcyclicity` (`:242`) and `checkDeclComprises` (`:288-360`), the last with an analyzer that has the static parameters but not the conditions; `everyKnownSubtypeListed` (`:401`) and `extendsContains` (`:443`), the extender checks, read the entry as extended.
- `STypesUtil`: `mapOverAllSupertraits` (`:1265-1290`), the members a type inherits (`:1494-1497`, `:1771`, `:1812`) and the override relation's supertraits (`:1687-1689`): a member inherited through a conditional parent is a member at every instance. With `Decls.commonInheritedMethods` (`Decls.scala:102`, `:150`), which gives the bodies the inherited methods in scope, this is NEW-X-1's mechanism.
- Outside the checker: walk's type hierarchy (`Constructor.boundsUnread`, NEW-X-2) and the code generator's class, which extends the entry's type at every instance (NEW-X-2's compiled face; section 5).

None of these moved a result on the library (the count and distance of section 6). They are listed, not changed, as the brief asks.

## 11. Sentences made false

In the specification, none: no `\revision` box, `\note` or Appendix I Effect says what the paths do with an `extends` entry's `where` clause. `Specification/appendices/changes.tex:1596-1597` ("The code generator does not yet compile a trait with a where clause or read a size off an argument at a call") speaks of a trait's own clause and stays true.

In the record (revival-change material, for the gather):

- F-243, "Of the distance's 13 `where`-clause sites, 12 are cleared, and the 13th, the list comparisons' site, waits on conditional extension": the 13th is cleared (record.md gives the correction).
- F-244, "The narrow `where` forms, built in the checker except conditional extension": conditional extension is built.
- `explorations/reviews/open-asks-2026-10-16.md:68`, "The compiled checker skips `where` clauses on `extends` entries, and the code generator refuses every declaration that carries a `where` clause": the checker reads them now. The code generator also compiled, before this change, a declaration whose `extends` entry carries one wherever the checker accepted it (section 5); it refuses a declaration's own clause.
- Row 634's notes, "`List[\E\] extends LexicographicOrder[\List[\E\],E\]` at every element type": the row closes.
- Row 701's claim, "the code generator refuses every function, object and trait declaration that carries a `where` clause": not of a clause on an `extends` entry (NEW-X-2's notes).
- P-151's "Still to build: conditional extension" (record.md, "For POSITIONS and PLAN").

## 12. Points to report

- The distance and count tables before and after, site by site: `:2063` gone, no site came (section 6).
- Each count run's seconds (base 76.4, change 72.4, pass 76.5), and how every memo key that can hold a conditional answer stays whole (section 7).
- The other readers of a type's `extends` clause and what each does with a conditional parent (section 10).
- No walk test or specification example changes its verdict, and no walk value moves (section 8).
- NEW-X-1 and NEW-X-2, with their programs and outputs (section 5; record.md).
- The team lines changed in the library: `LexicographicOrder`'s static parameters (`Library/FortressLibrary.fsi:1344`, `Library/FortressLibrary.fss:2058`), `List`'s `extends` line (`Library/List.fsi:67-68`, `Library/List.fss:106-107`), `PureList`'s (`Library/PureList.fss:41-42`), the comment at `:3232` removed (`Library/FortressLibrary.fss:3231`), and the structural `=` added (`Library/List.fsi:83-85`, `Library/List.fss:124-128`).
- The specification text added (section 9); no sentence made false in it, and the record's sentences made false (section 11).
- No checker file edited beyond the four named, and no walk edit: the edits are in `TypeAnalyzer.scala`, `KindEnv.scala`, `Decls.scala` and `TypeWellFormedChecker.scala`. Within `TypeAnalyzer.scala` the edit reaches the case of a trait that opens sizes (`:290-291`), beside the case the brief names, and adds a third member, `withConditionalParents` (decisions 2 and 5).
- The compiled path now compiles and runs a program with a conditional extension that the checker refused before, its class extending the entry's type at every instance, and a member called where the condition fails dies with `NoSuchMethodError` (section 5): a run-time face of NEW-X-1 that the brief's reading did not name.

## 13. Decisions

1. **The conditional parent read through rung A's reading.** Taken: in the main trait-type case a conditional parent goes through `throughParent`, the same reading as any other parent, so a comprising parent at a type `where`-clause variable is not opened on the way up whether or not it is conditional. Not taken: the probe's plain `pSub(p, t)`, which would open such a conditional parent, the reading rung A refused (row 752). Evidence: rung A's comment (`TypeAnalyzer.scala:303-305`); no library type has such a parent, so the count is the same either way.
2. **Conditional parents in the case of a trait that opens sizes too.** Taken: `withConditionalParents` there, by `pSub` as that case reads its parents. Not taken: the main case only, as the probe did, under which `parents` leaving the entry out would drop it entirely for a trait with a `comprises` clause at a size, a regression from the base, which read it unconditionally. Evidence: `TypeAnalyzer.scala:290-298`; nothing in the library has the shape, so no count moves.
3. **One rule for which entries are conditional.** Taken: `KindEnv.extendsConditions`, read by `isConditional` and `withExtendsConditions`. Not taken: the probe's two predicates, under which a clause that binds no variable but holds a constraint other than a trait constraint (as `conditionalExtension.fss`'s `where { ninf AND pinf AND NOT nan }`) was unconditional for the subtype relation and yet had its trait constraints assumed in the body. Evidence: the probe's diff of `KindEnv.scala` and `TypeAnalyzer.scala`; B.6's "Only constraint-only clauses are treated as conditional"; call 7.
4. **The second pass: a fast path, not a memo.** Taken: answer a type with no entry under a `where` clause before reading its static arguments. Not taken: a memo of conditional parents on `TraitTable` beside `memoParents` (keyed by the type, whose hash costs about what the lookup it saves costs; a fifth checker file and an audit of reuse); no pass (the profile showed 0.50 %). Evidence: the profile's callees of `conditionalParents` (section 7).
5. **A third member in TypeAnalyzer and a second in KindEnv.** Taken: `withConditionalParents` shared by the two trait-type cases, and `extendsConditions` shared by the two readers of the rule. Not taken: the formula written in each case and the predicate in each file. Evidence: the two call sites, `TypeAnalyzer.scala:291` and `:315`.
6. **The structural `=` on `List` only, not on `PureList`.** Taken, as the brief names `List.fsi` and `List.fss`. Not taken: the same `=` on `PureList`'s `List`. Evidence: no api of the count's or the distance's table is `PureList`'s; its api is ill formed (row 355). The gap: a `PureList` list of pairs has only the identity `=` on the checker, the day `PureList` is checked.
7. **`ZeroIndexed[\E\]` written before the conditional entry, on the same `extends` clause.** Taken, as the probe and the brief give it. Its one visible effect: the compiled path's programs that import `List` now stop at 'ZeroIndexed is undefined.' instead of 'LexicographicOrder is undefined.', the same phase (section 7).
8. **NEW-X-1 as a row only, its reproducer none.** Taken, as the brief says ("A refusal not made has no green expected failure"). Not taken: a gated run-time pair, `CondExtendMemberLink.test` (`link`) and `XXXCondExtendMember.test` (`run`), which `tests-writing.md`, "How a defect is recorded", home 2, names for a program the checker accepts and that fails linkage at run time, as this one does (`NoSuchMethodError`, section 5). The brief holds where it and the skill differ; the curator may want the pair (section 15).
9. **NEW-X-2's compiled face in the same row, with no compiled test.** Taken: the row names both paths and the compiled program's output. Not taken: a compiled `XXX` run pair beside the walk test. Evidence: the brief names one walk test; the skill asks the row to say which paths show the defect.
10. **No decision record.** Taken: the Appendix I entry points to this report. Not taken: `decision-record.md`, which the skill's revision form names, since the brief allows REPORT.md and record.md only, with a decision record only if the section asks for one, and it does not.
11. **The timed `pass` run is the brief's after run of the count.** Its table and log are copied to the paths the brief names (`tmp/rung-checker-conditional-extension/checker-count-postedit.txt`, `cc-post`, `count-run.txt`), not run again on the same code.
12. **Running beside a batch.** Every run under `nice -n 19`, one JVM command of mine at a time, reading the brief's "two agents running at a time" as the batch of `session.md`.

## 14. Defects, each with its home

- `FortressLibrary.fss:2063`, the list comparisons' site (row 634's list half): home 1, repaired; `CondExtendChecker` and `XXXCondExtendRefuseChecker` assert the rule, and the distance stage shows the site gone. Row 634 closes.
- NEW-X-1, a member checked under the condition is callable where it fails: home 3 by the brief (the row, reproducer none, its program and outputs in the notes), though the compiled run's linkage failure would allow home 2 (decision 8).
- NEW-X-2, walk and the compiled run time read the extension at every instance: home 2, `ProjectFortress/tests/XXXConditionalExtensionTypeTestWalk.fss` (an expected failure, shown red when its second value was changed), and its row.
- A `fortress typecheck` writes the program's `analyzed_cache` entry, and a later `fortress compile` of the unchanged source then writes no jar and exits 0 silently. Measured on NEW-X-1's program: `bin/fortress typecheck CondExtendMember.fss`, then `bin/fortress compile CondExtendMember.fss`, exit 0, no `CondExtendMember.jar`; `bin/fortress run CondExtendMember` says 'Could not load CondExtendMember'. With the entry removed, the compile writes the jar. Not this rung's area, and not searched in the ledger to a row: listed for the gather (section 15).

## 15. For the curator

- NEW-X-1's home: its compiled run dies at link time, `NoSuchMethodError`, which the skill's home 2 covers with a gated run-time pair; the brief asked for the row only (decision 8, section 5).
- NEW-X-1 itself: the rule as accepted lets a member checked under the condition be called where it fails; scoping such members, as Swift, Rust and Haskell do, waits on row 748.
- The silent compile after a typecheck (section 14): a tool defect of `fortress compile`'s reuse of a `typecheck` entry, for the ledger if no row holds it.
- `PureList`'s `List` has no structural `=` (decision 6).
- Row 701's claim overstates: the code generator compiles a declaration whose `extends` entry carries a `where` clause; the row is at 1,204 characters and takes no note (NEW-X-2's notes carry it).

## For FACTS

record.md's entry, and the corrections to F-243 and F-244.

## Commands worked out

- **Profile shares by frame.** A single-file Java program over `jdk.jfr.consumer.RecordingFile` that counts the `jdk.ExecutionSample` events whose stack holds a frame whose class and method contain a string, inclusive and self. A second program tallies the frame just above such a frame (its callees). Run with `java Frames.java <file.jfr> <substring>...`; kept in the session's scratch folder, not committed.
- **A compiled run of a program after `typecheck`:** remove its `analyzed_cache/<Name>-*.tfs` entry from the caches first, or the compile writes nothing (section 14).
