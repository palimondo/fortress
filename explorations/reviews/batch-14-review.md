<!-- The combined post-batch review of climb batch 14 (run wf_b9a8001b-541, base 5bf8a7c84, 00:52 to 05:35 UTC on 2026-10-14, landed at 7c2c7cd4b: rungs L 604d0e23c, A 0856f3e6a, P 3ba2d005f, W f9fe5c874, S 1c32ccffd, the closes b2b68d7fc, the gather record 5e4a5782d, the review's corrections cf40fd6a1), the fourth run of coordinator/process-engineering/batch-redesign.md's practice and the first without a cold read, in the form of reviews/batch-13-review.md, on the curator's standing word ("One review after every batch"), by a review worker reading only, against main at 01ff2e099 (four coordinator and skill-writer commits after the landing; PLAN.md and the ledger as at cf40fd6a1). The 14 transcripts and the journal were read through bounded scripts in the session's scratchpad; the measures are batch-measures.py's on batches 11 to 14 and skill-load.py's on 13 and 14, with a per-agent script that agrees with spend.py's 4.82M; 13b's and 14's per-site lists were compared site by site through git diff -U0 5bf8a7c84 7c2c7cd4b with batch 13's mapping script. Nothing built or run. Tokens are writes only (input plus cache creation, one count per message id). -->

# Climb batch 14: conformance, the practice, and routing

## What came up in this run

### 1. The distance 85 to 54 and the count 1 to 1, site by site

**The distance, 85 to 54 (−31).** Mapping 13b's 85 sites through the batch's diff: 31 gone, none come, 54 matched with the same message (digits masked). The gate reads the same: `DISTANCE DOWN 85 -> 54`, class S1 29 to 0, R4 1 to 0, OT 16 to 15 (`climb-batch-14/gate/summary.txt:113-118`).

By rung:
- **S, −29**, every one a body the team wrote, as the record listed them (`coordinator/CLIMB-BATCH-14.md:115`):
  - `StandardPartialOrder` 4 (`Library/FortressLibrary.fss:226` twice, `:231`, `:233`);
  - `StandardTotalOrder` 12 (`:285` twice, `:289`, `:290`, `:291` and `:293` three times each, R4's tuple among them);
  - `AdditiveGroup` 2 (`:360`, `:363`); `Integral` 7 (`:691-693`, `:713`, `:722-724`);
  - `StandardMutableArrayType` 4 (`:2182`, `:2186`, `:2190`, `:2194` at the base; `:2185-2197` on main).
  - None came. The unconfined rule's 21 (18 Return Type Rule errors at `CMP`, three `CMP` bodies typed `Comparison`) are absent (`compile-ladder/rung-self-type/REPORT.md:86`).
- **L, −2**: `:688`, `Integral`'s default `numerator` (P-146's thirtieth), and `:2525`, `Array2`'s `offset` (row 679).
- **A, P and W, 0**, as the record said (`CLIMB-BATCH-14.md:33`). A's own stage: 85 to 85 by location and message (`rung-argument-context/REPORT.md:149`). W's: the sorted lists equal (`rung-walk-coverage/REPORT.md:173`).
- **Row 488's `:130`** (`BIG LEXICO`, class BR) went on L's tree (85 to 82, `rung-library-followups/REPORT.md:128-142`) and on S's (85 to 55, `rung-self-type/REPORT.md:73-84`). It is back on the merged tree (the landed per-site list, line 46). Neither rung touched it: it is F-53's variation of 2 to 4 errors.

**Against the record**: "about 54, the count 1" (`CLIMB-BATCH-14.md:34`). Met to the site; every per-rung expectation (`:30-33`) held.

**The 54, by what each waits on** (line numbers are those of the landed per-site list, `compile-ladder/gate/distance-sites.tsv`):
- **The arrays, 26:**
  - row 685's first factories, 4 (lines 48, 49, 54, 55);
  - row 686's norm, 1 (15);
  - 14 bodies typed by their parent trait (24-37);
  - 3 sizes tested in a branch (38, 39, 44);
  - 2 export errors (2, 4);
  - row 678's `Col` and `Row`, 2 (9, 11).
- **His other items, 12:** the integer power 6 (16, 17, 21-23, 45); item 38's `String` pairs 3 (3, 7, 8); row 634's list half 1 (20); item 46's fused arm 1 (43); row 631's `embiggen` 1 (10).
- **The `where` clauses, 12:** row 433, 6 (5, 6, 50-53); row 636, 4 (12-14, 47); row 436, 2 (40, 41).
- **Row 425, 3** (18, 19, 42). Rung A's retry does not reach them: the two `BIG MIN` sites are F-bounded, which the retry leaves refused (`rung-argument-context/REPORT.md:115`).
- **Row 488, 1** (46).
- **Hidden** behind the two crash rows, unchanged but for their lines: `__bigOperator`'s body (`:1312-1316`) and `Array3` (row 680, `:2886-2999`) (`climb-batch-14/gate/summary.txt:119-122`).

**The count, 1 to 1.** The table is byte-equal to 13b's: `#total 1`, its error 'Missing parameter type for i', moved from `:1311` to `:1314` by L's three `numerator` lines; the verdict is `COUNT SAME 1, declared L: 1` (`summary.txt:112`). The record's reading held. Walk refuses `body(i: I)` on an unwritten list comprehension, '(i:BOTTOM)', and on a map comprehension, '(i:(ZZ64,BOTTOM))' (`rung-library-followups/REPORT.md:41-56`). So L held the line by the section's own rule (`CLIMB-BATCH-14.md:188`). The stage took 303 s on L's tree (`REPORT.md:114`) and under 5 minutes in the gate (transcript `ad9348a7`: started 05:22:54, done by 05:27:34), against the 900 s limit. The distance stage took 1,714 s, `FortressLibrary` 954 s, against 13b's 2,246 s and 1,318 s (`gate/distance.txt:28`).

### 2. The cost, against the record and batches 11 to 13

`batch-measures.py` on the four runs; batch 14's total is the coordinator's `spend.py` figure, 4.82M over 14 agents.

| Role | B11 | B12 | B13 | B14 | B14 share |
|---|---|---|---|---|---|
| Rung workers | 1.99M (4) | 2.05M (5) | 2.64M (5) | 1.99M (5) | 41.4% |
| Skeptics | 1.60M (4) | 1.67M (5) | 2.59M (7 runs) | 1.71M (5) | 35.4% |
| Judges | 0.14M (1) | 0.30M (2) | 0.455M (3) | 0 | |
| Gather | 486K | 527K | 592K | 460K | 9.6% |
| Merged-diff review | 412K | 470K | 482K | 399K | 8.3% |
| Gate | 116K | 125K | 142K | 131K | 2.7% |
| Cold read | 154K | 155K | 168K | gone | |
| Commit | 135K | 140K | 149K | 128K | 2.7% |
| **Total** | **5.03M** | **5.43M** | **7.22M** | **4.82M** | |
| Agents, rungs | 14, 4 | 17, 5 | 20, 5 | 14, 5 | |
| Span | 4 h 25 | 4 h 37 | 6 h 24 | 4 h 43 | |
| Per rung, all roles | 1.26M | 1.09M | 1.44M | 0.96M | |

- **Against the record** (`CLIMB-BATCH-14.md:66-70`): about 5.9M, from 5.8M; the run wrote 1.08M (18%) under the central figure and 0.98M under the floor. By part:
  - workers 1.99M against 2.4M: S 545K against 0.55M, A 400K against 0.4M, W 386K, P 373K and L 290K against 0.5M, 0.5M and 0.45M;
  - skeptics 1.71M against 2.0M;
  - the fixed roles 1.12M against 1.36M.

  The time was 4 h 43 against about 6 h. Against the manifest's minutes: S 77 of 140, W 70 of 110, A 48 of 90, L 47 of 120, P 38 of 100.
- **Why it cost 2.40M less than batch 13:**
  - skeptics −0.88M: batch 13's two runs stopped by the restart (0.61M), and five runs at a mean of 341K against 397K;
  - workers −0.65M: no rung measured a held half, as batch 13's V did (804K), and S, the dearest, wrote 545K against N's 656K;
  - no judge −0.455M; no cold read −0.168M;
  - the tail −0.25M: gather −132K, review −83K, commit −21K, gate −11K.
- **Against batch 12** (5.43M, five rungs): −0.61M, the two rulings and the cold read most of it.
- **First calls** 604K (12.5%), 6 cold: worker S 64K, skeptic L 65K, and the four tail agents 54K to 76K. Batch 13's were 891K (12.3%), 10 cold.
- **Refusal cycles** 0, against 2.7%, 5.4% and 6.3%. **Cache refills** 0, as in batches 11 and 12.
- **The skill's load** (`skill-load.py`) was 493K, 10.3%: 110K of load text and 383K over 154 reads of parts. Batch 13's was 647K (9.0%) over 249 reads.
- **Sites per million tokens**: 31 for 4.82M (6.4), against batch 13's 6.6 and batch 12's 9.9. This measures what the record gave the batch.

Per agent, in order of start (UTC; agent ids are the transcripts' `agent-<id>.jsonl`):

| Agent | Id | Writes | First call | Turns | Minutes | UTC |
|---|---|---|---|---|---|---|
| Rung S | a07c4afc | 545K | 64K | 225 | 77.0 | 00:52-02:09 |
| Rung L | a9b61e38 | 290K | 23K | 137 | 47.4 | 00:52-01:40 |
| Rung W | a2a8a051 | 386K | 25K | 185 | 70.5 | 01:40-02:50 |
| Rung P | a8e04fcc | 373K | 23K | 172 | 38.3 | 02:09-02:48 |
| Rung A | a5bef13a | 400K | 22K | 179 | 47.9 | 02:48-03:36 |
| Skeptic L | ab37f196 | 284K | 65K | 92 | 17.3 | 02:50-03:08 |
| Skeptic S | ac8c8110 | 382K | 31K | 150 | 42.2 | 03:08-03:50 |
| Skeptic P | acbdcdb4 | 354K | 29K | 130 | 24.4 | 03:36-04:00 |
| Skeptic W | a7cfe70a | 343K | 29K | 128 | 24.2 | 03:50-04:14 |
| Skeptic A | a026ca7a | 344K | 27K | 128 | 31.4 | 04:00-04:32 |
| Gather | a9b0e5c8 | 460K | 75K | 182 | 24.3 | 04:32-04:56 |
| Review | ad3c2db3 | 399K | 76K | 128 | 18.2 | 04:56-05:14 |
| Gate | ad9348a7 | 131K | 54K | 47 | 33.2 | 04:56-05:29 |
| Commit | a8320eb8 | 128K | 62K | 49 | 5.6 | 05:29-05:35 |

With two slots and the workers first, each skeptic waited after its worker ended: L's 70 minutes, W's 60, S's 59, P's 48, A's 24. One slot stood idle from 04:14 to 04:32 while skeptic A finished, since the gather waits for all five.

### 3. The tail

- **The gather** (460K, 24 min) applied L, A, P, W, S in `changes.tex`'s order and said why (`climb-batch-14/RECORD.md:20-35`); no conflict; the merged tree's tests 'OK (27 tests)' and 'OK (57 tests)' (`:40-47`); rows 703 to 710 opened, 8 closed (`:58-76`); 12 of 23 notes refused (gather.2, `:144-160`); F-220 to F-225 folded; gather.1, the script's retired handover.
- **The merged-diff review** (399K, 18 min) found no blocking code, read both defect fixes in their makers' transcripts, corrected four places (`cf40fd6a1`), and added review.1, review.2 and review-routed.1 (`coordinator/PLAN.md:700`, `:753`, `:754`).
- **The gate** (131K) ran once, green: `testFast` 1,945 in 48 suites, the compiler track 1,118 to 1,173 (S 13, A 26, P 15, W's skeptic 1); `testSystem` 580 to 604 (L 4, A 1, P 14, W 5); `testSpecData` 130; 42 of 42 `atomic` runs; no ladder or microGPT phase moved. Its `# machine` line still reads `FORTRESS_THREADS=1` (`summary.txt:69`), batch 11's finding 8.
- **The commit** (128K, 6 min): both microGPT quick walk checks 7 of 7 PASS, 56 s and 47 s (`summary.txt:123-126`); the PDF rebuilt, 676 pages; F-53's 85 to 54; pushed to the three branches; the five worktrees removed (`7c2c7cd4b`'s message).

## Part 1. Conformance

### Method

As in `reviews/batch-13-review.md`: each rung's commit, `REPORT.md` and `SKEPTIC.md`; its section of `coordinator/CLIMB-BATCH-14.md` with `coordinator/climb-batch-14-review.md` and the decisions it builds (P-146, P-147, P-51, P-49); the gather's `RECORD.md`, the journal and the code on main. Three standards, kept apart: the specification; the team's built intent and the library's own way; the decisions on record. The skeptics' and the review's findings are cited, not repeated.

### The verdicts

- **Rung S, the self type: in the spirit.** P-146 and the coordinator's mixin default are built. Three readings the rung took went into normative text, and he has seen none of them.
- **Rung A, the argument retry: in the spirit.** P-51 and P-49 are built as the probe's patch, with one skeptic's fix. Its reaches past the probe are among the points; in PLAN one, a normative paragraph, has no line, and another, the multifix choice, appears only as walk's side.
- **Rung L, the library's loose ends: in the spirit.** `body(i)` was held by the section's own rule. The `numerator` extension has not reached him.
- **Rung P, the POPL 2019 examples: in the spirit.** One skeptic edit outside the file list has no PLAN line.
- **Rung W, walk's coverage rule: in the spirit.** P-147 is built after the two repairs. Its changes to team declarations have not reached him.
- **No rulings.** No fix was contested, and no rung refused.

### Rung S, `1c32ccffd`

**What landed.** Rule (a), a self-type parameter read from the F-bound or through a self-typed trait the trait extends at it (`ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala:101-212`); the confinement, the judgement's patch byte for byte (`compiler/index/FunctionalMethod.java:46-67`; `SKEPTIC.md:14`); rule (b) for declarations and object expressions (`scala_src/typechecker/TypeHierarchyChecker.scala:62`, `:65`, `:110-171`); the pass given the global environment (`compiler/Disambiguator.java:145`, `:300`; the skeptic's `37f02419d`); `Specification/basic/expressions/var-ref.tex:70-90`, `basic/traits.tex:285-326` and Appendix I `revival-self-type` (`appendices/changes.tex:3492`).

**Standard 1.** The self paragraph gains its second exception. `var-ref.tex:53-54`, `traits.tex`'s "implicitly has the type of the enclosing trait" and `overloading.tex:180-182` stay true of the signatures (`REPORT.md:93`, `:114`).

**Standard 2.** Rule (a) reuses the team's own `comprises` self type (`SelfParamDisambiguator.scala:73-78`); rule (b)'s walk over object expressions follows `checkObjectExprComprises`. The 29 library bodies are the team's, unchanged (P-27). The prelude has no F-bound without a clause, so no compiled prelude body moves (`SKEPTIC.md:26`).

**Standard 3.**
- P-146: built. The 29 sites went, the signatures are plain and the 21 false errors absent; an extender at another type is refused (`XXXSelfTypeExtenderWrong`); the library text and walk are unchanged (`ant testSystem` 146, 149, 141, 144, `REPORT.md:69`).
- The coordinator's default (`CLIMB-BATCH-14.md:86`): built and measured. `Containment` checks with no error at any stage (`REPORT.md:105`). It is routed as S.worker.1 (`PLAN.md:751`).
- Row 695: its reproducer is gated. The skeptic bounded it to an object-typed parameter (F3, `SKEPTIC.md:74-80`), and review-routed.1 owes the trait-type test.
- Rule (b) newly refuses the team demo's `generator` (row 710) and `PureList`'s `List` (row 355) under either reading (`REPORT.md:105`). No gated test reads either.
- `Disambiguator.java` is outside the section's file list (`CLIMB-BATCH-14.md:124-130`). The section's own text asks for that edit (`:118`), and it was reported (`RECORD.md:233-234`).
- **Readings he has not seen.** S.worker.1 names only the mixin default. Three readings are written into normative text with no entry:
  - A trait whose clause lists only `...` counts as having no clause for rule (a). This is the worker's decision 3 (`REPORT.md:120`), which the skeptic's `9a2cc93af` wrote into `var-ref.tex:70` and `traits.tex:285-286`. Nothing measured moves.
  - Rule (b) compares a trait's self type: its clause's intersection, or its own self-type parameter. So `trait Foo extends Shape[\O1\] comprises { O1 }` is accepted. This is decision 5 (`REPORT.md:122`), with the skeptic's `SkSelfComprisesOther` (`SKEPTIC.md:70`), now at `traits.tex:298-300`. It is Scala's conformance rule, P-146's reason, read on Fortress's self type.
  - The term "self-type parameter" in normative text (decision 8, `REPORT.md:125`).

**Verdict: in the spirit.**

### Rung A, `0856f3e6a`

**What landed.** The retry, run when the attempts keep none (`scala_src/typechecker/impls/Functionals.scala:741`, `:850-924`; `writesStaticArgs` at `:915`, the skeptic's `273f8e5b3`); the inference chapter's list of contexts (`Specification/basic/inference.tex:148-154`), a new paragraph (`:191-222`) and the item; Appendix I "The contexts that give a call an expected type" amended (`changes.tex:2046`); the skeptic's row-425 boxes, two outside the files (`reductions.tex:38-44`, `changes.tex:1056-1060`; `07f8b31bc`).

**Standard 1.** `var-ref.tex:38-40`, the context of the function call. The text's guarantee was false where the kept declaration's result does not fit (`SkPassedOver`) and now reads as P-49 does (`SKEPTIC.md:93`). The multifix choice follows `chained-multifix.tex` (`SKEPTIC.md:120`).

**Standard 2.** It is the checker's own `TryChecker` retry: `inferFnExprParams` and three sites in `Operators.scala` (`REPORT.md:93`).

**Standard 3.**
- P-51 wide: built, with the two pins promoted. P-49 holds (`InferCallArgumentKeepsFit`).
- Forks 2, 4 and 5 are built as the patch has them. The skeptic's fix makes a written-argument call instantiate the enclosing declaration, by P-51's definition (A.worker.2, `PLAN.md:744`).
- **Beyond the probe's measure, three reaches:**
  - Row 425's plain-bounded half: a reduction's big operator takes the expected type (A.worker.1, `PLAN.md:743`).
  - A program the base accepted now runs the multifix declaration in place of the binary one: `mk() OPLUS mk() OPLUS mk()`, old 'binary', new 'multifix' (`SKEPTIC.md:118-126`; `ProjectFortress/compiler_tests/InferCallArgumentMultifix`). PLAN names it only as walk's difference inside A.worker.3 (`PLAN.md:745`), not as a compiled program whose value changed.
  - A normative paragraph beyond the list, `inference.tex:191-222`, a reserved point (`RECORD.md:212`). It has no PLAN line.
- No site moved and no ladder file moved (`REPORT.md:147-151`).

**Verdict: in the spirit.**

### Rung L, `604d0e23c`

**What landed.** `Array2`'s `offset` in `Array1`'s statement form (`Library/FortressLibrary.fss:2528-2535`); `numerator` on each integer type, bodies at `:812`, `:905`, `:985` and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:470`, api lines at `Library/FortressLibrary.fsi:527`, `:580`, `:638` and `FortressBuiltin.fsi:170`, `Integral`'s default removed; `NodeIM`'s `SYMDIFF` with a singleton (`Library/IntMap.fss:570-572`); the skeptic's `IntMapSymdiffManyEntry`, and `IntMapUplusSingleton` with row 704 (`SKEPTIC.md:72-78`).

**Standard 1.** `basic-lib/basic-integers.tex:667-668` stays true. The text is silent on `IntMap`.

**Standard 2.** Each repair names its precedent: `Array1`'s and `Array3`'s `offset`, `ZZ`'s `numerator` (`.fsi:675`), `SingletonIM`'s `SYMDIFF` (`IntMap.fss:361-363`). The four departures from them are listed (`REPORT.md:3-7`).

**Standard 3.**
- P-146's thirtieth site: cleared.
- Item 47's `body(i)`: written, run under walk, refused, and held, as the section asks (`REPORT.md:28-66`). It became row 703 and item 53 (`PLAN.md:307`).
- **Not yet before him:** the four api lines, "an extension for you to judge" (`CLIMB-BATCH-14.md:87`), and the two pins of `IntMapSymdiffSingleton.fss:12-13` (`:89`; `REPORT.md:146-152`). Neither has a PLAN line (Part 4).

**Verdict: in the spirit.**

### Rung P, `3ba2d005f`

**What landed.** The POPL 2019 examples as tests, 15 walk and 12 compiled programs (`RECORD.md:177`); walk's power in a size with its refusals (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:475-484`); the No Duplicates Rule on the non-strict relation (`Specification/advanced/overloading.tex:548-549`, callout `:561-569`) and its entry; the two sentences on walk's power corrected; the skeptic's `future.tex:259-261` and row 707's expected failure.

**Standard 1.** The grammar's `IntExpr ^ IntVal` (`concrete-syntax.tex:546`), `constant.tex:26-29` and the kinds (`trait-parameters.tex:98-105`); both papers' rule (`Papers/Types/rules.tick:158-162`; POPL 2019 Fig. 5).

**Standard 2.** `Int.powExact`'s loop (`interpreter/glue/prim/Int.java:369-383`), with `Naming.sizeOp`'s values. The checker's own `equiv` duplicate check (`OverloadingChecker.scala:439-446`).

**Standard 3.**
- P-26 governs the restatement. Row 676's named repair is built; the negative exponent is refused, as the section says (`CLIMB-BATCH-14.md:227`), and put to him for sight (P.worker.2, `PLAN.md:748`). R4 is filed as row 706; rows 444 and 697 have no room for a note (P.worker.1, `PLAN.md:747`).
- The skeptic's correction of `Specification/appendices/future.tex`, a file outside the section's list (`RECORD.md:222`), has no PLAN line.
- The paths differ where the class loader stops with `NumberFormatException` and walk refuses with a message: row 675's family (`REPORT.md:200`).

**Verdict: in the spirit.**

### Rung W, `f9fe5c874`

**What landed.** Row 668 (`Library/Random.fss:179-182`, `:345`; api `Random.fsi:163`, `:165`, `:242`); row 669 (`Library/QuickCheck.fss:82`, its api line `QuickCheck.fsi:60` no longer `abstract`); `Constructor.definedBelow` and `coverParts` (`interpreter/evaluator/values/Constructor.java:479-570`) with three modifiers in `OverloadedFunction.java`; the traits chapter's sentence (`traits.tex:627-648` on main) and `revival-covering` amended (`changes.tex:2749`); the skeptic's rows 708 and 709, each with its expected failure.

**Standard 1.** The functions chapter's "together cover" (`functions.tex:431-434`) and Welterweight's Covered rule (`Papers/Welterweight/static.tick:27-47`). The objects chapter is read through the box, as the section allowed.

**Standard 2.** `overlapCoveredBy`'s shape, with `someBelow` and the two bounds shared by access. `coverParts` is a new splitter, not a copy, since `overlapPieces` never splits a type into its listed types (`OverloadedFunction.java:1028-1035`; `SKEPTIC.md:15`), so the section's "sharing its helpers ..., not by a copy" (`CLIMB-BATCH-14.md:261`) holds. Each library repair follows a line of its own file (`REPORT.md:206-210`).

**Standard 3.**
- P-147 built after rows 668 and 669, each test first. No library type, team test, demo or specification example is newly refused or accepted: a logging build over the suite, the 62 demos and 32 examples (`REPORT.md:136-161`), and the skeptic's 46 apis (`SKEPTIC.md:48`).
- An unsettled search accepts: the worker's decision 2, with row 708, routed as W.skeptic.1 (`PLAN.md:749`). Row 665's half left out, as the record asks.
- **Not yet before him:** the record's "Team declarations that W's library repairs change" (`CLIMB-BATCH-14.md:95`). No PLAN line (Part 4).

**Verdict: in the spirit.**

### The global questions

- **What the record promised, against what landed:** S 29 sites; A rows 455 and 535; L 2 sites with `body(i)` held; P the tests and rows 676 and 696; W rows 666, 668 and 669. The distance is 54 and the count 1. All held.
- **The record's premises:** all held, the by-reading ones too (walk's refusal of `body(i)`, the 2 and 29 sites, no move from A, P and W). One premise of the workflow failed, the count stage's "20 s" (finding 3).
- **Built twice:** no. No two rungs change one declaration (the merged-diff review's check 1, in its journal result).
- **The library's way:** yes, in L and W, each body with its precedent. The extensions in this batch (L's four api lines; W's proxy lines and `AnyGen`'s line) have not reached him as such.
- **What they do together:**
  - S's disambiguator and W's check meet in the interpreter suite: 604 green, and the integer types load once L removed `numerator`'s default (the review's check 1).
  - A and S edit different checker files.
  - Every rung's out-of-section file is listed among the points (`RECORD.md:211-234`), unlike batch 13's N.

