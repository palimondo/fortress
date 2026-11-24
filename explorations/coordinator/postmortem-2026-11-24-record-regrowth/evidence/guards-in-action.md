<!-- Evidence for the post-mortem of the record's regrowth, slice "guards in action": what each check on an entry's length did in the sixteen record-landing runs (climb batches 25 to 35b), the judge's rulings, ten applied growths, FACTS's writers before the workflow, and what was done with the reports of entries over 600 characters; for the Opus writer, 2026-11-24. -->

# Guards in action: what each check on an entry's length did, run by run

Evidence only. Hashes are commits on `main` at `9de4c69bc8` or earlier. Times are UTC. "Over 600" counts the characters of an entry's whole line in `FACTS.md` (`- F-N ...`), as `record.py check` does (`record.py:1198`, `len(e.line) > SIZE`, `SIZE = 600`, line 126, "reported, never refused"). Where a count is mine, its source is named.

## 0. How the workflow is meant to run, as the four files say it

- `explorations/coordinator/tools/record-landing/README.md`, stage 5: "**Judge** (Opus, `judge.md`): apply or hold each change once, `final.apply` and `final.rewrite`, `diff.md` (within 10,000 characters), and `final.sh`, which runs every check again and makes two commits on the branch."
- README, on the checks: "`lengths.py` informs: each changed entry's length, and each entry already over 600 that grew, which the judge holds unless the owed clause alone explains the growth."
- `lengths.py` (docstring): "An entry already over 600 at AT that grew is marked \"grew past 600\": the judge holds it unless the clause that its change owes alone explains the growth (judge.md). The last line names each such entry. Information only; exit 0." The code marks an entry `grew past 600` when its length at AT is over 600 and its length now is larger; a grown entry that was 600 or less at AT is marked `over 600` if it now is over 600 and is not named on the last line. It reads FACTS and POSITIONS entries.
- `judge.md`, "The verdicts": "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth: `lengths.py` in `mech-2.md` names each such entry, and `entries-report.md` says what the writer moved out first."
- `entries.md` (the entries writer's brief), "Bounds, new evidence and length", line 38 (the same line 38 in each run's `brief-entries.md`, checked in all sixteen): "An entry already past 600 characters grows only by the clause that its change owes. Before you add the clause, move other detail out: to the report that the entry names (question 4 of \"What an entry is\"), or to a pointer to the `fortress-repo` skill's part that already says it (question 5). Detail that belongs in the skill, and that the skill does not hold, goes to your report, for the skill writer. The judge holds an entry past 600 that grows by more."
- `entries.md` also asks, in the same file for `entries-report.md`: "for an entry over 600 characters, the question of \"What an entry is\" that keeps each sentence past the 600, and for one that grew, what you moved out first".
- Where `lengths.py`'s output is kept: no file of its own. It is printed in the section `## lengths.py` of `mech-1.md`, `mech-2.md` and `mech-final.md` of each run, and as two lines in each file's summary (`- lengths.py: pass` and `  - lengths.py: already over 600, and grew: ...`). The summary line is absent from `mech-final.md` of climb batch 26, where it printed `lengths: 0 already over 600 grew`.
- The judge's brief shows the judge `mech-2.md` (the round after the writers' fix round). `mech-1.md` is the round before it. The judge's launch message is not kept in the run's folder (no `brief-judge.md`; the folder holds `brief-entries.md` and `brief-routing.md` only).
- Folders of all sixteen runs hold, by `ls`: `brief-entries.md brief-routing.md check.md checks.md cites.md clean.txt cold-read.md commit-1.txt commit-2.txt diff.md entries-report.md entries.md final.apply mech-1.md mech-2.md mech-final.md owed.md plan.md record.apply routing-report.md rows.md run.env sources.md`. The files below are conditional (README: "Write the file only if a change's home is a row" for `rows.rewrite`; `cut-only.txt` for POSITIONS cuts; `rows.add` for new rows; `plan-stale.txt` only when plan.md's list is cut), so the table names each run's lack of them. No folder lacks an unconditional file.

## 1. The sixteen runs

Sources of the columns: *commits* are the run's two commits as landed on `main` (commit 1 holds FACTS, POSITIONS, histories and the ledger; commit 2 holds PLAN, queue, INDEX and the run's folder; found by `git log` of `mech-final.md` and `git rev-parse commit2^`); *added* and *rewritten* count FACTS entries (lines `- F-N `) that are absent or differ in commit 1 against its parent (my count with `git show`, `scratchpad/gia/m.py`); *chars* is the length of `FACTS.md` before and after commit 1; *over 600* counts FACTS entries by line length before and after commit 1; *shown* is `lengths.py` in `mech-2.md`: entries (FACTS and POSITIONS) already over 600 that grew, as F plus P; *final* is the same in `mech-final.md`. In the 13 runs where commit 1's parent is not AT (main had moved by other commits), `git diff --stat AT parent -- FACTS.md` printed nothing, so FACTS before commit 1 equals FACTS at AT; in climb batches 26, 28 and 29 the parent is AT.

| batch | commit 1 (UTC) | commit 2 | FACTS added / rewritten | chars before > after | entries | over 600 before > after | `lengths.py` entries changed (mech-2 > final) | shown grew (F+P) | final grew | held | conditional files absent |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 25 | `9342ddbb2a` 11-03 05:04 | `784104683c` | 0 / 13 | 277494 > 277506 | 248 > 248 | 205 > 204 | 14 > 14 | 2+0=2 | 2 | 0 | rows.rewrite, final.rewrite, rows.add, plan-stale.txt |
| 26 | `410c84ed94` 11-06 00:14 | `d7a03f34f4` | 1 / 6 | 290385 > 290530 | 253 > 254 | 211 > 212 | 13 > 8 | 4+1=5 | 0 | 5 | cut-only.txt, plan-stale.txt |
| 27 | `d131d92c5e` 11-07 15:12 | `0549157f4b` | 0 / 21 | 300023 > 301192 | 262 > 262 | 220 > 220 | 27 > 27 | 14+4=18 | 18 | 0 | rows.add, cut-only.txt, plan-stale.txt |
| 28 | `bec01c5788` 11-08 10:30 | `72bad2e253` | 0 / 43 | 310758 > 310487 | 270 > 270 | 228 > 228 | 51 > 49 | 16+2=18 | 16 | 2 | rows.add, plan-stale.txt |
| 29 | `2db5619187` 11-09 11:00 | `5febd82a78` | 0 / 43 | 319932 > 318752 | 278 > 278 | 237 > 236 | 55 > 53 | 8+2=10 | 8 | 2 | rows.add, plan-stale.txt |
| 29b | `36e60805e6` 11-10 02:26 | `5f35b1d058` | 0 / 39 | 322353 > 322839 | 279 > 279 | 237 > 237 | 49 > 49 | 9+2=11 | 11 | 0 | rows.add, plan-stale.txt |
| 30 | `f78da2650a` 11-10 13:49 | `8e0100cf7a` | 0 / 15 | 328411 > 329368 | 283 > 283 | 242 > 242 | 18 > 18 | 4+0=4 | 4 | 0 | rows.rewrite, final.rewrite, plan-stale.txt |
| 31 | `255179ba3a` 11-17 07:11 | `9317123078` | 0 / 28 | 373848 > 375647 | 308 > 308 | 267 > 267 | 28 > 28 | 14+0=14 | 14 | 0 | rows.add, cut-only.txt, plan-stale.txt |
| 31b | `b95570a644` 11-17 11:49 | `c1e79529c6` | 0 / 17 | 378308 > 378139 | 310 > 310 | 269 > 269 | 22 > 22 | 5+0=5 | 5 | 0 | rows.rewrite, final.rewrite, rows.add, plan-stale.txt |
| 32 | `9683fef678` 11-16 06:44 | `35b4c2a027` | 0 / 44 | 358385 > 358942 | 300 > 300 | 259 > 259 | 49 > 49 | 12+1=13 | 13 | 0 | rows.rewrite, final.rewrite, rows.add, plan-stale.txt |
| 33 | `fdd4a2cdd1` 11-18 00:16 | `9f2799fb19` | 0 / 23 | 386937 > 386965 | 317 > 317 | 277 > 277 | 24 > 24 | 11+1=12 | 12 | 0 | rows.add, plan-stale.txt |
| 33b | `8626629ea9` 11-18 08:14 | `ff42b70e15` | 0 / 14 | 392765 > 392764 | 321 > 321 | 280 > 280 | 18 > 16 | 6+0=6 | 4 | 2 | cut-only.txt, plan-stale.txt |
| 34 | `5a70c03deb` 11-20 20:48 | `b802d2e6fd` | 0 / 6 | 399701 > 399698 | 325 > 325 | 284 > 284 | 7 > 6 | 6+0=6 | 5 | 1 | rows.rewrite, final.rewrite, rows.add, plan-stale.txt |
| 34b | `b5a4765829` 11-21 02:37 | `8965c32e03` | 0 / 11 | 402977 > 402970 | 326 > 326 | 285 > 285 | 12 > 11 | 9+1=10 | 9 | 1 | rows.rewrite, final.rewrite, rows.add, plan-stale.txt |
| 35 | `2af3ec103d` 11-23 16:09 | `9322330fa8` | 0 / 14 | 410045 > 410994 | 331 > 331 | 291 > 290 | 17 > 17 | 11+3=14 | 14 | 0 | cut-only.txt |
| 35b | `96cd5ade28` 11-23 21:55 | `ddfa65d880` | 0 / 5 | 420125 > 420987 | 336 > 336 | 295 > 295 | 8 > 6 | 6+1=7 | 5 | 2 | rows.rewrite, final.rewrite, rows.add, plan-stale.txt |

Totals of the table (my sums): over the sixteen runs `lengths.py` in `mech-2.md` named 155 entry changes already over 600 that grew (137 FACTS, 18 POSITIONS); `mech-final.md` names 140 of them; the judge held 15 (see part 2). FACTS went from 277494 characters (before climb batch 25's run, `9342ddbb2a`) to 420987 (after climb batch 35b's run, `96cd5ade28`) across the sixteen runs, in commits made on different days (11-03 to 11-23), so the span includes the days between runs.

