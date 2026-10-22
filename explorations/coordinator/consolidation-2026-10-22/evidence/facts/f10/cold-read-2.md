# Cold read 2: facts/f10/clean.txt

Context used: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and the skill's `references/` `compiler.md`, `build-and-caches.md`, `interpreter.md`, `tests-running.md`, `tests-writing.md`, `gate.md`, `specification.md` (term lookups only). Nothing else.

Seven entries, all facts.

---

## F-106: what the native-wrapper generator wraps, skips and refuses

**Established:** When a Fortress file says `import java <class>`, the compiled path's wrapper generator writes Fortress wrappers for that Java class. It wraps every method, static or instance, public or private. It does not wrap constructors, static initializers, or any method that has a Java `byte`, `short` or array type in its parameters or its result type; those are skipped quietly. If a method that it does wrap uses a type with no Fortress counterpart, the generator refuses the whole import, not just that method.

**Conditions:** Only classes that some `import java` names. A Java class that no `import java` names is not checked: `systemHelper.setFinalStatic(Field, Object)` has an unmappable signature and does no harm, because nothing imports `systemHelper`. Skipped methods (`byte`, `short`, arrays, constructors, static initializers) don't have to map.

**Consequence:** If I add or change a method in a `com.sun.fortress.nativeHelpers` class that a library component imports with `import java`, every method of that class that the generator wraps must have a signature that maps to Fortress. That includes private helpers. If it doesn't, the whole import fails and the library rebuild breaks. A private helper with a `Class<?>` parameter is the known example. Another fix is to give the method a signature that the generator skips (for example one with an array or `byte` type). This matches `compiler.md`, "Natives", and adds the skip list.

**Evidence:** Seen in practice: a private helper with a `Class<?>` parameter broke the rebuild (`compile-ladder/rung-default-rendering/REPORT.md`, "The repair round"). The skips were read in the code, in `FortressMethodAdapter.visitMethod` and `SignatureParser.unsayable`. Gap-ledger row 368 records the refusal.

**Could not resolve:**
- "a type that has no Fortress counterpart": neither the entry nor the skill lists which Java types do map (`int`, `long`, `double`, `boolean`, `String`, `Object`?). So I can tell that `Class<?>` fails and `byte` is skipped, but I can't check a new signature without reading `SignatureParser`. In `setFinalStatic(Field, Object)` I can't tell whether `Object` fails as well as `Field`, or only `Field`. This is a gap in the skill, not unclear wording.
- "a library component names in `import java`": the rule seems to hold for any importer (a test too). Limiting it to library components reads as the common case, not a real limit. Minor.
- `compiler.md` says `import java` "binds static Java methods", but this entry says instance methods are wrapped too. I read the two together like this: only static methods are useful to bind, but instance methods are still wrapped and so must map. That reading is my inference, not text in either source.

---

## F-107: three heaps run the interpreter

**Established:** Walk runs at one of three maximum heap sizes, depending on how it is started:
1. `bin/fortress` (walk) with `JAVA_FLAGS` unset: 256 MB. Gap-ledger row 67: a 2-million-element array runs out of memory at this size.
2. The test harness inside the suites' JUnit JVM: 768 MB (`junitMem` in `build.xml`).
3. A shell set up by `env.sh` or by the skill's setup lines: `JAVA_FLAGS` gives 4 GB with 64 MB stacks.

The same gated test can pass at two of these and run out of memory at the third.

**Conditions:** This is about walk only. Compiled runs use other sizes. `bin/fortress run` goes through `bin/run`, which gives 1536 MB when `JAVA_FLAGS` is unset (and whatever `JAVA_FLAGS` says when it is set). `testFast` gives a compiled test's run step 4 GB with 64 MB stacks (F-99). The entry doesn't give a heap for `fortress compile`.

**Consequence:** Before I claim that a walk failure is near a memory limit, I measure it at 256 MB (`interpreter.md` gives the flags: `JAVA_FLAGS="-Xmx256m -Xss32m ..."`). My setup lines give 4 GB, so a pass in my shell doesn't show that the test passes at 768 MB or 256 MB.

