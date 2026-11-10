<!-- The record-landing workflow's mechanical checks, round final, in the worktree /home/user/fortress-landing-29b at f629cd2dd: one line per check, then each command with its output, written by checks.sh. -->

# The mechanical checks, round final

- reset: the six record files at f629cd2dd
- cut-only.txt: 1 of the 1 entries that cut-only.txt names have a line in the apply file
- words-subset.py, the cut-only lines (P-173): pass
- words-subset.py, every POSITIONS line of final.apply: exit 1 (information)
- record.py apply final.apply: pass
- ledger-clarity/apply.py final.rewrite: pass
- ledger.py add: no rows.add, no row added
- record.py check --base f629cd2dd: pass
- ledger.py check: pass
- ledger.py landing-check b5b0f82c1: pass
- check-index.sh: pass
- plan-moves.py: pass
  - plan-moves.py lists 2 PLAN lines to look at (its LOOK lines below)
- queue-check.py: pass
- lengths.py: pass
  - lengths.py: already over 600, and grew: F-57 (+5), F-118 (+157), F-128 (+33), F-129 (+187), F-262 (+53), F-324 (+7), F-342 (+4), F-345 (+41), F-347 (+79), P-174 (+99), P-176 (+78)
- git diff --stat f629cd2dd: pass

Every check passes.

## words-subset.py, the cut-only lines (P-173)

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-29b/tmp/cut-only.GmlXaY --root /home/user/fortress-landing-29b`, exit 0.

```
words-subset: 1 entries, 0 add words

```

## words-subset.py, every POSITIONS line of final.apply

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-29b/tmp/positions.Eb4rd1 --root /home/user/fortress-landing-29b`, exit 1.

```
P-174: adds a x4, type x2, the, or x2, as, static, digit, count, and, that, of, written, an, 960, 974, where, tree, departs, `00, 5`, walk, running, argument, object, trait, extends
P-176: adds a x4, place, and, coercion, that, type x2, 957, 971, whose, names, parameter, spawns, task
P-76: adds gave
P-172: adds it, 890`
P-165: adds 58-75`, 509`
P-171: adds 129-133`
P-163: adds 594`
P-166: adds 544`, 196`, 648`
P-175: adds 7068`
words-subset: 10 entries, 9 add words

```

## record.py apply final.apply

`python3 /home/user/fortress-landing-29b/explorations/coordinator/tools/record.py apply /home/user/fortress-landing-29b/explorations/compile-ladder/climb-batch-29b/record-landing/final.apply --by climb batch 29b landing workflow (Opus)`, exit 0.

```
F-57: rewritten
F-118: rewritten
F-262: rewritten
F-341: rewritten
F-346: rewritten
F-347: rewritten
F-342: rewritten
F-345: rewritten
F-131: rewritten
F-324: rewritten
F-180: rewritten
F-128: rewritten
F-129: rewritten
F-240: noted
F-301: rewritten
F-302: rewritten
F-35: rewritten
F-44: rewritten
F-58: rewritten
F-63: rewritten
F-74: rewritten
F-78: rewritten
F-85: rewritten
F-268: rewritten
F-276: rewritten
F-279: rewritten
F-285: rewritten
F-286: rewritten
F-303: rewritten
F-305: rewritten
F-306: rewritten
F-307: rewritten
F-311: rewritten
F-312: rewritten
F-315: rewritten
F-321: rewritten
F-327: rewritten
F-330: rewritten
F-332: rewritten
F-334: rewritten
P-173: rewritten
P-174: rewritten
P-176: rewritten
P-76: rewritten
P-172: rewritten
P-165: rewritten
P-171: rewritten
P-163: rewritten
P-166: rewritten
P-175: rewritten

```

## ledger-clarity/apply.py final.rewrite

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../ledger-clarity/apply.py /home/user/fortress-landing-29b/tmp/rows.hBI3it --root /home/user/fortress-landing-29b`, exit 0.

