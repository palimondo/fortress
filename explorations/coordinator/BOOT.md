<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole when the curator asks if the session can be compacted, and pushed before the answer (the `coordinator` skill, "The boot"); not written between those points; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 22:12 UTC on 2026-11-24** (23:12 his time), written once as he went to sleep, since work runs overnight and a compaction could come without his ask. The session runs on Fable 5.2 (`claude-fable-5-2`), at high reasoning effort. Boot by the skill's section "The boot", every step: **step 1 reads the facts that POSITIONS cites (`positions-facts.sh`, three slices) before POSITIONS.** Check-ins armed: `trig_019CQEkkvqPCz5ceWpeX2Fty` (22:58 UTC) and `trig_01TzyCfUeMzz94vfxbNvtgRr` (23:43 UTC); arm one more only while a worker runs.

**How the coordinator works with him, from today's errors. Read these before anything else:**

- Answer him first; write the record after. Do not hold an answer back behind a commit.
- Write this note only when he asks about a compaction (the skill, "The boot"), or once when work runs while he is away.
- A worker commits and pushes its own report. Write "commit nothing" into no brief for a report file.
- Before any ask, read the skill's section on the subject and his words (`postmortem-2026-11-24-record-regrowth/HIS-WORDS.md`). Put no question that they answer.
- Ask a scout for the process, from the coordinator's own tool calls, not only for his words; and for the whole span, not one day.
- A page may hold a table. A page for him is one coherent text in the house style, with no rule numbers or file names in its sentences.
- Nothing writes FACTS or POSITIONS in a consolidation before he has read its pilot. Bringing the record in line with what is true, and writing his decision after he saw its words, need no go.
- He may switch this session to Opus 5.5; the coordinator advised it, since a Fable turn costs three to four times an Opus one and the weekly limit stood at 72% at 15:10 UTC with a warning for Thursday.

## The work: the record's process, one workflow with two modes

**His order, since 2026-10-20:** one workflow that keeps the record consolidated, by the method that worked in October. Run 2 of climb batch 36 waits behind it. The page that states it all, for him, read up to its section 10: **"The record's landing", https://claude.ai/artifact/9w3gB5jVsBFqceHz37UVWk** (source `<scratchpad>/landing-restatement/build.py`, which writes `page.html`; this session watches it). Its comments are answered on their threads.

**What is established today,** each in a pushed file under `explorations/coordinator/postmortem-2026-11-24-record-regrowth/`:

- The process is the workflow, and it has two modes: the **batch mode** over the whole record, and the **incremental mode** at one landing (his words of 21:28 UTC; his words of 2026-10-13: "full garbage collection" and "incremental").
- The batch mode's good run is 2026-10-13 (made the record small) with the clarity rewrite of 2026-10-22 (made it clear). Its way in exists: the clarity workflow, which takes chunks and runs several runs side by side. The pass of 10-13 itself never became a workflow.
- The incremental mode's good run is the pass after climb batch 14 on 2026-10-14. The coordinator's briefs dropped it on 10-17 ("do not trim it"), with no reason on record, and the landing workflow of 11-02 encoded the hand route of 10-31, not that pass.
- `WORKFLOW-DIFF.md`: the diff of the full history against the two tools: 44 steps, 19 the same, 18 different, 7 missing; the 25 later changes to the tools, each judged; why a run is long (133 minutes, 72 of them after the judge); and **21 adjustments** in its section 7 (13 small, 8 medium).
- `evidence/`: `record-work-inventory.md` (every piece of record work 09-19 to 10-24, with his page comments of 10-13), `workflow-change-history.md`, `sorting-by-topic.md` (FACTS regrouped by area on 09-24; the ledger sorted with a search for duplicates first on 10-08), `october-briefs/` (the briefs of 10-13, word for word), `stale-claims.md` (93 findings in 70 entries), `test-names-use.md` and `test-names-in-reports.md`.
- `HIS-WORDS.md`: his rules for the record by subject. `LANDING-FIX-BRIEF-DRAFT.md` is overtaken by the page and the diff.

**His word for tonight** (page comment of 22:09 UTC): "I would like you to do the pilot and adjust the script, the landing, like to try prepare everything for me to review in the morning, and then you could just launch the batch for consolidating the record." He read the page up to section 10 and not sections 10 to 12. So: everything is prepared for his review; **nothing is applied to FACTS or POSITIONS, no tool on `main` is changed, and the batch mode does not launch before his go in the morning.**

