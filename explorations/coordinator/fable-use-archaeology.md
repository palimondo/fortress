<!-- Archaeology of every time a Fable (top-tier) worker was proposed, asked for, run, declined or questioned, 2026-09-20 to 2026-09-29, written on Pavol's ask of 2026-09-29 10:10 UTC to derive the rule for relaxing the hard "ask each time" requirement, from `explorations/coordinator/POSITIONS.md`, `POSITIONS-history.md`, the judgement files under `explorations/reviews/` and `explorations/coordinator/`, and the live session transcript. -->

# When Fable ran, and when Pavol was asked

## Method

Sources, read in the order the brief set: `coordinator/POSITIONS.md` and
`POSITIONS-history.md` (his decisions in his words, with dates); `coordinator/INDEX.md`
(every note whose line names Fable or "top tier"); the judgement files themselves under
`explorations/reviews/` and `explorations/coordinator/`, for their header provenance
lines; then the live transcript
(`/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`),
grepped for his exact words and their timestamps. No archived session on the
`transcripts` or `transcripts-blinded` branches falls in this window; the whole period
2026-09-20 to 2026-09-29 lives in the one live transcript. Quotes are copied as the
transcript has them, including the harness's own note that speech-to-text sometimes
mangles "Fable" ("stable worker", "table should review"); Pavol's standing instruction is
to recover such slips from context silently, which this note does, flagged once here.

Every case below is a *deliberate* dispatch of a Fable worker for a design judgement, a
batch-manifest review, or (twice) a meta/process review — not the routine, pre-pinned use
of Opus for rung work, which is unlimited under the 2026-09-20 rule and not counted.

## The cases

### 1. The origin: two workers on the wrong tier

**2026-09-20, 06:34 UTC.** Not proposed by anyone: two workers doing post-mortem
transcript analysis of the previous session (his ask at 06:21 UTC) ran on the
coordinator's own tier (Fable) instead of the pinned worker tier (Opus) — an inherited
default, not a choice. Question: process/record-keeping, none of specification, library,
interpreter or compiler. He noticed at **06:43 UTC** ("Just to make sure the workers you
are launching are Opus, correct?"), restated the rule at **06:44 UTC** ("the fable is
reserved for the highest intelligence works... you are fable, the workers are always opus
unless I request fable for high level analysis"), asked for a number at 06:47 UTC, and at
**06:51 UTC**: "I'm counting it as 1.7M down the drain. While I'm trying to keep you in
the low hundreds, to stay in the smart zone." No judgement resulted; the tokens bought
nothing he wanted. This is the objection to a tier choice the brief names.

**2026-09-20, 07:13:52 UTC.** He then set the hard rule itself, unprompted by a fresh
proposal: "please never run Fable workers without first consulting with me and getting
permission. You can spend as much Opus workers as you want." His reason, same message:
the highest-risk decisions touch specification, interpreter and compiler together, which
may disagree, and the top tier is for weighing them, not because Opus is incapable.
Source: transcript lines around 07:13:52Z; `POSITIONS.md:41`, `POSITIONS-history.md:43,46`.

### 2. Library route (specification's silence, library, compiler)

**2026-09-20, 14:39:06 UTC**, Pavol asks himself, same day as the hard rule (voice
transcript reads "stable worker", recovered as "Fable worker" from context and the
committed file's own header): "approving [Fable] worker for review of the library
unification. I fully believe that the compiler second library is just a bootstrap." Areas:
library + compiler. An Opus-written evidence brief (`coordinator/two-libraries.md`) came
first. Delivered 15:02:55 UTC as `coordinator/library-route-judgement.md`. His decision
followed on 09-21 ("What decisions are there to make that we didn't already make?"),
taking the judgement's recommendation (one library, the interpreter's) without a stated
reversal. Tokens: not recorded.

### 3. The exclusion-rule fork: a synthesis asked for, then folded into the workflow

**2026-09-23**, weighing the exclusion-rule fork (route A vs keep-the-rule), he asked for
"a Fable synthesis of the notes and this position into a design brief once the scope probe
lands" (`POSITIONS-history.md:91`). Areas: specification + library + compiler (the
multiple-instantiation-exclusion rule touches the checker, the library's tower and the
spec's text). **2026-09-24**, launching batch 3.5, he held the batch back until that
synthesis landed: "making sure the Fable tokens are primarily allocated to planning the
mie resolution, then progress on batch" (`POSITIONS-history.md:94`) — an explicit
ordering of scarce Fable spend, not a refusal.

### 4. The workflow's own judge-tier rule

**2026-09-24.** Not Pavol asking for one Fable run; he approves a standing mechanism: a
judge's *first* ruling on a rung or merged tree runs on Opus, a *second* ruling escalates
to the top tier — "if my understanding is correct then I am fine with this proposal please
implement it" (`POSITIONS.md:61`; `POSITIONS-history.md:103`). This is process, not a
spec/library/impl question. **2026-09-26, 00:44:25 UTC**, after the session itself moved
to Opus, he re-pins the escalation to Fable by name: "Second ruling is for Fable." In the
same message he also asks for a one-off: "Also let Fable review
coordinator/CLIMB-BATCH-4.md before we launch it." (batch 4's manifest, covering the
coercion rung, the spec rung and the checker's `nat`/`int` rung — library + specification
+ compiler.)