```
row 971: rewritten (1178 characters); its earlier line is in fortress-gap-ledger-history.md
row 960: rewritten (1135 characters); its earlier line is in fortress-gap-ledger-history.md
row 442: rewritten (1185 characters); its earlier line is in fortress-gap-ledger-history.md
apply.py: 3 changes

```

## record.py check --base f629cd2dd

`python3 /home/user/fortress-landing-29b/explorations/coordinator/tools/record.py check --base f629cd2dd`, exit 0.

```
reported, not failing:
  FACTS.md: size: 237 entries over 600 characters: F-7 818, F-11 848, F-12 1308, F-18 1265, F-19 1743, F-20 948, F-21 1049, F-22 1482, F-24 950, F-25 948, F-26 1878, F-27 1769, F-29 1557, F-269 1197, F-291 1203, F-301 1509, F-302 1318, F-32 1897, F-34 1773, F-35 1166, F-37 755, F-39 1365, F-40 1856, F-41 944, F-42 633, F-43 705, F-44 1832, F-45 1591, F-46 1445, F-47 1548, F-48 965, F-49 646, F-50 1035, F-51 623, F-52 844, F-53 1490, F-54 740, F-55 956, F-57 1500, F-58 1466, F-59 1389, F-60 697, F-61 998, F-63 1265, F-64 848, F-65 786, F-66 794, F-67 998, F-69 745, F-70 902, F-71 860, F-72 794, F-73 1452, F-74 931, F-75 1206, F-76 1597, F-77 619, F-78 1262, F-79 1392, F-80 1202, F-81 1100, F-82 1010, F-83 1375, F-84 1456, F-85 1353, F-86 783, F-87 1269, F-90 1755, F-91 604, F-94 682, F-221 827, F-225 2383, F-226 1228, F-227 1536, F-231 1126, F-232 1409, F-235 1157, F-236 786, F-237 1779, F-240 2034, F-242 1056, F-243 1159, F-244 1210, F-245 1330, F-250 1293, F-251 1467, F-254 1099, F-255 2519, F-256 2408, F-265 1269, F-266 796, F-276 1430, F-277 1353, F-278 1561, F-281 1535, F-282 2601, F-285 1664, F-286 1146, F-287 1204, F-288 1178, F-289 601, F-290 1202, F-292 892, F-294 1011, F-296 1136, F-297 1680, F-298 2090, F-299 3108, F-303 1760, F-306 1274, F-307 1022, F-308 2130, F-309 981, F-310 940, F-311 794, F-312 1300, F-313 1105, F-314 1035, F-315 1210, F-320 1424, F-321 1593, F-322 855, F-323 1141, F-325 1397, F-327 1230, F-328 1064, F-330 1083, F-332 1303, F-333 1445, F-334 938, F-335 1083, F-336 665, F-337 1176, F-338 824, F-342 1816, F-344 1091, F-99 781, F-100 1059, F-102 783, F-103 749, F-104 913, F-106 1047, F-107 891, F-108 878, F-111 1364, F-112 798, F-203 1543, F-234 1221, F-283 979, F-295 706, F-118 1363, F-119 830, F-121 1870, F-122 915, F-123 1085, F-124 1121, F-125 663, F-128 873, F-129 1506, F-130 810, F-131 1405, F-132 1227, F-133 1238, F-135 693, F-136 1642, F-137 1449, F-140 1727, F-141 2282, F-142 958, F-143 1851, F-144 1412, F-145 1413, F-146 1023, F-147 1442, F-228 2330, F-230 768, F-239 959, F-248 745, F-249 1131, F-252 4166, F-253 2088, F-257 1907, F-258 2830, F-259 1236, F-262 1344, F-263 1720, F-270 1676, F-274 1198, F-275 1811, F-280 723, F-305 1479, F-316 958, F-318 2076, F-324 1080, F-326 1087, F-329 828, F-331 1328, F-339 1090, F-340 1350, F-341 1656, F-343 1281, F-346 1002, F-347 1552, F-151 1614, F-154 967, F-155 1117, F-157 1117, F-158 632, F-159 1735, F-229 1485, F-264 2093, F-279 766, F-317 763, F-163 837, F-165 892, F-166 778, F-167 1150, F-168 973, F-169 1191, F-170 689, F-171 1186, F-172 1241, F-173 1718, F-174 2149, F-175 1298, F-176 1168, F-223 1894, F-271 734, F-272 1148, F-273 1324, F-300 865, F-319 1133, F-345 1580, F-180 2337, F-181 1636, F-182 910, F-183 879
  POSITIONS.md: size: 88 entries over 600 characters: P-7 844, P-9 1279, P-10 630, P-11 709, P-12 720, P-19 758, P-25 1303, P-26 1344, P-27 829, P-28 828, P-29 670, P-30 747, P-32 805, P-33 1247, P-175 1704, P-37 1321, P-38 702, P-39 1402, P-40 1962, P-41 823, P-43 662, P-44 1386, P-45 1922, P-46 1174, P-47 933, P-48 1563, P-49 679, P-50 772, P-51 1019, P-54 831, P-55 1001, P-56 1114, P-57 1053, P-58 1393, P-59 774, P-60 1927, P-62 738, P-146 1116, P-147 1274, P-148 888, P-149 1049, P-151 1587, P-152 1412, P-154 1179, P-155 1147, P-156 1693, P-157 1214, P-158 752, P-160 1380, P-162 2040, P-163 1670, P-164 2176, P-167 1607, P-169 2561, P-170 1071, P-68 649, P-69 1126, P-71 792, P-72 665, P-73 1051, P-74 883, P-75 660, P-76 864, P-78 1395, P-79 1032, P-80 987, P-153 1071, P-159 1278, P-161 1771, P-165 1649, P-166 1155, P-168 1701, P-171 1839, P-172 2060, P-173 3144, P-174 2287, P-176 1140, P-84 1233, P-85 884, P-87 968, P-88 1036, P-91 911, P-95 683, P-96 987, P-97 1146, P-102 704, P-103 648, P-125 602
record.py check: FACTS.md 279 entries, POSITIONS.md 102 entries; 0 failures; reported: size 2

```

