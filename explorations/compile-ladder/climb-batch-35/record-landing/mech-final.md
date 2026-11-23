<!-- The record-landing workflow's mechanical checks, round final, in the worktree /home/user/fortress-landing-35 at efb603dce: one line per check, then each command with its output, written by checks.sh. -->

# The mechanical checks, round final

- reset: the six record files at efb603dce
- words-subset.py: no cut-only.txt, nothing to check
- words-subset.py, every POSITIONS line of final.apply: exit 1 (information)
- record.py apply final.apply: pass
- ledger-clarity/apply.py final.rewrite: pass
- ledger.py add, row line 1 of rows.add, in "5. Overloading on the compiled path: checker and dispatch": pass
  - row 1112, in "5. Overloading on the compiled path: checker and dispatch"
- record.py check --base efb603dce: pass
- ledger.py check: pass
- ledger.py landing-check 13f4fdea7: pass
- check-index.sh: pass
- plan-moves.py: pass
  - plan-moves.py lists 3 PLAN lines to look at (its LOOK lines below)
- queue-check.py: pass
- lengths.py: pass
  - lengths.py: already over 600, and grew: F-323 (+66), F-324 (+85), F-342 (+60), F-345 (+66), F-351 (+6), F-396 (+217), F-397 (+174), F-398 (+254), F-399 (+34), F-400 (+16), F-401 (+23), P-40 (+70), P-173 (+55), P-174 (+270)
- git diff --stat efb603dce: pass

Every check passes.

## words-subset.py, every POSITIONS line of final.apply

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-35/tmp/positions.1zRSGf --root /home/user/fortress-landing-35`, exit 1.

```
P-174: adds a x2, the x7, with, four x2, numbers, as x2, too, numeral, and x3, read, one, literals, of x3, no, value, where x2, it, stands, `zz`, on, coercions, library, row, tree, departs, many, tests, call, getter, `v, aszz32`, checker, chapter, each, wherever, f-342, f-345
P-40: adds a x3, where x2, as, type, numeral, convert, they, stand, does, nothing, fixes
P-173: adds a, converts, where x2, it, stands, fixes, type, nothing
words-subset: 3 entries, 3 add words

```

## record.py apply final.apply

`python3 /home/user/fortress-landing-35/explorations/coordinator/tools/record.py apply /home/user/fortress-landing-35/explorations/compile-ladder/climb-batch-35/record-landing/final.apply --by climb batch 35 landing workflow (Opus)`, exit 0.

```
F-88: rewritten
F-240: noted
F-351: rewritten
F-397: rewritten
F-398: rewritten
F-399: rewritten
F-400: rewritten
F-401: rewritten
P-174: rewritten
P-40: rewritten
P-173: rewritten
F-342: rewritten
F-345: rewritten
F-323: rewritten
F-324: rewritten
F-396: rewritten
F-354: noted
F-281: rewritten
F-366: rewritten

```

## ledger-clarity/apply.py final.rewrite

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../ledger-clarity/apply.py /home/user/fortress-landing-35/tmp/rows.AZMjsJ --root /home/user/fortress-landing-35`, exit 0.

```
row 1100: rewritten (1185 characters); its earlier line is in fortress-gap-ledger-history.md
row 815: rewritten (1196 characters); its earlier line is in fortress-gap-ledger-history.md
row 935: rewritten (1087 characters); its earlier line is in fortress-gap-ledger-history.md
row 594: rewritten (1090 characters); its earlier line is in fortress-gap-ledger-history.md
row 119: rewritten (729 characters); its earlier line is in fortress-gap-ledger-history.md
row 406: rewritten (1175 characters); its earlier line is in fortress-gap-ledger-history.md
row 470: rewritten (1155 characters); its earlier line is in fortress-gap-ledger-history.md
row 526: rewritten (1024 characters); its earlier line is in fortress-gap-ledger-history.md
row 724: rewritten (971 characters); its earlier line is in fortress-gap-ledger-history.md
row 764: rewritten (1000 characters); its earlier line is in fortress-gap-ledger-history.md
row 835: rewritten (1163 characters); its earlier line is in fortress-gap-ledger-history.md
row 889: rewritten (1028 characters); its earlier line is in fortress-gap-ledger-history.md
row 983: rewritten (1091 characters); its earlier line is in fortress-gap-ledger-history.md
row 995: rewritten (1075 characters); its earlier line is in fortress-gap-ledger-history.md
row 1088: rewritten (1074 characters); its earlier line is in fortress-gap-ledger-history.md
row 1103: rewritten (1132 characters); its earlier line is in fortress-gap-ledger-history.md
apply.py: 16 changes

```

