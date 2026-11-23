<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that 5a5955155..9d5d21bf5 added, changed or removed (the batch 35b, landed at 1caac80b3, and the landing's own steps to 9d5d21bf5), written by evidence.py. -->

# The entries that the range changed

- The batch, 5a5955155..1caac80b3: 10 entries: F-53, F-240, F-257, F-341, F-375, F-377, F-403, F-404, F-405, F-406
- After the landing, 1caac80b3..9d5d21bf5: 0 entries
- Now over 600 characters: 10 of 10: F-53, F-240, F-257, F-341, F-375, F-377, F-403, F-404, F-405, F-406

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-53, changed

- Size: at the base 1376 characters; at the landing 1377 characters; now 1377 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 35's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 35b's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-23 20:59Z · rewritten · by climb batch 35b commit stage: the last landed gate is climb batch 35b's: compile-ladder/climb-batch-35b/gate/distance.txt '#total 0' and checker-count.txt '#total 0', '#crash none'; figures unchanged, batch number in the title updated

Report sections that the entry cites: [S1] `references/batch.md`, "The checker count and the distance".

## F-240, changed

- Size: at the base 2202 characters; at the landing 2202 characters; now 2202 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 75 s and its distance stage 127 s at the last landed gate, climb batch 35's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 81 s), over fourteen components, ran at a start load of 0.19, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 176 s (108 s) at 0.22 at climb batch 34b's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-35/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 70 s and its distance stage 130 s at the last landed gate, climb batch 35b's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 85 s), over fourteen components, ran at a start load of 0.55, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 127 s (81 s) at 0.19 at climb batch 35's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-35b/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-23 20:59Z · rewritten · by climb batch 35b commit stage: count stage about 70 s from the file times of the gate's log (checker-count/javac.txt 20:56:09 to run.txt 20:57:18, 69 s); distance stage from compile-ladder/climb-batch-35b/gate/distance.txt '#seconds 130 FortressLibrary 85', '#machine ... load at start 0.55', first line '14 components in one JVM'; compared against climb batch 35's 127 s (81 s) at 0.19

## F-257, changed

- Size: at the base 2036 characters; at the landing 2036 characters; now 2036 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-257 **Under walk, a pair of declarations that the load check refuses after it reads the pair on its declared domains is refused in the name of the rule that the pair breaks.** The load check reads a pair on its declared domains where its parameter-by-parameter check refuses the pair and both declarations have static parameters of their own, or one has them and the other is a plain declaration or a generic trait's functional method that declares none of its own (F-252, F-27, F-318), and where that check finds a plain declaration inside an own generic's declared domain excluding at object types alone (F-375). It reads a pair that the check orders only for the No Duplicates Rule (F-274). The messages open "fails the Return Type Rule:" and "fails the Meet Rule:", and the No Duplicates Rule's is walk's "fails because their parameter lists have the same types"; the report gives them whole. The first two contain the words "not found" because walk's reading is narrower than the rules: rows 539, 779 and 1058 hold valid pairs that walk refuses. A pair that is not read on its declared domains keeps the parameter check's message, such as "with generic type, at least one pair of parameters must have excluding types". Such a pair has a varargs parameter, or parameter lists of different lengths, or raises an error while its instances are read. Or it is of none of the kinds above, as two functional methods of generic traits, or it is the pair of instances that an explicit instantiation such as `f[\A, B\]` makes of two generic declarations of one name (`XXXGenericOverload2`). The message does not decide which pairs load. Gated by `tests/GenericReturnRuleInvariantWalk`, `GenericReturnRuleOuterParamWalk` and `GenericBesidePlainReturnRuleWalk` (Return Type), `GenericOverloadInstancesApartWalk`, `GenericBoundsNoMeetWalk` and `GenericBesidePlainNoMeetWalk` (Meet), and `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk` (No Duplicates). Detail: `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 3.

Now:

- F-257 **Under walk, a pair of declarations that the load check refuses after it reads the pair on its declared domains is refused in the name of the rule that the pair breaks.** The load check reads a pair on its declared domains where its parameter-by-parameter check refuses the pair and both declarations have static parameters of their own, or one has them and the other is a plain declaration or a generic trait's functional method that declares none of its own (F-252, F-27, F-318), and where that check finds a plain declaration inside an own generic's declared domain excluding at object types alone (F-375). It reads a pair that the check orders only for the No Duplicates Rule (F-274). The messages open "fails the Return Type Rule:" and "fails the Meet Rule:", and the No Duplicates Rule's is walk's "fails because their parameter lists have the same types"; the report gives them whole. The first two contain the words "not found" because walk's reading is narrower than the rules: rows 539, 779 and 1122 hold valid pairs that walk refuses. A pair that is not read on its declared domains keeps the parameter check's message, such as "with generic type, at least one pair of parameters must have excluding types". Such a pair has a varargs parameter, or parameter lists of different lengths, or raises an error while its instances are read. Or it is of none of the kinds above, as two functional methods of generic traits, or it is the pair of instances that an explicit instantiation such as `f[\A, B\]` makes of two generic declarations of one name (`XXXGenericOverload2`). The message does not decide which pairs load. Gated by `tests/GenericReturnRuleInvariantWalk`, `GenericReturnRuleOuterParamWalk` and `GenericBesidePlainReturnRuleWalk` (Return Type), `GenericOverloadInstancesApartWalk`, `GenericBoundsNoMeetWalk` and `GenericBesidePlainNoMeetWalk` (Meet), and `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk` (No Duplicates). Detail: `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 3.

History blocks of the range:

- Written by the gather: 2026-11-23 20:07Z · rewritten · from `explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "What changed and why" · by climb batch 35b gather: rung L of climb batch 35b closes rows 1058 and 981 and opens rows 1122 and 1124 (cites [S2])

## F-341, changed

- Size: at the base 2272 characters; at the landing 2559 characters; now 2559 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, run with the four numbers bound as values of type `ZZ`, one result per site and type; a folded constant at a library number type converts from its exact value, outside the coercion; a numeral out of the type's range, one that rounds to an infinity at `RR32` or `RR64`, one at a type with no coercion from it, or one outside its coercion's `where` clause is refused there when it runs; a store keeps its default alone. Dispatch fits it at its default, unless its own coercion reaches a declaration strictly below, which then runs (F-366), else by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10 and `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `h = 0.5` is `true` for `h: QQ = 1/2`, by `QQ`'s `=`, which the numeral reaches by its own coercion, not the library's `=` over `Any` (F-366; `tests/NumeralEqualsNumberWalk`). At load walk refuses a numeral type written as a type that a trait or an object extends, or as a static argument; one in a `comprises` clause loads (row 981). Tests: `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`, `NumeralRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityAtParameterWalk.fss`, `NumeralFoldedRoundsToInfinityWalk.fss`, `NumeralTypeExtendedWalk.fss`, `NumeralTypeStaticArgumentWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

Now:

- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, run with the four numbers bound as values of type `ZZ`, one result per site and type; a folded constant at a library number type converts from its exact value, outside the coercion; a numeral out of the type's range, one that rounds to an infinity at `RR32` or `RR64`, one at a type with no coercion from it, or one outside its coercion's `where` clause is refused there when it runs; a store keeps its default alone. Dispatch fits it at its default, unless its own coercion reaches a declaration strictly below, which then runs (F-366), else by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10 and `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `h = 0.5` is `true` for `h: QQ = 1/2`, by `QQ`'s `=`, which the numeral reaches by its own coercion, not the library's `=` over `Any` (F-366; `tests/NumeralEqualsNumberWalk`). At load walk refuses a numeral type written as a type that a trait or an object extends, as a type that a trait's `comprises` clause lists, or as a static argument; one written as a return type, a variable's or a field's type loads, and is refused only where a numeral meets it (row 1124). Tests: `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`, `NumeralRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityAtParameterWalk.fss`, `NumeralFoldedRoundsToInfinityWalk.fss`, `NumeralTypeExtendedWalk.fss`, `NumeralTypeStaticArgumentWalk.fss`, `NumeralTypeComprisedWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "Row 981: a numeral type in a comprises clause (fork L3)".

History blocks of the range:

- Written by the gather: 2026-11-23 20:07Z · rewritten · from `explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "What changed and why" · by climb batch 35b gather: rung L of climb batch 35b closes rows 1058 and 981 and opens rows 1122 and 1124 (cites [S2])

Report sections that the entry cites: [S3] `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; [S4] `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why"; [S5] `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why"; [S6] `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "Row 981: a numeral type in a comprises clause (fork L3)".

## F-375, changed

- Size: at the base 2206 characters; at the landing 2595 characters; now 2595 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-375 **Walk's load check reads a generic declaration beside a plain one over an object type by the Return Type Rule, and its check of value types passes a type parameter.** A plain declaration whose domain lies inside an own generic's declared domain is read on the declared domains even where the lists differ only at object types, which the team's shortcut takes to exclude: the pair loads where the plain result lies below the generic's by one of three readings that the report gives, and is refused, in the rule's name, where none of them holds (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed). A declaration that writes no return type is not judged there (row 1044), a `comprises` clause is not read (row 550's pair at `ZZ64`, fixed since `ZZ64` is an object, F-379), and two plain lists keep the team's shortcut (row 697). `FTraitOrObject.enforceValueness` refuses a declared type that is not a value type below a value type, and passes the symbolic type of a type parameter (row 997, fixed). The coordinator chose to read no `comprises` clause and to leave unjudged a declaration that writes no return type; the batch's planner chose the check of value types and the repair of both directions in one step, and a worker the three readings; the curator has decided none of them. With the five number types merged with their objects (P-178, F-379), every generic-beside-plain pair over them is read on its declared domains: walk's suite loads every pair that it loaded before, and none of its expected-failure tests moves between a refusal at load and a failure at run time. The reports run the pairs found to change, old against new. Tests: `ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.fss`, `GenericBesidePlainObjectValidWalk.fss`, `GenericBesidePlainEveryInstanceWalk.fss`, `TraitGenericMethodValueBoundWalk.fss`, `OverloadedGenericValueBoundWalk.fss`, `NonValueBelowValueTypeWalk.fss`. Detail: `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" and "Programs run old against new"; `compile-ladder/rung-number-objects/REPORT.md`, "Every pair that walk refuses at load after the change and loaded before" and "Programs run old against new".

