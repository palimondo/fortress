<!-- The record-landing workflow traced stage by stage, for the curator and the coordinator, written 2026-11-24 by an Opus worker, reading only: what it does to a FACTS entry and where an entry that the record rule would shorten stays long; twelve entries traced through the runs of climb batches 34b, 35b and 36; every check by what it can fail; the rule set against the briefs; today's run's time and tokens by stage. -->

# The record-landing workflow, traced: why a long entry stays long

Sizes are characters. "Shown": a file shows it; "inference": I conclude it. Bare paths are in `explorations/coordinator/tools/record-landing/`; a run's files in `explorations/compile-ladder/climb-batch-<N>/record-landing/`.

## The answer in short

The workflow was not built to consolidate. Its README says it does the landing's record work "which the coordinator did by hand ... until climb batch 24", and its design leaves consolidation to the clarity workflow: "The landing workflow can name entries for it, and does not do its job." On 11-02 `record.md` gave it that job all the same (shown).

Inside a run, the draft is the baseline. The writer may grow a long entry only "by the clause that its change owes"; `lengths.py` and the judge measure growth from the draft; no brief or check asks an entry to come down toward 600 (shown). In the three runs traced, all 44 entries that the batches added or changed were long before and after the run, 84,660 characters before and 84,573 after (shown).

Then, by entries explained (shown): the sorter weighs the pass by meaning, so 15 of the 44 got weight "none" and no rewrite, and a writer moves only the detail that a "past 600" ground names; every fix of a cold-read flag adds words; the checker fails a cut as "less than its ground", and passes a long entry once a question is named; a hold keeps the whole draft, a cut included. Outside the runs, 115 of FACTS's 299 long entries were never in any run's reach. In twelve traced entries, questions 3 to 5 move about a fifth of the text; the rest needs a consolidation's other tools: a pilot read by the curator, merges, moves to the skills (inference).

## Terms

- **Run**: one launch of the workflow after a batch lands.
- **AT**: the commit that the run's worktree starts from. FACTS at AT holds the batch's draft entries.
- **Draft**: an entry as the batch's rung worker and its gather (the stage that folds a rung's work onto `main`) wrote it.
- **Change**: one line of `owed.md`, the sorter's list: a kind, a weight and a ground (the source that shows it is owed).
- **Owed clause**: the text that a change needs.
- **Hold**: the judge's verdict that keeps an entry's text as at AT.
- **Long**: over 600.

## 1. What the workflow was built to do, in its design's words

- **The practice it encodes** is the hand route of climb batch 24's landing, not the consolidation of 10-13: "`record-landing.js` does the record's work after a landing, which the coordinator did by hand through a record writer and a routing worker until climb batch 24" (`README.md:5`).
- **Form is another tool's job**: "The clarity workflow's job is form, with the meaning kept. The landing's job is mostly content" (`process-engineering/record-landing-workflow.md:138`); "The clarity workflow stays the tool for a consolidation, when entries drift. The landing workflow can name entries for it, and does not do its job." (`:143`).
- **The pass on drafts** came in as a default: every entry the batch added or changed, "since the rungs' entries are drafts by the worker skill's rule" (`:326`).
- **Length**: "An entry grows only by what its change needs. The judge holds growth that no question keeps." (`:291`). The replay added: "an entry already past 600 characters that grows is held unless the owed clause alone explains the growth" (`process-engineering/record-landing-replay-24.md:270`), built as `lengths.py` and `judge.md:24` (`575d555945`).
- **History and report**: "Only how the fact came about goes to the history" (`entries.md:36`), and the entry keeps "the commit or the code state that bounds a one-time measurement".
- **Left out**: "the record test's quiz" (`record-landing-workflow.md:312`, no reason given) and the pilot, "since it lands with no step of yours" (`record.md:92`), though the design says "Only the curator's read of a small pilot caught length, register, history in an entry and the wrong home" (`record-landing-workflow.md:76`).
- **The rule moved onto it**: `5114bfeceb` (11-02 22:03) replaced "Run it on FACTS before each batch launches" with "After a batch lands, the record-landing workflow consolidates its entries" (`record.md:90`), 22 hours after the design said it does not (shown).

## 2. The path of an entry through one run

