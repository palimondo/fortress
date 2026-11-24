<!-- The count of the interpreter's suite on the compiled path on 2026-11-24: how many programs of `ProjectFortress/tests/` compile and pass by their own verdict, under the compiler's prelude and under the one library, at `4b0e3abd6a`, for the gate's list under P-103. A probe worker measured it on the base build `/home/user/fortress-wsuite`; the harness refused its write of this file, so the coordinator wrote it from the worker's final message, and copied its tables and reproducers beside it. -->

# The interpreter's suite on the compiled path, 2026-11-24

P-103 has the gate run the interpreter's suite on the compiled path: each program that compiles there runs, and its own asserts give the verdict, the list growing as more programs compile. This count gives the list's first form. It replaces the 85 programs of `compile-ladder/baseline-2026-09-19/pass-list.txt` as the measure of how much of the suite runs compiled.

## The set and the method

- The set: the 894 programs of `ProjectFortress/tests/*.fss` with a `run()`, less 6 that need walk's reflection (P-58, P-177): `LanguageTypeInstancesWalk`, `NumeralFoldedConstantLibraryWalk`, `NumeralStaticDesignWalk` and `ReflectTest` import `Reflect`; `ReflectiveNumberTypes` and `ReflectiveQuickCheckTest` import `ReflectiveQuickCheck`. That leaves 888. `testTest1` and `testTest2` have no `run()`.
- Every one of the 925 files of `tests/*.fss` and `not_working_library_tests/` was run, by the ladder's driver and `classify.py`, once under the prelude and once under `FORTRESS_LIBRARY=one`, on `4b0e3abd6a`'s build. No file timed out. The prelude's pass took about 31 minutes, the one library's about 21, on the machine's four CPUs.
- `programs.tsv` gives each file's phase reached and pass under each library; `analysis.txt` gives the full lists by which the counts below are made.

## The counts

- **Prelude:** 188 of the 888 pass (193 of the 919 that the baseline's whole set holds today). All 85 of the old list still pass, and 108 programs are new, 30 of them `XXX` tests. The other 700 stop at: parse 3, disambiguate 303, typecheck 320, codegen 38, link 16, run 20.
- **One library:** 82 of the 888 pass (84 of the 919). 34 of the old 85 fail here, since the 85 were measured on the prelude: 10 at row 1099 (a reduction over a range), 9 at row 1091 (varargs), 11 at `println` or `print` of a number (row 1098), `atomic0` at row 994, `emptyLoop` at typecheck, `Comparison1` at disambiguate, `Comparison2` at run. 33 programs pass here that the 85 do not hold. The other 806 stop at: parse 3, disambiguate 10, typecheck 417, codegen 50, link 308, run 18.
- **By the program's own verdict:** three of the prelude's passes and six of the one library's have a `.test` file that expects a refusal at load, so by their own verdict they fail: 185 pass under the prelude and 76 under the one library. `analysis.txt` names them ("pass of which refusal key").

## Where the rest stop

- Prelude, the most common first errors: 'ImmutableArray is undefined.' at `CovariantCollection.fsi:19` (93 programs; row 71); 'Could not check call to function assert' (27; row 314); the checker's crash 'head of empty list' on an array literal (22; row 1129).
- One library: 'Duplicate method name copy' in `ImmutableArray1` (196; row 1091; 208 with `Vector`'s and `Matrix`'s `-` and `List`'s `=`); 'Duplicate method name narrowToRange' (36; row 1099); 'Any has no getter called asString' (19; 17 of them row 1128).

## Defects found

- Row 1128: the compiled checker types a variable that a `typecase` without a binding narrows at its original type, not at its intersection with the arm's type (`Specification/basic/expressions/typecase.tex`, "Typecase Expressions"). With `v: Any`, the arm `ZZ32 => v.asString` is refused; walk runs it. Reproduced under both libraries: `repro/TypecaseNarrowAsString.fss`, and the same body at `v: ZZ32`, which compiles, `repro/TypecaseNarrowAsStringZZ.fss`.
- Row 1129: under the prelude, the compiled checker crashes, 'head of empty list', on an array literal whose element fails to check (`scala_src/typechecker/impls/Misc.scala:907` takes `dims.head` of an empty list); under the one library the same 22 programs get a located refusal.

## The classifier's verdict

The ladder's `classify.py` reads a run's output, not the program's verdict: `XXXtypeParamShadowing` exits 0 and prints no `FAIL`, but it is classed `run` because it prints the lowercase word "failed". P-103 takes the program's own verdict: its exit, its asserts and its `.test` keys.

## For the gate

By P-103 the gate's list is each program of the set that passes by its own verdict, under the library that it passes on: 185 under the prelude, 76 under the one library, from `programs.tsv` less the refusal-key programs. The coordinator's reading, not the curator's words: both lists run, since the one library's list is the one that grows to the whole suite at the switch-over.

## For FACTS

- On `4b0e3abd6a`, 185 of the interpreter's 888 suite programs that need no reflection pass compiled by their own verdict under the compiler's prelude, and 76 under the one library; measured once, by `programs.tsv`.
