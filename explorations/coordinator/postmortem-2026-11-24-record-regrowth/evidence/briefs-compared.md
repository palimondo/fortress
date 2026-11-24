<!-- A comparison, word for word, of the briefs of the FACTS consolidation of 2026-10-13, of the clarity rewrite of 2026-10-22, and of today's consolidation pilot and chunks of 2026-11-24, on the skill as a home for cut text, length, repetition and pointers, tests, and the purpose of an entry; for the curator and the coordinator; written 2026-11-24 from the transcripts, git and the briefs on disk. -->

# The briefs compared: October, the clarity rewrite, and today

## In short

1. Today's briefs quote "Your default is to cut" as October's writers' brief, but that line was only in the morning trial's brief, and the October chunk writers never got it.
2. The October chunk writers got the curator's goal instead, a much smaller record that has "not lost any reasoning capabilities", measured by a test of decisions that had to score 27 of 30 or better.
3. The October writers were told to "remove none"; whole entries left only at a later step, Step 12, and only those about how we work and about the platform.
4. The 27 FACTS entries that left at Step 12 were the whole section "The container" but one, plus the entry on the ledger's tool, such as "The Bash tool's 10-minute ceiling kills long runs".
5. Today's briefs let a writer remove any entry whose rule a grep finds in the worker skill, and 20 entries on the harness, the build, walk and the checker left that way in the five chunks written today, since reverted.
6. The outline that chose October's 27 said in words that an entry on the tree's own tools, "the build, the harness, the gate's stages", stays in FACTS.
7. Much of the worker skill is written from FACTS: its sources file cites 152 entries by number, and since 23 October the orientation workflow writes each landing's new facts into it, so a fact cut because the skill says it makes the skill its own source.
8. On length, all three passes call 600 characters a check, not a cap; October also set a chunk budget derived from a 145K goal for both files, and the clarity rewrite dropped that budget, put clarity first and restored conditions that the October cut had lost.
9. Today's briefs keep October's chunk budget but not the goal it came from, nor the test of decisions, nor the clarity rewrite's rule to keep every condition.
10. On repetition, October and the clarity rewrite both ask for one home per claim and a pointer by number; today's briefs keep the merge rule but make the skill a home too.
11. On tests, October asked for one test or a name pattern, the clarity rewrite for the evidence and its kind, and today's briefs put the evidence in one sentence that can be cut whole, a question still open with the curator.
12. Today the chunk writers were told to match the length of a pilot that the curator had not yet judged, while in October his comments on the trial shaped the rule before any chunk ran.

## Sources, and how to print them

Times are UTC. A quote is exact; "..." marks a cut of mine.

- **OLD2/001**, **OLD2/002**: parts of the coordinating session's transcript, `projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-11-07T23-09.jsonl.parts/001.jsonl` (10-13 to 10-20) and `002.jsonl` (10-20 to 10-24), on the branch `transcripts-blinded` (checked out at `/home/user/fortress-transcripts-blinded/`). Cited as `OLD2/001:LINE`.
- **LIVE**: today's transcript, `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`. Cited as `LIVE:LINE`.
- The briefs of October were files in the scratchpad, now gone; the transcript holds each whole, in the `Write` or `Bash` call that made it.

| brief | where | time |
|---|---|---|
| October trial, "Draft record rule and trial" | `OLD2/001:966` (Write `record-rule/brief.md`), launched `:985` | 10-13 09:03:56 |
| October pairs trial (FACTS and POSITIONS on one ground) | `OLD2/001:1471` | 10-13 10:24:16 |
| October scouts' template | `OLD2/001:3305`; chunk texts `:3314`, `:3418` | 10-13 17:45:15 |
| October writers' template | `OLD2/001:3322`; edit `:3523` (18:02:03); chunk texts `:3483` (18:01:17), `:3878` (18:24:16) | 10-13 17:45:42 |
| October "Step 12: retire the old homes" | `OLD2/001:4546`; edit `:4715` (19:49:08) | 10-13 19:46:27 |
| October definition, "What an entry is", and the worked examples | `explorations/coordinator/process-engineering/record-rule-draft.md:117-256`, unchanged since `8cde9406c1` (10-13 17:44) | |
| Clarity rewrite, its briefs | `explorations/coordinator/tools/record-clarity/` at `913ba1cbfc`, the version its FACTS run used (launched `OLD2/002:9570`, 10-22 10:10:51, with no extra brief); cited below by today's line numbers, one higher than at `913ba1cbfc` after line 22 | 10-22 |
| Clarity rewrite, its standard | `explorations/reviews/revival-record-synthesis.md:356-441` | 10-22 |
| Today's pilot, "Pilot of FACTS consolidation" | `LIVE:33954` | 11-24 12:37:19 |
| Today's judge of one section | `LIVE:34049` | 11-24 12:55:43 |
| Today's pilot chunk, "Pilot chunk writer, harness section" | `LIVE:34197` | 11-24 13:11:59 |
| Today's scouts and writers | `evidence/consolidation/scout-brief.md`, `writer-brief.md`; launched `LIVE:34213` to `:34525` | 11-24 13:12 to 13:48 |

