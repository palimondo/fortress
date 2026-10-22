# Cold read: facts f10 (F-106, F-107, F-108, F-111, F-112, F-203, F-234)

Read with `CLAUDE.md`, the `fortress-repo` skill's `SKILL.md`, and these references: `compiler.md` ("Natives"), `build-and-caches.md` ("Setting up each call", the cache list), `interpreter.md` (heaps, the ambiguity message, walk's natives), `tests-running.md` (the suites' JVMs), `tests-writing.md` (`XXX`, "Names, comments, citations"), `gate.md` ("The ladder regression", "Comparing with an earlier run"), `specification.md` (the generated api listings, "Citing it"). I did not read the record, git, the coordinator skill or any report.

## F-106

**Established:** The tool that makes Fortress wrappers for Java classes brought in with `import java` goes over every method of each named class, private methods included. It leaves out constructors, static initializers, and any method whose parameter or result types include Java `byte`, `short` or an array type. If a method that it does not leave out uses a type with no Fortress counterpart, the whole `import java` fails, not just that method.

**Conditions:** It applies to the compiled path's wrappers (the generator writes them for that path, and caches them in `nativewrapper_cache/`, per `build-and-caches.md`). It applies to every method the generator wraps, whatever its visibility. Skipped methods are exempt: their types do not matter, but they also get no wrapper.

**Consequence:** Every method of a class in `com.sun.fortress.nativeHelpers` (the Java package that the compiled path's library imports) needs a signature that maps to Fortress, private helpers too. The only exceptions are the skipped kinds. A private helper that takes, say, `Class<?>` breaks the import, and with it the rebuild. Gap-ledger row 368 holds the defect. This adds the skip list to what `compiler.md`, "Natives", says.

**Evidence:** Observed: a private helper with a `Class<?>` parameter broke the rebuild (`compile-ladder/rung-default-rendering/REPORT.md`, "The repair round"). The skips were read in the code: `FortressMethodAdapter.visitMethod` and `SignatureParser.unsayable`.

**Could not resolve:**
- Which Java types do have a Fortress counterpart is not said (for example `char`, `float`, `Object`, `String`, or boxed `Byte`/`Short`). A worker cannot tell from the entry whether a given signature is safe. The wording is not unclear, but the entry leaves this out.
- "every method": `compiler.md` says `import java` binds *static* methods. Whether instance methods are wrapped too, and so must also map, can be read two ways. This is unclear wording.
- "an array": I take it to mean a Java array type (`int[]`), not a Fortress array. The context makes this likely, but it is not stated.

## F-107

**Established:** A Fortress program can run at three heap sizes: 256 MB (`bin/fortress` with `JAVA_FLAGS` unset), 768 MB (each walk test in the harness's JUnit JVM, set by `junitMem` in `build.xml`), and 4 GB with 64 MB stacks (`env.sh`'s `JAVA_FLAGS`, the same as the skill's setup lines). `testFast` gives the 4 GB flags to the `bin/fortress` that runs a compiled test's run step. So a gated test can pass at two of these sizes and still run out of memory at the third.

**Conditions:** It applies whenever a run is near a memory limit. 256 MB applies only when `JAVA_FLAGS` is unset. Gap-ledger row 67 says realistic programs use up that heap.

**Consequence:** Measure any claim that a run fails near a memory limit at 256 MB (`interpreter.md` gives the `JAVA_FLAGS` to use). Passing in the harness or under the worker's 4 GB setup proves nothing about 256 MB.

**Evidence:** Observed: before its repair, `IntSemanticsRungI.fss` passed at 4 GB and at 768 MB, and died with `OutOfMemoryError` at 256 MB (`compile-ladder/rung-int-semantics-walk/REPORT.md`, sections 3 and 4.4).

**Could not resolve:**
- "Three heaps run the interpreter": the third heap is given for a compiled test's run step, and that runs `bin/fortress run`, not walk. So "the interpreter" means either walk only (and the compiled run step is a side remark) or any JVM that `bin/fortress` starts. Unclear wording. It does not change what a worker does.
- "(F-99 holds why)": I could not read why the run step gets 4 GB. The entry stands without it.

## F-108

**Established:** When walk reports that a call is ambiguous between two overloaded declarations, the order in which the message names them does not come from the program. With the JVM's default settings, it changes from run to run. With `-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1` all set, it stays the same for a given library, but an edit of the library can reverse it. The runs did not find which of the three flags does this.

**Conditions:** Walk only. The fixed order holds only with all three flags together, and only until the library changes.

**Consequence:** Do not pin this order, and do not rely on it. The harness only checks that the `XXX` test fails, so the tests are not affected. If an output comparison shows the order changed, the comparison's write-up cites gap-ledger row 430 (which records this order) and treats the change as known. The change does not hold up a batch (the `coordinator` skill's `references/batch.md`, "Reserved points and repairs").

**Evidence:** Observed: `compile-ladder/rung-wrap-operators/JUDGE.md`, sections 3 to 5.

**Could not resolve:**
- "does not hold a batch": I read it as "does not block the batch or turn it red". The pointer goes to the coordinator skill, which a worker's context does not include, so I could not check it. Unclear wording, and the reference sits outside my context.
- "it cites gap-ledger row 430": "it" may mean the comparison's report or the worker. Either reading gives the same action. Minor.
- "the JVM's default flags": I take this as "without the three flags", not "with `JAVA_FLAGS` unset" (the 256 MB default of F-107). Both readings are possible. Unclear wording, minor.
- `interpreter.md` says that "on one core" the order is fixed. The entry says only that the three flags together fix it, and that their effects were not separated. The two agree, but the skill's "one core" claims more than the entry supports.

## F-111

**Established:** The count stage and the distance stage run only the compiler's phase list (`Shell.compilerPhases` with `PhaseOrder.compilerPhaseOrder`), and only over the interpreter's library, never the tests. None of those phases is walk's own. The library refers to walk's natives only in strings (`builtinPrimitive("...")`), and only walk resolves those. So edits under `Specification/`, `Documentation/`, `explorations/`, the test corpora, or walk's evaluator and natives cannot change either stage's counts.

**Conditions:** This was read in the code, not measured. It covers only the listed places. An edit of a shared phase, the checker, or the library can still change the counts.

**Consequence:** After an edit only in the listed places, a worker can conclude that the checker count and the distance are unchanged, and need not run those stages again to show it.

**Evidence:** Read in the code: `explorations/coordinator/tools/checker-count/WorldFlip.java:42`, `explorations/coordinator/tools/distance/DistanceMulti.java:64`, `compiler/phases/PhaseOrder.java:137-147`. Not measured.

**Could not resolve:**
- "an edit under ... `explorations/` ... cannot move their counts": both stages' own code (`WorldFlip.java`, `DistanceMulti.java`, the `run.sh` scripts) is under `explorations/coordinator/tools/`, and editing it clearly can change the counts. As worded, the entry claims too much. I take it to mean "outside the stages' own tools", but the entry does not say so. Unclear wording.
- "No phase in that list belongs to walk": `SKILL.md` says walk and the compiled path share the parse-to-overload phases, so in one sense walk does run phases in the list. I read it as "no phase in the list is walk-only (walk's evaluator is not a phase)". Two readings. Unclear wording.
- "walk's evaluator and natives": I take these as `interpreter/evaluator/` and `interpreter/glue/prim/`. The entry does not say whether the rest of `interpreter/` (for example `env/`) is covered too. This sets a limit the entry does not spell out.

## F-112

**Established:** Tests cite the specification by file and section heading, not by line number. In the library chapters they also name the trait or method entry. When a rung renames or removes a cited section, it updates the citation in the same commit. One line citation is still there: `library_tests/IntLiteralArithRung7.fss:19` cites `Specification/library/apis/CompilerBuiltin.tex`, which is generated and not in the tree. A generated api listing only shows the library itself, so it is no independent authority (F-162; `specification.md` says the same and says to cite the `.fsi` instead).

**Conditions:** It applies to the test corpora. The one exception is named.

**Consequence:** When writing a test, cite by file and section or entry, never by line (`tests-writing.md`, "Names, comments, citations"). A rung that renames or removes a section fixes the tests that cite it, in the same commit. Do not copy the one remaining line citation as a model.

**Evidence:** Source: the one-time strip of `.tex` line numbers at commit `dc0eee2fe` (`coordinator/PLAN-history.md`, "The one-time strip of `.tex` line numbers ..."). The rule for workers is in the skill.

**Could not resolve:**
- "never by line" in the bold claim, then "One citation by line is left": the headline and the body disagree. I take "never" as the rule, with one known exception. Unclear wording.
- The entry does not say what should happen to the remaining citation: leave it (because the file it cites is not in the tree), point it at the `.fsi` (as `specification.md` advises), or fix it whenever the test is touched. Unclear what a worker should do.
- "such a listing is not an independent standard": I understood this only from `specification.md` line 13. Without that, "independent standard" is vague. This is mostly settled by the skill.

## F-203

**Established:** `explorations/experiment/env.sh` prepares a shell for the scripts that run gate stages. It sets `FORTRESS_HOME` from where the file itself sits in the tree. It also sets the JDK, `FORTRESS_THREADS=1` and `JAVA_FLAGS`, unsets `JAVA_TOOL_OPTIONS`, and deletes parser folders in `/tmp` that no running run is using. These ladder-regression scripts source it: `compile-ladder/run-ladder.sh` and its copy in `baseline-2026-09-19/`, `repair-r1-atomic-static/run-subset.sh`, and `baseline-2026-09-19/microgpt-phase.sh`. So does `experiment/setup.sh`. The count stage's and distance stage's `run.sh` scripts do not; their headers ask the caller to source it first.

**Conditions:** Read in the scripts. The rule for which `/tmp` folders get deleted is in F-101, which I did not read. The skill's setup lines match `env.sh` except that they use the tree's `tmp/` and do not delete anything (`build-and-caches.md`).

**Consequence:** A worker does not source `env.sh`. Before each call, including before the count or distance stage's `run.sh`, it runs the skill's setup lines, which do the same job.

**Evidence:** Read in the scripts.

**Could not resolve:**
- "takes `FORTRESS_HOME` from its own place in the tree": the entry draws no conclusion from this. I guess it means that sourcing a tree's `env.sh` points `FORTRESS_HOME` at that tree, replacing any value already set, so a script that sources the main checkout's `env.sh` by absolute path runs the main checkout's code even from a worktree. The gate's `sed` of `/home/user/fortress` into `$PWD` hints at this. The entry does not say whether it replaces a value already set, or what a worker should watch for. Unclear what follows from it.
- "instead": instead of following the stage headers' advice to source `env.sh`. Whether this holds only for those two stages or for every script is open. The ladder scripts source `env.sh` themselves, and the entry does not say whether that resets a worker's `TMPDIR` and `JAVA_FLAGS` (which point at the tree's `tmp/`) back to `/tmp`. Unclear wording, and a limit left out.
- "the gate's runners": I take this as the scripts that run the gate's stages. Minor.

## F-234

**Established:** Each Fortress command that a worker runs by hand, outside a suite, starts a new JVM. That start-up costs too little to justify a resident compiler: a JVM kept running in the background to serve Fortress commands, like Scala 2's `fsc`. Inside the suites, the harness runs each test in the suite's own JVM. Only a compiled test's run step and a `.sh` test (such as `tests/concurrentPrinting.sh`) start another process. Measured over 267 worker transcripts: hand-run commands took 17.5% of the wall time of workers' shell commands, and suites, builds and stages took 47.8%. Hand-run commands were at most 6.4% of workers' total running time, and their JVM start-up at most 1.8%.

**Conditions:** These are figures from one measurement over those 267 transcripts. The 6.4% and 1.8% are upper bounds.

**Consequence:** Do not build or propose a resident compiler to save start-up time. P-150 records the curator's decision not to build one. Speed work should go into the suites, builds and stages, which take most of the time.

**Evidence:** Measured: `coordinator/process-engineering/fresh-jvm-commands.md`, "Summary" and "What a resident compiler could save, at most".

**Could not resolve:**
- "The suites already run each suite in one JVM": `tests-running.md` describes `testSystem` running in four shards, results per track and shard, and "each JVM" keeping its own caches. That reads as several JVMs per suite. So either "one JVM" means one per shard, or the entry and the skill disagree. Unclear wording, possibly a conflict with the skill.
- "a Fortress command that a worker runs on its own": "on its own" could mean "by itself, outside a suite" or "on the worker's own initiative". From context I take the first. Minor.
- The headline is a cost judgment ("costs too little to pay for"). The decision itself is in P-150, which the entry only cites in parentheses. The fact holds even without the position.
