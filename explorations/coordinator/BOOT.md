<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 12:30 UTC on 2026-11-24** (13:30 his time), written whole at his compaction ask. The session runs on Fable 5.2 (`claude-fable-5-2`); after the compaction he sets the reasoning effort from extra high to high. Boot by the skill's section "The boot". The VM last restarted at 12:25:23 UTC (trust flag true, backup run by hand, nothing lost); the context survives a process stop. No worker runs. Check-in 14 (`trig_019VZjgjT95Qekmbi1PdvzYE`, 12:27) was the last one armed.

## The order of work

Its home is `PLAN.md`, "Where we stand", "Next": before run 2 of climb batch 36 (climb batch 36b: F, Y, B, T; his go of 07:2x stands, held at his word) the record-landing workflow is fixed so that it consolidates FACTS after each landing, FACTS is compressed again, and the fixes that P-181 asks are planned as rungs. Run 1 landed at `61b50cd34a`; its review and record-landing are done.

## First work after the boot: the fix of the landing workflow and the compression of FACTS

His orders of 07:35 and 09:20: "We designed a process that consolidated the record. That process has a failure somewhere because it's not doing its job of consolidating the record. ... we need to address this, compress the facts again. Of course, keeping the clarity high. Fix the landing workflow so that the consolidation happens after each landing. ... There should be clear demarcation about things that go into the facts and which go to the facts history."

The evidence, pushed, under `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/`: read the "in short" sections of `consolidation-of-october.md` and `landing-workflow-traced.md` before the proposal. What he was told:

- **What made the consolidation of 10-13 work** (FACTS 258K to 90K, median entry 576): the writers' brief "Your default is to cut. A check that nothing is lost is not your goal; the history file and the reports already keep everything."; a hard limit per chunk, "the chunk's total is under 600 characters times its staying entries" (83% of the cutting); each cut named where its text lives; a test of decisions on the shortened record (kit: `process-engineering/record-test/`); his read of old and new texts on a page.
- **What went wrong:** none of the first four reached a rule or a tool. `record.md` kept only "near 600 characters ... a check, not a cap". The record-landing workflow was built on the clarity writer's method; its design note says it "does not do [a consolidation's] job" (`process-engineering/record-landing-workflow.md:143`); on 11-02 `5114bfeceb` gave it that job in the skill's words, in place of "Run it on FACTS before each batch launches". In a run the worker's draft is the baseline, the checker fails a cut as "less than its ground", every cold-read fix adds words, and 115 of 299 long entries are never in a run's reach. The rung's brief asks the draft for file, line and test (`climb-batch-workflow.js:623`).

**The coordinator's proposal, not yet put to him and not his word:** (A) the record-landing workflow gains the consolidation's instruments for the batch's entries (the default to cut; 600 characters times the entries as a check that fails; each cut names its home; the checker checks that the home holds the cut; a test of decisions on a sample; the rung's brief asks no file, line or test in the draft); (B) one consolidation of all 339 entries by the method of 10-13, a pilot page for him first (600 times 339 is 203K, near the 222K that he accepted on 10-22); (C) the line between FACTS and its history, tests included, as one ask with the pilot ("There should be no tests named" is not yet a decision of his). Put it to him short, one ask at a time, as principles. The workflow's briefs are a tool's: their change is proposed to him.

## Decided and done today