**Evidence:** Seen in practice: before its repair, `IntSemanticsRungI.fss` passed at 4 GB and at 768 MB, and died with `OutOfMemoryError` at 256 MB (`compile-ladder/rung-int-semantics-walk/REPORT.md` sections 3 and 4.4).

**Could not resolve:**
- Which heap `harness-one.sh` and `junit.sh` use for a walk test. The entry ties 768 MB to "the harness ... inside its JUnit JVM" and to `junitMem` in `build.xml`, which reads like the ant suites. `tests-running.md` also says 768 MB "whatever the shell exports" for the suites only. I can't tell whether the two single-test scripts also run at 768 MB or take my `JAVA_FLAGS` (4 GB). It matters, because it decides which heap my single-test reproduction runs at. Unclear scope.
- "a gated test": I read it as a test in a folder that the gate runs. Clear enough.

---

## F-108: the order in walk's overload-ambiguity message is not stable

**Established:** When walk reports an overload ambiguity, its message names the two clashing declarations. Which one comes first is not set by the program. Under the normal way `bin/fortress` and the suites run walk, the order can change from one run to the next. With the three JVM flags `-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1` all set, the order is the same on every run for a given library, but a library edit can flip it. The three flags were only ever tried together, so it isn't known which of them makes the order stable. The harness checks only that the `XXX` test fails, not the order in its message.

**Conditions:** This is about walk's ambiguity message only. "Stable" holds only with all three flags and an unchanged library.

**Consequence:** Don't assert on or compare the order (the same as `interpreter.md`). If a comparison of outputs shows only that the order changed, and the test still passes or fails as before, it isn't a regression. It is credited to gap-ledger row 430, which records this order, and the batch doesn't stop for it.

**Evidence:** Seen in practice: `compile-ladder/rung-wrap-operators/JUDGE.md` sections 3 to 5.

**Could not resolve:**
- "the move goes in gap-ledger row 430": I can read this two ways. (a) Each time this happens, someone writes it into row 430. (b) The change is classed as explained by row 430, and nothing new is written. It also doesn't say whether a worker or the coordinator does it. The pointer for the procedure is the `coordinator` skill's `references/batch.md`, which a worker doesn't have, so I can't follow it. Unclear wording, and the pointer is outside a worker's context.
- "If an output comparison sees the order move": which comparison? The gate's ladder STDOUT mark, `count-run`'s `compare-normalised.py` (`gate.md`, "Comparing with an earlier run"), or any comparison? Unclear wording.
- "With three JVM flags set" and "The three were always set together": the entry doesn't say who set them, or in which runs (a JUDGE's runs? a tool?). So I can't tell when I would meet the stable order. Unclear wording.
- Conflict with the skill: `interpreter.md` says "On one core, the order is fixed for a given library". That credits the stable order to the single core (`ActiveProcessorCount=1`). This entry says which flag does it is not known. A worker who has read both can't tell which one to trust. Disagreement between sources, not a missing concept.

---

## F-111: edits that cannot move the checker count or the distance

**Established:** The count stage and the distance stage run only the compiled checker's phases, over the interpreter's library, not over the tests. An edit can't change either number if it is only under `Specification/`, `Documentation/`, the test corpora, walk's evaluator or natives (`interpreter/evaluator/`, `interpreter/glue/`), or `explorations/` outside the stages' own folders (`explorations/coordinator/tools/checker-count/` and `.../distance/`). Here is why:
- The count stage runs `Shell.compilerPhases` with all of `PhaseOrder.compilerPhaseOrder`. The distance stage runs that list's first six phases, ending at the type check.
- Neither list has a phase that belongs only to walk: `OVERLOADREWRITE_FOR_INTERPRETER` is not in them, and walk's evaluator is not a phase.
- Compiler code that names walk's classes (for example `SimpleClassLoader`) was read, and it does not affect what the checker reports.
- The library names walk's natives only inside strings (`builtinPrimitive("...")`), and only walk resolves those strings.

