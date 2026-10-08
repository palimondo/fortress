<!-- A cold read of the fortress-repo skill's new "How a program runs" section and its three reworked parts finds the four worker plans mostly sound; the costliest gaps are the suite that a shared-phase edit needs, the promotion of an XXX test written in the same change, and the commit that a whole-suite run assumes. -->

# Cold read: how a program runs

2026-10-08. Files read: `.claude/skills/fortress-repo/SKILL.md`, `references/build-and-caches.md`, `references/tests-writing.md` and `references/tests-running.md`. No other file was opened, and nothing was run.

Short names below: SKILL is `SKILL.md`, B&C is `build-and-caches.md`, TW is `tests-writing.md`, TR is `tests-running.md`. Line numbers are those of today's files.

## Ranked findings

Most costly first. The sections below give the detail.

1. **A fix in a shared phase has no suite rule.** SKILL:56 says the two paths share the parser and the phases, and SKILL:60 puts the phases under `compiler/`. TR:61-67 names only "the checker or ... walk" (one suite each), the code generator, and "every other change" (own tests). A walk-observed defect fixed in desugaring or name binding reaches both suites. The worker runs `testSystem` only, or nothing, and the compiled tracks break at the gate.
2. **Promoting an XXX test written in the same change breaks.** TW:109-113 assumes the XXX test has already landed. A test written in this change is untracked (TW:84: "The test needs no commit of its own"), so `git mv` refuses it. TW:72 also says that a defect your change repairs needs only "an assertion in your gated test", which reads as: no XXX stage at all. The skill does not settle the conflict with such a brief.
3. **The promoted form of the run-time XXX pair is not given.** TW:96-100 defines `NameLink.test` plus `XXXName.test`, checked by `run_out_contains=REACHED`. TW:111 says to rename "the `tests=` lines and keys" and nothing more. After promotion, the run file still asserts only that `REACHED` printed. The worker must work out the file names, whether the pair stays two files, and how to turn `REACHED` into a value check (TW:86).
4. **A whole-suite run needs a commit the worker may not be allowed to make.** TR:61: "after your last edit of code, on the commit that holds it." "Code state" is defined by commits (TR:9-10). A brief that leaves commits to the coordinator makes this impossible. The same line says "you may run", which SKILL:166 reads as a requirement.
5. **A suite target's own build can empty the default caches.** TR:29 and TR:130: the test targets run `ant compileAll` first. B&C:101: that build empties `default_repository/caches` when the implementation changed. No line puts the two together. A compiled-path worker who runs `ant testQuick` after a Java edit, then `junit.sh`, links without the library's jars. The run fails with `NoSuchMethodError` on a library member through the "frozen bootstrap stubs" (B&C:122), which it may take for its own defect.
6. **Every Java or Scala iteration on the compiled path costs about 2 to 3 minutes.** The new build keeps the caches only when the implementation is unchanged (B&C:101), so every edit of the code generator or run time means `ant compileAll` (25 to 60 s) and the library order (100 to 110 s, B&C:39) before the next compiled run (B&C:105). The text states each piece. It never says the total, and the description's "keeps the caches unless the implementation changed" suggests that the caches usually survive.
7. **The run-time XXX pair probably needs `ONE_JVM=1`. No line says so.** TW:98: "run the two files together, the plain one first." TR:116: `junit.sh` "removes the named components' entries ... before and after the run." TR:115: without `ONE_JVM=1`, "each file gets its own JVM". If "the run" means each file, the XXX run finds no jar.
8. **SKILL:163 bans comparing printed output; TW:86 prescribes it.** SKILL:163: "Do not compare the printed output of the tests, and do not add expected-output files." TW:86: assert a value "with a `run_out_equals` key in a compiled test." The compiler's library declares the two-value `assert` only for `ZZ32`, `String` and `Character` (TW:21), so compiled tests often have to print their values. A worker either drops value checks or breaks the rule.
9. **Which `Library/` files are walk's is never stated as a rule.** SKILL:73 says each path has its own library. B&C:115 names only `Library/FortressLibrary.fss` "and the others". The worker infers from B&C:65 (the `Compiler` prefix) that a file without the prefix is walk's. Which files of `ProjectFortress/LibraryBuiltin/` are walk's is never said.
10. **B&C gives the library order's commands before the setup lines.** B&C:48-53 lists `cd ProjectFortress` and five compiles. The setup lines come at B&C:71-76. SKILL:181 lists "Setting up each call" as the first part that work meets. A worker who acts as it reads runs the compiles without `JAVA_HOME`, `FORTRESS_HOME` or the `tmp/` settings.
11. **"Mutable state, a field" (TW:120) reads two ways.** It can mean Fortress state only, or also Java fields. A worker who edits walk's tasks (SKILL:104) or the class loader's lock (SKILL:85) changes concurrent Java code, and cannot tell whether the one-thread and four-thread runs apply.
12. **The Java paths have no root in the skill.** SKILL:60, 85, 104 and 117 and B&C:67 give `compiler/...`, `runtimeSystem/...`, `interpreter/...` and `repository/...`. B&C:9 says only "under `ProjectFortress/src/`". `com/sun/fortress/` comes from CLAUDE.md. A worker with only the skill has to search for it.