Note on "added": git shows commit 1 adding FACTS entries only in climb batch 26 (F-322). The entries that judges call "new" in a run (for example F-381 to F-387 in climb batch 33's `diff.md`) were added by the landing or the batch before commit 1; the run rewrote them.

### Detail per run

**Climb batch 25** (commits `9342ddbb2a`, `784104683c`; folder `explorations/compile-ladder/climb-batch-25/record-landing/`)
- Files absent that the README lists as conditional: rows.rewrite, final.rewrite, rows.add, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 4: F-240 (+136), F-268 (+5), F-312 (+9), F-315 (+366).
- `lengths.py` in `mech-2.md` named 2: F-240 (+142), F-315 (+344).
- `lengths.py` in `mech-final.md` named 2: F-240 (+142), F-315 (+344).
- `diff.md` (Checks) on length: "lengths.py: pass; grew past 600: F-240 (+142), F-315 (+344), each by its owed clauses."
- `diff.md` Held section: "- None. Each failure of `check.md` (C5, C8, C17, C20, C27, C44 to C47) is settled in the fix round; I read the sentences and their sources. C17's F-312 block was withdrawn, so F-312 keeps its text."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 26** (commits `410c84ed94`, `d7a03f34f4`; folder `explorations/compile-ladder/climb-batch-26/record-landing/`)
- Files absent that the README lists as conditional: cut-only.txt, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 3: F-240 (+20), F-319 (+22), P-160 (+10).
- `lengths.py` in `mech-2.md` named 5: F-240 (+52), F-318 (+96), F-319 (+50), F-321 (+23), P-160 (+38).
- `lengths.py` in `mech-final.md` named 0: none.
- `diff.md` (Checks) on length: "lengths.py: pass, 0 already over 600 grew"
- `diff.md` Held section: "- C13, C14, F-240: past 600 and grew +52; the owed sentences and Detail pointer give about +20, the rest is the fix round's glosses of sentences no change owes ("The count stage's rise", "`FortressLibrary` 205 s"). Its two sentences made false stay ("From climb batch 22's gate to climb batch 24's ...", "That rise has no measured cause ..."). - C1, C21, F-318: grew +96 in a pass that owes no clause (glosses of "own generic" and P-146's rule); the gather's draft stays. - C2, C24, F-319: grew +50; C2's correction gives +22, "as the revival revised it" the rest. Its "both paths answer so", more than its ground, stays. - C4, C23, F-321: grew +23, by the title's gloss of "the interpreter's prelude"; its title "the one library cannot bind a helper of `systemOps`" stays. - C28, P-160: grew +38 and more than the fewest words: "and stays until the second" is added to the owed tense change. "The clause stays until the first step lands: without it, walk refuses ..." stays; round 1's text passed the check. - C32, the new row for `getProperty` at an empty name: in `rows.add`, which no step of this"
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 27** (commits `d131d92c5e`, `0549157f4b`; folder `explorations/compile-ladder/climb-batch-27/record-landing/`)
- Files absent that the README lists as conditional: rows.add, cut-only.txt, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 17: F-32 (+81), F-34 (+165), F-53 (+161), F-54 (+204), F-123 (+115), F-151 (+3), F-240 (+70), F-281 (+75), F-288 (+122), F-299 (+282), F-308 (+45), F-318 (+43), F-325 (+58), F-329 (+31), P-160 (+10), P-167 (+19), P-168 (+49).
- `lengths.py` in `mech-2.md` named 18: F-32 (+81), F-34 (+125), F-53 (+161), F-54 (+335), F-123 (+115), F-151 (+24), F-240 (+70), F-281 (+131), F-288 (+163), F-299 (+282), F-308 (+180), F-318 (+43), F-325 (+58), F-329 (+31), P-160 (+10), P-165 (+71), P-167 (+19), P-168 (+49).
- `lengths.py` in `mech-final.md` named 18: F-32 (+81), F-34 (+125), F-53 (+161), F-54 (+335), F-123 (+115), F-151 (+24), F-240 (+70), F-281 (+131), F-288 (+163), F-299 (+282), F-308 (+180), F-318 (+43), F-325 (+58), F-329 (+31), P-160 (+10), P-165 (+71), P-167 (+19), P-168 (+49).
- `diff.md` (Checks) on length: "lengths.py: pass; 18 entries past 600 grew, each by its owed clause."
- `diff.md` Held section: "- None."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 28** (commits `bec01c5788`, `72bad2e253`; folder `explorations/compile-ladder/climb-batch-28/record-landing/`)
- Files absent that the README lists as conditional: rows.add, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 17: F-32 (+119), F-34 (+123), F-44 (+53), F-63 (+1), F-76 (+21), F-132 (+33), F-140 (+89), F-172 (+206), F-255 (+69), F-290 (+206), F-307 (+28), F-312 (+2), F-328 (+53), F-330 (+19), F-334 (+109), P-40 (+41), P-167 (+29).
- `lengths.py` in `mech-2.md` named 18: F-32 (+119), F-34 (+123), F-44 (+53), F-63 (+1), F-76 (+21), F-132 (+40), F-140 (+89), F-172 (+206), F-255 (+69), F-290 (+348), F-307 (+28), F-312 (+2), F-328 (+53), F-330 (+19), F-333 (+34), F-334 (+237), P-40 (+41), P-167 (+29).
- `lengths.py` in `mech-final.md` named 16: F-32 (+119), F-34 (+123), F-44 (+53), F-63 (+1), F-76 (+21), F-132 (+40), F-140 (+89), F-172 (+206), F-255 (+69), F-290 (+348), F-307 (+28), F-312 (+2), F-328 (+53), F-330 (+19), P-40 (+41), P-167 (+29).
- `diff.md` (Checks) on length: "lengths.py: pass; 16 past 600 grew, each by its owed clause."
- `diff.md` Held section: "- C6, F-333, the pass: past 600, it grows 1445 to 1479 by the cold reader's clarifications, which a pass does not owe. - C7, F-334, the pass: past 600, it grows 938 to 1175; C7's cost clause explains about 155, a sentence on the replaced sort and "a hash order" the rest. The review, section 2, keeps the cost."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 29** (commits `2db5619187`, `5febd82a78`; folder `explorations/compile-ladder/climb-batch-29/record-landing/`)
- Files absent that the README lists as conditional: rows.add, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 9: F-122 (+111), F-128 (+65), F-169 (+7), F-285 (+45), F-305 (+1), F-306 (+1), F-312 (+1), P-165 (+21), P-171 (+2).
- `lengths.py` in `mech-2.md` named 10: F-79 (+21), F-122 (+34), F-128 (+65), F-169 (+24), F-285 (+45), F-305 (+1), F-306 (+1), F-312 (+1), P-165 (+21), P-171 (+2).
- `lengths.py` in `mech-final.md` named 8: F-122 (+34), F-128 (+65), F-285 (+45), F-305 (+1), F-306 (+1), F-312 (+1), P-165 (+21), P-171 (+2).
- `diff.md` (Checks) on length: "lengths.py: pass; 8 past 600 grew, each by its owed clause."
- `diff.md` Held section: "- C7, F-79, the pass: past 600, it grows 1247 to 1268 by the cold reader's four getter names, which a pass does not owe; its title, broader than its body, stands. - C39, F-169, made false: past 600, it grows 1238 to 1262; the owed sentence and callout explain about 7, "; F-79 names them" the rest; its `IntLiteral` sentence stands."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 29b** (commits `36e60805e6`, `5f35b1d058`; folder `explorations/compile-ladder/climb-batch-29b/record-landing/`)
- Files absent that the README lists as conditional: rows.add, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 9: F-57 (+5), F-118 (+133), F-128 (+33), F-129 (+162), F-262 (+53), F-324 (+7), F-347 (+79), P-174 (+58), P-176 (+78).
- `lengths.py` in `mech-2.md` named 11: F-57 (+5), F-118 (+157), F-128 (+33), F-129 (+187), F-262 (+53), F-324 (+7), F-342 (+4), F-345 (+41), F-347 (+79), P-174 (+99), P-176 (+78).
- `lengths.py` in `mech-final.md` named 11: F-57 (+5), F-118 (+157), F-128 (+33), F-129 (+187), F-262 (+53), F-324 (+7), F-342 (+4), F-345 (+41), F-347 (+79), P-174 (+99), P-176 (+78).
- `diff.md` (Checks) on length: "lengths.py: pass; 11 past 600 grew, each by its owed clause or split."
- `diff.md` Held section: "- None. The fix round settled check.md's 13 failures in 12 changes, each read against its source."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 30** (commits `f78da2650a`, `8e0100cf7a`; folder `explorations/compile-ladder/climb-batch-30/record-landing/`)
- Files absent that the README lists as conditional: rows.rewrite, final.rewrite, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 4: F-283 (+10), F-341 (+532), F-348 (+135), F-350 (+330).
- `lengths.py` in `mech-2.md` named 4: F-283 (+10), F-341 (+532), F-348 (+161), F-350 (+348).
- `lengths.py` in `mech-final.md` named 4: F-283 (+10), F-341 (+532), F-348 (+161), F-350 (+348).
- `diff.md` (Checks) on length: "lengths.py: pass; 4 past 600 grew, F-283, F-341, F-348, F-350, each by its owed clause."
- `diff.md` Held section: "- None."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 31** (commits `255179ba3a`, `9317123078`; folder `explorations/compile-ladder/climb-batch-31/record-landing/`)
- Files absent that the README lists as conditional: rows.add, cut-only.txt, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 11: F-34 (+153), F-174 (+30), F-240 (+163), F-252 (+164), F-257 (+128), F-352 (+89), F-361 (+59), F-372 (+77), F-374 (+87), F-375 (+160), F-376 (+133).
- `lengths.py` in `mech-2.md` named 14: F-34 (+159), F-75 (+78), F-174 (+30), F-240 (+205), F-252 (+164), F-257 (+128), F-352 (+89), F-361 (+69), F-372 (+335), F-373 (+7), F-374 (+150), F-375 (+302), F-376 (+133), F-377 (+142).
- `lengths.py` in `mech-final.md` named 14: F-34 (+159), F-75 (+78), F-174 (+30), F-240 (+205), F-252 (+164), F-257 (+128), F-352 (+89), F-361 (+69), F-372 (+335), F-373 (+7), F-374 (+150), F-375 (+302), F-376 (+133), F-377 (+142).
- `diff.md` (Checks) on length: "`lengths.py`: pass; the 14 entries above grew."
- `diff.md` Held section: "None. I read each fix that `check.md` asked for against its source, and each holds: F-75, F-225, F-372 (two), F-375 (two, `OverloadedFunction.java:518-524`), F-377 (row 1053; `evalArg`, `rung-comprises-cast/REPORT.md:30`), F-34, F-268 (`:6452-6456`), F-258, row 112, PLAN:10 (two), :53, :66, items 522 and 562. Each of the 14 entries past 600 that grew grows by its owed clauses, the rest moved out (`lengths.py`)."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 31b** (commits `b95570a644`, `c1e79529c6`; folder `explorations/compile-ladder/climb-batch-31b/record-landing/`)
- Files absent that the README lists as conditional: rows.rewrite, final.rewrite, rows.add, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 4: F-34 (+62), F-257 (+1), F-299 (+58), F-361 (+19).
- `lengths.py` in `mech-2.md` named 5: F-34 (+85), F-257 (+1), F-299 (+159), F-308 (+60), F-361 (+19).
- `lengths.py` in `mech-final.md` named 5: F-34 (+85), F-257 (+1), F-299 (+159), F-308 (+60), F-361 (+19).
- `diff.md` (Checks) on length: "`lengths.py`: pass; F-34, F-257, F-299, F-308, F-361 grew, as above."
- `diff.md` Held section: "None. Each fix that `check.md` asked for holds against its source: F-299, F-308, F-375, F-378, F-379 (row 697), PLAN:9, :10, :13, item 98, C117. F-34 (+85), F-257 (+1), F-308 (+60) and F-361 (+19) grow by their owed clause alone, F-299 (+159) by its owed clause and its count's source."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 32** (commits `9683fef678`, `35b4c2a027`; folder `explorations/compile-ladder/climb-batch-32/record-landing/`)
- Files absent that the README lists as conditional: rows.rewrite, final.rewrite, rows.add, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 12: F-58 (+23), F-221 (+1), F-240 (+115), F-280 (+145), F-334 (+2), F-362 (+52), F-364 (+79), F-365 (+150), F-367 (+83), F-368 (+99), F-369 (+110), P-173 (+27).
- `lengths.py` in `mech-2.md` named 13: F-58 (+37), F-221 (+1), F-240 (+130), F-280 (+145), F-334 (+2), F-341 (+10), F-362 (+102), F-364 (+125), F-365 (+158), F-367 (+89), F-368 (+99), F-369 (+110), P-173 (+27).
- `lengths.py` in `mech-final.md` named 13: F-58 (+37), F-221 (+1), F-240 (+130), F-280 (+145), F-334 (+2), F-341 (+10), F-362 (+102), F-364 (+125), F-365 (+158), F-367 (+89), F-368 (+99), F-369 (+110), P-173 (+27).
- `diff.md` (Checks) on length: "`lengths.py`: pass; the 13 entries above grew."
- `diff.md` Held section: "No change of `owed.md` is held. One repair, by the rule of a hold: the routing's fix round for C65 joined two pairs of PLAN lines that it did not mean to touch and dropped a blank line, which failed `plan-moves.py` in `mech-2.md`. I put those four lines and the blank line back from `c0c35b4f9` (the lines on row 559 and rung Q's `unsigned` in climb batch 8's list, on E.worker.2 and R.skeptic.1 in climb batch 22's, and the blank line before climb batch 14's). No word of them differs from the base."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 33** (commits `fdd4a2cdd1`, `9f2799fb19`; folder `explorations/compile-ladder/climb-batch-33/record-landing/`)
- Files absent that the README lists as conditional: rows.add, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 11: F-34 (+282), F-225 (+9), F-352 (+24), F-353 (+37), F-361 (+13), F-363 (+7), F-369 (+6), F-380 (+16), F-385 (+410), F-386 (+268), P-12 (+60).
- `lengths.py` in `mech-2.md` named 12: F-34 (+297), F-225 (+9), F-302 (+6), F-352 (+24), F-353 (+14), F-361 (+13), F-363 (+7), F-369 (+6), F-380 (+27), F-385 (+410), F-386 (+268), P-12 (+60).
- `lengths.py` in `mech-final.md` named 12: F-34 (+297), F-225 (+9), F-302 (+6), F-352 (+24), F-353 (+14), F-361 (+13), F-363 (+7), F-369 (+6), F-380 (+27), F-385 (+410), F-386 (+268), P-12 (+60).
- `diff.md` (Checks) on length: "lengths.py: pass; 12 grew, each by its owed clause."
- `diff.md` Held section: "- None."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 33b** (commits `8626629ea9`, `ff42b70e15`; folder `explorations/compile-ladder/climb-batch-33b/record-landing/`)
- Files absent that the README lists as conditional: cut-only.txt, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 4: F-136 (+46), F-352 (+32), F-353 (+61), F-390 (+32).
- `lengths.py` in `mech-2.md` named 6: F-136 (+68), F-352 (+129), F-353 (+133), F-388 (+60), F-390 (+190), F-391 (+10).
- `lengths.py` in `mech-final.md` named 4: F-136 (+68), F-352 (+129), F-353 (+133), F-390 (+190).
- `diff.md` (Checks) on length: "lengths.py: pass; F-136, F-352, F-353 and F-390 grew, each by the clause that its change owes."
- `diff.md` Held section: "- C19, C23, F-388: the form pass grows it past 600, 1334 to 1394, by the Detail's second section (needed since the receiver's cast moved out) and two examples; no clause that it owes explains the growth. It keeps its text. - C22, C26, F-391: the form pass grows it past 600, 1248 to 1258, by the condition "at such a call" that splitting its sentence needed; no clause that it owes explains the growth. It keeps its text."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 34** (commits `5a70c03deb`, `b802d2e6fd`; folder `explorations/compile-ladder/climb-batch-34/record-landing/`)
- Files absent that the README lists as conditional: rows.rewrite, final.rewrite, rows.add, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 3: F-225 (+111), F-393 (+5), F-394 (+87).
- `lengths.py` in `mech-2.md` named 6: F-225 (+242), F-325 (+53), F-392 (+10), F-393 (+117), F-394 (+121), F-395 (+3).
- `lengths.py` in `mech-final.md` named 5: F-225 (+242), F-325 (+53), F-392 (+10), F-393 (+117), F-394 (+121).
- `diff.md` (Checks) on length: "lengths.py: pass; F-225, F-325, F-392, F-393 and F-394 grew, each within the clause that its change owes."
- `diff.md` Held section: "- C21, C22, F-395: its pass grows it past 600, 1249 to 1252, by the title's rewording and a split sentence; its owed change, the Detail path without `explorations/`, shortens it, so no clause that it owes explains the growth. It keeps the landed text, which is true."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 34b** (commits `b5a4765829`, `8965c32e03`; folder `explorations/compile-ladder/climb-batch-34b/record-landing/`)
- Files absent that the README lists as conditional: rows.rewrite, final.rewrite, rows.add, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 9: F-24 (+65), F-312 (+73), F-332 (+12), F-336 (+21), F-353 (+79), F-381 (+115), F-388 (+98), F-396 (+232), P-164 (+91).
- `lengths.py` in `mech-2.md` named 10: F-24 (+86), F-301 (+56), F-312 (+73), F-332 (+12), F-336 (+47), F-353 (+82), F-381 (+115), F-388 (+98), F-396 (+307), P-164 (+80).
- `lengths.py` in `mech-final.md` named 9: F-24 (+86), F-301 (+56), F-312 (+73), F-332 (+12), F-336 (+47), F-353 (+82), F-381 (+115), F-388 (+98), F-396 (+307).
- `diff.md` (Checks) on length: "lengths.py: pass; nine over 600 grew, each by its owed clause, F-353 with the cold reader's 3 characters; F-34 and F-390 shrank."
- `diff.md` Held section: "- C21, P-164: its text changes what his decision requires and where its compiled half applies. "`fileOps`' raise strings name the one library's types" becomes "`fileOps`' raises build the one library's exceptions (F-336)", the effect in place of the strings, whose way, the simple name mapped by each set, is fork C3's default for his review (item 617); "At the switch-over" becomes "Under the selection of the one library, and so at the switch-over". The writer itself asks him whether the effect states his requirement. P-164 keeps its text; `PLAN.md:64` (C35) states the tree and cites P-164."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 35** (commits `2af3ec103d`, `9322330fa8`; folder `explorations/compile-ladder/climb-batch-35/record-landing/`)
- Files absent that the README lists as conditional: cut-only.txt.
- `lengths.py` in `mech-1.md` named 14: F-323 (+70), F-324 (+89), F-342 (+64), F-345 (+68), F-351 (+6), F-396 (+217), F-397 (+130), F-398 (+222), F-399 (+30), F-400 (+1), F-401 (+23), P-40 (+70), P-173 (+55), P-174 (+274).
- `lengths.py` in `mech-2.md` named 14: F-323 (+66), F-324 (+85), F-342 (+60), F-345 (+66), F-351 (+6), F-396 (+217), F-397 (+174), F-398 (+254), F-399 (+34), F-400 (+16), F-401 (+23), P-40 (+70), P-173 (+55), P-174 (+270).
- `lengths.py` in `mech-final.md` named 14: F-323 (+66), F-324 (+85), F-342 (+60), F-345 (+66), F-351 (+6), F-396 (+217), F-397 (+174), F-398 (+254), F-399 (+34), F-400 (+16), F-401 (+23), P-40 (+70), P-173 (+55), P-174 (+270).
- `diff.md` (Checks) on length: "lengths.py: pass; 14 over 600 grew, each by its owed clause; F-88 fell to 594."
- `diff.md` Held section: "- None."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

**Climb batch 35b** (commits `96cd5ade28`, `ddfa65d880`; folder `explorations/compile-ladder/climb-batch-35b/record-landing/`)
- Files absent that the README lists as conditional: rows.rewrite, final.rewrite, rows.add, plan-stale.txt.
- `lengths.py` in `mech-1.md` named 6: F-26 (+88), F-253 (+200), F-403 (+362), F-405 (+176), F-406 (+99), P-174 (+74).
- `lengths.py` in `mech-2.md` named 7: F-26 (+88), F-253 (+200), F-403 (+489), F-404 (+50), F-405 (+325), F-406 (+186), P-174 (+74).
- `lengths.py` in `mech-final.md` named 5: F-26 (+88), F-253 (+200), F-403 (+489), F-406 (+186), P-174 (+74).
- `diff.md` (Checks) on length: "lengths.py: pass; 5 over 600 grew, each by its owed clause: F-26 +88, F-253 +200, F-403 +489, F-406 +186, P-174 +74; F-375 -101."
- `diff.md` Held section: "- C8, F-404: its owed change is a cut (-115, the clause that the skill's `ant compileAll` sentence does not hold), but the fix round's glosses (`build-one` defined, "that first target", "It is a defect of the tool, so no ledger row holds it.") grow it 1,284 to 1,334, past 600, and no clause that it owes explains growth. It keeps the landed text, true while `references/worktrees.md:45` stands. - C9, F-405: 1,613 to 1,938, +325, against its owed clause's 276 (the first met kept, a call quietly running the less specific one, `Nested.tk(n)` answering 2); the fix round's row 1057, "one signature" and row 1126 glosses make the rest, after the paths moved out. It keeps "one is dropped (row 1125)", the words of row 1125's own claim; F-253 (C11) and F-26 (C12) say that the first met is kept."
- Last line of `diff.md`: the orientation update's call (`Workflow({ scriptPath: ...orientation.js ... })`); it says nothing about length.

## 2. The judge's rulings together

Counts (my sums from the `mech-2.md` and `mech-final.md` of each folder; part 1's table):

- Entry changes that `lengths.py` showed the judge as "already over 600, and grew" (`mech-2.md`): **155** (137 FACTS, 18 POSITIONS), over 16 runs. Per run: 25: 2; 26: 5; 27: 18; 28: 18; 29: 10; 29b: 11; 30: 4; 31: 14; 31b: 5; 32: 13; 33: 12; 33b: 6; 34: 6; 34b: 10; 35: 14; 35b: 7.
- Applied (still named in `mech-final.md`): **140**. Held (named in `mech-2.md`, absent from `mech-final.md`, text kept as at AT): **15**, in seven runs: 26 (5), 28 (2), 29 (2), 33b (2), 34 (1), 34b (1), 35b (2). Nine runs held none of them: 25, 27, 29b, 30, 31, 31b, 32, 33, 35. No run's `mech-final.md` named an entry that `mech-2.md` did not.
- Of the 15 held, 14 were held under the length rule in the judge's words. One, P-164 in climb batch 34b, appears in `lengths.py` (+80) and was held for another reason: the judge's words are "its text changes what his decision requires and where its compiled half applies" (`climb-batch-34b/record-landing/diff.md`, Held).
- A grown entry that was 600 or under at AT is not named by `lengths.py`'s last line (code: the mark `grew past 600` needs the length at AT over 600). In `mech-final.md` of the sixteen runs this case is one entry that crossed 600 (P-38 in climb batch 25, 562 to 702) and one new entry over 600 (F-322 in climb batch 26, `none to` over 600).
- The size of `lengths.py` growth that the judge applied, by run, is in part 1's detail lines (figures from `mech-final.md`). The largest single applied growths are in part 3.
- The journals of the workflow runs (`/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_*/journal.jsonl`) hold the judge's final message for the runs of climb batches 28, 29, 30, 31, 31b, 32, 33, 33b, 34, 35 and 35b (matched by the `git diff --stat AT: pass` line to each folder's `run.env`). They are the source of the quotes marked (journal). The runs of 25, 26 and 27 have no journal in this session's folder.

### The reasons for applying, grouped by their words

Group A: the growth is called "owed clause" and nothing more. Runs: 25, 27, 28, 29, 30, 33, 35, 35b (and 29b and 34b with an addition, group D).
- 25 (`diff.md`): "lengths.py: pass; grew past 600: F-240 (+142), F-315 (+344), each by its owed clauses."
- 27 (`diff.md`): "lengths.py: pass; 18 entries past 600 grew, each by its owed clause."
- 30 (`diff.md`): "lengths.py: pass; 4 past 600 grew, F-283, F-341, F-348, F-350, each by its owed clause."
(Also 28: "lengths.py: pass; 16 past 600 grew, each by its owed clause."; 29: "lengths.py: pass; 8 past 600 grew, each by its owed clause."; 33: "lengths.py: pass; 12 grew, each by its owed clause."; 35: "lengths.py: pass; 14 over 600 grew, each by its owed clause; F-88 fell to 594.")

