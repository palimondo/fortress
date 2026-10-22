<!-- The FACTS clarity pass, chunk f10, 2026-10-22: F-106, F-107, F-108, F-111, F-112, F-203 and F-234 rewritten from the chunk's assessment, with each entry's changes of meaning, the source of each sentence, and the points for the coordinator. -->

# FACTS chunk f10: the rewrite

The base is `main` at `a898e1baf`, as in `assessment.md`. The assessment keeps F-105, F-109, F-113, F-114 and F-117, so this file holds the other seven, all "reword". I read each claim again in the code or the cited report before I wrote it. Concepts that the entries use and that every worker needs are in `concepts.md`.

Four titles open with words that tracked files quote to find the entry, among them the batch brief template `coordinator/CLIMB-BATCH-N.md`, `climb-batch-workflow.md:230`, `climb-batch-workflow.js:453` and the `fortress-repo` skill's `sources.md`. Those openings stay word for word: "Three heaps run the interpreter", "The interpreter's overload-ambiguity message names its two declarations", "The checker-count and distance stages read only the compiler's phases", "The test corpora cite the specification by file and section, never by line".

## F-106

> - F-106 **The native-wrapper generator wraps every method of a class that `import java` names, private ones too, but skips constructors, static initializers and every method with a `byte`, a `short` or an array in its parameters or result. A wrapped method with a type that has no Fortress counterpart makes the generator refuse the whole import.** The generator writes the compiled path's Fortress wrappers for such a class. So a helper in `com.sun.fortress.nativeHelpers`, the Java package that the compiled path's library imports, needs a signature that maps to Fortress, even when it is private, unless the generator skips it. Gap-ledger row 368 records the refusal. Evidence: observed when a private helper with a `Class<?>` parameter broke the rebuild (`compile-ladder/rung-default-rendering/REPORT.md`, "The repair round"); the skips read in `FortressMethodAdapter.visitMethod` and `SignatureParser.unsayable`.

Meaning: one correction, from the assessment. The old title said "every method"; the generator skips `<init>`, `<clinit>` and each method whose descriptor holds `B`, `S` or `[`, in a parameter or in the result (`FortressMethodAdapter.java:215-225`, `SignatureParser.java:45-85`, read again). So the consequence now holds only for a helper that is not skipped. Row 368 and the report's "The repair round" state the same exception.

Sources:
- Title: `FortressMethodAdapter.java:215-225` (the skips) and `:250-258` (`toImplFFFF` throws "No Fortress type (yet) for foreign Java type descriptor"); row 368.
- "The generator writes...": the class's role, read in `compiler/nativeInterface/`; added so that a reader knows which path it serves.
- "So a helper...": the old consequence, with the exception. The package is the one that `Library/CompilerLibrary.fss:14-20` and `LibraryBuiltin/CompilerBuiltin.fss:13` import.
- Evidence: the report's "The repair round"; row 368 names `private static boolean hasOwnToString(Class<?> c)` in `nativeHelpers/stringOps.java`.

## F-107

> - F-107 **Three heaps run the interpreter, and a gated test can pass at two of them and die at the third; a compiled test's run step gets the largest.** `bin/fortress` gives the JVM 256 MB unless `JAVA_FLAGS` is set (gap-ledger row 67: realistic programs exhaust it). The harness runs each walk test inside its JUnit JVM, at 768 MB (`junitMem` in `build.xml`). `env.sh` sets `JAVA_FLAGS` to 4 GB with 64 MB stacks. `testFast` gives the same flags to the `bin/fortress` that runs a compiled test's run step (F-99 holds why). Measure a claim about a failure near a memory limit at 256 MB. Evidence: observed: before its repair, `IntSemanticsRungI.fss` passed at 4 GB and at 768 MB and died with `OutOfMemoryError` at 256 MB (`compile-ladder/rung-int-semantics-walk/REPORT.md` sections 3 and 4.4).

Meaning: unchanged. The title now covers the compiled run step that the body already named. The 768 MB is said as the JUnit JVM's heap, which both suites use (`build.xml:132`; `maxmemory="${junitMem}"` in `fastTrack`, `:1179`, and `systemShard`, `:1424`), not as `testSystem`'s alone. The test that shows the claim is named, from the report.

