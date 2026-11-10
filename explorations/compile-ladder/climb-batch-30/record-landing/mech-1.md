<!-- The record-landing workflow's mechanical checks, round 1, in the worktree /home/user/fortress-landing-30 at f592b7c0f: one line per check, then each command with its output, written by checks.sh. -->

# The mechanical checks, round 1

- reset: the six record files at f592b7c0f
- words-subset.py: no cut-only.txt, nothing to check
- words-subset.py, every POSITIONS line of record.apply: exit 1 (information)
- record.py apply record.apply: pass
- ledger-clarity/apply.py: no rows.rewrite, no row changed
- ledger.py add, row line 1 of rows.add, in "11. Parallelism, exceptions and control flow": pass
  - row 987, in "11. Parallelism, exceptions and control flow"
- record.py check --base f592b7c0f: pass
- ledger.py check: pass
- ledger.py landing-check 9d0147ff9: pass
- check-index.sh: pass
- plan-moves.py: pass
  - plan-moves.py lists 2 PLAN lines to look at (its LOOK lines below)
- queue-check.py: pass
- lengths.py: pass
  - lengths.py: already over 600, and grew: F-283 (+10), F-341 (+532), F-348 (+135), F-350 (+330)
- git diff --stat f592b7c0f: pass

Every check passes.

## words-subset.py, every POSITIONS line of record.apply

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-30/tmp/positions.eoQtOK --root /home/user/fortress-landing-30`, exit 1.

```
P-175: adds the, split, when, he, decided, 1312-1350`, evaluated, have, ran, did, then, joined, f-350, gives, what, tree, now
P-174: adds in, 981, `comprises`, clause
P-176: adds holds, row
words-subset: 3 entries, 3 add words

```

## record.py apply record.apply

`python3 /home/user/fortress-landing-30/explorations/coordinator/tools/record.py apply /home/user/fortress-landing-30/explorations/compile-ladder/climb-batch-30/record-landing/record.apply --by climb batch 30 landing workflow (Opus)`, exit 0.

```
F-19: rewritten
F-134: rewritten
F-347: rewritten
F-348: rewritten
F-349: rewritten
F-350: rewritten
F-351: rewritten
F-57: rewritten
F-341: rewritten
F-283: rewritten
F-175: rewritten
F-268: rewritten
F-302: rewritten
F-315: rewritten
F-337: rewritten
P-175: rewritten
P-174: rewritten
P-176: rewritten

```

## ledger.py add, row line 1 of rows.add, in "11. Parallelism, exceptions and control flow"

`python3 /home/user/fortress-landing-30/explorations/coordinator/tools/ledger.py add /home/user/fortress-landing-30/tmp/adds.Gi6gjQ/row-1.txt --section 11. Parallelism, exceptions and control flow`, exit 0.

```
row 987, in "11. Parallelism, exceptions and control flow"
rows that cite the same files: 938, 947, 951, 982

```

## record.py check --base f592b7c0f

`python3 /home/user/fortress-landing-30/explorations/coordinator/tools/record.py check --base f592b7c0f`, exit 0.