### Findings

Ranked by what they cost or risk next. Each gives its home.

1. **Points the record listed for him, and reserved points, without a PLAN line:**
   - three record points: L's `numerator` extension, W's team declarations, the two pins;
   - two reserved points: A's normative paragraph and P's skeptic's `future.tex`;
   - one change named only as walk's: A's multifix choice;
   - S's three readings.

   Home: the coordinator's routing, one entry under "Climb batch 14, listed for his review" (Part 4). This is batch 12's measure 3, partly met in batch 13, unmet again.
2. **Four new rows without a PLAN line:** 706, 707, 709, 710 (Part 4). This is batch 12's measure 2, unbuilt for the fifth batch running.
3. **The count stage's "20 s"** in the worker's brief (`coordinator/climb-batch-workflow.js:763`) and the manual (`climb-batch-workflow.md:226`) has been false since 13b's 387 s.
   - Rung A's foreground call ran past the Bash tool's 300 s limit and moved to the background (transcript `a5bef13a`, 02:58:56).
   - Rung W cut its first run with `timeout 280` (EXIT=124, `a2a8a051` 02:14:37), killed its JVM and ran again detached (02:19:28) (`rung-walk-coverage/REPORT.md:170`).
   - The brief's "13 to 24 minutes" for the distance read 26 to 29 minutes in every run.

   Home: the script and manual, before batch 15. It is batch 13's miss 451 (V's 600 s wait) again, at a smaller cost.
