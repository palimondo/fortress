# fail-word probe — does the interpreter harness fail on a printed `fail`?

**Question.** `explorations/reviews/library-scalar-extension-review.md` (test-quality
note) claims that `ProjectFortress/tests/ArrayScalarExtension.fss` and
`ArrayOperatorsBesideLibrary.fss`, whose `check` helper only *prints*
`fail …`, would let a wrong value through: no `.test`/expected-output file
sits beside them, so the suite would stay green. `FACTS.md` (territory map,
gate line) and `postmortem-2026-09-19/array-work-brief.md` §2 say the
opposite: a `tests/` program with no `.test` file passes only if it exits 0
**and** its output contains neither `fail` nor `FAIL`.

**The rule** — `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java`,
`SourceFileTest.testFile()` (the method `InterpreterTest`, i.e. every
`tests/*.fss`, inherits):

```java
:377  boolean anyFails = ! f.contains("QuickCheckTest") &&
:378                     (outs.contains("fail") || outs.contains("FAIL") ||
:379                      errs.contains("fail") || errs.contains("FAIL") ||
:380                      rc != 0);
...
:408  if (anyFails && trueFailure == null) trueFailure = "FAIL or fail should not appear in output";
...
:415  assertTrue("Must satisfy " + trueFailure + " " + whoami(), trueFailure == null);
```

**How it was run.** Same entry point `ant testSystem` uses — `SystemJUTest`,
which is `FileTests.interpreterSuite(dir, …)` over a directory, with the
directory overridden by `-Dtests=<dir>` (no shard property, so the whole
directory runs). Private caches (`FORTRESS_CACHES` / `-Dfortress.caches`
under the scratch dir), `FORTRESS_THREADS=1`, `experiment/env.sh` sourced,
`-Xmx768m -Xss32m` as the `systemShard` macro passes.

- `FailWordProbe.fss` — verbatim copy of `ProjectFortress/tests/ArrayScalarExtension.fss`,
  component renamed, with one expected value deliberately wrong
  (`check("(v + 1.0)[0]", (v + 1.0)[0], 99.0)`, correct value `0.0`).
- `run-broken.txt` — that copy alone in a scratch directory.
- `run-control.txt` — the unmodified `ArrayScalarExtension.fss`, byte-identical
  copy, alone in a scratch directory.

**Result.** The broken copy printed `fail (v + 1.0)[0]: got 0.0, want 99.0`
and the harness reported

```
junit.framework.AssertionFailedError: Must satisfy FAIL or fail should not appear in output
        InterpreterTest …/broken/FailWordProbe
        at com.sun.fortress.tests.unit_tests.FileTests$SourceFileTest.testFile(FileTests.java:415)
FAILURES!!!
Tests run: 1,  Failures: 1,  Errors: 0
```

The unmodified test: `. interpret …/control/ArrayScalarExtension  OK (time = 12965ms)` / `OK (1 test)`.

**Verdict.** The record is right and the reviewer's note is wrong. A print-only
`check` helper is *not* silently green: the word `fail` in stdout is itself the
failure signal the harness asserts on, which is why the corpus convention of
printing `fail …` works without an expected-output file. The two tests were
left unchanged.
