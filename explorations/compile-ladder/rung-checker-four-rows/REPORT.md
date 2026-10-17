# Climb batch 17, rung C: four checker rows (737, 738, 739, 681)

- problem: the batch 16 review's reading of row 737, "Repairing row 737 by matching parameter types takes `:130` out for good" (`explorations/reviews/batch-16-review.md:21`); rows 737, 738, 739 and 681 (`explorations/fortress-gap-ledger.md:278`, `:421`, `:422`, `:193`)
- spec: `Specification/basic/components/type-inference.tex:29` (row 737); `Specification/advanced/overloading.tex:525-529` (row 739); `Specification/basic/inference.tex:57`, `:71` and `Specification/basic/types-vals-vars.tex:55` (row 681); row 738's message is not in the specification: `grep -rn 'Invalid overloading' Specification --include=*.tex` prints nothing
- precedent: the export check's matching of a component's declaration to an api's by `ExportChecker.equalTypes` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:431`, `:479`); rung K's per-provider set with its `implemented` filter (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:166-185`)
- deviation: the top-level set's `implemented` filter does not use the precedent's subtyping test of two instantiated trait types. The top level has no instance of the declaring traits' static parameters, so the filter instead looks for the implementing declaration's trait among the ancestors of its declaration (`OverloadingChecker.scala:141-160`); row 737's match takes no declaration where several api declarations fit a declaration that leaves out a parameter type (`ApiTypeExtractor.scala:77-83`)
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ApiTypeExtractor.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala`, `Specification/appendices/changes.tex`

Branch `wip/rung-checker-four-rows`, from the base 3aea3da53. The code's last commit is 9697e3838. The tests and the specification edit are on the branch beside it. This report could not be written there: the harness refused the write.

## 1. What changed and why

**Row 737, an api declaration chosen by its parameter types.** `ApiTypeExtractor.isExported` gave a function that leaves out its return type the return type of the first api declaration of its name, in the identity-hash order of `DeclaredFunction`s, comparing no parameter types (`ApiTypeExtractor.scala:116-122` at the base). It now takes the one api declaration of the name whose parameter types are the function's own. The comparison is the one the export check makes between a component's declaration and the api's (`ExportChecker.equalTypes`), and a parameter the function leaves untyped matches any. Where none or several fit, it takes none, and the declaration keeps what it elides (`ApiTypeExtractor.scala:77-83`, `:121-126`, `:193-209`). "Type Inference for Components" expands each construct "corresponding to declarations in APIs exported by C" with the api's types (`type-inference.tex:29`); the declaration that corresponds is the one with the function's own parameter types. The method branch had the same first pick for a dotted method (`:91` at the base) and a functional method (`:98`). Those two other sites of the defect in the file are repaired by the same helper (`:97-108`). So `BIG LEXICO(g)` (`Library/FortressLibrary.fss:129-130`) takes `TotalComparison` from `Library/FortressLibrary.fsi:98`, and `:130` drops out of both stages.

**Row 738, the kind word.** The per-provider message tested the compilation unit for an object, which a unit never is. It now tests the trait or object (`OverloadingChecker.scala:370`): 'Invalid overloading of m in object O'.

**Row 739, the top-level set's abstract functional methods.** In a component the top-level set read only declarations with a body, functional methods among them (`OverloadingChecker.scala:118-121` at the base). So an abstract `h(self)` beside an unrelated top-level `h(x: String)` was never put to the Meet Rule for functions, which `overloading.tex:525-529` applies to a functional method beside a function. It now reads every functional method of the component, abstract ones too (`OverloadingChecker.scala:125-126`). Like rung K's per-provider set, it leaves out an abstract one that a declaration of a strict subtype with the same parameter types implements (`:135-160`). Two versions came before the final one, each corrected after a measurement:
- The first (68b58b237) read every abstract functional method with no filter. The distance stage then refused the one library's `QQ`: its only comprised object, `Ratio`, declares `QQ`'s abstract `numerator(self)` and `denominator(self)` with the same parameter type. The message was 'There are multiple declarations of numerator with the same parameter type: (QQ & {Ratio})' at `Library/FortressLibrary.fss:593,671` and `:594,672` (first distance run, 'DISTANCE UP   49 -> 50 (+1)', `kind overloading 0 -> 2`). That is the shape the precedent's filter exists for.
- The second (b3d52f1de) added the filter with the precedent's test, the analyzer's subtyping of the two declaring traits' types. At the top level those types name static parameters that no kind environment holds. The distance stage's component check crashed, 'FortressLibrary.fss:988:7: I is not in the kind env [][]', and so did a generic trait's abstract method beside an object's, 'T is not in the kind env [][]'.
- The final (9697e3838) asks whether the implementing declaration's trait or object extends the abstract one's declaring trait at any depth. It reads the ancestors of the declaration with its static parameters in scope and compares the indexes by identity.

**Row 681, a size written with a static parameter in it.** `Formula.isNatTerm` let a size variable be bound only to a static parameter or a numeral (`Formula.scala:157` at the base), so `$i = i-1` had no solution. It now accepts an operation on static parameters and numerals, never one with a variable in it (`Formula.scala:156-162`). By the identity of sizes (`types-vals-vars.tex:55`), `IBox[\$i\]` and `IBox[\i-1\]` are one type once `$i` is `i-1`. So the call is applicable (`inference.tex:57`) and the argument fixes the parameter (`inference.tex:71`).

## 2. The tests: their failing runs and their passing run

The order, as the transcript shows it: the tests were written and run through the harness on the base's build at 14:31:33Z and 14:33:31Z. The edit was first built at about 14:35Z ("BUILD SUCCESSFUL", 33 s).

Failing on the base's code, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests OmittedReturnTypeFromApi.test NatArithInferChecker.test XXXFunctionalMethodMeetTopLevelAbstract.test XXXFunctionalMethodMeetTopLevelConcrete.test XXXDottedMethodMeetAbstractSibling.test XXXFunctionalMethodMeetInheritedFromApi.test XXXOverrideInheritedThroughOtherSupertype.test XXXOmittedReturnTypeFromApi.test XXXNatArithInferChecker.test` (2026-10-17T14:31:33Z):

    ProjectFortress/compiler_tests/OmittedReturnTypeFromApi.fss:8:10:
        Function body has type IntLiteral, but declared return type is String.
    - [\int i\]IBox[\i\]->ZZ32 is not applicable to an argument of type IBox[\i-1\].
    3) ProjectFortress/compiler_tests/XXXFunctionalMethodMeetTopLevelAbstract(...)AssertionFailedError: Saw wrong failure. compile
    4) ProjectFortress/compiler_tests/XXXDottedMethodMeetAbstractSibling(...)AssertionFailedError: Saw wrong failure. compile
    Tests run: 11,  Failures: 8,  Errors: 0

