<!-- How the curator reviewed the `fortress-repo` skill from 2026-10-05 to 2026-10-08, in 68 page comments and the chat around them: six lenses added to the eight on file, the moves from a comment to the process under it, what he restructured, cut and added, what he ruled out, and a profile of instructions for an agent that rewrites the other skills in his style. -->

# How the curator reviews a skill: the style profile

Readers: the coordinating session, then the curator, then a workflow that rewrites the project skills in his review style.

This note extends `explorations/reviews/skills-review-lenses.md`. That note holds eight lenses drawn from the comments of 2026-10-05 and 2026-10-06. This note adds the comments of 2026-10-08, the chat of 2026-10-07 and 2026-10-08, and what the comments changed beyond the text.

## 0. Scope, sources and terms

The question: how does the curator review a skill, so that an agent can apply it to the other skills?

Sources, all read for this note:

- The coordinating session's transcript, by timestamp, from 2026-10-05 to 2026-10-08. From it: every comment the curator wrote on the review page (read through the comment tool), the coordinator's replies on the threads, and the curator's own chat messages.
- `.claude/skills/fortress-repo/references/sources.md`: one provenance line per change.
- `git log` of `.claude/skills/` from 2026-10-05: 82 commits, 3 of them the curator's own (2026-10-07).
- The POSITIONS entry on how the skills are written. Find it with `grep -n 'written for a reader new to the repository' explorations/coordinator/POSITIONS.md`. Its bold title is the record's handle for the entry. It is not the curator's wording.

Times are UTC, as the review page stamps them.

Terms:

- **Curator**: the person who directs the restoration.
- **Skill**: a folder under `.claude/skills/`. Its `SKILL.md` is read by every agent that loads it. Its parts, in `references/`, are loaded when a task reaches them.
- **Review page**: a published page that shows the skill's text. The curator selects a passage and writes a **comment**. A **thread** is the chain of comments and replies on one passage.
- **Coordinator**: the session the curator talks to. It answered the threads and relayed his words to the writer.
- **Writer**: an agent that edits the skill files in the coordinator's place, from a clean context.
- **Brief**: the instructions an agent is launched with.
- **Record**: the files under `explorations/` that hold what the project has established. FACTS holds facts. POSITIONS holds the curator's decisions. The gap ledger holds known defects, one row each. INDEX has one line for each note.
- **Lens**: a question the curator asks of a sentence, a rule or a list.
- **Move**: a change in how the work is done, not in what a skill says. A comment on wording led to it.
- **ASD-STE100**: Simplified Technical English, a standard for writing technical manuals. The curator wants the skills "about halfway" toward it.
- **Building** and **exploring**: the two modes of an agent's work. Building carries out the brief. Exploring takes up a question that the record does not settle.
- **Batch**: a run of the batch workflow script, which launches many workers in parallel. A **rung worker** fixes one item. A **skeptic** checks another worker's fix. The **gate** is the full check before a tree lands.
- **Archaeology worker**: a read-only agent that finds from the record and the transcripts what workers actually did.
- **Decision not taken**: a question for the curator that an agent lists in its report, with the alternatives, instead of choosing.

What was read:

- 68 comments of the curator in 35 threads. By day: 18 comments in 9 threads on 2026-10-05, 34 in 18 on 2026-10-06, none on 2026-10-07, 16 in 9 on 2026-10-08. All 35 threads that the page sent to the session were read.
- 78 chat messages of the curator in the same window (a few are only "Boot up" or a usage paste). Most bear on the skills or on the process under them. They are cited by date.

## 1. The kinds of comment on the text

The eight lenses stand. Part A adds later cases to some of them. Part B adds six lenses. Part C says how the comments are worded and what each wording asks for.

### A. The eight lenses, later cases

**Lens 1. Can a newcomer decode every word?**

- 2026-10-08, comment on two rules: "These two points now referred to 'run' without it being defined". Fix: plain words ("a command's output", "a test", "a build or a Fortress program may be running"). No glossary entry, because the noun has no one meaning in the skill. His rule from the same comment: a term that recurs with a specialist meaning goes in the glossary. A term that does not recur is replaced by plain words.
- 2026-10-08, chat on `records.md`: "when you are referring to findings ... what is the trigger to escalated to the level of finding?" Fix: "finding" defined in the part. A found file to edit is not a finding.
- 2026-10-07, chat: the word "record" must be defined "at the beginning of the Fortress repo when we are defining the terms". Fix: record, building and exploring joined the glossary.
- Form of a glossary entry: he rewrote it himself on 2026-10-07 (three commits). Bold term. Definition on the next line after ": ". It opens with a noun phrase and has no article. On 2026-10-08 he said of another page: "when I open my local Oxford dictionary, it doesn't say oh, the revival. It just says revival."

**Lens 2. Can the agent act on it?**

