<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that c1ce2a35e..abb18ec0a added, changed or removed (the batch 31, landed at 7858d0e97, and the landing's own steps to abb18ec0a), written by evidence.py. -->

# The entries that the range changed

- The batch, c1ce2a35e..7858d0e97: 10 entries: F-53, F-75, F-225, F-240, F-372, F-373, F-374, F-375, F-376, F-377
- After the landing, 7858d0e97..abb18ec0a: 0 entries
- Now over 600 characters: 10 of 10: F-53, F-75, F-225, F-240, F-372, F-373, F-374, F-375, F-376, F-377

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-53, changed

- Size: at the base 1376 characters; at the landing 1376 characters; now 1376 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 32's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 31's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-17 04:25Z · rewritten · by climb batch 31 commit stage: climb batch 31's gate: explorations/compile-ladder/climb-batch-31/gate/distance.txt, lines #total 0 and #crash none; checker-count.txt, lines #total 0 and #crash none; the batch number in the title

Report sections that the entry cites: [S1] `references/batch.md`, "The checker count and the distance".

## F-75, changed

- Size: at the base 1206 characters; at the landing 2044 characters; now 2044 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-75 **The compiled checker checks the Return Type Rule over every instance, and a positional rule: when two generic declarations in the more-specific relation declare as many static parameters of their own, those parameters agree in kind by position, and the more specific return type is a subtype of the other once the other's parameters are read as its own by position.** The equal-count scope and the comparison of kinds are the rung's choices. It builds P-45. Checking every instance, as P-45 asks, it also refuses a generic declaration beside a plain one whose domain is an object type, a pair that the type group's 2011 paper (`Papers/Types/`) accepts, since the paper sets aside the instances whose domains cannot meet (row 542, open). In the interpreter's library the two rules refuse no pair: the distance holds no return-type or overloading error (F-53). Gated by `compiler_tests/OverloadGeneric*` and `OverloadBoundNamesForced`, which accept; `XXXOverloadReturnEveryInstance` and `XXXOverloadPermutedStaticParams`, which pin the two rules' refusals; and `XXXOverloadReturnObjectDomain`, which pins row 542's. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 1 and 2.

Now:

- F-75 **The compiled checker checks the Return Type Rule over every instance whose domain can meet, and a positional rule: when two generic declarations in the more-specific relation declare as many static parameters of their own, those parameters agree in kind by position, and the more specific return type is a subtype of the other once the other's parameters are read as its own by position.** The equal-count scope and the comparison of kinds are the rung's choices. It builds P-45. The Return Type Rule compares every instance of the less specific declaration, except that a type parameter standing as a whole parameter type where the more specific declaration has an object type is read as its union with that object type, so that only the instances whose domain meets the object are compared; the type group's 2011 paper (`Papers/Types/`) sets aside the instances whose domain is `Bottom`. So it accepts `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, `Circle` an object, and the pair runs (row 542, fixed; F-376), and the merge of the built-in number types with their objects (P-178) brings no refusal to pairs over them. At a tuple of object types the rule still compares the instances that cannot meet, and refuses `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)` (row 1048). In the interpreter's library the two rules refuse no pair: the distance holds no return-type or overloading error (F-53). Gated by `compiler_tests/OverloadGeneric*` and `OverloadBoundNamesForced`, which accept; `OverloadReturnObjectDomain`, which accepts and runs; `XXXOverloadReturnObjectDomainOtherType` and `XXXOverloadReturnEveryInstance`, which pin the Return Type Rule's refusals; `XXXOverloadGenericObjectDomainByPosition` and `XXXOverloadPermutedStaticParams`, which pin the positional rule's; and `XXXOverloadReturnTupleDomain`, which pins row 1048's. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 1 and 2; `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 02:52Z · rewritten · from `explorations/compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why" · by climb batch 31 gather: rung X of climb batch 31: the rule at an object type, row 542 fixed, the tuple pair of row 1048 (cites [S2])

Report sections that the entry cites: [S2] `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".

## F-225, changed

- Size: at the base 2383 characters; at the landing 2842 characters; now 2842 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-225 **In a self-typed trait with no `comprises` clause, or one that lists only `...`, the compiled checker types `self` in the method bodies as `C[\X\] & X`, the trait met with the implementing type, read from the trait's F-bound; the methods' signatures keep `self` at the plain trait type `C[\X\]`, save in the overloading check's exclusion test (F-277), and the checker refuses an extender at another type.** It builds P-146. A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`. The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's. In a trait whose `comprises` clause lists types, `self` is instead the trait met with the union of those types, and the exclusion test reads its signatures plain. For example, `object Bad extends Integral[\ZZ32\]` is refused, since `Bad` is not a `ZZ32`. The rule accepts every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares instead (P-146). Walk has no such rule and loads what it refuses. A compiled default body that returns `self` dies at class load with a `VerifyError` when the trait's self-type parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]`: an open defect (row 695). The rule refuses, rightly, a team declaration, `PureList`'s `List` (row 355); the demo `trips.fss`'s `generator`, which it refused, extends `StandardTotalOrder[\generator\]` since its repair (row 710; `ProjectFortress/demos/trips.fss:96`). The compiler's prelude writes the self type instead as `comprises T` on `StandardTotalOrder` and `Equality` (`Library/CompilerAlgebra.fsi:16`, `:24`; on `StandardTotalOrder` since Steele's `655e65d53`, 2012-06-05, and `59fdeff62`, 2012-06-06, which took its F-bound away), and that spelling does not bind the one library, since Naden's last text puts the self-type idiom in bounds only, not as a first-class type (`Papers/Types/journal/justificationOfRTR.tex:626-630`), and Steele's own message on `655e65d53` gives the self type as the trait met with the `comprises` clause, which this rule reads from the F-bound. Gated by `compiler_tests/SelfType*` and `XXXSelfType*`. Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4 and 7; `compile-ladder/rung-self-type-exclusion/REPORT.md` section 1.

Now:

- F-225 **In a self-typed trait with no `comprises` clause, or one that lists only `...`, the compiled checker types `self` in the method bodies as `C[\X\] & X`, the trait met with the implementing type, read from the trait's F-bound; the methods' signatures keep `self` at the plain trait type `C[\X\]`, save in the overloading check's exclusion test (F-277), and the checker refuses an extender at another type.** It builds P-146. A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`. The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's. In a trait whose `comprises` clause lists types, `self` is instead the trait met with the union of those types, and the exclusion test reads its signatures plain. For example, `object Bad extends Integral[\ZZ32\]` is refused, since `Bad` is not a `ZZ32`. The rule accepts every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares instead (P-146). Walk has no such rule and loads what it refuses. A compiled default body that returns `self` at the self-type parameter runs, also where the parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]`: the code generator casts `self` there (row 695, fixed; F-377). A function expression or a local function that returns `self` so still fails verification (row 1050), as does a default body that returns `self` in one arm of a conditional and another value in the other, the shape of `StandardTotalOrder`'s `MIN` and `MAX` (row 1051), and a default body that calls a method on a value of the self-type parameter dies at load with a `ClassCircularityError` where the object lists the trait first (row 1052). The rule refuses, rightly, a team declaration, `PureList`'s `List` (row 355); the demo `trips.fss`'s `generator`, which it refused, extends `StandardTotalOrder[\generator\]` since its repair (row 710; `ProjectFortress/demos/trips.fss:96`). The compiler's prelude writes the self type instead as `comprises T` on `StandardTotalOrder` and `Equality` (`Library/CompilerAlgebra.fsi:16`, `:24`; on `StandardTotalOrder` since Steele's `655e65d53`, 2012-06-05, and `59fdeff62`, 2012-06-06, which took its F-bound away), and that spelling does not bind the one library, since Naden's last text puts the self-type idiom in bounds only, not as a first-class type (`Papers/Types/journal/justificationOfRTR.tex:626-630`), and Steele's own message on `655e65d53` gives the self type as the trait met with the `comprises` clause, which this rule reads from the F-bound. Gated by `compiler_tests/SelfType*` and `XXXSelfType*`. Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4 and 7; `compile-ladder/rung-self-type-exclusion/REPORT.md` section 1.

