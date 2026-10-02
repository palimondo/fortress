# Climb batch 8: the gather's record

Written at the gather stage of climb batch 8 (2026-10-02), the run of `explorations/coordinator/CLIMB-BATCH-8.md` (rungs I, O, Q and M), on `main` from the base `493b4076f`. `main` was at `c3ec0c441` when the gather began, nine coordinator commits above the base (`638855abf` to `c3ec0c441`), all under `explorations/`; none touches a rung's file. All four rungs were approved, and each landed as one commit composed from its branch's net change; no branch is a parent of anything on `main`.

**Preconditions.** `git status --porcelain` was empty, and `493b4076f` is an ancestor of `HEAD`.

**Scratch.** The gather's patches, scripts and logs are in its scratchpad, not in the tree. To run the tests it added, the gather built one merged tree outside the main tree: a detached worktree at `c3ec0c441` (`/home/user/fortress-gather8`) with the four patches applied by `git apply --3way --index` (no conflict), `ant compileAll` (52 s) and the library-order rebuild. For rung M's count it built a second tree, a detached worktree at `493b4076f` (`/home/user/fortress-gather8m`) with M's net change and the gather's correction 1, then `ant compileAll` and the count stage.

## The order the rungs were applied in

I, then Q, then O, then M. The files two or more rungs edit, with each rung's lowest edited line at the base:
- `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala`: I at 136 (two lines inserted), O at 438 (one line replaced) and 759 (sixteen inserted).
- `Specification/appendices/changes.tex`: I at 1610, Q at 2488 (its new entry, inserted).
- `Library/FortressLibrary.fsi`: M at 139, Q at 284.
- `Library/FortressLibrary.fss`: Q at 361, M at 1440.

The literal key, each rung's lowest edited line in a shared file, ranks I 136, M 139, Q 284, O 438. M's hunks at `FortressLibrary.fsi:139` and `:150` replace one line each (`CMP`'s result type on `LessThan` and `GreaterThan`) and move no line; M's first hunk that moves lines is at `.fsi:919` and `.fss:1440`, below every hunk of Q in both files, while Q's insertions sit above M's in both. So Q goes before M, a decision of the gather made on the key's purpose, which is that a later rung's hunk not move lines a landed record cites. I goes before O (`TypeAnalyzer.scala`) and before Q (`changes.tex`). O and M share no edited file. O went before M; O's folded lines that cite lines of the library files M moves cite them "at `493b4076f`" (row 477's note, row 563, and O's entries in `PLAN.md`), and M's folded lines that cite `OverloadingChecker.scala`, which O moved, are re-anchored by symbol to the landed tree (rows 584 and item 38).

Where a later rung moved lines an earlier rung's records cite:
- I's records cite `changes.tex` by entry name, and `TypeAnalyzer.scala:137-138`, above O's hunks; no re-anchoring.
- Q's folded lines cite library lines on Q's own tree, which I does not edit. M's hunks move three of them, row 580's api citations of `Range`'s `IN`, `Indexed` and `FullRange` (`.fsi:2179`, `:1245`, `:2254-2262` on Q's tree): M's commit re-anchors them by content to `:2182`, `:1247`, `:2257-2265`, in the row and in its `PLAN.md` entry. Every other library line Q's rows and notes cite is above M's first moving hunk and was checked by content on the landed tree. `REPORT.md` of each rung cites its own tree.
- O's citations of `TypeAnalyzer.scala:438`, `:760-774` were re-anchored to `:440`, `:762-776` (I's two lines above).
- M's citations of `FortressLibrary.fsi`/`.fss` lines on its own tree were re-anchored by content to the landed tree (Q's insertions moved them by 38 in the component and 47 in the api at the cited places): row 472's note `:3285`, row 473's `.fsi:1998` and `.fss:3297-3298`, row 433's `.fss:3079` and `.fsi:1897`, row 582's `.fss:3152`, rows 585 and 586 and item 38.

## Final row numbers