1. **Evidence** (`evidence.py`). Reach: "each FACTS and POSITIONS entry that the range added, changed or removed" (`:12`), with its size (`:249-250`). Out: `entries.md`. An entry the batch did not touch is out of reach.
2. **Sorter** (`sort.md`, Opus). "Each entry that the batch added or changed gets one change of kind "the pass"" (`:40`). The kind "past 600 characters" (`:31`) has no rule for its use. Weight: "high, a reader would act otherwise; low, wording or a pointer; none, no change" (`:32`). Out: `owed.md`.
3. **Entries writer** (`entries.md`, a headless Opus stream). In: `owed.md`, the evidence, `record.md` "What an entry is" and "The pass" (`:20`), the clarity writer's "How to write each entry" (`:21`). Words: "so that it says no more and no less than its ground" (`:15`); "An entry that the pass finds right: no line for it, and "keep"" (`:32`); "An entry already past 600 characters grows only by the clause that its change owes. Before you add the clause, move other detail out" (`:38`); the report names "the question ... that keeps each sentence past the 600" (`:48`). Standing order: "A rewrite of existing text is never longer than the text it replaces" (`skill-writer-brief.md:32`). Clarity brief: "Clarity comes first." (`record-clarity/writer.md:36`). Out: `record.apply`, `clean.txt`, `entries-report.md`. It cannot run `record.py` (`README.md:26`).
4. **Mechanical checks** (`checks.sh 1`). Applies the file to AT; runs `record.py check` (`SIZE = 600 ... reported, never refused`, `record.py:126`), the ledger, INDEX, PLAN and queue checks, and `lengths.py`: "An entry already over 600 at AT that grew is marked "grew past 600" ... Information only; exit 0." (`lengths.py:6-8`). Out: `mech-1.md`. Every measure starts from AT, the draft.
5. **Checker** (`check.md`, Opus). Fidelity: "The new text says no more and no less than its ground, keeps every condition" (`:26`). Form: "... A change that drops either fails form. ... A sentence past 600 characters stays only with the question that keeps it, named in `entries-report.md`, and an entry already past 600 grows only by the clause that its change owes." (`:27`). Out: `check.md`.
6. **Cold reader** (`record-clarity/coldread.md`, Opus, on `clean.txt` only). "Could not resolve: each word or phrase you could not understand or could read two ways" (`:11`). No word on length. Out: `cold-read.md`.
7. **Fix round** (same writer). "Fix each failure ... and each passage that the cold reader read two ways or could not resolve." (`entries.md:52`). Then `checks.sh 2` → `mech-2.md`.
8. **Judge** (`judge.md`, Opus). "Hold it when it says more or less than its ground ... Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth ... You do not rewrite a text" (`:24`). "A held entry keeps its text" (`:28`). In `diff.md`: "an entry kept as it stood, gets no line" (`:40`).
9. **`final.sh` and Land** run the same checks, which a long entry cannot fail. No stage after the judge reads an entry.

## 3. Twelve entries traced

Rule of choice, per run: the entries the batch added, lowest number first, two at most; then the entries it changed, by their growth in the batch's own commits, largest first, F-53 and F-240 aside (protected, `entries.md:30`). 34b added one, so a changed entry fills its place. "Movable": my marking of the text after the run by questions 3, 4, 5 and the status bullet (passages in the appendix); it leaves lists of rows and Detail pointers in place.

| run | entry | kind | at AT | after | movable | what the run did |
|---|---|---|---|---|---|---|
| 34b | F-396 | added | 1,639 | 1,946 | 464 | grew by the owed list of rows; applied |
| 34b | F-336 | changed, +693 in batch | 1,358 | 1,405 | 336 | cut restored by the checker; applied |
| 34b | F-390 | changed, +287 | 1,965 | 1,902 | 315 | cut restored; moved only what the ground named |
| 34b | F-34 | changed, +224 | 2,693 | 1,873 | 622 | ground named the history; −820 |
| 35b | F-403 | added | 1,454 | 1,943 | 451 | grew by owed clauses and glosses; applied |
| 35b | F-404 | added | 1,284 | 1,284 | 176 | cut −115, glosses +165, held: draft kept |
| 35b | F-375 | changed, +389 | 2,595 | 2,494 | 804 | one off-subject sentence cut |
| 35b | F-341 | changed, +287 | 2,559 | 2,559 | 476 | weight none: not touched |
| 36 | F-407 | added | 1,459 | 1,316 | 124 | source names cut |
| 36 | F-408 | added | 1,517 | 1,691 | 319 | owed parts and glosses added |
| 36 | F-405 | changed, +694 | 2,307 | 2,320 | 230 | owed row added |
| 36 | F-341 | changed, +382 | 2,941 | 2,699 | 421 | test list made a pattern; form failure answered with a question |
| | all twelve | | 23,771 | 23,432 | 4,738 | |

