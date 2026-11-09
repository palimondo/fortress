<!-- The record-landing workflow's mechanical checks, round final, in the worktree /home/user/fortress-landing-29 at fa630b65f: one line per check, then each command with its output, written by checks.sh. -->

# The mechanical checks, round final

- reset: the six record files at fa630b65f
- cut-only.txt: 3 of the 3 entries that cut-only.txt names have a line in the apply file
- words-subset.py, the cut-only lines (P-76 P-173 P-154): pass
- words-subset.py, every POSITIONS line of final.apply: exit 1 (information)
- record.py apply final.apply: pass
- ledger-clarity/apply.py final.rewrite: pass
- ledger.py add: no rows.add, no row added
- record.py check --base fa630b65f: pass
- ledger.py check: pass
- ledger.py landing-check b430f9f42: pass
- check-index.sh: pass
- plan-moves.py: pass
  - plan-moves.py lists 2 PLAN lines to look at (its LOOK lines below)
- queue-check.py: pass
- lengths.py: pass
  - lengths.py: already over 600, and grew: F-122 (+34), F-128 (+65), F-285 (+45), F-305 (+1), F-306 (+1), F-312 (+1), P-165 (+21), P-171 (+2)
- git diff --stat fa630b65f: pass

Every check passes.

## words-subset.py, the cut-only lines (P-76 P-173 P-154)

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-29/tmp/cut-only.5jbEv6 --root /home/user/fortress-landing-29`, exit 0.

```
words-subset: 3 entries, 0 add words

```

## words-subset.py, every POSITIONS line of final.apply

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-29/tmp/positions.EVfffx --root /home/user/fortress-landing-29`, exit 1.

```
P-165: adds `radixpointnumeral`, 56-73`
P-171: adds 118-122`
P-172: adds a, type, at, `b430f9f42`, declared, return
P-169: adds with, left x2, it
P-166: adds 548`, 200`, 655`
P-163: adds 598`
P-175: adds 7062`
words-subset: 10 entries, 7 add words

```

## record.py apply final.apply

`python3 /home/user/fortress-landing-29/explorations/coordinator/tools/record.py apply /home/user/fortress-landing-29/explorations/compile-ladder/climb-batch-29/record-landing/final.apply --by climb batch 29 landing workflow (Opus)`, exit 0.

```
F-32: rewritten
F-73: rewritten
F-57: rewritten
F-74: rewritten
F-118: rewritten
F-151: rewritten
F-229: rewritten
F-240: noted
F-262: rewritten
F-278: rewritten
F-285: rewritten
F-304: rewritten
F-341: rewritten
F-122: rewritten
F-128: rewritten
F-327: rewritten
F-173: rewritten
F-272: rewritten
F-78: rewritten
F-334: rewritten
F-35: rewritten
F-44: rewritten
F-58: rewritten
F-63: rewritten
F-85: rewritten
F-102: rewritten
F-168: rewritten
F-170: rewritten
F-175: rewritten
F-268: rewritten
F-276: rewritten
F-279: rewritten
F-283: rewritten
F-286: rewritten
F-302: rewritten
F-303: rewritten
F-305: rewritten
F-306: rewritten
F-307: rewritten
F-311: rewritten
F-312: rewritten
F-315: rewritten
F-330: rewritten
F-332: rewritten
P-165: rewritten
P-171: rewritten
P-76: rewritten
P-172: rewritten
P-173: rewritten
P-169: rewritten
P-154: rewritten
P-166: rewritten
P-163: rewritten
P-175: rewritten

```

## ledger-clarity/apply.py final.rewrite

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../ledger-clarity/apply.py /home/user/fortress-landing-29/tmp/rows.kEPIGb --root /home/user/fortress-landing-29`, exit 0.

```
row 893: rewritten (1031 characters); its earlier line is in fortress-gap-ledger-history.md
row 961: rewritten (1041 characters); its earlier line is in fortress-gap-ledger-history.md
row 965: rewritten (956 characters); its earlier line is in fortress-gap-ledger-history.md
row 579: rewritten (1062 characters); its earlier line is in fortress-gap-ledger-history.md
apply.py: 4 changes

```

## record.py check --base fa630b65f

`python3 /home/user/fortress-landing-29/explorations/coordinator/tools/record.py check --base fa630b65f`, exit 0.

