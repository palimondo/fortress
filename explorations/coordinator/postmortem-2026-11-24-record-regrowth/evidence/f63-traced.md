<!-- The trace of FACTS entry F-63 from the rung that produced it to its text of today, its judgement by the record's own definitions and checks, a sample of 40 FACTS entries read by the same measure, and the instructions that write a FACTS entry today; evidence for the post-mortem of the record's regrowth, written 2026-11-24 by an Opus worker at the curator's questions, reading only, on `main` at `d52210a046`. Nothing here proposes a fix. -->

# F-63 traced: where it came from, what it is, how common it is

## In short

1. F-63 was written on 2026-09-22 by the gather agent of climb batch 3, for rung L, a rung that repaired five defects that the compiled checker found in the one library's api files; the rung's brief asked for "the FACTS.md line or lines this rung earns", and the gather put each line in as "one bullet".
2. Its first title was "Rung L of climb batch 3 repaired the interpreter library's five plain api defects ...": it reported one rung's work, not one property of the tree.
3. Eleven rewrites from 2026-09-24 to 10-13 removed the repairs that later work replaced and gave the bullet a title that lists what still stands, but none of them split it.
4. Of its eleven history blocks, one is the numbering, one cuts it to the form, one corrects its evidence, and eight only move two line numbers.
5. The numbering block names none of its nine earlier texts: the numbering script linked old texts by title, and the title had changed that morning, so only git links F-63 to rung L's first text.
6. Its four statements (`String`'s `split` pair, `List`'s missing `zip`, `Condition.map`'s return type, `QQ`'s `comprises { ... }`) share only that each is an api line that rung L changed; each answers its own question, and they changed apart.
7. By the record's six checks it fails ownership, present meaning and comprehension, and its evidence is in part unresolved.
8. Three of its statements are notes on a past repair or on a worker's choice; only the `QQ` sentence bears on an open defect, row 354, through F-64.
9. No FACTS or POSITIONS entry, PLAN item, review-queue item, skill or batch brief cites it; one later probe used its `Condition.map` sentence as a precedent, one audit used its `zip` sentence, and the batches since have only moved its line numbers.
10. In a sample of 40 entries, 2 are of F-63's kind (F-83, F-374), and a third (F-281) adds claims on other subjects from its rung; but 38 of the 40 hold two or more claims that answer different questions, and 24 carry a defect beside the property that their title states.
11. Today the batch brief asks each rung for "The FACTS.md entry the rung earns", the gather adds it "after the section's last entry", and the record-landing workflow rewrites each entry that it is given as one new line.
12. Only the coordinator skill's `record.md` asks the writer to split an entry by question and to look first for the entry that owns the claim; no brief of a rung, of the gather, of the commit stage or of the record-landing sorter or checker asks for either, and the landing's entries writer meets that rule only by a reference, with one new line per entry as its output.

## 1. F-63 and its history

### 1.1 The entry today

`explorations/coordinator/tools/facts-extract.sh 'F-63'` prints `FACTS.md:68`, in section "The checker and the one library", 1,265 characters:

> - F-63 **The one library's api declares `String`'s `split` and `splitWithOffsets` once, abstract; redeclares no `zip` in `List`, where the inherited `ZeroIndexed.zip` serves; has `Condition.map` return `Condition[\G\]`, the component's type; and closes `QQ` by `comprises { ... }`.** `Condition` is the sequential generator trait at `Library/FortressLibrary.fsi:1008`. In their earlier forms, the pair declared twice and `List`'s `zip[\F\](other: List[\F\])`, the checker refused the api (measured). The other repairs tried, the plain pair kept once and a `zip` narrowed to `ZeroIndexed`, read the same count; the forms kept follow the specification's export rules (the report's Decisions). The `Condition.map` error was seen only under a checker change that did not land; otherwise it is read from the export check's comparison of return types, and no test gates that edit. `QQ`'s clause lists no type, since its one value type `Ratio` is private to the component, and an api may leave out a private type only by `...` (`Library/FortressLibrary.fsi:397`). No api-declared type extends `QQ`, so F-64's refusal, which falls on such a type, does not arise. Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Summary", "Decisions" and "Defects and their homes".

The four forms hold in today's tree: `Library/FortressLibrary.fsi:2628-2629` (`abstract splitWithOffsets()`, `abstract split()`), no `zip` in `Library/List.fsi` (grep prints nothing), `Library/FortressLibrary.fsi:1028` (`map[\G\](f: E->G): Condition[\G\]`, inside `trait Condition` at `:1008`), and `:397` (`comprises { ... }` of `trait QQ` at `:394`).

`facts-extract.sh 'F-63+'`: "points to 1 (F-64), pointed to by 0 (none)".

This text is the one that `d52210a046` (2026-11-24 13:54) restored. Chunk checker-2 of today's consolidation had rewritten it at 13:48 (`8b547a2276`, with a twelfth history block); the restore took out both. The pilot that the curator read showed this text as F-63's "Old text" (`postmortem-2026-11-24-record-regrowth/pilot/pilot.md:133-162`, commit `92056a787e`).

### 1.2 The work that produced it: rung L of climb batch 3

