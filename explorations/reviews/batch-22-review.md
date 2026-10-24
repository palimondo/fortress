<!-- The combined post-batch review of climb batch 22, the batch of coordinator/CLIMB-BATCH-22.md for the distance's last five errors (rungs E, R and T; run wf_5e692c7a-778, base 64386618b, 02:00 to 04:36 UTC on 2026-10-24, landed and pushed at 2bff2fe23: rung E 8dd64e8fc, rung R bd00ad997, rung T c8e013faf, the closes 30ead0f11, the gather record 64da76510, the merged-diff review's corrections a101e30ea, the gate's tables 2bff2fe23; F-53 rewritten by the coordinator at 89d488872), owed at the landing, in the form of reviews/batch-21b-review.md, by a review worker reading only, against main at 024dad24f (the boot note fc8b496a2 and the orientation update's admission came after the landing). The measures are batch-measures.py's and spend.py's on climb batch 21b (wf_db1dda0a-97d) and this run, transcript-study/skill-load.py's on this run, and scratch scripts of this review's for per-agent times, briefing calls, stage and suite runs and refusals; batches 20 and 21's figures are those of reviews/batch-21b-review.md. Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only, at the curator's ruling of 2026-10-23. Besides reading, this review ran only those scripts, ledger.py show and landing-check, record.py check, facts-extract.sh, grep and git, which write nothing in the tree. -->

# Climb batch 22: conformance, the count and the distance at zero, phase 3's end, the cost, the practice, the routing and the steps owed before phase 4

## What came up in this run

### 1. The count 0 and the distance 0, row by row against climb batch 21b's tables

**What the record expected.** The distance 0 with `#crash none`; the count 0 with the coordinator's reading of a clean check (fork 19, `36ec68cab`); `testSystem` 678 plus E's and R's guards and T's tests; the compiler, library and other-compiler tracks 1,315, 86 and 263; `testSpecData` 130; the 42 atomic runs and the ladder unchanged; the 52 demos at the gather; microGPT's quick pair 7 of 7 (`coordinator/CLIMB-BATCH-22.md:428-439`). The gate read 'COUNT DOWN   3 -> 0, declared none' and 'DISTANCE DOWN   5 -> 0 (-5)' (`compile-ladder/climb-batch-22/gate/summary.txt:118`, `:125`), on `64da76510`. The review's commit `a101e30ea` came while the gate ran and touched only `explorations/`.

**The count's table** (`climb-batch-22/gate/checker-count.txt` against `climb-batch-21b/gate/checker-count.txt`): `diff` prints only `#total` and `#locations`, 3 to 0 each. Every api row is 0 before and after, `#crash none`, `#shadow matches the tracked StaticChecker`. Nothing is new or risen. Each fall is tied to an edit of rung R:
- `Library/FortressLibrary.fss:1466`, the fused arm, by `cast46` (`:1476`);
- `:4395` and `:4401`, `BIG MIN`, by `min731` (now `:4396`, `:4402`).

Each rung on its own tree:
- E read 3 and T read 3, each table equal to the landed one (`rung-export-last/REPORT.md` section 2; `rung-string-members/REPORT.md` section 5).
- R read 1 (`rung-body-arguments/REPORT.md` section 8). With the component's three type errors gone, its run reached the export check, and that check's one error, the 15-entry export error, was counted. F-53's "each unit stops at its first failing stage" had hidden it from the count until then. So no rise: 3 to 1 alone, and 0 merged.
- The gate's run was the first of the coordinator's `-stop check` form on a clean check. It reached '@@PROBE checkComponent FortressLibrary' and ended '### rc=0' with no error line (the gate's result, `checkerCount`), so the clean-check reading held, as the Fable review asked (`climb-batch-22-review.md` section 4, last item).

**The distance's table** (`climb-batch-22/gate/distance.txt` against 21b's):
- `#total` 5 to 0.
- `#kind typecheck` 4 to 0: R's `min731` (2), `list731` (1) and `cast46` (1).
- `#kind export` 1 to 0: 14 entries by E, `String`'s by T (below).
- `#class` X1 1 to 0 (E and T); BR 2 to 0 (`min731`); OT 2 to 0 (`list731` at `List.fss:146`, and `cast46`).
- `#unit` `FortressLibrary` 4 to 0 and `List` 1 to 0. The table prints no class or unit row at zero.
- `#crash none` and `#shadow every shadow edit matched the tracked sources`, as before.
- `#seconds` 235 to 227 (`FortressLibrary` 172 to 168), at a load at start of 0.35 against 1.21 (`distance.txt:13-14`).

Every other kind stayed 0. The kinds that the planner's first run brought did not come: 'return-type 3' and 'abstract-method 8' (`CLIMB-BATCH-22.md:288`). Fork 3's `rr64comp`, fork 9's `delegsizeB` and fork 15's `strbodies` kept them out. Nor did the parse refusal at `FlatString.fss:50-51` (`:289`), since `balanced()` sits after the getters.

**The per-site list** (`compile-ladder/gate/distance-sites.tsv`, `64386618b` against `2bff2fe23`): five rows to the header line alone. Gone: the export error (`FortressLibrary.fss:12`), the two `BIG MIN` sites, the fused arm and `List.fss:146`. Nothing came or moved.

**The export error's entries: 15 before, 0 after.** I parsed the base's message. Each entry gives its trait's first difference, and the edit that cleared it:

| Entry at the base | First difference named | Cleared by |
|---|---|---|
| `Just` | different method `_[_]` (`fsi:1014`) | E `maybeA2`, with `justsq` behind it |
| `Nothing` | different method `_[_]` (`fsi:1039`) | E `maybeA2` |
| `TotalComparison` | different method `=` (`fsi:125`) | E `totalcmp` |
| `DelegatedIndexed` | missing members | E `delegsizeB`, `deleggen` |
| `ImmutableArray1`, `Array1` | missing members | E `openrange` |
| `Array2`, `Array3` | different method `bounds` | E `arrbounds`, with `openrange` behind it |
| `ActualReduction` | different method `leftDistribute` | E `distrib` |
| `BigReduction`, `Comprehension` | missing members | E `bigops` |
| `RR64` | different method `^` (`fsi:366`) | E `rr64pow`, with `rr64comp` behind it |
| `Condition` | extends clauses, method `indices` | E `condA` |
| `Maybe` | extends clauses | E `condA` |
| `String` | method `size`, an abstract `size` not in the api, the `excludes` clauses | T `str4h`, `str5`, `strexcl`; `strbodies` keeps out the four abstract-method errors |

- E alone gave 'landed 15 entries, now 1', with 14 'entry GONE' lines and nothing come (`rung-export-last/REPORT.md` section 2).
- T alone gave 'now 14', `String`'s gone (`rung-string-members/REPORT.md` section 5).
- The gather's merged tree gave 'landed 15 entries, now 0', all 15 'entry GONE' (`climb-batch-22/RECORD.md:46`).
- The planner's run-to-the-end shadow had found 41 differences behind the 15 (`CLIMB-BATCH-22.md:267-283`). The stock check now lists no trait at all, so every one of the 41 is gone, under the reading of `abstract` as landed (section 6).

