<!-- The combined post-batch review of climb batch 34, run 2, which the record calls climb batch 34b, of `coordinator/CLIMB-BATCH-34.md`: the one library compiled to jars over a second set of run-time classes, its built-in types carried over payload classes, the run time's prelude names made to follow the library in use, and `Hello` run against it in the gate with the JVM's verifier on (one rung, C, landed at `295c215c2c` on 2026-11-21 on the curator's go of 14:3x and 14:5x UTC on 2026-11-20, every fork at the planner's default, fork C3 built in the second set only; run `wf_c13d405d-3be`, every agent on Opus, no ruling, no repair, one green gate; the first batch under the rule that the `Expected failure:` line is echoed in the Bash call that first runs a test), by a review worker reading only: the landed change against P-178, P-33, P-37, P-164, P-169, F-353 and F-388, what of P-178 and of the switch-over is not built, what the two paths still do differently, forks C1 to C6 and the run's eight items for the curator, row 1098's export rule with the team's sources, the rule's new form call by call, the programs that now run and F-34's count, the gate, the cost in three spans and by role against the estimate, the briefing's use, re-measuring, two events, the practice's measures, the misses, the skill writer's list, the record's sentences made false, the routing, the list for the batch after, and a section for the curator that shows the change on a small program. -->
<!-- Base `a1c244be36c0c79f2f478b6e56a9769bd756fedb`, base build `/home/user/fortress-base41` at `285efad802`; launched 22:04:45 UTC on 2026-11-20 (the coordinator's Workflow call; the disk check's first record 22:04:47); landed on `main` as C `f6469d96ec`, the closes `d9807a4077`, the gather's record `069237aaa4`, the review's corrections `11ac1ddf75` and the gate's tables `295c215c2c` (01:11:55), pushed by the commit stage in one atomic push at 01:12:11 with no hold; 7 agent transcripts, 7 starts and 7 results in the journal. Read against `main` at `99951e0d0e`, whose one commit after `295c215c2c` is the coordinator's boot note. Sources for the decisions: P-178 with its seven history blocks, P-33 with its fourteen, P-37 with its twelve, P-164 with its four, P-169 with its five, F-353 with its six, F-388 with its two, P-158; review-queue items 513, 521, 597, 601 and 608. The gate's result is cited as its agent returned it and was not run again. The measures are `batch-measures.py`'s on the run's directory, `spend.py` over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/batch34b/rev34b/ (copied from the review of run 1: tx.py, calls_mod.py, onecall.py, expfail.py, brief.py, brief2.py, skill.py, usertext.py, attach.py, taskrem.py, runs3.py, mainw.py, firstmsg.py; new: grepres.py). Tokens are writes only (input plus cache creation, one count per message id). Besides reading, this review ran only those scripts, facts-extract.sh, grep, sed, git (log, show, diff, reflog, worktree list, one `git log --all -S` for the export check's history), which write nothing in the tree. It ran no build, suite, stage, JVM or Fortress program. -->

# Climb batch 34b: one of one rung, the one library compiled to jars in the gate and `Hello` run against it with the verifier on; six walls behind it filed as rows; the count and the distance still 0 at a green first gate; a run of 2.10M, 12 % under its estimate; every first run of a test carried its `Expected failure:` line

## What came up in this run

### 1. The landed change against the decisions, path by path

Lines are `main`'s at `295c215c2c`. Java paths are under `ProjectFortress/src/com/sun/fortress/`; `src-one/` is `ProjectFortress/src-one/com/sun/fortress/compiler/runtimeValues/`. One rung, so no order and no shared file; every hunk applied cleanly (`compile-ladder/climb-batch-34b/RECORD.md`, "Conflicts"). The landed code is the worker's `f3439cf7ce`: `git diff --stat f3439cf7ce 295c215c2c -- ProjectFortress/src ProjectFortress/src-one build.xml bin Library ProjectFortress/LibraryBuiltin ProjectFortress/one_library_tests` lists only the skeptic's eleven test files.

**C, the first program compiled and run against the one library (rows 874 and 1062 closed; rows 1098 to 1103 opened; rows 994, 995, 1091, 1017 and 1079 rewritten; F-396 added; F-34, F-352, F-353, F-381, F-388 and F-390 rewritten by the gather, F-336, F-353 and F-396 by the review). Forks C1, C2, C5 and C6 built as the plan says; C3 and C4 built in another form (section 2).**
- The second set (fork C2): `src-one` holds eleven classes and a stub of four of the one library's traits (`ProjectFortress/src-one/fortress/FortressLibrary.java:11-43`), 492 lines. `ant compileAll` compiles them into `ProjectFortress/build-one` after the first set, and whole again when the first set changed (`build.xml:852-872`); the implementation's stamp and the sources' fingerprint cover both folders (`build.xml:402`, `:451`, `:470`); `ant clean` deletes it (`:337`). `bin/fortress_classpath:27-39` puts `build-one` first where `FORTRESS_LIBRARY=one`, and the onelibrary track's JVM takes it by `fastTrack`'s new attribute `classesFirst` (`build.xml:1180`, `:1239`, `:1251`, `:1310`). That is P-33's one build serving both libraries, and review-queue item 521's default, files of their own.
- The payload table (fork C1, P-178): the one library's seven number types and its `Boolean`, `Char` and `FlatString` have rows (`compiler/NamingCzar.java:645-654`), and a lookup answers only a row of the selected library, `FlatString` counted among the one library's apis under the selection (`:661-676`). The second set's `FBoolean`, `FCharacter` and `FJavaString` follow `FZZ32`'s form line for line (`src-one/FBoolean.java:12-41`, `src-one/FJavaString.java:12-41`; `compiler/runtimeValues/FZZ32.java:22-63`), and the second set's `LibraryNames` names the one library's object classes (`src-one/LibraryNames.java:30-37`). P-178's form now holds on the compiled path against the one library too; item 513's open point, the builder's form, is form 2.
- The carried types' rows, under the selection only, since each row also enters a bare name (`NamingCzar.java:612-624`; F-353's rule), with the run's copy keyed by library (`runtimeSystem/Naming.java:307-322`); a carried parent of an `extends` clause is named by its interface (`NamingCzar.java:911`).
- The converters (`compiler/nativeInterface/FortressMethodAdapter.java:77-109`, `:191-198`): a helper's Java `String` at the one library's `String`, a Java `Object` at `Any`, and the two stores.
- The reader, the writer and the stores (P-164, P-169): the second set's `FJavaBufferedReader` and `FJavaBufferedWriter` extend the one library's traits (`src-one/FJavaBufferedReader.java:21`, `src-one/FJavaBufferedWriter.java:21`); `FJavaArrayStore` holds a `FortressArrayStore`, an `Object[]` (`src-one/FJavaArrayStore.java:7-17`; `compiler/runtimeValues/FortressArrayStore.java:24`), and `FJavaRR64ArrayStore` a `FortressRR64ArrayStore`, a `double[]`. P-164's run-time half and P-169's compiled store are built under the selection, before the switch-over, by P-33's slice first.
- The prelude's names at run (fork C3): the 99 raise strings name an exception by its simple name (`nativeHelpers/simpleIntArith.java:43`, `:64`; `nativeHelpers/runtime.java:29`); `Utility` maps it through the set's `LibraryNames`, a whole class name still passing (`compiler/runtimeValues/Utility.java:34-36`), and takes the constructor over the set's library `String`, else the one without parameters (`:43-51`). The first set maps a simple name to the prelude's class (`compiler/runtimeValues/LibraryNames.java:39-41`), the second to `FortressLibrary`'s (`src-one/LibraryNames.java:43-45`). No string of `src-one` names the prelude (`grep -rn 'CompilerBuiltin\|CompilerLibrary' ProjectFortress/src-one` finds one comment). Under walk the helper's failure carries the same class name as before, which `StaticNativeApp.raised` reads (`interpreter/glue/StaticNativeApp.java:273-282`); the skeptic's `OneRaises` gave the same six lines under walk with and without the selection, and the 52 demos reached their end.
- `FValue`, the deviation from fork C3: the second set's `asString` is typed at `FValue` (`src-one/FValue.java:27`, `src-one/MutableFValue.java:38`), the first set's at the prelude's `String`, as on the base (`compiler/runtimeValues/FValue.java:21`, `MutableFValue.java:34`). Section 2.
- The track (fork C4, another form): one `.test` of the fourteen (`one_library_tests/OneLibraryComponents.test:2-3`), first in the track (`tests/unit_tests/FileTests.java:1010-1037`, `OneLibraryJUTest.java:44`). Section 2.
- `CodeGen.java`: no edit. Item 601's sites agree, since the one library's `ZZ32` is `FZZ32` in every descriptor (`NamingCzar.java:613`): with the verifier off a varargs call read back 7 and 9 (worker, call 175), and `xs[1]`, `xs[2]` gave '5' and 'c' (skeptic, `OneVarargsIndex`). Item 601 is answered without an edit.
- Not edited: the prelude's files, the one library's text, walk and microGPT (`git diff --stat a1c244be36 295c215c2c -- Library ProjectFortress/LibraryBuiltin explorations/run-c4/src explorations/apl/mg` prints nothing). So P-37 holds: no declaration was added to the prelude.
- The specification: Appendix I's two sentences on the run (`Specification/appendices/changes.tex:4053-4057`, `:6417-6420`), worded by the skeptic to what runs, "can run, as one that prints a line of text does" (`509181e9c3`).

