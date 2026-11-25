# Grades: the record test of 2026-11-24, pilot workflow

Inputs: `questions.md`, `key.md`, `grade/answers-X.md`, `grade/answers-Y.md`, all in this folder. I scored each answer against the key's rubric. Decision is scored 0 to 2 and sources 0 to 1. I checked each claim the key does not cover against `/home/user/fortress-pilot` with a bounded grep or read, and cite each check below.

To keep the grading blind, I did not open `questions-p.md` or `questions-q.md`, so I do not know which copy of the record either reader had. Each answer's header names its own folder, but I made no use of that.

Two rules applied throughout:
- A missing fact lowers the decision score.
- The sources score asks only whether every load-bearing fact the answer asserts is cited to a source that holds it.

---

## 1. Scores per scenario

### 1. Two failures that the suite does not show

| | Decision | Sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.** X ties the overflow to row 640 and to the unpinned 1 MB stacks. It reruns 8 times at four threads with `-Xmx4g -Xss64m`, and once more on the base with no pin. It takes the walk failure as a rise in memory use across its change, measured at 256 MB with base against head, 3 runs each, and then repaired or recorded as a row.
- **X, sources 1.** Rows 640 and 67, and the build-efficiency note. Row 640's "9 of 12" for the call-argument form checks out in row 640's notes.
- **Y, decision 2.** Y makes the same two calls. It reruns 12 times with the pin and 12 times at one thread with no pin. It measures walk on base and head, 3 runs each, at an explicit `-Xmx256m -Xss32m`, then at 768 MB, then finds the smallest heap that passes. It then repairs or records.
- **Y, sources 1.** Rows 640 and 67, `build-efficiency.md` 6.1, and `bin/fortress`/`bin/run`. Checked: row 67 cites `bin/fortress:28-29` for `-Xmx256m -Xss32m`. The "half the CPUs" default is `runtimeSystem/FortressExecutable.java:36-44`.
- **Lookups, X:** entries F-99 and F-107; `ledger:640`, `ledger:67`; `ledger-find:OutOfMemoryError`; `build-efficiency.md` (section query).
- **Lookups, Y:** `ledger:640`, `ledger:67`; F-203; `build-efficiency.md` 6.1; `bin/fortress`, `bin/run`.

### 2. A closed family covered by a generic body

| | Decision | Sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.** X names row 728 as the refusal and leaves walk alone, since `Constructor.java` is outside its brief. It writes `HImpl` as `g(self, x: Side)`, or as the `Ping`/`Pong` pair. It reads `Wrap`'s load through row 665 and gives `Wrap` its `g`.
- **X, sources 1.** Rows 728, 665 and 725, and the listings of the tests. X does not name P-147, but `AbstractMethodCoveredPairs` is the key's equivalent source.
- **Y, decision 2.** The same decisions. Y also keeps the generic shape out of the library.
- **Y, sources 1.** Rows 728, 665 and 725, and P-147. Its `Constructor.java:263` is the line row 665 cites.
- **Lookups, X:** `ledger:665/728/725`; `ls` of `tests` and `compiler_tests` for the `AbstractMethod` tests.
- **Lookups, Y:** `ledger:728/665/725`; F-145 and F-147 as given.

### 3. A rung on the transaction check of `var` fields

| | Decision | Sources |
|---|---|---|
| X | 1 | 1 |
| Y | 1 | 1 |

- **X, decision 1.** X refuses the rung as worded. It gives the cell's status (the planner's default, which the curator has not decided), row 319 and `AtomicFieldCompiled`, the capture (`VarFieldCapturedCompiled`), the field's unmeasured cost, and walk's independence. It misses two facts:
  - The curator's own condition in PLAN, phase 6 (`PLAN.md:130`): the transactional memory is described to him before the checks change. X's "Rung B" would change the check as soon as a measurement says so.
  - That one piece of code emits the check for every kind of variable. X cites the six sites in `VarCodeGen` (`:334`, `:365`, `:490`, `:528`, `:660` and `:705`, which I checked: `MutableStaticBinding`, `LocalMutableVar` and `MutableTaskVarCodeGen`). It never says that a change of the check therefore reaches locals and top-level variables too.

  One supporting claim is wrong: walk "has no separate per-access check". In fact walk's `ReferenceCell.getValue`/`assignValue` are `synchronized` and fetch the transaction on every access (`interpreter/env/ReferenceCell.java:123-184`).
