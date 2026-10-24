# Climb batch 22, rung R: the body errors' library text (rows 731 and 632)

- problem: the four body sites of the distance at climb batch 21b's gate, `explorations/compile-ladder/gate/distance-sites.tsv:3-6` (two `BIG MIN` at `FortressLibrary.fss:4395` and `:4401`, the fused arm at `:1466`, `List.fss:146`)
- spec: `Specification/basic/expressions/reductions.tex:51-56` (the revision box: until the compiled type checker directs the desugaring by type, a reduction whose element type no argument fixes writes its static argument in a program that both implementations are to run)
- precedent: `Library/List.fss:504` (the team's `transpose`, `<|[\E\] x | (x, _) <- xys |>`), `Library/FortressLibrary.fss:2553` (`SUM[\T\] [...]`), `Library/Format.fss:438`; for the arm, `Library/FortressLibrary.fss:2573` (`__builtinFactory1`'s `N[\0\] => cast[\Array1[\T,b0,s0\]\](r)`)
- deviation: the specification desugars a reduction by the type `N` of its expression (`Specification/basic/expressions/reductions.tex:26-31`); the written static argument stands in for it, as the revision box at `:51-56` says; none from the precedent
- historical: `Library/FortressLibrary.fss`, `Library/List.fss`

## 1. What changed and why

Three library sites that the compiled checker refuses, each a site of the distance (F-53), now write the static argument of their clause form, and `__bigOperator2`'s fused arm passes its result through `cast[\O0\]`. The text is the planner's `explorations/compile-ladder/plan-22/probes/rung-R.patch`, applied by `python3 -I explorations/compile-ladder/plan-22/probes/last5-edits.py /home/user/fortress-bodyargs min731 list731 cast46` ('applied min731 list731 cast46'). The diff's index line is the patch's, `d5abf7e6a..1997672c7`, so the patch is taken as it is.

- `Library/FortressLibrary.fss:4395` and `:4401`, `String`'s `upto` and `beyond`: `n = BIG MIN[\ZZ32\][i <- self.indices, self[i]=c] i`. `BIG MIN`'s bound names its parameter (`Library/FortressLibrary.fsi:2014`), so the checker finds no instance for an unwritten one (F-59, row 731).
- `Library/List.fss:151`, `List`'s range subscript at a stride other than 1: `<|[\E\] self[i] | i <- r |>`. The comprehension's `BIG <|[\T\]|>` is unbounded (`Library/List.fss:178`). The checker takes its bound `Any`, and the expected `List[\E\]` reaches it only where the call fails (F-221), so the body was `OR(List[\Any\], List[\E\])`.
- `Library/FortressLibrary.fss:1476`, `__bigOperator2`'s fused arm: `cast[\O0\]((outer'.unwrap)(...))`. Under the pattern `outer':BigOperator[\I0,I0,I0,L0\]` the arm's value is an `I0` where `O0` is declared (row 632, F-85). The cast is the library's device for an arm whose type the `typecase` cannot show (F-264). The team's pattern stays, and so does when the arm fuses.

Two test files are new: the walk guard `ProjectFortress/tests/WrittenReductionArgumentsWalk.fss`, and the expected failure `ProjectFortress/tests/XXXPureListStridedSubscriptWalk.fss` for the same defect left in `PureList` (section 7). One message of `ProjectFortress/tests/InferUnfixedFBoundedWalk.fss:29` is respelled, its value kept (section 6).

Commits on `wip/rung-body-arguments`: `55a87a61c` (the library and the guard) and `3f3bff4ab` (the `XXX` test).

## 2. The failing run and the passing run

The distance stage is the test of the library's sites. Its before is climb batch 21b's landed table, not run again (`explorations/compile-ladder/climb-batch-21b/gate/distance.txt`):

    #total	5
    #kind	typecheck	4
    #kind	export	1
    #unit	component List	1

Its after, on this tree's final code (`explorations/coordinator/tools/distance/run.sh tmp/rung-body-arguments/distance-postedit.txt tmp/rung-body-arguments/dist-post`, started 2026-10-24T02:41:32Z):

    #total	1
    #kind	typecheck	0
    #kind	export	1
    #crash	none

