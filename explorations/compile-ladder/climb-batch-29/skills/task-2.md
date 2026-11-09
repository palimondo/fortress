<!-- The record-landing workflow's second task for the skill writer: fix the flags of the cold read of the first task's commits, in the same writer session; skills.sh appends the paths. -->

# Your second task: the cold read's flags

A cold reader read your commits of the first task as a worker new to the repository would, and flagged each passage that would send that worker wrong or make it search. Its report is named at the end of this task. Fix its flags. No coordinator rules on them before you, so each verdict is yours, by the rules below.

## Each flag

- **Fix it** if the passage would send a worker wrong or make it search. Take the fix that the flag proposes, or a better one. Before you state a fact in a fix, check it in its source: the entry (`explorations/coordinator/tools/facts-extract.sh 'F-315'`), the row (`git grep -n '^| 889 ' -- explorations/fortress-gap-ledger.md`) or the code.
- **Delete** a passage that names a question, item, batch, rung, review or record file as a rule's source, or gives a decision's status, as the cold-read brief proposes. Do the same for a lint hit.
- **Leave it**, with its reason in your report, if the record does not settle it, if the flag is wrong, or if its fix would change what a rule means. A change of meaning is a decision not taken: name its alternatives.

Take every flag of high or medium confidence. Take a low one where its fix is clear. Edit only the files that your first task changed, and another sentence only where your fix makes it false.

## Committing

Run `python3 explorations/coordinator/tools/skills-lint.py` on the files you changed. Commit by named paths, as your standing brief says, with the subject "fortress-repo: the cold read of" and the batch's landing. Do not push.

## Your report

The page worker shows the net change of both your tasks to the curator, so give each fix's reason in plain words: what a worker would have done wrong, and what the text now says. Name no flag by its code or its number in those reasons. Then: the commit, with its hash; each flag, by its part and its passage, with what you did and its ground, or why you left it; each decision not taken; each point for the coordinator.

## This round's data

The cold read: `/home/user/fortress/explorations/compile-ladder/climb-batch-29/skills/cold-read.md`. Your first task: `/home/user/fortress/explorations/compile-ladder/climb-batch-29/skills/task-1.md`. The commits before the cold read: `git log --format="%h %s" 5febd82a7..main -- .claude/skills/`.
