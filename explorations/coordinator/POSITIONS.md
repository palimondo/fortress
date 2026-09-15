<!-- What Pavol has decided, stated, or already knows, with dates; in his words or a close paraphrase. Read at session start so that none of it is re-explained to him. Standing directives about how we work are in explorations/protocol.md and are not repeated here. -->

# Pavol's positions, decisions and known ground

## The goal

- The revival's toy problem is microGPT and the search is for its most readable expression; Fortress's mathematical notation and Iverson's APL notation (with Hsu's data design for data-flow algorithms) are the two sources; "we are searching for the optimal expression of the microGPT algorithm for readability" (2026-09-15).
- The APL side quest began as a curiosity (2026-09-10), became a ladder to learn APL (09-11, he has not read the book), was redirected to native code, not an interpreter in an interpreter (09-12), and got microGPT as its target on 09-13; the ladder "was to keep you busy and expand the probe". The remaining APL ground (tacit, characters, nested arrays) is not pursued (09-15).
- Hoped for a diamond from the Hsu-style flat program; got "a few lumps of coal"; the rewrite (rung 4b) was to get closer, and the vocabulary is where any polishing happens.

## History he knows (do not re-explain)

- DARPA's HPCS did not take Sun into phase three (2006) and the project lived on at Sun Labs until 2012. His reading: they did no work on performance, "mucked around with syntax", and the promise that a sufficiently advanced compiler would later make mathematical types fast was never true; the funding was pulled for good reason.
- The compiled path is only about ten times the interpreter because numerics are boxed (`FRR64`, no `DADD`); "without unboxed doubles and arrays of doubles, what are we even doing here"; this goes on the priority list (2026-09-15). Measured the same evening (FACTS, execution model): boxing is about 2% of the gap to primitive Java; three cheap named costs are most of it, and unboxing stays the endgame after them. Pavol has not yet reacted to the measurement.
- The type checker runs only on the compile path; he wants it usable on interpreter programs and considers that low-hanging fruit (2026-09-15; not a ledger row, see FACTS).
- Hsu's critique of language paradigms as accidental complexity; he is "coming around to his point of view".

## Decisions on record

- 2026-09-14: C4 is the APL target form; C2's tuple hyperparameter form is what a strand assignment expands to; the semicolon form is set aside.
- 2026-09-15: redo rung 4 as the focused base (done); do the vocabulary swap with shared `nat` dimensions (in progress); the ledger is not split, two views are derived (done); the ledger review is the next major step after the swap; the remaining APL ground is closed.
- 2026-09-15: "fleshing out the standard library" is a very important task: first fix the `RR64`/`AdditiveGroup` mismatch, then extend the algebraic layer (Ring, Field and what ML's matrices and tensors need) so the library's trait flavour reaches them. Open question he has not answered: whether this means editing the sealed `Library/` (the standing rule is never; worklist item 4 "unseal the linear-algebra layer" names the rows) or building the layer in our own tree; the coordinator assumes our own tree until he says otherwise.
- Estimates in days or weeks are not accepted; sizes are given in the units the project has measured (a rung, a worker session, a check run).

## How he wants to be spoken to

- Plain register, short sentences, no essayist tone; label which part answers which question when several are asked; do not restate what is in this file or in FACTS.md; when a concept is new to him, define it (he asked for reshape, ravel, planes, gather, outer product, Ring, Field, nat parameters, matrix multiplication).
- A decision made inside a worker's report and recorded in one line is a decision not made; flag it to him at the time.
- He reads on an iOS client that sometimes shows stale state; an inventory of what is running answers "is anything in flight" from the tree, not from the UI.
