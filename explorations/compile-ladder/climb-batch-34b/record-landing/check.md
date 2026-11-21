<!-- The record-landing workflow's check of the two writers' first round for climb batch 34b (base a1c244be3, landed at 295c215c2, the worktree at 00bde0ee4): for each change of owed.md, pass, or each failure by its class with the passage, the source that shows it and the correction. -->

# The check of climb batch 34b's record-landing, round 1

Read: `owed.md`; `entries-report.md`, `routing-report.md`, `record.apply`, `mech-1.md`; `git -C /home/user/fortress-landing-34b diff 00bde0ee4 -- explorations/ ':!explorations/coordinator/PLAN-history.md'`; the review `explorations/reviews/batch-34b-review.md` (sections 1, 2, 5, Part 4, Part 5); rung C's `REPORT.md`; ledger rows 1098 to 1103; the code at the worktree (`Utility.java`, `LibraryNames.java` of both sets, `FZZ32.java`, `StaticNativeApp.java:273-282`, `NamingCzar.java:606-626`, `OneLibraryJUTest.java:44`, `bin/fortress_classpath:25-39`, `ProjectProperties.java:282-290`). Totals at the end.

## FACTS, POSITIONS, their histories (writer: entries)

**C1** (F-34, the pass): pass.

**C2** (F-34, made false): pass. "No test checks the count" is gone; the gated test is named with its line (`OneLibraryJUTest.java:44` adds `OneLibraryComponents.test` first, checked); "No emitted class is run" is scoped to the script; the figures 0 and 754 on `f3439cf7ce` and `285efad802` and "Measured once on each code" stay.

**C3** (F-34, past 600): pass. 2693 to 1835; `ba3c7c876d`'s count and the patch's story are in the history block; kept by question 1, named in `entries-report.md`.

**C4** (F-53, weight none): pass. F-53 unchanged.

**C5** (F-240, weight none): pass. F-240's text unchanged.

**C6** (F-240's history, noted block): fail.
- fidelity. Passage: "the machine was climb batch 34's, an Intel Xeon at 2.10 GHz (climb-batch-34b/gate/summary.txt:74-80, the # machine lines)". Source: the two gates' `# machine` lines show only the same model line (`climb-batch-34b/gate/summary.txt:76` and `climb-batch-34/gate/summary.txt:76`, both "Intel(R) Xeon(R) Processor @ 2.10GHz"), and the review says "on the same CPU line" (section 5, :127). "The machine was climb batch 34's" says the same host, which no source shows. Correction: "the CPU line was climb batch 34's, an Intel Xeon at 2.10 GHz (...)".

**C7** (F-336, the pass): fail.
- fidelity. Passage: "Each raise makes a new instance, not the exception's singleton object (row 1103)." Source: row 1103 holds it of "an exception object without value parameters that a helper raises"; `FailCalled(s:String)` (`Library/FortressLibrary.fss:1978`) and the prelude's `IOFailure(s: String)` and `FileNotFoundException(s: String)` (`CompilerBuiltin.fss:1576`, `:1580`) have value parameters and no singleton, so "each raise ... not the exception's singleton object" is wider than its row. No change of `owed.md` owes this sentence (C7 owes the title). Correction: restore the old clause, "..., without the message (`:49-51`), a second instance of the object (row 1103)", or say the row's own scope in as few words: "An exception object without value parameters that a helper raises is a second instance of the object (row 1103)." Bring the provenance note in line.
- The title passes: "builds the exception of the library in use, with its message where the exception has a constructor over that library's `String`" is what `Utility.java:34-52` does.

**C8** (F-336, past 600): pass. The two libraries' lookups share one sentence; the entry grew by 21, less than the title that C7 owes; kept by question 2, named.

**C9** (F-352, the pass): pass. Unchanged, as `owed.md` gives.

**C10** (F-353, the pass): pass. "There" scopes the sentence to the scratch tree, and the clause on `main` is the "say what changed" that C10 names; +79.

**C11** (F-381, the pass): pass. The Detail gains rung C's "The tests: the failing runs on the base, the passing run", which exists (`REPORT.md:27`).

**C12** (F-388, the pass): pass. The Detail gains rung C's "The design as built (a point to report)" (`REPORT.md:17`).

**C13** (F-390, the pass): fail.
- fidelity. Passage, old: "There the index of each element, made by `FZZ32.make`, agrees with the array's `init`, since the one library's `ZZ32` is `FZZ32` in every descriptor (F-388, F-396): with the JVM's verifier off a varargs call's array reads back its elements, and with it on the array's class does not load ..."; new: "There a varargs call's array reads back its elements with the JVM's verifier off, since the one library's `ZZ32` is `FZZ32` in every descriptor (F-388); with the verifier on, the array's class does not load ...". C13 says the run sentence holds; the rewrite cut its claim that the indices agree with `init`, which is item 601's settlement (rung C's `REPORT.md`, "The run tests": "`FZZ32.make` at `CodeGen.java:8014-8015`, `:4676-4677` and `:4717-4718` agrees with the array's `init`"), and which item 601's move to part (a) (C66: "F-390") and `PLAN.md:72` (C38) cite F-390 for. Correction: as C14's.

