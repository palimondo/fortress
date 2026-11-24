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

Climb batch 36. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-36/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-36/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- The skill (owed.md): `compiler.md:178`, `:137`, `:49-52`; `revival-changes.md:15`, `:17`, `:36-43`, `:99`; `interpreter.md:29`, `:68`; rows 1137 and 1138's traps.

From `owed.md, "For the coordinator", its bullets that name the skill`:

- **The skill writer's list** (the review, Part 3; RECORD, "Left for the coordinator and the skill writer" and "Revival changes, for the skill writer"; CB36, "For the skill writer", after run 1), each read on `main` at `791a6d0192` and found by its words:
  - `references/compiler.md:178`, the tie bullet ("the checker sorts the candidates and keeps the first. The sort's order varies with what the same JVM compiled before. ... look for such a tie first"): goes. The record's proposed rule, "the more specific declaration by its declared signature decides, and a tie that the rules leave is a static error", does not yet hold whole: a tie among one unit's own declarations is kept by place (row 1136), and the order by place is his open question since 07:0x (C79); the skill states no order-by-place rule.
  - `references/compiler.md:137`: "At `RR32`, `=` compiles and overflows the stack when it runs (ledger row 528)": rewritten: `c = 0` is refused statically; `=` of two `RR32` values still overflows.
  - `references/revival-changes.md:15` (row 1125, walk drops one of two generic dotted methods that differ only in their bounds): goes.
  - `references/interpreter.md:29` (row 1124, a numeral type written as a return, a variable's or a field's type loads): goes, or narrows to row 1135's bound and `typecase` arm.
  - `references/revival-changes.md:99`, "walk refuses `Byte(v)` ... write `Byte(v.asZZ32)`": goes.
  - `references/compiler.md:49`, `:50`, `:52` (rows 1091, 1099, 994 in "What the compiled path cannot compile yet"): go; the lead-in and its last line stay for rows 1098, 1101, 1102.
  - `references/interpreter.md:68` (row 780: "such a pair that breaks the rules loads, and a call can fail with 'Cannot find definition for method'"): false since G; rewritten or the example dropped.
  - `references/revival-changes.md:17` (row 780's example of a comparison at each call): the same; another row or none.
  - `references/revival-changes.md:36-43`: the plain trait type in the signatures now holds for a `comprises` trait too (fork K1, item 621); the writer judges whether a line is needed.
  - `references/revival-changes.md:99`, "A numeral whose number does not fit there is refused statically": not across components on the compiled path (row 1131), and a number at a call stays a `ZZ` compiled (row 1132); since `403a0e60cb` the writer adds no sentence for a new trap.
  - C's proposal for `references/compiler.md`'s list, rows 1137 and 1138: two new traps, which go to the coordinator, not into the skill.

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

By his rule of 2026-10-31; each decision, its reach and its requirement unchanged.
- C40, C41, P-174: old "Row 1124 holds where the tree departs: walk loading a numeral type written as a return type, a variable's or a field's type, which it refuses only where a numeral meets it. The tree departs too, with no row, where the numeral coercions of the one library and of many tests call a getter on the four numbers, as `v.asZZ32`, and where the checker and the literals chapter read each of the four as a `ZZ` value wherever it stands (F-342, F-345)."; new "Row 1135 holds where the tree departs: walk loading a numeral type written as a static parameter's bound or a `typecase` arm's type. The tree departs too on the compiled path, where a number at a call in a coercion's body runs the declaration that takes it as a `ZZ`, not a more specific one that its conversion reaches (row 1132), and where a numeral at another component's type, whose coercion converts a number that does not fit, is not refused statically (row 1131)."; decision unchanged. Ground: rung G closed row 1124 (`df5948e7b`); rung N's fork N2; rows 1131, 1132, 1135.
- C42, P-60, cut: "Rows 543 and 551: the compiled checker gives no call an intersection type where any declaration of the family has static parameters, and walk" becomes "Row 551: walk"; decision unchanged. Ground: row 543 closed (`da5f70777`).
- C43, P-45: "and fails at a call on such a pair" becomes "and stops at an extending object's first instance on such a pair"; decision unchanged. Ground: row 780.

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-36/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-36/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-36/orientation/sources-mapping.md` gives the provenance of what changed.
