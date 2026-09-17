<!-- The design for the next ladder climb, written 2026-09-17 by the coordinating session on Pavol's request after the eight-rung climb of the same day cost 8h37m and was measured in `iteration-cost.md`. Revised the same day after an independent worker attacked it (`batched-climb-review.md`, fourteen findings) and after Pavol clarified what his test-first order fixes and what it leaves open. It replaces the per-rung serial loop that `ladder-workflow.js` implements today. Revised again the same day when Pavol asked that the failure-mode question become a standing part of the skeptic's brief rather than a one-off review. Design only: nothing here is implemented, and the one number still open is in section 10. One line per paragraph. -->

# The batched climb

## 1. The problem this solves

The eight-rung climb of 2026-09-17 took 8h37m, every minute of it serial, 36 agents and no two ever overlapping (`iteration-cost.md` section A).

The full gate, `ant testFast` plus `ant testSystem`, is 582 seconds and it ran inside every rung.

The gate saturates the machine: `testFast` is four parallel tracks on four cores and its wall is set by one suite, `OtherCompilerJUTest` at 439.6 s, so two rungs gating at once makes their walls add rather than overlap (`iteration-cost.md` D-T5).

So parallel rungs are worthless while each rung ends in its own gate, and become worthwhile the moment the gate is lifted out of the rung: with it gone, `implement` stops being 76% tool time and what remains is small enough that several rungs fit on the box at once.

The design is that one move. Everything else in this file is the bookkeeping that makes it safe, and most of it was written by having the first draft attacked.

## 2. Batch size and concurrency are different numbers

