<!-- The adjustments of the record-landing workflow and the clarity workflow that `WORKFLOW-DIFF.md`, section 7, lists, prepared for the curator's review and not applied: adjustments 1 to 13, 15 and 16, each with its file and passage, its old and new text word for word, and what it restores. The patch `adjustments/tools.patch` makes them all when `git apply` runs it on `main`. The page also gives the choices made where the diff left one, the adjustments not made, what the checks showed, and a trial on climb batch 36's landing, prepared in a separate clone and not started. Written 2026-11-24 by an Opus worker in a work tree of its own (`/home/user/rec-adjust`); nothing on `main` uses these changes. -->

# The adjustments of the record's tools, for review

## How to read this page

**the curator**
: The person in charge of the project. Each change of a tool's brief needs his yes before a run uses it.

**the record**
: The project's memory under `explorations/coordinator/`. FACTS (`FACTS.md`) holds what is established about the tree. POSITIONS (`POSITIONS.md`) holds the curator's decisions. An **entry** is one numbered line of either file, such as F-87 or P-48. Its **history** is its block in `FACTS-history.md` or `POSITIONS-history.md`.

**the landing workflow**
: The tool that brings the record in line after a batch of work lands on `main`: `explorations/coordinator/tools/record-landing/`. A run goes through these stages: Sort, Write, Check, Fix, Judge, Land, then the orientation update, the skill update, the page of skill changes, a push and the revival page.

**the clarity workflow**
: The tool that rewrites a list of entries, in chunks, so that each reads on its own: `explorations/coordinator/tools/record-clarity/`. It is the way in for a consolidation of the whole record.

**brief**
: The instructions file that one agent of a workflow reads, such as `entries.md` for the landing's entries writer.

**the diff**
: `WORKFLOW-DIFF.md` in this folder. It compares the process that consolidated the record in October 2026 with today's tools. Its section 7 lists 21 adjustments. Its C, I and B blocks give the evidence for each.

**the patch**
: `adjustments/tools.patch` in this folder. `git apply` of it on `main` makes every change on this page, and no other change. Nothing of it is applied on `main`.

Terms of the landing workflow:

- **owed.md**: the sorter's list of what the record owes after a landing, one **change** per line. Each change has a **home** (the file and place where it goes, such as an entry), a **kind** (such as "the pass", "made false" or "stale"), a **weight** (high, low or none) and a **ground** (the source that shows the change is owed).
- **the pass**: the rewrite of an entry that a batch added or changed, into the form that the record's rules give.
- **"What an entry is"**: the section of the coordinator skill's `references/record.md` that defines an entry. It holds six **questions** asked of each sentence (1 and 2 keep a sentence; 3 moves how a fact came about to the history; 4 leaves working detail in the report; 5 replaces what another entry says by its number; 6 asks that a new reader can follow each word), the 600-character check, and the **six checks** of a consolidation (scope, present meaning, evidence, comprehension, ownership, consistency). It also names the **worked examples**: five entries rewritten in October, with the question behind each cut, in `explorations/coordinator/process-engineering/record-rule-draft.md`, "Worked examples".
- **AT**: the commit that a run's worktree is made at.
- **provenance line**: the line under an entry in the writer's apply file that names where the cut text went and why. `record.py` copies the old line to the history.
- **cold reader**: an agent that says what each new entry means, with only the worker skill. **checker**: an agent that compares each change with its sources. **judge**: an agent that applies or holds each change once.
- **scout**: an agent that only gathers each entry's evidence before a writer works.

Paths below are under `explorations/coordinator/tools/` unless they start otherwise. Line numbers are those of `main` at `fef3af2009`; these files are the same at `be8de73e30`. "Old" and "New" quote the passage word for word. Where a long paragraph changes in one clause, the block quotes the sentences that change and says that the rest stays.

## The incremental mode: the landing workflow

### 1. The findings clause governs a correction, not "the pass"

**File and passage.** `record-landing/entries.md`, line 21, under "Where the sources are", the bullet "How to write each entry".

**Old.**

> - How to write each entry: `explorations/coordinator/tools/record-clarity/writer.md`, its section "How to write each entry", and its clause on findings under "Read first". Here a change of `owed.md` is a finding, and its ground is the finding's ground.

**New.**

> - How to write each entry: `explorations/coordinator/tools/record-clarity/writer.md`, its section "How to write each entry", and its clause on findings under "Read first". Here a change of `owed.md` that corrects an entry is a finding, and its ground is the finding's ground. A change of kind "the pass" on a FACTS entry is not a finding, and the clause on findings does not bind it: you rewrite the whole entry in the form that "What an entry is" gives.

**What it restores.** The clarity tool's clause on findings says "Change nothing that no finding names, and let an entry grow only by what its corrections need" (`record-clarity/writer.md:23`). Today every change of `owed.md` counts as a finding, so that clause also binds the pass (diff, section 2). The pass of 2026-10-14 had no such clause: its brief said "Rewrite each of the twelve entries in the form the record part gives" (transcript `B/001:7288`). The change restores that pass for FACTS entries; a correction still follows the clause.

### 2. Questions 3 to 5 on every sentence; only questions 1 and 2 keep a sentence past 600; the growth bound and the growth hold go

This adjustment changes five passages. The passage of `entries.md:38` also carries adjustment 9, and the passage of `judge.md:24` also carries adjustment 3; each is quoted whole here.

**File and passage (a).** `record-landing/entries.md`, line 38, under "Bounds, new evidence and length", the third bullet.

**Old.**

> - An entry already past 600 characters grows only by the clause that its change owes. Before you add the clause, move other detail out: to the report that the entry names (question 4 of "What an entry is"), or to a pointer to the `fortress-repo` skill's part that already says it (question 5). Detail that belongs in the skill, and that the skill does not hold, goes to your report, for the skill writer. The judge holds an entry past 600 that grows by more.

**New.**

> - Ask questions 3 to 5 of "What an entry is" of every sentence of each FACTS entry that you write. They move a sentence; they do not lose it: to the history, to the report section that the entry names, or to the number of another entry that says it. Only questions 1 and 2 keep a sentence past 600 characters. Detail that belongs in the skill, and that the skill does not hold, goes to your report, for the skill writer.

**File and passage (b).** `record-landing/entries.md`, line 48, the bullet `entries-report.md`, its clause on long entries.

**Old.**

> for an entry over 600 characters, the question of "What an entry is" that keeps each sentence past the 600, and for one that grew, what you moved out first;

**New.**

> for an entry over 600 characters, each sentence past the 600 with the decision or the misreading that it prevents (question 1 or 2 of "What an entry is");

The rest of the bullet stays.

**File and passage (c).** `record-landing/check.md`, line 27, the class **form**, its last sentence.

**Old.**

> A sentence past 600 characters stays only with the question that keeps it, named in `entries-report.md`, and an entry already past 600 grows only by the clause that its change owes.

