# Climb batch 7R: the judge's ruling on the merged-diff review

Written 2026-09-28 on `main` at `9c46c2206`, which holds rung J's landing `3be1fecd7`, rung U's `17c6052bb` and the review's corrections. The review refused approval with one blocking finding (`explorations/compile-ladder/climb-batch-7R/RECORD.md:173-174`, "For the judge"). This ruling reads the merged diff, the batch record, rung J's `REPORT.md`, `SKEPTIC.md` and `record.md`, the ledger rows, the test harness and the earlier judges' rulings. It builds nothing, runs no test and did not read `tmp/gate-batch-7r/out/`. Every line number is at `9c46c2206` unless it says otherwise.

The brief names `explorations/compile-ladder/climb-batch-7r/`. The batch's directory is `climb-batch-7R/`, where its `RECORD.md` is. A second directory whose name differs only in case would split the batch's records, and on a case-insensitive checkout the two would collide. So the ruling is here.

**Decision: repair.** Rows 481 and 482 each get a gated expected-failure test in `ProjectFortress/compiler_tests/` now:
- row 481: an `XXX` pair in row 479's shape, asserting that ranges compare as sets;
- row 482: an `XXX` compile-stage test, asserting the specification's answer for `case most > of`, with its failure fixed to the checker's "Not yet implemented".

Row 481's file is shown red on a deliberate local fix of the stub. Row 482's is not, for the reasons in section 3; a walk run of the same file stands in its place. Nothing outside `ProjectFortress/compiler_tests/` and `explorations/` changes, so the gate re-runs the compiler track of `ant testFast` alone, expected at 784 with no failure.

## 1. The finding holds

- **The rule.** A defect that anyone in the rung measures, that is deferred, and that the specification settles gets "a gated expected-failure test named `XXX…` asserting the specification's answer" (`explorations/coordinator/climb-batch-workflow.md:31-33`, "whoever measured it"). This is Pavol's decision of 2026-09-19, after climb batch 1: "a deferred spec-settled one an `XXX` test" (`explorations/coordinator/POSITIONS.md:34`). The batch's shared prefix repeats it ("What a measured defect is worth: the three homes").
- **Both defects were measured inside rung J, by its skeptic.**
  - Range equality on the compiled path is the stub `opr =(left:GeneratorZZ32, right:GeneratorZZ32): Boolean = false` (`Library/CompilerLibrary.fss:314`; `explorations/compile-ladder/rung-ranges-zz32/SKEPTIC.md:78`). `(1:3) = (1#3)` and `(3:1) = (5:4)` print false compiled and true under walk (`explorations/compile-ladder/rung-ranges-zz32/probes/skeptic/SkJDiff-cross-t1.txt`).
  - `case most > of` makes `fortress compile` die with `java.lang.Error: Not yet implemented`. Walk prints `most > picks three` (`SKEPTIC.md:148`; `probes/skeptic/SkExtremum-cross.txt`).
- **The specification settles both, against the compiled run.**
  - Ranges: "Ranges may be compared as if they were sets of integers by using … = …" (`Specification/basic/expressions/ranges.tex:124-126`, read `:49-72` and `:121-137`). `a:b` and `a#n` are the sets at `:51` and `:68-69`. So `1:3` and `1#3` are equal, `3:1` and `5:4` are both empty and so equal, and `2:4` and `2:5` are not equal.
  - Extremum: the construct is defined (`Specification/basic/expressions/case.tex:74-116`). "The expression block of the clause with the extremum guarding expression (and only that clause) is evaluated" (`:107-112`). The skeptic's program picks the clause of 3.
  - This is rule 4's fourth case. The specification settles the question, but the repair lies outside the batch: the compiler library takes no new declaration before the switch-over (POSITIONS 2026-09-21, the library route), and the checker's extremum is no rung's in 7R. So each gets home 2 and a ledger row.
- **The skeptic placed both in home 2** (`SKEPTIC.md:198-199`).
- **What landed is neither home.**
  - Row 481's note calls the test optional: "A gated expected failure, if one is wanted before, is row 479's two-file shape" (`explorations/fortress-gap-ledger.md` row 481).
  - Row 482's note defers it "by a rung that may add tests" (`:493`).
  - Home 2 is a gated test. Home 3 requires a silent specification, and neither case is silent.

## 2. The other reading does not hold

