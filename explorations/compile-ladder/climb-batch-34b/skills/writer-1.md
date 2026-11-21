I brought eight files of the `fortress-repo` skill in line with climb batch 34b's landing, in one commit. Nothing was installed from the orientation, and I did not push. The lint found nothing in the changed files.

## Commits

- `2d194074ed` "fortress-repo: the parts in line with climb batch 34b's landing". It changes eight files: 44 lines added, 10 removed.

There is no commit for `revival-changes.md`. The orientation update admitted no entry, its judge did not run, and so there was nothing to install.

## Sentences changed, with their reasons

1. **`SKILL.md`, "How a program runs".**
   - Before: the text said that a program compiled with `FORTRESS_LIBRARY=one` "does not run yet". That is now false.
   - Now: "a program compiled so runs against the one library's jars (`references/build-and-caches.md`, "The caches"), but fails at some constructs that walk runs (`references/compiler.md`)."
   - Grounds: F-396; ledger row 1062, now fixed.
2. **`SKILL.md`, "The compiled runtime".**
   - Before: the text limited the rule to the compiler's prelude.
   - Now: "under either library, an `RR64`'s class extends `FRR64`".
   - Grounds: F-388; `NamingCzar.java:637-655`.
3. **`build-and-caches.md`, "The caches".**
   - Before: the text said that no compile writes the one library's jars, so such a program dies at its first library class.
   - Now: "A program compiled with the variable runs only if its caches folder holds the jars of the one library's fourteen components, which `one_library_tests/OneLibraryComponents.test` compiles (`tests-running.md`, "Compiled tests")."
   - Grounds: F-396.
4. **`tests-writing.md`, "Where a test goes".**
   - Before: the text said to give a test there a `compile` command only.
   - Now: "A plain run test there runs against the one library's jars, as `OneLibraryRunHello.test` does."
   - Grounds: F-396; I read the `.test` file to confirm it.
5. **`compiler.md`, "What the two paths share".**
   - Before: the text said that only the prelude's number objects extend the run-time number classes.
   - Now: "payload classes that the classes of either library's number objects extend, and under the one library also those of `Boolean`, `Char` and `FlatString`."
   - Grounds: F-388; `NamingCzar.java:637-655`.
6. **`compiler.md`, "The compiler's prelude, until the switch-over".** The part did not say that the run time's classes now come in two sets. Added:
   - "The run time's classes that name a library's types, as `FValue` and `FException`, come in two sets under the same names: `ProjectFortress/build` for the prelude, and `ProjectFortress/build-one`, built from `ProjectFortress/src-one`, for the one library."
   - "With the variable, the class path puts the second set first."
   - "Make a change to a class that both sets hold in both."
   - Grounds: F-396 and F-353; I checked that `src-one/.../runtimeValues/` holds both classes.
7. **`compiler.md`, the varargs paragraph.**
   - Before: the clause was true, but its reason was wrong.
   - Now: "though a program that calls a varargs declaration does not run yet (ledger row 1091)."
   - Grounds: F-390; ledger row 1091.
8. **`compiler.md`, the same section, new.** The part had no list of where a program compiled against the one library fails. Added a list:
   - a call of a varargs declaration (ledger row 1091);
   - a reduction over a range (row 1099);
   - `println` of a number or a boolean (row 1098);
   - `=` and `<` of two strings, and `=` of two booleans (row 994);
   - `u.asString` in a generic body, for `u` of a type parameter bounded by `ZZ32` (row 1101);
   - an uncaught exception, which the run reports with a placeholder (row 1102).

   It also adds: "In one JVM, compile `FortressLibrary` before any other program." The reason is row 1100. Each item gives the error message from its ledger row.
9. **`compiler.md`, "Traps of the compiled path", new.**
   - Added: "On the compiled path, against either library, an exception object without value parameters that a helper raises is a second instance of the object. So in `catch e IntegerOverflow => e SEQV IntegerOverflow`, the comparison is `false`. Walk gives `true` (ledger row 1103)."
   - Grounds: row 1103; F-336; `Utility.java:66-69`.
10. **`interpreter.md`, "Natives".**
    - Before: the text said that a helper names the prelude's whole class, as `"fortress.CompilerBuiltin$DivisionByZero"`. A new helper written that way would raise a class that does not exist under the one library.
    - Now: `throw Utility.makeFortressException("DivisionByZero")`, and "The string is the exception's simple name, and `LibraryNames` maps it to the class of the library in use."
    - Grounds: F-24, F-312 and F-336. I checked the code: `simpleIntArith.java:43`, `Utility.java:34-36`, both `LibraryNames.java` files and walk's `StaticNativeApp.raised`. The text that follows on walk's behaviour stays true.
