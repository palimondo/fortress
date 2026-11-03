<!-- The record-landing workflow's mechanical checks, round 1, in the worktree /home/user/fortress-landing-25 at c3a16b0bc: one line per check, then each command with its output, written by checks.sh. -->

# The mechanical checks, round 1

- reset: the six record files at c3a16b0bc
- words-subset.py: no cut-only.txt, nothing to check
- words-subset.py, every POSITIONS line of record.apply: exit 1 (information)
- record.py apply record.apply: pass
- ledger-clarity/apply.py: no rows.rewrite, no row changed
- record.py check --base c3a16b0bc: pass
- ledger.py check: pass
- ledger.py landing-check 97a416b18: pass
- check-index.sh: pass
- plan-moves.py: pass
  - plan-moves.py lists 1 PLAN lines to look at (its LOOK lines below)
- queue-check.py: pass
- lengths.py: pass
  - lengths.py: already over 600, and grew: F-240 (+136), F-268 (+5), F-312 (+9), F-315 (+366)
- git diff --stat c3a16b0bc: pass

Every check passes.

## words-subset.py, every POSITIONS line of record.apply

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-25/tmp/positions.iFBr7L --root /home/user/fortress-landing-25`, exit 1.

```
P-38: adds the x3, prelude's, own, text, is x2, its, with, it, a, helper, of, `nativehelpers, `, that, one x2, library x2, binds, fixed, for, and, value, moves, f-313
words-subset: 1 entries, 1 add words

```

## record.py apply record.apply

`python3 /home/user/fortress-landing-25/explorations/coordinator/tools/record.py apply /home/user/fortress-landing-25/explorations/compile-ladder/climb-batch-25/record-landing/record.apply --by climb batch 25 landing workflow (Opus)`, exit 0.

```
F-24: rewritten
F-32: rewritten
F-34: rewritten
F-118: rewritten
F-125: rewritten
F-240: rewritten
F-268: rewritten
F-303: rewritten
F-308: rewritten
F-310: rewritten
F-311: rewritten
F-312: rewritten
F-314: rewritten
F-315: rewritten
P-38: rewritten

```

## record.py check --base c3a16b0bc

`python3 /home/user/fortress-landing-25/explorations/coordinator/tools/record.py check --base c3a16b0bc`, exit 0.

```
reported, not failing:
  FACTS.md: size: 205 entries over 600 characters: F-7 818, F-11 849, F-12 1308, F-18 1266, F-20 948, F-21 1049, F-22 1482, F-24 950, F-25 948, F-26 1878, F-27 1769, F-29 1568, F-269 1197, F-291 1203, F-301 1509, F-302 1318, F-32 1953, F-34 1468, F-35 1166, F-37 755, F-39 1365, F-40 1856, F-41 944, F-42 633, F-43 705, F-44 1779, F-45 1591, F-46 1445, F-47 1548, F-48 965, F-49 646, F-50 1035, F-51 623, F-52 844, F-53 1701, F-54 608, F-55 954, F-57 1447, F-58 1466, F-59 1389, F-60 697, F-61 998, F-63 1264, F-64 848, F-65 786, F-66 794, F-67 998, F-69 745, F-70 902, F-71 860, F-72 794, F-73 1252, F-74 1513, F-75 1206, F-76 1576, F-77 619, F-78 1262, F-79 1435, F-80 1202, F-81 1100, F-82 1010, F-83 1375, F-84 1631, F-85 1353, F-86 783, F-87 1269, F-90 1755, F-91 604, F-94 682, F-221 827, F-225 2383, F-226 1228, F-227 1536, F-231 1126, F-232 1409, F-235 1157, F-236 786, F-237 1779, F-240 1969, F-242 1056, F-243 1159, F-244 1210, F-245 1330, F-250 1293, F-251 1467, F-254 1099, F-255 2450, F-256 2408, F-265 1269, F-266 796, F-268 616, F-276 1430, F-277 1320, F-278 1566, F-281 1501, F-282 2601, F-285 1622, F-286 1146, F-287 1204, F-288 1094, F-289 601, F-290 854, F-292 892, F-294 1011, F-296 1136, F-297 1680, F-298 2090, F-299 2339, F-303 1760, F-306 1274, F-307 960, F-308 1950, F-309 981, F-310 940, F-311 912, F-312 1307, F-313 1105, F-314 1010, F-315 1232, F-99 781, F-100 1059, F-102 783, F-103 749, F-104 913, F-106 1047, F-107 891, F-108 878, F-111 1364, F-112 756, F-203 1543, F-234 1221, F-283 721, F-295 706, F-118 1215, F-119 830, F-121 1870, F-122 881, F-123 913, F-124 1121, F-125 662, F-128 775, F-129 1319, F-130 810, F-131 1330, F-132 1187, F-133 1238, F-135 693, F-136 1642, F-137 1613, F-141 2282, F-142 958, F-143 1851, F-144 1412, F-145 1225, F-146 1023, F-147 661, F-228 2308, F-230 768, F-238 1822, F-239 959, F-248 745, F-249 1035, F-252 2086, F-253 2085, F-257 2159, F-258 2830, F-259 1236, F-263 1933, F-270 1676, F-274 1198, F-275 1811, F-280 723, F-304 873, F-305 1479, F-151 1649, F-154 967, F-155 903, F-157 1117, F-158 632, F-159 1731, F-229 1609, F-264 2093, F-279 766, F-163 837, F-165 892, F-166 778, F-167 1150, F-168 973, F-169 1126, F-170 689, F-171 1186, F-172 1035, F-173 1718, F-174 2149, F-175 1298, F-176 1168, F-223 1894, F-271 734, F-272 1148, F-273 1324, F-300 865, F-180 2349, F-181 1592, F-182 910, F-183 879
  POSITIONS.md: size: 70 entries over 600 characters: P-7 844, P-9 1279, P-10 630, P-11 709, P-12 720, P-19 758, P-25 1303, P-26 1344, P-27 829, P-28 828, P-29 670, P-30 747, P-32 805, P-33 1247, P-37 1124, P-38 702, P-39 1402, P-40 1716, P-41 823, P-43 662, P-44 1202, P-45 1922, P-46 1174, P-47 933, P-48 1563, P-49 679, P-50 772, P-51 1019, P-54 831, P-55 1001, P-56 1114, P-57 1053, P-58 1164, P-59 774, P-60 1927, P-62 738, P-146 1116, P-147 1274, P-148 888, P-149 1049, P-151 1587, P-152 1412, P-154 1306, P-155 1147, P-156 1693, P-157 1214, P-158 752, P-68 649, P-69 1126, P-71 792, P-72 665, P-73 1051, P-74 883, P-75 660, P-76 1182, P-78 1395, P-79 1032, P-80 987, P-153 1071, P-84 927, P-85 851, P-87 968, P-88 1036, P-91 911, P-95 683, P-96 987, P-97 1146, P-102 704, P-103 648, P-125 602
