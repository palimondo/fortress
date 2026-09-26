# Climb batch 5: the judge's ruling on the merged-diff review

Written 2026-09-26 on `main` at `da53904cd`. The merged-diff review refused approval with three blocking findings (`explorations/compile-ladder/climb-batch-5/RECORD.md`, section "The merged-diff review", "For the judge"). This ruling reads the merged tree and the review; it builds nothing and runs nothing, and it does not read the gate's output. The decision is **repair**: the three findings are right, all three are repaired in one round in `/home/user/fortress`, and the gate runs again after it because three `.test` files are added to the compiler track.

## What was read

- The batch's commits `e893a3e00` (rung Z), `3924e7ec3` (rung S), `0b1881317` (rung D's record) and `601f52736`, `da53904cd` (the gather's follow-up and the review's corrections).
- The four passages of `Specification/` that state the compiled checker's coverage: `Specification/appendices/changes.tex:84-91`, `Specification/basic/types-vals-vars.tex:244-250`, `Specification/basic/traits.tex:314-324`, `Specification/fortress/preamble.tex:54-64`, each with ten lines either side.
- The checker's exclusion case `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:455-468` and the code generator's static-argument loop `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5770-5808`.
- The harness: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:340-405` (in-process commands: the exception path and the `shouldFail` path), `:520-593` (the `run` test), `:686-704` (`CommandTest`), `:932` (`shouldFail` from the `.test` file's name).
- Ledger rows 402, 405-408, 414, 416 and 418 (`explorations/fortress-gap-ledger.md:413`, `:416-419`, `:425`, `:427`, `:429`).
- The rungs' reports: Z's `REPORT.md` sections 9 and 14, `JUDGE.md` "The homes after the repair round"; S's `REPORT.md`, `SKEPTIC.md`, `decision-record.md` section 3.1; the batch record `explorations/coordinator/CLIMB-BATCH-5.md:195-205`.
- The precedents for the tests: `ProjectFortress/compiler_tests/XXXNatBoundDisp.test`, `XXXObjExprRungS.test`, `XXXNatRtTask.fss` with `XXXNatRtTask.test` and `NatRtTaskLink.test`, `XXXNatExtendsTwice.fss` with its two `.test` files, `XXXNatExcludeChecker.fss`.

## Finding 1: the specification's statement of the checker's coverage

**The review is right.** `Specification/appendices/changes.tex:86-90` reads: "The compiled type checker refuses them for type arguments; its comparison of `nat` and `int` arguments is row 402 of the revival's gap ledger. It does not compare `bool` arguments either". The "either" says that no `nat` or `int` argument is compared. Since `e893a3e00` the checker compares two numerals: `TypeAnalyzer.scala:463`, `case (SIntArg(_, _, i1: IntBase), SIntArg(_, _, i2: IntBase)) => pEqv(i1, i2)(!negate)`. `compiler_tests/XXXNatExcludeChecker` pins the refusal "Types Vec[\3\] and Vec[\4\] exclude each other.  V must not extend them.", and row 402's note records the fix (`explorations/fortress-gap-ledger.md:413`).

The callout at `Specification/basic/types-vals-vars.tex:247-248` and the front matter at `Specification/fortress/preamble.tex:59` both say "enforces for type arguments". Neither is false, but each leaves out the numeral case. `Specification/basic/traits.tex:316-318`, "the compiled type checker refuses such a declaration", is an overstatement.

**One addition the review did not make.** The review cites row 414 only against `traits.tex`. Row 414 also qualifies the appendix's "refuses them for type arguments". Its type twin `object O[\T\] extends { Vt[\T\], Vt[\ZZ32\] }` passes the checker and dies at load with `ClassFormatError` (`explorations/fortress-gap-ledger.md:425`; capture `explorations/compile-ladder/rung-size-runtime/probes/differential.txt:730-756`). So the appendix's Effect must name row 414 beside row 406. The two summaries must point to the appendix for the exceptions rather than list them.

**Who was wrong, and how.** The gather's first correction to S was made with Z already landed. It says so in row 402's note: "With rung Z's size case, which landed first in the same batch (`e893a3e00`), `checkP` refuses two different literal sizes". Its sentence in the appendix nonetheless kept the pre-Z reading (`RECORD.md:62`). The review's earlier fix to the handover paragraph made the handover accurate about the text, but the text itself stayed wrong.

**The specification.** These four passages are the revival's own callouts and appendix entry, not the normative rule. The rule at `Specification/basic/types-vals-vars.tex:218-237` and `Specification/basic/traits.tex:299-313` is unchanged by this repair. No edit falls under `Specification-1.0-frozen/` or the three number chapters.

**The repair: wording only, each passage keeping its line count.** LaTeX ignores source line breaks, so every citation of these four files elsewhere in the records keeps its line (`changes.tex:18-416`, `:378-386` and the other anchors the gather re-anchored, `RECORD.md:73`). The replacement texts are in the numbered steps below. One fact behind the wording rests on code reading, not measurement: that an `int` argument is compared like a `nat` one. The `IntBase` case at `TypeAnalyzer.scala:463` matches an `SIntArg` whatever the parameter's kind. The repair measures it before writing "`nat` or `int`" (step 3) and stops if the measurement disagrees.

## Finding 2: row 406 has no gated home

**The review is right.** Row 406 is S's skeptic's measurement: `object F extends { Flag[\true\], Flag[\false\] }` passes the checker and dies in code generation (`explorations/compile-ladder/rung-spec-route-a/probes/skeptic/SkBoolArgs.compile.txt:1`, "Only emitting RTTI for types right now"). The specification as S revises it settles the question. Instantiation exclusion counts "the same value for a `nat`, `int`, `bool`, dimension, or unit parameter" (`Specification/basic/types-vals-vars.tex:218-237`), and the declaration rule refuses the program (`Specification/basic/traits.tex:299-313`). A deferred defect that the specification settles has home 2, an `XXX` test (the three-homes rule of the batch brief). The row says the test is owed "in a later rung" (`explorations/fortress-gap-ledger.md:417`).

S could not write the test, because its scope was "No source and no test" (`explorations/coordinator/CLIMB-BATCH-5.md` section 3, S). The gather opened the row "as the skeptic wrote it" (`RECORD.md:68`). No judge ruled on the deferral: the ruling in Z's `JUDGE.md`, "The homes after the repair round", covers only Z's own findings.

**Why home 2 and not a repair.** This is a decision. The alternative is home 1: a `bool` case in `cP` beside `TypeAnalyzer.scala:463`, one line. I rejected it for three reasons:
- It would change checker behaviour in `main` after both skeptics and the review, with no skeptic to probe it.
- It would also make an overloading on `Flag[\true\]` beside `Flag[\false\]` valid to the checker. The code generator cannot compile that overloading, because `CodeGen.java:5784` has an empty `BoolArg` branch that falls through to the `throw` at `:5806`.
- The row itself says that the rung adding the case "also decides what code generation does with a boolean static argument in an `extends` clause". That is row 307's `bool` half and a rung's work.

**The shape.** Today the checker passes the program and code generation throws. The expected-failure form is therefore one `XXX` compile test pinned to that exception, the shape of `compiler_tests/XXXNatBoundDisp.test` and `XXXObjExprRungS.test`. It stays red-proof today and goes red on either repair:
- **The checker starts refusing the declaration.** The compile then fails with a static error and no exception. `testFailed` then finds the pinned exception text missing and prints "Saw failure, but did not satisfy" (`FileTests.java:384-398`).
- **Code generation learns boolean arguments.** The compile then succeeds, and the harness prints "Missing expected failure" (`FileTests.java:399-402`).

The first of those two paths has not been shown in this batch, so the repair shows it on a variant the checker already refuses (step 7).

## Finding 3: row 408 has no gated home

**The review is right, and Z's reading was wrong.** Z's `REPORT.md` section 9 says "its XXX test not written here, since the brief lists it as opened only". The batch record's "opened, not repaired here" (`explorations/coordinator/CLIMB-BATCH-5.md:202`) says what the rung does with the defect. It does not say which home the defect has, and the three-homes rule gives a deferred defect that the specification settles an `XXX` test.

Z re-measured the defect: `explorations/compile-ladder/rung-size-runtime/probes/differential.txt:1095-1115` shows compile `exit=0` and the compiled run `NoClassDefFoundError: .../FZZ32Vector$RTTIc` at 1 and 4 threads. The row cites the passage that settles it (`Specification/basic/objects.tex:198-206`: a constructor's type is an arrow from its value parameters' type to the object type). No skeptic or judge ruled on the reading.

**The shape.** The program compiles, links and fails at run time, so the form is the two-file one of `XXXNatRtTask`: an `XXX` `run` test with `run_out_contains=REACHED`, and a plain `Link` test. Z showed that shape red on a local fix (`explorations/compile-ladder/rung-size-runtime/probes/xxx-task-red-demo.txt:15`). The repair shows it again on a variant that runs (step 9), because the fix site is outside this round.

## The stops

- **"A checker rule that accepts a program the specification, as rung S revises it, refuses" is not met by Z's case.** The `IntBase` case claims exclusion only between two different numerals, and each such claim is one that S's rule makes. It lets the checker accept overloadings that S's rule makes valid (`compiler_tests/NatExcludeOverload`) and refuse declarations that S's rule refuses (`XXXNatExcludeChecker`). Rows 406 and 414 are acceptances that predate the batch: the checker passed both forms before `e893a3e00` too, since it compared nothing but types. They are recorded gaps, not a rule this batch added.
- **The repair touches no stop file.** It does not edit `Specification-1.0-frozen/`, the three number chapters, `compiler/StaticChecker.java` or anything in rung D's list. The two stops that already hold the push (D's changed output, S's calculi of Appendix A) are unchanged and still hold it.
- **Rows 416 and 418's `XXX` walk tests stay as Z's judge carried them.** Rung D's held edits and its interpreter comparison are pending Pavol's reading, and adding walk tests to `ProjectFortress/tests/` now would move `testSystem` under them.

## Which claims were right

- **The review.** All three findings are right, with the addition about row 414 in finding 1. Its reading that no gated file moves for finding 1 is right. Its count of one added expected failure per item is right, and the row-408 item also adds one plain `Link` test.
- **Rung Z.** Its reading "opened only" (`REPORT.md` section 9) is wrong, as ruled in finding 3. Its row 408 text and its re-measurement are right.
- **Rung S's skeptic.** Home 2 for the boolean case is right (`SKEPTIC.md` recommendation 1). "In a later rung" was the gap: the gather held `compiler_tests/`, since Z's net change landed through it.
- **The gather.** Its correction 1 (`RECORD.md:62`) carried the pre-Z reading into the appendix ("either"), as ruled in finding 1.

## Repair steps

These are the numbered steps of the structured result, repeated here so that the file stands alone.

1. **Preconditions and setup.** Work in `/home/user/fortress`, on `main`, whose `HEAD` is this ruling's commit above `da53904cd`. Running `git status --porcelain` must print only the two untracked `explorations/reviews/*/variants/__pycache__/` directories.
   - Before any `fortress` command or specification build, run `pgrep -fa 'org.apache.tools.ant|FileTests|gate-batch-5'`. If it prints anything, poll every 30 s until it prints nothing. Do not read or write `tmp/gate-batch-5/`.
   - Set up the shell as the batch prefix gives it: `source explorations/experiment/env.sh`, `export TMPDIR=/home/user/fortress/tmp`, `export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress/tmp"`, `export FORTRESS_THREADS=1`.
   - Confirm that `ProjectFortress/build` exists and that `default_repository/caches/` holds the compiled `CompilerLibrary`. If it does not, run the library-order cache rebuild in the batch prefix (AnyType, CompilerBuiltin, CompilerLibrary, CompilerAlgebra, CompilerSystem). Do not run `ant compileAll`: no source changes.
   - Every capture starts with the machine line of Z's `explorations/compile-ladder/rung-size-runtime/probes/common.sh`, `machine()`: nproc, CPU model name, MHz, load average at start, JDK, `FORTRESS_THREADS`.
   - Every capture ends with `rc=`. Captures go in `explorations/compile-ladder/climb-batch-5/review-repair/`, named `.txt`.
2. **Do not run `ant testFast` or `ant testSystem`.** The workflow gates the batch again after this round.
3. **Measure the `int` case** before writing about it.
   - Write `explorations/compile-ladder/climb-batch-5/review-repair/ReviewIntExclude.fss` containing exactly these six lines: `component ReviewIntExclude` / `export Executable` / `trait Ti[\int i\] end` / `object W extends { Ti[\3\], Ti[\4\] } end` / `run():() = println("ran")` / `end`.
   - From `ProjectFortress/`, run `../bin/fortress compile ../explorations/compile-ladder/climb-batch-5/review-repair/ReviewIntExclude.fss`. Capture it to `ReviewIntExclude.compile.txt`.
   - The expected result is a refusal containing "exclude each other" and "W must not extend them", because the `IntBase` case at `TypeAnalyzer.scala:463` matches an `int` argument. If the compile is not refused this way, stop before step 4 and return the capture: the wording below rests on it.
   - Delete the probe's entries from `default_repository/caches` (the `clean` of `common.sh`).
4. **Edit the four passages and keep each file's line count.**
   - **`Specification/appendices/changes.tex`.** Replace lines 86-90 (from "longer valid. The compiled type checker refuses them for type arguments;" through "instantiations that differ only in a boolean argument (row~406).") with exactly these five lines:
     - `longer valid. The compiled type checker refuses them where the arguments`
     - `that differ are types, or numerals given as \KWD{nat} or \KWD{int}`
     - `arguments (row~402 of the revival's gap ledger). It does not yet refuse`
     - `them where those arguments are \KWD{bool} arguments, though it accepts boolean parameters written out (row~406),`
     - `or where one of them is a static parameter of the trait or object that extends both (row~414).`
   - **`Specification/basic/types-vals-vars.tex`.** Replace line 248, `for type arguments (\secref{revival-rule} states its coverage),`, with `for type arguments and numerals, not yet in every case (\secref{revival-rule} states its coverage),`.
   - **`Specification/fortress/preamble.tex`.** Replace line 59, `the compiled type checker enforces for type arguments and this draft had`, with `the compiled type checker enforces for type arguments and numerals, with the exceptions \appref{spec-changes} names, and this draft had`.
   - **`Specification/basic/traits.tex`.** Replace lines 317-318 (`the compiled type checker refuses such a declaration,` / `reporting that the two instantiations exclude each other.`) with `the compiled type checker refuses such a declaration when the arguments that differ are types or numerals` / `(\secref{revival-rule} states the exceptions), reporting that the two instantiations exclude each other.`.
   - Check that `wc -l` still gives 416, 657, 168 and 850 for the four files, and that `git diff --numstat` shows equal added and removed counts for each (5, 1, 1, 2).
5. **Rebuild the specification** as the gather did (`explorations/compile-ladder/rung-spec-route-a/probes/build/gather-genSource.txt:1-2`).
   - In `Specification/fortress/`, with `FORTRESS_HOME=/home/user/fortress`, run `./ant genSource` and then `./ant tex`. Capture them to `review-repair/review-genSource.txt` and `review-repair/review-tex.txt`, each with the machine line, `rc` and elapsed seconds. Both must end in `BUILD SUCCESSFUL`, and the tex log must have no line matching `Reference .* undefined` or `There were undefined references`.
   - Copy `Specification/fortress/fortress.pdf` to `Specification/fortress.pdf`. `pdfinfo` must give 610 pages.
   - Run `git show da53904cd:Specification/fortress.pdf > tmp/review-before.pdf` and pass both PDFs through `explorations/compile-ladder/rung-spec-route-a/probes/build/norm.sh`. Save `diff before after` to `review-repair/pdftotext-diff.txt`, whose first line says what it compares. Its hunks must be the four passages and nothing else; if any other hunk appears, stop and return it.
   - Remove exactly the build's ignored products: the `!!` entries of `git status --porcelain --ignored Specification/`, of which there were none before the build. Then check that `git status --porcelain Specification/` lists only the four `.tex` files and `Specification/fortress.pdf`.
6. **Row 406's expected failure.**
   - Write `ProjectFortress/compiler_tests/XXXBoolExtendsTwice.fss`, 12 lines: `(* See explorations/compile-ladder/climb-batch-5/RECORD.md. *)` / `component XXXBoolExtendsTwice` / `export Executable` / `trait Flag[\bool b\]` / `end` / `object F extends { Flag[\true\], Flag[\false\] }` / `end` / `f(x: Flag[\true\]): String = "f took a Flag[true]"` / `run():() = do` / `  println(f(F))` / `end` / `end`.
   - Write `ProjectFortress/compiler_tests/XXXBoolExtendsTwice.test`, 3 lines: `tests=XXXBoolExtendsTwice` / `compile` / `compile_exception_contains=Only emitting RTTI for types right now`.
   - Clean its cache entries. From `ProjectFortress/`, run `../bin/fortress junit compiler_tests/XXXBoolExtendsTwice.test` and capture it to `review-repair/junit-bool-xxx.txt`. It must show ` OK Saw expected exception` (`FileTests.java:360`) and `OK (1 test)`. If it does not, stop and return the capture.
7. **Show row 406's test go red on the path a checker fix takes.**
   - In `explorations/compile-ladder/climb-batch-5/review-repair/`, write `XXXBoolExtendsTwiceDemo.fss`. It is step 6's file with the component renamed, `trait Flag[\T\]`, `object F extends { Flag[\ZZ32\], Flag[\String\] }` and `f(x: Flag[\ZZ32\])`; today's checker refuses that declaration as it would refuse the boolean one once repaired.
   - Beside it, write `XXXBoolExtendsTwiceDemo.test` with `tests=XXXBoolExtendsTwiceDemo` and the same two further lines as step 6's `.test`.
   - From `ProjectFortress/`, run `../bin/fortress junit ../explorations/compile-ladder/climb-batch-5/review-repair/XXXBoolExtendsTwiceDemo.test` and capture it to `review-repair/junit-bool-xxx-red-demo.txt`. It must show ` Saw failure, but did not satisfy compile_exception_contains` (`FileTests.java:396`) and a JUnit failure. If the harness cannot run a `.test` outside `compiler_tests/`, copy the two files there, run them from there and delete them before committing; never commit them under `compiler_tests/`.
   - Clean the demo's cache entries.
8. **Row 408's expected failure.**
   - Write `ProjectFortress/compiler_tests/XXXVecCtorLoad.fss`, 12 lines: `(* See explorations/compile-ladder/climb-batch-5/RECORD.md. *)` / `component XXXVecCtorLoad` / `export Executable` / `object Box[\T\](data: ZZ32Vector, x: T) end` / `run(): () = do` / `    println("REACHED")` / `    d: ZZ32Vector = makeZZ32Vector(4)` / `    b: Box[\ZZ32\] = Box[\ZZ32\](d, 7)` / `    assert(b.x, 7, "a constructor applies to every value of its parameter types; ledger row 408, Specification/basic/objects.tex:198-206")` / `    println("PASS")` / `  end` / `end`.
   - Write `ProjectFortress/compiler_tests/XXXVecCtorLoad.test`: `tests=XXXVecCtorLoad` / `run` / `run_out_contains=REACHED`. Write `ProjectFortress/compiler_tests/VecCtorLoadLink.test`: `tests=XXXVecCtorLoad` / `link`.
   - Clean the cache entries. From `ProjectFortress/`, run `VecCtorLoadLink.test` and then `XXXVecCtorLoad.test` through `../bin/fortress junit compiler_tests/<name>.test`, in that order and sharing the cache, as Z's `explorations/compile-ladder/rung-size-runtime/probes/junit-task-pair.sh` does. Capture both to `review-repair/junit-vec-xxx.txt`.
   - The link must give `OK (1 test)`. The run must print `REACHED`, then `NoClassDefFoundError` naming `FZZ32Vector$RTTIc`, then `Saw expected failure (Exit code != 0)` (`FileTests.java:590`) and `OK (1 test)`. If `REACHED` is not printed, or the failure is anything else, stop and return the capture.
9. **Show row 408's test go red on a program that runs.**
   - In `review-repair/`, write `XXXVecCtorLoadDemo.fss`. It is step 8's file with the component renamed, `object Box[\T\](data: ZZ32, x: T) end`, the `d` line removed and `Box[\ZZ32\](4, 7)`.
   - Write `XXXVecCtorLoadDemo.test` (`tests=XXXVecCtorLoadDemo` / `run` / `run_out_contains=REACHED`) and `VecCtorLoadDemoLink.test` (`tests=XXXVecCtorLoadDemo` / `link`).
   - Run the link and then the run as in step 8, with the same fallback as step 7, and capture them to `review-repair/junit-vec-xxx-red-demo.txt`. The run must show `Did not see expected failure` (`FileTests.java:587`) and a JUnit failure.
   - Clean the demo's cache entries.
10. **The ledger: edit three rows in place.** Rows 406 and 408 are this batch's own and unpushed. Move and add no row, and check that `wc -l explorations/fortress-gap-ledger.md` is still 1000.
    - **Row 406 (`:417`).** Replace ``Owed: a `bool` case beside it, and a gated expected-failure compile test (home 2), in a later rung;`` with ``Owed: a `bool` case beside it, in a later rung. Its home 2 is `ProjectFortress/compiler_tests/XXXBoolExtendsTwice.fss` with `XXXBoolExtendsTwice.test`, which pins code generation's `CompilerError` and goes red when the checker refuses the declaration or code generation accepts it (the merged-diff review's repair, `compile-ladder/climb-batch-5/JUDGE-review.md`);``.
    - **Row 408 (`:419`).** Before its final ` |`, after "or have the loader ask the class for it.", append `` Home 2: `ProjectFortress/compiler_tests/XXXVecCtorLoad.fss` with `XXXVecCtorLoad.test` and `VecCtorLoadLink.test` (the merged-diff review's repair, `compile-ladder/climb-batch-5/JUDGE-review.md`).``.
    - **Row 414 (`:425`).** Before its final ` |`, append `` Appendix I's entry on the rule names this case beside row 406 (`Specification/appendices/changes.tex:84-91`, since the merged-diff review's repair).``.
11. **The other records.**
    - **`explorations/coordinator/FACTS.md:117`**, the entry "The specification states instantiation exclusion, and its refused examples are the library's shapes, except the number chapters and the calculi of Appendix A". Replace "the callouts, the appendix and the front matter say that the compiled checker enforces the rule for type arguments, and the appendix states its coverage of the others (rows 402, 406)." with "the callouts, the appendix and the front matter say that the compiled checker enforces the rule for type arguments and numerals, and the appendix names the cases it does not yet refuse, boolean arguments (row 406) and a static parameter against another argument (row 414), as the merged-diff review's repair corrected them (`compile-ladder/climb-batch-5/JUDGE-review.md`)."
    - **`explorations/microgpt-run-c-handover.md:27`.** Replace "last at the gather with the checker's coverage stated as measured on rung S's branch (type arguments, the comparison of sizes referred to row 402, booleans not compared, row 406); the text does not yet say that rung Z's case, landed first, compares two literal sizes (`compile-ladder/climb-batch-5/RECORD.md`, "The merged-diff review")." with "last at the merged-diff review's repair, with the checker's coverage stated as measured on the merged tree: type arguments and numerals refused, boolean arguments (row 406) and a static parameter against another argument (row 414) not yet (`compile-ladder/climb-batch-5/JUDGE-review.md`)."
    - **`explorations/compile-ladder/rung-spec-route-a/decision-record.md` section 3.1.** At the end of the "Reason:" paragraph (`:124`), append: "*Corrected at the merged-diff review of climb batch 5:* Appendix I's entry said the checker compares no `nat` or `int` argument ("either"); it now says that the checker refuses two different numerals, since rung Z's case, and names row 414 beside row 406 (`compile-ladder/climb-batch-5/JUDGE-review.md`, finding 1)."
    - **`explorations/compile-ladder/rung-spec-route-a/REPORT.md:153`.** After "are owed in a later rung.", append " The test was added at the merged-diff review's repair: `ProjectFortress/compiler_tests/XXXBoolExtendsTwice` (`compile-ladder/climb-batch-5/JUDGE-review.md`, finding 2)."
    - **`explorations/compile-ladder/rung-size-runtime/REPORT.md:199`.** After "since the brief lists it as opened only.", append " Ruled wrong at the merged-diff review: "opened, not repaired here" says what the rung does, and the three-homes rule gives the deferral home 2, added then as `ProjectFortress/compiler_tests/XXXVecCtorLoad` with `VecCtorLoadLink` (`compile-ladder/climb-batch-5/JUDGE-review.md`, finding 3)."
12. **`explorations/compile-ladder/climb-batch-5/RECORD.md`.** Append a section "The judge's ruling on the review, and its repair".
    - State what was done in steps 3-11, citing every capture by path and the lines that carry its verdict.
    - Mark the three "For the judge" items closed, with pointers.
    - Correct the gate expectation. The compiler track is Z's 29 `.test` files and this round's three, net 32: two expected failures (`XXXBoolExtendsTwice`, `XXXVecCtorLoad`) and one plain `Link` test. `testSystem` stays at 407, the checker count at 125, the ladder at 85 of 85, and `RTTIsizeJUTest` is unchanged.
    - Say that the demonstrations of steps 7 and 9 ran on variants because the two fixes are out of this round, and that the `int` measurement of step 3 is what the appendix's "`nat` or `int`" rests on.
13. **The tracked-path check.** Run the batch prefix's loop over `explorations/compile-ladder/climb-batch-5/RECORD.md`, `JUDGE-review.md` and the five record files edited in step 11. Every `explorations/compile-ladder/...` path it prints as MISSING or UNTRACKED must be fixed, except rung D's captures, which stay on `wip/rung-wrap-operators` by the gather's decision.
14. **Commit locally on `main`, by an explicit file list.**
    - Stage exactly: the four `.tex` files, `Specification/fortress.pdf`, the five new files under `ProjectFortress/compiler_tests/`, the new files under `explorations/compile-ladder/climb-batch-5/review-repair/` (the probe `.fss`, the two demo `.fss`, the three demo `.test` files and the `.txt` captures), `RECORD.md`, the ledger, `FACTS.md`, the handover, and the three rung record files.
    - Look at `git diff --cached --stat` before committing.
    - Message: a subject such as "The review's repair: the specification states the checker's numeral case, rows 406 and 408 get their expected failures".
    - Add a `historical:` line naming the four `.tex` files, `Specification/fortress.pdf` and the five `compiler_tests` files, which says that `Specification-1.0-frozen/` and the three number chapters are untouched (the rule at `explorations/protocol.md:126-127`).
    - End with exactly `Co-Authored-By: Claude <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB`, and no model identifier.
    - Do not push: the push stays held on D's and S's stops. Retry once on an `index.lock` error after a few seconds.

## For Pavol, out of the loop

- **A decision: row 406 gets home 2, not a repair.** The alternative, a one-line `bool` case in `cP`, would have changed the checker in `main` after the batch's skeptics and review. It would also have made valid to the checker an overloading that code generation cannot compile (`CodeGen.java:5784`, `:5806`).
- **What this round adds.** It edits four revival passages in `Specification/`, the callouts, the appendix entry and the front matter, and re-renders the PDF. It adds three `.test` files to the compiler track, so the gate runs again. It adds no ledger row.
- **The push stays held** on the two stops already named: rung D's changed output and rung S's calculi of Appendix A.
