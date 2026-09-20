# Review shapes this project has used, and what the record says about each

Mined from the coordinating session's transcript (2026-09-18 and the region 09-19 06:38 ..
09-20 05:32) and from the documents on file in `/home/user/fortress/explorations/`: the header
comments of `reviews/*.md`, `coordinator/process-decisions-review-1.md`,
`coordinator/batched-climb-review.md`, `coordinator/repair-batch-review.md`,
`reviews/rung-conformance-1-4.md` and `-5-8.md`, plus `coordinator/FACTS.md` and `POSITIONS.md`
for what became of each. Fifteen entries. "Accepted" means what the record shows Pavol did with
the result, quoted where he said it.

---

### 1. Phase-1 blinded independent review of one implementation

**Shape.** One reviewer, read-only, blinded from the sibling implementation: runs the program
from its own README, judges every rendered line beside the paper's formula, regenerates the
goldens and one figure through the whole pipeline from the pinned upstream, re-probes each
language claim with its own probes in its own directory, counts lines under one stated stripping
rule. Returns a "does it run" verdict with logs, a pair-by-pair judgement, and a verified /
refuted list.
**Given.** The branch or directory, the brief it was written to, nothing of the other run.
**Used.** 2026-09-08 (`reviews/astra-phase1.md`, `blinded-fable-phase1.md`), 09-09
(`run-b-phase1.md`, `run-b2-phase1.md`), 09-14 (`run-c-phase1.md`, `run-c2-phase1.md`).
**Accepted.** Yes. Their probe findings became the merged gap ledger; the 07:16:27 chronology
he asked for lists "the blinded runs, ours and Astra's, and their reviews; the merged gap
ledger" as one step of the project.

### 2. Phase-2 comparison, written only on top of the phase-1 records

**Shape.** The same reviewer role, but now with both trees and both phase-1 reports, which it
"reuses rather than redoes"; section A judges the rendered pairs side by side against the
formula, the last section is an adopt list ("take this from that one").
**Given.** Both implementations, both phase-1 reviews, the shared brief and the pinned
reference.
**Used.** 09-08 (`astra-vs-ours.md`, `blinded-fable-vs-astra.md`), 09-09 (`run-b-vs-run-b2.md`),
09-14 (`run-c2-vs-run-c3.md`).
**Accepted.** Yes; C4 was fixed as the project's target program out of this line of comparisons.

### 3. Two implementations from one brief, deliberately blinded from each other, then compared

**Shape.** Not a review but the setup that makes 1 and 2 possible: two sessions build the same
program from one written brief without seeing each other (Run B / Run B2, Run C2 / Run C3, ours
/ Astra), and the comparison is the review. The phase-2 report of Run B notes when the
conditions were *not* equal and says so rather than excusing it.
**Used.** 09-08 to 09-14.
**Accepted.** Yes; it is how the target program was chosen.

### 4. Conformance review of landed work against three standards

**Shape.** A review worker with read access only, nothing built or run, judges each landed rung
against (1) the committed specification, (2) the team's intent as built — the interpreter's
finished library, the compiler prelude's dormant drafts, the commented-out blocks — and (3) the
design record indexed by `coordinator/map/design-intent-sources.md`. Order of reading is fixed:
`git show <hash>`, then the rung's `REPORT.md`, then the tree as it stands, then the spec.
Returns a verdict per rung: filled in the spirit of the design, or a point solution that makes
tests pass.
**Given.** The commit hashes, the reports, the map, read-only access.
**Used.** 09-17, `reviews/rung-conformance-1-4.md` and `-5-8.md`, both headed "asked for by
Pavol".
**Accepted.** Yes, and acted on: the repair round's briefs were re-architected to answer it, and
FACTS carries a section "What the conformance review of the eight rungs established".

### 5. Attack on a plan before it runs

**Shape.** A worker that did not write the plan reads it, verifies every claim against the
repository, and reports where it does not work, costs more than it says, or gives up a check it
claims to keep. Findings most serious first; each carries what the plan claims, what is true,
and the evidence.
**Given.** The plan file and the repository.
**Used.** 09-17, `coordinator/batched-climb-review.md` (attack on
`coordinator/batched-climb-plan.md`). Its first finding: the plan's k=4 is above the harness's
own concurrency cap of 2 on this box, so "the largest single claim in section 9 is wrong by a
factor of two".
**Accepted.** Yes as fact; batch 1 then ran as waves of two, and batch 2's size was set to three
rungs.

### 6. Adversarial review of decisions, blinded from the proposer's arguments

