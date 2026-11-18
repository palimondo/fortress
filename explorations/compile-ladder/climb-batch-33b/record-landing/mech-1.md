<!-- The record-landing workflow's mechanical checks, round 1, in the worktree /home/user/fortress-landing-33b at 8c13a52ec: one line per check, then each command with its output, written by checks.sh. -->

# The mechanical checks, round 1

- reset: the six record files at 8c13a52ec
- words-subset.py: no cut-only.txt, nothing to check
- words-subset.py, every POSITIONS line of record.apply: exit 1 (information)
- record.py apply record.apply: pass
- ledger-clarity/apply.py rows.rewrite: pass
- ledger.py add, row line 1 of rows.add, in "12. The compiled path: constructs, crashes and the switch-over": pass
  - row 1089, in "12. The compiled path: constructs, crashes and the switch-over"
- record.py check --base 8c13a52ec: pass
- ledger.py check: pass
- ledger.py landing-check c79985147: pass
- check-index.sh: pass
- plan-moves.py: pass
  - plan-moves.py lists 5 PLAN lines to look at (its LOOK lines below)
- queue-check.py: pass
- lengths.py: pass
  - lengths.py: already over 600, and grew: F-136 (+46), F-352 (+32), F-353 (+61), F-390 (+32)
- git diff --stat 8c13a52ec: pass

Every check passes.

## words-subset.py, every POSITIONS line of record.apply

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-33b/tmp/positions.sq5Gl2 --root /home/user/fortress-landing-33b`, exit 1.

```
P-33: adds f-381
P-178: adds compiled, let, died, ran
words-subset: 2 entries, 2 add words

```

## record.py apply record.apply

`python3 /home/user/fortress-landing-33b/explorations/coordinator/tools/record.py apply /home/user/fortress-landing-33b/explorations/compile-ladder/climb-batch-33b/record-landing/record.apply --by climb batch 33b landing workflow (Opus)`, exit 0.

```
F-34: rewritten
F-86: rewritten
F-128: rewritten
F-301: rewritten
F-302: rewritten
F-315: rewritten
F-320: rewritten
F-338: rewritten
F-388: rewritten
F-389: rewritten
F-390: rewritten
F-391: rewritten
F-352: rewritten
F-136: rewritten
F-353: rewritten
F-181: rewritten
P-33: rewritten
P-178: rewritten

```

## ledger-clarity/apply.py rows.rewrite

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../ledger-clarity/apply.py /home/user/fortress-landing-33b/tmp/rows.fF2hyS --root /home/user/fortress-landing-33b`, exit 0.

```
row 546: rewritten (1187 characters); its earlier line is in fortress-gap-ledger-history.md
row 604: rewritten (1127 characters); its earlier line is in fortress-gap-ledger-history.md
row 1017: rewritten (1190 characters); its earlier line is in fortress-gap-ledger-history.md
apply.py: 3 changes

```

## ledger.py add, row line 1 of rows.add, in "12. The compiled path: constructs, crashes and the switch-over"

`python3 /home/user/fortress-landing-33b/explorations/coordinator/tools/ledger.py add /home/user/fortress-landing-33b/tmp/adds.dDILht/row-1.txt --section 12. The compiled path: constructs, crashes and the switch-over`, exit 0.

```
row 1089, in "12. The compiled path: constructs, crashes and the switch-over"
rows that cite the same files: 34, 35, 63, 64, 75, 76, 109, 174, 316, 318, 321, 334, 336, 347, 348, 349, 350, 363, 369, 374 and 47 more

```

## record.py check --base 8c13a52ec

`python3 /home/user/fortress-landing-33b/explorations/coordinator/tools/record.py check --base 8c13a52ec`, exit 0.

