<!-- The record-landing workflow's mechanical checks, round final, in the worktree /home/user/fortress-landing-26 at 61f1c6a93: one line per check, then each command with its output, written by checks.sh. -->

# The mechanical checks, round final

- reset: the six record files at 61f1c6a93
- words-subset.py: no cut-only.txt, nothing to check
- words-subset.py, every POSITIONS line of final.apply: exit 1 (information)
- record.py apply final.apply: pass
- ledger-clarity/apply.py final.rewrite: pass
- record.py check --base 61f1c6a93: pass
- ledger.py check: pass
- ledger.py landing-check 4d27fbcc5: pass
- check-index.sh: pass
- plan-moves.py: pass
  - plan-moves.py lists 187 PLAN lines to look at (its LOOK lines below)
- queue-check.py: pass
- lengths.py: pass
- git diff --stat 61f1c6a93: pass

Every check passes.

## words-subset.py, every POSITIONS line of final.apply

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-26/tmp/positions.oEI6y8 --root /home/user/fortress-landing-26`, exit 1.

```
P-159: adds with, f-319, closed
words-subset: 1 entries, 1 add words

```

## record.py apply final.apply

`python3 /home/user/fortress-landing-26/explorations/coordinator/tools/record.py apply /home/user/fortress-landing-26/explorations/compile-ladder/climb-batch-26/record-landing/final.apply --by climb batch 26 landing workflow (Opus)`, exit 0.

```
F-34: rewritten
F-299: rewritten
F-320: rewritten
F-252: rewritten
F-257: rewritten
F-181: rewritten
P-159: rewritten
F-322: added

```

## ledger-clarity/apply.py final.rewrite

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../ledger-clarity/apply.py /home/user/fortress-landing-26/tmp/rows.hk8HmC --root /home/user/fortress-landing-26`, exit 0.

```
row 846: rewritten (1095 characters); its earlier line is in fortress-gap-ledger-history.md
apply.py: 1 changes

```

## record.py check --base 61f1c6a93

`python3 /home/user/fortress-landing-26/explorations/coordinator/tools/record.py check --base 61f1c6a93`, exit 0.

