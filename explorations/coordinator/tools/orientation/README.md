<!-- The orientation workflow: consolidate the fortress-repo skill's revival part into a short orientation every worker reads whole, or update it after a landing from the FACTS the landing changed; how to run it and install its result. -->

# The orientation workflow

The `fortress-repo` skill's revival part, `references/revival-changes.md`, becomes the **orientation**: the short account of how revived Fortress departs from the original and from what a model expects, which every worker reads whole (Astra's review, `explorations/reviews/revival-record-synthesis.md`). `orientation.js` writes it, in two modes:

- **consolidate**, once, and again whenever the part has drifted: an outline by the concepts workers use and a table of where each old entry goes (`outline.md`); the writer writes the whole text from them; a preservation check against the table, a cold read with only the skill's core, and the regression quiz; the writer's fix round; a second cold read and the quiz again; a judge.
- **update**, after every landing: the landing's new and changed FACTS entries pass the admission test (`admission.md`: the wrong default, the correction, the mistake it prevents); the writer rewrites the sections they touch in place, within the budget of 8K to 12K characters; the same checks, fix round, reread and judge.

The writer is a headless Opus stream (`../record-clarity/writer-stream.sh`), so its fix round resumes the session that wrote the text. The regression quiz is kept in `regression/` (questions and key), and grows with each update.

## Running it

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/orientation/orientation.js',
               args: { mode: 'consolidate', out: '/abs/folder/', stream: 'orientation', concepts: ['/abs/concepts.md'] } })
    Workflow({ scriptPath: ..., args: { mode: 'update', out: '/abs/folder/', stream: 'orientation-bN', facts: ['F-261', 'F-262'] } })

## Installing its result

The judge writes `judgement.md` and `queue.md`. The coordinator then has the skill writer (`skill-writer.sh`) install the sections judged "install" into `references/revival-changes.md`, add `sources-mapping.md` to the skill's `references/sources.md`, and, after a consolidation, update the core's line for the part and its description together; then a cold read of the installed part, as `coordinator/references/skill-rewrite.md` says. Held sections keep the old text; their items go to `review-queue.md`.
