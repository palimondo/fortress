<!-- The FACTS clarity pass, chunk f10, 2026-10-22, after its fix round: F-106, F-107, F-108, F-111, F-112, F-203 and F-234 rewritten from the chunk's assessment, then fixed from the cold read and the check, with each entry's changes of meaning, the source of each sentence, and the points for the coordinator. -->

# FACTS chunk f10: the rewrite

The base is `main` at `a898e1baf`, as in `assessment.md`; the check read at `772a5a2af`, where FACTS, the ledger and the skill are the same. The assessment keeps F-105, F-109, F-113, F-114 and F-117, so this file holds the other seven, all "reword". I read each claim again in the code or the cited report before I wrote it. Concepts that the entries use and that every worker needs are in `concepts.md`.

The fix round followed `check.md` and `cold-read.md`:
- F-106: the rule limited to a class that some `import java` names, with `systemHelper` as the class outside it; "static or instance" and "Java" array said.
- F-107: the title's clause on the compiled run step removed, since `bin/fortress run` goes through `bin/run` (1536 MB); the compiled heaps said apart; row 67's "graphs" kept narrow.
- F-108: what the three flags show said plainly; the condition "with the test's verdict unchanged" restored; "hold a batch" said as "stop the batch".
- F-111: the distance stage's phase list corrected (the first six of the compiler's list); `explorations/` limited to outside the stages' own folders; walk's folders named; "belongs to walk" said plainly.
- F-112: the remaining citation said as a comment left as it was, with its lines.
- F-203: the ladder drivers said apart from the two that the gate runs; their own `JAVA_FLAGS`; what `FORTRESS_HOME` from its own place means; `microgpt-phase.sh`'s absolute path, which the gate rewrites.
- F-234: "at most 6.4 %" corrected to the measured 6.4 %, with the report's generous 11.6 %; "each suite in one JVM" corrected; the unmeasured inside of the suites and stages stated; the title says which commands.

## Points for the coordinator

- **Four titles keep the openings that tracked files quote:** "Three heaps run the interpreter", "The interpreter's overload-ambiguity message names its two declarations", "The checker-count and distance stages read only the compiler's phases", "The test corpora cite the specification by file and section, never by line". The fix round brought F-107's title back to its quoted opening and removed the clause the first round added.
- **Two sources are wrong, as the check found.** The assessment's F-107 note says `bin/fortress run` starts at 256 MB; it starts at `bin/run`'s 1536 MB (`bin/fortress:16-18`, `bin/run:33-34`). The assessment's F-234 note says the report gives 6.4 % as an upper bound; it gives it as the measured share.
- **The skill carries three errors that these entries fix.** `fortress-repo`'s `references/interpreter.md:57` says "On one core, the order is fixed" (F-108), as does gap-ledger row 430. `references/compiler.md:62` says the generator "wraps every method of a class that it is given", with no skips (F-106).
- **`STAGE_BLIND` has F-111's old hole.** `climb-batch-workflow.js:454-455` and `climb-batch-workflow.md:230` treat every path under `explorations/` as blind to the stages; the stages' own code is under `explorations/coordinator/tools/checker-count/` and `distance/`.
- **F-203 is in two chunks.** Chunk f9's `proposals.apply` carries an F-203 line built on this chunk's first-round text, with F-101's removal rule moved in. The fix round's changes here apply to that line too: f9's line should be rebuilt from this one, with "(F-101 holds the removal's rule)" replaced by the rule.

## F-106

> - F-106 **The native-wrapper generator wraps every method, static or instance, of a class that `import java` names, private ones too, but skips constructors, static initializers and every method with a Java `byte`, `short` or array type in its parameters or result. A wrapped method with a type that has no Fortress counterpart makes the generator refuse the whole import.** The generator writes the compiled path's Fortress wrappers for such a class. So a method of a `com.sun.fortress.nativeHelpers` class that a library component names in `import java` needs a signature that maps to Fortress, private or not, unless the generator skips it. A class that no `import java` names is not bound by this: `systemHelper.setFinalStatic(Field, Object)` does not map. Gap-ledger row 368 records the refusal. Evidence: observed when a private helper with a `Class<?>` parameter broke the rebuild (`compile-ladder/rung-default-rendering/REPORT.md`, "The repair round"); the skips read in `FortressMethodAdapter.visitMethod` and `SignatureParser.unsayable`.

