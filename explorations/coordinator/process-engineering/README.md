<!-- The process-engineering study Pavol opened on 2026-10-03: what it asks, what is done with where it is, what is pending in order, and what waits on him. Kept current by the coordinator; the boot note points here for the study's state. -->

# The process-engineering study

## The question

Pavol, 2026-10-03, early morning UTC: whether the way the work is run spends the weekly token pool well, and how to divide the pool between improving the process and moving the climb forward. His threads, in his order:

- Why sharing the build between worktrees was called impossible for two weeks, and whether a model given the goal finds the answer ("machine empathy": "this empathy for machine, not wasting resources, is a crucial component of good engineering taste"; "Three seconds versus 0.07 ... if it's better, then let's use it").
- Where each role's tokens go inside a batch, and what is shared between agents that could be done once ("I am perfectly aware that checking and rechecking is the necessary part ... I just want to understand whether that's it").
- Whether one fixed batch workflow, reused for every step of the climb, holds the project back against what a designer would build from the goals alone ("I want to see those designs for the ultra code workflows, but not run them").
- Whether the identical start of every agent can be read from the prompt cache.

## Done

- `cache-sharing.md`: why cache sharing was called impossible (an Opus 5 review's measured "file names differ" written as "cannot be given a warm cache at all", carried by every tier after), the blinded test on both tiers (both found the translation in about 15 minutes given the goal), and the rebuilds priced (245 of 425 builds avoidable over 18 batch runs, about 7.3 hours of agent time, 0.87M tokens: the waste was time, not tokens).
- `p1-cost.md`: how probe P1 wrote 7.0M against a stated 0.5M (19 context rewrites after ten-minute waits its brief did not cap; never put to Pavol). His rule from it: POSITIONS, "The coordinator watches what it launches." (long runs only).
- The blinded engineers' improvements built (`5b0a82d97`; `coordinator/build-cache-exploration.md` section 6): seeded worktrees take the base's file dates (a Java edit's rebuild 143 s to 77 s, and a defect fixed: a branch whose Java differed from the base was never recompiled), and `tools/old-fortress.sh` runs the old code from the base build with a private cache folder (0.04 s, 36 MB, against a 3 s, 206 MB copy per rung). The script and manual change waits for batch 10's landing: the replacement texts are in the coordinator's scratchpad, `old-fortress-script-patch.md`, and the boot note names it.
- `labor.md`: where the tokens of batches 8 and 9 went (14.6M): the fixed start of every agent 19.5%, the agents' own thinking 27%, checking roles 43% against rung workers 37%, exploration beyond the brief about 10% of a worker, 29% of what agents read already given to an earlier agent of the batch; eight levers, together about 1M to 1.5M a batch.
- The first designs for batch 10's goals, `design-batch10-fable.md` (about 5.2M) and `design-batch10-opus.md` (about 4.3M on Opus), from `design-batch10-brief.md`. They are not blind: the record's section 1 carried batch 9's cost by stage, its section 3 lines of the pipeline, POSITIONS and the build-cache note parts of it, and the Opus designer read the record's sections 6 to 8 by a paging slip. Both kept workers, skeptics and a repair round and cut the stages after the rungs.
- The explainer page comparing them with the pipeline and the token measurement: https://claude.ai/artifact/Wy1hJLharoRXVa2uZsr2m6 (source in the coordinator's scratchpad, `design-compare/index.html`).
- The shared-start cache question re-measured (FACTS, "The Workflow harness runs two agents at once on this box"): only a whole identical prompt is read from the cache; a prompt differing in its last line is written whole again.

## Pending, in order

1. The blind rerun of the two designs (Pavol's "Yes, run it. Blind rerun. Go.", about 08:15 UTC): a content-only brief in `/home/user/blind-brief/` (`content.md`, `requirements.md`, `machine.md`), checked for leaks by the coordinator, then an Opus and a Fable designer reading only that folder, the source, the specification, the ledger and `explorations/repo-internals.md`, choosing their own tiers, writing `design-batch10-blind-opus.md` and `-fable.md`; the brief then committed beside them and the page extended. CLAUDE.md reaches every agent and mentions the gate: a leak that cannot be removed, said on the page.
2. The custom-agent-type cache probe after the session's process restarts (about 12:33 UTC; an agent type written mid-session is not registered until then): three agents of type `cache-probe` (`.claude/agents/cache-probe.md`, untracked), their first calls' cache reads; if the system prompt is shared, a keep-warm agent of the same type next; the fallback, one identical prompt for every agent with its own part fetched as a tool result.
3. After batch 10 lands: its measured cost by role; then the Fable comparison of the designs (the leaky and the blind) with batch 10 as run and `labor.md`, with what to change; the page updated with it.
4. The same two designers at the whole project's scope (microGPT compiled and fast), designs only.

## Waiting on Pavol

- The rule on engineering taste, drafted from `cache-sharing.md`: an obstacle gets an attempt to engineer around it and the price of its recurring cost before it is accepted as impossible. To be put to him as one line.
- The decisions the designs raise, merged on the page's section 7 (the merged-diff review's place, one Fable ruling for a contested finding, approvals with required corrections, Sonnet for the gate and landing, merge commits on `main`, among them); taken up with the comparison, not before.
