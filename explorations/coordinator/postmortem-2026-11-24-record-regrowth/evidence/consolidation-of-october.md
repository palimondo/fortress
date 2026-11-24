<!-- How the FACTS consolidation of 2026-10-13 (257.6K to 90.2K, `b67abe3d2`) was done, what the clarity rewrite of 2026-10-22 added, and where each step is written down today; for the curator and the worker who compares it with the record-landing workflow; written 2026-11-24 from git, the transcript and this folder's scout files. -->

# The consolidation of 2026-10-13: how it was done

Times are UTC, 2026. "Shown": a source shows it; "inferred": I conclude it. "Transcript 001" or "002" is that part of the coordinating session's transcript, cited by time. Sizes are characters of FACTS entry lines.

Terms. A **chunk**: 19 to 42 entries of one section. A **scout**: a Sonnet agent that only gathers. A **writer**: an Opus agent that rewrites one chunk. An **apply file**: each new entry line with a provenance line under it. `record.py apply` puts the new line in FACTS and copies the old line, word for word, under the entry's number in `FACTS-history.md`, with the provenance line. `record.py check --base C` shows that nothing was lost since commit C and lists entries over 600.

## The method in short

1. A rule first, tried on the ten largest entries (36.3K to 5.9K). Its brief: "Your default is to cut. A check that nothing is lost is not your goal; the history file and the reports already keep everything."
2. The curator read old and new texts on a page and commented. A blind test found decisions as good.
3. An Opus worker turned his comments into "What an entry is": six questions per sentence, a size paragraph, five worked examples.
4. Per chunk, a Sonnet scout listed each entry's sources and report sections. An Opus writer rewrote the chunk. Its brief quoted the curator's goal, set "at most about 145K" for FACTS and POSITIONS together, told it to follow the definition "exactly" and to name where cut text lives, and said: "Fix the file until the check passes and the chunk's total is under 600 characters times its staying entries."
5. The coordinator applied each file on `main`, checked and committed, a pilot of two chunks first.
6. The record test ran on the pilot (29 of 30) and on the finished record (30 of 30).
7. The 27 entries whose rules belong to skills were removed, each with its home named.

## 1. The method as it ran

All 10-13, transcript 001. Shown unless marked.

1. 08:01. The curator asked why the night's slices (`3072a043a3` to `1558a22ede`) cut FACTS only to 259K: they moved provenance and kept detail (`coordinator-rewrite-plan.md`, step 1).
2. 09:04, Opus "Draft record rule and trial". Brief (written 09:03:56): "Nothing pushed for the cut. ... Your default is to cut." Its measure: "for this trial, under about 600 characters, and an entry over that says in your report which decision needs the extra. Line references, lists of sites, measurement narratives, timings, counts no decision rests on, and every account of how the fact was found stay in the report or go to the history." It cut the eight largest FACTS and two POSITIONS entries, 36.3K to 5.9K, on the page "Record Rule Draft", old beside new (`7bb5114b26`; `record-rule-draft.md:5`).
3. 10:18–11:54, the record test of the trial (point 6). 14:47, Opus: nine principles; 15:25–16:03, his page comments (point 5).
4. 16:13, Opus: the record store design; the skill outline (which entries leave FACTS, and their homes).
5. 17:26, Opus "Write the entry definition": "At most about 4K characters, written to be quoted whole in a brief", with questions, the size, and worked examples. Result: draft Part 2 (`8cde9406c1`); five examples, 17,952 to 3,086 characters (`record-rule-draft.md:154`).
6. 17:30, Opus builder: `record.py` and the numbering (`a74f5a2b7`; `a88e52bf78`, 18:00).
7. 17:45–18:13, nine Sonnet scouts, one per chunk, per entry "at most 1,500 characters": its sources, "the heading of the section that holds the entry's detail", its commits, the entries that cite it, the curator's dated words.
8. 18:01, writers for the pilot chunks F2b (F-51 to F-72) and P2 (P-37 to P-62). Template (17:45:42): read "What an entry is" and the worked examples, "Follow them exactly"; write each staying entry "as one line, with its provenance line under it (`from` the report sections that keep what you cut, `commit` the commit that established the entry, and a note on what moved where). Merge two entries where one home is the right answer". The definition keeps a sentence if "Without it, would the reader do something else ...? Keep it." and moves the rest: "3. Does it tell how the fact came about: a date, a batch, what it replaced, what was corrected, "no longer"? It goes to the history. 4. Is it detail that the reader needs only while doing the work: a line number, a list of sites, a timing, a mechanism? It stays in the report, and the entry names the section. 5. Does another entry or a skill say it already? Give that entry's number, or the skill's part." (`record-rule-draft.md:133-137`). Added 18:02: a bold title on every entry, numbers for positional pointers; for text that leaves FACTS: "Keep a leaving clause at the line's end, nearly word for word, marked "(moves to <its home>)"".
9. 18:16, the coordinator applied the pilot (`record.py apply`, `check --base HEAD`: 0 failures), committed `55f1a1352d` and started its record test: "The other chunks start when it passes" (18:17:28). It launched two more writers at 18:26, before the grade (18:58).
10. 18:26–18:57, writers F2a, F2c, F3, F4, F1, P1, P3. The coordinator applied each, checked, committed (`0b47fd7335` to `ab933086b8`, 19:10). It sent no file back.
11. 19:10, the record test on the finished record: 30 of 30.
12. 19:49, Opus "Step 12": 22 FACTS entries removed, "each with a history note naming its home, the skill's file and section, where a grep found its rule" (`1632b5dfa7`); five more by 20:13 (`b67abe3d26`).

