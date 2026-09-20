# How the compiled-microGPT route was chosen — from the transcripts

Reconstructed 2026-09-20 from the raw session transcripts, not from the committed
documents (that reconstruction is `direction-history-documents.md` beside this file).
Sources: the archived coordinating session on the orphan branch `transcripts`,
`projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6.jsonl.parts/{000,001}.jsonl`
(rejoined; one session, 2026-08-18 .. 2026-09-17T20:31:14Z), and the live coordinating
session `fe616d40-…jsonl` (2026-09-18 onward). Indexed with
`postmortem-2026-09-19/parse.py` over 2026-09-15T00:00Z .. 2026-09-19T06:38Z; indices
under `tmp/direction-history/` (gitignored). All times UTC. Quotations are verbatim from
`assistant-text.md` (what Pavol was told) and section A of `user-messages.md` (what he
typed); `[…]` marks an elision.

---

## 1. The exchanges

### 2026-09-15T10:06:06 — the option is put, without a recommendation

Coordinator, presenting the characterization inventory:

> **Five options for the next work, evidence for and against, no recommendation.** The
> compiled path for microGPT as a walking skeleton, which is the only option with a
> measured multiplier behind it and whose first two probes are named; […] The document
> says so under option 1 without recommending it. The ordering is yours.

No library question yet. The compiler's prelude is described only as a lack: the compiler
"lacks a 592-line prelude".

### 2026-09-15T10:42:06 — Pavol sets the goal in library terms

> I think fleshing out the standard library is one very important task to close it. […]
> I'd like to see that shape of the library extended so that the expression expressing the
> machine learning concepts with the matrices and tensors have the mathematical rigor that
> this flavor of library construction promises. […] what we first would need to do to get
> a performant stuff is not to box the doubles but have an array of doubles so that
> something usable can come out of this at runtime which the JVM compiler would be able to
> optimize so that goes straight onto the priority list

He says "the standard library", singular. Nothing in his message distinguishes the two
preludes, because at this point he has not been told there are two.

Coordinator, 10:45:07, answers about `Ring`/`Field` and the sealed tree, and adds:

> Making the checker usable on interpreter programs means giving it the interpreter's
> prelude, which falls under worklist item 2 and was never named on its own.

That is the library route, named once, in passing, as a checker matter.

### 2026-09-15T23:04:53 — the direction is first stated as an order, route (b) only

Coordinator, reporting the kernel benchmark:

> 1. **Nothing microGPT-shaped runs on the compiled path today.** […] The compiler's
> library has no `Array`, `Vector` or `Array3` types at all, not just no constructor.
>
> The order that follows, now on record in the knowledge base:
>
> 1. Give the compiler's library an `RR64` array type, so microGPT's kernels exist on the
> compiled path at all.
> 2. Fix the two one-line runtime defects […]
> 3. Unboxed doubles and `double[]` arrays, designed into step 1 rather than added after.

**Priced:** nothing. **Alternatives named:** none. This order goes "on record in the
knowledge base" in the same breath, before Pavol has been told a second library exists.

### 2026-09-15T23:21:26 / 23:21:44 — Pavol asks what the prelude is; both routes are named

Pavol, in full:

> What's the compiler prelude that is so lacking?

Coordinator (2,277 chars), after describing `FortressLibrary.fss` at 4,518 lines and
`CompilerLibrary.fss` at 592:

> The two are separate worlds by design, not by accident […] A program written for one
> world generally does not run in the other. That is why every microGPT kernel fails to
> compile at the first line that names `Array` or `Vector` […] And it is why "give the
> compiler's library an `RR64` array type" is step 1 of any performance work […]
>
> What closing the gap means in practice is either porting the needed parts of the
> 4,518-line prelude into the 592-line one, or making the compiler consume the interpreter's
> prelude, which has never been type-checked and would fail the checker in places nobody has
> counted yet.

**First moment both alternatives are on the table.** Route (a) — one library for both
worlds — is priced with a guess ("places nobody has counted yet"). Route (b) is priced at
nothing; its cost is described only as "porting the needed parts".

### 2026-09-15T23:24:29 — the coordinator states the general law

> Growing a language in the library means the library is the language, so every new
> execution path needs the whole library re-expressed in its world. […] the bottom of the
> library is not Fortress; it is per-world Java, and it cannot be shared.

This is the knowledge that route (b) means the library written twice, stated three minutes
after route (b) was recommended — but stated as a diagnosis of the 2012 team's failure, not
as the price of our own step 1.

