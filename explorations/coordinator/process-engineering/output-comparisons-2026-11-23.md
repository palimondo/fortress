<!-- The inventory of 2026-11-23, made at the curator's order of 22:35 UTC and his go of 22:54 UTC, of every place in the tree that runs, asks for, describes or reads a comparison of printed output with an earlier run or a baseline, its masks, the gate's ladder regression (step 7) and its results, and `count-run`, each with what removing step 7 and the comparisons changes there (delete, reword or keep), the readers of the ladder's progress measure, the count of its 85 programs that no compiled suite test runs, and the findings that would change a decision of the curator's. -->

# Output comparisons, the ladder regression and `count-run`: an inventory, 2026-11-23

Read-only work on `main` at `98ee0338e6`: nothing was built or run but `grep`, `facts-extract.sh`, `git` and one Python script that reads `.test` files (section 7). Searched: both skills (`.claude/skills/`), the batch workflow script and its manual, `tools/gate-functions.sh`, every tool under `explorations/coordinator/tools/`, the planner's generator of the last batch (`compile-ladder/plan-35/manifest/`), FACTS, POSITIONS, PLAN, the gap ledger, the review queue, the boot note and the README files. Histories, old batch records, gather records and reviews are left out, except where a line below says so.

The decision being carried out: P-103, "The suite's verdict is the check."; the coordinator skill's `references/batch.md:56`; the curator's words of 2026-11-23, 22:35 UTC, "There should be no comparison with previous runs", and his go of 22:54 UTC that the printed-output comparisons, their masks and step 7 go, `count-run` staying for a one-time count that a decision of his names (the brief; `explorations/coordinator/BOOT.md:16`).

## 1. Summary