4. **Answered or built items still open in PLAN**, and its "Where we stand" a batch old (Part 4). Home: the coordinator's routing.
5. **The ledger's routes:** row 425's claim is half false with no command to edit it (review.1). 12 notes were refused (gather.2), the fourth batch running. Home: his word on the tool (P.worker.1's entry).
6. **`batch-measures.py`'s builds per worker undercount.** Its `BUILD_SEG` needs the segment to start with `ant`, and the workers now build as the skill says, `nohup bash -c '( ant compileAll ) > log ...'`. It reads 0 for batch 14's workers and 2 for batch 13's, where the transcripts show 6 and about 11. Home: the tool.
7. **One skill sentence is narrower than the text** (Part 3). Home: the skill writer.

## Part 2. Did the practice hold

### The skeptics' 19 fixes

From the journal's `fixes`, each `SKEPTIC.md`, and the transcripts for test first.

| Rung | Fixes | Defects | Contested | Test first |
|---|---|---|---|---|
| L | `9b377a5a1` (the report from the journal), `79fb25581`, `6f3b9db5f`, `2f32617db` | 0 | none | `IntMapSymdiffManyEntry` red through the base build's harness (`SKEPTIC.md:72-77`) |
| A | `273f8e5b3`, `641ccf235`, `07f8b31bc`, `1ef4ad330` | 1 | none | `InferCallArgumentWrittenStaticArgs` red on the head at 04:15:29, first edit at 04:15:42 (`a026ca7a`; `SKEPTIC.md:75-87`) |
| P | `a5c12ab57` (two findings), `1f9942c85` | 0 | none | `XXXNoDuplicatesRuleSelfPositions` an expected failure on the old code, red on a deliberate fix (`SKEPTIC.md:101-103`) |
| W | `9897bcd53`, `dcf284277`, `323a852af` | 0 | none | `XXXAbstractMethodCoverUnsettledWalk` red at four parameters (`SKEPTIC.md:56-69`) |
| S | `9a2cc93af`, `207eb7f06`, `63e507ba4`, `37f02419d`, `302aee6d6` | 1 | none | `SelfTypeMixinChain` red on the worker's code at 03:32:15, first edit at 03:32:47 (`ac8c8110`; `SKEPTIC.md:50-56`) |

Every fix is sound and inside its rung, and the review read both defect fixes in their makers' transcripts (the journal's `fixesChecked`).

