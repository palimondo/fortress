<!-- The list of claims of FACTS entries that today's checks found stale, false, beyond their support, citing a thing that is gone or moved, disagreeing with a ledger row, or unsettled, gathered by entry number from the workers' files under `explorations/coordinator/postmortem-2026-11-24-record-regrowth/` (pilot/pilot.md, pilot/chunk-harness-gate.md, evidence/consolidation/followups*.md, scout-*.md, evidence/f63-traced.md), for a later consolidation of `explorations/coordinator/FACTS.md`; written 2026-11-24 by a gathering worker that judged nothing and checked nothing against the code. Source paths in each line are under that folder. "Pointers to repoint" in the followups, skill sentences repeated by an entry, and scout findings that only say a thing exists are not findings and are left out. -->

# Stale, false and unsettled claims of FACTS, by entry

- Entries with at least one finding: 70 (of the 339 entries of FACTS).
- Findings: 93. By kind:
  - false today: 21
  - beyond its support: 14
  - cites a thing that is gone or moved: 30
  - a ledger row's status disagrees: 14
  - unsettled, to investigate: 14
- Where two sources report the same finding it is given once with both sources; where they disagree, the block says so after the line.
- Sources: 11 scouts of the 12 chunks (none for `harness`, whose 24 entries have the harness-gate judgement instead), the writers' hand-backs for `exec`, `checker-1`, `checker-2`, `checker-3` and `harness`, the pilot's four entries (F-252, F-53, F-396, F-63).

## Findings, by entry

### F-19
- "walk makes each block a task" was not re-checked. Kind: unsettled, to investigate. Source: evidence/consolidation/followups.md, exec, "Not re-checked".

### F-20
- "no optimization uses a size" rests only on a code reading of 2026-09-24. Kind: unsettled, to investigate. Source: evidence/consolidation/followups.md, checker-1, "Investigate".

### F-27
- the scout found the `GenericBesidePlain*` tests only under `compiler_tests/` (GenericBesidePlainZZ32.fss, GenericBesidePlainStaticLink.test, GenericBesidePlainInvalidSetCallType.fss), none under `tests/` (the scout does not say which folder the entry names). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-exec.md, F-27, item 4.

### F-32
- headings "On the new base" and "The count" are NOT FOUND in `CLIMB-BATCH-23.md` (its headings are "What the record owes", "The planner's probes", "Left out..."). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-1.md, F-32, Sources.

### F-39
- `explorations/compile-ladder/rung-default-rendering/probes/skeptic/SkOprParam.fss` NOT FOUND (`find explorations -name 'SkOprParam*'` empty). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-1.md, F-39, Exists today.
- "Nine test files declare one" was not reproduced: a loose grep gives 15 files, a strict one gives 2. Kind: unsettled, to investigate. Source: evidence/consolidation/scout-checker-1.md, F-39, Exists today.

### F-42
- cites F-53 for the count's early return ("which sees only the errors before each unit's early return (F-53)"); after the pilot's rewrite of F-53 the claim is no longer there. Kind: cites a thing that is gone or moved. Source: pilot/pilot.md, F-53, Findings 2.

### F-44
- the probe `ProbeMIEPick` is not in the tree (`find explorations -iname '*ProbeMIEPick*'` empty). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-1.md, F-44, Exists today; evidence/consolidation/followups.md, checker-1, "Investigate".

### F-49
- the probe `FillBoxAny` is not in the tree (`find explorations -iname '*FillBoxAny*'` empty; only FACTS, history and notes name it). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-1.md, F-49, Exists today; evidence/consolidation/followups.md, checker-1, "Investigate".

### F-53
- "and nothing crashes (F-233)": F-233 is about a block's local functions and says nothing of a crash; the support is `checker-count.txt`'s '#crash none' line (pilot: "A pointer that does not hold its claim"). Kind: beyond its support. Source: pilot/pilot.md, F-53, Findings 1.

