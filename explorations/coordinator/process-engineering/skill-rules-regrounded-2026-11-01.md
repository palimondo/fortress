<!-- The nine coordinator-skill rules that the curator sent back on the skill drafts page on 2026-11-01 (rules 2, 4, 11, 12, 13, 15, 17, 20 and 22 of the branch skill/coordinator-held-rules, head 12f013069), each grounded again in his words at the time, from the coordinating session's transcript: his words with their UTC times, what he meant, the draft's text, a new text with its place in the skill, and a recommendation; for rule 4 also which of the draft's four points the coordinator can act on. Written 2026-11-02 by an Opus worker for the coordinating session, reading only; it edits no skill. -->

# The nine commented skill rules, grounded again

## How to read this

- Times are UTC. The curator's time is UTC+1.
- "His words" are from the transcript `fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`, cleaned as `delegating.md` says: dictation errors fixed, `[?]` after a guessed word, `[...]` for a cut. His page comments of 2026-11-01 are quoted as the brief gave them.
- "The draft" is the text on `skill/coordinator-held-rules` (`git diff c3b566efc 12f013069`). "Main" is the skill as it stands after commit `9311b0967`, which landed the 13 accepted items.
- Each new text is a minimal change from what the model does by itself, with no dated example.

## In short

- Rule 2, reground each step: land a new text in place of the draft.
- Rule 4, page comments: land one bullet that holds only the coordinator's own choices. Two of the draft's four points were the tool's design or already in the skill.
- Rule 11, the brief: land a new opening for "What a brief holds", a changed bullet on entries, and one added sentence.
- Rule 12, the judgement step: land one bullet in `SKILL.md`. Drop the draft's bullet in `delegating.md`.
- Rule 13, reuse a worker that holds the context: fold one sentence into a bullet that `delegating.md` has.
- Rule 15, resolve the team's contradictions: land as a principle in `SKILL.md`. Drop the draft's bullet in `record.md`.
- Rule 17, what a consolidation covers: change one sentence of `record.md`. Add no new point.
- Rule 20, few principles: land one sentence pair in the opening of `skill-rewrite.md`, and keep the sentence that the draft cut.
- Rule 22, provenance: land two sentences, with no example. Drop the draft's change to "An ask".

## Rule 2: reground each step in the goal

**His words.**

- 2026-10-28 12:13:25: "You are operating from the whole wrong premises. [...] It's about making the right decision that resolves the contradictions from the repository left by the original team."
- 12:18:29: "This is the constant failure mode I see in you. You are doing work, but you are never regrounding yourself in like higher level goals. What are we doing? Yes, but why? For what purpose? What are the desired consequences of our actions? How are we weighing, contradicting, or competing aspects of the thing? Like, can you try and devise some kind of process for yourself now? Like, restate some mantra that tells you where we are and what are we doing? Why are we doing this? Try it for size before I lose my temper."
- 12:24:08: "[...] part of the what you recited is already in your skills. So that part, I believe, doesn't need to be restated like anytime, but like you are permanently losing yourself. So this regrounding from time to time is probably needed for you to get back on track. [...] We're unable to make grounded decisions and properly weigh trade-offs unless you are constantly reminded about this."
- Page comment, 2026-11-01 22:19: "the intention here is good, but the grounding in my reasons is not yet expressed correctly. [...] We need to revert and reground it a bit more."

**What he reacted to.** In the hour before, the coordinator proposed changes to the clarity and mining workflows without knowing what they were for (his 11:49:40: "Do you know what these workflows are for, how they work? Or are you fantasizing about their purpose"). It also judged the review's findings by whether they matched his words, not by whether they resolve the team's contradictions (12:13). At 12:19:02 it recited a "mantra": the mission, then five questions (the goal, the place in the stack, what must be true at the end, the failure it protects against, the trade). At 12:25:06 it proposed: "after each boot, and before each ask, I state in a few lines where we are in the stack, what the step in hand must produce, and what it protects against." The held line comes from that proposal. He did not answer it in words. The boot half landed as rule 8.

**What he meant.** The failure is a step taken on a premise that nobody checked against the goal: a tool's purpose assumed, or the wrong measure of what is right. Before the coordinator commits the work to a step, it asks what the step is for, what it must bring about, how the aspects that compete weigh, and whether its premise holds. The mission itself is in the skill and needs no restatement.