**The decisions, read with their histories.** Each holds.
- P-33: one build serves both libraries (above). Its history block of 2026-11-18 08:14Z cut "by a second set of the run time's value classes (F-353)" from the text because "one build serves both libraries with one set of run-time classes (F-381), and the seven number types need no second set". That ground no longer holds: one build now builds two sets. The decision and its text stand (Part 1).
- P-37: no prelude declaration. Its exception for the number types (block of 2026-11-16 01:57Z) is untouched.
- P-178: the form holds on both paths and both libraries. Its aim, in the block of 2026-11-17 15:26Z, "a bare JVM int, long or double in compiled code", is not built (below).
- P-164 and P-169: built in the second set. P-164's sentence "At the switch-over, the run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits, and the boxed-type table's two entries and `fileOps`' raise strings name the one library's types" is overtaken in its timing and its last clause: the strings name neither library, and each set maps them (Part 1).
- F-353 and F-388: rewritten by the gather and the review, and true of the tree.

**What of P-178 and of the switch-over is still not built.**
- P-178's aim: every number on the compiled path is still an object of the class that the code generator writes over its payload class, made by `make` for each value (`FZZ32.java:39-47`; `src-one/FBoolean.java:20-28`; the worker's decision 7, no cached values). The bare JVM value is P-17's and phase 6's.
- The switch-over: the compiled tests compile against the prelude by default, the prelude's three files stay, and the first set of run-time classes stays beside the second (P-37; P-33's last step). Hand-written copies of `FValue`, `MutableFValue` and `FException` now stand in both sets (item 521's cost). The payload classes' `asString` bridges answer the prelude's `String` under both libraries (`FZZ32.java:27`; row 1101). The trait table's search by the prelude's names stays (fork C5; F-391). The natives: the code generator refuses no declaration of the fourteen (F-34).
- Between `Hello` and microGPT on the one library: rows 994, 1091, 1098, 1099, 1100, 1101, 1102 and 1103, and the checker's 42 sites in microGPT's flat program (F-58; Part 5).

**What the two paths still do differently after this run.** Each is a row or a fact.
- The library: walk reads the one library; the compiled path reads the prelude unless `FORTRESS_LIBRARY=one` selects the one library, and there a program now runs (F-396). Against the one library the compiled path then departs from walk at: `println` of a number or a boolean, 'NoSuchMethodError' (row 1098); `=` and `<` of two strings and `=` of two booleans, 'NoClassDefFoundError: FortressLibrary' (row 994); every varargs call, 'ClassFormatError: Duplicate method name "copy"' (row 1091); a reduction over a range, 'Duplicate method name "narrowToRange"' (row 1099); `u.asString` in a generic body at `U extends ZZ32` (row 1101); the report of an uncaught exception, which shows the run time's placeholder (row 1102). Walk runs each.
- On the compiled path under either library, a caught exception object that a helper raises is not `SEQV` its object (row 1103); walk gives the object. Against the prelude this was so on the base.
- The compiled one library's own code depends on what its JVM compiled before it (row 1100); walk has no such step.
- Now the same, where the base differed: a program of one `println` of a string; a helper's `IntegerOverflow` and `FileNotFoundException` caught (`OneLibraryCatchHelperRaises`); `typecase` and `SEQV` on `Boolean`, `Char` and `String` (the skeptic's `OneTypecase` and `OneSeqv`, by hand, at one thread and four).
- Against the prelude, nothing changed: the skeptic's four `Prelude*` programs gave the same lines on the base and the head, and the gate's tracks are green.

### 2. The decisions that landed at a default

The record's section 3 gives run 2 forks C1 to C6. The run's result holds eight items for the curator, in four entries of `PLAN.md:928-931`, "Climb batch 34b, listed for his review". "Consequential" is the `coordinator` skill's rule (`SKILL.md`, "The curator's role and decisions"). By it none of them is consequential, and none holds a launch: each can be undone, none bends a decision of his, none changes a model line, and the record settles each but row 1098, which no work on the path needs yet (below).

**Fork C1: `Boolean`, `Char` and `FlatString` over payload classes of the second set.**
- Landed: section 1; as the plan says, `FlatString`'s class keeping its component's name, `FlatString$FlatString` (`src-one/LibraryNames.java:34`).
- What a program sees: under the selection these values exist at run, where the base died at its first one; `typecase` and `SEQV` on them agree with walk (the skeptic's programs). Each value is a new object.
- Not consequential: item 513 leaves the form to the builder.

**Fork C2: the second set in `build-one`, first on the class path under the selection.** Landed as the plan says (section 1). No program changes. Its cost is the one that item 521 names: the second set's copies are edited beside the first set's. Not consequential: P-33 and item 521's default.

**Fork C3 and the rung's deviation: `FValue.asString` typed at `FValue` in the second set only (C.worker.2, C.skeptic.2, C.skeptic.3; rows 1101 and 1102).**
- The plan: "`FValue.asString()` and `MutableFValue.asString()` are typed at `FValue` in both sets" (`CLIMB-BATCH-34.md`, section 3, item 13).
- Landed: the second set's at `FValue`; the first set's as on the base (section 1). Typed so in both sets, the worker's first build made `compiler_tests/Compiled17a` die against the prelude, 'NoSuchMethodError: 'fortress.CompilerBuiltin$String ...FZZ32.asString()'' (worker's `ant testFast` on `1f8a67251d`, call 207), since compiled generic code calls a number's getter on the payload class, whose bridge answers the first set's type.
- What a program sees: against the prelude, nothing. Against the one library, two forms fail and have rows: a generic `u.asString` at `U extends ZZ32` (row 1101) and an uncaught exception's report (row 1102). The skeptic's scratch run with the second set's `asString` at the library's `String` repaired both and made a long string's `FValue.toString` recurse, 'StackOverflowError' (`SKEPTIC.md`, "What I tried and left"). So the way of the repair is open between three ways (`PLAN.md:929`).
- Consequential? No. Fork C3's aim, that the run time name no prelude class where the second set is in use, holds for the second set's own classes; the first set must name the prelude while the prelude stays. The deviation changes no program that ran before, and can be undone. microGPT's prints reach `asString` through `cast[\Object\](b).asString` (`Library/FortressLibrary.fss:4743`), a call on `Object`, not on a generic receiver, so row 1101's form is not one that it writes (by reading).