The walk guard, through the harness on the base's code, before any library edit (`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-body-arguments/h1 ProjectFortress/tests/WrittenReductionArgumentsWalk.fss ProjectFortress/tests/NestedReductionFusion.fss ProjectFortress/tests/GeneratorDeclarations.fss ProjectFortress/tests/InferUnfixedFBoundedWalk.fss`, 2026-10-24T02:37:01Z):

    # harness-one 2026-10-24T02:37:01Z; tree 64386618b; nproc=4; load 0.12 0.66 2.34; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    FAIL: a ArrayList[\Int\]: <|10, 12, 14|> =/= a ArrayList[\ZZ32\]: <|10, 12, 14|>; the list at 0:4:2, stride 2, is its elements at 0, 2 and 4, a List[\ZZ32\] (ranges.tex, section "Ranges"; aggregate.tex, section "List Expressions")
    FAILURES!!!
    Tests run: 4,  Failures: 1,  Errors: 0

The same command on the final tree (2026-10-24T02:53:32Z, tree `55a87a61c`): 'OK (4 tests)'.

The brief expected the guard to pass on the base, "so no value moves". It does not. `upto` and `beyond` keep their values, but `List`'s strided subscript gave back a list of its elements' run-time class, which the guard's `=`, typed binding and parameter refuse (section 5).

## 3. Where the fix belongs, and the precedent search

The sites are library text that only the checker reads differently: the desugared big operators are calls of the library's reduction objects, which the checker types (`explorations/coordinator/map/modules-and-phases.md:341`). The brief keeps the rung in the library; the checker's inference from the clauses is row 731's own fix (fork 17). The language and the library offer these ways:

- For `BIG MIN`:
  - the written static argument (taken);
  - a declared type that receives the value, `n: ZZ32 = BIG MIN[...]` or the function's result. The planner's probe measured it refused in every context: 'not applicable to an argument of type ()' (`explorations/coordinator/CLIMB-BATCH-22.md`, section 4, "Row 731's three sites");
  - replacing the reduction by `indexOf(c)` (`Library/FortressLibrary.fsi:1356`, overridden by `FlatString` at `Library/FlatString.fss:101`), a rewrite of the team's algorithm that no record asks for;
  - the checker inferring from the clauses: row 731's fix, not this rung's.
- For the comprehension:
  - the written argument (taken);
  - a typed local `x: List[\E\] = <| ... |>`, measured refused: 'Right-hand side has type List.List[\Any\], but declared type is List.List[\E\].';
  - the expected type narrowing the bound, as P-48's text says: a checker change (fork 17).
