<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 00:5x UTC on 2026-11-24** (01:5x his time). The session runs on Opus 5.5 (`model-now.sh` prints `claude-opus-5-5`). It was compacted at 00:23 UTC on 11-24, at his word, and booted by the skill's section "The boot" (no form named by him); its context after the boot was 262K, of which the boot's reads were 136K. The VM restarted at 23:27:47 UTC on 11-23 and again at 01:16:21 UTC on 11-24 (trust flag `True`, backup run by hand `push=ok` at 01:18, disk not rolled back); the three running workers were resumed by message at 01:1x. **The next process stop is about 12:2x UTC on 11-24.** He is asleep; his reading of the page of skill drafts resumes at item 70.

## His word at 06:58 UTC on 11-24

"Let's compact and start again with full boot for the landing, what do you say? I don't like you without full record in context in landing and planning." He is here for about an hour. After the compaction: **the full boot** (FACTS whole in place of step 1's script, and INDEX whole after step 1), then the landing's steps from where they stand below, then the morning message.

## Overnight, 11-24: climb batch 36 runs

**His go, at 00:2x UTC on 11-24:** "approved for the next batch with planner's defaults after Fable review. Go overnight." He is asleep. Quiet times: "." at a check-in; nothing about the batch until it lands or fails.

**Landed: climb batch 36, run 1 of `CLIMB-BATCH-36.md`** (rungs K, G, N, C), launched 01:57 UTC, commit stage's last commit `61b50cd34a` at 06:51 UTC on 11-24, pushed, no hold; a judge on the merged-diff review and its repair (`747b5d406b`, `6a0f7ffc62`). The run's result: `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/tasks/w8gfsqzp5.output` (13 items for the curator). The landing (`references/batch.md`, "The landing"): step 1 swept (no task); FACTS read to F-245 only, not whole, since the rest would have put the context past 550K before his morning (the coordinator's choice, to name to him with a proposal: at a landing after a boot, read what the landing changed); **running: step 3, the post-batch review** (Opus `xhigh`, brief `<scratchpad>/batch36/review-36-brief.md`, writes `explorations/reviews/batch-36-review.md`), pointed at K3's exception (K.worker.1, K.skeptic.1: a tie among a unit's own declarations takes the first by place, where his words ask a rule or a static failure, and P-45 says not by the order of writing) and at row 879 closed by K1's default. Then step 4, the record-landing workflow (`batch: '36'`, base `b5a758846dd8695c25d13a5885088454fb02dae3`, landing `61b50cd34a4866113d7fa8665a5401cd1819f6a1`). A push notification went at 06:5x. Run 2, climb batch 36b (F, Y, B, T), waits for his word (the coordinator's reading of his go, "the next batch"); its sections are read again on the landed tree first.

What came before the launch, each pushed: the count of the suite on the compiled path (`2815f426ec`; rows 1128, 1129); the planner's record (`fb9cabb6b5`) and its Fable review (`9bbd1bab2b`; fork K1 consequential, at its default, review-queue item 621); P-103 in the gate, B1's tool files and climb batch 35b's due steps (`0308671be8`, `5e6bd1b311`, `88f286dc30`; row 1130); the stale record fixed (`ef81c4e6cb`, `7cef72951b`); `fortress-repo` cut to P-103 with its cold read (`53fab60d75`, `b5a758846d`); the manifest and the splice (`69952cbbef`, `8c936da3e5`); PLAN's "Where we stand" cut (`145afe0134`); the page of skill drafts at version 30. The page of `fortress-repo` changes at version 38 for the P-103 cut.

For the morning message (with the held items below), once the batch has landed or failed, or when he writes: the count (185 and 76, rows 1128 and 1129) and the gate's new step 7 (197 programs, each once; the microGPT phase compile dropped; F-34's measure dropped; row 1130), each named in one line; B1 landed (`e7afa05020`), the page of skill drafts at version 30 with items 80 to 85 new, and the writer's three open points (B1.18's "and launch" now that every launch needs his go: (a) leave, (b) "if the batch has its go", (c) drop; the standing go in `SKILL.md` for pushes only; the reviewer's brief lists files outside a rung's scope); the revival page at version 44 (`0a02c78480`); P-103's change (`2ce35f7b4c`, his words shown first); fork K1 at its default, its question queue item 621; `fortress-repo` cut to P-103 (`53fab60d75`, `b5a758846d`; three changes of a rule's meaning) with the page of `fortress-repo` changes at version 38 (items 193 to 201), and the two comparisons of a tool's output that the writer kept (`compiler.md`, "The checker's time"; `library.md`, "Editing"); PLAN's "Where we stand" cut; and his reading of the drafts page resumes at item 70.

## His reading tonight: the page of skill drafts, version 29

He read B1 and B2 on https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr (then version 29) and commented; each comment is answered on its thread. The points so far, with his words, are in `<scratchpad>/page-notes-2026-11-23/drafts-v29-reading.md`; write them to the held list in one edit when he says the reading is done, then act on the list.

1. Items above draft 59 (landed 41, 42; B1.1 to B1.16): "All other above LGTM" (22:23 UTC).
2. **P-103 enforced, his order of 22:35 UTC** ("I said that we are building the test suite, and that is our only gate. There should be no comparison with previous runs. I already stated this."), his go of 22:54 ("But the rest, yes, that cut is necessary."): the skill writer cuts every passage that compares printed output with an earlier run (`gate.md`, "Comparing with an earlier run", and step 7's output check; the `fortress-repo` core's exception; `batch.md:65` through B1.20); the ladder regression leaves the gate before the next batch. On his question of 22:54 ("let's not throw away the baby with the bathwater"), the coordinator's answer, not yet his word: `count-run` stays only for a one-time count that a decision of his names (P-68's row 330 is the one left; synthesis 2(a)); the ladder's progress measure is checked for readers first (the inventory); the checker count and the distance stay (P-39). His words are in `<scratchpad>/testing-words-scout/words.md`. The coordinator's failure, for the held list's analysis: it explained the masking rule to him twice without checking P-103 and `batch.md:56` (the same shape as the line of 12:5x).
3. Revisions of three drafts, each proposed on its thread, to be cold-read together and put back on the page for his yes: B1.17 (the go: "Launch the batches in PLAN's order, each on the curator's go, once the batch before it has landed and its own batch record has no open question, apart from one taken at its default overnight (below)."; his "OK" at 22:28); B1.20 (only the team's rewritten test lines, in the gather record, counted in the report); B1.22 (the landing report, shorter, no counts, no hidden differences). B1.2 and B1.3 name the report's counts and follow.
4. **B2 rejected** (22:48 UTC, "Rejected. Don't fuck with me!"): it stays out of the skill; its four drafts leave the page at its next update.

## Held for him, one message when his reading is done

- **Climb batch 35b's record-landing ended at 22:5x UTC** (`96cd5ade28`, `ddfa65d880`; skill `71d9fba7fe`, `abd58e52a0`, `7b7d4c1c56`, folders `5ba0b04cd9`); the page of `fortress-repo` changes at version 37 (changes 187 to 192 new), https://claude.ai/artifact/4MiaAx2EmfK59E8d4DP9J3 ; the revival page's script stopped on the gather record's new base form, taught by the coordinator (`ec113ac4d4`), published as version 43; the quiz `98ee0338e6`. The judge held two entry changes (F-404, F-405) for growing past their owed size.
- POSITIONS, P-174's sentence (old, new): "Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause." to "Row 1124 holds where the tree departs: walk loading a numeral type written as a return type, a variable's or a field's type, which it refuses only where a numeral meets it."
- From run 1's landing, still owed: the record-landing line (page 36, revival 42); POSITIONS P-40, P-173 and P-174's last sentence, carrying his "YES!!" of 13:0x (old and new words in `git show 2af3ec103d`); the correction that all 67 items that left the queue now stand in FACTS or a row (`c00e592a59`).
- Run 2's landing (`1caac80b3b`): rungs E, L, M; rows closed 184, 1057, 1058, 981, 1053, 815, 390; 10 opened (1118 to 1127); forks at their defaults, none consequential; its review `9d5d21bf57`.
- The skill writer's points: rows 1107 to 1109 and row 1041's new commit need their fixes planned; `library.md:23` becomes false with P-165's rung.

## What waits for him

1. **The ask of 11:5x: which open rows P-180 makes a batch fix** (1 the files in hand; 2 the skill's 98 passages; 3 a balance; recommended 2 then 1). No answer yet.
2. **B1, B3 and B4** on the page of skill drafts, for his yes to their words (B1's three revisions to come back first).
3. Later, one per message: the items of climb batch 35 and 35b for his review; rows 744 and 1120 after the coordinator's checks (P-26, `overloading.tex:149-151`); row 1098 (queue item 616); item 608 as landed; the Fable judge's effort; the speed roadmap's decisions.

His last words of 22:5x on 11-13, "how did you can of?", could not be read; do not ask again.

## Next

- **The batch after 35b:** row 1125 first (P-180); the rungs of P-174 (`Byte(v)`) and P-165 (`asRR64`); rows 994/1091, 1098 to 1103, 1100 open again, 1104 to 1127; before it, the ladder regression out of the gate, a base build at `ddfa65d880` or later and F-34's measure, `seed-worktree.sh` copying `build-one`, the coordinator's checks on rows 744 and 1120. It needs his go.

## Owed by the coordinator

- Done: PLAN's "Where we stand" cut from 16.2K to 4.7K characters, the cut text moved to `PLAN-history.md` (`145afe0134`; said to him at 00:3x UTC on 11-24).
- The process review's own fixes: C1's rest, C2, C3, C4 (each a `coordinator` skill change by the skill writer and a cold read).
- For the skill writer, at its next task with a cold read: `delegating.md`'s tier rules (Fable writes no record text); the compression of `compiler.md`, `revival-changes.md` and `interpreter.md`; whether a part cites FACTS entries; F-404's clause on `worktrees.md:45`, owed again after the skill update.
- From earlier checks: item 599's entry (B4); the measure script's header (B6); row 1089's compiled `XXX` test (C111); the batch file's header comment (C116); what either path does with a program's type that extends `QQ`; `interpreter.md`'s example of walk's refusal over a program's own trait that comprises one object; the decision docket's contradictions; row 999's reproducer; `codegen-measure.sh`'s header; the revival page README's line. The removal of `explorations/coordinator/tools/huge-methods.py` is his to say.

## The live pages

- The page of skill drafts, https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr , version 30 (source `<scratchpad>/skill-drafts-page/page-2.html`). His newest word that he read: "All other above LGTM", 22:23 UTC on 11-23, on the landed items 41 and 42; and his yes to every item up to 70, 00:1x UTC on 11-24. Unread: landed items 80 to 85; proposed B3 (70 to 76) and B4 (77 to 79).
- The page of `fortress-repo` changes, https://claude.ai/artifact/4MiaAx2EmfK59E8d4DP9J3 , version 38 (source `<scratchpad>/fortress-repo-page/page.html`): read up to change 41; changes 42 to 201 on it (193 to 201 the P-103 cut, three named as a new rule or a change of meaning; the seeding fix folded into 191 and 192); the next new change is 202.
- The revival page, https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5 , version 43 (source `explorations/coordinator/process-engineering/revival-story.html`).
- The arrays page, https://claude.ai/artifact/7TVTSHjAtY6AvZjDztnq8q , version 3. The speed roadmap's page, https://claude.ai/artifact/1NjFC64pkL6UaTN7CtsoUc , version 2.
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