**The narrowed rule worked.** Since `a1902d0d4` (2026-10-09; `climb-batch-workflow.js:940`), a fix whose settling sentence the skeptic cites is not contested for reaching a point or a path outside the section. Three fixes this batch touched such a path:
- A's `07f8b31bc` (`reductions.tex`);
- P's `1f9942c85` (`future.tex`);
- W's `323a852af` (`compiler_tests/`).

Each cited its sentence, went into `pointsReached`, and none was contested. Batch 13 spent 0.455M on three rulings, each brought at least in part by that clause; this batch spent nothing. The narrowing was his "Option 1, narrow the rule" (POSITIONS, "The judge's rulings.").

### Workers, test first

Each worker's tests failed through the harness on the base's code before its first edit of source, as its skeptic read the transcript:
- **S**: failed 01:00:07-13, the patch applied 01:00:30 (`rung-self-type/SKEPTIC.md:12`).
- **A**: failed 02:53:18-28, the patch at 02:54:39, its build at 02:55:57 (`rung-argument-context/SKEPTIC.md:20-23`).
- **L**: failed 00:57:29. The first library edit, at 00:57:51, was the `body(i)` probe the section puts first, and the repairs began at 00:59:33 (`rung-library-followups/SKEPTIC.md:28`).
- **P**: failed 02:16:25, 02:20:29 and 02:22:34-45, the edit saved at 02:24:38 (`rung-popl-examples/SKEPTIC.md:14-18`).
- **W**: failed 01:47:03 and 01:48:06, the library edit at 01:49:40, the Java edit at 01:53:03 (`rung-walk-coverage/SKEPTIC.md:10-12`).

