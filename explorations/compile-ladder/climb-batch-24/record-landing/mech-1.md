<!-- The record-landing workflow's mechanical checks, round 1, in the worktree /home/user/fortress-landing-24-replay at 43cd61b62: one line per check, then each command with its output, written by checks.sh. -->

# The mechanical checks, round 1

- reset: the six record files at 43cd61b62
- cut-only.txt: 3 of the 3 entries that cut-only.txt names have a line in the apply file
- words-subset.py, the cut-only lines (P-73 P-151 P-156): pass
- words-subset.py, every POSITIONS line of record.apply: pass
- record.py apply record.apply: pass
- ledger-clarity/apply.py: no rows.rewrite, no row changed
- record.py check --base 43cd61b62: pass
- ledger.py check: pass
- ledger.py landing-check b0f6cd6b7: pass
- check-index.sh: pass
- plan-moves.py: pass
- queue-check.py: pass
- lengths.py: pass
- git diff --stat 43cd61b62: pass

Every check passes.

## words-subset.py, the cut-only lines (P-73 P-151 P-156)

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-24-replay/tmp/cut-only.1Hgv6K --root /home/user/fortress-landing-24-replay`, exit 0.

```
words-subset: 3 entries, 0 add words

```

## words-subset.py, every POSITIONS line of record.apply

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/../record-clarity/words-subset.py /home/user/fortress-landing-24-replay/tmp/positions.DE63FU --root /home/user/fortress-landing-24-replay`, exit 0.

```
words-subset: 3 entries, 0 add words

```

## record.py apply record.apply

`python3 /home/user/fortress-landing-24-replay/explorations/coordinator/tools/record.py apply /home/user/fortress-landing-24-replay/explorations/compile-ladder/climb-batch-24/record-landing/record.apply --by climb batch 24 landing workflow`, exit 0.

```
F-24: rewritten
F-32: rewritten
F-34: rewritten
F-132: rewritten
F-181: rewritten
F-220: rewritten
F-240: rewritten
F-281: rewritten
F-298: rewritten
F-299: rewritten
F-303: rewritten
F-304: rewritten
F-305: rewritten
F-306: rewritten
F-307: rewritten
F-308: rewritten
P-73: rewritten
P-151: rewritten
P-156: rewritten
F-309: added

```

## record.py check --base 43cd61b62

`python3 /home/user/fortress-landing-24-replay/explorations/coordinator/tools/record.py check --base 43cd61b62`, exit 0.

