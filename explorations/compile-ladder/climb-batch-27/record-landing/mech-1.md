<!-- The record-landing workflow's mechanical checks, round 1, in the worktree /home/user/fortress-landing-27 at 38887293f: one line per check, then each command with its output, written by checks.sh. -->

# The mechanical checks, round 1

- reset: the six record files at 38887293f
- words-subset.py: no cut-only.txt, nothing to check
- words-subset.py, every POSITIONS line of record.apply: exit 1 (information)
- record.py apply record.apply: pass
- ledger-clarity/apply.py rows.rewrite: pass
- ledger.py add: no rows.add, no row added
- record.py check --base 38887293f: pass
- ledger.py check: pass
- ledger.py landing-check ed8652dc0: pass
- check-index.sh: pass
- plan-moves.py: pass
  - plan-moves.py lists 2 PLAN lines to look at (its LOOK lines below)
- queue-check.py: pass
- lengths.py: pass
  - lengths.py: already over 600, and grew: F-32 (+81), F-34 (+165), F-53 (+161), F-54 (+204), F-123 (+115), F-151 (+3), F-240 (+70), F-281 (+75), F-288 (+122), F-299 (+282), F-308 (+45), F-318 (+43), F-325 (+58), F-329 (+31), P-160 (+10), P-167 (+19), P-168 (+49)
- git diff --stat 38887293f: pass

Every check passes.

## words-subset.py, every POSITIONS line of record.apply

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-27/tmp/positions.9MZoFS --root /home/user/fortress-landing-27`, exit 1.

```
P-160: adds went, was, f-324, got, left, leaned, were
P-163: adds 665`, 460-466`
P-165: adds `asfloat`, each, number, own, at x2, of, types, by, norm, landed, worker's, eight, f-324
P-166: adds is, 648`, f-326
P-167: adds compiled, path, reads, one, once, library
P-168: adds the, and, own, row, 907, prelude's, ` x2, keeps, until, switch-over, tests, it, f-326
words-subset: 6 entries, 6 add words

```

## record.py apply record.apply

`python3 /home/user/fortress-landing-27/explorations/coordinator/tools/record.py apply /home/user/fortress-landing-27/explorations/compile-ladder/climb-batch-27/record-landing/record.apply --by climb batch 27 landing workflow (Opus)`, exit 0.

```
F-53: rewritten
F-240: rewritten
F-283: rewritten
F-323: rewritten
F-325: rewritten
F-327: rewritten
F-329: rewritten
F-54: rewritten
F-281: rewritten
F-288: rewritten
F-32: rewritten
F-299: rewritten
F-57: rewritten
F-308: rewritten
F-131: rewritten
F-151: rewritten
F-311: rewritten
F-318: rewritten
F-34: rewritten
F-29: rewritten
F-123: rewritten
P-160: rewritten
P-163: rewritten
P-165: rewritten
P-166: rewritten
P-167: rewritten
P-168: rewritten
F-324: noted

```

## ledger-clarity/apply.py rows.rewrite

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../ledger-clarity/apply.py /home/user/fortress-landing-27/tmp/rows.XP8KZ9 --root /home/user/fortress-landing-27`, exit 0.

```
row 52: rewritten (710 characters); its earlier line is in fortress-gap-ledger-history.md
apply.py: 1 changes

```

## record.py check --base 38887293f

`python3 /home/user/fortress-landing-27/explorations/coordinator/tools/record.py check --base 38887293f`, exit 0.

