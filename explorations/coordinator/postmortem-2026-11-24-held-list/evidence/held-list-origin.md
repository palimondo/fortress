<!-- Cited evidence on what the held list was made for, in the curator's words, and how its rules changed from 2026-09-20 to 2026-11-24. For the coordinator and the curator, who are reviewing the list's rules on 2026-11-24. Written by a scout on 2026-11-24, read only, no judgement and no proposal. Times are UTC. "Transcript" is the coordinating session fe616d40 in `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/` (parts until 2026-10-08, until 2026-11-07, and from 2026-11-24). The curator dictates, so his words carry dictation errors ("help list", "hold list" for "held list"); they are quoted as the transcript has them. -->

# The held list: its purpose in the curator's words, and its rules over time

## Timeline

- 2026-08-21 17:22: the curator names the "wall of text failure mode" and asks for feedback to be gathered and processed "as a batch" (earlier session `bdff267d`; quoted in `postmortem-2026-09-19/wall-of-text-spiral.md`).
- 2026-08-22 01:21: `505d3ba480` commits `explorations/protocol.md` with the rule "hold edits, acknowledge briefly, process the batch when told".
- 2026-09-20 08:01: the curator tells the coordinator to record his points, "acknowledge super briefly ... and hold", and says "we'll have a standing list". First numbered list follows.
- 2026-09-20 13:51 to 15:40: the sustained run of "hold"s; at 15:33 he calls it "the end of our wall of text spiral".
- 2026-09-20 22:56: he asks the coordinator to "write all the held things to a persistent record" with a boot message.
- 2026-09-20 22:57: `050ae4f4c` creates `postmortem-2026-09-19/held-list.md`, the held list and boot note.
- 2026-09-21 01:14: the coordinator drops a point because it "sat in the held list"; the curator: "Wrong move."
- 2026-09-23 06:11 and 06:22: `c754a305b` and `3cf0773786` put the hold rule into `protocol.md` as "restate and hold".
- 2026-09-27 03:18: `9e7d12c753` reduces the protocol to principles; the hold rule becomes one sentence.
- 2026-09-27 08:01 to 08:22: the curator says "Don't repeat the held list" and asks how the list survives compaction; commit `aaa3d77cdd` (08:23) makes it "an index into the transcript".
- 2026-10-12 16:16 to 16:19: the curator says the list needs a home beside facts, positions, index and plan, and says what it began as.
- 2026-10-12 21:07: `cc3e59618a` makes `explorations/coordinator/HELD.md` its own file (109 lines, 14,398 characters).
- 2026-10-13: `7b434aae52` writes the coordinator skill from scratch, with the glossary entry and the "While the curator reads turn by turn" bullets.
- 2026-10-13 20:06: `0528e963bb` closes 93 lines held by the new skill.
- 2026-10-19: `2d9663cc37` adds "never cite a held line as the curator's yes".
- 2026-11-02: `5114bfeceb` adds the rule for page comments written to the list in one edit.
- 2026-11-03 06:1x: the curator states the purpose of the "held rule, then boot note" clause; `9d3ac8badb` (06:29) lands it in "The record: what goes where".
- 2026-11-03 18:11: `bc4ba9c99e` strikes 80 lines after the closing docket (63 items, 88 held lines).
- 2026-11-05: `f898915bce` and later commits add the held list to the changes that wait for the curator's yes.
- 2026-11-07: `c612214922` lands draft 32 (read the held list before a writer task).
- 2026-11-16 02:03 to 20:52: the list is 143,152 characters before `1732c36710` cuts 245 lines to 62,972 characters.
- 2026-11-23 11:19: the curator: "does our held list have over 500 open questions?!?! ... Where's a procedure for processing it?"
- 2026-11-24 (today): the page of skill drafts holds drafts 77 to 79, proposing an "exit" on each line. `HELD.md` is 241 lines, 83,940 characters.

## 1. The origin

### The curator's messages that created the list

**2026-09-20 08:01:00** (transcript, 4,766 characters; the end of it, whole):

> "So, and I will now just commit this and go back to reading from that point of protocol number five. There are many messages below it that I have responded to you before, but if something triggers me, I will again try to do stuff. Uh, Like re reply to you. So here I think the recovery mode is just you record my points and we will batch process them. You you you should not yet reply. Just just acknowledge briefly what I told you, and we have we'll have a standing list of of stuff that we will process because we need to recover from this wall of text spiral. That is the highest priority right now. So that I can have a list of grievances that will be addressed. So do not write a long response. Just acknowledge super briefly what I told you and hold. Until I finish reading down the chain."

The same message, earlier:

> "Okay, I'm now in a in a wall of text failure mode that I hate, where I am reacting to parts of your output and then you write a lot of interesting. I then try to go back to the chat transcript and continue reading. And as I'm giving you my running feedback, we are looping over uh, like me partially reading your messages, then having always to go back or trying to go back to recover full context. And like we are circling through this spiral of more and more open threads. And the coordinator's job is to protect me from this."

**2026-09-20 13:51:24** (1,642 characters), last line: "still hold for further feedback. I'm proceeding down the chat."
**13:57:41**: "I'll er, learn as I read on. Keep holding."
**14:23:19**: "Keep holding, but just. Do a prep work for that."
**14:33:50**: "And you either hold it or you decide to take some action with this."
**14:48:08** (3,471 characters): "Oof, okay, I think all of these require careful explanation and examination. Each need a separate turn and I have no context to make this decision at the moment, so they must go into our list."
**15:33:19** (1,118 characters): "Okay, I have now reached a point where I told you to hold and you started to gathering the open points. So I guess this marks the end of our wall of text spiral. I assume I have read everything below. Can you confirm that I have materially responded to all relevant parts of your replies? And nothing open is left dangling. That is not captured on the list."
**15:40:27**: "Let's, you seem to have a hang of it. The back references to items in, in this list meant literally nothing to me. And uh, sentences describing them were too short."

