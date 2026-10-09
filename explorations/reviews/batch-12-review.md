<!-- The combined post-batch review of climb batch 12 (run wf_7814a5bc-549, base 7fa767d48, launched 10:04 UTC on 2026-10-09, landed at 14:40 UTC at 32b88cd3b: rungs C 054c4bcfd, S 74b28e9d4, G aadd02f23, R abe8b0342, W fdd377ead, the closes 85e8863b5, the gather record 3a84269f7, the review's corrections 5ac066690, the cold read 3711db681 and the gate's tables), the second run of the redesigned practice of coordinator/process-engineering/batch-redesign.md, in the form of reviews/batch-11-review.md, judging conformance, whether the practice held, the skill sentences the batch made false and the routing, written on the curator's standing word ("One review after every batch", POSITIONS) by a review worker reading only, against main at caf060cdc, with the 17 transcripts and the journal read through bounded scripts under tmp/rev12/, the run's measures from tools/batch-measures.py and tools/spend.py (they agree: 5.43M written), the per-site lists of batch 11 (git show f9d3ec826:explorations/compile-ladder/gate/distance-sites.tsv) and batch 12 compared site by site through the batch's own diff, nothing built, no Fortress program, suite or stage run, and tokens counted as writes only (input plus cache creation, one count per message id). -->

# Climb batch 12: conformance, the practice, and routing

## What came up in this run

### 1. The count 1 to 1 and the distance 207 to 153, by rung

**The count, 1 to 1.** `compile-ladder/climb-batch-12/gate/checker-count.txt`: `FortressLibrary 2` (row 582, `isLeftZero`), `#crash none`, the shadow matching; the table is batch 11's line for line. The gate prints `COUNT SAME 1, declared none`.