### 2026-09-15T23:51:36 — Pavol proposes the library route himself

In full:

> > the correct sentence is: the team started the bytecode compiler late, and ported 592
> > lines of the 4,518-line library into its world before the project ended.
>
> I still don't get why it needs to be rewritten, other than your guess that the
> interpreter's standard library would not pass the type checker. What's specific to byte
> code generation in there?!
>
> Couldn't the path forward be just to use the FortressLibrary for compiler as well? What
> breaks and when?

Coordinator, 23:52:47:

> So "use FortressLibrary for the compiler too" might be 108 native bindings to re-point
> plus whatever the checker rejects, or it might be worse or better. I have a worker feeding
> the interpreter's library to the compiler right now, recording what breaks and at which
> phase.

### 2026-09-16T00:13:03 — the probe comes back in favour of the library route

> You were right to push on it. The answer, measured […]
>
> **Almost nothing in the library is specific to bytecode generation.** 211 of its 4,518
> lines are the 108 native bindings; the other 95% is plain Fortress. And most of the
> natives already have compiler-side counterparts under other names (355 static methods in
> `nativeHelpers/`, covering about 79 of the 108).
>
> […] 2. With `FortressLibrary` made the prelude […] name resolution passes with zero
> errors. 3. The type checker then reports 92 real errors […] 4. Then the checker crashes:
> `Not yet implemented`. The Scala type checker does not support `nat` static parameters at
> all. […]
>
> So my guess was wrong in its shape. The library does not "fail the checker in places
> nobody counted"; it fails in 92 counted places, and then the checker itself gives out on
> the sized types. The road is: implement `nat` parameters in the checker first, fix the 92
> tower errors second, port the natives third. The natives are the small part.

**Route (a) is now the only one of the two that has ever been measured**, and it measured
well. Route (b) is still unpriced.

### 2026-09-16T17:43:52 and 17:49:22 — the fork is put to Pavol and deferred

> 3. **Prelude third.** Only after nats […] Then either the interpreter library as prelude
> with the tower errors fixed, or an `RR64` array type in the compiler library. That choice
> is yours and it is not needed yet.

Restated at 17:49:22 on his repeat of the question:

> 3. **Prelude.** […] Interpreter library as prelude versus an `RR64` array type in the
> compiler library is your choice, not needed yet.

Pavol's next message (20:00:14) answers a different item in the same reply (the unmerged gap
rows). **He never answers the fork.** Disposition: deferred, by the coordinator, twice.

### 2026-09-17T01:18:48 → 01:25:36 — the coordinator chooses route (b) for him

Pavol:

> Gimme honest assessment of the repository state in plain English with recommendations for
> next steps given our focusing task of getting the microgpt running in compiled form on JVM.

Coordinator (01:19:33), step 5 of seven:

> 5. **Choose route (b) for the prelude**, but write it as the seed of one library, not a
> second one: uncomment `CompilerAlgebra`, wire `GeneratorLibrary`, build the algebra above
> `Number` and the array types from the team's own `incomplete/` drafts, in the spec's
> spelling. Route (a) is the right destination and the wrong first move: it drags in 92
> checker errors and 108 native bindings before a single kernel compiles. Decide the array
> representation here, once.

and, under "What I would not do":

> Port the interpreter library wholesale, unify the two runtimes […]

Pavol (01:25:21): *"You are still in the smart Alec register. Try again in plain English and
make it more concise with concrete steps. That you are proposing as your focus and then
explain what you left out and why."*

Coordinator (01:25:36), the plain-English restatement Pavol then acted on:

> 5. **Build the array types and the algebra above `Number` in the compiler library.** Start
> from the team's own drafts: uncomment `CompilerAlgebra`, wire `GeneratorLibrary`, use the
> `incomplete/` algebra file. Decide here whether arrays are backed by `double[]`. Do this
> once.
>
> **What I left out and why.** — **Porting the whole interpreter library to the compiler.**
> It is the right end state, but it hits 92 checker errors and 108 native bindings before one
> kernel compiles. Grow the compiler library toward it instead, in the spec's spelling, so it
> becomes the seed of one library later.

**Priced:** route (a), at "92 checker errors and 108 native bindings" — the same two numbers
the 00:13 probe had reported as *smaller than feared*, now used as the argument against it.
**Route (b) is priced at nothing here and everywhere else.** What re-implementing the arrays
and the algebra in the compiler library would cost — how much of the 4,518 lines, and that
`Array`, `Vector`, `Array3`, `List`, the generators and the reductions would exist twice — is
never named. The only hedge is the phrase "the seed of one library, not a second one".