**2026-09-20 22:56:06.815** (390 characters, whole):

> "Can you write all the held things to a persistent record for you with all the detail necessary for resume this session after compaction, plus a message for yourself that boots you up to continue our session? I need your smart zone, and to conserve the fable tokens in efficient resume. 432k is too much to trust that you're in the most optimal place to work on such consequential decisions."

**2026-09-20 23:06:47** (102 characters, whole): "Told have to update the held-list.md to reflect the new state as well, right? And the boot up message."

The file that resulted, `050ae4f4c` (2026-09-20 22:57, 10,672 characters), has this header: "The coordinator's held list and boot note, written 2026-09-20 in the evening at Pavol's request so that the session can be compacted and resumed without loss." Its sections: "Boot note to the resumed coordinator", "The decisions in front of him, in the order agreed", "The research he asked for, answered", "Smaller items he still owns", "Where the record of today is". Its boot note says: "When he says 'hold', acknowledge in three lines, add his point to this list, and reply nothing else until he says he has finished reading."

### Later words of the curator on what the list is

**2026-09-23** (as `postmortem-2026-09-19/restate-and-hold.md` quotes him, 06:13:46Z, describing the process from memory): "you just restate what you heard from me as open points or something, and then you hold them and we'll go through all of them in batch later". That file's note on the 2026-09-20 08:01 message: "His words give the mechanism's purpose: 'as I'm giving you my running feedback, we are looping over... me partially reading your messages, then having always to go back... And the coordinator's job is to protect me from this.'"

**2026-09-23 06:43** (transcript): "Please hold. I will go and read the refresher about the generic trait."

**2026-09-27 08:01:50** (109 characters, whole): "Don't repeat the held list, just briefly acknowledge new held items. We'll get to processing that list later."

**2026-09-27 08:07:34** (whole): "I saw you store our whole help list into the protocol. Like, isn't what the help list is for? Isn't that what the help list is for? Why would you put it into the protocol?"

**2026-09-27 08:19:37** (338 characters, whole): "Uh, just to be sure, like the help list uh, contains more than just the short thing that you are reflecting back to me when, when you say hold. It is holding the full context from our discussion. Like what I was reacting to in my perf paraphrased position or how, how are you holding it? So that it survives compaction with full fidelity."

**2026-09-27 08:21:30** (626 characters, whole): "Did we now invent a new practice or what this was this previously described in the manual for holding information or I don't know like did it previously contain just pointers to conversation transcript with user message index or something or like can it be co compressed or are you copying a ton of text like I don't know how you are doing it there are efficient and, and stupid ways to do it so I'm just asking uh, what was the practice before and what you've adopted now whether that's the best thing we can do and maybe you are making a good trade of just dumping it uh, full I, I just don't know what you were doing before"

**2026-09-27 08:22:46** (whole): "Of course, so it was our running practice before, it just wasn't properly documented." Commit `aaa3d77cdd` (08:23) is titled "Held list as an index into the transcript, as it was kept before; the README says how". The section it adds to the list reads: "Each point is a line in the coordinator's words with the UTC time of his message in the session transcript (`fe616d40`, backed up on `transcripts-blinded`), which holds his exact words: an index, not a copy. Worked through one at a time when he says he is done reading; being on this list answers nothing." (`HELD.md` line 207 today.)

**2026-09-27 07:49:19**: "We are recovering from the wall of text spiral, so you need to hold my decisions and not produce new large replies. You understand?" **07:57:42**: "So again, this is something you just hold, right?" **2026-09-27 02:21:51**: "Executive assistant's main task is to help me keep the project on track, holding onto all open issues, prioritizing them etc. and keeping me from entering the wall of text spiral loop. (I think the record contains a description a past remedies for that failure mode)."

**2026-09-29 19:16:30** (261 characters, whole): "Hey, buddy. What is the reason that you're repeating holding? You are not holding. You are giving me full text replies. What are you holding? Is there a stable full of horses you want to unleash on the next run? What the fuck are you cargo counting about again?" **19:17:58** (whole): "How are you holding my inputs in the track held list? We have procedure for this in the coordinator protocol. Are you following it? Can I come back to you soon without you forgetting important context?"

**2026-10-12 13:05:24** (854 characters): "we need to find new home for for certain things like the held list or like work in progress. ... we need to have some lighter uh, tracking for how the chat is being managed. Because if if I'm, for example, recovering from wall of text uh, failure mode, we need to like. Whenever I tell you to persist everything that needs persisting and you need to reboot, like where does the boot node live?"

**2026-10-12 16:16:34** (846 characters): "it probably shouldn't live in, in post-mortem subfolder. The, the help list should be somewhere on, on, in the same place like facts, positions, and index, and plan. Like, it's a top-level item. Like, boot, boot notes somewhere. But help list is a different specific thing that we, I believe, still need. ... that's the wrong thing to have a permanent record hidden in a subfolder for, for a specific use case."

**2026-10-12 16:19:10** (970 characters), the passage on what the list is: "Or is the help list only when I'm recovering from the, well, it, I believe it started for me recovering from the wall of text spiral and help list is basically I'm commenting on stuff and you do not engage with, with them. And I believe it had a specific shape, like pointing to my, my words, pointing to specific timestamps in the transcript for, for your case, so that when we go over the compaction, you still can look up the full text of whatever I was reacting to, because my reactions were held verbatim in the held list and pointing to your records, or maybe both were just pointers to the record. I do not recall the structure, but I recall that at least in one file, we were using references to transcript timestamps or something like that, or full fidelity." The sentence before it: "I don't think the handle is always clear as whole. Like we have a ton of things from the batches that have landed and I have not reviewed and these are brought up to me. Like where does that thing live?"