```
reported, not failing:
  FACTS.md: size: 197 entries over 600 characters: F-7 818, F-11 849, F-12 1308, F-18 1266, F-20 948, F-21 1049, F-22 1482, F-24 959, F-25 948, F-26 1878, F-27 1769, F-29 1568, F-269 1197, F-291 1203, F-301 1509, F-302 1318, F-32 2155, F-34 1161, F-35 1166, F-37 755, F-39 1365, F-40 1856, F-41 944, F-42 633, F-43 705, F-44 1779, F-45 1591, F-46 1445, F-47 1548, F-48 965, F-49 646, F-50 1035, F-51 623, F-52 844, F-53 1701, F-54 608, F-55 954, F-57 1447, F-58 1466, F-59 1389, F-60 697, F-61 998, F-63 1264, F-64 848, F-65 786, F-66 794, F-67 998, F-69 745, F-70 902, F-71 860, F-72 794, F-73 1252, F-74 1513, F-75 1206, F-76 1576, F-77 619, F-78 1262, F-79 1435, F-80 1202, F-81 1100, F-82 1010, F-83 1375, F-84 1631, F-85 1353, F-86 783, F-87 1269, F-90 1755, F-91 604, F-94 682, F-221 827, F-225 2383, F-226 1228, F-227 1536, F-231 1126, F-232 1409, F-235 1157, F-236 786, F-237 1779, F-240 1833, F-242 1056, F-243 1159, F-244 1210, F-245 1330, F-250 1293, F-251 1467, F-254 1099, F-255 2450, F-256 2408, F-265 1269, F-266 796, F-276 1430, F-277 1320, F-278 1566, F-281 1435, F-282 2601, F-285 1622, F-286 1146, F-287 1204, F-288 1094, F-289 601, F-290 854, F-292 892, F-294 1011, F-296 1136, F-297 1680, F-298 2049, F-299 2105, F-303 952, F-306 1124, F-307 782, F-308 2002, F-309 981, F-99 781, F-100 1059, F-102 783, F-103 749, F-104 913, F-106 1047, F-107 891, F-108 878, F-111 1364, F-112 756, F-203 1543, F-234 1221, F-283 721, F-295 706, F-118 1172, F-119 830, F-121 1870, F-122 881, F-123 913, F-124 1121, F-128 775, F-129 1319, F-130 810, F-131 1330, F-132 1187, F-133 1238, F-135 693, F-136 1642, F-137 1613, F-141 2282, F-142 958, F-143 1851, F-144 1412, F-145 1225, F-146 1023, F-147 661, F-228 2308, F-230 768, F-238 1822, F-239 959, F-248 745, F-249 1035, F-252 2086, F-253 2085, F-257 2159, F-258 2830, F-259 1236, F-263 1933, F-270 1676, F-274 1198, F-275 1811, F-280 723, F-304 788, F-305 1249, F-151 1649, F-154 967, F-155 903, F-157 1117, F-158 632, F-159 1731, F-229 1609, F-264 2093, F-279 766, F-163 837, F-165 892, F-166 778, F-167 1150, F-168 973, F-169 1126, F-170 689, F-171 1186, F-172 1035, F-173 1718, F-174 2149, F-175 1298, F-176 1168, F-223 1894, F-271 734, F-272 1148, F-273 1324, F-300 865, F-180 2349, F-181 1576, F-182 910, F-183 879
  POSITIONS.md: size: 69 entries over 600 characters: P-7 849, P-9 1279, P-10 630, P-11 709, P-12 720, P-19 758, P-25 1303, P-26 1273, P-27 829, P-28 828, P-29 670, P-30 747, P-32 805, P-33 1247, P-37 1089, P-39 1402, P-40 1716, P-41 823, P-43 662, P-44 1202, P-45 1922, P-46 1174, P-47 933, P-48 1563, P-49 679, P-50 772, P-51 1019, P-54 831, P-55 1001, P-56 1114, P-57 1053, P-58 1164, P-59 774, P-60 1927, P-62 738, P-146 1116, P-147 1274, P-148 888, P-149 1049, P-151 1548, P-152 1412, P-154 1306, P-155 1147, P-156 1693, P-157 1214, P-158 752, P-68 649, P-69 1126, P-71 792, P-72 665, P-73 1051, P-74 883, P-75 660, P-76 1182, P-78 1395, P-79 1032, P-80 987, P-153 1071, P-84 927, P-85 851, P-87 968, P-88 1036, P-91 911, P-95 683, P-96 987, P-97 1146, P-102 704, P-103 648, P-125 602
record.py check: FACTS.md 242 entries, POSITIONS.md 84 entries; 0 failures; reported: size 2

```

## ledger.py check

`python3 /home/user/fortress-landing-24-replay/explorations/coordinator/tools/ledger.py check --summary`, exit 0.

```
ledger.py check: fortress-gap-ledger.md, 871 rows, 0 fail the template

```

## ledger.py landing-check b0f6cd6b7

`python3 /home/user/fortress-landing-24-replay/explorations/coordinator/tools/ledger.py landing-check b0f6cd6b7`, exit 0.

```
ledger.py landing-check: b0f6cd6b7..HEAD: no finding

```

## check-index.sh

`bash explorations/coordinator/check-index.sh`, exit 0.

