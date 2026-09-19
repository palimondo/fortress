<!-- An independent review of four process decisions proposed for climb batch 2, written 2026-09-19 by a
     reviewer who did not propose them, at the coordinator's request and before Pavol confirms them.
     Read-only: no build, no test, no timing, no git command that changes state; every number below is
     taken from a committed file, a workflow transcript, or arithmetic over one of them, and the source is
     beside it. The four decisions, as given to me:

     1. Skeptic findings become gated assertions: every defect a skeptic measures and the rung repairs gets
        an assertion in the rung's own gated test before the second skeptic runs; a defect deferred to a
        ledger row gets a probe file with a captured output only. Basis: of 22 skeptic-measured defects,
        2 are gated; N's repair round did this in eleven lines.
     2. Script changes for batch 2: (a) each rung as its own chain (worker, skeptic, repair), two chains in
        flight, a third rung starting when a chain ends; (b) the eight free changes of
        repair-batch-review.md section 10; (c) logs: commit a mechanically extracted summary of the
        harness's own summary lines and the small probe captures ledger rows cite, never the full logs.
     3. The gate's thread count stays at one (FORTRESS_THREADS=1 from experiment/env.sh); the script gains
        a non-gating concurrency stage that runs the compiled atomic tests at four threads several times
        and reports. Rejected alternative: raising the gate to four threads.
     4. Two additions to the gate: (a) rewrite the seventeen .test files whose check line is the
        unimplemented run_out_WIcontains key to run_out_contains with the same expected string, one
        testFast run to confirm; (b) a ladder-regression stage that re-runs the files that currently pass
        through fortress compile and run (81 after the eight rungs, 85 after batch 1) after every batch,
        about 192 s, red if one moves down.

     Also on the table: the ordering, these four before the semantic decisions (Maybe's empty case, the
     return types of floor/ceiling), the interpreter defects, and the content of batch 2. -->

# Four process decisions before batch 2, attacked

## The units and the baselines every price below uses

| quantity | value | source |
|---|---|---|
| batch 1: agents, tool calls, agent-minutes, span | 15, 1,110, 285.6, 200.1 min (08:24:09 to 11:44:15) | `FACTS.md:112-113`; re-derived here from the 15 agent transcripts of `wf_3b5a273c-a80` |
| batch 1 gate | 830 s: `compileAll` 31, library rebuild 183, `testFast` 462, `testSystem` 154 | `compile-ladder/climb-batch-1/gate/summary.md` |
| repair batch gate | 739 s: 45 / 144 / 377 / 127 | `compile-ladder/repair-batch/gate/summary.md` |
| cheapest agent on record | the commit agent, 10.4 min for 43 calls; the judge 11.4 min for 36 | batch 1 transcripts |
| model time per tool call | 8.2-9.6 s, an upper bound | `iteration-cost.md` section A; `repair-batch-review.md` section 7 |
| batch 1's record | 286 tracked files, 725,395 bytes in the four rung directories; gate logs 224 KB on disk, untracked | `git ls-files` over `compile-ladder/rung-*`; `git status --ignored` on `climb-batch-1/gate/` |
| the ladder's passing set | 81 files; compile 158 s + run 34 s = 192 s summed per file, one run on a busy host | `compile-ladder/after/ladder.tsv` (phase column) joined to `after/results.tsv` (columns 6, 7); `CLIMB.md:189` on the host |

Batch 1's agent walls, which decision 2(a) is priced on (start, end, minutes, from each `agent-*.jsonl`): `rung:F` 08:24:09-08:38:38, 14.5; `rung:M` 08:24:11-08:41:06, 16.9; `rung:N` 08:38:40-09:20:47, 42.1; `rung:T` 08:41:09-09:22:57, 41.8; `skeptic:F` 09:20:50-09:36:34, 15.7; `skeptic:M` 09:22:59-09:39:19, 16.3; `skeptic:N` 09:36:38-09:53:19, 16.7; `skeptic:T` 09:39:22-09:50:16, 10.9; `judge:N` 09:53:21-10:04:44, 11.4; `repair:N` 10:04:46-10:21:00, 16.2; `skeptic2:N` 10:21:03-10:32:48, 11.8; `gather` 19.6; `review` 14.7; `gate` 26.6; `commit` 10.4.

---

## Decision 1. Skeptic findings become gated assertions

### What it assumes

That the 22-and-2 gap is closable by the rule as worded. It is not: the rule gates only what the rung *repairs*, and the 22 splits as 2 gated + 3 repaired-and-ungated + 17 deferred (`test-discipline.md` section 2, the four rows under "Defects the skeptics found"). The rule as written would have raised the gated count from 2 to at most 5, and to 4 in the gate as it stands, because `SK8Swap` "discriminates only above one thread" (`test-discipline.md`, R1 findings table) and decision 3 keeps the gate at one. The 17 deferred defects get "a probe file with a captured output only", which is exactly their state today (130 probes, none run by any suite, `test-discipline.md` section 2).

