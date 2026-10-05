# Agents

An agent is another Claude working for the session. An Agent-tool worker is launched alone with the Agent tool. A Workflow agent is launched by `agent()` in a script that the Workflow tool runs; the Workflow harness is the part of Claude Code that runs those scripts. A worker is an agent given a piece of the work, and its brief is the prompt it was launched with.

## How many, and what one costs

- The Workflow harness runs only a few agents at a time; more wait for a free slot. How many depends on where the session runs: on the cloud platform it is two (the `cloud-container` skill). Agents started in one `parallel()` show it: those past the limit start only as earlier ones finish.
- An agent costs about 45K tokens before it does anything: the system prompt, the tools and its first message. An agent given no model runs on the session's.
- Cost is counted as tokens written: cache writes and new input. Cache reads are not counted.

## The prompt cache

- The prompt cache is the API's copy of a conversation's context. It lives one hour for the main session and five minutes for an agent. A call within the life reads the cache and renews it. The first call after a longer wait reads nothing and writes the agent's whole context again, which late in a long task is hundreds of thousands of tokens, at every such wake.
- So every wait is taken in steps under the life: an agent polls a long run in steps under 270 s (`long-commands.md`), and the main session waits in steps under an hour (on the cloud platform, woken by check-ins 45 minutes apart: the `cloud-container` skill).
- Agents started together share the cached system prompt and tools, and nothing more unless their whole prompts are identical. A prompt that differs anywhere, even only in its last line, writes its whole first message again: a cache read lands only at a breakpoint the harness places, and a shared prefix inside one message is not one.
- Text that every agent of a kind needs goes in a project agent type's system prompt, `.claude/agents/<name>.md`, launched with `agent({agentType: '<name>'})`. It is written to the cache once and read by each later agent of the type that starts within five minutes; each agent then writes only its own message. A type written during a session is not found ("agent type ... not found") until the session's process restarts.
- A project skill, `.claude/skills/<name>/SKILL.md`, written during a session appears in the session's skill list at once, with no restart.

## A call that returns nothing

`agent()` in a Workflow returns null for an agent the harness marked failed, even after the agent delivered its structured output: the API's safety filter can end an agent on a false positive after its result. Treat null like a thrown error. Look at what the attempt left (its branch, its commits, its tree) and retry, telling the retry what the attempt may have left there.

## Checking a Workflow script

`node --check` does not check a script the way the harness parses it, as the body of an async function: a slip such as an unescaped apostrophe in a single-quoted string passes it and is refused at launch. This check catches it:

    node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8").replace("export const meta","const meta");
             new (Object.getPrototypeOf(async function(){}).constructor)(t); console.log("parses")' <script.js>

## Watching a long run

A long or large run an agent is launched for, a probe that builds and runs suites for an hour or more, is watched against the estimate it was launched with. When it passes its estimate, whoever launched it reacts: an instruction to the worker, or a stop. Its brief says what keeps it efficient, a wait polled under the cache's life among it. Ordinary workers carry no monitoring procedure.
