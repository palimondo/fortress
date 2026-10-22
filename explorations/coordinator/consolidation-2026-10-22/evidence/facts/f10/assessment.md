<!-- Chunk f10 of the FACTS clarity assessment: F-105 to F-109, F-111 to F-114, F-203, F-234 and F-117, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `a898e1baf` (FACTS is the same at `4caa90c81`). -->

# FACTS chunk f10: assessment

The base is `main` at `a898e1baf`. FACTS did not change up to `4caa90c81`. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the reports, the tests, the build file, the scripts and the code. I ran no experiment and searched no transcript.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-105 | pass | pass | pass | pass | pass | pass | keep |
| F-106 | **fail** | pass | pass | pass | pass | pass | **reword** |
| F-107 | **fail** | pass | pass | pass | pass | pass | **reword** |
| F-108 | **fail** | pass | pass | pass | pass | pass | **reword** |
| F-109 | pass | pass | pass | pass | pass | pass | keep |
| F-111 | pass | pass | **fail** | **fail** | pass | pass | **reword** |
| F-112 | pass | pass | **fail** | pass | pass | pass | **reword** |
| F-113 | pass | pass | pass | pass | pass | pass | keep |
| F-114 | pass | pass | pass | pass | pass | pass | keep |
| F-203 | **fail** | pass | **fail** | pass | pass | pass | **reword** |
| F-234 | **fail** | pass | pass | **fail** | pass | pass | **reword** |
| F-117 | pass | pass | pass | pass | pass | pass | keep |

Counts: keep 5, reword 7, reorganize 0, investigate 0. For each fail, the code or the cited report shows the correct statement, so no question has to be settled first. Each fail is in the wording of a claim whose meaning is supported. None is a difference of surface form.

## F-105, `testSystem`'s four shards

- **Scope: pass.** The title and the body agree: the claim covers the four `testSystem` shards and a change to `tests/`.
- **Present meaning: pass.** It states the current sharding rule and how the gate compares the shards.
- **Evidence: pass.** `FileTests.java:907-923` sorts the names and keeps index `j` when `j % shardCount == shardIndex`. `build.xml:1414-1453` (the `systemShard` macro, shards `0/4` to `3/4`) wires it. `gate_compare` (`gate-functions.sh:46-58`) maps `system-<i>/` to one key and sums the rows before it compares. `climb-batch-2/JUDGE-gate.md` section 1 holds the reconstruction. The line numbers in that section are older, but its mechanism is the same.
- **Comprehension: pass.** "Interpreter corpus" is the term that F-102 also uses. One small point: the sorted list holds every top-level entry of `tests/`, not only test files. This does not change the consequence.
- **Ownership: pass.** One subject. The `fortress-repo` skill's `gate.md:103` gives the same rule and cites this entry.
- **Consistency: pass.** It agrees with `gate.md` and F-99.
- **Disposition: keep.**

## F-106, the native-wrapper generator

- **Scope: fail.** The title says the generator wraps every method, but the code skips some methods. Quoted: "wraps every method of a class that `import java` names, private ones too". `FortressMethodAdapter.visitMethod` (`:215-225`) skips `<init>`, `<clinit>` and every method whose descriptor holds a byte, a short or an array (`SignatureParser.unsayable`, `SignatureParser.java:45-85`). The report ("The repair round") and ledger row 368 both state this exception. A private helper with an array parameter is skipped, not refused, so the consequence "a `nativeHelpers` helper needs a signature that maps to Fortress, even when private" is broader than the code. Such a helper is safe, but the rule as stated is wrong for it.
- **Present meaning: pass.**
- **Evidence: pass.** `toImplFFFF` throws `Error("No Fortress type (yet) for foreign Java type descriptor ...")` (`FortressMethodAdapter.java:250-258`). The report records the failed rebuild with `Class<?>`. Row 368 agrees.
- **Comprehension: pass.**
- **Ownership: pass.** One subject. The second constraint was moved to F-104 at the consolidation.
- **Consistency: pass.** It agrees with row 368, apart from the exception that row 368 states and this entry leaves out.
- **Disposition: reword.** Keep the exception with the claim. For example: "wraps every method but constructors and those whose descriptor holds a byte, a short or an array, private ones too".

## F-107, the heaps

