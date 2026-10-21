<!-- Who reads the fortress-repo skill's revival part (references/revival-changes.md), who points workers to it, how it grew from 8K to 74K characters between 2026-10-08 and 10-20, and what it holds: a read-only scout's report of 2026-10-21, at the curator's word of 17:33 UTC, word for word; its scripts were scratch and are not kept. -->

# The revival part: reads, pointers, growth, contents

A read-only scout's report, launched at about 17:36 UTC on 2026-10-21 at your word, returned at about 18:05 UTC. Word for word; the coordinator reworded nothing. Its scripts were in the session's scratch folder and are not committed.

Scout report on fortress-repo's references/revival-changes.md: who reads it, who points workers to it, how it grew, what it holds. Facts only.
Scripts are in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/revival-scout/ and are named in full below. Run each with python3 -I. Run scan.py and scan2.py first; each takes about 3 minutes.
Data: 1,246 transcripts. They come from the backup worktree /home/user/fortress-transcripts-blinded/projects (kept since 2026-09-08, last pass 2026-10-21T17:39) and from the live /root/.claude/projects; where both hold a file, I used the larger copy. No other project folder exists (no -home-user-fortress-w4), live or in the backup. My own transcript is left out. The period runs from the file's creation (24af7743b, 2026-10-08T22:54) to 2026-10-21T17:40.
Definitions:
- Loaded: a Skill call for fortress-repo, or the harness's "Base directory for this skill: .../fortress-repo" message.
- Read: a Read call on the file, or a Bash or Grep call that names it and whose result holds at least one line of it (from any committed version). Reading back a saved output over 30 KB counts if at least 2 lines appear that are found in no other part.
- Whole: a Read with no offset or limit, a result holding at least 90 % of the lines of the version current then, or cat/nl with no range filter. Grep: a grep that printed lines. Preview: output over 30 KB, so the agent saw only a 2 KB preview. Part: everything else (sed -n, head, git diff or show of the file). Edits are not counted as reads.

1. READS (/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/revival-scout/final.py; by group: .../revival-scout/reads.py --part NAME; by role: .../revival-scout/roles.py; by batch: .../revival-scout/perbatch.py)
All 386 agents of the period (batch agents, Agent-tool subagents, headless skill writers, the rewrite workflow), by week of start (week of 10-05 | 10-12 | 10-19):
  agents 121|204|61 = 386; loaded fortress-repo 114|190|50 = 354
  revival-changes.md: readers 47|44|14 = 105; 251 calls: whole 26, part 156, grep 64, preview 4, error 1
  compiler.md:        readers 30|59|18 = 107; 158 calls: whole 75, part 39, grep 36, preview 8
  Other parts, as readers (calls, whole calls): records 254 (277, 231), committing 251 (277, 225), build-and-caches 194 (205, 155), session 190 (213, 158), tests-writing 164 (204, 114), tests-running 151 (176, 121), worktrees 147 (155, 133), interpreter 124 (178, 80), specification 123 (151, 88), gate 108 (140, 74), library 89 (109, 66), sources 61 (124, 1), SKILL.md read as a file 44 (65, 19), exploring 43 (48, 26), toolchain 15 (17, 12).