Meaning: one correction, from the assessment. The old title said "every method"; the generator skips `<init>`, `<clinit>` and each method whose descriptor holds `B`, `S` or `[`, in a parameter or in the result (`FortressMethodAdapter.java:215-225`, `SignatureParser.java:45-85`). The fix round restored a condition that the old text also lacked: the rule binds only a class that some `import java` names, as the report says ("the one with an unmappable type, `systemHelper.setFinalStatic(Field, Object)`, is in a class no Fortress source imports"). "Static or instance" is from the code: `visitMethod` does not test `ACC_STATIC`.

Sources:
- Title: `FortressMethodAdapter.java:215-225` (the skips; no access or static test) and `:250-258` (`toImplFFFF` throws "No Fortress type (yet) for foreign Java type descriptor"); row 368.
- "The generator writes...": the class's role, read in `compiler/nativeInterface/`.
- "So a method...": `CompilerBuiltin.fss:13`, `CompilerLibrary.fss:14-20` (single classes imported); the report's "The repair round" (`systemHelper.java:25`).
- Evidence: the report's "The repair round"; row 368.

## F-107

> - F-107 **Three heaps run the interpreter, and a gated test can pass at two of them and die at the third.** `bin/fortress` gives walk's JVM 256 MB unless `JAVA_FLAGS` is set (gap-ledger row 67: a 2M-element array exhausts it). The harness runs each walk test inside its JUnit JVM, at 768 MB (`junitMem` in `build.xml`). `env.sh` and the `fortress-repo` skill's setup lines set `JAVA_FLAGS` to 4 GB with 64 MB stacks. Measure a claim about a walk failure near a memory limit at 256 MB. A compiled run is not one of the three: `bin/fortress run` goes through `bin/run`, which gives 1536 MB unless `JAVA_FLAGS` is set, and `testFast` gives a compiled test's run step 4 GB with 64 MB stacks (F-99). Evidence: observed: before its repair, `IntSemanticsRungI.fss` passed at 4 GB and at 768 MB and died with `OutOfMemoryError` at 256 MB (`compile-ladder/rung-int-semantics-walk/REPORT.md` sections 3 and 4.4).

Meaning: unchanged. The title is the record's own. The old text's sentence on `testFast`'s compiled run steps is kept, now said apart from the three heaps, with `bin/run`'s default beside it, so that the 256 MB rule reads as walk's. The 768 MB is said as the JUnit JVM's heap, which both suites use. Row 67 is quoted at its own scope ("realistic graphs"; its evidence is a 2M-element array).

Sources:
- `bin/fortress:16-18` (`run` hands over to `bin/run`), `:28-29` (`-Xmx256m -Xss32m`); `bin/run:33-34` (`-Xmx1536m`); row 67.
- `build.xml:132`, `:1179`, `:1424`; `env.sh:8`; `build-and-caches.md`, "Setting up each call"; `build.xml:1187-1188`; F-99.
- The rule and the evidence: the report's sections 3 and 4.4.

## F-108

> - F-108 **The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program.** Without the flags below, as `bin/fortress` and the suites run walk, the order varies from run to run. With three JVM flags set, `-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1`, the order is fixed for a given library, and a library edit can flip it. The three were always set together, so which of them fixes the order is not known. The harness reads only that the `XXX` test fails, not the order. If an output comparison sees the order move, with the test's verdict unchanged, the move goes in gap-ledger row 430, which records this order, and does not stop the batch (the `coordinator` skill's `references/batch.md`, "Reserved points and repairs"). Evidence: observed: `compile-ladder/rung-wrap-operators/JUDGE.md` sections 3 to 5.

