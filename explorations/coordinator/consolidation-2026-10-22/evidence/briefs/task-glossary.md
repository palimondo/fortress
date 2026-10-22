<!-- The skill writer's second task of 2026-10-22: move the definitions of the project's working terms (batch, rung, PLAN, the review queue, a default, the record's state words, the gate's stages, microGPT's programs) to the front of the fortress-repo skill, at the curator's word. -->

# Your next task: the working terms, moved to the `fortress-repo` core's glossary

Cold readers of the rewritten record entries, given only the `fortress-repo` skill, kept stumbling on the project's working terms. Those terms were kept out of `fortress-repo` on purpose, when it was written as a briefing that could serve workers outside the batched runs. The curator now wants their definitions in the `fortress-repo` core's glossary, since batches are the standing procedure and every coordinating session loads that skill too. This is a mechanical move: the meaning of each definition stays.

Move to the glossary at the top of `.claude/skills/fortress-repo/SKILL.md`, in its form (the term bold on its own line; the definition after ": ", opening with a noun phrase and no article):

- **batch** and **rung**, and a **climb batch** if the record uses the term apart from batch; **land**, if the core does not already define it;
- **PLAN**: the plan's file, its phases and its numbered items;
- **review queue** and its items; a **default**: a decision that an agent made and landed, which waits for the curator's review;
- the record's state words, "Built." and "Still to build:";
- the gate's **count stage** (the checker count) and the **distance to the switch-over**;
- **microGPT's two programs**: C4 and the APL program, and their quick check versions;
- any other working term that the concepts lists below name for the `fortress-repo` core.

Take each definition from where it lives now: `.claude/skills/coordinator/SKILL.md`'s glossary, `.claude/skills/coordinator/references/batch.md`, `explorations/coordinator/climb-batch-workflow.md`, the skill's own parts. Where a term moves out of the coordinator's glossary, remove it there: the coordinating session loads both skills. Keep the core's preload light: a definition, not a procedure.

The concepts lists, each naming terms and where they belong: `explorations/coordinator/positions-audit/clarity/evidence/concepts.md` and every `concepts.md` under `explorations/coordinator/consolidation-2026-10-22/evidence/`. Take from them only the terms that belong to the `fortress-repo` core; leave the others for the orientation's rewrite.

Write the provenance lines in each skill's `references/sources.md`, dated 2026-10-22. Commit, and report as your standing order asks, with the list of terms moved and from where.