The coordinator wrote briefs, applied, checked and committed; it wrote no entry. No per-entry checker or Fable review ran (agent list).

## 2. What left the entries

FACTS entry lines: 256,241 at `12df81e7e` (195 entries), 89,263 at `b67abe3d2` (157). Removed: 166,978, measured exactly by entry number:

| where it went | characters | share |
|---|---|---|
| chunk rewrites: 157 entries, 11 merged into others (5,561 of it) | 137,900 | 83% |
| to a skill, as rules, not project facts: 27 entries at step 12 | 28,371 | 17% |
| to a skill: clauses and pointers at step 12 | 707 | 0.4% |

Inside the chunk rewrites, by sentence (a heuristic). I split each old entry into sentences and classed them with the anatomy scout's `fa.py`. A sentence "left" when under half of its words (four letters or more, numbers, code spans) appear in the new entry. Of the 132,489 characters that left:

| class of the sentence that left | characters | share | home by the rule |
|---|---|---|---|
| file:line, test list, a measure, or three code spans | 84,748 | 64% | the report (question 4) |
| names a ledger row | 18,454 | 14% | the row |
| points to another entry | 9,854 | 7% | that entry (question 5) |
| date, batch, rung, commit or repair word | 5,663 | 4% | the history (question 3) |
| title text and the rest | 13,770 | 10% | unclassed |

The rest of the 137,900, 5,411, is net rewording. At thresholds 0.4 and 0.6 the shares move two points at most.

The writers' 168 provenance notes, matched by regex, name a report section in 106 entries, another entry in 69, a row in 41, a skill in 25, the history in 19, a stale or false claim fixed in 12 (its characters not separable).

`FACTS-history.md` keeps every old line word for word; the notes name each part's home. Little provenance was left, since the night's slices had moved it (inferred).

Twelve entries. Rule: of the 157 rewritten entries in number order, the 7th, then every 13th. Old → new; "gone" lists what left, with the home the writer's note names.

