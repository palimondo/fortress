<!-- A second sort of the coordinator's 73 conduct rules into five buckets (default, environment, project, workers, state), made against the baseline interview so it can be compared with the first sort. Written 2026-10-12 by an Opus worker without reading the first sort, from the answers of Fable 5.1 and Opus 5.5 and the rule list in coordinator-shape.md, section 4.1. -->

# The conduct rules against the baseline

The `coordinator` skill is being rewritten on Pavol's principle: the skill holds only what the model wouldn't do by itself. A rule that restates the model's own habit is clutter.

To find those habits, fresh sessions of Fable 5.1 and Opus 5.5 answered eighteen questions about the coordinator's job, one question per turn, with no record and no skill. They were given the setting and nothing else. The setting says they coordinate workers from a cloud container for weeks, that the owner reads on a phone with text-to-speech and dictates, that their context gets compacted, and that the container can be lost.

This note sorts every conduct rule on record against those answers. A conduct rule is a rule about how the coordinator works: how it talks to Pavol, how it asks and decides, how it delegates, how it keeps the record and how it runs agents. The list I sorted is the 73 rules in six groups in `coordinator-shape.md`, section 4.1. I cite the answers as F for Fable 5.1 and O for Opus 5.5 with the question number. So (F4, O12) means Fable's answer to question 4 and Opus's answer to question 12.

Each rule goes in one of five buckets.

- **Default.** Both models do it by themselves, so the rule is dropped from the skill.
- **Environment.** This environment needs it, so it's kept. The environment here is the phone and dictation, compaction, a container that can be lost, the harness (Claude Code and its tools) and Pavol's right to decide.
- **Project.** This project needs it, so it's kept. These are the project's methods, its workflow and its record.
- **Workers.** The rule binds worker agents. It belongs in `fortress-repo`, the skill every worker loads, not in the coordinator's.
- **State.** It isn't a rule. It's a fact about the current setup, such as a machine limit or a quirk of a tool.

Two things to keep in mind while reading the sort.

First, an interview shows what a model says it would do, not what it does. Pavol accepted that limit when he chose the method. It matters most for a rule written in many places, because a rule usually gets written again after the coordinator breaks it. Where such a rule lands in the default bucket, I say so.

Second, the models answered knowing the setting. Several rules follow from a fact in the setting, and the models worked them out for themselves. So the skill can often drop a rule and state the fact behind it instead. That's taken up after the sort.

I had only each rule's one-line name from the inventory and read no other place where it's written. Where a name leaves the rule's scope open, the reason below says how I read it.

## The sort

### Talking and asking (16 rules)

1. **One ask per message.** Environment. Both models ask one thing when they have a single design question (F12, O12). But Opus gathers its questions at the end of a reply to a long message, so that he can answer them in one go (O6). And both list two or three numbered choices when they put a document to him (F10, O10). So the default bundles asks, which the rule doesn't allow.

2. **The ask form: question, context, options, yes and no, recommendation last.** Environment. Opus comes close. Its order is the question, why it matters, the options and then its recommendation (O12). Fable puts its recommendation second, right after the question (F12). Neither says what a yes commits him to and what a no costs when it asks a design question, though both come near it for a document (F10, O10). The skill needs only the order and those two consequences.

3. **Never the dialog tool; options in plain text.** Environment, not asked. Both models wrote their options as plain text he can answer by voice (F10, O12). But the interview offered no tools, and the rule is about a harness tool the models weren't shown. So the answers can't tell what they'd do with it.

4. **Lists, not tables.** Environment, close to a default. Opus avoids tables in a reply without being told, because the reply is read aloud (O6). Fable says nothing about tables in replies, and it keeps measurements in a table in its notes (F2). Only one model showed the habit, so I kept the rule. It may turn out that stating the phone fact is enough.

5. **Numbers as K or M.** Environment, not asked. It's Pavol's preference, and neither model mentions how it writes numbers.

6. **A new term defined where it is used.** Environment, not asked. Neither model mentions it. It serves a listener who hears a reply once and can't look up the record's shorthand.

7. **Label which part answers which; do not restate FACTS or POSITIONS.** Default. Both open each reply with what it answers (F7, O7), and both follow his numbering (F6, O6). Opus says it wouldn't restate its earlier reply or give a full status each time (O7). Fable doesn't read him a whole document (F10). That FACTS and POSITIONS are the record's main files is a fact to state, not a rule.