- 2026-10-07, chat, on a worker that meets a conflict. He asked for clear instructions on when it is "free to decide", when it needs to "gather more information", when to record a contradiction for the curator's decision, and when it is carrying out a decision and must not reopen (his word: relitigate) it "unless it discovers a genuinely new contradicting information". Fix: four situations, written as the exploring part.
- 2026-10-07, chat: "I as a person hate phrasing like, do not question a decision again unless you find new record." Fix: a positive instruction. Question a decision when your evidence is evidence that the decision did not use.

**Lens 3. Does it agree with the rest of the skill and with his positions?**

- 2026-10-07, chat, on a proposed wording for source conflicts: "I don't want to give a blank yes to your option one." He agreed with the idea. He wanted to see the wording first, "so that I don't blindly agree with something that would need revision later". The mechanism he named stays: contradictions are surfaced, and the curator rules after research.

**Lens 4. Does the reader need it here? Which layer owns it?**

- 2026-10-08, thread on the record's other files: the list held `PLAN.md` and a handover. Both are the coordinator's. The coordinator skill already names them. Dropped.
- 2026-10-08, thread on the edit-collision rule (a rule that let an agent edit the shared record files only if its brief asked, because simultaneous edits collide): "organizing the situation so that the worker can safely write into this is coordinator's problem or script problem". The batch script already gives each worker its own tree and its own block of ledger rows. Dropped.
- 2026-10-06, thread on the checker count: "our point when we were creating these skills was to keep the workflow running part out of the skill". The whole part `checker-measurements.md` went.
- 2026-10-05, chat: the roles of the batch (rung worker, skeptic, gate committer) were left out of the skill on purpose. Whoever writes a workflow from the skill is then not steered toward ours.
- 2026-10-07, chat: a worker must never ask whether to load the coordinator skill. The dependency runs one way: the coordinator knows the skill, the skill does not know the coordinator.

**Lens 5. Is the reason there where the rule alone could be misjudged?**

- 2026-10-06: the coordinator first answered "why not pipe `ant` (the build tool) through `tail`" from memory. The batch script says something else. The coordinator corrected itself on the thread and the rule took the script's reason. The lesson: a reason comes from the source, never from memory.

**Lens 6. Is it in the register?**

- 2026-10-05, chat: the section of rules showed "an essayist shorthand". He called some sentences "vacuous" or "non-actionable", and said they "are waste". This is where ASD-STE100 enters, at about 50 percent.
- 2026-10-05, threads on the opening: "I told you not to write an essay … but you wrote a paragraph. Can't a sentence do the job?" And: "just mention `walk` was default and what's it does with few adjectives and nouns, not another sentence". An addition is a few words in the sentence that exists. It is not a new sentence.
- 2026-10-05: "No compound; try simpler language, use repo." The quotes around a defined term "disturb": the position of the sentence already tells the reader it is a definition.
- 2026-10-06, thread on the report rule: after a rewrite that grew, "now looks like a regression. Can ASD-STE100 lens help?" The next version was short, with one instruction per sentence: "See? that is perfect. Now I can understand it as well." Another thread on the same day: "I'm hoping for the same length or shorter."
- 2026-10-05: he asked for "globally consistent wording", after the coordinator's rewrites of one sentence used different words from the sentences around it.
- 2026-10-07, chat: "Name the way that changes nothing. Maybe the workers would understand you, but I do not."
- 2026-10-07, chat: state rules positively.

**Lens 7. Does the structure follow the reader?**

- 2026-10-06 19:13, thread: the parts list should follow the order in which work in the repository meets things.
- 2026-10-07, chat: terms first, then the description of how the thing works, then the short procedure. He called the ASD-STE100 rewrite "a structural rewrite because you need to establish the term and reorder the things".
- 2026-10-08 06:21, chat on `records.md`: the section on what a report holds was last. He said: "this is something that we should be opening with". At 11:18 on 2026-10-08 he said of the record section: "I felt like it was in a reverse order."
- 2026-10-08, thread on "Starting a task": "I dislike the obvious points one and four". Two of four steps were what every agent does already. The list became two sentences.

**Lens 8. Where does this come from, and does its purpose still hold?**

- 2026-10-07, chat on `sources.md`: "I don't want that file to be littered with metadata." Provenance lives in `sources.md` and nowhere else.
- 2026-10-08, thread on the report rule: "I just want to understand whether we have dropped it because it is not necessary" and "This is not necessarily an edit." The answer was a history: the distinction moved into `records.md`. No edit.
- 2026-10-08, thread on a sentence about 2012 READMEs: "Why would it be important?" The origin was an old `CLAUDE.md` warning. The skill gives current steps, so the sentence changed nothing a worker does. Dropped.

### B. Six new lenses

**Lens 9. Does the rule fire only when it should?**

He reads a rule as an agent would, with nothing else in context, and asks what the agent will start doing.