- **P-181**, the order of declarations never decides a call (`e77b773c9c`, his yes at 09:01; forks 1a and 2a; the three smaller fixes agreed 08:53). Rows 1136 and 1141 to 1147; review `explorations/reviews/tie-rule-2026-11-24.md`; queue item 419 answered. Owed, one ask: its last sentence naming the rows, short, shown to him first, and whether it names rows 551 and 735.
- **The `coordinator` skill, changed at his comments on the page of skill drafts** (all pushed): the boot note's rule, in his approved words (`e514909ea4`): "The boot note carries the state across a compaction. Rewrite it whole when the curator asks if you can be compacted, and push it before you answer."; "When a decision lands, write it in FACTS and tell the curator in one line." (`16772155a9`); drafts 70 to 76 landed (`642b87f881`, `b687029d61`: the review queue is the one home of a question); a comment on an item marks every item above it read, and a held line leaves only when its point is addressed, a question may move to the queue (`13d7a32cf2`); cuts `b9f1cb04dc`, `e24fb504ba`, `bc90e68e32`. Drafts 77 to 79 (an "exit" for each held line) are withdrawn at his word. `batch.md`, "While it runs": a compaction ask during a batch's gather waits for the push.
- **The held list** went from 84K to 13K: 88 addressed lines removed with evidence (`postmortem-2026-11-24-held-list/evidence/`), 12 questions moved to the review queue (items 622 to 630 new; in items 212, 319, 551 and 552), 19 lines stay (12 pieces of work, 4 rules for the skill writer, 3 moments for analysis).
- The numerals page, the revival page (version 45) and the page of `fortress-repo` changes (version 39) were given to him.

## The numerals: his two steps

His words of 07:2x: "We will have to review this together in code, and then we will have to check why did I have to re-explain this so many times. ... after I am 100% sure that the original team's design from the specification as I interpreted it is landed in the code base, we will go through all the touch points for this code and find out where or what was misdirecting you." Step 1: the page "Numerals: words and code", https://claude.ai/artifact/Gfba5tyT2FJzPnnSrw33aC (watched; source `<scratchpad>/numeral-review/page.html`); the review in code is his to start. **Row 1148 for that review:** `AnyIntegral`'s coercion calls `z.asZZ32` and `z.asZZ64` (`Library/FortressLibrary.fss:743-748`), four tests call a method in a coercion's body, and rung N kept them by its decision D10, reading P-174's "no method invocation" as "no getter on the four numbers"; P-174's last sentence, changed by the landing, does not name row 1148. Rows 1131 and 1132 are the compiled path's departures. Step 2, the post-mortem, extends `explorations/coordinator/postmortem-2026-11-09-numerals/`.

## What waits for him

