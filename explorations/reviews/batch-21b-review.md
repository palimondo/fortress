<!-- The combined post-batch review of climb batch 21b, the second run of coordinator/CLIMB-BATCH-21.md (rungs C, E and D; run wf_db1dda0a-97d, base aa5c67d48, 20:05 to 23:45 UTC on 2026-10-23, landed and pushed at 32242b80d: rung C 108ab82d6, rung E 031c38bbc, rung D 5e60e356a, the closes 5ef2e93f3, the gather record 01cf94c5e, the review's corrections 7341a2ad8, the gate's tables 32242b80d), owed at the landing, in the form of reviews/batch-21-review.md, by a review worker reading only, against main at aff478ca5 (the two evening probes 2c12a0ee9 and the boot note after the landing). The measures are batch-measures.py's and spend.py's on climb batch 20 (wf_4cf8e3cb-bf5), run 1 (wf_225c8ddd-913) and run 2, transcript-study/skill-load.py's on run 2, and scratch scripts of this review's for per-agent times, briefing calls and refusals. Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only, at the curator's ruling of 2026-10-23. Besides reading, this review ran only those scripts, ledger.py show, facts-extract.sh and git, which write nothing in the tree. -->

# Climb batch 21b: conformance, the count, the cost, the practice, the routing and the steps owed before the last-5 batch

## What came up in this run

### 1. The count 3, the distance 5 and the full check 5, row by row against run 1's tables

**What the record expected.** The count 3 with `#crash none`. The distance 5 with `#crash none`, now with every symbolic operator checked. The export error's entries from 43 to about 15. The compiler track at 1,293 plus C's and E's tests, `testSystem` at 677 plus D's one (`coordinator/CLIMB-BATCH-21.md:768-773`). The gate read `COUNT SAME   3, declared none` and `DISTANCE SAME   5` (`compile-ladder/climb-batch-21b/gate/summary.txt:118-119`), on `01cf94c5e`. The review's commit `7341a2ad8` came while the gate ran and touched only `explorations/`.

**The count's table** (`climb-batch-21b/gate/checker-count.txt` against `climb-batch-21/gate/checker-count.txt`): `diff` prints nothing. Every api is 0, with `#total 3`, `#locations 3`, `#crash none` and `#shadow matches the tracked StaticChecker`. Its three errors are at `Library/FortressLibrary.fss:1466`, `:4395` and `:4401`, the same lines as at run 1, because no rung edited `FortressLibrary.fss` (`git diff --stat aa5c67d48 32242b80d`). No row is new or risen, so nothing needs tying to an edit. The count stage never reaches the export check: it stops at the component's three errors (`rung-export-align/REPORT.md` section 5; its skeptic counted 0 export lines in either run).

**The distance's table** (`climb-batch-21b/gate/distance.txt` against run 1's):
- Only `#seconds` (206 to 235, `FortressLibrary` 144 to 172) and `#machine` differ.
- Unchanged: kinds `typecheck 4` and `export 1`; classes X1 1, BR 2, OT 2; units `FortressLibrary` 4 and `List` 1; `#crash none`; `#shadow every shadow edit matched the tracked sources`.
- What changed is what the stage reads. Since rung C, the checker's three loops read `isCheckedName`, which admits every operator (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:270`, `:396`, `:405`, `:770`). So the gated stage is now the full check, and its 5 is the zero P-155 asks for, with every operator checked.

**The per-site list** (`compile-ladder/gate/distance-sites.tsv`, `c53063bbd` against `32242b80d`):
- **Gone, came, moved:** none. The same five locations: `FortressLibrary.fss:12` (export), `:4395`, `:4401`, `:1466`, `List.fss:146`.
- **The export error's entries: 43 before, 15 after.** I parsed both messages. 29 traits and objects are gone, 1 came, and 14 stay, of which 5 changed text.
  - **Gone, 29, all by rung E.** The 23 that the api's 4h lines and their follow-on clear: `Comparison`, `AnyUniqueItem`, `Indexed1` to `Indexed3`, `ZeroIndexed`, `ReadableArray1`, `EqualTo`, `Reduction`, `ReductionPair`, `StandardMin`, `StandardMax`, `FilterGenerator`, `OpenRange`, `RangeWithExtent`, `BoundedRange`, `RangeWithLeft`, `RangeWithRight`, `FullRange`, `Generator2`, `RelationalPredicateCondition`, `Number`, `Integral`. The 5 that 4i clears: `Equality`, `Indexed`, `ReadableArray`, `Range`, `AnyMaybe`. `QQ`, cleared by row 802's fix with its abstract lines. This split is the export probe's attribution (`rung-export-align/REPORT.md` section 5: "43 to 20 by the api's lines, 15 with 4i, `QQ` out by row 802's fix, `TotalComparison` in by row 800's"). E measured only the total, in one run on `18179f051`.
  - **Came, 1:** `TotalComparison`'s `=` (`fsi:125`), hidden before by row 800. The stock check had matched it through `>=`, which has the same header.
  - **Changed text, 5:**
    - `Array2` lost "Asbtract method put" by 4h.
    - `ActualReduction` changed from "missing members" to "different method `leftDistribute`".
    - `String` changed from "missing members" to "different method `size`".
    - `RR64` changed from `|\_/|` to `^`.
    - `Condition` changed from `indexValuePairs` to `indices`.
  - `compare-sites.py` counts these moves as 34 GONE and 6 COME (`RECORD.md:182`).
  - Each entry names only the first differing member of its trait (finding 2).
- **Hidden by the comparisons:** `compare.sh` printed `DISTANCE SAME   5` over a changed export message. The coordinator skill puts every hidden difference on the review list (`coordinator/references/batch.md`, "The checker count and the distance"), and none is there (Part 4).

**The full check.** Run 1's full-check stage on its merged tree gave '#total 5' and 'landed 191 now 5', with the `AnyList` crash's three lines caught (`compile-ladder/climb-batch-21/RECORD.md:49-53`). The gated stage is now that check, and it gives 5 with `#crash none`. Rung C's run on its own tree has no 'kind env' line: 'landed 191 now 5', 185 rows gone, none came, against `plan-21/probes/full-check-base.tsv` (`rung-symbolic-check/REPORT.md` section 5). So:
- The three crash lines are gone, by row 809's repair (`TypeAnalyzer.selfComprised`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:610`).
- The 186 sites run 1 cleared are held by a gated stage. That answers run 1's finding 4 and fork 34.
- The probe's `run-shadow.sh` no longer matches the tree (rung C's skeptic, finding 7). F-245 says so.

