<!-- The seventh and last slice of FACTS's consolidation to what a decision needs, written 2026-10-13: the 30 entries of "The container", what each became, the titles changed and their citations, the line references corrected, the sizes, the verbatim check's result, and the points for the checker. -->

# FACTS, seventh slice: the container

The base is `da72754c2`. The slice was lines 189 to 218 of `explorations/coordinator/FACTS.md`, the whole section "The container", 30 entries. It is now lines 189 to 215, 27 entries. Three entries were merged into a fourth; the other 27 were rewritten in place, and none stands verbatim. Every earlier text is verbatim in `explorations/coordinator/FACTS-history.md`, under "Rewritten 2026-10-13, The container consolidated to what a decision needs", each after a comment line that says what became of it. No entry outside the slice changed. The section stays in FACTS, consolidated in place; nothing moved into a skill.

## What each entry became

Old line, new line, what it became, the main cut and where that detail lives.

1. 189 → 189, the process cost of the climbs, kept under its opening words. Cut: the clause that pointed to this history for the old measurements. Added: the process-engineering study (`coordinator/process-engineering/README.md`) for the spend of batches 8 to 10 by role.
2. 190 → 190, retitled to the boot's fixed part and the bytes per token. Cut: the boot's total and the figures by file, measured with `FACTS.md` at 220 KB; `process-engineering/coordinator-shape.md` § 2 computes a boot by file from the entry's ratios and is cited.
3. 191 → 191, the Bash tool's ceiling, kept under its opening words. Restated from the Bash and `Monitor` tools' own descriptions (600,000 ms in the foreground; a watch of at most 1,800,000 ms); the rule that nothing runs beside a kept number stands.
4. 192 → 192, the parser directories, kept under its opening words. Cut: the 723 directories and 4.2 GB (the comment at `explorations/experiment/env.sh:9`). Added: the JVM's temporary directory as the place, from plt's `IOUtil`; that no ledger row records the leak; env.sh's removal rule (`env.sh:9-21`).
5. 193 → 193, a container lost outright, kept under its opening words. Cut: the incident's agents, tokens and 13 hours (`remote-container.md` § The 2026-09-17 incident). Added: § The branch trap for the cause.
6. 194 → 194, the transcript backup, kept under its opening words. Cut: the hook's earlier waits, the copier's comparison with the old copier, the `gc` setting, the 64 MiB split and the snapshots skipped before the change (all in `remote-container.md` § How the snapshot works and § Three traps). The sentence that the push loop covers what the git-check hook protected is now the coordinator's push after every commit.
7. 195 → 195, the Workflow harness's two agents, title kept. Cut: the cache probes' token counts (the runs' IDs kept; the project type's counts in `process-engineering/README.md`), the untracked `.claude/agents/cache-probe.md`, which is gone from the container, and the skills named as examples. The `parallel()` timing points to `batched-climb-plan.md` § 2, which holds it.
8. 196 → 196, a VM restart with the disk intact, kept under its opening words. Cut: the kernel strings (`remote-container.md` § The 2026-09-18 restart).
9. 197 → 197, a VM restart that rolls the disk back, title kept. The restart's account restated as what such a restart loses and keeps; its 1 hour 40 minutes and eleven commits cut.
10. 198 → 198, a container whose clone fails, title kept. Cut: the 26 minutes before the resume and the transcript's sizes. The push to `blinded-fable` is cited from `explorations/protocol.md`, hard rules, "Every push".
11. 199 → 199, retitled to where the backup's Stop hook is registered. The two passes and the rebuilt container's 4 minutes stand.
12. 200 → merged into new 200. Its rule is new 200's; its case is in `coordinator/interrupt-archaeology/judgement.md` § 1.
13. 201 → merged into new 200. Its title stated a reading that does not hold; new 200 states the present (a message is queued and kills nothing); the case is in `judgement.md` § 1.
14. 202 → merged into new 200, which now says that a manual compaction between turns leaves a running Workflow alive and its agents keep writing; the cases are in `judgement.md` § 1.
15. 203 → 200, "Stopping a turn kills every background agent ...", title kept, the three entries above merged in. Cut: the counts of interrupts, agents, messages and compactions (`judgement.md` § 1).
16. 204 → 201, a restart of the session's process, title kept. Cut: the push loop, and the names of the resume copies in the scratchpad, which does not keep them.
17. 205 → 202, the platform's cap, title kept. Cut: the run lengths restated in hours, minutes and seconds.
18. 206 → 203, retitled: env.sh takes `FORTRESS_HOME` from its own place. Cut: the reruns that checked the move (their scripts, `reviews/mie-probes/forest/forest-run.sh` and `perf-probes/nat/runtime/run-all.sh`, are gone from the tree) and the separate analysis session's paths. Added: what env.sh sets, the two gate runners that run with it, and the `fortress-repo` skill's setup lines that replace it for a worker.
19. 207 → 204, the cache's life and a wait, title kept. Cut: probe P1's figures (`process-engineering/p1-cost.md`, cited). `wait_for` now points to where it is defined.
20. 208 → 205, a headless session's cache, title kept. Cut: the token counts. Added: `skill-writer.sh:29-40`.
21. 209 → 206, an agent loads the `fortress-repo` skill, title kept. Cut: the five workers' tasks.
22. 210 → 207, check-ins under an hour, title kept. Cut: the other forms tried and the seven calls' spacing.
23. 211 → 208, `agent()` returns null, title kept. The batch's case restated as the mechanism (the manual's section holds the case).
24. 212 → 209, `node --check`, title kept. Added: the manual's section, "How the script is checked", and `tools/workflow-scenarios.js` as the check that runs.
25. 213 → 210, the automatic permission check, title kept. Cut: the scratch path of the moved outputs.
26. 214 → 211, retitled: no push loop runs, and who pushes. Cut: the loop's script and log, gone from the scratchpad.
27. 215 → 212, Fable and the all-models limits, title kept. Cut: the usage panel's readings; the window is kept as the ratio's basis.
28. 216 → 213, push notifications, title kept. Cut: the date.
29. 217 → 214, a page republished after a compaction, title kept. Cut: the date and the version number.
30. 218 → 215, a repository path on the phone, title kept. Cut: the date.