Group B: the growth is the clause that the change owes, and the judge says that detail was moved out or the fix was read against its source. Runs: 31, 31b, 32, 33b, 34.
- 31 (`diff.md`, Held): "Each of the 14 entries past 600 that grew grows by its owed clauses, the rest moved out (`lengths.py`)."
- 31 (journal): "there are 14. In each, the growth comes from clauses that its change owes, and detail was moved out first."
- 34 (journal): "F-225, F-325, F-392, F-393 and F-394 also grew past 600, but in each case the clause that its change owes is enough to cover the growth, so they were applied."
(Also 33b `diff.md`: "lengths.py: pass; F-136, F-352, F-353 and F-390 grew, each by the clause that its change owes."; 34 `diff.md`: "lengths.py: pass; F-225, F-325, F-392, F-393 and F-394 grew, each within the clause that its change owes.")

Group C: the judge sets the growth against the size of the owed clause in numbers.
- 33b (journal): "F-136, F-352, F-353 and F-390 also grew past 600. In each, the clauses the change owes are longer than the growth (211 vs 68, 289 vs 129, 258 vs 133, 249 vs 190)."
- 35 (`diff.md`, C17): "F-397, the pass: R.worker.1's default, a folded constant's digits, as a worker's choice; \"It builds P-174's digit count.\"; +174, under the owed clause's 179."
- 35b (`diff.md`, C7): "+489, under the owed clauses' 539."
(Also 34b `diff.md`, C15 and C16, F-396: "+307, under the owed list and title."; 34b C10, F-353: "+82, 79 the owed clause.")

Group D: the judge applies a growth that it names as more than the owed clause, with a further ground.
- 31b (`diff.md`, Held): "F-34 (+85), F-257 (+1), F-308 (+60) and F-361 (+19) grow by their owed clause alone, F-299 (+159) by its owed clause and its count's source."
- 32 (`diff.md`, Checks): "Entries past 600 characters that grew: F-58, F-221, F-240, F-280, F-334, F-341, F-362, F-364, F-365, F-367, F-368, F-369, P-173. I applied each: the growth is the clause that its change owes or, in the batch's own drafts, a clause that settles a reading of the cold reader. F-362's sentence on the regenerated parsers (+44) is the least owed."
- 29b (`diff.md`): "lengths.py: pass; 11 past 600 grew, each by its owed clause or split." And 34b (`diff.md`): "lengths.py: pass; nine over 600 grew, each by its owed clause, F-353 with the cold reader's 3 characters; F-34 and F-390 shrank."

