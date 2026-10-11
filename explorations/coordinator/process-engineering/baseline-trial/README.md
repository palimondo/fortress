<!-- The kit of the baseline trial for the coordinator rewrite: what each model does with the project's memory when nothing tells it how. A takeover session in a copy of the repository without the coordinator's organizing files gets fifteen of the curator's real messages; a fresh session, as after a lost container, boots from what the first one committed and answers a quiz. Built 2026-10-11 and smoke-tested on the cheapest model; not yet run on Fable or Opus. -->

# The baseline trial

## What it is for

The coordinator skill and the coordinator's records are to be rewritten around the habits the current models have by themselves (POSITIONS, "The coordinator rewrite's goals."). This trial observes those habits before any design. Each model, Fable 5.1 and Opus 5.5 today, and each later one in the same way:

1. **Takeover.** A fresh headless session in a sandbox: a copy of this repository from which everything that tells a session how the coordinator keeps its memory is removed. It gets `setting.md`, the facts of its job and its environment and no rule, then the fifteen messages of `messages.md`, one per turn. It can edit, run commands, commit and launch subagents inside the sandbox.
2. **Boot.** A brand-new session in a fresh clone of what the takeover session committed, as after a lost container. It gets `setting.md`, the boot message of `quiz.md` ("Where do we stand?"), then the ten questions, one per turn.
3. **Grading.** `quiz-key.md` gives each question's answer and its source, and how to note where the boot session found it: in what the takeover session wrote, in the tree as it was, or nowhere.

What to look at, beyond the quiz: what the takeover session wrote down, where, in what shape, and when (unasked, at a decision, before ending); whether it committed it; whether it used Claude Code's own memory folder under `~/.claude`, which the boot loses; how it held the points of the long dictated message (message 8); and how it answered him (length, lists, questions) on a phone read aloud.

## The kit

- `make-sandbox.sh <dir> [<commit>]`: the sandbox.
- `setting.md`: what both sessions are told about their job and environment.
- `messages.md`: the fifteen messages, verbatim, with their sources and what each answered.
- `quiz.md`: the boot message and the ten questions.
- `quiz-key.md`: the key. It never enters a sandbox.
- `run-trial.sh <model-alias> <sandbox-dir> <out-dir>`: one run, both phases.
- `tokens.py <out-dir>`: the tokens a run wrote and read, from its sessions' own transcripts.

## How to run it

