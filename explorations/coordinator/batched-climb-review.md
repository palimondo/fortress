<!-- An attack on explorations/coordinator/batched-climb-plan.md, asked for by the coordinating session on 2026-09-17: read the plan, verify every claim in it against the repository, and report where it does not work, costs more than it says, or gives up a check it says it keeps. Written by a worker that did not write the plan. Findings most serious first; each carries what the plan claims, what is true with its evidence, how bad it is, and the smallest fix. Nothing here is committed and the plan was not edited. One line per paragraph. -->

# Attack on the batched climb

## Finding 1: k=4 is above the workflow harness's own concurrency cap, which is 2 on this box

The plan's rule 4 sets k at four "because four is the core count", and section 9 concludes that "a batch of four should cost roughly one rung's old wall rather than four".

The harness that would run the batch caps concurrency below that. The workflow-authoring reference states: "Concurrent agent() calls are capped at min(16, available CPUs - 2) per workflow — excess calls queue and run as slots free up." `nproc` on this box is 4, so the cap is 2. It is per workflow, and a nested workflow does not raise it: "The child shares this run's concurrency cap, agent counter, abort signal, and token budget."

So a scatter of four rung workers runs as two waves of two, and so does the scatter of four skeptics. The batch's wall is not one rung's wall; it is at best two rungs' walls in each of the two scatter stages, plus the gate. The largest single claim in section 9 is wrong by a factor of two before any contention is counted.

This also undercuts the plan's own reasoning for k: the number is set by the harness, not by the core count, and the two happen to differ here.

Severity: breaks the design's headline arithmetic, not the design. The batch still beats the serial loop; it beats it by about half of what section 9 says.

Smallest fix: set k to 2 and re-price section 9 on that, or verify the cap first with a throwaway workflow of four trivial agents and read the four agents' start timestamps out of `journal.jsonl` — the same parse `iteration-cost.md` already used to prove that no two agents in the last climb ever overlapped. I could not run that experiment; a worker agent has no Workflow tool. The cap is the single most decisive number in the plan and it is currently unverified in either direction.

## Finding 2: every worktree needs its own compiled tree and its own analysed cache, the plan prices neither, and the obvious cheap way to share the build silently redirects the compiler at the main tree

The plan never says what a fresh worktree needs before it can compile a Fortress program. Section 2 says "one git worktree each" and section 9 says a rung worker's remaining tool time is "a rebuild plus one test plus one subset".

What a fresh checkout does not have: `ProjectFortress/build` is gitignored (`.gitignore:9`; `git ls-files ProjectFortress/build` returns 0 files against 4,027 files and 40 MB on disk), and every cache under `default_repository/caches/` is gitignored except `global.map`. `ProjectFortress/third_party` is tracked (56 files, 37 MB), so the jars come with the checkout.

The analysed cache cannot be copied into a worktree, because its entries are keyed by the absolute path of the source file. `NamingCzar.deCaseName` builds every cache file name as `<ApiName>-<hex of sourcePath.hashCode()>` (`compiler/NamingCzar.java:243-245`, used at `:247-260`). Verified by recomputing the Java string hash of every `.fss`/`.fsi` path in the tree against the live cache: `CompilerLibrary-23b718f2.tfs` is the hash of `/home/user/fortress/Library/CompilerLibrary.fss`, `AnyType-6d4f5273.tfi` of `/home/user/fortress/ProjectFortress/LibraryBuiltin/AnyType.fsi`, `CompilerBuiltin-5b8ec3b1.tfi` of `/home/user/fortress/ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi`. A worktree at a different path therefore starts with a 100% cold analysed cache whatever is copied into it.

Measured cost of that cold start, in a shared clone of this repository checked out at a new path, with its build directory copied in and a private cache directory, on this box: `AnyType` 21 s, `CompilerBuiltin` 104 s, `CompilerLibrary` 17 s, `CompilerAlgebra` 2 s, `CompilerSystem` 1 s, total **145 s** — inside the 110-162 s range `iteration-cost.md` section B measured for the same recipe in the warm main tree. Each worktree pays it once before its first rung command, and each of the rung's two subset runs pays it again inside its own private cache root, because `compile-ladder/rung8/run-subset.sh` starts with `rm -rf "$ROOT"` and then rebuilds all five components.

The build directory itself can be seeded by copy: `cp -a ProjectFortress/build` into the clone took 1 s for 40 MB and the tree then works standalone. A seeded worktree is 261 MB of files plus 14 MB of cache once the library is built, against the 24 GB free now, so disk is not the constraint, exactly as `FACTS.md` says.