## ledger.py check

`python3 /home/user/fortress-landing-29b/explorations/coordinator/tools/ledger.py check --summary`, exit 0.

```
ledger.py check: fortress-gap-ledger.md, 973 rows, 0 fail the template

```

## ledger.py landing-check b5b0f82c1

`python3 /home/user/fortress-landing-29b/explorations/coordinator/tools/ledger.py landing-check b5b0f82c1`, exit 0.

```
ledger.py landing-check: b5b0f82c1..HEAD: no finding

```

## check-index.sh

`bash explorations/coordinator/check-index.sh`, exit 0.

```
INDEX.md check — f629cd2dd3
notes in scope: 536   index entries: 616

== notes missing from INDEX.md (0) ==

== index lines naming a file that does not exist (0) ==

== index lines outside the note set, informational (75) ==
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
explorations/compile-ladder/plan-30/probes/draft-numerals.md
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

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/plan-moves.py --root /home/user/fortress-landing-29b --base f629cd2dd`, exit 0.

```
plan-moves: 33 lines taken out of PLAN.md; PLAN-history.md gained 40 lines, under 6 headings
  gained heading: ### Where we stand
  gained heading: ### Pavol's answers, in the order they are needed
  gained heading: ### Phase 4. The switch-over
  gained heading: ### Climb batch 29, listed for his review
  gained heading: ## Climb batch 29b's landing, 2026-11-10
  gained heading: ### Climb batch 29b, listed for his review
LOOK PLAN.md:85, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:211, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
plan-moves: pass; 2 PLAN lines to look at

```

## queue-check.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/queue-check.py --root /home/user/fortress-landing-29b --base f629cd2dd`, exit 0.

```
queue-check: 484 items, 13 new (487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499); open 179, consequential 70, routine 109; pass

```

## lengths.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/lengths.py --root /home/user/fortress-landing-29b --base f629cd2dd`, exit 0.

