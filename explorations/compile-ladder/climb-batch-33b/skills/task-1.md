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

Climb batch 33b. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-33b/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-33b/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- C102 to C110: the skill writer's sentences in `fortress-repo` (the review, Part 3).
- C115: the boot note: run 2 landed, its review `8c13a52ec6`, the measure `3fbce96856`; this run, the orientation update, the skill step, C111's worker; the batch after waits for its plan, item 597.

From `owed.md, "For the coordinator", its bullets that name the skill`:

- C102 | home: `.claude/skills/fortress-repo/references/revival-changes.md:89` | kind: made false | weight: high | ground: the review, Part 3, 1 ("The compiler's prelude declares no `QQ`, and still declares the other seven as traits that a type can extend (row 1003). So the checker accepts such an object, and the object dies when its class loads (row 866)": the prelude declares the seven as value objects, F-388, and the compile refuses such an object, 'Invalid type in extends clause: ZZ32'); the record, "Left for the coordinator and the skill writer", rung N's two | the batch: not done; no batch commit touched `.claude/` | the curator's word: no | writer: none (the skill writer)
- C103 | home: `.claude/skills/fortress-repo/SKILL.md:94` | kind: made false | weight: low | ground: the review, Part 3, 2 ("`RR64` is the class `FRR64`": an `RR64` value's class is `fortress.CompilerBuiltin$RR64`, which extends the payload class `FRR64`; descriptors name `FRR64`, F-388) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C104 | home: `.claude/skills/fortress-repo/references/compiler.md:21` | kind: made false | weight: low | ground: the review, Part 3, 3 (`FZZ32` and `FRR64` are payload classes now, abstract over `FValue`, under the code generator's object classes) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C105 | home: `.claude/skills/fortress-repo/references/compiler.md:34` | kind: built | weight: high | ground: the review, Part 3, 4 ("a brief may ask to declare each built-in number type as one `value object`": done for the prelude, F-388; the one library's seven wait for fork N4) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C106 | home: `.claude/skills/fortress-repo/references/compiler.md:36-47`, "What the compiled path cannot compile yet" | kind: stale | weight: high | ground: the review, Part 3, 5 (a built-in number type named as a value, row 1082; against the prelude a varargs declaration refused, 'Can't compile VarArgs yet: the library in use, CompilerLibrary, declares no ImmutableArray, ...', and under the selector compiled, except an overloaded varargs method or generic varargs function, row 1086); the record, "Left for the coordinator and the skill writer" | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C107 | home: `.claude/skills/fortress-repo/references/compiler.md:50-55`, the type assumption's refused forms | kind: stale | weight: high | ground: the review, Part 3, on no list (a fourth form, row 1088, 'Can't find the body that ... gives ...'; at an assumption of an imported api's trait the trait's body runs, also over an object's override, F-391) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C108 | home: `.claude/skills/fortress-repo/references/compiler.md:103-140`, the traps of the compiled path | kind: stale | weight: high | ground: the review, Part 3, on no list: the prelude `String`'s placeholder comparisons at an assumption answer `false` (C44's row); beside `:120`, a `typecase` clause at a type that the selector's static type excludes refused as unreachable (row 1081); a tuple expression at a parameter of type `Any`, 'Error trying to close method scope', bind it first (row 1080); a function argument coerced to an arrow type of no parameters dies when called (row 1084); a spread argument dropped on both paths (row 1085); `RR64[n,n]` at a declared return type crashes the checker under the prelude (row 1087) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C109 | home: `.claude/skills/fortress-repo/references/revival-changes.md:103` | kind: stale | weight: low | ground: the review, Part 3, on no list (walk does not convert a function argument by an arrow coercion, 'Unification error', row 1083; F-128) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C110 | home: `.claude/skills/fortress-repo/references/revival-changes.md:89`, its sentences on walk | kind: stale | weight: low | ground: the review, Part 3, on no list ("With item 1, both paths refuse such an object, so the sentence on walk can state both") | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C115 | home: the boot note (`explorations/coordinator/BOOT.md`) | kind: stale | weight: high | ground: run 2 landed at `ba3c7c876d`, its review at `8c13a52ec6`, the measure at `3fbce96856` (1 refused); this record-landing runs, then the orientation update (C112, C113) and the skill step (C102 to C110); the code worker for C111; the batch after climb batch 33 waits for its plan (the review, Part 5; item 597 needed then) | the batch: not done | the curator's word: no | writer: none
- C119 | home: the batch script's commit stage, `climb-batch-workflow.js:1599` | kind: stale | weight: high | ground: the review, process finding 3 and section 7 (the script pushes the three refs one at a time, against `fortress-repo`'s `git push --atomic`; the script gives the skill's one atomic command, and its retry repeats that command whole) | the batch: not done | the curator's word: no | writer: none
- C124 | home: the batch practice, the review's process findings 8 and 9 | kind: stale | weight: none: finding 8 proposes no change (a cold launch reads its skill and briefing again), and finding 9 gives run 1's findings' status, each one of findings 1, 2 and 4 here or held | ground: the review, Part 2, "Process findings" | the batch: n/a | the curator's word: no | writer: none

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

- C40, P-33, made false: "one build serving both by a second set of the run time's value classes (F-353)," becomes "one build serving both (F-381),"; decision unchanged. Ground: F-381's one set of run-time classes; F-388 (rung N, `75f9f2fbf`); the review, Part 1; his rule of 2026-10-31.
- C41, P-178, made false: "the compiler prelude's open trait lets a program's object extend `ZZ32` ... (row 866, such a program compiles and dies when it runs)" becomes "... let ... (row 866, such a program compiled and died when it ran)"; decision unchanged. Ground: row 866 fixed, `75f9f2fbf`; F-388.

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-33b/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-33b/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-33b/orientation/sources-mapping.md` gives the provenance of what changed.