## 1. Four workers, step by step

### Worker A: fixes a defect in walk's Java code

1. **Parts.** SKILL:198: "an interpreter fix needs `build-and-caches.md`, `interpreter.md`, `tests-writing.md`, `tests-running.md` and `committing.md`." Two parts are missing from the list. One is `session.md`, which SKILL:169 needs for "a build, a suite". The other is `worktrees.md`, which TW:81 needs for `old-fortress.sh`. The worker finds both from later lines and makes a second pass.
2. **Where the defect sits.** SKILL:56: "Walk and the compiled path share the parser and the phases below. After those, they share almost no code." SKILL:186: "walk's code (`interpreter/`)". This is the line the worker needs, and it works: a defect seen under walk can sit in a shared phase. The worker has to search for the root folder (finding 12).
3. **Setup.** B&C:71-76. Right.
4. **Test.** TW:27: "write `ProjectFortress/tests/Name.fss`, whose component is `Name`." TW:30 gives the rule for green. Right.
5. **See it fail.** TW:81: "Do this in a run that ends before you first build or compile your edit." TR:88-89 gives `harness-one.sh`. TR:93: "builds nothing". Right.
6. **Fix and build.** B&C:21: "Run `ant compileAll`". B&C:101: the build prints `started again, empty`. B&C:105: "Walk, `harness-one.sh` and the two ant suites need nothing more." Right. TR:92: the next `harness-one.sh` run starts with an empty cache, 15 to 25 s.
7. **Threads.** TW:120: "If your change touches mutable state, a field, an `atomic` block ...". A fix in `interpreter/evaluator/tasks/` (SKILL:104) changes Java concurrency, not Fortress state. Whether the line applies is unclear (finding 11).
8. **Whole suite.** TR:61: "If your edit changes the Java or Scala of the checker or of walk, you may run whole the tests that it reaches. Run them at most once for each code state: after your last edit of code, on the commit that holds it." TR:63: "For walk, run `ant testSystem`." This line raises three questions: whether "may" is optional, whether the worker may commit (finding 4), and what a fix in a shared phase needs (finding 1).

**Verdict.** The plan is right for a fix inside `interpreter/`. It goes wrong for a fix in a shared phase: the worker runs `testSystem` only, and the compiled tracks find the break at the gate. The path search and the two missing parts cost time.

### Worker B: edits `Library/*.fss` and checks it under walk

1. **Design.** SKILL:170: "study how the library already does the same kind of thing, and follow its way (`references/library.md`)." Right.
2. **Which library.** SKILL:73: "Each path has its own library today." B&C:115: "If you edited another file of the interpreter's library (`Library/FortressLibrary.fss` and the others): do nothing." The worker has to infer which files these are (finding 9).
3. **Test first.** TW:81: "Under walk, do it before you edit a library source that the test reads." This is explicit and helps.
4. **What to rebuild.** B&C:23: "Walk analyses them again by itself." Right: no build.
5. **Run.** TR:92: `harness-one.sh` starts empty when "the library sources" changed. It takes 15 to 25 s each time. Right.
6. **Whole suite.** TR:67: "After every other change, run only your own tests ... This includes an edit of the library." SKILL:166: "Run a whole suite only where `references/tests-running.md` says that your edit reaches it." A library edit reaches every walk test, so "reaches" invites a `testSystem` run that TR:67 rules out. The worker either loses 3 to 4 minutes or stops to resolve the two lines.
7. **Threads.** TW:120: "library code that writes shared state". SKILL:108-115 explains why. Right.

**Verdict.** The plan comes out right. It costs a guess about which library a file belongs to, and a pause over "reaches".

### Worker C: a compiled-path defect that fails at run time; records it as XXX, fixes it, promotes the test

