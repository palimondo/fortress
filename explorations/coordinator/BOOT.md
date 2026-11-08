<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 02:3x UTC on 2026-11-08** (03:3x his time). **Climb batch 28 runs**, launched at 02:3x UTC at his go of 10:4x on 11-07, with his answers to Q2 (02:1x) and Q3 (02:2x). **Climb batch 27 landed** (pushed at `209192b67` at his go of 14:0x; its gate's tables commit `29e52a3dc`), and its record-landing is done: the record at `d131d92c5` and `0549157f4`, the `fortress-repo` skill update at `eb0dfd81a` to `044e3fb29`, the orientation quiz's cases 26 to 29 at `c3aedcb52`, the revival page at version 29 (version id `1794070318-d3c9`, `2c3c669f8`). His Q1 decision is P-169 (`51c30d263`, queue item 406 for his detailed review). The coordinator runs on Opus since about 06:45 on 11-07; it read FACTS and POSITIONS whole at 12:0x on 11-07, and booted light after the compaction of 02:2x on 11-08.

## Running

- **Climb batch 28**: rungs V, R, A, K, H, S and T, about 4.6M tokens written and about 5 h 15 min. Its record `CLIMB-BATCH-28.md` (`945db520`) holds his answers: Q2 (ii), the slot API, on P-84 widened at his word (`bd1174a2`); Q3 option 1. The base is the commit of this boot note, `main`'s head at the launch; the launch's exact args are `<scratchpad>/batch28/launch-args.json`. The base build is `/home/user/fortress-base28`, checked out at the base (its code that of `2436f6f25`, built at `e0a8abf4`). The generator's five commands were rerun on `7ba33066`: 0 bad lists, 0 problems. **The check-in file is `<scratchpad>/batch28/checkins.txt`**: the run's ID and each check-in's ID. Check-ins 45 minutes apart for the run's length; at each, check the run, resume it if it stopped (`resumeFromRunId`, the args byte for byte), and reply "." alone. Say nothing about the batch until it lands or fails.
- Done before the launch: the record worker's follow-up (`7ba33066`: P-169's store, (ii); P-170, `System`'s `args` in Fortress, option 1; F-32 and PLAN's `NativeArray` sentences; queue item 407 closed); the page worker's changes 49 to 51 on the `fortress-repo` page (version 14), reported to him at 02:2x.
- **His reading of the `fortress-repo` page** continues in the morning, from change 37 (his word of 01:07).

## The container, rebuilt at 23:09 UTC on 11-07