The eight failures: both cases of `OmittedReturnTypeFromApi` and of `NatArithInferChecker`, the new `XXX` test, and the three rekeyed tests. Green: the concrete twin, and the two `XXX` tests about to be promoted ('Saw expected failure'). The method case, `junit.sh base-method ... OmittedMethodReturnTypeFromApi.test` (14:33:31Z): 'File OmittedMethodReturnTypeFromApi.fss has 6 errors.', 'Tests run: 2,  Failures: 2'.

With the first version of the fix, `junit.sh change ...` (14:38:03Z), the two tests to promote failed: '1) ...XXXOmittedReturnTypeFromApi(...)Saw wrong failure. compile', '2) ...XXXNatArithInferChecker(...)Saw wrong failure. compile'. They were then removed in favour of their plain names (68b58b237). The three rekeyed tests run with their base keys, `junit.sh change-oldkeys ...` (14:38:20Z): 'Saw wrong failure' for each, 'Tests run: 3,  Failures: 3'. The first `XXX` test added was shown red on a deliberate change: the top-level `h` renamed to `k` for one run, `junit.sh change-demo ... XXXFunctionalMethodMeetTopLevelAbstract.test` (14:38:35Z), '1) ...Saw wrong failure. compile', 'Tests run: 1,  Failures: 1'. Then restored.

