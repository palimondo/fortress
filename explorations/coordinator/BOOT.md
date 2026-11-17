<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 18:02 UTC on 2026-11-17** (19:02 his time). The session runs on Opus 5.5 (`model-now.sh` prints `claude-opus-5-5`); he compacted it at about 17:4x UTC, and the boot of 17:5x was the skill's section "The boot"; FACTS is read whole at the next batch landing. The VM restarted at 12:56, 15:09 and 17:06 UTC (`uptime -s`; the session's process started 17:06:26), so the cap's next stop is about 06:06 UTC on 11-18; the trust flag held through each restart. The restart of 12:56 reset the workspace's trust flag in `/root/.claude.json`, so headless sessions ignored `.claude/settings.json`'s allow list and the skill writer could not run commands; at his explicit order of 14:2x ("you have my fucking permission to fix what the machine restart has broken") the coordinator set `projects["/home/user/fortress"].hasTrustDialogAccepted: true` (the auto-mode check had refused it on his earlier, less explicit message) and checked that a headless session no longer prints "Ignoring ... permissions.allow". **After any later VM restart, check that flag first.** Workers are on the regular tiers since 05:56 UTC (`tier-mode.sh regular`).

## Running

**Climb batch 33, run 1**, launched 17:42 UTC (18:42 his time) on his go: run `wf_6339efde-563`, task `wjnd5jcel`, base `1609258002b016489c96bd6e438389e89773b9eb`, base build `/home/user/fortress-base37`; rungs S (the library selector), D (row 959, slug `rung-typecase-unbound-arm`), V (rows 812, 822), Q (item 572: rows 1051, 1050, 1052), I (row 540), C (rows 1005, 1028, 1029, 1060). Estimate 4.6M tokens written (5.4M with reserve), about 4 h. The run's ID, its args byte for byte and the six check-ins' IDs (18:28 to 22:13 UTC, 45 minutes apart; the last arms three more) are in the check-in file `<scratchpad>/batch33/checkins.txt`. From the gather's start until the batch's push, change nothing in the main tree.

**His go, 17:1x UTC** (18:1x his time): "Okay, when these probes come back, update the plan so that if possible they can join, and you have a go for the batch." The coordinator's reading, not his words: the go covers both runs, as the ask's option 1 put it, run 2 launching when run 1 lands. The probes came back at 17:2x (`1091af31e5`): row 540 joined run 1 as rung I; varargs (row 624) and row 315 joined run 2 as rungs G and W.

