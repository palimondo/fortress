<!-- The clarity pass, chunk p2 (positions): the checker's report on the nine rewritten entries, their fidelity to the record and the audit's evidence, the cold reader's answers against the source meaning, and each failure by class with a proposal. -->

# Check of chunk p2: P-27, P-28, P-30, P-32, P-33, P-37, P-38, P-39, P-41

Sources read: `entries.py` for the nine (the text now matches `proposals.md`'s "The text now" for each); the scout's report `P-N.md`, `judgement-c2.md`, `corrections-c2.md` and `takeaway-c2.md` on each (c3 for P-41); his messages by `show.py`; the coordinator's texts of 2026-09-24T00:47:26Z, 09:30:15Z, 09:34:07Z and 2026-09-26T08:40:51Z by `near.py`; and the tree where the rewrite names it. `clean.txt` and the entry lines of `proposals.apply` are the same text. Times are UTC.

## P-27 (held for the audit's question 1)

**Fidelity.** Pass. Each sentence traces to his words or to a rewording he was told was on record (`judgement-c2.md`, "P-27"). Moving the held sentence after the rule changes no meaning, and its words are closer to his 09-19 message than before ("all the extensions that it invented need to go directly to the standard library"). "When that study was skipped" is weaker than the old "because", so it claims no more. "had to find by himself ... a subtype of `Matrix` that overrides its product" fits his own claim. At 18:13:14 on 09-24 he asked to define the diagonal "as a matrix that is, has its optimized iterators and implements the same numerical operator". At 18:30:37 he asked why he "had to invent this solution". The question to him is the audit's question 1 with the takeaway check's fix, and it is stated fairly.

**Comprehension.**
- The held sentence: the reader took it as written ("Anything microGPT's code invented that extends the library belongs in the standard library"). That is the breadth his messages of 09-20 07:20 and 10-09 05:20 narrow. This failure is the open question's, and the rewrite cannot fix it before his answer. The reader confirms that the question is needed.
- "`Matrix`" and "its product": the reader could not tell whose `Matrix` it is, or which product. **Wording:** "... the shape of microGPT's diagonal matrix: a subtype of the library's `Matrix` that overrides `mul`, the method that the library's matrix product calls (P-88)." Sources: `Library/FortressLibrary.fsi:1736` (`trait Matrix`); `explorations/run-c4/src/FlatArrays.fss:33-41` ("the library's product forwards to its mul"; `Diag ... extends Matrix`, `mul`); P-88's text.
- The `excludes` pattern: the reader did not know what the pattern does for an extension, and guessed right from the core's overloading rule. **Wording**, optional: "`excludes` clauses, which say that no value has both of two types, so that overloads on the two types can stand side by side". The coordinator proposed this route for the C4 operators' overload clash at 18:22:49, the text that his 18:31:44 answered (`judgement-c2.md`, "P-27"). The core states the rule.

## P-28

**Fidelity.** Pass. The "Why:" is his reason in his words of 09-15 10:42:06. `Ring` and `Field` are undeclared, which the scout's grep found (`P-28.md`, section 2). "Two matrix ideas of his" is true: he raised them on 10-16 at 12:35:52 and 12:48:17.

**Comprehension.**
- "Very important" against "parked": the reader could not tell whether a worker may take the work up. The pointer does not say what PLAN's parked list means. **Wording:** "It is parked off the path to microGPT compiled: PLAN lists it under "Off the path, parked", the work that waits until it becomes relevant and is then brought to the curator. Two matrix ideas of his wait there beside it: square matrices of one size as a ring, and diagonal matrices of one size as a ring whose product commutes." Sources: `PLAN.md`, "Off the path, parked", its opening line and first bullet. That opening line is the coordinator's default, and his "Park both with the algebra work." (10-16 13:01:50) took it as given. The text describes PLAN and does not make the default his ruling.
- "A separate tree of the revival's own": the reader read it two ways. **Wording:** "The work edits the standard library itself, in `Library/`, not a separate tree of the revival's own outside it (P-27, how the library is extended)." The 09-15 question was "editing the sealed `Library/` ... or building the algebraic layer in our own tree" (the coordinator's 2026-09-15T11:02:11.020Z, item 2, quoted in `P-28.md`, section 1).
- Whether the library has matrices: it does (`FortressLibrary.fsi:1736`). The reader's doubt is minor. No change.

## P-30

**Fidelity.** One failure. "The check is `explorations/coordinator/tools/mg-run.sh`, which runs the quick versions of microGPT's two programs, outside the gate." is built state, and the writer's own note says "not his decision". It sits unmarked among his words, so a reader can take the script and its place outside the gate for his ruling. Step 4 of the writer's brief keeps state apart. **Wording:** "Built: each batch's commit stage runs the check as `explorations/coordinator/tools/mg-run.sh`: the quick versions of microGPT's two programs at once, outside the gate." Sources: `mg-run.sh`, lines 1 to 6; `climb-batch-workflow.md`, "Commit, and the push held", step 0 (line 248). The rest passes: "must" is his "it needs to run under a minute", and "That is enough to show" is his "we just need to check that the math works".

**Comprehension.**
- "Must" against "goal", and what a check past the minute requires: **uncertain fidelity**, and the sources are silent. His message gives the limit and no consequence. `PLAN.md:448` shows the coordinator's practice: batch 16's 65 s became an open item, whose default is one idle pair of runs to find the cause. A question for him only if the coordinator wants a rule. No change to the entry.
- "A batch": a **concept** the reader lacked. `concepts.md`'s row "Batch and rung" covers it, for the short orientation. I agree.
- The machine and the thread count: they are not his words. `mg-run.sh` sets one thread by default, and `references/interpreter.md` says how to run it. No change.

## P-32

**Fidelity.** One failure, and one uncertain point.
- The title says "kept current and read when the work needs them". The audit's correction said "kept current and used". "Read when the work needs them" narrows the rule to reading on demand. The entry's main source refused that reading for the coordinator. His message of 2026-09-24T06:44:33.963Z answered the proposal that "the index is searched, not read, at boot": "I, I'm not okay with you not having the necessary context in mind" and "... doesn't mean you should not be aware of those things at all times". He said it again on 09-30 at 12:01:35 (keep FACTS, POSITIONS and the index "in your memory at boot") and on 10-20 at 12:07:28 ("The index being read full is the mechanism against this"). His 09-21 "read relevant context on demand" is one half of the rule, not all of it. A reader of the new title could skip the boot's whole reading. **Wording:** title "**The record's maps are kept current and used, so that nothing that the record holds is worked out again from scratch.**" Add after the list of maps: "How they are read, whole at the coordinator's boot and as a briefing for each worker, is the `coordinator` skill's ("The boot")." Sources: the three messages above, and 09-27 06:31:31 ("it needs a mission briefing from the map"). The audit resolved the boot clause the same way (`corrections-c2.md`, "P-32", sentence 2).
- "Kept current" for the territory map: **uncertain fidelity**. The map is not kept current. Its README calls its surveys "the evidence of that day" (2026-09-16), and `fortress-repo`, `references/compiler.md:96`, says that a status or a line number in its notes can be stale. His words want it current: "up-to-date maps" (09-24), and on 09-21 "Is the map out of date again? Was scripting its refresher delayed". As written, the entry states a rule that the tree does not meet, with no line of state. **His answer would settle it.** Question for the curator: does "kept current" cover the territory map, so that refreshing it is work still to build and needs a place in PLAN, or only FACTS and `INDEX.md`? Until he answers, add a line of state: "The territory map's surveys are of 2026-09-16 (its README): a status or a line number in them can be stale."

**Comprehension.** "Kept current by whom, and when": the passive hides who does it, and the sources do not name a doer for the upkeep. The proposed pointer to the coordinator skill answers how the maps are read. The open question above answers what is kept current. Calling FACTS a map is his word (09-27 05:57:11, on FACTS and the index). No change.

## P-33

**Fidelity.** One failure. The old title said that PLAN "holds the phases in the order he approved". The new title says the work "follows the phases ... in the order that the curator approved", and the state line adds "in that order". Together they make the order a strict sequence. The record does not hold one. His yes (09-26 09:04:41) was to "this order", which he had asked for as an "optimal order" to reach the running compiler. Phase 2b went in before phase 3 at his word of 09-27 06:13:29 ("other batches that go in before phase three"). Code-generator work goes on under either library (P-37). PLAN runs phase 4's natives "before the switch-over and beside phase 3" (`PLAN.md`, "Phase 4. The switch-over", "The natives"). A reader concludes that no work of phases 4 or 5 starts before phase 3 ends, and the cold reader hit exactly this clash with P-37. **Wording:** drop "in that order" from the state line. After it, add: "Other work has gone in beside that order: phase 2b went in before phase 3 at his word of 2026-09-27, code-generator work goes on under either library (P-37), and PLAN runs phase 4's natives beside phase 3." Keep the title, which says "in the order that the curator approved". The rest passes. Phase 3 at a distance of zero is PLAN's measure ("Phase 3": "The measure is the distance stage"). The phase-4 order, natives first, is the plan he took ("4. The switch-over: the natives first, then the names", the coordinator's 08:40:51). The row-41 sentence matches `decisions-for-reapproval.md:41`.

**Comprehension.**
- "Review-queue item 36": a **concept** the reader lacked, and `concepts.md` does not list it: the review queue, `explorations/coordinator/review-queue.md`, the list of items that wait for the curator's review. Many entries cite it, so it belongs in the short orientation, one line. In this entry, give the path.
- "The open half of gap-ledger row 320": **wording**: "the class-name half of gap-ledger row 320, still open (its mutable half is fixed)". Source: `decisions-for-reapproval.md:41`; ledger row 320 ("Fixed half: mutability crosses the api").
- Whether a worker may fix row 320: the decision waits for him. **Wording**, optional, as state: "Until he decides, the half stays gated by `compiler_tests/XXXExportVarRungXLinked`." (ledger row 320).
- "The library's native bindings on the compiled path": partly clear. **Wording**, optional: "first the natives, the library's `builtinPrimitive` bindings made to run on the compiled path" (`PLAN.md`, "Phase 4", "The natives").

## P-37

**Fidelity.** Pass. The new limit sentence is his. He wrote "Only which file survives." to the coordinator's question of 2026-09-24T00:47:26.776Z: did "one library, the interpreter's" choose only the files, or also the nested number tower, which would forbid giving the one library the prelude's flat shape? Moving that limit from the history into the entry adds no claim. The code generator's reason and the plan are the coordinator's 09-21 02:36:16 text, which he confirmed ("You decoded it correctly."). That the plan is PLAN's phases 3 and 4 is the takeaway check's reading, and fair.

**Comprehension.**
- "The interpreter's library files, `FortressLibrary` and `FortressBuiltin`": the reader asked whether only these two files are meant, or the whole library. **Wording:** "The interpreter's prelude, `FortressLibrary` and `FortressBuiltin`, becomes the compiled path's prelude in place of the compiler's own, and the compiled path reads the interpreter's library with it." Sources: `library-route-judgement.md`, section 4 ("make the specification's default library, `FortressLibrary` and `FortressBuiltin`, the compiler's prelude"); `PLAN.md`, "Phase 4" ("the compiled path reads the interpreter's library").
- "Which files survive, not each design inside them": the reader read it two ways. **Wording:** "The decision settles which files survive, not the designs inside them: the one library may take a design of the prelude's, as it took the prelude's flat tower of number types." Sources: the 00:47:26 question and his 01:02:52 answer; the core's "Numbers are siblings, not a tower".
- "Is a plan that comes to him: ... which he approved": the tenses confused the reader. **Wording:** "How the checker comes to accept the library, its first step and the order of the work, was left to a plan for him; that plan is PLAN's phases 3 and 4, which he approved in their order (P-33)."
- "Their tests kept": **wording**, optional: "their tests kept (P-38 says which are respelled)".
- `Library/CompilerSystem.fss`, the compiled path's `System` (`references/compiler.md:27`): **uncertain**, and outside this entry's sources. The decision names three files, and so does the entry. No PLAN, FACTS or ledger line names `CompilerSystem`, so phase 4's design does not say what happens to it. The entry needs no change. The question belongs to the switch-over's design, for the coordinator.

## P-38 (held for the audit's question 1)

**Fidelity.** Two failures, and one finding for the held question.
- "The `Maybe` block and the `REM` guard stay as landed, with their tests, until the prelude is deleted." can be read to mean that the tests go at the deletion. The sources keep them. Option 1 of the coordinator's 2026-09-21T21:08:15.030Z, which he took at 21:20:29, says "approve rung M as landed with its tests kept and its lines gone at the switch-over". The 09:38:47 ask, which he took at 13:49:02, says "its test carries the check to the switch-over rung". P-37 says "their tests kept". **Wording:** "The `Maybe` block and the `REM` guard stay as landed until the prelude is deleted, and their tests stay after it."
- "The expected-failure test `XXXShiftDeclRungI` then passes and is promoted." "Passes" is the coordinator's word of 09:34:07 ("starts passing"), and it means that the program compiles. In the harness, an `XXX` test whose defect is fixed turns red (`fortress-repo`, `references/tests-writing.md`, "Promoting an `XXX` test"). A reader can take "passes" to mean "stays green". **Wording:** "`XXXShiftDeclRungI`, row 383's expected-failure test, then turns red, since `shift` is defined, and is promoted."
- For the held question: two of the five items are not defects. The guard's row is a placement choice: "the divisor `-1` is guarded in the two `REM` bodies rather than in the six native methods that overflow on it" (`decisions-for-reapproval.md:30`). He approved it as landed. The `Maybe` block is what rung M added (`6823d52b6`), approved as landed. Its defect is row 331. The cold reader saw this ("they may be revival additions rather than team defects"). Add to question 1: "Two of the five are revival choices that you approved as landed, not defects: the guard's place (re-approval row 30) and rung M's `Maybe` block." That supports its first title, "Five items of the compiler prelude stay as they are until the switch-over deletes it".

**Comprehension.**
- The guard: the reader could not see why it is listed. **Wording:** "its guard `if other = -1 then 0` in the `REM` of `ZZ64` and `ZZ32`, which answers a divisor of -1 before the body's `DIV` can overflow, placed there and not in the six natives that overflow on it (re-approval row 30)". Sources: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:601`, `:686`; `decisions-for-reapproval.md:30`.
- `Nothing`: **wording**: "its `Maybe` block, whose empty case is a `Nothing` without a type parameter, where the specification and the one library write `Nothing[\T\]` (gap-ledger row 331)". Source: ledger row 331.
- "Spellings are the reverse": two readings. **Wording:** "its wrapping and saturating operators, whose spellings are swapped against the specification's: its `BOXPLUS` family wraps and its `DOTPLUS` family saturates (row 348)". Source: ledger row 348.
- "Close with no edit": **wording**: "close with no edit of the prelude and no rung of their own". Source: the 09:34:07 ask, "no prelude edit, no rung".
- "Binds it as a variable": **wording**, in the ask's words: "a compiled program that names a local or a parameter `shift` is refused from then on, so the switch-over batch counts the gated compiler tests that do".
- Whether the batch also renames those tests: **uncertain**. The ask says only that the batch "measures how many gated compiler tests do that, if any", and nothing more is decided. A refused test would turn the gate red, so the switch-over's design has to deal with any it finds. That design is the place for it, not this entry. No claim to add.
- "Rung": a **concept**, `concepts.md`'s "Batch and rung". I agree.

## P-39

**Fidelity.** Pass. The two measures are said in F-53's words. A rise "never fails a batch on its own" is what he took (the 12:21:03 text: "reported, never failing a batch on its own ... now with your yes on record"). The red faults are given as F-66's built behaviour, with its pointer, not as his ruling. The "Why:" is the reason in the question that he took.

**Comprehension.**
- "Every gate": the `fortress-repo` gate (`gate.md`, steps 1 to 7) has no count stage. The count is step 8 of a batch's gate, and the distance is step 9 (`climb-batch-workflow.md:226`; `climb-batch-workflow.js:43`, `:1136`). His option 1 was about batches ("each batch pays"). **Wording:** "Every batch's gate measures the checker count, ...", and "The count's stage, step 8 of the batch's gate (`explorations/coordinator/climb-batch-workflow.md`), can still turn the gate red ...".
- "A crash of the checker that no rung declared": **wording**: "a checker crash that no rung of the batch listed in advance as expected (its manifest's `expectedCheckerCrash`)". Source: `climb-batch-workflow.md:23`.
- "An error that it cannot pass": **wording**: "cannot get past".
- "The full measurement": the reader guessed that it means the distance. **Wording:** "Why: the distance's full measurement takes far longer than the count, and a batch pays for it only when the distance is the number that it tries to move." Sources: the 12:21:03 question's option 2, the full measurement in every gate at "about 20 minutes each", which he turned down by taking option 1; `climb-batch-workflow.md:226`, about 5 minutes for the count against about half an hour for the distance.
- The checker count and the distance: a **concept**. `concepts.md` would define it in `fortress-repo`'s `references/compiler.md`. That conflicts with `explorations/reviews/fortress-repo-outline.md:7`, which left the two out of `fortress-repo` on purpose ("this skill holds nothing of the checker count or the distance"). A brief of 2026-10-08 (session 0240a041, shown by `show.py` at 06:06:52Z) gives this as the curator's decision and cites P-134. P-134's text says nothing of the count. The coordinator settles the placement before the orientation is written. Until then, one line in the short orientation serves a worker whose rung runs the stage. I agree with `concepts.md` that `coordinator/references/batch.md` ("Neither turns the gate red") contradicts F-66, and one of the two needs fixing.

## P-41

**Fidelity.** Pass. "On the compiled path" is true: the descriptor is the compiled run time's (`RTTIsize.java`; F-129). His "B it is." (09-24 16:17:27) and "Agreed, (b) factory" (09-26 09:44:10) cover the slot, the table and the absence of a class. "The team's pattern" is the coordinator's 09:35:03 answer, which he agreed after. "Sees no need to carry operators as types and sizes are carried" keeps his meaning: his question was "If it's so good to have classes per type, why, why aren't operators handled the same way?" (09-24 15:14:48), and he then said "I don't see a need" (16:17:27; `judgement-c3.md`, "P-41").

**Comprehension.**
- The last sentence is a garden path ("carry operators as types"). **Wording:** "The curator sees no need for an operator argument to be carried at run time the way types and sizes are."
- "Reserved that slot for a size too": the reader read it two ways. **Wording:** "the team's code generator already emitted that field for a size, with nothing to put in it, and the size's descriptor fills it". Source: `explorations/reviews/size-runtime-design-brief.md`, "Pavol's three questions about B's classes": "B does not add a field; it gives that field something to point at."
- State: the reader could not tell whether it is built. **Wording**, optional, a pointer: "Built: F-129, with its open rows." The audit left the built state to F-129 (`55f1a1352`). One pointer is cheap and keeps the state out of the entry's words.
- A side effect of the new title: `review-queue.md:1390` quotes the old title ("P-41, "At run time a size travels as the descriptor ..."") among items already settled. It names the number too, so it still resolves. Nothing to change.

## His quotes

HIS 2026-09-19T18:31:44.057Z | Like, it is a practice that is all over the standard library, and it looks like you are designing solution without the full context.
HIS 2026-09-19T18:31:44.057Z | And the same goes with the micro GPT's use of like all, all the extensions that it invented need to go directly to the standard library in the spirit of the standard library.
HIS 2026-09-20T07:20:24.519Z | I don't want that we extend the library f with some uh, forms that are specific to our use case in C4.
HIS 2026-09-20T07:20:24.519Z | As long as the extensions that we did have a precedent in the library itself, I, I'm fine with that.
HIS 2026-09-24T18:13:14.832Z | Like, why cannot we define diagonal as a matrix that is, has its optimized iterators and implements the same numerical operator?
HIS 2026-09-24T18:30:37.463Z | why the fuck did I have to invent this solution? Why wasn't it obvious to you or the workers?
HIS 2026-09-24T18:37:13.721Z | record that
HIS 2026-09-15T10:42:06.544Z | I think that fleshing out the standard library is one very important task to close it.
HIS 2026-09-15T10:42:06.544Z | Uh, like I'd like to see that shape of the library extended so that the expression expressing the machine learning concepts with the matrices and tensors have the mathematical rigor that this flavor of library construction promises.
HIS 2026-10-16T13:01:50.455Z | Park both with the algebra work.
HIS 2026-10-08T17:49:22.269Z | Like we just need to check that the math works
HIS 2026-10-08T17:49:22.269Z | But like, it needs to run under a minute, okay? That's the goal. Otherwise, it's useless waste of time.
HIS 2026-09-24T06:44:33.963Z | I, I'm not okay with you not having the necessary context in mind.
HIS 2026-09-24T06:44:33.963Z | Like we, we, we have built maps of the repository for a reason and I don't want you to be skipping those and rederiving like we have invested in, in having up-to-date maps.
HIS 2026-09-24T06:44:33.963Z | Just because I didn't ask you something that's only in there right now doesn't mean you should not be aware of those things at all times.
HIS 2026-09-30T12:01:35.684Z | And I, I think we still need to keep facts and position and index all in your memory at boot.
HIS 2026-10-20T12:07:28.821Z | The index being read full is the mechanism against this.
HIS 2026-09-29T21:36:20.378Z | They should first start looking at index to know what's already been discovered and consult the relevant resources.
HIS 2026-09-21T01:14:56.336Z | Why aren’t you using the map to read relevant context on demand? Is the map out of date again?  Was scripting its refresher delayed and we can’t trust it?
HIS 2026-09-27T06:31:31.170Z | Maybe the worker doesn't need the full global map, but it needs a mission briefing from the map.
HIS 2026-09-27T05:57:11.388Z | We have invested into up to date maps, so that we don’t need to rediscover things each time.
HIS 2026-09-26T09:04:41.396Z | Yes, this order and workers are go.
HIS 2026-09-27T06:13:29.788Z | This will possibly yield other batches that go in before phase three or whatever the next phase was.
HIS 2026-09-21T02:40:19.981Z | You decoded it correctly. Disregard it as sparse message. Don’t revert!??
HIS 2026-09-24T01:02:52.634Z | Only which file survives.
HIS 2026-09-21T21:20:29.106Z | Maybe’s empty case, keep team’s paramedic speaking.
HIS 2026-09-24T13:49:02.932Z | Row 30 approve as landed.
HIS 2026-09-24T09:33:32.071Z | yes
HIS 2026-09-24T09:36:51.997Z | yes, close at the switch-over.
HIS 2026-09-26T07:48:29.318Z | Note from O looks solid to me. Don’t see any credible alternative, so unless you do let’s put that on the record.
HIS 2026-09-26T12:24:01.196Z | Agreed, option 1
HIS 2026-09-24T15:14:48.777Z | If it's so good to have classes per type, why, why aren't operators handled the same way?
HIS 2026-09-24T16:17:27.464Z | All right. B it is.
HIS 2026-09-24T16:17:27.464Z | my question about operators goes into the ledger. Uh, I don't see a need.
HIS 2026-09-26T09:44:10.939Z | Agreed, (b) factory
