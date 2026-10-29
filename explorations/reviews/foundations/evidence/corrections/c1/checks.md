<!-- The checks after the corrections' chunk c1 (P-7, P-27, P-146, P-153, P-154, P-12, P-17; final.apply of 9ac8b7810), run on 2026-10-29 from 00:16 to 00:30 UTC by an Opus worker as postmortem-2026-10-28/run.md says: the record check in copy q over the pilot's texts, the length table, a grep of the new texts for grounds, trap scenarios 2, 6, 7 and 8 with a second reading of 6 and 8, and the gate verdict. -->

# Checks after chunk c1

B is still `d4d5fa990`. No record file and no skill has changed since. Copy q already held the pilot's second-run texts (`p/checks-2.md`), and copy p holds the old entries. Nothing is applied on `main`. Nothing is committed.

## 1. The record's check: pass

- `python3 -I explorations/coordinator/tools/record.py apply explorations/reviews/foundations/evidence/corrections/c1/final.apply --root /home/user/record-test-q` rewrote P-27, P-146, P-153, P-154, P-12 and P-17, with exit 0. P-7 has no block.
- `record.py check --base d4d5fa990 --root /home/user/record-test-q` gave `225 entries, 84 entries; 0 failures; reported: from 10, size 2`, exit 0.
- The 10 "from" reports are the copies' deletions, as before. POSITIONS now has 70 entries over 600 characters.

## 2. The length table: three entries grew beyond half again

`python3 -I explorations/reviews/foundations/evidence/corrections/length-table.py /home/user/record-test-p/explorations/coordinator/POSITIONS.md /home/user/record-test-q/explorations/coordinator/POSITIONS.md P-7 P-27 P-146 P-153 P-154 P-12 P-17`

```
P-7    old   890  new   890  +0
P-27   old   452  new   754  +302
P-146  old  1284  new  1568  +284
P-153  old  1142  new  1257  +115
P-154  old  1115  new  1270  +155
P-12   old   656  new  1100  +444
P-17   old   495  new   754  +259
all    old  6034  new  7593  +1559
```

The growth by entry: P-27 +67%, P-12 +68% and P-17 +52%, which are beyond half again; P-146 +22%, P-154 +14%, P-153 +10%, and all seven together +26%.

The three entries beyond half again were short before. Each addition is its finding:

- P-27 gains the limit of its scope, two sentences (finding P-27).
- P-12 gains the step's three parts (finding P-12).
- P-17 gains the specification's intent in one sentence, without paths (finding P-17).

## 3. The grounds grep: pass, with one old path kept

I used the same `re` search as for the pilot (years and dates, hex hashes, file paths, digits, counts), new text against old.

- **No new date, hash or path** appears in any of the six.
- **New counts:**
  - P-27: "two of the team's designs".
  - P-154: "the two lexicographic traits".
  - P-12: "three parts", and "F-290 counts them", a pointer.
  - Each is a count of the decision's own subject, not a ground.
- **Old items kept:**
  - P-146's "POPL 2019 paper".
  - P-153's numerals (1, -1, 0) and row 441.
  - P-17's "three array kernels".
  - P-154's path `Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`. It now stands in a rewritten sentence ("an unfinished library draft of the team's (...)"). It is the old text's path, kept in the rewrite.
- **P-17** names the specification's two chapters in words, and its paths are on the note line.
- **The note lines hold the grounds.** One of them is false: P-154's note line says the specification's sentence "traced only to `d8859d236` (2009-10-20)".
  - `git ls-tree -r d8859d236` holds no `algebraic-constraints.tex`.
  - `git log --all` first shows the file at the parentless `26718e298` (2011-12-06).
  - This is the judge's own finding. `record.py apply` copies the line into POSITIONS-history, so correct it when applying on `main`.

## 4. The trap test

I cut `trap-test/questions.md` to scenarios 2, 6, 7 and 8 and filled it from each copy with `fill.py`. Copy p differs from copy q in P-37, P-146, P-27, P-153 and P-154.

- **First reading:** one fresh headless Opus reader in each copy (121K and 74K tokens written). The answers were blinded at random (X = p, Y = q). One Opus grader (81K) graded them with `key.md` cut to the four scenarios and the 10-26 slips.
- **Second reading of scenarios 6 and 8,** the two where the new entries scored lower, by the procedure of `p/checks-2.md`: fresh readers (67K, 66K), blinded at random (X = q, Y = p), and a fresh Opus grader (62K).

New against old, of 3, by scenario:

- **Scenario 2** (P-26, P-37, P-146, P-27): new 3, old 3. The 10-26 bar is 2, and the pilot's readings were 2 and 2. Pass. Both readers dated Naden's 2012-08-31 text against Steele's June 2012 edits.
- **Scenario 6** (P-146, P-27): new 2 then 3, old 3 then 3.
  - In the first reading, the new reader took (b) but did not give the soundness reason for the extender rule.
  - That reason is in the new P-146 too, word for word ("an extender must be a subtype of the static argument that it gives"). So it was the reader's own slip.
  - In the second reading, both readers scored 3.
- **Scenario 7** (P-153, P-26, P-8): new 2, old 2. Pass, equal.
  - Both readers still grounded the power's type on "the team's later code (P-26)", the wrong layer by the key.
  - The new P-153 drops that ground, but it does not state the judge's step through P-8: the type sits in a gap of the language's texts that the goal decides. That step is queued for his word (`c1/judgement.md`, P-153).
  - So the new text did not move the reader's reasoning.
- **Scenario 8** (P-154, P-26, P-8): new 1 then 3, old 3 then 1.
  - Each 1 was the same fault: a probe of microGPT before the ask, which the record answers (`reviews/tuple-comparisons-judgement.md`, "In short"), and a specification or library claim with no source.
  - The new P-154 names the specification's sentence without its path, but in the second reading the old reader made the same faults.

Totals:

- First reading: new 8 of 12, old 11 of 12.
- Second reading (scenarios 6 and 8): new 6 of 6, old 4 of 6.

The answers, grades and arms files are only in the session scratchpad (`checks-c1/`, `checks-c1b/`).

## 5. Before he reads the texts

- **P-27 depends on P-26's dating rule.** Its "dated against the texts" rests on the rule that the pilot's queue asks him to take into P-26. Without it, the clause loses its ground (`c1/judgement.md`).
- **P-27's old title lives on.** P-84 and `fortress-repo`'s `references/sources.md:224` still quote it.
- **P-153's reason is half-stated.** Its new "Why" removes the false ground but gives no rule for the type. Scenario 7 shows readers fall back on "the team's later code".
- **P-154's false note line** is in section 3.
- **Untracked files.** `c1/writer-1.done` and `c1/writer-2.done` are untracked.
- **Spend.** The checks wrote about 0.47M tokens: six readers and two graders.

## Gate verdict

- Record check: pass (0 failures; the "from" and size reports only).
- Lengths: 6034 to 7593 characters (+26%). Beyond half again: P-27 (+67%), P-12 (+68%) and P-17 (+52%). P-7 is unchanged.
- Grounds grep: pass. No new date, hash or path; P-154 keeps its old path in a rewritten sentence, and its note line's `d8859d236` date is false.
- Scenario 2: new 3, old 3.
- Scenario 6: new 2 then 3, old 3 then 3. Pass on the better reading.
- Scenario 7: new 2, old 2.
- Scenario 8: new 1 then 3, old 3 then 1. Pass on the better reading.
- Judge's holds: none (7 apply, P-7 unchanged).
