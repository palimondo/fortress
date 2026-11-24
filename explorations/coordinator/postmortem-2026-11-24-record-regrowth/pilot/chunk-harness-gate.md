<!-- A judgement of the 24 entries of the FACTS section "The harness and the gate" by the six checks of a consolidation (`.claude/skills/coordinator/references/record.md`, "What an entry is"), each entry with one disposition, checked against the tree at `fcccf1fe21` and the last landed gate (`compile-ladder/climb-batch-36/gate/`). It is for the coordinator, before the next consolidation of FACTS: it shows what a consolidation of one whole section finds beside length. Written 2026-11-24 by a worker of the coordinator. It rewrites no entry and changed no file of the record. -->

# FACTS, "The harness and the gate": the six checks, entry by entry

## Summary

- The section has 24 entries and 19,985 characters. 17 entries are over 600 characters.
- Dispositions: keep 0, reword 5, reorganize 19, investigate 0.
  - Reword: F-109, F-111, F-114, F-295, F-354.
  - Reorganize: F-97, F-98, F-99, F-100, F-101, F-102, F-103, F-104, F-105, F-106, F-107, F-108, F-112, F-113, F-203, F-234, F-283, F-383, F-404.
- 4 entries hold a claim that is stale or false today:
  - F-100 names two caches folders. The build stamps three: `default_repository/caches-one` too, since 2026-11-17.
  - F-109 says that its two tests are not in step 7's list. Both are in it, under the one library, and both passed at batch 36's gate.
  - F-111 says that the count stage runs the whole compiler phase list. Since 2026-10-24 it stops after the type check, as the distance stage does.
  - F-114 says 133 extracted examples and three in `library/`. There are 135, and five in `library/`, since 2026-11-16.
- 2 more entries claim more than their support holds:
  - F-354 gives "two cold compiles ... by one build give equal classes" as a rule. Its source shows it for one build, and shows another build whose two compiles differed in 16 classes.
  - F-102 points to F-29 for the `load_exception_contains` key. F-29 does not hold the key.