**New.**

> A sentence past 600 characters stays only when question 1 or 2 of "What an entry is" keeps it, and `entries-report.md` names the decision or the misreading that it prevents.

**File and passage (d).** `record-landing/judge.md`, line 24, the first paragraph of "The verdicts". The sentence "A cut is not less ..." in the new text is adjustment 3's.

**Old.**

> Apply a change when its final text keeps the meaning of its ground, the checks that bear on it pass, and what the cold reader still raises changes no action. Hold it when it says more or less than its ground, drops a condition, or fails a check, and nothing in the folder settles it. Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth: `lengths.py` in `mech-2.md` names each such entry, and `entries-report.md` says what the writer moved out first. Where `check.md` named a failure and the fix round claims to settle it, read the sentence and its source yourself. You do not rewrite a text: you judge it as it stands.

**New.**

> Apply a change when its final text keeps the meaning of its ground, the checks that bear on it pass, and what the cold reader still raises changes no action. Hold it when it says more or less than its ground, drops a condition, or fails a check, and nothing in the folder settles it. A cut is not less than its ground when the home that its provenance line names holds the cut text. Where `check.md` named a failure and the fix round claims to settle it, read the sentence and its source yourself. You do not rewrite a text: you judge it as it stands.

**File and passage (e).** `record-landing/lengths.py`, lines 2 to 8, its header. The two new clauses on totals are adjustment 6's.

```diff
-"""lengths.py --root WT --base AT: each changed entry's length before and after.
+"""lengths.py --root WT --base AT: each changed entry's length before and after, and the totals.
 
 For each FACTS or POSITIONS entry whose line in the worktree WT differs from its line at AT, the commit
 that the worktree was made at: its number, its characters at AT and now, the change, and whether it stands
 over the record's 600, the size that record.py reports. An entry already over 600 at AT that grew is marked
-"grew past 600": the judge holds it unless the clause that its change owes alone explains the growth
-(judge.md). The last line names each such entry. Information only; exit 0.
+"grew past 600", and a line names each such entry. Then the totals: the changed entries' characters now,
+against 600 times their count; and FACTS.md's and POSITIONS.md's characters at AT and now.
+Information only; exit 0.
 """
```

`README.md`, line 24, states the hold too. Its new text is quoted under adjustment 6.

**What it restores.** Today a long entry "grows only by the clause that its change owes", the judge holds any other growth (fix 5 of commit `575d555945`), and naming a question settles a length failure (diff, C3, C4, C20). In October the six questions were asked of every sentence, questions 3 to 5 moved text out, and an entry passed 600 only where "the questions keep a sentence that needs the room. Its writer names, in the chunk's report, the decision or the misreading that the sentence prevents" (`process-engineering/record-rule-draft.md:131-144`). The curator's word of 2026-10-13, 15:38 UTC: "it needs to have a reason to be that large, because we want that compressed benefits". The change takes fix 5 back and keeps the named reason.

### 3. A cut passes when the home that its provenance names holds it

**File and passage (a).** `record-landing/check.md`, line 26, the class **fidelity**, after its first sentence.

**Old.**

> - **fidelity**: by the clarity checker's step 1. The new text says no more and no less than its ground, keeps every condition, and shows no default as the curator's decision. The gate's figures in F-53 and F-240 are unchanged.

**New.**

> - **fidelity**: by the clarity checker's step 1. The new text says no more and no less than its ground, keeps every condition, and shows no default as the curator's decision. A cut that keeps every condition is not "less": it passes when the home that its provenance line names holds the cut text. The gate's figures in F-53 and F-240 are unchanged.

The rest of the bullet stays.

**File and passage (b).** `record-landing/judge.md`, line 24, the first paragraph of "The verdicts". The sentence that leaves ("Hold an entry already past 600 ...") is adjustment 2's.

**Old.**

> Apply a change when its final text keeps the meaning of its ground, the checks that bear on it pass, and what the cold reader still raises changes no action. Hold it when it says more or less than its ground, drops a condition, or fails a check, and nothing in the folder settles it. Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth: `lengths.py` in `mech-2.md` names each such entry, and `entries-report.md` says what the writer moved out first. Where `check.md` named a failure and the fix round claims to settle it, read the sentence and its source yourself. You do not rewrite a text: you judge it as it stands.

**New.**

> Apply a change when its final text keeps the meaning of its ground, the checks that bear on it pass, and what the cold reader still raises changes no action. Hold it when it says more or less than its ground, drops a condition, or fails a check, and nothing in the folder settles it. A cut is not less than its ground when the home that its provenance line names holds the cut text. Where `check.md` named a failure and the fix round claims to settle it, read the sentence and its source yourself. You do not rewrite a text: you judge it as it stands.

**What it restores.** Today "no more and no less than its ground" fails any cut that no change named, and in climb batch 34b's run two cuts were put back for it (diff, C17; `evidence/landing-workflow-traced.md`, section 7, item 6). The pass's step 3 asks only that "The cited report section holds what the entry left out" (`.claude/skills/coordinator/references/record.md:80`).

### 4. The worked examples

**File and passage (a).** `record-landing/entries.md`, line 20, under "Where the sources are", the bullet "The rules of an entry".

**Old.**

> - The rules of an entry: `.claude/skills/coordinator/references/record.md`, its sections "What an entry is" and "The pass". Read both. They are the one home of these rules.

**New.**

> - The rules of an entry: `.claude/skills/coordinator/references/record.md`, its sections "What an entry is" and "The pass". Read both. They are the one home of these rules. Then read the five worked examples that "What an entry is" names, and follow them exactly: `explorations/coordinator/tools/facts-extract.sh 'doc:explorations/coordinator/process-engineering/record-rule-draft.md#Worked examples'`.

**File and passage (b).** `record-landing/check.md`, line 20, under "Where the sources are", the bullet "The rules of an entry", its first sentence.

**Old.**

> - The rules of an entry, in the worktree: `.claude/skills/coordinator/references/record.md`, "What an entry is" and "The pass".

**New.**

> - The rules of an entry, in the worktree: `.claude/skills/coordinator/references/record.md`, "What an entry is" and "The pass", and the five worked examples that "What an entry is" names (`facts-extract.sh 'doc:explorations/coordinator/process-engineering/record-rule-draft.md#Worked examples'`).

The rest of the bullet stays.

**What it restores.** The October writers read the definition and its worked examples, "Follow them exactly: they are the definition of a good entry for this pass" (`evidence/october-briefs/05b-writers-template-after-edit.md:12`). The pass of 2026-10-14 said "Read the five worked examples it names before you write" (`B/001:7288`). Today the landing's writer and checker read the definition and not the examples (diff, C2). The query is the one that `record.md:59` gives; the examples print as about 22 KB, some 9,300 tokens, for each agent that reads them.

### 5. The curator's goal in the writer's brief

