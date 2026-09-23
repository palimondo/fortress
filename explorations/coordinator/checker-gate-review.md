<!-- What Pavol said about the checker-count gate stage from 2026-09-20 to 09-23, checked against his recollection of 09-23 05:19; what the coordinator claimed about it and what happened; the stage as engineered, why it stalled climb batch 3, and the options with a recommendation. Written 2026-09-23 by a worker for the coordinator. Read-only on sources; the transcript tables were regenerated with postmortem-2026-09-19/parse.py into the session scratchpad and are not committed. Quotes are as spoken, dictation slips included; […] marks an elision. Times are UTC. One line per paragraph. -->

# The checker-count gate stage: what Pavol said, what it does, what to do

## 1. What was said

His recollection, 09-23 05:19:50: the batch stopped because of a new gate that runs the interpreter's library against the checker, that is where 93 comes from, the coordinator argued for it, he was skeptical, "But I said something along the line that I, I understand that you have invented a metric that gives us a target uh, to measure our progress towards switching to a single library. And this is now like the chickens come home to roost."

What he said about the stage, in order. His 70 messages from 09-08 to 09-19 never mention it.

- 09-20 15:15:59, after "The first rung: run the interpreter's library through the checker as a gate stage": "I, I have no idea what the second sentence part of the sentence means, but haven't we done this already? Haven't we quantified this?"
- 09-20 15:18:35: "Yeah, but like running this count, okay, gives you a metric, but it tells you nothing of how much work is to get the interpreter running with the compiler because there is the whole work with the type checker. Like, like are we confusing things that are unrelated? […] it is absolutely unclear whether... this has been priced in."
- 09-20 15:33:19, about the ladder work in general: "have we picked some kind of local minimum and just decided to climb? Because that was a target that was easily available in front of us, but it is Not really what we should have been doing."
- 09-20 23:47:59: "What were my concerns with Rung one's permanent check is a gate stage?" At 23:59:12: "Run transcripts archeology worker to recover my previous positions on the 93/92 gate".
- 09-21 00:38:01: "I’m not giving any yeses until I understand what I am agreeing to." At 00:50:29, quoting "The batch with the stage waits until you have seen the price.": "What are the consequences of the yeses? What does that work even want to do?"
- 09-22 04:45:52: "Prep please." This was the word the coordinator had asked for at 09-21 21:48:16. Its list included "2. The script edit that adds the count stage, in its own commit."
- 09-22 05:34:17, on the manifest's "93 to 2": "if I see the, the number drop from such a large count, like 93 to 2, I am uh, like asking why why can't we go to zero in in one fell swoop?"
- 09-22 05:56:07: "Sounds like something we should do now so that we get the uh, count to zero." Also: "this is the catnip. If large number in hundreds goes down to near zero, I want to get to zero."
- 09-22 18:37:26, when 2 became 41: "Explain the discrepancy. We did probe measurements before in the shadow. These were not estimates, AFAIK"
- 09-22 18:46:59: "Go". At 18:56:18: "Uh, briefings for rank giving them numeric targets that could halt our progress due to them not hitting them correctly or the skeptic will refuse them based on this or are we fine?"

How his recollection holds up:

- **Right:** the stage was new (script commit `7b93130a9`, 09-22 05:00), 93 was its first baseline, the coordinator argued for it, and he was skeptical. The batch did not land because of it (see below).
- **Not on record:** the "invented a metric that gives us a target" acceptance. He used the word "metric" once, as an objection, and never approved the stage separately. It came in inside "Prep please" and "Go". The coordinator promised twice to bring it back to him as a separate plan: at 09-21 02:36:16, "That comes back to you as a plan after the trace lands and after the `nat` lessons, in plain words, with the alternative you named: `nat` first", and at 20:55:34, "the gate stage you questioned, priced from what was measured. It comes to you as one message". Instead it went into the "prep" list.
- **The number did become a target**, on 09-22, in his own words ("catnip", "count to zero"). At 18:56 he asked exactly the question that predicted the stall.

