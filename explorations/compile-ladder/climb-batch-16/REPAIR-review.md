# Climb batch 16: the repair after the merged-diff review

Written 2026-10-16 on `main` above `aa4bbb2b6`, the judge's ruling (`explorations/compile-ladder/climb-batch-16/JUDGE-review.md`). The repair carries out the ruling's nine steps in order, in `/home/user/fortress`, whose build is the merged tree's (`ProjectFortress/build/implementation.stamp` written 17:59 UTC, after `9879d4386`, the last commit under `ProjectFortress/src`; no source file newer than it). Nothing was built but the specification. The machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, openjdk 25.0.4.1; the harness's first lines give the load.

## 1. What was done, by the ruling's steps

| step | done |
|---|---|
| 1 | The two probes, scratch programs, run under walk with the setup lines of the skill's `build-and-caches.md` and a private caches folder in `FORTRESS_CACHES`. `bin/fortress ProbeTieSharedList.fss` (18:17:50Z): `generic`, exit 0. `bin/fortress ProbeTieOwnList.fss`: `generic`, exit 0. Both load and run the first declaration, as the judge read it. |
| 2 | `Specification/appendices/changes.tex:2614-2617` replaced by the ruling's four lines; checked against `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericFunctionOrMethod.java:44-70`, `FGenericFunction.java:43-64` and `OverloadedFunction.java:1017-1031`, which hold as the ruling cites them. |
| 3 | Not taken: neither probe was refused. |
| 4 | `changes.tex:2633-2636` replaced by the ruling's six lines, `NNN` = 742, now `:2633-2638`. Both probes load and both print `generic`, so the clause names both forms and keeps "and runs one of the two". |
| 5 | `ProjectFortress/tests/XXXGenericBesideGenericSameDomain.fss` and `.test` (row 549's key); row 742 by `ledger.py add`, section 4; F-223 by `record.py set`. Runs below. |
| 6 | `RECORD.md:30`, `:31` and `:125` to `:2633-2645`, `:126` to `:2639-2645`, `:159` to `:2633-2638`. K's `:2625-2632` holds. |
| 7 | `RECORD.md`, "**Corrections, after the review.**", after the list of W's corrections and before "### Text mismatches"; and a line for judge-review.1 in its "Items for the curator" list. |
| 8 | `( cd Specification/fortress && ./ant genSource && ./ant tex )`: "BUILD SUCCESSFUL" / "Total time: 42 seconds", then "BUILD SUCCESSFUL" / "Total time: 51 seconds"; the grep printed 42, not 0 (deviation 1). `git clean -fXq -- Specification` after; `Specification/fortress.pdf` not updated. The rendered text holds both sentences ("excluded each other only as it read each declaration at one symbolic instance ...", "... (row 742), and runs one of the two."). |
| 9 | One local commit on `main`, not pushed; its paths in deviation 2. |

The test's runs, `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/repair-review/h1 ProjectFortress/tests/XXXGenericBesideGenericSameDomain.fss ProjectFortress/tests/XXXGenericBesideGenericSameDomain.test`:

    # harness-one 2026-10-16T18:20:09Z; tree aa4bbb2b6; nproc=4; load 1.71 2.02 3.13; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    generic
     Saw expected failure: loaded and ran, not refused at load
    OK (1 test)

Changed for one run, as the skill's `tests-writing.md` asks of a change's first `XXX` test (a copy whose first declaration reads `tie[\T extends Wide\](a: Wide, b: Wide): String = "generic"`, the same `.test`), then restored:

    # harness-one 2026-10-16T18:20:30Z; tree aa4bbb2b6; nproc=4; load 2.23 2.13 3.14; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache filled
     Refused at load as its keys name
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

`python3 explorations/coordinator/tools/ledger.py check` after the add: "fortress-gap-ledger.md, 741 rows, 10 fail the template; rows (or places) failing each rule: spec-path 8, reproducer-path 2, spec-section 1", the ten it printed before the add. `python3 explorations/coordinator/tools/record.py check --base HEAD`: "FACTS.md 176 entries, POSITIONS.md 81 entries; 0 failures; reported: size 2".

## 2. Deviations

1. **Step 8's grep prints 42, not 0.** Every match is one line, ``x@warning {Reference `#1' on page \thepage \space undefined}}{}``, the body of LaTeX's `\@setref` echoed by the macro tracing that `Specification/basic-lib/objects.tex:17` turns on (`\tracingcommands=1\tracingmacros=1`); `grep 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log | sort | uniq -c` printed `42 x@warning {Reference ...`. The log holds no warning of either kind: `grep -c '^LaTeX Warning: Reference'` and `grep -c 'multiply defined'` print 0 beside it, and its one line opening `! ` is a traced expansion of `opr (self)!`. Earlier rungs read the same lines so (`explorations/compile-ladder/rung-walk-coverage/REPORT.md:112`, 41 then). The repair's diff of `Specification/` adds no reference (`git diff Specification/ | grep '^[+-]' | grep -c 'ref{'` printed 0), so it moves none of the 42.
2. **Step 9's paths.** Beside the ruling's list the commit carries `explorations/coordinator/FACTS-history.md`, which `record.py set` wrote with F-223 and which its tool says to commit with `FACTS.md` (`explorations/coordinator/tools/record.py:35-36`); `explorations/coordinator/PLAN.md`, the entry for the ruling's item judge-review.1, which the repair's brief puts in this commit; and this file.

## 3. Decisions

1. **Which probe the test holds.** Both loaded, and the ruling asks for one test "from the probe that loads". The test holds `ProbeTieSharedList`'s pair, `tie[\T extends Wide\](a: Wide, b: Wide)` second: it differs from row 549's pair only by the second declaration's static parameters, and walk reads the two at one shared symbolic instance (`OverloadedFunction.java:1017-1031`). The other form, `tie[\U\](a: Wide, b: Wide)`, is in row 742's claim and notes with its output. Not taken: two tests, one per form; one program holding both pairs, which a fix of one form alone would turn red before the other is fixed.
2. **F-223 beyond its walk sentence.** The sentence now names the pair walk refuses by `NoDuplicatesRuleWalk`'s program and the two forms it loads (rows 549 and 742); its list of gating tests adds walk's two expected failures, `tests/XXXGenericBesidePlainSameDomain` and `XXXGenericBesideGenericSameDomain`, since an entry names the test that fails when it stops holding.
3. **Where judge-review.1 goes.** Under "Off the path, parked", in "Climb batch 16, listed for his review", beside the batch's other items: it asks no answer before work on the path goes on, and its default is the ruling's, the next batch that edits walk's `OverloadedFunction.java`.
