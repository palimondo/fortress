<!-- The design for the next ladder climb, written 2026-09-17 by the coordinating session on Pavol's request after the eight-rung climb of the same day cost 8h37m and was measured in `iteration-cost.md`. It replaces the per-rung serial loop that `ladder-workflow.js` implements today. Design only: nothing here is implemented, and the gate policy in section 5 depends on a probe that is still running. One line per paragraph. -->

# The batched climb

## 1. The problem this solves

The eight-rung climb of 2026-09-17 took 8h37m, every minute of it serial, with 36 agents and no two ever overlapping (`iteration-cost.md` section A).

The full gate, `ant testFast` plus `ant testSystem`, is 582 seconds and it ran inside every rung: 130.5 minutes, 25.2% of the climb, of which 41.0 minutes provably produced no information.

Two structural facts follow from the measurements and together they decide the design.

The gate saturates the machine: `testFast` is four parallel tracks on four cores and its wall is set by one suite, `OtherCompilerJUTest` at 439.6 s, so running two rungs' gates at once makes their walls add rather than overlap (`iteration-cost.md` section D-T5).

Therefore parallel rungs are worthless as long as each rung ends in its own gate, and become worthwhile the moment the gate is lifted out of the rung: with the gate removed, `implement` stops being 76% tool time and the remaining work — a cache rebuild, one test, one ladder subset — is small enough that several rungs genuinely fit on the box at once.

The design is that one move: the gate is paid once per batch instead of once per rung, and everything else follows from having made room for it.

## 2. The shape

```
        ┌── BATCH PLANNER (1 agent, serial) ──────┐
        │ ladder ranking + ledger rows            │
        │ picks k rungs and proves independence   │
        │ emits k briefs and the batch's manifest │
        └───────────────┬─────────────────────────┘
                        │ scatter
          ┌──────┬──────┴──────┬──────┐
          ▼      ▼             ▼      ▼
        rung A  rung B       rung C  rung D      one git worktree each:
          │      │             │      │          failing test first, then the
          │      │             │      │          edit, minimal rebuild, its own
          │      │             │      │          test green, its own ladder subset
          └──────┴──────┬──────┴──────┘          NO full gate
                        │ scatter
          ┌──────┬──────┴──────┬──────┐
          ▼      ▼             ▼      ▼
       skeptic skeptic      skeptic skeptic      one per rung, reads that rung's
          │      │             │      │          worktree only: diff, test, subset,
          │      │             │      │          report. Approves, or refuses once
          │      │             │      │          into a repair inside that worktree.
          └──────┴──────┬──────┴──────┘
                        │ gather
                        ▼
                 MERGE the approved rungs onto the work branch
                        ▼
                 ONE FULL GATE   ◄── the only 582 s in the batch
                        ▼
            green → k commits, push, fast-forward main
            red   → bisect by dropping one rung, re-gate
```

The skeptics run before the merge, not after, so a refused rung never costs gate time and a repair happens in its own worktree in parallel with the other rungs' skeptics.

## 3. What makes a batch

A batch is a set of rungs that can be built and judged independently, and the batch planner must prove that before the scatter, not assume it.

Rule 1, disjoint declarations: no two rungs in a batch may add or change the same declaration, the same trait body, or the same operator.

Rule 2, no content dependency: a rung whose declaration refers to another rung's declaration goes in a later batch — of the eight rungs climbed, exactly one pair was so coupled, rung 2's `trait HasRank extends Equality[\HasRank\]` needing rung 1's `Equality` in the prelude.

Rule 3, at most one rung per batch may touch `.java` or `.scala`, because that forces `ant compileAll`, which empties the bytecode cache for every worktree and serialises what the batch exists to parallelise.

Rule 4, size: k is four unless the planner argues otherwise; four is the core count and the point past which the worktrees contend for the same four cores during their rebuilds.

The inputs for all of this already exist and no new ledger is needed: the ladder's first-stop ranking says which missing name blocks how many files, the gap ledger says what each name is, and the conflict check in rules 1 and 2 is textual.

What is new is the batch manifest: the k names, the file each will touch, the evidence each must produce, and the planner's written argument that rules 1 to 3 hold. It is the artifact a reviewer can refuse.

## 4. What each stage does

**Batch planner.** Reads the current ladder ranking and the ledger, picks k names off the top that satisfy rules 1 to 4, and writes one brief per rung plus the manifest. It does not edit source. It is the only serial stage.

**Rung worker** (k in parallel, one worktree each). Writes the failing test first, into `ProjectFortress/library_tests/` or `compiler_tests/` per the rule in `PLAN.md`. Makes the edit, as small as the test needs. Rebuilds only what the edit requires (section 5). Runs its own new test, and the ladder subset for the files its name was blocking, before and after. Commits on its own branch `rung/<name>`. Writes `explorations/compile-ladder/<name>/REPORT.md`. It never runs the full gate.

**Skeptic** (k in parallel, one per rung). Reads that rung's worktree: the diff, the new test, the subset before and after, the report. Judges whether the rung's claim is true and whether the record is honest. It may refuse, once, into a repair inside that worktree; a second refusal drops the rung from the batch and it is recorded, not retried. It does not run the full gate and does not see the other rungs.