## The titles changed

| Old line | Old title | New title |
|---|---|---|
| 190 | **A boot after a compaction costs about 285K tokens of context, and `FACTS.md` is about two fifths of it** does not hold | **A boot after a compaction costs about 74K tokens of context before it reads the record, and each file it reads costs one token per 2.5 to 3.0 bytes** |
| 199 | **The transcript backup's Stop hook is registered twice in a container set up by `setup.sh`** does not hold | **The transcript backup's Stop hook is registered in the tracked `.claude/settings.json`, and `setup.sh` adds it to `~/.claude/settings.json` only when the tracked file does not register it** |
| 200 | **A user interrupt of the coordinating session's turn kills a background Workflow run** | merged into **Stopping a turn kills every background agent alive at that moment; a message sent while the coordinator is busy kills nothing** |
| 201 | **A message from Pavol that arrives while the coordinator is inside a turn kills a running Workflow's agents, whatever the turn is doing** (the entry said this reading is wrong) | merged into the same entry |
| 202 | **A manual compaction issued between turns leaves a running Workflow alive** | merged into the same entry |
| 206 | **`explorations/experiment/env.sh` is the one script every probe and gate runner sources, and it is verified from its new home** | **`explorations/experiment/env.sh` is the one script every probe and gate runner sources, and it takes `FORTRESS_HOME` from its own place in the tree** |
| 214 | **The push loop pushes `main` every 4 minutes when every unpushed commit touches only `explorations/`, and otherwise only the backup branch `wip/main-backup`, so that a container loss loses nothing and `main` stays gated** does not hold | **No push loop runs: the coordinator pushes after every commit, `main` to `main`, to `claude/worker-brief-fable-vnnuv8` and to `blinded-fable`** |