- 2026-10-05, on "never wiping caches": "I worry that we have made a dogma of this point." Fix: the rule says what was measured. A missed recompile is fixed by recompiling. The three cases where caches are deleted are named. He later asked for the whole section to be rewritten, not patched. It now sits under the heading Building in the build part.
- 2026-10-06, on "look for its result on record": "an open license to wonder aimlessly through the repository". Fix: reuse what the brief cites and what your own work ran. Take the starting tree as green. Run your own tests, and more only where your edit reaches.
- 2026-10-08, on "Check every claim against a primary source": "this looks quite dangerous to me. I think it might trigger agents on to go on fishing expeditions". Fix: cite a source for each claim that you write. The brief and the record count as sources. The purpose stays: no claim from memory, because Fortress is not in an agent's training.

Test: read the rule literally. What search or check does it start? Is it bounded? Does it apply in building, or only in exploring?

**Lens 10. Is there evidence of the failure, and does the rule change what any agent does?**

- 2026-10-08, thread on "Edit the following only if your brief asks you to": the rule warned about "something that never happened". "Unless you have evidence contradicting this, I am ruling against" it. The whole rule went.
- 2026-10-07, chat, on the rule "If your brief or this skill says how to do a thing, do it that way": "writing a rule that changes nothing is pure waste of context token". Dropped.
- 2026-10-06, on the definition of "brief": "Are we giving anywhere instructions that should not be followed. I feel like this is not needed." Dropped.

Test: name an agent that acts differently without the sentence. Name the record or transcript that shows the failure. If there is neither, cut it.

**Lens 11. Does the sentence point back, or say where the text came from?**

- 2026-10-08: "This back reference seems like waste of tokens." It was an opening sentence in a part that repeated what `SKILL.md` already says. Fix: every part's opening checked. One more pointer to `SKILL.md` went.
- 2026-10-08: "The 'from earlier briefs' it's just waste." The heading "Examples from earlier briefs" became "Examples:".
- 2026-10-06: "Is the repeated file reference to records necessary here we established it two bullet points ago". All five pointers in the glossary went, because the parts list already routes each subject.

Test: does the phrase tell the reader what to do, or a fact needed to do it? Words about history, origin or where else a thing is belong in `sources.md` or nowhere.

**Lens 12. Can I hold it in my head? Name the concept, then give the few steps.**

- 2026-10-07, chat, on the first exploring section: "It reads like if else spaghetti code. Like I cannot hold this in my working memory." He asked for "some kind of abstraction a concept that encapsulates something and then refer to it". Fix: two modes defined once in the opening (building, exploring). The trigger to switch is in `SKILL.md`. The procedure is a part loaded when the trigger fires. A worker's own choice has four conditions.
- 2026-10-06, on the test suite: a comparison to the testing he knows (LLVM's `lit` for Swift) helps him place it. Fix: the glossary entry for the harness (the suites' own test runner) says so.
- 2026-10-05, on `walk`: it is "the pun-ish counterpoint to `run`" and the shell's default command. Fix: said in one sentence.
- 2026-10-08, thread on the record's files: the skill's purpose is "to take all the pre-training knowledge your agents have and guide them through this in context, learning exercise to get a correct mental model of the fortress as a language". Fix: a quiz of a fresh session, a distillation audit, and a section "Fortress as a language" in the opening of `SKILL.md`.

Test: if a part is a list of do's and don'ts that a reader must hold at once, find the concept they come from. Define it. Write the do's under it. Where an analogy to a system the agent knows helps, give it, and say where it breaks.

**Lens 13. Does the skill hold the knowledge, or only point to where it is?**

- 2026-10-08, thread on the record's other files: "I don't think like just mentioning that such a file exists will lead to agents to examine them at the right point in time." Fix: the section was dropped. INDEX serves a search.
- Same thread, next comment: "if we keep just a reference to a file … then there needs to be instruction like a trigger when to open it" and a way to read "in a economical way" from large files. Fix: every remaining pointer to a large note has a trigger and a narrow read, such as a query for one row. The coordinator's check found four pointers that had no trigger or no narrow read.
- Same thread: "we should surface that information in a skill" when daily work needs it. Fix: the distillation audit listed 16 items that daily work needs and the parts lack. The coordinator held two back, and the writer added the rest to the right parts. The skill grew by about 15K characters.

Test: for each pointer, when does the agent open it, and how does it read only what it needs? If neither is there, move the knowledge into the part loaded at that moment, or drop the pointer.

**Lens 14. Does it say how to work with the thing, and what it costs?**

- 2026-10-08, on the ledger section: "it doesn't tell me anything about how to work with this" and "this section should probably tell the agents how to deal with it safely". Fix: the section says the ledger is about 400K tokens whole and that one row can be 12K characters. It forbids reading the ledger whole or printing whole matching lines. A new query, `ledger-find`, lists matching rows briefly.
- Same thread, later: "the structure of how to write a proper report wasn't defined anywhere". The ledger has no row template. Fix: not a text fix. It started the ledger work in section 2.
- 2026-10-08, chat: a listing should say "the file size so that you know before you decide whether it's safe to read it all".

