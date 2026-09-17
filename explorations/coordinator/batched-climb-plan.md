<!-- The design for the next ladder climb, written 2026-09-17 by the coordinating session on Pavol's request after the eight-rung climb of the same day cost 8h37m and was measured in `iteration-cost.md`. Revised the same day after an independent worker attacked it (`batched-climb-review.md`, fourteen findings) and after Pavol clarified what his test-first order fixes and what it leaves open. It replaces the per-rung serial loop that `ladder-workflow.js` implements today. Design only: nothing here is implemented, and one number in section 5 depends on a probe that is still running. One line per paragraph. -->

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
          │      │             │      │        its test green, its ladder subset.
          └──────┴──────┬──────┴──────┘        Record lines go to a fragment file.
                        │ scatter, two at a time
          ┌──────┬──────┴──────┬──────┐
          ▼      ▼             ▼      ▼
       skeptic skeptic      skeptic skeptic    one rung each: the diff, the
          │      │             │      │        recorded failure, the test, the
          │      │             │      │        subset. Approve, or one repair.
          └──────┴──────┬──────┴──────┘
                        │ gather
                        ▼
              MERGE approved rungs on local refs
              apply each rung's record fragment
                        ▼
              MERGED-DIFF REVIEW (1 agent)
              re-checks rules 1-2 against the real hunks
                        ▼
              ONE FULL GATE   ◄── the only 582 s in the batch
                        ▼
         green → k commits, push, fast-forward main
         red   → the drop stage of section 7
```

The skeptics run before the merge, so a refused rung never costs gate time and its repair happens in its own worktree while the other rungs are being judged.

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

## 7. Validity, and what it costs

Every rung still writes its test first, and this design makes the discipline checkable rather than assumed: the worker runs the new test **before** the edit exists, records the failure output in its report, then makes the edit, then records the pass. A rung whose report has no recorded failure is refused. This is the part of Pavol's order of 2026-09-17 that is load-bearing (`POSITIONS.md`), together with the rule that the check is permanent: a one-off proof that leaves nothing in the corpus is not an acceptable result.

Whether the suite runs per edit or per landed batch is an engineering choice and per batch is in line with that order, confirmed by Pavol on 2026-09-17.

Two checks that the first draft lost, and how they come back. Today's skeptic judges a tree that has been gated, because the gate is one of its checks; in the batch it judges an ungated rung, so it is approving on the rung's own recorded failure, test and subset alone. And nobody in the first draft ever read the merged diff. The merged-diff reviewer in section 3 restores the second, and the first is the deliberate trade: the gate moves from before the skeptic to after it, and a rung that passes its own test but breaks the suite is caught by the batch gate rather than by its own.

The gate still runs on exactly the tree that is committed, and it now also exercises the k rungs together, an interaction the per-rung loop never tested.

**The drop stage, when the gate is red.** The failing suite does not name the rung, so: re-gate with the last-merged rung dropped; if still red, drop the next, and so on in reverse merge order. Terminates after at most k gates. If the gate is green only with two or more rungs dropped, those rungs interact and both are recorded as a coupled pair and returned to the ranking, which is the case a single-drop search cannot resolve. A dropped rung is recorded with the failure and is not retried inside the same batch.

`PLAN.md`'s stop condition "a rung's gate red twice after one repair" is restated for the batch, since a rung no longer has its own gate: **a batch red twice after one drop-and-repair cycle stops the climb.** The other stop conditions are unchanged — a design fork, disk under 500 MB after sweeping, a permission denial.

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
