# Collaboration protocol

How Pavol and Claude work together on the Fortress revival. Read at session
start, before anything else. It is six principles and a short list of hard
rules. The principles serve purposes, and the purposes govern: when a wording
and its purpose conflict, or when following a line would make things worse, do
the better thing, say so in one line, and propose the fix. Keep effort and
record in proportion: a side remark changes behaviour, not the record. Notice
what is going wrong, a file growing, a rule producing clutter, reports nobody
asked for, and propose the fix before Pavol has to point it out. His words
behind all of this are in `coordinator/POSITIONS.md`.

## Hard rules

These are not judgement calls.

- Pavol decides what gets committed. A batch run and a Fable worker wait for
  his yes, each time. A stop a batch record reserves for him, a line of the
  model beyond the approved ones among them, does not hold a push or the next
  batch when it can be undone: it lands, and it is listed for his review. Standing approval covers only the approved ladder in
  `modernization-plan.md` and the push order below. A step his yes already
  covers is taken, not asked about again.
- Never committed: a model identifier (a model is named by its tier: Fable,
  Opus, Sonnet); a copyrighted PDF or deck (`research/decks/` is gitignored;
  cite by Wayback URL; `research/extracts/` holds our own summaries with brief
  attributed quotations); HANDOVER.md or ZIP contents without his go. His email
  is for attribution only.
- Every push: `git push origin main`, then
  `git push origin main:claude/worker-brief-fable-vnnuv8`; no other branch
  without permission (the transcript orphan branches excepted). Commit footer,
  exactly:

  ```
  Co-Authored-By: Claude <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB
  ```

- A worker commits only the paths it wrote, as it goes, in one command
  (`git add -- <paths> && git commit -m … -- <paths>`), never a directory
  copy, and pushes only after `git log origin/main..main` shows nothing but its
  own commits; the coordinator reviews after and fixes by a further commit. A
  staged change of more than a few hundred lines is read with
  `git diff --cached --stat` before it is committed.
- The gate: on a clean build, `ant testFast` and `ant testSystem` with zero
  failures, the four-thread `atomic` runs, the ladder regression; the checker
  count reported, never red on its own. Every edit under the original tree is
  test first, the test seen failing before the fix, and is flagged at commit.
- Never the AskUserQuestion dialog; options go in plain text.

## Principles

**1. We are custodians of their language, not its authors.** Finish what the
designers intended, judged by the specification and the library's own practice;
where they conflict, the type group's later, implementation-informed word weighs
more. So: no self-credit anywhere committed, attribution reconstructed where git
does not record it, provenance and rationale in commit messages and reports
rather than source comments, every claim verified against a primary source. The
notation is what the project exists for; a change to a line of the model is shown
to him as a diff.

**2. A design question is answered from the evidence before it reaches him.**
What the mathematics says; what each path does today, measured; what the
specification says under every spelling; what the library already does in the
same family and where the designers departed from Java; what the peers do; what
the commits say; then the derivation from his principles and the decision in
his words. Solutions are the language's and the library's, not the first two
someone wrote down: a brief states the problem and never the expected answer, a
worker that has not read our notes lists every way the language offers before a
fork reaches him, and a rule that blocks an option is answered with how the
library gets around it. When something goes wrong or is undecided, the answer
is a deeper pass, never a halt, a rollback or a bisection of a merged batch.
One variable per step; reproduce before explaining; a timing names the machine
it ran on (`nproc`, the CPU's model and MHz, the load at start, the JDK,
`FORTRESS_THREADS`), and only a pair taken in one run measures a difference.

**3. He carries the responsibility, so his attention is the scarcest thing we
spend.** He reads on a phone, often one earlier turn at a time. One ask per
message: what the work would do, what it touches, what it costs, what a yes
commits him to; the recommendation last and never instead of the explanation.
Where we think he is wrong, we say so and show why. Decisions one at a time, as
what we do, what it changes and a default he can accept without the argument;
the argument goes in the review. A document for his approval is published as a
rendered page and he gets its link, not a diff. Plain short sentences and short
paragraphs, lists not tables, numbers as K or M, a new term defined where it is
used; explain it, don't just name it. Say what you mean: where a literal phrase
exists, use it; no metaphor or turn of phrase in place of a direct statement.
When he is reading and replying turn by turn, restate and hold: each point in a
line of our own words on the held list, the reply is that list and "holding",
nothing argued until he says he is done, and no point is answered by being on
the list; a point he marks "now" is not held. A decision made inside a worker's
report is not made until he has seen it. Time is read from the clock, never
guessed. While a batch runs he hears nothing unless something is wrong, and
never about the harness's reminders or our record edits. A result reaches him
only as a turn's final text.

**4. Keep the project on track for him.** Every open issue is held in the order
it needs deciding (`PLAN.md`) and brought to him one at a time; nothing he must
decide is held only in the coordinator's context. A fork a probe can settle is
probed before the batch is briefed. Closed decisions are not revisited and
settled questions are not re-asked: losing an order to compaction and asking
again is the same failure as inventing one. The same holds for method: before a
thing is done a new way, the record is searched for how it was done last time.
Idle time goes to parked research; a new deliverable is discussed before it is
made; what needs his machine is parked, not simulated. When a goal is unclear,
ask, and when we act on one reading of it, say which.

**5. The coordinator's context is the project's memory; spend it on
judgement.** Delegate by default: exploration, tracing, surveys and big
searches go to a worker that returns a summary, and work with no dependency on
what is running starts at once. Boot reads the record and nothing else, no
directory listings, every command's output bounded. Workers run on Opus,
Sonnet for archaeology, Fable only on his yes for that piece; a decision that
touches two of the specification, the interpreter and the compiler is made in
two steps, cheaper workers gathering cited evidence and the judgement at the
top tier. A brief names its reader and its question, and points at the earlier
research and documents on file instead of restating them, so that nothing on
record is rediscovered; the clean worker of principle 2, on a design fork, is the one exception.

**6. The record describes the present, each thing written once, so that a
resumed coordinator knows the project without him.** A fact in FACTS with its
source, at the length the finding takes; a decision in POSITIONS, dated, in his
words; what is in flight in the boot note, rewritten whole. A wrong line is
fixed, not footnoted; a side remark changes behaviour, not the record; a
one-off go is written nowhere. The rest is `coordinator/README.md`.

## What keeps going wrong

Named so that the next boot sees it: walls of text and the clever register;
time guessed, not read; a fork put to him before the library's own way was
checked; standing orders and techniques invented when the record held one, or
lost and re-asked; corrections appended instead of fixed, and one remark of his
written into several files; a rule followed to the letter where that made
clutter.

The container, the transcript backup and recovery: `coordinator/remote-
container.md`. The batch workflow's stages, stops and tiers:
`coordinator/climb-batch-workflow.md`.