```
reported, not failing:
  FACTS.md: size: 236 entries over 600 characters: F-7 818, F-11 848, F-12 1308, F-18 1265, F-19 1743, F-20 948, F-21 1049, F-22 1482, F-24 950, F-25 948, F-26 1878, F-27 1769, F-29 1557, F-269 1197, F-291 1203, F-301 1509, F-302 1318, F-32 1897, F-34 1773, F-35 1166, F-37 755, F-39 1365, F-40 1856, F-41 944, F-42 633, F-43 705, F-44 1832, F-45 1591, F-46 1445, F-47 1548, F-48 965, F-49 646, F-50 1035, F-51 623, F-52 844, F-53 1489, F-54 740, F-55 956, F-57 1407, F-58 1466, F-59 1389, F-60 697, F-61 998, F-63 1265, F-64 848, F-65 786, F-66 794, F-67 998, F-69 745, F-70 902, F-71 860, F-72 794, F-73 1452, F-74 931, F-75 1206, F-76 1597, F-77 619, F-78 1262, F-79 1247, F-80 1202, F-81 1100, F-82 1010, F-83 1375, F-84 1456, F-85 1353, F-86 783, F-87 1269, F-90 1755, F-91 604, F-94 682, F-221 827, F-225 2383, F-226 1228, F-227 1536, F-231 1126, F-232 1409, F-235 1157, F-236 786, F-237 1779, F-240 2032, F-242 1056, F-243 1159, F-244 1210, F-245 1330, F-250 1293, F-251 1467, F-254 1099, F-255 2519, F-256 2408, F-265 1269, F-266 796, F-276 1430, F-277 1353, F-278 1561, F-281 1535, F-282 2601, F-285 1664, F-286 1146, F-287 1204, F-288 1178, F-289 601, F-290 1202, F-292 892, F-294 1011, F-296 1136, F-297 1680, F-298 2090, F-299 3108, F-303 1760, F-306 1275, F-307 1022, F-308 2130, F-309 981, F-310 940, F-311 794, F-312 1301, F-313 1105, F-314 1035, F-315 1210, F-320 1424, F-321 1593, F-322 855, F-323 1141, F-325 1397, F-327 1230, F-328 1064, F-330 1083, F-332 1303, F-333 1445, F-334 938, F-335 1083, F-336 665, F-337 1176, F-338 824, F-342 1431, F-344 1091, F-99 781, F-100 1059, F-102 783, F-103 749, F-104 913, F-106 1047, F-107 891, F-108 878, F-111 1364, F-112 756, F-203 1543, F-234 1221, F-283 979, F-295 706, F-118 1455, F-119 830, F-121 1870, F-122 915, F-123 1085, F-124 1121, F-125 663, F-128 840, F-129 1319, F-130 810, F-131 1424, F-132 1227, F-133 1238, F-135 693, F-136 1642, F-137 1449, F-140 1727, F-141 2282, F-142 958, F-143 1851, F-144 1412, F-145 1413, F-146 1023, F-147 1442, F-228 2330, F-230 768, F-239 959, F-248 745, F-249 1131, F-252 4166, F-253 2088, F-257 1907, F-258 2830, F-259 1236, F-262 1171, F-263 1720, F-270 1676, F-274 1198, F-275 1811, F-280 723, F-305 1480, F-316 958, F-318 2076, F-324 1073, F-326 1087, F-329 828, F-331 1328, F-339 1090, F-340 971, F-341 1233, F-343 1281, F-346 779, F-151 1614, F-154 967, F-155 1117, F-157 1117, F-158 632, F-159 1735, F-229 1485, F-264 2093, F-279 766, F-317 763, F-163 837, F-165 892, F-166 778, F-167 1150, F-168 973, F-169 1238, F-170 689, F-171 1186, F-172 1241, F-173 1718, F-174 2149, F-175 1298, F-176 1168, F-223 1894, F-271 734, F-272 1148, F-273 1324, F-300 865, F-319 1133, F-345 966, F-180 2349, F-181 1636, F-182 910, F-183 879
  POSITIONS.md: size: 87 entries over 600 characters: P-7 844, P-9 1279, P-10 630, P-11 709, P-12 720, P-19 758, P-25 1303, P-26 1344, P-27 829, P-28 828, P-29 670, P-30 747, P-32 805, P-33 1247, P-175 1704, P-37 1124, P-38 702, P-39 1402, P-40 1757, P-41 823, P-43 662, P-44 1386, P-45 1922, P-46 1174, P-47 933, P-48 1563, P-49 679, P-50 772, P-51 1019, P-54 831, P-55 1001, P-56 1114, P-57 1053, P-58 1393, P-59 774, P-60 1927, P-62 738, P-146 1116, P-147 1274, P-148 888, P-149 1049, P-151 1587, P-152 1412, P-154 1179, P-155 1147, P-156 1693, P-157 1214, P-158 752, P-160 1380, P-162 2040, P-163 1670, P-164 2176, P-167 1607, P-169 2561, P-170 1071, P-68 649, P-69 1126, P-71 792, P-72 665, P-73 1051, P-74 883, P-75 660, P-76 864, P-78 1395, P-79 1032, P-80 987, P-153 1071, P-159 1278, P-161 1771, P-165 1605, P-166 1155, P-168 1896, P-171 1839, P-172 2206, P-173 3043, P-174 3078, P-84 1233, P-85 884, P-87 968, P-88 1036, P-91 911, P-95 683, P-96 987, P-97 1146, P-102 704, P-103 648, P-125 602
record.py check: FACTS.md 278 entries, POSITIONS.md 101 entries; 0 failures; reported: size 2

```