Two tests were written after an edit, for effects the edit revealed, and each was red on the old code through the harness: A's `InferBigOperatorExpectedType` (`REPORT.md:55-60`) and W's `MersenneTwister` assertion (`068a183e6`, `REPORT.md:74-76`). No miss, as in batches 11 to 13.

### The briefing in each agent's first turn

- **In the first turn: 0 of 10 agents with a briefing command, against 0 of 15 in batch 13.** Every agent's first turn is one call, the skill's load, which the brief puts first; the worker's brief then orders the worktree (step 1), then the briefing (step 2).
- **Run at all: 10 of 10, at calls 9 to 11** (workers S 9, W 9, L 10, P 10, A 11; skeptics P 9, W 10, A 10, L 11, S 11), **against batch 13's 15 of 15 at calls 2 to 17** (workers and skeptics 8 to 17, judges 2 to 3). Before it, each read four to six skill parts, then seeded its worktree (workers) or wrote its worker's report from the journal (skeptics).
- **Every part read.** Each worker wrote its briefing to files and read every part in about 30 s: S, A and P four, W three, L two (transcripts 00:53:28-56, 02:48:58-02:49:18, 02:10:26-38, 01:40:55-01:41:08, 00:53:24-33); the skeptics read theirs inline.
- **For P-109's figure**, the share that read it at the start of their work is 100% in both batches; the first-turn figure is 0 by the brief's order, not by neglect.

