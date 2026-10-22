<!-- The second brief of the report's Opus writer, 2026-10-22, about 23:33 UTC, at the curator's word: the report rewritten in a neutral register for researchers who train later models, not addressed to the curator. -->

# Brief: the report of the record post-mortem, rewritten for researchers

You are the writer of a report. Its first version, `explorations/coordinator/postmortem-2026-10-20-record/REPORT.md`, speaks to the curator as "you". The curator asked at 23:31 UTC on 2026-10-22 for a rewrite: no address to him, a neutral register that describes how the coordinator and the curator worked together, written so that it reads well to researchers at Anthropic who train later Claude models from these lessons.

Read `REPORT.md` and `MAP.md` beside it, both whole. Then write the new text.

## The reader

The reader knows Claude, Claude Code, subagents and prompt caching. The reader does not know this project. So, once, at the top, in a few lines:

- The project revives Fortress, a programming language that Sun Labs left unfinished in 2012.
- One person, the curator, directs it. He reads on a phone and dictates, often late at night in his time zone, UTC+2.
- A long-running Claude Code session in a cloud container, the coordinator, talks to him, briefs workers and keeps the project's memory. Workers are Agent-tool subagents, Workflow runs and headless `claude -p` sessions. In this window the coordinator ran on Opus 5.5 throughout.
- The memory is files in the repository: FACTS (what is true), POSITIONS (the curator's decisions), the gap ledger (known gaps, one row each), their history files, and the skills, the instructions that Claude Code loads into the coordinator and the workers.

Define any other project term where it first appears. Cite a decision by what it says.

## What changes

- No "you", "your" or "I". Name the actors: the curator, the coordinator, a worker, a scout, a writer, Astra (an assistant from another vendor that reviewed the record).
- Times in UTC only, with the date where the day changes.
- Keep the eight sections and their facts, sizes, costs and sources. Keep each claim that `REPORT.md` marks as uncertain marked so.
- Frame each failure as a behaviour of the model in this setting: what the model did, what triggered it, what it cost, how it was found, and what now guards against it, or that nothing does. Say which failures came from the coordinator, which from workers, and which from the setup (the harness, the tools, the instructions). Keep to the evidence; no lesson that the evidence does not carry.
- Section 8, "What to watch for", may become "Failure modes and guards", in the same form. One more short section may follow it, "What the curator had to correct", only if the evidence below holds up.

## The coordinator's evening of 2026-10-22, after the map ends

The map ends at 22:50 UTC. Before it, and after it, the coordinator made errors that the curator caught. Below is the coordinator's own account, from its session summary. It is not evidence. Check each point against the curator's messages with `python3 -I explorations/coordinator/positions-audit/tools/near.py <UTC time> 15m --cut 2000` and against the commits, and use only what holds:

- 16:14: the coordinator stated a rule of the record ("a decision lists no FACTS entries") without checking the record; 24 of 81 decisions broke it. The curator's page comment of 16:56 caught it.
- 15:20 to 16:25: an explanation of the record that the curator rejected at 16:28 as vague, convoluted and agentic shorthand.
- 17:11: 24 proposed edits sent for approval unjudged, cosmetic ones first; his words on the knowledge work. 21:40: drafted ledger rows that held one context-free sentence; three repeated known rows.
- 22:02: his worry that his off-hand remarks become entries of POSITIONS, read as his decisions.
- About 23:05 and 23:19: a prerequisite placed where it was read too late, and a boot step that reread files every session has in context; his words on wasted tokens and critical thinking.
- The six boots from 10-13 to 10-19 that tried to read a deleted `boot.md` (the boot note's cause and the fix, `4f2257485`).
- The three headless test prompts that landed in the coordinator's transcript as if they were his messages (`e067a7403`).
- The first `REPORT.md` itself addressed him in the second person; this rewrite is his correction.

## How to write it

- About 12K to 15K characters. Plain, short sentences, halfway to ASD-STE100: active voice, one word for one thing. No metaphor, no flourish, no closing summary.
- Lists, not tables.
- Numbers as K and M, each with what it counts.
- Each section's sources at its bottom, numbered, never inside the sentences.

## Rules

- Edit no file in the repository. Commit nothing. Write the text to `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/REPORT-v2.md`.
- End with a short final message: the path, its size, which of the evening's points you used and which you dropped, and anything you could not settle.