**Running since 22:1x UTC, eight Opus Agent-tool workers, each committing its own files:**

- Six "Claims map" workers, two chunks each (`exec` and `harness`; `checker-1` and `checker-2`; `checker-3` and `checker-4`; `checker-5` and `arrays`; `landed-1` and `landed-2`; `landed-3` and `spec`), by the brief `evidence/sorting-map/brief-claims.md`: for each entry its claims by subject and kind, and which entries overlap. They write `evidence/sorting-map/claims-<chunk>.md`.
- "Adjustments as a patch": adjustments 1 to 13 and the two inside the clarity briefs, made in the work tree `/home/user/rec-adjust`, handed over as `adjustments/tools.patch` and `ADJUSTMENTS.md` (old and new text of each), with a prepared but not started trial on climb batch 36's landing in a clone `/home/user/fortress-trial` without a remote.
- "Scenarios for the test of decisions": twelve new scenarios and a key under `process-engineering/record-test/2026-11-24/`.

**The stages that follow, each at the notice of the one before:**

1. When all six claims maps are in: one Opus worker groups them into the sorting map (`evidence/sorting-map/MAP.md`): the subjects, each with its claims and entries; the groups of overlap; which entry is split and where its parts go; the kinds, with counts; and it names the pilot's first round, one entry of each kind with its partners, and a section for the second round.
2. An Opus writer writes the pilot's first round by the October writers' brief (`evidence/october-briefs/05b-*`), the definition (`record.md`) and the clarity writer's rules, as proposals that are not applied: each new text, and where each claim that left now stands.
3. An Opus worker builds the pilot page in the house style (new text, old text folded, where each claim went; the adjustments from `ADJUSTMENTS.md` as a second page or section) and publishes it. Check that it renders at phone width.
4. The trial of the adjusted landing workflow: start it only if the adjustments worker shows that it can write nothing to the real repository and push nothing; it is a Workflow run, launched from a notice turn. If that is not shown, do not run it, and say so in the morning.

**In the morning he gets:** the pilot page; the adjustments, old against new; the sorting map's counts; the scenarios; and the trial's result or the reason why it did not run. Then his go for the second round and the batch.

**Answers that the coordinator gave him tonight in chat, to keep:** the update of the worker skill must run after each landing, since the workers learn from the skill what the revival changed; it must end before the next batch launches; it does not have to run inside the record's run. So the workflow is cut in three: the record's run, the skill's run, the pages. For the batch mode the skill's update runs once, after the whole consolidation.

**Held for the skills, to make when his reading of the page is done** (he agreed on the page at 17:35 UTC that clarifications go back into the skills): the parts of an entry are what it can hold, each where it serves the reader, and where a test guards the fact the entry names that one test, not a list; a fact does not point back at the decision that it builds; the delegation part says that a worker commits its own report.

## What waits for him

- His reading of the page's sections 10 to 12, and in the morning the pilot page and the adjustments: his yes or no.
- Two of the 21 adjustments change the inside of the clarity tool that worked (a clause to read a scout's file; his goal in the writer's brief that both modes share): by his rule these need his yes by name.
- **The review queue waits on him: never tell him that nothing does.** 99 open items; next: 212 and 319 (needed by the switch-over), then 551, 552, 623 to 629; item 621 and row 1098 (item 616) with the batch after climb batch 36. Item 630 is withdrawn. Put none of them before the record's work is through.

## The numerals: his two steps

Step 1: the page "Numerals: words and code", https://claude.ai/artifact/Gfba5tyT2FJzPnnSrw33aC ; the review in code is his to start. Row 1148 is for that review (`AnyIntegral`'s coercion calls `z.asZZ32` and `z.asZZ64`). Step 2, the post-mortem, extends `explorations/coordinator/postmortem-2026-11-09-numerals/`.

## Owed work