**Outside the tables.**
- The ladder: 85 of 85 with no move; the 18 microGPT components at `disambiguate`, as before (the gate's result, `ladder`).
- `testFast`: 2,081 to 2,103; the compiler track 1,293 to 1,315, which is C's 13 cases and E's 9, the gather's forecast exactly (`RECORD.md:51`).
- `testSystem`: 677 to 678, D's `Generator22DRects` (`summary.txt:1-60`).
- `testSpecData`: 130. Atomic runs: 42 of 42 PASS.

### 2. The stages' times against run 1's gate

- **The count stage:** about 90 s at the gate, by its call times (started 23:37:13 UTC, table read 23:38:45, beside the review's last minutes), against about 78 s at run 1. The count table records no seconds, so the commit stage wrote "This run did not record the count stage's time". Rung C's pairs show the cause:
  - the worker's base 84.4 s at load 0.24 against its pass 96.8 s at load 0.85;
  - the skeptic's base 78.1 s against its head 98.3 s ('real 1m18.097s', 'real 1m38.309s');
  - equal tables and masked `run.txt` in each pair (`rung-symbolic-check/SKEPTIC.md:13-16`).

  So checking every operator costs about 15 to 25 % of the stage. That is within P-148's smoke test ("a slowdown of several times"). E's pairs show no change: 76.5 s and 76.6 s on an idle machine (`rung-export-align/SKEPTIC.md:18-21`).
- **The distance stage:** 235 s (`FortressLibrary` 172 s) at load 1.21, beside the library order and `testFast`, against 206 s (144 s) at load 1.60 (`gate/distance.txt:18-19`). The rise fits rung C's added checks. One run under load cannot separate the two causes.
- **The suites:**
  - `testFast` 6 min 17 s against 6 min 18 s;
  - `testSystem` 3 min 11 s against 3 min 45 s;
  - `testSpecData` 1 min 3 s against 1 min 7 s;
  - `compileAll` 25 s against 87 s (`summary.txt:61-68`).
- **The machine line:** load 2.91, 5.72, 4.19, against 2.59, 5.48, 3.85 (`summary.txt:73`). It still reads `FORTRESS_THREADS=1` (batch 11's finding 8).
- **The gate:** 21.8 minutes (23:18:21 to 23:40:07), against 23.5.
- **F-240** now names the wrong gate and figures (finding 5).

### 3. The cost, by role, against the record and run 1

From `batch-measures.py` on the three runs, and `spend.py` and this review's scripts on run 2's folder. **Run 2 wrote 3.50M over 10 agents, in 3 h 40 min** (20:05 to 23:45 UTC). The boot note gives the harness's count, 3.61M.

| Role | B20 | B21 | B21b | B21b share |
|---|---|---|---|---|
| Rung workers | 848K (2) | 1.64M (4) | 1.34M (3) | 38.2% |
| Skeptics | 757K (2) | 1.52M (4) | 1.07M (3) | 30.6% |
| Gather | 426K | 565K | 439K | 12.6% |
| Merged-diff review | 362K | 381K | 412K | 11.8% |
| Its judge and repair | 0 | 165K + 227K | 0 | 0 |
| Gate | 117K | 127K | 122K | 3.5% |
| Commit | 131K | 125K | 118K | 3.4% |
| **Total** | **2.64M** | **4.75M** | **3.50M** | |
| Agents, rungs | 8, 2 | 14, 4 | 10, 3 | |
| Span | 2 h 10 | 4 h 26 | 3 h 40 | |
| Per rung, all roles | 1.32M | 1.19M | 1.17M | |

**Against the record:** about 3.7M, "from 3.3M to 4.6M", and about 3.5 hours (`CLIMB-BATCH-21.md:63`). The run met the low figure's condition: no contested fix, and the review blocked nothing. It wrote 0.20M over that low figure and 0.20M under the middle, and took 10 minutes more.
- **Workers, 0.21M under** the 1.55M estimate:
  - C 604K against 0.6M, as estimated, in 92 minutes, the run's critical path;
  - E 410K against 0.55M (it made no pass edit, its profile showing the check at 0.05 %);
  - D 323K against 0.4M (the 52 demo runs cost machine time, not tokens).
- **Skeptics, as estimated:** 1.07M against 1.05M (C 393K, E 358K, D 318K).
- **The fixed roles, as estimated:** 1.09M against 1.1M. The gather wrote 439K in 46.5 minutes, against 565K and 41 minutes for run 1's four rungs: no shared file, no cycle, and its 29-minute demo run overlapped its folding.

**Against run 1 and batch 20:**
- Per rung, all roles: 1.17M, the lowest of the three.
- Workers and skeptics together per rung: 0.80M, against 0.79M and 0.80M.
- The fixed roles: 1.09M against 1.20M, and nothing spent on a ruling, against run 1's 0.39M.

**The briefing's share.**
- Six agents were briefed: the three workers and the three skeptics. All six ran the briefing, none in its first turn, at calls 10 to 21, 45 to 94 s after start.
- Its results came to about 111K tokens, 3.2 % of writes, at 0.40 tokens a character plus 110 a call. That counts each `--part` call and the briefing files read back: D 32K, C 23K, E 19K, skeptic D 13K, skeptic E 12K, skeptic C 11K.
- Run 1: 193K, 4.1 %, 9 agents. Batch 20: 89K, 3.4 %, 4 agents. Per briefed agent: about 19K, against 21K and 22K.

**Other measures.**
- **First calls:** 507K (14.5 %), 7 cold, against 680K (14.3 %), 8 cold, and 468K (17.7 %), 7 cold.
- **Cache refills:** 0. **Refusal cycles:** none.
- **The skill's load** (`skill-load.py`): 396K, 11.3 %: 80K of load text (2.3 %) and 316K over 119 part reads (9.0 %). Against 10.4 % and 9.8 %. Two agents read `fortress-repo`'s `sources.md`, which the skill says not to load for a task: rung C and the review. Run 1 had four.
- **The task list:** only rung C made task calls (8 created, 14 updated). Its reminders reached the later agents; not measured in tokens.
- **Builds** (from the transcripts):
  - rung C 2, its change and its speed pass;
  - rung E 1;
  - rung D none, since walk reads its library from source;
  - skeptic E 2, one of them of unchanged code after its `Edit` was refused for a file not read (21:55:21 UTC), then the fix's (21:55:41);
  - the gather 1, the gate 1.

  `batch-measures.py` counts these. Its library-order column reads 0 for every agent (finding 8).
- **Distance sites gone, net:** 0. The gated stage is now the full check, and it holds run 1's 186.
- **Rows:**
  - 15 closed: 584, 726, 775, 809, 810, 811 (C); 800, 801, 802 (E); 468, 791, 670, 449, 464, 710 (D).
  - 9 opened: 809 to 817, of which 809 to 811 closed in the batch.
  - 3 rewritten: 611, 481, and 770 with its notes cut.
  - No note refused and left out.

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`):

| Agent | Id | Writes | First call | Messages | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung C | ae9d4d80 | 604K | 61K, cold | 251 | 92.2 | 20:05-21:37 |
| Rung E | a5a24580 | 410K | 59K, cold | 168 | 51.9 | 20:05-20:57 |
| Rung D | a09015ce | 323K | 20K | 150 | 53.0 | 20:57-21:50 |
| Skeptic E | a2650514 | 358K | 64K, cold | 124 | 31.2 | 21:37-22:08 |
| Skeptic C | a5f41829 | 393K | 30K | 147 | 35.8 | 21:50-22:26 |
| Skeptic D | acceb8e1 | 318K | 26K | 124 | 22.8 | 22:08-22:31 |
| Gather | ad2e621f | 439K | 71K, cold | 152 | 46.5 | 22:31-23:18 |
| Gate | ae76f97e | 122K | 54K, cold | 44 | 21.9 | 23:18-23:40 |
| Review | a94a111e | 412K | 63K, cold | 127 | 21.2 | 23:18-23:39 |
| Commit | a1848a5e | 118K | 59K, cold | 35 | 5.2 | 23:40-23:45 |

The preparation beside the run (the planner's re-read `b5908bef9`, the Fable review's third read, the two evening probes) was not measured here.

### 4. The tail

- **The gather** (439K, 46.5 minutes):
  - It composed the three rung commits on `main` itself, one patch at a time, each folded and committed before the next. No rung's staged change sat in the index while another rung's record was folded.
  - It ran the closing tests in a tree of its own seeded from the base build, `/home/user/fortress-gather21b`, whose index tree `7b6a35220` equals `main`'s code (`RECORD.md:7`):
    - C's and E's 21 compiled `.test` files in one JVM, 'OK (25 tests)';
    - `Generator22DRects`;
    - the 52 demos, 'demos: 52 run, 52 reached their end', 22:45 to 23:14 under `nice -n 19`;
    - the checker's driver over `trips.fss`.
  - It applied C, E, D in the manifest's order with no conflict.
  - It opened rows 809 to 817 and closed 15.
  - It folded F-281 to F-284 and rewrote F-80, F-81, F-223 and F-245. Its own grep found eight more FACTS entries made false (F-50, F-82, F-83, F-142, F-158, F-225, F-276, F-278).
  - Its sentence "No hunk of one rung moves a line that another rung's record cites" was false (finding 6).
- **The merged-diff review** (412K, 21 minutes, beside the gate): approved, nothing blocking. It made six record corrections in `7341a2ad8` and raised review.1 and review-routed.1. One correction made a right citation wrong (finding 1).
- **The gate** (122K, 21.8 minutes): green on `01cf94c5e`, as section 1 gives.
- **No judge, no repair.** The commit waited 0 minutes after the gate, against run 1's 18.
- **The commit** (118K, 5 minutes):
  - It landed the tables and the per-site list, built the PDF once (688 pages, one more), ran the quick microGPT walk check, and pushed `main` to the three refs on the first try.
  - It wrote no FACTS line. It again found no entry named "The true distance to the switch-over" and took F-53 for it (run 1's finding 11, repeated).
  - It reported F-240 as made false.

### 5. The microGPT walk check

Its verdict lines (`summary.txt:120`, `:122`): "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" for `MicroGptAplQuick`, and the same for `MicroGptFlatQuick` (the commit stage's result, `microgptWalk`). So 7 of 7 on both programs. Rung E also ran the pair on its own tree, which changes the api walk reads, with the same verdicts (`rung-export-align/REPORT.md` section 5).

## Part 1. Conformance

### Method

As in `reviews/batch-21-review.md`. I read each rung's commit, its `REPORT.md` and `SKEPTIC.md`, its section of the record (`CLIMB-BATCH-21.md:356-448`) with forks 13 to 34 (`:160-181`), the gather's `RECORD.md`, the run's results in its journal, and the code and the specification on `main`. Three standards, kept apart:
- the specification;
- the library's own way (P-27);
- the decisions on record: P-155, P-79, P-27, P-148, P-74, P-90, P-60, and the record's forks and defaults.

### The verdicts

- **Rung C, the full check: in the spirit of P-155,** which asks the check to read every operator "by the rules that it applies to any function". That is now so, and the distance's 5 is measured with every operator checked.
  - The prelude repair follows the prelude's own precedent, `HasRank extends Equality[\HasRank\]` (`Library/CompilerLibrary.fsi:266-274`), and adds no declaration (P-27; `compiler.md:29`).
  - The checker is about 15 to 25 % slower, within P-148's smoke test.
  - Four readings that no decision covers: splits 3, 4, 6 and the except repair.
- **Rung E, the api and the export check: in the spirit of `apis.tex`'s rule and P-27.**
  - The check now compares names, fields and `abstract` as the components chapter states.
  - The api states the component's members in the api's own form, `abstract` as at `Library/FortressLibrary.fsi:1597`'s `abstract getter mutability()`.
  - One reading CONTESTED by its skeptic, 4i (split 1, row 816), and one split between two of the team's sentences (split 2).
- **Rung D, the demos: in the spirit of P-79 and P-74,** with the specification's `/` and `÷` for `rects` (`Specification/basic/operators/opr-overview.tex:125-128`) and the library's halving `n DIV 2` (`Library/FortressLibrary.fss:4389`).
  - Item 247's default is built for walk and for row 710.
  - The checker's other refusals of `trips.fss` wait as row 817, D.worker.1.
- **No ruling on a rung.** Three skeptics approved. 7 fix commits, none contested, one a defect of the change (E's `var` field). The merged-diff review approved.

### Where the text, the brief or the principles split

**1. 4i: an api member written `abstract` needs no matching member (fork 20), and a client's compiled call of it can die at run time (row 816, E.skeptic.1).**
- **The text, read literally, supports fork 20's reading:**
  - "a definition $d'$ ... that includes definitions for all declarations other than the methods or fields declared \KWD{abstract} in $d$" (`Specification/basic/components/apis.tex:252-256`);
  - "for each field declaration and non-abstract method declaration ... a satisfying declaration ... When a trait has an abstract method declared, a satisfying trait declaration is allowed to provide a concrete declaration" (`Specification/basic/components/source-code.tex:381-385`).
- **The run-time guarantee says otherwise.** The skeptic's api `trait T abstract f(): ZZ32 end` with a component `trait T end` compiles, and a client's `mk().f()` dies with `java.lang.NoSuchMethodError` (`SkLibAbs`; `rung-export-align/SKEPTIC.md` section 3, finding 2). The base refused it loudly ('missing members').
- **The check cannot tell an inherited member from an absent one.** The library's own case, by my reading, is inherited: `AnyMaybe`'s `abstract getter holds()` (`fsi:981`) comes from `AnyUniqueItem`'s (`Library/FortressLibrary.fss:1699`). So no library call dies by it.
- **The other reading costs entries.** 4i's first rule alone keeps in the export error those of the probe's 8 whose component member is absent or of another header.
- **Was he told?** `PLAN.md:563`, default fork 20's reading. It bears on the export error's zero (finding 3).

**2. An abstract field: `apis.tex` against `source-code.tex`.** `apis.tex:255` exempts "methods or fields declared abstract". `source-code.tex:381-383` asks a satisfying declaration "for each field declaration". Rung E took the first, for a field all of whose names are abstract (`ExportChecker.scala:775-779`; its decision 4). No library field is abstract, so nothing moved by it. No decision covers it, and it is on no list.

**3. Rung C's crash repair: outside its trait, a self type is read as the trait type alone (row 809).** Five ways were listed (`rung-symbolic-check/REPORT.md` section 3). The rung took (a), where the variable is unbound: the trait comprises its listed types at every value of the variable, so the trait type holds the same values (P-60). Two consequences:
- The test that the brief asked to compile only typechecks. Its program stops in the code generator, 'E is not in the kind env', before row 701's refusal: row 812, which the skeptic found. The section's premise, "after, it compiles" (`CLIMB-BATCH-21.md:361`), did not hold.
- The unbound test reads the kind environment by name (decision 5). A variable named as another declaration's parameter reads as bound, as on the base (`SkCwMisbind`, accepted). The environment keeps no binding identity.

No decision names this reading. It is on no list.

**4. P-148's "without changing which programs the checker accepts or refuses", against C's speed pass.** The pass moves a test that reads no type, two functional methods at one `self` position, ahead of two that read types, with the same `OR` (`OverloadingChecker.scala:598-604`). The skeptic notes that a crash `lteq` could throw for such a pair is no longer reached; the answer is `true` (`rung-symbolic-check/SKEPTIC.md` section 5). So a program whose check crashed there would now pass that test. No program was measured, and the tables and `run.txt` are equal across change and pass. A reading only, on no list.

**5. The paths now split on a symbolic Meet Rule pair (fork 17, row 611).**
- The checker refuses an object that inherits two functional `||` with no declaration on their meet (`XXXFunctionalMethodMeetOperatorChecker`, 'Invalid overloading of || in object Vo').
- Walk loads it: its `checkedName` reads `NodeUtil.validOp` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1990-1994`).
- Fork 17 keeps walk as it is, and row 611 holds walk's half. Walk's source comment at `OverloadedFunction.java:1894-1895` still names `isDeclaredName` (review.1). The skill's list of walk's departures lacks the case (Part 3).

**6. Fork 18's "closed with its expected failure promoted", against the kept name.** Row 726's test keeps `XXX` with the checker's key, 'There are multiple declarations of ||'. A refusal test in `compiler_tests/` needs the prefix (`FileTests.java:395-410`; fork 33's form). In the fork's spirit, not its letter.

**7. P-79's text is now stale.** Its list names rows 670, 710 and 791 as the demos known to fail (`POSITIONS.md:85`). All three are closed, and every demo runs under walk (F-283). `trips.fss` is still refused by the checker for other reasons (row 817). His text. The record leaves it to the coordinator after run 2 (`CLIMB-BATCH-21.md:782`). It is in the boot note only.

**8. Smaller readings of rung D, all by the probe's patch and its forks.**
- `npbft`'s `Complex` leaves `Number`, whose closed `comprises` does not list it (fork 26).
- `trips`'s own `MIN` and `MAX` are removed. The team's comment above them, "The following definitions work around problems that arose when I tried the typechecker." (`ProjectFortress/demos/trips.fss:64-65`), now names nothing.
- `aStar`'s static parameter `Self` is renamed `Inst`.
- `GenomeUtil2d.fsi` is added, a copy of the team's `GenomeUtil2c.fsi` with its header kept (fork 24), as `committing.md`'s authorship rule asks.

### Rung C, `108ab82d6`

**What landed.**
- `isCheckedName` in the three loops, with `isDeclaredName` unchanged for the export check (fork 13; `OverloadingChecker.scala:270`, `:396`, `:405`, `:770`).
- `importsOnDemand` reading each api once and its `except` clause, at all three import loops. The planner's patch reached two of them (`:252-256`; rows 810, 811).
- `selfComprised`, read by `removeSelf` and by run 1's `withBounds` (`TypeAnalyzer.scala:610`; `TypeSchemaAnalyzer.scala:470-471`; row 809, row 775 cleared).
- The prelude's `GeneratorZZ32 extends Equality[\GeneratorZZ32\]` with three more exclusions, and its always-false `=` gone (`Library/CompilerLibrary.fsi:111`, `.fss:301`).
- The speed pass's reorder.
- Appendix I's Effect sentence (`Specification/appendices/changes.tex:2918-2923`).
- Tests: 11 compiled `.test` files and two helper apis. The skeptic added two `XXX` tests (rows 813, 814).

**Standard 1.** Operators overload as functions do (`Specification/basic/operators/intro.tex:23-25`). The rules apply to "the declarations that are declared or imported", and a name is imported on demand only if it is "neither listed in the except clause nor explicitly imported" (`Specification/basic/components/source-code.tex:248-258`). The except half is built. The explicit-import half is row 813, which needs name binding too (`rung-symbolic-check/SKEPTIC.md` section 3, finding 2).

**Standard 2.** `HasRank` is the precedent for the prelude. The import loops' shape is the file's own. The team lines changed are the prelude's `GeneratorZZ32` and its `=` (2008).

**Standard 3.**
- **P-155:** built. Its own second sentence is now false (C.skeptic.1).
- **P-148:** the profile-led reorder. The rest of the added time is the rules on the operator sets now read.
- **Forks 13 to 18:** as the table below gives.

**Verdict: in the spirit,** with splits 3, 4 and 6.

### Rung E, `031c38bbc`

**What landed.**
- In the check (`ExportChecker.scala`):
  - names compared through `equalIdOrOps` (`:597-604`, row 800);
  - a field compared by name, by its modifiers other than `var`, and by type (`:841-851`, row 801 and the skeptic's `13cf0b5ec`);
  - `equalMember(r, d)` the right way round (`:761`, row 802);
  - 4i and the count rule (`:775-796`);
  - the field's message names the field.
- `run2-api.patch` as it is (88 lines: 57 written `abstract`, 3 joined, 6 changed, `asDebugStriing` gone, 19 follow-on lines, `Array2`'s two subscripts).
- `CompilerBuiltin.fss:1170`'s `consume(): () throws IOException`, as its api and siblings write it.
- Nine compiled tests, `ExportVarFieldMatchesField` among them.

**Standard 1.** `apis.tex:252-256` and `source-code.tex:381-385`, with splits 1 and 2. `var` without `settable` "only affects implementations" (`Specification/basic/traits.tex:759-761`).

**Standard 2.** The api's existing `abstract` lines (`fsi:1597`; `Range`'s `abstract opr IN`) and the check's own name comparisons. Team lines changed: 88 api lines, which Part IV renders (`Specification/library/default-libraries.tex:27`), and one prelude line.

**Standard 3.**
- **Forks 19, 20 and 22:** built.
- **P-148:** profiled, no gain to take.
- **Defaults 4 and 5** (the export probe's questions): left in the error, as the record asks.

**Verdict: in the spirit,** with 4i CONTESTED by its skeptic.

### Rung D, `5e60e356a`

**What landed.**
- `demos-repairs.patch` as it stands (22 demos, `GenomeUtil2d.fsi`).
- `Generator22D`'s `rectsImpl` halving with `DIV` (`Library/Generator22D.fss:144`, `:145`, `:150`).
- `trips.fss:96`'s `generator extends StandardTotalOrder[\generator\]`.
- `Generator22DRects`.
- The checker's driver over `trips.fss`: 'acyclic errors=1' to 'errors=0', and 'trips errors' 57 to 54.

**Standard 1.** `/` on integers is rational (`opr-overview.tex:125-128`). An extender of a self-typed instantiation must be a subtype of its argument (`Specification/basic/traits.tex:306-312`).

**Standard 2.** `n DIV 2` and `asFloat` (P-74). The patch's repairs each follow a form the record or the team's later code uses (the probe's decision 5). Team lines changed: 22 demos and `rectsImpl` (2008).

**Standard 3.**
- **P-79:** the listed walk failures and row 710 are repaired. Row 731's demo half waits for a probe, by the record.
- **Forks 23 to 27:** built.
- **STAGE_BLIND:** neither stage ran, and the skeptic checked the list against the diff.

**Verdict: in the spirit,** with D.worker.1 open.

### The record's forks and defaults for run 2, against what landed

| Fork or item | Rung | Landed |
|---|---|---|
| 13, `isDeclaredName` kept for the export check | C | Built; row 782 latent (both skeptics read it so) |
| 14, the double count, once per api | C | Built at three loops, one beyond the planner's two; row 810 |
| 15, the prelude's `=` | C | Built as measured; a compiled `r = r` now `true`, measured, not gated (review-routed.1) |
| 16, compiled tests the check refuses | C | One, row 726's, its key respelled; testQuick 1,303/86/263 green |
| 17, walk's meet check left | C | Kept; row 611 rewritten to walk's half (split 5) |
| 18, row 726 closed by the check | C | Closed; the test keeps its `XXX` name (split 6) |
| 19, the 4h text on run 1's api | E | `run2-api.patch` as it is |
| 20, 4i | E | Built; row 816 `CONTESTED` (split 1) |
| 21, the count stage's blind spot | coordinator | Done before the launch (`58de05993`, `9a5583c85`) |
| 22, `Array2`'s subscripts in the api | E | Built (`fsi:1730-1731`) |
| 23, the demos probe's patch under item 247's default | D | Built; row 817 for the checker's other refusals |
| 24, `GenomeUtil2d.fsi` | D | Built |
| 25, no rows for repaired demo defects | D | Kept; one row, 817, for one not repaired |
| 26, `npbft`'s `Complex` an `AdditiveGroup` | D | Built |
| 27, `trips.fss`'s `generator` | D | Built; acyclic errors 1 to 0 |
| 28, nothing declared | all | Kept; nothing came |
| 29, speed passes for C and E | C, E | C's reorder; E none, by its profile |
| 34, run 1's sites if C does not land | none | C landed; the gated stage holds them |
| Defaults already taken, 2 (the `AnyList` crash) | C | Built, row 809 |
| Defaults already taken, 4 and 5 (the export probe's questions) | E | Left in the error; now the coordinator's calls for the last-5 batch (`PLAN.md:555-556`) |

### The global questions

- **Promised against landed.** Closed as planned: 584, 726, NEW-C-1 (809), NEW-C-2 (810), 800 to 802, 791, 670, 449, 464, 468 and 710. Row 775 closed too, which the section allowed.
  - Beyond the plan: 811 (worker C, closed), 812 to 814 (skeptic C), 815 (worker E), 816 (skeptic E), 817 (worker D).
  - The count 3 and the distance 5 as planned; the export entries 15, "about 15".
- **The record's premises that failed:**
  - "Run 2's rungs share no file" was true of files. The gather read it as "no cited line moves" (finding 6).
  - Test (2) "after, it compiles" (split 3).
  - The planner's double-count patch covered two of three loops.
  - E's 0.55M and D's 0.4M, both high.
- **Built twice: no.** No two rungs share a file.
- **The library's way:** yes for each, with the precedents above.
- **Together:** C and E change the compiled checker in different files and phases. E's check still reads `isDeclaredName`. The gather's merged runs pass every rung's tests, the 52 demos, and the driver over `trips.fss` at D's after-figures.

### Findings

Ranked by what they cost or risk next, each with its home.

1. **The merged-diff review's correction made a right citation wrong, in the section the skill writer copies.** `RECORD.md:27` and `:254` now cite `Specification/basic/components/apis.tex:250-254` for the matching rule. The quotation, "A matching definition of a declaration $d$ ... The header and type of $d'$ must be the same as the header and type of $d$.", stands at `:252-256` on `main`: `:250-251` are "A component must include ...", and F-282 cites `:252-256` rightly. The file is unchanged since the team's `5a68404fd`. Proposed (mine): restore `:252-256` in both lines before the writer's task. Home: the coordinator, in the routing commit.
2. **The export error's 15 entries are not its differences.** The check stops at the first member of a trait that fails: `(inAPI.forall(handleOne), cause)` (`ExportChecker.scala:812`). So each entry names one member, and clearing it can show the next. `RR64`'s rounding operators (the export probe's question 1) stand behind its `^`. Proposed (mine): before the last-5 batch's record is written, the export probe's run-to-the-end shadow (`perf-probes/export-check-full/export-check-shadow.patch`), re-based on E's check, gives the difference list on `32242b80d`. The `Condition` probe's way A+, measured on run 1's code (43 to 41 entries), is measured again there. Home: the last-5 planner's probe.
3. **4i bears on the export error's floor.** If he takes 4i's first rule alone, entries come back. The PLAN entry (`:563`) and the list's head say none blocks a batch. Proposed (mine): its "needed by" is "before the last-5 batch counts the export error's zero", told to him with that batch's record. Home: `PLAN.md:563`.
4. **Routing gaps** (Part 4):
   - run 2's forks and its points for his sight have no entry, nor does the export message hidden under 'DISTANCE SAME 5';
   - rows 812 to 815 have no PLAN line;
   - C.skeptic.1 has no default;
   - P-79's stale list stands only in the boot note;
   - run 1's review findings 2, 3 and 11 have no PLAN line.

   Home: the routing.
5. **The manual and the script still name FACTS entries that do not exist** ("The true distance to the switch-over", "The checker-count stage's table": `coordinator/climb-batch-workflow.md:249`, `climb-batch-workflow.js:1352`), and the commit stage searched again. F-240 is false again: it names "the last landed gate, climb batch 21's first run's", 78 s and 206 s. The figures now are about 90 s and 235 s. Proposed (mine, run 1's finding 11 widened): name F-53 and F-66 by number, and have the commit stage rewrite F-240's two figures from `distance.txt` and the count stage's call times. Home: PLAN, "Work that can start now".
6. **Moved citations across files no two rungs share.** The gather's order rule reads only shared files. So it wrote that no hunk moves a cited line, where C's prelude hunk, C's Appendix I lines and E's api text moved lines that D's and E's files and F-44, F-58 and F-276 cite. The review found and listed them (`RECORD.md:22-27`). Proposed (mine): the manual's gather step greps the other rungs' files, the folded record and FACTS for citations of each file a rung edits. Home: the manual, "Gather".
7. **Every batch that changes walk or its library owes the 52 demos, and no step names it.** F-283 says so, by P-79. This gather ran them on the merged tree, 29 minutes overlapped with its folding, by its own reading of the closes. Proposed (mine): the manual's gather step names the demo driver of `rung-team-demos/REPORT.md` section 13 when a landed rung edits walk, `Library/` or `ProjectFortress/LibraryBuiltin/`, in the background while it folds. The last-5 record names it too. Home: the manual, "Gather"; the last-5 record.
8. **`batch-measures.py`'s library-order column reads 0 for every agent, in batches 20, 21 and 21b.** `LIBRARY_SEG` (`explorations/coordinator/tools/batch-measures.py:50`) wants `fortress compile ...CompilerLibrary`, and agents run the library order as `for f in ... ../Library/CompilerLibrary.fss ...; do ../bin/fortress compile $f`. Run 1's finding 10 (`nice`) is not built either. Home: PLAN, "Work that can start now".
9. **Row 756, the crash's sibling, was read by worker C (20:17 UTC) and not tried.** By my reading its crash is in a member's declared type (`getter item(): E`; `TypeAnalyzer.staticParam` from `pSubInner`'s variable case), not the self type, so `selfComprised` does not reach it. One compile of its program on `main` settles it. Home: the last-5 planner's probe, or phase 3 item 19's checker rows.
10. **The skill sentences** in Part 3. Home: the skill writer.
11. **Rung C timed two code states twice**, base and pass as a second pair at a low load, against "One run of each tree is enough" (`.claude/skills/fortress-repo/references/compiler.md:148`). About 3 minutes of one core. Home: this note.
12. **The session's scratchpad again:** skeptic E's `EC.scala` and the gate's `atomic-runs.sh`. That is batch 20's finding 13, which is not built (`PLAN.md:189`). Home: that line.

## Part 2. Did the practice hold

### The skeptics' fixes

From the journal's results and each `SKEPTIC.md`: 7 fix commits, one a defect of the change, none contested.

| Rung | Fix commits | Defects of the change | Test first |
|---|---|---|---|
| C | `172e1d35a` (report and record from the journal), `208c1aca0` (corrections, two `XXX` tests, rows 812 to 814) | 0 | `XXXImportExplicitHidesOnDemand` red with the defect taken out for one run, 'Saw failure, but did not satisfy compile_err_contains', 'Tests run: 1,  Failures: 1'; both new tests green on old and new code, 'OK (2 tests)' |
| E | `9c37973f6` (from the journal), `13cf0b5ec`, `616956284` | 1, `13cf0b5ec`: a `var` field no longer satisfied the api's field | `ExportVarFieldMatchesField` on the worker's head at 21:54:38 UTC, 'due to different field x', 'Tests run: 1,  Failures: 1'; green on the old code; after the fix and the library order, 'OK (9 tests)' at 21:57:56; testQuick 1,302 green |
| D | `3c35f4416` (from the journal), `18755d351` | 0 | prose only |

- Every fix is sound and stays inside its rung's work.
- Against the batches before: run 1 made 13 with 1 defect, batch 20 11 with 0, batch 19 9 with 2. The one defect turned a value the base accepted into a refusal, the kind the failure-mode check looks for.

### Workers, test first

- **C:**
  - Tests (1) to (4) ran on the base's build at 20:18:57 UTC: 'Tests run: 5,  Failures: 3', with (3) the guard passing.
  - The first source edit came at 20:21:11.
  - Tests (5), (5b) and (2b), for defects found during the edit, were written after it began. Each ran red on the unbuilt base at 20:24, 20:25 and 20:33, before the edit's first `ant compileAll` at 20:35:36.
  - Row 775's and row 611's tests were written after the build and seen red on the old code through `old-fortress.sh junit` (`rung-symbolic-check/REPORT.md` section 2; SKEPTIC.md section 1).
  - Test first in substance; the letter is missed for five of its eleven tests. Run 1 had no miss of order.
- **E:** five tests written at 20:12:15 and run on the base at 20:13:20, 'Tests run: 6,  Failures: 6'. The first edit came at 20:14:40. The respelled test was red on the old code at 20:23:59.
- **D:** `Generator22DRects` written at 21:02:46 and red on the base at 21:03:18, 'Failed to find any matching overload, args = (Ratio,Ratio)'. The library was edited at 21:03:50.

### The rulings

None: no fix was contested, no rung refused, no worker stopped.

### The merged-diff review

- Approved, nothing blocking. Six corrections in `7341a2ad8`:
  - F-44, F-58 and F-276 re-anchored;
  - F-244's row 775 made fixed;
  - `RECORD.md`'s "Lines moved";
  - C's range bullet;
  - `PLAN.md:563`'s lines;
  - E's `apis.tex` citation, made wrong (finding 1).
- review.1 and review-routed.1 entered at `PLAN.md:566-567`. `landing-check` printed 'no finding'.
- Cost: 412K beside the gate, and no wait at the tail.

### The briefing in each agent's first turn

| Batch | Briefed agents | In the first turn | Run at all | At calls | Seconds after start | Its tokens (estimate) |
|---|---|---|---|---|---|---|
| 20 | 4 | 0 | 4 | 9 to 12 | 48 to 78 | 89K, 3.4 % |
| 21 | 9 | 0 | 9 | 8 to 15 | 24 to 97 | 193K, 4.1 % |
| 21b | 6 | 0 | 6 | 10 to 21 | 45 to 94 | about 111K, 3.2 % |

For the share that `coordinator/references/batch.md:45` asks at a landing: 6 of 6 read it, none in the first turn.

### Builds and runs, repeated or not

- **Builds:** as section 3 gives. One build of unchanged code (skeptic E, after its refused `Edit`).
- **Suites:**
  - C `testQuick` once;
  - E `testQuick` and `testSpecData` once each;
  - skeptic E `testQuick` on its fix;
  - D, skeptics C and D, none.

  Each is what the sections and `tests-running.md:59-69` ask.
- **Count and distance stages:**
  - C: the count stage five times (base, change, pass, then base and pass again) and the distance stage once;
  - E: the count stage twice (base, change; no pass edit) and the distance stage once;
  - skeptics C and E: base and head, the manual's one exception;
  - D: neither stage.
- **Re-measured without a code change:** rung C's second pair (finding 11).
- **The demos:** D ran the 52 once on its final tree. The gather ran them once on the merged tree, a new code state, since E's api is read by walk. The probe's base run stood as D's before and was not run again. The driver over `trips.fss` ran before and after at D, and once at the gather.
- **Taken from the record, not run again:** run 1's tables as every rung's before; the planner's `full-check-base.tsv` as C's before under the full check; the planner's measurement of `run2-api.patch`; the demos probe's base run.
- **The PDF built once,** by the commit stage. C built the specification to check it and removed the build.

### Refusals by the harness and the tools

- **All three workers' writes of `REPORT.md` were refused,** as the script expects. Each skeptic wrote the report and record from the journal with `journal-text.py`.
- **Three `sleep` calls were blocked:** rung C (`sleep 60`), rung D (`sleep 60`), the gather (`sleep 200`).
- **Four `Edit` calls were refused for a file not read:** rungs C, D and E, and skeptic E, whose refusal was followed by a build of unchanged code.
- **One ledger note refused for length:** row 770, written by a rewrite that cut its notes to 1,195 characters.
- **No structured result was refused.** No refusal cost a cache refill.

### The practice's measures, batches 20 to 21b

| Measure | B20 | B21 | B21b |
|---|---|---|---|
| Written | 2.64M | 4.75M | 3.50M |
| Rungs, agents | 2, 8 | 4, 14 | 3, 10 |
| Per rung, all roles | 1.32M | 1.19M | 1.17M |
| First calls | 0.47M, 7 cold | 0.68M, 8 cold | 0.51M, 7 cold |
| Refusal cycles | 0 | 0 | 0 |
| Rulings and repairs on the merged tree | 0 | 8.3 % | 0 |
| Skeptic fix commits (defects) | 11 (0) | 13 (1) | 7 (1) |
| Distance sites gone, net | 26 | 0 (full check 186) | 0 (the gated stage now the full check) |
| Count stage at the gate | 63 s | about 78 s | about 90 s |
| Distance stage at the gate | 161 s | 206 s | 235 s |
| Skill's load | 9.8 % | 10.4 % | 11.3 % |
| Briefing, estimated | 3.4 % | 4.1 % | 3.2 % |
| microGPT quick pair, verdicts | 7 of 7 both | 7 of 7 both | 7 of 7 both |

### Run 1's findings, a run later

1. The microGPT timed pair: dropped at his ruling of 2026-10-23.
2. The overlap claim and the cycle rule: the record's run-2 overlap held. The manual's two rules are not built. This run met a cousin (finding 6).
3. The gather's specification corrections: not met (C edited its Effect sentence only). The manual is unchanged.
4. Rows 585, 784 and 783 held by no gated stage: answered by rung C.
5. Row 713: his, unchanged.
6. The record's forks without an entry: routed for run 1; owed for run 2.
7. The hidden moved sites: none moved. The export message is hidden this time (Part 4).
8. P-156's reason: his, in the boot note's asks.
9. F-240: rewritten at run 1's routing, and false again (finding 5).
10. `batch-measures.py` under `nice`: not built (finding 8).
11. The FACTS names: not built, met again (finding 5).
12. The skeptics' scratchpad: met again (finding 12).
13. Run 2's patch: written again by the planner (`b5908bef9`).

### Misses, by kind

Numbered on from `batch-21-review.md`'s 673.

Found inside the batch:
- **The change wrong:** 674, E's field comparison refused a `var` field the base accepted (`13cf0b5ec`, skeptic E).
- **A test that reached too little:** 675, C's test (2) holds the checker's half only (row 812, skeptic C). 676, no gated test asserts a compiled `r = r` (review-routed.1).
- **A defect without its home:** 677 to 680, rows 812, 813, 814 (skeptic C) and 816 (skeptic E).
- **Text claiming more than the code or the evidence:**
  - 681, C's `overloading.tex:125-130` citation (`208c1aca0`);
  - 682, E's base line `ExportChecker.scala:623` (`616956284`);
  - 683, D's `:60-96`, 17 demos for 16, the driver's summary line, row 817's notes without their commit, and the Revival change's "stopped" without "by reading" (`18755d351`);
  - 684, C's revival change naming two tests for `r = r` (the review);
  - 685, the gather's "No hunk ... moves a line" (the review);
  - 686, F-244's row 775 (the review);
  - 687, `PLAN.md:563`'s `source-code.tex` lines (the review).
- **Sentences made false and not listed:**
  - 688, F-80, F-81, F-223 and P-155 (skeptic C);
  - 689, F-50, F-82, F-83, F-142, F-158, F-225, F-276 and F-278 (the gather);
  - 690, F-44, F-58 and F-276's api lines (the review).
- **The record's premises:**
  - 691, test (2) "after, it compiles" (skeptic C);
  - 692, the planner's patch at two of three loops (worker C);
  - 693, "Run 2's rungs share no file" read as no cited line moving (the gather, the review);
  - 694, E's and D's estimates, both high (this review).
- **The team's code, found by the rungs:** 695, row 811 (worker C), row 815 (worker E), the prelude's `consume` without its `throws` (worker E, no row), row 817 (worker D), each on the base too.
- **Process:**
  - 696, three report writes refused (by design);
  - 697, three `sleep` calls blocked and four `Edit` calls refused, one followed by a build of unchanged code;
  - 698, row 770's note refused for length;
  - 699, C's second timing pair;
  - 700, two files in the session's scratchpad;
  - 701, two agents read `sources.md`;
  - 702, the commit stage's search for a FACTS entry that the manual names and the record lacks.
- **The review's own error:** 703, the review's correction of the `apis.tex` citation.

Found by this review: 704 to 715, findings 1 to 12 above.

**Against the earlier notes.**
- 30 found inside the batch (674 to 703), against run 1's 28.
- One was a fault of the code (674), caught by its skeptic. The rest are text claims, homes and premises, which the skeptics, the gather and the review caught.
- Landed with no known wrong value.
- The known costs: the open question of 4i (row 816), six new open rows, and the 15 entries' hidden depth (finding 2).

## Part 3. Skill sentences the batch made false

For the skill writer. Lines are of `.claude/skills/` at `aff478ca5`, unchanged by the batch. The gather's record lists three rungs' revival changes and no sentence made false (`RECORD.md`, "Revival changes, for the skill writer"). Finding 1 corrects that section's `apis.tex` citation before the writer copies it.

**Made false or incomplete by climb batch 21b:**
- **`fortress-repo/references/interpreter.md:46-55`,** "Walk departs from the rules in these cases:". The list lacks the case rung C made: walk loads a type whose two functional symbolic operators break the Meet Rule for Functional Methods, which the checker now refuses (row 611; `XXXFunctionalMethodMeetOperatorChecker`). Beside it, **`:57`**, "two functional methods that break the Meet Rule for Functional Methods ... in a type that provides both", holds only for operators named by a word and for identifiers: walk's `checkedName` reads `NodeUtil.validOp`.
- **`fortress-repo/references/compiler.md:137`,** the count stage "about 80 seconds, more under load". With every operator checked, it took 96.8 s and 98.3 s on the rung's head at loads 0.85 and 1.94, against 78 s to 84 s on the base, and about 90 s at the gate. Approximate and stale.
- **`fortress-repo/references/compiler.md:83`,** the `comprises`-`where` bullet. It lacks rung C's reading: outside the trait, such a trait's self type is the trait type alone (F-281). A generic trait that defines its member still stops the code generator (row 812). Its row-756 departure is true by my reading, not tried on the new code (finding 9).

**Not false, but incomplete, each met by this batch:**
- **`fortress-repo/references/compiler.md:67-71`,** "Traps of the compiled path". It names no `NoSuchMethodError` at run time after a clean link: a comprised object's functional method called at the object's static type (row 815), and an api's `abstract` member that the component leaves out (row 816).
- **The skill has no sentence on the export check.** The rung's revival change covers it: names and headers matched, a field by name, its modifiers other than `var` and type, an `abstract` api member needing no member, and each entry naming only its trait's first difference (`ExportChecker.scala:812`).
- **`fortress-repo/references/tests-running.md:54-57`,** "Outside the gate". It does not say that no suite runs `ProjectFortress/demos/` (F-283), nor how a rung checks the demos. Batch 20's review asked it (`PLAN.md:192`). Rung D's driver (`rung-team-demos/REPORT.md` section 13) is the material.
- **The import rules on the compiled path:** a name imported by name is still read on demand from another api (row 813), and an `except` that lists an operator leaves it imported on both paths (row 814). They are in the rung's revival change and in no part of the skill.

**Rules the batch met that stay true:**
- `fortress-repo/references/revival-changes.md:19`: the duplicates rule wherever `self` stands, now true of operators too.
- `compiler.md:29`: no declaration added to the prelude.
- `tests-running.md:69`: an edit of either library runs only its own tests, which E followed.
- `records.md:105`: the notes' 700-character limit, which the gather met at row 770.

**Checked and not false:** `coordinator/references/batch.md:45` (6 of 6 read). `:58-61` (every hidden difference on the review list) is true as a rule and not kept (Part 4). The coordinator skill is edited only with his yes on its wording (the boot note), so nothing is proposed there.

## Part 4. Routing

Checked against `main` at `aff478ca5`: the gather's PLAN entries (`108ab82d6`, `031c38bbc`, `5e60e356a`, `01cf94c5e`), the review's (`7341a2ad8`), the probes' PLAN entry (`2c12a0ee9`) and the boot note. PLAN's routing runs after this review, by the boot note.

### The items of `forCurator` and the gather's

- **C.skeptic.1** (P-155's second sentence): `PLAN.md:562`, "no default on record". **Missing: a default** (proposed under "For the curator").
- **E.skeptic.1** (4i, row 816): `:563`, default fork 20's. Sound, but its "needed by" is before the export error's zero (finding 3).
- **E.worker.1, E.skeptic.2** (getters, setters, method sets): `:564`, default none. Sound. It could hold split 2, the abstract field.
- **D.worker.1, D.skeptic.1** (`trips.fss` under the checker): `:565`, default acted on. Sound. Its other home, review-queue item 247, has a stale "Needed by" line.
- **review.1** (walk's comment): `:566`. Sound.
- **review-routed.1** (a compiled `r = r` test owed): `:567`. It is a test owed, not a question. Its home is row 481's notes or the next prelude-ranges rung.

### New rows

- **809, 810, 811:** closed in the batch.
- **812** (the code generator's crash before row 701's refusal): **no PLAN line.** Home: beside row 701's line (review-queue item 182), after the switch-over.
- **813 and 814** (the import rules; 814 on both paths): **no PLAN line.** Home: one candidate line in phase 3 item 19's list, a name-binding rung that reads explicit imports and an operator's `except`.
- **815** (`NoSuchMethodError` for a comprised object's functional method): **no PLAN line.** Home: beside its siblings 770 and 739 in item 19's other candidates, or phase 5 with the code generator's rows.
- **816, 817:** on the review list.
- **Rewritten 611** (walk's half): its walk family is the load-check rung (review-queue item 260; P-45's walk rows), with no PLAN line naming it. **Rewritten 481:** review-routed.1.
- **756** (untried): finding 9.

### What the record listed for him, and PLAN lacks

- **The record's run-2 forks taken at their defaults:** 13 to 20, 22 to 27, 29 and 34 (`CLIMB-BATCH-21.md:160-181`). No entry, against run 1's at `PLAN.md:550`.
- **The record's points for his sight, run 2's part** (`:185-188`): the team lines changed and what each path and the specification now do.
  - C: `GeneratorZZ32`'s header and `=`.
  - E: the 88 api lines; `CompilerBuiltin.fss:1170`.
  - D: 22 demos, `npbft`'s `Complex` out of `Number`, `trips`'s `MIN` and `MAX`, `aStar`'s `Self` renamed, `GenomeUtil2d.fsi`, `rectsImpl`.
  - The checker checks every symbolic operator, and the export check compares names and fields and reads `abstract`.
  - Under walk the demos run. Part IV renders E's api lines. Appendix I's Effect sentence is rewritten.

  No entry.
- **The difference the gate's comparisons hid:** the export site's message, 43 to 15 entries, under 'DISTANCE SAME   5'. No entry. Climb batch 20's proposal to exempt self-explained moves is not adopted (`PLAN.md:187`).
- **The record's "After the landing" for run 2** (`:782`):
  - P-155's line: C.skeptic.1. P-79's line: the boot note only, **no PLAN entry**.
  - FACTS: F-245 done; F-53 true; the export error's entries are in F-282; F-240 false (finding 5).
  - Batch 22's lists: in pieces in item 19 and the boot note's "The last-5 batch".

### Answered, stale or overlong in the record

- **PLAN's "Where we stand"** (`:9-13`): the walk check's landings, the live thread (206 s; "climb batch 21b's rung E's ... about 15 entries ... by the record's count"), "Landed" and "Next" all end at run 1.
- **Phase 3's item 19** (`:59-64`): "Its second run, climb batch 21b, ... is being prepared". Its three run-2 candidates are built: the check (C), the demos (D), the export error (E). Their "After it" halves stay: row 782; row 731's demo half; the remaining entries.
- **`PLAN.md:525`,** A.skeptic.4 (`Array2`'s subscripts): built by E. To history.
- **`PLAN.md:233`,** the P-79 parked entry: rows 670, 710, 791 and 464 are closed. Its "`mg.fss` stops earlier than on the base (row 464)" is false; `mg` reaches 'L2 Norm is 0.0'.
- **`PLAN.md:551`,** "and 2 as run 2 builds it": built.
- **`PLAN.md:192`,** batch 20's review Part 3: its first half (the 700-character notes limit) is built at `records.md:105`; its second half (the demos in `tests-running.md`) is not.
- **Run 1's review findings 2, 3 and 11:** no PLAN line (only finding 10 stands, in the boot note's "Next").
- **The review queue:**
  - the next-batch line (`review-queue.md:15`): items 11 and 191 (rung C), 199 (built by E) and 247 (built by D's default, D.worker.1 open);
  - "The checker rung on row 775" (`:22`), item 183: row 775 is closed by rung C, so it is answered.
- **FACTS:** F-240 false. F-281 (1,472 bytes), F-282 (1,441) and F-283 (734) are past the record's 600, as the gather reported.

### The steps due before the last-5 batch

The next batch is the one for the distance's last 5 errors, by the boot note's "The go".
1. **The record's fix:** restore `apis.tex:252-256` in `RECORD.md:27` and `:254` (finding 1).
2. **The skills:**
   - the orientation update, running as `wf_1db64500-327`, installed by the writer;
   - the writer's task with `RECORD.md`'s revival changes and Part 3;
   - a cold read and the writer's fixes;
   - all pushed before the launch (the manual's routing, steps 4 and 5).
3. **FACTS:** F-240 at 21b's gate: the distance stage 235 s (`FortressLibrary` 172 s), and the count stage about 90 s by the gate's call times, with its table recording no seconds. The three long entries go into the consolidation.
4. **PLAN and the queue:** the lines of this Part, rows 812 to 815 among them.
5. **For the last-5 planner:**
   - Its before: 21b's gate tables and `compile-ladder/gate/distance-sites.tsv` at `32242b80d`. The gated stage is the full check, so its rungs need no shadow stage.
   - The export error's differences on the landed tree (finding 2): the export probe's run-to-the-end shadow re-based on E's check, and the `Condition` probe's way A+ measured again on `32242b80d`. Its 43-to-41 figure is from run 1's code.
   - The 15 entries' homes (`rung-export-align/REPORT.md` section 5):
     - `Just`, `Nothing` and `Maybe` (P-90; way A+ for `Maybe`'s header, way A++ for the two subscripts);
     - `String` (P-155's later work);
     - `RR64`: its `^` at `fsi:366` against the component's `^(self, b:Number)`, then the rounding operators by P-68's call;
     - `Condition` (way A+);
     - `TotalComparison`'s `=`, which came by row 800's fix;
     - `DelegatedIndexed`, `ImmutableArray1`, `Array1`, `Array2`, `Array3`, `ActualReduction`, `BigReduction` and `Comprehension`, each with a way of its own.
   - E.skeptic.1's answer, or its default, before the export error's zero is promised (finding 3).
   - Row 731's three sites, a checker project, and item 46's arm by `cast[\O0\]` (`PLAN.md:554`).
   - The 52 demos run on the merged tree if a rung edits walk or the library, as F-283 asks (finding 7). The last-5 batch's library edits do.
   - Row 756 tried on `main` (finding 9).
   - A base build at its base. Then `/home/user/fortress-base21b` and `/home/user/fortress-gather21b` are removed.
6. **The tools, when no batch is spliced:** findings 5, 6 and 8, and batch 20's finding 13.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no file of the tree and committed nothing.
- I read the run's transcripts only through scripts:
  - `batch-measures.py` (batches 20, 21 and 21b), `spend.py` and `transcript-study/skill-load.py`;
  - scratch scripts of mine for per-agent times, briefing calls, builds and refusals, kept in a folder of their own in the session's scratchpad, `rev21b/`.
- I ran `ledger.py show`, `facts-extract.sh` and `git`, which write nothing.
- The count stage's gate time comes from the gate's call times. I cite no file under `tmp/` as a source.
- I compared no walk timing.
- I did not read the coordinator's session. What he was told comes from PLAN and the boot note. The INDEX line for this review is the coordinator's.

## For the curator

In order of consequence, each with its default and when it is needed:

1. **An api member written `abstract` now needs no member in its component, as the components chapter reads; but a program compiled against the api that calls such a member dies at run time, `NoSuchMethodError`, where the old check refused the component (row 816).** The other reading asks the component to declare the member, abstract or concrete, which keeps the guarantee and leaves a few more entries in the export error. Default: as landed, row 816 open. **Needed before the export error's last entries are cleared** (the next batch), since the other reading brings some back.
2. **`trips.fss`, which now runs under walk, is still refused by the compiled checker for other reasons (row 817), and P-79's sentence still lists rows 670, 710 and 791 as the demos that fail.** Default (rung D's, acted on): the checker's acceptance of `trips.fss` waits with row 731's demo half, for a probe of the checker over every demo. Default (mine) for P-79's sentence: narrowed to those two. Not blocking.
3. **P-155's second sentence, "Today its overloading check reads an operator only if its name is a word of capitals ...", is false since this batch: the checker checks every operator.** Default (mine): the sentence says the check is built (climb batch 21b, F-281), and the old wording goes to POSITIONS-history. Not blocking.
4. **The run-2 choices the record made at its defaults (forks 13 to 34), and the team lines it changed:**
   - the compiler prelude's range trait with its always-false `=` removed;
   - 88 lines of the library's api, 57 of them now written `abstract`, three added, six changed, a misspelt method removed;
   - one prelude line;
   - 22 team demos, among them `npbft`'s `Complex` no longer a `Number` and `trips`'s own `MIN` and `MAX` removed;
   - a new `GenomeUtil2d.fsi`;
   - `Generator22D`'s `rects`.

   Default: as landed. Not blocking.
5. **The export check still compares an api's field only with fields and its method with one method of the same header, where the text lets a getter or setter, or a set of methods, satisfy them; and the two texts differ on an `abstract` field, which rung E read as needing no definition.** Default: as read and built, no probe, no row. Not blocking.

Information:
- The count stays 3 and the distance 5, now with every operator checked. The export error's entries fell from 43 to 15. Each entry names only the first difference of its trait, so more lie behind them.
- Run 2 wrote 3.50M over 10 agents in 3 h 40 min, against about 3.7M and 3.5 hours.
- Every worker's test failed before its fix in substance. The skeptics found one fault of the change, a mutable field refused by the new export check, and fixed it test first.
- microGPT's quick walk check: 7 of 7 on both programs. All 52 team demos run to their end under walk.