The workflow harness caps concurrent `agent()` calls at the core count minus two, and `nproc` is 4 here, so **at most two agents run at once** (`batched-climb-review.md` finding 1; read from the harness's documented rule, not yet measured).

That cap governs the width of a scatter, not the size of a batch. A batch of four rungs runs as two waves of two workers and is still gated once.

Therefore batch size k stays 4, chosen for gate amortisation, and the scatter simply takes two waves. The saving that motivates the design is untouched by the cap; what the cap doubles is the scatter's wall.

Before section 9's estimate is trusted, the cap should be measured directly: a throwaway workflow of four trivial agents, with their start timestamps read out of `journal.jsonl` by the same parse `iteration-cost.md` used. That is the one cheap experiment this design still owes.

## 3. The shape

```
        ┌── BATCH PLANNER (1 agent, serial) ──────┐
        │ ladder ranking + ledger rows            │
        │ picks k rungs, writes the manifest      │
        └───────────────┬─────────────────────────┘
                        │ scatter, two at a time
          ┌──────┬──────┴──────┬──────┐
          ▼      ▼             ▼      ▼
        rung A  rung B       rung C  rung D    own worktree, seeded by COPY:
          │      │             │      │        failing test first and OBSERVED
          │      │             │      │        failing, then the edit, rebuild,
          │      │             │      │        its test green, its ladder subset,
          │      │             │      │        and a grep of both corpora for a
          │      │             │      │        competing declaration of each name
          └──────┴──────┬──────┴──────┘        it adds. Record lines to a fragment.
                        │ scatter, two at a time
          ┌──────┬──────┴──────┬──────┐
          ▼      ▼             ▼      ▼
       skeptic skeptic      skeptic skeptic    one rung each: the diff, the
          │      │             │      │        recorded failure, the test, the
          │      │             │      │        subset, plus its OWN walk-vs-
          │      │             │      │        compiled differential. Approve,
          │      │             │      │        or one repair.
          └──────┴──────┬──────┴──────┘
                        │ gather
                        ▼
              MERGE approved rungs on local refs
              apply each rung's record fragment
                        ▼
              MERGED-DIFF REVIEW (1 agent)
              re-checks rules 1-2 against the real hunks
              AND reviews the folded record as a whole
                        ▼
              ONE FULL GATE   ◄── the only 582 s in the batch
                        ▼
         green → k commits, push, fast-forward main
         red   → diagnose and repair on the merged tree (section 7)
```

The skeptics run before the merge, so a refused rung never costs gate time and its repair happens in its own worktree while the other rungs are being judged.

### What each stage does

**Batch planner**, serial, the only stage that is. Reads the ladder ranking and the ledger, picks k names satisfying the rules of section 5, writes one brief per rung and the manifest. It does not edit source.

**Rung worker**, k of them, one worktree each, two at a time. Writes the failing test first into `library_tests/` or `compiler_tests/` per `PLAN.md`, **runs it and records the failure output** before the edit exists. Makes the edit, as small as the test needs. Rebuilds. Runs its test, and the ladder subset for the files its name was blocking, before and after. Greps both corpora for a competing declaration of every name it adds. Writes its record lines to `compile-ladder/<name>/record.md` and its report to `compile-ladder/<name>/REPORT.md`. It never runs the full gate.

**Skeptic**, k of them, one rung each, two at a time. Reads that rung's worktree: the diff, the recorded failure, the test, the subset, the report. Judges whether the claim is true and the record honest. One refusal into a repair in that worktree; a second drops the rung, recorded and not retried. It does not run the full gate and does not see the other rungs.

**The skeptic's required differential.** Not optional, and not satisfied by reading the rung's own test. For every construct the rung touches, the skeptic writes its own small program, runs it under `walk` and under `fortress compile` plus `run`, and compares the answers. This encodes what the climb already showed: four of the 26 items the skeptics raised came from differential probes they invented on their own initiative, and those four were the highest-value findings of the eight rungs (`batched-climb-review.md`). Requiring the best thing the skeptics did spontaneously is the cheapest quality gain in this loop.

**The interpreter is evidence, not an oracle.** Corrected by Pavol on 2026-09-17 against a first version of this clause that treated a disagreement with `walk` as proof the compiler was wrong. It is not. The static checker runs only on the compile path and `walk` turns it off, so the interpreter accepts programs the language does not and reports what would be type errors as run-time dispatch failures (`FACTS.md`, execution model; ledger row 69 on `fortress typecheck` not being an oracle either). 55 ledger rows concern the interpreter and its defects are catalogued, not hypothetical. Either side of a divergence may be the wrong one.

**So a divergence is a question, not a verdict, and the specification answers it.** When `walk` and the compiled run disagree, the skeptic returns to `Specification/` and derives which behaviour the language mandates. Three outcomes, and they are genuinely different: the specification settles it against the compiled run, so the rung is wrong and is repaired; the specification settles it against the interpreter, so the rung may be right and what is owed is a ledger row against the interpreter; or the specification is silent.

**A silent specification is not a reason to stop. It is the reason to think harder.** Pavol's instruction, 2026-09-17. The divergence opens a design pass rather than a halt: review the architecture around the construct, derive the candidate behaviours with what each costs and what else it touches, decide holistically which is right for the language, and execute that one. The reasoning is written down with the rung, because a decision taken under a silent specification is exactly the kind a later reader will need to see argued rather than asserted.

The reserved forks are unchanged and are what still reaches Pavol: if the design pass concludes that the right path is the array representation, the library route, deleting a test, or a deliberate change of semantics against what the specification does say, then that existing fork triggers — not a new one invented here.

**The failure-mode question, asked explicitly.** Where a rung replaces a throwing stub, an error or any other loud failure with a computed value, the skeptic must establish what that value is and run it against the specification by the rule above. This is a separate concern from which side is correct: a loud failure becoming a quiet answer costs diagnosability whoever turns out to be right, because the next person to meet it gets a number instead of a stack trace. It is what rungs 6 and 7 landed — before them a program using an integer literal of bit length exactly 32 or 64 threw, after them it quietly returns the opposite of `walk` (ledger rows 317 and 318, probes `compiler-probes/p37.fss` and `p37a.fss`) — and both recorded it and proceeded.

What the last climb did was neither of the paths above: it recorded the divergence without deriving who was right, and without opening the design pass that a silent specification calls for. Recording is not reporting, and it is not deciding either.

**Gather and gate.** Merge the approved rungs on local refs in manifest order, apply each rung's record fragment into its own commit, run the merged-diff review, then the gate once, with its full output captured to a file and the per-suite summaries grepped from that file, never piped through `tail`, and with `TEST-RESULTS` wiped immediately before the run.

**Commit.** Green means k commits pushed with their records, the branch pushed and main fast-forwarded. An approval that carried required corrections is a checklist this stage must close before it commits.

## 4. The worktree, and the two traps in it

A rung's worktree is seeded by **copying** `ProjectFortress/build` (`cp -a`, about 1 s, 40 MB), never by symlinking it.

A symlink is the trap: `ProjectProperties.FORTRESS_AUTOHOME` is derived through `getCanonicalPath()` (`ProjectProperties.java:35-50`) and nothing sets `fortress.autohome`, so a symlinked build makes `AUTOHOME`, `BASEDIR`, `ROOTDIR` and `CACHES` all resolve to the **main tree**, and the worktree's compiler silently reads and writes the main tree's caches — demonstrated by the main-tree api hashes that appeared in a supposedly private cache (`batched-climb-review.md` finding 2).

The second trap is that a worktree cannot be given a warm analysed cache at all: `NamingCzar.deCaseName` (`compiler/NamingCzar.java:243-245`) names every entry `<ApiName>-<hex of sourcePath.hashCode()>`, so a cache built at one path is unusable at another.

A worktree therefore starts cold and pays a five-component library build before its first rung command: 145 s measured, of which `AnyType` 21, `CompilerBuiltin` 104, `CompilerLibrary` 17, `CompilerAlgebra` 2, `CompilerSystem` 1 (`batched-climb-review.md` finding 2).

This retires the minimal-rebuild idea as a source of much saving: `CompilerBuiltin` is 104 of the 145 seconds, so skipping `AnyType` is worth 21 s and not the 103 that `iteration-cost.md` D3 suggested.

Each worker also gets its own `java.io.tmpdir` and its own ladder root: `experiment/env.sh` unconditionally `rm -rf /tmp/fortress*rats` on every source, which with parallel workers deletes a live Rats! directory belonging to another, and `run-ladder.sh:23` defaults to one fixed shared root whose cache pruning would corrupt parallel runs (`batched-climb-review.md`).

## 5. What makes a batch

Rule 1, disjoint declarations: no two rungs may add or change the same declaration, trait body or operator.

Rule 2, no content dependency: of the eight rungs climbed there were two coupled pairs, not one — rung 2's `HasRank` needs rung 1's `Equality`, and rungs 6 and 7 rewrite the same `IntLiteral` block of `CompilerBuiltin.fss`.

Rule 3, at most one rung per batch may touch `.java` or `.scala`. The reason is not cache clearing, which is per-basedir and cannot cross worktrees (`build.xml:22, 42, 356-360`), but that `compileAll`'s scalac step has no uptodate guard (`build.xml:547-568`), so it is a full rebuild wherever it runs.

Rule 4, k = 4, for gate amortisation; see section 2 on why the agent cap does not set it.

Rules 1 and 2 are checked by the planner against edits that do not exist yet, so they are re-checked after the fact by the merged-diff reviewer against the real hunks. Rung 1 is the model case: it was forced into `library_tests/MaybeTest9.fss`, which no plan predicted.

The merge question is settled and it favours the design: replaying the eight real rungs off a common base gives **0 conflicts in 21 source-file pairs**, including the three rungs that all edit `CompilerLibrary.fss` at lines 506, 87 and 474 (`batched-climb-review.md` finding 3).

## 6. The record files leave the rung worker

`PLAN.md` requires the FACTS line, the ledger note and the handover line in the same commit as the work, and that is exactly what makes parallel rungs conflict: **28 of 28 pairs conflict on `FACTS.md`, 28 of 28 on the handover, 15 of 28 on the ledger** (`batched-climb-review.md` finding 3).

So a rung worker does not edit those three files. It writes its lines to `explorations/compile-ladder/<name>/record.md`, and the gather stage applies each fragment and stages it into that rung's own commit.

The requirement is unchanged — every rung still lands with its record in its own commit. Only the moment of writing moves.

Moving them opens one gap that the gate never covered and the rung's skeptic now cannot: five of the 26 items the climb's skeptics raised were about the record *after* folding — where a line belongs, that rows are never renumbered, that the ledger's own totals were left stale, a stale `PLAN.md`, the handover's consistency across rungs (`batched-climb-review.md`). A rung's skeptic cannot see those files any more, so the merged-diff reviewer is briefed to review the folded record as a whole, not only the source hunks.

A second defect of the current loop, which the batch does not cause and should not inherit: two corrections a skeptic named *inside an approval* were never made — `FACTS.md:84` and `rung3/REPORT.md:51` still read "48 suites" against the skeptic's own count of 47, and `rung7:verify`'s requested ledger sentence about a second literal-wrap mechanism was never written. An approval carrying required corrections must name them as a checklist the commit stage is required to close, the way the `<short hash>` placeholders were closed by follow-up commits.

## 7. Validity, and what it costs

Every rung still writes its test first, and this design makes the discipline checkable rather than assumed: the worker runs the new test **before** the edit exists, records the failure output in its report, then makes the edit, then records the pass. A rung whose report has no recorded failure is refused. This is the part of Pavol's order of 2026-09-17 that is load-bearing (`POSITIONS.md`), together with the rule that the check is permanent: a one-off proof that leaves nothing in the corpus is not an acceptable result.

Whether the suite runs per edit or per landed batch is an engineering choice and per batch is in line with that order, confirmed by Pavol on 2026-09-17.

The skeptic's judgement is unchanged by the batch, and this was measured rather than argued (`batched-climb-review.md`, "What the skeptics actually caught"). Across nine skeptic runs there was one refusal and 26 further named items, and **not one of them was load-bearing on a suite failure** — because the suite never failed: 25 gate runs, zero failures, no `BUILD FAILED` and no `Tests expected to pass are failing!` in any of the 36 transcripts. The one refusal, `rung6:verify`, said in terms that all five of its checks held and refused anyway, on a probe it wrote itself and on what the record did not say. What the skeptics actually stand on is the diff and source reads (8 items), the record (7), probes they invent themselves (4, and these were the climb's highest-value findings), the ladder subset (4) and the rung's report (2). The suite result appears once, as a check on the shape of the output rather than on a failure. So the gate is not a check the skeptic uses; it is one it happened to hold. Moving it later moves a check, not a judgement.

