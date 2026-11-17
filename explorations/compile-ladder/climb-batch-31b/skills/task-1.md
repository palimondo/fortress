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

Climb batch 31b. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-31b/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-31b/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- Skill update (C158 to C169): false, `compiler.md:22`, `:99`, `:112`, `interpreter.md:81`, `:121`, `:127`, `:141`, `:147`, `library.md:39`; incomplete, `revival-changes.md`, "Numbers", and two more; the cold reader met them at F-375, F-379, F-380.
- Between batches: the script's `.claude/` check (C171); this workflow beside a batch (C172); the gather (C174, C175); the estimate (C176); the check before launch (C177).

From `owed.md, "For the coordinator", its bullets that name the skill`:

- C158 | home: `.claude/skills/fortress-repo/references/compiler.md:22` | kind: made false | weight: low | ground: the review, Part 3, 1 (`Int.java`, `Long.java` are `ZZ32.java`, `ZZ64.java`) | the batch: not done; no batch commit touched `.claude/` | the curator's word: no | writer: none (the skill writer)
- C159 | home: `.claude/skills/fortress-repo/references/compiler.md:99` | kind: made false | weight: low | ground: the review, Part 3, 2 (the rewriter's `UnsignedLong` clause is gone, `BuiltinPrimitiveRewriter.java:189`; three types, `NN32`, `NN64`, `Char`) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C160 | home: `.claude/skills/fortress-repo/references/compiler.md:112` | kind: made false | weight: high | ground: the review, Part 3, 3 (both blocks run now, rows 1014 and 1030 fixed; what stays is the untyped binding, row 1060; declare the binding's type) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C161 | home: `.claude/skills/fortress-repo/references/interpreter.md:81` | kind: made false | weight: low | ground: the review, Part 3, 4 (row 550 fixed; the rule's first half holds for a program's own trait that comprises one object) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C162 | home: `.claude/skills/fortress-repo/references/interpreter.md:121` | kind: made false | weight: low | ground: the review, Part 3, 5 (`RR64` alone in `double`) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C163 | home: `.claude/skills/fortress-repo/references/interpreter.md:127` | kind: made false | weight: low | ground: the review, Part 3, 6 (the five are the objects now; the bullet has nothing left to name, F-379) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C164 | home: `.claude/skills/fortress-repo/references/interpreter.md:141` | kind: made false | weight: high | ground: the review, Part 3, 7 (a program's object that extends `ZZ32` is refused at load, 'Attempt to extend object type ZZ32'; the rule holds for `JavaBufferedWriter`, row 928) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C165 | home: `.claude/skills/fortress-repo/references/interpreter.md:147` | kind: made false | weight: low | ground: the review, Part 3, 8 (`ZZ32.overflow()` in `ZZ32.java`) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C166 | home: `.claude/skills/fortress-repo/references/library.md:39` | kind: made false | weight: low | ground: the review, Part 3, 9 (`RR64`'s own bindings, `Library/FortressLibrary.fss:540-547`) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C167 | home: `.claude/skills/fortress-repo/references/revival-changes.md`, "Numbers" | kind: stale | weight: high | ground: the review, Part 3, "Incomplete" (seven of the eight number types are value objects in the one library; a program's own number type extends `Number`; an object below one of the seven is refused at load, F-379; the prelude keeps open traits until fork H2, row 1003) | the batch: not done | the curator's word: no | writer: none (the skill writer, through the orientation update)
- C168 | home: `.claude/skills/fortress-repo/references/interpreter.md`, "What walk checks" | kind: stale | weight: low | ground: the review, Part 3, "Incomplete" (rows 697, 1044 and 1058 at the five types; row 1057; row 959's arms at the removed names) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C169 | home: `.claude/skills/fortress-repo/references/compiler.md`, the traps of the compiled path | kind: stale | weight: low | ground: the review, Part 3, "Incomplete" (rows 1054 to 1056; rows 1059 and 528 until the switch-over, `NOT (r = 0)` at `RR64`; F-378 for a reader of a `VerifyError` at a tuple parameter) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C171 | home: the batch script, `explorations/coordinator/climb-batch-workflow.js:1430` and `:1949` | kind: stale | weight: high | ground: the review, process finding 1 (the `.claude/` check and the footers' check read every commit since the base, not the batch's own; six false `skill-touched` items) | the batch: not done | the curator's word: no, the coordinator's between batches | writer: none
- C172 | home: the record-landing workflow beside a running batch, and the boot note | kind: stale | weight: low | ground: the review, process finding 2 (agents read two versions of the skill, one a mix) | the batch: not done | the curator's word: no | writer: none

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

- C80, P-68, made false, cut only: ", but `ZZ` in the `FortressLibrary` component's `trait RR64`" goes; decision unchanged. Ground: `Library/FortressLibrary.fss:548`, one `round(self):ZZ64`; no `trait RR64`.
- C81, P-166, made false: "`value object BigNum extends ZZ` (`LibraryBuiltin/FortressBuiltin.fss:544`, `.fsi:196`)" becomes "`value object ZZ` (`Library/FortressLibrary.fss:1170`)", and `Ratio`'s ":649" becomes ":719"; decision unchanged. Ground: `f6e24650e7`; both lines checked.
- C82, P-162, made false: "`Float`'s power", "`Float`'s floor and ceiling brackets", "the mixed powers of `Float` and `RR32`" become `RR64`'s; decision unchanged. Ground: F-303, F-323.
- C83, P-165, made false: "`Float`'s `^` at a `Number` exponent" becomes "`RR64`'s"; decision unchanged. Ground: F-323.
- C84, P-163, made false: "`FortressBuiltin.fss:594`" becomes ":409"; decision unchanged. Ground: `:409` holds `simpleChar.charToExprString`.

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-31b/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-31b/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-31b/orientation/sources-mapping.md` gives the provenance of what changed.
