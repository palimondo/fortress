<!-- The claims of each of the 24 FACTS entries of the chunk `harness` (section "The harness and the gate"), each with its subject, its kind, the other entries that say the same, and what today's checks say of it, as the first step of the sorting map of 2026-11-24 (brief: `brief-claims.md` beside this file); it rewrites no entry and decides no order. -->

# Claims of the chunk `harness`

Read on FACTS as it stands after `d52210a046` (the five consolidated chunks restored). Overlaps were found by `grep -F` of each claim's distinctive names over the whole of `explorations/coordinator/FACTS.md`; the words searched are given where nothing was found, and in brackets where they found the overlap. Checks are copied from `pilot/chunk-harness-gate.md` (pilot), which stands in for this chunk's scout, from `evidence/stale-claims.md` (stale) and from `evidence/consolidation/followups.md`, harness (followups). "Sound" means the pilot passed the claim's scope, present meaning and evidence, and no source lists a finding. Where the pilot says a skill part repeats the claim, that is given under overlaps, since FACTS alone would miss it. Subject labels start with the brief's areas, as in `claims-exec.md`.

Each claim reads: number, sentence, then subject and kind.

### F-97, "The gate's step 7 runs the interpreter's suite on the compiled path ..."

1. Claims
   - C1. The gate's step 7 runs the interpreter's suite on the compiled path, each program judged by its own verdict, never against an earlier run (P-103). Subject: the harness and the gate: step 7. Kind: property.
   - C2. It runs each listed program of `suite-compiled.tsv` under its library, and tries under both libraries each program of `tests/` that the batch added or changed. Subject: the harness and the gate: step 7. Kind: property.
   - C3. A listed program that fails is red unless a rung declared it leaving (`expectedMoves`), and a tried one that passes joins. Subject: the harness and the gate: step 7. Kind: property.
   - C4. The list began with 197 programs, from the count on `4b0e3abd6a`. Kind: history.
   - C5. MicroGPT's 18 components are no longer compiled there; at climb batch 35b's gate all 18 stopped at disambiguate under the prelude. Subject: the checker: microGPT on the prelude. Kind: history.
   - C6. Detail in the README. Kind: pointer.
2. Overlaps: C1-C3: F-109 [step 7's list], F-203 [step 7 runs copies of `run-subset.sh`]; P-103; skill `gate.md:68-81` (pilot). C5: F-58 [microGPT's flat program under the compiled checker against the one library, another library]; PLAN.md:9 cites F-97 for it (pilot). Searched "expectedMoves": only F-97.
3. Checks: sound in scope and present meaning; evidence kind unstated (only the README cited), and C5 names no file; it is `climb-batch-35b/gate/ladder/microgpt-phase.md` (pilot). Followups: `review-queue.md:1067` "built (F-97)" is false now.
4. Shape: several subjects (step 7; microGPT on the prelude). Title: step 7 judges each program by its own verdict; C4-C5 do not serve it.

### F-98, "The harness's `run_out_WIcontains` key is whitespace-insensitive containment."

1. Claims
   - C1. `run_out_WIcontains` collapses whitespace runs in both output and expected string. Subject: the harness and the gate: check keys. Kind: property.
   - C2. `_WImatches` collapses them in the output only. Subject: the harness and the gate: check keys. Kind: property.
   - C3. A key that `generalTestFailed` does not know sets no check, so a misspelt key checks nothing. Subject: the harness and the gate: check keys. Kind: defect (no row).
   - C4. A `run_out` with no check defaults to output containing `pass` or `PASS`. Subject: the harness and the gate: check keys. Kind: property.
   - C5. Source: `FileTests.java` lines. Kind: detail.
2. Overlaps: none in FACTS (searched "WIcontains", "run_out", "generalTestFailed"). Skill `tests-writing.md:55-65` holds C1 and C4; not C2, C3 (pilot).
3. Checks: sound (pilot, read in the code). C3 not run: the pilot lists it under "could not check".
4. Shape: one subject (check keys). Title states C1; the body serves it.

### F-99, "The gate's thread count is pinned in the build file for the two suites ..."

1. Claims
   - C1. `build.xml`'s `fastTrack` and `systemShard` macros pin `FORTRESS_THREADS=4` for `testFast` and `testSystem` (P-125). Subject: the harness and the gate: threads and heaps. Kind: property.
   - C2. Without the pin the suites take the caller's count: half the CPUs if unset, or 1 under `env.sh` (F-203). Subject: the harness and the gate: threads and heaps. Kind: property.
   - C3. `fastTrack` pins `JAVA_FLAGS` to `-Xmx4g -Xss64m` because a compiled test's run step takes its heap and stacks from it. Subject: the harness and the gate: threads and heaps. Kind: property.
   - C4. With `JAVA_FLAGS` unset, `bin/run` gives 1 MB stacks, and `TimingRungT` overflowed in 8 of 12 runs (row 640). Subject: the harness and the gate: threads and heaps. Kind: defect (row 640).
