# Delegating: briefing, launching, watching and resuming workers

You brief the workers and watch what you launch. This part holds the tiers, what a brief holds, the watch on a long run, and the Workflow tool's mechanics.

**Workflow run**
: Run of a script by the Workflow tool, which launches one agent for each `agent()` call.

**journal**
: Workflow run's log, `journal.jsonl` in `~/.claude/projects/<project>/<session>/subagents/workflows/<run>/`. It holds one `launched` line, then a `started` line for each agent call (`key`, `agentId`, `label`, `phase`) and a `result` line with the agent's structured result.

**headless session**
: `claude -p` session started from your shell.

## Which tier runs what

- Give each worker `model: 'opus'`, the alias. An agent with no `model` takes the session's tier. Write no identifier that the alias resolves to.
- Use Sonnet for archaeology and retrieval only. It makes no judgement, and never writes a page or a text that the curator reads.
- Have an Opus worker write a longer report or page for the curator, not this session while it runs on Fable.
- Take a decision that touches two of the specification, the interpreter and the compiler in two steps. Cheaper workers gather cited evidence into a short brief. The top tier judges.
- Run a Fable judgement without asking, sparingly, if all of these hold:
  - The design question touches two or more of the specification, the library and the implementation.
  - An Opus worker's evidence or list of ways is on file.
  - The record does not settle the question.
- Put that judgement to the curator as an ask.
- Ask first for any other Fable worker: a question on your own conduct or a new kind of process choice, a recommendation that would reverse the curator's decision, or Fable and Opus working apart.
- Two kinds of Fable work have a go in advance: a judge's second ruling in a batch, and the top-tier reviews of the batch records.
- Weigh a Fable review's ideas critically, and never take them as given. Fable reviews tend to keep everything as it was. For a check, an Opus worker is enough.

A Fable token counts against the all-models limits too, at three to four times an Opus token's share of the session limit. So Fable is not free when that pool runs low. Two workers on the wrong tier once cost 1.7M.

## What a brief holds

- The problem, never the expected answer. On a design choice, a worker that has not read our notes lists every way that the language and the library offer.
- If a rule blocks an option, ask how the library gets around it.
- A pointer to the research and documents on file, not a restatement of them.
- The record's measurements, as findings to cite with their sources, not claims to check again. Name the one new thing to measure. Ask for a new measurement of a finding only if the tree has changed under it, and say what changed.
- For a clean worker on a design fork: none of our options, but all of our measurements. It reads its question first, and measures only where no record answers it.
- The entries that it needs, quoted word for word under their numbers (`facts-extract.sh`). Quote a rule of the curator's with its measure and its example. Never restate it.
- For an update of a document: a length cap against the version before. The update adds what landed, in the space that the document gives it.
- No second reader that would reframe a document.
- No request to measure, project or cap its own token spend. The spend is yours to watch.
- For a page: the house style (the core, "Pages").
- For an Agent-tool worker: every wait under 270 s. A long run is polled in steps, or handed to a script while the agent ends its turn.

A worker whose task touches the repository loads `fortress-repo` by itself, and that skill tells it which choices are its own.

## Watching a run

- If you launch a long or large run outside a batch, such as a probe that builds and runs suites for an hour, give it an estimate of tokens written.
- Watch its spend against the estimate: `explorations/coordinator/tools/spend.py <since-epoch> <transcript-or-dir>`.
- If it passes the estimate, give the worker an instruction or stop it.
- Watch no other run this way. One probe once wrote 7.0M against an estimate of 0.5M.
- When an overnight or long run starts, arm its check-ins: a series of `send_later` reminders 45 minutes apart, armed in one turn (`cloud-container`, its stops part).
- Keep each wait of yours under an hour. The `Monitor` tool can watch a run.
- If a worker waits on the curator between tasks, run it as a headless session and resume it within the hour (`--resume <id>`). The skill writer runs so (`references/skill-rewrite.md`).

## Interrupts and stops

An interrupt, the stop of a turn, kills every running Workflow agent and Agent-tool worker. A stop of the session's process does too (`fortress-repo`, its session part). A compaction between turns leaves a Workflow run alive.

- After an accidental stop, tell the curator, and resume the run.
- Resume a Workflow run, never relaunch it: `resumeFromRunId`, with the same script and arguments as at launch, byte for byte. A finished agent keeps its result. An unfinished one runs again from its start, on its worktree's leftovers.
- The resume reuses the longest unchanged prefix of `agent()` calls, in call order. A base given as a short hash where the launch gave the full hash misses from the first call.
- If the script has changed since launch, resume from a copy as launched (`git show <base>:<path>`). If the call order would differ, wrap `agent()` in the copy, so that the finished calls come in the journal's order of `started` lines.
- If a commit stage was killed before it committed, its edits are in the main tree. Resume with a commit prompt that names them.
- If a gather was killed mid-work, stash its staged state and move it aside before you resume.
- A new session cannot resume another session's run.
- An Agent-tool worker that a process stop killed goes on from its transcript on a `SendMessage`. One that an interrupt killed cannot be resumed. Relaunch it only at the curator's explicit ask, and tell the new worker its predecessor's leftovers.
- Give a Fable successor the leftovers in the tree, never the transcript. The safety filter once ended a Fable worker that printed a transcript.

## The Workflow tool

- Two agents run at once on this machine. An agent costs about 45K tokens before it starts work.
- Across agents, the cache serves the first message only when the whole prompt is identical. A project agent type's system prompt is cached for every agent of the type, so put text that every agent needs there.
- A project agent type written during the session is found only after the process restarts. A project skill appears at once.
- `agent()` can return null for an agent that the harness marks failed after it delivered its result. Its work may be on its branch. The batch script's `callAgent` retries a role up to twice.
- Check a script by parsing it as an async function body, not with `node --check`. `explorations/coordinator/tools/workflow-scenarios.js` does this.
- `explorations/coordinator/tools/journal-text.py` writes one field of an agent's result from the journal to a file.

## A second session

A second coordinating session contributes reviews and their commits, on a branch of its own from `main`. It runs no batch and changes no agreed route.
