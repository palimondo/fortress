<!-- The report of the record post-mortem of 2026-10-20 to 22, for the curator, from MAP.md and the later commits. -->

# The record post-mortem, 2026-10-20 to 22

Times are UTC, with your time (UTC+2) in brackets.

## 1. What started it

- On 10-20 climb batch 20 landed. A climb batch changes the tree in several tasks, called rungs, and lands them together. Its first review item was item 31 of the review queue, the file of items that wait for your word: which element types a `Vector` or `Matrix` may hold.
- The landed bound, `T extends { Number, MultiplicativeRing[\T\] }`, asks every element type for times. The record said that it "bends the letter" of P-86, an entry of POSITIONS, the file of your decisions. P-86 said: a generic `Vector` or `Matrix` body is checked against what each operation needs, with no blanket ring bound that would exclude integer arrays.
- The coordinator, the Opus session you talk to, explained it three times, from 12:59 to 13:42 (14:59 to 15:42). You called the options a "cargo cult", and did not recognize P-86 as your words.
- Three fresh workers wrote the item again. An Opus and a Fable 5.1 saw the failed attempts, and said that nothing was left to decide. A blind Opus got only the first reasoning, and said that a decision was left. It alone raised the live point: microGPT's `gather` and `ravel` only copy, yet the bound asks them for times. They also disagreed on whether P-86 was your words.
- A scout, a worker that digs in the history, found that P-86 paraphrased a review by Astra, an outside assistant. Your only word behind it, on 09-26, was yes to carrying the review's checks into one batch's briefs.
- At 16:50 (18:50) you held all batches until FACTS, the file of what is true now, and POSITIONS were checked again.

Sources:
1. MAP.md, section 1; `reviews/item31-drafts.md`.

## 2. Why it happened

- **A one-time approval became a rule.** P-86 went to the history on 09-29 as carried out. On 09-30 a Fable worker that rewrote POSITIONS at your word put it back, and gave no reason. The scout calls this evidence thin.
- **The summary changed the meaning.** It kept Astra's reason that had become false, that integers have no ring, and dropped the live one: copying needs less than arithmetic.
- **Overnight rewrites ran on a general go.** Six entries, P-86 among them, were last rewritten on 10-13 under your go to run overnight.
- **The fault was wide.** The audit of 75 more entries changed or held 50: status lines, factual errors, one-time approvals, defaults, and wording away from your meaning. "Answer pending" for item 31 stood in five files.
- **The revival part grew.** This part of the worker skill, the rules that bind workers, tells how revived Fortress departs from the original. It grew from 8K to 74K characters in 12 days, mostly by updates after landings.
- **The gap ledger drifted.** The ledger lists the gaps between the team's design and the tree. Its tool could not rewrite a row, so 117 notes were refused, and the coordinator left the fix as a review item.

Where the analyses disagree:
- At 16:53 (18:53) the coordinator blamed its framing. Its own check at 17:28 (19:28) found that the blind Opus, given that framing, raised the live point.
- You blamed its long context, the "dumb zone" at 537K tokens.
- Astra calls the growth "a conflict in the writing instructions, not simply a writer forgetting to be concise".
- The coordinator said that no word of yours stood behind the change of 09-30. The scout found your word for the rewrite, but none for P-86's return.
- At 22:02 on 10-22 (00:02) you named one more cause: your off-hand remarks turn into "words of gospel" in POSITIONS.

Sources:
1. `item31-drafts.md`, Part 4; the audit's two `RESULTS.md` files.
2. `revival-part-use-2026-10-21.md`; `revival-record-synthesis.md`; the ledger health report.

## 3. What was done

Sizes are in characters.