- Places found: 12 to delete, 42 to reword, 19 to keep (section 2; a place is one passage, one function or one coupled set of lines). Section 5 adds 8 comparisons of runs that the brief does not name, kept until F2 is decided.
- The last gate that ran step 7 is climb batch 35b's (tables commit `1caac80b3b`, 2026-11-23 20:59 UTC): `ladder.tsv` holds 85 `pass`, `comparison.txt` and `microgpt-comparison.txt` are empty, and `summary.txt` has no `# ladder` line. No landed gate's comparison ever held a line: 0 of the 51 `climb-batch-*/gate/ladder/` folders (section 3.4).
- Of the 85 programs that step 7 compiles and runs, 79 are run on the compiled path by no compiled suite test; the other 6 have team ports of the same name in `other_compiler_tests/` that `atomicTest.test` runs (section 3.3). 3 of the 79 are in `not_working_library_tests/`, which nothing else runs on either path.
- The progress measure (UP, the phase table, microGPT's phase) is read by no skill and no script. Its one live reader is the chain F-97 → `PLAN.md:9` → `revival-page/update.py:163-166` → the revival page's line "microGPT on the compiler" (section 3.2).
- Two findings would change a decision of the curator's (section 6): F1, step 7 is the only compiled-path check of 79 programs and the only check of row 363's assertion; F2, his word of 22:35 read literally also reaches the comparisons of counts and measures with earlier runs, which his go did not name.

## 2. The places, by what each needs

Paths are from the tree's root. "The script" is `explorations/coordinator/climb-batch-workflow.js`; "the manual" is `climb-batch-workflow.md` beside it.

### 2.1 Delete

| # | Place | What it does or says | What removing step 7 and the comparisons changes |
|---|---|---|---|
| D1 | `.claude/skills/fortress-repo/references/gate.md:43` | Step 7: "Do the ladder regression." | Goes; the gate has six steps. |
| D2 | `gate.md:68-102`, "The ladder regression" | The 85 programs and the eighteen microGPT components; the marks DOWN, MISSING, STDOUT ("output that differs from the record after the `Operation took <n>ms` line is masked") and UP ("This is progress, not red"); DOWN, MISSING and STDOUT red unless declared; the `run-ladder.sh` warning (:83); how to run it; a change's own ladder subset compared with the newest landed `ladder.tsv` or the baseline's `raw/` (:102). | Goes whole. The `run-ladder.sh` warning has no other reader in the skill. |
| D3 | `gate.md:107` | The masks: `Operation took`, Java line numbers, identity hashes, moved library positions; "list each test with a masked difference". | Goes. `count-run`'s own masks stay in `compare-normalised.py`'s docstring (:17-27), which its users read. The masks' only standing source was P-123's clause, removed from POSITIONS on 2026-10-22 (`facts-extract.sh 'history:P-123'`, block of 2026-10-22 08:30Z). |
| D4 | `explorations/coordinator/tools/gate-functions.sh:66-90` | `ladder_filter` (the `Operation took` mask), `ladder_compare` (DOWN, UP, NEW, MISSING, STDOUT against the baseline's `ladder.tsv` and `raw/`), `mg_phases`. | Delete. D4 needs B14 in the same commit, or the scenario checker fails. |
| D5 | the script `:500` | The rung's step 10: "Your change's own ladder subset ... compared with the newest landed ladder.tsv." | Delete; step 11 becomes 10. |
| D6 | the script `:1133-1137` | The gate's step 7: `ladder_compare` and the `mg_phases` diff appended as `# ladder` lines, red on an undeclared DOWN, STDOUT or MISSING, the declared moves listed. | Delete. |
| D7 | the script `:1367`, `:1384` | `gateSuitesRole`: the baseline's path, and step 4, the ladder again when a repaired test file is a pass-list program. | Delete. |
| D8 | the script `:1189` | `GATE_SCHEMA.ladder`: "moves up, moves down, stdout differences, and which were declared". | Delete. Nothing in the script reads the field (`grep -n '\.ladder\b'` finds only the schema). |
| D9 | the script `:89-90`, `:182`, `:219`, `:257`, `:1108`, `:1137`, `:1364`, `:1395`, `:1843`, `:1909`, `:1997`, `:2001`, `:2021` | The manifest field `expectedMoves` ("ladder moves declared") and its path into `gateRole` and `gateSuitesRole`. | Delete the field, the parameter and the two lists. |
| D10 | the script `:1215` | Comment: "Whether the ladder reads one, its pass list says, which the gate reads." | Delete the sentence. |
| D11 | the manual `:241` | Step 7: "the 85 files of the baseline's pass list compared on phase and output, the `Operation took` line masked ... A DOWN, STDOUT or MISSING line is red unless a rung declared it." | Delete. |
| D12 | the manual `:23` | `expectedMoves` among the manifest's fields. | Delete with D9. |

### 2.2 Reword

| # | Place | What it does or says | How to reword |
|---|---|---|---|
| R1 | `.claude/skills/fortress-repo/SKILL.md:168` | The rule against comparing whole runs, with "The gate's comparisons, and a comparison of outputs that your brief asks for, are the exceptions (`references/gate.md`, "Comparing with an earlier run")." | Drop "The gate's comparisons". Narrow the other exception to "a one-time count of changed interpreter outputs that a decision of the curator names and your brief asks for", pointing to `count-run`'s new place (R7). |
| R2 | `SKILL.md:199` | The parts list: "the ladder regression, comparing with an earlier run". | Drop both phrases. |
| R3 | `gate.md:3` | "the seven steps below ... in about 25 minutes". | Six steps. Step 7 took about 200 s for the 85 and 35 s for the eighteen (`gate.md:99`), plus the two copies of the caches. |
| R4 | `gate.md:7`, `:9` | The summary holds "the ladder's comparison"; a landed gate's `ladder/` holds `ladder.tsv`, `microgpt-phase.md`, `comparison.txt`, `microgpt-comparison.txt`. | Drop both. |
| R5 | `gate.md:11` | "Steps 5 and 7 use shell functions ...". | Step 5 only. |
| R6 | `gate.md:34-38`, step 3 | "Then copy the caches twice for the ladder regression" and the three commands. | Keep the library-order sentence; drop the copies. |
| R7 | `gate.md:104-106`, `:108` | The section "Comparing with an earlier run": the shard bullet (:106, compare `testSystem` only as the sum of its four shards, as `gate_compare` does); the `count-run` bullet (:108, "If your brief asks you to compare the interpreter tests with a base run, use ..."). | The heading goes with D3. Move :106 into step 5, beside `gate_compare`, unless F2 removes that comparison. Move :108 to `tests-running.md`, "Outside the gate", and condition it on a one-time count that a decision of the curator names (section 4). |
| R8 | `.claude/skills/fortress-repo/references/build-and-caches.md:71` | The runs with private caches include "the gate's ladder regression (`gate.md`)". | Drop that item. |
| R9 | `.claude/skills/fortress-repo/references/sources.md:14`, `:65`, `:140`, `:161`, `:228`, `:303`, `:355-356`, `:518`, `:617`, `:624`, `:629` | The sources of the sentences cut above, among them ":14 The ladder stage as the one output comparison". `:161` and `:228` cite a POSITIONS title, "The gate's comparisons.", that POSITIONS no longer holds. | Cut or reword each line in the commit that cuts its sentence. |
| R10 | `.claude/skills/coordinator/references/batch.md:65` | "The gate's comparisons hide Java line numbers, identity hashes and moved library positions. Put every difference that they hid on the review list. Put there too each line of the team's tests that a rung rewrote to keep its checked value, with its before and after." | Delete the first two sentences. Keep the third as its own bullet: a respelled line of a team test is not a comparison of runs, and `tests-writing.md:140` asks for the same list. |
| R11 | `batch.md:70` | "An output that the base already varies from run to run, with the test's verdict unchanged, is a ledger row." | With no output comparison in a batch, only a one-time count can see such a variation. Scope it to that count, or delete it. |
| R12 | `.claude/skills/coordinator/references/sources.md:47-48` | "No comparison and no baseline: P-103's clause"; "Masked differences and respelled lines: P-123's clause". | Keep :47. In :48, drop "Masked differences", whose source P-123 was removed on 2026-10-22, and give the respelled lines their source. |
| R13 | `gate-functions.sh:1-27` | The header: "the shell functions of the gate's summary and of its ladder comparison", the three ladder functions, "steps 5 and 7". | Drop the ladder parts, in the commit of D4. |
| R14 | `explorations/coordinator/tools/workflow-scenarios.js:79`, `:82`, `:470` | `GATE_FNS` names `ladder_filter`, `ladder_compare` and `mg_phases`, and the check sources `gate-functions.sh` and fails unless all six are defined; `:470` refuses a gate prompt that defines one inline. | Drop the three names, in the commit of D4. |
| R15 | the script `:44` | The Gate phase's detail: "... the atomic runs, the ladder regression, the checker count ...". | Drop "the ladder regression". |
| R16 | the script `:310`, `:315` | The disk floor's reason names "the ladder's two copies of the caches"; `DISK_FLOOR_G.mainTree` is 4 G. | Drop the copies from the reason. Whether the floor can fall is the coordinator's call. |
| R17 | the script `:676` | The judge's ways a gate is red: "a ladder regression, a file that compiled and ran before reaching a lower phase or printing other output". | Drop the clause. |
| R18 | the script `:1063-1066`, `:1074` | Comments: "write and compare the summary and the ladder"; the list of `gate-functions.sh`'s functions. | Drop the ladder. |
| R19 | the script `:1115` ("step 9 reads it"), `:1692` ("Steps 5 to 9"), the manual `:248` ("The gate's step 8"), F-66 ("Step 8 of a batch's gate"), P-39 ("as step 8") | Step numbers of the checker count and the distance, which come after step 7. | Either renumber, steps 8 and 9 becoming 7 and 8, and reword each cited number, P-39 through `record.py` (a POSITIONS change that the coordinator tells the curator of), or keep the numbers and write step 7 as removed. The second touches no record entry. |
| R20 | the script `:1119`, step 3 | "Then, before anything else compiles into the caches, the ladder's two copies ...". | Drop the copies. |
| R21 | the script `:1123` | "Its functions, and those of step 7, are in ...". | Step 5 only. |
| R22 | the script `:1174`, "What green means" | "... no undeclared DOWN, STDOUT or MISSING line from the ladder ...". | Drop the clause. |
| R23 | the script `:1368-1369`, `:1377`, `:1389`, `:1393` | `gateSuitesRole`: "and the ladder regression where step 4 says", "`/ladder/` only where step 4 runs", the ladder lines in the summary, "no # ladder DOWN, STDOUT or MISSING line". | Drop the ladder from each. |
| R24 | the script `:1491` | The commit stage's line on the tree: "..., and the ladder regression where one is its program". | Drop the clause. |
| R25 | the script `:1503`, the commit stage's step 1 | The one commit holds "the summary, the two tables, ladder/, ...". | Drop `ladder/`. |
| R26 | the script `:1691`, `recoverGate` | "Step 3's copies stand only if both exist." | Drop the sentence. |
| R27 | the script `:1701`, `recoverGateSuites` | "Remove an atomic-again.txt or ladder-again.txt that a step left partway". | Drop `ladder-again.txt`. |
| R28 | the manual `:223` | A tests-only repair runs again "the ladder regression for one of its pass list's programs". | Drop the clause. |
| R29 | the manual `:233`, `:237` | "The functions of steps 5 and 7 (... `ladder_filter`, `ladder_compare`, `mg_phases`)"; step 3: "then two copies of the caches for the ladder". | Drop the ladder parts. |
| R30 | the manual `:248` | "The gate's step 8 runs the compiler's checker". | With R19. |
| R31 | `explorations/coordinator/FACTS.md:186`, F-97 | "The ladder-regression stage's baseline is `compile-ladder/baseline-2026-09-19/`." It names the pass list, the eighteen components "at the phase disambiguate", and step 7. | `PLAN.md:9` cites it for microGPT's phase, so rewrite it rather than delete it. The new title: microGPT's 18 components stop at disambiguation against the compiler prelude. Its evidence: climb batch 35b's `gate/ladder/microgpt-phase.md:29` and `:47`, and the command, the baseline's `microgpt-phase.sh` run by hand. Section 3.1 says why it cannot move before the switch-over. |
| R32 | `FACTS.md:197`, F-108 | "If an output comparison sees the order move, with the test's verdict unchanged, the move goes in row 430 ...". | Scope the clause to a named one-time count, or drop it. |
| R33 | `FACTS.md:198`, F-109 | "Neither file is in the ladder regression's pass list." | Drop the sentence. |
| R34 | `FACTS.md:203`, F-203 | `env.sh` is sourced by "the two that the gate's ladder regression runs, `repair-r1-atomic-static/run-subset.sh` and `baseline-2026-09-19/microgpt-phase.sh`", and "the gate rewrites that path in its copy (`gate.md`, "The ladder regression")". | Drop the gate's ladder drivers and the rewrite. `run-ladder.sh` stays as a compile-ladder driver, outside the gate. |
| R35 | `FACTS.md:71`, F-66 | "Step 8 of a batch's gate compares it with the newest landed table." | With R19. |
| R36 | `explorations/coordinator/POSITIONS.md:38`, P-39 | "... and then the checker count, as step 8". | Only if R19 renumbers. |
| R37 | `explorations/coordinator/PLAN.md:9`, "Where we stand", the runs | "On the compiled path microGPT's 18 components stop at name resolution until the switch-over (F-97)." | Keep the sentence, since `update.py:165` refuses a PLAN without it. Cite the rewritten F-97 (R31). |
| R38 | `PLAN.md:833-834`, "The rule for every edit under the sealed tree (kept from 2026-09-17)" | "the ladder subset that stopped on this rung's name is re-run and moves up with nothing moving down"; "Changed since: ... the ladder regression over `compile-ladder/baseline-2026-09-19/pass-list.txt` ...". | Add a "Changed since" line: on 2026-11-23 the ladder subset and step 7 left the gate. |
| R39 | `PLAN.md:843`, "Testing techniques written 2026-09-17" | "Since 2026-09-19 the ladder is a gate stage over the measured pass list ...". | Add "until 2026-11-23". |
| R40 | `explorations/coordinator/map/README.md:15`, `:67` | The map's gate: "the ladder regression (85 files compiled and run against their baseline, the eighteen microGPT components compiled only)"; "the gate's ladder stage also compiles and runs 82 files of `tests/`, each compared with its own earlier compiled output". | Drop both. Planners brief from this map (`batch.md:48`). |
| R41 | `explorations/fortress-gap-ledger.md:878`, row 363 | "`ProjectFortress/not_working_library_tests/Comparison1.fss:33-36`, held at `pass` by the ladder regression, asserts `U.asDebugString = "Unordered"` ...". | False once step 7 goes, since nothing else runs that folder (`tests-running.md:64`). Rewrite with `ledger.py rewrite`, after F1 is decided. |
| R42 | `explorations/compile-ladder/plan-35/manifest/gen35.py:199`, `:229-233`; `check35.js:8` | The last planner's generator writes `expectedMoves: []` and its comment, and its checker refuses a declared ladder move. | Leave batch 35's files as its record. The next batch's generator, which a planner copies from these, drops the field (D9). |

### 2.3 Keep

| # | Place | Why it stays |
|---|---|---|
| K1 | `batch.md:56`, "No batch compares the printed outputs of the suites' test programs, and no baseline is run to compare against." | It is the rule being carried out. It could add "and no gate step". |
| K2 | `gate-functions.sh:29-64`: `gate_summary`, `gate_compare`, `last_landed_summary` | They compare counts of tests, not printed output. Whether they stay is F2. |
| K3 | `explorations/coordinator/tools/count-run/` (`count-run.sh`, `compare-normalised.py`, `unstable.txt`) | Kept for P-68's count before row 330's rung (section 4). |
| K4 | the manual `:47` | "A named one-time count of changed outputs is asked only where a decision of the curator's names it for that rung. The coordinator starts its base pass before the launch (`tools/count-run/count-run.sh`)." It fits. Its citation of `delegating.md`, "What a brief holds", no longer holds that rule (the section, `delegating.md:33-51`, says nothing on comparisons). |
| K5 | `PLAN.md:96` | "P-68's library rung for row 330 ... P-68 holds the rung and the count that comes first." It is the count that is still to come. |
| K6 | `PLAN.md:851` | "Not adopted (post-mortem 2026-09-29): a corpus-wide comparison of outputs before and after a change." It records P-103. |
| K7 | `BOOT.md:9`, `:16`, `:38`, `:60` | The coordinator's own note of this cut and of this inventory. |
| K8 | `revival-page/update.py:163-166`, `revival-page/README.md:41`, `process-engineering/revival-story.md:134` | They read PLAN's sentence, not the ladder. They work while R37 keeps the sentence. |
| K9 | `review-queue.md:816`, `:1019` (items 367, 194; item 305 named there) | Settled items that read the first errors of past gates' `microgpt-phase.md`. |
| K10 | ledger rows 532 (`fortress-gap-ledger.md:1224`) and 314 (`:995`) | Row 532 is `count-run.sh`'s 600 s limit, a defect of a tool that stays. Row 314 cites the baseline's `ladder.tsv:315-318` as evidence of a past measure. |
| K11 | `explorations/compile-ladder/baseline-2026-09-19/` and every landed `climb-batch-*/gate/ladder/` | Data. Row 314 and the rewritten F-97 cite them. |
| K12 | `explorations/coordinator/tools/orientation/regression/key.md:186-189` | The quiz marks "an expected-output file, or a comparison with a saved run" wrong. It enforces P-103. |
| K13 | `interpreter.md:109` ("Do not pin or compare this order."), `tests-writing.md:140` (respelled team lines), F-354 ("the tests, not the bytes, show that a change of the compiler left the prelude undisturbed") | These agree with P-103. |
| K14 | `explorations/coordinator/repair-batch-workflow.js:154`, `REPAIR-BATCH.md:65` | The repair batch of 2026-09-17, a one-time run whose step 7 asked for a ladder subset before and after: history. `batch.md:39` still names `REPAIR-BATCH.md` as the batch to launch in a held batch's place. A relaunch of that script would run the old comparison. |
| K15 | `explorations/coordinator/tools/transcript-study/` (`cls.py:58`, `cls2.py:55`, `testing-practices/*.py`) | Classifiers of past transcripts that match the words `ladder` and `count-run`. They run nothing. |
| K16 | the script `:456`, `:458` | A rung's checker-count log is named `count-run.txt`. That is not the tool, only the same name; a rename would avoid the confusion. |
| K17 | the microGPT walk check: `interpreter.md:164`, `tools/mg-run.sh`, the script's commit stage, step 0 | Its `VERDICT:` comes from checks inside the two quick programs against reference values. That is P-103's form, not a run comparison. |
| K18 | `explorations/run-c4/README.md:8`, `explorations/apl/README.md:20` | The microGPT check programs compare against goldens inside the program. That is not a comparison of runs. |
| K19 | `FACTS.md:194`, F-105, and `tests-running.md:41-42` | The shards are compared by their sum. Counts, not output; F2 decides whether they stay. |

## 3. The ladder regression: progress against test behaviour

### 3.1 Its parts

`ladder_compare` (`gate-functions.sh:68-88`) reads two things. The first is the baseline's `ladder.tsv`, which has 410 rows, against the gate's, which has the 85 of the pass list. The second is the baseline's `raw/<file>.run` against the gate's. `classify.py` decides a phase. `pass` means "exit 0, no `fail`/`FAIL` in the output, no exception" (`compile-ladder/baseline-2026-09-19/classify.py:20`, `:113-123`).

| Part | What it measures | Kind |
|---|---|---|
| DOWN for the 85 | A program that reached `pass` no longer compiles, links or runs clean. Every one of the 85 is at `pass` in the baseline and at climb batch 35b. | Test behaviour: a pass or fail verdict on the compiled path, from the program's own asserts and exit code. It is relative to the baseline only in form. |
| MISSING | No `.run` output for a listed program. | Test behaviour, as DOWN. |
| STDOUT | The masked output differs from the baseline's `raw/`. | The printed-output comparison that P-103 rules out. |
| UP, NEW | A higher phase; a file not in the baseline. | Progress. Neither can occur for the 85: `pass` is the top phase, and `subset.txt` is the pass list (`gate.md:97`). |
| `ladder.tsv`, the phase table | The phase of each of the 85. | Progress record. It has been 85 `pass` at every landed gate (3.4). |
| microGPT's phase (`mg_phases`, `microgpt-phase.md`) | The phase of each of the eighteen components, compiled and never linked or run. | Progress. It is flat: all 18 at disambiguate, in the baseline and at 35b. |

Why microGPT's phase cannot move: the driver compiles with no `FORTRESS_LIBRARY` setting, so it reads the compiler prelude, which lacks the names the programs use. `fortress-repo`'s `SKILL.md`, "The phases", says `fortress compile` reads the one library only with that variable.

    $ grep -c FORTRESS_LIBRARY explorations/compile-ladder/baseline-2026-09-19/microgpt-phase.sh explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh
    explorations/compile-ladder/baseline-2026-09-19/microgpt-phase.sh:0
    explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh:0
    $ grep '^Phases reached' explorations/compile-ladder/climb-batch-35b/gate/ladder/microgpt-phase.md
    Phases reached: disambiguate 7.
    Phases reached: disambiguate 11.

The first errors are "Array is undefined.", "Char is undefined.", "DelegatedIndexed is undefined.", "ImmutableArray is undefined." and "Vector is undefined." (`climb-batch-35b/gate/ladder/microgpt-phase.md:21-45`). Only the first-error column moves between gates, and `mg_phases` does not compare it. How far the components get under `FORTRESS_LIBRARY=one` today is not measured here.

### 3.2 Who reads the progress measure now

- No skill reads it. `gate.md:80` describes UP as "progress, not red", and nothing acts on it.
- No script reads it. The script asks for a `ladder` string in `GATE_SCHEMA` (`:1189`) and never reads it back. `update.py`, `batch-measures.py` and the record-landing workflow do not read `ladder/` (a grep for `ladder`, `phase` and `microgpt` in each).
- FACTS: F-97 (`FACTS.md:186`) states the stage and the eighteen at disambiguate. F-109 and F-203 name the stage's pass list and drivers; they read no result.
- PLAN: `PLAN.md:9`, "On the compiled path microGPT's 18 components stop at name resolution until the switch-over (F-97)." This is the one live reader of microGPT's phase.
- The page: `revival-page/update.py:163-166` stops unless PLAN's runs line holds that sentence. The page shows it as "microGPT on the compiler: both programs stop at names that only the library declares, until the switch-over" (`revival-story.md:134`; `revival-page/README.md:41`).
- The review queue: items 194, 305 and 367 (`review-queue.md:816`, `:1019`), all settled, read the first-error column of past gates' `microgpt-phase.md`.
- The ledger: row 363 (`fortress-gap-ledger.md:878`) relies on the stage to hold `not_working_library_tests/Comparison1.fss` at `pass`, and with it the assertion at `:33-36`.

### 3.3 Whether a suite test already covers each of the 85

The compiled suites read `.test` files in `compiler_tests/` and `parser_tests/` (the compiler track), `library_tests/`, `other_compiler_tests/` and `one_library_tests/` (`tests-running.md:16-20`, `:116`). A `.test` names its components with `tests=`, resolved in its own folder; a path such as `../LibraryBuiltin/AnyType` is allowed (`one_library_tests/OneLibraryComponents.test`). The script of section 7 reads every such `.test` and resolves each `tests=` token. For each of the 85 it looks for a run test that names the program itself, or one that names a file of the same name in a compiled folder.

    $ python3 -I coverage.py pass85.txt
    NONE                           79
    RUN-SAME-NAME-DIFFERENT-FILE   6
    RUN-SAME-NAME-DIFFERENT-FILE tests/atomic0.fss other_compiler_tests/atomicTest.test[run]
    ...

- 79 programs: no compiled suite test runs them. No `tests=` token reaches `ProjectFortress/tests/` or `not_working_library_tests/`. No compiled folder has a file of the same name. No compiled folder has a file of the same content under any name (`md5sum` over the five folders: "identical-content copies: 0"). They are 76 of `tests/`, listed below, and `not_working_library_tests/Comparison1.fss`, `Comparison2.fss` and `VarRefTest.fss`. The one Java test that names two of them, `TopLevelEnvGenJUTest.java:52-54` (`TestCompiledEnvironments`, `TestCompiledNestedImports`), only loads their environments, and the suites exclude it (`build.xml:1299`, `:1341`, `:1378`).
- 6 programs: `tests/atomic0`, `atomic2`, `atomic3`, `atomic4`, `nestedTransactions1` and `nestedTransactions2`. `other_compiler_tests/` holds the team's 2012 ports of the same names, different files (for example `var count : ZZ32 := 0` and `println("PASS")` in `atomic0`). `other_compiler_tests/atomicTest.test` runs them with `run_out_contains=PASS` and `run_out_does_not_contain=FAIL`, and the gate's step 6 runs them three times each at four threads.
- Under walk, `testSystem` runs all 82 of `tests/` (`tests-running.md:22`). Nothing runs `not_working_library_tests/` on either path (`tests-running.md:64`).

The 76 of `tests/` with no compiled test: AliasedGetterTest, AsExprSimple, BadEncloser, BuiltinBound, GS0, GS1, InheritedMethod, InheritedOverload2, InitOrderWithMutable, LineTerminatingComments, ObjectFieldShadowing, OverloadConstructor1, OverloadWithSuperExcludes, TestCompiledEnvironments, TestCompiledNestedImports, ToTheEOLComment, UnderscoreId, XXXgenericMethod1, XXXgenericMethod2, XXXgenericMethod3, ampersand, atomicTest, chain0, chain2, controlZ, deepHierarchy, doubleSelf, doubledOverloading, doubledOverloading3, emptyLoop, emptySubscripting, executable_component, extendObject, fib, fmTest1 to fmTest5, forFnDecl, forTest, forTest2, genericMethod4, genericTest5, han, ifGetter, ifTest, immutableTopLevel, infixBars, initOrder, matchingCharacterMarks, matchingStringMarks, nestedInst, nestedTransactions4, nullaryOverload, objectTest1 to objectTest3, operatorSynonym, overloadTest1, overloadTest2, overloadTest7, overloadTest8, postfixTest, precedence, primeCharacter, returnAndMutateTuple, testCharLiteral, testParen, testerTest, traitTest1, tupleTest1, tupleTest2, typecaseSelf, unicodeTest, varTest. The three `XXXgenericMethod` files are expected failures under walk and reach `pass` compiled. A compiled test of them would need a name without `XXX`.

The territory map found the same: "`tests/` shares no file name with `compiler_tests/`, and the 11 names it shares with `other_compiler_tests/` are different programs" (`explorations/coordinator/map/README.md:67`).

### 3.4 What is lost if step 7 goes whole

- The compiled-path verdict, from DOWN and MISSING, of 79 programs that no suite runs compiled. A change of the code generator, the run time or the compiler prelude that breaks one of them would then show nowhere until a later test reached the same construct. The 6 atomic programs keep their ports' tests.
- The only check of the 3 `not_working_library_tests/` programs' assertions on any path, among them row 363's `Comparison1.fss:33-36`.
- The STDOUT comparison and the masks. P-103 and the curator's go remove these, and nothing else depends on them.
- UP and the 85's phase table: nothing. They cannot move.
- microGPT's phase: no information today, since it is flat until the switch-over. The source of PLAN's runs sentence goes, so R31 and R37 are needed.
- Time: about 235 s of each gate (`gate.md:99`), and two copies of the caches on disk.

What step 7 caught, as far as the landed record shows: nothing. 0 of the 51 landed `gate/ladder/` folders holds a line in `comparison.txt` or `microgpt-comparison.txt`. No `# ladder` line stands in any landed summary but climb batch 2's four declared moves, all of files outside the pass list (`climb-batch-2/gate/summary.txt`). None of the four rulings on a red gate names the ladder (`climb-batch-2`, `-6.5b`, `-31`, `-35/JUDGE-gate.md`; `grep -i ladder` prints nothing). A red ladder in a gate that was then repaired before it landed would show only in the workflow journals, which this inventory did not read.

    $ for d in explorations/compile-ladder/climb-batch-*/gate/ladder; do ... [ -s $d/comparison.txt -o -s $d/microgpt-comparison.txt ] && n=$((n+1)); done; echo "$n of $t"
    0 of 51

## 4. Where `count-run` is named, and whether each mention fits

The rule it must fit: a one-time count of changed interpreter outputs that a decision of the curator names, taken before a change of meaning lands, never as a gate. The decision of record is P-68: row 330's rung "first counts the interpreter tests whose output changes". The post-mortem's synthesis, section 2(a), lists the counts its decisions named (rows 379 and 330, the numeral switch, rung Q's `IntLiteral` measurement), and P-68's is the one still to come (`PLAN.md:96`).

| Mention | Fits? |
|---|---|
| `count-run.sh:7-11` (header): "The named one-time count of a batch record ... one base pass, started by the coordinator on the batch's base before the launch, and one edit pass, started by the rung worker after its last edit" | Yes. |
| `compare-normalised.py:4-27` (docstring): "as the synthesis's rule for a named one-time count gives it", with its three masks | Yes. These masks belong to the count and stay with it. |
| `count-run/unstable.txt:1-4` | Yes, the count's list of the 18 tests that vary from run to run. |
| the manual `:47` | Yes: "asked only where a decision of the curator's names it for that rung". Its citation needs fixing (K4). |
| `gate.md:108` | Not as written: "If your brief asks you to compare the interpreter tests with a base run". Any brief can ask, and the section sits under the gate. Move it and condition it on a decision of the curator (R7). |
| `SKILL.md:168`, "a comparison of outputs that your brief asks for" | Not as written, for the same reason (R1). |
| `fortress-repo/references/sources.md:156`, `:617`, `:629` | Sources of skill sentences; they follow R7 and R9. |
| `fortress-gap-ledger.md:1224`, row 532 | Yes: a defect of the tool's time limit. |
| `pending-script-edit.md:102`, `:105`; `process-engineering/batch-redesign.md:276`; `build-efficiency.md:496` | Yes: notes on `count-run.sh:23`'s `FORTRESS_THREADS=1`, upkeep of the tool. |
| `BOOT.md:9`, `:16` | Yes: the coordinator's note of this rule. |
| the script `:456`, `:458` (`count-run.txt`) | Not the tool: the checker-count stage's log name (K16). |
| rung reports and skeptic files under `compile-ladder/rung-*/`, `plan-6.5/`, `plan-8/`, `plan-9/`, the post-mortems, `climb-batch-8-review.md`, `ledger-pass/evidence/`, `INDEX.md:352` | Records of past counts, left out by the brief. |

## 5. Other comparisons of runs

These compare a run with an earlier run or a base, and the brief does not name them. None compares the printed output of the suites' tests. Each is kept until F2 is decided.

| Place | What it compares | Red? |
|---|---|---|
| `gate.md:41`; `gate-functions.sh:46-64`; the script `:1127`, `:1389`; the judge's prompt `:676`; F-105; `tests-running.md:41-42` | Step 5, `gate_compare`: each suite's count of tests against the last landed `summary.txt`, through `last_landed_summary`, which reads `compile-ladder/gate-baseline/` and the `climb-batch-*/gate/` summaries. | Yes: COUNT DOWN and SUITE GONE. It fired once, at climb batch 2, on a shard artefact (`climb-batch-2/JUDGE-gate.md:7`), which led to the sum rule of F-105. |
| the script `:1139-1169`; F-66; P-39 | Step 8, `checker_compare`: the checker count's total and crash line against the last landed table, and `diff` of the two tables. | The total never. CRASH CHANGED, SHADOW STALE and NO TOTAL are red. At 35b the total is 0 and the crash line `none` (`climb-batch-35b/gate/checker-count.txt:18`). |
| the script `:1170`; `tools/distance/compare.sh` | Step 9: the distance against the last landed `distance.txt`. | Never. |
| the script `:449`, `:461`; F-53; `batch.md:62` | A rung's before for the two stages is the last landed tables. | No. |
| `fortress-repo/references/compiler.md:260-266`, `:282`; `library.md:62` | "The checker's time": for a change of the checker, the base build's and the change's count tables must be equal, and their whole `run.txt` outputs equal after the tree path is masked. `library.md:62` maps positions before such a comparison. | A failure of the change, in the worker's own run. This is the one other place that compares a whole run's printed output with a base run: the checker's diagnostics over the interpreter's library, not a test's output. |
| the manual `:295`, step 1a | F-34's measure after each landing, compared "declaration by declaration" with F-34's last figure. | No. F-34 says `one_library_tests/OneLibraryComponents.test` already turns every gate red on a refused declaration. |
| `fortress-repo/references/worktrees.md:51`; the skeptic, `batch.md:53` | The old code beside the new: "see a test fail, or compare a program's old and new output", and the skeptic's own programs on the base and on the rung's build. | No. It is a probe of a change's meaning, not a gate. The post-mortem's synthesis kept the skeptic's "differential programs" as what catches a changed output (synthesis.md, section 2(a), last paragraph but one). |
| `batch.md:24`, the reserved point "an interpreter output that a rung cannot explain"; climb batch 35's rung W used it (`PLAN.md:790`, W.reserved.1 to .4) | A rung lists, for the curator, a program whose output changed from the base. | No. Synthesis 2(a) said "The reserved stop 'an interpreter output a rung cannot account for' goes with it". It stayed as a reserved point, which does not hold a batch (`batch.md:69`). It reports a change of meaning to him, which is the purpose the curator gave `count-run`. |

## 6. Findings that would change a decision of the curator's

### F1. Step 7 is the only compiled-path check of 79 programs, and the only check on any path of row 363's assertion

His go removes step 7 whole. Its DOWN and MISSING marks are a pass or fail verdict, not an output comparison (3.1). For 79 of the 85 programs no compiled suite test exists (3.3), and 3 of them run nowhere else at all. Options:

- **(a) Remove step 7 whole, as decided.** It costs nothing to build. The 79 lose their compiled-path verdict until a suite test reaches them. Row 363's assertion is no longer checked, and its row is rewritten to say so (R41). A FACTS entry records that these programs have no compiled test.
- **(b) Remove step 7, and first give the verdict to the suites.** Add compiled `.test` files for the 79, or a few files with many `tests=` names, in the form of `other_compiler_tests/atomicTest.test`: `link`, `run`, `run_out_does_not_contain=FAIL`. Move the 3 `not_working_library_tests/` programs into a gated folder with their `.test`. The suite is then the only gate, and nothing is compared with a baseline. It costs one rung. Two points are unchecked here: whether a run test can name `../tests/X`, since only compile tests are seen doing so, and whether the three `XXXgenericMethod` files need non-`XXX` copies.
- **(c) Keep a reduced step 7 with no baseline.** Each program of the list must reach `pass`, an absolute verdict; STDOUT, the masks, UP and microGPT's phase are dropped. It costs the least, but it keeps a gate step outside the suites, against his words "that is our only gate".

Option (b) is the one in which the suites are the only gate and no check is lost.

### F2. His word of 22:35 read literally also reaches the comparisons of counts and measures

"There should be no comparison with previous runs." His go named the printed-output comparisons, their masks and step 7. Section 5 lists six more comparisons with an earlier run. Two of them can turn a gate red: step 5's COUNT DOWN and SUITE GONE, and step 8's CRASH CHANGED. One is a whole-output comparison of the checker's diagnostics with a base run ("The checker's time"). P-39 rules that every gate measures the checker count. It does not rule that the count is compared with the last gate's. Options:

- **(a) His word covers printed output only.** Keep section 5 as it stands, and record that reading in POSITIONS beside P-103.
- **(b) His word covers every run-over-run comparison.** Each becomes an absolute check:
  - the suite counts become a check inside the suites, for example a gated folder whose `.fss` lacks its `.test` fails, or are dropped;
  - the crash line must read `none`, as it does now;
  - the count and the distance are reported as values, P-39's measure, without a before;
  - "The checker's time" drops the `run.txt` comparison and relies on `ant testQuick`;
  - F-34's measure drops its comparison, since `OneLibraryComponents.test` already gates it.
- **(c) Ask him item by item.** The items are the six rows of section 5 that compare with an earlier run.

### Not a decision, but needed before step 7 leaves

- R31 and R37. The revival page's "microGPT on the compiler" line rests on F-97 through `PLAN.md:9`. Rewrite F-97 as a fact measured once, at 35b's gate, with its command, before F-97's stage is gone.
- D4, R13 and R14 land in one commit. Otherwise `workflow-scenarios.js` fails on the missing functions.
- R19: renumber or not. Renumbering rewrites P-39's text, which the curator is told of.

## 7. Commands worked out

The coverage of section 3.3 (the pass list's first column into `pass85.txt`, then the script, which reads `.test` files the way `FileTests.java:1097-1116` does, with continuation lines joined):

    tail -n +2 explorations/compile-ladder/baseline-2026-09-19/pass-list.txt | cut -f1 > pass85.txt
    python3 -I coverage.py pass85.txt

`coverage.py`, in full:

    import os, sys, filecmp, glob
    PF = '/home/user/fortress/ProjectFortress'
    COMPILED = ['compiler_tests', 'parser_tests', 'library_tests', 'other_compiler_tests', 'one_library_tests']
    def props(path):
        out, cur = {}, ''
        for raw in open(path, encoding='utf-8', errors='replace'):
            line = raw.rstrip('\n')
            if not cur and line.lstrip().startswith('#'): continue
            if line.endswith('\\'): cur += line[:-1]; continue
            cur += line
            if cur.strip():
                k, _, v = cur.partition('='); out[k.strip()] = v.strip()
            cur = ''
        return out
    cover = {}
    for d in COMPILED:
        for t in sorted(glob.glob(os.path.join(PF, d, '*.test'))):
            p = props(t)
            kind = 'run' if 'run' in p else ('link' if 'link' in p else ('compile' if 'compile' in p else 'other'))
            for n in p.get('tests', '').split():
                n2 = n[:-4] if n.endswith(('.fss', '.fsi')) else n
                cover.setdefault(os.path.normpath(os.path.join(PF, d, n2)), []).append((os.path.relpath(t, PF), kind))
    rows = []
    for prog in [l.strip() for l in open(sys.argv[1]) if l.strip()]:
        base = os.path.splitext(os.path.basename(prog))[0]
        direct = [x for x in cover.get(os.path.normpath(os.path.join(PF, prog[:-4])), []) if x[1] == 'run']
        byname = []
        for d in COMPILED:
            r = os.path.join(PF, d, base)
            for tf, kind in cover.get(r, []):
                same = os.path.exists(r + '.fss') and filecmp.cmp(r + '.fss', os.path.join(PF, prog), shallow=False)
                byname.append((tf, kind, same))
        if direct: s = 'RUN-DIRECT'
        elif any(k == 'run' and same for _, k, same in byname): s = 'RUN-COPY-IDENTICAL'
        elif any(k == 'run' for _, k, _ in byname): s = 'RUN-SAME-NAME-DIFFERENT-FILE'
        elif byname: s = 'NAMED-NOT-RUN'
        else: s = 'NONE'
        rows.append((prog, s))
    from collections import Counter
    for k, v in sorted(Counter(s for _, s in rows).items()): print('%-30s %d' % (k, v))

The copies under other names: `md5sum` of every `.fss` in the five compiled folders, matched against `md5sum` of each of the 85.

## 8. For FACTS

- **Fact:** of the 85 programs of `compile-ladder/baseline-2026-09-19/pass-list.txt`, 79 are run on the compiled path by no compiled suite test. These are 76 of `ProjectFortress/tests/` and the 3 of `not_working_library_tests/`, and the 3 run on no path but the gate's step 7. The other 6 (`atomic0`, `atomic2` to `atomic4`, `nestedTransactions1`, `nestedTransactions2`) have the team's ports of the same names in `other_compiler_tests/`, which `atomicTest.test` runs. **Means:** removing step 7 removes the compiled-path verdict of those 79 (F1). **Number:** 79 of 85. **Shown by:** section 7's script, "NONE 79" and "RUN-SAME-NAME-DIFFERENT-FILE 6". **Detail:** section 3.3.
- **Fact:** the gate's microGPT phase measure compiles the eighteen components without `FORTRESS_LIBRARY`, against the compiler prelude. So it has stood at disambiguate for all 18 since 2026-09-19 and cannot move before the switch-over. **Means:** it carries no progress before phase 4. PLAN's runs sentence rests on it through F-97. **Shown by:** `grep -c FORTRESS_LIBRARY` on the two drivers prints 0 and 0, and 35b's `microgpt-phase.md:29`, `:47` read "disambiguate 7" and "disambiguate 11". **Detail:** section 3.1.
- F-97, F-108, F-109, F-203 and F-66 turn false or stale when step 7 goes (R31 to R35).