**Outside the tables.**
- The ladder: 85 of 85 with no move. The 18 microGPT components are at `disambiguate`, as before (`gate/ladder/` against 21b's: the phase columns are equal; `comparison.txt` and `microgpt-comparison.txt` are empty).
- `testFast`: 2,103, its tracks 1,315, 86 and 263 as landed. No rung edits the compiled path.
- `testSystem`: 678 to 683, over shards of 162, 173, 168 and 180 (`summary.txt:57-60`). The five new files are `ExportAlignedMembersWalk` (E), `WrittenReductionArgumentsWalk` and `XXXPureListStridedSubscriptWalk` (R), `OpenParameterListComprehensionWalk` (R's skeptic) and `StringMembersPromisedWalk` (T). That is the gather's forecast exactly (`RECORD.md:53`). The record's "plus E's and R's guards and T's tests" did not foresee R's `XXX` test or its skeptic's test.
- `testSpecData`: 130. The atomic runs: 42 of 42 PASS.
- The demos: 52 of 52 at the gather (section 4).

### 2. The stages' times against climb batch 21b's gate

- **The count stage: about 150 s.** By the gate's call times it was launched at 04:26:49 UTC and its table read at 04:29:25, against about 90 s at 21b. The count table records no seconds, so the times come from these pairs:
  - E 99 s and T 91 s, whose runs stopped at the component's three type errors;
  - R 149 s, whose run went past them into the export check;
  - the gather's merged tree 151 s (03:36:23 to 03:38:54, `RECORD.md:47`);
  - the gate's, a clean check run to its end.

  So, by that pairing, the rise is the component's check now running to its end, not load. It is one run each, under different loads. F-240 and `compiler.md:142` name 90 s (Part 3).
- **The distance stage:** 227 s (`FortressLibrary` 168 s) at load 0.35, against 235 s (172 s) at 1.21. The rungs' own runs took 222 to 226 s at loads up to 11, and the gather's 204 s at 0.50.
- **The suites:**
  - `testFast` 6 min 5 s, against 6 min 17 s;
  - `testSystem` 3 min 16 s, against 3 min 11 s;
  - `testSpecData` 1 min 6 s, against 1 min 3 s;
  - `compileAll` 3 s with the caches kept, against 25 s (`summary.txt:61-68`).
- **The machine line:** load 3.10, 5.79, 4.08, against 2.91, 5.72, 4.19 (`summary.txt:73`). It still reads `FORTRESS_THREADS=1` (batch 11's finding 8).
- **The gate:** 21.2 minutes (04:09:32 to 04:30:47), against 21.8.
- **F-240** names 21b's gate and figures (Part 3, finding 4).

### 3. The cost, by role, against the record and climb batch 21b

From `batch-measures.py` on both runs, and `spend.py` and this review's scripts on this run's folder. **The run wrote 2.82M over 10 agents, in 2 h 35 min** (02:00:26 to 04:35:40 UTC). The boot note gives the harness's count, about 2.97M.

| Role | B20 | B21 | B21b | B22 | B22 share |
|---|---|---|---|---|---|
| Rung workers | 848K (2) | 1.64M (4) | 1.34M (3) | 890K (3) | 31.5% |
| Skeptics | 757K (2) | 1.52M (4) | 1.07M (3) | 958K (3) | 33.9% |
| Gather | 426K | 565K | 439K | 392K | 13.9% |
| Merged-diff review | 362K | 381K | 412K | 335K | 11.9% |
| Its judge and repair | 0 | 165K + 227K | 0 | 0 | 0 |
| Gate | 117K | 127K | 122K | 127K | 4.5% |
| Commit | 131K | 125K | 118K | 122K | 4.3% |
| **Total** | **2.64M** | **4.75M** | **3.50M** | **2.82M** | |
| Agents, rungs | 8, 2 | 14, 4 | 10, 3 | 10, 3 | |
| Span | 2 h 10 | 4 h 26 | 3 h 40 | 2 h 35 | |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | 0.94M | |

**Against the record:** about 2.9M, "from 2.5M if no fix is contested and the review blocks nothing, to 3.7M", and about 3 hours (`CLIMB-BATCH-22.md:54`). The low figure's condition held: no contested fix, and the review blocked nothing. The run wrote 0.32M over that low figure and 0.08M under the middle, and took 25 minutes less.
- **Workers, 0.11M under** the 1.0M estimate:
  - E 310K against 0.4M;
  - T 324K against 0.35M;
  - R 256K against 0.25M.

  Each took 30 to 33 minutes, against the manifest's expected 100, 110 and 60 (`CLIMB-BATCH-22.md:346`, `:384`, `:365`). Those minutes order the scatter only.
- **Skeptics, 0.16M over** the 0.8M:
  - skeptic E 367K, with 18 old-code walk runs, eight programs and the checker's driver over three client programs;
  - skeptic R 297K;
  - skeptic T 294K.
- **The fixed roles, 0.12M under** the 1.1M: 0.98M. The gather wrote 392K in 40.6 minutes, 28 of them the demo run overlapped with its folding.

**Against 21b and batch 20:**
- Per rung, all roles: 0.94M, the lowest of the four. No rung changed the checker, made a speed pass or built.
- Workers and skeptics together per rung: 0.62M, against 0.80M, 0.79M and 0.80M.
- The fixed roles: 0.98M, against 1.09M, 1.20M and 1.04M.

**The briefing's share.**
- Six agents were briefed, the three workers and the three skeptics. All six ran the briefing, none in its first turn, at calls 11 to 16, 60 to 73 s after start.
- Its results came to about 117K tokens, 4.2 % of writes, at 0.40 tokens a character plus 110 a call. That counts each `--part` call and each briefing file read back, among them the skeptics' `slice1.txt` and `slice2.txt` in the session's scratchpad:
  - E 32.7K, T 22.6K, R 15.1K;
  - skeptic E 20.0K, skeptic T 17.8K, skeptic R 8.9K.
- The planner's estimates were about 33K, 21K and 15K (`CLIMB-BATCH-22.md:424-426`), close to the measured figures.
- 21b: about 111K, 3.2 %; per briefed agent about 20K now, against 19K.

**Other measures.**
- **First calls:** 468K (16.6 %), 6 cold, against 507K (14.5 %), 7 cold. E, R and the skeptics of E and R started warm (cache reads of 38K).
- **Cache refills:** 0. **Refusal cycles:** none.
- **The skill's load** (`skill-load.py`): 353K, 12.5 %: 81K of load text (2.9 %) and 272K over 114 part reads (9.6 %), against 11.3 % at 21b.
  - Rung T read 13 parts whole and rung E 12 (54K and 49K).
  - The tool counts one read of `sources.md`, by rung T. That call was a `grep -r` with `grep -v sources.md`, so no agent read it, against two at 21b.
- **Builds:** none by any rung, skeptic or the gather. Walk reads its library from source, and no Java, Scala or grammar changed. The gate built once: `compileAll` in 3 s, with the caches kept.
- **Distance sites gone, net:** 5. The distance is 0.
- **Rows:**
  - 2 closed: 632 (R) and 826 (T, opened and closed).
  - 3 opened: 824 and 825 (R and R's skeptic) and 826.
  - 11 rewritten: 731, 330, 533 and 607, and 387, 674, 611, 316, 823, 138 and 141 for moved lines.
  - 2 noted: 188 and 283.
  - Not written: row 756's note, which the record asked for, and row 735's new instance (finding 6).

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`; messages are distinct message ids):

| Agent | Id | Writes | First call | Messages | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung T | a70bba14 | 324K | 59K, cold | 131 | 30.4 | 02:00-02:31 |
| Rung E | a3e5547c | 310K | 22K | 141 | 32.7 | 02:00-02:33 |
| Rung R | a5359e01 | 256K | 20K | 116 | 30.9 | 02:31-03:02 |
| Skeptic T | a61d5266 | 294K | 65K, cold | 78 | 20.1 | 02:33-02:53 |
| Skeptic E | a88a4b3d | 367K | 28K | 137 | 35.4 | 02:53-03:29 |
| Skeptic R | a9ad8ded | 297K | 26K | 116 | 25.4 | 03:02-03:27 |
| Gather | a61806b0 | 392K | 71K, cold | 160 | 40.6 | 03:29-04:10 |
| Gate | a504a0ba | 127K | 54K, cold | 43 | 21.2 | 04:10-04:31 |
| Review | a1ff1b5e | 335K | 64K, cold | 110 | 16.1 | 04:10-04:26 |
| Commit | abe3f4ea | 122K | 59K, cold | 33 | 4.9 | 04:31-04:36 |

I did not measure the preparation beside the run: the planner, the Fable review, `36ec68cab` and the orientation update.

### 4. The tail

- **The gather** (392K, 40.6 minutes):
  - It composed the three rung commits on `main` one patch at a time (`git apply --3way --index`), each folded and committed before the next, in the order E, R, T, with no conflict.
  - It ran the merged-tree tests in `/home/user/fortress-gather22`, seeded from the base build in 3 s. The index tree `0524963a5` equals `main`'s code after `c8e013faf` (`RECORD.md:7`). Under `nice -n 19`, one at a time:
    - 9 walk tests in one JVM, 'OK (9 tests)';
    - the distance stage, '#total 0', 204 s;
    - the count stage, 0, 151 s;
    - the 52 demos, 'demos: 52 run, 52 reached their end', 03:38:54 to 04:06:41.
  - It opened rows 824 to 826 and closed 632 and 826.
  - It folded F-285 and F-286, and rewrote F-282 (twice), F-83, F-85, F-59, F-81, F-58, F-143 and F-53's account. Its own grep found F-58 and F-81 made false.
  - It re-anchored F-35, F-44, F-63, F-276 and F-279 and seven rows for moved lines. This is 21b's finding 6, practised without being built.
  - Misses:
    - It left row 756's note out, though `CLIMB-BATCH-22.md:443` names it, and wrote "Every note a record asked for is written" (`RECORD.md:132`).
    - It did not try row 735's instance as a note (finding 6).
    - It held T.skeptic.1 under `PLAN.md:575` without writing its evidence there (finding 1).
    - It ran the count stage, which the gate then ran again on the same code (finding 7).
- **The merged-diff review** (335K, 16.1 minutes, beside the gate): approved, nothing blocking. Its corrections in `a101e30ea`:
  - rows 138, 141 and 387, whose citations were already wrong at the base;
  - `PLAN.md:11`'s row-731 sentence;
  - `rung-body-arguments/REPORT.md:108`'s count;
  - review.1 and review-routed.1 at `PLAN.md:595-596`.

  I checked the three row citations on `main` (`FortressLibrary.fsi:1356-1358`, `:2482-2493`; `String.fss:529`), and they hold. `landing-check` prints 'no finding' now.
- **The gate** (127K, 21.2 minutes): green on `64da76510`, as section 1 gives.
- **No judge, no repair.** The commit started two seconds after the gate.
- **The commit** (122K, 4.9 minutes):
  - It landed the tables and the per-site list, now its header alone, and ran the quick microGPT walk check. It built no PDF, since no commit touched `Specification/`. It pushed `main` to the three refs on the first try and removed the three rung worktrees.
  - It edited F-53 by word (Part 2, "The commit stage's fold"), and named three of F-53's sentences and F-240 as false, leaving them.

### 5. The microGPT walk check

Its verdict lines (`summary.txt:133`, `:135`): "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" for `MicroGptAplQuick` and for `MicroGptFlatQuick` (the commit stage's result, `microgptWalk`). So 7 of 7 on both programs.

### 6. Phase 3's end

**The exit as stated.**
- P-33: "Phase 3, the compiled checker reports no error on the interpreter's whole library (the distance to the switch-over at zero; F-53 defines it and holds its value)" (`POSITIONS.md:30`).
- PLAN's phase 3, "The checker at a true zero": "the distance, which this phase brings to zero (F-61)" (`PLAN.md:39`).

The gate's distance stage reads `#total 0`, every kind 0 and `#crash none`, with every operator checked (P-155) and every stage of each unit run whatever the earlier ones reported. The count stage reads 0, a clean check of the `FortressLibrary` component. F-53 holds both since `89d488872`. **So the zero meets phase 3's exit as P-33 and PLAN state it, by their letter.**

P-155's aim, "so that the distance to the switch-over reaches zero with them checked", is met. Its second sentence has been false since 21b (C.skeptic.1, no default). P-33 is not made false.

**What the zero rests on**, each named so that his call on phase 3's end is made with it:
- **Row 816's reading (question 1, taken at its default overnight).** Under the other reading, the planner's shadow measured the distance 1, an export error of 5 entries over 12 members. By R's measurement the count would read it too (`CLIMB-BATCH-22.md:36`, `:295`; `rung-body-arguments/REPORT.md` section 8). So the zero holds only under the reading as landed. Home: question 1, `PLAN.md:575`, row 816 (finding 1).
- **The export check's skip of symbolic top-level names** (row 782, `NEGATIVE-BOUNDED`). Its top-level loop reads only `overloadingChecker.isDeclaredName(f)` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:275`). So an api's top-level symbolic operators are not compared with the component at all. When the probe admitted them, 'Missing declarations' grew to 165 entries of names spelled alike: a defect of the check, by the row. Home: row 782; `PLAN.md:66`'s "After it: row 782". The record names it only as "latent" (`CLIMB-BATCH-22.md:327`).
- **The distance's scope is the twelve prelude components** (F-53; `distance.txt:1`). It does not cover the rest of `Library/`, 53 components in all. That bears on the switch-over (finding 3).

**What stands between the library and the switch-over beyond the distance**, each with its home:
- **The natives (F-32), phase 4's first step by P-33.** F-32 counts 424 live bindings at `e455ccd98` in four classes: 147 the prelude binds, 61 with a helper, 138 needing one, 78 other. Since `9d2e4c856`, 24 more `IntLiteral` bindings are not classified, and every batch since has edited the library. P-58 gives the form, `builtinPrimitive` naming a static helper. The plan, N0 to N4 before the switch-over and N5 on its day, is `perf-probes/prelude/natives-shape.md` section 3. "Not yet designed as briefs" (PLAN, phase 4, first bullet and `:106`). Rows 796 and 309.
- **F-34's code-generation refusals:** 58 declarations of the twelve components refused, 50 that the checker passes, in 14 kinds, measured once on 21b's base `aa5c67d48`. F-34 says that "after the switch-over the code generator stands between the library and bytecode at 50 declarations at least". Each kind has its row (304, 733, 818, 624, 818 to 823). Home: PLAN, phase 4's last bullet, and phase 5. Not measured on this landing, though R's cast is in `__bigOperator2`, one of the refusals' places. The boot note asks whether the gate should run code generation per declaration (default no).
- **Row 701**, the code generator's refusal of a method with a `where` clause. It is the first wall `fortress compile` meets in `FortressLibrary`: 'Don't know how to compile this kind of FnDecl' at `SumReduction`'s `distribute` (`CLIMB-BATCH-22.md:298`). Its PLAN line puts it "after the switch-over, with row 812 beside it" (`PLAN.md`, phase 3's `where`-clauses line; review-queue item 182). The boot note's type-decisions asks include "row 701 as a PLAN line".
- **Row 731's checker gap.** The checker still takes no element type from a clause form's clauses, and narrows no comprehension's bound by the expected type. The library now writes the argument at its sites (F-285), so this is a gap for user programs and the team demos (row 731's demo half; review-queue item 247), not for the library. A grep of both model programs' folders finds no clause-form `SUM`, `PROD`, `BIG MAX` or `BIG MIN` without its static argument. Homes: row 731; `PLAN.md:62` and `:67`; review-queue item 51, whose "Needed by" is now stale (Part 4).
- **The names batch:** the prelude's deletion with its tests respelled (P-37, P-38); row 320's linker step, part of the switch-over's design by P-33 (row 41); `GCD` and `LCM` (P-70); row 579's brackets. Home: PLAN, phase 4.

## Part 1. Conformance

### Method

As in `reviews/batch-21b-review.md`. For each rung I read:
- its commit, its `REPORT.md` and `SKEPTIC.md`;
- its section of the record (`CLIMB-BATCH-22.md:134-243`), with question 1 and forks 1 to 22 (`:61-118`);
- the gather's `RECORD.md` and the run's journal results;
- the code, the library's earlier text at `a874948ac` and the specification on `main`.

Three standards, kept apart:
- the specification;
- the library's own way (P-27);
- the decisions on record: P-27, P-68, P-78, P-79 and P-90, with P-33, P-39 and P-155 where they bear, and the record's forks and defaults.

### The verdicts

- **Rung E, the api's last export entries: in the spirit of `apis.tex`'s rule and P-27.**
  - The api states the component's members at their headers in 7 entries.
  - The component takes the api's type in seven lines, where the api's type is the contract or the only one the api can name (forks 3, 10 and 11).
  - Api lines that no component ever built leave (forks 4 and 6).
  - It took `rung-E.patch` byte for byte. Its skeptic approved with two corrections.
- **Rung R, the body errors' library text: in the spirit of P-78 and of the revision box of `Specification/basic/expressions/reductions.tex:51-55`.**
  - The argument is written as the library already writes it: `SUM[\T\]` at `fss:2554`, `:2933`, `:2938`; the team's `transpose` at `List.fss:504`; `Format.fss:438`; `Avl.fss:422`.
  - The arm's cast is F-264's device at item 46's default.
  - Two readings no decision covers: splits 2 and 4.
- **Rung T, `String`'s api and the four members: in the spirit of `apis.tex` and of the team's own api.**
  - The team's `String` already wrote `abstract splitWithOffsets()` and `abstract split()` with no component member: `a874948ac`, `Library/FortressLibrary.fsi:2308-2309`, and the component's trait at `a874948ac` declares neither.
  - It goes against the worker skill's rule that such a member is declared in the component too (split 1).
- **No ruling on a rung.** Three skeptics approved, with 8 fix commits, none contested and none a defect of the change. The merged-diff review approved.

### Where the text, the brief or the principles split

**1. Question 1 at its default against the skill's rule (row 816; T.skeptic.1).**
- **For the default:**
  - "a definition $d'$ ... that includes definitions for all declarations other than the methods or fields declared \KWD{abstract} in $d$" (`Specification/basic/components/apis.tex:252-256`);
  - the team's `String` api above;
  - F-282 as landed by 21b.
- **Against it:**
  - "So declare each such member in the component too, at the api's header: a call of a missing one dies with `NoSuchMethodError`" (`.claude/skills/fortress-repo/references/library.md:39`), and "Declare such a member in it" (`references/compiler.md:74`);
  - rung S's precedent, which declared its two new `String` members in both (`rung-string-slips/REPORT.md:41`);
  - `source-code.tex:384-385`'s "provide a concrete declaration", read as still declaring.
- **Who saw it:**
  - The record's fork 13 cites `library.md`'s "Designing a change" for `abstract` (`CLIMB-BATCH-22.md:105`), but not that bullet's next sentence, and puts the component's declarations out of T's reach (`:220`).
  - The Fable review did not weigh it.
  - T's skeptic found it (`rung-string-members/SKEPTIC.md` section 6). The orientation update reads `library.md:39` as "still holds as an instruction for new work", with `String`'s seven the standing exception (`climb-batch-22/orientation/admission.md`, notes).
- So the library now holds 12 members on the departure side, `String`'s seven among them, five added by T.
- **Was he told?** Question 1 was put with the record and taken at its default. Its PLAN entry (`:575`) holds neither this batch's figures nor T's evidence (finding 1).

**2. R and Appendix I's rationale (R.skeptic.1).**
- `Specification/appendices/changes.tex:2470-2473` gives as the reason for a choice at row 560's `fail` calls that "the library's own practice is the standard, and the library does not route round a gap of the type checker".
- R writes `BIG MIN[\ZZ32\]` and `<|[\E\] ... |>` where the checker cannot infer them, with row 731 open. That is P-78's workaround and the library's own practice. In the spirit of P-78 and P-27, against the sentence's general reading; its narrow reading, of row 560's calls, stands.
- It is on the list at `PLAN.md:592`, with no default.

**3. The zero with row 731's checker gap open (fork 17).**
- P-155's own reason for checking the operators was that "A zero with them unchecked would hide known errors".
- Here the zero hides no library error: the three sites are written, and the checker accepts them. The gap is in user programs.
- The record lists it for his sight, and R.worker.1's entry (`PLAN.md:591`) holds it. Sound.

**4. R's two walk values (rows 824 and 825).** The brief said "no value moves" (`CLIMB-BATCH-22.md:201`). Two did:
- **The strided subscript's type.** `List`'s strided range subscript now answers a `List[\E\]`, where it answered an `ArrayList[\Int\]` that its own type refused. This repairs the team's comprehension at `List.fss:150` (`a874948ac`). `PureList.fss:73` keeps the defect, as row 824's `XXX` test.
- **The open element type.** On a list whose element type walk left open, the subscript now ends in `CastError` at `List.fss:179`, as a list comprehension written at that open type already did on the base. This is row 825, `CONTESTED`, home 3, under a silent text, and only in programs the checker refuses (F-59).

No decision covers either. Row 824's one-row form, `NEGATIVE-VERIFIED` with one half fixed, is the worker's reading (its decision 3). The skeptic would class it `implementation gap (walk)`, as row 717 is. Row 825 is on the list (`PLAN.md:593`, default today's behaviour).

**5. E's restated `size` moves a value in a program the checker refuses.**
- `DelegatedIndexed` now declares `getter size(): ZZ32 = |self|` (`fss:2101`), the body it inherits from `Indexed` (fork 9; the library's own form at `DefaultZip`, `fss:2060`, and `ArrayList`, `List.fss:256`).
- So an object extending `{ DelegatedIndexed, Sized }` answers 3 where it answered 77 under walk. That is row 735's departure: walk keeps the first trait's body (`rung-export-last/SKEPTIC.md` section 3, `SkMix2`). No library type is in that case, by the skeptic's reading.
- No decision covers it. The instance is in no row (finding 6).

**6. The checker's verdicts on clients against the one library move.** The record says "What the checker does differently: nothing" (`CLIMB-BATCH-22.md:127`). That holds for its code, not for its verdicts. By skeptic E's `SkClient`, run against the interpreter's library:
- `x^q` with `q: QQ` now checks;
- `j[r]` typed `Maybe`, a `Condition`'s `indices` typed `CompactFullRange`, and `j SQCAP u` typed `Maybe` with `u: UniqueItem[\ZZ32\]` are now refused;
- under walk each answers as before ('errors=15' to 'errors=6'; `SKEPTIC.md` section 3).

No compiled client checks against the one library before the switch-over. A point for his sight, which the record's points omit.

**7. `rangeContains` out of bounds (review.1).** `CatString`'s new body clips a range that leaves the receiver, as `SubString`'s does, while `FlatString`'s raises `IndexOutOfBounds` (`rung-string-members/SKEPTIC.md` section 4). The text is silent. On the list (`PLAN.md:595`).

### Rung E, `8dd64e8fc`

**What landed.** `rung-E.patch` as it is (`git diff 64386618b 94179a74a -- Library` equals it, index lines aside):
- 24 api lines out or rewritten and 18 written;
- 8 component lines rewritten and 1 added;
- the guard `ExportAlignedMembersWalk`, 77 assertions.

The edits are `totalcmp`, `rr64pow`, `rr64comp`, `condA`, `maybeA2`, `justsq`, `openrange`, `distrib`, `bigops`, `delegsizeB`, `deleggen` and `arrbounds` (`rung-export-last/REPORT.md` section 1). Part IV gains 7 lines, loses 13 (the six subscripts and four getters among them) and changes 11, four parameters renamed (`RECORD.md:173`).

**Standard 1.**
- `apis.tex:252-256`: same header and type.
- `if.tex:53` and `while.tex:29` ("A Condition is a generator that generates 0 or 1 element") stay true.
- The implicit range `::2` now binds the range subscript and answers the specification's value (`ranges.tex`, implicit ranges; skeptic E section 6).

**Standard 2.**
- The api at the component's header is 21b's follow-on form, as `OpenRange`'s `shiftLeft` (`fsi:2231`).
- The component at the api's type follows `Float`'s natives (`FortressBuiltin.fss:184-191`) and `FlatString`'s `generator` (`FlatString.fss:45`).
- One departure from precedent: the four `OpenRange` subscripts are deleted, where climb batch 20's fork 5 commented out `immutableArray`'s ranks, because no component text exists to mirror (its deviation line).
- Team lines changed: the 2012 api's and component's lines above.

**Standard 3.**
- **P-27:** built.
- **P-68:** the component's three lines state today's `ZZ64` (fork 3), and the move to `ZZ` stays row 330's rung after the switch-over. Its text "`ZZ64`, `ZZ` or `RR64` by declaration" is now false for `RR64` (E.worker.1, `PLAN.md:589`, no default).
- **P-90:** the bare `Nothing` untouched; `Nothing[\T\]` kept.
- **The coordinator's calls:** way A+ built with A++, and the rounding call replaced by fork 3 on measurement.

**Verdict: in the spirit,** with splits 5 and 6.

### Rung R, `bd00ad997`

**What landed.**
- `rung-R.patch` as it is (index `d5abf7e6a..1997672c7`): `BIG MIN[\ZZ32\]` at `fss:4396` and `:4402`, `<|[\E\] self[i] | i <- r |>` at `List.fss:151`, and `cast[\O0\]` at `fss:1476`.
- One respelled message, `InferUnfixedFBoundedWalk.fss:29`, its value kept.
- The guard `WrittenReductionArgumentsWalk`, the expected failure `XXXPureListStridedSubscriptWalk`, and the skeptic's `OpenParameterListComprehensionWalk`.

**Standard 1.**
- The revision box of `reductions.tex:51-55`.
- A list expression's type is `List[\T\]` (`aggregate.tex:103-105`), which `[\E\]` states.
- A `typecase` arm's type is its expression's (`typecase.tex`), so the cast types the arm. Under the pattern it is the identity, by skeptic R's reading (section 2).
- Split 2 for Appendix I.

**Standard 2.**
- In `FortressLibrary.fss`, 7 of 7 clause forms of an F-bounded big operator now write the argument, against 5 of 7. In `List.fss`, 3 of 3 list comprehensions do, against 2.
- `cast[\` stands 54 times, 35 of them as an arm's whole value (`rung-body-arguments/REPORT.md` section 3).
- Team lines changed: `upto`, `beyond`, `List`'s subscript and the arm, all 2012.

**Standard 3.**
- **P-78:** its workaround, built at the library's sites.
- **Item 46:** the default, built.
- **Forks 17 and 18:** built.
- **P-79:** `BirdCount1q` and `BirdCount1t` ran old against new, with 0 differing lines, and the 52 demos at the gather.

**Verdict: in the spirit,** with splits 2 and 4.

### Rung T, `c8e013faf`

**What landed.**
- `rung-T.patch` as it is: nine api members of `String` written `abstract` (`fsi:2449`, `:2453-2455`, `:2459`, `:2476`, `:2480`, `:2496`, `:2506`).
- One `excludes` text `{ Number, Char, AnyMultiplicativeRing }` on both sides (`fsi:2448`, `fss:4337`).
- Four bodies: `CatString`'s `rangeContains` (`String.fss:128-133`), `FlatString`'s `balanced` (`FlatString.fss:52`), `EmptyString`'s `isBalanced` and `balanced` (`String.fss:286`, `:333`).
- `StringMembersPromisedWalk`, with the skeptic's three assertions of the fifth route.

**Standard 1.**
- `apis.tex:252-256`.
- `source-code.tex:373-379`: a trait is satisfied at its header, its clauses' types in any order.
- Exclusion is symmetric (`traits.tex:234-244`), and `AnyList excludes { Number, HasRank, String }` on both sides (`List.fsi:55`, `List.fss:86`).
- The specification says nothing of `balanced`, `depth` or `rangeContains`.

**Standard 2.**
- The team's own `abstract splitWithOffsets` and `split` (above) and rung S's form.
- The bodies follow `SubString`'s `balanced` (`String.fss:373-376`), `FlatString`'s `isBalanced`, and `CatString`'s own split of a range (`:152-153`).
- Team lines changed: nine api lines and the component's `excludes`, which loses `AnyList`.

**Standard 3.**
- **P-27:** built.
- **Question 1:** at its default.
- **Forks 13 to 16:** built.
- **Row 607:** untouched. Its miss now reaches through `CatString`, in row 607's rewritten line and F-83.

**Verdict: in the spirit of the text and the team's api,** against the skill's rule (split 1).

### The record's forks and defaults, against what landed

| Fork or item | Rung | Landed |
|---|---|---|
| Question 1, row 816's reading | T, E | Default, the reading as landed; row 816 open; the skill's rule crossed (split 1) |
| Default taken 1, item 46's `cast[\O0\]` | R | Built (`fss:1476`); row 632 closed |
| Default taken 2, `Condition` by way A+ | E | Built with A++ (`condA`, `maybeA2`) |
| Default taken 3, the rounding call | E | Replaced by fork 3, as the record asked; `PLAN.md:567` revised |
| 1, one run, three rungs | all | Built, E and T first, R after T |
| 2, E's and R's test the stage | E, R | So; R's guard red on the base (split 4) |
| 3, `RR64`'s rounding at `ZZ64` in the component | E | Built (`fss:498`, `:500`, `:501`); P-68's text false for `RR64` |
| 4, `Just`'s and `Nothing`'s range subscripts out | E | Built; Part IV loses two team operators |
| 5, `Just`'s `SQCAP` and `SQCUP` | E | Built (`fsi:1024-1027`) |
| 6, the arrays' `OpenRange` subscripts out | E | Built, deleted, not commented |
| 7, the distributes | E | Built (`fsi:1903`, `:1906`, `:1909`) |
| 8, the big operators' parameters | E | Built (`fsi:1968`, `:1973`), four getters out |
| 9, `DelegatedIndexed`'s `size` | E | Built (`fss:2101`); split 5 |
| 10, `generator` at `Generator[\E\]` | E | Built (`fss:2102`) |
| 11, the arrays' `bounds` and `zeroIndices` | E | Built |
| 12, `TotalComparison`'s `=` | E | Built (`fsi:125-126`) |
| 13, `String`'s nine `abstract` | T | Built; split 1 |
| 14, one `excludes` text | T | Built |
| 15, the four bodies | T | Built; a fifth route asserted by the skeptic |
| 16, NEW-T-1 | T | Row 826, opened and closed |
| 17, row 731's sites by the written argument | R | Built; row 731 rewritten; split 2 |
| 18, row 632 closed by the cast | R | Closed in `30ead0f11` |
| 19, the count stage's clean check | coordinator | `36ec68cab`; the gate's first clean run read 0 |
| 20, the 52 demos at the gather | gather | 52 of 52 |
| 21, nothing declared | all | Kept; nothing came |
| 22, no speed pass | all | Kept |

### The global questions

- **Promised against landed.**
  - The distance 0 and the count 0, as planned; the export entries 15 to 0.
  - Rows closed as planned: 632 and NEW-T-1 (826). Row 731 rewritten as planned.
  - Beyond the plan: rows 824 and 825; row 533 rewritten; notes on rows 188 and 283.
  - Planned and not done: row 756's note.
- **The record's premises that failed:**
  - R's guard "passing on the base and after ... so no value moves" (`CLIMB-BATCH-22.md:201`). F-228 says that "A method's return type ... do not direct it", and `List.fss:151` is a method's body. The planner's walk suites held no test of the subscript's type.
  - R's count "its total is 0" on its tree alone (`:191`). It read 1, the export error reached. The Fable review's own reasoning on question 1 implied it, but it left this sentence.
  - The rungs' expected minutes, 100, 110 and 60, against about 31 each, and the skeptics' 0.8M.
- **Built twice: no.** No two rungs change one declaration.
- **The library's way: yes for each,** with the precedents above.
- **Together.** E and T share `FortressLibrary.fsi`, and all three share `.fss`, in other declarations. On the merged tree:
  - the distance and the count read 0;
  - every walk test the rungs add or change passes;
  - the 52 demos reach their end;
  - the gate is green.

### Findings

Ranked by what they cost or risk next, each with its home.

1. **Phase 3's zero rests on question 1, and the batch put five more members on the departure side of the skill's rule without its record naming the conflict.** `PLAN.md:575`, which holds question 1, still says "Needed before the next batch counts the export error's zero", a point now past. It lacks this batch's figures: the distance 1, 5 entries and 12 members under the other reading, which the count would read too. It also lacks T's evidence (split 1) and the team's own `abstract splitWithOffsets` and `split`. The gather "held" T.worker.1 and T.skeptic.1 there without writing them (`RECORD.md:213`). Proposed (mine): rewrite the entry with those three points, its "Needed by" changed to "before phase 3's end is called, and before the switch-over's names batch". `library.md:39` and `compiler.md:74` then follow his answer (Part 3). Home: the routing; the skill writer after his answer.
2. **Phase 4's gates would drop the distance.**
   - `coordinator/references/batch.md:56`: "The gate reports the checker count in every batch, and the distance in phase 3".
   - P-39 measures the distance in the gates "of batches whose work drives the distance down".
   - The natives batches edit binding bodies across the twelve components, `FortressBuiltin`, `FlatString`, `String` and `Writer` among them. The count stage checks only `FortressLibrary`'s component with the apis it imports.

   So a natives rung could raise the distance with no gate to see it. Proposed (mine): the distance stage stays in every gate, report-only, until the switch-over lands, and every site that comes goes on the review list. Home: the curator (P-39); the coordinator skill with his yes on the wording.
3. **The model imports library components outside the distance.** `MicroGptFlat.fss` and `MicroGptApl.fss` import `System`; `FlatData.fss` and `FlatData2.fss` import `File`; `AplMgSyntax.fsi` imports `FortressAst` and `FortressSyntax`. None is among the twelve that the distance checks (F-53). I found no measurement on record of the compiled checker over them against the one library: a search of FACTS and PLAN for them beside the checker or the distance finds none. Proposed (mine): the phase-4 planner runs the distance stage's driver once over those four, report-only, so that the names batch knows its reach; F-53's definition stays. Home: the phase-4 planner's probes.
4. **FACTS entries left false at the landing.**
   - **F-240**, for a third landing (21b's finding 5): 21b's gate, "about 90 s" and "235 s". The figures now are about 150 s and 227 s.
   - **F-281:** "the distance stays at its 5 sites and the count at 3", and "Gated ... by the stages ('#total 5', ...; '#total 3')".
   - **F-34:** "which hold four of the distance's five errors (F-53)".
   - **F-245:** "it gives these 5 with no crash".
   - **F-61:** "which must also reach zero", now reached, incomplete.

   The commit stage's instruction caused F-53's swap (Part 2). Proposed (mine): the routing rewrites the five entries. The commit stage's brief (`coordinator/climb-batch-workflow.js:1360`) and the manual (`climb-batch-workflow.md:249`) name F-53 and F-240 by number, write F-240's two figures from `distance.txt` and the count stage's call times, and hand F-53's sentences that list the sites to the coordinator. This widens 21b's finding 5. Home: `PLAN.md:204`.
5. **The count stage now takes about 150 s, not 90 s,** since the component's check runs to its end (section 2). `compiler.md:142` and F-240 say "about 90 to 100 seconds" and "about 90 s". Home: F-240; the skill writer.
6. **Two ledger notes left out.**
   - Row 756's note, which the record names (`CLIMB-BATCH-22.md:443`, its text at `:319`), is not in the row. The row still cites `TypeAnalyzer.scala:981` and `:207`, now `:1077` and `:208`. `RECORD.md:132` says every note asked for is written.
   - Row 735's new instance (skeptic E's `SkMix2`) is only in `RECORD.md:89` and `SKEPTIC.md`. The manual's fold asks a note refused for length to go in "with the notes cut back; none is left out".

   Home: the routing: `ledger.py note 756`, and `ledger.py rewrite 735` with its notes cut.
7. **The merged tree's stages ran twice.** Row 632's close asks its test, the distance stage, to pass on the merged tree before the close commit (the manual, "After the rungs"). So the gather ran it, and the gate ran it again on the same code. The gather also ran the count stage, which no rule asked. Together that is about 6 minutes of one core, against "No stage runs a build, a suite or a measurement again on a code state that another stage ran" (`coordinator/references/batch.md:43`). Proposed (mine): a row whose test is a stage closes in the commit stage, on the gate's table, and the gather runs no stage. Home: the manual, "After the rungs".
8. **Phase 3's left candidates have no phase.** With phase 3's batches done (the boot note, "The go"), these stand under a phase that is over:
   - item 19's candidate lines (`PLAN.md:66-76`): rows 782, 731's demo half with 817, 774, 773, 808, 806 with 611, 813 and 814, 786, and item 18's other candidates;
   - "Rows on phase 3's road with no batch named": 480, 487, the `where` clauses, 652 and 404.

   Proposed (mine): moved word for word under "Off the path, parked", as "Phase 3's candidates at its end", each with what it waits on. Rows the names batch meets (782; 813 and 814) also go in phase 4's names line. Home: the routing.
9. **The record's walk premise was a reading, not a run** (the global questions). Proposed (mine): a planner states "no walk value moves" only from its guard's run on the base. Home: this note.
10. **The session's scratchpad again.** Each skeptic wrote its briefing to `scratchpad/slice1.txt` and `slice2.txt`; skeptics E and R ran at once. This is batch 20's finding 13, met in a third batch (`PLAN.md:197`). Home: that line.
11. **Stale review-queue items:** 40 (item 46, built), 51 (row 731's "Needed by"), 29 (`fsi:366`'s `^(self, b:AnyIntegral)`, now `fsi:367`'s `b:Number`, the tie not reproduced), and the queue's head line for "the next batch". Home: the routing (Part 4).
12. **The record's points omit the clients' verdicts** (split 6). Home: the points for his sight.

## Part 2. Did the practice hold

### The skeptics' fixes

From the journal's results and each `SKEPTIC.md`: 8 fix commits, three of them the report and record from the journal. No defect of the change, none contested.

| Rung | Fix commits | Defects of the change | Test first |
|---|---|---|---|
| E | `1623254e8` (from the journal), `8526d727d` (the guard's eight section comments and a `ranges.tex` citation), `2e83f38d1` (the provenance block, four lines, row 533 handed over) | 0 | comments and prose; the guard re-run 'OK (1 test)' on the head and on the base build |
| R | `68b527766` (from the journal), `aafa12827` (`OpenParameterListComprehensionWalk`, row 825, the second walk move) | 0 | red on the base build at 03:19:50, 'FAIL: a Boolean: false =/= a Boolean: true', 'Tests run: 1,  Failures: 1'; green on the head at 03:20:10 |
| T | `7263f23ea` (from the journal), `4680740cb` (three assertions of `SubString`'s `rangeContains`), `8d10d0cae` (seven citations of the batch record) | 0 | red on the base build at 02:47:52, 'Library/String.fss:430:9-64: Cannot find definition for method rangeContains given receiver CatString', 'Tests run: 2,  Failures: 2'; green on the head at 02:48:21 |

- Every fix is sound and stays inside its rung's work. The review checked all five, as applied (`fixesChecked`).
- Against the batches before: 21b made 7 with 1 defect, run 1 13 with 1, batch 20 11 with 0.
- Skeptic E left one point of its own uncorrected: the worker's decision 4 gives the zip as taking `DelegatedIndexed`'s `size`, which it does not (`SKEPTIC.md` section 5).

### Workers, test first

- **E:** its test is the distance stage, its before the landed table, with no base run, as the brief says.
  - The guard first ran on the base at 02:08:02 and failed on its own expected sum ('672 =/= 678'), corrected to the true sum.
  - It passed on the base at 02:08:28, before the edit at 02:09:23, and after at 02:09:59.
  - In the letter, for a guard.
- **R:**
  - The guard was written at 02:36:47 and run red on the base at 02:37:01, 'FAIL: a ArrayList[\Int\]: <|10, 12, 14|> =/= a ArrayList[\ZZ32\]: <|10, 12, 14|>'. It was meant to pass.
  - The edit came at 02:37:18, and the guard was green at 02:53:32.
  - The `XXX` test came after the edit. It was shown 'OK Saw expected exception' as it is, and 'Missing expected failure' with the one-line fix for one run, restored in the same call.
  - In the letter.
- **T:**
  - The test was written at 02:04:18 and red on the base at 02:04:39. Four scratch programs of its lines were red at 02:05:03, 'Tests run: 4,  Failures: 4'.
  - The edit came at 02:07:16.
  - In the letter.

No miss of order.

### The rulings

None: no fix was contested, no rung refused, no worker stopped.

### The merged-diff review

- Approved, nothing blocking. Six corrections in `a101e30ea` (section 4). review.1 and review-routed.1 are at `PLAN.md:595-596`.
- It did not see the T evidence missing from `PLAN.md:575`, row 756's note, or F-281, F-34 and F-245.
- Cost: 335K beside the gate, and no wait at the tail.

### The briefing in each agent's first turn

| Batch | Briefed agents | In the first turn | Run at all | At calls | Seconds after start | Its tokens (estimate) |
|---|---|---|---|---|---|---|
| 20 | 4 | 0 | 4 | 9 to 12 | 48 to 78 | 89K, 3.4 % |
| 21 | 9 | 0 | 9 | 8 to 15 | 24 to 97 | 193K, 4.1 % |
| 21b | 6 | 0 | 6 | 10 to 21 | 45 to 94 | about 111K, 3.2 % |
| 22 | 6 | 0 | 6 | 11 to 16 | 60 to 73 | about 117K, 4.2 % |

For the share that `coordinator/references/batch.md:45` asks at a landing: 6 of 6 read it, none in the first turn.

### Builds and runs, repeated or not

- **Builds:** none but the gate's. No build of unchanged code.
- **Suites:** each worker ran `ant testSystem` and `ant testSpecData` once after its change (P-124), as its section asks. No skeptic and not the gather. The gate ran `testFast`, `testSystem` and `testSpecData`.
- **The stages:**
  - Each worker ran the count stage and the distance stage once on its final tree.
  - No skeptic ran them, since no rung changes the checker.
  - The gather ran both on the merged tree, and the gate ran both again on the same code (finding 7).
- **The demos:** the gather ran the 52 once on the merged tree. R ran `BirdCount1q` and `BirdCount1t` old against new. No rung ran the 52, which fork 20 gave the gather, against `tests-running.md:57-62`'s rule for a library edit.
- **Walk old against new:** skeptic E made 18 old-code runs, skeptic T 5 and skeptic R 3, over its own programs. They ran at one thread, and R's at four too.
- **Re-measured without a code change:** the gather's two stages, then the gate's.
- **Taken from the record, not run again:** 21b's tables as every rung's before; the planner's probes; the base build at `08c95c708` as the old code, its code equal to the base's.
- **The PDF:** not built; no commit touched `Specification/`.

### Refusals by the harness and the tools

- **All three workers' writes of `REPORT.md` were refused,** as the script expects (E 02:26:56, T 02:27:18, R 02:58:47). Each skeptic wrote the report and record from the journal with `journal-text.py`. Skeptic E's first try exited 1, its folder missing on the branch, and its second wrote both.
- **Six `Edit` calls were refused:** rung R once for a file not read (02:37:27); skeptic R four times on `REPORT.md` (03:23:04 to 03:23:11); skeptic T once for a file modified since read (02:49:32).
- **One built-in safety check refused a removal:** skeptic E's `rm -rf $K/$side-caches $K/$side-jt` at 03:16:32. Its next call ran the probe without it, 12 s later.
- **No `sleep` was blocked.** Every wait was a polling loop.
- **Two length refusals,** both on scratch or in the skeptic's own check, neither left out: E's worker's draft of row 330 at 724 characters of notes, on scratch copies; skeptic E's note on row 533 at 1,508 characters, which the gather wrote as a rewrite.
- **No structured result was refused.** No refusal cost a cache refill.

### The commit stage's fold of FACTS

Its brief asks for "every figure it gives of the last landed gate ... Change no other word; a sentence the new figures make false you name in your summary" (`coordinator/climb-batch-workflow.js:1360`). It changed three words of F-53 (`git show 2bff2fe23 -- explorations/coordinator/FACTS.md`):
- the title's "5 errors" and "3" became "0 errors" and "0";
- "Its five are:" became "Its 0 are:", over the unchanged list of the five sites;
- "so its 3 are that component's type errors: the fused arm and the two `BIG MIN` sites" became "so its 0 are ...".

It left "the gate's numbers to come". It named those three sentences and F-240 as false, and left them, as its brief says. The coordinator rewrote F-53 at `89d488872`.

It found F-53 this time, by its old title, so the search 21b's finding 5 described cost nothing. The manual and the script still name the entries by titles that do not exist. Left false by the landing beyond F-53: F-240, F-281, F-34, F-245 and F-61 (finding 4). The gather's fold also missed the last four.

### The practice's measures, batches 20 to 22

| Measure | B20 | B21 | B21b | B22 |
|---|---|---|---|---|
| Written | 2.64M | 4.75M | 3.50M | 2.82M |
| Rungs, agents | 2, 8 | 4, 14 | 3, 10 | 3, 10 |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | 0.94M |
| First calls | 0.47M, 7 cold | 0.68M, 8 cold | 0.51M, 7 cold | 0.47M, 6 cold |
| Refusal cycles | 0 | 0 | 0 | 0 |
| Rulings and repairs on the merged tree | 0 | 8.3 % | 0 | 0 |
| Skeptic fix commits (defects) | 11 (0) | 13 (1) | 7 (1) | 8 (0) |
| Distance sites gone, net | 26 | 0 (full check 186) | 0 | 5, to 0 |
| Count stage at the gate | 63 s | about 78 s | about 90 s | about 150 s, run to its end |
| Distance stage at the gate | 161 s | 206 s | 235 s | 227 s |
| Skill's load | 9.8 % | 10.4 % | 11.3 % | 12.5 % |
| Briefing, estimated | 3.4 % | 4.1 % | 3.2 % | 4.2 % |
| microGPT quick pair, verdicts | 7 of 7 both | 7 of 7 both | 7 of 7 both | 7 of 7 both |

### 21b's findings, a batch later

1. The `apis.tex` citation: restored in the routing (`climb-batch-21b/RECORD.md:27`, `:254` read `:252-256`).
2. The 15 entries' differences: answered by the planner's run-to-the-end shadow, 41 differences; all gone.
3. 4i's bearing on the floor: question 1 was put with the record and taken at its default. Its entry is not updated (finding 1).
4. Routing gaps:
   - rows 812 to 815 now have PLAN lines (phase 3's `where` line, item 19's name-binding line, phase 5);
   - P-79's stale list is on the list (`PLAN.md:580`);
   - C.skeptic.1 still has no default.
5. The FACTS names and F-240: not built, met a third time (Part 2; finding 4).
6. Moved citations across files: practised by this gather without being asked, not built in the manual.
7. The demos at the gather: practised by the record's fork 20, not built in the manual.
8. `batch-measures.py`'s library-order column: not built. No library order ran this batch.
9. Row 756: tried by the planner, and the crash stands. Its note was not written (finding 6).
10. The skill sentences: installed by the writer after 21b. `tests-running.md:57-62` now holds the demos, so batch 20's Part 3 line at `PLAN.md:200` is built (Part 4).
11. Rung C's second timing pair: not met; no checker change.
12. The session's scratchpad: met again (finding 10).

### Misses, by kind

Numbered on from `batch-21b-review.md`'s 715.

Found inside the batch:
- **The change wrong:** none.
- **A test that reached too little:**
  - 716, T's test asserted no value of `SubString`'s `rangeContains` route (skeptic T, `4680740cb`);
  - 717, R's report held one of two walk moves (skeptic R, `aafa12827`).
- **A defect without its home:**
  - 718, row 825 (skeptic R);
  - 719, row 824 (worker R, by its guard's red run);
  - 720, row 735's new instance (skeptic E; left out by the gather);
  - 721, rows 188, 283 and 533 not reproducing (worker E, skeptic E, the gather's gather.1).
- **Text claiming more than the code or the evidence:**
  - 722, E's guard's comments and `ranges.tex` citation (`8526d727d`);
  - 723, E's provenance block and four lines (`2e83f38d1`);
  - 724, T's seven citations of the batch record (`8d10d0cae`);
  - 725, R's "the gate counts 680" (the review);
  - 726, rows 138, 141 and 387, wrong at the base (the review);
  - 727, `PLAN.md:11`'s row-731 sentence (the review);
  - 728, `OpenParameterListComprehensionWalk.fss:25`'s section (the review, routed);
  - 729, E's decision 4's zip (skeptic E, not corrected);
  - 730, the gather's "Every note a record asked for is written" (this review).
- **Sentences made false and not listed:**
  - 731, F-58 and F-81 (the gather);
  - 732, F-143 (skeptic R);
  - 733, F-35, F-44, F-63, F-276 and F-279's lines (the gather);
  - 734, `changes.tex:2470-2473`'s general reading (skeptic R);
  - 735, `library.md:39`'s rule against `String`'s seven (skeptic T);
  - 736, F-282's "(57 written `abstract` ...)" (skeptic T).
- **The record's premises:**
  - 737, R's "no value moves", a misreading of F-228 (worker R);
  - 738, R's count "0" alone (worker R);
  - 739, the expected minutes and the skeptics' 0.8M (this review).
- **The team's code, found by the rungs:**
  - 740, row 824's two comprehensions, `List.fss:150` and `PureList.fss:73`, both the team's;
  - 741, row 826's four missing members, absent at `a874948ac`;
  - 742, row 607's reach through `CatString`.
- **Process:**
  - 743, three report writes refused (by design);
  - 744, six `Edit` calls and one removal refused;
  - 745, skeptic E's `journal-text.py` run with no folder;
  - 746, the gather's stages repeated by the gate;
  - 747, the commit stage's fold of F-53 by word, and F-240 left a third time;
  - 748, the skeptics' briefing files in the session's scratchpad;
  - 749, row 756's note not written;
  - 750, row 735's instance left out of the ledger;
  - 751, T.skeptic.1's evidence held by a PLAN entry that does not hold it.
- **The review's own error:** none found.

Found by this review: 752 to 763, findings 1 to 12 above.

**Against the earlier notes.**
- 36 found inside the batch (716 to 751), against 21b's 30.
- None was a fault of the code. They are text claims, homes, premises and process, which the skeptics, the gather and the review caught, all but the last nine.
- Landed with no known wrong value.
- The known costs: question 1 open with the zero resting on it; rows 824 and 825 open; and 12 api members whose compiled call can die (row 816).

## Part 3. Skill sentences the batch made false

For the skill writer. Lines are of `.claude/skills/` at `024dad24f`, unchanged by the batch (`git diff --name-only 64386618b HEAD -- .claude/` prints nothing). The gather's record lists two (`RECORD.md:224`), and the orientation update admitted no entry and names the same two (`climb-batch-22/orientation/admission.md`, notes).

**Made false or incomplete by climb batch 22:**
- **`fortress-repo/SKILL.md:100`,** the example cache entry's span `FlatString.fss":12:1~156:2`. It is now `12:1~158:2`, since T's `balanced` adds two lines. The gather's and the orientation's item.
- **`fortress-repo/references/library.md:39`,** "So declare each such member in the component too, at the api's header", and **`references/compiler.md:74`,** "Declare such a member in it". The library itself now departs at 12 members, five of them added by T under question 1's default (split 1).
  - As a rule for new work, they stand. As a description of the library, they need its departure named.
  - Proposed (mine): after his answer to question 1. Under the default, add "The library's `String` and four other traits leave 12 such members out of their components, a known departure (row 816)". Under the other reading, the sentence stands and a rung writes the 12.
- **`fortress-repo/references/library.md:38`,** "In an api, declare each ... member ... at the header that the component gives it". Incomplete: rung E moved the component to the api's type in seven lines, where the api's type is the contract callers use, or the only type the api can name (`RangeInternals`' types import it), as F-282 states. A sentence of that other direction, with `RR64`'s rounding as its example, is the material.
- **`fortress-repo/references/compiler.md:142`,** the count stage "about 90 to 100 seconds, more under load". With the component's check clean and run to its end, it took 149 s on R's tree, 151 s on the merged tree and about 150 s at the gate.
- **`fortress-repo/references/compiler.md:3-4`,** the glossary's count stage. It says nothing of a clean check read as 0 (`36ec68cab`), nor that the component's run reaches the export check only once its type errors are gone (R's 3 to 1).
- **`fortress-repo/SKILL.md:79`,** "The switch-over comes when the checker accepts the interpreter's library". That condition now holds (F-53), and the switch-over has not come: P-33 puts the natives first, and phase 4 waits for his go. Proposed (mine): "after the checker accepts the interpreter's library (so since climb batch 22, F-53) and the natives run on the compiled path's helpers (P-33)". The orientation reads it as still true. I read it as made incomplete by the zero.

**Not false, but incomplete, each met by this batch:**
- **`fortress-repo/references/revival-changes.md:89`,** "Other reductions take their bound, or the expected type where the bound does not fit". The planner's probe shows a list comprehension at a type parameter refused under a declared `List[\E\]` as a function's body, in a branch and at a typed local (`CLIMB-BATCH-22.md:308-313`). "Where the bound does not fit" means where the enclosing call fails (F-221), which a reader will not take from the sentence. The orientation also notes that the walk half there names reductions only, where `SKILL.md:132` names comprehensions too.
- **Walk's list subscript and open types:** `List`'s strided subscript now answers a `List[\E\]` and `PureList`'s does not (row 824). A comprehension written at an open type parameter ends in `CastError` (row 825, `CONTESTED`). These are in R's revival change. The orientation holds the second until his ruling.
- **`rangeContains`'s range:** the non-flat strings clip, and `FlatString` raises (review.1). This is library state, for the area part if he rules.

**Rules the batch met that stay true:**
- `revival-changes.md:89`'s "Write it in every clause form", which the library now follows (F-285).
- `SKILL.md:132`'s walk rule, which R's premise missed and which held.
- `tests-running.md:57-62`, the demos, met by the gather.
- `library.md:25`'s `SUM` bullet.
- `records.md`'s 700-character notes limit, which E's draft of row 330 met.

**The coordinator skill** (edited only with his yes on its wording, by the boot note):
- `references/batch.md:56`, "the distance in phase 3", is now the rule that drops the distance from phase 4's gates (finding 2).
- `:34`'s standing go covers phase 3's batches, now done. Phase 4's go is not in the skill. The boot note holds it.

Neither is false. Both are for his yes.

## Part 4. Routing

Checked against `main` at `024dad24f`: the gather's PLAN entries (`8dd64e8fc`, `bd00ad997`, `c8e013faf`, `64da76510`), the review's (`a101e30ea`), the boot note (`fc8b496a2`) and the review queue. PLAN's routing runs after this review, by the boot note.

### What the record listed for him, and PLAN lacks

- **Question 1:** taken at its default overnight; PLAN's item 19 says so (`PLAN.md:59`). Its entry, `:575`, is stale (finding 1).
- **The record's forks taken at their defaults,** 1 to 22, and defaults already taken 1 to 3 (`CLIMB-BATCH-22.md:83-118`): no entry, against 21b's at `PLAN.md:581`. Default 3's entry (`:567`) is revised but not marked built. Default 2's (`:568`) still ends "For the last-5 batch".
- **The record's points for his sight** (`:120-128`; `RECORD.md`, "Points to report"): only R.worker.1's entry covers row 731's part. No entry holds the rest:
  - E: 24 api lines out or rewritten and 18 written, with Part IV losing six subscripts and four getters, gaining 7 lines and renaming four parameters; and 9 component lines.
  - T: nine of `String`'s api lines now `abstract`; the component's `excludes` losing `AnyList`.
  - R: three lines and the arm.
  - Under walk: the four `String` calls run, `List`'s strided subscript answers its own type, and an open element type ends in `CastError`.
  - The checker's verdicts on clients (split 6).
  - The zero with rows 731 and 816 open.
- **"Phase 3's end ... the curator's to call"** (`:447`): no entry. It is in the boot note only.

### The items of the gather and the review

- E.worker.1 with E.skeptic.1 (P-68's sentence), `PLAN.md:589`: no default on record. Proposed under "For the curator".
- E.worker.2, E.skeptic.2 and gather.1 (rows 188, 283, 533), `:590`: default none, each open. Sound.
- R.worker.1 with R.skeptic.3 (row 731's gap), `:591`: as landed. Sound.
- R.skeptic.1 (`changes.tex:2470-2473`), `:592`: no default. Proposed under "For the curator".
- R.skeptic.2 (row 825), `:593`: today's behaviour. Sound.
- R.worker.2 with R.skeptic.4 (`PureList.fss:73`, row 824), `:594`: waits. Sound.
- review.1 (`rangeContains`'s range), `:595`; review-routed.1 (a test's citation), `:596`: sound. review-routed.1 is a test owed, not a question, as 21b's was.
- T.worker.1 and T.skeptic.1: held by `:575` without their text (finding 1). T.worker.2: held by `:333` (row 607), with the route in row 607's line and F-83. Sound.

### New rows

- **824:** at `:594`. **825:** at `:593`. **826:** closed.
- **Rewritten 533:** at `:590`; review-queue item 29 is stale (below). **Rewritten 330:** P-68's rung after the names (`PLAN.md`, phase 4). **Rewritten 607:** `:333`.
- **No row:** row 735's new instance, and row 756's note (finding 6).

### Answered, stale or overlong in the record

- **PLAN's "Where we stand"** (`:9-13`):
  - "Runs" ends at 21b;
  - the live thread gives 21b's gate, its count 3 and distance 5, and "All five are the next batch's";
  - "Landed" ends at 21b;
  - "Next" names climb batch 22 as next.

  All four want this landing and phase 4's first step.
- **Phase 3's item 19** (`:59-65`): its "Next, climb batch 22, ..." sentence is landed. Its six "The last-5 batch" lines are each built or done:
  - the before: taken;
  - the export error: E and T;
  - row 731's sites: R;
  - item 46's arm: R;
  - row 756: tried, its note owed;
  - the 52 demos: the gather.

  To `PLAN-history.md`, under the landing's dated heading. Item 19's own line becomes one line with `2bff2fe23` and this review.
- **`:69`,** "The api's second export error: built by climb batch 21b's rung E ... Its last entries are the last-5 batch's (above)": now built whole. To history.
- **The rest of item 19's candidate lines and "Rows on phase 3's road":** finding 8.
- **Item 46** (`:165`, "Pavol's answers, in the order they are needed", before the switch-over): built by R. To history. Its entry under "Climb batch 21, listed for his review" (`:566`) stays for his sight, marked built at `bd00ad997`.
- **`:567` and `:568`,** the export probe's questions 1 and 2: built by E. Mark them built; drop "For the last-5 batch".
- **`:575`** (E.skeptic.1): finding 1.
- **`:200`,** batch 20's review, Part 3, the demos in `tests-running.md`: built at `tests-running.md:57-62`. To history.
- **`:204`** (21b's finding 5): widened by finding 4.
- **Phase 3's opening paragraph** (`:39`), "1,747 under the setting `any`", and "which this phase brings to zero": the phase is at its exit. One line saying so, with his call.
- **The review queue:**
  - the head's "Needed by the next batch, the one for the distance's last 5 errors ...: 40", and the count "The next batch ...: 1": answered;
  - item 40 (`review-queue.md:404-410`): "Landed: As it is (row 632)" and "Needed by: the next batch" are stale. Landed: `cast[\O0\]` at `bd00ad997`; its needed-by is now never;
  - item 51 (`:632-636`): "Refused ..., three sites of the distance" and "Needed by: before the switch-over; row 731's 3 sites are a checker project" are stale. The sites are written (F-285), and the gap is user programs' and the demos'. Proposed needed-by: with item 247's probe of the checker over each demo;
  - item 29 (`:286-292`): cites `fsi:366`'s `opr ^(self, b:AnyIntegral):RR64`, now `fsi:367`'s `b:Number`. The tie does not reproduce (gather.1). It joins `:590`.
- **FACTS:** F-240, F-281, F-34, F-245 and F-61 (finding 4). F-282, F-285 and F-286 are past the record's 600 characters, as `record.py check` reports and the gather said.
- **POSITIONS:**
  - P-68's "`ZZ64`, `ZZ` or `RR64` by declaration" is false for `RR64` (E.worker.1);
  - P-155's second sentence has been false since 21b (C.skeptic.1);
  - P-79's list has been stale since 21b (`:580`).

  All three are his text. P-33 and P-39 are not false; P-39 bears on finding 2.

### The steps due before phase 4's first batch

1. **This review committed;** then the routing above. PLAN's "Where we stand", item 19 and its six lines, item 46, `:567-568`, `:575` with batch 22's figures and T's evidence, `:200`, the batch's forks and points as entries, phase 3's left candidates rehomed (finding 8), and the queue's items 40, 51 and 29 and its head.
2. **FACTS:** F-240 at batch 22's gate (the count stage about 150 s by the gate's call times, its table recording no seconds; the distance stage 227 s, `FortressLibrary` 168 s, at load 0.35), and F-281, F-34, F-245 and F-61 read against the zero, by `record.py`.
3. **The ledger:** row 756's note from `CLIMB-BATCH-22.md:319`, its citations to `TypeAnalyzer.scala:1077` and `:208`; row 735's instance by a rewrite with its notes cut.
4. **The skills:**
   - the orientation update is done (`024dad24f`, no entry admitted);
   - the writer's task with `RECORD.md`'s revival changes and Part 3, the `library.md:39` and `compiler.md:74` lines after his answer to question 1;
   - a cold read and the writer's fixes;
   - all pushed before the next planner is briefed (the manual's routing, steps 4 and 5).
5. **The commit stage's fold instruction,** owed by the boot note: finding 4's form, between batches.
6. **For him, with defaults:** phase 3's end and question 1 together; the go for phase 4's first batch; the distance in phase 4's gates (finding 2). Below.
7. **Phase 4's first step, the natives** (P-33; P-58; PLAN, phase 4, first bullet). A planner drafts N0, the mechanism: under `builtinPrimitive`, the 72-line loader, the conversions and gap 5, test first with the probe programs as interpreter tests seen failing, and a full gate with the suite, the ladder and the count unchanged (`perf-probes/prelude/natives-shape.md` section 3, item 1). Its record owes:
   - **F-32's classes counted again on the base.** The 424 are from `e455ccd98`. The 24 `IntLiteral` bindings of `9d2e4c856` are not classified. A plain grep of `builtinPrimitive("` over `Library/` and `ProjectFortress/LibraryBuiltin/` prints 413 lines today, which shows only that the count is stale. `perf-probes/prelude/natives-binding-probe.sh` is the measured half of item 35.
   - **The distance stage kept in its gate, or the reason it is not** (finding 2).
   - **The four model imports outside the twelve,** probed once (finding 3).
   - **A base build at its base.** Then `/home/user/fortress-base22` is removed.
   - **A Fable review before the launch,** and the launch on his go, since phase 4 is not under the standing go (the boot note).
8. **The tools, when no batch is spliced:** findings 4 and 7; batch 20's finding 13 (finding 10); 21b's findings 6, 7 and 8.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no file of the tree and committed nothing.
- I read the run's transcripts only through scripts:
  - `batch-measures.py` (21b and 22), `spend.py` and `transcript-study/skill-load.py`;
  - scratch scripts of mine for per-agent times, briefing calls, stage and suite runs and refusals, in a folder of their own in the session's scratchpad, `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev22/`.
- I ran `ledger.py show` and `landing-check`, `record.py check`, `facts-extract.sh`, `grep` and `git`, which write nothing.
- The count stage's gate time comes from the gate's call times. I cite no file under `tmp/` as a source.
- I compared no walk timing.
- I did not read the coordinator's session. What he was told comes from PLAN and the boot note. The INDEX line for this review is the coordinator's.

## For the curator

In order of consequence, each with its default and when it is needed:

1. **Phase 3's end: the checker reports no error on the interpreter's library, the distance and the count both 0, which is P-33's exit as written.** It rests on three readings, named here so that your call is made with them:
   - how the export check reads an api member written `abstract` (item 2);
   - the checker's gap with unwritten reduction arguments, which the library now avoids by writing them and user programs still meet (row 731);
   - the export check's skip of top-level symbolic operators (row 782).

   Default: phase 3 is done at this landing, with the three named beside it. **Needed before phase 4's first batch is launched.**
2. **Question 1 (row 816), with this batch's evidence.** As landed, a component may leave out a member its api writes `abstract`. A program compiled against the api that calls it dies at run time. The library now has 12 such members, 5 of them added by this batch to `String`. The other reading asks the component to declare each one: a checker change, and 12 bodyless lines, with the distance and the count at 1 until then. The team's own `String` api already did it the landed way, for two members. The workers' skill and an earlier rung went the other way. Default: as landed, with the skill's rule reworded to name the departure. **Needed before phase 3's end is called, and before the switch-over's names batch.**
3. **The go for phase 4's first batch: the natives' mechanism, so that the library's Java bindings can run on the compiled path** (P-33, P-58). No default: your go. A planner may draft it first.
4. **Whether the distance keeps being measured in phase 4's gates.** Today's rule measures it only in phase 3. The natives batches edit the library's binding bodies, and only the distance would see a new checker error outside `FortressLibrary`. Default (mine): kept in every gate until the switch-over, report-only, with any new error put on your list. Not blocking the planner.
5. **The library components microGPT imports that the distance does not check:** `System` and `File` for both programs, and the syntax apis `FortressSyntax` and `FortressAst` for the APL program. Default (mine): one report-only check of them by the phase-4 planner; the distance's definition unchanged. Not blocking.
6. **The batch's choices taken at their defaults, and the team's lines it changed.**
   - The api loses six subscripts that no component built and four getters, and renames four parameters.
   - `String`'s api writes nine members `abstract`, and its component's `excludes` clause loses `AnyList`.
   - Three rounding lines of the component's `RR64` now answer `ZZ64`.
   - `DelegatedIndexed` restates its `size`.
   - `String`'s `upto` and `beyond` and `List`'s subscript write their static argument, and the fused arm casts.
   - Some client programs that the checker accepted against the old api are now refused, and one refused one is now accepted, though no compiled client reads this library before the switch-over.

   Default: as landed. Not blocking.
7. **Three open points of the batch's list without a default.**
   - P-68's account of today: default (mine), "`ZZ64` or `ZZ` by declaration".
   - Appendix I's rationale that the library does not route round a gap of the checker, which this batch's written arguments read against: default (mine), narrowed to row 560's calls, with P-78's workaround named as the library's own practice.
   - Rows 188, 283 and 533, which no longer reproduce: default, open with their notes until the ledger repair.

   Not blocking.

Information:
- The distance went from 5 to 0 and the count from 3 to 0, with no crash. The export error's 15 entries and the 41 differences behind them are gone.
- The run wrote 2.82M over 10 agents in 2 h 35 min, against about 2.9M and 3 hours, the lowest per rung of the last four batches.
- Every worker's test came first. The skeptics found no fault of the change: they found two walk effects the reports had not measured, and an unasserted route, and recorded each.
- microGPT's quick walk check: 7 of 7 on both programs. All 52 team demos run to their end under walk.