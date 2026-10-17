# Climb batch 17: the repair after the merged-diff review

Written 2026-10-17 on `main` above `41567bcc1`, the judge's ruling (`explorations/compile-ladder/climb-batch-17/JUDGE-review.md`). The repair carries out the ruling's eleven steps in order, in `/home/user/fortress`, whose build is the merged tree's: `ant compileAll` built nothing and printed "Caches /home/user/fortress/default_repository/caches kept" ("BUILD SUCCESSFUL", "Total time: 2 seconds"), and no path under `ProjectFortress/src` or `Library/` differs from `21dce2148`. Nothing was built but the specification. The machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100 MHz, openjdk 25.0.4.1; each harness run's first line gives the load (0.00 to 0.07).

## 1. What was done, by the ruling's steps

| step | done |
|---|---|
| 1 | `ProjectFortress/compiler_tests/XXXOpenTypeWhereConstraintChecker.fss`, the ruling's program and first-line comment, and `XXXOpenTypeWhereConstraintChecker.test`, its three lines. |
| 2 | Three harness runs and two walk runs, below. |
| 3 | Row 771 by `ledger.py add`, section 2, the ruling's cells but one word of the claim (deviation 1). `ledger.py check` after it: "fortress-gap-ledger.md, 770 rows, 10 fail the template; rows (or places) failing each rule: spec-path 8, reproducer-path 2, spec-section 1", the ten it printed before the add (769 rows). `ledger.py add` wrote no history file. |
| 4 | `Specification/appendices/changes.tex:1489-1490` replaced by the ruling's five lines, NNN = 771, now `:1489-1493`. |
| 5 | `Specification/basic/inference.tex:283-291` replaced by the ruling's sixteen lines, now `:283-298`. Checked against `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2154-2168` (`preferredDeclaration`), `:2240-2241` (`ownGeneric`) and `:2249-2251` (`declaredDomain`); `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObjectOrGeneric.java:85-102` (a `GenericFunctionalMethod` for each functional method of an `FTypeGeneric`) and `:119-122` (`GenericFunctionalMethod.Own` for one with its own static parameters in a plain trait or object); `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericFunctionalMethod.java:151` (`Own extends FGenericFunction`). Each holds as the ruling cites it. |
| 6 | `changes.tex:1916-1917` replaced by the ruling's six lines, now `:1919-1924`; `:1925` continues "dotted method on which it still stops". |
| 7 | The ruling's three lines inserted after `changes.tex:2154`, now `:2162-2164`. Steps 7, 6 and 4 were applied in that order, from the bottom of the file up. |
| 8 | `RECORD.md`, "Text mismatches": the two replacements, and "**Corrections, after the review.**" after that paragraph. |
| 9 | `PLAN.md`, the entry "A.skeptic.1 of climb batch 17's rung A": "row 771" at the end of review.1's sentence, and judge-review.1 in the same entry; judge-review.2 and judge-review.3 as new entries at the end of "Climb batch 17, listed for his review" (section 3, decision 2). |
| 10 | `( cd Specification/fortress && ./ant genSource && ./ant tex )`: "BUILD SUCCESSFUL" / "Total time: 38 seconds", then "BUILD SUCCESSFUL" / "Total time: 37 seconds". The grep printed 42, not 0 (deviation 2). `git clean -fXq -- Specification` after; `Specification/fortress.pdf` not updated. |
| 11 | One local commit on `main`, not pushed; its paths in deviation 3. |

The test's runs, each `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> ProjectFortress/compiler_tests XXXOpenTypeWhereConstraintChecker.test` from the tree's root.

As written (`repair-a`, 18:40:26Z):

    - [\E extends Foo\]Box[\E\]->ZZ32 is not applicable to an argument of type AnyBox.
    File XXXOpenTypeWhereConstraintChecker.fss has 1 error.
     Saw expected failure
    OK (1 test)

