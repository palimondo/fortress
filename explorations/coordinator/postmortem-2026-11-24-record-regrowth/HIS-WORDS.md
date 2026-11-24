<!-- This file holds the curator's own rules for the record (FACTS and the files around it), sorted by subject, each with his exact words, their UTC time and the file that holds the full passage; then what he accepted and refused of each result on the record, in order of time; then where his purpose for the record-landing workflow was lost. It is the one place that a later coordinator or worker reads in place of asking him what he has already said. Written 2026-11-24 by an Opus worker from the scouts' files under evidence/his-words/, RESTATEMENT.md and three evidence notes of this folder; it judges what his words decided and adds nothing of its own as his. -->

# His words on the record: the rules, the judgements, the lost purpose

## How to read this file

- **His rule**: one plain sentence in this file's words, then his exact words that state it. The sentence is a reading of his words. The quote is the evidence.
- **Count**: the number of messages of his that state the rule, with their dates. A rule that he stated more than once stands first under its heading.
- **Change of mind**: where two messages of his differ, both are given. The later one stands, unless he said that the earlier one meant something else.
- **Open**: a question at a heading's end that his words leave open and that only he can answer.
- **Not his**: a text that the coordinator proposed and he did not take up in his own words. This file never states such a text as his. Where he approved a coordinator's text by a short word ("yes", "LGTM"), the file says so and names the text as the coordinator's.
- **Quotes**: his words are dictated and kept as he dictated them. A word in square brackets after a word of his gives the reading of a dictation error, as "rank [rung]". `[?]` after a word marks a reading that is a guess. `[...]` marks a cut.
- **Files**: each quote names the file that holds its full passage, all under `evidence/his-words/` unless the label says otherwise:
  - [A] `words-a-until-10-08.md`
  - [B1] `words-b1-from-10-08.md`
  - [B2] `words-b2-until-11-07.md`
  - [C] `words-c-from-11-07.md`
  - [PC] `page-comments-2026-11-24.md`, his five comments on today's pilot page
  - [LW] `landing-workflow-order.md`, with the passage's number H01 to H37
  - [R] `RESTATEMENT.md` in this folder, not under `evidence/his-words/`
- **Times** are UTC. A page comment has its stamp to the minute.
- **A gap in the sources.** The scout of [B1] dropped every page comment ("[Artifact comment" lines). So his comments on the trial page of 2026-10-13 (15:25 to 16:03 UTC, by `evidence/briefs-compared.md`) are not here. The definition "What an entry is" in `explorations/coordinator/process-engineering/record-rule-draft.md` was written from them that day.

### Terms

- **record**: the project's memory in the repository: FACTS, POSITIONS, their history files, INDEX, PLAN, the review queue, the held list and the gap ledger.
- **entry**: one numbered line of FACTS (F-n) or POSITIONS (P-n).
- **history**: `FACTS-history.md` or `POSITIONS-history.md`, which keep each entry's earlier texts and provenance.
- **landing**: the commit and push of a batch's merged work onto `main`.
- **rung**: one task of a batch, with its own worker.
- **consolidation**: a rewrite of the record that brings it to its current state and makes it smaller. "The consolidation of October" is the run of 2026-10-13. "The clarity rewrite" is the run of 2026-10-22.
- **record-landing workflow**: the workflow in `explorations/coordinator/tools/record-landing/`, which runs after each landing. He calls it "the landing workflow".
- **orientation**: the workflow that writes the landing's new facts into the worker skill's revival part, `fortress-repo`'s `revival-changes.md`.
- **pilot**: a rewrite of three or four entries, shown to him as a page before the rest runs.
- **test of decisions**: a quiz of decisions that a fresh worker answers from the rewritten entries, to show that no decision got worse. He also calls the October form of it "the trial".
- **page**: an HTML page that the Artifact tool publishes for him to read and comment on.

---

## Part 1. His rules for the record, by subject

### 1. What FACTS is for

**1.1 — 5 times (09-27, 10-08 twice, 10-28, 11-24).** The record is for in-context learning: a fact holds what differs from what a model assumes from its training.

- 2026-11-24T13:17 [PC]: "the workers and you as a coordinator have been pre-trained on some knowledge about Fortress, and facts are recording the deviations from your knowledge. Like, this is for in-context learning. What is different from what your default assumption would be must be captured in the fact."
- 2026-09-27T07:33:18Z [A]: "This is this whole exercise is about in-context learning. You were not pre-trained on Fortress. And the language was not finished."
- 2026-10-08T06:21:54Z [A]: "everything that agents do is about in context learning"
- 2026-10-08T09:04:00Z [A]: "we are supposed to basically use in context learning using skills to correct misconceptions that the workers hold from their pre-training habits"
- 2026-10-28T07:26:03Z [B2]: "we are looking in our skills, positions, etc., to encode the delta from your generic model nature to the specific use case in this repository. This is the whole game."

**1.2 — 5 times (09-21, 09-27, 10-08, 10-20, 10-28).** The record exists so that no one finds again what the project already found. A record that is written and never read (his "write-only repository") fails.

- 2026-10-28T07:26:03Z [B2]: "we've done so many explorations, stored them in reports, that we are constantly rediscovering stuff that we discovered before. Which is where the record keeping enters the scene."
- 2026-09-21T01:14:56Z [A]: "consolidating and organizing the knowledge about this repository into a from [form] that will be readily available to us to make informed decisions."
- 2026-09-27T05:57:11Z [A]: "We have invested into up to date maps, so that we don't need to rediscover things each time."
- 2026-10-08T06:21:54Z [A]: "we do not have a write only repository where we are just searching with a flashlight and report comes out."
- 2026-10-20T12:07:28Z [B1]: "You know my worry about write-only repository."

**1.3 — 2 times (10-07, 10-12).** FACTS and POSITIONS are the project's memory, kept in the repository in place of a local memory file. The coordinator turns each worker's report into this compressed memory and keeps it loaded.

- 2026-10-12T11:15:43Z [B1]: "the coordinator's job is to take that report and make it available in memory in some compressed form right so that you are aware of the project status at all times"
- 2026-10-07T03:05:44Z [A]: "I believe this is what the positions and facts are about like we are carrying the project memory inside the repo instead of in .claude project"

**1.4 — 2 times (10-12, 10-13).** A fact is something that can change what the coordinator or a worker decides or does. Detail such as measured numbers stays in the report, behind a pointer.

- 2026-10-12T16:42:37Z [B1]: "it needs to be something that can influence your or workers' decisions during your and theirs regular work" and "Do we need to record just a provenance to a report file where you look up the details of numbers?"
- 2026-10-13T16:16:23Z [B1]: "the important part was making things actionable. So when we are recording some facts that have some known consequences from the record, maybe like that should be part of, of the of the write-up."

**1.5 — 2 times (09-27 twice).** The record gives each worker the project's whole picture, so that it decides for the whole project and not only for its own task.

- 2026-09-27T06:04:20Z [A]: "forcing global perspective on workers so that they do not grab and poke in the dark but get a well-read territory map and can make globally optimal decisions."
- 2026-09-27T07:33:18Z [A]: "What they are missing is big picture."

**Open**

- **1-A.** When the work has passed an entry's subject, does the entry leave FACTS for its history, and who judges that it is passed? He accepted the cut of F-53 (the distance to the switch-over) for this reason, and also said that it was not a representative sample. 2026-11-24T13:28 [PC]: "I'm like fine with this cut because I don't care about it anymore. It's behind us." and "So I don't think this is a representative sample."

### 2. What belongs where: FACTS, its history, the report, the ledger, POSITIONS, PLAN, the queue

**2.1 — 8 times (10-10, 10-12 twice, 10-13 twice, 10-22, 10-28, 11-24).** FACTS states only the current state (his "optimized build"). Provenance, dates and repairs go to the history file (his "debug build"). The full report is the last tier, where the reader looks for detail.

- 2026-10-13T09:02:01Z [B1]: "my optimized build is about capturing the current status quo. And the instructions for the model should be that when it needs to question the provenance, it uses the historical record. And can look up the full report when needed."
- 2026-10-10T08:05:10Z [B1]: "debug build is like the full historical record with provenance and optimized build is just like what is the current status quo that is what should be loaded always loaded into memory"
- 2026-10-12T11:23:42Z [B1]: "this default habit of the model to to record the dates of everything and provenance of of every effect [fact] is. What collapses"
- 2026-10-12T16:26:53Z [B1]: "so that they do not contain the provenance and dates in the optimized build."
- 2026-10-13T17:23:12Z [B1]: "That's why we define the multi-layer system with the optimized build and the debug build that has the provenance. So that must pay off."
- 2026-10-22T10:46:58Z [B1]: "positions and facts should be either timeless or describing the status quo."
- 2026-10-28T22:19:09Z [B2]: "the positions contain too much detail and references which should be the historical record"
- 2026-11-24T09:20 [C]: "There should be clear demarcation about things that go into the facts and which go to the facts history."

**2.2 — 8 times (09-27, 10-12, 10-13, 10-14, 10-22, 11-24 three times).** Each claim has one home. Other entries point to it by number and do not say it again. Repetition between entries goes.

