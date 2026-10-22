<!-- The POSITIONS audit's full run, chunk c2 (P-27 to P-40, ten entries): the takeaway check. For each entry of rewritten-c2.txt, what the cold reader (cold-read-c2.md) took away, set against what the curator decided as his messages show it (curator-profile/show.py), with the coordinator's texts he answered read by positions-audit/tools/near.py. One Opus reader; nothing else changed. -->

# Chunk c2: the takeaway check

- P-27: drift, from the rewrite. The reader took "a form that it has for one number type or rank and lacks for another" as the only kind of precedent, and left his judging out of its do-line. His precedent is wider: a generic, reusable shape of the library, such as integers' patterns carried to floats or the big operators' conformances (07:20:24Z, 09-20). He also wants each extension proven to him. Fix below.
- P-28: match. "Very important" (10:42:06Z, 09-15) and "parked" (13:01:50Z, 10-16) are both his. The reader's clash with P-27 comes from its lack of context, and P-27's fix removes it.
- P-29: match. The reader doubted the reason: the text hangs the rule on walk's slowness, while he hangs it on walk being the unoptimised path, like a debug build in Swift (16:43:19Z, 09-19). That reason is a kept sentence's. Tighten below.
- P-30: match. The minute is "the goal", and about two passes is how he would meet it (17:49:22Z, 10-08). The reader's clash with P-29 comes from its lack of context: the walk check runs the quick versions, outside the gate.
- P-32: match.
- P-33: match. Two things come from the reader's lack of context: its doubt whether the order is strict, and the clashes it saw with P-37, P-39 and P-40. The kept row-41 sentence leaves open what "joins the switch-over's design" means. Tighten below.
- P-37: match. The kept "Code-generator rungs go on" lacks the reason he took: they are compiler work under any library (02:36:16Z, taken 02:40:19Z, 09-21). Without it, the reader set the sentence against P-33. Tighten below.
- P-38: drift, from the rewrite's title and two kept words. The reader found two items kept and three to do. It took rows 381 and 383 as work after the deletion. His yeses say that they close by themselves when the compiled path reads the one library, with no edit and no rung (09:33:32Z and 09:36:51Z, 09-24). Fix below.
- P-39: match. The rewrite's "its stage red", beside "the gate red", made the reader ask whether a red stage turns the gate red. F-66 says that it does. Tighten below.
- P-40: drift, small, from kept sentences. The reader could not tell that decision E's diff removes the unused sizes from the api, which is the option he took (05:06:36Z, taken 05:42:24Z, 10-20). It also found no case in which an unknown size is not an error. The case he took is a size declared and used nowhere (03:09:13Z, taken 16:57:37Z, 09-21). Fix below.

Times are UTC. "His" and "he" are the curator's. "Kept" means a sentence that the writer left as it stood. A "fix" is given where the drift is the text's. A "tighten" is optional: the reader took the meaning right, but the text left a door open. The reader's questions about the project's own terms are set aside, as the brief asks: walk, the switch-over, the prelude, rows, F-numbers, C4 and the gate.

## P-27: the library's own practice is the standard

**The reader took away.** Something goes into the standard library only when the library already has the same form for another number type or rank. Anything specific to microGPT stays in the model's components. Study the library's way first, and never design a fix from the specification alone or from a user-side workaround. Its doubts:
- Is the appositive the only kind of precedent?
- Does "he judges each extension" mean before or after landing?
- What role does "exclusion" play?
- Who is "the user"?
- Does the entry clash with P-28, since microGPT is a machine-learning program?

The do-line has no step for showing an extension to him.