Meaning: one correction, from the assessment: "on one core" is replaced by the three flags (the judge's section 5). The fix round restored the rule's condition, "with the test's verdict unchanged", which the old text also lacked (`batch.md`, second bullet), and says that neither `bin/fortress` nor the suites pin the JVM (section 3).

Sources: `JUDGE.md` section 3 (11 of 16 runs in one order; no pin in `bin/fortress` or `build.xml`), section 4 (the harness), section 5 (the three flags; the rung's edit flips the order); `batch.md`, "Reserved points and repairs", second bullet; row 430.

## F-111

> - F-111 **The checker-count and distance stages read only the compiler's phases, so an edit under `Specification/`, `Documentation/`, the test corpora, walk's evaluator and natives (`interpreter/evaluator/`, `interpreter/glue/`), or `explorations/` outside the stages' own folders cannot move their counts.** The stages' own folders are `explorations/coordinator/tools/checker-count/` and `distance/`. Both stages run the compiled checker on the interpreter's library, not on the tests. The count stage calls `Shell.compilerPhases` with `PhaseOrder.compilerPhaseOrder`. The distance stage calls it with that list's first six phases, up to the type check. None of these phases is walk's own: walk's `OVERLOADREWRITE_FOR_INTERPRETER` is not among them, and walk's evaluator is not a phase. Compiler code that names walk's classes, such as `SimpleClassLoader`, was read and does not change what the checker reports. The library names walk's natives only in strings, which only walk resolves. Evidence: read in the code, not measured: `checker-count/WorldFlip.java:25` and `:42`; `distance/DistanceMulti.java:36-39` and `distance/run.sh:122`; `compiler/phases/PhaseOrder.java:125-147`.

Meaning: three corrections.
- The first round cut a false "only" list (the assessment: no phase order runs `ENVGEN`; the list left out the test harness and `CacheBasedRepository.java:148`).
- The fix round corrected the distance stage's phases: `distance/run.sh:122` runs `DistanceMulti -order check`, whose list is the first six of `compilerPhaseOrder` (`DistanceMulti.java:36-39`); the old entry, its history and the assessment all said `compilerPhaseOrder`. The title's claim holds either way.
- The fix round limited `explorations/` to outside the stages' own folders: the stages' code, `WorldFlip.java`, the checker copy under `checker-count/shadow-src/`, `DistanceMulti.java` and both `run.sh`, is there. The old text's "the texts" hid this.

"Compiler code that names walk's classes ... does not change what the checker reports" is the assessment's reading of the classes the stages reach (`SimpleClassLoader.reloadEnvironment` only adds a name to a set); the check accepts it.

Sources: `checker-count/run.sh:51`, `:71`; `WorldFlip.java:25`, `:42`; `distance/run.sh:122`; `DistanceMulti.java:36-39`; `PhaseOrder.java:125-147`; `climb-batch-workflow.md:230` (the paths); the history block at `FACTS-history.md:1771`.

## F-112

> - F-112 **The test corpora cite the specification by file and section, never by line.** A test names the heading of the section that it cites. In the library chapters, it names the trait or method entry too. A rung that renames or removes a cited section updates the citation in the same commit. One comment still cites a line, left as it was: `library_tests/IntLiteralArithRung7.fss:19` cites `Specification/library/apis/CompilerBuiltin.tex:374-383`, a generated file that is not in the tree (F-162: such a listing restates the library's own api files, so it cannot justify them). Source: the one-time strip of `.tex` line numbers at `dc0eee2fe` (`coordinator/PLAN-history.md`, "The one-time strip of `.tex` line numbers ..."). The `fortress-repo` skill gives the rule to workers (`tests-writing.md`, "Names, comments, citations").

Meaning: unchanged. The source pointer is corrected: `PLAN.md:402` now holds another item. The fix round says the citation left is a comment, "left as it was" (the history's text of 2026-10-13 19:03Z), and glosses F-162 in words. The sources give no rule for what to do with that citation, so the entry gives none.

Sources: `tests-writing.md:135`; `PLAN-history.md:391`; `IntLiteralArithRung7.fss:19`; F-162.

## F-203

> - F-203 **`explorations/experiment/env.sh` sets up a shell for the gate's runners, and sets `FORTRESS_HOME` from its own place in the tree.** It sets `FORTRESS_HOME` two folders above itself, replacing any value that the shell had (`env.sh:4`), so sourcing another tree's `env.sh` runs that tree's code. It also sets the JDK, `FORTRESS_THREADS=1` and `JAVA_FLAGS`, unsets `JAVA_TOOL_OPTIONS`, and removes the parser folders in `/tmp` that no live run uses (F-101 holds the removal's rule). The compile ladder's drivers source it: `compile-ladder/run-ladder.sh` and its copy in `baseline-2026-09-19/`, and the two that the gate's ladder regression runs, `repair-r1-atomic-static/run-subset.sh` and `baseline-2026-09-19/microgpt-phase.sh`. Each of these sets its own `JAVA_FLAGS` after it. `experiment/setup.sh` sources it too. `microgpt-phase.sh` names the main tree's `env.sh` by its absolute path; the gate rewrites that path in its copy (the `fortress-repo` skill's `gate.md`, "The ladder regression"). The count stage's and the distance stage's `run.sh` do not source it: their headers tell the caller to source it first. A worker does not source it. It starts each Bash call with the `fortress-repo` skill's setup lines, which give the same settings (`build-and-caches.md`, "Setting up each call"). Evidence: read in the scripts.

Meaning: one correction, from the assessment: the count and distance stages' `run.sh` only ask the caller to source `env.sh`. The fix round made three more scopes exact, from the scripts: the gate's ladder regression runs only `run-subset.sh` and `microgpt-phase.sh` (`gate.md`, steps 1 and 2); all four drivers set `JAVA_FLAGS` to 2 GB after they source `env.sh`; and `env.sh:4` replaces `FORTRESS_HOME` whatever the shell had. The first round's question on `microgpt-phase.sh` is settled by `gate.md:90`, which rewrites `/home/user/fortress` to the gate's tree, so it is a clause, not a question.

Sources: `env.sh:1-21`; the `source` lines (`compile-ladder/run-ladder.sh:20`, `baseline-2026-09-19/run-ladder.sh:22`, `repair-r1-atomic-static/run-subset.sh:24`, `baseline-2026-09-19/microgpt-phase.sh:5`, `experiment/setup.sh:33`); their `JAVA_FLAGS` lines (`run-ladder.sh:26`, `baseline-2026-09-19/run-ladder.sh:28`, `run-subset.sh:30`, `microgpt-phase.sh:10`); `gate.md`, "The ladder regression" (`:86-92`); the stages' `run.sh:11`; F-101; `build-and-caches.md`, "Setting up each call".

## F-234

> - F-234 **A Fortress command that a worker types itself (`bin/fortress`, `harness-one.sh`, `junit.sh`, or `java` of a Fortress main class) starts a fresh JVM, and that start costs too little to pay for a resident compiler.** A resident compiler is a background JVM that serves Fortress commands, as Scala 2's `fsc` did. The suites start one JVM for each test class, and one for each of `testSystem`'s four shards, not one for each test: the harness runs each test file inside its JVM. Only a compiled test's run step and a `.sh` test, such as `tests/concurrentPrinting.sh`, start another process. In one measurement over 267 worker transcripts, the one-off commands took 17.5 % of the wall time of the workers' shell commands, and the suites, builds and stages 47.8 %. Over the workers' whole running time, the one-off commands took 6.4 % (11.6 % if every wait that the measurement could not tie to a run was theirs). Removing their JVM start-up would save at most 1.8 % (P-150: no resident compiler is built). What runs inside the suites and the stages was not measured. Detail: `coordinator/process-engineering/fresh-jvm-commands.md`, "Summary", "What a resident compiler could save, at most" and "Decisions not taken".

Meaning: two corrections from the assessment, one of them undone by the check, and two from the check.
- Kept: the `.sh` test named as a second child process (`FileTests.ShellTest`, `:675-692`); the shares compared on one denominator, 17.5 % against 47.8 % of the Bash wall time.
- Undone: the first round's "at most 6.4 %". The report gives 6.4 % as the measured share, and 11.6 % on its most generous reading; its "at most" is for the saving. The old text's "took 6.4 %" was right.
- Corrected: "each suite in one JVM", which the old text also said. `testFast` forks a JVM for each test class in four parallel tracks (`build.xml:1208-1235`), and `testSystem` runs four shards (`:1449-1454`). The harness runs each test file inside its JVM (`FileTests.java:762`).
- Added: the report's limit, that what runs inside the suites and stages was not measured, and the commands of its class (a), which settle "on its own".

Sources: the report's "Summary", bullets 1 to 4, "What a resident compiler could save, at most" and "Decisions not taken", bullet 1; P-150 (the definition of a resident compiler); `build.xml:1208-1235`, `:1449-1454`; `FileTests.java:675-692`, `:762`; `tests/concurrentPrinting.sh:18`.
