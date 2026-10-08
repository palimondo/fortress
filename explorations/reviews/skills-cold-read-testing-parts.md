<!-- A cold read of the fortress-repo skill's build, test-writing and test-running parts by four imagined workers (walk fixer, compiled-path fixer, library editor, probe): the passages that would cause a wrong or costly action, those that would send a worker searching, undefined and double-meaning terms, and gotchas. -->

# Cold read of the testing parts of `fortress-repo`

Date: 2026-10-08. For the coordinating session, then the curator once the problems are fixed.

What I read, and nothing else: `.claude/skills/fortress-repo/SKILL.md`, `references/build-and-caches.md`, `references/tests-writing.md`, `references/tests-running.md`. I ran nothing. Line numbers are those of the files at this commit's parent. Short names: SKILL, B&C (build-and-caches), TW (tests-writing), TR (tests-running). W1 to W12 are the wrong or costly actions, S1 to S16 the stops to search.

## The four workers, step by step

### 1. A walk fixer

1. Parts to load: SKILL 129 names build-and-caches, interpreter, tests-writing, tests-running and committing. I have three of the five.
2. Every Bash call starts with B&C 50-53. I check `echo $FORTRESS_HOME` (B&C 55).
3. I write `ProjectFortress/tests/Name.fss` in the form of TW 9-18 (TW 27). The component's name is the file's name (B&C 41). It gets a topic name and one comment line (TW 104). Nothing it prints may contain `fail` (TW 30). Its name must not end in `Syntax.fss` and the like (TW 32). No variable is named after a library method (TW 22). An NN32 value is `unsigned(5)` (TW 23).
4. I see it fail on the base's code, before I build (TW 73): `harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/Name.fss` from the tree's root (TR 88-92). I read `OK (n tests)` or `FAILURES!!!`, not the exit code (TR 82). Here I stop: is the tree I start from built? These parts do not say (S1).
5. For the diagnostic the harness hides: `cd ProjectFortress && ../bin/fortress tests/Name.fss` (TR 97-99).
6. I edit the Java. In `interpreter/evaluator/` or `glue/`, I may keep the caches (B&C 85-89). In `interpreter/rewrite/` or `env/`, I run the plain `ant compileAll` (B&C 95, 98). Walk and the harness need nothing more after it (B&C 78). It runs in the background with a log under `tmp/` (SKILL 100).
7. I rerun `harness-one.sh` and see `OK` (TW 74). I quote two to five lines of each run with its command (TW 78).
8. Whole suite: TR 61-63 says I "may" run `ant testSystem`, once for each code state, after my last edit. I cannot tell whether I should, or whether a later edit not yet committed needs a second run (W6). If my edit was in `interpreter/rewrite/`, which the library's compile runs (B&C 95), I cannot tell whether the compiled tracks are reached (W7).
9. If my fix makes another `XXX` test pass, nothing tells me how to find it before the gate (W4).
10. If the fix touches mutable state, TW 107 asks for runs at one and at four threads. I cannot tell how (S7).

### 2. A fixer of the compiled path

Recording the defect now:

