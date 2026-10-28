<!-- The phase 3 exit review's findings on POSITIONS, how they differ from the mining workflow's product, which steps of the 10-21 to 10-22 process fit their correction, and the run to make, by an Opus worker on 2026-10-28. -->

# The review's findings, and the run that corrects them

## Summary

The review's findings are readings of the team's sources, not traces of the curator's words. In 18 entries it found a reason from the wrong layer or date, a missing ground from the language's texts, a false statement, a sentence not his, or a word of his still owed. Each right reading rests on dated lines of the specification, the papers, the library, the code or git; his words give the frame and show what he decided. All nine decisions stand. The mining workflow asks whose words an entry records: its scouts check only what an entry states, and its writer keys a change to his words. The clarity workflow's steps fit, with each finding's ground as the source: an Opus writer stream, the cold read, the checker, the judge, the trap test and his read of a first chunk. Three briefs and a README need short additions, marked below. The process lacks a findings input, a check of length and register, and quiz scenarios for 11 of the 18. The findings list omits the exit judgement's corrections. The run: two chunks of nine, about 3M to 4M tokens written, an estimate.

## 0. Sources

Paths start at `explorations/`. F is `reviews/foundations/`; J is `F/judgement.md`; S is `F/evidence/salvage-findings.md`; M is `coordinator/positions-audit/full/evidence/briefs/`; C is `coordinator/tools/record-clarity/`; A is `coordinator/postmortem-2026-10-28/account.md`.

## 1. The findings

**How the review reached them.**