1. **Parts.** SKILL:187 (`compiler.md`), with B&C, TW and TR. Right.
2. **Jars.** B&C:55: "Before the first compiled run, check that `default_repository/caches/bytecode_cache/` holds five jars". TR:107. Right.
3. **Write the pair.** TW:96-100: "`NameLink.test`, a plain name, with `tests=XXXName` and `link`"; "`XXXName.test`, with `tests=XXXName` and `run`, and no `link`"; "The program prints `REACHED` in `run()` before the part that fails." The text names example files. Clear.
4. **Run the pair.** TR:111 gives the `junit.sh` call with `ONE_JVM=1`. TW:98 says to run the two "together, the plain one first". No line says that the pair needs `ONE_JVM=1` (finding 7).
5. **Prove it twice.** TW:102-105. Right.
6. **"See the test fail."** TW:81 is written for a plain test. For an XXX test, "fail" means the harness reports it green (TW:3, TW:104). A worker who reads "The order" (TW:78) before "Writing an `XXX` test" (TW:90) may expect red.
7. **Promote before the fix.** TW:111: "Before you edit the code, remove the prefix ... Rename each file with `git mv`". The XXX test from step 3 is untracked, so `git mv` refuses it (finding 2). The promoted names and keys must be invented (finding 3). TW:111 also says "give the test a plain name by its topic", and that name may differ from the stem of `NameLink.test`.
8. **Fix and rebuild.** B&C:105: "After a build that started the caches again, run the library order before the next compiled run." Each iteration costs about 2 to 3 minutes (finding 6). A suite target can empty the caches too (finding 5).
9. **Diagnose.** SKILL:85 names the class loader and its open rows 408 and 559. That helps. SKILL:83: "These classes are never on disk." The four files give no way to look at an instantiated class after a `VerifyError`.
10. **Whole suite.** TR:66 covers a code-generator edit: own tests, and "the four-thread atomic runs if `compiler.md` asks for them". It does not name an edit of the run time or the class loader. That edit falls under TR:67, with the same answer.
11. **Threads.** TW:120: "For one thread, run the program directly with the prefix `FORTRESS_THREADS=1`". For a compiled test, a direct run is `fortress compile` and then `fortress run P` (SKILL:26). Neither the working directory nor the form of `P` is given here.

**Verdict.** The XXX stage comes out right. The promotion does not: git refuses the rename, and the worker must invent the pair's names and keys. The rebuild loop is slow, and it fails confusingly if a suite target emptied the caches.

### Worker D: only adds tests

1. **Parts.** TW, TR, and the setup lines of B&C. Right. It needs `records.md` too, for a ledger row in case 3 of TW:74.
2. **Folder.** TW:27-40. Right.
3. **Form.** TW:9-18. The traps at TW:20, 22 and 23 are clear and useful.
4. **Compiled test.** TW:42: "a `.fss` that no `.test` file names never runs." TW:52: with no `run_out` check, the output must contain `PASS`. The example at TW:54-57 checks `PASS`. TW:86 asks for `run_out_equals`, and SKILL:163 says "Do not compare the printed output" (finding 8).
5. **Run.** TR:96: "Name several files in one call". TR:124: "Run all the new files of one test folder together". Right.
6. **A test that fails today.** TW:70-76 gives the three ways. Choosing between ways 2 and 3 needs the specification (`specification.md`, outside this read). Right path.
7. **Whole suite.** TR:67: "A change of tests, prose or records only needs no whole suite." Right.
8. **Parallelism.** SKILL:115: "`acc := acc + x` inside a parallel `for`, with no `atomic`, is a race." The new section keeps this worker from writing a racy test. Good.
9. **Helper components.** TW:29: "Every `.fss` file there is gated". A helper component placed in `tests/` would run as a test. TW:31 says only where its api goes.

**Verdict.** The plan comes out right. It costs time on the assertion conflict, on where a helper component goes, and on the jar check in a fresh tree.

## 2. Passages that read two ways, contradict each other, or come in the wrong order

Ranked by cost.

