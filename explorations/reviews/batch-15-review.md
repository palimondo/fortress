<!-- The combined post-batch review of climb batch 15 (run wf_34063069-0ff, base ee1aa1a95, 10:53 to 15:56 UTC on 2026-10-14, landed at c40489978: rungs C f237148ac, B 20474c144, L a0f839ad7, O 59b1d0a4d, the closes 32af87b18, the gather record e13da0396, the review's corrections 219d485eb), in the form of reviews/batch-14-review.md, on the curator's standing word ("One review after every batch"), by a review worker reading only, against main at a4d17e103 (PLAN.md and the ledger as at 219d485eb; nothing under .claude/ changed since the landing). The transcripts and the journal were read through bounded scripts; the measures are batch-measures.py's on batches 11 to 15 and skill-load.py's on 14 and 15; batch 14's 54 sites were mapped to the landed 49 through git diff -U0 7c2c7cd4b c40489978 -- Library/FortressLibrary.fss. Tokens are writes only (input plus cache creation, one count per message id). -->

# Climb batch 15: conformance, the practice, and routing

## What came up in this run

### 1. The distance 54 to 49 and the count 1 to 1, site by site

**The distance, 54 to 49 (−5).** Mapping batch 14's 54 sites (`compile-ladder/gate/distance-sites.tsv` at `7c2c7cd4b`) through the batch's diff: 5 gone, none come, 49 matched in kind and message (digits masked). The gate reads the same: `DISTANCE DOWN 54 -> 49`, wellformed 8 to 4, typecheck 41 to 40, V1 2 to 0, OT 15 to 12 (`climb-batch-15/gate/summary.txt:117-122`).
- **C, −1**: `squaredNorm(me)`, the base's `:2493`, `:2623` on main (row 686).
- **L, −4**: row 685's `Vector[\T,s0\]` at the base's `:2464` and `Matrix[\T,s0,s1\]` at `:2837`, each against `Number` and `MultiplicativeRing[\T\]`.
- **B and O, 0.** Each rung's own stage agreed: C 53, L 50, B 54 after a 56-line shift (`rung-walk-elements/REPORT.md:249`), O 54 (`rung-duplicates-coverage/REPORT.md:203`). Row 488's `:130` stayed.
- **The crash rows**: `body(i)`'s gone; `Array3`'s the same declaration 137 lines lower, `:3023-3136` (`summary.txt:123-125`), its line held.

**Against the record**, "about 49" (`CLIMB-BATCH-15.md:32`): met to the site, every per-rung figure held (`:27-31`).

**The 49, by what each waits on** (lines of the landed list, `compile-ladder/gate/distance-sites.tsv` at `c40489978`):
- **The arrays, 21:** 14 bodies typed by their parent trait (lines 23-36); 3 sizes tested in a branch (37, 38, 43); 2 export errors (2, 4); row 678's `Col` and `Row` (9, 11).
- **His other items, 12:** the integer power 6 (15, 16, 20-22, 44); item 38's `String` pairs 3 (3, 7, 8); row 634's list half 1 (19); item 46's fused arm 1 (42); row 631's `embiggen` 1 (10).
- **The `where` clauses, 12:** row 433, 6 (5, 6, 47-50); row 636, 4 (12-14, 46); row 436, 2 (39, 40).
- **Row 425, 3** (17, 18, 41); **row 488, 1** (45). The record's split, 21, 12, 12, 3, 1 (`CLIMB-BATCH-15.md:37`).
- **Behind row 680's crash: none** (C's whole-component run, none of its 43 in `Array3`, `rung-checker-bounds/REPORT.md:83-84`).

**The count, 1 to 1.** One row of the table moved, `#locations 1` to `0` (`summary.txt:112-116`). It is rung B's: with `body(i: I)` typed (`Library/FortressLibrary.fss:1314`) the stage passes `:1314` and stops at row 680's crash at `:3059`, 'TryChecker returned an untyped expr' (gate transcript `afea4e90`, call 42), a message with no `file:line`. `#crash` stays `none`, as the record said (`:379`); B and C declared 1, the gate reads `COUNT SAME` (`summary.txt:112`). Against "about 39, or 1" (`:33-36`): 1, since C held row 680's line.

**Row 680's repair, held on the 690 s rule, and what that leaves.**
- **The hold.** C's run 2, `body(i)` typed for that run and row 680's line in: 43 errors in 809 s, at load 3.13 rising to 9.69 beside three rungs, about 263 s for the apis and 546 s for the component (`REPORT.md:79-85`); held by the section's rule (`CLIMB-BATCH-15.md:154`; `e75bb538b`). One measure: C declined a second, the record having made run 2 "the batch's one measure" (`REPORT.md:149-152`).
- **What it leaves:**
  - The count reads one crash; F-53's rise, about 39 (C's 43 less L's 4), waits on item 54.
  - In the gate the stage took about 569 s to reach that crash (launched 15:40:41, its log last written 15:50:10, `real 9m28.730s`; `afea4e90`, calls 39-42), at load 2.0 to 3.3: 331 s left of 900. Batch 14's ran under 5 minutes, to `:1311`; B's, 493 s at heavier load before its skeptic's 65 lines (`rung-walk-elements/REPORT.md:221`).
  - **The checker got slower over the component:** the gate's distance stage spent 1,168 s in `FortressLibrary` at load 1.70, against batch 14's 954 s at 1.85 (`gate/distance.txt:26`; `climb-batch-14/gate/distance.txt`), +22 % with five fewer sites. No rung's run separates the cause (B 998 s at load 7.55, L 1,016 s at 2.30, O 1,191 s at 8.35, C 1,436 s beside `testQuick`). So item 54's way (a), one idle measure, could still read past 690 s.
  - Row 680 stays open with a claim and a note C measured false, which `ledger.py` cannot correct on an open row (`climb-batch-15/RECORD.md:155`, gather.1).