1. I set up the call and reproduce: `bin/fortress compile P.fss`, then `bin/fortress run P` (SKILL 13). Before the first compiled run I check for five jars (B&C 32). I would stop at `CompilerSystem.jar` (W9).
2. The defect is the second kind: "A program that the checker accepts and that then fails ... at run time belongs here" (TW 65). So a gated `XXX` test, written in this change.
3. I write `Foo.fss` and two `.test` files in `compiler_tests/` (TW 35; the choice of folder is S2). The plain `Foo.test` holds `link`. The `XXX` file holds `tests=Foo` (TW 37, because its own name is not the component's), `run` and `run_out_contains=REACHED` (TW 85). I cannot tell whether the `XXX` file also holds `link`, as the only example does (W2). Nor where `REACHED` goes when the run dies before any output (S5), nor what makes a run test fail (S4).
4. I run both files in one JVM. TR 107-113 offers `junit.sh` first, then warns that it deletes `/tmp/fortress*rats` (TR 116). B&C 65 says to assume a run is live when other agents work. So I use `cd ProjectFortress && ../bin/fortress junit compiler_tests/Foo.test compiler_tests/XXXFoo.test` (TR 120). Many workers will not (W1).
5. I show the `XXX` test working through the harness twice: as it is, an expected failure; changed so that it passes, red; then restored (TW 89-92). I cannot tell what an expected failure looks like in the output (S6).

Promoting the test once the fix is in:

6. Before I edit the code, I `git mv` the `XXX` file to a plain topic name (TW 98). `Foo.test` is taken by the link test, so I pick `FooRun.test`. `tests=Foo` stays.
7. I see it fail on the base's code (TW 99).
8. I fix. A code-generator edit takes the plain `ant compileAll` (B&C 95), then the library order, about 110 s (B&C 23, 78). An edit of a body of a run-time class may keep the caches (B&C 90).
9. I run "its own tests" (TR 66). I cannot tell whose (W5).

### 3. A library editor

1. Which library holds the file? The compiler's apis have the `Compiler` prefix (B&C 42). AnyType belongs to both (B&C 23).
2. A file of the interpreter's library (`Library/FortressLibrary.fss` and the others): I write a walk test and see it fail before I edit the library (TW 73). I edit. I rebuild nothing (B&C 107). I rerun `harness-one.sh`.
3. A `.fss` of the compiler's library: I write a compiled test in `library_tests/` (TW 35) and see it fail on the current jars (TR 105). I edit. From `ProjectFortress/` I run `../bin/fortress compile ../Library/CompilerLibrary.fss`, that component only (B&C 28, 104). I check that the compile did not fail, because a failed one leaves the old jar linked (B&C 127). I rerun the test.
4. An `.fsi` edit of AnyType, CompilerBuiltin, CompilerLibrary or CompilerAlgebra takes the whole library order. `CompilerSystem.fsi` takes only its own compile (B&C 105-106).
5. The tests the edit reaches: every walk test reads `FortressLibrary`. TR 67 says to run only my own tests. SKILL 97 says to run a whole suite where my edit "reaches" it. I cannot tell which wins (W8).

### 4. A probe

1. Old code beside new: the only pointer is `old-fortress.sh` in TW 73, which sends me to `worktrees.md` (S10).
2. In each call I set up for the tree whose code I want, and export `FORTRESS_HOME` again (B&C 55). Otherwise both runs use one tree.
3. I put `P.fss` under `<tree>/tmp/`, with a component name that no library file has (B&C 40-41). I do not commit it (SKILL 103).
4. Under walk: `bin/fortress P.fss` in each tree (SKILL 12), with the same `JAVA_FLAGS` in both (TR 101). Compiled: each tree needs its own library order (B&C 78).
5. I compare the outputs. TW 78 says never to put a check into a one-off script, and TW 68 says that a probe does not write tests. I would compare by hand and report (S11).
6. I say which of the three ways the defect needs, and write the ledger row (TW 62-68). Its form is in `records.md`.
7. When no run of mine is live, I remove my parser directories (B&C 69).

## Passages that would lead to a wrong or costly action

### W1. `junit.sh` is offered first

- Where: TR 107-120, with B&C 65.
- Words: "The script is `.../junit.sh`", then "Warning: it runs `source` on its tree's env.sh. So each run deletes `/tmp/fortress*rats`", then "If another run may be live, run the same list in one JVM without the script."
- What I cannot tell: whether the script is ever safe while other agents work, since B&C 65 says to assume a run is live then. Nor what "This skips the script's cache clean-up" costs.
- What I would do: use the script, because it is the first and fullest instruction.
- Cost if wrong: another agent's live run that keeps its parser directory in `/tmp` (any `junit.sh` run, any run with env.sh's flags) dies midway. That agent may record a false defect or repeat a long run.
- Confidence: likely.

### W2. The two `.test` files of a run-time failure

- Where: TW 85, with TW 47-50, TW 55 and TR 113-114.
- Words: "write two `.test` files over one component. One has a plain name and drives `link`. The other has an `XXX` name and drives `run`".
- What I cannot tell: whether the `XXX` file's `run` relies on the plain file's `link` in the same JVM. Whether the `XXX` file may hold `link` too, as the only example does (TW 47-50); TW 55 says that an `XXX` file with `link` "demands that the compile fail".
- What I would do: copy the example's `link` and `run` into the `XXX` file, and get red. Or run the `XXX` file alone, or without `ONE_JVM=1`, so that each file gets its own JVM (TR 113) after `junit.sh` removed the component's entries (TR 114). The run then finds nothing linked, and the harness reports the expected failure for the wrong reason.
- Cost if wrong: a demonstration that proves nothing, or a red run and a search. The second of TW 91-92's two runs may catch it, after a confused round.
- Confidence: likely.