| # | Where | Problem | What a worker does | Confidence |
|---|---|---|---|---|
| 1 | TR:61-67 against SKILL:56, 60 | No rule for an edit of a shared phase or of the parser. The phases live under `compiler/`, and "compiler" otherwise means the compiled path. | Runs `testSystem` only, or own tests only. The compiled tracks break at the gate. | Medium-high |
| 2 | TW:109-113 against TW:72, TW:84 | Promotion assumes an XXX test that has landed. TW:72 says a repaired defect needs no XXX test. | Hits `git mv` refusing an untracked file, or argues with its brief. | High |
| 3 | TW:111 | "the `tests=` lines and keys": the promoted form of the two-file run pair is unstated. | Invents file names, keeps a `REACHED`-only check, or drops the Link file. | High |
| 4 | TR:61 ("may", "on the commit that holds it") against SKILL:166 | Reads as optional or required. Needs a commit the brief may forbid. | Skips the suite, or commits against its brief, or runs on an uncommitted tree and cites no commit. | Medium |
| 5 | TR:29 and TR:130 against B&C:101, 105 | A suite target's build empties `default_repository/caches`. B&C:105 lists "the two ant suites" among what "need nothing more", which is true of the suites themselves but hides the effect on later compiled runs. | Runs `junit.sh` after a suite and takes the stub-linked `NoSuchMethodError` for a defect. | Medium-high |
| 6 | SKILL:163 against TW:86 and the TW:54-57 example | Bans comparing printed output, then prescribes `run_out_equals`. | Writes compiled tests with no value check, or feels it breaks a rule. | Medium |
| 7 | TW:98 against TR:115-116 | "Together, the plain one first" does not say `ONE_JVM=1`. Whether entries are removed per file or per call is unclear. | Runs without `ONE_JVM=1`. The XXX run is red, or green for the wrong reason with `run_out_does_not_contain=REACHED`. | Medium |
| 8 | B&C:48-53 before B&C:71-76; SKILL:181 | The library order's commands come before the setup lines. | Runs the five compiles in an unprepared shell. | Medium |
| 9 | TW:120 | "mutable state, a field": Fortress only, or Java too? Also, "run the program directly" is not given for a compiled test. | Skips, or guesses, the thread runs after a tasks or class-loader edit. | Medium |
| 10 | SKILL:166 against TR:67 | "where ... your edit reaches it" against "This includes an edit of the library". A library edit reaches every walk test. | Runs `testSystem` after a library edit. | Medium |
| 11 | TW:81 under "The order" (TW:78), before the XXX sections (TW:90 onward) | "See the test fail" means green for an XXX test. | Expects red from its XXX test and thinks the test is wrong. | Medium-low |
| 12 | TR:43 | "Put a `-D` switch on the `java` line of a run by hand (below)." No `java` line follows. | Searches for how to run a shard or `SystemJUTest` by hand. | Medium |
| 13 | TR:82 | "Each way below, except `ant testOnly`, ends with ... `OK (n tests)` ... exit code is 0". The track targets below it (TR:130-135) are Ant targets, which end with `BUILD SUCCESSFUL` or `BUILD FAILED`. | Reads a track's result in the wrong place, or distrusts Ant's exit code. | Medium-low |
| 14 | TW:33 | "An `XXX` test is green if the program loads and runs clean." It belongs to the load-refusal bullet, but reads like the rule for every walk XXX test. Nowhere does the text say what makes a walk XXX test without a `.test` file green. | Writes a walk XXX test that asserts and fails, then doubts that it is green. | Medium-low |
| 15 | SKILL:143 before SKILL:177 | The record query is introduced before the order "Load the parts ... before you run the query". | Runs the query before loading the parts that explain its output. | Low-medium |
| 16 | TR:109 against B&C:78 | "it runs the tree that it is in" against "`bin/fortress` takes `FORTRESS_HOME` from the shell whenever it is set". | With a stale export, believes it tested its own tree. | Low-medium |
| 17 | B&C:101 | "keeps a folder whose stamp equals the new one, and empties the others": which folders, and does it touch `harness-one.sh`'s `.cache`? | Worries that a build wiped a private cache. TR:92 answers it in part. | Low |
| 18 | TW:65 | "This is red either way." Either way of what? | Rereads it. No wrong action. | Low |
| 19 | TW:102 | "Show the first `XXX` test that your change adds": the first only, or each? | Proves only one of several XXX tests, or all. | Low |
| 20 | SKILL:56 against SKILL:65, 71 | "share ... the phases" and "the same phases", yet walk switches the type check off and compile adds literal folding. | None: the next lines explain it. | Low |
| 21 | SKILL:85 | "Open rows of the ledger are in it, such as 408 and 559." "It" is the class loader, but the sentence can read as "the rows are written in the file". | Greps the class loader for "408". | Low |
| 22 | SKILL:98 against SKILL:94 | Only the file names of copied entries need renaming, yet the example entry holds the absolute source path inside it. | Wonders whether seeded entries point at the main checkout. | Low |
| 23 | SKILL:104 | It does not say whose pool `FortressTaskRunnerGroup` is. The next sentence says tasks are built twice. | Looks in the wrong one of the two folders. | Low |