```
reported, not failing:
  FACTS.md: size: 220 entries over 600 characters: F-7 818, F-11 848, F-12 1308, F-18 1265, F-19 1743, F-20 948, F-21 1049, F-22 1482, F-24 950, F-25 948, F-26 1878, F-27 1769, F-29 1557, F-269 1197, F-291 1203, F-301 1509, F-302 1318, F-32 2034, F-34 1690, F-35 1166, F-37 755, F-39 1365, F-40 1856, F-41 944, F-42 633, F-43 705, F-44 1779, F-45 1591, F-46 1445, F-47 1548, F-48 965, F-49 646, F-50 1035, F-51 623, F-52 844, F-53 1862, F-54 812, F-55 954, F-57 1443, F-58 1466, F-59 1389, F-60 697, F-61 998, F-63 1264, F-64 848, F-65 786, F-66 794, F-67 998, F-69 745, F-70 902, F-71 860, F-72 794, F-73 1252, F-74 1513, F-75 1206, F-76 1576, F-77 619, F-78 1262, F-79 1435, F-80 1202, F-81 1100, F-82 1010, F-83 1375, F-84 1631, F-85 1353, F-86 783, F-87 1269, F-90 1755, F-91 604, F-94 682, F-221 827, F-225 2383, F-226 1228, F-227 1536, F-231 1126, F-232 1409, F-235 1157, F-236 786, F-237 1779, F-240 2030, F-242 1056, F-243 1159, F-244 1210, F-245 1330, F-250 1293, F-251 1467, F-254 1099, F-255 2450, F-256 2408, F-265 1269, F-266 796, F-276 1430, F-277 1353, F-278 1566, F-281 1576, F-282 2601, F-285 1622, F-286 1146, F-287 1204, F-288 1216, F-289 601, F-290 854, F-292 892, F-294 1011, F-296 1136, F-297 1680, F-298 2090, F-299 3431, F-303 1760, F-306 1274, F-307 994, F-308 1995, F-309 981, F-310 940, F-311 794, F-312 1298, F-313 1105, F-314 1035, F-315 1210, F-320 1424, F-321 1299, F-322 855, F-323 1141, F-325 1397, F-327 1239, F-328 1037, F-330 1064, F-99 781, F-100 1059, F-102 783, F-103 749, F-104 913, F-106 1047, F-107 891, F-108 878, F-111 1364, F-112 756, F-203 1543, F-234 1221, F-283 932, F-295 706, F-118 1218, F-119 830, F-121 1870, F-122 881, F-123 1028, F-124 1121, F-125 663, F-128 775, F-129 1319, F-130 810, F-131 1320, F-132 1187, F-133 1238, F-135 693, F-136 1642, F-137 1613, F-140 1671, F-141 2282, F-142 958, F-143 1851, F-144 1412, F-145 1413, F-146 1023, F-147 1442, F-228 2308, F-230 768, F-239 959, F-248 745, F-249 1035, F-252 4166, F-253 2085, F-257 1907, F-258 2830, F-259 1236, F-263 1933, F-270 1676, F-274 1198, F-275 1811, F-280 723, F-304 873, F-305 1479, F-316 958, F-318 2076, F-324 1073, F-326 991, F-329 828, F-151 1652, F-154 967, F-155 1117, F-157 1117, F-158 632, F-159 1731, F-229 1609, F-264 2093, F-279 766, F-317 763, F-163 837, F-165 892, F-166 778, F-167 1150, F-168 973, F-169 1126, F-170 689, F-171 1186, F-172 1035, F-173 1718, F-174 2149, F-175 1298, F-176 1168, F-223 1894, F-271 734, F-272 1148, F-273 1324, F-300 865, F-319 1133, F-180 2349, F-181 1636, F-182 910, F-183 879
  POSITIONS.md: size: 80 entries over 600 characters: P-7 844, P-9 1279, P-10 630, P-11 709, P-12 720, P-19 758, P-25 1303, P-26 1344, P-27 829, P-28 828, P-29 670, P-30 747, P-32 805, P-33 1247, P-37 1124, P-38 702, P-39 1402, P-40 1716, P-41 823, P-43 662, P-44 1386, P-45 1922, P-46 1174, P-47 933, P-48 1563, P-49 679, P-50 772, P-51 1019, P-54 831, P-55 1001, P-56 1114, P-57 1053, P-58 1164, P-59 774, P-60 1927, P-62 738, P-146 1116, P-147 1274, P-148 888, P-149 1049, P-151 1587, P-152 1412, P-154 1306, P-155 1147, P-156 1693, P-157 1214, P-158 752, P-160 1380, P-162 2040, P-163 1670, P-164 2310, P-167 1494, P-68 649, P-69 1126, P-71 792, P-72 665, P-73 1051, P-74 883, P-75 660, P-76 1182, P-78 1395, P-79 1032, P-80 987, P-153 1071, P-159 1278, P-161 1853, P-165 1467, P-166 1163, P-168 1652, P-84 933, P-85 851, P-87 968, P-88 1036, P-91 911, P-95 683, P-96 987, P-97 1146, P-102 704, P-103 648, P-125 602
record.py check: FACTS.md 262 entries, POSITIONS.md 94 entries; 0 failures; reported: size 2

```

## ledger.py check

`python3 /home/user/fortress-landing-27/explorations/coordinator/tools/ledger.py check --summary`, exit 0.

```
ledger.py check: fortress-gap-ledger.md, 928 rows, 0 fail the template

```

## ledger.py landing-check ed8652dc0

`python3 /home/user/fortress-landing-27/explorations/coordinator/tools/ledger.py landing-check ed8652dc0`, exit 0.

```
ledger.py landing-check: ed8652dc0..HEAD: no finding

```

## check-index.sh

