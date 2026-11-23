<!-- The entries writer's report for climb batch 35b's landing: each change of owed.md whose writer is entries, with its old and new words, its meaning, its size, and the entries kept. -->

# The entries writer's report, climb batch 35b's landing

All the new lines are in `record.apply`, with the landing commit `1caac80b3`. No change has a row as its home, so there is no `rows.rewrite`. `cut-only.txt` is empty: the one POSITIONS change (C13) adds words. Sizes are in characters, counted from each change's deltas, so they are near, not exact.

## C5, F-375

- Old: "... by one of three readings that the report gives, a tuple result read element by element, as tuple types are covariant (row 1058, fixed), and is refused, in the rule's name, where none of them holds (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed). ... (row 697). Two own generics one inside the other whose results are tuples holding each its own type parameter are refused, a valid pair (row 1122). ..."
- New: "... by one of three readings that the report gives, and is refused, in the rule's name, where none of them holds (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed). The reading at object arguments compares a tuple result element by element, as tuple types are covariant (row 1058, fixed). ... (row 697). ..." The sentence on row 1122 is cut.
- Meaning: unchanged for the entry's subject. The tuple clause no longer reads as a fourth reading. Row 1122 is two own generics, which F-275 owns; F-257 already names row 1122.
- Departure from `owed.md`'s wording: `owed.md` says "the readings read a tuple result element by element". The report section ([S9], "Row 1058: a tuple result at object arguments (fork L2)") says that `returnRuleAtObjectArguments` calls `belowAtObjectArguments`, which reads the tuple. That is one reading, the reading at object arguments. So the new sentence names that one reading. This agrees with row 1122's notes ("the reading at object arguments compares a tuple result element by element").
- Size: 2,595 to about 2,475. It is 2,206 at the base, so it grows by the tuple sentence, its test and its pointer only. The sentences past 600 are the base's, kept by questions 1 and 2 (conditions and exceptions of the load check), and the test and Detail lists by question 4's pointer.

## C7, F-403

- Old: "... the specification's definition of `≢` (`Specification/basic-lib/Fortress.NegatedOperators.tex:34-35`; `Library/FortressLibrary.fsi:2793-2794`, `Library/FortressLibrary.fss:4923-4924`). The specification and the compiler's prelude write both as methods of `Boolean`; the one library keeps its own form for the boolean operators (fork E1 of climb batch 35, within P-37). ..."
- New: "... the specification's definition of `≢` (`Specification/basic-lib/Fortress.NegatedOperators.tex`). The specification and the compiler's prelude write both as methods of `Boolean`; the one library keeps its own form for the boolean operators, within P-37, a default of the batch's plan that the curator has not decided. ... A program that imports the APL experiments' `AplCore` gets its infix `≡` and prefix `≢` over `RR64` and arrays in one overload set with the library's two: its own calls give the values that they gave without the library's two, and `t ≡ f` and `t ≢ f` of two booleans print `false` and `true`. No gated program and no line of microGPT imports `AplCore`. This also is the plan's default, not decided by the curator. ..."
- After the fix round, these sentences read as given under "The fix round" below.
- Meaning: (1) unchanged; the entry now says that the form is a default, not his decision. The handle "fork E1 of climb batch 35" goes to the history. (2) A new claim: E.reserved.1's default, from the rung's report ("Row 184's own program, and the other programs") and the review, section 2. It is recorded here by the queue's rule that a default that is not consequential goes to FACTS.
- Moved out first: the library's and the specification's line numbers, to the report (question 4). They are in the rung's "What changed and why".
- Size: 1,454 to about 1,800. Past 600: the headline and the bodies (question 1); the errors on a program's objects (question 1: what a worker sees); rows 1118 and 1121 (question 1: what is still missing); the AplCore sentences (question 1: the default's effect on a program that imports it).
- I left out "where the base stopped, 'Failed to find any matching overload'" from the entry. It tells how the fact came about, so it is in the note.

## C8, F-404

- Old: "So a seeded worker's first build costs a Scala build and the library order, and the skill's sentence that `ant compileAll` keeps the seeded caches without the script's warning does not hold."
- New: "So a seeded worker's first build costs a Scala build and the library order."
- Meaning: unchanged for the tool's fact. The cut clause names a skill passage (`references/worktrees.md:45`) that the skill writer's list holds.
- Size: 1,284 to about 1,182. Past 600: the cause with its file sites and the two error messages (question 1: a worker recognises the failure by them), and the command that shows it (question 1, no test).

## C9, F-405

