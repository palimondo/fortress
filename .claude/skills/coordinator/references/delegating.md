# Delegating: briefing, launching, watching and resuming workers

**Workflow run**
: Run of a script by the Workflow tool, which launches one agent for each `agent()` call.

**journal**
: Workflow run's log, `journal.jsonl` in `~/.claude/projects/<project>/<session>/subagents/workflows/<run>/`: one `launched` line, then a `started` line for each agent call and a `result` line with its structured result.

**headless session**
: `claude -p` session started from your shell.

**archaeology**
: Search of git and the transcripts for how something came about. It returns cited evidence, not a judgement.

## Which tier runs what

- Give each worker its tier's alias: `model: 'opus'`, `'sonnet'` or `'fable'`. Write no identifier that an alias resolves to.
- Use Sonnet for archaeology and retrieval only, never for a judgement.
- When this session runs on Fable, have an Opus worker write each longer report or page for the curator.
- Take a cross-area question in two steps. First, Opus workers gather cited evidence or a list of ways. Then, if the record does not settle it, run a Fable judgement without asking, sparingly. If the fork stays consequential (`SKILL.md`), put it to the curator as an ask.
- Three kinds of Fable work have a go in advance: a judge's second ruling in a batch, the top-tier reviews of the batch records, and the comparison of a rewritten skill part with the version that the curator approved. Ask first for any other Fable worker, such as one on your own conduct, one whose answer would reverse the curator's decision, or a Fable and an Opus worker run apart on one question.
- A Fable token also uses the all-models limits, at three to four times an Opus token's share of the session limit.

## What a brief holds

- The problem, never the expected answer. On a design choice, ask the worker to list every way that the language and the library offer, and give it none of our notes or options.
- If a rule blocks an option, ask how the library gets around it.
- A pointer to the research on file, not a restatement of it.
- The record's measurements, as findings to cite, not claims to check again, even for a worker kept clean of our options. Name the one new thing to measure. Ask for a new measurement only if the tree has changed under a finding, and say what changed.
- The entries that it needs, quoted word for word under their numbers. Quote a rule of the curator's whole, with its limit and its example.
- For an update of a document: a length cap against the version before. The update adds what landed.
- No second reader named in the brief, since that reframes the document.
- No request to measure or cap its own token spend. The spend is yours to watch.
- For an Agent-tool worker: every wait under 270 s. A long run is polled in steps, or handed to a script while the agent ends its turn.

A worker whose task touches the repository loads `fortress-repo` by itself. That skill tells it which choices are its own.

## Watching a run

- If you launch a long or large run outside a batch, such as a probe that builds and runs suites for an hour, write its estimate of tokens written in the boot note. A probe can write ten times its estimate.
- Watch its spend: `spend.py <since-epoch> <path>`, where the path is the session's `subagents/` folder for agents, or the project's folder for headless sessions. If it passes the estimate, give the worker an instruction or end it. Watch no other run this way.
- When an overnight or long run starts, arm its check-ins: `send_later` reminders 45 minutes apart, in one turn (`cloud-container`, its stops part). An hourly check-in would let the cache expire.
- Keep each wait of yours under an hour. The `Monitor` tool can watch a run.
- If a worker waits on the curator between tasks, run it as a headless session and resume it within the hour (`--resume <id>`).

## Interrupts and process stops

An interrupt or a process stop kills every running Workflow agent and Agent-tool worker (`fortress-repo`, its session part). A compaction between turns leaves a Workflow run alive.

- After an accidental interrupt, tell the curator, and resume the run.
- Resume a Workflow run, never relaunch it: `resumeFromRunId`, with the same script and arguments as at launch, byte for byte. A finished agent keeps its result. An unfinished one runs from its start, on its worktree's leftovers.
- The resume reuses the longest unchanged prefix of `agent()` calls, in call order. A hash given short where the launch gave it in full misses from the first call.
- If the script has changed since launch, resume from a copy as launched: `git show <launch commit>:<path>`. If the call order would differ, wrap `agent()` in the copy, so that the finished calls come in the journal's order of `started` lines. `explorations/coordinator/process-engineering/design-batch10-opus.md` has such a wrapper (`resumeOrder`).
- If a batch's commit stage was killed before it committed, its edits are in `/home/user/fortress`. Resume with a commit prompt that names them.
- If a batch's gather was killed mid-work, `git stash` its staged changes and keep the stash before you resume.
- A new session cannot resume another session's run.
- An Agent-tool worker that a process stop killed goes on from its transcript on a `SendMessage`. One that an interrupt killed cannot. Relaunch it only at the curator's explicit ask, and tell the new worker its predecessor's leftovers.
- Give a Fable successor the leftovers in the tree, never the transcript: the safety filter can end a Fable worker that prints one.

## The Workflow tool

- The tool runs at most two agents at once on this machine. The others wait.
- Across agents, the cache serves the first message only when the whole prompt is identical. A project agent type's system prompt is cached for every agent of the type, so put text that every agent needs there.
- A project agent type written during the session is found only after a process stop. A project skill appears at once.
- `agent()` can return null for an agent that the harness marks failed after it delivered its result. Read its branch before you run it again.
- Check a script by parsing it as an async function body, not with `node --check`: `explorations/coordinator/tools/workflow-scenarios.js`.

## A second session

A second coordinating session contributes reviews and their commits, on a branch of its own from `main`. It runs no batch and does not change PLAN's order.