**2026-10-12 16:23:25**: "I believe this review queue is like a section of of the coordinator skill for, for that mode of recovery from wall of text. Like that needs to be described somewhere, and the restate and hold is again something that drives it."

**2026-10-13 09:16:07** (2,645 characters): "we probably need some kind of a scratch for things that affect the way we work with coordinator but I think this is what we have in the bootnote and the help list etc so unless like we, we, we should now distill what worked into the coordinator skill".

**2026-10-13 16:11:49**: "You didn't reflect back what, what I told you, what, what you put on the help list. So I'm now un uncertain whether you, you dropped it or, or forgot it or what will happen with those points".

**2026-11-03 06:10:07** (2,893 characters), on the clause that became the skill's held-list bullet: "What are we trying to achieve here is when we have conversations with the coordinating session about how coordinator works, changes go into the help list until we do a skill rewrite, right? That's what we are talking about now. And if the boot comes in between, this clause, this change here is supposed to allow you to say what we wrote into the boot node, sorry, what we wrote into the help list, to write the same thing into the boot node so that the next reboot is aware of this change, the behavior of the coordinator, before it is baked into the coordinator skill, which like seems reasonable, right? We just agreed on how you should operate differently. And if a compaction comes in between, in order to retain this behavior, you quote that modification in the boot node so that the freshly booted sentence knows it needs to behave this way, and then also at the next opportune moment, update the skill to encode that behavior. So I'm fine with this. Why are we even discussing this? Like, this is how common sense and logic works."

**2026-11-09 17:20:14** (1,358 characters): "you are insisting on writing my exact words. Our standing rule is that the coordinator takes my position and writes it in clear way, clean way. ... So do not insist on quoting my exact words. I'm dictating or using swipe keyboards. There are typos all over the place ... Was the root cause that the process was not used? Or you are saying it was, the root cause was that I was misquoted into the help list, and then from there the error propagated?"

**2026-11-16 20:41:22** (373 characters, whole): "Yeah, everything here is growing, and we are unable to cut down those lists. Health list is big. Skills are growing. Ledger is growing. I don't like the idea with hooks for everything. I don't see how it could work. We have hooks for after the boot. That is good enough. You must use the router from the skill and load whatever it tells you to load. What is wrong with you?"

**2026-11-23 11:19:17** (192 characters, whole): "In that speed roadmap, I see references to things like Q501. What is that does our held list have over 500 open questions?!?! WTF are we even doing here? Where's a procedure for processing it?" At 11:27:40: "OMFG. 1. But also: Fable worker to review our overall development process, with focus on identifying and proposing fixes for dead ends in information/decision flows."

**2026-11-24** (the brief's quotation of the curator, cleaned): "The held list was a mechanism to recover from the wall of text. ... Held list is for storing my messages for you so that they can survive context compaction, and we can recover from the wall of text in a new, fresh context. ... it is of a temporary nature ... we are putting things on the held list so that you bug me about them, so that we resolve them, so that we can proceed in a controlled session." (Not found in the readable transcript parts; cited as given in the scout's brief.)

### The post-mortem's own record of the process

- `postmortem-2026-09-19/wall-of-text-spiral.md` (written 2026-09-23): "That evening (~22:57 UTC, commit `050ae4f4c`) the recovery was written down for the first time, in the boot note of `postmortem-2026-09-19/held-list.md`: 'When he says "hold", acknowledge in three lines, add his point to this list, and reply nothing else until he says he has finished reading.' Kept current through five further boots (through `2bae1d391`, 09-23); nothing in it has been folded into `protocol.md`." It also records: "At 01:14:56 the recovery mechanism itself failed: the coordinator had dropped a live concern because 'it sat in the held list, not because it matters now.' Pavol: 'Wrong move... Read the review behind them!'"
- `postmortem-2026-09-19/restate-and-hold.md` (written 2026-09-23): the process's instances (2026-08-21 17:22:16; 09-20 08:01; 09-20 13:51 to 15:33; 09-20 15:33; 09-21 01:14:56; 09-21 21:47:23; 09-23 06:03 to 06:14); the "shape that worked" in six points, among them: "Each remark becomes one line on a single running list, numbered continuously for the session, in the order raised — a condensed paraphrase, not his transcript verbatim"; "When he says he is done reading, the list is worked through — but being listed is not being answered".
- The curator's 2026-09-21 21:47 question, as that file quotes it: "Where some raised points silently ignore[d] by me and dropped?"

### The header of `HELD.md` since it became its own file

Unchanged since `cc3e59618a` (2026-10-12 21:07), no later commit changes its first line: "The held list: the points the curator raised while reading, turn by turn or on a page, each a line in the coordinator's words with the UTC time of his message, the transcript holding his exact words; and the smaller items he still owns. Worked through one at a time when he says he is done; being on this list answers nothing. Its own home since 2026-10-12, at his word, moved from postmortem-2026-09-19/held-list.md with its sections as they stood. Read at boot after BOOT.md."

## 2. Each rule on the held list in the skill, and its history

Today's `.claude/skills/coordinator/SKILL.md`, last changed by `8940d9429f` on 2026-11-24. Sources are from `references/sources.md` by its line.

### A. The glossary entry, line 67 to 68

Now: "**held list** : `explorations/coordinator/HELD.md`, the points that the curator raised while reading, one line each."