### 5. S2: the specification's refused examples under route A

**2026-09-26, 07:31:58 UTC.** He asks directly, resuming a held item: "Run [them] and
let's finish that exploration properly. S2 judgement on Fable, go." Areas: specification
(route A's text) + library (the one-library shapes each refused example becomes), captures
run on both interpreter and compiler paths. An Opus worker's 24 probes
(`reviews/spec-refused-examples.md`) came first. Delivered as
`reviews/spec-refused-examples-judgement.md`; he took it whole at **09:32 UTC** ("S2 yes,
take the verdicts for rung S") — no stated disagreement with its recommendation.

### 6. Batch 5's manifest

**2026-09-26, 09:57:22 UTC** (voice transcript "table should review", recovered from
context): "Yes, [Fable] should review. Let's continue with the questions." Procedural:
review of a drafted batch manifest (wrapping operators, spec rung, run-time sizes), not a
design fork on its own. An Opus planning worker's draft came first, always. Reviewed in
place, diffed, launched on his "Batch 5 go" the same day.

### 7. Answers 9, 10 and part of 12: the overload sentence and `fill`

**2026-09-26, 10:21:32 UTC.** He asks directly, in reply to an unrelated item: "Yes. Run
Fable judgement as well." Areas: specification (the overloading sentence) + library (the
`fill`/`tabulate` split) + interpreter (walk's dispatch order) + compiler (the checker's
three rules). Two Opus clean-worker lists came first (`reviews/overload-static-params-ways.md`,
`reviews/fill-overloads-ways.md`), plus S2's judgement as a third input. Delivered as
`reviews/overloading-judgement.md`; he took its recommendations at answers 9, 10 and 12
("Yes, agreed" / "Agreed, tabulate" / "Agreed, decision 3 stands"), each in its own
message, no stated disagreement.

### 8. Answer 7: what replaces `SUM`'s and `PROD`'s catch-all

**2026-09-26, 12:27:35 UTC.** He asks directly: "Let's run our Fable worker on prep for
answer 6. We'll later retroactively verify with Astra." (Read as answer 7, per his own
correction on record.) Areas: library (the reduction's algebra bounds) + specification
(`reductions.tex`) + interpreter (walk's join) + compiler (the checker's witness
`typecase`). An Opus clean list (`reviews/flattening-questions-ways.md` Question 1) came
first. Delivered as `reviews/sum-replacement-judgement.md`; he took it as recommended:
"Agreed, option A."

### 9. The `BIG MAXN`/`MINN`/`MINMAXN` identities: the named case

**2026-09-26, 15:48:10 UTC.** This is the case the brief names by its quote. The
coordinator's own (Opus-tier) recommendation had flip-flopped twice on whether to drop or
rewrite the three operators, skipping its own protocol step of checking the library's
existing `BIG MAX`/`BIG MIN` first. His ruling: "I think we have arrived at your dumb
zone. I don't trust your judgement at all on this. I want to hear what fresh Fable has to
say on this." Areas: library (the three operators) + specification (the algebraic-
constraints chapter, the identity design). Deliberately **no** Opus recommendation came
first as an input — the brief gave the Fable worker only the question, not the
coordinator's answer, which is the one case built to exclude the cheaper tier's opinion
rather than build on it. Delivered as `reviews/max-min-identities-judgement.md`; his
answer, **09-26**: "I accept the recommendation" — the three operators dropped, on a
reasoned identity argument the coordinator's own guess had not produced. **This is the
clearest case where the top-tier judgement's answer differed from what the coordinator had
recommended, and he took the judgement over the coordinator.**

