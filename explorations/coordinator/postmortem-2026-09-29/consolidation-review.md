<!-- Review, 2026-09-30, of the consolidations of 2026-09-29 of FACTS.md and POSITIONS.md (base 9355a1d79): did a rewrite leave the live file without something still true and needed; and of the session scratchpad's check scripts: which are reusable checks of the record or of a batch, and where they should live. Written by a review worker on the coordinator's brief, read-only except for this file. Recommendations last. -->

# The consolidations of 2026-09-29, reviewed

## What was reviewed

- FACTS.md: commits `cf1fd15cf`, `5374b3dc3`, `18f548234`, `ea0cd1038` and `fe5eaee2e`; 17 entries rewritten in place, none moved whole. Compared by `git diff 9355a1d79 fe5eaee2e -- explorations/coordinator/FACTS.md`.
- POSITIONS.md: commits `65cc2cce7`, `5777a34f0`, `03f215fe4` and `4bdcb9d20`; 22 entries shortened, 6 moved whole to `POSITIONS-history.md`. Compared by `git diff 9355a1d79 4bdcb9d20 -- explorations/coordinator/POSITIONS.md`.
- `tools/check-verbatim.py` had already shown every base entry verbatim in the file or in its history. The question here was narrower: does the live file still hold what is true and what a coordinator, a batch planner or a worker needs.
- Only the rewritten and moved entries were read, old text beside new. Where a dropped detail might still be current, the tree was read briefly: the ledger, `PLAN.md`, the batch records, the tests directories, the workflow script and its manual. Nothing was measured.

## Part 1: what the live files lost

Verdict first. No crucial loss. Every dropped figure, path and clause that was checked is superseded by a landed rung, held by another live entry, or a go carried out. Six drops leave the live record weaker than it need be. Each is a one-line fix. One of them is a citation the consolidation left dangling.

The losses, all minor:

1. POSITIONS 2026-09-29, "batch N's first run, returned unlanded at 08:14 UTC". Dropped: the routing of the owed tests ("the owed tests go to batch 6.5's second run") and his words for it. The live entry still says rows 447 and 505 are "each owing a link test and an expected-failure run test", and nothing says they were written. They were: climb batch 6.5b's rung E wrote the owed pairs (`compile-ladder/climb-batch-6.5b/RECORD.md`, "For the gate"; `PLAN.md`, the 6.5b defaults). Why it matters: a planner reads an open debt. Fix: after "run test" add ", written by climb batch 6.5b's rung E".

2. `PLAN.md` line 47 cites the POSITIONS entry of 2026-09-26 on the integration review for that review's three checks. That entry moved whole to `POSITIONS-history.md`, so the pointer resolves only in the history. The checks themselves stand in `PLAN.md` and `CLIMB-BATCH-6.md`, so nothing is lost. Why it matters: the record's rule is that every other file points to the entry. Fix: cite `POSITIONS-history.md` or the review itself, `reviews/numeric-hierarchy-integration-review.md`.

