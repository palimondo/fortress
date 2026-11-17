<!-- The record-landing workflow's mechanical checks, round 2, in the worktree /home/user/fortress-landing-31b at 257cae950: one line per check, then each command with its output, written by checks.sh. -->

# The mechanical checks, round 2

- reset: the six record files at 257cae950
- cut-only.txt: 1 of the 1 entries that cut-only.txt names have a line in the apply file
- words-subset.py, the cut-only lines (P-68): pass
- words-subset.py, every POSITIONS line of record.apply: exit 1 (information)
- record.py apply record.apply: pass
- ledger-clarity/apply.py: no rows.rewrite, no row changed
- ledger.py add: no rows.add, no row added
- record.py check --base 257cae950: pass
- ledger.py check: pass
- ledger.py landing-check 647163a9c: pass
- check-index.sh: pass
- plan-moves.py: pass
  - plan-moves.py lists 4 PLAN lines to look at (its LOOK lines below)
- queue-check.py: pass
- lengths.py: pass
  - lengths.py: already over 600, and grew: F-34 (+85), F-257 (+1), F-299 (+159), F-308 (+60), F-361 (+19)
- git diff --stat 257cae950: pass

Every check passes.

## words-subset.py, the cut-only lines (P-68)

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-31b/tmp/cut-only.w1NYTm --root /home/user/fortress-landing-31b`, exit 0.

```
words-subset: 1 entries, 0 add words

```

## words-subset.py, every POSITIONS line of record.apply

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-31b/tmp/positions.osKXew --root /home/user/fortress-landing-31b`, exit 1.

```
P-166: adds `library, fortresslibrary, 1170`, 719`
P-162: adds `rr64`'s x2, `rr64`
P-165: adds `rr64`'s
P-163: adds 409`
words-subset: 5 entries, 4 add words

```

## record.py apply record.apply

`python3 /home/user/fortress-landing-31b/explorations/coordinator/tools/record.py apply /home/user/fortress-landing-31b/explorations/compile-ladder/climb-batch-31b/record-landing/record.apply --by climb batch 31b landing workflow (Opus)`, exit 0.

```
F-34: rewritten
F-229: rewritten
F-299: rewritten
F-308: rewritten
F-327: rewritten
F-32: rewritten
F-361: rewritten
F-375: rewritten
F-378: rewritten
F-379: rewritten
F-380: rewritten
F-257: rewritten
F-240: rewritten
F-285: rewritten
F-75: rewritten
F-139: rewritten
F-140: rewritten
P-68: rewritten
P-166: rewritten
P-162: rewritten
P-165: rewritten
P-163: rewritten

```

## record.py check --base 257cae950

`python3 /home/user/fortress-landing-31b/explorations/coordinator/tools/record.py check --base 257cae950`, exit 0.