The two guards of the filter, each red on the code before its fix:
- `AbstractFunctionalMethodImplementedByComprised`, on 68b58b237's build, `junit.sh guard ...` (14:54:41Z): 'There are multiple declarations of num with the same parameter type: (Q & {R})', 'Tests run: 2,  Failures: 2'. On the old code, `old-fortress.sh /home/user/fortress-base17 <tree>/tmp/rung-checker-four-rows/old-caches junit <tree>/ProjectFortress/compiler_tests/AbstractFunctionalMethodImplementedByComprised.test`: 'OK (2 tests)'.
- `AbstractFunctionalMethodOfGenericTrait`, on b3d52f1de's build, `junit.sh generic ...` (15:06:10Z): 'AbstractFunctionalMethodOfGenericTrait.fss:8:8:', 'T is not in the kind env [][]', ' FAIL'. On the old code: 'OK (2 tests)'.

Passing, in the last run after the last change of code, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh change3 ProjectFortress/compiler_tests AbstractFunctionalMethodOfGenericTrait.test AbstractFunctionalMethodImplementedByComprised.test OmittedReturnTypeFromApi.test OmittedMethodReturnTypeFromApi.test NatArithInferChecker.test XXXFunctionalMethodMeetTopLevelAbstract.test XXXFunctionalMethodMeetTopLevelConcrete.test XXXDottedMethodMeetAbstractSibling.test XXXFunctionalMethodMeetInheritedFromApi.test XXXOverrideInheritedThroughOtherSupertype.test XXXNatArithInferFromSum.test` (15:07:40Z, 9697e3838):

    OK (16 tests)

`NatArithInferChecker`'s run asserts on the compiled path the value walk gives for `pred[\0\]()`, -1, and also `pred[\5\]()`, 4.

`ant testQuick` on the final code, 9697e3838: 'BUILD SUCCESSFUL', 'Total time: 10 minutes 6 seconds'. CompilerJUTest 'Tests run: 1235, Failures: 0', which is climb batch 16's gate's 1224 plus 13 cases added and 2 removed. LibraryJUTest 86 and OtherCompilerJUTest 263, each with 0 failures. An earlier run on 68b58b237 ('BUILD SUCCESSFUL', 6 minutes 38 seconds, 1230) is superseded. I stopped a run on b3d52f1de when the distance stage showed that code crashing. NEW-C-1's walk test, `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-checker-four-rows/h1 ProjectFortress/tests/XXXNatArithInferFromSumWalk.fss`: ' OK Saw expected exception', 'OK (1 test)'. Its compiled test, `junit.sh sum ... XXXNatArithInferFromSum.test`: ' Saw expected failure', 'OK (1 test)'.

After each of the three builds, the library order compiled the five components of the compiler's own library, each 'rc=0', with five jars.

## 3. Where the fix belongs, and the precedent search

All three sites are the checker's. `explorations/coordinator/map/modules-and-phases.md`, B.6: `ApiTypeExtractor` runs on a component before the `TraitTable` and the `TypeAnalyzer` are built (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:196-213`); B.7 covers overloading. Ledger rows citing the files (`ledger.py find --cites`): ApiTypeExtractor 737; OverloadingChecker 545, 570, 726, 727, 738, 739, 584; Formula 681, 683, 736. Only the four change. Row 584's operators stay unchecked (`isDeclaredName`), so the top-level change reaches only word-named functional methods.

Precedents. The export check already matches a component's function to an api's by `equalFnHeaders`, comparing types with `equalTypes` (`ExportChecker.scala:431-437`, `:479-515`). I reused `equalTypes` but not the header comparison: a declaration that leaves out its return type would never equal the api's header. Rung K's `toFunctionalMethodArrows` (`OverloadingChecker.scala:166-185`) is the precedent for reading abstract functional methods and for the `implemented` filter. Sites of the same defect in its file: row 737's first pick had 3 in `isExported` (functions, dotted methods, functional methods), all repaired. Row 739's body filter had 1, `toFunctionArrows`; `getFunctionalMethods` and `getDeclaredFunctions` already pass `onlyConcrete = false`.

## 4. What the specification settles