No ask is put and unanswered. The next questions, by review-queue number: 622 (which open rows P-180 makes a batch fix), 630 (the scope of his rule to launch at the planner's defaults), 212 and 319 (needed by the switch-over), then 551, 552, 623 to 629. Item 621 (fork K1) and row 1098 (item 616) come with the batch after climb batch 36.

## Owed work

- Drafts 70 to 76's five lines beside the skill: PLAN's 37 groups "Climb batch N, listed for his review" move to `PLAN-history.md`, and "Pavol's answers, in the order they are needed" becomes a pointer to the queue; the queue's head section "When each item is needed" goes; `tools/record-landing/routing.md` and `climb-batch-workflow.md`, "After the landing", step 2, lose their review lists.
- B1's three revisions (B1.17 the go, B1.20, B1.22), proposed on threads on 11-23, to be cold-read together and put on the page as drafts; B2 is rejected.
- The 12 pieces of work on the held list, which get a place in PLAN, the minimal pass over the skills (834K characters) and the review of how instructions are split between the core and the parts among them.
- The page of skill drafts: the read-mark sentence and the held-list sentence of `13d7a32cf2` were shown to him in chat, not as items.

## Owed by the coordinator, from before today

- Done: PLAN's "Where we stand" cut from 16.2K to 4.7K characters, the cut text moved to `PLAN-history.md` (`145afe0134`; said to him at 00:3x UTC on 11-24).
- The process review's own fixes: C1's rest, C2, C3, C4 (each a `coordinator` skill change by the skill writer and a cold read).
- For the skill writer, at its next task with a cold read: `delegating.md`'s tier rules (Fable writes no record text); the compression of `compiler.md`, `revival-changes.md` and `interpreter.md`; whether a part cites FACTS entries; F-404's clause on `worktrees.md:45`, owed again after the skill update.
- From earlier checks: item 599's entry (B4); the measure script's header (B6); row 1089's compiled `XXX` test (C111); the batch file's header comment (C116); what either path does with a program's type that extends `QQ`; `interpreter.md`'s example of walk's refusal over a program's own trait that comprises one object; the decision docket's contradictions; row 999's reproducer; `codegen-measure.sh`'s header; the revival page README's line. The removal of `explorations/coordinator/tools/huge-methods.py` is his to say.

## The live pages

- The page of skill drafts, https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr (source `<scratchpad>/skill-drafts-page/page-2.html`), version 33: cleared at his word of 12:20 UTC ("clear the page right now of the debris. I want to see what you'll do with a clean slate next time"); he has read everything up to item 95; the next item is 96.
- The page of `fortress-repo` changes, https://claude.ai/artifact/4MiaAx2EmfK59E8d4DP9J3 , version 39 (source `<scratchpad>/fortress-repo-page/page.html`): read up to change 41; the next new change is 203. Its form is queue item 625.
- The revival page, https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5 , version 45 (`a5ea530560`).
- The numerals page, https://claude.ai/artifact/Gfba5tyT2FJzPnnSrw33aC . The arrays page, https://claude.ai/artifact/7TVTSHjAtY6AvZjDztnq8q , version 3. The speed roadmap's page, https://claude.ai/artifact/1NjFC64pkL6UaTN7CtsoUc , version 2.
- The house style's reference page: https://claude.ai/artifact/FoTnH7KzXt5MtGk3tTcZ8W . After a compaction, publish a page by its URL.

## His standing orders, in the skills or held for them

- The register: plain short sentences, with contractions, halfway to ASD-STE100. Lists, not tables; numbers as K and M; each term defined where it is used; no bare label; no closing offer. On a page, "the coordinator", never "you".
- Read the clock before writing any time, in a call of its own; give UTC and his time. No AskUserQuestion. One ask per message.
- Before putting any point to him, or explaining or defending a rule, search his words: the record, then the transcript. Where his intent and the record's words differ, check the record against his intent, not his words against the record.
- Show him the exact words before writing a decision of his ("Show me now what you write. I don't trust you!", 13:0x on 11-23).
- The test suites are the gate: no comparison of printed output with an earlier run (P-103; his order of 22:35 on 11-23).
- Never try to delete a branch on GitHub from a cloud container, and never ask him or remind him of one.
- A defect found goes into the gap ledger at once, by `ledger.py`; a defect is fixed as the work goes (P-180).
- At a check-in, and in a worker-notice turn with nothing for him, reply "." alone. Put every result in the turn's final text. No new hooks.
- Launch or resume a Workflow only from a turn that a notice, a check-in or a system notice started. Agent-tool waits stay under 240 s.
- His rule of 11-18: "state what the expected failure is, then run it." Decline a cold-read flag whose fix is a list of cases. Judges only read and run nothing.

## The record, the machine

- **Commits:** by named paths only (`git add -- PATHS` for a new file, then `git commit -m MSG -- PATHS`), each ending with exactly `Co-Authored-By: Claude <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB`, with no model name. Push: `sha=$(git rev-parse HEAD) && git push --atomic origin $sha:main $sha:claude/worker-brief-fable-vnnuv8 $sha:blinded-fable`, once `git log origin/main..main` shows only commits that are yours or a ready worker's.
- **The boot:** the skill's section "The boot"; the full boot only at his word.
- **After any VM restart:** check `projects["/home/user/fortress"].hasTrustDialogAccepted` in `/root/.claude.json` first, then run the backup by hand if its last line predates `uptime -s`.
- **The machine:** the base build `/home/user/fortress-wsuite` (`4b0e3abd6a`), where nobody builds or runs; the old base builds are removed; `/home/user/fortress-transcripts-blinded` (the backup). Workers on the regular tiers. The scratchpad is `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad`.
