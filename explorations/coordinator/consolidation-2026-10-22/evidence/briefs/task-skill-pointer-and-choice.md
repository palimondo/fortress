<!-- The skill writer's task of 2026-10-22, 22:19 UTC: two rules of the record that the curator approved word for word. -->

# Your next task: two approved rules of the record

The curator approved these two changes word for word in chat at 22:19 UTC on 2026-10-22. Write them as given. Change no other meaning.

## 1. A decision may point to a fact

In `.claude/skills/coordinator/references/record.md`, "What an entry is", the POSITIONS bullet now ends: "It lists no FACTS entries: `P-48+` finds them." Replace that last sentence with:

"It may point to a fact that it rests on, in the sentence that needs it. `P-48+` finds every fact that points to it."

The reason: 24 of the 81 POSITIONS entries point to a fact, and the curator's page comment of 16:56 UTC (thread `b64dca1f` on https://claude.ai/artifact/XSW5Pz56938NcmCPg4GMZb) said that decisions do refer to facts. The one-way rule stays as it is: PLAN and the review queue point to entries and rows, and no entry points to them.

## 2. A worker's landed choice is a fact

Directly after that bullet, add:

"- POSITIONS holds only the curator's decisions. A choice that a worker made and landed without the curator's word is a fact about the tree. Its FACTS entry says that a worker chose it, and its review-queue item names that entry."

In `.claude/skills/coordinator/SKILL.md`, the glossary's **default** now reads: "Option that stands unless the curator picks another: the one that an ask recommends, or the choice that an agent landed without the curator's word, whose item waits in the review queue." Make it: "… or the choice that an agent landed without the curator's word, which FACTS states and whose item waits in the review queue."

## Also

- Grep both skills for any other sentence that these two rules make false (for example, one that keeps an agent's choice in POSITIONS, or one that forbids a decision to point to a fact). Fix each in the fewest words, and list it in your report. Add no rule to `fortress-repo`: the worker hands over its decisions in its report already, and the pass turns them into entries.
- Add the provenance lines to `.claude/skills/coordinator/references/sources.md`: the curator's approval in chat, 2026-10-22 22:19 UTC; rule 1 from his page comment of 16:56 UTC; rule 2 from the coordinator's proposal of about 16:45 UTC, applied in the POSITIONS follow-up at `4d7df29c3`.
- Run the skills' lint, `explorations/coordinator/tools/skills-lint.py`, and keep it clean.
- Commit only the paths that you changed, by name. Do not push.
- Report: each change with its file and line, the lint's result, the commit.