### W3. Promoting a walk `XXX` test

- Where: TW 98-99, with B&C 41.
- Words: "rename the test without the prefix (`git mv`), to a plain name by its topic. For a compiled test, rename the `.test` file and the `XXX` in its `tests=` line or keys as needed."
- What I cannot tell: that under walk the line `component XXXName` must change too. Only the compiled case says what else changes.
- What I would do: `git mv tests/XXXName.fss tests/Name.fss` and nothing more. Step 2 then shows a failure on the base's code, caused by the file name that no longer matches the component, and I would take it as the defect's failure.
- Cost if wrong: false evidence for step 2. After the fix the test still fails: a wasted build and harness cycle, or a wrong report.
- Confidence: likely.

### W4. A fix that makes another `XXX` test pass

- Where: TW 96, with TR 66-67.
- Words: "If you fix a defect that has a gated `XXX` test, that test starts to pass and turns the suite red." And: "Leave its whole tracks to the gate." "After every other change, run only its own tests".
- What I cannot tell: how to learn, before I edit, that a gated `XXX` test covers my defect. No search is named: not the test names, not the ledger, not a track run.
- What I would do: run my own tests, see them pass, and leave the rest to the gate.
- Cost if wrong: the gate goes red on an `XXX` test I never saw. Then a fix, a promotion done after the edit instead of before it (TW 98), and a second gate run (testFast alone takes 9 to 11 minutes, TR 14).
- Confidence: likely.

### W5. "Its own tests" after a code-generator edit

- Where: TR 66.
- Words: "After a code-generator edit, run its own tests, and the four-thread atomic runs if the edit is near transactions (`compiler.md`). Leave its whole tracks to the gate."
- What I cannot tell: whether "its own tests" are the code generator's (the compiler track, about 7 minutes, TR 130) or the tests that my change added. The second "its" plainly means the code generator, so the first reads that way too.
- What I would do: run the tests I wrote. Some workers would run the compiler track by hand.
- Cost if wrong: about 7 minutes for each needless track, or too little testing the other way.
- Confidence: likely.

### W6. "Code state" against "after your last edit"

- Where: TR 9-10, 61, 64-65; SKILL 96.
- Words: "Code at one commit. Only a commit that changes code makes a new code state." "Run it once for each code state, after your last edit". "Quote the verdict lines, the command and the commit".
- What I cannot tell: whether an edit after the suite run, not yet committed, needs a second run; by the definition it is the same code state. Which commit to quote when I have not committed yet: the base?
- What I would do: run once before I commit, and quote the base. If I edit again afterwards, I might not run it again.
- Cost if wrong: a regression reaches the gate, or a 3 to 4 minute run is repeated.
- Confidence: likely.

### W7. A walk edit that the library's compile runs

- Where: TR 61-63, with B&C 95.
- Words: "for walk, `ant testSystem`." B&C 95 lists "walk's `interpreter/rewrite/`" among what "the library's compile runs".
- What I cannot tell: whether an edit there reaches the compiled tracks as well.
- What I would do: run `ant testSystem` only.
- Cost if wrong: a regression of the compiled path, found at the gate.
- Confidence: guess.

### W8. A library edit and the word "reaches"

- Where: SKILL 97; TR 61, 67; B&C 107.
- Words: "Run a whole suite only where `references/tests-running.md` says that your edit reaches it." TR 61 names only "the Java or Scala of the checker or of walk". TR 67: "After every other change, run only its own tests".
- What I cannot tell: whether an edit of `Library/FortressLibrary.fss`, which every walk test reads, may run `ant testSystem`. "Reaches" in SKILL suggests yes; TR 67 says no.
- What I would do: hesitate, then run only my own tests.
- Cost if wrong: a walk regression at the gate, or a 3 to 4 minute run that the rules may not allow.
- Confidence: likely.

### W9. The fifth jar's name

- Where: B&C 32, against B&C 13.
- Words: "`fortress.AnyType.jar`, `fortress.CompilerBuiltin.jar`, `fortress.CompilerLibrary.jar`, `fortress.CompilerAlgebra.jar` and `CompilerSystem.jar`." B&C 13: "The library's jars have api-qualified names".
- What I cannot tell: whether the fifth jar really has no `fortress.` prefix, or the line drops it by mistake.
- What I would do: if the listing differs from the text, take a jar as missing, run the five commands again (about 110 s), and report a defect.
- Cost if wrong: about two minutes and a false defect report.
- Confidence: likely.