History blocks of the range:

- Written by the gather: 2026-11-17 02:54Z · rewritten · from `explorations/compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why" · by climb batch 31 gather: rung K of climb batch 31: the default body that returns self runs; rows 1050 and 1052 named (cites [S3])
- Written by the merged-diff review: 2026-11-17 03:30Z · rewritten · from `explorations/compile-ladder/climb-batch-31/RECORD.md`, "The gather's own point" · by climb batch 31 merged-diff review: row 1051 named beside row 1050: the conditional arm at a self-type parameter still fails on the merged tree (cites [S4])

## F-240, changed

- Size: at the base 2160 characters; at the landing 2160 characters; now 2160 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 95 s and its distance stage 165 s at the last landed gate, climb batch 32's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 102 s), over fourteen components, ran at a start load of 0.31, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 128 s (83 s) at 0.14 at climb batch 30's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-32/gate/distance.txt`. Detail: `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 75 s and its distance stage 143 s at the last landed gate, climb batch 31's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 86 s), over fourteen components, ran at a start load of 0.08, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 165 s (102 s) at 0.31 at climb batch 32's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-31/gate/distance.txt`. Detail: `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-17 04:25Z · rewritten · by climb batch 31 commit stage: climb batch 31's gate: the count stage's 76 s from the file times of tmp/gate-batch-31/checker-count/javac.txt and run.txt, written about 75 s; explorations/compile-ladder/climb-batch-31/gate/distance.txt, lines #seconds 143, FortressLibrary 86, and #machine, load at start 0.08; climb batch 32's figures as the ones compared against

## F-372, added

- Size: at the base none; at the landing 1752 characters; now 1752 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-372 **The code generator writes each inherited method once into a trait's or an object's class, runs the declaration of the lowest type that declares it, and forwards to a body that an imported api's trait holds.** For the class of a trait or an object the code generator gathers the methods of the type and its supertypes without each declaration that a type strictly below its own declares again at the same parameter types, self apart, compared at the instance that the extends clauses give (`STypesUtil.allMethodsNotReplaced`). So the choice is a relation between two declarations, not the order of the gathered methods, and the library's shape of P-47, `MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below, no longer stops a class at load (row 990, fixed). A method that an imported api's trait declares without `abstract` counts as a body in that trait's class, so a trait that is not first in an extends clause gives its body, plain, generic and functional methods alike (row 732, fixed). A functional method with self not first is no longer written beside its dispatch method (row 571, fixed); behind it, an object's dispatch method still tests the receiver in place of the argument (rows 573 and 1038). The gatherings for the dispatch methods still use the schema comparison of `removeIdenticallyCoveredMethods`, and an object that reaches a generic trait's method along two paths, one through a trait that declares it again, is refused by the checker (row 1037). Tests: `compiler_tests/TraitOwnMethodBesideInheritedCompiled`, `ApiTraitMethodNotFirstCompiled`, `TraitMethodDiamondRedeclaredCompiled`, `FunctionalMethodMeetNarrowedSelfNotFirst`. Detail: `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 02:47Z · added · from `explorations/compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why" · by climb batch 31 gather: rung M of climb batch 31, folded from its record lines (cites [S5])