Now:

- F-375 **Walk's load check reads a generic declaration beside a plain one over an object type by the Return Type Rule, and its check of value types passes a type parameter.** A plain declaration whose domain lies inside an own generic's declared domain is read on the declared domains even where the lists differ only at object types, which the team's shortcut takes to exclude: the pair loads where the plain result lies below the generic's by one of three readings that the report gives, a tuple result read element by element, as tuple types are covariant (row 1058, fixed), and is refused, in the rule's name, where none of them holds (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed). A declaration that writes no return type is not judged there (row 1044), a `comprises` clause is not read (row 550's pair at `ZZ64`, fixed since `ZZ64` is an object, F-379), and two plain lists keep the team's shortcut (row 697). Two own generics one inside the other whose results are tuples holding each its own type parameter are refused, a valid pair (row 1122). `FTraitOrObject.enforceValueness` refuses a declared type that is not a value type below a value type, and passes the symbolic type of a type parameter (row 997, fixed). The coordinator chose to read no `comprises` clause and to leave unjudged a declaration that writes no return type; the batch's planner chose the check of value types and the repair of both directions in one step, and a worker the three readings; the curator has decided none of them. With the five number types merged with their objects (P-178, F-379), every generic-beside-plain pair over them is read on its declared domains: walk's suite loads every pair that it loaded before, and none of its expected-failure tests moves between a refusal at load and a failure at run time. The reports run the pairs found to change, old against new. Tests: `ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.fss`, `GenericBesidePlainObjectValidWalk.fss`, `GenericBesidePlainEveryInstanceWalk.fss`, `TraitGenericMethodValueBoundWalk.fss`, `OverloadedGenericValueBoundWalk.fss`, `NonValueBelowValueTypeWalk.fss`, `GenericBesidePlainTupleReturnWalk.fss`. Detail: `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" and "Programs run old against new"; `compile-ladder/rung-number-objects/REPORT.md`, "Every pair that walk refuses at load after the change and loaded before" and "Programs run old against new"; `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "Row 1058: a tuple result at object arguments (fork L2)".

History blocks of the range:

- Written by the gather: 2026-11-23 20:07Z · rewritten · from `explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "What changed and why" · by climb batch 35b gather: rung L of climb batch 35b closes rows 1058 and 981 and opens rows 1122 and 1124 (cites [S2])

Report sections that the entry cites: [S7] `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why"; [S8] `compile-ladder/rung-number-objects/REPORT.md`, "Every pair that walk refuses at load after the change and loaded before"; [S9] `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "Row 1058: a tuple result at object arguments (fork L2)".

## F-377, changed

- Size: at the base 2848 characters; at the landing 2827 characters; now 2827 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-377 **The compiled code casts `self` where the checker reads it as a listed type or as the self-type parameter.** `CodeGen.castToTypeBelow` casts a value that has self's type (the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait. It casts at the argument of a call with one argument (a call with several arguments casts each already), at a typed binding and an assignment, at a method's returned value, at each arm of a conditional or a `case` expression, at the conditional's type, and at a function expression's and a local function's result, also where the value is a typecase whose arms each have self's type. So `den(self)` for `den(r: R)` in `trait Q comprises { R }`, `twin(self): S = self` and `mx(self, other: T): T = if lt(other, self) then self else other end` in a self-typed trait verify and run (rows 991, 695, 1050 and 1051, fixed), as the one library's `QQ comprises { Ratio }` and `StandardTotalOrder`'s `MIN` and `MAX` need. A conditional or typecase whose arms are pairs that hold `self`, `MINMAX`'s shape, verifies and runs with no cast, since the declared tuple type is a JVM interface and the caller converts the result; a typecase whose arms are all `self` has a one-element union, which is cast. Only `self` gets the reading: the checker refuses a variable declared at the trait where a listed type is expected. A typecase with `self` in one arm and another value in the other gets no cast (row 1070), and a trait that lists a type at a `where`-clause variable gets none (row 307). An assignment from outside an object to its `var` field, of a value whose static type is a strict subtype of the field's type, fails at run time, `NoSuchMethodError`, also for `c.r := self` at a listed type (row 1053). No cast is added where the value's type is a subtype of the declared type by `extends`. Two casts are added where the verifier, which checks no interface type, needs none: at a declared trait type strictly below self's trait, a planner's default; and at an arm that is `self` where the conditional stands at a trait type, as `atQ(c: Boolean): Q = if c then self else R(0, 0) end` gains `checkcast R`, a worker's choice beyond the plan. The curator has decided neither. Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `ComprisesValueAtConditionalArmRun`, `ComprisesValueFromClosureRun`, `SelfTypeReturnSelfRun`, `SelfTypeReturnSelfAtTraitRun`, `SelfTypeArmRun`, `SelfTypeFromClosureRun`. Detail: `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why"; `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why"; the pairs and the all-`self` typecase: `reviews/model-comparison/probe-2026-11-18.md`, "Point 1" and "Point 2".