**C14** (F-390, past 600): fail.
- coverage. C14 owes "the run's account (the verifier off and on) can shorten to the wall and its row"; the new text keeps the verifier-off account ("reads back its elements with the JVM's verifier off") and cut the index agreement instead, while `entries-report.md` names C14 done and the provenance note says "the run's account cut to the wall and its row". Correction, for C13 and C14 together: "There the index of each element, made by `FZZ32.make`, agrees with the array's `init`, since the one library's `ZZ32` is `FZZ32` in every descriptor (F-388, F-396); with the JVM's verifier on, the array's class does not load, since it holds `ImmutableArray1`'s `copy` twice (row 1091), so no program that calls a varargs declaration runs yet." The read-back with the verifier off goes to the report, which the Detail cites; the provenance note says so.

**C15** (F-396, the pass): fail.
- fidelity. Passage: the title, "The one library compiles to jars and runs on the compiled path, over a second set of run-time classes." Source: the body, "a program compiled against them runs with the JVM's verifier on, as `Hello` does", and its list of seven departures, each at a row; F-381 and Appendix I, worded by the skeptic to what runs, "can run, as one that prints a line of text does" (the review, section 1, `509181e9c3`). The title lets a reader conclude that the one library runs on the compiled path, past what the body shows. Correction: "The one library compiles to jars over a second set of run-time classes, and a program compiled against them can run on the compiled path, as one that prints a line does."
- The list passes: each departure matches the review's section 1 and its row (rows 1091, 1099, 1098 with its notes, 994, 1101, 1102, 1103; row 1100 in its own sentence).

**C16** (F-396, past 600): pass. The stamp, `bin/fortress_classpath` and `classesFirst` went to the report; growth is C15's rows.

**C17** (F-24, made false): pass. "where the helper raises one by its simple name, such as `DivisionByZero`, since walk reads the name in the class name that the class path's `LibraryNames` gives it" matches `simpleIntArith.java:43`, `Utility.java:34-36` and `StaticNativeApp.raised` (`:273-282`, the pattern `fortress.<Api>$<Name>`); +65, the owed clause.

**C18** (F-312, made false): pass.

**C19** (F-332, made false): pass.

**C20** (F-301, made false): fail.
- fidelity. Passage: "where `make` now calls the `make` of the library's value object through a method handle, F-388". Source: in F-301 "the library" is the interpreter's library, against the prelude ("The library's form and the prelude's allocate the same", the same entry), so the new words name the one library's object only, where `FZZ32.make` reaches the object that the class path's `LibraryNames` names: the prelude's by default, the one library's under the selection (`FZZ32.java:53`; `LibraryNames.java:26-33`; F-388). Correction: "where `make` now calls the `make` of the number's value object, the prelude's or under the selection the one library's, through a method handle, F-388".
- The line numbers pass: `FZZ32.java` is unchanged between `a1c244be3` and `295c215c2` and `make` is at `:40-48`; C20's `:39-47` was the sorter's error, which the writer reported.

