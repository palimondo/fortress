<!-- Evidence for the curator's archaeology of the record's regrowth (2026-11-24): which commits grew FACTS.md between b67abe3d2 and 9de4c69bc8, by how much and of what kind; for the Opus writer. -->

# Growth of FACTS by source, 2026-10-13 to 2026-11-24

Window: `b67abe3d2` (2026-10-13 20:13 UTC) to `9de4c69bc8` (2026-11-24 07:35 UTC). All counts are characters (Python `len` of the text), not bytes. Lines of FACTS that start `- F-` are entries; an entry's length is its line's characters without the newline.

Sources:
- `series.csv` = `explorations/coordinator/process-engineering/record-growth/series.csv` (it ends at `5ba0b04cd`, 2026-11-23). I checked five of its `facts_chars` values (7c2c7cd4b 99241, a12ab5c60 290385, d3747846c 386937, 1caac80b3 420125, 96cd5ade2 420987) against my script: all equal.
- `landings.csv` in the same folder names the batch landings and the rung (code) commits.
- My scripts, in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/record-regrowth/`: `collect.py` (the commits that changed FACTS, their changed files, FACTS size before and after), `analyze.py` (kinds, series, entries, birth and growth), `part5.py` (the other files). Their outputs are `commits.json`, `commits-kinds.json`, `series-out.md`, `kinds-out.md`, `allcommits-out.md`, `top30-out.md`, `part3-out.txt`, `part4-out.md`, `part5-out.txt` in the same folder.
- `git log --first-parent b67abe3d2..9de4c69bc8 -- explorations/coordinator/FACTS.md` lists 265 commits. All 265 have one parent (no merge among them), so each commit's diff is its own. Every author is "Claude <noreply@anthropic.com>": the author field does not tell the kinds apart.
- Net characters of a commit = FACTS characters after it minus FACTS characters at its parent. FACTS had 90179 characters at the start and 427378 at the end: +337199, the sum of the 265 commits' net changes.

## 1. The series

One row at the start, one at each climb batch's landing commit (the gate's tables commit named in `landings.csv`) and one at the end of each record-landing run (its commit 1, the one that changes FACTS; commit 2 of each run changes PLAN, the review queue and INDEX, and not FACTS), and one at the end. Batches 14 to 24 had no record-landing run. The record-landing runs are those of `explorations/compile-ladder/climb-batch-N/record-landing/` for N = 25 to 35b (16 runs). Batch 36's landing commit `61b50cd34` (2026-11-24 06:51) is not in `landings.csv`; it is in the window and in section 2.

| UTC | commit | what | FACTS chars | entries | median entry chars | entries over 600 |
|---|---|---|---|---|---|---|
| 2026-10-13T20:13 | b67abe3d2 | start | 90179 | 157 | 576 | 38 |
| 2026-10-14 05:34 | 7c2c7cd4b | climb batch landing (gate tables) batch 14 | 99241 | 163 | 578 | 45 |
| 2026-10-14 15:55 | c40489978 | climb batch landing (gate tables) batch 15 | 99328 | 167 | 578 | 50 |
| 2026-10-16 18:32 | f98ad813f | climb batch landing (gate tables) batch 16 | 109633 | 176 | 578.5 | 59 |
| 2026-10-17 18:55 | 65c0cc463 | climb batch landing (gate tables) batch 17 | 124092 | 191 | 584 | 69 |
| 2026-10-18 04:41 | e51759f57 | climb batch landing (gate tables) batch 18 | 131063 | 194 | 591.5 | 76 |
| 2026-10-20 03:31 | ebd39a6bd | climb batch landing (gate tables) batch 19 | 136659 | 196 | 592 | 81 |
| 2026-10-20 09:16 | 510fac459 | climb batch landing (gate tables) batch 20 | 142056 | 201 | 595 | 87 |
| 2026-10-23 17:55 | c53063bbd | climb batch landing (gate tables) batch 21 | 227752 | 213 | 973 | 167 |
| 2026-10-23 23:44 | 32242b80d | climb batch landing (gate tables) batch 21b | 231125 | 217 | 994 | 170 |
| 2026-10-24 04:34 | 2bff2fe23 | climb batch landing (gate tables) batch 22 | 235958 | 219 | 998 | 172 |
| 2026-10-30 02:48 | b81d86b75 | climb batch landing (gate tables) batch 22c | 249402 | 230 | 1004 | 183 |
| 2026-10-30 06:55 | df71bc585 | climb batch landing (gate tables) batch 23 | 254832 | 232 | 1029 | 186 |
| 2026-10-31 16:10 | 25238e60c | climb batch landing (gate tables) batch 24 | 269852 | 241 | 1035 | 196 |
| 2026-11-03 03:49 | 11d2d8764 | climb batch landing (gate tables) batch 25 | 277494 | 248 | 1035 | 205 |
| 2026-11-03 05:42 | 9342ddbb2 | record-landing run end, batch 25 | 277506 | 248 | 1035 | 204 |
| 2026-11-05 22:42 | a12ab5c60 | climb batch landing (gate tables) batch 26 | 290385 | 253 | 1056 | 211 |
| 2026-11-06 00:14 | 410c84ed9 | record-landing run end, batch 26 | 290530 | 254 | 1052.5 | 212 |
| 2026-11-07 11:56 | 29e52a3dc | climb batch landing (gate tables) batch 27 | 300023 | 262 | 1061.5 | 220 |
| 2026-11-07 15:13 | d131d92c5 | record-landing run end, batch 27 | 301192 | 262 | 1057.5 | 220 |
| 2026-11-08 08:46 | f56d6516c | climb batch landing (gate tables) batch 28 | 310758 | 270 | 1061.5 | 228 |
| 2026-11-08 10:30 | bec01c578 | record-landing run end, batch 28 | 310487 | 270 | 1086.5 | 228 |
| 2026-11-09 08:49 | 7daf51fe8 | climb batch landing (gate tables) batch 29 | 319932 | 278 | 1095 | 237 |
| 2026-11-09 11:00 | 2db561918 | record-landing run end, batch 29 | 318752 | 278 | 1090.5 | 236 |
| 2026-11-10 00:38 | a2be3e9e1 | climb batch landing (gate tables) batch 29b | 322353 | 279 | 1100 | 237 |
| 2026-11-10 02:27 | 36e60805e | record-landing run end, batch 29b | 322839 | 279 | 1100 | 237 |
| 2026-11-10 12:42 | d89fc0fda | climb batch landing (gate tables) batch 30 | 328411 | 283 | 1105 | 242 |
| 2026-11-10 13:53 | f78da2650 | record-landing run end, batch 30 | 329368 | 283 | 1105 | 242 |
| 2026-11-16 05:35 | 567c36dad | climb batch landing (gate tables) batch 32 | 358385 | 300 | 1134.5 | 259 |
| 2026-11-16 06:44 | 9683fef67 | record-landing run end, batch 32 | 358942 | 300 | 1134.5 | 259 |
| 2026-11-17 04:26 | 7858d0e97 | climb batch landing (gate tables) batch 31 | 373848 | 308 | 1149 | 267 |
| 2026-11-17 07:11 | 255179ba3 | record-landing run end, batch 31 | 375647 | 308 | 1149 | 267 |
| 2026-11-17 10:18 | 00dd16a89 | climb batch landing (gate tables) batch 31b | 378308 | 310 | 1154 | 269 |
| 2026-11-17 11:49 | b95570a64 | record-landing run end, batch 31b | 378139 | 310 | 1150.5 | 269 |
| 2026-11-17 22:36 | d3747846c | climb batch landing (gate tables) batch 33 | 386937 | 317 | 1150 | 277 |
| 2026-11-18 00:16 | fdd4a2cdd | record-landing run end, batch 33 | 386965 | 317 | 1151 | 277 |
| 2026-11-18 06:41 | ba3c7c876 | climb batch landing (gate tables) batch 33b | 392765 | 321 | 1166 | 280 |
| 2026-11-18 08:15 | 8626629ea | record-landing run end, batch 33b | 392764 | 321 | 1159 | 280 |
| 2026-11-20 19:13 | 285efad80 | climb batch landing (gate tables) batch 34 | 399701 | 325 | 1159 | 284 |
| 2026-11-20 20:48 | 5a70c03de | record-landing run end, batch 34 | 399698 | 325 | 1166 | 284 |
| 2026-11-21 01:11 | 295c215c2 | climb batch landing (gate tables) batch 34b | 402977 | 326 | 1172 | 285 |
| 2026-11-21 02:37 | b5a476582 | record-landing run end, batch 34b | 402970 | 326 | 1172 | 285 |
| 2026-11-23 14:31 | 0a83a7049 | climb batch landing (gate tables) batch 35 | 410045 | 331 | 1178 | 291 |
| 2026-11-23 16:09 | 2af3ec103 | record-landing run end, batch 35 | 410994 | 331 | 1186 | 290 |
| 2026-11-23 20:59 | 1caac80b3 | climb batch landing (gate tables) batch 35b | 420125 | 336 | 1203 | 295 |
| 2026-11-23 21:56 | 96cd5ade2 | record-landing run end, batch 35b | 420987 | 336 | 1203 | 295 |
| 2026-11-24 07:35 | 9de4c69bc8 | end | 427378 | 339 | 1198 | 299 |

Notes on the table:
- From 10-20 09:16 (510fac459) to 10-23 17:55 (c53063bbd) FACTS goes from 142056 to 227752 characters and the median entry from 595 to 973. The commits between them include the five clarity-workflow commits of 10-22 (section 2).
- The rows "record-landing run end" are the commits whose subjects `commit-1.txt` of each run holds, matched by subject.

## 2. Every commit that changed FACTS in the window

### How I sorted the kinds

Rules, applied in this order; the first that fits wins (script `analyze.py`, function `kind`):
1. **record-landing run commit**: the commit's subject equals the first line of a `climb-batch-N/record-landing/commit-1.txt` (16 commits).
2. **clarity workflow**: the commit changes a file under `/evidence/facts` (the clarity workflow's chunk folders), or its subject has "clarity chunk" or "calibration's three entries" (5 commits, all on 2026-10-22).
3. **consolidation**: the subject has "FACTS consolidated" (1 commit: `bd33a2f8b`, "Climb batch 20's routing ... FACTS consolidated", net -1965). The October consolidation itself is `b67abe3d2`, the start of the window, so it is not counted. My first rule also matched `e2906af77` ("After PLAN's consolidation", FACTS net 0); I sorted it as a coordinator edit.
4. **batch landing (gate tables commit)**: the subject starts "Record the gate's tables" (27 commits).
5. **batch review-fold or repair commit**: the subject starts "Fold the review's corrections" or has "repair after the merged-diff review" (31 commits).
6. **batch rung commit (code, tests, draft entries)**: the commit is one of the `code_commits` of `landings.csv`, or it changes a file under `compile-ladder/rung-` and a file under `ProjectFortress/`, `Library/` or `Specification/` (128 commits). Each is a rung's own commit with code, tests and its FACTS entries. I did not read each commit's FACTS diff to say which of the entries are drafts.
7. **lone worker commit**: any other commit that changes code files. There are none in the window by my rule (0 commits).
8. **coordinator edit**: every other commit: no code files, not a record-landing run, clarity run or consolidation (57 commits). Their subjects often start "FACTS", "POSITIONS", "Record", "Climb batch N's routing" or name an entry. This kind holds also the commits whose subject names a probe or review filed into FACTS (`5064f7f80`, `70e335bf1`, `e21ab5389`, `0d2206c5f`) and one commit, `444f37018` ("The array sites by the library's own devices, with decision E's diff: rung ..."), that changes rung files but no code file.
9. **mining workflow**: I searched the 2529 first-parent commits of the window for "mining", "mined" and "mine " in subjects. Hits (`3ad4b8be1`, `052ff1ca9`, `33e3be18d`, `94798a33d`, `d56844991`) are boot notes, post-mortem notes and the clarity tool's commit; none changes FACTS. So 0 commits of the mining workflow are in the list.

Caveats: the gate-tables commit is sorted as a batch's landing, not as a "gather or commit stage"; the files of a rung commit are listed in `commits.json`. The subject of a record-landing run's commit is the only mark I used for the run; the commit's message body was not read.

### Totals per kind

"Positive" = sum of the net changes of the kind's commits that grew FACTS; "negative" = sum of those that shrank it. These are net per commit, not line-level additions and removals.

| kind | commits | sum of positive net changes | sum of negative net changes | net |
|---|---|---|---|---|
| batch rung commit (code, tests, draft entries) | 128 | 194788 | -314 | 194474 |
| clarity workflow | 5 | 82635 | 0 | 82635 |
| coordinator edit (no code; not a landing run, clarity run or consolidation) | 57 | 61905 | -12545 | 49360 |
| batch review-fold or repair commit | 31 | 7559 | -210 | 7349 |
| record-landing run commit | 16 | 6964 | -1631 | 5333 |
| batch landing (gate tables commit) | 27 | 35 | -22 | 13 |
| consolidation | 1 | 0 | -1965 | -1965 |
| total | 265 | 353886 | -16687 | 337199 |

Share of the +337199: rung commits 194474 (57.7%), clarity workflow 82635 (24.5%), coordinator edits 49360 (14.6%), review-fold or repair 7349, record-landing runs 5333, landing gate-table commits 13, consolidation -1965.

### The 30 commits that added the most

| # | commit | UTC date | chars added to FACTS (net) | kind | subject (first 100 chars) |
|---|---|---|---|---|---|
| 1 | bb39dbee3 | 2026-10-22 12:03 | 23666 | clarity workflow | FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held) |
| 2 | e06bd068e | 2026-10-22 12:13 | 22704 | clarity workflow | FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared  |
| 3 | 16bbe6072 | 2026-10-22 12:06 | 17111 | clarity workflow | FACTS: clarity chunks f9 to f12 applied as judged (f10 before f9 for F-203; three entries held) |
| 4 | 0ae072be7 | 2026-10-22 11:56 | 16428 | clarity workflow | FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259) |
| 5 | 5064f7f80 | 2026-11-13 23:39 | 14903 | coordinator edit (no code; not a landing run, clarity run or consolidation) | FACTS: the probes of 2026-11-10 to 2026-11-13 filed: F-34's measure on today's code, F-18 and F-58 c |
| 6 | 7a58250bf | 2026-10-16 19:13 | 5959 | coordinator edit (no code; not a landing run, clarity run or consolidation) | FACTS and POSITIONS after climb batch 16's landing and the probes of 2026-10-16 |
| 7 | f2251f937 | 2026-11-05 15:27 | 5501 | coordinator edit (no code; not a landing run, clarity run or consolidation) | FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05 |
| 8 | 0d2206c5f | 2026-10-26 08:56 | 5018 | coordinator edit (no code; not a landing run, clarity run or consolidation) | The foundations review's findings filed: rows 832 (tuple-typed dotted method) and 833 (walk cannot r |
| 9 | d159b7197 | 2026-11-16 04:30 | 4175 | batch rung commit (code, tests, draft entries) | The compiled checker fixes a reduction's unwritten static argument and instantiates a generic functi |
| 10 | 6d187d069 | 2026-10-17 17:41 | 3460 | batch rung commit (code, tests, draft entries) | Walk's load check reads every pair of generic declarations on its declared domains by the checker's  |
| 11 | 70e335bf1 | 2026-10-31 09:21 | 3366 | coordinator edit (no code; not a landing run, clarity run or consolidation) | FACTS from the helper-calls probe (999a1f6d2): F-301, a native helper's call through its generated w |
| 12 | e21ab5389 | 2026-10-24 15:33 | 2942 | coordinator edit (no code; not a landing run, clarity run or consolidation) | The phase 3 exit review's audit filed in the record: the ledger and FACTS |
| 13 | 9879d4386 | 2026-10-16 17:37 | 2837 | batch rung commit (code, tests, draft entries) | Walk reads two generic declarations each over its own instances, takes an if clause only as a Boolea |
| 14 | 0002f96f1 | 2026-11-16 12:29 | 2742 | coordinator edit (no code; not a landing run, clarity run or consolidation) | FACTS: F-370, the api gives each type that a component leaves out; F-371, the team's texts describe  |
| 15 | e5cf04d47 | 2026-11-23 20:05 | 2740 | batch rung commit (code, tests, draft entries) | The one library declares EQV and NEQV over two booleans, beside <-> |
| 16 | b71495ca4 | 2026-10-31 15:29 | 2739 | batch rung commit (code, tests, draft entries) | The compiled path's rewrite composes a native binding over NN32, NN64 or Char with the six transfer  |
| 17 | 09e1338df | 2026-10-22 09:34 | 2726 | clarity workflow | FACTS: the calibration's three entries applied as judged (F-151 reworded, F-263 and F-264 reorganize |
| 18 | 640acb4a1 | 2026-10-30 06:05 | 2585 | batch rung commit (code, tests, draft entries) | Walk loads a builtinPrimitive string that names a static helper of nativeHelpers, and ZZ32's first f |
| 19 | c00e592a5 | 2026-11-23 17:37 | 2511 | coordinator edit (no code; not a landing run, clarity run or consolidation) | Record: the queue triage's missing homes filed, F-402 and six FACTS clauses, rows 1113 to 1116 |
| 20 | bd00ad997 | 2026-10-24 03:43 | 2508 | batch rung commit (code, tests, draft entries) | Row 731's three library sites write their static argument, and __bigOperator2's fused arm casts its  |
| 21 | 955cad76d | 2026-11-09 06:59 | 2434 | batch rung commit (code, tests, draft entries) | Fold numerals alone exactly on both paths; round a compiled numeral constant once |
| 22 | 14e91723f | 2026-10-20 02:45 | 2402 | batch rung commit (code, tests, draft entries) | Walk and the compiled checker read exclusion between two declarations with static parameters over th |
| 23 | f6469d96e | 2026-11-21 00:10 | 2355 | batch rung commit (code, tests, draft entries) | Compile the one library to jars over a second set of run-time classes, so a program compiled against |
| 24 | c41c3d2b0 | 2026-11-05 21:37 | 2292 | batch rung commit (code, tests, draft entries) | Walk's load check reads a program's generic operators between an array and a number beside a self-ty |
| 25 | 5c31f2b68 | 2026-11-23 20:07 | 2290 | batch rung commit (code, tests, draft entries) | Walk runs overloaded generic dotted methods, reads a tuple result by element, and refuses a numeral  |
| 26 | 0856f3e6a | 2026-10-14 04:43 | 2273 | batch rung commit (code, tests, draft entries) | The compiled checker retries a call written as another call's argument against each declaration's pa |
| 27 | 3ba2d005f | 2026-10-14 04:45 | 2264 | batch rung commit (code, tests, draft entries) | Walk computes a power in a size, the No Duplicates Rule is restated on the non-strict relation, and  |
| 28 | 93884be8d | 2026-11-05 21:43 | 2239 | batch rung commit (code, tests, draft entries) | The string family's 18 bindings call nativeHelpers helpers; walk carries the library's FlatString as |
| 29 | ee6bfcb8d | 2026-10-16 17:27 | 2225 | batch rung commit (code, tests, draft entries) | The compiled checker reduces each formula once and answers repeated exclusions and type lookups from |
| 30 | f36a65124 | 2026-11-10 11:40 | 2165 | batch rung commit (code, tests, draft entries) | The numerals' leftovers: the prelude's RR64 and RR32 take an integer numeral, a compiled program's c |

### All 265 commits

| commit | UTC | net chars | kind | subject (first 100) |
|---|---|---|---|---|
| 604d0e23c | 2026-10-14 04:40 | 1058 | batch rung commit | IntMap's node map SYMDIFF a singleton keeps its other entries, Array2's offset takes Array1's shape, |
| 0856f3e6a | 2026-10-14 04:43 | 2273 | batch rung commit | The compiled checker retries a call written as another call's argument against each declaration's pa |
| 3ba2d005f | 2026-10-14 04:45 | 2264 | batch rung commit | Walk computes a power in a size, the No Duplicates Rule is restated on the non-strict relation, and  |
| f9fe5c874 | 2026-10-14 04:47 | 1642 | batch rung commit | Walk counts an inherited abstract method as defined only where the object's narrower bodies cover it |
| 1c32ccffd | 2026-10-14 04:48 | 1825 | batch rung commit | The compiled checker reads a self-typed trait's self as the implementing type from its F-bound, keep |
| 7c2c7cd4b | 2026-10-14 05:34 | 0 | batch landing | Record the gate's tables and the microGPT walk check |
| 3526b510d | 2026-10-14 05:37 | 110 | coordinator edit | FACTS: F-53 and F-54 after climb batch 14, the self-typed bodies cleared and the count's path past b |
| 15a6d4365 | 2026-10-14 06:09 | -5998 | coordinator edit | FACTS: the record pass after climb batch 14, the twelve entries cut to the form and F-224 merged int |
| cf20f71d0 | 2026-10-14 11:39 | 1126 | coordinator edit | FACTS: the scope errors of Astra's record-keeping review repaired |
| f237148ac | 2026-10-14 14:58 | 782 | batch rung commit | The compiled checker expands a closed trait only against a conjunct that names no type variable, and |
| 20474c144 | 2026-10-14 15:01 | 1232 | batch rung commit | Walk instantiates the big operator of a reduction or comprehension that writes no static argument by |
| a0f839ad7 | 2026-10-14 15:03 | 1766 | batch rung commit | array1 and array2 build a vector or a matrix per number type by a typecase over a witness of their r |
| 59b1d0a4d | 2026-10-14 15:05 | 956 | batch rung commit | The compiled checker refuses duplicate functional methods wherever their self parameters stand and c |
| 219d485eb | 2026-10-14 15:28 | 113 | batch review-fold or repair commit | Fold the review's corrections |
| c40489978 | 2026-10-14 15:55 | 0 | batch landing | Record the gate's tables and the microGPT walk check |
| 4dbf3ff4c | 2026-10-14 15:58 | 182 | coordinator edit | FACTS: F-53 and F-54 after climb batch 15, the count at row 680's crash and its repair held |
| dfc92d9a5 | 2026-10-15 00:15 | 1564 | coordinator edit | FACTS: climb batch 15b, the count 39 and the distance 49; F-231 the walker split, F-232 identity has |
| e2906af77 | 2026-10-15 00:48 | 0 | coordinator edit | After PLAN's consolidation: row 425's citations repointed to row 731, P-148's built part out, INDEX  |
| a479a1abe | 2026-10-16 09:15 | 607 | coordinator edit | FACTS F-234, POSITIONS P-150: one-off commands' JVM start-up measured too small for a resident compi |
| ee6bfcb8d | 2026-10-16 17:27 | 2225 | batch rung commit | The compiled checker reduces each formula once and answers repeated exclusions and type lookups from |
| d2fe4e1d9 | 2026-10-16 17:29 | 712 | batch rung commit | Syntax tree nodes hash from their class's name, not the JVM's identity hash, so the checker's output |
| c23b85fdc | 2026-10-16 17:32 | 1750 | batch rung commit | The compiled checker reads a type's abstract functional methods, and reports a broken bound at each  |
| 9879d4386 | 2026-10-16 17:37 | 2837 | batch rung commit | Walk reads two generic declarations each over its own instances, takes an if clause only as a Boolea |
| 07c83a40a | 2026-10-16 18:01 | 84 | batch review-fold or repair commit | Fold the review's corrections |
| 464159846 | 2026-10-16 18:26 | 344 | batch review-fold or repair commit | Climb batch 16's repair after the merged-diff review: Appendix I's two sentences on walk's generic p |
| 7a58250bf | 2026-10-16 19:13 | 5959 | coordinator edit | FACTS and POSITIONS after climb batch 16's landing and the probes of 2026-10-16 |
| 2b1cd8e63 | 2026-10-17 17:35 | 1727 | batch rung commit | The compiled checker reads a where clause's trait constraint as a bound, and the library's generic d |
| 24db899fa | 2026-10-17 17:38 | 947 | batch rung commit | AnyList's comprises clause is live: the checker opens a type where-clause variable at a call, walk b |
| 6d187d069 | 2026-10-17 17:41 | 3460 | batch rung commit | Walk's load check reads every pair of generic declarations on its declared domains by the checker's  |
| 743eb5286 | 2026-10-17 17:44 | 1528 | batch rung commit | Walk infers a generic dotted method's own static arguments, alone or among its receiver's overloads, |
| 091ec54df | 2026-10-17 17:46 | 645 | batch rung commit | The compiled checker takes a left-out return type from the api declaration of the function's own par |
| 21dce2148 | 2026-10-17 18:19 | 193 | batch review-fold or repair commit | Fold the review's corrections |
| 65c0cc463 | 2026-10-17 18:55 | 0 | batch landing | Record the gate's tables and the microGPT walk check |
| 7fd287cec | 2026-10-17 19:34 | 448 | coordinator edit | FACTS: climb batch 17's landing review routed, 13 entries rewritten |
| 372b9bf6a | 2026-10-18 03:11 | 1927 | batch rung commit | The compiled checker reads conditional extension, and a list is ordered where its elements are total |
| 396e4ed8d | 2026-10-18 03:15 | 1919 | batch rung commit | The compiled checker checks a where clause's constraints where they apply: at a dotted call, at a ca |
| 5262a2412 | 2026-10-18 03:17 | 1791 | batch rung commit | Walk reads a trait's generic method's bounds and coercion targets where the trait declares them, and |
| 7d6c65881 | 2026-10-18 03:43 | 84 | batch review-fold or repair commit | Fold the review's corrections |
| 5b11849c6 | 2026-10-18 04:18 | 802 | batch review-fold or repair commit | Climb batch 18's repair after the merged-diff review: a declaration's header is checked without a co |
| e51759f57 | 2026-10-18 04:41 | 0 | batch landing | Record the gate's tables and the microGPT walk check |
| 9332e8ec0 | 2026-10-18 04:57 | 1172 | coordinator edit | FACTS: climb batch 18's landing routed into the entries it made stale |
| e043ba41f | 2026-10-19 22:33 | 475 | coordinator edit | Haiku post-mortem, D.2.3: F-245 takes the sort's 205 errors and 253 at d212b2c1f |
| 14e91723f | 2026-10-20 02:45 | 2402 | batch rung commit | Walk and the compiled checker read exclusion between two declarations with static parameters over th |
| 4190069c4 | 2026-10-20 02:47 | 1157 | batch rung commit | An object or trait whose extends clause names Any alone extends Object, String's two // members over |
| 25b55a1a1 | 2026-10-20 03:12 | 126 | batch review-fold or repair commit | Fold the review's corrections |
| cf4ec59ea | 2026-10-20 03:26 | 264 | batch review-fold or repair commit | Climb batch 19's repair after the merged-diff review: row 788 named in Appendix I's Effect of "Overl |
| ebd39a6bd | 2026-10-20 03:31 | 0 | batch landing | Record the gate's tables and the microGPT walk check |
| 36d53bdd6 | 2026-10-20 03:59 | 1681 | coordinator edit | FACTS: F-260, the array sites by the library's own devices; F-261 and F-262 from the item 58 judgeme |
| 273ed00db | 2026-10-20 05:38 | 377 | coordinator edit | FACTS: F-35, where the api's dead sizes came from |
| 5ad4a9957 | 2026-10-20 08:38 | 1551 | batch rung commit | Every integer power answers its base's own type, and a negative power raises where the result is no  |
| 444f37018 | 2026-10-20 08:42 | 1608 | coordinator edit | The array sites by the library's own devices, with decision E's diff: rung A's record folded |
| 63e1a6eb1 | 2026-10-20 09:07 | 183 | batch review-fold or repair commit | Fold the review's corrections |
| 510fac459 | 2026-10-20 09:16 | -3 | batch landing | Record the gate's tables and the microGPT walk check |
| bd33a2f8b | 2026-10-20 13:03 | -1965 | consolidation | Climb batch 20's routing: item 18 landed, item 19 batch 21's candidates; his answers' items moved; r |
| 6b560762f | 2026-10-22 08:30 | -6 | coordinator edit | POSITIONS: the audit's groups 1 to 7 and the clarity pilot's ten entries applied, at his word of 08: |
| 09e1338df | 2026-10-22 09:34 | 2726 | clarity workflow | FACTS: the calibration's three entries applied as judged (F-151 reworded, F-263 and F-264 reorganize |
| 0ae072be7 | 2026-10-22 11:56 | 16428 | clarity workflow | FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259) |
| bb39dbee3 | 2026-10-22 12:03 | 23666 | clarity workflow | FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held) |
| 16bbe6072 | 2026-10-22 12:06 | 17111 | clarity workflow | FACTS: clarity chunks f9 to f12 applied as judged (f10 before f9 for F-203; three entries held) |
| e06bd068e | 2026-10-22 12:13 | 22704 | clarity workflow | FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared  |
| 382289832 | 2026-10-22 12:37 | -2250 | coordinator edit | POSITIONS and FACTS: the scrape, at his word of 2026-10-22: state words, PLAN and review-queue point |
| 4d7df29c3 | 2026-10-22 22:14 | 799 | coordinator edit | POSITIONS follow-up applied at the curator's word: 22 POSITIONS entries and F-78, F-137, F-270 chang |
| 557cabb04 | 2026-10-23 16:45 | 1240 | batch rung commit | String's four concatenation operators become top-level operators, with the library's known meets bes |
| 64fa505c4 | 2026-10-23 16:49 | 1781 | batch rung commit | The overloading check's exclusion test reads a self-typed trait's self and the static parameters' bo |
| 153887360 | 2026-10-23 16:53 | 1971 | batch rung commit | The library's index parameters are bounded by Index, and a tuple of indices is an Index on both path |
| ff19305cc | 2026-10-23 16:55 | 1491 | batch rung commit | Array2 and Array3 slices based above zero read their own elements, and List extends Equality at ever |
| bdf83c1d1 | 2026-10-23 17:30 | 0 | batch review-fold or repair commit | Fold the review's corrections |
| 04b009628 | 2026-10-23 19:52 | -866 | coordinator edit | Climb batch 21's routing, run 1: item 19 landed, 21b being prepared; items 38 and 59 to PLAN-history |
| 108ab82d6 | 2026-10-23 22:41 | 1506 | batch rung commit | The compiled checker checks the overloading of every symbolic operator, with the AnyList crash, an a |
| 031c38bbc | 2026-10-23 22:45 | 1449 | batch rung commit | The export check matches an api's members by name and header and reads abstract, and FortressLibrary |
| 5e60e356a | 2026-10-23 22:47 | 1219 | batch rung commit | The team demos run to their end under walk, Generator22D's rects halving with DIV and trips' generat |
| 7341a2ad8 | 2026-10-23 23:37 | 65 | batch review-fold or repair commit | Fold the review's corrections |
| 08c95c708 | 2026-10-24 00:36 | -387 | coordinator edit | Climb batch 21b's routing: item 19 landed, the last-5 batch next; the review's findings and defaults |
| 8dd64e8fc | 2026-10-24 03:39 | 716 | batch rung commit | FortressLibrary's api states its component's last members at the component's headers, all but String |
| bd00ad997 | 2026-10-24 03:43 | 2508 | batch rung commit | Row 731's three library sites write their static argument, and __bigOperator2's fused arm casts its  |
| c8e013faf | 2026-10-24 03:46 | 1999 | batch rung commit | String's api writes abstract on its bodyless and undeclared members, and the string objects define t |
| 2bff2fe23 | 2026-10-24 04:34 | -3 | batch landing | Record the gate's tables and the microGPT walk check |
| 89d488872 | 2026-10-24 04:39 | -348 | coordinator edit | F-53 at climb batch 22's gate: the distance 0 and the count 0, the five it cleared named by their en |
| e0ec620a9 | 2026-10-24 05:23 | 264 | coordinator edit | Climb batch 22's routing: phase 3 at its exit, phase 4's natives next on his go; the review's findin |
| e21ab5389 | 2026-10-24 15:33 | 2942 | coordinator edit | The phase 3 exit review's audit filed in the record: the ledger and FACTS |
| 081099714 | 2026-10-24 15:34 | 88 | coordinator edit | F-281: row 782 measured, not latent |
| e15da7608 | 2026-10-24 16:32 | 903 | coordinator edit | The AnyIntegral comprises-where probe filed: row 831, notes on rows 804 and 487, F-121 |
| edbd0d4f5 | 2026-10-25 19:11 | 160 | coordinator edit | Row 816 decided: P-158, a member that an api writes abstract is declared in the component |
| 0d2206c5f | 2026-10-26 08:56 | 5018 | coordinator edit | The foundations review's findings filed: rows 832 (tuple-typed dotted method) and 833 (walk cannot r |
| 8c99e258e | 2026-10-29 13:02 | 1185 | coordinator edit | POSITIONS corrected from the phase 3 exit review, each finding in its home, at his yes of 12:5x UTC  |
| bb3925156 | 2026-10-30 01:18 | 335 | batch rung commit | The export check reads every top-level operator under its declared name, and the library's 9 operato |
| 96fcd051f | 2026-10-30 01:23 | 1528 | batch rung commit | List's two imports enter the distance stage and pass the checker: CovariantCollection by its own api |
| 1bc0a9083 | 2026-10-30 01:26 | -136 | batch rung commit | fortress compile bounds a type parameter declared without a bound by Any, as walk does, and the dist |
| cc47b637d | 2026-10-30 01:34 | 1447 | batch rung commit | The export check counts every api member again, and the library's components declare the 12 members  |
| f8bb64872 | 2026-10-30 02:16 | 57 | batch review-fold or repair commit | Fold the review's corrections |
| b81d86b75 | 2026-10-30 02:48 | 1 | batch landing | Record the gate's tables and the microGPT walk check |
| 6985743ce | 2026-10-30 03:40 | 785 | coordinator edit | FACTS after climb batch 22c's landing, by its post-batch review's finding 4: F-240 at 22c's gate (co |
| 98b04d371 | 2026-10-30 05:43 | 2051 | batch rung commit | The compiled path reads a builtinPrimitive body naming a helper of nativeHelpers as a call of that h |
| 640acb4a1 | 2026-10-30 06:05 | 2585 | batch rung commit | Walk loads a builtinPrimitive string that names a static helper of nativeHelpers, and ZZ32's first f |
| d836122e2 | 2026-10-30 06:42 | 10 | batch review-fold or repair commit | Fold the review's corrections |
| df71bc585 | 2026-10-30 06:55 | -1 | batch landing | Record the gate's tables and the microGPT walk check |
| b5103253a | 2026-10-30 07:11 | 350 | coordinator edit | FACTS after climb batch 23's landing: F-32 at the planner's count of 449 live bindings (154, 59, 158 |
| 1e6a93a04 | 2026-10-30 07:39 | 137 | coordinator edit | F-240 at climb batch 23's gate, by its post-batch review's finding 3: the count stage about 155 s by |
| c040df488 | 2026-10-30 09:39 | 866 | coordinator edit | P-26: the POPL 2019 paper with its technical report, the team's last word and work, kept in Papers/  |
| 70e335bf1 | 2026-10-31 09:21 | 3366 | coordinator edit | FACTS from the helper-calls probe (999a1f6d2): F-301, a native helper's call through its generated w |
| 5ecb7a841 | 2026-10-31 15:14 | 2132 | batch rung commit | Float's 30 native bindings name their static helpers, and walk carries a declared Float in a double |
| 71249bf55 | 2026-10-31 15:15 | 1418 | batch rung commit | CHOOSE on ZZ32 and ZZ64: the helpers raise IntegerOverflow past their tables and give each call its  |
| 3308aad55 | 2026-10-31 15:17 | 1407 | batch rung commit | ZZ64's 20 and ZZ's 16 native bindings name their static helpers, so their DIV by zero raises Divisio |
| ca1498628 | 2026-10-31 15:18 | 993 | batch rung commit | The small rest's eight native bindings name their static helpers: Long's and BigNum's string getters |
| 9f65d60e2 | 2026-10-31 15:20 | 879 | batch rung commit | Walk's native loader is told the type that declares a method, and refuses at load a helper bound in  |
| c324b841c | 2026-10-31 15:23 | 539 | batch rung commit | The code generator compiles a function, method, object or trait whose own header carries a where cla |
| b71495ca4 | 2026-10-31 15:29 | 2739 | batch rung commit | The compiled path's rewrite composes a native binding over NN32, NN64 or Char with the six transfer  |
| 84ae87a27 | 2026-10-31 15:59 | 173 | batch review-fold or repair commit | Fold the review's corrections |
| 25238e60c | 2026-10-31 16:10 | 21 | batch landing | Record the gate's tables and the microGPT walk check |
| be3b07aac | 2026-10-31 17:10 | -1815 | coordinator edit | FACTS and POSITIONS after climb batch 24's landing: the entries that the post-batch review found fal |
| d9f2fdfd0 | 2026-11-02 02:41 | 947 | coordinator edit | Climb batch 24's landing, the four items the record-landing replay found and main lacked: F-309 adde |
| 17b9f6b58 | 2026-11-03 02:35 | 439 | batch rung commit | Float's bit and rounding operations and fromRawBits call 28 new simpleDoubleArith helpers that both  |
| 43f130022 | 2026-11-03 02:38 | 970 | batch rung commit | RR32's 49 bindings call 46 new helpers of a new class, simpleFloatArith, that both paths can run |
| d2501afef | 2026-11-03 02:39 | 1108 | batch rung commit | The asFloats of Int, RR32, NN32, Long and BigNum answer RR64 and call static helpers, two of them ne |
| 41830b90c | 2026-11-03 02:41 | 1532 | batch rung commit | REM and MOD by zero on ZZ32, ZZ64, NN32, NN64 and ZZ throw DivisionByZero under walk, through ten ne |
| f7a33b97b | 2026-11-03 02:44 | 1735 | batch rung commit | The compiled path prints NN32 and NN64 unsigned and negates NN64 by wrapping; UnsignedLong's three,  |
| d85bac271 | 2026-11-03 02:47 | 1452 | batch rung commit | GCD, LCM, partitionL, NN64's and ZZ's CHOOSE, ZZ's cmp and nanoTime call 18 new nativeHelpers helper |
| 8833d89c5 | 2026-11-03 02:49 | 1251 | batch rung commit | The code generator compiles an extends clause at Any, a try with a forbid clause and a function decl |
| 20eab4036 | 2026-11-03 03:32 | 23 | batch review-fold or repair commit | Fold the review's corrections |
| 11d2d8764 | 2026-11-03 03:49 | 0 | batch landing | Record the gate's tables and the microGPT walk check |
| 9342ddbb2 | 2026-11-03 05:42 | 12 | record-landing run commit | Record after climb batch 25's landing: F-32's IntLiteral count, F-240's cause, F-315's method half a |
| f2251f937 | 2026-11-05 15:27 | 5501 | coordinator edit | FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05 |
| c41c3d2b0 | 2026-11-05 21:37 | 2292 | batch rung commit | Walk's load check reads a program's generic operators between an array and a number beside a self-ty |
| 3eabf8435 | 2026-11-05 21:38 | 1074 | batch rung commit | The operators overview says a comparison at a NaN or at 0/0 answers false and the rational infinitie |
| d96242f0a | 2026-11-05 21:39 | 1773 | batch rung commit | The code generator compiles a local function as a closure, recursive and mutually recursive within i |
| 93884be8d | 2026-11-05 21:43 | 2239 | batch rung commit | The string family's 18 bindings call nativeHelpers helpers; walk carries the library's FlatString as |
| 40d1deca5 | 2026-11-05 22:24 | 0 | batch review-fold or repair commit | Fold the review's corrections |
| a12ab5c60 | 2026-11-05 22:42 | 0 | batch landing | Record the gate's tables and the microGPT walk check |
| 410c84ed9 | 2026-11-06 00:14 | 145 | record-landing run commit | Record landing of climb batch 26: FACTS, POSITIONS and the ledger brought in line with the landing |
| 7ecb207b0 | 2026-11-06 00:48 | 66 | coordinator edit | Climb batch 26's held record changes: F-240, F-319, F-321, P-160 and P-159 made true, row 896 for ge |
| abac858c4 | 2026-11-06 16:11 | -2 | coordinator edit | FACTS: F-11 and F-18 cite the worker skill's heading by its new name, The compiled runtime |
| e4872ad93 | 2026-11-07 09:40 | 1173 | batch rung commit | The floats' natives over Number and AnyIntegral are declared at RR64 or convert in Fortress, and gro |
| a97d60dc6 | 2026-11-07 09:44 | 1074 | batch rung commit | Number declares nothing in the one library; each number type declares its own asFloat and an = at ea |
| 8caa399e8 | 2026-11-07 09:45 | 1340 | batch rung commit | The code generator compiles a type assumption at a method call, at a call whose every dispatched arg |
| 598331c0d | 2026-11-07 09:46 | 992 | batch rung commit | SEQV answers by the specification's rule on both paths, and Ratio and the two numeral objects are va |
| 0122a399a | 2026-11-07 09:46 | 1263 | batch rung commit | The integers' shifts and powers over AnyIntegral convert their count or exponent in Fortress and cal |
| 5ae581c4a | 2026-11-07 09:48 | 1038 | batch rung commit | Object's ilkName and SEQV over Any name the compiled path's helpers, which walk answers with its own |
| fc860b655 | 2026-11-07 09:49 | 798 | batch rung commit | A Char's asExprString writes one text on both paths, which the parser reads back at every code point |
| c21780408 | 2026-11-07 09:52 | 1065 | batch rung commit | stdOut, Writer and BufferedWriter are plain Fortress objects over a Java-backed JavaBufferedWriter w |
| ecccddeab | 2026-11-07 10:34 | 563 | batch review-fold or repair commit | Fold the review's corrections |
| 151cb4126 | 2026-11-07 11:36 | 125 | batch review-fold or repair commit | Climb batch 27's repair after the merged-diff review: row 921 closed, the 52 team demos reach their  |
| 29e52a3dc | 2026-11-07 11:56 | -2 | batch landing | Record the gate's tables and the microGPT walk check |
| d131d92c5 | 2026-11-07 15:13 | 1169 | record-landing run commit | Record landing of climb batch 27: FACTS, POSITIONS and the ledger brought in line with the landing |
| bd1174a2c | 2026-11-08 02:19 | 1 | coordinator edit | POSITIONS: P-84 and P-85 widened to every number type's unboxed store, at his word of 02:0x UTC on 1 |
| 7ba33066b | 2026-11-08 02:29 | 4 | coordinator edit | POSITIONS: his answers to Q2, shape (ii), in P-169, and to Q3, option 1, as P-170; item 407 closed;  |
| 45868b113 | 2026-11-08 07:32 | 1466 | batch rung commit | The integer types convert by checked getters that raise IntegerOverflow, bitsAs getters keep the bit |
| 71d1018d1 | 2026-11-08 07:35 | 1315 | batch rung commit | FileReadStream, Reader, stdIn and FileWriteStream are plain Fortress objects over JavaBufferedReader |
| a6c884cd8 | 2026-11-08 07:37 | 1446 | batch rung commit | The one library's arrays hold their elements in a Java-backed store in a field: PrimitiveArray and P |
| a3eba5067 | 2026-11-08 07:38 | 939 | batch rung commit | The checker sorts a call's and a coercion's candidates and a trait's ancestors by a partial order, r |
| 70c26e3fd | 2026-11-08 07:40 | 1824 | batch rung commit | Thread's four, abort and printTaskTrace name helpers of nativeHelpers/runtime, which walk answers wi |
| 8ff5cb7ff | 2026-11-08 07:43 | 1698 | batch rung commit | System's getEnvironment and getProperty name stringOps, and args is built in Fortress over two scala |
| d839b7421 | 2026-11-08 07:44 | 825 | batch rung commit | The code generator compiles an object or trait whose first supertrait is an imported api's trait, al |
| 5c5ec47e9 | 2026-11-08 08:39 | 47 | batch review-fold or repair commit | Fold the review's corrections |
| f56d6516c | 2026-11-08 08:46 | 1 | batch landing | Record the gate's tables and the microGPT walk check |
| bec01c578 | 2026-11-08 10:30 | -271 | record-landing run commit | Record landing of climb batch 28: FACTS, POSITIONS and the ledger brought in line with the landing |
| 9aa65eed0 | 2026-11-08 15:25 | 68 | coordinator edit | Record: rows 943-945 for literal behaviours the decisions settle, F-326 cites row 943 |
| 69427e942 | 2026-11-08 23:52 | 146 | coordinator edit | Record: P-173 and P-174, the numeral design, and P-175, parallel reductions, his decisions of 22:3x  |
| 955cad76d | 2026-11-09 06:59 | 2434 | batch rung commit | Fold numerals alone exactly on both paths; round a compiled numeral constant once |
| 3de571bac | 2026-11-09 07:06 | 975 | batch rung commit | Give numerals the types NaturalNumeral and RadixPointNumeral, and convert them where walk's places f |
| 53a6074ed | 2026-11-09 07:09 | 1688 | batch rung commit | Convert a numeral that nothing fixes into its default in the compiled checker, and refuse one out of |
| e53480fc6 | 2026-11-09 07:11 | 1378 | batch rung commit | Make two string literals of one text one object on both paths, and fold a concatenation of literals |
| 12292add2 | 2026-11-09 07:16 | 868 | batch rung commit | Read a number or string value at its trait in walk's inference and messages |
| 4978a9b16 | 2026-11-09 07:27 | 1747 | batch rung commit | Specify the numeral types, their conversion and default, the fold, and a string literal as one objec |
| 6a654baa1 | 2026-11-09 08:22 | 140 | batch review-fold or repair commit | Fold the review's corrections |
| 7daf51fe8 | 2026-11-09 08:49 | 1 | batch landing | Record the gate's tables and the microGPT walk check |
| 2db561918 | 2026-11-09 11:00 | -1180 | record-landing run commit | Record landing of climb batch 29: FACTS, POSITIONS and the ledger brought in line with the landing |
| cac54a1bf | 2026-11-09 17:43 | 181 | coordinator edit | Record: P-174 rewritten to his static numerals, P-176 split out, P-37's exception for the numerals;  |
| a26e74f5c | 2026-11-09 23:31 | 1710 | batch rung commit | Build the static numerals on both paths: each numeral's place one value from its type's own coercion |
| fcfd0aeb3 | 2026-11-09 23:37 | 438 | batch rung commit | Specify the static numerals: a numeral's type exists only at compile time, its four numbers its stat |
| eb8a59245 | 2026-11-10 00:34 | 1269 | batch review-fold or repair commit | Fold the review's corrections |
| a2be3e9e1 | 2026-11-10 00:38 | 3 | batch landing | Record the gate's tables and the microGPT walk check |
| 36e60805e | 2026-11-10 02:27 | 486 | record-landing run commit | Record landing of climb batch 29b: FACTS, POSITIONS and the ledger brought in line with the landing |
| f36a65124 | 2026-11-10 11:40 | 2165 | batch rung commit | The numerals' leftovers: the prelude's RR64 and RR32 take an integer numeral, a compiled program's c |
| 76b21f498 | 2026-11-10 11:40 | 1483 | batch rung commit | Compiled path: every forked arm is joined before a group completes abruptly, a task arm keeps its ow |
| 594da4129 | 2026-11-10 11:43 | 1784 | batch rung commit | The compiled transaction: a block's own writes, the sets its threads share, a nested block's view, h |
| 0ddfc840e | 2026-11-10 12:20 | 29 | coordinator edit | Climb batch 30's gather record: the rungs N, P and X on main, their rows, tests and items for the cu |
| eed02564c | 2026-11-10 12:31 | 115 | batch review-fold or repair commit | Fold the review's corrections |
| d89fc0fda | 2026-11-10 12:42 | -4 | batch landing | Record the gate's tables and the microGPT walk check |
| f78da2650 | 2026-11-10 13:53 | 957 | record-landing run commit | Record landing of climb batch 30: FACTS, POSITIONS and the ledger brought in line with the landing |
| 5064f7f80 | 2026-11-13 23:39 | 14903 | coordinator edit | FACTS: the probes of 2026-11-10 to 2026-11-13 filed: F-34's measure on today's code, F-18 and F-58 c |
| 5c8055dee | 2026-11-16 04:25 | 1005 | batch rung commit | An api declares a postfix exponent operator, and the signs for sum and product begin a reduction |
| a10f1cd59 | 2026-11-16 04:28 | 1832 | batch rung commit | A superscript follows a dotted access on both paths, and a parenthesised call under walk |
| d159b7197 | 2026-11-16 04:30 | 4175 | batch rung commit | The compiled checker fixes a reduction's unwritten static argument and instantiates a generic functi |
| b190b8eb2 | 2026-11-16 04:33 | 1979 | batch rung commit | A numeral at a call goes to the most specific declaration that takes it, on both paths |
| 754a0f29d | 2026-11-16 04:35 | 1869 | batch rung commit | Under walk a generic function passed as a value is instantiated at the arrow type that receives it |
| d58333512 | 2026-11-16 04:36 | 1219 | batch rung commit | Under walk a top-level array literal with a declared type is built into an array |
| 060f3ec09 | 2026-11-16 04:38 | 1669 | batch rung commit | A top-level tuple binding compiles, each name typed by its element |
| 700b9872d | 2026-11-16 04:42 | 367 | coordinator edit | Close the rows climb batch 32 fixed |
| 567c36dad | 2026-11-16 05:35 | -1 | batch landing | Record the gate's tables and the microGPT walk check |
| 9683fef67 | 2026-11-16 06:44 | 557 | record-landing run commit | Record: FACTS and POSITIONS in line with climb batch 32's landing |
| 25c0d1cb0 | 2026-11-16 07:45 | 981 | coordinator edit | Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the  |
| 0002f96f1 | 2026-11-16 12:29 | 2742 | coordinator edit | FACTS: F-370, the api gives each type that a component leaves out; F-371, the team's texts describe  |
| fdf55072b | 2026-11-16 12:48 | 17 | coordinator edit | FACTS: F-266's pointer to row 405 brought to the row's new words |
| 74f53ec88 | 2026-11-17 02:48 | 1753 | batch rung commit | The code generator writes each inherited method once into a class and forwards to a body in an api's |
| 3f7fd7281 | 2026-11-17 02:50 | 2098 | batch rung commit | Compile label and exit: an exit leaves its label's block with its value |
| 5a076e9bc | 2026-11-17 02:50 | 1597 | batch rung commit | Compile an atomic expression, and keep an object's var field in a cell |
| b6fb208e2 | 2026-11-17 02:51 | 1668 | batch rung commit | Walk: a type parameter bounded by a value type, and the load check of a generic declaration beside a |
| 1ce04203c | 2026-11-17 02:53 | 1804 | batch rung commit | The checker's Return Type Rule counts only the instances whose domain meets an object type |
| 6df780a7d | 2026-11-17 02:54 | 2079 | batch rung commit | The compiled code casts self where it stands at a type below its trait |
| 258765938 | 2026-11-17 03:31 | 167 | batch review-fold or repair commit | Fold the review's corrections |
| 7858d0e97 | 2026-11-17 04:26 | 0 | batch landing | Record the gate's tables and the microGPT walk check |
| 255179ba3 | 2026-11-17 07:11 | 1799 | record-landing run commit | Record: FACTS and the ledger in line with climb batch 31's landing, run 1 |
| 06cd09470 | 2026-11-17 09:14 | 1350 | batch rung commit | A method whose one parameter is a tuple compiles: its JVM parameters follow its declaration, and bri |
| f6e24650e | 2026-11-17 09:19 | -178 | batch rung commit | The five number types ZZ32, ZZ64, ZZ, NN64 and RR64 as value objects in the one library and walk, ea |
| d3095ca77 | 2026-11-17 09:24 | 1437 | batch rung commit | A numeral that ends a block after a local declaration, or stands in a tuple, converts where it stand |
| caa5363d7 | 2026-11-17 10:06 | 50 | batch review-fold or repair commit | Fold the review's corrections |
| 00dd16a89 | 2026-11-17 10:18 | 2 | batch landing | Record the gate's tables and the microGPT walk check |
| b95570a64 | 2026-11-17 11:49 | -169 | record-landing run commit | Record: FACTS and POSITIONS in line with climb batch 31b's landing, run 2 of climb batch 31 |
| 97218ba6a | 2026-11-17 14:33 | -204 | coordinator edit | FACTS F-34 and row 812: the code generator's measure on climb batch 31b's landed tree, 17 refused in |
| 1e9b2cf9c | 2026-11-17 18:00 | 124 | coordinator edit | Record: climb batch 31b's points for a writer, items 513, 514, 518, 519 and 576, F-318, F-372, F-374 |
| c7ba100d1 | 2026-11-17 21:28 | 1093 | batch rung commit | The compile command reads the one library where FORTRESS_LIBRARY=one selects it |
| 18240c9d8 | 2026-11-17 21:30 | 1756 | batch rung commit | A typecase arm at a name that no declaration defines is refused on both paths |
| 5073eb2aa | 2026-11-17 21:32 | 1380 | batch rung commit | The code generator keeps the static parameters in scope, and binds a typecase tuple pattern's names |
| 1f6c166b0 | 2026-11-17 21:35 | 1675 | batch rung commit | The compiled code casts self at a conditional's arm and a closure's result, and loads no class to ch |
| e501de7a1 | 2026-11-17 21:37 | 1145 | batch rung commit | A method call on a value typed by an intersection is a call on the conjunct that declares the method |
| 8979406af | 2026-11-17 21:38 | 1251 | batch rung commit | Four of the compiled checker's smaller gaps repaired |
| f470e902b | 2026-11-17 22:29 | 580 | batch review-fold or repair commit | Fold the review's corrections |
| d3747846c | 2026-11-17 22:36 | -2 | batch landing | Record the gate's tables and the microGPT walk check |
| fdd4a2cdd | 2026-11-18 00:16 | 28 | record-landing run commit | Record after climb batch 33's landing, run 1: 23 FACTS entries, P-12 and row 1052 |
| f4889acd9 | 2026-11-18 01:56 | -430 | coordinator edit | F-34 on run 1's landed tree, 13 refused in 4 kinds, and rows 1076 to 1079 |
| 75f9f2fbf | 2026-11-18 05:32 | 1351 | batch rung commit | The compiler's prelude declares its seven number types as value objects, each written by the code ge |
| 5af98dbca | 2026-11-18 05:34 | 1631 | batch rung commit | Each function expression of a component gets a class name of its own: a later one at a span already  |
| e9bc2ed3e | 2026-11-18 05:37 | 1618 | batch rung commit | A varargs parameter is compiled as one immutable array of the arguments that no plain parameter take |
| 90ee716db | 2026-11-18 05:40 | 1017 | batch rung commit | A method of an imported api's trait is found by its api on the compiled path |
| 17b55bcc7 | 2026-11-18 06:25 | 611 | batch review-fold or repair commit | Fold the review's corrections |
| ba3c7c876 | 2026-11-18 06:41 | 2 | batch landing | Record the gate's tables and the microGPT walk check |
| 8626629ea | 2026-11-18 08:15 | -1 | record-landing run commit | Record after climb batch 33b's landing: 16 FACTS entries, P-33 and P-178, row 1089 and three rows |
| 7dc81f4e5 | 2026-11-18 09:36 | 433 | coordinator edit | F-34: the code generator refuses 2 declarations on ba3c7c876d; the measure misses row 818's in Strin |
| 069df3a2a | 2026-11-18 15:26 | 379 | coordinator edit | F-377: a conditional whose arms are pairs holding self needs no cast, and an all-self typecase is ca |
| 8e4cc0c16 | 2026-11-20 17:53 | 984 | batch rung commit | The code generator compiles a generic method called on a receiver typed by a type variable, reading  |
| bd933455e | 2026-11-20 17:56 | 1365 | batch rung commit | The code generator compiles a call of an overloaded function with a type assumption at some of its d |
| 42c9f707d | 2026-11-20 17:56 | 1136 | batch rung commit | The code generator keeps a local variable's binding in its declaration's body only, so a closure aft |
| 51d6c49eb | 2026-11-20 18:00 | 1121 | batch rung commit | The compiled checker refuses a getter that widens the return type of the getter it keeps from being  |
| 3e19933c6 | 2026-11-20 18:00 | 1250 | batch rung commit | Walk sets a native singleton's constructor as it binds the singleton, so the library's FlatString no |
| 2e5e54c67 | 2026-11-20 18:04 | 13 | coordinator edit | Close the rows climb batch 34 fixed |
| 66cd4c956 | 2026-11-20 19:01 | 256 | batch review-fold or repair commit | Fold the review's corrections |
| 285efad80 | 2026-11-20 19:13 | 0 | batch landing | Record the gate's tables and the microGPT walk check |
| 5a70c03de | 2026-11-20 20:48 | -3 | record-landing run commit | Record after climb batch 34's landing: F-34, F-225, F-325 and F-392 to F-394, notes on F-240 and P-1 |
| f6469d96e | 2026-11-21 00:10 | 2355 | batch rung commit | Compile the one library to jars over a second set of run-time classes, so a program compiled against |
| 11ac1ddf7 | 2026-11-21 00:50 | 921 | batch review-fold or repair commit | Fold the review's corrections |
| 295c215c2 | 2026-11-21 01:11 | 3 | batch landing | Record the gate's tables and the microGPT walk check |
| b5a476582 | 2026-11-21 02:37 | -7 | record-landing run commit | Record after climb batch 34b's landing: F-34, F-24, F-312, F-332, F-301 and the batch's drafts; note |
| 6f0e48f18 | 2026-11-23 12:13 | 1046 | batch rung commit | A numeral with a radix point keeps its leading zeros in its digit count, on both paths |
| f8b05668e | 2026-11-23 12:17 | 1621 | batch rung commit | Walk applies a subscript before a superscript with all its indices, and runs a tuple binding's right |
| 1db0e878c | 2026-11-23 12:18 | 1045 | batch rung commit | The dispatch method of a functional method reads each argument at its own local, wherever self stand |
| d56eb8a88 | 2026-11-23 12:21 | 1854 | batch rung commit | The code generator compiles the modifier override, and the checker refuses one that overrides nothin |
| e8b20935d | 2026-11-23 12:22 | 1319 | batch rung commit | An exit out of an atomic block keeps the block's writes, on both paths |
| b0a5943e7 | 2026-11-23 13:01 | 126 | batch review-fold or repair commit | Fold the review's corrections |
| 693fa9ec8 | 2026-11-23 13:18 | 68 | batch review-fold or repair commit | Climb batch 35's repair after the merged-diff review: Appendix I's clause on row 1107 narrowed to wh |
| 0a83a7049 | 2026-11-23 14:31 | -4 | batch landing | Record the gate's tables and the microGPT walk check |
| 2af3ec103 | 2026-11-23 16:09 | 949 | record-landing run commit | Record after climb batch 35's landing: P-174, P-40 and P-173 in line with P-174's rewrite; F-396, th |
| c00e592a5 | 2026-11-23 17:37 | 2511 | coordinator edit | Record: the queue triage's missing homes filed, F-402 and six FACTS clauses, rows 1113 to 1116 |
| e5cf04d47 | 2026-11-23 20:05 | 2740 | batch rung commit | The one library declares EQV and NEQV over two booleans, beside <-> |
| 5c31f2b68 | 2026-11-23 20:07 | 2290 | batch rung commit | Walk runs overloaded generic dotted methods, reads a tuple result by element, and refuses a numeral  |
| 08860c527 | 2026-11-23 20:08 | 1589 | batch rung commit | Compiled calls name methods that the class holds: a setter at the field's type, and an overload meth |
| 1caac80b3 | 2026-11-23 20:59 | 1 | batch landing | Record the gate's tables and the microGPT walk check |
| 96cd5ade2 | 2026-11-23 21:56 | 862 | record-landing run commit | Record after climb batch 35b's landing: P-174 names row 1124; F-253 and F-26 name row 1125's excepti |
| 0308671be | 2026-11-24 01:40 | 320 | coordinator edit | The gate's step 7 under P-103: the interpreter's suite on the compiled path, each program by its own |
| ef81c4e6c | 2026-11-24 01:50 | -239 | coordinator edit | The record brought in line with P-103's gate change and the seeding fix: F-404, F-108, F-109, F-203, |
| 2a969fed6 | 2026-11-24 05:37 | 1791 | batch rung commit | A numeral coercion's four numbers convert where they stand, on both paths, and the coercions carry n |
| df5948e7b | 2026-11-24 05:39 | 1157 | batch rung commit | Walk keys generic dotted methods by their bounds, reads a tuple result by element at every instance, |
| da5f70777 | 2026-11-24 05:42 | 2007 | batch rung commit | The checker chooses among a call's declarations by their signatures as declared, in the order of the |
| 3a0bae976 | 2026-11-24 05:47 | 1567 | batch rung commit | A compiled program against the one library names a generic function's class with its package, and ea |
| 8dff5e053 | 2026-11-24 06:28 | -210 | batch review-fold or repair commit | Fold the review's corrections |
| 61b50cd34 | 2026-11-24 06:51 | -2 | batch landing | Record the gate's tables and the microGPT walk check |

## 3. New entries against grown entries

Source: `analyze.py`, output `part3-out.txt`.

- Entries at `b67abe3d2`: 157. At `9de4c69bc8`: 339. New (not at `b67abe3d2`): 182. At both: 157. At the start and not at the end: 0.
- New entries, characters at birth (in the commit that first added them): min 320, first quartile 873, median 1192.5, third quartile 1465.5, max 3018. Over 600 at birth: 165 of 182.
- The same 182 entries now: min 320, first quartile 1089.25, median 1323, third quartile 1721, max 4330. Over 600 now: 172 of 182.
- The 157 entries at both, then: min 274, first quartile 517.5, median 576, third quartile 600, max 976; over 600 then: 38. Now: min 282, first quartile 685.5, median 958, third quartile 1390.5, max 2401; over 600 now: 127.

Where the +337199 characters of the file come from:

| part | characters | share of 337199 |
|---|---|---|
| new entries, at their birth size | 220120 | 65.3% |
| new entries, growth after birth (now minus birth) | 40126 | 11.9% |
| the 157 older entries, growth (now minus at `b67abe3d2`) | 76771 | 22.8% |
| entries removed | 0 | 0 |
| rest: the newline after each of the 182 new entry lines (the three rows above count entry lines without newline) | 182 | 0.05% |

(Entry-line characters were 89263 at the start and 426280 at the end, +337017; with the 182 newlines, +337199. So the file's non-entry text changed by 0 characters net.)

Who made the births, by kind of the commit that added the entry (count, characters at birth): rung commits 129 entries, 168928; coordinator edits 41, 38408; clarity workflow 11, 11929; record-landing run 1, 855.

Net growth of existing entries (a commit that changed an entry that already existed), by kind and by whether the entry is new or old (old = at `b67abe3d2`):
- clarity workflow: old +62148, new +9199.
- rung commits: new +15788, old +7796.
- coordinator edits: old +8071, new +2397.
- review-fold or repair commits: new +6676, old +673.
- record-landing run commits: new +5723, old -1246.
- consolidation: new +324, old -147. Gate-tables commits: new +19, old -6.

## 4. The 40 largest entries at `9de4c69bc8`

"Commits that changed it" counts the commits of the window in which the entry's line differs from its parent's, including its birth. "Birth" is the first commit that added it. The last column lists each commit that grew the entry by more than 150 characters, with the kind (short form) and the characters added. Source: `analyze.py`, output `part4-out.md`.

| # | entry | chars now | chars at birth (new) or at b67abe3d2 (old) | commits that changed it (incl. birth) | commits that grew it by more than 150 chars (hash, kind, +chars) |
|---|---|---|---|---|---|
| 1 | F-252 | 4330 | 3018 (birth, 6d187d069) | 11 | 6d187d069 batch rung commit +3018; f2251f937 coordinator edit +1951; c41c3d2b0 batch rung commit +225; 255179ba3 record-landing run commit +164 |
| 2 | F-299 | 3232 | 1620 (birth, 640acb4a1) | 21 | 640acb4a1 batch rung commit +1620; 3308aad55 batch rung commit +160; 9f65d60e2 batch rung commit +879; 93884be8d batch rung commit +924; d131d92c5 record-landing run commit +282; b95570a64 record-landing run commit +159 |
| 3 | F-377 | 3197 | 1786 (birth, 6df780a7d) | 7 | 6df780a7d batch rung commit +1786; 1f6c166b0 batch rung commit +884; 069df3a2a coordinator edit +379; da5f70777 batch rung commit +370 |
| 4 | F-225 | 3019 | 1824 (birth, 1c32ccffd) | 15 | 1c32ccffd batch rung commit +1824; 0ae072be7 clarity workflow +1064; 0d2206c5f coordinator edit +616; 6df780a7d batch rung commit +292; 258765938 batch review-fold or repair commit +167; 5a70c03de record-landing run commit +242 |
| 5 | F-341 | 2941 | 1233 (birth, 3de571bac) | 9 | 3de571bac batch rung commit +1233; eb8a59245 batch review-fold or repair commit +466; f78da2650 record-landing run commit +532; 5c31f2b68 batch rung commit +287; df5948e7b batch rung commit +321 |
| 6 | F-366 | 2941 | 2890 (birth, b190b8eb2) | 4 | b190b8eb2 batch rung commit +2890; d3095ca77 batch rung commit +208 |
| 7 | F-258 | 2830 | 2387 (birth, 14e91723f) | 3 | 14e91723f batch rung commit +2387; cf4ec59ea batch review-fold or repair commit +264; 64fa505c4 batch rung commit +179 |
| 8 | F-325 | 2633 | 1339 (birth, 8caa399e8) | 4 | 8caa399e8 batch rung commit +1339; bd933455e batch rung commit +1183 |
| 9 | F-396 | 2540 | 1519 (birth, f6469d96e) | 5 | f6469d96e batch rung commit +1519; b5a476582 record-landing run commit +307; 2af3ec103 record-landing run commit +217; 3a0bae976 batch rung commit +377 |
| 10 | F-255 | 2519 | 1926 (birth, 372b9bf6a) | 6 | 372b9bf6a batch rung commit +1926; 5b11849c6 batch review-fold or repair commit +802 |
| 11 | F-282 | 2506 | 1428 (birth, 031c38bbc) | 10 | 031c38bbc batch rung commit +1428; 8dd64e8fc batch rung commit +539; c8e013faf batch rung commit +308; edbd0d4f5 coordinator edit +160; 8979406af batch rung commit +200 |
| 12 | F-375 | 2494 | 1667 (birth, b6fb208e2) | 7 | b6fb208e2 batch rung commit +1667; 255179ba3 record-landing run commit +302; f6e24650e batch rung commit +203; 5c31f2b68 batch rung commit +389 |
| 13 | F-352 | 2455 | 2002 (birth, 5064f7f80) | 9 | 5064f7f80 coordinator edit +2002 |
| 14 | F-365 | 2423 | 2265 (birth, d159b7197) | 2 | d159b7197 batch rung commit +2265; 9683fef67 record-landing run commit +158 |
| 15 | F-256 | 2408 | 1918 (birth, 396e4ed8d) | 4 | 396e4ed8d batch rung commit +1918; 16bbe6072 clarity workflow +417 |
| 16 | F-58 | 2401 | 811 (at b67abe3d2) | 8 | bb39dbee3 clarity workflow +458; 8dd64e8fc batch rung commit +177; 5064f7f80 coordinator edit +319; 25c0d1cb0 coordinator edit +440 |
| 17 | F-180 | 2337 | 580 (at b67abe3d2) | 4 | e06bd068e clarity workflow +1017; 98b04d371 batch rung commit +504; 640acb4a1 batch rung commit +248 |
| 18 | F-228 | 2330 | 1306 (birth, 20474c144) | 5 | 20474c144 batch rung commit +1306; 9879d4386 batch rung commit +245; e06bd068e clarity workflow +757 |
| 19 | F-405 | 2307 | 1613 (birth, 5c31f2b68) | 2 | 5c31f2b68 batch rung commit +1613; df5948e7b batch rung commit +694 |
| 20 | F-141 | 2282 | 976 (at b67abe3d2) | 3 | 16bbe6072 clarity workflow +1374 |
| 21 | F-253 | 2241 | 1145 (birth, 743eb5286) | 6 | 743eb5286 batch rung commit +1145; 9332e8ec0 coordinator edit +916; 96cd5ade2 record-landing run commit +200 |
| 22 | F-240 | 2201 | 595 (birth, 7a58250bf) | 30 | 7a58250bf coordinator edit +595; 04b009628 coordinator edit +227; 6985743ce coordinator edit +256; 255179ba3 record-landing run commit +205 |
| 23 | F-257 | 2194 | 1790 (birth, 5262a2412) | 7 | 5262a2412 batch rung commit +1790; e06bd068e clarity workflow +369; df5948e7b batch rung commit +158 |
| 24 | F-174 | 2179 | 599 (at b67abe3d2) | 2 | e06bd068e clarity workflow +1550 |
| 25 | F-373 | 2109 | 2097 (birth, 3f7fd7281) | 3 | 3f7fd7281 batch rung commit +2097 |
| 26 | F-364 | 2102 | 1908 (birth, d159b7197) | 3 | d159b7197 batch rung commit +1908 |
| 27 | F-308 | 2098 | 2330 (birth, b71495ca4) | 8 | b71495ca4 batch rung commit +2330; f7a33b97b batch rung commit +170; d131d92c5 record-landing run commit +180 |
| 28 | F-264 | 2093 | 1144 (birth, 444f37018) | 3 | 444f37018 coordinator edit +1144; 09e1338df clarity workflow +890 |
| 29 | F-298 | 2090 | 1546 (birth, 98b04d371) | 7 | 98b04d371 batch rung commit +1546; b5103253a coordinator edit +215; b71495ca4 batch rung commit +259; f7a33b97b batch rung commit +434 |
| 30 | F-318 | 2086 | 2033 (birth, c41c3d2b0) | 3 | c41c3d2b0 batch rung commit +2033 |
| 31 | F-19 | 2028 | 423 (at b67abe3d2) | 3 | f2251f937 coordinator edit +1320; 76b21f498 batch rung commit +286 |
| 32 | F-75 | 1999 | 576 (at b67abe3d2) | 6 | 0ae072be7 clarity workflow +757; 1ce04203c batch rung commit +838 |
| 33 | F-26 | 1997 | 597 (at b67abe3d2) | 4 | bb39dbee3 clarity workflow +1150 |
| 34 | F-369 | 1967 | 1668 (birth, 060f3ec09) | 6 | 060f3ec09 batch rung commit +1668 |
| 35 | F-367 | 1957 | 1868 (birth, 754a0f29d) | 2 | 754a0f29d batch rung commit +1868 |
| 36 | F-353 | 1934 | 1577 (birth, 5064f7f80) | 7 | 5064f7f80 coordinator edit +1577 |
| 37 | F-342 | 1928 | 1431 (birth, 53a6074ed) | 6 | 53a6074ed batch rung commit +1431; a26e74f5c batch rung commit +184; eb8a59245 batch review-fold or repair commit +197 |
| 38 | F-351 | 1900 | 1783 (birth, 594da4129) | 4 | 594da4129 batch rung commit +1783 |
| 39 | F-390 | 1899 | 1488 (birth, e9bc2ed3e) | 5 | e9bc2ed3e batch rung commit +1488; 8626629ea record-landing run commit +190; f6469d96e batch rung commit +287 |
| 40 | F-32 | 1897 | 748 (at b67abe3d2) | 15 | bb39dbee3 clarity workflow +1108; 640acb4a1 batch rung commit +174 |

Of the 40: 32 are new in the window and 8 are older (F-58, F-180, F-141, F-174, F-19, F-75, F-26, F-32).

## 5. The other record files

Characters (Python `len`) at the two commits, from `git show COMMIT:PATH`. Script `part5.py`.

| file | chars at b67abe3d2 | chars at 9de4c69bc8 |
|---|---|---|
| coordinator/FACTS-history.md | 433738 | 2523981 |
| coordinator/POSITIONS.md | 33903 | 119751 |
| coordinator/POSITIONS-history.md | 169486 | 1019808 |
| coordinator/INDEX.md | 199766 | 392481 |
| coordinator/PLAN.md | 468814 | 293991 |
| coordinator/review-queue.md | 98764 | 373742 |
| coordinator/HELD.md | 8363 | 81559 |
| fortress-gap-ledger.md | 588280 | 908556 |

`INDEX.md` (`explorations/coordinator/INDEX.md`):
- Lines at `b67abe3d2`: 411; median line length 416 characters; longest line 1568.
- Lines at `9de4c69bc8`: 695; median line length 515 characters; longest line 2576.
- commits touching INDEX 243 (sum positive 193611 sum negative -896 characters, net per commit).
- The 10 commits that added the most characters to INDEX.md (first-parent, net per commit; kind is the FACTS kind of section 2 when the commit also changed FACTS):

| commit | UTC | INDEX chars added | FACTS kind | subject (first 100) |
|---|---|---|---|---|
| 24a49044b | 2026-11-09 18:57 | 4125 | (did not change FACTS) | Post-mortem of the numeral design: the recovery scout's files join the folder at his word (the inven |
| a1f8c4b8b | 2026-10-30 02:51 | 3421 | (did not change FACTS) | Merge branch 'postmortem/final-reports' |
| ad25f570a | 2026-11-06 05:40 | 3072 | (did not change FACTS) | Record: INDEX lines for the four reviews of 2026-11-06; ledger rows 897-904 from them, row 861 corre |
| 732d05e5f | 2026-10-14 11:22 | 2412 | (did not change FACTS) | BOOT.md rewritten whole after the compaction; INDEX lines for batch 15's record, its review and the  |
| 9e04ee19e | 2026-10-16 14:01 | 2190 | (did not change FACTS) | INDEX lines for the day's notes; the profile held for the coordinator skill; BOOT.md: the profile do |
| 85b2998e9 | 2026-10-31 17:25 | 1997 | (did not change FACTS) | INDEX: lines for the seven notes of the post-mortem of 2026-10-28 that check-index.sh reports withou |
| 3240bf5a4 | 2026-11-06 11:40 | 1754 | (did not change FACTS) | Climb batch 27's record: six rungs proposed, N, I, F, C, W, S, and four left for climb batch 28 |
| 686cf956b | 2026-11-07 06:21 | 1746 | (did not change FACTS) | Climb batch 27: the Fable review of rungs A, E, G and T, with its changes to the record |
| 4c3b2e42a | 2026-10-14 06:15 | 1696 | (did not change FACTS) | INDEX and the review queue: climb batch 14's three notes, its two answered items built |
| 257cae950 | 2026-11-17 10:48 | 1681 | (did not change FACTS) | Post-batch review of climb batch 31b, run 2 of climb batch 31 |

Note: `a1f8c4b8b` is a first-parent merge commit ("Merge branch 'postmortem/final-reports'"); its net is against its first parent. A second file named INDEX.md (`explorations/coordinator/postmortem-2026-11-09-numerals/recovery/slices/INDEX.md`) exists at the end; it is not counted.