- C's runs 1 and 3 (379 s, 378 s, count 1) show no effect of the normal form on the api check (`REPORT.md:95`).

### 2. The cost, against the record and batches 11 to 14

`batch-measures.py` on the five runs. Batch 15's total is the coordinator's `spend.py` figure, 4.44M over 12 agents; the harness reports 4.66M by its own count.

| Role | B11 | B12 | B13 | B14 | B15 | B15 share |
|---|---|---|---|---|---|---|
| Rung workers | 1.99M (4) | 2.05M (5) | 2.64M (5) | 1.99M (5) | 1.81M (4) | 40.7% |
| Skeptics | 1.60M (4) | 1.67M (5) | 2.59M (7 runs) | 1.71M (5) | 1.49M (4) | 33.6% |
| Judges | 0.14M | 0.30M | 0.455M | 0 | 0 | |
| Gather | 486K | 527K | 592K | 460K | 469K | 10.6% |
| Merged-diff review | 412K | 470K | 482K | 399K | 408K | 9.2% |
| Gate | 116K | 125K | 142K | 131K | 130K | 2.9% |
| Cold read | 154K | 155K | 168K | gone | gone | |
| Commit | 135K | 140K | 149K | 128K | 133K | 3.0% |
| **Total** | **5.03M** | **5.43M** | **7.22M** | **4.82M** | **4.44M** | |
| Agents, rungs | 14, 4 | 17, 5 | 20, 5 | 14, 5 | 12, 4 | |
| Span | 4 h 25 | 4 h 37 | 6 h 24 | 4 h 43 | 5 h 03 | |
| Per rung, all roles | 1.26M | 1.09M | 1.44M | 0.96M | 1.11M | |