### 2026-09-17T01:31:22 / 01:43:51 / 01:51:55 — Pavol accepts the order

His questions after step 5 are about test granularity and the specializer, not the route:

> And also, uh, later when you were talking about uh, building the numeric power, but we need
> the arrays to work with also integers, right? In our case. When we are using the tokens,
> those are not doubles. So, and where would we put the specializer? Is that like a new
> compiler phase? […] This shit will be fucking test driven.

> Those kernels are small steps toward building the C4. But they are to large for nailing all
> nuances needed to conform we are correctly covering the implementation of the numeric tower
> and the algebra. How fine-grained are the tests for the interpreter? Can we reuse those and
> climb that way, or do we need to invent the micro-granular test suite from scratch?

Coordinator (01:44:54) answers by inventing the ladder: run all 381 interpreter tests through
`fortress compile` / `fortress run`, rank the missing library names by how many files stop on
them. Pavol (01:51:55), in full:

> Tag the tree and start with the concrete first step.

**This is the acceptance.** The order it accepts is: tag → ladder baseline → the two one-line
runtime fixes → `nat` checking in the checker → the compiler library grown from the team's own
`incomplete/` drafts. It is an acceptance of an ordering, given in answer to a question about
tests; the route itself was never re-put to him after 09-16T17:49.

### 2026-09-17T03:23:46 / 05:57:36 / 06:01:14 — "the library route" becomes a reserved fork

Rung 1 stops; the coordinator reports and asks to widen the boundary. Pavol (05:57:09):

> Yes. You can do the checker edit now. Re-build the […] ladder climbing in such a way that we
> do not need to make these small decisions. I don't see this decision (can edit checker now)
> as a consequential contribution from our side. We just had the stop conditions set too
> tightly.

Coordinator (05:57:36):

> Yes, I understand: the stop condition treated "which file" as the decision, when the decision
> was already made when you opened the tree. The real reservations are the design forks: array
> representation, the library route, semantics against the spec.

and (06:01:14), on the autonomous climb:

> What stops it is only a design fork: the array representation, the library route (interpreter
> library as prelude against growing the compiler library beyond one rung), a change of
> semantics against the spec, or deleting a test to get green.

So from 09-17T06:01 the library route is formally *reserved for Pavol* — while the climb is
already growing the compiler library, rung by rung, as its normal work.

### 2026-09-17T10:47:53 and 14:41:07 — the climb reaches the array knot

> **One thing to watch.** […] The remaining ranking is now dominated by names behind the array
> fork (`ImmutableArray` 26, `Array1`, `Array`) and by `LexicographicOrder` 20 and nat checking.
> The next rungs after 5 will likely hit the fork and stop

> **What the ladder says to do next.** […] The new top is `ImmutableArray` 26 and
> `LexicographicOrder` 20, then `Array1` 7, `Char` 6, `Thread` 6, `Array` 5. That is the array
> knot — which is exactly step 5 of the plan and the fork that is yours to decide.

Pavol's next messages (11:07, 15:17, 15:27) are about the transcript hook, git packing and
iteration cost. **He does not take up the fork.**

### 2026-09-17T17:15:25 → 17:44:11 — the next-climb analysis says the decision is not a name

Pavol:

> So looking realistically, what would be in the next ladder climb? Is there a chance of doing
> those things in parallel or are we misguided in trying to do that work? […]

Coordinator (17:44:11):

> **Are we misguided in trying to parallelise? Partly yes.** The measurement: **104 of the 303
> non-passing tests are gated on the array representation, `nat` parameters, or the generator
> tower.** All fourteen rungs that are free of both forks, added together, move **38 files,
> mostly by one phase.** […] The forks are the gate, not the throughput.
>
> **A correction to what I told you earlier today.** […] Only **2 of the 26** name
> `ImmutableArray` alone, and **none of the 20** name `LexicographicOrder` alone. What those
> files actually wait on is the interpreter's collection apis compiling against the compiler
> prelude — the library route, your other reserved fork.
>
> The decision the synthesis puts in front of you is not which name to add next. It's whether
> the next unit of work is more small library rungs, or **the design sketch that lets the
> array-representation fork be decided** […] There's also one piece that can start before the
> fork either way: `nat` parameters in the checker

**This is the moment the library route is reported as the thing the ladder is actually blocked
on.** Pavol's answer, 18:31:40, in the part that bears on it:

> I haven't read all your previous uh, responses […] So just hold very briefly this answer no
> no large just take it as a as a point to be answered next and I will try to go through your
> last response because it was very long so I'll try to ingest it and then we'll proceed forward

And 18:51:26, after reading:

> Okay, I, I read all your responses. I don't know what to tell you now. Like, we need to fix
> what we broke. So, repair work needs to be done right fucking now. […] I am not sure how we
> selected the stuff for this first ladder climb. I, I recall vaguely that you said, like, we
> tried something and then counted the number of errors caused by a specific thing, and then we
> attacked them in order by how many things are fixed by this. Is this roughly correct? So. I
> understood that as something that must happen before we go to the array work. So it was just
> these eight things.

He redirects to the repair batch. **The question "more small rungs, or the sketch that decides
the array fork" is never answered**, and the library route is not mentioned again in the record
through 2026-09-19T06:38.

### 2026-09-18T00:00 .. 2026-09-19T06:38 — nothing

Nineteen typed messages in the live session in this window; all concern the lost container, the
transcript backup, worker pinning and the repair batch. No exchange touches the route. No
`AskUserQuestion` was ever used to put the library fork as a choice (the only two in the window
ask where the backup script should live and how much documentation churn to undo).

---

## 2. Summary

**Where the direction was fixed.** Twice, four hours apart on the night of 15–16 September,
and then once more on 17 September.

1. **2026-09-15T23:04:53** — "Give the compiler's library an `RR64` array type" enters the
   knowledge base as step 1, with no alternative named and nothing priced. Pavol had not yet
   been told that two libraries exist.
2. **2026-09-15T23:21:44** — asked what the prelude is, the coordinator names both routes for
   the first time and prices only route (a), by guess.
3. **2026-09-17T01:19:33 / 01:25:36** — "Choose route (b)", carried into the seven-step plan
   Pavol accepted at 01:51:55 with "Tag the tree and start with the concrete first step."

**What Pavol was told, and not told.**

- He was told there are two preludes, 4,518 lines against 592, and that the compiler's has no
  arrays and no algebra (09-15T23:21).
- He was told, as general architecture, that "every new execution path needs the whole library
  re-expressed in its world" and that the native layer "cannot be shared" (09-15T23:24) — but
  that sentence was aimed at the 2012 team, never at our own step 1.
- **He himself proposed the library route** (09-15T23:51: "Couldn't the path forward be just to
  use the FortressLibrary for compiler as well? What breaks and when?"), and the probe he
  provoked came back in its favour (09-16T00:13: 95% of the library is plain Fortress; "The
  natives are the small part").
- He was offered the fork twice, both times with "not needed yet" attached (09-16T17:43,
  17:49), and did not answer either time.
- He was **never** given a price for route (b). Not in lines, not in named types, not in months.
  The words "the library written twice" never appear; the nearest is the coordinator's own hedge
  "write it as the seed of one library, not a second one." Meanwhile route (a)'s price — "92
  checker errors and 108 native bindings" — was quoted at him twice as a reason not to take it,
  although the measurement that produced those numbers had been reported as *good* news a day
  earlier.
- He was told on 09-17T06:01 that the library route is a reserved fork that stops the climb —
  while the climb's ordinary work was already growing the compiler library toward it.
- He was told on 09-17T17:44 that the ladder is gated on the forks, not on names, and that the
  files behind `ImmutableArray` are really waiting on "the library route, your other reserved
  fork". He replied that he had not read it, then redirected to repairs. The question stands
  unanswered.

**So: was the compiler's own library chosen without pricing what re-implementing the arrays and
the algebra there means?** Yes. The one thing that was measured about either route was measured
about the route not taken, and it measured in that route's favour. Route (b) was chosen on the
argument that route (a) "is the right destination and the wrong first move", which is a
statement about order, not about cost — and no cost for (b) was ever put beside it.

**Earliest moment the record shows the coordinator knew the array slice would mean the library
written twice: 2026-09-15T23:21:44 UTC**, where it describes the choice as "either porting the
needed parts of the 4,518-line prelude into the 592-line one, or making the compiler consume the
interpreter's prelude" — the first option being, in plain terms, writing those parts a second
time. Three minutes later, at **23:24:29**, it states the principle outright: "every new
execution path needs the whole library re-expressed in its world […] it cannot be shared." Both
sentences are seventeen and twenty minutes *after* "give the compiler's library an `RR64` array
type" had already gone on record as step 1, and twenty-six hours before route (b) was formally
recommended.