- Added by `7b434aae52` (2026-10-13, "coordinator skill: written from scratch, a core and six parts") in this form. No later commit changed the entry (`git log -S'raised while reading'` returns only this commit).
- Source: `sources.md` names no line for this entry. Line 7: "Glossary form: the writer's standing brief, section 2; P-134." Line 33 names "README 5-14 at `HEAD` (the boot note and the held list as files of their own)" for the boot order. Line 3: the skill was written from the writer's task `explorations/coordinator/process-engineering/coordinator-writer-task.md`; "HELD n" is line n of `HELD.md` at `55847bd34`.
- Before the skill: `explorations/coordinator/README.md` at `fb1aa7c7b`, lines 5 to 14, the boot order "→ the boot note (`postmortem-2026-09-19/held-list.md`, line 7)" (from `9e7d12c753`, 2026-09-27); `fe4dcc1e4e` (2026-10-13) changed it to "`BOOT.md`, the boot note, then `HELD.md`, the held list" and the README's wording to "the held list while he reads (`HELD.md`: each point a line in the coordinator's words with the UTC time of his message, the transcript holding his exact words)".

### B. "While the curator reads turn by turn", lines 186 to 192

Now:

> 186 "**While the curator reads turn by turn,** hold the points. An answer to each point as it comes buries the curator in text."
> 188 "- Write each point on the held list, one line in your words, with the UTC time of its message."
> 189 "- Reply with that line and "holding", in three lines at most."
> 190 "- Answer nothing until the curator says the reading is done. Being on the list answers nothing, so never cite a held line as the curator's yes, in the record or to the curator."
> 191 "- If the curator marks a point "now", act on it at once."
> 192 "- While the curator comments on a page, the page keeps the comments, so each comment's turn stays small: "." in chat, and the point kept in your context. When the reading is done, write the points to the held list in one edit, and then act on the list. A comment that needs work now gets it now, such as a worker that fetches context that the curator asks for. A comment that opens a discussion gets its answer on its thread."

History by commit:

1. `7b434aae52` (2026-10-13), before: nothing in the skill. After: "**While the curator reads turn by turn.** By default you answer each point at length as it comes, and the curator falls behind in a wall of text. So hold the points:", then "Write each point on the held list, one line in your words, with the UTC time of the curator's message.", "Reply with that line and "holding", in three lines at most.", "Answer nothing until the curator says the reading is done. Being on the list answers nothing.", "If the curator marks a point "now", act on it at once."
2. `f6bc1aa753` (2026-10-13, "the fixes of the kept-list check, the cold read and the trial boot"): the head became "**While the curator reads turn by turn,** hold the points. Your default, an answer to each point as it comes, buries the curator in text."; "of the curator's message" became "of its message".
3. `2d9663cc37` (2026-10-19, "the minimum while the curator is away, and a held line never cited as a yes"): "Answer nothing ... Being on the list answers nothing." became "... Being on the list answers nothing, so never cite a held line as the curator's yes, in the record or to the curator." Source, `sources.md` line 130: "a held line never cited as the curator's yes: `HELD.md`'s header, and the judgement of the 2026-10-19 post-mortem (`explorations/coordinator/postmortem-2026-10-19-haiku/fable-judgement.md`, section C, item 3), where a batch record cited a held line as the curator's approval. The curator approved the rule in chat at 23:32 UTC on 2026-10-19 ... Its wording and place: settled by the coordinator, written by the writer."
4. `6becc28f95` (2026-10-22, "fix the cold read's flags"): "Your default, an answer to each point as it comes, buries the curator in text." became "An answer to each point as it comes buries the curator in text." Source, `sources.md` line 169: "'Your default' in 'While the curator reads' reworded, since it meant a habit (K4)."
5. `5114bfeceb` (2026-11-02, "land the drafts page's version 6 items"): added the page-comments bullet (line 192) as it stands. Source, `sources.md` line 221: "a page's comments taken in small turns and written to the held list in one edit: the same note, rule 4, redrafted from his page comment of 06:07; accepted 20:57."

Source of the rule's content, `sources.md` line 30: "Restate and hold: protocol 105-110; HELD 75 (2026-10-12 15:44); decision 13." Those:

- `HELD.md` line 75 at `55847bd34`: "15:44 Restate and hold: keep; the handle is too compressed; it is the guard against the wall-of-text spiral, which is the default."
- `protocol.md` lines 105 to 110 at `fb1aa7c7b`: "When he is reading and replying turn by turn, restate and hold: each point in a line of our own words on the held list, the reply only acknowledges each new point in a line and says "holding", three lines at most, never the whole list again, nothing argued until he says he is done, and no point is answered by being on the list; a point he marks "now" is not held."

Before the skill, the rule's earlier forms:

- `505d3ba480` (2026-08-22), protocol: "Feedback arrives in batches, often from mobile. Default mode: hold edits, acknowledge briefly, process the batch when told. Pavol marks actionable exceptions explicitly ("...now")."
- Boot note of `050ae4f4c` (2026-09-20 22:57): "When he says 'hold', acknowledge in three lines, add his point to this list, and reply nothing else until he says he has finished reading."
- `c754a305b` (2026-09-23 06:11), protocol: "When he is reading turn by turn, each remark gets a few short lines, no argument, no new analysis, and more only when he asks a direct question that needs it. The moment he says "hold" or anything like it, every open point goes onto one list in the order raised (`postmortem-2026-09-19/held-list.md`) and nothing else is written until he says he is done reading; a listed item is not settled by being listed, it still gets its answer when he asks. A reply running long while he is mid-read is itself the signal to stop and offer the list instead."
- `3cf0773786` (2026-09-23 06:22), protocol item "(P) Restate and hold": "In that mode the coordinator does not answer what he says. It puts each point on one running list (`postmortem-2026-09-19/held-list.md`), in his order, in a few plain words of its own, what he meant rather than his sentence, with no argument attached, and says back only that list and that it is holding. This is the default for that kind of reading, whether or not he says "hold". A point is referred to by a short phrase, never by its number alone. Work already running that lands mid-read is reported in a line, then holding resumes. When he says he is done reading, the list is worked through with him one point per message, in the order raised; a point on the list is not answered by being there, and nothing he says in this mode is left off it. He marks actionable exceptions explicitly ("...now")."
- `9e7d12c753` (2026-09-27), protocol and README by role: "restate and hold: each point in a line of our own words on the held list, the reply is that list and "holding", nothing argued until he says he is done, and no point is answered by being on the list."