record.py check: FACTS.md 248 entries, POSITIONS.md 84 entries; 0 failures; reported: size 2

```

## ledger.py check

`python3 /home/user/fortress-landing-25/explorations/coordinator/tools/ledger.py check --summary`, exit 0.

```
ledger.py check: fortress-gap-ledger.md, 891 rows, 0 fail the template

```

## ledger.py landing-check 97a416b18

`python3 /home/user/fortress-landing-25/explorations/coordinator/tools/ledger.py landing-check 97a416b18`, exit 0.

```
ledger.py landing-check: 97a416b18..HEAD: no finding

```

## check-index.sh

`bash explorations/coordinator/check-index.sh`, exit 0.

```
INDEX.md check — c3a16b0bc
notes in scope: 475   index entries: 549

== notes missing from INDEX.md (0) ==

== index lines naming a file that does not exist (0) ==

== index lines outside the note set, informational (69) ==
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

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/plan-moves.py --root /home/user/fortress-landing-25 --base c3a16b0bc`, exit 0.

```
plan-moves: 30 lines taken out of PLAN.md; PLAN-history.md gained 38 lines, under 7 headings
  gained heading: ### Where we stand
  gained heading: ### Work that can start now, with no decision
  gained heading: ### Phase 5. microGPT compiles
  gained heading: ### Phase 4. The switch-over
  gained heading: ### Climb batch 24, listed for his review
  gained heading: ## Climb batch 25's landing, 2026-11-03
  gained heading: ### Climb batch 25, listed for his review
LOOK PLAN.md:192, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280c "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: a resume gives each unfinished agent the retry's head, which names its earlier launch's transcript 
plan-moves: pass; 1 PLAN lines to look at

```

## queue-check.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/queue-check.py --root /home/user/fortress-landing-25 --base c3a16b0bc`, exit 0.

```
queue-check: 339 items, 11 new (344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354); open 312, consequential 107, routine 205; pass

```

## lengths.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/lengths.py --root /home/user/fortress-landing-25 --base c3a16b0bc`, exit 0.

```
lengths: 15 entries changed
- F-24: 1168 to 950 characters (-218), over 600
- F-32: 2006 to 1953 characters (-53), over 600
- F-34: 1478 to 1468 characters (-10), over 600
- F-118: 1221 to 1215 characters (-6), over 600
- F-125: 668 to 662 characters (-6), over 600
- F-240: 1833 to 1969 characters (+136), grew past 600
- F-268: 611 to 616 characters (+5), grew past 600
- F-303: 1775 to 1760 characters (-15), over 600
- F-308: 1950 to 1950 characters (+0), over 600
- F-310: 980 to 940 characters (-40), over 600
- F-311: 920 to 912 characters (-8), over 600
- F-312: 1298 to 1307 characters (+9), grew past 600
- F-314: 1150 to 1010 characters (-140), over 600
- F-315: 866 to 1232 characters (+366), grew past 600
- P-38: 562 to 702 characters (+140), over 600
lengths: 4 already over 600 grew: F-240 (+136), F-268 (+5), F-312 (+9), F-315 (+366)

```

## git diff --stat c3a16b0bc

`git diff --stat c3a16b0bc -- explorations/`, exit 0.

```
 explorations/coordinator/FACTS-history.md     |  84 ++++++++++++++++
 explorations/coordinator/FACTS.md             |  28 +++---
 explorations/coordinator/INDEX.md             |   1 +
 explorations/coordinator/PLAN-history.md      |  54 ++++++++++
 explorations/coordinator/PLAN.md              |  63 ++++++------
 explorations/coordinator/POSITIONS-history.md |   6 ++
 explorations/coordinator/POSITIONS.md         |   2 +-
 explorations/coordinator/review-queue.md      | 140 ++++++++++++++++++++------
 8 files changed, 300 insertions(+), 78 deletions(-)

```