**At run 1's landing:** the steps of `references/batch.md`, "The landing" (FACTS read whole first, since the boot fell outside a landing). **Then run 2, climb batch 33b** (N the prelude's number types by form 2, W row 315, G varargs, R rows 942, 940, 1061; about 4.5M tokens written, 10G of disk): its sections read again on run 1's landed tree, R's naming V's change at `STypesUtil.scala:1587` (review B2), N's reading I's landed cast; the batch script's three fixes (below), between the runs; a new base build at run 1's landing; the block by `plan-33/manifest/gen33.py --run 2` and `check33.js --run 2 --write`, with the comparand of run 1's gate; then its launch on the same go. Run 2's estimate by the review is 3.1M to 3.4M without G and W (B4). After run 2: P-33's words "by a second set of the run time's value classes" are inexact for the numbers, on his review list in the record (C1), for the record-landing; fork N4 (the one library's seven number objects wait for the first program that runs on it, by P-102) on his review list.

**The record of the preparation:** the planner (`db0ba4d1d9`, `c18fba888b`, `91029fdea7`, `1091af31e5`; `plan-33/PROBES.md`): way C's form 2 for the prelude's seven number types held in scratch, both compiled tracks passing but for four tests that the decision itself changes; item 521 has no fork. The Fable review (`2783d2242f`, `climb-batch-33-review.md`): no consequential fork, 12 corrections. The manifest (`1609258002`): D's slug renamed from `rung-typecase-undefined-arm`, which the scenarios' slip check reads as a templating slip.

## Done since the boot

- The two tool fixes (`21af73cf48`, `7db7ce37f6`, pushed): `plan-25/probes/cgkinds.py` counts each refused declaration once, by component and span, so the measure prints 17 on `measure37`'s saved run; `revival-page/update.py`'s `write_pages` keeps `docs/index.html`'s other links, the walk-through's among them. Left by that worker, outside its limits: `codegen-measure.sh`'s header still says "24, kinds 8"; the revival page's README does not say that `docs/index.html` keeps its links.
- The record writer for 31b's leftovers (`1e9b2cf9c4`, pushed): PLAN's "Where we stand" and the queue's paragraph on items 513 and 514 in line with item 513 ("Not open"); items 518 and 519 moved to 31b's review list by his word of 06:4x (PLAN items 97 and 98, the old text in PLAN-history); F-372, F-374, F-375 name the planner for forks M1, M2, A1, V1, V2; item 576's home names F-377; P-166 grounds `value object ZZ` in P-178's merge (told to him at 18:0x, old and new words); F-257, F-34, F-240 were already right; F-318 points to row 999, which holds its two cases (NEGATIVE-BOUNDED, by reading, no reproducer).

## What waits for him, one per message

Before any of it is put to him: search his words (the record, then the transcript), and drop what they settle.

1. **Fork H2 (item 577) is settled by the record, not his to decide again.** His words of 15:13 to 15:3x: "Didn't I already answer this? ... you have my decision recorded on file", "You need to study these documents that we've produced at great cost and be able to synthesize the design decision that matches our principles encoded in my positions", "you are still fixated on the choices A and B ... the different ways that we're probed are much more complex, and they were weighed against each other, against peers". **The coordinator's synthesis, not his words, in the carriers' review's own terms** (`explorations/reviews/carriers-ways-2026-11-13.md`): way D is way C's machinery with one name per type; inside it the one choice left is where the class comes from, and the review recommends form 2 (the code generator writes the value object's class over a small hand-written payload base: no stubs, a constructor chain of three classes). Frame no ask in fork H2's (a)/(b), which were the planner's shorthand; (a) is none of the review's ways.
2. Item 521 reaches him only on a real fork; the planner's probe shows none (`CLIMB-BATCH-33.md`, section 2, "Item 521, answered by the probe"), on his review list from the record. Item 572 is on his review list as landed.
3. Fork E2 (item 586: a third exception to P-37 for `RR32`'s and `RR64`'s `=` and `=/=` in the prelude; 1a as landed, the default and the review's recommendation), as a landed decision for review; then items 588 (run 2's forks taken at the planner's defaults) and 579 (`m[i, j] := v` at a pair index).
4. From the older list, each still open: the APL grammar brought in line with the flat program's new spelling (the coordinator's proposal of 07:4x on 11-16); the gather's refusal of a Sun or Oracle notice and the test audit's two test changes (`explorations/reviews/test-audit-batch-32-2026-11-16.md`); items 525 (fork W at (a)), 529, 545, 546, 531 to 544; the five small diffs of the model from the C4 review; the layout of the model's parameters and static sizes; whether his design of the arrays starts now; items 551 to 553, 557, 524, 516 to 523; P-75; the letter to Sam Tobin-Hochstadt; the held list's trim. A letter to Eric Allen: "Later."
5. The page of `fortress-repo` changes: his comment of 11:35 on 11-16, "now there are 60 things waiting for me to review. This seems hopeless.", thread open; now 108 unread items.

His last words of 22:5x on 11-13, "how did you can of?", could not be read; the coordinator asked once and he did not answer: do not ask again.

## Next

Check-ins during run 1: check the journal, resume if a stop killed it, reply ".". At its landing, the steps above.

## Owed by the coordinator

- **The batch script's three fixes, between run 1 and run 2, not while a run uses the script:** the `skill-touched` check over the batch's own commits, the second gate's reach, the harness's 'Saw failure' with no exit code. Also before a batch after: the trace of `compiler_tests/OverloadReturnObjectDomain.fss:26` (row 499's tie).
- **From the skill update of 31b, the coordinator's to settle:** what either path does with a program's type that extends `QQ` (no record; leave, state P-178 as covering it, or a probe and a row); `interpreter.md`'s example of walk's refusal over a program's own trait that comprises one object, unrun and with no open row (a row, a cut, or as is).
- **A record writer, later:** the decision docket's contradictions (`decision-docket-2026-11-15.md`), its 99 closable and 6 stale items; row 999's reproducer; `codegen-measure.sh`'s stale header line and the revival page README's line.
- **For the skill writer, at its next task with a cold read** (`tools/skill-writer.sh new <task>`, tasks in `<scratchpad>/skill-tasks/`): the held list's lines that name it; the coordinator's reading of his go of 06:4x as a rule, not his words (a planned batch's fork with a planner's default lands and is reviewed after; the held list has his words); `delegating.md`'s tier rules, which still say that Fable writes no record text; the compression of `compiler.md`, `revival-changes.md` and `interpreter.md`. Held at his word, no action now: a review of the skills' evolution, the distribution of their instructions between the router, `SKILL.md` and the parts.
- **The removal of `explorations/coordinator/tools/huge-methods.py`**: told to him on 11-13; his to say.

## His reading, and the live pages

- The skill drafts page, https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr , version 28 (source `<scratchpad>/skill-drafts-page/page-2.html`): read whole up to item 40 at 06:25 UTC; items 41 and 42 landed and unread; nothing under "Proposed changes"; the next item is 43.
- The page of `fortress-repo` changes, https://claude.ai/artifact/4MiaAx2EmfK59E8d4DP9J3 , version 25 (source `<scratchpad>/fortress-repo-page/page.html`, builder `build-v25.py` beside it; 108 items, changes 39 to 146 unread, the next new change 147).
- The revival page, https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5 , version 37 (source `explorations/coordinator/process-engineering/revival-story.html`), at climb batch 31b.
- The house style's reference page: https://claude.ai/artifact/FoTnH7KzXt5MtGk3tTcZ8W . After a compaction, publish a page by its URL.
- His words of 14:1x on 11-10, what he wants of the project: "I wanted to learn and I am not learning much yet"; he enjoyed choosing the numerals' shape and looks forward to designing arrays.

## His standing orders, in the skills or held for them

- The register is the skill's bullet: plain short sentences, with contractions, halfway to ASD-STE100 (his "Rejected. Original wording stays." of 06:16 on draft 38).
- Never try to delete a branch on GitHub from a cloud container, and never ask him or remind him of one.
- Read the clock before writing any time, in a call of its own; give UTC and his time. No AskUserQuestion. One ask per message, with its pushed review linked. Lists, not tables; numbers as K and M; each term defined where it is used; no bare label; no closing offer. On a page, "the coordinator", never "you".
- Before putting any point to him, search his words: the record, then the transcript.
- The hook `.claude/hooks/curator-words-reminder.sh`: re-read his words, correct silently, report none of it in chat. A line in the held list, this note or POSITIONS says what he decided in his words; a proposal of the coordinator's is marked as its own.
- A defect found goes into the gap ledger at once, by `ledger.py`. A probe's patch and report are committed under the plan's `probes/` folder.
- At a check-in, and in a worker-notice turn with nothing for him, reply "." alone. Put every result in the turn's final text. No new hooks (his answer of 20:41 on 11-16).

## The record, the machine

- **Commits:** by named paths only (`git add -- PATHS` for a new file, then `git commit -m MSG -- PATHS`), each ending with exactly `Co-Authored-By: Claude <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB`, with no model name, whatever footer the harness suggests. Push after every commit: `sha=$(git rev-parse HEAD) && git push --atomic origin $sha:main $sha:claude/worker-brief-fable-vnnuv8 $sha:blinded-fable`, once `git log origin/main..main` shows only commits that are yours or a worker's that are ready.
- **The boot:** the skill's section "The boot"; the full boot only at his word.
- **The machine:** worktrees `/home/user/fortress-base37` (`c3b16ef2d1`, the landed tree's base build for the batch after, its trial seed passed; valid while `git diff --stat c3b16ef2d1 <base> -- . ':!explorations' ':!docs' ':!.claude'` prints nothing); `/home/user/fortress-transcripts-blinded` (the backup, `push=ok` at 17:47). The scratchpad is `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad`; climb batch 31's briefs are under `batch31/`.
