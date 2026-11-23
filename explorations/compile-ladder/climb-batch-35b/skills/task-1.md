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

Climb batch 35b. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-35b/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-35b/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- Held C8 and C9: run each again or leave it. C9's round-1 text grew +176, under its clause. F-404 keeps its clause on `references/worktrees.md:45`: once the skill update rewrites that sentence, cut the clause alone (C8, 1,169), or rewrite F-404 when `seed-worktree.sh` copies `build-one`.
- The skill (owed.md, "For the coordinator"): false, `references/revival-changes.md:57` (row 184), `references/interpreter.md:82` (row 1057), `:80` (row 1058), `:29` (row 981, to row 1124's three forms), `references/compiler.md:174` (row 1053), `:172` (row 815), `references/worktrees.md:45` (F-404); short, `references/revival-changes.md:15` (row 1125; F-253, F-26); the cold reader adds `references/worktrees.md:36`, "runs walk and the compiled path right away", false in F-404's case.

From `owed.md, "For the coordinator", its bullets that name the skill`:

- **The skill writer's list** (the review, Part 3; RECORD, "Left for the coordinator and the skill writer" and "Revival changes, for the skill writer"; CB35, "For the skill writer", after run 2). False or needless, on the record's list: `references/revival-changes.md:57` (row 184, rewritten: the one library declares `≡` and `≢` over two booleans, top-level); `references/interpreter.md:82` (row 1057), `:80` (row 1058) and `:29` (row 981, goes or narrows to the three forms of row 1124); `references/compiler.md:174` (row 1053) and `:172` (row 815), the list at `:171-174` keeping row 839's item in M's skeptic's text (RECORD, "Left for the coordinator"). False, on no list: `references/worktrees.md:45`, "Without the warning, `ant compileAll` keeps the seeded caches" (F-404; C8 moves the clause out of F-404). Short, on no list: `references/revival-changes.md:15`, "Walk chooses by declared parameter types, never by the order of the declarations" (row 1125; C11, C12). Since `403a0e60cb` the writer adds no sentence for a new trap.

From `entries-report.md, "For the skill writer"`:

- F-404's cut clause: `references/worktrees.md:45` says that `ant compileAll` keeps the seeded caches without the script's warning. That is false while `seed-worktree.sh` does not copy `build-one`. This is already on the coordinator's list.

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

- C13, P-174, made false: old "Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause. The tree departs too, with no row, where ..."; new "Row 1124 holds where the tree departs: walk loading a numeral type written as a return type, a variable's or a field's type, which it refuses only where a numeral meets it. The tree departs too, with no row, where ..."; decision unchanged, its reach and its requirement too. Ground: rung L (`5c31f2b68a`) closed row 981 (`NumeralTypeComprisedWalk`, 'Saw expected refusal at load'); row 1124's claim; L's report, "P-174's sentences on row 981"; his rule of 2026-10-31.

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-35b/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-35b/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-35b/orientation/sources-mapping.md` gives the provenance of what changed.
