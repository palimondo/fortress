<!-- The record-landing workflow's mechanical checks, round 2, in the worktree /home/user/fortress-landing-32 at c0c35b4f9: one line per check, then each command with its output, written by checks.sh. -->

# The mechanical checks, round 2

- reset: the six record files at c0c35b4f9
- cut-only.txt: 2 of the 2 entries that cut-only.txt names have a line in the apply file
- words-subset.py, the cut-only lines (P-46 P-79): pass
- words-subset.py, every POSITIONS line of record.apply: exit 1 (information)
- record.py apply record.apply: pass
- ledger-clarity/apply.py: no rows.rewrite, no row changed
- ledger.py add: no rows.add, no row added
- record.py check --base c0c35b4f9: pass
- ledger.py check: pass
- ledger.py landing-check db352c177: pass
- check-index.sh: pass
- plan-moves.py: FAIL (exit 1)
  - plan-moves.py lists 3 PLAN lines to look at (its LOOK lines below)
- queue-check.py: pass
- lengths.py: pass
  - lengths.py: already over 600, and grew: F-58 (+37), F-221 (+1), F-240 (+130), F-280 (+145), F-334 (+2), F-341 (+10), F-362 (+102), F-364 (+125), F-365 (+158), F-367 (+89), F-368 (+99), F-369 (+110), P-173 (+27)
- git diff --stat c0c35b4f9: pass

A check fails: see its section below.

## words-subset.py, the cut-only lines (P-46 P-79)

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-32/tmp/cut-only.p7YjlM --root /home/user/fortress-landing-32`, exit 0.

```
words-subset: 2 entries, 0 add words

```

## words-subset.py, every POSITIONS line of record.apply

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-32/tmp/positions.ooUiI1 --root /home/user/fortress-landing-32`, exit 1.

```
P-78: adds from, written, its, where, type, reduction's, expected, else, f-364
P-166: adds 649`
P-173: adds where, row x2, holds, 1016, 1017, both, paths, do
words-subset: 5 entries, 3 add words

```

## record.py apply record.apply

`python3 /home/user/fortress-landing-32/explorations/coordinator/tools/record.py apply /home/user/fortress-landing-32/explorations/compile-ladder/climb-batch-32/record-landing/record.apply --by climb batch 32 landing workflow (Opus)`, exit 0.

```
F-35: rewritten
F-44: rewritten
F-48: rewritten
F-53: rewritten
F-58: rewritten
F-59: rewritten
F-63: rewritten
F-78: rewritten
F-79: rewritten
F-85: rewritten
F-121: rewritten
F-173: rewritten
F-175: rewritten
F-221: rewritten
F-235: rewritten
F-240: rewritten
F-254: rewritten
F-272: rewritten
F-276: rewritten
F-279: rewritten
F-280: rewritten
F-285: rewritten
F-286: rewritten
F-302: rewritten
F-303: rewritten
F-305: rewritten
F-306: rewritten
F-307: rewritten
F-312: rewritten
F-324: rewritten
F-327: rewritten
F-330: rewritten
F-332: rewritten
F-334: rewritten
F-341: rewritten
F-356: rewritten
F-362: rewritten
F-363: rewritten
F-364: rewritten
F-365: rewritten
F-366: rewritten
F-367: rewritten
F-368: rewritten
F-369: rewritten
P-46: rewritten
P-78: rewritten
P-79: rewritten
P-166: rewritten
P-173: rewritten