One class of catch did depend on running everything, and it belonged to the *implementer*, not the skeptic: rung 1's first attempt found that `library_tests/MaybeTest9.fss` declares its own `trait Equality`, which only a full run reveals. One occurrence in nine attempts. It is covered without a gate by a step two skeptics invented on their own: grep both corpora for a competing declaration of every name the rung adds. That becomes a required step of the rung worker in section 3 and a required check of its skeptic, and it costs seconds rather than 582.

What the first draft genuinely lost is that nobody read the merged diff, and the merged-diff reviewer in section 3 restores it.

The gate still runs on exactly the tree that is committed, and it now also exercises the k rungs together, an interaction the per-rung loop never tested.

**When the gate is red, diagnose it, do not bisect it.** Corrected by Pavol on 2026-09-17, against a first draft that dropped rungs one at a time in reverse merge order: walking commits backwards does not tell you what broke, and the goal is one tree with everything running, not the largest subset that happens to be green.

So the red gate opens a repair stage on the merged tree, with the same standing as a rung's own repair: read the failing tests, find the cause, fix it there, re-gate. The failing test names what broke, which is the evidence a bisect does not produce.

Dropping a rung is the retreat, not the method: it happens only when the repair stage concludes that a rung's approach is wrong rather than its code, and then that rung is recorded with the reason and returns to the ranking.

