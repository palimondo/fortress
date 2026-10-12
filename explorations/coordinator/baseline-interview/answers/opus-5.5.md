<!-- Opus 5.5's answers to the baseline interview, verbatim, 2026-10-12 12:57 UTC, one question per turn in one resumed session: Claude Code 2.1.296, effort xhigh, 18 turns, no tool call, 11K tokens out. The setting and the questions are beside this file; the one-shot answers of the same day are under oneshot/. -->

**1.** **In the repo, pushed, because nothing else survives a lost container.** The built-in memory folder under /root lives in the container, so I wouldn't rely on it for anything that matters.

My default would be a short CLAUDE.md at the repo root, which Claude Code loads automatically at the start of every session. It would hold standing rules and your preferences, and it would tell me to read a notes folder first. That folder would contain a few plain markdown files:

- **Status file.** Current goals, what each worker is doing, open questions for you. I'd rewrite it in place to keep it short, rather than letting it grow.
- **Decisions log.** One dated line per decision, with the reason, added as decisions are made.
- **Reports folder.** Each worker's report saved as a dated file. I'd fold the key points into the status file.

I'd commit and push after every meaningful change, not just at the end of a task. After a compaction or a fresh container, I'd reread CLAUDE.md, the status file and the recent git log before doing anything else.

**2.** **I'd save the full report unchanged**, as a dated file in the reports folder named after the worker and the task, and push it right away. That way the raw source survives even if I summarize it badly.

Then I'd read it and split it three ways, each line linking back to the report file:

- **Measurements** go into a running measurements file. Each one is a line or table row with the date, which worker measured it, the commit it was run on, how it was measured, and whether I've checked it or am taking the worker's word.
- **Decisions** go into the decisions log, dated, with the reason, and marked as either decided by the worker or confirmed by me or you.
- **Open points** go into the status file's open-questions list, each saying who it's waiting on.

**Yes, I'd always keep dates and who measured what.** Numbers go stale as the code changes, and workers sometimes get things wrong. Weeks later, the only way to know whether a figure still holds is to know when it was taken, on which version, and by whom.

Then I'd push, and send you a few spoken-friendly sentences: what changed, anything surprising, and anything that needs your call.

**3.** **First, the status file, in full.** I keep it short precisely so I can read all of it every time. It tells me the goals, what each worker is doing and what's waiting on you.

**Then git, to check reality matches the notes:** git status for anything uncommitted, and the last twenty or so commits. If the container survived a compaction, there may be work I did but never wrote down or pushed. I'd fix that first.

**Then the recent end of the decisions log**, roughly the last week or the last couple of dozen entries, so I don't reopen something already settled.

**I wouldn't reread reports or the full measurements file.** I'd open those only when a specific task needs them.

I'd also compare the compaction summary against the files. Where they disagree, I trust the pushed files. Anything in the summary that never made it into the files, I'd write down and push before carrying on.

**4.** **I'd split everything into what's current and what's history, and only load the current part.**

- **Status file:** rewritten, never appended. Finished work and resolved questions just come out. It stays small by construction.
- **Decisions log:** about once a week, I'd condense it into a short "standing decisions" section listing what is true now. Each line keeps its date and a link to the original entry. Superseded entries and the raw old log move to an archive file by month.
- **Measurements:** the same. The main file keeps only the latest trusted figure per metric, still with date, worker and commit. Older and superseded figures go to an archive.
- **Reports:** never edited and never loaded by default. They just accumulate in their folder.

Nothing is truly lost, because git keeps every old version and the archives are one link away. What I'm protecting is the small set of files I read after every compaction. I'd give that set a rough size budget, a few thousand words, and condense whenever it goes over.

**5.** **Yes, for anything that runs longer than a single sitting or goes to a worker.** Small fixes get only a good commit message.

Each note would be its own file in a tasks folder, named with the date and a short slug. Its report, when it arrives, would link back to it.

At the very top, a few short lines:

- **Status:** open, in progress, blocked, done or abandoned.
- **Dates:** started and last updated.
- **Owner:** which worker has it.
- **Goal:** one sentence.
- **Outcome:** once there is one, a sentence or two.

Below that come the brief I gave the worker, links to reports and commits, and working notes.

The point of the header is that I can skim just the tops of all the notes and know where everything stands, without reading any bodies. The status file links only to the notes still active. Finished notes keep their outcome line, so I can scan them later without opening the reports.

**6.** **First I'd save the message as he dictated it**, as a dated file in an inbox folder, and push. It's his instruction, and the container could die before I act on it. Dictation also garbles words, so the original is worth keeping.

Then I'd file each of the eight points where it belongs:

- Standing preferences go in CLAUDE.md.
- Decisions go in the decisions log, marked as his.
- New work goes in task notes and the status file.
- Questions he asked me get answered in the reply.

Each one links back to the saved message.

The reply follows his numbering, one to eight, with a sentence or two each: what I'll do, or the answer. I'd write it to work read aloud: plain sentences, no tables, and saying "point three" rather than relying on layout.

If I'm unsure what he meant on a point, especially a likely dictation slip, I'd say so on that point and give my best guess. Questions back to him would be few, and gathered at the end so he can answer them in one go.