It must not be seeded by symlink, and this is the sharp part. `ProjectProperties.FORTRESS_AUTOHOME` is not `FORTRESS_HOME`: neither `bin/fortress` nor `experiment/env.sh` sets `fortress.autohome` or `FORTRESS_AUTOHOME`, so the third branch of `ProjectProperties.fortressAutoHome()` (`repository/ProjectProperties.java:35-50`) probes `java.class.path` for `../ProjectFortress` and takes `getCanonicalPath()` of its parent, which resolves symlinks. Measured, in the clone with `ProjectFortress/build` symlinked to the main tree's: `AUTOHOME=/home/user/fortress`, `BASEDIR=/home/user/fortress/ProjectFortress/`, `ROOTDIR=/home/user/fortress/`, `CACHES=/home/user/fortress/default_repository/caches`. With the same directory copied instead of symlinked, all four resolve to the clone.

The symlinked run really did read the main tree, and the two runs prove it against each other: the symlinked build's private cache came out holding api entries under both path hashes, `AnyType-582e4a0a.tfi` (the clone) and `AnyType-6d4f5273.tfi` (the main tree), plus `CompilerBuiltin-5b8ec3b1.tfi`, `CompilerLibrary-23b718e8.tfi` and `CompilerAlgebra-6d3aa8d5.tfi`, all of them main-tree hashes; the copied build's cache, same commands, holds only clone-path hashes. It would have written into the main tree's cache as well had the probe not overridden `fortress.caches` on the command line, which the `repo-internals.md` library-order recipe does not do.

Severity: costs time the plan does not account for — 145 s per worktree of seeding on a box whose whole point is that it has four cores — and, in the symlink form, produces silently wrong results, because a rung's edit to a `.fsi` in its worktree would be ignored while its edit to the matching `.fss` is honoured.

Smallest fix: the batch planner's manifest names the seeding recipe, `cp -a` of `ProjectFortress/build` and nothing else; every worktree runs the five-component library order once before its first command; no symlink anywhere in a worktree's `ProjectFortress`; and each rung worker exports `FORTRESS_AUTOHOME` to its own worktree explicitly so the classpath probe never runs.

## Finding 3: rules 1 to 3 govern the files that never conflict and say nothing about the three files that always do

Section 10 lists as unmeasured "whether merging k rung branches onto the work branch produces conflicts often enough to matter". It is measurable from the eight rungs already climbed and I measured it.

Method: in a shared clone, the parent of rung 1 (`6b3e98ed1`) is the common base; each rung's delta is applied to that base with `git apply -3` and committed on its own branch; the branches are then merged pairwise with `git merge-tree --write-tree`.

Source files, that is everything under `Library/` and `ProjectFortress/`: all 21 pairs of the seven rungs that apply cleanly to the base merge with zero conflicts. The three rungs that all edit `Library/CompilerLibrary.fss` (2, 4 and 8) do not collide because their hunks are at lines 506, 87 and 474. A four-way merge of rungs 1, 3, 4 and 5 and a three-way merge of 2, 6 and 8 both come out with no unmerged paths.

