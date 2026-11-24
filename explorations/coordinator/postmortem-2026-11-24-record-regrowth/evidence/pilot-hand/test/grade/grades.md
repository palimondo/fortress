# Record test of 2026-11-24: grades

Inputs: `questions.md`, `key.md`, `grade/answers-X.md`, `grade/answers-Y.md` in this folder. Graded blind: `questions-p.md` and `questions-q.md` were not opened. Claims outside the key were checked in `/home/user/fortress-pilot` (at `d7fc19bb9a`) with bounded `grep`/`sed -n` reads; each check is cited where it decided a score.

Scoring follows the key: decision 0-2, sources 0-1. Two rules of my own, stated so they can be undone:

- Sources are scored by the key's general definition (key.md:7): every load-bearing fact beyond the quoted entries is cited to a source that holds it. A pointer that a reader missed is scored once, in the decision. A strict reading of a scenario's own "Sources 1" line would also take the sources point. Section 3 gives both totals.
- Where the record contradicts the key (section 5), I grade on the record. Section 3 also gives the totals under the key as written.

---

## 1. Scores by scenario

### 1. Two failures that the suite does not show

- **X: decision 2, sources 1.** It ties the overflow to row 640 and the unpinned 1 MB stacks, reruns it with `JAVA_FLAGS="-Xmx4g -Xss64m"` and four threads (8 runs), and notes the row if the rate matches. The walk OOM is measured base against head at 256 MB, about 5 runs each, and recorded or repaired as a regression if only the head dies. It hedges ("not yet classified"), but the hedge rests on a real point: a run-time rung's fix is in `runtimeSystem/`, which walk does not run. Its alternative causes are also checked: walk's default of half the CPUs when `FORTRESS_THREADS` is unset is true (`interpreter/Driver.java:528-533`). Heaps and stacks are cited (`bin/fortress:28-29`, `bin/run:33-34`, `build.xml:141`, `:1257-1259`, row 67).
  - Lookups: `ledger:640`; row 67; F-203, P-125; `bin/fortress:28-29`, `bin/run:33-34`; `build.xml` grep (`FORTRESS_THREADS`, `Xss64m`, `junitMem`); F-179 (as quoted in scenario 3).
