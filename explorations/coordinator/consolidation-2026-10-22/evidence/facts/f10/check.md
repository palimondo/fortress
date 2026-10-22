<!-- The clarity workflow's check of FACTS chunk f10 (F-106, F-107, F-108, F-111, F-112, F-203, F-234): each rewritten entry against the record's text and its sources, and the cold reader's answers against the source meaning, with each failure classed. -->

# FACTS chunk f10: the check

Read on `main` at `772a5a2af`. FACTS, the gap ledger and the `fortress-repo` skill have not changed since the assessment's base `a898e1baf` (`git diff --stat` of the three prints nothing). For each entry I read the record's text (`facts-extract.sh 'F-N'`), its history (`'history:F-N'`), the report sections it cites and the code it names. I ran no Fortress program.

Two of the record's own sources are wrong, and two rewrites copy their errors. The assessment's F-107 note says that "`bin/fortress run` also starts at 256 MB when `JAVA_FLAGS` is not set". In fact `bin/fortress run` hands over to `bin/run`, which defaults to 1536 MB. Its F-234 note says the report gives 6.4 % "as an upper bound". The report gives it as the measured share, and its generous reading is 11.6 %. Both errors are now in the rewrites, and the F-234 one is in its apply note as well.

## F-106

**Fidelity.**
- The skips are right. `FortressMethodAdapter.visitMethod` skips `<init>`, `<clinit>` and every descriptor that `SignatureParser.unsayable` refuses (`FortressMethodAdapter.java:215-225`; `SignatureParser.java:45-85`: `B`, `S` or `[` in a parameter or in the result). It does not check access, so private methods are wrapped. `toImplFFFF` throws for an unmapped type (`:250-258`). Row 368 and the report's "The repair round" agree.
- **A condition is dropped.** The rewrite says: "So a helper in `com.sun.fortress.nativeHelpers`, the Java package that the compiled path's library imports, needs a signature that maps to Fortress, even when it is private, unless the generator skips it." But the library imports single classes, not the package: `import java com.sun.fortress.nativeHelpers.{simplePrintln.nativePrint => jPrint, ...}` (`CompilerBuiltin.fss:13`), and `equality.sEquiv` and `runtime.loopChunk` (`CompilerLibrary.fss:19-20`). The rule therefore holds only for a class that some `import java` names. The report says so: "Every private helper in an imported `nativeHelpers` class already has a mappable signature ...; the one with an unmappable type, `systemHelper.setFinalStatic(Field, Object)` (`systemHelper.java:25`), is in a class no Fortress source imports." Read literally, the rewrite's sentence is false for `systemHelper`. The old text ("a `nativeHelpers` helper") had the same gap. The new gloss "the Java package that the compiled path's library imports" makes it explicit.

**Comprehension.** The cold reader matched the source on every claim. It left three points open:
- Which Java types have a Fortress counterpart. The entry need not list them, but no worker part does either.
- Whether "every method" includes instance methods, since `compiler.md`, "Natives", says `import java` "binds static Java methods". It does include them. `visitMethod` does not test `ACC_STATIC`, and `generateNewBody` wraps every method that it reaches with `INVOKESTATIC` (`FortressMethodAdapter.java:273-321`). So an instance method's types must map too.
- Whether "an array" means a Java array. It does: the descriptor's `[`.

**Class.**
- Wording (the dropped condition). "So a method of a `com.sun.fortress.nativeHelpers` class that a library component names in `import java` needs a signature that maps to Fortress, private or not, unless the generator skips it. A class that no `import java` names is not bound by this: `systemHelper.setFinalStatic(Field, Object)` does not map."
- Wording, in the title. "wraps every method, static or instance, of a class that `import java` names, private ones too, but skips constructors, static initializers and every method with a Java `byte`, `short` or array type in its parameters or result."
- A concept the reader lacked: which Java types map to Fortress. It belongs in the `fortress-repo` skill's `references/compiler.md`, "Natives". The table is `NamingCzar.specialForeignJavaTranslations` (`NamingCzar.java:437-452`): `boolean`, `int`, `long`, `float`, `double` and their boxes, `Object`, `String`, `BigInteger`, the two buffered streams, and `void`. A class that extends `fortress.AnyType.Any` passes through (`NamingCzar.java:304-349`). `char` is commented out (`:455`), so a `char` parameter breaks the import unless the method has one of the special names (`:368-380`).
- For the coordinator: `compiler.md:62` says "wraps every method of a class that it is given" and has no skips. It carries the error that this rewrite fixed, as `interpreter.md:57` does for F-108.

## F-107