The one source collision among the eight is rungs 6 and 7, which both rewrite the same block of the `IntLiteral` trait in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` (rung 6's hunk at `@@ -829,19 +829,19`, rung 7's at `@@ -814,13 +819,13` and `@@ -835,7 +840,7`); rung 7's delta does not even apply to the base without rung 6. Rule 1 forbids that pair from sharing a batch, so rule 1 is doing its job. Note that this is a second coupled pair: section 3's rule 2 says "of the eight rungs climbed, exactly one pair was so coupled", and there are two.

The record files are the opposite result. Every one of the eight rung commits edits `explorations/coordinator/FACTS.md`, `explorations/fortress-gap-ledger.md` and `explorations/microgpt-run-c-handover.md`, because `PLAN.md`'s commit rule requires all three in the same commit as the edit. Applying only those three files' deltas to the common base and merging pairwise: **28 of 28 pairs conflict on `FACTS.md`, 28 of 28 on the handover, 15 of 28 on the ledger.** The handover conflicts every time because the rule is to extend one paragraph, `FACTS.md` because rungs append into the same section, the ledger only when the rows are adjacent.

Severity: it does not break the design, but it moves the merge from "usually automatic" to "always hand-resolved on three files, for every batch", and rules 1 to 3 as written would let a planner certify a batch as independent while guaranteeing k-1 conflicts. It also breaks the shape of the gather stage: section 4 says the approved branches "are merged onto the work branch" and section 2's diagram then produces "k commits", but a merge that conflicts on three files in every rung cannot produce k clean rung commits without the gather rebuilding them.

Smallest fix: take the three record files out of the rung worker entirely. Each worker writes its FACTS line, its ledger note and its handover sentence into `explorations/compile-ladder/<name>/record.md` in its own worktree; the gather stage applies each rung's three lines to the shared files and stages them into that rung's commit. The commit discipline of `PLAN.md` is then preserved exactly and the merge is over source only, where it is measurably clean.

## Finding 4: the skeptic is weaker than today's skeptic, and no stage ever reads the merged diff

Section 6 says "Every rung is still judged by a skeptic that did not write it, on the rung's own evidence, with one repair and no more", and section 8 lists the skeptic among the things the plan does not change.

Today's skeptic has five checks (`ladder-workflow.js`, `gateAndVerify`), and check 3 is the gate: read the newest `testFast` and `testSystem` outputs, confirm they postdate the edit, and if they are missing or stale run them itself. Under the batch that check is deleted, because the rung has never been gated when the skeptic sees it. So the skeptic's approval stops meaning "this is green on 1,759 tests" and starts meaning "the diff is minimal and the rung's own test passes". That is strictly weaker and the plan should say so in those words rather than say the skeptic is unchanged.

The second half is worse, and the plan does not mention it at all. In the serial loop the approving skeptic read the full diff of the tree that was about to be committed. Under the batch, the planner reasons about rungs before any diff exists, each skeptic sees one rung and "does not see the other rungs" by design, and the gate is a test run that reads nothing. Nobody at any point looks at the k diffs together. The merged tree is the thing that gets committed and pushed, and no agent ever reads it.

The repair loop moves too: a repair now happens before any gate, so a repair that fixes the rung's own test and breaks a suite is invisible until the batch gate, where it costs the whole batch rather than one rung.

Severity: weakens a check the plan claims to keep. It is the difference between "a skeptic approved this tree" and "a skeptic approved a quarter of this tree".

Smallest fix: add one post-merge reviewer that reads `git diff <base>..<merged>` in full and checks rules 1 and 2 against the actual hunks, running concurrently with the gate so it costs no wall clock. Its refusal drops a rung the same way a red gate does.

## Finding 5: the bisect in section 6 does not terminate on the right rung when two rungs interact

Section 6 says the culprit "is found by dropping one rung and re-gating, at most k extra gates, paid only when something is actually broken", and argues the batch is a stronger check because it exercises the k rungs together.

The stronger-check claim is half true and the plan states only the good half. The batch does test interactions the serial loop would not have tested until later. What it stops testing is each rung against the whole suite on its own, which the serial loop did test. So a rung that breaks a suite while another rung in the same batch happens to repair it lands green and unnoticed; a rung that breaks a test belonging to another rung in the same batch is caught, but with no attribution.

That case is not hypothetical in this corpus. Rung 1 added `Equality` to the prelude and had to delete the private `Equality` that `ProjectFortress/library_tests/MaybeTest9.fss` declared for itself — a collateral edit to somebody else's test, forced by a prelude addition. Two rungs in one batch that both add prelude names will both go looking for tests to fix, and those edits are not covered by rule 1, which is about declarations.

The bisect does not terminate correctly on the interacting case. If A alone is green, B alone is green and A+B is red, then dropping A gives green and dropping B gives green, so the procedure blames whichever it dropped first and lands the other; the interaction is not identified and the surviving rung is not innocent, it is merely no longer paired. The bound is also wrong when two rungs are independently at fault: dropping one leaves it red, and the procedure as written has no next step. Section 2's diagram has no agent for the bisect, section 4 has no stage for it, and the plan does not say who decides, whether the dropped rung's worktree survives, or what is recorded.

`PLAN.md`'s stop condition "a rung's gate red twice after one repair" cannot be evaluated at all under the batch, because a rung no longer has a gate. Section 6's claim that the stop conditions are unchanged is therefore not true of that one.

Severity: a stage with no defined failure path, on the path that is taken exactly when something has gone wrong.

Smallest fix: define the red-gate path as a stage with its own agent and a fixed rule — re-gate the base plus each rung alone, k gates, which identifies both single-rung faults and, by elimination, the interacting pair; cap it at k gates and stop the climb if it is still red, which is the honest reading of `PLAN.md`'s stop condition.

## Finding 6: per-edit "the full suite stays green" is Pavol's own order, and the batch changes it

`POSITIONS.md`, 2026-09-17: the order he accepted is "every sealed-tree edit starts from a failing test added to `ProjectFortress/compiler_tests/` and the full suite stays green".

Section 8 lists what the plan does not change and names the test-first gate, the sealed-tree rule and the commit discipline. It does not name this. The batch keeps the test-first half and moves the suite-green half from per-edit to per-batch: after a batch lands, no single rung in it is known to keep the suite green on its own.

This is a fork that belongs to Pavol rather than an engineering answer, and it should be put to him as one: a batch of k rungs is gated together, so the suite-green guarantee attaches to the batch, not to the edit. `POSITIONS.md` also records that "a decision made inside a worker's report and recorded in one line is a decision not made".

Severity: not an engineering defect. It is a named standing decision being changed by a plan whose section 8 says it is not changed.

## Finding 7: parallel workers share `/tmp` and, if they copy the wrong driver, one ladder root

`experiment/env.sh` ends with `rm -rf /tmp/fortress*rats`, unconditionally, every time it is sourced. `ladder-workflow.js`'s RULES block tells every agent to source it "before any fortress or ant command" and, separately, to run `rm -rf /tmp/fortress*rats ProjectFortress/test-tmp` "before and after any long run".

Every grammar-importing run creates its Rats! parser into a fresh `/tmp/fortress<random>rats` and uses it for the duration of the run (`RatsUtil.getTempDir`, `syntax_abstractions/rats/RatsUtil.java:137-144`; `FACTS.md`, disk). With k workers in parallel, worker B sourcing `env.sh` deletes worker A's live parser directory. The failure would land inside worker A as a compile error on a program that compiles fine alone, and the skeptic has no way to tell that from a real result.

The per-rung subset drivers are already safe: `compile-ladder/rung8/run-subset.sh` sets `-Djava.io.tmpdir=$ROOT/tmp` and `FORTRESS_CACHES=$ROOT/caches` under a per-rung root, and sweeps only its own directory. The baseline driver is not: `compile-ladder/run-ladder.sh:23` defaults `LADDER_ROOT` to one fixed absolute scratchpad path, shares `$LADDER_ROOT/ladder-caches` and `$LADDER_ROOT/ladder-tmp`, builds `$LADDER_ROOT/pristine` only `if [ ! -d "$PRISTINE" ]`, and its `prune_cache` deletes every cache file not present in `pristine`. Four workers copying that driver instead of the per-rung one would share a cache, delete each other's entries mid-run, and measure their subsets against whichever worker's library reached `pristine` first.

And the bare `bin/fortress` invocations a rung worker makes outside the subset driver — the library-order rebuild, its own `fortress junit` — use the process default `java.io.tmpdir`, which is `/tmp`.

Severity: a source of flaky, misattributed rung failures, in exactly the stage the plan is adding.

Smallest fix: the shared prompt prefix of section 7 sets `TMPDIR` and `-Djava.io.tmpdir` to a per-rung directory and forbids the shared-glob sweep; the manifest gives each rung a distinct `LADDER_ROOT`; and `env.sh`'s unconditional sweep is replaced by one scoped to the worker's own root. That is an edit to `experiment/env.sh`, which is ours, not the sealed tree.

## Finding 8: rule 3's stated reason is false, and its real reason is a different and stronger one

Rule 3 says at most one rung per batch may touch `.java` or `.scala` "because that forces `ant compileAll`, which empties the bytecode cache for every worktree and serialises what the batch exists to parallelise".

`ant compileAll` depends on `compileCommon`, which depends on `cleanCache`, which deletes `${cache0}` and `${cache1}` (`build.xml:715, 356-360`). `cache0` is `<property name="cache0" location="default_repository/caches"/>` (`build.xml:42`) and the project element carries no `basedir` (`build.xml:22`), so `location` resolves against the build file's own directory. A `compileAll` in worktree A deletes worktree A's cache and cannot reach worktree B's.

The real constraint is the one finding 2 describes and is worse than the stated one: `compileAll`'s scalac step has no `<depend>` and no uptodate guard (`build.xml:547-568`), so it recompiles all Scala and re-parses all Java every time, and a worktree that must run it pays a full build rather than the 46 s `iteration-cost.md` observed in the warm main tree. Rule 3 should stand; its justification should be replaced.

There is a second hazard rule 3 does not cover: if worktrees were given a shared build directory to avoid that cost, the one `compileAll` in the batch would rebuild under all k of them at once, mid-run. Finding 2 already rules out sharing.

Severity: a rule that survives, with a reason that does not. Low, except that the false reason is the kind of thing that gets cited later.

## Finding 9: rules 1 and 2 are checked against edits that do not exist yet, and nothing re-checks them against the edits that happen

Section 3 says the planner "must prove that before the scatter, not assume it", and that "the conflict check in rules 1 and 2 is textual".

It cannot be textual before the scatter, because the text is the diff and the diff does not exist. The planner has the missing name, the ledger row and the interpreter's declaration of the name, and from those it predicts which declarations a rung will touch. The rung worker is then told to make "the smallest edit the test needs", wherever that is. Rung 1's forced edit to `library_tests/MaybeTest9.fss` and rung 7's need for rung 6's `IntLiteral` rewrite are both examples of an edit a planner would have to have guessed.

There is no stage that checks rule 1 against the real diffs, and no defined failure path for a worker that violates it. The skeptic cannot check it, because it does not see the other rungs.

Severity: the rule the whole design rests on is unenforced after the point where it can first be evaluated.

Smallest fix: the post-merge reviewer of finding 4 checks rules 1 and 2 mechanically over the k diffs, and a violation drops the later rung in manifest order.

## Finding 10: section 9's headline compares the batch against a serial loop that section D of `iteration-cost.md` has already fixed for free

Section 9 calls it measured and firm that "the gate falls from 130.5 minutes over eight rungs to 582 s per batch, which for batches of four is 19.4 minutes over the same eight rungs".

The arithmetic is right (434.2 + 147.6 = 581.8 s; 2 × 582 s = 19.4 min) and the baseline is not. The 130.5 minutes is what fourteen `testFast` runs and eleven `testSystem` runs actually cost, and `iteration-cost.md` section C establishes that 41.0 of those minutes produced no information and section D says D1 and D2 remove them at no cost in rigor. A serial loop that gates each rung exactly once costs 8 × 582 s = 77.6 minutes. Against that, the batch saves 58.2 minutes over eight rungs, not 111.1, and claiming both the batch's figure and D1's 21.7 and D2's 19.3 counts the same minutes twice.

Severity: overstates the prize by about a factor of two on the one number section 9 calls firm rather than estimated.

Smallest fix: quote the saving against a once-per-rung serial gate, and state D1 and D2 as already included rather than as separate wins.

## Finding 11: the minimal rebuild is not a five-against-three question; `CompilerBuiltin` is two-thirds of it

Section 5 defers the minimal rebuild recipe to the probe and quotes "five components at 110-162 s against three at 24.6-30.4 s", and `iteration-cost.md` D3 says the one measurement it deliberately did not take was a timed rebuild of `AnyType` alone.

Taken here, cold, at a new path, twice: `AnyType` 20 and 21 s, `CompilerBuiltin` 104 and 104 s, `CompilerLibrary` 35 and 17 s, `CompilerAlgebra` 2 and 2 s, `CompilerSystem` 1 and 1 s. Dropping `AnyType` from the front saves 21 s, not the 103 s the five-against-three difference implies. The 4.7× figure on record is a cold five-component run against a three-component run over a cache that already held the two upstream components — the same three components re-run over a warm cache here took 3 s.

The consequence for the plan: the rebuild saving is largest for rungs that edit `Library/CompilerLibrary.*` (rungs 2, 4 and 8 of the eight, which can skip the 125 s of `AnyType` plus `CompilerBuiltin`) and nearly nil for rungs that edit `LibraryBuiltin/CompilerBuiltin.*` (rungs 5, 6 and 7), which must rebuild the 104 s component and everything below it.

Severity: does not break anything; it retires an open question in section 5 and corrects the size of the prize.

## Finding 12: the second half of section 5's open question asks for something that is not a target

Section 5 says "`testFast`'s four tracks include 417 tests that run in 49.6 s away from the three big suites, and whether a library-only batch can reach them is decided by the same dependency answer".

The dependency answer is necessary but not sufficient. The four tracks are hard-coded inside one `<parallel threadcount="4">` in the `testFast` target (`build.xml:960-991`); there is no target, and no property, that runs the `misc` track alone. Reaching those 417 tests means editing `build.xml`, and `iteration-cost.md` D-T5 already records that a `build.xml` change "would itself have to be gated". So even a clean "the worlds are separate" answer leaves this half needing a gated build change before it can be used.

Nothing else in the plan breaks if the answer comes back "the worlds are separate": the gate simply becomes `testFast` alone for a library-only batch, the merge, bisect and commit stages are unaffected, and section 9's arithmetic improves by 147.6 s per batch. The conditional is well-formed; only its second half is not actionable as written.

## Finding 13: six against five, and a disagreement mislabelled

Section 5 says "six of the eight rungs just climbed touched only compiler-world files" and cites `iteration-cost.md` D-T1, which says `testSystem` guards "five of the eight rungs".

The file lists say six rungs touch `Library/` or `ProjectFortress/LibraryBuiltin/`: rungs 2, 4 and 8 in `Library/CompilerLibrary.*`, rungs 5, 6 and 7 in `LibraryBuiltin/CompilerBuiltin.*`. Rung 7 also touches two `.java` files, which is presumably where the five came from. Section 5 describes the two documents as "two readings on record" that "disagree" about what the interpreter loads; what they actually disagree about is a count. One of the two numbers is wrong and it is worth settling before the probe's answer is read against it.

## Finding 14: smaller things

Section 2's diagram has no stage for a refused rung's record or for the batch's own climb record; `ladder-workflow.js` has `revert` and a final re-run agent, and the plan replaces neither.

Section 4 says the gate runs "on exactly the tree that is committed", which holds only if the record-file resolution of finding 3 happens before the gate rather than in the commit stage; the plan does not say which.

Merging k branches produces k rung commits plus merge commits, so "the k commits are pushed as k commits" is not what a plain merge yields; the gather needs to say whether it merges or rebases.

Every library rung adds a test to `ProjectFortress/library_tests/`, which is scanned by directory (`tests/unit_tests/LibraryJUTest.java:35-40`) and runs in the `library` track, measured at 373.8 s over 69 tests, about 5.4 s each, against the 439.6 s track that sets the gate's wall. There is about 66 s of headroom, so after roughly twelve more library rungs the gate's wall starts growing with the corpus. Not this batch's problem; worth a line in the plan.

`env.sh` sets `JAVA_FLAGS="-Xmx4g"`. Four concurrent `fortress compile` processes at that ceiling on a 16 GB box with no swap is a configuration the plan should not inherit by accident; the measured resident set of one `CompilerBuiltin` compile was 368 MB, so the ceiling is far above the need, but the ceiling is what the JVM is allowed to take.

One `fortress compile` was measured at 133-215% CPU over 21 threads (`ps` samples during the cold library builds), so it is not a single core's worth of work; four of them want more than five cores on a four-core box, and one core on this box was already held throughout by an unrelated process. Rule 4's "four is the core count" is the right kind of argument with the wrong measurement behind it.

## Verdict

Sound only under conditions, and the conditions are not small.

The premise is right: the gate saturates the box, the gate inside every rung is what makes parallel rungs worthless, and lifting it to once per batch is the one move that makes room. Nothing I checked contradicts that, and the merge question that section 10 left open comes back in the design's favour on source files — 0 conflicts in 21 pairs, with the one real collision being exactly the kind rule 1 already forbids.

The conditions: k is set by the harness cap, not by `nproc`, and that cap must be measured before section 9's arithmetic is trusted (finding 1); each worktree is seeded by copying `ProjectFortress/build` and never by symlink, and pays a measured 145 s cold library build before its first rung command (finding 2); the three record files leave the rung worker and are applied at the gather (finding 3); a post-merge reviewer reads the merged diff and enforces rules 1 and 2 against the real hunks (findings 4 and 9); the red-gate path becomes a defined stage with a fixed rule and a stop (finding 5); and every parallel worker gets its own `java.io.tmpdir` and ladder root (finding 7).

With those, the design does what it says and the wall falls by something under half of what section 9 claims.

The one item that is not mine to fix is the fork in finding 6: per-edit suite-green is on record as Pavol's accepted order and the batch moves it to per-batch. That is his call, and section 8 currently states it as unchanged rather than putting it to him.

<!-- Appended 2026-09-17 on the coordinating session's follow-up, after Pavol pushed back on finding 4: his argument is that the batch's skeptic is not weakened but split, because the skeptic's judgement was always about the rung's own change and the suite was merely a run it happened to have in hand. He asked for evidence rather than argument. What follows is the first climb's nine skeptic runs read out of the workflow transcripts, case by case, classified by the evidence each objection actually rested on. Same constraints: nothing committed, no plan or source edited, no gate run. -->

# What the skeptics actually caught, 2026-09-17

## Sources for this section

The workflow transcripts at `/root/.claude/projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/subagents/workflows/wf_73833dfb-d25/`: `journal.jsonl` carries each agent's returned verdict object verbatim, and the 36 `agent-<id>.jsonl` files carry every tool result. The other side of the record is the eight rung commits and `explorations/compile-ladder/rung<N>/REPORT.md`.

Nine skeptic runs exist: `rung1:verify` through `rung8:verify`, plus `rung6:verify2` after the one repair. Eight approved, one refused.

## 1. The refusals, and what they rested on

**One refusal in nine runs: `rung6:verify`.** Its own opening sentence is the load-bearing evidence for this whole section: "All five checks hold on the evidence, and I verified each myself rather than reading the worker's artifacts", followed by "I refuse the commit as it stands anyway, over what the record says and does not say". Check 3, the gate, is recorded in that same verdict as 47 `Tests run:` lines summing 1,389 and four system shards summing 382, every line `Failures: 0, Errors: 0`. The refusal is made with a green suite in hand and against it.

Its three grounds, with the evidence each used:

R1, the substantive one: giving `IntLiteral`'s comparisons bodies turns a loud `CompilerFailureDetectedAtRunTime` into a silent wrong answer for a literal of bitLength exactly 64, because `CodeGen.forIntLiteralExpr` has already wrapped the value negative. Evidence: **a probe the skeptic wrote and ran itself**, `a = 18446744073709551615; b = 5; println (a < b)`, `false` under `walk` and `true` compiled, plus the absence of that fact from the ledger, FACTS, the handover and the rung's report. Load-bearing: the probe.

R2: the rung's report justifies `asZZ64` as "the widest integer getter ... that has a full comparison family under it (`.fsi:379-384`)", and the tree contradicts both halves — `CompilerBuiltin.fsi:374` declares `abstract getter asZZ(): ZZ`, the cited lines are operator declarations, and `trait ZZ` carries the whole comparison family. Evidence: **reading the source against the report's claim**. Load-bearing: the source read.

R3: the handover says "the other four wait on the arithmetic family"; `XXXcaseTest` does not, and the report and the FACTS line say so correctly, so three records of one run disagree. Evidence: **the record**, corroborated by the ladder subset.

None of the three rests on the suite. Two rest on artifacts the batch's skeptic still holds — the diff, the source, the report — and one on a probe the skeptic can write in its own worktree with no gate anywhere near it.

**The repair acted on all three**, and `rung6:verify2` confirms each by re-running it: ledger row 317 was added, the `asZZ64` justification was rewritten as open and unmeasured, and the handover sentence was corrected.

## 2. Near misses: what the approvals named anyway

The nine runs name **26 items** beyond the bare approval. Classified by the evidence that is load-bearing for each: the diff or a source read **8**, the record (ledger, FACTS, handover, `PLAN.md`) **7**, a probe the skeptic wrote itself **4**, the ladder subset **4**, the rung's own report **2**, the full suite result **1**.

The four probe-driven ones are the highest-value findings the skeptics produced, and all four are compiled-against-interpreter differentials the skeptic invented: `rung4:verify` (d) re-ran `probes/AssertMessage.fss` to prove the new comparing `assert` bodies genuinely compare rather than being no-ops the positive-only test could not distinguish; `rung6:verify` R1 and `rung6:verify2` [1] are the bitLength-64 wrap; `rung7:verify` [1] is a **wider, previously unrecorded divergence of the same shape**, found by probing `a = 2147483647; b = 2; println (a b)` and `println (a + a)`, which print `4294967294` compiled and `-2` under `walk`, a different mechanism from row 317 because nothing is wrapped by the code generator at bitLength 31.

The seven record-driven ones are `rung1:verify` [1] and [2], `rung3:verify`'s placeholder item, `rung6:verify` R3, and `rung6:verify2` [3] [4] [5]. Five of them are about the *shared* files as a whole — a `fixed <short hash>` placeholder, a stale `PLAN.md` claim, ledger totals still reading "total rows 309" seven rows later, a handover paragraph that says "not yet committed" in five places. They are not about the rung's own lines; they are about the state of the record after the rung is folded into it.

The one suite-driven item is `rung3:verify`'s required correction: the rung's own FACTS line and report claim "`ant testFast` (48 suites)" where the skeptic's own run counted 47. It is a catch about the *shape* of the suite result, not about a failure.

`rung1:verify` used the suite result one more way, in a check that passed rather than a named item: it confirmed no suite had shrunk against the last committed baseline — `CompilerJUTest` 642 = 642, `OtherCompilerJUTest` 263 = 263, `SystemJUTest` 382 = 382, `LibraryJUTest` 55 → 57, the +2 being the new test — so that nothing had been silently dropped.

**Two of the skeptics' named corrections never reached the commit.** `FACTS.md:84` still reads "48 suites" and the committed `rung3/REPORT.md:51` still reads "48 `Tests run:` lines"; and `rung7:verify`'s requested sentence on the `4294967294` divergence was never written — `grep -c 4294967294` over the ledger and `FACTS.md` returns 0 in both. By contrast the `<short hash>` placeholders were all closed, by five follow-up commits (`8bb4ab0de`, `9b1da0a07`, `386053b3d`, `b45ac2982`, `0be58b257`). So an approval that names a required correction is not a reliable instrument today, which is a defect of the current loop and not of the batch.

## 3. Did the suite ever go red?

**No. Not once, at any stage, in any rung of the climb.**

Scanned every tool result in all 36 agent transcripts for a standalone `BUILD FAILED` line and for `Tests expected to pass are failing!`, which is the message `testFast` raises on failure (`build.xml:993`): **0 and 0**. Every `BUILD FAILED` string that matches a loose grep is the literal text `LIBRARY BUILD FAILED on $f` inside the subset driver being printed to a terminal, never an ant failure.

Every `Tests run: 2, Failures: 2` and `Failures: 1` in the transcripts is a rung's own new test failing **before** its edit — the test-first evidence the workers were told to capture.

The gate ran 25 times during the climb — `ant testFast` 14, `ant testSystem` 11 (`iteration-cost.md` section B) — and produced zero failures on all 25.

**The one time a red suite was load-bearing in this whole story, it was outside the climb and it was the implementer, not the skeptic, who held it.** The refused first attempt at rung 1, commit `b014ff80d`, records at `rung1/REPORT.md:81` of that revision: "`ant testFast` with both lines in place: 47 suites, **4 failures**, 0 errors" — three from `library_tests/MaybeTest9.fss` declaring its own `trait Equality` that now collides with the newly implicit `CompilerAlgebra.Equality`, and one from `compiler_tests/Compiled9.ai` on a checker defect. That red run is what produced the two facts; the climb's `rung1:implement` agent read that report and applied the resulting four edits with no red run of its own.

So: in nine skeptic runs the deferred interaction check caught nothing, because there was nothing to catch; in one earlier rung attempt outside the climb, the same check caught a real cross-rung breakage. One occurrence in the nine rung attempts on record.

## 4. Would the batch have caught the same things, at the same point?

The 26 items and the one refusal, mapped onto the revised plan's stages.

The diff, source-read, report and probe items — 14 of the 26, and all three of `rung6:verify`'s grounds — are caught by **the rung's own skeptic, at the same point**. Everything they use is inside one worktree: the diff, the sources, the recorded failure, the rung's report, and a probe the skeptic writes and runs itself. Nothing about them needs a gate to have run.

The four ladder-subset items are caught by **the rung's own skeptic, at the same point**, and slightly better: in the batch a rung's "before" subset is taken at the common base rather than after the previous rung, so the comparison has one variable in it instead of two.

The seven record items split. The two that are about the rung's own lines are caught by the rung's skeptic reading its fragment. The five that are about the shared files' state after folding — placement beside the previous rung's line, no renumbering, the ledger's own totals, a stale `PLAN.md`, the handover's cross-rung consistency — **cannot be caught by the rung's skeptic at all under section 6**, because the shared files are not in its worktree. They have to move to the merged-diff reviewer. The plan's section 3 diagram gives that agent one job, "re-checks rules 1-2 against the real hunks", and does not give it the record. **That is a gap: five of the 26 observed catches fall between the two stages as the plan is currently written.** The smallest fix is one clause — the merged-diff reviewer also checks the applied record fragments against the shared files, which is exactly the check `rung1:verify` and `rung6:verify2` were performing.

The one suite-shape item, `rung3`'s 48 against 47, **disappears rather than moves**: the claim it corrects is a rung worker's claim about a gate it ran, and in the batch the rung worker runs no gate and makes no such claim.

`rung1:verify`'s no-suite-shrank check **moves to the batch gate and is better there**, because it compares the merged tree against the last committed baseline, which is the comparison that matters, instead of comparing an intermediate tree.

The MaybeTest9 class — a rung that breaks a test belonging to nobody in the batch — is the one case the batch genuinely handles worse, and it is worth stating exactly. In the serial loop the implementer's own gate went red and the implementer fixed the cause inside the rung. In the batch the rung worker runs no gate, its skeptic sees no gate, and the merged-diff reviewer would have to guess that some test declares a competing name; so **the batch gate catches it, red, with no attribution**, and the section 7 drop stage then drops rungs one at a time. In that case the batch pays a 582 s red gate plus up to k re-gates, and the dropped rung returns to the ranking unfixed rather than being repaired in place.

That class is cheap to cover without a gate, and the skeptics were already covering it by hand. `rung5:verify`'s regression entry reads "None ... no file under Library/, ProjectFortress/LibraryBuiltin/, library_tests/, not_working_library_tests/, compiler_tests/ or other_compiler_tests/ declares `//` apart from the interpreter's own Library/FortressLibrary", and `rung2:verify` did the same: "no file under tests/, test_library/, compiler_tests/, other_compiler_tests/, library_tests/ or not_working_library_tests/ declares a `HasRank` of its own, so the MaybeTest9 collision of rung 1 has no path here". **A grep of the corpora for a competing declaration of every name the rung adds, made a required step of the rung worker and re-checked by its skeptic, covers the one class of catch that needed the suite, in seconds rather than in 582.** That is the smallest fix, and it is a practice two of the nine skeptics already invented.