```
reported, not failing:
  FACTS.md: size: 212 entries over 600 characters: F-7 818, F-11 849, F-12 1308, F-18 1266, F-19 1743, F-20 948, F-21 1049, F-22 1482, F-24 950, F-25 948, F-26 1878, F-27 1769, F-29 1568, F-269 1197, F-291 1203, F-301 1509, F-302 1318, F-32 1953, F-34 1525, F-35 1166, F-37 755, F-39 1365, F-40 1856, F-41 944, F-42 633, F-43 705, F-44 1779, F-45 1591, F-46 1445, F-47 1548, F-48 965, F-49 646, F-50 1035, F-51 623, F-52 844, F-53 1701, F-54 608, F-55 954, F-57 1447, F-58 1466, F-59 1389, F-60 697, F-61 998, F-63 1264, F-64 848, F-65 786, F-66 794, F-67 998, F-69 745, F-70 902, F-71 860, F-72 794, F-73 1252, F-74 1513, F-75 1206, F-76 1576, F-77 619, F-78 1262, F-79 1435, F-80 1202, F-81 1100, F-82 1010, F-83 1375, F-84 1631, F-85 1353, F-86 783, F-87 1269, F-90 1755, F-91 604, F-94 682, F-221 827, F-225 2383, F-226 1228, F-227 1536, F-231 1126, F-232 1409, F-235 1157, F-236 786, F-237 1779, F-240 1975, F-242 1056, F-243 1159, F-244 1210, F-245 1330, F-250 1293, F-251 1467, F-254 1099, F-255 2450, F-256 2408, F-265 1269, F-266 796, F-276 1430, F-277 1353, F-278 1566, F-281 1501, F-282 2601, F-285 1622, F-286 1146, F-287 1204, F-288 1094, F-289 601, F-290 854, F-292 892, F-294 1011, F-296 1136, F-297 1680, F-298 2090, F-299 3149, F-303 1760, F-306 1274, F-307 994, F-308 1950, F-309 981, F-310 940, F-311 912, F-312 1298, F-313 1105, F-314 1035, F-315 1210, F-320 1424, F-321 1280, F-322 855, F-99 781, F-100 1059, F-102 783, F-103 749, F-104 913, F-106 1047, F-107 891, F-108 878, F-111 1364, F-112 756, F-203 1543, F-234 1221, F-283 721, F-295 706, F-118 1218, F-119 830, F-121 1870, F-122 881, F-123 913, F-124 1121, F-125 663, F-128 775, F-129 1319, F-130 810, F-131 1330, F-132 1187, F-133 1238, F-135 693, F-136 1642, F-137 1613, F-140 1671, F-141 2282, F-142 958, F-143 1851, F-144 1412, F-145 1413, F-146 1023, F-147 1442, F-228 2308, F-230 768, F-239 959, F-248 745, F-249 1035, F-252 4166, F-253 2085, F-257 1907, F-258 2830, F-259 1236, F-263 1933, F-270 1676, F-274 1198, F-275 1811, F-280 723, F-304 873, F-305 1479, F-316 958, F-318 2033, F-151 1649, F-154 967, F-155 1117, F-157 1117, F-158 632, F-159 1731, F-229 1609, F-264 2093, F-279 766, F-317 763, F-163 837, F-165 892, F-166 778, F-167 1150, F-168 973, F-169 1126, F-170 689, F-171 1186, F-172 1035, F-173 1718, F-174 2149, F-175 1298, F-176 1168, F-223 1894, F-271 734, F-272 1148, F-273 1324, F-300 865, F-319 1073, F-180 2349, F-181 1636, F-182 910, F-183 879
  POSITIONS.md: size: 72 entries over 600 characters: P-7 844, P-9 1279, P-10 630, P-11 709, P-12 720, P-19 758, P-25 1303, P-26 1344, P-27 829, P-28 828, P-29 670, P-30 747, P-32 805, P-33 1247, P-37 1124, P-38 702, P-39 1402, P-40 1716, P-41 823, P-43 662, P-44 1386, P-45 1922, P-46 1174, P-47 933, P-48 1563, P-49 679, P-50 772, P-51 1019, P-54 831, P-55 1001, P-56 1114, P-57 1053, P-58 1164, P-59 774, P-60 1927, P-62 738, P-146 1116, P-147 1274, P-148 888, P-149 1049, P-151 1587, P-152 1412, P-154 1306, P-155 1147, P-156 1693, P-157 1214, P-158 752, P-160 1274, P-68 649, P-69 1126, P-71 792, P-72 665, P-73 1051, P-74 883, P-75 660, P-76 1182, P-78 1395, P-79 1032, P-80 987, P-153 1071, P-159 1280, P-84 933, P-85 851, P-87 968, P-88 1036, P-91 911, P-95 683, P-96 987, P-97 1146, P-102 704, P-103 648, P-125 602
record.py check: FACTS.md 254 entries, POSITIONS.md 86 entries; 0 failures; reported: size 2

```

## ledger.py check

`python3 /home/user/fortress-landing-26/explorations/coordinator/tools/ledger.py check --summary`, exit 0.

```
ledger.py check: fortress-gap-ledger.md, 894 rows, 0 fail the template

```

## ledger.py landing-check 4d27fbcc5

`python3 /home/user/fortress-landing-26/explorations/coordinator/tools/ledger.py landing-check 4d27fbcc5`, exit 0.

```
ledger.py landing-check: 4d27fbcc5..HEAD: no finding

```

## check-index.sh

`bash explorations/coordinator/check-index.sh`, exit 0.