- 2026-11-24T13:41 [PC]: "if the sources for growth are like duplication and restatement of the same things between facts, that must go. We must use reference pointing. To cut down on repetition."
- 2026-10-13T10:23:31Z [B1]: "we need to keep one home and just pointers to the other citations by by record pointing not by restating the same things"
- 2026-09-27T01:20:25Z [A]: "No need to duplicate any and all of my instances in multiple places either."
- 2026-10-12T16:16:34Z [B1]: "everything gets a single home"
- 2026-10-14T12:46:06Z [B1]: "detect duplication against what's already in other parts of the record or has another home"
- 2026-10-22T10:46:58Z [B1]: "we need to go to the single home for each type of information"
- 2026-11-24T12:10 [C]: "Where is its single home?"
- 2026-11-24T13:17 [PC]: "the same information lives in a different fact where this one is pointing by reference, such a cut is okay."

**2.3 — 7 times (10-13, 10-14, 10-21, 10-28 twice, 11-09, 11-10).** POSITIONS states his meaning in clean, clear words. It never quotes his dictated words as they came.

- 2026-11-10T06:37 [C]: "So rewriting my words into cleaner language is a standing feature. [...] So I don't think the solution is quoting my words verbatim. But recovery of meaning is the point."
- 2026-10-13T09:05:37Z [B1]: "I don't think it is the essential part of recording my words verbatim in positions. If you can rephrase it in, in a more concise and precise form."
- 2026-10-14T11:49:45Z [B1]: "my ramblings from speech to text being encoded verbatim in positions which I explicitly didn't want to do"
- 2026-10-21T22:00:10Z [B1]: "I would prefer a fair rewording of my intent over exact record of my words to be entered into the evidence."
- 2026-10-28T07:26:03Z [B2]: "nowhere is the goal to quote me verbatim. It is to capture factually correct statements in a minimal form"
- 2026-10-28T12:13:25Z [B2]: "Fuck my words. That's not the point."
- 2026-11-09T17:20 [C]: "So do not insist on quoting my exact words."

**2.4 — 7 times (10-14, 10-16, 10-22, 10-24, 10-29, 11-02, 11-03).** PLAN and the review queue need their own consolidation. The review queue must not become a backlog of everything that workers did.

- 2026-10-29T21:05:46Z [B2]: "What the fuck is that? Backlog for the next 10 years."
- 2026-11-03T18:30:31Z [B2]: "if those are phrased like things that I should review and overturn, potentially overturn, it is probably a wrong framing for me to get closure on the cognitive gap."
- 2026-10-14T12:46:06Z [B1]: "There must be a huge overlap."
- 2026-10-16T13:04:22Z [B1]: "Didn't we like have it parked to consolidate the plan?"
- 2026-10-22T22:46:31Z [B1]: "We haven’t consolidated the plan at all."
- 2026-10-24T11:36:23Z [B2]: "I think we said we should consolidate the plan."
- 2026-11-02T23:50:03Z [B2]: "consolidation/review of the PLAN.md — why?"

**2.5 — 5 times (09-27 four times, 11-03).** Correct the record in place. Keep no trace of a mistake in it, no one-time go, and no rejected draft. Git keeps the past.

- 2026-09-27T01:22:45Z [A]: "But why? Why not just correct the record? Why leave a trace of mistakes?"
- 2026-09-27T01:30:24Z [A]: "You will soon flood the permanent record that’s read no [on] boot up with ton of little minutiae that will confuse you and degrade the performance."
- 2026-09-27T02:26:42Z [A]: "This does not need to be entered into the permanent record at all."
- 2026-09-27T03:52:16Z [A]: "That should be stated once at the beginning of the file and never again."
- 2026-11-03T18:47:51Z [B2]: "No need to store rejected garbage. Git holds it in history."

**2.6 — 5 times, all 2026-10-22; with his yes to the coordinator's rule at 22:19.** Pointers between the record's files run one way and form no cycle. A decision in POSITIONS points to the facts that it rests on. PLAN and the review queue point to facts and decisions. Nothing points back.

- 2026-10-22T10:46:58Z [B1]: "anything that is awaiting my review should be there pointing to the facts or position to be reviewed, and the fact and position doesn't need to have a backlink. So that's the DAG idea that I want here to enforce"
- 2026-10-22T10:56:34Z [B1]: "positions are about decisions I make about the ledger and facts."
- 2026-10-22T15:59:05Z [B1]: "Wait, so you are saying that the facts are pointing at positions? Wasn't it supposed to be the... other way around, because positions are decisions about the gaps and facts?"
- 2026-10-22T16:03:34Z [B1]: "Go where I asked for acyclic graph."
- 2026-10-22T16:10:42Z [B1]: "show me the rules for a cyclic directed graph, directed acyclic graph, like what may point at what"
- 2026-10-22T22:19:08Z [B1]: "Skill wording changes fully agreed and approved." He approved the coordinator's rule "that a decision may point to the fact it rests on" (the coordinator's words of 22:11).

**2.7 — 4 times (10-22 twice, 10-26, 10-28).** What is built, what is still to build, and other plans are not decisions and not facts. The future goes to PLAN. What waits for him goes to the review queue.

- 2026-10-22T10:46:58Z [B1]: "we move the history to the history file, and the future needs to live outside of in a plan, I believe, or stuff with the review queue."
- 2026-10-22T08:19:30Z [B1]: "there was a lot of what was built and what is still to be built. And I'm not sure whether this is really what belongs to positions"
- 2026-10-26T19:08:27Z [B2]: "It cites things not as principles, but as historical events, things that will go out of date as soon as we make a move in the repo."
- 2026-10-28T22:19:09Z [B2]: "which should be kept timeless and referencing the FACTS on record where needed."

**2.8 — 3 times (10-14, 10-21, 10-22).** An agent's proposal or default is not his decision. Only what he reviewed and confirmed goes into POSITIONS as his.

- 2026-10-22T22:02:17Z [B1]: "none of these were decisions of mine that must be turned into gospel."
- 2026-10-14T11:49:45Z [B1]: "all we must do is distinguish between your proposals and and things that I have reviewed and confirmed as being mine"
- 2026-10-21T18:02:06Z [B1]: "whether agent defaults are taking on more significance than is warranted by my manual review."

**2.9 — 3 times (11-23, 11-24 twice).** The gap ledger is the inventory of what is broken, for the plan. Work fixes its rows as it goes and does not only describe them.

- 2026-11-23T08:47 [C]: "Position: clean up as we go, to increase the coherence of the implementation on both paths, now that we are at switchover.  Don't just document and swipe issues under carpet in the gap ledger."
- 2026-11-24T13:08 [C]: "the point of the ledger is to keep the ledger gap is inventory for the planning. Why aren't we fixing things as we go?"
- 2026-11-24T14:00 [C]: "obviously we have created the ledger so that we know what is broken, and then we created a plan to fix what is broken."

**2.10 — 2 times (10-03, 10-13).** FACTS and POSITIONS hold the project only. How the coordinator and he work together goes to the coordinator skill.

- 2026-10-13T09:16:07Z [B1]: "positions and facts I believe should relate to the project only. And we are now trying to extract everything that is about the process of a collaboration between you and me into the coordinator skill."
- 2026-10-03T07:57:56Z [A]: "maybe facts and positions are not, not the places when we are tuning the coordinator."