- 5 entries give only a report as evidence, with no test, code line or command: F-97, F-101, F-103, F-104, F-113. Their support exists and holds.
- 19 of the 24 repeat a part of the `fortress-repo` skill, whole or in part (each block names the part). 3 of them also repeat another FACTS entry: F-102, F-103 and F-383, on `XXX` tests and refusals at load. 3 restate a POSITIONS decision: F-97 (P-103), F-99 (P-125) and F-283 (P-79).
- 15 entries would leave FACTS, because a skill part holds them whole or nearly: F-98, F-99, F-100, F-101, F-102, F-103, F-104, F-105, F-106, F-107, F-108, F-112, F-113, F-383, F-404. For 4 of them, one or two sentences would first move into the skill (F-98, F-106, F-107), or the skill would first be corrected (F-108, and F-100's folders). F-109 is a 16th candidate: step 7's list now holds its present.
- 9 entries stay: F-97, F-109, F-111, F-114, F-203, F-234, F-283, F-295, F-354. At about 600 characters each, the section would be about 5,300 characters, 26 % of today. If no entry left FACTS, a cut to 600 each would give about 13,800 characters.
- Before an entry leaves, its pointers need a new target. `fortress-repo`'s `references/sources.md` cites several of these entries by title as the source of skill text (lines 70, 113, 116, 145, 154, 164, 182, 183); some of those titles are already gone from FACTS. F-107 points to F-99, F-102 to F-103, and F-170 and P-124 to F-114.
- Two skill texts that would become the only home are wrong today: `interpreter.md:109` ("On one core"; F-108) and `build-and-caches.md:113-114` (two of the three caches folders; F-100). See "Found beside the entries".

## How the checks were made

- The section was printed with `explorations/coordinator/tools/facts-extract.sh 'section:The harness and the gate'` (one part, 20,690 bytes). Lengths are characters of the entry's line, counted with Python.
- Each path that an entry names was checked with `[ -e ]`; all 48 exist. Each cited report section was checked by its heading. Each cited ledger row was printed with `facts-extract.sh 'ledger:N'`; every status agrees with its entry (rows 67, 368, 424, 430, 640, 817, 986, 996).
- Each entry's key words were grepped in FACTS, POSITIONS, PLAN and the skills' `references/` parts.
- Cited code lines were read with `sed -n`. No build, suite, stage or test was run.
- "Kind unstated" under Evidence means: the entry names no test, code line or command and output, only a report; the support itself was checked.
- Question numbers refer to the six questions of `record.md`, "What an entry is" (3: history; 4: detail for the work; 5: said elsewhere).

## The entries

### F-97, "The gate's step 7 runs the interpreter's suite on the compiled path ..." (759 characters)

- Scope: pass. The text agrees with `gate.md`, "The suite on the compiled path", and `coordinator/tools/suite-compiled/README.md:14`.
- Present meaning: pass. The list now holds 284 programs: batch 36's gate listed 278, and 6 joined.

      $ grep "suite-compiled LISTED\|suite-compiled CANDIDATES" explorations/compile-ladder/climb-batch-36/gate/summary.txt
      # suite-compiled LISTED	278	PASS 278	FAIL 0	LEAVES 0	GONE 0
      # suite-compiled CANDIDATES	14	JOINS 6

- Evidence: fail, kind unstated. The support holds. The entry cites only the README. "at climb batch 35b's gate, their last measure, all 18 stopped at disambiguate under the prelude" names no file; the file is `compile-ladder/climb-batch-35b/gate/ladder/microgpt-phase.md`:

      $ F=explorations/compile-ladder/climb-batch-35b/gate/ladder/microgpt-phase.md
      $ grep -c "^| [0-9]" $F ; grep "^| [0-9]" $F | awk -F'|' '{print $4}' | sort | uniq -c
      18
           18  disambiguate

- Comprehension: pass.
- Ownership: fail. "The list began with 197 programs, from the count on `4b0e3abd6a`" and "are no longer compiled there" tell how the step came about (question 3). The microGPT sentence is a second subject: the model program on the compiled path. `PLAN.md:9` cites F-97 for it ("microGPT's 18 components stop at name resolution until the switch-over (F-97)").
- Consistency: pass. P-103 and `gate.md` agree.
- Repeats: `gate.md:68-81` holds the mechanism whole. P-103 holds the decision: "The gate also runs the interpreter's suite on the compiled path. Each program that compiles there runs, and its own asserts give the verdict."
- Disposition: reorganize. Cut the mechanism to pointers to `gate.md` and P-103. Move the 197 to the history. Keep the microGPT measurement with its file, here or in an entry on the model program.
- Where the cut text lives now: `gate.md`, "The suite on the compiled path"; `suite-compiled/README.md:14` (`expectedMoves`) and `:36-53` (the count of 197); P-103.

### F-98, "The harness's `run_out_WIcontains` key is whitespace-insensitive containment." (498 characters)

- Scope: pass. The title is narrower than the code, which reads the key for every command and stream (`pfx + which + "_WIcontains"`), but it claims nothing false.
- Present meaning: pass.
- Evidence: pass. Read in the code, at the lines cited:

      $ sed -n '156p;160,161p;277p' ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java
                  what = pfx + which + "_WIcontains";
                      String wi_contents = contents.replaceAll("\\s+", " ").trim();
                      String wi_test = test.replaceAll("\\s+", " ").trim();
                  if (!any_check && pfx.equals("run_") && which.equals("out")) {

- Comprehension: pass. Ownership: pass. Consistency: pass.
- Repeats: `tests-writing.md:55-65` holds the key list, "WIcontains (containment with runs of whitespace collapsed)", and the default check ("With no `run_out` check, its output must contain `pass` or `PASS`"). Not in the skill: `_WImatches` collapses the output only, and a misspelt key checks nothing.
- Disposition: reorganize. Move the two sentences that the skill lacks into `tests-writing.md`'s key list, then leave FACTS.
- Where the cut text lives now: `tests-writing.md:55-65`; `FileTests.java:142-283`. `sources.md:154` cites this entry by title.

### F-99, "The gate's thread count is pinned in the build file for the two suites ..." (781 characters)

- Scope: pass. Present meaning: pass.
- Evidence: pass. `build.xml` and row 640 hold it; `interpreter/Driver.java:531-533` gives half the CPUs when `FORTRESS_THREADS` is unset.

      $ grep -n '<env key="FORTRESS_THREADS"\|<env key="JAVA_FLAGS"' build.xml
      1257:        <env key="FORTRESS_THREADS" value="4"/>
      1258:        <env key="JAVA_FLAGS"
      1508:        <env key="FORTRESS_THREADS" value="4"/>

  Row 640 is `NEGATIVE-BOUNDED`: "overflows a worker thread's stack in 8 of 12 runs under the JVM's default 1 MB thread stacks". `fastTrack` now also pins `FORTRESS_LIBRARY` (`build.xml:1256`), which the entry does not need.
- Comprehension: pass. Ownership: pass. Consistency: pass.
- Repeats: `tests-running.md:33` ("Each JVM gets 768 MB, a 32 MB stack and `FORTRESS_THREADS=4`, whatever the shell exports. The run steps of the compiled tests get `JAVA_FLAGS=-Xmx4g -Xss64m`"); P-125 (the pin of four threads in `build.xml`); `interpreter.md:157` (half the CPUs); the comment at `build.xml:1215-1229` (the reason, with `TimingRungT`).
- Disposition: reorganize: leave FACTS. F-107 points to F-99 for testFast's 4 GB; repoint it to `tests-running.md:33`.
- Where the cut text lives now: the places above, and row 640. `sources.md:113` and `:183` cite this entry by title.

### F-100, "`ant compileAll` deletes the caches folders, `default_repository/caches` and `local_repository/caches` ..." (1,059 characters)

- Scope: fail. "deletes the caches folders, `default_repository/caches` and `local_repository/caches`": the build stamps three folders. "`ant cleanCache`, which deletes both folders whatever the stamp": it deletes three, and starts each again with the build's stamp. "which `CompilerJUTest` and `LibraryJUTest` call": `OneLibraryJUTest.java:35-36` calls `Shell.resetRepository` too.

      $ grep -n 'property name="cache0"\|property name="cacheOne"\|property name="cache1"' build.xml
      43:  <property name="cache0" location="default_repository/caches"/>
      47:  <property name="cacheOne" location="default_repository/caches-one"/>
      51:  <property name="cache1" location="local_repository/caches"/>
      $ grep -n 'stampCache dir=' build.xml | tail -3
      890:    <stampCache dir="${cache0}" stamp="${implementation.built}"/>
      891:    <stampCache dir="${cache1}" stamp="${implementation.built}"/>
      892:    <stampCache dir="${cacheOne}" stamp="${implementation.built}"/>

- Present meaning: fail, by the same passage. `cacheOne` came with `c7ba100d14` (2026-11-17); the entry was last rewritten on 2026-10-22 (`FACTS-history.md:3533`).
- Evidence: fail in part. The support that the entry names, the stamp rule of `build.xml`, holds three folders. The build also deletes the caches at its start when its sources changed (`build.xml:411-418`), which the entry does not say.
- Comprehension: pass. Ownership: pass.
- Consistency: fail. `build-and-caches.md:113` names `default_repository/caches` and `default_repository/caches-one`; F-100 names `default_repository/caches` and `local_repository/caches`. Neither names all three.
- Repeats: `build-and-caches.md`, "Building" (`:113-116`), "The caches" (`:64-69`, `global.map`), "Symptoms of a skipped step" (`:133`, `NoClassDefFoundError` on `fortress/CompilerLibrary$GeneratorZZ32`), "The library order" (`:77`, 100 to 110 s); `tests-running.md:53` (`-Dfortress.junit.reset=false`).
- Disposition: reorganize. Correct `build-and-caches.md:113-114` to the three folders, then leave FACTS: the skill holds the rest, and is more current.
- Where the cut text lives now: the skill lines above; the comment "The caches and the implementation" (`build.xml:392-424`); `process-engineering/build-efficiency.md` section 2.

### F-101, "`harness-one.sh` keeps its Fortress cache between calls." (446 characters)

- Scope: pass. Present meaning: pass. The script's header (`harness-one.sh:7-13`) and its key (`:17-27`) hold it.
- Evidence: fail, kind unstated. The support holds: `build-efficiency.md` sections 1 and 4.1, and the script.
- Comprehension: pass. Ownership: pass. Consistency: pass.
- Repeats: `tests-running.md:101`, nearly word for word:

      101:- It keeps its cache in the folder `<scratch-dir>.cache`. It starts from that cache while the build and the library sources are those that filled it. Otherwise, or with `COLD_CACHE=1`, it starts empty.

  Also `build-and-caches.md:71`.
- Disposition: reorganize: leave FACTS.
- Where the cut text lives now: `tests-running.md:101`; `harness-one.sh:7-13`. `sources.md:70` cites this entry by its title, and `:145` by a former title.

### F-102, "An `XXX*.fss` in the interpreter corpus is a gated expected-failure test." (783 characters)

- Scope: pass. Present meaning: pass. `FileTests.java:784-786` (`s.startsWith("XXX")`) and `:395-413` ("Missing expected failure") hold it; `XXXImportImportCollision.fss` imports `TestImports1` and `TestImports2`, both in `test_library/`.
- Evidence: fail. "(F-29: walk's load check and its `load_exception_contains` key)": F-29 is the load check of closed traits and does not name the key. F-383 and `tests-writing.md:45` hold it.

      $ grep -n "load_exception_contains" explorations/coordinator/FACTS.md | cut -c1-40
      193:- F-102 **An `XXX*.fss` in the interpre

- Comprehension: pass. Ownership: pass. Consistency: pass; F-383 agrees.
- Repeats: `tests-writing.md:39-45` (every `.fss` in `tests/` gated; imports in `test_library/`; the `.test` file for a refusal at load) and `:72-79` ("How `XXX` works"); F-383 (refusal at load).
- Disposition: reorganize: leave FACTS.
- Where the cut text lives now: `tests-writing.md`, "Where a test goes, and how it passes" and "How `XXX` works". `sources.md` cites it under `XXX*.fss`.

### F-103, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` cannot express ..." (749 characters)

- Scope: pass. Present meaning: pass. `FileTests.java:1083` reads the prefix from the `.test` file's name: `boolean shouldFail = s.startsWith("XXX");`.
- Evidence: fail, kind unstated. The support holds: `rung-tryatomic/REPORT.md:227`, "The measured defect, and its home", and the skill.
- Comprehension: pass. Ownership: pass. Consistency: pass; F-383's last sentence repeats its compile-stage rule.
- Repeats: `tests-writing.md:75` (the prefix applies to every command), `:78` ("Saw wrong failure"), `:103-113` ("Writing an `XXX` test", the two `.test` files). The entry itself points there.
- Disposition: reorganize: leave FACTS. F-102 points to F-103; that pointer goes with F-102.
- Where the cut text lives now: `tests-writing.md`, "How `XXX` works" and "Writing an `XXX` test".

### F-104, "A thrown `CompilerError` takes a third path through the test harness ..." (913 characters)

- Scope: pass. Present meaning: pass. `Shell.java` names no `CompilerError` (`grep -n CompilerError` prints nothing), and its two `catch (Throwable ...)` blocks (`:1137`, `:1233`) are on walk's paths, so the compile path does not catch it. The harness's branch keys on `f.contains("XXX")` (`FileTests.java:352`). 36 `.test` files of `compiler_tests/` use `compile_exception_contains`, and all passed at batch 36's gate (`fast-compiler/CompilerJUTest 1847 0 0 0`).
- Evidence: fail, kind unstated. The support holds: `climb-batch-2/REPAIR-review.md` section 2 reads the code path.
- Comprehension: pass, though dense. Ownership: pass. Consistency: pass.
- Repeats: `tests-writing.md:77` ("The harness reports any link or compile exception of a component whose name contains `XXX` as expected, whatever the `.test` file's name. Only an unmet key of that command makes it red.") and `:108` (the wall's test with `compile_exception_contains`); `compiler.md:38` (the code-generator wall).
- Disposition: reorganize: leave FACTS.
- Where the cut text lives now: the skill lines above; the mechanism in `REPAIR-review.md` section 2.

### F-105, "`testSystem`'s four shards are one suite split by sorted index ..." (457 characters)

- Scope: pass. Present meaning: pass. Evidence: pass, read in the code: `FileTests.java:913-915` ("keeps only every n-th test (by sorted index, offset i)") and `gate-functions.sh:10`, `:47` (`sub("^system-[0-9]+/", "system/", s)`).
- Comprehension: pass. Ownership: pass. Consistency: pass. Batch 36's shards hold 220, 231, 222 and 234 tests.
- Repeats: `tests-running.md:7` ("Shard i of n takes every n-th file of the sorted list, from index i.") and `:41` ("To compare test counts, compare the sum of the four shards. A file added to `tests/` moves every later file to another shard.").
- Disposition: reorganize: leave FACTS.
- Where the cut text lives now: `tests-running.md:7` and `:41`; `gate-functions.sh:10`.

### F-106, "The native-wrapper generator wraps every method, static or instance ..." (1,047 characters)

- Scope: pass. Present meaning: pass.
- Evidence: pass, observed and read. `FortressMethodAdapter.java:260-264` skips `<init>`, `<clinit>` and an "unsayable desc"; `SignatureParser.java:52-55` returns true for `'B'`, `'S'` and `'['`. No library file names `systemHelper` (`grep -rn systemHelper Library ProjectFortress/LibraryBuiltin` prints nothing). Row 368 is `NEGATIVE-VERIFIED` and says the same.
- Comprehension: pass. The title is two sentences.
- Ownership: pass.
- Consistency: pass, with a gap. F-309 says "`ForeignJava` reads every public method of a helper class"; that is the api reader (`repository/ForeignJava.java:424`, `:471`, `isPublic`). F-106's "private ones too" is the wrapper generator (`FortressTransformer.java:42-53` hands the whole class to `FortressMethodAdapter`). The two agree, but neither says the other's scope, so a reader can take them for a conflict.
- Repeats: `compiler.md:129` holds the rule: "The wrapper generator wraps every method of a class that it is given, the private methods too. If a type has no Fortress counterpart, it fails the whole import. So give every method of a helper class a signature that maps to Fortress, also a private method." Not in the skill: the skips (constructors, static initializers, `byte`, `short`, arrays) and the `systemHelper` example.
- Disposition: reorganize. Add the skips to `compiler.md:129`, then leave FACTS; row 368 holds the refusal.
- Where the cut text lives now: `compiler.md:129`; row 368; `rung-default-rendering/REPORT.md`, "The repair round".

### F-107, "Three heaps run the interpreter, and a gated test can pass at two of them and die at the third." (891 characters)

- Scope: pass. Present meaning: pass.
- Evidence: pass, observed. The values hold: `bin/fortress:28-29` (`-Xmx256m  -Xss32m`), `build.xml:141` (`junitMem` 768m), `env.sh:8` (`-Xmx4g -Xss64m`), `bin/run:33-34` (`-Xmx1536m`). Row 67 is `NEGATIVE-VERIFIED` and holds the 2M-element array.
- Comprehension: pass. Ownership: pass. Consistency: pass.
- Repeats: `interpreter.md:156`, nearly whole: "If `JAVA_FLAGS` is not set, `bin/fortress` uses `-Xmx256m -Xss32m`. Your setup gives a 4 GB heap, and the test harness uses 768 MB. A test can pass at two of these heaps and die at the third. If you claim that a run fails near a memory limit, measure the claim at 256 MB". `tests-running.md:33` holds testFast's 4 GB. Not in the skill: a compiled run's 1536 MB from `bin/run`.
- Disposition: reorganize. Move the `bin/run` sentence into `compiler.md`'s part on running, then leave FACTS.
- Where the cut text lives now: `interpreter.md:156`; `tests-running.md:33`; row 67; `rung-int-semantics-walk/REPORT.md` sections 3 and 4.4. `sources.md:116` and `:182` cite this entry by title.

### F-108, "The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program." (712 characters)

- Scope: pass. Present meaning: pass.
- Evidence: pass, observed (`rung-wrap-operators/JUDGE.md` sections 3 to 5 exist). Row 430 is `NEGATIVE-VERIFIED`: "it varies from run to run, and with the JVM's flags and the library's contents".
- Comprehension: pass. Ownership: pass.
- Consistency: fail, with the skill. `interpreter.md:109`: "On one core, the order is fixed for a given library, but a library edit can change it." F-108: "The three were always set together, so which of them fixes the order is not known." The skill names one of the three flags as the cause; the entry and row 430 do not.
- Repeats: `interpreter.md:109` (with the overstatement above) and row 430.
- Disposition: reorganize. Correct `interpreter.md:109` to the three flags, then leave FACTS. `sources.md:164` gives F-108 as the source of that skill line, so repoint it to the JUDGE sections.
- Where the cut text lives now: `interpreter.md:109`; row 430; `rung-wrap-operators/JUDGE.md` sections 3 to 5.

### F-109, "Two gated walk tests are refused by the compiler until the switch-over ..." (541 characters)

- Scope: fail. "Two gated walk tests are refused by the compiler until the switch-over": under the one library, both compile and pass on the compiled path today.
- Present meaning: fail. "Neither file is in the list of the gate's step 7 (`compile-ladder/gate/suite-compiled.tsv`)." Both are listed, under `one`, since `3a0bae976c` (2026-11-24 05:47 UTC), and both passed at batch 36's gate. The entry was last rewritten at 01:48 the same day (`FACTS-history.md:9766`).

      $ grep -n "CoercionRedispatchRungC\|expTest" explorations/compile-ladder/gate/suite-compiled.tsv \
            explorations/compile-ladder/climb-batch-36/gate/suite-compiled/verdicts.tsv
      explorations/compile-ladder/gate/suite-compiled.tsv:37:tests/CoercionRedispatchRungC.fss	one
      explorations/compile-ladder/gate/suite-compiled.tsv:229:tests/expTest.fss	one
      explorations/compile-ladder/climb-batch-36/gate/suite-compiled/verdicts.tsv:23:tests/CoercionRedispatchRungC.fss	one	listed	PASS
      explorations/compile-ladder/climb-batch-36/gate/suite-compiled/verdicts.tsv:209:tests/expTest.fss	one	listed	PASS

  The prelude part still holds: the prelude's `BIG +` takes no static argument (`Library/CompilerLibrary.fsi:178-179`), and `grep -c asFloat` prints 0 for each of the four prelude apis.
- Evidence: fail; the list contradicts the passage above.
- Comprehension: fail. "`SUM[\ZZ32\]`, an approved test line": who approved it, and why it matters here, is not said.
- Ownership: pass.
- Consistency: fail, with F-97 ("a tried one that passes joins it") and with the list.
- Disposition: reword to the present: the prelude lacks the two spellings, and step 7 runs both programs under the one library. Or leave FACTS: the list and its verdicts hold the present, and nothing points to F-109.
- Where the cut text lives now: `suite-compiled.tsv:37`, `:229`; `rung-flat-tower/REPORT.md` section 15.

### F-111, "The checker-count and distance stages read only the compiler's phases ..." (1,364 characters)

- Scope: pass. The conclusion holds: no phase of walk is run by either stage.
- Present meaning: fail. "The count stage calls `Shell.compilerPhases` with `PhaseOrder.compilerPhaseOrder`. The distance stage calls it with that list's first six phases, up to the type check." Since 2026-10-24 the count stage runs `WorldFlip -stop check`, the same six phases as the distance stage:

      $ grep -n "WorldFlip -stop" explorations/coordinator/tools/checker-count/run.sh
      23:# The run stops after the type checker (WorldFlip -stop check), since 2026-10-24 (climb batch
      97:       -cp "$SCRATCH/classes:$CP" WorldFlip -stop check "$TARGET" ) > "$SCRATCH/run.txt" 2>&1
      $ sed -n '52,54p' explorations/coordinator/tools/checker-count/WorldFlip.java
              int n = Arrays.asList(order).indexOf(PhaseOrder.TYPECHECK);
              if (n < 0) throw new RuntimeException("no TYPECHECK in the phase order");
              return Arrays.copyOf(order, n + 1);

  The entry was last rewritten on 2026-10-30 (`FACTS-history.md:4935`), after that change.
- Evidence: fail in part. "`checker-count/WorldFlip.java:25` and `:42`": `:25` is the class line and `:42` is `Shell.setTypeChecking(true)`; the order is set at `:28` and `:36`, and the call is at `:46`. The other citations hold: `DistanceMulti.java:40-43`, `distance/run.sh:127`, `PhaseOrder.java:125-147`.
- Comprehension: pass, but long.
- Ownership: pass. Most of its length is the code tour (question 4).
- Consistency: pass. The coordinator skill's `batch.md:63` (`STAGE_BLIND`) builds on it.
- Disposition: reword. Both stages run the compiler's phases through the type check; cut the code tour to the stages' headers and the report.
- Where the cut text lives now: `checker-count/run.sh:20-25` and `WorldFlip.java:10-17` (the phase lists); `coordinator/references/batch.md:63` (the rule); the history.

### F-112, "The test corpora cite the specification by file and section, never by line." (798 characters)

- Scope: pass. Present meaning: pass. Evidence: pass. The command still prints nothing, also over `one_library_tests`:

      $ cd ProjectFortress && grep -rnE '\.tex:[0-9]+' tests compiler_tests library_tests other_compiler_tests parser_tests one_library_tests ; echo "grep exit=$?"
      grep exit=1

- Comprehension: pass. Consistency: pass.
- Ownership: fail. The entry holds three things: the fact (no test names a line), a worker rule ("A rung that renames or removes a cited section updates the citation in the same commit"), and history ("Source: the one-time strip of `.tex` line numbers, commit `dc0eee2fe`").
- Repeats: `tests-writing.md:139` ("cite the specification by file and section or entry, never by line") and `specification.md:62` ("If your change renames or removes a section that a test names, update that citation in the same commit"). The entry itself points to `tests-writing.md`.
- Disposition: reorganize: leave FACTS. The strip's commit goes to the history.
- Where the cut text lives now: `tests-writing.md:139`; `specification.md:62`; commit `dc0eee2fe`.

### F-113, "A harness run against another build's classes must point `FORTRESS_CACHES` at that build's caches ..." (508 characters)

- Scope: pass. Present meaning: pass. `bin/run_classpath:28-30` and `bin/fortress_classpath:30` take the caches folder from `FORTRESS_CACHES`.
- Evidence: fail, kind unstated. The cited section (`rung-return-type-rule/REPORT.md`, section 4, line 90) records a base run with `FORTRESS_CACHES` set, not the failure without it. `worktrees.md:71` holds the failure's message.
- Comprehension: pass. Ownership: pass. Consistency: pass.
- Repeats: `worktrees.md:71`, whole:

      71:The `run` step of a compiled `.test` is a separate `bin/fortress run` process. It inherits `FORTRESS_HOME` and `FORTRESS_CACHES`, and takes its class path from `FORTRESS_CACHES`. If you compose a harness run by hand with `-Dfortress.caches=<folder>`, set `FORTRESS_CACHES` to the same folder. Otherwise the `run` step fails with "Could not load ... Resource not found".

- Disposition: reorganize: leave FACTS.
- Where the cut text lives now: `worktrees.md:71`.

### F-114, "`ant testSpecData` runs 130 of the specification's 133 extracted examples under walk ..." (535 characters)

- Scope: fail. "130 of the specification's 133 extracted examples" and "not `library/`'s three": `SpecData/examples/library/` holds five since `73213e4be4` (2026-11-16), which added `HelloWorld.shadow.fss` and `Zeepf.compile.fss`. Both are extracted examples: `Specification/preliminaries/overview.tex:147` and `:275` `\input` them.

      $ for s in basic preliminaries advanced library; do echo "$s $(find SpecData/examples/$s -name '*.fss' | wc -l)"; done
      basic 71
      preliminaries 43
      advanced 16
      library 5

- Present meaning: fail, by the same passage. The entry's last change was on 2026-10-13.
- Evidence: fail in part. The run's 130 holds: batch 36's `summary.txt` gives `specdata/SpecDataJUTest 130 0 0 0`, and `SpecDataJUTest.java:30-32` names the three folders. The 133 and the three do not hold.
- Comprehension: pass. Ownership: pass.
- Consistency: pass. P-124 ("F-114 says which 130 it runs") and `tests-running.md:24` agree on 130.
- Repeats, in part: `tests-running.md:24` ("`ant testSpecData` runs the specification's 130 extracted examples (`SpecData/examples/basic`, `preliminaries`, `advanced`) under walk ... The gate runs it after the two suites."). P-124 and F-170 point to F-114.
- Disposition: reword: 130 of 135, and `library/`'s five.
- Where the cut text lives now: nothing need be cut. `tests-running.md:24` holds the run's folders and count.

### F-203, "`explorations/experiment/env.sh` sets up a shell for the gate's runners ..." (1,539 characters)

- Scope: pass. Present meaning: pass. `env.sh:4-8` sets `FORTRESS_HOME`, unsets `JAVA_TOOL_OPTIONS`, and sets `FORTRESS_THREADS=1` and `JAVA_FLAGS`; `:12-20` deletes a parser folder only on the stated rule. Each named driver sources it (`run-ladder.sh:20`, `baseline-2026-09-19/microgpt-phase.sh:5` by absolute path, `repair-r1-atomic-static/run-subset.sh:24`) and sets its own `JAVA_FLAGS` after it (`:26`, `:10`, `:30`). `suite-compiled/run.sh:56` rewrites the copies' `source` line. The two stages' `run.sh` headers (`checker-count/run.sh:11`, `distance/run.sh:12`) tell the caller to source it.
- Evidence: pass, read in the scripts.
- Comprehension: pass.
- Ownership: pass, but the list of drivers and their copies is detail for the work (question 4).
- Consistency: pass. `build-and-caches.md:28-31` agrees.
- Repeats: `build-and-caches.md:15-33` (the same settings, and the worker's setup lines in place of `env.sh`) and `:25` (a `FORTRESS_HOME` that names another tree runs that tree's code).
- Disposition: reorganize. Keep the fact: `env.sh` sets `FORTRESS_HOME` from its own place, so sourcing another tree's `env.sh` runs that tree's code, and the stages' scripts expect it sourced. Cut the driver list and the worker rule. F-99 points here.
- Where the cut text lives now: `build-and-caches.md`, "Setting up each call"; the drivers' own lines; `build-efficiency.md` section 4.3.

### F-234, "A Fortress command that a worker types itself ... starts a fresh JVM ..." (1,221 characters)

- Scope: pass. "What runs inside the suites and the stages was not measured" bounds it.
- Present meaning: pass. "In one measurement over 267 worker transcripts" bounds it; the date, 2026-10-16, is only in the report's header comment.
- Evidence: pass, measured. `process-engineering/fresh-jvm-commands.md`, "Summary" (`:8-11`), holds 17.5 %, 47.8 %, 6.4 % and 1.8 %.
- Comprehension: pass.
- Ownership: fail. Two subjects: how the suites start their JVMs (a fact of the harness), and the share of the workers' time that one-off commands take (the ground of P-150).
- Consistency: pass. P-150 agrees and points here.
- Disposition: reorganize. Keep P-150's ground, the 1.8 % at most from one measurement, and the JVM structure in a sentence; the other shares go to the report.
- Where the cut text lives now: `fresh-jvm-commands.md`, "Summary", "What a resident compiler could save, at most"; P-150.

### F-283, "The 52 programs of the team's `DemoTests` reach their end under walk." (989 characters)

- Scope: pass. `FileTests.java:814-819` gives `tennisRanking` its three files.
- Present meaning: pass. It is bound to the code of `4445d848b` (2026-11-07), and batch 36's gather printed the same line on its merged build (`climb-batch-36/RECORD.md:78`: "the driver's last line, 'demos: 52 run, 52 reached their end'").
- Evidence: pass, a command and its output. Rows 986 and 817 are both `NEGATIVE-BOUNDED` and agree.
- Comprehension: pass. Ownership: pass, though "a batch that changes walk or its library runs them again (P-79)" copies a rule.
- Consistency: pass.
- Repeats: `tests-running.md:58-63` (the driver, how to print it, when to run it, its last line, what "reach their end" means); P-79 (the demos are kept running).
- Disposition: reorganize. Keep the fact with its exceptions (`Generator2Demo`'s overflow, row 986; `trips.fss` refused by the checker, row 817), and point to `tests-running.md` for the driver and to P-79 for the rule. P-79 and PLAN cite F-283.
- Where the cut text lives now: `tests-running.md`, "Outside the gate"; P-79; `rung-team-demos/REPORT.md` sections 3 and 13.

### F-295, "The distance stage counts each api's own errors and crashes ..." (706 characters)

- Scope: pass. Present meaning: pass.
- Evidence: pass, read and tested. `test_classify.py:221` holds `class Readings`; `table.py:54-67` and `:94-104` hold the readings; `table.py` holds no `COMPONENT-CRASH`.
- Comprehension: fail. "`table.py` turns `#total` into `none:` for an api whose `@@TC API` line gives `errors=` above 0 and that printed no `@@SC` line of its own": the `@@TC` and `@@SC` lines are defined neither in the entry nor in the skill (`compiler.md:250-251` defines `#total` and `#stopped` only).
- Ownership: pass. Three line ranges of `table.py` and `shadow-patch.py:111-113` are detail for the work (question 4).
- Consistency: pass.
- Disposition: reword. Say in words what the stage reports for an api with errors that only a later target checks, and for an api's crash; leave the lines to the report.
- Where the cut text lives now: `rung-list-imports/REPORT.md` sections 1 and 2; `table.py`'s comments.

### F-354, "Two compiles of one source by different builds of the compiler need not give the same bytes ..." (926 characters)

- Scope: fail. "Two cold compiles of the prelude by one build give equal classes, 590 of 590, because the default identity hash is the same sequence in each run." The cited section shows this for the base build's code. For the probe's own tree, two compiles of one build differed:

      $ sed -n '129p;132,133p' explorations/compile-ladder/plan-31/probes/probe-y.md
          base build's jars against the base build's code, compiled again cold:        590 classes, 590 equal
          this tree's CompilerBuiltin, compiled twice:                                 312 classes, 16 differ
          the base build's code with -XX:hashCode=0, and with =1:                      312 classes, 18 differ each

  The probe does not say whether those two compiles were cold; a rewriter states both lines as measured.
- Present meaning: pass. "Measured once, on `832f7d0d91`'s code" bounds it.
- Evidence: pass. The section exists (`probe-y.md:125`), and row 996 (`NEGATIVE-VERIFIED`) agrees.
- Comprehension: pass. Ownership: pass. Consistency: pass.
- Disposition: reword. Bound the equal compiles to the base build's code, and add the 16 of 312. The meaning, that the tests and not the bytes show a change left the prelude alone, holds and grows.
- Where the cut text lives now: nothing need be cut beyond the 590 and the 18 of 312, which `probe-y.md` section 6 holds.

### F-383, "Walk's harness counts a static error that a phase raises before the run ... as a refusal at load ..." (587 characters)

- Scope: pass. Present meaning: pass.
- Evidence: pass, read and tested. `FileTests.java:875-885` (`thrownAtLoad`: `if (t instanceof StaticError) return true;`); `tests/TypecaseUndefinedArmWalk.test` holds `load_exception_contains=NoSuchTypeHere is undefined`.
- Comprehension: pass.
- Ownership: fail. "A compiled refusal test is still `XXX`-named: a plain-named compile test is red whenever the compile reports errors." is a second subject, the compiled harness, which is F-103's.
- Consistency: pass.
- Repeats: `tests-writing.md:45` ("A failure while the top-level variables are initialised, or a static error of a phase before the run, such as the disambiguator's, counts as a refusal.") and `:107` (a refusal at compile time is one `XXX` compile test); F-103; F-102's sentence on the `.test` file.
- Disposition: reorganize: leave FACTS.
- Where the cut text lives now: `tests-writing.md:45` and `:107`; `rung-typecase-unbound-arm/REPORT.md`, "10. Decisions".

### F-404, "`explorations/coordinator/tools/seed-worktree.sh` copies `ProjectFortress/build` and ... `ProjectFortress/build-one` ..." (1,176 characters)

- Scope: pass. Present meaning: pass.
- Evidence: pass, read, with a command and its output. `seed-worktree.sh:91-93` and `:101-108`, and `build.xml:400-402` and `:469-470`, hold what the entry says; `build.xml:569-570` prints the quoted line.
- Comprehension: pass.
- Ownership: fail. "without it, in a worktree seeded from a base build that has `build-one` the first target prints 'Sources and build as the last build left them? no', rebuilds the Scala and starts both ... again, empty; a compiled run ... stops, 'java.lang.Error: ...'" tells the defect that the fix removed (question 3), with a run's message (question 4).
- Consistency: pass.
- Repeats: `worktrees.md:36`: "The script also copies the one library's build, `ProjectFortress/build-one`, and its caches, `default_repository/caches-one`."
- Disposition: reorganize: leave FACTS.
- Where the cut text lives now: `worktrees.md:36`; `seed-worktree.sh:88-108`; `rung-boolean-equivalence/REPORT.md`, "Defects, and their homes".

## Found beside the entries

These are not entries of the section, but a consolidation that moves text into the skill meets them.

- `fortress-repo`'s `interpreter.md:109` says "On one core, the order is fixed for a given library". The evidence behind it (F-108, row 430) holds three flags set together, of which one sets the core count; which one fixes the order is not known.
- `build-and-caches.md:113` names two caches folders that `ant compileAll` keeps or empties, and `:114` says that `ant cleanCache` "deletes both folders". `build.xml` handles three: `default_repository/caches`, `default_repository/caches-one` and `local_repository/caches` (`build.xml:43`, `:47`, `:51`, `:369-382`, `:890-892`).
- `tests-running.md:24` says "the specification's 130 extracted examples". 135 are extracted; `ant testSpecData` runs 130.
- `sources.md` cites several entries of this section by titles that FACTS no longer holds. For example `grep -c "deletes a tracked file" explorations/coordinator/FACTS.md` prints 0 (cited at `sources.md:46`, `:70`), and so does `grep -c "and sourcing .env.sh"` (cited at `:145`). A consolidation that moves these entries out must repoint those lines in any case.
- P-124 says that every example of the specification must pass, and points to F-114 for the 130 that run. The five examples of `library/` run in no suite. This chunk did not judge P-124.

## What I could not check, and why

The brief allows no build, suite or test run. Each claim below needs one; it is not checked, and the command that would check it is given. Where a landed run already holds the result, it is named.

- F-98, a misspelt key checks nothing: a `.test` with `run_out_contians=PASS` over a program that prints nothing, through `junit.sh`; it should pass.
- F-99, `TimingRungT` overflows in 8 of 12 at four threads without `JAVA_FLAGS`: twelve runs of `env -u JAVA_FLAGS FORTRESS_THREADS=4 bin/fortress run TimingRungT` after its link, from `ProjectFortress/`.
- F-100, the symptom after a deletion and the library order's two minutes: `ant cleanCache`, then `bin/fortress run` of a compiled program, then the library order (`build-and-caches.md`). Also that a `fortress compile` after a rebuild of the compiler does not clear the caches.
- F-101, the cache's reuse: `harness-one.sh` twice on one test, reading the first line, `cache filled` or `cache empty`.
- F-103 and F-104, the verdicts "Saw wrong failure" and the exception stream: `junit.sh` on an `XXX` compile test whose program compiles, and on a `compile_exception_contains` test. Batch 36's gate ran the 36 tests that use the key, all green.
- F-106, the refusal of a whole import: a `nativeHelpers` class given a private method with a `Class<?>` parameter, rebuilt, then a library compile.
- F-107, the stop at 256 MB: `JAVA_FLAGS="-Xmx256m -Xss32m" bin/fortress` on the old `IntSemanticsRungI.fss` (`rung-int-semantics-walk/REPORT.md` section 3).
- F-108, the order's variation: an ambiguity test run several times with and without the three JVM flags.
- F-109, the prelude's refusal: `bin/fortress compile tests/expTest.fss` from `ProjectFortress/`, without `FORTRESS_LIBRARY=one`.
- F-111, that edits under the named paths cannot move the counts: both stages run before and after such an edit. The claim is a reading of the code; I read the phase lists only.
- F-113, the failure without `FORTRESS_CACHES`: a compiled `.test` with `run`, by the `java` line of `harness-one.sh` with `-Dfortress.caches` and no `FORTRESS_CACHES`.
- F-114, that all 130 pass: `ant testSpecData`. Batch 36's gate holds 130 tests, 0 failures.
- F-203, that its deletion rule spares a live run: two shells, one running a grammar-importing program, one sourcing `env.sh`.
- F-234, the shares of worker time: `measure.py` of `fresh-jvm-commands.md` over the transcripts; not rerun.
- F-283, the 52 demos: the demo driver (`tests-running.md`, "Outside the gate"), about 20 minutes. Batch 36's gather printed 'demos: 52 run, 52 reached their end'.
- F-295, its test: `python3 explorations/coordinator/tools/distance/test_classify.py`. It needs no build, but it is a test run, so I did not run it.
- F-354, the bytes of two compiles: the library order twice into two caches folders, then a class-by-class comparison of the jars, as `probe-y.md` section 6 did.
- F-383, its test: `harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/TypecaseUndefinedArmWalk.fss ProjectFortress/tests/TypecaseUndefinedArmWalk.test`.
- F-404, the seeded build kept: `seed-worktree.sh` into a new worktree, then `ant compileAll`, reading 'Sources and build as the last build left them? yes'.

Read only by heading, not in full: the report sections that F-103, F-105, F-106, F-107, F-108, F-109, F-283, F-295 and F-404 cite. Of the histories, I read only the provenance lines of F-100, F-109, F-111 and F-114, to date their last rewrite.