- F-19, 376 → 423, and F-179, 210 → 282. Nothing gone; a title added.
- F-35, 1,270 → 611. Gone: the checker's reason → report section 7; export errors → `distance-sites.tsv`; six declarations → row 399.
- F-48, 1,341 → 648. Gone: the probe account and code lines → judgement sections 4, 6, 9; a fixed row → its test.
- F-61, 1,100 → 503. Gone: three sentences copied from F-67, F-131 and F-53 → their numbers; the array protocol → report section 4.
- F-74, 1,567 → 599. Gone: failure kinds → `PROBE-Q.md` section 4; widths → F-57; a line → row 486.
- F-87, 3,286 → 688 (the trial's text). Gone, 2.5K: sites with lines → three reports' sections 1; "a separate fact" → `SKEPTIC.md`; a 508-character test list; fixed rows → the rows.
- F-102, 1,068 → 477. Gone: four line citations → the code and `tests-writing.md`; "the next entry" → F-103.
- F-118, 1,057 → 517. Gone: methods and spec lines → the report; row 317, fixed → the history.
- F-132, 1,251 → 618. Gone: natives with lines → reports; range bodies → F-133; six fixed rows → the history.
- F-145, 3,419 → 880 (the trial's text). Gone, 2.5K: message and line citations → report section 1; seven test names → `SKEPTIC.md`; fixed rows → the history.
- F-163 with F-164 merged, 1,360 → 574. Gone: two commits and file lines → `spec-change-form.md` sections 7, 5; the PDF rebuild → the skill.

## 3. The form that resulted

At `b67abe3d2` (entry-anatomy.md, 1 and 2; spot-checked):
- 157 entries; median 576, quartiles 518 and 600, longest 976; 38 over 600; median 5 sentences after the title.
- A bold title in every entry: 22.1K, a quarter of the file.
- The fact, conditions and meaning: "the rest", 23.2K; sentences naming a row, 18.1K (107 entries).
- Tests: median 1 name; 84 entries name one.
- Code by file and line: in 8 entries. Pointers to other entries: median 1.
- Report: "Detail:" with one path and section, in 144 entries.
- Dates, batches, commits, repair words: 19 sentences, 2.1K.

The rule then: "the fact as it stands now; what it means for the work ...; the test that gates it, or its source; the decision it builds, by number; and the report section that holds the detail" (`record.md`, `7b434aae52`).

## 4. The limits

- Writers' brief, "The measure": "`FACTS.md` and `POSITIONS.md` together go from 361K characters to at most about 145K, and the record test still scores 27 of 30." Step 2: "Read the sizes it reports. Fix the file until the check passes and the chunk's total is under 600 characters times its staying entries." The hand-back: "each entry over 600 characters with the decision that needs the extra" (template, 17:45:42).
- The definition to "Follow ... exactly" (`record-rule-draft.md:144`): "So 600 is a check, not a cap. An entry may pass it when the questions keep a sentence that needs the room. Its writer names, in the chunk's report, the decision or the misreading that the sentence prevents, and shorter entries pay for it: a chunk's total stays under 600 characters times its entries."
- Who checked: each writer, with `record.py`'s size report. The coordinator read the hand-backs and refused none.
- Each writer held the budget as a bound and came in under: F2b "13,135 after, against a cap of 13,200 (600 × 22)"; F2a "The limit was 10,800"; F3 18,423 of 18,600 (hand-backs 18:16–19:03). All 157: 89,970 against 94,200.
- An entry over 600 stayed with its reason named: "F-58 (811): the worked example's text unchanged, for decision D". 39 of the 157 stayed over 600; F-111's leaving clause left at step 12 (1,261 to 603).

## 5. What the curator saw and said

He read the "Record Rule Draft" page: the rule, then each trial entry, the old text in a fold. No page showed him the pilot chunks.

- 08:01: "what we got was dropped from 303,000 to 259,000 ... why didn't it drop?" → "Your default is to cut".
- 09:02: "my optimized build is about capturing the current status quo" → the present in the entry.
- 09:58: "What was the maximum entry size you picked?" The coordinator: 600, "I didn't derive it from data".
- 10:14: "if we lose some of the critical functionality then we must try to find some middle ground" → the record test.
- 10:16: "at a thousand or one thousand five hundred"? The coordinator: 600 "isn't a target to cut toward".
- 15:34 (page): "we need to provide some kind of questions or examples" → the six questions with examples.
- 15:38 (page): "maybe a 1000? But ... it needs to have a reason to be that large, because we want that compressed benefits" → a named reason and the chunk budget (draft item 20). A consequence sent to the history: "I don't think that's the right call" → it stays (item 11).
- 15:46 (page): "What is the 14? ... rewrite the facts in the register of ASD-STE100 halfway there" → question 6, the register, one entry per moving count.
- 16:16: Sonnet workers "give you the full context and then let the Opus writer" → scout and writer per chunk.
- 17:01: "why would we keep the history as old messy format?" → the numbered history.
- 17:04 (page): "now we are doing a full garbage collection, but then like we will be doing only an incremental one where ... the coordinator does just a small rewrite".
- 17:23: "I really hope that the consolidated record is significantly smaller than before. Like that is a goal." → quoted whole in the writers' brief.
- 22:58: "Read the Overnight Run, 13 October. Skimmed the consolidated record and skill. All LGTM."

## 6. The check that nothing was lost

The record test (`record-test/README.md`, `questions.md`, `key.md`): ten scenarios, written by Fable from the old texts, put a reader in a worker's or the coordinator's role over 14 entries (F-53, 55, 58, 76, 78, 87, 94, 141, 145, 166, 175, 201; P-48, 60). Rubric: decision 0 to 2, sources 0 to 1. One fresh Opus reader per copy of the repository; graded blind.
- Run 1, the trial against the old texts: 27 and 27 (`grades.md`, Fable). The new lost scenario 7: F-58 had cut what its 14 errors are. One sentence restored; the re-run scored full (not blind).
- Run 2, the pilot (`55f1a1352`) against run 1's old answers: 29 against 28 (`grades-pilot.md`, Opus).
- Run 3, all chunks (`ab933086b`, FACTS and POSITIONS 200.6K): 30 against 28 (`grades-final.md`, Opus).
- Scenario 6 on `b67abe3d2`, F-201 replaced by its skill section: 3 of 3, not blind.

Limits: 14 entries of 308; one reader a copy; the old answers not re-run. "It found no other loss, which does not show that there is none" (draft, Part 4).

## 7. What the clarity rewrite of 2026-10-22 changed

- `b6f5268e1d` (09:32): "the fact as it stands now" became "what is established now, and under which conditions"; the test became "its evidence: the test that gates it, or its source, and whether it was observed, read in the code or inferred"; new: "A pointer that stays in an entry carries a few words on what it holds". `6becc28f95` (14:26): "by number and subject".
- Its writer's brief: "Keep each entry near 600 characters as a check, not a cap. Clarity comes first." (`record-clarity/writer.md:35`). No chunk budget.
- The curator heard the POSITIONS pilot (ten entries, 5.9K to 10.7K: "Most of the growth is the few words on each pointer and the conditions the checker restored", 002, 06:09). At 08:19: "The purpose of the Clarity rewrite added more additional context. So, yes, I understand the size increase. I think that's just the cost we are willing to pay for Clarity."
- FACTS, `09e1338df3^` to `e06bd068e7` (12:13, its last commit): 198 entries, 139.1K, to 208, 221.8K; median 595 to 984; over 600, 85 to 161.
- Growth by sentence class (`fa.py`): the rest +37.7K, pointers +12.6K, rows +12.1K, titles +7.9K, dates +3.6K, "Detail:" +3.2K, tests +2.3K, others +2.8K. Words on the kind of evidence: 13 to 69; a path named: 58 to 100; pointers: 408 to 525. Markers cannot split "the rest" further.
- An entry of the accepted form: F-48, 648 after October, split three ways and grown to 965: a title with the condition, each row with an example program, its test and outcome, a code line (`TypeAnalyzer.scala:539-546`), a gating test, "Detail:".

## 8. What was written down, and where

`record.md`'s "A consolidation" first appeared at `f6bc1aa753` (10-13 19:46), after the run. Each step of point 1 today:

- A trial on the largest entries, "default is to cut": nowhere. Nearest: "run a pilot of three or four entries first. Show their new texts to the curator as a page, each with its old text" (`record.md:92`, since 11-05), and "The record-landing workflow takes no pilot". A record test of a pilot before the rest: nowhere.
- The curator's goal quoted to each writer; the 145K measure: nowhere.
- "What an entry is": `record.md:14-59`; its six questions unchanged since `7b434aae52`. The examples stay in the draft, read "Before you write or check the first entries of a consolidation" (`:59`). The landing writer reads "What an entry is" and "The pass" (`record-landing/entries.md:20`).
- Chunks: "Split each section into chunks of 20 to 32 entries" (`:93`).
- A scout per chunk: `:94`. The landing has a script instead (`record-landing-workflow.md:165`).
- A writer per chunk, apply and check in its worktree: `:95`. The coordinator applies, checks, commits: `:96`.
- The chunk budget: in no version of `record.md` (rules-text-history.md, 1c). Instead: "Keep an entry near 600 characters. This is a check, not a cap, and no reason to split" (`:31`); "Name that reason in the pass's report" cut at `f6bc1aa753`; the pass's step 5, "Report each entry over 600 characters, with the question that keeps its extra sentence" (`:84`), to no named reader. Landing: "An entry already past 600 characters grows only by the clause that its change owes" (`entries.md:38`).
- Name the cut text's home: `record.md:65`, `:78`.
- The record test: "a small quiz of decisions ... If something critical is lost, find the middle ground entry by entry" (`:98`). No skill or README names the kit; the landing's files hold no quiz (grep).
- Per-entry checkers: `:97`; October ran none.
- Entries moved to skills: question 5 (`:40`); the move was one time.
