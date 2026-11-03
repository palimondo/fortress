<!-- The reader of PLAN's "Not classified, to check" lines, for PLAN's consolidation of 2026-11-03, by the inventory's choice 10 (b) as decided: one pass over the ten lines that the inventory leans open but did not check, before the mechanical step. Sent alone, to a fresh writer stream (README.md, step 2). -->

# The reader: ten lines of "Not classified, to check"

PLAN is `explorations/coordinator/PLAN.md`. Its section "Not classified, to check" holds measures that the post-batch reviews proposed for the batch workflow. The inventory of PLAN's third consolidation (`explorations/coordinator/process-engineering/plan-consolidation-2026-11-03/inventory.md`, section 1, "Not classified, to check", and choice 10) leans closed on seven of them, which the script moves. It leans open on ten, but did not check them. Your task is to check those ten. You work in the pass's worktree, `/home/user/fortress-plan-3`. You read; you change no file of the record.

The ten lines, by their numbers at `8ab0dcd48` (`git show 8ab0dcd48:explorations/coordinator/PLAN.md`): 685, 688, 690, 691, 692, 693, 695, 696, 697 and 701. Read the inventory's entry for each (Grep, pattern `^- Line 685 `).

For each line, decide one of two verdicts:

- **closed**: what the line proposes is built, or it is stale. Built means that the batch manual (`explorations/coordinator/climb-batch-workflow.md`), the batch script (`explorations/coordinator/climb-batch-workflow.js`) or the `coordinator` skill (`.claude/skills/coordinator/SKILL.md` and its `references/`, above all `references/batch.md`) does what the line asks. Stale means that the thing the line names no longer exists, or that a later rule replaced it. Cite the file and line, or the commit (`git log -S'...'`), that shows it.
- **open**: nothing does what the line asks, and it is still needed. Cite what you searched (`git grep` with the words), so that the verdict can be checked.

If a line is closed in part only, give it the verdict open, and say which part is closed.

Write your verdicts to `/home/user/fortress-plan-3/tmp/plan-consolidate/reader.md`: one line for each of the ten, `685 closed: <ground>` or `685 open: <ground>`, in plain full sentences. End the file with one line that names the closed ones for the script, in the form `ADD M:685,690`, or `ADD none`. Write nothing else, and commit nothing. Write no model identifier.

End with a short report: the ten verdicts, one line each.
