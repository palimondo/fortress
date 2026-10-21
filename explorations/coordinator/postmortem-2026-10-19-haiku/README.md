<!-- The post-mortem of the coordinating session's Haiku window, 2026-10-16 20:09:30 UTC to 2026-10-19 21:04:25 UTC, opened 2026-10-19 at the curator's word: the index into the transcript, the scripts that print it, and the reviewers' judgements of every act of the coordinator in the window. -->

# The Haiku window

**The window.** The main transcript (`fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`) holds, at line 34645, `/model claude-haiku-5-5`, sent by the curator's iOS client (`entrypoint` `remote_mobile`) at 20:09:30.037 UTC on 2026-10-16, the same instant as his message at line 34648. The harness then put a reminder in the session's context that it now ran as Haiku 5.5. Every assistant message from line 34650 to line 37629, where his `/model claude-opus-5-5` came at 21:04:25 UTC on 2026-10-19, reads `claude-haiku-5-5`: 683 messages. The coordinator did not tell him, and its boot notes in the window kept the line that the session runs on Opus 5.5.

**The workers kept their tiers.** Of the 45 worker transcripts started in the window (under `subagents/`), every assistant message reads Opus 5.5 but for the two Fable reviews of the batch records (`a03cec474b0493395`, batch 17; `ac5d5f10ca18f1414`, batch 18) and the two Sonnet reads of 2026-10-19 (`a912ea4b6b6e949c3`, `a1f88f61f6c6d0c8e`). The skill writer's headless session (`94b97457-925…`) is Opus 5.5 throughout. So what Haiku wrote is the coordinator's own work: its messages to the curator, its briefs and the skill writer's task files, its own commits, the two compaction summaries, the revival page's version 22.

**The tools.**
- `timeline.py` writes `timeline.txt`: one line per event of the window (CURATOR, SAY, LAUNCH, COMMIT, WRITE, PAGE, CMD), each with its transcript line number.
- `show.py LINE [LAST]` prints transcript lines verbatim, tool results cut at 4,000 characters (`FULL=1` for all).

**The judgements**, one file per part of the window, each act with what was done, who decided and who reviewed it, a verdict with its evidence, and what to redo:
- `part-1-evening-and-morning.md`: lines 34645 to 35415, 2026-10-16 20:09 to 2026-10-17 12:38 UTC.
- `part-2-batches.md`: lines 35415 to 37090, 2026-10-17 12:38 to 2026-10-18 05:05 UTC.
- `part-3-return.md`: lines 37090 to 37629, 2026-10-19 16:15 to 21:04 UTC.