**Fidelity.**
- **The title's new clause is broader than the source.** It says "a compiled test's run step gets the largest". Only `testFast` sets that, through `fastTrack`'s `JAVA_FLAGS` env (`build.xml:1187-1188`). A run step is not walk either: `bin/fortress run` hands over to `bin/run` (`bin/fortress:16-18`), whose default when `JAVA_FLAGS` is unset is `-Xmx1536m` (`bin/run:33-34`; row 640 names it as "`bin/run`'s `-Xmx1536m`"). With the clause in the title, the body's "`bin/fortress` gives the JVM 256 MB unless `JAVA_FLAGS` is set" reads as covering `bin/fortress run`, and "Measure a claim about a failure near a memory limit at 256 MB" reads as covering compiled runs. The cold reader drew both conclusions. The assessment's premise, "`bin/fortress run` also starts at 256 MB when `JAVA_FLAGS` is not set", is wrong.
- **One word is broader than its source.** The rewrite has "(gap-ledger row 67: realistic programs exhaust it)". Row 67 says "realistic graphs exhaust it", and its evidence is a 2M-element array.
- The rest matches. `bin/fortress:28-29`, `build.xml:132` (`junitMem` 768m, the `maxmemory` of `fastTrack` `:1179` and `systemShard` `:1424`), `env.sh:8`, and the report's sections 3 and 4.4: "every run of the first two rounds, at 4 GB or 768 MB, passed", and `OutOfMemoryError` at the launcher's `-Xmx256m`.