Now:

- F-377 **The compiled code casts `self` where the checker reads it as a listed type or as the self-type parameter.** `CodeGen.castToTypeBelow` casts a value that has self's type (the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait. It casts at the argument of a call with one argument (a call with several arguments casts each already), at a typed binding and an assignment, at a method's returned value, at each arm of a conditional or a `case` expression, at the conditional's type, and at a function expression's and a local function's result, also where the value is a typecase whose arms each have self's type. So `den(self)` for `den(r: R)` in `trait Q comprises { R }`, `twin(self): S = self` and `mx(self, other: T): T = if lt(other, self) then self else other end` in a self-typed trait verify and run (rows 991, 695, 1050 and 1051, fixed), as the one library's `QQ comprises { Ratio }` and `StandardTotalOrder`'s `MIN` and `MAX` need. A conditional or typecase whose arms are pairs that hold `self`, `MINMAX`'s shape, verifies and runs with no cast, since the declared tuple type is a JVM interface and the caller converts the result; a typecase whose arms are all `self` has a one-element union, which is cast. Only `self` gets the reading: the checker refuses a variable declared at the trait where a listed type is expected. A typecase with `self` in one arm and another value in the other gets no cast (row 1070), and a trait that lists a type at a `where`-clause variable gets none (row 307). An assignment from outside an object to its `var` field passes the value at the field's type, `self` at a listed type cast to it (`VarFieldAssignedSubtypeRun`; F-406). No cast is added where the value's type is a subtype of the declared type by `extends`. Two casts are added where the verifier, which checks no interface type, needs none: at a declared trait type strictly below self's trait, a planner's default; and at an arm that is `self` where the conditional stands at a trait type, as `atQ(c: Boolean): Q = if c then self else R(0, 0) end` gains `checkcast R`, a worker's choice beyond the plan. The curator has decided neither. Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `ComprisesValueAtConditionalArmRun`, `ComprisesValueFromClosureRun`, `SelfTypeReturnSelfRun`, `SelfTypeReturnSelfAtTraitRun`, `SelfTypeArmRun`, `SelfTypeFromClosureRun`, `VarFieldAssignedSubtypeRun`. Detail: `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why"; `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why"; the pairs and the all-`self` typecase: `reviews/model-comparison/probe-2026-11-18.md`, "Point 1" and "Point 2".

History blocks of the range:

- Written by the gather: 2026-11-23 20:08Z · rewritten · from `explorations/compile-ladder/rung-compiled-missing-methods/REPORT.md`, "6. Sentences of the specification made false" · by climb batch 35b gather: rung M of climb batch 35b closes row 1053 (cites [S10])

Report sections that the entry cites: [S11] `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why"; [S12] `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why"; [S13] `reviews/model-comparison/probe-2026-11-18.md`, "Point 1".

## F-403, added

- Size: at the base none; at the landing 1454 characters; now 1454 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-403 **The one library declares `EQV` (`≡`) and `NEQV` (`≢`) over two booleans, as top-level operators beside `<->`; walk and the compiled path under the one library run them, and on a program's own objects each is a type error.** `EQV`'s body is `if a then b else NOT b end`, which calls no `=` (row 994 is `=` of two booleans, compiled), and `NEQV`'s is `NOT (a EQV b)`, the specification's definition of `≢` (`Specification/basic-lib/Fortress.NegatedOperators.tex:34-35`; `Library/FortressLibrary.fsi:2793-2794`, `Library/FortressLibrary.fss:4923-4924`). The specification and the compiler's prelude write both as methods of `Boolean`; the one library keeps its own form for the boolean operators (fork E1 of climb batch 35, within P-37). Under walk `a ≡ b` for two objects of a program's type stops at the call, 'Unification error: Closure/Constructor for EQV param 1 (a:Boolean) got arg Pt of type Pt', and compiled it is refused, 'Could not check call to operator EQV'. Under walk an equivalence operator that nothing declares, as `APPROX`, still loads and stops at its call with an internal error (row 1118); the one library declares none of `Boolean`'s `⊕`, `⊼` and `⊽`, and no library `majority` (row 1121). Tests: `tests/BooleanEquivalenceWalk.fss`, `one_library_tests/OneLibraryBooleanEquivalence.test`. Detail: `compile-ladder/rung-boolean-equivalence/REPORT.md`, "What changed and why" and "Row 184's own program, and the other programs".

History blocks of the range:

- Written by the gather: 2026-11-23 20:03Z · added · from `explorations/compile-ladder/rung-boolean-equivalence/REPORT.md`, "What changed and why" · by climb batch 35b gather (cites [S14])

Report sections that the entry cites: [S14] `compile-ladder/rung-boolean-equivalence/REPORT.md`, "What changed and why".

## F-404, added

- Size: at the base none; at the landing 1284 characters; now 1284 characters, over 600.
- Section now: "The harness and the gate".

Now:

- F-404 **`explorations/coordinator/tools/seed-worktree.sh` copies `ProjectFortress/build` and not `ProjectFortress/build-one`, so a seeded worktree's first `ant` target rebuilds the Scala and empties the seeded caches.** The implementation's stamp covers `build-one` (`build.xml:400-402`, `:469-470`) and the script copies only `build` (`seed-worktree.sh:86-93`), so in a worktree seeded from a base build that has `build-one` the first target prints 'Sources and build as the last build left them? no', rebuilds the Scala and starts both `default_repository/caches` and `caches-one` again, empty; a compiled run under `FORTRESS_LIBRARY=one` before it stops, 'java.lang.Error: The type ZZ of the library that the compiled path reads is not compiled over com.sun.fortress.compiler.runtimeValues.FZZ of the run-time classes on the class path'. So a seeded worker's first build costs a Scala build and the library order, and the skill's sentence that `ant compileAll` keeps the seeded caches without the script's warning does not hold. No test: `cd ProjectFortress && FORTRESS_LIBRARY=one ../bin/fortress run OneLibraryBooleanEquivalence` in a freshly seeded worktree exits 1 with the error above. Detail: `compile-ladder/rung-boolean-equivalence/REPORT.md`, "Defects, and their homes".

History blocks of the range:

- Written by the gather: 2026-11-23 20:03Z · added · from `explorations/compile-ladder/rung-boolean-equivalence/REPORT.md`, "Defects, and their homes" · by climb batch 35b gather (cites [S15])

Report sections that the entry cites: [S15] `compile-ladder/rung-boolean-equivalence/REPORT.md`, "Defects, and their homes".

## F-405, added