## ledger.py add, row line 1 of rows.add, in "5. Overloading on the compiled path: checker and dispatch"

`python3 /home/user/fortress-landing-35/explorations/coordinator/tools/ledger.py add /home/user/fortress-landing-35/tmp/adds.cloAgx/row-1.txt --section 5. Overloading on the compiled path: checker and dispatch`, exit 0.

```
row 1112, in "5. Overloading on the compiled path: checker and dispatch"
rows that cite the same files: 33, 40, 78, 97, 98, 99, 101, 159, 161, 164, 171, 172, 214, 218, 225, 240, 259, 285, 295, 296 and 131 more

```

## record.py check --base efb603dce

`python3 /home/user/fortress-landing-35/explorations/coordinator/tools/record.py check --base efb603dce`, exit 0.

```
reported, not failing:
  FACTS.md: size: 290 entries over 600 characters: F-7 818, F-9 705, F-11 848, F-12 1308, F-18 1413, F-19 2028, F-20 948, F-21 1049, F-22 1482, F-24 1037, F-25 948, F-26 1878, F-27 1769, F-29 1557, F-269 1197, F-291 1322, F-301 1724, F-302 1278, F-348 1444, F-350 1544, F-351 1900, F-355 1498, F-356 1396, F-357 774, F-358 1361, F-395 1249, F-32 1897, F-34 1873, F-35 1166, F-37 755, F-39 1365, F-40 1856, F-41 944, F-42 633, F-43 705, F-44 1832, F-45 1591, F-46 1445, F-47 1548, F-48 965, F-49 646, F-50 1035, F-51 623, F-52 844, F-53 1376, F-54 740, F-55 956, F-57 1466, F-58 2401, F-59 1582, F-60 697, F-61 998, F-63 1265, F-64 848, F-65 786, F-66 794, F-67 998, F-69 745, F-70 902, F-71 860, F-72 794, F-73 1452, F-74 808, F-75 1999, F-76 1631, F-77 619, F-78 1262, F-79 1360, F-80 1202, F-81 1100, F-82 1010, F-83 1375, F-84 1456, F-85 1353, F-86 911, F-87 1228, F-90 1755, F-91 604, F-94 682, F-221 860, F-225 2927, F-226 1228, F-227 1536, F-231 1126, F-232 1409, F-235 1157, F-236 786, F-237 1779, F-240 2202, F-242 1056, F-243 1159, F-244 1210, F-245 1330, F-250 1293, F-251 1467, F-254 1099, F-255 2519, F-256 2408, F-265 1269, F-266 933, F-276 1430, F-277 1353, F-278 1561, F-281 1529, F-282 2506, F-285 1683, F-286 1146, F-287 1204, F-288 1178, F-289 601, F-290 1313, F-292 917, F-293 640, F-294 1011, F-296 1151, F-297 1680, F-298 2090, F-299 3232, F-303 1485, F-306 1307, F-307 1106, F-308 2098, F-309 981, F-310 935, F-311 681, F-312 1375, F-313 1132, F-314 1066, F-315 1373, F-320 1518, F-321 1593, F-322 855, F-323 1181, F-325 2633, F-327 1232, F-328 1004, F-330 1083, F-332 1315, F-333 1445, F-334 940, F-335 1083, F-336 1405, F-337 1176, F-342 1876, F-344 850, F-352 2442, F-353 1934, F-364 2102, F-365 2423, F-370 1314, F-376 1098, F-381 1146, F-390 1902, F-391 1248, F-392 685, F-393 1252, F-394 1497, F-396 2163, F-99 781, F-100 1059, F-102 783, F-103 749, F-104 913, F-106 1047, F-107 891, F-108 878, F-111 1364, F-112 798, F-203 1543, F-234 1221, F-283 989, F-295 706, F-354 926, F-118 1363, F-119 830, F-121 1870, F-122 934, F-123 1085, F-124 1121, F-125 663, F-128 1139, F-129 1506, F-130 810, F-131 1405, F-132 1227, F-133 1238, F-134 645, F-135 693, F-136 1710, F-137 1449, F-140 1727, F-141 2282, F-142 958, F-143 1851, F-144 1412, F-145 1413, F-146 1023, F-147 1442, F-228 2330, F-230 768, F-239 959, F-248 745, F-249 1131, F-252 4330, F-253 2088, F-257 2036, F-258 2830, F-259 1236, F-262 1329, F-263 1720, F-270 1676, F-274 1198, F-275 1811, F-280 868, F-305 1468, F-316 958, F-318 2086, F-324 1165, F-326 1087, F-329 828, F-331 1328, F-339 1090, F-340 1350, F-341 2272, F-343 1281, F-347 1558, F-349 965, F-362 1340, F-363 1880, F-366 2941, F-367 1957, F-369 1967, F-372 1827, F-373 2109, F-374 1770, F-375 2206, F-377 2848, F-378 1329, F-380 1366, F-382 1103, F-384 1322, F-385 1278, F-386 1431, F-387 757, F-388 1565, F-389 1300, F-397 1219, F-398 1776, F-399 1361, F-400 1789, F-401 1336, F-151 1614, F-154 967, F-155 1117, F-157 1117, F-158 632, F-159 1735, F-229 1557, F-264 2093, F-279 766, F-317 763, F-361 1539, F-368 1317, F-379 1618, F-163 837, F-165 892, F-166 778, F-167 1150, F-168 973, F-169 1191, F-170 689, F-171 1186, F-172 1241, F-173 1718, F-174 2179, F-175 1204, F-176 1168, F-223 1894, F-271 734, F-272 1148, F-273 1324, F-300 865, F-319 1133, F-345 1646, F-359 1429, F-371 1306, F-180 2337, F-181 1636, F-182 910, F-183 879
  FACTS-history.md:9618: from: F-366: :1117 is no file from the repository root or from explorations/
  POSITIONS.md: size: 91 entries over 600 characters: P-7 844, P-9 1279, P-10 630, P-11 709, P-12 780, P-19 758, P-25 1303, P-26 1344, P-27 829, P-28 828, P-29 670, P-30 747, P-32 805, P-33 1862, P-175 1699, P-180 695, P-37 1383, P-38 702, P-39 1402, P-40 2032, P-41 823, P-43 662, P-44 1386, P-45 1922, P-46 2357, P-47 933, P-48 1563, P-49 982, P-50 772, P-51 1019, P-54 831, P-55 1001, P-56 1114, P-57 1053, P-58 1674, P-59 774, P-60 1927, P-62 738, P-146 1116, P-147 1274, P-148 888, P-149 1049, P-151 1587, P-152 1412, P-154 1179, P-155 1147, P-156 1693, P-157 1214, P-158 752, P-160 1380, P-162 2037, P-163 1670, P-164 2190, P-167 1661, P-169 2561, P-170 1071, P-69 1126, P-71 792, P-72 665, P-73 1051, P-74 883, P-75 660, P-76 864, P-78 1272, P-79 857, P-80 987, P-153 1071, P-159 1278, P-161 1771, P-165 2258, P-166 1147, P-168 1701, P-171 1839, P-172 2060, P-173 3616, P-174 2841, P-176 1097, P-178 1542, P-84 1233, P-85 884, P-87 968, P-88 1036, P-91 911, P-95 683, P-96 987, P-97 1146, P-179 777, P-102 704, P-103 648, P-125 602, P-177 689
  POSITIONS-history.md:3666: from: P-169: no heading of explorations/coordinator/HELD.md holds "Held in chat (2026-11-07)"
record.py check: FACTS.md 331 entries, POSITIONS.md 106 entries; 0 failures; reported: from 2, size 2

```

