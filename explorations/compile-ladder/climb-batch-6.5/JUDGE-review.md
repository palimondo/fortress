# Climb batch 6.5, merged-diff review: the judge's ruling

Ruled 2026-09-28 on `main` at `80605eeda`, which holds rung G's commit `fd5cb4864`, rung P's `581356f32`
and the review's record corrections. The ruling covers the review's five blocking findings. The gate
was running beside it in this tree, so its outputs under `tmp/gate-batch-6.5/out/` were not read. The
red line is read from the review's copy of it, `merged-review/witness-identity-gate.txt`. Nothing was
built or run.

## 1. The ruling: repair

All five findings hold. One is narrowed: the repair of finding 1 changes the test, not the library.

- **Finding 1**, the red gate, is a test that depends on an arbitrary checker choice.
  - `ProjectFortress/compiler_tests/WitnessIdentityRungG.fss:12` and `:24` pass a numeral to `widen`
    over the compiled prelude.
  - `:34` and `:35` do the same inside the assertions.
  - The repair binds each numeral to a typed `ZZ32` first. That is the device rung G already uses for
    the `ZZ32` and `RR64` branches of the same functions.
  - The one library's identity functions stay as they are (section 2).
- **Findings 2 to 5** are four defects that the specification settles and that were measured in this
  batch. Each has only a ledger note.
  - Each is owed a gated expected-failure test now: an `XXX` walk test, an `XXX` compiled run pair,
    and `XXX` compile tests.
  - Batch 6b's judge ruled this (`explorations/compile-ladder/climb-batch-6b/JUDGE-review.md:31`,
    "It proves too much"). So did batch 7R's judge, and batch 7C's review repeated it
    (`explorations/reviews/batch-7C-review.md:179`, `:199`).
  - The rule text now carries it (`f5d7b8feb`, `explorations/coordinator/climb-batch-workflow.md:35`).
    It says that "a later rung writes it" and "the rung's files exclude a test" do not defer the test,
    and that the repair round writes it.
  - The batch launched with the text of `2a55fa570`, which predates that sentence. That excuses the
    workers' omission but does not waive the rule, because the rulings were on record before launch.
- **Finding 4 is refined** by a split measurement that the repair runs first (section 3.3).
- **No reserved stop** is met by the repair. It edits no checker, walk or library line, changes no
  assertion of a re-anchored test, and changes the verdict of no test other than G's own.

## 2. Finding 1: the red `WitnessIdentityRungG`

**What is established, and how.**

- **The suite run failed; the fresh-cache run passed.**
  - The suite's run threw `CastException` inside `cast` at `FZZ64`, called from `zeroOf` at `FZZ64`
    (`merged-review/witness-identity-gate.txt` section 1).
  - The gate's fresh-cache compile of the same file passed three times. Its bytecode feeds
    `coerce_ZZ32` into `CompilerBuiltin.widen(FZZ32): FZZ64` (sections 2-3).
