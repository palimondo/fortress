<!-- Evidence for the post-mortem of the record's regrowth, slice "test names": how 45 climb-batch workers that changed the tree used the test names that the FACTS entries they saw hold, measured by script from their transcripts; for the curator's question of 2026-11-24, 13:17 UTC. -->

# How the workers use the test names of FACTS entries

Evidence only. It holds no recommendation. Times are UTC. A "line" is a line of the transcript file, counted from 1.

## The sample

- The sample is every rung worker and repair worker of climb batches 31b to 36: 41 rung launches and 4 repair workers, 45 transcripts.
- Batches 33 to 36 (33, 33b, 34, 34b, 35, 35b, 36) give 33 of them. They were too few for 40, so I added the batches just before: 32 (9) and 31b (3).
- I took rung and repair workers because their task is to change the tree. A script (`changed.py`, below) checks each: all 45 edited or wrote a file under `ProjectFortress/`, `Library/` or `Specification/`, or reported such a file in `filesChanged`.
- The 45 include three relaunches of a rung (33b rung R, 32 rung N, 32 rung P, each launched twice).
- A second group, measured the same way, is the 38 skeptics and judges of batches 33 to 36. They change little of the tree. Their counts stand apart, at the end of each point.
- The transcripts are the live ones, under `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/<run>/`. The backup worktree holds the same files at `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/<run>/`.
- The runs: `wf_8ca4b98b-7c0` (31b), `wf_16f35394-635` (32), `wf_6339efde-563` (33), `wf_1413c43f-684` (33b), `wf_b2847bd4-92c` (34), `wf_c13d405d-3be` (34b), `wf_363d0bfa-6d7` (35), `wf_63ab85b2-667` (35b), `wf_5ccaf405-8a5` (36). Each run's `result.batch` in `workflows/<run>.json` gives its batch.

## The scripts

They are in `/home/user/fortress/tmp/test-names-use/`, which git ignores:

- `universe.sh` lists the test names: the base name of every file that is or was in a test folder of `ProjectFortress/`, and every `*Test.java` class (2,873 names).
- `analyze.py` reads one transcript and writes, for each worker:
  - each entry seen: a line `F-N **...` in the brief or in a tool result, with the way it came;
  - the test names of the entry's test sentence (from "Gated by", "Tests:" or "Test:" to "Detail:"), and test names elsewhere in the entry;
  - each later tool call or report that holds a name, classified as run, edit, grep or ls, open, or citation;
  - each report that a "Detail:" sentence cites, whether a later reading command names its path, and the test names of that report that the worker then used;
  - each test run, and for each test of a run, the first place the worker met the name before that run.
- `changed.py` checks that a transcript changed the tree.
- `aggregate.py` gives the counts of points 1 to 4. `workuse.py` splits the uses of point 2. `firstmeet.py` says where the worker first met each name it used. `refound.py` finds searches that print a name an entry had already given. `table.py` prints the table at the end. `show.py` prints a transcript's line.
- The outputs are `sample.json`, `second.json`, `agg-sample.txt`, `agg-second.txt`, `firstmeet-sample.txt` and `table-sample.md` in the same folder.

The words that the counts use:

- A worker "saw" an entry when a tool result or its brief printed the entry's line, `F-N **Title.** ...`, whole or cut.
- The ways are: "extract", a `facts-extract.sh` query, or a briefing file that holds one's output (from batch 31b, the workflow writes the rung's queries to a file that the worker prints); "read/grep", a `Read`, `cat`, `sed`, or `grep` of `FACTS.md`; "brief", the entry's line in the brief.
- A "use" counts only after the entry was printed. A "work use" is a run of the test, an edit of its file (also `git mv`), a grep or ls that names it, or an open of its file. A "citation" is the name in the final report, or in a file under `explorations/` that the worker wrote.
- A "run" is a command, outside any here-document, that calls `harness-one.sh`, `junit.sh`, `fortress junit`, an `ant` target with `-D...test`, or `bin/fortress` on a test, and that names the test.