### Builds and runs, repeated or not

From the transcripts' Bash calls:
- **Workers:** S and A one build each; L none; P and W two each. W's two builds and two `testSystem` runs were two code states (the logging probe, then the final code). Each suite and stage ran once per code state; P ran no stage, rightly (`STAGE_BLIND`).
- **Repeats:** W's count, cut at 280 s (finding 3); P's first build, empty because the edit before it was refused for a file not read (`a8e04fcc` 02:24:13, 02:24:16; `SKEPTIC.md:15`); the gather's first harness run without the `.test` files (`RECORD.md:43`).
- **Skeptics:** S built once and A twice, on two states; L, P and W built nothing, their fixes changing no code. None ran a stage after its fix, as the brief says. Skeptic S built the PDF three times, after three rounds of text edits (`ac8c8110` 03:24:18, 03:25:52, 03:30:02).

### Refusals by the harness and the tools

- **All five workers' writes of `REPORT.md` were refused**, "Subagents should return findings as text" (S 02:05:24, L 01:36:45, W 02:32:48, P 02:43:57, A 03:21:45); the skeptics wrote each from the journal, as in batches 11 to 13.
- **Three `sleep N; ...` calls blocked**, against `session.md:17` (worker W 02:23:24, skeptic S 03:36:56, skeptic P 03:43:47); six `Edit` calls refused for a file not read; one `rm` stopped by the safety check (S 01:47:45). None cost a refill.

### The practice's measures, batches 11 to 14

| Measure | B11 | B12 | B13 | B14 |
|---|---|---|---|---|
| Written | 5.03M | 5.43M | 7.22M | 4.82M |
| Rungs, agents | 4, 14 | 5, 17 | 5, 20 | 5, 14 |
| Per rung, all roles | 1.26M | 1.09M | 1.44M | 0.96M |
| First calls | 0.62M | 0.72M | 0.89M | 0.60M |
| Refusal cycles | 2.7% | 5.4% | 6.3% | 0 |
| Skeptic fixes (defects) | 19 (3) | 15 (2) | 23 (4) | 19 (2) |
| Rulings, repairs | 1, 0 | 2, 0 | 3, 0 | 0, 0 |
| Distance, sites gone net | 46 | 54 | 48 | 31 |

### Batch 13's measures, a batch later

1. **Clause (c) narrowed:** built (`a1902d0d4`). There were no rulings, and three out-of-section fixes were settled.
2. **A record names the fallback of a default it builds:** met. L's section held `body(i)` by a rule written in advance (`CLIMB-BATCH-14.md:188`), and L used it.
3. **Every rung file outside its section listed:** met (`RECORD.md:211-234`).
4. **Batch 12's measures 2 to 4:**
   - a PLAN line per opened row: not met, 4 of 8;
   - the reserved points as items: not met (finding 1);
   - the cold read's items: moot, the cold read is gone.
5. **The count stage's limit:** not reached (303 s on L's tree, under 5 minutes in the gate, against 900 s).

Batch 11's finding 8 stands too: `# machine FORTRESS_THREADS=1` in `summary.txt:69`.

### Misses, by kind

Numbered on from `batch-13-review.md`'s 452. "Found by" names the first to catch it.

