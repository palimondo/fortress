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

Climb batch 34. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-34/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-34/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- The skill (owed.md): `compiler.md:53`, `:55` and "The checker's gaps"; `revival-changes.md:32`, `:43`; `sources.md:890`, `:954`; F-395 in `interpreter.md`, "Natives", at the writer's judgement.

From `owed.md, "For the coordinator", its bullets that name the skill`:

- **The skill's sentences that the batch made false or short** (the review, Part 3; RECORD, "Left for the coordinator and the skill writer"): `fortress-repo`'s `references/compiler.md:55`, false: the partial call of an overloaded function of the component compiles (F-325); the refused partial forms are a functional method, an assumed receiver, a dotted call's argument and a dispatch that would hold a functional method, with the old message, and a generic declaration below the resolved one with 'Can't compile a type assumption at some arguments but not all of a call that a generic declaration can take yet'. `references/compiler.md:53`, short, the same form. `references/compiler.md`, "The checker's gaps", short: the getter's Return Type Rule (F-394), and rows 1093, 1094 and 1097. `references/revival-changes.md:43`, short: the Return Type check of a dotted method below a self-typed trait reads `T[\X\] & X` (row 1094). `references/revival-changes.md:32`, short: a getter redeclared at the same parameter types is checked (F-394). `references/sources.md:890` and `:954`: `Library/FlatString.fss:45` and `:121-128` are now `:43` and `:119-126`. `references/interpreter.md`, "Natives" (`:115-145`): none false; a line on F-395 at the writer's judgement.

From `entries-report.md, "For the skill writer"`:

Nothing new from these entries. The skill's sentences that the batch made false are in owed.md, "For the coordinator".

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

- C24, P-102's history, noted: his words of 15:49:11 UTC on 2026-11-18, "you should be writing the test case, state what the expected failure is, then run it ...", and his question whether the skeptic can check it, the manual's fallback named as not his. Old and new words of P-102: the same; decision unchanged. Ground: the review, "The finding for the curator"; `HELD.md`, "Held in chat (2026-11-18)"; his message by `show.py`.
- No POSITIONS sentence changed (C25).

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-34/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-34/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-34/orientation/sources-mapping.md` gives the provenance of what changed.