## Point 1: which entries the workers saw, and how

| What is counted | Rung and repair workers (45) | Skeptics and judges (38) |
|---|---|---|
| Workers that saw at least one entry | 34 | 24 |
| (worker, entry) pairs | 146 | 78 |
| Pairs first seen by extract | 50 | 29 |
| Pairs first seen by read/grep of FACTS.md | 96 | 43 |
| Pairs first seen another way | 0 | 6 |
| Workers that used extract / read/grep | 25 / 25 | 15 / 13 |
| Pairs whose entry was quoted in the brief | 0 | 0 |
| Entries that briefs name by number (pairs) | 58 | 75 |
| Of them, never printed by the worker | 13 | 47 |
| Pairs printed as far as the test sentence | 54 | 36 |
| Pairs whose printed text held test names | 52 | 33 |

- No brief quotes an entry's line. The briefs name entries by number, and the briefing files print them.
- 72 of the 96 read/grep pairs were cut before the test sentence and the "Detail:" sentence, mostly by `cut -c1-NNN` after a `grep -n` of FACTS.md. The workers grepped FACTS for a row number or a word and read the head of each matching line.
- 11 of the 45 workers saw no entry. 9 of them are rung workers of batches 31b and 32.

## Point 2: what the workers did with the entries' test names

A pair is (worker, a name of a test sentence that the worker saw).

| What is counted | Rung and repair workers | Skeptics and judges |
|---|---|---|
| Pairs | 193 | 165 |
| Pairs with a work use | 32 | 25 |
| Pairs only cited | 29 | 2 |
| Pairs not used at all | 132 | 138 |
| Work uses by kind: run / edit / grep or ls / open | 15 / 13 / 20 / 9 | 10 / 3 / 18 / 10 |
| Entries with names | 52 | 33 |
| Entries with at least one name in a work use | 19 | 11 |
| Entries whose names were only cited | 7 | 1 |
| Entries whose names were not used | 26 | 21 |
| Workers with at least one work use | 13 of 34 | 9 of 24 |

- The work uses gather in a few workers. 36 rung N alone has 9 of the 32 pairs, 34 rung P has 4, and 34b rung C and 35 rung A have 3 each. Nine other workers have 1 or 2.
- Where the worker met each name of a work use first, before or at the entry (`firstmeet.py`):
  - rung and repair workers: in the entry, 20 of 32; in the brief, 4; in a ledger row, 3; in the skill, 3; in a report, 1; elsewhere, 1;
  - skeptics and judges: in the brief, 20 of 25; in the entry, 3; in a report, 1; in a ledger row, 1.
- So in the main sample, 20 pairs are uses of a name that the worker had met first in an entry. They are 10% of the 193 pairs, in 9 workers.
- A first meeting in an entry does not prove that the entry caused the use. Case 3 and case 8 below show the same name also reached by a listing.
- Names of an entry outside its test sentence: 11 pairs, 4 used (main sample); 15 pairs, none used (second group).

## Point 3: the reports that "Detail:" cites

| What is counted | Rung and repair workers | Skeptics and judges |
|---|---|---|
| (worker, cited report) pairs, the worker's own rung report left out | 100 | 71 |
| Reports read after the entry was seen | 11, by 9 workers | 5, by 4 workers |
| Test names in the read output that neither the entry nor the brief holds | 9, in 4 reads | 13, in 1 read |
| Of them, later used | 0 | 1 (opened) |

- 6 of the 11 reads in the main sample are `doc:` queries that the briefing printed with the entries. The worker did not choose them.
- The other 5 are a `grep`, `sed` or `cat` of the report.
- The one use in the second group is 35 judge:review: it read `rung-override-compiled/REPORT.md` with `sed -n 80,110p` (line 64) and opened `OverrideConditionalExtensionWalk`.

## Point 4: where the tests that the workers ran came from

Each test of each run command counts once in the first column. The second column counts each (worker, test) once, at its first run. The source is the first place the worker met the name before that run.

