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

Climb batch 33. The landed record-landing run: `/home/user/fortress/explorations/compile-ladder/climb-batch-33/record-landing/`. The orientation update: `/home/user/fortress/explorations/compile-ladder/climb-batch-33/orientation/`.

### The skill sentences that the landing made false

From `diff.md, "For the coordinator", its bullets that name the skill`:

- C140 to C156: the skill writer's sentences in `fortress-repo` (the review, Part 3), and the entries writer's three terms and the property-alone warning.

From `owed.md, "For the coordinator", its bullets that name the skill`:

- C140 | home: `.claude/skills/fortress-repo/references/revival-changes.md:97` | kind: made false | weight: high | ground: the review, Part 3, 1 ("As a `typecase` arm, each takes every value, without a message (row 959)": refused, 'Int is undefined.', F-382; with finding 1's answer, "A binder over every value is written `x: Any =>`") | the batch: not done; no batch commit touched `.claude/` | the curator's word: no for the fact; the binder's sentence follows his answer on finding 1 | writer: none (the skill writer)
- C141 | home: `.claude/skills/fortress-repo/references/revival-changes.md:41-47` | kind: made false | weight: high | ground: the review, Part 3, 2 (the three shapes run, rows 1050, 1051 and 1052 fixed, F-377, F-385; what stays is row 1070, bind `self` at the target type in the arm; `MIN` and `MAX` need no declaration of one's own on that account) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C142 | home: `.claude/skills/fortress-repo/references/compiler.md:150` | kind: made false | weight: high | ground: the review, Part 3, 3 (row 812's crash: it compiles, F-384) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C143 | home: `.claude/skills/fortress-repo/references/compiler.md:117` | kind: made false | weight: high | ground: the review, Part 3, 4 (row 1060's conversion runs; at an untyped binding a `try` that ends in numerals is refused, row 1074, and a tuple binding of a `case` or a `try` of numeral tuples, row 1075) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C144 | home: `.claude/skills/fortress-repo/references/tests-writing.md:34` | kind: made false | weight: low | ground: the review, Part 3, 5 (`x[5]^2` compiles; walk still fails, row 1; `(x[5])^2` serves both paths) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C145 | home: `.claude/skills/fortress-repo/references/compiler.md:32` | kind: made false | weight: high | ground: the review, Part 3, 6 ("The compiled path uses the compiler's own prelude": unless `FORTRESS_LIBRARY=one`, F-381) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C146 | home: `.claude/skills/fortress-repo/references/compiler.md:159` | kind: made false | weight: low | ground: the review, Part 3, 7 (under the selection `useCompilerLibraries()` points `WellKnownNames` and `Types` at the one library, `Shell.java:377-388`) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C147 | home: `.claude/skills/fortress-repo/references/tests-running.md:14` | kind: made false | weight: low | ground: the review, Part 3, 8 (five tracks, the fifth `one_library_tests/` under the selection, about 2,560 tests; the misc track leaves `OneLibraryJUTest` out) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C148 | home: `.claude/skills/fortress-repo/SKILL.md:80` | kind: made false | weight: low | ground: the review, Part 3, 9 ("Each path has its own library today": by default; the compile command can select the one library, and a program compiled so does not run yet, row 1062) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C149 | home: `.claude/skills/fortress-repo/references/build-and-caches.md:64-71` and `:105-112` | kind: made false | weight: high | ground: the review, Part 3, 10 (the selection's caches folder `default_repository/caches-one`, the build's stamp and `ant cleanCache` over both folders) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C150 | home: `.claude/skills/fortress-repo/references/tests-writing.md:37-69` and `tests-running.md:115`, `:139-144` | kind: made false | weight: high | ground: the review, Part 3, 11 (a test of a wall that only the one library shows goes in `ProjectFortress/one_library_tests/`, run by `ant testOneLibrary` and by `testFast`); run 2's rungs W, G and R write tests there (the review's step 6) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C151 | home: `.claude/skills/fortress-repo/SKILL.md:98` | kind: stale | weight: low | ground: the review, Part 3, "False or short, on no list" (also `default_repository/caches-one/` under the selection) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C152 | home: `.claude/skills/fortress-repo/references/tests-writing.md:45` | kind: stale | weight: low | ground: the review, Part 3, on no list (a static error of the phases, as the disambiguator's, counts as a refusal at load too; F-383; `FileTests.java:875-878`) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C153 | home: `.claude/skills/fortress-repo/references/build-and-caches.md:91` | kind: stale | weight: high | ground: the review, Part 3, on no list (under the selection the caches folder holds no library jar, and a run fails, row 1062) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C154 | home: `.claude/skills/fortress-repo/references/compiler.md:74` | kind: stale | weight: low | ground: the review, Part 3, on no list (the class loader's choice of a call's opcode from the owner's class file, F-385; `MethodInstantiater.java:268-317`) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C155 | home: `.claude/skills/fortress-repo/references/compiler.md:103-135`, the traps of the compiled path | kind: stale | weight: high | ground: the review, Part 3, on no list (rows 1070, 1067, 1071 with `r: R = self` first, 1072, 559's closure route, 1074 and 1075) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C156 | home: `.claude/skills/fortress-repo/references/compiler.md:128` | kind: stale | weight: low | ground: the review, Part 3, on no list (row 964: walk stops on the same clause too, the row's note of this run) | the batch: not done | the curator's word: no | writer: none (the skill writer)
- C158 | home: `explorations/coordinator/tools/orientation/regression/key.md:454-466`, case 35 | kind: made false | weight: low | ground: the record, "Left for the coordinator and the skill writer" (its expected (b) and (c) name the failures of rows 1051 and 1052 and the `XXX` pair that rung Q promoted; both bodies run as plain tests now, `compiler_tests/SelfTypeArmRun`, `SelfTypeParameterReceiverRun`; case 36 was rewritten in D's commit) | the batch: not done; left to the orientation's next update, which runs the key's own programs | the curator's word: no | writer: none (the orientation update)
- C171 | home: the boot note (`explorations/coordinator/BOOT.md`) | kind: stale | weight: high | ground: run 1 landed at `d3747846c1`, its review at `a6e73b8d6c`; this record-landing runs; the steps due before run 2 (the review): 1, the batch's to-dos swept from the shared task list (tasks 33 to 37 were there at 22:34) and each decision named in one line; 4, the measure (C159); 5, run 2's sections (C160); 6, the skill step before run 2's launch; 7, his word on finding 1 (C82, C116); 8, the script's process finding 3 between the runs | the batch: not done | the curator's word: no | writer: none

From `entries-report.md, "For the skill writer"`:

- The selection's property alone, `-Dfortress.library=one`, breaks the run's pairing: the compile writes to `caches-one` and the run's class path reads `caches` (the review, section 2, S1). F-381 states only that the class path scripts follow the variable. The `fortress-repo` skill's build-and-caches part is the place for the warning (C149).

### The changed decisions of the curator, from `diff.md`, "POSITIONS"

- C59, P-12, made false: "checks a program only against the compiler's prelude, so it is no check of walk's programs" becomes "checks a program against the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library, so by default it is no check of walk's programs"; decision unchanged. Ground: F-9, F-381, row 69's note, `Shell.java:377-388`; his rule of 2026-10-31.

### The orientation update

Its judge ran: `/home/user/fortress/explorations/compile-ladder/climb-batch-33/orientation/judgement.md` gives each section's verdict, and `/home/user/fortress/explorations/compile-ladder/climb-batch-33/orientation/orientation.md` the judged text; `/home/user/fortress/explorations/compile-ladder/climb-batch-33/orientation/sources-mapping.md` gives the provenance of what changed.
