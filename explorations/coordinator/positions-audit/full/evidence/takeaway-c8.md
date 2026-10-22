<!-- The POSITIONS audit's full run, chunk c8: what the cold reader (cold-read-c8.md) took away from the four entries that stay (rewritten-c8.txt: P-102 rewritten; P-103, P-124 and P-125 kept word for word), checked against the curator's messages; match or drift for each, where a drift comes from, and a fix where the text is at fault. P-123 is struck in the proposal and has no text to read. Nothing in the record changed. -->

# The cold read against his decisions: chunk c8

- **P-102**: match on what to do (test first, kept in the suite, one commit allowed, source code only); a slight drift from a kept clause, "the full suite stays green", which gives no time where he said per batch (2026-09-17T16:50:18.180Z); fix proposed.
- **P-103**: match; the cold reader's open points are project context.
- **P-124**: match; its general form is the coordinator's extension of his option 1, already put to him (`corrections-c8.md`, P-124 question 1), and the cold reader reads it as his choice implies.
- **P-125**: match on what to do (four threads, pinned, failures fixed, never masked); a drift from a kept sentence: "fails or varies" reads as varying printed output, which he ruled harmless, where he meant a flaky verdict (2026-10-08T15:53:33.559Z), and "never hidden by a pin" reads against the pin the entry requires; fix proposed.

P-123 is struck in this chunk's proposal, so it has no text, no cold read and nothing to check here.

Reader: one Opus session, 2026-10-22. I compared `cold-read-c8.md` with `rewritten-c8.txt`, with `corrections-c8.md`'s sources for each entry, and with his messages: his chat messages by `curator-profile/show.py`, the coordinator's texts that they answered by `positions-audit/tools/near.py`, and his page comments in the transcript, since `show.py` does not print them. All times are UTC. "B3" is `fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-10-08T15-41.jsonl.parts/003.jsonl` under `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/`. I set aside the cold reader's questions about the project's terms ("him", "the original tree", "walk"). I judged meaning, not wording. His word of 2026-10-21 23:21 is that a wording which is correct is not touched, so I propose a fix only where the text can lead a worker to do what he did not decide.

## P-102

**Match on what to do.** The cold reader's steps are his:
- Write the failing test, see it fail, make the fix, see it pass: "The workers should be writing the failing test, verifying that it is failing, doing the fix, and proving that it is working." (2026-09-17T16:50:18.180Z).
- The test stays in the suite for good. In the same message, the test suite "should be growing with each of our edits", and a one-off proof "that does not leave a permanent check in the gate is not an acceptable process". At 2026-10-06 17:32 (page comment, B3:7834), a test written for a fix simply "should become part of the test suite".
- The test and the fix may share a commit. At 2026-10-04 01:08 (page comment, B3:2934) he did not recall asking for separate commits and worried about "increasing the ceremony burden". His "Yes." at 01:25 (B3:3015) took the coordinator's reply that dropped "committed alone".
- Source code only. At 2026-10-06 17:19 (B3:7743) the rule should cover every source code edit under the original tree, since agents were confused about tests for specification edits. At 17:28 (B3:7798) he asked for "source code" with no list. The rewrite takes both.

