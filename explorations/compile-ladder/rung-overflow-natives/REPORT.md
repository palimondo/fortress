# Rung O (climb batch 6b): the natives raise IntegerOverflow

- problem: under walk the fixed-width natives keep the low bits of a result that does not fit: `ZZ32 MAX + 1 = -2147483648`, `NN32 MAX + 1 = 0`, `NN64 -1 = 18446744073709551615` (`explorations/compile-ladder/rung-overflow-natives/probes/bounds/OverflowBounds-walk-base.txt:1`, `:29`, `:44`)
- spec: "For integer results, overflow throws an IntegerOverflow" (`Specification/basic/operators/opr-overview.tex:154-155`, `:195-196`), for the fixed-size integer types and their unsigned equivalents (`Specification/basic/types-vals-vars.tex:546-550`); prefix `-` returns the negative of its argument (`opr-overview.tex:24-25`); code that means to wrap has its own operators (`opr-overview.tex:172-176`, `:205-209`)
- precedent: the signed half is batch 4's `explorations/compile-ladder/rung-walk-overflow/natives.patch:1-76`, raising through `Int.overflow()` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:258-261`); the unsigned half is the compiled path's helpers (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:46-59`, `:67-70`; `simpleUnsignedLongArith.java:56-73`, `:80-83`)
- deviation: the unsigned tests are written with the vendored `Unsigned` in the glue classes' own style, not the helpers' private `ltu`/`gtu`/`divu` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java:105-126`, `UnsignedLong.java:106-127`); division by zero is not touched, so it still ends the run where the specification throws `DivisionByZero` (row 336; `Specification/basic/operators/opr-overview.tex:164-165`)
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java`, `Long.java`, `NN32.java`, `UnsignedLong.java`, `ProjectFortress/tests/intPrim.fss`, `ProjectFortress/tests/longPrim.fss`, `ProjectFortress/demos/HeapShakedown.fss`, and the rename of the campaign's `ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss` to `FixedWidthOverflowRungB.fss`; the rule that asks for this line is `explorations/coordinator/CLIMB-BATCH-6.md:282`

## Summary

The eighteen fixed-width arithmetic natives of the interpreter now raise the catchable `IntegerOverflow`: `Negate`, `Add`, `Sub`, `Mul` and `Div` of `Int.java` and `Long.java` (row 379's ten), and `Negate`, `Add`, `Sub` and `Mul` of `NN32.java` and `UnsignedLong.java`. Row 379's expected failure is the plain test `FixedWidthOverflowRungB.fss`, and `intPrim` and `longPrim` assert the raise at the bounds. The demo `HeapShakedown`'s `spread` is respelled with the wrapping operators (row 427). Of 413 interpreter tests none changed, and both microGPT checks are 40 of 40 on the raising natives.

The reserved stop "a library body found to rely on wrapping" was met. The logging pass did not reach it; the skeptic's probes did, at three range bodies (`Library/RangeInternals.fss:1423`, `:989`, `Library/FortressLibrary.fss:3877`). The body at `:989` relies on wrapping at the integer bounds on the signed types and on every descending `NN32` or `NN64` range, `1:0` among them, whose `.size` answered 0 on the base and now raises (the second skeptic's `Sk2RangeW`, W01 and W08; section 15). It is lifted as reversible (`explorations/coordinator/POSITIONS.md:120`; `explorations/protocol.md:17-20`) and listed for Pavol (section 16). The repair round gave those bodies, and three more defects the skeptic measured, gated expected failures and rows 450 to 453, and changed no Java, library or team-test file (section 18). At the gather a fifth expected failure was added for `MIN # 0`, and an `NN32` assertion for row 452 (section 19). At the merged-diff review's repair a sixth was added, the compiled pair `XXXSeqHashBoundsRungO` for the prelude's `#` at the integer bounds (section 21).

## 0. How this report was written

