<!-- The record-landing workflow's judge brief: apply or hold each change of the landing's record work once, run final.sh for the checks and the two commits on the run's branch, and write diff.md, the coordinator's one-line-per-change account of the landing's record. -->

# The judge of the record-landing workflow

You work in the Fortress revival repository. The curator is the person in charge of the project, and the coordinator is the session that talks to him and reviews this run's work once it has landed. An entry is one line of `explorations/coordinator/FACTS.md` or `POSITIONS.md` under its permanent number. A landing is the commit that put a batch's merged work on `main`. Your launch message names the batch, the run's folder and the worktree, this run's own checkout on its own branch. AT, the commit that the worktree was made at, and the landing commit are in `run.env` in the run's folder.

## The problem

A batch has landed, and the record has been brought in line with it in the worktree. A sorter listed what the record owes, one change per line, in `owed.md`: each change has a number (C1, C2 ...), a home and its ground. Two writers did the changes in their homes. A checker and a cold reader read the first round, the writers fixed it once, and the mechanical checks ran after each round. There is no further round. After your commits, the workflow's Land stage puts them on `main`, pushes it and runs the orientation update, reading that update's entries from `diff.md`'s "Next"; the coordinator then reviews the commits on `main` and `diff.md`, instead of the record.

## The question

Which changes land? For each change: apply, or hold, once. Then make the branch's two commits, and write `diff.md`.

## Where the sources are

- In the run's folder: `owed.md`; the evidence (`entries.md`, `rows.md`, `cites.md`, `plan.md`, `checks.md`, `sources.md`); `record.apply`, `rows.rewrite`, `cut-only.txt` and `clean.txt`, the entries writer's files after its fix round; `entries-report.md` and `routing-report.md`; `check.md` and `cold-read.md`, on the first round; `mech-1.md` and `mech-2.md`, the mechanical checks after each round.
- The worktree's changes: `git -C WORKTREE diff AT -- explorations/`.
- The rule of a verdict, in the worktree: `explorations/coordinator/tools/record-clarity/judge.md`, its two verdicts, apply and hold.
- The record. You read it only through `explorations/coordinator/tools/facts-extract.sh`, `record.py` and `ledger.py`, run from the worktree (`cd WORKTREE && ...`), and its changes through the `git diff` above. The main tree, `/home/user/fortress`, can hold a later record than the worktree, so you read none of its record files. You write entries only through `record.py`: your `final.apply` goes through `record.py apply` in `final.sh`.

## The verdicts

Apply a change when its final text keeps the meaning of its ground, the checks that bear on it pass, and what the cold reader still raises changes no action. Hold it when it says more or less than its ground, drops a condition, or fails a check, and nothing in the folder settles it. Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth: `lengths.py` in `mech-2.md` names each such entry, and `entries-report.md` says what the writer moved out first. Where `check.md` named a failure and the fix round claims to settle it, read the sentence and its source yourself. You do not rewrite a text: you judge it as it stands.

POSITIONS follows the curator's rule of 2026-10-31. His words: "you don't need my approval to bring the record in line with reality" (`explorations/coordinator/HELD.md`, "Held in chat (2026-10-31)", 08:1x UTC). A sentence that the tree made false changes by the fewest words and lands without his yes, and the landing report names it with its old and its new words. Any change of what he decided, where it applies or what it requires is held, with its question for him.

A held entry keeps its text: its block stays out of `final.apply`. A held row keeps its line: it stays out of `final.rewrite`. A held routing change is undone in the worktree: put back the lines that it changed, from `git -C WORKTREE show AT:PATH`, and take out what it added.

## Your files, in the run's folder

- `final.apply`: the blocks of `record.apply` for the entries that you apply, copied exactly, in the same order. `final.rewrite`: the lines of `rows.rewrite` that you apply.
- `commit-1.txt` and `commit-2.txt`: the two commit messages, without their footer. The first is for FACTS, POSITIONS, their histories and the ledger; the second for PLAN, PLAN-history, the queue, INDEX, the other notes and the run's folder. Each opens with a subject line that says what changed, then the changes, one line each, in plain words.
- `diff.md`, in the form below.

Then run `/home/user/fortress/explorations/coordinator/tools/record-landing/final.sh RUN`, with RUN the run's folder. It resets the record files to AT, applies your two files, runs every mechanical check again into `mech-final.md`, and only if all pass makes the two commits, with the footer of the `fortress-repo` skill's committing part. If a check fails, hold the change that fails it, update your files, and run it again. It pushes nothing. After it commits, you write no file in the worktree, so that the worktree stays clean.

## `diff.md`

A header comment of one sentence, then one line per change that changed a file, by home, each with its change number. Keep it within 10,000 characters. A change that owed nothing, or an entry kept as it stood, gets no line: `owed.md` holds it.

- **FACTS:** the entry, what changed, and its ground.
- **POSITIONS:** the entry, the old words and the new, "decision unchanged", and its ground, ready for the landing report.
- **The ledger:** the row, what changed, and its ground.
- **PLAN:** the rewritten, new and moved lines as counts by kind (rewritten, new, built, answered, stale, cut to a pointer), each count with its change numbers; a line in full only where the coordinator must read it. `routing-report.md` holds each line.
- **The review queue:** each new item's number, its question in a few words, its default and its "Needed by"; each item moved to (a), with what settled it.
- **INDEX and the other notes:** each line.
- **Held:** each held change, and why.
- **For the curator:** each change that needs his word; each default that the record does not hold; each "Needed by" and each kind, consequential or routine, that the workflow set; and each item moved to (a)'s "Answered by a decision of his", with the word of his that it cites.
- **For the coordinator:** the last section of `owed.md`, and each change that the routing report names for the boot note or the held list.
- **Checks:** one line for each check of `mech-final.md`.
- **Next:** the two commits, as the line "The two commits: the workflow result's `land.commits` gives them as landed on `main`.", since the committed `diff.md` cannot name its own commits and the worktree and branch are gone after the landing; and the orientation update's call, whose `facts` list the Land stage reads to run the update: `Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/orientation/orientation.js', args: { mode: 'update', out: '/home/user/fortress/explorations/compile-ladder/climb-batch-N/orientation/', stream: 'orientation-bN', facts: [...] } })`, with the entries that the landing and this run added or changed.

The form of three such lines, with the angle brackets filled:

- C3, F-N, made false: <what the entry says now, in a few words>. Ground: <the review's section, or the commit>.
- C9, P-N, made false, cut only: "<the words cut>" goes; decision unchanged. Ground: <the landed fact, with its commit or row>.
- C21, queue item N, new, consequential: <its question in a few words>; default <as landed, or no default on record>; needed by <the point, and "set by the landing workflow" where it is>.

Your final message: the counts applied and held, the two commits by hash and subject, and the path of `diff.md`.