### W10. Running the library order again for a missing jar

- Where: B&C 34, against B&C 126.
- Words: "If a jar is missing, run the five commands again. Once, this made the jars." And: "A `fortress compile` of a source that did not change writes nothing and exits 0."
- What I cannot tell: how a second run over unchanged sources makes a jar, if such a compile writes nothing.
- What I would do: run them again, see nothing written, and report.
- Cost if wrong: about 110 s, and doubt about the cache rule.
- Confidence: likely.

### W11. How to assert in a compiled test

- Where: TW 78, with TW 21 and TW 45, against SKILL 94.
- Words: "Assert a value with `assert` in an interpreter test, and with a `run_out_equals` key in a compiled test." SKILL 94: "Do not compare the printed output of the tests".
- What I cannot tell: whether `run_out_equals` is an allowed exception to SKILL 94, or whether `assert` (for ZZ32, String and Character, TW 21) with a printed `PASS` (TW 45) is preferred.
- What I would do: use `assert` and `PASS` where the type allows, and `run_out_equals` otherwise.
- Cost if wrong: a test rejected in review and written again.
- Confidence: likely.

### W12. `XXX` on the component's name for a code-generator wall

- Where: TW 86, with TW 57 and B&C 41.
- Words: "put the `XXX` on the component name in `tests=`, with `compile_exception_contains=<text of the exception>`."
- What I cannot tell: that the `.fss` file and its `component` line must be renamed too, because a component's file name is its name.
- What I would do: write `tests=XXXFoo` over `Foo.fss`. The compile then fails because no such component exists, and TW 57 reports any compile exception of a component named with `XXX` as expected. Only the `compile_exception_contains` key may turn it red; TW 58 says so only for `compile_err_contains`.
- Cost if wrong: an `XXX` test that is green for the wrong reason, and never turns red when the wall is fixed.
- Confidence: guess.

## Passages that would make me stop and search

### S1. Is the tree I start from built?

- Where: TW 73; B&C 76; SKILL 95.
- Words: "See the test fail through the harness ... on the base's code. Do this in a run that ends before you first build your edit."
- What I cannot tell: whether `harness-one.sh` needs a built tree, and whether my tree (a new worktree, say) is built. B&C 76 mentions "a new one" taking about 80 s.
- What I would do: look for `ProjectFortress/build/`, or load `worktrees.md`.
- Cost if wrong: a harness run that fails for lack of classes, read as the defect's failure.
- Confidence: likely.

### S2. Which compiled folder

- Where: TW 35.
- Words: "in `compiler_tests/` (or `parser_tests/`), `library_tests/` or `other_compiler_tests/`."
- What I cannot tell: which folder takes which kind of test.
- What I would do: `compiler_tests/`, unless the test is about the library.
- Cost if wrong: low. A test in the longest track (TR 18) lengthens the gate a little.
- Confidence: sure, that a worker would ask.

### S3. Does `link` compile?

- Where: TW 38-39 and the example at TW 47-50.
- What I cannot tell: whether `link` compiles first, so that `compile` is not needed beside it.
- What I would do: follow the example.
- Confidence: likely.

### S4. What fails a run test

- Where: TW 45, 85.
- Words: "A `run` with no `run_out` check passes if its output contains `pass` or `PASS`."
- What I cannot tell: whether an exception or a non-zero exit fails a run whose `run_out_*` checks are met. The design at TW 85 depends on it.
- Confidence: likely.

### S5. Where `REACHED` is printed

- Where: TW 85.
- Words: "If the run dies before any output, use `run_out_does_not_contain=REACHED`."
- What I cannot tell: whether the program then prints `REACHED` at its end, or nowhere.
- Confidence: likely.

### S6. What an expected failure and "red" look like

- Where: TW 89-92; TR 82.
- What I cannot tell: which line of the runner's output shows an expected failure. "Saw wrong failure" (TW 58) is the only message named.
- What I would do: run it and read the output.
- Confidence: likely.

### S7. Four threads

- Where: TW 107; TR 30, 91.
- Words: "run its checks at `FORTRESS_THREADS=1` and at `4`." TR 91 says `harness-one.sh` uses testSystem's JVM settings, and TR 30 says these force one thread "whatever the shell exports".
- What I cannot tell: how to run a check at four threads. A direct run has no pass rule.
- Confidence: likely.