```
reported, not failing:
  FACTS.md: size: 242 entries over 600 characters: F-7 818, F-11 848, F-12 1308, F-18 1265, F-19 1992, F-20 948, F-21 1049, F-22 1482, F-24 950, F-25 948, F-26 1878, F-27 1769, F-29 1557, F-269 1197, F-291 1203, F-301 1509, F-302 1318, F-348 1418, F-350 1526, F-351 1773, F-32 1897, F-34 1773, F-35 1166, F-37 755, F-39 1365, F-40 1856, F-41 944, F-42 633, F-43 705, F-44 1832, F-45 1591, F-46 1445, F-47 1548, F-48 965, F-49 646, F-50 1035, F-51 623, F-52 844, F-53 1489, F-54 740, F-55 956, F-57 1466, F-58 1466, F-59 1389, F-60 697, F-61 998, F-63 1265, F-64 848, F-65 786, F-66 794, F-67 998, F-69 745, F-70 902, F-71 860, F-72 794, F-73 1452, F-74 931, F-75 1206, F-76 1597, F-77 619, F-78 1262, F-79 1392, F-80 1202, F-81 1100, F-82 1010, F-83 1375, F-84 1456, F-85 1353, F-86 783, F-87 1269, F-90 1755, F-91 604, F-94 682, F-221 827, F-225 2383, F-226 1228, F-227 1536, F-231 1126, F-232 1409, F-235 1157, F-236 786, F-237 1779, F-240 2031, F-242 1056, F-243 1159, F-244 1210, F-245 1330, F-250 1293, F-251 1467, F-254 1099, F-255 2519, F-256 2408, F-265 1269, F-266 796, F-276 1430, F-277 1353, F-278 1561, F-281 1535, F-282 2601, F-285 1664, F-286 1146, F-287 1204, F-288 1178, F-289 601, F-290 1202, F-292 892, F-294 1011, F-296 1136, F-297 1680, F-298 2090, F-299 3108, F-303 1760, F-306 1274, F-307 1022, F-308 2130, F-309 981, F-310 940, F-311 794, F-312 1300, F-313 1105, F-314 1035, F-315 1210, F-320 1424, F-321 1593, F-322 855, F-323 1141, F-325 1397, F-327 1230, F-328 1064, F-330 1083, F-332 1303, F-333 1445, F-334 938, F-335 1083, F-336 665, F-337 1176, F-338 824, F-342 1816, F-344 1091, F-99 781, F-100 1059, F-102 783, F-103 749, F-104 913, F-106 1047, F-107 891, F-108 878, F-111 1364, F-112 798, F-203 1543, F-234 1221, F-283 989, F-295 706, F-118 1363, F-119 830, F-121 1870, F-122 915, F-123 1085, F-124 1121, F-125 663, F-128 873, F-129 1506, F-130 810, F-131 1405, F-132 1227, F-133 1238, F-134 645, F-135 693, F-136 1642, F-137 1449, F-140 1727, F-141 2282, F-142 958, F-143 1851, F-144 1412, F-145 1413, F-146 1023, F-147 1442, F-228 2330, F-230 768, F-239 959, F-248 745, F-249 1131, F-252 4166, F-253 2088, F-257 1907, F-258 2830, F-259 1236, F-262 1344, F-263 1720, F-270 1676, F-274 1198, F-275 1811, F-280 723, F-305 1479, F-316 958, F-318 2076, F-324 1080, F-326 1087, F-329 828, F-331 1328, F-339 1090, F-340 1350, F-341 2188, F-343 1281, F-346 1002, F-347 1558, F-349 874, F-151 1614, F-154 967, F-155 1117, F-157 1117, F-158 632, F-159 1735, F-229 1485, F-264 2093, F-279 766, F-317 763, F-163 837, F-165 892, F-166 778, F-167 1150, F-168 973, F-169 1191, F-170 689, F-171 1186, F-172 1241, F-173 1718, F-174 2149, F-175 1298, F-176 1168, F-223 1894, F-271 734, F-272 1148, F-273 1324, F-300 865, F-319 1133, F-345 1580, F-180 2337, F-181 1636, F-182 910, F-183 879
  POSITIONS.md: size: 88 entries over 600 characters: P-7 844, P-9 1279, P-10 630, P-11 709, P-12 720, P-19 758, P-25 1303, P-26 1344, P-27 829, P-28 828, P-29 670, P-30 747, P-32 805, P-33 1247, P-175 1701, P-37 1321, P-38 702, P-39 1402, P-40 1962, P-41 823, P-43 662, P-44 1386, P-45 1922, P-46 1174, P-47 933, P-48 1563, P-49 679, P-50 772, P-51 1019, P-54 831, P-55 1001, P-56 1114, P-57 1053, P-58 1393, P-59 774, P-60 1927, P-62 738, P-146 1116, P-147 1274, P-148 888, P-149 1049, P-151 1587, P-152 1412, P-154 1179, P-155 1147, P-156 1693, P-157 1214, P-158 752, P-160 1380, P-162 2040, P-163 1670, P-164 2176, P-167 1607, P-169 2561, P-170 1071, P-68 649, P-69 1126, P-71 792, P-72 665, P-73 1051, P-74 883, P-75 660, P-76 864, P-78 1395, P-79 1032, P-80 987, P-153 1071, P-159 1278, P-161 1771, P-165 1649, P-166 1155, P-168 1701, P-171 1839, P-172 2060, P-173 3144, P-174 2243, P-176 1097, P-84 1233, P-85 884, P-87 968, P-88 1036, P-91 911, P-95 683, P-96 987, P-97 1146, P-102 704, P-103 648, P-125 602
record.py check: FACTS.md 283 entries, POSITIONS.md 102 entries; 0 failures; reported: size 2

```