**File and passage.** `record-landing/entries.md`, "The problem", a new paragraph after its one paragraph (after line 11).

**Old.** None: "The problem" has no goal.

**New.**

> The curator's goal for the record, in his words (17:23 UTC, 2026-10-13): "I really hope that the consolidated record is significantly smaller than before. Like that is a goal. [...] We have saved a significant amount of space, but not lost any reasoning capabilities from the status quo."

**What it restores.** The October writers' brief opened with his goal, verbatim, under "The goal" (`evidence/october-briefs/05b-writers-template-after-edit.md:6`). The fifteen runs before it had no goal and removed little (diff, section 0.1, item 2; C1). His word of 2026-11-24, 09:20 UTC, says the landing workflow should be "keeping only relevant things in there" (`HIS-WORDS.md` 8.8). The quote keeps the October words and cuts the middle at "[...]". It gives no number: the diff names the number for today as a gap (section 4, item 3).

### 6. The totals in `lengths.py`

**File and passage (a).** `record-landing/lengths.py`, lines 32 to 46, the loop and the output.

```diff
-rows, grew = [], []
+rows, grew, files, now = [], [], [], []
 for f in ('FACTS.md', 'POSITIONS.md'):
-    old = entries(subprocess.run(['git', '-C', a.root, 'show', '%s:%s' % (a.base, D + f)], capture_output=True, text=True).stdout)
+    old_text = subprocess.run(['git', '-C', a.root, 'show', '%s:%s' % (a.base, D + f)], capture_output=True, text=True).stdout
+    old = entries(old_text)
     with open(os.path.join(a.root, D + f), encoding='utf-8') as fh:
-        new = entries(fh.read())
+        new_text = fh.read()
+    new = entries(new_text)
+    files.append('%s from %d to %d characters (%+d)' % (f, len(old_text), len(new_text), len(new_text) - len(old_text)))
     for k in sorted(set(old) | set(new), key=lambda k: (k[0], int(k[2:]))):
@@
                 grew.append('%s (%+d)' % (k, n - b))
+            if n:
+                now.append(n)
             rows.append('- %s: %s to %s characters (%+d)%s' % (k, b or 'none', n or 'gone', n - b, mark))
@@
 print('lengths: %d already over 600 grew%s' % (len(grew), ': ' + ', '.join(grew) if grew else ''))
+print('lengths: the %d changed entries that stand now hold %d characters, against 600 times %d, %d (%+d)' % (
+    len(now), sum(now), len(now), SIZE * len(now), sum(now) - SIZE * len(now)))
+print('lengths: %s' % '; '.join(files))
```

The header (lines 2 to 8) changes as adjustment 2 (e) quotes.

**File and passage (b).** `record-landing/README.md`, line 24, the bullet on `lengths.py`.

**Old.**

> - `lengths.py` informs: each changed entry's length, and each entry already over 600 that grew, which the judge holds unless the owed clause alone explains the growth.

**New.**

> - `lengths.py` informs: each changed entry's length, each entry already over 600 that grew, the changed entries' total against 600 characters times their count, and the characters of FACTS and POSITIONS at AT and now.

**What it restores.** October measured the record as a whole: the chunk's budget "under 600 characters times its staying entries" (`evidence/october-briefs/05b-writers-template-after-edit.md:25`) and the size of both files before and after. The pass "reports each entry's size, each chunk's total against 600 characters times its entries" (`process-engineering/record-rule-draft.md`, item 50, `:328`). Today no stage reads a total (diff, C5, I9). `checks.sh` already copies the whole output of `lengths.py` into `mech-1.md`, `mech-2.md` and `mech-final.md`, so the fix round and the judge see the totals with no change of `checks.sh` (diff, C14).

### 7. The pass weighed by the six checks

**File and passage (a).** `record-landing/sort.md`, line 32, the field **weight**.

**Old.**

> - **weight**: high, a reader would act otherwise; low, wording or a pointer; none, no change, with the reason.

**New.**

> - **weight**: high, a reader would act otherwise; low, wording or a pointer; none, no change, with the reason. A change of kind "the pass" has weight none only when the entry passes all six checks of "What an entry is".

**File and passage (b).** `record-landing/sort.md`, line 40, the first bullet of "What decides a line".

**Old.**

> - Each entry that the batch added or changed gets one change of kind "the pass", whatever else it gets. The rungs wrote it as a draft.

**New.**

> - Each entry that the batch added or changed gets one change of kind "the pass", whatever else it gets. The rungs wrote it as a draft. Weigh it by the six checks of `.claude/skills/coordinator/references/record.md`, "What an entry is": scope, present meaning, evidence, comprehension, ownership and consistency.

**What it restores.** The clarity workflow's assessor judges every entry by the six checks before any rewrite, and an entry stays as it is only when all pass (`record-clarity/assess.md:9-16`). The landing's sorter weighs the pass by meaning alone, and in climb batches 34b to 36 it gave 15 of 44 passes the weight none (diff, C7; `evidence/landing-workflow-traced.md`, section 7, item 3).

### 8. A merge home

**File and passage (a).** `record-landing/sort.md`, line 30, the field **home**, its first item.

**Old.**

> - **home**: one of nine. A FACTS entry (F-N); a POSITIONS entry (P-N);

**New.**

> - **home**: one of nine. A FACTS entry (F-N), or a merge of one FACTS entry into the entry that owns its subject (F-N merged into F-M); a POSITIONS entry (P-N);

The rest of the bullet stays.

**File and passage (b).** `record-landing/entries.md`, line 44, the bullet `record.apply`, a sentence added before its last sentence.

**Old.**

> Where only the history changes, write `note F-87` and its provenance line. The header of `explorations/coordinator/tools/record.py` gives the whole form of the file.

**New.**

> Where only the history changes, write `note F-87` and its provenance line. Where a change merges F-90 into F-87, write the line `merge F-90 into F-87` with its provenance line, and F-87's whole new line with its own. The header of `explorations/coordinator/tools/record.py` gives the whole form of the file.

**File and passage (c).** `record-landing/check.md`, line 25, the class **coverage**.

**Old.**

> - **coverage**: each change of `owed.md` is done, or the writer's report names it as left, with a reason. A change of weight none needs nothing.

**New.**

> - **coverage**: each change of `owed.md` is done, or the writer's report names it as left, with a reason. A change of weight none needs nothing. A merge is done when `record.apply` holds its line `merge F-N into F-M`, with F-M's new line.

**What it restores.** The October writers' brief: "Merge two entries where one home is the right answer" (`evidence/october-briefs/05b-writers-template-after-edit.md:24`); eleven merges on 2026-10-13, and F-224 merged into F-145 by the pass of 2026-10-14, whose brief said "Where two entries now tell one ground, merge them with `merge`" (`B/001:7288`). The curator's wish for one home per subject is `HIS-WORDS.md` 4.5. Today the landing has no merge home, and its writer writes only whole lines (diff, C9). `record.py apply` already takes a line `merge F-91 into F-87` (`record.py`, its header), and "a merge takes its target's line, from wherever they stand in the file" (`record.py:1125-1126`).