**Conditions:** It covers only the listed places. Edits to `Library/`, `LibraryBuiltin/`, the compiler's phases or checker, the parser, and the rest of `interpreter/` outside `evaluator/` and `glue/` are not covered and may move the numbers. The entry gives no measurement.

**Consequence:** For an edit confined to those places, I can treat the checker count and the distance as unchanged. I can reuse the earlier values instead of running the two stages again, as long as my brief allows that. An edit anywhere else may move them.

**Evidence:** Read in the code, not measured: `checker-count/WorldFlip.java:25` and `:42`; `distance/DistanceMulti.java:36-39` and `distance/run.sh:122`; `compiler/phases/PhaseOrder.java:125-147`.

**Could not resolve:**
- "that list's first six phases, up to the type check": the skill's own phase list (SKILL.md, "The phases") has six phases, and the type check is the fourth. In that numbering, "first six" would be all of them, past the type check. I take the entry to mean the first six entries of `PhaseOrder`'s list, which seems longer (for example, integer-literal folding comes before the checker). But the two numberings collide. Unclear wording.
- "`explorations/` outside the stages' own folders": F-203 says both stages' `run.sh` tell the caller to source `explorations/experiment/env.sh` first. An edit to `env.sh` (its JDK or `JAVA_FLAGS`) is in `explorations/` outside the stages' folders, yet it could plausibly change a stage's run. I can't tell whether the entry means to cover `env.sh` too. Unclear scope.
- `SimpleClassLoader`: the entry doesn't say whether it lives under `interpreter/evaluator/` or `interpreter/glue/`, the areas this entry clears. I think the point is that even if it does, it doesn't affect the checker. I'm reading that from context. Minor.

---

## F-112: tests cite the specification by file and section, not by line

**Established:** In the test corpora, every citation of the specification gives the `.tex` file and the heading of the cited section. For the library chapters, it also gives the trait or method entry. Tests don't cite line numbers. There is one exception: a comment at `library_tests/IntLiteralArithRung7.fss:19` still cites `Specification/library/apis/CompilerBuiltin.tex:374-383` by line, and was left as it was. That file is generated and is not in the tree. It is an api listing, which only restates the library's own `.fsi` files, so it can't justify a change to them (F-162).

**Conditions:** The test corpora only. The one exception above stays.

**Consequence:** When I write a test, I cite by file plus section (plus entry in the library chapters), never by line (`tests-writing.md`, "Names, comments, citations"). If my rung renames or removes a section that a test cites, I update that citation in the same commit (also `specification.md`). I don't count the leftover line citation as a pattern to copy. To justify a library change, I cite the `.fsi` file, not the generated listing.

**Evidence:** The one-time removal of `.tex` line numbers at `dc0eee2fe` (`coordinator/PLAN-history.md`, "The one-time strip of `.tex` line numbers ..."). The rule for workers is in the skill's `tests-writing.md`.

**Could not resolve:**
- The bold claim says "never by line", and the body then names one line citation. The meaning is clear (the rule, plus one known leftover), but the headline taken alone isn't literally true. Wording.
- "Should the leftover be fixed?" The entry says only "left as it was". It doesn't say whether a worker who touches that file should change it or leave it. Unclear. Minor.

---

## F-203: what `explorations/experiment/env.sh` does, and who sources it

**Established:** `explorations/experiment/env.sh` sets up a shell for running the gate's scripts. It sets `FORTRESS_HOME` to the folder two levels above itself, which is that tree's root. It overwrites any `FORTRESS_HOME` the shell already had (`env.sh:4`). So if you source another tree's `env.sh`, your runs use that other tree's code. It also sets the JDK, `FORTRESS_THREADS=1` and `JAVA_FLAGS`, unsets `JAVA_TOOL_OPTIONS`, and deletes the parser directories in `/tmp` that no running process is using (F-101 has the rule for that).

These scripts source it: the compile ladder's `compile-ladder/run-ladder.sh` and its copy in `baseline-2026-09-19/`, and the two scripts the gate's ladder regression runs, `repair-r1-atomic-static/run-subset.sh` and `baseline-2026-09-19/microgpt-phase.sh`. Each of these sets its own `JAVA_FLAGS` after sourcing it. `experiment/setup.sh` sources it too. `microgpt-phase.sh` points to the main tree's `env.sh` by absolute path, and the gate replaces that path in its copy. The `run.sh` of the count stage and of the distance stage don't source it. Their headers tell the caller to source it first.