Report sections that the entry cites: [S5] `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".

## F-373, added

- Size: at the base none; at the landing 2097 characters; now 2097 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-373 **The compiled path runs `label` and `exit`: an exit is a thrown `LabelExit` that names one evaluation of its label block, and reaches it from a loop's body and from another task.** `CodeGen.forLabel` keeps a new `LabelExit.Target` in an immutable local under the label's name and takes, in a handler, the exits that name it; `CodeGen.forExit` throws `LabelExit.of(value, target)` (`compiler/codegen/CodeGen.java`, the two members above `defaultCase`; `runtimeSystem/LabelExit.java`). A function expression or a task whose body exits captures the target as it captures any immutable variable, because every identifier counts as a free variable (`compiler/codegen/FreeVariables.java:98`) and the checker lets no variable share a label's name (`scala_src/typechecker/impls/Misc.scala:704`). A group of forked arms joins the arms that it forked before the exit passes it: at four threads every forked iteration of a parallel `for` runs to its end or to its own exit, and the label's value is the exit of the first arm in the arms' order; at one thread the iterations after the exit do not run. No `catch` clause takes an exit. So the one library's `Indexed.indexOf` compiles in its own form (the test's `Holder.indexOf`), and row 81 is fixed. Four limits stand, each with its test: an exit out of an `atomic` block loses the block's writes (row 1039); a `finally` clause on the exit's way does not run (row 890); a label block as a call's later argument fails verification (row 322); a label block whose value joins a numeral with a number stops the code generator (row 340), so a number beside an exit's value is bound to a typed variable first. The paths differ on a `catch` of `Exception` around an exit (row 1040), on an exit after its label block has completed (row 1041) and on the evaluation that an exit leaves where the block is evaluated again inside itself (row 1042). Test: `compiler_tests/LabelExitCompiled`, which fails with 'Can't compile Label' without the two members. Detail: `compile-ladder/rung-label-exit/REPORT.md`, "What changed and why" and "Points to report reached".

History blocks of the range:

- Written by the gather: 2026-11-17 02:50Z · added · from `explorations/compile-ladder/rung-label-exit/REPORT.md`, "What changed and why" · by climb batch 31 gather: rung L of climb batch 31, folded from its record lines (cites [S6])

Report sections that the entry cites: [S6] `compile-ladder/rung-label-exit/REPORT.md`, "What changed and why".

## F-374, added

- Size: at the base none; at the landing 1596 characters; now 1596 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-374 **A compiled object's `var` field lives in a cell that the object holds, and an atomic expression is its body in an atomic block.** On the compiled path a `var` value parameter or `var` field of an object is a `MutableFValue` cell in a `public final` JVM field, made by the constructor; each read and write checks `BaseTask.inATransaction()` and goes through the transaction or the cell, by the code of a top-level `var` (`VarCodeGen.MutableFieldVar`, a `MutableStaticBinding`), and a loop body or a function expression in the object's method captures the cell, where before it captured a copy of the value. So an `atomic` block tracks a `var` field (row 319, fixed), and every access of one pays the transaction check, outside `atomic` too (row 641). A field without `var` holds its value and has no check. `atomic e` is compiled by `CodeGen.forAtomicBlock` on the block that holds `e` (row 875, fixed), with the block's limits (row 322); a numeral as its value at a place of declared type waits for the checker (row 1043). So a change of the transaction's variable code reaches fields with no second edit, and a new kind of nested context must capture a var field's cell as it does a top-level `var`'s. A `value` object with a `var` field, which the specification forbids and nothing refuses (row 112), is no longer strictly equivalent to another built alike. Tests: `compiler_tests/AtomicFieldCompiled`, `compiler_tests/VarFieldCapturedCompiled`, `compiler_tests/AtomicExprCompiled`. Detail: `compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why" and "The bytecode".