- Size: at the base none; at the landing 1613 characters; now 1613 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-405 **Walk runs the generic dotted methods of one name that a trait or an object declares together, each as its instance at symbolic static arguments.** An object takes each generic method of a name, alone or beside others of the name, with one symbolic instantiation for each name and kinds of static parameters, so that an object's redeclaration of a trait's generic method hides it (`interpreter/evaluator/values/Constructor.java`, `accumulateGenericMethods`, `genericKey`). A call that writes no static argument infers them and dispatches among the instances; a call that writes static arguments instantiates each generic method whose static parameters, by their number and kinds, take them, and chooses among those instances by the call's arguments, as a call of a top-level generic function does (`values/DottedMethodApplication.java`, `genericOverloadsAt`; `values/OverloadedFunction.java`, `compatible`). Of two such methods of one number of parameters whose static parameters differ only in their bounds, one is dropped (row 1125), and a call on a receiver assumed at the trait stops (row 1126). Where a plain method shares the name with a generic one, a call that writes static arguments stops (row 744); of two generic functional methods of one name and one number of parameters, the second is never chosen (row 1123). Tests: `tests/GenericMethodOverloadArity.fss`, `GenericMethodOverloadSetWalk.fss`, `GenericOverloadStaticArgKindsWalk.fss`. Detail: `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "What changed and why" and "Programs run old against new"; `SKEPTIC.md` beside it.

History blocks of the range:

- Written by the gather: 2026-11-23 20:07Z · added · from `explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "What changed and why" · by climb batch 35b gather (cites [S2])

Report sections that the entry cites: [S2] `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "What changed and why".

## F-406, added

- Size: at the base none; at the landing 1609 characters; now 1609 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-406 **A compiled setter's call passes its value at the field's type, and a compiled call of several declarations names an overload method that the class holds.** The code generator passes the value of `c.t := v`, an arrowless call after the desugarer, at the setter's parameter type at the receiver's instance (`CodeGen.setterParamType`), also on a receiver typed by a type variable whose bounds hold the setter, cast below self's trait where it has self's type (F-377). It writes the overload method that a call names where the checker leaves it several declarations, its set split with its principal member (`CodeGen.for_RewriteFnOverloadDecl`), and, where the call's arrow is not the principal member's, a method at the call's signature that passes its arguments on (`CodeGen.forwardToPrincipal`). So `c.t := High`, `s.r := self` at a listed type, `num(R)` beside a trait's `num(self)`, a call on `self` in such a trait, and a call that one declaration takes without coercion and another by a coercion run compiled; the one library's `FortressLibrary` holds `numerator{...}` and `denominator{...}`. Before, the set was split without its subsets and no such method was written in any component. The checker still refuses a comprised object's functional method at a narrower return type (row 1127). Tests: `compiler_tests/VarFieldAssignedSubtypeRun`, `FunctionalMethodComprisedObject`, `ComprisesSelfAbstractFunctionalMethodCall`, `CoercionAnyOverloadRungC`. Detail: `compile-ladder/rung-compiled-missing-methods/REPORT.md`, "1. What changed and why" and "5. Programs run on the old code and on the new".

History blocks of the range:

- Written by the gather: 2026-11-23 20:08Z · added · from `explorations/compile-ladder/rung-compiled-missing-methods/REPORT.md`, "1. What changed and why" · by climb batch 35b gather (cites [S16])

Report sections that the entry cites: [S16] `compile-ladder/rung-compiled-missing-methods/REPORT.md`, "1. What changed and why".

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

`facts-extract.sh 'doc:.claude/skills/coordinator/references/batch.md#The checker count and the distance'`

.claude/skills/coordinator/references/batch.md:58-65, 844 bytes.

~~~~
## The checker count and the distance

Until the switch-over lands, the gate of every batch reports the checker count and the distance. Neither turns the gate red.

- If a rung's test is the checker count or the distance, it takes the last landed gate's tables as its starting values.
- If every file that a rung changes lies outside what the two measures read, the rung runs neither and lists those files (`STAGE_BLIND`). Its skeptic checks the list against the branch's diff.
- The review after the batch ties every new or risen row of the count's table to a named rung edit.
- The gate's comparisons hide Java line numbers, identity hashes and moved library positions. Put every difference that they hid on the review list. Put there too each line of the team's tests that a rung rewrote to keep its checked value, with its before and after.
~~~~

## [S2] explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md:14-43, 5463 bytes, cut at 2500.

~~~~
## What changed and why

### Row 1057: generic dotted methods of one name (fork L1)