Sources:
- `bin/fortress:28-29` (`-Xmx256m -Xss32m` when `JAVA_FLAGS` is unset); row 67's text.
- `build.xml:132`, `:1179`, `:1424`.
- `explorations/experiment/env.sh` (`-Xmx4g -Xss64m`); `fastTrack`'s `JAVA_FLAGS` env, `build.xml:1187-1188`; F-99.
- The rule to measure at 256 MB, and the evidence: the report's sections 3 and 4.4 (the `:93` shift died at the launcher's heap; every run at 4 GB or 768 MB passed).

## F-108

> - F-108 **The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program.** Under walk with the JVM's default flags, the order varies from run to run. With three flags set (`-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1`), the order is fixed for a given library, and a library edit can flip it. The runs did not test the three flags one at a time. The harness reads only that the `XXX` test fails, not the order. If an output comparison sees the order move, it cites gap-ledger row 430, which records this order. The move does not hold a batch (the `coordinator` skill's `references/batch.md`, "Reserved points and repairs"). Evidence: observed: `compile-ladder/rung-wrap-operators/JUDGE.md` sections 3 to 5.

Meaning: one correction, from the assessment. "On one core" is replaced by the three flags. The judge's section 5 says that the default and the pinned runs differ in three flags at once, and corrects the claim that the order varies with the thread count. The consolidation's text of 2026-10-13 19:03Z listed the three flags; a later cut reduced them to "one core". The sentence "The runs did not test the three flags one at a time" says that limit in plain words; it adds no claim.

Sources:
- Default flags: `JUDGE.md` section 3 (11 of 16 runs in one order).
- The three flags and the library edit that flips the order: section 5.
- The harness: section 4.
- The routing: `batch.md`, "Reserved points and repairs", second bullet: an output that the base already varies, with the verdict unchanged, is a ledger row.

For the coordinator: gap-ledger row 430 says "one core fixes it", and the `fortress-repo` skill's `references/interpreter.md:57` says "On one core, the order is fixed". Both carry the error that the judge corrected. They are outside this folder.

## F-111

> - F-111 **The checker-count and distance stages read only the compiler's phases, so an edit under `Specification/`, `Documentation/`, `explorations/`, the test corpora, or walk's evaluator and natives cannot move their counts.** Both stages call `Shell.compilerPhases` with `PhaseOrder.compilerPhaseOrder` on the interpreter's library, not on the tests. No phase in that list belongs to walk. The library names walk's natives only in strings, which only walk resolves. Evidence: read in the code, not measured: `explorations/coordinator/tools/checker-count/WorldFlip.java:42`, `explorations/coordinator/tools/distance/DistanceMulti.java:64` and `compiler/phases/PhaseOrder.java:137-147`.

Meaning: one claim cut, as the assessment proposes. The sentence "Outside `interpreter/`, only walk's own commands, the `ENVGEN` phase that only they run, exception field types and unused code name walk's evaluator" is not true as it stands: no phase order runs `ENVGEN` (walk's own order holds it as a comment, `PhaseOrder.java:133-134`), and the list leaves out the test harness and `repository/CacheBasedRepository.java:148`. The title's claim does not rest on it, so the entry keeps "No phase in that list belongs to walk". "The texts" is replaced by the three paths that `climb-batch-workflow.md:230` gives. "Reads no test, text or record" becomes "on the interpreter's library, not on the tests", from the headers of both `run.sh` scripts.

Sources:
- Title: the old title, with "the texts" spelled out.
- `WorldFlip.java:25` and `:42` (default order `compilerPhaseOrder`); `DistanceMulti.java:64`; `PhaseOrder.java:137-147`.
- The inputs: `checker-count/run.sh` and `distance/run.sh`, their header lines 1 to 4.
- Natives: the old entry's sentence; the history's text of 2026-10-13 19:03Z says "the library's strings, which walk resolves".
- The kind of evidence: the history block at FACTS-history.md:1771 holds the code reading with its lines.

## F-112

> - F-112 **The test corpora cite the specification by file and section, never by line.** A test names the heading of the section that it cites. In the library chapters, it names the trait or method entry too. A rung that renames or removes a cited section updates the citation in the same commit. One citation by line is left: `library_tests/IntLiteralArithRung7.fss:19` cites `Specification/library/apis/CompilerBuiltin.tex`, a generated file that is not in the tree (F-162: such a listing is not an independent standard). Source: the one-time strip of `.tex` line numbers at `dc0eee2fe` (`coordinator/PLAN-history.md`, "The one-time strip of `.tex` line numbers ..."). The `fortress-repo` skill gives the rule to workers (`tests-writing.md`, "Names, comments, citations").

Meaning: unchanged. The source pointer is corrected: `PLAN.md:402` now holds an item of another review list. The strip's record is in PLAN-history (823 citations in 139 files, one left). A grep for `\.tex:[0-9]+` over the six test folders today finds only `IntLiteralArithRung7.fss:19`.

Sources:
- Title and the two forms: `tests-writing.md:135`; the history's text of 2026-10-13 19:03Z ("the trait or method entry").
- The rename rule: the same history text.
- The citation left: `git grep -nE '\.tex:[0-9]+'` over `ProjectFortress/{tests,compiler_tests,library_tests,syntax_abstraction_tests,static_tests,not_passing_yet}`; F-162.
- Source: `PLAN-history.md:391`.

## F-203

> - F-203 **`explorations/experiment/env.sh` sets up a shell for the gate's runners, and takes `FORTRESS_HOME` from its own place in the tree.** It sets the JDK, `FORTRESS_THREADS=1` and `JAVA_FLAGS`, unsets `JAVA_TOOL_OPTIONS`, and removes the parser folders in `/tmp` that no live run uses (F-101 holds the removal's rule). The ladder regression's scripts source it: `compile-ladder/run-ladder.sh` and its copy in `baseline-2026-09-19/`, `repair-r1-atomic-static/run-subset.sh` and `baseline-2026-09-19/microgpt-phase.sh`. `experiment/setup.sh` sources it too. The count stage's and the distance stage's `run.sh` do not: their headers tell the caller to source it first. A worker sets up each call by the `fortress-repo` skill's lines instead (`build-and-caches.md`, "Setting up each call"). Evidence: read in the scripts.

