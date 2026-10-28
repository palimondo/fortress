<!-- The checks after the corrections' pilot (chunk p: P-37, P-26, P-43, P-158), run on 2026-10-28 from 22:02 to 22:12 UTC by an Opus worker as postmortem-2026-10-28/run.md, "The checks after each chunk", says: the record tool's check in copy q, the length table, the trap test's scenarios 3, 2 and 5, and a git check of the export-check dates. -->

# Checks after the pilot, chunk p

B is `d4d5fa990`, HEAD when the pilot launched at 21:18 UTC. `3d323a5bf` differs from it only in `BOOT.md`, which the copies delete. Nothing is applied to POSITIONS on `main`. Nothing is committed.

## 1. Two copies: pass

- `git worktree add --detach /home/user/record-test-p d4d5fa990`, and the same for `/home/user/record-test-q`.
- Deleted in both: what the run note's step 1 names, and their 20 INDEX lines. Both copies have the same 73 changed paths.
- Both copies stay for c1 and c2. Copy q now holds p's apply.

## 2. The record's check: pass

- `python3 -I explorations/coordinator/tools/record.py apply explorations/reviews/foundations/evidence/corrections/p/final.apply --root /home/user/record-test-q` gave `P-37: rewritten`, `P-43: rewritten`, `P-158: rewritten`, exit 0.
- `record.py check --base d4d5fa990 --root /home/user/record-test-q` gave `225 entries, 84 entries; 0 failures; reported: from 10, size 2`, exit 0.
- The 10 "from" reports are FACTS-history provenance lines that cite files under `reviews/foundations/`, which the copies delete. Copy p shows the same 10. `main` shows only the size reports. So they come from the test setup, not from the apply.
- Size: P-37 1776, P-43 1453 and P-158 1115 characters are reported as over 600. This is reported, not a failure.

## 3. The length table: pass, with notes

`python3 -I explorations/reviews/foundations/evidence/corrections/length-table.py /home/user/record-test-p/explorations/coordinator/POSITIONS.md /home/user/record-test-q/explorations/coordinator/POSITIONS.md P-37 P-26 P-43 P-158`

```
P-37   old  1056  new  1776  +720
P-26   old  1166  new  1166  +0
P-43   old   662  new  1453  +791
P-158  old   867  new  1115  +248
all    old  3751  new  5510  +1759
```

Every addition traces to a finding. I found no growth that has no finding behind it.

- **P-37.** Finding a adds the reason. Finding c adds the premise sentence, with F-34's conditions. Finding d adds the `CompilerSystem` sentence. Finding b is kept for his word.
  - For his read: the premise sentence repeats F-34's figures ("at least 52", "no class emitted ... was run"), where F-34's number alone might do (record.md, question 5).
  - "no decision says whether it goes at the switch-over" reads close to a status line.
- **P-43.** All the growth is finding b: the rule stated, the four texts with their paths, the nested-tower argument and the Working Draft's sentence. The two sentences held under items 219 and 220 are kept word for word.
- **P-158.** Finding a corrects the specification sentence. Finding b corrects the date, to `edb516dba` (see section 5).

## 4. The trap test: pass by the run note, with one point to watch

Scenarios 3, 2 and 5 were run after p, as the run note's update of 22:04 UTC says. Scenario 5 (P-158) was already in `questions.md` when I reached the trap test, so I did not poll for it.

- I cut `trap-test/questions.md` (uncommitted, nine scenarios) to 2, 3 and 5, and filled it from each copy with `fill.py`. Its placeholders name the intended entries at B.
- One fresh headless Opus reader ran in each copy, with `brief-reader.md` (`claude -p --model opus`, its own `--session-id`). Each took about 3 minutes and wrote about 95K (p) and 84K (q) tokens.
  - The allowlist refused a few compound shell commands (4 for p, 1 for q). The readers used simpler calls.
- The answers were blinded at random (X = q, Y = p). One headless Opus grader graded them with `key.md` cut to the three scenarios. It was told the key's slips from `rewrite-results.md` and the export-check date slip (section 5). It wrote 75K tokens.