Kept: the titles of 195, 197, 198, 203, 204, 205, 207 to 213 and 215 to 218, and the opening words of the untitled 189, 191 to 194 and 196. Old 190 and 206 keep their opening words ("A boot after a compaction costs about", "`explorations/experiment/env.sh` is the one script every probe and gate runner sources"); old 199 keeps "The transcript backup's Stop hook is registered".

## The citations

Each changed title was searched with `git grep -F` (and `-E`) on distinctive parts of it, across `explorations/` and `.claude/`.

Updated in live files:

- `explorations/coordinator/remote-container.md:65`, "The push loop pushes `main` every 4 minutes ...", now "No push loop runs ...".
- `explorations/coordinator/remote-container.md:66`, the same citation inside the comment that keeps the bullet's earlier text, now "No push loop runs ..."; the quoted earlier text is unchanged.
- Inside the slice: new 194 cites "No push loop runs ..." where old 194 cited the push loop's title; new 203 cites "The disk allowance fills with parser-generation temp directories".

`facts-extract.sh --check` resolves "No push loop runs" to `FACTS.md:211`, "A boot after a compaction costs" to `:190`, "Stop hook is registered" to `:199`, "is the one script every probe" to `:203` and "Stopping a turn kills" to `:200`.

Left as they are, being reports or history: `explorations/coordinator/process-engineering/coordinator-rewrite-plan.md:128` (old 190's title, "costs about 285K tokens", with "about 250K now"), `process-engineering/coordinator-shape.md:48` and `:260`, `explorations/reviews/skills-review-fable.md:43`, and the earlier slices' reports. The old titles stay findable in `FACTS-history.md`.

`BOOT.md` cites none of the slice's titles. POSITIONS, PLAN, INDEX, HELD, the protocol, the README, the batch workflow's `.md` and `.js` and the tools under `coordinator/tools/` cite only titles that stand ("The Workflow harness runs two agents at once on this box", "`agent()` in a Workflow returns null ...", "`node --check` does not check the batch script ..."), or none.

Under `.claude/skills/`, for the coordinator:

- `.claude/skills/coordinator/references/sources.md:36` cites old 190's title and says "its text gives 250K and a third". The new entry gives the fixed part and the ratios, and cites `coordinator-shape.md` § 2 for a boot by file; `references/boot.md` no longer gives a token figure (`sources.md:103`).
- `.claude/skills/coordinator/references/sources.md:64` cites old 200, 201 and 202, all merged into new 200 ("Stopping a turn kills every background agent alive at that moment ..."), which keeps each fact the line names: interrupts, messages, `/context`, compactions and the two cases not known.
- `.claude/skills/fortress-repo/references/sources.md:101` cites old 200 and 201, merged into new 200.
- `.claude/skills/cloud-container/references/sources.md:47` cites old 199's title, "registered twice in a container set up by `setup.sh`", for its last sentence, which stands (setup.sh's about 4 minutes).
- `.claude/skills/cloud-container/references/sources.md:55` and `.claude/skills/fortress-repo/references/sources.md:289` cite "The push loop pushes `main` every 4 minutes ...", now "No push loop runs ...".

