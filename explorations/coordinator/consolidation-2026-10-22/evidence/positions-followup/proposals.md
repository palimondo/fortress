<!-- The POSITIONS follow-up of 2026-10-22: small fixes to 24 entries that the cold read of POSITIONS (coldread-positions-final.md) found short on what a worker must do or on what the tree lacks, with three FACTS entries that take the moved agents' choices; proposed for the curator's review as diffs, nothing applied. -->

# The POSITIONS follow-up: proposals

The base is `d4d454f9d`. POSITIONS and FACTS there are as `382289832` (the scrape) left them. The changed lines, in `record.py`'s apply form, are in `proposals.apply` beside this file. The drafted ledger rows are in `rows-new.md`, and the review-queue items that should name a FACTS entry are in `queue-links.md`. The text takes the fixes that the fidelity check, `check.md` beside it, asks for.

How to read each section:

- **Cold read**: the point that `coldread-positions-final.md` makes on the entry.
- **Change**: what the proposal changes, in one or two lines. Every other word of the entry stays as it is.
- **Checked against**: the sources that the changed sentences were checked against: the entry's history (`facts-extract.sh 'history:P-N'`), the audit's evidence (`record-clarity/entries.py P-N`), and the tree.

"Row NEW-k" in an entry names a drafted row of `rows-new.md`. The coordinator files it and puts its number in its place.

## P-12

