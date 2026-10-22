<!-- The clarity workflow: rewrite POSITIONS or FACTS entries so that each reads on its own, with a cold read and a fidelity check, as a Workflow run; how to run it and what to do with its output. -->

# The clarity workflow

`record-clarity.js` rewrites record entries so that a reader who knows the language, but never saw the conversation or the batch behind an entry, can tell what it says. It is the process of the clarity pilot of 2026-10-22 (`positions-audit/clarity/`, ten POSITIONS entries, approved and applied at `6b560762f`), run as a Workflow, in the shape of the `fortress-repo` skill rewrite of 2026-10-08 (Workflow run `wf_185878c8-0fb`: writers, cold readers, a fix round). Its standard is Astra's review, `explorations/reviews/revival-record-synthesis.md`.

## What runs, for each chunk of about ten entries

1. **Assess** (FACTS only): Astra's rubric over every entry (`assess.md`); a disposition each: keep, reword, reorganize or investigate. Only reword and reorganize go on.
2. **Write**: an Opus writer with the skill writer's standing brief and `writer.md`. For POSITIONS its evidence is the provenance audit's, by `entries.py`; for FACTS, the assessment and each entry's cited sources.
3. **Cold read**: an Opus reader with only the `fortress-repo` skill's core and area parts, never its revival part (`coldread.md`).
4. **Check**: fidelity against the sources, and the reader's answers against the source meaning (`check.md`).
5. **Fix**: the writer's second round (`fix.md`).
6. **Reread**: a second cold read of the fixed entries.

All agents are Opus. A Workflow runs at most two agents at once on this machine: run several side by side.

## Running it

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-clarity/record-clarity.js',
               args: { kind: 'positions' | 'facts', out: '/abs/folder/', chunks: [{ name: 'c1', entries: ['P-7', 'P-8'] }] } })

Each chunk's files land in `out` + its name: `proposals.md`, `clean.txt`, `proposals.apply`, `concepts.md`, `cold-read.md`, `check.md`, `cold-read-2.md`, and for FACTS `assessment.md`. Resume a killed run with the same script path, `resumeFromRunId` and the same args, byte for byte.

## After a chunk

The coordinator reads `proposals.md` and `cold-read-2.md`, then:
- applies `proposals.apply` on a copy of the record and runs `record.py check --base`, then on `main`, and commits the record with the chunk's files;
- files each question for the curator, and each "investigate" entry's question, in `review-queue.md`; a change of meaning that no source settles is not applied;
- merges `concepts.md` into the list for the worker skill's orientation.

POSITIONS entries need the provenance audit's evidence first: for entries it has not traced, run the mining workflow (`positions-audit/README.md`).