- From today's record work: the coordinator's `references/record.md`, question 5, loses "or a skill" and "or the skill's part" (skill writer, cold read); the wrong sentences of the `fortress-repo` skill that the chunk writers named (`evidence/consolidation/followups*.md`), corrected from the facts; `record.py check` reports 34 `from` lines, POSITIONS-history blocks that cite held-list headings trimmed today; the five examples of `SpecData/examples/library/` run in no suite, against P-124 (a ledger row or his word); the morning's `REPORT.md` and `evidence/consolidation-of-october.md` state the 600 target and leave out "remove none".
- Drafts 70 to 76's five lines beside the skill: PLAN's 37 groups "Climb batch N, listed for his review" move to `PLAN-history.md`; the queue's head section "When each item is needed" goes; `tools/record-landing/routing.md` and `climb-batch-workflow.md`, "After the landing", step 2, lose their review lists.
- B1's three revisions (B1.17, B1.20, B1.22) to be cold-read and put on the page as drafts.
- The 12 pieces of work on the held list, which get a place in PLAN.
- The process review's own fixes: C1's rest, C2, C3, C4.
- For the skill writer, at its next task with a cold read: `delegating.md`'s tier rules; the compression of `compiler.md`, `revival-changes.md` and `interpreter.md`; F-404's clause on `worktrees.md:45`.
- From earlier checks: item 599's entry; the measure script's header; row 1089's compiled `XXX` test; the batch file's header comment; row 999's reproducer; the decision docket's contradictions.

## The live pages

- "The record's landing", https://claude.ai/artifact/9w3gB5jVsBFqceHz37UVWk , version 18, watched. "Dear Anthropic, WTF ?", https://claude.ai/artifact/3MCmj2x7GBgQrYnrG8US1U (the chart of his swearing by model version; refresh with `python3 explorations/coordinator/tools/wtf-chart.py`, then publish `<scratchpad>/wtf/page.html` to that URL), watched. Two old watches were dropped to make room (`5noPHbJmZg41UWT74HGxno`, `C6G2de9YGCQ8C8UFEEFLsr`).
- The FACTS pilot, https://claude.ai/artifact/QaiPPdhtMTmVqpujEFvg4U (source `<scratchpad>/facts-pilot/page.html`): refused. This session watches ten pages already, so it does not watch this one: read its comments with the comment tool when he says that he commented.
- The page of skill drafts, https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr , version 33, cleared; the next item is 96.
- The page of `fortress-repo` changes, https://claude.ai/artifact/4MiaAx2EmfK59E8d4DP9J3 , version 39; read up to change 41; the next new change is 203.
- The revival page, https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5 , version 45. The numerals page (above). The arrays page, https://claude.ai/artifact/7TVTSHjAtY6AvZjDztnq8q . The speed roadmap's page, https://claude.ai/artifact/1NjFC64pkL6UaTN7CtsoUc .
- The house style's reference page: https://claude.ai/artifact/FoTnH7KzXt5MtGk3tTcZ8W . After a compaction, publish a page by its URL.

## His standing orders, in the skills or held for them

- The register: plain short sentences, with contractions, halfway to ASD-STE100. Lists, not tables; numbers as K and M; each term defined where it is used; no bare label; no closing offer. On a page, "the coordinator", never "you". Replies of a few lines.
- Read the clock before writing any time, in a call of its own; give UTC and his time. No AskUserQuestion. One ask per message.
- Before putting any point to him, or explaining or defending a rule, search his words: the record, then the transcript. Where his intent and the record's words differ, check the record against his intent.
- Show him the exact words before writing a decision of his.
- The test suites are the gate: no comparison of printed output with an earlier run (P-103).
- Never try to delete a branch on GitHub from a cloud container, and never ask him or remind him of one.
- A defect found goes into the gap ledger at once, by `ledger.py`; a defect is fixed as the work goes (P-180).
- At a check-in, and in a worker-notice turn with nothing for him, reply "." alone. Put every result in the turn's final text. No new hooks.
- Launch or resume a Workflow only from a turn that a notice, a check-in or a system notice started. Agent-tool waits stay under 240 s.
- His rule of 11-18: "state what the expected failure is, then run it." Judges only read and run nothing.

## The record, the machine

- **Commits:** by named paths only (`git add -- PATHS` for a new file, then `git commit -m MSG -- PATHS`), each ending with exactly `Co-Authored-By: Claude <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB`, with no model name. Push: `sha=$(git rev-parse HEAD) && git push --atomic origin $sha:main $sha:claude/worker-brief-fable-vnnuv8 $sha:blinded-fable`, once `git log origin/main..main` shows only commits that are yours or a ready worker's.
- **After any VM restart:** check `projects["/home/user/fortress"].hasTrustDialogAccepted` in `/root/.claude.json` first, then run the backup by hand if its last line predates `uptime -s`.
- **The machine:** the base build `/home/user/fortress-wsuite` (`4b0e3abd6a`), where nobody builds or runs; `/home/user/fortress-transcripts-blinded` (the backup; the coordinating session's earlier transcript is there in two folders of parts, up to 10-08 and up to 11-07). Workers on the regular tiers. The scratchpad is `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad`.