**2.11 — 2 times (10-22 15:06; his yes to the coordinator's rule at 22:19).** A choice that a worker landed without his word is a fact. Only what he said stays in POSITIONS. If he must see the choice, a review-queue item names it.

- 2026-10-22T15:06:36Z [B1]: "the delta between what I said and what the worker did, which was not reviewed, goes into the facts and a review list. Do I get it correctly? That would make sense"
- 2026-10-22T22:19:08Z [B1]: "Skill wording changes fully agreed and approved." He approved the coordinator's rule "that a worker's landed choice is a fact in FACTS" (the coordinator's words of 22:11).

**2.12 — 2 times (09-29, 11-08).** A defect goes to the gap ledger: a note on its row, or a new row.

- 2026-11-08T20:46 [C]: "Why didn't you note it in the gap ledger, either by amending the row 318 or filing a new one? What does it help us in the boot note?"
- 2026-09-29T20:48:40Z [A]: "if we discover new issues along it, they go to the onto the ledger."

**2.13 — 2 times (10-12, 11-24).** The held list keeps his points so that they come back. The coordinator never deletes a point on its own. It may move a point to the review queue. Each line points to the transcript by its time.

- 2026-11-24T11:58 [C]: "I am putting things on the help [held] list so that we get back to them. You will not delete them on your own. You may move them to the review queue."
- 2026-10-12T16:19:10Z [B1]: "pointing to specific timestamps in the transcript for, for your case, so that when we go over the compaction, you still can look up the full text"

**2.14 — once.** In an entry, "row N" always names a row of the gap ledger, so it needs no longer form.

- 2026-10-22T10:46:58Z [B1]: "I believe the shorthand with row always means row from the gap ledger, so you don't need to embiggen those references."

**Open**

- **2-A.** May a FACTS entry name the decision that it builds? The coordinator skill's `references/record.md` asks each FACTS entry for "the decision it builds, by number and subject", and its `P-48+` query lists "every fact that points to it". His rule 2.6 says that a fact "doesn't need to have a backlink" and asked, of facts that point at positions, "Wasn't it supposed to be the... other way around". Is a fact's pointer to a decision a backlink that he forbids?
- **2-B.** Does a defect's description leave a FACTS entry for its ledger row, so that the entry keeps the property and the row's number only? His words send a defect to the ledger (2.12). They do not say whether an entry may also state it. In a sample of 40 entries, 24 carry a defect beside the property in their title (`evidence/f63-traced.md`, "In short", item 10).

### 3. The length and the form of an entry

**3.1 — 8 times (10-05, 10-07, 10-13, 10-14, 10-22, 10-26, 10-27, 11-23).** Write halfway to ASD-STE100, so that a reader who was not in the conversation understands the entry.

- 2026-10-22T05:28:32Z [B1]: "They are overly compressed and they usually require the knowledge of the conversation that produced them to fully comprehend them."
- 2026-10-14T19:20:20Z [B1]: "Try phrasing it in ASD-STE100 register (halfway). That compressed phrasing isn’t obvious to me and I doubt fresh workers would get your meaning either."
- 2026-10-13T16:16:23Z [B1]: "it would be beneficial if, if it rewrote stuff in, in that ASD-STE100 register for clarity of, of the record."
- 2026-10-05T06:41:55Z [A]: "we don't want to go full 100% in that direction, maybe, maybe 50% in, in the direction."
- 2026-10-07T03:54:45Z [A]: "those things really need to be restructured at least 50% towards the STE 100"
- 2026-10-26T19:08:27Z [B2]: "It is in the Claude speak. It is not in the ASD-STE100 register."
- 2026-10-27T07:12:48Z [B2]: "Can you start writing in ASD-STE-100 halfway so that you steer clear of compressed Claudisms?"
- 2026-11-23T23:49 [C]: "use the halfway to the ASD-STE100 register, because you are again slipping into Claudisms."

**3.2 — 8 times (09-27 twice, 10-13 three times, 10-16, 11-24 twice).** The record's total size must come down a lot. The goal is a much smaller record that loses no ability to reason. He took a full boot of about 125K to 195K tokens as fine; 250K and more is too much.

- 2026-10-13T17:23:12Z [B1]: "I really hope that the consolidated record is significantly smaller than before. Like that is a goal. [...] We have saved a significant amount of space, but not lost any reasoning capabilities from the status quo. We want to have better performance and much lower memory cost. That's the goal."
- 2026-09-27T02:21:51Z [A]: "I’m am fine with paying 125k in each session for that peace of mind."
- 2026-09-27T03:36:24Z [A]: "250k after boot up is too much, I said in the post-mortem I want quality and am willing to pay for it. But I am also aware of model’s dumb zone when the context is too large."
- 2026-10-13T08:01:03Z [B1]: "We, we spent several hours doing some kind of rewrite. What did it buy us?"
- 2026-10-13T08:11:59Z [B1]: "No benefit for what cost in terms of tokens during rewrite?"
- 2026-10-16T06:15:51Z [B1]: "Looks like the consolidation payed off.  195k is good."
- 2026-11-24T07:03 [C]: "Full boot is now 590k of your context. Not exactly practical."
- 2026-11-24T13:41 [PC]: "It is a problem when the sum is too large."

**3.3 — 5 times (09-27, 09-29, 10-13, 11-24 twice).** No size target decides what stays. Fidelity and relevance decide. A cut that loses meaning is wrong. Where a cut loses something, find the middle ground.

- 2026-09-29T21:27:46Z [A]: "the target token count is, is not the important thing. Important thing is the fidelity of the record. So I do not approve 40k just based on a target. It must be relevancy."
- 2026-09-27T02:21:51Z [A]: "Quality matters here much more."
- 2026-10-13T10:14:40Z [B1]: "if we lose some of the critical functionality then we must try to find some middle ground"
- 2026-11-24T13:41 [PC]: "The point here is not to take long entries and strip them of all necessary information. It's the opposite. [...] We are not supposed to be cutting for cutting."
- 2026-11-24T13:17 [PC]: "I worry that the aggressive trimming here loses a lot of crucial meaning if that is not the case, that the other facts carry the information in full."

**3.4 — 4 times (10-22, 10-23, 11-24 twice).** Clarity comes first. He accepted the growth that the clarity rewrite of 10-22 caused. A new compression keeps the clarity high.

- 2026-10-22T08:19:30Z [B1]: "The purpose of the Clarity rewrite added more additional context. So, yes, I understand the size increase. I think that's just the cost we are willing to pay for Clarity."
- 2026-10-23T08:24:43Z [B1]: "the rewrite of positions and facts for readability that inflated them a little bit"
- 2026-11-24T09:20 [C]: "then we did a rewrite for clarity, which grew it, and I accepted that growth." and "compress the facts again. Of course, keeping the clarity high."
- 2026-11-24T13:41 [PC]: "Like I am accepting the cost of communicating information here."

**3.5 — 3 times (10-28, 11-24 twice).** 600 characters an entry is a soft limit. An entry may be longer when its subject needs it. He judges whether its content grows beyond reason.

- 2026-11-24T13:41 [PC]: "Facts can be larger than 600. That's not a problem on its own."
- 2026-10-28T21:10:17Z [B2]: "soft cap 600 as already on tool, instruction for minimal change of the finding. [...] We are allowing longer entries when the subject needs it, but we’ll judge if the content expands beyond reason."
- 2026-11-24T13:17 [PC]: "this 600 size goal was a soft limit for a reason."
- Earlier: 2026-10-13T10:16:08Z [B1] recalls a cap "at a thousand or one thousand five hundred or something like that" and says "I'm now very confused." The later word of 10-28 and 11-24 stands.

**3.6 — 3 times, all 2026-11-24.** A list of test names leaves FACTS when the report names the tests. He would take one rewrite of the reports, so that each has a standard section of tests and a tool prints it. First, measure how workers use the test names in an entry.

- 2026-11-24T13:17 [PC]: "If those tests are named in the report, then they should leave the fact completely, and it should be your common knowledge to go and check the referenced report for the tests" and "I think we need to judge this properly. We should check whether, like, how are the workers using the named tests?"
- 2026-11-24T13:43 [PC]: "I am willing to accept one-time rewrite to all such reports that would standardize the structure so that there is a one section listing the tests and building a tool that could extract it from such report and encoding this in Fortress repo workers skill. [...] If that is not already the case in the report that names the tests."
- Change of mind: 2026-11-24T09:20 [C], earlier the same day, said flatly: "There should be no tests named". At 13:17 he made it conditional and asked for the measurement first. The later word stands.

**3.7 — 2 times (10-12, 10-21).** An entry that must stay true holds no falsely precise number and no one-time measurement. The number stays in the report.

- 2026-10-21T22:28:24Z [B1]: "why are such falsely precise numbers quoted in positions? Like, this doesn't seem like an evergreen statement."
- 2026-10-12T16:42:37Z [B1]: "why would you need to fill your context with, I don't know, what kind of measured numbers you'd have? Some are useful."

**3.8 — once.** An example that teaches the reader something that it would not know is worth its length.

- 2026-11-24T13:17 [PC]: "I learned from the original text a lot of things that I didn't know. And those examples looked important for understanding it."

**Open**

- **3-A.** Does an entry name its test at all? He asked first for a measurement: how workers use the named tests, whether they read the report for them, and how much a report's tests section costs to read (2026-11-24T13:17 [PC]). After it, his choice stands open between: no test in the entry; one test or a name pattern, as in October; or the evidence sentence kept whole.
- **3-B.** Does he want the one-time rewrite of the reports that names the tests in one standard section, with a tool that prints it? He said he would accept it, with the condition "If that is not already the case in the report that names the tests." (2026-11-24T13:43 [PC]).

### 4. The consolidation of the record

**4.1 — 9 times (09-27, 09-29, 10-22, 10-27, 10-28 twice, 11-24 three times).** Run the method that worked before. Never make up a new one. Never change a tool that worked for its job to fit a new job.

- 2026-11-24T13:02 [C], also [LW H34]: "I want us to execute the old method that we had before, which worked. I don't want to reinvent that method. That was a good method, and I wanted that method to have encoded in the workflow. That is our goal."
- 2026-09-27T02:31:31Z [A]: "There already was a process for consolidating FACTS and moving obsolete/speeded facts into a separate facts history file. I haven’t seen you mentioning it, so I worry you are reinventing existing measures"
- 2026-09-29T21:27:46Z [A]: "the process for consolidating this must be read before you start doing this. [...] Not, not that you now improvise some different process."
- 2026-10-22T08:28:48Z [LW H03]: "I don't want to reinvent it from scratch."
- 2026-10-27T07:47:43Z [B2]: "The plan seems to reinvent something for which we already have workflows."
- 2026-10-28T07:37:43Z [B2]: "So please, do not reinvent this wheel."
- 2026-10-28T11:49:40Z [B2]: "Why are you touching them when they worked for the record consolidation before?"
- 2026-11-24T07:35 [C], also [LW H30]: "It is reoccurrence of the old problem. [...] Like we already had processes that were supposed to deal with this."
- 2026-11-24T14:38 [LW H37]: "the practice that has successfully consolidated the record the first time."

**4.2 — 7 times (10-12, 10-13, 10-22 twice, 10-28 twice, 11-06).** The method is written into the skill and into a tool that can run again, so that it runs when the record drifts. The coordinator skill defines a good entry and who writes what, when.

- 2026-10-22T08:19:30Z [LW H02]: "The process needs to be encoded in the skill so that we can reapply it for the consolidations in the future if necessary. If the record starts drifting again."
- 2026-10-12T16:27:36Z [B1]: "we need to describe this procedure in the skill as well."
- 2026-10-13T09:02:01Z [B1]: "we need for the coordinator skill define specifically uh, how a good record in fact should look like."
- 2026-10-22T16:11:47Z [B1]: "what are the phases of record writing, who writes what and when, who is responsible for rewrites"
- 2026-10-28T12:24:08Z [B2]: "We forgot to describe them correctly. For which purpose? This was not correctly documented in the skill, so we must correct this."
- 2026-10-28T23:07:04Z [LW H07]: "after the landing I recall I asked for workflow creation to make this reusable when needed in the future."
- 2026-11-06T05:44:38Z [B2]: "Run archeology over this, then record the techniques on coordinator skill, so that I don’t have to re-explain it again."

**4.3 — 6 times (09-19, 09-24, 09-27, 09-29 twice, 11-24).** A consolidation moves what is stale or replaced to the history, and folds each change into the entry that it replaces, so that FACTS states the present. Its scope is every entry that is out of date, not only the long ones.

- 2026-09-29T10:00:35Z [A]: "But that's the whole point of running post batch consolidation of facts, moving superseded things to history, etc., so that we keep uh, up to date records in there."
- 2026-11-24T12:54 [C], also [LW H33]: "Is it like concentrating only on long entries above 600? Because it's possible that there are facts that are out of date, etc. Isn't that what is the scope of the consolidation?"
- 2026-09-19T09:31:50Z [A]: "pruned by removing uh, historical facts that are no longer relevant"
- 2026-09-24T06:31:59Z [A]: "drop the historical background to, to a file that holds it and you get just a cleaner current state"
- 2026-09-27T02:56:48Z [A]: "that coordinator should be responsible to consolidating the disproven facts."
- 2026-09-29T21:23:44Z [A]: "Have the FACTS been properly consolidated (stale/superseded records moved to history?)"

**4.4 — 6 times (10-21 twice, 10-22, 10-28, 11-05, 11-19).** A page of rewritten text shows each item's new text, with the old text collapsed under it and the reason outside the Select range. Unchanged items stand apart, at the bottom.

- 2026-10-28T21:45:06Z [B2]: "The new wordings need to go in as diffs, like before, with original collapsed, reasons below (outside selection range)."
- 2026-10-21T22:49:24Z [B1]: "You haven't showed me the before and after of all those records. So is that too much to ask for?"
- 2026-10-21T23:54:33Z [B1]: "keep them grouped at the bottom or something, so that I can just skim it."
- 2026-10-22T22:19:08Z [B1]: "so that I can review later with the nice diffs"
- 2026-11-05T12:01:53Z [LW H23]: "artifact page that I can review the diff from"
- 2026-11-19T06:37 [C]: "the diff had the format where the above part showed the additions and the opening of the collapse part showed the original text with deletions."

**4.5 — 5 times (09-30, 10-10, 10-13, 11-01, 11-24).** A consolidation finds the duplicates and the claims on one subject, groups the entries by topic, and joins them. An entry holds one subject, not what one batch did.

- 2026-11-24T13:50 [PC]: "Aren't these multiple statements? Like, what is uniting the things in it under one fact, other than they probably originated from the same batch? This seems very wrong."
- 2026-09-30T12:01:35Z [A]: "If you were to let a fable worker reorder them in order for them to be grouped by topics, can we then see some consolidation opportunities when, when these are next to each other? [...] create like one superseding record for them."
- 2026-10-10T08:05:10Z [B1]: "maybe we need a better path that consolidates the facts and positions by topics. And can can find some duplication between them and unify them."
- 2026-10-13T10:23:31Z [B1]: "the same consolidation on positions uh, should be tried here with the same lens"
- 2026-11-01T23:03 [LW H09]: "find the duplicates, update the relevant changes."

**4.6 — 4 times (10-07, 10-22, 10-28, 11-01).** A specialist Opus writer writes the record: a headless session that keeps the ASD-STE100 register and writes each entry with its history. The coordinator does not rewrite entries by hand.

- 2026-10-22T05:32:00Z [B1]: "we have a process for giving tasks to writer. You should not be doing these rewrites yourself."
- 2026-10-28T07:37:43Z [B2]: "We need to chunk the work and let a specialist writer do the writing, but not the way the exhausted coordinator did."
- 2026-11-01T23:10 [LW H10]: "we have a headless writer that keeps the register in ASD ST100, and we had that process that writes the position with its history or fact history."
- 2026-10-07T03:54:45Z [A]: "that should be the standing order for that dedicated writer sub-agent"

**4.7 — 4 times (10-08, 10-13, 11-01, 11-06).** Scouts gather the whole context of each entry. A writer that shares one context across a section rewrites it. The work runs in chunks as a workflow, several runs side by side.

- 2026-10-13T16:16:23Z [B1]: "do we need like Sonnet workers to look up everything related to, to that point and then let the Opus writer do redo the position or entry from, from that wider context. [...] wouldn't it make sense to design this as a batch workflow for processing?" and "within a given section that is dealing with the same thing, the, the writer should have like a shared context."
- 2026-11-01T23:10 [LW H10]: "a step that gathers the evidence for the consolidation of the record that is like what those scouts prepared for each chunk. And then Opus writer consolidated."
- 2026-10-08T08:56:21Z [A], of the ledger: "the duplicate search must be a separate step so that the rewrite can, can join those."
- 2026-11-06T05:44:38Z [B2], of the ledger: "That’s why I am asking for workflow that gets a list of rows to review, so that we can run several workflows in parallel."

**4.8 — 4 times (10-13, 10-28, 11-06, 11-24); one change of mind.** A pilot of three or four entries, the largest first, runs before the rest. In the consolidation of FACTS, no chunk runs on the whole record before he approves the pilot.

- 2026-10-28T21:12:23Z [B2]: "But I think a pilot should be 3-4 entries, not 9."
- 2026-10-13T09:02:01Z [B1]: "You, you can trial it with a worker on, on, a, on a small slice specifically on, on, on the largest records"
- 2026-11-06T08:20:13Z [B2], of the ledger pass: "run it on 3 things and then launch a massively parallel run"
- 2026-11-24T14:05 [C]: "You didn't wait for my approval? [...] I never allowed you to fuck up the rest the way you did before. Didn't I raise enough of issues now to make it clear that none of what the pilot did will run on the whole facts?"
- 2026-11-24T14:06 [C]: "Stop immediately, revert everything to the pre-pilot state."
- Change of mind: 2026-10-28T23:09:32Z [B2] let the coordinator judge a pilot of POSITIONS ("Can I trust you to judge the pilot and run the full thing of [if] it pans out?"), and 2026-11-24T13:02 [C] said "Use my time wisely while you work on the consolidation of the record. That doesn't need my attention." His words of 14:05 and 14:06 stand for this consolidation.

**4.9 — 3 times (09-27, 09-29, 11-01).** A consolidation covers the whole record: FACTS, POSITIONS and INDEX, not FACTS alone.

- 2026-11-01T23:03 [LW H09]: "I think this shouldn't concern only facts, but also positions, if a batch has finished something that alters both. It should be generally as a consolidation of a record, so everything that's defined in the record, facts, positions, I don't know, index."
- 2026-09-29T21:27:46Z [A]: "I want both facts and positions consolidated."
- 2026-09-27T03:50:30Z [A]: "Does such a split make sense for POSITIONS as well"

**4.10 — 3 times (09-27 twice, 10-29).** Every text that leaves an entry goes word for word to its history.

- 2026-09-27T05:07:04Z [A], to "Everything the first cleanup deleted goes word for word into POSITIONS-history.md": "1. Yes. Wasn’t that already the case???!?"
- 2026-09-27T05:09:26Z [A]: "So the full positions will be restored in history?"
- 2026-10-29T13:00:30Z [B2]: "do positions history carry all the edit detail to ground the facts"

**4.11 — 3 times (10-13, 10-26, 10-28).** A cold read by a fresh model checks that a rewritten entry gives the right takeaway. Where a case needs it, a trap test checks that a new wording corrects a wrong reading of the old one.

- 2026-10-13T09:05:37Z [B1]: "Is there a process where you have the full context and you can do a cold read with a model to verify whether if read in a fresh context, the new model gets the correct takeaway"
- 2026-10-26T07:42:15Z [B2]: "like a trap where you would assume that the old wording was leaning one way, but with the rewording we check whether the new wording has corrected the implicit understanding the workers have?"
- 2026-10-28T21:36:49Z [B2]: "Yes, write the trap scenarios for cases that need it."

**4.12 — 3 times (10-22, 10-26, 10-27).** Only Opus writes text that goes into the record as written. Fable 5.1 may give corrections, but writes none of it.

- 2026-10-22T05:35:21Z [B1]: "No, the writer must always be Opus. Fable 5.1 has the wrong register that I hate."
- 2026-10-27T07:12:48Z [B2]: "until we have Fable 5.5, Fable will not be allowed to write text that is taken as is into our permanent record."
- 2026-10-26T19:15:14Z [B2]: "And you just take Fable's wording from the judgment and stuff it into positions."

**4.13 — 2 times (10-13 twice).** A test of decisions on a small trial, run without him, checks that the compressed record still lets a reader decide right and follow the pointers to the source when it needs to.

- 2026-10-13T10:14:40Z [B1]: "we want to see whether this compression keeps enough information for most decisions and that you would know to follow the breadcrumbs to the source original source when needed [...] so how would you test that scenario automatically without me doing"
- 2026-10-13T10:20:30Z [B1]: "This is a limited trial on the same uh, records that you had in the record rule draft. Correct? Like, not that we are wasting too much time uh, designing some elaborate evaluation"

**4.14 — 2 times (10-13, 10-14).** No adversarial Fable review of a record consolidation, since it keeps everything as it was. This holds for the record's consolidation only, not for the review of batches.

- 2026-10-13T17:16:41Z [B1]: "I don't think I want adversarial review by Fable. It always puts in like stupid ideas like keeping everything the way it was before and we got no compaction last time."
- 2026-10-14T00:19:13Z [B1]: "That was objection against Fable’s conservative being the spoiler of the previous record consolidation effort. Not a blanket waiver of Fable review for batches!"

**4.15 — once.** A cut from an entry is right only where the cut claim lives in full in an entry that this one points to, so that the coordinator who follows the pointers when it briefs a worker gives the worker the same context.

- 2026-11-24T13:17 [PC]: "So you would pointer chase these references and give all of the relevant facts for the worker to read on its own during the work on the batch, and you would get the same context. We are good. But otherwise, I would not try to trim the entry too much."

**4.16 — once.** "The method that worked" is two passes: the consolidation of October shrank the record, and the clarity rewrite grew it. He accepted both.

- 2026-11-24T09:20 [C]: "we did one consolidation of record, we shrank it, and then we did a rewrite for clarity, which grew it, and I accepted that growth."

### 5. How facts reach the worker skill

**5.1 — 5 times (10-11, 10-12, 10-22, 10-28, 11-19).** The skills are a small correction to the model's default behaviour: few general principles, not many rules or lists of cases.

- 2026-10-28T07:26:03Z [B2]: "So the positions and skills should be encoded as a minimal delta."
- 2026-10-11T05:14:18Z [B1]: "I don’t want a system of hundreds little rules with potentially contradicting dos and don’ts."
- 2026-10-12T11:15:43Z [B1]: "my goal is to rely as much as possible on all of your pre-trained behavior."
- 2026-10-22T16:28:00Z [B1]: "The whole process was about encoding agents, natural tendencies that you got from pre-training. And we have been trying to correct only the aspects that went wrong when the scale became big."
- 2026-11-19T06:23 [C]: "It sounds like a recipe for ever growing rules section in a skill, whenever a new specific edge case that wasn't in the list is discovered."

**5.2 — 4 times (10-21 twice, 10-22, 11-03).** After each landing, the orientation writes the landing's new facts into the worker skill's revival part. That part holds what corrects a worker's default picture of Fortress, and it must not keep growing.

- 2026-11-03T18:09:39Z [LW H20]: "My understanding of the orientation workflow is that it is extending the revival section of the Fortress repo skill with information that is new in our repository. [...] the purpose of the revival section of the skill is to update your understanding of what is the current state of the repo."
- 2026-10-21T23:54:33Z [B1]: "Which entries must go to the revival, and these are only for when the default mental model of the agents from they know about Fortress from pre-training needs a correction in our revival repo."
- 2026-10-22T08:35:58Z [LW H04]: "after the landing batches should be reusing that process for transferring the records from facts and into the what was the word that Astra is using? Orientation for the revival into the fortress skill."
- 2026-10-21T17:33:34Z [B1]: "now I think we've created a growing or ever-growing problem in the revival section of the Fortress repo skill."

**5.3 — 3 times, all 2026-11-24.** Text goes one way, from FACTS into the worker skill. A fact never cites the skill. That the skill holds a point is never a ground to cut it from a fact.

- 2026-11-24T13:41 [PC]: "This one creates a cyclical, this rewrite creates a cyclical dependency. Facts can never cite skill. Parts from the facts are being encoded into the skill for workers to be able to effectively work in this repository. It can never be a ground for reducing what's written in the fact."
- 2026-11-24T13:53 [C]: "Why you created a circular dependency in there during the rewrite?"
- 2026-11-24T14:03 [C]: "you keep misunderstanding the relationship between facts and the skill."

**5.4 — 2 times (10-23, 11-03).** The orientation runs on the facts' final wording, after the record's commits are on `main`.

- 2026-10-23T18:11:16Z [B1]: "isn't it premature to run the orientation with non-final wording of the facts?"
- 2026-11-03T06:20:02Z [LW H18]: "Because it needs committed facts and positions"

**5.5 — 2 times (11-08 twice).** A behaviour of one path that departs from the team's design is not a language feature. It does not enter the skill as a rule.

- 2026-11-08T15:17 [C]: "these peculiarities were being encoded into the skill as if these were language features and not the things that our revival is trying to reconcile based on the team's specification and design."
- 2026-11-08T08:03 [C]: "I was getting the feeling that this is the same pattern, which gives me wrong vibes."

**5.6 — once.** The coordinator's agenda never enters the worker skill. A skill change goes to the skill writer and is checked by cold readers.

- 2026-10-10T06:35:01Z [B1]: "This is like coordinator's agenda being leaked into the Fortress repo skill. [...] skill writing is a special task that we have dedicated to a writer. And for updating the skills, we use the process of verification with cold readers."

### 6. What a landing does to the record

**6.1 — 13 times (09-19, 09-27 twice, 09-29 five times, 10-03, 10-14, 10-20, 10-28, 11-02).** After each landing, before the next batch starts, the record is consolidated with what the batch added or changed.

- 2026-10-28T23:07:04Z [LW H07]: "the skill was asking for consolidation to be run before each batch. That was meant as consolidation of facts added/edited after the batch landing, because they were created  by workers in the previous batch"
- 2026-11-02T06:39 [LW H14]: "So maybe just I would change before each batch launches, I would say “after a batch landing”."
- 2026-09-29T10:00:35Z [A]: "after landing a batch, we do the effects [facts] consolidation before we launch a new one, and then we run the reviews."
- 2026-09-19T06:54:03Z [A]: "after this run, you need to review whether your Uh, facts are still up to date."
- 2026-09-27T05:52:44Z [A]: "No, consolidation of facts skills happen before starts of batches, as workers read these and pay the cost"
- 2026-09-27T08:05:14Z [A]: "Did we compact the facts already? Because you will reread them on boot."
- 2026-09-29T08:57:31Z [A]: "our usual processes, compaction of fact, blah, blah, blah. I don't want to be telling all these things because you, you should know better than me."
- 2026-09-29T09:55:03Z [A]: "Did you run facts update after the end landing before starting 6.5?"
- 2026-09-29T17:44:02Z [A]: "you should do the things that are post-landing, like updating the facts"
- 2026-09-29T17:51:48Z [A]: "Before we launch 7B, I'd like to update the, the facts, etc."
- 2026-10-03T06:26:07Z [A]: "Did you run FACTS consolidation after batch 9 landed?"
- 2026-10-14T04:50:04Z [B1]: "Looking forward to final report post landing, review and record consolidation."
- 2026-10-20T11:57:51Z [B1]: "Did you run the post batch 20 landing processes?"
- On the time: on 09-27 he said "before starts of batches". On 10-28 he said that this meant the facts that the last batch added or changed, after its landing. It is one rule, not a change of mind.

**6.2 — 7 times (09-27, 10-12, 10-13, 10-22, 10-28, 11-01, 11-24).** Workers keep their record-keeping short, so that they keep their focus on the code. Consolidating the record is the coordinator's job, which it may give to a worker.

- 2026-11-01T23:03 [LW H09]: "If the workers write something that is long or redundant, or like if it invalidates something else on the record, it is the coordinator's job to make sure that the record is consolidated, like find the duplicates, update the relevant changes. And of course the coordinator can delegate this task to a worker that does this job"
- 2026-09-27T02:56:48Z [A]: "the way workers extend the facts was fine."
- 2026-10-12T11:23:42Z [B1]: "we are instructing workers to to write their stuff directly into the facts and there should be some post processing. Pass by the coordinator."
- 2026-10-13T09:16:07Z [B1]: "it is the coordinator's job to then rewrite such a record to match the structure defined only in the coordinator's skill"
- 2026-10-22T10:46:58Z [LW H05]: "can remove unnecessary burdens from the workers because they are part of the coordinator's job."
- 2026-10-28T23:07:04Z [LW H07]: "record keeping instructions were kept deliberately minimal to keep worker’s focus on coding task. Consolidating the record in [is] coordinator’s job."
- 2026-11-24T09:20 [C]: "we have unburdened workers. They are writing in a way that a post-landing workflow should take care of the consolidation of the record."

**6.3 — 4 times (09-29 three times, 09-30).** A batch commits its change to the tree, its tests, its report, its lines for the ledger, FACTS and PLAN, and a script that can be used again. It commits no log and no scratch.

- 2026-09-29T20:48:40Z [A]: "The batches still can, in addition to the fortress change and its tests, commit the report and the ledger facts and, and plan lines. Because those are the outputs."
- 2026-09-29T18:25:19Z [A]: "Nothing of this needs to be committed into the Batch, this is no, not part of the record."
- 2026-09-29T20:42:23Z [A]: "the commit discipline in a branch should not be different from what you will be committing to the main."
- 2026-09-30T05:32:47Z [A]: "We need a report and the changes to the main part of the repository."

**6.4 — 3 times (10-31, 11-09, 11-16).** To bring the record in line with what landed needs no approval of his. He likes to know what changed.

- 2026-10-31T08:19:23Z [LW H08]: "I don't need to be rubber stamping update of the record that reflects the reality correctly. There is no decision to revert. It is nice to be aware of what changed, but these do not require my approval."
- 2026-11-09T09:27 [C]: "No, don't hold the record update. Let it land as the batch wrote it."
- 2026-11-16T07:16 [C]: "Doesn't it simply leave the review list as processed?!?"

**6.5 — 2 times (11-06, 11-23).** After each landing, the chain also updates the revival page's own section.

- 2026-11-06T04:24 [LW H25]: "Batch 26 has landed. Why wasn’t this updated as part of the post landing workflows yet?"
- 2026-11-23T23:38 [C]: "That's why the post-landing batch only updates a specific dedicated section."

### 7. Reading the record

**7.1 — 8 times (09-19, 09-27, 09-30 twice, 10-23, 11-06, 11-24 twice); changes of mind.** The coordinator keeps the record in context when it plans and when it lands a batch, since it cites facts and decisions when it briefs workers.

- 2026-10-23T08:24:43Z [B1]: "when you are preparing batch, you are citing the positions and facts for the briefs, so I think you need it full, right? [...] so that the whole context is in coordinator's memory for optimal planning decisions."
- 2026-11-24T06:58 [C]: "I don't like you without full record in context in landing and planning."
- 2026-09-19T07:16:57Z [A]: "Read FACTS whole, not just tail!"
- 2026-09-27T02:21:51Z [A]: "part of our success was that the boot up gave full context to session coordinator and I did not have to act as projects memory"
- 2026-09-30T11:43:52Z [A]: "I think the session coordinator needs position and facts"
- 2026-09-30T12:01:35Z [A]: "I think we still need to keep facts and position and index all in your memory at boot."
- 2026-11-06T05:00:10Z [B2]: "You should now just load all of FACTS and POSITIONS, to not be clueless regarding what the record says."
- 2026-11-24T07:00 [C]: "Full boot, you're in review post-climb-batch 36."
- Changes of mind, in order: 2026-10-10T07:33:49Z [B1] "force loading facts and positions. That's something that I am not sure we should retain as a practice"; 2026-10-22T22:48:30Z [B1] the light boot as "optional mode"; 2026-11-03T06:10:07Z [LW H17] "on landing, you just need to read what changed"; 2026-11-07T05:54:00Z [B2] "landing should trigger full load of POSITIONS and FACTS in coordinator in light boot mode"; 2026-11-16T22:53 [C] "option 1." (the coordinator's option: the light boot by default, POSITIONS whole, FACTS and INDEX searched, FACTS read whole at a landing); 2026-11-24T06:58 [C], above; 2026-11-24T12:51 [C] "light boot was previous mode. I don't know what we will be doing after the consolidated record. [...] help me decide." The last word leaves the form open (7-A).

**7.2 — 8 times (09-28, 10-07, 10-12, 11-10, 11-16, 11-17 three times).** Search the record before you state, ask or measure anything. Do not measure again what the record holds.

- 2026-11-10T11:43 [C]: "So the rule is always go and check against the record."
- 2026-09-28T07:11:10Z [A]: "you are wasting resources on remeasuring."
- 2026-10-07T04:05:09Z [A]: "I want to raise your awareness of checking the index for earlier records."
- 2026-10-12T16:59:17Z [B1]: "Why haven't you looked it up? Why did you remeasure?"
- 2026-11-16T02:03 [C]: "Search the fucking record!"
- 2026-11-17T09:02 [C]: "Go and check the record, like send a worker to find it out for you."
- 2026-11-17T10:57 [C]: "Now try searching the record whether I have already made this decision before."
- 2026-11-17T22:05 [C]: "Did you check index? I worry we did this already and I just forgot about it."

**7.3 — 7 times (09-27 twice, 10-07, 10-21 twice, 10-28 twice).** A brief names the entries that a worker needs by number. The worker loads its skill and then fetches the entries itself with `facts-extract.sh`. The coordinator does not copy entries into a brief and does not choose the worker's reading list.

- 2026-10-21T22:24:32Z [B1]: "if you gave them, here's the brief, you have P dash number number, they should be instructed in the brief to just fetch the facts from the record, right? We have a script for that. Why are you copying that part by hand?"
- 2026-10-28T11:46:17Z [B2]: "I'm just saying, don't pick the reading list. Let them do it."
- 2026-09-27T05:59:15Z [A]: "a belief [brief] for a rung needs to give each worker a recipe/script that extracts the relevant subset of a given worker"
- 2026-09-27T06:31:31Z [A]: "Give the workers just a relevant extract from those maps indices."
- 2026-10-07T02:54:03Z [A]: "we want it to first load all the relevant sub pages of the skill. Then I, think we wanted to run that uh, tool"
- 2026-10-21T22:33:27Z [B1]: "coordinator is briefing the rung workers by quoting facts and positions by reference, and the workers are fetching them themselves."
- 2026-10-28T11:30:04Z [B2]: "you should probably make your briefings for the workers even lighter and tell them to go through the record first."

**7.4 — 6 times (11-09, 11-16 four times, 11-24).** The coordinator loads the skill parts that a skill's router names, the record parts of both skills first among them, before it judges anything on the record.

- 2026-11-16T01:44 [C]: "You not loading both of the two records section based on the router are critical errors."
- 2026-11-24T13:53 [C], also [LW H35]: "No, read record part from both skills. So Fortress repo and coordinator. Like, so that you can tell me what is the purpose of a fact"
- 2026-11-09T17:20 [C]: "you should read the coordinator's chapters on record, as well as the Fortress repos"
- 2026-11-16T01:40 [C]: "don't you feel the need to load other parts from the skills based on their router's instructions?"
- 2026-11-16T20:41 [C]: "You must use the router from the skill and load whatever it tells you to load."
- 2026-11-16T22:47 [C]: "Load record sections of both skill, and coordinator's delegation section."

**7.5 — 4 times (09-19, 10-27, 10-28, 11-03).** The coordinator gives reading and archaeology to workers and keeps its own context for decisions.

- 2026-11-03T18:03:08Z [B2]: "Do not... burn through your context on menial labor. Your job is here to coordinate high-level session."
- 2026-09-19T07:16:57Z [A]: "use a worker and get just a summary back."
- 2026-10-27T07:13:56Z [B2]: "your goal is now to preserve your reasoning context window for high level work. So delegate diligently."
- 2026-10-28T07:37:43Z [B2]: "spend as many workers as you need to get the story straight without me having to retell it to you."

**7.6 — 4 times (10-13 twice, 10-29, 11-08).** A reader opens an entry's history when the entry's ground is in question. A decision's history is grounded in facts.

- 2026-10-13T09:02:01Z [B1]: "when it needs to question the provenance, it uses the historical record."
- 2026-10-13T10:30:15Z [B1]: "when we are moving things in into the realm of provenance, maybe there the links are more important."
- 2026-10-29T09:12:17Z [B2]: "The position's history will be regrounded in facts so that when we look the reasons for a specific decision next time, we will land on the correct facts from the record"
- 2026-11-08T14:27 [C]: "fetch the relevant positions with their history and make a synthesis."

**7.7 — 3 times (09-27, 10-07 twice).** Workers search the project's record (FACTS, POSITIONS, INDEX) before they search the original tree. The worker skill defines the record and this order at its top.

- 2026-10-07T03:11:41Z [A]: "this hierarchy between searching within project memories versus the repositories historical records needs to be clear for the workers from the repo skill"
- 2026-10-07T03:16:33Z [A]: "the record are those files that replace basically the project memory. Somehow this needs to be clear to, to every Fortress repo workers."
- 2026-09-27T05:57:11Z [A]: "they should use facts and index instead of searching blindly."

**7.8 — INDEX: 9 messages (09-24, 09-29, 09-30, 10-20, 10-21, 11-06, 11-16, 11-24 twice); changes of mind.** INDEX maps every report, with what each found, so that work finds what is known. It must not fill up with many small files. The coordinator first read it whole; since 11-06 it searches it when it needs it.

- 2026-09-29T21:36:20Z [A]: "It should be mapping all the experiments that we ran and their reports [...] They should first start looking at index to know what's already been discovered and consult the relevant resources."
- 2026-10-21T21:25:17Z [B1]: "so that we do not clog the index with a lot of small archaeology findings about the positions."
- Earlier word: 2026-09-24T06:44:33Z [A] "I'm not okay with you not having the necessary context in mind"; 2026-09-30T12:01:35Z [A] "I don't think taking out index would help."; 2026-10-20T12:07:28Z [B1] "The index being read full is the mechanism against this."
- Later word: 2026-11-06T06:08:03Z [B2] "Boot up without INDEX (search it when needed)"; 2026-11-16T22:47 [C] "You'll search facts and index as needed."
- On a split: 2026-11-24T07:03 [C] "INDEX maybe needs a split into current and archive parts." Then 2026-11-24T07:35 [C]: "Regarding your proposal on splitting the index and trimming the facts, reject it." The later word stands: no split for now.

**7.9 — once.** At every boot, read the facts that POSITIONS cites before POSITIONS.

- 2026-11-24T12:47 [C]: "You first need always to load the facts that underline my position before you read the facts [positions], because otherwise your attention cannot connect those positions to the correct meaning in your context window."

**7.10 — once.** The boot note only tells the session after a compaction what is in flight.

- 2026-09-27T02:36:49Z [A]: "Boot note’s only propose [purpose] is to instruct the post compaction Claude about what’s currently in flight."

**Open**

- **7-A.** Which boot does the coordinator take once the record is consolidated: FACTS and POSITIONS whole, or the facts that POSITIONS cites, POSITIONS whole, FACTS searched and read whole at a landing? 2026-11-24T12:51 [C]: "I don't know what we will be doing after the consolidated record. [...] help me decide."

### 8. What the landing workflow is for

**8.1 — 10 times (10-20, 10-22, 10-28, 11-01 twice, 11-02, 11-24 four times).** The record-landing workflow exists to encode the practice that consolidated the record successfully in October, so that it runs after each landing.

- 2026-11-24T14:38 [LW H37]: "This is not only my order of this morning, this is my original order for creating the landing workflow, which was supposed to encode the practice that has successfully consolidated the record the first time. That was its whole fucking purpose."
- 2026-11-24T09:20 [LW H31]: "The whole purpose of the workflow was to encode that successful practice into something that runs after each landing."
- 2026-10-20T17:14:47Z [LW H01]: "a new standing procedure, how the batch landings get incorporated into a record, by a separate worker with small fresh context — not the coordinator in the dumb zone!"
- 2026-10-22T08:19:30Z [LW H02]: "And the other with rewriting of facts and positions after the landing, so positions are not after landing, but facts are after landing."
- 2026-10-28T23:07:04Z [LW H07]: "after the landing I recall I asked for workflow creation to make this reusable when needed in the future."
- 2026-11-01T23:10 [LW H10]: "I'd like to have this down to a reusable workflow after the batch lands that the coordinator launches, and we get a consistent record keeping consolidation."
- 2026-11-01T23:20 [LW H12]: "as I said about, I wanted to have the process encoded in the workflow."
- 2026-11-02T06:39 [LW H14]: "This is the part of the workflow that we try to encode."
- 2026-11-24T13:02 [LW H34]: "I wanted that method to have encoded in the workflow. That is our goal."
- 2026-11-24T14:34 [LW H36]: "Point 3, consolidate facts is the purpose of the landing workflow. And 4, yes, build it in the landing workflow."

**8.2 — 5 times (10-20, 11-01 twice, 11-03 twice).** The workflow runs on its own after a landing, as workers with a fresh context. The coordinator launches it and reads its result. Neither he nor the coordinator does a step of it by hand.

- 2026-11-03T06:20:02Z [LW H18]: "after the landing, we should have been executing a bunch of prepared workflows that update the record. That is the whole point. And there are two workflows to do this, and everything should have been automated away."
- 2026-10-20T17:14:47Z [LW H01]: "by a separate worker with small fresh context — not the coordinator in the dumb zone!"
- 2026-11-01T23:10 [LW H10]: "something that can be just launched by the coordinator after the batch lands without it needing to do a lot of reading of the records and correcting, gathering evidence. Like, that part should be encoded in the workflow."
- 2026-11-01T23:20 [LW H12]: "a workflow can support the described process, and that the coordinator doesn't have to do it manually."
- 2026-11-03T05:50:37Z [B2]: "I don’t want that it relies on me performing manual intervention post landing"

**8.3 — 4 times (10-22, 11-01, 11-02 twice; the two of 11-02 on the coordinator's drafts).** It covers the whole record: what the batch added or changed in FACTS, POSITIONS and INDEX, and each entry that this repeats or makes false. It rewrites each to the present tense, moves history to the history files and the future to PLAN or the review queue.

- 2026-10-22T10:46:58Z [LW H05]: "And after a landing, the consolidation of the record should always rewrite it to the present tense and not keep the, like we move the history to the history file, and the future needs to live outside of in a plan, I believe, or stuff with the review queue."
- 2026-11-01T23:03 [LW H09]: "It should be generally as a consolidation of a record, so everything that's defined in the record, facts, positions, I don't know, index."
- 2026-11-02T06:39 [LW H14], on the coordinator's draft "run it on what the batch before it added or changed in FACTS, POSITIONS and INDEX, and on each entry that this repeats or makes false": "This is good, but I think it's placed at the wrong time." He changed only its time, to after the landing (6.1).
- 2026-11-02T21:20 [LW H16]: "LGTM", on the coordinator's draft: "After a batch lands and its review is committed, the record-landing workflow consolidates the record: what the batch added or changed in FACTS, POSITIONS and INDEX, each entry that this repeats or makes false, and the lines of PLAN and the review queue that the landing settles." The words are the coordinator's; his LGTM accepts them.

**8.4 — 3 times (10-22 twice, 11-01).** It does the steps of the October method itself: it gathers each entry's evidence as the scouts did; an Opus headless writer in the ASD-STE100 register writes each entry with its history; a cold reader checks the result; a judge inside the workflow decides, so that the coordinator does not act as judge.

- 2026-11-01T23:10 [LW H10]: "Like maybe there is a step that gathers the evidence for the consolidation of the record that is like what those scouts prepared for each chunk. And then Opus writer consolidated." and "we have a headless writer that keeps the register in ASD ST100, and we had that process that writes the position with its history or fact history. Like, that part should be encoded in the workflow and reused."
- 2026-10-22T08:19:30Z [LW H02]: "The process with the cold reader, I believe that we had a workflow there, and like I want that to be run on the facts part."
- 2026-10-22T08:35:58Z [LW H04]: "So that judgment phase should probably be part of the workflow so that you do not need to act in that role." and, of the writer: "we wanted to like use the KV cache of the writer and keep it on the job in the same register"

**8.5 — 2 times (11-03, 11-09).** Its workers commit straight to `main`. The coordinator then reads their commits and asks whether it would have done anything differently. Once the reviews show the workflow sound, the review stops. Nothing holds its result.

- 2026-11-03T06:20:02Z [LW H18]: "So you should let those workers commit directly, and your review should be just looking at their commit, at the diff that they made. [...] Would you have done something else differently than the workflow? That's your task. [...] And then if everything is fine, we stop the review practice because we rely on the behavior encoded in the workflow itself."
- 2026-11-09T09:27 [C]: "No, don't hold the record update. Let it land as the batch wrote it."

**8.6 — 2 times (11-01, 11-24).** Its input includes what the landed batch reported. It takes each rung's findings and sorts each into its home.

- 2026-11-01T23:10 [LW H10]: "the goal here would be to get the new facts and stuff from, I believe, from a report of the landed batch is also considered an input."
- 2026-11-24T14:34 [LW H36]: "Fix where an entry is born. You are saying rank [rung] hands over findings and the landing sorts each. That was the purpose of the landing workflow." The words "a rung hands over findings, and the landing sorts each one" were the coordinator's proposal in [R]; his message takes them up as his.

**8.7 — 2 times (10-22, 11-05).** Its tools and their use are written in the skills. Its chain also gives him a page of the worker skill's changes, as diffs.

- 2026-10-22T08:35:58Z [LW H04]: "So these tools that we will apply need to be documented in the skills."
- 2026-11-05T12:01:53Z [LW H23]: "Can we make that part of the landing batch workflows? I mean, after the code reader updates everything in the skills, just from the landed changes."

**8.8 — once.** It keeps only what is relevant in FACTS. A workflow that lets FACTS grow unchecked fails its job.

- 2026-11-24T09:20 [LW H31]: "That process has a failure somewhere because it's not doing its job of consolidating the record. [...] It is running for a long time, and it still allows the growth to go unchecked." and "our post-landing process is not doing this record consolidation part that was supposed to be keeping only relevant things in there."

**His yes to the coordinator's design.** At 2026-11-02T00:29:16Z [LW H13] he answered "Yes to all eight" to the coordinator's eight defaults for the design (quoted whole in [LW], heading 2, "Other coordinator statements"). Among them: "3. The pass covers every entry the batch added or changed"; "4. Its homes: FACTS, POSITIONS, their histories, the ledger rows it names, INDEX, PLAN and its history, the review queue, and line fixes in other notes. Not the skills, not the orientation."; "7. Your rule of 31 October goes into its briefs: a POSITIONS sentence that the tree made false changes by the fewest words, lands without your yes, and is named in the landing report; any change of what you decided is held for you." These are the coordinator's words. The ask did not tell him that the design leaves the consolidation to another tool (Part 3).

**Open**

- **8-A.** Beyond the batch's own entries and the entries that they repeat or make false (8.3), does each landing also consolidate the section that a new entry joins, so that the record stays sorted by subject? (Of FACTS's 299 entries over 600 characters, 115 never came within any run's reach: `evidence/landing-workflow-traced.md`, "The answer in short".)
- **8-B.** Does each landing run the test of decisions (4.13), or does it run only when whole sections are consolidated? The design left the quiz out and gave no reason (`evidence/landing-workflow-traced.md`, section 1).

---

## Part 2. What he accepted and what he refused, in order of time

1. **2026-09-27, the first POSITIONS cleanup.** Refused: too much cut for too little size. 05:03:34Z [A]: ":-/ so we overdid it with the compression in POSITIONS? But did not win that much in size. Damn." 05:07:04Z [A], on the audit that puts every deleted text in the history: "1. Yes. Wasn’t that already the case???!?"
2. **2026-09-30, the FACTS and POSITIONS consolidation of 09-29.** Accepted a Fable check's fixes; judged the size result poor. 05:14:54Z [A]: "please let's just apply them. I trust Fable knows what it was doing." 11:32:33Z [A]: "I don’t see a decrease in context size from consolidated FACTS and POSITIONS.  Any thoughts?"
3. **2026-10-02, short rung entries and one pass that shortens the old ones.** Accepted. 10:52:50Z [A]: "FACTS option 2 now. Before we launch batch 8."
4. **2026-10-13 morning, the night's FACTS rewrite (303K to 259K characters).** Refused as not meeting its goal. 08:01:03Z [B1]: "What did it buy us?" 08:11:59Z [B1]: "No benefit for what cost in terms of tokens during rewrite?"
5. **2026-10-13, the trial on ten entries, with its test of decisions.** Accepted as the method. 14:29:44Z [B1]: "We, we have now established that we have a good method. [...] with that edit, uh, I think we now have a template that we can use uh, to rewrite it." His page comments on the trial are not in these sources (see "A gap in the sources").
6. **2026-10-13 evening, the overnight run.** Approved, with Fable's adversarial review refused. 17:13:20Z [B1]: "you have my approval to run overnight to the consolidated record". 17:16:41Z [B1]: "I don't think I want adversarial review by Fable."
7. **2026-10-13 night, the consolidated record.** Accepted. 22:58:46Z [B1]: "Read the Overnight Run, 13 October. Skimmed the consolidated record and skill. All LGTM."
8. **2026-10-16, the boot after the consolidation.** Accepted. 06:15:51Z [B1]: "Looks like the consolidation payed off.  195k is good."
9. **2026-10-21, the page of the POSITIONS correction trial.** Refused its form. 22:49:24Z [B1]: "I thought you will show me there the corrected entries, not just a summary of what happened. [...] You haven't showed me the before and after of all those records."
10. **2026-10-22, version 11 of the POSITIONS page.** Partly accepted; the wording refused as too compressed. 05:28:32Z [B1]: "I think you are doing good already with the proposed changes, but [...] They are overly compressed and they usually require the knowledge of the conversation that produced them"
11. **2026-10-22, the clarity rewrite: its pass over POSITIONS, then its run over FACTS (launched 10:10).** Accepted, with the growth. 08:19:30Z [B1], on the POSITIONS pass: "I felt the tone was good. [...] So, yes, I understand the size increase. I think that's just the cost we are willing to pay for Clarity. [...] So I think I can approve this and as a run". On both, later: 2026-10-23T08:24:43Z [B1] "the rewrite of positions and facts for readability that inflated them a little bit"; 2026-11-24T09:20 [C] "then we did a rewrite for clarity, which grew it, and I accepted that growth."
12. **2026-10-22, the coordinator's glossary and rules for writing the record.** Refused. 16:28:00Z [B1]: "I am not approving anything from the above. [...] It was horribly vaguely written. It's a convoluted system with no clarity of rhyme or reason or purpose."
13. **2026-10-22 night, the audit's drafted improvements to the record, and two rule changes for the skill.** Accepted unread. 22:12:33Z [B1]: "I think we should apply all the improvements drafted. I guess they are better then previous state of the record. I simply don’t have a capacity for manual review now." 22:19:08Z [B1]: "Skill wording changes fully agreed and approved."
14. **2026-10-26, the page of thirteen rewritten positions.** Refused. 19:08:27Z [B2]: "It is in the Claude speak. It is not in the ASD-STE100 register. It is not written as a timeless position. [...] It expands several times over the allotted position length."
15. **2026-10-28, the pilot of four positions and its page.** Refused, form and content. 21:45:06Z [B2]: "The new wordings need to go in as diffs, like before, with original collapsed, reasons below (outside selection range). Current rewrite doesn’t cut it yet." 22:19:09Z [B2]: "the positions contain too much detail and references which should be the historical record"
16. **2026-11-02, the design of the record-landing workflow.** Accepted. 00:29:16Z [LW H13]: "Yes to all eight"
17. **2026-11-02, the rewording of P-7 and P-26.** Accepted. 16:42:44Z [B2]: "The rewording of P7 and P26 as worded in the latest revision 15 is accepted."
18. **2026-11-02, the skill's rule 17 with rules 18, 19 and 21 (the landing's consolidation).** Accepted. 21:20 [LW H16]: "LGTM"
19. **2026-11-03, the workflow's first live landing, held by the coordinator for a hand step.** Refused. 06:20:02Z [LW H18]: "You should not hold the workers' work and then cherry picking the result. That's unnecessary work for you as a coordinator."
20. **2026-11-03, the orientation that admitted none of the landing's 21 entries.** Questioned, not refused. 18:09:39Z [LW H20]: "Are you saying that nothing needed to be updated because the defaults that workers assumed are in line with the current state of the repo [...]? Is that it?"
21. **2026-11-03, the page of the post-mortem of 10-28.** Accepted as done. 19:00:54Z [LW H21]: "I think we applied all of its lessons into the skill update. We've revised the clarity workflow, made it part of the post-landing workflow."
22. **2026-11-06, the revival page after the landing of batch 26.** Refused: not updated. 04:24 [LW H25]: "Why wasn’t this updated as part of the post landing workflows yet?"
23. **2026-11-06, the page for reading 800 reconciled ledger rows.** Refused. 08:33:23Z [B2]: "You are reconciling 800 ledger rows and I should read all of them? Fuck no!"
24. **2026-11-08, skill changes that wrote one path's behaviour into the worker skill.** Refused. 15:17 [C]: "there was no way for me to accept those changes into the Fortran [Fortress] repo skill being written"
25. **2026-11-19, the page of the worker skill's landed changes.** Refused its form and the practice. 06:37 [C]: "We lost the diffing, which shows me the original source." and "this the crudest of attempts at recursive self-improvement, where you are improving your own skills after landings, shows why the whole idea is just a fantasy."
26. **2026-11-24 07:35, the coordinator's proposal to split INDEX and trim FACTS.** Refused. [C]: "Regarding your proposal on splitting the index and trimming the facts, reject it. [...] It is reoccurrence of the old problem."
27. **2026-11-24 09:20, the record-landing workflow's results and a worker's account of FACTS's growth.** Refused. [C]: "I don't think Opus Worker did a very good job of summarizing." and "That process has a failure somewhere because it's not doing its job of consolidating the record."
28. **2026-11-24 13:17 to 13:50, today's pilot page, four entries.** Refused as a whole; one cut accepted.
    - F-252, 13:17 [PC]: doubtful. "this seems like very aggressive cutting. [...] I would not try to trim the entry too much."
    - F-53, 13:28 [PC]: accepted. "I'm like fine with this cut because I don't care about it anymore. It's behind us."
    - F-396, 13:41 [PC]: refused. "So I would not approve launch under these conditions. This is a red flag here."
    - F-63, 13:50 [PC]: old and new text refused. "It seems like a random potpourri of unrelated facts. [...] This seems very wrong."
    - 13:53 [C]: "this is not good consolidation, and it seems like we have a problem with the record keeping."
29. **2026-11-24 14:05 to 14:07, five chunks applied to FACTS without his approval.** Refused; revert ordered. 14:06 [C]: "Stop immediately, revert everything to the pre-pilot state."
30. **2026-11-24 14:22 and 14:34, the restored record and the coordinator's restatement.** Accepted, with corrections. 14:22 [C]: "It's good that you restored the record. You have correctly understood the problem here." 14:34 [LW H36]: "It is mostly fine, but your proposal, how to resolve it." 14:38 [LW H37]: "This is not only my order of this morning, this is my original order for creating the landing workflow".

---

## Part 3. Where his purpose for the landing workflow was lost

From `evidence/his-words/landing-workflow-order.md`, headings 1, 3, 4 and 5.

1. He ordered "a new standing procedure, how the batch landings get incorporated into a record, by a separate worker with small fresh context" at 2026-10-20T17:14:47Z (H01), and on 2026-10-22 at 08:19:30Z asked that the process with its cold reader be encoded and run on the facts after each landing (H02).
2. At 2026-10-28T23:07:04Z he recalled that he had asked for "workflow creation to make this reusable", and said that the consolidation is "of facts added/edited after the batch landing" (H07).
3. In page comments of 2026-11-01 at 23:03 and 23:10 he asked for "a consolidation of a record" of facts, positions and index, and for "a reusable workflow after the batch lands" that encodes "the successful part of the process": a step that gathers evidence as the scouts did for each chunk, and an Opus writer that consolidates (H09, H10).
4. The coordinator's message of 2026-11-01T23:40:32Z still named the job "the record's consolidation after a landing".
5. The design brief of 2026-11-01T23:42:21Z is the first text that states the purpose without the consolidation: its paragraph "The problem" says that the record "must be brought in line with what landed" and names the hand route of climb batch 24, a record writer and a routing worker, as the work to replace.
6. The brief gives his words on consolidating the record only as quotes and as a question of scope, and the paragraphs of it that the scout found name neither the consolidation of 10-13 nor its method.
7. The design note's first commit, `5384a4f35b` of 2026-11-02 00:08:31, says at its line 143: "The clarity workflow stays the tool for a consolidation, when entries drift. The landing workflow can name entries for it, and does not do its job."
8. The ask that he answered with "Yes to all eight" at 2026-11-02T00:29:16Z (H13) described the job as the hand route and did not say that the design leaves the consolidation to the clarity workflow.
9. At 2026-11-02 22:03:56, commit `5114bfeceb` put into the coordinator skill "After a batch lands, the record-landing workflow consolidates its entries", on his LGTM of 21:20 to the coordinator's draft (H16), so the skill gave the workflow the job that its design note says it does not do.
10. No later brief of the workflow that the scout found names the consolidation; the fix of 2026-11-02T02:32:44Z added only a judge rule that holds an entry past 600 characters that grows, and told the writer to "move detail to the skill's part first".