**What he decided.**
- 2026-09-19T18:31:44.057Z. The worker should "study the existing parts of the fortress library meticulously, and use those patterns for extending the standard library in the native way". Exclusion is "a practice that is all over the standard library".
- 2026-09-19T18:13:00.524Z. He refused the `planeSum` rename in C4's own code: "That's not Fortress!".
- 2026-09-20T07:20:24.519Z narrows the first message. He wants to know "what was moved to the standard library, and I want to be judge of whether ... It needs to be proven to me". He does not want the library extended with "forms that are specific to our use case in C4". "The point of a standard library is to have generic reusable shapes". An extension with "a precedent in the library itself" is fine. His examples: patterns of the naturals or the integers extended to floats, "or copying shapes of ... big operators", where a few conformances give much for free.
- 2026-10-09T05:20:34.111Z, a page comment. He "would at most admit" an extension for C4 "if it was missing an obvious extension ... like something that is on Array or Matrix of lower dimensionality and is missing on higher". Scalar addition on `Matrix` is his example.

**Verdict.** Drift, from the rewrite.
- The appositive turns his two examples, one per message, into a definition. His 09-20 test is a generic, reusable shape with a precedent in the library, and the big operators' conformances are such a shape as well.
- "and he judges each extension" sits at the end of the clause about microGPT's own forms, so the reader dropped it from its do-line. His "it needs to be proven to me" is a step for the worker.
- The clash with P-28 comes from the reader's lack of context. His "generic reusable shapes" would answer it in the text: the algebraic layer extends the library's own traits to matrices and tensors (2026-09-15T10:42:06.544Z).
- The kept sentences match him. The reader's first reading of "exclusion" is his (18:31:44Z). "The user's side" means the model's code (18:13:00Z), which the reader could not know.

**Fix** (the first sentence). What microGPT needs goes into the standard library only as a generic, reusable shape with a precedent in the library itself, such as a form that it has for one number type or rank and lacks for another (scalar addition on `Matrix`). Each such extension is shown to him to judge, and a form specific to microGPT stays in the model's own components (2026-09-20T07:20:24.519Z; 2026-10-09T05:20:34.111Z).

## P-28: fleshing out the standard library is a very important task

**The reader took away.** The library's next layer is the algebraic one, so that its traits reach the matrices and tensors of machine learning. The work is parked off microGPT's path, and it goes into the standard library, never into a tree of the revival's own. Its doubts:
- The work is "very important" and "parked": is it done now, when idle, or not at all?
- Are `Ring` and `Field` made new or extended?
- What is the line with P-27?

**What he decided.**
- 2026-09-15T10:42:06.544Z: "fleshing out the standard library is one very important task". First the `RR64` fix, then "go to the higher dimension", extending "the library flavor ... the additive glue, group, multiplicative ring", so that the matrices and tensors of machine learning get its "mathematical rigor".
- 2026-10-16T13:01:50.455Z: "Park both with the algebra work." He took the algebra work as parked.

**Verdict.** Match. Both of the words that the reader set against each other are his, and "parked" answers "when". The rest of the reader's doubts come from its lack of context:
- His "extending the library flavor" answers "made or extended". The library has `MultiplicativeRing` (`Library/FortressLibrary.fss:371`) and no `Field`, so the entry's "so that the library's traits reach them" is right.
- P-27's fix answers the line with P-27.

No fix.

## P-29: walk's speed is irrelevant to every judgement of Fortress's performance

**The reader took away.** No performance decision rests on walk's timings. No edit of C4 for speed until microGPT runs compiled. The gate does not run the two programs. Its doubts:
- The stated reason reads as slowness, and the reader guessed that the real point is that walk is not the path measured.
- Is speeding up walk itself forbidden?
- What is the second program?
- How does the entry square with P-30's walk check?

**What he decided.**
- 2026-09-19T16:43:19.420Z: "I don't care how slow the interpreter is, because ... once we get the compiler running, then we will be talking about performance. ... we cannot judge performance on unoptimized builds in Swift. The same way we cannot judge anything performance related in Fortress while we do not have a compiler". The slowness, "hundreds times slower than the Python interpreter", is his support, not his ground.
- 2026-09-19T16:39:48.865Z, on the microGPT programs: "those are too long running to be tests".

