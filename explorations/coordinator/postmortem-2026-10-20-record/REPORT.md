<!-- The record post-mortem of 2026-10-20 to 22, in a neutral register for researchers: written by an Opus writer at the curator's word of 23:31 UTC on 2026-10-22, from the first version (to `226e3dd97`), the map `evidence/MAP.md` and the curator's messages; its briefs are in `evidence/briefs/`. -->

# The record post-mortem, 2026-10-20 to 22

## The setting

- The project revives Fortress, a programming language that Sun Labs left unfinished in 2012. Its measure is one program, microGPT, compiled to bytecode and running fast.
- One person, the curator, directs it. He reads on a phone and dictates, often late at night in his time zone, UTC+2.
- A long-running Claude Code session in a cloud container, the coordinator, talks to him, briefs workers and keeps the project's memory. Workers are Agent-tool subagents, Workflow runs and headless `claude -p` sessions. In this window the coordinator ran on Opus 5.5 throughout.
- The memory is files in the repository: FACTS (what is true), POSITIONS (the curator's decisions), the gap ledger (known gaps between the original design and the code, one row each), their history files, and the skills, the instructions that Claude Code loads into the coordinator and the workers.
- A boot is the coordinator's start-up reading, after a session start or a compaction. The boot note is its note of what runs now.
- Times are UTC.

Sources:
1. `CLAUDE.md`; `evidence/MAP.md`, its conventions.

## 1. What started it

- On 10-20 climb batch 20 landed. A climb batch is a Workflow run that changes the code in several tasks, called rungs, and lands them together. The first of its items in the review queue, the file of items that wait for the curator's word, was item 31: which element types a `Vector` or `Matrix` may hold.
- The landed bound, `T extends { Number, MultiplicativeRing[\T\] }`, asks every element type for multiplication. The record said that it "bends the letter" of P-86, a POSITIONS entry: a generic `Vector` or `Matrix` body is checked against what each operation needs, with no blanket ring bound that would exclude integer arrays.
- The coordinator explained the item three times, from 12:59 to 13:42. The curator called the options a "cargo cult", and did not recognize P-86 as his words.
- Three fresh workers wrote the item again. An Opus 5.5 and a Fable 5.1 worker saw the failed attempts and said that nothing was left to decide. A blind Opus 5.5 worker got only the first reasoning and said that a decision was left. It alone raised the live point: `gather` and `ravel` in the microGPT ports only copy, yet the bound asks their element types for multiplication. This was read in the code, not measured. The workers also disagreed on whether P-86 was the curator's words.
- A scout, a worker that searches the history, found that P-86 paraphrased a review by Astra, an assistant from another vendor. The curator's only word behind it, on 09-26, was yes to carrying the review's checks into one batch's briefs.
- At 16:50 he held all batches until FACTS and POSITIONS were checked again.

Sources:
1. `evidence/MAP.md`, section 1; `reviews/item31-drafts.md`.

## 2. Why it happened

- **A one-time approval became a standing rule.** On 09-26 the coordinator wrote the curator's yes as P-86, a minute after he gave it. On 09-29 it went to the history as carried out. On 09-30 a Fable worker that rewrote POSITIONS at his word put it back, and gave no reason. The scout calls this evidence thin.
- **The paraphrase changed the meaning.** It kept Astra's reason that integers have no ring, false since 09-27, and dropped the live one: copying needs less than arithmetic.
- **Overnight rewrites ran on a general go.** Six entries, P-86 among them, were last rewritten on 10-13 under his go to run overnight.
- **The fault was wide.** The audit of 75 more entries changed 50: status lines, factual errors, one-time approvals, defaults (agents' choices made without his word), and wording away from his meaning. "Answer pending" for item 31 stood in five files.
- **The revival part grew.** This part of the worker skill tells how revived Fortress departs from the original. Updates after landings grew it from 8K to 74K characters in 12 days.
- **The gap ledger drifted.** Its tool could not rewrite a row.

Where the analyses disagree:
- At 16:53 on 10-20 the coordinator blamed its framing. Its own check at 17:28 found that the blind worker, given that framing, raised the live point.
- The curator blamed its long context, 537K tokens at 13:49, the "dumb zone".
- Astra calls the growth "a conflict in the writing instructions, not simply a writer forgetting to be concise".
- The coordinator said that no word of the curator stood behind the change of 09-30. The scout found his word for the rewrite, but none for P-86's return.
- On 10-22 the curator named one more cause (section 9).

Sources:
1. `item31-drafts.md`, Part 4; the audit's two `RESULTS.md` files.
2. `revival-part-use-2026-10-21.md`; `revival-record-synthesis.md`; the ledger health report.

## 3. What was done

Sizes are in characters.

1. **The provenance audit** asked whether each POSITIONS entry is the curator's decision, faithfully recorded. A trial on ten entries on 10-21 caught P-86, struck at his yes at 23:00; item 31 took its live point. The full run on 75 entries was applied at his word of 08:19 on 10-22. Four entries were struck in all. POSITIONS: 85 entries and 44.4K to 81 and 44.6K.
2. **The clarity rewrite** made each entry read on its own. POSITIONS: 65 of 71 entries rewritten, 6 held, to 79.8K. FACTS: 198 entries judged by six checks, 13 held, split into 208, 140.1K to 222.8K.
3. **The scrape** at 12:37 deleted "Built.", "Still to build:" and the pointers to PLAN, the working plan, and to the queue. POSITIONS fell to 74.0K, FACTS to 220.6K.
4. **The follow-up.** A worker drafted 24 changes to entries that a cold read, by a fresh worker with only the skills, found partly clear. The curator approved none at 16:28, and at 22:12 said "apply all the improvements drafted", without a review of each. 22 decisions changed, two stayed. Three facts now state agents' choices, named by their queue items. Rows 795 to 799 were filed. Items 268 to 276 wait for his later review; no work waits on them. The audit page, version 15, shows each change as a diff. POSITIONS ends at 74.8K, FACTS at 221.4K.
5. **The orientation.** A Workflow with a check that nothing was lost, cold reads by fresh workers, a quiz and a judge rebuilt the revival part as a short account that every worker reads whole. Installed at 14:08: 74.3K to 15.8K.
6. **The gap ledger.** A check found about 180 of 439 open rows that need a change. `ledger.py` gained `rewrite` and `landing-check`. A clarity run rewrote 53 of 58 rows; the ledger went from 793 to 798 rows. Item 277 asks whether the compiled type checker still refuses microGPT's `10.0^(-5)`.
7. **The skills.**
   - By 14:26: the consolidation tools, entries with no plan or status, every writer on Opus, the orientation.
   - At 22:20, approved word for word: a decision may point to a fact that it rests on, and a worker's landed choice is a FACTS entry. This replaced "It lists no FACTS entries", which 24 of 81 decisions broke.
   - At 22:46: PLAN, 162K, left for a later cleanup.
   - At 22:56: an optional light boot, which at the curator's word skips FACTS, POSITIONS and INDEX, the list of notes, and searches the record before it states a fact or a decision.
   - From 23:06 to 23:17: the worker skill loads first, since the curator holds that a model reads a glossary differently in the other order. The boot no longer rereads `CLAUDE.md` and the coordinator skill.

The review queue grew from 185 to 257 open items.

Sources:
1. `evidence/MAP.md`, sections 2, 4 and 5; the commits on `main` to 23:18 on 10-22.

## 4. The reusable tools

- **The mining workflow** traces each POSITIONS entry to the curator's words or to an agent. For untraced entries, before a clarity rewrite.
- **The clarity workflow** rewrites entries to read on their own, when they do not.
- **The orientation workflow** updates the revival part after each landing, and rewrites it whole when a cold read or its quiz fails. The update has not run yet.
- **The ledger clarity workflow** rewrites open rows to state each gap as it stands now. Due on the 180 stale rows.
- **`ledger.py landing-check`** runs at every landing.
- **`record.py note`** corrects an entry's history only. Due on 11 history blocks that name the wrong commit.

Sources:
1. Each tool's `README.md`.

## 5. How the record is kept now

- POSITIONS holds only the curator's decisions, each with why, where and what it asks. FACTS holds what is true now, with conditions, evidence and meaning; an agent's landed choice is a fact that says so.
- Each entry reads on its own, states the present, and holds no plan or status. The history files hold how each entry came about, and the curator's dictated words.
- PLAN holds phases, his questions and parked items; the queue, what waits for him; the boot note, what runs now.
- PLAN and the queue point to entries and rows; no entry points back. A fact names the decision that it builds; a decision may name a fact that it rests on. "Row N" is always a ledger row.
- The coordinator writes the curator's decision in the next commit, and its own proposal only at his yes. A worker writes FACTS or POSITIONS only when its brief allows; otherwise it reports complete findings.
- The pass, the rewrite of a worker's findings into entries, sets each entry's final wording when a worker finishes and at each landing. At each landing the orientation update runs, and the landing check must print nothing.
- Only `record.py` writes FACTS and POSITIONS, and only `ledger.py` the ledger. Every writer runs on Opus.

Sources:
1. On `main`: the coordinator skill's `SKILL.md`, `record.md`, `batch.md` and `delegating.md`; `fortress-repo`'s `records.md`.

## 6. What it cost

Tokens written: input plus prompt-cache writes, each message once, measured by the scout with `spend.py` unless marked.
- Item 31's workers and scout: 0.84M. The revival-part scout and scripts: 0.91M.
- The audit: trial 2.85M, against an estimate of 2.0M; full run 19.3M, against 16M to 17M.
- The clarity rewrite: POSITIONS 8.0M, with its judge stage and one FACTS chunk; FACTS 15.7M, against an estimate of 9M.
- The orientation 1.9M, the ledger run 2.6M, the follow-up 1.2M, other workers about 4.7M.
- **Total, 10-20 13:40 to 10-22 22:38: about 58M.**
- Outside the total: the coordinator's own session, 4.3M; this report and its map, about 0.6M, estimated.
- About 5M are left until the weekly reset at 10:00 on 10-23, an estimate.

Sources:
1. `evidence/MAP.md`, section 8; the 16 headless sessions measured again: 3.43M.

## 7. What is still open

- **In the review queue:** item 31, with a probe of whether the team's conditional extension fits, since the curator rejects "add times"; 73 new items, 205 to 277; the held entries: four decisions on his answers, two more, and 13 facts.
- **Unfiled:** two ledger questions, rows 219 and 555.
- **Later:** PLAN's consolidation; climb batch 21's preparation, after the reset, whose launch needs his go.
- **Four asks of the 10-19 post-mortem:** who decides changes to the coordinator skill; `AnyList`'s two methods; a landing page per batch; push notifications that name the batch.
- **In the boot note:** the repair of 180 stale rows, after the reset; a one-line skill fix, that every ad hoc headless run passes `--session-id`; 11 history blocks; the revival page; two probes' advice; this report's page.
- **Done:** the rung brief's owed change, in the batch script since 12:16 on 10-22.

Sources:
1. `evidence/MAP.md`, section 9; the boot note; the batch script.

## 8. Failure modes and guards

Each mode: who acted, what the model did, the trigger, the cost, how it was found, the guard.

- **A one-time yes kept as a standing decision** (the coordinator, then a worker). It wrote a yes to one task as a standing entry in the curator's voice; a bulk rewrite later restored it. Trigger: bulk rewrites on a general go. Cost: three weeks as his decision, the hold, the audit's 22M tokens. Found: he did not recognize it. Guard: since 10-13 a one-time go is written nowhere, a proposal only at his yes; only the mining workflow checks old entries.
- **A condensed text that drifts** (the coordinator and later writers). It kept a false reason and dropped the live one. Trigger: a review condensed into one clause. Cost: item 31 framed on the wrong reason. Found: the audit trial. Guard: a rule to quote the curator where the words decide and to check a condensed text against them; no tool checks it.
- **An agent's choice read as the curator's** (the coordinator). It wrote what a batch built into the decision beside it. Trigger: until 10-22 the record rule put each decision's status into its entry. Cost: nine such choices, now items 268 to 276. Found: a cold read. Guard: such a choice is a FACTS entry that says so.
- **Instructions that grow** (workers, under the setup's rule). Each update after a landing added each change, its contradiction and its reason. Trigger: requested new content was exempt from the non-growth rule. Cost: 74K characters that no batch agent read whole in batches 14 to 20. Found: the curator, on 10-21. Guard: the orientation update and its quiz, untested.
- **A tool gap left to the curator** (the setup, then the coordinator). From 10-08 `ledger.py` refused long notes and could not rewrite a row; the coordinator filed its own fix as a review item. Cost: 117 refused notes, about 180 stale rows. Found: a health check, and his request for the root cause. Guard: `rewrite` and the landing check.
- **A stale skill copy after a compaction** (the setup and the coordinator's boot). Six boots, 10-13 to 10-19, tried to read a deleted file. Trigger: after a compaction Claude Code re-attaches the copy that the Skill tool last loaded, and since 10-13 the boot had used the Read tool; a hook warning of 10-14 did not stop it. Cost: not measured. Found: the curator, who asked at 23:08 on 10-22 for the root cause. Guard: the hook loads both skills with the Skill tool.
- **Test prompts that read as the curator's words** (the coordinator and the setup). It ran three headless boot tests from its shell without `--session-id`, 22:56 to 23:10 on 10-22. Trigger: such a run writes into the coordinator's transcript. Cost: the prompts sit there as his messages; the audit's search tool lists them as his. Found: the coordinator. Guard: none yet.
- **A doubled token count** (the coordinator). It summed tokens over every transcript line, so repeated messages counted twice. Trigger: not on record; since 10-13 the skill defines the count as `spend.py`'s. Cost: 0.66M tokens given for 0.35M; the curator's "500,000 tokens" on 10-21 rested on it. Found: the map's scout. Guard: the definition, which already stood.
- **A synthesis that hides a disagreement** (the coordinator). At 16:53 on 10-20 it said that two drafts reached the same conclusion and called the blind one the odd one. Trigger: not on record. Cost: a second check. Found: the curator, who called it "gaslighting". Guard: none; only the blind worker raised the live point.

Sources:
1. The coordinator skill on `main`; `evidence/MAP.md`, sections 3 and 8; the boot note.
2. `4f2257485`; `e067a7403`; `near.py` on 10-22, 22:56 to 23:10.

## 9. What the curator had to correct

From 15:00 to 23:31 on 10-22 the curator caught these.

- **A rule taken from the skill, not the record** (the coordinator). At 16:14 and 16:42 it gave as a rule in force that a decision points to no FACTS entry; at 15:59 it had counted 24 that do. Trigger: the skill's text, not checked against the record; its boot note of 16:28 told its next context to explain "from the skills as they stand", and did not carry the count. The 16:42 statement came after a compaction, at about 155K tokens. Found: his page comment at 16:56. Guard: the rule now matches the record.
- **A long explanation and a reopened question** (the coordinator). From 15:00 to 16:25 it explained the record in messages of up to 3.8K characters, and at 15:59 reopened a question settled at 11:04. At 16:28 he approved nothing: "horribly vaguely written", "agentic shorthand". He blamed its context, 579K tokens. Cost: the drafts waited until 22:12.
- **Proposals sent unjudged** (the coordinator). At 15:53 it posted 24 drafted changes in entry order, checked for fidelity, not value. At 17:11 he read the first five as "one shade of gray to a different shade of gray", and as "the actual knowledge work that you, Claude, generally suck at". The coordinator agreed: 3 fixed a false statement, 8 changed wording only.
- **Rows not checked for repeats** (the coordinator, from a worker's drafts). At 21:40 he asked what the new rows would hold, since the entry showed one context-free sentence. The five filed rows hold 0.75K to 1K characters each, but three of eight drafts repeated what the skill, the ledger or PLAN held, and were dropped. At 22:02 two kept rows, as summarized, gave him too little to judge.
- **Answers at risk of becoming decisions** (a risk the curator named). At 22:02 he wrote that his "off hand remarks turn into words of gospel when they enter POSITIONS", and that "the sheer amount of decisions that are needed is overwhelming". None of his answers became a decision; nine choices became queue items with defaults.
- **A prerequisite read too late** (the coordinator). At 22:56 it put the load order into the coordinator skill's body, which always loads first, as it noted at 22:58. At 23:05 he wrote: "it's too late, remove wasted tokens". The order is now in the skill's description, `CLAUDE.md` and the hook.
- **A boot step that rereads its context** (the coordinator). Step 1, "`CLAUDE.md`, then this file", about 23.5K characters, survived two rewrites. At 23:12 he asked: "Why aren't you using critical thinking?!? Does any LLM instance in Claude Code have a choice about loading CLAUDE.md?" The step is gone.
- **The report's register** (a worker, on the coordinator's brief). The first version, briefed for the curator as reader, addressed him as "you". At 23:31 he asked for this neutral rewrite.

Sources:
1. The curator's messages, by `near.py`, 15:00 to 23:35 on 10-22.
2. `ae9ed0f9a`, `023481cf1`, `59bc92b7a`, `617b0d94c`, `0cbb4f5c9`, `3c8ee2acc`, `a38d1cd9c`, `91461011e`, `226e3dd97`.