### C. "The record: what goes where", lines 220 and 230

Line 220 now: "- The held list. Its last section holds the smaller items that the curator owns."

- `7b434aae52` (2026-10-13): "- The held list, and the smaller items that the curator owns."
- `f6bc1aa753` (2026-10-13): "- The held list. Its last section holds the smaller items that the curator owns." No later change.
- Source: `sources.md` line 32: "What goes where: P-130; HELD 43 and 44 (2026-10-13 09:05, 09:16); the curator's rulings of 09:16 and 11:40 (`coordinator-skill-outline.md`, lines 7 and 8); README 22-36." `HELD.md` at `55847bd34`: "09:16 FACTS and POSITIONS hold the project only and stay, as briefs point into them; how he and the coordinator work goes to the coordinator skill; meanwhile the held list and the boot note are its scratch; draft the skill's parts and point to them."
- The section "Smaller items he still owns" is in `050ae4f4c` (2026-09-20), its first version.

Line 230 now: "- Put on the held list each rule that the curator states about your work, and each change to how you work that you and the curator agree in conversation. Have the skill writer (`references/skill-rewrite.md`) put it into its skill at the next opportunity, as "The curator's role and decisions" says. That opportunity is the next task that you give the writer that has its own cold read, not a task that only fixes a cold read's flags. Before you give that task, read the held list, and add to the task each point that names the skill writer. Leave out a point of a reading that the curator has not said is done, and a point for `fortress-repo` while the record-landing workflow runs. The curator's rule in conversation is not a yes to the skill's wording. Keep it on the held list until its skill holds the rule. If a compaction comes before that, quote the held rule into the boot note, so that the session after the boot works that way."

History:

1. `7b434aae52` (2026-10-13), after: "Have the writer put what the curator says about how we work into its skill, as a rule (`references/skill-rewrite.md`). Until then, keep it on the held list."
2. `f6bc1aa753` (2026-10-13), after: "Have the skill writer (`references/skill-rewrite.md`) put each rule that the curator states about your work into its skill. Keep it on the held list until then."
3. `9d3ac8badb` (2026-11-03, "the landing in one step, a landing that waits for no boot, and the held list's purpose"), after: "Put on the held list each rule that the curator states about your work, and each change to how you work that you and the curator agree in conversation. Have the skill writer ... put it into its skill at the next opportunity. Keep it on the held list until then. If a compaction comes first, quote the held rule into the boot note, so that the session after the boot works that way." Source, `sources.md` lines 245 to 249: "From the curator's messages of 2026-11-03, 06:1x and 06:2x UTC ... the held-list rule: a change to how the coordinator works, agreed in conversation, kept on the held list until the skill writer puts it into the skill, and quoted into the boot note if a compaction comes first. The purpose that the curator gave at 06:1x to `delegating.md`'s clause 'a rule of the curator's that no entry holds yet', which stays as landed." The held line (11-03 06:1x, in `HELD.md` at `9d3ac8badb`): "Its purpose, in his words: when he and the coordinator agree in conversation on a change to how the coordinator works, the change goes onto the held list until the skill rewrite; if a compaction comes between, the coordinator quotes the held rule into the boot note, so that the freshly booted session behaves that way before the skill holds it, and updates the skill at the next opportunity. Offering the other option was pointless: common sense settles it."
4. `f898915bce` (2026-11-05, "land the drafts page's version 10"), after: added "as "The curator's role and decisions" says. The curator's rule in conversation is not a yes to the skill's wording. Keep it on the held list until then." Source, `sources.md` lines 255 to 256: "the held-list rule: the skill writer puts a held rule in by 'The curator's role and decisions', and the curator's rule in conversation is not a yes to the wording. The same decision of 08:2x." (the curator's decision of 2026-11-05, 08:2x UTC, and his comment of 08:09 UTC).
5. `c612214922` (2026-11-07, "land drafts 32 ... and 33"), after: "That opportunity is the next task that you give the writer that has its own cold read, not a task that only fixes a cold read's flags. Before you give that task, read the held list, and add to the task each point that names the skill writer. Leave out a point of a reading that the curator has not said is done, and a point for `fortress-repo` while the record-landing workflow runs." and "Keep it on the held list until its skill holds the rule." and "If a compaction comes before that". Source, `sources.md` lines 408 to 410 (draft 32): the curator's words in chat at 07:1x UTC on 2026-11-07: "a curator triggered update of skills should write a proposal of all skill updates from the held list as well"; he approved the draft on the page at 23:24 UTC on 2026-11-07: "Read all. LGTM".

Related rule, line 126: "A change that touches the curator's role and decisions (this section), the asks, the held list, the review queue, the landing's one line for each decision or the register ... waits for the curator's yes to its exact words." History: `89c828c25d` (2026-10-17) "Propose to the curator in words first a change to how the curator and you work together: what you say to the curator, the asks, the held list and the review list. Make it only after the curator approves."; `f898915bce` (2026-11-05) the form above; `e7afa05020` (2026-11-24) "review list" became "review queue".