- **Against the record** (`CLIMB-BATCH-15.md:59-63`), about 4.3M (4.2M to 5.0M): 0.14M more (3 %), inside the range. Workers 1.81M against 1.8M (B 575K against 0.6M, L 473K against 0.3M, +58 %, O 420K against 0.45M, C 339K against 0.45M); skeptics 1.49M against 1.4M (mean 373K against 341K; B's 472K with the one defect fix); the fixed roles 1.14M against 1.1M. The time 5 h 03 against about 4 hours; against the manifest's minutes O 100 of 100, C 91 of 110, B 86 of 130, L 75 of 70.
- **Why L overran:** it measured three of its four ways (the probe's patch as written, a witness-binding helper in a shadow library, the result type's witness), ran its run-time-class programs and the `IntMap` shapes on both trees, and a ladder subset (`rung-library-factories/REPORT.md:88-109`, `:120-131`); 220 turns, the run's most.
- **Against batch 14** (4.82M, five rungs): −0.38M (workers −0.18M, skeptics −0.22M, the tail +0.02M). Per rung 1.11M against 0.96M: the fixed roles are 25.7 % of the run against 23.2 %.
- **First calls** 547K (12.3 %), 6 cold (worker B 65K, skeptic B 69K, the four tail agents 54K to 73K), against 604K (12.5 %), 6 cold. **Refusal cycles 0, cache refills 0**, as in batch 14.
- **The skill's load** (`skill-load.py`): 434K, 9.8 % (92K load text, 342K over 141 part reads), against 493K, 10.3 % over 154.
- **Sites per million tokens**: 1.1 (5 for 4.44M) against 6.4; the record gave the batch 5 sites and 13 rows with none.

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`):

| Agent | Id | Writes | First call | Turns | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung B | a8534428 | 575K | 65K | 193 | 86.5 | 10:53-12:19 |
| Rung C | ac79b427 | 339K | 24K | 153 | 90.8 | 10:53-12:23 |
| Rung O | aac6abd6 | 420K | 23K | 208 | 100.0 | 12:19-13:59 |
| Rung L | af8a9b40 | 473K | 22K | 220 | 74.9 | 12:23-13:38 |
| Skeptic B | a409b774 | 472K | 69K | 156 | 31.3 | 13:38-14:10 |
| Skeptic C | a88b74de | 378K | 28K | 142 | 26.2 | 13:59-14:25 |
| Skeptic L | a20e865a | 285K | 29K | 96 | 18.7 | 14:10-14:28 |
| Skeptic O | af4b9273 | 356K | 28K | 114 | 25.6 | 14:25-14:51 |
| Gather | a26a88b1 | 469K | 73K | 163 | 21.4 | 14:51-15:13 |
| Review | a0023f37 | 408K | 70K | 121 | 16.2 | 15:13-15:29 |
| Gate | afea4e90 | 130K | 54K | 47 | 38.1 | 15:13-15:51 |
| Commit | ad87c069 | 133K | 61K | 46 | 5.6 | 15:51-15:56 |

With two slots and the workers first, each skeptic waited after its worker: C's 96 minutes, B's 79, L's 32, O's 26; one slot idle 14:28 to 14:51 while the gather waited for skeptic O.

**Beside the run, what preparing it cost** (`spend.py`, the coordinator's figures):
- The walk probe (`perf-probes/walk-plain-bound/`): 1.13M.
- The checker probe (`perf-probes/checker-bound-defects/`): 0.88M.
- The planner's draft of the record: 0.47M.
- The Opus review in place: 0.47M.
- The Fable review in place: about 0.7M.
- Preparation together: about 3.65M, 82 % of the run; with the run, about 8.1M.
- The landing: the coordinator's to add.

### 3. The tail

- **The gather** (469K, 21 min) applied C, B, L, O and said why (`RECORD.md:19-27`), no conflict; the merged tree's tests 'OK (22 tests)' and 'OK (45 tests)' (`:40-47`); rows 711 to 728 opened, 15 closed (`:58-88`); 7 of 8 notes refused (gather.1, `:144-155`); F-227 to F-230 folded, seven FACTS set.
- **The merged-diff review** (408K, 16 min): no blocking code; row 729 and two re-anchorings (`219d485eb`).
- **The gate** (130K, 38 min), once, green: `testFast` 1,984 in 48 suites, the compiler track 1,173 to 1,212 (C 30, 13 of them its skeptic's; O 9); `testSystem` 604 to 621 (B 9, L 6, O 2) in 3 min 53 s against 4 min 6 s; `testSpecData` 130; 42 of 42 `atomic` runs; no ladder or microGPT phase moved. Its `# machine` line still reads `FORTRESS_THREADS=1` (`summary.txt:69`), batch 11's finding 8.
- **The commit** (133K, 6 min): microGPT's quick checks 7 of 7, 59 s and 49 s against 56 s and 47 s (`summary.txt:126-129`); the PDF, 677 pages; pushed. Its message says the stage now checks "the component FortressLibrary whole" (`c40489978`); it stops at row 680's crash, as F-53 says (`4dbf3ff4c`).

## Part 1. Conformance

### Method

As in `reviews/batch-14-review.md`: each rung's commit, `REPORT.md` and `SKEPTIC.md`; its section of the record, with `coordinator/climb-batch-15-review.md`, the two probes and the decisions it builds; the gather's `RECORD.md`, the journal and the code on main. Three standards, kept apart: the specification; the team's built intent and the library's own way; the decisions on record, with the coordinator's calls 1 to 9 (`CLIMB-BATCH-15.md:73-83`).

### The verdicts

- **Rung B, walk's big operator by its elements: in the spirit.** It builds P-48 for walk's unwritten clause forms by calls 1, 2, 5 and 6. Three of its choices have not reached him.
- **Rung C, the checker's normal form: in the spirit.** The probe's two patches landed byte for byte. Row 680 was held by the record's own rule.
- **Rung L, the factories and `UPLUS`: in the spirit.** It departs once from the section's letter, measured: the probe's patch was not applied as written.
- **Rung O, duplicates and coverage on both paths: in the spirit.** It builds P-147's compiled half and walk's agreement, within limits filed as rows 725 to 728.
- **No rulings.** No fix was contested, and no rung refused.

### Rung B, `20474c144`

**What landed.** D2's line gone; the hint an argument of the operator's own instantiation, `choosing` set only around `bestMatch` (`interpreter/evaluator/EvaluatorBase.java:161-256`); `evalAt` along a tail (`Evaluator.java:698-809`, `values/FunctionClosure.java:199-205`); `body(i: I): L` and the collector (`Library/FortressLibrary.fss:1314`, `:1318-1437`, the skeptic's spine loops among them); `IntMap`'s operator as `Map`'s (`Library/IntMap.fsi:13`, `:83`; `IntMap.fss:732`); boxes in `inference.tex` and `reductions.tex`, two Appendix I entries.

**Standard 1.** Normative text unchanged; way 6 + 7 stands in at run time for the desugaring by `N` (`defining-generators.tex:154-197`). The empty unwritten form departs: the bound, `List[\Any\]`, where `N` gives `List[\ZZ32\]` (row 716).

**Standard 2.** The collector follows `CovariantCollection`'s `APPCOV`, `AnySingleton` and `CVReduction` (`REPORT.md:188-198`); `IntMap`'s line `Map.fsi:104`. Not repaired: walk names `__elemsOf` and `__bigOperatorElements` by string literals (`Evaluator.java:799`, `:802`), where the desugarer's hooks are `WellKnownNames.java:61-69` constants (`SKEPTIC.md:17`).

**Standard 3.**
- **P-48 and call 1:** built as called, reading past P-48's "never ... the value's type alone", and P-59 by analogy; both on his list.
- **Call 2:** way 7 reaches a local variable and a top-level or local function, through a `do` block, a block's tail or a local declaration's body (`REPORT.md:166-182`); not a method, a top-level variable or a field. The skeptic corrected the boxes that claimed more (`4bc402a6b`).
- **Call 5:** the collector is 16 declarations, not the call's ten: `__ElemsAny`, `__ElemsNone`, `__AnyElemsOne`, `__AnyElemsTwo`, `__Elems`, `__ElemsOne`, `__ElemsTwo`, `__elemsJoin` twice, `__ElemsReduction`, `__elemsOne`, `__elemsOf`, `__replay`, `__bigOperatorElements` and the skeptic's two loops. Two are entry hooks walk calls by name. They are of the call's kind (in the component, not its api; the distance finds no error in them); their number and the second hook have not reached him.
- **Call 6 (item 53):** landed at 493 s.
- **P-46's clause**, "the instance, not which declaration runs": for an overloaded operator the hint crosses `bestMatch` (`EvaluatorBase.java:239-247`), and no program of the worker's or the skeptic's runs another declaration (`SKEPTIC.md:36`, `:39`). A reading, not a measurement.
- **Not yet before him:** a hint that does not fit falls back quietly to the unhinted instance, `u: Number = SUM[j <- 0#3] j` is `3 : Int` (decision 6, `REPORT.md:364`; `SKEPTIC.md:58`).

**Verdict: in the spirit.**

### Rung C, `f237148ac`

**What landed.** `normConjunct` (`scala_src/types/TypeAnalyzer.scala:708-735`) and `pSubInner`'s two union cases (`:165-180`), byte for byte the probe's (`SKEPTIC.md:63`); four promotions, the sibling's test, row 680's three expected failures, review-routed.1's `SelfTypeReturnSelfAtTraitRun`, the skeptic's seven tests. `impls/Decls.scala` is unchanged on main (edited `3216343f6`, restored `e75bb538b`).

**Standard 1.** `basic/inference.tex:56-58`; `basic/functions.tex:597-598` for row 680. No sentence made false (`REPORT.md:129-136`).

**Standard 2.** The team's expansion kept for ground meets; the new type-variable case follows the general one and its history entry (`REPORT.md:57-59`).

**Standard 3.**
- **P-26** (POPL 2019's matching condition) kept over a bound that names the parameter; **P-48**: the solver takes the intersection of the upper bounds, and `mk` at a ground bound now runs, 'box' (`SKEPTIC.md:147`).
- **Call 4** built (711); **row 680** held by the record's rule (item 54).
- **The record's premise** "the change keeps every union the checker builds free of variables" (`CLIMB-BATCH-15.md:145`) is false at a ground bound met with the parameter: row 712 stays refused (`SKEPTIC.md:115-128`).
- **Row 713:** an overloading the base accepted is refused, on a question Appendix I lists as unsettled (C.skeptic.1, `PLAN.md:784`). **Row 714**, a P-48 departure on the compiled path (a self-bounded parameter no argument fixes makes a call not applicable), has no PLAN line.

**Verdict: in the spirit.**

### Rung L, `a0f839ad7`

**What landed.** `array1` and `array2`, eight arms over a witness of the result type (`Library/FortressLibrary.fss:2572-2586`, `:2953-2965` on main); `NodeIM`'s `UPLUS` by `addNew` (`Library/IntMap.fss:520`); the box `revival-overloading` (`Specification/appendices/future.tex:257-268`) with its entry's Change and Original text (`changes.tex:2514-2521`, `:2684-2688`); `additiveIdentity`'s doc comment, respelled by the gather (`:3363-3365`).

**Standard 1.** `trait-parameters.tex:39-49`, `inference.tex:56-58`: `Vector[\Number,n\]` is ill-formed; "Array Expressions" now departs at `Number` (`aggregate.tex:152-155`, `:165-166`; row 729, L.worker.1). For `IntMap`, `comprehensions.tex:78-80`.

**Standard 2.** `additiveIdentity`'s witness is of its own result type (`:3366-3381`), so a witness of `Array1[\T,0,s0\]` applies the same rule to a container (`SKEPTIC.md:40`). `addNew` is the singleton's way (`IntMap.fss:339-340`).

**Standard 3.**
- **P-27** kept; **call 3** built (685 closed with claim and class corrected, 720 filed); **call 7** built.
- **A departure from the section's letter**, "apply it, read it and own it" (`CLIMB-BATCH-15.md:179`): the probe's patch threw `CastError` at walk's `Int` (`REPORT.md:99-105`), so the rung measured its ways and took the result type's witness, "No decision of the curator covers the choice of witness" (decision 1, `REPORT.md:172`). The skeptic agreed; it has not reached him.
- **Walk values that changed, not yet before him:** an array built at a `T` walk infers from a `ZZ32`, `ZZ64` or `RR64` value, or at a user type below `Number`, is plain where it was a vector, and loses the `+` and unary `-` the base ran (`REPORT.md:125`; `SKEPTIC.md:51-62`; row 721); `BIG UPLUS` over maps that share a key throws, untested (`SKEPTIC.md:72`); the team's "TODO: fix when Number is covariant" comment replaced (decision 2).
- **The skeptic's measure:** making an `RR64` array under walk is 20 to 40 % slower with the eight arms (`SKEPTIC.md:75-82`).

**Verdict: in the spirit.**

### Rung O, `59b1d0a4d`

**What landed.** `OverloadingChecker.scala:441-451`, `:755-762`; `AbstractMethodChecker.scala:124-181`; `Constructor.java:462-518`; Effect sentences at `changes.tex:2622-2627`, `:3008-3012`, `:3018-3021` on main.

**Standard 1.** `advanced/overloading.tex:548-549`, `basic/traits.tex:627-648`; no normative sentence changed.

**Standard 2.** Row 574's check; the cover search walk's `definedBelow` step for step (`SKEPTIC.md:22`), with walk's bounds.

**Standard 3.**
- **P-147, P-26, P-60** built by calls 8 and 9; `Pairs` and `FileConversion` keep their verdicts (`REPORT.md:113`), as P-147 says.
- **Limits filed as rows:** 725 (no split where a method has static parameters of its own), 726 (symbolic operators, behind row 584), 727 (a component's own abstract functional method), 728 (walk refuses a cover by a definition with its own static parameter, which the compiled path runs, `SKEPTIC.md:46-47`): at 728 walk and the checker still disagree.
- **Not yet before him:** decision 6, an unreadable covering body counts as none, against the section's letter (`REPORT.md:273-275`; agreed, `SKEPTIC.md:100`); decision 2, the duplicate message names the first-written domain (`XXXNoDuplicatesRule` prints `Box[\T\]` for `Box[\U\]`).
- **The bound refuses a covered program** (`SkBoundCovered`, `SKEPTIC.md:44`, `:55`), evidence added to W.skeptic.1's entry (`PLAN.md:767`).
- **`FlatString`'s api declares exactly row 726's pair** (`Library/FlatString.fsi:17`, `:20`). A repair of row 584 would make the checker refuse an api the count stage reads, which stops the stage before any component (`TypeCheckPhase.java:45-46`; `CLIMB-BATCH-15.md:214`). No PLAN line says so.

**Verdict: in the spirit.**

### The coordinator's calls, against what landed

| Call | Rung | Landed |
|---|---|---|
| 1, way 6 + 7 | B | Built; reads past P-48's letter, on his list |
| 2, way 7's reach | B | Built narrower: a local variable and a top-level or local function; no method, top-level variable or field |
| 3, row 685 closed, location filed | L | Built: 685 closed with `--claim` and `--class`; row 720 |
| 4, the sibling in C | C | Built: 711 added and closed, `CallerParamTwoGroundBoundsClosedTrait` |
| 5, the collector as hooks | B | Built, typed; 16 declarations and two entry hooks, not ten |
| 6, item 53 | B | Built: `body(i: I)`, 493 s |
| 7, row 704 | L | Built |
| 8, row 708 | O | Built; an unreadable body is skipped, and a covered object past 4,096 combinations is refused |
| 9, rows 707 and 709 | O | Built for word-named methods without static parameters of their own (726, 725 open) |

### The global questions

- **Promised against landed:** closed B 645, 646, 662, 703, 715; C 686, 687, 689, 690, 711; L 685, 704; O 707, 708, 709; held 680. Distance 49, count 1.
- **The record's premises:** three failed: the probe's row-685 patch (`CastError` at walk's `Int`); `IntMapComprehensionTypedWalk` "green on the base", red there too at the binding (`rung-walk-elements/REPORT.md:97`); "free of variables" (712). The 4 hours read 5 h 03.
- **Built twice:** no (the merged-diff review's check 1, in its journal result). **The library's way:** yes, in B and L, each with its precedent.
- **Together:** L's `addNew` runs through B's collector in an unwritten `IntMap` comprehension; O's load check accepts B's new library objects; O's split runs under C's union cases; the merged tree's tests pass.

### Findings

Ranked by what they cost or risk next, each with its home.

1. **Choices not yet before him:** B's collector at 16 declarations with a second hook named by string literals, and its hint's quiet fallback; L's witness and the walk values it changed (row 721, user number types, `BIG UPLUS`); O's decisions 2 and 6. Home: one entry of the coordinator's routing, "Choices and walk values of climb batch 15", default as landed; batch 14's finding 1 again.
2. **Thirteen new open rows without a PLAN line** (Part 4): batch 12's measure 2, unbuilt a sixth batch running.
3. **Item 54 and three entries without a default** (Part 4): batch 12's finding 4, a fourth time.
4. **The count stage's margin:** 569 s of 900 to reach `Array3`, the component's check 22 % slower at like load. Home: item 54's evidence; way (a) needs a quiet measure and may need (b) first.
5. **Row 726 against `FlatString`'s api** (row 584's repair would stop the count stage at an api). Home: a line beside item 38 (row 585).
6. **Built or answered items open in PLAN** (Part 4), the routing in flight (`BOOT.md`).
7. **A skill sentence false since 2012, unlisted** (Part 3).
8. **O's second pair of stages after a message edit** (Part 2). Home: the manual's rule 5.

## Part 2. Did the practice hold

### The skeptics' 17 fixes

From the journal's `fixes`, each `SKEPTIC.md`, and the transcripts for test first.

| Rung | Fixes | Defects | Contested | Test first |
|---|---|---|---|---|
| C | `1ae7e4255` (the report), `c5570ada6`, `dd32cebd9`, `cc64195ca`, `30af07104`, `95a6ac9de`, `7841ea0c8` | 0 | none | four faces red on the old code 14:13:57; 712's red with the defect hidden 14:14:52 (`SKEPTIC.md:166-177`) |
| B | `2a4f38219`, `7ece286a8`, `4bc402a6b`, `1f3d00c18` | 1 | none | red on the head 13:57:51, edit 13:58:56, green 13:59:15 (`a409b774` calls 97, 100, 102) |
| L | `22cb62296`, `9d91a922d`, `0e383f368` | 0 | none | the two edited tests red on the old code (`SKEPTIC.md:86-90`) |
| O | `19dbaa604`, `e5456a7e9`, `224f85017` | 0 | none | 726's test red on a deliberate fix 14:44:16 (`SKEPTIC.md:86-92`) |

- Every fix is sound and inside its rung's files. The review read the one defect fix in its maker's transcript (the journal's `fixesChecked`).
- No fix reached a path outside its section, so the narrowed clause (c) was not needed.
- `CONTESTED` on rows 713 and 729 is the ledger's status, "unsettled; the notes say why" (`fortress-gap-ledger.md:17`), not a contested fix.

### Workers, test first

Each worker's tests failed through the harness on the base's code before its first edit of source, as its skeptic read the transcript: B 10:57:24-46 (6 of 8) and 10:58:03 (row 703, the line alone typed), patch 10:58:43 (`rung-walk-elements/SKEPTIC.md:12-13`); C 10:56:40-57, first build 10:58:02 (`rung-checker-bounds/SKEPTIC.md:53`); L 12:42:45, first library edit 12:43:50 (`rung-library-factories/SKEPTIC.md:27-34`); O 12:23:41 and 12:23:56, first edit 12:25:47 (`rung-duplicates-coverage/SKEPTIC.md:20`). Each first `XXX` test was shown red once on a deliberate fix (B 11:23:48, C 11:05:44 and 11:31:31, L call `iH8ue8`, O 12:24:29); the tests added after an edit ran on the old code (B's `evensAfter`, red; L's guard, green). No miss, as in batches 11 to 14.

### The briefing in each agent's first turn

- **In the first turn: 0 of 8, against batch 14's 0 of 10.** Every first turn is one call, the skill's load, which the brief puts first.
- **Run at all: 8 of 8, at calls 9 to 12** (workers C, O, L 9, B 12; skeptics B, O 10, C, L 11), against batch 14's 10 of 10 at 9 to 11. Every part read within about 30 s: B 7 parts, 144,245 bytes, about 59,900 tokens (10:53:58-10:54:27); C 3; O 4; L 2. L wrote its parts into the session's scratchpad (calls 9 to 12), not its worktree's `tmp/` (`climb-batch-workflow.md`, "What a batch commits").
- **For P-109's figure**, the share that read it at the start of their work is 100 %, as in batch 14.

### Builds and runs, repeated or not

From the transcripts' Bash calls and `batch-measures.py`:
- **B** built once and ran each suite and stage once. **L** built nothing (a library edit) and ran each once.
- **C** built twice (the patches, the hold's revert) and ran the count three times, one more than the brief's two: the hold made run 1's tree not the final one.
- **O** built twice and ran both suites, the count and the distance on two states, `317fc0ef5` and `f537abed8`. The second is a message edit, which by reading cannot move a site (`#kind overloading 0`, `REPORT.md:193`); the stages read `OverloadingChecker.scala`, so `STAGE_BLIND` does not apply by its letter. The second pair cost 339 s and 1,947 s of machine time.
- **Skeptics** built nothing; B's ran 37 harness tests and microGPT's quick pair after its fix, no stage, as the brief says. **The gather** built once; **the gate** ran once.

### Refusals by the harness and the tools

- **All four workers' writes of `REPORT.md` were refused**: B 11:48:49, C 12:19:31, O 13:00:22, L 13:12:12, and L again into the scratchpad at 13:35:01. The script expects this, and the skeptics wrote each report from the journal.
- **Four `sleep 60; ...` calls were blocked**: worker B 11:43:10, skeptics B 13:47:11, C 14:05:10 and O 14:33:19 (`session.md:17`).
- **Six `Edit` calls were refused for a file not read**: B 1, O 3, L 2. None cost a refill.
- **Two agents read `references/sources.md`**, which the skill says not to load for a task: worker B and skeptic O (`skill-load.py`).
- **One branch commit's footer** (`1f3d00c18`) departs from `committing.md`'s form (`rung-walk-elements/SKEPTIC.md:6`). It did not reach main, where the gather composed each rung's commit.

### The practice's measures, batches 11 to 15

| Measure | B11 | B12 | B13 | B14 | B15 |
|---|---|---|---|---|---|
| Written | 5.03M | 5.43M | 7.22M | 4.82M | 4.44M |
| Rungs, agents | 4, 14 | 5, 17 | 5, 20 | 5, 14 | 4, 12 |
| Per rung, all roles | 1.26M | 1.09M | 1.44M | 0.96M | 1.11M |
| First calls | 0.62M | 0.72M | 0.89M | 0.60M | 0.55M |
| Refusal cycles | 2.7% | 5.4% | 6.3% | 0 | 0 |
| Skeptic fixes (defects) | 19 (3) | 15 (2) | 23 (4) | 19 (2) | 17 (1) |
| Rulings, repairs | 1, 0 | 2, 0 | 3, 0 | 0, 0 | 0, 0 |
| Distance, sites gone net | 46 | 54 | 48 | 31 | 5 |

### Batch 14's measures, a batch later

1. **Points without a PLAN line** (its finding 1): met for batch 14, in `PLAN.md:773-775`. For batch 15 it is open while the routing is in flight.
2. **Rows 706, 707, 709 and 710**: each has a line (`PLAN.md:141-144`).
3. **The count stage's "20 s"**: gone from the script and the manual. No rung's foreground call ran past the tool's limit.
4. **`batch-measures.py`'s build count**: fixed (`9d97fc506`). It now reads batch 14's builds as 1, 2, 1, 2 and 0, as that review counted them in the transcripts.
5. **Batch 11's finding 8**, `FORTRESS_THREADS=1` in the summary's machine line: still open.

### Misses, by kind

Numbered on from `batch-14-review.md`'s 476.

Found inside the batch:
- **The change wrong:** 477, B's `__replay` overflowed the stack over a sequential generator (skeptic B).
- **The probe wrong:** 478, the row-685 patch's `CastError` at walk's `Int` (worker L).
- **A new rule's effect elsewhere:** 479, C's refusal of an overloading the base accepted (713) and 480, row 686's ground face (712) (skeptic C); 481, L's arrays at run-time classes and user number types, and `BIG UPLUS` (worker and skeptic L); 482, O's bound refusing a covered program (skeptic O); 483, B's refusal moved into the library and a quiet wrong value refused (worker and skeptic B).
- **Text claiming more than the paths do:** 484, B's boxes on way 7 (skeptic B); 485, O's two Effects (skeptic O); 486, C's record on unions (skeptic C); 487, `additiveIdentity`'s doc comment (skeptic L, the gather).
- **The team's code, found by the rungs' probes:** 488, rows 712 to 714 (skeptic C), 716 and 717 (worker B), 718 and 719 (skeptic B), 721 and 722 (worker L, filed by its skeptic), 723 to 725 (worker O), 726 to 728 (skeptic O), 729 (the review).
- **Process:** 489, four report writes refused (by design); 490, `ledger.py`'s 7 refusals, row 680 left saying what is false (the gather).

Found by this review: 491 to 499, the eight findings above and the landing commit's "whole".

**Against the earlier notes.** 14 found inside the batch (477 to 490), 3.5 a rung, against batch 14's 3.4. The skeptics found the one defect and all four text corrections. No test-first miss. Landed: no wrong value known; the known costs are rows, entries and one held line.

## Part 3. Skill sentences the batch made false

**Seven**, each listed for the skill writer in the gather's record (`RECORD.md:317`, `:369`), whom the coordinator has tasked (`BOOT.md`):
- **B, five:** in `SKILL.md`, `references/revival-changes.md` (three entries) and `references/library.md`.
- **O, two:** in `references/interpreter.md` and `references/revival-changes.md`. One entry also needs row 728 named.
- **C and L, none.** Their reports say so, and a grep of the skill at `c40489978` for their subjects finds no sentence: the normal form, the crash messages, local function groups, the factories, `UPLUS`.

**One more is false, unlisted:** `references/library.md:16`, on the fused path of a nested big operator, which rung B found dead since the team's `5a68404fd` (`rung-walk-elements/REPORT.md:204-210`). Measured false by the batch, not made false; it goes with B.worker.2's entry.

Outside the skill: PLAN's lines on D2 and row 628 (`PLAN.md:629`, `:664`), and the landing commit's "whole" (section 3).

## Part 4. Routing

Checked against main at `a4d17e103`, where PLAN and the ledger are as at `219d485eb`. The coordinator's routing (`climb-batch-workflow.md`, "After the landing: the coordinator's routing", step 2) is in flight (`BOOT.md`).

### The items on file

- **Item 54** (`PLAN.md:323-325`) and **six entries** under "Climb batch 15, listed for his review" (`:780-789`); O.skeptic.1 added to W.skeptic.1's entry (`:767`), gather.1 to batch 12's gather.2 (`:718`).
- **Four have no default**: item 54 ("No default on record beyond the held line"), C.skeptic.2 ("beyond the expansion kept"), B.worker.1 and B.worker.2 ("No default on record"). Each has a natural one under the preamble "the default is what landed" (`:782`): the line held; the expansion kept; walk's limit until the switch-over; the dead path recorded in `map/dormant-code.md`.

### What the record listed for him, and PLAN lacks

- **The coordinator's calls 1 to 9** (`CLIMB-BATCH-15.md:73-83`), which "After the landing" routes into PLAN, calls 1 to 5 by name (`:389`): no entry yet.
- **"Points the batch lists for you, not questions"** (`:87-91`): walk values that change (B), team declarations changed (B, L, O, C), `IntMap`'s throw and its changed pin (L). Only `array1` at `Number` has an entry (L.worker.1).
- **Not yet before him** (finding 1), and the skeptic L's measure of the arms' cost. **Proposed:** one entry, "Choices and walk values of climb batch 15", the default as landed.

### New rows

Rows 711 to 729 (`RECORD.md:58-79`). 711 and 715 were added and closed at once.
- **With a line:** 712 (`PLAN.md:785`), 713 (`:784`), 716 (`:786`), 729 (`:788`).
- **No line, 13**, each with the line it needs: 714 (P-48 on the compiled path) and 720 (an error at the callee's declared type), the next checker rung; 717, 718 and 719 (walk's nested comprehension, a user big operator declared as its own trait, a long sequential comprehension's stack), beside rows 20 and 716; 721 and 722 (walk's run-time class meets the factories and `openRange`), beside row 364; 723 to 725 (a generic functional method beside a plain one; the split that skips static parameters), beside row 709's line; 726 and 727 (duplicates the checker skips), beside row 584 and item 38; 728 (walk refuses a generic cover), beside row 665's half.

### Answered or built items still open in PLAN

- **"Where we stand"** (`PLAN.md:10-13`): batch 14's figures, "Next" batch 15. **Item 13** (`:145-150`): "Batch 15, its record not yet drafted", with its lines for `body(i)`, row 680 and rows 685 to 690.
- **Built by this batch:** item 12's `body(i)` line (`:133`); rows 707 and 709 (`:142-143`); item 53 (`:321`); batch 14's entries L.worker.2 (`:759`), L.skeptic.3 (`:760`) and W.skeptic.1 (`:767`); item 51's mention of row 708 as an entry (`:313`); review-queue item 17 (`review-queue.md:131-136`), which the record takes "out of the lists" (`CLIMB-BATCH-15.md:389`).
- **Made false by B:** D2's line and row 628's (`PLAN.md:629`, `:664`).

### Notes not written

Seven of eight (gather.1, `RECORD.md:146-155`). Row 680's claim and its note stay false, and no command corrects an open row's claim. Home: the tool's routes (P.worker.1's entry), a fifth batch running.

## What I did not do

- I built nothing and ran no Fortress program, suite or stage; I ran read-only scripts over the transcripts, the journal and git. The 4.44M is `spend.py`'s; `batch-measures.py` and my per-agent script agree. I did not run `run-study.py`'s notes, as batch 14's review did not.
- The five gone sites are each confirmed by a rung's own stage. The gate's count time is from its log and its transcript's times; the landed table prints none.
- The transcripts keep no reasoning, so Part 2 reads what agents ran and when. I did not judge the new specification passages beyond the skeptics', the review's and the gather's checks. The INDEX line is the coordinator's.

## For Pavol

In the order they need you, each with its default:

1. **Item 54, row 680's repair, held** on one run under load, 809 s against 690 s; the stage now takes 569 s to reach the crash, and the checker is 22 % slower over the component. Default: held (none on record); natural next step, one idle measure, way (a).
2. **Walk fixes an unwritten reduction's type parameter by its elements (call 1, rung B).** This reads past P-48's "never ... the value's type alone", and P-59 by analogy. Default: as built.
3. **An empty unwritten reduction or comprehension takes the bound** (row 716, B.worker.1): `SUM` over nothing gives `0`, not `0.0`. Default: none on record; natural: walk's limit until the switch-over.
4. **Calls 2 and 5 as built.** A declared type reaches local variables and functions only. The collector is 16 library declarations with two hooks, not ten. Default: as built.
5. **The normal form at a ground bound** (row 712, C.skeptic.2). Default: none on record; natural: the team's expansion kept.
6. **An overloading the old checker accepted is now refused** (row 713, C.skeptic.1). Default: today's refusal.
7. **"Array Expressions" at `Number`** (row 729, L.worker.1). Default: the text as it stands.
8. **Rung L's witness, not the probe's patch:** arrays at a type walk infers from a value are plain and lose `+` and `-` (row 721); `BIG UPLUS` throws on a shared key; an `RR64` array is 20 to 40 % slower to make under walk. Default: as landed.
9. **A key repeated with the same value in a map comprehension** (L.worker.2). Default: the libraries' throw.
10. **Rung O's choices:** an unreadable covering body counts as none; the duplicate message names the first-written domain; a covered object past 4,096 combinations is refused on both paths (O.skeptic.1). Default: as built.
11. **`FlatString`'s api declares a duplicate pair that the checker skips** (row 726, row 584). Repairing row 584 would stop the count stage at an api. Default: rows as filed, the pair for item 38's answer.
12. **The team's dead fusion of nested reductions** (B.worker.2). Default: none on record; natural: record it in the dormant-code map.
13. **Calls 3, 4 and 6 to 9**, for your sight: row 685 closed and row 720 filed; the sibling 711; `body(i)` typed; rows 704, 707, 708 and 709. Default: as built.
14. **The ledger tool has no route for an open row's claim** (gather.1; row 680's false claim). Default: the coordinator's hand edit.

Information:
- Distance 54 to 49 and count 1, as the record said, to the site.
- 4.44M over 12 agents in 5 h 03 (the record: 4.3M, 4 hours); preparation about 3.65M more (probes 2.01M, planner 0.47M, reviews about 1.17M).
- No fix contested, no judge. No briefed agent ran its briefing in its first turn; all eight by their twelfth call, as in batch 14.
- Seven skill sentences made false, being folded; an eighth, false since 2012, unlisted.