What the coordinator claimed:

- 09-20 15:16:07: "\"Distance to the goal\" is that count: 93 now, zero when one library serves both worlds. […] a library or checker change that moves the count up or down is seen at once."
- 09-21 00:04:59: "The stage is a permanent check, not a re-measurement."
- 09-22 18:15:54, the batch summary: "The checker's count on the library falls from 93 to 23". At 18:46:08: "the declared count comes from a capture, not arithmetic" and "That stage is the instrument every later batch reads."
- 09-22 18:56:45, answering his numeric-targets question: "They cannot halt the run by themselves. […] The gate's rule is: a fall passes, a rise must be declared exactly. […] If it comes out 104, the gate goes red, the judge sees a declared number missed by two, and rules to declare the measured one and re-run the gate. One extra gate run, not a halt. So the machinery turns a missed number into a judge's ruling, never into a stop."
- 09-22 20:07:55, health check: "the count stage declares L's 102, since the relaxation is out". Rung L had committed its table on its branch 53 minutes earlier, titled "(103)" (`16ee212d0`, 19:14:13).

What happened:

- At 00:43 on 09-23 the gate read `COUNT UP 93 -> 103` against the declared 102. It was red on that stage alone.
- The review runs beside the gate. It refused, and after one repair it refused again, on records. The script then returned "review still blocking after one repair" (`climb-batch-workflow.js:1328`). That return comes before the code that handles a red gate (`:1341`), so no judge ever saw the count.
- A judge could not have "declared the measured one" either. The script reads the declarations from the manifest once, at `:1272-1277`. The re-run gate would have been red again, and the script returns "gate red twice" (`:1353`).
- So the 18:56 answer was wrong on both points. The 102 was a capture, but a capture of the triage's copy of the library, not of L's edit.

## 2. The stage as engineered

**What it is for.** One number tracks the milestone "the interpreter's library passes the compiler's checker": 93 at the start, zero when one library serves both paths (`library-route-judgement.md` § 2 step 1). Every gate measures it, instead of a script someone has to remember to run. It also serves as the failing test for a library rung whose defect no program can show (`testIsStage`).

**What it actually gates** (gate step 8, `climb-batch-workflow.js:1042-1092`, and `tools/checker-count/run.sh`):

- **The total.** It counts checker messages over the whole library, not declarations: 93 messages at 52 locations. One declaration can produce four messages. The per-api rows count each error more than once: after L the rows add up to 206 for a total of 103.
- **The comparison** with the last landed table (`checker_compare`). A fall is green. A rise is red unless it equals a rung's declared total exactly. A changed crash line is red unless declared. A stale copy of the checker is red.
- **The declarations.** They are `expectedCheckerCount` in the manifest, written before the run and fixed for all of it. L's 102 was written at 09-22 18:14 from the triage's measurement on a copy of the library, an hour before L's own edit. Its first value, 63, was written at 05:01.
- **A contradiction in the gate's instructions.** The "What green means" text (`:1092`) says a declared total "must be the declared one", while `checker_compare` passes any fall. With P declaring 33, L declaring 102 and the merged tree at the expected 23, the text reads red. This never came up, because P stopped.

**Why "the count may only fall" does not fit this number:**

- **Fixes can raise it.** The checker stops checking an api once it finds errors there (`StaticChecker.java:268-272`). Clearing those errors lets the overloading and return-type rules run for the first time. L fixed the 30 defects it was for, and the total rose from 93 to 103. The `nat` work does the same: in the `nat` shadow, the checker's `nat` changes alone take the count from 93 to 115, 22 errors that the crash used to hide (`perf-probes/nat/followup.md`). With every early error cleared as well, those two rules report 173 (FACTS; `perf-probes/nat/zero.md`). On this route, real progress can push the count up for several batches before it falls.
- **Rungs do not add.** P alone gives 33 and L alone gives 102, so their changes sum to 42. Together the triage measured 41 or 23, depending on where P's change goes (`perf-probes/nat/triage.md` § 5). When two rungs move the count, no per-rung number predicts the merged total.
- **So a rise is not evidence of harm.** Harm to programs is caught by the suites and the ladder, and in batch 3 they were green.

