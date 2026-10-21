<!-- The correction trial's seven rewritten POSITIONS entries: what the cold reader (cold-read.md) took away, checked against the curator's messages; match or drift for each, where a drift comes from, and a fix where the text is at fault. Nothing in the record changed. -->

# The cold read against his decisions: seven entries

Reader: one Opus session, 2026-10-21. I compared `cold-read.md` with the proposed texts (`scratchpad/positions-audit/fix/rewritten7.txt`), with `corrections.md`'s sources for each entry, and with his messages read by `curator-profile/show.py` at the times below (UTC). I set aside the cold reader's questions about the project's terms, as the brief asks. I judged meaning, not wording.

## Verdicts

- **P-55**: match.
- **P-66**: match.
- **P-85**: drift, from the rewrite. Its new fork 3 sentence seems to contradict "with no default". Its restored preparation clause can be read as a fact or as a rule.
- **P-88**: match.
- **P-148**: match on what to do. A slight drift comes from the title, kept from the old text: "comes right after" reads as the order of the two passes, and his "high priority" is lost.
- **P-150**: match.
- **P-151**: drift, mostly from the rewrite. Its new "Why" reads as a worker's licence to build past the team's forms. Its new "Still to build" item leaves open whether to redo the move now. A smaller drift comes from a kept sentence ("its two type errors").

## P-55

**Match.** The cold reader's four actions are what his "Item 15: 15a with (b) yes." (2026-10-09T13:51:11.783Z) agreed to. It answered item 1 of the coordinator's 11:56:38.064Z list, whose full form is the 07:59:01.341Z text (quoted in `P-55.md`, section 1):
- The checker accepts arithmetic in a size and compares sizes by their written form after folding numbers.
- The class loader computes the value.
- A size name counts as possibly equal to a number, so the `N[\0\]` arm is reachable ("It clears the 2 unreachable branches").
- The library's text stays ("keeping the team's text").

The cold reader offers two readings of "A size name may equal a numeral". It chooses the right one: the name may have that value. Its other questions, how far folding goes, what a negative difference does, how a power is spelt, are about the checker's code, not about his decision. The code and its tests answer them (`P-55.md`, section 2).

**Fix.** None.

## P-66

**Match.** Its three actions are the way of weighing that he gave at 2026-09-22T07:17:57.713Z:
- keep Java's and the JVM's defaults where they make sense, and correct them "through the lens of high performance and mathematical precision";
- where bytecode can express something the hardware does, express it;
- give up fighting the JVM for now where it prevents that;
- look at Julia and X10 beside Swift and Rust.

His "not now, maybe in the medium or long term" also reaches it, as "working around the JVM isn't worth it yet".

Three things are unclear to the cold reader. None is a drift.
- "The team did so with rounding" is kept from the old text, less `GCD`. The cold reader asks whether the team kept the default or corrected it. Its own takeaway reads it as a correction, and that is what he meant: "where he deviated, for example, by the rounding". The specification rounds a halfway rational to the even integer (`Specification/basic-lib/numbers.tex:461-463`).
- On overflow, it sees "defaults stay" and the wrapping operators' "own spelling" pointing opposite ways. The `fortress-repo` skill tells a worker that the default raises `IntegerOverflow`: a corrected default, with wrapping spelt apart. And the entry is a way of weighing, since he did not feel informed enough to decide the shifts. Leaving overflow unsettled is faithful to him.
- It asks why an "integer" principle has a rounding example. His principle is general ("high performance and mathematical precision language"). The title names the question it came from. No action changes.

**Fix.** None.

## P-85

**Drift, from the rewrite, in two sentences.** The other takeaways match his decisions:
- No decision and no default on the three questions: "Row 40: close as no decision taken." (2026-09-25T23:36:16.868Z). It took the coordinator's 23:23:23.166Z option: the three stop being defaults and come back with the array design after the switch-over.
- They return after the switch-over with decisions A, B and D: "I am fine with delaying the array work after the switchover to the library" (2026-09-22T05:21:45.608Z).