The defect is wider than the row's claim. Any two generic dotted methods of one name that one trait or object declares together are lost, of one number of parameters as of two: `tk[\U\](y: U, z: ZZ32)` beside `tk[\U\](y: U, z: String)` in an object stops the same way on the base. The cause: walk binds the two in the declaration's members as one `OverloadedFunction`, which it never finishes, since finishing reads their parameter types without their static parameters (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildTraitEnvironment.java:126-151`, the team's comment "This blows up because the type is not instantiated"). An object's `Constructor` read only a finished set (`getOverloads()`, empty here) and only a lone `GenericMethod` as generic, so the name never reached the object's method environment, and every call failed in `DottedMethodApplication.make` (`:106`). A temporary print in `Constructor` (not kept) showed the member env's `tk` as an `OverloadedFunction` whose `getOverloads()` gave no overload.

- `values/Constructor.java`, `accumulateGenericMethods` (`:876-894`): it also takes each `GenericMethod` held in an `OverloadedFunction`, finished or not, and keys each by `genericKey` (`:896-906`), its name and its number of static parameters, so that one symbolic instantiation serves the methods of one key, an object's redeclaration of a trait's method among them.
- `values/Constructor.java`, `accumulateEnvMethods` (`:823-874`): it reads the overloads with those not yet finished (`getOverloadsAndPending`), and takes each `GenericMethod` among them as its instance at the key's symbolic static arguments, as it already did for a lone `GenericMethod`; the lone one now looks up its key the same way. The comment over `genericArgs` (`:203-207`) says so.
- `values/OverloadedFunction.java`, `getOverloadsAndPending` (`:2976-2987`), new, package-private: the overloads with those added and not yet checked.
- `values/DottedMethodApplication.java`, `typeApply` (`:150-171`) and `genericOverloadsAt` (`:173-201`), new: a call that writes static arguments to an `OverloadedMethod` all of whose overloads are a generic method's instance instantiates each generic method whose static parameters take them (`OverloadedFunction.compatible`) and chooses among the instances by the call's arguments, their number among them, through an `OverloadedMethod` of the instances; one instanc
~~~~

## [S3] explorations/compile-ladder/rung-numeral-types/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-types/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-numeral-types/REPORT.md:11-39, 7574 bytes, cut at 2500.

~~~~
## What changed and why

**The library.** `Library/FortressLibrary.fsi:454-494` and `.fss:668-721` declare, beside `Ratio`, `trait Numeral extends Number comprises { NaturalNumeral, RadixPointNumeral }` with the four getters abstract (`digits`, `fractionDigits` and `radix` at `ZZ32`, `digitValue` at `ZZ`), and the value objects `NaturalNumeral(digits: ZZ32, radix: ZZ32, digitValue: ZZ)`, whose `fractionDigits` is 0, and `RadixPointNumeral(digits: ZZ32, fractionDigits: ZZ32, radix: ZZ32, digitValue: ZZ)`. Each has `asString`, the numeral as the Working Draft writes one (its digits in its radix, at least `digits` of them, upper case, the radix point after `digits - fractionDigits` of them, `_r` where the radix is not ten), `asFloat(self): RR64` by one rounding, and its reversed `=` pairs: `NaturalNumeral` at the eight number types, `RadixPointNumeral` at `RR64`, `QQ` and `RR32`, each `do c: T = self; (c = b) end` as the library writes its pairs (`.fss:418` at the base). The number types' coercions, renamed or new, each with its pair:

| type | coercions from the numeral types, and their bodies | pair |
|---|---|---|
| `RR64` | `coerce(x: NaturalNumeral) = asFloat(x)`, `coerce(x: RadixPointNumeral) = asFloat(x)` (`.fss:389-390`) | both (`.fss:419-420`) |
| `QQ` | `Ratio(x.digitValue, 1)`; `x.digitValue / r^(x.fractionDigits)` for `r: ZZ = big(x.radix)`, reduced by `ZZ`'s `/` (`.fss:565-569`) | both (`.fss:588-589`) |
| `AnyIntegral` | `ZZ32`, `ZZ64` or `ZZ` by the value, which is never negative (`.fss:723-728`) | none, as at the base |
| `ZZ32`, `ZZ64`, `NN64`, `ZZ` | `x.digitValue.asZZ32`, `.asZZ64`, `.asNN64`, `x.digitValue` (`.fss:829`, `:935`, `:1045`, `:1155`) | `NaturalNumeral` (`:845`, `:956`, `:1064`, `:1175`) |
| `NN32` | `x.digitValue.asNN32` (`FortressBuiltin.fss:430`) | `NaturalNumeral` (`:453`) |
| `RR32` | `numeralRR32(x.digitValue, x.radix, 0)` and `numeralRR32(x.digitValue, x.radix, x.fractionDigits)` (`FortressBuiltin.fss:214-215`) | both, new (`:258-259`) |

`RR64` comprises `{ Float }` (`.fsi:294`); `Float`'s `asFloat(self): RR64` (`FortressBuiltin.fss:82`); the `^` over the numeral in `ZZ32`, `ZZ64`, `NN64`, `ZZ` and `NN32` renamed, its body `self^(b.digitValue.asZZ32)`; `pi` and `e` at `RR64` (`Library/Constants.fsi:16-17`, `.fss:15-16`); `ReflectiveQuickCheck.fss:40` chooses `theType[\ZZ32\]()` where it chose `IntLiteral`, and the arm `theType[\IntLiteral\]() => Just[\AnyGen\](genZZ32)` (`:157` at the base), which repeated the `ZZ32` arm
~~~~

## [S4] explorations/compile-ladder/rung-static-numerals/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-static-numerals/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-static-numerals/REPORT.md:11-66, 13554 bytes, cut at 2500.

~~~~
## 1. What changed and why

The rung's commits, on `wip/rung-static-numerals` from `b5b0f82c13`:

| commit | what |
|---|---|
| 8ec860f0b7 | the probe's patch, as applied (`git apply`, one whitespace warning, 90 paths, unchanged) |
| 9f33376ad4 | the prelude's `NN64` numeral coercion reads `v` as unsigned 64 bits (a file of the patch) |
| c4c9deb6bb | the fold's evaluator, `compiler/codegen/NumeralCoercionFold.java`, and its unit test |
| b35cf99c6c | the code generator's numeral places: the library's types by their own coercion, folded; one method per numeral coercion; the minus with the coercion; the static initializer's fill on demand (a file of the patch) |
| dfe04ba962 | `CoercionDesugarer.foldsTo` for folded constants only; the rung's compiled and library tests |
| 063495022b | `NumeralStaticDesignCompiled`'s `Written` coercion binds its operands first, row 971's workaround (a file of the patch) |
| 1484bf7dc9 | walk converts a folded constant at a library type from its exact value (`Numerals.java`, a file of the patch); two walk guards |
| 9af764850d | fork A8: the compiled path's `IntLiteral` and `FloatLiteral` classes and names deleted |
| 4c1a8de543 | row 957's second case as an `XXX` run pair |
| dde414aba4 | the unit test sets the compiler's library names before it reads the analyzed prelude |

**Step 1, the probe's build.** `git apply explorations/compile-ladder/plan-30/probes/draft-numerals.patch` applied with one warning, `draft-numerals.patch:432: trailing whitespace.` on `CompilerBuiltin.fsi`'s `trait ZZ` line, which the base has; no hunk failed; 90 paths, `git status --short | wc -l` printing 90. Built by `ant compileAll` and the library order: "BUILD SUCCESSFUL / Total time: 46 seconds", the five jars. Later changes to files of the patch: `CompilerBuiltin.fss` (9f33376ad4, the `NN64` coercion), `CodeGen.java` (b35cf99c6c), `NumeralStaticDesignCompiled.fss` (063495022b, row 971), `Numerals.java` (1484bf7dc9, fork A3); each reason is in its commit and below.

**Step 2, a numeral as written at a library type through the type's own coercion, folded from its body (fork A1).** `CoercionDesugarer.foldsTo` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala:44-60`) retypes only a folded constant at its library type; a numeral as written keeps its call of the type's numeral coercion, generic over its four numbers. The code generator's site rule (`CodeGen.java:7224-7237`, `numeralCoercionSiteDesc`) no longer excludes 
~~~~

## [S5] explorations/compile-ladder/rung-numeral-leftovers/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-leftovers/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-numeral-leftovers/REPORT.md:12-34, 6167 bytes, cut at 2500.

~~~~
## 1. What changed and why

All eight steps of the section are built. Rows 971, 979, 958, 967 and 974 close; row 442 loses its numeral half; row 960 has its new reproducer.

1. **An integer numeral at the prelude's RR64 and RR32** (row 442's numeral half; P-37's exception, P-174). `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:894` and `:956`, with their headers at `CompilerBuiltin.fsi:402` and `:445`:

       coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = jNumeralToDouble(v, jBigToZZ64(r).asZZ32, 0)
       coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = jNumeralToFloat(v, jBigToZZ64(r).asZZ32, 0)

   Each is its type's radix-point coercion at no digits after the point, so the value is the exact value rounded once (P-173). The fold needed no change: `NumeralCoercionFold` evaluates the body, the literal `0` included, and the class file holds the constants: `javap -p -c -constants NumeralNaturalAtFloatCompiled.class` prints `ldc2_w #85 // double 3.0d`, `ldc #104 // float 1.6777216E7f`, `ldc2_w #123 // double 1.2345678901234568E29d`, `ldc #140 // float 1.2345679E29f` and `ldc2_w #144 // double -3.0d`.
2. **A numeral coercion that starts a task** (rows 971 and 979; P-176; fork N1).
   - `MainWrapper.main` (`runtimeSystem/MainWrapper.java:92-95`) sets the program's arguments, then calls `initializeInRootTask` (`:30-46`), which reaches `FortressExecutable.initializeInRootTask` (`runtimeSystem/FortressExecutable.java:113-141`) by reflection through `icl`, the class loader's copy of the run time's classes.
   - That method makes a `FortressTaskRunnerGroup` of one thread, invokes on it a root `BaseTask` whose `compute` sets itself as the thread's task and calls `Class.forName(name, true, loader)` for each name, and shuts the pool down; `main` waits in `invoke`. What a load or an initialization throws is carried back and thrown unchanged on the main thread.
   - The names are the program's component class, then the class of each component that it imports, at any depth: `InstantiatingClassloader.componentClasses` (`runtimeSystem/InstantiatingClassloader.java:185-248`) reads the class names in the constant pools of the classes of the component's jar, and takes each top-level class whose class file is in a jar of its own name, as `NumeralCoercionSpawnImportedApi.jar!/NumeralCoercionSpawnImportedApi.class` or `fortress.CompilerBuiltin.jar!/fortress/CompilerBuiltin.class`. This is row 979's repair by the same way: every component's class
