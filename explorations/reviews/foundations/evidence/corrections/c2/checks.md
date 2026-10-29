<!-- The checks after the corrections' chunk c2 (P-33, P-42, P-58, P-59, P-84, P-85, P-155; final.apply of 303f360b2), run on 2026-10-29 from 01:13 to 01:25 UTC by an Opus worker as postmortem-2026-10-28/run.md says: the record check in copy q over the pilot's and c1's texts, the length table, the grounds grep, words-subset.py on P-59, trap scenarios 1, 4 and 9 with a second reading of 4, and the gate verdict. -->

# Checks after chunk c2

B is still `d4d5fa990`. No record file and no skill has changed since. Copy q holds every chunk's texts, applied in the order p (second run), c1, c2. Copy p holds the old entries. Nothing is applied on `main`, and nothing is committed.

## 1. The record's check: pass

- `python3 -I explorations/coordinator/tools/record.py apply explorations/reviews/foundations/evidence/corrections/c2/final.apply --root /home/user/record-test-q` rewrote P-33, P-42, P-58, P-59 and P-84, exit 0. P-85 and P-155 have no block.
- `record.py check --base d4d5fa990 --root /home/user/record-test-q` gave `225 entries, 84 entries; 0 failures; reported: from 10, size 2`, exit 0. The 10 "from" reports are the copies' deletions, as before.

## 2. The length table: P-42 grew beyond half again

`python3 -I explorations/reviews/foundations/evidence/corrections/length-table.py /home/user/record-test-p/explorations/coordinator/POSITIONS.md /home/user/record-test-q/explorations/coordinator/POSITIONS.md P-33 P-42 P-58 P-59 P-84 P-85 P-155`

```
P-33   old   913  new  1060  +147
P-42   old   639  new  1126  +487
P-58   old  1148  new  1376  +228
P-59   old   930  new   774  -156
P-84   old   938  new  1138  +200
P-85   old   851  new   851  +0
P-155  old  1080  new  1080  +0
all    old  6499  new  7405  +906
```

By entry: P-42 +76%, beyond half again. Then P-84 +21%, P-58 +20%, P-33 +16% and P-59 −17%. All seven together grew 14%.

What P-42 gained:
- a "Why" from the type group's texts;
- the setting that makes the departure;
- the end of "until the switch-over";
- rows 339 and 832.

Each of these is a finding. Row 832 exists in the copies.

## 3. `words-subset.py`: pass for P-59

- `python3 -I explorations/coordinator/tools/record-clarity/words-subset.py explorations/reviews/foundations/evidence/corrections/c2/final.apply` exits 1. It lists added words for P-33, P-42, P-58 and P-84, which are expected rewrites.
- It lists nothing for P-59. P-59's line is the old line with its last sentence struck (item 221), and it adds no word.

## 4. The grounds grep: pass, with two items in P-42

This is the same `re` search as for p and c1, comparing the new text with the old.

- **P-33, P-58, P-59 and P-84:** no new date, hash or path.
  - P-33's new counts are "Phase 3 ends" and "F-290 counts their errors", which is a pointer.
  - P-58 keeps `nativeHelpers/`, and P-59 keeps the coercion chapter's path. Both are old text.
- **P-42** brings two grounds into the entry:
  - "POPL 2019", with its authors, in the new "Why". This is the paper's name.
  - The code name `Shell.useCompilerLibraries()`, in the new departure sentence.

  The "Why" also cites "the Working Draft itself" without a path. "February 2011" is old text.

## 5. The trap test: scenario 4 falls below

The method is the one used for p and c1:

- Cut `trap-test/questions.md` to scenarios 1, 4 and 9, and fill it from each copy with `fill.py`. The copies differ in P-42, P-37 and P-33. P-26, P-77, P-155, F-32, F-287 and F-290 are the same in both.
- Run one fresh headless Opus reader in each copy (84K and 93K tokens written).
- Blind the answers at random (X = p, Y = q). One Opus grader (73K) grades with `key.md` cut to the three scenarios and the 10-26 slips, among them the timing of `System`'s errors.
- Read scenario 4 again, where the new texts scored lower: fresh readers (64K, 46K), blinded (X = q, Y = p), and a fresh grader (63K).

New against old, of 3, by scenario:

- **Scenario 1** (P-26, P-42, P-77): new 3, old 3. The 10-26 bar is 3. Pass.
  - Both readers put the defect on row 832, as a note. The grader says the key's "new row" is out of date.
- **Scenario 4** (P-37, P-33, F-32, F-290): new 2 then 1, old 3 then 3. This fails both bars: old's better reading (3) and the 10-26 score (2), which the second reading also falls below.
  - **First reading:** the new reader refused the rung but sent `CompilerSystem`'s fate to the curator as an ask. Its P-37 says the decision "does not say whether `CompilerSystem` goes at the switch-over". It did not find his words in P-37's history: "the compiler second library is just a bootstrap and we need to get rid of it" (`POSITIONS-history.md:466`).
  - **Second reading:** the new reader made three errors.
    - It put `System`'s two checker errors in phase 5. The grader traces this to the new P-33, under which the library's other components "are not part of phase 3". The key places these errors before the names batch or in it.
    - It offered to keep `CompilerSystem` "until `System` runs compiled", which the key lists as wrong.
    - It missed `WellKnownNames.useCompilerLibraries()`.
  - The grader found that P-37's sentence made both readers of the second reading treat `CompilerSystem` as open.
- **Scenario 9** (P-155, P-33, F-287): new 3, old 3. Pass.

Totals:
- First reading: new 8 of 9, old 9 of 9.
- Second reading (scenario 4 only): new 1 of 3, old 3 of 3.

The answers, the grades and the arms files are only in the session scratchpad (`checks-c2/`, `checks-c2b/`).

## 6. Before he reads the texts

- **Scenario 4 traces to two new sentences.**
  - The pilot's P-37: "This decision names only the prelude's three files, and does not say whether `CompilerSystem` goes at the switch-over". `p/checks-2.md` already marked it as close to status. `p/queue.md` asks him the question ("Is `CompilerSystem` deleted at the switch-over ...").
  - c2's P-33: "The library's other components are not part of phase 3". Read alone, it lets a reader put those components' errors after the switch-over.
  - Either sentence needs his answer or a pointer before these texts are applied.
- **P-84's gloss of P-27** is still "(P-27, the library's own practice is the standard)", which is c1's old title.
- **P-155's second sentence** is stale: row 584 is fixed. Item 288 stands.
- **Untracked files:** `c2/writer-1.done` and `c2/writer-2.done`.
- **Spend:** these checks wrote about 0.42M tokens.

## Gate verdict

- Record check: pass (0 failures; the "from" and size reports only).
- Lengths: 6499 to 7405 characters (+14%). P-42 grew beyond half again (+76%). P-85 and P-155 are unchanged, and P-59 shrank.
- `words-subset.py`: pass for P-59 (no word added).
- Grounds grep: pass. P-42 adds "POPL 2019" and `Shell.useCompilerLibraries()`. No other new date, hash or path.
- Scenario 1: new 3, old 3.
- Scenario 4: new 2 then 1, old 3 then 3. Fail. It traces to P-37's `CompilerSystem` sentence and P-33's "other components" sentence.
- Scenario 9: new 3, old 3.
- Judge's holds: none (7 apply, P-85 and P-155 unchanged).