- **The batch's brief.** `explorations/coordinator/CLIMB-BATCH-3.md` (commits `f27e82510c`, `a48f9b8b7b`, `0839428f11`), section "L. The library's five plain defects", `:89-103`. It names five api defects with their sites (`:95-99`) and leaves the choices to the rung: for `String`'s pair, "One pair goes; which one is the rung's call" (`:96`); for `List.zip`, "The rung decides between narrowing the api's return type and dropping the redundant declaration" (`:97`); for `Condition.map`, "the api is the wrong one" and the error is "invisible on this rung's own branch" (`:98`); for `QQ`, "`comprises { ... }` → `comprises { AnyIntegral }`" (`:99`). Its test is the gate's count stage, 93 errors before and 102 after (`:101`).
- **What the brief asked to be recorded.** The rung's prompt is the workflow script, in the last version before the gather's commit, `d610695c0c` (`git show d610695c0c:explorations/coordinator/climb-batch-workflow.js`). At `:472`: "record.md - the record lines the coordinator will fold at merge time: the FACTS.md line or lines this rung earns, the ledger note (which row, and exactly what to append ...), and the handover state line. Write them as finished prose, ready to paste." At `:475` the rung may not edit FACTS itself.
- **The run.** Workflow run `wf_776d7c2c-6c3`, its worker, skeptic, gather, review and gate agents on Opus (`:38` of that script). The harness refused the worker its `REPORT.md` and `record.md`; it returned them in its structured result (`rung-library-defects/REPORT.md:9`, `:22`). Its result held two FACTS lines (`REPORT.md:102`, `:103`). The first: "Rung L (batch 3) repaired the interpreter library's five plain api defects in Library/{RangeInternals,List,FortressLibrary}.fsi. The count stage reads 93 -> 103 on its own branch ..., not the record's 102, because QQ reads comprises { AnyIntegral, ... } ...". The second is the checker's refusal of a listed `comprises` type, which became row 354 and today's F-64.
- **The rung's report.** `REPORT.md` was "Written at the landing of climb batch 3 (2026-09-23) from the worker's structured result in run `wf_776d7c2c-6c3` (`rung:L`)" (`REPORT.md:9`), by the coordinating session, commit `02c89bd797`. Its "Defects and their homes" gives each of the five repairs as "home 1, repaired" (`:62-66`); the defects left open went to rows 354 to 358 (`rung-library-defects/record.md:22-34`).
- **The batch's landing report.** `explorations/compile-ladder/climb-batch-3/RECORD.md`, "Rung L" (`:9-23`) and "The landing" (`:122-`), written by the gather and at the landing. It records the curator's "Finish" of 2026-09-23 on the count: "declare 103 and keep `comprises { AnyIntegral, ... }`" (`:13`; also `CLIMB-BATCH-3.md:67`).

### 1.3 Who wrote the first text, by which instruction