In group B's two 31 quotes the judge names "moved out" (the detail that the writers moved out first); no other judge line in the sixteen `diff.md` or the eleven journals' final messages says what was moved out for an applied growth (`grep -n -i "moved out"` over the `diff.md` files finds C-lines about content moved in other entries, such as 31's C2 "`T ∪ C` moved out"). The entries writers' round-1 results (journal event 5 of each run) do say what moved out, in the writers' words; for example the climb batch 33b journal: "Detail moved out first; it grew by 32, the clause that C..." (cut by me at 100 characters).

### The held changes, in the judge's words, and what happened afterwards

How "afterwards" was found: for each held entry, I took the whole new line from the run's `record.apply` and compared it, character for character, with the entry's line in `FACTS.md` or `POSITIONS.md` at each later commit that touched the file (`git log --reverse COMMIT1..HEAD -- FILE`, `scratchpad/gia/held.py`). HEAD was the working tree's HEAD when I ran it; the present state at `9de4c69bc8` was not compared separately, so a change after `9de4c69bc8` is not seen. **No later commit gave an entry line equal to the held line, for any of the 15.** "At run" is the entry's length in the run's own commit 1, which is the entry's text as at AT.

- **26, F-240** (held +52, 1975 as landed; proposed 2027). Judge (`diff.md`, Held): "C13, C14, F-240: past 600 and grew +52; the owed sentences and Detail pointer give about +20, the rest is the fix round's glosses of sentences no change owes (\"The count stage's rise\", \"`FortressLibrary` 205 s\")."
- **26, F-318** (held +96, 2033). "C1, C21, F-318: grew +96 in a pass that owes no clause (glosses of \"own generic\" and P-146's rule); the gather's draft stays."
- **26, F-319** (held +50, 1073). "C2, C24, F-319: grew +50; C2's correction gives +22, \"as the revival revised it\" the rest."
- **26, F-321** (held +23, 1280). "C4, C23, F-321: grew +23, by the title's gloss of \"the interpreter's prelude\"."
- **26, P-160** (held +38, 1274). "C28, P-160: grew +38 and more than the fewest words: \"and stays until the second\" is added to the owed tense change."
  - Afterwards for the five: `7ecb207b04` (2026-11-06 00:48, trailer "Co-Authored-By: Claude Opus 5.5"), subject "Climb batch 26's held record changes: F-240, F-319, F-321, P-160 and P-159 made true, row 896 for getProperty at an empty name". After it: F-240 1962 (from 1975), F-319 1133 (from 1073), F-321 1299 (from 1280), P-160 1284 (from 1274). It was made 34 minutes after commit 1 `410c84ed94` (00:14). F-318 changed at `d131d92c5e` (climb batch 27's run, 2033 to 2076) and `1e9b2cf9c4` (2086). None of the five lines equals the held block. The judge's own list also held C32, a new row for `getProperty`, which "no step of this run applies" (not a length hold); `7ecb207b04` names "row 896 for getProperty at an empty name".
- **28, F-333** (held 1445 to 1479). "C6, F-333, the pass: past 600, it grows 1445 to 1479 by the cold reader's clarifications, which a pass does not owe." Afterwards: first changed at `c00e592a59` (2026-11-23 17:37, "Record: the queue triage's missing homes filed, F-402 and six FACTS clauses, rows 1113 to 1116"), 1445 to 1759; not equal to the held line.
- **28, F-334** (held 938 to 1175). "C7, F-334, the pass: past 600, it grows 938 to 1175; C7's cost clause explains about 155, a sentence on the replaced sort and \"a hash order\" the rest." Afterwards: lines of 938 to 940 characters at `2db5619187`, `36e60805e6`, `9683fef678` and `8dff5e053f` ("Fold the review's corrections", 2026-11-24 06:28); not equal to the held line.
- **29, F-79** (held 1247 to 1268). "C7, F-79, the pass: past 600, it grows 1247 to 1268 by the cold reader's four getter names, which a pass does not owe; its title, broader than its body, stands." Afterwards: `cac54a1bf1` (11-09 17:43, 1340), `a26e74f5c8` (11-09 23:31, 1392), `9683fef678`, `caa5363d72` (11-17 10:06, "Fold the review's corrections", 1360).
- **29, F-169** (held 1238 to 1262). "C39, F-169, made false: past 600, it grows 1238 to 1262; the owed sentence and callout explain about 7, \"; F-79 names them\" the rest; its `IntLiteral` sentence stands." (journal: "So its false `IntLiteral` sentence stays in FACTS until the next landing's pass.") Afterwards: `cac54a1bf1` (1249), `fcfd0aeb31` (11-09 23:37, "Specify the static numerals ...", 1191).
- **33b, F-388** (held 1334 to 1394). "C19, C23, F-388: the form pass grows it past 600, 1334 to 1394, by the Detail's second section (needed since the receiver's cast moved out) and two examples; no clause that it owes explains the growth. It keeps its text." Afterwards: `f6469d96ec` (11-21 00:10, "Compile the one library to jars over a second set of run-time classes ...", 1467) and `b5a4765829` (climb batch 34b's run, 11-21 02:37, 1565).
- **33b, F-391** (held 1248 to 1258). "C22, C26, F-391: the form pass grows it past 600, 1248 to 1258, by the condition \"at such a call\" that splitting its sentence needed; no clause that it owes explains the growth. It keeps its text." Afterwards: no later commit changed the line (to HEAD).
- **34, F-395** (held 1249 to 1252). "C21, C22, F-395: its pass grows it past 600, 1249 to 1252, by the title's rewording and a split sentence; its owed change, the Detail path without `explorations/`, shortens it, so no clause that it owes explains the growth. It keeps the landed text, which is true." Afterwards: no later commit changed the line.
- **34b, P-164** (held 2190 to 2270; not a length hold). "C21, P-164: its text changes what his decision requires and where its compiled half applies. ... The writer itself asks him whether the effect states his requirement. P-164 keeps its text; `PLAN.md:64` (C35) states the tree and cites P-164." Afterwards: no later commit changed the line.
- **35b, F-404** (held 1284 to 1334). "C8, F-404: its owed change is a cut (-115, the clause that the skill's `ant compileAll` sentence does not hold), but the fix round's glosses (`build-one` defined, \"that first target\", \"It is a defect of the tool, so no ledger row holds it.\") grow it 1,284 to 1,334, past 600, and no clause that it owes explains growth. It keeps the landed text, true while `references/worktrees.md:45` stands." Afterwards: `ef81c4e6cb` (2026-11-24 01:50, "The record brought in line with P-103's gate change and the seeding fix: F-404, F-108, F-109, F-203, row 363, ..."; "F-404 rewritten to seed-worktree.sh copying build-one and caches-one (88f286dc30)"), 1334 to 1176.
- **35b, F-405** (held 1613 to 1938). "C9, F-405: 1,613 to 1,938, +325, against its owed clause's 276 (the first met kept, a call quietly running the less specific one, `Nested.tk(n)` answering 2); the fix round's row 1057, \"one signature\" and row 1126 glosses make the rest, after the paths moved out." Afterwards: `df5948e7b8` (2026-11-24 05:39, "Walk keys generic dotted methods by their bounds, ..."), 1613 to 2307.

## 3. Ten examples of growth that a run applied

Selection: the ten largest growths of one FACTS entry in one record-landing run, by `len(line)` after commit 1 minus before it, over all 16 runs and all entries (my measure over `git show COMMIT1^:FACTS.md` and `COMMIT1:FACTS.md`, `scratchpad/gia/m.py`, "TOP"). Each is also named by `lengths.py` in that run's `mech-final.md` and applied by the judge. The next growths below the ten are F-34 in climb batch 33 (+297), F-299 in 27 (+282), F-386 in 33 (+268). Sizes are characters of the whole line. "Added" and "removed" are a word-level diff of the two lines (`difflib`, my script); a word-level diff can show a rewritten phrase as removed plus added.

The brief passage that bears on every example is the one quoted in part 0, line 38 of `brief-entries.md` in each folder: "An entry already past 600 characters grows only by the clause that its change owes. Before you add the clause, move other detail out: ..." Each example says what its run's files call the added text and which change owed it.

### F-341, climb batch 30, commit `f78da2650a` (rung N / numerals)
- Length before and after: 1656 to 2188 characters (+532).

Before (`git show f78da2650a^:explorations/coordinator/FACTS.md`):
~~~~
- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, run with the four numbers bound as values of type `ZZ`, one result per site and type; a folded constant at a library number type converts from its exact value, outside the coercion; a numeral out of the type's range, at a type with no coercion from it, or outside its coercion's `where` clause is refused there when it runs; a store keeps its default alone. Dispatch fits it as it is at its default, then by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10 and `y: RR64 = 0.5` is `SEQV` a computed 0.5, but `h = 0.5` is `false` for `h: QQ = 1/2`, the library's `=` over `Any` fitting the numeral at its default `RR64` (row 973; observed once at `17e93a7da8`, no test pins it). Tests: `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".
~~~~

After (`git show f78da2650a:explorations/coordinator/FACTS.md`):
~~~~
- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, run with the four numbers bound as values of type `ZZ`, one result per site and type; a folded constant at a library number type converts from its exact value, outside the coercion; a numeral out of the type's range, one that rounds to an infinity at `RR32` or `RR64`, one at a type with no coercion from it, or one outside its coercion's `where` clause is refused there when it runs; a store keeps its default alone. Dispatch fits it as it is at its default, then by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10 and `y: RR64 = 0.5` is `SEQV` a computed 0.5, but `h = 0.5` is `false` for `h: QQ = 1/2`, the library's `=` over `Any` fitting the numeral at its default `RR64` (row 973; observed once at `17e93a7da8`, no test pins it). At load walk refuses a numeral type written as a type that a trait or an object extends, or as a static argument; one in a `comprises` clause loads (row 981). Tests: `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`, `NumeralRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityAtParameterWalk.fss`, `NumeralFoldedRoundsToInfinityWalk.fss`, `NumeralTypeExtendedWalk.fss`, `NumeralTypeStaticArgumentWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".
~~~~

Text added (word diff; runs separated by `+`):
~~~~
one that rounds to an infinity at `RR32` or `RR64`, one
+ one
+ At load walk refuses a numeral type written as a type that a trait or an object extends, or as a static argument; one in a `comprises` clause loads (row 981).
+ `NumeralFoldedConstantLibraryWalk.fss`, `NumeralRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityAtParameterWalk.fss`, `NumeralFoldedRoundsToInfinityWalk.fss`, `NumeralTypeExtendedWalk.fss`, `NumeralTypeStaticArgumentWalk.fss`.
+ why"; `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and
~~~~
Text removed (word diff):
~~~~
`NumeralFoldedConstantLibraryWalk.fss`.
~~~~
What the run's files call it, and the passage that asked for it:
- owed.md, C11 (line 26): "home: F-341 | kind: stale | weight: low | ground: its \"a numeral out of the type's range ... is refused there when it runs\" does not say that rounding to an infinity counts, and its Tests lack `tests/NumeralRoundsToInfinityWalk`, `NumeralPointRoundsToInfinityWalk`, `NumeralPointRoundsToInfinityAtParameterWalk` and `NumeralFoldedRoundsToInfinityWalk`; no entry holds walk's load check of a written numeral type, an extended type or a static argument refused with the checker's message (...), which this entry on walk's numeral can carry in one clause".
- entries-report.md (line 205): "F-341 holds walk's load check, as C11 says it can. The alternative is a new entry for the load check, which keeps F-341 532 characters shorter."
- diff.md (C11): "C11, F-341, stale, +532: the infinity clause; walk's load check of a numeral type extended or as a static argument (row 981); six tests. Ground: rung N's report, section 1." and Checks: "lengths.py: pass; 4 past 600 grew, F-283, F-341, F-348, F-350, each by its owed clause." diff.md also lists, under "To confirm": "F-341 holding the load check, against a new entry."
- Brief passage: `brief-entries.md` line 38 of the folder (quoted in part 0): the growth is allowed by "the clause that its change owes"; the judge brief (`judge.md`): "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth".

### F-403, climb batch 35b, commit `96cd5ade28` (climb batch 35b, `≡` and `≢`)
- Length before and after: 1454 to 1943 characters (+489).

Before (`git show 96cd5ade28^:explorations/coordinator/FACTS.md`):
~~~~
- F-403 **The one library declares `EQV` (`≡`) and `NEQV` (`≢`) over two booleans, as top-level operators beside `<->`; walk and the compiled path under the one library run them, and on a program's own objects each is a type error.** `EQV`'s body is `if a then b else NOT b end`, which calls no `=` (row 994 is `=` of two booleans, compiled), and `NEQV`'s is `NOT (a EQV b)`, the specification's definition of `≢` (`Specification/basic-lib/Fortress.NegatedOperators.tex:34-35`; `Library/FortressLibrary.fsi:2793-2794`, `Library/FortressLibrary.fss:4923-4924`). The specification and the compiler's prelude write both as methods of `Boolean`; the one library keeps its own form for the boolean operators (fork E1 of climb batch 35, within P-37). Under walk `a ≡ b` for two objects of a program's type stops at the call, 'Unification error: Closure/Constructor for EQV param 1 (a:Boolean) got arg Pt of type Pt', and compiled it is refused, 'Could not check call to operator EQV'. Under walk an equivalence operator that nothing declares, as `APPROX`, still loads and stops at its call with an internal error (row 1118); the one library declares none of `Boolean`'s `⊕`, `⊼` and `⊽`, and no library `majority` (row 1121). Tests: `tests/BooleanEquivalenceWalk.fss`, `one_library_tests/OneLibraryBooleanEquivalence.test`. Detail: `compile-ladder/rung-boolean-equivalence/REPORT.md`, "What changed and why" and "Row 184's own program, and the other programs".
~~~~

After (`git show 96cd5ade28:explorations/coordinator/FACTS.md`):
~~~~
- F-403 **The one library declares `EQV` (`≡`) and `NEQV` (`≢`) over two booleans, as top-level operators beside `<->`; walk and the compiled path under the one library run them, and on a program's own objects each is a type error.** `EQV`'s body is `if a then b else NOT b end`, which calls no `=` (compiled under the one library, `=` of two booleans dies at its first call, row 994), and `NEQV`'s is `NOT (a EQV b)`, the specification's definition of `≢` (`Specification/basic-lib/Fortress.NegatedOperators.tex`). The specification and the compiler's prelude write both as methods of `Boolean`; the one library keeps its own form, top-level operators, for the boolean operators, within P-37; that form is a default of the batch's plan, which the curator has not decided. Under walk `a ≡ b` for two objects of a program's type stops at the call, 'Unification error: Closure/Constructor for EQV param 1 (a:Boolean) got arg Pt of type Pt', and compiled it is refused, 'Could not check call to operator EQV'. Under walk, a program that imports the APL experiments' `AplCore` gets its infix `≡` and prefix `≢` over `RR64` and arrays in one overload set with the library's two: its own calls give the values that they gave without the library's two, and `t ≡ f` and `t ≢ f` of two booleans print `false` and `true`. No gated program and no line of microGPT imports `AplCore`. That one overload set is also a default of the batch's plan, which the curator has not decided. Under walk an equivalence operator that nothing declares, as `APPROX`, still loads and stops at its call with an internal error (row 1118); the one library declares none of `Boolean`'s `⊕`, `⊼` and `⊽`, and no library `majority` (row 1121). Tests: `tests/BooleanEquivalenceWalk.fss`, `one_library_tests/OneLibraryBooleanEquivalence.test`. Detail: `compile-ladder/rung-boolean-equivalence/REPORT.md`, "What changed and why" and "Row 184's own program, and the other programs".
~~~~

Text added (word diff; runs separated by `+`):
~~~~
(compiled under the one library,
+ booleans dies at its first call, row 994),
+ (`Specification/basic-lib/Fortress.NegatedOperators.tex`).
+ form, top-level operators,
+ operators, within P-37; that form is a default
+ the batch's plan, which the curator has not decided.
+ Under walk, a program that imports the APL experiments' `AplCore` gets its infix `≡` and prefix `≢` over `RR64` and arrays in one overload set with the library's two: its own calls give the values that they gave without the library's two, and `t ≡ f` and `t ≢ f` of two booleans print `false` and `true`. No gated program and no line of microGPT imports `AplCore`. That one overload set is also a default of the batch's plan, which the curator has not decided.
~~~~
Text removed (word diff):
~~~~
(row 994 is
- booleans, compiled),
- (`Specification/basic-lib/Fortress.NegatedOperators.tex:34-35`; `Library/FortressLibrary.fsi:2793-2794`, `Library/FortressLibrary.fss:4923-4924`).
- form
- operators (fork E1
- climb batch 35, within P-37).
~~~~
What the run's files call it, and the passage that asked for it:
- owed.md, C7 (line 19): "kind: the pass ... ground: entries.md, F-403, added by the gather 20:03Z [S14], 1,454 characters, past 600 (the writer names the question that keeps each sentence). (1) ... can read as a decision of his ... (2) E.reserved.1's default stands in no entry or row ... By the queue's head (his choice of 11:2x UTC on 2026-11-23) a default that is not consequential is recorded in FACTS, so the pass adds that one clause".
- entries-report.md (line 106): "Sizes after the fix, near: F-403 about 1,870; F-404 about 1,310; F-405 about 1,920; F-406 about 1,760. Each grew only by the gloss or the condition that the cold reader lacked."
- diff.md (C7): "the one library's top-level form is \"a default of the batch's plan, which the curator has not decided\" (fork E1); E.reserved.1's default added, under walk: ... line numbers left to the report; +489, under the owed clauses' 539." Checks: "lengths.py: pass; 5 over 600 grew, each by its owed clause: F-26 +88, F-253 +200, F-403 +489, F-406 +186, P-174 +74; F-375 -101."
- Brief passage: `brief-entries.md` line 38 of the folder (quoted in part 0): the growth is allowed by "the clause that its change owes"; the judge brief (`judge.md`): "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth".

### F-385, climb batch 33, commit `fdd4a2cdd1` (climb batch 33, the interface read)
- Length before and after: 868 to 1278 characters (+410).

Before (`git show fdd4a2cdd1^:explorations/coordinator/FACTS.md`):
~~~~
- F-385 **The class loader chooses a compiled call's opcode from the owner's class file, without loading the owner.** Where an instantiated template calls a method by `invokeinterface` on a type that becomes a plain class name, `MethodInstantiater.visitMethodInsn` reads `ACC_INTERFACE` from the class file that the loader would define for that name, and uses `invokevirtual` for a class; it loads the class only where it finds no class file. So an object that lists a self-typed trait first, whose JVM superclass is that trait's default methods at the object, runs a default body that calls a method on a value of the self-type parameter (row 1052, fixed). Source: `runtimeSystem/MethodInstantiater.java:268-272`, `:304`. Test: `compiler_tests/SelfTypeParameterReceiverRun`. Detail: `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why", item 3.
~~~~

After (`git show fdd4a2cdd1:explorations/coordinator/FACTS.md`):
~~~~
- F-385 **The class loader chooses a compiled call's opcode from the owner's class file, without loading the owner.** Where an instantiated template calls a method by `invokeinterface` on a type that becomes a plain class name, `MethodInstantiater.visitMethodInsn` reads `ACC_INTERFACE` from the class file that the loader would define for that name, and uses `invokevirtual` for a class (`runtimeSystem/MethodInstantiater.java`). So an object that lists a self-typed trait first, whose JVM superclass is that trait's default methods at the object, runs a default body that calls a method on a value of the self-type parameter (row 1052, fixed). Two limits, by reading, neither measured nor held by a test. The read keeps no cache, unlike the loader's lookup of generic expansions beside it, so each such call site of each expansion reads a class file. A class that the loader generates, such as a generic object's, has no class file, so the loader loads it as before, and a generic object that lists a self-typed trait first may still fail as row 1052 did. Test: `compiler_tests/SelfTypeParameterReceiverRun`. Detail: `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why", item 3; `reviews/batch-33-review.md`, "2. The decisions that landed at a default".
~~~~

Text added (word diff; runs separated by `+`):
~~~~
(`runtimeSystem/MethodInstantiater.java`).
+ Two limits, by reading, neither measured nor held by a test. The read keeps no cache, unlike the loader's lookup of generic expansions beside it, so each such call site of each expansion reads a class file. A class that the loader generates, such as a generic object's, has no class file, so the loader loads it as before, and a generic object that lists a self-typed trait first may still fail as row 1052 did.
+ 3; `reviews/batch-33-review.md`, "2. The decisions that landed at a default".
~~~~
Text removed (word diff):
~~~~
class; it loads the
- only where it finds no class file.
- Source: `runtimeSystem/MethodInstantiater.java:268-272`, `:304`.
- 3.
~~~~
What the run's files call it, and the passage that asked for it:
- owed.md, C56 (line 67): "home: F-385 | kind: stale | weight: high | ground: the review, Part 1, \"Corrections owed\" (F-385 \"lacks that the read keeps no cache, and that a generic object's class, which the loader generates, has no class file, so row 1052's circle may stand there\") and section 2, Q2". C49 (line 60): "home: F-385 | kind: past 600 characters | weight: low | ground: entries.md F-385, 868, new; C56 adds to it, so its detail goes to a report section first".
- entries-report.md (line 121): "**C40, C49 and C56, F-385 (868 to 1278).** - Moved out first (question 4): `MethodInstantiater.java:268-272`, `:304`, and the clause \"it loads the class only where it finds no class file\", which the new sentence on generated classes says. - Added: \"Two limits, by reading, neither measured nor held by a test. ...\" - Meaning: extended, from the review's section 2, Q2 ... - Past 600: question 1."
- journal (judge, climb batch 33): "12 did, and the clause that each change owes explains each growth. They are F-34 (+297), F-385 (+410), F-386 (+268), P-12 (+60) and eight small ones." diff.md Checks: "lengths.py: pass; 12 grew, each by its owed clause."
- Brief passage: `brief-entries.md` line 38 of the folder (quoted in part 0): the growth is allowed by "the clause that its change owes"; the judge brief (`judge.md`): "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth".

### F-350, climb batch 30, commit `f78da2650a` (climb batch 30, the grain of a split)
- Length before and after: 1196 to 1544 characters (+348).

Before (`git show f78da2650a^:explorations/coordinator/FACTS.md`):
~~~~
- F-350 **On the compiled path the arms of a parallel `do`, the elements of a tuple, the operands of an operator and the arguments of a call fork through one method, `CodeGen.genParallelExprs`, which joins every arm that it forked before an exception leaves the group; arguments fork where `ParallelismAnalyzer` marked the argument tuple.** The exception that leaves is that of the first arm, in the arms' order, that threw; an arm that was never forked is not run, and a `VirtualMachineError` leaves without the joins (`runtimeSystem/BaseTask.java`, `joinIfForked`; rows 947, 951 and 497, fixed). The analyzer marks no call written in the prelude's files, so the prelude's reductions run in sequence until the switch-over (row 982); the one library's parallel `ZZ32` range stops its split at `grainSize`, 16 (`Library/RangeInternals.fss:20`). What it means: a compiled reduction of the one library will fork its halves, and an exception leaves no arm running. Tests: `compiler_tests/AlsoArmThrowsJoinsCompiled`, `compiler_tests/CallArgumentsForkCompiled`, `tests/ParRangeGrainWalk`. Detail: `compile-ladder/rung-forked-arguments/REPORT.md`, "What changed and why" and "Points to report reached".
~~~~

After (`git show f78da2650a:explorations/coordinator/FACTS.md`):
~~~~
- F-350 **On the compiled path the arms of a parallel `do`, the elements of a tuple, the operands of an operator and the arguments of a call fork through one method, `CodeGen.genParallelExprs`, which joins every arm that it forked before an exception leaves the group; arguments fork where `ParallelismAnalyzer` marked the argument tuple.** The exception that leaves is that of the first arm, in the arms' order, that threw; when an exception leaves, an arm not yet forked is not run, and a `VirtualMachineError` leaves without the joins (`runtimeSystem/BaseTask.java:113-131`, `joinIfForked`). The analyzer marks no call written in the prelude's files, so the prelude's reductions run in sequence until the switch-over (row 982); the one library's parallel `ZZ32` range splits only a range of more than `grainSize`, 16, elements (`Library/RangeInternals.fss:20`, `:1320`, `:1337`). What it means: compiled against the one library, a reduction over more than 16 elements will fork its halves, and an exception leaves no arm running. By reading, not run: microGPT's vectors are 16, 16, 4 and 4 wide (`explorations/run-c4/src/MicroGptFlat.fss:17`), so a reduction over one of them forks nothing on either path. Tests: `compiler_tests/AlsoArmThrowsJoinsCompiled`, `CallArgumentsForkCompiled`, `tests/ParRangeGrainWalk`. Detail: `compile-ladder/rung-forked-arguments/REPORT.md`, "What changed and why" and "Points to report reached"; the model's widths against the grain: `reviews/batch-30-review.md`, "2. The three forks that landed at a default".
~~~~

Text added (word diff; runs separated by `+`):
~~~~
when an exception leaves,
+ not yet
+ (`runtimeSystem/BaseTask.java:113-131`, `joinIfForked`).
+ splits only a range of more than
+ 16, elements (`Library/RangeInternals.fss:20`, `:1320`, `:1337`).
+ against
+ library, a reduction over more than 16 elements
+ By reading, not run: microGPT's vectors are 16, 16, 4 and 4 wide (`explorations/run-c4/src/MicroGptFlat.fss:17`), so a reduction over one of them forks nothing on either path.
+ `CallArgumentsForkCompiled`,
+ reached"; the model's widths against the grain: `reviews/batch-30-review.md`, "2. The three forks that landed at a default".
~~~~
Text removed (word diff):
~~~~
that was never
- (`runtimeSystem/BaseTask.java`, `joinIfForked`; rows 947, 951 and 497, fixed).
- stops its split at
- 16 (`Library/RangeInternals.fss:20`).
- a
- reduction of
- library
- `compiler_tests/CallArgumentsForkCompiled`,
- reached".
~~~~
What the run's files call it, and the passage that asked for it:
- owed.md, C8 (line 20): "home: F-350 | kind: the pass | weight: high | ground: entries.md, F-350, the gather's block of 11:40Z ([S1]); 1196 characters, new; its \"What it means: a compiled reduction of the one library will fork its halves\" holds only for a range of more than `grainSize` elements ... and microGPT's widths are 16, 16, 4 and 4 ..., so a reader who plans phase 6 from this sentence would expect the model's reductions to fork; the pass states the bound, by reading, as the review does; its \"(rows 947, 951 and 497, fixed)\" is provenance".
- entries-report.md (lines 181 and 177): "`mech-1.md`: no check failed. The four entries that `lengths.py` names grew by what their changes owe. F-348 and F-350 grew a little more in this round, by the two fixes above." and "Cold read, F-350: \"an arm that was never forked is not run\" now opens with \"when an exception leaves\"."
- diff.md (C8): "C8, F-350, the pass, +348: the range \"splits only a range of more than `grainSize`, 16, elements\"; by reading, microGPT's widths 16, 16, 4, 4 fork nothing on either path. Ground: the review, finding 1; `RangeInternals.fss:1320` (read)." Checks: "each by its owed clause."
- Brief passage: `brief-entries.md` line 38 of the folder (quoted in part 0): the growth is allowed by "the clause that its change owes"; the judge brief (`judge.md`): "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth".

### F-290, climb batch 28, commit `bec01c5788` (climb batch 28, System and File)
- Length before and after: 854 to 1202 characters (+348).

Before (`git show bec01c5788^:explorations/coordinator/FACTS.md`):
~~~~
- F-290 **Outside the twelve, the compiled checker finds 624 component errors in 30 of the library's 40 other components, at least 92 api errors in 10 apis, and 25 crashes.** Measured once on climb batch 22's code, with the distance stage's driver over the components outside the twelve, without the compiler's three files and `GeneratorLibrary`; an api counts only up to its first failing stage. `Avl.fss`, a program kept in the library, stops at name binding on both paths (row 830) and is not among the 40. MicroGPT's imports, each checked alone: `System` 2, `File` 4, `FileSupport` 24, `FortressAst` 1. Two of the 40, `CovariantCollection` (12 errors, 2 crashes) and `OneShotFlag` (1), are among the distance's fourteen components since climb batch 22c, at 0 there (F-288). No test checks it. Detail: `reviews/phase3-exit/zero-audit.md`, "A.2 Scope".
~~~~

After (`git show bec01c5788:explorations/coordinator/FACTS.md`):
~~~~
- F-290 **On climb batch 22's code, outside the twelve, the compiled checker finds 624 component errors in 30 of the library's 40 other components, at least 92 api errors in 10 apis, and 25 crashes.** Measured once on climb batch 22's code, with the distance stage's driver over the components outside the twelve, without the compiler's three files and `GeneratorLibrary`; an api counts only up to its first failing stage. `Avl.fss`, a program kept in the library, stops at name binding on both paths (row 830) and is not among the 40. MicroGPT's imports, each checked alone on that code: `System` 2, `File` 4, `FileSupport` 24, `FortressAst` 1. Since then `System`, checked alone on `ee14222d`, reads no error (F-321), and `File`, a plain component since F-332, is not measured again; neither is among the distance's fourteen components. Two of the 40, `CovariantCollection` (12 errors, 2 crashes) and `OneShotFlag` (1), are among the distance's fourteen components since climb batch 22c, at 0 there (F-288). No test checks it. Detail: `reviews/phase3-exit/zero-audit.md`, "A.2 Scope"; `compile-ladder/rung-system-natives/REPORT.md`, "The checker over System"; `reviews/batch-28-review.md`, section 6.
~~~~

Text added (word diff; runs separated by `+`):
~~~~
**On climb batch 22's code, outside
+ alone on that code:
+ Since then `System`, checked alone on `ee14222d`, reads no error (F-321), and `File`, a plain component since F-332, is not measured again; neither is among the distance's fourteen components.
+ Scope"; `compile-ladder/rung-system-natives/REPORT.md`, "The checker over System"; `reviews/batch-28-review.md`, section 6.
~~~~
Text removed (word diff):
~~~~
**Outside
- alone:
- Scope".
~~~~
What the run's files call it, and the passage that asked for it:
- owed.md, C23 (line 36): "home: F-290 | kind: stale | weight: high | ground: its \"MicroGPT's imports, each checked alone: `System` 2, `File` 4\": rung S's checker over `System` reads no error on S's tree ... and `File` is a plain component since rung R, not measured; neither is among the distance's fourteen".
- entries-report.md (line 65): "**C23, F-290.** 854 to 1060. Added after the 2, 4, 24, 1: \"Since then `System`, checked alone on `ee14222d`, reads no error (F-321), and `File`, a plain component since F-332, is not measured again; neither is among the distance's fourteen components.\" The climb batch 22 figures stay, bounded to that code. Meaning: one claim added". Line 15: "**C23, F-290 (fidelity).** The Detail gains ... For the cold reader, the title now opens \"On climb batch 22's code, outside the twelve, ...\" ... Size 1202."
- diff.md Checks: "lengths.py: pass; 16 past 600 grew, each by its owed clause." (mech-1 had F-290 +206; mech-2 and final +348.)
- Brief passage: `brief-entries.md` line 38 of the folder (quoted in part 0): the growth is allowed by "the clause that its change owes"; the judge brief (`judge.md`): "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth".

### F-315, climb batch 25, commit `9342ddbb2a` (climb batch 25, `test` and `forbid`)
- Length before and after: 866 to 1210 characters (+344).

Before (`git show 9342ddbb2a^:explorations/coordinator/FACTS.md`):
~~~~
- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function declared `test`.** The forbid clause throws on, as a `ForbiddenException` chained to it, an exception of a listed type that no catch clause took, by the library's own constructor; `Bottom`, `Self` or an abbreviated type as such a static argument, a tuple that holds `Any` (row 889), and the `override` modifier (row 650) are still refused. With the control of climb batch 25's planner, the library's refusals fall from 50 to 47 and its kinds from 14 to 11; `test stringifyChars` stops next at a call of a varargs function (row 624). Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5.
~~~~

After (`git show 9342ddbb2a:explorations/coordinator/FACTS.md`):
~~~~
- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`.** An exception of a listed type that no catch clause took is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor, and the `finally` clause does not run (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:2947-2949`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it. `Bottom`, `Self` or an abbreviated type as that static argument, a tuple that holds `Any` (row 889), and the `override` modifier (row 650) are still refused. The library's `test stringifyChars` stops next at a varargs call (row 624). F-34 gives what the code generator still refuses in the library. Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`; for row 890, `XXXFinallyOnEscape.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.
~~~~

Text added (word diff; runs separated by `+`):
~~~~
or a method
+ An
+ took is thrown again as a `ForbiddenException` chained to it, made
+ constructor, and the `finally` clause does not run (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:2947-2949`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it.
+ that
+ The
+ varargs
+ F-34 gives what the code generator still refuses in the library.
+ `TestModifierCompiled.test`; for row 890, `XXXFinallyOnEscape.test`.
+ 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.
~~~~
Text removed (word diff):
~~~~
The forbid clause throws on, as a `ForbiddenException` chained to it, an
- took,
- constructor;
- such a
- With the control of climb batch 25's planner, the
- refusals fall from 50 to 47 and its kinds from 14 to 11;
- of a varargs function
- `TestModifierCompiled.test`.
- 5.
~~~~
What the run's files call it, and the passage that asked for it:
- owed.md, C20 (line 28): "home: F-315 | kind: the pass | weight: high | ground: review finding 5 and Part 1, splits 3 and 4: F-315 gives \"a function declared `test`\", not that the modifier now passes on a method too (`test mt()` on an object compiles and runs, 'O 7'; `CodeGen.java:2947-2949`), and not that the new `forbid` path skips the `finally` clause (row 890, `XXXFinallyOnEscape`)".
- entries-report.md (lines 123 and 148): "## C20, F-315 (866 to 1210)" and "Three entries grew, each by what its change owes: F-240 (+142), F-315 (+344) and P-38 (+140). No split is owed by this landing."
- diff.md (C20): "C20, F-315, made false: ... Grew 866 to 1210 by the two owed clauses. Ground: review finding 5, splits 3 and 4; row 890." Checks: "grew past 600: F-240 (+142), F-315 (+344), each by its owed clauses."
- Brief passage: `brief-entries.md` line 38 of the folder (quoted in part 0): the growth is allowed by "the clause that its change owes"; the judge brief (`judge.md`): "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth".

### F-372, climb batch 31, commit `255179ba3a` (climb batch 31, a dispatch method over two paths)
- Length before and after: 1752 to 2087 characters (+335).

Before (`git show 255179ba3a^:explorations/coordinator/FACTS.md`):
~~~~
- F-372 **The code generator writes each inherited method once into a trait's or an object's class, runs the declaration of the lowest type that declares it, and forwards to a body that an imported api's trait holds.** For the class of a trait or an object the code generator gathers the methods of the type and its supertypes without each declaration that a type strictly below its own declares again at the same parameter types, self apart, compared at the instance that the extends clauses give (`STypesUtil.allMethodsNotReplaced`). So the choice is a relation between two declarations, not the order of the gathered methods, and the library's shape of P-47, `MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below, no longer stops a class at load (row 990, fixed). A method that an imported api's trait declares without `abstract` counts as a body in that trait's class, so a trait that is not first in an extends clause gives its body, plain, generic and functional methods alike (row 732, fixed). A functional method with self not first is no longer written beside its dispatch method (row 571, fixed); behind it, an object's dispatch method still tests the receiver in place of the argument (rows 573 and 1038). The gatherings for the dispatch methods still use the schema comparison of `removeIdenticallyCoveredMethods`, and an object that reaches a generic trait's method along two paths, one through a trait that declares it again, is refused by the checker (row 1037). Tests: `compiler_tests/TraitOwnMethodBesideInheritedCompiled`, `ApiTraitMethodNotFirstCompiled`, `TraitMethodDiamondRedeclaredCompiled`, `FunctionalMethodMeetNarrowedSelfNotFirst`. Detail: `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".
~~~~

After (`git show 255179ba3a:explorations/coordinator/FACTS.md`):
~~~~
- F-372 **The code generator writes each inherited method once into a trait's or an object's class, runs the declaration of the lowest type that declares it, and forwards to a body that an imported api's trait holds.** For the class of a trait or an object the code generator leaves out each declaration whose method a type strictly below the declaring type declares again at the same parameter types, self apart. A dispatch method's gathering still compares declarations as schemas over each trait's own bounds, not at the instance. So the choice is a relation between two declarations, not the order of the gathered methods, and the library's shape of P-47, `MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below, does not stop a class at load (row 990, fixed). A method that an imported api's trait declares without `abstract` counts as a body in that trait's class, so a trait that is not first in an extends clause gives its body, plain, generic and functional methods alike (row 732, fixed). A worker chose both readings, and the curator has not decided them; by the traits chapter's text, an object that reaches one method along two paths, one through a trait that declares it again, inherits both declarations, and the checker refuses that form where the traits are self-typed and generic (row 1037). A functional method with self not first is written once, not again beside the dispatch method of the same name (row 571, fixed), so such a class loads; but an object's dispatch method still tests the receiver in place of the argument, and where the receiver itself has the own declaration's parameter type, a call answers wrongly with no error: with `object Pq extends { K, P }` declaring `mark(x: K, self)` beside `P`'s `mark(x: Any, self)`, `mark(1, Pq)` gives 3 where walk gives 1 (rows 1038 and 573). Tests: `compiler_tests/TraitOwnMethodBesideInheritedCompiled`, `ApiTraitMethodNotFirstCompiled`, `TraitMethodDiamondRedeclaredCompiled`, `FunctionalMethodMeetNarrowedSelfNotFirst`. Detail: `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".
~~~~

Text added (word diff; runs separated by `+`):
~~~~
leaves out
+ whose method
+ the declaring type
+ apart. A dispatch method's gathering still compares declarations as schemas over each trait's own bounds, not
+ instance.
+ does not stop
+ worker chose both readings, and the curator has not decided them; by the traits chapter's text, an object that reaches one method along two paths, one through a trait that declares it again, inherits both declarations, and the checker refuses that form where the traits are self-typed and generic (row 1037). A
+ once, not again
+ the
+ of the same name
+ fixed), so such a class loads; but
+ argument, and where the receiver itself has the own declaration's parameter type, a call answers wrongly with no error: with `object Pq extends { K, P }` declaring `mark(x: K, self)` beside `P`'s `mark(x: Any, self)`, `mark(1, Pq)` gives 3 where walk gives 1
+ 1038
+ 573).
~~~~
Text removed (word diff):
~~~~
gathers the methods of the type and its supertypes without
- that
- its own
- apart, compared
- instance that the extends clauses give (`STypesUtil.allMethodsNotReplaced`).
- no longer stops
- no longer
- its
- fixed); behind it,
- argument
- 573
- 1038). The gatherings for the dispatch methods still use the schema comparison of `removeIdenticallyCoveredMethods`, and an object that reaches a generic trait's method along two paths, one through a trait that declares it again, is refused by the checker (row 1037).
~~~~
What the run's files call it, and the passage that asked for it:
- owed.md, C5 (line 19): "home: F-372 | kind: the pass | weight: high | ground: entries.md, F-372, the gather's block of 02:47Z ([S5]); 1752 characters, new. Its \"behind it, an object's dispatch method still tests the receiver in place of the argument (rows 573 and 1038)\" leaves out what that does now: such a class loads, and a call answers wrongly with no error, `mark(1, Pq)` 3 where walk answers 1 (row 1038 ...)".
- entries-report.md (lines 43, 224-225, 247): "### C5, F-372 (1752 to 1821)"; fix round: "C5, F-372 (fidelity): restored as a limit, with no member's name: \"A dispatch method's gathering still compares declarations as schemas over each trait's own bounds, not at the instance.\"" and "row 1038's condition restored"; "These fixes add words that the check and the cold reader asked for. F-372 (+335 over its size at AT) and F-375 (+302) grew most. Each new clause restores a condition, or answers a passage the reader could not resolve. I found no further detail to move out without losing a condition."
- diff.md Held: "Each of the 14 entries past 600 that grew grows by its owed clauses, the rest moved out (`lengths.py`)."; Checks: "`lengths.py`: pass; the 14 entries above grew."
- Brief passage: `brief-entries.md` line 38 of the folder (quoted in part 0): the growth is allowed by "the clause that its change owes"; the judge brief (`judge.md`): "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth".

### F-54, climb batch 27, commit `d131d92c5e` (climb batch 27, Char's crash)
- Length before and after: 608 to 943 characters (+335).

Before (`git show d131d92c5e^:explorations/coordinator/FACTS.md`):
~~~~
- F-54 **The gate classes the distance to the switch-over by root cause.** The `#class` rows of each gate's `distance.txt` hold the count of each class, such as X1 for an export error, BR for a big operator's body, and OT for the other body errors, one-off library slips and checker limits; `explorations/coordinator/tools/distance/classify.py` assigns them. F-53 gives the last gate's. That gate's `distance.txt` reads `#crash none`: the checker checks the `FortressLibrary` component to its end, `Array3`'s body included, without a crash (F-233). Detail: `perf-probes/prelude/distance-triage.md` section 2.
~~~~

After (`git show d131d92c5e:explorations/coordinator/FACTS.md`):
~~~~
- F-54 **The gate classes the distance to the switch-over by root cause.** The `#class` rows of a gate's `distance.txt` hold the count of each class that occurs, such as X1 for an export error, BR for a big operator's body, and OT for the other body errors, one-off library slips and checker limits; `explorations/coordinator/tools/distance/classify.py` assigns them, and at a distance of 0 there are none (`tools/distance/table.py:112`). F-53 gives the last gate's total. That gate's `distance.txt` holds two `#crash` rows: the check of `value object Char` stops in the checker's sort of a call's candidate declarations, and then the `FortressBuiltin` component's leftover stage reports the inference nodes that the stopped check left (row 929). The checker checks the `FortressLibrary` component to its end without a crash (F-233). Detail: `perf-probes/prelude/distance-triage.md` section 2; `reviews/batch-27-review.md`, section 7, point 6.
~~~~

Text added (word diff; runs separated by `+`):
~~~~
a
+ class that occurs,
+ them, and at a distance of 0 there are none (`tools/distance/table.py:112`).
+ gate's total.
+ holds two `#crash` rows:
+ check of `value object Char` stops in the checker's sort of a call's candidate declarations, and then the `FortressBuiltin` component's leftover stage reports the inference nodes that the stopped check left (row 929). The
+ end
+ 2; `reviews/batch-27-review.md`, section 7, point 6.
~~~~
Text removed (word diff):
~~~~
each
- class,
- them.
- gate's.
- reads `#crash none`:
- end, `Array3`'s body included,
- 2.
~~~~
What the run's files call it, and the passage that asked for it:
- owed.md, C14 (line 25): "home: F-54 | kind: made false | weight: high | ground: its \"That gate's `distance.txt` reads `#crash none`\": climb batch 27's `gate/distance.txt` holds two `#crash` rows, at `value object Char` ... and the leftover stage it causes (the review, section 1 and section 7, point 6; row 929); and its \"The `#class` rows of each gate's `distance.txt` hold the count of each class\": none since climb batch 24's gate at least".
- entries-report.md (line 166): "**C14, F-54.** New: \"The `#class` rows of a gate's `distance.txt` hold the count of each class that occurs, ...; `explorations/coordinator/tools/distance/classify.py` assigns them, and at a distance of 0 there are none (`tools/distance/table.py:112`).\" Meaning: the old sentence's meaning, with its condition; my round-1 reading, that the rows were missing, was wrong. The cold reader could not resolve \"the checker's sort of its candidates\" and \"leftover stage\". Both now say what they are". Line 179: "The sizes change again: F-54, F-281, F-288, F-308 and P-165 grow by a few tens of characters each, by the corrections above."
- diff.md (C14): "C14, F-54, made false: two `#crash` rows, `Char`'s check stopped, then the leftover stage (row 929); `#class` rows only for a class that occurs. Ground: the review, section 7; `table.py:112`." Checks: "lengths.py: pass; 18 entries past 600 grew, each by its owed clause." (F-54 was 608 at AT, over 600 by 8.)
- Brief passage: `brief-entries.md` line 38 of the folder (quoted in part 0): the growth is allowed by "the clause that its change owes"; the judge brief (`judge.md`): "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth".

### F-396, climb batch 34b, commit `b5a4765829` (climb batch 34b, the compiled path against the one library)
- Length before and after: 1639 to 1946 characters (+307).

Before (`git show b5a4765829^:explorations/coordinator/FACTS.md`):
~~~~
- F-396 **The one library compiles to jars and runs on the compiled path, over a second set of run-time classes.** Under `FORTRESS_LIBRARY=one` the onelibrary track compiles the one library's fourteen components first, in one `.test` (`OneLibraryJUTest.java:44`), and a program compiled against them runs with the JVM's verifier on, as `Hello` does. The run time's classes that name a library's types come in two sets under one set of names: `ProjectFortress/build` for the prelude, and `ProjectFortress/build-one`, built from `ProjectFortress/src-one` by the same `ant compileAll` and covered by its stamp, for the one library, which `bin/fortress_classpath` and the track put first under the selection. The one library's seven number types, `Boolean`, `Char` and `FlatString` are objects whose classes the code generator writes over payload classes (`NamingCzar.java:637-655`), all value objects but `FlatString`, a reference object (`Library/FlatString.fss:32`), and a helper's raise names its exception by its simple name, which each set's `LibraryNames` maps to its library's class. So a program against the one library meets the code generator's own walls: a varargs call (row 1091), a reduction over a range (row 1099), `println` of a number (row 1098), `=` of two strings or two booleans (row 994); and the library's compile depends on what its JVM compiled before (row 1100), so the track compiles it first. Tests: `one_library_tests/OneLibraryComponents.test`, `OneLibraryRunHello.test`, `OneLibraryCatchHelperRaises.test`. Detail: `compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)".
~~~~

After (`git show b5a4765829:explorations/coordinator/FACTS.md`):
~~~~
- F-396 **The one library compiles to jars over a second set of run-time classes, and a program compiled against them can run on the compiled path, as one that prints a line does.** Under `FORTRESS_LIBRARY=one` the onelibrary track compiles the one library's fourteen components first, in one `.test` (`OneLibraryJUTest.java:44`), and a program compiled against them runs with the JVM's verifier on, as `Hello` does. The run time's classes that name a library's types come in two sets under one set of names: `ProjectFortress/build` for the prelude, and `ProjectFortress/build-one`, built from `ProjectFortress/src-one` by `ant compileAll`, for the one library, which the class path puts first under the selection. The one library's seven number types, `Boolean`, `Char` and `FlatString` are objects whose classes the code generator writes over payload classes (`NamingCzar.java:637-655`), all value objects but `FlatString`, a reference object (`Library/FlatString.fss:32`), and a helper's raise names its exception by its simple name, which each set's `LibraryNames` maps to its library's class. Against the one library the compiled path still departs from walk, each at a row: a varargs call (row 1091); a reduction over a range (row 1099); `println` of a number or a boolean, which the export check's rule decides as much as the code generator (row 1098); `=` of two strings or two booleans, and `<` of two strings (row 994); `u.asString` in a generic body at `U extends ZZ32` (row 1101); the report of an uncaught exception (row 1102); a caught exception that a helper raises, which is not its object (row 1103). The library's compile depends on what its JVM compiled before (row 1100), so the track compiles it first. Tests: `one_library_tests/OneLibraryComponents.test`, `OneLibraryRunHello.test`, `OneLibraryCatchHelperRaises.test`. Detail: `compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)".
~~~~

Text added (word diff; runs separated by `+`):
~~~~
classes, and a program compiled against them can run on the compiled path, as one that prints a line does.**
+ compileAll`,
+ class path puts
+ Against
+ compiled path still departs from walk, each at a row:
+ 1091);
+ 1099);
+ or a boolean, which the export check's rule decides as much as the code generator
+ 1098);
+ booleans, and `<` of two strings
+ `u.asString` in a generic body at `U extends ZZ32` (row 1101);
+ report of an uncaught exception (row 1102); a caught exception that a helper raises, which is not its object (row 1103). The
~~~~
Text removed (word diff):
~~~~
and runs on the compiled path,
- classes.**
- the same
- compileAll` and covered by its stamp,
- `bin/fortress_classpath` and
- track put
- So a program against
- meets
- code generator's own walls:
- 1091),
- 1099),
- 1098),
- booleans
- and
~~~~
What the run's files call it, and the passage that asked for it:
- owed.md, C15 (line 23): "home: F-396 | kind: the pass | ... ground: ... the review, section 1, \"What the two paths still do differently after this run\": its list of walls, \"the code generator's own walls\", names rows 1091, 1099, 1098 and 994 and leaves out `println` of a boolean (row 1098), a generic `u.asString` at `U extends ZZ32` (row 1101), the uncaught report (row 1102) and the caught singleton (row 1103)". C16 (line 24): "home: F-396 | kind: past 600 characters | weight: low | ground: entries.md, F-396, 1639 characters, new; the two sets' build and class path can go to rung C's report, which it cites".
- entries-report.md (lines 15 and 24): C15 "F-396's title is now \"The one library compiles to jars over a second set of run-time classes, and a program compiled against them can run on the compiled path, as one that prints a line does.\""; "F-396: \"the export rule\" is now \"the export check's rule\", the skill's term."
- diff.md (C15, C16): "C15, C16, F-396, the pass: the title cut to ...; the departures from walk as the review lists them, rows 1091, 1099, 1098, 994, 1101, 1102, 1103; the stamp and the class path script to the report; +307, under the owed list and title." Checks: "nine over 600 grew, each by its owed clause, F-353 with the cold reader's 3 characters; F-34 and F-390 shrank."
- Brief passage: `brief-entries.md` line 38 of the folder (quoted in part 0): the growth is allowed by "the clause that its change owes"; the judge brief (`judge.md`): "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth".