11. **`tests-running.md`, "The two suites".**
    - Before: "about 2,560 tests ... in about 5 to 7 minutes".
    - Now: "about 2,650 tests ... in about 11 minutes".
    - Grounds: the gate's `summary.txt`. I counted its `testFast` rows by hand: 2,645 tests, 11 minutes 5 seconds.
12. **`tests-running.md`, "Compiled tests".**
    - Before: the text said only to run the tests of `one_library_tests/` with `ant testOneLibrary`. It did not say that a run test there needs the fourteen jars.
    - Now: the text says that a run test needs those jars, and gives a list of three ways to run the tests:
      - `ant testOneLibrary` compiles the fourteen first, in its own caches folder, `ProjectFortress/test-caches/fast-onelibrary`. `ant testSystem` deletes that folder.
      - With `junit.sh`, set `FORTRESS_LIBRARY=one ONE_JVM=1`, and name `OneLibraryComponents.test` first.
      - For a run by hand, set `FORTRESS_CACHES=$PWD/ProjectFortress/test-caches/fast-onelibrary` and `FORTRESS_LIBRARY=one`.
    - Grounds: `build.xml:1175-1185`; the rung's report, "Commands worked out"; `junit.sh:27-31`.
13. **`library.md`, "Designing a change".**
    - Before: an edit of the fourteen components had no compiled step.
    - Now: "For any of the fourteen, also `ant testOneLibrary`. Its `OneLibraryComponents.test` compiles them, so it also fails on a declaration that the code generator refuses."
    - Grounds: F-34.

`sources.md` has a new section, "Climb batch 34b's landing, 2026-11-21", with one line for each change.

## Orientation

- No section was installed, and none was held. The admission admitted no entry.

## Data lines left as they were

- **`tests-writing.md:94`, step 2's first sentence.** This was not changed. The change that the review proposes alters what the rule means, and the landing did not change the tree there. The review also leaves it to the coordinator's judgement. It is a decision not taken (below).
- **The changed decision on P-33.** No sentence of the skill rests on its old ground. I searched for "one build", "both libraries" and similar words.
- **The coordinator's decision on P-164.** It is in the `coordinator` skill, which is outside my scope.

## Decisions not taken

- **`tests-writing.md:94`.** The current rule is "Run the test's program through the harness before you run it any other way". There are two choices:
  - Keep it as it is.
  - Limit it to the path that the test checks, as the review proposes. A walk run of a compiled run test's program, for its expected output, may then come first.

  This changes the rule's meaning, so the coordinator decides. A cold read should follow if it changes.
- **The diagnostic message in `build-and-caches.md`.** I did not keep 'NoClassDefFoundError: fortress/FortressLibrary$String' as the message for a run that finds no jars. The code points that way, but I did not run it to confirm.

## For the coordinator

- **`compiler.md`, "Natives": "Until the switch-over, a compiled test cannot reach the interpreter's library's bindings."** The landing made this sentence false. `OneLibraryCatchHelperRaises` now reaches those bindings. The data does not name the sentence, so I left it as it is.
- **`tests-running.md`: "`ant testSystem` ... about 680 tests ... in about 2 to 4 minutes".** This sentence is stale. The gate ran 879 tests in 4 minutes 39 seconds. It was probably stale before this landing, and the data does not name it, so I left it as it is.
- **The `coordinator` skill's "Quiet times" (P-164).** If it needs a change, that change is yours.
- **A fault of the data: the "fourteen" components.** The review says that `OneShotFlag` is "outside the distance stage's fourteen apis". F-53 and `OneLibraryComponents.test` both include `OneShotFlag`. The skill follows F-53.
- **A fault of the data: row 1103.** The data's list of the compiled path's walls leaves out row 1103. The admission adds it, and F-396 lists it. I added it as a trap, because it also holds against the compiler's prelude.
- **Points about how agents work.** These stayed out of the skill:
  - The skeptic compiles the fourteen again after `ant testSystem` deletes their jars.
  - The gather runs the whole onelibrary track again.
---
session 50f20f81-fbf2-4953-9283-f60567b9f188 turns 69 cache writes 113539 reads 5868738 output 27989 labels {'ephemeral_1h_input_tokens': 113425, 'ephemeral_5m_input_tokens': 0}