**Gather and gate.** The approved rungs' branches are merged onto the work branch locally, in manifest order. The full gate runs once on the merged tree, with its complete output captured to a file and the per-suite summaries grepped from that file — never piped through `tail`, which is what cost 21.7 minutes last time. `TEST-RESULTS` is wiped immediately before the run so the record cannot be mistaken for a stale one.

**Commit.** Green means the k commits are pushed as k commits with their ledger and knowledge-base lines, the branch is pushed and main fast-forwarded. This assembly happens on local refs before any push, so nothing here rewrites published history.

## 5. The gate policy, and the one open question

The gate on the merged tree is the full pair today: `ant testFast` and `ant testSystem`.

Whether `ant testSystem` is needed at all for a batch that touches only compiler-world files is an open question this plan does not answer.

The two worlds are separate on paper — the interpreter loads `FortressLibrary` and `FortressBuiltin`, the compiler loads `CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra` and `CompilerSystem`, with `AnyType` the file both share (`FACTS.md`, execution model) — and six of the eight rungs just climbed touched only compiler-world files.

If that separation is clean, dropping `testSystem` from a compiler-world-only batch is not a trade against rigor but a proof that 382 tests and 147.6 seconds cannot be affected; if it is not clean, the pair stays whole.

The two readings are on record and they disagree: `iteration-cost.md` section D-T1 treats `testSystem` as guarding five of the eight rungs, which assumes the interpreter loads those sources. Settling this is a prerequisite for section 5 and is the follow-up question for the probe now running.

The same question has a smaller second half: `testFast`'s four tracks include 417 tests that run in 49.6 s away from the three big suites, and whether a library-only batch can reach them is decided by the same dependency answer.

Until it is settled the gate is the full pair, which costs 582 s per batch instead of per rung and is already the win.

The minimal rebuild each rung worker performs is likewise deferred to the probe: measured today is five components at 110-162 s against three at 24.6-30.4 s, with the per-component split not yet taken (`iteration-cost.md` section D3).

## 6. How validity is kept

Every rung still adds a failing test before its edit, and that test is in the corpus from then on: the test-first gate of `PLAN.md` is untouched.

Every rung is still judged by a skeptic that did not write it, on the rung's own evidence, with one repair and no more.

The full gate still runs on exactly the tree that is committed, and it is now a stronger check than before, because it exercises the k rungs together — an interaction the per-rung loop never tested until some later rung happened to run.

What the batch gives up is attribution when the gate is red: the failing suite does not name the rung. Two things blunt it. Each rung's own test passed before the merge, so a red gate is an interaction or a regression outside that test rather than a rung failing on its own terms. And the culprit is found by dropping one rung and re-gating, at most k extra gates, paid only when something is actually broken.

A rung dropped this way is recorded with the failure and returns to the ranking; it is not retried inside the same batch.

The stop conditions of `PLAN.md` are unchanged and still stop the whole climb: a design fork, a gate red twice after one repair, disk under 500 MB after sweeping, a permission denial.

## 7. Prompts: one shared prefix

Every agent in a batch opens with the same block, byte-identical and in the same order: the rules, the relevant FACTS lines, the PLAN rule for edits, the batch manifest, the current state of the branch, and the exact commands with their expected durations.

Only the tail differs, and it is the one rung's brief.

This is worth doing twice over. It removes the roughly 417 tool calls the last climb spent re-deriving the record — the gap ledger read 110 times across 32 of 36 agents, `git status` 88 times, `FACTS.md` 71 times (`iteration-cost.md` section C). And an identical prefix is what lets parallel agents share a cached one, which a per-agent prefix assembled by each agent's own reading cannot do.

The saving on the first count is bounded above by about 57 minutes and is not a measurement; see the coordinator's note in `iteration-cost.md` section A on why that slope is a ceiling.

## 8. What this does not change

The sealed-tree rule, the test-first gate, the commit discipline including the knowledge-base line in the same commit, the footer, the push and the fast-forward of main.

The design forks that stop the climb and belong to Pavol: the array representation, the library route, any change of semantics against the spec, deleting a test to get green.

`ladder-workflow.js` itself, which is not edited until this plan has been attacked and revised.

## 9. What it is expected to buy

Measured, and therefore firm: the gate falls from 130.5 minutes over eight rungs to 582 s per batch, which for batches of four is 19.4 minutes over the same eight rungs.

Arithmetic on measured parts, and therefore an estimate rather than a measurement: with the gate lifted out, a rung worker's remaining tool time is a rebuild plus one test plus one subset, and four of them fit the four cores, so a batch of four should cost roughly one rung's old wall rather than four.

Not estimated here at all: what the probe now running may remove from the gate itself, and what the minimal rebuild recipe removes from each rung worker.

## 10. What must be settled before this is built

The dependency question of section 5, from the probe now running.

The minimal rebuild recipe, from the same probe.

Whether merging k rung branches onto the work branch produces conflicts often enough to matter, which is a question about how often two rungs touch the same file even under rule 1, and is unmeasured.