**The distance, 207 to 153 (−54).** Each rung's own tree, by its report and its skeptic, then the merged gate read site by site:
- Rung S: 207 to 175 on its tree, −32: the 19 storing-object sites, the nine one-off slips, row 606's 2 and row 635's 2, as the record listed them (`rung-library-slips/REPORT.md` section 6).
- Rung G: 207 to 194, −13: row 628's 8 abstract-method sites, 4 generator bindings and `MonoidReduction`'s `lift` (`rung-reduction-types/REPORT.md` section 3).
- Rung R: 207 to 198 on its tree, −9: its nine sites gone (rows 655 2, 654 1, 656 5, 608 1), one site come that its own fix uncovered, and one gone that is not its own. The site come is row 664, `FortressLibrary.fss:2257`: once row 608's `r'.lower` typed, the checker read the call two lines below and refused its `reflect`ed sizes, as at `Array1`'s twin (`:2315`, already on the list). The site gone is row 488's `BIG LEXICO` body (`:130`), which varies from run to run (`rung-range-kinds/REPORT.md` section 3).
- Rung C: 207 to 206, −1: row 642's `String.fss:431`.
- Rung W: nothing moved, as the record expected ("the stages do not read walk"). W ran both stages (`DISTANCE SAME 207`, the count the same), since it edited `interpreter/env/`, which the script's `STAGE_BLIND` list does not cover (section 3).
- **The merged tree, by site.** I mapped each of batch 11's 207 sites through `git diff -U0 7fa767d48 32b88cd3b` and matched them against the 153 (`tmp/rev12/sitemap.py`). 55 sites are gone: S 32, G 13, R 9, C 1, each the one the record named. One site came, row 664's. Five more only moved: row 433's four `distribute` sites (`:3263`, `:3265` to `:3278`, `:3280`, their message now naming `Maybe[\T\]`) and `__immutableFactory1`'s own body site (`:2432` to `:2431`, the message now naming `ImmutableArray1`). Row 488's site is on the merged list (`BR 4`). So 207 − 55 + 1 = 153.
- **Against the record** (`CLIMB-BATCH-12.md:502`): C 1, R up to 9, G 13, S 32, "the distance near 152". The one over is row 664, a site row 608's error hid. Nothing the record expected was missed.
- **The class table is partly the tool's.** `classify.py` finds its places by declaration since `9d24290fb`, after batch 11's gate. The gate's class moves mix that with the batch: `G1 0 -> 18` is row 634's 18 sites, which did not move; `S1 28 -> 29` is one site re-classed; `OT 67 -> 16` mixes both. By kind, which the tool did not change: abstract-method 8 to 0, wellformed 36 to 17, typecheck 156 to 129. The three crash rows are the same three declarations at lines S's hunks moved (`:2501` to `:2500`, `:2884` to `:2899`).

The 153 by what each group waits on (the record's groups, less what landed, plus row 664): the arrays 67 (fork 3 now 10 with row 664); the self-typed bodies 30; his other open items 40; the `where` clauses 12; row 425 3; row 488 1.

### 2. The cost, against the record's estimate and batch 11

**How it was counted.** `tools/batch-measures.py` and `tools/spend.py` on the run's folder: 17 agents, 5.43M written, 526M read, no cache refill. My own per-agent script (`tmp/rev12/agents.py`) agrees to the token. The span is 10:04 to 14:40 UTC, 4 h 36 min; all agents ran on Opus, two at a time.

| Role | Batch 11 | Batch 12 | Per rung, 11 to 12 |
|---|---|---|---|
| Rung workers | 1.99M (4) | 2.05M (5) | 497K to 410K |
| Skeptics | 1.60M (4) | 1.67M (5) | 400K to 333K |
| Judges | 0.14M (1) | 0.30M (2) | |
| Repair, second skeptic | 0 | 0 | |
| Gather | 0.49M | 0.53M | |
| Merged-diff review | 0.41M | 0.47M | |
| Gate | 0.12M | 0.13M | |
| Cold read | 0.15M | 0.16M | |
| Commit | 0.14M | 0.14M | |
| **Total** | **5.03M** | **5.43M** | |

- **Against the record** (`CLIMB-BATCH-12.md:62`): about 5.8M, from 5.3M if no fix is contested to 6.7M with two judges and a repair. It gave a total, not roles. With the two rulings that happened, at batch 11's 0.14M each, it predicts about 5.6M; the run wrote 0.15M (3%) less, and 0.37M (6%) less than the central figure.
- **Against batch 11:** +0.40M (+8%) for five rungs where batch 11 had four. Per rung, worker and skeptic together fell from 0.90M to 0.74M. The two judges cost 0.16M more than batch 11's one. The fixed roles (gather, review, gate, cold read, commit) rose 0.11M, to 1.42M.
- **First calls** 719K (13.2%), 8 of 17 cold, against batch 11's 620K (12.3%), 8 of 14.
- **Refusal cycles** two rungs, both a judge alone: W 170K, C 125K, 295K (5.4%), against 138K (2.7%) in batch 11 and 20% to 28% in batches 8 to 10.
- **The skill's load**, by the same attribution as batch 11's review (the writes of the message that took in each `Skill` call or read of a part): about 0.63M over 17 agents, 16K to 59K each (`tmp/rev12/skillload.py`; it counts other results that shared those messages).
- **Sites per million tokens:** 54 net for 5.43M, against batch 11's 46 for 5.03M. As batch 11's review said, this measures what the record gave the batch, not the practice.

Per agent, in order of start:

| Agent | Writes | First call | Turns | Minutes | UTC |
|---|---|---|---|---|---|
| Rung S | 437K | 61K | 170 | 48.3 | 10:04-10:52 |
| Rung W | 467K | 22K | 196 | 77.9 | 10:04-11:22 |
| Rung G | 339K | 24K | 146 | 47.7 | 10:52-11:40 |
| Rung C | 331K | 22K | 148 | 49.3 | 11:22-12:11 |
| Rung R | 479K | 23K | 168 | 60.2 | 11:40-12:40 |
| Skeptic S | 343K | 67K | 119 | 18.9 | 12:11-12:30 |
| Skeptic W | 322K | 28K | 99 | 25.9 | 12:30-12:56 |
| Skeptic G | 345K | 31K | 112 | 24.8 | 12:40-13:05 |
| Skeptic C | 331K | 26K | 133 | 33.7 | 12:56-13:30 |
| Skeptic R | 324K | 28K | 98 | 19.3 | 13:05-13:24 |
| Judge W | 170K | 55K | 43 | 4.7 | 13:24-13:29 |
| Judge C | 125K | 19K | 39 | 4.6 | 13:30-13:34 |
| Gather | 527K | 76K | 222 | 31.6 | 13:35-14:06 |
| Gate | 125K | 55K | 47 | 28.7 | 14:06-14:35 |
| Review | 470K | 74K | 153 | 20.7 | 14:06-14:27 |
| Cold read | 155K | 47K | 43 | 8.0 | 14:27-14:35 |
| Commit | 140K | 62K | 46 | 5.5 | 14:35-14:40 |

The rungs ran in 48 to 78 minutes against the manifest's 85 to 110. With two slots the workers came first, so each skeptic waited: S's 79 minutes after its worker ended, W's 68, G's 60, C's 45, R's 25. The critical path was the five workers, then the five skeptics, then the tail.

### 3. Builds, suites and stages

- **The tool's build figures still mislead.** `batch-measures.py` printed "rung:W 5+0, rung:C 0+1; gather 0+1, skeptic:C 0+1". It still misses every build written inside `nohup bash -c '...'` (batch 11's finding 7, measure 6, not built; PLAN, "Work that can start now"). Builds that ran, by my reading of the commands, each on a new code state: rung W 6 (its first edit, two probe builds that logged what the checks would refuse, a debug build, the reworked code, the final code); rung C 1; rung R 1 (a scratch tree merging W's branch, below); skeptics W and C 1 each, for their defect fixes; the gather 2 (the merged tree, and a scratch tree with W's allowance switched off, for gather.1); the gate 1. Thirteen in all; S and G built none of their own.
- **`run_bg` was refused nowhere.** The briefs' literal `nohup` form, the owed script edit, held: no permission refusal in 17 transcripts (`tmp/rev12/errs.py`). One `sleep 60` of the gather's was blocked by Claude Code's sleep rule, seconds.
- **Suites.** Each worker ran the suite its edit reaches, once per code state: W `ant testSystem` twice, once on a probe build that logged refusals instead of raising them (a measurement, `REPORT.md` section 13) and once on the final code (535 tests); S, G and R `ant testSystem` (527, 529, 534); C `ant testQuick` (compiler 1,084). The two skeptics whose fixes changed code ran theirs once after the fix: W `ant testSystem` (540, 2 min 29 s), C `ant testQuick` (compiler 1,086). The other three skeptics changed tests or prose and rightly ran none.
- **Stages.** S, G, C and R ran the count and the distance once each on their final code; R also ran the count twice on intermediate code (91 errors, then an `Invalid overloading` at `TrivialOpenRange`) while it found the meets the checker asks for. W ran both, and both came out unchanged, because `STAGE_BLIND` (`climb-batch-workflow.js:732-733`) names `interpreter/evaluator/` and `interpreter/glue/` but not `interpreter/env/`, where W edited `CUWrapper` and `ComponentWrapper`. The record's sentence "the stages do not read walk" (`CLIMB-BATCH-12.md:185`) and the rule disagree; W followed the rule, about 20 minutes of one core. Whether `interpreter/env/` can move the stages is not settled by reading: `compiler/environments/TopLevelEnvBenchmark.java` imports two of its classes.
- **Beyond the briefs.** R built a scratch tree with W's branch merged and ran its own and W's tests there (`rung-range-kinds/REPORT.md` section 7, decision 12), and ran a ladder subset of five files that compile against the compiler's library, which no library rung can move. W ran the 62 demos, old against new. Each is reported; none cost a rerun.

### 4. The tail: gather, review, gate, cold read, commit

- **The gather** (0.53M, 32 min) applied C, S, G, R, W. The literal rule, the lowest edited line in a shared file, gives S first; the gather put C first so that C's 41 lines in `changes.tex` would not move S's landed Appendix I entry, and said why (`climb-batch-12/RECORD.md`, "The order"). No conflict. It numbered rows 660 to 670, closed 15 rows, ran the closing tests on a merged tree (`OK (40 tests)`, `OK (12 tests)`), folded seven entries into the skill's part (C's record gave none), and routed 19 items. It found two things no rung could: on the merged code walk's narrower-body allowance is needed by `Pairs`, not by `NewlineReduction` (gather.1), and W and G meet at load (gather.3). It could not close row 642, set row 653's reproducer, or write 12 notes (gather.2).
- **The merged-diff review** (0.47M, 21 min) found no blocking code, read every skeptic's fix in its maker's transcript, fixed five FACTS lines, the handover, W's decision 6 and one sentence of the part (`5ac066690`), and added review-routed.1 and .2 and review.1.
- **The gate** ran once, green: `testFast` 1,858 (compiler 1,078 to 1,086), `testSystem` 554 (526 and the 28 new files), `testSpecData` 130, 42 of 42 `atomic` runs, the ladder and the 18 microGPT components unmoved. Its `# machine` lines still record the shell's `FORTRESS_THREADS=1` (batch 11's finding 8).
- **The cold read** (0.16M, 8 min) raised 21 flags on the part's new entries, fixed 14 (`3711db681`) and returned five to the coordinator (Part 3, Part 4).
- **The commit** (0.14M, 6 min) ran the microGPT walk check, both `ALL PASS` (56 s, 48 s), rebuilt the PDF, wrote FACTS' figures, pushed to the three branches, removed the five worktrees, and listed six FACTS sentences the new figures made false (Part 4).