From 559, the first free row, in manifest order I, O, Q, M, each rung's own provisional rows first and then the rows the gather opened from its skeptics' recommendations. The rows are in numeric order after row 558 in section 10 of the ledger.
- I: its provisional 559 and 560 keep their numbers.
- O: its provisional 559 to 568 are 561 to 570; its second skeptic's R1 to R4 are 571 to 574.
- Q: its provisional 559, 560, 562, 563 and 564 are 575, 576, 577, 578 and 579 (its provisional 561 was never opened); its second skeptic's two rows are 580 and 581.
- M: its provisional 559 and 560 are 582 and 583; its skeptic's three rows are 584, 585 and 586, and its fourth recommendation is a note on row 316.

Each rung's `REPORT.md`, `SKEPTIC.md` and `JUDGE.md` carry the final numbers, with one italic note line under the title saying so. No rung's test cites a provisional number.

## Rung I (`rung-instance-bound`)

**Inherited from the branch.** Seven commits, `2290b30f9` (the tests alone) to `7a405ceb5` (the skeptic's findings): the checker change (`f97debd88`), the inference chapter (`032c7cce0`), row 512's promotion (`e0ba93ae2`), the decision record's citations (`9853cdd0d`), the pin of the refusal with no expected type (`6a348e255`). The branch carries `SKEPTIC.md` and `decision-record.md`.

**Applied.** `git apply --3way --index` of `git diff 493b4076f...wip/rung-instance-bound`, no conflict; every path matches the branch in the index blob for blob (43 checked), the deletions absent.

**Written from the journal.** `REPORT.md` and `record.md` (`journal-text.py`, `reportText` and `recordText` of `rung:I resume:I repair:I`); `SKEPTIC.md` is the branch's. `record.md` was folded and is not landed.

**Corrections** (the skeptic's four, all made at the gather):
1. Route 2's home 2: `ProjectFortress/compiler_tests/InferBoundMeetsExpectedTrait.fss` (`SkMeetThrow`'s shape, `REACHED` before the call, its message citing `inference.tex`, section "The Static Arguments of a Call"), `InferBoundMeetsExpectedTraitLink.test` (link) and `XXXInferBoundMeetsExpectedTrait.test` (run, `run_out_contains=REACHED`, `run_err_contains=Intersection`). On the merged tree: `junit.sh gather8-merged ProjectFortress/compiler_tests InferBoundMeetsExpectedTraitLink.test XXXInferBoundMeetsExpectedTrait.test`, ". link ... OK", then ". run ... REACHED", "java.lang.Error: java.lang.Error: Unable to read serialized data for Intersection??", "Saw expected failure (Exit code != 0)", "OK (1 test)". On a stand-in whose bound is `B` (`junit.sh gather8-fixI tmp/g8/fixI ...`): "REACHED", "PASS", "Failed to satisfy run_err_contains; expected Intersection", "Tests run: 1,  Failures: 1". Walk prints `REACHED`, `PASS`.
2. The Effect of "The inference of a call's static arguments" (`Specification/appendices/changes.tex:1740-1746`) names both routes and says that a program the compiled path ran before, at one conjunct or at `BottomType`, now dies loading that instance.
3. `REPORT.md` section 7 (the row 559 bullet: both routes, `SkInterRan` and `SkMeetTraits` with their base and head lines and commands, the regression stated) and section 10; row 559 in the ledger says the same, with the skeptic's route 3 (`SkOverPassAny`).
4. `ProjectFortress/compiler_tests/InferCoercionShapes.fss:79`: the message says the call instantiates `idt` at the numeral's own type and converts the result, citing `inference.tex`, section "The Static Arguments of a Call"; `c = three` unchanged. `junit.sh` on the merged tree: "OK (3 tests)". `REPORT.md` section 9's line on it says it was reworded at the gather.

**Recommended rows.**
- Row 412's note (`SkUnitObj`, a program's own unbounded result-only generic in a `()` position refused since rung I): appended in the skeptic's words.
- Row 559 extended to three routes: done in the folded row 559, with both tests named.