| Source | (run command, test) pairs | % | distinct (worker, test) | % |
|---|---|---|---|---|
| The worker wrote the test (or renamed it) before the run | 447 | 37.8 | 148 | 32.9 |
| The brief | 432 | 36.5 | 125 | 27.8 |
| Its own search (`ls`, `grep`, `find`, `git ls-files`, Grep, Glob) | 138 | 11.7 | 88 | 19.6 |
| A report or note under `explorations/` (other than FACTS and the ledger) | 49 | 4.1 | 18 | 4.0 |
| A gap-ledger row | 38 | 3.2 | 25 | 5.6 |
| The worker typed the name before any output held it | 33 | 2.8 | 14 | 3.1 |
| A FACTS entry | 24 | 2.0 | 10 | 2.2 |
| `git log`, `git show` or `git diff` output | 9 | 0.8 | 9 | 2.0 |
| The skill | 6 | 0.5 | 6 | 1.3 |
| Other output | 7 | 0.6 | 7 | 1.6 |
| Total | 1,183 | | 450 | |

- An entry stands among the earlier sources, not only the first, for 49 of the 1,183 pairs and for 22 of the 450 distinct tests.
- In the second group: 330 pairs and 193 distinct tests. The brief is first for 178 pairs (107 distinct), the worker's own test for 109 (47), its search for 28 (27). No entry is ever first. An entry is among the sources for 10 of the 193 distinct tests.
- The 10 distinct tests from an entry are in 4 workers: 36 rung N (6), 31b rung O (2), 34b rung C (1) and 35 rung S (1).

## Point 5: cases

The transcript paths below start at `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/`.

### Where an entry's test name changed what the worker did