**Why it stalled batch 3.** Four things in a row:

1. The declaration was measured on a copy, not on the rung's own edit.
2. The rung legitimately did something else. The specification requires `comprises { AnyIntegral, ... }`, which keeps one existing error, so the total was 103.
3. Matching is exact, so +1 is red.
4. Nothing checked L's table against the declaration in the five and a half hours between 19:14 and 00:43. The declaration could not change inside the run. And the run ended on the review before any judge read the count.

Finishing the batch after the stop took 611K worker tokens, 8.5M tokens processed on the coordinator's own model, and 186 minutes to landing, 139 of them waiting for Pavol (`climb-batch-3-redesign.md` § 1).

## 3. The options

**(a) Measured declarations, sum at the gate.** Each rung's declaration comes from its own post-edit table, checked by its skeptic. The gate compares the merged tree with the base plus the sum of the rungs' measured changes, and is red only on a rise nobody measured.

- Cost: two fields and one comparison, the redesign note's option f1. About 0 tokens.
- Stops: any rise a rung did not measure. It also fixes batch 3's case.
- Still fails when rungs interact. The sum predicted 42 where 23 or 41 was measured. A joint rise above the sum turns the gate red with nobody at fault, and a declaration the run cannot change would stop the run again.

**(b) Report only.** The stage never turns the gate red. It lands the table and prints the change and the new error locations. The review's instructions tell it to explain each new location: uncovered by a fix, or a new defect.

- Cost: `checker_compare` stops failing on count and crash changes, plus one paragraph in the review's instructions. About 0 tokens. The permanent measurement and the chain of landed tables stay.
- Lets through: a batch that really moves the library away from the checker. It lands, with the rise printed and explained in the record Pavol reads at landing.

**(c) Red only above every rung's own table.** The gate is red only on a total above the highest table any landed rung measured on its own branch.

- Cost: every rung that touches `Library/` or the checker captures a table, 20 s each. The declarations go.
- Lets through: batch 3 (103 is not above 103) and most merges. It is still red with nobody at fault when two rungs together uncover more than either did alone, which is rarer than in (a).

**(d) Count declarations, not messages.** The count tracks declarations with errors instead of messages.

- Cost: about 30 lines in `run.sh` and a new baseline.
- It gives a better picture of the work, since a site with four messages counts once. But the early-stop effect makes this count rise too, so it improves the number, not the gate. It combines with any other option.

**(e) Drop the stage.** Each library or checker rung reports its before and after count in its own record.

- Saves 20 s per gate.
- Loses the merged tree's number and the chain of landed tables, and rungs that do not expect to move the count never measure it. It is the one-off script his 09-17 rule forbids, moved into the rungs.

**(f) Other.** Keep red only what is yes-or-no and can be fixed inside a run. A stale checker copy means the number is not this tree's, and a judge can refresh the copy. Report everything else as in (b). Later, when the switch-over is near, the real test of the milestone is a program: a gated test that compiles a small program against the interpreter's library.

## 4. Recommendation

Take (b), and keep (f)'s stale-copy check red. For the next several batches the count cannot tell progress from harm on this route. The one time it acted as a gate, it stopped a batch over a correct spelling that the specification requires, and the shadow's measurements say the `nat` work will raise the count again.

The suites catch harm to programs. The count's job is to show the distance, and a printed change, explained location by location in the record Pavol reads at landing, does that without ever stopping a run.

Keep `expectedCheckerCount` as a prediction written in the record, never as a gate value. Add the redesign note's f1 anyway: the skeptic compares the rung's own table with its report. It costs nothing, and it would have flagged L's 103 by 21:52 instead of at 00:43.

Leave (d) for when the count is used to plan work. Do not take (a) or (c) on their own: both still turn a combined effect nobody caused into a red gate.

This answers his 09-20 objection only in part: the count remains a metric, not a price for the work behind it.