### 9. No part of the skill as a home for a cut

**File and passage.** `record-landing/entries.md`, line 38, under "Bounds, new evidence and length", the third bullet. The rest of the new text is adjustment 2's; this adjustment is the pointer to the skill that leaves.

**Old.**

> - An entry already past 600 characters grows only by the clause that its change owes. Before you add the clause, move other detail out: to the report that the entry names (question 4 of "What an entry is"), or to a pointer to the `fortress-repo` skill's part that already says it (question 5). Detail that belongs in the skill, and that the skill does not hold, goes to your report, for the skill writer. The judge holds an entry past 600 that grows by more.

**New.**

> - Ask questions 3 to 5 of "What an entry is" of every sentence of each FACTS entry that you write. They move a sentence; they do not lose it: to the history, to the report section that the entry names, or to the number of another entry that says it. Only questions 1 and 2 keep a sentence past 600 characters. Detail that belongs in the skill, and that the skill does not hold, goes to your report, for the skill writer.

**What it restores.** The curator's word of 2026-11-24, 13:41 UTC: "Facts can never cite skill. [...] It can never be a ground for reducing what's written in the fact" (`HIS-WORDS.md` 5.3). The homes of a cut are now the three of question 5 as `record.md:40` states it on `main` since `bf8e946daa` ("Does another entry say it? Give that entry's number."): the history, the report and another entry. The sentence that sends skill detail to the skill writer stays, since text goes one way, from FACTS into the skill (`HIS-WORDS.md` 5.3; diff, B11). The diff's other file for this adjustment, `record.md:40`, is already changed on `main`.

### 10. A decision that is not consequential enters FACTS only where question 1 keeps it

**File and passage (a).** `record-landing/routing.md`, line 29, the bullet "A queue item", its second sentence.

**Old.**

> A decision that is not consequential becomes no item: it closes as landed, stated in FACTS or a row.

**New.**

> A decision that is not consequential becomes no item: it closes as landed, stated in a row, or in FACTS only where question 1 of "What an entry is" keeps it.

**File and passage (b).** `record-landing/sort.md`, line 45, the bullet "Before you call an item for the curator open", a sentence added at its end.

**Old.**

> one that is not consequential closes as landed, named in the landing's one line, and is no item.

**New.**

> one that is not consequential closes as landed, named in the landing's one line, and is no item. It gets a change whose home is a FACTS entry only where question 1 of "What an entry is" keeps it.

**What it restores.** The change of commit `5e6bd1b311` closes such a decision "as landed, stated in FACTS or a row", which moves text that the review queue held into entries (diff, section 5, change 25). An entry holds no plan or status (`.claude/skills/coordinator/references/record.md:23`). Question 1 keeps a sentence only when a reader would act otherwise without it.

### 11. A search of FACTS by subject, linked or not