**Shape.** A fresh worker on the session model, given the decisions as stated and the sources
but *not* the coordinator's reasoning; read-only, "no build, no test, no timing, no git command
that changes state; every number below is taken from a committed file, a workflow transcript, or
arithmetic over one of them, and the source is beside it". Returns: adopt / amend / overturn per
decision, corrections to the proposer's own numbers, and gaps the decisions missed.
**Given.** The four decisions in the reviewer's own words at the top of the file, the sources,
the workflow transcripts.
**Used.** 09-19 12:51:55 to 13:10:08 (18.2 min, 57,451 output tokens),
`coordinator/process-decisions-review-1.md`, 259 lines, committed `ff7d7a319`. It overturned one
decision (the scheduling change), amended three, corrected three claims, and found six further
gaps.
**Accepted.** Yes. Pavol had asked for exactly this shape at 12:50:41 ("maybe attack them?
Attack them. Like adversarial review? … a fresh fable agent, just get that brief for an unbiased
perspective"), and took the result at 14:54:15 with "I am not reading this, but go." POSITIONS
records that the six decisions are taken "as `coordinator/process-decisions-review-1.md` amended
them … and Pavol's 'go' (he did not read the full text)".

### 7. Instrumented post-mortem of a campaign's own process

**Shape.** A review worker, read-only, answers a two-part question — did the re-architected
briefs fix what the earlier review found, and where did the time go — by measuring the agents'
own transcripts with the instruments of `coordinator/iteration-cost.md` and
`next-climb/provenance.md` so the numbers compare across campaigns. Reports one line per
paragraph, answer first. Example number it returned: the specification's prose chapters were
opened in 56 of 955 tool calls (5.9%) against 7 of 1,638 (0.4%) in the earlier climb, and the
circular api listings 0 times against 18.
**Given.** Pavol's question verbatim in the header, the transcripts, the two instrument files.
**Used.** 09-19 07:50:58 to 08:19:06 (28.1 min, 81,958 output tokens),
`coordinator/repair-batch-review.md`, committed `0de59a8a2`, folded into FACTS at `7e3620cf0`.
**Accepted.** Yes; its "yes on four rules, no on the one thing the briefs named but did not
require" was folded into FACTS, and its eight free script changes went into the batch-2
decisions after review 6 amended them.

### 8. In-workflow skeptic, one per unit of work

**Shape.** Each rung's own agent, launched after that rung's worker, writes differential probes
against what the rung claims, runs them, and approves or refuses the rung. A refusal stops the
rung from landing.
**Given.** The rung's branch and report, its own brief, the tree.
**Used.** Throughout the eight-rung climb, the repair batch, and climb batch 1 on 09-19
(skeptics F, M, T approved; N refused at 10:19, 13 differential probes in M's case).
**Accepted.** Yes as machinery. He then tightened it: after the 22-defects-2-tests count came
out, every defect a skeptic measures and the rung repairs must land as a gated assertion
(decision 1 of the six, POSITIONS 09-19).

### 9. Judge on refusal

**Shape.** When a skeptic refuses, a judge on the session model reads both sides and rules
repair or accept; the repair lands on the rung's own branch with assertions, and a second
skeptic pass re-checks it. Whatever the judge leaves unrepaired is named for Pavol in the
landing report.
**Used.** 09-19 10:19-10:41 (rung N: `0 MOD -1` and its family threw `IntegerOverflow` on the
compiled path; the judge ruled repair; the second skeptic approved at 10:41).
**Accepted.** Yes; reported at 10:31:15 and in the landing record, and the judge's unrepaired
list (`0 DIV -1`, `|0|`, `-0`) was put in front of him at 11:56:48. He did not overrule it.

### 10. Independent review of the coordinator's own diagnosis, carrying the user's question verbatim

**Shape.** A fresh worker on the session model with an empty context, read-only in the tree, is
given Pavol's objection in his own words and asked to answer it; every verdict is taken from a
run in a fresh private cache, and the probes are committed with the report. Returns: what the
user was missing, what the coordinator was missing, and costed options with a default.
**Given.** His message verbatim, the program, the library, the specification; not the
coordinator's explanation.
**Used.** 09-19 17:02:43 to 17:33:09 (30.4 min, 93,732 output tokens),
`reviews/c4-flatarrays-review.md`, 191 lines with 95 probe files, committed `88cf9833a`. It
found the coordinator "was missing more" (four refused operator families, nine declarations, not
one) and confirmed his premise (C4 does use the standard arrays; there is no flat-array type).
**Accepted.** In part. The findings were accepted at once (ledger row 341 corrected, the rename
withdrawn). Its recommended default was refused: when the one model line it would change was
shown at 18:08:05, he answered "NO. NO! NOOOOO! That's not Fortress!" (18:13:00), and POSITIONS
now carries that as a standing order.

### 11. Route probes in a scratchpad, recommending nothing

**Shape.** One worker builds and proves each candidate route outside the tree, touching nothing
tracked, orders the routes by how much of the protected text they touch, and recommends nothing;
the diffs are committed as evidence afterwards. The coordinator's words when launching it: "A
worker is now building and proving each in the scratchpad, touching nothing in the tree, so that
you see the diffs before anything is done."
**Given.** The three routes, the library, the specification, an empty private cache per probe.
**Used.** 09-19 18:15:57 to 19:03:11 (47.2 min, 143,650 output tokens); evidence committed
`19179d27a` (`operators/A`, `B`, `C`, including the exact library and C4 diffs that landed
later).
**Accepted.** The route it proved (the library's own scalar extension) is what landed. Pavol
never saw the diffs: he had left the conversation at 18:32:48 and the edit was committed at
20:24:34. What he had ruled beforehand (18:31:44) was the method, not the diff: study the
library's own patterns and extend it in its own way.

### 12. Single-claim audit, confirm or refute line by line

**Shape.** A read-only worker is given one claim or one narrow discipline question and answers
it with a table of evidence, per site. Two ran in parallel on 09-19: whether C4 is safe under
parallel execution (every write site tabled with its enclosing loop) and how test discipline
stood across all three campaigns (probes written, defects found, which are gated).
**Used.** 09-19 10:08-10:28 (parallelism, 77,399 output tokens) and 10:15-10:26 (test
discipline, 44,897); both committed as `16448f2d6`.
**Accepted.** Yes; the test-discipline count (22 defects, 2 gated) is what produced decision 1
of the six. Note the limit the record shows: the parallelism audit "confirmed the claim, line by
line", and a measurement six hours later refuted the cost claim the explainer built on it
("The explainer's cost claim was wrong, and the measurement says so", 16:26:24). An audit that
confirms a reading is not a measurement.

### 13. The vocabulary review: his question, answered declaration by declaration with a probe behind every verdict

**Shape.** A worker takes Pavol's question in his own words as the header, enumerates every
declaration of the thing under review (40 of them), and gives each a verdict with a named probe
file and its captured output behind it; the count in the report is derived by a stated `grep` so
it can be re-derived.
**Given.** His question verbatim, the two vocabulary files, the library.
**Used.** 09-16, `explorations/run-c4/probes/vocabulary/REPORT.md` ("The vocabulary of Run C4:
habit or limit?").
**Accepted.** Yes; its rows went into the ledger with four other probe reports' (`b176a4b79`,
"Ledger: merge the five probe reports' rows (288-310)") and three of its findings are
load-bearing facts in FACTS today (no scalar-extension trait ships; `RR64` does
not satisfy the spec's algebraic bound; a view object is the language's own idiom).

### 14. The gate as mechanical review

**Shape.** No judgement at all: the full suite on the merged tree, caches wiped, before anything
lands — `ant testFast` and `ant testSystem`, with the counts recorded and compared against the
last landed counts. From 09-19 the counts also go into a ~5 KB summary file that the next gate
diffs against, and the four-thread `atomic` runs are part of it.
**Used.** Every landing: batch 1 green at 11:33:30 (1,409 + 382, zero failures); the library
repair at 20:24 (1,409 + 384, zero failures, caches wiped first).
**Accepted.** Yes; it is the standing rule of the ladder ("each rung gated on the fully green
suite", CLAUDE.md), and he asked for it to be strengthened on 12:50:41: "like turning up the
rigor of testing is good. If it's like, it's few seconds that buys us security."

### 15. Characterization inventory over the whole record

**Shape.** One worker reads the whole gap ledger and the reports around it and writes, area by
area, what the thing is for a named reader (someone who knows Scala, Swift, Kotlin and Rust and
not Fortress); every claim cites a ledger row or a `file:line`; general knowledge is not used;
where the evidence is thin the sentence says so. Nothing is run.
**Given.** The ledger, the reports, Pavol's question about where Fortress stands next to those
languages and what it implies for the order of the work.
**Used.** 09-15, `reviews/fortress-characterized.md`, 286 lines, committed `10153c1e8`.
**Accepted.** Yes; committed and indexed the same day.

---

## Notes for reuse

- Four of the fifteen were asked for by Pavol in his own words and carry that question in the
  header (4, 6, 7, 13). Two of those headers quote him verbatim, which is what lets the reader
  check whether the review answered the question asked.
- Three separate devices keep a review honest about its own limits, and each is stated in the
  header of the document that used it: read-only with no build or timing (6, 7, 12), every
  number from a committed file or transcript with the source beside it (6), and every verdict
  from a fresh private cache (10, 13).
- The one shape that produced a result he refused is 10, and the refusal was not of its findings
  but of its recommended repair. What the record shows about that: the option list arrived at
  17:35:20 in prose, and the single model line the default would change was shown 33 minutes
  later, after a worker to land it had already been launched. POSITIONS now requires the diff
  first.
- Two plan documents in `reviews/` were written by the same "read it and write the plan" shape
  but never attacked by shape 5: `nat-checking-plan.md` (09-16, 677 lines) and
  `template-checking-plan.md` (193 lines). `coordinator/array-design.md` (09-19, 203 lines) is
  the third and newest of these, and it has had no independent review of any kind; its author
  was a clean Fable worker and the coordinator states in the commit message and twice in chat
  that it read only the headings.