- Old: "... (`interpreter/evaluator/values/Constructor.java`, `accumulateGenericMethods`, `genericKey`). ... (`values/DottedMethodApplication.java`, `genericOverloadsAt`; `values/OverloadedFunction.java`, `compatible`). Of two such methods of one number of parameters whose static parameters differ only in their bounds, one is dropped (row 1125), and a call on a receiver assumed at the trait stops (row 1126). ..."
- New: "... (`Constructor.accumulateGenericMethods`, `genericKey`). ... (`DottedMethodApplication.genericOverloadsAt`; `OverloadedFunction.compatible`). Two such methods of one number of parameters whose static parameters differ only in their bounds share that instantiation, and the first met is kept (read in the code). So a call can run the less specific one with no error: `Nested.tk(n)` for a `ZZ32` answers 2 with `tk[\U extends Number\](y: U)` beside `tk[\U extends ZZ32\](y: U)`, whose answer is 3 (row 1125, observed). A call on a receiver assumed at the trait stops (row 1126). ..."
- Meaning: sharper, by its ground (the review, section 3; row 1125; `XXXGenericMethodBoundsDifferWalk`, 'FAIL: a ZZ32: 2 =/= a ZZ32: 3'). "Dropped" could read as a failure. The entry now says which one is kept and that the call runs with no error.
- Moved out first: the source paths, cut to class and method names (question 4); the paths are in the rung's report.
- Size: 1,613 to about 1,800. Past 600: the mechanism and how a call chooses (question 1); row 1125's shape with its example (question 1: a worker would otherwise write such a pair); rows 1126, 744 and 1123 (question 1: what still stops).

## C10, F-406

- Old: "... (`CodeGen.forwardToPrincipal`). So `c.t := High`, ... `denominator{...}`. Before, the set was split without its subsets and no such method was written in any component. The checker still refuses ..."
- New: "... (`CodeGen.forwardToPrincipal`). The written method is a default of the batch's plan, and the forwarder a worker's choice beyond the plan; the other way was to make each call through the trait. The curator has decided neither. So `c.t := High`, ... `denominator{...}`. The checker still refuses ..."
- Meaning: unchanged for the code. The "Before" sentence goes to the history. Fork M2 is stated as a default with its other way, as F-377 states its choices. Fork M1 had no other way, so it gets no such clause.
- On the forwarder: `owed.md` calls the forwarder "fork M2's default". The review's section 1 says "That forwarder is the worker's device: fork M2 named 'the overload method written or the call made through the trait'". So the entry calls the written method the plan's default and the forwarder a worker's choice beyond the plan, as F-377 words such a case.
- Size: 1,609 to about 1,708. Past 600: the two mechanisms (question 1), what now runs (question 1), row 1127 (question 1), the M2 sentence (question 2: else a reader takes the forwarder as decided).

## C11, F-253

- Old: "Among the receiver's overloads, where one of two is a generic dotted method and exactly one of their declared domains lies inside the other, walk chooses the inner one; otherwise it compares them on the instance that the call makes (F-252)."
- New: "Among the receiver's overloads, where one of two is a generic dotted method and exactly one of their declared domains lies inside the other, walk chooses the inner one, except for two generic dotted methods of one name, one number of parameters and static parameters of the same kinds that differ only in their bounds, of which the first met is kept (row 1125, F-405); otherwise it compares them on the instance that the call makes (F-252)."
- Meaning: the claim is narrowed to what the tree does, by the review's finding 1 and row 1125.
- Size: 2,088 to about 2,287. It grows by that clause only. Its other sentences past 600 are kept as they were (question 1: the trait's bounds and the unification's errors).

## C12, F-26

- Old: "So a functional method of a generic trait or object is compared on its instance, and a generic dotted method is chosen by F-253 (a generic method at a dotted call, also chosen on declared domains)."
- New: "So a functional method of a generic trait or object is compared on its instance, and a generic dotted method is chosen by F-253 (a generic method at a dotted call, also chosen on declared domains), except two that differ only in their bounds, of which the first met is kept (row 1125)."
- Meaning: narrowed to the tree, as C11. The headline stays: its subject is the choice where both declarations reach the call.
- Size: 1,878 to about 1,966. It grows by that clause only.

## C13, P-174

- Old: "Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause. The tree departs too, with no row, where ..."
- New: "Row 1124 holds where the tree departs: walk loading a numeral type written as a return type, a variable's or a field's type, which it refuses only where a numeral meets it. The tree departs too, with no row, where ..." The rest of the second sentence is unchanged.
- Not cut only: it adds words. The words are rung L's ("P-174's sentences on row 981").
- The decision, before and after: a numeral's type exists only at compile time; every number type takes a numeral through a coercion generic over the four numbers.
- Its reach, before and after: every number type, the library's too; a numeral type written only as a coercion's or an operator's parameter type.
- Its requirement, before and after: a coercion's body computes at compile time with no method invocation, calls the type's constructor, and is instantiated and folded by the compiler.
- Meaning: unchanged. Only the sentence on where the tree departs changes, since rung L made the old one false. It lands by the curator's rule of 2026-10-31, and the landing report names the old and new words.

## Entries kept, with no line