That "N's repair round did this in eleven lines" describes the cost. The repair-round commit `5d4bd370d` added 51 lines to `library_tests/IntegralOpsRungN.fss`, 19 of them `assert` lines, plus three recorded-failure captures; the guard itself is 4 changed lines in `37106becf` (`git show --stat` of both, reachable through `origin/wip/rung-integral-ops`). "Eleven" undercounts by about half; the shape of the claim holds.

### What breaks or goes wrong

- **A repaired defect that only discriminates under contention cannot satisfy the rule under decision 3.** `SK8Swap` (R1) is the case on record. Decisions 1 and 3 conflict unless the concurrency stage of decision 3 is where such an assertion lives and that stage gates; as proposed it does not gate, so the assertion would be "gated" in name only.
- **The rule's scope is "a skeptic measures and the rung repairs".** Defects a worker finds and repairs in its own first pass are outside the wording; rung 1's `MaybeTest9` collision and R1's `SK2Closure` (found by a skeptic, repaired, ungated) show both halves happen. The rule should read "measured by anyone in the rung".
- **A gated assertion under a silent specification makes an unmade decision doctrine.** N's `LSHIFT`/`RSHIFT` masking (`rung-integral-ops/JUDGE.md` section 7: "one decision under a silent specification, the worker's") and T's millisecond rendering are now, or would be, pinned by assertions that a later decision of Pavol's must fight through the reserved stop "a renamed or removed declaration a gated test uses" (`CLIMB-BATCH-1.md`, "What may surface"). See Ordering.
- **Where the assertion records which row or decision it pins.** N put it in the assert message (`"0 REM -1"`, `IntegralOpsRungN.fss:144`). `compiler_tests/AtomicTopLevelVar.fss:13-42` instead carries a 30-line provenance comment, which `protocol.md` section 2 forbids in the source tree. Decision 1 multiplies test files; the rule should say the message string is the citation and the comment is not.

### Price over ten batches

| item | per batch | ten batches | basis |
|---|---|---|---|
| agent-minutes | about 0 beyond the repair round that already exists: N's 51-line addition was inside its 16.2-minute repair; a rung approved at once has no repaired defect and no assertion | 0-10 | batch 1 transcripts |
| gate seconds | 0 when appended to the rung's own test (no new JUnit case); +2 cases and about 5-11 s per new test file | 0-60 | `batched-climb-review.md` finding 14 (5.4 s per library test); `iteration-cost.md` section B |
| repository | one assertion block, about 50 lines / 2 KB, per repaired defect; batch 1 had one | about 20-40 KB | `5d4bd370d` |
| tool calls | the test-first cycle re-run in the repair round: capture, edit, capture; N did it in its 66 calls | 0-50 | `repair:N`, 66 calls |

### Proves or feels

It changes what the gate proves, by a little: each repaired defect becomes a permanent check instead of a FACTS line (`SK2Closure`, `SK16LocalString` today are "recorded only in a FACTS line", `test-discipline.md` section 2). It does not touch the 17 deferred ones, which is where the 22-and-2 framing points.

### The stronger alternative, and its cost

**The harness already has a gated expected-failure convention, and the compiler corpus uses it 224 times.** A `.test` whose name starts with `XXX` is expected to fail: `FileTests.java:922` (`shouldFail = s.startsWith("XXX")`), `:577` and `:644` (`if (shouldFail != failed)` is the failure condition, so an `XXX` test that *passes* fails the suite), `:841` ("XXX tests that succeed"). `compiler_tests/` holds 224 `XXX*.test` files today, swept by `CompilerJUTest` into `testFast` (`test-discipline.md` section 5); `parser_tests/` 40 more; `tests/` 55 `XXX*.fss` under the interpreter suite's own handling (`FileTests.java:336`). So a deferred, specification-settled defect can be a gated test *now*: `XXX<Name>.fss` asserting the specification's answer, failing today as expected, and turning the gate red the day anyone fixes the defect without closing the row. That is a permanent net over the 17, at one `.fss` + `.test` and about 5-11 s of gate each, with no harness change. Caveat from the harness's own author: `FileTests.java:843`, "WARNING: expect_failure is not treated consistently" — the first such file should be shown to go red on a deliberate fix before the convention is relied on. For interpreter-side rows (323, 334, 336-338) the `tests/` corpus has the same convention by name.

The rule as proposed, plus this, closes the gap the basis names; the rule alone closes about a seventh of it.

### Verdict

**Adopt with two named changes**: (i) scope "measured by anyone, repaired in the rung"; (ii) a deferred defect that the specification settles gets an `XXX`-named gated test asserting the specification's answer, not a probe capture only; a defect under a silent specification, or one the gate cannot discriminate at its thread count, is the only kind that stays a probe, and the record says which of the two it is. The assertion's message string carries the row number.

