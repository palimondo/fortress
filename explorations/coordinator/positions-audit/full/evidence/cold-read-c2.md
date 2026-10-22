<!-- Cold read of chunk c2 (P-27 to P-40, ten entries), read from rewritten-c2.txt alone, with no other project context. -->

# Cold read, chunk c2

## P-27 The library's own practice is the standard

1. **Do / don't.** Put something into the standard library only when the library already has the same form for another number type or rank (for example, scalar addition on `Matrix`). Anything specific to microGPT stays in the model's own components. Before extending, study how the library already does that kind of thing and copy its pattern. Never design a fix from the specification alone or from a user-side workaround.
2. **Decides, and why.** Library practice is the test for what goes into the library and how. The reason: a skipped study meant the curator had to find the diagonal's override himself (P-88).
3. **Unclear.**
   - "he judges each extension": does each extension need his approval before it lands, or does he review it after it lands?
   - Is "a form that it has for one number type or rank and lacks for another" the only kind of precedent that counts, or one example? The appositive reads like a definition, but the title ("the library's own practice") sounds broader.
   - "exclusion, for one, is all over it": its role in the paragraph is unclear. It may be an example of a pattern to follow, or a remark that the library is full of exclusions an extender must respect.
   - "No fix is designed from the specification alone": when the specification and the library's practice disagree, which one wins? The title suggests practice wins over the specification, and a reader may doubt that is meant.
   - "a workaround on the user's side": who is the user here, microGPT's code or a library caller? Does it mean "do not shape the library fix to match how the caller worked around the gap"?
   - "the diagonal's override" cannot be understood without P-88.
   - This seems to clash with P-28, which sends "what the matrices and tensors of machine learning need" into the standard library. P-27 sends forms specific to microGPT into the model's components, and microGPT is a machine-learning program.

## P-28 Fleshing out the standard library is a very important task

1. **Do / don't.** The library's next layer is the algebraic one: `Ring`, `Field` and what machine-learning matrices and tensors need, so that the library's traits reach those types. This work is parked off microGPT's path. When it is done, it goes into the standard library itself, never into a separate tree of the revival's own.
2. **Decides, and why.** The algebraic layer is the next layer, and its home is the standard library. The reason: so that the library's traits reach the matrices and tensors (and P-27).
3. **Unclear.**
   - The entry calls the work "very important" and also "parked". Should a worker do it now, when idle, or not at all until it is unparked?
   - "so that the library's traits reach them": does it mean the matrix and tensor types implement `Ring`/`Field`, or that the traits are extended to cover them? And are `Ring` and `Field` to be created or to be fleshed out?
   - There is tension with P-27 on what is general and what is microGPT-specific (see P-27). What test decides whether "what the matrices and tensors of machine learning need" has a precedent?

## P-29 Walk's speed is irrelevant to every judgement of Fortress's performance

1. **Do / don't.** Base no performance decision on walk's timings. Do not edit C4, the flat model program, for speed until microGPT runs compiled. The gate does not run the two microGPT programs.
2. **Decides, and why.** Walk timings are excluded from performance judgement. The reason: walk is far slower than Python's interpreter, and the two programs run too long to be tests.
3. **Unclear.**
   - The stated reason ("far slower than Python's interpreter") reads as though slowness were the reason it doesn't count. The real point is presumably that walk is not the path being measured. Does the entry also forbid work to speed up walk itself?
   - "the two microGPT programs": only C4 is named. What is the other one?
   - This seems to clash with P-30. P-29 says the gate never runs the microGPT programs, and P-30 has a microGPT walk check after every batch. Is P-30's check part of the gate, a separate step, or a cut-down run of the same programs?
   - "until microGPT runs compiled": once it does, are speed edits of C4 allowed, or only measured under the compiled path?

## P-30 The microGPT walk check after a batch runs in under a minute