With `where [\E extends Foo\]` in place of `where [\E\] { E extends Foo }` (`repair-b`, 18:40:45Z): the typecheck prints no error, so the expected failure is red.

    . typecheck ProjectFortress/compiler_tests/XXXOpenTypeWhereConstraintChecker 
     Saw failure, but did not satisfy typecheck_err_contains; expected
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

Restored (`repair-restored`, 18:41:16Z):

    - [\E extends Foo\]Box[\E\]->ZZ32 is not applicable to an argument of type AnyBox.
     Saw expected failure
    OK (1 test)

Walk, `bin/fortress XXXOpenTypeWhereConstraintChecker.fss` on a copy of each form in a scratch folder, with a private caches folder in `FORTRESS_CACHES` (18:42Z): the constraint form printed `7` and exited 0, and the binding form printed `7` and exited 0.

The rendered text (`pdftotext` of the built `fortress.pdf`) holds each new passage: "it does not bound that type by a trait constraint of the clause on the variable (Section 12.6), so that it refuses a call that needs the constraint's bound, a call the interpreter runs (row 771)"; "but for two kinds: a functional method of a generic trait or object it compares on the instance that a call makes, ..."; "finds no overload (row 765 of the revival's gap ledger)"; "names the call of an inherited generic functional method that finds no overload"; "the call finds no overload, on the base as now (row 765)."

## 2. Deviations

1. **Step 3's claim is 303 characters, past the template's 300.** The template allows a claim "at most 300 characters" (`explorations/fortress-gap-ledger.md:12`), and `ledger.py` checks it (`explorations/coordinator/tools/ledger.py:115`, `('claim', 300)`). The row's claim drops the word "that" of "a type `where`-clause variable that it opens at a call": 298 characters, the meaning unchanged. The notes are 661 characters and the row 1,179.
2. **Step 10's grep prints 42, not 0.** Every match is one line, ``x@warning {Reference `#1' on page \thepage \space undefined}}{}``, the body of LaTeX's `\@setref` echoed by the macro tracing that `Specification/basic-lib/objects.tex:17` turns on; `grep 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log | sort | uniq -c` printed `42 x@warning {Reference ...`. The log holds no warning of either kind: `grep -c '^LaTeX Warning: Reference'` and `grep -c 'multiply defined'` print 0, and its one line opening `! ` is a traced expansion. Climb batch 16's repair read the same 42 lines so (`explorations/compile-ladder/climb-batch-16/REPAIR-review.md`, section 2, deviation 1). `\secref{where-clauses}` resolved: the aux file holds `\newlabel{sec:where-clauses}{{12.6}{118}{Where Clauses}...}`, and the rendered sentence reads "(Section 12.6)".
3. **Step 11's paths.** Beside the ruling's list the commit carries this file, which the repair's brief asks for when an instruction meets a primary source, and which `RECORD.md`'s corrections cite.

## 3. Decisions

1. **Where "row 771" goes in PLAN.md.** The review.1 sentence of A.skeptic.1's entry ends "that clause would need the opening to read the constraint first", followed by its citations in parentheses. The row number opens that parenthesis, "(row 771; `compile-ladder/climb-batch-17/RECORD.md`, ...)", rather than standing in a second one beside it. Not taken: "(row 771) (...)", two parentheses in a row.
2. **Where the judge's three items go.** All three under "Off the path, parked", in "Climb batch 17, listed for his review": none asks an answer before work on the path goes on. judge-review.1 joins A.skeptic.1's entry, since it is the fork of the point review.1 raised there, reading the constraint at the opening, and the ruling places it "with A.skeptic.1's answer for `Array`"; the entry's opening names the three ids. judge-review.2 (the comment of `OverloadedFunction.java`) and judge-review.3 (F-252's limit, for the coordinator) are entries of their own, as climb batch 16's judge-review.1 was. Not taken: a separate entry for judge-review.1, which would put one point in two places.
3. **The walk runs.** The ruling's step 2 names one walk run of the program; row 771's notes, from the same ruling, say walk prints 7 "for both". Both forms were run, each from its own scratch folder, since a component's file must carry its name.