```
lengths: 49 entries changed
- F-35: 1166 to 1166 characters (+0), over 600
- F-44: 1832 to 1832 characters (+0), over 600
- F-57: 1495 to 1500 characters (+5), grew past 600
- F-58: 1466 to 1466 characters (+0), over 600
- F-63: 1265 to 1265 characters (+0), over 600
- F-74: 931 to 931 characters (+0), over 600
- F-78: 1262 to 1262 characters (+0), over 600
- F-85: 1353 to 1353 characters (+0), over 600
- F-118: 1206 to 1363 characters (+157), grew past 600
- F-128: 840 to 873 characters (+33), grew past 600
- F-129: 1319 to 1506 characters (+187), grew past 600
- F-131: 1424 to 1405 characters (-19), over 600
- F-180: 2349 to 2337 characters (-12), over 600
- F-262: 1291 to 1344 characters (+53), grew past 600
- F-268: 598 to 598 characters (+0)
- F-276: 1430 to 1430 characters (+0), over 600
- F-279: 766 to 766 characters (+0), over 600
- F-285: 1664 to 1664 characters (+0), over 600
- F-286: 1146 to 1146 characters (+0), over 600
- F-301: 1509 to 1509 characters (+0), over 600
- F-302: 1318 to 1318 characters (+0), over 600
- F-303: 1760 to 1760 characters (+0), over 600
- F-305: 1480 to 1479 characters (-1), over 600
- F-306: 1275 to 1274 characters (-1), over 600
- F-307: 1022 to 1022 characters (+0), over 600
- F-311: 794 to 794 characters (+0), over 600
- F-312: 1301 to 1300 characters (-1), over 600
- F-315: 1210 to 1210 characters (+0), over 600
- F-321: 1593 to 1593 characters (+0), over 600
- F-324: 1073 to 1080 characters (+7), grew past 600
- F-327: 1230 to 1230 characters (+0), over 600
- F-330: 1083 to 1083 characters (+0), over 600
- F-332: 1303 to 1303 characters (+0), over 600
- F-334: 938 to 938 characters (+0), over 600
- F-341: 1699 to 1656 characters (-43), over 600
- F-342: 1812 to 1816 characters (+4), grew past 600
- F-345: 1539 to 1580 characters (+41), grew past 600
- F-346: 1005 to 1002 characters (-3), over 600
- F-347: 1473 to 1552 characters (+79), grew past 600
- P-76: 864 to 864 characters (+0), over 600
- P-163: 1670 to 1670 characters (+0), over 600
- P-165: 1649 to 1649 characters (+0), over 600
- P-166: 1155 to 1155 characters (+0), over 600
- P-171: 1839 to 1839 characters (+0), over 600
- P-172: 2115 to 2060 characters (-55), over 600
- P-173: 3166 to 3144 characters (-22), over 600
- P-174: 2188 to 2287 characters (+99), grew past 600
- P-175: 1704 to 1704 characters (+0), over 600
- P-176: 1062 to 1140 characters (+78), grew past 600
lengths: 11 already over 600 grew: F-57 (+5), F-118 (+157), F-128 (+33), F-129 (+187), F-262 (+53), F-324 (+7), F-342 (+4), F-345 (+41), F-347 (+79), P-174 (+99), P-176 (+78)

```

## git diff --stat f629cd2dd

`git diff --stat f629cd2dd -- explorations/`, exit 0.

```
 explorations/coordinator/FACTS-history.md          | 238 +++++++++++++++++++++
 explorations/coordinator/FACTS.md                  |  78 +++----
 explorations/coordinator/PLAN-history.md           |  59 +++++
 explorations/coordinator/PLAN.md                   |  67 +++---
 explorations/coordinator/POSITIONS-history.md      |  60 ++++++
 explorations/coordinator/POSITIONS.md              |  20 +-
 explorations/coordinator/map/dormant-code.md       |   6 +-
 .../coordinator/map/spec-to-implementation.md      |  10 +-
 explorations/coordinator/review-queue.md           | 195 +++++++++++++----
 explorations/fortress-gap-ledger-history.md        |  18 ++
 explorations/fortress-gap-ledger.md                |   6 +-
 11 files changed, 619 insertions(+), 138 deletions(-)

```

