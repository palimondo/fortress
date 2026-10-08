<!-- What four climb batch 10 rung workers (N, G, W, C) read before their first edit, how much of it the record already held, what they weighed, wrote back and took from their briefing, measured from the transcripts of run wf_d5ec6194-bcc on 2026-10-08, with a sized proposal for a librarian pass and a backlog pass; evidence for the curator's decision, nothing built or run. -->

# Context study: what batch 10's rung workers gathered, and what the record already held

Written 2026-10-08 for the curator, through the coordinating session. Read-only: no build, no test and no Fortress program was run, and no file but this note was written. The scripts and extracts are in a scratch folder outside the repository and are not committed.

The curator suspects two things. Workers rediscover what the record already holds. And the record is written but rarely read. This note measures both on the four rung workers of batch 10, then sizes a librarian pass.

## Words used

- **The record**: `FACTS.md`, `POSITIONS.md`, `INDEX.md`, the gap ledger, the notes under `explorations/` and the maps under `explorations/coordinator/map/`. Every citation of the record below is the file at the batch's base, `9c9e823d5` (`git show 9c9e823d5:PATH`). The four workers started from it. The lookups ran the current `facts-extract.sh` with `--root` on a copy of `explorations/` at that commit.
- **Brief**: the first message of a worker, 73K to 87K characters. **Briefing**: what the command in step 1 of the brief prints, `facts-extract.sh` with 33 to 51 keys, in 3 to 5 parts.
- **The four rung workers**: W (walk, agent `ac7f17fcef729d710`), N (numbers and lists, `a9d085d2ca3d1673f`), G (generators, `ad8b9ef1d620d222e`), C (checker defects, `a17102eab231ad505`). Their first skeptics: W `a67eeefc52d0d3403`, N `a3efce1e24bbeda39`, G `a17fa6c49e2058f77`, C `a0870bca7f79bbd8d`. All are in run `wf_d5ec6194-bcc`; all 21 agents ran on the Opus tier.
- **Primary text**: the source, library, specification or test that a worker edits, models or cites. No record can replace it. **Knowledge read**: any other read that teaches how something works or what was decided. **The gather**: the stage after the rungs that folds their record lines into the ledger and FACTS and writes `RECORD.md`.
- **Call n** (written "W 42"): the n-th tool call of that agent, counted from 1 in the order of its transcript file.
- **First edit**: the first call that changes a tracked file of the worktree (`git mv`, Edit, Write, `sed -i`, a redirect into a tracked path), a trial edit included. **First fix edit**: the first kept edit that is not a test (product code, library or specification). **Window A**: the calls before the first edit. **Window B**: the calls before the first fix edit. Two windows, because the brief orders "test first": a worker's first edit is a test promotion (N's window A is 20 calls) and most of its gathering comes after.
- **Writes**: input plus cache-creation tokens of the turns in a window, the measure of `labor.md`. **Tokens of a result**: 0.41 per byte plus 110 per call. A fit over these four transcripts (885 turns) gives 0.40 per byte, R2 0.79, so I kept the 0.41 of `reviews/worker-context-cost.md`. The remainder of the writes is the worker's own output and the harness's reminders. The stored thinking blocks are empty (0 of 126, 177, 135 and 214 for W, N, G, C), and the stored narration is 4, 4, 0 and 3 short text blocks.
- **ITE** (input-token equivalents): cache write 1.25, cache read 0.05, fresh input 1, output 5, the rates `reviews/worker-context-cost.md` uses for the newer Opus tier. A token that enters at turn k of T turns costs about 1.25 + 0.05 (T - k). The four workers cost 23.5M ITE; the batch's 21 agents 48.7M ITE and 6.26M writes.

## Already measured, and not measured again

- `reviews/worker-context-cost.md:7,11`: gathering is a quarter of a worker's cost; on eight agents read by hand, 9% of it went to things the record already stated. Its line 14 is the curator's reading: the briefing's worth is in the decisions it prevents.
- `coordinator/process-engineering/labor.md:39,40,42,43`: a rung worker's reading beyond its brief is 10% of its tokens, and 74% of the files it read that its brief did not name were named in its briefing or the record; no agent opened `INDEX.md`; before its first edit a rung worker has written 32% to 67% of its total.
- `coordinator/process-engineering/worker-decisions-archaeology.md:57,327`: the skill was created the day after batch 10's splice; `INDEX.md` was named by 1 of the 21 agents.
- `reviews/process-review-6b-7-7R.md:9,11,14,144`: a briefing costs more than planned; having the record in hand is not using it; rungs re-ran tables the record held.
- `coordinator/process-engineering/checking-roles-cost.md:241`: the causes of batch 10's three refusals.

What those leave open, and this note measures: what the four workers read before acting, class by class, in order; what of it the record held, call by call and fact by fact; what they weighed; what they wrote back; what they took from the briefing.

## The answers

1. **Before the first fix edit the four workers had written 282K, 356K, 334K and 390K tokens** (W, N, G, C; 60%, 68%, 72%, 59% of their whole runs), in 75, 151, 108 and 135 calls (14, 22, 24 and 18 minutes). The results they read in that time are 732K tokens. The briefing is 180K of them (25%). Primary text (code, library, specification, tests) is 348K (48%). The record they searched themselves is 31K (4%), gate tables 37K (5%), knowledge reads (reports, scripts, git, a few harness and tool sources) 90K (12%), their own runs and edits 42K (6%), checks 4K (1%). No worker loaded a skill: none was in the batch (section 1).
2. **Rediscovery is common in count and small in weight.** Of 43 facts the workers established for themselves before the fix edit, the record held 15 whole (35%), 15 in part (35%) and 13 not at all (30%). Twelve of the 15 held facts were learned again from the tree or git, seven of them although the entry was in the worker's own briefing; the other three were read from the record. By weight, the calls that went to knowledge the record held whole are 8K tokens (1.1% of the results read; 0.3% of the workers' cost); held in part 58K; not on record 24K. All three together are 0.93M ITE, 4.0% of what the four workers cost (section 2).
3. **Between the briefing and the fix edit no worker queried POSITIONS or ran `facts-extract.sh` again.** Ledger greps: N 9, G 4, C 1, W 0. INDEX: once (G 37, no useful line). FACTS: twice (N 109, C 82). The record reaches a worker through its briefing and, for the ledger, through grep (section 2).
4. **Weighing.** The transcripts hold no thinking. Options show in the greps for precedent, in trial edits and in the decision lists of the workers' final results. Three of four rejected an alternative by a failed trial (G 77 to 79, N's "shorthand clause tried first", W's override reading after a suite refusal). C left the brief's "first place to look" after reading both sites. No worker consulted POSITIONS for the point it was deciding (section 3).
5. **Writing back.** Each wrote one FACTS entry (C also 2 amendments, G 1, N one that replaces an entry), 3 to 12 ledger notes and 5 or 6 new rows. The batch's rows 610 to 639 are 21 distinct rows from the workers and 9 opened by the gather from the skeptics' recommendations. One repeat across workers: N's and G's row 610, the same defect, merged by the gather as row 627. Never in FACTS, the ledger or the skill: how to see a checker crash's Java stack (C 36 to 40), how to run the distance driver on one component (G 36 to 40, 87), the dual-map classes of walk's inference (W 51 to 58), three line-mapping scripts for the distance table (N 213, G 142, skeptic G 14) and the rejected alternatives of 40 decisions (section 4).
6. **The briefing** handed 177 keys, 380 KB. Its keys were named in the workers' own calls before the fix edit for 31% of the bytes and anywhere (report included) for 69%. POSITIONS entries: 0 of 53 named before the fix edit, 16 of 53 by the end. FACTS entries: 0 of 34 and 8 of 34. The lines it printed were not read again: 0.1% to 2.3% of the lines a worker read by range. It costs 2.2M ITE, 9.4% of the four workers' cost (section 5).
7. **The proposal** (section 6). A librarian pass after a batch: about 111K to 170K tokens read, about 7K written to FACTS, the skills and INDEX, 20K of its own output, 0.7M to 0.9M ITE (1.4% to 1.8% of a batch). The rediscovery it can remove is about 0.4M ITE a batch. On rediscovery alone it does not pay in one batch. It pays if it also turns refusal causes into skill rules: the three refusal chains of batch 10 cost 8.4M ITE, 17% of the batch. A one-time pass over the backlog: about 380K tokens read, 28K written, about 2.3M ITE, repaid in four to six batches of the rediscovery saving or by one prevented refusal.

