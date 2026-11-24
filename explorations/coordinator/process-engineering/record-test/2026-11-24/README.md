<!-- The record test's twelve scenarios and key for FACTS as it stood on 2026-11-24, to judge the consolidation of that record with the October kit's reader's and grader's briefs. -->

# The record test for the record of 2026-11-24

The October kit, one folder up, tests a consolidation of the record. Its ten scenarios rest on entries as they stood on 2026-10-13, and they no longer fit. This folder gives twelve new scenarios and their key, on FACTS as it stood on 2026-11-24 (339 entries). The briefs, `fill.py` and the steps are the kit's.

## The files

- `questions.md`: the twelve scenarios. A `{FACTS n}` line stands for the entry numbered `F-n`.
- `key.md`: for each scenario, the right decision, the sentences that it rests on by entry number, where the other facts live, whether a pointer must be followed, the wrong answers, and the rubric (decision 0 to 2, sources 0 to 1). The total is 36.

## The entries, by scenario

Each scenario rests on these entries of FACTS. None of them is among the entries that today's checks found false (`coordinator/postmortem-2026-11-24-record-regrowth/evidence/stale-claims.md`).

| Scenario | Entries | Section |
|---|---|---|
| 1. Two failures that the suite does not show | F-99, F-107 | The harness and the gate |
| 2. A closed family covered by a generic body | F-145, F-147 | Landed semantics |
| 3. A rung on the transaction check of `var` fields | F-374, F-179 | Landed semantics; The territory map |
| 4. A gate that reads one error and runs slow | F-240, F-43 | The checker and the one library |
| 5. Walk's departures from the instance rule | F-141, F-143 | Landed semantics |
| 6. An empty sum under walk | F-228, F-221 | Landed semantics; The checker and the one library |
| 7. A rung on `label` and `exit` | F-373, F-401 | Landed semantics |
| 8. An array of `Number` | F-229, F-151 | The library's arrays and algebra |
| 9. A rung on row 808 | F-279, F-264 | The library's arrays and algebra |
| 10. A proposal to make covariance legal | F-166, F-47, F-167 | The specification and the repository's lineage; The checker and the one library |
| 11. Parallel reductions after the switch-over | F-350, F-356, F-355 | Execution model |
| 12. A walk refusal test that passes on the base | F-383, F-103 | The harness and the gate |

That is 26 entries. They are of several shapes:

- Entries that hold several subjects: F-374 (a `var` field's cell, the atomic expression, a value object's `var` field), F-47 (the refused examples, their alternatives, `covariant`), F-145 (walk's cover, its limits, generic objects, the compiled checker's split).
- Entries that carry a defect with its ledger row: F-279 (row 808), F-229 (row 729), F-145 (rows 665, 725, 728), F-373 (rows 1040 to 1042, 890).
- Long entries whose answer turns on a condition or a limit deep inside: F-240 (load), F-141 (the rung's defaults D3 and D5, row 589), F-228 (which declared types direct a reduction), F-373 (three answers the curator has not decided), F-350 ("by reading, not run").
- Entries whose claim another entry repeats: F-401 and F-373 (row 1041); F-221 and F-228 (row 705); F-99 and F-107 (the suites' pin); F-141, F-143 and F-228 (the open F-bounded parameter).
- Short sound entries: F-179, F-43, F-103, F-383.

Scenarios 3, 5, 6, 7, 8 and 9 need a pointer followed: to a ledger row, to `PLAN.md`, or to a rung report. Scenarios 4, 5, 6, 7 and 11 turn on a condition or a limit deep in a long entry.

## How to run it

Follow the kit's `README.md`, "How to run it", with these changes.

1. Base. Use the commit of `main` just before the consolidation lands as copy p's base, and the consolidation's commit as copy q's. Or make both from one base and put the new FACTS into copy q, as the kit's step 3 does.
2. What to delete in both copies, besides the kit's list: the whole `explorations/coordinator/process-engineering/record-test/` folder (this folder too), `explorations/coordinator/postmortem-2026-11-24-record-regrowth/`, any working folder of the consolidation that holds old and new texts side by side, and their lines in `INDEX.md`. The post-mortem folder quotes many of these entries and judges them.
3. Placeholders. `questions.md` names each entry by its number on 2026-11-24. In copy q, check each number against the consolidated FACTS. If the entry was merged into another, put the owner's number in the placeholder. If it was split, put one placeholder for each part that the scenario needs. `fill.py` stops on a number that names no entry. Record each change, since the key's "Entry" column names the old numbers.
4. Fill the questions once for each copy with the kit's `fill.py`: `python3 ../fill.py /home/user/record-test-p questions.md OUT`.
5. Launch one fresh Opus reader in each copy with the kit's `brief-reader.md`, unchanged.
6. Blind the answers as the kit says, and launch one Fable grader with the kit's `brief-grader.md`, changed as below. It reads this folder's `questions.md` unfilled and this folder's `key.md`.
7. Unblind and report by "the new entries" and "the old entries". The consolidation passes if the reader of the new entries decides as well on each scenario, and follows the pointers where it needs more.

Run two readers, not one. The October answers from the old entries do not fit these scenarios, so no earlier run can stand for copy p.

## What the kit's grader brief needs changed

- "the same ten scenarios" becomes "the same twelve scenarios".
- Its input folder is the October run's scratch folder; put yours in its place.
- Its item 4 gives `FACTS 53` and `POSITIONS 48` as examples of placeholders; these scenarios use `FACTS n` only.
- Its key is this folder's `key.md`, whose quoted sentences are the old texts. In copy q a sentence may sit in another entry or in the report that the entry points to. The key's header says so; the grader counts a sentence found there as held.

The reader's brief and `fill.py` need no change.