### F-375, climb batch 31, commit `255179ba3a` (climb batch 31, load check of generic beside plain)
- Length before and after: 1667 to 1969 characters (+302).

Before (`git show 255179ba3a^:explorations/coordinator/FACTS.md`):
~~~~
- F-375 **Walk's load check reads a generic declaration beside a plain one over an object type by the Return Type Rule, and its check of value types passes a type parameter.** A plain declaration whose domain lies inside an own generic's declared domain is read on the declared domains even where the lists differ only at object types: its result must lie below the generic's with the type parameters standing for themselves, or below an object type of its own that stands at a parameter of the type parameter that the generic returns, or below the generic's result at the instance that holds its domain where a static argument of a parameter type fixes each type parameter of that result (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed). A declaration that writes no return type is not judged there (row 1044), a `comprises` clause is not read (row 550), and two plain lists keep the team's shortcut (row 697). `FTraitOrObject.enforceValueness` refuses a declared type that is not a value type below a value type, and passes the symbolic type of a type parameter (row 997, fixed). So the merge of the number types with their objects meets neither defect. Four kinds of a program's own pair changed their verdict at load: two are now refused, and two now load. Tests: `ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.fss`, `GenericBesidePlainObjectValidWalk.fss`, `GenericBesidePlainEveryInstanceWalk.fss`, `TraitGenericMethodValueBoundWalk.fss`, `OverloadedGenericValueBoundWalk.fss`, `NonValueBelowValueTypeWalk.fss`. Detail: `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" and "Programs run old against new".
~~~~

After (`git show 255179ba3a:explorations/coordinator/FACTS.md`):
~~~~
- F-375 **Walk's load check reads a generic declaration beside a plain one over an object type by the Return Type Rule, and its check of value types passes a type parameter.** A plain declaration whose domain lies inside an own generic's declared domain is read on the declared domains even where the lists differ only at object types, which the team's shortcut takes to exclude: the pair loads where the plain result lies below the generic's by one of three readings that the report gives, and is refused, in the rule's name, where none of them holds (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed). A declaration that writes no return type is not judged there (row 1044), a `comprises` clause is not read (row 550), and two plain lists keep the team's shortcut (row 697). `FTraitOrObject.enforceValueness` refuses a declared type that is not a value type below a value type, and passes the symbolic type of a type parameter (row 997, fixed). The coordinator chose to read no `comprises` clause and to leave unjudged a declaration that writes no return type; a worker chose the three readings and the check of value types; the curator has decided none of them. So neither defect stands in the way of the merge of the number types with their objects (P-178), but after it every generic-beside-plain pair over the five number types is read on its declared domains, and no run has measured that (F-361's probe ran without the reading). Where the reading and the team's shortcut differ, some pairs are refused and others load; the report runs each old against new. Tests: `ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.fss`, `GenericBesidePlainObjectValidWalk.fss`, `GenericBesidePlainEveryInstanceWalk.fss`, `TraitGenericMethodValueBoundWalk.fss`, `OverloadedGenericValueBoundWalk.fss`, `NonValueBelowValueTypeWalk.fss`. Detail: `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" and "Programs run old against new".
~~~~