- **Y: decision 2, sources 1.** Overflow: row 640, with 12 runs at each of three settings (unpinned, pinned, one thread) and a note on row 640. Walk OOM: the change's until measured. It compares base with head at 256 MB, 3 runs each, finds each tree's smallest heap (384m, 512m, keeping 32 MB stacks), and fixes or records a ledger row. It does not hide the failure behind the suite's 768 MB. Row 640's "9 of 12" for the call form is right (row 640's notes).
  - Lookups: `bin/run`, `bin/fortress`, `build.xml` (1257-1259, 141); F-203; `ledger:640`, `ledger:67`; `ledger-find:OutOfMemoryError`, `ledger-find:StackOverflowError`; `process-engineering/build-efficiency.md` section 6.

### 2. A closed family covered by a generic body

- **X: decision 2, sources 1.** It names row 728 and `XXXAbstractMethodGenericBodyWalk` and leaves walk alone (outside its brief). It writes `HImpl` with the plain body `g(self, x: Side)`, with the Ping/Pong pair as the alternative. P-147 (POSITIONS.md:62) calls the plain body valid: "A body at the abstract method's own parameter types is the plain case" (see section 5). It reads `Wrap`'s load as row 665 (`Constructor.java:263` is quoted rightly), gives `Wrap` its body and checks it in the compiled test.
  - Lookups: `ledger:665`, `ledger:728`, `ledger:725`, `P-147`; `ls tests | grep AbstractMethod`.
- **Y: decision 2, sources 1.** The same decision: row 728, the plain body chosen over the pair, row 665 for `Wrap`, `Wrap` given `g` and a walk assertion that calls it. `Constructor.java:263` and `:431` are right.
  - Lookups: `ledger:665`, `ledger:728`, `ledger:725`, `P-147`.

### 3. A rung on the transaction check of `var` fields

- **X: decision 1, sources 1.** It refuses the rung as worded, for good reasons: the dynamic extent of `atomic` (`atomic.tex:39-41`), row 319 and `AtomicFieldCompiled`, the captured cell, the cell as an undecided default (F-374), walk being separate and row 641 compiled-only, and the field's cost unmeasured. Its `VarCodeGen` list covers every kind of variable. It misses the curator's own condition in PLAN.md phase 6: the role of transactional memory is to be described to him before the checks change (`PLAN.md:130`). So it offers a code rung that changes `BaseTask.inATransaction` and `VarCodeGen` ("measures and cheapens the check") right after two questions, a step the plan says must wait. Every claim it makes is sourced. Its sources line does not name PLAN.md, which the scenario's sources line asks for.
  - Lookups: `ledger:641`, `ledger:112`, `ledger:302`; `positions:` queries and a POSITIONS grep; `atomic.tex:30-50`; `rung-atomic-expr-field/REPORT.md`; `MicroGptFlat.fss` grep.
- **Y: decision 2, sources 1.** Not as worded. It finds PLAN's condition (`PLAN.md:130`, his words of 2026-09-19), the cell's status, the unmeasured field and walk's separate implementation (P-29). It cuts a study rung that changes nothing, covers every kind of mutable variable (so a rung on row 641 is about all of them, not fields alone) and ends with an account of transactional memory for him. It does not say in so many words that one code path emits every check, but its rung already covers all kinds. P-169's slot tracking and `ReferenceCell.java` are as stated.
  - Lookups: `ledger:641`, `ledger:319`, `ledger:112`; `atomic.tex` grep; `perf-probes/transactions/REPORT.md`; `interpreter/env/ReferenceCell.java`; a POSITIONS grep (P-169); `PLAN.md:120-135`; `P-29`.

### 4. A gate that reads one error and runs slow

- **X: decision 2, sources 1.** The error is real until shown otherwise. Rung C's compile ran with the memo on, its default (F-43), stopped at the first stage and checked one component, so it does not overrule the distance stage, which runs with the memo off (`tools/distance/run.sh:86`). It reproduces the error by the distance stage on base plus rung C against the base. On time, 260 s at load 3.8 against 117 s at 0.29 is inside F-240's spread, and the way to measure is a back-to-back pair on an idle machine. Neither stage turns the gate red (P-39); it holds rung C, not the batch. Its line "F-43's evidence that memo on and off agree is one measurement" matches `tools/checker-count/run.sh:49` ("the count is 62 with the memo on and off"), so it is not invented. Its "the checker's output order is fixed" is `compiler.md:261`.
  - Lookups: `compiler.md` ("The checker's time"); `tools/distance/run.sh` header; `climb-batch-36/gate/distance.txt`; P-33, P-39; `library.md`; `records.md` "Timings and citations".
- **Y: decision 2, sources 1.** The same decision. The memo is named as why the worker missed the error, and it gives the worker the memo-off rerun. The time reading is the same, with the pair costed. On holding: the rule holds nothing (P-39, `batch.md:60`), but the distance has been 0 since climb batch 22 (F-61, verified). It recommends a reproduction run and then a repair round or a ledger row for rung C, and leaves the choice to the curator.
  - Lookups: `F-53`; `compiler.md` 1-12, 112-128; `tools/checker-count/run.sh`, `tools/distance/run.sh`; `positions:checker count` (P-39); coordinator `batch.md:60`; a FACTS grep (F-61, F-66).

### 5. Walk's departures from the instance rule

- **X: decision 2, sources 1.** None of the four is the rung's. (a) is row 592 (deliberate), D3, `XXXInferThroughBoundWalk`, with `APPCOV` (`CovariantCollection.fss:30`) and the tests it breaks; it goes to the curator as a default of the rung. (b) is left and named as a point, with its reach: `SUM`/`PROD`, F-228, and the five `testSpecData` examples (F-114, verified). (c) is D5, a default, to the curator. (d) is row 589, the curator's. It makes rows 587, 591, 612 and 616 the rung's work, test first, with their `XXX` tests. One weak point costs nothing on the rubric: review-queue item 80 marks (a) "Settled or stale. P-12 settles it" (`review-queue.md:837`), so its question on (a) is redundant.
  - Lookups: `P-48`, `ledger:592`, `ledger:589`, `F-114`; a decision-record grep; a POSITIONS grep (F-bound, P-78); `ls tests | grep Infer`; the headers of `InferUnfixedFBoundedWalk` and `InferLoneBoundMentionsParamWalk`.
- **Y: decision 2, sources 1.** (a) is left, with `APPCOV` and the tests it breaks, and settled by P-12 (review-queue item 80, verified). (b) is left: the curator answered Q1 at way 11 (`CLIMB-BATCH-11.md:60`, verified), and it reaches row 716. (c) is left and listed for the curator as D5. (d) goes to the curator with a drafted question. Rows 587, 591, 612 and 616 are named as the measured departures P-48 names. It asks the coordinator before taking them up, rather than making them its work outright as X does.
  - Lookups: `P-48`, `P-46`, `P-12`; `ledger:592`, `ledger:589`; a review-queue grep (item 80); a POSITIONS grep (F-bound); `rung-walk-open-param/REPORT.md` sections 1 and 7-9; `CLIMB-BATCH-11.md:60`; the decision record's D3-D5; `InferLoneBoundMentionsParamWalk.fss`; a listing of the tests.

### 6. An empty sum under walk

- **X: decision 1, sources 1.** The rewrites are right: (a) and (d) yes, (b) and (c) no. Rows 716 and 705 (and 510) are named with their tests, there is no new row, and walk is not changed. It prefers a fifth form, `SUM[\RR64\][...]`, which is P-78's written static argument (POSITIONS.md:95) and row 716's own workaround: a better-grounded choice than the key's (section 5). It misses the curator's open question on walk's typing here. "Nothing needs to go to the curator: P-78 already decides the written form" answers a different question. Row 510's notes, which it read, say "whether before the switch-over (P-12) is the curator's"; PLAN.md:475 holds the row-716 question.
  - Lookups: `ledger:716`, `ledger:705`, `ledger:510`; a POSITIONS grep for P-78; F-228 and F-221.
- **Y: decision 2, sources 1.** The rewrites are right, (d) with the `UnwrittenEmptyFloatSumWalk` shape and `w` passed in. It takes (a) and asserts the type. It names rows 716, 705 and 510 and changes nothing in walk. It finds the question already held: row 510's notes plus P-12 (walk gains static types after the switch-over), and so sends nothing new.
  - Lookups: `UnwrittenEmptyFloatSumWalk.fss`; `ledger:716`, `ledger:705`, `ledger:510`; `P-12`; `rung-walk-open-param/REPORT.md` section 9.

### 7. A rung on `label` and `exit`

- **X: decision 1, sources 1.** 1041 and 1042 are right (CONTESTED, not the rung's, reported with their alternatives). It names the atomic consequence (F-401), rows 890, 1110 and 1111, and the tests that stay green. On 1040 it sees that the specification speaks, and finds that the team's `tests/LabelTest.fss:26-30` and `tests/objectCC_label.fss:181-186` catch a late exit as `LabelException`. A fix of 1040 then moves 1041 unless walk tells a late exit from a live one, which neither path does (F-401). Verified. So it attempts 1040 only if late exits stay catchable. It misses review-queue item 562 (`review-queue.md:111`, `:725`; PLAN item 100), which already holds all three rows as one question with the default "as landed". So it drafts three new questions, and its "Default: none on record" for 1040 is wrong. Under the key as written this is also 1.
  - Lookups: `ledger:1040`, `ledger:1041`, `ledger:1042`, `ledger:890`; `label.tex`; `Evaluator.java:1445-1460`; `FortressLibrary.fsi:1220-1228`; `LabelTest.fss`, `objectCC_label.fss`; `ls` of the tests; a `FortressTaskRunner.java` grep.
- **Y: decision 2 on the record (1 under the key as written), sources 1.** It finds review-queue item 562 and PLAN item 100, with their ways and the default "as landed". It reads "Follow the specification" as possibly the curator's answer and asks the coordinator to confirm. If so, 1040 is the rung's: promote `XXXExitThroughCatchWalk`, repair walk's `try` for live exits only, and keep late exits catchable for the team's two tests. 1041 and 1042 are reported, with the team tests offered to item 562 as evidence it does not cite. The atomic consequence (F-401, `ExitOutOfAtomicWalk`), row 890 (`FinallyOnEscapeWalk` stays green) and rows 1110 and 1111 are named.
  - Lookups: `ledger:1040`, `ledger:1041`, `ledger:1042`, `ledger:890`; `label.tex` whole; a `try.tex` grep; review-queue item 562 (lines 111, 725-729); `PLAN.md` 150, 745-746, 793; a `LabelException` grep over `Library` and the tests; `LabelTest.fss`, `objectCC_label.fss`.

### 8. An array of `Number`

- **X: decision 2, sources 1.** Not as worded. `Vector[\Number,n\]` is ill-formed. The ways: the text (a text rung), the bound (6a, 25 errors), arithmetic on `Number` (6f, reverses route A), or a new type. It finds `PLAN.md:478` (L.worker.1) and its default and drafts the question with that default.
  - Lookups: `ledger:729`; `reviews/array-fork2-judgement.md`; `PLAN.md:478`; `aggregate.tex:150-185`; a POSITIONS grep.
- **Y: decision 2, sources 1.** The same, and it adds `PLAN.md:118` (a factory that reads the element bound, verified), P-160 and P-85.
  - Lookups: `ledger:729`; `PLAN.md:118`, `:478`; `array-fork2-judgement.md`; `P-160`; `aggregate.tex:150-170`.

### 9. A rung on row 808

- **X: decision 2, sources 1.** It promotes `XXXArray2ShiftedSlice` and extends it with the row's shift cases. The fix is `SubArray2.subarray` at `FortressLibrary.fss:3083` (`bo0`/`bo1` to `b0`/`b1`; the line is verified), and it notes that the row's `:2828` is stale. It checks the strided and nested cases, keeps `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase` and `VectorMatrixCastsWalk` green, reports the library edit and closes the row.
  - Lookups: `ledger:808`; `ledger.py find --cites Library/FortressLibrary.fss`; `FortressLibrary.fss:3066-3110` and a grep; `XXXArray2ShiftedSlice.fss`; `ls tests`; `tests-writing.md`; `tests-running.md`.
- **Y: decision 2, sources 1.** The same plan, with the expected-failure line written, `TransposedMatrix.subarray` (`:3054`, verified) among the cases, and a FACTS hand-over for F-279.
  - Lookups: `ledger:808`; `ledger.py find --cites`; `FortressLibrary.fss` 2810-2840, 2940-3000, 3059-3112; `XXXArray2ShiftedSlice.fss`; a listing of the tests; `tests-writing.md`.

### 10. A proposal to make covariance legal

- **X: decision 2, sources 1.** No. It cites P-25, P-62, P-97 and row 404 (`IncompatibleClassChangeError`, refused by walk). The restart's text is not new evidence. The example is kept with its mark and its one P-97 sentence, and nothing goes to the curator.
  - Lookups: `P-25`, `P-97`; `ledger:404`; F-166, F-47 and F-167.
- **Y: decision 2, sources 1.** The same, and it finds that the example already stands in P-97's form in `Specification/basic/trait-parameters.tex:420-472`, with its `revival-covariance` box (verified).
  - Lookups: `P-25`, `P-97`; a POSITIONS grep (P-62); `ledger:404`; `trait-parameters.tex:420-472`; a `covariant` grep over `Specification/basic`.

### 11. Parallel reductions after the switch-over

- **X: decision 2, sources 1.** Forking is already P-175's and built (F-350); the grain is 16. By reading, microGPT's widths do not fork, except `vocabSize` 27 (it splits once, from `batch-30-review.md:75`, verified) and the 64-wide MLP. No speed-up from threads, per the model's ratios with their trust. The baseline is P-7's 0.10/0.113 ms, careful scalar Java, not the fastest. The first rung measures, then gives the matrix product a grain (P-175's "forking constants"). It does not mention item 524, which the rubric does not require.
  - Lookups: F-350, F-356 and F-355; `MicroGptFlat.fss` 17, 22-36, 56 and a grep; `RangeInternals.fss:18-22`; `batch-30-review.md` section 2; `ledger:982`; P-175 (via a grep).
- **Y: decision 2, sources 1.** The same, and it adds the strided ranges, the parallel row loops, review-queue item 524 with its default, F-358, and PLAN's phase 6 order (the grain rung is first only among the parallel rungs).
  - Lookups: `P-175`, `P-7`; `batch-30-review.md` section 2; `MicroGptFlat.fss` and `FlatArrays.fss` greps; review-queue item 524; `FACTS.md:34` (F-358); PLAN phase 6.

### 12. A walk refusal test that passes on the base

- **X: decision 2, sources 1.** The pass is a pre-run error matched by a loose key (F-383). It runs on the base, fixes the program, makes the key exact and sees it red, then green. The compiled failure gets the two-file pair `OverloadShapeQLink.test` and `XXXOverloadShapeQ.test` over `XXXOverloadShapeQ.fss`, run together, plus a ledger row. It models the pair on `FinallyOnEscapeLink.test`/`XXXFinallyOnEscape.test` (they exist).
  - Lookups: `TypecaseUndefinedArmWalk.test`; `FinallyOnEscapeLink.test`, `XXXFinallyOnEscape.test`; `tests-writing.md` (45, 75-135); F-383 and F-103.
- **Y: decision 2, sources 1.** The same, with a control program and the pair named `...Compiled`.
  - Lookups: `tests-writing.md` ("Where a test goes", "How `XXX` works", "How a defect is recorded", "The order", "Writing an `XXX` test").

---

## 2. Where one answer scores lower

All three are X's. In each, the fact was not in the entries as the key quotes them (old texts). Y found it by its own search.

- **Scenario 3 (X 1, Y 2).** X lacked the curator's condition on row 641: understand what `atomic` requires of a variable no transaction can reach, and describe the role of transactional memory to him, before the checks change. It lives at `explorations/coordinator/PLAN.md:130` (phase 6). The cause: the fact is missing from the entries and was not found. F-374 and F-179 do not hold it, and row 641, which X read, does not point to PLAN (its notes were checked).
- **Scenario 6 (X 1, Y 2).** X lacked that whether walk should type this argument, or the undirected empty reduction, is already the curator's question. It lives at `PLAN.md:475` (B.worker.1 and B.skeptic.1 of climb batch 15's rung B, row 716, no default) and in row 510's notes ("whether before the switch-over (P-12) is the curator's"). The cause is mainly the entries: F-228 and F-221 do not hold it. But X read row 510, whose notes say it, and answered with P-78 instead. So the fact was partly in hand and not used.
- **Scenario 7 (X 1, Y 2; both 1 under the key as written).** X lacked review-queue item 562 (`review-queue.md:111`, `:725`; `PLAN.md:150`, item 100). It holds rows 1040, 1041, 1042 and 890 as one question with the default "as landed". The cause: missing from the entries (F-373 says only "the curator has not decided them") and not found. Rows 1040-1042 and 890 do not point to the item (checked). X's own error with the fact in hand: none. Its 1040 analysis, the team-test conflict, is right.

---

## 3. Totals

| | Decision (of 24) | Sources (of 12) | Total (of 36) |
|---|---|---|---|
| X | 21 | 12 | **33** |
| Y | 24 | 12 | **36** |

Under the key as written (scenario 7 at 1 for both; scenario sources lines read strictly, so X's sources in 3 and 6 are 0): X 21 + 10 = 31; Y 23 + 12 = 35.

---

## 4. The quoted entries

Blind to the copies, I read each entry as the key quotes it (its 2026-11-24 text), and the readers' answers for what they took from it.

- **F-99, F-107 (1):** no. Both readers have the pin, the 1 MB stacks and the 256 MB rule.
- **F-145, F-147 (2):** no.
- **F-374 (3): yes, X.** The one fact: "Phase 6 of PLAN holds the curator's condition: the checks do not change until what `atomic` requires is understood and transactional memory is described to him (`PLAN.md:130`)". Row 641, which the entry names, does not carry it.
- **F-179 (3):** no.
- **F-240, F-43 (4):** no. Both readers have the memo's default and the load spread.
- **F-141 (5):** no point lost. X took (a) to the curator, though review-queue item 80 is closed by P-12 (`review-queue.md:837`). The fact that would have spared it the question: "row 592's departure waits for Q-walk under P-12".
- **F-143 (5):** no.
- **F-228 (6): yes, X.** The one fact: "whether walk types an undirected empty reduction, or a call's argument, before the switch-over is the curator's open question (`PLAN.md:475`; row 510 with P-12)". F-221 holds row 705's part correctly.
- **F-373 (7): yes, X.** The one fact: "the three answers are review-queue item 562 (PLAN item 100), default: as landed". F-401: no.
- **F-229, F-151 (8):** no. Both found PLAN's L.worker.1 through row 729.
- **F-279, F-264 (9):** no.
- **F-166, F-47, F-167 (10):** no.
- **F-350 (11):** no worse decision. But its "16, 16, 4 and 4 wide ... forks nothing" leaves out `vocabSize` 27, which splits once (`batch-30-review.md:75`; `MicroGptFlat.fss:23`, `:56`). Both readers supplied it, and X handed it over as a FACTS correction.
- **F-356, F-355 (11):** no.
- **F-383, F-103 (12):** no.

---

## 5. Where the key is wrong or incomplete

1. **Scenario 7, row 1040.** The key says the specification settles 1040 and the rung may bring walk to the compiled answer. The record holds otherwise. Review-queue item 562 (`review-queue.md:111`: "three answers on `exit` (rows 1042, 1040, 1041 and 890; fork L1; PLAN's item 100) ... Default: as landed") puts 1040 in the curator's open question, with the default of no walk repair. And the team's own tests catch a late exit as `LabelException` (`ProjectFortress/tests/LabelTest.fss:26-30`; `tests/objectCC_label.fss:81-95`, `:181-186`). Walk's `try` offers every exit to `catch` by one path (`Evaluator.java:1453-1456`), and F-401 says neither path tells a late exit from a live one. So a 1040 repair also moves 1041 unless it learns that distinction. An answer that leaves 1040 waiting on item 562, or on keeping late exits catchable, is right; the key scores it 1.
2. **Scenario 6, the written static argument.** P-78 (POSITIONS.md:95: "A reduction written with generators writes its static argument where nothing at the call fixes the element type ... `SUM[\ZZ32\][j <- 0#n] f(j)`") and row 716's workaround ("write the static argument, or declare the value's type") make `SUM[\RR64\][...]` a decided form. It gives `RR64`'s zero on both paths in one line. The key lists only (a) and (d). The open question is also held in row 510's notes, with P-12, besides `PLAN.md:475`. The key should accept that source.
3. **Scenario 2, `HImpl`'s form.** The key's right answer names the pair `g(self, x: Ping)` and `g(self, x: Pong)`. P-147 (POSITIONS.md:62) also makes `g(self, x: Side)` valid: "A body at the abstract method's own parameter types is the plain case". Both readers chose it, and it meets neither row 725 nor row 728.
4. **Scenario 11, the widths.** The key repeats F-350's "forks nothing". `reviews/batch-30-review.md:75` adds "a range of 27 splits once, into 16 and 11", and `sm`'s `BIG MAX` and `∑` run over rows of `x4 lm^T`, 27 wide (`MicroGptFlat.fss:23`, `:56`). The decision stands, but the key's claim about microGPT's reductions is too broad.
5. **Scenario 5, what is the curator's.** For (b), `explorations/coordinator/CLIMB-BATCH-11.md:60` records that the curator answered Q1 at way 11, the open type, on 2026-10-08. The key gives it only as a rung's build and the decision record's "not yet decided" (`rung-walk-instance/decision-record.md:31`). For (a), review-queue item 80 is "Settled or stale. P-12 settles it" (`review-queue.md:837`), so the key's "take it to the curator" option is a redundant question.
6. **The sources rubric.** The scenario sources lines for 3, 6 and 8 require the source of the pointer that the decision rubric already scores (PLAN.md). Read strictly, a reader who misses the pointer loses both points for one fact. I scored sources by the key's general definition (key.md:7). Section 3 gives the strict totals.
