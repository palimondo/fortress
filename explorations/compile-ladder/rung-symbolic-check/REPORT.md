<!-- Climb batch 21b, rung C (rung-symbolic-check): the compiled checker's overloading check reads every symbolic operator (P-155, row 584), with the AnyList crash, the double count of an api's operator set, the import's except clause and the prelude's invalid = repaired; worker's report. -->

# Rung C: the full check of symbolic operators

- problem: the full-check stage's crash and row 584's skip: `explorations/perf-probes/symbolic-operators-2/REPORT.md:28-32` (the shadow) and `:55-71` (the crash, 'E is not in the kind env'); P-155 (`explorations/coordinator/POSITIONS.md:66`).
- spec: `Specification/advanced/overloading.tex:98-101` ("If a pair of overloaded declarations satisfies any one of the three rules, it is considered a valid overloading") and `Specification/basic/operators/intro.tex:23-25` ("Just as functions or methods may be overloaded ..., so operators may have overloaded declarations of the same fixity"); `Specification/basic/components/source-code.tex:248-258` (a name is imported on demand only if it is "neither listed in the except clause nor explicitly imported", and "The set of all declarations that are declared or imported ... must satisfy the overloading rules").
- precedent: `explorations/perf-probes/symbolic-operators-2/checker-full-check.patch:1-69` (`isCheckedName`, without its catch wrappers); `explorations/compile-ladder/plan-21/probes/prelude-full-check.patch:1-125` (once per api; the prelude's `GeneratorZZ32`); for the self type read outside its trait, `ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java:41-67` (a signature keeps the trait type where the self type lists what only the body may read) and `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:1014-1020` (`condition`: a variable that the kind environment does not bind is read as unbound, a read of the context).
- deviation: the three on-demand import loops go through one helper, `importsOnDemand` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:248-256`), which also honours the import's `except` clause, a fault that the planner's patch kept (`excepts.contains` of a function value, always false), at three sites, not the patch's two: `OverloadingChecker.scala:291`, `:318`, `:349`.
- deviation: the crash is repaired in the self type's reading, `TypeAnalyzer.selfComprised` (`TypeAnalyzer.scala:604-622`), read by `removeSelf` (`:579`) and by rung X's `withBounds` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:470-471`), a file beyond the brief's two.
- deviation: the speed pass reorders `validOverloadingInner`'s tests (`OverloadingChecker.scala:598-604`), which the probe's patch did not touch.
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala`, `Library/CompilerLibrary.fsi`, `Library/CompilerLibrary.fss`, `Specification/appendices/changes.tex` (each in `a874948ac`).

The worktree is `/home/user/fortress-symcheck`, on branch `wip/rung-symbolic-check`, cut from `aa5c67d48`. `seed-worktree.sh` seeded it from the base build `/home/user/fortress-base21b` and exited 0. The base build's HEAD is `24919e97d`, an ancestor of `aa5c67d48`. Its `ProjectFortress/`, `Library/`, `build.xml` and `Specification/` are the same as the base's: `git diff --name-only 24919e97d aa5c67d48 -- ProjectFortress Library build.xml Specification` prints nothing. So its code is the base's.

The commits, in order:
- `744845ec4`: tests (1) to (4).
- `6ab88ee29`: test (5).
- `d239634a3`: test (5b).
- `d0d93ce06`: test (2b).
- `a1e3de058`: the change itself: the check, the import loops, the crash, the prelude, and row 775's test.
- `4fb3242fa`: the speed pass.
- `fe33191f7`: Appendix I.
- `ed4782762`: row 611's checker-half test.

`744845ec4`'s message calls `XXXNoDuplicatesRuleSelfPositionsOperator` a team test. It is the revival's (`59b1d0a4d`, row 726), as `6ab88ee29`'s message corrects.

## 1. What changed and why

- **The check.** Three loops of `checkOverloading` now read `isCheckedName` (`:766-773`): the top-level loop (`OverloadingChecker.scala:270`), the trait check's provided methods (`:396`) and its overriding return types (`:405`). `isCheckedName` admits every `SOp`, and an identifier as `isDeclaredName` admits it. `isDeclaredName` itself is unchanged (`:760-764`; fork 13). The export check reads it (`ExportChecker.scala:275`), so row 782 stays latent.
- **The double count (fork 14, row 810).** Each on-demand import loop added an api's declarations once for each name of the api whose text was the operator's. So an api with a prefix and an infix `-` added its `-` twice, and the duplicate check refused each declaration against itself. `importsOnDemand` answers once per api.
- **The except clause (row 811).** The same loops tested `excepts.contains((m:IdOrOp) => m.getText.equals(text))`. That asks a list of names whether it holds a function value, which is always false. So the check still read a name that `except` leaves out, for identifiers too, on the base. `importsOnDemand` reads the clause.
- **The crash (row 809).** A trait whose `comprises` clause lists a type at a type `where`-clause variable types `self` as the trait met with the listed types, `AnyC & C[\E\]` (`ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala:63-81`). Outside the trait, the kind environment binds no `E`. There the crash ran this way:
  - `removeSelf` built the intersection;
  - the intersection case of `pSubInner` asked whether its members exclude each other (`TypeAnalyzer.scala:154-155`);
  - `checkCC` met `AnyC`'s clause, and `checkP` compared `E` with the clause's opened variable;
  - `staticParam(E)` called `bug` (the stack in section 3).

  `selfComprised` reads no listed type where the trait's `where`-clause variable is unbound in the analyzer. The trait comprises its listed types at every value of the variable, so the trait type holds the same values. Inside the trait, the body's analyzer binds the variable (`Decls.scala:89`, through `KindEnv.extend` with the trait's `where` clause). There the comprised list stays, so `AnyList`'s `||` body still reads `self` as a `List[\E\]`.
- **The prelude (fork 15).** The planner's measured repair, taken as it is. `GeneratorZZ32` extends `Equality[\GeneratorZZ32\]` and also excludes `Number`, `Character` and `String`. The always-false top-level `=` leaves both api and component. No declaration is added.
- **Row 726's pair (fork 18).** Its expected failure keeps its name, in the form of every refusal test of `compiler_tests/` (fork 33). Its key becomes the checker's refusal.
- **Row 611's checker half.** A compiled refusal test: an object that inherits two functional `||` with no declaration on their meet.
- **The speed pass (P-148).** `validOverloadingInner` now first tests whether two functional methods stand at one self position, a test that reads no type, and then the two specificity tests. The answer is the same OR of the same tests.
- **Appendix I.** One Effect sentence said that the checker checks no operator whose name is not a word of capitals. It now says that the checker checks every operator, and it names walk's Meet Rule check as reading no symbolic operator (row 611) (`Specification/appendices/changes.tex:2918-2923`).

## 2. The tests: their failing runs and their passing run

| test | subject | base | after |
|---|---|---|---|
| (1) `compiler_tests/XXXSymbolicOperatorOverloadUnrelated` | `opr +` over two unrelated traits, refused | compiles: red | 'Invalid overloading of + in component ...' |
| (2) `compiler_tests/ComprisesWhereFunctionalMethodChecker` | the probe's `AnyC`/`C` program, with a call from outside | 'E is not in the kind env' | typechecks |
| (2b) `compiler_tests/XXXComprisesWhereFunctionalMethodBounds` | the second path: rung X's bounds reading in the exclusion test | 'E is not in the kind env' | 'Invalid overloading of cat ...' |
| (3) `compiler_tests/OperatorPrefixInfixImport` (+ `OperatorPrefixInfixApi.fsi/.fss`) | the double count, a guard | links, runs PASS | links, runs PASS |
| (4) `compiler_tests/XXXNoDuplicatesRuleSelfPositionsOperator` (key changed) | row 726's pair | the code generator's 'Likely bug ...': red | 'There are multiple declarations of \|\|' |
| (5) `compiler_tests/ImportExceptOverload` (+ api) | an excepted name beside the component's own declaration | 'There are multiple declarations of pick' | links, runs PASS |
| (5b) `compiler_tests/ImportExceptByName` (+ api) | the by-name loop's except | 'There are multiple declarations of pick' | links, runs PASS |
| `compiler_tests/ComprisesWhereOverrideChecker` | row 775's program: dotted and functional overrides | 'F is not in the kind env' (old code) | typechecks |
| `compiler_tests/XXXFunctionalMethodMeetOperatorChecker` | row 611's shape, checker half | compiles (old code): red | 'Invalid overloading of \|\| in object Vo' |

**Failing, on the base's code, before the edit was built in the tree.** `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests XXXSymbolicOperatorOverloadUnrelated.test ComprisesWhereFunctionalMethodChecker.test OperatorPrefixInfixImport.test XXXNoDuplicatesRuleSelfPositionsOperator.test` (20:18:57Z):

    . compile ProjectFortress/compiler_tests/XXXSymbolicOperatorOverloadUnrelated
     Saw failure, but did not satisfy compile_err_contains; expected
    E is not in the kind env [][][]
    . run ProjectFortress/compiler_tests/OperatorPrefixInfixImport (432ms) PASS
    Tests run: 5,  Failures: 3,  Errors: 0

Row 726's test in that run: 'Likely bug in static analysis, apparently malformed overload set not rejected for', 'Saw failure, but did not satisfy compile_err_contains; expected', 'There are multiple declarations of ||'.

The other base runs:
- Test (5), `junit.sh base5 ... ImportExceptOverload.test` (20:24:28Z): 'There are multiple declarations of pick with the same parameter type: ImportExceptOverloadApi.P', 'Tests run: 2,  Failures: 2'.
- Test (5b), `junit.sh base5b ... ImportExceptByName.test` (20:25:29Z): the same message, 'Tests run: 2,  Failures: 2'.
- Test (2b), `junit.sh base2b ... XXXComprisesWhereFunctionalMethodBounds.test` (20:33:01Z): 'E is not in the kind env [T$2 -> KindBinding(T$2,T$2 extends Object)][T$1 -> ...]', 'Tests run: 1,  Failures: 1'.

These runs used the tree's build, which was still the base's: `ProjectFortress/build/.../OverloadingChecker.class` is dated 19:15, the seed, and the edit's first `ant compileAll` ended at 20:35:36Z. Before runs (5), (5b) and (2b), two quick-loop compiles of the edited Scala went into `tmp/` (at 20:22 and 20:31). They ran no test and changed nothing that the harness reads.

Two tests were written after the build and seen failing on the old code, `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base21b <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/<T>.test`:
- `ComprisesWhereOverrideChecker`: 'ComprisesWhereOverrideChecker.fss:9:54:', 'F is not in the kind env [][][]', 'Tests run: 1,  Failures: 1,  Errors: 0'.
- `XXXFunctionalMethodMeetOperatorChecker`: 'Saw failure, but did not satisfy compile_err_contains', 'Saw wrong failure. compile', 'Tests run: 1,  Failures: 1'.

**The first `XXX` test, (1), shown red on a deliberate fix.** For one run, `trait B excludes { A } end`; then `junit.sh red1 ... XXXSymbolicOperatorOverloadUnrelated.test`: 'Saw failure, but did not satisfy compile_err_contains; expected', 'Tests run: 1,  Failures: 1'. Restored afterwards (`git diff` empty).

**The guard (3), refused by the check without the double count's fix.** The loops-only checker was compiled into a scratch folder ahead of the build (compiler.md, "Testing an edit here"). `Shell compile compiler_tests/OperatorPrefixInfixImport.fss` printed 'OperatorPrefixInfixApi.fsi:6:3-7:1:' twice, 'There are multiple declarations of - with the same parameter type: (OperatorPrefixInfixApi.Pt, OperatorPrefixInfixApi.Pt)', 'File OperatorPrefixInfixImport.fss has 1 error.'

**Passing, after the last change of code** (`4fb3242fa`, built; the tree at `fe33191f7`):
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests`, over the eight tests above (all but row 611's), `RangeEqRungJLink.test` and `XXXRangeEqRungJ.test` (21:18:25Z): 'OK (13 tests)'.
- `junit.sh final611 ... XXXFunctionalMethodMeetOperatorChecker.test` (21:31:01Z): 'Saw expected failure', 'OK (1 test)'.
- `ant testQuick`: section 5.

## 3. Where the fix belongs, and the precedents

- **The class.** The overloading check is `scala_src/typechecker/OverloadingChecker.scala`, which `StaticChecker.checkCompilationUnit` runs (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:275`). The other class, `scala_src/overloading/OverloadingChecker.scala`, has its own `isDeclaredName` (`:127`), but nothing constructs it except itself (`:55`).
- **The shadow.** The probe's shadow was taken as it is, without its catch wrappers. The three loops call a new `isCheckedName`, and `isDeclaredName` stays for the export check.
- **The double count.** The planner's patch repaired two sites; the file has three loops of that shape (`OverloadingChecker.scala:291`, `:318`, `:349`). The third also adds an api's set once per name, and ignored `except` as the other two did, which test (5b) shows. All three now call `importsOnDemand`.
- **The crash, traced on this tree.** `bin/fortress typecheck -debug stacktrace` of the probe's program (`tmp/`) gives, from the top: `TypeAnalyzer.staticParam (TypeAnalyzer.scala:1059)`, `pSubInner (:208)`, `pEqv (:367)`, `pExcInner (:548)` (`checkP`), `checkCC (:530-532)`, `pSubInner (:155)` (the exclusion of an intersection's members), `pSubInner (:185)` (`removeSelf`), ..., `OverloadingOracle.equiv (:74)`, `OverloadingChecker.toFunctionArrows (:161-162)`. The kind environment held `E$1`, the existential reduction's renaming of `C`'s own `E`, not an opened `where` variable. The type compared with it named `AnyC`'s `where`-clause `E`, taken from the functional method's self type. The same crash comes at a call from outside the trait (`CoercionOracle.moreSpecific`, `Functionals.typedApplicationOfChecked`), which the `run` of test (2) reaches.
- **The second path, through rung X's work.** With `removeSelf` repaired alone, the crash came back for a generic functional method of `AnyC` beside an overlapping generic top-level function. It ran from `validOverloadingInner`'s exclusion test through `OverloadingOracle.excludes (:327)` and `meetEmptyWithBounds (:535)` to `TypeSchemaAnalyzer.emptyWithBounds (:508)`, because `withBounds` builds the self type's intersection itself.
- **Not through X's exclusion arrows.** X's arrows (`selfTyped`, `forExclusion`) were not this path. For a trait with a `comprises` clause, `FunctionalMethod.parameters()` equals the declaration's own parameters, so no exclusion arrow is kept.
- **`withBounds` now reads `selfComprised`** as `removeSelf` does, as its own comment requires: "the parts of a self type, read as the intersection that removeSelf makes of it" (`TypeSchemaAnalyzer.scala:448-450`). Test (2b) holds it.
- **The ways to repair the crash** that the language and the checker offer:
  - (a) read no listed type where the variable is unbound (taken);
  - (b) open the variable to a fresh type, as a call opens an argument (F-251);
  - (c) drop the listed types from the functional method's signature in `FunctionalMethod.parameters()`, as `_selfFromBound` does;
  - (d) extend the overloading checker's analyzer with the trait's `where` bindings;
  - (e) drop the listed types from the disambiguator's self type.

  Section 9 gives why (a).
- **The prelude.** The planner's patch, measured on `aa5ff2423` with the full check, taken as it is.

## 4. What I ran, old against new

- **The probe's program** (`AnyC`, `C`): old, 'E is not in the kind env [E$1 -> KindBinding(E$1,E$1 extends Object)][][][]'; new, it typechecks.
- **The probe's program with a call from outside**: old, 'E is not in the kind env [][][]' through `CoercionOracle.moreSpecific`; new, it typechecks.
- **Row 775's program**: a functional and a dotted `lt` overriding `Ord[\P[\E\]\]`'s, in `trait P[\E\] ... comprises { S[\E, F\] } where [\F extends Object\]`. Old: 'F is not in the kind env [E$2 ...][T$1 ...][][]' and 'F is not in the kind env [E -> KindBinding(E,E extends Object)][][]'. New: both typecheck. So row 775 closes, with `ComprisesWhereOverrideChecker`.
- **The except shape on identifiers** (`MYOP` excepted from an api and declared by the component): old, 'There are multiple declarations of MYOP with the same parameter type: ExceptApi.P'.
- **A prefix and an infix `-` imported by name** from one api, beside another api's `-` on demand: old and new both accept it, with no error. The by-name loop looks the imported name up in the second api and finds nothing, so that shape does not reach the loop's double count.
- **A range's `=`, compiled**: old, `r = r` false, `(1:3) = (1#3)` false, `(2:4) = (2:5)` false; new, `true`, `false`, `false`. `Equality`'s identity stands in place of the always-false `=`.
- **Row 611's shape without its call**: old compiles it; new refuses it, 'Invalid overloading of || in object Vo'. With the call, both stop at the call first: 'Ambiguous coercion in call to operator ||'.
- **Under walk**: `ImportExceptOverload`, `ImportExceptByName`, `OperatorPrefixInfixImport` and `ComprisesWhereFunctionalMethodChecker` each print `PASS`. The defects of this rung are the compiled path's.
- **The three ladder files that rose against the baseline** (section 5), on the old code: `NatReflectTest` compiles and fails at run, and `genericTest1` and `genericTest2` compile and print `pass`, as on the new code. These moves predate this rung.

## 5. The suites, the stages, the ladder

- **`ant testQuick`**, once, on `4fb3242fa`'s code:
  - 'Tests run: 1303, Failures: 0, Errors: 0' (CompilerJUTest);
  - 'Tests run: 86, Failures: 0, Errors: 0' (LibraryJUTest);
  - 'Tests run: 263, Failures: 0, Errors: 0' (OtherCompilerJUTest);
  - 'BUILD SUCCESSFUL', 'Total time: 7 minutes 20 seconds'.

  The compiler track is run 1's gate's 1,293 plus this rung's 10 test cases. `XXXFunctionalMethodMeetOperatorChecker` came after this run, so the gate counts 1,304.
- **The count stage**, `explorations/coordinator/tools/checker-count/run.sh tmp/rung-symbolic-check/checker-count-postedit.txt tmp/rung-symbolic-check/cc-post`. `diff` against `explorations/compile-ladder/climb-batch-21/gate/checker-count.txt` prints nothing: '#total 3', '#locations 3', '#crash none', every api 0.
- **The distance stage**, `explorations/coordinator/tools/distance/run.sh tmp/rung-symbolic-check/distance-postedit.txt tmp/rung-symbolic-check/dist-post`: '#total 5', 'typecheck 4', 'export 1', '#crash none', '#seconds 256 FortressLibrary 190', load 2.87 at start.
  - `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-21/gate/distance.txt tmp/rung-symbolic-check/distance-postedit.txt` prints 'DISTANCE SAME   5'.
  - Site by site against `explorations/compile-ladder/gate/distance-sites.tsv`, by row (kind, unit, stage, location, message): the five rows are equal, the export error's whole message among them.
  - `python3 explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv tmp/rung-symbolic-check/dist-post/errors.tsv`: 'landed 5 now 5', "export 'are not matched by the declarations': landed 43 entries, now 43".
  - Against the base's full check (`explorations/compile-ladder/plan-21/probes/full-check-base.tsv`): 'landed 191 now 5', 185 rows gone, none come. Its one entry move is `String`'s export entry, which is rung S's.
  - No site moved, and none came. The run's output holds no 'kind env', `CompilerBug` or crash line. So the three units' `||` checks (`List`'s api and component, `String`'s component) run, and find nothing.
- **The stock stage is now the full check**, since the checker reads every symbolic operator. So the gated stage holds rung X's 8 vector sites and run 1's 178 cleared sites (fork 34).
- **The ladder subset**: 120 files (`tmp/rung-symbolic-check/ladder/subset.txt`). They are the baseline's codegen, link, run and pass files, and the three typecheck files whose first error is 'Could not check call to operator ='. The gate's drivers were copied under `tmp/rung-symbolic-check/ladder/` (gate.md, "The ladder regression").
  - Against the newest landed `explorations/compile-ladder/climb-batch-21/gate/ladder/ladder.tsv`: each of the 85 files it holds is at the same phase.
  - `ladder_compare` against the baseline: 'UP tests/NatReflectTest.fss codegen -> link', 'UP tests/genericTest1.fss link -> pass', 'UP tests/genericTest2.fss link -> pass'; no DOWN, no MISSING, no STDOUT. The three rose before this rung (section 4).
  - The eighteen microGPT components: `diff <(mg_phases .../climb-batch-21/gate/ladder/microgpt-phase.md) <(mg_phases tmp/.../microgpt-phase.md)` prints nothing.
  - No ladder file or microGPT component changed phase or first error.
- **`ant testSystem`** was not run: the edit changes no Java or Scala of walk or of a shared phase (tests-running.md, "When to run a whole suite").
- **The specification build**: `cd Specification/fortress && ./ant genSource && ./ant tex`, both 'BUILD SUCCESSFUL'.
  - `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|^! Undefined control sequence" Specification/fortress/fortress.log` prints 0.
  - The skill's own pattern prints 47. It matches the warning macro's definition, which the 419 MB tracing log echoes, not real warnings.
  - The ignored files were removed with `git clean -fXq -- Specification`.

## 6. The checker's time (P-148)

Machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. Other agents of the batch ran beside these runs; among mine, each ran alone. The command was `time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N`, with the base run in a call set up for the base build.

| run | code | load at start | real |
|---|---|---|---|
| base | the base build | 6.88 | 120.2 s |
| change | `a1e3de058` | 6.77 | 107.5 s |
| pass | `4fb3242fa` | 1.83 | 94.3 s |
| base, again | the base build | 0.24 | 84.4 s |
| pass, again | `4fb3242fa` | 0.85 | 96.8 s |

- **Base against change**: the tables are equal (`diff` silent). The two `run.txt` files are equal once each tree's path is replaced by `TREE` (`diff` silent, 38 lines each).
- **Change against pass**: the tables and the `run.txt` files are equal under the same masking, so the pass keeps the results the same. The last two runs were taken as a pair, at a low load.
- **The profile**: JFR with `settings=profile` and `stackdepth=2048`, on the count stage's checker, for three runs (base, change, pass), read with a `jdk.jfr.consumer` program in `tmp/`.
  - The apis' overloading check took 2,838 of 6,125 samples on the base and 3,689 of 6,845 on the change. Within it, from base to change: the exclusion test in `validOverloadingInner`, 814 to 1,296 (rung X's `meetEmptyWithBounds` 0 to 218); the Return Type Rule, 948 to 1,212; specificity in `validOverloadingInner`, 292 to 379.
  - The new code itself: `importsOnDemand` 0 samples, `selfComprised` 0 to 1, `isCheckedName` 9 to 22.
  - The top frames are the generated walker's cases (`Walker.walkCases7$`, `walkCases0` to `walkCases6`), `BoxesRunTime.equals2`, `Statics.anyHash` and `ASTGenHelper.scalaify`, each 3 to 5 %.
- **The pass**: the profile showed a test that reads no type answered after two tests that read types. Tested first, the specificity samples in `validOverloadingInner` went from 379 to 302, of about 7,000. The rest of the added time is the rules themselves, on the operator sets now read; it cannot be cut without changing which pairs the rules read. No memo was added, so no audit was needed.

## 7. What the specification settles

The overloading chapter applies its rules to every functional declaration, operators among them (`Specification/advanced/overloading.tex:98-101`; `Specification/basic/operators/intro.tex:23-25`). Nothing in it exempts a symbolic operator, and P-155 records the skip as a gap. The import chapter leaves an excepted name out of an on-demand import, and checks the overloading of the declarations that are declared or imported (`Specification/basic/components/source-code.tex:248-258`). The specification does not say how the checker reads a self type's listed types outside the trait. The reading taken is the trait type, which the `comprises` clause makes equal to it (P-60; `revival-changes.md`, "A `comprises` clause speaks of values").

## 8. Sentences made false

- `Specification/appendices/changes.tex:2918-2921`, in Appendix I's entry "Overloading with static parameters", its Effect: "It checks no overloading of an operator whose name is not a word of capitals (row~584 ...): two declarations of such an operator with the same parameter type pass it, and only its code generator refuses them, as a malformed overload set (row~726)." This rung corrects it (`fe33191f7`).
- F-245's title, "the checker as built skips these operators (row 584)", and its body's account of the full check as a shadow stage. The stock stages are now the full check.
- Row 584's claim (the check never reads an operator not named by a word of capitals) and row 726's claim (the checker does not check the pair, and the code generator stops on it). Both are false now.
- Row 611's notes, "the checker's skip is row 584". The checker's half is done.
- Row 481's claim, "every range equality is `false`". A compiled `r = r` is now `true`.
- A source comment of walk, which this rung does not edit: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1894-1895`, "The names checked are those the compiled checker checks (OverloadingChecker.isDeclaredName)". The compiled checker's overloading check now reads `isCheckedName`, while walk's `checkedName` (`:1990-1994`) still reads `NodeUtil.validOp`.
- F-80's title, "unless their name is a symbol", and its sentence "Unchecked: ... every operator whose name is a symbol, such as `+`, `<`, `||` or a subscript, since the checker skips them (row 584; F-245 measures what the skip hides)" (`explorations/coordinator/FACTS.md:74`).
- F-81's sentence "The checker skips operators whose names are symbols (row 584); checked, their pairs give the errors of F-245." (`explorations/coordinator/FACTS.md:75`).
- F-223's sentence "It checks no symbolic operator (row 584); such a pair passes it and stops the code generator (row 726)." and its "the checker's departure by `XXXNoDuplicatesRuleSelfPositionsOperator`", which is now the checker's refusal (`explorations/coordinator/FACTS.md:219`).
- P-155's sentence "Today its overloading check reads an operator only if its name is a word of capitals, such as `MAX`, so `+`, `^`, `||`, the subscripts and the other symbolic operators pass unchecked." (`explorations/coordinator/POSITIONS.md:66`), a decision's text, for the curator.
- No other sentence of the specification. No `\revision` or `\note{}` box, and no sentence of the main text, says that the checker skips symbolic operators: `grep -rn -i "symbolic operator\|word of capital\|584" Specification/ --include=*.tex` finds only `changes.tex:2918`, `:4053` and `:4181`. The last two describe the probe's and rung X's measurements under the full check, and stay true. The front matter's paragraph (`Specification/fortress/preamble.tex:54-63`) is unaffected.

## 9. Decisions, each with the ways not taken

1. **The probe's shadow, taken as it is** (fork 13): every `SOp` in the three loops, through a new `isCheckedName`; `isDeclaredName` unchanged.
   - Not taken: changing `isDeclaredName` itself, which would turn on row 782's export matching; admitting only some operators.
   - Evidence: P-155; fork 13; the export check's caller (`ExportChecker.scala:275`).
2. **The double count fixed once per api, through one helper, at all three loops** (fork 14).
   - Not taken: the planner's two inline sites, which leave the third loop with the same fault; deduplicating the set afterwards (the fault is a declaration read twice, not its symptom).
   - Evidence: the prelude's seven duplicate sets (CLIMB-BATCH-21.md, section 4); test (3) under the loops-only checker (section 2).
3. **The except clause repaired in the same helper, with tests (5) and (5b), home 1.**
   - Not taken: keeping the always-false test in the rewritten condition and filing a row (home 2 or 3), which would carry a known fault forward in lines that this rung rewrites; repairing it in a later rung.
   - Evidence: `excepts.contains((m:IdOrOp) => ...)` at `a874948ac`'s `OverloadingChecker.scala:193`, `:227`, `:265`; the base's refusals of tests (5) and (5b); `source-code.tex:248-258`.
   - No component that the stages read has an `except` clause (`Library/` has four, in `FortressAst`, `PrefixMap`, `PrefixSet` and `Relation`), so the stages cannot move by it, and testQuick's tracks did not.
4. **The crash repaired in the analyzer's reading of the self type (`selfComprised`), not in the overloading checker** (row 809). Not taken:
   - (b) opening the variable. It reads a declaration's domain as one unknown instance, so `List[\E'\]` would not lie below `AnyList & List[\E#1\]`, and each reading of the same signature would differ from the last.
   - (c) the signature's self type made plain in `FunctionalMethod.parameters()`, the `_selfFromBound` precedent. It leaves rung X's exclusion arrows reading the declaration's own parameters, its `TraitSelfType` among them, so it moves the crash onto that path (`OverloadingChecker.scala:561-569`); and it leaves the call path's `removeSelf` unrepaired.
   - (d) the overloading checker's analyzer extended with the trait's `where` bindings, which fixes neither the call path nor another trait's variable.
   - (e) the disambiguator's self type without the listed types, which `AnyList`'s `||` body needs (`List.fss:88`, `app(self, f)` with `a: List[\E\]`).
   - Evidence: the traces of section 3; tests (2) and (2b); row 775's program cleared.
5. **The unbound test reads the kind environment by name**, as `condition` and `withClauseParams` do (`TypeAnalyzer.scala:1014-1020`, `:1045-1055`), and counts as a read of the context. A variable of the same name bound by another declaration, such as an extender's own parameter `E`, reads as bound, as on the base.
   - Not taken: a test of the binding's identity, which the kind environment does not keep.
6. **`withBounds` reads the self type as `removeSelf` does.**
   - Not taken: leaving it, which keeps the second path's crash (test (2b)).
7. **The prelude: the planner's repair as measured** (fork 15).
   - Not taken: the `=` out alone, which leaves ranges with no `=` so that `RangeEqRungJLink` fails (CLIMB-BATCH-21.md, section 4); the `extends` without the three new exclusions, which was not measured. The measured text is taken, and its three exclusions state what a range is.
8. **Row 726's test respelled, its name kept** (forks 16 and 18). A refusal test in `compiler_tests/` needs the `XXX` prefix, as its siblings `XXXNoDuplicatesRuleSelfPositions` and `XXXNoDuplicatesRuleSelfPositionsPlain` have it; its key becomes the checker's message.
   - Not taken: a plain name, which the harness reports red for any refusal (`FileTests.java:395-410`).
9. **Test (1) is a compile refusal test whose key names the component**, so that the refusal is the pair's and not another unit's.
10. **Row 611's checker half gets a gated compiled test**, `XXXFunctionalMethodMeetOperatorChecker`.
    - Not taken: a note alone.
11. **The speed pass: one reorder.** Not taken:
    - skipping the Return Type Rule where specificity failed: it reads `subEDsolution` on unnormalized domains, where `lteq` reads normalized ones, and the two are not shown equal;
    - skipping pairs that an imported api already checked: that would drop repeated error lines, and so change the results.
12. **The Appendix I correction in the Effect alone.** No sentence of the main text changes, so no Change sentence or Working Draft quotation is added. No decision record either, since the brief asks for none.

## 10. Points to report

- **The probe's shadow.** Taken as it is, without its catch wrappers (decision 1).
- **Where the crash lay.** In the analyzer's reading of a self type whose `comprises` clause lists types at a `where`-clause variable: `removeSelf` (`TypeAnalyzer.scala:579`), on the overloading check's path and at a call.
- **Its path through the first run's exclusion work.** Not through X's exclusion arrows, but through X's bounds reading, `withBounds` (`TypeSchemaAnalyzer.scala:470-471`); test (2b).
- **The prelude's repair** (fork 15), line by line:
  - `Library/CompilerLibrary.fsi:111`, before `trait GeneratorZZ32 excludes { Boolean }   (*) excludes { Boolean, AllGenerators  }`, after `trait GeneratorZZ32 extends Equality[\GeneratorZZ32\] excludes { Boolean, Number, Character, String }   (*) excludes { Boolean, AllGenerators  }`;
  - `Library/CompilerLibrary.fsi:129`, before `opr =(left:GeneratorZZ32, right:GeneratorZZ32): Boolean`, after: gone, with its blank line;
  - `Library/CompilerLibrary.fss:301`, before `trait GeneratorZZ32 excludes { Boolean }  (*) excludes { Boolean, AllGenerators }`, after `trait GeneratorZZ32 extends Equality[\GeneratorZZ32\] excludes { Boolean, Number, Character, String }  (*) excludes { Boolean, AllGenerators }`;
  - `Library/CompilerLibrary.fss:314`, before `opr =(left:GeneratorZZ32, right:GeneratorZZ32): Boolean = false`, after: gone, with its blank line.

  A compiled range's `r = r` is now `true`.
- **Compiled tests whose verdict changes** (fork 16): row 726's `XXXNoDuplicatesRuleSelfPositionsOperator`.
  - Before: 'Saw expected failure' on the code generator's 'Likely bug in static analysis, apparently malformed overload set not rejected'.
  - After: 'Saw expected failure' on the checker's 'There are multiple declarations of || with the same parameter type: (S)', by the No Duplicates Rule wherever `self` stands (`revival-changes.md`, "Two functional methods with equivalent parameter types are duplicates").
  - Its key changed: `compile_err_contains=There are multiple declarations of ||`.
  - No other test of the three tracks changed verdict: 1,303, 86 and 263, none failing. An `XXX` test that now fails for a new reason, still failing, would not show in the verdicts; the planner's run named none.
- **The stock tables, before and after.** The count 3 to 3 and the distance 5 to 5, with the same five sites and the export error's 43 entries; no site came. The three units' `||` checks find nothing (section 5).
- **The count stage's seconds.** Base 120.2 s, change 107.5 s, pass 94.3 s; a later pair, base 84.4 s and pass 96.8 s. Base, change and pass give the same results (section 6).
- **The new rows and their tests**, all three closed by this rung's commits:
  - row 809, the crash: `ComprisesWhereFunctionalMethodChecker`, `XXXComprisesWhereFunctionalMethodBounds`;
  - row 810, the double count: `OperatorPrefixInfixImport` and the prelude's library order;
  - row 811, the ignored except clause: `ImportExceptOverload`, `ImportExceptByName`.
- **Every sentence made false**: section 8.
- **A ladder file or microGPT component whose phase or first error changes**: none.
- **Files edited beyond those named**: `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:470-471` (the crash's second path), and the tests' helper apis in `compiler_tests/`. No edit of the interpreter's library or of walk.
- **A defect repaired beyond the brief's list**: the ignored except clause (row 811).

## 11. Defects and their homes

- **Row 584** (the skip): home 1, repaired; test (1) and the stages.
- **row 809** (the crash on a `where`-clause comprises trait's functional method read outside it, at the overloading check, at a call and in the bounds reading): home 1; tests (2) and (2b).
- **Row 775** (its sibling at an override): home 1, its program cleared; `ComprisesWhereOverrideChecker`.
- **row 810** (the double count): home 1; test (3) and the prelude's library order.
- **row 811** (the except clause ignored): home 1; tests (5) and (5b).
- **Row 726** (the pair at two `self` positions): home 1; test (4).
- **Row 611**: its checker half repaired, home 1 (`XXXFunctionalMethodMeetOperatorChecker`); its walk half stays home 2 (fork 17).
- **Row 481** (the range `=`): stays home 2, with `XXXRangeEqRungJ` still an expected failure ('FAIL:  ranges.tex, section "Ranges"'); its claim is rewritten (record.md).
- **Walk's stale comment** (section 8): no defect of behaviour; listed for the next edit of that file.

## 12. For FACTS

- **The fact.** The compiled checker checks the overloading of every operator, symbolic ones included. On climb batch 21's merged library it gives the distance's five sites and the count's three, with no crash.
  - What it means: P-155's zero is now measured with every operator checked, and the gated stages hold run 1's 186 cleared sites.
  - The number: distance 5 (typecheck 4, export 1); count 3.
  - Test: `XXXSymbolicOperatorOverloadUnrelated`; the stages ('#total 5', '#crash none').
  - Detail: section 5.
- **The fact.** Outside its trait, the checker reads a self type as the trait type where the trait's `comprises` clause lists types at a `where`-clause variable.
  - What it means: `AnyList`'s `||` and row 775's shape are checked without the kind-environment crash.
  - Tests: `ComprisesWhereFunctionalMethodChecker`, `XXXComprisesWhereFunctionalMethodBounds`, `ComprisesWhereOverrideChecker`.
  - Detail: sections 1 and 3.

## 13. Commands worked out

- **A deep JFR profile of the count stage.** In a subshell: `export JAVA_TOOL_OPTIONS="-XX:FlightRecorderOptions:stackdepth=2048 -XX:StartFlightRecording=filename=$W/tmp/count/prof2/rec-%p.jfr,settings=profile"`, then the stage's `run.sh`. JFR's default stack depth of 64 hides the checker's phases.
- **Reading it.** A single-file Java program over `jdk.jfr.consumer.RecordingFile` that counts the samples whose stack holds every one of several method names.