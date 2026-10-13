# Analysis: process engineering and post-mortems

Process engineering measures what the work costs and how long it takes, and tests a change to the process. A post-mortem finds out what happened and why.

## Measuring

- Each batch's spend by stage is in `explorations/coordinator/postmortem-2026-09-29/characterization.md`, and by role in `process-engineering/README.md` beside it. Each batch record holds its own.
- Read a run's spend with `spend.py` (the core, "tokens written").
- Estimate a boot from the files' sizes: a read costs one token per 2.5 to 3 bytes. `/context` shows what the last call held.
- To compare a Fable token's share of the session limit with an Opus token's, ask the curator to read the usage panel over a window with Fable workers and over one with Opus alone.
- If an iteration of the work waits long on something, find the cause and fix it.
- Keep a test of a process change small, and run it on the records at hand. Design no elaborate evaluation.
- If you compare two workflows, compare what each run found, not only what it cost. Check first that the batch represents the workload: the specification, the checker, the interpreter and the library.

## Finding out what happened

- Send archaeology to Sonnet scouts (`references/delegating.md`).
- The transcripts are on the `transcripts-blinded` branch. `cloud-container`'s loss part says how to read another session's transcript.
- `explorations/coordinator/tools/journal-text.py` copies a field of an agent's result from a Workflow journal.
- In a post-mortem, give an index into the transcript by timestamp, with a script that prints any verbatim view. Never restate the transcript.
- Build the profile of what the curator knows as a task of its own, by archaeology, in a file of its own.