## 5. The judgement on the split-versus-weakening question

On this evidence Pavol is right, and finding 4 of the review above overstated the loss.

**No catch in the nine skeptic runs was load-bearing on a suite failure, because there was no suite failure in 25 gate runs.** Every objection any skeptic made — the one refusal and all 26 named items — rests on the diff, the source, the rung's report, the record, the ladder subset, or a probe the skeptic wrote itself. The refusing skeptic said so in terms: all five checks held, including the green gate, and it refused on what the record said and did not say.

**The class of catch that genuinely needs the suite result in hand while judging one rung did not occur.** The nearest thing is `rung3`'s 47-against-48, which is a check on a claim about the gate rather than on the gate, and which the batch removes by removing the claim.

So the suite result was, in nine runs, exactly what Pavol calls it: a run the skeptic happened to have in hand, used once for a count and once to prove no suite had shrunk, and never the ground of a judgement. The judgement was about the rung's own change every time.

Two qualifications, both of which the plan should carry rather than the concession the plan makes now.

First, "does this break anything else" was never the skeptic's judgement, but it was sometimes the **implementer's**, and that is where the real trade sits: the refused rung-1 attempt found MaybeTest9 and Compiled9 through its own red gate. One occurrence in nine rung attempts. The corpus grep above covers it; without the grep, the batch pays a red gate and a drop instead of an in-rung repair.

Second, five of the 26 catches are about the shared record after folding, and under section 6 they have no owner. That is a gap introduced by moving the record files out of the rung worker, not by moving the gate, and it is fixed by one clause in the merged-diff reviewer's brief.

With those two, section 7's sentence "the first is the deliberate trade" can be replaced by something the evidence supports: the skeptic's judgement is unchanged, because it never rested on the suite; what moves later is a check the skeptic held but did not use, and the one class of failure that check covered is covered more cheaply by a grep the skeptics were already running.
