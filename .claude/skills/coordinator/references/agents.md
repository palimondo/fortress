# Running agents

The coordinating session launches the agents and resumes their runs. An agent is another Claude that works for the session. There are two kinds:

- An Agent-tool worker is launched alone with the Agent tool.
- A Workflow agent is launched by `agent()` in a script that the Workflow tool runs. The Workflow harness is the part of Claude Code that runs those scripts.

A worker is an agent that is given a piece of the work. Its brief is the prompt that it was launched with. A turn is the session's work from a message to its reply. The prompt cache and waits, interrupts, stops of the process, recovering after them and the permission check are in the `fortress-repo` skill's session part, `references/session.md`.

## How many agents run at once

- The Workflow harness runs only a few agents at a time. The other agents wait for a free slot.
- The number depends on where the session runs. On the cloud platform, it is two (the `cloud-container` skill).
- If you start agents in one `parallel()`, the agents past the limit start only when earlier ones finish.

## What an agent costs

- An agent costs about 45K tokens before it does anything: the system prompt, the tools and its first message.
- If you give an agent no model, it runs on the session's model.

## Sharing the prompt cache

- Agents that start together share the cached system prompt and tools. They share nothing more, unless their whole prompts are identical.
- If a prompt differs anywhere, even only in its last line, the agent writes its whole first message again. A cache read lands only at a breakpoint that the Workflow harness places, and a shared prefix inside one message is not a breakpoint.
- Put the text that every agent of one kind needs in the system prompt of a project agent type, `.claude/agents/<name>.md`. Launch each agent of the type with `agent({agentType: '<name>'})`.
- The type's system prompt is written to the cache once. Each later agent of the type that starts within five minutes reads it, and writes only its own message.
- A type that you write during a session is not found ("agent type ... not found") until the session's process restarts.
- A project skill, `.claude/skills/<name>/SKILL.md`, that you write during a session appears in the session's skill list at once, with no restart.

## A null result

In a Workflow, `agent()` returns null for an agent that the Workflow harness marked failed. It can do so after the agent delivered its structured output: the API's safety filter can end an agent on a false positive after its result.

- Treat a null result like a thrown error.
- Look at what the attempt left: its branch, its commits and its tree.
- Retry, and tell the retry what the attempt may have left there.

## Checking a Workflow script

The Workflow harness parses a script as the body of an async function. `node --check` does not, so a slip such as an unescaped apostrophe in a single-quoted string passes it, and the harness refuses the script at launch. Before you launch a script, check it with this command:

    node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8").replace("export const meta","const meta");
             new (Object.getPrototypeOf(async function(){}).constructor)(t); console.log("parses")' <script.js>

## While agents run

An interrupt kills every agent that runs in the background (the `fortress-repo` skill's session part).

- Do not interrupt the turn while agents run in the background. This includes the seconds after a reply while a Stop hook runs. A Stop hook is a command that the settings make Claude Code run at the end of every turn.
- Send messages at any time. A message sent while the session is busy is queued and delivered inside the turn or as the next turn.
- Compact between turns. `/context` and a manual compaction between turns kill nothing.
- An interrupt shows in the transcript as "[Request interrupted by user]", and a tool call in flight as "User rejected tool use".
- It is not known whether an automatic compaction in the middle of a turn kills a live run. It is also not known whether an interrupt while a Stop hook runs kills one.
- Auto mode lets a run go on alone. In manual mode, nothing runs unattended, because every agent's commands wait for the curator's approval.
- The automatic permission check can refuse a step after the curator's go in chat: for example, a move of an earlier run's outputs back over a later run's. What to do then is in the `fortress-repo` skill's session part.

## Resuming a Workflow run

After an interrupt or a stop of the process, first read what is on disk, as the `fortress-repo` skill's session part says. A stop of the process also keeps the session ID and each Workflow run's journal.

- Resume a Workflow run. Do not relaunch it. Give the same script and the same arguments, byte for byte, with `resumeFromRunId`, the Workflow tool's argument that names the run to resume.
- At a resume, every agent that had finished keeps its result. An unfinished agent runs again from its start and finds its tree's leftovers. A relaunch would start every agent again.
- A run can be resumed only in the session that launched it: `resumeFromRunId` does not work from a new session. A run that a later resume was meant to extend cannot be finished from a new session. So write a pipeline whole into one script.

### Matching the launched run exactly

- The resume reuses the longest unchanged prefix of the run's `agent()` calls, in call order. It misses from the first changed call: that call and the calls after it run live.
- A base given as a short hash, where the launch gave the full hash, misses from the first call.
- If cached calls resolve at once, a script that starts calls as others finish can issue them in another order than the live run did. The resume then misses from that call.
- If the script changed since the launch, resume from a copy of the script as launched: `git show <commit>:<path>`. The Workflow harness also keeps each launched script as `~/.claude/projects/<project>/<session>/workflows/scripts/<name>-<run>.js`.
- If the call order would differ, use a copy that wraps `agent()`, so that the copy issues the finished calls in the journal's order of their `started` lines. Do not change the prompts.
- A copy that changes only what follows the cached prefix runs the changed call live, and nothing before it. A changed prompt is a new key, so that call runs live.
- An agent killed mid-work leaves its edits in its tree, uncommitted, and any staged state. Before the resume, either name them in that agent's prompt, so that the live call checks and keeps them, or stash them and move them aside, so that the call starts clean.

### The journal

The journal is `~/.claude/projects/<project>/<session>/subagents/workflows/<run>/journal.jsonl`. It holds one `launched` line, a `started` line for each agent call (`key`, `agentId`, `label`, `phase`), and a `result` line with the same key for each agent that returned. A resume appends to it. If a call runs live again under a key that the journal holds, the call gets a second `started` line. `explorations/coordinator/tools/journal-text.py` reads the journal. The agents' transcripts are the `agent-*.jsonl` files beside it.

## Continuing or relaunching an Agent-tool worker

- If a stop of the process stopped the worker, continue it from its transcript with `SendMessage`.
- If an interrupt killed the worker, it cannot be resumed: `SendMessage` is refused. Relaunch it only at the curator's explicit ask.
- Tell the new worker what its predecessor left in the tree. Do not give it the predecessor's transcript: the safety filter has ended a worker that was told to print a predecessor's transcript.
