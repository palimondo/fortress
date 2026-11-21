<!-- The orientation workflow's admission, update mode, for climb batch 34b's landing (run 2 of CLIMB-BATCH-34.md, rung C): which of the landing's 14 new and changed FACTS entries change the fortress-repo skill's orientation (none: no sentence of revival-changes.md is made false, and each new rule is the compiled path's, the natives' or the record's), where each entry belongs instead, and the skill and quiz items outside the orientation that the landing bears on. -->

# Admission: climb batch 34b

**Inputs**

- Base: `main` at `8965c32e03` (2026-11-21 02:37). The orientation was last changed at `86acf04074` (2026-11-20 21:40). Since then, `.claude/` has changed only in `sources.md` and `tests-writing.md` (`git diff --stat 86acf04074 HEAD -- .claude/`). The code is rung C's, `f6469d96ec`. Since then, only `Specification/fortress.pdf` has changed under `ProjectFortress`, `Library`, `bin` and `Specification`.
- The entries, each read with `explorations/coordinator/tools/facts-extract.sh`. What changed in each is a word diff of its line in `FACTS.md` at `86acf04074` against `HEAD`. No entry changed between `86acf04074` and the batch's base `a1c244be36`. The commits that changed each:
  - New: F-396 (`f6469d96ec`; then `11ac1ddf75` and `b5a4765829`, wording).
  - Changed in a claim by rung C's commit: F-381, F-388, F-390 and F-353, which the rung's record names; F-34 and F-352, which the gather adds (`RECORD.md`, "FACTS entries").
  - Changed in a claim by the record-landing (`b5a4765829`): F-24, F-312 and F-332 (a helper raises by the exception's simple name, which the class path's `LibraryNames` maps); F-336 (the exception of the library in use, and row 1103; also `11ac1ddf75`); F-34 (the gate's `OneLibraryComponents.test` checks the count); F-301 (`make` reaches either library's value object). These are the review's findings 3 and 4 (`reviews/batch-34b-review.md`, Part 1).
  - Gate figures: F-53, F-240 (`295c215c2c`).
  - No POSITIONS entry is in the launch's list. P-33's history block and P-164's held sentence (`b5a4765829`) are not judged here.
- The orientation, `.claude/skills/fortress-repo/references/revival-changes.md`, read whole as it stands (34,093 bytes). Also read: the core (`SKILL.md`); `compiler.md:21`, `:32`, `:45` and `:234`; `interpreter.md:150-153`; `build-and-caches.md:73`; `tests-writing.md:52`; `tests-running.md:14` and `:116`; `library.md:54`. And `grep` over the orientation for the one library, the selection, jars, raises, `catch`, varargs, payload classes and every "Until the switch-over" sentence (`:7`, `:48`, `:64`, `:85`, `:95`, `:110`, `:114`, `:116`, `:134`).
- The landing: `climb-batch-34b/RECORD.md`, "Rows opened", "Rows rewritten and noted", "FACTS entries", "Left for the coordinator and the skill writer" and "Revival changes, for the skill writer". `reviews/batch-34b-review.md`, Part 1 and Part 3. Ledger rows 441, 523, 994, 1098, 1101, 1102 and 1103.
- The code, for the raise by simple name: `nativeHelpers/simpleIntArith.java:43`, `:64`; `compiler/runtimeValues/Utility.java:28-70`; `src-one/com/sun/fortress/compiler/runtimeValues/LibraryNames.java:41-43`. No helper under `nativeHelpers/` names `CompilerBuiltin$` now (`grep`).
- The standard: `explorations/reviews/revival-record-synthesis.md`, "A small change to the existing process" and "Recovered admission rule, workflow runs and transcript search pointers".
- The evidence searched:
  - The regression quiz (`regression/questions.md` and `key.md`). Cases 1, 20 and 28 were read for compiled runs, the libraries and `SEQV`. A `grep` searched for `FORTRESS_LIBRARY`, `one_library`, `onelibrary`, "does not run yet", `helper`, `nativeHelpers` and rows 994, 1062, 1091, 1098 and 1103. No case asks for a run under the selection, a helper's raise or a caught exception's identity.
  - The pretraining quiz (`explorations/reviews/fortress-pretraining-quiz.md`), with `grep` for `exception`, `catch`, `export`, `api`, `singleton`, `native` and `varargs`. `:49` (an object without parameters is a singleton) and `:206-211` (apis and exports) bear on rows 1103 and 1098; nothing else bears on the landing.
  - The tests, for a caught exception compared with its object (`SEQV IntegerOverflow`, `= IntegerOverflow`, and the same for `DivisionByZero`, in `tests`, `compiler_tests`, `one_library_tests`, `library_tests` and `Library`). Only the skeptic's probe, `one_library_tests/OneLibraryHelperRaiseSingleton.fss`, compares so.

**The test.** An entry is admitted only if a worker would act differently without it, and if the mistake that it prevents has evidence: a failure on record, the regression quiz or the pretraining quiz. An entry is not admitted if the orientation already states it, if an area part owns it, or if no worker would act differently. Its row then says where it belongs.

**The result. No entry is admitted.** The landing adds no rule of the language and decides no rule. It makes no sentence of the orientation false.

- Rung C's revival change is the compiled run time's: a second set of run-time classes, the one library's carriers over payload classes, and a helper that names an exception by its simple name (`RECORD.md`, "Revival changes, for the skill writer").
- It makes a program compiled under `FORTRESS_LIBRARY=one` run. A default compile still reads the compiler's prelude (F-381). So every "Until the switch-over" sentence, which states a limit of the compiler's library (`:7`), stays true.
- The sentences that the landing makes false are in the core and in five area parts. The review's Part 3 lists them, and "Outside the orientation" below gives them with one more.
- The walls that the one library's first runs show are compiled-path rows: 994, 1091, 1098, 1099, 1100, 1101, 1102 and 1103. `compiler.md` owns them.
- The other entries are planning records of a scratch tree, gate figures, a performance note, or wording.

## What the landing makes false in the orientation

Nothing. Checked:

- `:3`, the team's three forms: "the compiled path with the compiler's library". It stays true of what the team left. The selection adds a fourth pairing, which the core states (`SKILL.md:80`).
- `:7`, the convention "A sentence that opens "Until the switch-over" states a limit of the compiler's library. The limit ends when the compiled path moves onto the interpreter's library". The switch-over has not happened, and unset, every command reads the prelude as before (F-381).
- `:48`, "write the bound only in code that runs under walk or is checked against the interpreter's library". This already covers a compile under the selection.
- `:64`, `:95`, `:110`, `:114` and `:116` each open "Until the switch-over" and state the prelude's declarations. The landing changes no declaration of the prelude: the record's "Reserved, a prelude test that changed its answer: none", and the skeptic's `PreludeRaises`, `PreludeUncaught`, `PreludeUncaughtMessage` and `PreludeSingletonRaise` give the same lines on the base and on the head.
- `:114`, "At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523)". This is the prelude's `intExp`, a raw `RuntimeException`, not a raise string. Rows 441 and 523 are unchanged.
- `:57-64`, `SEQV`: "a reference object, a string among them, is equivalent only to itself". F-396 calls `FlatString` a reference object (`Library/FlatString.fss:32`), which agrees.
- `:89`, both paths refuse an object below a number type. F-388 keeps the refusal at the compile.
- `:85` (row 307) and `:134` (P-12) are untouched by the landing.

## Admitted

None.

## Not admitted

| Entry | The default a worker holds, and what the landing corrects | Why it is not admitted, and where it belongs |
|---|---|---|
| F-396 | Default: a program compiled with `FORTRESS_LIBRARY=one` does not run, so a test in `one_library_tests/` gets a `compile` command only. The skill itself gives this default (`SKILL.md:80`, `build-and-caches.md:73`, `tests-writing.md:52`).<br>Correction: such a program runs against the one library's fourteen jars, which the onelibrary track compiles first, as `OneLibraryRunHello.test` does. A run meets rows 994, 1091, 1098, 1099, 1101, 1102 and 1103. | An area part owns it, and the orientation states nothing that it changes.<br>- The orientation's subject is how the language departs, and the prelude's limits ("Until the switch-over"). No sentence of it says that the one library cannot run compiled code.<br>- The false sentences are the core's `:80` and the area parts' (below, items 1 to 4).<br>- Its list of departures from walk goes to `compiler.md`, "What the compiled path cannot compile yet" (review Part 3, item 9).<br>- No quiz case and no worker failure on record turns on it. The one failing run is the rung's own base run, 'NoClassDefFoundError: fortress/FortressLibrary$String', which the core's old sentence predicted. |
| F-381 | The same default as F-396: a program compiled under the selection does not run (row 1062, now fixed). | Its home is the selector's own parts: `build-and-caches.md:73`, `tests-writing.md:52`, `tests-running.md:116` and the core's `:80`. The orientation never named the selector. |
| F-390 | Default: a varargs program compiled under the selection does not run, because no such program runs there. Correction: it now fails for its own reason, row 1091: the array's class holds `ImmutableArray1`'s `copy` twice and fails verification. | The compiled path's: `compiler.md:45` keeps its clause, and its reason changes (review Part 3, item 4). The orientation's one varargs sentence, `:103` (walk takes the join of varargs elements, rows 395 and 511), is untouched. |
| F-388 | The run time's naming only: under the selection, the second set's `LibraryNames` names the one library's seven, which the code generator writes over the same payload classes. | The orientation already states what a worker does with it, at `:89`: both paths refuse an object below a number type. The run-time classes are `compiler.md`'s (`:21`). The core's `:94`, "under the compiler's prelude, an `RR64`'s class extends `FRR64`", is now short: it holds under the one library too (review Part 3, item 11). |
| F-353 | Default for a worker who edits the compiled run time: one class, one edit. Correction: `main` builds a second set of the classes that name a library's types, `ProjectFortress/build-one` from `ProjectFortress/src-one`, and the selection puts it first. So a change to a class that both sets hold, such as `FValue`, is made in both. | `compiler.md:21` and `:32` own it (review Part 3, item 8). The rest is probe Y's scratch tree, a planning record. The worker's own `Compiled17a` failure (review, misses 1371) came from an edit of the run time, not from reading the orientation. |
| F-352 | None. It is the scratch tree's switch rehearsal, with its head clause brought up to date: a program compiled under the selection can run, and rows 874 and 993 are fixed. | A planning record, for `PLAN.md`'s phase 4 and phase 5 lines (`PLAN.md:72`; `RECORD.md`, "Left for the coordinator"). No worker acts on it. |
| F-34 | Default, from `library.md:54`: "For another component of the one library: no step, until the switch-over." So an edit of one of the fourteen components needs no compiled check. Correction: `OneLibraryComponents.test` compiles the fourteen to jars first in the onelibrary track of every gate. So an edit that the code generator refuses turns the gate red, and `ant testOneLibrary` is a step for each of the fourteen. | `library.md:54` owns it (review Part 3, item 10). The rest is the planner's measure, which the gate's test now replaces (review, process finding 4), and `PLAN.md:70`. No quiz case, and no worker failure yet. |
| F-24 | Default, from `interpreter.md:152` and the team's helpers: a helper raises `Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero")`, by the prelude's whole class name. Correction: it names the exception by its simple name, `"DivisionByZero"`, and each set's `LibraryNames` maps the name to its library's class (`simpleIntArith.java:43`; `Utility.java:34-36`). A whole name still passes through unmapped. So a new helper written as `:152` says names, under the selection, a class that does not exist, and the raise fails with `FortressImplementationError` (`Utility.java:28-33`; by reading the code, not run, since the selection's caches folder holds the one library's jars only, `build-and-caches.md:73`). | Walk's natives are an area part's: `interpreter.md`, "Natives", `:152`, which the landing makes false (review Part 3, item 5). Walk's answers are unchanged. No worker failure on record and no quiz case. |
| F-312 | The same correction as F-24, for the ten `REM` and `MOD` bindings. `DivisionByZero` at a zero divisor is unchanged on both paths. | As F-24: `interpreter.md:152`. The orientation states no rule of `REM` or `MOD`. |
| F-332 | The same correction as F-24, for `fileOps`: a compiled helper's raise builds the exception of the library in use, where it built the prelude's. Walk's reader is unchanged. | As F-24. Walk's I/O carriers are `interpreter.md`'s. |
| F-336 | Two points.<br>(a) The raise by simple name, as F-24. An exception with no constructor over the library's `String`, as the one library's `IOFailure` and `FileNotFoundException`, is made without its message.<br>(b) Row 1103. The default is the pretraining quiz's `:49`, that an object without parameters is a singleton, and Scala's `case object`: a caught `IntegerOverflow` is the object `IntegerOverflow`. Correction: on the compiled path, against either library and also on the base, a helper's raise makes a second instance, so `e SEQV IntegerOverflow` answers false. Walk answers true. | (a) goes with F-24, to `interpreter.md:152`.<br>(b) A compiled run-time departure, for `compiler.md`. It is absent from the review's Part 3, item 9 (below, item 9). It fails the evidence test: no worker's test compares a caught exception with its object (only the skeptic's probe does, `OneLibraryHelperRaiseSingleton.fss`), and no quiz case asks it. If a later failure shows the mistake, its home in the orientation would be the `SEQV` rule's list, at `:59-62`, as a departure of the compiled path with row 1103. |
| F-301 | None. It is a performance note: the box's `make` now reaches the value object of either library. | `perf-probes/helper-calls/REPORT.md`, and `compiler.md` for the run time. No worker acts differently. |
| F-53 | None. It gives the last landed gate's figures: distance 0 and count 0, at climb batch 34b's gate. | The `coordinator` skill's `references/batch.md`, "The checker count and the distance". |
| F-240 | None. It gives the two stages' seconds: about 105 s and 176 s. | `compiler.md:234`, "about 80 to 180 seconds", still holds. Otherwise it is the coordinator's. |