**File and passage (a).** `record-landing/sort.md`, line 40, two bullets added after the bullet on "the pass" (whose own change is adjustment 7's).

**Old.** None.

**New.**

> - For each entry that the batch added, say which entry it supersedes or refines, or that it is new. Search FACTS by its subject, linked or not: the last part of `cites.md`, then `facts-extract.sh 'WORDS'` and `'section:HEADING'`. Where another entry owns the subject, put the new fact in that entry: the change's home is "F-N merged into F-M". One home per thing: point to it from elsewhere rather than restate it.
> - For each behaviour or figure that the batch changed, check every other entry that states it, linked or not, by the same search. Each entry that the landing made false gets a change of kind "made false".

**File and passage (b).** `record-landing/sort.md`, line 19, the sorter's list of the evidence files, its item on `cites.md`.

**Old.**

> `cites.md` (each other entry, queue item and INDEX line that names a changed entry or row);

**New.**

> `cites.md` (each other entry, queue item and INDEX line that names a changed entry or row, and, in its last part, the entries that share terms with a changed entry, linked or not);

**File and passage (c).** `record-landing/evidence.py`: its header (lines 15 to 16), the header comment that `cites_md()` writes (line 403), and a new last part of `cites.md`.

```diff
   cites.md     each other entry, review-queue item and INDEX line that names a changed entry or row, with
-               its file, its line and the sentence that names it
+               its file, its line and the sentence that names it; then, linked or not, the entries that
+               share terms with each changed entry (code spans and rows), for the sort's search by subject
@@ def cites_md():
-    out = ['<!-- The record-landing workflow\'s evidence of what names a changed entry or row: each other FACTS or POSITIONS entry, review-queue item and INDEX line at %s that names an entry or a gap-ledger row that %s..%s changed, written by evidence.py. -->' % (AT, BASE, AT), '',
+    out = ['<!-- The record-landing workflow\'s evidence of what names a changed entry or row: each other FACTS or POSITIONS entry, review-queue item and INDEX line at %s that names an entry or a gap-ledger row that %s..%s changed, and the entries that share terms with a changed entry, linked or not, written by evidence.py. -->' % (AT, BASE, AT), '',
@@ (the end of cites_md)
         out.append('None.')
-    return '\n'.join(out)
+    return '\n'.join(out + shared())
+
+
+# ---------------------------------------------------------------- the entries that share terms, linked or not
+
+SPAN = re.compile(r'`([\w#/\\.\[][^`\n]{3,79})`')     # a span opens with a word character or a path's: no stray text between two spans
+COMMON = 15             # a term that more entries hold than this says nothing of a subject
+SHARE_MAX = 10          # entries listed for each changed entry
+
+
+def terms_of(text):
+    """The terms of an entry: each code span of four characters or more, and each gap-ledger row that it names."""
+    return {'`%s`' % s.strip() for s in SPAN.findall(text)} | {'row %d' % n for n, _ in rows_named(text)}
+
+
+def shared():
+    live = [e for k, name in R.FILES.items() for e in R.RecordFile(k, name, show(AT, COORD + name)).entries if e.key]
+    terms = {e.key: terms_of(e.line) for e in live}
+    links = {e.key: {'%s-%s' % (m.group(1), m.group(2)) for m in R.POINTER.finditer(e.line)} for e in live}
+    df = collections.Counter(t for ts in terms.values() for t in ts)
+    out = ['', '## The entries that share terms with a changed entry, linked or not', '',
+           'For each entry of `entries.md` that stands at %s: each other entry that shares with it two terms, one gap-ledger row, '
+           'or one term that at most three entries hold. A term is a code span of four characters or more, or a row that the '
+           'entry names; a term that more than %d entries hold is left out. "linked" marks a pair of which one names the other. '
+           'At most %d for each entry, those with the most shared terms first. Search further with `facts-extract.sh \'WORDS\'`.'
+           % (AT, COMMON, SHARE_MAX), '']
+    n = 0
+    for k in CHANGED:
+        if k not in terms:
+            continue
+        mine = {t for t in terms[k] if df[t] <= COMMON}
+        hits = []
+        for e in live:
+            s = mine & terms[e.key] if e.key != k else set()
+            if len(s) >= 2 or any(t.startswith('row ') or df[t] <= 3 for t in s):
+                hits.append((-len(s), R.sort_key(e.key), e.key, sorted(s)))
+        if not hits:
+            continue
+        n += 1
+        hits.sort()
+        out.append('- %s: %s' % (k, '; '.join('%s (%s%s)' % (o, clip(', '.join(s), 160), '; linked' if o in links[k] or k in links[o] else '')
+                                              for _, _, o, s in hits[:SHARE_MAX])))
+    if not n:
+        out.append('None.')
+    return out
```

**What it restores.** The brief of 2026-09-29 gave the writer, for each new fact, "which entry it supersedes or refines, or that it is new", and told it to "put a new fact in the entry for its area, and point to it from elsewhere rather than restating it" (`A/002:14044`). The brief after batch N said to "check every other entry that names rows 388, 389 ... or N's rungs" (`A/002:10867`). `record.md:77` and `:82` ask for the same: the entry that a fact changes is rewritten in place, and a changed behaviour is found in each entry that states it, "linked or not". The curator: "find the duplicates" (`HIS-WORDS.md` 6.2). Today `cites.md` lists only the entries that name a changed entry or row by number, and the gather adds each draft as its own entry (diff, I4, I5).

### 12. A second cold read after the fix round

**File and passage (a).** `record-landing/record-landing.js`: a phase in `meta`, the new agent after the Fix stage, its field in the result, and the clause "a second cold read" in `meta.description` (whose other change is adjustment 13's).

```diff
     { title: 'Fix', detail: 'both writers once more, in the same streams, then checks.sh 2', model: 'sonnet' },
+    { title: 'Reread', detail: 'a second cold read of the fixed entries', model: 'opus' },
     { title: 'Judge', ...
@@
 phase('Fix')
 const w2 = await drive(2)
 
+phase('Reread')
+const reread = await agent(`Read your brief and follow it: ${RC}coldread.md\n\nThe file to read: ${RUN}clean.txt\nYour report: ${RUN}cold-read-2.md\nWrite your report in parts of five entries: write the first part to the file, then add each next part to its end, one tool call for each part. So no reply runs for minutes, and your prompt cache stays warm between your calls.`, { label: 'reread', phase: 'Reread', ...OPUS })
+
 phase('Judge')
@@
-  write: cut(w1, 1500), checks: checks.map(c => cut(c, 800)), fix: cut(w2, 1500), judge: cut(j, 2000),
+  write: cut(w1, 1500), checks: checks.map(c => cut(c, 800)), fix: cut(w2, 1500), reread: cut(reread, 800), judge: cut(j, 2000),
```

The description's old words "a checker and a cold read; one fix round; a judge" become "a checker and a cold read; one fix round; a second cold read; a judge".

**File and passage (b).** `record-landing/judge.md`, line 17, the judge's list of sources in the run's folder.

**Old.**

> `check.md` and `cold-read.md`, on the first round; `mech-1.md` and `mech-2.md`, the mechanical checks after each round.

**New.**

> `check.md` and `cold-read.md`, on the first round; `cold-read-2.md`, a second cold read of `clean.txt` after the fix round; `mech-1.md` and `mech-2.md`, the mechanical checks after each round.

**File and passage (c).** `record-landing/README.md`, line 10, the stage list's item 4, and line 46, the list of the run folder's files.

**Old.**

> 4. **Fix**: `drive.sh 2` resumes both streams once with the three reports, then `checks.sh 2` writes `mech-2.md`.

**New.**

> 4. **Fix**: `drive.sh 2` resumes both streams once with the three reports, then `checks.sh 2` writes `mech-2.md`. Then the reread: a second clarity cold reader on the fixed `clean.txt` writes `cold-read-2.md`, which the judge reads.

In line 46, "`check.md`, `cold-read.md`, `mech-1.md`" becomes "`check.md`, `cold-read.md`, `cold-read-2.md`, `mech-1.md`".

**What it restores.** The clarity workflow reads the fixed entries a second time, "Reread: a second cold read of the fixed entries" (`record-clarity/README.md:14`), and its judge holds an entry when "the second cold reader reads it in a way that would make a worker act wrongly" (`record-clarity/judge.md:10`). The landing judge applies that rule (`record-landing/judge.md:19`) but had no second read to apply it to (diff, C19). The cost is one more Opus agent for each run, which the landing's design had cut as a cost lever (`process-engineering/record-landing-workflow.md:223`).

### 13. The run ends when the record is pushed; the rest runs as a second run

**File and passage (a).** `record-landing/record-landing.js`. The script keeps its stages and their order. A new argument, `after`, holds the first run's result. Without it, the run goes from Sort to Land and returns after the push, with `next`, the second run's call. With it, the run skips Sort to Land and starts at the orientation update. The first run's stages sit in a block `if (!AFTER) { ... }` that is not indented, so that their lines stay as they were. `MAIN` moves above the block, since both runs use it.

```diff
-  description: '... one fix round; a judge who applies or holds each change once, makes two commits on the branch and writes diff.md; then, past the judge\'s checks, the commits landed on main and pushed, the worktree and branch removed, and the orientation update run as a child workflow on the entries the landing changed; ...',
+  description: '... one fix round; a second cold read; a judge who applies or holds each change once, makes two commits on the branch and writes diff.md; then, past the judge\'s checks, the commits landed on main and pushed, the worktree and branch removed, where the run ends; a second run on its result (args.after): the orientation update run as a child workflow on the entries the landing changed; ...',
@@
-    { title: 'Land', detail: 'the two commits onto main (a fast-forward, or a cherry-pick if main moved), the checks on main, the three pushes, the worktree and branch removed; then the orientation update, a child workflow', model: 'sonnet' },
+    { title: 'Land', detail: 'the two commits onto main (a fast-forward, or a cherry-pick if main moved), the checks on main, the three pushes, the worktree and branch removed; the first run ends here, and the second run starts with the orientation update, a child workflow', model: 'sonnet' },
@@
 // push and its republish (README.md, "The revival page"). A replay lands nothing and runs no update.
+// The run ends when the record is pushed. The stages from the orientation update on run as a second run of this
+// script, which the coordinator starts with the first run's result as args.after (README.md, "Running it").
 const T = '/home/user/fortress/explorations/coordinator/tools/record-landing/'
 const RC = '/home/user/fortress/explorations/coordinator/tools/record-clarity/'
-if (!args || !args.batch || !args.base || !args.landing) throw new Error('args: { batch, base, landing, at (a replay only) }')
+const MAIN = '/home/user/fortress'
+if (!args || !args.batch || !args.base || !args.landing) throw new Error('args: { batch, base, landing, at (a replay only), after (the second run only) }')
+const AFTER = args.after || null
@@
+let result, l
+if (!AFTER) {   // the first run: Sort to Land, to the record's push. The block is not indented, so that its stages read as before.
 phase('Sort')
@@
-const result = {
+result = {
@@
 // The landing (curator, 2026-11-03 06:2x, HELD.md): the commits go onto main in this run, and the orientation
-// update follows in the same chain. A fast-forward keeps the judge's hashes when main has not moved since AT; a
+// update follows in the second run. A fast-forward keeps the judge's hashes when main has not moved since AT; a
 // cherry-pick lands the same two commits when it has. The judge's diff.md, "Next", gives the update's entries.
-const MAIN = '/home/user/fortress'
 const LAND = {
@@
-const l = await agent([
+l = await agent([
@@
 if (l.stopped) return Object.assign(result, { stopped: 'landed on the local main, not all pushed, no orientation update: ' + l.stopped })
+return Object.assign(result, { next: 'landed and pushed; the second run, on this result: Workflow({ scriptPath: \'' + T + 'record-landing.js\', args: { batch: \'' + N + '\', base: \'' + BASE + '\', landing: \'' + LANDING + '\', after: <this result> } })' })
+}   // the end of the first run
+
+// The second run: its input is the first run's result, whose land holds the landed commits and the facts list.
+if (!AFTER.land || !AFTER.land.landed || AFTER.land.stopped) throw new Error('args.after: the first run\'s result, landed and pushed (its land.landed true and land.stopped empty)')
+l = AFTER.land
+result = { batch: N, after: 'the second run, after the landing of ' + (l.commits || []).join('; ') }
 
 // The orientation update, the child workflow (one level deep), on the entries diff.md's "Next" names. With no
```

The description is shortened here at "..."; the patch holds it whole. Its clause "a second cold read" is adjustment 12's.

**File and passage (b).** `record-landing/README.md`, four passages.

Line 12, the stage list's item 6, its middle:

> Old: the lander puts the two commits on `main`, runs the checks on `main`, pushes, and removes the worktree and the branch; then the script runs the orientation workflow in update mode as a child workflow

> New: the lander puts the two commits on `main`, runs the checks on `main`, pushes, and removes the worktree and the branch. The run ends there. The stages below run as a second run of the script, which the coordinator starts on the first run's result ("Running it"): it runs the orientation workflow in update mode as a child workflow

Line 37, "Running it", after its first sentence:

> Old: It makes `/home/user/fortress-landing-N` on the branch `record/landing-N` at `main`'s head. A replay adds `at`, ...

> New: It makes `/home/user/fortress-landing-N` on the branch `record/landing-N` at `main`'s head. The run ends when the record is pushed, and its result's `next` gives the second run's call. The coordinator starts the second run with the first run's result as `after`; it runs the orientation update, the skill update and the revival page:
>
>     Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-landing/record-landing.js',
>                args: { batch: 'N', base: 'BASE', landing: 'LANDING', after: <the first run's result> } })
>
> A replay adds `at`, ...

Line 46, "What it writes", the sentence on the result, its end:

> Old: and adds `land` (how the commits landed, their hashes on `main`, the refs pushed, what was removed, the entries given to the orientation update) and `orientation`, the child workflow's result; then `skills`, ...

> New: and adds `land` (how the commits landed, their hashes on `main`, the refs pushed, what was removed, the entries given to the orientation update) and `next`, the second run's call. The second run's result holds `orientation`, the child workflow's result; then `skills`, ...

Line 57, "Landing its result", step 6, its first two sentences:

> Old: 6. Reads the facts list of the orientation call in the landed `diff.md`'s "Next" (the entries that the landing and the run added or changed); the script then runs `orientation.js` with `mode: 'update'`, `out` the batch's `climb-batch-N/orientation/` and `stream` `orientation-bN`. Nothing waits on the coordinator between the record's commits and the update.

> New: 6. Reads the facts list of the orientation call in the landed `diff.md`'s "Next" (the entries that the landing and the run added or changed), and returns it in `land.facts`. The first run ends here. The second run, on that result, runs `orientation.js` with `mode: 'update'`, `out` the batch's `climb-batch-N/orientation/` and `stream` `orientation-bN`.

**What it restores.** The curator spoke of "two workflows to do this" (2026-11-03, 06:20 UTC, `HIS-WORDS.md` 8.2, H18), and on 2026-11-24 at 21:33 UTC said that the runs are "running very, very long now". Over 15 runs, a run took 133.1 minutes on average, and the stages after the judge took 72.3 of them, 53%; the record is on `main` and pushed when Land ends (diff, section 6). With the split, the run that holds the record ends near 62 minutes, and the rest runs beside the coordinator's review. The diff names the split a finding for his decision. The change is medium: one argument, one block, one early return and one check; no stage's text changes.

## The batch mode: the clarity workflow's briefs

### 15. The assessor and the writer read a scout's file when one is present

**File and passage (a).** `record-clarity/assess.md`, line 7, sentences added at the end of the paragraph.

**Old.**

> Read bounded sections; rerun no experiment and search no transcript; where either would be needed, record the narrow gap.

**New.**

> Read bounded sections; rerun no experiment and search no transcript; where either would be needed, record the narrow gap. If your folder holds `scout.md`, a scout has listed there, for each entry, the sources it cites and whether they resolve, the section that holds its detail, the commits that wrote it, its earlier texts and the entries that cite it. Use it instead of reading the reports yourself. Open a report only where `scout.md` leaves a mark unclear, with a bounded read.

**File and passage (b).** `record-clarity/writer.md`, under "Read first", a new sub-bullet after "findings" (after line 23).

**Old.** None.

**New.**

> - scout: if your folder holds `scout.md`, a scout has listed there, for each entry, the sources it cites and whether they resolve, the section that holds its detail, the commits that wrote it, its earlier texts and the entries that cite it. Use it instead of reading the reports yourself. Open a report only where `scout.md` leaves a sentence's fate unclear, with a bounded read.

**What it restores.** On 2026-10-13 a Sonnet scout gathered each chunk's evidence before its writer (`evidence/october-briefs/03-scouts-template.md:12-19`), and the writer's brief said: "The scout's file for your chunk [...] lists for each entry the sources it cites and whether they resolve, the section that holds its detail, the commits that wrote it, and the entries that cite it. Use it instead of reading the reports yourself. Open a report only where the scout's file leaves a sentence's fate unclear, with a bounded read" (`05b-writers-template-after-edit.md:20`). The curator wanted the scouts kept (`HIS-WORDS.md` 4.7; 8.4). The clause reads the file only when it is there, as the writer reads `findings.md`, so a run without scouts is as before. The step that runs the scouts is around the tool and is not made here (diff, 3.2, item 2; B5).

### 16. The goal, the total beside the 600 check, and the worked examples in the clarity writer's brief

**File and passage (a).** `record-clarity/writer.md`, line 14, the end of "The problem".

**Old.**

> Keep the meaning.

**New.**

> Keep the meaning. The curator's goal for the record, in his words (17:23 UTC, 2026-10-13): "I really hope that the consolidated record is significantly smaller than before. Like that is a goal. [...] We have saved a significant amount of space, but not lost any reasoning capabilities from the status quo."

**File and passage (b).** `record-clarity/writer.md`, line 36, step 10 of "How to write each entry".

**Old.**

> 10. Keep each entry near 600 characters as a check, not a cap. Clarity comes first.

**New.**

> 10. Keep each entry near 600 characters as a check, not a cap. Clarity comes first. Shorter entries pay for a longer one: the total of your entries stays under 600 characters times their count.

**File and passage (c).** `record-clarity/writer.md`, line 19, under "Read first".

**Old.**

> - What an entry holds: `.claude/skills/coordinator/references/record.md`, "What an entry is".

**New.**

> - What an entry holds: `.claude/skills/coordinator/references/record.md`, "What an entry is", and the five worked examples that it names, which you follow exactly: `explorations/coordinator/tools/facts-extract.sh 'doc:explorations/coordinator/process-engineering/record-rule-draft.md#Worked examples'`.

**What it restores.** The October writers' brief quoted his goal with its measure (`evidence/october-briefs/05b-writers-template-after-edit.md:6-8`), and its budget was "the chunk's total is under 600 characters times its staying entries" (`:25`); the definition says "shorter entries pay for it: a chunk's total stays under 600 characters times its entries" (`process-engineering/record-rule-draft.md:144`). The worked examples are October's "Follow them exactly" (`05b:12`; diff, C2). The landing's entries writer reads this brief's "How to write each entry" (`record-landing/entries.md:21`), so step 10's new sentence reaches the landing too, as the diff says (3.2, item 4). Parts (a) and (c) reach only the clarity runs.

## The choices made where the diff left one

1. **Adjustment 1, "an owed correction".** I read it as a change of `owed.md` that corrects an entry, such as one of kind "made false" or "stale". "The pass" is freed from the findings clause only on a FACTS entry: a POSITIONS entry keeps the curator's rule of 2026-10-31, which the same brief states ("you change only the sentence that the change names").
2. **Adjustments 2 and 9, the reach of questions 3 to 5.** "Every sentence of each entry in reach" (diff, C3) is each FACTS entry that the entries writer writes. POSITIONS entries keep the rule of 2026-10-31. The sentence that sends skill detail to the skill writer stays, since the diff marks that flow "same" (B11) and the curator's word forbids only the skill as a ground to cut.
3. **Adjustment 2, `lengths.py`.** Only its header's claim that the judge holds a grown entry goes. Its mark "grew past 600" and the line that lists such entries stay as information, so `checks.sh`, which reads that line, needs no change. `README.md:24`, which stated the hold, is changed with adjustment 6, so that it does not state a rule that is gone.
4. **Adjustment 2, "keep the named reason".** The named reason is the decision or the misreading that a sentence past 600 prevents, in the words of `record-rule-draft.md:144` and item 50.
5. **Adjustment 3, a cut and a condition.** In `check.md` the new sentence says "A cut that keeps every condition", so that it does not override "keeps every condition" beside it. In `judge.md`, "drops a condition" stays a reason to hold.
6. **Adjustments 4 and 16, the examples.** The query is the one `record.md:59` gives. The writers "follow them exactly", the October words; the checker reads them.
7. **Adjustments 5 and 16, the goal.** One quote: his October words (`05b:6`), cut in the middle at "[...]". No number, since the diff names today's number a gap. His words of 2026-11-24 in `HIS-WORDS.md` 8.8 are cited as a source of the adjustment, not quoted in the brief.
8. **Adjustment 6, the totals.** Characters of the whole files, at AT and in the worktree. The changed entries' total counts only the entries that stand after the change, so a merged or removed entry is not counted.
9. **Adjustment 7, the weight.** Weight none only when all six checks pass. A failing check takes high or low by the weight's existing words.
10. **Adjustment 8, the merge home.** It is a variant of the FACTS entry home, for FACTS only, so the count of homes stays nine, and neither the rule that gives each home its writer (`sort.md:36`) nor the entries writer's four homes (`entries.md:11`) changes. A merge of POSITIONS entries would change decisions' text, which the rule of 2026-10-31 holds for the curator. Other notes that cite a merged entry by number (PLAN, the queue) are not repointed: `record.py` repoints only FACTS and POSITIONS.
11. **Adjustment 11, the search.** `evidence.py` lists, for each changed entry, the other entries that share its code spans or its ledger rows; it reads no title words. It lists a pair when it shares two terms, one row, or one term that at most three entries hold; a term that more than 15 entries hold is left out; at most ten for each entry. The sorter searches further with `facts-extract.sh`. The search for a changed behaviour or figure is the sorter's, with the same list; the diff allowed either the sort or `evidence.py` (I5), and its adjustment 11 names both.
12. **Adjustment 12, the judge.** The judge's list of sources names `cold-read-2.md`, since otherwise the second read would reach no one. The README's stage 4 and its list of files name it too.
13. **Adjustment 13, the shape.** One script, two runs: the argument `after` takes the first run's result, as the task asked. The first run's block is left unindented to keep the diff small. Two sentences of `judge.md` still say that the Land stage "runs the orientation update" (`judge.md:9`) and reads the facts list "to run the update" (`:52`): the diff names only the script and its README for this adjustment, so I left them, and they are now inexact about which run starts the update.
14. **Adjustment 15, the scout's list.** The clause names what the October scout wrote for every entry. It leaves out the curator's dated words, which the scout gathered only for POSITIONS, where the clarity writer has `entries.py`.
15. **Adjustment 16, its scope.** The task described adjustment 16 as the goal and the size; the diff's item 16 also names the worked examples at `writer.md:19` ("with C2"). I made all three; part (c) is one sentence and can be dropped alone. The size is the total of the writer's entries against 600 times their count, as October's budget was; the whole record's size is measured around the tool, by the coordinator (diff, 3.2, item 4), and is not made here.

## The adjustments not made

- **14, 17, 18, 19 and 20**: the grouping step, the pilot in two rounds, the test of decisions, the step in which whole entries leave, and the deletion-only sweep. Each goes around the clarity workflow and is not an edit of its briefs.
- **15 and 16, their parts around the tool**: the step that runs the scouts before a clarity run, and the coordinator's measure of the total after each chunk.
- **21**: the one section that names the process and its two modes, in both READMEs and in `record.md:88-110`. It changes the skill's text, through the skill writer.
- **9, its part in `record.md:40`**: already on `main` (`bf8e946daa`).

## What the checks showed

All checks ran in `/home/user/rec-adjust`, in scratch copies, or in the trial clone. None ran a workflow.

- **The harness's parse.** `record-landing.js`, its export made `const` and its text made the body of an async function, as `workflow-scenarios.js` parses a script: accepted. The trial clone's copy too. `record-clarity.js` did not change. `workflow-scenarios.js` itself checks only the batch script, so I ran its parse step alone.
- **The script's paths, with stubbed agents.** A scratch harness ran `record-landing.js` with stub agents in five cases. A replay (`at`) runs sort, write, check, cold read, fix, reread, judge, and returns: no Land. A first run runs the same, then land, and returns `next`. A second run on that result runs no sort; it calls the orientation workflow, then the skill writer, the skill cold read, the skill fixes, the page, the push, the revival page and its publish. A first run whose push is refused stops with "landed on the local main, not all pushed". A second run on such a result refuses to start. On its first try the harness found that `MAIN` was declared inside the first run's block; I moved it above the block, and all five cases then passed.
- **`lengths.py` on climb batch 36's landing**, from the run's AT `99035e231` to its first record commit `69750f4c24`, in a scratch clone. `main`'s version prints the same 23 entries and "13 already over 600 grew" as the run's `mech-final.md`. The adjusted version prints the same, then:

      lengths: the 23 changed entries that stand now hold 44834 characters, against 600 times 23, 13800 (+31034)
      lengths: FACTS.md from 427378 to 427308 characters (-70); POSITIONS.md from 119751 to 119681 characters (-70)

  Both files are 70 characters shorter; I checked each size with `git show` at both commits.
- **`evidence.py` on climb batch 36's range** (base `b5a758846`, landing `61b50cd34`, AT `99035e231`), in a scratch clone: `entries.md`, `rows.md`, `plan.md`, `checks.md` and `sources.md` are byte for byte the run's own, its worktree path aside. `cites.md` differs only by its header comment and its new last part: 24 of the changed entries share terms with others, and the file grows from 29,274 to 37,082 bytes. For example, it pairs F-225 with F-377 (six shared terms, linked) and F-405 with F-26 and F-253 (row 1134). A first version took text between two code spans for a span; the pattern now requires a span to open with a word character or a path's character.
- **The trial clone.** `evidence.py` there, at the trial's head, writes the same files; `checks.md` differs in one count (5,055 against 5,051 citations of PLAN by line number in the whole tree, from evidence files committed after the run's AT). `drive.sh 1 --dry-run` there copies the trial's own adjusted `entries.md` and `routing.md` and starts the trial's `writer-stream.sh`.
- **Not run.** The workflows (the coordinator starts the trial); `checks.sh` and `final.sh`, which need a run's files; the self-tests of `record.py` and `ledger.py` (`test_record.py`, `test_ledger.py`), whose files did not change. The two tools have no self-test beyond the `--dry-run` modes.

## A trial on climb batch 36's landing, prepared and not started

**The clone.** `/home/user/fortress-trial`, a local clone with its remote removed (`git remote -v` prints nothing). Its branch `main` holds three commits on top of the history: `0d32ca21f7`, the commit just before the landing's record commits (`69750f4c24` and `abd72c0f48` were picked onto it); `4e3148877e`, the patch; and `eced72e375`, the trial's own changes. These are: every path of the record-landing and clarity tools, `ledger-clarity/apply.py` and `skill-writer-brief.md` that named `/home/user/fortress` now names `/home/user/fortress-trial`, and the worktree is `/home/user/fortress-trial-landing-N`; `.claude/settings.json` is empty, so the writers' sessions run no hook and hold no push permission; and question 5 of `record.md` reads as on `main`. The record files at `eced72e375` are those of `99035e231`, the run's AT.

**The call**, for the coordinator:

    Workflow({ scriptPath: '/home/user/fortress-trial/explorations/coordinator/tools/record-landing/record-landing.js',
               args: { batch: '36', base: 'b5a758846', landing: '61b50cd34', at: 'eced72e375' } })

With `at`, the run is a replay: it makes `/home/user/fortress-trial-landing-36-replay` on `record/landing-36-replay` in the clone, runs Sort, Write, Check, Fix, Reread and Judge, and returns. The judge's two commits stay on that branch in the clone. Its result compares with the landed run's folder, `explorations/compile-ladder/climb-batch-36/record-landing/`, and its commits `69750f4c24` and `abd72c0f48`.

**Each way the trial could write to the real repository or push, and how it is closed:**

1. `T`, `RC` and `MAIN` in the script name `/home/user/fortress`. The agents would read `main`'s briefs; `prepare.sh` would make the worktree and its branch in the real repository; the Land stage would land on the real `main` and push. Closed: the trial's commit names `/home/user/fortress-trial` in each.
2. The worktree's name `/home/user/fortress-landing-N-replay` is what a real replay uses, and `prepare.sh` keeps a worktree that exists. Closed: it is `/home/user/fortress-trial-landing-36-replay`, which does not exist.
3. `judge.md` tells the judge to run `/home/user/fortress/.../final.sh`; `ledger-clarity/apply.py` runs `main`'s `ledger.py`. Closed: both name the clone.
4. The Land stage merges onto `main` and pushes three refs; the stages after it commit on `main` and push. Closed twice: the replay returns after the judge, and the stub run of the trial's own script shows no Land agent; and the clone has no remote, so a push would fail.
5. A local clone's `origin` is the real repository's path: a push there updates its refs. Closed: the remote is removed.
6. The writers' headless sessions load the worktree's `.claude/settings.json`. `main`'s copy runs a Stop hook that commits transcripts into `/home/user/fortress-transcripts-blinded`, a worktree of the real repository, and pushes; it also allows `git push origin main`. Closed: the trial's settings are empty.
7. The clone's objects are hard links of the real repository's packs. Git never writes an object file in place, and a gc in the clone only removes its own links. Nothing to close.

**Two ways outside the script, not closed:**

- The agents are not sandboxed. A headless writer started as `writer-stream.sh` starts it can write a file anywhere: in a test, one wrote `/home/user/permprobe-b/probe.txt` from another folder with no denial (removed after). Its shell allows only read-only commands, so it cannot commit or push. The Workflow's own agents run with the coordinator's permissions. Only their briefs, which now name no path of the real tree, keep them in the clone. This holds for every run of the tools.
- The coordinator's own Stop hook backs up every session transcript on the machine, the trial's among them, to the branch `transcripts-blinded`, and pushes it. That is not the trial's push, and it touches no record file and no ref of `main`.

**Verdict.** Every way that the script and its tools write to the real repository or push is closed. The trial is safe to run on that ground. If the curator counts the two ways outside the script, it must wait for his word on them.