## 1. Before the first edit: what the four workers read

### The windows

| worker | calls | minutes | first edit | first fix edit | writes to the fix edit / whole run |
|---|---|---|---|---|---|
| W | 190 | 46 | call 60, +10.4 min: `git mv` of three tests | call 76, +13.9 min: Edit of `OverloadedFunction.java` | 282K / 471K |
| N | 254 | 91 | call 21, +1.5 min: `git mv` of two tests | call 152, +22.2 min: `sed -i` on `FortressBuiltin.fsi` | 356K / 526K |
| G | 182 | 70 | call 77, +12.8 min: a trial `sed -i` on `FortressLibrary.fss`, undone by call 78 | call 109, +23.8 min: Python edit of the same file | 334K / 464K |
| C | 320 | 112 | call 120, +14.9 min: `git mv` of four tests | call 136, +17.6 min: Edit of `AbstractMethodChecker.scala` | 390K / 665K |

### Window B, class by class

Each cell is calls, KB of results, share of the window's writes. A call that names two classes is split between them. A call whose main verb is `git log -S`, `git blame` or `git show <hash>` counts as git history. The harness start of C is large because C began cold: its first call wrote the system prompt (36K), the others read it from a cache.

| class | W: calls / KB / % | N: calls / KB / % | G: calls / KB / % | C: calls / KB / % |
|---|---|---|---|---|
| the brief (first message) | 1 / 87 / 13.1% | 1 / 80 / 9.5% | 1 / 73 / 9.3% | 1 / 85 / 9.3% |
| harness start (system prompt, tools) | 1.5% | 1.4% | 1.6% | 10.5% |
| the briefing (`facts-extract.sh` output) | 7 / 127 / 18.8% | 7 / 102 / 11.9% | 4 / 67 / 8.4% | 7 / 136 / 14.5% |
| skill (`fortress-repo`) | 0 | 0 | 0 | 0 |
| FACTS, POSITIONS, INDEX, ledger, read directly | 0 | 9 / 46 / 5.5% | 5 / 18 / 2.4% | 2 / 4 / 0.5% |
| reports and notes under `explorations/` | 4 / 15 / 2.4% | 2 / 13 / 1.5% | 2 / 20 / 2.6% | 2 / 7 / 0.8% |
| scripts and gate tables under `explorations/` | 2 / 2 / 0.3% | 16 / 58 / 7.2% | 15 / 85 / 10.9% | 8 / 27 / 3.1% |
| original tree: code | 36 / 214 / 32.6% | 16 / 29 / 3.8% | 13 / 33 / 4.4% | 59 / 191 / 21.8% |
| original tree: library | 0 | 48 / 101 / 13.1% | 28 / 102 / 13.5% | 6 / 15 / 1.7% |
| original tree: specification | 2 / 3 / 0.6% | 14 / 27 / 3.5% | 5 / 7 / 1.0% | 14 / 47 / 5.3% |
| original tree: tests | 5 / 16 / 2.5% | 11 / 16 / 2.1% | 7 / 12 / 1.7% | 13 / 24 / 2.9% |
| git history | 2 / 1 / 0.2% | 7 / 13 / 1.7% | 4 / 5 / 0.8% | 2 / 2 / 0.3% |
| runs of programs, tests, builds | 1 / 2 / 0.4% | 10 / 7 / 1.1% | 15 / 17 / 2.6% | 12 / 28 / 3.2% |
| own edits, commits, setup | 16 / 6 / 1.5% | 11 / 6 / 1.0% | 9 / 2 / 0.5% | 11 / 6 / 0.9% |
| own output and reminders (remainder) | 26.1% | 36.4% | 40.3% | 25.2% |
| writes in the window | 282K (75 calls) | 356K (151 calls) | 334K (108 calls) | 390K (135 calls) |

A script (`classify.py`) gave each call its class from its command and paths. I read the class of every call of the four lists and changed 13 (G 66, 85, 87 to setup; G 88 to 91 to runs; G 103 an edit; C 130 a run; four setup git calls: W 2 and 6, N 3, C 1).

### Window A, the strict first edit

| class | W: calls / KB / % | N: calls / KB / % | G: calls / KB / % | C: calls / KB / % |
|---|---|---|---|---|
| the brief (first message) | 1 / 87 / 14.7% | 1 / 80 / 29.9% | 1 / 73 / 11.6% | 1 / 85 / 10.1% |
| harness start (system prompt, tools) | 1.7% | 4.6% | 2.0% | 11.4% |
| the briefing (`facts-extract.sh` output) | 7 / 127 / 21.0% | 7 / 102 / 37.6% | 4 / 67 / 10.4% | 7 / 136 / 15.8% |
| skill (`fortress-repo`) | 0 | 0 | 0 | 0 |
| FACTS, POSITIONS, INDEX, ledger, read directly | 0 | 0 | 5 / 18 / 3.0% | 2 / 4 / 0.6% |
| reports and notes under `explorations/` | 4 / 15 / 2.7% | 0 | 2 / 20 / 3.2% | 2 / 7 / 0.8% |
| scripts and gate tables under `explorations/` | 2 / 1 / 0.3% | 7 / 34 / 12.9% | 13 / 82 / 13.1% | 8 / 27 / 3.3% |
| original tree: code | 32 / 206 / 34.9% | 0 | 6 / 17 / 2.8% | 56 / 188 / 23.2% |
| original tree: library | 0 | 1 / 3 / 1.1% | 28 / 102 / 16.8% | 6 / 15 / 1.9% |
| original tree: specification | 0 | 0 | 5 / 7 / 1.2% | 10 / 37 / 4.6% |
| original tree: tests | 4 / 16 / 2.7% | 2 / 7 / 2.6% | 1 / 3 / 0.5% | 11 / 20 / 2.6% |
| git history | 2 / 1 / 0.2% | 1 / 8 / 3.0% | 4 / 5 / 1.0% | 2 / 2 / 0.3% |
| runs of programs, tests, builds | 0 | 0 | 6 / 6 / 1.1% | 10 / 15 / 2.1% |
| own edits, commits, setup | 8 / 2 / 0.7% | 2 / 1 / 0.4% | 2 / 0 / 0.1% | 6 / 1 / 0.2% |
| own output and reminders (remainder) | 21.0% | 8.0% | 33.1% | 23.0% |
| writes in the window | 252K (59 calls) | 113K (20 calls) | 268K (76 calls) | 358K (119 calls) |