1. **Do / don't.** After a batch, run microGPT under walk for about two forward-and-backward passes and compare against the reference values. Keep the check under a minute. Do not build or run a slower check.
2. **Decides, and why.** The check after a batch is short. The reason: two passes are enough to show the model's mathematics works and the library changes did not break it, so anything slower wastes time.
3. **Unclear.**
   - "about two" passes and "under a minute" could conflict: if two passes take longer than a minute, which limit wins, the count or the time?
   - Who runs it (the worker, the coordinator, the gate), and after which batches: every batch, or only those that touch the library?
   - Which program does it run (C4 or the other one of P-29), and which reference values (presumably the Python reference, not stated)?
   - See P-29 on whether this counts as part of the gate.

## P-32 The territory map maps the tree down to where the design intent is written

1. **Do / don't.** Keep the territory map (`coordinator/map/`), FACTS and `INDEX.md` current, and consult them. The map goes down to where the design intent is written, in the papers as well as the specification.
2. **Decides, and why.** The record's maps are maintained and used. The reason: nothing already on record gets found again from scratch.
3. **Unclear.**
   - "maps the tree down to where the design intent is written" has two readings. (a) The map covers the code tree and points each part to the passage in the papers or specification that states its intent. (b) The map also covers the papers and specification as parts of the tree. And down to what grain: file, section, line?
   - "are kept current and used" is passive. Is updating the map every worker's duty after a discovery, or the coordinator's? When must a worker consult it: before any search?

## P-33 The plan holds the phases in the order he approved