### F-57
- on today's one library, does `x + 1` under `T extends Integral[\T\]` still fail the checker and run under walk? do `cast[\T\]`, `asif` and `widen` still fail? measured before the numeral types were redesigned. Kind: unsettled, to investigate. Source: evidence/consolidation/followups.md, checker-1, "Investigate".

### F-58
- do the 42 sites, 23 of them the index bound, still hold after the four library commits since `c0c35b4f9e`? (counts not re-measured). Kind: unsettled, to investigate. Source: evidence/consolidation/followups.md, checker-1, "Investigate"; evidence/consolidation/scout-checker-1.md, F-58, Exists today.

### F-59
- "Table 2" is a bold line (line 291 of `sum-replacement-judgement.md`), not a heading: `--check 'doc:...#Table 2'` NOT FOUND. Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-1.md, F-59, Sources.

### F-63
- the cited reason for the abstract pair is stale: the report says the component's `String` defines neither `split` method; since `cc47b637d8` the component declares both without a body (`Library/FortressLibrary.fss:4651-4652`) and `FlatString` gives them bodies; the form still holds. Kind: false today. Source: pilot/pilot.md, F-63, Findings 1; evidence/f63-traced.md, 2.3 table, Evidence (a); evidence/consolidation/followups-checker-2.md, "Made true of the tree" (F-63: the pilot's text).
- "no test gates that edit" is stale in part: the count stage now runs `FortressLibrary`'s check to its end through the export check (F-240) and reads 0 (F-53); that it would refuse the earlier `SequentialGenerator[\G\]` is read from the export check's code, not measured. Kind: false today. Source: pilot/pilot.md, F-63, Findings 2; evidence/f63-traced.md, 2.3 table, Evidence (b).
- the report's `QQ` clause `comprises { AnyIntegral, ... }` differs from the tree, `comprises { ... }` since `d846e3644c` (known, in the history already). Kind: cites a thing that is gone or moved. Source: pilot/pilot.md, F-63, Findings 3; evidence/f63-traced.md, 1.6.
- "otherwise it is read from the export check's comparison of return types": the rung's record and the brief give the override rule as the error's ground, `REPORT.md:52` gives the export check as the reason to choose `Condition[\G\]`; the gap left on 2026-10-22 (`assessment.md:111`) is not settled. Kind: unsettled, to investigate. Source: evidence/f63-traced.md, 2.3 table, Evidence (c).
- "The other repairs tried ... read the same count", "The `Condition.map` error was seen only under a checker change that did not land", "In their earlier forms": the referents (count 103 of 2026-09-22, rung P) are not in the entry; present meaning and comprehension fail. Kind: unsettled, to investigate. Source: evidence/f63-traced.md, 2.3 table, Present meaning and Comprehension; In short 7.
- the cited line of `trait Condition` moved eight times after 2026-10-22 (`FortressLibrary.fsi:1053` now `:1017` in climb batch 29b's owed list; the scout found the trait at `:1008`). Kind: cites a thing that is gone or moved. Source: evidence/f63-traced.md, 1.6 and 1.7; evidence/consolidation/scout-checker-2.md, F-63, Exists today.
- the same claim as F-286 and F-297 on `String`'s abstract `split` pair, and neither entry points to the other; row 355 (`zip` in `PureList.fsi:75`, open) and row 357 (`QQ`'s shape in `IntMap.fsi`, open) are not named by F-63; overlap with F-64 (row 354) on `QQ`. Kind: unsettled, to investigate. Source: evidence/f63-traced.md, 1.6 and 2.3 table, Consistency; evidence/consolidation/scout-checker-2.md, F-63, Said elsewhere.
  - Two sources disagree in emphasis: the scout reported F-63's `Condition` line and `comprises { ... }` at `:397` as found and flagged nothing; the pilot and f63-traced found its reason and its test claim stale. f63-traced has no section named "Points to know before relying on it"; its findings are in 1.6, 1.7 and the 2.3 table, which are what is used here.

