<!-- The record-landing workflow's evidence of the record's checks in the worktree at 43cd61b62, before any change: the record tool's check against the batch's base, the ledger's landing check, the notes without an INDEX line, and the citations of PLAN by line number, written by evidence.py. -->

# The checks at 43cd61b62, before any change

## record.py check --base b0f6cd6b7

Exit 0.

```
reported, not failing:
  FACTS.md: size: 196 entries over 600 characters: F-7 818, F-11 849, F-12 1308, F-18 1266, F-20 948, F-21 1049, F-22 1482, F-24 1058, F-25 948, F-26 1878, F-27 1769, F-29 1568, F-269 1197, F-291 1203, F-301 1509, F-302 1318, F-32 2069, F-34 1202, F-35 1166, F-37 755, F-39 1365, F-40 1856, F-41 944, F-42 633, F-43 705, F-44 1779, F-45 1591, F-46 1445, F-47 1548, F-48 965, F-49 646, F-50 1035, F-51 623, F-52 844, F-53 1701, F-54 608, F-55 954, F-57 1447, F-58 1466, F-59 1389, F-60 697, F-61 998, F-63 1264, F-64 848, F-65 786, F-66 794, F-67 998, F-69 745, F-70 902, F-71 860, F-72 794, F-73 1252, F-74 1513, F-75 1206, F-76 1576, F-77 619, F-78 1262, F-79 1435, F-80 1202, F-81 1100, F-82 1010, F-83 1375, F-84 1631, F-85 1353, F-86 783, F-87 1269, F-90 1755, F-91 604, F-94 682, F-221 827, F-225 2383, F-226 1228, F-227 1536, F-231 1126, F-232 1409, F-235 1157, F-236 786, F-237 1779, F-240 1833, F-242 1056, F-243 1159, F-244 1210, F-245 1330, F-250 1293, F-251 1467, F-254 1099, F-255 2450, F-256 2408, F-265 1269, F-266 796, F-276 1430, F-277 1320, F-278 1566, F-281 1501, F-282 2601, F-285 1622, F-286 1146, F-287 1204, F-288 1094, F-289 601, F-290 854, F-292 892, F-294 1011, F-296 1136, F-297 1680, F-298 2156, F-299 2789, F-303 1403, F-306 1152, F-307 960, F-308 2330, F-99 781, F-100 1059, F-102 783, F-103 749, F-104 913, F-106 1047, F-107 891, F-108 878, F-111 1364, F-112 756, F-203 1543, F-234 1221, F-283 721, F-295 706, F-118 1172, F-119 830, F-121 1870, F-122 881, F-123 913, F-124 1121, F-128 775, F-129 1319, F-130 810, F-131 1330, F-132 1187, F-133 1238, F-135 693, F-136 1642, F-137 1613, F-141 2282, F-142 958, F-143 1851, F-144 1412, F-145 1225, F-146 1023, F-147 661, F-228 2308, F-230 768, F-238 1822, F-239 959, F-248 745, F-249 1035, F-252 2086, F-253 2085, F-257 2159, F-258 2830, F-259 1236, F-263 1933, F-270 1676, F-274 1198, F-275 1811, F-280 723, F-304 873, F-305 1407, F-151 1649, F-154 967, F-155 903, F-157 1117, F-158 632, F-159 1731, F-229 1609, F-264 2093, F-279 766, F-163 837, F-165 892, F-166 778, F-167 1150, F-168 973, F-169 1126, F-170 689, F-171 1186, F-172 1035, F-173 1718, F-174 2149, F-175 1298, F-176 1168, F-223 1894, F-271 734, F-272 1148, F-273 1324, F-300 865, F-180 2349, F-181 1592, F-182 910, F-183 879
  POSITIONS.md: size: 69 entries over 600 characters: P-7 849, P-9 1279, P-10 630, P-11 709, P-12 720, P-19 758, P-25 1303, P-26 1273, P-27 829, P-28 828, P-29 670, P-30 747, P-32 805, P-33 1247, P-37 1089, P-39 1402, P-40 1716, P-41 823, P-43 662, P-44 1202, P-45 1922, P-46 1174, P-47 933, P-48 1563, P-49 679, P-50 772, P-51 1019, P-54 831, P-55 1001, P-56 1114, P-57 1053, P-58 1164, P-59 774, P-60 1927, P-62 738, P-146 1116, P-147 1274, P-148 888, P-149 1049, P-151 1584, P-152 1412, P-154 1306, P-155 1147, P-156 1925, P-157 1214, P-158 752, P-68 649, P-69 1126, P-71 792, P-72 665, P-73 1077, P-74 883, P-75 660, P-76 1182, P-78 1395, P-79 1032, P-80 987, P-153 1071, P-84 927, P-85 851, P-87 968, P-88 1036, P-91 911, P-95 683, P-96 987, P-97 1146, P-102 704, P-103 648, P-125 602
record.py check: FACTS.md 241 entries, POSITIONS.md 84 entries; 0 failures; reported: size 2
```

## ledger.py landing-check b0f6cd6b7

Exit 0.

```
ledger.py landing-check: b0f6cd6b7..HEAD: no finding
```

## check-index.sh

Exit 1. The notes without an INDEX line:

```
== notes missing from INDEX.md (7) ==
explorations/coordinator/postmortem-2026-10-28/brief-additions-2.md
explorations/coordinator/postmortem-2026-10-28/brief-additions.md
explorations/coordinator/postmortem-2026-10-28/revival-page-drift.md
explorations/coordinator/postmortem-2026-10-28/run.md
explorations/coordinator/postmortem-2026-10-28/ryu-claims-check.md
explorations/coordinator/postmortem-2026-10-28/ryu-reply-draft.md
explorations/coordinator/postmortem-2026-10-28/ryu-sources-draft.md
```

## The citations of PLAN by line number

1 in the record's own files (PLAN.md, review-queue.md, FACTS.md, POSITIONS.md, INDEX.md, BOOT.md, HELD.md); 1104 in the whole tree, the rest in reports, reviews and batch records, which cite PLAN as it stood when they were written.

- explorations/coordinator/BOOT.md:5: PLAN.md:648 now reads "### Climb batch 24, listed for his review"