1. "Array fork 3, on the third question's ground, is built at a default that waits for his review (review-queue item 30)."
   - **How it misled.** The cold reader sets this sentence against the title's "with no default". It cannot tell whether the third question has a default.
   - **Where it comes from.** The sentence is new in the rewrite. `corrections.md` added it (rule 8) to keep "no default" from misleading, but it does not say how the two relate. The default is an agent's, and it came later. Batch 13 built it after he asked, at 2026-10-09T15:10:56.122Z, whether forks 2 and 3 could go into the next batch. He has not answered on the way itself.
   - **Fix.** "Array fork 3, on the third question's ground, is the one exception: an agent's default, built since and not his answer, waits for his review (review-queue item 30)." Rests on 2026-09-25T23:36:16.868Z and 2026-10-09T15:10:56.122Z. Whether his 10-09 question brought the third question forward stays `corrections.md`'s question 1 to him.
   - **Not a drift.** The cold reader also leaves fork 3 at its default until his review. That is what a worker should do with a default that waits for his review.

2. "The whole preparation for the array work is done before the switch-over."
   - **How it misled.** The cold reader cannot tell a fact ("it is done") from a rule ("it must be done first").
   - **What he meant.** A rule: "But at the same time, like I think we should do the whole prep for the arrays" (05:21:45).
   - **Where it comes from.** The rewrite restored this clause.
   - **Fix.** "The whole preparation for the array work is to be done before the switch-over; only the work itself waits." Rests on 2026-09-22T05:21:45.608Z. What "the whole prep" covers stays `corrections.md`'s question 2.

The rest of its doubts are project context: the missing C, and the numbering of questions, decisions and forks.

## P-88

**Match.** It leaves array-scalar `+`, `-` and `MAX` to the library, and keeps `Diag` a `Matrix` with its own `mul`. That is what his "Okay, agreed. That is the plan." (2026-09-24T18:30:37.463Z) agreed to, in the coordinator's 18:25:56.634Z ask: the six scalar drops stay as landed, and the override comes back if the probe passed. The shape is his own idea (18:13:14.832Z): a diagonal that "is a type of matrix" with "optimized operation". The cold reader guessed two reasons, a cheaper diagonal product and showing that overriding works. Both are his.

**Unclear, but no drift.** It asks whether "as the type system promises (row 299)" means a promise kept today or a gap that the row tracks. Row 299 records what the alternative costs: the general product is 13 to 54 times slower. It gives the override as the library's pattern, and the probe passed (`405a31b0e`). Under either reading, a worker does the same thing: keep the override.

**Fix.** None.

## P-148

**Match on what to do. A slight drift comes from the title.** Its actions are his rephrasing at 2026-10-14T19:16:45.667Z:
- measure after every checker change;
- follow the correctness pass with an optimization pass;
- do this inside the rung, validated by the skeptic, not as a manual step after landing.

Two of its doubts are his, carried faithfully, and `corrections.md` already asks him both:
- Its doubt over "Ideally" is his own hedge: "Ideally this would be done within the worker's rung". This is `corrections.md`'s question 2.
- It took the same-results clause as a rule. That clause is the coordinator's gloss of 19:18:57.169Z, not his words. This is `corrections.md`'s question 1.

**The drift.** "**The checker's speed comes right after its correctness.**"
- **How it misled.** The cold reader reads the title as the order of the two passes, and asks "ahead of what?".
- **What he meant.** A priority too: "include the checker performance as a high priority right after the correctness" (19:06:22.989Z).
- **Where it comes from.** The title is kept from the old text.
- **Fix.** "**The checker's speed is a high priority, second only to its correctness.**" Rests on 2026-10-14T19:06:22.989Z.
- **A cost of the fix.** The old title is quoted as a pointer in `.claude/skills/fortress-repo/references/sources.md:670` and `explorations/coordinator/climb-batch-workflow.md:104`. Both would need the same change. To avoid that, keep the title and open the body with "This is a high priority."

## P-150

**Match.** Its three actions match his 2026-10-16T09:15:00.365Z ("recorded so that we do not reattempt it unless something significant changes"), which took in the coordinator's 08:56:38.403Z conclusion:
- build no resident compiler;
- put the speed work into the checker (P-148);
- do not take it up again unless something significant changes.

It asks whether the entry also rules out lighter measures: class-data sharing, a cached library, one JVM for a batch. It reads the scope right: the entry names only a resident compiler. His separate question at 07:45:26.869Z, whether to persist the checker's results, is not decided here. "Not attempted again" suggests an earlier attempt. "Reattempt" is his own word, for the study, and it changes nothing that a worker does.

**Fix.** None.

## P-151