- Row 737: settled, `type-inference.tex:29`.
- Row 738: silent (the message's words).
- Row 739: settled, `overloading.tex:525-529`. An abstract method that a subtype's declaration defines with the same parameter types is an override, not a second declaration (`Specification/basic/traits.tex`, "Method Declarations"), and the precedent's filter reads it so.
- Row 681: settled, `inference.tex:57` and `:71`, with `types-vals-vars.tex:55`.
- NEW-C-1, a parameter written inside an operation (`IBox[\i + 1\]` against `IBox[\3\]`): settled the same way. The instance at 2 has parameter type `IBox[\2+1\]`, which is `IBox[\3\]`. Neither path does it (section 6).

## 5. The checker count, the distance and the checker's time

My edit changes the checker's Scala (`git diff --name-only 3aea3da53` lists the three Scala files), so both stages ran.

**The count**, `explorations/coordinator/tools/checker-count/run.sh`, timed as `compiler.md`, "The checker's time", step 2 asks. Machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, FORTRESS_THREADS=1.

| run | code | seconds (real) | load at start |
|---|---|---|---|
| base | the base build, 3aea3da53 | 74 (1m13.961s) | 0.11 |
| change, first version | 68b58b237 | 82 (1m22.083s) | 2.50 |
| change, second version | b3d52f1de | 82 (1m22.136s) | 4.01 |
| change, final | 9697e3838 | 81 (1m21.368s) | 6.93 |
| pass | no edit: the final change's run stands | 81 | |

There is no slowdown of the kind the smoke test catches. The batch's other rung ran beside each change run.

The tables, base against the final change (`diff base.txt change3.txt`):

    14,15c14,15
    < #total	39
    < #locations	38
    ---
    > #total	38
    > #locations	37

With each tree's path replaced by `TREE`, the two `run.txt` files differ by `:130` alone. That difference is this change, not row 737's flicker:

    27,28d26
    < TREE/Library/FortressLibrary.fss:130:5-105:
    <     Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\].
    177c175
    < File FortressLibrary.fss has 39 errors.
    ---
    > File FortressLibrary.fss has 38 errors.

The three change runs have equal tables and equal `run.txt` files. The count stage runs no component overloading check while `FortressLibrary` has type errors (F-42), so rows 738 and 739 cannot move it.

**The profile and the second pass.** A JFR recording of the count stage on 68b58b237 (settings=default; 3,066 samples): `ApiTypeExtractor.isExported` 0, `sameParamTypes` 0, `OverloadingChecker.toFunctionArrows` 1 (0.03 %), `Formula.isNatTerm` 0. The count stage does not reach the top-level set, so I also recorded the distance stage on the final code (9,194 samples): `isExported` 0, `sameParamTypes` 0, `toFunctionArrows` 6 (0.07 %), `getFunctionsFromCompilationUnit` 7 (0.08 %), `isNatTerm` 0. Its top self frames: `Walker.walkCases7$` 5.59 %, `BoxesRunTime.equals2` 4.49 %, `ASTGenHelper.scalaify` 4.42 %, `Walker.walkCases2` 3.60 %, `Walker.walkCases0` 3.28 %, `Statics.anyHash` 3.15 %. The four declarations hold nothing to save, so the pass makes no edit and reuses no answer, and there is nothing to audit. Both profiled runs printed the plain runs' tables: the count's '#total 38', '#locations 37', and the distance's whole table and per-site list.

**The distance**: `explorations/coordinator/tools/distance/run.sh` on 9697e3838, then `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-16/gate/distance.txt <tree>/tmp/rung-checker-four-rows/distance-postedit.txt`:

    DISTANCE DOWN   49 -> 48 (-1)
        kind typecheck               40 -> 39     (-1)
        class BR                      4 -> 3      (-1)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared
        unit component FortressLibrary     43 -> 42     (-1)

The table shows '#crash none' and '#seconds 191 FortressLibrary 137', against the gate's 217 and 154. Per site, `dist-post/errors.tsv` compared with `explorations/compile-ladder/gate/distance-sites.tsv` row by row (kind, location, message) has one difference:

    < typecheck	FortressLibrary.fss:130	Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalCompari

So `:130` goes, for good, and no site comes. The first version's distance run had added the two `QQ` sites (section 1), and the second version's profiled run crashed; both are superseded.