History blocks of the range:

- Written by the gather: 2026-11-17 02:50Z · added · from `explorations/compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why" · by climb batch 31 gather: rung A of climb batch 31, folded from its record lines (cites [S7])

Report sections that the entry cites: [S7] `compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why".

## F-375, added

- Size: at the base none; at the landing 1667 characters; now 1667 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-375 **Walk's load check reads a generic declaration beside a plain one over an object type by the Return Type Rule, and its check of value types passes a type parameter.** A plain declaration whose domain lies inside an own generic's declared domain is read on the declared domains even where the lists differ only at object types: its result must lie below the generic's with the type parameters standing for themselves, or below an object type of its own that stands at a parameter of the type parameter that the generic returns, or below the generic's result at the instance that holds its domain where a static argument of a parameter type fixes each type parameter of that result (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed). A declaration that writes no return type is not judged there (row 1044), a `comprises` clause is not read (row 550), and two plain lists keep the team's shortcut (row 697). `FTraitOrObject.enforceValueness` refuses a declared type that is not a value type below a value type, and passes the symbolic type of a type parameter (row 997, fixed). So the merge of the number types with their objects meets neither defect. Four kinds of a program's own pair changed their verdict at load: two are now refused, and two now load. Tests: `ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.fss`, `GenericBesidePlainObjectValidWalk.fss`, `GenericBesidePlainEveryInstanceWalk.fss`, `TraitGenericMethodValueBoundWalk.fss`, `OverloadedGenericValueBoundWalk.fss`, `NonValueBelowValueTypeWalk.fss`. Detail: `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" and "Programs run old against new".

History blocks of the range:

- Written by the gather: 2026-11-17 02:51Z · added · from `explorations/compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" · by climb batch 31 gather: rung V of climb batch 31, folded from its record lines (cites [S8])