The first worker's REPORT.md was refused by the harness, and its text lived only in the worker's structured result (commit `a10115a84`'s message). The repair round found no copy of it in the worktree, and it did not read the session's saved transcripts: the one attempt to search them was refused. So the repair round composed this report from the branch's primary sources: the commits `0e4d3214d` to `927da51ee`, the captures under `explorations/compile-ladder/rung-overflow-natives/probes/`, `record.md`, and the skeptic's and the judge's readings of the first report (`SKEPTIC.md`, `JUDGE.md`). The section numbers follow the ones `SKEPTIC.md` and `JUDGE.md` cite. The judge's amendments are in place (the deviation line, sections 1, 9, 13 to 17), and section 18 is new. The harness refused the repair round's write of this file too, so the gather writes it from the structured result.

## 1. What the rung did, and the stops

- **The edit.** Eighteen natives raise `IntegerOverflow` (sections 5 and 6). The `Wrapping*` natives rung D added are unchanged.
- **The test.** The rung renamed row 379's expected failure and added unsigned cases and non-throwing guards. It added two assertions each to `intPrim` and `longPrim` (section 4).
- **The demo.** `HeapShakedown`'s `spread` is respelled (section 10).
- **The stops.**
  - The reserved stop "a library body found to rely on wrapping" (`explorations/coordinator/CLIMB-BATCH-6.md:203`) **was met**, through the skeptic's probes, at three range bodies. It is lifted as reversible (`POSITIONS.md:120`; `protocol.md:17-20`) and listed (sections 15 and 16).
  - The two standing stops the intro names as lifted were met: the rename (`POSITIONS.md:65`) and the added team-test assertions (`POSITIONS.md:81`).
  - The repair round's six new test files, the gather's one and the three of the merged-diff review's repair (section 21) are outside the rung's named files (`CLIMB-BATCH-6.md:195`, `:203`), lifted the same way and listed (section 15).

## 2. Where the fix belongs

- **The layer.** Integer arithmetic under walk is the glue classes' `builtinPrimitive` natives (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/`; `explorations/coordinator/map/modules-and-phases.md:441-455`, native code). The library's `+` on `ZZ32` binds straight to its native (`Library/FortressLibrary.fss:706-707`, `Int$Add`), so no library body is the place. The compiled path already throws, in its own helpers (FACTS.md, "The compiled path's integer rules"), and the static checker does not run under walk.
- **The decision.** It is Pavol's: `POSITIONS.md:65` (row 379, the ten natives), `:81` (after the wrapping operators, then `natives.patch`), `:99` (the unsigned natives beside them).

## 3. The precedent search

- **Signed.** Batch 4's `natives.patch` is the decided shape: `Math.addExact`, `subtractExact` and `multiplyExact` with `ArithmeticException` mapped to `Int.overflow()`, and explicit minimum tests for negation and for `MIN DIV -1`. The diff is that patch hunk for hunk (`SKEPTIC.md` section 4).
- **Unsigned.** The team solved it twice, once per width, in the compiled helpers: `simpleUnsignedIntArith.java:46-59`, `:67-70`, and `simpleUnsignedLongArith.java:56-73`, `:80-83`. The 32-bit helpers test the high word of an exact 64-bit result. The 64-bit ones compare unsigned (`r < a` for add, `r > a` for subtract) and divide back for the product. The edit copies those tests.
- **The rule 2 count: ten sites by reading.** Ten natives in the same four files still leave the width without a catchable `IntegerOverflow`:
  - `Int$Pow` and `Int$Choose` go through `Int.rc`, uncatchable (row 347);
  - `Long$Pow` and `Long$Choose` wrap silently;
  - `NN32$Lcm` wraps silently, and `NN32$Choose` and `$Pow` go through `NN32.rc`, uncatchable;
  - `UnsignedLong$Lcm`, `$Choose` and `$Pow` wrap silently.

  `Int$Gcd`, `Int$Lcm`, `Long$Gcd` and `Long$Lcm` already raise. `Rem` and `Mod` cannot overflow except at `MIN REM -1`, which Java answers 0, the right value (`SKEPTIC.md` section 5). These ten are outside the rung's named classes and stay on row 379 (`record.md`).

## 4. The test first, and the recorded failure

- **The rename.** `git mv` of `ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss` to `FixedWidthOverflowRungB.fss`, with the component renamed and its comment line pointing here (`FixedWidthOverflowRungB.fss:1`). It has 20 raising assertions: twelve signed (`:26-37`) and four at each unsigned width (`:53-56`, `:64-67`), namely the maximum plus 1, 0 minus 1, the negation of a positive value, and a product beyond the width. It also has 16 non-throwing guards at the bounds (`:39-48`, `:57-59`, `:68-70`).
- **The team tests.** `intPrim.fss:19-25` and `longPrim.fss:19-25` add a local `overflows` helper, and `:31-32` in each assert that `a.minimum - 1` and `a.maximum + 1` raise. Nothing is restated or deleted.
- **The recorded failure.** On the stock natives each of the three fails at its first new assertion with exit 1 (`explorations/compile-ladder/rung-overflow-natives/probes/failure-preedit.txt`, committed in `0e4d3214d` before any glue edit). The key line is `FAIL: row 379: ZZ32 MAX + 1 throws IntegerOverflow; Specification/basic/operators/opr-overview.tex:195-196`. The test's second text (section 14) is recaptured failing in `explorations/compile-ladder/rung-overflow-natives/probes/failure-preedit-v2.txt`.

## 5. The edit: the signed natives

`Int.java:98-128` and `Long.java:112-142`: `Negate` raises on the minimum, `Add`, `Sub` and `Mul` use `Math.*Exact`, and `Div` raises on `MIN DIV -1`. `|..|` raises through `Negate`.

## 6. The edit: the unsigned natives

- **The four guards.** `NN32.java:103-129` and `UnsignedLong.java:104-130` each put one guard line before the unchanged `return`:
  - `Negate` raises unless the operand is 0;
  - on `NN32`, `Add`, `Sub` and `Mul` raise when the high word of the exact 64-bit result, computed with `Unsigned.toLong` (which zero-extends), is not 0;
  - on `NN64`, `Add` raises when `Unsigned.lessThan(sum, x)`, `Sub` when `Unsigned.greaterThan(difference, x)`, and `Mul` when the product divided back by a non-zero `y` is not `x`.
- **Division by zero is not touched** (row 336; `opr-overview.tex:164-165`).
- **A direct check of the tests.** Outside the interpreter they were checked against exact arithmetic: 0 disagreements in 16,080,100 `NN32` pairs and 16,112,196 `NN64` pairs (`explorations/compile-ladder/rung-overflow-natives/probes/unsigned-check/UCheck.txt`). The skeptic's own direct check of all eighteen found 0 mismatches in 9,133,632 checks on the edit, against 3,816,131 on the base classes (`explorations/compile-ladder/rung-overflow-natives/probes/skeptic/SkNativeCheck-edit.txt`, `SkNativeCheck-stock.txt`).

## 7. The recorded pass, on both paths

- **After `ant compileAll`.** The renamed test prints `REACHED` and `PASS` with exit 0 under walk, and `intPrim`, `longPrim`, `WrapOperatorsRungD`, `IntSemanticsRungI` and `UnsignedTest` pass. Through the `testSystem` harness all six pass, "OK (6 tests)" (`explorations/compile-ladder/rung-overflow-natives/probes/pass-postedit.txt`).
- **The compiled path.** `FixedWidthOverflowRungB` compiles and runs, `0 0` in `explorations/compile-ladder/rung-overflow-natives/probes/ladder-after/results.tsv`, and prints `PASS` (`explorations/compile-ladder/rung-overflow-natives/probes/skeptic/FixedWidthOverflowRungB-compiled.txt`). `intPrim` and `longPrim` fail to compile on that path before and after (exit 255 in `probes/ladder-before/results.tsv` and `probes/ladder-after/results.tsv`), as on the base.
- **`default_repository/caches/global.map`** was restored after `ant compileAll` (FACTS.md, "`ant compileAll` deletes a tracked file").

## 8. The comparison

Rung D's comparison was used: every file of `ProjectFortress/tests/` except the renamed test (`count-list.txt`, 413 files), in three passes, base A, the edit, and base B, under walk, one JVM per test (`count-run.sh:3`).
- **The result.** 395 identical, 1 normalised by identity hashes (`taskTrace2`), 17 unstable (the untouched tree differs from run to run with the verdict unchanged), 0 changed, and every exit code unchanged (`explorations/compile-ladder/rung-overflow-natives/probes/compare-normalised.txt`, last line; the unstable lines in `probes/unstable-check.txt`).
- **The seventeen.** They are the files rungs D and F judged unstable. No new row is opened for them (section 14).
- **Three the finer check marks OUTSIDE.** `probes/unstable-check.txt` marks `QuickCheckTest`, `TreapTest` and `abortBlock` OUTSIDE: after the edit they differ from base A at lines where base B does not, or in length. Each prints random or timing-dependent output, and each exits 0 in all three passes. `QuickCheckTest` prints random draws, and its three runs have 56, 55 and 55 lines; every line where the edit differs from A also differs in B. `TreapTest` prints a tree built on random priorities (`Library/Treap.fss:181`); its line 3 is `Azero`, `Aone` and `Afour` in A, B and the edit. `abortBlock` repeats one abort message 1,049, 245 and 2,108 times. So the run-to-run rule (`POSITIONS.md:114`) accounts for them. This was read at the merged-diff review after the repair, from the pass logs in the rung's worktree (`explorations/compile-ladder/climb-batch-6b/review/unstable-outside.txt`).
- **Machine lines.** They are in `probes/passes.txt`.

## 9. The logging pass

The eighteen natives each print an `OVERFLOW-PROBE` line where they meet an overflow and still wrap (`explorations/compile-ladder/rung-wrap-operators/probes/overflow-probe.patch`), as a classpath shadow over `ProjectFortress/tests/`, `ProjectFortress/demos/*.fss` and the two microGPT checks, on the base and after the edit.
- **On the base.** No overflow was met in any of the 413 tests or in either microGPT check. Among the 62 demos, only `HeapShakedown` met overflows, 11,952 probe tags (`explorations/compile-ladder/rung-overflow-natives/probes/demo/HeapShakedown-base-logshadow.txt:2`). `explorations/compile-ladder/rung-overflow-natives/probes/overflow-probe-summary-base.txt:11` counts 11,940, the tags that start a line (`probe-summary.py:26`), because 12 follow the demo's progress dots.
- **After the edit.** Overflows were met only at the three assertions that one raises (`intPrim`, `longPrim`, `FixedWidthOverflowRungB`), in no demo, and in neither microGPT check (`explorations/compile-ladder/rung-overflow-natives/probes/overflow-probe-summary-edit.txt`).
- **The microGPT checks.** Both are 40 of 40 on the raising natives, without the shadow (`explorations/compile-ladder/rung-overflow-natives/probes/mg-edit.txt`).
- **The limit of the pass.** Three demos, `ArrayListLong`, `BiCGSTAB2` and `Generator2Demo`, reached the pass's 120 s limit both on the base and after the edit, so the pass saw only the first 120 s of each (`probes/overflow-probe-summary-base.txt`, `probes/overflow-probe-summary-edit.txt`, "reached the timeout"). So no library body relies on wrapping anywhere the tests, the reachable demos or the microGPT checks go. Outside that reach the skeptic found three that do, and now raise `IntegerOverflow` under walk:
  - `Library/RangeInternals.fss:1423`, `MAX # 1`;
  - `:989`, `(1:MIN).size`;
  - `Library/FortressLibrary.fss:3877`, `|1:MIN|`.

  The captures are `explorations/compile-ladder/rung-overflow-natives/probes/skeptic/SkTopHash-walk-edit.txt`, `SkEmptySize-walk-edit.txt` and `SkEmptyAbs-walk-edit.txt`, each against its `-walk-stock.txt`; sections 13 and 15 give the rest.
- **The reach of `:989`.** The body is reached not only at the integer bounds on the signed types: every descending `NN32` or `NN64` range, `1:0` among them, computes `r-l` below zero there, and its `.size` answered 0 on the base by wrapping twice and raises `IntegerOverflow` after the edit (`explorations/compile-ladder/rung-overflow-natives/probes/skeptic/Sk2RangeW.fss`, `Sk2RangeW-walk-stock.txt` and `Sk2RangeW-walk-edit.txt`, W01 and W08; W09 for `ZZ64` at the bounds). The logging pass met no `NN32` or `NN64` overflow in any test, demo or microGPT check, so nothing measured reaches it.

## 10. The demo, and row 449

- **`spread`.** `ProjectFortress/demos/HeapShakedown.fss:117` becomes `((c1 DOTTIMES n) DOTPLUS c2, n)`, as rung D respelled `HeapTest.fss:98`. On the raising natives the old text stops with `IntegerOverflow` at `:117`, and the new one gets past it (`explorations/compile-ladder/rung-overflow-natives/probes/demo/HeapShakedown-base-text-raising-natives.txt`, `HeapShakedown-edit-text-raising-natives.txt`).
- **Row 449.** On both the base and the edit, the demo then stops at `:128`: `timeDiffMS` divides two integers, which gives a rational on the flat library, and `t asif RR64` fails. That is row 449 (`record.md`). The demos run in no gated suite (`explorations/coordinator/map/test-coverage.md:26`).

## 11. The checker count, the ladder, competing declarations

- **The checker count** is 62 before and after (`explorations/compile-ladder/rung-overflow-natives/probes/checker-count/before.txt:14`, `after.txt:14`), as in the last landed table.
- **The ladder subset**, the three files (`subset-before.txt`, `subset-after.txt`): the renamed test compiles and runs on both sides; `intPrim` and `longPrim` stay at compile exit 255.
- **Competing declarations.** `FixedWidthOverflowRungB` and `overflows` are declared only in their own files, and the Java edit adds no name (`explorations/compile-ladder/rung-overflow-natives/probes/competing-declarations.txt`). The repair round's four component names are the same (`explorations/compile-ladder/rung-overflow-natives/probes/repair/competing-declarations.txt`).

## 12. Differentials

- **The bounds probe.** `probes/bounds/OverflowBounds.fss`, walk after the edit against the compiled run: 53 lines each, and `IntegerOverflow` on the same 31 cases, where walk on the base raised on none. Six lines differ, only because the compiled run prints `NN32` and `NN64` values above the signed half as negative (row 326; `explorations/compile-ladder/rung-overflow-natives/probes/bounds/OverflowBounds-differential.txt`).
- **The skeptic's 45-case differential by other routes** raises on the same 19 cases walk and compiled. Ten more lines are row 326 (`explorations/compile-ladder/rung-overflow-natives/probes/skeptic/SkRoutes-differential.txt:47`).

## 13. Defects and their homes

- **Row 379, the ten signed natives: home 1.** `FixedWidthOverflowRungB.fss:26-48`, `intPrim.fss:31-32`, `longPrim.fss:31-32`.
- **The eight unsigned natives: home 1.** `FixedWidthOverflowRungB.fss:53-59`, `:64-70`.
- **Row 427, the demo's `spread`: repaired, with no gated home.** The demos run in no gated suite.
- **Row 449, the demo's rational timing: a ledger row.** It has no `XXX` test (section 14).
- **A (the judge's lettering, `JUDGE.md` section 4). The three range bodies that answered right at the bounds only by wrapping: home 2.**
  - `ProjectFortress/tests/XXXRangeBoundsRungO.fss`, row 450, shown red on a local fix (section 18).
  - By reading, the same shape is at `RangeInternals.fss:1426`, `:1429` and `FortressLibrary.fss:3878-3879`.
  - `:1158` has a like shape, but its base answer was already wrong.
  - `MIN # 0`, which the specification makes empty (`Specification/basic/expressions/ranges.tex:64-65`), is the whole range on the base and raises after the edit and on the compiled path (the second skeptic's `Sk2RangeW` W10-W11, `Sk2RangeC` C06): `ProjectFortress/tests/XXXRangeEmptyHashRungO.fss`, row 450, added at the gather (section 19).
- **B. A sequential range steps past its last element: home 2.** `ProjectFortress/tests/XXXSeqRangeTopRungO.fss`, row 451.
- **C. Walk's `|r|` of a `ZZ64` or `NN32` range is a typecase failure: home 2.** `ProjectFortress/tests/XXXRangeSizeZZ64RungO.fss`, row 452; its `NN32` assertion was added at the gather (section 19).
- **D. The compiler prelude's range midpoint `lo+hi` overflows: home 2.** `ProjectFortress/compiler_tests/XXXSeqMidpointRungO.fss` with `SeqMidpointRungOLink.test` and `XXXSeqMidpointRungO.test`, row 453. The prelude's `#` at the integer bounds (`:446`), measured by the second skeptic's C06, has its own compiled pair since the merged-diff review, `XXXSeqHashBoundsRungO` (section 21).
- **E. The compiled path folds numeral-only arithmetic, then dies with the uncatchable "Not in range" error: a note on row 325.** The specification makes such an expression a constant expression with its exact value (`Specification/basic/expressions/constant.tex:44-51`, `:123-133`). So this is row 325's static error measured again, not home 3.
- **F. Row 315's duplicate closure class through a numeral-bodied thunk: a note on row 315.**
- **G. Row 326 met again:** a note, the six lines of section 12 and the skeptic's ten.

## 14. Decisions

**The first pass's decisions**, as the branch and `JUDGE.md` section 5 show them:
- **The sixteen non-throwing guards.** They were added beside the raising assertions, so that a native raising too eagerly also fails the test. The alternative was raising assertions only.
- **The test's second text.** The non-throwing assertions take the Boolean form, and the unsigned powers of two are built by multiplication, because the compiled prelude has neither `assert(ZZ64, ZZ64, String)` nor an unsigned `LSHIFT`. So the renamed test runs on both paths (`3b4814ef1`). The alternative was a walk-only test.
- **The unsigned natives take the compiled helpers' tests**, not widened `Math.*Exact`: the helpers are the team's solution for these types (section 3).
- **No row for the seventeen run-to-run files**, as rungs D and F judged them (`POSITIONS.md:114`).
- **Row 449 is a ledger row with no `XXX` test**, on row 427's precedent: an `XXX` copy of a demo's code gates the copy.

**The repair round's decisions**, taken from the judge's ruling (`JUDGE.md` sections 4 and 7):
- **Home 2 now for A to D**, rather than a library repair in this rung. The batch record says the library is not this rung's (`CLIMB-BATCH-6.md:203`). The alternative, reordering the three bodies now, costs an edit outside the rung's files and a re-run of the comparison and the logging pass (section 16).
- **D's home 2**, rather than a row alone. The specification settles it.
- **One file per row**, because each defect has a separate fix.
- **`|MAX:MIN|` and the `ZZ64` size are in A's file.** `|MAX:MIN|` keeps the file an expected failure even if the natives are reverted (the base answers 2).

## 15. Stops

- **"A library body found to rely on wrapping" (`CLIMB-BATCH-6.md:203`): met.**
  - **Measured under walk, base against edit:**
    - `Library/RangeInternals.fss:1423`, `sized1Range`'s `lo+ex-1`: `MAX # 1` and `(MAX-2) # 3` (`explorations/compile-ladder/rung-overflow-natives/probes/skeptic/SkTopHash-walk-stock.txt`, `SkTopHash-walk-edit.txt`; `SkRangeEdges` E04-E06, E18, in `explorations/compile-ladder/rung-overflow-natives/probes/skeptic/SkRangeEdges-walk-stock.txt` and `SkRangeEdges-walk-edit.txt`);
    - `:989`, `narrow(r-l+1)` before the emptiness test: `(1:MIN).size` (`SkEmptySize-walk-stock.txt`, `SkEmptySize-walk-edit.txt`), and every descending `NN32` or `NN64` range, `1:0` among them (`explorations/compile-ladder/rung-overflow-natives/probes/skeptic/Sk2RangeW-walk-stock.txt`, `Sk2RangeW-walk-edit.txt`, W01 and W08; W09 for `ZZ64` at the bounds);
    - `Library/FortressLibrary.fss:3877`, `0 MAX ((u - l') + 1)`: `|1:MIN|` (`SkEmptyAbs-walk-stock.txt`, `SkEmptyAbs-walk-edit.txt`; `SkRangeEdges` E09).
  - **By reading,** the same shape is at `RangeInternals.fss:1426`, `:1429` and `FortressLibrary.fss:3878-3879`, and a like one at `:1158`, the strided size, whose base answer was already wrong (section 13).
  - **What reaches it.** No test, demo or microGPT check (section 9).
  - **Lifted.** It is reversible (four Java classes, one revert, nothing deleted), so `POSITIONS.md:120` and `protocol.md:17-20` lift it. It is listed for Pavol with row 450 and its expected failure.
- **"An edit to any file not named above" (`CLIMB-BATCH-6.md:195`, `:203`): met by the repair round's six new test files, by the one the gather added (section 19), and by the three of the merged-diff review's repair (section 21).** The prefix's home rule requires them. They are reversible and lifted the same way, and listed.
- **The two standing stops,** lifted by `POSITIONS.md:65` and `:81` (section 1).
- **Not met:**
  - **"A changed interpreter output or exit code":** 0 changed (section 8).
  - **"A site whose value would change":** the rung edits no library site, and the changed range results are the library stop, not a second one.
  - **"A line of C4 or of the APL program":** none is touched.

## 16. What comes back to Pavol

- **The count.** 0 of 413 interpreter tests changed, with its list (`explorations/compile-ladder/rung-overflow-natives/probes/compare-normalised.txt`, `explorations/compile-ladder/rung-overflow-natives/probes/count-compare.txt`).
- **The logging pass before and after** (section 9).
- **The reserved stop, met and lifted as reversible.** Three range bodies answered right at the integer bounds only by wrapping, and now raise under walk (section 15); the one at `:989` also on every descending `NN32` or `NN64` range, `1:0` among them. Row 450 and `XXXRangeBoundsRungO` gate it. The alternative, not taken: reorder them now and keep the checked operators, as he decided for the strided distance.
- **Six new expected-failure tests, outside the named files.** `XXXRangeBoundsRungO`, `XXXRangeEmptyHashRungO` (added at the gather), `XXXSeqRangeTopRungO` and `XXXRangeSizeZZ64RungO` run under walk; `XXXSeqMidpointRungO` and `XXXSeqHashBoundsRungO` (added at the merged-diff review's repair, section 21) are compiled pairs. Rows 450 to 453. The `testSystem` count rises by four, and the compiler suite gains four `.test` files.
- **A judge's reading, not a decision under silence.** Numeral-only arithmetic is a constant expression (`constant.tex:44-51`, `:123-133`), so the compiled "Not in range" error is row 325's.

## 17. Files changed

- **Java:** `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:98-128`, `Long.java:112-142`, `NN32.java:103-129`, `UnsignedLong.java:104-130`.
- **Tests:**
  - `ProjectFortress/tests/FixedWidthOverflowRungB.fss` (renamed from `XXXFixedWidthOverflowRungB.fss`);
  - `ProjectFortress/tests/intPrim.fss:19-32` and `longPrim.fss:19-32`;
  - new in the repair round: `ProjectFortress/tests/XXXRangeBoundsRungO.fss`, `XXXSeqRangeTopRungO.fss`, `XXXRangeSizeZZ64RungO.fss` (its `NN32` lines `:15-19` added at the gather), `ProjectFortress/compiler_tests/XXXSeqMidpointRungO.fss`, `SeqMidpointRungOLink.test`, `XXXSeqMidpointRungO.test`;
  - new at the gather: `ProjectFortress/tests/XXXRangeEmptyHashRungO.fss`;
  - new at the merged-diff review's repair (section 21): `ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO.fss`, `SeqHashBoundsRungOLink.test`, `XXXSeqHashBoundsRungO.test`.
- **The demo:** `ProjectFortress/demos/HeapShakedown.fss:117`.
- **The rung's directory:** `explorations/compile-ladder/rung-overflow-natives/`, including the repair round's two controls, `explorations/compile-ladder/rung-overflow-natives/probes/repair/SeqRangeControl.fss` and `explorations/compile-ladder/rung-overflow-natives/probes/repair/SeqMidpointControl.fss`, with their captures.

## 18. The repair round

**The ruling.** The skeptic refused the rung once. The judge ruled repair (`explorations/compile-ladder/rung-overflow-natives/JUDGE.md`, commit `fb268315c`):
- the reserved library stop is met, and it is lifted as reversible;
- one citation was wrong (`:162-163` for division by zero);
- a count was wrong (11,940 against a capture that says 11,952);
- four expected-failure tests and rows 450 to 453 are owed;
- no Java, library or team-test file is to change.

**What was inherited.** The round began in a container that had restarted. An earlier start of this repair round had left, uncommitted:
- `XXXRangeBoundsRungO.fss`, written at 12:16:56;
- its walk captures at 1 and 4 threads (12:17:31, 12:17:46), made on the same HEAD `fb268315c` after the file was written;
- two helper scripts, `probes/repair/run-walk.sh` and `probes/repair/run-harness.sh`;
- the harness step, cut off at 12:18:09.

The repair round read these, kept the two captures, and re-ran the harness step. It then gave `run-walk.sh` a fresh cache directory per file and thread count, so that parallel runs do not share one. The inherited captures name the older single directory, `tmp/repair/caches-walk`.

**Instruction 1, row A** (`explorations/compile-ladder/rung-overflow-natives/probes/repair/xxx-range-bounds-goes-red.txt`):
- Under walk at 1 and 4 threads, the file stops with `IntegerOverflow` at `Library/RangeInternals.fss:1423:39`, from its line 13.
- Through the `testSystem` harness: "OK Saw expected exception".
- **The red demonstration.** The deliberate local fix (`explorations/compile-ladder/rung-overflow-natives/probes/repair/local-fix.sh`, its `git diff Library` in the capture) was `lo+(ex-1)`, `if l > r then 0 else narrow(r-l+1) end`, and `if u < l' then 0 else (u - l') + 1 end`.
  - On it, walk prints `PASS`: all six assertions pass, so none was removed.
  - The harness prints "Missing expected failure" and "Tests run: 1, Failures: 1". Its exit status is 0 either way, so the failure count is the check.
  - After `git checkout -- Library/RangeInternals.fss Library/FortressLibrary.fss`, `git status --short Library` prints nothing, and the harness again reports the expected exception.

**Instruction 2, row B** (`explorations/compile-ladder/rung-overflow-natives/probes/repair/xxx-seq-range-top.txt`):
- The control `explorations/compile-ladder/rung-overflow-natives/probes/repair/SeqRangeControl.fss`, the same three loops over `seq(1:3)`, `seq(widen(1):widen(3))` and `seq(1:5:2)`, prints `PASS` (`explorations/compile-ladder/rung-overflow-natives/probes/repair/SeqRangeControl.txt`).
- The `XXX` file stops with `IntegerOverflow` at `RangeInternals.fss:1081:13-18`, in its first loop, at 1 and 4 threads.
- The harness reports the expected exception.
- No library edit.

**Instruction 3, row C** (`explorations/compile-ladder/rung-overflow-natives/probes/repair/xxx-range-size-zz64.txt`):
- At 1 and 4 threads, "typecase match failure given Long" at `Library/FortressLibrary.fss:3876:7-3880:8`, from the file's line 13, after the first assertion (`r.size = 3`) passed.
- The harness reports the expected exception.

**Instruction 4, row D** (`explorations/compile-ladder/rung-overflow-natives/probes/repair/xxx-seq-midpoint-compiled.txt`):
- The control `explorations/compile-ladder/rung-overflow-natives/probes/repair/SeqMidpointControl.fss` (lo 1, hi 3) compiles and prints `PASS` on the compiled path against a private copy of the caches (`explorations/compile-ladder/rung-overflow-natives/probes/repair/SeqMidpointControl.txt`), so the counted `var` works there and no rewrite of the count was needed.
- After removing `*SeqMidpointRungO*` from `default_repository/caches`, `fortress junit compiler_tests/SeqMidpointRungOLink.test` passes.
- `XXXSeqMidpointRungO.test` prints `REACHED`, then `IntegerOverflow` from `countedseqloop` at `Library/CompilerLibrary.fss:377`, and "Saw expected failure".
- `git status --short default_repository` printed nothing afterwards.

**Instruction 5.** Each new component name occurs only in its own files (`explorations/compile-ladder/rung-overflow-natives/probes/repair/competing-declarations.txt`). Committed and pushed as `4ef8fc82d`.

**Instructions 6 and 7.** `record.md` and this report, as sections 1, 9, 13 to 17 and the provenance block above.

**The machine.** Every capture is headed by `machine.sh`: `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4 (2026-07-21), `FORTRESS_THREADS=1` unless the header says 4. The load average was 1.61 2.20 1.92 when the round resumed (12:18 UTC), and each capture carries its own.

**What changed.** No Java, library or team-test file changed. The library was edited only for the red demonstration and restored in the same script. `git diff 5c368175f...HEAD --stat` shows, beyond the first pass, only the six new test files and files under `explorations/compile-ladder/rung-overflow-natives/`. The round ran neither `ant compileAll` nor the gate, nor the three-pass comparison and the logging pass.

## 19. At the gather

The gather wrote this report from the repair round's text and made the second skeptic's three corrections (`SKEPTIC.md` section 8) on `main`, with the rung's net change applied and `ant compileAll` run there (39 s; `default_repository/caches/global.map` restored after it).
- **Correction 1, the reach of `:989`:** the summary and sections 9, 15 and 16 above, and `record.md`.
- **Correction 2, `MIN # 0`:** `ProjectFortress/tests/XXXRangeEmptyHashRungO.fss` is the skeptic's draft `probes/skeptic/Sk2EmptyHashDraft.fss` with the component renamed and the one comment line added. Under walk at one thread it prints `REACHED` and stops with `IntegerOverflow` at `Library/RangeInternals.fss:1423:39`, from its line 11, rc 1; through the `testSystem` harness (`explorations/compile-ladder/rung-interp-coercion/harness-one.sh`) it is "OK Saw expected exception" (`explorations/compile-ladder/rung-overflow-natives/probes/repair/xxx-range-empty-hash.txt`). Its component name occurs only in its own file (`explorations/compile-ladder/rung-overflow-natives/probes/repair/gather-competing-declarations.txt`).
- **Correction 3, `|r|` of an `NN32` range:** `ProjectFortress/tests/XXXRangeSizeZZ64RungO.fss:15-19`. Re-captured under walk at one thread, the file's first failure is unchanged: "typecase match failure given Long" at `Library/FortressLibrary.fss:3876:7-3880:8`, from its line 13 (`explorations/compile-ladder/rung-overflow-natives/probes/repair/gather-xxx-range-size-zz64.txt`).
- **The machine.** `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4 (2026-07-21), `FORTRESS_THREADS=1`; the load average was 2.80 4.39 4.51 when the gather started (12:55 UTC), and each capture carries its own.

## 20. At the merged-diff review

The review made record corrections only, in its commit "Fold the review's corrections": the provenance block's deviation line now ends in its file:line, and its historical line ends with the rule that asks for it (`explorations/coordinator/CLIMB-BATCH-6.md:282`), as batch 6's review did for rungs F and T; the word "provisional" is dropped from rows 449 and 450 in the summary and sections 10 and 13, since the gather's numbers are the same; and section 1 counts the new test files as section 15 does. No source, test or capture changed.

## 21. At the merged-diff review's repair

The merged-diff review found that the compiler prelude's `#`, `lo : (lo+sz-1)` (`Library/CompilerLibrary.fss:446`), had no gated home: `seq(MIN # 0)` raises `IntegerOverflow` on the compiled path (the second skeptic's C06, `explorations/compile-ladder/rung-overflow-natives/probes/skeptic/Sk2RangeC-compiled.txt:8`), where the specification makes the range empty. `XXXSeqMidpointRungO` never calls `#`, and `XXXRangeEmptyHashRungO` runs under walk only. The judge ruled repair, the review's option (a), widened to `MAX # 1` (`explorations/compile-ladder/climb-batch-6b/JUDGE-review.md` sections 1 and 5). This section records that repair. It ran on `main` at `2f4736a0b`.

**The test.** `ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO.fss`, with `SeqHashBoundsRungOLink.test` (link, which passes) and `XXXSeqHashBoundsRungO.test` (run, `run_out_contains=REACHED`, an expected failure), made from the `SeqMidpointRungO` pair by renaming the component. It counts the elements of `seq(MIN # 0)` and asserts 0, then counts `seq(MAX # 1)` and asserts 1. `Specification/basic/expressions/ranges.tex:64-65` says that `a#n` is the set of max(0,n) integers {a, ..., a+n-1}, so the first range is empty and the second is {MAX}; every element fits `ZZ32`, so only the prelude's intermediate overflows. The assertion inside each loop stops a wrongly built range at its second element instead of counting through it. The second loop is there because `:446` fails at both ends and each of the two half-fixes on record cures one end only: the reorder `lo : (lo+(sz-1))` cures `MAX # 1` and leaves `MIN # 0`, and building the empty range without `lo-1` cures `MIN # 0` and leaves `MAX # 1`. With both loops the file goes green only when `:446` is right at both ends. The judge took that decision; the alternative was `MIN # 0` alone.

**The probe.** `explorations/compile-ladder/climb-batch-6b/repair/SeqHashBoundsProbe.fss`, compiled and run against a private copy of the caches, measured the top end before the test asserted it (`explorations/compile-ladder/climb-batch-6b/repair/SeqHashBoundsProbe.txt:10-17`): compile rc 0; `seq(MIN # 0)` raises `IntegerOverflow`; `seq(MAX # 1)` raises `IntegerOverflow`, as the judge predicted by reading; the controls `seq(MAX # 0)`, `seq((MIN+1) # 0)` and `seq(1 # 3)` count 0, 0 and 3; run rc 0.

**Through `fortress junit`** (`explorations/compile-ladder/climb-batch-6b/repair/xxx-seq-hash-bounds-compiled.txt`):
- The baseline, the existing pair: `SeqMidpointRungOLink.test` OK (1 test); `XXXSeqMidpointRungO.test` prints `REACHED`, then `IntegerOverflow` from `countedseqloop` at `Library/CompilerLibrary.fss:377`, then "Saw expected failure" and OK (1 test) (`:9-40`). The caches were not stale, so no library was rebuilt.
- The new pair: `SeqHashBoundsRungOLink.test` OK (1 test); `XXXSeqHashBoundsRungO.test` prints `REACHED`, then `IntegerOverflow` from `simpleIntArith.intOverflowingSub`, through `ZZ32`'s `-` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:677`), at `Library/CompilerLibrary.fss:446`, from the file's `:13`, the first loop; then "Saw expected failure" and OK (1 test) (`:50-77`). The subtraction is `MIN - 1`, the `-1` of `lo+sz-1`.
- Then the new components were removed from `default_repository/caches`, and `git status --short default_repository` printed nothing (`:79-83`).

**Competing declarations.** `XXXSeqHashBoundsRungO` occurs only in its three new files, and `SeqHashBoundsProbe` only in the probe (`explorations/compile-ladder/climb-batch-6b/repair/competing-declarations.txt`).

**The machine.** `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4 (2026-07-21), `FORTRESS_THREADS=1`; the load average was 0.06 0.31 2.16 when the repair started (13:55:24 UTC), and each capture carries its own. The three compiled runs took 4.3 s, 3.9 s and 4.7 s of wall time.

**The stop.** The three new files are outside O's named files (`explorations/coordinator/CLIMB-BATCH-6.md:195`), so they meet the stop "an edit to any file not named above" (`:203`) again. They are reversible, lifted by `explorations/coordinator/POSITIONS.md:120`, and listed here for Pavol.

**What else changed.** Beyond the ruling's two edits in place (sections 13 and 16), the summary and sections 1, 15 and 17 each gained a clause pointing here, so that their counts and lists of new test files stay true. That was a decision; the alternative was to leave them describing the landing commit alone. No Java, library, `tests/` or build input changed.

**What did not run.** No `ant` target, no interpreter pass, no comparison or logging pass and no gate. The coordinator re-runs `ant testFast` alone, with nothing built first; the compiler track is expected at 779 (777 and the two new `.test` files) with 0 failures.

## 22. At the merged-diff review after the repair

The second merged-diff review read the whole change on `main` at `519cb8ce3` and corrected records only, in its commit "Fold the review's corrections". Section 8 now says why the three files that `probes/unstable-check.txt` marks OUTSIDE are still run-to-run differences (`explorations/compile-ladder/climb-batch-6b/review/unstable-outside.txt`). Section 9 now names the three demos that reached the logging pass's 120 s limit on both passes. `FACTS.md`'s entry for this rung carries the same limit. No source, test or capture of the rung changed, and no program ran.