## ledger.py check

`python3 /home/user/fortress-landing-29/explorations/coordinator/tools/ledger.py check --summary`, exit 0.

```
ledger.py check: fortress-gap-ledger.md, 967 rows, 0 fail the template

```

## ledger.py landing-check b430f9f42

`python3 /home/user/fortress-landing-29/explorations/coordinator/tools/ledger.py landing-check b430f9f42`, exit 0.

```
ledger.py landing-check: b430f9f42..HEAD: no finding

```

## check-index.sh

`bash explorations/coordinator/check-index.sh`, exit 0.

```
INDEX.md check — fa630b65fb
notes in scope: 518   index entries: 596

== notes missing from INDEX.md (0) ==

== index lines naming a file that does not exist (0) ==

== index lines outside the note set, informational (73) ==
explorations/compile-ladder/climb-batch-15b/RECORD.md
explorations/compile-ladder/climb-batch-3/JUDGE-review.md
explorations/compile-ladder/climb-batch-3/RECORD.md
explorations/compile-ladder/climb-batch-3/REPAIR-review.md
explorations/compile-ladder/climb-batch-4/RECORD.md
explorations/compile-ladder/climb-batch-5/followup-calculi/NOTE.md
explorations/compile-ladder/plan-25/probes/NOTES.md
explorations/compile-ladder/plan-29/PROBES.md
explorations/compile-ladder/plan-29/probes/literal-default.md
explorations/compile-ladder/plan-n/probe-q/PROBE-Q.md
explorations/compile-ladder/rung-integral-ops/shift-history.md
explorations/compile-ladder/rung-library-defects/REPORT.md
explorations/compile-ladder/rung-rr64-functions/round-history.md
explorations/compiler-probes/maybe-inference/inference.md
explorations/compiler-probes/vectors/vectors.md
explorations/coordinator/tools/ledger-pass/README.md
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

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/plan-moves.py --root /home/user/fortress-landing-29 --base fa630b65f`, exit 0.

```
plan-moves: 72 lines taken out of PLAN.md; PLAN-history.md gained 84 lines, under 11 headings
  gained heading: ### Where we stand
  gained heading: ### Pavol's answers, in the order they are needed
  gained heading: ### Off the path, parked
  gained heading: ### Climb batch 21, listed for his review
  gained heading: ### Phase 5. microGPT compiles
  gained heading: ### Phase 4. The switch-over
  gained heading: ### Phase 3's candidates at its end
  gained heading: ### Climb batch 15, listed for his review
  gained heading: ### Climb batch N's first run, listed for his review
  gained heading: ## Climb batch 29's landing, 2026-11-09
  gained heading: ### Climb batch 29, listed for his review
LOOK PLAN.md:85, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:205, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
plan-moves: pass; 2 PLAN lines to look at

```

## queue-check.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/queue-check.py --root /home/user/fortress-landing-29 --base fa630b65f`, exit 0.

```
queue-check: 471 items, 39 new (448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486); open 173, consequential 72, routine 101; pass

```