- **X, sources 1.** Every fact X asserts is cited: rows 641, 319 and 112 (row 112's `V(1) === V(1)` and `Lazy` check out), the tests, `VarCodeGen`, and `memory-model.tex:385`. The missing PLAN fact is scored under decision.
- **Y, decision 1.** Y refuses the rung as worded. It names the PLAN condition (phase 6, verified at `PLAN.md:130`), the cell's status, rows 319 and 641, the captured cell, the unmeasured field cost, and walk's separate per-access lookup (verified). It misses the shared code. Its measuring rung and its questions for the curator treat the check as a matter for fields alone, though row 641, which Y read, says `VarCodeGen` emits the same check for locals, top-level variables and fields. The key's score of 2 requires that fact.
- **Y, sources 1.** Rows 641, 112 and 302; `rung-atomic-expr-field/REPORT.md`; `perf-probes/transactions/REPORT.md` section 5; `ReferenceCell.java`; `PLAN.md` phase 6.
- **Lookups, X:** `ledger:641/319/112`; a grep of POSITIONS; a grep of `inATransaction`; `Evaluator.java:205-230`; `ReferenceCell.java:25-120`; `memory-model.tex:381-389`.
- **Lookups, Y:** `ledger:641/112/302`; the rung report; the perf report sections 1 and 5; a grep of `ReferenceCell.java`; a grep of POSITIONS; `PLAN.md` phase 6.

### 4. A gate that reads one error and runs slow

| | Decision | Sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - X keeps the error. The worker's compile ran with the memo on (`OverloadingChecker.scala:79`). X asks for a memo-off reproduction and a distance run on rung C's tree, then a fix or a row.
  - On the time, X sets load 3.8 against 0.29 and cites the 217 s against 574 s pair. It calls the worker's 48 s not comparable and proposes a timing pair under a like load.
  - The gate is not red (P-39), so X holds rung C only and leaves the choice to the curator.
- **X, sources 1.** The memo's property, F-53, P-39 (verified: the distance stage "only reports"), and `climb-batch-workflow.md:119` and `:250` (verified: "two rungs' changes do not add").
- **Y, decision 2.** The same decisions. Y reruns the worker's compile with `-Dfortress.analyzer.overload.cache=false`, runs the distance stage on rung C's tree and on the base, and holds rung C until it is repaired or recorded.
- **Y, sources 1.** Its loads and times are verified:
  - batches 34 to 36 ran the distance stage in 200, 127 and 117 s, at start loads of 0.28, 0.19 and 0.29 (each batch's `gate/distance.txt`);
  - the count stage takes "80 to 180 seconds, more under load" (skill `compiler.md:238`).

  Y cites "the distance stage does not turn the gate red" to F-229, and F-229 does hold that sentence (`FACTS.md:316`).
- **Lookups, X:** F-53, F-235, F-111; P-39 and P-33; `compiler.md` 1-8 and 120-127; `climb-batch-workflow.md` 119 and 250-262.
- **Lookups, Y:** `batch-16-review.md` section 2; the `distance.txt` of batches 34, 35 and 36; batch 36's gate listing and `summary.txt`; `compiler.md`; P-33.

### 5. Walk's departures from the instance rule

| | Decision | Sources |
|---|---|---|
| X | 2 | 1 |
| Y | 1 | 1 |

- **X, decision 2.**
  - (a) is left as row 592, with `APPCOV` and the two tests that would fail.
  - (b) is left, and listed as a decision not taken.
  - (c) is left as D5's default.
  - (d) is the curator's; X prepares the repair but does not land it.
  - It names rows 587, 591, 612 and 616 as the rung's real work, under P-180.

  One error: X says (c) "has no row of its own", but row 613 records it (POSITIVE-VERIFIED, "Open for the curator"). Also, listing (b) for him asks again a question he has already answered (see section 5). The key allows that.
- **X, sources 1.** Rows 592, 589, 612, 591 and 716; the decision record; P-48.
- **Y, decision 1.** All four are right:
  - (a) is left, with `APPCOV`;
  - (b) is left as the curator's decision at way 11 (verified: `CLIMB-BATCH-11.md:60`; `POSITIONS-history.md:1156`, P-132's text, "its questions Q1 to Q4 at their recommendations");
  - (c) goes to him through row 613 (verified);
  - (d) is his.

  But Y misses the defects that give `Bottom` (rows 587, 591 and 612, which P-48 names) as the rung's work. It concludes that "'wherever it departs' meets only held items here".
- **Y, sources 1.** Rows 592, 589, 613 and 555; the decision record; `rung-walk-open-param/REPORT.md`; `CLIMB-BATCH-11.md`; POSITIONS and its history.
- **Lookups, X:** P-48; `ledger:592/589/612/591/716`; `decision-record.md` D3 to D6 and lines 18-31; a grep of POSITIONS; a grep of `inference.tex`; the test listings.
- **Lookups, Y:** P-48; `ledger:592/589/613/555` and `ledger-find`; `decision-record.md` D3 to D6; `rung-walk-open-param` sections 1 and 9; a grep of `CLIMB-BATCH-11.md`; a grep of POSITIONS and its history; the test listing and `InferLoneBoundMentionsParamWalk.fss`.

### 6. An empty sum under walk

| | Decision | Sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.** (a) and (d) work; (b) and (c) do not. X names rows 716 and 705 and makes no change to walk. It treats the question of an expected type as the curator's already, through row 510's note "whether before the switch-over (P-12) is the curator's" (verified). The key points instead to the question on record at `PLAN.md:475` on row 716 (verified). Row 510's held question covers the half that the scenario asks about, so I count it as found.
- **X, sources 1.** Rows 716, 705 and 510.
- **Y, decision 2.** The same, plus writing the static argument as row 716's workaround.
- **Y, sources 1.** Rows 716, 705 and 510; the test listing.
- **Lookups, X:** `ledger:716/705/510`.
- **Lookups, Y:** `ledger:716/705/510`; the test listing.

### 7. A rung on `label` and `exit`

| | Decision | Sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Row 1040 is settled by `label.tex`, so X promotes `XXXExitThroughCatchWalk`.
  - Its fix keeps a late exit catchable for the team's tests `LabelTest.fss:29` and `objectCC_label.fss:184` (verified).
  - Rows 1041 and 1042 are reported as decisions not taken, with F-401's atomic consequence; row 890 is named.
  - X would fix rows 1110 and 1111, and row 890 if the rung has room, under P-180, and says so. P-180 does say that "each rung fixes the open ledger rows that cite the files that it edits and need no decision" (verified).

  X does not find that `PLAN.md:150` (item 100) and review-queue item 562 hold rows 1040 and 890 for the curator.
- **X, sources 1.** The rows, `label.tex:35-80`, the team's tests, `Evaluator.java`.
- **Y, decision 2.** The same three answers. Y cites `try.tex:53` ("forbid clauses are ignored", verified). It finds item 100 (verified at `PLAN.md:150` and `:745`) and reports row 1040's repair against it. It names row 890 and leaves it alone.
- **Y, sources 1.** The rows, `label.tex`, `try.tex`, the team's tests, a grep of `Library/`, PLAN item 100.
- **Lookups, X:** `ledger:1040/1041/1042/890/1110/1111`; a grep of POSITIONS; `label.tex:35-80`; a grep of `LabelException`, `LabelTest.fss` and `objectCC_label.fss`; `Evaluator.java:1445-1465`; the test listings.
- **Lookups, Y:** `ledger:1040/1041/1042/1110/1111/890/81`; `label.tex`; `try.tex:45-58`; the team's tests; a grep of `Library/`; a grep of POSITIONS; PLAN item 100.

### 8. An array of `Number`

| | Decision | Sources |
|---|---|---|
| X | 2 | 1 |
| Y | 1 | 0 |

- **X, decision 2.** Not as worded. X gives the five ways with their costs, among them the text, the bound reduced to `Number` (25 errors) and the ring alone. It quotes the default on record word for word ("the text as it stands, the departure listed for a later text rung") and drafts the question with it.
- **X, sources 1.** One slip: X calls the item "review-queue.md:478" and "item 478". The text it quotes is `PLAN.md:478`, which X also lists; `review-queue.md:478` is another item.
- **Y, decision 1.** Not as worded, and the ways with their costs. But it writes "Default: no default on record for row 729 (PLAN, L.worker.1)", when `PLAN.md:478` gives the default.
- **Y, sources 0.** Y's sources do not include PLAN, so it asserted the default, wrongly, citing a source that says otherwise. It also says the curator "accepted" the bound, but F-151 says only that the bound is the judgement's default.
- **Lookups, X:** `ledger:729`; a grep of POSITIONS (P-28, P-160, P-85, P-87); `array-fork2-judgement.md` ("In short", 2.3, 2.9, 4); `PLAN.md` 118 and 478; `FortressLibrary.fss:3111-3118`.
- **Lookups, Y:** `ledger:729`; `array-fork2-judgement.md` ("In short", 2.3, 2.9, 4, "For Pavol"); a grep of POSITIONS for P-85.

### 9. A rung on row 808

| | Decision | Sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.** X promotes `XXXArray2ShiftedSlice` and puts the fix at `SubArray2.subarray`, `:3083` (verified), in the measured form. It asserts the row's other cases, keeps `VectorMatrixCastsWalk` green and reports the library edit.
- **X, sources 1.** Row 808; `rung-slices-list-equality/REPORT.md:75-77` (verified); the lines of the library.
- **Y, decision 2.** The same. Y also asserts writes through each view.
- **Y, sources 1.** Row 808; the lines of the library; `tests-writing.md`. Its `one_library_tests/` exists.
- **Lookups, X:** `ledger:808`; `ledger.py find --cites`; the test; `FortressLibrary.fss:2940-3010` and `:3059-3110`; the rung report; a grep of `.shift(`.
- **Lookups, Y:** `ledger:808`; `FortressLibrary.fss:3066-3100`; the test; `find --cites`; `tests-writing.md`.

### 10. A proposal to make covariance legal

| | Decision | Sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.** No. P-25, P-62 and P-97; row 404; the example keeps its mark; `covariant` is held to the callout's sentence; nothing goes to the curator.
- **X, sources 1.** P-25, P-97, row 404.
- **Y, decision 2.** The same. Y also finds that the callout is already there and that the example sits in the trait-parameters chapter (`trait-parameters.tex:433-475`, verified).
- **Y, sources 1.** P-25, P-62, P-97, row 404, `trait-parameters.tex`.
- **Lookups, X:** P-25, P-97; `ledger:404`; a grep of `traits.tex`.
- **Lookups, Y:** P-25, P-62, P-97; `ledger:404`; `trait-parameters.tex:420-476`; `traits.tex:355-425`.

### 11. Parallel reductions after the switch-over

| | Decision | Sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.**
  - Reductions over 16 or 4 elements fork nothing, by reading. X adds that `vocabSize` is 27 (verified, `MicroGptFlat.fss:17`), so a reduction over the logits forks once.
  - More threads give no gain at these sizes. X treats the ratios as a Java floor, measured once.
  - First rung: a grain for the matrix product.
  - Baseline: 0.10 and 0.113 ms, with its limits.
- **X, sources 1.** P-175, P-7, row 982, `MicroGptFlat.fss`. Its numbers are the entries'.
- **Y, decision 2.** The same reading, with numbers from section 6 of the baseline report (verified, `java-baseline/REPORT.md:212-224`). Its first step is to measure, then give `mul` a grain. It ties the timing of the grain to review-queue item 523 (verified, `review-queue.md:496`) and the baseline question to item 524.
- **Y, sources 1.** The baseline report, P-175, P-7, PLAN phase 6.
- **Lookups, X:** P-175 and P-7; `ledger:982`; `MicroGptFlat.fss:17`.
- **Lookups, Y:** `MicroGptFlat.fss:17-29` and a grep of `FlatArrays.fss`; `java-baseline/REPORT.md` section 6; P-175 and P-7; PLAN phase 6 (items 523, 524, 500, 501).

### 12. A walk refusal test that passes on the base

| | Decision | Sources |
|---|---|---|
| X | 2 | 1 |
| Y | 2 | 1 |

- **X, decision 2.** The pass comes from an error before the run, matched by the loose key. X rekeys the test to `illegal overload of q`, sees it fail on the base, and records the compiled failure as two `.test` files over `XXXOverloadShapeQ`.
- **X, sources 1.** `tests-writing.md`.
- **Y, decision 2.** The same.
- **Y, sources 1.** `tests-writing.md`.
- **Lookups, X:** `tests-writing.md`, lines 45 and 75-128.
- **Lookups, Y:** `tests-writing.md` ("How `XXX` works", "How a defect is recorded", "The order", "Writing an `XXX` test", "Promoting").

---

## 2. Where one answer scores lower

- **Scenario 5: Y is lower on decision (1 against 2).**
  - **What it lacked:** the rung's real work, the defects that give `Bottom`, rows 587, 591 and 612. Instead it concluded that every departure is held and asked the coordinator what the brief meant.
  - **Where the fact lives:** P-48 ("Rows 587, 591 and 612: three cases in which walk still gives `Bottom`."; `POSITIONS.md`, printed by `$T 'P-48'`). The key's old F-141 also lists the rows.
  - **Cause:** Y's own error with the fact in hand. Its Sources line shows it printed P-48.
- **Scenario 8: Y is lower on decision (1 against 2) and on sources (0 against 1).**
  - **What it lacked:** the default of the question on record: "the text as it stands, the departure listed for a later text rung".
  - **Where the fact lives:** `PLAN.md:478`, L.worker.1 of climb batch 15's rung L.
  - **Cause:** a fact missing from the entries (neither F-229 nor F-151 holds it), which Y then did not find. Y reached row 729, whose notes point to "PLAN, L.worker.1", but did not open PLAN, and wrote "no default on record".
- **Scenario 3: equal scores (1 each), but different gaps.**
  - X lacked the curator's condition, `PLAN.md:130`. Neither entry nor row 641 holds it, so this is a fact missing from the entries that X did not find.
  - Y lacked the shared code. Row 641's notes, which Y printed, name `VarCodeGen`'s classes for locals, top-level variables and fields, so this is Y's own error with the fact in hand.

## 3. Totals

| Reader | Decision (of 24) | Sources (of 12) | Total (of 36) |
|---|---|---|---|
| X | 23 | 12 | 35 |
| Y | 21 | 11 | 32 |

## 4. The quoted entries

I judged these blind: I did not see either copy's text of an entry. Each verdict rests on what an answer shows it had, and on the key's old texts.

- FACTS 99: no.
- FACTS 107: no.
- FACTS 374: yes, for X. Neither the entry nor row 641, which it names, carries the curator's condition, so X planned a later rung that changes the check.
  - The one fact: "PLAN, phase 6 (`PLAN.md:130`), holds any change of row 641's checks until what `atomic` requires of a variable no transaction can reach is understood, and the transactional memory's role is described to the curator."
  - Y's miss of the shared code was not the entry's doing: row 641's notes gave Y the fact, and the old F-374 also says "a change of the transaction's variable code reaches fields with no second edit".
- FACTS 179: no.
- FACTS 240: no.
- FACTS 43: no.
- FACTS 141: no, as far as the answers show. Y missed the `Bottom` rows, but it had them from P-48.
  - If Y's copy of the entry dropped them, the one fact is: "rows 587, 591 and 612, where walk still gives `Bottom`, are the departures from P-48 that no decision holds".
- FACTS 143: no. Neither reader decided worse.
  - No entry says that the curator answered Q1 at way 11 (`CLIMB-BATCH-11.md:60`), so X lists (b) as a question for him. The key does not score that.
- FACTS 228: no.
- FACTS 221: no.
- FACTS 373: no. Neither reader decided worse.
  - The entry does not name item 562 (`PLAN.md:150`). With it, X would not have offered to fix row 890, which that item holds for the curator.
- FACTS 401: no.
- FACTS 229: yes, for Y. The entry gives row 729 as contested but not where its question and default sit.
  - The one fact: "The question is on record at `PLAN.md:478` (L.worker.1 of climb batch 15's rung L), with the default 'the text as it stands, the departure listed for a later text rung'."
- FACTS 151: no.
- FACTS 279: no.
- FACTS 264: no.
- FACTS 166: no.
- FACTS 47: no.
- FACTS 167: no.
- FACTS 350: no. Both readers read the widths from the source and found the 27-wide vocabulary that the entry's list leaves out.
- FACTS 356: no.
- FACTS 355: no.
- FACTS 383: no.
- FACTS 103: no.

## 5. What the key gets wrong or leaves out

1. **Scenario 5 (b).** The key treats the open F-bounded parameter as something a rung built (rung W's way 11), and as "not yet decided" in the decision record. But the curator answered Q1 "yes, way 11" (`CLIMB-BATCH-11.md:60`; P-132's text, `POSITIONS-history.md:1156`: "its questions Q1 to Q4 at their recommendations"). So leaving (b) alone follows his decision, and taking (b) to him asks again a question he has answered.
2. **Scenario 5 (c).** The key calls D5 a rung's default and does not say that row 613 holds it as "Open for the curator (PLAN, 'Climb batch 9, listed for his review', D5's reach)" (`fortress-gap-ledger.md:192`).
3. **Scenario 7, row 1040.** The key says the specification settles row 1040, so the rung decides it. But `PLAN.md:150` (item 100), `PLAN.md:745` and `review-queue.md:725` (item 562) list rows 1040 and 890 among "three answers on `exit` that the record does not settle". Their default is "as landed; the review recommends the specification's reading". A rung that repairs row 1040 should report against item 562.
4. **Scenario 7, rows 1110 and 1111.** The key has them "listed, not touched". It does not weigh P-180 (`POSITIONS.md:32`), under which a rung fixes the open rows that cite the files it edits and need no decision. Both rows cite `Evaluator.java:229-231`, the file the repair of row 1040 edits.
5. **Scenario 11, the first rung.** The key makes the first rung a grain for `mul`, and does not mention that whether `mul` gets a grain now or with the first compiled kernel is review-queue item 523 (`review-queue.md:496`; `PLAN.md:136`).
6. **Scenario 11, the widths.** The key says "a reduction over one of them forks nothing" with the widths 16, 16, 4 and 4. That leaves out `vocabSize` 27 (`MicroGptFlat.fss:17`) and the 64-wide `4 nEmbd` (`:36`). By the same reading, a reduction over 27 or 64 elements splits past the grain of 16.
7. **Scenario 3, walk.** The key says only that walk's transactions are built independently. Walk's `ReferenceCell` looks up the transaction on every `getValue`/`assignValue` (`interpreter/env/ReferenceCell.java:123-184`), so walk has an analogous per-access cost that no one has measured. This leaves the key's conclusion standing.
8. **Scenario 6.** The key's question on record is right (`PLAN.md:475`). Row 510's note, "whether before the switch-over (P-12) is the curator's", is an equivalent source for the half that asks about an expected type; both readers used it.
9. **Scenario 10.** The scenario says "the traits chapter's covariance example". The example and its `revival-covariance` callout are in `Specification/basic/trait-parameters.tex:430-475`. The key does not mention that the callout on `covariant` already exists.