What the twelve show (shown; the appendix gives each):

- The reports keep length by a question: "Past 600, kept by question 1" (34b, F-396, F-390); "the tests (evidence, which an entry holds); the five Detail sections" (36, F-341).
- The writer moves only what a ground names: "I did not move more out, since C14 names only the run's account" (34b, F-390). The one large cut, F-34, had a ground that named the text.
- Added text passed as owed: "+307, under the owed list and title" (34b `diff.md:13`); "+489, under the owed clauses' 539" (35b `diff.md:8`).
- No check named any marked passage.

## 4. Every check, by what it can fail or hold on

- **`record.py check`**: fails a lost entry or a bad pointer. A long or grown entry is "reported, not failing".
- **`lengths.py`**: never fails. Names an entry long at AT that grew; not a new entry, nor one that stays long.
- **`words-subset.py`, the ledger, INDEX, PLAN and queue checks**: nothing on a FACTS entry's text.
- **Checker, coverage**: fails a long entry only where the sorter wrote a change that names text to move and the writer did not move it (34b, C14).
- **Checker, fidelity**: fails an unsupported claim, and a cut: "no less than its ground" (34b, C7, C13).
- **Checker, form**: fails growth past the owed clause, a long entry with no named question, status, history, and the drop of a bounding commit or of what a fact blocks. A named question settles the length failure.
- **Cold reader**: flags an unclear passage. Never length; it cannot see an unsupported claim.
- **Judge**: holds more or less than the ground, a failed check, and growth of a long entry beyond its owed clause; not a long entry that stays. A hold keeps the draft whole.

Counts (`check.md`, "Totals" or "Counts"; `cold-read.md`; the writers' "The fix round"; `mech-*.md`; `diff.md`, "Held"):

| | 34b | 35b | 36 |
|---|---|---|---|
| checker failures, all homes | 10 | 2 | 16 |
| of them fidelity / form / coverage / routing | 7 / 1 / 2 / 0 | 2 / 0 / 0 / 0 | 6 / 5 / 0 / 5 |
| failures in the entries' homes | 8 | 2 | 8 |
| fixed by adding or putting back text | 5 | 2 | 3 |
| fixed by a cut (beside a put-back) | 1 | 0 | 0 |
| fixed by naming a question, text left | 0 | 0 | 5 |
| other: a note reworded, P-164 held | 2 | 0 | 0 |
| cold-read flags | 46 | 40 | 75 |
| fixed, each by adding words | 5 | 11 | 9 |
| left as "old wording", "for a consolidation", "a candidate for a clarity pass" | 41 | 29 | 66 |
| `lengths.py` grown, rounds 1 / 2 / final | 9 / 10 / 9 | 6 / 7 / 5 | 11 / 13 / 13 |
| judge's holds (for length) | 1 (0) | 2 (2) | 0 |

The fix round raised the count of grown entries in each run.

## 5. The rule against the workflow, sentence by sentence

Lines are `record.md`'s (the coordinator skill's `references/`). The same in the workflow, with no gap: "An entry reads on its own" (:16; `entries.md:15`, the cold read); what a FACTS entry holds (:18; through `entries.md:20`, and the 36 sorter asks for missing parts, which adds text); a worker's choice said as such (:22; `check.md:26`); a handle to the history (:26; clarity writer step 5); Q3 (`entries.md:36`, `:44`; `check.md:27`); Q6 (the cold read, which adds glosses); step 1, step 2 and step 4 (`entries.md:44`, `check.md:27`); step 5 (`entries.md:48`: a report, not a cut); the check of each entry by step 3 (:97; the checker); provenance and apply (:96; `final.sh`). The rest:

| rule (`record.md`) | the workflow's counterpart | compares |
|---|---|---|
| "no words that it waits for the curator's review" (:23) | "no plan or status" (`check.md:27`); runs add "which the curator has not decided" (F-403, F-408), and the checker passes it | against (inference) |
| "A bare list of numbers goes to the history" (:25) | "Each pointer has a few words" (`check.md:27`) | less: nothing on lists |
| One claim; "look for an entry that already holds the claim, and move the text there" (:29) | none | none |
| A conclusion goes in the entry that owns its subject (:30) | none | none |
| "Keep an entry near 600 characters" (:31) | "grows only by the clause that its change owes" (`entries.md:38`); `lengths.py`; `judge.md:24` | less: bounds growth from the draft |
| Q1, Q2: keep a sentence | "the question ... that keeps each sentence past the 600" (`entries.md:48`, `check.md:27`) | against: a named question settles a length failure |
| Q4: line numbers, sites, timings to the report | "Before you add the clause, move other detail out" (`entries.md:38`) | less: only when a clause is added |
| Q5: said elsewhere, give its number | the same sentence | less |
| Six checks; keep, reword, reorganize, investigate (:43-57) | coverage, fidelity, form, routing (`check.md:25-28`) | less: no ownership, consistency, reorganize |
| Read the five worked examples (:59) | none | none |
| Step 3: "The cited report section holds what the entry left out" (:80) | "no more and no less than its ground" (`check.md:26`) | against: a cut fails as "less" |
| "the record-landing workflow consolidates its entries" (:90) | "does not do its job" (`record-landing-workflow.md:143`); reach: the batch's entries (`evidence.py:12`) | against |
| A pilot read by the curator (:92) | "takes no pilot" (:92) | none |
| Chunks of 20 to 32 (:93) | one writer for the whole batch | less |
| The writer reads "this part" (:95) | "What an entry is" and "The pass" only (`entries.md:20`) | less |
| A quiz of decisions (:98) | "the record test's quiz" left out (`record-landing-workflow.md:312`) | none |

The workers' side, against the same rule:

| rule | the workers' text | compares |
|---|---|---|
| Q4: a line number to the report | rung: "each a complete finding: ... its evidence (the file:line, the command with its output, the test)" (`climb-batch-workflow.js:623`) | against: the draft carries file:line |
| Q4 | "Put its detail in a section of your report: the file:line citations" (`fortress-repo` `records.md:82`) | same |
| The pass owns the final wording (:75) | "Spend no effort on the entry's wording: it is rewritten to the record's form after your work." (`records.md:82`); the rung: "the record pass owns the final wording" (`:623`) | same in words; the pass keeps the draft's length |
| Near 600 (:31) | "in a few lines" (rung `:623`, gather `:1045`); no number | less |
| The commit stage runs the pass, quoted (:73) | commit stage: "record.py check --base ... prints 0 failures" (`:1622`); no quote | none |

## 6. Where today's run's time and tokens go

Run `wf_b580ea72-15e`, 07:23:44 to 09:12:15 UTC. Tokens written (input plus cache creation) by `spend.py`'s method, per transcript, the headless streams' own sessions included.

| stage | minutes | written | what it concerns |
|---|---|---|---|
| Sort | 16.6 | 412K | all homes; 39 of its 93 changes are FACTS entries |
| Write: driver, entries stream, routing stream | 12.3 | 70K + 242K + 210K | entries; PLAN and queue |
| Check: checker, cold reader | 11.2 | 296K + 98K | all homes; entries |
| Fix: driver and both streams | 1.8 | 69K + 45K + 25K | |
| Judge | 7.3 | 224K | all homes |
| Land | 0.8 | 80K | |
| Record stages | 49.8 | 1.77M | |
| Orientation update, 12 agents and its stream | 38.1 | 1.47M | the skill's revival part |
| Skill update, its cold read and fixes | 7.2 | 0.26M | `fortress-repo` |
| Page | 12.3 | 0.34M | the skill's change page |
| Push; revival page (stopped, exit 2) | 1.1 | 0.14M | |
| Total | 108.5 | 3.98M | |

- FACTS entries: the entries stream (287K), the cold read (98K) and 42% of the sort, check and judge by their count of changes (about 390K): about 0.78M, a fifth (estimate).
- PLAN, the queue, INDEX: about 0.6M by the same split (estimate).
- The orientation update, the skill update, the pages, the pushes: 2.21M, 56%, 59 of the 108 minutes (shown).

## 7. The answer: where an entry that the rule would shorten stays long

By how many entries each explains; places 8 to 10 bear on every entry, but act through place 2.