```
reported, not failing:
  FACTS.md: size: 269 entries over 600 characters: F-7 818, F-11 848, F-12 1308, F-18 1413, F-19 2028, F-20 948, F-21 1049, F-22 1482, F-24 951, F-25 948, F-26 1878, F-27 1769, F-29 1557, F-269 1197, F-291 1322, F-301 1509, F-302 1318, F-348 1444, F-350 1544, F-351 1768, F-355 1498, F-356 1396, F-357 774, F-358 1361, F-32 1897, F-34 2552, F-35 1166, F-37 755, F-39 1365, F-40 1856, F-41 944, F-42 633, F-43 705, F-44 1832, F-45 1591, F-46 1445, F-47 1548, F-48 965, F-49 646, F-50 1035, F-51 623, F-52 844, F-53 1377, F-54 740, F-55 956, F-57 1466, F-58 2401, F-59 1582, F-60 697, F-61 998, F-63 1265, F-64 848, F-65 786, F-66 794, F-67 998, F-69 745, F-70 902, F-71 860, F-72 794, F-73 1452, F-74 808, F-75 1999, F-76 1597, F-77 619, F-78 1262, F-79 1360, F-80 1202, F-81 1100, F-82 1010, F-83 1375, F-84 1456, F-85 1353, F-86 783, F-87 1228, F-90 1755, F-91 604, F-94 682, F-221 860, F-225 2754, F-226 1228, F-227 1536, F-231 1126, F-232 1409, F-235 1157, F-236 786, F-237 1779, F-240 2202, F-242 1056, F-243 1159, F-244 1210, F-245 1330, F-250 1293, F-251 1467, F-254 1099, F-255 2519, F-256 2408, F-265 1269, F-266 933, F-276 1430, F-277 1353, F-278 1561, F-281 1535, F-282 2601, F-285 1683, F-286 1146, F-287 1204, F-288 1178, F-289 601, F-290 1313, F-292 892, F-294 1011, F-296 1151, F-297 1680, F-298 2090, F-299 3232, F-303 1485, F-306 1307, F-307 1106, F-308 2098, F-309 981, F-310 935, F-311 681, F-312 1302, F-313 1132, F-314 1066, F-315 1210, F-320 1452, F-321 1593, F-322 855, F-323 1115, F-325 1397, F-327 1232, F-328 1004, F-330 1083, F-332 1303, F-333 1445, F-334 940, F-335 1083, F-336 665, F-337 1176, F-338 824, F-342 1816, F-344 850, F-352 2104, F-353 1577, F-364 2102, F-365 2423, F-370 1314, F-376 1098, F-99 781, F-100 1059, F-102 783, F-103 749, F-104 913, F-106 1047, F-107 891, F-108 878, F-111 1364, F-112 798, F-203 1543, F-234 1221, F-283 989, F-295 706, F-354 926, F-118 1363, F-119 830, F-121 1870, F-122 934, F-123 1085, F-124 1121, F-125 663, F-128 873, F-129 1506, F-130 810, F-131 1405, F-132 1227, F-133 1238, F-134 645, F-135 693, F-136 1642, F-137 1449, F-140 1727, F-141 2282, F-142 958, F-143 1851, F-144 1412, F-145 1413, F-146 1023, F-147 1442, F-228 2330, F-230 768, F-239 959, F-248 745, F-249 1131, F-252 4330, F-253 2088, F-257 2036, F-258 2830, F-259 1236, F-262 1329, F-263 1720, F-270 1676, F-274 1198, F-275 1811, F-280 868, F-305 1468, F-316 958, F-318 2076, F-324 1080, F-326 1087, F-329 828, F-331 1328, F-339 1090, F-340 1350, F-341 2272, F-343 1281, F-347 1558, F-349 965, F-362 1340, F-363 1798, F-366 2941, F-367 1957, F-369 1769, F-372 2087, F-373 2104, F-374 1746, F-375 2139, F-377 1928, F-378 1329, F-380 1125, F-151 1614, F-154 967, F-155 1117, F-157 1117, F-158 632, F-159 1735, F-229 1557, F-264 2093, F-279 766, F-317 763, F-361 1476, F-368 1317, F-379 1560, F-163 837, F-165 892, F-166 778, F-167 1150, F-168 973, F-169 1191, F-170 689, F-171 1186, F-172 1241, F-173 1718, F-174 2179, F-175 1298, F-176 1168, F-223 1894, F-271 734, F-272 1148, F-273 1324, F-300 865, F-319 1133, F-345 1580, F-359 1429, F-371 1306, F-180 2337, F-181 1636, F-182 910, F-183 879
  POSITIONS.md: size: 90 entries over 600 characters: P-7 844, P-9 1279, P-10 630, P-11 709, P-12 720, P-19 758, P-25 1303, P-26 1344, P-27 829, P-28 828, P-29 670, P-30 747, P-32 805, P-33 1247, P-175 1699, P-37 1383, P-38 702, P-39 1402, P-40 1962, P-41 823, P-43 662, P-44 1386, P-45 1922, P-46 2357, P-47 933, P-48 1563, P-49 982, P-50 772, P-51 1019, P-54 831, P-55 1001, P-56 1114, P-57 1053, P-58 1674, P-59 774, P-60 1927, P-62 738, P-146 1116, P-147 1274, P-148 888, P-149 1049, P-151 1587, P-152 1412, P-154 1179, P-155 1147, P-156 1693, P-157 1214, P-158 752, P-160 1380, P-162 2037, P-163 1670, P-164 2190, P-167 1661, P-169 2561, P-170 1071, P-69 1126, P-71 792, P-72 665, P-73 1051, P-74 883, P-75 660, P-76 864, P-78 1272, P-79 857, P-80 987, P-153 1071, P-159 1278, P-161 1771, P-165 1648, P-166 1122, P-168 1701, P-171 1839, P-172 2060, P-173 3561, P-174 2243, P-176 1097, P-178 1544, P-84 1233, P-85 884, P-87 968, P-88 1036, P-91 911, P-95 683, P-96 987, P-97 1146, P-179 777, P-102 704, P-103 648, P-125 602, P-177 689
  POSITIONS-history.md:3666: from: P-169: no heading of explorations/coordinator/HELD.md holds "Held in chat (2026-11-07)"
record.py check: FACTS.md 310 entries, POSITIONS.md 105 entries; 0 failures; reported: from 1, size 2

```

## ledger.py check