1. **A guard run of the entry's tests.** 31b rung O, `wf_8ca4b98b-7c0/agent-a94cd3d7f52755439.jsonl`. Line 73 (2026-11-17 06:55:08) prints F-344, "Test: `tests/LanguageTypeInstancesWalk`", and F-328, which names `AnyNativesIntrinsicWalk`, from the briefing file. Line 382 (07:10:03), after its edit: `harness-one.sh $PWD/tmp/rung-number-objects/h2 $F ProjectFortress/tests/LanguageTypeInstancesWalk.fss ProjectFortress/tests/AnyNativesIntrinsicWalk.fss ProjectFortress/tests/TraitGenericMethodInference.fss`, described as "Run the edited walk tests and their neighbours". The two names appear in no earlier output.
2. **The expected failure that the entry names, promoted.** 34b rung C, `wf_c13d405d-3be/agent-a16b845305506e76a.jsonl`. Line 73 (2026-11-20 22:06:27) prints F-381, which names `OneLibraryHalf.test`, `OneLibraryPrintBig.test` and `XXXOneLibraryRunHalf.test`. Line 95 (22:07:19) prints them: `for f in XXXOneLibraryRunHalf.test OneLibraryHalf.test ... OneLibraryPrintBig.test; do ... cat $f`. Line 286 (22:18:41): `git mv XXXOneLibraryRunHalf.test OneLibraryRunHalf.test`. The entry is the first place it met these names.
3. **The entry's test extended.** 35 rung S, `wf_363d0bfa-6d7/agent-abc57ecb84e9d4b34.jsonl`. Line 73 (2026-11-23 10:49:03) prints F-372, "Tests: ... `FunctionalMethodMeetNarrowedSelfNotFirst`". Line 155 (10:51:55): `cat FunctionalMethodMeetNarrowedSelfNotFirst.fss FunctionalMethodMeetNarrowedSelfNotFirst.test ...`. Line 162 adds an `assert` to that `.fss`. Line 168 (10:53:06) runs it on the base with `junit.sh s35base`. But line 79 (10:49:11) had also listed it: `git ls-files 'ProjectFortress/compiler_tests/*FunctionalMethod*'`.
4. **The entry's test read as a model.** 35 rung A, `wf_363d0bfa-6d7/agent-a73c470ea6cc2edfd.jsonl`. Line 61 (2026-11-23 10:00:32) prints F-373, which names `LabelExitCompiled`. Line 202 (10:07:55): `grep -rn 'label\|exit' ProjectFortress/compiler_tests/LabelExitCompiled.fss`, "Check tryatomic in CodeGen and the label test's loop form". Line 205 prints lines 20 to 32 of it.
5. **The entry's test read as the form of a promotion.** 36 rung C, `wf_5ccaf405-8a5/agent-a9ca81988bec2e08d.jsonl`. Line 68 (2026-11-24 03:09:29) prints F-396, "Tests: `one_library_tests/OneLibraryComponents.test`, `OneLibraryRunHello.test`, `OneLibraryCatchHelperRaises.test`". Line 84 (03:10:10): `cat ProjectFortress/one_library_tests/OneLibraryCatchHelperRaises.test ...`, "Find earlier promotions in the one-library tests".
6. **The entry's tests read before new tests were written beside them.** 36 rung G, `wf_5ccaf405-8a5/agent-a9e81e401364d4b66.jsonl`. Line 70 (2026-11-24 03:16:24) prints F-405, "Tests: `tests/GenericMethodOverloadArity.fss`, `GenericMethodOverloadSetWalk.fss`, `GenericOverloadStaticArgKindsWalk.fss`". Line 330 (03:32:15): `sed -n 1,40p GenericOverloadStaticArgKindsWalk.fss; grep -n ... GenericMethodOverloadSetWalk.fss`, "Read the tests of generic dotted methods that rung L landed".
7. **The entry's test opened beside a listing.** 35 repair:gate, `wf_363d0bfa-6d7/agent-a1721711fd32098a1.jsonl`. Line 364 (2026-11-23 13:42:31) prints F-377, "Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `ComprisesValueAtConditionalArmRun`, ...". Line 438 (13:45:37): `ls ProjectFortress/compiler_tests/ | grep -i "comprise\|SelfType" | head -30; cat ProjectFortress/compiler_tests/ComprisesValueAtListedTypeCompiled.test`, "Look at existing comprises self tests for form".

### Where the worker searched for tests that an entry it had seen named

8. **A grep found the tests to rewrite; the entries had named some of them.** 36 rung N, `wf_5ccaf405-8a5/agent-a475fade913c129c6.jsonl`. Line 66 (2026-11-24 01:58:11) prints F-341, F-342 and F-347 from the briefing file. Their test sentences name `NumeralOwnTypeWalk`, `NumeralWhereRefusedWalk`, `LiteralDefaultCompiled`, `NumeralCoercionOnceCompiled` and others. Line 187 (02:07:30): `grep -rnE 'coerce\[\\nat' compiler_tests tests one_library_tests library_tests other_compiler_tests demos | grep -E 'asZZ|asNN|asRR|bigToZZ64|...'`, "List the tests' numeral coercions that call a getter or helper". Line 190 loops over the 17 files that the grep found. The entries name tests on the topic, not the tests that call the getter.
9. **A listing by topic after two entries named ten tests.** 35b rung M, `wf_63ab85b2-667/agent-a761f8065fba80217.jsonl`. Line 63 (2026-11-23 17:50:52) prints F-377 and F-374, whose test sentences name ten tests, among them `ComprisesValueAtListedTypeCompiled`, `VarFieldCapturedCompiled` and `AtomicFieldCompiled`. The worker uses none of the ten. Line 386 (18:07:57): `ls *.test | grep -i 'field\|setter\|getter\|functionalmethod\|comprises'`, "List compiler tests of fields and functional methods". The listing prints five of the ten.
10. **A listing by file name after the entry named the tests.** 35 rung W, `wf_363d0bfa-6d7/agent-ac3e3a0d2b8ab9341.jsonl`. Line 55 (2026-11-23 10:29:25) prints F-369 and F-387. F-369 names `TopLevelTupleBindingCompiled`, `TopLevelTupleBindingImport`, `XXXTopLevelTupleBindingType` and others. Line 106 (10:31:37): `git ls-files 'ProjectFortress/*SubscriptThen*' 'ProjectFortress/*TupleBinding*'`, "List existing tests and mentions of the two test names". The listing prints six names that F-369 and F-387 hold.
11. **The entry came after the tests were known.** 33 rung Q, `wf_6339efde-563/agent-a58b068f9949543a2.jsonl`. Line 76 (2026-11-17 18:34:33): `ls *ComprisesValue* *SelfTypeParameter* *SelfType*`, which prints `SelfTypeReturnSelfRun` and the other tests. Line 320 (18:47:07) is the first print of F-377, by a `grep -n` of FACTS.md. The worker then cites the names in its record file (line 499).
12. **The ledger rows gave the names first.** 34 rung P, `wf_b2847bd4-92c/agent-a69f2d82d6009760c.jsonl`. Line 62 (2026-11-20 14:49:54) prints ledger rows that name `AsIfCallsCompiled`, `XXXAsIfGenericFunctionCompiled` and `XXXAsIfGenericMethodCompiled`. Line 264 (15:01:54) prints F-325 with the same names. Line 400 (15:10:23) runs them: `junit.sh p34final ProjectFortress/compiler_tests ... AsIfCallsCompiled.test XXXAsIfGenericFunctionCompiled.test XXXAsIfGenericMethodCompiled.test ...`.

`refound.py` finds 50 (worker, name) pairs in 11 workers where a later search printed a name that an entry had already given, without the name in the search's command. Cases 9 and 10 are among them. The count holds false hits, such as a listing made for another purpose.

## Limits of the measurement

- The transcripts hold no reasons: the workers' thinking blocks are empty. The counts show what the workers ran and read, not why.
- A first meeting is a first appearance of the text. It does not prove that the source caused the use. A worker could meet a name in the skill or the brief and act on the entry, or the reverse.
- Matching is on the exact name. A name built in a loop (`for f in ...; XXX$f`), by a glob (`*TupleBinding*`) or by a variable is not seen. So uses and runs are lower bounds.
- A test that a script file runs, where the worker wrote the script with a here-document and then ran it, does not count as a run. 35 rung A ran `AtomicExprCompiled` and `AtomicFieldCompiled` this way (line 235); the script counts that command as an edit, a work use, not as a run. Whole-suite runs (`ant testFast`, the gate) name no test, and they do not count either.
- A run counts every test named in the command, including tests run only as neighbours in a long list. The first column of point 4 weights such lists heavily. The second column does not.
- An entry counts as seen only when its line, `F-N **`, was printed. A cut line counts as seen, but its test names count only if the cut kept them. An entry restated in other words (in a brief, a report or a ledger row) does not count as seen.
- The test-name list comes from the folders now and the history of `main`. A test that never reached `main` counts only where its path or a `.test` suffix stands in the command.
- "Search" is any `ls`, `grep`, `find`, `git ls-files`, Grep or Glob output. It includes listings made for other reasons. "Report" is any output of a command that names a file under `explorations/` or makes a `doc:` or `map:` query.
- A report read counts only when the reading command names the report's path. A read after `cd` into its folder is missed. So point 3's reads are a lower bound. The worker's own rung report is left out.
- `changed.py` finds edits by pattern. It may miss an edit made by a script. All 45 workers matched, so this did not shrink the sample.
- The sample has 3 relaunched rungs: 6 transcripts for 3 rungs. The two launches of each rung count as two workers.
- The entries changed form across batches 31b to 36. Each count uses the text that the worker printed at the time, not today's FACTS.

## Per worker (rung and repair workers)

"Names with a work use" counts the names of the worker's seen test sentences that it ran, edited, grepped, listed or opened after the entry. "Of them run" counts those it ran. "From an entry first" counts the worker's distinct run tests whose first source is an entry.

| batch | role | transcript | entries seen (extract / read-grep) | with test names | names held | names with a work use | of them run | test runs (distinct tests) | from an entry first |
|---|---|---|---|---|---|---|---|---|---|
| 31b | rung:E | `agent-a3425293372ccd0a4.jsonl` | 0 (0 / 0) | 0 | 0 | 0 | 0 | 30 | 0 |
| 31b | rung:O | `agent-a94cd3d7f52755439.jsonl` | 3 (3 / 0) | 2 | 3 | 2 | 2 | 14 | 2 |
| 31b | rung:T | `agent-ab8dfed101ec9d1c3.jsonl` | 0 (0 / 0) | 0 | 0 | 0 | 0 | 11 | 0 |
| 32 | rung:F | `agent-a10eadda4d96ece75.jsonl` | 0 (0 / 0) | 0 | 0 | 0 | 0 | 5 | 0 |
| 32 | rung:C | `agent-a1d3a32f7baa7792b.jsonl` | 7 (3 / 4) | 2 | 4 | 1 | 1 | 13 | 0 |
| 32 | rung:P | `agent-a4311b024178f5281.jsonl` | 0 (0 / 0) | 0 | 0 | 0 | 0 | 8 | 0 |
| 32 | rung:N | `agent-a487ec8009b62b484.jsonl` | 0 (0 / 0) | 0 | 0 | 0 | 0 | 10 | 0 |
| 32 | rung:N | `agent-a775183745582228e.jsonl` | 2 (1 / 1) | 2 | 3 | 0 | 0 | 13 | 0 |
| 32 | rung:B | `agent-a7f44e8189117ba36.jsonl` | 0 (0 / 0) | 0 | 0 | 0 | 0 | 4 | 0 |
| 32 | rung:D | `agent-aa68b9d21fee39245.jsonl` | 0 (0 / 0) | 0 | 0 | 0 | 0 | 9 | 0 |
| 32 | rung:S | `agent-ad1f4c81d25e0d356.jsonl` | 0 (0 / 0) | 0 | 0 | 0 | 0 | 10 | 0 |
| 32 | rung:P | `agent-af6eee852be4dee19.jsonl` | 0 (0 / 0) | 0 | 0 | 0 | 0 | 0 | 0 |
| 33 | rung:D | `agent-a05c3904e9b2bf9d7.jsonl` | 1 (1 / 0) | 0 | 0 | 0 | 0 | 16 | 0 |
| 33 | rung:Q | `agent-a58b068f9949543a2.jsonl` | 2 (0 / 2) | 1 | 7 | 0 | 0 | 15 | 0 |
| 33 | rung:I | `agent-a6a1f1c8c21ce6f0a.jsonl` | 3 (0 / 3) | 0 | 0 | 0 | 0 | 11 | 0 |
| 33 | rung:V | `agent-a7524394dd77a7729.jsonl` | 1 (1 / 0) | 0 | 0 | 0 | 0 | 4 | 0 |
| 33 | rung:S | `agent-ae36b71f3cb4d40c0.jsonl` | 4 (2 / 2) | 0 | 0 | 0 | 0 | 5 | 0 |
| 33 | rung:C | `agent-af2c37424ee5cf1f9.jsonl` | 13 (0 / 13) | 3 | 16 | 1 | 0 | 14 | 0 |
| 33b | repair:review | `agent-a26147918942f2c83.jsonl` | 1 (1 / 0) | 1 | 0 | 0 | 0 | 0 | 0 |
| 33b | rung:R | `agent-a2d90f81e75c337a7.jsonl` | 0 (0 / 0) | 0 | 0 | 0 | 0 | 12 | 0 |
| 33b | rung:W | `agent-a49f11cb6bf8c7164.jsonl` | 3 (0 / 3) | 0 | 0 | 0 | 0 | 4 | 0 |
| 33b | rung:R | `agent-a4abb9599e040d15b.jsonl` | 16 (6 / 10) | 3 | 6 | 2 | 1 | 10 | 0 |
| 33b | rung:G | `agent-a79df77e8ced30035.jsonl` | 2 (2 / 0) | 1 | 0 | 0 | 0 | 4 | 0 |
| 33b | rung:N | `agent-a9751652bad3254fe.jsonl` | 1 (0 / 1) | 0 | 0 | 0 | 0 | 15 | 0 |
| 34 | rung:G | `agent-a4bc1f4b2702fbe9e.jsonl` | 0 (0 / 0) | 0 | 0 | 0 | 0 | 6 | 0 |
| 34 | rung:F | `agent-a602bd9f64b5dad0a.jsonl` | 3 (0 / 3) | 0 | 0 | 0 | 0 | 1 | 0 |
| 34 | rung:P | `agent-a69f2d82d6009760c.jsonl` | 2 (1 / 1) | 1 | 11 | 4 | 3 | 14 | 0 |
| 34 | rung:L | `agent-a7546289a6729bef7.jsonl` | 5 (0 / 5) | 2 | 9 | 0 | 0 | 2 | 0 |
| 34 | rung:T | `agent-aa55f20b13a09dd80.jsonl` | 1 (1 / 0) | 0 | 0 | 0 | 0 | 3 | 0 |
| 34b | rung:C | `agent-a16b845305506e76a.jsonl` | 4 (4 / 0) | 3 | 8 | 3 | 1 | 10 | 1 |
| 35 | repair:review | `agent-a0749b847f0d60a20.jsonl` | 3 (1 / 2) | 2 | 3 | 0 | 0 | 0 | 0 |
| 35 | rung:R | `agent-a12045c1dce00792b.jsonl` | 10 (0 / 10) | 0 | 0 | 0 | 0 | 6 | 0 |
| 35 | repair:gate | `agent-a1721711fd32098a1.jsonl` | 12 (3 / 9) | 3 | 5 | 1 | 0 | 18 | 0 |
| 35 | rung:O | `agent-a220682769e022ed6.jsonl` | 4 (2 / 2) | 4 | 7 | 0 | 0 | 26 | 0 |
| 35 | rung:A | `agent-a73c470ea6cc2edfd.jsonl` | 2 (2 / 0) | 2 | 4 | 3 | 0 | 7 | 0 |
| 35 | rung:S | `agent-abc57ecb84e9d4b34.jsonl` | 1 (1 / 0) | 1 | 4 | 1 | 1 | 10 | 1 |
| 35 | rung:W | `agent-ac3e3a0d2b8ab9341.jsonl` | 4 (2 / 2) | 3 | 11 | 1 | 0 | 3 | 0 |
| 35b | rung:L | `agent-a2a84f311d66fc300.jsonl` | 12 (1 / 11) | 1 | 6 | 0 | 0 | 11 | 0 |
| 35b | rung:M | `agent-a761f8065fba80217.jsonl` | 3 (2 / 1) | 2 | 10 | 0 | 0 | 11 | 0 |
| 35b | rung:E | `agent-a95dc2e818938670f.jsonl` | 1 (0 / 1) | 0 | 0 | 0 | 0 | 4 | 0 |
| 36 | rung:N | `agent-a475fade913c129c6.jsonl` | 7 (4 / 3) | 4 | 29 | 9 | 6 | 35 | 6 |
| 36 | repair:review | `agent-a5a7d36712785e177.jsonl` | 1 (1 / 0) | 1 | 4 | 0 | 0 | 1 | 0 |
| 36 | rung:K | `agent-a8de26800b82895d2.jsonl` | 3 (3 / 0) | 3 | 10 | 0 | 0 | 23 | 0 |
| 36 | rung:C | `agent-a9ca81988bec2e08d.jsonl` | 4 (1 / 3) | 1 | 6 | 2 | 0 | 13 | 0 |
| 36 | rung:G | `agent-a9e81e401364d4b66.jsonl` | 5 (1 / 4) | 4 | 27 | 2 | 0 | 9 | 0 |