**Conditions:** It describes the scripts as they are now. Because `FORTRESS_HOME` is overwritten, the tree whose `env.sh` you source is the tree whose code runs.

**Consequence:** As a worker I don't source `env.sh`. I start each Bash call with the skill's setup lines instead, which give the same settings (`build-and-caches.md`, "Setting up each call"; that section notes two differences: `tmp/` inside my tree, and no cleanup of `/tmp`). That also applies when a stage's `run.sh` header says to source it. Never source another tree's `env.sh`. When I copy `microgpt-phase.sh`, rewrite its absolute path, as `gate.md` "The ladder regression" does. The driver scripts' own `JAVA_FLAGS` take priority over `env.sh`'s.

**Evidence:** Read in the scripts.

**Could not resolve:**
- "sets up a shell for the gate's runners": "runners" could mean the scripts the gate runs, or the agents who run the gate. The second reading conflicts with "A worker does not source it", since workers run the gate. The list of scripts that follows suggests the first reading. Unclear wording.
- "Each of these sets its own `JAVA_FLAGS` after it": I can't tell whether "these" covers `experiment/setup.sh`, which comes after the sentence. Minor wording.
- How `run-subset.sh` finds `env.sh` once the gate copies it into `tmp/gate/ladder/` (`gate.md` step 1 rewrites `microgpt-phase.sh`'s path only). Does it name the main tree's `env.sh` by absolute path too, or a path relative to itself? The entry calls out only `microgpt-phase.sh`. So I can't tell whether a gate run in a worktree might source the main tree's `env.sh` and so run the main tree's code. Missing detail.
- "which give the same settings": `build-and-caches.md` lists two differences. This is close enough, but not literally true. Wording.

---

## F-234: the start-up cost of a fresh JVM doesn't justify a resident compiler

**Established:** Every Fortress command a worker types by hand (`bin/fortress`, `harness-one.sh`, `junit.sh`, or `java` on a Fortress main class) starts a new JVM. That start-up costs too little for a resident compiler to pay off. A resident compiler is a background JVM that serves Fortress commands, like Scala 2's `fsc`. The suites don't start a JVM for each test. They start one per test class, and one for each of `testSystem`'s four shards, and the harness runs each test file inside that JVM. Only a compiled test's run step and a `.sh` test (for example `tests/concurrentPrinting.sh`) start another process.

From one measurement over 267 worker transcripts:
- Of the time workers' shell commands ran, the one-off commands took 17.5 %, and suites, builds and gate stages took 47.8 %.
- Of the workers' whole running time, the one-off commands took 6.4 %, or at most 11.6 % if every wait that couldn't be tied to a run is counted as theirs.
- Removing the JVM start-up of those one-off commands would save at most 1.8 %.

What runs inside the suites and the stages was not measured.

**Conditions:** It covers the start-up of commands a worker types. It doesn't cover the work inside the suites or the stages. It rests on one measurement of 267 transcripts.

**Consequence:** Don't propose or build a resident compiler or JVM server to make work faster. P-150 decided that none is built. Fresh JVM start-up is not where the time goes.

**Evidence:** `coordinator/process-engineering/fresh-jvm-commands.md`, sections "Summary", "What a resident compiler could save, at most" and "Decisions not taken".

**Could not resolve:**
- "would save at most 1.8 %": I can't tell what it is a percentage of. It is probably the workers' whole running time (the base of the 6.4 % before it), but it could be the wall time of shell commands (the base of 17.5 %). Unclear wording.
- "every wait that the measurement could not tie to a run": I can't tell what a "wait" is here. It could be a worker's poll or sleep while a background run goes on, or idle time between commands. Unclear wording.
- "one for each test class": I read "test class" as a JUnit class such as `SystemJUTest` (`tests-running.md`). That fits, but it isn't defined. Minor.
