<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 00:2x UTC on 2026-11-24** (01:2x his time). The session runs on Opus 5.5 (`model-now.sh` prints `claude-opus-5-5`). It was compacted at about 21:3x UTC on 11-23 and booted by the skill's section "The boot" (no form named by him). A process stop came at about 21:2x UTC (no VM restart: `uptime -s` 08:32:22; trust flag `True`; backup `push=ok` at 21:16); the record-landing was resumed. The VM restarted at 23:27:47 UTC on 11-23 (trust flag `True`, backup `push=ok` at 23:47, nothing lost). **The next process stop is about 12:2x UTC on 11-24.** He is asleep; his reading of the page of skill drafts resumes at item 70.

## Overnight, 11-24: climb batch 36 on his go

**His go, at 00:2x UTC on 11-24:** "approved for the next batch with planner's defaults after Fable review. Go overnight." He is asleep. Quiet times: "." at a check-in; nothing about the batch until it lands or fails. Check-ins (`send_later`) at 01:06, 01:51, 02:36 and 03:21 UTC (`trig_019GBV6rTRMVdM9A92rWSWYW`, `trig_01Ep97Xmhadop5RiSvkN1oY8`, `trig_019MyaXKz37E6x8BxS5ifXP8`, `trig_01BABP7qUbp7xeNeckZfp42J`); re-arm at the last if the batch has not launched; after the launch, the check-in file is `<scratchpad>/batch36/checkins.txt`.

The plan, in order; each step starts when its inputs are in:

1. **Running: the count of the interpreter's suite on the compiled path** (Opus, Agent tool, launched 23:5x on 11-23): every `ProjectFortress/tests/*.fss` compiled and run under the prelude and under the one library, each by its own verdict; report `explorations/compile-ladder/suite-compiled-2026-11-24/REPORT.md`; told to leave its worktree `/home/user/fortress-wsuite` (at `4b0e3abd6a`, the landed code) built, as the batch's base build. When it ends: tell him the count in the morning message.
2. **Running: the planner of climb batch 36** (Opus at `xhigh`, Agent tool, launched 00:2x; brief `<scratchpad>/batch36/planner-36-brief.md`): first the checker's tie by hash order at the root (rows 1100, 935; P-146), then row 1125, P-174's `Byte(v)`, P-165's `asRR64`, the 35b review's list; base build `/home/user/fortress-wsuite`. When it ends: the Fable review of `CLIMB-BATCH-36.md` (go in advance), then the manifest (`plan-36/manifest/`, as `plan-35`'s), then the launch at the planner's defaults; a fork whose default would reverse a decision of his holds the batch.
3. **Before the launch, once the count is in: P-103's new sentences carried out** (`2ce35f7b4c`), by an Opus worker on the batch script, `gate-functions.sh` and the manual (`explorations/coordinator/process-engineering/output-comparisons-2026-11-23.md` lists the 73 places): step 7 drops its comparison of printed output, and its list becomes every program of the interpreter's suite that compiles and passes on the compiled path, from the count; `count-run` kept for a count that a decision of his names; F-97 rewritten. Then the skill writer's cut of `fortress-repo` (`gate.md`, "Comparing with an earlier run" and step 7; the core's exception), with a cold read, and the page of `fortress-repo` changes updated. Also B1's tool files (`<scratchpad>/process-review/drafts.md`, "The tool files that each fix needs", B1, as revised: no landing report, no hidden differences; drop the catch-up report). All of this lands before the manifest's splice, since both edit the batch script.
4. **The launch** from a notice turn, base `main`'s head after step 3, `baseBuild: '/home/user/fortress-wsuite'`; check-ins 45 minutes apart; remove `/home/user/fortress-base43` once the run has seeded its rungs, if the disk needs it.

For the morning message (with the held items below): the count; B1 landed (`e7afa05020`) with its writer's three open points (B1.18's "and launch" now that every launch needs his go: (a) leave, (b) "if the batch has its go", (c) drop; the standing go in `SKILL.md` for pushes only; the reviewer's brief lists files outside a rung's scope); the revival page at version 44 (`0a02c78480`); P-103's change (`2ce35f7b4c`, his words shown first); and his reading of the drafts page resumes at item 70.

## His reading tonight: the page of skill drafts, version 29

He reads B1 to B4 on https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr and comments; each comment is answered on its thread. The points so far, with his words, are in `<scratchpad>/page-notes-2026-11-23/drafts-v29-reading.md`; write them to the held list in one edit when he says the reading is done, then act on the list.

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

- The process review's own fixes: C1's rest, C2, C3, C4 (each a `coordinator` skill change by the skill writer and a cold read).
- For the skill writer, at its next task with a cold read: `delegating.md`'s tier rules (Fable writes no record text); the compression of `compiler.md`, `revival-changes.md` and `interpreter.md`; whether a part cites FACTS entries; F-404's clause on `worktrees.md:45`, owed again after the skill update.
- From earlier checks: item 599's entry (B4); the measure script's header (B6); row 1089's compiled `XXX` test (C111); the batch file's header comment (C116); what either path does with a program's type that extends `QQ`; `interpreter.md`'s example of walk's refusal over a program's own trait that comprises one object; the decision docket's contradictions; row 999's reproducer; `codegen-measure.sh`'s header; the revival page README's line. The removal of `explorations/coordinator/tools/huge-methods.py` is his to say.

## The live pages

- The page of skill drafts, https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr , version 29 (source `<scratchpad>/skill-drafts-page/page-2.html`).
- The page of `fortress-repo` changes, https://claude.ai/artifact/4MiaAx2EmfK59E8d4DP9J3 , version 37 (source `<scratchpad>/fortress-repo-page/page.html`): read up to change 41; changes 42 to 192 on it.
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
- **The machine:** worktrees `/home/user/fortress-base42` (`295c215c2c`) and `/home/user/fortress-base43` (`0a83a70498`), base builds to remove once the next base build stands; `/home/user/fortress-transcripts-blinded` (the backup). Workers on the regular tiers. The scratchpad is `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad`.