- **The suite took `NN32`'s `widen`. This is shown by elimination, not traced.**
  - The ZZ32 assertions at `:32-33` passed. So `cast` is the repaired one, which matches a value of its
    type and returns it.
  - A `CastException` from `cast[\ZZ64\]` therefore means that the value was not a `ZZ64`.
  - Only two declarations of `widen` in the compiled prelude apply to an `IntLiteral`:
    - `ZZ32`'s, `widen(self): ZZ64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:269`, the
      trait coercing from `IntLiteral` at `:211`);
    - `NN32`'s, `widen(self): NN64` (`:328`, coercing at `:274`).
  - `ZZ64` and `ZZ` declare no `widen` (`:147-209`, `:103-146`; row 349).
  - `IntLiteral` excludes `ZZ32` and `NN32` (`:390`), and `NN32` excludes `ZZ32` (`:273`). So neither
    declaration is applicable without coercion, and neither is more specific: neither type coerces to
    the other (the specification's definition, `Specification/basic/conversions-coercions.tex:494-501`).
  - The review's reading holds, and elimination makes it firmer than "by reading".
- **Not established.**
  - Why the pick differs: whether it follows what the JVM checked earlier (the review's suggestion, by
    analogy with row 488) or an iteration order. Nothing here traces it, and the repair does not need
    it.

**The specification.**

- It is silent on this case.
  - Its restrictions guarantee a unique most specific coercion (`conversions-coercions.tex:546-549`).
  - But they forbid only a coercion from a subtype and a cycle. A type that coerces into two mutually
    excluding types escapes them.
  - Batch N's record found this silence and put it to Pavol as its Q1
    (`explorations/coordinator/CLIMB-BATCH-N.md:21-26` at `80605eeda`). Its case list names this very
    call: "`widen(0)`, which the library's own `additiveIdentity` calls" (`:22`, `:26`).
- He decided it on 2026-09-28 at 19:06 UTC (`explorations/coordinator/POSITIONS.md:134`, decision 1):
  "a numeral whose candidate types are incomparable reads as `ZZ32`". Batch N's rung I builds it,
  with its compiled tests (`explorations/coordinator/PLAN.md:67`).
- So the compiled checker's pick is a defect with a decided answer and a scheduled repair. Until then
  a test must not depend on the pick.

**Why the test changes and the library does not.**

- **The test runs over the compiled prelude.** There `IntLiteral` is a sibling of `ZZ32`, so the
  arbitrary pick is live today. `v: ZZ32 = 0` then `widen(v)` leaves the checker one applicable
  declaration and no coercion to choose. The test's subject is answer 7's witness through the repaired
  `cast`, and that is unchanged.
- **The one library's identity functions** (`Library/FortressLibrary.fss:3129`, `:3146`, and the
  `NN32`, `NN64` and `ZZ` branches beside them) are unambiguous on every path that reads them today:
  - Walk makes the numeral a `ZZ32` (row 79).
  - The compiled checker's reading of the one library, the distance stage and the path after the
    switch-over, declares `object IntLiteral extends { ZZ32 }`
    (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:117`). There `widen(0)` is `ZZ32`'s without
    coercion.
  - After batch N's switch, Pavol's default reads the numeral as `ZZ32`, which is again `ZZ32`'s
    `widen`: the value the branch intends.
- **Editing the library would repair nothing.** It would add 16 lines inside the two functions and
  move every `FortressLibrary.fss` citation below `:3129` a second time in this batch. The gather has
  already re-anchored eleven of them for G's 8 lines (`RECORD.md:44`). It would also remove a named
  case from the evidence of a decided rule that batch N will build and test.
- **This narrows the review's instruction** ("in the test and in the identity functions"). It is not a
  decision under silence: POSITIONS.md:134 governs it.
- **The review's aside on `unsigned(0)` is not established.**
  - By the specification's definition, `ZZ32` is more specific than `ZZ64` for an `IntLiteral`
    argument. `ZZ32` excludes `ZZ64` (`CompilerBuiltin.fsi:210`), coerces to it (`:149`), and rejects
    it, because the one type coercing to `ZZ32`, `IntLiteral`, excludes `ZZ64` (`:390`;
    `conversions-coercions.tex:486-501`).
  - Whether the compiled checker applies the rejects clause is row 391's question, not measured.
  - The repaired test does not call `unsigned`.

**What G's report got wrong.**

- `explorations/compile-ladder/rung-generic-runtime/REPORT.md:166` says the six branches that pass a
  function's result "already have values of their type on both paths".
- That holds for the one library. It does not hold for the same shape over the compiled prelude,
  which is where G copied it into `WitnessIdentityRungG`.

**The count** (rule 2):

- A grep of every `compiler_tests/*.fss` and `library_tests/*.fss` for `widen`, `unsigned`, `big`,
  `narrow`, `signed` or `asZZ32` applied directly to a numeral finds four sites, all in this file
  (`:12`, `:24`, `:34`, `:35`).
- No other gated compiled test has the shape.

## 3. Findings 2 to 5: the tests owed

### 3.1 Finding 2: walk refuses the α-renamed and swapped generic pairs

- **The specification allows the pairs.** Overloads may not differ in their static parameters, but
  only "(up to α-equivalence)" (`Specification/basic/overloading.tex:100-107`).
  - `grab[\Y\](t: Sub[\Y\])` beside `grab[\X\](t: Tag[\X\])` is α-equivalent.
  - So is `pair[\B,A\](t: SubTwo[\B,A\])` beside `pair[\A,B\](t: Two[\A,B\])`.
- **Answer 9's positional rule keeps both legal** (POSITIONS.md:108). The arms agree position by
  position, and `Sub[\X\]` extends `Tag[\X\]` as `SubTwo[\A,B\]` extends `Two[\A,B\]`.
- **The answers are settled.** Dispatch goes to the most specific applicable declaration
  (`overloading.tex:262-276`), and those are the assertions of `DispatchRenamedArmRungG` and
  `DispatchSwappedArmRungG`.
- **Walk refuses both at declaration** (`rung-generic-runtime/probes/differential-after.txt:77`,
  `:113`).
- **The deferral does not stand.** Rung G deferred the walk test to batch 7b's rung W because
  `ProjectFortress/tests/` is not among its files (`REPORT.md:118`, `record.md:71`, row 159's note,
  `PLAN.md:235`). That is the deferral the three rulings reject.
- **Two files, not one.** If a walk rung repairs one pair and not the other, a single file would mask
  the progress.

### 3.2 Finding 3: `try … catch` in a `do … also` arm

- **The specification.** Each `also` block runs in its own implicit thread
  (`Specification/basic/expressions/also.tex:17-21`), and the exception value is bound and matched as
  in a `typecase` (`Specification/basic/expressions/try.tex:56-60`).
- **Walk prints `hit 6`. The compiled class fails verification, on the base and on G's tree alike**
  (`rung-generic-runtime/probes/skeptic/try-in-arm.txt:6`, `:41`, `:74`).
- **The skeptic called these shapes settled** (`SKEPTIC.md:138`) and then recommended home 3, a note
  on row 322 (`SKEPTIC.md:225-228`). That is inconsistent. Home 2 is owed: a link test and an `XXX`
  run test, the shape of `XXXTaskArmLocalSlot`.
- **Two rows.** Since G's fix binds every catch name (`REPORT.md:160`), the catch name is a local in
  the task body. So the program also meets row 497's slot-0 defect. The test goes green only when both
  rows are repaired, and its message cites both.

### 3.3 Finding 4: the code generator's `Error trying to close method scope`

- **The skeptic's claim.** The same ASM failure occurs "without a coercion" in two shapes (row 340's
  second note; `SKEPTIC.md:229-234`).
- **The tuple shape holds.** In `SkTupleClauseSpread`, the `typecase` is inside a `do` block and its
  `else` answers a `String` (`rung-generic-runtime/probes/skeptic/SkTupleClauseSpread.fss:6-12`), so
  no coercion is involved.
- **The task-operand shape is not shown to be "without a coercion".**
  - Both of its probes end in `else => 0` in a function declared `ZZ32`, whose body is the `typecase`
    (`SkClauseTaskOps.fss:8-12`, `SkTypecaseTaskOps.fss:10-14`). That is row 340's own trigger: a
    `typecase` function body whose value is coerced from `IntLiteral` (row 340's claim).
  - No control separates the two. The gather carried the claim into its recommended rows
    (`RECORD.md:37`).
- **G's worker met row 340's own crash in this batch too.** Its first `TypecaseBindRungG` draft had
  that `else` (`REPORT.md:75`), and row 340 has never had a gated test. The row itself says "It is
  ungated, and cheaply gated".
- **The specification settles all three shapes.**
  - A function body is any expression (`Specification/basic/functions.tex:46-48`).
  - A `typecase` is an ordinary expression whose value is the matched clause's
    (`Specification/basic/expressions/typecase.tex:53-55`, `:88-99`, `:110-111`).
  - The checker and walk accept each program. A code-generator crash on such a program is a defect
    whatever the trigger.
  - The per-clause named form that the tuple shape uses is the form rung G's own home-1 tests assert
    (`REPORT.md:41`).
- **The repair first runs the split**, the task operands with a `ZZ32` `else`, and then writes:
  - one `XXX` compile file for row 340's own shape, always;
  - one for the task-operand shape, only if the split shows that it crashes without the numeral;
  - one for the tuple shape, always.

### 3.4 Finding 5: the integer rules P stated, which the compiled prelude refuses

- **What P's text states.**
  - `LSHIFT` and `RSHIFT` on all five integer types, with a count of any integer type
    (`Specification/basic-lib/basic-integers.tex:47-62`).
  - `narrow` on `ZZ64`, `ZZ` and `NN64` (`:39-45`).
  - `GCD` and `LCM` on integer operands, nonnegative (`Specification/basic/operators/opr-overview.tex:256-263`).
    The last is the Working Draft's own sentence; the library's `Integral[\I\]` promises both
    operators to every integer type (`Library/FortressLibrary.fsi:452-453`).
- **The compiled prelude refuses them.**
  - "Could not check call to operator LSHIFT" on `NN32`
    (`rung-spec-integer-rules/probes/skeptic/SkNNShiftC.both.txt`).
  - "Could not check call to function narrow" on `ZZ` (`SkZZNarrowC.both.txt`).
  - `NN32` and `NN64` declare no `GCD` or `LCM` (`CompilerBuiltin.fsi:273-330`, `:332-388`, by
    reading; the test measures it).
- **P's skeptic said the specification settles these** (`SKEPTIC.md:43`) and homed them as rule 4's
  fourth case with no test. P's report did the same (`REPORT.md:88`).
- **The exact precedent is `XXXShiftDeclRungI`.** It is a prelude gap that the specification settles,
  gated by an `XXX` compile test with `compile_err_contains`, and promoted at the switch-over. The
  batch 3.5 judge's repair made it (row 383). Batch 6b's judge rejected "the prelude leaves" as a
  reason to defer.
- **What the tests assert.**
  - They assert values inside each type's range only. The `NN` overflow half is P's reserved stop,
    "normative text for a rule neither path runs" (`opr-overview.tex:264-268`), listed for Pavol, and
    it stays out of the tests.
  - Walk's `NN` `LCM` natives are rung E's repair in the next run (`CLIMB-BATCH-6.5.md`, rung E), from
    batch 6b's review. They were not first measured here.
  - The `narrow` test follows P's decision to state `narrow` on `ZZ` (P.worker.2, listed for Pavol).
    If he reverses it, the test goes with the text.
- **Three files, not one.** A partial declaration then turns its own test red instead of hiding behind
  another family's error.

The review was right to leave out row 391's coercion-chain face. The specification's answer there is a
refused compile that today succeeds, and the harness has no test that is green today for that
(row 391, "No gated test, by decision"). Finding 1's face is the same: no test is stable over a pick
that varies.

## 4. Who was right

- **The review.**
  - Right on all five findings, and on the evidence file.
  - Right on the test's repair.
  - Wrong to extend that repair to the library (section 2).
  - Its `unsigned(0)` aside and its JVM-history mechanism are not established.
- **Rung G's worker.**
  - Right that the witness device works through the repaired `cast`.
  - Wrong that the numeral branches "already have values of their type on both paths" (`REPORT.md:166`)
    for the prelude copy it wrote.
  - Wrong to defer the walk test (`REPORT.md:118`), under the three rulings.
- **Rung G's skeptic.**
  - Right that the task-arm and ASM-frame shapes are settled (`SKEPTIC.md:138`).
  - Wrong to home them in notes.
  - Unsupported in "without a coercion" for the task-operand shape (section 3.3).
- **Rung P's worker and skeptic.**
  - Right that the specification settles the prelude's gaps.
  - Wrong to leave them to the switch-over without an `XXX` test.
- **The gather.** It carried the walk-test deferral into `PLAN.md:235` as a default, and the skeptic's
  "without a coercion" into its recommended rows.

## 5. Considered and not ordered

These are older debts of the same kind, measured before this batch. The repair does not take them on.
- Row 322's own shape, `atomic` as an arm's trailing expression, measured in batch 3's repair.
- Row 442's batch-6 faces (`ZZ32` into `RR64`, and the others).

Row 340's own shape is the exception: this batch measured it again (section 3.3), so it is ordered.

## 6. Instructions for the repair worker

These are the numbered instructions of the structured result, reproduced in order.

1. **Wait for the gate.** Work in `/home/user/fortress` on `main` after this ruling's commit. Do not
   build, run `fortress`, run the harness or touch `default_repository/caches` until the batch's gate
   run in this tree has finished (no `ant` or `java` process of it alive). Its runs would be disturbed.
   Set up the shell as the prefix says, with `FORTRESS_HOME=/home/user/fortress`. Other writers' files
   are in the working tree (`RECORD.md:136`), and `explorations/coordinator/CLIMB-BATCH-N.md` is being
   edited by another agent. Stage every commit by an explicit path list, and never edit that file.
   Do not run `ant testFast` or `ant testSystem`. Every capture goes under
   `explorations/compile-ladder/climb-batch-6.5/judge-repair/` as `.txt`, with the machine line
   (nproc, the CPU model name and MHz, the load at start, the JDK, `FORTRESS_THREADS`).
2. **Measure the suite's pick, if its jar survives.** Find the jar that the gate's `CompilerJUTest`
   compile of `WitnessIdentityRungG` wrote (under `default_repository/caches/`, with an mtime inside
   the `testFast` run). If it exists, capture `javap -c` of its `zeroOf` template's `FZZ64` branch to
   `judge-repair/witness-suite-javap.txt`: which `coerce_*` and which `widen` it calls. If it is gone,
   write that in one line. This turns the elimination of section 2 into a measurement, or says it
   stays one.
3. **Repair the test.** In `ProjectFortress/compiler_tests/WitnessIdentityRungG.fss`:
   - Replace `:12` with three lines, `() -> ZZ64 =>`, `v: ZZ32 = 0` and `cast[\T\](widen(v))`,
     indented as the `ZZ32` branch at `:9-11` is.
   - Replace `:24` the same way with `v: ZZ32 = 1`.
   - In `run()`, before the assertion now at `:34`, add `seven: ZZ32 = 7` and `eight: ZZ32 = 8`. Write
     `:34` as `assert(zeroOf[\ZZ64\]() + widen(seven) = widen(seven), ...)` and `:35` as
     `assert(oneOf[\ZZ64\]() + widen(seven) = widen(eight), ...)`.
   - Leave every message string, the comment line and the `.test` file unchanged.
   - Do not edit `Library/FortressLibrary.fss` (section 2).
4. **Verify the test** and capture to `judge-repair/witness-identity-after.txt`:
   - `bin/fortress junit compiler_tests/WitnessIdentityRungG.test` from `ProjectFortress/`, three times,
     each in a fresh JVM; each must say OK.
   - `javap -c` of the resulting jar's `zeroOf` and `oneOf` templates and of `run`: no `invokestatic …widen`
     may be fed directly by a `coerce_*` call. Each `widen` takes a value loaded from a local.
   - One walk run of the `.fss`, which must print `PASS`, as G's differential did.
   - If the library cache is missing, rebuild it first in library order (the prefix's recipe).
5. **Record finding 1.**
   - In `explorations/compile-ladder/rung-generic-runtime/REPORT.md:166`, replace the sentence "The six
     branches that pass a function's result … already have values of their type on both paths and are
     unchanged". The replacement says:
     - these branches have values of their type under walk, where a numeral is a `ZZ32`, and in the
       compiled checker's reading of the one library, where `IntLiteral` extends `ZZ32`
       (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:117`);
     - they do not over the compiled prelude, where a numeral reaches `ZZ32`'s and `NN32`'s `widen`
       by coercion alone, and the checker's pick differed between two compiles;
     - so `WitnessIdentityRungG` widens a typed `ZZ32` since the judge's repair
       (`compile-ladder/climb-batch-6.5/JUDGE-review.md` section 2).
   - Append to ledger row 391's notes: the face, its citations (`CompilerBuiltin.fsi:211`, `:269`,
     `:273-274`, `:328`, `:390`; `compile-ladder/climb-batch-6.5/merged-review/witness-identity-gate.txt`
     sections 1-3, and step 2's capture), "mechanism not traced", no gated home for the row's reason, the
     count of section 2 (four sites, one file, now none), and Pavol's numeral default
     (POSITIONS 2026-09-28, the conversion judgement's decision 1) built by batch N's rung I.
   - Append one sentence to `FACTS.md`'s entry "The replacement for `SUM`'s and `PROD`'s catch-all,
     judged on both paths", after "The checker refinement was not needed.": the test's `ZZ64`
     branches widen a typed `ZZ32` binding, because over the compiled prelude `widen(0)` has two
     candidates and the checker's pick varied (row 391).
   - In `PLAN.md:67`, after "with its five compiled tests", add that one of them should be the shape
     `cast[\ZZ64\](widen(0))` over the compiled prelude, whose pick varied between the gate's suite and
     a fresh compile (`compile-ladder/climb-batch-6.5/merged-review/witness-identity-gate.txt`).
6. **Write two walk tests for finding 2** in `ProjectFortress/tests/`:
   - `XXXDispatchRenamedArmWalkRungG.fss` is the program of
     `ProjectFortress/compiler_tests/DispatchRenamedArmRungG.fss` with its component name changed.
   - `XXXDispatchSwappedArmWalkRungG.fss` is the same for `DispatchSwappedArmRungG.fss`.
   - Each carries `println("REACHED")` first, the same assertions and messages (they cite
     `overloading.tex:100-107`, `:262-276`; add row 159 to the first message of each), `println("PASS")`,
     and one comment line, `(* See explorations/compile-ladder/climb-batch-6.5/RECORD.md. *)`.
   - Run each through the testSystem harness in a scratch directory with
     `explorations/compile-ladder/rung-spec-integer-rules/probes/tests/harness-one.sh`. Each must show
     an expected failure (walk's "at least one pair of parameters must have excluding types").
   - Then show each going red on a control: a copy named `XXX…` whose two arms use one parameter name
     (`X`, and `A,B`), which walk accepts (`REPORT.md:118`). The harness must say the expected failure
     is missing, and the control must print `PASS`, which shows the rest of the program runs under walk.
   - If a control does not print `PASS`, record what walk answers as a note on row 159 and keep the
     test's assertions.
   - Captures go to `judge-repair/walk-dispatch-xxx.txt`.
7. **Write the compiled run pair for finding 3** in `ProjectFortress/compiler_tests/`:
   - `XXXTryInArmRungG.fss` is the program of
     `explorations/compile-ladder/rung-generic-runtime/probes/skeptic/SkTryInArm.fss`, with
     `println("REACHED")` first in `run()` and `assert(hit, 6, "…")` in place of its `println`. The
     message cites rows 322 and 497, `Specification/basic/expressions/also.tex:17-21` and
     `Specification/basic/expressions/try.tex:56-60`. Then `println("PASS")` and the one comment line
     of step 6.
   - `XXXTryInArmRungG.test` holds `tests=XXXTryInArmRungG`, `run`, `run_out_contains=REACHED`.
   - `TryInArmRungGLink.test` holds `tests=XXXTryInArmRungG`, `link`. This is the shape of
     `XXXTaskArmLocalSlot.test` and `TaskArmLocalSlotLink.test`.
   - Run the link test, then the run test, with `bin/fortress junit` from `ProjectFortress/`. The run
     test must say it saw the expected failure (a `VerifyError` after `REACHED`).
   - Show it red on a control: the same pair over a copy whose `try` is outside the `do … also`,
     which must pass.
   - Captures go to `judge-repair/try-in-arm-xxx.txt`.
8. **Split finding 4's task-operand shape, then write its compile tests.**
   - Compile `SkTypecaseTaskOps.fss` and `SkClauseTaskOps.fss` (under
     `rung-generic-runtime/probes/skeptic/`) each as is and each with its `else => 0` replaced, so that
     no clause answers a numeral: `else => g(y)` in `SkTypecaseTaskOps`, where `y` is a parameter, and
     `else => g(Wrap(0))` in `SkClauseTaskOps`, where `v` is bound only in the named clause. Capture
     the four compiles to `judge-repair/task-ops-split.txt`.
   - **Always** write `ProjectFortress/compiler_tests/XXXTypecaseBodyCoerceRungG.fss`. It is row 340's
     own shape from the row's claim: a trait `S` with objects `A` and `B` extending it, and
     `f(o: S): ZZ32 = typecase o of A => 1 else => 0 end`, asserted `f(A) = 1` and `f(B) = 0`. Its
     `.test` holds `compile` and `compile_exception_contains=Error trying to close method scope`,
     after the precedent `XXXObjExprRungS.test`.
   - **Only if** the numeral-free variant still crashes, also write `XXXClauseTaskOpsRungG.fss/.test`,
     holding that variant, named and unnamed, with the same `.test` form. Otherwise correct row 340's
     skeptic note (this batch's own text) in place: the two probes end in `else => 0` in a function
     declared `ZZ32`, which is the row's own coercion trigger, and the numeral-free variants compile
     (cite the split capture). Correct the gather's line at `RECORD.md:37` the same way.
   - **Always** write `XXXTupleClauseSpreadRungG.fss/.test` from `SkTupleClauseSpread.fss`, with the
     same `.test` form.
   - Each program prints `REACHED`, asserts walk's answers (`7`, `s7`, `1`/`0`) with messages citing
     row 340 and `Specification/basic/expressions/typecase.tex:88-99`, prints `PASS`, and has the one
     comment line.
   - Run each through `bin/fortress junit`: each must say it saw the expected exception. If
     `compile_exception_contains` does not match, find the harness key that matches the crash's text,
     so that the check still names the crash and a different failure turns the test red.
   - Show each red on a control that compiles: the `typecase` wrapped in a `do … end` (`TcInDo`'s cure),
     and `SkTupleSpread.fss`'s plain local spread.
   - Run each program under walk once.
   - Captures go to `judge-repair/codegen-crash-xxx.txt`.
9. **Write three compile tests for finding 5** in `ProjectFortress/compiler_tests/`, each with its
   `.test` holding `compile` and `compile_err_contains=<the message measured>`, as
   `XXXShiftDeclRungI.test` does.
   - `XXXNNShiftRungP` covers `LSHIFT` and `RSHIFT` on `NN32` and `NN64` with a `ZZ32` count of 1
     (`2^32-1 LSHIFT 1` is `4294967294` on `NN32`), each result bound to a variable declared with the
     receiver's type. It cites `Specification/basic-lib/basic-integers.tex:47-62`.
   - `XXXNNGcdLcmRungP` covers `GCD` and `LCM` of 12 and 18 on `NN32` and `NN64`, `6` and `36`,
     results typed the same way. It cites `Specification/basic/operators/opr-overview.tex:256-263`,
     not the overflow sentence.
   - `XXXZZNarrowRungP` covers `narrow` of a `ZZ` holding `1`, `-1` and `2^32+5` (built by `ZZ`
     arithmetic on typed bindings), `1`, `-1` and `5` as `ZZ32`. It cites `basic-integers.tex:39-45`.
   - No conversion takes a numeral directly (`unsigned(twelve)` with `twelve: ZZ32 = 12`, never
     `unsigned(12)`; finding 1).
   - Each prints `REACHED` and `PASS` and has the one comment line.
   - First capture each compile's message and set `compile_err_contains` to it. Then run each through
     `bin/fortress junit`: each must say it saw the expected failure.
   - Show each red on a control whose missing operation is replaced by a compiled-path equivalent with
     the same value, which compiles and prints `PASS` (the precedent's `three <<< thirtyThree`).
     For example: `x << one` for `LSHIFT`, `unsigned(a32 GCD b32)` over `ZZ32`, and a `ZZ64`'s `narrow`.
   - Run each unmodified file under walk and record what it prints. Where walk disagrees with an
     assertion, keep the assertion and cite the row that owns walk's defect.
   - Captures go to `judge-repair/prelude-integer-xxx.txt`.
10. **Check every new test.**
    - Exactly one comment line, and citations in the messages only.
    - The competing-name grep over `ProjectFortress/tests`, `compiler_tests`, `library_tests`, `Library`
      and `ProjectFortress/src/com/sun/fortress`: each new component name occurs only in its own
      `.fss` and `.test` files.
    - A grep of the new compiled tests for a conversion applied directly to a numeral must be empty.
11. **Record the homes.**
    - Row 159: replace this batch's sentence "The gated walk half belongs in `ProjectFortress/tests/`,
      outside rung G's files; answer 9's walk rung owes it." with the two walk tests' names, "expected
      failures since the judge's repair of climb batch 6.5; answer 9's walk rung (batch 7b's rung W)
      promotes them". Do the same in `rung-generic-runtime/record.md:71`, and append the same to
      `REPORT.md:118`'s last cell.
    - Rewrite `PLAN.md:235`'s sentence "The gated walk test … the default is that answer 9's walk rung,
      batch 7b's rung W, owes it" to say that the test is gated by the two files and that rung W
      promotes them.
    - In the handover's rung G paragraph (`explorations/microgpt-run-c-handover.md:25`), write "walk's
      refusal of α-renamed generic pairs is gated as an expected failure; its fix goes to answer 9's
      walk rung".
    - Row 322 and row 497: append the try-in-arm pair.
    - Row 340: append the tests of step 8, and correct the note if step 8 says so.
    - Rows 442 and 349: append the three tests of step 9, "promoted at the switch-over, as
      `XXXShiftDeclRungI` is".
    - `rung-spec-integer-rules/REPORT.md:88`: append the same.
    - `PLAN.md`'s P.worker.2 line ("Two decisions … `narrow` is stated on `ZZ`"): add that
      `XXXZZNarrowRungP` follows the text and goes with it if he reverses it.
12. **Write the section "The judge's repair"** at the end of
    `explorations/compile-ladder/climb-batch-6.5/RECORD.md`.
    - Name every file changed and added, each capture, and each control shown red.
    - Give the predictions for the gate that runs again:
      - `CompilerJUTest` 815 plus one per new command line, 822 without `XXXClauseTaskOpsRungG` or
        823 with it, counted with the gather's regular expression (`RECORD.md:64`);
      - `LibraryJUTest` 84;
      - `testSystem` 430;
      - 42 four-thread PASS lines;
      - the checker count 75 and the distance 626, since no library or api line changes;
      - the ladder unchanged.
13. **Commit and hand back.**
    - Run the tracked-path check of the prefix over `RECORD.md`, this ruling and every record edited.
    - Commit locally on `main`, staged by explicit list, ending with the protocol's two footer lines,
      and do not push. The gate runs again on the commit.

## 7. For Pavol, out of the loop

- Over the compiled prelude, `widen(0)` has two candidate declarations, `ZZ32`'s and `NN32`'s.
  - The compiled checker chose `NN32`'s in the merged gate's suite and `ZZ32`'s in a fresh compile of
    the same file. That turned one of rung G's tests red.
  - The repair removes the numeral from the test and leaves the one library's identity functions as
    they are, since your numeral default of 2026-09-28 gives them the intended answer.
  - The checker's instability stays until batch N's rung I builds that default. It is recorded on
    row 391 with no gated test, because no test is stable over a pick that varies.
