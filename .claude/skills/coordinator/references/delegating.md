# Delegating: briefing, launching, watching and resuming workers

**Workflow run**
: Run of a script by the Workflow tool, which launches one agent for each `agent()` call.

**journal**
: Workflow run's log, `journal.jsonl` in `~/.claude/projects/<project>/<session>/subagents/workflows/<run>/`: one `launched` line, then a `started` line for each agent call and a `result` line with its structured result.

**headless session**
: `claude -p` session started from your shell.

**archaeology**
: Search of git and the transcripts for how something came about. It returns cited evidence, not a judgement.

**writer stream**
: Headless Opus session that writes a long writing pass in chunks, one slice of its entries or sections at a time, started and resumed by `explorations/coordinator/tools/record-clarity/writer-stream.sh`.

## Which tier runs what

- Give each worker its tier's alias: `model: 'opus'`, `'sonnet'` or `'fable'`. Write no identifier that an alias resolves to.
- Use Sonnet only for archaeology and to fetch exact words, never for a judgement or a summary. Have an Opus worker turn the evidence into a report, and condense a long report into a summary or the exact quotes that you need.
- To recheck a point at its source, have a fresh Sonnet scout fetch the exact words from the transcript or the commits. Have an Opus worker set them against the curator's memory and against the report, entry or summary that it differs from. Until then, state neither side as right, and take no step that rests on the point until the recheck ends.
- Run an Opus worker that writes or condenses a long report at extra high effort, `xhigh`: the Agent tool's `effort` option, `agent()`'s `opts.effort`, or `--effort xhigh` on a headless session's command line.
- Run every writer on Opus: of skill text, of record entries, and of each longer report or page for the curator, also when this session runs on Fable. Fable writes no text that goes as written into the record, since its compressed register degrades the reasoning. A Fable worker may give corrections to a text that Opus writes, and Opus words them into the text. A Fable review may edit a batch record in place.
- The rules on Fable's text hold while Fable is at version 5.1. When this session runs on Fable, `explorations/coordinator/tools/model-now.sh` prints its version.
- Take a cross-area question in two steps. First, Opus workers gather cited evidence or a list of ways. Then, if neither the record nor the three principles (`SKILL.md`) settle it, run a Fable judgement, sparingly. If the fork stays consequential, put it to the curator as an ask.
- Four kinds of Fable work have a go in advance: the Fable judgement on a cross-area question, a judge's second ruling in a batch, the Fable review of each batch record, and the comparison of a rewritten skill part with the version that the curator approved. Ask first for any other Fable worker, such as one on your own conduct, one whose answer would reverse the curator's decision, or a Fable and an Opus worker run apart on one question.
- If you start a headless session on a tier other than Opus or Fable, set `FORTRESS_HEADLESS=1` in its environment. Otherwise the model check's alarm stops its work (`SKILL.md`, "The boot"). Today only the baseline interview does so.
- Start every headless session with `--session-id` and a new UUID. Without it, the session writes into your own transcript, where its prompts read as the curator's messages.
- A Fable token also uses the all-models limits, at three to four times an Opus token's share of the session limit.

## What a brief holds

A brief holds what only you know: the problem, the question, what the answer is for, and where the sources are. Give the readings that the task needs and no more, and an order or steps only where they matter. A worker on the repository has `fortress-repo` loaded, and that skill loads the parts that the work needs. So leave the choice of those parts to the worker. Each extra reading costs your context, and the worker chooses well without it.

- The problem, never the expected answer. On a design choice, ask the worker to list every way that the language and the library offer, and give it none of our notes or options.
- If a rule blocks an option, ask how the library gets around it.
- For a review, an ask to sort its findings by what each needs. The reviewer names each finding that would change a decision of the curator's, and gives options for those findings only.
- A pointer to the research on file, not a restatement of it.
- The record's measurements, as findings to cite, not claims to check again, even for a worker kept clean of our options. Name the one new thing to measure. Ask for a new measurement only if the tree has changed under a finding, and say what changed.
- The entries that it needs, by number. If the task needs an entry's linked entries or its history, name `facts-extract.sh`, which prints them. Quote whole, with its limit and its example, only a rule of the curator's that no entry holds yet.
- The people of the project by name and role, as the record and the authorship map `research/authorship.md` name them, never in your own words, since a worker copies your description into its text; where the task needs who wrote what, a pointer to the map.
- Before you quote the curator's words from a message, clean them. Fix the obvious typos of the phone's swipe keyboard and of dictation, and keep the meaning. Put `[?]` after each word whose reading is a guess.
- For an update of a document: a length cap against the version before. The update adds what landed.
- No second reader named in the brief, since that reframes the document.
- No request to measure or cap its own token spend. The spend is yours to watch.
- For an Agent-tool worker: every wait under 240 s. A long run is polled in steps, or handed to a script while the agent ends its turn.