## 6. Programs run old against new

| program | old (base build) | new (9697e3838) | walk |
|---|---|---|---|
| `OmittedReturnTypeFromApi` | 4 errors, a String declaration's return type on the ZZ32 bodies | `PASS` | not run (walk checks no types) |
| `OmittedMethodReturnTypeFromApi` (dotted and functional methods) | 6 errors | `PASS` | not run |
| `NatArithInferChecker` | 'not applicable to an argument of type IBox[\i-1\]' | `PASS`, -1 and 4 | -1 (row 681) |
| probe `NatMinusTwice`: `get(IBox[\i - 1 - 1\](0))`, `both(IBox[\i-1\], IBox[\i-1\])`, `both(IBox[\i-1\], IBox[\i\])` | 3 errors | the first two accepted, printing 3 and 4 at `[\5\]`; the third refused, two different sizes | 3 and 4 |
| probe `NatPlusProbe`: `getp[\int i\](b: IBox[\i + 1\])` with `IBox[\3\]` | 'is not applicable to an argument of type IBox[\3\]' | the same | 'Cannot unify IBox[\3\] ... with IBox[\i+1\]' |
| probe `NatPlusWritten`: `getp[\2\](IBox[\3\](0))` | not run | prints 2 | prints 2 |
| `XXXFunctionalMethodMeetTopLevelAbstract` | compiles | 'Invalid overloading of h in component ...: S->ZZ32 ... and String->ZZ32' | 'first parameters x:[String] and self:[S] are unrelated' |
| `AbstractFunctionalMethodImplementedByComprised` | `PASS` | `PASS` | `PASS` |
| `AbstractFunctionalMethodOfGenericTrait` | `PASS` | `PASS` | `PASS` |

The probes are under `tmp/rung-checker-four-rows/probe/`. They were compiled and run with `bin/fortress`, and on the old code with `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base17 <tree>/tmp/rung-checker-four-rows/old-caches`.

**Ladder subset**, after the edit only, with the drivers copied under `tmp/rung-checker-four-rows/ladder/` as `gate.md`, "The ladder regression", says. It holds the seven files whose baseline first error is 'Function body has type ..., but declared return type is ...', the message row 737's repair touches: `EqualityOverloadBug`, `Exception`, `LabelTest`, `UnnamedParam`, `XXXbroken`, `exitType`, `litCoercion`. No baseline first error names an overloading refusal or a size. None of the seven is in the gate's pass list, so they are compared with the baseline's `ladder.tsv`. Every phase is the same, and every first error but one. `LabelTest`'s 'OR((),T)' reads 'OR(T,())', which the old code prints too (`old-fortress.sh ... compile tests/LabelTest.fss`: 'Function body has type OR(T,()), but declared return type is T.'). That is the union order rung H changed after the baseline was taken.

## 7. Sentences made false

