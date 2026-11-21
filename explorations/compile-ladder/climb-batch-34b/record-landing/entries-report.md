<!-- The entries writer's report for climb batch 34b's landing (295c215c2): for each change of owed.md whose writer is entries, the old and new words, the meaning, the size, and the questions for the curator. -->

# The entries writer's report, climb batch 34b

Files: `record.apply` (12 entry lines, 2 noted blocks), `clean.txt` (the 12 new lines), `cut-only.txt` (empty: no POSITIONS change only deletes words), this report. No `rows.rewrite`: no change has a row as its home.

The whole old lines are in `entries.md` (F-34 to F-396) and in `FACTS.md` and `POSITIONS.md` at `00bde0ee4` (F-24, F-301, F-312, F-332, P-164). Below, each change gives the sentences that changed. Sizes are estimates, since this session could not run a script to count them; `checks.sh` reports the exact sizes (round 1's are in `mech-1.md`, "lengths.py").

## The fix round

`check.md` failed six changes in my homes; each is fixed as it corrects:
- C6: "the machine was climb batch 34's" is now "the CPU line was climb batch 34's".
- C7: the row-1103 sentence is back to its row's scope: an exception made without the constructor "is a second instance of the object (row 1103)".
- C13, C14: the index agreement with `init` is back ("There the index of each element, made by `FZZ32.make`, agrees with the array's `init`, since ... (F-388, F-396)"); the read-back with the verifier off is what moved to the report.
- C15: F-396's title is now "The one library compiles to jars over a second set of run-time classes, and a program compiled against them can run on the compiled path, as one that prints a line does."
- C20: F-301 now says "the `make` of the number's value object, the prelude's or under the selection the one library's".
- C21: P-164's last clause is now "and `fileOps`' raises build the one library's exceptions (F-336)", the requirement's effect without fork C3's mechanism. The provenance cites the rule by its words, its time and `0476cd4396`, in place of a `HELD.md` heading that does not exist.

From `cold-read.md`, passages read two ways, fixed in place:
- F-34: "The count's check" is now "The test that checks this count of refused declarations".
- F-336: "the helper's simple name" is now "the exception's simple name, which the helper passes"; the two lists of caught exceptions now name their library ("against the prelude", "against the one library").
- F-24: "gives it" is now "gives the simple name".
- F-353: "but for" is now "except for".
- F-396: "the export rule" is now "the export check's rule", the skill's term.

Left as they are, with no source to settle them or outside the changes owed: the cold reader's questions on F-34's setting ("the bound `Any`", F-53's), on F-388's "stamped instances" and "the RTTI", on F-312's "626 printed pairs", on F-301's "springboard", and P-164's other terms. These are old wording, not this landing's. For the skill writer: the skill contradicts F-381 and F-396 in `SKILL.md`, `build-and-caches.md` and `tests-writing.md` (no compiled run against the one library), and F-336, F-24 and F-312 in `interpreter.md`, "Natives" (a raise string that names the prelude's class), as the sorter's "For the coordinator" lists.

## C1, C2, C3: F-34

- Old title: "Against the interpreter's library, on the code of `285efad802` and of climb batch 34b's rung C, the code generator refuses none of the declarations of the fourteen components that the distance stage checks; since rung C the count needs no patch, and the components compile to jars (F-396)."
- New title: "Against the interpreter's library, the code generator refuses none of the declarations of the fourteen components that the distance stage checks, and a test in every gate compiles the fourteen whole."
- Old: "No emitted class of the measure is run, and no test checks the count, since the gate's distance stage runs no code generation; classes that do not load or verify stand between the library's jars and a run (rows 1091, 1099)."
- New: "The count's check is `one_library_tests/OneLibraryComponents.test`, which the onelibrary track runs first in every gate (`OneLibraryJUTest.java:44`): it compiles the fourteen to jars, so a refused declaration turns the gate red (F-396)." And: "The script runs no class that it emits, so it cannot see a class that fails when it loads or at the JVM's verifier; such classes stand between the library's jars and a run (rows 1091, 1099; F-396)."
- The measure's figures stay: 0 refused, 754 emitted, no component failure, on `f3439cf7ce` without the patch and on `285efad802` with it.
- Moved to the history (the provenance note): the count on `ba3c7c876d` (1 refused, 753 emitted, `__bigOperator2`, row 1076) and the real compile's 2 refusals there (row 818); the patch's story (`NamingCzar.java:606-614` at the base); the script's edit of `NN32`'s two getters (F-394). The Detail drops `measure-ba3c7c876d.txt` and `rehearsal.md`, section 3, which held only the moved sentences.
- Meaning: changed in one clause, by C2's ground. "No test checks the count" becomes "a gated test checks it" (`OneLibraryComponents.test:2-3`, `OneLibraryJUTest.java:44`, the gate's `fast-onelibrary/OneLibraryJUTest 40 0 0 0`). "No emitted class is run" is scoped to the script. Everything else: unchanged.
- Size: 2693 at the base of this run; about 1850 now. Past 600, kept by question 1: the setting, the figures with their code states, the gated test, the script's blind spot (what it cannot see), and the command, which a worker who repeats the measure needs.

## C4: F-53, keep

The commit stage's rewrite. Its figures come from the gate's tables, and its title's batch is its only change. The commit stage named no sentence false. No line.

## C5: F-240, keep

The commit stage's figures are kept. The commit stage named no sentence false. No line.

## C6: F-240's history, a noted block

- The note: at this gate the distance stage ran beside the library order, before `testFast`, where the text says "then beside the first minutes of `testFast`"; the machine was the 2.10 GHz Intel Xeon of climb batch 34; `testFast` took 11 min 5 s against 11 min 45 s.
- Meaning: unchanged. The entry's text stays, by the brief's rule on F-53 and F-240.

## C7, C8: F-336

- Old title: "A compiled helper's raise with a message builds its library's exception over that library's `String`."
- New title: "A compiled helper's raise builds the exception of the library in use, with its message where the exception has a constructor over that library's `String`."
- The two libraries' class lookup and constructor lookup are now one sentence. The two `String` class names are left to the report.
- Row 1103 stays said of the exception made without the constructor: "..., and so is a second instance of the object (row 1103)".
- Old: "So `FailCalled`, `FileNotFoundException` and `IOFailure` raised by a helper reach a `catch` on the compiled path, against the one library `IntegerOverflow` and `FileNotFoundException` among them".
- New: "So on the compiled path a helper's `FailCalled`, `FileNotFoundException` and `IOFailure` reach a `catch` against the prelude, and its `IntegerOverflow` and `FileNotFoundException` against the one library".
- Meaning: the title no longer claims more than the body (C7's ground). The rest: unchanged.
- Size: 1358; 1379 after round 1, about the same now. Past 600, kept by question 2: a reader who writes a helper's raise needs the lookup, the exception without the message, and which raises reach a `catch` on each path.

## C9: F-352, keep

The gather's rewrite passes. The title leads with the scratch tree. It names `main`'s run by F-396. "rows 874 and 995: row 874 fixed since" is in the entry's own form, as "row 992, fixed since" is. It was past 600 at the base, and this landing owes no cut. No line.

## C10: F-353

- Old: "The classes of the build that link against a prelude class by name are the thirteen, ...; every other mention of the prelude in the run time and the helpers is a string, 105 raise strings among them (read in the constant pools of `ProjectFortress/build`)."
- New: "There the classes of the build ...; every other mention ... (read in the constant pools of `ProjectFortress/build`); on `main` a raise string names the exception by its simple name (F-336)."
- Meaning: unchanged for the scratch tree. The sentence is now scoped to it, and the clause on `main` states what changed (`nativeHelpers/simpleIntArith.java:43`, `Utility.java:34-36`).
- Size: 1852; about 1915 now. It grew by the clause that C10 owes, and nothing else.

## C11: F-381

- New: the Detail gains `compile-ladder/rung-first-run-one-library/REPORT.md`, "The tests: the failing runs on the base, the passing run", the source of the run sentence.
- Meaning: unchanged. Size: 1031; about 1135 now. Past 600, kept by question 1: the selection, its caches and its tests are what a worker sets.

## C12: F-388

- New: the Detail gains `compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)".
- Meaning: unchanged. Size: 1467; about 1560 now. Past 600 at the base already, and it grew only by the Detail.

## C13, C14: F-390

- C13: the run sentence holds (the review, section 1: item 601's sites agree, since the one library's `ZZ32` is `FZZ32` in every descriptor).
- Old: "There the index of each element, made by `FZZ32.make`, agrees with the array's `init`, since the one library's `ZZ32` is `FZZ32` in every descriptor (F-388, F-396): with the JVM's verifier off a varargs call's array reads back its elements, and with it on the array's class does not load, since it holds `ImmutableArray1`'s `copy` twice (row 1091), so no program that calls a varargs declaration runs yet."
- New: "There the index of each element, made by `FZZ32.make`, agrees with the array's `init`, since the one library's `ZZ32` is `FZZ32` in every descriptor (F-388, F-396); with the JVM's verifier on, the array's class does not load, since it holds `ImmutableArray1`'s `copy` twice (row 1091), so no program that calls a varargs declaration runs yet."
- The read-back with the verifier off goes to the report, which the Detail cites.
- Meaning: unchanged. Size: 1965; about 1880 now. Past 600, kept by question 1: the convention, its walls (rows 1085, 1086, 1091) and its tests are what a worker on varargs needs. I did not move more out, since C14 names only the run's account.

## C15, C16: F-396

- Old: "So a program against the one library meets the code generator's own walls: a varargs call (row 1091), a reduction over a range (row 1099), `println` of a number (row 1098), `=` of two strings or two booleans (row 994); and the library's compile depends on what its JVM compiled before (row 1100), so the track compiles it first."
- New: "Against the one library the compiled path still departs from walk, each at a row: a varargs call (row 1091); a reduction over a range (row 1099); `println` of a number or a boolean, which the export rule decides as much as the code generator (row 1098); `=` of two strings or two booleans, and `<` of two strings (row 994); `u.asString` in a generic body at `U extends ZZ32` (row 1101); the report of an uncaught exception (row 1102); a caught exception that a helper raises, which is not its object (row 1103). The library's compile depends on what its JVM compiled before (row 1100), so the track compiles it first."
- Old: "... built from `ProjectFortress/src-one` by the same `ant compileAll` and covered by its stamp, for the one library, which `bin/fortress_classpath` and the track put first under the selection."
- New: "... built from `ProjectFortress/src-one` by `ant compileAll`, for the one library, which the class path puts first under the selection." The stamp, `bin/fortress_classpath:27-39` and the track's `classesFirst` are left to the report, which the entry cites.
- Old title: "The one library compiles to jars and runs on the compiled path, over a second set of run-time classes."
- New title: "The one library compiles to jars over a second set of run-time classes, and a program compiled against them can run on the compiled path, as one that prints a line does."
- Meaning: the list of departures now matches the review's list in section 1 (C15's ground), and the title claims no more than the body. The rest: unchanged.
- Size: 1639; about 1800 now. It grew by the three rows that C15 owes, after the build detail moved out. Past 600, kept by question 1: the selection, the two sets, the carriers and the departures are what a worker on the one library acts on.
- For the skill writer: the two sets and the class path order (`build-one` first under the selection; a class that both sets hold is edited in both) belong in `fortress-repo`'s `references/compiler.md`, as the sorter's "For the coordinator" says.

## C17: F-24

- Old: "A native bound to a helper of `nativeHelpers/` raises the library's own exception where the helper raises a class of the compiled prelude, such as `fortress.CompilerBuiltin$DivisionByZero`, so ..."
- New: "A native bound to a helper of `nativeHelpers/` raises the library's own exception where the helper raises one by its simple name, such as `DivisionByZero`, since walk reads the name in the class name that the class path's `LibraryNames` gives it (F-336), so ..."
- Meaning: the mechanism is corrected to the tree (`simpleIntArith.java:43`; `Utility.java:34-36`; `StaticNativeApp.raised`, `:273-282`, whose pattern takes `fortress.<Api>$<Name>` of either library). Walk's answers: unchanged. Size: about 870, near its old size.

## C18: F-312

- Old: "Each raises `fortress.CompilerBuiltin$DivisionByZero` at a zero divisor, which walk raises as the library's `DivisionByZero` (F-24)."
- New: "At a zero divisor each raises `DivisionByZero` by its simple name, which the class path's `LibraryNames` maps to the compiled library's class (F-336), and walk raises the library's `DivisionByZero` (F-24)."
- Meaning: the same correction as C17. Size: about 1385, about 25 more than before.

## C19: F-332

- Old: "A `catch` sees each on both paths, since a compiled helper's raise builds the prelude's exception (F-336)."
- New: "A `catch` sees each on both paths, since a compiled helper's raise builds the exception of the library in use (F-336)."
- Meaning: now true under the selection too (`OneLibraryCatchHelperRaises.test`). Otherwise unchanged.

## C20: F-301

- Old: "(`compiler/runtimeValues/FZZ32.java:40-48`, where `make` now calls the `make` of the prelude's value object through a method handle, F-388)".
- New: "(`compiler/runtimeValues/FZZ32.java:40-48`, where `make` now calls the `make` of the number's value object, the prelude's or under the selection the one library's, through a method handle, F-388)".
- Meaning: the handle reaches either library's object (F-388). The measurement, taken against the prelude, stays.
- C20's ground is wrong in one point: the lines did not move. `FZZ32.java` is unchanged between `a1c244be3` and `295c215c2`, and `make` is at `:40-48` (`:39` is its comment). I kept `:40-48`.

## C21: P-164

- Old: "At the switch-over, the run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits, and the boxed-type table's two entries and `fileOps`' raise strings name the one library's types."
- New: "Under the selection of the one library, and so at the switch-over, the run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits, the boxed-type table's two entries name the one library's types, and `fileOps`' raises build the one library's exceptions (F-336)."
- Not cut only: the sentence gains words.
- The decision, before and after: the five I/O objects become plain Fortress objects, each over a Java-backed value in a field, of the two traits `JavaBufferedWriter` and `JavaBufferedReader` that `FortressLibrary` declares. Unchanged.
- Its reach, before and after: walk and the compiled path, with the compiled half at the switch-over. After: the compiled half holds under the selection of the one library, and so at the switch-over. The timing changed because the tree built it earlier (`src-one/FJavaBufferedReader.java:21`, `src-one/FJavaBufferedWriter.java:21`, `NamingCzar.java:612-624`).
- Its requirement, before and after: the two classes implement the one library's traits, and the table's two entries name its types. Unchanged. Before, the raise strings named the one library's types. After, the raises build the one library's exceptions: the requirement's effect, which the tree meets (`fileOps.java:37`; `src-one/LibraryNames.java:43-45`; `OneLibraryCatchHelperRaises.test`). How the strings name the exception, by simple name, is fork C3's default, and the entry does not state it as his decision.

## C22: P-33's history, a noted block

- The note: the ground of the block of 2026-11-18 08:14Z ("one build serves both libraries with one set of run-time classes") no longer holds, since one build now builds a second set for the one library's carried types other than the seven number types (F-396; `build.xml:852-872`). The text, "one build serving both (F-381)", stays true.
- Meaning: unchanged. The words that the 2026-11-18 block cut do not come back, since the text holds without them and F-396 holds the mechanism.

## Decisions not taken

- F-34: I did not delete the measure's command, although process finding 4 proposes to retire the script. The retirement is the coordinator's step. Alternatives: keep the command as written (done), or cut it once the script is retired.
- F-390: I moved out only the run's account. Alternatives: also move `CodeGen.evalVarargsArgs`, `emitVarargsArray` and `OverloadSet.VarargsExpansion` to the report (question 4), which would cut about 120 characters more.
- F-396: row 1098 is named as "the export rule decides as much as the code generator", from row 1098's notes. Alternatives: name row 1098 without that clause, as a run-time departure only.

## Questions for the curator

- P-164 (C21): your decision required that `fileOps`' raise strings name the one library's types. Since climb batch 34b they name neither library: each set of run-time classes maps the simple name to its library's class, a default of the batch's planner. The entry now requires only the effect, that the raises build the one library's exceptions, which the tree meets. I changed the sentence under your rule of 2026-10-31. Does the effect state your requirement, or did you mean the strings themselves?

## What I could not follow

- I could not run `skills-lint.py`, or a script that counts each entry's characters, in this session: each `python3` and `awk` call asked for an approval that a headless session cannot give. So no lint ran on these files, and the sizes after the fix round are estimates.