`python3 /home/user/fortress-landing-31b/explorations/coordinator/tools/ledger.py check --summary`, exit 0.

```
ledger.py check: fortress-gap-ledger.md, 1059 rows, 0 fail the template

```

## ledger.py landing-check 647163a9c

`python3 /home/user/fortress-landing-31b/explorations/coordinator/tools/ledger.py landing-check 647163a9c`, exit 0.

```
ledger.py landing-check: 647163a9c..HEAD: no finding

```

## check-index.sh

`bash explorations/coordinator/check-index.sh`, exit 0.

```
INDEX.md check — 257cae9508
notes in scope: 570   index entries: 659

== notes missing from INDEX.md (0) ==

== index lines naming a file that does not exist (0) ==

== index lines outside the note set, informational (84) ==
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

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/plan-moves.py --root /home/user/fortress-landing-31b --base 257cae950`, exit 0.

```
plan-moves: 32 lines taken out of PLAN.md; PLAN-history.md gained 47 lines, under 11 headings
  gained heading: ### Where we stand
  gained heading: ### Pavol's answers, in the order they are needed
  gained heading: ### Off the path, parked
  gained heading: ### Climb batch 7b, listed for his review
  gained heading: ### Phase 4. The switch-over
  gained heading: ### Phase 3's candidates at its end
  gained heading: ### Climb batch 24, listed for his review
  gained heading: ### Climb batch 32, listed for his review
  gained heading: ### Climb batch 31, listed for his review
  gained heading: ## Climb batch 31b's landing, 2026-11-17
  gained heading: ### Climb batch 31b, listed for his review
LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 371, 372, 515. The line: - **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the swit
LOOK PLAN.md:13, under "Where we stand": list: it names items in (a) among open ones: 528, 530, 533. The line: - **Next.** Climb batch 31b, run 2 of climb batch 31, landed (phase 4's twelfth line) at `00dd16a891`, on his go of 06:39 UTC on 2026-11-17, which took its fork
LOOK PLAN.md:92, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:248, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
plan-moves: pass; 4 PLAN lines to look at

```

## queue-check.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/queue-check.py --root /home/user/fortress-landing-31b --base 257cae950`, exit 0.

```
queue-check: 574 items, 11 new (579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589); open 247, consequential 92, routine 155; pass

```

## lengths.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/lengths.py --root /home/user/fortress-landing-31b --base 257cae950`, exit 0.

```
lengths: 22 entries changed
- F-32: 1897 to 1897 characters (+0), over 600
- F-34: 2467 to 2552 characters (+85), grew past 600
- F-75: 2122 to 1999 characters (-123), over 600
- F-139: 533 to 549 characters (+16)
- F-140: 1727 to 1727 characters (+0), over 600
- F-229: 1561 to 1557 characters (-4), over 600
- F-240: 2366 to 2202 characters (-164), over 600
- F-257: 2035 to 2036 characters (+1), grew past 600
- F-285: 1683 to 1683 characters (+0), over 600
- F-299: 3073 to 3232 characters (+159), grew past 600
- F-308: 2038 to 2098 characters (+60), grew past 600
- F-327: 1232 to 1232 characters (+0), over 600
- F-361: 1457 to 1476 characters (+19), grew past 600
- F-375: 2172 to 2139 characters (-33), over 600
- F-378: 1360 to 1329 characters (-31), over 600
- F-379: 1602 to 1560 characters (-42), over 600
- F-380: 1237 to 1125 characters (-112), over 600
- P-68: 649 to 589 characters (-60)
- P-162: 2040 to 2037 characters (-3), over 600
- P-163: 1670 to 1670 characters (+0), over 600
- P-165: 1649 to 1648 characters (-1), over 600
- P-166: 1155 to 1122 characters (-33), over 600
lengths: 5 already over 600 grew: F-34 (+85), F-257 (+1), F-299 (+159), F-308 (+60), F-361 (+19)

```

## git diff --stat 257cae950

`git diff --stat 257cae950 -- explorations/`, exit 0.

```
 explorations/coordinator/CLIMB-BATCH-31.md    |   6 +-
 explorations/coordinator/FACTS-history.md     | 102 +++++++++++++
 explorations/coordinator/FACTS.md             |  34 ++---
 explorations/coordinator/PLAN-history.md      |  73 +++++++++
 explorations/coordinator/PLAN.md              |  75 +++++-----
 explorations/coordinator/POSITIONS-history.md |  30 ++++
 explorations/coordinator/POSITIONS.md         |  10 +-
 explorations/coordinator/review-queue.md      | 203 +++++++++++++++++++-------
 8 files changed, 419 insertions(+), 114 deletions(-)

```