By group. Each line: agents; loaded; revival-changes.md readers, then calls as whole/part/grep; compiler.md readers, then calls the same way:
  batches 11-13: 51; 51; 25, 73 = 6/51/16;  11, 14 = 10/1/1 (+2 preview)
  batches 14-20: 93; 93; 26, 38 = 0/27/11;  36, 42 = 33/4/4 (+1 preview)
  Per batch 11..20, revival-changes.md readers/agents: 8/14 10/17 7/20 3/14 5/12 3/17 5/16 6/14 2/12 2/8. compiler.md readers, same agent counts: 4 2 5 4 4 10 6 6 5 1.
  Rung workers, batches 11-20 (43): 31 read revival-changes.md (1 whole call, 39 part, 18 grep); 24 read compiler.md (24 whole calls). Skeptics (41): 9 read revival-changes.md (no whole call); 18 read compiler.md (18 whole calls).
  Agent-tool subagents: 219; 195; 37, 88 = 9/54/22 (+3 preview); 47, 70 = 26/16/24 (+4). Of these, 10 of 38 subagents described as reviews read revival-changes.md, 7 of 11 skill cold readers (none of whom loaded the skill), and 4 of 45 record/plan/ledger passes.
  Headless skill writers: 18; 14; 13, 46 = 7/22/15; 8, 23. The main session (not in the counts above) made 9 calls on revival-changes.md (5 part, 4 grep) and 3 on compiler.md.
  Batch agents that read revival-changes.md whole: batch 11 (1 rung worker, the gather, the cold reader), batch 12 (gather, cold reader), batch 13 (cold reader). None in batches 14-20.
compiler.md, counted with care:
- Matched by its own lines. There is no other compiler.md in the tree. area-compiler.md, its name until 2026-10-06, was counted separately and has no reads in the period.
- All 75 whole calls either returned at least 90 % of that version's lines or were Reads with no range.
- 8 calls only got the 2 KB preview: 7 cats of several parts at once (e.g. "cat compiler.md tests-writing.md tests-running.md", 30.7 KB) and 1 git grep. They count as preview, not whole. Where the agent later read the saved output, that read is counted by its content.
- .../revival-scout/missed.py found no read of either part that was missed because the command lacked the skill path.

2. WHO POINTS WORKERS THERE (.../revival-scout/briefs.py [-v]; git log -S'revival-changes' -- explorations/coordinator/climb-batch-workflow.js)
- SKILL.md, which 354 agents loaded: line 126 (the "Static parameters" bullet) and line 188 ("load it when a team source, an old note or your training disagrees with this skill"). Also exploring.md lines 41-42.
- Batch script before 05c254085 (2026-10-10; batches 11-13): its DELTA_PART constant, the file's path, appeared in every rung brief, 14/14 (as the target of the entry to write in record.md). Also gather 3/3, review 3/3, cold reader 3/3 ("Read SKILL.md, then DELTA_PART whole"), commit 3/3, skeptic 4/16, judge 0/6, gate 0/3.
- Batch script from 05c254085 on (batches 14-20): the template never names it. explorations/coordinator/tools/workflow-scenarios.js:339 fails any brief that names revival-changes.md or .claude/skills/. Rung briefs: 0/29. 23 of the 64 other briefs hold the name only inside earlier agents' results pasted into them, as lists of lines made false, e.g. "revival-changes.md:56, :58, :61" (skeptic 8/25, gather 6/7, review 3/7, judge 3/6, commit 3/7).
- Agent-tool briefs: 12 of 219 name it (6 cold reads of skill edits, 2 revival-story tasks, the skills-agenda audit, the batch-script change, batch 11's post-batch review, the routing of batch 12's review). Skill-writer prompts: 10 of 18. The coordinator skill's batch.md:85 and skill-rewrite.md:26 tell the coordinator to have the writer update it after each landing.

