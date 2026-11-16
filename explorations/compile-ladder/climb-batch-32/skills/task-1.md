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

Climb batch 32. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-32/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-32/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- The skill sentences made false or incomplete: `owed.md`, "For the coordinator", first point; and `references/library.md` on row 731, which F-59 and F-364 now contradict.

From `owed.md, "For the coordinator", its bullets that name the skill`:

- The skill sentences that the batch made false or incomplete, through the workflow's skill update (the review, Part 3; RECORD.md, "Left for the coordinator and the skill writer" and "Revival changes, for the skill writer"). False: `references/revival-changes.md:115` ("Only walk infers the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`", row 731; what holds is rows 1008 and 1007), `references/library.md:25` (the same), `references/revival-changes.md:105` and `references/interpreter.md:22` (`u = 0` is `false` under walk, rows 973 and 966; what holds is row 1016), `references/revival-changes.md:101` (the tie only where the declarations differ at the numerals' positions), `SKILL.md:134` ("A conversion never changes which declaration runs when one already fits": a numeral's own does). Incomplete: `references/compiler.md:36-42` (a top-level tuple binding compiles; a reference to a generic function at an arrow type compiles, row 1012 at `Any`), the compiled traps of rows 1014, 1030 and 1011, `references/interpreter.md:14` (rows 1018 to 1021) and its departures (rows 1026, 1024, 1025), the syntax of `p.wq^T`, `(f(x))^T`, `(x[5])^2` and the signs, and `references/gate.md` (row 1004's race).

From `entries-report.md, "For the skill writer"`:

- The detail that left F-366: walk keeps each choice of a numeral's declaration in its dispatch cache, except a choice that asked a type of a program's own for its numeral coercion; the cache's key tells a negative constant from a numeral of the same default. The rung's report holds it. `references/interpreter.md` does not.

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

- C23, P-78, made false: "The compiled checker fixes it from neither the generators, the body nor a declared type that receives the value, and refuses every such `SUM` or `PROD` that leaves it out (row 731, a gap of the checker). Row 731's workaround is to write it in every clause form of `SUM` and `PROD`, as in ..." becomes "The compiled checker fixes it from the reduction's expected type, else from the type of its body, where a `SUM` or `PROD` leaves it out (F-364). It is written as in ..."; decision unchanged. Ground: row 731 FIXED, `d159b71975`.
- C24, P-79, made false, cut only: ", and the reductions that leave out the static argument of a big operator whose bound names its own static parameter, such as `SUM`; their repair writes the argument (row 731)" goes; decision unchanged. Ground: row 731 FIXED.
- C25, P-46, made false, cut only: "Rows 973 and 966: walk answers `false` for `u = 0`, and `true` for `u =/= 0`, which follows `=`." goes; decision unchanged. Ground: both rows FIXED, `b190b8eb25`.
- C26, P-173, made false: "rows 973 and 966 hold where walk departs" becomes "row 1016 holds where walk departs, and row 1017 where both paths do"; decision unchanged. Ground: rows.md.
- C20, P-166, a citation: `Library/FortressLibrary.fss:648` becomes `:649`; decision unchanged. P-154 keeps its line: its citations name a commit.

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-32/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-32/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-32/orientation/sources-mapping.md` gives the provenance of what changed.
