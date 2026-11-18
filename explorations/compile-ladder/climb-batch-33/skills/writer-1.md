I fixed every skill sentence the landing made false, all inside the `fortress-repo` skill, in two commits. Both pass the lint with no hits, and I did not push.

## Commits

- `77a3dcd55b` "fortress-repo: install the orientation update of climb batch 33's landing": `revival-changes.md` and its lines in `sources.md`.
- `09adb04dfa` "fortress-repo: area parts after climb batch 33's landing": seven parts and their lines in `sources.md`.

## Orientation installed

The judge's verdict was to install the whole text, with no section held, so I copied `orientation.md` over `revival-changes.md`. The file went from 33,285 to 33,263 bytes. "Traits and objects" and "Numbers" changed; the opening and the other four sections were already the same text.

- **"Traits and objects".** It said three compiled shapes of a self-typed trait fail when the class loads, gave workarounds, and advised declaring your own `MIN` and `MAX`. All three now run (rows 1050, 1051 and 1052, fixed; F-377, F-385). What is left is one shape: `self` in one arm of a `typecase` (row 1070), with its workaround `do r: R = self; r end`. It also cites row 999 now.
- **"Numbers".** It said a `typecase` arm at `Int` takes every value without a message. Now such an arm is refused as undefined, an arm over every value is written `x: Any =>`, and the tuple-arm exception of row 1064 is stated (F-382).

## Sentences changed

| Part, section | What was wrong | New text | Grounds |
|---|---|---|---|
| `SKILL.md`, "The phases" | "Each path has its own library" was true only by default | "With `FORTRESS_LIBRARY=one`, `fortress compile` reads the one library instead, and a program compiled so does not run yet (`references/build-and-caches.md`, "The caches")." | F-381; row 1062 |
| `SKILL.md`, "The caches" | It left out the new caches folder | "…in `default_repository/caches-one/` with `FORTRESS_LIBRARY=one`…" | F-381 |
| `compiler.md`, prelude section | It said the compiled path always uses the prelude | "…uses the compiler's own prelude, unless `FORTRESS_LIBRARY=one` selects the one library: …" | F-381 |
| `compiler.md`, "The runtime" | It gave only two changes to the class loader | "…and to choose a call's opcode from the owner's class file without loading the owner (F-385)." | F-385; `MethodInstantiater.java:310` |
| `compiler.md`, traps | Row 1060's conversion was said to die at run time; it runs now | Replaced by the two numeral refusals that remain, with the workaround: declare the types. | rows 1074, 1075 |
| `compiler.md`, traps | Row 964 was given as a compiled-path stop only | Adds "Walk stops on it too when it runs." | row 964's note |
| `compiler.md`, traps | Four traps were missing | New ones for rows 1067, 1072 and 1071 (each with its workaround) and for the function-expression route of row 559. | rows 1067, 1072, 1071, 559 |
| `compiler.md`, checker's gaps | It said row 812's case crashes the code generator; it compiles now | Sentence removed. | F-384 |
| `compiler.md`, `fortress` commands | It did not say how the variable changes the library | "With `FORTRESS_LIBRARY=one`, `useCompilerLibraries()` points them to the one library (`Shell.java:377-388`)." | `Shell.java` |
| `interpreter.md`, "What walk checks" | It said these commands always use the prelude | "…use the compiled path's desugaring switches, and the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library… So by default `fortress typecheck` does not check…" | P-12's new words; F-381 |
| `library.md`, "Designing a change" | The same claim | "by default, `fortress typecheck` checks against the compiler's prelude." | P-12's new words; F-381 |
| `tests-writing.md`, superscript rule | It said `x[5]^2` stops the compile | "`x[5]^2` compiles, but under walk fails or gives the wrong element (ledger row 1)." | F-387 |
| `tests-writing.md`, refusal at load | It left out static errors of the phases | "…or a static error of a phase before the run, such as the disambiguator's, counts as a refusal." | F-383; `FileTests.java:875-878` |
| `tests-writing.md`, test folders | The new test folder was missing | New bullet for `one_library_tests/`, run by `ant testOneLibrary` and `testFast`. | F-381 |
| `tests-running.md`, glossary and "The two suites" | It said four tracks and about 2,100 tests | Five tracks; about 2,560 tests in five tracks, four at once; misc leaves out `OneLibraryJUTest`; a new onelibrary bullet. | `build.xml:1262`, `:1277` |
| `tests-running.md`, "Compiled tests" and track targets | It had no way to run the new folder | Run `one_library_tests/` with `ant testOneLibrary`; that target added to the list. | `build.xml:1146` |
| `build-and-caches.md`, "The caches" | It said nothing about the selection | New paragraph: the `caches-one` folder; set the variable, not `-Dfortress.library=one` alone, or the compile and the run use different folders ('Could not load P'); no compile writes the one library's jars yet, so a run dies at its first library class (row 1062). | F-381; the class path scripts at `:27`; review section 2, S1 |
| `build-and-caches.md`, "Building" | The stamp rule and `ant cleanCache` named one folder | The build keeps or empties both folders, each by its own stamp; "`ant cleanCache` deletes both folders, whatever their stamp." | `build.xml:363-377`, `:553-565`, `:863` |

## Already true, or placed differently

- `build-and-caches.md:91`, the check of five jars in `default_repository/caches/`, stays true for that folder. I put the fact that `caches-one` has no library jars into the new caches paragraph and left this line unchanged.
- Row 1070 is not repeated in `compiler.md`'s traps, because the installed orientation now holds it. Stating it twice would break the rule that a fact is stated once.
- C158 is for the next orientation update and C171 is the boot note, so neither was mine to change.

## Choices I made

- **Wording for the selection.** I wrote `FORTRESS_LIBRARY=one` each time instead of adding a glossary term such as "the selection". Adding the term is the alternative.
- **Row 559.** I added only the function-expression route, with "Write none in a compiled program". The ledger gives no workaround. The alternative is to state all four of the row's routes.
- **`junit.sh` and `one_library_tests/`.** I did not check whether the script runs these tests, so the skill names only `ant testOneLibrary`.

## For the coordinator

- The `testUntil` and `testCruiseControl` targets now report a `OneLibraryJUTest` failure (review section 2, S2). No skill sentence covers this.
- These are named in the judgement but not in my data, so I left them: row 1063 (a grammar api crashes the checker under the selection); rows 1065, 1068 and 1069; and the getter-before-method message ('Field/getter/setter declarations should come before method declarations.').
- `tests-running.md` still gives testFast as "about 5 to 7 minutes". This gate took 8 minutes 53 seconds, but nothing in my data grounds a change.
- The judgement notes that the regression key's case 37 wording differs from the installed text, and that its case 1 is now true by default only. The key and `questions.md` are modified but uncommitted in the working tree; I did not touch them.
- In `sources.md` I wrote P-12's change as "P-12's words as this landing recorded them, its decision unchanged". I left out the "his rule of 2026-10-31" that the data mentions, because the data does not make clear whose words the new wording is.
---
session be89447a-db97-47f4-9dea-6bea7fcefc92 turns 71 cache writes 118424 reads 4064271 output 25611 labels {'ephemeral_1h_input_tokens': 118338, 'ephemeral_5m_input_tokens': 0}