- **Scope: fail.** The title and the body disagree on the path. The title names three heaps that run the interpreter. The body then adds a fourth setting, which is for compiled run steps and not for the interpreter. Quoted: "Three heaps run the interpreter" and "`testFast`'s compiled run steps get 4 GB with 64 MB stacks." The consequence is correct for both paths: `bin/fortress run` also starts at 256 MB when `JAVA_FLAGS` is not set. But the title gives the reader only the interpreter.
- **Present meaning: pass.**
- **Evidence: pass.** `bin/fortress:28-29` (`-Xmx256m -Xss32m` when `JAVA_FLAGS` is unset). `build.xml:132` (`junitMem` 768m), which the `systemShard` and `fastTrack` macros use as `maxmemory`. `env.sh` (`-Xmx4g -Xss64m`). `fastTrack`'s `JAVA_FLAGS` env (`build.xml:1187-1188`). `rung-int-semantics-walk/REPORT.md` sections 3 and 4.4: `IntSemanticsRungI.fss:93` passed at 4 GB and at the harness's 768 MB, and died with `OutOfMemoryError` at 256 MB.
- **Comprehension: pass.** One small point: 768 MB is the heap of every JUnit suite JVM (`junitMem`), not only of `testSystem`.
- **Ownership: pass.** Note: F-99 also states `fastTrack`'s `JAVA_FLAGS` pin. The two entries agree, but the pin is kept in two places.
- **Consistency: pass.** It agrees with F-99 and row 67.
- **Disposition: reword.** Make the title cover the compiled run step, or replace the `testFast` sentence with a pointer to F-99.

## F-108, the order of the overload-ambiguity message

- **Scope: fail.** The entry gives the fixed order to one core, but the evidence fixed three flags at once. Quoted: "On one core it is fixed for a given library". The judge's section 5 says that the default runs and the pinned runs "differ in three flags at once (`-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1`)". It also tells the gather not to write that the order varies with the thread count. The entry's text from the consolidation listed all three flags. The current text reduces them to "one core", which is the error the judge corrected. Ledger row 430 says "one core fixes it" too, so the rewrite should check the row as well.
- **Present meaning: pass.**
- **Evidence: pass.** `JUDGE.md` section 3 has 11 of 16 runs in one order under default flags. Section 5 has the pinned runs and the rung's edit, which flips the order. Section 4: the harness reads only that the `XXX` file fails.
- **Comprehension: pass.**
- **Ownership: pass.** The routing sentence points to its home, the `coordinator` skill's `references/batch.md`, "Reserved points and repairs" (second bullet).
- **Consistency: pass.** It agrees with row 430 and `batch.md`.
- **Disposition: reword.** Say "with the JVM pinned (serial GC, tier-1 compilation, one processor)" instead of "on one core".

## F-109, two walk tests the compiler refuses

- **Scope: pass.** It names the two files and the two spellings, and limits the claim to the time before the switch-over.
- **Present meaning: pass.** The switch-over has not come (F-53: distance 5).
- **Evidence: pass.** `CompilerLibrary.fsi:180-181` declares `opr BIG +` with no static parameter. No `Compiler*` file declares `asFloat`, and `FortressLibrary.fsi:289` does. `CoercionRedispatchRungC.fss:43` writes `SUM[\ZZ32\]`. `expTest.fss:25` calls `asFloat`. Neither file is in `baseline-2026-09-19/pass-list.txt` (grep). The interpreter's library declares `SUM` with a static parameter (`FortressLibrary.fsi:1984-1986`), so the files can compile after the switch-over. `rung-flat-tower/REPORT.md` section 15 holds the detail.
- **Comprehension: pass.** "An approved test line" is the curator's answer 7, which the history names. A reader can see that the line may not be respelled.
- **Ownership: pass.**
- **Consistency: pass.**
- **Disposition: keep.**

## F-111, what the checker-count and distance stages read

- **Scope: pass.** The title's claim holds: both stages call `Shell.compilerPhases` (`WorldFlip.java:42`, `DistanceMulti.java:64`) over `PhaseOrder.compilerPhaseOrder` (`PhaseOrder.java:137-147`), and no phase of that list is walk's.
- **Present meaning: pass.**
- **Evidence: fail.** Two problems:
  - The route to the detail is circular. Quoted: "Detail: `coordinator/climb-batch-workflow.md`, "Rules weighed by what they cost against what they protect", item 5." Item 5 holds only the rule and a cost from batch N. The `STAGE_BLIND` paragraph that it points to (`climb-batch-workflow.md:230`) cites F-111 as its reason. The code reading itself, with its line numbers, is only in FACTS-history (block at `:1771`). The entry also does not say that the claim comes from reading the code.
  - The supporting list is wrong in two places. Quoted: "Outside `interpreter/`, only walk's own commands, the `ENVGEN` phase that only they run, exception field types and unused code name walk's evaluator". No phase order runs `ENVGEN`: walk's own order has it commented out ("Disabled because we are not using them", `PhaseOrder.java:133-134`). Also, the list leaves out the test harness (`tests/unit_tests/FileTests.java`, `TransactionJUTest.java`, `TestTask*.java`) and `repository/CacheBasedRepository.java:148`, which reaches walk's `BaseEnv` through `compiler/environments/SimpleClassLoader`. These omissions do not change the title's claim. `reloadEnvironment` only adds a name to a set (`SimpleClassLoader.java:36-38`), and `NamingCzar` reads only `TopLevelEnvGen`'s string constants. But the "only" sentence is not true as it stands.