~~~~

## [S6] explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md, "Row 981: a numeral type in a comprises clause (fork L3)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md#Row 981: a numeral type in a comprises clause (fork L3)'`

explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md:31-33, 544 bytes.

~~~~
### Row 981: a numeral type in a comprises clause (fork L3)

`evaluator/BuildEnvironments.java`, `checkNumeralTypesWritten` (`:1203-1237`): the visitor's new `forTraitDecl` (`:1228-1234`) refuses each type of a trait's `comprises` clause that names `NaturalNumeral` or `RadixPointNumeral`, by the same `refuseNumeralType` and so with the message of an `extends` clause, 'NaturalNumeral cannot be written in a program except as a parameter's type.' The three other forms (a variable's, a field's, a return type) stay as they are (fork L3; P-12).
~~~~

## [S7] explorations/compile-ladder/rung-walk-value-bound/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-value-bound/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-walk-value-bound/REPORT.md:11-16, 2302 bytes.

~~~~
## What changed and why

1. `FTraitOrObject.enforceValueness` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java:102-103) returns at once for a `SymbolicType`. The check refuses a type that is not a value type below a value type. The symbolic type that walk makes for a type parameter is a trait type that extends its bound, and where the bound is a value object the check refused it. A declared type that is not a value type is still refused below a value type.
2. The load check, `completeOverloadingCheck` (OverloadedFunction.java:513-527). The team's shortcut takes two parameter lists to exclude where every parameter at which they differ is an object type of one of them. For an own generic beside a declaration without static parameters whose domain lies inside the generic's declared domain (`plainInsideGeneric`, :837), the pair is now first read on its declared domains (`validOnDeclaredDomains`, :792). A reading that names a rule refuses the pair with that rule's message. A valid reading, and a reading that does not read the pair, leave the pair accepted as before. A Return Type Rule reading against a more specific declaration that writes no return type (`writesReturnType`, :862) is not acted on.
3. The reading on declared domains, plain declaration inside the generic one (OverloadedFunction.java:814-820). It was: the plain result below the generic result, its type parameters standing for themselves. It is now that, or `returnRuleAtObjectArguments` (:882): each static parameter that the generic's return type mentions is fixed by a static argument of one of its parameter types, or the generic returns that type parameter itself and the plain declaration has, at a parameter whose type in the generic is that type parameter, an object type below which its result lies; and the plain result lies below the result of the instance that holds the plain domain. An argument at an object type has that type itself, so every instance of the generic that applies returns a type at or above it. Below a trait type a lower argument selects a lower instance, so a trait type gives nothing.
4. `Specification/basic/inference.tex:267-268`: the box names the declared return type and the field of an object, row 1036, beside the immutable top-level variable.
~~~~

## [S8] explorations/compile-ladder/rung-number-objects/REPORT.md, "Every pair that walk refuses at load after the change and loaded before"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-number-objects/REPORT.md#Every pair that walk refuses at load after the change and loaded before'`

explorations/compile-ladder/rung-number-objects/REPORT.md:162-166, 1115 bytes.

~~~~
## Every pair that walk refuses at load after the change and loaded before

None among the library and the plain tests: every test of `ant testSystem` loads the library, and all 869 passed. For the 163 expected-failure walk tests, which stay green whether their failure is a refusal at load or a failure at run time, the comparison of their outputs on the old code and the new was not made: the session's automatic permission check refused the run of the base build's `harness-one.sh` with `FORTRESS_HOME` set to the base build (the form of `worktrees.md`, "Running the old code"), "Destructive or Unwanted Actions", and by `session.md` that run was not tried another way. On the edit all 163 passed (`Saw expected failure` or `Saw expected exception`).

Added by the skeptic: the 163 expected-failure walk tests, run directly with `old-fortress.sh` and with `bin/fortress`, keep their failures; none moves between a refusal at load and a failure at run time. Their outputs differ only in lists of overloads and in the counts of one race, `XXXAtomicNestedReadsKeptWalk` (`SKEPTIC.md`, "The expected-failure tests").
~~~~

## [S9] explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md, "Row 1058: a tuple result at object arguments (fork L2)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md#Row 1058: a tuple result at object arguments (fork L2)'`

explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md:27-29, 764 bytes.

~~~~
### Row 1058: a tuple result at object arguments (fork L2)

`values/OverloadedFunction.java`, `returnRuleAtObjectArguments` (`:884-900`): where the generic's return type mentions a type parameter that no argument fixes, it asked that the return type be that parameter itself (`if (rOut != p) return false`). It now calls `belowAtObjectArguments` (`:902-930`, new), which reads the parameter itself as before (an object type at a parameter of that type, below which the plain result lies), and reads a tuple result element by element, recursively, as tuple types are covariant; an element without the parameter is left to the existing comparison with the instance that holds the plain domain (`rIn.subtypeOf(holding.getRange())`), and a varargs element is not read.
~~~~

## [S10] explorations/compile-ladder/rung-compiled-missing-methods/REPORT.md, "6. Sentences of the specification made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-compiled-missing-methods/REPORT.md#6. Sentences of the specification made false'`

explorations/compile-ladder/rung-compiled-missing-methods/REPORT.md:93-97, 1208 bytes.

~~~~
## 6. Sentences of the specification made false

None. `grep -rn '~1053\|~815' Specification --include=*.tex` and `grep -rn '~390' Specification --include=*.tex` print nothing. No `\note` or `\revision` in `bindings.tex`, `traits.tex` or `objects.tex` speaks of the compiled path's setters or functional methods. `Specification/appendices/changes.tex:4713` and `:4754` name `NoSuchMethodError` for rows 816 and 839, which this change does not touch.

The record's text that the change makes false, for the gather: F-377's sentence "An assignment from outside an object to its `var` field, of a value whose static type is a strict subtype of the field's type, fails at run time, `NoSuchMethodError`, also for `c.r := self` at a listed type (row 1053)"; row 770's notes, "Without an api, compiled, `num(R)` on the object dies at run time (row 815)"; row 1112's notes, "A call at the listed type's arrow names the overload method that row 815 finds missing"; and the skill's `compiler.md`, "Traps of the compiled path", the first and third items of "A clean link does not prove that every call has its method" (`.claude/skills/fortress-repo/references/compiler.md:172`, `:174`). `record.md` gives each new text.
~~~~

## [S11] explorations/compile-ladder/rung-comprises-cast/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-comprises-cast/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-comprises-cast/REPORT.md:11-36, 3256 bytes, cut at 2500.

~~~~
## What changed and why