`fortress-repo` tells a worker on the repository which choices are its own. A worker loads no part of this skill by itself. If it does part of your work, such as an analysis, name the parts of this skill that the work needs.

## Watching a run

- If you launch a long or large run outside a batch, such as a probe that builds and runs suites for an hour, write its estimate of tokens written in the boot note. A probe can write ten times its estimate.
- Watch its spend: `spend.py <since-epoch> <path>`, where the path is the session's `subagents/` folder for agents, or the project's folder for headless sessions. If it passes the estimate, give the worker an instruction or end it. Watch no other run this way.
- When an overnight or long run starts, arm its check-ins: `send_later` reminders 45 minutes apart, in one turn (`cloud-container`, its stops part). An hourly check-in would let the cache expire.
- Keep each wait of yours under an hour. The `Monitor` tool can watch a run.
- Send a follow-up question to the worker that already holds its material, with `SendMessage`, also when it has finished: it goes on from its transcript and does not search again. If a worker waits on the curator between tasks, run it as a headless session and resume it within the hour (`--resume <id>`).

## Interrupts and process stops

An interrupt or a process stop kills every running Workflow agent and Agent-tool worker (`fortress-repo`, its session part). A compaction between turns leaves a Workflow run alive.

- After an accidental interrupt, tell the curator, and resume the run.
- Resume a Workflow run, never relaunch it: `resumeFromRunId`, with the same script and arguments as at launch, byte for byte. A finished agent keeps its result. An unfinished one runs from its start, on its worktree's leftovers.
- The resume reuses the longest unchanged prefix of `agent()` calls, in call order. A hash given short where the launch gave it in full misses from the first call.
- If the script has changed since launch, resume from a copy as launched: `git show <launch commit>:<path>`. If the call order would differ, wrap `agent()` in the copy, so that the finished calls come in the journal's order of `started` lines. `explorations/coordinator/process-engineering/design-batch10-opus.md` has such a wrapper (`resumeOrder`).
- If a batch's commit stage was killed before it committed, its edits are in `/home/user/fortress`. Resume with a commit prompt that names them.
- If a batch's gather was killed mid-work, resume the run, and leave the main tree as the gather left it. On the resume, the batch script's `recoverGather()` gives the gather a prompt that takes the uncommitted changes as its earlier attempt's work, so you write no prompt. Only the gather's first start checks that the main tree is clean.
- A new session cannot resume another session's run.
- An Agent-tool worker that a process stop killed goes on from its transcript on a `SendMessage`. One that an interrupt killed cannot. Relaunch it only at the curator's explicit ask, and tell the new worker its predecessor's leftovers.
- Give a Fable successor the leftovers in the tree, never the transcript: the safety filter can end a Fable worker that prints one.

## The Workflow tool

- The tool runs at most two agents at once on this machine. The others wait.
- Across agents, the cache serves the first message only when the whole prompt is identical. A project agent type's system prompt is cached for every agent of the type, so put text that every agent needs there.
- A project agent type written during the session is found only after a process stop. A project skill appears at once.
- `agent()` can return null for an agent that the harness marks failed after it delivered its result. Read its branch before you run it again.
- Check a script by parsing it as an async function body, not with `node --check`: `explorations/coordinator/tools/workflow-scenarios.js`.

## A long writing pass

Run a long writing pass, such as a run of the clarity or orientation workflow, as writer streams.

- The script resumes a stream while its context is small and its prompt cache is warm. Its header gives the limits. Otherwise it starts a fresh session.
- So the round that fixes a chunk after its checks resumes the session that wrote it, with its evidence still in the cache. A fresh writer would read everything again.
- Give each Workflow run its own stream. Several such runs can go side by side.
- End each round with one judge. It applies each item that a chunk's checks raise, or holds it out and puts it on the review queue. No chunk goes through a second fix round.

## A second session

A second coordinating session contributes reviews and their commits, on a branch of its own from `main`. It runs no batch and does not change PLAN's order.