Found inside the batch:
- **The change wrong:** 453, S's widened reading resolved another api's raw header in the importer's names (skeptic S); 454, A's retry left a written-argument call out of the enclosing instantiation (skeptic A).
- **A new rule's effect elsewhere:** 455, A's multifix choice in an accepted program (skeptic A); 456, A's reach into row 425 (worker A); 457, L's repair reaching two many-entry maps (skeptic L); 458, `MersenneTwister`'s `perturbed` stopping walk too (worker W); 459, rule (b) refusing the trips demo and `PureList` (worker S); 460, row 695 only at an object-typed parameter (skeptic S).
- **Text claiming more than the paths do:** 461, A's "never passed over" (skeptic A); 462, P's Effect on duplicates and `future.tex` (skeptic P); 463, S's text narrower than its checker (skeptic S); 464, W's citation (skeptic W); 465, rows 665 and 695 left with false notes, and the gather's dropped precedent (the review, `cf40fd6a1`).
- **The team's code, found by the rungs' probes:** 466, rows 703 to 710: workers 703 (L), 705 (A), 706 (P), 710 (S); skeptics 704 (L), 707 (P), 708 and 709 (W).
- **Process:** 467, five report writes refused (the skeptics, by the script's step); 468, `ledger.py`'s 12 refusals (the gather); 469, the count stage's 20 s (workers A and W).

Found by this review: 470, the record's and the reserved points without a PLAN line (finding 1); 471, rows 706, 707, 709 and 710 without one; 472, S's three readings in normative text, unseen; 473, the script's and manual's "20 s" and "13 to 24 minutes"; 474, `batch-measures.py`'s build count; 475, the skill's self-type entry narrower than the text (Part 3); 476, PLAN's stale lines (Part 4).

**Against the earlier notes.** 17 found inside the batch (453 to 469), 3.4 a rung, against batch 13's 9 a rung, with no restart and no ruling. By kind, the skeptics found most: both defects and four of the five text corrections. No test-first miss. Landed: no wrong value known. The known costs are rows and listed points.

## Part 3. Skill sentences the batch made false

At the landing, `7c2c7cd4b`, the rungs' reports listed five, each copied for the skill writer (`RECORD.md:304`, `:345`). The standing writer rewrote all five in `01ff2e099` (05:40 UTC), before this review:

| File:line at `7c2c7cd4b` | The sentence | Made false by | On main |
|---|---|---|---|
| `.claude/skills/fortress-repo/references/revival-changes.md:114` | "Walk computes a sum, a difference and a product, and stops on a power (ledger row 676)." | P | rewritten: walk computes a power exactly and refuses a negative exponent |
| `references/interpreter.md:42` | "... provides no declaration with a body of its name at or below its parameter types." | W | rewritten: bodies that together cover; an unsettled search does not refuse |
| `references/interpreter.md:52` | "leaves an inherited abstract method without a body at or below its parameter types" | W | rewritten: "that no bodies cover" |
| `references/revival-changes.md:66` | "A declaration with a body of the method's name, whose parameter types are the abstract declaration's or below them, counts as defining the abstract method (ledger row 666). ... (ledger rows 668 and 669)." | W | rewritten: coverage, rows 708 and 709 |
| `references/revival-changes.md:67` | the Reason's sentences on `Pairs`, `QuickCheck` and `MersenneTwisterInit` needing the allowance | W | rewritten: the rule of 2012 |

I searched `.claude/skills/` at `7c2c7cd4b` for every rule the batch moved: the self type; the argument context; rows 425, 455, 666 to 669, 671, 676 and 696; the No Duplicates Rule; `numerator`; `SYMDIFF`. I found no other false sentence. `library.md:25` on `SUM` (row 425) stays true, since `SUM` is F-bounded and the retry leaves it refused.

On main at `01ff2e099` none of the five is false. One sentence of the writer's new text says less than the specification:
- `references/revival-changes.md:84`, "`self` in a self-typed trait", Resolution: "a static parameter `X` of a trait `T` with no `comprises` clause".
- The text and the checker also give a self-type parameter to a trait whose clause lists only `...` (`var-ref.tex:70`, `traits.tex:285-286`; `SelfParamDisambiguator.scala:77-82`).
- It came from S's own revival change, written before its skeptic's correction (`RECORD.md:352`).

Outside the skill, two sentences that briefs carry are false: the count stage's "(20 s)" (`climb-batch-workflow.js:763`; manual `:226`) and the distance's "13 to 24 minutes" (`:763`) (finding 3).

## Part 4. Routing

Checked against main at `01ff2e099`, where PLAN and the ledger are as at `cf40fd6a1`. The coordinator's routing (`climb-batch-workflow.md:268-282`; `CLIMB-BATCH-14.md:459`) is next, after this review (`0329be3d9`).

### The items on file

- **Item 53**, under "Pavol's answers" (`PLAN.md:305-307`), and **14 entries** under "Climb batch 14, listed for his review" (`:737-754`).
- The gather's `curatorUnrouted` is empty; I found each of the rungs', the gather's and the review's ids at the entry the gather names (`RECORD.md:236-258`).
- Each entry states a default, but two:
  - item 53, "No default on record beyond the held line";
  - review.2, "No default on record".

  Each has a natural default, the line held and "the next rung that edits `revival-dispatch` names row 706", under a preamble that says "the default is what landed" (`:739`). This is batch 12's finding 4, a third time.

### What the record listed for him, and PLAN lacks

- **`numerator` on `ZZ32`, `ZZ64`, `NN64` and `NN32`**, four api lines, "an extension for you to judge" with `ZZ`'s line (`CLIMB-BATCH-14.md:87`): no entry.
- **The pins changed** (`:88-90`): `IntMapSymdiffSingleton.fss:12-13`, and `XXXInferLoneUnionClosedTrait` turned plain. The latter is named only in gather.2, as a renamed reproducer (`PLAN.md:700`).
- **The team declarations W changed** (`:95`): `SeededRandomGenWithDistribution`'s `seedSize` and `reseed` with their api lines (`Random.fsi:163`, `:165`), `MersenneTwisterInit`'s `perturbed` (`:242`), `AnyGen`'s `perturb` (`QuickCheck.fsi:60`): no entry.
- **Reserved points reached, with no entry:**
  - A's paragraph `inference.tex:191-222` (`RECORD.md:212`);
  - P's skeptic's `future.tex:259-261` (`:222`);
  - A's multifix choice as a compiled change (`:216`; only as walk's side at `PLAN.md:745`);
  - S's three readings (Part 1).