Lines under `.claude/skills/` that cite titles or opening words that stand, each fact they name kept: `cloud-container/references/sources.md:9`, `:10`, `:18`, `:26`, `:27` (the idle runs' sentence), `:28`, `:29`, `:31`, `:35`, `:38` (the git-check hook, the backup entry's second half), `:39`, `:43`; `coordinator/references/sources.md:28` (the last start and the next stop are the boot note's), `:48` (the cache entry's last sentence, the 270 s cap), `:59` to `:63` (the two-agent entry's last sentence is still the skill written mid-session), `:65` to `:68`; `fortress-repo/references/sources.md:42`, `:96`, `:98` (`Monitor`, now written 1,800,000 ms), `:99`, `:102` (shell scripts survive), `:103`, `:293`.

## The line references corrected

Every `file:line`, section and path in the slice was printed or listed against the tree.

- 192: `syntax_abstractions/rats/RatsUtil.java:138-146` to `:138-145`, the method `getTempDir` (`:146` is blank).
- 207: `wait_for` was cited "in `coordinator/climb-batch-workflow.js`", which no longer defines it. It is defined in `.claude/skills/fortress-repo/references/session.md:34-36` ("Long commands"), at most 270 s, and the script's prompts use it at `climb-batch-workflow.js:1311`, `:1395` and `:1593`.
- Dropped, gone from the tree or the container: `reviews/mie-probes/forest/forest-run.sh` and `perf-probes/nat/runtime/run-all.sh` (`ls`: no such file), `.claude/agents/cache-probe.md` (no `.claude/agents/`), `scratchpad/autopush.sh` and `autopush.log` (not in the scratchpad), and the scratch path `tmp/gate-batch-N.prev-0653`.

Hold: `.claude/settings.json:8`; `explorations/experiment/setup.sh:67-75`; `remote-container.md` § How the snapshot works, § Three traps, § The branch trap, § Recovering a session whose container died (step 5), § The 2026-09-17 incident and § The 2026-09-18 restart; `batched-climb-plan.md` § 2; `compile-ladder/climb-batch-6.5b/RECORD.md`, "A relaunched gather"; `climb-batch-workflow.md`, "An agent that comes back with nothing" and "How the script is checked"; `ATTEMPTS`, `callAgent`, `retryHead` and the `recover…` functions in `climb-batch-workflow.js` (`:1648`, `:1676`, `:1660`, and `:1706` to `:1761`); `interrupt-archaeology/judgement.md` § 1 and `evidence.md`; `tools/journal-text.py`; `tools/skill-writer.sh` (`--session-id` at `:35`, `--resume` at `:39`); `iteration-cost.md`, `repair-batch-review.md`, `postmortem-2026-09-29/characterization.md`; `coordinator/transcript-backup/`; POSITIONS "Check-ins and stops"; PLAN's housekeeping item under "Off the path, parked" (`PLAN.md:418`); the commit `transcripts-blinded@974d9be7` ("Backup: return from the Stop hook at once; copy only what changed"); the path `projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-10-08T15-41.jsonl.parts/` on `origin/transcripts-blinded`; and, on the container, `/home/user/fortress-transcripts-blinded/.backup.log`, `.backup.state`, `/tmp/env-manager.log` (its three log lines found 74, 74 and 76 times), `/root/.claude/launcher-settings.json`, `~/.claude/stop-hook-git-check.sh` and the scratchpad's `stop-hook-git-check.sh.orig`.

## The ledger, the tests and the last landed gate

No entry of the slice says that no ledger row holds a defect, names an `XXX` test, or names the last landed gate. New 192 now says that no row records the parser directories' leak: `facts-extract.sh 'ledger-find:…'` on `rats` (38 rows, none on the leak; row 289, the nearest, is a grammar compiled by Rats!), `Rats temp*`, `RatsUtil`, `getTempDir`, `temp director*`, `disk` and `tmp parser` finds none.

## Earlier slices' stale items in this slice

Slice 1 listed three titles in this slice that no longer held, its base lines 201, 210 and 225 (`49d78c8cd`), here old 190, 199 and 214. All three are retitled. Slice 1 also named `.claude/skills/coordinator/references/sources.md:36`, which cites old 190; it is listed above for the coordinator. Slices 2 to 6 list no item in this slice.

## The size

| | Characters | Bytes | Entries |
|---|---|---|---|
| Before, lines 189 to 218 at `da72754c2` | 32,023 | 32,041 | 30 |
| After, lines 189 to 215 | 27,798 | 27,819 | 27 |

Characters count each line with its newline. The whole of `FACTS.md` went from 262,891 bytes to 258,669.

## The script

`python3 explorations/coordinator/tools/check-verbatim.py da72754c2 explorations/coordinator/FACTS.md explorations/coordinator/FACTS-history.md`, exit 0:

```
entries in explorations/coordinator/FACTS.md at da72754c2: 198 (262891 bytes); now 258669 bytes
  verbatim in the file now:        168
  verbatim in the history file:    30
  in both (should be 0):           0 []
  in neither (should be 0):        0
moved to history (old line numbers): 189 190 191 192 193 194 195 196 197 198 199 200 201 202 203 204 205 206 207 208 209 210 211 212 213 214 215 216 217 218
```

## Points for the checker

1. **Three entries merged into one.** Old 200, 201 and 202 each stated a part of old 203's finding: the interrupt kills, a message kills nothing, a compaction between turns kills nothing. New 200 keeps each, with the one detail only old 202 had (the agents keep writing through a compaction). Two skill lines cite the merged titles (above).
2. **Old 190's new title carries figures.** The 74K (56K fixed and 18K of summary) and the ratios of 2.5, 2.7 and 3.0 bytes per token are the old entry's own, measured once; they still describe how a boot is estimated, where its total moves with the files. Whether the fixed part has grown with the skills since is not measured.
3. **Old 199's two passes may not hold.** This container's `~/.claude/settings.json` registers the backup hook as well as the tracked file, and the backup log's recent passes are single, not pairs 4 s apart. I did not measure it, as the brief asks; the sentence stands as the old entry's and is the place to check.
4. **Old 206 retitled although its title was none of the brief's kinds.** "And it is verified from its new home" told how a move was checked. Its opening words stand, and nothing cites it. Its claim that every probe and gate runner sources env.sh holds for the gate's two runners; a worker following the `fortress-repo` skill sets the same variables by hand instead, which the entry now says.
5. **FACTS now cites a skill file in two entries.** New 203 points to `.claude/skills/fortress-repo/references/build-and-caches.md` for a worker's setup lines, and new 204 to `references/session.md` for `wait_for`, because that is where each is defined; nothing moved into a skill. If the record should not point into a skill, new 204 can cite the script's prompts alone.
6. **Additions from primary sources, read, not run.** New 192's temporary directory from `javap -c` on `ProjectFortress/third_party/plt/plt.jar` (`IOUtil.createAndMarkTempDirectory(String, String)` calls `File.createTempFile` with a null directory) and from `RatsUtil.java:143`'s fallback to `java.io.tmpdir`; the removal rule from `env.sh:9-21`. New 203's settings from `env.sh:1-8` and the runners' `:11`. New 205's lines of `skill-writer.sh`. New 209's scenario tool from `climb-batch-workflow.md:316`. New 189's study from `process-engineering/README.md`'s "Done" list. New 211's three pushes from `protocol.md:32-36`.
7. **The git-check hook's state.** New 194 says the hook is made a no-op at the curator's request and comes back at each restart. At this reading, after the machine's start at 02:30 UTC (`uptime -s`), `~/.claude/stop-hook-git-check.sh` is the platform's original script, as the entry predicts.
8. **The Node version.** New 209 keeps v22.22.2, the version the slip was measured on; `node --version` in this container prints v22.22.0. I did not run the check again.
9. **The size fell by 13 %.** Old 191 and 192 grew (from 167 to 546 and from 654 to 938 characters), since the first now states the tools' limits and the second the leak's place, its missing row and env.sh's rule. New 200 and 201 are still the longest, at 2.2K and 3.2K; the `coordinator` skill's `agents.md` draws on nearly every sentence of both (`coordinator/references/sources.md:59-68`).
10. **A live plan cites old 190.** `process-engineering/coordinator-rewrite-plan.md:128` quotes "costs about 285K tokens". I counted it as a worker's report and left it; it is also the plan of a rewrite still to run, so the coordinator may want the citation updated.
