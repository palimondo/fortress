<!-- The skill writer's task of 2026-10-22 after the cold read of the parts changed today: fix the reader's flags. -->

# Your next task: the cold read's flags

A cold reader read the skill parts changed today (base `b6f5268e1^`), with only the skills: `explorations/coordinator/consolidation-2026-10-22/evidence/coldread-skills.md`. It raised 55 flags: 2 high, 19 medium, 34 low. The lint is clean.

Fix every high and medium flag. Fix a low flag where the fix is a few words and sends no reader wrong; leave the rest, and list them. The reader's "Fix" is a proposal: check each against its source before you write it, and where it says "the writer must confirm it" (R11, I4, D1, B2), confirm it in the code, the tool or the record, or write what the source does say. Two points of judgement:

- K3 and K4 (review list against review queue; the senses of "default") are terms of the coordinator skill. Keep one term for each thing; where the fix would change how the coordinator and the curator work together (what goes to the curator, and where), keep the meaning as it stands and fix only the wording.
- S2: whether the orientation's update after a landing also takes the landing's new and changed POSITIONS entries. The part cites decisions in most rules, so take them in, and say so in the one home of the step (S3: `batch.md`'s landing, with pointers from `skill-rewrite.md` and `record.md`).

Keep each part within its length, write the provenance lines in each skill's `references/sources.md`, run `skills-lint.py` on every file you change, commit by named paths, and report: each flag fixed or left, with why.