```
INDEX.md check — 61f1c6a93
notes in scope: 490   index entries: 565

== notes missing from INDEX.md (0) ==

== index lines naming a file that does not exist (0) ==

== index lines outside the note set, informational (70) ==
explorations/compile-ladder/climb-batch-15b/RECORD.md
explorations/compile-ladder/climb-batch-3/JUDGE-review.md
explorations/compile-ladder/climb-batch-3/RECORD.md
explorations/compile-ladder/climb-batch-3/REPAIR-review.md
explorations/compile-ladder/climb-batch-4/RECORD.md
explorations/compile-ladder/climb-batch-5/followup-calculi/NOTE.md
explorations/compile-ladder/plan-25/probes/NOTES.md
explorations/compile-ladder/plan-n/probe-q/PROBE-Q.md
explorations/compile-ladder/rung-integral-ops/shift-history.md
explorations/compile-ladder/rung-library-defects/REPORT.md
explorations/compile-ladder/rung-rr64-functions/round-history.md
explorations/compiler-probes/maybe-inference/inference.md
explorations/compiler-probes/vectors/vectors.md
explorations/coordinator/tools/record-landing/README.md
explorations/coordinator/tools/transcript-study/README.md
explorations/perf-probes/abstract-sibling-body/REPORT.md
explorations/perf-probes/anyintegral-comprises-where/REPORT.md
explorations/perf-probes/array-sites/REPORT.md
explorations/perf-probes/bound-any-compiled/REPORT.md
explorations/perf-probes/checker-bound-defects/REPORT.md
explorations/perf-probes/checker-speed-2/REPORT.md
explorations/perf-probes/checker-speed/REPORT.md
explorations/perf-probes/codegen-distance/REPORT.md
explorations/perf-probes/condition-zeroindexed/REPORT.md
explorations/perf-probes/existential-reduction/REPORT.md
explorations/perf-probes/export-abstract-codegen/REPORT.md
explorations/perf-probes/export-check-full/REPORT.md
explorations/perf-probes/generic-distribute/REPORT.md
explorations/perf-probes/helper-calls/REPORT.md
explorations/perf-probes/immutable-arrays/REPORT.md
explorations/perf-probes/integer-power/REPORT.md
explorations/perf-probes/loader-declaring-type/REPORT.md
explorations/perf-probes/nan-check-cost/REPORT.md
explorations/perf-probes/nat/REPORT.md
explorations/perf-probes/nat/followup.md
explorations/perf-probes/nat/java.md
explorations/perf-probes/nat/opr-kind-history.md
explorations/perf-probes/nat/runtime.md
explorations/perf-probes/nat/size-cost.md
explorations/perf-probes/nat/size-probes.md
explorations/perf-probes/nat/size-rung-probes.md
explorations/perf-probes/nat/triage.md
explorations/perf-probes/nat/zero.md
explorations/perf-probes/prelude/distance-triage.md
explorations/perf-probes/prelude/exclusion-trace.md
explorations/perf-probes/prelude/natives-binding-probe.md
explorations/perf-probes/prelude/natives-shape.md
explorations/perf-probes/prelude/switch-over-distance-flat.md
explorations/perf-probes/prelude/switch-over-distance.md
explorations/perf-probes/self-type-exclusion/REPORT.md
explorations/perf-probes/self-type-idiom/REPORT.md
explorations/perf-probes/symbolic-operators-2/REPORT.md
explorations/perf-probes/symbolic-operators/REPORT.md
explorations/perf-probes/symbolic-operators/SORT.md
explorations/perf-probes/team-demos/REPORT.md
explorations/perf-probes/trait-generic-method-inference/REPORT.md
explorations/perf-probes/transactions/REPORT.md
explorations/perf-probes/walk-conditional-extension/REPORT.md
explorations/perf-probes/walk-generic-static/REPORT.md
explorations/perf-probes/walk-plain-bound/REPORT.md
explorations/perf-probes/where-clauses/REPORT.md
explorations/reviews/mie-probes/dispatch-and-route-c.md
explorations/reviews/mie-probes/flat-world-for-users.md
explorations/reviews/mie-probes/literature.md
explorations/reviews/mie-probes/patents-forest-rule.md
explorations/reviews/mie-probes/price-keep-the-rule.md
explorations/reviews/mie-probes/route-c-experiment.md
explorations/reviews/mie-probes/scope-call-site-dispatch.md
explorations/reviews/mie-probes/spec-sentences-dated.md
explorations/run-c4/probes/vocabulary/diag-override.md

== paths named in a line's prose that resolve nowhere (2) ==
library-scalar-extension-review-probes/run-all.sh
tests/ComprisesOwnTypeParameter.fss

```

## plan-moves.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/plan-moves.py --root /home/user/fortress-landing-26 --base 61f1c6a93`, exit 0.

