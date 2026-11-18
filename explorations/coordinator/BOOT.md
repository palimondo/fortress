<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 02:00 UTC on 2026-11-18** (03:00 his time). The session runs on Opus 5.5 (`model-now.sh` prints `claude-opus-5-5`); it was compacted at about 01:5x UTC, and the boot of 01:5x was the skill's section "The boot" (he is away: no calibration given); FACTS was read whole at run 1's landing, 22:3x on 11-17. The VM restarted at 12:56, 15:09 and 17:06 UTC on 11-17 and at 00:57 UTC on 11-18 (`uptime -s`), so the cap's next stop is about 13:57 UTC on 11-18; the trust flag held through each restart (checked again at 01:57: `True`); the backup's last line at 01:46, `push=ok`. The restart of 12:56 on 11-17 had reset the workspace's trust flag in `/root/.claude.json`, so headless sessions ignored `.claude/settings.json`'s allow list; at his explicit order of 14:2x ("you have my fucking permission to fix what the machine restart has broken") the coordinator set `projects["/home/user/fortress"].hasTrustDialogAccepted: true`. **After any later VM restart, check that flag first.** Workers are on the regular tiers since 05:56 UTC on 11-17 (`tier-mode.sh regular`).

## Running

**Run 2's preparation (Agent-tool workers):**

