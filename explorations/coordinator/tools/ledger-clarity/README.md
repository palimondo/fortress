<!-- The ledger clarity workflow: bring open gap-ledger rows to the present, as a Workflow run of a writer, a checker and a judge per chunk; how to run it and what to do with its output. -->

# The ledger clarity workflow

`ledger-clarity.js` rewrites open rows of `explorations/fortress-gap-ledger.md` so that each states its gap as it stands now: a claim that names no fixed half, a reproducer that reproduces it, notes without a repair story. It follows the health check of 2026-10-22 (`explorations/coordinator/ledger-health-2026-10-22/REPORT.md`, sections 5.5 and 6.1), whose rubric is the record's (`explorations/reviews/revival-record-synthesis.md`). It writes nothing to the ledger.

For each chunk of about twelve rows: an Opus writer assesses each row and writes its new line, a close, or an investigate question (`writer.md`); an Opus checker verifies them against the tree (`check.md`); a judge applies or holds each, once (`judge.md`).

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/ledger-clarity/ledger-clarity.js',
               args: { out: '/abs/folder/', chunks: [{ name: 'l1', rows: ['8', '20'] }] } })

After a chunk: for each line of `final.rewrite`, `ledger.py rewrite N FILE` (one line per file); for each line of `final.closes`, `ledger.py close`; then `ledger.py check` and `ledger.py landing-check BASE`; commit the ledger, its history and the chunk's files; file `queue.md` in `review-queue.md`. Resume a killed run with the same script path, `resumeFromRunId` and the same args.