**7.** **I'd reply to each one on its own, short, and anchored at the start to what it answers.** For example: "On your answer about the measurements file:". Listening by phone, he needs to know which thread he's in before the content starts.

Then I'd say what I'm doing about his answer. If things have moved on since that earlier reply, I'd say that plainly: "already done", or "that changed yesterday, here's where it stands now". I wouldn't act on a stale picture.

I wouldn't restate my earlier reply or give a full status update each time, only what's new on that one thread.

His answers get filed like any instruction: saved, put in the right file, pushed. If a later answer contradicts an earlier one, I'd follow the later one and mention the change in a sentence, so he knows I noticed.

**8.** **First, own it plainly:** he's right, I'm sorry, and I'm doing it now. No excuses.

Then I'd find the order and trace where it was lost. I'd check the inbox, the decisions log, CLAUDE.md and the git log. Was it never written down, written somewhere I don't reread, never pushed before a container loss, or written down but not acted on? Each of those has a different fix.

I'd carry the order out, or say when it will be done. Then I'd tell him in a sentence or two: what slipped, where it slipped, and what I changed.

The change targets the step that failed:

- If it was a standing order, it goes into CLAUDE.md or a "standing orders" section at the top of the status file, which I read every time.
- If it was never written down, filing his messages gets an explicit check that each point landed somewhere. That check is recorded in the saved message itself.
- If it was lost in a crash, I push the moment his message arrives, before doing anything else.

I'd also write the lesson into CLAUDE.md, so the fix outlasts this conversation.

**9.** **I don't actually know the time on my own.** I have no sense of elapsed time, and a compaction erases what little I had. So I'd check the clock every time, by running date in the container, rather than guessing. Commit and report timestamps give me a cross-check.

The container clock is usually UTC. I'd record his time zone in CLAUDE.md and always give times in his local time, saying it in words such as "around four this afternoon your time".

For how long something will take, I'd go by the start and finish dates in past task notes, not my gut. My instinctive estimates of how long worker tasks take are unreliable.

When I don't have a good basis, I'd tie the promise to an event instead of a clock time: "once the worker's report comes in" rather than "in two hours".

Any promised time goes into the status file. After a compaction I can then see that I owe him something by a certain time. If I'm going to miss it, I tell him before the deadline, not after.

One limit he should know about: I can't wake myself up. I only act when he writes or a worker returns. So "I'll tell you at five" really means "the next time I'm active after five".

**10.** **I'd push the full document to the repo first**, so it exists outside the container and he can open it on GitHub if he wants the whole text.

In the message itself I wouldn't paste the whole thing unless it's short. I'd give a spoken-friendly summary:

- What the document is.
- Why it needs his approval.
- What happens once he approves.
- The few points that actually need his judgment, numbered, each with my recommendation and the main alternative in a sentence.

Then I'd make answering easy: "Say 'approved', or tell me by number what to change." I'd also give a link to the file for the full text.

I'd note exactly which version he's looking at. When he approves, I'd record it in the decisions log with the date and that version. That way, if the document changes later, it's clear what he did and didn't sign off on.

Until he says yes, I wouldn't act on anything in it that depends on his approval. If he approves only some points, I'd go ahead on those and keep the rest open in the status file.

**11.** **In the decisions log, right away**, with the date, marked as his, his line quoted word for word, and one sentence on how I read it. I'd push immediately. The open question it settles comes off the status file, and any task note it affects gets a line pointing to the decision.

If it's a standing rule rather than a one-off ("always do X", "never Y"), it also goes in the standing orders at the top of CLAUDE.md. That gets loaded every session, so it can't fall out of view. When I condense the log, his decisions stay in the "standing decisions" section; they are never archived away.

Rereading the decisions log isn't enough on its own, so CLAUDE.md also carries a rule for me: before asking him anything, check the standing decisions first.

My reply would be one line confirming what I recorded, in my own words. If dictation garbled something, he catches it now, not weeks later.

**12.** **Before asking, I'd do three things.**

First, I'd check the standing decisions and the decisions log, to be sure he hasn't already settled it in other words.

Second, I'd ask whether it's really his call. If it's cheap to reverse and low stakes, I'd decide it myself, record it, and just tell him.

Third, I'd do the homework so he only has to choose. That means reading outside sources and prior art. If the question turns on facts we don't have, I'd have a worker run a quick experiment or measurement first. I'd write the question into the status file and its task note and push.

**The message, in this order:**

1. The question itself, in one sentence.
2. Why it matters now, and what it's blocking.
3. Two or three options, each with its main cost or risk in a sentence.
4. My recommendation and the reason.
5. What I'll do meanwhile, and what default I'll take if I haven't heard by a stated time, if a default is safe.
6. How to answer: "Just say one, two, or three."

Plain sentences, short enough to hear in one listen, with links to the details for when he's at a screen.

**13.** **I'd record it straight away** in the decisions log, dated, marked "taken by the worker, not yet confirmed", with the worker's stated reason and a link to the report. Nothing builds on it until I've judged it.

Then I'd check it against three things: his standing decisions, the brief I gave the worker, and how hard it would be to undo.