Report sections that the entry cites: [S8] `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why".

## F-376, added

- Size: at the base none; at the landing 965 characters; now 965 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-376 **A compiled dispatcher of a generic declaration casts an arm's result to its own range.** Where an overload set's principal declaration returns one of its static parameters, the dispatcher that `OverloadSet` writes (`generateCall`, `generateLeafCall`) casts the result of each arm with another declared return type to that parameter, which the class loader instantiates; for an arm instantiated at run time the cast takes the place of the cast to the arm's declared return type. So a generic declaration beside a declaration on an object type verifies at every instance, where before the class of the generic's instance at another object type failed, 'VerifyError: Bad return type'. A dispatcher whose range is no static parameter has no such cast (row 699) and writes the bytecode that it wrote before. Test: the `run` step of `compiler_tests/OverloadReturnObjectDomain`. Detail: `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 02:52Z · added · from `explorations/compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why" · by climb batch 31 gather: rung X of climb batch 31, folded from its record lines (cites [S2])

Report sections that the entry cites: [S2] `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".

## F-377, added

- Size: at the base none; at the landing 1786 characters; now 1786 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-377 **The compiled code casts `self` where the checker reads it as a listed type or as the self-type parameter.** `CodeGen.castToTypeBelow` casts a value that has self's type (the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait, at a single argument of a function, a method or a constructor (`evalArg`), at a typed binding and an assignment (`forExprsSerial`) and at a method's returned value (`generateActualMethodCode`), also where the value is a typecase whose arms each have self's type. So `den(self)` for `den(r: R)` in `trait Q comprises { R }` and `twin(self): S = self` in a self-typed trait verify and run (rows 991 and 695, fixed), as the one library's `QQ comprises { Ratio }` needs. Only `self` gets the reading: the checker refuses a variable declared at the trait where a listed type is expected. A closure's returned value and a conditional's arms get no cast (rows 1050 and 1051), and a trait that lists a type at a `where`-clause variable gets none (row 307). No cast is added where the value's type is a subtype of the declared type by `extends`; one is added, where the base emitted none and the class verified, at a declared trait type strictly below self's trait, since the verifier does not check an interface type. A later cast site gates on the expression's type before it compares types: asking the type analyzer at every argument stopped a link over a `bool` static argument. Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `compiler_tests/SelfTypeReturnSelfRun`, `compiler_tests/SelfTypeReturnSelfAtTraitRun`. Detail: `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 02:54Z · added · from `explorations/compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why" · by climb batch 31 gather: rung K of climb batch 31, folded from its record lines (cites [S3])