- **Proposed:** one entry, "Extensions, pins and text of climb batch 14", the default as landed.

### New rows

Rows 703 to 710 (`RECORD.md:58-67`):
- **With a line:** 703 (`PLAN.md:307`, `:741`), 704 (`:742`), 705 (`:745`), 708 (`:749`).
- **Cited but not routed:** 706, only as the row a box should name (review.2, `:753`); 710, only as "stays refused" (`:751`).
- **No line:** 707 and 709.

The line each needs:
- 706, walk's return-only type parameter at its bound: beside row 699, with phase 5's dispatcher (row 538).
- 707, the checker's duplicate check at one self position, the code generator stopping: the next checker rung on overloading.
- 709, the checker's cover of two parameters through combinations: the next checker rung on `AbstractMethodChecker`, beside row 563.
- 710, the trips demo refused by rule (b): no repair in the team's demo, or a demo edit. That is his to say, as for row 670's demos.

### Answered or built items still open in PLAN

- **"Where we stand"** (`PLAN.md:10-13`): the count and distance are 13b's, "Next" names batch 14.
- **Item 12** (`:133-140`): "Batch 14, its record not yet drafted ... none chosen yet". It landed.
- **Item 11's lines**, built and not marked: row 671 (`:123`, `604d0e23c`), row 676 (`:124`, `3ba2d005f`), row 696 and the POPL test rung (`:131-132`, `3ba2d005f`), row 695's reproducer (`:130`).
- **Item 10's lines** for rows 665, 668 and 669 (`:120-121`): fixed or narrowed by W.
- **Row 455's mentions** at rows 644 and 660 (`:115`, `:119`): fixed by `0856f3e6a`.
- **Item 48** (`:291`): its part (b) is "a checker rung among batch 14's candidates". It was built by `0856f3e6a`.
- **Item 51** (`:299`): answered as P-147 and built by `f9fe5c874`. Its "Default: as landed, walk's allowance" no longer holds.
- **The review queue's item 1:** "Answered 2026-10-13, way 6 (P-146)" (`review-queue.md:16`), and now built by `1c32ccffd`.

### Notes not written

12 of 23 (gather.2, `RECORD.md:144-160`); the review wrote short notes on rows 665 and 695; row 425's claim stays half false (review.1, `PLAN.md:700`). Home: the tool's routes (P.worker.1).

## What I did not do

- I built nothing and ran no Fortress program, suite or stage. I ran read-only scripts over the transcripts, the journal and git, and `ledger.py show`.
- I took the 4.82M total from the coordinator's `spend.py`. `batch-measures.py` and my per-agent script agree with it.
- The site-by-site count maps lines through the batch's diff. Two sites on changed lines (`:688`, `:2525`) count as gone, and the stage confirms both.
- The transcripts keep no reasoning, so Part 2 reads what agents ran and when.
- I did not judge the new specification passages line by line beyond the skeptics', the review's and the gather's checks.
- The INDEX line for this note is the coordinator's.

## For Pavol

In the order they need you, each with its default:

1. **Item 53, `body(i)`, the count's next move.** It waits on review-queue item 17, or on a measured library-only form. Default: the line stays held; no default on record.
2. **The mixin default under P-146 (S.worker.1).** The team's `Containment` mixins check clean under it. Default: as built.
3. **Rung S's three readings, now in the text.** A trait whose `comprises` clause lists only `...` counts as having none. Rule (b) checks a trait's `self` type. The term "self-type parameter". Default: as built.
4. **`numerator` declared on each integer type**, four api lines, an extension for you to judge. Default: as landed.
5. **Rung W's changes to team declarations** in `Random` and `QuickCheck`, with their api lines. Default: as landed.
6. **Rung A's retry reaches a reduction's big operator** (row 425's half). Default: as built.
7. **Rung A's forks 2, 4 and 5**, with its skeptic's fix for written static arguments. Default: as built.
8. **Rung A changes a compiled program you could run before.** Three chained `OPLUS` operands now run the multifix declaration, not the binary one. Rung A also added a new paragraph, `inference.tex:191-222`. Default: as built.
9. **Walk gives an argument no expected type** (row 705). Default: the expected failure.
10. **The argument context for a call without static arguments.** Default: as P-51 says, not reached.
11. **Walk accepts where its coverage search does not settle** (row 708). Default: as built.
12. **A size's power at a negative exponent is refused** under walk; the compiled path computes none. For your sight; as built.
13. **Row 703 against review-queue item 17.** Default: the row as filed.
14. **Row 704, `IntMap`'s `UPLUS` with a one-entry map.** Default: today's value, pinned.
15. **The element types of `Random`'s two proxies.** Default: no row until measured.
16. **Two revival test pins changed** (`IntMapSymdiffSingleton`, `InferLoneUnionClosedTrait`). Default: as landed.
17. **The ledger tool has no route for a reproducer cell, a long note or an open row's claim** (P.worker.1, gather.2, review.1: row 425's claim half false). Default: the coordinator's hand edit.
18. **The script's retired handover** (gather.1); row 706 named in the dispatch text (review.2); the test owed for row 695 (review-routed.1). Default: the coordinator and the next rungs.

Information:
- Distance 85 to 54 and the count 1, as the record said, to the site. Cost 4.82M, 14 agents, 4 h 43 (the record said about 5.9M and 6 hours; batch 13 cost 7.22M).
- No fix was contested and no judge ran: your narrowed rule settled three fixes that would have gone to a judge in batch 13.
- All 10 briefed agents ran the briefing as their brief's second step, none in their first turn, as in batch 13. The five skill sentences the batch made false are already rewritten.
