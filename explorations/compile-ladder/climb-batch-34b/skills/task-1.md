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

Climb batch 34b. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-34b/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-34b/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- The skill: false, `SKILL.md:80`, `build-and-caches.md:73`, `tests-writing.md:52`, `compiler.md:45`; false or short, `interpreter.md:152`, `tests-running.md:14`, `:116`, `compiler.md:21`, `:32` and its list of what does not compile, `library.md:54`, `SKILL.md`'s "The compiled runtime", `tests-writing.md:94` (finding 2, with a cold read).

From `owed.md, "For the coordinator", its bullets that name the skill`:

- **The skill's sentences that the batch made false or short** (the review, Part 3, :264-284; RECORD, "Left for the coordinator and the skill writer", 1): false, on the record's list: `SKILL.md:80`, "a program compiled so does not run yet"; `references/build-and-caches.md:73`, "No compile writes the one library's jars yet ... (ledger row 1062)"; `references/tests-writing.md:52`, "Give a plain test there a `compile` command only ... (ledger row 1062)"; `references/compiler.md:45`, the varargs clause's reason (now row 1091). False or short, on no list: `references/interpreter.md:152`, a helper's raise string names the prelude's class (now the simple name, mapped by each set's `LibraryNames`; C17 is FACTS' half); `references/tests-running.md:14`, about 2,560 tests in 5 to 7 minutes (now 2,645, 11 minutes); `references/tests-running.md:116`, a run test of `one_library_tests/` needs the fourteen jars (`ant testOneLibrary`, or `OneLibraryComponents.test` first under `junit.sh`, or `FORTRESS_CACHES=$PWD/ProjectFortress/test-caches/fast-onelibrary`); `references/compiler.md:21`, `:32`, the payload classes under the selection and the second set first on the class path, a class that both sets hold edited in both; `references/compiler.md`, "What the compiled path cannot compile yet", rows 1098, 994, 1091, 1099, 1101, 1102 and 1100; `references/library.md:54`, the onelibrary track as a step for an edit of the fourteen; `SKILL.md`, "The compiled runtime", the payload classes under the one library too; `references/tests-writing.md:94`, step 2's first sentence limited to the path that the test checks (Part 1, finding 2), by the skill writer with a cold read, at the coordinator's judgement.
- **P-164's old and new words told to him** (C21; the `coordinator` skill's `SKILL.md`, "Quiet times"): a sentence that the tree made false, changed by the fewest words under his rule of 2026-10-31; his decision is unchanged.

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

- C22, P-33's history, noted: its block of 2026-11-18's ground, one set of run-time classes for both libraries, no longer holds; old and new words the same, "one build serving both (F-381)"; decision unchanged. Ground: the review, finding 6; F-396.
- No POSITIONS sentence changed: C21, P-164, held.

### The orientation update

Its admission admitted no entry, so its judge did not run, and the orientation has nothing to install. `/home/user/fortress/explorations/compile-ladder/climb-batch-34b/orientation/admission.md` names, for each entry not admitted, the part where it belongs.