```
reported, not failing:
  FACTS.md: size: 280 entries over 600 characters: F-7 818, F-9 705, F-11 848, F-12 1308, F-18 1413, F-19 2028, F-20 948, F-21 1049, F-22 1482, F-24 951, F-25 948, F-26 1878, F-27 1769, F-29 1557, F-269 1197, F-291 1322, F-301 1668, F-302 1278, F-348 1444, F-350 1544, F-351 1768, F-355 1498, F-356 1396, F-357 774, F-358 1361, F-32 1897, F-34 1957, F-35 1166, F-37 755, F-39 1365, F-40 1856, F-41 944, F-42 633, F-43 705, F-44 1832, F-45 1591, F-46 1445, F-47 1548, F-48 965, F-49 646, F-50 1035, F-51 623, F-52 844, F-53 1377, F-54 740, F-55 956, F-57 1466, F-58 2401, F-59 1582, F-60 697, F-61 998, F-63 1265, F-64 848, F-65 786, F-66 794, F-67 998, F-69 745, F-70 902, F-71 860, F-72 794, F-73 1452, F-74 808, F-75 1999, F-76 1631, F-77 619, F-78 1262, F-79 1360, F-80 1202, F-81 1100, F-82 1010, F-83 1375, F-84 1456, F-85 1353, F-86 891, F-87 1228, F-90 1755, F-91 604, F-94 682, F-221 860, F-225 2685, F-226 1228, F-227 1536, F-231 1126, F-232 1409, F-235 1157, F-236 786, F-237 1779, F-240 2202, F-242 1056, F-243 1159, F-244 1210, F-245 1330, F-250 1293, F-251 1467, F-254 1099, F-255 2519, F-256 2408, F-265 1269, F-266 933, F-276 1430, F-277 1353, F-278 1561, F-281 1529, F-282 2506, F-285 1683, F-286 1146, F-287 1204, F-288 1178, F-289 601, F-290 1313, F-292 892, F-293 640, F-294 1011, F-296 1151, F-297 1680, F-298 2090, F-299 3232, F-303 1485, F-306 1307, F-307 1106, F-308 2098, F-309 981, F-310 935, F-311 681, F-312 1302, F-313 1132, F-314 1066, F-315 1321, F-320 1570, F-321 1593, F-322 855, F-323 1115, F-325 1397, F-327 1232, F-328 1004, F-330 1083, F-332 1303, F-333 1445, F-334 940, F-335 1083, F-336 665, F-337 1176, F-342 1816, F-344 850, F-352 2216, F-353 1686, F-364 2102, F-365 2423, F-370 1314, F-376 1098, F-381 942, F-390 1520, F-391 1243, F-99 781, F-100 1059, F-102 783, F-103 749, F-104 913, F-106 1047, F-107 891, F-108 878, F-111 1364, F-112 798, F-203 1543, F-234 1221, F-283 989, F-295 706, F-354 926, F-118 1363, F-119 830, F-121 1870, F-122 934, F-123 1085, F-124 1121, F-125 663, F-128 1139, F-129 1506, F-130 810, F-131 1405, F-132 1227, F-133 1238, F-134 645, F-135 693, F-136 1688, F-137 1449, F-140 1727, F-141 2282, F-142 958, F-143 1851, F-144 1412, F-145 1413, F-146 1023, F-147 1442, F-228 2330, F-230 768, F-239 959, F-248 745, F-249 1131, F-252 4330, F-253 2088, F-257 2036, F-258 2830, F-259 1236, F-262 1329, F-263 1720, F-270 1676, F-274 1198, F-275 1811, F-280 868, F-305 1468, F-316 958, F-318 2086, F-324 1080, F-326 1087, F-329 828, F-331 1328, F-339 1090, F-340 1350, F-341 2272, F-343 1281, F-347 1558, F-349 965, F-362 1340, F-363 1881, F-366 2941, F-367 1957, F-369 1875, F-372 2110, F-373 2104, F-374 1770, F-375 2206, F-377 2469, F-378 1329, F-380 1366, F-382 1103, F-384 1322, F-385 1278, F-386 1431, F-387 750, F-388 1298, F-389 1213, F-151 1614, F-154 967, F-155 1117, F-157 1117, F-158 632, F-159 1735, F-229 1557, F-264 2093, F-279 766, F-317 763, F-361 1539, F-368 1317, F-379 1618, F-163 837, F-165 892, F-166 778, F-167 1150, F-168 973, F-169 1191, F-170 689, F-171 1186, F-172 1241, F-173 1718, F-174 2179, F-175 1204, F-176 1168, F-223 1894, F-271 734, F-272 1148, F-273 1324, F-300 865, F-319 1133, F-345 1580, F-359 1429, F-371 1306, F-180 2337, F-181 1636, F-182 910, F-183 879
  POSITIONS.md: size: 90 entries over 600 characters: P-7 844, P-9 1279, P-10 630, P-11 709, P-12 780, P-19 758, P-25 1303, P-26 1344, P-27 829, P-28 828, P-29 670, P-30 747, P-32 805, P-33 1862, P-175 1699, P-37 1383, P-38 702, P-39 1402, P-40 1962, P-41 823, P-43 662, P-44 1386, P-45 1922, P-46 2357, P-47 933, P-48 1563, P-49 982, P-50 772, P-51 1019, P-54 831, P-55 1001, P-56 1114, P-57 1053, P-58 1674, P-59 774, P-60 1927, P-62 738, P-146 1116, P-147 1274, P-148 888, P-149 1049, P-151 1587, P-152 1412, P-154 1179, P-155 1147, P-156 1693, P-157 1214, P-158 752, P-160 1380, P-162 2037, P-163 1670, P-164 2190, P-167 1661, P-169 2561, P-170 1071, P-69 1126, P-71 792, P-72 665, P-73 1051, P-74 883, P-75 660, P-76 864, P-78 1272, P-79 857, P-80 987, P-153 1071, P-159 1278, P-161 1771, P-165 1648, P-166 1147, P-168 1701, P-171 1839, P-172 2060, P-173 3561, P-174 2243, P-176 1097, P-178 1542, P-84 1233, P-85 884, P-87 968, P-88 1036, P-91 911, P-95 683, P-96 987, P-97 1146, P-179 777, P-102 704, P-103 648, P-125 602, P-177 689
  POSITIONS-history.md:3666: from: P-169: no heading of explorations/coordinator/HELD.md holds "Held in chat (2026-11-07)"
record.py check: FACTS.md 321 entries, POSITIONS.md 105 entries; 0 failures; reported: from 1, size 2

```

