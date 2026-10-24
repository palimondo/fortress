# Climb batch 22, rung R: record lines

## Record lines

1. **The interpreter's library writes the static argument at row 731's three former sites, and the distance holds none of them.** Conditions: the compiled checker, run by the distance stage over the interpreter's library on this rung's tree (`wip/rung-body-arguments`, `55a87a61c`). Evidence:
   - `Library/FortressLibrary.fss:4395` and `:4401` now write `BIG MIN[\ZZ32\][i <- self.indices, self[i]=c] i`, and `Library/List.fss:151` writes `<|[\E\] self[i] | i <- r |>`.
   - `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-21b/gate/distance.txt tmp/rung-body-arguments/distance-postedit.txt` printed 'DISTANCE DOWN   5 -> 1 (-4)', 'kind typecheck 4 -> 0 (-4)', 'unit component List 1 -> 0 (-1)'.
   - `compare-sites.py` printed three GONE lines (the two `BIG MIN`, x2; the arm; `List.fss`) and 'landed 15 entries, now 15' for the export error.

   What it means: row 731's checker gap stays, for user programs and the team demos, while the library's own text no longer meets it. In the twelve components, every clause form of a big operator whose bound names its parameter writes its argument (`FortressLibrary.fss` 7 of 7), and so does every list comprehension (`List.fss` 3 of 3).
2. **`__bigOperator2`'s fused arm passes its result through `cast[\O0\]`, and the checker accepts the function.** Evidence: `Library/FortressLibrary.fss:1476`; compare-sites.py's 'GONE typecheck FortressLibrary.fss:L Function body has type OR(I0,O0), but declared return type is O0.' Under walk, `tests/NestedReductionFusion.fss` and `tests/GeneratorDeclarations.fss` run the arm fused and pass, before and after. What it means: row 632 closes. The team's pattern, and so when the arm fuses, are unchanged. No desugaring calls the function.
3. **Under walk, `List`'s range subscript at a stride other than 1 answered a list of its elements' run-time class until this rung; it now answers a `List[\E\]`.** Conditions: walk; a list built at its own type, as `<|[\ZZ32\] ...|>`. Evidence:
   - The base's code, through the harness (`harness-one.sh ... WrittenReductionArgumentsWalk.fss`, 2026-10-24T02:37:01Z, tree 64386618b): 'FAIL: a ArrayList[\Int\]: <|10, 12, 14|> =/= a ArrayList[\ZZ32\]: <|10, 12, 14|>'.
   - The base's code, a probe (`old-fortress.sh`): 'RHS expression type ArrayList[\Int\] is not assignable to LHS type List[\ZZ32\]' and 'RHS expression type ArrayList[\FlatString\] is not assignable to LHS type List[\String\]'.
   - The final tree: 'OK (4 tests)'.

   What it means: a walk value moves with this rung, where the brief expected none. The mechanism is F-228's: a method's return type does not direct an unwritten comprehension under walk.
4. **Under walk, `PureList`'s range subscript has the same defect.** Evidence: `Library/PureList.fss:73`, `<| self[i] | i <- r |>`. On the final tree, `bin/fortress PureListSubProbe.fss` printed 'RHS expression type PureList[\Int\] is not assignable to LHS type List[\ZZ32\]'. `tests/XXXPureListStridedSubscriptWalk.fss` reports 'OK Saw expected exception' as it is, and 'Missing expected failure' with `:73` written `<|[\E\] ...|>` for one run. What it means: a one-line repair waits for a rung that names `PureList`.
5. **With the component's type errors gone, the count stage's unit reaches the export check, so on this tree alone the count is 1, not 0.** Evidence: `checker-count/run.sh tmp/rung-body-arguments/checker-count-postedit.txt tmp/rung-body-arguments/cc-post` printed '#total 1', '#locations 1', '#crash none'. Its run.txt holds 'Library/FortressLibrary.fss:12:11-25: The following declarations in API FortressLibrary are not matched by the declarations in component FortressLibrary.' The run took 149 s alone (nproc 4, Xeon 2.10GHz, load 0.45, openjdk 25.0.4.1, FORTRESS_THREADS=1). What it means: the count reaches 0 only with rungs E and T; the planner measured '#total 0' on the three rungs' text together. F-53's "each unit stops at its first failing stage" is why the count did not show the export error before.
6. **No walk value moves at `upto`, `beyond` or the arm, and walk's suites keep their verdicts.** Evidence:
   - `ant testSystem`: shards 169, 168, 168 and 174, 679 in all, 'Failures: 0, Errors: 0'.
   - `ant testSpecData`: 'Tests run: 130, Failures: 0, Errors: 0'.
   - `BirdCount1q` and `BirdCount1t`, old against new: 676 lines each, 0 differing lines.
