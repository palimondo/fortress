<!-- Which existing tool corrects the 18 POSITIONS entries with findings of the phase 3 exit review, and which checks of the 10-21 to 10-22 consolidation apply to any such run, read from the tools' own documents by an Opus worker on 2026-10-28. -->

# Which tool corrects the 18 entries

## Summary

Neither tool does this job as designed. The clarity workflow keeps meaning: its writer must "Keep the meaning", and its check fails a change of meaning. The mining workflow is the one that corrects: its writer changes only what is "factually wrong, not his, or stale" (rule 0). But it takes findings only from its own scouts and its own judgement. No stage reads an outside review. The account's proposal to change the clarity briefs rests on the curator naming that tool. The tool documents it quotes point to the mining writer instead. Six checks of 10-21 to 10-22 apply whatever writes the texts: `record.py check`, the cold read, the takeaway check, the quote check, a judge's hold and the curator's read of a first chunk. No check measures length against the old entry, register or dates. Only the curator's read caught those. A mining run on 18 entries: about 4.6M to 5.1M tokens written, an estimate.

## 0. What the record says

- Mining "finds where each POSITIONS entry came from". Clarity "rewrites ... entries so that each reads on its own" (`record.md`, "The consolidation tools"). The skill does not say that the mining writer corrected entries by rule 0 (account, section 4).
- `BOOT.md`, "Waiting on him": "Neither workflow is for a few targeted corrections."

## 1. Inputs, steps, outputs

**Mining** (`positions-audit/README.md`; `full/evidence/workflow.js`; `full/evidence/briefs/`). Input: `chunks: [{ name, entries }]`, "per chunk of ten entries".
- Scout (Sonnet, one per entry): "Find what the entry rests on". It checks each premise against "today's tree" and collects "His later words". Output: `P-N.md` (`scout.md`).
- Judgement (Opus, one per chunk): "Read each report, the entry's text ... and its history". It classes each part, and notes "a premise that is false today". Output: `judgement-CHUNK.md`.
- Writer (Opus): "Propose the corrected record", run on a copy with `record.py`. Output: `corrections-CHUNK.md`, `.apply`, `rewritten-CHUNK.txt`, queue items. "Nothing is applied: the curator reads your proposal first" (`writer.md`).
- Cold read, then takeaway check, "match or drift" against his messages (`coldread.md`, `takeaway.md`).

**Clarity** (`tools/record-clarity/README.md`, "What runs"). Input: `kind, out, stream, chunks`, about ten entries a chunk. Steps: assess (FACTS only), write, cold read, check, fix, reread, judge. The writer: "Keep the meaning". Rule 8: "Do not add a claim, a reason or a scope that the sources do not hold" (`writer.md`). Output: `proposals.*`, `clean.txt`, reports, `final.apply`, `queue.md`.

## 2. Which tool corrects from a finding

- **Clarity cannot.** It keeps the meaning and rewrites the whole entry. The job wants the smallest change and nothing else changed. The account agrees: "its checker would fail every correction as a change of meaning" (section 5).
- **The mining writer corrects.** "The rules" in `writer.md`: 0, "Change as little as you can"; a sentence "that is his and correct stays word for word". 1 to 3: his decision stays, a default goes to the queue, a one-time approval is struck. 4: a changed summary is reworded or becomes a question. 5: no source, it stays as a question. 8: "A premise false today: corrected from its source, or dropped." 12: "His later word ... updates the entry."
- **10-21, P-12.** The scout traced his messages of 09-15 and 09-29, and checked `Shell.java:403-424`. The judgement found "low-hanging fruit" to be "a premise that ... the ledger undercut" (`judgement-c1.md`). The writer dropped those words by rules 0 and 8, and kept the rest word for word (`corrections-c1.md`, "P-12"). The curator read a page grouped by kind of change. At his word of 08:19 on 10-22, the coordinator built the apply files without the held entries (`apply-2026-10-22/build.py`) and applied them at `6b560762f`.
- **The form it expects.** One `P-N.md` per entry, with `## His quotes`, and one judgement per chunk. Its own stages write both.
- **What is missing.** No input for an outside review. The judgement reads only "each report, the entry's text ... and its history" (`judgement.md`). The scouts' pointers search the queue, the boot note and the skills, not `reviews/foundations/` (`tools/pointers.py`, header). Run as designed, the tool finds the faults it can trace to code, git, the specification or his words. It does not use the findings list. Closing that gap needs the curator's word on a new input. I propose none here.

