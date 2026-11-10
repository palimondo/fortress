<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 07:25 UTC on 2026-11-10** (08:25 his time): he compacted the session at about 07:2x and said "Boot up". The full boot is done: FACTS, POSITIONS and INDEX read whole, the index check clean (no note missing), PLAN's first section, this note and the held list read, `references/delegating.md` loaded, the transcript backup sound (`push=ok` at 07:16). **Nothing runs.** Climb batch 29b is landed, with its record and `fortress-repo` updated. The post-mortem of the numeral design is closed. He is on his morning commute and listens by text-to-speech. The session runs on Fable 5.2 since 05:4x UTC on 11-10, his switch; he said that he lowers its effort from `xhigh` to `high` after this compaction.

## His strategy for this week, which suspends the tier rules of `references/delegating.md`

**Fable-only workers** (`model: 'fable'`, which resolves to `claude-fable-5-2`): low effort where a Sonnet scout would run, medium where an Opus worker would; no Opus or Sonnet worker, since only Fable usage comes back with a Fable reset (his order of 05:4x on 11-10). The skill's rule that Fable writes no record text holds "while Fable is at version 5.1", so it has lapsed. The record-landing script names Opus and Sonnet in 24 places and the orientation script names them too, so neither runs unchanged; the batch script names its tiers in two places.

## Waiting on him

- **The go for one small numerals batch next**, asked in the boot's report at 07:2x (review-queue item 449; `explorations/reviews/batch-29b-review.md`, "For the curator"). Its content, by the coordinator's sort of that review's four points at the boot, on which he has not ruled:
  - Row 971 (item 488): a compiled numeral coercion whose body has two calls of the program's own functions in one expression fails when its class loads. It departs from P-176. The repair starts the task pool before the program's classes load. No ask of its own: it goes into the batch.
  - Row 442 (item 489): the prelude's `RR64` and `RR32` take no natural numeral, so `x: RR64 = 3` is refused on the compiled path. The coordinator reads P-37's exception for the numerals and P-174 as settling it: the two coercions are added. No ask of its own: it goes into the batch, and is named to him at the landing.
  - Walk's dead field-numeral code in eight places, the vacuous test `XXXRadixPointLeadingZerosWalk`, and those of rows 957 (its second case), 958, 960, 962, 963, 966, 967, 446 and 974 that a planner finds fit.
- **Item 487, `u = 0` for a zero `u` of `NN32`, `NN64` or `RR32`, and `h = 0.5` for `h: QQ = 1/2`** (rows 973 and 966, F-346): `false` under walk, `true` compiled against the prelude. A design fork, not yet an ask. The coordinator's reading at the boot, not measured: the cause is the one library's `=` over `Any`, which fits a numeral at its default as it is (P-46, P-49, F-342), so the compiled path may answer `false` too once it reads the one library. It needs a ways review with that one measurement before the ask. Not launched: see the budget.
- His client's figures after the boot, if he gives them, and whether he resets now.

## After that, in this order (the coordinator's proposal of 05:5x, on which he has not ruled)

His own list of 05:4x for the Fable runway named three things: the parallelism machinery of the atomics, compressing the largest skill parts, and, as his worry, the in-context learning challenge.