- C1, F-53: keep. The commit stage changed only the batch in the title; the figures are the gate's; nothing names a sentence false.
- C2, F-240: keep. The commit stage's figures; nothing names a sentence false.
- C3, F-257: keep. The swap of row 1058 for row 1122 is right: row 1122 is a valid pair that walk refuses.
- C4, F-341: keep. It grew only by the `comprises` clause, its test and its pointer.
- C6, F-377: keep. The new sentence on the `var` field states the cast, which is the entry's subject.
- C14: keep each entry that names a changed entry or row. The figures, readings and messages that they point to hold.
- C15, row 994; C16, row 1100; C17, the rows the batch changed: no change. Rows are the gather's to close, and their claims hold.

## Decisions not taken

- None that change a meaning. The two departures from `owed.md`'s wording (C5's "the reading at object arguments", C10's "a worker's choice beyond the plan") follow the report sections, and the meaning stays as `owed.md` asks.

## For the skill writer

- F-404's cut clause: `references/worktrees.md:45` says that `ant compileAll` keeps the seeded caches without the script's warning. That is false while `seed-worktree.sh` does not copy `build-one`. This is already on the coordinator's list.

## The fix round

The check failed C7 on two counts of fidelity, and the mechanical checks all passed. The cold reader's doubts are fixed where a source settles them, in the entries that this run changed. The meaning of each entry is unchanged, except for the narrowing to walk in F-403's AplCore sentence, which follows its source.

- C7, F-403, check 1: "within P-37, a default of the batch's plan that the curator has not decided" became "keeps its own form, top-level operators, for the boolean operators, within P-37; that form is a default of the batch's plan, which the curator has not decided". The cold reader also read this passage two ways.
- C7, F-403, check 2: the AplCore sentence now opens "Under walk, a program that imports ...". Source: `rung-boolean-equivalence/SKEPTIC.md:31`. Meaning: narrowed to the path that the evidence holds.
- F-403, cold read: "This also is the plan's default" became "That one overload set is also a default of the batch's plan, which the curator has not decided". "(row 994 is `=` of two booleans, compiled)" became "(compiled under the one library, `=` of two booleans dies at its first call, row 994)", from row 994's claim.
- F-404, cold read: `build-one` is now glossed as "the run-time classes for the one library", with the skill's part (`references/compiler.md`). "before it stops" became "before that first target stops". The new sentence "It is a defect of the tool, so no ledger row holds it." comes from the report's "Defects, and their homes".
- F-405, cold read:
  - "(row 1057, fixed)" is added, since the skill's `interpreter.md:82` still names row 1057.
  - "share that instantiation, so their instances have one signature and the first met is kept" answers whether the number of parameters is in the key. Source: row 1125's notes.
  - Row 1126's sentence now gives its call form and its message from the row: "A call through a type assumption at the trait, as `(Inherits asif Tk).tk(1, 2)` for an object `Inherits` below `Tk`, stops, 'Missing type U'".
- F-406, cold read:
  - "an arrowless call after the desugarer" became "which the desugarer makes a call with no arrow (the checker's type for a call)".
  - "at a listed type" became "at a type that a `comprises` clause lists".
  - "holds `numerator{...}`" became "holds the overload methods `numerator{...}`". Source: the report's "1. What changed and why", which calls `num{...}` an overload method.
- Sizes after the fix, near: F-403 about 1,870; F-404 about 1,310; F-405 about 1,920; F-406 about 1,760. Each grew only by the gloss or the condition that the cold reader lacked.

Doubts kept with the current wording, since no source that I read settles them:
- F-405: which declaration is "the first met" (source order or another order). The review says "the first met" only.
- F-406: "its set split with its principal member", and "cast below self's trait where it has self's type". These were the gather's words, outside this run's change.
- F-375, F-253 and F-26: the cold reader's doubts are about text that this run did not change ("an own generic", the three readings, "both directions", "the five number types merged", the method and member environments, "static parameters of its own"). They are left for a consolidation of these entries.

## For the skill writer

- The cold reader found three skill sentences that contradict landed entries: `references/interpreter.md:80` (row 1058, fixed: F-375), `:82` (row 1057, fixed: F-405) and `references/compiler.md:172` (row 815, `num(R)` now runs: F-406). All three are already on the coordinator's list for the skill writer. The cold reader also names `worktrees.md:36` ("runs walk and the compiled path right away"), which fails in F-404's case and is on no list.

## Questions for the curator

- P-174, wording only, kept as it stands: the title says each numeral type has "its four numbers as static parameters", but `NaturalNumeral` has three, `NaturalNumeral[\n, r, v\]`, as the entry's own `Byte` example writes it. Should the title say "its numbers (three without a radix point, four with one)"?
- P-174, wording only, kept as it stands: "this implementation's `NN32` bound (P-40) is for sizes" reads two ways to a cold reader. Either the bound does not apply to the four numbers, or it applies to them where they are used as sizes. Which reading is yours?
- No change of this run touches what he decided, where it applies or what it requires.