7. **Under walk, `List`'s range subscript at a stride other than 1, on a list whose element type walk left open (F-143), now ends in `CastError`, where the base answered its elements; a list comprehension written at such an open type parameter ended in `CastError` on the base already.** Measured by the rung's skeptic. Conditions: walk; a list built from a call whose self-bounded type parameter nothing fixes, a call the checker refuses (F-59). Evidence:
   - `ProjectFortress/tests/OpenParameterListComprehensionWalk.fss` through the base build's harness on the base's code (`FORTRESS_HOME=/home/user/fortress-base22 /home/user/fortress-base22/explorations/compile-ladder/rung-inference-walk/harness-one.sh .../old-harness .../OpenParameterListComprehensionWalk.fss`, 2026-10-24T03:19:50Z): 'FAIL: a Boolean: false =/= a Boolean: true; the list of the open element type at 0:2:2, stride 2, a comprehension written at the list's element type, ends in CastError', its three earlier assertions holding, the written comprehension's `CastError` among them.
   - The same test on the head (`harness-one.sh $PWD/tmp/rung-body-arguments/skeptic/h2 ...`, 03:20:10Z, tree 68b527766): 'OK (1 test)'.

   What it means: a second walk value moves with this rung, from a value to an error, only in programs the checker refuses. The `CastError` is the comprehension's own, at `cast[\CovariantCollection[\T\]\](cc)` (`Library/List.fss:179`), which the written `[\E\]` now reaches at an open `E`; NEW-R-2 records it.

## For FACTS

**The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter, and of every list comprehension, in the twelve components the distance checks; `__bigOperator2`'s fused arm casts its result to `O0`.**
- The facts:
  - The library follows P-78's workaround for row 731: `BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4395`, `:4401`), and `<|[\E\] self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:151`). These stand beside `SUM[\T\]` at `:2553`, `:2932`, `:2937`, `SUM[\ZZ32\]` at `:4579`, `:4595`, and the team's `transpose` (`List.fss:504`).
  - The clause forms left unwritten are of plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, or of `BIG LEXICO`, which has no static parameter.
  - The fused arm (`:1476`) uses the library's cast device for an arm whose type the `typecase` cannot show (F-264), as `__builtinFactory1`'s `N[\0\]` arm does (`:2573`).