Report sections that the entry cites: [S3] `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why".

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

## [S2] explorations/compile-ladder/rung-return-rule-object/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-return-rule-object/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-return-rule-object/REPORT.md:12-18, 3252 bytes, cut at 2500.

~~~~
## What changed and why

**The rule as built** (`OverloadingOracle.scala:114-122`, `:136-167`). `satisfiesReturnTypeRule(f, g)` builds, for `f` more specific than `g`, the special arrow `ra` over `f`'s static parameters and the static parameters of `g` that the domains do not force (the "kept" ones), with the domain `d1 ∩ d2` and `g`'s return type, and asks whether `f`'s arrow is a subtype of `ra`. Before this rung every instance of a kept parameter was compared. Now `meetingInstances(d1, d2, kept)` reads `g`'s domain `d2` and return type first: where a kept type parameter `T` of `g` is a whole parameter type of `d2` (the whole domain, or one element of its tuple) and `f`'s domain `d1` has an object type `C` at that position, `T` is replaced by `T ∪ C` in `d2` and in `g`'s return type. An object type is a `TraitType` whose index is an `ObjectTraitIndex`, with or without static arguments, or the self type of one. Where `T` stands at several positions, the union takes each object type found there. Nothing else is changed: a kept parameter inside a static argument, as `T` in `List[\T\]`, a size, a parameter whose position in `d1` is a trait, a tuple or an arrow type, and a domain with varargs or keywords are read as before.

**Where the paper's condition is read.** The paper counts the instances `U -> V` of the special arrow with `U` not `Bottom` (`Papers/Types/overloading-check.tick:180`). At a position where `f` has the object type `C` and `g` has `T`, the instance's domain holds `C ∩ T`. Below an object type there is only the object (`Specification/basic/types-vals-vars.tex:288`), so `C ∩ T` is not `Bottom` exactly where `C` is a subtype of `T`. The instances with `C <: T` are exactly the types `T ∪ C` for `T` within its bound (each such instance `T'` equals `T' ∪ C`; `f` more specific than `g` puts `C` within the bound). So the substitution keeps every instance whose domain can meet, and drops only instances whose domain is `Bottom`: the rule accepts no pair that the paper's rule refuses. It is one sufficient reading of "not `Bottom`", at object types only; the instances it still compares without need are those that only a `comprises` clause, a tuple type or a function type shows empty.

**The dispatcher's return** (`OverloadSet.java:1800`, `:1830`, `:1947`, `:1958-1971`). With the checker's repair alone the pair compiled and the run died as the class of the generic declaration's instance loaded: the dispatcher of `ident[\Square\]` holds the a
~~~~

## [S3] explorations/compile-ladder/rung-comprises-cast/REPORT.md, "What changed and why"

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

## [S4] explorations/compile-ladder/climb-batch-31/RECORD.md, "The gather's own point"

`facts-extract.sh 'doc:explorations/compile-ladder/climb-batch-31/RECORD.md#The gather's own point'`

explorations/compile-ladder/climb-batch-31/RECORD.md:387-389, 1186 bytes.

~~~~
### The gather's own point

gather.1. Rung M's record says of a self-typed trait's body `mx(self, other: T): T = if lt(other, self) then self else other end` at an object instance that it 'waits for rung K after this rung' (`explorations/compile-ladder/rung-method-forwarders/REPORT.md`, "The self-return at an object type"), and its revival change keeps that limit. Rung K casts a method's returned value where the value has self's type, and no arm of a conditional (row 1051). On the merged tree the gather compiled and ran that trait with `object Late(x: ZZ32) extends { Tord[\Late\] }`: `bin/fortress compile` exits 0, and `bin/fortress run` dies, 'java.lang.VerifyError: Bad return type', 'Location: GTordLate$\=Tord?GTordLate\%Late?$DefaultTraitMethods.mx?0(...)', 'Type 'java/lang/Object' (current frame, stack[0]) is not assignable to 'GTordLate$Late''. The one library's `StandardTotalOrder` writes `MIN`, `MAX` and `MINMAX` in that shape (`Library/FortressLibrary.fss:291-294`). Row 1051 is noted; no test was written, the row's own expected failure holding the defect at a listed type. No text mismatch between one rung's specification text and another rung's code was found.
~~~~

## [S5] explorations/compile-ladder/rung-method-forwarders/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-method-forwarders/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-method-forwarders/REPORT.md:11-17, 2515 bytes, cut at 2500.

~~~~
## What changed and why

Three edits of the code generator, in the members that the rung's section names.