N's window A is short because its first edit is the promotion of two tests, call 21. G's ends at its trial edit.

### What the calls were for

Every call of window B has one label: the briefing; primary text (the source, library, specification or test it would edit, model or cite, which no record can replace); the record the worker searched itself; gate tables and per-site lists (record data); a check that a landed table still fits the base; knowledge, in three grades (held whole, in part, not on record; section 2); its own runs, edits and setup. I graded the 55 knowledge calls by hand. The others took the label of their class.

| what the call was for | W calls / KB / tokens (share) | N | G | C | all four |
|---|---|---|---|---|---|
| briefing handed to it | 7 / 127 / 53.0K (32%) | 7 / 102 / 42.5K (23%) | 4 / 67 / 27.9K (17%) | 7 / 136 / 56.6K (26%) | 25 / 433 / 180.1K (25%) |
| primary text: code, library, specification, tests | 42 / 228 / 98.0K (59%) | 84 / 161 / 75.1K (40%) | 54 / 153 / 68.5K (42%) | 81 / 239 / 106.8K (50%) | 261 / 780 / 348.4K (48%) |
| record it searched itself (ledger, FACTS, INDEX) | 0 | 9 / 46 / 19.7K (10%) | 5 / 18 / 8.0K (5%) | 2 / 6 / 2.9K (1%) | 16 / 70 / 30.5K (4%) |
| gate tables and per-site lists (record data) | 0 | 7 / 32 / 13.9K (7%) | 4 / 48 / 20.2K (12%) | 2 / 7 / 3.1K (1%) | 13 / 87 / 37.2K (5%) |
| checks that a landed table fits the base | 2 / 1 / 0.6K (0%) | 2 / 4 / 1.9K (1%) | 2 / 2 / 1.0K (1%) | 2 / 2 / 1.0K (0%) | 8 / 9 / 4.4K (1%) |
| knowledge the record held whole | 2 / 10 / 4.3K (3%) | 2 / 4 / 1.9K (1%) | 0 | 1 / 4 / 1.9K (1%) | 5 / 18 / 8.1K (1%) |
| knowledge the record held in part | 3 / 11 / 4.9K (3%) | 11 / 45 / 19.6K (10%) | 5 / 33 / 14.1K (9%) | 10 / 45 / 19.6K (9%) | 29 / 134 / 58.2K (8%) |
| knowledge not on record | 1 / 1 / 0.7K (0%) | 6 / 10 / 4.8K (3%) | 8 / 27 / 12.0K (7%) | 6 / 13 / 6.0K (3%) | 21 / 52 / 23.5K (3%) |
| own runs, edits, setup | 18 / 9 / 5.6K (3%) | 23 / 14 / 8.2K (4%) | 26 / 20 / 11.2K (7%) | 24 / 34 / 16.6K (8%) | 91 / 77 / 41.6K (6%) |
| result tokens, all calls | 167K | 188K | 163K | 214K | 732K |

### The order of reading

- **W**: worktree and push (1 to 6); the briefing into five files, read with the Read tool (7 to 13, 127 KB); the three tests it would promote (14); the header of `harness-one.sh` (15); walk's overload code, the checker's `OverloadingChecker.scala` and `STypesUtil.scala`, then `Driver.java` and `BuildEnvironments.java` (16 to 34, 147 KB), with four reads of earlier rungs' reports among them (26, 35, 40, 41); walk's inference code and `FileTests.java` with `build.xml` (37 to 42); test names (48, 49); the dual-map classes and `MakeInferenceSpecific` (50 to 58); first edit 60; two new tests and the first harness run on the base (61 to 69); more code (72 to 75); first fix edit 76.
- **N**: setup (1 to 3); the briefing into five files (4 to 10, 102 KB); the gate's distance tables and per-site rows for its library regions (11 to 15, 28 KB); `git show de22fd928` and the two tests it would promote (16 to 19); `harness-one.sh` and the checker-count script (20); first edit 21; then, for 130 calls, the library, with the specification (44, 45, 56, 57, 76 to 79, 97, 102 to 103, 117, 118), the distance scripts (51, 52), four ledger greps (58 to 61), the history of `List`'s clause (66 to 68), `ExportChecker.scala` (69 to 75), probes, and `FileTests.java` (139 to 143); two tests written (144 to 151); first fix edit 152.
- **G**: setup (1, 2); the briefing in three parts (3 to 6, 67 KB); the gate's tables, `classify.py`, three stage scripts and per-site rows (7 to 15, 73 KB); the generator code of the library and its desugaring (16 to 27); the ledger on "capture" (28 to 30); the history of `ActualReduction[\R,AnyMaybe\]` (32, 33); the distance script, one INDEX query, two earlier reports and `DistanceMulti.java` (35 to 40); the library (41 to 64); probes (65 to 69, 74 to 76); a trial edit (77) undone (78); first kept edit 109 after the test (103).
- **C**: setup (1 to 3); the briefing into five files (4 to 10, 136 KB); four `.test` files (11); `junit.sh` and `env.sh` (12, 13); the checker's Scala code (15 to 20); the gate's tables and the distance scripts (21 to 26); probes of the four crash rows and the specification on omitted parameter types (27 to 35); a Java stack trace of one crash (36 to 40); the checker code in turn (41 to 58, 65 to 78, 86 to 107); `.test` formats and `FileTests.java` (59 to 61); the ledger on "varargs" (62); `Shell.java` (83); first edit 120 (four promotions); first fix edit 136.

### The first skeptics, briefly

Window: the calls before each skeptic's first probe (N 32 calls, G 16, W 27, C 22). Each cell is tokens of results and the share of the window's writes. The briefing slice is the `checks` part of the rung's briefing, printed again by `facts-extract.sh`.

| skeptic | writes | brief | briefing slice | the worker's transcript | the worker's diff | everything else |
|---|---|---|---|---|---|---|
| N | 189K | 51K | 13.0K (6.9%) | 19.6K (10.3%) | 13.5K (7.2%) | 18.4K (9.7%) |
| G | 120K | 51K | 10.8K (9.0%) | 7.0K (5.8%) | 7.3K (6.1%) | 24.7K (20.5%) |
| W | 154K | 48K | 26.9K (17.3%) | 20.2K (13.0%) | 11.6K (7.5%) | 23.2K (15.0%) |
| C | 161K | 54K | 22.3K (13.8%) | 26.0K (16.1%) | 15.3K (9.5%) | 17.0K (10.5%) |