### Factual basis checked

22 and 2: verified as `test-discipline.md` counts them (section 2), with its own qualifications — R1's finding 3 is a fact about the gate, F's third and M's fifth are pre-existing limits; 19 are code defects. "Eleven lines": 19 assert lines and 51 added lines in `5d4bd370d`, 4 changed source lines in `37106becf`.

---

## Decision 2. Script changes for batch 2

### 2(a). One chain per rung, two chains in flight

**What it assumes.** That the 42-minute gap between `rung:F`'s end and `skeptic:F`'s start cost wall clock, and that a refusal's repair would overlap the remaining rungs. Both are checkable from batch 1's own agent walls, and both come out false for this batch.

**The gap is real; the wall cost is not.** With two slots, the scatter's wall is set by the sum of agent-minutes (214.3 across the four chains) and by the longest chain (N: 98.2 minutes serial once refused), not by who gets a freed slot first. Replaying batch 1's eleven scatter agents under each policy:

| policy | scatter wall | how computed |
|---|---|---|
| measured, batch 1 (freed slot to the next queued worker) | **128.7 min** | journal: 08:24:09 to `skeptic2:N`'s end 10:32:48 |
| proposal 2(a): two chains, manifest order F, M, N, T | **128.4 min** | F ends 30.2, M 33.2; N starts 30.2 and runs 42.1+16.7+11.4+16.2+11.8 = 98.2, ends 128.4; T starts 33.2, ends 85.9 |
| freed slot to a pending skeptic first, else the next worker | 128.4 min | skeptics F, M take the slots at 14.5 and 16.9; N starts 30.2 again |
| longest chain first (N, T, then F, M) | 116.1 min | N 0-98.2; T 0-52.7; F 52.7-82.9; M 82.9-116.1 — needs foreknowledge of the refusal |
| lower bound, 214.3 agent-minutes over two slots | 107.2 min | arithmetic |

So 2(a) saves 0.3 minutes on batch 1's numbers. Chains start rung 3 later by exactly the skeptic's length they bring forward, and the refused chain is the long pole either way; in batch 1's shape N's judge-repair-skeptic (89.0-128.4 under 2(a)) overlaps nothing, because T's chain ends at 85.9. The 110.9 single-agent minutes that `FACTS.md:113` reports are 39.4 in the scatter (`judge:N` through `skeptic2:N`) and 71.4 in the serial tail (gather 19.6, review 14.7, gate 26.6, commit 10.4), and no scatter policy touches the tail. Under 2(a) the single-agent scatter window is 42.5 minutes, not smaller.

**What breaks.** The script that ran batch 1 clean is rewritten around a hand-rolled chain pool for no measured gain, against `protocol.md` section 6, "one variable per step". The `pipeline` helper's scheduling is the harness's; the FIFO reading rests on the observed order and on a second-hand quotation of the reference (`batched-climb-review.md:9`); the reference text itself is not in the tree. I could not read the helper to know whether a chain pool is expressible without losing the resume behaviour the harness gives `pipeline`.

**What buys time in the same place.** The serial tail is 71.4 of 200.1 minutes. The review (14.7 min) reads the merged diff and the record and never runs the build; the gate (26.6 min, of which 830 s is `ant`) never reads the record. They can overlap: start the gate when the gather returns and run the review beside it; when the review's fixes touch only `explorations/` (both landed reviews did: 9 fixes in the repair batch, 6 in batch 1, all record), the gate's result stands; when the review returns a blocking source finding, the gate's 26.6 minutes are discarded and the judge rules as now. Saving: 14.7 min per batch, 147 over ten, against one wasted gate per blocking review (none in two batches). Named risk: two agents committing in the main tree at once — the gate stage must not commit until the review has (its `summary.md` commit moves to after the review's), and each retries on `index.lock`. Second, free: order `RUNGS` by expected worker length, longest first (N and T were the pure-Fortress rungs and took 42 minutes each; F, the `.java` rung, took 14.5); that is where the 12 minutes of the longest-first row come from, when the guess is right.

**Verdict on 2(a): reject as priced.** Take the two substitutes: gate beside review (14.7 min per batch) and longest-first manifest order (0-12 min, free).

### 2(b). The eight free changes of `repair-batch-review.md` section 10

**What it assumes.** That none of the eight is already in the batch-1 script. Checked against `climb-batch-workflow.js`: none is. `SKEPTIC_SCHEMA` has no `recommendedRows` (1); `PREFIX` rule 3 has no "cite the passage, not the grep hit" (2); `GATE_ROLE` still writes `.out` (3) and still greps "Tests expected to pass are failing" (4); the gather applies in manifest order, not by lowest edited line (5); rule 2 has no "count the sites" (6); no poll helper (7); the provenance block has four lines and no `historical:` (8).

