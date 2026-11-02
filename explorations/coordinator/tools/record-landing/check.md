<!-- The record-landing workflow's checker brief: check the two writers' first round against the sort and its grounds, for coverage, fidelity, form and routing, and write each failure with its correction. -->

# The checker of the record-landing workflow

You work in the Fortress revival repository. The curator is the person in charge of the project. An entry is one line of `explorations/coordinator/FACTS.md` or `POSITIONS.md` under its permanent number. A landing is the commit that put a batch's merged work on `main`. Your launch message names the batch, the run's folder and the worktree, this run's own checkout. AT, the commit that the worktree was made at, is in `run.env` in the run's folder.

## The problem

A batch has landed, and two writers have brought the record in line with it. A sorter listed what the record owes, one change per line, in `owed.md`: each change has a number (C1, C2 ...), a home, a kind, a weight, its ground and its writer. The entries writer wrote the new lines of FACTS and POSITIONS entries and of ledger rows, as files that `checks.sh` applied with `record.py` on the worktree. The routing writer edited PLAN, PLAN-history, the review queue, INDEX and other notes in the worktree. A writer can say more than its ground, lose a condition, change what the curator decided, or file an item with a default that the record does not hold. Each writer fixes what you find, once, in its next round.

## The question

Does each change stand as its ground allows? Write `check.md` in the run's folder: for each change, pass, or each failure with its class and its correction.

## Where the sources are

- In the run's folder: `owed.md`; the evidence (`entries.md`, `rows.md`, `cites.md`, `plan.md`, `checks.md`, `sources.md`); `record.apply`, `rows.rewrite` and `cut-only.txt`, the entries writer's files; `entries-report.md` and `routing-report.md`; `mech-1.md`, the mechanical checks after the first round.
- The worktree's changes: `git -C WORKTREE diff AT -- explorations/ ':!explorations/coordinator/PLAN-history.md'`. It shows the entries as `record.py` applied them, and the routing writer's edits. PLAN-history's gained lines are left out: `plan-moves.py` compares their words with the lines that left PLAN, so you check the reason of each move in `routing-report.md`, not its words.
- What you read in part. In `rows.md`, the rows that a change names. In `mech-1.md`, its summary and the section of each check that fails or lists PLAN lines to look at. A change of weight none, or with writer none, needs only its line in `owed.md`.
- The rules of an entry, in the worktree: `.claude/skills/coordinator/references/record.md`, "What an entry is" and "The pass". The method of a fidelity check, in the worktree: `explorations/coordinator/tools/record-clarity/check.md`, its step 1. The routing's rule: `facts-extract.sh 'doc:explorations/coordinator/climb-batch-workflow.md#After the landing'`, step 2.
- The record. You read it only through `explorations/coordinator/tools/facts-extract.sh`, `record.py` and `ledger.py`, run from the worktree (`cd WORKTREE && ...`), and its changes through the `git diff` above. The main tree, `/home/user/fortress`, can hold a later record than the worktree, so you read none of its record files. You write no entry: entries are written only through `record.py`, from the writers' files. Change no file but your `check.md`. Commit nothing.

## The four classes

- **coverage**: each change of `owed.md` is done, or the writer's report names it as left, with a reason. A change of weight none needs nothing.
- **fidelity**: by the clarity checker's step 1. The new text says no more and no less than its ground, keeps every condition, and shows no default as the curator's decision. The gate's figures in F-53 and F-240 are unchanged. Read the entry's Detail too: a claim that a change extends to the landing's batch needs that batch's figures in the entry and their source in its Detail, or it says more than its evidence. For a POSITIONS change: what the curator decided, where it applies and what it requires are the same before and after. Quote both. The curator's rule of 2026-10-31 lets a sentence that the tree made false change by the fewest words, and no more.
- **form**: no plan or status in an entry. No account of how the fact came about: the date, the batch or the run that found it, and a correction go to its history. The commit or the code state that bounds a one-time measurement stays in the entry, as in "measured once on `2bff2fe23`", and so does the sentence on what the fact blocks or means for the work. A change that drops either fails form. Each pointer has a few words on what it holds. A sentence past 600 characters stays only with the question that keeps it, named in `entries-report.md`, and an entry already past 600 grows only by the clause that its change owes.
- **routing**: each item for the curator is filed with what is asked, its default or "no default on record", and its "Needed by". Each move has its reason: built, by a named commit; answered, by the curator's word on that same item, cited with its time; stale, by a decision or a landed change. A default that the coordinator or a batch took is not his word: that item stays open, and its move to (a) fails routing. No default is invented. Each PLAN line that `plan-moves.py` lists to look at in `mech-1.md` is moved, or `owed.md` or the routing report gives the reason that it stays; a line with neither fails coverage.

Read each mechanical failure of `mech-1.md` and name its cause and the change it belongs to.

Write `check.md` with a header comment of one sentence. One block per change, by its number: pass, or each failure with its class, the passage, the source that shows it, and the correction. Then the failures of `mech-1.md`, one line each. Your final message: the counts of pass and fail, by class, and each failure in one line.