`bash explorations/coordinator/check-index.sh`, exit 0.

```
INDEX.md check — 38887293f
notes in scope: 505   index entries: 581

== notes missing from INDEX.md (0) ==

== index lines naming a file that does not exist (0) ==

== index lines outside the note set, informational (71) ==
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

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/plan-moves.py --root /home/user/fortress-landing-27 --base 38887293f`, exit 0.

```
plan-moves: 51 lines taken out of PLAN.md; PLAN-history.md gained 60 lines, under 8 headings
  gained heading: ### Where we stand
  gained heading: ### Pavol's answers, in the order they are needed
  gained heading: ### Phase 4. The switch-over
  gained heading: ### Climb batch 24, listed for his review
  gained heading: ### Climb batch 25, listed for his review
  gained heading: ### Climb batch 26, listed for his review
  gained heading: ## Climb batch 27's landing, 2026-11-07
  gained heading: ### Climb batch 27, listed for his review
LOOK PLAN.md:79, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, the walk half of the numeral switch (P-76; `reviews/numeral-switch-judgement.md` section 4.4), in the batch whose step gives walk the checker's static
LOOK PLAN.md:199, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280c "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
plan-moves: pass; 2 PLAN lines to look at

```

## queue-check.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/queue-check.py --root /home/user/fortress-landing-27 --base 38887293f`, exit 0.

```
queue-check: 390 items, 33 new (373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405); open 107, consequential 48, routine 59; pass

```

## lengths.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/lengths.py --root /home/user/fortress-landing-27 --base 38887293f`, exit 0.

```
lengths: 27 entries changed
- F-29: 1568 to 1557 characters (-11), over 600
- F-32: 1953 to 2034 characters (+81), grew past 600
- F-34: 1525 to 1690 characters (+165), grew past 600
- F-53: 1701 to 1862 characters (+161), grew past 600
- F-54: 608 to 812 characters (+204), grew past 600
- F-57: 1447 to 1443 characters (-4), over 600
- F-123: 913 to 1028 characters (+115), grew past 600
- F-131: 1330 to 1320 characters (-10), over 600
- F-151: 1649 to 1652 characters (+3), grew past 600
- F-240: 1960 to 2030 characters (+70), grew past 600
- F-281: 1501 to 1576 characters (+75), grew past 600
- F-283: 1409 to 932 characters (-477), over 600
- F-288: 1094 to 1216 characters (+122), grew past 600
- F-299: 3149 to 3431 characters (+282), grew past 600
- F-308: 1950 to 1995 characters (+45), grew past 600
- F-311: 912 to 794 characters (-118), over 600
- F-318: 2033 to 2076 characters (+43), grew past 600
- F-323: 1172 to 1141 characters (-31), over 600
- F-325: 1339 to 1397 characters (+58), grew past 600
- F-327: 1262 to 1239 characters (-23), over 600
- F-329: 797 to 828 characters (+31), grew past 600
- P-160: 1370 to 1380 characters (+10), grew past 600
- P-163: 1847 to 1670 characters (-177), over 600
- P-165: 1501 to 1467 characters (-34), over 600
- P-166: 1279 to 1163 characters (-116), over 600
- P-167: 1475 to 1494 characters (+19), grew past 600
- P-168: 1603 to 1652 characters (+49), grew past 600
lengths: 17 already over 600 grew: F-32 (+81), F-34 (+165), F-53 (+161), F-54 (+204), F-123 (+115), F-151 (+3), F-240 (+70), F-281 (+75), F-288 (+122), F-299 (+282), F-308 (+45), F-318 (+43), F-325 (+58), F-329 (+31), P-160 (+10), P-167 (+19), P-168 (+49)

```

## git diff --stat 38887293f

`git diff --stat 38887293f -- explorations/`, exit 0.

```
 .../compile-ladder/climb-batch-27/RECORD.md        |   4 +
 explorations/coordinator/FACTS-history.md          | 130 +++++++++
 explorations/coordinator/FACTS.md                  |  42 +--
 explorations/coordinator/PLAN-history.md           |  86 ++++++
 explorations/coordinator/PLAN.md                   | 100 +++----
 explorations/coordinator/POSITIONS-history.md      |  36 +++
 explorations/coordinator/POSITIONS.md              |  12 +-
 .../coordinator/map/spec-to-implementation.md      |   2 +-
 explorations/coordinator/review-queue.md           | 320 ++++++++++++++++++---
 explorations/fortress-gap-ledger-history.md        |   6 +
 explorations/fortress-gap-ledger.md                |   2 +-
 11 files changed, 620 insertions(+), 120 deletions(-)

```