Two further subjects come from the landing's rows, not from its entries. Neither is admitted:

- Row 1098, CONTESTED: a component that implements an api's declaration only by a wider declaration. A compiled call of the api's declaration dies, 'NoSuchMethodError', on both libraries, and walk runs the call.
  - It bears on the pretraining quiz's `:206-211`, and on a worker who designs a library change.
  - Which export rule holds is undecided. It is an item for the curator, with no default (`PLAN.md:928`; review Part 1, finding 1). The orientation states decided rules and cited departures only.
  - Once the item is decided, its rule may earn a sentence beside `:136` ("A component's function that leaves out its return type takes the api's declaration"). Until then, it belongs in `compiler.md` with its row.
- Row 994: `=` and `<` of strings and `=` of booleans, compiled against the one library. This is a code-generator defect in a dispatch method's package. The `SEQV` rule at `:57-64` stays the rule. The row belongs in `compiler.md` (review Part 3, item 9).

## Outside the orientation, for the skill writer and the quiz author

None of these is this workflow's to change. The review's Part 3 read items 1 to 8 and 10 to 12 on `main` at `99951e0d0e`. The line numbers below are re-read on `8965c32e03`, where `.claude/` differs from that read only in `sources.md` and `tests-writing.md`.

1. `SKILL.md:80`: "a program compiled so does not run yet". False (F-396).
2. `build-and-caches.md:73`: "No compile writes the one library's jars yet, so a program compiled with the variable dies at its first library class ... (ledger row 1062)". False.
3. `tests-writing.md:52`: "Give a plain test there a `compile` command only: a program compiled so does not run yet (ledger row 1062)". False: a plain run test runs there, as `OneLibraryRunHello.test` does.
4. `compiler.md:45`: "though such a program does not run yet (`SKILL.md`, ...)". The clause holds, but its reason is now row 1091 (F-390).
5. `interpreter.md:152`: the raise string `"fortress.CompilerBuiltin$DivisionByZero"` and "The string names the compiler's prelude's class for the exception". False: a helper names the simple name, which each set's `LibraryNames` maps (F-24, F-336).
6. `tests-running.md:14` (about 2,560 tests in 5 to 7 minutes) and `:116` (how a run test of `one_library_tests/` finds the fourteen jars): review Part 3, items 6 and 7.
7. `compiler.md:21` and `:32`: the second set of run-time classes, put first under the selection, and the edit of a class that both sets hold made in both (F-353, F-396).
8. `library.md:54`: an edit of one of the fourteen components is checked by the onelibrary track's `OneLibraryComponents.test` in every gate (F-34).
9. `compiler.md`, "What the compiled path cannot compile yet": the review's item 9 lists rows 1098, 994, 1091, 1099, 1101, 1102 and 1100. Add row 1103, which the item leaves out: a helper's raise of an exception object without parameters is a second instance of the object on the compiled path, against either library, so a caught `IntegerOverflow` is not `SEQV` `IntegerOverflow`. Walk gives the object (F-336).
10. `SKILL.md:94`: "under the compiler's prelude, an `RR64`'s class extends `FRR64`". This is short: it holds under the one library too (F-388, F-396).

The regression quiz:

- No case's expected answer is made wrong. Cases 1, 20 and 28 were checked. Each case answers for a default compile, which still reads the prelude.
- Case 1's "Expected", third bullet, says that "the compiled checker reaches the interpreter's library only through the count stage, and walk's programs only after the switch-over". This is short since F-381, and more so with F-396: under `FORTRESS_LIBRARY=one`, a compile checks a program against the interpreter's library, and the program can run. The key's commands and its "Scope" stay right for the default. The quiz author may add that a reader who names the selection as a further option is not wrong.
- No case is owed, since nothing is admitted.