3. POSITIONS 2026-09-19, "after climb batch 1 landed". Dropped: "What it said of `floor`/`ceiling` and row 330 is replaced by his decision of 2026-09-21". `process-decisions-review-1.md` still carries its row-330 reading (line 239, the test "stay in RR64" against the specification's integer). Row 330 is open and was decided anew on 2026-09-29 (`floor` returns the float). The chain from the six process decisions to the current decision is cut at its first link. Fix: "its row-330 example is decided by the entry of 2026-09-29".

4. POSITIONS, moved whole: "Recorded 2026-09-26 for the separate OpenAI analysis session". It held a scope: "This authorizes the review and its documentation commits, not a new implementation batch or a change to the agreed route." That session is still a contributor (`PLAN.md` line 72, its boundary for rung C's implementation review, the entry of 2026-09-29 on PLAN item 26). If the scope limit is still meant, it is a standing rule that sat inside a go and now lives only in the history. Fix: one clause in the item-26 entry, or nothing if that entry's boundary replaces it; the coordinator knows which.

5. FACTS, "Therefore "use FortressLibrary for the compiler too" is, in order". It still says "fix or relax the 92 tower errors". The entry that explained the 92 (the `fortress compile Library/FortressLibrary.fss as it is` entry, with its 36, 26 and 26 and the checker's crash) now leaves that to the history. A reader meets 92 unexplained. Fix: "(the 92 of 2026-09-16, in `FACTS-history.md`)".

6. FACTS, "The distance to the switch-over by root cause". The triage note's mapping of error classes to the batches then planned is replaced by "Which batch is to clear which class is `coordinator/PLAN.md`'s". `PLAN.md` does hold the routing that was checked (the integer family, row 432, row 437, the range methods' declared types). No loss. Noted because the running batch 7b's rung L was in that mapping (139 of the flat library's errors and 131 sites), and its manifest holds its own expectation; a planner comparing the batch's result with the triage will need the history.

Checked and not lost, so nobody need check again:

- Rung O's wrapping sites and the five team tests: in FACTS (`LinearCongruential`, `ChunkedSparseArray`, `intPrim` and the rest are there).
- Row 379's expected-failure test promoted: `ProjectFortress/tests/FixedWidthOverflowRungB.fss` exists without the `XXX` prefix.
- Rung T's unrevised passages, "one small follow-up later": filed at `PLAN.md` line 262 and in `Specification/appendices/changes.tex`, "Passages not yet revised".
- The numeral switch's rows: the entry of 2026-09-29 names rows 79, 443, 437's walk half, 486, 395, 511, 454 and 517. Row 432, in the old 2026-09-27 list, is placed by the judgement and by `PLAN.md` line 346 as not the switch's.
- Item 18's judgement, the go dropped from the entry of 2026-09-29 on running a top-tier judgement without asking (10:10 UTC): done; `PLAN.md` R2, row 447, replaced by the paper's instance rule of 2026-09-29.
- The count-table check's new home: `climb-batch-workflow.md` has "After the landing: the coordinator's routing", and `checkerRows` is gone from the script, as the rewrite says.
- The landed-batch movement of the distance and the count, batch by batch: in each batch's `gate/summary.txt` and `RECORD.md`, as the rewrites say.
- The pre-batch-7 copy measurements and the numeral switch's copy A0: overtaken by probe Q, whose entry stands under The checker and the one library.

An observation, not a loss. The cap entry ("The platform stops the session's process after about 12 hours 58 minutes") ends with a clock: the last start 14:37:16 UTC on 2026-09-29, the next stop near 03:35 UTC on 2026-09-30. The clock has moved: `/tmp/env-manager.log` shows eight short stops between 02:21 and 04:39 UTC today, and `uptime -s` a VM start at 04:44:46. The old entry had the same clock, so this is not the consolidation's doing, but a moving number in a FACTS entry is stale after every restart. Better the rule in FACTS and the live number in the boot note only.

A caveat that predates the consolidation. The pending batch's `plan-7b/manifest/lists7b.py` has one key that resolves nowhere, "2026-09-29 paper's instance rule", at the base and now (the consolidation commits' check lines). The launch check would have stopped on it.

The workers' own "kept because unsure" lists, in a line each:

- POSITIONS: "Kept as they stand: S1, the lineage note, S2, the number chapters, the plan, the first to fourth batch-5 answers, answers 6, 9, 11 and 12, the big operators, rung D's stop and the calculi" (3 of 4); "the decisions not yet built ... and the standing rules in his words" (4 of 4); "decisions in force with their unbuilt parts (rows 380 to 383, row 30, row 39's read-only trait, row 40's questions)" (2 of 4). Right by the rule: an unbuilt decision and a standing rule stay whole. The first to fourth batch-5 answers could be cut to date, words and meaning once each is shown built; leaving them costs length only, and the rule sets no size.
- FACTS: "The row 488 variation evidence is kept whole" (2 of 3). Right: row 488 is open, the mechanism is not known, and the evidence is what the next probe starts from.

The 14 FACTS titles the worker found no longer true, kept word for word:

- Keeping them is right. A FACTS entry is cited by its title, and `facts-extract.py` resolves a key as a substring of the normalised title (`want in norm(e.title)`), so a corrected title breaks every key that quotes the old one, in the pending batch's `lists*.py` and in landed records.
- Three of the rewritten entries already handle it in their first clause: "was the measurement of 2026-09-16 ..., and it no longer holds"; "The title's figures are that measurement's, on the tree of climb batch 6's rung R"; "The three leaders it found are cleared". That is the form: the title stays the key, and the first sentence after it says what holds today.
- Recommend: give each of the 14 that first clause where it lacks one, in one commit. Correct a title only where no key in the tree cites it (`grep` for the title's words under `explorations/`), in a commit that also runs the pending batch's lists. No "formerly titled" aliases: one home per thing, and the history has the old text.

## Part 2: the scratchpad's check scripts

Method: `ls` of the scratchpad for `check*`, `verify*`, `*check*`, `*verif*` and `audit/`; the header and the core of each script read. Captures (`.txt`, `.out`), compiled classes and the harness's own files were only identified.

Reusable checks of the record's integrity:

- `check_verbatim.py`: committed as `coordinator/tools/check-verbatim.py`.
- `audit/dropped.py`: for every entry of the history, the sentences not found in the live POSITIONS.md, whitespace normalised. The "what was dropped" report. It is what Part 1 needed and did by hand. Reusable at every consolidation, with the two files as arguments instead of its hard-coded paths.
- `check_cites.py`: every citation of POSITIONS by date and topic in the tree still finds an entry of that date holding the topic words. Its map of citations is hand-written for the 2026-09-27 split, so as it stands it is a one-off. The idea is reusable and would have caught `PLAN.md` line 47, once the map is derived from the tree by a pattern rather than written.
- `keys.py`, run by `checks.sh`: every `positions:` key in the tree's `.py`, `.js`, `.sh` and `.json` files resolved by `facts-extract.py --check`, base against now. Reusable and informational: a landed batch's key is allowed to move to the history.
- `checks.sh`: the consolidation's four checks in one run: check-verbatim against the base; the pending batch's `lists*.py` verdicts unchanged from the base's; the grep for "Corrected 20", "Superseded 20", "superseded by" and "was corrected" in POSITIONS.md; and `keys.py`. Reusable as the consolidation gate once the base and the pending batch's lists are arguments.
- `ledcheck.py`: the ledger, base against head: duplicate row numbers, deleted rows, order, vacant numbers, the column count, and for every row which cells changed and whether by appending. Reusable at every landing.
- `audit/check.py`, `audit/check_pass1.py`: check-verbatim's earlier forms, against two bases and against one. Superseded.
- `audit/near.py`: the nearest match for an entry the verbatim check misses. A debugging aid; superseded by check-verbatim's own output.
- `audit/insert.py`: the one-off that wrote the history's comment lines on 2026-09-27. One-off.
- `verify.py`, `runcheck.sh`: `facts-extract.sh` checked per rung list and per page size against a copy of FACTS (2026-09-27). One-off, since `lists*.py` now checks the keys; the paging part could become facts-extract's self-test.
- `verify_reanchor.py`: after a Specification edit, every `file:line` citation in the notes mapped from the base's lines to the tree's by `difflib` and the moved ones reported. One-off in its constants (the base and eight chapters), reusable in its method: a line-anchor check that `check-index.sh` does not do.

Reusable checks of a batch's integrity:

- `tailcheck.py` (batch 5), `check65.orig.js` (batch 6.5), `checkn-scratch.js` (batch N) and `script-check/` with `parse.js` (batch 7b): the launch check, rewritten for each batch: the manifest block spliced into the script; `node --check`; the launch values refused when unset or wrong; each tail equal to its rung's section 3 of the record word for word followed by its briefing's reasons; the lists against `lists*.py`; no backtick or non-ASCII character in a string an agent reads; the whole spliced script run with the workflow globals stubbed under each scenario. Reusable. It has been rewritten four times because it was never committed.
- `script-check/parse.js`: ten lines that parse a workflow script as the harness does. Reusable as it is.
- `pure-check.js`, `run-check.js`: the script's pure pieces (`isApproved`, `applyLandsOnlyWith`, `pushHeldBy`) on made-up inputs, and the whole script under scenarios with agents answering by label. Reusable as the script's tests when the script changes; the names they grab must follow the script.
- `check.sh` (2026-09-20): step 5 of a gate judgement, the earliest form of the launch check.
- `checker.sh`, `checkfns.sh`: `last_landed_checker_count` and `checker_compare` copied out of the script to test by hand. One-off; the functions live in the script.

Not checks:

- `check-climb-batch-workflow.js`, `check-ladder-workflow.js`, `check-repair-batch-workflow.js`, `check.js`, `check-noS.js`, `check-with-S.js`, `check.mjs` to `check6.mjs`, `final-check.js`, `syntax-check.js`, `wf-check.js`, `wf-check2.js`, `wf-old-check.js`, `wfcheck.js`: copies of a workflow script wrapped in a function for `node --check`. The outputs of a check, not checks.
- `retry-checks/`: copies and captures of the 2026-09-27 stage-wording work. One-off.
- `ucheck/UCheck.java`: a probe of `com.naturalbridge.misc.Unsigned`. A Fortress probe, not a record check.
- `stop-hook-git-check.sh.orig`: a copy of the harness's stop hook.
- Every `check*.txt` and `*.out`: captures.

## Recommendations

Part 1:

1. Apply the six one-line fixes above in one commit whose message names them. Nothing moves.
2. Give each of the 14 titles that no longer hold a first clause stating the present, in the form the three rewritten entries use, and keep the titles as keys. Correct a title only where no key in the tree cites it, in a commit that runs the pending batch's lists.
3. Take the clock out of the cap entry: the rule stays in FACTS; the last start and the next stop live in the boot note only.
4. Resolve or drop the key "2026-09-29 paper's instance rule" in `lists7b.py` before the batch record for 7b is written, since the briefing it names printed nothing for it.

Part 2:

1. One folder for the record's checks, `coordinator/tools/`, where `check-verbatim.py`, `facts-extract` and the gate's tools already are. Move `check-index.sh` in beside them; its two citations, the boot order in `README.md` and the line in `INDEX.md`, change in the same commit. Names `check-<what>`: `check-verbatim.py` (there), `check-index.sh`, `check-dropped.py` (from `audit/dropped.py`, the two files as arguments), `check-cites.py` (the tree's `POSITIONS <date>, <topic>` citations against the live file, the map derived from the tree), `check-ledger.py` (from `ledcheck.py`), `check-keys.py` (from `keys.py`). Six files, each short.
2. A second folder for the batch's checks, `coordinator/tools/batch/`: `check-launch.js` (from `checkn-scratch.js` and `script-check/`, taking the record, the manifest and the lists module as arguments), `parse.js`, and the script's scenario tests (`run-check.js`, `pure-check.js`). Two folders because the batch checks are several files that move together and are run by the launch step, not by the record's rules.
3. A short index, `coordinator/tools/README.md`: one line per check, saying what it verifies, its arguments, its exit code and the rule that runs it. `check-index.sh` treats `tools/` as an evidence directory, so the README needs no `INDEX.md` line of its own; the folder's existing `INDEX.md` line gains a clause naming the checks.
4. Which rule runs each, written into `README.md`, "How they are kept", and into the workflow manual:
   - `check-verbatim.py` and `check-dropped.py`: before every consolidation commit. The dropped-sentences output is read, and the commit message says why each dropped sentence may go.
   - `check-cites.py` and `check-keys.py`: after every rewrite that moves or shortens a POSITIONS or FACTS entry, and before every launch, with the pending batch's `lists*.py`.
   - `check-index.sh`: at boot, as now, and in the commit that adds or moves a note.
   - `check-ledger.py`: at every landing, base against head, in the commit stage or the coordinator's routing after it.
   - `check-launch.js`: before every launch, on the script and the manifest as they will be launched; its captures stay in `tmp/`.
5. Delete the rest of the scratchpad's `check*`, `verify*` and `audit/` files once the six record checks and the batch checks are committed. Nothing there is needed afterwards.