### 10. Batch 6's manifest

**2026-09-26, 19:22:25 UTC.** "Fable review is a go. BTW I pre-approved it in my second
reply after compaction, didn't I?" — he checks his own memory of having already approved
it and is told the coordinator had read the earlier message as a question, not a standing
yes (`POSITIONS-history.md:275`). Procedural review of the flattening batch's manifest
(library + specification + compiler). Launch conditioned on "no open question left" for
him (`POSITIONS.md:117`).

### 11. The numerics plan: blinded, parallel, then synthesis

**2026-09-27, 15:28:53 UTC – 15:35:00 UTC.** The most detailed process instruction he
gives for a Fable dispatch. First: "Yes, after compaction, you boot and then you write your
idea and set Fable to review it adversarially. Under the assumption that Fable is smart and
Opus is stupid." Then, specifying the shape: "I would like you to ask Fable to first
approach the same problem on its own, blinded to your proposed solution. When it is
finished with its plan, it should look at yours, then do the synthesis and then go back to
you. ... I want to see Fable's plan, yours plan, and the synthesis in all separate
artifacts." Areas: the whole roadmap — specification, library, interpreter and compiler
together (what moves the needle to a compiled microGPT). Deliberately **no** Opus list
came first for the Fable half; the coordinator's Opus plan was built in parallel, each
blind to the other, exactly as he specified, and Fable then read the coordinator's plan
and wrote the synthesis. Delivered as `reviews/numerics-plan-fable.md`,
`reviews/numerics-plan-coordinator.md`, `reviews/numerics-plan-synthesis.md`; he answered
the synthesis's five decisions one at a time (15:24–20:28 UTC that day, `POSITIONS.md:129`),
taking option 1 at each. Tokens: not itemised for this run; the record's general units are
a worker session 0.4M–0.8M, a batch's tail 8 agents/2M tokens
(`reviews/numerics-plan-fable.md:96`).

### 12. Standing pre-approval for the coming batch reviews

