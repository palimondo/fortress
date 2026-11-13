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

Climb batch 30. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-30/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-30/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- For the skill writer: "rung", "root task" and "springboard" are not in the `fortress-repo` skill.

From `owed.md, "For the coordinator", its bullets that name the skill`:

- The skill sentences that the batch made false or incomplete, through the workflow's skill update (the review, Part 3; RECORD.md, "Left for the coordinator and the skill writer" and "Revival changes, for the skill writer"): `fortress-repo`'s `references/compiler.md:106` (the outer `try`'s `catch` matched first, row 888), `:109` (a numeral coercion that spawns a task, row 971; what holds is F-348), `:110` (`r: RR64 = 3` refused; a `ZZ32` value is still refused); `references/interpreter.md:20` (row 958), `:24` (row 967; row 980 where nothing fixes a type), `:25` (row 974; row 981); `references/revival-changes.md:89` ("Walk gives `Infinity` for the second (row 967)", and 'Type mismatch binding' for a top-level binding only); `references/gate.md:47-51` (fourteen atomic programs, now twenty-two). Incomplete: `revival-changes.md:95` ("Ambiguous coercion", F-349); `tests-writing.md:137` (a parallel test under walk needs a range longer than 16); `compiler.md`, "Traps of the compiled path" (forked arguments, a variable written before a `throw` in `atomic`, row 322); a timing note on the 40 ms start.

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

- C18, P-175, made false: "and splits down to single elements (`…:1308-1342`); the code generator evaluates a call's arguments in order (F-19, row 951), under the team's comment … (`CodeGen.java:7068`), so every `SUM` … would run … once compiled programs run …" becomes "and split down to single elements when the curator decided (`…:1312-1350`); the code generator evaluated …, under the team's comment …, so every `SUM` … would have run … once compiled programs ran …"; "does not do (`CodeGen.genParallelExprs` joins on the normal path only, row 947; …)" becomes "did not do (`CodeGen.genParallelExprs` joined on the normal path only; …); F-350 gives what it does now"; decision unchanged. Ground: `76b21f4981`; rows 947, 951 closed.
- C19, P-174, made false: "Rows 960 and 974 … and walk running a numeral type written as a static argument or as a type that an object or a trait extends" becomes "Rows 960 and 981 … and walk running a numeral type written in a `comprises` clause"; decision unchanged. Ground: row 974 closed, `f36a651243`; row 981.
- C20, P-176, made false: "Rows 957 and 971 hold … a type parameter, and a coercion that spawns a task" becomes "Row 957 holds … a type parameter"; decision unchanged. Ground: row 971 closed, `f36a651243`.

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-30/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-30/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-30/orientation/sources-mapping.md` gives the provenance of what changed.