- Edited, in the revision form: `Specification/appendices/changes.tex:3611-3616`, the effect of the entry "When two sizes are the same": "and it does not infer a static argument written with a static parameter in it: a call of get[int i](b: IBox[i]) with an argument of type IBox[i-1] is refused unless it writes get[i-1] (row~681)". It is now `:3611-3623`: the checker infers the size, instantiating `get` at `i-1`, and neither path infers a parameter written inside an operation, citing `row~NEW-C-1`. The specification builds: `./ant genSource && ./ant tex` printed 'BUILD SUCCESSFUL' twice, and `grep -c "LaTeX Warning: Reference\|multiply defined\|^! Undefined control sequence" Specification/fortress/fortress.log` prints 0. (The skill's grep, `'Reference .* undefined\|multiply defined\|Undefined control sequence'`, prints 42. All 42 matches are one line of the log's trace of the warning macro's definition, `x@warning {Reference `#1' on page \thepage \space undefined}}{}`, not warnings.)
- The entry "Overloading with static parameters" (rung G's): no sentence is made false. It says nothing of the top-level set (`changes.tex:2621-2632`).
- For the gather, outside the specification:
  - F-53, "An edit can move one error that it does not touch, `Library/FortressLibrary.fss:130` (row 737; F-232), so a lone move of that site does not show the edit's effect."
  - F-232, "one checker site still does, through the index's" and "The checker's output still moves at `Library/FortressLibrary.fss:130`, through row 737 ... for the site that still moves, `XXXOmittedReturnTypeFromApi`."
  - `.claude/skills/fortress-repo/references/compiler.md:130`, "Any difference fails, except the one error of ledger row 737 (below)", and `:132`, from "One choice of the checker still depends on them" to "and say so in your report."
  - `.claude/skills/fortress-repo/references/revival-changes.md:96`, "The checker's check of top-level overloads still skips the abstract functional methods of a component's own traits: `h(self): ZZ32` abstract in a trait beside a top-level `h(x: String): ZZ32` passes it (ledger row 739)". Also its quoted message "Invalid overloading of pick in trait O", which for an object now reads "in object O".

## 8. Points to report

- **A declaration of the one library or the compiler's own library that row 739's change refuses.** The first version refused the one library's `QQ.numerator` and `QQ.denominator` against `Ratio`'s (`Library/FortressLibrary.fss:593-594`, `:671-672`, from the first distance run). I repaired the change rather than the library, with the precedent's `implemented` filter. The final version refuses none: the distance stage's per-site list loses `:130` only, and the compiler's own library compiles under each build (library order 'rc=0' five times; LibraryJUTest 86/0). The line landed on the branch, 9697e3838.
- **The count and distance tables before and after; `:130` and any other site.** Count 39 to 38, '#locations' 38 to 37; distance 49 to 48 (section 5). `:130` goes from both; no other site comes or goes on the final code.
- **Each count run's seconds.** Base 74; change 82, 82 and 81 over the three versions; pass: no edit (section 5).
- **The tests rekeyed for row 738.** `XXXDottedMethodMeetAbstractSibling.test`: 'Invalid overloading of m in object O'. `XXXFunctionalMethodMeetInheritedFromApi.test`: 'Invalid overloading of pick in object Z'. `XXXOverrideInheritedThroughOtherSupertype.test`: '(?s).*Invalid overloading of f in object T:.*has 1 error\\..*'. The other four files that `grep -l 'in trait'` lists keep 'in trait': `M`, `Join` and `D` are traits, and `XXX6b.test` holds the words in a comment.
- **What `Formula.reduce` and the solver do with the widened `isNatTerm`.** `reduce`'s `nContradiction` (`Formula.scala:437-446`) no longer counts a size variable equal to an operation on static parameters and numerals, such as `i-1`, as a contradiction. A variable equal to a size with another variable in it, or to two sizes not written alike, still is one, so `both(IBox[\i-1\], IBox[\i\])` is refused. The unifier `un` (`:776-777`) then binds the variable to that size, and `insertNats` writes it into the instance's types. A class holding a size with a variable in it still has no solution. `slv` (`:593`) is unchanged: a size equality left after unification still has none. Rung S's memo of reductions (`TypeAnalyzer.reduced`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:599-609`) is keyed on the formula and lives in one analyzer of one run, so every answer it keeps was computed by the new rule. No memo persists across runs or keys a size away; the analyzer's other memos key on whole types, sizes included.
- **Every sentence made false.** Section 7: one edited, four given to the gather, none in rung G's entry.
- **A checker file edited beyond the three named, or any library, walk or code-generator edit.** None. One walk test file is added, `ProjectFortress/tests/XXXNatArithInferFromSumWalk.fss`, outside the brief's list of files (decision 8).

No step taken cannot be undone, and none acts against a decision on record.

## 9. Decisions, each with the ways not taken

