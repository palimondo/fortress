# Climb batch 18, rung K: the skeptic's review

Rung K, `rung-checker-where-checks`, on `wip/rung-checker-where-checks`. Base `db8fecd22`. The worker left the head at `32cf49fb6`. My commits:

- `4b6495ffa`: the worker's REPORT.md, written from the run's journal. record.md was already on the branch.
- `deabd50f6`: the skeptic's fix. An opened `where`-clause variable's bound names the variable opened. It comes with its test, `OpenTypeWhereSelfBoundChecker`.
- `ae1aecdcd`: corrections. Row 778's walk test and row, record.md's lines for the fix, and one precedent citation in REPORT.md.
- This file.

Verdict: **approved**. The rung is right with the fix of `deabd50f6`. That fix is settled (section 4), and nothing is contested.

## 1. The count and the distance

The worker's files match the report:

- `tmp/count/base.txt` and `tmp/count/change.txt` are the same: '#total 31', '#locations 30', '#crash none'. Both equal `explorations/compile-ladder/climb-batch-17/gate/checker-count.txt`.
- The two `run.txt` files are equal once each tree's path is masked.
- `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-17/gate/distance.txt tmp/rung-checker-where-checks/distance-postedit.txt` printed 'DISTANCE SAME   35'.

I ran the count stage myself in one session, as compiler.md's "The checker's time" asks of a reviewer:

- the base build first, from `/home/user/fortress-base18`;
- then the worker's head, from this worktree, whose build is the code of `294a4990d`. No code changed between `294a4990d` and `32cf49fb6`.

The command, for N = skbase and skhead:

    time explorations/coordinator/tools/checker-count/run.sh $W/tmp/skcount/$N.txt $W/tmp/skcount/$N

The machine: nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, under `nice -n 19`.

| run | code | seconds | load at start | worker's seconds |
|---|---|---|---|---|
| skbase | base build | 65.9 (`real 1m5.912s`) | 0.68 | 75.1 |
| skhead | `294a4990d` = `32cf49fb6` | 70.7 (`real 1m10.722s`) | 0.57 | 77.0 |

The results are the same as the worker's:

- `diff tmp/skcount/skbase.txt tmp/skcount/skhead.txt` printed nothing.
- `diff tmp/skcount/skhead.txt tmp/count/change.txt` printed nothing.
- The masked `run.txt` of skbase equals skhead's, and skhead's equals the worker's change run. Each comparison printed nothing.

My times are of the worker's size. The report's tables are those of the worker's head. As the brief says, I ran no count or distance stage after my fix: the gate's tables on the merged tree are the record.

## 2. Test first, in the worker's transcript

All times are UTC, from `agent-a0de00ba449b54288.jsonl`.

- **Before the change, call `RCPgrZ`.** At 00:59:25 the worker ran `junit.sh base ...` with the eleven new tests and fourteen guards, on the tree at `db8fecd22`. The tree held only the tests. The run ended at 00:59:29 with 'Tests run: 25,  Failures: 6,  Errors: 0'. The six failures are the six that `recordedFailure` quotes, among them '1) ...XXXWhereBoundDottedCallChecker(...)AssertionFailedError: Saw wrong failure. typecheck'. The two XXX originals, the guards and `XXXStaticArgBoundNestedCall` were green (`tmp/rung-checker-where-checks/junit-base.txt`).
- **The edit came after that run.** The first edit of code is `iWr2yy`, at 01:00:41. The last is `H2rwyE`, at 01:07:18. The first build is `APEwTW`, at 01:08:30.
- **After the change.**
  - `new1` (`fT81mX`, 01:10:38) ran on the built change. Each new XXX test printed ' Saw expected failure' and each plain one 'OK'. The two originals turned red: 'Tests run: 25,  Failures: 2'.
  - `XXXComprisesWhereConstraintExtenderChecker` was added after the change. It was run on the old code through the harness (`Ymqejs`, 01:12:05): 'Tests run: 1,  Failures: 1,  Errors: 0'. On the change (`hQmWJM`) it was green.
  - `ant testQuick` (`ZLUGPw`, 01:13:06) printed 'BUILD SUCCESSFUL' and 'Total time: 6 minutes 11 seconds'. The tracks ran 1260, 86 and 263 tests, with 0 failures.