### F-65
- the literal `FORTRESS_ANALYZER_CLAUSES_CACHE` is NOT FOUND in `ProjectFortress/src`, `astgen` or `bin` (the code reads `fortress.analyzer.clauses.cache`, `TraitTable.scala:117`; the report, `REPORT.md:65`, says the env form comes from dots-to-underscores). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-2.md, F-65, Exists today.

### F-66
- a `#stopped` table is red (the entry was made true of the tree; the words changed are not given). Kind: false today. Source: evidence/consolidation/followups-checker-2.md, "Made true of the tree".
- `gate/checker-count.txt` is under `explorations/compile-ladder/climb-batch-N/gate/`, not under `explorations/compile-ladder/gate/` (which holds `distance-sites.tsv` and `suite-compiled.tsv`). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-2.md, F-66, Exists today.

### F-67
- status words cut (the followup gives "still to build" and "the curator has not decided" for F-67, F-75 and F-90 together, without saying which entry held which). Kind: false today. Source: evidence/consolidation/followups-checker-2.md, "Made true of the tree" (F-67, F-75 and F-90).

### F-75
- status words cut (see F-67: the same followup line, shared with F-90). Kind: false today. Source: evidence/consolidation/followups-checker-2.md, "Made true of the tree" (F-67, F-75 and F-90).

### F-76
- the entry calls rows 487, 546, 547 and 559 open; row 547 is CONTESTED. Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-checker-2.md, F-76, Exists today.

### F-77
- row 555 was not called contested; it is now called contested. Kind: a ledger row's status disagrees. Source: evidence/consolidation/followups-checker-2.md, "Made true of the tree".
  - Two sources disagree: evidence/consolidation/scout-checker-2.md, F-77, reports rows 555 CONTESTED and 589 NEGATIVE-VERIFIED with the note "entry only cites them" and flags nothing; the writer found the entry's words about row 555 wrong and changed them.

### F-78
- `Functionals.scala:962-966` does not hold the attempt order (it holds `counted` and `holds` helpers); the order is in the list `attempts` in `Functionals.scala`. Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-2.md, F-78, Exists today; evidence/consolidation/followups-checker-2.md, "Made true of the tree".

### F-87
- "The expected type" is not a section or paragraph heading of `Specification/basic/inference.tex` (a paragraph of the chapter). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-2.md, F-87, Exists today; evidence/consolidation/followups-checker-2.md, "Made true of the tree".

### F-90
- status words cut (the followup gives "still to build" and "the curator has not decided" for F-67, F-75 and F-90 together, without saying which entry held which). Kind: false today. Source: evidence/consolidation/followups-checker-2.md, "Made true of the tree" (F-67, F-75 and F-90).
- "(F-53, which lists the five)": F-53 lists no five, in its old text or its new. Kind: cites a thing that is gone or moved. Source: pilot/pilot.md, F-53, Findings 2.

### F-93
- stated the design as established; it now says that a worker (per PLAN) chose it. Kind: beyond its support. Source: evidence/consolidation/followups-checker-3.md, "Made true of the tree" (F-93 and F-237).

### F-94
- `Number` has no `comprises` clause now, so no library call meets the closed-trait case that the entry describes (the entry was merged into F-227). Kind: false today. Source: evidence/consolidation/followups-checker-3.md, "Made true of the tree" (F-94/F-227).

### F-100
- "deletes the caches folders, `default_repository/caches` and `local_repository/caches`": the build stamps three folders; `default_repository/caches-one` too, since `c7ba100d14` (2026-11-17). Kind: false today. Source: pilot/chunk-harness-gate.md, F-100, Scope and Present meaning; evidence/consolidation/followups.md, harness, skill sentences (build-and-caches.md:113-114).
- "`ant cleanCache`, which deletes both folders whatever the stamp": it deletes three and starts each again with the build's stamp. Kind: false today. Source: pilot/chunk-harness-gate.md, F-100, Scope.
- "which `CompilerJUTest` and `LibraryJUTest` call": `OneLibraryJUTest.java:35-36` calls `Shell.resetRepository` too. Kind: false today. Source: pilot/chunk-harness-gate.md, F-100, Scope.