**Folded.** One FACTS entry under "The checker and the one library" and one sentence appended to each of three entries the record names ("The compiled checker infers a generic's static arguments with coercion ...", "Keeping the expected type at a call written `f(x)` ...", "The specification's type-inference chapter states the rule of climb batch N"); the fourth it names, "The true distance to the switch-over", wants the gate's landed figure and is left to the commit stage or the coordinator. Ledger: rows 447, 505, 508, 512, 515, 518 and 535 set FIXED with `f3032eed8`, row 541 FIXED for the checker; notes on 447, 505, 425, 516, 515, 518, 535, 541, 508, 512, 424, 538, 455, 488 and 412; rows 559 and 560. The handover paragraph. `PLAN.md`: item 20 read again, items 18 and 34 marked built, item 36, and six entries under "Climb batch 8, listed for his review".

**Items for Pavol.** I.worker.3 and I.skeptic.2: item 20 (appended). I.worker.4: item 36. I.worker.1 and I.worker.2: the order-of-attempts entry. I.worker.6 and I.skeptic.1: the row 559 entry. I.worker.5: the row 425 entry. I.worker.7: the stop entry. I.worker.8: the reductions callout entry.

## Rung Q (`rung-numeral-library`)

**Inherited from the branch.** Thirteen commits, `4a8c27003` (the tests alone) to `287d118f6` (the second skeptic's judgement): the first pass (`8fc2fdfde` to `9d75bb063`), the first skeptic's refusal (`3ab32e5a9`), the judge's ruling (`ffe0a21a3`), the repair round (`79910dcdf` to `32ba2ab5e`). The branch carries `JUDGE.md`, `SKEPTIC.md` (both rounds) and `record.md`.

**Applied.** No conflict; every path matches the branch but `changes.tex`, which carries I's edits above Q's new entry (`\subsection{The type of an integer numeral}` lands between "The proof of overloading resolution" and "Passages not yet revised").

**Written from the journal.** `REPORT.md`; `record.md`, `SKEPTIC.md` and `JUDGE.md` are the branch's, `record.md` folded and taken out.

**Corrections.** The first judgement's seven, which the repair round made, each checked in the file it names:
1. The eight numeral-only refusals: repaired by `IntLiteral`'s own declarations (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:179-180`, `:199`, `:213-219`); `REPORT.md` section 6's table reads 0 on `edit3` for `NumeralOnly`, `SkqCk2`, `NumeralCk`, `NumeralCk2`; sections 6 and 14 and the FACTS entry no longer say no refusal is new.
2. `IntegerOrderNumerals.fss`'s messages say what they pin (the second judgement, "Checked and holding").
3. The provenance's `spec:` line cites `basic-integers.tex:625-645`; its `deviation:` line names `Library/ReflectiveQuickCheck.fss:147` and `unsigned`'s two api lines.
4. The Effect of "The type of an integer numeral" says what walk's `MAXNUM`, `MINNUM`, `CMP` and comparisons reach.
5. `ProjectFortress/tests/XXXNumeralWithNN32.fss`, shown through `harness-one.sh` (the second judgement, "OK Saw expected exception", and red on a deliberate fix).
6. The FACTS entry says what walk reaches.
7. `REPORT.md` section 3 names the exception, a program that names the object `IntLiteral`.

The second judgement's two, made at the gather:
8. `REPORT.md` section 6 gains three rows of its table (`SkqR2b`, `SkqR2g`, `SkqR2f`) and a paragraph with the probe line for each of the two new refusals; section 14 gains a bullet for each; the FACTS entry's title is scoped to "the members of `Integral[\I\]` and the getters `zero` and `one`", and it names the two refusals with rows 580 and 581.
9. `explorations/coordinator/map/dormant-code.md:44`, `IntLiteral`'s operators, now reads wired since rung Q; row 318 gains a note that the arithmetic its last sentence says stays open is enabled.

**Recommended rows** (the first judgement's four and the second's two):
- The eight refusals, if not repaired: refused as a row, since the repair round repaired them (correction 1).
- The object `IntLiteral`'s arithmetic answering a `ZZ32` under walk: refused as a new row, since the rung opened it, row 578.
- Candidate 1's cost as a note on the R9 row: refused as a separate note, since row 575 carries it ("the checker types `u + 1` for an `NN32` `u` at `ZZ64`").
- `IntLiteral`'s `TIMES` missing from the api: refused, since the repair round added it (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:199`).
- A numeral `IN` a `#` or `:` range: opened, row 580.
- `(3).minimum` and `(3).maximum`: opened, row 581.

**Folded.** One FACTS entry; row 517 FIXED; notes on 517, 454, 442, 484, 430, 438 and 318; rows 575 to 581; the handover paragraph; `PLAN.md` item 33 marked done, item 37, and seven entries.

**Items for Pavol.** Q.worker.1, Q.skeptic.1, Q.judge.1 and Q.skeptic2.2: item 37 (R9 against answer 8). Q.worker.2, Q.skeptic.3, Q.judge.2: the `unsigned` entry. Q.worker.3, Q.judge.3: the `IntLiteral` declarations entry. Q.worker.4, Q.skeptic.2, Q.judge.4: the `z = 0` entry, which also holds gather.1. Q.worker.5, Q.judge.5: the `ReflectiveQuickCheck` entry. Q.worker.6, Q.judge.6: the row 576 entry. Q.skeptic2.1: the row 580 entry.

## Rung O (`rung-overloading-checker`)

**Inherited from the branch.** Twelve commits, `573381500` (the failing tests alone) to `ce52999af` (the second skeptic's judgement): the first pass (`bf759afcb`, `fff55e16b`, `10d1e672b`), the first skeptic's refusal (`aaeaed9a2`), the judge's ruling (`ba76e68ce`), the repair round (`35c7f177d` to `027efdeb3`). The branch carries `JUDGE.md`, `SKEPTIC.md` (both rounds) and `record.md`, the last byte-equal to the journal's `recordText` (`cmp`), so the first judgement's correction 5 ("the gather writes `record.md` from `recordText`") is met by the branch's file.

**Applied.** No conflict; every path matches the branch but `TypeAnalyzer.scala`, which carries I's two lines at 137-138 and O's edits at 440 and 762-776.

**Written from the journal.** `REPORT.md`; `record.md` folded and taken out.

**Corrections.** The first judgement's five, which the repair round made: findings 1 and 2 repaired, home 1 (rows 568 and 569; the count 83 and distance 607 re-run); the memo's test `XXXFunctionalMethodMeetJoinOfClosedTraits`, failing on `573381500` and passing at the head, and `REPORT.md` section 7 corrected; the capture's functional-method branch held by `InheritedFunctionalMethodStaticParamSameName` (a `typecheck` test, failing on the base); the report's three sentences corrected (sections 5, 11 and 12), and its `:201` kept with the line quoted (`REPORT.md` section 16: line 201 at `493b4076f` is the `checkFunctionOverloading` call, which the gather confirmed). The second judgement's five, made at the gather:
1. `XXXFunctionalMethodMeetNarrowedSelfNotFirst.fss`, `FunctionalMethodMeetNarrowedSelfNotFirstLink.test` and `XXXFunctionalMethodMeetNarrowedSelfNotFirst.test`, the skeptic's files unchanged; on the merged tree ". link ... OK", then "ClassFormatError: Duplicate method name \"pick?1\"", "Saw expected failure (Exit code != 0)". Row 571; `REPORT.md` section 13 names it beside rows 564 to 566.
2. `XXXFunctionalMethodOverloadSelfLast.fss` with its two `.test` files, unchanged; on the merged tree "REACHED", "ClassCastException", "Saw expected failure (Exit code != 0)". Row 573.
3. `REPORT.md` section 5 (3) and section 11's second bullet say that the premise does not hold, with `SkAbsConc`, `AbstractMethodChecker.scala:90-103` and `traits.tex:571`; the FACTS entry's sentence carries the exception (row 572); the forPavol entry is the `PLAN.md` entry on decision 1. Row 572 opened.
4. `REPORT.md` section 3 names `makeArrowFromFunctional(_, _, omitSelf = true, _)` (`STypesUtil.scala:157-168`) and `paramTypeWithoutSelf` (`:1764-1775`), says why `withoutSelf` works on the instantiated arrow (the per-provider arrows are already instantiated by the inherited declaration's replacer and renamed apart, `OverloadingChecker.scala:142-147`), and counts the one self-first site left, `:423` (row 574).
5. `FunctionalMethodMeetInheritedFromApi.fss:13` and `FunctionalMethodMeetSelfSecond.fss:21` cite `overloading.tex`, section "Overloading Resolution"; no assertion changed. Both run "PASS", "OK (3 tests)" on the merged tree.

**Recommended rows.**
- The first judgement's two ("if not repaired in the repair round"): refused as new rows, since the repair round repaired both and the rung opened them as rows 568 and 569 (FIXED).
- R1: opened, row 571 (home 2, correction 1).
- R2: opened, row 572 (the row alone).
- R3: opened, row 573 (home 2, correction 2).
- R4: opened, row 574 (the row alone).

**Folded.** One FACTS entry, flattened to one bullet, with the exception for a component's own abstract declarations; rows 556, 557 and 477 FIXED; notes on 556, 557, 477, 546, 547, 545, 375 and 544; rows 561 to 574; the handover paragraph; nine `PLAN.md` entries.

**Items for Pavol.** O.worker.1, O.judge.1, O.skeptic.1, O.skeptic2.1 and O.judge.4: the decision 1 entry. O.worker.2, O.judge.2: the self-parameter entry. O.worker.3: the object-expression stop entry. O.worker.4 and O.skeptic.2: the per-provider sites entry. O.worker.5, O.judge.3: the row 546 stop entry. O.worker.6: the row 547 entry. O.worker.7 (with M.worker.5): the `cross` entry. O.worker.8, O.worker.9: the `Character` entry.

## Rung M (`rung-library-meets`)

**Inherited from the branch.** Four commits, `62a62f94c` (the tests alone) to `e995c31c0`. The branch carries none of the three files, and its skeptic's verdict is not on it.

**Applied.** No conflict; every path matches the branch but `Library/FortressLibrary.fsi` and `.fss`, which carry Q's declarations above M's. The landed library files are byte-equal to the merged tree's (`cmp`).

**Written from the journal.** `REPORT.md`, `record.md` and `SKEPTIC.md` (`skepticText` of `skeptic:M`); `record.md` folded and not landed.

**Corrections** (the skeptic's seven, all at the gather):
1. `Library/FortressLibrary.fsi:1513` reads `abstract copy():T`, as `StandardImmutableArrayType`'s at `:1503`. The count stage on a tree at `493b4076f` with M's net change and the correction (`explorations/coordinator/tools/checker-count/run.sh tmp/checker-count-M.txt tmp/cc-scratch`): `#total 39`, `#locations 27`, `FortressLibrary 72`, `RangeInternals 6`, `#crash none`, `#shadow matches the tracked StaticChecker`. The export row is the gate's distance stage's to show on the merged tree.
2. `REPORT.md` section 3 says the unmatched list gained `AssociativeReduction` (`lift`) and `StandardMutableArrayType` (`copy`, taken out by correction 1), and that the distance counts the list as one row.
3. `FlatStringSplit.fss`: its comment one line on what it checks (row 356), its message without `row 356:` and the stale `.fsi:2330-2331`; `StringAvFlat.fss`: its comment one line (row 531). No assertion changed.
4. Not made as asked, and why. The gather wrote the expected-failure compile test (`compiler_tests/XXXOperatorOverloadNoMeet.fss`, `opr +(x: A, y: A)` beside `opr +(x: B, y: B)`, `.test` `compile`, `compile_err_contains=Invalid overloading of +`) and ran it through `junit.sh` on the merged tree: ". compile ... Saw failure, but did not satisfy compile_err_contains; expected Invalid overloading of +", "Tests run: 1,  Failures: 1", the compile having succeeded. The harness fails an `XXX` compile test whose compile succeeds (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:383-399`), so no `XXX` compile test can hold an over-acceptance, as row 487's and O's row 572's homes say; landing it would turn the gate red. Its home is row 584 alone, which quotes the harness's lines; `REPORT.md` section 6 lists it so.
5. `ProjectFortress/tests/XXXUniformDistributionStridedRange.fss`, asserting `Just(2)` and `Just(8)` for `UniformDistribution[\ZZ32\](2:8:3)`: `harness-one.sh` on the merged tree, "REACHED", "ProgramError ... Library/Random.fss:373:74-83", " OK Saw expected exception", "OK (1 test)"; on a stand-in over `2:8`, "PASS", " Missing expected failure", "Tests run: 1,  Failures: 1". Walk directly: "Cannot find definition for method lower given receiver StridedFullParScalarRange". Row 483's note gains section 4's facts; row 586.
6. `REPORT.md` section 4 names all four families and section 6 their home, row 585.
7. The FACTS entry reads "23 declarations retyped (the stage's return-type rows 29 -> 3)".

**Recommended rows.** The checker skipping symbolic operators: opened, row 584. `String`'s four families: opened, row 585. `UniformDistribution`'s `lower` and `upper`: opened, row 586, home 2. The compiler world's `String` with `self` on the left only: a note on row 316.

**Folded.** One FACTS entry; rows 483, 531, 356 and 472 FIXED, row 473 partly; notes on 483, 531, 356, 472, 473, 421, 433 and 316; rows 582 to 586; the handover paragraph; `PLAN.md` item 38, nine entries, and review-routed.1 and .2 marked done.

**Items for Pavol.** M.skeptic.1, M.skeptic.2: item 38. M.worker.1: the juxtaposition entry. M.worker.2: row 582's entry. M.worker.3: row 583's. M.worker.4: `distribute`'s. M.worker.5: the `cross` entry. M.worker.6: the `MINMAX` entry. M.worker.7: the stop entry. M.worker.8: the `classify.py` entry. M.skeptic.3: the `lift` entry.

## The gather's own point

gather.1: the Effect of Appendix I's entry "The type of an integer numeral" (`Specification/appendices/changes.tex:2573-2574`) says that a numeral beside a value of an integer type is converted to that type, whose own declaration is then the most specific; for `=` the checker over the one library takes `Number`'s catch-all, applicable without coercion (rung Q's judge, `JUDGE.md` section 6). The text stands as the rung wrote it; it is in the `PLAN.md` entry on `z = 0`. No ledger row and no test: no gated program observes the checker over the one library before the switch-over. The review's judge upheld the review's finding on it, adding `=/=` beside `=`, and the review's repair rewrote the sentence (`JUDGE-review.md`, section 4).

## Not done here

- `Specification/fortress.pdf` is not rebuilt; the commit stage rebuilds it once on the landed tree.
- FACTS "The true distance to the switch-over" is not given the landed figure, which needs the gate.
- The microGPT inputs that row 576 names are not in the tree; the commit stage's microGPT step meets FileNotFound unless they are restored.

## The landing

**The gate, run in full on the tree at `2c697fe52`** (2026-10-02, from 20:00 to 20:22 UTC, the workflow's gate stage, with a clean working tree): green. The review's three commits above the rung commits (`b3c9e2dbf`, `e1511eb5e`, `2c697fe52`) touch records under `explorations/` and `Specification/appendices/changes.tex` alone. The gate's summary line: GREEN; `compileAll` `BUILD SUCCESSFUL` in 24 s; `testFast` 48 suites, 1,776 tests, 0 failures, 0 errors, in 9 min 1 s; `testSystem` four shards, 122 + 120 + 119 + 119 = 480 tests, 0 failures, in 2 min 45 s; 42 of 42 four-thread `atomic` runs `PASS`; the ladder unmoved; `COUNT DOWN 59 -> 56`; `DISTANCE DOWN 598 -> 565 (-33)`.
- `gate_compare` against `explorations/compile-ladder/climb-batch-7b/gate/summary.txt` printed nothing. Two counts rose: the compiler track 959 to 1,004 (`compiler_tests/` holds 516 `.test` files against 492 at the base) and the system shards' sum 470 to 480 (`tests/` holds 479 `.fss` files against 469).
- The ladder comparison empty: 85 files at `pass` with their filtered output unchanged, the eighteen microGPT components at `disambiguate` with an empty diff against the baseline, nothing declared and nothing moved.
- The checker count `COUNT DOWN 59 -> 56, declared none`: `FortressLibrary` 106 to 10, `RangeInternals` 12 to 102, `#locations` 48 to 18; `#crash` none; the shadow matching; the overloading memo off.
- The distance stage, reported and never red: `DISTANCE DOWN 598 -> 565 (-33)` against `climb-batch-7b/gate/distance.txt`, in 968 s (`FortressLibrary` 580): the kinds overloading 123 to 99, return type 29 to 2, typecheck 386 to 404. The five "Not in the trait table: FortressBuiltin.Character" crashes are gone (row 477); the other three crash rows are the same declarations at shifted lines (`FortressLibrary.fss` 1247 to 1285, 2430 to 2473, 2803 to 2846), with identical messages; `Stream`'s variance stage still crashes.
- An earlier full gate run, on the tree of `0ae526b31` before the review's commits, differs from this one only in its timing lines; it is kept untracked at `tmp/gate-batch-8-run1/`.

The gate's outputs are in `climb-batch-8/gate/` (`summary.txt`, `checker-count.txt`, `distance.txt`, `ladder/`), the next batch's comparands. The distance stage's per-site list is at `explorations/compile-ladder/gate/distance-sites.tsv`, one fixed path overwritten at each landing, which the next batch's count and distance rungs read as their before (POSITIONS.md, "No re-measuring what the record holds"). The full gate logs stay under `tmp/gate-batch-8/` and are not committed.

**The placeholders.** Filled in the landing commit, each by the rung its own sentence names: rung I's commit is `f3032eed8`, Q's `9d2e4c856`, O's `70d5486f9`, M's `0ae526b31`. Counts: the ledger 17 (I 8, M 5, O 3, Q 1), the handover 4 (one per rung paragraph), this record 1 (I's section), `FACTS.md` none. The literal text left under `explorations/` is the procedure's own, in the same files and counts as at the base `493b4076f`.

**The specification.** `Specification/fortress.pdf` rebuilt once on the landed tree (`./ant genSource` and `./ant tex` in `Specification/fortress/`): 660 pages, no undefined reference in the final pass (the first pass's `sec:revival-numeral-type`, rung Q's new label, resolves in the later passes).

**Footers and the push.** Every commit from `493b4076f` to the landing ends with the two footer lines. The four rung commits and the review's `2c697fe52` are the only ones that touch a path outside `explorations/`, and each carries a `historical:` line. No commit of the batch names a model; two coordinator commits already on `origin/main` before the gather name a model family in prose (`d39d6fe75`, `11cd61ada`), and no identifier. No stop holds the push: the stops met are each reserved by the batch record and reversible, lifted by POSITIONS.md, "Reversible stops do not hold a batch", and listed in `PLAN.md` under "Climb batch 8, listed for his review".

**Left open.** FACTS "The true distance to the switch-over" still reads the 7b gate's 598 and 59; the landed figures are 565 and 56. The microGPT walk run is started on the landed tree and not waited for (row 576's inputs are restored untracked for the run and deleted when it ends).