1. **No owner of the consolidation (shown).** The design leaves it to the clarity workflow (`record-landing-workflow.md:143`); `record.md:90` gives it to this one; the coordinator ran none (`REPORT.md`, 4 (k)). The run's reach is the batch's entries (`evidence.py:12`): 115 of the 299 long entries at `69750f4c24` were never in any run's reach.
2. **The draft is the baseline (shown).** `entries.md:38`, `check.md:27`, `judge.md:24`, `lengths.py` and `skill-writer-brief.md:32` bound growth from AT; nothing asks a long entry to shrink. All 44 batch entries of the three runs stayed long; their total fell 0.1%. "It is rewritten to the record's form after your work" (`records.md:82`) becomes "no longer than the draft".
3. **The sorter weighs the pass by meaning (shown).** Weight has no slot for form (`sort.md:32`), and "past 600" has no rule (`:31`): 4 of 10, 0 of 10, 9 of 24 entries. Fifteen of 44 passes got weight none (6 on F-53 and F-240), so no writer touched them.
4. **A named question passes a long entry (shown).** `entries.md:48` and `check.md:27` make Q1 and Q2 labels: in 36, five form failures were met by naming questions, no text cut. Q4 and Q5 apply only "before you add the clause" (`entries.md:38`).
5. **The cold read and the fix add words (shown).** All 25 cold-read fixes added words; grown entries rose from round 1 to round 2 in each run.
6. **"No less than its ground" fails a cut (shown).** `entries.md:15`, `check.md:26`; step 3 of the pass asks only that the report hold what the entry left out. In 34b cuts in F-336 and F-390 were put back.
7. **A hold keeps the whole draft (shown).** `judge.md:28`: F-404's owed cut of 115 was lost with its glosses (35b). The judge nets cuts against additions ("+174, within its owed clauses once the restated rule (-205) went", 36 `diff.md:16`).
8. **No pilot, no worked examples, no quiz** (the texts shown; the effect an inference). The design names the pilot as the one check that caught length (`record-landing-workflow.md:76`).
9. **The batch writes the detail in (shown).** The rung's prompt asks for "the file:line" in its record lines (`climb-batch-workflow.js:623`); no batch stage reads 600.
10. **The questions alone are not enough (inference).** In the twelve entries, questions 3 to 5 and the status bullet move 4,738 of 23,432 characters, 20%, leaving 1,069 to 2,278 each. The rest is what `record.md:18` asks for: conditions, rows, tests, Detail. The 10-13 consolidation also merged entries and moved 76K of FACTS and POSITIONS to the skills (`rules-text-history.md`, "8b"); no brief here asks for either.

## Appendix: the twelve entries traced