```
plan-moves: 28 lines taken out of PLAN.md; PLAN-history.md gained 38 lines, under 9 headings
  gained heading: ### Where we stand
  gained heading: ### Pavol's answers, in the order they are needed
  gained heading: ### Climb batch 13, listed for his review
  gained heading: ### Climb batch 21, listed for his review
  gained heading: ### Phase 4. The switch-over
  gained heading: ### Climb batch 23, listed for his review
  gained heading: ### Climb batch 24, listed for his review
  gained heading: ## Climb batch 26's landing, 2026-11-05
  gained heading: ### Climb batch 26, listed for his review
LOOK PLAN.md:49, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 326. The line: - The 109 that cannot name their helper as a bare string: the 76 and the 5 moved are in F-308, F-313 and F-311. The way for each of the 25 left, `ZZ32`'s `big` 
LOOK PLAN.md:77, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, the walk half of the numeral switch (P-76; `reviews/numeral-switch-judgement.md` section 4.4), in the batch whose step gives walk the checker's static
LOOK PLAN.md:148, under "Pavol's answers, in the order they are needed": settled: its own review-queue item is in (a): 109. The line: - Item 22, `TotalComparison` extending `StandardMinMax` (P-98), explained in more detail when he has the energy. Review-queue item 109 (closed at the cleanup of
LOOK PLAN.md:185, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280c "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
LOOK PLAN.md:194, under "Off the path, parked": settled: its own review-queue item is in (a): 167. The line: - Row 331's bare `Nothing` re-gated on type inference, in place of the gate on `where` clauses that P-90 sets, and the decisions judgement's candidate rows 2, 3
LOOK PLAN.md:195, under "Off the path, parked": settled: its own review-queue item is in (a): 28. The line: - Row 360, a numeral within half an ulp of a tie, which rounds as its nearest double on both paths; default as both paths do it, gated. Review-queue item 28 (cl
LOOK PLAN.md:198, under "Off the path, parked": settled: its own review-queue item is in (a): 111. The line: - Climb batch 7's rung H's repair of the `Condition` site: a program's own `p1 ANDCOND p2` of two relational predicates is no longer a relational predicate unde
LOOK PLAN.md:199, under "Off the path, parked": settled: its own review-queue item is in (a): 110. The line: - `LessThan`'s and `GreaterThan`'s `CMP` answer the converse of their own `<` (row 456), and `LEXICO Unordered` answers `Unordered` (row 457); not repaired, sin
LOOK PLAN.md:200, under "Off the path, parked": settled: its own review-queue item is in (a): 112. The line: - `fill` and `tabulate` sit where the array diamond meets, `StandardMutableArrayType` and `ImmutableArray1`, not in each leaf trait answer 10 names; his to conf
LOOK PLAN.md:201, under "Off the path, parked": settled: its own review-queue item is in (a): 113. The line: - The factories' function forms are named `tabulatedArray1` to `tabulatedArray3` and `tabulatedVector`; his to change, 4 declarations and 8 calls; default as la
LOOK PLAN.md:202, under "Off the path, parked": settled: its own review-queue item is in (a): 154. The line: - Climb batch 7R's rung J restated row 452's test to a `ZZ32` range of converted bounds and renamed it `RangeSizeRungO.fss`; default as landed. Review-queue ite
LOOK PLAN.md:203, under "Off the path, parked": settled: its own review-queue item is in (a): 141. The line: - Climb batch 7R's rung U respelled over `ZZ32` a third passage, the adapted `BlockedRange` of `Specification/advanced/parallelism-locality/defining-generators.
LOOK PLAN.md:204, under "Off the path, parked": settled: its own review-queue item is in (a): 168. The line: - `checkDeclComprises`'s header comment lists the eligibility rule's three cases, not the fourth climb batch 7C's rung Y added; the rung recommends a two-line a
LOOK PLAN.md:205, under "Off the path, parked": settled: its own review-queue item is in (a): 13. The line: - The `comprises` check he approved, landed by climb batch 7C's rung Y, decides by names (rows 489 and 490; F-72): by how an extender spells its type variable, 
LOOK PLAN.md:206, under "Off the path, parked": settled: its own review-queue item is in (a): 139. The line: - Climb batch 7C's rung X's three wording decisions in the `comprises` text (D1, D2, D8), and `SkTwoLevel`, which the text and both checkers refuse while walk r
LOOK PLAN.md:207, under "Off the path, parked": settled: its own review-queue item is in (a): 140. The line: - Climb batch 7R's rung U's two notations: ℤ's factorial as the recurrence `0! = 1`, `(m+1)! = (m+1) m!`, and the midpoint `lo + (hi − lo) DIV 2` without the te
LOOK PLAN.md:208, under "Off the path, parked": settled: its own review-queue item is in (a): 85. The line: - Taken as a default by the conversion judgement and listed with items 28 and 29: walk promotes from run-time types, so where a variable is declared wider than 
LOOK PLAN.md:209, under "Off the path, parked": settled: its own review-queue item is in (a): 159. The line: - Climb batch 6.5's rung G's dispatch change answers differently for a class it was not measured on (`SkPosBox`, `SkPosFixed`), a defect of the template dispatc
LOOK PLAN.md:210, under "Off the path, parked": settled: its own review-queue item is in (a): 142. The line: - Climb batch 6.5's rung P made ℚ's listing extend the four algebraic traits the library declares on `QQ`, with a sentence on where their laws hold; default as 
LOOK PLAN.md:211, under "Off the path, parked": settled: its own review-queue item is in (a): 143. The line: - Climb batch 6.5's rung P stated `narrow` on `ZZ` (rows 349 and 442) and reworded `MaybeRungM`'s comment; default as landed. Review-queue item 143 (closed at t
LOOK PLAN.md:212, under "Off the path, parked": settled: its own review-queue item is in (a): 144. The line: - Row 500: three `shift` properties of the integer chapter are wrong or garbled, the Working Draft's; left for whoever gives the library these methods. Review-q
LOOK PLAN.md:213, under "Off the path, parked": settled: its own review-queue item is in (a): 155. The line: - Climb batch 6.5's rung P showed its first `XXX` walk test red on a control copy, not on a local fix of `QQ`'s `=`; default as landed. Review-queue item 155 (c
LOOK PLAN.md:214, under "Off the path, parked": settled: its own review-queue item is in (a): 145. The line: - Climb batch 6.5's rung P's met stop: the overview says a fixed-size `GCD` or `LCM` result the type cannot hold raises `IntegerOverflow`; walk does on `NN32` a
LOOK PLAN.md:215, under "Off the path, parked": settled: its own review-queue item is in (a): 96. The line: - A numeral too large for every declaration of a call is refused, climb batch N's rung I's reading of Q1's default; default as landed. Review-queue item 96 (clo
LOOK PLAN.md:216, under "Off the path, parked": settled: its own review-queue item is in (a): 52. The line: - How climb batch N's rung I ranks a generic declaration among those applicable only with coercion, a judge's decision under a silent text; default as landed. R
LOOK PLAN.md:217, under "Off the path, parked": settled: its own review-queue item is in (a): 53. The line: - Rung I's fallback for a call no attempt keeps: the first attempt that holds a candidate; default as landed. Review-queue item 53 (closed at the cleanup of 202
LOOK PLAN.md:218, under "Off the path, parked": settled: its own review-queue item is in (a): 160. The line: - Climb batch N's rung K edited `Init.java`, outside its record's list, to call `Coercions.reset()`, the team's idiom for a static cache; default as landed. Rev
LOOK PLAN.md:219, under "Off the path, parked": settled: its own review-queue item is in (a): 86. The line: - `Coercions.addSource` under walk leaves a generic `coerce` out of the sources it ranks, so a choice between two coercions into a generic trait can only be amb
LOOK PLAN.md:220, under "Off the path, parked": settled: its own review-queue item is in (a): 87. The line: - Answer 8's promotion reaches user-declared coercions under walk, and climb batch N's rung I's checker agrees; default as landed. Review-queue item 87 (closed 
LOOK PLAN.md:221, under "Off the path, parked": settled: its own review-queue item is in (a): 146. The line: - The kinds of static parameter climb batch N's rung T's chapter describes, type, `nat` and `int`, with `bool`, `dim`, `unit` and operator parameters named as n
LOOK PLAN.md:222, under "Off the path, parked": settled: its own review-queue item is in (a): 97. The line: - Row 325's faces: a numeral converts only into a type that holds its value (`XXXNumeralBeyondWidthMax`), and a numeral beyond `ZZ32` as a range component is pi
LOOK PLAN.md:223, under "Off the path, parked": settled: its own review-queue item is in (a): 147. The line: - Climb batch N's rung T's six text decisions in the inference chapter; default as landed. Review-queue item 147 (closed at the cleanup of 2026-11-05: learning)
LOOK PLAN.md:225, under "Off the path, parked": settled: its own review-queue item is in (a): 54. The line: - Climb batch N's gated inference gaps, off the path until the distance stage or microGPT meets one, each gated by an expected failure: rows 506 (the coercion a
LOOK PLAN.md:253, under "Climb batch N's first run, listed for his review": settled: its own review-queue item is in (a): 89. The line: - `ZZ32` with `NN32` gives `ZZ64` on the one library and `ZZ` on the compiler prelude until the switch-over (answer 8; section 1, read from the record, not aske
LOOK PLAN.md:255, under "Climb batch N's first run, listed for his review": settled: its own review-queue item is in (a): 91. The line: - Q-walk makes walk convert a body to its declared return type (row 387), so that `getter zero(): ZZ32 = 0` returns no `IntLiteral`; default as the record reads
LOOK PLAN.md:256, under "Climb batch N's first run, listed for his review": settled: its own review-queue item is in (a): 92. The line: - `FloatLiteral` unchanged by the numeral switch; default as landed. Review-queue item 92 (closed at the cleanup of 2026-11-05: learning).
LOOK PLAN.md:258, under "Climb batch N's first run, listed for his review": settled: its own review-queue item is in (a): 148. The line: - Rung M's list, on file (`compile-ladder/rung-integer-minmax/probes/for-pavol.txt`): its one point with no line, the home-2 pair `XXXMaxNN32IntoZZ64RungM` outs
LOOK PLAN.md:264, under "Climb batch 6.5b, listed for his review": settled: its own review-queue item is in (a): 98. The line: - The judge's decision on walk's static arithmetic, from climb batch 6.5b's rung E: a size written as arithmetic is refused at any operation that leaves `ZZ64`;
LOOK PLAN.md:266, under "Climb batch 6.5b, listed for his review": settled: its own review-queue item is in (a): 99. The line: - Under walk an array of a static size from 2^31 to 2^32−1 dies with a raw `NegativeArraySizeException` (row 527); default as landed, no batch named. Review-que
LOOK PLAN.md:267, under "Climb batch 6.5b, listed for his review": settled: its own review-queue item is in (a): 102. The line: - `MIN # 0` and its siblings build the library's own empty range, so the printed bounds are not the ones written; default as landed. Review-queue item 102 (clos
LOOK PLAN.md:268, under "Climb batch 6.5b, listed for his review": settled: its own review-queue item is in (a): 100. The line: - `XXXNatRangeChecker` gives 16 errors for 7 written sites, a design limit of the compiled refusal; recorded, not repaired. Review-queue item 100 (closed at the
LOOK PLAN.md:274, under "Cli
... (cut at 12000 characters)
```

## queue-check.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/queue-check.py --root /home/user/fortress-landing-26 --base 61f1c6a93`, exit 0.

```
queue-check: 352 items, 13 new (355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367); open 78, consequential 49, routine 29; pass

```

## lengths.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/lengths.py --root /home/user/fortress-landing-26 --base 61f1c6a93`, exit 0.

```
lengths: 8 entries changed
- F-34: 1702 to 1525 characters (-177), over 600
- F-181: 1639 to 1636 characters (-3), over 600
- F-252: 4262 to 4166 characters (-96), over 600
- F-257: 2154 to 1907 characters (-247), over 600
- F-299: 3263 to 3149 characters (-114), over 600
- F-320: 1498 to 1424 characters (-74), over 600
- F-322: none to 855 characters (+855), over 600
- P-159: 1289 to 1280 characters (-9), over 600
lengths: 0 already over 600 grew

```

## git diff --stat 61f1c6a93

`git diff --stat 61f1c6a93 -- explorations/`, exit 0.

```
 explorations/coordinator/FACTS-history.md          |  40 +++++
 explorations/coordinator/FACTS.md                  |  13 +-
 explorations/coordinator/INDEX.md                  |   2 +-
 explorations/coordinator/PLAN-history.md           |  63 ++++++++
 explorations/coordinator/PLAN.md                   |  63 ++++----
 explorations/coordinator/POSITIONS-history.md      |   6 +
 explorations/coordinator/POSITIONS.md              |   2 +-
 .../coordinator/map/compile-path-walkthrough.md    |   8 +-
 .../coordinator/map/spec-to-implementation.md      |   2 +-
 explorations/coordinator/review-queue.md           | 173 +++++++++++++++++----
 explorations/fortress-gap-ledger-history.md        |   6 +
 explorations/fortress-gap-ledger.md                |   2 +-
 12 files changed, 303 insertions(+), 77 deletions(-)

```