### S8. "The first `XXX` test" and "the harness itself"

- Where: TW 89.
- Words: "Show the first `XXX` test that your change adds working through the harness itself".
- What I cannot tell: whether only the first of several needs the two runs. Whether `fortress junit` (TR 120) counts as the harness itself, or only the track's class does.
- Confidence: guess.

### S9. The plain link file and `<Name>Link.test`

- Where: TW 85, 87.
- Words: "To guard a regression that shows as diagnostics, add a plain `<Name>Link.test`."
- What I cannot tell: whether this is the plain file of TW 85 under a set name, and what "shows as diagnostics" means.
- Confidence: guess.

### S10. Old code for a probe

- Where: TW 73.
- Words: "run the base's code through `old-fortress.sh` (`worktrees.md`)".
- What I cannot tell, from these parts: how to run old and new code side by side. I would load `worktrees.md`, which SKILL 114 lists. A pointer, not a defect; but SKILL 129's example of parts does not cover a probe.
- Confidence: sure.

### S11. A probe's comparison and its ledger row

- Where: TW 78, TW 68.
- Words: "Put every check into a test, never into a one-off script." "If your brief does not let you edit the original tree, say in your report which of the three the defect needs, and write the ledger row."
- What I cannot tell: whether a probe may compare two outputs with a script. Whether it writes a ledger row for a defect of the second kind too, which otherwise gets a test and no row.
- Confidence: likely.

### S12. A whole suite after a checker edit

- Where: TR 62, 130-136.
- Words: "for the checker, the compiler and library tracks (below)".
- What I cannot tell: why two tracks by hand (7 minutes, plus a library track with no time given) and not `ant testFast` (all four at once, 9 to 11 minutes). Why `other_compiler_tests` is left out. The command is shown for the compiler track only.
- Confidence: likely, for a checker fixer.

### S13. Where the switches go

- Where: TR 44-49.
- What I cannot tell: whether the `-D` switches go on the `ant` line, on the `java` line of TR 135, or both.
- Confidence: guess.

### S14. `climb-batch-N`

- Where: TR 107, against TR 25.
- Words: "`climb-batch-N` is the folder's real name, not a placeholder." TR 25 uses the glob `climb-batch-*`.
- What I would do: list `explorations/compile-ladder/` to be sure.
- Confidence: likely.

### S15. "Every run that imports a grammar"

- Where: B&C 5, with TR 72.
- What I cannot tell: whether every run makes a parser directory, or only a run that imports a grammar, which no gated test does (TR 72). B&C 67 ("Hundreds of them") suggests every run.
- Cost if wrong: low.
- Confidence: guess.

### S16. One suite at a time

- Where: TR 37.
- What I cannot tell: per tree or per machine. TR 31 (each suite deletes `ProjectFortress/test-caches`) suggests per tree.
- Confidence: guess.

## Terms used and never defined

- component: used throughout. Only "api" is defined (B&C 3).
- link, linker, linkage: a `.test` stage (TW 38), "the linker's saved state" (B&C 15), "fails ... linkage" (TW 65). What linking does beside compiling is not said.
- ladder, ladder driver, ladder stage, rung: B&C 19, SKILL 94, the path `rung-inference-walk` (TR 88), `EqualityRung1` (TW 47).
- `mg-run.sh`: B&C 5.
- climb batch, `merged-tests`: TR 25, 107.
- atomic runs, "near transactions": TR 66, 76.
- "a library write": TW 107.
- "diagnostics": TW 87.
- "verification": TW 65.
- "the compiler's prelude": TW 21.
- natives, native helper, `import java` natives: B&C 14, 89, 97.
- frozen bootstrap stubs: B&C 115.
- red, green, expected failure: used, never shown as the harness prints them.
- pinned, pins: TW 58, 66.
- `sayWhat`: TW 3, named only as a call.
- the `fastTrack` macro: TR 130.
- `old-fortress.sh`: TW 73, only by pointer.

## Words used for two things