**2026-09-27, 21:08 UTC.** Asked whether the coordinator can write the coming batches'
manifests from the synthesis alone or needs Fable to review them each time: "If so, these
are pre-approved. I want you to do autonomous overnight run." (`POSITIONS.md:129`.) This
is the one place before today he already relaxed the per-instance ask, but only for one
narrow, recurring category — a top-tier review standing in for his own review of a batch
*record* (7R, N, 7b's second run, 8) — not for a fresh design judgement. Used for
`coordinator/climb-batch-7R-review.md`, `climb-batch-N-review.md`,
`climb-batch-N-review-2.md`, `climb-batch-7b-review.md` (each header cites this
pre-approval directly).

### 13. Meta: the coordinator's own record-keeping and the protocol's wording

**2026-09-27, "at his ask"** (`postmortem-2026-09-27-record-keeping.md:20`, exact minute
not separately timestamped): a fresh Fable instance proposes a redesign of the boot-read
record (`coordinator/record-keeping-proposal.md`) and, the same day, reviews the rewritten
protocol against Anthropic's own prompting guidance for the two tiers
(`coordinator/protocol-guides-review.md`). **Areas: none of specification, library,
interpreter or compiler — this is process/meta work**, the one clear counter-example to
"Fable only for the spec/library/impl triangle." It is also the period when the
coordinator's own session tier had itself been Fable (until the 09-25 compaction) and was
now Opus, so these are Pavol reaching for the tier he trusts for judging the coordinator's
own conduct, independent of subject matter.

### 14. `AnyIntegral`'s `comprises` clause

**2026-09-28, 04:39 UTC.** He answers a proposal from the previous night's batch-7 landing
with "Yes, Fable for the judgement." Areas: specification (`traits.tex`) + library
(`FortressLibrary.fsi`'s closed trait) + compiler (`TypeHierarchyChecker.scala`). An Opus
"nine steps" clean worker's twelve ways came first (`reviews/anyintegral-comprises-ways.md`),
after Pavol had separately pushed back on that same worker's brief for re-measuring what
the record already had ("you are wasting resources on remeasuring", `POSITIONS.md:130` —
a questioning of the Opus step, not of Fable). Delivered as
`reviews/anyintegral-comprises-judgement.md`; his answer at **08:52 UTC**: "Option 1." —
took the recommendation.

### 15. Probe K: conversions meeting overloading, "educate me"

**2026-09-28, 13:10 – 13:51 UTC.** The clearest self-aware case. He first states a
principle (13:10, "we must make it fast, and generic is never fast") and picks an option
on condition it is sound (13:32). Told of a third option, he stops himself: "now I'm torn
... I need some wider context, like nine steps on this. And maybe a fable judgment. ...
I cannot be trusted to derive a rule that wouldn't break the whole system." At **13:51
UTC** he says yes to both the nine steps and the Fable judgement. Areas: library
(declaration shapes) + interpreter (walk's dispatch) + compiler (the checker's
applicability rule) + specification (the coercion chapter) — all four. An Opus soundness
check (`reviews/option-2-soundness.md`) and an Opus "nine steps" list
(`reviews/conversion-overloading-ways.md`) both came first. Delivered as
`reviews/conversion-overloading-judgement.md`; his answer at **19:06 UTC**: "Both
recommendations for batch N accepted." **Its decision 1 explicitly did not take his own
proposed broader rule** (his "way 4" of 13:51), recommending a narrower option 1 instead;
he took the judgement's narrower answer over his own idea, without recorded objection.

### 16. Items 26 and 30: `comprises` at the type level, and a generic beside a plain arm

**2026-09-28, 19:50 UTC.** After two Opus clean lists (`reviews/comprises-type-level-ways.md`,
`reviews/plain-beside-generic-ways.md`): "Yes, Fable for both." Areas: item 26 —
specification (four passages) + compiler (checker) + interpreter (walk); item 30 — library
(overload resolution) + interpreter + compiler, and overlapping with his own 19:06
decision (case 15) on "which declaration runs." Delivered as
`reviews/comprises-type-level-judgement.md` and `reviews/plain-beside-generic-judgement.md`,
each recommending option 1; **not yet answered** by him as of this writing — `PLAN.md`
lists both as open, taking option 1 by default if batch 7b launches first.

### 17. The item-30 duplicate: a Fable dispatch he flagged as wasted

**2026-09-28, ~19:27 – 19:54 UTC.** Separately from case 16, batch 6.5's landing gather
wrote PLAN item 30 as "no default on record," not noticing his 19:06 decision (case 15)
already settled which declaration runs. A clean worker (0.40M tokens, started 19:27 UTC)
and a Fable judgement (0.30M tokens, started 19:53 UTC) were already running on the
now-partly-redundant question when he caught it at **19:54 UTC**; the post-batch review
records "Your 19:06 decision already settled most of item 30. A clean worker and a Fable
judgement were still briefed on it, about 0.7M tokens. You spotted it."
(`reviews/batch-6.5-review.md`, "For Pavol" and finding 88.) Not a refusal — the narrower,
genuinely new question (at which instance) was still worth answering — but the closest
thing on record to him objecting to a Fable dispatch already in flight, on grounds of
waste rather than subject matter.

### 18. Batch N's landing: Fable declined in favour of shipping

**2026-09-29, 08:14 – 08:40 UTC.** Batch N returned unlanded on one blocking finding after
one repair round. Put to him with three options — finish with a Fable second ruling and
repair; land as is; hold — he chose to land: "let's ship and do some repairs afterwards"
(08:40 UTC), moving the owed tests to a later batch and asking for a workflow rule change
so a red merged-diff review does not hold a green gate (`POSITIONS.md:137`). This is a
direct case of Fable being offered and declined — not because the question was wrong for
the top tier, but because he weighed the cost of another judgement round against shipping
a green gate.

### 19. Standing, unresolved: may Fable rule overnight unattended

Raised 2026-09-27, still listed as waiting for his answer in `PLAN.md:186`: "May a Fable
judge rule overnight on a review's findings?" This is the one open question closest to
today's proposal, on record before it — evidence that the per-instance-ask rule was
already felt as a cost before he named it directly.

## The pattern

- **Every deliberate design-judgement dispatch (12 of the 14 non-procedural cases: 2–3, 5,
  7–9, 11, 14–16) touches at least two of specification, library, interpreter and
  compiler**, exactly as principle 5 already states it; the exceptions are process/meta
  work he sent to Fable anyway (case 13) because the question was the coordinator's own
  conduct, not the language.
- **An Opus worker's evidence or "ways" list comes first in every case except two**, both
  deliberate: when the question was really whether to trust the coordinator's own
  judgement (case 9), and when he wanted two independent tiers compared rather than one
  building on the other (case 11).
- **He has never refused a Fable dispatch once it reached him as a proposal.** Every "go"
  quoted above is a yes; the only two times a Fable path was not taken were case 18 (an
  operational choice to ship rather than run a second ruling — the question itself was not
  a spec/library/impl fork) and case 17 (a duplicate he caught, not a proposal he refused).
  This matches his own words to the archaeology worker: "I haven't denied running a fable
  worker anytime you proposed it" (2026-09-29, 10:10:59 UTC).
- **The times he asked for Fable himself outnumber the times the coordinator proposed it
  and he said yes** (roughly 10 self-initiated asks against 5–6 coordinator proposals
  among the cases above), and his own asks cluster at two triggers: a question he cannot
  hold in his head without "nine steps" of grounding (cases 15, and implicitly 9, 11), or
  a loss of trust in the coordinator's own answer (case 9 explicitly, case 17's catch
  implicitly).
- **Procedural batch-manifest reviews are a separate, lighter category** already partly
  pre-approved (case 12) and never refused; they are a quality gate on a plan, not a
  design fork, and cost less scrutiny per instance.

## The proposed rule

The coordinator runs a Fable worker without asking first only for a question that already
has an Opus worker's evidence or "ways" list gathered, that touches two or more of the
specification, the library and the implementation (interpreter or compiler), and that is
not already settled by a decision on record (POSITIONS or an unretired PLAN default) —
checked before launch, so the item-30 waste of case 17 does not repeat. It is used
sparingly: for the design forks the record shows Pavol has asked for or accepted every
time, not for routine rung defects, not for batch-manifest reviews (which keep their own,
already-standing pre-approval), and not as a substitute for asking when the question is
really about the coordinator's own conduct or a genuinely new kind of process choice (case
13, case 19) rather than the language. The coordinator still asks first whenever a
question does not meet all three conditions, whenever its recommendation would reverse a
decision already on record, or whenever — as in case 11 — the value is in Fable and Opus
working independently rather than one following the other. He learns a Fable worker ran
the same way he learns of every decision: one message, in the judgement's own "For Pavol"
section, the recommendation last, when the judgement is ready for his answer — never a
running-status ping.

