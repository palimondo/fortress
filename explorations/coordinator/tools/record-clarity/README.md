<!-- The clarity workflow: rewrite POSITIONS or FACTS entries so that each reads on its own, with a cold read and a fidelity check, as a Workflow run; how to run it and what to do with its output. -->

# The clarity workflow

`record-clarity.js` rewrites record entries so that a reader who knows the language, but never saw the conversation or the batch behind an entry, can tell what it says. It is the process of the clarity pilot of 2026-10-22 (`positions-audit/clarity/`, ten POSITIONS entries, approved and applied at `6b560762f`), run as a Workflow, in the shape of the `fortress-repo` skill rewrite of 2026-10-08 (Workflow run `wf_185878c8-0fb`: writers, cold readers, a fix round). Its standard is Astra's review, `explorations/reviews/revival-record-synthesis.md`.

## What runs, for each chunk of about ten entries

1. **Assess** (FACTS only): Astra's rubric over every entry (`assess.md`); a disposition each: keep, reword, reorganize or investigate. Only reword and reorganize go on.
2. **Write**: the stream's headless Opus writer (`writer-stream.sh`, the skill writer's standing brief) with `writer.md`. For POSITIONS its evidence is the provenance audit's, by `entries.py`; for FACTS, the assessment and each entry's cited sources. A Sonnet step only runs the command and waits (`wait.py`).
3. **Cold read**: an Opus reader with only the `fortress-repo` skill's core and area parts, never its revival part (`coldread.md`).
4. **Check**: fidelity against the sources, and the reader's answers against the source meaning (`check.md`).
5. **Fix**: the writer's second round (`fix.md`), in the same stream, so it resumes the session that wrote the chunk with its evidence in the cache.
6. **Reread**: a second cold read of the fixed entries.
7. **Judge**: once, per entry, apply or hold (`judge.md`), so that no chunk loops; it writes `final.apply` and `queue.md`.

**The writer stream.** One headless Opus session per Workflow run takes its chunks in turn (`flock`), resumed while its context stays under 400K tokens written and its cache is warm (under 50 minutes idle), and started fresh otherwise. In the pilot its fix round wrote 61K tokens, where a fresh writer would read everything again. A Workflow runs at most two agents at once on this machine: run several side by side, each with its own stream.

## Running it

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-clarity/record-clarity.js',
               args: { kind: 'positions' | 'facts', out: '/abs/folder/', stream: 'name', chunks: [{ name: 'c1', entries: ['P-7', 'P-8'] }] } })

`from: 'judge'` runs only the judge, on chunks written before the judge existed.

To correct what a review found, put `findings.md` in each chunk's folder before the run: one block per entry, each finding with the sentence at issue, the right reading and its ground.

Each chunk's files land in `out` + its name: `proposals.md`, `clean.txt`, `proposals.apply`, `concepts.md`, `cold-read.md`, `check.md`, `cold-read-2.md`, `judgement.md`, `final.apply`, `queue.md`, the writer's logs, and for FACTS `assessment.md`. Resume a killed run with the same script path, `resumeFromRunId` and the same args, byte for byte.

## After a chunk

The coordinator's part is mechanical:
- apply the judge's `final.apply` on a copy of the record, `record.py check --base`, then on `main`, and commit the record with the chunk's files;
- file `queue.md` in `review-queue.md` (a worker, for several chunks at once);
- merge `concepts.md` into the concepts list that the orientation workflow reads.

POSITIONS entries need the provenance audit's evidence first: for entries it has not traced, run the mining workflow (`positions-audit/README.md`).