2. Overlaps: C1-C2: F-203 [`FORTRESS_THREADS=1`], F-19 [`FORTRESS_THREADS` sizes the pool]; P-125; skill `tests-running.md:33`, `interpreter.md:157` (pilot). C3: F-107 [testFast gives 4 GB with 64 MB stacks]. C4: none found (searched "row 640", "TimingRungT").
3. Checks: sound (pilot: `build.xml:1257`, `:1508`; row 640 NEGATIVE-BOUNDED). Not run: the 8 of 12 (pilot).
4. Shape: one subject (threads and heaps). Title: the pin is in the build file; the body serves it.

### F-100, "`ant compileAll` deletes the caches folders ... when the implementation changed ..."

1. Claims
   - C1. `ant compileAll` deletes `default_repository/caches` and `local_repository/caches`, with `global.map`, when the implementation changed, and keeps them otherwise. Subject: the tools: build and caches. Kind: property.
   - C2. It compares a folder's `implementation.stamp` with the new build's. Subject: the tools: build and caches. Kind: detail.
   - C3. After a deletion `fortress run` dies with `NoClassDefFoundError: ...GeneratorZZ32` until the library order refills the five jars, in about two minutes. Subject: the tools: build and caches. Kind: property.
   - C4. `ant cleanCache` deletes both folders whatever the stamp. Subject: the tools: build and caches. Kind: property.
   - C5. `Shell.resetRepository` empties the run's caches folder, called by `CompilerJUTest` and `LibraryJUTest` unless `fortress.junit.reset` is false, as `testFast` sets it. Subject: the tools: build and caches. Kind: property.
   - C6. A `fortress compile` after a rebuild of the compiler does not clear them. Subject: the tools: build and caches. Kind: property.
   - C7. The linker writes a missing `global.map` again, empty. Subject: the tools: build and caches. Kind: property.
2. Overlaps: C1, C3: F-17 [five jars, library order], F-404 [`compileAll` keeps the seeded caches, `caches-one`], F-381 [`caches-one`]; F-22, F-181 share `NoClassDefFoundError` only. Skill `build-and-caches.md:64-69`, `:77`, `:113-116`, `:133`; `tests-running.md:53` (pilot). C4-C7: none in FACTS (searched "cleanCache", "resetRepository", "global.map").
3. Checks: C1 false today (three folders, `caches-one` too, since `c7ba100d14`); C4 false today (deletes three and restamps); C5 false today (`OneLibraryJUTest` calls `resetRepository` too) (stale; pilot). The pilot also notes the build deletes the caches at its start when its sources changed, which the entry omits. C3, C6 not run (pilot).
4. Shape: one subject (build and caches). Title states C1; the body serves it.

### F-101, "`harness-one.sh` keeps its Fortress cache between calls."

1. Claims
   - C1. `harness-one.sh` keeps its cache in `<scratch-dir>.cache` between calls. Subject: the tools: harness-one cache. Kind: property.
   - C2. It reuses the cache while the built implementation and sources on the source path are those that filled it. Subject: the tools: harness-one cache. Kind: property.
   - C3. `COLD_CACHE=1` empties it first. Subject: the tools: harness-one cache. Kind: property.
2. Overlaps: none in FACTS (searched "COLD_CACHE", "harness-one.sh": F-234 names the script only). Skill `tests-running.md:101`, nearly word for word; `build-and-caches.md:71` (pilot).
3. Checks: sound; evidence kind unstated (pilot). Not run (pilot).
4. Shape: one subject. Title matches.

### F-102, "An `XXX*.fss` in the interpreter corpus is a gated expected-failure test."

1. Claims
   - C1. `SystemJUTest` marks a `tests/` file whose name starts with `XXX` as one that must fail, and the suite goes red when it passes. Subject: the harness and the gate: XXX tests. Kind: property.
   - C2. Such a test needs a `.test` file only to name a refusal at load (F-29: the load check and its `load_exception_contains` key). Subject: the harness and the gate: XXX tests. Kind: property.
   - C3. An `XXX` test that imports an api with its component takes them from `test_library/`. Subject: the harness and the gate: test imports. Kind: property.
   - C4. The compiled corpora's rule differs (F-103). Kind: pointer.
   - C5. Source: `FileTests.java` lines; skill pointer. Kind: detail.