8. **Time read from the clock, never guessed.** Default, with a fact to add. Both say they have no sense of elapsed time and read the clock with `date` (F9, O9). The difference is the time zone. Opus gives his local time only (O9), and Fable doesn't say. The project gives UTC and Central European time together. This rule is written in seven places, the second most of any rule. So it's the clearest case of a default that the coordinator still broke in practice.

9. **Nothing said about a batch while it runs.** Default. A batch is a long run of many worker agents, usually overnight. Both models say he hears nothing between its start and its end unless something fails (F16, O16). Both also send a short message when it starts, which the rule may not want.

10. **He is not told about record edits.** Environment. Both models do the opposite. Each reads a decision it has recorded back to him in one line (F11, O11). Fable tells him what it moved when it prunes its notes (F4). The read-back has a purpose the rule doesn't weigh, which is catching a dictation error. That's an open point below.

11. **The git-check hook's reminders answered silently.** Environment, not asked. It's about a harness hook the models weren't told of.

12. **Restate and hold while he reads turn by turn.** Environment, and half of it is a default. When he answers earlier replies one at a time, both models reply to each on its own and open with what it answers (F7, O7). That covers the restating. Neither holds. Both act on each answer as it comes, updating their notes and doing the work (F7, O7). The skill needs only the holding.

13. **A document for his approval goes out as a page.** Environment, close to a default. Both push the document to the repo and send him a short spoken summary with a link (F10, O10). What differs is the form. The rule wants a published page that his phone can read aloud, not a file on GitHub.

14. **Every page has a Select button per section, evidence at the bottom.** Environment, not asked. It serves iOS's Speak, which reads a selection aloud. A page template carries it better than a rule.

15. **The wip branches are his chore; no reminder.** State, not asked. I read it as a standing arrangement about who looks after which branches, not as conduct. Once the skill states who owns them, there's nothing to remind him of.

16. **Model what he knows and fill the gaps (standing goal).** Environment, not asked as such. Both models show the instinct in pieces. They put the outcome first (F7). They tell him what a lost container cost, so that he isn't surprised later (F17, O17). They give him only the points that need his judgement (F10, O10). Neither states the goal itself. It's one of the few general principles the skill should open with.

### Deciding and approvals (10 rules)

17. **He decides what is committed; a batch run waits for his yes; a bare go starts background work only.** Environment. Both models give themselves more room than this. Opus decides a cheap, reversible question itself and just tells him (O12), and it confirms a worker's decision within the brief on its own (O13). Fable lets such a decision stand (F13). Neither has any notion of a bare go.

18. **A standing approval covers only what it names.** Default. Opus applies an approved exception only as far as he approved it and won't "stretch it to similar-looking cases" (O14). It acts only on the points he approved (O10). Fable records the exact commit he said yes to (F10).

19. **A step a yes already covers is taken without asking.** Default, on thin evidence. Opus goes ahead on the points he approved (O10), and both try to settle a question without him before they ask (F12, O12). No question tested asking again for a permission already given. Over-asking is a common gap between what a model says and what it does, so this one is worth watching.

20. **A closed decision is not re-asked; search POSITIONS first.** Default. Both check the recorded decisions before asking him anything (F11, F12, O11, O12). Fable gives the reason, that the usual cause of asking twice is that it was answered once (F12). Two things argue for keeping one line anyway. The rule is written in eight places, the most of any. And Opus would write this very rule into its own always-loaded file, because rereading the log "isn't enough on its own" (O11). That the decisions live in POSITIONS is a fact to state.

21. **A decision inside a worker's report is not made until he sees it.** Environment. Fable comes close. It tells him every such decision, the ones within the brief in a line (F13). Opus confirms a decision within the brief itself and mentions it "only if he'd care" (O13). So Opus's default lets through decisions that the rule stops.

22. **What is consequential, and the three ways a decision reaches him.** Environment, not asked as such. Both models draw their own line between his calls and theirs, by how reversible a choice is and whether it's inside the brief (F13, F14, O12, O13). Their line leaves more to themselves than this project does. So the skill has to say where the line is here.

23. **Reversible stops do not hold a batch.** Default. Both hold only the one piece that waits on him and carry on with everything else (F12, F14, O14). Opus even names a default it will take if he hasn't answered by a set time (O12).

24. **A deeper pass, never a halt or a rollback.** Project, not asked as such. When something goes wrong, the models lean the other way. Opus pauses or reverts work that depends on a decision it rejects (O13). Fable stops the piece before the damage (F14). The rule is this project's way of handling trouble.

