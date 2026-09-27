# The rewritten protocol against the two prompting guides

Reviewed 2026-09-27 by a Fable worker: `explorations/protocol.md` (at `9e7d12c75`), `coordinator/README.md`, the post-mortem, `record-keeping-proposal.md` §§ 1-3, POSITIONS "How he wants to be spoken to", and the two guides. Nothing in the repository was edited.

## Three changes worth making

Each is one sentence, names no model, and costs the other model nothing.

**1. Principle 4: look up the method before inventing one.**
Old: "Closed decisions are not revisited and settled questions are not re-asked: losing an order to compaction and asking again is the same failure as inventing one."
New: "Closed decisions are not revisited and settled questions are not re-asked: losing an order to compaction and asking again is the same failure as inventing one. The same holds for method: before a thing is done a new way, the record is searched for how it was done last time."
Rests on: Opus guide, "Explore context in multi-app workflows": "Claude Opus 5.5 tends to get to work quickly, and on loosely specified tasks it helps to tell the model to look through the relevant sources before acting"; Fable guide, "Search triggering at low effort": "familiarity is not a reason to skip the search." The README's INDEX line covers facts and principle 4 covers decisions; nothing covers methods, which is where the check-in failure sat. The Fable era had the same class of slip (the INDEX skip, proposal § 3), so this is not an Opus-only line.
Optional, same change: in "What keeps going wrong", "standing orders invented, or lost and re-asked" becomes "standing orders and techniques invented when the record held one, or lost and re-asked".

**2. Principle 3: name the fix for the register, not only the failure.**
Old: "Plain short sentences, lists not tables, numbers as K or M, a new term defined where it is used; teach, don't gloss."
New: "Plain short sentences and short paragraphs, lists not tables, numbers as K or M, a new term defined where it is used; teach, don't gloss. Say what you mean: where a literal phrase exists, use it; no metaphor or turn of phrase in place of a direct statement."
Rests on: Fable guide, "Writing density": Fable 5.1's "sentences run longer and there are fewer paragraph breaks"; "Mannered prose substitutes metaphor and flourish for direct statement ... The fix is to say what you mean. When a literal phrase is available, use it." The protocol names the failure ("the clever register") but not the fix; this is Pavol's own diagnosis of 09-21 ("over-compressing into a clever turn of phrase") turned into the instruction the guide says works. The guide's full definition is not needed: it says the short form "also tends to work". Aside, not a rule: the protocol's own prose carries a little of the register ("Where judgement does not bend", "his attention is the scarcest thing we spend", "the argument lives in the review"), and a Fable reads the protocol as a model of the register; a light pass at the same time would help.

**3. Hard rule 1: name what does not wait, beside what does.**
Old: "Standing approval covers only the approved ladder in `modernization-plan.md` and the push order below."
New: "Standing approval covers only the approved ladder in `modernization-plan.md` and the push order below. Evidence work that changes nothing in the tree and spends no Fable budget starts without asking, and a step his yes already covers is taken, not asked about again."
Rests on: Fable guide, "Finish the whole task": Fable "stops to ask permission for a step the original request already covered ('Shall I apply this?')", and the fix is to say what not to ask about while listing the confirmations you do want; Opus guide, "Unattended agentic runs": "name the specific kinds of early stop you want it to avoid ... It also helps to name the stops you do want." Hard rule 1 names the wanted stops; the unwanted ones are only implied by principle 5 ("starts at once"), which a literal reader may not connect. This is also the Fable-era practice of 09-21 ("evidence work ... runs on the standing yes", proposal § 3), which the protocol does not otherwise carry. Kept narrow on purpose: Pavol's 09-20 complaint was unauthorized initiative, so the sentence covers only work that touches nothing and steps already agreed.

## Considered and left alone

- Reasoning extraction (point 1). The protocol never says "reasoning"; principle 2's list and principle 3's "the argument lives in the review" already ask for evidence and the case for a decision, which is what the guide says to ask for instead. The word lives in POSITIONS (the S1 form, his own phrase "the full reasoning in a repository document") and in briefs that copy it; the fix is in the brief templates ("findings, evidence, the reasons for the verdict") and in the harness: a `reasoning_extraction` decline ends the turn and is returned, not retried (Opus guide, "Safeguard refusals"), so a verdict is safe only if the worker writes it to its output file before its final message. Workflow manual, not protocol.
- Compaction summaries (point 5). The Fable guide's weighting (his words kept close, ours condensed) is already the record's design: POSITIONS in his words, dated; FACTS as findings; the boot note rewritten whole. Nothing for the protocol. If wanted, `/compact` takes a one-line focus, a note for `remote-container.md` at most.
- Lesser-known language (point 6). CLAUDE.md gives the language context and principle 5 has briefs point at the documents on file; if a refusal appears on Fortress work, the brief's pointer to the spec chapter is the fix, in the workflow manual. The guide's compile-check case is a model judging compilability by reading; our workers run the compiler.
- Progress updates, both directions. "He hears nothing while a batch runs" and "a result reaches him only as a turn's final text" are Pavol's, and the Fable guide's "recap that stands on its own" is the same instruction.
- Restate and hold. The Fable guide's "when the user is thinking out loud, the deliverable is your assessment; report and stop" is principle 3's rule, already more specific.
- Whole-file rewrites (Fable). The README says an entry is rewritten in place and only the boot note whole; that is the right grain.
- Quoting sources (Fable reproduces text unmarked). Hard rule 2's "brief attributed quotations" and principle 1's provenance cover it.
- "Closed decisions are not revisited" against the Opus guide's warning that such a line hides earlier mistakes. The line is about his decisions, not our answers, and the intro asks us to notice what is going wrong.
- Time. Opus attends to elapsed time it is given; "read from the clock" serves both; the 09-23 complaint was Fable-era.
- Scope widening (Fable). The intro channels it into "propose the fix" and the hard rules hold the tree.
- Lead keeps working while subagents run. Principle 5, "starts at once".
- Pasted text and injection. Worker reports arrive as tool results; "a decision made inside a worker's report is not made until he has seen it" is the guard.
- Formatting. "Lists not tables" is already the positive form the Fable guide asks for.
- Effort levels. A harness setting.