**Fork C4: the fourteen compiles in the track, in another form.**
- The plan: "as `.test` files with a `compile` step ... in the probe's order, before any run step of the track needs them".
- Landed: one `.test` of the fourteen, which the track runs first (section 1). Fourteen files, shuffled among the track's other compiles, made the one library's dispatch of `denominator` take `Ratio`, and every run test died, 'VerifyError: Bad type on operand stack' (worker's `ant testFast` on `1f8a67251d`, 5 failures; row 1100).
- What a program sees: nothing. The track's first 135 to 160 s are the fourteen compiles. Row 1100 stays: a program compiled after other programs in one JVM can still meet it.
- Not consequential.

**Fork C5: the trait table's search by the prelude's names stays.** Landed: no edit of `TraitTable.scala`; the fourteen compile without a search of the one library's apis. Not consequential (fork R1 of climb batch 33).

**Fork C6: the waiting run tests.** None passed with the verifier on: `XXXOneLibraryRunVarargs` (row 1091, row 994 behind it), `XXXOneLibraryRunConditionalReduction` (row 1099, row 994 behind it) and `XXXOneLibraryRunHalf` (row 1098) went back to `XXX`, each now checking `run_out_contains=REACHED` where the base's checked `run_out_does_not_contain=REACHED`. As the plan says. Not consequential.

**C.worker.1 with C.skeptic.1: which export rule holds (row 1098, `CONTESTED`, no default).**
- Landed: nothing built; `XXXOneLibraryRunHalf` records the form. The one library's api declares `print`, `println` and `errorPrintln` at `Number` and at `Boolean` (`Library/FortressLibrary.fsi:2725-2730`), and its component only at `String` and `Any` (`Library/FortressLibrary.fss:4798-4810`). A compiled call names the api's declaration, so `println(q)` of a `QQ` dies against the one library, 'NoSuchMethodError', and so, by reading, does any `println` of a number or a boolean.
- The ways, with the team's sources:
  1. The text's rule: "A top-level function declaration is satisfied by a set of top-level function and functional method declarations the union of whose parameter types is the parameter type of the exported declaration" (`Specification/basic/components/source-code.tex:356-361`). Then the component declares the six at `Number` and `Boolean`, and the compiled export check refuses a component that does not.
  2. The note's rule: a `\note` signed "Victor" beside it, "it may also be satisfied by a declaration or set of declarations whose parameter type is a supertype of the exported declaration's parameter type provided that there is an overloaded exported declaration whose parameter type is a supertype of the satisfying declarations" (`:364-369`). The team's export check follows it: at the team's last commit `coverOverloading` drops each declaration that another covers, on both sides (`git show a874948ac:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala`, lines 611-621; its placeholder first appears on 2009-02-04, `1851586503`, Sukyoung Ryu, "Nothing fancy here yet"). The revival kept that meaning as `uncoveredDeclarations` (`bb39251566`; `scala_src/typechecker/ExportChecker.scala:281-285`, `:616-624`). Then the code generator calls the covering declaration, or emits a bridge at the api's descriptor; no probe has designed either.
- Does the record settle it? No. No POSITIONS entry names it. P-158 settles only that an api's abstract member of a trait or object is declared in the component, and its history dates the team's member check after the text's member sentence. Row 834, the same question for return types, is `CONTESTED`: "Not decided". By the three principles, two point to the note's rule: the team's check is its later code, and the library as the team wrote it relies on the note (api at `Number`, component at `Any`). The dates of the note and of the covering form are not measured here: the history before the 2012 snapshot `5a68404fdf` is cut on these files.
- Consequential? Not by the rule if the dates confirm the principles; it touches no model line (microGPT prints strings, `explorations/run-c4/src/MicroGptFlat.fss:81`, `:90`) and can be undone. But the entry has no default, which the coordinator skill asks of every decision (Part 1).

**C.skeptic.4: fork B2's premise, that only `Arr` and `Dot` meet row 994.** False on the compiled one library: every `=` of two strings or two booleans and every `<` of two strings meets it, with the verifier on (`XXXOneLibraryRunStringEquality.test`). Its default, row 994 first in the batch after, is what the record's list already says. Not consequential.

**C.reserved.1 and C.reserved.2: two run tests that print another line than walk.**
- C.reserved.1: `OneLibraryUncaughtRaise` reports 'FortressException: class fortress.FortressLibrary$IntegerOverflow with string Bogus value from FValue.asString()' on standard error, where walk reports `IntegerOverflow` with its context (row 1102). A plain test pins today's line (`one_library_tests/OneLibraryUncaughtRaise.test:7`), since the specification does not say how a program's abrupt completion is reported (`basic/evaluation/completion.tex`).
- C.reserved.2: `XXXOneLibraryRunHelperRaiseSingleton` prints 'FAIL: the caught IntegerOverflow is the object IntegerOverflow' where walk prints 'PASS' (row 1103); the specification settles it ("every instantiation of such an object with the same static arguments yields the same singleton object", `Specification/basic/objects.tex:214-217`), so its test is `XXX`.
- Neither program ran on the base. Not consequential.

### 3. The rule's new form, in its first batch

The form: since `8bb71dca94` the worker and the skeptic echo a line that starts `Expected failure:` in the Bash call that first runs a test, before the harness command, the section's own test included; `tests-writing.md`, "The order", step 2, says the same since `82bb989f2f` and `272357f603`, and since `272357f603` it opens "Run the test's program through the harness before you run it any other way."

**Every first harness run of a test carried its line, and every run failed as its line said or had its cause found before the next.** Read from the transcripts by call (`expfail.py`, `onecall.py`):
- Worker, call 69 (22:12:07), `OneLibraryComponents.test`, the section's own: the line, then `junit.sh base14`; 'Tests run: 14,  Failures: 3', the three components at 'Can't generate header for method floatToString', as the line and the section's step 1 say.
- Worker, call 74 (22:14:38), `OneLibraryRunHello.test`, the section's own: 'NoClassDefFoundError: fortress/FortressLibrary$String', 'Failed to satisfy run_out_contains', as stated.
- Worker, call 100 (22:18:51), the three run tests renamed without `XXX` and `OneLibraryCatchOverflow`: 'Tests run: 8,  Failures: 4', each at the one library's first class, as stated.
- Worker, call 106 (22:20:15), `OneLibraryCatchHelperRaises.test`: it failed another way, at the checker, 'FlatString.FlatString->JavaBufferedReader is not applicable to an argument of type String.'; the worker found the cause in the test's program, bound the flat string by `typecase` (call 110), and echoed the line again in call 111 (22:20:48), which failed as stated. The report says so (`REPORT.md:59`).
- Every base run ended before the first build, `ant compileAll` at 22:27:37 (call 149). The passing run is `ant testFast` at 22:51:46 (call 214), after the last edit of code at 22:51:33 (call 212); no Bash call between it and the commit `f3439cf7ce` writes outside `tmp/`.
- Skeptic, call 116 (23:47:56), its five files of `4383f42f6a` on the base through `old-fortress.sh`: 'Tests run: 6,  Failures: 3', each run at 'NoClassDefFoundError', as stated; call 119 masked the generic call once: 'Did not see expected failure'.
- Skeptic, call 141 (23:54:44), the two files of `f644941c3d`: 'Tests run: 2,  Failures: 1', as stated.

**One departure: the programs of three new tests ran under walk before their first harness run,** against step 2's first sentence: `OneLibraryCatchOverflow` (worker, calls 96 and 97, 22:18; walk refused its variable `big`, 'Variable big is already declared', and the worker renamed it), `OneLibraryCatchHelperRaises` (worker, calls 105 and 110), and `OneLibraryHelperRaiseSingleton` (skeptic, call 140). Each walk run learned walk's line, which a compiled run test that checks walk's output needs, or checked the program; none could show the compiled failure, so the rule's purpose held. The skeptic's check 2 and the merged-diff review did not name it. Both agents had read the sentence (worker call 12, skeptic call 8). Part 1, finding 2.

**No claim in a report that the transcript does not hold.** The worker's quoted lines and times match its calls (69, 74, 100, 106, 111, 207, 214, 230, 232, 266, 270); the skeptic's call ids `25hcFb`, `dtaKkc`, `BAdAfx`, `arrwtJ`, `rSxVmD`, `LrhEFX` and `vE5Ad1` open to what it says; the review's `fixesChecked` matches the skeptic's calls 116 to 120 and 141 to 142. Run 1's false claims did not recur: each report quotes the line as echoed.

**Trims: none.** The skeptic's three commits are corrections, and its `SKEPTIC.md`, check 3, says "Nothing to trim".

### 4. The measures: what runs against the one library, and F-34's count

**What runs, compiled against the one library under the selector with the verifier on, in the gate's onelibrary track** (the gather's `ant testOneLibrary` on the merged tree, 'Tests run: 40, Failures: 0'; the gate's `fast-onelibrary/OneLibraryJUTest	40	0	0	0`):
- `OneLibraryRunHello`: 'Hello, one library' (row 1062, closed).
- `OneLibraryCatchHelperRaises`: catches `IntegerOverflow` from `ZZ32`'s `+` and `FileNotFoundException` from opening a missing file, then 'PASS'.
- `OneLibraryUncaughtRaise`: runs to 'REACHED' and exits non-zero with the placeholder report, as its plain test pins (row 1102).
- The fourteen components' compiles, `OneLibraryComponents.test` (row 874, closed).

**Left at an expected failure, each after 'REACHED', none promoted:** `XXXOneLibraryRunVarargs` (row 1091; behind it row 994), `XXXOneLibraryRunConditionalReduction` (row 1099; behind it row 994), `XXXOneLibraryRunHalf` (row 1098), and the skeptic's `XXXOneLibraryRunGenericAsString` (row 1101), `XXXOneLibraryRunStringEquality` (row 994) and `XXXOneLibraryRunHelperRaiseSingleton` (row 1103). The record expected `Hello` "and the varargs, `AND:` and `QQ` programs where they pass" (`CLIMB-BATCH-34.md`, section 2, "The measures"): only `Hello` passed of the four, and a program that catches a helper's raise passed beside it.

**F-34's count, by the rung's own runs:** on a scratch copy of `f3439cf7ce`, with `FORTRESS_LIBRARY=one` and without the planner's patch, 'refused declarations 0 | emitted (OK lines) 754 | component failures 0', 'rc=0 seconds=218' (worker, calls 266 and 270); with the patch's one hunk that still applies, the trait table's search, the same, 'rc=0 seconds=217'. The landed code is that code (section 1), so no measure after the landing is owed. And the count now has a gated test: `OneLibraryComponents.test` compiles the fourteen whole in every gate, so a refused declaration turns the gate red.

**What the record should state.** F-34 states the count and that it needs no patch (gather). Its sentence "no test checks the count, since the gate's distance stage runs no code generation" is false since `OneLibraryComponents.test` (Part 1). F-396 and F-381 state what runs. `PLAN.md:70`, the code generator over the one library, still says that the measure's script must patch its tree because three components stop at row 874.

### 5. The gate, the count and the distance

**The one gate is green,** as its agent returned it, on the code of `069237aaa4`, which `11ac1ddf75` keeps (`git diff --name-only 069237aaa4 HEAD -- ProjectFortress Library build.xml bin` printed nothing): `testFast` 59 suites, 2,645 tests; `testSystem` four shards, 879 tests; `testSpecData` 130 tests; 0 failures in 3,654 tests in 64 suites (run 1's 3,628). Only `OneLibraryJUTest` moved, 14 to 40 tests. 24 atomic programs, 72 of 72 `PASS`. The ladder with no move, 85 rows at pass and the 18 microGPT components at `disambiguate`. The checker count 0 over 14 apis, `#crash none`, 'COUNT SAME   0, declared none'; the distance 0, 'DISTANCE SAME   0', every kind 0. No row of the count's table is new or risen, so no rung edit is tied to one: the rung's tables enter descriptors only under the selection, which the stages do not set (`REPORT.md`, "The stages"). microGPT's walk check gave 7 of 7 for both programs at the commit stage, 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' (51 s and 44 s).

**The library order.** `ant compileAll` printed "caches kept", but `default_repository/caches/bytecode_cache` was empty, since the gather's build had started the caches again; the gate ran the library order by the skill's rule, five compiles 'rc=0'.

**The comparisons.** `gate_compare`, `ladder_compare` and the microGPT phase diff printed nothing to hide. No line of the team's tests was rewritten.

**The stages' seconds, and the machine.** The count stage about 105 s, the distance stage 176 s (`FortressLibrary` 108 s) at a start load of 0.22, against run 1's 105 s and 200 s, on the same CPU line, an Intel Xeon at 2.10 GHz (the gate's `# machine` lines; F-240). The distance stage ran beside the library order, before `testFast` (the commit stage's note). `testFast` took 11 min 5 s against run 1's 11 min 45 s, the onelibrary track now compiling the fourteen.

### 6. The cost, by role, against the record, and in three spans

**The run wrote 2.10M over 7 transcripts, in 3 h 8 min** (22:04:45 to 01:12:54; `batch-measures.py` gives the same 2.10M). By role:
- Rung C's worker 600K (28.6 %), 81 min; its skeptic 476K (22.7 %), 32 min.
- Gather 377K (18.0 %), 41 min. Merged-diff review 308K (14.7 %), 12 min, beside the gate's 149K (7.1 %), 30 min. Commit 126K (6.0 %), 3.3 min. Disk 64K (3.1 %).

**Against the record:** "Run 2: about 2.4 million, 3.0 million with the reserve. The range is 2.0 to 3.6 million. About 3 hours and a quarter, 4 hours with the reserve. C with its skeptic about 1.25 million, the fixed roles about 1.15 million; the reserve 0.6 million" (`CLIMB-BATCH-34.md`, section 2, "Cost and time"). **2.10M: 12 % under the estimate, 30 % under it with the reserve, inside the range; 3 h 7 min to the commit stage's last commit, against about 3 h 15.** By role:
- **The worker: 600K against about 0.85M (−29 %),** in 81 minutes against the 420 the manifest gave. The planner scaled rung N's worker by minutes; the worker ran `testFast` on two code states and found its two failures in its own suite.
- **The skeptic: 476K against 0.4M (+19 %).** It compiled the fourteen once into a private caches folder, ran eighteen programs of its own, old against new and walk against compiled (its `differentialsRun`), and wrote three corrections (section 7).
- **C with its skeptic: 1.08M against 1.25M (−14 %).**
- **The fixed roles: 1.02M against 1.15M (−11 %):** the gather 377K against "about 0.3 million" (+26 %), and, against the figures of climb batch 33's run 2 from which the record priced them, the review 308K against 464K (−34 %), the gate 149K against 149K, the commit 126K against 164K (−23 %), the disk 64K against 65K.
- **The reserve: none spent:** no ruling, no repair, one gate.
- **The minutes:** the rung stage 1 h 54 (22:04:47 to 23:58:30), the gather 41, the review 12 beside the gate's 30, the commit stage 3.

**The cost in three spans, each on its own folders,** as `spend.py` from a span's start less `spend.py` from its end. A transcript counts in the span where it last changed.
- **Span 1, run 1's landing work,** from `285efad802` (19:13:06) to the end of its record-landing workflow, run `wf_df6b93cb-3bf`, whose journal was last written at 21:54:42; the boundary is 21:54:43. Over that run's folder and its headless writers (the two in `-home-user-fortress-landing-34`, and `eee8881d` and `ed4ad157` in the project's folder): `spend.py` printed 4.05M from 1795201986 and 0.00M from 1795211683. **4.05M over 30 transcripts** (19:51:31 to 21:54:42), ten of them on Sonnet.
  - By part: the record (19:51 to 20:49) 1.64M, its two headless record writers 480K among it; the orientation update (20:49 to 21:31) 1.40M, its headless writer 63K among it; the skill step (21:31 to 21:41) 0.28M; the page of `fortress-repo` changes (21:41 to 21:53) 0.50M; the push and the revival page (21:53 to 21:54) 0.23M.
  - In the span's time but outside its folders: run 1's post-batch review 634K (19:16 to 19:50), the base build 41 with F-34's measure 104K (19:17 to 19:29), the re-read of section C 265K (19:30 to 19:45); the coordinating session's own writes, 243K over 55 messages (`mainw.py`).
- **Span 2, the preparation,** from 21:54:43 to the launch, 22:04:45. Over the session's Agent-tool workers' folder and the project's folder of headless runs: `spend.py` printed 0.64M from 1795211683 and 0.37M from 1795212286, the 0.37M this review's own transcript in both. **0.27M over 3 transcripts, and the coordinating session's own 54K over 33 messages: 0.32M.** The manifest worker 164K (21:58 to 22:03); the cold read of the expected-failure step 71K (21:58 to 22:02); the skill writer's two tasks, `82bb989f2f` and `272357f603`, in one headless session, 33K (21:57 to 22:03).
- **Span 3, the run,** 22:04:45 to 01:11:55 (boundary 01:11:56), over the run's folder: `spend.py` printed 2.10M from 1795212286 and 0.13M from 1795223516. **1.97M over 6 transcripts.** The commit agent, 126K, last changed at 01:12:54 and counts after the span. The coordinating session wrote 22K during the run, over 22 messages: four check-ins and the boot notes.

So run 1's landing cost 4.05M in its span, against climb batch 33b's 4.42M and 33's 4.80M; this run's preparation 0.32M, against run 1's 5.72M, which held two days of other work. No coordinator turn in the three spans wrote over 50K (`mainw.py`): run 1's process finding 4, the cold turns, did not recur.

**The briefing's use.**
- **2 of 2 briefed launches read their briefing, 100 %, and each read every part. Neither read it in its first turn.** The worker at call 21, 85 s after its start, parts 1 to 3; the skeptic at call 18, 54 s, its slice of checks, parts 1 and 2. The disk check, the gather, the review, the gate and the commit stage have none by design.
- Its results came to about 48K tokens, 2.3 % of writes, at 0.40 tokens a character plus 110 a call (`brief2.py`).
- Against the batches before (briefed, read, at calls, seconds, share): B33 run 1 12, 12, 8 to 22, 27 to 82, 2.6 %; B33 run 2 12, 12, 8 to 24, 28 to 153, 3.6 %; B34 run 1 13, 13, 9 to 25, 34 to 86, 2.6 %; B34 run 2 2, 2, 18 to 21, 54 to 85, 2.3 %.

**Other measures.**
- First calls: 521K (24.8 %), 7 cold, each agent a fresh launch. Cache refills: 0. Refusal cycles: 0. Rulings and repairs on the merged tree: 0.
- The skill's load, by a rough count: about 336K, 16 %. `revival-changes.md` was read whole by 5 of the 7 launches, all but the disk check and the commit stage. `sources.md` was not read.
- Error results: 18.
- Per agent, in order of start (`agent-<id>.jsonl`): disk `a10ff382`, 64K, 0.1 min; rung C `a16b8453`, 600K, 81.2; skeptic C `ab5cd2b0`, 476K, 32.3; gather `afe4eff3`, 377K, 41.0; gate `aae037b5`, 149K, 30.1; review `a024cb1e`, 308K, 12.1; commit `adffed99`, 126K, 3.3.

### 7. Re-measuring: a build, a suite or a measurement on a code state that another stage ran

By each agent's commands (`runs3.py`):
- **The worker** ran `ant testFast` on two code states, `1f8a67251d` (red, its two failures) and `f3439cf7ce` (green), and `ant testSystem` once, on `f3439cf7ce`; the two stages once, on its final code (call 235, 23:08:25, as the skeptic cites); the measure on one scratch copy of `f3439cf7ce`, twice, without the patch and with its one hunk, as the section's point to report asks.
- **The skeptic** built nothing and ran no suite, but compiled the fourteen components again, each in a fresh JVM, into a private caches folder (`FortressLibrary` 132 s), since no tree held their jars: `ant testSystem` had deleted `ProjectFortress/test-caches`, and `default_repository/caches-one` held a 0-byte jar (`SKEPTIC.md`, "The programs"). That repeats the worker's compile of the same code. Part 2, finding 5.
- **The gather** built once and ran `ant testOneLibrary` on the merged tree, 271 s with the fourteen compiles; the gate's `testFast` then ran the same track on the same code. With one rung whose tests are that track, the manual's check before the gate is a whole repeat. Part 2, finding 6.
- **The gate** ran each suite and each stage once, and the library order once, since the caches were empty.
- **The specification was built once,** by the gather; the commit stage reused its PDF. **The microGPT quick pair ran once,** at the commit stage.

### 8. Two events

**No commit other than the batch's fell between the gather's start and the batch's push.**
- The gather's first record is at 23:58:30; its preconditions held, `git status --porcelain` empty and the base an ancestor of `HEAD`, then `dfcd36cbbf` (`RECORD.md:7`). `main`'s reflog from `dfcd36cbbf` (22:06:23) to the push holds only the batch's five commits: `f6469d96ec` (00:10:44), `d9807a4077` (00:12:49), `069237aaa4` (00:38:55), `11ac1ddf75` (00:50:44) and `295c215c2c` (01:11:55). `origin/main` moved from `dfcd36cbbf` to `295c215c2c` by the commit stage's one atomic push at 01:12:11, with the two other refs; the coordinator's next commit, the boot note `99951e0d0e`, is at 01:14:12.
- The coordinator's two boot notes after the launch, `a79aecf5a4` (22:05:19) and `dfcd36cbbf`, came before the gather, as `references/batch.md`, "While it runs", allows. So the rule held.

**No agent received text from outside its brief.**
- The curator's go came before the launch; during the run (22:04 to 01:13) the coordinating session received no message of his, only four check-ins (22:51, 23:36, 00:21, 01:06) and the run's notifications.
- The first record of each of the 7 transcripts is the harness's '[Workflow harness — computed task]' message, the brief. Each agent but the disk check received one more text message as the user: the skill's text after its own load of the skill (`usertext.py`).
- Beside them the harness attached its standing material (the environment, the project's instructions, the list of skills, the date, the attribution reminder, the connectors' instructions), the shared task list, one notice that a file the worker wrote had changed on disk, and the gather's notice that the date had changed. The task list carried the worker's to-dos (tasks 64 to 66) and the gather's (67 and 68) to the agents after them; all five end `completed` (`taskrem.py`).
- No transcript holds his words of the go ("Go to launch") or the markers '<agent-message', 'Another Claude session' or 'sent a message while you were working'. "Both runs" and the curator's name stand only where a file of the record names them, as `PLAN.md` read by the review and "Pavol's answers" in the gather's and the commit stage's briefs.

## Part 1. Conformance

No departure from a decision of the curator's landed. **No finding of this review would change a decision of his,** so none is put as an ask, and no options are given here. Forks C1 to C6 and the eight items are reviewed in section 2; row 1098's ways are there.

### Findings for the record, with no decision of his changed

1. **Row 1098 has no default.** `PLAN.md:928` reads "No default on record; as landed, neither rule built", against the coordinator skill's "Give each decision a default". Owed (mine): the default, the note's rule, which the checker applies (way 2 of section 2), with the code generator's half sized by a probe beside row 834; the dates of the note and of `coverOverloading`'s covering form measured first, by a Sonnet scout, from the team's history before `5a68404fdf`.
2. **The new first sentence of step 2, "Run the test's program through the harness before you run it any other way", was not kept for three programs** (section 3), and it defeats a need that the skill states elsewhere: a compiled run test that checks walk's output needs walk's output first. No first run showed a failure before its line. Owed (mine): the sentence limited to the path that the test runs ("before you run it on the path that the test checks; a walk run of a compiled run test's program, for its expected output, may come first"), by the skill writer with a cold read; until then, the skeptic's check names such a run.
3. **F-34's "no test checks the count, since the gate's distance stage runs no code generation" is false:** `OneLibraryComponents.test` compiles the fourteen whole in every gate (section 4). Owed: that clause, and `PLAN.md:70`.
4. **Three FACTS entries name the helpers' raise strings as the prelude's classes:** F-24, "where the helper raises a class of the compiled prelude, such as `fortress.CompilerBuiltin$DivisionByZero`"; F-312, "Each raises `fortress.CompilerBuiltin$DivisionByZero` at a zero divisor"; F-332, "since a compiled helper's raise builds the prelude's exception (F-336)". Since rung C a helper names the simple name and the class path's set maps it: under the selection, compiled, the raise is the one library's class (`Utility.java:34-36`, `:43-51`; `src-one/LibraryNames.java:43-45`). Walk's answers are unchanged. Neither the gather nor the review reworded them.
5. **P-164's sentence on the switch-over is overtaken** (section 1): the second set's classes implement the one library's traits under the selection now, and `fileOps`' raise strings name the simple name, which each set maps. Owed: the fewest words, by the curator's rule of 2026-10-31 for a sentence that the tree made false, told to him with its old and new words (`SKILL.md`, "Quiet times"); its decision is unchanged.
6. **P-33's ground of 2026-11-18 08:14Z is no longer true:** "one build serves both libraries with one set of run-time classes". Its text stays true. Owed: a history block that says one build now builds a second set for the one library's carried types other than the seven numbers (F-396); the words on the second set may come back into the text, a choice for the record-landing.
7. **The skeptic's fix commits were corrections, and right:** three homes for four defects that the one library's first runs show (rows 1101, 1102, 1103 and row 994's sites), two sentences of Appendix I that claimed more than ran, and one citation. No fix of the change's code, none contested, no trim.
8. **The plan's words were wider or narrower than what landed in five places:** fork C3's "in both sets"; fork C4's fourteen files in the probe's order; fork B2's premise on row 994; step 6's "show it with the varargs run test", which the verifier stops at row 1091, shown by hand with it off; and the section's Files list without `.gitignore`, `FileTests.java`, `OneLibraryJUTest.java` and `LibraryObjects.java`. Its "Rows" asked a note on row 1090, a closed row, which `ledger.py` refuses.
9. **The record's estimate overpriced the worker** (section 6), and its expected 420 minutes was five times the 81 that the worker took.

### Corrections owed in the record

- **POSITIONS:** P-164's sentence (finding 5); P-33's history (finding 6). No decision is false.
- **FACTS, false or short, and not reworded by the gather or the review:** F-34's clause (finding 3); F-24, F-312 and F-332 (finding 4).
- **The ledger:** rows 1098 to 1103 filed; rows 994, 995, 1091, 1017 and 1079 rewritten; row 1090's note refused by the tool, which F-396 replaces. Owed: the homes of Part 4.
- **The rung reports:** none.

## Part 2. Did the practice hold

### The practice's measures, the last four runs

(B33 run 1; B33 run 2; B34 run 1; B34 run 2.) The figures before B34 run 2 are `reviews/batch-34-review.md`'s, Part 2, which holds B26 to B33 too.
- Written: 5.57M; 5.74M; 5.12M; 2.10M.
- The tier: Opus, each.
- Launches lost to restarts or the disk: 0; 2, 0.52M; 2, 0.44M; 0.
- Per landed rung: 0.93M; 1.43M; 1.02M; 2.10M, one rung bearing every fixed role (the rung with its skeptic 1.08M).
- First calls: 0.80M, 7 cold; 0.995M, 11 cold; 0.86M, 8 cold; 0.52M, 7 cold.
- Cache refills: 0 each.
- Refusal cycles: 0; 1 rung, 214K; 1 rung, 156K; 0.
- Rulings and repairs on the merged tree: 0; 317K; 0; 0.
- Skeptic fix commits (defects of the change): 20 (1); 12 (2); 13 (2), one a trim; 3 (0).
- Distance: 0 each time.
- Count stage at the gate: 78 s; about 65 s; about 105 s; about 105 s, the last two on the 2.10 GHz machine.
- Distance stage at the gate: 137 s; 117 s; 200 s; 176 s, each beside `testFast` or the library order.
- Skill's load: about 18 %; about 17 %; about 20 %; about 16 %.
- Briefing, estimated: 2.6 %; 3.6 %; 2.6 %; 2.3 %.
- microGPT quick pair: 7 of 7 both, each time.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **The rule's new form worked in its first batch** (section 3): seven calls that first ran a test, five of the worker's and two of the skeptic's, each with its line, each checkable by call id, and no report claimed what the transcript lacks. Keep it.
2. **Its new first sentence needs the path named** (Part 1, finding 2).
3. **A one-rung run's fixed roles cost about 1.0M, and the rung was priced 14 % high.** Proposed (mine): price a one-rung run's fixed roles at about 1.0M (gather 0.38M, review 0.31M, gate 0.15M, commit 0.13M, disk 0.06M), and a rung's worker from the last run's workers of its kind, not by its minutes.
4. **F-34's measure after a landing is now the gate's work.** `OneLibraryComponents.test` checks in every gate that no declaration of the fourteen is refused, and this landing's code is the rung's measured code. Proposed (mine): step 1a of the manual's routing keeps the base build and drops the measure, F-34 cites the gate's test, and the measure's script is retired (the record's "After the landing"; `RECORD.md`, "Left for the coordinator": `codegen-measure.sh:16` goes on without its patch under `set -eu`).
5. **The skeptic compiled the fourteen again, because `ant testSystem` deletes the track's jars.** Proposed (mine): the skeptic's checks give the one-JVM form, `junit.sh` with `OneLibraryComponents.test` first, or the worker copies `test-caches/fast-onelibrary` to its `tmp/` before `ant testSystem`, and the skeptic runs against that copy (`REPORT.md`, "Commands worked out").
6. **The gather's run of the rung's tests repeated the gate's whole onelibrary track.** Proposed (mine): with one rung, the gather skips its own run of the rung's tests where the gate's `testFast` runs the same track on the same code, since no merge stands between them.
7. **The scenario checker's 10 problems on a one-rung splice were scenarios that need a second rung** (`a1c244be36`'s message). Proposed (mine): the checker skips those scenarios when the manifest holds one rung.
8. **Of run 1's process findings:** 1 (the statement's form) answered by `8bb71dca94`, and it held (finding 1); 2 (the section's "Seen failing" lines) held: step 1 quoted both failures, and each first run matched; 3 (pricing) overpriced the worker again (finding 3); 4 (the coordinator's cold turns) held, none over 50K; 5 (the machine) held: every agent ran on the 2.10 GHz CPU; 6 (the measure's owner) is now finding 4; 7 (leftovers) held: the commit stage removed the rung's worktree, no scratch worktree is left (`git worktree list`), and tasks 64 to 68 end `completed`.

### Misses, by kind

Numbered on from `batch-34-review.md`'s 1364.

Found before the launch or inside the batch:
- **The planner's text wrong, caught before the launch:** section C's premises and step 3's pieces of the patch, already numbered 1360, applied in `835e50a9a5` and `bee131ea7d`.
- **The planner's text wrong, caught before landing:** 1365, fork C3's "in both sets" (worker, `f3439cf7ce`); 1366, fork C4's fourteen files in the track's order (worker, `f3439cf7ce`; row 1100); 1367, fork B2's premise on row 994 (skeptic, C.skeptic.4); 1368, the section's note on row 1090, a closed row (gather); 1369, step 6's proof by the varargs run test (worker); 1370, the section's Files list (worker's point to report).
- **A defect of a change, caught before landing:** 1371, `Compiled17a`'s 'NoSuchMethodError' with `FValue` retyped in the first set (worker, `1f8a67251d`); 1372, every run test's 'VerifyError' with the fourteen compiled after the track's other tests (worker, `1f8a67251d`).
- **A defect of the tree found and filed, not the batch's:** 1373 to 1378, rows 1098, 1099 and 1100 (worker) and 1101, 1102 and 1103 (skeptic); 1379, row 994's sites at `=` and `<` of strings and `=` of booleans (skeptic).
- **A report that said what was not so:** 1380, Appendix I's two sentences that a program compiled against the one library "runs" (skeptic, `509181e9c3`); 1381, the report's `FValue.java:22` (skeptic); 1382, the worker's generic `u.asString`, "Not run, and no row added" (skeptic, `4383f42f6a`, row 1101); 1383, `FlatString` called a value object in F-396, row 995 and `RECORD.md` (the review, `11ac1ddf75`); 1384, F-336's moved citation (the review); 1385, `PLAN.md`'s "Where we stand" on the selector (the review).
- **Sentences made wrong, caught:** 1386, F-34 and F-352 (the gather); 1387, rows 1017 and 1079 (the gather).

Found by this review:
- 1388, the walk runs before three first harness runs, not named by the skeptic or the review (Part 1, finding 2);
- 1389, row 1098 without a default (Part 1, finding 1);
- 1390, F-34's clause on the test, and F-24, F-312 and F-332 on the raise strings (Part 1, findings 3 and 4);
- 1391, P-164's sentence and P-33's ground (Part 1, findings 5 and 6);
- 1392, rows 1099 and 1100, forks C1 to C6 and items 513, 521, 597 and 601 without their homes (Part 4);
- 1393, sentences of the skill beyond the record's list (Part 3);
- 1394, the record's order of what microGPT meets first (Part 5).

**Against the earlier notes.** 23 misses were found inside the batch (1365 to 1387), 7 of them defects of the tree that the batch did not make, for one rung, against run 1's 26 for five rungs. No departure from a decision of his landed, and no finding goes to him.

## Part 3. For the skill writer

The sentences of `fortress-repo` that the landing makes false or short, read on `main` at `99951e0d0e`; the batch changed no file under `.claude/` (the commit stage's `git diff --name-only dfcd36cbbf HEAD -- .claude/`). The proposed wording is mine; the writer keeps the skill's form. The revival change is in `compile-ladder/climb-batch-34b/RECORD.md`, "Revival changes, for the skill writer".

**False, on the record's list, checked:**
1. `SKILL.md:80`: "a program compiled so does not run yet". Now it runs against the one library's jars, which the onelibrary track compiles first; a program meets the walls of rows 994, 1091, 1098 and 1099 (F-396).
2. `references/build-and-caches.md:73`: "No compile writes the one library's jars yet, so a program compiled with the variable dies at its first library class: 'NoClassDefFoundError: fortress/FortressLibrary$String' (ledger row 1062)". False; see item 7 below for what to write.
3. `references/tests-writing.md:52`: "Give a plain test there a `compile` command only: a program compiled so does not run yet (ledger row 1062)." False: a plain run test runs there, as `OneLibraryRunHello.test`.
4. `references/compiler.md:45`: "though such a program does not run yet (`SKILL.md`, "How a program runs")". The clause holds, its reason does not: a varargs call's array class holds `ImmutableArray1`'s `copy` twice (row 1091).

**False or short, on no list:**
5. `references/interpreter.md:152`: "`throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero")` ... The string names the compiler's prelude's class for the exception." False: a helper names the exception by its simple name, `Utility.makeFortressException("DivisionByZero")`, and each set's `LibraryNames` maps it to its library's class (`nativeHelpers/simpleIntArith.java:43`; `Utility.java:34-36`). A new helper written as the sentence says raises the prelude's class under the selection too, which does not exist there.
6. `references/tests-running.md:14`: "about 2,560 tests ... in about 5 to 7 minutes". Now 2,645, and 11 minutes on the 2.10 GHz machine; the onelibrary track starts with the fourteen compiles, about 135 to 160 s for `FortressLibrary`.
7. `references/tests-running.md:116`, short: "The tests of `one_library_tests/` compile against the one library: run them with `ant testOneLibrary`." A run test there needs the fourteen jars: `ant testOneLibrary` compiles them first in its own caches folder, which `ant testSystem` deletes; with `junit.sh` and `FORTRESS_LIBRARY=one ONE_JVM=1`, name `OneLibraryComponents.test` first in the call; a hand run takes the track's jars with `FORTRESS_CACHES=$PWD/ProjectFortress/test-caches/fast-onelibrary` (`REPORT.md`, "Commands worked out").
8. `references/compiler.md:21` and `:32`, short: the payload classes carry the one library's seven, `Boolean`, `Char` and `FlatString` under the selection too, and the selection puts the second set of run-time classes, `ProjectFortress/build-one` from `ProjectFortress/src-one`, before the first; a change to a class that both sets hold, as `FValue`, is made in both.
9. `references/compiler.md`, "What the compiled path cannot compile yet", short: against the one library, `println` of a number or a boolean (row 1098), `=` and `<` of strings and `=` of booleans (row 994), a varargs call (row 1091), a reduction over a range (row 1099), a generic `u.asString` at `U extends ZZ32` (row 1101), an uncaught exception's report (row 1102), and a compile of `FortressLibrary` after other programs in one JVM (row 1100).
10. `references/library.md:54`, short: "For another component of the one library: no step, until the switch-over." `OneShotFlag`, outside the distance stage's fourteen apis, is now compiled in the onelibrary track; and an edit of any of the fourteen that the code generator refuses turns that track red, so `ant testOneLibrary` is a step for each.
11. `SKILL.md`, "The compiled runtime", short: "under the compiler's prelude, an `RR64`'s class extends `FRR64`" holds under the one library too.
12. `references/tests-writing.md:94`, step 2's first sentence: Part 1, finding 2. A new rule's wording, for the coordinator to judge, not for the record-landing.

**Sentences that hold, met by the batch:** `SKILL.md:80`'s "The compiled checker already finds no error in the interpreter's library"; `references/compiler.md:34`, no declaration added to the prelude; `references/gate.md:3`, "about 25 minutes", this gate 30.

## Part 4. Routing

The routing check of the manual's "After the landing: the coordinator's routing", step 2: each open row, record default and item for him has a home.

**Items for him: each has a home in `PLAN.md`, none yet in the review queue.** C.worker.1 with C.skeptic.1 (`PLAN.md:928`), C.worker.2 with C.skeptic.2 and C.skeptic.3 (`:929`), C.skeptic.4 (`:930`), C.reserved.1 and C.reserved.2 (`:931`), in the group "Climb batch 34b, listed for his review"; the merged-diff review confirmed each (its `curatorItems`). Owed: their items in the queue; `:928` with a default (Part 1, finding 1).

**The rows that the batch opened.**
- With a home: 1098 (`PLAN.md:928`), 1101 and 1102 (`:929`; 1102 also `:931`), 1103 (`:931`).
- **No line in `PLAN.md` or `review-queue.md`:** 1099, a method twice in `FullScalarRange`'s class, and 1100, the dispatch that follows the JVM's history. Owed (the homes are mine): 1099 with item 1 of the list for the batch after, beside row 1091; 1100 with item 3, beside row 996.
- Rewritten, with a home: 994 (`PLAN.md:930`; the list, item 1), 1091 (the list, item 1), 995 (`PLAN.md:72`).

**Record defaults.** The record gives its forks to the queue as new items after the landing (`CLIMB-BATCH-34.md`, "After the landing": "this record's forks as new items; items 513, 521 and 601 built; item 597 unchanged"). **Forks C1 to C6 have no item.** Owed: one item, as 606 is for run 1, each default as landed and its line of section 2 here; C3 with C.worker.2's.

**Queue items that the landing answered or made stale:** 513 (the builder's form, built as form 2); 521 (files of their own, built); 601 (the sites agree, no edit); 597, whose own "Needed by" sends it to part (a) at this landing, since the fourteen compile to jars; 608, way 3, held in its first batch (section 3).

**PLAN lines that the batch built or made stale.** The record and `RECORD.md`, "Left for the coordinator", list phase 4's F-34 line, the varargs line and the rehearsal's line (`PLAN.md:70`, `:71`, `:72`), "Next" and the lines of climb batches 34 and 34b. Each is checked:
- `:70` says the measure's script patches its tree since three components stop at row 874: now false (section 4);
- `:71` says varargs' run test waits for the first program that runs on the one library: now it waits for row 1091;
- `:72` names the carriers beyond N5's table, the two stores and the Java stubs as walls that only the switch shows: built;
- "Next" (`:13`) names run 2 as coming; "The live thread" (`:10`) and "Landed" (`:11`) name climb batch 34's gate as the last;
- the N4 and N5 lines (`:64`, `:65`) put the I/O classes over the one library's traits and the raise strings at the switch-over: built under the selection.

**The manual and the script:** process findings 2 to 7. **The skill:** Part 3. **FACTS and POSITIONS:** Part 1, "Corrections owed in the record".

## Part 5. The batch after

**The record's list, "For the batch after, in this order"** (`CLIMB-BATCH-34.md`, section 2, with run 1's review's additions, `reviews/batch-34-review.md`, Part 5), still holds in its order, and this landing changes it so:
1. **Rows 994, 1091 and now 1099, then `Arr` and `Dot` as run tests.** Row 994 comes first: every `=` of two strings meets it (C.skeptic.4), and the run tests of varargs and the conditional reduction stand behind it with the verifier off. With the three, `XXXOneLibraryRunVarargs`, `XXXOneLibraryRunConditionalReduction` and `XXXOneLibraryRunStringEquality` can be promoted.
2. **New: row 1098, `println` of a number,** once row 1098 has its default (Part 1, finding 1), with row 834; then `XXXOneLibraryRunHalf`.
3. **New: rows 1101 and 1102, fork C3's question,** which one repair can answer (`PLAN.md:929`), and row 1103, the singleton, a small repair of `Utility` on both libraries.
4. The verifier's count over the library's generic classes, and row 1054: unchanged.
5. Row 996, the stable order, now with row 1100 beside it; rows 1055, 1056 and 1035; the checker's other gaps; rows 1085 and 1086; the other forms of row 818: unchanged.
6. The rung on a `typecase` clause's static rules, if he answers items 592, 1081 and 1068: unchanged.
7. The matrix and the library's `DOT`, then microGPT's own needs: unchanged.

**What microGPT compiled against the one library meets first now: the checker.** A compile runs the checker before the code generator, so the flat program stops at its 42 sites of its own (F-58, a floor): 23 in `FlatArrays`, the bound `I extends Index` that its generic declarations do not write (P-156), then `DOT`, `view` and `gather` on arrays without sizes and a scalar beside one (P-87). Writing the bound is a model line, his to approve. Only past those, at the run, stand row 994 (`=` and its first `for` over `seq`) and, by reading, row 1099 at its reductions over ranges. The record's "Its arrays stop first at rows 994 and 1091 ... Then the checker stops its flat program at 42 places" (section 2, "The measures") gives the batches' order of work, not the order that a compile meets. Its prints compile: `println` of a string, and the juxtaposition of strings and numbers through `cast[\Object\](b).asString` (`Library/FortressLibrary.fss:4743`), by reading.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no code, test, specification text or entry of the record. I wrote this file and its line of `INDEX.md`.
- I took no measure: section 4 cites the worker's.
- I read the run's transcripts through scripts and the journal's results. For run 1's record-landing and the preparation, I read only the transcripts' labels, times, models, first messages and writes; for the coordinating session, its writes by time and its incoming messages from 21:50 on 2026-11-20 to 01:15 on 2026-11-21.
- A workflow's journal holds no times. The run's times are the agents' first and last records, the commits' times, the reflogs and the Workflow call.
- These are by reading, not run: that microGPT's prints reach `asString` through `Object` and miss row 1101; that microGPT meets row 1099 at its reductions; that `println` of any number, not only a `QQ`, meets row 1098.
- I did not date the export rule's note or `coverOverloading`'s covering form: the history before `5a68404fdf` is cut on those files, and `git log --all -S` found only the 2009 placeholder.
- I did not check each of the worker's quoted lines against its logs; I checked the calls of section 3, the times, and the claims in `REPORT.md:51-72` and `:91-106`.
- I did not run `record.py check` or `ledger.py landing-check` again; the gather's, the review's and the commit stage's runs are cited.
- The skill's load is a rough count, not `skill-load.py`'s.

## The steps due before the batch after

1. **The landing's own steps** (`references/batch.md`, "The landing"): the batch's to-dos swept from the shared task list (tasks 64 to 68, all `completed`), and each decision named in one line.
2. **The routing that no list holds yet** (Part 4): homes for rows 1099 and 1100; one queue item for forks C1 to C6; the four entries of `PLAN.md:928-931` as queue items; items 513, 521, 597 and 601 to part (a); PLAN's stale lines.
3. **A default for row 1098,** with row 834 beside it (Part 1, finding 1).
4. **The record's corrections** (Part 1): F-34's clause; F-24, F-312 and F-332; P-164's sentence, told to him; P-33's history.
5. **The base build of the landed tree for the batch after,** a worktree at `295c215c2c`, without F-34's measure: the landed code is the rung's measured code, and the gate's test checks it (process finding 4).
6. **The record-landing workflow for run 2** (`tools/record-landing/README.md`, with `batch: '34b'`, `base: 'a1c244be36c0c79f2f478b6e56a9769bd756fedb'`, `landing: '295c215c2c'`), with Part 3's list for the skill writer.
7. **The measure's script retired, or taught to run without its patch** (the record's "After the landing"; process finding 4).
8. **The manual and the script:** process findings 3, 5, 6 and 7, and step 2's wording (Part 1, finding 2), each at the coordinator's judgement.

## For the curator

Run 2 of climb batch 34 ran from 22:04 UTC on 20 November to 01:12 UTC on 21 November. In your time that is 23:04 to 02:12. It is pushed. Its one task landed. No line of the model program changed. You gave the go for both runs at 14:3x and 14:5x UTC on 20 November. Every decision took the planner's default, and this section is your review of them.

The words that this section uses:
- **Walk** is the interpreter. The **compiled path** checks a program with the **checker** and then writes JVM bytecode with the **code generator**.
- The **prelude** is the small library that the compiled path uses by default. The **one library** is the library of the interpreter. The **selector** is the setting `FORTRESS_LIBRARY=one`: with it, the compile command reads the one library.
- A **jar** is the file of compiled classes of one part of a library. The one library has fourteen parts.
- A **carrier** is the Java class that holds the values of a built-in type, such as `Boolean`, when a compiled program runs. The **second set** is a second group of carriers and other run-time classes, for the one library only.
- A **task** is one change of the run. The record names it a rung. A **worker** is an agent that does one task. A **skeptic** is a second agent that examines the worker's change and fixes what it finds.
- A **fork** is a design question with more than one way. A **default** is the way that the record chose before the run.
- A **row** is one known defect in the ledger. An **expected-failure test** is a test that is known to fail and is marked so.
- The **gate** is the full check before a run lands.

**What a program can do now.** This program joins two tests that landed, `OneLibraryRunHello` and `OneLibraryCatchHelperRaises`, shortened. It is compiled with the selector and then run:

    component Raises
    export Executable

    overflows(m: ZZ32): Boolean =
      try
        ignore(m + 1)
        false
      catch e
        IntegerOverflow => true
      end

    run(): () = do
      println("Hello, one library")
      largest: ZZ32 = 2147483647
      assert(overflows(largest), "the largest ZZ32 plus 1 overflows")
      println("PASS")
    end

    end

- Before: it compiled, but the run stopped at once: 'NoClassDefFoundError: fortress/FortressLibrary$String'. No compile wrote the one library's jars.
- Now: the two tests print "Hello, one library" and "PASS", as walk does. The JVM's verifier is on. The gate compiles the fourteen jars and runs this kind of program every time.
- Still stopped, each with a new row and an expected-failure test:
  - `println(q)` where `q` is a number, as a `QQ`, or a boolean;
  - `s = t` or `s < t` where `s` and `t` are strings, and `a = b` where they are booleans;
  - any call of a declaration that takes a varargs parameter;
  - a reduction over a range;
  - `u.asString` in a generic function where `u` has a type bounded by `ZZ32`.
- Changed, with a test that records today's output: an exception that no `catch` takes is reported with the text "Bogus value from FValue.asString()" in place of its message. And a caught `IntegerOverflow` is not the same object as `IntegerOverflow`. This second defect was already true against the prelude.

All tests passed at the gate, on the first run: 3,654 tests, and no failure. The two measures of the checker on the one library stay at 0. The quick microGPT check passed 7 of 7 for both programs.

**The forks that took the planner's default.** Each can be undone.
- **C1. `Boolean`, `Char` and the flat string are written over small hand-written classes that hold the Java value.** The other way: classes written by hand over generated ones, which Java cannot express for the flat string.
- **C2. The second set is a second folder, `ProjectFortress/build-one`, under the same class names. The class path puts it first when the selector is set.** The other way: new class names for the one library's carriers, which every place that names a carrier would then follow.
- **C3. The run time names no prelude class where the second set is in use.** The task did this in the second set only. The plan said both sets. In the first set it made a team test, `Compiled17a`, fail against the prelude. In the second set it leaves two defects, both above: the generic `u.asString`, and the report of an exception that no `catch` takes. A later task chooses the repair. Three ways are open (`PLAN.md:929`).
- **C4. The fourteen parts compile as tests of the one-library group.** The task put them in one test file that runs first. When they compiled after other tests in the same JVM, the library's code came out wrong, and every run failed. That defect is a new row. The other way: a build step before the tests.
- **C5. The old search of the trait table by the prelude's names stays.** The other way: a search of the one library's names too. Nothing needed it.
- **C6. A waiting run test is promoted only if it passes with the verifier on.** None of the three passed. Each stays an expected failure, with the row of its new defect.

**The items on your list.** None holds a batch.
- **Which export rule holds?** The library's interface declares `println` at `Number` and at `Boolean`. Its code declares `println` only at `String` and at `Any`. The specification's text requires a declaration at each type that the interface names. A note in the specification, signed "Victor", allows a wider declaration. The team's checker follows the note. The record does not settle it, and no default is set. The review proposes the note's rule as the default, because the team's later code and the library both follow it. Until the rule is set, a compiled `println` of a number fails against the one library. microGPT prints only strings, so it does not need this answer yet.
- **How is `FValue.asString` typed in each set?** This is fork C3 above. The default keeps it as landed.
- **The premise of fork B2 was false.** Every comparison of two strings meets row 994, not only the two array programs. The batch after takes row 994 first anyway.
- **Two run tests print another line than walk.** These are the two changed outputs above. Each is a row. Told.

**The new rule for expected failures, in its first run.** Your rule of 18 November says: write the test, state the expected failure, then run it. Since this run, the worker writes the statement in the same command that first runs the test. Every first run of every test had its statement, and the skeptic checked each one by its command. Each run failed as stated, or the worker found the cause and stated it again. Three test programs were run under walk before their first test run, to learn walk's answer. A walk run cannot show the compiled failure, so the rule's purpose held.

**Two events.**
- **Nothing else was committed while the run merged its task.**
- **No message of yours reached an agent.** You sent none during the run.

**The cost.** The run wrote 2.10M tokens. The estimate was 2.4M, and 3.0M with its reserve. The reserve was not used. The work after run 1 landed wrote 4.05M, and the preparation of this run 0.32M.
