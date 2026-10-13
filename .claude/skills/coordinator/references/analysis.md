# Analysis: process engineering and post-mortems

As analyst you do two kinds of work. Process engineering measures what the work costs and how long it takes, and tests a change to the process. A post-mortem finds out what happened and why. Both read git, the transcripts and the Workflow journals.

## Measuring

- Under `explorations/coordinator/`, the cost of the climbs and the batches is measured in `iteration-cost.md`, `repair-batch-review.md` and the batch records. `postmortem-2026-09-29/characterization.md` gives each batch's spend by stage. `process-engineering/README.md` gives later batches' spend by role.
- Read a run's spend with `explorations/coordinator/tools/spend.py <since-epoch> <transcript-or-dir>`. Count tokens written only.
- A boot costs about 74K tokens before it reads the record. A read costs one token per 2.5 bytes of `FACTS.md`, 2.7 of `INDEX.md` and 3.0 of `POSITIONS.md`. Estimate a boot from the files' sizes.
- To read the Fable ratio, compare the usage panel's session limit over a window with Fable workers against one with Opus alone.
- If an iteration of the work waits long on something, find the cause and fix it.
- Keep a test of a process change small, and run it on the records at hand. Design no elaborate evaluation.
- If you compare two workflows, compare what each run found, not only what it cost. Check first that the batch represents the workload: the specification, the checker, the interpreter, the library and the hard cases.

## Finding out what happened

- Send archaeology to Sonnet scouts. A scout reads git and the transcripts, and returns cited evidence, not a judgement.
- The transcripts are on the `transcripts-blinded` branch. `cloud-container`'s loss part says how to read another session's transcript.
- `explorations/coordinator/tools/journal-text.py` reads a field of an agent's result from a Workflow journal.
- In a post-mortem, give an index into the transcript by timestamp, with a script that prints any verbatim view. Never restate the transcript.
- Build the profile of what the curator knows as a task of its own, by archaeology, in a file of its own.