- What it means:
  - The distance holds no site of rows 731 and 632, while row 731's checker gap stays for user programs and the team demos.
  - Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`, where it answered a list of its elements' run-time class. `PureList`'s, at `Library/PureList.fss:73`, still does (NEW-R-1).
- The number a decision rests on: the distance 5 to 1 on this rung's tree. The four sites gone are row 731's three and row 632's one; the one left is the export error, rungs E's and T's.
- Tests: the distance stage (`explorations/coordinator/tools/distance/run.sh`, its typecheck kind 0); `tests/WrittenReductionArgumentsWalk`; `tests/NestedReductionFusion`; `tests/XXXPureListStridedSubscriptWalk`.
- Detail: `compile-ladder/rung-body-arguments/REPORT.md`, sections 3, 5, 7, 9.

Entries the gather changes:
- F-53: the distance and the count on the merged tree.
- F-85: its sentence "One site of those declarations is still on the distance: `__bigOperator2`'s fused branch" becomes the cast at `:1476`.
- F-59: may add that the library writes the argument at its own sites.
- F-143: may add that a list comprehension written at the open type parameter ends in `CastError` at its unwrap's cast, and so does `List`'s strided range subscript on a list of that open type (NEW-R-2).

## Changes to existing ledger rows

Row 731, rewrite (its whole new line):

| 731 | **the compiled checker fixes a generic big operator's static parameter in an unwritten clause form by its bound or the expected type only, never from the clauses**: one whose bound names the parameter, as `SUM`'s, `PROD`'s and `BIG MIN`'s do, has no instance, and the reduction is refused | NEGATIVE-VERIFIED | implementation gap (checker) | `Specification/advanced/parallelism-locality/defining-generators.tex`, "Simple Desugaring of Expressions with Generators" | `ProjectFortress/compiler_tests/InferBigOperatorUnwritten.fss` | ours (sum-replacement judgement) | siblings: 424, 716. An F-bounded one reads 'not applicable to an argument of type ()'. A plain-bounded one takes the expected type only where its type at the bound does not fit (`InferBigOperatorExpectedType`), so a list comprehension under a declared `List[\E\]` keeps its bound `Any`, which that type refuses. The interpreter's library writes the argument at its three former sites (`Library/FortressLibrary.fss:4395`, `:4401`, `Library/List.fss:151`), so the distance holds none; user programs and the team demos still need it. Workaround: write the static argument. |

(1145 characters in all, the notes 569, the claim 288, the claim unchanged.)

Row 632, close: `ledger.py close 632 --commit <rung R's landed commit, 55a87a61c on the branch> --test explorations/coordinator/tools/distance/run.sh`. Its site, `FortressLibrary.fss:1466` at the base, is GONE in compare-sites.py on this rung's tree.

## New rows

NEW-R-1, in section "8. Generators, reductions and ranges" (or "10. Strings, maps and printing" by the gather's choice):

| NEW-R-1 | under walk, a pure list's range subscript at a stride other than 1 answers a list of its elements' run-time class: for `l = <\|[\ZZ32\] 10, 11, 12, 13, 14, 15 \|>` of `PureList`, `l[0:4:2]` is a `PureList[\Int\]`, which a binding declared `List[\ZZ32\]` refuses | NEGATIVE-VERIFIED | library bug (library) | `basic/expressions/comprehensions.tex`, "Comprehensions" | `ProjectFortress/tests/XXXPureListStridedSubscriptWalk.fss` | climb batch 22 rung R | siblings: 20, 717, 731. Its comprehension `<\| self[i] \| i <- r \|>` (`Library/PureList.fss:73`) writes no static argument, and a method's return type does not direct it under walk (F-228), so it takes the join of the elements' run-time classes. `List`'s half is fixed: its subscript (`Library/List.fss:151`) writes `<\|[\E\] self[i] \| i <- r \|>` since climb batch 22's rung R, where it answered an `ArrayList[\Int\]` unequal to `<\|[\ZZ32\] 10, 12, 14 \|>` and an `ArrayList[\FlatString\]` for a list of strings (`WrittenReductionArgumentsWalk`). Stride 1 runs through `drop` and `take`. Workaround: write the same. |

(1086 characters in all, the claim 261, the notes 619.)

NEW-R-2, the skeptic's, in section "2. Types: generics, static parameters, inference and coercion", beside row 663 (home 3: the specification is silent, so its test asserts today's behaviour):

| NEW-R-2 | under walk, a list comprehension written at a self-bounded type parameter that nothing fixed ends in `CastError` at its unwrap's cast (`Library/List.fss:179`), and so, since climb batch 22's rung R, does `List`'s range subscript at a stride other than 1 on a list of that open element type | CONTESTED | implementation gap (walk) | silent | `ProjectFortress/tests/OpenParameterListComprehensionWalk.fss` | climb batch 22 rung R | siblings: 663, 716, NEW-R-1. With `emptyOf[\T extends SelfBound[\T\]\](): List[\T\] = <\|[\T\] \|>` and `xs = emptyOf().addRight(Leaf)`, `<\|[\T\] x \| x <- xs \|>` over `T` stops at `cast[\CovariantCollection[\T\]\](cc)` (`List.fss:179`) at 64386618b and after. Unsettled: the `revival-inference` callout of `basic/inference.tex` has walk admit every value checked against the open type, and is silent on a generic type that holds it, as `CovariantCollection[\OPEN\]`; the checker refuses the call that leaves it open (F-59). `xs[0:2:2]` answered 2 elements at 64386618b, before `List.fss:151` wrote `[\E\]`; stride 1 runs through `drop` and `take`. Workaround: `emptyOf[\Leaf\]()`. |