2. Overlaps: C1-C2: F-383 [refusal at load, `load_` keys], F-103 [`XXX` in compiled corpora]. C3: F-119 [`test_library`, other subject]. Skill `tests-writing.md:39-45`, `:72-79` (pilot).
3. Checks: C2's pointer is beyond its support: F-29 does not hold the `load_exception_contains` key; F-383 does (stale; pilot). Rest sound.
4. Shape: one subject (XXX tests). Title matches.

### F-103, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` cannot express ..."

1. Claims
   - C1. In `compiler_tests/` and `library_tests/` the `XXX` mechanism cannot express, in one `.test` file, a program that compiles and then fails at run time. Subject: the harness and the gate: XXX tests. Kind: property.
   - C2. The `XXX` prefix of a `.test` file's name makes every command it drives a must-fail. Subject: the harness and the gate: XXX tests. Kind: property.
   - C3. So such a defect needs two `.test` files: a plain one that drives `link`, and an `XXX` one that drives `run`. Subject: the harness and the gate: XXX tests. Kind: property.
   - C4. A compile-stage failure needs one `XXX` compile test. Subject: the harness and the gate: XXX tests. Kind: property.
   - C5. An `XXX` compile test with `compile_err_contains` whose program compiles is red: "Saw wrong failure". Subject: the harness and the gate: XXX tests. Kind: property.
2. Overlaps: F-383 [a compiled refusal test is `XXX`-named], F-102, F-104 [`XXX` component]. Searched "Saw wrong failure": only F-103. Skill `tests-writing.md:75`, `:78`, `:103-113` (pilot).
3. Checks: sound; evidence kind unstated (pilot).
4. Shape: one subject. Title matches.

### F-104, "A thrown `CompilerError` takes a third path through the test harness ..."

1. Claims
   - C1. The harness checks three streams of a command: output, error output and a thrown exception. Subject: the harness and the gate: check keys. Kind: property.
   - C2. `Shell` does not catch a `CompilerError` from the code generator, such as a code-generator wall. Subject: the code generator: walls. Kind: property.
   - C3. The harness reads it as an exception of the component that `tests=` names, with `compile_exception_*` keys. Subject: the harness and the gate: XXX tests. Kind: property.
   - C4. If that component's name holds `XXX`, a link or compile exception is green whatever the `.test` file is called; only an unmet key makes it red. Subject: the harness and the gate: XXX tests. Kind: property.
   - C5. A `compile_exception_contains` key pins the wall's text, so the test turns red when the wall goes or changes. Subject: the harness and the gate: XXX tests. Kind: property.
2. Overlaps: none in FACTS (searched "CompilerError", "compile_exception", "sayWhat"); F-103 near. Skill `tests-writing.md:77`, `:108`; `compiler.md:38` (pilot).
3. Checks: sound; evidence kind unstated (pilot: `Shell.java` names no `CompilerError`; 36 tests use the key and passed at batch 36).
4. Shape: one subject (XXX tests and check streams). Title matches.

### F-105, "`testSystem`'s four shards are one suite split by sorted index ..."

1. Claims
   - C1. `testSystem`'s four shards are one suite split by sorted index modulo 4. Subject: the harness and the gate: shards. Kind: property.
   - C2. So an added file moves every later one, and only the shards' sum compares across a corpus change. Subject: the harness and the gate: shards. Kind: property.
   - C3. `gate_compare` sums the `system-<i>` rows before it compares. Subject: the harness and the gate: shards. Kind: property.