**Who owns the directory.**
- Batch 7 deferred the compiled halves of rows 460 and 463 because its record assigned `compiler_tests/` to batch 7b's rung C (`explorations/compile-ladder/climb-batch-7/RECORD.md:352`).
- 7R's record assigns that directory to no rung (`explorations/coordinator/CLIMB-BATCH-7R.md:193-196`).
- J's "Not" list bars the compiler library, `StaticChecker.java`, the shadowed files, `interpreter/`, `Specification/`, `SpecData/`, `explorations/run-c4/` and `explorations/apl/`. It does not bar `compiler_tests/` (`:120`). None of J's stops names an unlisted file (`:128-135`).
- J wrote row 479's pair in that directory in this batch (`ProjectFortress/compiler_tests/XXXRangeInRungJ.fss`, `.test`, `RangeInRungJLink.test`), and no stage called it a stop (`RECORD.md:184`).
- So the "rung that may add tests" that row 482's note waits for was rung J. The defects' tests belong beside row 479's, whose stub (`CompilerLibrary.fss:311`) is three lines above row 481's.

**Retirement at the switch-over.**
- **Row 482 does not retire.** Its failure is not a compiler-library stub.
  - The checker's extremum branch calls `Types.makeTotalOperatorOrder` unconditionally (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:888-899`). That method's body is `return NI.nyi();` (`ProjectFortress/src/com/sun/fortress/compiler/Types.java:363-368`).
  - Neither line depends on which library is loaded. Row 482's claim says as much ("in both worlds").
  - By reading, a second site sits behind it. The compiled path's `CaseExprDesugarer` throws for a `case` with no condition expression (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/CaseExprDesugarer.java:89-91`). `Desugarer.java:124-127` runs it whenever `Shell.getCompiledExprDesugaring()` holds, which it does by default (`ProjectFortress/src/com/sun/fortress/Shell.java:288-290`, `:1285`). Only walk's setup turns it off (`:383`). The switch-over touches neither site.
- **Row 481's stub does retire, but that is not a reason to leave it ungated.** Batch 6b's judge weighed the same argument for the prelude's `#` and rejected it (`explorations/compile-ladder/climb-batch-6b/JUDGE-review.md:31-41`):
  - "It proves too much": it would also have excused row 479's pair, which J gated.
  - The switch-over is phase 4 of the plan (`explorations/coordinator/PLAN.md:70`), and the batches now running are phase 3 (`:57`).
  - The pair stays useful after the switch-over. It then compiles against the one library's `=`, which walk shows correct on these ranges (`SkJDiff-cross-t1.txt`). The pair then reports "Did not see expected failure" and is promoted, and that is the signal the three homes exist to give.

**Cost.** The review names it: the gate runs again. It is the compiler track alone (section 5), as in batch 6b, and it is not a reason under the rule.

## 3. The shape of each test

**Row 481: the two-file shape.** This is row 479's, 453's and 348's shape: a plain-named `.test` that drives `link`, and an `XXX`-named `.test` that drives `run` with `run_out_contains=REACHED`. It is needed because an `XXX` file that drives `compile` or `link` demands that the compile fail (FACTS.md, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only, and a run-time defect needs two `.test` files").
- **The three assertions.** `(1:3) = (1#3)` and `(3:1) = (5:4)` both fail today. A third assertion, `NOT ((2:4) = (2:5))`, keeps the file failing under a "fix" that answers `true` always.
- **The red demonstration.** The template is J's `explorations/compile-ladder/rung-ranges-zz32/xxx-in-red.sh`: a private cache, a local edit of `Library/CompilerLibrary.fss`, the three compiler-library components recompiled, and then undone.
  - Here the edit is the body of `:314` alone. The local body enumerates each range with the `seqgenerate` that `GeneratorZZ32` declares (`:308`), so it compares the two ranges as sets for the ranges this file builds.
  - It is required because it is cheap and ready, and because it shows the file goes green exactly when `=` compares as sets, the empty case included.
  - If the local body will not compile after one correction, the capture of the attempt stands in its place. The in-file third assertion and the walk run of the same file then fix what the file fails for, which batch 6b's judge accepted (`climb-batch-6b/JUDGE-review.md:71-74`).