The checker reads `self` as more than its trait in two kinds of trait: one whose `comprises` clause lists types (P-60; `var-ref.tex:64-69`), and one with a self-type parameter (P-146; `var-ref.tex:70-76`). It carries the reading as the type of `self`, a `TraitSelfType` with the listed types or the self-type parameter beside the trait. So `den(self)` checks for `den(r: R)` in `trait Q comprises { R }`, and `twin(self): S = self` checks in `trait Shape[\S extends Shape[\S\]\]`. On the JVM the value is typed by the trait's interface, and the verifier refuses a class that passes or returns it at the object's class.

The new member `castToTypeBelow(Expr, Type)` (`CodeGen.java:7436-7459`, directly above `conditionallyCastParameter`) emits a cast when all of these hold:

1. the declared type is a trait type or a type variable;
2. the expression's static type is self's type, a `TraitSelfType` whose list is not empty;
3. the trait does not list a type at a `where`-clause variable (`TypeAnalyzer.opensSizes`);
4. the trait is not a subtype of the declared type, and the declared type is a subtype of the trait (`TypeAnalyzer.lteq`, the general subtype test, which reads only `extends` clauses once the self type is replaced by its trait).

It is called at three kinds of place:

| place | where | what reached it before |
|---|---|---|
| a single argument of a function, a method or a constructor | `evalArg`, `CodeGen.java:7417` | nothing: the branch evaluated the argument and cast nothing |
| a typed binding and an assignment | `forExprsSerial`, `CodeGen.java:5525` | `conditionallyCastParameter` with the variable's own type as the value's, which never differs |
| a method's returned value | `generateActualMethodCode`, `CodeGen.java:3126`, through the new field `declaredResult` (`:7296`) set by `generateTraitDefaultMethod` (`:2864`), `generateFunctionalBody` (`:2951`) and the generic method's body maker (`:2496`) | nothing |

Two or more arguments, an operator's operands and the forked forms already pass through `conditionallyCastParameter`, which casts wherever the two types differ, so `sum(self, self)` ran on the base.

Three findings shaped the test in condition 2 and 4:

- Only `self`, and a value that has its type, gets the reading. A variable `q: Q` at `den(r: R)` is refused by the checker: 'R->ZZ32 is not applicable to an argument of type Q.' (probe D below). So the mission's "a value typed by trait Q" is, in the checker as built, `self`.
- A
~~~~

## [S12] explorations/compile-ladder/rung-self-arm-closure/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-self-arm-closure/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-self-arm-closure/REPORT.md:11-58, 6104 bytes, cut at 2500.

~~~~
## 1. What changed and why

The checker reads `self` in a trait whose `comprises` clause lists types as also a value of the listed type (P-60), and in a trait with a self-type parameter `X` as `T ∩ X` (P-146). Rung K made the code generator cast such a `self` at a call's single argument, a typed binding, an assignment and a method's returned value. Three shapes were left, and each failed when its class loaded:

1. **A conditional's arms (row 1051).** `forIf` emitted each arm and joined them with no cast. One arm left the trait's interface on the stack and the other the listed type's or the parameter's class; the verifier merges them to `Object`, and the `areturn` at the declared type fails: 'VerifyError: Bad return type'. `castToTypeBelow` at the method's return read the conditional's type, which the checker gives as the winning arm's type (`scala_src/typechecker/impls/Misc.scala:529-583`), `R` or `T`, not self's, and emitted nothing. Now `forIf` takes the conditional's type (`CodeGen.java:4535`) and calls `castToTypeBelow` on each arm after its code (`:4558` for each `if` and `elif` clause, `:4568` for the `else`). A `case` expression is desugared into a conditional, so its clauses are cast too (a base failure, now passing; section 5).
2. **A closure's result (row 1050).** `forFnExpr` and the closure of a local function returned the body's value with no cast. Now each calls `castToTypeBelow(body, rt)` on the declared return type after the body (`CodeGen.java:3968` in `forFnExpr`, `:4127` in `localFunctionClosure`).
3. **The circular load (row 1052).** An object that lists a trait with a self-type parameter first extends, as its JVM superclass, that trait's default-method class at itself: `public final class …$Pt extends …$\=Shape?…%Pt?$DefaultTraitMethods implements …$\=Shape?…%Pt?` (javap of the test's jar). Defining `Pt` makes the JVM load that superclass, which the loader expands from its template (`InstantiatingClassloader.readAndExpandGenericThing`). In `tagOf(other: S) = other.tag` the template calls `tag` by `invokeinterface` on `S`; with `S` at `Pt`, `MethodInstantiater.visitMethodInsn` called `Class.forName("…$Pt", true, icl)` to learn whether `Pt` is an interface and so choose the opcode, while `Pt` was being defined: 'ClassCircularityError'. Now it reads that answer from the access flags of the class file that the loader would define for the name, through the loader's own resource lookup and ASM's `ClassReader.getAccess()`, and lo
~~~~

## [S13] explorations/reviews/model-comparison/probe-2026-11-18.md, "Point 1"

`facts-extract.sh 'doc:explorations/reviews/model-comparison/probe-2026-11-18.md#Point 1'`

explorations/reviews/model-comparison/probe-2026-11-18.md:25-57, 2637 bytes, cut at 2500.

~~~~
## Point 1: two `self` arms compared by `.equals`