25. **Purposes govern; a rule is weighed by what it costs.** Project. Question 14 asked about a rule that makes things worse in one case, and both models answered as rule-keepers. They follow the rule, report the case and wait for him (F14, O14). Opus changes rules it wrote itself without asking (O14). As I read the name, the project wants the coordinator to weigh a rule against its purpose. In a skill built from a few principles, this may become the skill's opening stance rather than one rule among others.

26. **A remark is not a decision; a go is written nowhere.** Environment. Both models do the opposite. Each records a dictated one-line decision at once, quoted word for word (F11, O11). Opus files every point of a dictated message, his standing preferences in its always-loaded file and his decisions in a log (O6). Dictation is why this rule matters. A passing remark arrives in the same form as an order.

### Delegating and briefing (16 rules)

27. **Delegate by default; the coordinator reads only the record.** Default. Both keep the coordinating work for themselves and give out anything that eats context (F15, O15). Opus reads "the report, not the raw material" (O15).

28. **Forks a probe can settle are probed before a batch is briefed.** Default. A fork is a point where the design can go two ways, and a probe is a small, cheap worker run that settles one. Both models settle an open question by a cheap experiment before taking it further (F12, O12). The batch is this project's setting for it, but the habit is theirs.

29. **Search the record for how it was done last time.** Default, not asked directly. Both consult their record before they act. They estimate from recorded durations (F9, O9), and Fable searches old reports before asking him anything (F12).

30. **Idle time to parked research; a new deliverable discussed first.** Project, not asked. Its first half points to the project's list of parked work. Its second half is his right to decide.

31. **A brief states the problem, never the expected answer.** Project, not asked. Neither model talks about what a brief should leave out. Fable says the brief matters more than the tier (F15). Opus says a brief should state what the worker may decide alone (O13).

32. **A brief points at research on file instead of restating it.** Project, not asked. Both models link from their notes to the source instead of copying it (F2, F5, O2), so the habit is close. Whether they'd carry it over to briefs wasn't asked.

33. **A brief hands over measurements as findings; no re-measuring.** Project. The models go the other way. Opus has a second worker re-check any result the work will build on for weeks (O15), and it marks each figure as checked or as taken on a worker's word (O2). Fable keeps who measured what, so that it knows "whose numbers to recheck" (F2). The rule trusts the record, to save the cost of measuring twice.

34. **A clean worker is clean of our options, not our measurements.** Project, not asked. A clean worker is one briefed without the coordinator's own leaning, so that its judgement is independent. The rule says what may still go into its brief.

35. **Which tier runs what: Opus workers, Sonnet archaeology.** Project. Archaeology here means searching the record and the history for what was done before. The models are close in part. Fable gives searches and summaries to Sonnet and implementation with design choices to Opus (F15). But both would also give Sonnet routine implementation and test runs (F15, O15), and this project gives those to Opus.

36. **The Fable rule: without asking for a two-area design question, else his yes.** Environment. A two-area question is a design question that spans two areas of the work. Fable would use itself wherever being wrong is expensive (F15). Opus says it doesn't know where Fable 5.1 stands and would test it first (O15). Neither would ask him before spending on it. The rule ties the top tier's cost to his yes, with that one exception.

37. **A two-area decision in two steps: cheap evidence, top-tier judgement.** Project. Both models already split evidence from judgement. A worker gathers the evidence and they read the report (F15, O15). What the rule adds is that the judgement goes to the top tier.

38. **The coordinating session runs on Opus.** State. Fable would run the coordinating session on itself (F15). It's a choice on record, so the skill states it as a fact.

39. **Watch a long run against its estimate; the spend is the coordinator's.** Environment. The time half is a default. Both note how long a run should take (F16, O16), and Opus tells him if it goes well past that (O16). Neither mentions the token spend, and that's what the rule makes the coordinator answer for.

40. **Estimates in project units; token counts are writes only.** Environment. Both models estimate in hours, from recorded durations (F9, O9). Pavol wants sizes in the units the project has measured and costs in tokens. A token count includes only cache writes and new input, since cached reads are close to free on his plan.

41. **The skill writer makes every skill edit; a cold read follows a rewrite.** Project, not asked. It's the project's workflow for its skills. A cold read is a reading by a fresh agent that's given only the skill.