## Part 1. Conformance

### Method

As in `reviews/batch-11-review.md`: for each rung, `git show --stat` first; then its `REPORT.md` and `SKEPTIC.md`, and W's and C's `JUDGE.md`; then the record's section for it (`coordinator/CLIMB-BATCH-12.md` sections 2 and 3, with `climb-batch-12-review.md`); then the gather's `RECORD.md` and the journal's results. Three standards, kept apart: the specification, the team's built intent, and the decisions on record (POSITIONS, PLAN). For the library rungs, the library rule as the curator reads it: a gap the library's own text shows, written in the shape of the one it has, its precedent line cited, and each extension shown to him to judge (`process-engineering/library-extension-rule-archaeology.md` §5 points 2 to 4, §7). The skeptics' and the review's findings are cited, not repeated.

### The verdicts

- **Rung C, the checker's expected type and a crash: in the spirit, made so by its skeptic's fix.** Q48(a) built as answered; the worker's change had turned a refusal of the base into a crash, which the skeptic repaired.
- **Rung S, the library's slips and items 42 and 44: in the spirit.** Each site in the library's own spelling with its precedent; the answers built; one team declaration removed and listed.
- **Rung G, the reductions typed at the element type: in the spirit.** Types at the api's own spelling; three team test lines and one team demo line respelled, each keeping its value.
- **Rung R, the ranges: in the spirit.** Q50 and Q49's default built; 16 new api declarations with their precedents, listed but not put to the curator.
- **Rung W, walk's load checks: in the spirit, with two readings that depart from the chapter's letter**, each taken to keep the library loading and each put to the curator (Q1, Q2); its skeptic's contested fix rightly upheld.

### Rung C, `054c4bcfd`