**Comprehension.** The cold reader read "Three heaps run the interpreter" two ways: walk only, with the run step as an aside, or every JVM that `bin/fortress` starts. It then applied the 256 MB rule to "any claim that a run fails near a memory limit". That differs from the source, which is about walk (the report's test is a walk test). The reason is the title's new clause.

**Class.**
- Wording, settled by `bin/fortress:16-18` and `bin/run:33-34`. Keep the title to its quoted opening: "Three heaps run the interpreter, and a gated test can pass at two of them and die at the third." The body could then read: "`bin/fortress` gives walk's JVM 256 MB unless `JAVA_FLAGS` is set (gap-ledger row 67: a 2M-element array exhausts it). The harness runs each walk test inside its JUnit JVM, at 768 MB (`junitMem` in `build.xml`). `env.sh` and the `fortress-repo` skill's setup lines set `JAVA_FLAGS` to 4 GB with 64 MB stacks. Measure a claim about a walk failure near a memory limit at 256 MB. A compiled run is not one of the three: `bin/fortress run` goes through `bin/run`, which gives 1536 MB unless `JAVA_FLAGS` is set, and `testFast` gives a compiled test's run step 4 GB with 64 MB stacks (F-99: with 1 MB stacks a test overflows at four threads)." Then the evidence, as written.

## F-108

**Fidelity.**
- The correction is right. `JUDGE.md` section 5: the default and the pinned runs "differ in three flags at once (`-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1`)". "The runs did not test the three flags one at a time" says the same thing, and adds nothing. Section 3 gives 11 of 16 runs under default flags. Under pinned flags, 1 to 8 dummy declarations did not flip the order, and rung D's edit did (section 5). Section 4 says that the harness reads only that the file fails.
- **A condition is dropped.** The rewrite says "The move does not hold a batch". The rule it cites carries a condition: "An output that the base already varies from run to run, with the test's verdict unchanged, is a ledger row" (`coordinator` skill, `references/batch.md`, "Reserved points and repairs", second bullet). The old text lacked the condition too.
- Confirmed for the coordinator: row 430 still says "one core fixes it for a given library", and `interpreter.md:57` says "On one core, the order is fixed". Both carry the error that the judge corrected.

**Comprehension.** The cold reader matched the source, with two drifts.
- Under "Conditions" it wrote "The fixed order holds only with all three flags together". The evidence does not show that: only all three together were run, so fewer might do. The cause is the wording "did not test the three flags one at a time", which states the gap but not what follows from it.
- It read "the JVM's default flags" as possibly F-107's 256 MB default.

It also could not read "hold a batch", which is coordinator vocabulary that a worker's context does not have.

**Class.**
- Wording: "The three were always set together, so which of them fixes the order is not known."
- Wording: "Without these flags, as `bin/fortress` and the suites run walk, the order varies from run to run (neither pins the JVM: `JUDGE.md` section 3)."
- Wording (the dropped condition, and the coordinator term): "Such a move, with the test's verdict unchanged, goes in that row and does not stop the batch (the `coordinator` skill's `references/batch.md`, "Reserved points and repairs")."

## F-111

**Fidelity.**
- **Uncertain fidelity, settled: one claim is false for the distance stage.** The rewrite says "Both stages call `Shell.compilerPhases` with `PhaseOrder.compilerPhaseOrder`." The count stage does: `WorldFlip` runs with no `-stop` (`checker-count/run.sh:71`), so with `compilerPhaseOrder` (`WorldFlip.java:25`, `:42`). The distance stage does not. `distance/run.sh:122` runs `DistanceMulti -order check`, and `-order check` is a list of `DistanceMulti`'s own, six phases from `PREDISAMBIGUATEDESUGAR` to `TYPECHECK` (`DistanceMulti.java:36-39`). `compilerPhaseOrder` runs only with `-order full`. The script has had this form since the stage was made (`d97e1f54a`, 2026-09-27). The old entry, its history and the assessment all repeat the error. The title's claim survives, because the six are the first six of `compilerPhaseOrder` (`PhaseOrder.java:137-147`).
- **The claim is broader than the evidence.** The rewrite says "an edit under ... `explorations/` ... cannot move their counts". The stages' own code is under `explorations/`: `checker-count/WorldFlip.java`, the checker copy `checker-count/shadow-src/com/sun/fortress/compiler/StaticChecker.java` that the stage puts ahead of the build (`checker-count/run.sh:22-33`), `distance/DistanceMulti.java`, and both `run.sh`. An edit there can move the counts. The old text said "the texts", which hid this. The rule that cites the entry, `STAGE_BLIND` (`climb-batch-workflow.js:454-455`; `climb-batch-workflow.md:230`), has the same hole. That is for the coordinator.
- **The supporting sentence is now thinner.** After the cut, the entry's reason for "walk's evaluator" is "No phase in that list belongs to walk". That alone does not show that a phase's code never calls walk's evaluator. Compiler code does name it in a few places: the exceptions' `Environment` fields (`exceptions/ProgramError.java:16`, `FortressException.java:20`), `compiler/environments/SimpleClassLoader.java:15` (`BaseEnv`), and `compiler/FortressClosure.java:16-17`. The assessment read the ones that the stages can reach and found that they do not change what the checker reports: `reloadEnvironment` only adds a name to a set (`SimpleClassLoader.java:35-37`). The claim holds by that reading. The entry could say so in one clause, but it is not a failure.
- The cut of the "only" list, the evidence line and "on the interpreter's library, not on the tests" are right. The count stage's target is `Library/FortressLibrary.fss` (`checker-count/run.sh:51`), the distance stage's the twelve prelude components, and both call `Shell.useInterpreterLibraries()`. Nothing outside `interpreter/` names `builtinPrimitive` or `interpreter.glue`, apart from the unit test `tests/unit_tests/ASTJUTest.java`, so "which only walk resolves" holds.

**Comprehension.** The cold reader raised the `explorations/` objection itself, and was right. It read "belongs to walk" two ways. It did not know which folders "walk's evaluator and natives" are, or whether the rest of `interpreter/` is covered. It is not: `STAGE_BLIND` lists `interpreter/evaluator/` and `interpreter/glue/`, and PLAN-history's batch 12 finding 8 proposes, unbuilt, to add `interpreter/env/` and `Driver.java`.

**Class.**
- Wording, settled by `distance/run.sh:122` and `DistanceMulti.java:36-39`: "The count stage calls `Shell.compilerPhases` with `PhaseOrder.compilerPhaseOrder` (`WorldFlip.java:25`, `:42`). The distance stage calls it with that list's first six phases, up to the type check (`DistanceMulti -order check`, `DistanceMulti.java:36-39`, `distance/run.sh:122`)." Cite `DistanceMulti.java:36-39` in the evidence too.
- Wording (the claim broader than the evidence): "under `Specification/`, `Documentation/`, `explorations/` outside the two stages' own folders `explorations/coordinator/tools/checker-count/` and `distance/`, the test corpora, or walk's evaluator and natives (`interpreter/evaluator/`, `interpreter/glue/`)".
- Wording: "None of these phases is walk's own: walk's `OVERLOADREWRITE_FOR_INTERPRETER` is not among them (`PhaseOrder.java:125-135`), and walk's evaluator is not a phase."

## F-112

**Fidelity.** Pass. The rewrite matches `PLAN-history.md:391`: "the file and the heading its lines sit under (... in the library chapters the trait and the method entry ...)", "One is left", and the rule since `2040cd056` that "a rung that renames or removes a cited section updates that citation in the commit of its edit". It also matches `tests-writing.md:135` and F-162. I ran `git grep -nE '\.tex:[0-9]+'` over the six test folders, and it still finds only `library_tests/IntLiteralArithRung7.fss:19`. That line is a comment, `(*) Specification/library/apis/CompilerBuiltin.tex:374-383 ...`.

**Comprehension.** The cold reader matched the source. It saw the title's "never by line" against the body's exception, and asked what a worker should do with the citation that is left. The sources do not say: PLAN-history has only "One is left", and the history text of 2026-10-13 19:03Z has "left as it was". So a rule should not be written in, and the question is not the curator's either, since nothing waits on it.

**Class.**
- Wording. The title's opening is quoted elsewhere (`sources.md:160`, `CLIMB-BATCH-8.md:294`, `fortress-changes-chronology.md:164`), so keep it and fix the body: "One comment still cites a line, left as it was: `library_tests/IntLiteralArithRung7.fss:19` cites `Specification/library/apis/CompilerBuiltin.tex:374-383`, a generated file that is not in the tree (F-162: such a listing is not an independent standard)."

## F-203

**Fidelity.**
- The correction is right. `checker-count/run.sh:11` and `distance/run.sh:11` only ask the caller ("Run from $FORTRESS_HOME with explorations/experiment/env.sh sourced"). The five `source` lines are as listed: `compile-ladder/run-ladder.sh:20`, `baseline-2026-09-19/run-ladder.sh:22`, `repair-r1-atomic-static/run-subset.sh:24`, `baseline-2026-09-19/microgpt-phase.sh:5` and `experiment/setup.sh:33`. `git grep` finds no other.
- **One scope is not quite right.** The rewrite says "The ladder regression's scripts source it: `compile-ladder/run-ladder.sh` and its copy in `baseline-2026-09-19/`, `repair-r1-atomic-static/run-subset.sh` and `baseline-2026-09-19/microgpt-phase.sh`." The gate's ladder regression runs copies of only `run-subset.sh` and `microgpt-phase.sh` (`gate.md`, "The ladder regression", steps 1 and 2). `run-ladder.sh` is the compile ladder's driver over every test program. `gate.md:80` warns not to run it with its defaults, and `run-subset.sh`'s header calls itself "A copy of ../run-ladder.sh".
- A limit is not stated. Both gate scripts replace `JAVA_FLAGS` after they source `env.sh`, with `-Xmx2g -Xss64m` and their own caches and temporary folder (`run-subset.sh:30`, `microgpt-phase.sh:10`). So these runners do not run with `env.sh`'s 4 GB. The entry does not say that they do, so this is not a failure. But F-107 and f9's F-99 lean on the phrase "sets up a shell for the gate's runners".
- **The writer's question is settled from the sources.** The gate's ladder step edits its copy of `microgpt-phase.sh` with `sed -i -e "s|/home/user/fortress|$PWD|g"` (`gate.md:90`), so the gate's copy sources its own tree's `env.sh`. Only an unedited copy, run in a worktree, would source the main tree's `env.sh`. That would set `FORTRESS_HOME` to the main tree, since `env.sh:4` sets it whatever the shell had. The gate's procedure already handles this, so no ledger row is needed. One clause in the entry would answer the cold reader's question (below).

**Comprehension.** The cold reader matched the facts. It could not tell what follows from "takes `FORTRESS_HOME` from its own place in the tree", or whether that replaces a value already set. It does: `env.sh:4` exports it unconditionally. It also read "instead" two ways.

**Class.**
- Wording: "and sets `FORTRESS_HOME` from its own place in the tree, two folders up, replacing any value the shell had (`env.sh:4`): sourcing another tree's `env.sh` runs that tree's code."
- Wording: "The compile ladder's drivers source it: `compile-ladder/run-ladder.sh` and its copy in `baseline-2026-09-19/`, and the two that the gate's ladder regression runs, `repair-r1-atomic-static/run-subset.sh` and `baseline-2026-09-19/microgpt-phase.sh`. Each of these sets its own `JAVA_FLAGS` after it."
- Wording: "A worker does not source it. It starts each Bash call with the `fortress-repo` skill's setup lines, which give the same settings (`build-and-caches.md`, "Setting up each call")."
- For the coordinator: chunk f9 also proposes an F-203 line, built on this one's text (f9 `proposals.md`, "F-203 is in two chunks"). These findings apply to f9's line as well.

## F-234

**Fidelity.**
- **Uncertain fidelity, settled: an upper bound is stated where the report gives a value.** The rewrite says "The one-off commands took at most 6.4 % of the workers' whole running time". The report gives 6.4 % as the share they took, by its adjusted accounting: "Class (a) holds 7h51m of the workers' 45h02m of Bash wall time (17.5 %), and 6.4 % of their 122h38m of lifetime" ("Summary", bullet 2). On its most generous reading the share is higher: "11.6 % if every wait that I could not tie to a run were also class (a)" (bullet 4). The report's "at most" belongs to the saving, not to the time taken: "The hard cap, if class (a) cost nothing at all, is its own 7h51m: 6.4 % of the lifetime". So the rewrite makes the claim stronger than the report, whose own reading reaches 11.6 %. It also disagrees with itself: the entry's 17.5 % is the same time on another denominator, stated as a value. The assessment ("the report gives 6.4 % as an upper bound") caused this, and the apply note repeats it ("'at most' kept on the 6.4 %"). The old text, "took 6.4 %", was right.
- **Uncertain fidelity, settled: one claim is false.** The rewrite says "The suites already run each suite in one JVM". `testFast` runs four tracks in parallel (`build.xml:1208-1235`: compiler, library, othercompiler, misc). Each `fastTrack` is an Ant `junit` with `fork="true"` and no `forkmode`, so Ant forks one JVM for each test class, and the misc track runs many classes. `testSystem` runs four shards, one JVM each (`build.xml:1449-1454`). The point that the entry needs still holds: the harness runs each test file inside its class's JVM (`FileTests.java:762`), not in a fresh one. The old text had the same error. The writer's `concepts.md` repeats it in its "Suites" row ("each suite in one JUnit JVM").
- **A limit is dropped.** The report leaves the suites and stages open: "checker-count, distance, testQuick, testSystem and the like start JVMs themselves. ... If a resident compiler could serve those, the bound would change by a factor I did not measure" ("Decisions not taken", bullet 1). The entry's harness sentence can be read as settling that, and it does not.
- The rest matches. The `.sh` test is right (`FileTests.ShellTest`, `:675-692`; `tests/concurrentPrinting.sh:18` runs `../../bin/fortress run`). 17.5 % against 47.8 % is right, and so is "their start-up at most 1.8 %" (the report: "saves at most 1.8 % of the agents' lifetime"). The title's cost judgement is the old one, and the rewrite sends the decision to P-150.

**Comprehension.** The cold reader matched the figures, but took 6.4 % as an upper bound, because the entry says so. It found the conflict between "one JVM" and `tests-running.md`'s four shards, and was right. It read "on its own" two ways. The report's class (a) settles which: `bin/fortress` with a command or a file, `harness-one.sh`, `junit.sh`, or a direct `java` of a Fortress main class.

**Class.**
- Wording, settled by the report's "Summary": "In one measurement over 267 worker transcripts, such one-off commands took 17.5 % of the wall time of the workers' shell commands, and the suites, builds and stages 47.8 %. Over the workers' whole running time, the one-off commands took 6.4 % (11.6 % if every wait that the measurement could not tie to a run was theirs). Removing their JVM start-up would save at most 1.8 %."
- Wording, settled by `build.xml:1208-1235` and `:1449-1454`: "The suites start one JVM for each test class, and for each of `testSystem`'s four shards, not one for each test: the harness runs each test file inside its JVM (`FileTests.java:762`)." The same correction belongs in `concepts.md`'s "Suites" row.
- Wording (the limit): "What runs inside the suites and the stages was not measured (the report, "Decisions not taken")."
- Wording: "A Fortress command that a worker types itself (`bin/fortress`, `harness-one.sh`, `junit.sh`, or `java` of a Fortress main class) starts a fresh JVM". The title's opening is not quoted elsewhere (`git grep` finds it only in FACTS and its history), so this change is free.

## Summary

| Entry | Fidelity | Comprehension | Failures by class |
|---|---|---|---|
| F-106 | one condition dropped | matches; three points open | wording 2, concept 1 |
| F-107 | the title's new clause is broader than the source | the reader applied the 256 MB rule to compiled runs | wording 1 (settled) |
| F-108 | correction right; one condition dropped | two drifts | wording 3 |
| F-111 | the distance stage's phase list is wrong; `explorations/` is too broad | the reader found the `explorations/` hole | wording 3 (one settled from uncertain fidelity) |
| F-112 | pass | title against body; what to do with the citation left | wording 1 |
| F-203 | correction right; "ladder regression's scripts" too wide; the writer's question settled | `FORTRESS_HOME`'s consequence and "instead" unclear | wording 3 |
| F-234 | "at most 6.4 %" is wrong; "each suite in one JVM" is false; a limit dropped | the reader took 6.4 % as a bound; it found the one-JVM conflict | wording 4 (two settled from uncertain fidelity) |