- The gather agent of run `wf_776d7c2c-6c3` (label `gather`, Opus: `d610695c0c` script `:1280`) composed rung L's `record.md` "from the worker's and the skeptic's structured results, because neither agent wrote this file" (`rung-library-defects/record.md:9`), and folded its FACTS line into `FACTS.md` in commit `a7ced6764e` (2026-09-22 23:57).
- Its instruction, gather step 2 of the same script, `:776`: "Fold its record: explorations/compile-ladder/<slug>/record.md (now in the tree) carries finished prose for three places. The FACTS.md line goes into explorations/coordinator/FACTS.md under "The compile-path ladder baseline", after the last rung entry, as one bullet with its source."
- The first text, 1,486 characters at `a7ced6764e`, opens: "**Rung L of climb batch 3 repaired the interpreter library's five plain api defects in `Library/RangeInternals.fsi`, `List.fsi` and `FortressLibrary.fsi`, and the checker count reads 93 → 103 on its own branch, not the batch record's 102**". `rung-library-defects/record.md:19` keeps it as it stood after two additions:
  - `763ba87bcc` (2026-09-23 01:14, the merged-diff review's repair on the judge's ruling): the sentence that the `Condition.map` edit "is the one edit of the batch with no gate on the merged tree", 2,589 characters.
  - `1f01052bda` (2026-09-23 04:37, the coordinator's landing): "Landed as `a7ced6764`. On 2026-09-23 Pavol declared 103 and kept the ellipsis ("Finish" ...)", 2,814 characters.
- The section it went into, "The compile-path ladder baseline", held one bullet per rung, in landing order (`2f105225a8`'s message: "the sections regrouped by area instead of by event").

FACTS has been at `explorations/coordinator/FACTS.md` since `8ab10d9de3` (2026-09-15), before rung L, so no other file held this entry. `git log -S` on today's first words, "split` pair once", in `FACTS.md` gives `4feafe6fae` (2026-10-13 03:26) and `bb39dbee3c`; on the first text's words, "five plain api defects", it gives `a7ced6764e` and `2f105225a8`.

### 1.4 The rewrites before the numbering

Each commit below changed the entry's line (found by hashing the line that names `Condition.map` at every commit that touched `FACTS.md`; `e2f1aa7e8b` and `d11dfaf43b`, a branch and its merge, only repeat the texts of `ea0cd10384` and `77f194180b`). The reasons are the history's comment lines of that time (`git show a74f5a2b7:explorations/coordinator/FACTS-history.md`).

| Commit, date | What changed |
|---|---|
| `2f105225a8`, 09-24 | "Gardened" on the curator's request: condensed to "Rung L repaired five api defects of the interpreter's library: ..." (935 characters), no bold title, moved to "The checker and the one library"; full text to the history (hist. `:338-339`). |
| `f0958b4db1`, 09-27 | Consolidation: `QQ`'s clause told as "api clause left out" after the flat tower (`d846e3644c`, 09-27); lines re-read (hist. `:474-475`). |
| `1e191c2448`, 09-28 | Line numbers only. |
| `bde85de0ea`, 09-28 | The range bounds that it added, "removed with the parameters by climb batch 7R's rung J" (hist. `:666`). |
| `4a403cdb7f`, 09-28 | "what that stage now shows of `Condition.map`" (hist. `:718`). |
| `5374b3dc32`, 09-29 | "what stands of rung L's five repairs stated first, the two later rungs replaced told as the present" (hist. `:993`). |
| `ea0cd10384`, 09-29 | "keeps its opening words as its title" (commit message). |
| `77f194180b`, 09-30 | "rewritten timeless under the same title" (hist. `:1219`). |
| `d4ddb06c4e`, 10-02 | "shortened in place under the same title to the fact, its source and its test" (hist. `:1623`). |
| `92c4bb1ae6`, 10-03 | Line numbers only, "re-read on the landed tree". |
| `4feafe6fae`, 10-13 03:26 | Consolidation slice 2: "given a bold title for its three repairs that stand, its opening words "Rung L repaired five api defects" cited by no live file; the repair replaced ... cut, and `QQ`'s clause stated as it is" (hist. `:2616`); `process-engineering/facts-slice-2.md:46`, item 12, "rung L's repairs, given a bold title for the three repairs that stand". |

The pre-numbering history keeps nine earlier texts of the entry (`a74f5a2b7`'s `FACTS-history.md`, lines 339, 475, 667, 719, 994, 1220, 1624, 1944, 2617).

### 1.5 The eleven history blocks

`facts-extract.sh 'history:F-63'`. Each block holds the line as it stood before the change; the "after" is the next block's line, or today's text.

| # | History line | Time (UTC) | By | What changed | Commit that made it |
|---|---|---|---|---|---|
| 1 | `:225` | 10-13 17:58 | `record-number.py` | The line got its number. The block names no earlier texts. | `a88e52bf78` (the block names the tool's commit `a74f5a2b7`) |
| 2 | `:863` | 10-13 18:16 | consolidation chunk F2b | "cut to the form": line numbers, the override reason ("an overriding declaration's return type must be a subtype ...") and "whether the count stage ... refuses it reverted is not measured" cut; row 354 told as "F-64's refusal"; Detail to `REPORT.md`, "What changed". The result said "Declared otherwise, each is an error of the checker on the api." | `55f1a1352d` (the block names `2f105225a`, the 09-24 gardening) |
| 3 | `:3449` | 10-22 12:03 | the clarity pass | "one correction of evidence": "each is an error" split into measured (pair, `zip`) and read (`Condition.map`, seen only under rung P's relaxation); "The other repairs tried ..." added; `QQ` put in the title; `Condition` named "the sequential generator trait at `:913`". Today's form. | `bb39dbee3c` (none named) |
| 4 | `:4271` | 10-23 17:27 | climb batch 21's merged-diff review | `:913` → `:915` | `bdf83c1d15` (none named) |
| 5 | `:4387` | 10-23 22:43 | climb batch 21b's gather | `:915` → `:933`; `:398` → `:399` | `031c38bbcf` (none named) |
| 6 | `:4477` | 10-24 03:37 | climb batch 22's gather | `:933` → `:934`; `:399` → `:400` | `8dd64e8fca` (none named) |
| 7 | `:6215` | 11-08 10:30 | climb batch 28 landing workflow | `:934` → `:1008`; `:400` → `:398` | `bec01c5788` (names the landing `f56d6516c`) |
| 8 | `:6761` | 11-09 11:00 | climb batch 29 landing workflow | `:1008` → `:1053`; `:398` → `:400` | `2db5619187` (names the landing `7daf51fe8`) |
| 9 | `:7129` | 11-10 02:26 | climb batch 29b landing workflow | `:1053` → `:1017`; `:400` → `:398` | `36e60805e6` (names the landing `a2be3e9e1`) |
| 10 | `:7589` | 11-16 06:44 | climb batch 32 landing workflow | `:1017` → `:1018`; `:398` → `:399` | `9683fef678` (names the landing `567c36dad`) |
| 11 | `:8336` | 11-17 10:04 | climb batch 31b's merged-diff review | `:1018` → `:1008`; `:399` → `:397` | `caa5363d72` (none named) |

- Eight of the eleven blocks (4 to 11) change only the line numbers of `trait Condition` and of `QQ`'s clause; the pilot found the same (`pilot.md:171`). Two of the eleven rewrites before the numbering were line numbers only too.
- Block 1 names no earlier text, though the old history holds nine. `record-number.py` links an old text that matches the entry "by title" (`explorations/coordinator/tools/record-number.py:6-7`) or shares a 60-character opening (`:44`, `OPENING = 60`). The title had changed at 03:26 the same day (`4feafe6fae`) and shares no opening with "Rung L repaired five api defects". For comparison, F-64's block names "earlier texts in its FACTS-history.md, lines 1223, 2620" (`FACTS-history.md`, `### F-64`). Read in the script's header, not run.
- Block 2's provenance names commit `2f105225a`, not the commit of the change. Chunk F2b's 22 blocks name 15 different commits (`grep 'by consolidation chunk F2b' FACTS-history.md`), which suggests that the field held a source commit, not the change's.

### 1.6 What the four statements have in common

- Each is a line of an api file of the one library (`Library/FortressLibrary.fsi`, `Library/List.fsi`) that the compiled checker refused in its 2012 form and that rung L changed on 2026-09-22 (`REPORT.md:34-40`, `:62-66`).
- Walk takes no notice of any of them: "the interpreter runs this library with ill-formed bounds, duplicated and covariant declarations and never reports them. ... it uses the component's declarations" (`REPORT.md:74`). So they matter only to the compiled checker.
- Three (`split`, `zip`, `Condition.map`) were chosen by the export rules, the api agreeing with its component (`REPORT.md:50-52`, citing `Specification/basic/components/source-code.tex:372-384`, `:399-404`). Other entries state that rule in general: F-297 ("The compiled export check asks the component to declare each member its api writes `abstract`, at the api's header"), and F-286, which lists `splitWithOffsets` and `split` among "every member that its component's trait leaves without a body" (`FACTS.md:131`, `:140`). `QQ`'s clause follows the rule on a component-private type (`source-code.tex:386-392`, `REPORT.md:49`).
- Beside the origin, nothing else joins them. Each answers its own question: which declaration of `String`'s `split` stays; whether `List` declares its own `zip`; what `Condition.map` returns; what `QQ`'s `comprises` lists. They changed apart: `QQ`'s clause twice after the rung (`{ AnyIntegral, ... }` at `REPORT.md:37`; `{ ... }` since `d846e3644c`, `pilot.md:162`); the reason for the abstract pair went stale on 10-30 (`cc47b637d8`, `pilot.md:160`); the cited line of `trait Condition` moved eight times after 10-22.
- The same work produced, as separate records, F-64 (row 354, the checker's refusal) and rows 355 to 358. Row 355 holds the same `zip` in `Library/PureList.fsi:75`, open (NEGATIVE-VERIFIED); row 357 holds `QQ`'s shape in `Library/IntMap.fsi`, open. F-63 names neither.

### 1.7 Who cites F-63, and what has been done with it

- **The record and the skills.** No FACTS entry points to it (`F-63+` above). A grep for `F-63` (not `F-63` followed by a digit) in `POSITIONS.md`, `PLAN.md`, `review-queue.md`, `HELD.md`, `BOOT.md`, every `CLIMB-BATCH-*.md` and `.claude/` prints nothing. `PLAN-history.md:2127` lists it among 22 entries whose cited lines climb batch 28 moved. `INDEX.md:698` names it in the pilot's line.
- **Work that used its content: two.** `perf-probes/condition-zeroindexed/REPORT.md` (2026-10-23, `2c12a0ee9f`): "The revival already gave the api's `Condition.map` the component's `Condition[\G\]` (F-63)" (`:12`), "**F-63:** the result-type precedent" (`:93`), and its chosen way follows "F-63's precedent" (`:182`). `reviews/phase3-exit/zero-audit.md:176`: "`List`'s `zip[\F\](other: List[\F\])` removed. ... None: the inherited `ZeroIndexed.zip` answers (F-63)."
- **Work that moved its line numbers.** `compile-ladder/rung-export-align/REPORT.md:184`, `rung-export-last/REPORT.md:144`, `climb-batch-21/RECORD.md:272`, `climb-batch-21b/RECORD.md:111`, `:186`, `climb-batch-22/RECORD.md:32`, `:90`, `:175`, `:265`, `reviews/batch-22-review.md:168`, `reviews/batch-28-review.md:349`, `climb-batch-28/record-landing/entries-report.md:77`, `climb-batch-29b/record-landing/owed.md:46` ("C30 | home: F-63 | kind: stale | weight: low | ground: `Library/FortressLibrary.fsi:1053` now `:1017`").
- **The orientation workflow** refused it each time it changed: "F-63 (changed) | Not admitted | Only re-anchored ... The entry records repairs of the api's declarations. | The record. No skill home." (`climb-batch-21b/orientation/admission.md:38`; also `climb-batch-28/orientation/admission.md:49`).
- **The record-landing length check** listed it among the entries over 600 characters in each run from climb batch 25 to 36 (for example `climb-batch-36/record-landing/mech-final.md:108`).
- **The clarity run of 2026-10-22** judged it by the six checks: ownership "pass, with a note: the `QQ` clause is a fourth form of the api; the title could name it" (`consolidation-2026-10-22/evidence/facts/f4/assessment.md:24`). Its writer then put `QQ` in the title. It left one evidence gap, "does today's count stage refuse the api if `Condition.map` returns anything other than `Condition[\G\]`?" (`assessment.md:111`), "for the coordinator to place" (`f4/queue.md:11`). A grep for `Condition.map` in `review-queue.md`, `PLAN.md` and `HELD.md` prints nothing.

## 2. F-63 by the record's own definitions

### 2.1 A finding and a fact

`fortress-repo`'s `records.md:7`: "A finding is something that your work learned about the tree or the language, and that the record does not hold yet. Examples: a defect, a behaviour that departs from the specification ..., a measurement." `:9`: "A fact is a finding that is an established property of the tree, the language, the library or their tools, and that later work builds on. A defect also gets its ledger row, and a fact about it may cite the row."

- On 2026-09-22 each of the four statements was a finding of rung L: a defect of the api, measured (`split`, `zip`; `REPORT.md:32`) or read (`Condition.map`), with the rung's choice of repair.
- Each was repaired in the rung, "home 1, repaired" (`REPORT.md:62-66`), so none has a ledger row and none is open. What F-63 holds today is the state of four api lines after their repair.
- To the curator's question, "a defect about interpreters or one library's API?": neither an open defect nor walk's. They are four lines of the one library's api, which only the compiled checker reads (`REPORT.md:74`).

### 2.2 What an entry holds

`coordinator`'s `record.md:18`: "A FACTS entry holds ...: what is established now, and under which conditions; what it means for the work, such as what it blocks or which row or decision it bears on; its evidence ...; the decision it builds, by number and subject; and the report section that holds the detail."

F-63 has what is established now, its evidence and its report sections. What it means for the work is stated only for `QQ` ("No api-declared type extends `QQ`, so F-64's refusal ... does not arise"). It builds no decision. `record.md:29`: "An entry holds one claim that can be kept up to date on its own ... Split an entry when its claims answer different questions and change apart. Before you split, look for an entry that already holds the claim, and move the text there." F-63's claims answer four questions and changed apart (1.6).

### 2.3 The six checks

By `record.md:45-50`, on today's text.

| Check | Mark | The passage that fails, or why it passes |
|---|---|---|
| Scope | pass, with a note | The title and the text agree on the api lines, and each line holds in today's tree (1.1). Note: "In their earlier forms, ... the checker refused the api (measured)" does not say that the measurement was of 2026-09-22, on rung L's branch (`REPORT.md:32`). |
| Present meaning | **fail** | "The other repairs tried, the plain pair kept once and a `zip` narrowed to `ZeroIndexed`, read the same count" and "The `Condition.map` error was seen only under a checker change that did not land": "the same count" (103, on 2026-09-22) and "a checker change that did not land" (rung P) need batch 3 to read. |
| Evidence | **unresolved** | (a) "the forms kept follow the specification's export rules (the report's Decisions)": the report's reason for the abstract pair, that the component's `String` "defines neither method" (`REPORT.md:50`), is stale since `cc47b637d8` (`pilot.md:160`). (b) "no test gates that edit": stale in part; the count stage now runs through the export check and reads 0, and that it would refuse the earlier form is read, not measured (`pilot.md:161`). (c) "otherwise it is read from the export check's comparison of return types": the rung's record and the brief give the override rule as the error's ground (`rung-library-defects/record.md:19`, `traits.tex:525-531`; `CLIMB-BATCH-3.md:98`), while `REPORT.md:52` gives the export check as the reason to choose `Condition[\G\]` over `SequentialGenerator[\G\]`. The gap left on 10-22 (`assessment.md:111`) is not settled. The kinds of evidence are stated ("measured", "read"). |
| Comprehension | **fail** | "In their earlier forms", "The other repairs tried", "the same count", "a checker change that did not land", "the report's Decisions": referents that the entry does not give. The 10-22 cold reader could not resolve five passages of the text of that day (`f4/cold-read.md:164-169`). |
| Ownership | **fail** | "The one library's api declares `String`'s `split` and `splitWithOffsets` once, abstract; redeclares no `zip` in `List` ...; has `Condition.map` return `Condition[\G\]` ...; and closes `QQ` by `comprises { ... }`": four subjects in one title, and repair history in the text ("In their earlier forms ..."). The first subject is also held by F-286, which lists `splitWithOffsets` and `split` among `String`'s abstract members. |
| Consistency | pass, with a note | F-64 agrees on `QQ`; F-286 and F-297 agree on the abstract pair. F-63 and F-286 state the same claim and neither points to the other. |

By `record.md:52-57`, an unresolved evidence check gives "investigate", and an ownership fail asks for "reorganize: move detail out, merge the entry into its owner, or split it". This is what the rule yields, not a proposal.

### 2.4 Each statement's kind

1. **`String`'s `split` and `splitWithOffsets` once, abstract.** A note on a past repair (family D, `REPORT.md:63`). The present property is F-286's subject, and its general rule F-297's.
2. **No `zip` in `List`; `ZeroIndexed.zip` serves.** A note on a past repair (family F, `REPORT.md:64`) and a worker's decision: "List.zip is dropped, not narrowed" (`REPORT.md:51`). One later audit used it (1.7). The same `zip` stands in `PureList.fsi:75`, row 355, open, which F-63 does not name.
3. **`Condition.map` returns `Condition[\G\]`.** A worker's decision, against the triage's `SequentialGenerator[\G\]` (`REPORT.md:52`), and a past repair that no gate held at the landing (`climb-batch-3/RECORD.md:22`). One later probe took it as a precedent (1.7).
4. **`QQ` closed by `comprises { ... }`.** A property of today's api that bears on an open defect: it says why row 354's refusal (F-64) does not fall on `QQ`. Its form is not rung L's (`{ AnyIntegral, ... }`, `REPORT.md:37`), and the brief asked a third form (`{ AnyIntegral }`, `CLIMB-BATCH-3.md:99`). The same shape is open in `IntMap.fsi`, row 357, which F-63 does not name.

## 3. How common is it: a sample of 40

**Method.** `grep -n '^- F-' explorations/coordinator/FACTS.md` lists 339 entries. Every eighth, in file order, gives 42; the first 40 are taken (positions 8 to 320), leaving out F-300 and F-182. For each, a claim is a statement that answers a different question (a defect with its row counts as one); "one subject" means every claim is about one thing of the tree; "origin" means that two or more claims are on different subjects and only the rung that produced them joins them. Kinds: P, a property of the tree that later work builds on; D, a defect or departure (its rows); M, a count or measurement of one day; W, a worker's decision; R, the account of a repair. The marks are one reader's, with no second reader. The origin rung is the report in the entry's "Detail".

| Entry (line, chars) | Claims | What unites them | Kind |
|---|---|---|---|
| F-20 (14, 948) | 4: sizes are run-time values for shape checks; walk takes sizes from an array built at run time; `T[n]` does not unify (row 23); a mismatch is a `ProgramError` no `catch` takes (row 254) | one subject, sizes at run time | P, D |
| F-28 (22, 413) | 2: walk instantiates a generic returning `Any`; its visitor lacks 11 of 18 type classes | one subject | P (after row 157's fix) |
| F-351 (30, 1900) | 6: what a transaction records; what validation covers; what an abort names; the handler's acts; a nested commit; the exception-table order; open row 984 | one subject, the compiled transaction | P, D |
| F-35 (40, 1166) | 4: the 9 dead sizes; they check clean; the census of 2026-09-21; the export checker's comparison by length | one subject, the api's dead sizes | P, M |
| F-43 (48, 705) | 3: the overloading memo hides errors by build; it is on by default; the gate turns it off | one subject, the memo | D (no row cited; row 562, on this memo, is FIXED), P |
| F-51 (56, 623) | 2: a generic call converts a narrower argument; so the library's array-scalar operators take a `ZZ32` | one subject | P (after row 388's fix) |
| F-59 (64, 1582) | 5: the identity from the static argument; the checker's unwritten argument; the plain-bounded case; walk's rule; C4's one sum | one subject; four claims copied from F-364, F-221, F-228, F-285 | P |
| F-67 (72, 998) | 4: what a size is and size equality; no inferred `bool`; no compared `bool` (row 406); an unknown size refused | one subject, the checker's value parameters | P, D |
| F-75 (80, 1999) | 5: the two rules and their width; a worker chose the width; the 2011 paper's rule; tuples wrongly refused (row 1048); no pair refused in the library | one subject, the checker's return-type rules | P, W, D, M |
| F-83 (88, 1375) | 7: no site of the distance in the string components; the rung's repairs follow library forms; where `String` is declared; `String`'s and `FlatString`'s api headers; `rangeContains` (row 607); `[:b:c]` (row 609) | **origin** (`rung-string-slips`) | M, R, P, D |
| F-91 (96, 604) | 3: `narrowToRange` at the range kinds; checks named by rank (row 416); `(:)`'s cutting fails (P-56) | one subject, range narrowing | P, D |
| F-227 (104, 1536) | 5: the closed-trait rule; the union rule; the calls that now check; row 712; past accept and refuse, and walk (row 713) | one subject | P, D, R |
| F-242 (112, 1056) | 3: no site of the distance; how the `where` conditions and the inherited `distribute` cleared them; the team's text moves the errors | one subject, the fusion pairs' errors | R, M |
| F-256 (120, 2408) | 9: dotted-call applicability; size variables become static parameters; the solver's retry; refused at name binding; a type's own constraint; `comprises` variables; self-naming bounds; three cases not read (row 470); rows 777, 778; no move of the count | one subject, `where` constraints | P, D, M |
| F-281 (128, 1529) | 5: every operator's overloading checked; the export check reads every operator; on-demand imports and `except` (rows 813, 814); `selfComprised` (row 812); distance and count 0 | one subject, **plus claims on other subjects (imports, a self type) from the same rung** (`rung-symbolic-check`) | P, D, R, M |
| F-292 (136, 917) | 3: `ant testQuick` counts on rung B's tree; ten tests respelled; 23 `CompilerSystem` tests pass | one subject, the test tracks under `Any` | M, R |
| F-306 (144, 1307) | 4: 48 bindings name helpers; `ZZ64`'s wrapping helpers (row 348); `DivisionByZero`; a `ZZ` helper takes only a `ZZ` | one subject, walk's integer natives | R, P |
| F-314 (152, 1066) | 4: 18 helpers named; a shared Euclid; `nanoTime` read as `ZZ64` (row 75); `CHOOSE` keeps 1 (row 887) | one subject, walk's natives of this set | R, P, D |
| F-328 (160, 1004) | 2: walk maps two helper names to its own operations; walk's ilk names | one subject | P |
| F-338 (168, 585) | 1 | one subject | P |
| F-376 (176, 1165) | 2: the dispatcher's cast; none where the range is no static parameter (row 699) | one subject | P, D |
| F-408 (184, 1691) | 4: choice by declared signatures; order of places, departing from P-181 (rows 1136, 1143, 1145); tie rules; what changed for `QQ`'s calls | one subject, the checker's choice of declaration | P, D |
| F-103 (194, 749) | 2: one `.test` cannot hold compile-then-fail; an `XXX` compile test of a program that compiles is red | one subject | P |
| F-112 (202, 798) | 2: the corpora cite sections, not lines; one bare line left | one subject | P |
| F-383 (210, 587) | 2: walk's harness counts a pre-run static error as a refusal at load; a compiled refusal test stays `XXX` | one subject | P |
| F-123 (220, 1085) | 4: bare type name; a Java class's own `toString`; rows 321, 363; static arguments' rendering | one subject, default rendering | P, D |
| F-132 (228, 1227) | 3: walk's overflow rule; three exceptions; the compiled path's gaps (rows 453, 523-525) | one subject | P, D |
| F-140 (236, 1727) | 5: the checker's refusal; walk's refusal; walk reads exactly; the class loader checks none (row 675); rows 527, 962 | one subject, sizes past 32 bits | P, D |
| F-148 (244, 430) | 1 | one subject | P |
| F-253 (252, 2241) | 5: dotted-call inference; choice among overloads (row 1134); a trait's method reads its bounds; an inherited functional method; the fallback's failure (no row cited) | one subject | P, D |
| F-274 (260, 1198) | 2: the No Duplicates Rule on equal domains; `Any`-bounded counts, on both paths (row 759) | one subject | P |
| F-326 (268, 1087) | 3: `SEQV` on both paths; the prelude's `===` (row 908); walk's numerals, literals, tuples (row 923) | one subject | P, D |
| F-349 (276, 965) | 2: walk's choice by specificity through others; the numeral rule first | one subject | P |
| F-374 (284, 1770) | 5: a `var` field's cell, a worker's default; the transaction check on every access (row 641); `atomic e` (rows 875, 322, 1043); what a change must do; a value object's `var` field and `SEQV` (row 112) | **origin** (`rung-atomic-expr-field`): the title joins two subjects by "and" | P, W, D, R |
| F-386 (292, 1431) | 3: the call on the conjunct; the choice of conjunct, by reading; row 1072 | one subject | P, D |
| F-401 (300, 1336) | 3: an exit commits, both paths; late exits (row 1041); walk's `tryatomic` (rows 1110, 1111) | one subject | P, D |
| F-154 (310, 967) | 2: shared `nat`s in the products; the stop at dispatch (row 254, also in F-20) | one subject | P, D |
| F-279 (318, 766) | 2: slices of shifted arrays; the shifted `Array2` (row 808) | one subject | P, D |
| F-165 (328, 892) | 3: the fork and the graft; the port's one running fix; the `clean-ladder` branch | one subject, the lineage | P |
| F-173 (336, 1718) | 3: the chapter's rule; the compiled path's departure (row 442); walk's departures (row 587) | one subject | P, D |

F-63 by the same measure: 4 claims and two sentences of repair history; united by origin (rung L); kinds R, W and P (`QQ`, with row 354).

**Totals.**

- Claims per entry: 1 in 2 entries, 2 in 11, 3 in 10, 4 in 7, 5 in 7, 6 to 9 in 3. In all 139 claims; median 3. 38 of 40 hold two or more claims that answer different questions.
- What unites them: one subject, 37; one subject with claims on other subjects from the same rung, 1 (F-281); origin only, 2 (F-83, F-374).
- First kind: P, 34; R, 3 (F-242, F-306, F-314); M, 1 (F-292); D, 1 (F-43); no first kind, 1 (F-83).
- Entries that carry a defect or departure beside the claim of their title: 24; 22 of them name its row. Entries that carry part of a repair's account: 10. A measurement of one day: 7. A worker's decision: 2 (F-75, F-374).
- Over 600 characters: 36 of 40.
- **F-63's kind, several claims joined only by origin: 2 of 40 (5%); 3 of 40 (7.5%) with F-281.**

Seen in the sample, and not counted above: one subject held by several entries, by rung. F-306 and F-314 hold walk's native helpers for two sets of natives, beside F-312 (`F-306` cites it); F-20 and F-154 both state row 254; F-63 and F-286 both state `String`'s abstract pair. In all FACTS, two titles speak of "the rung's repairs" (F-83, F-85; `grep -c "^- F-.*the rung's repairs" FACTS.md` prints 2).

## 4. What produces such entries

### 4.1 The instructions that write a FACTS entry today

- **The worker skill**, `fortress-repo`'s `references/records.md`:
  - "What every report holds", `:19`: "**For FACTS.** Each fact that your work established, in the hand-over form of "Writing to the record". If your brief let you write FACTS, give instead the number of each entry that you added or rewrote."
  - "Writing to the record", `:82`: "If your brief lets you write FACTS, add each fact as a new entry in the section of its topic, in the commit that establishes it. ... Spend no effort on the entry's wording: it is rewritten to the record's form after your work."
  - `:84-88`: the hand-over: "the fact as it stands now, in one sentence; what it means for the work; the number that a decision rests on ...; the test that fails if the fact stops holding ...; the section of your report that holds the detail."
  - `:89`: "If your brief lets you write FACTS, rewrite a wrong entry in place."
- **The rung's brief**, `explorations/coordinator/climb-batch-workflow.js:623` (in this form since `e020159857`, 2026-10-08): "record.md: the record lines the gather folds, each a complete finding: the claim, the conditions under which it holds, its evidence ... and what it means for the work. Completeness is yours; the record pass owns the final wording. **The FACTS.md entry the rung earns** (the fact, its source and its test in a few lines under a bold title, the detail left in REPORT.md)." `:628`: the rung does not edit FACTS.
- **The gather**, step 2, `:1045`: "Its record, record.md, folded. The FACTS.md entry under the section of its area (the file's README gives the rule), after the section's last entry: the fact, its source and its test in a few lines." Step 5, `:1050`: record.md "is folded, not landed". A resumed gather, `:1786`: "grep FACTS.md and the ledger ... for its lines, and fold only what is missing: never a line or a row twice."
- **The commit stage**, `:1622`: it writes only "the landed figures" of F-53 and F-240, with `record.py set`.
- **The record-landing workflow** (`explorations/coordinator/tools/record-landing/`):
  - The sorter, `sort.md:11`: "The rungs wrote their entries as drafts, as the worker skill tells them: "Spend no effort on the entry's wording ..."". `:30`: a change's home is "one of nine. A FACTS entry (F-N); a POSITIONS entry (P-N); an entry's history only ...; a gap-ledger row ...; a PLAN line ...; ... a review-queue item ...; an INDEX line; a line of another note ... Or none." `:40`: "Each entry that the batch added or changed gets one change of kind "the pass", whatever else it gets."
  - The entries writer, `entries.md:15`: "For each change of `owed.md` whose writer is `entries`, what is the new line of its entry or row?" `:20`: the rules of an entry are `record.md`'s "What an entry is" and "The pass", "the one home of these rules". `:38`: "An entry already past 600 characters grows only by the clause that its change owes." `:44`: "`record.apply`: for each entry, its whole new line".
  - The checker, `check.md:22-27`: four classes of failure, "coverage", "fidelity", "form", "routing".

### 4.2 The sentences that lead to one entry per rung with several claims

- **At F-63's birth (batch 3):** "the FACTS.md line or lines this rung earns" (`d610695c0c` script `:472`) and "The FACTS.md line goes into ... under "The compile-path ladder baseline", after the last rung entry, as one bullet with its source" (`:776`). The unit was the rung; the section was a list of rungs. Rung L's worker returned one line for its five repairs (`REPORT.md:102`).
- **Today:** "The FACTS.md entry the rung earns" (`climb-batch-workflow.js:623`), in the singular, and "The FACTS.md entry under the section of its area ..., after the section's last entry" (`:1045`). The section is now an area, but the unit is still the rung, and the entry is always added at the end.
- **After the landing:** the sorter gives each entry that the batch added one change "the pass" (`sort.md:40`), and the entries writer writes for it "its whole new line" (`entries.md:44`). Its nine homes (`sort.md:30`) hold no home for a split and none for a move into another entry. So a rung's entry passes through as one entry.
- The worker skill counts by fact, not by rung ("Each fact that your work established", `records.md:19`; "add each fact as a new entry", `:82`), but a rung works from the batch brief, and the brief's sentence is "The FACTS.md entry the rung earns".

### 4.3 Whether any instruction asks to split by subject, or to look for the entry that owns it

- **Yes, in one place:** the coordinator skill's `record.md:29`, "Split an entry when its claims answer different questions and change apart. Before you split, look for an entry that already holds the claim, and move the text there", and `:30`, "Add a new entry only if no entry owns it". The six checks hold "Ownership: the entry has one subject" (`:49`).
- **Not in any brief that writes an entry:** the rung's brief (`:623`), the gather (`:1045`) and the commit stage (`:1622`) neither ask to split nor to search FACTS for the entry that owns the subject. The resumed gather's grep (`:1786`) looks only for the same fold already made. The worker skill says "add each fact as a new entry" (`records.md:82`) and "rewrite a wrong entry in place" (`:89`), and does not say to look for an owner.
- **In the record-landing workflow, by reference only:** the entries writer is told to read `record.md`'s "What an entry is" (`entries.md:20`), which holds the split rule, but its task (`:15`), its file form (`:44`) and the sorter's homes (`sort.md:30`) are one new line per entry. Its checker has no ownership class (`check.md:22-27`).
- **In practice:** each pass over F-63 kept the rung's grouping. The 10-13 consolidation gave it "a bold title for its three repairs that stand" (hist. `:2616`); chunk F2b "cut [it] to the form"; the clarity run marked ownership "pass" and added `QQ` to the title (`f4/assessment.md:24`); eight later passes re-anchored its lines.

## Commands

From `/home/user/fortress`, `T=explorations/coordinator/tools/facts-extract.sh`:

- `$T 'F-63'`, `$T 'F-63+'`, `$T 'history:F-63'`, `$T 'F-64'`.
- The rewrites (1.4, 1.5): for each commit of `git log --reverse --format=%h a7ced6764e^..HEAD -- explorations/coordinator/FACTS.md`, the md5 of `git show C:explorations/coordinator/FACTS.md | grep 'Condition.map'`, printed where it changes; each pair word-diffed with `git diff --no-index --word-diff=plain`.
- The texts before the numbering: `git show a74f5a2b7:explorations/coordinator/FACTS-history.md`, lines 338-339, 474-475, 666-667, 718-719, 993-994, 1219-1220, 1623-1624, 1944, 2616-2617.
- The batch-3 script: `git show d610695c0c:explorations/coordinator/climb-batch-workflow.js | sed -n '472p;776p'`.
- `git log --format='%h %ad %s' -S'split` pair once' -- explorations/coordinator/FACTS.md`; the same with `-S'five plain api defects'`.
- Citations: `grep -rln 'F-63\b' explorations/ .claude/ | grep -v 'F-63[0-9]'`.
- The sample: `awk '/^- F-/{n++; if(n%8==0 && n<=320) print n, NR, $0}' explorations/coordinator/FACTS.md`.
- Rows: `python3 explorations/coordinator/tools/ledger.py show N` for 354 to 358, and `$T 'ledger:562'`.