## ledger.py check

`python3 /home/user/fortress-landing-33b/explorations/coordinator/tools/ledger.py check --summary`, exit 0.

```
ledger.py check: fortress-gap-ledger.md, 1088 rows, 0 fail the template

```

## ledger.py landing-check c79985147

`python3 /home/user/fortress-landing-33b/explorations/coordinator/tools/ledger.py landing-check c79985147`, exit 0.

```
ledger.py landing-check: c79985147..HEAD: no finding

```

## check-index.sh

`bash explorations/coordinator/check-index.sh`, exit 0.

```
INDEX.md check — 8c13a52ec6
notes in scope: 576   index entries: 666

== notes missing from INDEX.md (0) ==

== index lines naming a file that does not exist (0) ==

== index lines outside the note set, informational (85) ==
explorations/compile-ladder/climb-batch-15b/RECORD.md
explorations/compile-ladder/climb-batch-3/JUDGE-review.md
explorations/compile-ladder/climb-batch-3/RECORD.md
explorations/compile-ladder/climb-batch-3/REPAIR-review.md
explorations/compile-ladder/climb-batch-4/RECORD.md
explorations/compile-ladder/climb-batch-5/followup-calculi/NOTE.md
explorations/compile-ladder/plan-25/probes/NOTES.md
explorations/compile-ladder/plan-29/PROBES.md
explorations/compile-ladder/plan-29/probes/literal-default.md
explorations/compile-ladder/plan-29b/PROBES.md
explorations/compile-ladder/plan-30/PROBES.md
explorations/compile-ladder/plan-30/probes/draft-numerals.md
explorations/compile-ladder/plan-31/PROBES.md
explorations/compile-ladder/plan-31/probes/number-object-merge.md
explorations/compile-ladder/plan-31/probes/probe-y.md
explorations/compile-ladder/plan-31/probes/switch-rehearsal.md
explorations/compile-ladder/plan-32/PROBES.md
explorations/compile-ladder/plan-32/probes/model-diffs.md
explorations/compile-ladder/plan-33/PROBES.md
explorations/compile-ladder/plan-n/probe-q/PROBE-Q.md
explorations/compile-ladder/rung-integral-ops/shift-history.md
explorations/compile-ladder/rung-library-defects/REPORT.md
explorations/compile-ladder/rung-rr64-functions/round-history.md
explorations/compiler-probes/maybe-inference/inference.md
explorations/compiler-probes/vectors/vectors.md
explorations/coordinator/tools/ledger-pass/README.md
explorations/coordinator/tools/record-landing/README.md
explorations/coordinator/tools/spec-html/README.md
explorations/coordinator/tools/spec-html/curator-notes.md
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

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/plan-moves.py --root /home/user/fortress-landing-33b --base 8c13a52ec`, exit 0.

