<!-- The landing review of climb batch 17 (rungs L, A, G, W and C; run `wf_3d858dc3-530`), read-only, by an Opus reviewer at the coordinator's go on 2026-10-17: landed with findings; one blocking, walk's quietly wrong instances for a trait's generic dotted method (row 766). Its text as the reviewer returned it, the routing of its findings in `coordinator/PLAN.md`, `POSITIONS.md`, `FACTS.md` and the ledger. -->

# Landing review of climb batch 17

**Verdict: landed with findings.** All five rungs landed and `main` is pushed at `65c0cc463`. The gate is green. The distance fell from 49 to 35 and the count from 39 to 31, exactly the record's reading. Nothing has to be undone. One item counts as blocking under the coordinator's criterion (finding 1). The rest are wording, test-key and routing fixes for the next batch and the coordinator.

The reviewer only read files. No build, no JVM, no edit. The only things it ran were `git`, `grep`, the extract tool, and `batch-measures.py` plus a small read-only Python script over the run's transcripts.

The manual has no section titled "The landing". The reviewer read its "Commit, and the push held" and "After the landing: the coordinator's routing", and the `coordinator` skill's `batch.md`, "The landing".

## Findings, most important first

**1. Blocking: walk now gives quietly wrong instances for a generic dotted method that a trait declares (row 766), against P-46, P-74 and P-48.**
- Rung W's skeptic measured these values:
  - `Maker.wrap(z, w)` on a `ZZ32` and a `ZZ64` gives `Box[\AnyIntegral\]`, and the `ZZ32` is not converted.
  - Beside an overload, the same call gives `[3:ZZ32,4:ZZ64]`.
  - `make[\T extends Number\]()` gives `Empty[\BOTTOM\]`.
  - The compiled path gives `Box[\ZZ64\]` and converts the argument.
  - Evidence: `explorations/compile-ladder/rung-walk-method-sargs/SKEPTIC.md` sections 3.2 and 6.
- On the base, these calls stopped loudly. Now they return a value.
- The decisions and the text say otherwise:
  - P-46: "Both paths infer static arguments with coercion and the same promotion".
  - P-74: the narrowest type both sides coerce into.
  - P-48: "never `Bottom`".
  - `explorations/coordinator/POSITIONS.md` lines 45, 78, 47; `Specification/basic/inference.tex` lines 84-86 and 104.