1. **Row 737: the api declaration whose parameter types are the function's, compared by `ExportChecker.equalTypes`.** Not taken: the parameter count alone, which cannot tell `OmittedReturnTypeFromApi`'s `pick(r: Red)` from `pick(b: Blue)`; a deterministic order, such as by source position, which would still pick the wrong declaration; the analyzer's equivalence, which does not exist when `ApiTypeExtractor` runs (`StaticChecker.java:196-213`); `equalFnHeaders`, which also compares the return type the function leaves out.
2. **Row 737: the method branch repaired too**, the two other sites of the defect in `isExported`, with its own test (`OmittedMethodReturnTypeFromApi`, red on the base). Not taken: functions only, leaving the methods to a new row. The brief's site is `isExported` for a `FnDecl`, `:68-132`, which holds all three.
3. **Row 737: where several api declarations fit a declaration that leaves out parameter types, none is taken.** Not taken: the first, which is the identity-hash order again; one chosen by count. No decision covers it. The specification's "corresponding" names one declaration, and taking none is the reading that adds no choice.
4. **Row 739: every functional method in the top-level set, with the precedent's `implemented` filter; constructors and other bodiless functions still left out.** Not taken: dropping `onlyConcrete`, which would add constructors, which the team kept out; no filter, which refused the one library's `QQ` (section 1); the precedent's subtyping test of the declaring traits, which crashed on generic traits (section 1); sharing `toFunctionalMethodArrows`, which takes provider triples the top-level set does not have. The ancestors are compared by index identity, since a trait's name may be written qualified or not.
5. **Row 738: the trait or object's own index tested.** There is no other way: the line is the team's, with the wrong variable.
6. **Row 681: an operation on static parameters and numerals, never one with a variable in it.** Not taken: any operation, which would need a solver of arithmetic, and the revival has none (Appendix I, "When two sizes are the same", "with no solver of arithmetic", `changes.tex:3592`); widening only the unifier or only `reduce`, so that one would refuse what the other binds.
7. **NEW-C-1 recorded with two `XXX` tests (home 2), not repaired.** Its repair is a solver of operations on sizes, outside the four rows and the brief's files. Not taken: home 3, since the specification settles it.
8. **A walk `XXX` test beside the compiled one**, `ProjectFortress/tests/XXXNatArithInferFromSumWalk.fss`, outside the brief's list of files: the defect shows on both paths, and each path gets its gated test. Not taken: putting the walk half in the row's notes only.
9. **The promoted row 737 test gains two objects, `Red` and `Blue`,** so that a match by count would fail it. The original `XXX` test's two declarations differ only in count.
10. **The second pass makes no edit**, since the profiles give the four declarations nothing to save (section 5). Not taken: caching the declarers' ancestors across names, which would key indexes by identity hash, the very mechanism row 737's repair removes from the output.
11. **One `ant testQuick`, on the final code**, since the pass made no edit. The earlier code states' runs are superseded or stopped (section 2).
12. **The distance stage ran on each version**, since the first measurement showed a refusal and the second a crash. Only the final run's table counts for the rung.

## 10. Defects, each with its home

- Row 737, home 1: `OmittedReturnTypeFromApi` and `OmittedMethodReturnTypeFromApi`, promoted from `XXXOmittedReturnTypeFromApi`.
- Row 738, home 1: the three rekeyed tests.
- Row 739, home 1: `XXXFunctionalMethodMeetTopLevelAbstract`, with `XXXFunctionalMethodMeetTopLevelConcrete` beside it.
- Row 681, home 1: `NatArithInferChecker`, promoted from `XXXNatArithInferChecker`.
- Two defects of this rung's own intermediate code: the first version refused an abstract functional method that its comprised object defines, and the second crashed on a generic declaring trait. Home 1: `AbstractFunctionalMethodImplementedByComprised` and `AbstractFunctionalMethodOfGenericTrait`, both green on the base.
- NEW-C-1: neither path infers a static parameter written inside an operation of the parameter type. Home 2: `XXXNatArithInferFromSum` (compiled) and `XXXNatArithInferFromSumWalk` (walk), and its row.

## 11. For FACTS

See `record.md`: one new entry, and corrections to F-53 and F-232.

## 12. Commands worked out

- A JFR profile of the distance stage: a copy of `distance/run.sh` with `-XX:FlightRecorderOptions:stackdepth=256 -XX:StartFlightRecording=filename=$SCRATCH/prof.jfr,settings=default,maxsize=2g,dumponexit=true` on its java line, as rung K's command does for the count stage. The stage's `#seconds` then reads about twice the plain run's.
- The real LaTeX warnings: `grep -c "LaTeX Warning: Reference\|multiply defined\|^! Undefined control sequence" Specification/fortress/fortress.log` (section 7).