Each entry: its length at AT and after (`git show <AT>:explorations/coordinator/FACTS.md` and the run's commit 1: 34b `00bde0ee4` and `b5a4765829`; 35b `9d5d21bf5` and `96cd5ade28`; 36 `99035e231` and `69750f4c24`); the sorter's changes (`owed.md`); the writer (`entries-report.md`); the checks; then the passages after the run that a question would move, each "[Q3]", "[Q4]", "[Q5]" or "[status]" (`record.md:23`), with the stage that kept it. "Kept by the ground" means no change of `owed.md` named it, so the writer left it (`entries.md:32`), no check names an unchanged long passage, and the judge applied (`judge.md:24`).

### 34b, F-396, added: 1,639 → 1,946

- Sorter: C15 the pass, low ("leaves out" four rows of the review's list); C16 past 600, low: "the two sets' build and class path can go to rung C's report".
- Writer: the stamp, `bin/fortress_classpath:27-39` and `classesFirst` to the report; the departures list from four rows to seven; title narrowed. "It grew by the three rows that C15 owes, after the build detail moved out. Past 600, kept by question 1".
- Checks: C15 fidelity fail (title), fixed by a longer title; C16 pass; cold read 4 flags, "the export rule" → "the export check's rule"; `lengths.py` +232 (round 1), +307 (final); judge: "+307, under the owed list and title".
- After, marked: "(`OneLibraryJUTest.java:44`)", "(`NamingCzar.java:637-655`)", "(`Library/FlatString.fss:32`)" [Q4], kept by the ground; "a helper's raise names its exception by its simple name, which each set's `LibraryNames` maps to its library's class" [Q5: F-336], kept by the ground; "which the export check's rule decides as much as the code generator" [Q5: row 1098's notes], added by the writer under C15, applied as owed; the departures of rows 1101, 1102, 1103 [Q4: a list of sites, my reading], added under C15, applied as owed.

### 34b, F-336, changed: 1,358 → 1,405

- Sorter: C7 the pass, low (the title claims more than the body); C8 past 600, low: "the two libraries' constructor lookup and the fallback can share one sentence".
- Writer: lookups in one sentence; the two `String` class names to the report; title narrowed.
- Checks: C7 fidelity fail on the writer's new row-1103 sentence: "restore the old clause"; the fix put it back. C8 pass ("grew by 21, less than the title that C7 owes"). Cold read 4 flags; the fix added "the exception's simple name, which the helper passes" and each list's library. Judge: "+47, under the owed title's +53".
- After, marked: "`Utility.makeFortressException(name, msg)`, and `(name, e)` through it", "It passes the message as an `FJavaString` ...", "(`compiler/runtimeValues/Utility.java:34-52`)" [Q4], kept by the ground; "under walk a helper's raise still becomes the library's object of the same name, without the message (F-299)" [Q5: F-299], kept by the ground.

### 34b, F-390, changed: 1,965 → 1,902

- Sorter: C13 the pass, low ("the run sentence holds"); C14 past 600, low: "the run's account (the verifier off and on) can shorten to the wall and its row".
- Writer, round 1: cut the index agreement with `init`; kept the read-back. Checker: C13 fidelity fail ("the rewrite cut its claim that the indices agree with `init`"), C14 coverage fail; the fix put the agreement back and cut the read-back. Writer: "I did not move more out, since C14 names only the run's account"; alternative named: "move `CodeGen.evalVarargsArgs`, `emitVarargsArray` and `OverloadSet.VarargsExpansion` to the report (question 4), which would cut about 120 characters more". Cold read 4 flags, none fixed. Judge applied.
- After, marked: "(`NamingCzar.varargsParamType`)", "(`CodeGen.evalVarargsArgs`, `emitVarargsArray`)", the sentence on `OverloadSet.VarargsExpansion` [Q4], kept by the ground although the writer named them; "since the one library's `ZZ32` is `FZZ32` in every descriptor (F-388, F-396)" [Q5: F-388], put back by the checker's fidelity rule; "`reviews/batch-33b-review.md`, section 2, G.worker.1" [Q3: a batch's handle], kept by the ground.

### 34b, F-34, changed: 2,693 → 1,873

- Sorter: C1 the pass; C2 made false, high (a gated test now checks the count); C3 past 600, low: "`ba3c7c876d`'s count of 1 and the patch's story ... can go to the history".
- Writer: moved those to the history; named the gated test; "Past 600, kept by question 1: ... the command, which a worker who repeats the measure needs". Checker: C1 to C3 pass. Cold read 5 flags; one fixed by a longer phrase ("The test that checks this count of refused declarations"). Judge applied.
- After, marked: "The measure's setting is the distance stage's (F-53): ..." [Q5: F-53]; "as on `285efad802` with the patch" [Q3]; "(`Library/String.fss:67`, `:69`)", "(`OneLibraryJUTest.java:44`)" [Q4]; "`String`'s real compile ... (F-325)" [Q5: F-325]; "A declaration counts at its first wall, and some hold a second." [Q4]; the command and its patch note [Q4: a gated test now checks the fact]. All kept by the ground; the command kept by the writer's question 1.

### 35b, F-403, added: 1,454 → 1,943

- Sorter: C7 the pass, low: say that fork E1 is the planner's default; add E.reserved.1's default (the `AplCore` sentences). No past-600 change.
- Writer: line numbers to the report; the default and the `AplCore` sentences added; "Size: 1,454 to about 1,800". Checker: two fidelity fails, fixed by longer wording. Cold read 5 flags; two glosses added. `lengths.py` +362 (round 1), +489 (final). Judge: "+489, under the owed clauses' 539".
- After, marked: "(compiled under the one library, `=` of two booleans dies at its first call, row 994)" [Q5: row 994, F-396], added by the fix for the cold reader; the two error messages [Q4], kept by the ground; "which the curator has not decided", twice [status], added under C7, passed by the checker.

### 35b, F-404, added: 1,284 → 1,284

- Sorter: C8 the pass, low: the clause on the skill's sentence goes to the skill writer's list.
- Writer: cut it (1,284 → 1,169). Checker pass. Fix round, for 4 cold-read flags: `build-one` defined, "that first target", "It is a defect of the tool, so no ledger row holds it." (+165). Judge held: "no clause that it owes explains growth. It keeps the landed text". The cut was lost.
- After (the draft), marked: "(`build.xml:400-402`, `:469-470`)", "(`seed-worktree.sh:86-93`)" [Q4], kept by the ground; "and the skill's sentence that `ant compileAll` keeps the seeded caches without the script's warning does not hold" [Q5: the skill's part], kept by the hold.

### 35b, F-375, changed: 2,595 → 2,494

- Sorter: C5 the pass, low: the tuple clause misreads; the sentence on row 1122 is off subject.
- Writer: both done. "The sentences past 600 are the base's, kept by questions 1 and 2 ..., and the test and Detail lists by question 4's pointer." Checker pass ("It grows only by the tuple sentence, its test and its pointer"). Cold read 8 flags; none fixed ("left for a consolidation of these entries"). Judge applied.
- After, marked: "(`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed)", "`FTraitOrObject.enforceValueness`" [Q4]; "(row 550's pair at `ZZ64`, fixed since ...)" [Q3]; "the curator has decided none of them" [status]; "With the five number types merged with their objects ... old against new." [Q3: how the change was checked]; six of seven test names [Q4]. All kept by the ground.

### 35b, F-341, changed in the batch: 2,559, untouched

- Sorter: C4 the pass, weight none: "it grew 2,272 to 2,559 by that clause, its test and its pointer alone". Writer: "keep". Checker: "weight none: pass". Not in `clean.txt`, so no cold read. Not in `diff.md`.
- After, marked: twelve of thirteen test names [Q4]; "(fork L3)" [Q3: a batch's handle]; "(F-366; `tests/NumeralEqualsNumberWalk`)" [Q5: F-366]. All kept by the sorter's weight.

### 36, F-407, added: 1,459 → 1,316

- Sorter: C22 the pass, low: name the decision it builds (P-174, P-173); C31 past 600, low: the source names are the report's detail.
- Writer: decision added, source names cut, departures in plain words; "Past 600: each path's rule is question 1". Checker: both pass. Cold read 2 flags, left. Judge applied.
- After, marked: "(`interpreter/evaluator/values/Numerals.java`)" and two of five test names [Q4], kept by the ground.

### 36, F-408, added: 1,517 → 1,691

- Sorter: C23 the pass, high: say that the order by place is a plan's default; name P-45 and P-60; point to F-225 for the signature rule. C32 past 600, low, with no text named.
- Writer: all done; restated rule out (−205). Checker: C23 fidelity fail (the title claims too much), fixed by a longer title; C32 form fail (no question named), fixed by naming questions. Cold read 4 flags; three glosses added ("the component being checked"). `lengths.py` +61 (round 1), +174 (final). Judge: "+174, within its owed clauses once the restated rule (-205) went".
- After, marked: "that order is a default of a batch's plan, which the curator has not decided" [status], asked by the sorter; "The code generator casts `self` where the chosen declaration takes a listed type (F-377)." [Q5: F-377]; "no longer" [Q3]; four of five test names [Q4]. Kept by the sorter's ground and the judge.

### 36, F-405, changed: 2,307 → 2,320

- Sorter: C20 the pass, high: add row 1139 (a set walk loads that the Meet Rule refuses). C25 past 600, low: the key's mechanism and `methodPairValid`'s reading are the report's detail.
- Writer: those moved out, row 1139 added; "F-405 stays about 630 characters over its base. Alternative: move the departures of rows 1126, 744 and 1123 to a pointer list; I kept them". Checker: both pass. Cold read 5 flags; two rewordings. Judge applied, +13. In 35b this entry was held at 1,613; batch 36's commits took it to 2,307 (`df5948e7b`).
- After, marked: "(`interpreter/evaluator/values/Constructor.java`, `genericKey`)", "with the method's own static parameters in the bounds compared by position, not by name", three of four test names [Q4], kept by the ground and by the fix's rewording.

### 36, F-341, changed: 2,941 → 2,699

- Sorter: C11 the pass, low; C26 past 600, low: "the test list of eighteen files and five Detail sections carry most of it".
- Writer: eight test names to a pattern. Checker: C11 pass; C26 form fail: "names no question for the text it keeps past 600". The fix named questions: "the tests (evidence, which an entry holds); the five Detail sections (each holds one part's mechanism)"; no text cut. Cold read 4 flags, left. Judge applied (−242).
- After, marked: ten test names and the pattern [Q4]; "(fork L3)" [Q3]; "(F-366; `tests/NumeralEqualsNumberWalk`)" [Q5]. Kept by the fix round's named questions and the judge.