2. Overlaps: none in FACTS (searched "gate_compare", "shard": F-234 names the shards' JVMs). Skill `tests-running.md:7`, `:41` (pilot).
3. Checks: sound (pilot, read in the code).
4. Shape: one subject. Title matches.

### F-106, "The native-wrapper generator wraps every method, static or instance ..."

1. Claims
   - C1. The native-wrapper generator wraps every method, private ones too, of a class that `import java` names. Subject: the code generator: native wrappers. Kind: property.
   - C2. It skips constructors, static initializers and methods with Java `byte`, `short` or array types. Subject: the code generator: native wrappers. Kind: property.
   - C3. A wrapped method with a type that has no Fortress counterpart makes it refuse the whole import (row 368). Subject: the code generator: native wrappers. Kind: defect (row 368).
   - C4. So a helper class that `import java` names needs signatures that map to Fortress, private or not. Subject: the code generator: native wrappers. Kind: property.
   - C5. A class that no `import java` names is not bound, as `systemHelper.setFinalStatic` shows. Subject: the code generator: native wrappers. Kind: detail.
   - C6. Observed when a private helper with a `Class<?>` parameter broke the rebuild. Kind: history.
2. Overlaps: C1-C4: F-309 [`ForeignJava` reads every public method, api reader; the pilot notes the two scopes can read as a conflict], F-301, F-298 [`import java`]. Searched "row 368", "SignatureParser": only F-106. Skill `compiler.md:129` holds C1, C3, C4, not C2 (pilot).
3. Checks: sound (pilot: `FortressMethodAdapter.java:260-264`, `SignatureParser.java:52-55`; row 368 NEGATIVE-VERIFIED).
4. Shape: one subject (native wrappers). Title matches.

### F-107, "Three heaps run the interpreter ..."

1. Claims
   - C1. Three heaps run the interpreter, and a gated test can pass at two and die at the third. Subject: the harness and the gate: threads and heaps. Kind: property.
   - C2. `bin/fortress` gives walk 256 MB unless `JAVA_FLAGS` is set (row 67: a 2M-element array exhausts it). Subject: the harness and the gate: threads and heaps. Kind: defect (row 67).
   - C3. The harness runs walk tests in its JUnit JVM at 768 MB. Subject: the harness and the gate: threads and heaps. Kind: property.
   - C4. `env.sh` and the setup lines set 4 GB with 64 MB stacks. Subject: the harness and the gate: threads and heaps. Kind: property.
   - C5. Measure a claim about a walk failure near a memory limit at 256 MB. Subject: the harness and the gate: threads and heaps. Kind: property.
   - C6. A compiled run gets 1536 MB from `bin/run` unless `JAVA_FLAGS` is set, and `testFast` gives its run step 4 GB (F-99). Subject: the harness and the gate: threads and heaps. Kind: property.
   - C7. `IntSemanticsRungI.fss`, before its repair, passed at 4 GB and 768 MB and died at 256 MB. Kind: history.
2. Overlaps: C1-C5: F-99 [`JAVA_FLAGS`, 4 GB], F-203 [`env.sh` sets `JAVA_FLAGS`]; F-140, F-146, F-222 [row 67]. Skill `interpreter.md:156` nearly whole; `tests-running.md:33` (pilot). C6: F-99; not in the skill (pilot).
3. Checks: sound (pilot: `bin/fortress:28-29`, `build.xml:141`, `env.sh:8`, `bin/run:33-34`; row 67 agrees).
4. Shape: one subject (threads and heaps). Title matches.

### F-108, "The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program."

1. Claims
   - C1. Walk's overload-ambiguity message names its two declarations in an order that varies from run to run as `bin/fortress` and the suites run walk. Subject: walk: ambiguity message order. Kind: defect (row 430).
   - C2. With three JVM flags set together the order is fixed for a given library, and a library edit can flip it. Subject: walk: ambiguity message order. Kind: property.
   - C3. Which of the three fixes the order is not known. Subject: walk: ambiguity message order. Kind: property.
   - C4. The harness reads only that the `XXX` test fails, and no gate stage compares the message (P-103). Subject: the harness and the gate: XXX tests. Kind: property.
2. Overlaps: C1: F-232 [row 430, walk's `_WrappedFValue` identity hash]. Searched "ambiguity": only F-108. Skill `interpreter.md:109` (pilot).
3. Checks: sound; consistency fails with the skill, whose `interpreter.md:109` names one core as the cause (pilot; stale's skill list: the skill is wrong).
4. Shape: one subject (ambiguity message order). Title matches.

### F-109, "Two gated walk tests are refused by the compiler until the switch-over ..."

1. Claims
   - C1. Two gated walk tests are refused by the compiler until the switch-over. Subject: the code generator: prelude spelling gaps. Kind: property.
   - C2. `CoercionRedispatchRungC.fss` writes `SUM[\ZZ32\]`, an approved test line, and the prelude's `SUM` takes no static argument. Subject: the code generator: prelude spelling gaps. Kind: property.
   - C3. `expTest.fss` calls `asFloat`, which the prelude does not declare. Subject: the code generator: prelude spelling gaps. Kind: property.
   - C4. Walk's gated runs need both spellings. Kind: detail.
   - C5. Neither file is in step 7's list. Subject: the harness and the gate: step 7. Kind: property.
2. Overlaps: C1-C3: none found (searched "expTest", "CoercionRedispatchRungC"; "asFloat" is in F-299, F-308, F-310, F-311, F-313, F-323, F-324, F-151, F-168, F-345 on other subjects). C5: F-97 ["a tried one that passes joins it"].
3. Checks: C1 and C5 false today: under the one library both compile and pass, both are listed under `one` since `3a0bae976c`, and both passed at batch 36's gate (stale; pilot). C2-C3's prelude part holds (pilot). Comprehension: "an approved test line" unexplained (pilot).
4. Shape: several subjects (prelude spelling gaps; step 7). Title: two tests refused until the switch-over; false today in its scope.

### F-111, "The checker-count and distance stages read only the compiler's phases ..."

1. Claims
   - C1. The checker-count and distance stages read only the compiler's phases, so edits under the specification, documentation, tests, walk's evaluator and natives, or `explorations/` outside their folders cannot move their counts. Subject: the tools: checker-count and distance stages. Kind: property.
   - C2. Both stages run the compiled checker on the interpreter's library, not on the tests. Subject: the tools: checker-count and distance stages. Kind: property.
   - C3. The count stage runs `PhaseOrder.compilerPhaseOrder`; the distance stage its first six phases. Subject: the tools: checker-count and distance stages. Kind: detail.
   - C4. None of these phases is walk's own, and compiler code that names walk's classes does not change the checker's report. Subject: the tools: checker-count and distance stages. Kind: property.
   - C5. The library names walk's natives in strings, a glue class or a helper read through the compiled rewrite (F-298, F-299). Subject: the tools: checker-count and distance stages. Kind: property.
   - C6. Evidence read in the code, not measured; file lines. Kind: detail.
2. Overlaps: C1-C2: F-53 [the distance and the checker count], F-66 [checker-count table], F-34, F-289 [distance stage]; coordinator `batch.md:63` (`STAGE_BLIND`) builds on it (pilot). C5: F-298, F-299. Searched "WorldFlip": only F-111.
3. Checks: C3 false today: since 2026-10-24 the count stage stops after the type check, as the distance stage does; `WorldFlip.java:25`, `:42` cite moved lines (stale; pilot). C1's conclusion holds (pilot); the "cannot move" claim not measured (pilot, "could not check").
4. Shape: one subject (the stages). Title matches; C3 and C6 are a code tour.

### F-112, "The test corpora cite the specification by file and section, never by line."

1. Claims
   - C1. The test corpora cite the specification by file and section, never by line. Subject: the repository: specification citations in tests. Kind: property.
   - C2. A test names the cited section's heading, and in the library chapters the trait or method entry. Subject: the repository: specification citations in tests. Kind: property.
   - C3. A rung that renames or removes a cited section updates the citation in the same commit. Subject: the repository: specification citations in tests. Kind: choice.
   - C4. The grep over five corpora prints nothing; one bare `:400-401` stays in `IntLiteralWrapRepairR2.fss`. Kind: detail.
   - C5. Source: the one-time strip, commit `dc0eee2fe`. Kind: history.
   - C6. The skill gives the rule (`tests-writing.md`). Kind: pointer.
2. Overlaps: none in FACTS (searched "dc0eee2fe", "by line"; ".tex:" lists the entries that themselves cite by line). Skill `tests-writing.md:139`, `specification.md:62` (pilot). C3 is a worker rule (pilot: ownership fails); whether the curator decided it, no source says.
3. Checks: sound (pilot: the grep still prints nothing, also over `one_library_tests`).
4. Shape: about how the project works and not about the tree, in part; one subject. Title matches; C3 and C5 do not serve it.

### F-113, "A harness run against another build's classes must point `FORTRESS_CACHES` at that build's caches ..."

1. Claims
   - C1. A harness run against another build's classes must set `FORTRESS_CACHES` as well as `-Dfortress.caches`. Subject: the harness and the gate: caches of another build. Kind: property.
   - C2. A `.test` file's `run` step is a separate `bin/fortress run` whose class path comes from `FORTRESS_CACHES`. Subject: the harness and the gate: caches of another build. Kind: property.
   - C3. Without it the run fails "Could not load ... Resource not found". Subject: the harness and the gate: caches of another build. Kind: property.
   - C4. The run step runs no checker code, so the tree's own classes serve it. Subject: the harness and the gate: caches of another build. Kind: property.
2. Overlaps: none in FACTS (searched "FORTRESS_CACHES"). Skill `worktrees.md:71`, whole (pilot).
3. Checks: sound by the skill and `bin/run_classpath`; evidence kind unstated: the cited report section records a run with the variable set, not the failure without it (pilot). C3 not run (pilot).
4. Shape: one subject. Title matches.

### F-114, "`ant testSpecData` runs 130 of the specification's 133 extracted examples under walk ..."

1. Claims
   - C1. `ant testSpecData` runs 130 of the specification's 133 extracted examples under walk, as a gate step, and all pass. Subject: the harness and the gate: specification examples. Kind: property.
   - C2. `SpecDataJUTest` runs `basic`, `preliminaries` and `advanced`, not `library/`'s three, and `testFast` excludes it. Subject: the harness and the gate: specification examples. Kind: property.
   - C3. It builds P-124. Kind: pointer.
   - C4. Five examples write no static argument on a generic big operator with an F-bound and pass only because walk leaves it open (F-143; row 424 fixed). Subject: walk: open F-bounded parameters. Kind: property.
   - C5. The count and time are in the last gate's `summary.txt`. Kind: pointer.
2. Overlaps: C1-C2: F-170 [`ant testSpecData`, a gate step, runs both ZZ64 range examples]; P-124; skill `tests-running.md:24` (pilot). C4: F-143 [F-bound left open], F-228 [join of run-time types, F-bounded stays open]. Searched "row 424": only F-114.
3. Checks: C1-C2 false today: 135 examples, five in `library/`, since `73213e4be4`; the 130 run still holds (stale; pilot). C4 unsettled: not checked again, may pass by F-228's join now (stale; followups "Open"). P-124 says every example must pass while `library/`'s five run in no suite (followups "Open").
4. Shape: one subject (specification examples) with C4 beside it. Title: 130 of 133 pass; false today in the 133.

### F-203, "`explorations/experiment/env.sh` sets up a shell for the gate's runners ..."

1. Claims
   - C1. `env.sh` sets `FORTRESS_HOME` two folders above itself, replacing any value, so sourcing another tree's `env.sh` runs that tree's code. Subject: the tools: env.sh. Kind: property.
   - C2. It sets the JDK, `FORTRESS_THREADS=1` and `JAVA_FLAGS`, and unsets `JAVA_TOOL_OPTIONS`. Subject: the tools: env.sh. Kind: property.
   - C3. It deletes a `/tmp/fortress*rats` parser folder only if idle an hour and older than every running `java`, so it does not break a live run. Subject: the tools: env.sh. Kind: property.
   - C4. The ladder's drivers source it, each sets its own `JAVA_FLAGS` after, and step 7 gives its copies their tree's `env.sh`. Subject: the tools: env.sh. Kind: detail.
   - C5. The two stages' `run.sh` do not source it; their headers tell the caller to. Subject: the tools: checker-count and distance stages. Kind: property.
   - C6. A worker does not source it, but uses the skill's setup lines. Kind: choice.
2. Overlaps: C1-C2: F-99 [1 under `env.sh`], F-107 [`env.sh` sets 4 GB]; skill `build-and-caches.md:15-33`, `:25` (pilot). C4: F-97 [step 7]. C3: none found (searched "rats").
3. Checks: sound (pilot: `env.sh:4-8`, `:12-20`, the drivers' lines). C3's live-run claim not run (pilot).
4. Shape: one subject (env.sh), with a worker rule. Title matches; C4 and C6 are detail and a rule.

### F-234, "A Fortress command that a worker types itself ... starts a fresh JVM ..."

1. Claims
   - C1. A Fortress command that a worker types starts a fresh JVM, whose start costs too little to pay for a resident compiler. Subject: the tools: fresh JVM cost. Kind: property.
   - C2. The suites start one JVM per test class and per `testSystem` shard, and run each test file inside it; only a compiled run step and a `.sh` test start another process. Subject: the harness and the gate: JVMs of the suites. Kind: property.
   - C3. Over 267 worker transcripts, one-off commands took 17.5 % of shell wall time, suites, builds and stages 47.8 %. Kind: detail.
   - C4. Over the whole running time one-off commands took 6.4 % (11.6 % at most), and removing JVM start-up would save at most 1.8 % (P-150). Subject: the tools: fresh JVM cost. Kind: property.
   - C5. What runs inside the suites and stages was not measured. Subject: the tools: fresh JVM cost. Kind: plan.
2. Overlaps: none in FACTS (searched "resident compiler", "P-150", "fresh JVM"); P-150 points here (pilot).
3. Checks: sound, measured, bounded to one measurement (pilot). Ownership fails: two subjects (pilot).
4. Shape: several subjects (fresh JVM cost; JVMs of the suites); about how the project works as much as the tree. Title matches C1.

### F-283, "The 52 programs of the team's `DemoTests` reach their end under walk."

1. Claims
   - C1. The 52 programs of `DemoTests` each exit 0 under walk and print no "fail", within 600 s on an empty input. Subject: walk: team demos. Kind: property.
   - C2. `wordcount2` runs from the tree's root and `tennisRanking` gets three files. Kind: detail.
   - C3. The demos run in no suite, so a batch that changes walk or its library runs them again (P-79). Subject: the harness and the gate: outside the gate. Kind: pointer.
   - C4. `Generator2Demo`'s random arrays can overflow in `PROD`, and one such stop is not a regression (row 986). Subject: walk: team demos. Kind: defect (row 986).
   - C5. The compiled checker still refuses `trips.fss` (row 817). Subject: the checker: team demos. Kind: defect (row 817).
   - C6. No gated test; the driver's output on `4445d848b` is 'demos: 52 run, 52 reached their end'. Kind: detail.
2. Overlaps: none in FACTS (searched "DemoTests", "row 986", "row 817"); P-79; skill `tests-running.md:58-63` (pilot).
3. Checks: sound (pilot: rows 986 and 817 NEGATIVE-BOUNDED agree; batch 36's gather printed the same line).
4. Shape: one subject (team demos) with a compiled defect beside it. Title matches.

### F-295, "The distance stage counts each api's own errors and crashes ..."

1. Claims
   - C1. The distance stage counts each api's own errors and crashes, so an error in an api that only a later target checks cannot hide. Subject: the tools: checker-count and distance stages. Kind: property.
   - C2. `table.py` turns `#total` into `none:` for an api with `errors=` above 0 and no `@@SC` line of its own. Subject: the tools: checker-count and distance stages. Kind: detail.
   - C3. It turns an `@@TC API-CRASH` line into a `#crash` row of kind `api`. Subject: the tools: checker-count and distance stages. Kind: property.
   - C4. It does not read the `@@TC COMPONENT-CRASH` lines of `shadow-patch.py`. Subject: the tools: checker-count and distance stages. Kind: defect (no row).
   - C5. Test: `test_classify.py`, `Readings`. Kind: tests.
2. Overlaps: C1, C3: F-53 [distance counts], F-54 [`table.py`, '#crash none']. Searched "@@TC": only F-295. C4: none found (searched "COMPONENT-CRASH").
3. Checks: sound (pilot: read and tested; `table.py` holds no `COMPONENT-CRASH`). Comprehension fails: `@@TC`, `@@SC` defined nowhere (pilot).
4. Shape: one subject. Title matches; C2 is detail.

### F-354, "Two compiles of one source by different builds of the compiler need not give the same bytes ..."

1. Claims
   - C1. Two compiles of one source by different builds of the compiler need not give the same bytes, so a jar comparison cannot show a change left the code as it was. Subject: the code generator: order of emitted code. Kind: property.
   - C2. The code generator orders a class's methods and a dispatcher's tests by the JVM's identity hashes (row 996). Subject: the code generator: order of emitted code. Kind: defect (row 996).
   - C3. Two cold compiles of the prelude by one build give equal classes, 590 of 590, as the default identity hash repeats. Subject: the code generator: order of emitted code. Kind: property.
   - C4. Under another hash mode 18 of `CompilerBuiltin`'s 312 classes differ. Kind: detail.
   - C5. So the tests, not the bytes, show that a compiler change left the prelude undisturbed, and an order-dependent result can come and go between builds. Subject: the code generator: order of emitted code. Kind: property.
   - C6. Measured once on `832f7d0d91`'s code. Kind: detail.
2. Overlaps: C2: F-232 [identity hashes of the syntax tree and `DeclaredFunction`s], F-408 [the checker takes declarations in the order of their places]. Searched "row 996": only F-354.
3. Checks: C3 beyond its support: the source shows it for the base build's code, and shows this tree's `CompilerBuiltin` compiled twice with 16 of 312 differing (stale; pilot).
4. Shape: one subject. Title matches; C3 is stated wider than its evidence.

### F-383, "Walk's harness counts a static error that a phase raises before the run ... as a refusal at load ..."

1. Claims
   - C1. Walk's harness counts a static error raised by a phase before the run, such as the disambiguator's, as a refusal at load, so a `load_` key test passes on it. Subject: the harness and the gate: refusals at load. Kind: property.
   - C2. Source: `InterpreterTest.thrownAtLoad`; test `TypecaseUndefinedArmWalk.test`. Kind: tests.
   - C3. A compiled refusal test is still `XXX`-named: a plain compile test is red whenever the compile reports errors. Subject: the harness and the gate: XXX tests. Kind: property.
2. Overlaps: C1: F-102 [`load_exception_contains`, refusal at load], F-239, F-375 ["refusal at load", other subjects]. C3: F-103 [compile-stage failure needs one `XXX` compile test]. Skill `tests-writing.md:45`, `:107` (pilot).
3. Checks: sound (pilot: `FileTests.java:875-885`; the test's key). Ownership fails: C3 is F-103's subject (pilot).
4. Shape: several subjects (refusals at load; XXX tests). Title matches C1.

### F-404, "`explorations/coordinator/tools/seed-worktree.sh` copies `ProjectFortress/build` and ... `build-one` ..."

1. Claims
   - C1. `seed-worktree.sh` copies `ProjectFortress/build` and, where present, `build-one` with `caches-one`, so a seeded worktree's first `ant` target keeps the seeded caches. Subject: the tools: seed-worktree. Kind: property.
   - C2. The implementation's stamp covers `build-one`. Subject: the tools: build and caches. Kind: property.
   - C3. Without the copy, the first target rebuilds the Scala and empties both caches, and a compiled run under the one library stops with a `java.lang.Error`. Kind: history.
   - C4. No test; in such a worktree the first `ant compileAll` prints '... left them? yes' (`88f286dc30`). Kind: detail.
2. Overlaps: C1-C2: F-100 [`compileAll` keeps or deletes the caches by the stamp], F-381 [`caches-one`], F-396 [`build-one`]. Skill `worktrees.md:36` (pilot). Followups: `BOOT.md:48` and `seed-worktree.sh:20` cite F-404.
3. Checks: sound (pilot: `seed-worktree.sh`, `build.xml` lines agree).
4. Shape: one subject (seed-worktree), with history. Title matches.

## Subject labels used, with their entries

- the harness and the gate: step 7: F-97, F-109
- the harness and the gate: check keys: F-98, F-104
- the harness and the gate: threads and heaps: F-99, F-107
- the harness and the gate: XXX tests: F-102, F-103, F-104, F-108, F-383
- the harness and the gate: test imports: F-102
- the harness and the gate: refusals at load: F-383
- the harness and the gate: shards: F-105
- the harness and the gate: caches of another build: F-113
- the harness and the gate: specification examples: F-114
- the harness and the gate: JVMs of the suites: F-234
- the harness and the gate: outside the gate: F-283
- the harness and the gate: atomic runs: (F-25, chunk `exec`)
- the tools: build and caches: F-100, F-404 (and F-17, chunk `exec`)
- the tools: harness-one cache: F-101
- the tools: checker-count and distance stages: F-111, F-203, F-295
- the tools: env.sh: F-203
- the tools: fresh JVM cost: F-234
- the tools: seed-worktree: F-404
- the code generator: native wrappers: F-106
- the code generator: walls: F-104
- the code generator: prelude spelling gaps: F-109
- the code generator: order of emitted code: F-354
- the checker: microGPT on the prelude: F-97
- the checker: team demos: F-283
- walk: ambiguity message order: F-108
- walk: open F-bounded parameters: F-114
- walk: team demos: F-283
- the repository: specification citations in tests: F-112

## Entries that overlap

- `XXX` tests and refusals: F-102, F-103, F-104, F-383 (F-383's last sentence is F-103's rule; F-102 and F-383 both state the `load_` key's use).
- Threads and heaps: F-99, F-107, F-203 (F-99 and F-107 both give testFast's 4 GB; F-203 and F-99 the count under `env.sh`).
- Build and caches: F-100, F-404, F-17, F-381 (stamp rule, `caches-one`, five jars).
- Step 7: F-97, F-109, F-203.
- The stages: F-111, F-295, F-53, F-54, F-66, F-289.
- Specification examples and open parameters: F-114, F-170, F-143, F-228.
- Native wrappers: F-106, F-309, F-301, F-298.
- Identity hashes and order: F-354, F-232, F-408, F-108 (row 430 in F-232 and F-108's row).
- Nearly every entry of this chunk is repeated by a skill part (pilot: 19 of 24); those are listed per entry above and are not FACTS overlaps.

## Entries that the search could not settle

- F-114's five examples that pass by walk's open parameter: may pass by F-228's join now; not checked again. P-124 against the five `library/` examples that run in no suite.
- F-112's worker rule (C3): no source says whether the curator decided it, so its kind "choice" is not settled.
- F-97's microGPT sentence: whether it belongs here, beside F-58, or in an entry on the model program, no source settles (followups: "F-97 would sit better beside F-58").
- F-98's misspelt key, F-17-like defects without a row (F-98 C3, F-295 C4): the search found no row and no other entry.
- The pilot did not run any claim that needs a build or a test (its "What I could not check"); those claims are sound only by reading.