## ledger.py check

`python3 /home/user/fortress-landing-35/explorations/coordinator/tools/ledger.py check --summary`, exit 0.

```
ledger.py check: fortress-gap-ledger.md, 1111 rows, 0 fail the template

```

## ledger.py landing-check 13f4fdea7

`python3 /home/user/fortress-landing-35/explorations/coordinator/tools/ledger.py landing-check 13f4fdea7`, exit 0.

```
ledger.py landing-check: 13f4fdea7..HEAD: no finding

```

## check-index.sh

`bash explorations/coordinator/check-index.sh`, exit 0.

```
INDEX.md check — efb603dce1
notes in scope: 589   index entries: 681

== notes missing from INDEX.md (0) ==

== index lines naming a file that does not exist (0) ==

== index lines outside the note set, informational (87) ==
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
explorations/compile-ladder/plan-34/probes/rehearsal.md
explorations/compile-ladder/plan-35/probes/fixes-35.md
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

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/plan-moves.py --root /home/user/fortress-landing-35 --base efb603dce`, exit 0.

```
plan-moves: 175 lines taken out of PLAN.md; PLAN-history.md gained 210 lines, under 31 headings
  gained heading: ### Where we stand
  gained heading: ### Pavol's answers, in the order they are needed
  gained heading: ### Off the path, parked
  gained heading: ### Phase 3. The checker at a true zero
  gained heading: ### Climb batch 18, listed for his review
  gained heading: ### Climb batch 7b, listed for his review
  gained heading: ### Climb batch 12, listed for his review
  gained heading: ### Climb batch 13, listed for his review
  gained heading: ### Phase 5. microGPT compiles
  gained heading: ### Phase 4. The switch-over
  gained heading: ### Phase 3's candidates at its end
  gained heading: ### Climb batch 22c, listed for his review
  gained heading: ### Climb batch 24, listed for his review
  gained heading: ### Climb batch 11, listed for his review
  gained heading: ### Climb batch 19, listed for his review
  gained heading: ### Climb batch 26, listed for his review
  gained heading: ### Climb batch 27, listed for his review
  gained heading: ### Climb batch 28, listed for his review
  gained heading: ### Climb batch 29, listed for his review
  gained heading: ### Climb batch 29b, listed for his review
  gained heading: ### Climb batch 30, listed for his review
  gained heading: ### Climb batch 32, listed for his review
  gained heading: ### Climb batch 31, listed for his review
  gained heading: ### Climb batch 31b, listed for his review
  gained heading: ### Climb batch 33, listed for his review
  gained heading: ### Climb batch 33b, listed for his review
  gained heading: ### Climb batch 34, listed for his review
  gained heading: ### Climb batch 34b, listed for his review
  gained heading: ## Climb batch 35's landing, 2026-11-23
  gained heading: ### Climb batch 9, listed for his review
  gained heading: ### Climb batch 35, listed for his review
LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 371, 372, 512, 513, 515, 577. The line: - **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the swit
LOOK PLAN.md:97, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:241, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
plan-moves: pass; 3 PLAN lines to look at

```