```

## record.py check --base c0c35b4f9

`python3 /home/user/fortress-landing-32/explorations/coordinator/tools/record.py check --base c0c35b4f9`, exit 0.

```
reported, not failing:
  FACTS.md: size: 259 entries over 600 characters: F-7 818, F-11 848, F-12 1308, F-18 1413, F-19 2028, F-20 948, F-21 1049, F-22 1482, F-24 950, F-25 948, F-26 1878, F-27 1769, F-29 1557, F-269 1197, F-291 1203, F-301 1509, F-302 1318, F-348 1444, F-350 1544, F-351 1768, F-355 1498, F-356 1396, F-357 774, F-358 1361, F-32 1897, F-34 2282, F-35 1166, F-37 755, F-39 1365, F-40 1856, F-41 944, F-42 633, F-43 705, F-44 1832, F-45 1591, F-46 1445, F-47 1548, F-48 965, F-49 646, F-50 1035, F-51 623, F-52 844, F-53 1376, F-54 740, F-55 956, F-57 1466, F-58 1961, F-59 1444, F-60 697, F-61 998, F-63 1265, F-64 848, F-65 786, F-66 794, F-67 998, F-69 745, F-70 902, F-71 860, F-72 794, F-73 1452, F-74 931, F-75 1206, F-76 1597, F-77 619, F-78 1262, F-79 1392, F-80 1202, F-81 1100, F-82 1010, F-83 1375, F-84 1456, F-85 1353, F-86 783, F-87 1269, F-90 1755, F-91 604, F-94 682, F-221 860, F-225 2383, F-226 1228, F-227 1536, F-231 1126, F-232 1409, F-235 1157, F-236 786, F-237 1779, F-240 2160, F-242 1056, F-243 1159, F-244 1210, F-245 1330, F-250 1293, F-251 1467, F-254 1099, F-255 2519, F-256 2408, F-265 1269, F-266 796, F-276 1430, F-277 1353, F-278 1561, F-281 1535, F-282 2601, F-285 1683, F-286 1146, F-287 1204, F-288 1178, F-289 601, F-290 1313, F-292 892, F-294 1011, F-296 1136, F-297 1680, F-298 2090, F-299 3108, F-303 1760, F-306 1274, F-307 1022, F-308 2130, F-309 981, F-310 940, F-311 794, F-312 1300, F-313 1105, F-314 1035, F-315 1210, F-320 1452, F-321 1593, F-322 855, F-323 1141, F-325 1397, F-327 1230, F-328 1064, F-330 1083, F-332 1303, F-333 1445, F-334 940, F-335 1083, F-336 665, F-337 1176, F-338 824, F-342 1816, F-344 1091, F-352 2002, F-353 1577, F-364 2033, F-365 2423, F-99 781, F-100 1059, F-102 783, F-103 749, F-104 913, F-106 1047, F-107 891, F-108 878, F-111 1364, F-112 798, F-203 1543, F-234 1221, F-283 989, F-295 706, F-354 989, F-118 1363, F-119 830, F-121 1870, F-122 915, F-123 1085, F-124 1121, F-125 663, F-128 873, F-129 1506, F-130 810, F-131 1405, F-132 1227, F-133 1238, F-134 645, F-135 693, F-136 1642, F-137 1449, F-140 1727, F-141 2282, F-142 958, F-143 1851, F-144 1412, F-145 1413, F-146 1023, F-147 1442, F-228 2330, F-230 768, F-239 959, F-248 745, F-249 1131, F-252 4166, F-253 2088, F-257 1907, F-258 2830, F-259 1236, F-262 1344, F-263 1720, F-270 1676, F-274 1198, F-275 1811, F-280 868, F-305 1479, F-316 958, F-318 2076, F-324 1080, F-326 1087, F-329 828, F-331 1328, F-339 1090, F-340 1350, F-341 2272, F-343 1281, F-347 1558, F-349 965, F-362 1106, F-363 1798, F-366 2633, F-367 1957, F-369 1778, F-151 1614, F-154 967, F-155 1117, F-157 1117, F-158 632, F-159 1735, F-229 1485, F-264 2093, F-279 766, F-317 763, F-360 1401, F-361 1351, F-368 1317, F-163 837, F-165 892, F-166 778, F-167 1150, F-168 973, F-169 1191, F-170 689, F-171 1186, F-172 1241, F-173 1718, F-174 2149, F-175 1298, F-176 1168, F-223 1894, F-271 734, F-272 1148, F-273 1324, F-300 865, F-319 1133, F-345 1580, F-359 1429, F-180 2337, F-181 1636, F-182 910, F-183 879
  POSITIONS.md: size: 90 entries over 600 characters: P-7 844, P-9 1279, P-10 630, P-11 709, P-12 720, P-19 758, P-25 1303, P-26 1344, P-27 829, P-28 828, P-29 670, P-30 747, P-32 805, P-33 1247, P-175 1699, P-37 1383, P-38 702, P-39 1402, P-40 1962, P-41 823, P-43 662, P-44 1386, P-45 1922, P-46 2357, P-47 933, P-48 1563, P-49 982, P-50 772, P-51 1019, P-54 831, P-55 1001, P-56 1114, P-57 1053, P-58 1674, P-59 774, P-60 1927, P-62 738, P-146 1116, P-147 1274, P-148 888, P-149 1049, P-151 1587, P-152 1412, P-154 1179, P-155 1147, P-156 1693, P-157 1214, P-158 752, P-160 1380, P-162 2040, P-163 1670, P-164 2190, P-167 1661, P-169 2561, P-170 1071, P-68 649, P-69 1126, P-71 792, P-72 665, P-73 1051, P-74 883, P-75 660, P-76 864, P-78 1272, P-79 857, P-80 987, P-153 1071, P-159 1278, P-161 1771, P-165 1649, P-166 1155, P-168 1701, P-171 1839, P-172 2060, P-173 3561, P-174 2243, P-176 1097, P-178 1544, P-84 1233, P-85 884, P-87 968, P-88 1036, P-91 911, P-95 683, P-96 987, P-97 1146, P-102 704, P-103 648, P-125 602, P-177 689