- **No code changed after the last edit.** Every later Bash edit was of scratch or of a test. The red demonstration (`XbuXTB`) edited `XXXWhereBoundDottedCallChecker.fss` and restored it.

The order holds for every test.

## 3. The diff, the precedents and the siblings

I read `git diff db8fecd22...32cf49fb6` line by line against the section, P-151 and the specification. The five rows are built as the section asks. Their precedents are those the report names, and the report's cited lines are right, except one: the comprises solve is `TypeHierarchyChecker.scala:420-421` at the base, not `:427`. That is corrected in `ae1aecdcd`.

- **Row 748.**
  - Both callers of `getCandidatesForMethod` get the check: the method invocation, and the subscript (`SkSubscript`, section 5).
  - The receiver's arguments are read at the position the trait's parameter has. `SkPermAccept` and `SkPermRefuse` permute the parameters through `object Sub[\X, Y\]() extends Tr[\Y, X\]`. `Sub[\String, S\]().m()` is refused and `Sub[\S, String\]().m()` accepted.
  - A dropped overload leaves the others. `SkOverloadKeep` is accepted on both trees. In `SkOverloadDrop` the message names only the candidate that remains: '- ZZ32->String is not applicable to an argument of type ().' The refusal is right; only the dropped candidate's reason is not printed.
  - `self.m()` from a method without the condition is refused (`SkSelfCallRefuse`): 'Method Tr[\T\].m is not applicable: its where clause requires T to extend Shows.' This is the where calculus's answer. `SkSelfCallAccept` is accepted.
- **Row 749.** `Formula.slv`'s retry is bounded. The recursive call receives an `And` of sizes alone. Its `unify` either solves those sizes, or leaves no equality and drops the rest as the first pass does (`Formula.scala:591-594`). So the recursion is at most two deep.
- **Row 750.**
  - The check reads the type's declaration's own header clause, as the section asks.
  - Rung X writes List's condition on the extends clause, `LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] }` (rung X's `Library/List.fsi`). LexicographicOrder has no header clause, so the worker's worry about List (notDone) does not arise on the merged tree.
- **Rows 753 and 771.** The extender check substitutes the inference variables into the bounds (`atArgs`), so a self-naming bound is right there (`SkFBounded753`, `SkFBoundedBind753`). The opening was not right: see F1.

No other site of rows 748 to 771 lies in the files the rung edits. The names the rung adds have no competing declaration in the test folders, the libraries or `ProjectFortress/src/com/sun/fortress/`. Each test name occurs in its own `.fss` and `.test` only, and rungs W and X add no test of the same name.

## 4. Findings and fixes

### F1, a defect, fixed in `deabd50f6` (settled)

`openWhereSizes` bounded each opened type by its variable's bounds, at the trait's arguments, but left the variable itself unopened inside them.