3. GROWTH (.../revival-scout/growth.sh > growth.txt; .../revival-scout/growth_top.py; .../revival-scout/committers.py)
40 commits. Size in characters: 8,159 (24af7743b, 10-08) -> 28,242 (6c021c983, 10-09, after batch 13) -> 27,928 (10-12) -> 32,396 (b14, 10-14) -> 41,678 (b15) -> 46,307 (b16, 10-16) -> 54,909 (b17, 10-17) -> 61,985 (b18, 10-19) -> 68,584 (b19) -> 74,260 (df58b05b8, 10-20; unchanged since).
By kind of commit (commits, characters added):
- skill writer's update after a landing, batches 14-20: 7, +37,816
- gather's fold inside the landing commits, batches 11-13: 11, +14,875
- writer's fixes after the cold reads, batches 15-20: 5, +8,414
- the rewrite (creation, its cold-read fixes, the agenda removal): 3, +7,766
- batch cold reads, batches 11-13: 3, +3,049
- post-batch false sentences, batches 11-13: 3, +1,713
- review folds, batches 11-13: 3, +499
- one-line edits: 5, +128
Who made them: the creation and its fixes by the rewrite Workflow (wf_185878c8). The batch 11-13 folds, review folds and cold reads by those batches' gather, review and cold-reader agents. The other 21 commits, from 7b3226bb2 (10-09) on, by headless skill-writer sessions. 18 of those 21 are matched by commit output or subject. 1794398eb, f13f373c4 and 315420c02 are matched only by their hash appearing in those sessions, so they are probable.
The five largest additions:
  +8,602 0707ac9ac 2026-10-17 "fortress-repo: climb batch 17 revival changes and the sentences it made false" (writer, after landing)
  +8,159 24af7743b 2026-10-08 "fortress-repo: every part rewritten by the outline and the seven principles" (creation, in the rewrite)
  +7,685 f13f373c4 2026-10-14 "fortress-repo: fold climb batch 15's revival changes" (writer, after landing)
  +4,612 0cf48c7b2 2026-10-20 "fortress-repo: climb batch 20's revival changes, the integer power and the array sites" (writer)
  +4,468 01ff2e099 2026-10-14 "fortress-repo: the revival changes of climb batch 14, walk's abstract-method check by coverage, walk's power in a size" (writer)

4. WHAT IT HOLDS (.../revival-scout/sections.py; .../revival-scout/timewords.sh)
Sections, in characters (entries):
- intro, line 1: 1,470
- "Dispatch is on every argument", line 17: 12,014 (7)
- "Traits and objects", line 85: 15,816 (12)
- "Static parameters", line 166: 22,228 (14)
- "Numbers are siblings", line 288: 14,022 (14)
- "Loops and reductions", line 383: 7,030 (5)
- "Specified, but not built", line 415: 1,681 (2)
Each of the 54 entries has three bullets. Their totals: Original 22,882, Resolution 35,239, Reason 11,979. The largest entries: "Walk's check of two generic declarations" (line 43) 5,791; "An abstract method without a body..." (line 105) 3,702; "A reduction or a comprehension without static arguments, under walk" (line 201) 3,331.
Every "- Original:" bullet describes the tree before a change. Outside those bullets there are change-log sentences: "now" on lines 29, 71, 108, 123, 141, 198, 248, 274, 317, 374, 389 and 420, plus "once", "had kept" and "where they wrote". Examples:
  Line 70, "Exclusion where a declaration has static parameters": "Once walk compared declared domains ("Walk's check of two generic declarations", above), it read two generic declarations as excluding only where the parameter types at one position excluded each other." This is a state that an earlier revival change created.
  Line 389, "The lifted type of a reduction without an identity": "The declarations at `Any` had kept some of walk's reductions running while walk gave `Bottom` to a type parameter that a call did not fix. Walk now instantiates such a reduction as ... says."
  Line 317, "An integer power": "The team's tests `ProjectFortress/tests/realArith.fss`, `compoundArray.fss` and `simpleExp.fss`, and the demos ... now write `10.0^(-k)` where they wrote `10^(-k)`."

WHAT I COULD NOT SEE
- .../revival-scout/missing.py: 3 of the main session's 565 Agent calls have no transcript. All 3 fall on 2026-10-08 between 15:56 and 16:30, when a container died, so before the period. None is missing within the period. Nothing before 2026-09-08 is backed up. An agent whose launching call was lost as well would leave no trace: evidence there is thin.
- The read classification is heuristic. "Part" lumps together heading lists (grep '^\*\*'), targeted sed ranges and git diffs of the file. Whether a reader used what it read is not measured. Reading a rung's record.md that held a draft entry is not counted as reading the file.
- Weeks are by the agent's start. Batches are identified by Workflow run id, with the number taken from "# Fortress climb batch N" in the briefs.
