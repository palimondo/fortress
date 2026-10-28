<!-- The checks after the corrections' pilot's second run (chunk p: P-37, P-26, P-43, P-158; final.apply of 8609834af, after the two brief sentences of 9a2721125), run on 2026-10-28 from 23:13 to 23:22 UTC by an Opus worker as postmortem-2026-10-28/run.md and checks.md do: the record check in a rebuilt copy q, the length table, a grep of the new texts for grounds, the trap test's scenarios 3, 2 and 5, and the gate verdict. -->

# Checks after the pilot's second run, chunk p

B is still `d4d5fa990`. No record file and no skill has changed between B and HEAD (`8609834af`). Nothing is applied on `main`. Nothing is committed.

## 1. Copy q rebuilt: pass

- `git worktree remove --force /home/user/record-test-q`, then `git worktree add --detach /home/user/record-test-q d4d5fa990`.
- I deleted the same paths and INDEX lines as in `checks.md` section 1. Its `git status` now matches copy p's exactly.
- Copy p is untouched since the first run.

## 2. The record's check: pass

- `python3 -I explorations/coordinator/tools/record.py apply explorations/reviews/foundations/evidence/corrections/p/final.apply --root /home/user/record-test-q` gave `P-37: rewritten`, `P-43: rewritten`, `P-158: rewritten`, exit 0.
- `record.py check --base d4d5fa990 --root /home/user/record-test-q` gave `225 entries, 84 entries; 0 failures; reported: from 10, size 2`, exit 0.
- The 10 "from" reports come from the copies' deletions, as in the first run (copy p shows the same 10).
- P-37, P-43 and P-158 are still reported as over 600 characters.

## 3. The length table: P-37 grew beyond half again

`python3 -I explorations/reviews/foundations/evidence/corrections/length-table.py /home/user/record-test-p/explorations/coordinator/POSITIONS.md /home/user/record-test-q/explorations/coordinator/POSITIONS.md P-37 P-26 P-43 P-158`

```
P-37   old  1056  new  1653  +597
P-26   old  1166  new  1166  +0
P-43   old   662  new   950  +288
P-158  old   867  new   983  +116
all    old  3751  new  4752  +1001
```

| Entry | Growth | First run |
|---|---|---|
| P-37 | +57% | 1776 |
| P-43 | +44% | 1453 |
| P-158 | +13% | 1115 |
| All | +27% | |

- **P-37** is the one entry over half again: 1653 characters against a mark of 1584.
  - Its growth is findings a (the reason), c (a one-sentence premise that points to F-34) and d (two sentences on `CompilerSystem`).
  - Each traces to a finding.
  - For his read: "is not yet shown" and "does not say whether `CompilerSystem` goes" read close to status.
- **P-43** now holds finding b as one sentence, with a pointer.
- **P-158** now holds findings a and b with no dates.

## 4. The grounds grep: pass

I searched each new text for years and dates, hex hashes, file paths, digits and spelled-out counts. I used `re` over the entry's line in copy q.

- **P-37.** No date, hash or path. Its digits are the pointers F-34, P-38 and P-33. "three files" appears twice, as the count of the decision's own subject, the prelude's three files: once in the old wording, once in the new `CompilerSystem` sentence.
- **P-43.** It has two kinds of hit:
  - "in 2009 and 2010" and "POPL 2019" both stand in old sentences that stay as they were. The second is the paper's name.
  - The path `explorations/reviews/foundations/judgement.md`, tenet 5, is a pointer to a report section. The copies delete that folder, so the trap readers could not follow it.
- **P-158.** No date, hash, path or count. Its only digits are the pointers P-26 and row 816.

The grounds' commits, lines and dates are all on the note lines of `final.apply`.

## 5. The trap test: scenario 3 falls below the bar

The cut of `trap-test/questions.md` to scenarios 2, 3 and 5 is byte for byte the first run's. Copy p's filled file is the same too.

- Fresh headless Opus readers ran with `brief-reader.md`, one in each copy. They wrote about 101K tokens (p) and 88K (q).
- The answers were blinded at random (X = p, Y = q). One headless Opus grader graded them, about 79K tokens.
  - It had `key.md` (committed, with scenario 5 dated 2009-03-10) cut to the three scenarios.
  - Its brief listed the key's slips: the Working Draft dated 2010-12, and the slips of `rewrite-results.md`.

Scores of 3, new entries against old entries:

- **Scenario 3.** New 2, old 3 in this run, old 3 on 10-26. **Fail**: below both.
  - The new reader chose (b) on every right ground. But it asked for a compiled harness test against the one library, and no such test can reach that branch before the switch-over (`Functionals.scala:1397`, `WellKnownNames.areCompilerLibraries()`).
  - The grader traces this to no entry ("P-37: no", "P-43: no"). The fact was in a file the reader opened.
  - The first run's new reader scored 3 on the same scenario, with the first texts.
- **Scenario 2.** New 2, old 2 in this run, old 2 on 10-26. Pass: it holds its 2.
  - Neither reader dated Naden's 2012-08-31 text against Steele's June 2012 edits. The grader traces this to P-26 for both copies. P-26 is unchanged, and the dating rule waits for his word.
- **Scenario 5.** New 3, old 2 in this run. Pass.
  - The old reader took P-158's old "export check of 2012" as its ground, the trap the key names.
  - The new reader dated the check to 2009 and placed it before the Working Draft.

Totals: new entries 7 of 9, old entries 7 of 9.

Across both runs, the new texts scored 3, 2 and 3 in the first run and 2, 2 and 3 in this one. The old texts scored 3, 3 and 3, then 3, 2 and 2. With one reader per copy, a one-point move is within what a single reader varies.

The grader found two more key slips:

- `salvage-findings.md` still gives 2009-05-08, against the key's 2009-03-10. The key is right.
- The key does not say that way (a) also fails row 480's own case: `Range[\I\]` is generic and cannot extend the non-generic `GeneratorZZ32`.

The answers, the grades and the arms file are only in the session scratchpad (`checks-p2/`).

## 6. Before he reads the texts

- **P-158's present tense.** P-158 still says "The compiled export check refuses". The judge queues "must refuse" with row 816, because three cold readers took the sentence as the tree's state.
- **The P-43 pointer.** P-43 now points into the Fable judgement (`reviews/foundations/judgement.md`, tenet 5). The boot note tells the coordinating session to give that file's reading to a worker.
- **Untracked files.** `p/writer-1.done`, `p/writer-2.done` and the two `.prev.done` markers are untracked.
- **The copies.** Both copies stay for c1 and c2, with copy q holding the second run's apply.

## Gate verdict

- Record check: pass (0 failures; the "from" and size reports only).
- Lengths: 3751 to 4752 characters (+27%). P-37 grew beyond half again (+57%); P-43 (+44%) and P-158 (+13%) did not; P-26 is unchanged.
- Grounds grep: pass. P-43's "2009 and 2010" and "POPL 2019" are old text, and its one path is a report-section pointer.
- Quiz: fail on scenario 3 (new 2 against old 3), with the grader tracing it to no entry. Scenario 2 is 2 against 2 (pass), and scenario 5 is 3 against 2 (pass).
- Judge's holds: none (4 apply, P-26 unchanged).