To print any brief whole, give the transcript file and the line:

```
python3 -I - FILE LINE <<'EOF'
import json, sys
n = int(sys.argv[2])
for i, line in enumerate(open(sys.argv[1]), 1):
    if i == n:
        for c in json.loads(line)['message']['content']:
            if c.get('type') == 'tool_use':
                for k, v in c['input'].items():
                    print(f'--- {k}\n{v}')
        break
EOF
```

## 1. The worker skill as a home for text that leaves an entry

### The words

- **October trial** (`OLD2/001:966`): the only homes are the report and the history. "Line references, lists of sites, measurement narratives, timings, counts no decision rests on, and every account of how the fact was found stay in the report or go to the history."
- **October definition** (`record-rule-draft.md:137`, `:140`): "5. Does another entry or a skill say it already? Give that entry's number, or the skill's part." And: "Questions 3 to 5 move a sentence; they do not lose it."
- **October writers** (`OLD2/001:3322`): "Merge two entries where one home is the right answer; remove none, since the entries that leave move at a later step." The coordinator named each leaving clause per chunk (`:3878`): "Keep a leaving clause at the line's end, nearly word for word, marked "(moves to <its home>)"; it leaves at a later step." For four of the seven later chunks: "No entry of this chunk leaves; rewrite them all."
- **October Step 12** (`OLD2/001:4546`): "You retire the old homes of the coordinator's rules now that the new `coordinator` skill holds them ... This step takes them out, so that nothing is held twice and nothing is lost." Its scope was named by section: "the POSITIONS sections "How we work" and "How he wants to be spoken to" ...; FACTS "The container" but F-203, and the ledger's F-219 if the outline sends it out ... Before removing one, confirm with a bounded `grep` that its rule is in that home; an entry whose rule you cannot find stays, and you list it". Added at 19:49:08 (`:4715`): "An entry or clause whose home is one of them leaves now only where its rule already stands in that skill as it is today; otherwise it stays".
- **The outline that chose them** (`process-engineering/coordinator-skill-outline.md:93`): "An entry stays if its subject is the language, the library, the tree or its own tools (the build, the harness, the gate's stages as measurements), the specification, the plan, or his decisions about them. It leaves if its subject is how he and the coordinator talk and decide, how agents are briefed, run and checked, how batches run, how the record is kept, how skills are written, or how the platform and the Claude Code harness behave." It rests on the curator's words of 10-13 09:16 (`OLD2/001:1018`): "positions and facts I believe should relate to the project only. And we are now trying to extract everything that is about the process of a collaboration between you and me into the coordinator skill."
- **Clarity rewrite** (`record-clarity/writer.md:33`): "**Concepts.** Define a concept in the entry only if it belongs to this entry alone. List any other concept that a reader needs in `concepts.md` ...: the term, the entries that use it, and where it should be defined for every worker (the `fortress-repo` core, an area part, or the short orientation that will replace the revival part). The revival part is being rewritten: do not lean on it." Its cold reader (`coldread.md:5`) may read the skill "except `references/revival-changes.md` and `references/sources.md`". Its standard (`revival-record-synthesis.md:115`): "the coordinator loads the full current record; a worker loads a much smaller Revival orientation whole. Revival selects the facts needed to correct its working model, rather than reproducing the full record"; `:144`: "If a useful fact exists only in the skill, flag it for the normal FACTS pass rather than silently discarding it."; `:419`: "Only then use the corrected current record as input to Revival consolidation." The curator, 10-22 08:35 (`OLD2/002:9070`): the orientation workflow is for "transferring the records from facts and into the ... Orientation for the revival into the fortress skill."
- **Today's pilot** (`LIVE:33954`): "Each cut names where its text lives now: the entry's history, a report section, a ledger row, another entry, or a skill part."
- **Today's judge** (`LIVE:34049`): it looks for "what a consolidation would find beside length: stale entries, unsupported claims, entries that say the same thing, entries whose rule belongs in a skill", and asks "Does another FACTS entry, or a part of the `fortress-repo` skill, say the same thing?"
- **Today's pilot chunk** (`LIVE:34197`): "15 entries that the `fortress-repo` skill already holds whole (F-98 to F-108, F-112, F-113, F-383, F-404), and F-109 as a 16th candidate. An entry leaves FACTS only where a grep finds its rule in the skill, and the skill's sentence is right."
- **Today's writers** (`writer-brief.md:29`): "An entry leaves FACTS where the `fortress-repo` skill already holds its rule: only where your grep finds the rule in the skill, and the skill's sentence is right. Remove it with a note that names its home, the skill's file and section."
- **Today's scouts** (`scout-brief.md:15`, `:17`): "**Cited by.** The FACTS and POSITIONS entries, and the files under `.claude/skills/`, that name its number"; "**Said elsewhere.** Grep `.claude/skills/fortress-repo/` and FACTS for two or three of the entry's key terms. Give each place that states the same thing".