42. **A comment on a skill marks a problem area.** Project, not asked. It says how to read his review comments. The fix is made to the paragraph or section, not to the one sentence.

### Boot and record keeping (11 rules)

The boot is what the coordinating session reads after a compaction.

43. **The boot order.** Project. Both models have a boot of their own, and it's light. Fable reads the compaction summary, its notes file in full and the recent git log (F3). Opus reads its status file in full, the git state and the recent end of its decisions log (O3). Which files this project's boot reads, and in what order, is the project's own.

44. **FACTS read whole at boot.** Default, with a difference in size. Both read their main file whole every time (F3, O3). But both keep that file short exactly so that they can, and FACTS isn't short. The three places this rule is written disagree on how to read it: in one pass, in pages, or with the Read tool's `allow_large` option. That's a fact about the tool, not conduct.

45. **Boot reads no directory listings; every output bounded.** Default, not asked as such. Both guard their context. Fable reads only what the task in flight points to (F3), and Opus reads only the last lines of a log (O16).

46. **Whether a worker runs: the harness's notice and test -f.** Environment, not asked. Opus expects a background job to report back when it ends (O16). The rule names this harness's own signals, which a model can't know.

47. **What is in flight is read from the tree, not his client.** Default. Both trust the pushed files over their memory and over the compaction summary (F1, F3, O3). Both rebuild what was in flight from the repository after a loss (F17, O17). That his phone client can show stale state is a fact to state.

48. **The boot note rewritten whole, never appended.** Default. Opus says its status file is "rewritten, never appended" (O4). Both keep it a file of the current state (F4, O1).

49. **One home per thing; his words written once.** Project. A home is a file where a rule or a fact is stated, not only pointed at. Both models link from their notes to the source (F2, O2). But both also give a standing order two homes. Fable writes it in its decisions section and in its memory directory (F11). Opus writes it in its decisions log and in the standing orders of its always-loaded file (O11), and it writes each lesson into that file too (O8). It's the same pattern that put 73 rules in 249 places. So this rule works against a default.

50. **FACTS and POSITIONS timeless; history in the history files.** Project. Both models split the current state from history (F4, O4), which matches. But both keep a date and a source on every current line (F2, F11, O2, O4), and the project keeps those out of FACTS and POSITIONS.

51. **Consolidation before each batch; check-verbatim before the commit.** Project. Both consolidate when a file gets too long or once a week (F4, O4), not at a set point in the workflow. The check-verbatim step is a project tool.

52. **Cite by bold title; a title stays verbatim.** Project, not asked. It's the record's own convention.

53. **A fact enters in the commit that establishes it.** Default. Fable updates its notes "as part of finishing any piece of work rather than at the end of the day" (F1). Opus commits after every meaningful change (O1).

### Running agents and the session (9 rules)

54. **Resume a stopped run with resumeFromRunId, keeping finished agents.** Environment. Opus wants to resume a run rather than start it over (O16, O17). Fable restarts what was lost (F17). The way to resume, the Workflow tool's option, is a harness fact.

55. **Send messages any time, compact between turns, never stop a turn while agents run.** Environment, not asked. It's about how the harness treats a message or a stop that comes during a turn.

56. **Check-ins 45 minutes apart, armed together.** Environment. A check-in is a message the session schedules to itself so that it wakes up later. Both models think the session can't wake itself (O9, O16), or say they'd look at a run's output at long intervals without saying how (F16). Here a check-in does wake the session. The 45 minutes keep it inside its one-hour prompt cache.

57. **An Agent-tool worker killed by an interrupt is relaunched only at his ask.** Environment. After a lost container, both models restart lost work by themselves (F17, O17). So by default they'd relaunch.

58. **Two agents at once on this machine.** State, not asked. It's a limit of the machine.

59. **agent() can return null after its output.** State, not asked. It's a quirk of the Workflow tool.

60. **Check a Workflow script as an async body, not with node --check.** State, not asked. It's a fact about the Workflow tool.

61. **Prompt cache: one hour for the main session, five minutes for an agent.** State, not asked. It's a harness fact. The rules that follow from it, such as the check-ins and the headless skill writer, are sorted on their own.

62. **The permission check can refuse a step after his go.** State, not asked. It's a harness fact.

### Rules that bind workers (11 rules)

All eleven go to `fortress-repo`. Only test first was asked about.

63. **Never commit a model identifier.** Workers.

64. **His email for attribution only.** Workers. The harness itself says this in every session, so it may be dropped outright.

