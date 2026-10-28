<!-- Whether the exit review's findings can feed the mining workflow's judge and writer in place of or beside its scouts' reports, weighed from the tools' own documents by an Opus worker on 2026-10-28. -->

# The findings as the mining workflow's input

## Summary

A findings block is not the same kind of input as a scout's report. It gives the sentence at issue, the fault and its ground. It does not give what the writer's rules need first: the curator's words behind each part, the question he answered, the entry's changes, and a quote block that `hischeck.py` checks. So, used in place of the scouts' reports, the findings would make the review's claims the writer's target. That was the 10-26 failure, and it would lose the check of his quotes. Used beside freshly run scouts, the judge weighs each finding against his words and its ground. That needs one sentence in the run's copy of the judgement brief. I recommend that way: about 4.6M to 5.1M tokens written, an estimate. The scouts trace his conversations first. They read the specification and the tree only to check a reason or premise that the entry states. They do not look for grounds that the entry lacks.

## 1. A scout's report against a findings block

**A scout's report** (`briefs/scout.md`, "What to find", "Your report"; example `full/evidence/P-42.md`). At most 50 lines:
1. Origin: his messages by UTC time, and "the question he answered, in its own words".
2. What the words meant then, and "whether today's tree still bears it out, with file and line".
3. Each change of the text: commit, time, before and after, reason.
4. His later words, each kept or rejected in one line.
5. Where each status lives.
6. Pointers.
7. Page comments.

It ends with `## His quotes`, "exactly as `show.py` prints it". It judges nothing.

**A findings block** (`reviews/foundations/evidence/salvage-findings.md`, its header):
- the entry and "At issue", a quote of POSITIONS;
- "Reports", a quote of the review;
- "Plain", the retrieval worker's restatement;
- "Ground", which is code, git, the specification, his words, or "the judge's reasoning only";
- "Elsewhere", where the record holds it.

It also "judges nothing". Its quotes were checked against POSITIONS and the reports, not against his messages (`BOOT.md`, "Running").

So a block covers part of the report's item 2, and some of item 4 where its ground is his word. It does not cover items 1, 3, 5 and 7, or the quote block.

## 2. What the judge and the writer need

**The judge** (`briefs/judgement.md`) gives each part a class: "his decision", "a default that an agent landed", "no source found", and the others. It cites "the report and his messages by UTC time". It writes "Sources to put back" and its own quote block. To do this it needs each part's origin. A block does not give the origin. The script lets the judge work without a report ("judge it from the record alone", `workflow.js`), but then the judge rebuilds the trail from the history alone.

**The writer** (`briefs/writer.md`, "The rules"):
- Rule 1 checks his decision "against his words".
- Rule 4 rewords "from his intent".
- Rule 10 writes "his message's time and a fair rewording".
- Rule 12 needs "his later word".
- Rule 8 needs a premise "corrected from its source". A block gives exactly this, where its ground is a source.

Where the ground is "the judge's reasoning only" (P-7, P-26 (a) and (c), P-37 (b), P-153), no rule acts on it except as a question (rules 4 and 5).

## 3. The three ways

Every way needs what the README already asks: a new folder, the briefs copied with their paths changed, and a copy of `workflow.js` with `B` and `E` set to that folder (`positions-audit/README.md`).

Tokens. The full run wrote 19.3M for 75 entries (`full/RESULTS.md`, "The cost"). The trial's ten scouts wrote 1.62M, about 0.16M each (10-20 post-mortem, `evidence/MAP.md`). My inference: the Opus stages wrote about 0.9M a chunk, that is 19.3M less 75 scouts at that rate, over eight chunks.

**a. Findings in place of the scouts' reports.**
- Needs: the blocks split into `P-N.md`, one file per entry, its blocks (a) to (d) together. The script copy must also drop its scout stage, or the scouts overwrite those files. This change goes beyond the README.
- Gains: no scouts, and the review's work is used directly.
- Loses:
  - the origin and his checked quotes, so the 10-21 guard is gone: "1,100 quotes of his, all EXACT" (`full/RESULTS.md`, "The checks");
  - the history lines' times (rule 10);
  - his later words outside the grounds.
- The findings become the only claims in front of the writer. On 10-26 the judgement's list was made binding (account, section 2, cause 1).
- Tokens: about 1.8M to 2M.

**b. Findings beside the scouts' reports, with the scouts run again.**
- Needs: the scouts as designed. The blocks go in the folder as `findings-P-N.md`. Add one sentence to the run's copy of `judgement.md`, after "Read each report, the entry's text ... and its history": "Read also `findings-P-N.md` for each entry that has one: a review's finding on its text. Check each at its ground as you check a report's claim, and class the part it names." This is the only edit beyond the README. The writer already reads the judgement, so its brief needs nothing.
- Gains:
  - his words with checked quotes, beside every finding;
  - his words since 10-22, which are the grounds of P-26, P-37 and P-43 (writer rule 12);
  - the first trace of P-158;
  - a judge that weighs each finding instead of obeying it.
- Loses: nothing. It repeats the 10-21 trace of 17 entries.
- Tokens: 18 scouts, about 2.9M, plus two chunks of Opus stages, about 1.8M. About 4.6M to 5.1M in all.
- A cheaper variant reuses the 10-21 reports for the 17 traced entries. It needs the scout stage dropped, the change of way a, and those reports lack his words since 10-22. About 2M.

**c. The scouts alone, as before.**
- Needs: nothing beyond the README.
- Gains: the tool exactly as built.
- Loses: the review's findings. The scouts reach a fault only where the entry states it: the P-42 scout of 10-21 found that "the two texts differ on arrow types", the review's P-42 (a). They do not reach a missing ground, such as P-17's `objects.tex:38` or P-42 (c)'s POPL 2019. This goes against the curator's rule that "the 2.5M tokens of digging are used" (`HELD.md`, 07:37 on 10-28).
- Tokens: about 4.6M to 5.1M.

## 4. Recommendation

Way b. It is the only way that keeps both guards of 10-21: the writer works from his checked words, and the review's work is used. Its one change is a sentence in a brief copy that the README already has each run edit. The judge brief still asks for a source before anything changes, so a finding with no ground but the judge's reasoning becomes a question for him, not a text. The chunks: c1 P-7, P-12, P-17, P-26, P-27, P-33, P-37, P-42, P-43, P-58; c2 P-59, P-84, P-85, P-146, P-153, P-154, P-155, P-158. Run c1 first.

## 5. What the scouts traced

The scout brief names these sources:
- `leads.py`: the entry, its history, its commits, his messages before each commit "with the whole message he answered", his later messages, the record's pointers, the status homes, his page comments.
- `show.py` and `git show`.
- "If the entry rests on a document, the document's words".
- For a stated "reason, a premise, a number or a fact about the tree", today's tree "with file and line" (`scout.md`, "Your leads", "What to find").

So the scouts went past his conversations. P-42's scout read `types-vals-vars.tex:153`, the 2012 chapter `types.tick:232-236`, the library and `Shell.java:371-372` (`full/evidence/P-42.md`, section 2). But they checked only what the entry states. Nothing in the brief asks them to search the specification, the papers or the team's code for a ground that the entry lacks.