- What is recorded: row 766, the expected failure `ProjectFortress/tests/XXXTraitGenericMethodInference.fss`, and sentences in both walk boxes and in Appendix I.
- What is missing: no item for the curator. W's worker and skeptic returned no `forCurator`, and PLAN has no line for row 766.
- The likely repair is in `EvaluatorBase.java` (lines 557 and 633-634, which read bounds in the trait's member environment). W's brief put that file off limits (`explorations/coordinator/CLIMB-BATCH-17.md` line 122).
- The merged-diff review did not raise it.
- Route it to the curator, or put it first in batch 18.

**2. The gather put rung L's commit before rung W's, against the letter of item 57's way (a).**
- The curator's word: "the library change waits for it", that is, "fix row 21 in walk first" (`CLIMB-BATCH-17.md` line 70).
- On pushed `main`, `2b1cd8e63` (L) comes before `743eb5286` (W). So `2b1cd8e63` alone fails `LibraryOverloadFamilies.fss:37`, and a bisect that stops there sees a red tree (`explorations/compile-ladder/climb-batch-17/RECORD.md` line 20; gather.4).
- Cause: the order rule compares line numbers across different files and ignores `landsOnlyWith`. L and W share no file, yet the rule ordered them.
- It cannot be undone without rewriting pushed history.
- Missing fix: `explorations/coordinator/climb-batch-workflow.md`, "Gather", "The order", should put a rung after the rungs it lands only with. PLAN has no line for this.

**3. Walk refuses a generic pair with a message that names the rule P-45 removed, and two new tests are keyed on that message.**
- After G, a pair refused on its declared domains (the Return Type Rule or the Meet Rule) still gets "with generic type, at least one pair of parameters must have excluding types" (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java` lines 542 and 582).
- P-45 says no parameter pair is required to exclude.
- `ProjectFortress/tests/GenericReturnRuleInvariantWalk.test` and `GenericReturnRuleOuterParamWalk.test` key on it. The base refused both programs with the same message, so both tests pass on the base code too.
- Next walk rung: a message that names the rule that failed, as the checker does, and the tests rekeyed to it.

**4. Row 759 is named nowhere in the specification, and an Appendix I Effect claims more than holds.**
- The Effect of "Overloading with static parameters" says the compiled checker refuses two declarations whose parameter types, read over their instances, are each a subtype of the other (`Specification/appendices/changes.tex` lines 2701-2705).
- Row 759 shows the checker accepts `g[\T\](a: T)` beside `g(a: Any)`, which walk now refuses.
- No `row~759` appears anywhere in `Specification/`. This is the same kind of gap as the review's finding 2 on row 765, and the review missed it.
- It is also a new pair on which walk and the checker disagree, against P-45's "so that walk and the checker accept the same pairs". Walk follows the text; the checker's half is open.
- The fix is text only.

**5. P-45's "Built" claims more than rung G built.**
- The gather marked it "Built: walk's load check over every pair, by climb batch 17's rung G" (`POSITIONS.md` line 44).
- G built the check for pairs of functions with static parameters. Still not built:
  - a functional method of a generic trait or object is still compared on its instance (F-26, F-252);
  - the Meet Rule search is limited (row 539);
  - rows 740 and 741 wait on P-152.
- The entry should say so.

**6. Rung A: P-151's "the rest of `AnyList` moves into `List`" was built in another form than the record says.**
- Nothing moved into `List`. `addLeft` and `addRight` stay on `AnyList` as `singleton(e) || self` and `self || singleton(e)`. `||` stays `app(self, f)` and passes through the opening (`Library/List.fss` lines 87-90).
- The probe moved only `||`'s double dispatch into `List`. The live clause made that step unnecessary (`explorations/perf-probes/where-clauses/REPORT.md` A.2.2).
- The aim is met: the four sites are gone with the team's clause live.
- But rung A's title, the record's call 4 and F-243 all say "moved into List". P-151 should record what was built.

**7. Minor.**
- The team's comment "a hack to avoid the error of overloaded methods" now sits above the team's real generic `distribute` (`Library/FortressLibrary.fss` line 3232). It was left on purpose, because a comment edit moves spans. It belongs to the next library rung.
- `ownGeneric`'s comment is half false. It is already routed (judge-review.2).
- `ProjectFortress/tests/XXXExpectedTypeFixRungT.fss` line 1 is still a record pointer. W edited the file and left it, against `tests-writing.md`, "Names, comments, citations".

## 1. Conformance, rung by rung

**L (`2b1cd8e63`): in the spirit.**
- The generic `distribute` over its own `K` is item 56's default, read from Emoto's comment (`Library/Generator2.fss` line 172). `leftDistribute` and `rightDistribute` take the same `K`, the batch's default.
- The method condition reads as a bound, as `Specification/basic/trait-parameters.tex` line 333 reads a constraint. Code: `KindEnv.scala` `constraintBounds`, and the fold in `STypesUtil.scala`.
- The team's where calculus checks bounds at a dotted call (`Specification/appendices/calculi/where/static.tex`, T-Invk). Rung L leaves that check out (row 748, the record's call 1).
- The identities fall back by `cast`, as P-151 and PLAN say.
- `embiggen` answers `BigReduction` over `MapReduceReduction`. That is the type the team's demos already declare for it, and the shape of the team's `BIG MINNUM` (P-27).
- Row 749 refuses valid calls (L.worker.1, listed).

**A (`24db899fa`): in the spirit, with finding 6.**
- The team's clause is live and opened the way a size is (F-146). The Amin and Tate shape is refused.
- New departures, all recorded and listed, none settled by a decision: rows 751, 752, 753, 754, 755, 756 and 771.

**G (`6d187d069`): conforms to P-45 for functions.**
- Pairs are read on their declared domains by the No Duplicates, Return Type and Meet Rules.
- The specification's `ident` pair now loads (`Specification/advanced/overloading.tex` lines 608-614).
- The team's `XXXGenericOverload` ("Should not compile") now loads. P-45 takes the type group's 2011 model, which reads that set as valid (G.skeptic.1, listed).
- Rows 740 and 741 are left alone, as P-152 asks.
- See findings 3, 4 and 5.

**W (`743eb5286`): in the spirit for objects' own and inherited generic methods.**
- It follows `inference.tex` lines 47-75 and P-45's declared domains.
- The declared-domain comparison is partial: it applies only where exactly one domain lies inside the other. The box says so since the repair.
- See finding 1.

**C (`091ec54df`): in the spirit.**
- 737 follows `Specification/basic/components/type-inference.tex` line 29. Its rule is narrower than "corresponding" (C.skeptic.3, listed).
- 739 follows P-149's reasons, with the `implemented` filter. The guard held: the first version refused `QQ.numerator`, and it was repaired in the checker, not the library.
- 738 changes a message word.
- 681 follows the identity of types.

**P-148: kept by all three checker rungs.** Each timed the count stage on the base and on the change, took a JFR profile, found under 0.34 % of samples in its declarations, and made no edit, which `compiler.md` step 3 allows.

| Rung | Base | Change | Pass | Skeptic (base / head) |
|---|---|---|---|---|
| L | 71 s | 82 s | 80 s | 77 s / 78 s |
| A | 76 s | 93 s | none | 73 s / 73 s |
| C | 74 s | 81 s | none | 77 s / 85 s |

At the gate the count stage took 76 s (82 s at batch 16) and the distance stage 180 s (217 s).

**PLAN items 56 to 59.**
- 56: built at its default and the further default.
- 57: built at way (a), apart from the commit order (finding 2).
- 58 and 59: left out, as the record decided.

## 2. The distance and the count

After the batch: **distance 35, count 31** (`#locations` 30). See `explorations/compile-ladder/climb-batch-17/gate/distance.txt` and `checker-count.txt`, against batch 16's 49 and 39.

**Left (14), from a diff of `explorations/compile-ladder/gate/distance-sites.tsv` at `f98ad813f` and at `65c0cc463`:**
- Row 433 (L), 6 sites:
  - two return-type errors, `:3233` against `:3421` and against `:3423`;
  - four wellformed errors, `:3421` to `:3424`.
- Row 436 (L), 2: `:3367` and `:3384`.
- Row 631 (L), 1: `:3715`.
- Row 636 (A), 4: `List.fss:88`, `:89`, `:90` and `:179`.
- Row 737 (C), 1: `FortressLibrary.fss:130`.

**Came: none.** Seven sites only moved, with the same message once the line numbers are masked:
- FortressLibrary `:4372`, `:4378`, `:4397`, `:4398`, `:4544` and `:4560` moved 3 lines up;
- `List.fss:146` moved to `:140`.

**By kind:** return-type 2 to 0, wellformed 4 to 0, typecheck 40 to 32, export 3 to 3. **By unit:** FortressLibrary 43 to 33, List 5 to 1, FlatString 1 to 1.

**The count's 8 that left** are the FortressLibrary typecheck and wellformed sites above: row 433's four wellformed, `:3367`, `:3384`, `:3715` and `:130`. Row 433's two return-type sites were never in the count.

**On their own trees:** L 40 and 32, A 45 and 39, C 48 and 38. The three moves add up here.

**The rest of the gate against batch 16** (`explorations/compile-ladder/climb-batch-17/gate/summary.txt`):
- compiler track 1,224 to 1,251 (24 new `.test` files with 29 commands, less 2 for the two promoted ones);
- `testSystem` 629 to 649 (batch 16's repair test plus 19 new walk files);
- specdata 130, library 86, other-compiler 263, misc unchanged;
- 42 of 42 atomic runs PASS; no ladder move;
- microGPT's quick walk check 7 of 7 in both programs, 47 s and 40 s (65 s and 58 s at batch 16).

## 3. Walk tests the batch added or promoted

**Promoted (5); each checks what its name says:**
- `MethodStaticArgInference`;
- `DispatchRenamedGenericArmWalk` and `DispatchSwappedGenericArmWalk`;
- `GenericBesideGenericSameDomain` and `GenericBesidePlainSameDomain`, keyed on the No Duplicates message.

**New plain tests (12):**
- These check what their names say: `MethodStaticArgDeclaredDomain`, `MethodStaticArgInheritedGeneric`, `MethodStaticArgOverloadedReceiver`, `OpenTypeWalk`, `GenericPairNestedBoundsWalk`, `GenericReturnRuleHoldsWalk` and `GenericMethodBesideConditionedMethodWalk` (a load guard).
- `AnyListElementTypeWalk` passes on the base too. That is its purpose: it guards that walk's element types do not change.
- `NestedReductionFusion` is green before and after. That it would fail with L but no W rests on the probe's run; nobody saw it fail in this batch.
- `ProjectFortress/tests/MethodStaticArgCases.fss` line 63 (`Numbers.num(z)`, "with a library bound") passes whatever `N` is instantiated to. It checks only that the call runs, and it passes while row 766 holds. Line 62 likewise checks only that the call runs.
- **Pass for another reason:** `GenericReturnRuleInvariantWalk` and `GenericReturnRuleOuterParamWalk` (finding 3). They pass on any refusal of the pair, the base's included.

**New expected failures (7):** `XXXBoolStaticArgMethod` (761), `XXXTraitBoundGenericMethod` (762), `XXXInheritedGenericFunctionalMethodBesidePlain` (765), `XXXTraitGenericMethodInference` (766), `XXXNatArithInferFromSumWalk` (767), `XXXComprisesWhereBoundExtender` (754, keyed) and `XXXWhereVariableMemberWalk` (755).
- Each but 754 has no `.test` key, so any failure keeps it green.
- The skeptic showed 766 red with the defect removed.

**Team tests whose reason changed:**
- `ProjectFortress/tests/XXXGenericOverload.fss` is green only because it prints its FAIL line. `XXXGenericOverload2` is green because it stops at run time.
- Neither is green because walk refuses the set, which is what they were written to check (G.skeptic.1).

**Compiled tests:** `XXXWhereBoundChecker` is rekeyed to the code generator's wall (row 701), so its name no longer says what it checks.

## 4. Behaviour changes a user program could notice

**Walk:**
- Generic dotted calls with no static argument now run (row 21). Not a regression.
- A trait-declared generic method gets quietly wrong instances (row 766), where the base stopped. Not a regression, but a loud failure became a wrong value.
- A lone `T` fixed by a `ZZ32` becomes `Int` for methods (row 364). Not a regression.
- **By reading, not measured:** where a generic dotted method's declared domain lies inside a plain overload's, walk now runs the generic. Before W, it never chose the generic, so it ran the plain one. A program of that shape changes its answer. This is the specification's rule, and no program in the tree was measured to change.
- Generic pairs walk used to refuse now load (row 159; the specification's `ident` pair). Not a regression.
- **Regression:** pairs with equal declared domains are now refused at load. This covers rows 549 and 742, and row 759's `g[\T\](a: T)` beside `g(a: Any)`, which the compiled path still runs. Such programs ran before. In the tree only revival tests have that shape (`XXXDispatchTwoCommonParentsWalk`, which was respelled). No library, demo, specification example or microGPT line has it.
- The refusal message for such pairs is stale (finding 3).
- `comprises { Box[\E\] } where [\E\]` now loads.
- An extender listed only below the bound now loads (row 754), where the base refused it. Loud became quiet.
- The list comprehension's unwrap now casts. No test trips the cast.

**Library:**
- **Regression:** `distribute(r: Any)` is gone, and `leftDistribute` and `rightDistribute` now take `ActualReduction[\R,K\]` instead of `Reduction[\R\]`. A call with any other argument finds no overload. Nothing in the tree, the demos or microGPT makes such a call.
- **Regression:** the nullary `BIG UNION` and `BIG UPLUS` of `Map`, `IntMap` and `PrefixMap` now answer `BigReduction`, and `embiggen` takes `j: (T,T)->T`. A program that writes `__bigOperatorSugar[\X,X,Any,Any\]` or declares the old `Comprehension` type now stops. None in the tree.
- An empty `SUM` over a user group now ends in `CastError` instead of `ProgramError`. It failed before too; only the error changed.

**Compiled path:**
- A `where` constraint is now read as a bound; a call that breaks a function's own constraint is refused.
- Row 749: every call is refused, `g(O)` included. The base's checker accepted `g(O)`. That is a regression at `typecheck` only: the code generator refuses where clauses (row 701), so no such program ran.
- Rows 751, 756 and 771: no regression of a program that ran. Row 756 is a checker crash where the base gave a static error.
- **Regression, by design:** row 739's shape (an abstract `h(self)` beside a top-level `h(x: String)`) compiled and ran on the base, and is now refused. Walk already refused it. No library declaration has the shape.
- Row 737: where several api declarations fit, none is taken. The base took the first in hash order, so a program that compiled by that luck may now behave differently. None is known.
- Row 738: the message now says "in object O" for an object.
- Row 681: the inferred `i - 1` now compiles. At `i = 0` it gives -1, where walk stops (row 675's note was refused for length). Not a regression.

## 5. The cost

The batch's folder records no cost. Figures are from the 16 transcripts the journal names, by `batch-measures.py`, as tokens written. Total **6.52M**, over 5 h 28 min (13:29 to 18:57).

| Role | Written | Per agent |
|---|---|---|
| Workers | 2.42M | L 503K, W 504K, A 515K, C 492K, G 405K |
| Skeptics | 2.20M | W 435K, L 478K, C 387K, A 425K, G 479K |
| Gather | 587K | |
| Merged-diff review | 426K | |
| The review's judge and repair | 589K | 275K + 314K |
| Gate | 138K | |
| Commit | 159K | |

- Against the record: it estimated about 5.4M (top 6.5M with a judge and repair) and 8 to 9 hours. Workers were on estimate. Skeptics ran 0.4M over. The fixed roles ran 0.1M over. The merged-tree judge and repair added 0.59M.
- Against batch 16: 6.01M over 8 h 31; per rung 1.30M against 1.50M.
- First calls 772K (11.8 %), 9 started cold. No cache refills, no refusal cycles.
- `batch-measures.py` counts W's builds as 0, but W's transcript holds builds (W's SKEPTIC.md section 2). The tool misses that build form.

## 6. Routing missing, by home

**PLAN (`explorations/coordinator/PLAN.md`):**
- Lines 9 and 11-13 are stale:
  - microGPT's check is recorded only through batch 16;
  - the gate figures are still 39, 49, 82 s and 217 s (now 31, 35, 76 s and 180 s at `65c0cc463`);
  - "not yet pushed" is wrong.
- Line 55 (item 15) still says "its record not yet drafted". It needs its one line with the landing commit and the review.
  - Move the built candidates to PLAN-history: line 56's forms (all but conditional extension), line 57's rows 681, 737, 739 and 738, line 58's row 159 with 742 and 549 plus the two batch-16 comments G corrected, and line 61's `embiggen`.
  - A batch-18 item is missing, with the record's order: conditional extension, row 697, then P-152's probe starting from G's code. No PLAN line names that probe.
- Items 56 and 57 (lines 124-128) are answered and built; they belong in PLAN-history.
- Line 72 (the `where` clauses line) still says "Its batch: climb batch 17". It should say what landed, and what is left: conditional extension, rows 748, 749, 750, 771 and 701.
- Lines 453-454: the defaults "built in climb batch 17's checker rung" are now built, at `091ec54df`.
- 16 new rows have no PLAN line: 748, 750, 755-766, 768 and 770.
- Row 766 needs an item for the curator (finding 1).
- "Work that can start now" needs two lines: the gather's order and `landsOnlyWith` (finding 2), and walk's refusal message (finding 3).

**POSITIONS (`explorations/coordinator/POSITIONS.md`):**
- P-151 (line 65) still reads "Still to build: the batch after climb batch 16". It should say built: the method condition and the generic `distribute` (L, `2b1cd8e63`) and `AnyList`'s clause (A, `24db899fa`, its bodies respelled within `AnyList`); still to build: conditional extension. The gather left this for the coordinator (gather.3).
- P-45 (line 44): its "Built" needs narrowing, and row 759 named (finding 5).

**Ledger (`explorations/fortress-gap-ledger.md`):**
- Row 589's claim still names the unbounded pair, which walk now refuses at load (gather.2).
- 13 notes were refused or had no room (`RECORD.md`, "Ledger notes not written"). Two carry new measurements that would be lost: row 675's compiled -1, and row 744's inferred call, which now runs. Review-queue item 165 tracks the notes' length limit.

**FACTS (`explorations/coordinator/FACTS.md`):**
- Stale or wrong now, and assigned by the record or the commit stage:
  - F-240 (line 99): 82 s and 217 s should be 76 s and 180 s;
  - F-242, F-243 and F-244 (lines 101-103);
  - F-250 (line 106): its walk sentence is true of `2b1cd8e63` alone;
  - F-252 (line 171): its limit is wider than the code (judge-review.3);
  - F-250 to F-254 are over 600 characters.
- Made false by the batch and **in no list**:
  - F-27 (line 21): row 159's refusal;
  - F-75 (line 68) and F-81 (line 74): `distribute`'s pairs;
  - F-84 (line 77): `AnyList`'s readings, row 636;
  - F-121 (line 136): "not a type one";
  - F-146 (line 160): rows 636 and 681 "open";
  - F-237 (line 98): row 433's sites at `:3422` and `:3424`.

Local sources not on GitHub: the run directory `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_3d858dc3-530/`, with its `journal.jsonl`.
