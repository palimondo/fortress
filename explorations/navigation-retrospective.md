<!-- Written by the coordinating session at Pavol's request, 2026-08-30: a
     self-examination of how we navigate this repository — what errors are
     systematic, what the record says caused them, what to change. The
     evidence base is this repo's own committed reports and probes; every
     claim about an error cites the artifact that documents it. -->

# How we navigate this repo: a retrospective on our systematic errors

The question this answers (Pavol's, 2026-08-30): the microgpt arc should
be an easy marriage of two bodies of knowledge an LLM possesses in depth —
the mathematics of transformers and the craft of programming languages —
carried out against a spec and an implementation that settle all ground
truth. Instead the arc has needed repeated human challenges to dislodge
wrong conclusions. Is the struggle a model limitation, a prompting
problem, or a process problem? What should change?

## The record of errors, and their shared anatomy

Four documented cases, in chronological order:

1. **The ⊕ / BIG OPLUS lock-in.** The first working notation borrowed a
   look-alike glyph from Steele's 2015 slides and every subsequent rung
   inherited it, until Pavol asked whether the ML literature ever writes
   custom big operators (it doesn't). Retired by standing order.
2. **The falsified parse trap.** "Comprehension bodies ending in a
   subscript need parens" circulated as a verified fact through several
   documents and one build round. The process audit found it had *never
   been run* — it was invented from one misread error and then inherited
   (explorations/process-audit.md). A build-round verifier later caught a
   worker re-propagating it even after the falsification was committed.
3. **"Σ is sealed."** True three mechanisms deep (overloading, coercion,
   desugaring) and false as a bottom line: the component system's
   `except`-import allows replacement, found immediately by a blinded
   worker denied access to our analysis docs
   (explorations/sum-experiment-report.md). The audit that produced the
   sealed claim was itself an adversarial pass — and still missed the
   route, because it audited the mechanisms it had thought of.
4. **The KVCache "net negative lines" forecast** — off by +7 because the
   estimate priced what the carrier deletes and not the carrier itself
   (explorations/microgpt2-named-spaces.md). Small, but the same shape.

A fifth is under blinded test as this is written: whether `Vec`/`Mat`
needed defining at all, or the library's own Vector/Matrix would have
served. The record shows the library types were cited as *precedent* for
an overloading-legality argument and never once probed as a working
representation — an assumption inherited from the first working design.

The shared anatomy: **an early working solution or an early failure
becomes an anchor; everything after is elaboration, not re-derivation.**
The positive claims stayed sound — everything that "runs" was gated and
never had to be retracted. Every error was a *negative* claim
("impossible", "sealed", "needed") or a forecast. That asymmetry is the
finding.

## Why negative claims fail here: the familiarity gradient

The hypothesis "LLMs can't connect two bodies of knowledge" is, on this
evidence, not what happened. The mathematics connected fine: the golden
check passed early and has never broken; the notation layer states the
paper's formulas; the autodiff engine is a faithful tape. The connection
failures are all on one side, and they follow a gradient:

- Where Fortress resembles mainstream languages — objects, traits,
  overloading, generics — pretraining priors help, and work there was
  mostly right the first time.
- Where Fortress is idiosyncratic — the component/api algebra,
  `except`-imports, big-operator desugaring to nullary calls, reductions
  as `FlowExpr`, abstract fields satisfied by constructor parameters —
  priors don't just fall silent; they **actively mislead**, because
  retrieval confidently supplies the nearest mainstream analogy (operator
  extension "should" work like type-class instances or C++ overload sets)
  and the search stops when that analogy is exhausted. "Σ is sealed" is
  precisely the conclusion a Haskell/C++/Scala prior reaches after
  checking the mechanisms those languages have. The mechanism Fortress
  actually offers sits in the chapter the prior never suggests opening.

A dead language sharpens this: there is no Stack Overflow corpus mapping
error messages to fixes, so every error must be root-caused from source
— and the cheap substitute is pattern-matching the error to a familiar
language's failure, which is exactly how single data points became
"rules". The spec-first standing order (adopted after the audit found
zero spec consultations in the early rounds) was the right medicine; the
errors above are what the default looks like without it.

So the honest phrasing is not "cannot connect knowledge" but: **the
connection defaults to the highest-prior path, and exploring the
low-prior paths — which is where a distinctive language keeps its
distinctive answers — does not happen without external forcing.**
Confidence calibration on "impossible" does not degrade gracefully as
the domain gets more obscure; it stays fluent while its evidence thins.

## The context echo chamber

The second systematic force is our own documentation. Persisting state
into committed docs is what makes this project survive compactions — and
it also *institutionalizes* errors: the "verified facts" cheat-sheet
carried the falsified trap and the sealed-Σ claim into every later
worker's context as settled truth, marked with the same certainty as the
genuinely verified facts beside them. Workers briefed on the docs
reproduced the docs. The three corrections that happened all came from
severing that loop: Pavol's challenge from outside it, then a **blinded
worker** denied the docs entirely. Blinding is not a nicety; on this
record it is the only reliable countermeasure we have demonstrated.

## Was the prompting wrong?

Mostly no. The challenges were the error-correcting signal, and their
form — "I'm calling BS, run the experiment, don't bias it with your
conclusion" — is close to optimal: it names the claim, licenses
discarding the anchor, and prescribes blinding. Two genuine prompt-side
observations, offered as calibration rather than fault:

- **References get over-fitted.** Steele's 2015 slides were offered as
  inspiration and were treated as a constraint; ⊕ survived three rungs on
  that authority. When a reference is meant as "a place to start", saying
  so explicitly helps — though detecting this should be my job.
- **Challenge latency.** Errors lived in committed docs for days until a
  batch of Pavol's questions arrived. The lesson is not "challenge
  faster" — it is that the *first* line of challenge must be internal
  and cheap, so his challenges become the last line, not the only one.

Everything else — the escalating critiques, the reflect-back-the-mission
requests, the refusal to accept opaque summaries — measurably improved
the output and is worth keeping.

## What the record says we do well (keep, unchanged)

- **The golden check as non-negotiable anchor.** Every refactor,
  carrier, and the n-ary→chain graph change was fearless because 1e-9
  (later 1e-15) against the Python reference decided admissibility.
  Positive ground truth, mechanically checked, is why the positive
  claims never needed retracting.
- **Delegation with generous worker budgets and evidence bars** ("must
  survive an adversarial reviewer on either side"). The clean-room
  reports are the strongest documents in the repo.
- **Errors verbatim + probes committed as evidence.** Corrections were
  possible *because* the failed probes were kept.
- **Classification discipline** (implementation gap / design limit /
  deliberate-with-reason) — it forces the "what exactly stops this"
  question that pure pass/fail hides.
- **The page recording its own corrections.** The sealed-Σ passage now
  says the page got it wrong and how it found out. For a project whose
  thesis is an honest fitness game, the process *is* content.

## Process changes, adopted forthwith

1. **Falsification gate for negative claims.** No "X is impossible /
   sealed / unsupported / needed" enters a committed doc until a blinded
   worker has been given the *goal of achieving X* (never "verify X
   fails") and failed with citations. One Opus worker per claim; the Σ
   round measured the return on that cost.
2. **A mechanism inventory as de-biasing artifact.** One worker pass
   over the specification's full table of contents producing a checklist
   of Fortress's mechanisms — with the un-mainstream ones flagged
   (component algebra, import renaming/exclusion, where-clauses, functional
   methods, coercion, dimensions, properties/tests, distributions...).
   Any future impossibility claim must be argued against the *list*, not
   against whatever mechanisms came to mind. This attacks the
   familiarity gradient directly.
3. **Epistemic status marks in the fact sheets.** POSITIVE-VERIFIED
   (ran, output recorded) vs NEGATIVE-BOUNDED (mechanisms A, B, C
   searched; not exhaustive). The flat "verified facts" list gave later
   workers false certainty; a bounded phrasing invites the fourth
   mechanism instead of foreclosing it.
4. **Blind replication before page claims.** Anything that survives to
   the presentation as a language-capability claim gets the blinded
   treatment first, not after a challenge.
5. **Forecasts priced from the object, not the deletion list** — the
   KVCache rule: cost a design by writing its skeleton, not by
   enumerating what it removes.

## The verdict on "coding is solved"

On this repo's evidence: implementation against dense, checkable ground
truth is close to solved — the transformer went into a dead language,
golden-verified, in paper-faithful notation, largely worker-autonomous.
What is not solved is **the cartography of negative space in an
unfamiliar system**: knowing that the mechanism you haven't thought of
exists, and that your fluent "impossible" is a statement about your
retrieval, not about the language. That failure is not unique to models
— the 2012 library's own `(* Hack to permit any Number to work
non-parametrically *)` shows its authors settling for the same kind of
anchor — but models state their anchors with more fluency and less
doubt, which makes the external structure (blinding, falsification
gates, a human willing to call BS) load-bearing rather than optional.

That structure is now written down. The next "impossible" gets the
treatment before it gets committed.