**Drift, slight, from a kept clause: "the full suite stays green".**
- **How it misled.** The cold reader cannot tell whether green holds at every commit or when the change lands, nor whether the red test may be committed first. Read per edit, the clause is stricter than his rule.
- **What he meant.** His 16:50:18 answered exactly this question: whether this clause holds per edit or per batch (the coordinator's 2026-09-17T16:26:23.623Z text, which he quoted). He said the clause was a rule against one-off validation scripts, and "So the reinterpretation as per batch is fully in line with this."
- **Where it comes from.** The clause was kept word for word. The rewrite changed only the scope and "the corpus".
- **Fix.** "...and the test stays in the test suite from then on; the full suite is green when the work lands, per batch, not per edit." Rests on 2026-09-17T16:50:18.180Z.

**Not drifts.**
- Refactors, build files and performance work under "every edit of source code". He set the scope at "source code" with no list (17:28) and did not speak to edits that no test can show. A list here would go against his word. The tests part of the skill, which the entry names, holds the detail.
- Whether the test must fail for the reason that the fix addresses. How a test is written is the skill's tests part.
- A separate red commit. "May land in one commit" allows either. He refused only the requirement of two.
- "The entry gives no reason." His reason, no one-off proof outside the suite, is carried by "added to the test suite" and "stays in the test suite from then on", and the cold reader acts on it rightly.

## P-103

**Match.** The cold reader treats a test as pass or fail, asserts a value that matters inside the test with the suite's own mechanisms, ignores other printed output, adds no expected-output files and does not propose them again. Each is his:
- "Those values must be part of the test." (2026-09-29T18:52:49.920Z), after he asked what a suite is for if it cannot simply be run to green.
- Printed differences do not count "because it does not fucking matter" (2026-09-29T19:03:33.775Z).
- "The test suite original design does have a mechanism for checking values that are important to check. When the designers of the test suite decided that it passes without any additional check, it is not needed to control its outputs." and "shut the fuck up about it already" (2026-10-02T15:48:05.965Z), on the coordinator's 15:40:56.635Z offer of expected-output files.

**The cold reader's open points are project context.**
- **`run_out_equals` against expected-output files.** The entry draws the line: "the mechanisms the suite already has". `run_out_equals` is the team's, in the compiled suite's `.test` files. What he refused at 15:48:05 was a new kind, an interpreter `Foo.out` beside `Foo.fss` (option 2 of the 15:40:56 question), which that question itself said "works like the compiled suite's `run_out_equals`". The difference is the team's mechanism against a new one, not inline against a separate file.
- **What "it" is.** It is the offer he refused, the expected-output files and the control of printed output. All three of the cold reader's readings fall inside it.
- **Existing expected-output files.** The offer was to build them, so none of the refused kind exists.
- **Who decides which value matters.** The test's writer, by asserting it, as his 18:52:49 says.

**Fix.** None.

## P-124

**Match.** The cold reader puts the examples in the gate at zero red under walk, fixes the implementation when one fails, does not respell an example for walk and keeps no list of known failures. He chose this with "Yep. Option one." (2026-10-04T20:27:30.337Z), answering the coordinator's 20:24:58.453Z question "Should `testSpecData` join the gate?":
- option 1, join once the five red examples are green, "the target joins the gate at zero red";
- not option 2, a list of known red names;
- not option 3, respell the five, "a text change in the revision form, to cover a gap in walk".
The question recommended option 1 because "then the gate guards all of the specification's examples".

**The general form.** "A failing example is not respelled for walk" as a rule for every example is the coordinator's (`ab933086b`), and `corrections-c8.md` puts it to him (its question 1). The cold reader reads it as a rule for every example. That is what his choice implies: with zero red and no list of known red names, a failing example has two ways out, the implementation or the example, and he refused the example for the five. If he strikes the general form, the text changes and this check with it.

**The cold reader's open points.**
- **An example that is wrong in the specification itself.** "For walk" carries it. He refused a respelling that covers a gap in walk. A correction of the specification is another matter and outside this entry.
- **An example that needs a feature not yet built blocks every landing.** That is what zero red with no list means, and he chose it over option 2. Today all 130 pass (the gate summaries of climb batches 11 to 20 hold `SpecDataJUTest 130 0 0 0`), so a red example is a regression or a new example.
- **The compiled path.** His decision was about `ant testSpecData`, which runs under walk, and the entry says so.

**Fix.** None.

## P-125

**Match on what to do.** The cold reader runs the suites at four threads set in `build.xml`, never drops to one thread to spare the machine, fixes a test or a defect that parallelism shows and never masks it, and lets the four override the calling shell. Each is his:
- 2026-10-08T15:53:33.559Z, answering the coordinator's 15:31:57.152Z question whether the suites keep running Fortress on one thread: "we turned off parallelism, which is the native part of Fortress", "We, we basically activated a blind spot", "if parallelism makes something flaky, then the test is written wrong. Something needs to be atomic.", the four-core machine is no reason, and "What, what if there are any correctness issues?".
- "So yeah, pin it to four. That's good." (18:11:36.440Z), on the coordinator's 18:07:13.987Z question, first asked at 17:42:19.408Z. He took its option 1, "Pin them at 4. Every run is parallel and the same on any machine ... independence from the calling shell".

**Drift, from a kept sentence, in two places.**
1. **"A test that fails or varies under parallelism is written wrong".**
   - **How it misled.** The cold reader sets it against P-103. If only the order of printed lines changes and every check holds, is the test wrong? A worker who reads "varies" as varying output would "fix" team tests that are meant to print differently.
   - **What he meant.** A flaky verdict: "if parallelism makes something flaky, then the test is written wrong" (15:53:33). Varying printed output he had already ruled harmless. The team's tests that print differently on every run (random seeds, timings, hash order: the coordinator's 2026-09-29T18:09:15.658Z text, which he quoted at 19:01:43) do so "because it does not fucking matter" (2026-09-29T19:03:33.775Z).
   - **Where it comes from.** The sentence was kept word for word. It is the coordinator's wording, also in `build.xml`'s comment at :1154-1157.
2. **"never hidden by a pin".**
   - **How it misled.** The entry requires a pin at four, and the next sentence forbids "a pin". The cold reader resolved it rightly, as a pin to one thread, but found the entry contradictory on its face.
   - **What he meant.** The old pin at one thread, which "turned off parallelism" (15:53:33).
   - **Where it comes from.** It was kept word for word.
- **Fix.** "A test that parallelism makes fail, on every run or only on some, is written wrong, such as a write that needs `atomic`, or it exposes a defect: either is fixed, never hidden by one thread." Rests on 2026-10-08T15:53:33.559Z, and for what does not count on 2026-09-29T19:03:33.775Z.

**Not drifts.**
- **"The pin makes every run the same".** The cold reader read it as the same thread count, which is the option he took (17:42:19, 18:11:36).
- **A one-thread run for local debugging.** The entry is about the suites. This is project context.
- **Which suites.** In the asks he answered, "the suites" are `testFast` and `testSystem`, the two targets that the pin went into (`build.xml:1186` and `:1431`). A fact for the coordinator, not a drift from his word: `testSpecData`, P-124's gate step (`build.xml:1380-1402`), sets no `FORTRESS_THREADS`. It runs at the default, half the CPUs, or at whatever the calling shell sets. It is parallel, so his blind-spot reason does not reach it, but "whatever the calling shell sets" does not hold for it.