## 3. Terms

**Used before they are defined**

- "ledger", "ledger row": SKILL:85 and TW:23. They are defined at SKILL:141.
- "green": SKILL:164. It is defined at TW:3.
- "library order": B&C:17 and B&C:23, each with "(below)". It is defined at B&C:39.
- `nativewrapper_cache/`: B&C:21. It is described at B&C:31.
- "reproducer" (a column of the ledger): TW:74 and TW:109. It is never defined in these files.

**Never defined in these four files**

- "ladder", "ladder stage", "ladder regression" (SKILL:163, B&C:35), and "rung" and "climb-batch" in paths and test names.
- "atomic runs" and "the four-thread atomic runs" (TR:66).
- "frozen bootstrap stubs" (B&C:122): what they are, and why a run falls back on them silently.
- "load", as in "refusal at load" (TW:33) and "Walk checks part of this at load" (SKILL:125).
- "the disambiguator" (TW:22). It is presumably phase 2 at SKILL:63, but the text never says so.
- "static errors" against "an exception" at link (TW:97).
- "walk's list" (SKILL:65).
- `old-fortress.sh` (TW:81): a name with no path.
- `Executable` (TW:10).
- What `link` does beyond "link compiles, then links" (TW:45).
- Where `RTTIsize.of` lives (SKILL:83).

**One word for two things**

- **"compiler"**: the compiled path ("the compiler's library", SKILL:73), and the Java folder `compiler/` that holds the shared phases (SKILL:60) as well as compiled-only code (SKILL:117). This feeds finding 1.
- **"the library"**: walk's library, the compiler's library, and "a library object" for arrays (SKILL:87). TR:67's "an edit of the library" does not say which.
- **"XXX"**: one rule for the `.test` file's name (TW:62: every command must fail) and another for the component's name (TW:64: any link or compile exception is expected). Worker C needs both.
- **"fail"**: for a plain test, the harness reports red. For an XXX test, "see the test fail" means the harness reports green (TW:81 against TW:3).
- **"load"**: walk loading a program (TW:33) and the JVM loading a class (SKILL:85).
- **"harness"**: the suites' runner (SKILL:43) and the script `harness-one.sh`.
- **"run"**: the command `fortress run`, the `.test` key `run`, the function `run()`, and any run.
- **"run time"**: the time of execution, and the run-time system (SKILL:35 "the run-time", SKILL:75 "The compiled run time").
- **The checker** goes by four names: "the compiled checker", "the static type checker", "the compiled type checker" and "the checker". One thing, four names. That adds load but misleads no one.

## 4. What I had to assume