## Cases the rule would have decided differently

Applying the rule above to the record:

- **Cases 2, 5, 7, 8, 14, 15 and 16** (library-route, S2, the overload sentence and
  `fill`, `SUM`/`PROD`, `AnyIntegral`, probe K, and items 26/30) each already had an Opus
  list in hand and touched two or more of the triangle before he was asked. Under the
  proposed rule the coordinator would have run Fable on each without waiting for his
  individual "go," saving one round trip per case — on the record, that is at least seven
  of the fourteen design-judgement cases above.
- **Case 12**'s standing pre-approval for batch-record reviews would extend naturally to
  batches 5 and 6 as well (cases 6, 10), which at the time still needed an individual yes;
  under the rule they would not have.
- **Case 17** (the item-30 duplicate) is exactly the failure the rule's third condition —
  check the record before dispatch — is written to catch; under the rule as drafted, the
  coordinator would have found his 19:06 decision first and not spent the 0.7M tokens on
  the settled half of the question.
- **Case 9** (`BIG MAXN`/`MINN`/`MINMAXN`) would **not** have changed: the rule is about
  subject matter, and this dispatch was triggered by his loss of trust in the
  coordinator's own answer, which the coordinator cannot detect about itself. He would
  still have had to say so himself.
- **Case 11** (the numerics plan) would **not** have changed either: the value was his own
  specific instruction to run Fable and Opus blind and in parallel, a process choice the
  coordinator would not invent unprompted; the rule's own fourth exception (case 11's
  "independent tiers" pattern) is written to leave this one with him.
- **Case 18** (batch N's landing) would **not** have changed: it was never a
  specification/library/implementation fork, only whether to spend a second ruling on a
  reversible stop before shipping a green gate — an operational call the rule does not
  cover.
- **Case 1**, the origin incident, is untouched by this rule either way: it was an
  accidental tier default on routine delegated work, already fixed by pinning workers to
  Opus by alias; the new rule only ever widens when the *top* tier runs without asking, and
  says nothing about ordinary workers running on the wrong tier by mistake.