**Batch 1 re-demonstrated two of the eight.** (1): M's skeptic found a codegen defect it called new — `filter` on `Maybe` dies with `AbstractMethodError`, narrowed by `SkArrowSubtype` to any closure whose declared return type is a supertype of its body's type (`rung-maybe/SKEPTIC.md:136-138`). It is in no ledger row, no FACTS line, no handover sentence and not among the skeptic's required corrections (`grep` over `rung-maybe/record.md`, `REPORT.md`, `FACTS.md`, `FACTS-history.md`, the handover, the ledger: 0 hits). A codegen defect found by a differential probe was lost at the gather, which is the failure mode (1) closes. (3): the four batch-1 gate logs are on disk and untracked (`git status --ignored`), and `gate/summary.md` says so; decision 2(c) supersedes the rename.

**Price.** A one-time script edit; per batch, (1) adds one gather step of a few calls, (5) removes re-anchoring work the review did (6 of its 20.2 minutes in the repair batch, `repair-batch-review.md` section 9 item 5), the rest are prompt text. (8) is what decision 4(a) needs, since 4(a) edits eight files of the 2012 tree.

**Verdict: adopt all eight, with (3) replaced by 2(c).**

### 2(c). What of the gate's output is committed

**What it assumes.** That the full logs have a reader after landing. They do not: a red gate never lands, and the judge reads the failing tests live under `ProjectFortress/TEST-RESULTS/` (`judgeRole`, kind `gate`); after a green gate the only claims anyone has checked against the logs are the per-suite counts (`rung3`'s "48 suites" against 47, `batched-climb-review.md` section 2; the 1,377 to 1,409 arithmetic of `test-discipline.md` section 5).

**Measured sizes.** Full logs: 224 KB (batch 1), 348 KB (repair batch, whose `compileAll.out` was a full scalac run); 2.2-3.5 MB over ten batches. The harness's own summary lines: 47 `Tests run:` lines in `testFast.out`, each preceded by its `Running <suite>` line, and 4 in `testSystem.out` (`grep -c` on the batch-1 logs); about 5 KB per batch, 50 KB over ten. Against that, the rung directories are the real growth — 725 KB and 286 files for batch 1, so about 7 MB and 2,900 files over ten batches — and 2(c) leaves them as they are, correctly: they are the record.

**What breaks.** Nothing, if the summary is extracted by a fixed command rather than written by the agent: `summary.md` exists today and is agent prose (4.8 KB and 6.9 KB), which is how a suite count comes out wrong. And the "small probe captures that ledger rows cite" clause is not a mechanism: batch 1's four untracked captures were found by the relaunch's verification pass, not by any stage (`FACTS.md:112`). See Missing, item 4.

**The stronger use of the same 5 KB.** Commit the per-suite table as a file with a fixed shape (`suite<TAB>run<TAB>failures<TAB>errors`) and have the gate stage diff it against the last landed one. That makes the table a baseline, and gives the gate the check `rung1:verify` did once by hand and nothing does now: a suite whose count *fell* is red unless the manifest names the removal. Cost: about ten lines of shell, no gate seconds.

**Verdict: adopt, with the table made mechanical and diffed.** Never commit the full logs; a red gate's evidence lives in the judge's ruling.

---

## Decision 3. The gate stays at one thread; a non-gating concurrency stage

### What it assumes

That "one thread" is a property of the gate. It is a property of the shell. `fastTrack` sets `FORTRESS_CACHES` and no thread count and no `newenvironment` (`build.xml:927-953`), the forked JVM and the per-test subprocess inherit the environment (`FileTests.java:482-486`), `getNumThreads` reads `FORTRESS_THREADS` and otherwise takes `floor(n/2)` (`FortressExecutable.java:37-44`), and the `1` comes from `experiment/env.sh:6`. The interpreter shards are pinned in the build file itself (`build.xml:1184`), and that pin is the revival's — `git blame` gives `64f698a1f`, 2026-08-23, with the comment "stops four interpreter runtimes from oversubscribing the CPUs" (`build.xml:1165-1166`): a throughput choice, not the 2012 team's. The 2012 team ran the suites at the default, `floor(n/2)`, which is why `tests/seqLoop.fss:21` says "This test always succeeds if you set FORTRESS_THREADS=1" and `Spawn1-6.fss` exist at all. So "stays at one" keeps a revival-era convenience as the semantic gate on both corpora, and a gate run from any shell that has not sourced `env.sh` — CI, which `modernization-plan.md` puts early, or Pavol's machine — runs `compiler_tests` at a different count and proves something else.

That the rejected alternative was measured. It was priced once, as a speed question: `iteration-cost.md` D-T2, "the expected gain is near zero" and "cost: nondeterminism", with the caveat that no run in the climb used any other count. No `testFast` at `FORTRESS_THREADS=4` or unset is on record anywhere (`grep` over the R1 reports and the coordinator directory). The nondeterminism is a fear, not a measurement, and `protocol.md` section 6 says closed decisions are not revisited — so it should be measured once before it is closed: one `testFast` with the variable unset, 462 s.

That a non-gating stage that "reports" has a consumer. Nothing in the script acts on a report; a stage whose red changes nothing is the pattern `test-discipline.md` section 4(a) names as the forbidden one, run every batch instead of once.

### What breaks

**The intermittency argument is backwards.** A lost update at four threads is never a false positive: a correct transaction runtime cannot lose one, and the runtime retries a conflict with backoff rather than giving up (`BaseTask.java:219-229`; no give-up path in that file). What is intermittent is the *pass* — a broken tree sometimes passes, which is the same blindness the one-thread gate has always. So gating on "any FAIL or timeout in N runs at four threads is red" adds no nondeterminism to a green gate; it removes some from a red one. The base-tree measurement makes the detection rate concrete: `AtomicTopLevelVar` at four threads on `49ee5e91` failed both times it was run (37,826 and 34,104 of 40,000; `skeptic-basetree.txt:16`, row 59's append in `repair-r1-atomic-static/record.md:33`), so three runs is plenty.

**The corpus is already known green at four threads.** R1 ran the ten programs `other_compiler_tests/atomicTest.test` names plus its own three at one and at four threads, 22 of 22 PASS (`repair-r1-atomic-static/REPORT.md:151,234`). That is the baseline the stage starts from.

**The skeptic side is untouched by this decision.** Every batch-1 skeptic ran its differentials at one thread — no `SKEPTIC.md` of batch 1 mentions a thread count (`grep -il thread` over `compile-ladder/*/SKEPTIC.md` matches only R1's) — including T's, the first library use of the transactional cell around `atomic` blocks, whose probe `SkepticAtomic` writes the new top-level variable inside a transaction (`rung-timing/SKEPTIC.md:52-66`) and was never run above one. See Missing, item 2.

### Price over ten batches

| form | per batch | ten batches | basis |
|---|---|---|---|
| folded into the gate agent as a sixth step: compile the 13 programs (`atomicTest.test`'s ten + R1's three) into a private cache, run each three times at four threads, grep FAIL | about 2-3 min tool time (compiles about 2 s each and runs under 5 s each from `after/results.tsv`'s per-file times), about 10 calls, so about 4 min | about 40 agent-minutes, 0 gate seconds, one 13-line result file per batch (about 1 KB) | `results.tsv` columns 6-7; the gate agent's 29 calls |
| as a separate stage | at least the commit agent's floor, 10.4 min and 43 calls | about 100 agent-minutes | batch 1 transcripts |
| the pin moved into `fastTrack` (`<env key="FORTRESS_THREADS" value="1"/>` beside `:1184`'s) | one `build.xml` edit, one gate, 830 s, once | 0 per batch | `build.xml:927-953` |
| the alternative measured before it is closed | one `testFast` with the variable unset, 462 s, once | 0 per batch | `climb-batch-1/gate/summary.md` |

### Proves or feels

As proposed it changes nothing the gate proves: the gate stays vacuous on contention and the stage's report has no consumer. Gated, it proves "no lost update in three runs at four threads over the fourteen compiled `atomic` programs", which is what R1's own record says it could not prove (`record.md:61-63`).

### Verdict

**Adopt the one-thread gate; reject "non-gating"; add two conditions.** (i) The stage is gating: a `FAIL` or a timeout in any of three runs at four threads is red and goes to the judge's `gate` path. (ii) The pin is written where the gate is defined — `fastTrack` — so the gate means the same thing from any shell, and `env.sh`'s line becomes a convenience rather than the definition. Measure `testFast` once at the default count before "raising the gate" is recorded as rejected.

### Factual basis checked

Vacuity at one thread: `skeptic-basetree.txt:15-16`, `AtomicTopLevelVar THREADS=1 :: PASS`, `THREADS=4 :: FAIL: counter = 34104 expected 40000`, on the unrepaired base. The inheritance chain: as `FACTS.md:92` states it, re-read at `build.xml:927-953`, `FileTests.java:482-486`, `FortressExecutable.java:37-44`, `env.sh:6`. The interpreter pin's provenance: `git blame -L 1180,1190 build.xml`.

---

## Decision 4. Two additions to the gate

### 4(a). Rewrite the seventeen `run_out_WIcontains` lines

**What it assumes.** That the rewrite is semantically neutral. Verified: all 17 lines read exactly `run_out_WIcontains=PASS` (`grep -rn WIcontains --include=*.test`), and every program the 17 `tests=` lines name — 47 `.fss` files across `compiler_tests`, `library_tests`, `other_compiler_tests` — prints an uppercase `PASS` and none prints only a lowercase `pass` (`grep` per file), so the default check (`FileTests.java:266-272`, "pass" or "PASS") and `run_out_contains=PASS` accept the same outputs. The gate proves exactly what it proves now.

**What it gets wrong in the record.** `test-discipline.md` section 4(c) option 2 says "Fifteen of the seventeen are files the revival did not write"; the same section's opening line and my grep say 8 pre-existing (`Boolean`, `Comparison`, `Integer`, `MaybeGetter`, `Compiled12.mini`, `Afm`, `Go`, `Gt`, all last touched 2026-08-23 in the migration import) and 9 from the campaigns. It is eight, not fifteen.

**What breaks.** Eight files of the 2012 tree are edited for hygiene, which `CLAUDE.md`'s layout rule says not to do casually and `protocol.md:97` says to flag at commit time — the `historical:` line of 2(b) item 8. And the edit fixes the 17 lines and not the cause: `library_tests/Boolean.test` stays the file `PLAN.md` names as the format to copy, and a copied line would be inert again unless the copy is of the rewritten file.

**The alternative at the same cost.** Implement the key: one clause beside `_contains` at `FileTests.java:147` — `_WIcontains`, whitespace-collapsed `contains`, the shape `_WImatches` already uses at `:171-178` — about eight lines. Cost: `compileAll` 45 s plus the gate, once; it edits the harness, not the eight corpus files, makes the 17 lines mean what the 2012 team wrote, and makes any future copy of `Boolean.test` real. Both options cost one gate and about ten agent-minutes; neither changes a test's outcome today.

**Verdict: adopt, choosing the harness clause over the seventeen edits**, or, if the rewrite is preferred, with the `historical:` flag on the eight. Either way one `testFast` (462 s) confirms; nothing changes in what the gate proves.

### 4(b). A ladder-regression stage in the gate

**What it assumes, and what is verified.** The 192 s: verified exactly — the 81 files at phase `pass` in `after/ladder.tsv` sum to 158 s of compile and 34 s of run in `after/results.tsv`. The 81: verified (`CLIMB.md:48`; `after/summary.txt`, 78 + 3). The 85: **not measured as a set.** It is the four rungs' subset claims added to 81 (T's three `nestedTransactions` files and N's `chain0`, `rung-timing/record.md:13`, `rung-integral-ops/record.md:37`), and the handover says "subject to a full re-run"; the last full run committed is `after/` from 2026-09-17 (`git log` on `after/ladder.tsv`). So batch 2's baseline does not exist yet.

**The 192 s is not the stage's cost.** It is the summed per-file wall of one run on a busy host (`CLIMB.md:189`), and it excludes the driver's private library build, which every ladder run pays: 145 s cold in a new tree (`batched-climb-review.md` finding 2), 144 and 183 s in the two gates. So about 340-375 s as the drivers stand. The library the gate just built into `default_repository/caches` is the one the stage needs, and the analysed cache is keyed by the source file's absolute path (`NamingCzar.java:243-245`, finding 2), which is the same path in the same tree — so copying that directory to the driver's private root (14 MB, about 1 s) instead of rebuilding should give a warm, pristine library cache and bring the stage to about 200 s. That inference is not verified here; one run verifies it.

**What "red if one moves down" proves, and what it misses.** The ladder's `pass` is exit 0 and no `fail`/`FAIL` in stdout (`after/classify.py:115-124`); it does not compare outputs, and `CLIMB.md:191` says so. A passing program whose answer changed is invisible. The passing set is deterministic enough to diff: none of the 81 files names `nanoTime`, `random` or `recordTime` (`grep -l` over the 81 paths), and of the four new ones only the three `nestedTransactions` print a timing line (`Operation took Nms`) while `chain0` prints `PASS` five times. The 81 compiled outputs are already committed (`after/raw/tests/*.run`). So at the same 200 s the stage can assert "stdout unchanged, timing lines filtered", which is a real regression net, against "still exits 0", which is a weak one. And a file that moves down *between* non-pass phases — `typecheck` to `disambiguate` — is a regression the 85-file subset never sees; only the full ladder (734 s of program time plus the library) sees it, and it also finds the new passes the record now claims from subsets.

**What breaks.**
- A red ladder has no judge path: `judgeRole`'s `gate` question reads `TEST-RESULTS`, not `raw/`. One clause.
- The record already holds one instance of the class the stage catches, and it was caught by a worker's subset by luck of overlap: R1's 20-file subset found `tests/InitOrderWithMutable.fss` dying with `NoSuchFieldError` on the landed tree, which no gated test saw (`repair-batch-review.md` section 9, "What is not waste"). That is the evidence for the stage; the eight-rung climb's own re-run found nothing moving down (`CLIMB.md:116`).
- **The stage enshrines the phase table as it stands, and with it the semantic choices the table rests on.** See Ordering: a batch that changes `floor`'s return type or `Nothing`'s spelling will move files, and "red" makes that batch a repair or a stop by construction unless the manifest can declare expected moves.
- Two named files are at the wrong phase for the stage to help: `buffons.fss` and `roundBug.fss` are at `typecheck` after F, not `pass` (`rung-rr64-functions/ladder-after/results.tsv`, rc 255; `REPORT.md:138`), so the stage would not notice a regression on the functions F added until some file passes on them.

**Price over ten batches.**

| item | per batch | ten batches | basis |
|---|---|---|---|
| tool time, as the drivers stand | about 340-375 s | about 60 min | 192 s + library 145-183 s |
| tool time, cache copied from the gate's | about 200 s | about 33 min | inference above, one run to verify |
| agent cost, folded into the gate agent | about 5 polls and a diff, about 3-5 min | 30-50 agent-minutes | the gate agent's 29 calls |
| baseline, once | one full ladder run, 734 s + library, and the 85-file list committed | once | `after/` |
| repository | one 85-line tsv (about 5 KB) and, if outputs are pinned, only the diffs | about 50 KB | `after/ladder.tsv` is 43 KB for 410 rows |

**Verdict: adopt with five named changes.** (i) The baseline is measured, not claimed: a full ladder run on `main` before batch 2, its pass list committed as the stage's input; (ii) the driver copies the gate's library cache and rebuilds only if the sanity program fails; (iii) the criterion is output equality with a per-file line filter, not phase alone; (iv) the manifest carries an "expected moves" list that a rung's tail declares, so a semantic change is red only when it moves a file it did not declare; (v) a judge clause for a red ladder. Run the full ladder off the critical path every few batches to catch moves between non-pass phases and to measure the pass count the record quotes.

---

## Missing: process defects the record shows that none of the four addresses

| # | defect, with the evidence | fix and its cost |
|---|---|---|
| 1 | **No count-monotonicity check.** Green is "zero failures and zero errors" (`GATE_ROLE` step 5); a `.test` file that goes missing or a `tests=` line that breaks makes its tests vanish silently, because the `.test` file is the whole enumeration (`FileTests.java:936-963`; 121 dark `.fss` show how invisible a file is, `test-discipline.md` section 4(c)). `rung1:verify` checked no suite shrank, once, by hand (`batched-climb-review.md` section 2); nothing does since. | The per-suite table of 2(c), diffed against the last landed one; a count below the last is red unless the manifest names the removal. Ten lines, no gate seconds. |
| 2 | **Skeptic differentials run at one thread by construction.** Every brief sources `env.sh`, which pins the count; only R1's skeptic varied it, on its own initiative; batch 1's four ran everything at one, including T's `SkepticAtomic`, the first library write to the transactional cell from inside a transaction (`rung-timing/SKEPTIC.md:52-66`; `grep -il thread compile-ladder/*/SKEPTIC.md`). Decision 3 covers the gate and not the skeptic. | One sentence in `skepticRole`: a rung whose diff touches a mutable variable, a field, `atomic`, or `CompilerLibrary`'s state runs each differential at `FORTRESS_THREADS=1` and `=4`. Doubles the probe runs for such rungs, about 5-10 min tool time when it applies. |
| 3 | **A dropped or stopped rung's findings never reach `main`.** `gatherRole(approved)` folds approved rungs only; a dropped rung's `SKEPTIC.md`, its probes and the rows its `record.md` proposes stay on a `wip/` branch that Pavol deletes in the GitHub UI (`commitRole` step 4). Not yet exercised — no drop so far — but the skeptic's findings are about the tree, not the rung. | The gather folds the skeptic's rows and the rung's directory for a dropped rung too, under a "dropped" heading, with no source applied. A few lines. |
| 4 | **Nothing checks that a cited path is tracked.** `.gitignore:42,46` swallow `*.log` and `*.out`; batch 1's four untracked captures, cited by rows 329 and 330, were found by the relaunch's verification pass (`FACTS.md:112`), the repair batch's by a skeptic correction (`test-discipline.md` section 1b, correction 1). 2(c) covers the gate logs, not the rung captures. | A gather step: every `probes/`, `raw/`, `extra-*/` path named in `REPORT.md`, `SKEPTIC.md`, `JUDGE.md`, `record.md` and the new ledger rows is checked with `git ls-files --error-unmatch`; a miss fails the gather. About fifteen lines, seconds. |
| 5 | **The measuring stick is never measured.** Pavol's stick is one program, microGPT compiled to bytecode (`POSITIONS.md`, 2026-09-16); neither `explorations/apl/mg/MicroGptApl.fss` nor `run-c4/src/MicroGptFlat.fss` is compiled by any stage, and PLAN step 7 waits on them. A batch that moves their phase down is invisible; one that moves it up is the batch's real result and goes unrecorded. | Two `fortress compile` calls in the regression stage, phase and first error written to a tracked two-line file, a downward move red. About 10-20 s. |
| 6 | **Findings without a required-correction home are lost** — the recurrence in batch 1 of what 2(b) item 1 closes (M's closure/codegen `AbstractMethodError`, above). Listed here because 2(b) is a list of eight that may be adopted in part. | 2(b) item 1. |
| 7 | **Provenance prose in test sources.** `compiler_tests/AtomicTopLevelVar.fss:13-42` carries a 30-line comment on the gate's thread count; `protocol.md` section 2 forbids provenance commentary in the source tree, and decision 1 multiplies test files. | One line in `RUNG_ROLE` step 1: the assert message is the citation; the comment is not. |

---

## Ordering: what must precede batch 2's process changes

Two of the four decisions turn today's provisional semantics into fixtures a later reversal must fight.

- **Row 331, the spelling of `Maybe`'s empty case**, was decided by rung M's worker under rule 4 (`rung-maybe/record.md:14,26`) and waits on Pavol. It is already pinned by a gated test — `library_tests/MaybeRungM.fss:26,30,34` asserts the coerced non-parametric `Nothing` — and reversing it means editing a gated test's assertions and a declared type the prelude already has, both of which `CLIMB-BATCH-1.md` names as reserved stops. Decision 1 makes every repaired divergence another such assertion; decision 4(b) makes every file that moved on the spelling part of a red-on-move baseline. Batch 2's likeliest content builds on it: `candidates.md:91` puts `Maybe` in 59 of the 139 disambiguate files and the handover calls it "the prerequisite of every collection rung". After one more batch under decisions 1 and 4(b), reversing 331 is not a rung but a fork with a growing bill.
- **Row 330, the return types of `floor` and `ceiling`**, same shape: `library_tests/RR64FunctionsRungF.fss:82-89` asserts they "stay in RR64" against `numbers.tex:457-462`, which returns an integer; the compiler prelude's brackets would change with them. Today no ladder file passes on them (`buffons`, `roundBug` at `typecheck`), so 4(b) does not yet pin it; decision 1 does, through F's test.
- **Row 321, the `asString` rendering**, is different: the gated test that guards its crash deliberately declares no `asString` (`repair-r1-atomic-static/record.md:25`), so nothing gated pins a rendering, and it can wait.
- **The interpreter defects** (323, 334, 336-338) are pinned by nothing the four decisions add, unless 4(b) takes the output-diff form, which compares compiled output to compiled output and is unaffected. They can wait.

So the objection: **decide 331 and 330 before batch 2, or, in the same manifest that adopts decisions 1 and 4(b), name the tests and ladder files that encode provisional semantics so that the reserved stop and the red-on-move rule do not apply to them.** The first is a decision Pavol already owns; the second is one line per test. Adopting 1 and 4(b) without either enshrines two worker decisions taken under a silent or contested specification, which is the outcome `POSITIONS.md` names — "a decision made inside a worker's report and recorded in one line is a decision not made" — turned into a gate.

Decision 3 is itself a semantic decision about the gate and belongs where it is, first. Decisions 2 and 4(a) enshrine nothing and can go in any order.

## Factual claims found wrong or unverifiable, in one place

| claim | status |
|---|---|
| "N's repair round did this in eleven lines" | undercount: 19 assert lines, 51 added lines (`5d4bd370d`), 4 source lines (`37106becf`) |
| the 42-minute gap cost wall clock; a refusal's repair would overlap the remaining rungs | the gap is real (42:12); on batch 1's walls, 2(a) saves 0.3 min and the repair overlaps nothing; 71.4 of the 110.9 single-agent minutes are the serial tail |
| the harness hands a freed slot to the earliest-queued agent (FIFO) | consistent with the observed order; the reference is quoted second-hand (`batched-climb-review.md:9`) and is not in the tree; the `pipeline` helper's own semantics would give the same order |
| 192 s for the passing files | exact; but it is per-file wall on a busy host and excludes the driver's 145-183 s library build |
| 85 passes after batch 1 | not measured as a set; four subset claims on top of 81; the record says "subject to a full re-run" |
| seventeen files | verified; `test-discipline.md` section 4(c) option 2's "fifteen of the seventeen" pre-existing is wrong, it is eight |
| the contention test is vacuous at one thread | verified, `skeptic-basetree.txt:15-16` |
| raising the gate to four threads is rejected | on an unmeasured cost; no suite has been run above one thread on record |
| the 22-and-2 count | verified as counted; 19 are code defects, 5 were repaired, 17 deferred — the rule reaches the 5 |
