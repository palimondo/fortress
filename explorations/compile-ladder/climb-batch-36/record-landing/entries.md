<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that b5a758846..99035e231 added, changed or removed (the batch 36, landed at 61b50cd34, and the landing's own steps to 99035e231), written by evidence.py. -->

# The entries that the range changed

- The batch, b5a758846..61b50cd34: 24 entries: F-26, F-34, F-53, F-76, F-175, F-225, F-240, F-253, F-257, F-334, F-341, F-342, F-345, F-347, F-352, F-377, F-390, F-396, F-403, F-405, F-406, F-407, F-408, F-409
- After the landing, 61b50cd34..99035e231: 0 entries
- Now over 600 characters: 24 of 24: F-26, F-34, F-53, F-76, F-175, F-225, F-240, F-253, F-257, F-334, F-341, F-342, F-345, F-347, F-352, F-377, F-390, F-396, F-403, F-405, F-406, F-407, F-408, F-409

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-26, changed

- Size: at the base 1966 characters; at the landing 1997 characters; now 1997 characters, over 600.
- Section now: "Execution model".

At the base:

- F-26 **Under walk, when one of two applicable declarations has static parameters of its own, the call chooses on their declared domains where exactly one lies inside the other, not by the order in which they are written.** It builds P-45, the choice among overloads by declared parameter types, under walk. A declaration has static parameters of its own if it is a generic function or constructor, or a functional method with static parameters in a trait or object without any. Its declared domain, walk's symbolic instance, is its parameter types with each type parameter standing for itself under its bounds. Where neither declared domain lies inside the other, where each lies inside the other, or where neither declaration has static parameters of its own, walk compares the domains of the instances that the call makes. So a functional method of a generic trait or object is compared on its instance, and a generic dotted method is chosen by F-253 (a generic method at a dotted call, also chosen on declared domains), except two that differ only in their bounds, of which the first met is kept (row 1125). If the chosen declaration is generic and its instance takes an argument only by a conversion, walk converts the argument and dispatches the converted arguments again, so the most specific declaration for the converted values runs. In two cases walk keeps the chosen instance, with no second dispatch: an overloaded dotted method, and a position whose conversion `Coercions.coercionFor` does not find, such as a tuple converted element by element. Two generic overloads whose static parameters agree in name, kind and bounds share one symbolic instance, even if their `where` clauses differ; no test or library declaration has such a pair (row 478). Gated by `tests/DispatchDeclaredDomain.fss` and `DispatchConvertedAgain.fss`. Detail: `compile-ladder/rung-walk-dispatch/REPORT.md` sections 5.1, 5.2 (the second dispatch) and 5.5 (the symbolic instance).

Now:

- F-26 **Under walk, when one of two applicable declarations has static parameters of its own, the call chooses on their declared domains where exactly one lies inside the other, not by the order in which they are written.** It builds P-45, the choice among overloads by declared parameter types, under walk. A declaration has static parameters of its own if it is a generic function or constructor, or a functional method with static parameters in a trait or object without any. Its declared domain, walk's symbolic instance, is its parameter types with each type parameter standing for itself under its bounds. Where neither declared domain lies inside the other, where each lies inside the other, or where neither declaration has static parameters of its own, walk compares the domains of the instances that the call makes. So a functional method of a generic trait or object is compared on its instance, and a generic dotted method is chosen by F-253 (a generic method at a dotted call, also chosen on declared domains), except two whose bounds differ only in the api of a type of one simple name, of which the object's is kept (row 1134). If the chosen declaration is generic and its instance takes an argument only by a conversion, walk converts the argument and dispatches the converted arguments again, so the most specific declaration for the converted values runs. In two cases walk keeps the chosen instance, with no second dispatch: an overloaded dotted method, and a position whose conversion `Coercions.coercionFor` does not find, such as a tuple converted element by element. Two generic overloads whose static parameters agree in name, kind and bounds share one symbolic instance, even if their `where` clauses differ; no test or library declaration has such a pair (row 478). Gated by `tests/DispatchDeclaredDomain.fss` and `DispatchConvertedAgain.fss`. Detail: `compile-ladder/rung-walk-dispatch/REPORT.md` sections 5.1, 5.2 (the second dispatch) and 5.5 (the symbolic instance).

History blocks of the range:

- Written by the gather: 2026-11-24 05:38Z · rewritten · from `explorations/compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1. What changed and why" · by gather of climb batch 36: rung G's record.md, folded (cites [S1])

## F-34, changed

- Size: at the base 1873 characters; at the landing 1873 characters; now 1873 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-34 **Against the interpreter's library, the code generator refuses none of the declarations of the fourteen components that the distance stage checks, and a test in every gate compiles the fourteen whole.** The measure's setting is the distance stage's (F-53): the checker's failures caught per declaration, and the bound `Any`. On the code of `f3439cf7ce`, under `FORTRESS_LIBRARY=one` and without the measure's patch, the measure's script gives 0 refused, 754 emitted, no component failure, as on `285efad802` with the patch. The test that checks this count of refused declarations is `one_library_tests/OneLibraryComponents.test`, which the onelibrary track runs first in every gate (`OneLibraryJUTest.java:44`): it compiles the fourteen to jars, so a refused declaration turns the gate red (F-396). The script skips the dispatch methods, so it does not reach `String`'s two calls with a type assumption at one argument (`Library/String.fss:67`, `:69`); `String`'s real compile under the selection ends clean, and both calls call the body of the `(String, String)` declaration (F-325). A declaration counts at its first wall, and some hold a second. The script runs no class that it emits, so it cannot see a class that fails when it loads or at the JVM's verifier; such classes stand between the library's jars and a run (rows 1091, 1099; F-396). Measured once on each code. Command: `FORTRESS_LIBRARY=one explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`; its patch no longer applies whole, and the script then goes on without it. Detail: `compile-ladder/rung-first-run-one-library/REPORT.md`, "The stages (a point to report)"; `compile-ladder/plan-34/probes/measure-285efad802.txt`; `compile-ladder/plan-31/PROBES.md`, "3. The measure: the declarations of the fourteen components that the code generator refuses".

Now:

- F-34 **Against the interpreter's library, the code generator refuses none of the declarations of the fourteen components that the distance stage checks, and a test in every gate compiles the fourteen whole.** The measure's setting is the distance stage's (F-53): the checker's failures caught per declaration, and the bound `Any`. On the code of `f3439cf7ce`, under `FORTRESS_LIBRARY=one` and without the measure's patch, the measure's script gives 0 refused, 754 emitted, no component failure, as on `285efad802` with the patch. The test that checks this count of refused declarations is `one_library_tests/OneLibraryComponents.test`, which the onelibrary track runs first in every gate (`OneLibraryJUTest.java:44`): it compiles the fourteen to jars, so a refused declaration turns the gate red (F-396). The script skips the dispatch methods, so it does not reach `String`'s two calls with a type assumption at one argument (`Library/String.fss:67`, `:69`); `String`'s real compile under the selection ends clean, and both calls call the body of the `(String, String)` declaration (F-325). A declaration counts at its first wall, and some hold a second. The script runs no class that it emits, so it cannot see a class that fails when it loads or at the JVM's verifier; such a class, as row 1137's, stands between the library's jars and a run (F-396). Measured once on each code. Command: `FORTRESS_LIBRARY=one explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`; its patch no longer applies whole, and the script then goes on without it. Detail: `compile-ladder/rung-first-run-one-library/REPORT.md`, "The stages (a point to report)"; `compile-ladder/plan-34/probes/measure-285efad802.txt`; `compile-ladder/plan-31/PROBES.md`, "3. The measure: the declarations of the fourteen components that the code generator refuses".

History blocks of the range:

- Written by the merged-diff review: 2026-11-24 06:26Z · rewritten · from `explorations/compile-ladder/rung-one-library-run-walls/REPORT.md`, "What changed and why" · by climb batch 36's merged-diff review: rung C fixed rows 1091 and 1099, which the sentence named as open (cites [S2])

Report sections that the entry cites: [S3] `compile-ladder/rung-first-run-one-library/REPORT.md`, "The stages (a point to report)"; [S4] `compile-ladder/plan-31/PROBES.md`, "3. The measure: the declarations of the fourteen components that the code generator refuses".

## F-53, changed

- Size: at the base 1377 characters; at the landing 1376 characters; now 1376 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 35b's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 36's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-24 06:50Z · rewritten · by climb batch 36 commit stage: the last landed gate is climb batch 36's: compile-ladder/climb-batch-36/gate/distance.txt '#total 0', '#crash none', first line '14 components in one JVM', and checker-count.txt '#total 0', '#crash none'; compile-ladder/gate/distance-sites.tsv header only, no site; figures unchanged, batch number in the title updated; numbers only

Report sections that the entry cites: [S5] `references/batch.md`, "The checker count and the distance".

## F-76, changed

- Size: at the base 1631 characters; at the landing 1658 characters; now 1658 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-76 **The compiled checker accepts the specification's `comprises` example of the Meet Rule (`Specification/advanced/overloading.tex`, "The Meet Rule for Functions") by a coverage check used only in overload checking, not in its subtype test, and types a call whose argument's static type lies below closed traits and above the types that they list by the intersection of the return types of its most specific declarations, when they tie without coercion.** It builds P-60, which reads `comprises` at the level of values: several declarations below two overloads serve as their meet if together they cover it. Open: coverage refuses a pair when a declaration that it compares has static parameters (row 546). In an accepted family that has any other generic declaration, such a call is typed by its first minimal candidate in the call's order of overloadings, which follows the build (row 935), not by the intersection (row 543). That narrower scope than P-60's is a default. On the compiled path, a method call on a value typed by the intersection runs on the conjunct that has the checker's chosen declaration (F-386), and a generic declaration instantiated at an intersection type dies as it loads (row 559). The checker checks a `comprises` clause only at the closed trait's immediate subtypes, so a type in another component below a generic subtrait escapes it (row 487). Its verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Gated by `compiler_tests/*Comprises*` and `*CoverageReturn*`. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 3 and 4.

Now:

- F-76 **The compiled checker accepts the specification's `comprises` example of the Meet Rule (`Specification/advanced/overloading.tex`, "The Meet Rule for Functions") by a coverage check used only in overload checking, not in its subtype test, and types a call whose argument's static type lies below closed traits and above the types that they list by the intersection of the return types of its most specific declarations, when they tie without coercion.** It builds P-60, which reads `comprises` at the level of values: several declarations below two overloads serve as their meet if together they cover it. Open: coverage refuses a pair when a declaration that it compares has static parameters (row 546). It takes the intersection where no declaration more specific than a tied one that the call may run has static parameters, the boundary of the text (`Specification/appendices/changes.tex`, `revival-meet`); otherwise the declared signatures decide the tie, or it is refused as ambiguous (F-408). On the compiled path, a method call on a value typed by the intersection runs on the conjunct that has the checker's chosen declaration (F-386), and a generic declaration instantiated at an intersection type dies as it loads (row 559). The checker checks a `comprises` clause only at the closed trait's immediate subtypes, so a type in another component below a generic subtrait escapes it (row 487). Its verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Gated by `compiler_tests/*Comprises*` and `*CoverageReturn*`. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 3 and 4.

History blocks of the range:

- Written by the gather: 2026-11-24 05:41Z · rewritten · from `explorations/compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung K's record.md, folded (cites [S6])

Report sections that the entry cites: [S7] `Specification/advanced/overloading.tex`, "The Meet Rule for Functions".

## F-175, changed

- Size: at the base 1204 characters; at the landing 1024 characters; now 1024 characters, over 600.
- Section now: "The specification and the repository's lineage".

At the base:

- F-175 **The specification reads a `comprises` clause at the level of values in every passage.** It builds P-60. Appendix I's entry "Traits with comprises clauses read at the level of values" records the change. A call whose argument's static type stands between two closed traits runs the declaration that covers its value. Where its declarations have no static parameters, its type is the intersection of its most specific declarations' return types. Appendix I names four places where the compiled path departs. The checker checks a `comprises` clause at the closed trait's immediate subtypes only (row 487). Where any declaration of the overload set has static parameters, the checker types such a call by one of its most specific declarations instead, a deliberate choice (row 543). The checker refuses the Meet Rule's example for closed traits when its declarations have static parameters (row 546). The checker's verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Detail: `Specification/appendices/changes.tex:3474-3670`, with the rows at `:1674-1677` and `:3740-3746`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 8 and 9.

Now:

- F-175 **The specification reads a `comprises` clause at the level of values in every passage.** It builds P-60. Appendix I's entry "Traits with comprises clauses read at the level of values" records the change. A call whose argument's static type stands between two closed traits runs the declaration that covers its value. Where its declarations have no static parameters, its type is the intersection of its most specific declarations' return types. Appendix I names three places where the compiled path departs. The checker checks a `comprises` clause at the closed trait's immediate subtypes only (row 487). The checker refuses the Meet Rule's example for closed traits when its declarations have static parameters (row 546). The checker's verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Detail: `Specification/appendices/changes.tex:3486-3681`, with the rows at `:1677` and `:3752-3755`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 8 and 9.

History blocks of the range:

- Written by the merged-diff review: 2026-11-24 06:26Z · rewritten · from `explorations/compile-ladder/rung-checker-most-specific/REPORT.md`, "Sentences of the specification" · by climb batch 36's merged-diff review: rung K made the sentence on row 543 false (row 543 closed, its clause out of Appendix I); lines re-anchored (cites [S8])

## F-225, changed

- Size: at the base 2927 characters; at the landing 3019 characters; now 3019 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-225 **In a self-typed trait with no `comprises` clause, or one that lists only `...`, the compiled checker types `self` in the method bodies as `C[\X\] & X`, the trait met with the implementing type, read from the trait's F-bound; the methods' signatures keep `self` at the plain trait type `C[\X\]`, save in the overloading check's exclusion test (F-277) and in the Return Type check of a dotted method redeclared below the trait (row 1094), and the checker refuses an extender at another type.** It builds P-146. A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`. The Return Type check reads `self` as `C[\X\] & X` in the trait's signature where an object's dotted method redeclares the trait's method at the same parameter types, so it refuses a narrower return type; a getter so redeclared reads the plain type and compiles (F-394). That reading of a dotted method departs from P-146 and P-157, which keep the plain signatures for the Return Type Rule (row 1094). The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's. In a trait whose `comprises` clause lists types, `self` is instead the trait met with the union of those types, and the exclusion test reads its signatures plain. For example, `object Bad extends Integral[\ZZ32\]` is refused, since `Bad` is not a `ZZ32`. The rule accepts every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares instead (P-146). Walk has no such rule and loads what it refuses. A compiled default body that returns `self` at the self-type parameter runs, also where the parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]` (row 695, fixed). F-377 gives the cast that does it, also at a conditional's arm (`StandardTotalOrder`'s `MIN` and `MAX`) and at a closure's result (rows 1051 and 1050, fixed). A default body that calls a method on a value of the self-type parameter runs, also where the object lists the trait first (row 1052, fixed); F-385 gives how, and the generic object for which it may not hold. The rule refuses, rightly, a team declaration, `PureList`'s `List` (row 355). The compiler's prelude writes the self type instead as `comprises T` on `StandardTotalOrder` and `Equality` (`Library/CompilerAlgebra.fsi:16`, `:24`), and that spelling does not bind the one library, since Naden's last text puts the self-type idiom in bounds only, not as a first-class type (`Papers/Types/journal/justificationOfRTR.tex:626-630`), and Steele's own message on `655e65d53` gives the self type as the trait met with the `comprises` clause, which this rule reads from the F-bound. Gated by `compiler_tests/SelfType*` and `XXXSelfType*`. Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4 and 7; `compile-ladder/rung-self-type-exclusion/REPORT.md` section 1.

Now:

- F-225 **In a self-typed trait with no `comprises` clause, or one that lists only `...`, the compiled checker types `self` in the method bodies as `C[\X\] & X`, the trait met with the implementing type, read from the trait's F-bound; the methods' signatures keep `self` at the plain trait type `C[\X\]`, save in the overloading check's exclusion test (F-277) and in the Return Type check of a dotted method redeclared below the trait (row 1094), and the checker refuses an extender at another type.** It builds P-146. A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`. The Return Type check reads `self` as `C[\X\] & X` in the trait's signature where an object's dotted method redeclares the trait's method at the same parameter types, so it refuses a narrower return type; a getter so redeclared reads the plain type and compiles (F-394). That reading of a dotted method departs from P-146 and P-157, which keep the plain signatures for the Return Type Rule (row 1094). The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's. In a trait whose `comprises` clause lists types, `self` in the bodies is instead the trait met with the union of those types, and, as in a self-typed trait, the signatures keep `self` at the plain trait type and the exclusion test reads the meet (F-408). For example, `object Bad extends Integral[\ZZ32\]` is refused, since `Bad` is not a `ZZ32`. The rule accepts every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares instead (P-146). Walk has no such rule and loads what it refuses. A compiled default body that returns `self` at the self-type parameter runs, also where the parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]` (row 695, fixed). F-377 gives the cast that does it, also at a conditional's arm (`StandardTotalOrder`'s `MIN` and `MAX`) and at a closure's result (rows 1051 and 1050, fixed). A default body that calls a method on a value of the self-type parameter runs, also where the object lists the trait first (row 1052, fixed); F-385 gives how, and the generic object for which it may not hold. The rule refuses, rightly, a team declaration, `PureList`'s `List` (row 355). The compiler's prelude writes the self type instead as `comprises T` on `StandardTotalOrder` and `Equality` (`Library/CompilerAlgebra.fsi:16`, `:24`), and that spelling does not bind the one library, since Naden's last text puts the self-type idiom in bounds only, not as a first-class type (`Papers/Types/journal/justificationOfRTR.tex:626-630`), and Steele's own message on `655e65d53` gives the self type as the trait met with the `comprises` clause, which this rule reads from the F-bound. Gated by `compiler_tests/SelfType*` and `XXXSelfType*`. Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4 and 7; `compile-ladder/rung-self-type-exclusion/REPORT.md` section 1.

History blocks of the range:

- Written by the gather: 2026-11-24 05:41Z · rewritten · from `explorations/compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung K's record.md, folded (cites [S6])

## F-240, changed

- Size: at the base 2202 characters; at the landing 2201 characters; now 2201 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 70 s and its distance stage 130 s at the last landed gate, climb batch 35b's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 85 s), over fourteen components, ran at a start load of 0.55, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 127 s (81 s) at 0.19 at climb batch 35's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-35b/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 65 s and its distance stage 117 s at the last landed gate, climb batch 36's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 75 s), over fourteen components, ran at a start load of 0.29, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 130 s (85 s) at 0.55 at climb batch 35b's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-36/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-24 06:50Z · rewritten · by climb batch 36 commit stage: count stage about 65 s from the file times of the gate's log (checker-count/javac.txt 06:42:59 to run.txt 06:44:05, 66 s); distance stage from compile-ladder/climb-batch-36/gate/distance.txt '#seconds 117 FortressLibrary 75', '#machine ... load at start 0.29', first line '14 components in one JVM'; by the file times of the gate's log the stage ran about 06:11:58 to 06:13:55, right after compileAll (06:11:41), with no library order, beside testFast's first minutes (testFast ended 06:20:46 after 8 min 35 s); compared against climb batch 35b's 130 s (85 s) at 0.55; numbers only

## F-253, changed

- Size: at the base 2288 characters; at the landing 2241 characters; now 2241 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-253 **Under walk, a call of a generic method that writes no static argument infers the method's own static arguments from the arguments' run-time types.** This holds for a dotted call, as for a call of a generic function, whether the method is alone under its name or among its receiver's overloads. Among the receiver's overloads, where one of two is a generic dotted method and exactly one of their declared domains lies inside the other, walk chooses the inner one, except for two generic dotted methods of one name, one number of parameters and static parameters of the same kinds that differ only in their bounds, of which the first met is kept (row 1125, F-405); otherwise it compares them on the instance that the call makes (F-252). A generic method that a trait declares reads its bounds, and the types to which its arguments convert, in the trait's method environment, where its instances bind and evaluate their types, as a method that an object declares does. So it takes the instance that the same method declared in an object takes: a `ZZ32` and a `ZZ64` give `Box[\ZZ64\]` with the `ZZ32` converted, and a bounded type parameter that nothing fixes takes its bound. A generic functional method that an object inherits from a trait is chosen beside the object's plain one where only it applies. Where the inference with conversion finds no instance, as for an argument outside a bound, walk falls back to unification. For a trait's method, the unification still reads the trait's member environment, which has no parent, as the team's code did. So it does not read the bound, and the call fails with 'Cannot unify ZZ32 ... with Shape ... abm=K=(ZZ32,Any)'; the same method declared in an object fails with 'Meet(ZZ32, Shape) not a singleton'. This inference lets the team's generic `distribute` over `K` run nested reductions under walk (F-248). Gated by `tests/MethodStaticArgInference.fss`, `MethodStaticArgOverloadedReceiver.fss`, `MethodStaticArgDeclaredDomain.fss`, `NestedReductionFusion.fss`, `TraitGenericMethodInference.fss` and `InheritedGenericFunctionalMethodBesidePlain.fss`. Detail: `compile-ladder/rung-walk-method-sargs/REPORT.md` sections 1 and 2; `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 4, and its `SKEPTIC.md` section 3.

Now:

- F-253 **Under walk, a call of a generic method that writes no static argument infers the method's own static arguments from the arguments' run-time types.** This holds for a dotted call, as for a call of a generic function, whether the method is alone under its name or among its receiver's overloads. Among the receiver's overloads, where one of two is a generic dotted method and exactly one of their declared domains lies inside the other, walk chooses the inner one, except for two generic dotted methods whose bounds differ only in the api of a type of one simple name, of which the object's is kept (row 1134, F-405); otherwise it compares them on the instance that the call makes (F-252). A generic method that a trait declares reads its bounds, and the types to which its arguments convert, in the trait's method environment, where its instances bind and evaluate their types, as a method that an object declares does. So it takes the instance that the same method declared in an object takes: a `ZZ32` and a `ZZ64` give `Box[\ZZ64\]` with the `ZZ32` converted, and a bounded type parameter that nothing fixes takes its bound. A generic functional method that an object inherits from a trait is chosen beside the object's plain one where only it applies. Where the inference with conversion finds no instance, as for an argument outside a bound, walk falls back to unification. For a trait's method, the unification still reads the trait's member environment, which has no parent, as the team's code did. So it does not read the bound, and the call fails with 'Cannot unify ZZ32 ... with Shape ... abm=K=(ZZ32,Any)'; the same method declared in an object fails with 'Meet(ZZ32, Shape) not a singleton'. This inference lets the team's generic `distribute` over `K` run nested reductions under walk (F-248). Gated by `tests/MethodStaticArgInference.fss`, `MethodStaticArgOverloadedReceiver.fss`, `MethodStaticArgDeclaredDomain.fss`, `NestedReductionFusion.fss`, `TraitGenericMethodInference.fss` and `InheritedGenericFunctionalMethodBesidePlain.fss`. Detail: `compile-ladder/rung-walk-method-sargs/REPORT.md` sections 1 and 2; `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 4, and its `SKEPTIC.md` section 3.

History blocks of the range:

- Written by the gather: 2026-11-24 05:38Z · rewritten · from `explorations/compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1. What changed and why" · by gather of climb batch 36: rung G's record.md, folded (cites [S1])

## F-257, changed

- Size: at the base 2036 characters; at the landing 2194 characters; now 2194 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-257 **Under walk, a pair of declarations that the load check refuses after it reads the pair on its declared domains is refused in the name of the rule that the pair breaks.** The load check reads a pair on its declared domains where its parameter-by-parameter check refuses the pair and both declarations have static parameters of their own, or one has them and the other is a plain declaration or a generic trait's functional method that declares none of its own (F-252, F-27, F-318), and where that check finds a plain declaration inside an own generic's declared domain excluding at object types alone (F-375). It reads a pair that the check orders only for the No Duplicates Rule (F-274). The messages open "fails the Return Type Rule:" and "fails the Meet Rule:", and the No Duplicates Rule's is walk's "fails because their parameter lists have the same types"; the report gives them whole. The first two contain the words "not found" because walk's reading is narrower than the rules: rows 539, 779 and 1122 hold valid pairs that walk refuses. A pair that is not read on its declared domains keeps the parameter check's message, such as "with generic type, at least one pair of parameters must have excluding types". Such a pair has a varargs parameter, or parameter lists of different lengths, or raises an error while its instances are read. Or it is of none of the kinds above, as two functional methods of generic traits, or it is the pair of instances that an explicit instantiation such as `f[\A, B\]` makes of two generic declarations of one name (`XXXGenericOverload2`). The message does not decide which pairs load. Gated by `tests/GenericReturnRuleInvariantWalk`, `GenericReturnRuleOuterParamWalk` and `GenericBesidePlainReturnRuleWalk` (Return Type), `GenericOverloadInstancesApartWalk`, `GenericBoundsNoMeetWalk` and `GenericBesidePlainNoMeetWalk` (Meet), and `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk` (No Duplicates). Detail: `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 3.

Now:

- F-257 **Under walk, a pair of declarations that the load check refuses after it reads the pair on its declared domains is refused in the name of the rule that the pair breaks.** The load check reads a pair on its declared domains where its parameter-by-parameter check refuses the pair and both declarations have static parameters of their own, or one has them and the other is a plain declaration or a generic trait's functional method that declares none of its own (F-252, F-27, F-318), and where that check finds a plain declaration inside an own generic's declared domain excluding at object types alone (F-375); it reads two generic dotted methods' symbolic instances one of whose declared domains lies inside the other's (`methodPairValid`). It reads a pair that the check orders only for the No Duplicates Rule (F-274). The messages open "fails the Return Type Rule:" and "fails the Meet Rule:", and the No Duplicates Rule's is walk's "fails because their parameter lists have the same types"; the report gives them whole. The first two contain the words "not found" because walk's reading is narrower than the rules: rows 539 and 779 hold valid pairs that walk refuses. A pair that is not read on its declared domains keeps the parameter check's message, such as "with generic type, at least one pair of parameters must have excluding types". Such a pair has a varargs parameter, or parameter lists of different lengths, or raises an error while its instances are read. Or it is of none of the kinds above, as two functional methods of generic traits, or it is the pair of instances that an explicit instantiation such as `f[\A, B\]` makes of two generic declarations of one name (`XXXGenericOverload2`). The message does not decide which pairs load. Gated by `tests/GenericReturnRuleInvariantWalk`, `GenericReturnRuleOuterParamWalk` and `GenericBesidePlainReturnRuleWalk` and `GenericPairTupleReturnWalk` (Return Type), `GenericOverloadInstancesApartWalk`, `GenericBoundsNoMeetWalk` and `GenericBesidePlainNoMeetWalk` (Meet), and `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk` (No Duplicates). Detail: `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 3.

History blocks of the range:

- Written by the gather: 2026-11-24 05:38Z · rewritten · from `explorations/compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1. What changed and why" · by gather of climb batch 36: rung G's record.md, folded (cites [S1])

## F-334, changed

- Size: at the base 940 characters; at the landing 939 characters; now 939 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-334 **The compiled checker orders a call's candidates, a coercion's candidates and a trait's ancestors by a linear extension of their partial order, read once a pair, so no call stops it at 32 candidates or more.** `scala_src/useful/PartialOrder.scala` gives `minimal` and `linear`, used at `Functionals.scala:942`, `:952-957`, `:1036-1056`, `CoercionOracle.scala:352-371` and `Formula.scala:610`; a tie among the most specific keeps the first minimal candidate in the call's order of overloadings, which follows the build as well as the program (row 935). On the one library the checker's results are those of the sort it replaced, and the distance checks `value object Char` to its end (`#crash none`). Tests: `compiler_tests/PartialOrderCandidatesCompiled`, `compiler_tests/TieAmongMostSpecificCompiled`, `PartialOrderJUTest`, the distance stage. Detail: `compile-ladder/rung-checker-partial-order/REPORT.md`, sections 1, 2, 6 and 8.

Now:

- F-334 **The compiled checker orders a call's candidates, a coercion's candidates and a trait's ancestors by a linear extension of their partial order, read once a pair, so no call stops it at 32 candidates or more.** `scala_src/useful/PartialOrder.scala` gives `minimal` and `linear`, used at `Functionals.scala:972`, `:1101-1121`, `CoercionOracle.scala:363-382` and `Formula.scala:610`; a call's candidates come in the order of their declarations' places, and a tie among the most specific is decided by the declared signatures, or refused, as F-408 gives. On the one library the checker's results are those of the sort it replaced, and the distance checks `value object Char` to its end (`#crash none`). Tests: `compiler_tests/PartialOrderCandidatesCompiled`, `compiler_tests/TieAmongMostSpecificCompiled`, `PartialOrderJUTest`, the distance stage. Detail: `compile-ladder/rung-checker-partial-order/REPORT.md`, sections 1, 2, 6 and 8.

History blocks of the range:

- Written by the merged-diff review: 2026-11-24 06:26Z · rewritten · from `explorations/compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why" · by climb batch 36's merged-diff review: rung K made the tie sentence false (row 935 closed); lines re-anchored past rungs K and N (cites [S6])

## F-341, changed

- Size: at the base 2559 characters; at the landing 2941 characters; now 2941 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, run with the four numbers bound as values of type `ZZ`, one result per site and type; a folded constant at a library number type converts from its exact value, outside the coercion; a numeral out of the type's range, one that rounds to an infinity at `RR32` or `RR64`, one at a type with no coercion from it, or one outside its coercion's `where` clause is refused there when it runs; a store keeps its default alone. Dispatch fits it at its default, unless its own coercion reaches a declaration strictly below, which then runs (F-366), else by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10 and `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `h = 0.5` is `true` for `h: QQ = 1/2`, by `QQ`'s `=`, which the numeral reaches by its own coercion, not the library's `=` over `Any` (F-366; `tests/NumeralEqualsNumberWalk`). At load walk refuses a numeral type written as a type that a trait or an object extends, as a type that a trait's `comprises` clause lists, or as a static argument; one written as a return type, a variable's or a field's type loads, and is refused only where a numeral meets it (row 1124). Tests: `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`, `NumeralRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityAtParameterWalk.fss`, `NumeralFoldedRoundsToInfinityWalk.fss`, `NumeralTypeExtendedWalk.fss`, `NumeralTypeStaticArgumentWalk.fss`, `NumeralTypeComprisedWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "Row 981: a numeral type in a comprises clause (fork L3)".

Now:

- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, run with the four numbers bound as numbers that convert where they stand, a `ZZ` where nothing fixes a type (F-407), one result per site and type; a folded constant at a library number type converts from its exact value, outside the coercion; a numeral out of the type's range, one that rounds to an infinity at `RR32` or `RR64`, one at a type with no coercion from it, or one outside its coercion's `where` clause is refused there when it runs; a store keeps its default alone. Dispatch fits it at its default, unless its own coercion reaches a declaration strictly below, which then runs (F-366), else by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10 and `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `h = 0.5` is `true` for `h: QQ = 1/2`, by `QQ`'s `=`, which the numeral reaches by its own coercion, not the library's `=` over `Any` (F-366; `tests/NumeralEqualsNumberWalk`). At load walk refuses a numeral type written as a type that a trait or an object extends, as a type that a trait's `comprises` clause lists, or as a static argument, or in a return type, a variable's or a field's type, an object's value parameters among the fields; one written as a static parameter's bound or a `typecase` arm's type loads (row 1135). Tests: `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`, `NumeralRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityAtParameterWalk.fss`, `NumeralFoldedRoundsToInfinityWalk.fss`, `NumeralTypeExtendedWalk.fss`, `NumeralTypeStaticArgumentWalk.fss`, `NumeralTypeComprisedWalk.fss`, `NumeralTypeReturnTypeWalk.fss`, `NumeralTypeVariableTypeWalk.fss`, `NumeralTypeFieldTypeWalk.fss`, `NumeralTypeObjectParameterWalk.fss`, `NumeralTypeNoValueWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "Row 981: a numeral type in a comprises clause (fork L3)"; `compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-24 05:35Z · rewritten · from `explorations/compile-ladder/rung-numeral-coercion-body/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung N's record.md, folded (cites [S9])
- Written by the gather: 2026-11-24 05:38Z · rewritten · from `explorations/compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1. What changed and why" · by gather of climb batch 36: rung G's record.md, folded (cites [S1])

Report sections that the entry cites: [S10] `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; [S11] `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why"; [S12] `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why"; [S13] `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "Row 981: a numeral type in a comprises clause (fork L3)"; [S1] `compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1. What changed and why".

## F-342, changed

- Size: at the base 1876 characters; at the landing 1928 characters; now 1928 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-342 **The compiled checker converts a numeral where nothing fixes a type into its default, refuses one out of range, and refuses a numeral type written other than as a parameter's type.** Where no place's type has a coercion from the numeral's type (an untyped binding, `Any`, `Object`, `Number`, an unbounded type parameter, a receiver, a join, a result with no declared return type), a numeral becomes a `ZZ32`, or a `ZZ64` or `ZZ` by its value, or an `RR64` with a radix point. A type parameter that numerals alone fix takes the narrowest default holding them all, and the conversion into the default ranks as no coercion. A numeral outside a bounded number type's range, or rounding to an infinity, is a static error, also as a tuple's element at a tuple type and in a result position of an `if`, a `case`, a `do` block or a `try`; a program's type with no coercion from the numeral's type refuses a numeral. `NaturalNumeral` and `RadixPointNumeral` are written in a program only as a parameter's type, never as a type that an object or a trait extends. A `nat` or `int` parameter read as a value is a `ZZ32`, but a `ZZ` where it is one of a numeral coercion's four numbers (`scala_src/typechecker/staticenv/KindEnv.scala`, `getType`). It builds P-173's checker, P-174's written-only rule and P-40's size value, but not P-174's four numbers, which P-174 converts where they stand (no row); a `typecase`'s selector keeps its own numeral type (row 963). Tests: `compiler_tests/LiteralDefaultCompiled`, `LiteralDefaultResultCompiled`, `XXXLiteralTypeUnwritable.test`, `XXXNumeralBeyondZZ32Range.test`, `XXXNumeralBeyondRangeInTuple.test`, `XXXNumeralJoinBeyondRange.test`, `XXXNumeralTypeExtendedRefused.test`, `NatValueZZ32Compiled`, `NumeralStaticDesignCompiled` (a `v` beyond `ZZ64`). Detail: `compile-ladder/rung-numeral-checker/REPORT.md`, "1. What changed and why".

Now:

- F-342 **The compiled checker converts a numeral where nothing fixes a type into its default, refuses one out of range, and refuses a numeral type written other than as a parameter's type.** Where no place's type has a coercion from the numeral's type (an untyped binding, `Any`, `Object`, `Number`, an unbounded type parameter, a receiver, a join, a result with no declared return type), a numeral becomes a `ZZ32`, or a `ZZ64` or `ZZ` by its value, or an `RR64` with a radix point. A type parameter that numerals alone fix takes the narrowest default holding them all, and the conversion into the default ranks as no coercion. A numeral outside a bounded number type's range, or rounding to an infinity, is a static error, also as a tuple's element at a tuple type and in a result position of an `if`, a `case`, a `do` block or a `try`; a program's type with no coercion from the numeral's type refuses a numeral. `NaturalNumeral` and `RadixPointNumeral` are written in a program only as a parameter's type, never as a type that an object or a trait extends. A `nat` or `int` parameter read as a value is a `ZZ32`; one of a numeral coercion's four numbers is a `ZZ` where nothing fixes a type and converts where a place fixes a bounded number type (`scala_src/typechecker/staticenv/KindEnv.scala`, `getType`; `CoercionOracle.buildCoercion`; F-407). It builds P-173's checker, P-174's written-only rule, P-174's four numbers and P-40's size value; a `typecase`'s selector keeps its own numeral type (row 963). Tests: `compiler_tests/LiteralDefaultCompiled`, `LiteralDefaultResultCompiled`, `XXXLiteralTypeUnwritable.test`, `XXXNumeralBeyondZZ32Range.test`, `XXXNumeralBeyondRangeInTuple.test`, `XXXNumeralJoinBeyondRange.test`, `XXXNumeralTypeExtendedRefused.test`, `NatValueZZ32Compiled`, `NumeralStaticDesignCompiled` (a `v` beyond `ZZ64`). Detail: `compile-ladder/rung-numeral-checker/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-24 05:35Z · rewritten · from `explorations/compile-ladder/rung-numeral-coercion-body/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung N's record.md, folded (cites [S9])

Report sections that the entry cites: [S14] `compile-ladder/rung-numeral-checker/REPORT.md`, "1. What changed and why".

## F-345, changed

- Size: at the base 1646 characters; at the landing 1626 characters; now 1626 characters, over 600.
- Section now: "The specification and the repository's lineage".

At the base:

- F-345 **The specification states, in the revision form, the static numerals (P-174, P-176) and P-171's string literals.** The literals chapter gives a numeral a numeral type that exists only at compile time, `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[\n, m, r, v\]` below a `Numeral` without static parameters, the four numbers its static arguments, naturals of any size, and every number type's coercion generic over the four numbers, read as `ZZ` and folded, one value per place; P-174 instead converts each of the four where it stands (no row). It also gives the conversion where a place fixes a type and the default elsewhere; a program's type receiving a numeral as written, its minus on the coercion's result, any other static expression through its coercion from the default's type; a `where` clause over the four numbers refusing statically; and the numeral types written only as parameter types (`Specification/basic/expressions/literals.tex:98-285`). The constant chapter gives the fold, converted from its exact value at a library type (`constant.tex:80-126`). The numbers chapter gives the coercions, with no `=` pairs and no `asFloat` on a numeral type (`basic-lib/numbers.tex:47-71`). The binary chapter's numeral declarations are expressible now and left out. Appendix I gives `revival-numerals` and `revival-string-literals` (`Specification/appendices/changes.tex`), whose Effects name each departure of the two implementations with its row. Test: the specification's build (`ant genSource`, `ant tex`), 0 warnings by the skill's grep. Detail: `compile-ladder/rung-static-numerals-spec/REPORT.md`, "What changed and why".

Now:

- F-345 **The specification states, in the revision form, the static numerals (P-174, P-176) and P-171's string literals.** The literals chapter gives a numeral a numeral type that exists only at compile time, `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[\n, m, r, v\]` below a `Numeral` without static parameters, the four numbers its static arguments, naturals of any size, and every number type's coercion generic over the four numbers, each converted where it stands, and folded, one value per place. It also gives the conversion where a place fixes a type and the default elsewhere; a program's type receiving a numeral as written, its minus on the coercion's result, any other static expression through its coercion from the default's type; a `where` clause over the four numbers refusing statically; and the numeral types written only as parameter types (`Specification/basic/expressions/literals.tex:98-302`). The constant chapter gives the fold, converted from its exact value at a library type (`constant.tex:80-126`). The numbers chapter gives the coercions, with no `=` pairs and no `asFloat` on a numeral type (`basic-lib/numbers.tex:47-71`). The binary chapter's numeral declarations are expressible now and left out. Appendix I gives `revival-numerals`, `revival-numeral-numbers` and `revival-string-literals` (`Specification/appendices/changes.tex`), whose Effects name each departure of the two implementations with its row. Test: the specification's build (`ant genSource`, `ant tex`), 0 warnings by the skill's grep. Detail: `compile-ladder/rung-static-numerals-spec/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-24 05:35Z · rewritten · from `explorations/compile-ladder/rung-numeral-coercion-body/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung N's record.md, folded (cites [S9])

Report sections that the entry cites: [S15] `compile-ladder/rung-static-numerals-spec/REPORT.md`, "What changed and why".

## F-347, changed

- Size: at the base 1558 characters; at the landing 1796 characters; now 1796 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-347 **Every numeral's place on the compiled path whose type names no type parameter is one value made before the program runs: a JVM constant where the fold of its type's own numeral coercion ends in an `int`, `long`, `float` or `double`, else a static final filled once by the coercion's method of the four numbers as `ZZ` values.** The code generator folds the body of the place's type's coercion, the library's or a program's, over a fragment of constants, bound names, natives over the built-in types' representations and calls of functions and methods in the fragment (`compiler/codegen/NumeralCoercionFold.java`); the method, `coerce_T№natural` or `coerce_T№point`, is compiled once in the declaring component and called from any component, and a program type's minus on a negative constant runs once with it (`compiler/codegen/CodeGen.java`). A place whose type names a type parameter calls the method at each evaluation (row 957). A coercion whose body puts two calls of the program's own functions in one operator or one argument list, as `small(n) - small(m)` does, spawns a task, which runs in place inside the root task that initializes the component's class (F-348). Under walk a folded constant at a library type converts from its exact value. Tests: `compiler/desugarer/NumeralCoercionFoldJUTest`, `library_tests/NumeralFoldIntegers`, `NumeralFoldFloats`, `compiler_tests/NumeralAcrossComponent`, `NumeralMinusOnceCompiled`, `NumeralCoercionOnceCompiled`. Detail: `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

Now:

- F-347 **Every numeral's place on the compiled path whose type names no type parameter is one value made before the program runs: a JVM constant where the fold of its type's own numeral coercion ends in an `int`, `long`, `float` or `double`, else a static final filled once by the coercion's method of the four numbers as `ZZ` values.** The code generator folds the body of the place's type's coercion, the library's or a program's, over a fragment of constants, bound names, natives over the built-in types' representations and calls of functions and methods in the fragment (`compiler/codegen/NumeralCoercionFold.java`); the method, `coerce_T№natural` or `coerce_T№point`, is compiled once in the declaring component and called from any component, and a program type's minus on a negative constant runs once with it (`compiler/codegen/CodeGen.java`). A number of the four that the checker typed at a bounded number type converts in the method from the `ZZ` that holds it (`CodeGen.convertNumber`, `compiler/runtimeValues/FZZ.java`), and in the fold into the type's representation (F-407). A place whose type names a type parameter calls the method at each evaluation (row 957). A coercion whose body puts two calls of the program's own functions in one operator or one argument list, as `small(n) - small(m)` does, spawns a task, which runs in place inside the root task that initializes the component's class (F-348). Under walk a folded constant at a library type converts from its exact value. Tests: `compiler/desugarer/NumeralCoercionFoldJUTest`, `library_tests/NumeralFoldIntegers`, `NumeralFoldFloats`, `compiler_tests/NumeralAcrossComponent`, `NumeralMinusOnceCompiled`, `NumeralCoercionOnceCompiled`. Detail: `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-24 05:35Z · rewritten · from `explorations/compile-ladder/rung-numeral-coercion-body/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung N's record.md, folded (cites [S9])

Report sections that the entry cites: [S11] `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

## F-352, changed

- Size: at the base 2442 characters; at the landing 2455 characters; now 2455 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-352 **A scratch tree with twelve marked hacks ran compiled programs against the interpreter's library and met sixteen walls; on `main` the compile command reads the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library (F-381), and a program compiled so can run (F-396).** In that tree, on `832f7d0d91`'s code, two lines of `Shell.useCompilerLibraries()` point the compiled path at the one library, and a one-line program then passes the checker and the code generator. Its run needs the library's fourteen components as bytecode, compiled by name in about 200 s. Three programs ran and printed walk's output: one that prints a line, one that builds and reads an `Array1`, and a dot product in the program's own loop over two `Array1`. Not run: an array of rank 2 or 3 (row 992, fixed since), the library's `DOT` and `SUM` (row 732, fixed since), and microGPT, which the checker stops (F-58). The runs met sixteen walls of two kinds. A test compiled against the prelude can show the first kind: the refusal of varargs (row 624), `label` (row 81), a closure class written twice (row 315), a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732; rows 81, 315, 990, 991, 732 and 992 are fixed since, and row 624 under the selection of the one library (F-390). Only a tree switched onto the one library shows the second kind: which run-time class carries each built-in type, a choice that reaches the code generator's naming (rows 874 and 995: row 874 fixed since, and row 995 now for the carried types other than those over payload classes; row 866 is fixed; the one library's seven, `Boolean`, `Char` and `FlatString` are compiled over payload classes, F-396); the trait table's search by the prelude's api names (row 942, fixed since; the search stays, and no compiled test reaches it, F-391); the dispatch method's package (row 994); `NN32`'s two getters (row 993, fixed since). Every run had the JVM's verifier off, so the number of emitted methods that the verifier refuses is not known. Measured once; the scratch tree's hacks did not land as such, and no test holds its runs. Detail: `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met", "4. How far each program got" and "6. The walls grouped, against PLAN's phase 4 and phase 5 lines"; `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

Now:

- F-352 **A scratch tree with twelve marked hacks ran compiled programs against the interpreter's library and met sixteen walls; on `main` the compile command reads the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library (F-381), and a program compiled so can run (F-396).** In that tree, on `832f7d0d91`'s code, two lines of `Shell.useCompilerLibraries()` point the compiled path at the one library, and a one-line program then passes the checker and the code generator. Its run needs the library's fourteen components as bytecode, compiled by name in about 200 s. Three programs ran and printed walk's output: one that prints a line, one that builds and reads an `Array1`, and a dot product in the program's own loop over two `Array1`. Not run: an array of rank 2 or 3 (row 992, fixed since), the library's `DOT` and `SUM` (row 732, fixed since), and microGPT, which the checker stops (F-58). The runs met sixteen walls of two kinds. A test compiled against the prelude can show the first kind: the refusal of varargs (row 624), `label` (row 81), a closure class written twice (row 315), a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732; rows 81, 315, 990, 991, 732 and 992 are fixed since, and row 624 under the selection of the one library (F-390). Only a tree switched onto the one library shows the second kind: which run-time class carries each built-in type, a choice that reaches the code generator's naming (rows 874 and 995: row 874 fixed since, and row 995 now for the carried types other than those over payload classes; row 866 is fixed; the one library's seven, `Boolean`, `Char` and `FlatString` are compiled over payload classes, F-396); the trait table's search by the prelude's api names (row 942, fixed since; the search stays, and no compiled test reaches it, F-391); the dispatch method's package (row 994, fixed since); `NN32`'s two getters (row 993, fixed since). Every run had the JVM's verifier off, so the number of emitted methods that the verifier refuses is not known. Measured once; the scratch tree's hacks did not land as such, and no test holds its runs. Detail: `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met", "4. How far each program got" and "6. The walls grouped, against PLAN's phase 4 and phase 5 lines"; `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

History blocks of the range:

- Written by the merged-diff review: 2026-11-24 06:26Z · rewritten · from `explorations/compile-ladder/rung-one-library-run-walls/REPORT.md`, "What changed and why" · by climb batch 36's merged-diff review: rung C fixed row 994 (cites [S2])

Report sections that the entry cites: [S16] `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met"; [S17] `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

## F-377, changed

- Size: at the base 2827 characters; at the landing 3197 characters; now 3197 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-377 **The compiled code casts `self` where the checker reads it as a listed type or as the self-type parameter.** `CodeGen.castToTypeBelow` casts a value that has self's type (the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait. It casts at the argument of a call with one argument (a call with several arguments casts each already), at a typed binding and an assignment, at a method's returned value, at each arm of a conditional or a `case` expression, at the conditional's type, and at a function expression's and a local function's result, also where the value is a typecase whose arms each have self's type. So `den(self)` for `den(r: R)` in `trait Q comprises { R }`, `twin(self): S = self` and `mx(self, other: T): T = if lt(other, self) then self else other end` in a self-typed trait verify and run (rows 991, 695, 1050 and 1051, fixed), as the one library's `QQ comprises { Ratio }` and `StandardTotalOrder`'s `MIN` and `MAX` need. A conditional or typecase whose arms are pairs that hold `self`, `MINMAX`'s shape, verifies and runs with no cast, since the declared tuple type is a JVM interface and the caller converts the result; a typecase whose arms are all `self` has a one-element union, which is cast. Only `self` gets the reading: the checker refuses a variable declared at the trait where a listed type is expected. A typecase with `self` in one arm and another value in the other gets no cast (row 1070), and a trait that lists a type at a `where`-clause variable gets none (row 307). An assignment from outside an object to its `var` field passes the value at the field's type, `self` at a listed type cast to it (`VarFieldAssignedSubtypeRun`; F-406). No cast is added where the value's type is a subtype of the declared type by `extends`. Two casts are added where the verifier, which checks no interface type, needs none: at a declared trait type strictly below self's trait, a planner's default; and at an arm that is `self` where the conditional stands at a trait type, as `atQ(c: Boolean): Q = if c then self else R(0, 0) end` gains `checkcast R`, a worker's choice beyond the plan. The curator has decided neither. Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `ComprisesValueAtConditionalArmRun`, `ComprisesValueFromClosureRun`, `SelfTypeReturnSelfRun`, `SelfTypeReturnSelfAtTraitRun`, `SelfTypeArmRun`, `SelfTypeFromClosureRun`, `VarFieldAssignedSubtypeRun`. Detail: `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why"; `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why"; the pairs and the all-`self` typecase: `reviews/model-comparison/probe-2026-11-18.md`, "Point 1" and "Point 2".

Now:

- F-377 **The compiled code casts `self` where the checker reads it as a listed type or as the self-type parameter.** `CodeGen.castToTypeBelow` casts a value that has self's type (the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait. It casts at the argument of a call with one argument (a call with several arguments casts each already), also where the declaration that the call chooses takes `self` at a listed type, as a call on `self` in `QQ comprises { Ratio }` that takes `Ratio`'s declaration (F-408), at a typed binding and an assignment, at a method's returned value, at each arm of a conditional or a `case` expression, at the conditional's type, and at a function expression's and a local function's result, also where the value is a typecase whose arms each have self's type. So `den(self)` for `den(r: R)` in `trait Q comprises { R }`, `twin(self): S = self` and `mx(self, other: T): T = if lt(other, self) then self else other end` in a self-typed trait verify and run (rows 991, 695, 1050 and 1051, fixed), as the one library's `QQ comprises { Ratio }` and `StandardTotalOrder`'s `MIN` and `MAX` need. A conditional or typecase whose arms are pairs that hold `self`, `MINMAX`'s shape, verifies and runs with no cast, since the declared tuple type is a JVM interface and the caller converts the result; a typecase whose arms are all `self` has a one-element union, which is cast. Only `self` gets the reading: the checker refuses a variable declared at the trait where a listed type is expected. A typecase with `self` in one arm and another value in the other gets no cast (row 1070), and a trait that lists a type at a `where`-clause variable gets none (row 307). An assignment from outside an object to its `var` field passes the value at the field's type, `self` at a listed type cast to it (`VarFieldAssignedSubtypeRun`; F-406). No cast is added where the value's type is a subtype of the declared type by `extends`. Two casts are added where the verifier, which checks no interface type, needs none: at a declared trait type strictly below self's trait, a planner's default; and at an arm that is `self` where the conditional stands at a trait type, as `atQ(c: Boolean): Q = if c then self else R(0, 0) end` gains `checkcast R`, a worker's choice beyond the plan. The curator has decided neither. Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `ComprisesValueAtConditionalArmRun`, `ComprisesValueFromClosureRun`, `SelfTypeReturnSelfRun`, `SelfTypeReturnSelfAtTraitRun`, `SelfTypeArmRun`, `SelfTypeFromClosureRun`, `VarFieldAssignedSubtypeRun`, `ComprisesSelfListedTypeCompiled`, `ComprisesSelfAbstractFunctionalMethodCall`. Detail: `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why"; `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why"; the pairs and the all-`self` typecase: `reviews/model-comparison/probe-2026-11-18.md`, "Point 1" and "Point 2"; the call at a listed type's declaration: `compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-24 05:41Z · rewritten · from `explorations/compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung K's record.md, folded (cites [S6])

Report sections that the entry cites: [S18] `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why"; [S19] `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why"; [S20] `reviews/model-comparison/probe-2026-11-18.md`, "Point 1"; [S6] `compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why".

## F-390, changed

- Size: at the base 1902 characters; at the landing 1899 characters; now 1899 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-390 **The code generator passes a varargs parameter's arguments as one `ImmutableArray[\T, ZZ32\]` of the library in use; against the compiler's prelude, which declares no such type, it refuses the declaration.** The varargs part of a domain is one JVM parameter after the plain ones (`NamingCzar.varargsParamType`). The array is made at the call, or in a dispatch method's branch where another declaration of the name takes as many arguments, and is filled in order with `init`, as walk makes it (`CodeGen.evalVarargsArgs`, `emitVarargsArray`); a single argument of tuple type passes its elements. A call reaches the declaration by the specification's expansion rule (`OverloadSet.VarargsExpansion`). Under the selection of the one library (F-381) the code generator still stops on a varargs method, or a varargs function with static parameters, beside another declaration of its name with as many parameters (row 1086); a spread argument, `f(1, ys...)`, is dropped without a message on both paths (row 1085). So under the selection the library's varargs declarations that a program reaches, such as `println` and `assert`, compile. There the index of each element, made by `FZZ32.make`, agrees with the array's `init`, since the one library's `ZZ32` is `FZZ32` in every descriptor (F-388, F-396); with the JVM's verifier on, the array's class does not load, since it holds `ImmutableArray1`'s `copy` twice (row 1091), so no program that calls a varargs declaration runs yet. Tests: the five `one_library_tests/OneLibraryVarargs*.test` and `XXXOneLibraryRunVarargs.test`; the prelude's `compiler_tests/XXXVarargsCodeGeneration.test` and `XXXVarargsMethodCodeGeneration.test`. Detail: `compile-ladder/rung-varargs/REPORT.md`, "The convention as built"; `compile-ladder/rung-first-run-one-library/REPORT.md`, "The run tests (a point to report)"; `reviews/batch-33b-review.md`, section 2, G.worker.1.

Now:

- F-390 **The code generator passes a varargs parameter's arguments as one `ImmutableArray[\T, ZZ32\]` of the library in use; against the compiler's prelude, which declares no such type, it refuses the declaration.** The varargs part of a domain is one JVM parameter after the plain ones (`NamingCzar.varargsParamType`). The array is made at the call, or in a dispatch method's branch where another declaration of the name takes as many arguments, and is filled in order with `init`, as walk makes it (`CodeGen.evalVarargsArgs`, `emitVarargsArray`); a single argument of tuple type passes its elements. A call reaches the declaration by the specification's expansion rule (`OverloadSet.VarargsExpansion`). Under the selection of the one library (F-381) the code generator still stops on a varargs method, or a varargs function with static parameters, beside another declaration of its name with as many parameters (row 1086); a spread argument, `f(1, ys...)`, is dropped without a message on both paths (row 1085). So under the selection the library's varargs declarations that a program reaches, such as `println` and `assert`, compile. There the index of each element, made by `FZZ32.make`, agrees with the array's `init`, since the one library's `ZZ32` is `FZZ32` in every descriptor (F-388, F-396); with the JVM's verifier on, a program that calls a varargs declaration runs, each class holding a method once (F-409), except where it prints a number by `println` (row 1098). Tests: the six `one_library_tests/OneLibraryVarargs*.test` and `XXXOneLibraryRunVarargs.test`; the prelude's `compiler_tests/XXXVarargsCodeGeneration.test` and `XXXVarargsMethodCodeGeneration.test`. Detail: `compile-ladder/rung-varargs/REPORT.md`, "The convention as built"; `compile-ladder/rung-first-run-one-library/REPORT.md`, "The run tests (a point to report)"; `reviews/batch-33b-review.md`, section 2, G.worker.1.

History blocks of the range:

- Written by the merged-diff review: 2026-11-24 06:26Z · rewritten · from `explorations/compile-ladder/rung-one-library-run-walls/REPORT.md`, "What changed and why" · by climb batch 36's merged-diff review: rung C made the sentence on row 1091 false (row 1091 closed) (cites [S2])

Report sections that the entry cites: [S21] `compile-ladder/rung-varargs/REPORT.md`, "The convention as built"; [S22] `compile-ladder/rung-first-run-one-library/REPORT.md`, "The run tests (a point to report)".

## F-396, changed

- Size: at the base 2163 characters; at the landing 2540 characters; now 2540 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-396 **The one library compiles to jars over a second set of run-time classes, and a program compiled against them can run on the compiled path, as one that prints a line does.** Under `FORTRESS_LIBRARY=one` the onelibrary track compiles the one library's fourteen components first, in one `.test` (`OneLibraryJUTest.java:44`), and a program compiled against them runs with the JVM's verifier on, as `Hello` does. The run time's classes that name a library's types come in two sets under one set of names: `ProjectFortress/build` for the prelude, and `ProjectFortress/build-one`, built from `ProjectFortress/src-one` by `ant compileAll`, for the one library, which the class path puts first under the selection. The one library's seven number types, `Boolean`, `Char` and `FlatString` are objects whose classes the code generator writes over payload classes (`NamingCzar.java:637-655`), all value objects but `FlatString`, a reference object (`Library/FlatString.fss:32`), and a helper's raise names its exception by its simple name, which each set's `LibraryNames` maps to its library's class. Against the one library the compiled path still departs from walk, each at a row: a varargs call (row 1091); a reduction over a range (row 1099); `println` of a number or a boolean, which the export check's rule decides as much as the code generator (row 1098); `=` of two strings or two booleans, and `<` of two strings (row 994); `u.asString` in a generic body at `U extends ZZ32` (row 1101); the report of an uncaught exception (row 1102); a caught exception that a helper raises, which is not its object (row 1103). The track compiles the fourteen first since its programs use them. The checker's choice at a tie among the most specific declarations follows the JVM's identity-hash order (row 935), but a tie that self's type makes in a trait whose `comprises` clause lists types keeps the trait's own declaration in any order (row 1100). Tests: `one_library_tests/OneLibraryComponents.test`, `OneLibraryRunHello.test`, `OneLibraryCatchHelperRaises.test`. Detail: `compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)".

Now:

- F-396 **The one library compiles to jars over a second set of run-time classes, and a program compiled against them can run on the compiled path, as one that prints a line, calls a varargs declaration, reduces over a range or compares two strings does.** Under `FORTRESS_LIBRARY=one` the onelibrary track compiles the one library's fourteen components first, in one `.test` (`OneLibraryJUTest.java:44`), and a program compiled against them runs with the JVM's verifier on, as `Hello` does. The run time's classes that name a library's types come in two sets under one set of names: `ProjectFortress/build` for the prelude, and `ProjectFortress/build-one`, built from `ProjectFortress/src-one` by `ant compileAll`, for the one library, which the class path puts first under the selection. The one library's seven number types, `Boolean`, `Char` and `FlatString` are objects whose classes the code generator writes over payload classes (`NamingCzar.java:637-655`), all value objects but `FlatString`, a reference object (`Library/FlatString.fss:32`), and a helper's raise names its exception by its simple name, which each set's `LibraryNames` maps to its library's class. Against the one library the compiled path still departs from walk, each at a row: `println` of a number or a boolean, which the export check's rule decides as much as the code generator (row 1098); `u.asString` in a generic body at `U extends ZZ32` (row 1101); the report of an uncaught exception (row 1102); a caught exception that a helper raises, which is not its object (row 1103); a closure in an object's generic method called through a trait's type, as a reduction over a zip of two lists or `=` of two lists (row 1137); a `Vector`'s `+` and `-`, which call an inherited generic method by name (row 643), and its `copy`, through a bridge whose target a parent's parameter of the same name rewrites (row 1138). The track compiles the fourteen first since its programs use them. The checker chooses among a call's declarations by their signatures as declared, so a call on `self` in `QQ comprises { Ratio }` takes `Ratio`'s declaration, in every JVM (F-408). Tests: `one_library_tests/OneLibraryComponents.test`, `OneLibraryRunHello.test`, `OneLibraryCatchHelperRaises.test`, `OneLibraryRunStringEquality.test`, `OneLibraryVarargsArguments.test`, `OneLibraryRangeReduction.test`, `OneLibraryArr.test`. Detail: `compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)"; `compile-ladder/rung-one-library-run-walls/REPORT.md`.

History blocks of the range:

- Written by the gather: 2026-11-24 05:43Z · rewritten · from `explorations/compile-ladder/rung-one-library-run-walls/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung C's record.md, folded; F-396's sentence on the tie, which rung C's record left for rung K's landing, made true of rung K's change (cites [S2])

Report sections that the entry cites: [S23] `compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)".

## F-403, changed

- Size: at the base 1943 characters; at the landing 1857 characters; now 1857 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-403 **The one library declares `EQV` (`≡`) and `NEQV` (`≢`) over two booleans, as top-level operators beside `<->`; walk and the compiled path under the one library run them, and on a program's own objects each is a type error.** `EQV`'s body is `if a then b else NOT b end`, which calls no `=` (compiled under the one library, `=` of two booleans dies at its first call, row 994), and `NEQV`'s is `NOT (a EQV b)`, the specification's definition of `≢` (`Specification/basic-lib/Fortress.NegatedOperators.tex`). The specification and the compiler's prelude write both as methods of `Boolean`; the one library keeps its own form, top-level operators, for the boolean operators, within P-37; that form is a default of the batch's plan, which the curator has not decided. Under walk `a ≡ b` for two objects of a program's type stops at the call, 'Unification error: Closure/Constructor for EQV param 1 (a:Boolean) got arg Pt of type Pt', and compiled it is refused, 'Could not check call to operator EQV'. Under walk, a program that imports the APL experiments' `AplCore` gets its infix `≡` and prefix `≢` over `RR64` and arrays in one overload set with the library's two: its own calls give the values that they gave without the library's two, and `t ≡ f` and `t ≢ f` of two booleans print `false` and `true`. No gated program and no line of microGPT imports `AplCore`. That one overload set is also a default of the batch's plan, which the curator has not decided. Under walk an equivalence operator that nothing declares, as `APPROX`, still loads and stops at its call with an internal error (row 1118); the one library declares none of `Boolean`'s `⊕`, `⊼` and `⊽`, and no library `majority` (row 1121). Tests: `tests/BooleanEquivalenceWalk.fss`, `one_library_tests/OneLibraryBooleanEquivalence.test`. Detail: `compile-ladder/rung-boolean-equivalence/REPORT.md`, "What changed and why" and "Row 184's own program, and the other programs".

Now:

- F-403 **The one library declares `EQV` (`≡`) and `NEQV` (`≢`) over two booleans, as top-level operators beside `<->`; walk and the compiled path under the one library run them, and on a program's own objects each is a type error.** `EQV`'s body is `if a then b else NOT b end`, which calls no `=`, and `NEQV`'s is `NOT (a EQV b)`, the specification's definition of `≢` (`Specification/basic-lib/Fortress.NegatedOperators.tex`). The specification and the compiler's prelude write both as methods of `Boolean`; the one library keeps its own form, top-level operators, for the boolean operators, within P-37; that form is a default of the batch's plan, which the curator has not decided. Under walk `a ≡ b` for two objects of a program's type stops at the call, 'Unification error: Closure/Constructor for EQV param 1 (a:Boolean) got arg Pt of type Pt', and compiled it is refused, 'Could not check call to operator EQV'. Under walk, a program that imports the APL experiments' `AplCore` gets its infix `≡` and prefix `≢` over `RR64` and arrays in one overload set with the library's two: its own calls give the values that they gave without the library's two, and `t ≡ f` and `t ≢ f` of two booleans print `false` and `true`. No gated program and no line of microGPT imports `AplCore`. That one overload set is also a default of the batch's plan, which the curator has not decided. Under walk an equivalence operator that nothing declares, as `APPROX`, still loads and stops at its call with an internal error (row 1118); the one library declares none of `Boolean`'s `⊕`, `⊼` and `⊽`, and no library `majority` (row 1121). Tests: `tests/BooleanEquivalenceWalk.fss`, `one_library_tests/OneLibraryBooleanEquivalence.test`. Detail: `compile-ladder/rung-boolean-equivalence/REPORT.md`, "What changed and why" and "Row 184's own program, and the other programs".

History blocks of the range:

- Written by the merged-diff review: 2026-11-24 06:26Z · rewritten · from `explorations/compile-ladder/rung-one-library-run-walls/REPORT.md`, "What changed and why" · by climb batch 36's merged-diff review: rung C made the clause on row 994 false (row 994 closed) (cites [S2])

Report sections that the entry cites: [S24] `compile-ladder/rung-boolean-equivalence/REPORT.md`, "What changed and why".

## F-405, changed

- Size: at the base 1613 characters; at the landing 2307 characters; now 2307 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-405 **Walk runs the generic dotted methods of one name that a trait or an object declares together, each as its instance at symbolic static arguments.** An object takes each generic method of a name, alone or beside others of the name, with one symbolic instantiation for each name and kinds of static parameters, so that an object's redeclaration of a trait's generic method hides it (`interpreter/evaluator/values/Constructor.java`, `accumulateGenericMethods`, `genericKey`). A call that writes no static argument infers them and dispatches among the instances; a call that writes static arguments instantiates each generic method whose static parameters, by their number and kinds, take them, and chooses among those instances by the call's arguments, as a call of a top-level generic function does (`values/DottedMethodApplication.java`, `genericOverloadsAt`; `values/OverloadedFunction.java`, `compatible`). Of two such methods of one number of parameters whose static parameters differ only in their bounds, one is dropped (row 1125), and a call on a receiver assumed at the trait stops (row 1126). Where a plain method shares the name with a generic one, a call that writes static arguments stops (row 744); of two generic functional methods of one name and one number of parameters, the second is never chosen (row 1123). Tests: `tests/GenericMethodOverloadArity.fss`, `GenericMethodOverloadSetWalk.fss`, `GenericOverloadStaticArgKindsWalk.fss`. Detail: `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "What changed and why" and "Programs run old against new"; `SKEPTIC.md` beside it.

Now:

- F-405 **Walk runs the generic dotted methods of one name that a trait or an object declares together, each as its instance at symbolic static arguments.** An object takes each generic method of a name, alone or beside others of the name, with one symbolic instantiation for each name and, per static parameter, kind and bounds, the bounds written with the method's own static parameters renamed by position and names without their apis (`interpreter/evaluator/values/Constructor.java`, `genericKey`): so an object's redeclaration of a trait's generic method at the same bounds under other names hides it, as `Indexed`'s `map[\R\]` hides `Generator`'s `map[\G\]`, and two that differ in their bounds are overloads, except bounds that differ only in the api of a type of one simple name, read as a redeclaration (row 1134). At load walk reads two such instances on their declared domains where one lies inside the other (`values/OverloadedFunction.java`, `methodPairValid`); a set of them whose overlap only a third covers is refused (row 1133), and so is, at an extending object's first instance, a nested pair of a generic trait's generic functional methods (row 780). A call that writes no static argument infers them and dispatches among the instances, the inner declared domain first; a call that writes static arguments instantiates each generic method whose static parameters, by their number and kinds, take them, and chooses among those instances by the call's arguments, as a call of a top-level generic function does (`values/DottedMethodApplication.java`, `genericOverloadsAt`; `values/OverloadedFunction.java`, `compatible`). A call on a receiver assumed at the trait stops (row 1126). Where a plain method shares the name with a generic one, a call that writes static arguments stops (row 744); of two generic functional methods of one name and one number of parameters, the second is never chosen (row 1123). Tests: `tests/GenericMethodOverloadArity.fss`, `GenericMethodOverloadSetWalk.fss`, `GenericOverloadStaticArgKindsWalk.fss`, `GenericMethodBoundsDifferWalk.fss`. Detail: `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "What changed and why" and "Programs run old against new"; `compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-24 05:38Z · rewritten · from `explorations/compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1. What changed and why" · by gather of climb batch 36: rung G's record.md, folded (cites [S1])

Report sections that the entry cites: [S25] `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "What changed and why"; [S1] `compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1. What changed and why".

## F-406, changed

- Size: at the base 1795 characters; at the landing 1842 characters; now 1842 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-406 **A compiled setter's call passes its value at the field's type, and a compiled call of several declarations names an overload method that the class holds.** The code generator passes the value of `c.t := v`, which the desugarer makes a call with no arrow (the checker's type for a call), at the setter's parameter type at the receiver's instance (`CodeGen.setterParamType`), also on a receiver typed by a type variable whose bounds hold the setter, cast below self's trait where it has self's type (F-377). It writes the overload method that a call names where the checker leaves it several declarations, its set split with its principal member (`CodeGen.for_RewriteFnOverloadDecl`), and, where the call's arrow is not the principal member's, a method at the call's signature that passes its arguments on (`CodeGen.forwardToPrincipal`). The written method is a default of the batch's plan, and the forwarder a worker's choice beyond the plan; the other way was to make each call through the trait. The curator has decided neither. So `c.t := High`, `s.r := self` at a type that a `comprises` clause lists, `num(R)` beside a trait's `num(self)`, a call on `self` in such a trait, and a call that one declaration takes without coercion and another by a coercion run compiled; the one library's `FortressLibrary` holds the overload methods `numerator{...}` and `denominator{...}`. The checker still refuses a comprised object's functional method at a narrower return type (row 1127). Tests: `compiler_tests/VarFieldAssignedSubtypeRun`, `FunctionalMethodComprisedObject`, `ComprisesSelfAbstractFunctionalMethodCall`, `CoercionAnyOverloadRungC`. Detail: `compile-ladder/rung-compiled-missing-methods/REPORT.md`, "1. What changed and why" and "5. Programs run on the old code and on the new".

Now:

- F-406 **A compiled setter's call passes its value at the field's type, and a compiled call of several declarations names an overload method that the class holds.** The code generator passes the value of `c.t := v`, which the desugarer makes a call with no arrow (the checker's type for a call), at the setter's parameter type at the receiver's instance (`CodeGen.setterParamType`), also on a receiver typed by a type variable whose bounds hold the setter, cast below self's trait where it has self's type (F-377). It writes the overload method that a call names where the checker leaves it several declarations, its set split with its principal member (`CodeGen.for_RewriteFnOverloadDecl`), and, where the call's arrow is not the principal member's, a method at the call's signature that passes its arguments on (`CodeGen.forwardToPrincipal`). The written method is a default of the batch's plan, and the forwarder a worker's choice beyond the plan; the other way was to make each call through the trait. The curator has decided neither. So `c.t := High`, `s.r := self` at a type that a `comprises` clause lists, `num(R)` beside a trait's `num(self)`, a call on `self` in such a trait, and a call that one declaration takes without coercion and another by a coercion run compiled; the one library's `FortressLibrary` holds the overload methods `numerator{...}` and `denominator{...}`. A comprised object's functional method at a narrower return type than its trait's type checks, since the signatures read `self` at the trait (F-408). Tests: `compiler_tests/VarFieldAssignedSubtypeRun`, `FunctionalMethodComprisedObject`, `ComprisesSelfAbstractFunctionalMethodCall`, `CoercionAnyOverloadRungC`. Detail: `compile-ladder/rung-compiled-missing-methods/REPORT.md`, "1. What changed and why" and "5. Programs run on the old code and on the new".

History blocks of the range:

- Written by the merged-diff review: 2026-11-24 06:26Z · rewritten · from `explorations/compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why" · by climb batch 36's merged-diff review: rung K made the sentence on row 1127 false (row 1127 closed) (cites [S6])

Report sections that the entry cites: [S26] `compile-ladder/rung-compiled-missing-methods/REPORT.md`, "1. What changed and why".

## F-407, added

- Size: at the base none; at the landing 1459 characters; now 1459 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-407 **A numeral coercion's four numbers convert where they stand, on both paths, a `ZZ` where nothing fixes a type.** Walk binds each as a static number whose default is a `ZZ` (`interpreter/evaluator/values/Numerals.java`, `number`, `convert`), which converts where its place fixes a type as a folded constant does and is refused there when the place runs; the checker types it `ZZ`, keeps it so at a call that a declaration takes so (`Functionals.typedApplication`), converts it where its place fixes a bounded number type (`CoercionOracle.buildCoercion`, `NumeralConversion.numberAt`), also in a result position of a join there (`Functionals.joinInto`), and refuses at the numeral's place a number that does not fit, for a coercion of the numeral's own component (`NumeralConversion.numberRefusals`); the code generator converts it from the `ZZ` (`CodeGen.convertNumber`, `FZZ.numberAs*`). So `ZZ32`'s coercion is `= v` and a byte type's `Byte(v)`. Departures: rows 1131 (another component's coercion, not refused statically: `IntegerOverflow` at class initialization, or an infinity bound at `RR64`) and 1132 (a number at a call on the compiled path). Tests: `tests/NumeralCoercionBodyWalk.fss`, `NumeralCoercionNumberRangeWalk.fss`, `NumeralCoercionNumberAtCallWalk.fss`, `compiler_tests/NumeralCoercionBodyCompiled`, `XXXNumeralCoercionNumberRangeCompiled.test`. Detail: `compile-ladder/rung-numeral-coercion-body/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-24 05:35Z · added · from `explorations/compile-ladder/rung-numeral-coercion-body/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung N's record.md, folded (cites [S9])

Report sections that the entry cites: [S9] `compile-ladder/rung-numeral-coercion-body/REPORT.md`, "What changed and why".

## F-408, added

- Size: at the base none; at the landing 1517 characters; now 1517 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-408 **The compiled checker chooses among a call's declarations by their signatures as declared, in the order of their places, and refuses a tie that the rules leave.** A functional method's `self` parameter has its plain trait type in its declaration's signature, in a trait whose `comprises` clause lists types as in a self-typed trait; the meet is in the bodies and the exclusion test. The candidates are in the order of their declarations' places; of a tie's candidates, a declaration met twice counts once, and the one more specific than every other on its declared arrow decides; P-60's tie keeps its intersection where no declaration more specific than a tied one that the call may run has static parameters; any other tie is 'Ambiguous call ...', save one that the overloading check judges (the unit's own declarations, or duplicates), where a tie that no rule decides among the unit's own declarations, a set that the overloading check accepts, is kept by place with no error (row 1136). The code generator casts `self` where the chosen declaration takes a listed type. It means a call's choice and type no longer follow the JVM's identity hashes, and the one library's calls on `self` in `QQ` take `Ratio`'s declarations. Tests: `compiler_tests/GenericTiesDeclaredCompiled`, `ComprisesSelfListedTypeCompiled`, `ComprisesFunctionalMethodNarrowedReturn`, `CoverageReturnGenericFamily`, `OverloadGenericObjectTwoParams`. Detail: `compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-24 05:41Z · added · from `explorations/compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung K's record.md, folded (cites [S6])

Report sections that the entry cites: [S6] `compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why".

## F-409, added

- Size: at the base none; at the landing 1189 characters; now 1189 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-409 **A class that the code generator writes holds each method once by name and descriptor: a bridge, a forwarder to an inherited body and a dispatch method among inherited declarations are written only where the class's own methods leave the name and descriptor free, and one bridge that two parents give is written once.** The class writer keeps the record and holds those methods to the class's end (`compiler/codegen/CodeGenClassWriter.java`, `startBridges`; `CodeGen.java`, `dumpMethodChaining`, `overrideBridges`, `forObjectDeclPrePass`, `forTraitDecl`). It follows `Specification/basic/traits.tex`, "Method Declarations": a declaration of the type itself replaces an inherited one at the same parameter types. The one library's 2208 classes held 25 methods twice on the base and hold none; two methods whose descriptors become equal only at a generic class's instance are not caught. Tests: `one_library_tests/OneLibraryVarargsArguments.test`, `OneLibraryRangeReduction.test`, `OneLibraryArr.test`, `OneLibraryDot.test`, `compiler_tests/TraitBridgesWrittenOnce.test`. Detail: `compile-ladder/rung-one-library-run-walls/REPORT.md`, "What changed and why"; `SKEPTIC.md` beside it.

History blocks of the range:

- Written by the gather: 2026-11-24 05:43Z · added · from `explorations/compile-ladder/rung-one-library-run-walls/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung C's record.md, folded (cites [S2])

Report sections that the entry cites: [S27] `Specification/basic/traits.tex`, "Method Declarations"; [S2] `compile-ladder/rung-one-library-run-walls/REPORT.md`, "What changed and why".

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] explorations/compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md:12-20, 4373 bytes, cut at 2500.

~~~~
## 1. What changed and why

**Row 1125 (fork G1).** An object instantiates each generic method of a name at symbolic static arguments, one instantiation per key (`Constructor.java:203-216`). The key held the name and the static parameters' kinds, so `tk[\U extends Number\](y: U)` and `tk[\U extends ZZ32\](y: U)` shared one instantiation, their instances one signature, and `putIfAbsent` kept the first met. `genericKey` (`Constructor.java:906-926`) now writes, for each static parameter, its kind and its bounds: each bound through `BoundWriter` (`:933-962`) as the classes and names of its nodes, nested, with every reference to one of the method's own static parameters written as its position, names without their apis, a bound of `Any` dropped, the bounds sorted. So `Generator`'s `map[\G\]` and `Indexed`'s `map[\R\]` still share a key, and an object's redeclaration at the same bound under another name still hides the trait's; two methods that differ in their bounds get instances of their own.

With two instances, walk's load check met a pair that its parameter-by-parameter check refuses: the first build of the key alone refused the test's `Nested` at load, 'tk[\U extends FortressLibrary.ZZ32\](y:U) ... and tk[\U extends FortressLibrary.Number\](y:U) ... have parameters with generic type, at least one pair of parameters must have excluding types' (section 2, the run after the first build). P-45 has walk judge two generic declarations by the checker's rules on their declared domains. So `validOnDeclaredDomains` (`OverloadedFunction.java:795-801`) reads a pair of two generic dotted methods' symbolic instances through the new `methodPairValid` (`:1126-1149`): the No Duplicates Rule where each declared domain lies inside the other, the Return Type Rule where one does, through `returnRuleAtEveryInstance`; a pair neither of whose domains lies inside the other is not read there and keeps the parameter-by-parameter check, as before. `methodInstanceHolding` (`:1156-1169`) finds the instance of a symbolic instance's generic method that holds a domain as `methodDeclaredBelow` does at a call (`:2864-2890`, the same inference from values that carry only types), and `symbolicStatics` (`:1176-1181`) gives `returnRuleAtEveryInstance` the static arguments of either kind of declaration. A call then chooses as rung L built it (`preferredDeclaration`, F-405): `Nested.tk(n)` for a `ZZ32` answers 3.

**Row 1122 (fork G2).** `returnRuleAtEveryInstance` (`OverloadedFunction.java:1364-
~~~~

## [S2] explorations/compile-ladder/rung-one-library-run-walls/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-one-library-run-walls/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-one-library-run-walls/REPORT.md:12-34, 5332 bytes, cut at 2500.

~~~~
## What changed and why

**Row 994.** `OverloadSet` named the owner of a generic overloaded function's instance table, and its template class, by the api's bare name at four places, `Naming.dotToSep(f.tagA.getText())`, where every other place asks `NamingCzar.javaPackageClassForApi`, which puts a default library's classes in the package `fortress`. The four now ask it (fork C1, the rehearsal's W11): `generateClosureTableOwner` (`OverloadSet.java:962`), `invokeArmAtTemplateParams` (`:1421`), and the two template names of `generateCall` (`:1784`, `:1788`). No bare api name is left in `OverloadSet.java`; `Naming.dotToSep` in `CodeGen.java:6412` names a payload class, not an api. A program's own component is not a default library's, so its names do not change.

**Rows 1091 and 1099.** The code generator could write a method twice into one class, under one name and descriptor; the JVM refuses such a class as it loads. An instrumented copy of `ManglingClassWriter` (in `tmp/`, never in the tree) that reported every second method of a name and descriptor, over a compile of the one library's `AnyType`, `FortressBuiltin`, `FortressLibrary`, `RangeInternals` and `List` on the base's code, found four shapes:

- a trait's own forwarder beside a narrowing bridge from a generic trait at its own type (`ImmutableArray1`'s `copy`, `tabulate`, `fill`; `Array1`, `Array2` and `Array3`'s `copy`; `Vector`'s and `Matrix`'s prefix `-`): first `dumpOverloadedMethodChaining:1679`, again `dumpMethodChaining:1124`;
- a trait's own forwarder beside a dispatch method among the trait's and its generic parent's declarations (`Vector`'s and `Matrix`'s `+` and `-`): first `generateTopLevelOverloads:8823` from `forTraitDecl`, again `dumpMethodChaining:1124`; the dispatch's two branches both called the interface's method of its own name and descriptor;
- one narrowing bridge for each of two parents that give the same (`FullScalarRange`'s, `FullRange2D`'s and `FullRange3D`'s `narrowToRange`; the object `SimpleSeqFilterGenerator`'s `seq`): both `dumpOverloadedMethodChaining:1679`;
- an inherited body's forwarder beside the class's own method at the same descriptor (`List`'s `=`, and its name mangled away from overloading): first `dumpMethodChaining:1160`, again `:1124`; and in three objects a bridge beside the object's own method (`TransposedArray2`'s `replica` and `t`, `TransposedMatrix`'s `t` and `scale`).

A scan of every class file in the jars for a method held twice by name and descriptor 
~~~~

## [S3] explorations/compile-ladder/rung-first-run-one-library/REPORT.md, "The stages (a point to report)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-first-run-one-library/REPORT.md#The stages (a point to report)'`

explorations/compile-ladder/rung-first-run-one-library/REPORT.md:99-108, 2374 bytes.

~~~~
## The stages (a point to report)

Both ran once on f3439cf7ce, after its build; no code changed after.

- The count, `explorations/coordinator/tools/checker-count/run.sh tmp/.../checker-count-postedit.txt tmp/.../cc-post`: `diff` against `explorations/compile-ladder/climb-batch-34/gate/checker-count.txt` prints nothing; '#crash none'.
- The distance, `explorations/coordinator/tools/distance/run.sh ...`: `compare.sh` against `explorations/compile-ladder/climb-batch-34/gate/distance.txt` prints 'DISTANCE SAME   0'; the tables differ only in their `#seconds` (206 against 200) and `#machine` lines; `dist-post/errors.tsv` holds no site, as `explorations/compile-ladder/gate/distance-sites.tsv` holds none: no site moved. The stage checks, and the edit's tables enter the compile's descriptors only under the selection, which the stage does not set.

The planner's measure (`plan-25/probes/codegen.sh`, as `plan-31/probes/planner/codegen-measure.sh` runs it) on a scratch worktree seeded at f3439cf7ce and built, with `FORTRESS_LIBRARY=one` exported, since the edit's rows stand only under the selection: without the planner's patch, 'refused declarations 0 | emitted (OK lines) 754 | component failures 0', 'rc=0 seconds=218'. With it: `git apply --check measure-hacks.patch` fails on `NamingCzar.java`, `FortressMethodAdapter.java` and `Naming.java`, whose hunks are this rung's pieces; with its one hunk that applies, the trait table's search (`TraitTable.scala`), the same, 0 refused, 754 emitted, 'rc=0 seconds=217'. The planner's before, with the patch on 285efad802: 0 and 754 (`plan-34/probes/measure-285efad802.txt`).

The ladder subset: the two files whose baseline first error names what the change touches, the rendering of an uncaught exception by `FException` and `FValue.asString`: `tests/XXXcaseTest.fss` and `tests/XXXtypecaseTest.fss` (`baseline-2026-09-19/ladder.tsv:158`, `:190`), neither in the gate's 85. After the edit, `XXXcaseTest` reaches the run with the baseline's first error, 'FortressException: class fortress.CompilerLibrary$MatchFailure with string Match failure'; `XXXtypecaseTest` stops at the type check, 'The typecase clause, String, is unreachable.', where the baseline ran it; the base's code refuses it alike (`old-fortress.sh ... compile XXXtypecaseTest.fss`), so the move is not this change's (row 1081's refusal, landed before).
~~~~

## [S4] explorations/compile-ladder/plan-31/PROBES.md, "3. The measure: the declarations of the fourteen components that the code generator refuses"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/PROBES.md#3. The measure: the declarations of the fourteen components that the code generator refuses'`

explorations/compile-ladder/plan-31/PROBES.md:38-63, 1949 bytes.

~~~~
## 3. The measure: the declarations of the fourteen components that the code generator refuses

Two runs of F-34's probe, `compile-ladder/plan-25/probes/codegen.sh`, in the planner's worktree.

On the tree unchanged, 133 s:

    refused declarations 11 | emitted (OK lines) 185 | component failures 0     kinds 6
    FortressLibrary, FortressBuiltin and FlatString are refused whole at row 874 and are not in the table

The rehearsal's way, by `probes/planner/codegen-measure.sh`, which applies `measure-hacks.patch` (the rehearsal's naming tables and converters, its trait-table search) and sets `NN32`'s two getters, builds, and runs the same probe, 159 s:

    refused declarations 24 | emitted (OK lines) 745 | component failures 0
      FortressLibrary 12, List 4, String 4, CovariantCollection 1, OneShotFlag 1, FlatString 1, Stream 1
    kinds 8
      7  Can't compile VarArgs yet  [String 3, FortressLibrary 2, List 1, FlatString 1]
      4  Can't compile Label  [FortressLibrary 3, String 1]
      4  <X> is not in the kind env  [List 2, FortressLibrary 1, CovariantCollection 1]
      4  Error trying to close method scope  [FortressLibrary 4]
      2  java.util.zip.ZipException: duplicate entry: <closure class>  [FortressLibrary 1, List 1]
      1  ClassCastException: IntersectionType to NamedType  [FortressLibrary 1]
      1  OptionUnwrapException at edu.rice.cs.plt.tuple.Null.unwrap:58  [Stream 1]
      1  Can't compile AtomicExpr  [OneShotFlag 1]

It is the rehearsal's 24 in 8 kinds. The rehearsal emitted 749: its scratch library held six more declarations, the carrier objects of its hack 4, which this measure does not apply. The script edits and builds the worktree that it is given, so it takes a scratch worktree.

The count sees a declaration at its first wall. It does not see row 990's methods (244 in 27 classes by the rehearsal), row 991's casts or rows 992 and 732: those classes are emitted and fail when they load.
~~~~

## [S5] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

`facts-extract.sh 'doc:.claude/skills/coordinator/references/batch.md#The checker count and the distance'`

.claude/skills/coordinator/references/batch.md:58-65, 711 bytes.

~~~~
## The checker count and the distance

Until the switch-over lands, the gate of every batch reports the checker count and the distance. Neither turns the gate red.

- If a rung's test is the checker count or the distance, it takes the last landed gate's tables as its starting values.
- If every file that a rung changes lies outside what the two measures read, the rung runs neither and lists those files (`STAGE_BLIND`). Its skeptic checks the list against the branch's diff.
- The review after the batch ties every new or risen row of the count's table to a named rung edit.
- The post-batch review lists each line of the team's tests that a rung rewrote to keep its checked value, with its before and after.
~~~~

## [S6] explorations/compile-ladder/rung-checker-most-specific/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-checker-most-specific/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-checker-most-specific/REPORT.md:14-28, 4481 bytes, cut at 2500.

~~~~
## What changed and why

1. **The signature (fork K1).** `FunctionalMethod.parameters()` (`FunctionalMethod.java:153-168`) reads a functional method's `self` parameter at its plain trait type wherever its declared type is a `TraitSelfType` that lists types: a trait whose `comprises` clause lists types, the prelude's `comprises T` spelling, and the self type from the F-bound as before. It copies the parameter list only where it changes a parameter. The bodies keep the meet: they are checked from the declaration's own AST (`ast()`), and the overloading check's exclusion test reads the own parameters through `selfTyped` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:556-577`), which now finds them different from `parameters()` in a `comprises` trait too. So `Ratio`'s `denominator(self)` is strictly more specific than `QQ`'s, and the instance comparison of the partial order decides the self ties with no special case: in the logged census below no self tie reaches the tie at all.
2. **The order (fork K4).** `candidatesOf` (`Functionals.scala:931-946`) takes each attempt's candidates in the order of their declarations' places, file then line then column. A candidate's place is its index entry's span, or, for a function's overloading, which has none, the span of the overloading's unambiguous name, which the declaration's span makes (`NodeFactory.java:468-472`). `PartialOrder` keeps the input order where neither candidate precedes, so the sort's head, the head of P-60's tie and the call the code generator writes from it are the program's in every run.
3. **The tie (forks K2, K3, K5).** In `resolved` (`Functionals.scala:1153-1206`), where `top` holds two or more:
   - one declaration met twice, by its span, counts once (`sameDeclaration`, `distinct`): `Library/List.fss:96-97`, whose candidates are `List.fss:130` or `:131` twice;
   - the one that `moreSpecificDeclared` puts strictly above every other on its declared arrow decides (`above`, `decided`). The declared arrow (`declaredOf`, `:958-976`) is the overloading's schema, with no static argument inferred; for a dotted method, its original method's arrow with the trait's static parameters lifted, since the schema leaves them free and the comparison crashed, 'T is not in the kind env', on `TraitOwnMethodBesideInheritedCompiled` in the first cut; and `self` at its trait wherever a `TraitSelfType` lists types (`atTrait`), as a dotted method's receiver has it in the index. This 
~~~~

## [S7] Specification/advanced/overloading.tex, "The Meet Rule for Functions"

`facts-extract.sh 'doc:Specification/advanced/overloading.tex#The Meet Rule for Functions'`

Specification/advanced/overloading.tex:282-415, 6175 bytes, cut at 2500.

~~~~
\paragraph{The Meet Rule for Functions:}
Suppose that $\f(\Ps)$ and $\f(\Qs)$ are two function
declarations in a single scope
such that neither $\Ps$ nor $\Qs$ is a subtype of the other and $\Ps$ and
$\Qs$ are not incompatible with one another.
Let $\mathpzc{S}$ be the set of types that $\Ps$ defines coercions from
and $\mathpzc{T}$ be the set of types that $\Qs$ defines coercions from.
$\f(\Ps)$ and $\f(\Qs)$ are a valid overloading if
there is a declaration $\f(\Ps \inter \Qs)$ in the scope.

all of the following hold:
\begin{itemize}
\item
either $\Ps \excludes \Qs$ or there is a declaration $\f(\Ps \inter
\Qs)$ in the scope,
and
\item
either $\Ps \morespecific \Qs$ or $\Qs \morespecific \Ps$ or for all
$\Ps' \in \mathpzc{S}$ and $\Qs' \in \mathpzc{T}$ one of the two
conditions holds:
\begin{itemize}
\item
$\Ps' \excludes \Qs'$, or
\item
there is a declaration $\f(\Ps' \inter \Qs')$ in the scope.
\end{itemize}
\end{itemize}

Where the Meet Rule for functions asks for a declaration $\f(\Ps \inter \Qs)$ in
the scope, it is also satisfied by declarations in the scope whose parameter
types are each a subtype of both $\Ps$ and $\Qs$ and together cover
$\Ps \inter \Qs$ (\secref{internal-types}): every value of both $\Ps$ and $\Qs$
is a value of the parameter type of one of them, for every value a program can
make, not only for the values a program does make.
Each such declaration is more specific than both $\f(\Ps)$ and $\f(\Qs)$, and
at run time it is applicable to every argument whose value its parameter type
holds.
Every pair of the covering declarations must satisfy the overloading rules in
turn, as every pair of the set must.
This case does not apply to the condition on the types from which $\Ps$ and
$\Qs$ define coercions: covering does not choose between two coercions.
\revision{revival-meet}{The Working Draft of February 2011 asked for a
declaration on the intersection itself, and the draft note above asked what the
intersection of two declarations is.
The answer is the one the team's list of proposed features records for two
traits with \KWD{comprises} clauses, ``We agreed to revise the Meet rule to
address this with the coverage check''.
It is an addition to the Meet Rule of the type group's paper of 2011, which asks
for a declaration on the meet; the paper of 2019 has no traits with
\KWD{comprises} clauses.
Where a trait with static parameters stands between two traits with
\KWD{comprises} clauses and their listed types, the intersection of the two
~~~~

## [S8] explorations/compile-ladder/rung-checker-most-specific/REPORT.md, "Sentences of the specification"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-checker-most-specific/REPORT.md#Sentences of the specification'`

explorations/compile-ladder/rung-checker-most-specific/REPORT.md:172-180, 2298 bytes.

~~~~
## Sentences of the specification

Made false by the change, before and after:

- `Specification/appendices/changes.tex:3750-3753` (`revival-meet`, Effect), edited: before, "The compiled type checker departs from this in three ways: it types such a call by the intersection only in a family none of whose declarations has static parameters, and otherwise by one of its most specific declarations (row~543 of the revival's gap ledger); it refuses ... (row~546); and ... (row~547)."; after, "The compiled type checker departs from this in two ways: it refuses the case for declarations with static parameters (row~546 of the revival's gap ledger); and its verdict ... (row~547)."
- `Specification/basic/expressions/var-ref.tex:64-69`, edited: before, the type of `self` in a trait with a `comprises` clause "is instead" the intersection; after, the intersection "in the bodies of its methods", the signatures at the trait (above).
- `Specification/appendices/changes.tex:5538-5546` (the numeral entry, `revival-numerals`, Effect), not edited by the worker, for the gather, and edited by the skeptic (`0b5f234096`, SKEPTIC.md): "so for \EXP{c\COLON\mathbb{R}32 = 0} the compiled type checker refuses \EXP{c \neq 0}, and \EXP{c = 0} compiles and overflows the stack when it runs (rows~1059 and~528 of the revival's gap ledger; ..., and the expected failure \nolinkurl{XXXNumeralEqualsRR32Compiled.fss}, which asserts \VAR{true})". After the change `c = 0` is refused statically, 'Ambiguous coercion in call to operator =', since `Equality`'s `=` and `RR64`'s are unordered. That sentence stands in rung N's entry, outside its listed sentences (`changes.tex:5202-5205`, `:5255-5257`, `:5437-5439`).

The rows that the rung closes, `grep -rn '~<row>' Specification --include=*.tex` for each: `~1100`, `~935`, `~1112`, `~1127` and `~1046` print nothing; `~543` printed `Specification/appendices/changes.tex:3752` on the base, the clause taken out, and prints nothing after. For the rows rewritten: `~770` and `~499` print nothing; `~528` prints `changes.tex:5543`, the sentence above, which the change makes false; `~1094` prints `changes.tex:4465` (`revival-self-type`, Effect: the dotted check reads the self-typed trait's receiver as the meet), still true, and `:4564`, the new entry's departure, true.
~~~~

## [S9] explorations/compile-ladder/rung-numeral-coercion-body/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-coercion-body/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-numeral-coercion-body/REPORT.md:13-25, 7584 bytes, cut at 2500.

~~~~
## What changed and why

P-174: "A coercion's body is a computation at compile time, with no method invocation: a number used as a value there converts where it stands, as a numeral does (P-173), into the type that its place fixes, and is refused statically where it does not fit ... where nothing fixes a type, it is an exact integer, `ZZ`." Fork N1 builds it on both paths, fork N2 writes the coercions so.

**Walk** (`interpreter/evaluator/values/Numerals.java`). `convert` bound each of the four numbers as an `FBigNum`. It now binds each as a number (`number`, `:123`): a numeral value of kind `STATIC` whose default is a `ZZ` whatever its value (`Site(BigInteger)`, `:104`, flag `number`). Walk's numeral machinery then converts it where its place fixes a type, as it converts a folded constant: at a library number type from its exact value (`exactAt`, through `Coercions.numeralCoercionFor`'s range check, so a number outside the type's range finds no coercion and the place stops with walk's message for the place, as 'got arg 3000000000:ZZ of type ZZ'); at a program's type through that type's coercion from `ZZ`; where nothing fixes a type it is its default, a `ZZ` (`w = v` binds an `FBigNum`). A number that the body returns as it is converts at the coercion's result type (`:555`, `atReturn`), so `ZZ32`'s coercion is `= v`. The dispatch cache does not hold whether a number fits a narrower type, since its default is a `ZZ` whatever its value, so a choice that converts a number at a library type is not cached (`ownCoercionFrom`, `:434`). At a call walk sends a number, as a numeral, to the most specific declaration that takes it, by its own conversion if need be (`OverloadedFunction.belowByNumerals`, unchanged).

**The checker** (`scala_src/typechecker/`). A number is still typed `ZZ` (`staticenv/KindEnv.scala:72-75`, `getType`, comment only). The owning checker tells the coercion oracle which expressions are numbers: a reference to an exact static parameter that no variable hides (`STypeChecker.scala:184`). Where a place fixes `ZZ32`, `ZZ64`, `NN32`, `NN64`, `RR64` or `RR32` of the library, `buildCoercion` converts the number there, as the reference typed at that type (`CoercionOracle.scala:211`, `NumeralConversion.numberAt`, `:601`, `numberTarget`, `:587`), also as an element of a tuple at a tuple type (`:198`); into `QQ` it goes by `QQ`'s coercion from `ZZ`, which exists, and at a program's type by that type's coercion from `ZZ`, as a folded constant does. Such a
~~~~

## [S10] explorations/compile-ladder/rung-numeral-types/REPORT.md, "What changed and why"

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

## [S11] explorations/compile-ladder/rung-static-numerals/REPORT.md, "1. What changed and why"

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

## [S12] explorations/compile-ladder/rung-numeral-leftovers/REPORT.md, "1. What changed and why"

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

## [S13] explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md, "Row 981: a numeral type in a comprises clause (fork L3)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md#Row 981: a numeral type in a comprises clause (fork L3)'`

explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md:31-33, 544 bytes.

~~~~
### Row 981: a numeral type in a comprises clause (fork L3)

`evaluator/BuildEnvironments.java`, `checkNumeralTypesWritten` (`:1203-1237`): the visitor's new `forTraitDecl` (`:1228-1234`) refuses each type of a trait's `comprises` clause that names `NaturalNumeral` or `RadixPointNumeral`, by the same `refuseNumeralType` and so with the message of an `extends` clause, 'NaturalNumeral cannot be written in a program except as a parameter's type.' The three other forms (a variable's, a field's, a return type) stay as they are (fork L3; P-12).
~~~~

## [S14] explorations/compile-ladder/rung-numeral-checker/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-checker/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-numeral-checker/REPORT.md:13-41, 7706 bytes, cut at 2500.

~~~~
## 1. What changed and why

The commits: `7bd7c7dfc7` (the change and its tests), `fe5d146a86` (the `XXX` test of the one fork not built, row 961), `fa13e6383c` (three revival tests the suite showed broken, respelled). The code of `7bd7c7dfc7` is the final code; the later commits change tests only.

**The default (P-173, fork C1).** A numeral, an `IntLiteralExpr` or `FloatLiteralExpr` node as written or as the fold made it, where nothing fixes a type converts into its default: `ZZ32`, or `ZZ64` or `ZZ` by its value, `RR64` with a radix point. The default applies to a numeral node, never to an expression of a numeral type, so `t = x` inside `coerce(x: IntLiteral)` stays an `IntLiteral`. The sites:

- an untyped binding, top level and local, one variable or several (`scala_src/typechecker/impls/Decls.scala:252`, `:289`, `:343`, `:384`), through `defaultNumeral` (`impls/Functionals.scala:1016`): a numeral alone; each element of a tuple on its own; the branches of an `if` with `else`, a `case`, a block's last expression or a one-block `do`, when every result is a numeral, together into the narrowest default holding them all (`joinNumerals`, `joinInto`, `:1030`, `:1046`);
- a parameter or a typed place whose type holds the numeral without conversion and fixes no type, `Any`, `Object`, `Number`, where the default fits too (`defaultAtUnfixed`, `:1078`): in `checkApplicableWithoutInference` (`:490`), its `Any`-domain branch (`:512`), after the subtyping inference (`:279`), in the coercion attempt (`:410`), and at every typed binding, assignment, field and return through `STypeChecker.checkExpr` (`scala_src/typechecker/STypeChecker.scala:506`);
- a parameter or typed place whose type declares no coercion from the numeral's type but holds its default, as `Index` holds `ZZ32` (`defaultFits`, `:1093`; `STypeChecker.scala:510`, `Functionals.scala:411`, `:491`);
- a type parameter that numerals alone fix, with no expected type: before the subtyping inference (`preDefault`, `:1121`, called at `:198`), and as the coercion attempt's one choice for that parameter (`:385`), the narrowest default holding every value (`numeralDefault`, `:998`), with the attempt's ordinary choices as a fallback where the default finds no candidate (`:417-423`);
- a dotted receiver written as a numeral, where the default type has the member (`defaultReceiver`, `:1105`; called at `:1360` and `impls/Misc.scala:347`), the prototype's receiver rule, so the prelude's `(1).asNN32` keeps its numeral.


~~~~

## [S15] explorations/compile-ladder/rung-static-numerals-spec/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-static-numerals-spec/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-static-numerals-spec/REPORT.md:13-34, 13820 bytes, cut at 2500.

~~~~
## What changed and why

The decisions on record, the static numerals (P-174, P-176), with P-173's conversion, default and fold, P-40's bound for sizes, P-165's `asFloat`, P-37's exception for the prelude, and P-96's revision form, are written into the specification. The field numerals' sentences and boxes, climb batch 29's (`7daf51fe8a`), are replaced; Appendix I's `revival-numerals` is rewritten in place (fork T1), and no box names the field numerals. The Effects state the implementations as rung A leaves them (`CLIMB-BATCH-29b.md:222-256` and forks A1 to A8, `:191-206`), with rows 957's second case and 971 written as open (forks A5, A6); the gather corrects them to what lands.

Passage by passage (lines after the change; "before" at b5b0f82c13):

1. **The numeral types** (`literals.tex:98-122`; before `:98-116`). Before: "Every numeral has the type \TYP{Numeral} ... through one of the two types that \TYP{Numeral} comprises ... \Library\ declare these numbers as the getters \VAR{digits}, \VAR{fractionDigits}, \VAR{radix} and \VAR{digitValue} ... They are fields of the numeral's value, not static parameters of its type: the three numeral types have no static parameters." After: "Every numeral has a \emph{numeral type} of its own, which exists only when the program is compiled: no value of a numeral type exists when the program runs. The static arguments of a numeral type are the numeral's \emph{four numbers}: ... Each of the four is a natural number, of any size. A numeral containing only digits has the type `NaturalNumeral[\n,r,v\]`, and a numeral containing a radix point has the type `RadixPointNumeral[\n,m,r,v\]`. So `3.125` has the type `RadixPointNumeral[\4,3,10,3125\]`, `007` the type `NaturalNumeral[\3,10,7\]`, and `3000000000` the type `NaturalNumeral[\10,10,3000000000\]`." The hierarchy: `Numeral` extends `Number` with no static parameters; `NaturalNumeral` below `AnyNaturalNumeral`, `RadixPointNumeral` below `AnyRadixPointNumeral`, which exclude each other; none declares a method. Reason: P-174; PROBE `12. Decisions`, decision 1; fork A4 (`CLIMB-BATCH-29b.md:202`); the team's two notes kept (`literals.tex:123-138`). Box: `revival-numerals` at `:146`.
2. **The radix** (`literals.tex:140-145`; before `:134-138`). Before: "such a numeral has the same type as one without an indicator. So `deadc_16` is a \TYP{NaturalNumeral} whose four numbers are $5$, $0$, $16$ and $912092$." After: "such a numeral has one of the same two numeral types, with its rad
~~~~

## [S16] explorations/compile-ladder/plan-31/probes/switch-rehearsal.md, "2. The walls, in the order met"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/probes/switch-rehearsal.md#2. The walls, in the order met'`

explorations/compile-ladder/plan-31/probes/switch-rehearsal.md:22-161, 20760 bytes, cut at 2500.

~~~~
## 2. The walls, in the order met

Each wall has: what fails, its kind and count, the ledger row that holds it or "no row", the hack, and what a real repair needs.

### W1. No jar of the library exists (the run)

`fortress run Hello`:

    Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String
    Caused by: java.io.IOException: Resource not found : fortress/FortressLibrary$String.class

Nothing compiles the library's components for a program: each must be compiled by name, as the library order does for the prelude today. Not a defect; the switch-over's library order is fourteen compiles (section 4) in place of five. No row; the plan's names line does not state the new library order.

### W2. The wrappers of the helper classes (row 874)

`fortress compile LibraryBuiltin/FortressBuiltin.fss`:

    java.lang.RuntimeException: Can't generate header for method floatToString with jvm desc =Ljava/lang/String; stripped = FortressLibrary$String

Row 874 holds it, as PLAN's N5 says. It is not one table but the question of which run-time class carries each of the one library's built-in types on the compiled path. The record does not hold that design; PLAN names only `FlatString`'s carrier as unmeasured. What the hack had to decide (all of it `SWITCH HACK`):

- `NamingCzar`'s table of types that a hand-written class carries, and `Naming`'s copy of it for the run: `FortressLibrary`'s `ZZ32`, `ZZ64`, `RR64`, `NN64`, `ZZ`, `JavaBufferedReader`, `JavaBufferedWriter` to `FZZ32`, `FZZ64`, `FRR64`, `FNN64`, `FZZ`, `FJavaBufferedReader`, `FJavaBufferedWriter`; `FortressBuiltin`'s `Boolean`, `RR32`, `NN32`, `Char` to `FBoolean`, `FRR32`, `FNN32`, `FCharacter`; `FlatString`'s `FlatString` to `FJavaString`.
- The wrapper generator's converters (`FortressMethodAdapter`): a helper's Java `String` is read as the trait `String`, which no class carries (a `CatString` is a `String` too), so the wrapper takes the trait's interface and casts to `FJavaString`; a new converter. A helper's Java `Object` at `Any` had no converter either ('stripped = AnyType$Any', met at `arrayOps.get`); a second new converter.
- The array stores (met as its own failure, 'Can't generate header for method make with jvm desc =Lcom/sun/fortress/compiler/runtimeValues/FortressArrayStore; stripped = FortressLibrary$JavaArrayStore'): `FortressArrayStore` and `FortressRR64ArrayStore` are plain Java classes outside the Fortress hierarchy, so `JavaArrayStore` and `JavaRR64ArraySto
~~~~

## [S17] explorations/compile-ladder/plan-31/probes/model-closure-check.md, "4. The checker's time for one program"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/probes/model-closure-check.md#4. The checker's time for one program'`

explorations/compile-ladder/plan-31/probes/model-closure-check.md:60-68, 565 bytes.

~~~~
## 4. The checker's time for one program

In a fresh JVM, the checker through the type check, on a one-line program (`run(): () = println "hello"`):

- against the one library, cold caches: 17 s;
- against the one library, a new program on warm caches: 1.1 s;
- against the prelude, `fortress typecheck`, warm caches: 1.3 s.

One run each, at loads of 1.7 to 2.4. So once the library's apis are in the caches, a program's check costs the same under either library. Code generation, the link and the run were not timed: the one library does not emit yet (section 5).
~~~~

## [S18] explorations/compile-ladder/rung-comprises-cast/REPORT.md, "What changed and why"

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

## [S19] explorations/compile-ladder/rung-self-arm-closure/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-self-arm-closure/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-self-arm-closure/REPORT.md:11-58, 6104 bytes, cut at 2500.

~~~~
## 1. What changed and why

The checker reads `self` in a trait whose `comprises` clause lists types as also a value of the listed type (P-60), and in a trait with a self-type parameter `X` as `T ∩ X` (P-146). Rung K made the code generator cast such a `self` at a call's single argument, a typed binding, an assignment and a method's returned value. Three shapes were left, and each failed when its class loaded:

1. **A conditional's arms (row 1051).** `forIf` emitted each arm and joined them with no cast. One arm left the trait's interface on the stack and the other the listed type's or the parameter's class; the verifier merges them to `Object`, and the `areturn` at the declared type fails: 'VerifyError: Bad return type'. `castToTypeBelow` at the method's return read the conditional's type, which the checker gives as the winning arm's type (`scala_src/typechecker/impls/Misc.scala:529-583`), `R` or `T`, not self's, and emitted nothing. Now `forIf` takes the conditional's type (`CodeGen.java:4535`) and calls `castToTypeBelow` on each arm after its code (`:4558` for each `if` and `elif` clause, `:4568` for the `else`). A `case` expression is desugared into a conditional, so its clauses are cast too (a base failure, now passing; section 5).
2. **A closure's result (row 1050).** `forFnExpr` and the closure of a local function returned the body's value with no cast. Now each calls `castToTypeBelow(body, rt)` on the declared return type after the body (`CodeGen.java:3968` in `forFnExpr`, `:4127` in `localFunctionClosure`).
3. **The circular load (row 1052).** An object that lists a trait with a self-type parameter first extends, as its JVM superclass, that trait's default-method class at itself: `public final class …$Pt extends …$\=Shape?…%Pt?$DefaultTraitMethods implements …$\=Shape?…%Pt?` (javap of the test's jar). Defining `Pt` makes the JVM load that superclass, which the loader expands from its template (`InstantiatingClassloader.readAndExpandGenericThing`). In `tagOf(other: S) = other.tag` the template calls `tag` by `invokeinterface` on `S`; with `S` at `Pt`, `MethodInstantiater.visitMethodInsn` called `Class.forName("…$Pt", true, icl)` to learn whether `Pt` is an interface and so choose the opcode, while `Pt` was being defined: 'ClassCircularityError'. Now it reads that answer from the access flags of the class file that the loader would define for the name, through the loader's own resource lookup and ASM's `ClassReader.getAccess()`, and lo
~~~~

## [S20] explorations/reviews/model-comparison/probe-2026-11-18.md, "Point 1"

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

## [S21] explorations/compile-ladder/rung-varargs/REPORT.md, "The convention as built"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-varargs/REPORT.md#The convention as built'`

explorations/compile-ladder/rung-varargs/REPORT.md:22-57, 4462 bytes, cut at 2500.

~~~~
## The convention as built

- **The JVM parameters of a varargs declaration**: its plain parameters, then one parameter of the descriptor of `ImmutableArray[\T, ZZ32\]` of the library in use. From `javap -c -p` on `one_library_tests/OneLibraryVarargsCount`'s jar:

      public static fortress.FortressLibrary$ZZ32 count(fortress.FortressLibrary$\=ImmutableArray?fortress\|FortressLibrary\%ZZ32,fortress\|FortressLibrary\%ZZ32?);

  A trait's method has the same parameter in its interface, its default body and its forwarders (`OneLibraryVarargsMethod$Tagger`, `$Tagger$DefaultTraitMethods`):

      public abstract fortress.FortressLibrary$ZZ32 tag(fortress.FortressLibrary$String, fortress.FortressLibrary$\=ImmutableArray?fortress\|FortressLibrary\%ZZ32,fortress\|FortressLibrary\%ZZ32?);
      public static fortress.FortressLibrary$ZZ32 tag(OneLibraryVarargsMethod$Tagger, fortress.FortressLibrary$String, fortress.FortressLibrary$\=ImmutableArray?...);

- **Where the array is made**: at the call, where the name has no other declaration of the call's number of arguments; in the dispatch method's branch for the varargs declaration, where it has one.
- **How a call of each arity reaches the varargs declaration** (`one_library_tests/OneLibraryVarargsOverloaded`, `check(Boolean)`, `check(Boolean, String)`, `check(Any, Any, Any...)`, and the library's `assert` of the same three shapes): `check(z, z)` calls the dispatch method `check(Any;Any)`, which tests `FBoolean` and `String` and otherwise makes an empty array and calls `check(Any;Any;ImmutableArray)`; `check(z, z, "a")` and `check(z, z, "a", z)` make arrays of one and two and call `check(Any;Any;ImmutableArray)`; `check(b, "m")` calls `check(FBoolean;String)`. The library's `assert(z, z)` calls `FortressLibrary.assert(Any;Any)`, the dispatch method that `FortressLibrary` writes at two arguments; `assert(z, z, "a")` makes its array at the call. From the same `javap`:

      static check(fortress.AnyType$Any, fortress.AnyType$Any): instanceof FBoolean ... invokestatic check:(LFBoolean;Lfortress/FortressLibrary$String;) ... invokeinterface "\=Arrow??,...ImmutableArray1?fortress\|AnyType\%Any,0,0??".apply ... invokestatic check:(Lfortress/AnyType$Any;Lfortress/AnyType$Any;Lfortress/FortressLibrary$\=ImmutableArray?...;)
      251: invokestatic  #201  // Method fortress/FortressLibrary.assert:(Lfortress/AnyType$Any;Lfortress/AnyType$Any;)Lcom/sun/fortress/compiler/runtimeValues/FVoid;
      296: invokestatic  #229  // M
~~~~

## [S22] explorations/compile-ladder/rung-first-run-one-library/REPORT.md, "The run tests (a point to report)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-first-run-one-library/REPORT.md#The run tests (a point to report)'`

explorations/compile-ladder/rung-first-run-one-library/REPORT.md:81-91, 2002 bytes.

~~~~
## The run tests (a point to report)

- **Hello**, `OneLibraryRunHello.test`: new, failing on the base and passing after, with the verifier on: 'Hello, one library'.
- **The helpers' raises**, `OneLibraryCatchHelperRaises.test`: new; passes: `IntegerOverflow` from `ZZ32`'s `+` and `FileNotFoundException` from `makeJavaBufferedReader` are caught.
- **Varargs**, `XXXOneLibraryRunVarargs.test`: still an expected failure, its check now `run_out_contains=REACHED`: the class of the arguments' array does not load, 'ClassFormatError: Duplicate method name "copy" ... in class file fortress/FortressLibrary$\=ImmutableArray1?...FZZ32,0,1?$DefaultTraitMethods' (row 1091, rewritten to hold `ImmutableArray1`'s `copy`); with the verifier off it dies at row 994, `|xs|`.
- **The conditional reduction**, `XXXOneLibraryRunConditionalReduction.test`: still an expected failure after REACHED: 'ClassFormatError: Duplicate method name "narrowToRange"' in `RangeInternals$FullScalarRange$DefaultTraitMethods` (1099); with the verifier off, row 994.
- **The half**, `XXXOneLibraryRunHalf.test`: still an expected failure after REACHED: `println(q)` at a `QQ` names `FortressLibrary.println(fortress.FortressLibrary$Number)`, which the component lacks, 'NoSuchMethodError' (1098).

Each of the three was renamed without `XXX` before the edit and seen failing on the base (call 3), then, failing at these walls after the edit, given back its name (fork C6). Their programs did not change.

The varargs indices and the numerals (item 601): with the carried rows, the one library's `ZZ32` is `FZZ32` in every descriptor, so `FZZ32.make` at `CodeGen.java:8014-8015`, `:4676-4677` and `:4717-4718` agrees with the array's `init`; with the verifier off, a scratch program `first(xs: ZZ32...) = xs[0]`, `third(...) = xs[2]` printed 7 and 9 for `(7, 8, 9)` (`bin/fortress run VarargsFirst`, `FORTRESS_LIBRARY=one`, `-XX:-BytecodeVerificationRemote`); with it on, row 1091. No edit of `CodeGen.java`, so no shadow patch run.
~~~~

## [S23] explorations/compile-ladder/rung-first-run-one-library/REPORT.md, "The design as built (a point to report)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-first-run-one-library/REPORT.md#The design as built (a point to report)'`

explorations/compile-ladder/rung-first-run-one-library/REPORT.md:17-25, 4795 bytes, cut at 2500.

~~~~
## The design as built (a point to report)

- **The second set and how the class path chooses it.** `ProjectFortress/src-one` holds `FBoolean`, `FCharacter`, `FJavaString` (payload classes over `boolean`, `int`, `String`), `FJavaBufferedReader`, `FJavaBufferedWriter`, `FJavaArrayStore`, `FJavaRR64ArrayStore` (each over the one library's trait, its Java value in a field), `FValue`, `MutableFValue` and `FException` (the first set's, `asString` typed at `FValue`), `LibraryNames`, and `fortress/FortressLibrary.java`, a stub of the four traits that those classes extend. `ant compileAll` compiles it into `ProjectFortress/build-one` after the first set, and whole again when the first set changed (`build.xml:853-872`); the stamp of the implementation and the sources' fingerprint cover both folders (`build.xml:402`, the two macros), and `ant clean` deletes it. `bin/fortress_classpath:27-39` puts `build-one` before `build` where `FORTRESS_LIBRARY=one`, so the compile, the run (`bin/run_classpath` builds on it) and `junit.sh` pick it; the onelibrary track's JVM takes it by `fastTrack`'s new attribute `classesFirst` (`build.xml:1236-1251`, `:1180`, `:1310`). At a run the jars come first (`bin/run_classpath`), so the stub's classes give way to `FortressLibrary`'s.
- **The payload table's rows** (`NamingCzar.java:637-655`): the prelude's seven as before, and `FortressLibrary`'s `ZZ32`, `ZZ64`, `ZZ`, `NN64`, `RR64`, `FortressBuiltin`'s `NN32`, `RR32`, `Boolean` (payload `Z`), `Char` (`I`), and `FlatString`'s `FlatString` (`Ljava/lang/String;`). A lookup answers only a row of the library that the compile reads, FlatString counted as one of the one library's apis under the selection (`:661-675`).
- **The carried types' rows** (`NamingCzar.java:612-624`): under the selection only, since each row also enters the bare name: `FortressLibrary`'s five numbers, `JavaBufferedReader`, `JavaBufferedWriter`, `JavaArrayStore`, `JavaRR64ArrayStore`, `FortressBuiltin`'s `Char` and `FlatString`'s `FlatString` (`Boolean`, `NN32`, `RR32` are `fortLib`'s rows there). The run's copy is `runtimeSystem/Naming.java:307-322`, keyed by library. A carried parent of an `extends` clause is named by its interface (`NamingCzar.java:911`), for `FortressBuiltin`'s private objects below `JavaArrayStore` and `JavaBufferedReader`.
- **The names that the second set's LibraryNames gives** (`ProjectFortress/src-one/com/sun/fortress/compiler/runtimeValues/LibraryNames.java`): `fortress.FortressBuiltin$NN32`, `
~~~~

## [S24] explorations/compile-ladder/rung-boolean-equivalence/REPORT.md, "What changed and why"

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

## [S25] explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md, "What changed and why"

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

## [S26] explorations/compile-ladder/rung-compiled-missing-methods/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-compiled-missing-methods/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-compiled-missing-methods/REPORT.md:13-26, 3617 bytes, cut at 2500.

~~~~
## 1. What changed and why

**Row 1053.** The desugarer turns `c.t := v` into the dotted call `c.t(v)` with no arrow (`compiler/desugarer/DesugaringVisitor.java:395-418`), and `CodeGen.forMethodInvocation` then takes the argument's static type as the call's domain (the team's own note at `CodeGen.java:7498-7503`: "some method applications (particularly those introduced during getter desugaring) don't have an OverloadingType"). The object's class declares the setter at the field's type, so where the value's type is strictly below it the call names a method the class lacks. Now a call without the checker's arrow, on a trait or object type, with an argument, takes as its domain the parameter type of the receiver type's one method of that name that has no static parameters of its own, one parameter and the return type `()`, at the receiver's instance (`setterParamType`, `CodeGen.java:7728-7759`, used at `:7521-7527`). The argument then goes through `evalArg`, whose one-argument branch casts a value of self's type below its trait (`castToTypeBelow`, `:8223`), so `s.r := self` in `trait Q comprises { R }` passes `self` cast to `R`.

**Row 815, and row 390 with it.** Where the checker leaves a call several declarations, as at the tie between a trait's functional method and that of an object that the trait's `comprises` clause lists, the overload rewrite names an overload method of those declarations, `num{...}` (`compiler/OverloadRewriteVisitor.java:112-133`), and the code generator writes it in `for_RewriteFnOverloadDecl`. That method split the set with `os.split(false)`, which never sets the set's principal member (`OverloadSet.java:419-428`), and since the team's `2fb7488717` (2012-05-09) `generateAnOverloadDefinitionInner` writes nothing without one (`OverloadSet.java:2156-2157`). So no such method was written in any component, and every call that named one died. Now the set is split with its subsets, as the two other sites do (`CodeGen.java:8707`); a name is written once, since it lists the declarations (`:8691-8694`, `:8719-8721`); and where the call's arrow is not the principal member's, a method at the call's signature passes its arguments to the set's method (`forwardToPrincipal`, `:8723-8755`). The checker breaks the tie by the overloadings' order, so `num(R)` names the method at `(R)` in one compile and at `(Q)` in another: the test program's direct compile named `FunctionalMethodComprisedObject.\=num{...}(FunctionalMethodComprisedObject$R)`, a probe o
~~~~

## [S27] Specification/basic/traits.tex, "Method Declarations"

`facts-extract.sh 'doc:Specification/basic/traits.tex#Method Declarations'`

Specification/basic/traits.tex:424-693, 10851 bytes, cut at 2500.

~~~~
\section{Method Declarations}
\seclabel{methods}

\note{
hidden without settable is a static error
only within traits
not  within objects !!!
-- Sukyoung}

\note{Accessing a field by a ``naked'' identifier reference
within trait declarations are not allowed.
We require a dotted field access by a ``self.'' prefix. (08/11/08)
-- Sukyoung}

\note{Getters must always be called with the special syntax:
\EXP{\VAR{receiver}.\VAR{getterName}
}

A getter is required to have a type consistent with a corresponding setter.}

\begin{Grammar}
\emph{MdDecl} &::=& \emph{MdDef} \\
&$|$&
\option{\KWD{abstract}} \option{\emph{MdMods}} \option{\KWD{getter}}
\emph{MdHeaderFront} \emph{FnHeaderClause} \\

\emph{MdDef}  &::=& \option{\emph{MdMods}} \option{\KWD{getter}}
\emph{MdHeaderFront} \emph{FnHeaderClause}
\EXP{=} \emph{Expr} \\

\emph{AbsMdDecl} &::=&
\option{\KWD{abstract}} \option{\emph{AbsMdMods}} \option{\KWD{getter}}
\emph{MdHeaderFront} \emph{FnHeaderClause} \\

\emph{MdMods} &::=& \emph{MdMod}$^+$\\

\emph{MdMod} &::=& \emph{FnMod} $|$ \KWD{override}\\

\emph{FnMod} &::=& \emph{AbsFnMod} $|$ \KWD{private}\\

\emph{AbsFnMod} &::=& \emph{LocalFnMod} $|$
\KWD{test}\\

\emph{LocalFnMod} &::=& \KWD{atomic} $|$ \KWD{io}\\

\emph{AbsMdMods} &::=& \emph{AbsMdMod}$^+$\\

\emph{AbsMdMod} &::=& \emph{AbsFnMod} $|$ \KWD{override}\\

\emph{GetterSetterDecl} &::=& \emph{GetterSetterDef} \\
&$|$& \option{\KWD{abstract}} \option{\emph{FnMods}}
\emph{GetterSetterMod} \emph{MdHeaderFront} \emph{FnHeaderClause} \\

\emph{GetterSetterDef}  &::=& \option{\emph{FnMods}} \emph{GetterSetterMod}
\emph{MdHeaderFront} \emph{FnHeaderClause}
\EXP{=} \emph{Expr} \\

\emph{GetterSetterMod} &::=& \KWD{getter} $|$ \KWD{setter}\\

\emph{AbsGetterSetterDecl} &::=& \option{\KWD{abstract}} \option{\emph{AbsFnMods}}
 \emph{GetterSetterMod} \emph{MdHeaderFront} \emph{FnHeaderClause} \\

\emph{MdHeaderFront}  &::=& \emph{NamedMdHeaderFront}\\
&$|$& \emph{OpMdHeaderFront} \\

\emph{NamedMdHeaderFront} &::=&
\emph{Id} \option{\emph{StaticParams}} \emph{MdValParam} \\

\emph{MdValParam} &::=& \texttt( \option{\emph{MdParams}} \texttt) \\

\emph{MdParams}
&::=&
(\emph{MdParam}\EXP{,})$^*$ \options{\emph{Varargs}\EXP{,}} \emph{MdKeyword}(\EXP{,}\emph{MdKeyword})$^*$\\
&$|$&
(\emph{MdParam}\EXP{,})$^*$  \emph{Varargs}\\
&$|$& \emph{MdParam}(\EXP{,} \emph{MdParam})$^*$\\

\emph{MdKeyword} &::=& \emph{MdParam}\EXP{=}\emph{Expr} \\

\emph{MdParam} &::=& \emph{Param} \\
&$|$& \KWD{self} \\

\emph{Param} &::=& \emp
~~~~
