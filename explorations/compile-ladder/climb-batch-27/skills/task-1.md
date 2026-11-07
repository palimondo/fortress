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

Climb batch 27. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-27/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-27/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- owed.md's last section: the skill sentences made false; the orientation update; the six POSITIONS changes to name to him; process findings 1 to 9 and F (1 recurred here); the crash probe only in the scratchpad; the workflow's stale test missed the built lines.

From `owed.md, "For the coordinator", its bullets that name the skill`:

- The skill sentences that the batch made false, through the record-landing workflow's skill update (the review, Part 3): `fortress-repo`'s `references/interpreter.md:93-96` (the writer trait's carrier; F-330), `references/tests-writing.md:32` (a value object compares field by field; F-326), `references/compiler.md:62` (the `value` mark; F-326), `references/compiler.md:36-44` (`asif` compiled, its three refused forms, with `dad6b664d`'s two generic refusals, RECORD.md's G item; F-325), `references/compiler.md:174` (the count stage about 80 to 180 s; F-240), `references/revival-changes.md:80` (the box prints `Box[\ZZ32\]`; and "Numbers" for P-165's pairs of `=` and P-168's `SEQV`); the copy at `references/sources.md:1072`, 'a', not 'this'.
- The `cloud-container` skill's `references/machine.md:14` (what filled the disk: the worktrees' `test-caches` and `tmp/`, the main tree's `tmp/`, the pip and uv caches, the git object store), by the coordinator's own skill writer (the review, Part 3, item 7).

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

- C30, P-160, made false: "goes", "is removed ... `.fsi`;", "gets", "leave", "lean", "are repaired" become "went", "was removed ... `.fsi` (F-324);", "got", "left", "leaned", "were repaired"; decision unchanged. Ground: `a97d60dc6`.
- C31, P-163, made false: `:615` becomes `:665`, `:460-464` becomes `:460-466`; "Row 861, the two paths' different texts, closes with `--settled` when this lands, and F-308's last clause, F-299's count of 306 and F-32's count of 143 each change by one then." goes; decision unchanged. Ground: `fc860b655`; row 861 closed; C18, C19, C21.
- C32, P-165, made false: "climb batch 27's rung chooses its form as a fork with a default, which its review list shows." becomes "its form is the default of a fork on his review list: the norm at each of the eight number types, each by its own `asFloat` (F-324)."; "changes with the rung." becomes "follows (`Specification/basic-lib/numbers.tex:46-54`)."; decision unchanged. Ground: `CLIMB-BATCH-27.md:428`, `:519`; `a97d60dc6`.
- C33, P-166, made false: "(`...:664`), a plain object today, becomes a `value object` too (row 911, the two declarations that disagree)." becomes "(`...:648`) is a `value object` too."; ", in the rung that fixes what `SEQV` means (P-162)" goes; decision unchanged. Ground: `598331c0d`; row 911.
- C34, P-167, stale: "and the compiled stack overflow" becomes "and, once the compiled path reads the one library, the compiled stack overflow"; "; the rung works out the way" goes; decision unchanged. Ground: `5ae581c4a`; row 321.
- C35, P-168, made false: "(rows 906 to 908)" becomes "(rows 906 and 907; the prelude's own `===` keeps row 908 until the switch-over)"; "The rung's first test is a program with a `value object CC64`, run on both paths beside the review's 14 cases." becomes "A program with a `value object CC64` tests it on both paths beside the review's 14 cases (F-326)."; decision unchanged. Ground: `598331c0d`; rows 906 to 908.

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-27/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-27/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-27/orientation/sources-mapping.md` gives the provenance of what changed.
