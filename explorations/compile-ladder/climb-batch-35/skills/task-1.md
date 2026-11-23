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
   - If the data names a trap or a wall of a row that the part has no sentence for, add no sentence: name the row in your report, for the coordinator, who plans its fix (P-180: a defect is fixed, not taught as a workaround).
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

Climb batch 35. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-35/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-35/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- The skill: false, `interpreter.md:26`, `:35`, `tests-writing.md:34`, `compiler.md:58`, `:89`, `:157`, `revival-changes.md:32`, `:99` (P-174), `SKILL.md:126` (row 1039, which the cold reader met beside F-351 and F-401); short, `compiler.md:156`, `revival-changes.md:32`, `interpreter.md:93-103`.

From `owed.md, "For the coordinator", its bullets that name the skill`:

- **The skill writer's list** (the review, Part 3; RECORD, "Left for the coordinator"; CB35, "For the skill writer"). False or needless, on the record's list: `references/interpreter.md:26` (row 960); `references/tests-writing.md:34` (row 1); `references/interpreter.md:35` (row 1026); `references/compiler.md:157` (rows 573 and 1038); `references/revival-changes.md:32` (rows 653 and 650); `references/compiler.md:89` (row 650, which now compiles `override`); `SKILL.md:126` (row 1039). False, on no list: `references/compiler.md:58` (row 1100's library order, false since `b7b5b0c02b`). Short, each now a row: `references/compiler.md:156` (row 1041's commit), `references/revival-changes.md:32` (rows 1106 to 1109), `references/interpreter.md:93-103` (row 1109). Since `403a0e60cb` the writer adds no sentence for a new trap, so these short lines are the writer's call. False by P-174 as `be43ddc647` rewrote it: `references/revival-changes.md:99`, "So `v.asZZ32` is `ZZ`'s getter". These hold: `references/interpreter.md:33`, `references/tests-running.md:14` and `:117-118`, and `references/library.md:54`.
- **The departures from P-174 and P-165 that the next planner files as rows** (`BOOT.md:14`). For P-174: the one library's numeral coercions call getters on the four numbers (`Library/FortressLibrary.fss:388-389`, `:635`, `:847`, `:954`, `:1065`); the checker reads the four as `ZZ` values (F-342); the text says the same (`Specification/basic/expressions/literals.tex:186-188`); rung R's tests write `n.asZZ32` (`tests/RadixPointLeadingZerosWalk.fss:6`, `compiler_tests/RadixPointLeadingZerosCompiled.fss:6`); and the skill's example. For P-165: `asFloat` renamed to the getter `asRR64`. Until those rows exist, C24 and C27 to C30 name each departure as having no row yet. The rows then replace those words.

From `entries-report.md, "For the skill writer"`:

- `.claude/skills/fortress-repo/references/revival-changes.md:99`, "So `v.asZZ32` is `ZZ`'s getter", departs from P-174 since `be43ddc647` (the review, "Corrections owed in the record"). This is the routing's or the skill writer's, not an entry's.

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

- C24, P-174, made false: old "Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause."; new, the same and "The tree departs too, with no row, where the numeral coercions of the one library and of many tests call a getter on the four numbers, as `v.asZZ32`, and where the checker and the literals chapter read each of the four as a `ZZ` value wherever it stands (F-342, F-345)."; decision unchanged. Ground: P-174 as `be43ddc647` rewrote it; `FortressLibrary.fss:388-389`, `:847`, `:954`, `:1065`; `literals.tex:186-188`.
- C25, P-40, made false: old "and read as values are `ZZ` (P-174)"; new "and read as values convert where they stand, as a numeral does, a `ZZ` where nothing fixes a type (P-174)"; decision unchanged. Ground: P-174 as rewritten, his "YES!!" of 13:0x UTC on 2026-11-23.
- C26, P-173, made false: old "and a `ZZ` where it is one of a numeral type's four numbers (P-174)"; new "and, where it is one of a numeral type's four numbers, converts where it stands, a `ZZ` where nothing fixes a type (P-174)"; decision unchanged. Ground: as C25.

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-35/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-35/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-35/orientation/sources-mapping.md` gives the provenance of what changed.