**C21** (P-164, made false): fail.
- fidelity. Old: "At the switch-over, the run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits, and the boxed-type table's two entries and `fileOps`' raise strings name the one library's types." New: "Under the selection of the one library, and so at the switch-over, the run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits, and the boxed-type table's two entries name the one library's types; `fileOps`' raise strings name each exception by its simple name (F-336)." What he decided (the five I/O objects over Java-backed values of two traits) is the same; where it applies moves from the switch-over to the selection, which the tree built early by P-33's slice (`src-one/FJavaBufferedReader.java:21`; `NamingCzar.java:612-624`), as C21's ground allows. What it requires is not the same: the raise strings' requirement becomes the mechanism of fork C3, which landed at the planner's default for his review (the review, section 1, "The prelude's names at run (fork C3)"; item 617 holds C3), so the entry shows a default as his decision; the writer's own question to him says the same. Correction: keep the requirement's effect without the fork's mechanism: "Under the selection of the one library, and so at the switch-over, the run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits, the boxed-type table's two entries name the one library's types, and `fileOps`' raises build the one library's exceptions (F-336)." True of the tree (`fileOps.java:37` raises `FileNotFoundException` by simple name, mapped by `src-one/LibraryNames.java:43-45`; `OneLibraryCatchHelperRaises.test`); still told to him with the old and new words.
- form. The provenance cites the rule as "(HELD.md, "Held in chat (2026-10-31)")"; `HELD.md` holds no such heading (its headings run from 2026-11-19 back to 2026-09-27 with none of 2026-10-31; the section was cut by `1732c36710`), so the pointer resolves nowhere. `record.py check` does not read note text, so it did not report it. Correction: cite the rule as review-queue item 337 does, "his standing rule of 08:1x UTC on 2026-10-31, 'you don't need my approval to bring the record in line with reality'", with the commit that held it, `0476cd4396`.