Text added (word diff; runs separated by `+`):
~~~~
types, which the team's shortcut takes to exclude: the pair loads where the plain
+ lies
+ by one
+ three readings
+ report gives, and is refused, in
+ rule's name, where none of them
+ The coordinator chose to read no `comprises` clause and to leave unjudged a declaration that writes no return type; a worker chose the three readings and the check of value types; the curator has decided none of them.
+ neither defect stands in the way of
+ (P-178), but after it every generic-beside-plain
+ over the five number types is read on its declared domains, and no run has measured that (F-361's probe ran without the reading). Where the reading and the team's shortcut differ, some pairs
+ refused
+ others load; the report runs each old against new.
~~~~
Text removed (word diff):
~~~~
types: its
- must lie
- with the type parameters standing for themselves, or below an object type
- its own that stands at a parameter of the type parameter
- generic returns, or below
- generic's result at the instance that
- its domain where a static argument of a parameter type fixes each type parameter of that result
- meets neither defect. Four kinds of a program's own
- changed their verdict at load: two
- now refused,
- two now load.
~~~~
What the run's files call it, and the passage that asked for it:
- owed.md, C8 (line 22): "home: F-375 | kind: the pass | weight: low | ground: entries.md, F-375, the gather's block of 02:51Z ([S8]); 1667 characters, new. \"So the merge of the number types with their objects meets neither defect\" holds for rows 997 and 998, and is read against the review, Part 5, \"To add, 1\" ... \"Four kinds of a program's own pair changed their verdict at load: two are now refused, and two now load\" tells a change, which the report's \"Programs run old against new\" holds."
- entries-report.md (lines 74, 226, 227, 242, 247): "### C8, F-375 (1667 to 1827)"; fix round: "\"The coordinator chose to read no `comprises` clause and to leave unjudged a declaration that writes no return type; a worker chose the three readings and the check of value types; the curator has decided none of them.\" Meaning: the guard of point B2 is the coordinator's, as the review, Part 4, decision 2, gives it."; "F-375: \"the team's shortcut\" is now defined where it first stands"; "F-372 (+335 over its size at AT) and F-375 (+302) grew most."
- diff.md Held: "Each of the 14 entries past 600 that grew grows by its owed clauses, the rest moved out (`lengths.py`)."
- Brief passage: `brief-entries.md` line 38 of the folder (quoted in part 0): the growth is allowed by "the clause that its change owes"; the judge brief (`judge.md`): "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth".

## 4. Before the record-landing workflow existed

Window: `git log b67abe3d2^..9342ddbb2a^ -- explorations/coordinator/FACTS.md`, that is, from the consolidation commit `b67abe3d2` (2026-10-13 20:13) to the commit before the first record-landing run's commit 1 `9342ddbb2a` (2026-11-03 05:04). The first run's commit 1 is climb batch 25's.

- Commits that touched `FACTS.md` in the window: **121** (`git log` count). Over the same range, 122 commits touched `FACTS-history.md`.
- By the commit's subject (my classification, regex in `scratchpad/gia/gen4.py`):
  - 55: batch commit whose subject names a code change (the gather folded the FACTS entry into the rung commit).
  - 43: record commit named by its subject (coordinator, record writer or batch landing).
  - 12: review's corrections commit.
  - 11: commit stage (gate tables).
- By the `Co-Authored-By` trailer: Claude <noreply@anthropic.com>: 94; Claude Opus 5.5 <noreply@anthropic.com>: 26; Claude Fable 5.1 <noreply@anthropic.com>: 1. All 11 gate-table commits and all 12 fold commits carry `Claude <noreply@anthropic.com>` with no tier. The `Claude Fable 5.1` trailer is on one commit.
- The full list follows part 4's notes, below.

What the batch script and its manual say of who writes FACTS at a landing, at `11d2d8764b` (the last commit before the first run's; `explorations/coordinator/climb-batch-workflow.md` and `climb-batch-workflow.js` there). Line numbers are of the files at that commit:
- `climb-batch-workflow.md:100`: "The worker does not edit FACTS, the ledger, PLAN, POSITIONS, INDEX, the handover, the tools or `.claude/`: the gather folds `record.md` into them, since every rung would conflict there."
- `climb-batch-workflow.md:98`: "`record.md` carries, as complete findings, the FACTS entry the rung earns, its ledger notes, the whole new line of each row whose claim its change alters, ..."
- `climb-batch-workflow.js:823` (the worker's brief): "record.md: the record lines the gather folds, each a complete finding: the claim, the conditions under which it holds, its evidence (the file:line, the command with its output, the test) and what it means for the work. Completeness is yours; the record pass owns the final wording."
- `climb-batch-workflow.md:163`: "**The record folded.** The FACTS entry under its area. A ledger note that adds a fact through `ledger.py note`. ..." and `climb-batch-workflow.js:1222`: "2. Its record, record.md, folded. The FACTS.md entry under the section of its area (the file's README gives the rule), after the section's last entry: the fact, its source and its test in a few lines."
- `climb-batch-workflow.md:180`, the review's third check: "3. The folded record: FACTS lines, `ledger.py landing-check BASE` with no finding, also none the base already had, each fixed in the review's corrections commit, ..." and `climb-batch-workflow.js:1299`: "3. The folded record as a whole: every FACTS line true as written, sourced and checkable; ..."
- `climb-batch-workflow.md:253`, the commit stage: "1. Copies the gate's outputs into `compile-ladder/climb-batch-<N>/gate/` ... It writes the landed figures into FACTS, numbers only, by `record.py set`, one call per entry, `FACTS-history.md` in the same commit: F-53's distance and count, from the two tables, and F-240's two stages' seconds." (the commits titled "Record the gate's tables and the microGPT walk check")
- `climb-batch-workflow.md:277-278`, "After the landing: the coordinator's routing": "3. FACTS consolidated as its README says, superseded text moved to `FACTS-history.md`. The commit stage has already written the landed count and distance, and the two stages' seconds (F-53, F-240)."
- `record-landing/README.md`, line 3 of the file: "`record-landing.js` does the record's work after a landing, which the coordinator did by hand through a record writer and a routing worker until climb batch 24."

So, by these texts, at each landing before the workflow the FACTS writers were: the gather (rung entries folded into the rungs' commits, word "Completeness is yours; the record pass owns the final wording"); the review's corrections commit; the commit stage (F-53 and F-240 numbers by `record.py set`); and the coordinator's own pass "FACTS consolidated", through a record writer (README line 3).

### Reports of entries over 600 characters in this window

- Commit messages (grep of the window for "600", "past the record", "over 600"): three hits.
  - `21dce21481` (2026-10-17 18:19, "Fold the review's corrections"), body: "RECORD.md: ownGeneric's comment is ... F-250 to F-254 all past 600 characters; rung L's sentence on walk's stopped dotted calls read against main, where rung W's walk fix runs them."
  - `be3b07aacc` (2026-10-31 17:10), subject: "FACTS and POSITIONS after climb batch 24's landing: the entries that the post-batch review found false, stale or past the record's check"; body: "F-299, F-308, F-298: the pass on the three largest entries. Line numbers, names of classes and messages stay in their reports and in the fortress-repo skill's two \"Natives\" parts. F-299 keeps the count of 173 and 276, and F-32 points to it."
  - `575d555945` (2026-11-02 02:57, the workflow after its replay), body: "5. judge.md and lengths.py: an entry already over 600 that grew is named, and held unless the owed clause alone explains it; the writer first moves detail to the report or to a pointer to the skill's part."
- Batch records `explorations/compile-ladder/climb-batch-*/RECORD.md`, grep "600" (batches 14 to 24; hits that name entries over the record's 600):
  - climb-batch-17 line 309: "F-250 to F-254 are all past the record's 600 characters (1,726, 946, 3,119, 1,145 and 929, `record.py check`), as the records wrote them."
  - climb-batch-18 line 236: "F-255, F-256 and F-257 are past the record's 600 characters (1,926, 1,918 and 1,790, `record.py check`), as the records wrote them."
  - climb-batch-19 line 187: "F-258 and F-259 are past the record's 600 characters (2,387 and 1,078, `record.py check`), as the records wrote them."
  - climb-batch-20 line 203: "F-263 and F-264 are past the record's 600 characters (1,478 and 1,144, `record.py check`), as the records wrote them."
  - climb-batch-21 line 272: "F-245 is rewritten whole for the three rungs together (2,245 characters); F-276, F-277 and F-278 are past the record's 600 characters (1,467, 1,320 and 1,531, `record.py check`), as the records wrote them; ..."
  - climb-batch-21b line 213: "F-281, F-282 and F-283 are past the record's 600 characters (`record.py check` reports the sizes), as the records wrote them, ..."
  - climb-batch-22 line 223: "F-282, F-285 and F-286 are past the record's 600 characters (`record.py check` reports the sizes), as the records wrote them."
  - climb-batch-22c line 275: "F-282, F-285, F-286, F-287, F-288, F-297 and others are past the record's 600 characters (`record.py check` reports the sizes), as the records wrote them."
  - Batches 14, 15, 16, 21b's other lines, 23 and 24: no RECORD.md line names entries over 600 (the grep hits in those files are line numbers or seconds).
- Reviews `explorations/reviews/batch-*-review.md`, grep "600" (batches 14 to 25), hits that name entries over 600:
  - batch-17 line 250: "F-250 to F-254 are over 600 characters."
  - batch-18 line 449: "**F-255, F-256 and F-257** are 2,728, 2,002 and 1,790 characters, past the record's 600 (`record.py check` at the commit stage). Home: the coordinator's consolidation."
  - batch-19 line 433: "**F-258 and F-259** are 2,387 and 1,078 characters, past the record's 600 (`RECORD.md:187`). Home: the coordinator's consolidation, with F-238 and F-252."
  - batch-20 line 287: "12. **FACTS entries for the consolidation:** ... F-263 and F-264 are 1,478 and 1,144 characters, past the record's 600; ... Home: the coordina[tor's ...]"
  - batch-21 line 309: "9. **FACTS:** F-240 is false (...); F-245 is 2,258 characters, F-276 1,467, F-277 1,320 and F-278 1,531, past the record's 600 (`RECORD.md`, \"FACTS and POSITIONS left for the coordinator\"); ..."
  - batch-21b line 582: "- **FACTS:** F-240 false. F-281 (1,472 bytes), F-282 (1,441) and F-283 (734) are past the record's 600, as the gather reported."
  - batch-22 line 741: "- **FACTS:** F-240, F-281, F-34, F-245 and F-61 (finding 4). F-282, F-285 and F-286 are past the record's 600 characters, as `record.py check` reports and the gather said."
  - batch-22c line 536: "- **FACTS:** F-240, F-294, F-282 and F-296 (finding 4). F-282, F-286, F-287, F-288, F-296 and F-297 are past the record's 600 characters, as `record.py check` reports."
  - batch-23 line 505: "- **FACTS:** F-240 (finding 3). F-53, F-111, F-180, F-24 and F-299 hold. F-298, F-299, F-180 and F-32 are past the record's 600 characters, as `record.py check` reports."
  - batch-24 lines 352 and 581: "- F-299 at 2,789 characters, F-308 at 2,330 and F-298 at 2,156, past the record's 600 (`record.py check`)." and "... F-299, F-308 and F-298 are past the record's 600 characters, as `record.py check` reports."
  - batch-25 line 446 (review of 2026-11-03 04:28, before the first run): "F-299, F-308 and F-298 are still past the record's 600 characters, among 205 entries that `record.py check` reports."
  - Batches 14, 15, 16 reviews: no line names entries over 600 (grep "600" hits are other numbers).
- Lengths of the entries that these reports name, in characters, at `11d2d8764b` (the last commit before the first run's folder; `git show`) and at `9de4c69bc8`: 


| entry | `11d2d8764b` | `9de4c69bc8` |
|---|---|---|
| F-250 | 1293 | 1293 |
| F-251 | 1467 | 1467 |
| F-252 | 2086 | 4330 |
| F-253 | 2085 | 2241 |
| F-254 | 1099 | 1099 |
| F-255 | 2450 | 2519 |
| F-256 | 2408 | 2408 |
| F-257 | 2159 | 2194 |
| F-258 | 2830 | 2830 |
| F-259 | 1236 | 1236 |
| F-263 | 1933 | 1720 |
| F-264 | 2093 | 2093 |
| F-245 | 1330 | 1330 |
| F-276 | 1430 | 1430 |
| F-277 | 1320 | 1353 |
| F-278 | 1566 | 1561 |
| F-281 | 1501 | 1529 |
| F-282 | 2601 | 2506 |
| F-283 | 721 | 989 |
| F-285 | 1622 | 1683 |
| F-286 | 1146 | 1146 |
| F-287 | 1204 | 1204 |
| F-288 | 1094 | 1178 |
| F-296 | 1136 | 1151 |
| F-297 | 1680 | 1680 |
| F-298 | 2090 | 2090 |
| F-299 | 2339 | 3232 |
| F-308 | 1950 | 2098 |
| F-180 | 2349 | 2337 |
| F-32 | 2006 | 1897 |

The window's FACTS commits, hash, time (UTC), trailer, subject (cut at 120 characters):

- `b67abe3d26` 10-13 20:13 | Claude <noreply@anthropic.com> | FACTS and POSITIONS: P-135, F-210 and F-219 removed, their rules now in the skills
- `604d0e23cb` 10-14 04:40 | Claude <noreply@anthropic.com> | IntMap's node map SYMDIFF a singleton keeps its other entries, Array2's offset takes Array1's shape, and each integer ty
- `0856f3e6a9` 10-14 04:43 | Claude <noreply@anthropic.com> | The compiled checker retries a call written as another call's argument against each declaration's parameter type
- `3ba2d005ff` 10-14 04:45 | Claude <noreply@anthropic.com> | Walk computes a power in a size, the No Duplicates Rule is restated on the non-strict relation, and the POPL 2019 exampl
- `f9fe5c8742` 10-14 04:47 | Claude <noreply@anthropic.com> | Walk counts an inherited abstract method as defined only where the object's narrower bodies cover it, Random's and Quick
- `1c32ccffdb` 10-14 04:48 | Claude <noreply@anthropic.com> | The compiled checker reads a self-typed trait's self as the implementing type from its F-bound, keeps the signatures pla
- `7c2c7cd4bf` 10-14 05:34 | Claude <noreply@anthropic.com> | Record the gate's tables and the microGPT walk check
- `3526b510d3` 10-14 05:37 | Claude <noreply@anthropic.com> | FACTS: F-53 and F-54 after climb batch 14, the self-typed bodies cleared and the count's path past body(i)
- `15a6d4365a` 10-14 06:09 | Claude <noreply@anthropic.com> | FACTS: the record pass after climb batch 14, the twelve entries cut to the form and F-224 merged into F-145
- `cf20f71d0b` 10-14 11:39 | Claude <noreply@anthropic.com> | FACTS: the scope errors of Astra's record-keeping review repaired
- `f237148ac1` 10-14 14:58 | Claude <noreply@anthropic.com> | The compiled checker expands a closed trait only against a conjunct that names no type variable, and reads a variable be
- `20474c1449` 10-14 15:01 | Claude <noreply@anthropic.com> | Walk instantiates the big operator of a reduction or comprehension that writes no static argument by the declared type o
- `a0f839ad7e` 10-14 15:03 | Claude <noreply@anthropic.com> | array1 and array2 build a vector or a matrix per number type by a typecase over a witness of their result type, and IntM
- `59b1d0a4d2` 10-14 15:05 | Claude <noreply@anthropic.com> | The compiled checker refuses duplicate functional methods wherever their self parameters stand and covers an abstract me
- `219d485eb5` 10-14 15:28 | Claude <noreply@anthropic.com> | Fold the review's corrections
- `c404899784` 10-14 15:55 | Claude <noreply@anthropic.com> | Record the gate's tables and the microGPT walk check
- `4dbf3ff4c6` 10-14 15:58 | Claude <noreply@anthropic.com> | FACTS: F-53 and F-54 after climb batch 15, the count at row 680's crash and its repair held
- `dfc92d9a55` 10-15 00:15 | Claude <noreply@anthropic.com> | FACTS: climb batch 15b, the count 39 and the distance 49; F-231 the walker split, F-232 identity hashes (row 488), F-233
- `e2906af776` 10-15 00:48 | Claude <noreply@anthropic.com> | After PLAN's consolidation: row 425's citations repointed to row 731, P-148's built part out, INDEX and HELD brought up 
- `a479a1abec` 10-16 09:15 | Claude <noreply@anthropic.com> | FACTS F-234, POSITIONS P-150: one-off commands' JVM start-up measured too small for a resident compiler, which is not bu
- `ee6bfcb8d4` 10-16 17:27 | Claude <noreply@anthropic.com> | The compiled checker reduces each formula once and answers repeated exclusions and type lookups from memos; a test guard
- `d2fe4e1d97` 10-16 17:29 | Claude <noreply@anthropic.com> | Syntax tree nodes hash from their class's name, not the JVM's identity hash, so the checker's output keeps one order
- `c23b85fdc2` 10-16 17:32 | Claude <noreply@anthropic.com> | The compiled checker reads a type's abstract functional methods, and reports a broken bound at each call
- `9879d43860` 10-16 17:37 | Claude <noreply@anthropic.com> | Walk reads two generic declarations each over its own instances, takes an if clause only as a Boolean or a Maybe, and re
- `07c83a40ae` 10-16 18:01 | Claude <noreply@anthropic.com> | Fold the review's corrections
- `464159846f` 10-16 18:26 | Claude <noreply@anthropic.com> | Climb batch 16's repair after the merged-diff review: Appendix I's two sentences on walk's generic pairs, and walk's loa
- `7a58250bfe` 10-16 19:13 | Claude <noreply@anthropic.com> | FACTS and POSITIONS after climb batch 16's landing and the probes of 2026-10-16
- `2b1cd8e639` 10-17 17:35 | Claude <noreply@anthropic.com> | The compiled checker reads a where clause's trait constraint as a bound, and the library's generic distribute, identitie
- `24db899faa` 10-17 17:38 | Claude <noreply@anthropic.com> | AnyList's comprises clause is live: the checker opens a type where-clause variable at a call, walk binds it at load, and
- `6d187d0697` 10-17 17:41 | Claude <noreply@anthropic.com> | Walk's load check reads every pair of generic declarations on its declared domains by the checker's rules, and refuses t
- `743eb52862` 10-17 17:44 | Claude <noreply@anthropic.com> | Walk infers a generic dotted method's own static arguments, alone or among its receiver's overloads, and chooses it on i
- `091ec54dfd` 10-17 17:46 | Claude <noreply@anthropic.com> | The compiled checker takes a left-out return type from the api declaration of the function's own parameter types, names 
- `21dce21481` 10-17 18:19 | Claude <noreply@anthropic.com> | Fold the review's corrections
- `65c0cc4639` 10-17 18:55 | Claude <noreply@anthropic.com> | Record the gate's tables and the microGPT walk check
- `7fd287cec1` 10-17 19:34 | Claude <noreply@anthropic.com> | FACTS: climb batch 17's landing review routed, 13 entries rewritten
- `372b9bf6a3` 10-18 03:11 | Claude <noreply@anthropic.com> | The compiled checker reads conditional extension, and a list is ordered where its elements are totally ordered
- `396e4ed8da` 10-18 03:15 | Claude <noreply@anthropic.com> | The compiled checker checks a where clause's constraints where they apply: at a dotted call, at a call through a where-c
- `5262a2412a` 10-18 03:17 | Claude <noreply@anthropic.com> | Walk reads a trait's generic method's bounds and coercion targets where the trait declares them, and names the overloadi
- `7d6c658813` 10-18 03:43 | Claude <noreply@anthropic.com> | Fold the review's corrections
- `5b11849c6f` 10-18 04:18 | Claude <noreply@anthropic.com> | Climb batch 18's repair after the merged-diff review: a declaration's header is checked without a conditional extension'
- `e51759f578` 10-18 04:41 | Claude <noreply@anthropic.com> | Record the gate's tables and the microGPT walk check
- `9332e8ec0d` 10-18 04:57 | Claude <noreply@anthropic.com> | FACTS: climb batch 18's landing routed into the entries it made stale
- `e043ba41f8` 10-19 22:33 | Claude <noreply@anthropic.com> | Haiku post-mortem, D.2.3: F-245 takes the sort's 205 errors and 253 at d212b2c1f
- `14e91723f2` 10-20 02:45 | Claude <noreply@anthropic.com> | Walk and the compiled checker read exclusion between two declarations with static parameters over the whole parameter ty
- `4190069c4d` 10-20 02:47 | Claude <noreply@anthropic.com> | An object or trait whose extends clause names Any alone extends Object, String's two || members over Any convert by the 
- `25b55a1a1c` 10-20 03:11 | Claude <noreply@anthropic.com> | Fold the review's corrections
- `cf4ec59ea0` 10-20 03:26 | Claude <noreply@anthropic.com> | Climb batch 19's repair after the merged-diff review: row 788 named in Appendix I's Effect of "Overloading with static p
- `ebd39a6bd0` 10-20 03:31 | Claude <noreply@anthropic.com> | Record the gate's tables and the microGPT walk check
- `36d53bdd68` 10-20 03:59 | Claude Opus 5.5 <noreply@anthropic.com> | FACTS: F-260, the array sites by the library's own devices; F-261 and F-262 from the item 58 judgement; boot note
- `273ed00db1` 10-20 05:38 | Claude Opus 5.5 <noreply@anthropic.com> | FACTS: F-35, where the api's dead sizes came from
- `5ad4a9957d` 10-20 08:38 | Claude <noreply@anthropic.com> | Every integer power answers its base's own type, and a negative power raises where the result is no integer
- `444f370184` 10-20 08:42 | Claude <noreply@anthropic.com> | The array sites by the library's own devices, with decision E's diff: rung A's record folded
- `63e1a6eb1e` 10-20 09:07 | Claude <noreply@anthropic.com> | Fold the review's corrections
- `510fac4597` 10-20 09:16 | Claude <noreply@anthropic.com> | Record the gate's tables and the microGPT walk check
- `bd33a2f8bd` 10-20 13:03 | Claude <noreply@anthropic.com> | Climb batch 20's routing: item 18 landed, item 19 batch 21's candidates; his answers' items moved; review list items 195
- `6b560762f7` 10-22 08:30 | Claude Opus 5.5 <noreply@anthropic.com> | POSITIONS: the audit's groups 1 to 7 and the clarity pilot's ten entries applied, at his word of 08:19 UTC (P-16 and P-1
- `09e1338df3` 10-22 09:34 | Claude Opus 5.5 <noreply@anthropic.com> | FACTS: the calibration's three entries applied as judged (F-151 reworded, F-263 and F-264 reorganized; F-261 and F-262 k
- `0ae072be72` 10-22 11:56 | Claude Opus 5.5 <noreply@anthropic.com> | FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)
- `bb39dbee3c` 10-22 12:03 | Claude Opus 5.5 <noreply@anthropic.com> | FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)
- `16bbe6072d` 10-22 12:06 | Claude Opus 5.5 <noreply@anthropic.com> | FACTS: clarity chunks f9 to f12 applied as judged (f10 before f9 for F-203; three entries held)
- `e06bd068e7` 10-22 12:13 | Claude Opus 5.5 <noreply@anthropic.com> | FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared of the held splits' 
- `3822898328` 10-22 12:37 | Claude Opus 5.5 <noreply@anthropic.com> | POSITIONS and FACTS: the scrape, at his word of 2026-10-22: state words, PLAN and review-queue pointers deleted from 65 
- `4d7df29c3b` 10-22 22:14 | Claude Opus 5.5 <noreply@anthropic.com> | POSITIONS follow-up applied at the curator's word: 22 POSITIONS entries and F-78, F-137, F-270 changed in place as draft
- `557cabb040` 10-23 16:45 | Claude <noreply@anthropic.com> | String's four concatenation operators become top-level operators, with the library's known meets beside them
- `64fa505c4e` 10-23 16:49 | Claude <noreply@anthropic.com> | The overloading check's exclusion test reads a self-typed trait's self and the static parameters' bounds
- `1538873603` 10-23 16:53 | Claude <noreply@anthropic.com> | The library's index parameters are bounded by Index, and a tuple of indices is an Index on both paths
- `ff19305cca` 10-23 16:55 | Claude <noreply@anthropic.com> | Array2 and Array3 slices based above zero read their own elements, and List extends Equality at every element type
- `bdf83c1d15` 10-23 17:30 | Claude <noreply@anthropic.com> | Fold the review's corrections
- `04b009628a` 10-23 19:52 | Claude Opus 5.5 <noreply@anthropic.com> | Climb batch 21's routing, run 1: item 19 landed, 21b being prepared; items 38 and 59 to PLAN-history, item 61 moved; the
- `108ab82d63` 10-23 22:41 | Claude <noreply@anthropic.com> | The compiled checker checks the overloading of every symbolic operator, with the AnyList crash, an api's operator set re
- `031c38bbcf` 10-23 22:45 | Claude <noreply@anthropic.com> | The export check matches an api's members by name and header and reads abstract, and FortressLibrary's api states its co
- `5e60e356a4` 10-23 22:47 | Claude <noreply@anthropic.com> | The team demos run to their end under walk, Generator22D's rects halving with DIV and trips' generator ordered as itself
- `7341a2ad8f` 10-23 23:37 | Claude <noreply@anthropic.com> | Fold the review's corrections
- `08c95c7087` 10-24 00:36 | Claude Opus 5.5 <noreply@anthropic.com> | Climb batch 21b's routing: item 19 landed, the last-5 batch next; the review's findings and defaults filed; F-240, F-34;
- `8dd64e8fca` 10-24 03:39 | Claude <noreply@anthropic.com> | FortressLibrary's api states its component's last members at the component's headers, all but String's
- `bd00ad997d` 10-24 03:43 | Claude <noreply@anthropic.com> | Row 731's three library sites write their static argument, and __bigOperator2's fused arm casts its result to O0
- `c8e013fafa` 10-24 03:46 | Claude <noreply@anthropic.com> | String's api writes abstract on its bodyless and undeclared members, and the string objects define the four members it a
- `2bff2fe237` 10-24 04:34 | Claude <noreply@anthropic.com> | Record the gate's tables and the microGPT walk check
- `89d4888722` 10-24 04:39 | Claude Opus 5.5 <noreply@anthropic.com> | F-53 at climb batch 22's gate: the distance 0 and the count 0, the five it cleared named by their entries
- `e0ec620a90` 10-24 05:23 | Claude Opus 5.5 <noreply@anthropic.com> | Climb batch 22's routing: phase 3 at its exit, phase 4's natives next on his go; the review's findings and defaults file
- `e21ab5389e` 10-24 15:33 | Claude Opus 5.5 <noreply@anthropic.com> | The phase 3 exit review's audit filed in the record: the ledger and FACTS
- `081099714b` 10-24 15:34 | Claude Opus 5.5 <noreply@anthropic.com> | F-281: row 782 measured, not latent
- `e15da7608b` 10-24 16:32 | Claude Opus 5.5 <noreply@anthropic.com> | The AnyIntegral comprises-where probe filed: row 831, notes on rows 804 and 487, F-121
- `edbd0d4f5b` 10-25 19:11 | Claude Opus 5.5 <noreply@anthropic.com> | Row 816 decided: P-158, a member that an api writes abstract is declared in the component
- `0d2206c5fe` 10-26 08:56 | Claude Opus 5.5 <noreply@anthropic.com> | The foundations review's findings filed: rows 832 (tuple-typed dotted method) and 833 (walk cannot run the checker), row
- `8c99e258ef` 10-29 13:02 | Claude Fable 5.1 <noreply@anthropic.com> | POSITIONS corrected from the phase 3 exit review, each finding in its home, at his yes of 12:5x UTC on 10-29: sixteen en
- `bb39251566` 10-30 01:18 | Claude <noreply@anthropic.com> | The export check reads every top-level operator under its declared name, and the library's 9 operator headers match
- `96fcd051f0` 10-30 01:23 | Claude <noreply@anthropic.com> | List's two imports enter the distance stage and pass the checker: CovariantCollection by its own api and arms, OneShotFl
- `1bc0a9083f` 10-30 01:26 | Claude <noreply@anthropic.com> | fortress compile bounds a type parameter declared without a bound by Any, as walk does, and the distance stage runs unde
- `cc47b637d8` 10-30 01:34 | Claude <noreply@anthropic.com> | The export check counts every api member again, and the library's components declare the 12 members their apis write abs
- `f8bb64872b` 10-30 02:16 | Claude <noreply@anthropic.com> | Fold the review's corrections
- `b81d86b756` 10-30 02:48 | Claude <noreply@anthropic.com> | Record the gate's tables and the microGPT walk check
- `6985743ced` 10-30 03:40 | Claude Opus 5.5 <noreply@anthropic.com> | FACTS after climb batch 22c's landing, by its post-batch review's finding 4: F-240 at 22c's gate (count about 170 s, dis
- `98b04d371e` 10-30 05:43 | Claude <noreply@anthropic.com> | The compiled path reads a builtinPrimitive body naming a helper of nativeHelpers as a call of that helper, and refuses a
- `640acb4a17` 10-30 06:05 | Claude <noreply@anthropic.com> | Walk loads a builtinPrimitive string that names a static helper of nativeHelpers, and ZZ32's first family of bindings mo
- `d836122e26` 10-30 06:42 | Claude <noreply@anthropic.com> | Fold the review's corrections
- `df71bc585e` 10-30 06:55 | Claude <noreply@anthropic.com> | Record the gate's tables and the microGPT walk check
- `b5103253a4` 10-30 07:11 | Claude Opus 5.5 <noreply@anthropic.com> | FACTS after climb batch 23's landing: F-32 at the planner's count of 449 live bindings (154, 59, 158, 78), the 24 IntLit
- `1e6a93a045` 10-30 07:39 | Claude Opus 5.5 <noreply@anthropic.com> | F-240 at climb batch 23's gate, by its post-batch review's finding 3: the count stage about 155 s by the gate's call tim
- `c040df4881` 10-30 09:39 | Claude Opus 5.5 <noreply@anthropic.com> | P-26: the POPL 2019 paper with its technical report, the team's last word and work, kept in Papers/ with their other pap
- `70e335bf12` 10-31 09:21 | Claude Opus 5.5 <noreply@anthropic.com> | FACTS from the helper-calls probe (999a1f6d2): F-301, a native helper's call through its generated wrapper, inlined whol
- `5ecb7a841b` 10-31 15:14 | Claude <noreply@anthropic.com> | Float's 30 native bindings name their static helpers, and walk carries a declared Float in a double
- `71249bf556` 10-31 15:15 | Claude <noreply@anthropic.com> | CHOOSE on ZZ32 and ZZ64: the helpers raise IntegerOverflow past their tables and give each call its own scratch array, a
- `3308aad550` 10-31 15:17 | Claude <noreply@anthropic.com> | ZZ64's 20 and ZZ's 16 native bindings name their static helpers, so their DIV by zero raises DivisionByZero under walk
- `ca14986282` 10-31 15:18 | Claude <noreply@anthropic.com> | The small rest's eight native bindings name their static helpers: Long's and BigNum's string getters, NN32's and NN64's 
- `9f65d60e2a` 10-31 15:20 | Claude <noreply@anthropic.com> | Walk's native loader is told the type that declares a method, and refuses at load a helper bound in a method of a type t
- `c324b841c9` 10-31 15:23 | Claude <noreply@anthropic.com> | The code generator compiles a function, method, object or trait whose own header carries a where clause, and keeps its r
- `b71495ca44` 10-31 15:29 | Claude <noreply@anthropic.com> | The compiled path's rewrite composes a native binding over NN32, NN64 or Char with the six transfer helpers, and 76 such
- `84ae87a276` 10-31 15:59 | Claude <noreply@anthropic.com> | Fold the review's corrections
- `25238e60c3` 10-31 16:10 | Claude <noreply@anthropic.com> | Record the gate's tables and the microGPT walk check
- `be3b07aacc` 10-31 17:10 | Claude Opus 5.5 <noreply@anthropic.com> | FACTS and POSITIONS after climb batch 24's landing: the entries that the post-batch review found false, stale or past th
- `d9f2fdfd0a` 11-02 02:41 | Claude Opus 5.5 <noreply@anthropic.com> | Climb batch 24's landing, the four items the record-landing replay found and main lacked: F-309 added, F-220's stale sen
- `17b9f6b58b` 11-03 02:35 | Claude <noreply@anthropic.com> | Float's bit and rounding operations and fromRawBits call 28 new simpleDoubleArith helpers that both paths can run
- `43f1300228` 11-03 02:38 | Claude <noreply@anthropic.com> | RR32's 49 bindings call 46 new helpers of a new class, simpleFloatArith, that both paths can run
- `d2501afefe` 11-03 02:39 | Claude <noreply@anthropic.com> | The asFloats of Int, RR32, NN32, Long and BigNum answer RR64 and call static helpers, two of them new
- `41830b90cf` 11-03 02:41 | Claude <noreply@anthropic.com> | REM and MOD by zero on ZZ32, ZZ64, NN32, NN64 and ZZ throw DivisionByZero under walk, through ten new helpers (rows 336 
- `f7a33b97bc` 11-03 02:44 | Claude <noreply@anthropic.com> | The compiled path prints NN32 and NN64 unsigned and negates NN64 by wrapping; UnsignedLong's three, NN64's prefix DOTMIN
- `d85bac271c` 11-03 02:47 | Claude <noreply@anthropic.com> | GCD, LCM, partitionL, NN64's and ZZ's CHOOSE, ZZ's cmp and nanoTime call 18 new nativeHelpers helpers; Appendix I's Effe
- `8833d89c5f` 11-03 02:49 | Claude <noreply@anthropic.com> | The code generator compiles an extends clause at Any, a try with a forbid clause and a function declared test (rows 820,
- `20eab40367` 11-03 03:32 | Claude <noreply@anthropic.com> | Fold the review's corrections
- `11d2d8764b` 11-03 03:49 | Claude <noreply@anthropic.com> | Record the gate's tables and the microGPT walk check
## 5. What was done with the reports

Where I searched, and what the sources cover:

- The coordinating session's transcript, `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`: 141 MB; its first line is stamped 2026-11-07T06:44:23Z and its last 2026-11-24T07:47Z. **It holds nothing before 2026-11-07.** The coordinating sessions of 10-13 to 11-07 are not in this file. `origin/transcripts` holds one session's transcript in parts (`bdff267d-...jsonl.parts/000.jsonl`, `001.jsonl`), stamped 2026-08-18 to 2026-09-17: outside the window; not searched further.
- Searches: `grep -c "over 600\|600 characters"` gives 105 lines of the transcript; parsed into blocks, 72 blocks match: 43 tool results, 14 tool uses (briefs and notes the coordinator wrote), 13 user-role texts (agent messages, `[Subagent hand-back]` reports and the curator's), 2 assistant texts. By content, 25 of the matching lines are the text of the rule ("Keep an entry near 600 characters. This is a check, not a cap ...") read by a tool, 7 are the README sentence on `lengths.py`, and 9 are `record.py` output (`reported, not failing: ... size: N entries over 600 characters: ...`). Below are 25 hits that report entries over 600, spread over the window.
- The Workflow journals under `.../subagents/workflows/wf_*/journal.jsonl` (28 run folders; the journal events carry no timestamp, only `type`, `key`, `agentId`, `label`, `phase`, `result`). `grep -c` of "over 600" or "600 characters" gives hits in 14 of the 28 journals; they are the entries writers', checkers' and judges' results.
- I ran no search on `HELD.md` or `BOOT.md` history for this slice.

Hits (who wrote it; the words; what the next action in the transcript was). Times are UTC; "line" is the transcript line.

| # | time, line | who wrote it | the words (cut by me, exact otherwise) | next action in the transcript |
|---|---|---|---|---|
| 1 | 2026-11-08T11:50:41, 3077 | a worker's result (the sorter of climb batch 28's record landing, as a hand-back) | "**FACTS (48):** each of the 11 entries the batch added or changed gets a pass. All 11 are over 600 characters. 15 sentences were made false." | the coordinator read the result file and ran `git diff --stat` (3083, 3086); no edit or message on length |
| 2 | 2026-11-08T23:53:05, 5284 | a worker's result (a record writer that wrote P-173 to P-175) | "**Over 600 characters:** P-173 (3067) and P-174 (3078) carry the design's rule, conditions and reason (Q1, Q2). The others carry pointers that a reader needs." | the coordinator ran `record.py check` and pushed at 23:53:24 to 23:53:32 (5290 to 5303); nothing on length |
| 3 | 2026-11-08T23:53:25, 5291 | tool output, `record.py check --base 51aa28922e` run by the coordinator's Bash call at 5290 | "reported, not failing: FACTS.md: size: 228 entries over 600 characters: F-7 818, F-11 848, F-12 1308, F-18 1265, ..." (POSITIONS: 87) | `git push --atomic` at 23:53:32; no edit |
| 4 | 2026-11-09T12:53:28, 6225 | a worker's result (climb batch 29's record landing, hand-back) | "The pass on each of the 37 entries the batch added or changed (36 are over 600 characters). The gate figures in F-53 and F-240 are kept as the commit stage wrote them." | `PushNotification` ("Batch 29's record update finished ...") and an `Agent` launch "Fable: fidelity of the numeral design" (6237, 6239); nothing on length |
| 5 | 2026-11-13T23:14:56, 12390 | a worker's result (a record writer for the curator's two decisions of 11-10) | "Entries of mine over 600 characters, each kept for the sentences that stop a worker deciding wrong: P-46 2454, P-49 982, P-173 3534, P-58 1674, P-177 900." | the coordinator wrote P-177 with `record.py set` at 23:15:38 and edited `BOOT.md`; no message on length |
| 6 | 2026-11-13T23:15:40, 12413 | tool output of that `record.py set` | "POSITIONS.md: size: 89 entries over 600 characters: P-7 844, P-9 1279, P-10 630, ..." | `BOOT.md` edit (12419) and a `SendMessage` to a worker about the numeral rule (12428); nothing on size |
| 7 | 2026-11-13T23:45:28, 12519 | a worker's result (the second record writer) | "Every new entry is over 600 characters, between 770 and 2,000. The sentences that keep them long are the scope limits (scratch, one run, not run) and the row pointers." | push and `BOOT.md` edit (12524, 12530); nothing on length |
| 8 | 2026-11-16T01:42:38, 14415 | tool output of the coordinator's `record.py set P-178` | "FACTS.md: size: 252 entries over 600 characters: F-7 818, F-11 848, F-12 1308, F-18 1413, F-19 2028, ..." (POSITIONS: 90) | a record worker for P-178 launched at 01:43:22 (14432); nothing on size |
| 9 | 2026-11-16T07:19:35, 15534 | a judge's result (climb batch 32's record landing, read from the workflow's output) | "Entries past 600 characters that grew: F-58, F-221, F-240, F-280, F-334, F-341, F-362, F-364, F-365, F-367, F-368, F-369, P-173. I applied each: ..." | the coordinator committed probe reports and answered the curator (15548 to 15553); nothing on length |
| 10 | 2026-11-16T15:39:06, 17213 | tool output of a `record.py` call | "FACTS.md: size: 261 entries over 600 characters: F-7 818, ..." (POSITIONS: 91) | a worker briefed for the specification's chapter 2 (17218, 17220) and a held-list line (17227); nothing on size |
| 11 | 2026-11-17T08:31:25, 19316 | a checker's result (climb batch 31's record landing; journal `wf_0ba70a19-5f8`, event 9) | "The 11 entries already over 600 that grew each grew only by the clauses their change owes. No new or changed sentence is over 600 characters." | the coordinator read the run's result and committed an orientation regression change (19318 to 19333); nothing on length |
| 12 | 2026-11-17T12:35:51, 20247 | tool output of a `record.py` call (P-33 write) | "FACTS.md: size: 269 entries over 600 characters: F-7 818, ..." (POSITIONS: 90) | P-33 commit at 12:36:14 (20260); nothing on size |
| 13 | 2026-11-18T09:19:08, 23723 | the sort stage's result of climb batch 33b's run (workflow output) | "FACTS entry (F-N): the pass on 22 entries, 9 past 600 characters, 1 size line of weight none, F-34, F-352, ..." | two triggers deleted and a `git diff` of the regression key (23733 to 23735); nothing on length |
| 14 | 2026-11-18T09:36:17, 23857 | tool output of the coordinator's `record.py set F-34` (error: "34 is not an entry number such as F-87") | "POSITIONS.md: size: 90 entries over 600 characters: P-7 844, P-9 1279, ..." | the coordinator corrected the call and committed F-34 at 09:36:37; nothing on size |
| 15 | 2026-11-18T15:26:35, 24474 | tool output of a `record.py` call (F-377 write) | "FACTS.md: size: 280 entries over 600 characters: F-7 818, F-9 705, ..." (POSITIONS: 90) | the coordinator committed F-377 and reported the probe (24478 to 24490); nothing on size |
| 16 | 2026-11-23T08:48:33, 27413 | tool output of a `record.py` call (P-180 write) | "FACTS.md: size: 285 entries over 600 characters: F-7 818, F-9 705, ..." (POSITIONS: 91) | P-180 commit (27424); nothing on size |
| 17 | 2026-11-23T16:07:53, 28591 | a judge's result (climb batch 35's record landing, as it stopped on `queue-check.py`) | "**Long entries:** every entry over 600 characters that grew did so only by the clause its change owes, checked against `lengths.py` and the word diffs." | the coordinator ran `queue-check.py` (28593 to 28606) on the queue failure; nothing on length |
| 18 | 2026-11-23T22:58:22, 29664 | a judge's result (climb batch 35b's record landing) | "Held, both by the rule on entries past 600 characters that grow: **C8, F-404:** ... **C9, F-405:** it grew by 325 characters, from 1,613 to 1,938, against an owed clause of 276." | the coordinator checked the run's `update.py` and `record-landing.js` by `grep` (29670 to 29687); no run of the two held changes appears in the 60 transcript lines after it |
| 19 | 2026-11-23T23:52:09, 30004 | tool output of a `record.py` call (P-103 write) | "POSITIONS.md: size: 91 entries over 600 characters: P-7 844, ..." | commit of P-103 (30009) and a reply to the curator; the next hand-back and a `Read` of `record-growth.png` (30022 to 30024); nothing on size |
| 20 | 2026-11-24T07:05:22, 31594 | the coordinator's own text to the curator | "299 entries are over the 600-character limit, and the middle entry is 1.2K. The cause: the record-landing workflow adds and rewrites entries at every landing. It writes in test lists, row lists, line numbers and dates. Nothing takes text out, and the 600-character check only reports." | the curator's next messages (07:08, 07:11 and 07:13) were on other texts; his reply on this proposal is 07:35:17 (31852): "reject it" |
| 21 | 2026-11-24T07:35:55, 31869 | the coordinator's own text to the curator | "The rules already exist: entries near 600 characters, detail in the reports, dates and repairs in the history, and a landing check that holds an entry that grew. FACTS still grew from 93K to 427K. I put it to you as a new problem, and it isn't one." | the boot-note edit at 07:35:40 (31856) precedes this text; then the compaction and the light boot; five scouts launched at 07:42 to 07:44 (32079 to 32096) |
| 22 | 2026-11-24T07:37:51, 31878 | a scout's result (the record-size scout, hand-back) | "FACTS: 93K on 10-14, 221K on 10-23, 268K on 11-01, 323K on 11-10, 374K on 11-17, 427K now. ... 299 of 339 entries are over 600 characters; the median is 1,198 and 91 are over 1.5K." | the coordinator's compaction and boot (31856 to 32057) |
| 23 | journal `wf_f428fe5b-2d0` (climb batch 31b's run), event 9, no timestamp | the checker's result | "**Form (29)** - 28 entries over 600 characters get no question in `entries-report.md` for the sentences past 600: F-24, F-74, F-79, F-122, F-262, F-291, F-296, F-305, F-306, F-307, F-308, F-310, F-311, F-313, F-314, F-323, F-327, F-328, ..." | event 11, the entries writer's fix round: "**Every \"no past-600 question\" failure** (C1 to C79): `entries-report.md` now has a section that gives, for each entry over 600 characters, the question that keeps each sentence. None of the kept entries grew." |
| 24 | journal `wf_ec454fa0-c7d` (climb batch 35's run), event 5 and 11, no timestamp | tool output inside the writers' result (`checks.sh` summary) | "lengths.py: pass - lengths.py: already over 600, and grew: F-323 (+70), F-324 (+89), F-342 (+64), F-345 (+68), F-351 (+6), F-396 (+217), F-397 (+130), F-398 (+222), F-399 (+30), F-400 (+1), F-401 (+23), P-40 (+70), P-173 (+55), P-174 (+274)" (event 11: F-396 +217, F-397 +174, F-398 +254, P-174 +270) | the judge's final message (event 13): "every entry over 600 characters that grew did so only by the clause its change owes" |
| 25 | journal `wf_b580ea72-15e` (the record-landing run after climb batch 36's run 1; it began at 07:23 and its journal was last written at 07:40 UTC on 11-24), event 3, no timestamp | the sorter's result | "Nine entries grew past 600 characters (F-405 grew by 694)." | outside the sixteen runs; the run was still running when the transcript ends |

Check on the count: rows 1 to 22 come from the transcript; 23 to 25 from journals; 25 rows in all.

### Every time the coordinator's text to the curator named FACTS's size or the number of entries over 600

Found by a regex over the assistant text blocks of the coordinating session (`isSidechain` false; pattern: "entries over", "over 600", "past 600", "600 char", "FACTS" near "NNK", "FACTS" near size/grew/long/big, "size of FACTS"), `scratchpad/gia/co.py`. The transcript starts 2026-11-07, so earlier replies are not covered. Eight blocks matched; six of them name the size:

- 2026-11-16T13:21:06 (line 16796), on why its context was large: "After the compaction I started at 132K. The full boot took it to 563K, so it cost about 430K. By size: the facts about 155K, the index of notes about 155K, the held list about 55K, your decisions about 50K, the rest small." And: "The record has grown: on 20 October the index alone cost 84K a boot; now it costs almost twice that." It named no count of entries over 600 and no rule on entry length.
- 2026-11-17T06:30:30 (line 19028): "The script now exists: `explorations/coordinator/tools/positions-facts.sh`. It prints every fact that POSITIONS cites, whole: 47 facts, about 29K tokens, in three parts." (the size of the facts that POSITIONS cites, not of FACTS; line 18944 at 06:28:01 says "48 facts ... about 29K tokens").
- 2026-11-24T00:30:01 (line 30455), a list of what the boot cost: "**73K:** POSITIONS whole (42K) and the FACTS entries it cites (31K). That's your boot order of 11-17."
- 2026-11-24T07:05:22 (line 31594), after the curator's "Full boot is now 590k of your context" (31569, 07:03:37): "FACTS and INDEX are roughly 360K of the 590K." ... "**FACTS** is 427K characters in 339 entries. On 14 October, right after the last consolidation, it was 93K. It has grown 4.6 times in six weeks. 299 entries are over the 600-character limit, and the middle entry is 1.2K. The cause: the record-landing workflow adds and rewrites entries at every landing. It writes in test lists, row lists, line numbers and dates. Nothing takes text out, and the 600-character check only reports." Its proposal: "**Clean FACTS.** The clarity workflow judges every entry and rewrites only those that fail its checks. ... Target about 200K." and "**Stop the regrowth.** The record-landing workflow's writer keeps each entry near 600 characters and puts the detail in the report. That changes the workflow's brief, so it needs your yes."
- 2026-11-24T07:35:55 (line 31869), after the curator's rejection (31852, 07:35:17, quoted in his own words: "Regarding your proposal on splitting the index and trimming the facts, reject it. Because specifically the part about stopping the growth, like you are treating this as a new problem. It is reoccurrence of the old problem."): "The rules already exist: entries near 600 characters, detail in the reports, dates and repairs in the history, and a landing check that holds an entry that grew. FACTS still grew from 93K to 427K."
- 2026-11-24T07:45:00 (line 32140): "FACTS was 352K characters on 09-30, 90K after the October consolidation, and 428K today, so this is the second time it has grown this way."

Two further matches are the coordinator's tool-written boot-note text, not text to the curator: line 31709 (07:22:18): "Proposed at 07:0x (INDEX split; FACTS cleaned by the clarity workflow with a pilot page; the record-landing writer held near 600 characters): no answer yet, so it waits." and line 31856 (07:35:40): "the record-landing workflow's `lengths.py` and judge, which hold an entry over 600 that grew; the consolidation of 2026-10-13, 93K after it".

Not found: any assistant text between 2026-11-07 and 2026-11-24T07:05 that named the number of FACTS entries over 600 to the curator, or that named `record.py check`'s size report as a finding (searched with the regex above and with the 105-line grep). The coordinator's earlier texts about size (the 11-16 and 11-24T00:30 ones) are about its own context cost. The pattern does not catch a reply that wrote the size in other words (for example "the record is big"); I did not read the whole transcript.

### Where the coordinator was told to read these reports

- The `lengths.py` sentence, in the README's section on the checks, which the coordinator read many times (the README text was read by a tool in 7 lines of the transcript, e.g. 2825 at 2026-11-08T09:22, 6018, 7897, 10344, 18784, 22507, 31758).
- README, "Landing its result", on the coordinator's review of a landing: "The coordinator then reviews the commits on `main`: `git show --stat` of each commit the result's `land` names, and the landed `diff.md`, not the record. It asks whether it would have done anything differently, and names each POSITIONS change to the curator, from `diff.md`, as the `coordinator` skill's \"Quiet times\" says. Each held change: run it again, file it in the queue, or leave it." (`record-landing/README.md`, "Landing its result", the last paragraph; the paragraph goes on after this.)
- I did not search the transcript for a re-run of a held change. Part 2 gives what later commits did to each held entry.