The platform lost the container and rebuilt it from `claude/worker-brief-fable-vnnuv8` at `1de032aa8`, which equals `main`: nothing pushed was lost. Restored by the `cloud-container` skill's `references/container-loss.md`: `main` checked out, `explorations/experiment/setup.sh` (JDK 25, `ant`, the build, the backup), 29G free. The backup is re-armed (`push=ok` at 23:19); its first snapshot wrote the shortened transcript over the full one, so the full one is kept as `fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-11-07T23-09.jsonl.parts/` on `transcripts-blinded` (`d3db6f2b`). The scratchpad was lost: the pages' sources (rebuild each from its published page by the Artifact tool's read action before its next update), the usage script, the distance-crash evidence (row 929 holds its summary), the skill writer's task files and session state (start a fresh writer).

## Waiting on him

- Later, one per message, after the landing: Q4 (`Reflect`'s 28, default stay walk-only); PLAN's items 69 to 72; item 68 (the coordinator's defaults: the disk freed, S and T moved to climb batch 28); the strings question; the ledger pass review's decisions once written.
- No POSITIONS change waits to be reported: P-84, P-85, P-169 and P-170's changes of 11-08 write down his own answers in chat.

## Next, in order

1. At climb batch 28's landing: read FACTS and POSITIONS whole first, FACTS in pages (the light-boot landing rule), then the `coordinator` skill's `references/batch.md`, "The landing".
2. The ledger pass review he asked for at 10:1x on 11-06 (`explorations/reviews/ledger-pass-review-2026-11-06.md`, never landed), when the work leaves room; then the follow-ups file's 37 items.
3. Smaller: a `dropped` field in `record-landing.js`'s page schema; `tools/record-landing/page.md` line 17's sentences on a draft; the record-landing workflow's three fixes (`plan.md` cut at 8,000; the "settled" test on marked lines; `rows.add` applied by no step); items 265 and 267's "Needed by"; `check-index.sh`'s two unresolved paths; the revival page's date line, which `update.py` does not rewrite.

## The week's budget

His client at 07:0x UTC: 23 % of the all-models limit and 31 % of the Fable limit, which reset at 10:00 UTC on Friday 11-13. From the transcripts, 1 % of the all-models limit is about 1M Opus tokens written, a Fable token about 3.5 Opus tokens, and 1 % of the Fable limit about 130K Fable tokens written. Climb batch 27's run wrote 5.97M, its preparation 29.54M (the ledger pass 17.48M of it), climb batch 26's landing work 2.80M (the post-batch review, its three spans). Fable only for each batch record's review, a judge's second ruling, and a judgement he asks for (Q1's, about 0.3M Fable, 10:5x); no long writing pass before the reset unless he asks; a fresh planner rather than a large one resumed after a gap. The script is `<scratchpad>/usage/window.py START END`.

## Decided on 11-06 to 11-08, all pushed

- On 11-08: P-84 and P-85 widened to every number type's unboxed store (`bd1174a2`); P-169's store, (ii), and P-170, `System`'s `args` (`7ba33066`); the `fortress-repo` fixes from his page threads (`e9f828f3`, `4ccaeaaf`).
- P-165 (`asFloat` and its `=` leave `Number`), P-166 (`ZZ` and `QQ` value objects), P-167 (the carrier of `Any`), P-168 (what `SEQV` means, his "B"), all built by climb batch 27. His two stress tests in PLAN's phases 4 and 5 (`62b6d9109`). The reviews of the `Any` carrier, of strings under `SEQV`, the strings report (`f8b9b4796`), the natives review (`cc5ab2460`) and the natives judgement (`natives-device-2026-11-07.md`).
- The coordinator skill today: the landing rule after a light boot (`70900ce67` to `08c60aea8`); the branch-deletion fact in the `cloud-container` skill (`1090f1ecf`, `85ca6c272`); what a batch takes (`9cb72aca5`, `8937a5af0`); the main tree while a batch runs, simplified at his word (`bd7efb95b`). At the landing these five skill commits count as the coordinator's, not the batch's (the review names them).

## GitHub Pages

The per-push deploys of `docs/` failed from 11-05 by GitHub's soft limit of about ten builds an hour. He committed `.github/workflows/pages.yml` (`b8606fc30`) and set the Pages source to GitHub Actions at 18:0x on 11-06; its first run failed by the same limit at 18:05 UTC. The next `docs/` change, or a run by hand, tests it. The GitHub App token cannot push `.github/workflows/*`, dispatch a workflow or reach the Pages API.

## His standing orders, in the skills

- Never try to delete a branch on GitHub from a cloud container, and never ask him or remind him of one (`cloud-container`, "Rules for every agent"). A branch that waits for him is state in this note only; none is named now.
- "runtime" for the system, "at run time" for the moment, "run-time" for the adjective.
- Read the clock before writing any time, in a call of its own; take a past event's time from the record, never from feel.
- A quoted comment of his comes before any other step.

## The record, the machine, the pages

- **The model:** Opus 5.5 since about 06:45 UTC on 11-07, his choice, for Fable's weekly limit. Every writer of record entries, skill text and pages is Opus. Every brief says that the committing footer names plain "Claude", no model name.
- **Commits:** by named paths only (`git add -- PATHS` for a new file, then `git commit -m MSG -- PATHS`), each ending with `fortress-repo`'s footer exactly: `Co-Authored-By: Claude <noreply@anthropic.com>` and the `Claude-Session` line, whatever footer the harness suggests. Push after every commit, in the foreground: `sha=$(git rev-parse HEAD) && git push --atomic origin $sha:main $sha:claude/worker-brief-fable-vnnuv8 $sha:blinded-fable`. A worker commits by named paths and does not push.
- **The skill writer:** none since the rebuild; start a fresh one (`tools/skill-writer.sh new <task>`), its tasks in `<scratchpad>/skill-tasks/`.
- **The register:** plain, halfway to ASD-STE100, lists not tables, numbers as K or M, each term defined where it is used, one ask per message with its pushed review linked, no AskUserQuestion, no closing offer, "the coordinator" and never "you" on a page. His profile was read at 06:4x.
- **Pages hold only what he has not read.** The skill drafts page, https://claude.ai/artifact/9tX3rwtAgYHgbu8XZQtNhr, version 25 (version id `1794094314-8696`; source `<scratchpad>/skill-drafts-page/page-2.html`, rebuilt from the page at 23:3x, `page-2.v24.html` beside it): both sections empty, since he read items 30 and 31 (23:20) and approved drafts 32 and 33 (23:24, landed word for word at `c6122149`); the next landed change comes as item 34. The page of `fortress-repo` changes, https://claude.ai/artifact/4MiaAx2EmfK59E8d4DP9J3, version 14 (version id `1794104819-4e71`; source `<scratchpad>/fortress-repo-page/page.html`, `page.v14.html` beside it): changes 37 to 47 (climb batch 27's landing), 48 (the footer rule) and 49 to 51 (`e9f828f3`, `4ccaeaaf`), unread; read up to change 36 at 06:38 UTC on 11-07; the next change comes as change 52. The other live pages: the revival page https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5, version 29 (its source is in the tree, `explorations/coordinator/process-engineering/revival-story.html`; its GitHub Pages copy under `docs/revival-story/`); the learning page https://claude.ai/artifact/C6G2de9YGCQ8C8UFEEFLsr; the corrections page https://claude.ai/artifact/5noPHbJmZg41UWT74HGxno, version 16; the type-decisions review https://claude.ai/artifact/WELD6kRbiHPPzq7hLb8G4Z; the house style's reference page https://claude.ai/artifact/FoTnH7KzXt5MtGk3tTcZ8W; the revival page's proposal https://claude.ai/artifact/AvjRxsrtdxDbzz9q2qQJZe and outlines https://claude.ai/artifact/495PSP3WkiMFGVeXZp2PBq; the timeline refresher https://claude.ai/artifact/C84jo1st8THBQxm6aLThDi. After a compaction, publish a page by its URL. The scratchpad is `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad`.
- **The boot:** the full boot is the default; a light boot at his word, and his word of 05:5x on 11-07 gives it for the climb.
- **The machine:** 16G free at 14:0x after the coordinator removed the two old record-test worktrees, the pip and uv caches, the 22 speech-to-text and CUDA packages of 10-10 (at his word), packed the git object store (3.2G to 1.6G), and removed the eight landed rung worktrees after the push. Worktrees: the transcripts worktree `fortress-transcripts-blinded` only (`fortress-base27` removed after the landing; climb batch 28 needs a new base build). 23.1G free at 00:14 UTC on 11-08, after the planner removed its two probe worktrees. The check-ins are under "Running"; the next process stop is not known.