- **Cold read**: the whole step is unbuilt, and the entry names no row.
- **Change**: one sentence added at the end: "Row NEW-1: walk runs no static type check, so it has no static types and cannot use the coercions that the checker inserts."
- **Checked against**: the scrape's block (12:37Z), which deleted "Still to build: both steps, after the switch-over"; the audit's `P-12.md`, section 2; the tree at `d4d454f9d`: walk's branch of `Shell.java:420-424` turns Scala off and never turns type checking on, and `StaticChecker.java:166` checks only when it is on. The ledger finds (`walk typecheck`, `walk checker static types`, `XXXCoercionStaticRungC`) give row 69 (the `typecheck` command checks against the compiler's library) and row 19 (coercion declarations, with walk's run-time choice in its notes). Neither holds walk's missing check, so row NEW-1 is drafted.

## P-17

- **Cold read**: "Today the code generator boxes every number" names no row, and no time when unboxing is due.
- **Change**: "(row NEW-2)" after "an object of the class `FRR64`".
- **Checked against**: the audit's `P-17.md`, section 2; F-11; `compiler/runtimeValues/FRR64.java:14-22`; `git grep -i -E 'DADD|DMUL'` on `compiler/codegen` prints nothing. Rows 306 (the measured cost, `POSITIVE-VERIFIED`) and 302 (`FIXED`) hold the cost, not the gap, so row NEW-2 is drafted. The time is not put back: it was PLAN's phases 5 and 6, which an entry does not name.

## P-25

- **Cold read**: "It says that `Bottom` cannot be written in a program" stands among the passages whose use "P-97 holds", but P-97 covers only exclusion and `covariant`.
- **Change**: "Three of the chapter's passages bear on the specification; P-97 holds how the revision uses the first two." The last sentence becomes "Third, it says that `Bottom` cannot be written in a program, as `Specification/basic/types-vals-vars.tex` already says of `BottomType`."
- **Checked against**: the audit's `P-25.md`, sections 1 and 2: the coordinator's ask of 2026-09-26T07:56:16.747Z named the three topics, and his "Agreed." of 08:01:03.475Z took it; `types.tick:173-195`; `Specification/basic/types-vals-vars.tex:106-107` ("`BottomType` ... cannot be written in a program"); P-97, which names exclusion and `covariant` only.

## P-30

- **Cold read**: "must take less than a minute" does not say whose duty it is, or what follows when a change makes the check slower; "after a batch" and "Each batch's commit stage" are project terms.
- **Change**: the title stays as it is, since `climb-batch-workflow.md:248` quotes it. New: "A batch is a set of tasks, each called a rung, that agents build at once and land together.", the same words as in P-39 and P-79. The minute is said as "the curator's goal, for a check that runs only about two forward-and-backward passes of the model, not a full training". "Each batch's commit stage" becomes "The commit stage of each batch, the step that lands its changes".
- **Checked against**: his 2026-10-08T17:49:22.269Z ("I would have said like run two backward forward passes", "it needs to run under a minute, okay? That's the goal.") and 16:20:06.948Z ("Not a full training that takes ages."), in the audit's `P-30.md`, section 1; `climb-batch-workflow.md`, "Commit, and the push held".
- **Not fixed**: what follows when a change makes the check slower. Review-queue item 239 holds that question, so the entry does not settle it.

## P-32

- **Cold read**: "kept current" does not say by whom; "each rung's mission briefing (`references/batch.md`)" and "The boot" point into the coordinator skill, which a worker does not load.
- **Change**: the sentence on the coordinator skill becomes "`INDEX.md` is read whole at the coordinator's boot, at the start of each session and after each compaction, and each worker's brief carries a mission briefing from the territory map, not the whole map." It keeps his decision only: no quote of his asks for FACTS to be read whole, and the boot's reading of FACTS stays the coordinator skill's.
- **Checked against**: his 2026-10-20T12:07:28.821Z ("The index being read full is the mechanism against this.") and 2026-09-27T06:31:31.170Z ("Maybe the worker doesn't need the full global map, but it needs a mission briefing from the map."), in the audit's `P-32.md`, section 4; the coordinator skill's `SKILL.md:214` (the boot runs "At session start and after each compaction") and `references/batch.md:44` (each rung's mission briefing from the territory map).
- **Not fixed**: who keeps the territory map current. Review-queue item 240 asks whether "kept current" covers it.

## P-33

- **Cold read**: the row 320 paragraph gives no ruling; "the repair batch" and "on 2026-09-27 he said" are history; "phase 3 … phase 6" clashes with the compiler's phases, and phases 1 and 2 are never given.
- **Change**: new second sentence: "These phases are steps of the work, not the compiler's phases, and they are numbered 3 to 6, after two earlier ones." Deleted: "Other work has gone in beside that order", the repair batch's sentence and the agent's row 320 paragraph. Kept as his decision: "Code-generator work goes on beside that order, under either library (P-37). Row 320, an api implemented by a component of another name does not link, is part of the switch-over's design."
- **Checked against**: the audit's `P-33.md`, sections 1 and 5: his "Yes, this order and workers are go." of 2026-09-26T09:04:41.396Z took the coordinator's 08:40:51.388Z, whose list put the re-approval rows off the path "except row 41, which becomes part of the switch-over's design" (row 41 of that table is ledger row 320's open half). The agent's gating of that half is FACTS' already: F-22 says it is gated by the expected failure `XXXExportVarRungXLinked` (row 320), and F-120 holds the fixed half. Review-queue item 36 holds the choice (`queue-links.md`).

## P-39

- **Cold read**: "step 8 of the batch's gate" against the skill's gate of seven steps; "the batch's gate" and "the gate" read as two gates, so a worker cannot tell whether the count is his to run; "rung" and "manifest" are undefined.
- **Change**: new: "A batch is a set of tasks, each called a rung, that agents build at once and land together. Its gate runs the gate's steps on their merged tree, and then the checker count, as step 8 (`explorations/coordinator/climb-batch-workflow.md`); the gate of `fortress-repo`'s gate part has no such step." The step reference leaves the later sentence. The manifest is "the batch's manifest, the part of the batch's script that declares each rung's task".
- **Checked against**: `climb-batch-workflow.md`, "Gate" (steps 1 to 7, then "8. The checker count, and 9. the distance") and "The manifest and the scatter" (the `MANIFEST` block, per rung, with `expectedCheckerCrash`); `fortress-repo`'s `references/gate.md:3` ("the seven steps"); F-66.

## P-40

- **Cold read**: "lose their unused sizes by `e3-rebased.patch`" reads as pending or done; "the array design" is used before P-85 defines it.
- **Change**: "The 17 vector and matrix operators of the `FortressLibrary` api declare only the sizes that their types use, the change of `explorations/perf-probes/array-sites/e3-rebased.patch`. It finishes the team's own fix of 2008, which removed those sizes from the component only." The array design gets "the compiled path's design for arrays (P-85)".
- **Checked against**: the audit's `P-40.md`, sections 1 and 2: his "I agree with the recommendation. The patch made sense to me." of 2026-10-20T05:42:24.706Z; the patch's 17 headers landed in `e487cec2d`; `Library/FortressLibrary.fsi` carries only the used sizes (for example `opr +[\ T ..., nat n \]`); F-35 ("the 17 vector and matrix operators have lost their sizes since").

## P-45

- **Cold read**: "line up position by position" does not say what must match, or whether either path enforces it; "two nested generic functional methods" reads as one method inside another.
- **Change**: "The compiled checker tests it only where the two declarations have as many static parameters of their own (F-75)." added after the Java sentence. Rows 779 and 780 are said as "two generic functional methods of a trait without static parameters whose declared domains lie one inside the other".
- **Checked against**: `scala_src/overloading/OverloadingOracle.scala:154-175`, `satisfiesPositionalRule`, which accepts the pair when the counts differ (`:164`, `if (xo.isEmpty || xo.size != yo.size) return true`); F-75, which says that the equal-count scope and the kinds are the rung's choices (review-queue item 60 holds that scope). So the entry gives the scope as the tree's, with F-75 for the rest. Rows 779 and 780 ("one inside the other": `which[\T extends Shape\]` beside `which[\U extends Round\]`). The entry does not say whether walk tests the rule.

## P-46

- **Cold read**: "Walk ... promotes from the arguments' run-time types: a choice taken without the curator's word": its status is unclear.
- **Change**: that sentence goes. F-137 takes the walk's reason (below).
- **Checked against**: the clarity pass's block (09:45Z): walk's promotion from run-time types is the conversion judgement's section 3 and its defaults, review-queue item 85. His decision is "Agreed." of 2026-09-27T19:30:05.855Z (inference with coercion on both paths) and "C-O. Both recommendations for batch N accepted." of 2026-09-28T19:06:50.868Z. F-137 already states the behaviour ("Walk promotes from the run-time types, a default"), and row 509 holds its consequence.

## P-48

- **Cold read**: "and always will, since walk has no static types" contradicts P-12, under which walk gains static types after the switch-over; "walk's `Bottom` for row 591 kept without the curator's word" has an unclear status.
- **Change**: "Under walk, which has no static types, dispatch takes the value's type." The parenthesis on row 591 goes.
- **Checked against**: the audit's `P-48.md` and the audit block (08:30Z): option 1 of 2026-09-29T16:52:08.446Z, which he took, said that the interpreter uses the value's type "always, since it has no static types". The reason stays; "always will" goes, since it forecasts past P-12's step. Row 591: F-141 already lists it among walk's defects "each with an expected failure"; review-queue item 81 holds the choice ("Expected failures until the switch-over").
- **Not settled**: whether walk's dispatch takes the instance rule once walk has the checker's static types. Neither P-12 nor P-48 says so. The entry now states only the present.

## P-49

- **Cold read**: "Between the two, the checker tries subtyping with the expected type, a choice taken without the curator's word": its status is unclear.
- **Change**: that sentence and the next one ("Last, it tries coercion without the expected type ...") go. F-78 takes the four attempts (below).
- **Checked against**: review-queue item 2: his decision names two attempts; batch 8's rung I kept the third and the fourth; no source says that he saw the fourth. So both are agents' choices, and both move. `compile-ladder/rung-instance-bound/decision-record.md`, D4; `scala_src/typechecker/impls/Functionals.scala:733-737`, the four attempts where the call has a context.

## P-54

- **Cold read**: "Later, a rung after the switch-over makes `QQ` follow the float ruling" is a decided change with no row; P-68's row 330 covers only the float types.
- **Change**: "After the switch-over, `QQ` follows the float ruling (P-68, on rounding the float types): `floor` and `ceiling` return `QQ` and pass the infinities through, and the brackets, `round` and `truncate` give `ZZ` (row NEW-3)." The word "rung" goes.
- **Checked against**: the audit's `P-54.md`, section 1: his "QQ's ceiling and truncate per your recommendation that we first make it pass and then we'll later make it consistent with the ruling on float." of 2026-10-09T07:28:28.361Z, and the coordinator's record of 07:29:13.328Z ("comes later, with that rung"). The ledger finds (`QQ floor`, `QQ ceiling`, `QQ truncate`) give rows 579 and 635 (`FIXED`); row 330 holds the float types only. So row NEW-3 is drafted.

## P-58

- **Cold read**: "rung" is undefined; "the compiled checker sees each rung's bindings as that rung lands" reads two ways; "neither the loader nor the rewrite exists" names no row; `library.md` says that a new native is a glue class.
- **Change**: "The bindings move onto helpers step by step, and from the step that moves a binding, the compiled checker checks it against the helper's Java signature, not all at once at the switch-over." The plan sentence ("The first natives rung builds them ...") goes, and the gaps are named: "Every binding still names a glue class. Row NEW-4: walk loads a binding's string only as a glue class. Row 309: the compiled path has no counterpart of `builtinPrimitive`."
- **Checked against**: the audit's `P-58.md`, section 1: his "Item 35, agreed with recommendation, option 1." of 2026-10-10T05:27:34.812Z took the coordinator's 00:17:43.858Z option 1, "Rung by rung, from the first natives rung", with each rung's bindings checked as they land. That option is key (b) of `perf-probes/prelude/natives-binding-probe.md:113-116`, "Keyed to the command": "The stages read each family's calls from the rung that changes its strings, exactly as under way 2." `reviews/item35-natives-binding.md:111` gives that checking for way 2 ("every binding is checked against the helper's Java signature"), which key (b) carries over to way 1. `interpreter/glue/NativeApp.java:164-203` (by reading); row 309. With row NEW-4 named, the entry agrees with `library.md`: a binding that walk must load today names a glue class.

## P-60

- **Cold read**: the addendum's ask on coverage sits inside the "Why", so it is unclear whether it is a requirement; "at calls that need no coercion" leaves a call that needs one open; no row and no FACTS entry says what is built.
- **Change**: the requirement moves before the "Why": "The compiled checker uses coverage only in its overloading rules, to accept an overload set and to justify a call's tie among several most specific declarations, and not in its general subtype test." In the "Why": "The addendum shows it for coverage used only in that way, and leaves any wider use to a review of its own. A call that needs a coercion is outside the proof too (F-76 gives what the compiled checker does there)." At the end: "Rows 543 and 551: ...", the parts that the tree lacks.
- **Checked against**: the audit's `judgement-c4.md`, "P-60": his "Yes" of 2026-09-29T11:25:37.094Z took "option 1 with Astra's three points built into 7b's briefs", and the coverage search local to overload checking is one of them; the addendum, `reviews/comprises-type-level-proof-addendum.md:14-25` (calls "without coercion") and `:186-192` (the coverage query local to overload validity; "Any proposed global change must have its assignment/equivalence consequences reviewed explicitly"); `Specification/advanced/overloading.tex:716-719` (the proof covers calls "applicable without coercion"); F-76; rows 543 and 551.
- **Not settled**: what the decision asks at a call that needs a coercion. His words and the addendum leave it outside the proof only. The entry points to F-76 for what the tree does.

## P-73

- **Cold read**: the title opens "Under walk", yet the rule is the specification's; it is unclear whether it binds the compiled `NN32` and `NN64` arithmetic and powers (rows 441, 442, 523). The saturating operators have no row.
- **Change**: "they come in a later step of their own (row NEW-5)". At the end: "The decision is walk's. On the compiled path the rule holds as the specification's (P-25, the standard), and the compiled path departs from it at `^` (rows 523 to 525) and at `CHOOSE` (row 521)."
- **Checked against**: the audit's `P-73.md`, section 1: the ask of 2026-09-24T09:00:30.281Z was "the specification's rule on `walk`", and his answers of 2026-09-26 are walk's too; F-132 ("The compiled path is outside this fact": `^` saturates, throws or adds, rows 523 to 525, and `CHOOSE` past its helper's table dies with a Java exception, row 521). Rows 441 and 442 are not about overflow, so they are not named. The ledger find `saturat*` gives rows 348 (the compiler prelude's inverted spellings, whose note holds the wait) and 429 (unary ∔); neither claim holds the missing operators, and `grep -c -E 'BOXPLUS|BOXMINUS|BOXDOT|BOXTIMES'` on the one library's four prelude files prints 0. So row NEW-5 is drafted.

## P-75

- **Cold read**: "Each way to build it changes a decided behaviour" does not say that the coercion is unbuilt, or what a worker does.
- **Change**: "Row 575: the coercion, which the tree lacks, with this conflict and its measurement. Each way to build it changes a decided behaviour, so the choice of a way is not a worker's (`fortress-repo`'s exploring part)."
- **Checked against**: the scrape's block (12:37Z), which deleted "How to build it waits for the curator's choice, and the coercion stays unbuilt until then"; row 575 (`CONTESTED`, "Not built; the candidates and their costs are ... for the curator"); `fortress-repo`'s `references/exploring.md:7-11` (a choice is a worker's only if it changes no decision of the curator).

## P-78

- **Cold read**: "writes its static argument where its generators and body do not fix the element type" conflicts with the skill ("Write it in every clause form"), and row 731 calls the refusal a checker gap whose workaround is to write the argument.
- **Change**: "A reduction written with generators writes its static argument where nothing at the call fixes the element type. The compiled checker fixes it from neither the generators, the body nor a declared type that receives the value, and refuses every such `SUM` or `PROD` that leaves it out (row 731, a gap of the checker). Row 731's workaround is to write it in every clause form of `SUM` and `PROD`, as in `SUM[\ZZ32\][j <- 0#n] f(j)`." The workaround is said as row 731's, apart from his rule.
- **Checked against**: P-78's history, the block of 2026-10-22 08:30Z: his answer 7, "A clause form whose element type nothing at the call fixes writes its static argument"; row 731 ("never from the clauses", F-bounded `SUM` and `PROD` refused, "Workaround: write the static argument"); `revival-changes.md:79`; `library.md:25`.

## P-79

- **Cold read**: nothing in the skill runs `ProjectFortress/demos/`, so a worker cannot tell whether his change broke a demo; "batch" is undefined.
- **Change**: "...`ProjectFortress/demos/`; no suite or step of the gate runs them." "The same batch rewrites the demo" becomes "the batch that makes the change also rewrites the demo", followed by "A batch is a set of tasks, each called a rung, that agents build at once and land together.", the same words as in P-30 and P-39.
- **Checked against**: `ProjectFortress/build.xml` and the worker skill name no demo (grep); P-79's history (his 2026-10-20T11:52:00.829Z, "maintain them all in running state").

## P-84

- **Cold read**: "decision A, the way the `double[]` store goes under a float vector" is unclear; the unbuilt store has no row.
- **Change**: "The compiled path's `double[]` store (row NEW-6) waits ...; among them is decision A, how an `RR64` array made through the library's generic array traits gets that store (P-85)."
- **Checked against**: `reviews/array-design-ways.md:8` and section 3 ("Decision A, `double[]` under the generic traits": the witness `typecase`, a plain factory, a factory name per element type, a stamped class or a special type); the audit's `P-84.md`, section 2 (no `double[]` class in the compiled run time); `grep -rn 'double\[\]'` on `compiler/runtimeValues/` and `runtimeSystem/` prints nothing. Rows 305 (no array type) and 306 (the cost) do not hold the store, so row NEW-6 is drafted.

## P-85

- **Cold read**: "preparation" is undefined; "way 4a ... It is not the curator's answer" has an unclear status; "goes under a float vector", as in P-84.
- **Change**: decision A is said as in P-84, with "(P-84)". The two sentences on way 4a go; F-270 takes them (below).
- **Checked against**: P-85's history (the clarity block: "way 4a named from review-queue item 30, landed by climb batch 13"); F-270, which states way 4a; review-queue items 30 and 229.
- **Not fixed**: what "the whole preparation for the array work" covers. Review-queue item 230 asks him.

## P-88

- **Cold read**: "`ReadableArray2` ... is also wanted": a decision with a schedule, or a wish? No row.
- **Change**: "(row NEW-7)" after "is also wanted".
- **Checked against**: P-88's history: the scrape deleted "under a gap-ledger row of its own still to be filed"; the noted block gives his page comment of 2026-10-21 23:29 UTC, which keeps the sentence as his position. The ledger finds `ReadableArray2` and `read-only matrix` give nothing. `Library/FortressLibrary.fsi:1591-1593`, `:1695-1697`. Review-queue item 248 asks whether the shape is `ReadableArray2`; row NEW-7 says only that no read-only matrix trait exists.

## P-96

- **Cold read**: "P-80 and P-147 call it the S1 form", yet neither says it any more; the route C item reads oddly for a change that has nothing to do with numbers.
- **Change**: "; P-80 and P-147 call it the S1 form" goes. The Appendix I item becomes "what a return to route C would mean for it, or that it would be the same under route C".
- **Checked against**: a grep of POSITIONS for "S1" finds only P-96; the audit's `P-96.md`, section 1: his "S1 — 1, teams' way." of 2026-09-26T07:48:29.318Z took option 1, whose Appendix I section has "the reason, the original sentences and route C"; `Specification/appendices/changes.tex`, whose entries say "The same under route~C." where route C changes nothing.

## P-151

- **Cold read**: "Climb batch 17 kept `addLeft` and `addRight` in `AnyList` ... against the option he chose" does not say whether the move is still owed (no row); "the team's commented-out generic `distribute`, after a measurement, the other two" contradicts F-242, and "after a measurement" reads as done or pending.
- **Change**: the batch's sentence goes. "move into `List` (row NEW-8)". The fusion sentence becomes "A method's `where` condition clears four of the fusion's six type errors; for the other two, the team's commented-out generic `distribute` is the fix measured (F-242 holds the measurement: as the team wrote it, it only moves them)." The form that clears them, with its result over its own `K`, stays in F-242 alone.
- **Checked against**: the trial audit's `P-151.md`: option 3 of 2026-10-16T15:55:06.719Z, which he took at 16:42 ("Keep the fusion, and measure the team's commented fix for its last 2 errors. Fix the rest of `AnyList` by moving its operations into `List`."); his "HOLD" of 2026-10-16T20:09:30.180Z on the default that the generic's result is over its own element type, so the `K` form is an agent's default and does not enter POSITIONS; F-242 ("The team's commented text ... only moves the two errors to the generic"). The respelling within `AnyList` is FACTS' already: F-243 ("its bodies respelled within `AnyList` and none moved into `List`"). Review-queue item 188 holds the choice. `Library/List.fsi:58-59`, `Library/List.fss:89-90`.

## F-78

- **Change**: after "It builds P-48 and P-49.": "Where the call has an expected type, its attempts come in this order: subtyping without the expected type, kept when its result converts to it; subtyping with the expected type; coercion with it; and coercion without it. The second lets a call whose untyped function argument only the expected type fixes type-check, since the coercion attempt cannot check such an argument (row 507). P-49 decides the first and the third; the second and the fourth are an agent's choice, the instance-bound rung's (its decision record, D4)." The detail names D4 and `Functionals.scala:733-737`, by reading.
- **Why**: the two attempts that P-49 does not decide, moved (review-queue item 2). F-78 already held the first attempt. The sentence on which attempts P-49 decides keeps F-78 and P-49 consistent, as the record part's Consistency check asks; without it, "It builds P-48 and P-49" reads as his approval of all four. F-78 grows from 592 to 1,262 characters; the new sentences stay because a worker who reads only P-49 would take the checker for two attempts (question 1).

## F-137

- **Change**: "Walk promotes from the run-time types, a default." becomes "Walk, which has no static types, promotes from the run-time types."
- **Why**: P-46's walk sentence, moved: F-137 already stated the behaviour; it takes the reason, and "a default" goes, since the review queue (item 85) holds the review.

## F-270

- **Change**: "This is a default, way 4a of fork 3 ... An agent landed it; P-85, his position that the array questions are open, records it as the one exception." becomes "This is way 4a of fork 3 of the array design, a size known only at run time: the checker reads such a size as fixed for that call, not as unknown. P-85 leaves the array design's three questions open with no default; the third stands on this ground, and way 4a is the one way built on it."
- **Why**: P-85's way 4a, moved: P-85 no longer records the exception, so F-270 states the conflict itself (the consistency check of the record part's "What an entry is"). Review-queue items 30 and 229 hold the choice.

## Entries over 600 characters

Of the 24 entries, 22 were over 600 characters before, and P-17 stays under (495 to 507). P-75 passes 600 (547 to 660), by its row sentence and the sentence on whose choice a way is; a worker would otherwise build it (question 1). The three FACTS entries are over 600 characters too. P-60 grows most, from 1,525 to 1,927, by the requirement moved out of the "Why", the coercion boundary and the two rows; each answers a point of the cold read (question 1). P-39 grows from 1,049 to 1,333, by the definitions of a batch, its gate and its manifest, which the worker skill no longer gives (question 2).