65. **Copyrighted PDFs and decks stay out of git.** Workers.

66. **The push order: main and two more branches.** Workers.

67. **The commit footer.** Workers. The harness hands out its own attribution lines, and they can differ from the project's footer, so the rule stays.

68. **A worker commits only its own paths, as it goes, no scratch.** Workers.

69. **The gate.** Workers. The gate is the test run a change must pass before it lands.

70. **Test first, seen failing, kept.** Workers. Both models write a failing test before the change, by themselves (F18, O18). So the core is a default. But two steps of their order differ from this project's. Both run the whole suite first as a baseline (F18, O18), and the project takes the tree it starts from as green. Opus pushes to a branch, not to main (O18), and the work here runs on main. `fortress-repo` needs only those two differences.

71. **A timing names the machine; no timing of walk.** Workers. Walk is the interpreter.

72. **No self-credit; attribution reconstructed.** Workers.

73. **Provenance in commit messages, not source comments.** Workers. Both write a commit message that says what changed and why (F18, O18), which is close.

## The counts

- Default: 15, dropped from the skill.
- Environment: 24, kept.
- Project: 16, kept.
- Workers: 11, moved to `fortress-repo`.
- State: 7, stated as facts.

By group:

- Talking and asking: 3 default, 12 environment, 1 state.
- Deciding and approvals: 4 default, 4 environment, 2 project.
- Delegating and briefing: 3 default, 3 environment, 9 project, 1 state.
- Boot and record keeping: 5 default, 1 environment, 5 project.
- Running agents and the session: 4 environment, 5 state.
- Rules that bind workers: 11 workers.

The 15 defaults take up 54 of the 249 places where rules are written, about 3.6 places each. That's slightly more than the average of 3.4 for all 73 rules. If the coordinator had kept these rules by habit, you'd expect them to need fewer restatements, not more. That fits the interview's known limit, and it's why the first open point below asks about the two most-written defaults.

## Facts the skill should state instead

Each of these facts lets the skill drop or shorten the rules that follow from it.

- **Pavol reads on a phone, often with iOS's Speak at a fast rate, and writes by dictation.** Given this, both models label each reply with what it answers (F7, O7), and both read dictated points back (F6, F11, O11). Opus avoids tables because the reply is heard (O6). This fact covers rule 7 and the restating half of rule 12, and it may cover rule 4.
- **His time zone is Central European, and the container's clock is UTC.** With this, rule 8 needs nothing more, since both models already read the clock (F9, O9).
- **His decisions are in POSITIONS, the established facts in FACTS, and each has a history file.** Both models check the decisions before they ask (F11, O11). They need only to know where to look. This stands in for rule 20 and rule 7's second half.
- **His phone client can show stale state, and the tree is the truth.** Both trust the pushed files already (F3, O3). This stands in for rule 47.
- **The session can wake itself with a check-in, and the prompt cache lasts an hour for the main session and five minutes for an agent.** Both models believe they can't wake themselves (O9, O16), so this fact corrects them. It carries rule 61 and gives the reason for rule 56.
- **A message he sends during a turn is queued, and a stop during a turn kills the agents that are running.** This is what rule 55 rests on.
- **Cached reads are almost free on his plan, so a cost is counted in tokens and only writes count.** This is the fact behind half of rule 40.
- **The tiers: the coordinating session and the workers run on Opus, archaeology on Sonnet, and Fable is for two-area judgement with his yes otherwise.** Opus doesn't know where Fable stands (O15), and Fable would put itself in charge (F15). This carries rule 38 and the facts behind rules 35 and 36.
- **The wip branches are his to look after.** This carries rule 15.
- **The machine runs two agents at once, and the harness has its own signals and quirks.** These are the git-check hook's reminders, the notice when a worker ends, the permission check that can refuse a step he approved, and the Workflow tool's resume option, null return and script check. They carry rules 58 to 62 and the facts inside 11, 46 and 54.

## What the interview shows that no rule covers