| # | Assumed | Why I needed it | Source | Confidence |
|---|---|---|---|---|
| 1 | A shared-phase edit needs both `testSystem` and `testQuick`. | Worker A's suite choice. | Guess from SKILL:56 | Medium |
| 2 | `git mv` refuses an untracked file, so an XXX test from this change must be staged before promotion. | Worker C's promotion. | Prior knowledge of git | High |
| 3 | The promoted pair is `NameLink.test` (`tests=Name`, `link`) and `Name.test` (`tests=Name`, `run`), with the `REACHED` key replaced by a value check. | Worker C's promotion. | Guess | Low |
| 4 | A suite target's build empties `default_repository/caches` after a Java edit, as `ant compileAll` does. | Worker C, to know that a library order is due after `ant testQuick`. | Inference from TR:29 and B&C:101 | Medium-high |
| 5 | The run-time XXX pair runs with `ONE_JVM=1`. | So that the run finds the link's jar. | Guess from TW:98 and TR:115-116 | Medium |
| 6 | `junit.sh`, like `harness-one.sh`, builds nothing. | Worker C, to build before the script after a Java edit. | Guess | Medium |
| 7 | A worker may commit its code before a whole-suite run, and that commit is the "code state". | TR:61. | Guess from SKILL:172 | Low-medium |
| 8 | `Library/` files without the `Compiler` prefix are walk's, and so are the files of `LibraryBuiltin/` other than `CompilerBuiltin` (AnyType is shared). | Worker B's rebuild step and run. | Guess from B&C:65, B&C:115, B&C:39 | Medium |
| 9 | TW:120's thread check also covers a Java change to tasks, transactions or the class loader's lock. | Workers A and C. | Guess | Medium |
| 10 | `old-fortress.sh` uses caches of its own, so base-code runs do not leave old-implementation entries under the new stamp. | Worker A, after exploratory edits. B&C:21 says that no entry notices a change of implementation. | Guess; it is in `worktrees.md` | Low |
| 11 | A direct compiled run is `cd ProjectFortress && ../bin/fortress compile compiler_tests/X.fss && ../bin/fortress run X`. | TW:120's one-thread check for a compiled test. | Guess from SKILL:26 | Low |
| 12 | A failing walk `assert` throws, so the program exits non-zero and the harness reports red. A walk XXX test with no `.test` file is green when that happens. | Reading walk results, and walk XXX tests. | Inference from TW:3 and TW:30 | Medium |
| 13 | A helper component of a walk test goes in `ProjectFortress/test_library/`. | Worker D. | Guess from TW:31 | Low-medium |
| 14 | `tests=` takes several components separated by commas. | Worker D, a test of several components. | Guess from TW:44 "component(s)" | Low |
| 15 | The Java paths sit under `ProjectFortress/src/com/sun/fortress/`. | Opening PhaseOrder, the class loader, MutableFValue, the tasks. | CLAUDE.md, not the skill | High |
| 16 | `default_repository/caches` is at the root of the tree. | The jar check and the build's messages. | Inference from B&C:43 | Medium-high |
| 17 | The Bash tool stops a foreground command at 120 s by default. | Choosing which builds go to the background (B&C:103: up to about 140 s). | Prior knowledge of the tool; the skill sends this to `session.md` | High |
| 18 | Ant exits non-zero on `BUILD FAILED`, unlike `harness-one.sh` and `junit.sh`. | Reading results by exit code. | Prior knowledge of Ant | High |
| 19 | Ledger rows are found by searching for the row's number in `explorations/fortress-gap-ledger.md`. | SKILL:85 (rows 417, 408, 559), TW:23 (row 454). | Guess | Medium |
| 20 | `ant` is on the PATH after the setup lines. | Every build. | Guess | Medium |

**A worker would act wrongly without these:** 1 (a missed suite), 2 (a refused rename), 3 (an invented test with no value check), 4 (a stub-linked failure taken for a defect), 5 (a red, or falsely green, XXX run), 6 (stale classes), 7 (a skipped suite, or a commit against the brief), 8 (the wrong library's step), and 10 (poisoned caches, if the guess is wrong). The others (9, 11 to 20) cost a search or a question.

## 5. Gotchas for a worker new to the repository

- A walk test is red if its output contains `fail` or `FAIL` anywhere, even in a longer word such as `failure` (TW:30).
- A compiled `.fss` that no `.test` file names never runs (TW:42).
- Every Java or Scala build changes the stamp and empties `default_repository/caches`. A suite target's own build does this too. Run the library order before the next compiled run.
- Missing library jars do not fail clearly. The run falls back on stubs and stops with `NoSuchMethodError` on a library member (B&C:122). All five compiles can exit 0 and still leave a jar missing (B&C:55).
- `harness-one.sh`, `junit.sh` and `fortress junit` exit 0 whatever the verdict. Read `OK (n tests)` or `FAILURES!!!` (TR:82).
- `harness-one.sh` deletes its scratch directory when it starts and when it ends (TR:94). It builds nothing (TR:93).
- The setup lines export `FORTRESS_THREADS=1`, while the harness scripts and the suites force four threads, and the heaps differ too (TR:103). A direct run and a harness run can disagree.
- A `.fss` in the current directory hides the library's file of the same name (B&C:63).
- `bin/fortress` uses `FORTRESS_HOME` from the shell. A stale export runs another tree's code (B&C:78).
- A `-D` switch on the `ant` line does not reach the suites' JVMs (TR:43).
- Run one suite at a time in a tree. Each suite deletes `test-caches` (TR:36).
- A component whose name contains `XXX` turns any link or compile exception into "expected", even in a plain-named `.test` file (TW:64).
- Do not name a variable after a library functional method such as `even` (TW:22). Under walk, `NN32` needs `unsigned(5)` (TW:23). A `(*)` comment cannot hold `*)` (TW:20).
- A file added to `tests/` moves every later file to another shard. Compare the sum of the four shards (TR:38).
- Do not pipe `ant` through `tail`. Run builds and suites in the background with a log (SKILL:169).
- Remove `<tree>/tmp/fortress*rats` when no run is live. DSL-grammar runs fill the disk (B&C:88-92).