**Verdict.** Match. The reader's do-line is his, and its guess at the reason is his reason. The doubt comes from a kept structure. The old text also said "hundreds of times slower ... So", and the rewrite kept the "So". The rest comes from the reader's lack of context:
- The second program is the APL one (P-10).
- No message of his forbids work on walk's speed.
- P-30's check runs the programs' quick versions, by `tools/mg-run.sh`, at the batch's commit stage. It is outside the gate (`coordinator/climb-batch-workflow.md:248`; the `fortress-repo` skill, `references/interpreter.md`: "never in the gate").

**Tighten** (the second sentence). Walk is the unoptimised path, as a debug build is in Swift, and far slower than Python's interpreter (`explorations/microgpt-port.md`, "Step-0 results"). Performance is judged on the compiled path once it runs (2026-09-19T16:43:19.420Z).

## P-30: the microGPT walk check after a batch runs in under a minute

**The reader took away.** After a batch, run microGPT under walk for about two forward-and-backward passes against the reference values. Keep it under a minute, and do not run a slower check. Its doubts:
- If two passes take over a minute, which limit wins?
- Who runs the check, after which batches, which program, and which reference values?
- Is the check part of the gate?

**What he decided.**
- 2026-10-08T17:49:22.269Z: "if I knew that it takes still over five minutes, I would have said like run two backward forward passes. ... check that the math works and ... the library modifications ... like the arrays ... that we do not break those. But like, it needs to run under a minute, okay? That's the goal. Otherwise, it's useless waste of time."
- 2026-10-08T16:20:06.948Z: "only if they run few iterations. Not a full training that takes ages."

**Verdict.** Match. His words answer the first doubt: the minute is the goal, and the two passes are how he would meet it. The title puts the minute first, so the text answers it as well. The rest comes from the reader's lack of context. The check runs both quick programs, `MicroGptFlatQuick.fss` and `MicroGptAplQuick.fss`, against their goldens, at every batch's commit stage, outside the gate (`climb-batch-workflow.md:248`). "The full check programs run only when asked" left for drafted item Q-?2. The reader's "do not run a slower check" is about the check after a batch, so the move loses nothing that he said.

No fix. If the coordinator wants P-29's clash gone in the text itself, the second sentence can begin "It runs the two programs' quick versions, outside the gate, ...", which is `tools/mg-run.sh`'s fact, not a word of his.

## P-32: the territory map maps the tree down to where the design intent is written

**The reader took away.** Keep the territory map, FACTS and `INDEX.md` current, and consult them, so that nothing on record is found again. The map reaches the papers as well as the specification. Its doubts:
- Does the map cover the code and point each part to the passage that states its intent, or does it cover the papers as parts of the tree?
- At what grain?
- Whose duty is the upkeep, and when must a worker consult the maps?

**What he decided.**
- 2026-09-16T22:57:42.006Z: parts of the design intent are in the papers, "so I think we need to include them in our map so that we know where to look up the design intent".
- 2026-09-24T06:44:33.963Z: "we have built maps of the repository for a reason and I don't want you to be skipping those and rederiving like we have invested in, in having up-to-date maps".
- 2026-09-27T05:57:11.388Z: workers "should use facts and index instead of searching blindly. We have invested into up to date maps, so that we don't need to rediscover things each time."

**Verdict.** Match. His 22:57:42Z gives both of the reader's readings at once: the map takes in the papers, so as to show where the intent is written. The grain and whose duty the upkeep is are the `coordinator` skill's ("The boot") and the brief's, which the reader could not see. No fix.

## P-33: the plan holds the phases in the order he approved

**The reader took away.** Work the phases in PLAN's approved order, 3 to 6. Where the work stands is in PLAN's "Where we stand", and row 41 is handled within the switch-over's design. Its doubts:
- Is the order strict, or a priority, given P-37's code-generator rungs and P-40's phase-5 items?
- Which list holds "re-approval row 41"? Does "joins the switch-over's design" mean fixed in phase 4, or only taken into account?
- How is phase 3's "true zero" reached, given P-39?