**What landed.** The compiled checker gives a repeated operator its expected type (`impls/Operators.scala:379-393`, the loose juxtaposition's form); a `label` body and each exit's `with` value take the label's expected type (`impls/Misc.scala:707-710`, `:733-739`); a dotted method's written static arguments are put into each other's bounds before the check (`STypesUtil.scala:771-800`). The inference chapter's two lists and Appendix I's entry amended. The skeptic's `b73143297`: `AtomicChecker` overrides `checkExpr(e, expected)`, so a `spawn` in an exit's value is refused again.

**Standard 1.** `label.tex:66-70`, `chained-multifix.tex:42-48`, `inference.tex:143-151`; `spawn.tex:28-31` for the skeptic's fix.

**Standard 2.** Rung E's loose juxtaposition for the operator; the team's `StaticTypeReplacer` use in `TypeWellFormedChecker.scala:157-162` for row 651; the team's `AtomicChecker`, which extends itself through every nested check (`Misc.scala:974-979`), for the fix.

**Standard 3.**
- Q48(a) yes, both the body and the exits' values (POSITIONS, "A `label` body takes the expected type of the whole `label`."): built. Q48(b) left as `XXXInferContextDrops`: held.
- The record review's change 2, Appendix I's sentence on row 644 amended whatever Q48's answer: done.
- The worker's "no point reached" (`REPORT.md` section 11) was wrong: its exit change turned the base's refusal of `spawn` inside `atomic` into the crash "Not in the trait table: CompilerBuiltin.Thread". The skeptic caught it, test first, and the judge upheld the fix (Part 2).
- Row 642 is fixed in the tree and open in the ledger, `CONTESTED`, its reproducer renamed (gather.2).

**Verdict: in the spirit, made so by its skeptic's fix.**

### Rung S, `74b28e9d4`

**What landed.** `__DefaultVector`, `__DefaultMatrix` and `TransposedMatrix` take `T extends Number`; `__immutableFactory1` declares `ImmutableArray1` in the component and the api; `__ImmutableSubArray1` loses `put`; `mul`'s parallel pairs become `do … also do … end`; `TransposedMatrix`'s three methods call `Matrix`'s operators; `SUFFIX_SUM` loops over `seq((0 # (|x| - 1)).reverse)`; `String`'s `left` and `right` answer `Just[\Char\]`; `QQ`'s `ceiling` and `truncate` throw `DivisionByZero` at the infinities and 0/0, with `numbers.tex`'s sentence revised and a new Appendix I entry.

**Standard 1.** `also.tex` for `mul`; `opr-overview.tex:165` for the exception; `numbers.tex:471-478` revised in the S1 form, the Working Draft's sentence quoted.

**Standard 2.** Every site names its precedent line (`REPORT.md`, provenance): `Vector`'s and `Matrix`'s own bound, `__builtinFactory1`, `PrimImmutableArray`, `QuickSort.fss:40-44`, `List.fss:258-263`, the library's bare `throw NegativeLength`. The library rule's point 2 holds: no operation added, each body written as its sibling writes it.

**Standard 3.**
- Items 42 and 44 as answered (POSITIONS, the two entries of 2026-10-09): built, the pins changed with their before and after.
- "The storing objects take `Number`, not a ring bound" (POSITIONS, "The integration review's checks"): held. No array fork touched; `__immutableFactory1`'s own site stays, listed.
- A team declaration removed, `put` (`FortressLibrary.fss:2381` at the base): listed as a point; nothing calls it, and walk stops on a call either way.
- `TransposedMatrix`'s methods kept as methods, the override question put to him (S.worker.1).

**Verdict: in the spirit.**

### Rung G, `aadd02f23`

**What landed.** `AssociativeReduction[\R\]` lifts to `Maybe[\R\]`; `simpleJoin(a: R, b: R): R`; every `lift(r: R)`; `Just[\R\]` in the lifted bodies; `MinReduction`'s and `MaxReduction`'s `simpleJoin` at `T`, as the api declares. Row 473's open half follows: `BIG MINMAX` unwritten answers `(0, 3)`, and its test is promoted.

**Standard 1.** `if.tex:49-52` (a generator binding needs a `Condition`); the reductions chapter describes no lifting.

**Standard 2.** The api's own `lift(r:R)` (`.fsi:1869`, `:1908`) and `simpleJoin(a:T, b:T): T` (`:1979`, `:1987`), and `Set`'s `Intersection` (`Set.fss:134-136`). It extends nothing; it types what the library has at the types its api writes. The library rule holds.

**Standard 3.**
- Probe P2's outcome (i), the three completing edits the record named: built, all 13 sites.
- Team test lines: `HeapTest.fss:80`, `RangePrototype.fss:213` and `:336-337` (Jan-Willem Maessen's, as the skeptic corrected the attribution), named in the record, each keeping its value.
- **A team demo line the record did not name**: `ProjectFortress/demos/HeapShakedown.fss:99`, respelled like its test twin so that the demo stops where it stopped on the base (decision 6, citing batch 6's rung O). Reversible, listed as a point, and the demo's value kept; but his word on the demos is "Let's not touch them" (POSITIONS, the team demos entry), and batch 7's like case got a PLAN line (`PLAN.md:390`). This one has none (Part 4).

**Verdict: in the spirit.**

### Rung R, `abe8b0342`

**What landed.** `narrowToRange(other: Range[\I\])` abstract in the generic traits, its bodies at the `ZZ32` kinds of rank 1 to 3; `checkSelection` at `ZZ32` with `checkSelection2D` and `checkSelection3D`, comparing corner by corner with `PCMP`; a meet `narrowToRange(other: OpenRange[...])` at each of nine kinds and three open ranges, and two at `TrivialOpenRange`; the open range's five methods `fail`; `PrefixSet`'s `0 # |s|`; `ImmutableArray1`'s `r'.left.get`.

**Standard 1.** The specification has no range of rank 2 and no method of the open range (`ranges.tex`, "Ranges"); `PCMP` follows "compared as if they were sets of integers" read per axis.

**Standard 2.** Rung L's move of `CMP` to the kinds; `combine2D`/`combine3D` for the rank-suffixed helpers (walk refuses three overloads of one name, row 416); the range types' declarations on the meet (FACTS); the team's `fail` in `FullRange.narrowToRange` (`:3944`, 2012).

**Standard 3.**
- Q50 (a) as answered; Q49 at its default (a), his word pending: built, item 49 given a sentence saying so.
- Values walk prints that change, each listed: Q50's four raises, the five stops, `(:):s` and `(:)#n` now stopping, and, found by the skeptic, the arrays' range subscripts and subarrays of rank 2 and 3 with a corner outside on one axis, which now raise where they were cut or read past the bounds (`ArrayRangeCornerBounds.fss`).
- **New api declarations**: `checkSelection2D` and `3D`, `checkSelection` narrowed, twelve meets and `TrivialOpenRange`'s two (`RangeInternals.fsi:42-46` and twelve more lines; `FortressLibrary.fsi:2212-2213`): 16 new, beyond the moved bodies. Each has its precedent named, so the library rule's point 2 holds. Point 4, "He does, one extension at a time, shown its precedent line", is not met: the point sits in the gather's `RECORD.md` and in no PLAN entry (Part 4).
- Row 664 opened: the site row 608's error hid.

**Verdict: in the spirit.**

### Rung W, `fdd377ead`

**What landed.** Walk refuses at load an object or object expression without static parameters that leaves an inherited abstract method without a body (row 649; the team's own `checkForDef` message), an `override` that overrides nothing (row 653's walk half), and a generic trait, object or object expression that breaks the Meet Rule for Functional Methods, checked through a symbolic stand-in (row 647). It binds the object expressions' constructors before the top-level variables, of every component before any, by the skeptic's `c17cff594` (row 648).

**Standard 1.** `traits.tex:571`, `:594-595`; `overloading.tex:471`; `object.tex:31`; and for the skeptic's fix `evaluation/intro.tex:19-24` and `components/initialization.tex:22-30`, which the judge cites.

**Standard 2.** The team's `checkForDef` and its refusal; batch 10's `FunctionalMethodMeets`; the driver's one loop per stage of loading (`Driver.java:224-249`).

**Standard 3.**
- The record asked that "every inherited abstract method has a body in the object or in a trait it extends, else a refusal at load". Built literally, it refused the one library at load, so every program (`REPORT.md` section 4). The worker counted a body at narrower parameter types as defining the method (decision 2), gated the residue (row 666) and asked Q1. It left generic objects unchecked (decision 3, row 665) because their check refuses `IntMap`'s and `Random`'s objects. Both are readings below the chapter's letter. Both are consequential by POSITIONS, "Which decisions taken inside the work reach Pavol, and how." (they choose among ways the record does not settle, and touch the specification and an implementation), and both took that entry's second way: landed reversible, each with a row, listed for him.
- "Overrides" read with equal types included, as both paths and row 614's decision 3 read it, against the chapter's "strict subtype" (decision 4, Q2).
- **Five demos now refused at load**: `BirdCount1z` and `BirdCount2a`, which ran and exited 0, `GenomeUtil1z` and `GenomeUtil2a`, which failed before too ("Missing value: run"), and `npbft`, which failed later before. Each leaves an inherited abstract method without a body, a static error by the chapter. No demo was edited, as his word asks; but two that ran now do not. Row 670 records them; no PLAN line does (Part 4).
- The team's `XXXUnimplementedMethod.fss` keeps its verdict, now refused at load; the revival's `XXXComprisesLibraryTraitUnlistedExtender.fss` was respelled so that it still measures row 22 (decision 7, listed).
- No library, checker, harness or specification edit.

**Verdict: in the spirit.**

### The global questions

- **What "go" promised, against what landed** (`CLIMB-BATCH-12.md` sections 1, 3 and 5, "The ledger"):
  - W: rows 647, 648, 649 closed, row 653's walk half fixed: held. Six new rows (665 to 670) the record did not foresee.
  - C: rows 644 and 651 closed; row 642 fixed under Q48(a): held in the tree, open in the ledger (gather.2).
  - R: rows 654 to 658 and 608 closed: held. Row 664 new.
  - G: row 628 closed with its 13 sites, and row 473 with it: held.
  - S: rows 606 and 635 closed, the 28 array sites gone: held.
  - The distance near 152: 153, the one being row 664. The count 1: held.
  - No team test line beyond the record's three, and no model line, changed: one team demo line did (G).
- **Built twice.** No. Each library rung kept to its sections; the review re-read the five branches and found no declaration two rungs changed. R's scratch merge with W was a check, not a build on W.
- **The library's way.** Yes, in S, G and R, each with its precedent lines; R's new api declarations and S's removed `put` are the two places the rule's "he judges" applies, and neither reached him as an item.
- **What they do together.** W and G at load: a program's own reduction at `Any` without static parameters is now refused at load (gather.3). W's check and R's abstract `narrowToRange`: every non-generic range object gets a body from its kind (the review, R's scratch merge). R and S: R's hunks move S's `String` lines. C and S: `changes.tex`, which the gather ordered. W and G and the allowance: G's typing removed the library's need for it, leaving `Pairs` (gather.1).

### Findings

Ranked by what they cost or risk next. Each gives its home.

1. **The demos refused at load and six new rows have no PLAN line** (Part 4): the two `BirdCount` demos stopped running, his demos entry says to leave them and make them run later, and nothing tells him. Home: R10's line (`PLAN.md:290`) and the gather's step that writes a PLAN line per row, unbuilt for the third batch running.
2. **Clause (c) of the contested rule bought two rulings that changed nothing**, 0.30M (Part 2). Home: POSITIONS, "The judge's rulings.", the curator's word, with W.judge.1 and batch 11's entry beside it.
3. **R's 16 new api declarations, S's removed team declaration and G's demo line reached him only as points** (Part 4). Home: one entry under "Climb batch 12, listed for his review", default as landed.
4. **Three entries of the batch-12 list say "No default on record"** under a preamble that says "the default is what landed" (Part 4): W's Q1, C's `try`/`atomic`, row 661. Home: the coordinator's landing; Q1 bears on rows 666, 668, 669 and `Pairs` and may belong under "Pavol's answers".
5. **One sentence of the part is false and five cold-read items have no home** (Part 3). Home: the skill writer, with review.1.
6. **The ledger tool's missing routes recur** (gather.2: row 642's close and note, row 653's reproducer, 12 notes). Home: `ledger.py`, batch 11's measure 7.
7. **`batch-measures.py` misses `nohup` builds; the gate's `# machine` line records `FORTRESS_THREADS=1`** (sections 3 and 4). Home: batch 11's measures 6 and finding 8, both unbuilt.
8. **`STAGE_BLIND` leaves out `interpreter/env/`** (section 3). Low cost, about 20 minutes of a core; home: the script's list, after a reading of what names those classes.

## Part 2. Did the redesigned practice hold

### The skeptics' 15 fixes

Each read from the journal's `fixes`, the skeptic's `SKEPTIC.md` and, for test first, the times in its transcript. As in batch 11's review: a correction's added test or assertion is seen failing on the base's code through the old code tool and passing on the head; a defect fix's test is red on the worker's head before the edit; an `XXX` test is an expected failure on base and head and red once with the defect removed.

| # | Fix | Kind | Sound, inside the rung | Test first |
|---|---|---|---|---|
| C1 | `eb02ed48c`, the repeated operator's test asserts the outer application's instance | correction | yes, `inference.tex:149-151`; the worker's test asserted the inner application's throw | red on the base 13:12:39, green on the head 13:12:50 |
| C2 | `eb02ed48c`, row 660 and `XXXInferTightJuxtContext` | correction | yes | expected failure on base and head; red with the defect masked 13:13:06 |
| C3 | `eb02ed48c`, "join" to "union" in `REPORT.md` | correction | yes | text |
| C4 | `eb02ed48c`, a note on row 470 | correction | yes | no test |
| C5 | `b73143297`, `spawn` refused at an exit's value | defect, contested | yes, upheld | red on the head 13:12:50; edit 13:13:18; build 13:13:20; green 13:15:53; `testQuick` after |
| S1 | `8a23293b3`, the rounding pin's citation into an assertion's message | correction | yes | red on the base, green on the head |
| S2 | `b5868fe34`, the new entry's Effect leaves float rounding to row 330 | correction | yes, POSITIONS:63 | text |
| G1 | `17e5c14d9`, the team lines' authors; `NotationGenericBigSum` stops on the base too | correction | yes, `SKILL.md`'s authorship rule | measured on both codes |
| G2 | `dca01ad7e`, `OpenTupleDispatchWalk.fss` and row 663 | correction | yes, a third-home test of today's value | run on the base and the head |
| R1 | `1a3fa193f`, `ArrayRangeCornerBounds.fss` | correction | yes, POSITIONS:51 | red on the base 13:18:09, green on the head 13:18:39 |
| R2 | `dc880ca13`, citations, the tests' count, the arrays' raises in the records | correction | yes | no test |
| W1 | `ffd2792be`, report and record from the journal | correction | yes | no test |
| W2 | `a5f72a93a`, the singleton field's test and three `XXX` tests | correction | yes | singleton red on the base 12:45:28, green on the head 12:45:55; the three `XXX` expected on both, red with the defect removed 12:46:27 |
| W3 | `c17cff594`, every component's object expressions bound before any variable | defect, contested | yes, upheld | red on the head 12:47:07; edit 12:47:45; build 12:47:53; green 12:48:48; `testSystem` 12:50 |
| W4 | `a9b7323ef`, provenance lines | correction | yes | no test |

Every fix is sound and inside its rung, and every added test was written test first. Each skeptic also wrote its worker's `REPORT.md` and `record.md` from the journal: the harness refused all five workers' writes, as in batch 11, and the script's step for it held.

The skeptics found two defects of the change (C5, W3) against batch 11's three, and 13 corrections against 16. C5 is the batch's one regression: a refusal of the base turned into a crash by the worker's own edit.

### The two contested fixes, and the judge's ruling on rung W

- **Both were contested by clause (c) alone**, "it touches a path the section does not give the rung" (`climb-batch-workflow.js:923`): W's `Driver.java`, outside the section's file list, and C's `AtomicChecker`, outside the lines the section named in `Misc.scala`. Each skeptic gave that as its only reason (`why: beyond-the-rung` in the journal), and neither fix changed what the worker argued for: W's worker had left the cross-component case "not measured" (decision 6), C's had not considered `spawn`.
- **The judge's ruling on W is sound.** It rests on the text (`intro.tex:19-24`: all top-level variables of the program are initialised before any reference to them; `initialization.tex:22-30`), on the row's own claim still holding on the worker's head, on the driver's own shape (one loop per stage of loading), and on the section's file list, whose exclusions are the library, the checker and the harness, not `Driver.java`. It ran nothing, as its brief asks, and corrected one citation of the skeptic's. 170K, 4.7 minutes. It put the scope reading to the curator as W.judge.1, ways (a) as ruled and (b) the list exhaustive, default (a).
- **C's judge reached the same reading on its own** (`JUDGE.md` section 3, point 4: the section "forbids only the library, walk, the overloading checker and the disambiguator"), and added the stronger reason: a regression the rung's own edit makes is the rung's to repair. 125K, 4.6 minutes.
- **So clause (c) cost 0.30M here, and 0.14M in batch 11, for three rulings and no revert.** Both batches show the same gap: a fix settled by a cited sentence (`spawn.tex:28-31`; `object.tex:31` with row 648's claim) is contested by a clause, and the rule does not say which wins. The skeptics let the clause win every time.
- No uncontested fix should have been contested. The nearest is R1: it pins a value change (the arrays now raise) the worker had not listed, which is a point to report; the skeptic settled it by POSITIONS:51, rightly, since the curator's answer to Q50 covers corners on every axis.

### Workers, test first

Each worker's tests failed through the harness on the base's code before its first source edit: W 10:14:31 (8 of 9 red), first edit 10:17:50; S 10:16:05 (3 of 3), 10:16:54; G 10:56:46 (3 of 3), 10:58:42; C 11:26:45 (10 of 10), 11:28:33; R 11:53:16 (8 of 9), 11:54:58. No test-first miss, as in batch 11.

### The practice's measures, against batches 8 to 11

| Measure | B8 | B9 | B10 | B11 | B12 |
|---|---|---|---|---|---|
| Written | 7.72M | 6.88M | 6.26M | 5.03M | 5.43M |
| Rungs, agents | 4, 21 | 4, 22 | 4, 21 | 4, 14 | 5, 17 |
| Per rung, all roles | 1.93M | 1.72M | 1.57M | 1.26M | 1.09M |
| First calls | 1.44M | 1.40M | 1.47M | 0.62M | 0.72M |
| Refusal cycles | 25% | 20% | 28% | 2.7% | 5.4% |
| Skeptic fixes (defects) | | | | 19 (3) | 15 (2) |
| Rulings, repairs | | | | 1, 0 | 2, 0 |

### Batch 11's measures, a batch later

- Built and held: the briefs' `nohup` form (no refusal); the unfolded-entry filter (C's "none" stayed out of the curator's list); the skill's six sentences (`7b3226bb2`).
- Not built, and met again: measure 1, the contested rule (two rulings); measure 3, a PLAN line per row (six rows without); measure 6, the build count; measure 7, `ledger.py`'s routes (gather.2); finding 8, the `# machine` line.
- Measure 5, the `XXX` wording of the skeptic's test-first sentence: not built, but both skeptics who added `XXX` tests (W, C) showed them red with the defect removed.

### Misses, by kind

Numbered on from `batch-11-review.md`'s 362. "Found by" names the first to catch it.

Found inside the batch:
- **The change wrong.** 363, C's exit value escaping `AtomicChecker`, a crash where the base refused (skeptic C); 364, W's row 648 repair stopping at the component boundary (skeptic W).
- **A new rule's effect elsewhere.** 365, W's literal check refusing the one library at load (worker W); 366, W's check refusing five demos and a team test (worker W); 367, R's Q50 change reaching the arrays' subscripts and subarrays (skeptic R); 368, `(:):s` and `(:)#n` reaching the five stops (worker R); 369, W and G meeting at load (the gather); 370, the allowance needed by `Pairs`, not `NewlineReduction`, on the merged code (the gather).
- **The team's own code, found by the rungs' probes.** 371 to 381, rows 660 to 670: 660 (skeptic C), 661 (worker S), 662 (worker G), 663 (skeptic G), 664 (worker R), 665 to 670 (worker W).
- **A premise of the record that does not hold.** 382, the distance near 152: row 608's error hid row 664's site (worker R); 383, "the stages do not read walk" against `STAGE_BLIND`'s paths (worker W).
- **Text or a record claiming more than the paths do.** 384, C's test asserting the inner application, its "join" (skeptic C); 385, G's authorship lines and its claim on `NotationGenericBigSum` (skeptic G); 386, R's citations, test count and missing array raises (skeptic R); 387, S's Effect on float rounding (skeptic S); 388, five FACTS lines, the handover, W's decision 6 (the review); 389, fourteen wordings of the part (the cold read); 390, six FACTS sentences the new figures made false (the commit).
- **Process.** 391, every worker's report write refused, five of five (the skeptics, by the script's step); 392, `ledger.py`'s refusals (the gather).

Found by this review:
- 393, six new rows and the five demos with no PLAN line (Part 4).
- 394, R's 16 new api declarations, S's removed `put` and G's demo line not put to him (Part 4).
- 395, clause (c) contesting two fixes no judge reverted (above).
- 396, a false sentence of the part; five cold-read items with no home (Part 3).
- 397, three "No default on record" entries in a list whose default is what landed (Part 4).
- 398, `STAGE_BLIND` narrower than walk (section 3).

**Against the earlier notes.** 30 found inside the batch (363 to 392), 6 a rung, against batch 11's 9.75. By whom: workers 14, skeptics 10, the gather 3, the review, the cold read and the commit one each. No test-first miss. Landed: no wrong value known; the known costs are rows, listed points and the two demos that no longer run.

### Measures the evidence supports, each with its cost

1. **Clause (c) narrowed**: a fix is contested under (c) only when it touches a path the section rules out or another rung of the batch edits; a fix that repairs a regression the rung's own edit made, and that a cited sentence settles, is settled. Evidence: three rulings over two batches, 0.44M, no revert; both judges of this batch read the list so. Saves about 0.15M a ruling. The curator's word (POSITIONS, "The judge's rulings."; W.judge.1 and batch 11's entry).
2. **The gather writes a PLAN line for every row it opens**, beside the items it routes. Evidence: six rows here, eight in batch 11, six in batch 10. One step of the gather; batch 10's finding 5 and batch 11's measure 3.
3. **The gather routes as items the points that a decision reserves for him**: a new api declaration or a removed team declaration (the library rule's point 4), a team demo touched or newly refused (his demos entry). Default as landed. One clause of the gather's brief.
4. **The cold read's `forCoordinator` items go to PLAN**, under the batch's list, as the gather's do. One step of the review or the script.
5. **`STAGE_BLIND` gains `interpreter/env/` and `interpreter/Driver.java`**, if a reading of their names outside walk (`compiler/environments/TopLevelEnvBenchmark.java`) shows the stages cannot reach them. About 20 machine minutes a walk rung.

## Part 3. Skill sentences the batch made false

The gather folded the rungs' entries into the part on the revival's changes and amended `interpreter.md`'s list of refusals and `library.md:25`; the review and the cold read corrected the rest of what they read. What is still false or missing on `main` at `caf060cdc`:

| File:line | The sentence | What is true now |
|---|---|---|
| `.claude/skills/fortress-repo/references/revival-changes.md:179` (G's Reason) | "The declarations at `Any` had kept walk's reductions running while walk gave `Bottom` to a type parameter that a call did not fix, which it no longer does." | Walk still gives `Bottom` in the four cases the same part lists at `:93-96` (rows 424, 591, 612, 587); G's own points show `BIG SQCAP`, `BIG SQCUP` and `List`'s `BIG CONCAT` stopping at `BOTTOM` (`rung-reduction-types/REPORT.md` section 9). True for F-bounded parameters only. The cold read flagged it and returned it; nothing routes it. |

Not false, but each leaves out what a later rung needs:
- `references/interpreter.md:45`, "So a library edit that adds an overload can stop every program at load." Since rung W, so can a library edit that leaves an inherited abstract method without a body at or below its parameter types, or adds an `override` that overrides nothing: built literally, W's check refused the whole library (`rung-walk-load-checks/REPORT.md` section 4). The next library rung meets exactly this.
- `revival-changes.md:66` (W's Resolution): it does not say that counting a narrower body departs from the traits chapter (row 666), or that a call outside the narrower types still stops with "has neither body nor def" (rows 668, 669). The cold read's first item.
- The cold read's other three items (`3711db681`'s result; G's Reason above is the fifth): the open range's Reason reads two ways; the self-bounded entry lacks the gotcha that `Set[\OPEN\]` admits no more than at `Bottom` (row 662); the stand-in sentence leaves out that `symbolicInstance` returns null for an `opr` parameter.
- `references/sources.md`'s line for W's entries names only `Pairs` (review.1).
- `references/interpreter.md:70`, the smoke test `explorations/claude_demo.fss`: no agent ran it on the final code (W ran it once, on a probe build). The microGPT walk check passed on the landed tree, so the library loads; the claim is unverified, not known false.

One writer task covers all of these; none blocks batch 13.

## Part 4. Routing

Checked against `main` at `caf060cdc`, whose PLAN and ledger are the landing's plus the boot note.

### The script's 19 items and the review's three

Each id against the PLAN entry the gather's `curatorItems` names, found and read:
- **"Pavol's answers"**, item 49 (`PLAN.md:271`): R.worker.1 and R.skeptic.1, a sentence on what R built at the default. There.
- **"Climb batch 9, listed for his review"**, D2's entry (`:570`): G.worker.1 and G.skeptic.1, row 662's sentence. There.
- **"Climb batch 12, listed for his review"** (`:646-663`): C.worker.1 and C.skeptic.2 (`:650`); C.skeptic.1 (`:651`); C.judge.1 (`:652`); S.worker.1 (`:653`); S.worker.2 (`:654`); G.worker.2 (`:655`); W.worker.1, W.skeptic.1 and gather.1 (`:656`, Q1); W.worker.2 and W.skeptic.2 (`:657`, Q2); W.judge.1 (`:658`); gather.2 (`:659`); gather.3 (`:660`); the review's review-routed.1 (`:661`), review-routed.2 (`:662`) and review.1 (`:663`). There.

All 22 landed where they name, none unrouted. Two of them sit badly:
- **W's Q1** (`:656`) says "No default on record; walk's allowance is what landed", under a preamble that says each entry's "default is what landed", where POSITIONS, "Which decisions taken inside the work reach Pavol, and how.", asks a landed decision to be listed "with the default that landed". It decides whether rows 666, 668 and 669 are defects of the library or of walk, and whether `Pairs` and the team's `FileConversion.fss` stay valid; review-routed.2 asks for a `Pairs` test before anyone tightens row 666. Either state the default that landed, walk's allowance, which admits any narrower body and so is wider than either of the entry's two ways, or move it under "Pavol's answers" with "needed before row 666 is tightened".
- **C's `try` and `atomic`** (`:650`) and **row 661** (`:654`) also say "no default on record". Row 661 bears on compiled loops over a strided range, `Library/Shuffle.fss:23` among them, after the switch-over.
- **W's Q2** (`:657`) has its default, (a), as landed. Right.

### What has no home

- **The demos now refused at load** (row 670): `BirdCount1z` and `BirdCount2a`, which ran and exited 0, and `GenomeUtil1z`, `GenomeUtil2a` and `npbft`. A point in the gather's `RECORD.md`, no PLAN line, no item. His demos entry (POSITIONS, "The team demos ...": "Let's not touch them and we'll make them run later") and PLAN's R10 line (`:290`) are where he would look. Proposed: a sentence on R10's line naming the five and row 670, and an entry under the batch-12 list: the demos are ill-formed by the chapter; respelling them touches a demo; default, left as they are.
- **Six new rows without a PLAN line**, with the line each needs:
  - 660, the checker gives no expected type to a tight juxtaposition of non-functions (`XXXInferTightJuxtContext`): the next checker rung, beside row 455's argument faces (Q48(b)).
  - 663, under walk a tuple is not below a tuple type over an open parameter (`CONTESTED`, `OpenTupleDispatchWalk`): batch 11's entry on the open type's dispatch.
  - 664, `ImmutableArray1`'s and `Array1`'s range subscripts pass `reflect`'s sizes, one site of the 153: the arrays' fork 3, a size known only at run time, which waits on his answer after item 15's (`CLIMB-BATCH-12.md`, section 4).
  - 665, walk checks no generic object for rows 649 and 653: the next walk rung, beside rows 611, 612 and 616.
  - 667, `IntMap`'s objects define no `genComb`: the next library rung's slips, beside 668 and 669 (Q1's entry).
  - 670, the demos: above.
- **R's new api declarations, S's removed `put`, G's demo line** (`RECORD.md`, "Points to report"): no entry. The library rule's point 4 makes the first his to judge, shown its precedent lines; his demos entry makes the third his; batch 7's demo respelling got a PLAN line (`:390`). Proposed: one entry, default as landed.
- **The cold read's five items** (`3711db681`'s `forCoordinator`): no entry, and the false sentence of Part 3 among them. Proposed: with review.1 at `:663`, for the skill writer.
- **The commit's six FACTS sentences**: the record's "After the landing" names the FACTS consolidation, so they have a home there, not in PLAN.

### Rows opened and closed

- **Opened, 660 to 670**, each by `ledger.py add` in apply order. With a PLAN line: 661 (`:654`), 662 (`:570`), 666, 668 and 669 (`:656`, `:662`, `:663`). Without: 660, 663, 664, 665, 667, 670 (above).
- **Closed, 15**: 647, 648, 649 (W); 644, 651 (C); 654 to 658, 608 (R); 628, 473 (G); 606, 635 (S). Each cites a landed commit and a test on `main`. Not closed: 642, fixed by `054c4bcfd` under Q48(a), `CONTESTED` and its reproducer renamed, so `ledger.py` refuses both the close and a note; `ledger.py check` shows it as one new template failure. Row 653 stays open by its claim, its walk reproducer unset (gather.2).
- **Notes not written**, 12 (gather.2): their texts are in `climb-batch-12/RECORD.md`, "Ledger notes not written". Their home is the coordinator's hand edit or the tool.

### Lines the batch made stale

All of these are the coordinator's landing, which the record's "After the landing" (`CLIMB-BATCH-12.md:511`) lists and the boot note (`caf060cdc`) shows as not yet done:
- PLAN phase 3, item 10 (`:118`), "Batch 12, its record not yet drafted": batch 12 has landed; its line, and batch 13's, are owed.
- PLAN item 9's lines for row 644 (`:115`), rows 647 to 649 (`:116`) and row 654 (`:117`): fixed by this batch, not marked.
- Items 42, 44, 48 and 50 (`:253`, `:259`, `:269`, `:273`) still read "No default on record"; he answered each on 2026-10-09 and this batch built them. Item 15 (`:194`), answered after the landing (`a24fbfe2b`, POSITIONS "Arithmetic in a size ... (item 15, 15a with (b))"), is not marked either.
- FACTS, as the commit listed: `:56` ("A run takes 786 to 1,252 s", where this gate took 1,293 s), `:57` (the class figures of 207), `:66` (207), `:78` and `:117` (batch 11's paths), `:146` (526, 1,078, 207). Batch 11's review found the same pattern: the commit stage rewrites two FACTS entries' figures, and the other entries that carry a gate's figures go stale every batch.
- Row 642's status and row 653's reproducer in the ledger (gather.2).

## What I did not do

- I built nothing, ran no Fortress program, suite or stage. I ran `batch-measures.py` and `spend.py`, which read transcripts only, and my own scripts under `tmp/rev12/`.
- The site-by-site count of section 1 maps lines through the batch's diff; a site whose line a hunk changed counts as gone unless the same file's new list has it at the new line, which I checked by message for the five that moved.
- The transcripts keep no reasoning (empty `thinking` blocks), so Part 2 reads what agents ran and when.
- The skill's load (0.63M) is an attribution and includes other results that shared those messages.
- I did not judge the new specification passages line by line beyond what the skeptics, the review and the cold read checked, and I did not re-measure the demos or `claude_demo.fss`.
- The INDEX line for this note is the coordinator's.

## For Pavol

- All five rungs follow your decisions and the specification. C needed its skeptic: its change had turned an error into a crash, and the skeptic fixed it.
- Cost: 5.43M written, 17 agents, 4 h 36 min (batch 11: 5.03M for four rungs; the record said about 5.8M):
  - workers 2.05M, skeptics 1.67M (per rung, both lower than batch 11);
  - two rulings 0.30M, no repair;
  - gather 0.53M, review 0.47M, gate, cold read and commit 0.42M.
- The practice held. Skeptics made 15 fixes, each sound, each test first. Nothing in code slipped to the review or the gate. Refusal cycles 5%.
- Both rulings upheld the skeptic and changed nothing. The rule that sent them to a judge is waiting for your word (batch 11's entry, and W's judge's question).
- Count stays 1. Distance 207 to 153: S 32, G 13, R 9, C 1, and one new site that R's fix uncovered (row 664).
- Things you should hear that are not in your list:
  - Two demos that ran, `BirdCount1z` and `BirdCount2a`, are now refused at load. They are ill-formed by the spec (a missing method body). Nothing was edited. Row 670.
  - Rung R added 16 small api declarations to the ranges (helpers and the meets the checker needs), each with its precedent. The library rule says you judge these.
  - Rung G edited one line of a team demo, `HeapShakedown.fss`, so it stops where it stopped before.
- Rung W's Q1 (does covering an abstract method through `comprises` define it?) has no default yet; it decides whether three library rows are library bugs.
- One skill sentence is false (on the reductions); six new rows need PLAN lines.