1. **One method once (row 990; fork M1).** `CodeGen.dumpMethodChaining` gathered its candidates with `STypesUtil.allMethodsNotIdenticallyCovered`, which drops a declaration that a declaration of a strict subtype covers with an equivalent domain. It compared the two domains as schemas over each declaring trait's own static parameters, bounds included (`fullyReplacedMethodDomain`, STypesUtil.scala:1599). For `mx(self, other: T): T` in `Mmx[\T extends Mmx[\T\]\]` and in `Tord[\T extends Tord[\T\]\]` the two schemas differ in the bound, so neither covered the other, both stayed, and each got a forwarder under one name and descriptor. The gathering now calls the new `STypesUtil.allMethodsNotReplaced` (STypesUtil.scala:1748; CodeGen.java:980): a declaration is left out when another of the same name and kind, with self at the same position, is declared by a type strictly below its own and has the same parameter types without self, compared at the instance that the extends clauses give (`paramsWithoutSelfApart`, STypesUtil.scala:1780, the comparison of `providedAndOverridden`). The rule is a property of pairs of declarations, so the result does not depend on the order in which the methods are gathered.
2. **A body in an api's trait (row 732; fork M2).** The loop skipped every declaration without a body. A declaration read from an imported api never has one. `hasBodyInItsTrait` (CodeGen.java:1051) now keeps a body-less declaration whose declaring trait is named with an api and which has no `abstract` modifier, the reading of the checker's `isAbstractFnDecl`; a field's getter or setter stays skipped. The forwarder that `generateForwardingFor` then writes calls the static body, or for a generic method the closure finder, in the api trait's class of default methods, which the exporting component's jar holds.
3. **Self not first (row 571).** `generateForwardingFor` looks a forwarder up among the names and signatures of the object's dispatch methods, so as not to write it beside one. It built the signature to look up by removing parameter `selfIndex` from the static body's signature, whose self is always first; with self second it removed the first argument instead and found nothing, and the forwarder was written beside the dispatch method of the same name and descriptor. Where it is not narrowing it now removes parameter 0 (CodeGen.java:870-873). The narrowing cal
~~~~

## [S6] explorations/compile-ladder/rung-label-exit/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-label-exit/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-label-exit/REPORT.md:12-20, 2029 bytes.

~~~~
## What changed and why

`CodeGen.java` gets two members directly above `defaultCase` (`compiler/codegen/CodeGen.java:1800-1881`), and the runtime one class, `runtimeSystem/LabelExit.java`.

- `forLabel` (`CodeGen.java:1817`) makes a new `LabelExit.Target` for each evaluation of the block and keeps it in an immutable local under the label's name. The body is compiled in a nested scope that holds that local. An exception-table entry for `LabelExit`, written after the body's code so that the entries of a label, a `try` or an `atomic` block nested in the body come first, leads to a handler that calls `LabelExit.valueAt(target)`: it answers the exit's value where the exit names this evaluation and throws every other exit on. The value is cast to the label's type.
- `forExit` (`CodeGen.java:1862`) evaluates the `with` value, or pushes `()`, loads the target's local, and throws `LabelExit.of(value, target)`.
- `LabelExit` (`runtimeSystem/LabelExit.java:14`) is a Java `Error` that is no `FException`, without a stack trace. `LabelExit.Target` (`:19`) is an `FValue`, so that a closure holds it as it holds any immutable variable.

How an exit reaches its label from a loop's body. The body of a `for` is a function expression, and an arm of a parallel group a task; each takes the variables of the enclosing block that its body names from `FreeVariables`, in which every identifier counts (`compiler/codegen/FreeVariables.java:98`), the target of an exit among them. So the closure's class gets a field for the label's local with no change to `forFnExpr`, `delegate` or `forLetFn`. The checker lets no variable in scope share a label's name ('Cannot use an existing identifier … for a 'label' expression', `scala_src/typechecker/impls/Misc.scala:704`), so the name is free in the code generator's environment of locals. The exit thrown in the closure passes the library's code, and a group of forked arms joins the arms that it forked before it throws the exit on (`CodeGen.joinForkedArms`, `CodeGen.java:1681`; P-175).
~~~~