The suspicion: `castToTypeBelow` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:8010`) gives up on a union whose elements other than `Bottom` are not one type by `.equals` (`:8020`). `TraitSelfType.equals` compares the node's `TypeInfo` too (`ProjectFortress/src/com/sun/fortress/nodes/TraitSelfType.java:81-83`), so two `self` arms with distinct nodes could make two unequal elements, and no cast.

Ledger, before the runs: `ledger-find:self typecase`, `self arm*`, `self conditional` and `castToTypeBelow` find rows 1070, 1051, 1071 and 1053, and none holds two `self` arms. Row 1070 is the neighbouring shape, `self` in one arm and another value in the other.

Programs (`evidence/probe-2026-11-18/`):

- `ProbeTwoSelfArmsComprises.fss`: `both(x: Any): R = typecase x of s: String => self else => self end` in `trait Q comprises { R }`, `R` a value object.
- `ProbeTwoSelfArmsSelfType.fss`: `both(self, x: Any): T = typecase x of s: String => self else => self end` in `trait Tord[\T extends Tord[\T\]\]`, for `object Num(v: ZZ32) extends Tord[\Num\]`.
- `ProbeTwoSelfArmsUnionType.fss`: the first typecase passed to `takeS(s: String)`, so that the checker's refusal prints the typecase's type. It is meant to be refused.

Results:

    $ run-one.sh ProbeTwoSelfArmsComprises          # and the same for ProbeTwoSelfArmsSelfType
    compile exit=0
    == run ProbeTwoSelfArmsComprises (verifier on)
    REACHED
    PASS

    $ run-one.sh ProbeTwoSelfArmsUnionType
    ProbeTwoSelfArmsUnionType.fss:8:27-11:8:
        Could not check call to function takeS
        - String->ZZ32 is not applicable to an argument of type OR((Q & {R})).

    $ javap -c -cp default_repository/caches/bytecode_cache/ProbeTwoSelfArmsComprises.jar 'ProbeTwoSelfArmsComprises$Q$DefaultTraitMethods'
      public static ProbeTwoSelfArmsComprises$R both(ProbeTwoSelfArmsComprises$Q, fortress.AnyType$Any);
        16: goto          27
        21: goto          27
        27: checkcast     #25                 // class ProbeTwoSelfArmsComprises$R
        30: areturn

**Verdict: not reproduced.** The checker gives a `typecase` whose two arms are `self` a union of one element, `OR((Q & {R}))`: the two arms' types are merged before the code generator sees them, so `.equals` at `:8020` never meets two elements for this shape. The method casts to `R` before it returns, and both programs verify and run, at a listed type and at the self-type parame
~~~~

## [S14] explorations/compile-ladder/rung-boolean-equivalence/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-boolean-equivalence/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-boolean-equivalence/REPORT.md:13-28, 2561 bytes, cut at 2500.

~~~~
## What changed and why

Two lines in each of the one library's api and component, after `opr <->`:

    Library/FortressLibrary.fsi:2793  opr EQV(a: Boolean, b:Boolean):Boolean
    Library/FortressLibrary.fsi:2794  opr NEQV(a: Boolean, b:Boolean):Boolean
    Library/FortressLibrary.fss:4923  opr EQV(a: Boolean, b:Boolean):Boolean = if a then b else NOT b end
    Library/FortressLibrary.fss:4924  opr NEQV(a: Boolean, b:Boolean):Boolean = NOT (a EQV b)

The parser reads `EQV`, `EQUIV` and `≡` as one operator, named `EQV`, and `NEQV` and `≢` as one, named `NEQV`, by the alias table that `ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/Operators.java` holds, generated from `operators.txt` beside it (`EQUIV` at `:1250`, `≡` and `≢` at `:2107-2108`). `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:301-306` maps the same names only inside a character literal (`CharLiteralContent`, from `:198`). The specification gives `≡` on booleans: "returns true if both arguments are true or both arguments are false" (`Specification/basic-lib/booleans.tex:256-258`), and `≢` as `¬` of `≡` (`Specification/basic-lib/Fortress.NegatedOperators.tex:34-35`). The one library's boolean operators are top-level operators over two booleans; the two join them in that form (fork E1), and the prelude gains nothing (P-37).

Commits: `6ca6cee9f7` (the library edit, `BooleanEquivalenceWalk`, `OneLibraryBooleanEquivalence`), `b37bc43aa7` (the XXX test of 1118), and this report's.

### Why walk failed two ways on the base

`≡` is a chaining operator, so the parser builds `t ≡ t` as a `ChainExpr`. Walk turns the chain desugaring off (`ProjectFortress/src/com/sun/fortress/Shell.java:286-288`, `:491-492`), and the disambiguator checks the operator of an `OpExpr` (`ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:498-503`) but not a chain's links. So the undeclared `≡` loads, and `forChainExpr` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:437-469`) calls `getOp` (`:893-909`), which raises the bug for the unresolved reference. `≢` is not a chaining operator: it stays an `OpExpr`, which the disambiguator refuses before the run, 'Operator NEQV is not defined.' The compiled path desugars the chain first (`ProjectFortress/src/com/sun/fortress/compiler/PreDisambiguationDesugarer.java:96-97`), so its disambiguator refuses both. In the analysed tree of a probe, not kept, the `≡` link's 
~~~~

## [S15] explorations/compile-ladder/rung-boolean-equivalence/REPORT.md, "Defects, and their homes"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-boolean-equivalence/REPORT.md#Defects, and their homes'`

explorations/compile-ladder/rung-boolean-equivalence/REPORT.md:184-189, 1437 bytes.

~~~~
## Defects, and their homes

- Row 184, walk's InterpreterBug at `≡`, the library's missing declarations: home 1, repaired; `BooleanEquivalenceWalk` and `OneLibraryBooleanEquivalence` assert it. The row is rewritten, then closed.
- 1118, walk loads an undeclared chaining operator, and a call meets the InterpreterBug: home 2, deferred, the specification settles it (`Specification/basic/declarations.tex:416-419`); `ProjectFortress/tests/XXXUndeclaredChainOperatorWalk`.
- The cold-cache refusal of AplCore's `<`: not new, row 342 (rows 97 and 98; the APL experiments' gaps row 82).
- The seeding tool copies `ProjectFortress/build` and not `ProjectFortress/build-one` (`explorations/coordinator/tools/seed-worktree.sh:86-93`): in the seeded worktree a compiled run under `FORTRESS_LIBRARY=one` stopped, 'java.lang.Error: The type ZZ of the library that the compiled path reads is not compiled over com.sun.fortress.compiler.runtimeValues.FZZ of the run-time classes on the class path', and the first `ant` target printed 'Sources and build as the last build left them? no', rebuilt the Scala and emptied both seeded caches ('Caches .../default_repository/caches started again, empty', the same for `caches-one`), since the implementation's stamp covers `build-one` (`build.xml:400-402`, `:469-470`). A defect of a coordinator tool, not of the tree: no ledger row; handed over for FACTS in `record.md`, and a question for the curator.
~~~~

## [S16] explorations/compile-ladder/rung-compiled-missing-methods/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-compiled-missing-methods/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-compiled-missing-methods/REPORT.md:13-26, 3617 bytes, cut at 2500.

~~~~
## 1. What changed and why

**Row 1053.** The desugarer turns `c.t := v` into the dotted call `c.t(v)` with no arrow (`compiler/desugarer/DesugaringVisitor.java:395-418`), and `CodeGen.forMethodInvocation` then takes the argument's static type as the call's domain (the team's own note at `CodeGen.java:7498-7503`: "some method applications (particularly those introduced during getter desugaring) don't have an OverloadingType"). The object's class declares the setter at the field's type, so where the value's type is strictly below it the call names a method the class lacks. Now a call without the checker's arrow, on a trait or object type, with an argument, takes as its domain the parameter type of the receiver type's one method of that name that has no static parameters of its own, one parameter and the return type `()`, at the receiver's instance (`setterParamType`, `CodeGen.java:7728-7759`, used at `:7521-7527`). The argument then goes through `evalArg`, whose one-argument branch casts a value of self's type below its trait (`castToTypeBelow`, `:8223`), so `s.r := self` in `trait Q comprises { R }` passes `self` cast to `R`.

**Row 815, and row 390 with it.** Where the checker leaves a call several declarations, as at the tie between a trait's functional method and that of an object that the trait's `comprises` clause lists, the overload rewrite names an overload method of those declarations, `num{...}` (`compiler/OverloadRewriteVisitor.java:112-133`), and the code generator writes it in `for_RewriteFnOverloadDecl`. That method split the set with `os.split(false)`, which never sets the set's principal member (`OverloadSet.java:419-428`), and since the team's `2fb7488717` (2012-05-09) `generateAnOverloadDefinitionInner` writes nothing without one (`OverloadSet.java:2156-2157`). So no such method was written in any component, and every call that named one died. Now the set is split with its subsets, as the two other sites do (`CodeGen.java:8707`); a name is written once, since it lists the declarations (`:8691-8694`, `:8719-8721`); and where the call's arrow is not the principal member's, a method at the call's signature passes its arguments to the set's method (`forwardToPrincipal`, `:8723-8755`). The checker breaks the tie by the overloadings' order, so `num(R)` names the method at `(R)` in one compile and at `(Q)` in another: the test program's direct compile named `FunctionalMethodComprisedObject.\=num{...}(FunctionalMethodComprisedObject$R)`, a probe o
~~~~