1. **The provenance audit** asked whether each POSITIONS entry is your decision, faithfully recorded. A trial on ten entries, on 10-21 at 20:54 (22:54), caught P-86, struck at your yes at 23:00 (01:00); item 31 took its live point. The full run on 75 entries was applied at your word of 08:19 (10:19). Four entries were struck in all. POSITIONS: 85 entries and 44.4K to 81 and 44.6K.
2. **The clarity rewrite** made each entry read on its own. POSITIONS: 65 of 71 entries rewritten, 6 held, 44.6K to 79.8K. FACTS: 198 entries judged by six checks, 13 held, split into 208, 140.1K to 222.8K.
3. **The scrape.** At 12:37 (14:37) a deletion-only pass cut "Built.", "Still to build:" and the pointers to PLAN, the working plan, and to the queue. POSITIONS fell to 74.0K, FACTS to 220.6K.
4. **The follow-up.** At 16:28 (18:28) you approved none of the drafts. At 22:12 (00:12) you said "apply all the improvements drafted", without a review of each. 22 decisions changed, and two stayed. Three facts now state agents' choices, and the queue items on them name those facts. Rows 795 to 799 were filed; three drafted rows that repeated the record were dropped. Items 268 to 276 wait for your later review, and no work waits on them. The audit page, version 15, shows each change as a diff. POSITIONS ends at 74.8K, FACTS at 221.4K.
5. **The orientation.** A workflow with a loss check, cold reads by fresh workers, a quiz and a judge rebuilt the revival part as a short account that every worker reads whole. Installed at 14:08 (16:08): 74.3K to 15.8K.
6. **The gap ledger.** A check found about 180 of 439 open rows that need a change. `ledger.py` gained `rewrite` and `landing-check`. A clarity run rewrote 53 of 58 rows. The ledger went from 793 to 798 rows. Item 277 was filed: one probe of whether the compiled checker still refuses microGPT's `10.0^(-5)`.
7. **The skills.**
   - By 14:26 (16:26): the consolidation tools, entries with no plan or status, every writer on Opus, the orientation.
   - At 22:20 (00:20), approved word for word: a decision may point to a fact that it rests on, and a worker's landed choice is a FACTS entry that its review item names. This replaced "It lists no FACTS entries", which 24 of 81 decisions broke.
   - At 22:46 (00:46): PLAN, 162K, left for a later cleanup beside the batches.
   - At 22:56 (00:56): an optional light boot, which skips FACTS, POSITIONS and INDEX at your word; the session then searches the record before it states a fact or a decision.
   - From 23:06 to 23:18 (01:06 to 01:18): the worker skill loads first, since a model reads a glossary differently in the other order, as the coordinator skill's description and `CLAUDE.md` now say. The boot no longer rereads `CLAUDE.md` and the coordinator skill, which are in context already, and the coordinator's README no longer copies the boot list.
   - At 23:11 (01:11): why six boots failed. After a compaction, Claude Code re-attaches the skill copy that the Skill tool last loaded. The boot had used the Read tool since 10-13, so it got a copy of 10-13 that names a deleted file. The compaction hook now loads both skills with the Skill tool.

The review queue grew from 185 to 257 open items.

Sources:
1. MAP.md, sections 2, 4 and 5; the commits on `main` to 23:18 (01:18).

## 4. The reusable tools

- **The mining workflow** traces each POSITIONS entry to your words or to an agent. Run it on untraced entries, before a clarity rewrite.
- **The clarity workflow** rewrites entries to read on their own. Run it when they don't.
- **The orientation workflow** updates the revival part after each landing, and rewrites it whole when a cold read or its quiz fails. The update has not run yet.
- **The ledger clarity workflow** rewrites open rows to state each gap as it stands now. Run it on the 180 stale rows.
- **`ledger.py landing-check`** runs at every landing.
- **`record.py note`** corrects an entry's history only. Run it on the 11 history blocks that name the wrong commit.

Sources:
1. Each tool's `README.md`.

## 5. How the record is kept now

What each file holds:
- POSITIONS: only your decisions, with why, where, and what each asks.
- FACTS: what is true now, with its conditions, evidence and meaning. An agent's landed choice is a fact that says so.
- Each entry reads on its own, states the present, and holds no plan or status.
- The history files: how each entry came about, and your dictated words.
- PLAN: phases, your questions, parked items. The queue: what waits for you. The boot note: what runs now.

Which way pointers go:
- PLAN and the review queue point to entries and rows. No entry points back.
- FACTS and POSITIONS point both ways: a fact names the decision that it builds, and a decision may name a fact that it rests on.
- "Row N" always means a gap-ledger row.