## [S7] explorations/compile-ladder/rung-atomic-expr-field/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-atomic-expr-field/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-atomic-expr-field/REPORT.md:11-15, 2051 bytes.

~~~~
## What changed and why

1. **The atomic expression** (`CodeGen.java:1977-1984`). The parser writes `atomic do ... end` as a `Block` marked atomic (`parser/DelimitedExpr.rats:155-163`) and `atomic e`, for any other body, as an `AtomicExpr` (`parser/Expression.rats:737-738`). The code generator compiled the first and had no case for the second, so `defaultCase` refused it. The new member `forAtomicExpr` makes the atomic block that holds the body alone, the node the parser makes for `atomic do e end`, and hands it to `forAtomicBlock`. The block's value is its last expression's (`doStatements`, `CodeGen.java:1651`), so the expression's value is its body's.
2. **A var field** (`CodeGen.java:4938-4961`, `:4976-5014`; `VarCodeGen.java:202-239`, `:325`). An object's `var` value parameter and `var` field of its body are kept in a `MutableFValue` cell. The object's JVM field holds the cell, is `public final`, and is written once, by the constructor (`MutableFieldVar.firstWrite`, `VarCodeGen.java:223`). `MutableFieldVar` is now a `MutableStaticBinding` whose cell is reached through the object, so a read and a write emit the code of a top-level `var`: the check `BaseTask.inATransaction()`, then `Transaction.TXRead`/`TXWrite` on the cell inside a transaction, or the cell's `getValue`/`setValue` outside one. A field that is not `var` is a `FieldVar`, as an immutable value parameter was, with the bytecode it had.
3. **A field captured by a loop body or a function expression.** Every nested code-generation context (a task, a closure) asks `isAMutableStaticBinding()` to decide whether it captures a cell or a copy (`CodeGen.java:5282`, `:5397`, `:5462` at the base). Because `MutableFieldVar` now is one, a loop body or a function expression inside an object's method captures the field's cell. On the base it captured a copy of the value, so a write from a loop body inside the object's own method was lost at one thread too. This defect was not in the ledger; the cell repairs it, and `compiler_tests/VarFieldCapturedCompiled` asserts it.
~~~~

## [S8] explorations/compile-ladder/rung-walk-value-bound/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-value-bound/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-walk-value-bound/REPORT.md:11-16, 2302 bytes.

~~~~
## What changed and why

1. `FTraitOrObject.enforceValueness` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java:102-103) returns at once for a `SymbolicType`. The check refuses a type that is not a value type below a value type. The symbolic type that walk makes for a type parameter is a trait type that extends its bound, and where the bound is a value object the check refused it. A declared type that is not a value type is still refused below a value type.
2. The load check, `completeOverloadingCheck` (OverloadedFunction.java:513-527). The team's shortcut takes two parameter lists to exclude where every parameter at which they differ is an object type of one of them. For an own generic beside a declaration without static parameters whose domain lies inside the generic's declared domain (`plainInsideGeneric`, :837), the pair is now first read on its declared domains (`validOnDeclaredDomains`, :792). A reading that names a rule refuses the pair with that rule's message. A valid reading, and a reading that does not read the pair, leave the pair accepted as before. A Return Type Rule reading against a more specific declaration that writes no return type (`writesReturnType`, :862) is not acted on.
3. The reading on declared domains, plain declaration inside the generic one (OverloadedFunction.java:814-820). It was: the plain result below the generic result, its type parameters standing for themselves. It is now that, or `returnRuleAtObjectArguments` (:882): each static parameter that the generic's return type mentions is fixed by a static argument of one of its parameter types, or the generic returns that type parameter itself and the plain declaration has, at a parameter whose type in the generic is that type parameter, an object type below which its result lies; and the plain result lies below the result of the instance that holds the plain domain. An argument at an object type has that type itself, so every instance of the generic that applies returns a type at or above it. Below a trait type a lower argument selects a lower instance, so a trait type gives nothing.
4. `Specification/basic/inference.tex:267-268`: the box names the declared return type and the field of an object, row 1036, beside the immutable top-level variable.
~~~~