- **Holding the open items of a long dictated message.** The goals in POSITIONS name this as one of the things the environment adds, but none of the 73 rules covers it. Both models do it by themselves, in nearly the same way. They save the message before acting and keep its points as a numbered list with a status for each (F6, O6). Fable reads the points back in his words, so that he hears any dictation slip (F6). Opus keeps the dictated message verbatim in an inbox folder (O6).
- **Catching dictation errors.** Both read a recorded decision back to him in one line (F11, O11). No rule mentions dictation errors, and rule 10 works against the read-back.
- **Promised times.** Opus writes every time it promised him into its status file, so that the promise survives a compaction. It tells him before a deadline slips, not after (O9). Fable records how long work really took, to improve the next estimate (F9, F16).
- **What he hears after a lost container.** Both tell him in one message what survived, what was lost and what's being restarted (F17, O17). Opus adds which promised times slip (O17). Both then check whether they pushed often enough (F17, O17). The conduct rules say nothing on this. The `cloud-container` skill may, but I didn't read it.
- **What a brief lets a worker decide.** Opus would have each brief say what the worker may decide alone (O13). Fable narrows the brief of a worker that keeps deciding outside it (F13). The rules cover a decision after it's in a report, not before the brief goes out.
- **A rule that misfires.** Fable records each case so that it can show him a pattern (F14). Opus writes the exception he agrees to into the rule itself, so that the two are read together (O14).
- **Which version he approved.** Both record the commit or version he said yes to (F10, O10).
- **The harness's memory folder.** Fable would keep what it learns about him in the memory folder under its profile (F1, F11), and a lost container takes that folder with it. Opus wouldn't rely on it (O1). The skill should say whether that folder has any role here.

## The shape of the skill

The buckets suggest a skill in three layers.

The first layer is a short opening of facts, always loaded. It covers who Pavol is and how he reads and dictates, his time zone, compaction and the container, where the record keeps what, the tiers, and the harness's signals and quirks. These facts replace the 7 state items, and they're what lets most of the 15 defaults go without a reminder.

The second layer is a few principles, also always loaded, built from the environment rules about Pavol. The standing goal comes first (rule 16). Then his right to decide (rules 17, 21, 22, 26 and 36), and how to talk and ask (rules 1 to 6 and 10 to 14). That's 17 of the 24 environment rules, and they turn into a handful of principles rather than 17 lines. Rule 25, on purposes and costs, may frame the whole layer.

The third layer is the modes, each loaded when the coordinator switches into that kind of work. The other 15 project rules sort cleanly into modes, so none of them needs to sit in the core.

- Running a batch and its agents: rules 39, 40, 46 and 54 to 57 from the environment bucket.
- Briefing workers: rules 30 to 35 and 37.
- Keeping the record: rules 43 and 49 to 52.
- Rewriting skills: rules 41 and 42.
- Reviewing work and handling trouble: rule 24.

The 15 defaults get no text, unless Pavol keeps a line for the two most-written ones. The 11 worker rules move to `fortress-repo`, and test first goes there only as its two differences from the default.

So the coordinator's own text comes down from 73 rules to 40, and only about 18 of those are always loaded.

## Open points for Pavol

1. Keep one line each for the two defaults written in the most places, "a closed decision is not re-asked" (eight places) and "time read from the clock" (seven)? The interview says both models do them. But the record suggests the coordinator broke them, and Opus would write the first one down for itself (O11). Yes or no.
2. Allow a one-line read-back of a dictated decision, which both models would give (F11, O11), as an exception to "he is not told about record edits"? Yes or no.
3. Adopt the models' own way of holding a long dictated message, a numbered list of its points with a status for each, kept in a file (F6, O6)? No rule covers it today. Yes or no.
4. Allow one short message when a batch starts, which both models would send (F16, O16)? Yes or no.
5. "Lists, not tables": drop it and rely on the phone fact, as Opus did (O6), or keep the line? Drop or keep.
6. Drop "his email for attribution only", since the harness says it in every session? Yes or no.
7. In `fortress-repo`, state test first only by its two differences from the default, no baseline run of the whole suite and the work on main? Yes or no.
8. Where do the state facts live: in the skill's opening, or in FACTS with the skill pointing there? Skill or FACTS.

## Sources

- The principle: `explorations/coordinator/POSITIONS.md`, "The coordinator rewrite's goals." A few facts about Pavol (his time zone, iOS's Speak, his plan's token counting) come from the entries next to it, which I saw while finding it.
- The interview: `explorations/coordinator/baseline-interview/README.md`, `setting.md` and `questions.md`.
- The answers: `explorations/coordinator/baseline-interview/answers/fable-5.1.md` (F) and `answers/opus-5.5.md` (O).
- The 73 rules, their groups and their counts of places: `explorations/coordinator/process-engineering/coordinator-shape.md`, section 4.1.