Test: for each file or tool the skill names, say how big it is, how an agent finds one entry, how it adds one, and what form an entry takes.

### C. How a comment is worded, and what it asks for

- A proposal in his words. Use it nearly as given. On 2026-10-05 he wrote "Fortress language was originally built by the team at Sun Labs from 2003 to 2012 and left unfinished. This repository is trying to finish their vision from the…" and then: "That's much better, terser and more precise, right? You can change it now."
- A worry ("I worry", "looks dangerous"). Find the failure the sentence could cause. Fix its scope (lens 9).
- A question about origin ("What does this come from?", "Why would it be important?"). It is not yet a request to change. Answer from the source. He then decides. Answers often end in a reworded rule or a deletion (lens 8).
- A report of confusion ("As a human reading this, I'm confused"). The sentence is wrong for a newcomer even if it is true (lenses 1 and 12).
- A taste judgement ("I dislike", "waste of tokens"). Act at once. Do not ask for a reason. He gives it in the same comment when the fix is not clear.
- An observation with no edit ("This is not necessarily an edit"). Answer with the history. Do not change the text.
- He marks a problem area, not a sentence. His stated method (2026-10-05): "the rewrite is usually something more … on a paragraph level or within a section of the skill level". "You or the writer need to think globally about the skill, not locally about the sentence that I am pointing at."
- Many comments are dictated on a phone and carry transcription errors. Meaning comes from the coordinator's reading and his later replies.

## 2. The moves beyond the text

Each move: what triggered it, and what it became.

**M1. A rewrite of the section, not a patch of the line.**

- Trigger: the cache comment (2026-10-05 04:09) and then the opening's sentences. The "team" sentence took six coordinator rewrites on one thread. The walk sentence took seven across four threads, in two hours.
- Became: on 2026-10-05 05:52 he said "Please rewrite the section since you already know it's wrong. I don't want to be doing line level editing when you can come up with a good version." The build section was rewritten whole. The POSITIONS entry on the skills gained: a comment marks a problem area, and the fix is made at the level of its paragraph or section.

**M2. A separate writer.**

- Trigger: the coordinator's context (about 600K tokens, full of the record in earlier models' shorthand) wrote worse sentences. 2026-10-05 05:02: "Do I need to compact you, to recover your writing skills?" and 05:09 "That's it, I've had it with you." He compacted it. He asked for a backup: a writer from a clean context, so that the coordinator briefs and does not interpret his words.
- Became: 2026-10-06 19:15, a writer for the whole skill. 2026-10-07 03:56, a standing writer with a standing order: ASD-STE100, define a term before use, state rules positively, do not take the register of what you read. His word: the writer's job is "that of an exorcist", exorcising "the sins of earlier models, speaking in tongues". 2026-10-08 04:26, a headless session on the one-hour prompt cache (`explorations/coordinator/tools/skill-writer.sh`, brief in `skill-writer-brief.md`). He accepted the double cost of writing the cache ("I think it would be worth it"). 2026-10-08 08:19: past one hour, start a fresh writer. The coordinator makes no skill edit itself.

**M3. Archaeology of what workers actually did.**

- Trigger: 2026-10-05 05:47, after the cache comment: "when we have discovered a better way to do something, but most of the agents are working around some issue, we need to encode the best practice into the skill". This "requires a bit more data-driven approach".
- Became: a rule in the POSITIONS entry (where a practice is in question, an archaeology worker checks). Then: the worker-decisions archaeology (2026-10-07) for the conflict procedure; the pre-training quiz (a fresh session describes Fortress from its training alone, and the answers are graded) and the distillation audit (a reader compares the notes with the skill's parts and lists what daily work needs and the parts lack), both 2026-10-08; the ledger archaeology, the context study (what batch 10's workers read before their first edit) and the testing-practices archaeology, all 2026-10-08. He also asked the coordinator to check INDEX for earlier notes before a launch: "Didn't we run that once already?" (2026-10-08 11:29).

**M4. A cold read, and routing.**

- Trigger: 2026-10-05 05:54, he asked for a fresh worker "specifically with the task of flagging consequences of certain descriptions that are unclear to them because they lack the correct contents", with scenarios that contain traps.
- Became: the cold read of `fortress-repo` by readers given only the skill. It found rules that could send an agent wrong, such as the one on the script `env.sh`, which deletes files that running jobs use. They were fixed the same day. He then saw that testing traps is pointless "if they don't know when to trigger those". The skill `remote-container` was split by who needs it. What every worker needs of a Claude Code session (the Bash timeout, long commands, waits) moved to `session.md` in `fortress-repo`. The routing descriptions were optimized again. He asked whether a rename was needed ("I don't want to trigger another round of rename cascade") before he accepted one.

**M5. A rename at the source: "stop" to "points to report".**