```
plan-moves: 26 lines taken out of PLAN.md; PLAN-history.md gained 40 lines, under 10 headings
  gained heading: ### Where we stand
  gained heading: ### Phase 5. microGPT compiles
  gained heading: ### Phase 4. The switch-over
  gained heading: ### Phase 3's candidates at its end
  gained heading: ### Climb batch 28, listed for his review
  gained heading: ### Climb batch 8, listed for his review
  gained heading: ### Climb batch 31b, listed for his review
  gained heading: ### Climb batch 33, listed for his review
  gained heading: ## Climb batch 33b's landing, 2026-11-18
  gained heading: ### Climb batch 33b, listed for his review
LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 371, 372, 512, 515, 577. The line: - **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the swit
LOOK PLAN.md:71, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 577. The line: - What the rehearsal met and no other line of this phase holds (F-352; `compile-ladder/plan-31/probes/switch-rehearsal.md`, section 6). Walls that only the swit
LOOK PLAN.md:72, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 577. The line: - The merge of the five number types with their objects, before the switch-over, on both paths (P-178; row 1003): each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64
LOOK PLAN.md:94, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:249, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
plan-moves: pass; 5 PLAN lines to look at

```

## queue-check.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/queue-check.py --root /home/user/fortress-landing-33b --base 8c13a52ec`, exit 0.

```
queue-check: 589 items, 7 new (598, 599, 600, 601, 602, 603, 604); open 258, consequential 93, routine 165; pass

```

## lengths.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/lengths.py --root /home/user/fortress-landing-33b --base 8c13a52ec`, exit 0.

```
lengths: 18 entries changed
- F-34: 2215 to 1957 characters (-258), over 600
- F-86: 912 to 891 characters (-21), over 600
- F-128: 1200 to 1139 characters (-61), over 600
- F-136: 1642 to 1688 characters (+46), grew past 600
- F-181: 1641 to 1636 characters (-5), over 600
- F-301: 1715 to 1668 characters (-47), over 600
- F-302: 1331 to 1278 characters (-53), over 600
- F-315: 1452 to 1321 characters (-131), over 600
- F-320: 1608 to 1570 characters (-38), over 600
- F-338: 592 to 585 characters (-7)
- F-352: 2184 to 2216 characters (+32), grew past 600
- F-353: 1625 to 1686 characters (+61), grew past 600
- F-388: 1334 to 1298 characters (-36), over 600
- F-389: 1303 to 1213 characters (-90), over 600
- F-390: 1488 to 1520 characters (+32), grew past 600
- F-391: 1248 to 1243 characters (-5), over 600
- P-33: 1910 to 1862 characters (-48), over 600
- P-178: 1544 to 1542 characters (-2), over 600
lengths: 4 already over 600 grew: F-136 (+46), F-352 (+32), F-353 (+61), F-390 (+32)

```

## git diff --stat 8c13a52ec

`git diff --stat 8c13a52ec -- explorations/`, exit 0.

```
 explorations/coordinator/FACTS-history.md     |  96 ++++++++++++++++++++++
 explorations/coordinator/FACTS.md             |  32 ++++----
 explorations/coordinator/INDEX.md             |   2 +-
 explorations/coordinator/PLAN-history.md      |  63 +++++++++++++++
 explorations/coordinator/PLAN.md              |  54 +++++++------
 explorations/coordinator/POSITIONS-history.md |  12 +++
 explorations/coordinator/POSITIONS.md         |   4 +-
 explorations/coordinator/review-queue.md      | 112 +++++++++++++++++++-------
 explorations/fortress-gap-ledger-history.md   |  18 +++++
 explorations/fortress-gap-ledger.md           |   7 +-
 10 files changed, 324 insertions(+), 76 deletions(-)

```