**Row 482: one compile-stage `.test`, with the failure named.**
- **The file.** `compile` with `compile_exception_contains=Not yet implemented`, the revival's shape for a compile-stage crash (`ProjectFortress/compiler_tests/XXXTryAtomicCodegenRungB.test`, `XXXObjExprRungS.test`, `XXXUnionMethodRungS.test`). The command test runs `compile` in process (`FileTests.java:689-693`). The harness catches any `Throwable` and, for an `XXX` file, reports "OK Saw expected exception" when the exception's text satisfies the key (`FileTests.java:341-362`).
- **Why the key is written.** A fix of the checker alone would move the failure to the desugarer (section 2). The key then goes unsatisfied, and the test turns red: "Did not satisfy" (`:346-348`, `:427-441`). That is when row 482 and the key must be restated together. Without the key, the file would pass through that change silently. A full fix makes the compile succeed, and the file turns red as "Missing expected failure" (`:384-402`).
- **No red demonstration.** The deliberate fix would be two Java sites and a rebuild, not a local body edit.
  - The shared prefix asks for a red demonstration of the first `XXX` file a rung adds. J showed its first ones red (`explorations/compile-ladder/rung-ranges-zz32/probes/xxx-in-red.txt`; `probes/refusal-harness-base.txt`), and batch 6b's judge required none beyond that (`climb-batch-6b/JUDGE-review.md:71-74`).
  - In its place: the same file under walk passes, which shows that its one assertion is the answer where the construct is implemented. The compiled run shows the `NI.nyi()` crash.

Both files carry the one comment line pointing at J's `REPORT.md`, as `XXXRangeInRungJ.fss:1` does. Their assert messages carry the specification's lines at `9c46c2206`.

## 4. Who was right

- **The review.**
  - Right on the finding, on every citation it gives (each opened here), and in noting that batch 7's reason does not carry.
  - Its other reading is wrong for row 482, which is the checker and not a stub. For row 481 it does not survive batch 6b's ruling.
  - Its closing condition, "each shown red on a deliberate local fix", is taken for row 481. For row 482 it is replaced by the named failure and the walk run.
- **Rung J's skeptic.**
  - Right to measure both defects and to put both in home 2 (`SKEPTIC.md:198-199`), and right to name row 482's owed test (`:277`).
  - Wrong to write that row 481's test was wanted only "if … before" (`:271`), against its own table. It was also wrong to leave both tests to someone else in a rung that could write them.
- **The gather.**
  - It copied that optional wording into row 481 (`fortress-gap-ledger.md`).
  - It turned row 482's owed test into a deferral "by a rung that may add tests" (`:493`; `RECORD.md:40-41`), in the batch whose rung had just added compiled tests.
- **Rung J's worker.** It gated the defect it found, row 479, in home 2 and showed the test red. Rows 481 and 482 were found after its pass.

## 5. Considered and left as ruled

- **Row 486** (walk refuses `u: NN32 = n` for a `nat` parameter): also home 2, and also without its test. But the rung that measured it, U, may add no test (`CLIMB-BATCH-7R.md:177`). Its test waits for a rung that may edit `ProjectFortress/tests/`, as row 443's does. The next such rung in the queue is batch N's walk rung. That difference is exactly what separates it from rows 481 and 482. The review left it (`RECORD.md:177`), and this ruling agrees.
- **Rows 480 and 483** stay in home 3 as the gather opened them. For row 480, no program is compiled against the one library before the switch-over. For row 483, the specification has nothing on `UniformDistribution`'s parameter.
- **Stops.** The new files are outside J's listed files (`CLIMB-BATCH-7R.md:113-120`), but that is not among J's stops (`:128-135`). The new tests change no existing compiled test's verdict, and no ladder file moves. No stop is met, and nothing is added for Pavol.

**The gate.**
- Of the gate's stages, only the compiler track of `ant testFast` enumerates `ProjectFortress/compiler_tests/` (`climb-batch-6b/JUDGE-review.md:76-86`).
- Re-run `ant testFast` alone, with nothing built first. The compiler track is expected at 784: 781 as gated, plus `RangeEqRungJLink.test`, `XXXRangeEqRungJ.test` and `XXXExtremumRungJ.test`. It is expected with no failure, and with the other tracks as the gate recorded them.
- `testSystem`, the checker table (10), the distance stage (627), the atomic runs, the ladder and the microGPT comparison stand.

## 6. The repair

It is done in `/home/user/fortress`, on `main`. The steps are the ones in the structured result, in order. In short:
1. Wait for the gate to finish.
2. Write the five test files.
3. Check the names.
4. Run both files under walk and compiled.
5. Run the harness on the three tests, and show row 481's pair red on a local fix and back.
6. Add notes to rows 481 and 482; update J's `REPORT.md` (section 10 and a new section 14) and `record.md`; add a repair section to this batch's `RECORD.md`.
7. Run the tracked-path check.
8. Commit locally with the protocol's footer. Do not push.

It runs no `ant` target, no interpreter pass and no gate.

## For Pavol

Nothing. The specification settles both defects, the rule that homes them is his (POSITIONS 2026-09-19), and no stop is met.
