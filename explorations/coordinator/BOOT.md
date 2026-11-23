<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 08:4x UTC on 2026-11-23** (09:4x his time). The session was compacted after climb batch 34b's landing, and booted light at his "Boot light" on 11-21 (the skill's section "The boot"). The VM restarted at 08:32:22 UTC on 11-23 (`uptime -s`): trust flag `True`, the backup re-run by hand at 08:36, `push=ok`, no rollback (`main` at `072bee4e15`, as pushed). The session runs on Opus 5.5 (`model-now.sh` prints `claude-opus-5-5`). **The next process stop is about 21:32 UTC on 11-23.** Nothing runs; no check-in is armed. **His reading of the page of `fortress-repo` changes:** read up to change 41 (his word of 08:3x UTC on 11-23); his ten comments on changes 39 to 42, not sent to Claude, are on the held list's first section, answered in chat.

## Landed since the last compaction

- **Climb batch 34, run 1**, at 19:13 UTC on 11-20 (`285efad802`; run `wf_b2847bd4-92c`, killed by the VM restart of 17:06 and resumed at 17:08): rungs L, P, T, G and F; rows 1076, 1078, 993 and 1090 closed, 1093 to 1096 opened. Its landing is done: the post-batch review `2ea1ad1648` (`explorations/reviews/batch-34-review.md`; finding A1, the expected-failure line never written, answered by way 3 below); the record-landing `wf_df6b93cb-3bf`; the page of `fortress-repo` changes at version 31 and the revival page at version 40, both told to him at 22:0x on 11-20.
- **Climb batch 34b, run 2**, at 01:11 UTC on 11-21 (`295c215c2c`; run `wf_c13d405d-3be`): rung C; `Hello` runs compiled against the one library in the onelibrary track with the verifier on (F-396); rows 874 and 1062 closed, 1098 to 1103 opened (1098 `CONTESTED`). Its landing is done: the post-batch review `00bde0ee4e` (`explorations/reviews/batch-34b-review.md`: no finding changes a decision of his; the rule's new form met in all seven first runs; the run 2.10M written against 2.4M); the record-landing `wf_a4427a24-bae` (record `b5a4765829`, `8965c32e03`, items 616 to 620; skill `2d194074ed`, `e8091fa2a4`; folders `07e70adda7`; no POSITIONS change); its revival-page step stopped (`update.py` found no "from the base `HASH`" in the gather record), so the coordinator ran `update.py --landing 34b --run-start 2026-11-20T22:04` (`1327606f0d`) and published version 41.
- **The expected-failure rule's way 3** (review-queue item 608, taken by the coordinator, for his review as landed): the `Expected failure:` line echoed in the Bash call that first runs the test, before the harness command; the batch script and manual `8bb71dca94`, `tests-writing.md` `82bb989f2f` and `272357f603`.
- **The speed roadmap**, at his request of 15:3x UTC on 11-20: `explorations/reviews/speed-roadmap-2026-11-20.md` (`04921293b7`, `4be32054bb`), evidence beside it; page https://claude.ai/artifact/1NjFC64pkL6UaTN7CtsoUc , version 1 (source `<scratchpad>/hpc-roadmap/page.html`, built by `build-page.py` there). Its decisions for him are in its section 1, none asked yet. Its measurements (section 11) wait for a quiet machine, the Java probe of the ceiling first. Row 1092 filed from it (`RR32` has no `exp`, `log` or trigonometric function).

## Told to him at the boot's message of 07:5x on 11-21

The page of `fortress-repo` changes at version 32 for 34b's landing (`2d194074ed`, `e8091fa2a4`); the revival page at version 41; that POSITIONS did not change.

## What waits for him, one per message

Before any of it is put to him: search his words (the record, then the transcript), and drop what they settle.

1. **P-164's sentence**, held by the 34b record-landing's judge for his word. Old: "At the switch-over, the run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits, and the boxed-type table's two entries and `fileOps`' raise strings name the one library's types." The proposal: `explorations/compile-ladder/climb-batch-34b/record-landing/diff.md`, C21. An ask.
2. **Row 1098** (review-queue item 616), which export rule holds; no default; the review proposes the note's rule after a scout dates it. Needed before the batch after.
3. **Item 608**, way 3 of the expected-failure rule, as landed, for his review.
4. **The page of `fortress-repo` changes and its growth**: his objection of 06:3x UTC on 11-19; the scout's history `<scratchpad>/page-archaeology/evidence.md` given to him; he is deciding, his priority before the next batch.
5. **The Fable judge's effort:** the coordinator's proposal of 06:2x on 11-19, the second ruling at `high`, no answer yet.
6. **The speed roadmap's decisions**, its section 1.
7. From the older list, each still open: fork E2 (item 586, as landed), then items 588 and 579; item 521 only on a real fork; item 572 as landed; the APL grammar brought in line with the flat program's spelling; the gather's refusal of a Sun or Oracle notice and the test audit's two test changes (`explorations/reviews/test-audit-batch-32-2026-11-16.md`); items 525, 529, 545, 546, 531 to 544; the five small diffs of the model from the C4 review; the layout of the model's parameters and static sizes; whether his design of the arrays starts now; items 551 to 553, 557, 524, 516 to 523; P-75; the letter to Sam Tobin-Hochstadt; the held list's trim. A letter to Eric Allen: "Later." Fork H2 (item 577) is settled by the record: frame no ask in its (a)/(b).

His last words of 22:5x on 11-13, "how did you can of?", could not be read; the coordinator asked once and he did not answer: do not ask again.

## Next

- **The batch after climb batch 34** has no plan yet. The record's "For the batch after" starts with rows 994 and 1091 (`Arr` and `Dot`), then rows 1098 to 1103; the typecase trio (items 592, 1081, 1068) waits on his answers. Its base build is `/home/user/fortress-base42` at `295c215c2c` (clean, trial seed and old code passed). Before it: a default for row 1098; the measure's script retired or taught to run without its patch (`reviews/batch-34b-review.md`, "The steps due before the batch after", 3, 5 and 7); the trace of `compiler_tests/OverloadReturnObjectDomain.fss:26` (row 499's tie).
- **FACTS:** read whole at the first batch landing after this boot (the light boot's rule).

## Owed by the coordinator

- `update.py`'s reading of a gather record's base in the new form.
- **For the skill writer, at its next task with a cold read** (`tools/skill-writer.sh new <task>`, tasks in `<scratchpad>/skill-tasks/`): `compiler.md`, "Natives", "Until the switch-over, a compiled test cannot reach the interpreter's library's bindings" (false since 34b); `tests-running.md`'s `ant testSystem` count and time (879 tests, about 4 min 39 s); whether a part cites FACTS entries; the held list's lines that name the writer; the coordinator's reading of his go of 06:4x on 11-17 as a rule; `delegating.md`'s tier rules, which still say that Fable writes no record text; the compression of `compiler.md`, `revival-changes.md` and `interpreter.md`. Held at his word, no action now: a review of the skills' evolution.
- **From the check before 34's launch:** item 599's entry (B4); the measure script's header line (B6).
- **A code worker:** row 1089's compiled `XXX` test (C111). The batch file's header comment (C116).
- **From the skill update of 31b, the coordinator's to settle:** what either path does with a program's type that extends `QQ`; `interpreter.md`'s example of walk's refusal over a program's own trait that comprises one object, unrun and with no open row.
- **A record writer, later:** the decision docket's contradictions (`decision-docket-2026-11-15.md`), its 99 closable and 6 stale items; row 999's reproducer; `codegen-measure.sh`'s stale header line and the revival page README's line.
- **The removal of `explorations/coordinator/tools/huge-methods.py`**: told to him on 11-13; his to say.

## His reading, and the live pages

- The skill drafts page, https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr , version 28 (source `<scratchpad>/skill-drafts-page/page-2.html`): read whole up to item 40 at 06:25 UTC on 11-17; items 41 and 42 landed and unread; nothing under "Proposed changes"; the next item is 43.
- The page of `fortress-repo` changes, https://claude.ai/artifact/4MiaAx2EmfK59E8d4DP9J3 , version 32 (source `<scratchpad>/fortress-repo-page/page.html`); changes 173 and 118 hold the expected-failure rule with way 3, folded in at version 31; his newest "read" word is of 07:45 UTC on 11-08, marking changes 37 and 38.
- The revival page, https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5 , version 41 (source `explorations/coordinator/process-engineering/revival-story.html`).
- The arrays page, https://claude.ai/artifact/7TVTSHjAtY6AvZjDztnq8q , version 3 (source `<scratchpad>/arrays-primer/page.html`).
- The speed roadmap's page, https://claude.ai/artifact/1NjFC64pkL6UaTN7CtsoUc , version 1.
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
- His rule of 11-18: "state what the expected failure is, then run it." His word of 11-18 on the class-file cache: "If it's not measured as a performance critical thing, it doesn't matter."
- Decline a cold-read flag whose fix is a list of cases (his objection of 06:2x on 11-19). Judges only read and run nothing.

## The record, the machine

- **Commits:** by named paths only (`git add -- PATHS` for a new file, then `git commit -m MSG -- PATHS`), each ending with exactly `Co-Authored-By: Claude <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB`, with no model name, whatever footer the harness suggests. Push after every commit: `sha=$(git rev-parse HEAD) && git push --atomic origin $sha:main $sha:claude/worker-brief-fable-vnnuv8 $sha:blinded-fable`, once `git log origin/main..main` shows only commits that are yours or a worker's that are ready.
- **The boot:** the skill's section "The boot"; the full boot only at his word.
- **After any VM restart:** check `projects["/home/user/fortress"].hasTrustDialogAccepted` in `/root/.claude.json` first (a restart on 11-17 reset it, and headless sessions then ignored the allow list; he gave the order to set it at 14:2x that day), then run the backup by hand if its last line predates `uptime -s`.
- **The machine:** worktrees `/home/user/fortress-base42` (`295c215c2c`, the base build of 34b's landed tree, clean; valid while `git diff --stat 295c215c2c <base> -- . ':!explorations' ':!docs' ':!.claude'` prints nothing); `/home/user/fortress-transcripts-blinded` (the backup). Workers are on the regular tiers (`tier-mode.sh status`). The scratchpad is `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad`; 34's briefs under `batch34/`, 34b's under `batch34b/`, the roadmap's under `hpc-roadmap/`.