Who writes what, and when:
- The coordinator writes your decision in the next commit, and its own proposal only at your yes.
- A worker writes FACTS or POSITIONS only when its brief allows. Otherwise it reports complete findings.
- The pass, by the coordinator or a batch's commit stage, sets each entry's final wording, when a worker finishes and at each landing.
- At each landing the orientation update runs, and the landing check must print nothing.
- Only `record.py` writes FACTS and POSITIONS, and only `ledger.py` the ledger. Every writer is Opus.
- The coordinating session loads the worker skill, then the coordinator skill, and boots by the latter, in steps 0 to 6.

Sources:
1. On `main`: the coordinator skill's `SKILL.md`, `record.md`, `batch.md` and `delegating.md`; `fortress-repo`'s `records.md`.

## 6. What it cost

Tokens written: input plus prompt-cache writes, each message once, measured by the scout with `spend.py` unless marked.
- Item 31's workers and scout: 0.84M. The revival-part scout and scripts: 0.91M.
- The audit: trial 2.85M, against an estimate of 2.0M; full run 19.3M, against 16M to 17M.
- The clarity rewrite: POSITIONS 8.0M, with its judge stage and one FACTS chunk; FACTS 15.7M, against an estimate of 9M.
- The orientation 1.9M, the ledger run 2.6M, the follow-up 1.2M, other workers about 4.7M.
- **Total, 10-20 13:40 to 10-22 22:38 (15:40 to 00:38): about 58M.**
- Outside the total: the coordinator's own session, 4.3M; this report and its map, about 0.6M, estimated.
- The record's 0.66M for the P-86 scout counted some messages more than once; counted once each, it was 0.35M.
- About 5M are left until the weekly reset at 10:00 on 10-23 (12:00), an estimate.

Sources:
1. MAP.md, section 8; the 16 headless sessions measured again: 3.43M.

## 7. What is still open

- **In the review queue**: item 31, with a probe of whether the team's conditional extension fits, since you reject "add times"; 73 new items, 205 to 277; the held entries, four decisions on your answers, two more, and 13 facts.
- **Two ledger questions**, rows 219 and 555, unfiled. In the ledger run's folders.
- **PLAN's consolidation.** In PLAN.
- **Climb batch 21's preparation**, after the reset; its launch needs your go. In PLAN and the boot note.
- **Four asks of the 10-19 post-mortem**: who decides changes to the coordinator skill; `AnyList`'s two methods; a landing page per batch; push notifications that name the batch. In that post-mortem.
- **In the boot note**: the repair of 180 stale rows, after the reset; a one-line skill fix, that every ad hoc headless run passes `--session-id`; 11 history blocks; the revival page; two probes' advice; this report's page.

The map's owed change to the rung brief is done: the batch script has made it since 12:16 (14:16).

Sources:
1. MAP.md, section 9; the boot note; the batch script.

## 8. What to watch for

- **A go or a remark that becomes a rule.** Guard: write a one-time go nowhere, and a proposal only at your yes. These rules date from 10-13. Only the mining workflow checks old entries.
- **A summary that drifts from your words.** Guard: quote you only where the words decide, and check a condensed text against them. No tool checks this.
- **An agent's choice read as your decision.** Guard: it is a FACTS entry that says so.
- **The revival part growing again.** Guard: the orientation update, untested until the next landing.
- **Stale ledger rows.** Guard: `rewrite` and the landing check.
- **A stale skill after a compaction.** Guard: the hook loads both skills with the Skill tool.
- **Test runs that read as your words.** Three headless test prompts, from 22:56 to 23:10 (00:56 to 01:10), ran without `--session-id`, so they sit in this session's transcript like your messages. No guard yet.
- **microGPT's `10.0^(-5)`**, which the checker may still refuse. Guard: item 277's probe.
- **A synthesis that hides a disagreement.** Nothing guards this. A blind fresh worker caught it.

Sources:
1. The coordinator skill on `main`; `4f2257485`; `e067a7403`.