### F-102
- "(F-29: walk's load check and its `load_exception_contains` key)": F-29 is the load check of closed traits and does not name the key. Kind: beyond its support. Source: pilot/chunk-harness-gate.md, F-102, Evidence.

### F-109
- "Two gated walk tests are refused by the compiler until the switch-over" and "Neither file is in the list of the gate's step 7": under the one library both compile and pass, both are listed under `one` since `3a0bae976c` (2026-11-24 05:47 UTC) and both passed at batch 36's gate. Kind: false today. Source: pilot/chunk-harness-gate.md, F-109, Scope, Present meaning, Evidence.

### F-111
- "The count stage calls `Shell.compilerPhases` with `PhaseOrder.compilerPhaseOrder`": since 2026-10-24 the count stage runs `WorldFlip -stop check`, the same six phases as the distance stage. Kind: false today. Source: pilot/chunk-harness-gate.md, F-111, Present meaning.
- "`checker-count/WorldFlip.java:25` and `:42`": `:25` is the class line and `:42` is `Shell.setTypeChecking(true)`; the order is set at `:28` and `:36`, the call is at `:46`. Kind: cites a thing that is gone or moved. Source: pilot/chunk-harness-gate.md, F-111, Evidence.

### F-114
- "130 of the specification's 133 extracted examples" and "`library/`'s three": there are 135, five in `SpecData/examples/library/` since `73213e4be4` (2026-11-16); the 130 that run still holds. Kind: false today. Source: pilot/chunk-harness-gate.md, F-114, Scope, Present meaning, Evidence; evidence/consolidation/followups.md, harness, skill sentences (tests-running.md:24).
- the cut sentence on five examples that pass by walk's open parameter was not checked again (they may pass by F-228's join now); P-124 says every example must pass, while the five of `library/` run in no suite. Kind: unsettled, to investigate. Source: evidence/consolidation/followups.md, harness, "Open".

### F-129
- cites row 962 without saying it is CONTESTED (F-140 says contested). Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-landed-1.md, F-129, Exists.

### F-138
- row 442's text (read to 330 characters) names `^` on `ZZ64`, shifts, `GCD` and `LCM` on `NN32`/`NN64`, not MIN or MAX or "NN32 with ZZ32 answers ZZ". Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-landed-1.md, F-138, Exists.

### F-144
- row 665's text is about the load check of an inherited abstract method that "skips generic objects"; the entry cites it for a reduction with static parameters that "stops at its first join". Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-landed-1.md, F-144, Exists.

### F-155
- "loads and runs (F-155, F-258)" for the `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` pair: no test under `tests/` or `compiler_tests/` writes the pair; one walk run observed it (`coordinator-work-2026-11-05.md`, item 260); F-155 and F-252 cite each other for it; `rung-walk-generic-pairs/REPORT.md` section 5 shows the same pair refused (row 416). Kind: beyond its support. Source: pilot/pilot.md, F-252, Findings 1.
- the probe's `x` "is refused beside the library's MultiplicativeRing.x (row 341)" without saying that row 341 is FIXED. Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-arrays.md, F-155, Exists.

### F-156
- "question 5" is not a heading of `run-c4/probes/vocabulary/REPORT.md` (`--check doc:...#5` NOT FOUND; it is item (5) under "## The five questions"). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-arrays.md, F-156, Sources.

### F-175
- states row 547 as a departure without saying it is CONTESTED. Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-spec.md, F-175, Exists.

### F-180
- `gap5-helper-raise.patch` NOT FOUND (`find . -name gap5-helper-raise.patch -not -path './.git/*'` empty); `nativeHelpers/simpleIntLiteralArith.java` is only a build `.class` (the entry says it was deleted). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-arrays.md, F-180, Exists.

### F-185
- `TransactionJUTest.java` has no comment (it holds one test); the commented-out multi-threaded half is in `src/.../tests/unit_tests/TestTask.java:43-44`. Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-arrays.md, F-185, Exists.