The rung's `whereSizes` now reads the clause's constraints into those bounds. A constraint that names its own variable, `where [\E\] { E extends StandardTotalOrder[\E\] }`, is the shape of the team's own commented clauses: `Library/FortressLibrary.fsi:1207`, `T extends Array[\T,E,I\]`, and `Library/SkipList.fss:105`, `SelfType extends InternalNodeHelper[\SelfType,...\]`. With such a constraint, a call that opens the trait stopped the checker. The binding form, `where [\E extends StandardTotalOrder[\E\]\]`, had failed the same way since climb batch 17's rung A.

    old-fortress.sh ... typecheck SkFBoundedOpen771.fss    (the base)
        - [\E extends CompilerAlgebra.StandardTotalOrder[\E\]\]CBox[\E\]->ZZ32 is not applicable to an argument of type AnyC.
    bin/fortress typecheck SkFBoundedOpen771.fss           (the rung's head)
        SkFBoundedOpen771.fss:8:7-9:
        E is not in the kind env [][][]
    old-fortress.sh ... typecheck SkFBoundedBindOpen771.fss (the base; the head the same)
        E is not in the kind env [][][]

The text accepts the call. A constraint's trait references "may include naked type variables", and "A where clause may include mutually recursive constraints" (`Specification/basic/trait-parameters.tex:351-352`, `:362`). A listed type holds "at every value of" its where-clause variable (`Specification/basic/traits.tex:236-243`). Row 771's build line says the opened type "carries" the constraint.

The ways I considered:

1. Substitute the opened variables into the bounds before registering them. This is the move the rung's own extender check makes with its inference variables, through `atArgs`.
2. Drop a bound that names a where-clause variable. That keeps the refusal of a call the text accepts.
3. Read only constraints that name no variable into `whereSizes`. That narrows row 771's build.

I took the first way. It is in `openWhereSizes`, a declaration the section gives the rung.

The test is `ProjectFortress/compiler_tests/OpenTypeWhereSelfBoundChecker`, which covers the constraint form and the binding form.

- Red on the rung's head, before the edit:

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests OpenTypeWhereSelfBoundChecker.test OpenTypeWhereConstraintChecker.test
      OpenTypeWhereSelfBoundChecker.fss:14:8-10:
      E is not in the kind env [][][]
      Tests run: 2,  Failures: 1,  Errors: 0

- Red on the base:

      old-fortress.sh /home/user/fortress-base18 .../tmp/old-caches junit .../OpenTypeWhereSelfBoundChecker.test
      Tests run: 1,  Failures: 1,  Errors: 0

- Green after the fix. I ran `ant compileAll` and then the library order, five rc=0 and five jars:

      ONE_JVM=1 .../junit.sh skfix ProjectFortress/compiler_tests OpenTypeWhereSelfBoundChecker.test OpenTypeWhereConstraintChecker.test <the open-type, nat-open and comprises-where tests, 16 in all>
      . typecheck ProjectFortress/compiler_tests/OpenTypeWhereSelfBoundChecker  OK (time = 1297ms)
      OK (16 tests)

- The whole suite the fix needs, run once after my last edit of code, on `deabd50f6`'s code:

      ant testQuick
      BUILD SUCCESSFUL
      Total time: 5 minutes 28 seconds
      fast-compiler 1261 tests, 0 failures; fast-library 86, 0; fast-othercompiler 263, 0

  The compiler track has 1261 tests, one more than the worker's 1260: the new test.

The fix also repairs the binding form, which rung A left. That defect had no row. Its home is 1: an assertion in this plain test. The fix stays inside the declarations the section names, so no point to report beyond the rung's own.

### F2, a correction: row 778, walk (home 2, `ae1aecdcd`)

Under walk, the `where`-clause variable `E` of a `comprises` clause is read for another declaration's own `E` when that declaration's bound names `E`.

    old-fortress.sh ... SkW9.fss    (walk; trait AnyC comprises { CBox[\E\] } where [\E\] {...}, object CBox[\G ...\], pick[\E extends StandardTotalOrder[\E\]\](b: CBox[\E\]))
        Unification error: ... Cannot unify CBox[\ZZ32\](...FTypeObjectInstance)
          with CBox[\E\](...TraitType) abm=E=(BOTTOM,StandardTotalOrder[\E@.../SkW9.fss:1:1-10:2\])
    old-fortress.sh ... SkW8.fss    (the same, pick's parameter named F)
        3
    old-fortress.sh ... SkW6.fss    (CBox extends a trait with no such clause)
        3

The span in `E@...:1:1-10:2` is the component's. Static variables belong to their declaration ("All static variables in a trait, object, or functional declaration must occur either as a static parameter or as a where-clause variable", `Specification/basic/trait-parameters.tex`, "Where Clauses"), so the specification settles the defect. The base shows it, and the rung did not cause it. Both compiled checkers, old and new, accept the program.

The test is `ProjectFortress/tests/XXXWhereVariableScopeWalk.fss`, and the row is 778, from record.md.

- Through `harness-one.sh` on the head and with the base build's harness on the base: ' OK Saw expected exception', 'OK (1 test)'.
- Red when `pick`'s parameter is renamed `F`, then restored: ' Missing expected failure', 'Tests run: 1,  Failures: 1'.

### F3, a correction: REPORT.md's precedent citation (`ae1aecdcd`)

The provenance line cited `TypeHierarchyChecker.scala:427` at the base, which is a closing brace. The solve it means is `:420-421`.

### F4, for the gather: a conditional extension's condition and row 750's check

`SkExtendsAccept` declares `trait Sub2[\U\] extends Tr[\U\] where { U extends Shows } end`, with `trait Tr[\T\] where { T extends Shows }`. On the rung's head it is refused: 'Ill-formed type: Tr[\U\] The static argument U does not satisfy the corresponding bound Shows.'

Without braces, the clause is the extends clause's own, a conditional extension. With braces, `extends { Tr[\U\] } where {...}`, the clause is the header's, and the declaration is accepted (`SkExtendsBraces`).

On the rung's own branch, the base reads no conditional extension. Sub2 then extends Tr[\U\] at every U, so the refusal follows the rung's rule. Rung X puts the conditions in scope throughout the declaration (`TypeWellFormedChecker.scala:193-194` on X's branch, `KindEnv.withExtendsConditions`), so on the merged tree the declaration should be accepted. The gather should check this there.

### F5, a note: type where-clause variables of functions and methods

Both paths refuse a function's or a method's type `where`-clause variable at name binding, on the base and on the head (`SkTypeVar749`, `SkTypeVarMethod`): 'E is undefined.' P-151 builds only the forms the team wrote, and the team wrote type where-clause variables only on `comprises` clauses (`Library/SkipList.fss:103-106`, `ProjectFortress/not_passing_yet/ParametricTree0.fss:30-31`). So this is no gap of the rung's, and I added no row.

It follows that the type branch of the rung's `whereVars` (`STypesUtil.scala:202-203`) is not reached today. It changes nothing, and I left it in place.

### F6, a note: the footer of `4b6495ffa`

My first commit's co-author line names the model tier, not the skill's footer. It holds no model identifier. Rewriting it would rewrite a pushed commit, so it stays.

### Where I differ from the report

- §1, row 771, says `openWhereSizes` is "unchanged". `deabd50f6` changes it.
- §6's tables and §8's count are those of the worker's head. The fix's tree was not counted: the gate counts the merged tree.

### The failure-mode question

The rung turns no loud failure into a quiet value. It skips the new checks without a word in four places:

- a method whose self type is not a trait type (`Functionals.scala:988`);
- a receiver whose argument count differs (`:989`);
- a bound that names the method's own static parameters or a `where`-clause variable (`:1005-1006`, `TypeWellFormedChecker.scala:264-265`, decision 4);
- a static argument that is not a type.

In each, the call or the type is accepted as on the base. My fix turns one loud failure, the checker's 'E is not in the kind env', into the text's acceptance.

## 5. My programs, old against new

All programs are under `tmp/rung-checker-where-checks/skeptic/`. The compiled answers come from `typecheck`, because a `where` clause stops the code generator (row 701). The old code ran with `old-fortress.sh /home/user/fortress-base18 <tree>/tmp/old-caches`. The new code is `bin/fortress` of this worktree with a private caches copy, at the rung's head except where a row says "after the fix". Walk is the same code on both trees. No program has a mutable variable, a field write or an `atomic` block, so there is no thread column.

| program | walk (old) | compiled, old | compiled, new |
|---|---|---|---|
| `SkOverloadKeep`: `showIt(3)` beside a conditioned `showIt()` | not run | accepted | accepted |
| `SkOverloadDrop`: `showIt()` on `Holder[\String\]` | 'Cannot find definition for method show' | accepted | refused, 'ZZ32->String is not applicable to an argument of type ().' |
| `SkPermAccept`: `Sub[\S, String\]().m()` | `m` | accepted | accepted |
| `SkPermRefuse`: `Sub[\String, S\]().m()` | `m` (row 777's face) | accepted | 'Method Sub[\String,S\].m is not applicable: its where clause requires String to extend Shows.' |
| `SkSubscript`: `h[0]` with a conditioned `opr []` | 'Cannot find definition for method show' | accepted | 'Method Holder[\String\]._[_] is not applicable: ...' |
| `SkSelfCallRefuse` / `SkSelfCallAccept` | `x` / not run | accepted / accepted | refused / accepted |
| `SkWritten749`: `g[\O, P\](O, P)` | not run | accepted | accepted (row 470) |
| `SkOverload749`: generic `g` beside `g(u: O, v: Q)` | 'Missing type n' | refused (row 749) | accepted |
| `SkTypeVar749`, `SkTypeVarMethod` | 'E is undefined.' | 'E is undefined.' | 'E is undefined.' (F5) |
| `SkFnValue749`: `k: (O, P) -> String = g` | not run | 'U is not in the kind env' | the same |
| `SkTypeUseAccept` / `SkTypeUseRefuse` | not run / `x` (no use is instantiated) | accepted / accepted | accepted / 'Ill-formed type: Wrap[\U\]' |
| `SkExtendsAccept` / `SkExtendsBraces` / `SkExtendsRefuse` | not run / not run / `x` | accepted, each | refused (F4) / accepted / refused |
| `SkBodyUse750`: `Tr[\U\]` in a method of a trait whose clause bounds U | not run | accepted | accepted |
| `SkParamBound750`: `Pr[\B[\ZZ32\], String\]` for `where { A extends Box[\C\] }` | 'B[\ZZ32\] must subtype Box[\String\]' | accepted | refused at that type only |
| `SkFBounded753`, `SkFBoundedBind753`: self-naming bound, extender inside it | not run | accepted | accepted |
| `SkNarrower753`: an extender narrower than the bound | not run | 'Ill-formed type: NBox[\E\]' (the listed type) | the same |
| `SkFBoundedOpen771`: constraint form, a call that opens it | walk unification error (row 778) | 'not applicable to an argument of type AnyC' | 'E is not in the kind env'; after the fix accepted (F1) |
| `SkFBoundedBindOpen771`: binding form, the same call | the same | 'E is not in the kind env' | the same; after the fix accepted (F1) |
| `SkW2` to `SkW9`: walk's capture (F2) | as in F2 | not run | not run |

## 6. The three homes

- Rows 748, 749, 750, 753 and 771 are home 1, in the worker's tests.
- Row 776 is home 3: `XXXStaticArgBoundNestedCall` and its row. The specification is silent on where an error is placed. I checked the reproduction on the base in the worker's run: 'XXXStaticArgBoundNestedCall.fss:13:36-46: Ill-formed type: V[\T\]', 'has 1 error'.
- Row 777 is home 2: `XXXWhereBoundDottedCallWalk`, with 'Saw expected failure: loaded and ran, not refused at load'.
- F1 is home 1, in `OpenTypeWhereSelfBoundChecker`.
- Row 778 is home 2, in `XXXWhereVariableScopeWalk`.
- F5 is outside the built forms by P-151.

## 7. The specification and the record

- **Appendix I.** The worker's revised clauses in "The traits that extend a closed trait" (`Specification/appendices/changes.tex:1486-1501`) say what the head does. One exception, before my fix: a self-naming bound crashed the checker. With `deabd50f6` the clauses are true as written. My fix makes no other sentence of `Specification/` false.
- **The worker's list of sentences made false outside the specification.** The list stands: F-250's holes on rows 748, 749 and 750; F-244's two clauses; F-251's "bounded as the binding is"; and `revival-changes.md:189-193` and `:220`. F-251's "bounded as the binding is" was already false for a self-naming binding, which crashed. It is now true of that binding, and false only for the constraints the rung adds.
- **record.md.** The FACTS entry, the notes, the rows and the revival change are true as written, with `ae1aecdcd`'s additions. Its other citations check out:
  - `KindEnv.scala:118-126` at `a874948ac`;
  - `Formula.scala:441` at `a874948ac`;
  - `GenericFnWithExcludes.fss:44-45`;
  - `TypeWellFormedChecker.scala:50-56`, the error places.
- **The guard.** No dotted call in either library has a `SumReduction` receiver. `Library/Generator2.fss:73` calls `r.distribute(q)` on an `ActualReduction`, whose `distribute[\K\]` (`Library/FortressLibrary.fss:3233`) has no `where` clause. The count's identical table agrees.