## queue-check.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/queue-check.py --root /home/user/fortress-landing-35 --base efb603dce`, exit 0.

```
queue-check: 605 items, 0 new (none); open 92, consequential 92, routine 0; pass

```

## lengths.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/lengths.py --root /home/user/fortress-landing-35 --base efb603dce`, exit 0.

```
lengths: 17 entries changed
- F-88: 646 to 594 characters (-52)
- F-281: 1529 to 1529 characters (+0), over 600
- F-323: 1115 to 1181 characters (+66), grew past 600
- F-324: 1080 to 1165 characters (+85), grew past 600
- F-342: 1816 to 1876 characters (+60), grew past 600
- F-345: 1580 to 1646 characters (+66), grew past 600
- F-351: 1894 to 1900 characters (+6), grew past 600
- F-366: 2941 to 2941 characters (+0), over 600
- F-396: 1946 to 2163 characters (+217), grew past 600
- F-397: 1045 to 1219 characters (+174), grew past 600
- F-398: 1522 to 1776 characters (+254), grew past 600
- F-399: 1327 to 1361 characters (+34), grew past 600
- F-400: 1773 to 1789 characters (+16), grew past 600
- F-401: 1313 to 1336 characters (+23), grew past 600
- P-40: 1962 to 2032 characters (+70), grew past 600
- P-173: 3561 to 3616 characters (+55), grew past 600
- P-174: 2571 to 2841 characters (+270), grew past 600
lengths: 14 already over 600 grew: F-323 (+66), F-324 (+85), F-342 (+60), F-345 (+66), F-351 (+6), F-396 (+217), F-397 (+174), F-398 (+254), F-399 (+34), F-400 (+16), F-401 (+23), P-40 (+70), P-173 (+55), P-174 (+270)

```

## git diff --stat efb603dce

`git diff --stat efb603dce -- explorations/`, exit 0.

```
 explorations/coordinator/FACTS-history.md     |  92 +++++++++
 explorations/coordinator/FACTS.md             |  28 +--
 explorations/coordinator/PLAN-history.md      | 274 ++++++++++++++++++++++++++
 explorations/coordinator/PLAN.md              | 206 +++----------------
 explorations/coordinator/POSITIONS-history.md |  18 ++
 explorations/coordinator/POSITIONS.md         |   6 +-
 explorations/coordinator/review-queue.md      |  28 +--
 explorations/fortress-gap-ledger-history.md   |  96 +++++++++
 explorations/fortress-gap-ledger.md           |  33 ++--
 9 files changed, 556 insertions(+), 225 deletions(-)

```