- For the arm:
  - `cast[\O0\]` (taken, the coordinator's call on item 46);
  - widening the pattern to `BigOperator[\I0,O0,I0,L0\]`, which changes when the arm fuses (row 632's notes);
  - leaving it with the row.

The precedents, each counted in its file:

- In `Library/FortressLibrary.fss`, the clause forms of a big operator whose bound names its parameter: on the base, 5 of 7 wrote the argument, `SUM[\T\]` at `:2553`, `:2932`, `:2937` and `SUM[\ZZ32\]` at `:4579`, `:4595`. The 2 left were this rung's. Now 7 of 7 write it.
- In the twelve components the distance checks, every clause form left unwritten is of a plain-bounded big operator, which the checker takes at its bound, or of `BIG LEXICO`, which has no static parameter:
  - `BIG ||` at `:1156`, `:4377`, `:4501` and `Library/Stream.fss:57`;
  - `BIG OR` at `:1247` and `Library/String.fss:420`;
  - `BIG AND` at `:2080` and `Library/List.fss:128`;
  - `BIG LEXICO` at `:4359` and `Library/String.fss:374`, `:383`, `:398`, `:407`.
- In `Library/List.fss`, the list comprehensions: on the base, 2 of 3 wrote it, both in the team's own `transpose` (`:504`; the team's text at `a874948ac`, its `:499`). Now 3 of 3.
- The cast device: `cast[\` stood 53 times in `Library/FortressLibrary.fss` on the base, 35 of them as a `typecase` arm's whole value (`=> cast[`), as in `__builtinFactory1`'s `N[\0\]` arm at `:2573`. Now 54.

## 4. What the specification settles

The revision box of `\secref{reduction-expr}` (`Specification/basic/expressions/reductions.tex:26-62`) says that neither implementation directs a reduction's desugaring by the type `N` of its expression yet, and: "Until the compiled type checker directs the desugaring by type, a reduction with a generator clause list whose element type no argument fixes writes its static argument in a program that both implementations are to run, as the team's own tests do" (`:51-55`). The library is such a program after the switch-over, so the edit follows the box.

The normative text gives a list expression the type `List[\T\]`, `T` the union of the types of its elements (`Specification/basic/expressions/aggregate.tex:103-105`, "List Expressions"). For `self[i]` with `self: List[\E\]` that type is `List[\E\]`, which the written `[\E\]` states.

Row 632 cites `Specification/basic/expressions/typecase.tex`, "Typecase Expressions": an arm's type is the type of its expression under the clause's binding, which shows `I0`, not `O0`.

`Specification/advanced/parallelism-locality/defining-generators.tex` and Appendix I's `\seclabel{revival-reductions}` (`Specification/appendices/changes.tex:1165-1250`) were grepped for a sentence that says the library's own reductions leave the argument out (`grep -n -i 'library.*static argument\|row~731\|row~632\|upto\|__bigOperator2\|fused'`). None does.

## 5. Walk, old against new

- The guard (section 2): its 8 string assertions pass on both trees; its stride-2 list assertions fail on the base and pass after.
- Probes (scratch, not committed), run on the base's code with `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base22 <tree>/tmp/.../old-caches ListSubProbe2.fss` and on the final tree with `bin/fortress ListSubProbe2.fss`. The base:

      b = <|10, 12, 14|>
      b = expected: false
      z = <|q, s|> false
      RHS expression type ArrayList[\FlatString\] is not assignable to LHS type List[\String\]

  The final tree:

      b = expected: true
      z = <|q, s|> true
      typed zz = <|q, s|>
      call: 3

  So, under walk, `List`'s range subscript at stride 2 gave back an `ArrayList[\Int\]` for a `List[\ZZ32\]`, and an `ArrayList[\FlatString\]` for a `List[\String\]`. That list was unequal to a list of the same elements at the list's own type. A binding of that type refused it (the first probe on the base: `RHS expression type ArrayList[\Int\] is not assignable to LHS type List[\ZZ32\]`), and so did a parameter of that type. Now the subscript gives back a `List[\E\]`. This is the value that moves. At stride 1 the subscript runs through `drop` and `take`, and was right on both trees. The mechanism is F-228's: under walk a method's return type does not direct an unwritten comprehension, so the comprehension was built at the join of its elements' run-time classes (rows 20, 717).
- A second move, measured by the rung's skeptic (`SKEPTIC.md`): on a list whose element type walk left open (F-143), built from a call whose self-bounded type parameter nothing fixes, which the checker refuses (F-59), the strided subscript answered its elements on the base and now ends in `CastError`, at the comprehension's own cast (`Library/List.fss:179`). A list comprehension written at such an open type parameter ended so on the base already. `ProjectFortress/tests/OpenParameterListComprehensionWalk.fss` asserts today's behaviour (home 3, NEW-R-2 in `record.md`).
- `upto`, `beyond` and the arm: no value moves. Walk instantiates the written reduction at its argument, `ZZ32`, as it instantiated the unwritten one at the join of its `ZZ32` indices. `tests/NestedReductionFusion.fss` (five pairs, fused and unfused) and `tests/GeneratorDeclarations.fss` run the fused arm, and both pass on the base and after, so `cast[\O0\]` holds where walk reaches the arm.
- Two team demos call `upto` and `beyond`: `ProjectFortress/demos/BirdCount1q.fss` and `BirdCount1t.fss`. Each was run from `ProjectFortress/demos` on the old code (`old-fortress.sh ... BirdCount1q.fss`) and on the new (`../../bin/fortress BirdCount1q.fss`). Both runs exit 0 with 676 lines each, 0 differing lines (`diff`), and no "fail". The 52 demos on the merged tree are the gather's (fork 20).
- `ant testSystem` on the final library (2026-10-24T02:42:29Z): 'Tests run: 169', '168', '168' and '174, Failures: 0, Errors: 0', 679 in all, the landed 678 and the guard; 'BUILD SUCCESSFUL', 'Total time: 4 minutes 37 seconds'. `XXXPureListStridedSubscriptWalk` was added after this run, so the gate counts 680.
- `ant testSpecData` (2026-10-24T02:47:52Z): 'Tests run: 130, Failures: 0, Errors: 0', 'BUILD SUCCESSFUL'.
- No test's verdict changed except the new guard's.

## 6. A test line respelled

`ProjectFortress/tests/InferUnfixedFBoundedWalk.fss:29`, a revival test, asserts that `"ab.c".upto('.')` is `"ab"`. Its message was "String's upto, whose body calls BIG MIN with no static argument, answers the prefix before the character", which the edit makes false. It now reads "String's upto answers the prefix before the character", and the value is kept. The test's own unwritten `BIG MIN[j <- 0#4] (j - 2)` at `:20` still checks the open F-bounded parameter under walk. The file is beyond the brief's named files: a point to report.

## 7. The same defect in PureList

`PureList`'s range subscript, at `Library/PureList.fss:73`, holds the text that `List.fss:151` held, and shows the defect on the final tree (`bin/fortress PureListSubProbe.fss`, scratch): 'b = <|10, 12, 14|> equal: false', 'RHS expression type PureList[\Int\] is not assignable to LHS type List[\ZZ32\]'. `PureList` is not a component of the distance and not among the brief's files, so the defect is recorded, not repaired. `ProjectFortress/tests/XXXPureListStridedSubscriptWalk.fss` asserts the specification's answer: a binding of the list's own type accepts the result.

- Through the harness as it is (`harness-one.sh $PWD/tmp/rung-body-arguments/hx ProjectFortress/tests/XXXPureListStridedSubscriptWalk.fss`, 2026-10-24T02:55:32Z): 'OK Saw expected exception', 'OK (1 test)'.
- With `PureList.fss:73` written `<|[\E\] self[i] | i <- r |>` for one run, then restored by `git checkout`, the same command (02:55:55Z): 'PASS', 'Missing expected failure', 'Tests run: 1,  Failures: 1,  Errors: 0'.

So its repair is the same one line.

## 8. The count stage

`explorations/coordinator/tools/checker-count/run.sh tmp/rung-body-arguments/checker-count-postedit.txt tmp/rung-body-arguments/cc-post` ran alone. It started at 2026-10-24T02:38:25Z and wrote its table at 02:40:53.9Z: 149 s. The machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, load at start 0.45 0.70 2.21, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. Its diff against `explorations/compile-ladder/climb-batch-21b/gate/checker-count.txt`:

    14,15c14,15
    < #total	3
    < #locations	3
    ---
    > #total	1
    > #locations	1

Every api counts 0; '#crash none'; '#shadow matches the tracked StaticChecker'.

The coordinator's reading of a clean check (`36ec68cab`) is in this tree, but the check is not clean on this tree alone. With the component's three type errors gone, its unit reaches the export check. That check's one error is the export error with its 15 entries (`Library/FortressLibrary.fss:12:11-25`, 'The following declarations in API FortressLibrary are not matched by the declarations in component FortressLibrary.'), which rungs E and T clear. F-53's "each unit stops at its first failing stage" had hidden it from the count until now. The planner measured '#total 0' on the three rungs' text together. No checker code changed, so there is no speed pass.

## 9. The distance, site by site

`explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-21b/gate/distance.txt tmp/rung-body-arguments/distance-postedit.txt`:

    DISTANCE DOWN   5 -> 1 (-4)
        kind typecheck                4 -> 0      (-4)
        class BR                      2 -> 0      (-2)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared
        class OT                      2 -> 0      (-2)  other body errors (one-off library slips and checker limits)
        unit component FortressLibrary      4 -> 1      (-3)
        unit component List           1 -> 0      (-1)

`python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv tmp/rung-body-arguments/dist-post/errors.tsv`:

    landed 5 now 1
    GONE	typecheck	FortressLibrary.fss:L	Could not check call to operator BIG MIN - [\T extends StandardMin[\T\]\]()->BigReduction[\T,Maybe[\T\]\] is not applicable to an argument of type (). - [\T extends StandardMin[\T\]\]Generator[\T\]->T is not applicable to an argument of type (). x2
    GONE	typecheck	FortressLibrary.fss:L	Function body has type OR(I0,O0), but declared return type is O0.
    GONE	typecheck	List.fss:L	Function body has type OR(List.List[\Any\],List.List[\E\]), but declared return type is List.List[\E\].
    export 'are not matched by the declarations': landed 15 entries, now 15

Read by row against the per-site list (row 577):

| Row of `distance-sites.tsv` | Site | Ledger row | After |
|---|---|---|---|
| `:2` | the export error, `FortressLibrary.fss:12` | — | stays, its message text the same as the landed one (`diff` of the two message cells) |
| `:3` | `FortressLibrary.fss:4395` | 731 | gone |
| `:4` | `FortressLibrary.fss:4401` | 731 | gone |
| `:5` | `FortressLibrary.fss:1466` | 632 | gone |
| `:6` | `List.fss:146` | 731 | gone |

Nothing came. '#seconds 223 FortressLibrary 164', against the landed 235 and 172.

## 10. The ladder subset

The rule's subset (`gate.md`, "The ladder regression") holds each file whose recorded first error names something the change touched. This subset is empty: the edit touches only walk's library, which no compiled program links, and no first error in `explorations/compile-ladder/baseline-2026-09-19/raw/` names `upto`, `beyond`, `__bigOperator2` or `narrowToRange` (`grep -rl` finds no file). The nearest is `tests/simpleSum.fss`, whose first error names `BIG MIN` among its missing operators. It was run alone with the drivers copied under `tmp/rung-body-arguments/ladder/` (`run-subset.sh`, then `classify.py`): 'tests simpleSum.fss disambiguate 1 ? ... ? ; BIG juxtaposition ; BIG MIN ... Operator ? is not defined.', the same phase and first error as in `baseline-2026-09-19/ladder.tsv`. It is not on the newest landed `climb-batch-21b/gate/ladder/ladder.tsv`. No move.

## 11. Names added

The component `WrittenReductionArgumentsWalk`, its function `lengthOfZZ32s`, and the component `XXXPureListStridedSubscriptWalk` were grepped in `ProjectFortress/tests`, `test_library`, `compiler_tests`, `library_tests`, `other_compiler_tests`, `ProjectFortress/src/com/sun/fortress` and `Library`. No other declaration has these names.

## 12. Sentences made false

In the specification: none by section 4's grep. The rung's skeptic adds one sentence that the rung makes false at its general reading: Appendix I's entry "The contexts that give a call an expected type", its rationale, gives as the reason for the alternative not taken at row 560's `fail` calls that "the revival decided that the library's own practice is the standard, and the library does not route round a gap of the type checker" (`Specification/appendices/changes.tex:2470-2473`). The rung writes `BIG MIN[\ZZ32\]` and `<|[\E\] ... |>` where the checker cannot infer them, with row 731's gap open (fork 17). At its narrow reading, of row 560's calls, it stands.

In the record, for the gather:
- F-53: "the distance to the switch-over is 5 errors and the checker count is 3", with its list of the five. On this tree the distance is 1 and the count is 1, the export error in each.
- F-85: "One site of those declarations is still on the distance: `__bigOperator2`'s fused branch ... answers an `I0` where `O0` is declared (row 632...)".
- Row 632's claim, that the arm answers `I0` where `O0` is declared, with the checker's message: the arm's value is now cast.
- Row 731's notes: "3 sites of the distance (`explorations/coordinator/CLIMB-BATCH-15.md` section 4)".
- `explorations/coordinator/PLAN.md:62`, "row 731's three sites ... : a checker project before the switch-over": library text now clears the sites, and the checker project is row 731 itself. `PLAN.md:63`, item 46 by the call: done.
- `ProjectFortress/tests/InferUnfixedFBoundedWalk.fss:29`'s message, respelled here (section 6).

## 13. Points to report

- rung-R.patch: taken as it is. The diff equals it (index `d5abf7e6a..1997672c7`), and no improvement was found that keeps the team's algorithm (section 3).
- The distance: 5 to 1, site by site, nothing come (section 9).
- The count stage's table: 3 to 1. Its one error is the export error, which the stage now reaches. The clean-check reading is on the tree (section 8).
- The count stage's seconds: 149 (section 8).
- A walk value moves: `List`'s strided range subscript gives back a `List[\E\]` where it gave back a list of its elements' run-time class. The guard is red on the base and green after. No other test's verdict changes (section 5). The skeptic's second move: on a list of an element type walk left open, the strided subscript ends in `CastError` where it answered its elements (section 5, NEW-R-2).
- Row 731's rewritten line and row 632's close: `record.md`.
- Sentences made false: section 12.
- Files edited beyond those named: one message of `ProjectFortress/tests/InferUnfixedFBoundedWalk.fss:29` (section 6), and the new `ProjectFortress/tests/XXXPureListStridedSubscriptWalk.fss` (section 7). No edit of the checker or the desugarer.

## 14. Decisions

1. **rung-R.patch as it is.** Not taken: `indexOf(c)` in `upto` and `beyond`, a rewrite of the team's algorithm; a typed local or result type, which the planner's probe measured refused; for the arm, the widened pattern, which changes when it fuses, or leaving the row. Evidence: section 3.
2. **The guard asserts the list's type, through `=`, a typed binding and a parameter, not only its printed elements.** Not taken: a guard of printed values only, green on both trees, which hides the defect. Evidence: the base's 'FAIL: a ArrayList[\Int\] ... =/= a ArrayList[\ZZ32\]' (section 2). So the brief's "no value moves" did not hold for the list.
3. **`List`'s defect and `PureList`'s recorded as one row.** The `List` half is repaired here: home 1, the guard's assertions. The `PureList` half is deferred, and the specification settles it: home 2, an `XXX` test. So it is one row, `NEGATIVE-VERIFIED` with one half fixed, as the template says. Not taken: a row opened and closed for `List` and a second row for `PureList`; no row for `List` (home 1 needs none), which would leave the record without the library face of F-228's mechanism; editing `PureList.fss:73` here, a file the brief does not name. Evidence: section 7.
4. **`InferUnfixedFBoundedWalk.fss:29`'s message respelled.** Not taken: leaving the message false; moving the assertion into the guard. Evidence: section 6.
5. **The count stage run alone and first, then the distance stage with `ant testSystem` beside it, then `ant testSpecData`.** The count's seconds are a point to report (`records.md`, "Timings and citations"); the distance's seconds are not. Not taken: running everything at once, or each command alone.
6. **The ladder subset: `tests/simpleSum.fss` alone**, since the rule's subset is empty. Not taken: an empty run; the 85 programs of the pass list, which are the gate's.
7. **Two demos run old against new, not the 52.** Fork 20 gives the 52 to the gather.

No decision of the curator was needed beyond those the brief cites (P-78, P-48, item 46's call, forks 17 and 18).

## 15. Defects and their homes

- `BIG MIN` at `FortressLibrary.fss:4395` and `:4401`, and the comprehension at `List.fss:146`, refused by the checker (row 731's library sites): home 1, repaired. Their test is the distance stage. Row 731's checker gap stays open for user programs (its line is in `record.md`).
- The fused arm at `FortressLibrary.fss:1466` (row 632): home 1, repaired. Its test is the distance stage. The gather closes the row.
- Under walk, `List`'s strided range subscript gives back a list of its elements' run-time class: home 1, repaired, `tests/WrittenReductionArgumentsWalk.fss`. It is the fixed half of NEW-R-1.
- Under walk, `PureList`'s strided range subscript does the same: home 2, `tests/XXXPureListStridedSubscriptWalk.fss`. It is NEW-R-1's open half.
- Under walk, a list comprehension written at a type parameter left open ends in `CastError`, and since this rung so does `List`'s strided subscript on a list of that open type (the skeptic's): home 3, `tests/OpenParameterListComprehensionWalk.fss` and NEW-R-2.

## 16. For FACTS

See `record.md`, "For FACTS".

## 17. Commands

The old-against-new demo loop (scratch `tmp/rung-body-arguments/demos/oldnew.sh`) runs from the tree's root after the setup lines. For each demo, from `ProjectFortress/demos`:
1. `timeout -k 15 600 $FH/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base22 $OUT/old-caches $n.fss < /dev/null > $OUT/$n.old.txt 2>&1`
2. `timeout -k 15 600 ../../bin/fortress $n.fss < /dev/null > $OUT/$n.new.txt 2>&1`
3. `diff` of the two outputs.