- pass: the expectation holds (TW 3, "If it starts to pass, the suite goes red"; TW 96), and the harness reports green (TW 33, "An `XXX` test passes if the program loads and runs clean").
- suite: the two ant suites (TR 14, 21); a track (TR 61-62, "the suite that it reaches ... the compiler and library tracks"); a test folder (SKILL 93, "Add the test to the test suite").
- its own tests: the code generator's (TR 66) or the change's (TR 67).
- harness: the JUnit runner (SKILL 38-39, TW 57); the scripts (TW 73); the scripts' filtering (TR 97, "the real diagnostic that the harness hides").
- build: `ant compileAll`, and for a library edit a `fortress compile` (TW 73, "before you first build your edit").
- tree: a checkout (B&C 48), and the team's files, the "original tree" (SKILL 23-24, TW 68).
- stage: a stage of a `.test` file (TW 40) and a stage of the gate (SKILL 96).
- `XXX`: on the `.test` file's name (TW 55) and on the component's name (TW 57, 86), with different effects. The parts do not say when to use which.
- compile: the `compile` command, and "demands that the compile fail" for a file that drives `link` (TW 55).
- code state: a commit (TR 9-10), used as if it were the working tree (TR 61, "after your last edit").
- reaches: broad in SKILL 97, narrow in TR 61.
- the caches: the tree's `default_repository/caches`, the private caches, `test-caches`, walk's caches. "Only `ant compileAll` deletes the caches" (B&C 117), while `junit.sh` removes entries (TR 114) and the suites delete `test-caches` (TR 31).

## Gotchas

- The exit code is 0 whatever the verdict (TR 82). Why: agents check `$?` by habit.
- Neither suite compiles (TR 29, 36). Why: most build tools' test targets build first.
- The pass rule is a substring test: `failure`, `fails` or `failsafe` anywhere in the output fails a walk test (TW 30). Why: the word looks harmless in a message.
- Files whose names end in `Syntax.fss`, `DynamicSemantics.fss` or `Satisfiability.fss` never run (TW 32). Why: these are natural test names, and the harness says nothing.
- A `.fss` in a compiled folder that no `.test` names never runs (TW 35). Why: walk's folder needs no `.test` (TW 29).
- `harness-one.sh` deletes its scratch directory when it starts and when it ends (TR 92). Why: passing `<tree>/tmp` itself would delete logs and live parser directories.
- A walk test with a `.test` file must be named with it on the `harness-one.sh` line (TR 93). Why: without it, the refusal at load reads as a failure.
- `FORTRESS_HOME` from the shell wins (B&C 55). Why: a probe across two trees can run one tree's code twice.
- The current directory is searched first (B&C 40). Why: a probe named like a library file hides that file.
- `ant compileAll` deletes `default_repository/caches`, and so do `testSpecData`, `testNotPassing`, `testCompiler`, `testLibrary` and `testOtherCompiler`, which run it first (B&C 77, TR 55, 128). Why: they look like test-only targets, and the library order (about 110 s) must follow.
- Compiling a program never recompiles the library under it (B&C 102). Why: build tools usually rebuild what a target depends on.
- A failed or killed library compile leaves the old jar, linked with no warning (B&C 127). Why: the next run looks normal.
- `junit.sh` sources env.sh (TR 116). Why: the setup lines of B&C 50-53 exist to avoid exactly that.
- An unmet `run_out_*` check fails even an `XXX` test (TW 56). Why: so `run_out_contains=PASS` in an `XXX` test is red today, which is why TW 85 forbids it.
- Any compile or link exception of a component whose name contains `XXX` is reported as expected (TW 57). Why: an `XXX` component name masks unrelated breakage.
- A failure while the top-level variables are initialised counts as a refusal at load (TW 33). Why: it looks like a run-time failure.
- The compiled two-value `assert` exists only for ZZ32, String and Character (TW 21). Why: walk's takes any type.
- Under walk a numeral does not bind to NN32 or NN64, and a numeral with a radix point does not bind to RR32 (TW 23).
- `(*)` is a line comment that cannot hold `*)` (TW 20). Why: it reads like a typo for `(*`.
- The suites run at one thread; `ant testOnly` runs at the shell's count (TR 30, 126).
- A file added to `tests/` moves later files to other shards, so compare the sum of the four (TR 39).
- Each suite deletes `ProjectFortress/test-caches` when it starts (TR 31). Why: two suites at once in one tree break each other.
- AnyType is in both libraries (B&C 23). Why: an edit of it reaches walk and the compiled path.
- An edit of the interpreter's library needs no rebuild, and compiled programs do not link that library yet (B&C 107).
- The direct run and the harness use different heaps (TR 101). Why: a stack overflow may show in one only.
- `climb-batch-N` is a real folder name (TR 107).