**The draft** (`SKILL.md`, "The standing goal", a new bullet): "Before each ask and each launch, restate in a few lines: which goal the step serves, and where the work stands on the way to it; what the step must produce; what it protects against; what it gives up for that. Leave out what this skill already states."

**New text** (`SKILL.md`, "The standing goal", a new last bullet, in place of the draft's):

> - Before each ask, proposal or launch, reground the step in the goal: what it is for, what it must bring about, how the aspects that compete weigh, and whether its premise is checked or only assumed. Give the curator these lines with each ask or proposal, so that the curator can correct a wrong premise before the work runs. Leave out the mission, which this skill states.

This answers the draft's open question, who hears the lines: the curator, with an ask or a proposal. Before a launch, the check is the coordinator's own, and the brief carries what the answer is for (rule 11).

**Recommendation:** land, as a new sentence.

## Rule 4: page comments

**His words.**

- 2026-10-29 09:14:37: "We've started with a light boot and we kept the context window in check until I started to reply to the artifact and you were using the comments tool. And suddenly now your context is full. Are those comment actions so costly, or were you doing a lot of tool calls in response to my actions? Were you reading a lot of the documents multiple times when I was commenting on it, or where did we spend the context window budget here?"
- 12:35:09, quoting the coordinator's answer of 09:33:22 ("So the lever is on my side: fewer calls per comment, held-list edits batched, and shorter thinking"): "This sounds like something that should go to our next coordinator skill update as a guidance, how to work with comment sections in artifacts."
- Page comment, 2026-11-01 22:27: "is this something that the coordinator session has a control over, or is this dictated by the interface from the comment tool [...]? [...] I don't want to put a rule in here that you cannot act on."

**The event.** He left 16 comments on the corrections page from 05:22 to 07:58 on 2026-10-29. Each comment turn ran the same way:

1. The harness queues a notification, which wakes the session.
2. The coordinator calls ReadNotifications: about 2.9K characters, 2.3K of it preamble. Its payload names only the thread.
3. It reads the thread, with the thread named: that one thread, inside a fixed frame of about 3.7K characters, 70 percent of the read.
4. It replies on the thread.
5. One Bash call edits `HELD.md`, commits and pushes. Git shows 18 commits of `HELD.md` from 05:00 to 08:05.
6. Its text in chat repeats the thread's reply ("Held: your comment on ... at 05:22. ...").

`postmortem-2026-10-28/evidence/context-spend.md` counts 25 comment turns to 09:15, 126K in all, about 3.8 calls and 5K each. Of the 126K:

- 69K (55 percent) is the harness's and the tool's fixed part: the reads 35K, ReadNotifications 19K, the notifications 4.4K, reminders 5.3K, the fixed part of each call 3K, the replies' results 2.3K.
- 41K (33 percent) is the coordinator's own output: the replies, the held-list edits and commits, the chat texts and the thinking.
- 15K is the workers' returns that his comments asked for.

The context did not grow faster while he commented. The comment window grew 160K in about four hours, 40K an hour. The delegating morning of 2026-10-28 grew 226K in seven hours. The context was already at 533K when the first comment came.

**Which of the draft's four points were the coordinator's choice.**

1. "Read each thread once." Not a choice. Three threads were read again, 9K tokens in all, and each later read followed a new comment of his on that thread. The tool shows a new comment only through a new read of its thread. Drop.
2. "Reply on the thread in a line or two, and keep your thinking short." The reply is the coordinator's, and the replies were already short. Thinking was 15K of the window's 160K, and a rule cannot hold it to a size. Drop.
3. "Write the held lines of several comments in one edit, and commit them together." The coordinator's choice: one held-list edit, commit and push for each comment. Keep.
4. "When the reading is done, bring the points to chat as one list." The coordinator's choice, and the skill already says it: "Answer nothing until the curator says the reading is done." Fold into the new bullet.

His guess about duplication is right, and it was the coordinator's choice. Each point was written three times: on the thread, in the held line and in chat. His guess about the commits is right too. The re-reads came from the tool's design.

One correction to the brief that launched this note. A read returns every thread only when it names no thread: on 2026-11-01 at 23:36, such a read of the drafts page returned 15.1K characters. On 2026-10-29 each read named its thread and got only that thread, with the header line "Showing only the requested thread — 15 OTHER threads carry comments sent to you".

**The draft** (`SKILL.md`, a paragraph after "While the curator reads turn by turn"): "When the curator comments on a page, each comment costs a turn of about four calls, and about 5K of your context. Keep that turn small: Read each thread once. Reply on the thread in a line or two, and keep your thinking short. Write the held lines of several comments in one edit, and commit them together. When the reading is done, bring the points to chat as one list."

**New text** (`SKILL.md`, "Talking to the curator", a new last bullet under "While the curator reads turn by turn", in place of the draft's paragraph):

> - When the curator comments on a page, the page's threads hold the points. Reply on each thread with its held line and "holding", reply "." in chat, and write the held lines of the whole reading in one edit and one commit when the reading is done.

A held line can wait, because the page keeps his comments and the replies through a compaction or a lost container.

**Recommendation:** land, as a new sentence.

## Rule 11: the brief

**His words.**

- 2026-10-28 07:37:43: "when I saw how you are briefing the workers, it gets long. With a lot of details, instructions. Do this, do that, look here, don't look there. You are spending your reasoning effort, your context here, on micromanaging workers. I don't know whether this is helpful. [...] But maybe there is like lighter touch that you can use in prompting. So that we do not blow out of our context window again."
- 11:30:04: "when I checked how you are briefing these workers, you were the one picking for them what they should read. [...] So I think your impulse to brief workers with pointers to record is correct. Where you know you are talking about specific facts, positions, etc., you are quoting them by reference by using the ID [...] you should probably make your briefings for the workers even lighter and tell them to go through the record first."
- 11:46:17: "you don't need to quote the skill each worker loads the skill core and the triggers in the router should make it read the record if you say read the record. So save your tokens, for valuable info. When you are redirected, [a] regular worker [?], to do part of the [...] coordinator's job [...] In such a case, use selective pointers to the coordinator skill. That was correct on your part when you are asking them to perform analysis. That was a good call. I'm just saying, don't pick the reading list. Let them do it."
- 2026-10-29 22:04:25: "The way you micromanaged the librarian in the brief is not in line with fine-tuned practices [?] from before the compaction. Run a scout so that our skill rewrite captures the correct way."
- Page comment, 2026-11-01 22:45: "it is quoting whole positions I believe like the better practice is to know them just by reference and let the worker use the tools to fetch the full positions and facts into the context when needed with their history. [...] what was bothering me is how much effort in the coordinator's context was spent on writing the briefing, where a lighter touch would suffice [...] the coordinator was telling the worker which parts of the skill it should load [...] unless you are delegating part of coordinator job to the worker. In that instance, you need to name it, because workers load only fortress-repo skill."

**The brief he reacted to.** The librarian brief of 2026-10-29 21:58:00, Opus at extra high effort, 625 words. It gave the question in a paragraph. Then it gave a reading order in four steps: the scout's file "whole", six record queries (`'P-33'`, `'history:P-33'`, `'P-12'`, `'history:P-12'`, `'F-290'`, `'F-53'`), four named documents with their sections, and six transcript windows that the scout's file already held. Then the output's sections, the commit, and a 20-line report. It quoted no entry: it named each entry by its query. Of the 56 Agent-tool briefs from 2026-10-26 to 10-29, none quotes an entry whole. Seventeen tell the worker to read a part of `fortress-repo`, most often its records part, which its router loads by itself. The skill's bullet "The entries that it needs, quoted word for word under their numbers" asks for quotes, and the drafts page showed that bullet as left open. His comment settles it: by number.

**What he meant.** A brief gives what only the coordinator knows, and points to the rest. The worker has the skills and its trained habits. It chooses its own reading and fetches the entries by number, with their history. Every line of method in a brief costs the coordinator's context and adds nothing. The one exception is a worker that does part of the coordinator's work. It needs the coordinator skill's parts named, since a worker loads only `fortress-repo`.

**The draft** (`delegating.md`, "What a brief holds"): a new opening, "A brief is short: the problem, the question, and where the sources are. The worker picks its own reading."; the first bullet's "The problem" made "The problem and the question"; the bullet "A pointer to the research on file, not a restatement of it." replaced by "An instruction to search the record first. Name only the files that are the task's direct inputs, such as the file under check. List no other files to read, and no time windows of a transcript."; and after the list, "So quote no skill in a brief. If the worker does part of your work, such as an analysis, name the parts of this skill that the work needs."

**New text** (`delegating.md`, "What a brief holds"):

- A new opening, before the list:

  > A brief holds what only you know: the problem, the question, what the answer is for, and where the sources are, the record first. The worker has `fortress-repo` loaded, and its router loads the parts that the work needs. So leave the method to the worker: give no reading list, reading order or steps, and neither quote nor name a part of `fortress-repo`. Each costs your context, and the worker chooses its reading well without it.

- A change of the bullet "The entries that it needs, quoted word for word under their numbers. Quote a rule of the curator's whole, with its limit and its example.":

  > - The entries that it needs, by number. The worker prints them, and their history where it needs it, with `facts-extract.sh`. Quote whole, with its limit and its example, only a rule of the curator's that the record does not hold yet.

- One sentence added to the paragraph after the list:

  > A worker loads no part of this skill by itself. If it does part of your work, such as an analysis, name the parts of this skill that the work needs.

The first bullet and the bullet on the research on file stay as main has them.

**Recommendation:** land: one new paragraph, one changed bullet, one new sentence.

## Rule 12: the judgement step

**His words.**

- Page comment, 2026-10-29 07:18, on P-17's finding: "I asked an LLM to go and find issues with the text. So it went and found issues with the text. It applied no judgment whether the finding is significant. And we are now trying to incorporate every single finding that the tenets [?] review did. Like, we probably need to sort the findings into consequential or just [...] no filter, no common sense was applied during this process, and we are now dealing with the aftermath of excellent instruction following to the letter, but not what we need, not what I ask for. This is like all the letter of the law without any spirit of the law."
- 09:12:17: "Workers produce results, and you then try to follow it literally. So whichever trivial findings a report finds, we are trying to force them in. There was no judgment step [?] applied by you as coordinator to the results of the workers."
- Page comment, 2026-11-01 22:48: "the main issue was about not inserting a judgment step that would correctly weigh points. So like if I ask a worker to find issues in a text, it will give me consequential as well as trivial points, and this judgment part I don't see it here in the new changed wording emphasized enough."

**The review whose findings came unweighed.** The foundations review of 2026-10-24 to 10-26 (`explorations/reviews/foundations/judgement.md`) gave 30 findings on 18 POSITIONS entries. The corrections' pilot and chunks of the night of 2026-10-28 wrote every finding into the entries' text. At 05:49 on 10-29 a worker sorted the findings by their home (an entry's text, its history, FACTS). After his 07:18 comment the same worker sorted them by significance, and at 07:20:34 the coordinator reported "11 consequential, 16 minor, 3 none". So the sort came only after he asked for it. At 09:12:52 the coordinator named the cause: "Each time the worker's output became the plan, and the judgement layer between the report and the action was empty." It proposed that the coordinator state what a report found, what it recommends and what the goal needs before acting on it. He gave no answer in words: his next message, at 09:14:37, turned to the context.

**What he meant.** The judgement is the coordinator's step, between a worker's result and the action. A worker asked for faults returns all it finds, with the same weight. The coordinator sorts them by whether they matter, carries those forward, and sets the rest aside. The worker's own grading would help, but it does not take the place of that step.

**The draft** (`delegating.md`, "What a brief holds", a new bullet): "If the worker reviews a text, an ask to say for each finding whether it changes what a reader decides or does. Without that ask, a review returns every finding at the same weight."

**New text** (`SKILL.md`, "The standing goal", a new bullet after "Keep your context for decisions..."):

> - Judge a worker's result before it becomes the next step: a review returns trivial findings beside those that matter, and a recommendation answers the worker's question, not always the goal's. Carry forward only what changes what the work or a reader decides, and name the rest in one line.

The text says "those that matter", not "consequential", since `SKILL.md` gives that word a meaning of its own for a decision.

**Recommendation:** land in `SKILL.md`, as a new sentence. Drop the draft's bullet.

## Rule 13: reuse a worker that holds the context

**His words.**

- 2026-10-28 10:01:37: "Aren't you now redoing the same scout window as you did before? Don't you have a... report from scout for the same window? Did you now change the briefing so that it is necessary to rerun the same one?"
- 11:55:58: "So if that's already in the worker's brief that is currently running, fine. If not, please steer it in this direction."
- Page comment, 2026-11-01 22:51: "This was about reusing existing worker context if it was recently finished, so that it can continue from cache [...] even older worker can be reawoken. We pay the KV cache right, but we already have the correct context loaded and we do not need to search again. [...] But again, I believe this is what you already do, so I'm not sure if we even need this point at all."

**What happened.** At 10:01:53 the coordinator answered: "The cheaper way was to send the first scout a follow-up message: it still holds the transcript and the command in its context. I launched a fresh one instead." The habit dates from his correction. The transcript counts messages to a worker whose report had already come:

- 2026-10-08 to 10-23: 7 in all, 0 to 2 a day. 10-24 to 10-27: none.
- 2026-10-28: 15. 10-29: 14. 10-30: 5. 10-31: 5.

So he is right that the coordinator does it now. But it has done so only since his word, and the compaction summaries carry that word, not the skill. A fresh session would not have it. `delegating.md` holds the idea for one case only, "A long writing pass": "resumes the session that wrote it, with its evidence still in the cache. A fresh writer would read everything again."

**What he meant.** Before a fresh launch, the coordinator asks which worker already holds the material, and sends that worker the question, also after it has finished.

**The draft** (`delegating.md`, "Watching a run", a new bullet): "To change the task of a running worker, send it a message (`SendMessage`). If a worker already holds the material of a new question, such as a transcript window, send that worker the question. Launch no fresh worker for it."

**New text** (`delegating.md`, "Watching a run": one sentence added at the front of the bullet "If a worker waits on the curator between tasks, run it as a headless session and resume it within the hour (`--resume <id>`)."):

> - Send a follow-up question to the worker that already holds its material, with `SendMessage`, also when it has finished: it goes on from its transcript and does not search again. If a worker waits on the curator between tasks, run it as a headless session and resume it within the hour (`--resume <id>`).

The half on steering a running worker goes: the coordinator does that by itself.

**Recommendation:** fold, as one sentence in a bullet that the skill has. Drop it if he prefers no rule. The cost of a drop is that the habit rests on the compaction summaries.

## Rule 15: resolve the contradictions that the team left

**His words.**

- 2026-10-28 07:26:03: "I like the Fortress language as an idea whose time was cut short. And I'm trying to reconcile all the contradictions that were left in the language. [...] So nowhere is the goal to quote me verbatim. It is to capture factually correct statements in a minimal form".
- 12:13:25: "it is this whole focus on my words, my words, my words. [...] That's not the point. We had a process that examined the whole repository to find the correct judgment. It's not about my [...] words. It's about making the right decision that resolves the contradictions from the repository left by the original team."
- Page comment, 2026-11-01 22:56: "The point about resolving the contradictions is the one of the highest level principles here. [...] I am not here to redesign the language because I don't have a skill set for it. I can decide on edge cases of contradictions from the original designer's intent. I can make that call. It is not just for record keeping, it's a higher level principle."

**What he meant.** The revival's work is to resolve the team's contradictions from the evidence in the repository. The curator decides only what the evidence leaves open, by the designers' intent. His words record that decision. They are not the reason why the design is right. This governs every fork, not only the wording of POSITIONS.

**The draft** (`record.md`, "What an entry is", a new bullet): "A correction of a POSITIONS entry rests on the evidence of the design in the repository: the specification, the team's later word, the library and the code. The curator's words are evidence of what the curator decided, not the ground of the design."

**New text** (`SKILL.md`, "The curator's role and decisions", a new paragraph between the section's first paragraph and the paragraph of the three principles):

> The revival resolves the contradictions that the team left, by the evidence in the repository: the specification, the papers, the library and the code. The curator does not redesign the language, and decides a contradiction that the evidence leaves open, by the designers' intent. The curator's words show what the curator decided. They are not the ground of the design.

The three principles then follow as the ways in which the evidence settles a fork. `record.md` needs no new bullet: its landed bullet, "A POSITIONS entry holds the curator's meaning, not the curator's voice", covers the record's side. The skill's description, which triggers the load, is the wrong home for a principle. `SKILL.md` is the core that every boot reads.

**Recommendation:** land in `SKILL.md`, as a new paragraph. Drop the draft's bullet in `record.md`.

## Rule 17: what a consolidation covers

**His words.**

- 2026-10-28 23:07:04 (the held list gives 22:5x): "I noticed somewhere in the fragments I read today, that the skill was asking for consolidation to be run before each batch. That was meant as consolidation of facts added/edited after the batch landing, because they were created by workers in the previous batch and record keeping instructions were kept deliberately minimal to keep worker's focus on coding task. Consolidating the record [is the] coordinator's job."
- Page comment, 2026-11-01 23:03: "this shouldn't concern only facts, but also positions [...] everything that's defined in the record, facts, positions, I don't know, index. [...] If the workers write something that is long or redundant, or like if it invalidates something else on the record, it is the coordinator's job to make sure that the record is consolidated, like find the duplicates, update the relevant changes. [...] Are there other parts of the skill that state similar instructions? I don't want to add a new point. Maybe it's a refinement to existing point that can be brief."

**What the skills already say.**

- `record.md`, the glossary: "**pass**: Your rewrite of what a worker wrote into entries of the form below." "The pass": "The pass owns each entry's final wording." "Run the pass when a worker finishes, and before the next boot or batch reads FACTS. In a batch, the commit stage runs it [...]. After a lone worker, you run it." "Run the same pass on POSITIONS at each landing, and when the curator replaces a decision." Step 3 of the pass: "If a behaviour changed, grep FACTS for it, linked or not. Each entry that states it is updated, or says how it differs."
- `record.md`, "INDEX and the gap ledger": "Give each new note under `explorations/` one line in INDEX".
- `batch.md`, "The landing", step 2: "Check that the commit stage folded the batch's entries into FACTS".
- `fortress-repo`'s `records.md`: "Spend no effort on the entry's wording: it is rewritten to the record's form after your work." Without leave to write FACTS, a worker hands each fact over in its report.
- `delegating.md` says nothing on the workers' record-keeping.

So the skills already make the consolidation the coordinator's job, and keep the workers' share small. Only the scope of "A consolidation" is wrong: it names FACTS alone, and it gives no bound.

**The draft** (`record.md`, "A consolidation", its second sentence replaced): "Before each batch launches, run it on the FACTS entries that the workers of the batch before it added or changed. Their briefs keep their record-keeping short, so that they keep their focus on the code, and the consolidation of the record is your job."

**New text** (`record.md`, "A consolidation", a change of the sentence "Run it on FACTS before each batch launches, since the batch's workers read it."):

> Before each batch launches, run it on what the batch before it added or changed in FACTS, POSITIONS and INDEX, and on each entry that this repeats or makes false, since the next batch's workers read them.

The draft's second sentence goes: the pass's definition and `fortress-repo`'s records part state it. How the consolidation runs, by a workflow or a worker, is the open question of his comment on rule 18 (23:10) and is not settled here.

**Recommendation:** land, as a change of one sentence.

## Rule 20: few principles, not a program of rules

**His words.**

- 2026-10-28 07:26:03: "I do not want our skills to be riddled with spaghetti code. Rule this, rule that, if this, do other thing. We know you are generally good at instruction following, but if your context is filled with such a series of quote-unquote programs, this natural language pseudocode, it always gets you confused. So the positions and skills should be encoded as a minimal delta. [...] we are looking in our skills, positions, etc., to encode the delta from your generic model nature to the specific use case in this repository."
- Page comment, 2026-11-01 23:15: "I think you dropped an important rule. Like, what I am against is the spaghetti code written in natural language, which often goes into skills as a set of do this, do that, if that. [...] those instructions get lost in a full context. So I think this rewrite does the exact opposite of what I wanted to do."

**What the draft cut.** The draft cut "Write no set of many small rules that may contradict each other." from the first bullet of "The coordinator skill". It put "A skill holds only what changes what the model would do by itself, in few rules." in the opening. So the skill would still be made of rules, only fewer, and the one explicit ban on a set of small rules was gone.

**What he meant.** A skill is the smallest change to the model's trained behaviour. It gives a few general principles that the reader applies with judgement, not a program of conditions and steps, which a full context loses.

**New text** (`skill-rewrite.md`, its opening paragraph, two sentences added after "The skills are written for a reader new to the repository, which every agent is."):

> A skill holds only the change to what the model does by itself, as a few general principles that the reader applies with judgement. A series of do-this and if-that instructions gets lost in a full context.

The first bullet of "The coordinator skill" stays as main has it, with "Write no set of many small rules that may contradict each other." The seven principles of `explorations/reviews/skills-writing-principles.md` (principle 2: "A chain of do's and don'ts cannot be held in mind") agree with it.

**Recommendation:** land, as two new sentences. Keep the sentence that the draft cut.

## Rule 22: weigh a team text by its provenance

**His words.**

- 2026-10-31 09:21:50: "I would go for internal language consistency. I would weigh a single method name by a team member whose name I'm hearing the first time and whose comment you cited earlier that he named it for consistency only as a throwaway remark which does not hold under the scrutiny. So I would first think about whether the name is correct, whether it has peers in other languages, and I would try to design for symmetry between the operations."
- 09:28:36: "Was this an external contribution that passed little review [...]? Like, again, we are taking the provenance into our decision making. [...] I'm not saying this modifies the ninth step. It's about putting weights on certain aspects of it."
- 09:37:10: "are you saying that the two operations, narrow and widen, were both added by Crink on a ZZ, and that narrow returns ZZ32, and that the widen returns ZZ64? [...] Because then those names are totally misleading."
- Page comment, 2026-11-01 23:25: "this change is worded too broadly with examples that will go out of date [...] it didn't capture the point that this was probably some kind of external contributors addition on ZZ, which is wrongly named. [...] So it should not be worded with the specific example, and it should be a lot shorter".

**The event.** `ZZ`'s `narrow` and `widen` came from one contributor, Crink: 26 commits from 2008 to 2010, after the open-sourcing, with nothing in the specification, the checker or the compiler. Crink wrote the two methods on one day of 2009, reverted them the same day and put them back the next, with the note that the naming "needs work" (`postmortem-2026-10-28/evidence/narrow-decision-context.md`; the coordinator's texts of 09:23:45 and 09:31:04).

**What he meant.** A text in the team's tree counts as the team's word by its provenance: who wrote it, in what role, whether it was reviewed or called provisional. The library's way is the consistency and symmetry of its operations across its types, and one contributor's name on one type does not outweigh it.

**The draft** (`SKILL.md`, "The curator's role and decisions", a new paragraph of seven sentences, with the `widen` and `narrow` example; and in "An ask", step 2, "Name each text's author and role on the team where they bear on its weight.")

**New text** (`SKILL.md`, "The curator's role and decisions", a new paragraph after the paragraph of the three principles):

> Weigh a team text by its provenance: who wrote it, in which role, such as a core designer or an outside contributor of the open-source years, and whether the team reviewed it or its author called it provisional. One contributor's choice on one type weighs less than the library's pattern, the consistency and symmetry of its operations across its types.

Step 2 of "An ask" stays as main has it. Its "how to judge the fork" already takes this principle in.

**Recommendation:** land, as two new sentences. Drop the draft's change to "An ask".

## What the retrieval could not find, or found otherwise

- No Sonnet scout ran. The Agent tool was not available to this worker. The retrieval was done with small scripts that print only the curator's messages and the coordinator's text replies, in windows of a few hours, with bounded output. The extracts are in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/regound/` (scratch, not committed).
- Rule 11: no Agent-tool brief of 2026-10-26 to 10-29 quotes a POSITIONS entry whole, and the brief that he reacted to named its entries by query. His memory of "quoting whole positions" matches the skill's bullet that the drafts page showed as left open, not a brief.
- Rule 17: the held list gives 22:5x on 2026-10-28. The message is at 23:07:04.
- Rule 2: the held line's "before each ask and launch" is the coordinator's proposal of 12:25:06. He did not answer it in words.
- Rule 12: the coordinator's proposal of 2026-10-29 09:12:52 got no answer in words. The foundations review's own briefs were not read.
- Rule 22: which list's "ninth step" he meant at 09:28:36 is not traced.
- Rule 4: the brief that launched this note says the comment tool returns every thread on each read. That holds only for a read that names no thread. Each read of 2026-10-29 named its thread.
