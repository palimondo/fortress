<!-- The record test of 2026-10-13 kept as a kit to run again: ten scenarios over the entries of the record rule's trial, their key and rubric, the script that fills them from a copy of the repository, the reader's and the grader's briefs, and the blind grading of the first run. -->

# The record test, a kit

The test asks whether a worker or the coordinator decides as well from entries written to the record rule as from the old ones. The new texts are Parts 3 and 3b of `../record-rule-draft.md`, and the first run's result is its Part 4. Scenarios 9 and 10 test the pairs of Part 3b, an entry of POSITIONS with the FACTS entries that build it.

## The files

- `questions.md`: the ten scenarios. A `{FACTS n}` or `{POSITIONS n}` line stands for the entry numbered `F-n` or `P-n`, which was the entry on line n when the record was numbered.
- `key.md`: for each scenario, the right answer, the facts it rests on and where they live, the wrong answers, and the rubric (decision 0 to 2, sources 0 to 1). Its notes on scenarios 9 and 10 say what the duplication between FACTS and POSITIONS did. It is kept as the first run used it. `grades.md` § 5 lists seven slips that the grader found in it.
- `fill.py`: fills the questions from one copy.
- `brief-reader.md`: the reader's brief, with `@DIR@`, `@QUESTIONS@` and `@OUT@` to fill in.
- `brief-grader.md`: the grader's brief. It names the first run's scratch folder; put yours in its place.
- `grades.md`: the first run's blind grading. X is the new entries and Y the old.
- `grades-pilot.md`: the second run's grading, on the consolidation's pilot: one reader in the pilot's copy, graded against the first run's old-entries answers. X is the old entries and Y the pilot's; 28 and 29 of 30.

## How to run it

1. Make two worktrees of `main` at one base, detached: `git worktree add --detach /home/user/record-test-p BASE`, and the same for `/home/user/record-test-q`. Copy p keeps the old entries; copy q gets the new ones.
2. In both copies, delete what would tell a reader about the test or show it the other copy's texts, and commit nothing: `explorations/coordinator/BOOT.md`, `HELD.md`, `process-engineering/record-rule-draft.md`, this folder, and their lines in `explorations/coordinator/INDEX.md`.
3. In copy q, put in the new texts. Replace each entry's line with its new text from Part 3, or from Part 3b where the entry is there too, as POSITIONS 48 and 60 are. Append the old line verbatim to `FACTS-history.md` or `POSITIONS-history.md`, under a section `## Rewritten DATE, the record rule applied`, with a comment line above it that says where it came from. Then check that every key quoting a changed title still finds its entry, with `explorations/coordinator/tools/facts-extract.sh --root /home/user/record-test-q --check 'TITLE WORDS'`. Also run `explorations/coordinator/tools/check-verbatim.py HEAD FILE HISTORY` in the copy for each of the two files.
4. Check the placeholders. `questions.md` names each entry by its line number at `0f54a698b`, which is its number since the record was numbered. On another base, check that each number still names the entry that the scenario means (the titles in Parts 3 and 3b; a merged entry's number is gone), and change the number where it does not. `fill.py` checks only that the number names one entry.
5. Fill the questions, once for each copy, into a file outside both copies: `python3 fill.py /home/user/record-test-p questions.md OUT`.
6. Launch one fresh Opus reader in each copy, with `brief-reader.md`: `@DIR@` is the copy, `@QUESTIONS@` its filled questions, `@OUT@` its answers. The two briefs differ in nothing else. Each reader wrote about 0.4M tokens in the first run.
7. Blind the answers. Copy them to `grade/answers-X.md` and `grade/answers-Y.md` by a choice the grader does not see, and write which is which in a file that the grader is not given (`arms.txt` in the first run).
8. Launch one Fable grader with `brief-grader.md`. It reads `questions.md` unfilled, `key.md` and the two answer files, and checks against `main` any claim beyond the key. It wrote 0.75M tokens in the first run.
9. Unblind with the arms file, and report by "the new entries" and "the old entries", not X and Y.

To re-run one scenario after an entry is repaired, cut `questions.md` to that scenario, fill it from the copy, and give a fresh reader the same brief. Grade it against the same key. In the first run, the coordinator graded the re-run of scenario 7 itself, knowing its copy, so that grade was not blind.