- **Comprehension: fail.** Quoted: "an edit to the test corpora, the texts or walk's evaluator and natives" and "reads no test, text or record". The entry does not say what "the texts" are. `climb-batch-workflow.md:230` gives the paths: `Specification/`, `Documentation/`, `explorations/`.
- **Ownership: pass.** The `STAGE_BLIND` rule moved to the `coordinator` skill (`batch.md`, "The checker count and the distance"), and the entry no longer holds it.
- **Consistency: pass.** It agrees with `batch.md` and with `climb-batch-workflow.md:230`.
- **Disposition: reword.** Cite the code reading (`WorldFlip.java:42`, `DistanceMulti.java:64`, `PhaseOrder.java:137-147`) as the evidence, and say that it is a reading. Replace "the texts" with the paths. Make the "only" sentence correct, or cut it to "no phase in that list is walk's".

## F-112, how the test corpora cite the specification

- **Scope: pass.** The title says "never by line", and the body states the one exception next to it.
- **Present meaning: pass.**
- **Evidence: fail.** The cited source is a line of PLAN that now holds something else. Quoted: "Source: `coordinator/PLAN.md:402`." That line is now an item of climb batch 14's review list. The rule and the exception are recorded at `PLAN-history.md:391` (the strip of `.tex` line numbers in `dc0eee2fe`: 823 citations in 139 files, one left). `tests-writing.md`, "Names, comments, citations", holds the rule. The claim holds now: a grep for `\.tex:[0-9]+` over `tests`, `compiler_tests`, `library_tests`, `syntax_abstraction_tests`, `static_tests` and `not_passing_yet` finds one file, `library_tests/IntLiteralArithRung7.fss:19`.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** It agrees with F-162 (cite the `.fsi` line, not the generated listing).
- **Disposition: reword.** Point the source to `PLAN-history.md`, "The one-time strip of `.tex` line numbers ..." (or to commit `dc0eee2fe`), and to the skill's `tests-writing.md`.

## F-113, `FORTRESS_CACHES` for a harness run against another build

- **Scope: pass.**
- **Present meaning: pass.**
- **Evidence: pass.** `FileTests.java:542-563` starts `bin/fortress` as a separate process for a `run` step. `bin/run_classpath:25-26` builds its class path from `FORTRESS_CACHES`, and uses `$FORTRESS_HOME/default_repository/caches` when the variable is not set. `rung-return-type-rule/REPORT.md:90` (section 4) records the base run with `FORTRESS_CACHES` set to the base's caches. Note: the quoted failure text is not in that report. The code produces it (`MainWrapper.java:74`, "Could not load "; `InstantiatingClassloader.java:152`, "Resource not found : "). The rewrite could cite these lines with `bin/run_classpath:25`.
- **Comprehension: pass.** "The tree's own classes" are the classes of the tree that `FORTRESS_HOME` names. A reader who knows how a worktree runs the base build can follow it.
- **Ownership: pass.** The skill's `worktrees.md:71` gives the same rule. The entry points to it.
- **Consistency: pass.**
- **Disposition: keep.**

## F-114, `ant testSpecData`

- **Scope: pass.** "130 of the specification's 133", "under walk", "as a gate step". `SpecDataJUTest.java:30-38` runs `basic`, `preliminaries` and `advanced`. A built tree's `SpecData/examples/` (`/home/user/fortress-gather20/SpecData`) has 71 + 43 + 16 = 130 `.fss` files in these three, and 3 in `library/`.
- **Present meaning: pass.** The count that changes points to the gate's `summary.txt`. The last landed summary (`climb-batch-20/gate/summary.txt:56`) has 130 tests and 0 failures.
- **Evidence: pass.** `build.xml:1229` excludes the class from `testFast`. F-143 and row 424 hold the five examples' dependence on the open parameter.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** It agrees with P-124, F-143 and F-170.
- **Disposition: keep.**

