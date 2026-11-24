<!-- Scout evidence for chunk checker-1 (FACTS entries F-32 and F-34 to F-62, section "The checker and the one library") of the FACTS consolidation of 2026-11-24: facts gathered for the Opus writer, no judgement and no rewrite. Gathered 2026-11-24 on the tree at f33bbf5549. -->

Conventions. E = `explorations/`. "Doc found" = `facts-extract.sh --check 'doc:PATH#HEADING'` matched; a "section N" cite was matched by its numbered heading (`#N` matches by prefix, so the heading lists were also read). C0 = every entry's first history block: "numbered, commit `a74f5a2b7`, 2026-10-13 17:58Z"; later blocks are rewrites. Rows are read with `facts-extract.sh 'ledger:N'`. No FACTS entry of this chunk has a dated curator quote in its history, except F-61. "Cited by" excludes `.claude/skills/fortress-repo/references/sources.md` (maintenance file) unless named.

## F-32

Sources: E/compile-ladder/climb-batch-28/RECORD.md "The count of the bindings" found; E/perf-probes/prelude/natives-shape.md s.2 found; E/coordinator/CLIMB-BATCH-23.md s.4 found, "The planner's probes" found, "On the new base" NOT FOUND and "The count" NOT FOUND as headings (`--check 'doc:E/coordinator/CLIMB-BATCH-23.md#On the new base'`; the file's headings are ### level: "What the record owes", "The planner's probes", "Left out...").
Commit: C0.
Cited by: FACTS F-61, F-299, F-323; POSITIONS P-58, P-162; skills: sources.md only.
Exists today: row 348 NEGATIVE-VERIFIED (prelude inverts wrap/saturate spellings; agrees with the entry's "12 wrapping operators"). Entry also cites F-298/F-299/F-330/F-314/F-337/F-333/F-335, P-58, P-170, F-79 (not opened).
Said elsewhere: compiler.md:112 "If the string names a glue class or anything else outside that package: 'Variable builtinPrimitive is not defined.'"; compiler.md:26 "Both paths run the helpers, the public static methods of classes under `nativeHelpers/`."; FACTS F-298, F-299 (the 373/28 split).
Curator: none.

## F-34

Sources: E/compile-ladder/rung-first-run-one-library/REPORT.md "The stages (a point to report)" found; E/compile-ladder/plan-34/probes/measure-285efad802.txt exists; E/compile-ladder/plan-31/PROBES.md "3. The measure: ..." found.
Commit: C0.
Cited by: FACTS F-315, F-320, F-384, F-389; POSITIONS none; skills: sources.md:1524.
Exists today: ProjectFortress/one_library_tests/OneLibraryComponents.test found; OneLibraryJUTest.java found, line 44 is the `OneLibraryComponents.test` suite line (agrees); Library/String.fss:67 and :69 hold `concatAndBalanceIfNecessary(s1 asif String, s2)` (agree); E/compile-ladder/plan-31/probes/planner/codegen-measure.sh found; row 1137 NEGATIVE-VERIFIED (JVM verifier failure of a function expression reading a getter of self; agrees).
Said elsewhere: library.md:54 "...`OneLibraryComponents.test` compiles them, so it also fails on a declaration that the code generator refuses."; build-and-caches.md:73 names the test as compiling the fourteen; FACTS F-396.
Curator: none.

## F-35

Sources: E/perf-probes/nat/REPORT.md s.2 and s.7 found ("## 2. The rules as built", "## 7. The export checker...").
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills: sources.md:761, :769.
Exists today: Library/FortressLibrary.fsi:1355 is `trait Rank1 extends { Rank[\1\]} excludes {...}` (agrees). Rows named: none (cites P-40).
Said elsewhere: grep 'dead size' and 'subarray' in fortress-repo/: no hits; FACTS F-68, F-279 mention `subarray` (not the dead-size count). History line FACTS-history.md:3291 and :3913 say the removal of the census's other 8 "is to go to the curator as a diff" (a plan, not a quote).
Curator: none.

## F-36

Sources: E/perf-probes/nat/java.md s.1, s.2, s.3 found (headings "## 1. The change...", "## 2. The load failure...", "## 3. What this does not settle").
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills none.
Exists today: `FnNameInfo.boundsFor` found at ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java:168; `RTTIsize.of` found at compiler/runtimeValues/RTTIsize.java:24. No ledger row named. Entry cites F-67, F-129.
Said elsewhere: grep 'boundsFor' in fortress-repo/ and FACTS: no hits besides itself. F-129 (FACTS.md:225) states "A size is carried at run time as a descriptor from `RTTIsize.of`".
Curator: none.

## F-37

Sources: E/perf-probes/nat/size-probes.md s.4 found ("## 4. Probe 3: a type test on a size").
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills none.
Exists today: ProjectFortress/compiler_tests/NatRtCase.test and NatRtCaseGen.test found (with .fss). Row 340 NEGATIVE-VERIFIED (typecase as function body with coerced integer-literal clause values crashes code generator; agrees with the entry's limit). Cites P-41.
Said elsewhere: grep 'NatRtCase', 'INSTANCEOF' in fortress-repo/ and FACTS: no hits. P-41 (POSITIONS.md:40) "On the compiled path, a size static argument travels at run time as a descriptor object".
Curator: none.

## F-38

Sources: E/perf-probes/nat/size-probes.md s.2 found ("## 2. Probe 1: a dispatched arm generic in a size").
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills none.
Exists today: compiler/OverloadSet.java:1561-1562 is the comment "a size has no bound its descriptor could meet, so its extends clause is skipped" and the `KindNat || KindInt` continue (agrees). compiler_tests/NatRtDisp, NatRtDispSize, NatRtDispTrait found (.test and .fss). Row 410 FIXED ("the checker dropped a size parameter from a generic arrow"; agrees with entry's wording about the return-type rule comparing arms' own sizes).
Said elsewhere: grep 'NatRtDisp' in fortress-repo/ and FACTS: none. F-129 (FACTS.md:225) and F-136 (:232) cover the dispatcher's call at its own static parameters.
Curator: none.

## F-39

Sources: E/perf-probes/nat/opr-kind-history.md s.2, s.3 found; E/perf-probes/nat/size-probes.md s.5 found ("## 5. Also measured: ledger row 366").
Commit: C0.
Cited by: FACTS none; POSITIONS P-41; skills none.
Exists today: compiler_tests/XXXOprParamRungS.test found. NOT FOUND: E/compile-ladder/rung-default-rendering/probes/skeptic/SkOprParam.fss (`ls` fails; `find explorations -name 'SkOprParam*'` empty). Row 366 NEGATIVE-VERIFIED (agrees: "open"). Library comments: `embiggen[\T,opr OP\]` at FortressLibrary.fsi:2301 and `trait Monoid[\ T, opr OPLUS \]` at .fss:3475 sit in `(*` comments (agree). "Nine test files declare one": not reproduced; a loose grep `opr +[A-Z]+ *(\\]|,)` over tests/, compiler_tests/, other_compiler_tests/ gives 15 files, a strict one gives 2.
Said elsewhere: interpreter.md:59 "...for a declaration with an `opr` static parameter..." (walk's load check); P-41.
Curator: none.

## F-40

Sources: E/perf-probes/nat/size-cost.md s.1 and "The answers" found; E/compile-ladder/rung-size-runtime/REPORT.md s.12 found.
Commit: C0.
Cited by: FACTS F-12, F-20; POSITIONS none; skills none.
Exists today: ProjectFortress/.../OverloadSet.java `SizeLiteralStructure` at :1167 (found). No ledger row named. Cites F-129, F-20, F-301 (not opened).
Said elsewhere: F-20 (FACTS.md:14) "Sizes ... are values at run time; they check shapes, and no optimization uses them (F-40, what a size costs at run time)."; F-129 (:225) the descriptor from `RTTIsize.of`; F-301 (:26) "once the loop is hot C2 inlines the whole path".
Curator: none.

## F-41

Sources: E/perf-probes/nat/size-rung-probes.md s.3 found ("## 3. Probe 2: DOT's shared size").
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills none.
Exists today: compiler_tests/NatRtDot.test and .fss found. No ledger row named. OverloadSet.java exists (equality test not located by line; entry gives none).
Said elsewhere: grep 'NatRtDot' in fortress-repo/ and FACTS: none.
Curator: none.

## F-42

Sources: E/perf-probes/nat/zero.md found; "its opening section" has no number: headings are "# Zero", "## 1. The five crashes", "## 2. The closure's accommodation".
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills: sources.md:812.
Exists today: compiler/StaticChecker.java:268-279 holds the `OverloadingChecker(index, env).checkOverloading()` call after an `if (!errors.isEmpty()) {... return result;}` (agrees). tools/distance/run.sh found. No ledger row.
Said elsewhere: F-53 (FACTS.md:58) "each unit stops at its first failing checker stage"; FACTS F-43, F-174, F-277, F-281, F-400 name OverloadingChecker. Skills: no hit for 'early return'.
Curator: none.

## F-43

Sources: E/perf-probes/nat/triage.md s.1 found.
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills none.
Exists today: OverloadingChecker.scala:79 is in scala_src/typechecker/ (`cacheOverloadChecks = ProjectProperties.getBoolean("fortress.analyzer.overload.cache", true)`), found; the same-named file in scala_src/overloading/ has other code at line 79 (`ls` of both). Gate sets the property: E/compile-ladder/climb-batch-36/gate/distance.txt line 1 shows `-Dfortress.analyzer.overload.cache=false`.
Said elsewhere: grep 'overload.cache' in .claude/skills/: no hit. F-53 (FACTS.md:58) names the distance run; its `distance.txt` header carries the property.
Curator: none.

## F-44

Sources: E/reviews/multiple-instantiation-exclusion.md s.1, s.2, s.3 found.
Commit: C0.
Cited by: FACTS F-48 (only); POSITIONS none; skills: sources.md:793.
Exists today: OverloadingOracle.scala:81-105 holds `satisfiesReturnTypeRule` (found, line 83); Papers/Implementation/TypeMapping.tex:125 found ("Because instantiated generic types can only extend other ground types..."); FortressLibrary.fsi:123-125 `TotalComparison extends { Comparison, StandardMinMax[\TotalComparison\] }` and :1055 `AnyMaybe extends { AnyUniqueItem }` agree; .fss:5172-5180 holds `andRelCond`/`andCondCombine` (:5174). Rows 458, 416 NEGATIVE-VERIFIED (agree). NOT FOUND: probe `ProbeMIEPick` (`find explorations -iname '*ProbeMIEPick*'` empty; named in E/reviews/multiple-instantiation-exclusion.md and others).
Said elsewhere: SKILL.md:132 "No type may extend two instantiations of one generic trait. This exclusion rule is why the number types are flat"; P-43 (POSITIONS.md:42) "The exclusion rule stays, and the number tower is flat (route A)."; F-45, F-47, F-48, F-50 cite it.
Curator: none.

## F-45

Sources: E/reviews/mie-probes/scope-call-site-dispatch.md s.3 found; E/compile-ladder/rung-generic-runtime/REPORT.md s.9 found; E/reviews/mie-probes/patents-forest-rule.md s.1 found; E/reviews/mie-probes/literature.md "What the field settled and what it did not" found.
Commit: C0.
Cited by: FACTS F-46, F-136; POSITIONS none; skills none.
Exists today: no test, file or row named. Cites F-136, F-46.
Said elsewhere: grep 'forest rule', 'specialisation hole' in fortress-repo/: none; in FACTS only F-46, F-47. F-136 (FACTS.md:232) "a generic top-level function, as an arm of a template dispatcher, is called at the dispatcher's own static parameters".
Curator: none.

## F-46

Sources: E/reviews/mie-probes/route-c-experiment.md s.2, s.3, s.4, s.5 found.
Commit: C0.
Cited by: FACTS F-45, F-47; POSITIONS P-43, P-95; skills: sources.md:866.
Exists today: no test, file or row named. Cites P-43, F-45, F-136.
Said elsewhere: grep 'route C'/'Route C' in fortress-repo/: none; P-43 (POSITIONS.md:42) states route A (flat tower) and keeps the rule; F-47 mentions "route C (F-46) would rescue neither...".
Curator: none.

## F-47

Sources: E/reviews/spec-refused-examples.md "What was found" found.
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills none.
Exists today: rows 331 NEGATIVE-VERIFIED (compiled prelude's non-parametric `Nothing`; agrees), 389 FIXED ("under walk, a generic trait's coercion is not applied"; entry says "walk applies such a coercion (row 389)": agrees), 404 NEGATIVE-VERIFIED (covariant accepted, not carried to run time; agrees). Cites F-46, F-167. `AltEmptyCoerce` not searched.
Said elsewhere: grep 'spec-refused', 'E1 to E10' in fortress-repo/: none; FACTS F-21, F-48, F-267 cite spec-refused-examples.
Curator: none.

## F-48

Sources: E/reviews/spec-refused-examples-judgement.md s.6 found ("## 6. Sizes and boolean arguments: one probe").
Commit: C0.
Cited by: FACTS F-44; POSITIONS none; skills none.
Exists today: compiler_tests/XXXBoolExtendsTwice, XXXNatExtendsTwice, XXXNatExcludeChecker found (.test and .fss). TypeAnalyzer.scala:548-555 shows `//Todo: Handle bool args` then `pEqv` for type and int args (agrees). Rows 406 NEGATIVE-VERIFIED, 414 NEGATIVE-VERIFIED, 402 FIXED ("covers type arguments only"; entry: "(row 402, fixed)"): all agree.
Said elsewhere: grep 'NatExtendsTwice' in fortress-repo/ and FACTS: none besides itself. F-44 (FACTS.md:49) "F-48 gives the kinds of static argument that the rule compares."
Curator: none.

## F-49

Sources: E/reviews/fill-overloads-ways.md s.2 found ("### 2. What each path does today, measured", under "The nine steps").
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills none.
Exists today: NOT FOUND: probe `FillBoxAny` (`grep -rl FillBoxAny explorations` hits only FACTS, FACTS-history, the consolidation-2026-10-22 notes and none of the reviews; `find explorations -iname '*FillBoxAny*'` empty). No row named. Cites F-158.
Said elsewhere: grep 'FillBoxAny', 'fill-overloads' in fortress-repo/ and FACTS: none besides itself.
Curator: none.

## F-50

Sources: E/reviews/overload-static-params-ways.md s.2, s.3 found.
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills: sources.md:792.
Exists today: rows 537 NEGATIVE-VERIFIED ("two generic declarations of one name whose parameters have different bounds compile and link, and the compiled run dies"; agrees), 400 NEGATIVE-VERIFIED ("drops an overload arm whose size, unfixed by the call, ... walk runs such arms"; agrees). Cites P-45, F-174, F-75, F-69.
Said elsewhere: F-75 (positional rule) is the only FACTS hit for 'positional rule'; grep 'differ in static parameters' in fortress-repo/: none.
Curator: none.

## F-51

Sources: E/reviews/numeric-hierarchy-integration-review/row388-container-probe.md exists.
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills none.
Exists today: ProjectFortress/tests/InferCoercionRungK.fss found (no .test beside it; `find` shows only .fss); compiler_tests/InferCoercionShapes.test found. Row 388 FIXED ("on both paths, a generic function's parameter of a declared, non-generic type is not converted by coercion"; entry says "(row 388, fixed)": agrees).
Said elsewhere: F-73 (FACTS.md:78) and F-137 (:233) give each path's rule; F-55 and F-137 name InferCoercionRungK. grep in fortress-repo/: none.
Curator: none.

## F-52

Sources: E/reviews/flattening-questions-ways.md "Question 3" found (## Question 3, line 619) and its s.2 found (### 2, line 651).
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills none.
Exists today: ProjectFortress/tests/conditionalExtension.fss found (also not_passing_yet/conditionalExtension.fss). Q3 probe captures `Q3ConditionalExtension.walk.txt`/`.comp.txt` removed by `84aef6a4f` (git show --stat lists both as deleted; agrees). No row.
Said elsewhere: grep 'RationalQuantity' in fortress-repo/: none; FACTS F-47 names it among the refused examples.
Curator: none.

## F-53

Sources: .claude/skills/coordinator/references/batch.md "The checker count and the distance" found (lines 58-65).
Commit: C0.
Cited by: FACTS F-34, F-42, F-44, F-54, F-61, F-66, F-75, F-83, F-85, F-90, F-151, F-220, F-237, F-245, F-256, F-281; POSITIONS P-33, P-39, P-57; skills: coordinator/references/sources.md:87, fortress-repo sources.md:878, :879, :887, :889.
Exists today: E/compile-ladder/climb-batch-36/gate/ holds checker-count.txt (`#total 0`, line 16), distance.txt (`#total 0`, `#crash none`, 0 `#class` lines), summary.txt; climb-batch-36 is the highest numbered dir (ls climb-batch-3*). compile-ladder/gate/distance-sites.tsv has only its header line (no sites; agrees "none now"). tools/checker-count/run.sh and tools/distance/run.sh found. No row.
Said elsewhere: compiler.md:4 "Script that runs the compiled checker over the interpreter's library ... Its total is the checker count."; coordinator batch.md:58 "the gate of every batch reports the checker count and the distance. Neither turns the gate red."; F-66 (FACTS.md:71).
Curator: none.

## F-54

Sources: E/perf-probes/prelude/distance-triage.md s.2 found; E/reviews/batch-28-review.md s.1 found ("### 1. The count 0, and the distance 0 with no crash...").
Commit: C0.
Cited by: FACTS F-53, F-240, F-288; POSITIONS none; skills none.
Exists today: tools/distance/classify.py and table.py found; table.py:112 is the `#class` print line (agrees). climb-batch-36 distance.txt: 0 `#class` rows, `#crash none` (agrees "at a distance of 0 there are none").
Said elsewhere: grep 'classify.py', '#class' in fortress-repo/: none; F-295 mentions classify.py. F-53 (FACTS.md:58) "classes the errors by root cause (F-54)".
Curator: none.

## F-55

Sources: E/compile-ladder/rung-inference-checker/REPORT.md s.3.2 found; E/compile-ladder/rung-inference-walk/REPORT.md s.2 and s.9 found.
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills: sources.md:795.
Exists today: tests/InferCoercionRungK.fss and compiler_tests/InferCoercionShapes.test found. Row 510 NEGATIVE-VERIFIED (typed binding does not fix a static argument that only a call's result mentions; agrees). Cites P-74, F-73, F-137, F-87, F-78.
Said elsewhere: revival-changes.md:68 "A type parameter that a call does not fix takes its bound ... The checker takes the intersection of its upper bounds, narrowed by the expected type."; F-137 (FACTS.md:233) "Under `walk`, a generic call's static arguments are inferred with coercion"; F-73 (:78).
Curator: none.

## F-56

Sources: E/reviews/numerics-plan-coordinator/measure-D.md s.1 found.
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills none.
Exists today: scala_src/typechecker/impls/Operators.scala:88-90 holds `// If this juxt is actually a fn app, then rewrite to a fn app.`, `case SJuxt(info, multi, infix, front::rest, true, true) ...`, `checkExpr(S_RewriteFnApp(...), expected)` (agrees); compiler_tests/InferCoercionShapes found. No row.
Said elsewhere: F-87 (FACTS.md:92) lists the other contexts that give a call its expected type. grep 'fnApp', 'tight juxtaposition' in fortress-repo/ and FACTS: none besides itself.
Curator: none.

## F-57

Sources: E/perf-probes/prelude/distance-triage.md s.2.3 found; E/reviews/numerics-plan-coordinator/evidence-B.md s.3.1, s.4.1, s.6.2 found.
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills: sources.md:1089, :1190, :1269.
Exists today: compiler/Types.java `useCompilerLibraries` (:79) and `useFortressLibraries` (:88) found. No row. Cites P-78, F-79, F-341, F-342.
Said elsewhere: F-341 (FACTS.md:273) "Walk's numeral is its default ... converts from them where its place fixes a type."; F-342 (:169) "The compiled checker converts a numeral where nothing fixes a type into its default"; F-59 (:64) and F-159 name the witness typecase. grep in fortress-repo/: no hit for 'witness typecase'.
Curator: none.

## F-58

Sources: E/compile-ladder/plan-32/probes/model-diffs.md "2. The states", "3. What the checker's count does and does not show", "5. The counts for F-58..." found; E/compile-ladder/plan-31/probes/model-closure-check.md "1. The counts" found; E/compile-ladder/plan-31/probes/switch-rehearsal.md "microGPT's flat program" found.
Commit: C0.
Cited by: FACTS F-352, F-369; POSITIONS none; skills: sources.md:1305.
Exists today: run.sh at E/compile-ladder/plan-31/probes/model-closure/run.sh found; E/run-c4/src/ holds FlatArrays.fss, FlatData.fss, MicroGptFlat.fss, MicroGptFlatQuick.fss (all four named files found; also MicroGptFlatCheck.fss, not named). No row named. Counts (42 sites) not re-measured (no run allowed).
Said elsewhere: grep '42 distinct' in fortress-repo/ and FACTS: none; F-61, F-156, F-362 mention FlatArrays.
Curator: none.

## F-59

Sources: E/reviews/sum-replacement-judgement.md s.5 found ("## 5. What each path does with each option"); "Table 2" is a bold line (**Table 2. Option A on the checker**, line 291), not a heading (`--check 'doc:...#Table 2'` NOT FOUND).
Commit: C0.
Cited by: FACTS F-364; POSITIONS none; skills: sources.md:796, :802, :1309, :1318, :1334.
Exists today: compiler_tests/WitnessIdentityRungG, InferBigOperatorUnwritten, InferBigOperatorSelfBound found (.test and .fss). No row. Cites P-78, P-48, F-364, F-221, F-228, F-143, F-285.
Said elsewhere: library.md:25 "For a call without it, the checker takes the reduction's expected type, or else its body's type"; revival-changes.md:122 "Where a reduction's bound names its parameter, as for `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, the two paths fix an unwritten static argument from different places."; F-364 (FACTS.md:173); P-78 (POSITIONS.md:95).
Curator: none.

## F-60

Sources: E/reviews/max-min-identities-judgement.md s.1, s.2 found; E/reviews/flattening-questions-ways.md "Question 1" found and its s.2 found (line 120).
Commit: C0.
Cited by: FACTS none; POSITIONS P-78; skills none.
Exists today: ProjectFortress/tests/simpleSum.fss found. No row. Not run (no tests allowed).
Said elsewhere: revival-changes.md:122 names `BIG MAX` and `BIG MIN` beside `SUM`; F-59, F-144, F-271, F-364 mention BIG MAX. grep 'EmptyReduction' in fortress-repo/ and FACTS: none besides itself.
Curator: none.

## F-61

Sources: E/perf-probes/prelude/REPORT.md s.5 and s.4 found ("## 5." line 395, "## 4." line 345).
Commit: C0.
Cited by: FACTS none; POSITIONS none; skills none.
Exists today: E/run-c4/src/FlatArrays.fss found; ProjectFortress/LibraryBuiltin/NativeArray.fss found. No row. Cites F-67, F-131, F-32, F-53 (F-53: 0 at climb batch 36; entry says 0 since batch 22).
Said elsewhere: grep 'Use FortressLibrary', 'shim' in fortress-repo/ and FACTS: none besides itself. The switch-over's natives wait is stated in fortress-repo SKILL.md ("The switch-over waits for walk's natives: each function that the interpreter's library binds with `builtinPrimitive` ... must first have a binding that the compiled path runs").
Curator: 2026-10-22 12:03Z block (FACTS-history.md:3445), by the clarity pass: 'the quoted question, "Use FortressLibrary for the compiler too" (the curator's, in the report's opening)'. The quote is the curator's; the block's time is the pass's, not the question's.

## F-62

Sources: E/compile-ladder/rung-comprises-checker/REPORT.md s.4 found ("## 4. What the specification settles").
Commit: C0.
Cited by: FACTS F-121; POSITIONS none; skills none.
Exists today: rows 595, 596, 407 all NEGATIVE-VERIFIED (595: Reflect breaks Type's comprises; 596: tests extend Exception below none of its listed types; 407: walk's exclusion test overflows on `comprises T`); entry's words agree. Cites P-44, F-72, F-171.
Said elsewhere: revival-changes.md:30 "A `comprises` clause speaks of values (P-60). Every value of the trait that declares it is a value of a listed type. So a generic trait need not be listed if every type below it is below a listed type, as `Integral[\I\]` below `AnyIntegral`."; F-171 (FACTS.md:334), F-72 (:77); SKILL.md:132 on comprises.
Curator: none.