## 3. What the account's proposal rests on

- It cites his go of 10-26 07:42:15: "a clarity process workflow that you can use for writing it with a code reader". It also cites the held line of 10-28 07:37, in the coordinator's words: "runs through the clarity workflow" (section 8).
- His words at 07:37:43 name the aim: "use the process we've developed before ... It worked well during the last record consolidation."
- Its own reading of the documents points the other way: "The audit's writer made the content corrections by rule 0. The clarity writer then kept their meaning" (section 3). Its proposal 0 brings in "the audit's writer brief, rule 0 first".
- So the choice rests on his naming of the tool, not on the documents. Its option 1b, "the findings in place of the scouts' reports and the judgement", skips two stages. That is not the designed form.

## 4. The checks that apply to any writer

On 10-21 to 10-22, POSITIONS went through cold reads, a takeaway check, a check and a final cold read. No quiz ran on POSITIONS (`last-consolidation.md`, section 0).

1. **`record.py check --base`** (`record.md`, "Reading and writing"): it shows nothing was lost and reports each entry over 600 characters. Here it catches lost entries and growth past 600 characters. It does not catch growth below that limit.
2. **Cold read** (`coldread.md`, either tool): a reader with no context says what each entry asks. Here it catches a correction that reads two ways, and shorthand such as "22c" or "tenet 2".
3. **Takeaway check** (mining `takeaway.md`): the reader's takeaway against his messages, "match or drift". Here it catches a correction that drifts from his intent. Examples: P-26's struck sentence, P-43's reasons, P-37's 10-26 goal.
4. **Quote check** (`tools/hischeck.py`, `full/RESULTS.md`, "The checks"): every quote of his must match exactly. Here it guards the grounds that cite his words: 04:47:50, 05:25:27, 07:46:17 on 10-26.
5. **Fidelity check and judge** (clarity `check.md`, `judge.md`): a text that says "more or less than its sources" is held, and the old text stays as the default. Here it would hold a correction whose ground is "the judge's reasoning only" (P-7, P-26 (a) and (c), P-37 (b), P-153). As written, though, `check.md` also fails every correction that its source supports.
6. **The curator's read of a first chunk** (the trial of ten, `trial/RESULTS.md`; the pilot, "I felt the tone was good"). Here it catches length, register and dates. No tool checks these. The trap test scored the rejected texts 12 of 12 (account, section 2, cause 4).

Two more checks fit, as defined. `words-subset.py` checks that an apply line "only deletes": use it on the entries whose findings are strikes only (P-26 (b)). The record-test kit (`record.md`, "A consolidation") checks decisions only.

## 5. A mining run, as designed

- **Inputs.** Copy `full/evidence/briefs/` to a new folder, and change the report paths and the scout's `--out` path (README). Copy `workflow.js` with `B` and `E` set to that folder: the script takes no folder argument.
- **Chunks of ten.** c1: P-7, P-12, P-17, P-26, P-27, P-33, P-37, P-42, P-43, P-58. c2: P-59, P-84, P-85, P-146, P-153, P-154, P-155, P-158. Run c1 first, as the trial ran first. P-158 is new to the tool. The other 17 entries are traced again, for his words since 10-22 (rule 12).
- **Its checks.** `record.py` on a copy, the cold read, the takeaway check, `hischeck.py`, all apply files on one copy with `check --base`, and the page's groups checked by script.
- **Coordinator.** Launch the run. Have a page of each change made, before and after. At his word, build the apply files, apply on `main`, run `check --base`, commit, push. Write the history lines with `record.py note`, and file the queue items.
- **Tokens.** The full run: 19.3M for 75 entries. The trial: 2.85M for ten. For 18 entries: about 4.6M to 5.1M (`full/RESULTS.md`, "The cost"). The full run passed its estimate by about 15 %.