## F-203, `env.sh`

- **Scope: fail.** Quoted: "The checker-count and distance runners, the ladder subset and `microgpt-phase.sh` source it." Two of the four do not source it. `checker-count/run.sh:11` and `distance/run.sh:11` say only, in their headers, that the caller must run them with `env.sh` already sourced. The gate role of `climb-batch-workflow.js` tells the agent to read the header and then run the script (`:1105-1107`). It does not source `env.sh` itself. The ladder subset (`repair-r1-atomic-static/run-subset.sh:24`), `run-ladder.sh:20`, `baseline-2026-09-19/microgpt-phase.sh:5` and `experiment/setup.sh:33` do source it. So the title, "sets up a shell for the gate's runners", is true only for the scripts that source it, and for the stages when the caller does what their headers say.
- **Present meaning: pass.**
- **Evidence: fail.** This is the same passage. The history shows that the list came from a `git grep experiment/env.sh`. For the two stage runners, that grep finds header comments, not `source` lines.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** It agrees with F-101 (the removal's rule) and with `build-and-caches.md`, "Setting up each call".
- **Disposition: reword.** Say which scripts source it, and that the two stage runners expect their caller to have sourced it. One point that the rewrite may want to state: `microgpt-phase.sh:5` sources the main tree's `env.sh` by its absolute path. Because `env.sh` takes `FORTRESS_HOME` from its own place, a copy of that script run in a worktree sets `FORTRESS_HOME` to the main tree. This is a consequence of the entry's title, read from the two scripts, and was not run.

## F-234, fresh-JVM commands and a resident compiler

- **Scope: fail.** Quoted: "only a compiled test's run step starts a child JVM." `FileTests.ShellTest` (`:675-692`) also starts a process for a `.sh` test. `tests/concurrentPrinting.sh`, which `testSystem` runs, calls `bin/fortress`. It is one file, but the "only" is wrong.
- **Present meaning: pass.** It is stated as one measurement, over 267 worker transcripts.
- **Evidence: pass.** `fresh-jvm-commands.md`, "Summary" and "What a resident compiler could save, at most": 6.4 % of the agents' lifetime (at most), 1.8 % for the start-up, 47.8 % of the Bash wall time for the suites, builds and stages. `FileTests.java:762` runs a test through `Shell.subMain` in the same JVM.
- **Comprehension: fail.** The entry contrasts two shares that have different denominators. Quoted: "such commands took 6.4 % of the workers' time and their start-up at most 1.8 % (P-150), while the suites, builds and stages took 47.8 % of the command time." The 6.4 % is a share of the agents' lifetime. The 47.8 % is a share of the Bash wall time, where the same commands take 17.5 %. The report's own comparison is 2.7 times. A reader who compares 6.4 % with 47.8 % gets about 7.5 times. Also, the report gives 6.4 % as an upper bound ("at most"), and the entry states it as a value.
- **Ownership: pass.**
- **Consistency: pass.** It agrees with P-150.
- **Disposition: reword.** Compare the shares on one denominator (17.5 % against 47.8 % of the Bash wall time, or give both against the lifetime), keep "at most" on the 6.4 %, and name the `.sh` test as the other child JVM.

## F-117, the compiled mutable variable's cell

- **Scope: pass.** The title's claim, that a mutable variable of arrow type compiles and runs, has its limit beside it: no gated test runs one.
- **Present meaning: pass.** `MutableFValue.java:18-31` holds and passes `fortress.AnyType.Any`. `Transaction.java:20`, `:27-28` and `:144-152` use `Any`.
- **Evidence: pass.** `repair-r1-atomic-static/REPORT.md`, decision 1, records the probes: `P12Arrow` (top-level), and `P15LocalArrow` and `P16LocalArrowTask` (local), which got `VerifyError` with `FValue` and pass with `Any`. The entry's "sections 1 and 4" are the report's numbered decisions, under "The decisions". I checked the claim that no gated test runs one. None of the cell's tests has an arrow type. The one compiled test with a mutable variable of arrow type, `compiler_tests/Compiled9.p.fss:19`, is only type-checked (`AfterTypeChecking.test:18-22`). Note: `MutableTopLevelVar` also tests the cell and is not in the list. It also has no variable of arrow type.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** No other entry is on this subject.
- **Disposition: keep.**