Related rule, line 183: "A branch that waits for the curator is state for the boot note: put it on no held list, review queue or other list for the curator." Added by `68efa8f06b` (2026-11-06, the curator's standing order on branches), changed 2026-11-24.

Related rule, boot step: "The boot note, then the held list." (`7b434aae52`, step 4; step 3 today.)

## 3. What was put on the list beyond his points while reading

First appearances, found by `git log -S` on `HELD.md` and on `postmortem-2026-09-19/held-list.md`.

- **The coordinator's own proposals with defaults.** In the first version, `050ae4f4c` (2026-09-20 22:57), section "The decisions in front of him, in the order agreed": the coordinator's proposals, each with its default (item 1, "Which library (his item 18). The judge's ruling ..."). Rule: none stated; the curator asked at 22:56 for "all the held things ... with all the detail necessary for resume".
- **A line that records an answer or a go of his.** `d31b2b9848` (2026-09-21 02:26, "Three of the four library changes ... approved by Pavol") and `581a295105` (2026-09-21 02:36, "The library route recorded as decided on Pavol's words of 09-20") edit the list for his answers. Lines headed "His answer" or "His go" appear in `HELD.md` as `b48832953a` (2026-11-05 17:47: "His answer is open"), `6fc6134598` (2026-10-28 07:47: "his go of 07:42 UTC") and `ff666d81b4` (2026-11-07 05:55: "His go"). By rule or word: `sources.md` line 33 gives no rule; the curator's 2026-10-12 16:19 words above ("I'm commenting on stuff and you do not engage").
- **A rule of his for the skill writer.** Skill text: "Have the writer put what the curator says about how we work into its skill, as a rule" (`7b434aae52`, 2026-10-13), from the curator's 2026-10-13 09:16 words and `HELD.md` lines 43 and 44. Lines headed "for the skill writer": first in `HELD.md` at `b3794eecfb` (2026-10-14 19:17, "P-148's rule for the workers, for the skill writer and the batch script before batch 16"); headed "For the skill writer:" at `ef0bbbf170` (2026-10-22 11:05) and `a67baf9506` (2026-10-30). The rule that each such rule goes on the list: `9d3ac8badb` (2026-11-03), from his 06:1x words. The curator's 2026-11-07 rule that the coordinator reads the list for such points before a writer task: draft 32.
- **A "for analysis" line.** First: `ad354f2ff2` (2026-11-16 01:44), "Held list: for analysis at his order, the skills' parts not loaded after the compaction ..." The line: "01:4x **For analysis, at his order:** "Put this moment on the held list for analysis. You not loading both of the two records section based on the router are critical errors."" The curator's transcript word, 2026-11-16 01:44:07: "Put this moment on the held list for analysis. You not loading both of the two records section based on the router are critical errors." The same session's `849986b590` (02:04) adds a second. 
- **The coordinator's own reading kept apart from his words.** `14126172e3` (2026-11-04 20:25): "The coordinator's reading, sent to the writer: ..." Commit `221857efce` (2026-11-10 14:16) is titled "Held list and boot note: his words kept apart from the coordinator's reading"; `7c7174b1c0` (2026-11-16 01:44) "the coordinator's guesses marked as its own"; `45b988f3a9` (2026-11-10) "his own points on QuickCheck told apart from the coordinator's". Word of his: 2026-11-09 17:20 (quoted above): "do not insist on quoting my exact words." The line at `HELD.md` 7 of today: "09:4x **For analysis, the coordinator's own entry, beside the lines of 11-23 ...**".
- **The coordinator's own rule.** First "the coordinator's own" in `HELD.md`: `5edd93757f` (2026-10-16 20:02); `f502f55639` (2026-10-20 11:56) adds "The coordinator's own" lines; `sources.md` lines 141 and 144 cite "the coordinator's own rule of 2026-10-20, 09:20 UTC" and a held push rule.
- **Work the coordinator started.** Lines with "Running (brief ...)" and "a worker sorts ..." (for example `HELD.md` lines 11 to 12, 2026-11-23; line 82, 2026-11-16 20:41: "a worker sorts this list's lines into done, still owed and cannot tell, so that the done lines can leave it (brief `<scratchpad>/batch32/held-trim-brief.md` ...)").

## 4. How a line leaves the list

### His words and rules on removal

- `HELD.md` header (since 2026-10-12): "Worked through one at a time when he says he is done; being on this list answers nothing."
- Protocol `3cf0773786` (2026-09-23): "When he says he is done reading, the list is worked through with him one point per message, in the order raised; a point on the list is not answered by being there".
- 2026-09-27 08:01:50: "We'll get to processing that list later."
- 2026-10-13 16:11:49 (1,225 characters): "the rest like should be compressed and or consolidated not not just compressed but split so we first need to do the tooling updates".
- Skill line 230: "Keep it on the held list until its skill holds the rule."
- `HELD.md`, 2026-11-03, his words on the consolidation: "18:3x The review queue, about 100K characters and 312 open items, scared him most ... The consolidation he means is of the review queue, the held list and PLAN." Transcript 2026-11-03 18:30:31: "we need to consolidate. Which part of the record, like review queue and held list and plan".
- Transcript 2026-11-02 18:26:07: "Didn't we close all skill updates from the held list?"
- Transcript 2026-11-03 18:47:51 (on items "Off your list"): "No need to store rejected garbage. Git holds it in history."
- 2026-11-16 20:41:22 and 2026-11-23 11:19:17 (quoted above).
- Skill has no sentence on when a line is removed from the held list today, apart from line 230. Draft 79 states: "A line whose exit is a rule in a skill stays until its skill holds the rule."

### Commits that removed 2 or more lines, with the count of lines removed

(`git log --numstat -- explorations/coordinator/HELD.md`; deletions at least 2 and more than additions; subjects shortened.)

- `0528e963bb` 2026-10-13 20:06: -93 (+1). "HELD.md: the points the new coordinator skill holds, and the done or settled ones, closed". Body: "Closed as held by the coordinator skill ... Closed as done or settled, by the outline's section 2 ... Kept: the history rebuild, losing the thread ... and his own items. The wip-branch line was dropped at his word."
- `4013d4025a` 2026-10-13 23:01: -7. "PLAN and HELD: batch 14 next; the history rebuild and the hook reset closed, the morning page read".
- `701b7daaca` 2026-10-14 11:53: -5. "HELD.md and BOOT.md: the skill points of 23:13 to 05:29 UTC closed by the coordinator skill's fine-tuning".
- `e2906af776` 2026-10-15 00:48: -2 (+1). "After PLAN's consolidation: ... P-148's built part out, INDEX and HELD brought up to date".
- `af3a2c6321` 2026-10-16 19:19: -2. "HELD, PLAN, BOOT.md: the two held rules now in the skill".
- `cab96d954b` 2026-10-17 10:57: -2. "HELD: the open point resolved by the curator's yes".
- `e8b8fcd75f` 2026-10-17 10:58: -2. "HELD: the brief-first point written into the coordinator skill, its line removed".
- `a5e8005999` 2026-10-19 22:25: -16 (+1). "Haiku post-mortem, fix D.1.3: the held list's answered points out, the 20:14 point sorted". Body: "The seven points of 2026-10-16 that were answered by 12:38 UTC on 2026-10-17 ... are deleted; ... the 00:22 page comment of 2026-10-13 is removed as settled ... The 19:57 rule stays until the skill writer has it."
- `33ee7b6746` 2026-10-20 04:13: -4. "Boot note: climb batch 19's landing steps done; held list: the cleaning rule built".
- `2f9d9b6937` 2026-10-20 12:01: -2. "Held list: the two commit rules are in the coordinator skill (1130effc7)".
- `bc4ba9c99e` 2026-11-03 18:11: -80 (+1). "Held list and boot note brought in line with the closing docket of 2026-11-03". Body: "The held list: 66 lines struck that the docket, section 4, finds landed in the skills or settled, each by the commit it names ... The four sections that emptied lost their headings. Kept whole: every line the docket keeps open or whose open half it names ... In 'Smaller items he still owns', row 346 is struck from its line".
- `1732c36710` 2026-11-16 20:52: -245 (+0). "Held list cut to the lines that are still owed: 174 lines whose point reached its home leave it, 87 stay word for word; boot note: the cut and what the kept lines hold against the skills". (Size 143,152 characters before, 62,972 after.)

Single-line removals inside edits (for example `36f7db77c4` 2026-10-15, "P-148 built in the skills ...; its held line closed", -1) are not listed.

### The list's size

Characters, `git show <commit>:explorations/coordinator/HELD.md | wc -m`, at the first commit of each week (weeks from Monday 2026-10-12):

| Week | Commit | Date and time | Characters | Lines |
|---|---|---|---|---|
| 10-12 | `cc3e59618a` | 10-12 21:07 | 14,398 | 109 |
| 10-19 | `a5e8005999` | 10-19 22:25 (after its -16) | 9,080 | 71 |
| 10-26 | `a457844c19` | 10-27 07:15 | 18,031 | 111 |
| 11-02 | `dc571c1f37` | 11-02 00:30 | 46,081 | 191 |
| 11-09 | `b8b6bb0041` | 11-09 13:33 | 88,515 | 342 |
| 11-16 | `099c0ba18b` | 11-16 00:45 | 112,978 | 387 |
| 11-23 | `c3dbe514d7` | 11-23 08:38 | 79,725 | 228 |

Also: 143,152 characters just before `1732c36710` (2026-11-16 20:52); 62,972 just after; today 83,940 characters, 241 lines; 266 commits touch `HELD.md`.

## 5. Each time the curator and the coordinator worked through the list together

Found from the transcript, commit subjects and the post-mortem files. Where no closing word was found, none is given.

1. **2026-09-20 13:51 to 15:40.** The first run: items 1 to at least 18 (`restate-and-hold.md`: "items 5 through at least 18, not restarted per 'hold'"), five "hold"s. At 15:33:19 he closes the reading: "I guess this marks the end of our wall of text spiral. ... Can you confirm that I have materially responded to all relevant parts of your replies? And nothing open is left dangling." At 15:40:27: "you seem to have a hang of it. The back references to items in, in this list meant literally nothing to me." (`restate-and-hold.md`: "the list was not then worked one item per message".)
2. **2026-09-21 00:38 to 02:51.** The coordinator puts held items to him as decisions; his words: 00:38 "Insufficient context for me to make informed decision." 01:14 "Wrong move. Delaying and dropping a ball on this might bite yes. Read the review behind them!" Commits `d31b2b9848` (02:26) and `581a295105` (02:36) record his approvals on the list.
3. **2026-09-23 06:13.** On the re-approval rows (a list kept beside the held list): "I should just finish these one by one before we start uh, batch four." 06:43: "Please hold."
4. **2026-10-12 15:3x to 16:00** (`HELD.md` lines 66 to 83 in "Held in chat (2026-10-12)": 15:32 lists not tables; 15:33 numbers as K or M; 15:38 silence during a batch; 15:40 "Noted"; 15:42 the line after each process start; 15:44 restate and hold; 15:53, 15:57, 15:58, 16:00). `sources.md` cites these lines as HELD 66 to 83. His words at 16:33:33, the end of this stretch: "I'm reacting still to your previous message ... I'll let you write your persist stuff and compact you." The compaction summary is at 16:38.
5. **2026-10-13** (`0528e963bb`, 20:06): the new skill's step 12 closes 93 lines, "at his word" for the wip-branch line. His words: 09:16 and 11:40 rulings (`sources.md` line 32), and 16:11:49 above.
6. **2026-10-14 to 10-19**: commits `701b7daaca`, `cab96d954b` (its subject: "resolved by the curator's yes"), `a5e8005999` close lines the curator answered; he approved rules from the list in chat at 23:32 on 2026-10-19 (`sources.md` lines 129 to 130).
7. **2026-11-02 to 11-03: the closing docket.** `closing-docket-2026-11-03.md`: "63 items: 24 need your word, 14 need the coordinator's work, 4 need a workflow run, 21 need nothing (done or stale). They cover 88 lines of the held list, the open points of the two post-mortems, PLAN's consolidation line, and the open fragments of the boot note." His words: 2026-11-02 23:50:03 (206 characters): "I'm not hearing anything from my held list ... like consolidation/review of the PLAN.md — why? Not mentioned in the BOOT.md so not on your radar, I guess? I want to close the things from post mortem properly." 11-03 07:12: "go through the closing docket, it is not to run the next batch until we get our house in order." 17:58: "It is quite a long list for me, and like we need to understand what purpose of some of the things are." 18:30: "for 8 working rules I can just say defaults and everything is replied. If something bothers me, I should name it." (and, in the same message, that "me just saying apply defaults is again missing the purpose of the review.") 18:41: "reuse the existing artifact and trim the old parts that have landed." Result: `bc4ba9c99e` (66 lines struck).
8. **2026-11-05 to 11-06**: page comments on the drafts page and the fortress-repo page were held and answered (`HELD.md` sections 11-05 and 11-06; commits such as `e95b662d78`, `b5ac902644`, `8f8ced16a7` "his three comments on draft 14 and his LGTM on the drafts page"). His words at the end of the 11-07 read: "Read all. LGTM" (23:24, `sources.md` lines 410, 414).
9. **2026-11-16 20:41 to 20:52**: the curator's remark (20:41:22, quoted above) and the cut `1732c36710` (174 lines out, 87 kept). No closing word of his on the cut found.
10. **2026-11-22 to 2026-11-23**: "Held from his page comments on the page of `fortress-repo` changes, version 32" (`HELD.md` lines 18 to 32): "His reading, in chat at 08:3x UTC on 11-23: 'I read until, but not including change 42.' He sent no comment to Claude, 'to batch your reading'." At 11:19 he asks for the procedure for processing the list.

## 6. Drafts 77 to 79 on the page of skill drafts

Source: `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/skill-drafts-page/page-2.html`, section `id="g4"` ("Drafts 77 to 79 · three passages of SKILL.md", heading "Each line of the held list names its exit"). Its opening: "For the curator. Each point that the curator raises is written with the event that settles it, and leaves the held list when that event comes. The list stops growing as a diary, and the coordinator reads less at each boot." All three are "Proposed text, not landed".

**Draft 77.** "Each line of the held list carries its exit." `SKILL.md`, glossary, "held list", line 68.

- New text: "held list : explorations/coordinator/HELD.md, the points that the curator raised while reading, one line each, with the event that settles it." (Added: "with the event that settles it".)
- Current text: "... the points that the curator raised while reading, one line each."
- Reason: "A line had no stated way off the list, apart from a trim. The definition now says that each line carries its exit."

**Draft 78.** "A point is written with its exit." `SKILL.md`, "While the curator reads turn by turn", first bullet, line 188.

- New text: "Write each point on the held list, one line in your words, with the UTC time of its message and its exit ("The record: what goes where")."
- Current text: "Write each point on the held list, one line in your words, with the UTC time of its message."
- Reason: "The exit is named when the line is written, since only then is it clear what the point asks for. The rule on exits is stated once, in the record's section."

**Draft 79.** "A line leaves the held list when its exit comes." `SKILL.md`, "The record: what goes where", the line for the held list, line 220.

- New text: "The held list. Each line names its exit: the event that settles its point, such as a POSITIONS entry, a commit or your answer in chat. Take a line off at the first rewrite of the boot note after its exit: git and the transcript keep its words. If a line's exit has not come after two batch landings, put it to the curator as a question, or drop it with one line to the curator. A line whose exit is a rule in a skill stays until its skill holds the rule. The last section, the smaller items that the curator owns, takes the same rules."
- Current text: "The held list. Its last section holds the smaller items that the curator owns."
- Reason: "The list is read at every boot, 81,000 characters, and a line left it only at a trim. A line mixed the curator's words, the coordinator's reading and the work started, so nobody could see at a glance that it was done. Now each line leaves when the event that settles it comes, and a rule for a skill waits for its skill as before. The list gives up being a diary of the curator's points."
- Beside the skill, once the curator says yes: "`explorations/coordinator/HELD.md`: its header comment states the exit rule; each line that stays, in the last section too, gets its exit, or leaves now if its exit has come."

References on the page: "Drafts 70 to 79: the skill writer's drafts of 23 November 2026 ... drafts 77 to 79, B4.1 to B4.3." "The ground of both changes: the Fable review of the process's dead ends, `explorations/reviews/process-dead-ends-2026-11-23.md`, part B, commit `021521d809`." "Every current text and line number: the coordinator skill at `e7afa05020`."

The page's glossary entry for "held list" (not in `SKILL.md`): "List of the points that the curator raises while reading turn by turn, and of the rules that the curator states, kept until the coordinator acts on them or they enter a skill." The page's entry for "exit, of a line of the held list": "Event that settles the line's point, such as a POSITIONS entry, a commit or the coordinator's answer in chat, which drafts 77 to 79 propose."