### Which entries left at Step 12

All 27 were rules of how to work, about the platform, the session, the agents and the record's tools. None was a fact about the original tree. Commits `1632b5dfa7` (19:59, 22 entries), `9dd34a1f22` (20:01, F-197 to F-199) and `b67abe3d26` (20:13, F-210, F-219); 28,371 characters, matching `consolidation-of-october.md:45`. Twenty-six were the section "The container", all of it but F-203 (`env.sh`, which moved to "The harness and the gate"); the 27th, F-219, was in "The ledger". POSITIONS lost 35 entries at the same step, from "How we work" and "How he wants to be spoken to".

Five of them, with their titles at `1632b5dfa7^` and the home that `FACTS-history.md` names:

- F-191, "The Bash tool's 10-minute ceiling kills long runs": the `fortress-repo` skill's `references/session.md`.
- F-196, "The VM can be restarted under a live session with the disk intact: worktrees, uncommitted edits and agent transcripts survive; a Workflow run and its agents do not": the `cloud-container` skill's `references/stops.md`.
- F-201, "A restart of the session's own process kills its background runs, and `resumeFromRunId` then recovers every agent that had finished": the `coordinator` skill's `references/delegating.md`.
- F-208, "`agent()` in a Workflow returns null for an agent the harness marks failed, even after the agent delivered its structured output": `delegating.md`, "The Workflow tool".
- F-213, "A push notification from the coordinating session reaches the curator's iPhone when he is outside the app": the `coordinator` skill's `SKILL.md`, "Talking to the curator".

