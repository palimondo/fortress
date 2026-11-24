<!-- The brief of "Step 12: retire the old homes", as first written, 19:46 UTC on 2026-10-13, copied from transcript line 4546. -->
You are an Opus worker in the Fortress revival repository (`/home/user/fortress`, branch `main`). You retire the old homes of the coordinator's rules now that the new `coordinator` skill holds them: step 12 of the rewrite plan (`explorations/coordinator/process-engineering/coordinator-rewrite-plan.md`). You run no Fortress program and read no session transcripts. Load the `fortress-repo` skill and read its part `references/records.md`; then read the new `coordinator` skill whole (`.claude/skills/coordinator/`), since it is where every moved rule now lives.

## The goal

The curator's words (17:23 UTC, 2026-10-13): "I really hope that the consolidated record is significantly smaller than before. ... We have saved a significant amount of space, but not lost any reasoning capabilities from the status quo." FACTS and POSITIONS were consolidated tonight to 200.6K characters, from 361K; the entries that leave for the skills are still in them, about 77K. This step takes them out, so that nothing is held twice and nothing is lost.

## What leaves, and where it went

The map of homes is the outline `process-engineering/coordinator-skill-outline.md`, section 2, as its review `coordinator-skill-outline-review.md` section 3 changes it, and the writer's task `process-engineering/coordinator-writer-task.md`. The check against the kept list, `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/skill-outline/checks/kept.md`, found each rule in the draft; the writer's fixes since then restored its losses.

## What you do

1. **FACTS and POSITIONS**, with `explorations/coordinator/tools/record.py` only (its usage is in its header), in one `apply` file or a few:
   - remove each entry that leaves whole (the POSITIONS sections "How we work" and "How he wants to be spoken to" but the five moved into "The suites and the gate", P-31, P-61; FACTS "The container" but F-203, and the ledger's F-219 if the outline sends it out), each with a note naming its home: the skill, its file and its section heading, as it stands now. Before removing one, confirm with a bounded `grep` that its rule is in that home; an entry whose rule you cannot find stays, and you list it;
   - cut each clause marked "(moves to ...)" from its entry with `set`, after the same confirmation, the note naming the home;
   - a pointer to a removed entry is refused by the tool: replace it by the skill's file and section in words, or drop it where the sentence stands without it;
   - remove a section heading left empty;
   - rewrite the header comments of `FACTS.md` and `POSITIONS.md` to what they now are: the project only, one numbered line per entry, written with `record.py`, the history files holding each change's provenance and the earlier line, the structure in the coordinator skill's record part. Run `record.py check --base <your start>`.
2. **The README and the protocol.** Rewrite `explorations/coordinator/README.md` to a short page: the boot order the new skill's boot section gives, and one line that how the records are kept is the skill's record part. Replace `explorations/protocol.md` with a short page saying that it is retired, where its rules now live (the `coordinator` skill and the `fortress-repo` skill, by part), and that its last full text is in git at the commit before yours. In `CLAUDE.md` change only what names the protocol or the README's rule sections, if anything does.
3. **INDEX**: the lines for `README.md`, `FACTS.md`, `POSITIONS.md`, `BOOT.md`, `HELD.md`, `protocol.md`, `FACTS-history.md` and `POSITIONS-history.md` say what each file is now. Run `explorations/coordinator/check-index.sh`.
4. **HELD**: do not edit it; list which of its points on how he and the coordinator work the skill now holds, each with its home, for the coordinator to close.

Do not edit `BOOT.md` or any skill. Commit the paths you wrote as you go, each commit in one command (`git add -- <paths> && git commit -m … -- <paths>`), each message ending with exactly these two lines:

```
Co-Authored-By: Claude <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB
```

Do not push. Do not write a model identifier anywhere. Your final message is short: the commits; FACTS's and POSITIONS's sizes before and after; the entries removed and the clauses cut, counted; any entry or clause kept because its rule was not found, each with what is missing; the HELD points the skill holds, as a list of line numbers with homes.