record.py check: FACTS.md 300 entries, POSITIONS.md 104 entries; 0 failures; reported: size 2

```

## ledger.py check

`python3 /home/user/fortress-landing-32/explorations/coordinator/tools/ledger.py check --summary`, exit 0.

```
ledger.py check: fortress-gap-ledger.md, 1030 rows, 0 fail the template

```

## ledger.py landing-check db352c177

`python3 /home/user/fortress-landing-32/explorations/coordinator/tools/ledger.py landing-check db352c177`, exit 0.

```
ledger.py landing-check: db352c177..HEAD: no finding

```

## check-index.sh

`bash explorations/coordinator/check-index.sh`, exit 0.

```
INDEX.md check — c0c35b4f9e
notes in scope: 563   index entries: 651

== notes missing from INDEX.md (0) ==

== index lines naming a file that does not exist (0) ==

== index lines outside the note set, informational (83) ==
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

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/plan-moves.py --root /home/user/fortress-landing-32 --base c0c35b4f9`, exit 1.

```
plan-moves: 50 lines taken out of PLAN.md; PLAN-history.md gained 63 lines, under 10 headings
  gained heading: ### Where we stand
  gained heading: ### Phase 5. microGPT compiles
  gained heading: ### Phase 4. The switch-over
  gained heading: ### Climb batch 22, listed for his review
  gained heading: ### Phase 3's candidates at its end
  gained heading: ### Climb batch 14, listed for his review
  gained heading: ### Climb batch 8, listed for his review
  gained heading: ### Climb batch 29, listed for his review
  gained heading: ## Climb batch 32's landing, 2026-11-16
  gained heading: ### Climb batch 32, listed for his review