The nearest to the tree were F-192 (parser-generation directories fill the disk; its mechanism went to ledger row 702) and F-219 (the ledger's sections and `ledger.py`), both about how a worker uses the repository's tools, not about what the Fortress code does.

### Did the skill then hold text written from FACTS?

- The orientation workflow did not exist on 10-13. Its tool was committed on 10-22 at 09:28 (`913ba1cbfc`); its first run, in consolidate mode, was launched on 10-22 at 12:38:43 (`OLD2/002:10975`), after the FACTS clarity pass ended at 12:13, with the clarity chunks' `concepts.md` files as input; it was judged at 14:04 (`d9af66e641`) and installed as the skill's revival part at 14:08 (`b1c54a47b3`). Its first update after a landing was climb batch 21's, 10-23 18:56 (`732f3b2e2e`).
- But the `fortress-repo` skill already held text written in part from FACTS. Its rewrite of 10-08 (`24af7743b6`) named FACTS entries as the sources of its sentences: at `b67abe3d2`, 65 lines of its `references/sources.md` cite FACTS by title, for example line 154, "XXX mechanics: FACTS "An `XXX*.fss` in the interpreter corpus IS a gated expected-failure test", "The `XXX` expected-failure mechanism in `compiler_tests/` ..."". From 10-08 the landing also had a writer add each change to `revival-changes.md` (`coordinator/references/batch.md:80` at `b67abe3d2`, "The landing", step 2, after step 1's fold into FACTS).
- So in October the risk of a circle existed for clauses. The chunk writers did move clauses to skill parts by question 5: 40 of the 168 provenance lines of the chunk rewrites name a skill (`grep -c -i skill` on the 10-13 18:xx and 19:0x lines of `FACTS-history.md` at `b67abe3d2`). Each such line moved detail, such as line citations, example names or a command's form, and kept the entry. For example F-103 (19:03): "'Saw wrong failure' for an unmet `compile_err_contains` key goes to F-103; ... the lines (`FileTests.java:394-412`, `:342-366`) to the report's section 6, F-104 and the fortress-repo skill's tests-writing.md."

### In effect, today

- The five chunks applied today (`b1149bfbdb` to `8b547a2276`, 13:26 to 13:48, all reverted at 13:54 by `d52210a046`) removed 20 entries to the `fortress-repo` skill and merged 13: harness 13 removed, exec 4, checker-1 1, checker-2 0, checker-3 2 (`evidence/consolidation/apply-*.md`, the `remove` lines). Every one is about the tree or its tools: F-98 to F-107, F-112, F-113, F-383, F-404 (the harness's keys, `XXX` tests, shards, heaps, the native wrapper, worktree seeding), F-7 (walk switches the type check off), F-17 (the library order), F-23 (a comment's source span), F-25 (the class loader's lock), F-42 (the checker stops at a stage's first error), F-231 and F-236 (the method-size limit).
- October's chunk F1 rewrote the same harness entries and kept them all: at `b67abe3d2` F-98 to F-109 and F-111 to F-114 stand, with only F-110 merged into F-104.
- The skill parts named as their homes were written from these very entries. Today's `.claude/skills/fortress-repo/references/sources.md` cites FACTS "The gate's thread count is pinned in the build file" (F-99) at line 113, "Three heaps run the interpreter" (F-107) at lines 116 and 182, "The harness's `run_out_WIcontains` key ..." (F-98) at line 154, and F-396 six times at lines 1513 to 1519, the entry that today's pilot cut to the skill. The file cites 152 distinct entries by number (226 citations).
- The curator on the pilot, 13:41 (`LIVE:34544`): "This one creates a cyclical, this rewrite creates a cyclical dependency. Facts can never cite skill. Parts from the facts are being encoded into the skill for workers to be able to effectively work in this repository. It can never be a ground for reducing what's written in the fact."
- The rule text itself still allows the move: `coordinator/references/record.md:40`, "5. Does another entry or a skill say it? Give that entry's number, or the skill's part.", unchanged since October's definition. October limited it by practice (clauses only in the chunks, whole entries only for subjects outside the project); today's briefs applied it to whole entries about the tree.

## 2. Length

### The words

- **October trial** (`OLD2/001:966`): "Your task is to state the rule he asked for, with a measure, and to show on the largest entries that it gives the shrinkage he wants." "A measure: a few lines; for this trial, under about 600 characters, and an entry over that says in your report which decision needs the extra." The 600 was the coordinator's ("I didn't derive it from data", 09:58, `consolidation-of-october.md:105`).
- **The curator on the trial page**, 10-13 15:38 (`OLD2/001:2639`): "we need to enforce a 600 limit, maybe a 1000? But on the other hand, like, it, it needs to have a reason to be that large, because we want that compressed benefits".
- **October definition** (`record-rule-draft.md:144`): "**The size.** About 240 entries stay, and the goal of about 145K characters for both files allows about 600 each. So 600 is a check, not a cap. An entry may pass it when the questions keep a sentence that needs the room. Its writer names, in the chunk's report, the decision or the misreading that the sentence prevents, and shorter entries pay for it: a chunk's total stays under 600 characters times its entries. The record test checks the result: no worse than 27 of 30."
- **October writers** (`OLD2/001:3322`): "The measure: `FACTS.md` and `POSITIONS.md` together go from 361K characters to at most about 145K, and the record test still scores 27 of 30." "Fix the file until the check passes and the chunk's total is under 600 characters times its staying entries." Hand-back: "each entry over 600 characters with the decision that needs the extra".
- **October Step 12** (`OLD2/001:4546`): no limit per entry; "FACTS and POSITIONS were consolidated tonight to 200.6K characters, from 361K; the entries that leave for the skills are still in them, about 77K."
- **Clarity rewrite** (`writer.md:36`): "Keep each entry near 600 characters as a check, not a cap. Clarity comes first." `writer.md:28`: "Keep every condition, exception and limit. A shorter sentence must not lose one." `record.md` from `b6f5268e1d` (10-22 09:32), today `:31`: "This is a check, not a cap, and no reason to split". Its standard (`revival-record-synthesis.md:409`): "Character count is a diagnostic, not an acceptance score."; `:383`: "do not mechanically delete every number or past-tense sentence." No chunk budget and no total.
- **The curator on the clarity pilot**, 10-22 08:19 (`OLD2/002:8790`): "The purpose of the Clarity rewrite added more additional context. So, yes, I understand the size increase. I think that's just the cost we are willing to pay for Clarity."
- **Today's pilot** (`LIVE:33954`): the problem is stated as length: "Today it has 339 entries, 427K characters, a median entry of 1,199, and 299 entries over 600." "The four new entries together are under 600 characters times four. One entry may pass 600 only if a question of "What an entry is" keeps a sentence, and you say which."
- **Today's writers** (`writer-brief.md:9`): "`explorations/coordinator/FACTS.md` has grown from 90K to 427K characters since its consolidation of 2026-10-13." `:19`: "Fix the file until the check passes and the chunk's total is under 600 characters times its staying entries." An entry may pass 600 only when a question keeps a sentence "...and shorter entries pay for it." `:34`: "Match their register and their length." `:41`: "the staying entries' total is under 600 times their count." No total for the file and no test of decisions.
- **The coordinator**, 13:00 (`LIVE:34070`), not in a brief: "The target is about 600 characters an entry, about 200K".

### What the clarity rewrite restored

- Its growth, FACTS 139.1K to 221.8K of entry lines (`consolidation-of-october.md:132-133`): the fact, its conditions and its meaning +37.7K, pointers +12.6K, ledger rows +12.1K, titles +7.9K; entries that state the kind of their evidence, 13 to 69. The coordinator on the POSITIONS pilot, 10-22 06:09 (`OLD2/002:8655`): "Most of the growth is the few words on each pointer and the conditions the checker restored."
- Conditions that the October cut lost, named as such: `consolidation-2026-10-22/evidence/facts/f12/proposals.md:10`, on F-137: "**Two conditions dropped before this pass are restored.** "Lone" now carries "that no other argument fixes" ..., and the bound for a lone parameter with no narrowest candidate carries "where every argument is below it" ... The second was lost at an earlier consolidation." Also `f3/proposals.md:45`: ""Gated by" is restored, as the old entry had it."

### In effect

- October: all 157 rewritten entries came to 89,970 characters against a budget of 94,200; each writer held its chunk's budget as a bound (`consolidation-of-october.md:96`).
- Today: the five chunks went from 143 entries and 160.5K to 109 entries and 63.0K, about 578 an entry (chunk sizes in `chunks.json`; staying lines of the apply files). The pilot's four entries went from 9.3K to 2.4K (`LIVE:34153`). The curator on F-252, 13:17 (`LIVE:34544`): "this 600 size goal was a soft limit for a reason." On F-396, 13:41: "Facts can be larger than 600. That's not a problem on its own. It is a problem when the sum is too large."
- Today's briefs measure growth from 90K, the cut's result. The record that the curator accepted after the clarity rewrite was 222.8K (`e06bd068e7`, the whole file).

## 3. Repetition between entries, and pointers

### The words

- **October trial** (`OLD2/001:966`) quotes the curator, 10-13 08:01: "Is too much detail or duplicated and there were some very long entries." Its rule keeps "a pointer to the report and section that hold the rest".
- **The curator**, 10-13 10:23 (`OLD2/001:1458`): "if the same things are restated from from different sides this we need to keep one home and just pointers to the other citations by by record pointing not by restating the same things".
- **October pairs trial** (`OLD2/001:1471`): each FACTS entry "names the decision it builds by the POSITIONS entry's bold title ..., without restating the decision or its reason", and the report says "for each pair, whether the duplication you removed did any work a reader would miss".
- **October definition** (`record-rule-draft.md:137`, `:140`, `:142`): question 5; "the cache (a copy of another entry)" among the four habits that put in an entry what belongs elsewhere; for a count that each landing changes, "Other entries give that entry's number, not the value." Worked example F-78 (`:230`): "Cut, the rule's inputs ...: question 5. P-48 holds the rule, and the entry names it."
- **October writers** (`OLD2/001:3322`): "A pointer is the target's number, with the first words of its title in quotes where the sentence needs them." "Merge two entries where one home is the right answer". Added at 18:02:03 (`:3523`): "Replace every pointer by position ("the next entry", "above", "below") with the target's number, since the consolidation moves lines."
- **October scouts** (`OLD2/001:3305`): item 5, "The other entries of FACTS and POSITIONS that cite this one by its title".
- **October Step 12** (`OLD2/001:4546`): "so that nothing is held twice"; "a pointer to a removed entry is refused by the tool: replace it by the skill's file and section in words, or drop it where the sentence stands without it".
- **Clarity rewrite** (`writer.md:32`): "**Pointers.** For each pointer (another entry, a gap-ledger row, a PLAN item, a report), decide first whether it belongs in the entry. If it stays, give it a few words on what it holds, so that a reader can decide whether to follow it without loading it." `record.md` from `b6f5268e1d`, today `:25`: "A pointer that stays in an entry carries a few words on what it holds"; today `:30`: "If several entries together establish a conclusion that workers keep working out again, make it a sentence of the entry that owns its subject, with pointers to the entries it rests on." The ownership check: "No repair history or copied count hides it." Standard (`revival-record-synthesis.md:383`): "Link to the owning current count rather than duplicating a count that changes at every landing."
- **Today's writers** (`writer-brief.md:18`, `:30`): "Merge two entries where one home is the right answer." "A count that each landing changes has one entry that holds its value; other entries give that entry's number." On a pointer's words, nothing of their own; they read `record.md` whole, which holds `:25`.
- **Today's scouts** (`scout-brief.md:17`): "**Said elsewhere.** Grep `.claude/skills/fortress-repo/` and FACTS for two or three of the entry's key terms." This is the first brief that gathers, for every entry, where another entry says the same thing. It gathers the skill in the same item.
- **The curator today**, on F-252, 13:17 (`LIVE:34544`): "if you are saying that there are other facts that are restating the same thing and you just cut it from this particular fact, and the same information lives in a different fact where this one is pointing by reference, such a cut is okay." On F-396, 13:41: "if the sources for growth are like duplication and restatement of the same things between facts, that must go. We must use reference pointing."

### In effect

- October's chunks merged 11 entries into others and removed none (`consolidation-of-october.md:44`). Of the 132.5K that left the chunk rewrites, 9.9K, 7 %, were sentences that point to another entry, by a heuristic (`:54`).
- Today's five chunks merged 13 and removed 20 to the skill. No brief of any pass measured how much of FACTS repeats another entry.

## 4. Tests named in an entry

- **October trial** (`OLD2/001:966`): "the test that gates it (one test or its name pattern, not a list)".
- **October definition** (`record-rule-draft.md:127`): "the test that gates it, or its source when no test does". Worked examples: F-78 (`:233`), "Cut, ten tests and one refusal by name: question 4. A pattern names them, and the report lists them."; F-94 (`:253`), "Cut, the test of each row: question 5. Each row names its test."
- **October writers and Step 12**: nothing beyond the definition.
- **Clarity rewrite** (`writer.md:29`): "For a fact, its evidence: the test, measurement, source reading or report section, and whether it was observed, read in the code or inferred." `record.md` from `b6f5268e1d`, today `:18`: "its evidence: the test that gates it, or its source, and whether it was observed, read in the code or inferred". Standard (`revival-record-synthesis.md:381`): "A missing automated test is not itself a defect if other evidence is honestly identified."
- **Today's pilot** (`LIVE:33954`): "One point is open for the curator: whether an entry names its test at all. The definition today says that an entry holds "the test that gates it". The curator leans to fewer test names. So write each new entry by the definition, with its test, and put the evidence clause (the test or command that shows the fact) in one sentence that can be cut whole. Give each new entry's length with that sentence and without it."
- **Today's writers** (`writer-brief.md:34`): "One point is open with the curator: whether an entry names its test. So put the evidence (the test, the command or the source) in one sentence that can be cut whole, as the pilot does."
- **Today's scouts** (`scout-brief.md`, item 4): "Each test, file, script or path that the entry names: found or not found".
- **The curator**, 09:20 (`LIVE:32554`): "There should be no tests named or like, there is a clear demarcation." On F-252, 13:17 (`LIVE:34544`): "If those tests are named in the report, then they should leave the fact completely ... I think we need to judge this properly." On the old F-396, 13:43: a one-time rewrite of the reports, "so that there is a one section listing the tests and building a tool that could extract it".
- **In effect**: October cut test lists to one test or a pattern and kept it. Today's sentence that "can be cut whole" holds the test and the source alike, so cutting it would also cut the evidence and its kind, which both original passes keep in every entry.

## 5. The purpose of an entry, and its reader

- **October trial** (`OLD2/001:966`) quotes the curator, 10-12 16:42: "it needs to be something that can influence your or workers' decisions during your and theirs regular work"; and 10-13 09:00: "my optimized build is about capturing the current status quo." Its rule: "What a FACTS entry is: the current status quo only." Its readers: "the optimized build at every boot and in briefs ... Say who reads which: the coordinator, and a worker given an entry in its brief."
- **October definition** (`record-rule-draft.md:125`): "**Its purpose.** An entry lets a worker or the coordinator act right without opening the report, and tells it when the report is needed. FACTS does this for what is true of the tree." `:131`: "Picture the reader: a worker new to the repository who gets the entry in a brief and acts on it alone, or the coordinator who chooses the next work. Write as for a capable colleague who takes over tomorrow and cannot ask you."
- **October writers** (`OLD2/001:3322`), the curator's goal quoted whole (10-13 17:23): "We have saved a significant amount of space, but not lost any reasoning capabilities from the status quo. We want to have better performance and much lower memory cost. That's the goal."
- **October Step 12**: FACTS and POSITIONS hold the project; how we work goes to the skills (the outline, `:93`, above).
- **Clarity rewrite** (`writer.md:9`, `:12`, `:14`): "Their entries are too compressed: they lean on handles, short forms and phrasing that make sense only to someone who was in the conversation or the batch that produced them." "for a fact: what is established and under which conditions (path, library, call form, values), what it means for the work and its limits, and its evidence." "Keep the meaning." `record.md`, today `:16`: "An entry reads on its own. A reader who knows the language, or can look it up in the `fortress-repo` skill, can tell what it says without the conversation or the batch behind it." The reader is the coordinator, who loads the record whole; the worker reads the orientation drawn from it (`revival-record-synthesis.md:115`).
- **Today's pilot** (`LIVE:33954`): "`explorations/coordinator/FACTS.md` is the record of what is established about the tree. Workers read slices of it." "Keep the clarity high: a reader who knows the language, with the `fortress-repo` skill loaded, can act right on the new entry without the report, and can tell when the report is needed."
- **Today's writers** (`writer-brief.md:9`): no purpose of their own; the problem is growth, and the curator's orders: "compress the facts again. Of course, keeping the clarity high." and "There should be clear demarcation about things that go into the facts and which go to the facts history."
- **The difference**: the clarity rewrite's reader had the skill's core and area parts but not its revival part, and missing terms flowed from the entries to the skill. Today's reader has "the `fortress-repo` skill loaded", the revival part included, so all skill text counts as known and becomes a ground to cut.
- **The curator today**, 13:17 (`LIVE:34544`): "facts are recording the deviations from your knowledge. Like, this is for in-context learning. What is different from what your default assumption would be must be captured in the fact."

## 6. Other departures, and what today's briefs lack

1. **"Your default is to cut" is misattributed.** Today's pilot says "take its writer's brief as yours" and the writers' brief says "Your brief is that day's writers' brief:" (`writer-brief.md:13`, `:15`), each followed by that line. In October it was in the trial's brief (`OLD2/001:966`) and the pairs trial's summary ("the default is to cut", `:1471`) only; no `Write`, `Edit` or `Bash` input of the chunk writers holds it (search of `OLD2/001` for "default is to cut"). After the trial the curator asked for a loss test (10:14, `OLD2/001:1331`: "if we lose some of the critical functionality then we must try to find some middle ground"), and the definition added "Questions 3 to 5 move a sentence; they do not lose it" and "One habit cuts too much" (`record-rule-draft.md:140`). The source of the slip: `consolidation-of-october.md:11-14` gives the trial's brief (item 1, with the line) and the writers' brief (item 4, without it) a few lines apart under "The method in short".
2. **The goal and its test are gone.** October's writers had the curator's goal, "not lost any reasoning capabilities", and the measure "the record test still scores 27 of 30". It ran on the pilot (29 against 28) and the finished record (30 against 28). None of today's briefs names a goal for the file or a test of decisions; the coordinator planned the test after the chunks (`LIVE:34416`).
3. **The criterion for leaving FACTS is gone.** The summary that today's briefs were written from says "The 27 entries whose rules belong to skills were removed" (`consolidation-of-october.md:17`). It names neither "remove none" nor the outline's line between the project and how we work.
4. **The order of the curator's read.** October: the trial page (09:25), his comments (15:25 to 16:03), the definition from them (17:26), then the chunks (18:01). Today: the pilot page at 13:05 (`LIVE:34153`); the pilot chunk told at 13:11 to "Match its register and its length" of pilots "that the curator is reading now" (`LIVE:34197`); four chunk writers at 13:27; his comments 13:17 to 13:50, read at 13:53. `record.md:92` says "Run the rest on the curator's go."
5. **The method named.** Today's briefs: "He wants the method of 2026-10-13 run again as it was, not a new one" (`LIVE:34197`). The curator, 09:20 (`LIVE:32554`): "we did one consolidation of record, we shrank it, and then we did a rewrite for clarity, which grew it, and I accepted that growth"; 13:02 (`LIVE:34074`): "I want us to execute the old method that we had before, which worked." The briefs name one pass of two.
6. **The clarity rewrite's checks are gone.** It had a separate assessor that rewrote only entries marked reword or reorganize ("Do not mark an entry for a rewrite to make its surface like the others", `assess.md:16`), a cold reader, a fidelity checker, a fix round and a judge. Today's writer judges the six checks itself (`writer-brief.md:24`) and rewrites every entry under the chunk budget. `record.md:97-98` asks for per-entry Opus checks and a quiz; no brief of today's names them.
7. **New, and in line with the originals:** "each entry made true of the tree of today" (`writer-brief.md:22-28`), with stale claims rewritten and unsettled ones listed as "investigate". October's writers reported "any fact you found false or stale, with its evidence", and 12 notes fixed one; the clarity rewrite had the disposition "investigate", "do not silently delete the fact" (`revival-record-synthesis.md:407`).
8. **Smaller points.** October's scouts read entries at a pinned commit (`715641924`), "so that a commit landing while you work does not move them", and listed each entry's earlier texts in the history; today's scouts do neither, and today's writers repoint across chunks that land while they work (`writer-brief.md:43`). October's writers kept a leaving clause in the entry, marked, until its home was written and checked; today's writers remove at once. October's writers were told to use the scout file "instead of reading the reports yourself"; today's are told it "is evidence ... check a point of it where your text rests on it".

## 7. What a brief true to both original passes would say

These are findings from the comparison, each with the brief that holds it.

- **The goal:** a much smaller record that loses no decision, judged by a test of decisions on the pilot and on the result (October writers, `OLD2/001:3322`), and clarity first (clarity `writer.md:36`).
- **The reader and the purpose:** an entry lets a worker or the coordinator act right without the report, and says when the report is needed (`record-rule-draft.md:125`); it reads on its own, with every condition, exception and limit (`record.md:16`; `writer.md:28`).
- **The skill:** a chunk writer removes no entry (October writers, "remove none"). Whole entries leave FACTS only when their subject is how we work or how the platform behaves, chosen beforehand by section (the outline, `:93`; Step 12). Entries on the tree and its own tools, the harness and the gate included, stay. The skill takes concepts from the entries, not facts in place of them (`writer.md:33`; `revival-record-synthesis.md:144`, `:419`). October did let a clause point to a skill part by question 5, and `record.md:40` still says so; the curator's word of today, "Facts can never cite skill", rules that out, so the question's text and his word now differ.
- **Length:** 600 characters is a check, not a cap, in all three. The originals differ on the chunk budget: October set one, derived from a total for the files; the clarity rewrite set none and the curator accepted the growth. What both hold is a total for the record as the measure, with a named reason for each entry over 600.
- **Repetition:** one home per claim; other entries give its number with a few words on what it holds; merge two entries where one home is right; a count that each landing changes lives in one entry (`record-rule-draft.md:137-142`; `writer.md:32`; `record.md:25`, `:30`). The October pairs trial asked whether each removed duplicate "did any work a reader would miss" (`OLD2/001:1471`).
- **Tests:** one test or a name pattern, never a list (October trial; worked example F-78), and the evidence with its kind, observed, read in the code or inferred (clarity). Whether an entry names a test at all is open with the curator; both originals keep the evidence in the entry.
- **Order:** the curator judges the pilot's form before any chunk runs, and his comments change the rule before the writers get it (October, 09:25 to 17:26; `record.md:92`).
- **Attribution:** "Your default is to cut" was the trial's instruction, tempered by the definition that followed it; the writers' own brief quoted the curator's goal.

## Not checked

- I compared the briefs and their visible effect. I did not read the October writers' hand-backs or today's follow-up files beyond their `remove` lines, and I did not judge any entry's new text.
- The count of 40 October provenance lines that name a skill is a `grep` for "skill"; `consolidation-of-october.md:60` counts 25 entries by another regular expression.
- The orientation workflow's first run is dated by its launch in `OLD2/002` and its commits; I did not read its journal.