## ledger.py check

`python3 /home/user/fortress-landing-30/explorations/coordinator/tools/ledger.py check --summary`, exit 0.

```
ledger.py check: fortress-gap-ledger.md, 986 rows, 0 fail the template

```

## ledger.py landing-check 9d0147ff9

`python3 /home/user/fortress-landing-30/explorations/coordinator/tools/ledger.py landing-check 9d0147ff9`, exit 0.

```
ledger.py landing-check: 9d0147ff9..HEAD: no finding

```

## check-index.sh

`bash explorations/coordinator/check-index.sh`, exit 0.

```
INDEX.md check — f592b7c0f0
notes in scope: 547   index entries: 628

== notes missing from INDEX.md (0) ==

== index lines naming a file that does not exist (0) ==

== index lines outside the note set, informational (76) ==
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

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/plan-moves.py --root /home/user/fortress-landing-30 --base f592b7c0f`, exit 0.

```
plan-moves: 42 lines taken out of PLAN.md; PLAN-history.md gained 61 lines, under 10 headings
  gained heading: ### Where we stand
  gained heading: ### Pavol's answers, in the order they are needed
  gained heading: ### Phase 5. microGPT compiles
  gained heading: ### Phase 4. The switch-over
  gained heading: ### Phase 6. microGPT fast
  gained heading: ### Climb batch 28, listed for his review
  gained heading: ### Climb batch 29, listed for his review
  gained heading: ### Climb batch 29b, listed for his review
  gained heading: ## Climb batch 30's landing, 2026-11-10
  gained heading: ### Climb batch 30, listed for his review
LOOK PLAN.md:84, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:204, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
plan-moves: pass; 2 PLAN lines to look at

```

## queue-check.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/queue-check.py --root /home/user/fortress-landing-30 --base f592b7c0f`, exit 0.

```
queue-check: 496 items, 12 new (500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511); open 185, consequential 74, routine 111; pass

```

## lengths.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/lengths.py --root /home/user/fortress-landing-30 --base f592b7c0f`, exit 0.

```
lengths: 18 entries changed
- F-19: 2029 to 1992 characters (-37), over 600
- F-57: 1500 to 1466 characters (-34), over 600
- F-134: 660 to 645 characters (-15), over 600
- F-175: 1298 to 1298 characters (+0), over 600
- F-268: 598 to 598 characters (+0)
- F-283: 979 to 989 characters (+10), grew past 600
- F-302: 1318 to 1318 characters (+0), over 600
- F-315: 1210 to 1210 characters (+0), over 600
- F-337: 1176 to 1176 characters (+0), over 600
- F-341: 1656 to 2188 characters (+532), grew past 600
- F-347: 1581 to 1558 characters (-23), over 600
- F-348: 1283 to 1418 characters (+135), grew past 600
- F-349: 880 to 874 characters (-6), over 600
- F-350: 1196 to 1526 characters (+330), grew past 600
- F-351: 1783 to 1773 characters (-10), over 600
- P-174: 2287 to 2243 characters (-44), over 600
- P-175: 1704 to 1701 characters (-3), over 600
- P-176: 1140 to 1097 characters (-43), over 600
lengths: 4 already over 600 grew: F-283 (+10), F-341 (+532), F-348 (+135), F-350 (+330)

```

## git diff --stat f592b7c0f

`git diff --stat f592b7c0f -- explorations/`, exit 0.

```
 explorations/coordinator/FACTS-history.md          |  90 +++++++
 explorations/coordinator/FACTS.md                  |  30 +--
 explorations/coordinator/PLAN-history.md           |  95 ++++++++
 explorations/coordinator/PLAN.md                   |  86 +++----
 explorations/coordinator/POSITIONS-history.md      |  18 ++
 explorations/coordinator/POSITIONS.md              |   6 +-
 .../coordinator/map/compile-path-walkthrough.md    |  10 +-
 explorations/coordinator/map/modules-and-phases.md |   2 +-
 explorations/coordinator/review-queue.md           | 265 +++++++++++++--------
 explorations/fortress-gap-ledger.md                |   1 +
 10 files changed, 429 insertions(+), 174 deletions(-)

```

