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

Climb batch 31. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-31/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-31/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- Skill update (`owed.md`, "For the coordinator"): false, `compiler.md:40`, `revival-changes.md:41` (C76), `gate.md:47`, `:49-54`; incomplete, `compiler.md:75`, `:106`, `:108`, `SKILL.md:124` and `:101`, `interpreter.md:18`, `:63-77`, `revival-changes.md` on dispatch and traits. To judge first: `tests-writing.md:85` (item 573).

From `owed.md, "For the coordinator", its bullets that name the skill`:

- The skill sentences that run 1 made false or incomplete, through this workflow's skill update (the review, Part 3; RECORD.md, "Left for the coordinator and the skill writer"). False: `references/compiler.md:40`, "`label` and `exit`, `spawn`, and `atomic` used as an expression" (only `spawn` stays, F-373, F-374); `references/revival-changes.md:41`, "A compiled body of `T` that returns `self` fails the JVM's verification when its class loads (row 695)" (it runs; rows 1050, 1051 and 1052 stand; judge-review.2, C76); `references/gate.md:47` and `:49-54`, twenty-two atomic programs where the list holds twenty-four. Incomplete: `references/compiler.md:75` and `SKILL.md:124`, "Parallelism and mutable state" (a `var` field is now a mutable variable in a cell that the object holds, every access checks `inATransaction`, row 641; F-374); `references/compiler.md:106` (a `finally` clause does not run when an `exit` leaves the `try`, row 890) and `:108` (a label block and an atomic expression as a call's later argument, row 322); the compiled traps of rows 340, 1039, 1041, 1043, 1053, 1038 with 573, 112, and 499 with 1046 and 1047; `references/interpreter.md:18` (row 1036) and `:63-77`, "What walk checks" (F-375; rows 1044, 550 and 1049); `references/revival-changes.md`, "Dispatch and overloading" (F-75, row 1048) and "Traits and objects" (F-372, row 1037; F-375); `SKILL.md:101`, whose quoted cache entry makes the harness attach `Library/FlatString.fss` to every agent that loads the skill (process finding 6).
- A change of a rule's meaning for the coordinator to judge before the skill writer takes it: `references/tests-writing.md:85`, the second way of "How a defect is recorded", for a defect that no gated test holds in every order of the suite (the review, Part 3; judge-gate.1, C67).

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

No entry changed (C22).

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-31/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-31/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-31/orientation/sources-mapping.md` gives the provenance of what changed.