## lengths.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/lengths.py --root /home/user/fortress-landing-29 --base fa630b65f`, exit 0.

```
lengths: 53 entries changed
- F-32: 2123 to 1897 characters (-226), over 600
- F-35: 1166 to 1166 characters (+0), over 600
- F-44: 1832 to 1832 characters (+0), over 600
- F-57: 1408 to 1407 characters (-1), over 600
- F-58: 1466 to 1466 characters (+0), over 600
- F-63: 1265 to 1265 characters (+0), over 600
- F-73: 1456 to 1452 characters (-4), over 600
- F-74: 1609 to 931 characters (-678), over 600
- F-78: 1262 to 1262 characters (+0), over 600
- F-85: 1353 to 1353 characters (+0), over 600
- F-102: 783 to 783 characters (+0), over 600
- F-118: 1463 to 1455 characters (-8), over 600
- F-122: 881 to 915 characters (+34), grew past 600
- F-128: 775 to 840 characters (+65), grew past 600
- F-151: 1658 to 1614 characters (-44), over 600
- F-168: 973 to 973 characters (+0), over 600
- F-170: 689 to 689 characters (+0), over 600
- F-173: 1718 to 1718 characters (+0), over 600
- F-175: 1298 to 1298 characters (+0), over 600
- F-229: 1524 to 1485 characters (-39), over 600
- F-262: 1187 to 1171 characters (-16), over 600
- F-268: 598 to 598 characters (+0)
- F-272: 1148 to 1148 characters (+0), over 600
- F-276: 1430 to 1430 characters (+0), over 600
- F-278: 1611 to 1561 characters (-50), over 600
- F-279: 766 to 766 characters (+0), over 600
- F-283: 979 to 979 characters (+0), over 600
- F-285: 1619 to 1664 characters (+45), grew past 600
- F-286: 1146 to 1146 characters (+0), over 600
- F-302: 1318 to 1318 characters (+0), over 600
- F-303: 1760 to 1760 characters (+0), over 600
- F-304: 840 to 579 characters (-261)
- F-305: 1479 to 1480 characters (+1), grew past 600
- F-306: 1274 to 1275 characters (+1), grew past 600
- F-307: 1022 to 1022 characters (+0), over 600
- F-311: 794 to 794 characters (+0), over 600
- F-312: 1300 to 1301 characters (+1), grew past 600
- F-315: 1210 to 1210 characters (+0), over 600
- F-327: 1230 to 1230 characters (+0), over 600
- F-330: 1083 to 1083 characters (+0), over 600
- F-332: 1303 to 1303 characters (+0), over 600
- F-334: 938 to 938 characters (+0), over 600
- F-341: 1233 to 1233 characters (+0), over 600
- P-76: 984 to 864 characters (-120), over 600
- P-154: 1306 to 1179 characters (-127), over 600
- P-163: 1670 to 1670 characters (+0), over 600
- P-165: 1584 to 1605 characters (+21), grew past 600
- P-166: 1155 to 1155 characters (+0), over 600
- P-169: 2591 to 2561 characters (-30), over 600
- P-171: 1837 to 1839 characters (+2), grew past 600
- P-172: 2222 to 2206 characters (-16), over 600
- P-173: 3067 to 3043 characters (-24), over 600
- P-175: 1704 to 1704 characters (+0), over 600
lengths: 8 already over 600 grew: F-122 (+34), F-128 (+65), F-285 (+45), F-305 (+1), F-306 (+1), F-312 (+1), P-165 (+21), P-171 (+2)

```

## git diff --stat fa630b65f

`git diff --stat fa630b65f -- explorations/`, exit 0.

```
 explorations/coordinator/FACTS-history.md     | 262 ++++++++++++++
 explorations/coordinator/FACTS.md             |  86 ++---
 explorations/coordinator/PLAN-history.md      | 120 +++++++
 explorations/coordinator/PLAN.md              | 139 ++++----
 explorations/coordinator/POSITIONS-history.md |  60 ++++
 explorations/coordinator/POSITIONS.md         |  20 +-
 explorations/coordinator/review-queue.md      | 475 ++++++++++++++++++++------
 explorations/fortress-gap-ledger-history.md   |  24 ++
 explorations/fortress-gap-ledger.md           |   8 +-
 9 files changed, 954 insertions(+), 240 deletions(-)

```