- On 10-24, Opus mapped the decisions against the designers' word; a Fable judge ruled (`reviews/phase3-exit/README.md`, layers 1, 2).
- On 10-26, on his frame of three layers (the language, the team's build on the JVM, Java interoperability; 05:25:27 UTC), workers gathered evidence with no verdicts: a Sonnet archaeology of the bound, an Opus probe of it compiled, an Opus map of the nine tenets' grounds by layer "checked at the source", and an Opus sweep of the revival's changes against the prelude, each prelude line dated by its first commit (`F/tenets-evidence.md`, header; `F/prelude-lens.md`, section 0; `F/bound-archaeology.md`, section 0).
- The map took his words from the audit's scout reports of 10-22 and the transcripts, as one input beside the texts (`F/tenets-evidence.md`, "Abbreviations").
- A Fable judge checked the key lines at source, and ruled each tenet (J, header, section 2). The trap test found where old texts mislead. Climb batch 22c's planner found the abstract-member ground false (`F/rewrite-results.md`). A Sonnet worker listed the findings per entry, each with its ground (S).

**The kinds.** All nine decisions hold. The faults are in the entries' reasons and statements (J, section 1, items 1 and 2).

1. **A reason from the wrong layer or with the wrong date.** The team's later word (P-26) counts 2009 prelude code as later than texts of 2010 to 2012. The flat number types (P-43) call the prelude "the team's last record of the Fortress way". One library (P-37) takes prelude designs with no rule. The integer power (P-153) calls compiled-path code the later word; list order (P-154) cites a draft of unknown date. The specification's revision (P-7) mixes two kinds of "later work in the compiler". The self-type idiom (P-146) gives a reason that misled a reader.
   - Right reading: "later" is a date among the language's texts. The team's code is its word on the language only where it wrote the rule on purpose, or where its checker enforced a rule that the text leaves silent or ambiguous. A stub or a JVM accommodation does not bind (J, section 3).
   - Evidence: `6896886fb` (2009-08-31) against the Working Draft's last edit (2010-12); Naden, 2012-08-31 (`justificationOfRTR.tex:626-630`); "Hopefully temporary hack" (`WellKnownNames.java:113-116`); the root snapshot `5a68404fd` (S; J, tenets 2, 3).
2. **A missing ground from the language.** Unboxed doubles (P-17), the bound `Any` (P-42 c), the flat number types (P-43 b), the natives' form (P-58 a), one library (P-37 a).
   - Right reading: the decision rests on the language's own text, or on the library's practice where the language is silent.
   - Evidence: `objects.tex:38`, `binary.tex:80`; `ParkPOPL2019.txt:418-419` and the Working Draft's `trait-parameters.tex:53-54`; the exclusion rule's four texts and `types-vals-vars.tex:502`; `future.tex:675`, no foreign-function interface; for P-37, his goal of 10-26 04:47:50 (S).
3. **A false or stale statement.** The bound `Any` (P-42 a, b, d): "functions", a switch-over that "ends the departure", the arrays' example. One library (P-37 c, d): its premise, three files. The phase order (P-33): "whole library". Walk runs the checker (P-12): its size. The `double[]` store (P-84): stamping alone gives no `double[]` field. Abstract members (P-158 a, b): the export rule and the date.
   - Evidence: `Shell.java:372`, F-289; `types-vals-vars.tex:136` against `types.tick:232-238`; `FortressLibrary.fsi:759`; F-34, F-53, F-290; `StaticChecker.java:228-229`; `CompilerSystem` and its 27 tests; `array-design.md`, section 2; `source-code.tex:372-385`, `edb516dba` (2009-03-10) (S).
4. **A sentence not his.** The team's later word (P-26 b), walk's coercions (P-59), part of P-43 a. Evidence: commits and his dated words (S).
5. **His word still owed.** The natives' form (P-58 b), symbolic operators (P-155), his lean of 09-20 on arrays (P-85). No text follows from a source.

**Outside the list.** S covers only the foundations reports (its header). The exit judgement ruled text corrections of the same kinds for float rounding (P-68), the team demos (P-79), the self-type idiom (P-146), existential reduction (P-152), list order (P-154), symbolic operators (P-155) and the `Index` bound (P-156) (`reviews/phase3-exit/judgement.md`, section 3.2; review queue, items 285 to 290).

## 2. How the mining workflow differs

- Its question is provenance: "the curator's decision, faithfully recorded, or an agent's summary or default" (`coordinator/positions-audit/README.md`).
- The scout finds "what the curator said, what he was asked", and checks the tree "Only where the entry states a reason, a premise, a number or a fact about the tree" (M`scout.md`). It neither seeks a missing ground nor ranks grounds by layer or date.
- The judge classes each part by origin: his decision, a default, no source (M`judgement.md`).
- The writer keys a change to his words: rule 1 "checked against his words", rule 4 "reworded from his intent", rule 5 "No source of his" becomes a question, rule 12 "His later word" (M`writer.md`). Only rule 8, a premise "corrected from its source", acts on the team's sources. Rule 0, "Change as little as you can.", fits any correction.
- The takeaway check compares with "what the curator decided, as his messages show it" (M`takeaway.md`); `hischeck.py` checks his quotes.
- So the mining tool finds kind 4 and part of kind 3.

## 3. Which steps fit, and against what

- **Writer** (Opus stream, C`writer.md`). Fits, with rule 0: it writes from each finding's ground, opened at source, and keeps the decision his. Two lines block it: "Keep the meaning." and step 3, a reason "only if the curator gave one or accepted it in the question".
- **Cold read** (C`coldread.md`). Fits as it is, against nothing: a reader with only the worker skill says what each entry asks.
- **Checker** (C`check.md`). Fits, against each finding's ground. For FACTS it already reads "the code or test it names"; for POSITIONS its sources are only the audit's evidence of his words. The decision itself is still checked against his words (C`entries.py`). Its check of the cold reader's answers replaces the takeaway check.
- **Judge** (C`judge.md`). Fits: apply or hold, the old text the default, a held entry's question to the review queue.
- **Quiz** (the trap test, `F/evidence/trap-test/`). Fits: it grades a reader's decisions at forks against a key from the judgement and his words. It quotes 7 of the 18 (P-26, P-27, P-33, P-37, P-42, P-43, P-146).
- **His read** of a first chunk, old beside new. Fits: only it checks tone, length, register and history in an entry (A, section 2, cause 4).

**What the process lacks.**

- An input for a review's findings: no stage reads one (`tool-fit.md`, section 2).
- A rule that lets a ground from the team's sources into an entry (C`writer.md`, step 3; M`writer.md`, rules 1 to 12).
- A check of length against the old entry, of register and of history (`tool-fit.md`, section 4). `record.py check` flags only entries over 600 characters.
- Quiz scenarios for 11 of the 18. J drafts a trap for six of them (section 7, "Trap:").
- An audit trace of abstract members (P-158): `entries.py` knows only the audit's chunks.

## 4. The run

**A writer's inputs for one entry**, beyond what C`writer.md` names:

- The entry, its history, and the audit's evidence of his words, of 10-22 (`entries.py N`).
- Its block of S, in `findings.md` in the chunk's folder, cut by script to the chunk's entries.
- Each ground the block names, opened at source; the review passage it cites, for content only.
- Not the rejected texts of 10-26, their run brief, or J's section 7 as a target.

**Brief changes**, for his yes, made by the skill writer on Opus:

- C`writer.md`, after "Keep the meaning.": "**Corrections.** If your folder holds `findings.md`, a review found faults in your entries, each with its ground. Correct each named sentence from its ground, opened at its source, and change nothing else (the audit writer's rule 0). A reason may rest on the team's texts, library or code that a finding cites; the curator's words show what he decided. Where a finding has no ground but a reviewer's reasoning, or needs his word, write a question, not text. An entry grows only by what a correction needs."
- C`writer.md`, step 3, end of its first sentence: "or a finding in `findings.md` gives it with its ground."
- C`check.md`, after the positions sources: "With `findings.md`, a corrected sentence's source is its finding's ground; open it. A change that its ground holds is no fidelity failure. A change that no finding names is one, and so are a changed decision, growth beyond the corrections, and a sentence that tells history."
- C`judge.md`, the folder's files: add "`findings.md`, whose grounds are sources".
- C`README.md`, "Running it": "To correct a review's findings, put them in each chunk's folder as `findings.md`."
- No change to the script, `coldread.md` or `fix.md`.

**Chunks**, by subject, each written by the tool's Opus writer stream (A, section 5, step 1):

- c1, alone first: P-7, P-26, P-27, P-37, P-43, P-146, P-153, P-154, P-158.
- c2: P-12, P-17, P-33, P-42, P-58, P-59, P-84, P-85, P-155.
- If the exit judgement's corrections join the scope, a retrieval worker adds their findings, and c3 takes P-68, P-79, P-152, P-156.

**The coordinator's steps.** Copy the findings; launch with arguments only. A worker applies `final.apply` on a copy and runs `record.py check --base`, a length table old against new, and `words-subset.py` on the strike-only entries (P-26 b, P-59, P-42 a). An Opus page shows each entry new above old, each change with its finding and ground; he reads each reading, tone, length and register. At his word, c2 runs, then the quiz. At his yes per text: apply, check, commit, push; a worker files `queue.md`.

**The quiz.** The trap test again: a reader on the old entries, one on the new, a blind grader told the key's slips (`F/rewrite-results.md`). Pass: no scenario scores below the old entries' (10 of 12).

**Tokens written, an estimate.** Chunks 1.5M to 2.5M (10-26: 1.62M for 13 entries, A, section 5); checks 0.1M; two pages 0.4M; quiz 0.8M; brief edits 0.1M. About 3M to 4M. On 10-26: 2.7M against 1.5M estimated.