**What he decided.**
- 2026-09-26T08:20:06.663Z: he asked for all open issues in "optimal order so that we can get to the running compiler".
- 2026-09-26T09:04:41.396Z: "Yes, this order and workers are go." This answered the coordinator's 08:40:51.388Z, which named the six phases and said that row 41 "becomes part of the switch-over's design".
- 2026-09-27T06:13:29.788Z: the reviews "will possibly yield other batches that go in before phase three".

**Verdict.** Match. The order is the road's order, and batches can be put into it (09-27). The reader's do-line claims no more. The clashes come from the reader's lack of context:
- Code-generator rungs are compiler work under any library (P-37's tighten).
- P-40's phase-5 rule is one that a phase-5 batch keeps, not one built now.
- Phase 3's zero is the goal of its work. The count's stage reports the distance and does not hold it (2026-09-26T12:21:03.045Z, taken 12:24:01.196Z).

The row-41 sentence is kept, and its two numbering systems are the reader's lack of context. Its "joins" is the text's: the 12:21:03Z text, which he took, says that row 41 "come[s] with the switch-over's design", to be put to him.

**Tighten** (the last sentence). Re-approval row 41 (ledger row 320: a component named apart from its api does not link) comes to him with the switch-over's design (review-queue item 36; 2026-09-26T08:40:51.388Z, taken 09:04:41.396Z).

## P-37: one library, the interpreter's, is the library the compiler checks

**The reader took away.** The interpreter's library is the compiled path's library. Add no declarations to the prelude. Its three files are deleted at the switch-over, and their tests are kept. Code-generator rungs continue. Do not ask again how the checker comes to accept the library: that is a plan shown to him. Its doubts:
- Was the plan already shown, or must each step go to him?
- Are the tests kept as they are?
- Does "code-generator rungs go on" clash with P-33's order?
- Does "no declaration" hold from now on, beside P-38's kept items?

**What he decided.**
- 2026-09-20T14:39:06.836Z: "the compiler second library is just a bootstrap and we need to get rid of it. Like, I don't even think that is a question that's worth deliberating about alternatives."
- 2026-09-21T02:40:19.981Z: "You decoded it correctly. ... Don't revert!??" This answered the coordinator's 02:36:16.321Z:
  - "From now, no declaration goes into the compiler's own library."
  - "Code-generator rungs continue, because they are compiler work under any library."
  - The three files are deleted at the switch-over, and "Their tests stay."
  - "The only open piece is not a decision but a plan ... in which order the checker work runs", to come back to him.
- 2026-09-26T09:04:41.396Z: that plan is PLAN's phases 3 and 4, in the order that he approved (P-33).

**Verdict.** Match. The reader's do-line is the decision that he took. The kept text dropped two things:
- The rungs' reason, without which the reader saw a clash with P-33.
- That the plan now exists, without which the reader read "step by step" two ways.

"From now" is also dropped. P-38's five items are not declarations added, so the reader's doubt about them comes from its lack of context. So does the doubt about the tests: P-38 says how the tests change.

**Tighten** (two sentences). Code-generator rungs go on, since they are compiler work under any library. The checker's road to the library is PLAN's phases 3 and 4, a plan he approved, not a question to ask again (2026-09-21T02:40:19.981Z, to 02:36:16.321Z; 2026-09-26T09:04:41.396Z).

## P-38: the compiler prelude keeps these five items as they are until the switch-over deletes it

**The reader took away.** Leave the `Maybe` block and the `REM` guard, with their tests, until the prelude is deleted. After that, do these:
- respell the reversed operators (row 348);
- "close `ZZ64`'s compiled shift" (row 381);
- "get the specification's `shift` onto the compiled path" (row 383);
- promote `XXXShiftDeclRungI`;
- find the tests that bind `shift`.

Its doubts:
- Which are the five, when the title names two kept?
- "Then": after the deletion, or within the switch-over batch?
- "Finds" them for what?
- Does row 381 close, or is the shift completed?

**What he decided.** Each yes covered one item, and each item is left as it is in the prelude:
- the `Maybe` block (2026-09-21T21:20:29.106Z);
- the `REM` guard, "Row 30 approve as landed." (2026-09-24T13:49:02.932Z);
- the inverted wrapping and saturating spellings, row 348, with the compiled tests respelled at the switch-over (2026-09-26T07:48:29.318Z, the wrap note's section 10).

On the shifts:
- Row 381: "yes" (2026-09-24T09:33:32.071Z), to 09:30:15.820Z: "Row 381, the compiled side of the same declaration, closes by itself when the compiled path reads this library."
- Row 383: "yes, close at the switch-over." (09:36:51.997Z), to 09:34:07.043Z: "What a yes does: nothing now. ... no prelude edit, no rung". When the compiled path reads the interpreter's library, "it gets this declaration with everything else, and the expected-failure test starts passing and is promoted then". "The switch-over batch measures how many gated compiler tests do that, if any."

**Verdict.** Drift, from the rewrite's title and two kept words.
- The title says "these five" but names none, and the body names two as kept. The other three read as work to do. In his yeses, all five are prelude items that are not repaired, and three of them resolve at the switch-over.
- The kept "closes" and "reaches" read as a fix to make, where the 09-24 texts that he took say that nothing is built.
- The kept "finds" is the coordinator's "measures how many".

The writer's question 1 to him (any other defect of the prelude) stands apart, and the fix answers nothing in its place.

**Fix** (the title, its five named, and the "Then" sentence). Title: "Five items of the compiler prelude stay as they are until the switch-over deletes it": its `Maybe` block, its `REM` guard, its inverted wrapping and saturating spellings (row 348), its shift counts (row 381) and its missing `shift` (row 383). Then the compiled tests respell those spellings, rows 381 and 383 close by themselves as the compiled path reads the one library (2026-09-24T09:33:32.071Z, 09:36:51.997Z), and the switch-over batch counts the compiler tests that bind `shift`.

## P-39: the checker count is measured in every gate, and its total never turns the gate red

**The reader took away.** Measure the count in every gate. Report a rise, and never fail a batch for a rise alone; F-66 says what turns the stage red. The distance to the switch-over is a report-only stage of the phase-3 gates. Its doubts:
- Does a red stage turn the gate red?
- "On its own": together with what else would a rise fail a batch?
- Does the distance stage end after phase 3?
- Whose work is "whose work"?
- What holds phase 3's zero once it is reached?

**What he decided.** 2026-09-26T12:24:01.196Z: "Agreed, option 1". It answered "Answer 11" of 12:21:03.045Z. The count stays "reported, never failing a batch on its own", now with his yes. The full measurement runs after batch 6, and "when phase 3 starts, its whole job is driving that number down, so the full measurement then becomes a report-only stage in those batches' gates."

**Verdict.** Match. The reader's do-line is option 1. "Its stage red", next to "the gate red", is the rewrite's, and F-66 answers the question: "The gate is red on a crash line no rung declared, a stale shadow or a table with no total." "On its own" is the coordinator's phrase, which he took. F-66's reason, "a fix can raise it", says what is meant. "Whose work" is phase 3's, as in 12:21:03Z. Nothing that he said covers what happens after phase 3, so that doubt and the doubt about the zero come from the reader's lack of context.

**Tighten** (the second sentence). A rise of the total is reported, since a fix can raise it, and never fails a batch. The gate is red at this stage only on what F-66 names (2026-09-26T12:24:01.196Z, to 12:21:03.045Z).

## P-40: sizes are checked, and a size left unknown is an error only where it is used

**The reader took away.** The entry lists the size rules:
- the checker refuses sizes beyond `NN32` and `ZZ32`;
- JVM array creation refuses lengths over 2^31-1, not built yet;
- an unknown size is an error only where it reaches a type, a name or a value;
- a call that cannot fix a size is refused, even inside an overload set;
- every static argument but an operator counts for exclusion, and booleans join later;
- a size as a value converts to `ZZ32`;
- the 17 operators' unused sizes "follow decision E's diff".

Its doubts:
- In which case is an unknown size not an error?
- Is the whole call refused even when another arm applies?
- Is row 527 the walk side's tracking, or does walk already work?
- Does decision E's diff govern the sizes or remove them? And for which api?
- Which of the rules hold today?

**What he decided.**
- 2026-09-27T06:44:55.156Z, his emphatic yes to 06:38:29.847Z: "A size is an `NN32` value, and anything larger is refused. The array design adds a check where it creates a JVM array: a length over 2^31-1 is refused there."
- 2026-09-21T16:57:37.256Z: "the middle uh, is a clear winner". This was the middle option of 03:09:13.588Z: an unknown size is "an error only when it reaches a type, a name or a value, and nothing otherwise. ... The six declarations pass because their dead sizes reach nothing."
- 2026-09-26T12:20:23.332Z: "Agreed, decision 3 stands", to 12:17:56.921Z: "when the version the rules would pick needs a size the call can't supply, refuse the call ... instead of silently dropping that version".
- 2026-10-20T05:42:24.706Z: "I agree with the recommendation. The patch made sense to me." It answered option 1 of ask 3 (05:06:36.884Z): "The api's 17 headers lose their unused sizes". The api is `Library/FortressLibrary.fsi`, which `e3-rebased.patch` edits.

**Verdict.** Drift, small, from kept sentences.
- "Go by decision E's diff" does not say that the diff takes the unused sizes out of the api, so the reader read it two ways. His yes was to the removal.
- The unknown-size sentence gives no case that passes. His option's case is a size that is declared and used nowhere, which the reader could not guess.
- The rewrite's "(under walk, row 527)" does not say that walk's own refusal is open, so the reader read it two ways. F-140, "Open", and row 527 say that it is open.
- On row 400, the reader's surprising reading is his rule: the arm that the rules would pick decides.
- The reader's last doubt, which rules hold today, comes partly from rule 9's move of "is built" to the history.

**Fix** (two clauses). A size that inference leaves unknown is an error only when it reaches a type, a name or a value; a size declared and used nowhere passes (2026-09-21T16:57:37.256Z, to 03:09:13.588Z). Decision E's diff takes the unused sizes out of `FortressLibrary`'s api for its 17 vector and matrix operators, which finishes the team's own fix of 2008 (F-35; 2026-10-20T05:42:24.706Z, option 1 of 05:06:36.884Z).

**Tighten** (the storage sentence's end). "...; not built yet (PLAN phase 5), and walk's own refusal is open (row 527)" (2026-09-27T06:44:55.156Z, to 06:38:29.847Z).

## Across the chunk

The reader's five clashes:
- **P-27 against P-28.** The text's, and P-27's fix removes it. The algebraic layer extends the library's own traits (2026-09-15T10:42:06.544Z), which is a generic, reusable shape (2026-09-20T07:20:24.519Z), not a form specific to microGPT.
- **P-29 against P-30.** The reader's lack of context. The gate never runs the full programs, and the walk check runs their quick versions at the commit stage. P-30's optional first clause would say so.
- **P-33 against P-37 and P-40.** The reader's lack of context. P-37's tighten gives the code-generator rungs' reason, and P-40's array check is a phase-5 rule that waits for phase 5.
- **P-33 against P-39.** The reader's lack of context. Phase 3's zero is its work's goal, and the count's stage reports it (2026-09-26T12:24:01.196Z).
- **P-37 against P-38.** The text's, in P-38's title. P-38's fix says that the five are prelude items left unrepaired, not declarations added, so "no declaration goes into it" stands.
