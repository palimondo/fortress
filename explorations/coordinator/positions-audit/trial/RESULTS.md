<!-- The POSITIONS audit's trial on ten entries, 2026-10-21: the pass test, what it found, its cost and what changes for the full run; the scouts' reports, the brief and the two readers' files are in evidence/. -->

# The trial's results

Ten Sonnet scouts, one Opus reader of all 85 entries for the actionable mark, and one Opus reader for the judgement, from 20:54 to about 21:36 UTC on 2026-10-21. Their files are in `evidence/`, word for word; they were moved there after the trial, so the paths inside them name `trial/` itself. Nothing in POSITIONS or its history has changed.

## The pass test

1. **It catches P-86: yes.** Class: a one-time approval that became a standing rule; and its ring-bound clause is a summary that changed the meaning of the review, keeping only the reason that is no longer true.
2. **It calls no good entry bad: yes, with one real finding.** P-148 and P-66 come out as his decisions in his own words. P-150's decision comes out as his yes to a conclusion stated fairly, but one premise is wrong: "at most 1.8 %" is the saving from start-up alone, and for a warm process such as `fsc`, which the entry names, the report's cap is 6.4 % (`process-engineering/fresh-jvm-commands.md:182`, checked at the source).
3. **It marks P-18 and P-10 not actionable: half.** P-18: not actionable. P-10: both readers call it actionable, with "not actionable" as a fair second reading; their test counts "is not pursued" as an instruction. His test is stricter: a closed side line is not a position.
4. **Every quote checks out: yes.** All 45 quotes of his that the judgement relies on match his messages word for word (`scratchpad/positions-audit/qc/hischeck.py`, the coordinator's own script, beside the reader's).
5. **The coordinator's check agrees on 9 of 10 or more: yes, 10 of 10.** For each entry, the claim that decides its class was checked at its source: his messages by time, the commits, the report on a resident compiler. This checked the deciding claims; it was not a second trace.

Four of five pass; the miss is the actionable mark on P-10.

## What it found

- **Parts that no message of his stands behind**, in seven of the ten: P-10, "stays in the walk check"; P-55, forks 3 and 2 at their defaults; P-85, the `RR32` question among those that return after the switch-over; P-88, the `ReadableArray2` sentence, whose "later ledger row" does not exist; P-151, "not moved into `List`" and "its default taken"; P-150, the 1.8 % figure; P-86, whole.
- **The coordinator's words inside his decisions:** P-66's "the sign of `GCD`"; P-148's clause on the same results; P-151's "Why", which drops his condition "If you say it is on the critical path to having it run fast in a compiler, we will do it" (2026-10-16T11:18:08.438Z).
- **A contradiction inside an entry:** P-151 says both that the rest of `AnyList` moves into `List` and that its bodies were not moved.
- **A pattern:** P-10, P-55, P-66, P-85, P-86 and P-88 were last rewritten in the consolidation of the evening of 2026-10-13, which cites only his general go to run it overnight (17:13:20 UTC). No message of his names any of these entries.
- **Sources to put back:** 19 history lines by the coordinator's count (the reader says 21), each naming a message of his and the message he answered.
- **Actionable, all 85:** 73 actionable, 10 partly, 2 not (P-16 and P-18).

## The cost

- The ten scouts: 111K to 189K tokens written each, 1.44M in all. The P-86 scout wrote 130K, against 660K for the first P-86 scout.
- The actionable reader 104K; the judgement reader 280K. About 2.0M in all.
- The full run, rough guesses, not measured: all 75 other entries, about 13M tokens written; only the 45 of them with a warning mark, about 8M. The errors in P-150 and P-66, which carried no warning mark of doc, bulk or default, say that the marks miss some.

## What changes for the full run

- The scout's brief asks for a block of his quotes in a fixed form, `HIS <time> | <quote>`, so that a script checks them; a check by line could not tell whose words a quote was.
- A seventh class: a remark or the state of one day, not a decision (P-18 fit none of the six).
- The actionable test: a closed line of work with nothing left to do is not actionable.
- `near.py`'s guess at the message he answered was wrong in three reports (P-148, P-151, P-66), and the scouts caught it; it should follow the transcript's reply chain, not the time.
- The scouts write into `evidence/` directly.
