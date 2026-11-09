<!-- The record-landing workflow's task for the skill writer after a landing: install the sections of the revival part that the orientation judge accepts, and bring the rest of the fortress-repo skill in line with the landing, from the landing's own list of the skill sentences that it made false; skills.sh appends the landing's data. -->

# The skill writer's task after a landing

A climb batch has landed on `main`. The record-landing workflow brought the record in line with it, landed the record's commits, and ran the orientation update. The landing made some sentences of the `fortress-repo` skill false. The data at the end of this task lists them, from the landed files, and says what the orientation update judged. Bring the skill in line with the landing.

No coordinator reads this task before you, and none rules between your steps. The data is copied from the landed files. A cold read of your commits follows, and you fix its flags in a second task.

## What to do

1. **Install the orientation's sections.** If the data says that the orientation's judge ran, read its `judgement.md`. Copy each section that it judges "install" from its `orientation.md` into `references/revival-changes.md`, word for word, in place of the section that it rewrites. A section that it holds keeps its old text. Add the lines of its `sources-mapping.md` for the installed sections to the skill's `references/sources.md`. Change nothing else in `revival-changes.md`.
2. **Bring each false sentence in line.** For each sentence that the data names, by its part and line or by its section:
   - Read the entry or the row that grounds the new truth before you touch the sentence: `explorations/coordinator/tools/facts-extract.sh 'F-312'` prints one entry; `git grep -n '^| 890 ' -- explorations/fortress-gap-ledger.md` finds a row.
   - Find the sentence by its words. A line number in the data can be off by a few lines.
   - Change it by the fewest words that make it true, as the entry or the row states it. Check a claim about the code against the code before you write it.
   - If the data names a trap or a wall of a row that the part has no sentence for, and a worker who follows the part would fall into it, add one sentence where the part keeps its traps.
   - If a line names a term that the skill does not define, define it where the skill first uses it, in a few words, only if a worker needs it to act. If the skill does not use the term, change nothing.
   - If the sentence is already true, change nothing, and say so in your report.
3. **The changed decisions.** For each change of the curator's decisions in the data, search the skill for a sentence that rests on the old words (`git grep`). If one does, bring it in line by the fewest words. If none does, change nothing.
4. **The scope.** Edit only the `fortress-repo` skill. Change a rule's meaning only where the landing changed the tree. Add no rule that the data does not ground. A sentence of another skill that the landing made false, or that your change makes disagree, goes into your report, for the coordinator. So does a point of the data that is about how agents work rather than about the tree, such as a wait or a reading rule.

## Committing

Run `python3 explorations/coordinator/tools/skills-lint.py` on the files you changed before each commit. Commit by named paths, as your standing brief says: one commit for `revival-changes.md` and its lines of `sources.md`, if you installed a section, and one for the other parts and their lines of `sources.md`. Open each subject with "fortress-repo:" and name the batch's landing. Do not push: the workflow pushes.

## Your report

A page worker shows each of your changes to the curator, with its reason, from your report. So give each change's reason in plain words: what the text said that was wrong, and what it now says. Name no task item, flag or ruling by its number. Then, in your standing brief's order:

- the commits, with their hashes;
- each sentence changed: its file and section, its new text, and the entry or row that grounds it;
- each section installed from the orientation, and each held one left as it was;
- each line of the data where the sentence was already true, and each that you could not place;
- each point where the record left you a choice, and each decision not taken, with its alternatives;
- each point for the coordinator: another skill's sentence, a point about how agents work, a fault of the data.

## This landing's data

Climb batch 29. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-29/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-29/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- owed.md's last section: the skill sentences; the POSITIONS to name; the asks; process findings; his 09:3x word in the boot note only; the routing's departures; `cites.md`.

From `owed.md, "For the coordinator", its bullets that name the skill`:

- The skill sentences that the batch made false or incomplete, through the record-landing workflow's skill update (the review, Part 3, its 12; RECORD.md, "Left for the coordinator" and "Revival changes, for the skill writer"): `fortress-repo`'s `SKILL.md:77` and its phase list `:65-73` (the fold on both paths, F-339), `SKILL.md:132` ("`nat` is an `NN32` value"; P-173, row 962), `references/interpreter.md:20-23`, `:25` and `:126` (F-341, F-343, F-344), `references/compiler.md:106` (row 945; F-343), `references/revival-changes.md:48` (`Index`), `:62`, `:89` (the numeral paragraph), `:95` (`asFloat`, by C72), `:108` (rows 20, 717) and "Numbers", "Arguments convert ..." (the float numeral reads `RR64`), `references/tests-writing.md:34` (row 454) and the key `run_exits_nonzero` (F.worker.4, C144), `references/library.md:56` ("as for `IntLiteral`'s bindings"); and PLAN's own "the `fortress-repo` skill's sentence that walk makes a new string at each evaluation changes with the landing" (`PLAN.md:73`, C103).

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

- C72, P-165, made false: "`RR64` and `NaturalNumeral` (P-174)" becomes "`RR64`, `NaturalNumeral` and `RadixPointNumeral` (P-174)"; "`numbers.tex:46-54`" becomes "`:56-73`"; decision unchanged. Ground: `FortressLibrary.fsi:489`; his "P-165 included" of 09:3x (`BOOT.md:10`); item 478.
- C73, P-171, stale: "`constant.tex:81-85`" becomes "`:118-122`"; decision unchanged. Ground: the review, correction B.
- C74, P-76, made false, cut only: "a numeral at an `NN32` or `NN64` binding (row 454), a numeral beyond `ZZ32`'s range at an `RR64` binding (row 443), and" goes; decision unchanged. Ground: rows 443, 454 FIXED, `3de571bac7`.
- C75, P-172, made false: " (row 862: the compiled path rounds two or three times)" goes; "a parameter and a field" becomes "a parameter, a field and a declared return type"; "(`FortressBuiltin.fsi:44`)" becomes "(`FortressBuiltin.fsi:44` at `b430f9f42`)"; decision unchanged. Ground: row 862 FIXED; F-341.
- C76, P-173, made false, cut only: " through `QQ`'s `=` pair" goes; decision unchanged. Ground: F-339; the review, split 13.
- C77, P-169, made false: "leave the library" becomes "left the library"; "are Fortress text over its `asZZ` (F-331)" becomes "left with it"; decision unchanged. Ground: `3de571bac7`; F-32, F-299.
- C78, P-154, made false, cut only: "; it waits until walk runs the checker (P-12) or row 364, walk's typing of a generic at its argument's run-time class, is fixed" goes; decision unchanged. Ground: row 364 FIXED, `12292add28` (F-344).
- C79 to C81, P-166, P-163, P-175, stale: "`.fss:565`, `.fsi:223`" becomes "`.fss:548`, `.fsi:200`" and "`:648`" "`:655`"; "`:665`" "`:598`"; "`CodeGen.java:6939`" "`:7062`"; decision unchanged. Ground: N's, F's and C's hunks.

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-29/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-29/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-29/orientation/sources-mapping.md` gives the provenance of what changed.