```
INDEX.md check — 43cd61b62
notes in scope: 465   index entries: 535

== notes missing from INDEX.md (0) ==

== index lines naming a file that does not exist (0) ==

== index lines outside the note set, informational (65) ==
explorations/compile-ladder/climb-batch-15b/RECORD.md
explorations/compile-ladder/climb-batch-3/JUDGE-review.md
explorations/compile-ladder/climb-batch-3/RECORD.md
explorations/compile-ladder/climb-batch-3/REPAIR-review.md
explorations/compile-ladder/climb-batch-4/RECORD.md
explorations/compile-ladder/climb-batch-5/followup-calculi/NOTE.md
explorations/compile-ladder/plan-n/probe-q/PROBE-Q.md
explorations/compile-ladder/rung-integral-ops/shift-history.md
explorations/compile-ladder/rung-library-defects/REPORT.md
explorations/compile-ladder/rung-rr64-functions/round-history.md
explorations/compiler-probes/maybe-inference/inference.md
explorations/compiler-probes/vectors/vectors.md
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

== paths named in a line's prose that resolve nowhere (1) ==
library-scalar-extension-review-probes/run-all.sh

```

## plan-moves.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/plan-moves.py --root /home/user/fortress-landing-24-replay --base 43cd61b62`, exit 0.

```
plan-moves: 29 lines taken out of PLAN.md; PLAN-history.md gained 39 lines, under 9 headings
  gained heading: ### Where we stand
  gained heading: ### Pavol's answers, in the order they are needed
  gained heading: ### Work that can start now, with no decision
  gained heading: ### Climb batch 18, listed for his review
  gained heading: ### Phase 4. The switch-over
  gained heading: ### Phase 3's candidates at its end
  gained heading: ### Climb batch 23, listed for his review
  gained heading: ## Climb batch 24's landing, 2026-10-31
  gained heading: ### Climb batch 24, listed for his review
plan-moves: pass

```

## queue-check.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/queue-check.py --root /home/user/fortress-landing-24-replay --base 43cd61b62`, exit 0.

```
queue-check: 326 items, 16 new (326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341); open 302, consequential 100, routine 202; pass

```

## lengths.py

`python3 /home/user/fortress/explorations/coordinator/tools/record-landing/lengths.py --root /home/user/fortress-landing-24-replay --base 43cd61b62`, exit 0.

```
lengths: 20 entries changed
- F-24: 1058 to 959 characters (-99), over 600
- F-32: 2069 to 2155 characters (+86), over 600
- F-34: 1202 to 1161 characters (-41), over 600
- F-132: 1187 to 1187 characters (+0), over 600
- F-181: 1592 to 1576 characters (-16), over 600
- F-220: 528 to 493 characters (-35)
- F-240: 1833 to 1833 characters (+0), over 600
- F-281: 1501 to 1435 characters (-66), over 600
- F-298: 2156 to 2049 characters (-107), over 600
- F-299: 2789 to 2105 characters (-684), over 600
- F-303: 1403 to 952 characters (-451), over 600
- F-304: 873 to 788 characters (-85), over 600
- F-305: 1407 to 1249 characters (-158), over 600
- F-306: 1152 to 1124 characters (-28), over 600
- F-307: 960 to 782 characters (-178), over 600
- F-308: 2330 to 2002 characters (-328), over 600
- F-309: none to 981 characters (+981), over 600
- P-73: 1077 to 1051 characters (-26), over 600
- P-151: 1584 to 1548 characters (-36), over 600
- P-156: 1925 to 1693 characters (-232), over 600

```

## git diff --stat 43cd61b62

`git diff --stat 43cd61b62 -- explorations/`, exit 0.

```
 .../compile-ladder/climb-batch-24/RECORD.md        |   2 +-
 explorations/coordinator/FACTS-history.md          | 100 ++++++++++++
 explorations/coordinator/FACTS.md                  |  33 ++--
 explorations/coordinator/INDEX.md                  |   7 +
 explorations/coordinator/PLAN-history.md           |  60 +++++++
 explorations/coordinator/PLAN.md                   |  70 ++++----
 explorations/coordinator/POSITIONS-history.md      |  18 +++
 explorations/coordinator/POSITIONS.md              |   6 +-
 explorations/coordinator/map/modules-and-phases.md |   2 +-
 explorations/coordinator/review-queue.md           | 180 ++++++++++++++++-----
 10 files changed, 391 insertions(+), 87 deletions(-)

```