- Trigger: 2026-10-06 17:13: the word "stop" read as a condition that stops the worker. His second comment: the coordinator had quoted a POSITIONS title as his own words. "That is definitely not my language."
- Became: the word is gone from `fortress-repo` and the `coordinator` skill. The replacement is "points to report": the kinds of change or finding that a brief names for his review. The batch script and the record still say "stop". That edit is owed with the next script edit. POSITIONS now says that a bold title is the record's handle, never quoted to him as his words.

**M6. The boundary between a skill and the workflow.**

- Trigger: 2026-10-06 18:02, on a line that named the checker count. "We are done with the skill we are going back to optimizing the workflow."
- Became: the part on measurements left `fortress-repo`. The `coordinator` skill names them and points to the workflow script. The role-neutral rule (lens 4) stands.

**M7. From comment by comment to lenses.**

- Trigger: 2026-10-06 19:13: "I do not want to go comment by comment because I think we were touching each every line." He asked for an estimate and for a characterization of what he was doing. The coordinator estimated about 4 hours for the 8K characters of `SKILL.md` and 60 hours or more for the rest at that pace.
- Became: the lenses note, and a writer pass over every part (about 366K tokens, by the coordinator's count). The POSITIONS entry says his review goes by the lenses, applied to a whole skill at once and then read by him. A fault of that pass: it dropped two defaults that decide what an agent does when its brief is silent. The coordinator restored them the same evening. A cut that removes a default changes meaning.

**M8. Register is structure.**

- Trigger: 2026-10-05 06:41 (tone), then 2026-10-07 03:37 ("spaghetti").
- Became: the register in POSITIONS, the writer's standing order, and the two modes with `exploring.md`. His words (2026-10-07 04:01): "it is not just a tone … a structural rewrite because you need to establish the term and reorder the things".

**M9. The conflict procedure and the executive assistant.**

- Trigger: 2026-10-07 02:54, a proposed wording for "two sources disagree" that did not read like ASD-STE100 to him. He explained what a worker should do in each situation and asked what the batch workers actually did.
- Became: the worker-decisions archaeology. The four conditions for a worker's own choice. The form of a decision not taken. On 2026-10-07 04:52, three minor questions from the writer: "stop bothering me with bullshit … Can't you just make good judgment on those?" POSITIONS now says the coordinator settles a writer's minor decisions from the record, as his executive assistant. He is asked only where a rule would change its meaning or a new rule would enter.

**M10. A problem found while reading, recorded and not fixed in the skill.**

- Trigger: 2026-10-07 04:18, reading about the cost of the batch: "Why does fixing one small thing cost as much as the original work?" He suggested that the skeptic might make the fix itself.
- Became: a recorded question for the batch redesign. On 2026-10-08 10:56 he restated the order: finish the skills, then redesign the batch, then climb again.

**M11. Record keeping: from a ledger comment to a consolidation.**

- Trigger: 2026-10-08 05:46, on the ledger section. 06:21, in chat, on the report section: he does not want "a write only repository where we are just searching with a flashlight"; "we are not building like a concentrated form of our learnings".
- Became, in order: the `ledger-find` query and the safe-reading rule (06:00); a ledger archaeology on how rows were written and read (06:31); he closed the thread to continue in chat; the context study of batch 10 (08:57); the ledger's form in POSITIONS and the tool `ledger.py` (09:26 to 10:13); a measurement of the record's growth per commit and a check of the ledger against the batch records (09:54, 09:56); a chronology of what the revival changed in Fortress itself, and a story of the revival (10:08, 10:22); a testing-practices archaeology. His central question on 2026-10-08 11:05: whether the workers' constant relearning of information is good or bad. The shape of the ledger rewrite: one step splits the rows into groups and finds duplicates, several workers rewrite one group each, one step consolidates.
- Next, by his words (2026-10-08 11:18): the testing sections. "We will be commissioning reports on the best practices that were discovered and rediscovered and relearned a thousand times", each to become skill text or a tool.

**M12. The review channel.**

- Trigger: 2026-10-08 04:35, he reads on a phone, without the chat.
- Became: the answer goes on the thread. The thread stays open: he resolves it. One line in chat, or nothing. When a thread grows too long, he moves its points to chat and closes it (06:30, 06:47). This holds only while he says he is on a phone (`talking.md` in the `coordinator` skill).

## 3. Structure: what he reordered, cut and added

### Reordered or restructured

- The parts list follows the order in which work meets things (2026-10-06).
- The `area-` prefix of part names dropped (2026-10-06). The parts are `interpreter.md`, `compiler.md`, `library.md`, `specification.md` and `records.md`. The skill says that building happens in one area at a time, which is why the parts split by area.
- `SKILL.md` opens with what the repository is, `walk`, the paths and the switch-over (2026-10-05). Then the glossary as a definition list. Then "Fortress as a language", chosen for the opening because "almost everybody reads it" (2026-10-08). Then the record, the trigger to explore, the rules grouped by subject, and the parts list.
- `SKILL.md` holds concepts and triggers. A procedure that few agents need sits in a part, loaded when the trigger fires (`exploring.md`).
- In each part (2026-10-07, the structure comment as the coordinator relayed it, which he accepted): terms first, a description before the instructions, one place for each topic. Facts before rules. A warning before its command. A tool described before its commands.
- `records.md` opens with what a report holds and defines "finding" (2026-10-08). Its old order put the report last.
- "Starting a task" became two sentences under "The parts": load the parts, then run the query, because the parts give the words to read what the query prints.

### Cut whole

- The definition of "brief", the rule on `HANDOVER.md` and uploaded ZIP files, the rule on model identifiers, the rule to follow the brief and the skill (lenses 4 and 10).
- The term "stop", and the five pointers inside the glossary (lenses 1 and 11).
- Slogan lead-ins that copied POSITIONS titles into the skill (lens 6).
- The part `checker-measurements.md` and its lines in other parts (lens 4).
- The section on the record's other files (lens 13).
- The rule on which records an agent may edit (lens 10).
- The back reference in the opening of a part, and "from earlier briefs" (lens 11).
- Steps 1 and 4 of "Starting a task" (lens 7).
- The list of source types in the test-first rule: it now says "source code" (2026-10-06).

### Added

He asked for these, or approved them in a thread:

- The meaning of "the team", `walk`, and the switch-over, each in one sentence where the word first occurs (2026-10-05).
- The record defined in the glossary; building and exploring defined there; a trigger and a part for exploring (2026-10-07).
- One clause of reason for the `tail` rule and for the scratch rule, taken from the sources (2026-10-06).
- The comparison of the harness to `lit` (2026-10-06).
- "Fortress as a language" (2026-10-08): 11 points that correct pre-training. He chose its place. He had read the draft only as far as its fourth point when he wrote at 06:47.
- The safe reading of the ledger (2026-10-08).
- The knowledge that the distillation audit listed, in the parts (2026-10-08): 16 items, two held back.

His size rule: a rewrite is never longer than what it replaces ("same length or shorter"). Content that the audit or a decision adds is the exception, and it is listed apart.

## 4. What he rejected or ruled out, and why

- A rule with no evidence that the failure ever happened (the edit-collision rule). His test: "unless you have evidence contradicting this".
- A rule that changes nothing (follow the brief and the skill). It costs context and teaches nothing.
- A rule that overreaches: never wipe, verify every claim, look for results on record. Each is a dogma or a "fishing expedition" when read literally.
- Repeating what the system prompt, the reader's own nature or another part already holds (model identifiers, what a brief is, pointers in the glossary).
- Slogans and essays: a sentence the worker cannot act on, and a paragraph where a sentence does the job.
- Negative and lawyerly phrasing: "do not question again unless …". It "reads like if else spaghetti code".
- The word "stop", and any quote of a POSITIONS title as his words.
- Batch roles and the workflow's measurements in the skill. The skill stays role-neutral. The workflow script and the `coordinator` skill hold them.
- The coordinator skill's content in `fortress-repo`. A worker must not need to ask whether to load it.
- Metadata in the skill files. Provenance goes in `sources.md`.
- Pointers to large notes with no trigger and no narrow way to read them.
- Questions to him that he cannot answer without context. On 2026-10-07 he could not answer the writer's three questions: "These seem very minor. And without context, I don't know what they mean." On 2026-10-08 he asked what "D6" and "P1" were. He wants minor questions settled from the record, and every label explained.
- "Go back to building" rules for what a worker builds on while its question waits. He left them unsaid (2026-10-07): it is case by case, and a reversible choice takes the path of least resistance. An `XXX` test for a conflict between text and code is also out: it belongs to repair work.
- Renames that start a cascade. He asked whether `cloud-container` was "more precise" than `remote-container` before he agreed.
- Reading the skills only with the coordinator's eyes. The coordinator's context holds the record and its shorthand. His eyes are the test.

## 5. The profile: instructions for an agent that rewrites a skill

Use the curator's terms. Apply the fourteen lenses (the eight on file, and lenses 9 to 14 above) to the whole skill at once. Do not wait for a comment.

### Set the reader and the register

1. The reader is a novice to the repository, which every agent is. The curator judges with human eyes, often on a phone, without the record in mind. Explain every internal reference or remove it. Work on the whole skill at once: a comment marks a problem area, so fix at the level of the paragraph or the section.
2. Write about halfway toward ASD-STE100. Describe first, in short sentences. Then give the procedure, with one instruction in each sentence, in the imperative, with the condition first.
3. State rules positively. Use "do not" only where no positive instruction says the same.
4. Keep the small words. Do not fold a list into a sentence. Use a pronoun where it is clear.
5. Do not take the register of FACTS, POSITIONS or the notes. Earlier models wrote them in shorthand. Ask of each sentence: can a newcomer follow it without the record?
6. Define a term before you use it. Use one word for one thing. Put a term in the glossary only if it recurs with one meaning. Elsewhere, write plain words. A glossary entry is a bold term, then a line that starts with ": " and a noun phrase with no article.

### What to cut

7. Cut a sentence that says neither what to do nor a fact needed to do it. This covers slogans, essays and sentences that sound clever.
8. Cut a rule that changes no agent's behaviour. Cut a rule that guards against a failure with no trace in the record or the transcripts.
9. Cut what the reader already has: the system prompt, the agent's own nature, another part, the glossary.
10. Cut back references, repeated pointers, openings that restate `SKILL.md`, and words that say where text came from. Provenance goes in `sources.md`, one line for each change, naming its source exactly.
11. Cut what another layer owns: the workflow (roles, measurements), the coordinator (planning, handovers), the batch script (how workers write shared files), the brief.
12. Cut a list of files that has no trigger and no narrow read. Move the knowledge into the part where it is needed, or drop the list.
13. Before you cut a rule, ask what an agent does when its brief is silent. If the rule is a default, keep it. Report the change as a decision not taken.

### What to restructure

14. Order `SKILL.md` as: what the repository is, the glossary, the model of the language, the record, the trigger for each mode, the rules by subject, and the parts list. Order the parts list as work meets the parts.
15. Order a part by what the reader needs first. A report comes before a ledger. Terms come first, then facts, then rules. A warning comes before its command.
16. Replace a do-and-don't list by a concept and a few steps. Name the modes. Put the trigger to switch modes in `SKILL.md` and the procedure in a part.
17. Keep a rule once in `SKILL.md`, with its detail in one part. Use `git grep` to find the other statements of it and make them agree with POSITIONS.
18. Read each rule's origin in `sources.md`. Keep its purpose and state it so that the purpose shows, or drop the rule. Put a reason in one short clause, only where a reader could misjudge a case. Take the reason from the source, never from memory.

### How to rewrite a sentence

19. Use his wording where he gave one. Extend an existing sentence by a few words. Do not add a sentence.
20. A rewrite is never longer than what it replaces. Added knowledge is the exception: list it apart and give its source.
21. Name what happens, not only the name: "the switch-over" comes with what moves and when.
22. For each file or tool the skill names, say its size or cost, when to open it, how to read a part of it, and the form of an entry that the agent writes.
23. Where Fortress differs from what an agent assumes, say so. Give an analogy to a system the agent knows, and the point where the analogy breaks.
24. Check a claim about the code against the code before you write it.

### When to stop and report instead of fixing the text

List each of these as a decision not taken, with the alternatives and a recommendation. Do not settle it in the text.

25. A rule contradicts a POSITIONS entry or another rule, and the record does not say which is right.
26. A word that misleads the reader also lives in the record or the batch script (as "stop" did). Rename it in the skills. List the edits owed elsewhere.
27. You cannot find the origin or the purpose of a rule in `sources.md`, the log or the record. Do not keep it or drop it by guess.
28. A fix needs a fact the skill lacks and the record does not hold. Name the question: an archaeology of what workers did, a quiz of a fresh session, or a check against the code.
29. A practice that workers relearn or work around over and over. The verdict is one of three: skill text, a tool, or nothing. It needs an archaeology first.
30. A text would have to describe a tool or form that does not exist yet, such as a ledger row template.
31. A problem that lies in the workflow's shape, such as the cost of a second round of review. Record it as a question for the batch redesign. Do not touch the skill.
32. A change of meaning, or a new rule. Show the proposed wording first. Settle small choices from the record, as his executive assistant. Ask him only about a rule that would change its meaning or a new rule.

### How to ask him

33. One question each. Alternatives named. A recommendation. Every label defined in plain words. "D6" and "P1" meant nothing to him cold, and a line that says a question "is still open" without saying which drew "???" (2026-10-07).
34. Keep answers short. Move a long matter to chat.

### What to expect in the other parts and skills

These are extrapolations, not observations (section 6).

- The area parts, tests and the gate: undefined terms (lens 1), practices that workers relearn (lens 14, rule 29), pointers to big notes (lens 13). He said on 2026-10-08 that the testing sections will bring "a lot of questions".
- The `coordinator` skill: batch jargon, and the old word "stop" in the script it points to. He suggested on 2026-10-07 that it may load whole at boot, so lazy loading may not serve it.
- The `cloud-container` skill: he has not reviewed it. He said it follows after the process "proves itself".

## 6. Where the evidence is thin

- Only `fortress-repo` was reviewed. Of its text he read `SKILL.md` in depth, the rules for every task, the parts list and `records.md`. He has not commented on the area parts, the build, test and gate parts, or the other two skills. Section 5's last list is a forecast.
- No comment of his judges the writer pass of 2026-10-06 as a whole. On 2026-10-07 he said he had not started reading the other sections. The 2026-10-08 comments on `records.md` found faults left after that pass (reverse order, back references, "from earlier briefs", undefined "finding" and "run", a rule with no evidence). So the eight lenses alone did not catch them. Lenses 9 to 14 rest on two or three cases each, mostly from the 16 comments of 2026-10-08 and the chat of 2026-10-07 and 2026-10-08.
- No comments on the page on 2026-10-07. That day is chat only: 23 messages, many dictated, about the exploring part, the writer and the cost of review.
- He approved the plan and the place of "Fortress as a language" and of the audit in threads. He had read the draft of the language section only as far as its fourth point (2026-10-08 06:47). He has not commented on the added text of the parts.
- Some of his decisions reach this note through the coordinator's relay (the structure comment, the register, the executive assistant clause). `sources.md` and the commit messages say "relayed by the coordinator". His own wording is quoted only where the transcript holds it.
- Dictation noise. Quotes keep his words. Where a transcription error hid the meaning, the note gives the meaning that the coordinator's reply and his next comment confirm, and does not quote the garbled part.
- The test for lens 10 (no trace of the failure in the record) was applied once, by a short search. A wider search might find a trace. Treat the test as a prompt for a check, not as proof.
- The estimate of hours and tokens is the coordinator's, not measured here.

## Appendix: the 35 threads

One line each: date, the passage, the lens, the first commit of the fix. The commit hashes are in `git log`; messages say what changed. "None" means no edit.

2026-10-05:

- 04:09, "never wiping caches": lens 9; `d84de6753`, then `a6921d817` (section rewritten whole).
- 04:23, "team" undefined in the opening: lens 1; `06a717ebc`.
- 04:29, what `walk` is: lens 12; `08b949c2e`.
- 04:35, the "team" wording, 7 comments: lens 6; `9b007218f`.
- 04:59, `walk` wording, an essay: lens 6; `e42782843`.
- 05:02, `walk` wording, duplication: lens 6; `b133ba0f7`, `49cb0d208`.
- 06:12, `walk` wording, after compaction: lenses 6 and 12; `ebfb33971`.
- 06:21, "switch-over" without what happens: lens 1; `0e47f180e`.
- 06:49 and 2026-10-06 17:11, slogans in the rules: lens 6; `03449ec9f`.

2026-10-06:

- 17:02, "The curator decides what is committed", and the `HANDOVER.md` rule: lenses 3, 4 and 10; `af7e3aca9`, `ec1680fc7`.
- 17:03, definition of "brief": lens 10; `4ca8337fc`.
- 17:09, repeated record reference and pointers in the glossary: lens 11; `f68e282a3`.
- 17:13, "stop": lens 1 and move M5; `2dc33499d`.
- 17:19, test first for specification edits: lenses 2 and 3; `038df2f6e`.
- 17:28, list of source types in the test-first rule: lens 6; `5b9ef1970`.
- 17:32, "corpus", and a comparison to `lit`: lenses 1 and 12; `fee8a876d`.
- 17:35 to 18:19, "look for its result on record", the green tree, the checker count: lenses 9 and 4, move M6; `d95567117`, `226f47b23`, `aa88a945d`, `8a9384532`.
- 17:49, "source" as a verb: lens 1; `e936695da`.
- 17:56, the specification as the standard: lens 3; `d194de9f5`.
- 18:17, "Change one variable per step": lens 8; `ad2c5eb4c`.
- 18:24 to 18:30, "Do not pipe ant through tail": lenses 5 and 6; `236545420` to `d63e26889`.
- 18:32, the model-identifier rule: lens 4; `f7ea777e4`.
- 18:35, "scratch" and the rename incident: lens 5; `bed47988b`.
- 18:38, "each defect's home" and the sentence "Do not ask the curator": lenses 1, 2 and 6; `1de5eafaf`, `a3ad6287a`, `b10fc8471`.
- 18:51 to 19:13, the report rule, then the request for lenses: lenses 6 and 2, move M7; `e5c0c3fb7`, `9eaee5276`, `2ce5db200`; the lenses note `7a7fe3e3e`.
- 19:03, the `area-` prefix: lens 7; `8de05ad84`.

2026-10-08:

- 04:04, "Check every claim against a primary source": lens 9; `9e5fca711`.
- 04:10, "run" undefined: lens 1; `a6138453d`.
- 04:53, "Starting a task": lens 7; `9070d14dd`.
- 04:57, back reference: lens 11; `5d2227cf6`.
- 05:02, "from earlier briefs": lens 11; `8a1df65e4`.
- 05:17, the report file or the final message: lens 8; none.
- 05:19 to 06:47, the record's other files, the map, "Fortress as a language": lenses 13 and 12; `3d994da56`, the audit `91906f99a`, `dce219dba`.
- 05:46 to 06:30, the ledger: lens 14, move M11; `324101232`, `917b37939`, the archaeology `062fcbc0a`, the tool `a8896972b`.
- 06:06 and 06:34, the edit-collision rule: lenses 10 and 4; `0abb2a9f3`.

Chat, not a thread: the order of `records.md` (2026-10-08 06:21; `9efdf42b8`, `3bee24d59`); the modes and the exploring part (2026-10-07; `ca492993f`); the dropped rule to follow the brief (2026-10-07; `991eb6005`).