`PLAN.md`'s stop condition "a rung's gate red twice after one repair" is restated for the batch, since a rung no longer has its own gate: **a batch still red after one repair stops the climb**, and what is recorded is the failing tests and the diagnosis, not a subset that passed.

## 8. Prompts: one shared prefix

Every agent in a batch opens with the same block, byte-identical and in the same order: the rules, the relevant FACTS lines, the `PLAN.md` edit rule, the batch manifest, the state of the branch, and the exact commands with their expected durations.

Only the tail differs, and it is the one rung's brief.

This removes the roughly 417 tool calls the last climb spent re-deriving the record (`iteration-cost.md` section C), and an identical prefix is what lets parallel agents share a cached one. The first saving is bounded above by about 57 minutes and is a ceiling, not a measurement; see the coordinator's note in `iteration-cost.md` section A.

## 9. What it is expected to buy

Measured, and firm: against the honest baseline of one gate per rung, 8 × 582 s = 77.6 minutes, batches of four cost two gates, 19.4 minutes. **The saving is 58.2 minutes.** The 130.5-minute figure is what the last climb actually spent including redundancy the free fixes remove, and comparing against it would overstate this design's contribution.

Estimate, not measurement: with the gate lifted out, a rung worker's tool time is the 145 s cold seed plus a rebuild, its test and its subset; two run at a time; so eight rungs take four waves of workers and four of skeptics. Coarsely that is a climb of about two hours against 8h37m, and every term in it is an estimate built on measured parts.

Not estimated: what the probe now running removes from the gate itself.

## 10. The one number still open

Whether `ant testSystem` is needed for a batch that touches only compiler-world files.

The worlds are separate on paper — the interpreter loads `FortressLibrary` and `FortressBuiltin`, the compiler loads `CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra` and `CompilerSystem`, with `AnyType` shared (`FACTS.md`, execution model) — and six of the eight rungs touched `Library/` or `LibraryBuiltin/` files.

If the separation is clean, dropping `testSystem` from such a batch is a proof that 382 tests and 147.6 s cannot be affected, not a trade against rigor. If it is not, the pair stays whole. Until the probe answers, the gate is the full pair, which is already the win.

The second half of that question — whether `testFast`'s 417 miscellaneous tests, 49.6 s away from the three big suites, can also be skipped — is not actionable without a `build.xml` change, because that track is not a target of its own (`build.xml:960-991`), and such a change would itself have to be gated.

## 11. What this does not change

The sealed-tree rule, the test-first discipline of section 7, the commit discipline including the record in the same commit, the footer, the push and the fast-forward of main.

The design forks that stop the climb and belong to Pavol: the array representation, the library route, any change of semantics against the spec, deleting a test to get green.

`ladder-workflow.js`, which is not edited until the agent cap of section 2 has been measured.