**C22** (P-33's history, noted block): pass. The text is unchanged; the note's last clause names the second set as for the carried types other than the seven number types, as F-353 and F-396 hold.

**C23** to **C27** (weight none, writer none): pass. No line written; F-53, F-240, P-37, P-169, P-178 and the rows unchanged.

## PLAN, PLAN-history, the queue, INDEX and other notes (writer: routing)

**C28** (`PLAN.md:9`): pass. Climb batch 34b's walk check and demos cited; row 1099 added.

**C29** (`PLAN.md:10`): pass. The last gate is climb batch 34b's (`295c215c2c`, gate on `069237aaa4`); the two false clauses replaced; the batch's sentence and its review's section 1 named.

**C30** (`PLAN.md:11`): pass. `295c215c2c` dated 2026-11-21 01:11Z.

**C31** (`PLAN.md:12`): pass. The seven's form, item 521 built and open, item 513 in part (a).

**C32** (`PLAN.md:13`): pass. No time given for "Both runs", with the reason in the routing report; item 608 open at way 3 as landed; item 597 settled.

**C33** (`PLAN.md:57`): pass.

**C34** (`PLAN.md:58`, new): pass. The list's changes match the review's Part 5, items 1, 2, 3 and 5; rows 1099 and 1100 have their homes.

**C35** (`PLAN.md:64`): pass.

**C36** (`PLAN.md:65`): pass.

**C37** (`PLAN.md:70`): pass.

**C38** (`PLAN.md:71`): pass. Its pointer for the indices' agreement depends on F-390, which C13/C14's correction restores.

**C39** (`PLAN.md:72`): pass. Row 1100 is a verifier refusal ('VerifyError: Bad type on operand stack', ledger row 1100); "`FortressLibrary` 135 to 160 s and the fourteen about 300 s" matches rung C's `REPORT.md:77` and RECORD:125.

**C40** (`PLAN.md:73`): pass.

**C41** (weight none): pass.

**C42** (`PLAN.md:101`): pass.

**C43**, **C44** (weight none): pass.

**C45** (`PLAN.md:720`): pass.

**C46** (`PLAN.md:885`): pass.

**C47** (`PLAN.md:896`, moved): pass. Moved whole; its item's move names the landed change (`f6469d96ec`, `OneLibraryComponents.test`).

**C48** (`PLAN.md:903`): pass.

**C49** (`PLAN.md:905`, moved): fail.
- coverage. `plan-moves.py` lists `PLAN.md:907` to look at: "Forks N4, N6 and G3 are with review-queue items 601, 600 and 602" names item 601, which this routing moved to part (a) (C66). The line is neither moved nor rewritten, and neither `owed.md` nor `routing-report.md` gives the reason that it stays. Correction: "Fork N4 is item 601's, in part (a), settled by climb batch 34b's landing; N6 and G3 are with review-queue items 600 and 602", or a line in the routing report that the pointer stays because part (a) keeps item 601 under its number.
- The move itself passes: moved whole, settled by `f6469d96ec` (the routing report, "The moves to (a)").

**C50** (`PLAN.md:922`): pass. Way (3) as landed, taken by the coordinator, told at 19:5x UTC on 2026-11-20, held in climb batch 34b; it holds no launch and stays open for his review.

**C51** (`PLAN.md:926`): pass.

**C52** (`PLAN.md:928`): pass. "No default on record" kept; the review's proposal named as a proposal; item 616.

**C53**, **C54**, **C55** (`PLAN.md:929` to `:931`): pass. Items 617, 618 and 619.

**C56** (`PLAN.md`, new line after `:931`): pass. Item 620.

**C57** (PLAN-history, the new section): pass. Its head lists the lines moved whole, rewritten and added; `plan-moves.py` passes.

**C58** (item 616): pass. The question, "No default on record", the review's proposal, routine as `owed.md` gives it, "Needed by" from Part 5, item 2.

**C59** (item 617): pass. Default kept, as landed; routine by the review's section 2; "Needed by" Part 5, item 3.

**C60** (item 618): pass.

**C61** (item 619): pass.

**C62** (item 620): pass. "Needed by: no planned work (set by the landing workflow)".

**C63** (item 513 to (a)): pass. Built by `f6469d96ec`; "no part of it was his to decide".

**C64** (item 521): pass. Stays open; "built ..., as landed".

**C65** (item 597 to (a)): pass. Moot by the landed change, and "that was the record's default, not his word".

**C66** (item 601 to (a)): pass. Settled by `f6469d96ec`; its citation of F-390 holds once C13/C14 is corrected.

**C67** (item 608): pass. Stays open; "Needed by" loses "before or after run 2"; the head line at (3), as landed; the group's paragraph in line.

**C68** (items 384 and 411): pass. The 13 raises with a message of item 411 are `IOFailure`'s and `FileNotFoundException`'s (`FortressBufferedReader.java`, `FortressBufferedWriter.java`, `fileOps.java:37`, `:82`), which the one library declares without value parameters (`Library/FortressLibrary.fss:2064`, `:2068`), so "they reach it without their message" holds of all 13.

**C69** (the queue's head): pass. 270 open, 93 consequential, 177 routine, as `queue-check.py` gives; the groups' counts and paragraphs in line.

**C70**, **C71** (weight none): pass. INDEX.md unchanged.

**C72** (`map/compile-path-walkthrough.md`): fail.
- fidelity. Passage: "The run-time classes have two sets. The first set is built into `ProjectFortress/build` and serves the compiler's prelude. The second set is built from `ProjectFortress/src-one` into `ProjectFortress/build-one` and serves the one library". Source: F-396, "The run time's classes that name a library's types come in two sets under one set of names"; the second set is eleven classes and a stub of four traits (the review, section 1; `ls src-one/com/sun/fortress/compiler/runtimeValues/` lists 11); the first set's payload classes serve both libraries (rung C's `REPORT.md`, "The design as built": "In the first set, which both libraries run"; F-353, F-388). The note says every run-time class has two sets and the first serves only the prelude. Correction: "The run-time classes that name a library's types come in two sets under one set of names. The first is built into `ProjectFortress/build`, which both libraries run; the second, eleven classes, is built from `ProjectFortress/src-one` into `ProjectFortress/build-one` for the one library (`build.xml:852-872`)."
- The section 1 note and the glossary lines pass (`ProjectProperties.java:282-290`; `bin/fortress_classpath:25-39`, whose own comment says "its classes take the first set's names").

**C73**, **C74** (weight none): pass.

## The mechanical checks of `mech-1.md`

Every check passes; their information lines:
- words-subset.py on P-164, exit 1 (information): the words that C21's rewrite adds, since it is no cut; C21's fidelity failure above.
- lengths.py, nine already over 600 grew, each by its owed clause: F-24 +65 (C17), F-312 +73 (C18), F-332 +12 (C19), F-336 +21 (C7's title; its row-1103 sentence is C7's failure), F-353 +79 (C10), F-381 +115 (C11), F-388 +98 (C12), F-396 +232 (C15), P-164 +91 (C21).
- plan-moves.py LOOK `PLAN.md:12`, `:13`, `:73`, `:74`, `:96`, `:251`: each with its reason in `owed.md` (C31, C32, C39, C40, C41, C44).
- plan-moves.py LOOK `PLAN.md:907`: no reason on record; coverage, C49 (item 601's move, C66).
- record.py check, "reported: from 1": `POSITIONS-history.md:3666`, P-169's citation of a HELD.md heading, not of this landing (`owed.md`, "For the coordinator"); the new P-164 block's dangling citation is in note text, which the check does not read (C21, form).
- check-index.sh, two paths in prose that resolve nowhere: not of this landing; INDEX.md is unchanged.

## Totals

74 changes: 65 pass, 9 fail. Failures by class: fidelity 7 (C6, C7, C13, C15, C20, C21, C72), coverage 2 (C14, C49), form 1 (C21), routing 0.