FAIL not in PLAN-history.md word for word: PLAN.md:329 at c0c35b4f9: - Row 559, a regression of climb batch 8's rung I: the compiled run time loads no instance at an intersection type, so two shapes that ran die at load; default 
FAIL not in PLAN-history.md word for word: PLAN.md:331 at c0c35b4f9: - Climb batch 8's rung Q's `unsigned` stop: `Integral`'s api `unsigned` removed, and `ZZ64`'s api stating its body's type; default as landed, kept by the judge.
FAIL not in PLAN-history.md word for word: PLAN.md:584 at c0c35b4f9: - E.worker.2, E.skeptic.2 and gather.1 of climb batch 22, one point: rows 188 and 283 do not reproduce at the base `64386618b` (old code: 'truncate 7.0 7 ZZ64',
FAIL not in PLAN-history.md word for word: PLAN.md:586 at c0c35b4f9: - R.skeptic.1 of climb batch 22's rung R: Appendix I's rationale in "The contexts that give a call an expected type" says that "the revival decided that the lib
LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 371, 372, 515. The line: - **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the swit
LOOK PLAN.md:91, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:220, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
plan-moves: 4 failures; 3 PLAN lines to look at

```

## queue-check.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/queue-check.py --root /home/user/fortress-landing-32 --base c0c35b4f9`, exit 0.

```
queue-check: 535 items, 23 new (528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550); open 217, consequential 86, routine 131; pass

```

## lengths.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/lengths.py --root /home/user/fortress-landing-32 --base c0c35b4f9`, exit 0.

```
lengths: 49 entries changed
- F-35: 1166 to 1166 characters (+0), over 600
- F-44: 1832 to 1832 characters (+0), over 600
- F-48: 965 to 965 characters (+0), over 600
- F-53: 1489 to 1376 characters (-113), over 600
- F-58: 1924 to 1961 characters (+37), grew past 600
- F-59: 1479 to 1444 characters (-35), over 600
- F-63: 1265 to 1265 characters (+0), over 600
- F-78: 1262 to 1262 characters (+0), over 600
- F-79: 1392 to 1392 characters (+0), over 600
- F-85: 1353 to 1353 characters (+0), over 600
- F-121: 1870 to 1870 characters (+0), over 600
- F-173: 1718 to 1718 characters (+0), over 600
- F-175: 1298 to 1298 characters (+0), over 600
- F-221: 859 to 860 characters (+1), grew past 600
- F-235: 1157 to 1157 characters (+0), over 600
- F-240: 2030 to 2160 characters (+130), grew past 600
- F-254: 1099 to 1099 characters (+0), over 600
- F-272: 1148 to 1148 characters (+0), over 600
- F-276: 1430 to 1430 characters (+0), over 600
- F-279: 766 to 766 characters (+0), over 600
- F-280: 723 to 868 characters (+145), grew past 600
- F-285: 1696 to 1683 characters (-13), over 600
- F-286: 1146 to 1146 characters (+0), over 600
- F-302: 1318 to 1318 characters (+0), over 600
- F-303: 1760 to 1760 characters (+0), over 600
- F-305: 1479 to 1479 characters (+0), over 600
- F-306: 1274 to 1274 characters (+0), over 600
- F-307: 1022 to 1022 characters (+0), over 600
- F-312: 1300 to 1300 characters (+0), over 600
- F-324: 1080 to 1080 characters (+0), over 600
- F-327: 1230 to 1230 characters (+0), over 600
- F-330: 1083 to 1083 characters (+0), over 600
- F-332: 1303 to 1303 characters (+0), over 600
- F-334: 938 to 940 characters (+2), grew past 600
- F-341: 2262 to 2272 characters (+10), grew past 600
- F-356: 1396 to 1396 characters (+0), over 600
- F-362: 1004 to 1106 characters (+102), grew past 600
- F-363: 1831 to 1798 characters (-33), over 600
- F-364: 1908 to 2033 characters (+125), grew past 600
- F-365: 2265 to 2423 characters (+158), grew past 600
- F-366: 2890 to 2633 characters (-257), over 600
- F-367: 1868 to 1957 characters (+89), grew past 600
- F-368: 1218 to 1317 characters (+99), grew past 600
- F-369: 1668 to 1778 characters (+110), grew past 600
- P-46: 2454 to 2357 characters (-97), over 600
- P-78: 1395 to 1272 characters (-123), over 600
- P-79: 1032 to 857 characters (-175), over 600
- P-166: 1155 to 1155 characters (+0), over 600
- P-173: 3534 to 3561 characters (+27), grew past 600
lengths: 13 already over 600 grew: F-58 (+37), F-221 (+1), F-240 (+130), F-280 (+145), F-334 (+2), F-341 (+10), F-362 (+102), F-364 (+125), F-365 (+158), F-367 (+89), F-368 (+99), F-369 (+110), P-173 (+27)

```

## git diff --stat c0c35b4f9

`git diff --stat c0c35b4f9 -- explorations/`, exit 0.

```
 explorations/coordinator/FACTS-history.md     | 264 ++++++++++++++++++++++++
 explorations/coordinator/FACTS.md             |  88 ++++----
 explorations/coordinator/PLAN-history.md      |  84 ++++++++
 explorations/coordinator/PLAN.md              |  95 ++++-----
 explorations/coordinator/POSITIONS-history.md |  30 +++
 explorations/coordinator/POSITIONS.md         |  10 +-
 explorations/coordinator/review-queue.md      | 286 ++++++++++++++++++++------
 7 files changed, 697 insertions(+), 160 deletions(-)

```