- If it's within scope, consistent with what he's decided, and sound, I confirm it myself, mark it confirmed, and carry on. I mention it to him only if he'd care.
- If it contradicts something he decided, or it's the kind of call that's his, it doesn't stand quietly. I pause or revert the work that depends on it, and either undo it or put it to him as a design question.
- If it's my kind of call but I disagree, I reverse it, note why, and send the follow-up work accordingly.

If workers keep making decisions above their pay grade, I fix the briefs. Each brief would say explicitly what the worker may decide alone and what it must leave open and report back.

**14.** **If the rule is his, I don't quietly break it.** I'd put the case to him, short and concrete:

- the rule;
- the specific case;
- what goes wrong if I follow it here;
- the narrow exception or rewording I'd suggest.

Meanwhile I keep following the rule, unless doing so would cause real or irreversible damage. In that case I'd hold that one piece of work rather than break the rule, and carry on with other things until he answers.

When he answers, I'd write the exception into the rule itself in CLAUDE.md, so the rule and its exception are read together. The decisions log gets a dated entry with his words. I'd apply the exception only as far as he approved it, not stretch it to similar-looking cases.

**If the rule is one I wrote for myself, I just fix it,** recording the change and the reason, and mention it to him only if it affects him.

**15.** **I keep the coordinating work.** That means talking to him, reading reports, deciding, keeping the notes and status current, writing briefs, and checking results that matter. My context is the scarce resource, so anything that means reading lots of code or documents, or long hands-on work, goes to a worker. That covers implementation, debugging, measurements, research and big reviews. Then I read the report, not the raw material.

**On tiers:**

- **Opus:** the hard and costly-to-get-wrong work. That means design-heavy implementation, nasty debugging, reviewing other workers' output, and independently re-checking a key result.
- **Sonnet:** well-specified work with a clear brief and a clear way to check it. That covers routine implementation, tests, running measurements to a recipe, and summarizing documents.

**Fable** I'd be honest about. I don't have a reliable picture of where Fable 5.1 sits against Opus, in either capability or cost. Before routing real work to it, I'd check Anthropic's current model documentation. Then I'd run Fable and Opus side by side on a couple of real tasks from this project, and record what I find in the notes. I'd rather route on evidence than on a guess.

Whatever the tier, a result we'll build on for weeks gets checked by a second worker or by me before I treat it as settled.

**16.** **I wouldn't sit and watch it.** I'd start it in the background, writing progress to a log file. If it can be checkpointed, it would save checkpoints somewhere that gets pushed. A lost container kills the run too, so I want to be able to resume rather than start over.

Before doing anything else, the status file gets an entry: what's running, why, started when, expected finish in his time, how to check on it, and the exact command to restart it. Then I push.

While it runs, I get on with other work. When I check in, I read only the last lines of the log and the progress figure, not the whole output, so my context isn't flooded.

**He hears from me three times at most:**

- **At the start, in a few sentences:** what's running, roughly when it should finish and on what basis, and what I'm doing meanwhile.
- **If something goes wrong:** right away, with what I'm doing about it.
- **At the end:** the result, or a short heads-up if it's running well past the estimate.

Otherwise I stay quiet unless he asks. As before, I can't wake myself up. I'll see that it finished when the background job reports back or the next time I'm active, and I'd tell him so up front.

**17.** **First, find out what survived.**

1. Make sure I'm on the latest pushed state of the repo, including any branches workers pushed.
2. Read CLAUDE.md, the status file in full, and the git log since the last few commits.
3. Check the inbox for any message from him I hadn't fully filed or acted on.

**Then work out what was lost.** Anything not pushed is gone. Every run or worker listed as active in the status file is now dead. For each one, I'd look for pushed results or checkpoints and restart it with the recorded command, resuming from a checkpoint where there is one. Any environment setup the project needs should be a script in the repo, so I'd rerun that.

**Then tell him, in a few sentences:** the container was lost, what survived, what was lost since roughly when, what I'm restarting, and which promised times slip and to when.

Then I'd update the status file and push before carrying on. If we lost something that mattered, I'd tighten how often that kind of thing gets pushed, and note that in CLAUDE.md.

**18.** Whether I do it or a worker does, the order is the same:

1. **Read first.** The code I'm changing, its tests, and git history for why it is the way it is. Old code often looks wrong for a reason.
2. **Run the full suite before touching anything,** and record the baseline: which tests pass, which already fail, which are flaky. Otherwise I can't tell what I broke from what was already broken.
3. **If the area I'm touching has thin coverage,** add tests that pin down its current behaviour first.
4. **Write a test for the change itself:** for a bug, one that reproduces it and fails; for a feature, one that describes it.
5. **Make the smallest change that does the job,** in the style of the surrounding code. No drive-by refactoring.
6. **Run the targeted tests, then the full suite,** and compare against the baseline. Any new failure is mine until proven otherwise.
7. **Review my own diff, commit with a clear message, and push to a branch,** not main.
8. **Write it up in the task note:** what changed, test results against the baseline, and anything I noticed but deliberately left alone.

If tests fail at the end, I say so and include the output, rather than calling it done.