### F-227
- `Number` has no `comprises` clause now, so no library call meets the closed-trait case (the sentence came from the merged F-94). Kind: false today. Source: evidence/consolidation/followups-checker-3.md, "Made true of the tree" (F-94/F-227).

### F-235
- the solver's three memos are not all the checker's memos; the checker has others (scoped to the solver's three memos). Kind: beyond its support. Source: evidence/consolidation/followups-checker-3.md, "Made true of the tree".

### F-237
- stated the design as established; it now says that the coordinator chose the place (PLAN gives it as a default). Kind: beyond its support. Source: evidence/consolidation/followups-checker-3.md, "Made true of the tree" (F-93 and F-237).

### F-245
- a measurement given without its bounds; it now says it holds for climb batch 21's base, with its 8 cited to P-157. Kind: beyond its support. Source: evidence/consolidation/followups-checker-3.md, "Made true of the tree".

### F-251
- the tree departs from P-151: `addLeft` and `addRight` stay in `AnyList` (row 799, contested); the entry did not say so. Kind: false today. Source: evidence/consolidation/followups-checker-3.md, "Made true of the tree".

### F-252
- "unifies a symbolic size with a size parameter" is in none of the sections the old text cites (its source is `rung-walk-overload-if/SKEPTIC.md` section 2, commit `aa4b46d6e`, gated by `tests/GenericSizePairNestedWalk.fss`). Kind: beyond its support. Source: pilot/pilot.md, F-252, Findings 2.
- "loads and runs (F-155, F-258)" for the `h` pair has no test and was observed once (see F-155); the cited section 5 of `rung-walk-generic-pairs/REPORT.md` shows the pair "refused, the same (row 416)" and predates the whole-type reading. Kind: beyond its support. Source: pilot/pilot.md, F-252, Findings 1.
  - Two sources differ: evidence/consolidation/scout-landed-2.md, F-252, reports every test the entry names as found (14 tests, none not found) and its rows 416, 539, 787 as agreeing; the pilot found that the `h` pair itself has no test.

### F-254
- the scout read `Library/FortressLibrary.fss:131` as `BIG LEXICO` text (the scout lists it under Exists without saying which claim the line should hold). Kind: unsettled, to investigate. Source: evidence/consolidation/scout-checker-3.md, F-254, Exists.

### F-255
- the checker's other readers of an `extends` clause ignore a conditional parent, and no ledger row holds this. Kind: unsettled, to investigate. Source: evidence/consolidation/followups-checker-3.md, "Investigate".

### F-265
- its evidence was not stated: observed once, by a probe that is no longer in the tree; row 471 has no reproducer. Kind: beyond its support. Source: evidence/consolidation/followups-checker-3.md, "Made true of the tree" and "Investigate".
- (same entry) does walk still stop with an `InterpreterBug` at an `Object`-bounded type variable given a tuple?. Kind: unsettled, to investigate. Source: evidence/consolidation/followups-checker-3.md, "Investigate".

### F-266
- states its Java exception as plain fact; row 1032 is CONTESTED. Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-checker-3.md, F-266, Exists.

### F-267
- does the checker still refuse a subtrait that inherits an abstract method named by an operator static argument? no ledger row or test holds it. Kind: unsettled, to investigate. Source: evidence/consolidation/followups-checker-3.md, "Investigate".
- the probes `OprSingle` and `OprInstancesOplus` are not in `git ls-files` by those names. Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-3.md, F-267, Exists.

### F-268
- `CodeGen.java:6781-6785` holds `Naming.arrowRTTIclass`/`factory` and the `SelfType` branch, not the described code (`grep -n 'AnyType\$Any\$RTTIc' CodeGen.java` finds nothing). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-3.md, F-268, Exists; evidence/consolidation/followups-checker-3.md, "Made true of the tree".
- the `GETSTATIC` description was stale: the `Any` case now goes through `generateTypeReference`. Kind: false today. Source: evidence/consolidation/followups-checker-3.md, "Made true of the tree".

### F-270
- "Fork 3, way 4a, under Q13.3" is not a heading of `rung-size-expressions/REPORT.md` (a bold lead at line 23, inside section 1). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-landed-2.md, F-270, Sources.

### F-276
- row 342 is about walk's cache; its text does not say that the library is analysed afresh. Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-checker-3.md, F-276, Exists.

### F-277
- the old text named `FunctionalMethod.ast`, which does not exist; the file is `compiler/index/FunctionalMethod.java`. Kind: cites a thing that is gone or moved. Source: evidence/consolidation/followups-checker-3.md, "Made true of the tree".

### F-285
- "twelve components": `tools/distance/run.sh` COMPONENTS lists 14 (F-288 says fourteen). Kind: false today. Source: evidence/consolidation/scout-checker-4.md, F-285, Exists.

### F-286
- `List.fsi:55` is a comment line; `trait AnyList excludes { Number, HasRank, String }` is at `List.fsi:57`. Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-4.md, F-286, Exists.

### F-292
- `XXXImplicitBoundAny` NOT FOUND (the entry says promoted; `ls compiler_tests | grep ImplicitBoundAny` gives `ImplicitBoundAny.fss`/`.test` only). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-4.md, F-292, Exists.
- "23 `.test` files" name `CompilerSystem`: `grep -l CompilerSystem compiler_tests/*.test` gives 0, `*.fss` gives 27. Kind: false today. Source: evidence/consolidation/scout-checker-4.md, F-292, Exists.

### F-296
- "twelve commands of Shell.java:411-469": 11 `useCompilerLibraries()` call lines lie in 411-469 (12 with :471). Kind: false today. Source: evidence/consolidation/scout-checker-4.md, F-296, Exists.

### F-298
- gives row 849 as a refusal case without a status word; row 849 is CONTESTED. Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-checker-4.md, F-298, Exists.

### F-299
- "373 of 401" `builtinPrimitive` bindings: today 372 with the package, 402 without. Kind: false today. Source: evidence/consolidation/scout-checker-4.md, F-299, Exists.

### F-301
- `FortressMethodAdapter.java:303-327` does not hold the wrapper (`:296-300` throws `Error("No Fortress type (yet) for foreign Java type descriptor")`); the getValue/make table is at `:173-186`. Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-exec.md, F-301, Exists.

### F-302
- `CodeGen.java:6047-6054` now holds `emitErasedClassFor`; the springboard class is built from `:6092`. Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-exec.md, F-302, Exists.

### F-307
- `NamingCzar.java` special names run `:371-380` in the file (the skill's `compiler.md:127` cites `:373-384`, `:494-503`; the scout does not say which lines the entry cites). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-4.md, F-307, Exists.

### F-315
- `CodeGen.java:3462-3465` is `index++;` in a parameter loop; `fnDeclCompilableModifiers` is at `:3469`. Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-checker-4.md, F-315, Exists.

### F-348
- the two clauses on top-level initializers and unnamed imports were not re-checked. Kind: unsettled, to investigate. Source: evidence/consolidation/followups.md, exec, "Not re-checked".

### F-351
- `CodeGen.java:2148-2180` `forAtomicBlock` is now `forAtomicBlockHelper` `:2142` and `forAtomicBlock` `:2155`; `forTry` is `:2485` (the entry says `:2490-2494`); `ArrayStoreJUTest` is at `compiler/runtimeValues/ArrayStoreJUTest.java`, not under `tests/`. Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-exec.md, F-351, Exists.

### F-354
- "Two cold compiles ... by one build give equal classes, 590 of 590" is given as a rule; the source shows it for the base build's code, and shows this tree's `CompilerBuiltin` compiled twice with 16 of 312 classes differing (`plan-31/probes/probe-y.md:129-133`). Kind: beyond its support. Source: pilot/chunk-harness-gate.md, F-354, Scope.

### F-361
- the test `XXXGenericBesidePlainReturnParam` NOT FOUND; it is now `tests/GenericBesidePlainReturnParam.fss` (promoted 2026-11-17, `f6e24650e7`). Kind: cites a thing that is gone or moved. Source: evidence/consolidation/scout-arrays.md, F-361, Exists.

### F-370
- states row 1032's Java exception as plain fact; row 1032 is CONTESTED. Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-checker-5.md, F-370, Exists.

### F-390
- gives its `println` case as a plain exception; row 1098 is CONTESTED. Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-checker-5.md, F-390, Exists.

### F-393
- refers to "its stand-in for row 1078" without saying row 1078 is FIXED. Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-checker-5.md, F-393, Exists.

### F-396
- "`=` of two lists" at row 1137 claims more than its evidence: the skeptic compared two empty lists (`SkOneList`); the worker's program on two lists built by `addRight` died first on a size known only at run time (rows 25 and 307). Kind: beyond its support. Source: pilot/pilot.md, F-396, Findings 1.
- row 1103 is listed among the departures "against the one library"; the row and the skill's trap say "against either library". Kind: false today. Source: pilot/pilot.md, F-396, Findings 2.
- that a `Vector`'s `+` and `-` die at row 643 was observed by the skeptic (`SkOneVecOps`), but row 643's text names no vector; the tie is the skeptic's reading. Kind: beyond its support. Source: pilot/pilot.md, F-396, Findings 3.
- row 1140 has reproducer "none"; the failure was observed once, in the gate's run of `tests/NumeralCoercionNumberAtCallWalk.fss` under the one library (`reviews/batch-36-review.md`, finding 3). Kind: beyond its support. Source: pilot/pilot.md, F-396, Findings 4.
- lists row 1098 (CONTESTED) as a departure without marking it contested. Kind: a ledger row's status disagrees. Source: evidence/consolidation/scout-checker-5.md, F-396, Exists.

## Skill sentences to change (the skill is wrong, the fact is right)

These are the writers' own lists; the skill is `.claude/skills/fortress-repo/`. Each is given with the entry whose fact it repeats, and the source.

- `references/interpreter.md:109`, now "On one core, the order is fixed for a given library". Should read: "With three JVM flags set together, `-XX:+UseSerialGC -XX:TieredStopAtLevel=1 -XX:ActiveProcessorCount=1`, the order is fixed for a given library, but a library edit can change it; which flag fixes it is not known." Entry F-108 (row 430). Source: followups.md, harness, "Skill sentences to change"; pilot/chunk-harness-gate.md, F-108 Consistency and "Found beside the entries".
- `references/build-and-caches.md:113`, names two caches folders. Should read: "At its end, the build keeps each of the three caches folders, `default_repository/caches`, `default_repository/caches-one` and `local_repository/caches`, only if the build's sources and build are as the last build left them and the folder holds that build's stamp, and empties it if not." Entry F-100. Source: followups.md, harness; chunk-harness-gate.md, F-100 Consistency.
- `references/build-and-caches.md:114`, "`ant cleanCache` deletes both folders". Should read: "`ant cleanCache` deletes the three folders, whatever their stamp, and starts each again, empty, with the build's stamp." Entry F-100. Source: followups.md, harness; chunk-harness-gate.md, "Found beside the entries".
- `references/tests-running.md:24`, "the specification's 130 extracted examples". Should read: "runs 130 of the specification's 135 extracted examples (...) under walk; the five of `SpecData/examples/library/` run in no suite." Entry F-114. Source: followups.md, harness; chunk-harness-gate.md, "Found beside the entries".
- `references/sources.md:812`, cites F-42; should cite `StaticChecker.checkCompilationUnit`. Source: followups.md, checker-1, "Skill".
- `references/sources.md:802`, `:1318`, `:1334`, cite F-59 for the reductions rule; should cite F-364 and P-78, and F-285 for the library's own sites. Source: followups.md, checker-1, "Skill".
- `references/sources.md:1305`, cites F-58 for `1.0 s`; should cite F-366. Source: followups.md, checker-1, "Skill".
- `references/interpreter.md`, "What walk checks", first bullet. Now: "It accepts them if `comprises` clauses cover the overlap." Should read: "It accepts two top-level functions without static parameters, not methods, if declarations without static parameters below both cover the overlap through `comprises` clauses." Source: followups.md, exec, "Skill sentences to change".
- `references/revival-changes.md`, "Dispatch and overloading". Now: "It compares declared domains where one lies strictly inside the other. Otherwise it compares the instances that the call makes." Should read: "Where one of the two declarations has static parameters of its own, it compares declared domains where one lies strictly inside the other. Otherwise, as for two functional methods of a generic trait or object, it compares the instances that the call makes." Source: followups.md, exec.
- `SKILL.md`, "The phases" (optional). "as a failed dispatch" becomes "as a failed dispatch or another run-time error, such as an `if` on a non-`Boolean` (F-239)". Source: followups.md, exec.
- `references/revival-changes.md`, "Traits and objects", after "...as `(1,2) < (1,2.5)` (row 511).": add "Operands declared with one type at each position, as `p: (ZZ32,RR64) = (1,2)`, compare." Entry F-92 then leaves FACTS. Source: followups-checker-2.md, "Skill sentence to change".
- `references/sources.md:1193`, cites "row 962 (F-74, F-140)"; F-74 is now F-341. Source: followups-checker-2.md, "Skill sentence to change".
- `references/compiler.md`, "The checker's time", the hash sentence: add "Inference variables, walk's wrapped values and the nodes that hold them hash by the JVM's identity hashes, as the checker's `DeclaredFunction`s do; no count-stage output and no checker choice reads that order." (F-232 could then leave.) Source: followups-checker-3.md, "Skill sentences to change".
- `references/compiler.md`, "The checker's time", `MethodSizeJUTest`: add "and if a listed method is gone or back under the limit". Source: followups-checker-3.md.
- `references/compiler.md`, "The checker's time": "about 80 to 180 seconds" should read "about 60 to 180 seconds" (F-240: about 65 s). Source: followups-checker-3.md.
- `references/compiler.md`, "The checker's gaps", `where` constraint: add "Both paths refuse a type `where`-clause variable that a function or method introduces, 'E is undefined.': P-151 builds one only in a `comprises` clause." Source: followups-checker-3.md.

## FACTS sections and chunks that no source checked beyond a scout's existence check

The scouts of these chunks checked that the files, tests, rows and report headings each entry names exist (and a ledger row's status against the entry's words); no writer or checker then read the entries against the tree. Chunks `checker-4`, `checker-5`, `landed-1`, `landed-2`, `landed-3`, `arrays` and `spec` had no writer. A scout's "found" is not a check that the entry is true.

- `checker-4`, section "The checker and the one library", F-281 to F-323 (30 entries).
- `checker-5`, section "The checker and the one library", F-325 to F-409 (28 entries). Beyond the scout: F-396, by the pilot.
- `landed-1`, section "Landed semantics", F-117 to F-148 (31 entries).
- `landed-2`, section "Landed semantics", F-222 to F-347 (31 entries). Beyond the scout: F-252, by the pilot.
- `landed-3`, section "Landed semantics", F-349 to F-407 (30 entries). The scout found none missing.
- `arrays`, sections "The library's arrays and algebra" (16 entries) and "The territory map" (7 entries), F-151 to F-185 as listed in `chunks.json` (23 entries). Beyond the scout: F-155, by the pilot's finding 1.
- `spec`, section "The specification and the repository's lineage", F-162 to F-371 (23 entries).

The five chunks with a writer (`exec`, `checker-1`, `checker-2`, `checker-3`, `harness`) were read against the tree; `harness` by the harness-gate judgement and its writer, the others by their scouts and Opus writers. Not re-checked by their writers: F-19 and F-348 (exec). Counts, line numbers inside entries and several cited sections were not re-read by the scouts (each scout's header says so).