**Drift, mostly from the rewrite.** Its first two takeaways match his "3 for the where clauses." (2026-10-16T16:42:39.606Z). That chose option 3 of the coordinator's 15:55:06.719Z ask (quoted in `P-151.md`, section 1): "Build the forms the team wrote down, and stop there".
- The forms are conditional extension (his yes at 12:35:52.756Z), method conditions, and the team's `AnyList` comment.
- The fusion stays. At 15:53:43.352Z he said: "we just delete this and pretend we don't need it. I don't like that."

It also reads the first sentence against row 773 correctly: members are checked under the condition, but not yet scoped to it.

1. "Why: …; one is built where the team left enough design intent for it, or where it is on the critical path to running fast compiled."
   - **How it misled.** The cold reader turns it into a rule for workers: "Don't build other `where` forms, or any other feature the team left little support for, unless they left enough design intent or the feature is on the critical path". It then flags the clash with "Only".
   - **What he decided.** He chose option 3, "stop there", over option 1, "go past it where needed". His conditions of 11:18:08.438Z were his own test for a case that the coordinator puts to him ("If you say it is on the critical path … we will do it"). They are not a worker's licence.
   - **Where it comes from.** The rewrite wrote this "Why".
   - **Fix.** "Why: a feature with little support in the team's work bends the language beyond what he can review, so going past the team's forms is his call, made on their design intent or the critical path to running fast compiled." Rests on 2026-10-16T11:18:08.438Z and 16:42:39.606Z. Whether the critical-path half stands at all stays `corrections.md`'s question 1.

2. "Still to build: the rest of `AnyList` moved into `List`, which climb batch 17 built otherwise (review-queue item 188)"
   - **How it misled.** The cold reader cannot tell whether "otherwise" means differently or elsewhere. It cannot tell whether to do the move now or to wait.
   - **What he decided.** The move (option 3: "Fix the rest of `AnyList` by moving its operations into `List`"). What batch 17 built instead is an agent's default that waits for him.
   - **Where it comes from.** The rewrite wrote this item.
   - **Fix.** "Still to build: the rest of `AnyList` moved into `List`; climb batch 17 respelled it within `AnyList` instead, a default that waits for his review (review-queue item 188)". Rests on 2026-10-16T16:42:39.606Z.

3. "`SUM`'s fusion with `MAX` and `MIN` stays, the team's commented generic `distribute` measured for its two type errors"
   - **How it misled.** "Its" reads as `distribute`'s own errors, and the cold reader cannot tell what is measured.
   - **What he decided.** Option 3 said "measure the team's commented fix for its last 2 errors". These are the fusion's errors 5 and 6, which the `where` clause leaves (`explorations/perf-probes/where-clauses/REPORT.md`, A.2.1). `distribute` is the team's own attempt at them.
   - **Where it comes from.** The sentence is kept from the old text.
   - **Fix.** "`SUM`'s fusion with `MAX` and `MIN` stays, with the team's commented generic `distribute` measured as the fix for the fusion's last two type errors". Rests on 2026-10-16T16:42:39.606Z and 15:53:43.352Z.

Project context only: "fusion", "walk's half", "the switch-over" and "he".

## How this was checked, and its limits

- **His messages, read whole with `show.py`.**
  - P-55: 2026-10-09T13:51:11 and 15:10:56.
  - P-66: 2026-09-22T07:17:57.
  - P-85: 2026-09-22T05:21:45, and 2026-09-25T23:29:15 and 23:36:16.
  - P-88: 2026-09-24T18:13:14, 18:25:08 and 18:30:37.
  - P-148: 2026-10-10T05:27:34, and 2026-10-14T19:06:22, 19:16:45, 19:18:46 and 19:20:20.
  - P-150: 2026-10-16T07:39:59, 07:45:26 and 09:15:00.
  - P-151: 2026-10-16T11:18:08, 12:35:52, 15:53:43 and 16:42:39.
  - The rewording rule: 2026-10-13T09:05:37 and 2026-10-14T11:49:45.
- **The coordinator's texts, quoted only.** I read them as `corrections.md`, `judgement.md` and the scouts' reports (`P-55.md`, `P-85.md`, `P-151.md`) quote them. The session's permission check refused my direct read of the transcript.
- **Primary sources checked.** `fortress-gap-ledger.md` row 299, `numbers.tex:461-463`, and the where-clause probe's A.2.1.
- **Applying a fix.** Each fix would go through `record.py`'s pointer check. Only P-148's title touches words that are quoted elsewhere, as noted above.
