<!-- Written 2026-09-27 by an archaeology worker, on the coordinator's request after
Pavol's 09:26:41Z message: "you are not using the established form and once you find
it maybe put it into protocol." Sources: `explorations/coordinator/PLAN.md`,
`POSITIONS.md`, `protocol.md`, the postmortem's `decision-lists.md`,
`review-patterns.md`, `decisions-for-reapproval.md`, `restate-and-hold.md`,
`wall-of-text-spiral.md`, `open-at-compaction-2026-09-23.md`, and the session
transcript `fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`, read only through the bounded
indexer `postmortem-2026-09-19/parse.py` over 2026-09-25T00:00Z..2026-09-27T12:00Z
(index written to a scratchpad, not committed). Timestamps are UTC, taken from the
transcript's own `timestamp` field. -->

# The form for putting an open design question to Pavol

## 1. The shape of the message

Every instance that worked is one chat message (never a rendered page, never a link
for a single decision — a rendered page is used only for a whole plan or document, e.g.
the coordinator's page for `PLAN.md`, POSITIONS 2026-09-26) with five parts, always in
this order:

1. **The question**, named and restated in one line ("Batch-5 answer 2: do sizes and
   boolean arguments count in the exclusion rule?").
2. **Context**, as short bullets: what the rule/spec says, what each path does today,
   what the library already does in the family, what the ledger row records. This is
   protocol.md principle 2's evidence order (`protocol.md:61-74`: mathematics, each path
   measured, the specification, the library's own practice and where the designers
   departed from Java, the peers, the commits, then the derivation).
3. **The options**, numbered, each one line: what it is and what it costs or forecloses.
4. **The ask**, naming one option by number, with "Yes: ... No: ..." spelling out
   exactly what a yes commits him to and what a no does instead.
5. **The recommendation**, one line, last, never in place of the explanation
   ("I recommend option 1: ...").

This is written down in two places, neither of which names all five parts together:
- `protocol.md:76-79` (principle 3): "One ask per message: what the work would do, what
  it touches, what it costs, what a yes commits him to; the recommendation last and
  never instead of the explanation."
- `POSITIONS.md:133` ("Asks and decisions"): "An ask for a yes states, in the message
  itself, what the worker would do, what it produces, what it touches in the tree, what
  it costs, what the yes commits him to afterwards and what a no costs; one ask per
  message; no label stands in for an explanation ... the recommendation comes after the
  explanation, in one line, never instead of it."

Length in the working instances runs about 1,500 to 3,300 characters (batch-5 answers
1-3: 1,889 / 2,445 / 2,209 chars). When a question needs a refresher because it touches
something he does not already know (a design's purpose, how peers do it), the message
grows to 4,700-5,000 chars but keeps the same five-part order with the refresher
inserted between context and options (answer 6's second try, 4,766 chars; the row-40
re-explanation, 4,990 chars).

## 2. Five instances, timestamps and exact words

**Batch-5 answer 1 (worked, first try).** Ask at 2026-09-26T09:08:39Z, opening line "Four
Opus workers have been running since 09:08 UTC: ... While they run, here is the first of
the five batch-5 answers. **What should rung S's citations call the unrevised copy?**"
Ends "**The ask:** option 1. ... I recommend option 1: it's the team's own form, and the
name is accurate." Reply at 2026-09-26T09:19:58Z (11 min later): "Option 1, agreed."

**Batch-5 answer 2 (worked, first try).** Ask at 2026-09-26T09:20:38Z, opening "Recorded
(`1f4b744e2`). ... **Batch-5 answer 2: do sizes and boolean arguments count in the
exclusion rule?**" Ends "**The ask: option 1.** ... I recommend option 1: design B gives
sizes a run-time identity, so the rule has to cover them." Reply at
2026-09-26T09:24:48Z: "Option 1, sizes count / Update protocol."

**Row 40 (failed, then fixed by naming the form).** First, terse try at
2026-09-25T22:04:42Z: "Reading row 40's ground ... **Row 40.** On 09-19 the array design
note left three questions ... What I propose: close row 40 as 'not a decision taken' ...
Recommendation: close it that way." No options list, no "yes/no" spelled out. After a
compaction and a garbled boot recap, Pavol replied "???" at 2026-09-25T23:17:42Z, then at
23:21:38Z: **"Re-explain the Row 40 using our best practice"** — naming, in his own words,
that an established practice exists and asking for it to be used. The coordinator's
re-explanation at 23:23:23Z (4,990 chars) gives, for each of the three questions: the
library's own way first, the default, what changed since (with the review that refuted
or confirmed it), what other languages do, then "the choices" with what each costs, then
"Recommendation: close row 40 as no decision taken" last. Reply at 2026-09-25T23:36:16Z:
"Row 40: close as no decision taken. What's the switch-over?" — agreed, plus a term he
did not know, defined per POSITIONS.md's "How he wants to be spoken to" rule.

**Answer 6 (failed, then fixed by adding a refresher and peers).** First ask at
2026-09-26T11:21:27Z already has the five-part shape (context, five options, "The ask:
option 1", recommendation), but Pavol replied at 2026-09-26T11:30:00Z: "I don't know yet
fully qualified to answer this question. Can you apply some of the nine steps to be
used? ... brief, brief me. And also according to what other languages or specialized
scientific ... libraries do ... can you extract some kind of design philosophy from the
original?" The coordinator's second message at 2026-09-26T11:31:00Z (4,766 chars) adds,
before the options: a refresher on why the design exists (what the six flags mean, what
it buys, where people use such facts), the design philosophy, and a "What others do"
section naming NumPy, Julia, Ada/SPARK, Rust, Lean, Liquid Haskell/F*, ending "How to
judge it" (four questions) before restating the recommendation. Reply at
2026-09-26T11:38:29Z: "Option 1, agreed. But let's make sure we clearly record ... the
original design and ... when we get to covariant that we try this ... are other
languages ... able to express this?" — agreed, with one more question, answered in the
next message (11:39:32Z) and closed.

**Current session, form not used (2026-09-27).** The morning's "three questions" process
proposal was not put as one ask; it unfolded over five turns (09:02:00Z the first half
with options/ask/recommendation, but the second half held to a later message; 09:03:10Z
a status interruption; 09:07:36Z a redraft offered without a fresh options list;
09:10:29Z Pavol's "Yes, it makes sense" already conceding before the diff was shown;
09:14:42Z the actual diff). At 09:26:41Z, after this and the following item (filing
open questions into PLAN.md) went the same drawn-out way, Pavol said: "Okay, maybe you
should launch an archaeology worker and establish the process we used for reviewing
those answers before because uh, you are not using the established form and once you
find it maybe put it into protocol." This is the request this document answers.

## 3. Where the form worked and where it failed

**Worked, on the first message:** batch-5 answers 1-5 (all five, single-message,
one-word or short replies: "Option 1, agreed.", "Option 1, sizes count", "Option 2,
agreed.", "Agreed, (b) factory", "Agreed, option 1" — POSITIONS.md 2026-09-26, the
batch-5 answers) and answers 9, 10, 12 later the same day ("Yes, agreed."/"Agreed, the
judgement's recommendation.", "Agreed, tabulate.", "Agreed, decision 3 stands") — each
answered within minutes of one message that had context, numbered options, an explicit
ask and a last-line recommendation.

**Failed, and what was missing:**
- **Row 40**, 2026-09-25T22:04:42Z: the first try skipped the numbered options and the
  explicit "yes/no" ask; it read as a paragraph with a recommendation, and Pavol could
  not answer it (a compaction intervened, then "???", then the explicit request to
  "re-explain ... using our best practice"). Fixed by restoring, per question, the
  library's own way, the peers and "the choices" with costs.
- **Answer 6**, 2026-09-26T11:21:27Z: the five-part shape was present but the context
  section assumed knowledge Pavol did not have (why sign-refined rational types would
  ever matter, what peers do). He named exactly this gap: "I don't know yet fully
  qualified to answer this question ... brief me ... according to what other languages
  ... do." Fixed by inserting a refresher and a peer survey before the options.
- **2026-09-27 morning**: the three-questions proposal and the PLAN-filing proposal were
  each argued over several turns instead of stated once with options and a recommendation
  he could take or refuse in one reply; this is the instance he flagged as the form not
  being used.

## 4. Whether the form is written down

Yes, in general terms, in two places, but not as one named checklist:
- `protocol.md:76-79` (principle 3): one ask per message, what the work would do, what
  it touches, what it costs, what a yes commits to, recommendation last.
- `protocol.md:61-74` (principle 2): the evidence order a design question is answered
  from before it reaches him — mathematics, each path measured, the specification, the
  library's own practice, the peers, the commits, then the derivation and the decision.
- `POSITIONS.md:133` ("Asks and decisions"): the same rule in his own words, with the
  09-21 incident that produced it.

What is not written down anywhere: the numbered-options-with-an-explicit-"yes/no"-ask
layout itself (as distinct from the general "what it does/costs/commits" principle), and
the rule that when the context assumes knowledge he lacks, a refresher and a peer survey
go in before the options (this was reconstructed here from the row-40 and answer-6
instances; `restate-and-hold.md` and `wall-of-text-spiral.md` cover the adjacent but
different failure of length/register during rapid back-and-forth reading, not this one).