A skeptic reads what the worker had read (the briefing slice, 7% to 17%) and what the worker did, three ways: in its brief, in the diff, and in the transcript through a script (N 8 to 13, 16, 17; W 18 to 23; C 7 to 10, 12, 99; G 6 to 8, 10). The brief itself is 48K to 54K tokens. The skeptics searched the record more than the workers did: POSITIONS in 2 to 8 calls and the ledger in 4 to 9, the briefing command included. N's skeptic read the checker-count script again (calls 14 and 15). Not sampled further.

## 2. Rediscovery: what the record already held

### By the weight of the calls

The table in section 1 grades 55 knowledge calls. Held whole: 5 calls, 18 KB, 8.1K tokens. Held in part: 29 calls, 134 KB, 58.2K tokens. Not on record: 21 calls, 52 KB, 23.5K tokens. Among the knowledge reads the record held 9% whole, 65% in part, 26% not at all. Against all the non-briefing results of window B (552K tokens): 1.5%, 10.5%, 4.3%. At whole-run weight (the re-reads of what stays in context): held whole 0.07M ITE (0.3% of the four workers' 23.5M), in part 0.62M (2.6%), not on record 0.24M (1.0%).

"Held in part" is generous. It is the stage tooling (the scripts and classes of the distance and checker-count stages, which FACTS describes by what they measure at `FACTS.md:105`, `:71`, `:56` but not by how they work), the XXX and `.test` formats (`FACTS.md:97`, `:98`, `:104`), and checker or walk code whose purpose, not whose shape, is in a FACTS entry.

For comparison, `reviews/worker-context-cost.md:11` found 9% of eight agents' gathering cost held by the record. That study counted what the record held out of all gathering. This one grades only the knowledge calls and sets primary text apart, so the two shares are not the same quantity.

### The sample of facts

All 43 facts are the topics the workers established in window B by reading outside the briefing, outside the specification and outside the code and library lines they would edit. The lookups: `grep` over the base `FACTS.md`, `POSITIONS.md`, `INDEX.md`, the ledger and the maps (`L.sh` in scratch), then the tool for the citeable output. Verdicts: **held** (the record states what the worker went to learn), **part**, **no**. "In brief" marks an entry that was in the worker's own briefing.

**W** (calls 14 to 75): held 6, part 3, no 2.

| calls | fact established | record at the base | verdict |
|---|---|---|---|
| 23 to 27 | the load check runs from `Driver.evalComponent` through `BuildEnvironments.checkComprisesClauses`, once every component's types exist | `FACTS.md:29` (in brief) | held |
| 42 | the testSystem shards split the sorted file list by index | `FACTS.md:99` (in brief) | held |
| 35, 36, 38 | row 591's several-bounds case and its test programs | ledger 591 (in brief) names `witness`, `pick2(Apple, Cherry)` and `XXXInferSeveralBoundsWalk.fss` | held |
| 19, 20, 32 | the compiled checker skips symbolic operators (`isDeclaredName`, `validOp`) | ledger 584 (in brief) | held |
| 17, 18, 31 | walk's overlap code: `validOnDeclaredDomains`, `overlapCovered` | `FACTS.md:27` (in brief) | held |
| 37, 53 | walk's instance of a parameter nothing fixes: `EvaluatorBase.instanceOf` | `FACTS.md:137` (in brief) | held |
| 21, 22 | which declarations the checker takes a type to provide (`STypesUtil.inheritedMethods`) | `FACTS.md:86` says "every type that provides both", not how | part |
| 40, 41 | how the previous rung ran the suite (`corpus.sh`, 768 MB, `-Xss32m`, private caches) | `FACTS.md:94`, `:99`, `:101` hold the thread pin, the shards, the heap; not the command | part |
| 54 | `MakeInferenceSpecific` clamps a contravariant parameter | `FACTS.md:28` names the class for another use | part |
| 15 | how to run named test files through the harness (`harness-one.sh`) | none: 0 lines of FACTS and INDEX, 13 ledger rows use it as a reproduction | no |
| 51, 52, 58 | the dual-map classes `LatticeIntervalMap`, `LatticeIntervalMapDual` | none | no |

**N** (calls 11 to 143): held 4, part 3, no 6.

| calls | fact established | record at the base | verdict |
|---|---|---|---|
| 11, 12 | the landed distance table fits the base | `CLIMB-BATCH-10.md:296,302` | held |
| 56 to 61 | integer `^` is declared `RR64`, natives answer the integer | ledger 438, 441, 445 (not in brief; read after the tree) | held |
| 40 to 43, 61 | `NN64.signed` is declared `NN64`, the glue returns `ZZ64` | ledger 345, 439 (not in brief; read after the tree) | held |
| 139, 140 | an interpreter test fails on `fail` in the output or a nonzero code; an XXX file inverts it | `map/README.md:121`, `FACTS.md:96` (the brief's map key printed the library row only) | held |
| 17 | what `de22fd928` changed (the written `Object` bounds) | `FACTS.md:76` (in brief) names the declarations; the old spelling is in git | part |
| 91 to 93 | the checker lets a method's own static parameter be captured at a method call | ledger 561, 563 cover the overloading and abstract-method cases | part |
| 51, 52, 110 to 114 | how the distance stage maps and classes sites | `FACTS.md:105`, `:56` (in brief) | part |
| 20 | how to run `harness-one.sh` and the checker count | none as a how-to | no |
| 44, 45 | `QQ.ceiling` and `truncate` are declared `ZZ` and return the rational | none (became row 612) | no |
| 66 to 68 | the history of `List`'s `excludes { Number, HasRank, String }` | none: 0 hits for `SomeList` | no |
| 69 to 75 | the export check demands an api declaration for a private abstract method | none (became row 614) | no |
| 99 to 108 | the tuple comparisons' unbounded parameter | none (became row 611) | no |
| 116 to 124 | the `ForbiddenException` chains of `__thrower` and `shouldRaise` | none (became row 615) | no |

**G** (calls 7 to 93): held 2, part 3, no 4.

| calls | fact established | record at the base | verdict |
|---|---|---|---|
| 7, 8 | the landed distance table fits the base | `CLIMB-BATCH-10.md:296,302` | held |
| 28 | the capture in the overloading and abstract-method checkers | ledger 561 (read by grep; 563 in brief) | held, read from the record |
| 10, 11, 13, 35 | classes and commands of the stage scripts | `FACTS.md:105`, `:56` (in brief) | part |
| 32, 33 | why the reductions use `Any` and `AnyMaybe` | ledger 473 states the symptom; git history gave only the 2012 root commit | part |
| 67 to 69 | the capture at `g.map[\(E,G)\]` | ledger 561, 563, a related site | part |
| 36 to 40, 82 | how to run the checker over one component | none: INDEX query at call 37 found nothing | no |
| 47 to 49 | the identities' `else => 0` fallback | none (became row 613) | no |
| 74 to 79 | typing `simpleJoin` at `R` stops `BIG MIN` under walk | none (became row 611) | no |
| 18 to 23 | the names `__loop`, `__whileCond` and their desugaring | none | no |

**C** (calls 3 to 135): held 3, part 6, no 1.

| calls | fact established | record at the base | verdict |
|---|---|---|---|
| 3, 22 | the landed distance table fits the base | `CLIMB-BATCH-10.md:296,302` | held |
| 83 | `Shell.useCompilerLibraries` and `useInterpreterLibraries` set the world | `map/compile-path-walkthrough.md:353-356`, `:889` | held |
| 97 | the per-provider meet and `withoutSelf` | `FACTS.md:86`, ledger 574 (both in brief) | held |
| 25, 26 | the distance and checker-count scripts | `FACTS.md:105`, `:56` (in brief) | part |
| 11 to 14, 59 to 61, 84, 85 | the `.test` file formats; `junit.sh`; `env.sh` | `FACTS.md:97`, `:98`, `:104` (in brief); the brief names `Boolean.test`; no entry on `junit.sh` | part |
| 86 to 92 | where `Formula.solveToBounds` drops a bound | `FACTS.md:84` (in brief) gives the function; the cause at `Formula.scala:537-538` is new; the brief named another place | part |
| 15 to 20 | batch 8's renaming of a captured parameter | ledger 561 says rung O repaired it; the helper `ownStaticParamsApart` is in no entry | part |
| 66 to 78 | how the checker and `TypeAnalyzer` treat varargs | `FACTS.md:89` and ledger 604 name the defect | part |
| 99 to 103 | the closed-trait check for object expressions | ledger 597 and the FACTS entry on 2012 comprises clauses (both in brief) | part |
| 36 to 40 | `-debug stacktrace` prints a checker crash's Java stack | none: 0 hits in FACTS, ledger, skill | no |

Total: held 15, part 15, no 13. Of the 15 held, 7 were in the worker's own briefing and were learned again from the tree (W 6; C 97). Five lay outside the briefing and were learned from the tree (the base-table check by N, G and C; N 139 and 140; C 83). Three were read from the record: G 28 at once, N 56 to 61 and N 40 to 61 only after N had read the tree. The base-table check is one question asked by three workers and counted once for each; W asked it too (calls 3 and 4) but it is not in W's sample.

### The five clearest cases

1. **W 42, shards (4,011 bytes).** `sed -n 895,940p FileTests.java; sed -n 1165,1215p ../build.xml`, at 07:25:14. The entry held it, in W's briefing, which W had read at call 13 (briefing part 5):

        $ git show 9c9e823d5:explorations/coordinator/FACTS.md | sed -n 99p | cut -c1-330
        - **`testSystem`'s four shards are one suite split by sorted index, so per-shard counts are not comparable ... only their sum is** (...). `FileTests.java:907-923` sorts the files of `tests/` and keeps index `j` when `j % 4 == i` (root `build.xml:1

2. **C 83, the two worlds (4,410 bytes).** `sed -n 365,470p Shell.java` at 05:36:37. The map held it; C's briefing carried one map row, `@scala_src/typechecker/`:

        $ git show 9c9e823d5:explorations/coordinator/map/compile-path-walkthrough.md | sed -n 353,356p
        - `useCompilerLibraries()` sets the `extends Object` pre-desugaring **on** and
          assignment desugaring on (`Shell.java:371-377`).
        - `useInterpreterLibraries()` sets the `extends Object` pre-desugaring off and
          the compiled-expression desugaring **off** (`Shell.java:379-386`).

3. **N 139 to 143, what makes a test fail (five calls, 11.1 KB).** `FileTests.java` 370 to 425, 245 to 300, 840 to 875, 130 to 160, then a grep for `FAIL|PASS`, to learn how the interpreter harness judges a test before writing `ShouldRaiseNoExceptionWalk.fss`. The map row and a FACTS entry held it. N's map key printed the library row, not this one:

        $ git show 9c9e823d5:explorations/coordinator/map/README.md | sed -n 121p | cut -c1-175
        | `interpreter/` (evaluator, values, types, its own tasks and transactions) | interpreter | `testSystem` 408 (pass = no exception and no `fail` in output) | a wrong ...

   `FACTS.md:96` adds the XXX inversion at `FileTests.java:394`, `:410-412`.

4. **W 3 and 4, N 11 and 12, G 7 and 8, C 3 and 22: one question, four workers.** Each ran `git log --oneline cec70988b..9c9e823d5 -- Library/ ProjectFortress/src/ ...` or a `git diff --stat` to learn that no code changed between batch 9's landed gate tables and the base. About 9 KB in all. The batch record said it, outside the tail the workers were given:

        $ git show 9c9e823d5:explorations/coordinator/CLIMB-BATCH-10.md | sed -n 296p | cut -c1-120
        **What lands first.** All landed at this record's base: climb batch 9 (`cec70988b`); its comb...

5. **W 35, row 591 again (5,830 bytes).** `grep -n "loneS\|loneT\|Apple\|Cherry\|Pear" SKEPTIC.md` in `rung-walk-instance`, then the test programs (36, 38). Ledger row 591 was in W's briefing (part 2) and names the same program, test and output:

        $ git show 9c9e823d5:explorations/fortress-gap-ledger.md | grep -o '^| 591 .\{0,330\}' | cut -c1-330
        | 591 | **under walk, a type parameter declared with several bounds that walk cannot meet ... is instantiated at `BottomType` ...**: `witness[\T extends { Red, Round }\]()` ... `pick2[\T extends { Red, Round }\](Apple, Cherry)` ...

A fact the record did not hold, in the same set, is what makes the pattern: W 15, N 20 and G 82 each opened `harness-one.sh` to learn how to run named test files. The record has the script in 13 ledger rows as a reproduction command and nowhere as a how-to:

        $ for f in coordinator/FACTS.md coordinator/INDEX.md fortress-gap-ledger.md; do echo "$f: $(grep -c harness-one $B/$f)"; done
        coordinator/FACTS.md: 0
        coordinator/INDEX.md: 0
        fortress-gap-ledger.md: 13

The previous rung's own shard script was not kept either: W 41 ran `ls /home/user/fortress-walkinst/tmp/rung-walk-instance/corpus.sh` and got "No such file or directory", and wrote its own at call 112.

### Consulting the record after the briefing

Calls of the four workers after the briefing and before the fix edit that name each part of the record. (The archaeology note counted the paths named by all 21 agents, `worker-decisions-archaeology.md:327`.)

| worker | POSITIONS | `facts-extract.sh` | FACTS | INDEX | ledger |
|---|---|---|---|---|---|
| W | 0 | 0 | 0 | 0 | 0 (one later: call 140, a grep for `disp0` or `override`) |
| N | 0 | 0 | 1 (109) | 0 | 9 (58, 59, 60, 61, 84, 85, 93, 109, 138) |
| G | 0 | 0 | 0 | 1 (37) | 4 (28, 29, 30, 49) |
| C | 0 | 0 | 1 (82) | 0 | 1 (62) |

The 14 ledger lookups before the fix edit (N 9, G 4, C 1) were greps of a row's number or a word. The tool of the base had no `ledger-find:`; it came later.

For W the point matters most. Its first suite run refused the team's `tests/disp0.fss`. W read the traits chapter (calls 137, 138) and grepped the ledger for `disp0` or `override` (call 140). The lines it printed are rows 356, 398, 417, 421 and 479, none about it. The base tool agrees:

        $ facts-extract.sh --root <base copy> 'ledger-find:disp0'
          ledger-find:disp0        NOT FOUND: no row of explorations/fortress-gap-ledger.md holds every word

The rule that settled it (an `override` declaration removes the overridden one from what a type provides, `Specification/basic/traits.tex:518-527`) is specification text that W's briefing did not print: it printed `advanced/overloading.tex`, `basic/inference.tex` and `basic/expressions/reductions.tex`. The record had no entry on it. W made the search and the record had nothing; the finding became row 610.

## 3. Weighing before the edit

What can be seen. The stored thinking is empty. The stored text is "Now the briefing." and similar. The brief orders it: "Precedent search before writing code. Ask 'has the team solved this here already, and in how many ways', and answer it by citation" (brief, shared prefix, all four) and, in W's tail, "list every way before you choose". So the evidence is the order of calls, the trial edits, and the lists the workers wrote in their final results (`decisions`, `precedentSearch`), which were written at the end.

**W.** It read the places a check could live before it chose one: Driver's scan and finish order (24, 27), `FTraitOrObjectOrGeneric.finishFunctionalMethods` (28 to 30), `putFunctionalMethodInstance` (33, 34). Decision W1 names what it set aside:

> "run the per-provider check from BuildEnvironments.checkComprisesClauses ... Rejected: per overload set, which knows no providing type; and FTraitOrObjectOrGeneric.finishFunctionalMethods, which needs a Driver.java hook outside evaluator/, a stop."

The reading that mattered most was not weighed before the edit. W followed the compiled checker's reading of "provides" (every supertype's methods). The first suite run refused `disp0` at call 135 (07:46:39); calls 137 and 138 read the chapter; at call 144 it rewrote the check ("Now rewrite the per-provider check with the traits chapter's inheritance rule", text at 07:48:03). Decision W2: "Rejected: the checker's every-declaration-of-every-supertype reading, which refused the team's disp0 in the first suite run."

**N.** Its decision on `assert` and `deny`:

> "rejected: narrowing the parameters to Object (changes what assert accepts), asString through concatenation alone (changes an object's message), the compiler library's nine-declaration debugString family. The shorthand clause was tried first and the development run showed the checker does not narrow it."

Its `ForbiddenException` decision:

> "TestFailure in shouldRaise, CallerViolation in __thrower; rejected: a bare throw TestFailure (wrapped once by forbid), fail(...) (prints FAIL, caught by shouldRaise[\FailCalled\]), one chain for both."

Its chosen form had the same flaw as the first it rejected; the skeptic found it and the judge refused (`checking-roles-cost.md:243`). N's ledger grep at call 60 had `ForbiddenException` among its words and found no row (the base ledger has none).

**G.** It tested an alternative with an edit. Call 77 types `simpleJoin(a:R, b:R): R` in the library; call 79 adds a second change; the runs print `Unification error: Closure/Constructor for simpleJoin param 1 (a:BOTTOM) got arg 1: ZZ32`; call 78 undoes the first. The decision records the result:

> "typing them at R, measured to stop BIG MIN <|[\ZZ32\] 4, 2, 7 |> and to refuse the unwritten BIG MIN[i <- 0#4] (3 - i) under walk"

And on the capture sites:

> "left with row 610; rejected: renaming the library's G to F as SequentialGenerator.cross[\F\] spells it (Library/FortressLibrary.fsi:895), which clears both and hides a checker defect."

**C.** The brief for row 593 says: "the coercion attempt's candidates ... are the first place to look". C read `Functionals.scala` (86, 87) and then `Formula.scala` (88 to 92) and chose the second:

> "Row 593 is repaired in Formula.slv, not in checkApplicableWithCoercion's candidates (the brief's first place): the candidates already offer ZZ32 and the solver rejects it because a bound-only variable's bound mentioning another variable was dropped (Formula.scala:537-538)."

And on the varargs type under the compiled library (its first alternative was found by the first build, after the edit):

> "Rejected: the first build's crash ('Not in the trait table: CompilerLibrary.ImmutableArray'); keeping the element type there (silent over-acceptance); declaring ImmutableArray in the compiled prelude (POSITIONS, 'The library route.')."

Did any consult the record for a decision on the point? Not between the briefing and the fix edit (the table in section 2). Afterwards POSITIONS was opened by N (call 205) and G (168) for a line number, and by C (211 to 213) for the decision on the type group's late positions, while it wrote a specification callout (216 to 219). The decisions that cite the record cite entries the briefing had printed: C "(POSITIONS, 'The library route.')" and "batch 8's rule refuses it"; N "as Pavol's answer says"; W's stop lifted by "POSITIONS.md:100, Reversible stops do not hold a batch." Whether a decision was prevented by an entry cannot be read from the transcripts.

## 4. Writing back

What each added (their `record.md` text, in the final structured result of each worker; the gather's folding is `climb-batch-10/RECORD.md`).

| worker | FACTS | ledger notes on existing rows | new rows | REPORT.md |
|---|---|---|---|---|
| W | 1 entry (4 bullets, 1.4K chars) | 6: rows 544, 534, 588, 425, 591, 584 | 5 (W-a to W-e) | 26.5K chars, 9 decisions |
| N | 1 entry that replaces `FACTS.md:76` | 12 | 6 (610 to 615) | 31.6K chars, 10 decisions |
| G | 1 entry and 1 appended to "The true distance" | 3: rows 488, 424, 577 | 6 (610 to 615) | 35.7K chars, 9 decisions |
| C | 1 entry and 2 amendments (`FACTS.md:84`, `:56`) | 7: rows 563, 561, 593, 604, 605, 574, 597 | 5 (610 to 614) | 36.3K chars, 12 decisions |

The REPORT.md columns are the text as first written, in each worker's final result. Final rows: 610 to 614 W and 615 to 619 opened by the gather from W's skeptic; 620 to 626 C; 627 to 633 G; 634 to 639 N (`RECORD.md:21-27`). The workers' own provisional rows are 22 (5, 6, 6, 5), two of them one defect; the gather opened 9 (W 5, C 2, G 1, N 1).

**Lines that repeat the record.**

- N's provisional row 610 and G's are one defect, the compiled checker's capture of a method's own static parameter at a method invocation. Both grepped the ledger for "captur" (N 93, G 29, 30) and found rows 561 and 563, which cover other sites. The gather merged them into row 627 (`RECORD.md:25`).
- Two rungs appended a note to one existing row from the same briefing: row 425 (W and N), row 577 (N and G), rows 604 and 605 (N and C). Row 577 is the line-shift misattribution of the distance stage; N, G and G's skeptic each wrote a script to map edited lines back to base lines (N 213 and 236, G 142, skeptic G 14). None is committed (`git ls-files` finds no `sitemap.py`, `sitediff.py` or `sitecmp.py`).
- W-b (symbolic operators are skipped; five library sites break the Meet Rule) repeats part of rows 584 and 585 for walk's side, and W also appended a note to row 584. W-d (the reach of D5) was already a PLAN question, `PLAN.md:522`, in W's briefing.
- The rest are new. I found no FACTS entry that repeats an existing one. N's says it replaces `FACTS.md:76`, and C's two amendments rewrite `:84` and `:56`.

**Findings that never reached FACTS, the ledger or the skill** (checked at HEAD `808f2837b`):

| finding | where it is | FACTS / ledger / skill |
|---|---|---|
| a checker crash's Java stack: `bin/fortress compile -debug stacktrace P.fss` (C 36 to 40) | C's transcript | 0 / 0 / 0 hits for "stacktrace" |
| running the distance driver on one component, `dev-check.sh` (G 36 to 40, 87) | G's scratch | `DistanceMulti` is in 2 FACTS lines as the stage's driver; nothing on one component |
| `LatticeIntervalMap` and its dual, the plumbing of walk's bounds (W 51 to 58) | W's transcript | 0 / 0 / 0 |
| the history of `List`'s `excludes { Number, HasRank, String }`, a 2008 commit (N 66 to 68) | N's `REPORT.md` | 0 / 0 / 0 for "SomeList" |
| the shard script (W 112) and the base-to-head line maps (N 213, G 142) | scratch, uncommitted | none |
| 40 decisions with their rejected alternatives (W 9, N 10, G 9, C 12) | each rung's `REPORT.md`, W's `decision-record.md` | FACTS holds the facts, by its rule; the decisions are in no entry; `INDEX.md` has no line for the four rung folders (3 lines name any of the 57 `compile-ladder/rung-*` folders) |

What did reach the record: all the rows the workers opened (21 distinct), their ledger notes, and the four FACTS entries. The facts they learned about the tree reached it; what they learned about how to work did not.

## 5. The briefing

**What it handed**, as the tool announced it:

| worker | keys | printed | announced | read as |
|---|---|---|---|---|
| W | 49 | 122,090 bytes in 5 parts | about 50,600 tokens | 5 files, Read tool, 127 KB |
| N | 44 | 96,746 in 5 | 40,200 | 5 files, 102 KB |
| G | 33 | 64,654 in 3 | 26,800 | 3 Bash calls, 67 KB |
| C | 51 | 129,037 in 5 | 53,500 | 5 files, 136 KB |

By kind, over the four: 53 POSITIONS entries, 32 ledger rows, 26 notes and specification sections, 27 code declarations, 34 FACTS entries, 4 map sections, 1 INDEX line.

**How much of it the worker used.** A key counts as named if the worker's own calls or final result carry its title, its row number, or the file or function it names. That is a lower bound: a decision followed without being named does not show.

| kind of key | keys | KB handed | named in the worker's own calls before the fix edit | named anywhere, report included |
|---|---|---|---|---|
| POSITIONS entries (`positions:`) | 53 | 56.9 | 0 keys, 0.0 KB | 16 keys, 15.4 KB |
| ledger rows (`ledger:`) | 32 | 82.7 | 11 keys, 18.5 KB | 28 keys, 70.0 KB |
| notes and specification sections (`doc:`) | 26 | 133.1 | 11 keys, 79.5 KB | 20 keys, 110.6 KB |
| declarations (`code:`) | 27 | 48.6 | 15 keys, 21.2 KB | 23 keys, 40.6 KB |
| FACTS entries, by title | 34 | 54.7 | 0 keys, 0.0 KB | 8 keys, 23.7 KB |
| map section (`map:`) | 4 | 1.9 | 1 keys, 0.5 KB | 3 keys, 1.6 KB |
| INDEX lines (`index:`) | 1 | 2.5 | 0 keys, 0.0 KB | 0 keys, 0.0 KB |
| all | 177 | 380.5 | 38 keys, 119.7 KB (31%) | 98 keys, 261.8 KB (69%) |

Per worker, bytes named before the fix edit and anywhere: W 37% and 75%, N 16% and 67%, G 11% and 55%, C 48% and 71%.

Three readings.

- The ledger rows, the specification sections and the code declarations were used: 28 of 32 rows, 20 of 26 sections, 23 of 27 declarations by the end.
- The decisions were used in the report, not before the edit: POSITIONS entries are named 0 times in 53 before the fix edit and 16 times in 53 by the end; FACTS entries 0 and 8 of 34. Whether the other 37 POSITIONS entries shaped the work cannot be read from the transcripts.
- The printed text was not read again. Of the lines the workers read by range before the fix edit (3,972 for W; 2,955 N; 3,499 G; 3,981 C), 90, 3, 25 and 84 lay inside the ranges the briefing had printed. W read `OverloadedFunction.java` 1 to 195 and 278 to 837 and 826 to 1125, around the 195 to 278 and 814 to 825 that the briefing printed (calls 17, 18, 31). The `code:` entries served as anchors.

**What it cost.** Read in the first calls and kept, the briefing is 53.0K, 42.5K, 27.9K and 56.6K tokens for W, N, G and C. A token that enters at the start costs 1.25 + 0.05 (T - k) ITE: 9.5, 12.5, 9.9 and 15.8 for the four runs of 174, 236, 179 and 300 turns. So the briefing costs 0.50M, 0.54M, 0.28M and 0.89M ITE, 2.21M for the four, 9.4% of what they cost. The brief itself is another 7% to 8%. `reviews/process-review-6b-7-7R.md:9` measured 54K tokens a rung briefing in batches 6b to 7R; the four here average 45K by my count and 42.8K as the tool announced it.

## 6. A librarian pass: what it would do, and what it would save

### The pool it works on

The knowledge reads of window B cost 0.93M ITE (section 2). Name them by who could remove them:

| group | calls (examples) | tokens read | ITE | already in the skill at HEAD |
|---|---|---|---|---|
| how the stages, the harness and the tools work: scripts and classes of the distance and checker-count stages, `harness-one.sh`, `junit.sh`, `env.sh`, the one-component check, the stack trace | W 15; N 20, 51, 52, 110, 113, 114; G 10, 11, 13, 35 to 40, 82; C 12, 13, 25, 26, 37 to 39 | 45.5K | 0.48M | about 5K tokens by my count: `harness-one`, `junit.sh`, `env.sh` (`tests-running.md`, `build-and-caches.md`); not the distance internals, the one-component check or the stack trace |
| harness and `Shell` rules that the maps hold | W 42; N 139, 140; C 83 | 8.1K | 0.07M | no; the maps hold them |
| the facts of the base: the landed table fits | 8 calls | 4.4K | 0.05M | no; `CLIMB-BATCH-10.md` holds it |
| the rest of "held in part" and "not on record": code and history understood once per rung | N 17, 48, 66 to 68; G 32, 33, 47, 48; C 98, 119 | the remainder | the remainder | not a librarian's |

The pool a librarian can reach, new work only: about 40K + 8K + 4K = 52K tokens, 0.55M ITE per batch of four rungs, 2.3% of the rungs' cost and 1.1% of the batch's 48.7M.

### After a batch

Reads, at 0.41 tokens a byte (batch 10's volumes):

| source | bytes | tokens |
|---|---|---|
| the four `REPORT.md` | 182.8K | 75.0K |
| the four `SKEPTIC.md` and three `JUDGE.md` | 132.9K | 54.5K |
| `decision-record.md` of W | 11.5K | 4.7K |
| the gather's `RECORD.md` | 22.8K | 9.4K |
| record slices to check for duplicates and stale lines: 12 FACTS entries, 5 `index:` queries, 10 `ledger-find:` queries | about 41K | 16.8K |
| the skill parts it would edit | about 25K | 10.1K |
| total | 416K | 170K |

A lean pass skips the rulings (the gather already folds the skeptic's findings into rows: `RECORD.md:21-27`) and reads 111K tokens.

Writes: FACTS, 3 merged entries and 3 retired lines, about 6 KB (2.5K tokens); the skills, 6 paragraphs, about 7 KB (3K); INDEX, 4 lines, 1.6 KB (0.7K); the ledger, at most 5 closing notes, 2 KB (0.8K). About 7K tokens, plus about 20K of its own output.

Retires: a FACTS line that a rung replaced (N's entry replaces `FACTS.md:76`; C rewrote `:84` and `:56`), a skill line made false by the batch, and a briefing key whose subject the batch settled.

Cost, with the model above: 50 turns, the reads arriving in the first half (a factor of about 3.2 ITE a token), its 41K start at 3.75: 0.36M to 0.54M for the reads, 0.15M for the start, 0.17M for its output and prefix. **0.7M to 0.9M ITE.** The gather of this batch cost 4.54M ITE (184 turns, 489K writes), the commit stage 0.66M.

Against the pool of 0.55M ITE it does not pay in one batch: it costs 0.2M to 0.3M ITE more than it removes. Its yield on the second thing it can do is larger: `checking-roles-cost.md:241` traced the three refusal chains of batch 10 (N 2.50M ITE, C 3.70M, G 2.19M: 8.4M, 17% of the batch) to causes a skill line could have prevented. One prevented chain saves two to five times the pass's cost. The pass breaks even if it prevents one refusal chain in about one batch in nine to fifteen.

### The backlog, once

| step | reads | writes |
|---|---|---|
| one INDEX line for each of the 57 `compile-ladder/rung-*` folders (3 are there): the first 3 KB of each `REPORT.md` | 70K tokens | 57 lines, 9K |
| the how-to's and rules that the reports hold: grep each of the 57 reports (2.42 MB, 990K tokens) for command lines and "how" sections, then read about 12 in full (about 509 KB) | 209K | 8 skill paragraphs, 4K |
| FACTS: read the 133 entries (249 KB) once, rewrite about 30 that the later batches overtook | 102K | 15K |
| total | about 380K tokens | about 28K, plus about 40K of its own output |

At the model's rates, about 2.3M ITE over four agents of 50 to 100 turns (the reads 1.3M, four starts 0.6M, output 0.4M). It is 5% of a batch. At 0.43M to 0.55M ITE a batch it repays in four to six batches; one prevented refusal repays it. A full read of the 194 notes in the rung folders (6.09 MB, about 2.5M tokens) would cost about 8M ITE and is not proposed.

### Ranked by the tokens it would save (ITE, per batch of four rung workers)

1. **A page in the skill for how the stages and the harness work** (distance and checker-count scripts and classes, the base-to-head line mapping, the one-component check, `-debug stacktrace`, the `.test` keys, `FileTests`' verdict rule): the group of 45.5K tokens, 0.48M ITE; about 0.43M new. It also ends the three line-mapping scripts. Cost: about 2K tokens in the skill.
2. **Map keys in the briefing for the harness and `Shell`** (`map:test-coverage.md`, `map:compile-path-walkthrough.md`): the cases W 42, N 139 and 140, C 83: 8.1K tokens, 0.07M ITE. Cost: about 1.5K tokens of briefing.
3. **The state of the base in the brief, in one line** (the landed tables fit): 8 calls, 4.4K tokens, 0.05M ITE.
4. **Fewer keys the batch does not touch.** The 31% of briefing bytes never named (118.7 KB, 48.7K tokens, 0.5M ITE) is the largest pool, and it is the curator's own: `reviews/worker-context-cost.md:14` reads the briefing's worth as the decisions it prevents, which this note cannot measure. Listed, not recommended.
5. **Facts held in the briefing and learned again** (W's six): nothing to save; each needed the code for the edit.

Everything above is under 1M ITE a batch. The larger lever the same pass serves is the rules from refusals (section "Questions").

## Limits

- The thinking is not stored, so weighing before an edit is read from calls, trial edits and the lists written at the end. A worker may have weighed more than it shows.
- The verdicts (held, part, no) are mine. I read each call's result for the 55 knowledge calls and looked each fact up; another reader may grade some "part" calls as "no" or "held". The weight of the "part" grade (65% of the knowledge reads) is the soft number.
- "Named" in section 5 is a lower bound of use.
- The sample is the set of knowledge topics of window B, not a random draw. Windows end at the first fix edit; reading after it (W 137 to 140, N 160 to 253, C 140 to 320) is not in these tables.
- Four workers, one batch, the Opus tier, before the skill existed. The skill now holds some of what they looked for (`harness-one.sh`, `junit.sh`, `env.sh`), so these figures overstate what a worker rediscovers today.
- The ITE of a pass is a model with stated rates, not a run.

## Questions for the curator (decisions not taken)

1. Whether a librarian pass is its own agent after the gather or three added lines in the gather's role: reading the workers' `decisions`, `precedentSearch` and `notDone` fields and the commands in their reports, then writing the how-to's to the skill and the INDEX lines. The second costs about 0.15M to 0.2M ITE a batch (20K more tokens in a gather of 184 turns, at about 6 ITE each, and 5K of output); the first 0.7M to 0.9M. Alternatives: no pass; the first; the second.
2. Whether the pass also writes skill rules from the refusal causes (`checking-roles-cost.md:241`), which is where the measured tokens are.
3. Whether the briefing's unnamed 31% is worth an experiment (two rungs, one with title lines in place of the unnamed keys), given `worker-context-cost.md:14`.
4. The backlog pass: all of it, only the first two rows (the INDEX lines and the how-to harvest, about 280K tokens read), or none.

## Files

Scratch, outside the repository, not committed, in session fe616d40's scratchpad, `context-study/`: `extract.py` (transcript to JSON), `classify.py`, `summarize.py`, `final.py`, `verdict.py`, `use.py`, `overlap.py`, `skeptics.py`, `ite.py`, `savings.py`, `L.sh` (record lookups); the briefing text of each worker, the traces, and the copy of `explorations/` at `9c9e823d5`.