## Can one protocol serve both models

Yes. The guides describe the two defaults as mirror images on three axes: register (Fable dense and mannered, Opus plain), asking against acting (Fable asks about agreed steps, Opus acts on loose ones), and looking before acting (Opus starts quickly). The protocol states each axis as a purpose, so each model's failure is a departure from the same line, and the three sentences above each aim at one model's default while costing the other nothing and naming neither. Model flavour belongs in "What keeps going wrong", which names failures, not models, and already holds one of each ("the clever register" is Fable's, "standing orders invented" is Opus's). The only model-specific facts are harness facts (the classifier category, a refusal returned rather than retried) and go in the workflow manual or FACTS. No per-model note earns a place. Switching back to Fable is not made worse by these: the rewrite was drafted by a Fable instance in the form Fable already followed. What each model leans on under a purposes protocol: Fable on the hard rules staying crisp, Opus on the record being findable, which change 1 addresses.

## Round 2

**1 and 2.** Agreed as written; the final set is at the end.

**2, the register pass.** Every phrase in `explorations/protocol.md` a reader could imitate as register, with a literal replacement of the same meaning and about the same length. Phrases only; no restructuring.

- Line 6: "when a wording and its purpose pull apart" → "when a wording and its purpose conflict".
- Line 9: "a file getting heavy" → "a file growing".
- Line 15: "Where judgement does not bend." → "These are not judgement calls."
- Line 51: "attribution reconstructed where git cannot carry it" → "attribution reconstructed where git does not record it".
- Line 68: "a timing carries its machine" → "a timing names the machine it ran on".
- Line 75: "the argument lives in the review" → "the argument goes in the review".
- Line 77: "teach, don't gloss" → "explain it, don't just name it" ("gloss" also means to annotate, so the line reads two ways).
- Line 81-82: "Time is read from the clock, never placed from feel." → "Time is read from the clock, never guessed."
- Line 88: "nothing he must decide lives only in the coordinator's head" → "nothing he must decide is held only in the coordinator's context".
- Line 105: "The record is the present, kept once, so that..." → "The record describes the present, each thing written once, so that...".
- Line 115: "time placed from feel" → "time guessed, not read".
- Line 118: "a rule followed into clutter instead of its purpose" → "a rule followed to the letter where that made clutter".

Withdrawn on reflection: "his attention is the scarcest thing we spend" (line 70; "spend attention" is ordinary English, not display) and "word weighs more" (line 50; weighing evidence is the literal sense, and CLAUDE.md uses "the designers' later word" the same way). Kept as terms of art the manuals use throughout: "red", "fork", "in flight", "parked", "restate and hold", "walls of text" (his phrase).

**3. Hard rule 1.** The narrow form loses nothing. The two cases the broad half aimed at, a coordinator asking before launching an evidence worker and a coordinator asking before its own read-only look, are both covered: principle 5's "starts at once" and his word that Opus workers are free. And the broad half was wrong on the facts, since evidence workers do commit their notes (the worker-commit hard rule). Confirmed: add only "A step his yes already covers is taken, not asked about again." It earns its place in hard rule 1 rather than principle 4 because that is where a reader looks when deciding whether to ask.

**4. The phrase for briefs.** Yes: "each change with the decision it rests on, the alternatives considered and the evidence that settled it", and the brief points at the S1 form's list of contents (POSITIONS 2026-09-26) instead of restating it; "the full reasoning" stays in POSITIONS as his wording of the decision, not as an instruction to a worker.

## Final set of edits

1. Principle 4, line 89-91. Old: "...losing an order to compaction and asking again is the same failure as inventing one." New: "...losing an order to compaction and asking again is the same failure as inventing one. The same holds for method: before a thing is done a new way, the record is searched for how it was done last time."
2. What keeps going wrong, line 117. Old: "standing orders invented, or lost and re-asked". New: "standing orders and techniques invented when the record held one, or lost and re-asked".
3. Principle 3, line 76-77. Old: "Plain short sentences, lists not tables, numbers as K or M, a new term defined where it is used; teach, don't gloss." New: "Plain short sentences and short paragraphs, lists not tables, numbers as K or M, a new term defined where it is used; explain it, don't just name it. Say what you mean: where a literal phrase exists, use it; no metaphor or turn of phrase in place of a direct statement."
4. Hard rule 1, line 19-20. Old: "Standing approval covers only the approved ladder in `modernization-plan.md` and the push order below." New: "Standing approval covers only the approved ladder in `modernization-plan.md` and the push order below. A step his yes already covers is taken, not asked about again."
5. The eleven remaining register replacements listed under Round 2 (lines 6, 9, 15, 51, 68, 75, 81-82, 88, 105, 115, 118).