1. The asks, one per message, each with its pushed review: the numerals batch's go, then item 487 after its review.
2. The parallelism decisions D1 (unboxed stores and `atomic`, against P-169's reason) and D2 (strong or weak atomicity on the compiled path), review-queue items 408 and 409, from `explorations/reviews/parallelism-foundations-2026-11-08.md`; his answer to item 408 comes before work on the compiled transaction goes on (PLAN's item 74, row 933).
3. Skill compression of `fortress-repo`'s largest parts: `compiler.md` (32K, over its 30,000 mark), `revival-changes.md` (29K), `interpreter.md` (22K), by the method of `references/skill-rewrite.md`.
4. Then Q4 (`Reflect`'s 28 bindings, item 437), items 373 and 377, PLAN's items 69 to 72, the ledger pass review.

Left for a later skill-writer task from climb batch 29b's landing: `SKILL.md:71`'s sentence on the fold (it says "a numeral, a quotient of two numerals or a boolean"); `compiler.md` over its mark; row 960 under walk's departures though both paths show it; three stale lines of the orientation quiz's key.

## What landed, and what he has been told

- **Climb batch 29b** landed and was pushed at 00:38 UTC on 11-10 (`a2be3e9e1d`; run `wf_ab289a6d-124`): rungs A (the static numerals on both paths) and T (the specification); gate green, count 0, distance 0, microGPT's walk check 7 of 7 for both programs. The RoundtripNumeral test followed (`9fb5ab231f`, 16 cases on both paths), then the post-batch review (`a75261b7e9`), then the record-landing workflow (`wf_b5fa84b2-fbe`, ended 03:57 UTC: the record at `36e60805e6` and `5f35b1d058`, `fortress-repo` at `27cb304a2a`, `1bcb6fac1c`, `a887954997`, its page version 20, the revival page version 32, the orientation quiz's case 32 at `83d413dfb1`).
- **Told to him at 03:5x UTC on 11-10:** what landed, the POSITIONS changes of the landing (P-173, P-174, P-176, P-172, P-76 and line pointers, commit `36e60805e6`), the `fortress-repo` page line. His four push notifications were sent.
- He has not yet read the coordinator's report of 17:4x on 11-09 on the record's correction (`cac54a1bf1`: P-174 rewritten to the static numerals, P-176 new, P-37's exception; `51b048ea1c`: the four numbers naturals of any size).

## The post-mortem of the numeral design, closed

The folder: `explorations/coordinator/postmortem-2026-11-09-numerals/`; its closing report `REPORT.md` (`dcb98fc74b`).

- **Its measure, approved by him at 07:0x UTC on 11-10 ("Agreed, this is good plan. Approved."): a hook that reminds the coordinator to re-read his own words.** Built at `11ec650a16`: `.claude/hooks/curator-words-reminder.sh`, a PostToolUse hook in `.claude/settings.json`. It fires when a Bash, Edit or Write call of the main session names the held list, the boot note, the decisions file or `record.py` and one of the three files changed, at most once a turn; its text is the one he approved, in the script. His words asked for the hook "whenever it is modifying the held list or boot", with "a small prompt"; the decisions file, `record.py` and "at most once a turn" are the coordinator's additions, which stood in the text he approved.
- **His rule of 07:1x on the hook's checks: silent.** The coordinator re-reads his words and corrects the record when needed, in its reasoning and in the files, and reports none of that in chat ("if all of this happens inside of your thinking, I'm fine with that ... I don't need to hear all about this").
- **No skill update for the measure, his decision of 07:1x:** "I guess the hook beats the skill. We don't need to update the skill. This refocusing prompt is enough, I believe."
- What he wants of the measure, in his words of 06:3x: the process "off hands", an "internal validation check"; cleaning his dictated words is a standing feature, so the answer is not quoting him verbatim, "recovery of meaning is the point". His answer to a contested point is "go back and read the record"; a short assent of his is no approval of a wording. He found an independent verifier heavy and costly (06:5x).
- The coordinator's own proposal, which he did not take up: one fresh reader with the reading rules before a batch is planned from a design decision.
- The process findings held for the skill writer, for when he asks (he said at 14:18 on 11-09 that he wants no process rules from the coordinator now): the condensation of his position into the held list was not checked against his messages, as `references/record.md` asks; the record writer's brief named the held list as the source; the Fable judge was asked for coherence, not fidelity. And "Do not push; the coordinator pushes" is in no skill: a worker on `main` pushes its own commits (`fortress-repo`, `committing.md`); he corrected it at 16:5x on 11-09.

## The week's budget

- **His client at 07:0x UTC on 11-10: 98 % of the all-models limit, 65 % of the Fable limit, context 614K**, both limits resetting at 11:00 his time on Friday 11-13. The boot after it wrote about 0.3M Fable tokens, about one point of the all-models limit by the coordinator's count, so about one point is left: the next worker needs his reset.
- He has three Fable resets. By the offer's article (https://support.claude.com/en/articles/17506494-claude-fable-5-2-launch-offers), fetched at 05:4x: a reset gives back, on the weekly limit, the usage spent on Fable models only; it can be used at any time; plans that include Fable can spend up to 50 % of the weekly limit on Fable; for Max and Ultra plans and premium seats, "These resets expire on March 8, 2027 at 11:59 pm PT"; the date 16 November 2026 is for Pro plans and standard Team seats, which got one reset. Told to him at 07:1x; he had read the offer as lasting one week.
- The coordinator's count: one all-models point is about 0.34M Fable tokens written or 0.95M Opus tokens written. The Fable meter's 65 % is about 32 points of the all-models meter, so a reset now leaves about 66 %, and about 34 points, some 11M Fable tokens written, until the all-models limit stops the work again.
- His plan: Fable only until the limit stops the work, then one reset. His order of 07:0x: after the compaction he looks at the context and either resets at once or lets the coordinator boot in full first and resets after. The boot is done.

## Armed check-ins

"Batch 29b night check-in 11" (08:09 UTC) and "12" (08:54 UTC) are still armed (their IDs: `<scratchpad>/batch29b/checkins.txt`). Nothing runs, so each gets "." alone; they keep the prompt cache warm while he is on his way.

## His reading of the pages

- The `fortress-repo` page, https://claude.ai/artifact/4MiaAx2EmfK59E8d4DP9J3, version 20 (version id `1794282901-8863`): he read up to change 38 at 07:45 UTC on 11-08; changes 39 to 86 unread. His rule of 07:15 on 11-08 (held list): an item shows the skill's current text, a later change folded in.
- The skill drafts page, https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr, version 26 (version id `1794152944-d233`): item 34, the folded-item rule, landed and unread; "Proposed changes" empty; the next landed change comes as item 35.
- The revival page https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5, version 32 (version id `1794283031-3e8d`; source in the tree, `explorations/coordinator/process-engineering/revival-story.html`). The other live pages: the learning page https://claude.ai/artifact/C6G2de9YGCQ8C8UFEEFLsr; the corrections page https://claude.ai/artifact/5noPHbJmZg41UWT74HGxno, version 16; the type-decisions review https://claude.ai/artifact/WELD6kRbiHPPzq7hLb8G4Z; the house style's reference page https://claude.ai/artifact/FoTnH7KzXt5MtGk3tTcZ8W; the revival page's proposal https://claude.ai/artifact/AvjRxsrtdxDbzz9q2qQJZe and outlines https://claude.ai/artifact/495PSP3WkiMFGVeXZp2PBq; the timeline refresher https://claude.ai/artifact/C84jo1st8THBQxm6aLThDi. After a compaction, publish a page by its URL. The pages' sources are in `<scratchpad>/fortress-repo-page/` and `<scratchpad>/skill-drafts-page/`.

## GitHub Pages

The per-push deploys of `docs/` failed from 11-05 by GitHub's soft limit of about ten builds an hour. He committed `.github/workflows/pages.yml` (`b8606fc30`) and set the Pages source to GitHub Actions at 18:0x on 11-06; its first run failed by the same limit. The next `docs/` change, or a run by hand, tests it. The GitHub App token cannot push `.github/workflows/*`, dispatch a workflow or reach the Pages API.

## His standing orders, in the skills or held for them

- Never try to delete a branch on GitHub from a cloud container, and never ask him or remind him of one (`cloud-container`, "Rules for every agent"). A branch that waits for him is state in this note only; none is named now.
- "runtime" for the system, "at run time" for the moment, "run-time" for the adjective.
- Read the clock before writing any time, in a call of its own; take a past event's time from the record, never from feel.
- A quoted comment of his comes before any other step.
- After a stop, check each worker's state and each file's completeness, never its existence alone, before saying what was lost (his correction of 13:30 on 11-09).
- Before relaying a worker's report, keep its stated limits on its method; assert no content unread.
- The record gets his position in the record's register, condensed and checked against his words; his dictated words go to the history and the post-mortem, never verbatim into an entry (his word of 17:2x on 11-09; `record.md`).
- Before putting any point to him, search his words: the dialogue files (`explorations/coordinator/postmortem-2026-11-09-numerals/recovery/slices/dialogue_*.md`, to 14:20 UTC on 11-09), the design snapshot beside them, and the transcript after that; a point that his words settle is not an ask (his correction of 18:xx on 11-09: "Why do I have to keep reminding you of something that I told you yesterday?").
- The hook's checks and corrections stay out of chat (above).

## The record, the machine

- **Commits:** by named paths only (`git add -- PATHS` for a new file, then `git commit -m MSG -- PATHS`), each ending with `fortress-repo`'s footer exactly: `Co-Authored-By: Claude <noreply@anthropic.com>` and the `Claude-Session` line, whatever footer the harness suggests. The coordinator pushes after every commit, in the foreground: `sha=$(git rev-parse HEAD) && git push --atomic origin $sha:main $sha:claude/worker-brief-fable-vnnuv8 $sha:blinded-fable`. A worker on `main` commits by named paths and pushes its own commits by `committing.md`'s rule (the three refs in one command); "do not push" goes in no brief. Every brief says that the committing footer names plain "Claude", no model name.
- **The skill writer:** none since the container's rebuild of 23:09 UTC on 11-07; start a fresh one (`tools/skill-writer.sh new <task>`), its tasks in `<scratchpad>/skill-tasks/`. Its script starts an Opus session, so under this week's strategy it needs its tier changed first.
- **The register:** plain, halfway to ASD-STE100, lists not tables, numbers as K or M, each term defined where it is used, one ask per message with its pushed review linked, no AskUserQuestion, no closing offer, "the coordinator" and never "you" on a page. His profile (`curator-profile/PROFILE.md`) is to be read once before the first ask after this boot.
- **The boot:** the full boot is the default; a light boot at his word.
- **The machine:** 18.1G free at 07:22 UTC on 11-10 (`df -P /home/user`); its last start 07:06 UTC on 11-10 (`uptime -s`), with the tree clean and equal to `origin/main`, the scratchpad whole and the backup pushed after it. Worktrees: the transcripts worktree `fortress-transcripts-blinded`; the base build `fortress-base30` at `dd00743d9e`, the base of climb batch 29b, older than `main`'s code. The scratchpad is `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad`. The next process stop is not known.