As root, in a container with this repository and Claude Code. Check the disk first: read the Avail column of `df -h /`, not Size (the `cloud-container` skill). A run needs about 0.5 GB (the sandbox, about 220 MB with its `.git`, the boot's clone of it, the transcripts), more if the takeover session builds the tree (about 90 MB of build output and caches per build or worktree).

    K=explorations/coordinator/process-engineering/baseline-trial
    $K/make-sandbox.sh /tmp/baseline-trial/opus-sandbox 435d85d1f
    nohup $K/run-trial.sh opus /tmp/baseline-trial/opus-sandbox /tmp/baseline-trial/opus-run \
      > /tmp/baseline-trial/opus.log 2>&1 &

and the same with `fable` and its own sandbox and output folder. Give each run its own sandbox: the takeover session leaves its sandbox as it ended.

- **The base commit.** The trial copies `435d85d1f`, the last commit before message 2. The decisions the messages carry are then in no file of the sandbox, so the quiz measures what the takeover session wrote down. Without a commit, `make-sandbox.sh` copies the current working tree; use that only with messages from after it (Variants).
- **Where things go.** The sandbox anywhere outside the repository. The output folder outside the repository, the sandbox, `/home/user`, `/root` and `/var/tmp`, since the run mounts its own over those.
- **How long.** A turn ends only when everything it started has ended: a headless session waits for its background work and then answers again (seen in the smoke test with a background command). A turn that lands the checker-speed fix runs a build and the gate, the better part of an hour. Expect one to four hours for the takeover and under an hour for the boot.
- **Resuming.** A rerun with the same arguments skips the finished turns. A turn that fails or times out (`TRIAL_TURN_TIMEOUT`, four hours by default) stops the run; read its `turns/NN.stderr` and `NN.jsonl` before rerunning, since the rerun sends that message again. The run also stops before a turn when less than `TRIAL_MIN_AVAIL_GB` (3) is free.
- **Keeping the output.** The output folder holds both sessions' transcripts, replies and token counts. Under `/tmp` it is lost with the container: copy it somewhere durable once the run ends, for example to an orphan branch as the transcripts are kept.

### For a new model

Run the same two commands with the new model's alias, on a new sandbox made at the same commit. Nothing in the kit names a model: the alias is resolved when the run starts, and the identifier it resolved to is written only into the output (`<phase>/model.txt`). `run.txt` records the Claude Code version, which changes between runs and is a confound of its own: compare its release notes for changes to compaction, memory, subagents or the headless mode. `TRIAL_EFFORT` defaults to `xhigh`, as the coordinating session runs; set it empty for a model that lacks that level.

### The output

    <out>/run.txt                 when, which alias, effort, Claude Code version, the sandbox's commits
    <out>/tokens.txt              tokens.py's table
    <out>/<phase>/session-id      the session's id, a fresh UUID
    <out>/<phase>/model.txt       the model the alias resolved to
    <out>/<phase>/turns.tsv       one line a turn: seconds, exit, API calls, session id, tokens, hook events
    <out>/<phase>/turns/NN.in     what was sent; 00 is setting.md
    <out>/<phase>/turns/NN.reply.md   the session's text in that turn
    <out>/<phase>/turns/NN.jsonl  the turn's event stream
    <out>/<phase>/root/.claude/projects/-home-user-fortress/   the transcripts, subagents' included
    <out>/boot/sandbox            the clone the boot session worked in

What the takeover session left: `git -C <sandbox> log --stat` after the sandbox's first commit (`4adbdac` for a sandbox made at `435d85d1f`: its dates and author are fixed, so its hash is too); `git -C <sandbox> status`; and `<out>/takeover/root/.claude/projects/-home-user-fortress/memory/`.

## Isolation

What a headless `claude -p` session would load and touch here if started plainly from the coordinating session's shell:

- It takes the coordinating session's id from `CLAUDE_CODE_SESSION_ID` unless given `--session-id`, and writes into that session's transcript.
- User settings, `~/.claude/settings.json`: a Stop hook that runs the transcript backup.
- Project settings, `.claude/settings.json` of the folder it runs in: the same Stop hook, and the SessionStart hook that orders the coordinator's boot after a compaction.
- Not the platform's git-check Stop hook: the launcher passes it to the coordinating session alone, with `--settings /root/.claude/launcher-settings.json`. No managed settings exist (`/etc/claude-code` is absent).
- Its transcript goes under `/root/.claude/projects/`, every folder of which the backup copies to `transcripts-blinded` and pushes.
- Its environment carries the GitHub tokens, the git credential configuration and the proxy settings; `/root` holds git signing, cloud credentials and `~/.claude.json`; the real repository, its `.git` with the transcript branches, and the coordinating session's own transcript are all readable at their paths.

What `run-trial.sh` does about each, every turn:

- `env -i`: an empty environment with only `HOME`, `PATH`, the locale and `CLAUDE_CONFIG_DIR`. No session id, no tokens, no proxy settings.
- A fresh UUID for each session, `--session-id` on its first turn and `--resume` after; `summarize` stops the run if an event carries another id.
- A private mount namespace (`unshare --mount`): the sandbox is mounted at `/home/user/fortress`, so the paths the files cite work; `/home/user` is otherwise empty, which hides the real repository and the backup's worktree; `/root` is the phase's own home (its `.claude` holds the session's config and transcripts; its `.gitconfig` only a name for commits); `/tmp`, `/var/tmp` and `/mnt/user-data` are private or empty; the output folder and the sandbox's real path are covered; and the rest of the file system is read-only.
- A private process namespace (`--pid --fork --kill-child`): the session sees only its own processes, cannot stop the coordinating session's, and everything it started dies with the turn.
- No settings file holds a hook: the sandbox has no `.claude/settings.json`, the phase's config folder starts empty, and no `--settings` is passed. `--strict-mcp-config` loads no MCP server. `--include-hook-events` puts any hook that runs into the stream; `turns.tsv` counts them.
- `--permission-mode acceptEdits --permission-prompts none` with every working tool allowed: the session can edit, run commands, commit and launch subagents. Claude Code refuses `bypassPermissions` to root, so this is the nearest to the coordinating session's auto mode.

The network stays open, but nothing in the namespace holds a credential for the remote, and the sandbox has no remote.

**The smoke test** (2026-10-11, the cheapest model alias, a sandbox at `435d85d1f`, two trivial turns in each phase): each phase ran under its own fresh id, and every event of every turn carried it; inside, `CLAUDE_CODE_SESSION_ID` was the trial session's own id; `/home/user` showed only `fortress`, without `FACTS.md`; `/root` held only the phase's config and `.gitconfig`; `ps -e` counted 5 processes; `git remote -v` was empty; writing `/usr/local/x` failed as read-only; the session's commit landed in the sandbox and reached the boot clone; no hook event ran. Outside: the sandbox's commit is in no object of the real repository; no file of the smoke sessions appeared under `/root/.claude/projects/` or in the backup's worktree; the remote's `main` moved only by the coordinating session's own push. Replies, `turns.tsv` and `tokens.txt` were written (20,313 tokens written in 6 calls). The smoke sandbox and output were then deleted.

## What is removed, and why

The principle: remove what tells a session how the coordinator keeps its memory, or names the coordinator's record files as the way to keep it; keep the project's own work. The trial also withholds every rule on how to talk to him, so notes whose subject is that are removed too. `make-sandbox.sh` lists the paths; `<dir>.source` records what a given sandbox lost.

Whole files and folders:

- **The coordinator's boot and records, with their histories:** `explorations/protocol.md`; under `explorations/coordinator/`, `README.md`, `FACTS.md`, `FACTS-history.md`, `POSITIONS.md`, `POSITIONS-history.md`, `INDEX.md`, `PLAN.md`, `review-queue.md`, and `postmortem-2026-09-19/held-list.md` (the boot note and the held list). The brief named these.
- **The tools that keep them:** `check-index.sh` (the boot's INDEX check), `tools/check-verbatim.py` (the consolidation check of FACTS and POSITIONS).
- **The handover's debug build:** `explorations/microgpt-run-c-handover-history.md`, the earlier texts of the handover's "Where the work stands".
- **The coordinator skill** (`.claude/skills/coordinator/`), and `.claude/settings.json`, which holds only the two hooks.
- **The skills' provenance files:** `.claude/skills/fortress-repo/references/sources.md` and `.claude/skills/cloud-container/references/sources.md`. They map each sentence of the skills to its FACTS and POSITIONS entries, and no task loads them.
- **Notes on the coordinator's own record keeping, boot, context and compactions:** `record-keeping-proposal.md`, `postmortem-2026-09-27-record-keeping.md`, `protocol-guides-review.md` (the protocol and the record against the prompting guides), `explorations-inventory.md` (how notes are stored and indexed), `postmortem-2026-09-29/consolidation-review.md` (the consolidations of FACTS and POSITIONS), `process-engineering/coordinator-shape.md` (the shape map), `process-engineering/record-origins-evidence.md`, `process-engineering/record-growth/` (the growth of FACTS, POSITIONS, INDEX and the ledger), `explorations/reviews/coordinator-context-2026-09-27.md` (what a compaction compacted), `explorations/reviews/skills-review-fable.md` (a review of the three skills, the coordinator's among them, read with the boot's files), and `explorations/reviews/skills-agenda-audit.md` (the coordinator's agenda in the skills; written after the base commit).
- **Notes on how the coordinator talks to him, asks him and holds his points:** `answer-form-archaeology.md` (the form of a question to him), `fable-use-archaeology.md` (when to ask him before a top-tier worker), and in `postmortem-2026-09-19/`, `restate-and-hold.md`, `wall-of-text-spiral.md` and `decision-lists.md`.
- **The indices of the coordinating session's own transcript:** the rest of `postmortem-2026-09-19/`'s index files (`README.md`, `_get.py`, `parse.py`, `_prior/`, `turns.tsv`, `tool-calls.tsv`, `context.tsv`, `agents.md`, `boots.md`, `compactions.md`, `open-at-compaction-2026-09-23.md`). They are about the session's boots and compactions, and the turn index quotes his messages and its replies.
- **This kit,** with the messages and the key.

Sections of files kept:

- `CLAUDE.md`: the item on the coordinating session's boot order and its skill.
- `explorations/microgpt-run-c-handover.md`: "Where the work stands" (the in-flight state the boot read) and "Read first" (read the coordinator's README, FACTS and POSITIONS first).
- `explorations/microgpt-run-b-handover.md`: "Where the arc stands" (its own state section) and "What to do after compaction".
- `.claude/skills/fortress-repo/SKILL.md`: "The record" (the record's main files are POSITIONS, FACTS and INDEX).
- `.claude/skills/fortress-repo/references/records.md`: "POSITIONS and FACTS", "Reading the record" and "Writing to the record". The last two also held the ledger's queries and how to write a row; they go with the sections, since they present FACTS, POSITIONS and INDEX as the record. `ledger.py --help` still gives the ledger's commands.

## Borderline, kept

- **The batch records and reviews** (`CLIMB-BATCH-*.md`, the batches' `RECORD.md`, the rungs' `record.md`, the batch reviews): kept as the brief asks. They carry FACTS entries and POSITIONS citations "for the coordinator to fold".
- **The batch workflow** (`climb-batch-workflow.js` and `.md`): the project's batch tooling. Its gather folds FACTS, PLAN and the ledger.
- **The `fortress-repo` skill, without its record sections:** the workers' knowledge of the tree. Its rules, `exploring.md`, `compiler.md`, `specification.md` and its list of parts still cite the record, POSITIONS and the record's queries.
- **The `cloud-container` skill, `remote-container.md` and `transcript-backup/`:** the platform, not the record. They describe a transcript backup and a compaction hook that do not run in the sandbox, and say to write down where the work stands after a lost container.
- **`tools/facts-extract.sh` and `.py`:** they read the ledger and any note's section as well as the removed files, and the batch workflow calls them.
- **The handovers without their state sections:** their header comments say they were written to survive compaction.
- **`process-engineering/README.md`:** the closed study's index, with a "Waiting on Pavol" list.
- **`process-engineering/revival-story.md`:** the source of his page "Fortress Revival So Far" (message 14); it tells how the record grew.
- **`process-engineering/measures-judgement.md`** (after the base commit): it judges four measures, one of them the record's two builds.
- **The skill-writing process:** `skill-writer-brief.md`, `skill-cold-read-brief.md`, `tools/skill-writer.sh`, `tools/skills-lint.py`, and the skills reviews `skills-writing-principles.md`, `skills-review-lenses.md`, `skills-distillation-audit.md`. The skills are the workers' standing knowledge, not the coordinator's memory; these cite FACTS and POSITIONS as sources.
- **`open-items-2026-09-26.md`:** a dated worker report of what was open for him then.
- **`resume-rule-archaeology.md`, `interrupt-archaeology/`, `usage-metering-2026-09-30.md`, `lineage.md`:** the harness, the usage limits and the repository's lineage.
- **The rest of `postmortem-2026-09-19/`** (the array thread, the direction histories, the library findings, the model names, his words on the checker gate in `positions-checker-gate.md`, the review patterns, the script against the tactics) and **`postmortem-2026-09-29/`** but its consolidation review: the project's direction and the batch practice.
- **`navigation-retrospective.md`, `readme-plan.md`, `rebuild-plan.md`, `process-audit.md`, `conversations/`:** project notes; some say they were written to survive compaction.
- **Two tests that cite `FACTS.md` in a comment** (`ProjectFortress/compiler_tests/NatDispArmChecker.fss`, `ProjectFortress/tests/FlatTowerRungF.fss`): the original tree's test folders.

## Confounds

1. **The kept files cite the removed records by name.** In the sandbox at `435d85d1f`, `git grep -l` finds FACTS in 493 files, POSITIONS in 456, `PLAN.md` in 194, `protocol.md` in 91, `INDEX.md` in 65, "boot note" in 27 and `held-list` in 23. A model may rebuild the old shape because the files point to it, not by habit. Options, none taken:
   - leave them, and grade a recreated FACTS, POSITIONS or INDEX as inherited, not native;
   - replace the names with neutral ones across the sandbox, one substitution each, the contents unchanged;
   - cut the citing clauses;
   - put a stub at each removed path that says it was removed for this trial, so the absence is plain;
   - add a second arm with a small sandbox from another project, where nothing points to an earlier shape.
2. **The messages answered the earlier coordinator's replies,** which are left out. Messages 3, 4, 5, 6, 8, 9, 11, 12, 13, 14 and 15 refer to what it said or did; the trial session's own replies differ. Each entry of `messages.md` says what its message answered. Options: a bracketed context line for each, as message 1 has; or accept the mismatch as the cost of real messages.
3. **No history and no branches.** The sandbox has one commit, dated at the base. The half that climb batch 13 held lives on a work-in-progress branch the sandbox lacks, so message 3's "take all those written pieces from the WIP branch" cannot be done as he meant. The skill's history commands (`git diff a874948ac`, `git log --follow`, blame) find nothing.
4. **No remote, no push.** Committed on any branch counts as surviving; the real coordinator must also push. The platform's git-check hook, which reminds the real coordinator to commit and push, is absent.
5. **A narrower environment.** No pages, comment threads or Artifact tool; no check-ins (`send_later`); no MCP; no transcript backup (on purpose: the boot session must not read the earlier transcript); acceptEdits with every tool allowed instead of auto mode; default compaction thresholds; a turn that waits for its background work, where the real coordinator talks to him while workers run.
6. **Claude Code's own memory folder** (`~/.claude/projects/<project>/memory/`) is available to the takeover session and lost before the boot, as the setting says the project's memory is not kept under `~/.claude`.
7. **The clock.** The trial runs later than 2026-10-10; the messages carry no time; the sandbox's commit is dated at the base.
8. **The quiz names its topics,** which cues the boot session; and it can find some answers in the tree whatever the takeover left. The key's "where found" note separates the two.
9. **One run per model.** Differences within a model's runs are unmeasured; repeat a model's run to see them.
10. **The setting says earlier coordinating sessions ran the project.** It is true and the takeover needs it to read "you" in his messages, but it invites a search for their traces.

## Variants

- **A sixteenth message:** his "Your context's at 760k. Persist what needs to survive the compaction and then we'll reboot." (2026-10-10 06:46:29 UTC, line 11112; `messages.md`, "Left out"). Appended, it measures what a session writes when told to, beside what it writes unasked.
- **Another tree:** `make-sandbox.sh <dir>` without a commit copies the working tree. With these messages that tree already holds their decisions (for example the record of batch 13b says item 35 was answered), so the quiz would no longer measure the takeover. Use it with a new set of messages from after that tree.

## Cost

One run's tokens written, by arithmetic; `tokens.py` measures the real figure.

- **Fixed part.** The smoke test's first call wrote about 5K tokens and read 15K from the cache: the system prompt and tools. A larger model's is of the same order. Each session writes it once.
- **The takeover session's own context.** Its turns follow each other within the hour the cache lives, so each token of its context is written about once. The files the messages point to (the item 35 write-up and probe, the checker-speed report and patch, batch 13's record and review, the two array judgements, the POPL 2019 extract, the revival page, the library rule's archaeology, the skill parts and the batch manual) are 471K bytes, about 160K tokens at 3 bytes a token. With its orientation and its replies, 0.15M to 0.35M written; more if it compacts.
- **Its workers.** For these same messages, between 05:27 and 06:50 UTC on 2026-10-10, the earlier coordinator's workers wrote 3.15M tokens: 3.08M in ten subagent transcripts of session `fe616d40` and 0.07M in the headless skill writer's, counted as `tokens.py` counts, over the API calls in that window. They were the landing with its build and gate, the Fable skeptic, the review backlog's count, the measures' judgement, the page update, the POPL 2019 check and the skill fixes. A takeover that does the same work writes about as much; one that only plans and answers writes almost none.
- **The boot session.** It reads what the takeover wrote and the files the questions touch: 0.05M to 0.15M.

So one run writes between about 0.2M (no workers) and 3.7M (the earlier coordinator's workload), likely 2M to 3M; two models, 4M to 7M. A Fable token weighs three to four times an Opus token against the session limit (FACTS, "Fable draws on the all-models limits as well as its own ...").

**The rehearsal** (2026-10-11, at the curator's choice before the first runs): `setting.md`'s last line says builds, test runs and agent launches are not available and asks the session to write down what it would launch, and `run-trial.sh` denies the agent tools, so that a run costs its own context, about 0.3M to 0.6M a model, and not the 2M to 3M of repeating the earlier coordinator's workload. What it does not show: how a model records workers that are really running.

**The first runs, stopped** (2026-10-11, about 06:25 UTC, at the curator's word): the Opus 5.5 run had taken 4 of the 15 messages and made 3 commits (a plan and a Fable skeptic's brief for a landing, a note on why that skeptic is Fable, a task for the skill writer), 0.33M tokens written and output; the Fable 5.1 run had taken 2 messages and committed nothing, 0.33M. No boot phase ran. They were stopped because the sandbox does not isolate the content from the record system it removes: 493 kept files cite FACTS by name, 456 POSITIONS, 194 PLAN and 91 the protocol, and the messages use the earlier coordinator's handles and answer its replies, so a rebuilt record would show the citations, not a model's habit. The design proposed instead: a sandbox at the tree before 2026-09-15, when FACTS and POSITIONS were made and nothing cited them, a replay ending with his request of that day to organize the knowledge base, and the record Fable 5.1 built that day as the control; not yet approved.
