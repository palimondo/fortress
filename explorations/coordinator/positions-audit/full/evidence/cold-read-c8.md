# Cold read, chunk c8

Source: `rewritten-c8.txt` (P-102, P-103, P-124, P-125). Read with no other project context.

## P-102 Test first, the test kept

**What it tells me to do.** Before I change any source code in the original tree, I add a test that fails, check that it really fails, then make the fix and check that the test passes. The test stays in the suite for good, and the whole suite has to be green. The test and the fix can go in the same commit.

**What it decides, and why.** Every source edit has to be driven by a permanent regression test. The entry gives no reason.

**Unclear.**
- "Every edit of source code": does this include edits that no failing test can show, such as pure refactors, comment or log changes, build-file changes, or performance work? Read strictly, none of those would be allowed. Read loosely, the rule covers only behaviour fixes.
- "the full suite stays green" does not fit the step where the new test fails. Is green required only when the change lands, or at every commit? If it is every commit, may the test be committed on its own before the fix? "needs no commit of its own" allows one commit but does not say whether a separate red commit is allowed.
- "verifies that it actually fails" does not say whether the test must fail *for the reason the fix addresses* or whether any failure counts, such as a crash in the test itself.

## P-103 The suite's verdict is the check

**What it tells me to do.** I treat a test as pass or fail only. Any value that matters must be asserted inside the test with the suite's existing mechanisms: `assert` in interpreter tests, `run_out_equals` in compiled tests. I ignore whatever else a test prints, I add no expected-output files, and I do not propose them again.

**What it decides, and why.** It rules out golden/expected-output files and puts every check inside the test, because the original team designed the suite around pass/fail.

**Unclear.**
- "none of it is offered to him again": "him" is never named (presumably the curator), and "it" could mean expected-output files, checking printed output in general, or the whole idea.
- `run_out_equals` appears to compare a program's output with an expected value, which looks like an expected-output check written inline. Where is the line between that (allowed) and an "expected-output file" (forbidden)? Is the difference only that one is inline and the other a separate file?
- It does not say what happens to expected-output files that already exist. Are they kept, frozen, or to be converted?
- "a value that matters": the entry does not say who decides which values matter.

## P-124 The specification's examples join the gate at zero red

**What it tells me to do.** `ant testSpecData` runs the specification's examples under walk as one step of the gate, and every example must pass. When an example fails, I fix the implementation. I do not rewrite the example to suit walk, and I do not keep a list of known failures. The entry says this is already built.

**What it decides, and why.** The specification's examples are a gate step that tolerates no failures, and the specification outranks the implementation. The reason is implied rather than stated: the spec is the authority.

**Unclear.**
- "not respelled for walk" forbids changing an example to suit the interpreter. Does it also forbid fixing an example that is wrong in the specification itself, such as a typo or an outdated syntax? The entry does not say whether the spec text may ever change.
- With zero red and no known-failure list, one example that needs an unimplemented feature blocks every landing until that feature exists. Is that intended, or are such examples kept out of `testSpecData` some other way? The entry does not say how a new failure is handled while it waits for a fix.
- The rule is stated "under walk" only. It does not say whether the examples must also pass compiled, or whether the compiled path is out of scope.

## P-125 The suites run Fortress in parallel, pinned at four threads in build.xml

**What it tells me to do.** I run the test suites with four threads, set in `build.xml`, and I never drop to one thread to save the four-CPU machine. If a test fails or gives different results under parallelism, either the test is written wrong (for example, a write that needs `atomic`) or it has found a real defect. I fix whichever it is and never mask it by pinning the thread count. The four-thread setting overrides anything set in the calling shell.

**What it decides, and why.** All suites run at a fixed four threads, and parallelism problems are fixed, not hidden. The reason given: parallelism is native to Fortress, so a one-thread run would miss bugs.

**Unclear.**
- "pin" is used in two opposite senses. The four-thread pin in `build.xml` is required, but "never hidden by a pin" forbids pinning. I read the second as pinning a single test or run to one thread, but on its face the entry calls for a pin and forbids one.
- "The pin makes every run the same": the same thread count, presumably, but parallel runs are not deterministic, so "the same" cannot mean the same result.
- Conflict with P-103. P-103 says printed output beyond a test's checks "does not matter", while P-125 says a test that "varies under parallelism is written wrong". If only the order of printed lines changes between runs and every assertion holds, is the test wrong under P-125 or fine under P-103?
- "whatever the calling shell sets" seems to rule out a one-thread run even for local debugging. It does not say whether that is forbidden or only not what the suites do.
- "The suites" does not say which targets are covered: the interpreter tests, compiled tests, `testSpecData` (P-124), or all of them.