Scores of 3 (decision plus sources):

- **Scenario 3** (P-37, P-43, P-77, F-133): new entries 3, old entries in this run 3, old entries on 10-26 3. Pass.
- **Scenario 2** (P-26 unchanged, P-37 new; P-146 and P-27 old): new entries 2, old entries in this run 3, old entries on 10-26 2. Pass, because the run note's bar is the 10-26 score of 2.
- **Scenario 5** (P-158 new; P-26 and P-95): new entries 3, old entries in this run 3. No score exists from 10-26. Pass.

Totals: new entries 8 of 9, old entries 9 of 9.

What the curator must know about scenario 2:

- In this run, the old entries scored above the new ones. The new reader dropped the rung, as the key asks. But it called the team's later word "split", and it never dated Naden's 2012-08-31 text against Steele's June 2012 edits.
- The grader traces this to the entries. Neither P-26 nor P-37 holds a rule that "later" is tested by date. The pilot left that rule out on purpose: P-26 finding c and P-37 finding b wait for his word.
- The old reader found the date in `self-typed-bodies-judgement.md` by itself. With one reader per copy, the gap is within reader variance.
- So scenario 2 checks nothing about the pilot's texts until c1. Run it again after c1, as the run note plans.

Other points:

- The grader guessed from scenario 5 that X's copy has the new P-158. Both scored full there.
- The grader found one more key slip. Scenario 5's key dates the Working Draft "2010-12", but the record dates it 2011-02-02 (F-21, P-7). This turns no score.

The answers, the grades and the arms file are only in the session scratchpad (`checks-p/`), not in the repository.

## 5. The export-check dates: the judge's claim holds, and item 280 is wrong

Commands, on `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala`:

- `git show -s edb516dba 77a8dd706 ac0d41de0 80d8c678a`: sukyoungryu, 2009-03-10, 2009-04-13, 2009-05-08 and 2009-02-03.
- `git log -S'equalListMembers' ac0d41de0 -- <file>` gives only `edb516dba`. Its `git show` adds `equalListMembers` as `left.length == right.length && List.forall2(...)(equalMember)`, so a component trait that lacks an api member is refused.
- `git log -S'inAPI.length <= inComp.length' ac0d41de0 -- <file>` gives `77a8dd706` (which adds it: `inAPI.length <= inComp.length && inAPI.forall(l => inComp.exists(...))`) and `ac0d41de0` (which removes it).
- `ac0d41de0` keeps the same test, `inAPI.length > inComp.length` gives `"missing members of the trait/object in the component"`, plus a `forall` over `inComp.exists`. Only the error messages are new.
- Both earlier commits are ancestors of `ac0d41de0`. `5a68404fd:<file>:768` still holds the message.

So the judge's claim holds. The check refused a missing member from 2009-03-10 (`edb516dba`), and took its last form on 2009-04-13 (`77a8dd706`).

Item 280 is wrong in two places:

- It says "counted every api member from 2009-05-08 (`ac0d41de0`)". It should say from 2009-03-10.
- It says "three months after" `80d8c678a`. It should say five weeks after.

`queue.md`'s note on item 280 agrees. The key's scenario 5, `salvage-findings.md` P-158 (b) and the places in `judgement.md`, "The stale date", carry the same stale date.

## 6. Before he reads the texts

- **P-158's present tense.** P-158 still says "The compiled export check refuses a component that leaves one out". The tree's check has skipped abstract api members since `031c38bbc` (row 816), and two cold readers took the sentence as the tree's state.
  - The judge queued "must refuse" with row 816 outside the findings.
- **Questions that wait on him.** P-26 is unchanged, with its five questions open. P-37 finding b and P-43 finding a are kept for his word (items 219, 220 and 241).
- **Untracked files.** `p/writer-1.done` and `p/writer-2.done` are untracked, empty marker files. `ec2db3e24` committed the rest of `p/`.
- **Spend.** The trap test wrote about 0.25M tokens: two readers and a grader. The run note estimated 0.5M to 0.8M for these three scenarios.