1. **Do / don't.** Work the phases in PLAN's approved order. Still to build: 3, the checker at a true zero; 4, the switch-over (natives, then names); 5, microGPT compiles (static types, the array design, the code generator's holes); 6, microGPT fast. Current status is in PLAN's "Where we stand". Re-approval row 41 is handled within the switch-over's design.
2. **Decides, and why.** The phase order 3 to 6 is fixed. The reason: he approved it (no other reason given).
3. **Unclear.**
   - "in the order he approved": is the order strict (no phase-5 work before phase 4 is done) or a priority order? Other entries describe later-phase work that goes on now: P-37's "code-generator rungs go on", and P-40's phase-5 items.
   - "Re-approval row 41 (ledger row 320 ...)" uses two numbering systems. Which list holds "re-approval row 41"? Does "joins the switch-over's design" mean it gets fixed in phase 4, or only that the design must take it into account?
   - "a component named apart from its api does not link": does this mean a component whose name differs from its api's name, or a component declared separately from its api?
   - "the checker at a true zero" seems to clash with P-39, where the checker count never turns the gate red. How is phase 3's zero reached and then held?

## P-37 One library, the interpreter's, is the library the compiler checks

1. **Do / don't.** Treat the interpreter's `FortressLibrary` and `FortressBuiltin` as the compiled path's library. Add no declarations to the compiler's prelude (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`). Its three files are deleted at the switch-over, but their tests are kept. Code-generator rungs continue. Do not ask again how the checker comes to accept the library; that is a plan shown to him step by step.
2. **Decides, and why.** There is a single library for both paths, and the prelude is a bootstrap to remove. The reason: his view that the prelude is temporary (no further reason given).
3. **Unclear.**
   - "a plan shown to him step by step, not a question to ask again" has two readings. (a) The plan was already shown and approved, so just follow it. (b) A worker must present each step to him before doing it. Who writes the plan, and where is it?
   - "with their tests kept": are the tests kept unchanged, which seems odd once the files they test are gone, or kept and rewritten against the interpreter's library (P-38 speaks of respelling)?
   - "Code-generator rungs go on" most likely means "continue meanwhile". If so, it clashes with P-33's phase order, since the code generator's holes are phase 5.
   - "no declaration goes into it" sits beside P-38, which keeps items that did go into the prelude. Presumably the rule means "from now on", but it does not say so.

## P-38 The compiler prelude keeps these five items as they are until the switch-over deletes it

1. **Do / don't.** Leave the prelude's `Maybe` block and its `REM` guard `if other = -1 then 0` as they are, with their tests, until the prelude is deleted. After that: respell the compiled tests' reversed wrapping and saturating operators (row 348), close `ZZ64`'s compiled shift (row 381), get the specification's `shift` onto the compiled path (row 383), and promote `XXXShiftDeclRungI`. The switch-over batch also finds the compiler tests that bind `shift`, which becomes a reserved name.
2. **Decides, and why.** The prelude's landed items are frozen until deletion, and the follow-ups are set for the switch-over. The reason: not stated, presumably because the prelude is being removed (P-37).
3. **Unclear.**
   - The title says the prelude keeps "these five items", but only two are kept (the `Maybe` block and the `REM` guard). The other three (rows 348, 381, 383) are actions taken after deletion. Which five are meant?
   - "Then": after the deletion, or within the same switch-over batch?
   - "the switch-over batch finds the compiler tests that bind `shift`": finds them in order to rename them? The action after "finds" is missing.
   - "`ZZ64`'s compiled shift closes (row 381)": does the row get closed, or does the shift operation get completed?
   - "stay as landed": does the freeze hold even if one of them is found to be wrong?

## P-39 The checker count is measured in every gate, and its total never turns the gate red

1. **Do / don't.** Measure the checker count in every gate. Report a rise, but never fail a batch for a rise alone; what turns the stage red is in F-66. The distance to the switch-over (F-53), over all apis and components, is a report-only stage of the phase-3 gates.
2. **Decides, and why.** The count's total and the distance are reported, not enforced. The reason: phase 3's work is what drives the distance down (no further reason stated).
3. **Unclear.**
   - "its total never turns the gate red" sits beside "F-66 gives what turns its stage red". Does a red stage turn the gate red? The difference between a red stage and a red gate is not explained, so the two sentences read as contradictory.
   - "never fails a batch on its own": together with what else would a rise fail a batch?
   - "a report-only stage of the phase-3 gates": does the distance stage disappear after phase 3, or become enforcing?
   - "whose work drives it down": does "whose" mean phase 3's work or the gates' work?
   - See P-33: if the total never fails the gate, what holds the checker at "a true zero" once phase 3 reaches it?

## P-40 Sizes are checked, and a size left unknown is an error only where it is used

1. **Do / don't.** The checker checks `nat`/`int` static parameters and refuses values beyond `NN32`/`ZZ32` (F-140). JVM array creation refuses lengths over 2^31-1 (not built; phase 5; walk side at row 527). An inferred size left unknown errors only where it reaches a type, name or value. A call that cannot fix a size is refused, even inside an overload set. Every static argument except an operator counts in the exclusion rule, and booleans join later (row 406). A size used as a value converts to `ZZ32` (row 485). The 17 vector and matrix operators' unused sizes follow decision E's diff.
2. **Decides, and why.** These are the rules for static sizes. The last rule's reason: decision E finishes the original team's 2008 fix, which removed the unused sizes from the component only (F-35).
3. **Unclear.**
   - The title says "where it is used" and the body says "when it reaches a type, a name or a value". Are these the same test? Nearly everything reaches a type or a value, so in which case is an unknown size not an error?
   - "refuses the call, also inside an overload set, instead of dropping the arm": is the whole call an error even when another arm of the overload set would apply? That reading is surprising, but "instead of dropping the arm" seems to require it.
   - "not built yet (PLAN phase 5; under walk, row 527)": does this mean the walk side is tracked as row 527, or that it already works under walk?
   - "go by decision E's diff" has two readings. (a) The unused sizes are governed by the diff. (b) They are removed by it (the 2008 note, "took them out of the component only", suggests removal). "which he read and took for the switch-over": approved to land at the switch-over, or adopted as part of its design?
   - "the api's 17 vector and matrix operators": which api?
   - The entry mixes rules that hold now, rules half built (row 400's compiled half open) and rules not built (the array length check). A worker cannot easily tell which rules the checker enforces today.

## Across the chunk

- P-27 against P-28: the line between a general library extension and a form specific to microGPT, for machine-learning matrices and tensors.
- P-29 against P-30: "the gate never runs the two microGPT programs" against a microGPT walk check after each batch.
- P-33 against P-37 and P-40: a fixed phase order against code-generator and phase-5 work going on now.
- P-33 against P-39: phase 3's "true zero" against a checker count that never fails the gate.
- P-37 against P-38: "no declaration goes into" the prelude against landed items it keeps. P-38's "five items" matches only two items actually kept.