(1127 characters in all, the claim 289, the notes 683.)

## Handover line

Rung R (`rung-body-arguments`, `wip/rung-body-arguments`, `55a87a61c` and `3f3bff4ab`):
- What it did: row 731's three library sites now write their static argument (`BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond`, `<|[\E\] ... |>` in `List`'s range subscript), and `__bigOperator2`'s fused arm casts its result to `O0`.
- Its stages on its own tree: the distance 5 to 1 and the count 3 to 1, the export error left in each.
- Under walk, `List`'s strided subscript now answers a `List[\E\]`. `PureList`'s does not yet (NEW-R-1, `XXXPureListStridedSubscriptWalk`). On a list whose element type walk left open, a program the checker refuses, it now ends in `CastError`, as a comprehension written at that open type already did (NEW-R-2, `OpenParameterListComprehensionWalk`, the skeptic's).
- Rows: row 731 rewritten, row 632 to close, NEW-R-1 and NEW-R-2 new.

## Revival change

**The change.**
- What the team's library does: at `a874948ac` it writes three clause forms without their static argument, `n = BIG MIN[i <- self.indices, self[i]=c] i` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4008`, `:4014`) and `<| self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:150`). Its `__bigOperator2` fused arm returns `(outer'.unwrap)(...)` uncast (`Library/FortressLibrary.fss:1158`).
- What the tree now does: it writes `BIG MIN[\ZZ32\][...]` (`Library/FortressLibrary.fss:4395`, `:4401`) and `<|[\E\] self[i] | i <- r |>` (`Library/List.fss:151`), and passes the arm's result through `cast[\O0\]` (`:1476`). Under walk, `List`'s range subscript at a stride other than 1 now answers a `List[\E\]`. Before, it answered a list of its elements' run-time class, as an `ArrayList[\Int\]` for a `List[\ZZ32\]`, which was unequal to a list of the same elements and refused by a binding or parameter of the list's type. The test that shows it is `ProjectFortress/tests/WrittenReductionArgumentsWalk.fss`. `PureList`'s range subscript keeps the team's text and its walk behaviour (`Library/PureList.fss:73`, `ProjectFortress/tests/XXXPureListStridedSubscriptWalk.fss`). On a list whose element type walk left open (F-143), in a program the checker refuses, `List`'s strided subscript now ends in `CastError`, as a list comprehension written at that open type already did (`ProjectFortress/tests/OpenParameterListComprehensionWalk.fss`, NEW-R-2).
- The reason, as evidence:
  - The compiled checker refuses each of the four sites over the interpreter's library: 'Could not check call to operator BIG MIN - [\T extends StandardMin[\T\]\]()->BigReduction[\T,Maybe[\T\]\] is not applicable to an argument of type ().'; 'Function body has type OR(List.List[\Any\],List.List[\E\]), but declared return type is List.List[\E\].'; 'Function body has type OR(I0,O0), but declared return type is O0.' (`explorations/compile-ladder/gate/distance-sites.tsv:3-6`).
  - The specification's revision box asks a program that both implementations are to run to write such an argument (`Specification/basic/expressions/reductions.tex:51-55`).
  - Under walk, the unwritten comprehension gave 'RHS expression type ArrayList[\Int\] is not assignable to LHS type List[\ZZ32\]'.

**Provenance.** P-78's workaround for row 731 ("write it in every clause form"); the batch's forks 17 and 18; item 46, the coordinator's call by the record (`cast[\O0\]`, the team's pattern kept). Climb batch 22, rung R.