Meaning: one correction, from the assessment. The old text said that the count and distance runners source `env.sh`; they only ask their caller to (`checker-count/run.sh:11`, `distance/run.sh:11`), and the gate's role in `climb-batch-workflow.js:1105-1107` tells the agent to read the header and run the script. The list of scripts that do source it now holds all of them that `git grep 'experiment/env.sh'` finds: two `run-ladder.sh` files and `experiment/setup.sh` were missing. The title stays: `env.sh` is still the setup that those runners use.

Sources:
- `env.sh:1-8` (JDK, `FORTRESS_HOME` two levels up, `JAVA_TOOL_OPTIONS`, `FORTRESS_THREADS`, `JAVA_FLAGS`) and its removal block; F-101.
- `source` lines: `compile-ladder/run-ladder.sh:20`, `baseline-2026-09-19/run-ladder.sh:22`, `repair-r1-atomic-static/run-subset.sh:24`, `baseline-2026-09-19/microgpt-phase.sh:5`, `experiment/setup.sh:33`.
- The stages' headers: `run.sh:11` in each.
- The worker's lines: `build-and-caches.md`, "Setting up each call".

Question for the curator: `microgpt-phase.sh:5` sources the main tree's `env.sh` by its absolute path. So a copy of that script run in a worktree would set `FORTRESS_HOME` to the main tree. The assessment read this from the two scripts; nobody ran it. Should the entry state it, or should a ledger row hold it? I left it out.

## F-234

> - F-234 **A Fortress command that a worker runs on its own starts a fresh JVM, and that start costs too little to pay for a resident compiler.** A resident compiler is a background JVM that serves Fortress commands, as Scala 2's `fsc` did. The suites already run each suite in one JVM, and the harness runs each test inside it. Only a compiled test's run step and a `.sh` test, such as `tests/concurrentPrinting.sh`, start another process. In one measurement over 267 worker transcripts, such one-off commands took 17.5 % of the wall time of the workers' shell commands, and the suites, builds and stages 47.8 %. The one-off commands took at most 6.4 % of the workers' whole running time, and their start-up at most 1.8 % (P-150: no resident compiler is built). Detail: `coordinator/process-engineering/fresh-jvm-commands.md`, "Summary" and "What a resident compiler could save, at most".

Meaning: two corrections, from the assessment. The `.sh` test is named as the second process that a suite starts (`FileTests.ShellTest`, `:675-692`; `concurrentPrinting.sh:18` calls `bin/fortress run`). The two shares are now compared on one denominator, the wall time of the Bash calls: 17.5 % against 47.8 %, the report's 2.7 times. The 6.4 % keeps the report's "at most".

Sources:
- The definition of a resident compiler: P-150's own words.
- The harness: `FileTests.java:762` (`Shell.subMain` in the same JVM).
- The figures: the report's "Summary", bullets 1 to 3, and "What a resident compiler could save, at most". The report calls the time "Bash wall time" and "lifetime"; the entry says "wall time of the workers' shell commands" and "whole running time".
