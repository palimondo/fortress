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

Climb batch 29b. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-29b/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-29b/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- owed.md's last section: the skill sentences, with row 971's trap and row 442's `3.0`; the POSITIONS to name; the asks; process findings 1, 3, 4; the workflow's misses; the sort's departures from the review.
- For the skill update: the cold reader's conflicts, `compiler.md` rows 961, 963, `interpreter.md` rows 966, 968. Not taken: F-58's `^`, F-79's prelude clause, F-169's "four numbers".

From `owed.md, "For the coordinator", its bullets that name the skill`:

- The skill sentences that the batch made false or incomplete, through the record-landing workflow's skill update (the review, Part 3, its 8; RECORD.md, "Left for the coordinator" and "Revival changes, for the skill writer", A and T; the record, section 6, "For the skill writer"): `fortress-repo`'s `SKILL.md:133` (a numeral coercion's four numbers are `ZZ`), `references/revival-changes.md:89` (five sentences, `(h = 0.5)` among them, row 973), `:91` (the getters and `coerce(x: IntLiteral)`), `:99` (the numeral types' `asFloat`), `references/interpreter.md:21`, `:23` (`NOT (u = 0)`), `:25` (row 968 closed), `references/compiler.md:65`, `:108`, `:109`, `:111`; and two lines on no list: `compiler.md`'s "Traps of the compiled path" for row 971 (bind a coercion's two calls to locals first) and for row 442's numeral half (write `3.0` at `RR64` and `RR32` until the switch-over, moot if he takes finding 2's (a)).

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

- C51, P-173, made false, cut only: ", or is a numeral type" goes; decision unchanged. Ground: P-174's written-only rule; `CLIMB-BATCH-29b.md`, "For the record-landing workflow".
- C52, P-174, made false: "Rows 969 and 970 hold the tree's run-time numeral with its four numbers as fields." becomes "Rows 960 and 974 hold where the tree departs: the digit count of `00.5`, and walk running a numeral type written as a static argument or as a type that an object or a trait extends."; decision unchanged. Ground: rows 969, 970 FIXED (`c6ef2f0b80`); rows 960, 974.
- C53, P-176, made false: "Rows 969 and 970 hold where the tree departs." becomes "Rows 957 and 971 hold where the tree departs: a place whose type names a type parameter, and a coercion that spawns a task."; decision unchanged. Ground: correction A.
- C54, P-76, made false: "give the type" becomes "gave the type"; decision unchanged. Ground: `a26e74f5c8`.
- C55, P-172, made false: "(P-174), which holds the numeral's exact value:" becomes "(P-174):"; "declares its `FloatLiteral` (`LibraryBuiltin/CompilerBuiltin.fss:996`)" becomes "declares it (`...:890`)"; decision unchanged. Ground: correction A.
- C56, C57, P-165, P-171, stale: "`numbers.tex:56-73`" becomes "`:58-75`", "`CompilerBuiltin.fss:510`" "`:509`"; "`constant.tex:118-122`" "`:129-133`"; decision unchanged. Ground: T's, A's hunks.
- C59 to C61, P-163, P-166, P-175, stale: "`FortressBuiltin.fss:598`" becomes "`:594`"; "`.fss:548`, `.fsi:200`" "`:544`, `:196`", "`FortressLibrary.fss:655`" "`:648`"; "`CodeGen.java:7062`" "`:7068`"; decision unchanged. Ground: A's hunks.

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-29b/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-29b/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-29b/orientation/sources-mapping.md` gives the provenance of what changed.