- **Running:** writer B (agent `a2e133ef9ad32c9f6`, launched about 01:4x): run 2's sections N, W, G and R of `CLIMB-BATCH-33.md` on run 1's landed tree, by the post-batch review's corrections (`explorations/reviews/batch-33-review.md`), F-34's measure and the Opus estimate; then `lists33.py`, its commit and its push.
- **Done:** record writer A (`f4889acd9d`, pushed): F-34 on `d3747846c1`, 13 refused in 4 kinds (varargs 9, row 315's closure class written twice 2, `WriteStream`'s `OptionUnwrapException` 1, the new wall at `__bigOperator2` 1); rows 1076 (the cast `(TraitType)receiverType` at `__bigOperator2`), 1077 (walk's `println` of `v: RR64^3`), 1078 (`VerifyError` in `simplestRationalBetween` with the verifier on), 1079 (`array1[\RR64,n\]` loads the `Array1` classes of all eight number types). Evidence: `explorations/compile-ladder/plan-33/probes/measure-d3747846c1.txt`.
- **Next, from B's notice turn:** verify B's commit; launch the manifest worker, its brief adapted from `<scratchpad>/batch31/manifest-33-brief.md`: `plan-33/manifest/gen33.py --run 2`, `check33.js --run 2` in a scratch copy, then `--write`, with run 1's gate as the comparand; `node explorations/coordinator/tools/workflow-scenarios.js`; the trial seed of `/home/user/fortress-base38` against the new base, with the check that only `explorations`, `docs` and `.claude` moved since `d3747846c1`; `old-fortress.sh`; commit and push. **Then launch run 2, climb batch 33b,** from a notice turn: `climb-batch-workflow.js` with `{"base": <main's full head>, "baseBuild": "/home/user/fortress-base38"}`, a check-in file `<scratchpad>/batch33b/checkins.txt`, six check-ins 45 minutes apart; rewrite this note.

**Run 2, climb batch 33b** (N the prelude's number types by way C's form 2, W row 315, G varargs, R rows 942, 940, 1061; about 4.5M tokens written, 10G of disk; the review's estimate 3.1M to 3.4M without G and W). After run 2: P-33's words "by a second set of the run time's value classes" are inexact for the numbers, on his review list in the record (C1), for the record-landing; fork N4 (the one library's seven number objects wait for the first program that runs on it, by P-102) on his review list. Run 2's measure line after F-34: G takes 9, W 2, which leaves 2.

**His go, 17:1x UTC on 11-17** (18:1x his time): "Okay, when these probes come back, update the plan so that if possible they can join, and you have a go for the batch." The coordinator's reading, not his words: the go covers both runs, as the ask's option 1 put it, run 2 launching when run 1 lands. The probes came back at 17:2x (`1091af31e5`): row 540 joined run 1 as rung I; varargs (row 624) and row 315 joined run 2 as rungs G and W.

**Climb batch 33, run 1, landed** at 22:36 UTC on 11-17 (`d3747846c1`, pushed, no hold; run `wf_6339efde-563`): gate green, the checker count 0 and the distance 0, microGPT's walk check 7 of 7 for both programs. The landing's steps are done: decisions named at 22:4x; the post-batch review `a6e73b8d6c` (one finding for him, fork D1 with row 1064, put to him at 23:1x as an ask: 1a as landed, 1b refuse an undefined name in a tuple arm too, recommended, 1c restore the bare binder; now PLAN item 102 and queue item 592; it holds nothing); the record-landing workflow `wf_d55ec738-a36`, ended 01:5x (record `fdd4a2cdd1`, `9f2799fb19`; skill `77a3dcd55b`, `09adb04dfa`, `8952ab6296`; folders `31c4f635d8`; the revival page `861d5b91e0`; the quiz `ad505d77e6`).

**Held for him while he is away:** P-12's change (old: "Today `fortress typecheck` checks a program only against the compiler's prelude, so it is no check of walk's programs"; new: "... checks a program against the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library, so by default it is no check of walk's programs"), and the one line for the page of `fortress-repo` changes (the three skill commits, https://claude.ai/artifact/4MiaAx2EmfK59E8d4DP9J3 , version 26). P-33's words wait for run 2's landing, by the sort.

**Done tonight:** run 2's base build `/home/user/fortress-base38` at `d3747846c1` (trial seed and old code passed; `caches-one` needs no seed); the batch script's four fixes `8109b61c63`; the arrays page with its compiled half, version 2 at https://claude.ai/artifact/7TVTSHjAtY6AvZjDztnq8q (source `<scratchpad>/arrays-primer/page.html`), its text and the transaction-checks review committed `2b9bc1fd4e`; `fortress-base37` removed.

## Done since the boot of 17:5x on 11-17

- The two tool fixes (`21af73cf48`, `7db7ce37f6`, pushed). Left by that worker, outside its limits: `codegen-measure.sh`'s header still says "24, kinds 8"; the revival page's README does not say that `docs/index.html` keeps its links.
- The record writer for 31b's leftovers (`1e9b2cf9c4`, pushed); F-318 points to row 999, which holds its two cases (NEGATIVE-BOUNDED, by reading, no reproducer).

## What waits for him, one per message

Before any of it is put to him: search his words (the record, then the transcript), and drop what they settle.

1. **Fork H2 (item 577) is settled by the record, not his to decide again.** His words of 15:13 to 15:3x on 11-17: "Didn't I already answer this? ... you have my decision recorded on file", "You need to study these documents that we've produced at great cost and be able to synthesize the design decision that matches our principles encoded in my positions", "you are still fixated on the choices A and B ... the different ways that we're probed are much more complex, and they were weighed against each other, against peers". **The coordinator's synthesis, not his words, in the carriers' review's own terms** (`explorations/reviews/carriers-ways-2026-11-13.md`): way D is way C's machinery with one name per type; inside it the one choice left is where the class comes from, and the review recommends form 2. Frame no ask in fork H2's (a)/(b).
2. Item 521 reaches him only on a real fork; the planner's probe shows none. Item 572 is on his review list as landed.
3. Fork E2 (item 586: a third exception to P-37 for `RR32`'s and `RR64`'s `=` and `=/=` in the prelude; 1a as landed), as a landed decision for review; then items 588 and 579.
4. From the older list, each still open: the APL grammar brought in line with the flat program's new spelling; the gather's refusal of a Sun or Oracle notice and the test audit's two test changes (`explorations/reviews/test-audit-batch-32-2026-11-16.md`); items 525, 529, 545, 546, 531 to 544; the five small diffs of the model from the C4 review; the layout of the model's parameters and static sizes; whether his design of the arrays starts now; items 551 to 553, 557, 524, 516 to 523; P-75; the letter to Sam Tobin-Hochstadt; the held list's trim. A letter to Eric Allen: "Later."
5. The page of `fortress-repo` changes: his comment of 11:35 on 11-16, "now there are 60 things waiting for me to review. This seems hopeless.", thread open; now 125 items.

His last words of 22:5x on 11-13, "how did you can of?", could not be read; the coordinator asked once and he did not answer: do not ask again.

## Owed by the coordinator

- **Before a batch after run 2:** the trace of `compiler_tests/OverloadReturnObjectDomain.fss:26` (row 499's tie).
- **From the skill update of 31b, the coordinator's to settle:** what either path does with a program's type that extends `QQ`; `interpreter.md`'s example of walk's refusal over a program's own trait that comprises one object, unrun and with no open row.
- **A record writer, later:** the decision docket's contradictions (`decision-docket-2026-11-15.md`), its 99 closable and 6 stale items; row 999's reproducer; `codegen-measure.sh`'s stale header line and the revival page README's line.
- **For the skill writer, at its next task with a cold read** (`tools/skill-writer.sh new <task>`, tasks in `<scratchpad>/skill-tasks/`): the held list's lines that name it; the coordinator's reading of his go of 06:4x on 11-17 as a rule; `delegating.md`'s tier rules, which still say that Fable writes no record text; the compression of `compiler.md`, `revival-changes.md` and `interpreter.md`. Held at his word, no action now: a review of the skills' evolution.
- **The removal of `explorations/coordinator/tools/huge-methods.py`**: told to him on 11-13; his to say.

## His reading, and the live pages

- The skill drafts page, https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr , version 28 (source `<scratchpad>/skill-drafts-page/page-2.html`): read whole up to item 40 at 06:25 UTC on 11-17; items 41 and 42 landed and unread; nothing under "Proposed changes"; the next item is 43.
- The page of `fortress-repo` changes, https://claude.ai/artifact/4MiaAx2EmfK59E8d4DP9J3 , version 26 (source `<scratchpad>/fortress-repo-page/page.html`; 125 items, 17 new at 26).
- The revival page, https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5 (source `explorations/coordinator/process-engineering/revival-story.html`), at climb batch 33.
- The arrays page, https://claude.ai/artifact/7TVTSHjAtY6AvZjDztnq8q , version 2.
- The house style's reference page: https://claude.ai/artifact/FoTnH7KzXt5MtGk3tTcZ8W . After a compaction, publish a page by its URL.
- His words of 14:1x on 11-10, what he wants of the project: "I wanted to learn and I am not learning much yet"; he enjoyed choosing the numerals' shape and looks forward to designing arrays.

## His standing orders, in the skills or held for them

- The register is the skill's bullet: plain short sentences, with contractions, halfway to ASD-STE100.
- Never try to delete a branch on GitHub from a cloud container, and never ask him or remind him of one.
- Read the clock before writing any time, in a call of its own; give UTC and his time. No AskUserQuestion. One ask per message, with its pushed review linked. Lists, not tables; numbers as K and M; each term defined where it is used; no bare label; no closing offer. On a page, "the coordinator", never "you".
- Before putting any point to him, search his words: the record, then the transcript. Search INDEX with `facts-extract.sh 'index:WORDS'` and read every line it prints, unbounded.
- The hook `.claude/hooks/curator-words-reminder.sh`: re-read his words, correct silently, report none of it in chat.
- A defect found goes into the gap ledger at once, by `ledger.py`. A probe's patch and report are committed under the plan's `probes/` folder.
- At a check-in, and in a worker-notice turn with nothing for him, reply "." alone. Put every result in the turn's final text. No new hooks (his answer of 20:41 on 11-16).
- Launch or resume a Workflow only from a turn that a notice, a check-in or a system notice started. Agent-tool waits stay under 240 s.

## The record, the machine

- **Commits:** by named paths only (`git add -- PATHS` for a new file, then `git commit -m MSG -- PATHS`), each ending with exactly `Co-Authored-By: Claude <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB`, with no model name, whatever footer the harness suggests. Push after every commit: `sha=$(git rev-parse HEAD) && git push --atomic origin $sha:main $sha:claude/worker-brief-fable-vnnuv8 $sha:blinded-fable`, once `git log origin/main..main` shows only commits that are yours or a worker's that are ready.
- **The boot:** the skill's section "The boot"; the full boot only at his word.
- **The machine:** worktrees `/home/user/fortress-base38` (`d3747846c1`, run 2's base build, clean; valid while `git diff --stat d3747846c1 <base> -- . ':!explorations' ':!docs' ':!.claude'` prints nothing); `/home/user/fortress-transcripts-blinded` (the backup). The scratchpad is `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad`; climb batch 33's briefs are under `batch33/`, climb batch 31's under `batch31/`.
