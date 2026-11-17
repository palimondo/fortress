<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that 647163a9c..257cae950 added, changed or removed (the batch 31b, landed at 00dd16a89, and the landing's own steps to 257cae950), written by evidence.py. -->

# The entries that the range changed

- The batch, 647163a9c..00dd16a89: 67 entries: F-24, F-34, F-35, F-44, F-53, F-63, F-74, F-75, F-79, F-85, F-87, F-122, F-173, F-174, F-175, F-225, F-229, F-240, F-252, F-257, F-258, F-262, F-268, F-276, F-279, F-285, F-286, F-291, F-296, F-299, F-302, F-303, F-305, F-306, F-307, F-308, F-310, F-311, F-312, F-313, F-314, F-315, F-323, F-327, F-328, F-330, F-332, F-344, F-349, F-351, F-352, F-354, F-356, F-360, F-361, F-366, F-367, F-369, F-372, F-373, F-374, F-375, F-376, F-377, F-378, F-379, F-380
- After the landing, 00dd16a89..257cae950: 0 entries
- Now over 600 characters: 65 of 67: F-24, F-34, F-35, F-44, F-53, F-63, F-74, F-75, F-79, F-85, F-87, F-122, F-173, F-174, F-175, F-225, F-229, F-240, F-252, F-257, F-258, F-262, F-276, F-279, F-285, F-286, F-291, F-296, F-299, F-302, F-303, F-305, F-306, F-307, F-308, F-310, F-311, F-312, F-313, F-314, F-315, F-323, F-327, F-328, F-330, F-332, F-344, F-349, F-351, F-352, F-354, F-356, F-361, F-366, F-367, F-369, F-372, F-373, F-374, F-375, F-376, F-377, F-378, F-379, F-380

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-24, changed

- Size: at the base 950 characters; at the landing 951 characters; now 951 characters, over 600.
- Section now: "Execution model".

At the base:

- F-24 **Under `walk`, a native can raise a Fortress exception that a Fortress `catch` sees.** It throws a `FortressError` that holds the exception's object, as `Int.overflow()` does for `IntegerOverflow` (F-132; row 347, fixed). A native bound to a helper of `nativeHelpers/` raises the library's own exception where the helper raises a class of the compiled prelude, such as `fortress.CompilerBuiltin$DivisionByZero`, so `DIV`, `REM` and `MOD` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raise `DivisionByZero` (F-299, F-306, F-308, F-312). Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes. Gated by the `overflows(...)` assertions of `tests/IntSemanticsRungI.fss`, and for a helper by `tests/NativeHelperRaiseWalk.fss` and, for each of the five types, `tests/<type>DivisionByZeroWalk.fss` and `tests/<type>RemainderByZeroWalk.fss`. Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` section 4.1.

Now:

- F-24 **Under `walk`, a native can raise a Fortress exception that a Fortress `catch` sees.** It throws a `FortressError` that holds the exception's object, as `ZZ32.overflow()` does for `IntegerOverflow` (F-132; row 347, fixed). A native bound to a helper of `nativeHelpers/` raises the library's own exception where the helper raises a class of the compiled prelude, such as `fortress.CompilerBuiltin$DivisionByZero`, so `DIV`, `REM` and `MOD` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raise `DivisionByZero` (F-299, F-306, F-308, F-312). Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes. Gated by the `overflows(...)` assertions of `tests/IntSemanticsRungI.fss`, and for a helper by `tests/NativeHelperRaiseWalk.fss` and, for each of the five types, `tests/<type>DivisionByZeroWalk.fss` and `tests/<type>RemainderByZeroWalk.fss`. Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` section 4.1.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: rung O made the five number types objects (F-379) and removed walk's native objects; the entry named them as they stood before

## F-34, changed

- Size: at the base 2282 characters; at the landing 2467 characters; now 2467 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-34 **Against the interpreter's library the code generator refuses 24 declarations of the fourteen components that the distance stage checks, in 8 kinds, all of them declarations that the checker passes; the count can be taken only on a patched tree.** The setting is the distance stage's (F-53): the checker's failures caught per declaration, and the bound `Any`. On the tree as it stands, the code generator stops `FortressLibrary`, `FortressBuiltin` and `FlatString` whole at the wrappers of their helper classes (row 874), and the other eleven components give 11 refused declarations in 6 kinds. So the measure's script first applies a patch in a scratch worktree: naming tables and converters for the one library's built-in types, the trait table's search over its two prelude apis (row 942), and `NN32`'s two getters at `NN32` (row 993). Then: 24 refused, 745 emitted, no component failure. By row: varargs 8, one of them a trait's (row 624); `label` 4 (row 81); a type variable missing from the kind environment 4 (rows 822 and 812); the range operators over pairs and triples 4 (row 819); a closure class written twice 2 (row 315); an intersection as a receiver 1 (row 540); `atomic` as an expression 1 (row 875). A declaration counts at its first wall, and some hold a second: behind `SubString`'s `label` stands the partial type assumption (row 818). The measure skips the dispatch methods. It sees no class that is emitted and fails when it loads: a method written twice (row 990), a missing cast at a `comprises` type (row 991), a method over a tuple index type (row 992), a body inherited through an api's trait (row 732). No emitted class of the measure is run, and no test checks the count, since the gate's distance stage runs no code generation. So after the switch-over the code generator still stands between the library and bytecode. Measured twice on the code of `832f7d0d91`, with one result. Command: `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`. Detail: `compile-ladder/plan-31/PROBES.md`, "3. The measure: the declarations of the fourteen components that the code generator refuses"; `compile-ladder/plan-31/probes/switch-rehearsal.md`, "3. The code generator over the library today, against F-34".

Now:

- F-34 **Against the interpreter's library, on the code of `832f7d0d91`, the code generator refuses 24 declarations of the fourteen components that the distance stage checks, in 8 kinds, all of them declarations that the checker passes; the count can be taken only on a patched tree.** The setting is the distance stage's (F-53): the checker's failures caught per declaration, and the bound `Any`. On that code without the patch, the code generator stops `FortressLibrary`, `FortressBuiltin` and `FlatString` whole at the wrappers of their helper classes (row 874), and the other eleven components give 11 refused declarations in 6 kinds. So the measure's script first applies a patch in a scratch worktree: naming tables and converters for the one library's built-in types, the trait table's search over its two prelude apis (row 942), and `NN32`'s two getters at `NN32` (row 993). Then: 24 refused, 745 emitted, no component failure. By row: varargs 8, one of them a trait's (row 624); `label` 4 (row 81, fixed since); a type variable missing from the kind environment 4 (rows 822 and 812); the range operators over pairs and triples 4 (row 819, fixed since); a closure class written twice 2 (row 315); an intersection as a receiver 1 (row 540); `atomic` as an expression 1 (row 875, fixed since). A declaration counts at its first wall, and some hold a second: behind `SubString`'s `label` stands the partial type assumption (row 818). The measure skips the dispatch methods. It sees no class that is emitted and fails when it loads: a method over a tuple index type (row 992, fixed since), and on that code a method written twice (row 990), a missing cast at a `comprises` type (row 991) and a body inherited through an api's trait (row 732), each fixed since. No emitted class of the measure is run, and no test checks the count, since the gate's distance stage runs no code generation. So after the switch-over the code generator still stands between the library and bytecode. Measured twice on the code of `832f7d0d91`, with one result; the count on code with rows 81 and 875 fixed is not taken. Command: `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`. Detail: `compile-ladder/plan-31/PROBES.md`, "3. The measure: the declarations of the fourteen components that the code generator refuses"; `compile-ladder/plan-31/probes/switch-rehearsal.md`, "3. The code generator over the library today, against F-34".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "3. The measure: the declarations of the one library that the code generator refuses" · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the count bound to the code it was measured on; rows 81, 875, 990, 991 and 732 named as fixed since, by climb batch 31's rungs L, A, M and K; no stage measured the count on the landed tree, so no new figure (cites [S1], [S2])
- Written by the gather: 2026-11-17 09:14Z · rewritten · from `explorations/compile-ladder/rung-tuple-parameter/REPORT.md`, "Points to report" · by climb batch 31b gather: rung T of climb batch 31b: rows 819 and 992 fixed (cites [S3])

Report sections that the entry cites: [S4] `compile-ladder/plan-31/PROBES.md`, "3. The measure: the declarations of the fourteen components that the code generator refuses"; [S5] `compile-ladder/plan-31/probes/switch-rehearsal.md`, "3. The code generator over the library today, against F-34".

## F-35, changed

- Size: at the base 1166 characters; at the landing 1166 characters; now 1166 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-35 **The `FortressLibrary` api has 9 declarations with a dead size: a size parameter that occurs in none of the api declaration's parameter types or return type.** They are the three one-dimensional `subarray` methods, with `nat o`; the two-dimensional `subarray`, with `nat o0` and `nat o1`, and the three-dimensional one, with `nat o0` to `nat o2`; and the traits `Rank`, `Indexed1`, `Indexed2` and `Indexed3`, whose `nat n` occurs in no member's type but tells `Rank[\1\]` from `Rank[\2\]`, as `Rank1 extends Rank[\1\]` does (`FortressLibrary.fsi:1365`). The component's `subarray` bodies read their offsets as values. The api declarations check clean, since a size that reaches no type, name or value is no error (P-40). The census of 2026-09-21 found 25 and missed the three-dimensional `subarray`; the 17 vector and matrix operators have lost their sizes since (P-40). Where a component declares a function without the api's dead size, the export checker reports the api's declaration as missing, since it compares static-parameter lists by length, name and kind. Detail: `perf-probes/nat/REPORT.md` sections 2 (the 25, by line) and 7 (the export checker).

Now:

- F-35 **The `FortressLibrary` api has 9 declarations with a dead size: a size parameter that occurs in none of the api declaration's parameter types or return type.** They are the three one-dimensional `subarray` methods, with `nat o`; the two-dimensional `subarray`, with `nat o0` and `nat o1`, and the three-dimensional one, with `nat o0` to `nat o2`; and the traits `Rank`, `Indexed1`, `Indexed2` and `Indexed3`, whose `nat n` occurs in no member's type but tells `Rank[\1\]` from `Rank[\2\]`, as `Rank1 extends Rank[\1\]` does (`FortressLibrary.fsi:1355`). The component's `subarray` bodies read their offsets as values. The api declarations check clean, since a size that reaches no type, name or value is no error (P-40). The census of 2026-09-21 found 25 and missed the three-dimensional `subarray`; the 17 vector and matrix operators have lost their sizes since (P-40). Where a component declares a function without the api's dead size, the export checker reports the api's declaration as missing, since it compares static-parameter lists by length, name and kind. Detail: `perf-probes/nat/REPORT.md` sections 2 (the 25, by line) and 7 (the export checker).

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

## F-44, changed

- Size: at the base 1832 characters; at the landing 1832 characters; now 1832 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-44 **The compiled checker enforces the multiple instantiation exclusion rule and relies on it, and the one library meets the rule.** The rule: no type extends two different instantiations of one generic trait. The checker's Return Type Rule relies on it: with the rule relaxed alone, a program passes the checker and dies with `IncompatibleClassChangeError` (`OverloadingOracle.scala:81-105`; the probe `ProbeMIEPick`). The team's JVM type mapping relies on it too: no closure of extends lists names one generic at two static arguments, so the class that template expansion makes for an instantiation carries the type relations over as Java ones (`Papers/Implementation/TypeMapping.tex:125`, read). F-48 gives the kinds of static argument that the rule compares. Walk applies no instantiation exclusion: it accepts a type that extends two instantiations, and its overloading check does not count them as excluding (row 416; the review's section 3). P-43 keeps the rule. Besides the flat number tower of P-43, the library meets it by three changes of `952892a00`: `TotalComparison` extends `Comparison` and `StandardMinMax[\TotalComparison\]`, no longer `StandardTotalOrder[\TotalComparison\]`; `AnyMaybe` extends `AnyUniqueItem` alone, no longer `Equality[\AnyMaybe\]` beside it; and `andCondCombine` chooses `andRelCond` by a `typecase`, in place of a second `ANDCOND`. So under walk, a program's `p1 ANDCOND p2` of two relational predicates, conditions built from a relation over a generator, which `filter` fuses, is no longer itself a relational predicate (row 458). The distance holds no exclusion error (F-53). Detail: `reviews/multiple-instantiation-exclusion.md` sections 1 to 3; `Library/FortressLibrary.fsi:123-125` (`TotalComparison`), `:1065` (`AnyMaybe`); `Library/FortressLibrary.fss:5088-5096` (`andCondCombine`).

Now:

- F-44 **The compiled checker enforces the multiple instantiation exclusion rule and relies on it, and the one library meets the rule.** The rule: no type extends two different instantiations of one generic trait. The checker's Return Type Rule relies on it: with the rule relaxed alone, a program passes the checker and dies with `IncompatibleClassChangeError` (`OverloadingOracle.scala:81-105`; the probe `ProbeMIEPick`). The team's JVM type mapping relies on it too: no closure of extends lists names one generic at two static arguments, so the class that template expansion makes for an instantiation carries the type relations over as Java ones (`Papers/Implementation/TypeMapping.tex:125`, read). F-48 gives the kinds of static argument that the rule compares. Walk applies no instantiation exclusion: it accepts a type that extends two instantiations, and its overloading check does not count them as excluding (row 416; the review's section 3). P-43 keeps the rule. Besides the flat number tower of P-43, the library meets it by three changes of `952892a00`: `TotalComparison` extends `Comparison` and `StandardMinMax[\TotalComparison\]`, no longer `StandardTotalOrder[\TotalComparison\]`; `AnyMaybe` extends `AnyUniqueItem` alone, no longer `Equality[\AnyMaybe\]` beside it; and `andCondCombine` chooses `andRelCond` by a `typecase`, in place of a second `ANDCOND`. So under walk, a program's `p1 ANDCOND p2` of two relational predicates, conditions built from a relation over a generator, which `filter` fuses, is no longer itself a relational predicate (row 458). The distance holds no exclusion error (F-53). Detail: `reviews/multiple-instantiation-exclusion.md` sections 1 to 3; `Library/FortressLibrary.fsi:123-125` (`TotalComparison`), `:1055` (`AnyMaybe`); `Library/FortressLibrary.fss:5172-5180` (`andCondCombine`).

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

## F-53, changed

- Size: at the base 1376 characters; at the landing 1377 characters; now 1377 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 31's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 31b's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-17 10:16Z · rewritten · by climb batch 31b commit stage: climb batch 31b's gate: explorations/compile-ladder/climb-batch-31b/gate/distance.txt, lines #total 0 (line 2), #crash none (line 12) and its first line's 14 components; checker-count.txt, lines #total 0 (line 16) and #crash none (line 18); the per-site list compile-ladder/gate/distance-sites.tsv holds its header alone; only the batch number in the title changes

Report sections that the entry cites: [S6] `references/batch.md`, "The checker count and the distance".

## F-63, changed

- Size: at the base 1265 characters; at the landing 1265 characters; now 1265 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-63 **The one library's api declares `String`'s `split` and `splitWithOffsets` once, abstract; redeclares no `zip` in `List`, where the inherited `ZeroIndexed.zip` serves; has `Condition.map` return `Condition[\G\]`, the component's type; and closes `QQ` by `comprises { ... }`.** `Condition` is the sequential generator trait at `Library/FortressLibrary.fsi:1018`. In their earlier forms, the pair declared twice and `List`'s `zip[\F\](other: List[\F\])`, the checker refused the api (measured). The other repairs tried, the plain pair kept once and a `zip` narrowed to `ZeroIndexed`, read the same count; the forms kept follow the specification's export rules (the report's Decisions). The `Condition.map` error was seen only under a checker change that did not land; otherwise it is read from the export check's comparison of return types, and no test gates that edit. `QQ`'s clause lists no type, since its one value type `Ratio` is private to the component, and an api may leave out a private type only by `...` (`Library/FortressLibrary.fsi:399`). No api-declared type extends `QQ`, so F-64's refusal, which falls on such a type, does not arise. Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Summary", "Decisions" and "Defects and their homes".

Now:

- F-63 **The one library's api declares `String`'s `split` and `splitWithOffsets` once, abstract; redeclares no `zip` in `List`, where the inherited `ZeroIndexed.zip` serves; has `Condition.map` return `Condition[\G\]`, the component's type; and closes `QQ` by `comprises { ... }`.** `Condition` is the sequential generator trait at `Library/FortressLibrary.fsi:1008`. In their earlier forms, the pair declared twice and `List`'s `zip[\F\](other: List[\F\])`, the checker refused the api (measured). The other repairs tried, the plain pair kept once and a `zip` narrowed to `ZeroIndexed`, read the same count; the forms kept follow the specification's export rules (the report's Decisions). The `Condition.map` error was seen only under a checker change that did not land; otherwise it is read from the export check's comparison of return types, and no test gates that edit. `QQ`'s clause lists no type, since its one value type `Ratio` is private to the component, and an api may leave out a private type only by `...` (`Library/FortressLibrary.fsi:397`). No api-declared type extends `QQ`, so F-64's refusal, which falls on such a type, does not arise. Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Summary", "Decisions" and "Defects and their homes".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

Report sections that the entry cites: [S7] `compile-ladder/rung-library-defects/REPORT.md`, "Summary".

## F-74, changed

- Size: at the base 931 characters; at the landing 808 characters; now 808 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-74 **Under walk, an integer numeral where nothing fixes a type takes its default by its value: a `ZZ32` if it fits 32 bits, a `ZZ64` if it fits 64 bits, a `ZZ` above that (P-173).** Where a place fixes a type, walk converts the numeral from its four numbers (F-79, F-341). Its run-time type is the library's value object `Int`, `Long` or `BigNum`, below `ZZ32`, `ZZ64` and `ZZ` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:126`, `:129`, `:196`). Walk reads it at its trait where it infers a static argument, so `Box(3)` is a `Box[\ZZ32\]` and `<|1, 2, 3|>` an `ArrayList[\ZZ32\]` (F-344). A size used as a value is a `ZZ32` up to 2^31-1 and a `ZZ64` above, where P-173 makes it a `ZZ32` (F-140; row 962). Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `reviews/numeral-switch-judgement.md` sections 2 and 3, a probe of an earlier design that gave every integer numeral a type of its own.

Now:

- F-74 **Under walk, an integer numeral where nothing fixes a type takes its default by its value: a `ZZ32` if it fits 32 bits, a `ZZ64` if it fits 64 bits, a `ZZ` above that (P-173).** Where a place fixes a type, walk converts the numeral from its four numbers (F-79, F-341). Its run-time type is the one library's value object `ZZ32`, `ZZ64` or `ZZ` (F-379), so where walk infers a static argument `Box(3)` is a `Box[\ZZ32\]` and `<|1, 2, 3|>` an `ArrayList[\ZZ32\]` (F-344). A size used as a value is a `ZZ32` up to 2^31-1 and a `ZZ64` above, where P-173 makes it a `ZZ32` (F-140; row 962). Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `reviews/numeral-switch-judgement.md` sections 2 and 3, a probe of an earlier design that gave every integer numeral a type of its own.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: rung O made the five number types objects (F-379) and removed walk's native objects; the entry named them as they stood before

Report sections that the entry cites: [S8] `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why".

## F-75, changed

- Size: at the base 2044 characters; at the landing 2122 characters; now 2122 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-75 **The compiled checker checks the Return Type Rule over every instance whose domain can meet, and a positional rule: when two generic declarations in the more-specific relation declare as many static parameters of their own, those parameters agree in kind by position, and the more specific return type is a subtype of the other once the other's parameters are read as its own by position.** The equal-count scope and the comparison of kinds are the rung's choices. It builds P-45. The Return Type Rule compares every instance of the less specific declaration, except that a type parameter standing as a whole parameter type where the more specific declaration has an object type is read as its union with that object type, so that only the instances whose domain meets the object are compared; the type group's 2011 paper (`Papers/Types/`) sets aside the instances whose domain is `Bottom`. So it accepts `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, `Circle` an object, and the pair runs (row 542, fixed; F-376), and the merge of the built-in number types with their objects (P-178) brings no refusal to pairs over them. At a tuple of object types the rule still compares the instances that cannot meet, and refuses `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)` (row 1048). In the interpreter's library the two rules refuse no pair: the distance holds no return-type or overloading error (F-53). Gated by `compiler_tests/OverloadGeneric*` and `OverloadBoundNamesForced`, which accept; `OverloadReturnObjectDomain`, which accepts and runs; `XXXOverloadReturnObjectDomainOtherType` and `XXXOverloadReturnEveryInstance`, which pin the Return Type Rule's refusals; `XXXOverloadGenericObjectDomainByPosition` and `XXXOverloadPermutedStaticParams`, which pin the positional rule's; and `XXXOverloadReturnTupleDomain`, which pins row 1048's. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 1 and 2; `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".

Now:

- F-75 **The compiled checker checks the Return Type Rule over every instance, save those whose domain cannot meet an object type, and a positional rule: when two generic declarations in the more-specific relation declare as many static parameters of their own, those parameters agree in kind by position, and the more specific return type is a subtype of the other once the other's parameters are read as its own by position.** The equal-count scope and the comparison of kinds are the rung's choices. It builds P-45. The Return Type Rule leaves out the instances of the less specific declaration whose domain cannot meet the other's only where the less specific declaration has a type parameter as a whole parameter type and the more specific one has an object type there; a worker chose that width, and the curator has not decided it. The type group's 2011 paper (`Papers/Types/`) sets aside every instance whose domain is `Bottom`. So the rule accepts `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, `Circle` an object, and the pair runs (row 542, fixed; F-376). By reading, not by a run, the rule brings no refusal to the one library's pairs of a generic and a plain declaration over the built-in number types once they are merged with their objects (P-178). At a tuple of object types the rule still compares the instances that cannot meet, and wrongly refuses `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)` (row 1048). In the interpreter's library the two rules refuse no pair: the distance holds no return-type or overloading error (F-53). Gated by `compiler_tests/OverloadGeneric*`, `OverloadBoundNamesForced` and `OverloadReturnObjectDomain`, which accept; `XXXOverloadReturnEveryInstance`, `XXXOverloadReturnObjectDomainOtherType`, `XXXOverloadGenericObjectDomainByPosition` and `XXXOverloadPermutedStaticParams`, which pin the two rules' right refusals; and `XXXOverloadReturnTupleDomain`, which pins row 1048's. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 1 and 2; `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "2. The decisions that landed at a default" · from `explorations/reviews/batch-31-review.md`, "What I did not do" · from `explorations/compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the width of the rule at an object type stated as a worker's choice (fork X1 of the batch's record, landed narrower than its words); the clause on the merge of the number types bounded as read, not run, by the post-batch review; the union `T ∪ C` left to the rung's report; the refusal tests split into those of the rules and row 1048's (cites [S9], [S10], [S11])

Report sections that the entry cites: [S11] `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".

## F-79, changed

- Size: at the base 1392 characters; at the landing 1360 characters; now 1360 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-79 **In the interpreter's library, the numeral types are `NaturalNumeral[\n, r, v\]` and `RadixPointNumeral[\n, m, r, v\]`, traits whose static parameters are the four numbers, below `Numeral`, a sibling of the number types under `Number`, and each number type converts from them by a coercion generic over the four numbers.** It builds P-174's numeral types in the one library (`Library/FortressLibrary.fsi:458-466`): `NaturalNumeral` lies below `AnyNaturalNumeral` and `RadixPointNumeral` below `AnyRadixPointNumeral`, which exclude each other; none declares a method, no value of them exists when a program runs, and no `=` pair ties them to a number type. The five integer types and `QQ` convert from `NaturalNumeral` exactly, `QQ` from `RadixPointNumeral` exactly, and `RR64` and `RR32` from both by one rounding through `simpleDoubleArith.numeralToDouble` and `numeralToFloat`; `RR64` comprises `Float` alone. The compiled checker's `Types.INT_LITERAL` and `FLOAT_LITERAL` name these two types under both libraries (`compiler/Types.java:85-95`), the prelude declaring them too. Under walk a numeral reaches these declarations where its place fixes a type (F-341). Tests: `ProjectFortress/tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralStaticDesignWalk.fss`, and the count stage's 0. Detail: `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

Now:

- F-79 **In the interpreter's library, the numeral types are `NaturalNumeral[\n, r, v\]` and `RadixPointNumeral[\n, m, r, v\]`, traits whose static parameters are the four numbers, below `Numeral`, a sibling of the number types under `Number`, and each number type converts from them by a coercion generic over the four numbers.** It builds P-174's numeral types in the one library (`Library/FortressLibrary.fsi:456-464`): `NaturalNumeral` lies below `AnyNaturalNumeral` and `RadixPointNumeral` below `AnyRadixPointNumeral`, which exclude each other; none declares a method, no value of them exists when a program runs, and no `=` pair ties them to a number type. The five integer types and `QQ` convert from `NaturalNumeral` exactly, `QQ` from `RadixPointNumeral` exactly, and `RR64` and `RR32` from both by one rounding through `simpleDoubleArith.numeralToDouble` and `numeralToFloat`. The compiled checker's `Types.INT_LITERAL` and `FLOAT_LITERAL` name these two types under both libraries (`compiler/Types.java:85-95`), the prelude declaring them too. Under walk a numeral reaches these declarations where its place fixes a type (F-341). Tests: `ProjectFortress/tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralStaticDesignWalk.fss`, and the count stage's 0. Detail: `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: rung O made the five number types objects (F-379) and removed walk's native objects; the entry named them as they stood before; lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

Report sections that the entry cites: [S12] `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

## F-85, changed

- Size: at the base 1353 characters; at the landing 1353 characters; now 1353 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-85 **In the interpreter's library, the rung's repairs of the generator, condition, reduction and nested-generator declarations that the compiled checker refused are in forms that the library already uses. `__bigOperator2`'s fused branch passes its result through `cast[\O0\]`.** That branch, the `typecase` branch that runs a nested big operator through `generate2`, casts its result to `O0` (`Library/FortressLibrary.fss:1586`), the library's device for an arm whose type the `typecase` cannot show (F-264), so the checker no longer types its body `OR(I0,O0)` where `O0` is declared (row 632) and no site of these declarations is on the distance (F-53). Each method body of `Condition` that calls `cond` writes the call's result type as its static argument, such as `cond[\Maybe[\G\]\]`. The sites that the rung left were cleared by other work: F-250 holds the identity functions' `cast` and the typed `embiggen`, F-93 how library code reads a generator's size and index (row 629), and F-144 how the reductions without an identity are typed at their element type (row 628). Gated by `tests/GeneratorDeclarations.fss` and `tests/NestedReductionFusion.fss`, which run the arm fused, and the cast by the distance stage. Detail: `compile-ladder/rung-generator-slips/REPORT.md` sections 5 and 8; `compile-ladder/rung-body-arguments/REPORT.md` section 9.

Now:

- F-85 **In the interpreter's library, the rung's repairs of the generator, condition, reduction and nested-generator declarations that the compiled checker refused are in forms that the library already uses. `__bigOperator2`'s fused branch passes its result through `cast[\O0\]`.** That branch, the `typecase` branch that runs a nested big operator through `generate2`, casts its result to `O0` (`Library/FortressLibrary.fss:1670`), the library's device for an arm whose type the `typecase` cannot show (F-264), so the checker no longer types its body `OR(I0,O0)` where `O0` is declared (row 632) and no site of these declarations is on the distance (F-53). Each method body of `Condition` that calls `cond` writes the call's result type as its static argument, such as `cond[\Maybe[\G\]\]`. The sites that the rung left were cleared by other work: F-250 holds the identity functions' `cast` and the typed `embiggen`, F-93 how library code reads a generator's size and index (row 629), and F-144 how the reductions without an identity are typed at their element type (row 628). Gated by `tests/GeneratorDeclarations.fss` and `tests/NestedReductionFusion.fss`, which run the arm fused, and the cast by the distance stage. Detail: `compile-ladder/rung-generator-slips/REPORT.md` sections 5 and 8; `compile-ladder/rung-body-arguments/REPORT.md` section 9.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

## F-87, changed

- Size: at the base 1269 characters; at the landing 1228 characters; now 1228 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-87 **Besides the contexts that it already had, such as a typed declaration's right-hand side, the compiled checker gives a call its expected type in a clause of an `if` without `else` (the type `()`), a block's last expression after local declarations, a `typecase` clause, a juxtaposition, an operator repeated between three or more operands, a `label` body and each value that an `exit` gives the `label`, and, by a retry of the enclosing call, another call's argument.** The inference chapter lists every context (`Specification/basic/inference.tex`, "The Static Arguments of a Call", "The expected type"). In a juxtaposition or a repeated operator, the expression's own expected type goes to the application that it makes. The `label` contexts build P-50. At another call's argument, it retries the enclosing call against each declaration's parameter type, as P-51 decides (F-221). F-226 gives how it renames an inherited method's static parameters at a call, and F-70 where it checks a written static argument against its bound. Gated by `compiler_tests/InferResultOnly*`, among them `InferResultOnlyLabelBody`, a type-check test, since the code generator has no `label`, and `Infer*Context`. Detail: `compile-ladder/rung-checker-contexts/REPORT.md` section 1.

Now:

- F-87 **Besides the contexts that it already had, such as a typed declaration's right-hand side, the compiled checker gives a call its expected type in a clause of an `if` without `else` (the type `()`), a block's last expression after local declarations, a `typecase` clause, a juxtaposition, an operator repeated between three or more operands, a `label` body and each value that an `exit` gives the `label`, and, by a retry of the enclosing call, another call's argument.** The inference chapter lists every context (`Specification/basic/inference.tex`, "The Static Arguments of a Call", "The expected type"). In a juxtaposition or a repeated operator, the expression's own expected type goes to the application that it makes. The `label` contexts build P-50. At another call's argument, it retries the enclosing call against each declaration's parameter type, as P-51 decides (F-221). F-226 gives how it renames an inherited method's static parameters at a call, and F-70 where it checks a written static argument against its bound. Gated by `compiler_tests/InferResultOnly*`, among them `InferResultOnlyLabelBody`, a type-check test, and `Infer*Context`. Detail: `compile-ladder/rung-checker-contexts/REPORT.md` section 1.

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the reason "since the code generator has no `label`" cut, since rung L of climb batch 31 built `label` (F-373) (cites [S2])

Report sections that the entry cites: [S13] `Specification/basic/inference.tex`, "The Static Arguments of a Call".

## F-122, changed

- Size: at the base 915 characters; at the landing 934 characters; now 934 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-122 **`round` on an `RR64` or an `RR32` sends an exact half to the even integer on both paths.** NaN gives 0, and a value beyond the `ZZ64` range saturates to the `ZZ64` bounds. On both paths, a numeral within half an ulp of a tie rounds as its nearest double, not as the rational that it denotes, by P-173's tie reading (P-172; the guard `tests/RoundNearTieNumeral.fss`). The ties are gated under walk by `tests/RoundHalfEvenRungR.fss`, and on the compiled path, for `RR64`, by `library_tests/RR64FunctionsRungF.fss`; the compiled `RR32` ties were observed in a probe of the report. NaN and saturation are gated on neither path: they were observed in the report's walk probe and compiled differential, and read in the code (`(long) Math.rint` in `Float.java:384`, `RR32.java:326` and `simpleDoubleArith.java:132-134`). Detail: `compile-ladder/rung-round-half-even/REPORT.md`, "What landed" and "Differentials".

Now:

- F-122 **`round` on an `RR64` or an `RR32` sends an exact half to the even integer on both paths.** NaN gives 0, and a value beyond the `ZZ64` range saturates to the `ZZ64` bounds. On both paths, a numeral within half an ulp of a tie rounds as its nearest double, not as the rational that it denotes, by P-173's tie reading (P-172; the guard `tests/RoundNearTieNumeral.fss`). The ties are gated under walk by `tests/RoundHalfEvenRungR.fss`, and on the compiled path, for `RR64`, by `library_tests/RR64FunctionsRungF.fss`; the compiled `RR32` ties were observed in a probe of the report. NaN and saturation are gated on neither path: they were observed in the report's walk probe and compiled differential, and read in the code (`(long) Math.rint` in `RR32.java:326` and `simpleDoubleArith.java:148-150`, the helper that walk's `RR64` binds). Detail: `compile-ladder/rung-round-half-even/REPORT.md`, "What landed" and "Differentials".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: the glue class `Float` is deleted by rung O, and walk's `RR64` `round` binds `simpleDoubleArith.doubleRound` (F-303); its lines are `simpleDoubleArith.java:148-150`

Report sections that the entry cites: [S14] `compile-ladder/rung-round-half-even/REPORT.md`, "What landed".

## F-173, changed

- Size: at the base 1718 characters; at the landing 1718 characters; now 1718 characters, over 600.
- Section now: "The specification and the repository's lineage".

At the base:

- F-173 **The specification's type-inference chapter states the rule that the compiled checker builds: the declaration is chosen first, then its static arguments are inferred.** It states P-46, P-48 and P-49. A type parameter that a parameter's declared type mentions inside another type, as `List[\T\]` mentions `T`, is fixed by the argument at that position. One that is the whole declared type of one or more parameters, as `T` is of `x: T`, and that nothing else fixes, takes the narrowest type, within its bounds, that every one of those arguments has or converts into: `ZZ64` for a `ZZ32` and an `NN32`. Where there is none, and no numeral settles the tie, it takes its bound, narrowed by what the call's expected type requires of the return type (P-48). So does a type parameter that neither an argument nor the expected type fixes. Inference never gives a type parameter `BottomType`. The compiled path departs from the chapter in these ways, among others. Its prelude lacks the coercion of `NN32` into `ZZ64`, so a `ZZ32` and an `NN32` instantiate a type parameter at `ZZ`, not `ZZ64`; no callout names this (row 442, `compiler_tests/XXXInferPromoteNN32`). The callouts at `Specification/basic/inference.tex:284-346` and `:447-511` also give walk's departures, such as the return type `BottomType` that walk gives a function expression that declares none (row 587). Plain tests gate the rule for a type parameter that is a parameter's whole type, at its bound where no argument type is narrowest, on both paths: `compiler_tests/InferLone*` and `tests/InferLone*Walk.fss`. Detail: `compile-ladder/rung-instance-bound/REPORT.md` (the bound rule); `Specification/basic/inference.tex:45-125` (the chapter's rule).

Now:

- F-173 **The specification's type-inference chapter states the rule that the compiled checker builds: the declaration is chosen first, then its static arguments are inferred.** It states P-46, P-48 and P-49. A type parameter that a parameter's declared type mentions inside another type, as `List[\T\]` mentions `T`, is fixed by the argument at that position. One that is the whole declared type of one or more parameters, as `T` is of `x: T`, and that nothing else fixes, takes the narrowest type, within its bounds, that every one of those arguments has or converts into: `ZZ64` for a `ZZ32` and an `NN32`. Where there is none, and no numeral settles the tie, it takes its bound, narrowed by what the call's expected type requires of the return type (P-48). So does a type parameter that neither an argument nor the expected type fixes. Inference never gives a type parameter `BottomType`. The compiled path departs from the chapter in these ways, among others. Its prelude lacks the coercion of `NN32` into `ZZ64`, so a `ZZ32` and an `NN32` instantiate a type parameter at `ZZ`, not `ZZ64`; no callout names this (row 442, `compiler_tests/XXXInferPromoteNN32`). The callouts at `Specification/basic/inference.tex:285-347` and `:448-512` also give walk's departures, such as the return type `BottomType` that walk gives a function expression that declares none (row 587). Plain tests gate the rule for a type parameter that is a parameter's whole type, at its bound where no argument type is narrowest, on both paths: `compiler_tests/InferLone*` and `tests/InferLone*Walk.fss`. Detail: `compile-ladder/rung-instance-bound/REPORT.md` (the bound rule); `Specification/basic/inference.tex:45-125` (the chapter's rule).

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the two callout ranges of inference.tex moved by one line at climb batch 31's landing, checked in the worktree; the second, which the review's script missed, too (cites [S2])

## F-174, changed

- Size: at the base 2149 characters; at the landing 2179 characters; now 2179 characters, over 600.
- Section now: "The specification and the repository's lineage".

At the base:

- F-174 **The specification states the type group's 2011 overloading model: declarations of one name may differ in their static parameters, and a declaration with static parameters is read as one declaration over all its instances within its bounds.** It states P-45 and P-42. The section "Declarations with Static Parameters" states the OOPSLA 2011 paper's three rules: No Duplicates, Return Type and Meet. It gives one more restriction as the compiled path's, not the language's. Where one generic declaration is more specific than another with as many static parameters, the two must declare them of the same kinds, position by position. Also, the more specific one's return type must be a subtype of the other's when their static parameters are matched by position, so the checker refuses an override whose return type reorders its static parameters (row 398, fixed). The section "Principles of Overloading" forbids overloading a functional whose single parameter's type is a type parameter with the bound `Any` written, as `T extends Any`. A type parameter with no `extends` clause, whose bound is also `Any`, is exempt. Both paths refuse such an overload: the checker in `OverloadingChecker.checkBoundAny`, and walk since row 534's fix. Neither path runs every set that the rules allow. Appendix I's entry "Overloading with static parameters" names the sets that each path fails. In row 542, the checker refuses a generic declaration beside a plain one over an object type, as `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`. In row 537, the code generator fails on two generic declarations whose bounds differ. In row 539, walk refuses at load the 2019 paper's valid set over an array list and a list. In rows 779 and 780, walk fails on two generic functional methods one of whose declared domains lies inside the other's: in a trait or object without static parameters it refuses them at load, and in a trait with static parameters it loads them, but a call to which both apply fails. Detail: `Specification/advanced/overloading.tex:134-150` and `:531-674`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 3 and 4.

Now:

- F-174 **The specification states the type group's 2011 overloading model: declarations of one name may differ in their static parameters, and a declaration with static parameters is read as one declaration over all its instances within its bounds.** It states P-45 and P-42. The section "Declarations with Static Parameters" states the OOPSLA 2011 paper's three rules: No Duplicates, Return Type and Meet. It gives one more restriction as the compiled path's, not the language's. Where one generic declaration is more specific than another with as many static parameters, the two must declare them of the same kinds, position by position. Also, the more specific one's return type must be a subtype of the other's when their static parameters are matched by position, so the checker refuses an override whose return type reorders its static parameters (row 398, fixed). The section "Principles of Overloading" forbids overloading a functional whose single parameter's type is a type parameter with the bound `Any` written, as `T extends Any`. A type parameter with no `extends` clause, whose bound is also `Any`, is exempt. Both paths refuse such an overload: the checker in `OverloadingChecker.checkBoundAny`, and walk since row 534's fix. Neither path runs every set that the rules allow. Appendix I's entry "Overloading with static parameters" names the sets that each path fails. In row 1048, the checker refuses a generic declaration beside a plain one over a tuple of object types, as `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)`. In row 537, the code generator fails on two generic declarations whose bounds differ. In row 539, walk refuses at load the 2019 paper's valid set over an array list and a list. In rows 779 and 780, walk fails on two generic functional methods one of whose declared domains lies inside the other's: in a trait or object without static parameters it refuses them at load, and in a trait with static parameters it loads them, but a call to which both apply fails. Detail: `Specification/advanced/overloading.tex:134-150` and `:531-674`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 3 and 4.

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: row 542 fixed by rung X of climb batch 31, so the sentence names the gap of that kind that stands, row 1048 (cites [S2])

## F-175, changed

- Size: at the base 1298 characters; at the landing 1298 characters; now 1298 characters, over 600.
- Section now: "The specification and the repository's lineage".

At the base:

- F-175 **The specification reads a `comprises` clause at the level of values in every passage.** It builds P-60. Appendix I's entry "Traits with comprises clauses read at the level of values" records the change. A call whose argument's static type stands between two closed traits runs the declaration that covers its value. Where its declarations have no static parameters, its type is the intersection of its most specific declarations' return types. Appendix I names five places where the compiled path departs. The checker checks a `comprises` clause at the closed trait's immediate subtypes only (row 487). The code generator crashes on a method call on a result typed by that intersection (row 540). Where any declaration of the overload set has static parameters, the checker types such a call by one of its most specific declarations instead, a deliberate choice (row 543). The checker refuses the Meet Rule's example for closed traits when its declarations have static parameters (row 546). The checker's verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Detail: `Specification/appendices/changes.tex:3464-3660`, with the rows at `:1674-1677` and `:3730-3737`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 8 and 9.

Now:

- F-175 **The specification reads a `comprises` clause at the level of values in every passage.** It builds P-60. Appendix I's entry "Traits with comprises clauses read at the level of values" records the change. A call whose argument's static type stands between two closed traits runs the declaration that covers its value. Where its declarations have no static parameters, its type is the intersection of its most specific declarations' return types. Appendix I names five places where the compiled path departs. The checker checks a `comprises` clause at the closed trait's immediate subtypes only (row 487). The code generator crashes on a method call on a result typed by that intersection (row 540). Where any declaration of the overload set has static parameters, the checker types such a call by one of its most specific declarations instead, a deliberate choice (row 543). The checker refuses the Meet Rule's example for closed traits when its declarations have static parameters (row 546). The checker's verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Detail: `Specification/appendices/changes.tex:3474-3670`, with the rows at `:1674-1677` and `:3740-3747`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 8 and 9.

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the line citations of changes.tex moved by ten lines at climb batch 31's landing, checked in the worktree; the range that holds rows 543, 540, 546 and 547, which the review's script missed, too; the range of row 487 did not move (cites [S2])

## F-225, changed

- Size: at the base 2842 characters; at the landing 2754 characters; now 2754 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-225 **In a self-typed trait with no `comprises` clause, or one that lists only `...`, the compiled checker types `self` in the method bodies as `C[\X\] & X`, the trait met with the implementing type, read from the trait's F-bound; the methods' signatures keep `self` at the plain trait type `C[\X\]`, save in the overloading check's exclusion test (F-277), and the checker refuses an extender at another type.** It builds P-146. A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`. The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's. In a trait whose `comprises` clause lists types, `self` is instead the trait met with the union of those types, and the exclusion test reads its signatures plain. For example, `object Bad extends Integral[\ZZ32\]` is refused, since `Bad` is not a `ZZ32`. The rule accepts every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares instead (P-146). Walk has no such rule and loads what it refuses. A compiled default body that returns `self` at the self-type parameter runs, also where the parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]`: the code generator casts `self` there (row 695, fixed; F-377). A function expression or a local function that returns `self` so still fails verification (row 1050), as does a default body that returns `self` in one arm of a conditional and another value in the other, the shape of `StandardTotalOrder`'s `MIN` and `MAX` (row 1051), and a default body that calls a method on a value of the self-type parameter dies at load with a `ClassCircularityError` where the object lists the trait first (row 1052). The rule refuses, rightly, a team declaration, `PureList`'s `List` (row 355); the demo `trips.fss`'s `generator`, which it refused, extends `StandardTotalOrder[\generator\]` since its repair (row 710; `ProjectFortress/demos/trips.fss:96`). The compiler's prelude writes the self type instead as `comprises T` on `StandardTotalOrder` and `Equality` (`Library/CompilerAlgebra.fsi:16`, `:24`; on `StandardTotalOrder` since Steele's `655e65d53`, 2012-06-05, and `59fdeff62`, 2012-06-06, which took its F-bound away), and that spelling does not bind the one library, since Naden's last text puts the self-type idiom in bounds only, not as a first-class type (`Papers/Types/journal/justificationOfRTR.tex:626-630`), and Steele's own message on `655e65d53` gives the self type as the trait met with the `comprises` clause, which this rule reads from the F-bound. Gated by `compiler_tests/SelfType*` and `XXXSelfType*`. Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4 and 7; `compile-ladder/rung-self-type-exclusion/REPORT.md` section 1.

Now:

- F-225 **In a self-typed trait with no `comprises` clause, or one that lists only `...`, the compiled checker types `self` in the method bodies as `C[\X\] & X`, the trait met with the implementing type, read from the trait's F-bound; the methods' signatures keep `self` at the plain trait type `C[\X\]`, save in the overloading check's exclusion test (F-277), and the checker refuses an extender at another type.** It builds P-146. A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`. The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's. In a trait whose `comprises` clause lists types, `self` is instead the trait met with the union of those types, and the exclusion test reads its signatures plain. For example, `object Bad extends Integral[\ZZ32\]` is refused, since `Bad` is not a `ZZ32`. The rule accepts every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares instead (P-146). Walk has no such rule and loads what it refuses. A compiled default body that returns `self` at the self-type parameter runs, also where the parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]` (row 695, fixed). F-377 gives the cast that does it and the shapes that still fail verification, among them a conditional that returns `self` in one arm and another value in the other, the shape of `StandardTotalOrder`'s `MIN` and `MAX` (row 1051). A default body that calls a method on a value of the self-type parameter dies at load with a `ClassCircularityError` where the object lists the trait first (row 1052). The rule refuses, rightly, a team declaration, `PureList`'s `List` (row 355); the demo `trips.fss`'s `generator`, which it refused, extends `StandardTotalOrder[\generator\]` since its repair (row 710; `ProjectFortress/demos/trips.fss:96`). The compiler's prelude writes the self type instead as `comprises T` on `StandardTotalOrder` and `Equality` (`Library/CompilerAlgebra.fsi:16`, `:24`; on `StandardTotalOrder` since Steele's `655e65d53`, 2012-06-05, and `59fdeff62`, 2012-06-06, which took its F-bound away), and that spelling does not bind the one library, since Naden's last text puts the self-type idiom in bounds only, not as a first-class type (`Papers/Types/journal/justificationOfRTR.tex:626-630`), and Steele's own message on `655e65d53` gives the self type as the trait met with the `comprises` clause, which this rule reads from the F-bound. Gated by `compiler_tests/SelfType*` and `XXXSelfType*`. Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4 and 7; `compile-ladder/rung-self-type-exclusion/REPORT.md` section 1.

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why" · from `explorations/compile-ladder/climb-batch-31/RECORD.md`, "The gather's own point" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the compiled cast of self and the shapes that it does not reach (rows 1050 and 1051) point to F-377, which owns them; row 1052 stays here, since F-377 does not hold it (cites [S15], [S16])

## F-229, changed

- Size: at the base 1485 characters; at the landing 1561 characters; now 1561 characters, over 600.
- Section now: "The library's arrays and algebra".

At the base:

- F-229 **`array1` and `array2` give a vector and a matrix only at the eight number types, chosen by a `typecase` over a witness of their result type; at any other element type they give a plain array.** The branches are `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64`; each builds the array at that type and returns it through `cast`, in `additiveIdentity`'s shape. `Array1` and `Array2` are invariant, so a branch matches only its own number type exactly. `Number` and `AnyIntegral` get a plain array, since `Vector[\Number,n\]` is not well-formed under the element bound `T extends { Number, MultiplicativeRing[\T\] }` of `Vector` and `Matrix` (F-151). The specification's "Array Expressions" makes an array of `Number` elements a vector (row 729, contested). Under walk, a type parameter inferred from a `ZZ32`, `ZZ64` or `RR64` value is that type, so it gets a vector (`tests/ArrayInferredElementVectorWalk`). The witness is of the result type because at `T = Int` a witness of the element type, `() -> Int`, would match the `ZZ32` branch, and the `cast` of the `ZZ32` vector to an array of `Int` would throw `CastError` (row 722, the same cast in `openRange`). Gated under walk by `tests/ArrayFactoryNumberTypes` and `ArrayFactoryAbstractNumber`. The distance stage measures the compiled checker's acceptance; it reports, and does not turn the gate red. Detail: `compile-ladder/rung-library-factories/REPORT.md` sections 1 (the change), 3 and 4 (the ways measured).

Now:

- F-229 **`array1` and `array2` give a vector and a matrix only at the eight number types, chosen by a `typecase` over a witness of their result type; at any other element type they give a plain array.** The branches are `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64`; each builds the array at that type and returns it through `cast`, in `additiveIdentity`'s shape. `Array1` and `Array2` are invariant, so a branch matches only its own number type exactly. `Number` and `AnyIntegral` get a plain array, since `Vector[\Number,n\]` is not well-formed under the element bound `T extends { Number, MultiplicativeRing[\T\] }` of `Vector` and `Matrix` (F-151). The specification's "Array Expressions" makes an array of `Number` elements a vector (row 729, contested). Under walk, a type parameter inferred from a `ZZ32`, `ZZ64` or `RR64` value is that type, so it gets a vector (`tests/ArrayInferredElementVectorWalk`). The witness is of the result type because, while walk's `ZZ32` values were of its native object `Int` (before F-379), at `T = Int` a witness of the element type, `() -> Int`, would match the `ZZ32` branch, and the `cast` of the `ZZ32` vector to an array of `Int` would throw `CastError` (row 722, the same cast in `openRange`). Gated under walk by `tests/ArrayFactoryNumberTypes` and `ArrayFactoryAbstractNumber`. The distance stage measures the compiled checker's acceptance; it reports, and does not turn the gate red. Detail: `compile-ladder/rung-library-factories/REPORT.md` sections 1 (the change), 3 and 4 (the ways measured).

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: rung O made the five number types objects (F-379) and removed walk's native objects; the entry named them as they stood before

## F-240, changed

- Size: at the base 2160 characters; at the landing 2366 characters; now 2366 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 75 s and its distance stage 143 s at the last landed gate, climb batch 31's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 86 s), over fourteen components, ran at a start load of 0.08, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 165 s (102 s) at 0.31 at climb batch 32's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-31/gate/distance.txt`. Detail: `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 85 s and its distance stage 150 s at the last landed gate, climb batch 31b's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; that time is not of one span with the whole stage, which rung runs of the same night timed longer, so it shows no fall since climb batch 31's gate, the one before; the distance stage (`FortressLibrary` 96 s), over fourteen components, ran at a start load of 0.31, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 143 s (86 s) at 0.08 at climb batch 31's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-31b/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "4. The gate, the count and the distance" · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: one clause, that the count stage's figure from the log's file times is not of one span with the whole-stage timings of rung X and its skeptic that night (93.6 s, 93.2 s, 92.8 s and 88.5 s), so no fall is shown; the post-batch review added to the Detail; no figure of the commit stage's changed (cites [S17], [S2])
- Written by the commit stage: 2026-11-17 10:17Z · rewritten · by climb batch 31b commit stage: climb batch 31b's gate: the count stage's 83 s from the file times of the gate's log, tmp/gate-batch-31b/checker-count/javac.txt (10:13:36) and run.txt (10:14:59), written about 85 s; explorations/compile-ladder/climb-batch-31b/gate/distance.txt, lines #seconds 150 (FortressLibrary 96), #machine (load at start 0.31) and its first line's 14 components; the stage ran beside testFast's first minutes; climb batch 31's figures (about 75 s; 143 s, FortressLibrary 86 s, at 0.08) as the ones compared against

## F-252, changed

- Size: at the base 4166 characters; at the landing 4330 characters; now 4330 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-252 **Under walk, where the parameter-by-parameter check refuses two declarations with static parameters of their own, or one beside a generic trait's functional method that declares none of its own, the load check reads the pair again on its declared domains, by the No Duplicates, Return Type and Meet Rules.** A declaration with static parameters of its own is a generic function, a generic object's constructor, or a functional method that declares static parameters in a trait or object that has none. Walk's load check first compares two overloads parameter by parameter, and a pair that it finds excluding loads. It reads two generic functions of one name and one list of static parameters at one shared symbolic instantiation, and two instances of one generic object as two object types that cannot be extended, so they exclude. So `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])`, with `trait P[\T\] excludes { Q[\T\] }`, excludes at one `T`, though a type that extends `P[\ZZ32\]` and `Q[\String\]` has both. Walk then reads such an exclusion again over the instances of each, and withdraws it where their instances do not exclude. Instances of one generic type exclude only where their static arguments cannot be equal. Any other exclusion stands where the two still exclude with their static parameters renamed apart. Or, read at the shared instantiation, it stands where every generic type that both extend forces their static arguments to be equal, since no type extends two instances of one generic trait: so `Array` and `ImmutableArray` exclude at every pair of instances through `ReadableArray`. A pair whose exclusion is withdrawn is read on its declared domains as a refused pair is. It reads a refused pair of two such declarations again, each over all its own instances, and loads the pair if it meets the three rules. An own generic beside such a functional method is read as two own generics, the trait's static parameters standing for the method's (F-318). A pair that the parameter check orders is read again only for the No Duplicates Rule (F-274). F-275 holds the Return Type Rule. The parameter check does not find two instances of one generic type at different ground static arguments excluding, such as `Tg[\3\]` and `Tg[\4\]`, so two plain declarations so typed are refused (row 416). Two declarations with static parameters of their own so typed load where the reading of the whole parameter type finds the instances apart, as `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` loads and runs (F-155, F-258). For the Meet Rule, walk looks for a third declaration that covers the overlap only where, at each position, the two parameter types are equal, or one of them is a static parameter, or both are instances of one generic type whose static arguments match in the same way (row 539). This search reads a bound that names its own parameter from the declarations, so two such bounds meet, and unifies a symbolic size with a size parameter. A pair whose domains exclude when read whole also loads, where neither declaration has a `where` clause of its own (F-258; row 787). A pair with a varargs parameter is not read again and keeps the parameter check's refusal (F-257). At a call, walk compares a functional method of a generic trait or object on the instance that the call makes. F-253 gives the case of a generic dotted method, where one of the two declared domains can lie inside the other. Gated by `tests/DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk` and `GenericPairNestedBoundsWalk` (load and dispatch), and the expected failure `XXXOverloadExistentialMeetWalk` (row 539); for the withdrawal, as refusals at load, by `GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk` and `GenericOverloadInstancesApartWalk`, and as programs that load, by `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk`, `GenericSizePairNestedWalk`, `ShuffleTest` and `GenericPairExcludesTogetherWalk`. Detail: `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5; `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 373", and section 9.

Now:

- F-252 **Under walk, where the parameter-by-parameter check refuses two declarations with static parameters of their own, or one beside a generic trait's functional method that declares none of its own, the load check reads the pair again on its declared domains, by the No Duplicates, Return Type and Meet Rules.** A declaration with static parameters of its own is a generic function, a generic object's constructor, or a functional method that declares static parameters in a trait or object that has none. Walk's load check first compares two overloads parameter by parameter, and a pair that it finds excluding loads, except a plain declaration inside an own generic's declared domain where the two lists differ only at object types, which it reads on the declared domains (F-375). It reads two generic functions of one name and one list of static parameters at one shared symbolic instantiation, and two instances of one generic object as two object types that cannot be extended, so they exclude. So `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])`, with `trait P[\T\] excludes { Q[\T\] }`, excludes at one `T`, though a type that extends `P[\ZZ32\]` and `Q[\String\]` has both. Walk then reads such an exclusion again over the instances of each, and withdraws it where their instances do not exclude. Instances of one generic type exclude only where their static arguments cannot be equal. Any other exclusion stands where the two still exclude with their static parameters renamed apart. Or, read at the shared instantiation, it stands where every generic type that both extend forces their static arguments to be equal, since no type extends two instances of one generic trait: so `Array` and `ImmutableArray` exclude at every pair of instances through `ReadableArray`. A pair whose exclusion is withdrawn is read on its declared domains as a refused pair is. It reads a refused pair of two such declarations again, each over all its own instances, and loads the pair if it meets the three rules. An own generic beside such a functional method is read as two own generics, the trait's static parameters standing for the method's (F-318). A pair that the parameter check orders is read again only for the No Duplicates Rule (F-274). F-275 holds the Return Type Rule. The parameter check does not find two instances of one generic type at different ground static arguments excluding, such as `Tg[\3\]` and `Tg[\4\]`, so two plain declarations so typed are refused (row 416). Two declarations with static parameters of their own so typed load where the reading of the whole parameter type finds the instances apart, as `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` loads and runs (F-155, F-258). For the Meet Rule, walk looks for a third declaration that covers the overlap only where, at each position, the two parameter types are equal, or one of them is a static parameter, or both are instances of one generic type whose static arguments match in the same way (row 539). This search reads a bound that names its own parameter from the declarations, so two such bounds meet, and unifies a symbolic size with a size parameter. A pair whose domains exclude when read whole also loads, where neither declaration has a `where` clause of its own (F-258; row 787). A pair with a varargs parameter is not read again and keeps the parameter check's refusal (F-257). At a call, walk compares a functional method of a generic trait or object on the instance that the call makes. F-253 gives the case of a generic dotted method, where one of the two declared domains can lie inside the other. Gated by `tests/DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk` and `GenericPairNestedBoundsWalk` (load and dispatch), and the expected failure `XXXOverloadExistentialMeetWalk` (row 539); for the withdrawal, as refusals at load, by `GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk` and `GenericOverloadInstancesApartWalk`, and as programs that load, by `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk`, `GenericSizePairNestedWalk`, `ShuffleTest` and `GenericPairExcludesTogetherWalk`. Detail: `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5; `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 373", and section 9.

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" · from `explorations/compile-ladder/rung-walk-value-bound/REPORT.md`, "Programs run old against new" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: one clause for the pair that rung V of climb batch 31 reads on its declared domains though the parameter check finds it excluding, with a pointer to F-375 (cites [S18], [S19])

## F-257, changed

- Size: at the base 1907 characters; at the landing 2035 characters; now 2035 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-257 **Under walk, a pair of declarations that the load check refuses after it reads the pair on its declared domains is refused in the name of the rule that the pair breaks.** The load check reads a pair on its declared domains where its parameter-by-parameter check refuses the pair and both declarations have static parameters of their own, or one has them and the other is a plain declaration or a generic trait's functional method that declares none of its own (F-252, F-27, F-318). It reads a pair that the check orders only for the No Duplicates Rule (F-274). The messages open "fails the Return Type Rule:" and "fails the Meet Rule:", and the No Duplicates Rule's is walk's "fails because their parameter lists have the same types"; the report gives them whole. The first two contain the words "not found" because walk's reading is narrower than the rules: rows 539, 550 and 779 hold valid pairs that walk refuses. A pair that is not read on its declared domains keeps the parameter check's message, such as "with generic type, at least one pair of parameters must have excluding types". Such a pair has a varargs parameter, or parameter lists of different lengths, or raises an error while its instances are read. Or it is of none of the kinds above, as two functional methods of generic traits, or it is the pair of instances that an explicit instantiation such as `f[\A, B\]` makes of two generic declarations of one name (`XXXGenericOverload2`). The message does not decide which pairs load. Gated by `tests/GenericReturnRuleInvariantWalk`, `GenericReturnRuleOuterParamWalk` and `GenericBesidePlainReturnRuleWalk` (Return Type), `GenericOverloadInstancesApartWalk`, `GenericBoundsNoMeetWalk` and `GenericBesidePlainNoMeetWalk` (Meet), and `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk` (No Duplicates). Detail: `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 3.

Now:

- F-257 **Under walk, a pair of declarations that the load check refuses after it reads the pair on its declared domains is refused in the name of the rule that the pair breaks.** The load check reads a pair on its declared domains where its parameter-by-parameter check refuses the pair and both declarations have static parameters of their own, or one has them and the other is a plain declaration or a generic trait's functional method that declares none of its own (F-252, F-27, F-318), and where that check finds a plain declaration inside an own generic's declared domain excluding at object types alone (F-375). It reads a pair that the check orders only for the No Duplicates Rule (F-274). The messages open "fails the Return Type Rule:" and "fails the Meet Rule:", and the No Duplicates Rule's is walk's "fails because their parameter lists have the same types"; the report gives them whole. The first two contain the words "not found" because walk's reading is narrower than the rules: rows 539, 550 and 779 hold valid pairs that walk refuses. A pair that is not read on its declared domains keeps the parameter check's message, such as "with generic type, at least one pair of parameters must have excluding types". Such a pair has a varargs parameter, or parameter lists of different lengths, or raises an error while its instances are read. Or it is of none of the kinds above, as two functional methods of generic traits, or it is the pair of instances that an explicit instantiation such as `f[\A, B\]` makes of two generic declarations of one name (`XXXGenericOverload2`). The message does not decide which pairs load. Gated by `tests/GenericReturnRuleInvariantWalk`, `GenericReturnRuleOuterParamWalk` and `GenericBesidePlainReturnRuleWalk` (Return Type), `GenericOverloadInstancesApartWalk`, `GenericBoundsNoMeetWalk` and `GenericBesidePlainNoMeetWalk` (Meet), and `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk` (No Duplicates). Detail: `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 3.

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the reading that rung V of climb batch 31 added, where the parameter check finds the pair excluding, with a pointer to F-375 (cites [S18])

## F-258, changed

- Size: at the base 2830 characters; at the landing 2830 characters; now 2830 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-258 **Walk and the compiled checker read exclusion between two declarations, one or both with static parameters, over the whole parameter type, by existential reduction.** A value of both declared domains has, at each position, one instance of each generic type that the two parameter types there are or extend, so those instances' static arguments are equal; the two domains exclude where these equalities cannot hold together, or where, at the instance they force, the parameter types at some position exclude. Walk: the Meet branches of `genericPairValid` and of `validOnDeclaredDomains`'s generic-beside-plain reading also ask `domainsExcludeTogether` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:935` at `a93fb3bfd`), which reads bounds where `mayBeEqual` and `meetParams` read them and reads no `where` clause, varargs or lists of different lengths; at the instance the equalities force, it reads two parameter types that still mention a static parameter apart only where they cannot meet at any instance of it: an object type apart from a type that neither it nor a supertype of it may be, and no `comprises` clause (`excludesAtMeet`, `OverloadedFunction.java:1041` at `84957e6ef`). The checker: `OverloadingOracle.excludes` asks `TypeSchemaAnalyzer.emptyED` beside `subtypeED` (`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:327`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:444`): the existential reduction's first premise alone, its bounds not read; and `meetEmptyWithBounds`, which reads each static parameter at the top of the meet as its declared bounds (`OverloadingOracle.scala:327`, `TypeSchemaAnalyzer.scala:533`; F-277). On the interpreter's library `emptyED` is never reached: `subtypeED` shows all 691 meets the count stage tests empty. The two paths differ on two type parameters whose bounds exclude (row 786); on such a pair one of whose declarations has a `where` clause, which walk refuses and the checker accepts (row 787); and on a pair that walk's parameter check reads apart, reading an object type over a static parameter as excluding a type it is at some instance, as `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`, which walk loads and the checker refuses (row 788). Gated by `ProjectFortress/tests/GenericPairExcludesTogetherWalk`, `GenericPairForcedObjectApartWalk`, `ProjectFortress/compiler_tests/GenericPairExcludesTogether` and `GenericPairSharedSupertypeExclusion` (load, compile and dispatch), and `ProjectFortress/tests/GenericPairFreeArgumentWalk`, `GenericPairObjectSupertypeOverlapWalk` and `ProjectFortress/compiler_tests/XXXGenericPairFreeArgument` (refused). Detail: `compile-ladder/rung-existential-reduction/REPORT.md` sections 2, 5 and 7.

Now:

- F-258 **Walk and the compiled checker read exclusion between two declarations, one or both with static parameters, over the whole parameter type, by existential reduction.** A value of both declared domains has, at each position, one instance of each generic type that the two parameter types there are or extend, so those instances' static arguments are equal; the two domains exclude where these equalities cannot hold together, or where, at the instance they force, the parameter types at some position exclude. Walk: the Meet branches of `genericPairValid` and of `validOnDeclaredDomains`'s generic-beside-plain reading also ask `domainsExcludeTogether` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:935` at `a93fb3bfd`), which reads bounds where `mayBeEqual` and `meetParams` read them and reads no `where` clause, varargs or lists of different lengths; at the instance the equalities force, it reads two parameter types that still mention a static parameter apart only where they cannot meet at any instance of it: an object type apart from a type that neither it nor a supertype of it may be, and no `comprises` clause (`excludesAtMeet`, `OverloadedFunction.java:1041` at `84957e6ef`). The checker: `OverloadingOracle.excludes` asks `TypeSchemaAnalyzer.emptyED` beside `subtypeED` (`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:367`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:444`): the existential reduction's first premise alone, its bounds not read; and `meetEmptyWithBounds`, which reads each static parameter at the top of the meet as its declared bounds (`OverloadingOracle.scala:367`, `TypeSchemaAnalyzer.scala:533`; F-277). On the interpreter's library `emptyED` is never reached: `subtypeED` shows all 691 meets the count stage tests empty. The two paths differ on two type parameters whose bounds exclude (row 786); on such a pair one of whose declarations has a `where` clause, which walk refuses and the checker accepts (row 787); and on a pair that walk's parameter check reads apart, reading an object type over a static parameter as excluding a type it is at some instance, as `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`, which walk loads and the checker refuses (row 788). Gated by `ProjectFortress/tests/GenericPairExcludesTogetherWalk`, `GenericPairForcedObjectApartWalk`, `ProjectFortress/compiler_tests/GenericPairExcludesTogether` and `GenericPairSharedSupertypeExclusion` (load, compile and dispatch), and `ProjectFortress/tests/GenericPairFreeArgumentWalk`, `GenericPairObjectSupertypeOverlapWalk` and `ProjectFortress/compiler_tests/XXXGenericPairFreeArgument` (refused). Detail: `compile-ladder/rung-existential-reduction/REPORT.md` sections 2, 5 and 7.

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the two line citations of OverloadingOracle.scala moved by climb batch 31's landing, checked at their member in the worktree; the two of OverloadedFunction.java name their commits, a93fb3bfd and 84957e6ef, and stay (cites [S2])

## F-262, changed

- Size: at the base 1344 characters; at the landing 1329 characters; now 1329 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-262 **A numeral's sign does not reach its type on either path, so no overload on a numeral exponent's type can tell a positive exponent from a negative one, as in `x^16` and `x^(-16)`.** The numeral itself has no sign (`Specification/basic/lexical-structure.tex:1053-1080`). The checker types every integer numeral by its numeral type, `NaturalNumeral[\n, r, v\]`, whose static arguments hold no sign, under the compiler's prelude and the one library alike (`scala_src/typechecker/impls/Misc.scala:469-472`), before it converts it (F-342). Both paths fold `prefix -` on a numeral into a numeral node of negative value before the checker, and fold `^` of numerals by an integer numeral up to 4096 (F-339), but leave an integer base at a negative exponent: `10^16` is a numeral, and `10^(-16)` stays an operation whose exponent is a numeral (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:315-325`). Walk's numeral is its default, an `Int` value read at `ZZ32` (F-74, F-341); a negated numeral at a program's own type is the type's own prefix `-` applied to the coercion's result for the numeral, on both paths (P-174; tests `tests/NumeralStaticDesignWalk.fss`, `compiler_tests/NegativeNumeralOwnType.test`). That no overload can tell the two exponents apart is by reading. Detail: `reviews/integer-power-fable-judgement.md` section 9.

Now:

- F-262 **A numeral's sign does not reach its type on either path, so no overload on a numeral exponent's type can tell a positive exponent from a negative one, as in `x^16` and `x^(-16)`.** The numeral itself has no sign (`Specification/basic/lexical-structure.tex:1053-1080`). The checker types every integer numeral by its numeral type, `NaturalNumeral[\n, r, v\]`, whose static arguments hold no sign, under the compiler's prelude and the one library alike (`scala_src/typechecker/impls/Misc.scala:469-472`), before it converts it (F-342). Both paths fold `prefix -` on a numeral into a numeral node of negative value before the checker, and fold `^` of numerals by an integer numeral up to 4096 (F-339), but leave an integer base at a negative exponent: `10^16` is a numeral, and `10^(-16)` stays an operation whose exponent is a numeral (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:315-325`). Walk's numeral is its default, a `ZZ32` value (F-74, F-341); a negated numeral at a program's own type is the type's own prefix `-` applied to the coercion's result for the numeral, on both paths (P-174; tests `tests/NumeralStaticDesignWalk.fss`, `compiler_tests/NegativeNumeralOwnType.test`). That no overload can tell the two exponents apart is by reading. Detail: `reviews/integer-power-fable-judgement.md` section 9.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: rung O made the five number types objects (F-379) and removed walk's native objects; the entry named them as they stood before

## F-268, changed

- Size: at the base 598 characters; at the landing 598 characters; now 598 characters.
- Section now: "The checker and the one library".

At the base:

- F-268 **The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`.** It emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` (`CodeGen.java:6318-6323`). For `Holder[\(Any, ZZ32)\]` it stops with 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null' (row 889). Test: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" and "5. Programs run old against new, and the probes".

Now:

- F-268 **The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`.** It emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` (`CodeGen.java:6567-6571`). For `Holder[\(Any, ZZ32)\]` it stops with 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null' (row 889). Test: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" and "5. Programs run old against new, and the probes".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the line citation of `CodeGen.java` moved by climb batch 31's landing, checked at its member in the worktree: the branch for `AnyType` (cites [S2])
- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

Report sections that the entry cites: [S20] `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why".

## F-276, changed

- Size: at the base 1430 characters; at the landing 1430 characters; now 1430 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-276 **String's four concatenation families are three top-level operators each, as juxtaposition's are; with the known fixes beside them, the full check of symbolic operators loses the library's 54 known-fix errors.** `||`, `|||`, `//` and `///` are declared at `(Any, String)`, `(String, String)` and `(String, Any)` (`Library/FortressLibrary.fsi:2672-2691`); the `(String, String)` `||` reaches `FlatString`'s and `Concatenable`'s own `||` by `typecase`, which String's api states (`Library/String.fsi:17-19`, `:29-31`), so under walk `"ab" || "cd"` stays a `FlatString` of depth 0. The known fixes beside them: `EmptyString`'s meet, `Integral`'s and `ZZ`'s `=`, String's api header extending `DelegatedIndexed`, `Maybe`'s `|self|` and subscript meets, `Float`'s `|self| : RR64` and `^` meet, and the api's six vector and matrix `+` and `-` out. With these alone on climb batch 21's base the full check went 191 to 137, the 54 of F-245 gone and none come; the stock count stayed 3 and the distance 5. Under walk, a program's own trait with a functional `||`, `|||`, `//` or `///` that can meet `String` needs `excludes { String }` or the meet, where walk analyses the library afresh (row 342). Tests: `tests/StringConcatenationFamiliesWalk.fss`; the distance stage, which checks every operator (F-281); `tests/XXXFunctionalMethodMeetOperator.fss`. Detail: `compile-ladder/rung-symbolic-library/REPORT.md` sections 1, 3 and 4.

Now:

- F-276 **String's four concatenation families are three top-level operators each, as juxtaposition's are; with the known fixes beside them, the full check of symbolic operators loses the library's 54 known-fix errors.** `||`, `|||`, `//` and `///` are declared at `(Any, String)`, `(String, String)` and `(String, Any)` (`Library/FortressLibrary.fsi:2662-2681`); the `(String, String)` `||` reaches `FlatString`'s and `Concatenable`'s own `||` by `typecase`, which String's api states (`Library/String.fsi:17-19`, `:29-31`), so under walk `"ab" || "cd"` stays a `FlatString` of depth 0. The known fixes beside them: `EmptyString`'s meet, `Integral`'s and `ZZ`'s `=`, String's api header extending `DelegatedIndexed`, `Maybe`'s `|self|` and subscript meets, `Float`'s `|self| : RR64` and `^` meet, and the api's six vector and matrix `+` and `-` out. With these alone on climb batch 21's base the full check went 191 to 137, the 54 of F-245 gone and none come; the stock count stayed 3 and the distance 5. Under walk, a program's own trait with a functional `||`, `|||`, `//` or `///` that can meet `String` needs `excludes { String }` or the meet, where walk analyses the library afresh (row 342). Tests: `tests/StringConcatenationFamiliesWalk.fss`; the distance stage, which checks every operator (F-281); `tests/XXXFunctionalMethodMeetOperator.fss`. Detail: `compile-ladder/rung-symbolic-library/REPORT.md` sections 1, 3 and 4.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

## F-279, changed

- Size: at the base 766 characters; at the landing 766 characters; now 766 characters, over 600.
- Section now: "The library's arrays and algebra".

At the base:

- F-279 **Under walk an `Array2` or `Array3` based above zero slices like a 0-based one, except a shifted `Array2`.** `Array2.subarray` and `Array3.subarray` hand their 0-based views the offset less the base, and `Array3`'s `[:]` passes its base, as `Array1`'s do (`Library/FortressLibrary.fss:2915`, `:3317`, `:3296`; `:2627`). `SubArray2`'s own `subarray` subtracts the output base instead of its own (`:2999`, row 808), so a slice of a shifted `Array2` still reads the wrong elements, and a shift of a slice, a column, a row or a shifted `Array2` ends in Java's `ArrayIndexOutOfBoundsException`. Tests: `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase`, `XXXArray2ShiftedSlice`. Detail: `compile-ladder/rung-slices-list-equality/REPORT.md`, sections 1 and 5.

Now:

- F-279 **Under walk an `Array2` or `Array3` based above zero slices like a 0-based one, except a shifted `Array2`.** `Array2.subarray` and `Array3.subarray` hand their 0-based views the offset less the base, and `Array3`'s `[:]` passes its base, as `Array1`'s do (`Library/FortressLibrary.fss:2999`, `:3401`, `:3380`; `:2711`). `SubArray2`'s own `subarray` subtracts the output base instead of its own (`:3083`, row 808), so a slice of a shifted `Array2` still reads the wrong elements, and a shift of a slice, a column, a row or a shifted `Array2` ends in Java's `ArrayIndexOutOfBoundsException`. Tests: `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase`, `XXXArray2ShiftedSlice`. Detail: `compile-ladder/rung-slices-list-equality/REPORT.md`, sections 1 and 5.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

## F-285, changed

- Size: at the base 1683 characters; at the landing 1683 characters; now 1683 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-285 **The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter, and of every list comprehension, in the twelve components the distance checks; `__bigOperator2`'s fused arm casts its result to `O0`.** It follows P-78: `BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4581`, `:4587`), and `<|[\E\] self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:151`), beside `SUM[\T\]` at `:2720`, `:3106`, `:3111`, `SUM[\ZZ32\]` at `:4765`, `:4782`, and the team's `transpose` (`List.fss:504`). The clause forms left unwritten are of plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, or of `BIG LEXICO`, which has no static parameter. The fused arm (`:1586`) uses the library's cast device for an arm whose type the `typecase` cannot show (F-264), as `__builtinFactory1`'s `N[\0\]` arm does (`:2740`). So the distance holds no site of an unwritten argument or of the fused arm. The checker now infers such an unwritten argument itself (F-364); the library's sites stay written. Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`; `PureList`'s, at `Library/PureList.fss:73`, answers a list of objects at their elements' run-time types, and a list of `ZZ32` or `String` at its element type (row 824). Tests: the distance stage (`explorations/coordinator/tools/distance/run.sh`, its typecheck kind 0); `tests/WrittenReductionArgumentsWalk`; `tests/NestedReductionFusion`; `tests/PureListStridedSubscriptWalk`. Detail: `compile-ladder/rung-body-arguments/REPORT.md`, sections 3, 5, 7 and 9.

Now:

- F-285 **The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter, and of every list comprehension, in the twelve components the distance checks; `__bigOperator2`'s fused arm casts its result to `O0`.** It follows P-78: `BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4665`, `:4671`), and `<|[\E\] self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:151`), beside `SUM[\T\]` at `:2720`, `:3106`, `:3111`, `SUM[\ZZ32\]` at `:4765`, `:4782`, and the team's `transpose` (`List.fss:504`). The clause forms left unwritten are of plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, or of `BIG LEXICO`, which has no static parameter. The fused arm (`:1586`) uses the library's cast device for an arm whose type the `typecase` cannot show (F-264), as `__builtinFactory1`'s `N[\0\]` arm does (`:2740`). So the distance holds no site of an unwritten argument or of the fused arm. The checker now infers such an unwritten argument itself (F-364); the library's sites stay written. Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`; `PureList`'s, at `Library/PureList.fss:73`, answers a list of objects at their elements' run-time types, and a list of `ZZ32` or `String` at its element type (row 824). Tests: the distance stage (`explorations/coordinator/tools/distance/run.sh`, its typecheck kind 0); `tests/WrittenReductionArgumentsWalk`; `tests/NestedReductionFusion`; `tests/PureListStridedSubscriptWalk`. Detail: `compile-ladder/rung-body-arguments/REPORT.md`, sections 3, 5, 7 and 9.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

## F-286, changed

- Size: at the base 1146 characters; at the landing 1146 characters; now 1146 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-286 **The api's `String` writes `abstract` on every member that its component's trait leaves without a body, and every string object defines them.** `Library/FortressLibrary.fsi:2593-2668` writes 14 of `String`'s members `abstract`: `size`, `depth`, `asFlatString`, `isBalanced`, `verify`, `asDebugStringIndented`, `get`, `uncheckedSubstring`, `rangeContains`, `splitWithOffsets`, `split`, `balanced`, `opr ||(self, c:Char)` and `writeOn`. The component's trait (`Library/FortressLibrary.fss:4512-4648`) declares all 14, none with a body. `FlatString`, `CatString`, `EmptyString` and `SubString` each define all 14 under walk. `String`'s `excludes` clause is `{ Number, Char, AnyMultiplicativeRing }` on both sides; `AnyList` states its exclusion of `String` itself (`Library/List.fsi:55`). So `String` has no entry in the `FortressLibrary` export error (F-282). `CatString`'s `rangeContains` answers what its flat halves answer, so it carries row 607's miss. Gated by `ProjectFortress/tests/StringMembersPromisedWalk.fss` and by the distance stage's per-site list. Detail: `compile-ladder/rung-string-members/REPORT.md`, sections 1, 2 and 5.

Now:

- F-286 **The api's `String` writes `abstract` on every member that its component's trait leaves without a body, and every string object defines them.** `Library/FortressLibrary.fsi:2583-2658` writes 14 of `String`'s members `abstract`: `size`, `depth`, `asFlatString`, `isBalanced`, `verify`, `asDebugStringIndented`, `get`, `uncheckedSubstring`, `rangeContains`, `splitWithOffsets`, `split`, `balanced`, `opr ||(self, c:Char)` and `writeOn`. The component's trait (`Library/FortressLibrary.fss:4596-4732`) declares all 14, none with a body. `FlatString`, `CatString`, `EmptyString` and `SubString` each define all 14 under walk. `String`'s `excludes` clause is `{ Number, Char, AnyMultiplicativeRing }` on both sides; `AnyList` states its exclusion of `String` itself (`Library/List.fsi:55`). So `String` has no entry in the `FortressLibrary` export error (F-282). `CatString`'s `rangeContains` answers what its flat halves answer, so it carries row 607's miss. Gated by `ProjectFortress/tests/StringMembersPromisedWalk.fss` and by the distance stage's per-site list. Detail: `compile-ladder/rung-string-members/REPORT.md`, sections 1, 2 and 5.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

## F-291, changed

- Size: at the base 1203 characters; at the landing 1322 characters; now 1322 characters, over 600.
- Section now: "Execution model".

At the base:

- F-291 **With the bound `Any`, the compiled path compiles, loads and runs generics at tuple and arrow static arguments as it does with `extends Any` written; `()` fails whatever the bound (row 339), and so does a generic dotted method with one tuple-typed parameter (row 832).** Measured once: generic functions, objects and traits, dispatch to a generic arm and `typecase`, at a pair or an arrow, with the static argument written or inferred. The class loader made the same classes by name, and the program jars read the same under `javap`, as the same programs with `extends Any` written under the compile command's bound `Object`. So the switch to the bound `Any` costs the run time no work for these shapes; its test cost is F-292. Not run: the one library's own instantiations at tuples, tuples of three or more and nested ones, generic functional methods at a tuple, a native that receives a tuple. With `extends Object` written, they are refused, or pass unchecked where the static argument is written (row 470); the compile command's bound is `Any` (`Shell.java:372`). No gated test. Detail: `perf-probes/bound-any-compiled/REPORT.md`, "The shapes by setting" and "What the class loader makes".

Now:

- F-291 **With the bound `Any`, the compiled path compiles, loads and runs generics at tuple and arrow static arguments as it does with `extends Any` written; `()` fails whatever the bound (row 339), and so does a generic operator whose one parameter has the type parameter's type, applied to a tuple (row 1056).** Measured once: generic functions, objects and traits, dispatch to a generic arm and `typecase`, at a pair or an arrow, with the static argument written or inferred. The class loader made the same classes by name, and the program jars read the same under `javap`, as the same programs with `extends Any` written under the compile command's bound `Object`. So the switch to the bound `Any` costs the run time no work for these shapes; its test cost is F-292. A generic dotted method with one tuple-typed parameter runs (row 832, fixed since). Not run: the one library's own instantiations at tuples, tuples of three or more and nested ones, generic functional methods at a tuple, a native that receives a tuple. With `extends Object` written, they are refused, or pass unchecked where the static argument is written (row 470); the compile command's bound is `Any` (`Shell.java:372`). No gated test. Detail: `perf-probes/bound-any-compiled/REPORT.md`, "The shapes by setting" and "What the class loader makes".

History blocks of the range:

- Written by the gather: 2026-11-17 09:14Z · rewritten · from `explorations/compile-ladder/rung-tuple-parameter/REPORT.md`, "Points to report" · by climb batch 31b gather: rung T of climb batch 31b: row 832 fixed, the generic operator at a tuple instance is row 1056 (cites [S3])

Report sections that the entry cites: [S21] `perf-probes/bound-any-compiled/REPORT.md`, "The shapes by setting".

## F-296, changed

- Size: at the base 1136 characters; at the landing 1151 characters; now 1151 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-296 **`fortress compile` bounds a type parameter declared without a bound by `Any`, as walk does.** `Shell.useCompilerLibraries()` turns the extends-`Object` pre-desugaring off (`ProjectFortress/src/com/sun/fortress/Shell.java:372`), so the twelve commands of `Shell.java:402-460` that call it, `compile`, `link`, `build`, `typecheck`, `api`, `compare`, `parse`, `unparse`, `disambiguate`, `desugar`, `grammar` and `test-coercion`, read an empty `extends` clause as `Any` (P-42). Tuple and arrow static arguments compile. The distance stage's default setting, `compile`, reads that line at each run and gives 0, `#crash none` (F-289). The No Duplicates Rule now refuses `g[\T\](a: T)` beside `g(a: Any)` on the compile command too (row 759). Until the switch-over, a generic that concatenates such a value onto a `String`, or prints it, bounds it by `Object`, for the prelude's `||`, `print` and `println` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:37`, `:55`, `:61`). Rows 339 and 832 are reached and stay open. Test: `compiler_tests/ImplicitBoundAny`. Detail: `compile-ladder/rung-bound-any/REPORT.md`, sections 5 and 6.

Now:

- F-296 **`fortress compile` bounds a type parameter declared without a bound by `Any`, as walk does.** `Shell.useCompilerLibraries()` turns the extends-`Object` pre-desugaring off (`ProjectFortress/src/com/sun/fortress/Shell.java:372`), so the twelve commands of `Shell.java:402-460` that call it, `compile`, `link`, `build`, `typecheck`, `api`, `compare`, `parse`, `unparse`, `disambiguate`, `desugar`, `grammar` and `test-coercion`, read an empty `extends` clause as `Any` (P-42). Tuple and arrow static arguments compile. The distance stage's default setting, `compile`, reads that line at each run and gives 0, `#crash none` (F-289). The No Duplicates Rule now refuses `g[\T\](a: T)` beside `g(a: Any)` on the compile command too (row 759). Until the switch-over, a generic that concatenates such a value onto a `String`, or prints it, bounds it by `Object`, for the prelude's `||`, `print` and `println` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:37`, `:55`, `:61`). Row 339 is reached and stays open; row 832 is fixed since. Test: `compiler_tests/ImplicitBoundAny`. Detail: `compile-ladder/rung-bound-any/REPORT.md`, sections 5 and 6.

History blocks of the range:

- Written by the gather: 2026-11-17 09:14Z · rewritten · from `explorations/compile-ladder/rung-tuple-parameter/REPORT.md`, "Points to report" · by climb batch 31b gather: rung T of climb batch 31b: row 832 fixed (cites [S3])

## F-299, changed

- Size: at the base 3108 characters; at the landing 3073 characters; now 3073 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 374 of the one library's 402 live bindings name one.** It builds P-58, "Every native binding is a ...", whose compiled half F-298 gives. The loader (`interpreter/glue/StaticNativeApp.java`) calls the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. It refuses at load a string that names no helper or fits none, and a declared type that no Java type carries, `self`'s among them, read from the declaring type. For 15 names it runs walk's own operations instead and loads no helper: eight by the table `OWN_OPERATIONS` of `interpreter/glue/NativeApp.java`, `stringOps.typeName` and `equality.sEquiv` (F-328) and `runtime`'s six (F-335), and `arrayOps`' seven by one rule (F-333). The library's own `FlatString`, identified by the component that declares it, carries `self` in a Java `String`; a program's own type named `FlatString` or `JavaString` carries none. The `fortress-repo` skill's `references/interpreter.md`, "Natives", gives the carriers, the messages, the refusal of a helper parameter declared `String`, and the loader's departures (rows 864, 551 and 846). The 374 by type: `ZZ32` 29 and `Int` 3, `ZZ64` 31 and `ZZ` 28 (F-306, F-327, F-331; their `CHOOSE` F-305, `REM` and `MOD` F-312, divisors F-314), `Float` 62 and the top-level `fromRawBits` (F-303, F-323), `RR32` 51 (F-310, its `asFloat` F-311), the `asFloat`s of `Long` and `BigNum` 2 (F-311), the small rest 8 (F-307), the two that round a numeral once into `RR64` and `RR32` (F-79), and `NN32` 30, `NN64` 28, `UnsignedLong` 3 and `Char` 40 (F-308, F-313, F-327, F-331), the top-level `nanoTime` (F-314) and `random` (F-323), `Object`'s `ilkName` and `SEQV` over `Any` (F-328), `JavaBufferedWriter`'s 7 (F-330), `JavaBufferedReader`'s 10 (F-332), the array stores' 7 (F-333), `runtime`'s 6 (F-335), `System`'s `args` 2 (F-337), and the string family's 20: `FlatString`'s 13 methods; `natLineSeparator`; `match`; and `printThreadInfo`, `printWithThread`, `printlnWithThread`, `getEnvironment` and `getProperty`, each a native over `FlatString` beside an overload over `String` that flattens in a `typecase`. The other 28 name glue classes, `Reflect`'s (F-32). Test: `tests/NativeHelperBindingWalk.fss`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk`, `compiler_tests/NativeHelperFamilyStringCompiled`, and the refusals `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, `NativeHelperUncarriedSelf*Walk` and `NativeHelperNonFlatStringWalk`; the entries of the other families name their own tests. Detail: `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why"; `compile-ladder/rung-string-natives/REPORT.md`, "What changed and why".

Now:

- F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 373 of the one library's 401 live bindings name one.** It builds P-58, "Every native binding is a ...", whose compiled half F-298 gives. The loader (`interpreter/glue/StaticNativeApp.java`) calls the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. It refuses at load a string that names no helper or fits none, and a declared type that no Java type carries, `self`'s among them, read from the declaring type. For 15 names it runs walk's own operations instead and loads no helper: eight by the table `OWN_OPERATIONS` of `interpreter/glue/NativeApp.java`, `stringOps.typeName` and `equality.sEquiv` (F-328) and `runtime`'s six (F-335), and `arrayOps`' seven by one rule (F-333). The library's own `FlatString`, identified by the component that declares it, carries `self` in a Java `String`; a program's own type named `FlatString` or `JavaString` carries none. The `fortress-repo` skill's `references/interpreter.md`, "Natives", gives the carriers, the messages, the refusal of a helper parameter declared `String`, and the loader's departures (rows 864, 551 and 846). The 373 by type: `ZZ32` 32, `ZZ64` 31 and `ZZ` 28 (F-306, F-327, F-331; their `CHOOSE` F-305, `REM` and `MOD` F-312, divisors F-314), `RR64` 61 and the top-level `fromRawBits` (F-303, F-323), `RR32` 51 (F-310, its `asFloat` F-311), the `asFloat`s of `ZZ64` and `ZZ` 2 (F-311), the small rest 8 (F-307), the two that round a numeral once into `RR64` and `RR32` (F-79), and `NN32` 30, `NN64` 31 and `Char` 40 (F-308, F-313, F-327, F-331), the top-level `nanoTime` (F-314) and `random` (F-323), `Object`'s `ilkName` and `SEQV` over `Any` (F-328), `JavaBufferedWriter`'s 7 (F-330), `JavaBufferedReader`'s 10 (F-332), the array stores' 7 (F-333), `runtime`'s 6 (F-335), `System`'s `args` 2 (F-337), and the string family's 20: `FlatString`'s 13 methods; `natLineSeparator`; `match`; and `printThreadInfo`, `printWithThread`, `printlnWithThread`, `getEnvironment` and `getProperty`, each a native over `FlatString` beside an overload over `String` that flattens in a `typecase`. The other 28 name glue classes, `Reflect`'s (F-32). Test: `tests/NativeHelperBindingWalk.fss`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk`, `compiler_tests/NativeHelperFamilyStringCompiled`, and the refusals `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, `NativeHelperUncarriedSelf*Walk` and `NativeHelperNonFlatStringWalk`; the entries of the other families name their own tests. Detail: `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why"; `compile-ladder/rung-string-natives/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 09:18Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "Sentences of the specification" · by climb batch 31b gather: rung O of climb batch 31b: the count is 373 of 401, by the objects' names (changes.tex's Effect) (cites [S22])

Report sections that the entry cites: [S23] `references/interpreter.md`, "Natives"; [S24] `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; [S25] `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; [S26] `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why"; [S27] `compile-ladder/rung-string-natives/REPORT.md`, "What changed and why".

## F-302, changed

- Size: at the base 1318 characters; at the landing 1318 characters; now 1318 characters, over 600.
- Section now: "Execution model".

At the base:

- F-302 **In those loops C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default, and a temporary box whose constructor chain passes the limit is no longer removed.** At JDK 25's default `MaxInlineLevel=15` a frame at depth d inlines when d is at most 16. The prelude's `+` reaches `Object.<init>` under its result's box at depth 12, a top-level binding at 10. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration, since its temporaries' chains no longer inlined. So an operator called from more than 4 further inlined frames keeps its temporary boxes. By reading, the one library's `ZZ32` springboard chain is two classes longer than the prelude's, `ZZ32`, `AnyIntegral`, `Number`, `AnyAdditiveGroup`, `Object`, `Any` (`Library/FortressLibrary.fss:776`, `:672`, `:381`, `:357`) against `ZZ32`, `Number`, `Object`, `Any` (`LibraryBuiltin/CompilerBuiltin.fsi:210`), since a springboard extends the springboard of its trait's first `extends` entry (`compiler/codegen/CodeGen.java:5595-5602`). If `FZZ32` extends the one library's springboard after the switch-over, the margin is 2 frames; not measured, since nothing compiles against the one library yet. Observed once (F-301). Detail: `perf-probes/helper-calls/REPORT.md` sections 3 and 4.

Now:

- F-302 **In those loops C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default, and a temporary box whose constructor chain passes the limit is no longer removed.** At JDK 25's default `MaxInlineLevel=15` a frame at depth d inlines when d is at most 16. The prelude's `+` reaches `Object.<init>` under its result's box at depth 12, a top-level binding at 10. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration, since its temporaries' chains no longer inlined. So an operator called from more than 4 further inlined frames keeps its temporary boxes. By reading, the one library's `ZZ32` springboard chain is two classes longer than the prelude's, `ZZ32`, `AnyIntegral`, `Number`, `AnyAdditiveGroup`, `Object`, `Any` (`Library/FortressLibrary.fss:846`, `:742`, `:381`, `:357`) against `ZZ32`, `Number`, `Object`, `Any` (`LibraryBuiltin/CompilerBuiltin.fsi:210`), since a springboard extends the springboard of its trait's first `extends` entry (`compiler/codegen/CodeGen.java:5728-5735`). If `FZZ32` extends the one library's springboard after the switch-over, the margin is 2 frames; not measured, since nothing compiles against the one library yet. Observed once (F-301). Detail: `perf-probes/helper-calls/REPORT.md` sections 3 and 4.

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the line citation of `CodeGen.java` moved by climb batch 31's landing, checked at its member in the worktree (cites [S2])
- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

## F-303, changed

- Size: at the base 1760 characters; at the landing 1485 characters; now 1485 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-303 **Walk carries a declared `Float` in a Java `double`, as it carries `RR64`, so a helper binding with a parameter or result declared `Float` loads; 57 of `Float`'s 62 bindings, and the top-level `fromRawBits`, name `simpleDoubleArith`'s helpers, and every value they give under walk is the glue classes'.** `javaFor` names `Float` beside `RR64` (`interpreter/glue/StaticNativeApp.java:64`); without it walk refused such a binding at load, 'no Java type carries the declared type of parameter a.' The 57 are `asString`, `asExprString`, `|self|`, the five comparisons, unary `-`, `+`, `-`, `DOT`, `TIMES`, juxtaposition, `/`, `SQRT`, `^` at a `Float` and at an `RR64` exponent, the eight elementary functions, `floor`, `ceiling`, `truncate` and `round`, over helpers that existed; and `isNaN`, `isInfinite`, `rawBits`, `nextUp`, `nextDown`, `narrow`, `=/=`, `MIN`, `MAX` and the 18 directed roundings, over 27 new one-line helpers, with `fromRawBits` over a 28th (`LibraryBuiltin/FortressBuiltin.fss:61-206`; `Library/FortressLibrary.fss:4706`; `nativeHelpers/simpleDoubleArith.java:136-246`). Its other 5 have no fitting helper and still name glue classes: `^` at `RR32` and `AnyIntegral`, `atan2`, and the floor and ceiling brackets `|\self/|` and `|/self\|` (`LibraryBuiltin/FortressBuiltin.fss:163-201`). F-299 counts the bindings that name a helper. Test: `tests/NativeHelperFloatCarriedWalk.fss`, with `tests/NativeHelperFamilyFloatWalk.fss`, `tests/NativeHelperFamilyFloatBitsWalk.fss`, `compiler_tests/NativeHelperFamilyFloatCompiled` and `compiler_tests/NativeHelperFamilyFloatBitsCompiled`. Detail: `compile-ladder/rung-natives-float/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-float-bits/REPORT.md`, "What changed and why".

Now:

- F-303 **Walk carries `RR64` in a Java `double`, so a helper binding with a parameter or result declared `RR64` loads; the object `RR64`'s 61 bindings, and the top-level `fromRawBits`, name `simpleDoubleArith`'s helpers, and every value they give under walk is the glue classes'.** `javaFor` maps `RR64` to `double` (`interpreter/glue/StaticNativeApp.java:64`); a type named `Float` is undefined. The 61 (`Library/FortressLibrary.fss:384-576`) are `asString`, `asExprString`, `|self|`, the six comparisons with `=` and `=/=`, `MIN`, `MAX`, unary `-`, `+`, `-`, `DOT`, `TIMES`, juxtaposition, `/`, `SQRT`, `^` at an `RR64`, an `RR32` and a `ZZ32` exponent, the nine elementary functions with `atan2`, `floor`, `ceiling`, the floor and ceiling brackets, `truncate`, `round`, `isNaN`, `isInfinite`, `rawBits`, `nextUp`, `nextDown`, `narrow` and the 18 directed roundings; `fromRawBits` is at `Library/FortressLibrary.fss:4790` (`nativeHelpers/simpleDoubleArith.java`). F-299 counts the bindings that name a helper. Test: `tests/NativeHelperFloatCarriedWalk.fss`, with `tests/NativeHelperFamilyFloatWalk.fss`, `tests/NativeHelperFamilyFloatBitsWalk.fss`, `compiler_tests/NativeHelperFamilyFloatCompiled` and `compiler_tests/NativeHelperFamilyFloatBitsCompiled`. Detail: `compile-ladder/rung-natives-float/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-float-bits/REPORT.md`, "What changed and why"; `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 09:18Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung O of climb batch 31b: Float is gone, RR64 holds its bindings; the list read from the file (cites [S28])

Report sections that the entry cites: [S29] `compile-ladder/rung-natives-float/REPORT.md`, "What changed and why"; [S30] `compile-ladder/rung-natives-float-bits/REPORT.md`, "What changed and why"; [S28] `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why".

## F-305, changed

- Size: at the base 1479 characters; at the landing 1468 characters; now 1468 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-305 **`CHOOSE` on `ZZ32` and `ZZ64` names its helper on both paths, and the helper is exact, raises `IntegerOverflow` where the binomial coefficient does not fit, and shares no state between calls.** It builds P-73. Trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE` name `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose` (`Library/FortressLibrary.fss:845`, `:954`), which the compiler's prelude binds too, `NN32`'s compiled `CHOOSE` through the `ZZ64` helper; `NN32`'s binding in the one library names `simpleUnsignedIntArith.unsignedIntOverflowingChoose` through the `NN32` transfer (F-313). Past their safe-bound tables every coefficient overflows, from `34 CHOOSE 17` on `ZZ32` and `68 CHOOSE 34` on `ZZ64`, and the helpers raise `IntegerOverflow` there (`nativeHelpers/simpleIntArith.java:222-225`, `simpleLongArith.java:200-203`); each slow-path call has its own scratch array (`simpleIntArith.java:174-175`, `simpleLongArith.java:153-154`), so calls in parallel no longer corrupt each other. Swept against the exact value, 64,649,240 `ZZ64` pairs and 6,023,925 `ZZ32` pairs give walk's glue arithmetic. Test: `tests/ChooseHelperWalk.fss`, `tests/ChooseHelperZZ64Walk.fss`, `compiler_tests/ChooseHelperCompiled`, `compiler_tests/ChooseHelperZZ64Compiled`, `compiler_tests/ChooseTableCompiledRungE`; the guards `tests/ChooseZZ32Walk.fss` and `tests/ChooseZZ64Walk.fss`. Detail: `compile-ladder/rung-natives-choose/REPORT.md`, sections 1, 2 and 5.

Now:

- F-305 **`CHOOSE` on `ZZ32` and `ZZ64` names its helper on both paths, and the helper is exact, raises `IntegerOverflow` where the binomial coefficient does not fit, and shares no state between calls.** It builds P-73. `ZZ32`'s and `ZZ64`'s `CHOOSE` name `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose` (`Library/FortressLibrary.fss:918`, `:1030`), which the compiler's prelude binds too, `NN32`'s compiled `CHOOSE` through the `ZZ64` helper; `NN32`'s binding in the one library names `simpleUnsignedIntArith.unsignedIntOverflowingChoose` through the `NN32` transfer (F-313). Past their safe-bound tables every coefficient overflows, from `34 CHOOSE 17` on `ZZ32` and `68 CHOOSE 34` on `ZZ64`, and the helpers raise `IntegerOverflow` there (`nativeHelpers/simpleIntArith.java:222-225`, `simpleLongArith.java:200-203`); each slow-path call has its own scratch array (`simpleIntArith.java:174-175`, `simpleLongArith.java:153-154`), so calls in parallel no longer corrupt each other. Swept against the exact value, 64,649,240 `ZZ64` pairs and 6,023,925 `ZZ32` pairs give walk's glue arithmetic. Test: `tests/ChooseHelperWalk.fss`, `tests/ChooseHelperZZ64Walk.fss`, `compiler_tests/ChooseHelperCompiled`, `compiler_tests/ChooseHelperZZ64Compiled`, `compiler_tests/ChooseTableCompiledRungE`; the guards `tests/ChooseZZ32Walk.fss` and `tests/ChooseZZ64Walk.fss`. Detail: `compile-ladder/rung-natives-choose/REPORT.md`, sections 1, 2 and 5.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: rung O made the five number types objects (F-379) and removed walk's native objects; the entry named them as they stood before; lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

## F-306, changed

- Size: at the base 1274 characters; at the landing 1307 characters; now 1307 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-306 **Under walk, trait `ZZ64`'s 26 and trait `ZZ`'s 22 native bindings name helpers of `nativeHelpers/`, keep every value the glue classes gave, and their `DIV` by zero throws `DivisionByZero`.** The 48 (`Library/FortressLibrary.fss:878-985`, `:1089-1195`) name 29 helpers of `simpleLongArith`, `simpleIntArith`, `simpleUnsignedLongArith` and `simpleArbitraryPrecisionArith`, those that the compiler's prelude binds for the same operations, and 11 new ones, four of `REM` and `MOD` (F-312) and seven of the divisors, `ZZ`'s `CHOOSE` and `cmp` (F-314); `ZZ64`'s four wrapping bindings name the wrapping helpers that the prelude binds under its `BOX` spellings (row 348). `longOverflowingDiv` and `div` raise the library's `DivisionByZero` under walk (F-24); `REM` and `MOD` name the new helpers, and raise `DivisionByZero` at a zero divisor too (F-312). A `ZZ` helper takes only a `BigNum` value, since walk's loader unboxes a `BigInteger` by `getBigInteger`; walk's coercions convert another integer operand first. Test: `tests/NativeHelperFamilyIntegersWalk.fss`, `tests/ZZ64DivisionByZeroWalk.fss`, `tests/ZZDivisionByZeroWalk.fss`, `compiler_tests/NativeHelperFamilyIntegersCompiled`. Detail: `compile-ladder/rung-natives-integers/REPORT.md`, "What changed and why".

Now:

- F-306 **Under walk, 26 native bindings of the object `ZZ64` and 22 of the object `ZZ` name helpers of `nativeHelpers/`, keep every value the glue classes gave, and their `DIV` by zero throws `DivisionByZero`.** The 48 (in `Library/FortressLibrary.fss:951-1061` and `:1170-1279`) name 29 helpers of `simpleLongArith`, `simpleIntArith`, `simpleUnsignedLongArith` and `simpleArbitraryPrecisionArith`, those that the compiler's prelude binds for the same operations, and 11 new ones, four of `REM` and `MOD` (F-312) and seven of the divisors, `ZZ`'s `CHOOSE` and `cmp` (F-314); `ZZ64`'s four wrapping bindings name the wrapping helpers that the prelude binds under its `BOX` spellings (row 348). `longOverflowingDiv` and `div` raise the library's `DivisionByZero` under walk (F-24); `REM` and `MOD` name the new helpers, and raise `DivisionByZero` at a zero divisor too (F-312). A `ZZ` helper takes only a `ZZ` value, walk's `FBigNum`, since walk's loader unboxes a `BigInteger` by `getBigInteger`; walk's coercions convert another integer operand first. Test: `tests/NativeHelperFamilyIntegersWalk.fss`, `tests/ZZ64DivisionByZeroWalk.fss`, `tests/ZZDivisionByZeroWalk.fss`, `compiler_tests/NativeHelperFamilyIntegersCompiled`. Detail: `compile-ladder/rung-natives-integers/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 09:18Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung O of climb batch 31b: the traits are objects now, the lines moved (cites [S28])
- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: rung O made the five number types objects (F-379) and removed walk's native objects; the entry named them as they stood before

Report sections that the entry cites: [S31] `compile-ladder/rung-natives-integers/REPORT.md`, "What changed and why".

## F-307, changed

- Size: at the base 1022 characters; at the landing 1106 characters; now 1106 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-307 **The small rest's eight native bindings name their helpers of `nativeHelpers/`, and walk's values are unchanged: `Long`'s and `BigNum`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint` and the top-level `char`.** They are at `LibraryBuiltin/FortressBuiltin.fss:389`, `:391`, `:524`, `:545`, `:547`, `:595` and `Library/FortressLibrary.fss:1080`, `:4711`; the four over `NN32`, `NN64` and `Char` name the special names that the checker reads at those types (`compiler/NamingCzar.java:369-380`). `signed` above the signed half wraps, as a low-bits name does (F-331), and `char` keeps a code point outside 0 to 1114111, as the glue classes did (row 857). The top-level `printlnWithThread` and `getProperty` are natives over `FlatString` on helpers, beside overloads over `String` that flatten (F-299). Test: `tests/NativeHelperFamilySmallWalk.fss` and `compiler_tests/NativeHelperFamilySmallCompiled`. Detail: `compile-ladder/rung-natives-small/REPORT.md`, "What changed and why".

Now:

- F-307 **The small rest's eight native bindings name their helpers of `nativeHelpers/`, and walk's values are unchanged: `ZZ64`'s and `ZZ`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint` and the top-level `char`.** They are in the objects `ZZ64`, `ZZ` and `NN64` of `Library/FortressLibrary.fss` (`:951`, `:1170`, `:1063`), in `NN32` and `Char` of `LibraryBuiltin/FortressBuiltin.fss`, and the top-level `char` of `Library/FortressLibrary.fss`; the four over `NN32`, `NN64` and `Char` name the special names that the checker reads at those types (`compiler/NamingCzar.java:369-380`). `signed` above the signed half wraps, as a low-bits name does (F-331), and `char` keeps a code point outside 0 to 1114111, as the glue classes did (row 857). The top-level `printlnWithThread` and `getProperty` are natives over `FlatString` on helpers, beside overloads over `String` that flatten (F-299). Test: `tests/NativeHelperFamilySmallWalk.fss` and `compiler_tests/NativeHelperFamilySmallCompiled`. Detail: `compile-ladder/rung-natives-small/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 09:18Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung O of climb batch 31b: Long and BigNum are gone, their getters are ZZ64's and ZZ's (cites [S28])

Report sections that the entry cites: [S32] `compile-ladder/rung-natives-small/REPORT.md`, "What changed and why".

## F-308, changed

- Size: at the base 2130 characters; at the landing 2038 characters; now 2038 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-308 **A `builtinPrimitive` binding over `NN32`, `NN64` or `Char` whose helper takes or answers a Java `int` or `long` compiles on the compiled path through the six transfer helpers, and `NN32`'s 30, `NN64`'s 27, `UnsignedLong`'s 3 and `Char`'s 40 bindings name their helpers.** Where the declaration says `NN32`, `NN64` or `Char`, or an argument `UnsignedLong`, walk's object of `NN64` (F-313), and the helper has an `int` or a `long`, the rewrite of F-298 wraps that argument, or the call, in the matching transfer, as the compiler's prelude does; walk needs none. A helper overloaded at its arity gets no transfer (row 885), nor does `self` in a generic owner; the declared type is read by its simple name (row 886). The transfers are identities, so the checker passes whatever the helper computes: a binding over `NN32` to the signed `simpleIntArith.intLT` compiles and answers `true` for 2^31 < 1, as walk does; only the walk and compiled guards check that each of them but `Char`'s `asExprString` and F-327's six shifts and powers, which its own tests check, names the unsigned helper. Under walk those 93 keep the glue classes' values, but `NN32`'s and `NN64`'s `DIV`, `REM` and `MOD` by zero throw `DivisionByZero`. All 100 bindings over these types name helpers, `UnsignedLong`'s `asFloat` at `RR64` among them; `Char`'s `asExprString` names `simpleChar.charToExprString` (F-329). The `fortress-repo` skill's `references/compiler.md`, "Natives", names the transfers. Test: `compiler_tests/NativeHelperTransferCompiled`; the guards `NativeHelperFamilyNN32Compiled`, `NativeHelperFamilyNN64Compiled`, `NativeHelperFamilyCharCompiled`, `NativeHelperFamilyAsFloatCompiled`, `NativeHelperFamilyUnsignedCompiled` and `tests/NativeHelperFamilyNN32Walk`, `NativeHelperFamilyUnsignedWalk`, `NativeHelperFamilyNN64Walk`, `NativeHelperFamilyCharWalk`; `tests/NN32DivisionByZeroWalk`, `NN64DivisionByZeroWalk`. Detail: `compile-ladder/climb-batch-27/RECORD.md`, "The count of the bindings"; `compile-ladder/rung-natives-hard/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-natives-hard/SKEPTIC.md`, "The failure mode".

Now:

- F-308 **A `builtinPrimitive` binding over `NN32`, `NN64` or `Char` whose helper takes or answers a Java `int` or `long` compiles on the compiled path through the six transfer helpers, and `NN32`'s 30, `NN64`'s 30 and `Char`'s 40 bindings name their helpers.** Where the declaration says `NN32`, `NN64` or `Char`, and the helper has an `int` or a `long`, the rewrite of F-298 wraps that argument, or the call, in the matching transfer, as the compiler's prelude does; walk needs none. A helper overloaded at its arity gets no transfer (row 885), nor does `self` in a generic owner; the declared type is read by its simple name (row 886). The transfers are identities, so the checker passes whatever the helper computes: a binding over `NN32` to the signed `simpleIntArith.intLT` compiles and answers `true` for 2^31 < 1, as walk does; only the walk and compiled guards check that each of them but `Char`'s `asExprString` and F-327's six shifts and powers, which its own tests check, names the unsigned helper. Under walk those 93 keep the glue classes' values, but `NN32`'s and `NN64`'s `DIV`, `REM` and `MOD` by zero throw `DivisionByZero`. All 100 bindings over these types name helpers, `NN64`'s `asFloat` at `RR64` among them; `Char`'s `asExprString` names `simpleChar.charToExprString` (F-329). The `fortress-repo` skill's `references/compiler.md`, "Natives", names the transfers. Test: `compiler_tests/NativeHelperTransferCompiled`; the guards `NativeHelperFamilyNN32Compiled`, `NativeHelperFamilyNN64Compiled`, `NativeHelperFamilyCharCompiled`, `NativeHelperFamilyAsFloatCompiled`, `NativeHelperFamilyUnsignedCompiled` and `tests/NativeHelperFamilyNN32Walk`, `NativeHelperFamilyUnsignedWalk`, `NativeHelperFamilyNN64Walk`, `NativeHelperFamilyCharWalk`; `tests/NN32DivisionByZeroWalk`, `NN64DivisionByZeroWalk`. Detail: `compile-ladder/climb-batch-27/RECORD.md`, "The count of the bindings"; `compile-ladder/rung-natives-hard/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-natives-hard/SKEPTIC.md`, "The failure mode".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: rung O made the five number types objects (F-379) and removed walk's native objects; the entry named them as they stood before; `UnsignedLong`'s three bindings are `NN64`'s now

Report sections that the entry cites: [S33] `references/compiler.md`, "Natives"; [S34] `compile-ladder/climb-batch-27/RECORD.md`, "The count of the bindings"; [S35] `compile-ladder/rung-natives-hard/REPORT.md`, "1. What changed and why"; [S36] `compile-ladder/rung-natives-hard/SKEPTIC.md`, "The failure mode".

## F-310, changed

- Size: at the base 940 characters; at the landing 935 characters; now 935 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-310 **50 of value object `RR32`'s 51 native bindings name helpers, and every value they give under walk is the glue class `RR32`'s.** 49 name the 46 helpers of `simpleFloatArith`, over a Java `float`: walk carries a declared `RR32` in a `float` (`interpreter/glue/StaticNativeApp.java:65`) and the checker reads a `float` as `RR32`, so each binding fits as a bare string, and the distance stage checks it. `asString` and `asExprString` share `floatToString`, and `DOT`, `TIMES` and juxtaposition `floatMul`. The 50th, `asFloat`, names `simpleDoubleArith.floatToDouble` at `RR64` (F-311). The 51st, `^` at a `Float` exponent, still names a glue class. No file of the compiler's prelude imports `simpleFloatArith`. F-299 counts the bindings that name a helper. Test: `tests/NativeHelperFamilyRR32Walk.fss`, with `compiler_tests/NativeHelperFamilyRR32Compiled`. Detail: `compile-ladder/rung-natives-rr32/REPORT.md`, "What changed and why".

Now:

- F-310 **Each of value object `RR32`'s 51 native bindings names a helper, and every value they give under walk is the glue class `RR32`'s.** 50 name 47 helpers of `simpleFloatArith`, over a Java `float`: walk carries a declared `RR32` in a `float` (`interpreter/glue/StaticNativeApp.java:65`) and the checker reads a `float` as `RR32`, so each binding fits as a bare string, and the distance stage checks it. `asString` and `asExprString` share `floatToString`, and `DOT`, `TIMES` and juxtaposition `floatMul`. `^` at an `RR64` exponent names `floatPowDouble` (F-323). The 51st, `asFloat`, names `simpleDoubleArith.floatToDouble` at `RR64` (F-311). No file of the compiler's prelude imports `simpleFloatArith`. F-299 counts the bindings that name a helper. Test: `tests/NativeHelperFamilyRR32Walk.fss`, with `compiler_tests/NativeHelperFamilyRR32Compiled`. Detail: `compile-ladder/rung-natives-rr32/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: every one of `RR32`'s 51 bindings names a helper since e4872ad938 (F-323): 50 name 47 helpers of `simpleFloatArith`, `^` at the exponent rung O renamed `RR64` naming `floatPowDouble`, by grep of `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:65-230`

Report sections that the entry cites: [S37] `compile-ladder/rung-natives-rr32/REPORT.md`, "What changed and why".

## F-311, changed

- Size: at the base 794 characters; at the landing 681 characters; now 681 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-311 **`Int`'s, `RR32`'s, `NN32`'s, `Long`'s and `BigNum`'s `asFloat` answer `RR64`, as each type's own `asFloat` declares in its api (F-324), and name `nativeHelpers`' `intToDouble`, `floatToDouble`, `unsignedIntToDouble`, `longToDouble` and `toDouble`; walk's values are unchanged.** The specification: `numbers.tex:61`. At `Float`, the team's declared result, the checker refused the move ('Function body has type RR64, but declared return type is Float.'); walk carries both in a `double` and answers the same `Float` object (F-303). `longToDouble` and `toDouble` are new, `(double) a` and `a.doubleValue()`. Tests: `tests/NativeHelperFamilyAsFloatWalk`, `compiler_tests/NativeHelperFamilyAsFloatCompiled`. Detail: `compile-ladder/rung-natives-asfloat/REPORT.md`, "What changed and why".

Now:

- F-311 **`ZZ32`'s, `RR32`'s, `NN32`'s, `ZZ64`'s and `ZZ`'s `asFloat` answer `RR64`, as each type's own `asFloat` declares in its api (F-324), and name `nativeHelpers`' `intToDouble`, `floatToDouble`, `unsignedIntToDouble`, `longToDouble` and `toDouble`; walk's values are unchanged.** The specification: `numbers.tex:61`. The team declared the result `Float`, a name that is gone; walk carries an `RR64` in a `double` (F-303). `longToDouble` and `toDouble` are new, `(double) a` and `a.doubleValue()`. Tests: `tests/NativeHelperFamilyAsFloatWalk`, `compiler_tests/NativeHelperFamilyAsFloatCompiled`. Detail: `compile-ladder/rung-natives-asfloat/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 09:18Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung O of climb batch 31b: Int, Long, BigNum and Float are gone (cites [S28])

Report sections that the entry cites: [S38] `compile-ladder/rung-natives-asfloat/REPORT.md`, "What changed and why".

## F-312, changed

- Size: at the base 1300 characters; at the landing 1302 characters; now 1302 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-312 **`REM` and `MOD` on `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` name helpers of `nativeHelpers/` on both paths, keep every value the glue classes gave, and throw `DivisionByZero` at a zero divisor.** The ten bindings (`Library/FortressLibrary.fss:837-840`, `:946-949`, `:1049-1052`, `:1164-1167`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:493-496`) name `simpleIntArith.intRem` and `intMod`, `simpleLongArith.longRem` and `longMod`, `simpleUnsignedIntArith.unsignedIntRem` and `unsignedIntMod`, `simpleUnsignedLongArith.unsignedLongRem` and `unsignedLongMod` (through the transfers of F-308), and `simpleArbitraryPrecisionArith.rem` and `mod`: `REM` the remainder of the truncating division, `MOD` of the floor division with the divisor's sign, and on the natural numbers `MOD` the same as `REM`. Each raises `fortress.CompilerBuiltin$DivisionByZero` at a zero divisor, which walk raises as the library's `DivisionByZero` (F-24). 626 printed pairs are the old code's. Test: `tests/ZZ32RemainderByZeroWalk`, `ZZ64RemainderByZeroWalk`, `NN32RemainderByZeroWalk`, `NN64RemainderByZeroWalk`, `ZZRemainderByZeroWalk`, `NativeHelperFamilyRemainderWalk`; `compiler_tests/NativeHelperFamilyRemainderCompiled`. Detail: `compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why".

Now:

- F-312 **`REM` and `MOD` on `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` name helpers of `nativeHelpers/` on both paths, keep every value the glue classes gave, and throw `DivisionByZero` at a zero divisor.** The ten bindings (`Library/FortressLibrary.fss:910-913`, `:1022-1025`, `:1130-1133`, `:1248-1251`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:328-331`) name `simpleIntArith.intRem` and `intMod`, `simpleLongArith.longRem` and `longMod`, `simpleUnsignedIntArith.unsignedIntRem` and `unsignedIntMod`, `simpleUnsignedLongArith.unsignedLongRem` and `unsignedLongMod` (through the transfers of F-308), and `simpleArbitraryPrecisionArith.rem` and `mod`: `REM` the remainder of the truncating division, `MOD` of the floor division with the divisor's sign, and on the natural numbers `MOD` the same as `REM`. Each raises `fortress.CompilerBuiltin$DivisionByZero` at a zero divisor, which walk raises as the library's `DivisionByZero` (F-24). 626 printed pairs are the old code's. Test: `tests/ZZ32RemainderByZeroWalk`, `ZZ64RemainderByZeroWalk`, `NN32RemainderByZeroWalk`, `NN64RemainderByZeroWalk`, `ZZRemainderByZeroWalk`, `NativeHelperFamilyRemainderWalk`; `compiler_tests/NativeHelperFamilyRemainderCompiled`. Detail: `compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

Report sections that the entry cites: [S39] `compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why".

## F-313, changed

- Size: at the base 1105 characters; at the landing 1132 characters; now 1132 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-313 **The compiled path prints an `NN32` or `NN64` unsigned and negates an `NN64` by wrapping, and `UnsignedLong`'s `self` takes the `NN64` transfer, so `UnsignedLong`'s three bindings, `NN64`'s prefix `DOTMINUS` and `NN32`'s `CHOOSE` name helpers.** `FNN32`'s `toString` and `asString`, `FNN64`'s `toString` and `simpleUnsignedLongArith.unsignedLongToString` print unsigned; `unsignedLongWrappingNeg` answers 0 minus its operand, wrapped; the new `unsignedLongToDouble` answers an unsigned long's nearest double, ties to even, as walk's glue does; the rewrite reads an argument declared `UnsignedLong`, walk's object of `NN64`, through the `NN64` argument transfer. Under walk the five keep the glue classes' values; on the compiled path the prelude's `NN64` printing and prefix `BOXMINUS` move with the helpers. Test: `compiler_tests/UnsignedPrintingCompiled`, `UnsignedLongToStringHelperCompiled`, `NN64WrappingNegationHelperCompiled`, `NativeHelperFamilyUnsignedCompiled`; `tests/NativeHelperFamilyUnsignedWalk`. Detail: `compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why".

Now:

- F-313 **The compiled path prints an `NN32` or `NN64` unsigned and negates an `NN64` by wrapping, so `NN64`'s `asString`, `asExprString`, `asFloat` and prefix `DOTMINUS` and `NN32`'s `CHOOSE` name helpers.** `FNN32`'s `toString` and `asString`, `FNN64`'s `toString` and `simpleUnsignedLongArith.unsignedLongToString` print unsigned; `unsignedLongWrappingNeg` answers 0 minus its operand, wrapped; the new `unsignedLongToDouble` answers an unsigned long's nearest double, ties to even, as walk's glue does; the rewrite reads an argument declared `NN64` through the `NN64` argument transfer (`compiler/BuiltinPrimitiveRewriter.java:189`), and a program's own trait `UnsignedLong` takes none (row 886). Under walk these keep the glue classes' values; on the compiled path the prelude's `NN64` printing and prefix `BOXMINUS` move with the helpers. Test: `compiler_tests/UnsignedPrintingCompiled`, `UnsignedLongToStringHelperCompiled`, `NN64WrappingNegationHelperCompiled`, `NativeHelperFamilyUnsignedCompiled`; `tests/NativeHelperFamilyUnsignedWalk`. Detail: `compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 09:18Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung O of climb batch 31b: the rewriter's UnsignedLong clause is gone, the three bindings are NN64's own (cites [S28])

Report sections that the entry cites: [S40] `compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why".

## F-314, changed

- Size: at the base 1035 characters; at the landing 1066 characters; now 1066 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-314 **Under walk, `GCD` and `LCM` on the five integer types, `partitionL` on the four fixed widths, `CHOOSE` on `NN64` and `ZZ`, `ZZ`'s `cmp` and `nanoTime` name 18 new helpers of `nativeHelpers/`, which keep every value the glue classes gave and share no state.** It builds P-58, P-70 and P-73. The helpers stand at the ends of `simpleIntArith`, `simpleLongArith`, `simpleUnsignedIntArith`, `simpleUnsignedLongArith` and `simpleArbitraryPrecisionArith`, and the fixed widths' helpers share one unsigned Euclid's algorithm, `simpleUnsignedLongArith.unsignedLongGcd`. `nanoTime` answers `ZZ64` through a `long`, which the compiled checker reads as `ZZ64` (row 75). `ZZ`'s `CHOOSE` keeps `BigNum`'s 1 at `k < 0` or `k > n`, where the specification gives 0 (row 887). Test: `tests/NativeHelperFamilyDivisorsWalk.fss`, `compiler_tests/NativeHelperFamilyDivisorsCompiled`. Detail: `compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why", whose table gives each string's line and its helper, and "5. Old against new".

Now:

- F-314 **Under walk, `GCD` and `LCM` on the five integer types, `partitionL` on the four fixed widths, `CHOOSE` on `NN64` and `ZZ`, `ZZ`'s `cmp` and `nanoTime` name 18 new helpers of `nativeHelpers/`, which keep every value the glue classes gave and share no state.** It builds P-58, P-70 and P-73. The helpers stand at the ends of `simpleIntArith`, `simpleLongArith`, `simpleUnsignedIntArith`, `simpleUnsignedLongArith` and `simpleArbitraryPrecisionArith`, and the fixed widths' helpers share one unsigned Euclid's algorithm, `simpleUnsignedLongArith.unsignedLongGcd`. `nanoTime` answers `ZZ64` through a `long`, which the compiled checker reads as `ZZ64` (row 75). `ZZ`'s `CHOOSE` keeps the 1 of walk's former glue `BigNum.choose` at `k < 0` or `k > n`, where the specification gives 0 (row 887). Test: `tests/NativeHelperFamilyDivisorsWalk.fss`, `compiler_tests/NativeHelperFamilyDivisorsCompiled`. Detail: `compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why", whose table gives each string's line and its helper, and "5. Old against new".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: rung O made the five number types objects (F-379) and removed walk's native objects; the entry named them as they stood before

Report sections that the entry cites: [S41] `compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why".

## F-315, changed

- Size: at the base 1210 characters; at the landing 1210 characters; now 1210 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`.** An exception of a listed type that no catch clause took is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor, and the `finally` clause does not run (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:3087-3089`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it. `Bottom`, `Self` or an abbreviated type as that static argument, a tuple that holds `Any` (row 889), and the `override` modifier (row 650) are still refused. The library's `test stringifyChars` stops next at a varargs call (row 624). F-34 gives what the code generator still refuses in the library. Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`; for row 890, `XXXFinallyOnEscape.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.

Now:

- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`.** An exception of a listed type that no catch clause took is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor, and the `finally` clause does not run (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:3311-3313`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it. `Bottom`, `Self` or an abbreviated type as that static argument, a tuple that holds `Any` (row 889), and the `override` modifier (row 650) are still refused. The library's `test stringifyChars` stops next at a varargs call (row 624). F-34 gives what the code generator still refuses in the library. Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`; for row 890, `XXXFinallyOnEscape.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the line citation of `CodeGen.java` moved by climb batch 31's landing, checked at its member in the worktree (cites [S2])
- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

Report sections that the entry cites: [S42] `reviews/batch-25-review.md`, "Where the text, the brief or the principles split".

## F-323, changed

- Size: at the base 1141 characters; at the landing 1115 characters; now 1115 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-323 **The floats' natives over `Number` and `AnyIntegral` are declared at `RR64` or convert in Fortress, and group 3's six name one-line helpers.** `random`, `Float`'s `atan2`, `printThreadInfo` and the `RR64` trait's `^` and `atan2` take an `RR64`, which coercion reaches from a `ZZ32`, an `RR32` or a numeral; another number type writes `asFloat(x)` (P-165). `Float`'s power over `AnyIntegral` converts its exponent by each type's own `asFloat` around a public bare `^` at `ZZ32` on `simpleDoubleArith.doublePowInt` (P-162). `Float`'s and `RR32`'s mixed powers, `Float`'s floor and ceiling brackets, and `FlatString`'s `=` and `flatConcat` at a `Char` name new helpers that compute as their glue did, `flatConcat` past U+FFFF keeping the low 16 bits (row 872). `printThreadInfo` at `RR64` is Fortress through `asString`, so a numeral prints as a float, `3.0`. F-299 and F-32 give the library's counts of bindings. Test: `tests/NativeHelperFloatMixedWalk`, `tests/NativeHelperRationalArgumentWalk`, `compiler_tests/NativeHelperFamilyFloatMixedCompiled`. Detail: `compile-ladder/rung-natives-float-number/REPORT.md`, sections 1, 5 and 6.

Now:

- F-323 **The floats' natives over `Number` and `AnyIntegral` are declared at `RR64` or convert in Fortress, and group 3's six name one-line helpers.** `random`, `RR64`'s `atan2`, `printThreadInfo` and `RR64`'s `^` take an `RR64`, which coercion reaches from a `ZZ32`, an `RR32` or a numeral; another number type writes `asFloat(x)` (P-165). `RR64`'s power over `AnyIntegral` converts its exponent by each type's own `asFloat` around a public bare `^` at `ZZ32` on `simpleDoubleArith.doublePowInt` (P-162). `RR64`'s and `RR32`'s mixed powers, `RR64`'s floor and ceiling brackets, and `FlatString`'s `=` and `flatConcat` at a `Char` name new helpers that compute as their glue did, `flatConcat` past U+FFFF keeping the low 16 bits (row 872). `printThreadInfo` at `RR64` is Fortress through `asString`, so a numeral prints as a float, `3.0`. F-299 and F-32 give the library's counts of bindings. Test: `tests/NativeHelperFloatMixedWalk`, `tests/NativeHelperRationalArgumentWalk`, `compiler_tests/NativeHelperFamilyFloatMixedCompiled`. Detail: `compile-ladder/rung-natives-float-number/REPORT.md`, sections 1, 5 and 6.

History blocks of the range:

- Written by the gather: 2026-11-17 09:18Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung O of climb batch 31b: Float is gone, its bindings are RR64's (cites [S28])

## F-327, changed

- Size: at the base 1230 characters; at the landing 1232 characters; now 1232 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-327 **The integers' shifts and powers over `AnyIntegral` convert their count or exponent in Fortress and call public bare bindings at narrow headers.** `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` keep `LSHIFT`, `RSHIFT` and `^` over `AnyIntegral` (and `ZZ`'s `shift`) as plain Fortress around a public bare `builtinPrimitive` binding at a `ZZ32` count (`ZZ32`, `NN32`, `ZZ`) or a `ZZ64` count (`ZZ64`, `NN64`) and a `ZZ32` exponent, declared in the api; private functions `shiftCount32`, `shiftCount64`, `powerCount32` (`Library/FortressLibrary.fss:730-775`) and `countNN32`, `exponentNN32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:399-425`) keep `Int.shiftCount`'s saturation and `Int.powCount`'s sign and parity, a `ZZ` count or exponent clamped in `ZZ` and then read by `.asZZ32`. Ten new helpers and five existing; every value of the walk guard is the glue's. Meaning: the 16 bindings count among F-299's 374, a `ZZ32` count or exponent reaches its bare binding directly, and P-69 and P-153 hold on both paths at these declarations. Test: `tests/NativeHelperShiftPowerWalk`, `compiler_tests/NativeHelperFamilyShiftPowerCompiled`. Detail: `compile-ladder/rung-natives-shift-power/REPORT.md`, "What changed and why".

Now:

- F-327 **The integers' shifts and powers over `AnyIntegral` convert their count or exponent in Fortress and call public bare bindings at narrow headers.** `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` keep `LSHIFT`, `RSHIFT` and `^` over `AnyIntegral` (and `ZZ`'s `shift`) as plain Fortress around a public bare `builtinPrimitive` binding at a `ZZ32` count (`ZZ32`, `NN32`, `ZZ`) or a `ZZ64` count (`ZZ64`, `NN64`) and a `ZZ32` exponent, declared in the api; private functions `shiftCount32`, `shiftCount64`, `powerCount32` (`Library/FortressLibrary.fss:800-845`) and `countNN32`, `exponentNN32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:234-260`) keep `ZZ32.shiftCount`'s saturation and `ZZ32.powCount`'s sign and parity, a `ZZ` count or exponent clamped in `ZZ` and then read by `.asZZ32`. Ten new helpers and five existing; every value of the walk guard is the glue's. Meaning: the 16 bindings count among F-299's 374, a `ZZ32` count or exponent reaches its bare binding directly, and P-69 and P-153 hold on both paths at these declarations. Test: `tests/NativeHelperShiftPowerWalk`, `compiler_tests/NativeHelperFamilyShiftPowerCompiled`. Detail: `compile-ladder/rung-natives-shift-power/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: rung O made the five number types objects (F-379) and removed walk's native objects; the entry named them as they stood before; lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

Report sections that the entry cites: [S43] `compile-ladder/rung-natives-shift-power/REPORT.md`, "What changed and why".

## F-328, changed

- Size: at the base 1064 characters; at the landing 1004 characters; now 1004 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-328 **Walk answers the compiled helpers `stringOps.typeName` and `equality.sEquiv` with its own operations, and its ilk names the five native number objects by their traits.** The one library binds `Object.ilkName` to `stringOps.typeName` and `SEQV` over `Any` to `equality.sEquiv` (P-58's form); walk's loader maps the two names, before it looks for a helper, to `ObjectPrims$ClassName` and `AnyPrim$SEquiv` (`interpreter/glue/NativeApp.java`, `OWN_OPERATIONS`, a table that holds `runtime`'s six names too, F-335), so it never loads the two helpers. `Object.asString` is `self.ilkName`. Walk's ilk prints `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` of `FortressBuiltin` as `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64`, also inside static arguments, tuples and arrows; other types, strings, `Char` and `Ratio` among them, keep their names, and walk instantiates a generic at the trait (F-344). Tests: `tests/AnyNativesIntrinsicWalk`, `compiler_tests/AnyNativesIntrinsicCompiled`. Detail: `compile-ladder/rung-any-carrier/REPORT.md`, "What changed and why".

Now:

- F-328 **Walk answers the compiled helpers `stringOps.typeName` and `equality.sEquiv` with its own operations.** The one library binds `Object.ilkName` to `stringOps.typeName` and `SEQV` over `Any` to `equality.sEquiv` (P-58's form); walk's loader maps the two names, before it looks for a helper, to `ObjectPrims$ClassName` and `AnyPrim$SEquiv` (`interpreter/glue/NativeApp.java`, `OWN_OPERATIONS`, a table that holds `runtime`'s six names too, F-335), so it never loads the two helpers. `Object.asString` is `self.ilkName`. Walk's ilk names each type by its own name, also inside static arguments, tuples and arrows (`interpreter/glue/prim/ObjectPrims.java:48-52`): `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` are objects of those names (F-379), and a string object keeps its own name, though walk instantiates a generic at its trait (F-344). Tests: `tests/AnyNativesIntrinsicWalk`, `compiler_tests/AnyNativesIntrinsicCompiled`. Detail: `compile-ladder/rung-any-carrier/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 09:18Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung O of climb batch 31b: the ilk's reading of the five native number objects is gone (cites [S28])

Report sections that the entry cites: [S44] `compile-ladder/rung-any-carrier/REPORT.md`, "What changed and why".

## F-330, changed

- Size: at the base 1083 characters; at the landing 1083 characters; now 1083 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-330 **Walk carries `FortressLibrary`'s `JavaBufferedWriter` in a Java `FortressBufferedWriter`, and `stdOut`, `stdErr`, `Writer` and `BufferedWriter` are plain Fortress objects over it.** The trait's `write`s, `flush` and `close` and its three factories, over a file name, standard output and standard error, are natives on `nativeHelpers/fileOps` (`Library/FortressLibrary.fss:1988-1997`, `:2010-2015`); walk's loader carries the trait by its name through `FortressBuiltin`'s private native object `JavaBufferedWriterObject` (`interpreter/glue/StaticNativeApp.java:70`), and the checker's walk-world table reads `FortressBufferedWriter` and `FortressBufferedReader` as the one library's traits (`compiler/NamingCzar.java:486-487`). A missing file raises the library's `FileNotFoundException`, which a `catch` sees. `FileWriteStream` is a plain `WriteStream` over `JavaBufferedWriter` too, with its `flush` (F-332). Test: `tests/NativeHelperWriterWalk`, `compiler_tests/NativeHelperFamilyWriterCompiled`. Detail: `compile-ladder/rung-io-writer/REPORT.md`, "What changed and why".

Now:

- F-330 **Walk carries `FortressLibrary`'s `JavaBufferedWriter` in a Java `FortressBufferedWriter`, and `stdOut`, `stdErr`, `Writer` and `BufferedWriter` are plain Fortress objects over it.** The trait's `write`s, `flush` and `close` and its three factories, over a file name, standard output and standard error, are natives on `nativeHelpers/fileOps` (`Library/FortressLibrary.fss:2072-2081`, `:2094-2099`); walk's loader carries the trait by its name through `FortressBuiltin`'s private native object `JavaBufferedWriterObject` (`interpreter/glue/StaticNativeApp.java:70`), and the checker's walk-world table reads `FortressBufferedWriter` and `FortressBufferedReader` as the one library's traits (`compiler/NamingCzar.java:486-487`). A missing file raises the library's `FileNotFoundException`, which a `catch` sees. `FileWriteStream` is a plain `WriteStream` over `JavaBufferedWriter` too, with its `flush` (F-332). Test: `tests/NativeHelperWriterWalk`, `compiler_tests/NativeHelperFamilyWriterCompiled`. Detail: `compile-ladder/rung-io-writer/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

Report sections that the entry cites: [S45] `compile-ladder/rung-io-writer/REPORT.md`, "What changed and why".

## F-332, changed

- Size: at the base 1303 characters; at the landing 1303 characters; now 1303 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-332 **Walk carries `FortressLibrary`'s `JavaBufferedReader` in a Java `FortressBufferedReader`, and `FileReadStream`, `Reader`, `stdIn` and `FileWriteStream` are plain Fortress objects over the Java-backed traits `JavaBufferedReader` and `JavaBufferedWriter`.** The trait's eight methods and its two factories, over a file name and for standard input, are natives on `nativeHelpers/fileOps` (`Library/FortressLibrary.fss:1999-2019`); walk's loader carries the trait by its name through `FortressBuiltin`'s private native object `JavaBufferedReaderObject` (`interpreter/glue/StaticNativeApp.java:71`). `File` and `Reader` are plain components, and each object holds its Java-backed value in its field `under`. `uncheckedReadChar` answers -1 at the end by the reader's `eof`, since `jbrRead` answers 0 there. `FileWriteStream` is a `WriteStream` with its `flush`. A missing file raises `FileNotFoundException`, and a read after `consume` raises `IOFailure`. A `catch` sees each on both paths, since a compiled helper's raise builds the prelude's exception (F-336). F-299 counts the bindings. Tests: `tests/NativeHelperReaderWalk`, `compiler_tests/NativeHelperFamilyReaderCompiled`, `compiler_tests/FileOpsRaiseCaughtCompiled`. Detail: `compile-ladder/rung-io-reader/REPORT.md`, "What changed and why".

Now:

- F-332 **Walk carries `FortressLibrary`'s `JavaBufferedReader` in a Java `FortressBufferedReader`, and `FileReadStream`, `Reader`, `stdIn` and `FileWriteStream` are plain Fortress objects over the Java-backed traits `JavaBufferedReader` and `JavaBufferedWriter`.** The trait's eight methods and its two factories, over a file name and for standard input, are natives on `nativeHelpers/fileOps` (`Library/FortressLibrary.fss:2083-2103`); walk's loader carries the trait by its name through `FortressBuiltin`'s private native object `JavaBufferedReaderObject` (`interpreter/glue/StaticNativeApp.java:71`). `File` and `Reader` are plain components, and each object holds its Java-backed value in its field `under`. `uncheckedReadChar` answers -1 at the end by the reader's `eof`, since `jbrRead` answers 0 there. `FileWriteStream` is a `WriteStream` with its `flush`. A missing file raises `FileNotFoundException`, and a read after `consume` raises `IOFailure`. A `catch` sees each on both paths, since a compiled helper's raise builds the prelude's exception (F-336). F-299 counts the bindings. Tests: `tests/NativeHelperReaderWalk`, `compiler_tests/NativeHelperFamilyReaderCompiled`, `compiler_tests/FileOpsRaiseCaughtCompiled`. Detail: `compile-ladder/rung-io-reader/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

Report sections that the entry cites: [S46] `compile-ladder/rung-io-reader/REPORT.md`, "What changed and why".

## F-344, changed

- Size: at the base 1091 characters; at the landing 850 characters; now 850 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-344 **Under walk, a value of the five native number objects or of the four string objects is read at its trait where walk infers a static argument, and walk's type text prints each of the nine by its trait.** `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` of `FortressBuiltin` read and print as `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64`; `FlatString`, `CatString`, `EmptyString` and `SubString` as `String`; also inside tuple types; each told by its declaring component (`interpreter/evaluator/types/LanguageTypes.java`), at `EvaluatorBase`'s three reads and in `FTraitOrObject.toString`. So `Cell(3)` is a `Cell[\ZZ32\]`, `Cell("s")` a `Cell[\String\]`, `<|1, 2, 3|>` an `ArrayList[\ZZ32\]`, and messages and `Reflect` print `ZZ32` where they printed `Int`; a float numeral, an `RR64` value (F-341), reads at `RR64`. The types keep their names: a `typecase` arm `Int` still matches `3`, and the ilk still names a string object by its own name, `FlatString`. Test: `tests/LanguageTypeInstancesWalk`. Detail: `compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why".

Now:

- F-344 **Under walk, a value of the four string objects is read at its trait where walk infers a static argument, and walk's type text prints each of the four by its trait.** `FlatString`, `CatString`, `EmptyString` and `SubString` as `String`; also inside tuple types; each told by its declaring component (`interpreter/evaluator/types/LanguageTypes.java:13-33`), at `EvaluatorBase`'s three reads and in `FTraitOrObject.toString`. So `Cell("s")` is a `Cell[\String\]`. A number needs no such reading: `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` are objects of their own names (F-379), so `Cell(3)` is a `Cell[\ZZ32\]` and `<|1, 2, 3|>` an `ArrayList[\ZZ32\]`. The ilk still names a string object by its own name, `FlatString`. Test: `tests/LanguageTypeInstancesWalk`. Detail: `compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 09:18Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung O of climb batch 31b: the five native number objects are gone from LanguageTypes (cites [S28])

Report sections that the entry cites: [S47] `compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why".

## F-349, changed

- Size: at the base 965 characters; at the landing 965 characters; now 965 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-349 **Walk chooses among declarations applicable with coercion by specificity read through other applicable declarations, where none wins directly.** That is the specification's choice, the declaration than which no other is more specific (`Specification/basic/conversions-coercions.tex`, "Coercion Resolution"), wherever the relation has no cycle. So a call with three declarations in a chain of coercions runs the first, as the compiled path does, with no 'Ambiguous coercion' (a probe, no test), and a float numeral to the left of an `RR32` operand runs `RR32`'s operator. Walk's rule for a numeral at a call runs before it: the declaration that fits the numeral at its default, or one strictly below it that the numeral's own coercion reaches (F-366). Source: `interpreter/evaluator/values/OverloadedFunction.java:2448`, `:2511-2531`. Test: `tests/NumeralLeftOfRR32Walk`. Detail: `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

Now:

- F-349 **Walk chooses among declarations applicable with coercion by specificity read through other applicable declarations, where none wins directly.** That is the specification's choice, the declaration than which no other is more specific (`Specification/basic/conversions-coercions.tex`, "Coercion Resolution"), wherever the relation has no cycle. So a call with three declarations in a chain of coercions runs the first, as the compiled path does, with no 'Ambiguous coercion' (a probe, no test), and a float numeral to the left of an `RR32` operand runs `RR32`'s operator. Walk's rule for a numeral at a call runs before it: the declaration that fits the numeral at its default, or one strictly below it that the numeral's own coercion reaches (F-366). Source: `interpreter/evaluator/values/OverloadedFunction.java:2545`, `:2608-2628`. Test: `tests/NumeralLeftOfRR32Walk`. Detail: `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the line citations of OverloadedFunction.java moved by climb batch 31's landing, checked at their members in the worktree, bestMatchWithCoercion and mostSpecificThroughOthers (cites [S2])

Report sections that the entry cites: [S48] `Specification/basic/conversions-coercions.tex`, "Coercion Resolution"; [S49] `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

## F-351, changed

- Size: at the base 1768 characters; at the landing 1768 characters; now 1768 characters, over 600.
- Section now: "Execution model".

At the base:

- F-351 **A compiled transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names.** A compiled `atomic` block's transaction records no read of its own write; it records a read of an ancestor's write with that write, a read of the committed value with that value, and a read of an empty array element with a mark. Validation, at a read once the global lock has moved and at a commit that did not get the lock at its snapshot, covers the transaction and every ancestor. An abort names the transaction whose read failed; `abort()` names none. The block's handler takes every exception (`BaseTask.leaveTransaction`): it ends the block's transaction, starts the block again for an abort that names that transaction or names none (or any abort at the outermost block), and throws everything else on, after a nested transaction has handed its reads to its parent. A nested commit hands its parent its reads and its writes, also where it wrote nothing. The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first. Open: a nested block sees a plain write by another thread that runs its outer block (row 984). Source: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-367`, `runtimeSystem/BaseTask.java:293-314`,`compiler/codegen/CodeGen.java:1835-1867` (`forAtomicBlock`), `:2169-2173` (`forTry`). Tests: `compiler_tests/AtomicOwnWriteNestedCompiled`, `AtomicNestedSameBodyCompiled`, `NestedAtomicAbortCompiled`, `AtomicNestedViewCompiled`, `AtomicSharedReadsCompiled`, `AtomicThrowRevertsCompiled`, `AtomicNestedReadsKeptCompiled`, `NestedTryInnerCatch`; `ArrayStoreJUTest`. Detail: `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

Now:

- F-351 **A compiled transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names.** A compiled `atomic` block's transaction records no read of its own write; it records a read of an ancestor's write with that write, a read of the committed value with that value, and a read of an empty array element with a mark. Validation, at a read once the global lock has moved and at a commit that did not get the lock at its snapshot, covers the transaction and every ancestor. An abort names the transaction whose read failed; `abort()` names none. The block's handler takes every exception (`BaseTask.leaveTransaction`): it ends the block's transaction, starts the block again for an abort that names that transaction or names none (or any abort at the outermost block), and throws everything else on, after a nested transaction has handed its reads to its parent. A nested commit hands its parent its reads and its writes, also where it wrote nothing. The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first. Open: a nested block sees a plain write by another thread that runs its outer block (row 984). Source: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-367`, `runtimeSystem/BaseTask.java:293-314`,`compiler/codegen/CodeGen.java:2045-2077` (`forAtomicBlock`), `:2387-2391` (`forTry`). Tests: `compiler_tests/AtomicOwnWriteNestedCompiled`, `AtomicNestedSameBodyCompiled`, `NestedAtomicAbortCompiled`, `AtomicNestedViewCompiled`, `AtomicSharedReadsCompiled`, `AtomicThrowRevertsCompiled`, `AtomicNestedReadsKeptCompiled`, `NestedTryInnerCatch`; `ArrayStoreJUTest`. Detail: `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the line citations of `CodeGen.java` moved by climb batch 31's landing, checked at their members in the worktree; `forTry`'s, which the review's script skipped, moved by 115 (cites [S2])
- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

Report sections that the entry cites: [S50] `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

## F-352, changed

- Size: at the base 2002 characters; at the landing 2104 characters; now 2104 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-352 **A compiled program has run against the interpreter's library only in a scratch tree with twelve marked hacks; on `main` the compile command selects the compiler's prelude alone.** In that tree, on `832f7d0d91`'s code, two lines of `Shell.useCompilerLibraries()` point the compiled path at the one library, and a one-line program then passes the checker and the code generator. Its run needs the library's fourteen components as bytecode, compiled by name in about 200 s. Three programs ran and printed walk's output: one that prints a line, one that builds and reads an `Array1`, and a dot product in the program's own loop over two `Array1`. Not run: an array of rank 2 or 3 (row 992), the library's `DOT` and `SUM` (row 732), and microGPT, which the checker stops (F-58). The runs met sixteen walls of two kinds. A test compiled against the prelude can show the first kind: the refusal of varargs (row 624), `label` (row 81), a closure class written twice (row 315), a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732. Only a tree switched onto the one library shows the second kind: which run-time class carries each built-in type, a choice that reaches the code generator's naming (rows 874, 995 and 866); the trait table's search by the prelude's api names (row 942); the dispatch method's package (row 994); `NN32`'s two getters (row 993). Every run had the JVM's verifier off, so the number of emitted methods that the verifier refuses is not known. A program's check takes about a second under either library on warm caches, and 17 s against the one library on cold caches, one run each. Measured once; nothing landed, and no test holds it. Detail: `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met", "4. How far each program got" and "6. The walls grouped, against PLAN's phase 4 and phase 5 lines"; `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

Now:

- F-352 **A compiled program has run against the interpreter's library only in a scratch tree with twelve marked hacks; on `main` the compile command selects the compiler's prelude alone.** In that tree, on `832f7d0d91`'s code, two lines of `Shell.useCompilerLibraries()` point the compiled path at the one library, and a one-line program then passes the checker and the code generator. Its run needs the library's fourteen components as bytecode, compiled by name in about 200 s. Three programs ran and printed walk's output: one that prints a line, one that builds and reads an `Array1`, and a dot product in the program's own loop over two `Array1`. Not run: an array of rank 2 or 3 (row 992, fixed since), the library's `DOT` and `SUM` (row 732, fixed since), and microGPT, which the checker stops (F-58). The runs met sixteen walls of two kinds. A test compiled against the prelude can show the first kind: the refusal of varargs (row 624), `label` (row 81), a closure class written twice (row 315), a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732; rows 81, 990, 991, 732 and 992 are fixed since, and rows 624 and 315 stand. Only a tree switched onto the one library shows the second kind: which run-time class carries each built-in type, a choice that reaches the code generator's naming (rows 874, 995 and 866); the trait table's search by the prelude's api names (row 942); the dispatch method's package (row 994); `NN32`'s two getters (row 993). Every run had the JVM's verifier off, so the number of emitted methods that the verifier refuses is not known. A program's check takes about a second under either library on warm caches, and 17 s against the one library on cold caches, one run each. Measured once; nothing landed, and no test holds it. Detail: `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met", "4. How far each program got" and "6. The walls grouped, against PLAN's phase 4 and phase 5 lines"; `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the rehearsal kept as measured on `832f7d0d91`; rows 81, 990, 991 and 732 named as fixed since, by climb batch 31's rungs L, M and K (cites [S2])
- Written by the gather: 2026-11-17 09:14Z · rewritten · from `explorations/compile-ladder/rung-tuple-parameter/REPORT.md`, "Points to report" · by climb batch 31b gather: rung T of climb batch 31b: row 992 fixed (cites [S3])

Report sections that the entry cites: [S51] `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met"; [S52] `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

## F-354, changed

- Size: at the base 989 characters; at the landing 926 characters; now 926 characters, over 600.
- Section now: "The harness and the gate".

At the base:

- F-354 **Two compiles of one source by different builds of the compiler need not give the same bytes, so a comparison of jars cannot show that a change left the compiled code as it was.** The code generator writes a class's methods and a dispatch method's tests in an order that follows the JVM's identity hashes (row 996). Two cold compiles of the prelude by one build give equal classes, 590 of 590, because the default identity hash is the same sequence in each run. Under another hash mode 18 of `CompilerBuiltin`'s 312 classes differ: the same methods in another order. So the tests, not the bytes, show that a change of the compiler left the prelude undisturbed, and a result that depends on the order can come and go between builds, as the choice between two copies of one method does (row 990). Measured once, on `832f7d0d91`'s code. Detail: `compile-ladder/plan-31/probes/probe-y.md`, "6. A finding beside the question: the prelude's jars change with any change of the compiler".

Now:

- F-354 **Two compiles of one source by different builds of the compiler need not give the same bytes, so a comparison of jars cannot show that a change left the compiled code as it was.** The code generator writes a class's methods and a dispatch method's tests in an order that follows the JVM's identity hashes (row 996). Two cold compiles of the prelude by one build give equal classes, 590 of 590, because the default identity hash is the same sequence in each run. Under another hash mode 18 of `CompilerBuiltin`'s 312 classes differ: the same methods in another order. So the tests, not the bytes, show that a change of the compiler left the prelude undisturbed, and a result that depends on the order can come and go between builds. Measured once, on `832f7d0d91`'s code. Detail: `compile-ladder/plan-31/probes/probe-y.md`, "6. A finding beside the question: the prelude's jars change with any change of the compiler".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the example of row 990 cut, since rung M of climb batch 31 made that choice a relation between two declarations (F-372), not the order (cites [S2])

Report sections that the entry cites: [S53] `compile-ladder/plan-31/probes/probe-y.md`, "6. A finding beside the question: the prelude's jars change with any change of the compiler".

## F-356, changed

- Size: at the base 1396 characters; at the landing 1396 characters; now 1396 characters, over 600.
- Section now: "Execution model".

At the base:

- F-356 **In the fork/join shape that the library and the compiled runtime give parallel work, a Java model of microGPT's step with unboxed arrays runs 19 to 80 times slower than plain loops at the library's grains, and 1.4 to 4.8 times slower with the matrix product stopped at blocks of 16.** The library's range stops its split at 16 elements (`grainSize`, `Library/RangeInternals.fss`; P-175), and its matrix product splits down to single elements (`Library/FortressLibrary.fss:3045-3103`). The model is the baseline of F-355 with its vocabulary on a `ForkJoinPool` and plain loops at the leaves, so its times are a floor for compiled Fortress with this structure. At the library's grains a step takes 19 to 32 times the plain step on one thread, 55 times on two and 80 on four. Threads gain only from a product of about 128 by 128 with blocks of 64, and a dot product only from about 260,000 elements with a grain of 1,024; the model's products are 16 by 16 to 64 by 16. So at microGPT's sizes the library's parallel shape costs time at any thread count, and the matrix product's missing grain is the largest part of the cost. Measured once on a shared machine of 4 CPUs; every configuration passes the checks. Commands: `java-baseline/run.sh steps`, `kernels` and `scale`. Detail: `java-baseline/REPORT.md`, "6. Fork/join: the baseline in the shape of the library and the compiled runtime".

Now:

- F-356 **In the fork/join shape that the library and the compiled runtime give parallel work, a Java model of microGPT's step with unboxed arrays runs 19 to 80 times slower than plain loops at the library's grains, and 1.4 to 4.8 times slower with the matrix product stopped at blocks of 16.** The library's range stops its split at 16 elements (`grainSize`, `Library/RangeInternals.fss`; P-175), and its matrix product splits down to single elements (`Library/FortressLibrary.fss:3129-3187`). The model is the baseline of F-355 with its vocabulary on a `ForkJoinPool` and plain loops at the leaves, so its times are a floor for compiled Fortress with this structure. At the library's grains a step takes 19 to 32 times the plain step on one thread, 55 times on two and 80 on four. Threads gain only from a product of about 128 by 128 with blocks of 64, and a dot product only from about 260,000 elements with a grain of 1,024; the model's products are 16 by 16 to 64 by 16. So at microGPT's sizes the library's parallel shape costs time at any thread count, and the matrix product's missing grain is the largest part of the cost. Measured once on a shared machine of 4 CPUs; every configuration passes the checks. Commands: `java-baseline/run.sh steps`, `kernels` and `scale`. Detail: `java-baseline/REPORT.md`, "6. Fork/join: the baseline in the shape of the library and the compiled runtime".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

Report sections that the entry cites: [S54] `java-baseline/REPORT.md`, "6. Fork/join: the baseline in the shape of the library and the compiled runtime".

## F-360, removed

- Size: at the base 1401 characters; at the landing none; now none.
- Section now: none.

At the base:

- F-360 **In the interpreter's library each of the five number traits `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` has exactly one object, a native object of `FortressBuiltin`, and the 56 bodies of `trait RR64` that go through `asFloat(self)` run only at a type assumption, `asif RR64`.** The objects are `Int`, `Long`, `BigNum`, `UnsignedLong` and `Float`. The split was made for `IntLiteral` and for nesting (`fca589bbb0`); the flat tower and the numerals' own types removed both. At every call without `asif` the object's own declaration is more specific, so the trait's body does not run: with a `fail` put into each of the 56, walk's suite fails one test, `tests/asifTest.fss:102`, `(3.0 asif RR64) + 17`. Each such body calls the object's body on `asFloat(self)`, which is `self`, so it computes the same value. Under walk an object of a native component takes its values from the Java class of the object's name in the component's package (`interpreter/evaluator/BuildNativeEnvironment.java:42-57`), so a hand-written class as an object's class is walk's rule, and walk reads such a value at its trait (F-344). Measured once, in a scratch tree on `832f7d0d91`; the walk rule read in the code. Detail: `compile-ladder/plan-31/probes/number-object-merge.md`, "The bodies of `trait RR64` that go through `asFloat(self)`"; `reviews/carriers-ways-2026-11-13.md`, "The interpreter's library: five shapes".

History blocks of the range:

- Written by the gather: 2026-11-17 09:18Z · merged into F-379 · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung O of climb batch 31b: F-360's five traits with one native object each are merged into their objects; the rule of walk's native objects kept (cites [S28])

## F-361, changed

- Size: at the base 1351 characters; at the landing 1457 characters; now 1457 characters, over 600.
- Section now: "The library's arrays and algebra".

At the base:

- F-361 **With the five number traits merged with their objects in a scratch tree, the checker count and the distance stay 0, microGPT's quick checks pass, and walk's suite differs in one `XXX` test; the merge widens three open gaps to the five types.** The merge makes `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` value objects (F-360): 12 files, the library's text and 78 lines of walk's Java, with no checker or code-generator file and no model line. Of the 830 tests of `ant testSystem`, 829 pass, and `XXXGenericBesidePlainReturnParam` passes where a failure is expected (row 550), for a wrong reason: walk's load check loses a refusal for a generic beside a plain declaration at an object type (row 998). The other two gaps: a type parameter bounded by a value type through a trait's generic method (row 997, passed in the scratch tree by one line of walk), and the checker's refusal of a valid generic-beside-plain pair over an object domain (row 542, by reading). A `typecase` arm that names a removed object, such as `Int`, matches every value with no message (row 959). On `main` the five traits are not merged. Measured once on `832f7d0d91`; nothing landed, and no test holds it; the compiled tests and `ant testFast` were not run. Detail: `compile-ladder/plan-31/probes/number-object-merge.md`, "Measurements" and "Obstacles, in the order met".

Now:

- F-361 **With the five number traits merged with their objects in a scratch tree, the checker count and the distance stay 0, microGPT's quick checks pass, and walk's suite differs in one `XXX` test; on `832f7d0d91`'s code the merge widens three gaps, fixed since, to the five types.** The merge makes `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` value objects (F-379): 12 files, the library's text and 78 lines of walk's Java, with no checker or code-generator file and no model line. Of the 830 tests of `ant testSystem`, 829 pass, and `XXXGenericBesidePlainReturnParam` passes where a failure is expected (row 550), for a wrong reason: walk's load check loses a refusal for a generic beside a plain declaration at an object type (row 998). The other two gaps: a type parameter bounded by a value type through a trait's generic method (row 997, passed in the scratch tree by one line of walk), and the checker's refusal of a valid generic-beside-plain pair over an object domain (row 542, by reading). A `typecase` arm that names a removed object, such as `Int`, matches every value with no message (row 959). On `main` the five are value objects of the one library and walk (F-379), and rows 998, 997, 542 and 550 are fixed. Measured once on `832f7d0d91`; nothing landed, and no test holds it; the compiled tests and `ant testFast` were not run. Detail: `compile-ladder/plan-31/probes/number-object-merge.md`, "Measurements" and "Obstacles, in the order met".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the three gaps named as open on the probe's code and fixed since, by climb batch 31's rungs V and X, before any merge (cites [S2])
- Written by the gather: 2026-11-17 09:18Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung O of climb batch 31b: the merge is on main (cites [S28])

Report sections that the entry cites: [S55] `compile-ladder/plan-31/probes/number-object-merge.md`, "Measurements".

## F-366, changed

- Size: at the base 2733 characters; at the landing 2941 characters; now 2941 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-366 **On both paths a numeral at a call leaves the declaration that fits it at its default only for one that its own coercion reaches and whose declared parameter types lie strictly below, by subtyping.** It builds P-46's rule for a numeral at a call. P-46 does not word the order: the worker that built the rule chose subtyping, and the curator has read that choice as landed and let it stand, without wording a decision of his own. So `u = 0` and `0 = u` are `true`, and `u =/= 0` is `false`, for a zero `u` of `NN32`, `NN64` or `RR32`; `h = 0.5` is `true` for `h: QQ = 1/2`; `k(5)` runs `k(x: NN32)` beside `k(x: Any)`; a `case` clause `0` matches a zero `NN32`; and a program's own number type with a numeral coercion compares with a numeral by its own `=`. `Equality[\T\]` declares `opr =/=(self, other:T)` as the negation of the type's `=` (`Library/FortressLibrary.fss:102`), which a type that extends `Equality` reaches before the `=/=` over `Any` (`:98`). The order between the declaration that the default fits and one that the coercion reaches is subtyping on the declared parameter types, not the coercion chapter's relation: `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` runs the `RR64` declaration, and `x^2` for an `RR64` keeps its integer power. A value's coercion is not ranked so. Where a call reaches two declarations only by coercion and they are not ordered, the one whose parameter the numeral's default fits as it is runs, whether they differ at the numeral alone or elsewhere too, so `1.0 s` for `s: ZZ32` checks against the one library at `RR64`'s juxtaposition. So a model line may compare a number of any type with a numeral, and write a float numeral beside an integer value, on both paths. The checker compares only where the declaration that fits has a numeral at a parameter that is not of the numeral's default type, so a call such as `i + 1` costs nothing more; the report says which choices walk keeps in its dispatch cache. Two departures: under walk a numeral beside a value typed `Any` is converted by the value's run-time type (row 1016), and on both paths a numeral at a bare type parameter's declaration does not go to a more specific one (row 1017). Source: `numeralAttempt` and `numeralTie` in `scala_src/typechecker/impls/Functionals.scala:980-1021`, `:1066`, `:1117`; `bestMatchForNumerals` and `belowByNumerals` in `interpreter/evaluator/values/OverloadedFunction.java:2325-2428`. Tests: `compiler_tests/NumeralMostSpecificCompiled`, `compiler_tests/NumeralTieDefaultCompiled`, `tests/NumeralMostSpecificWalk`, `tests/NumeralEqualsNumberWalk`, `tests/NotEqualNumeral`. Detail: `compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why" and "5. Points to report".

Now:

- F-366 **On both paths a numeral at a call leaves the declaration that fits it at its default only for one that its own coercion reaches and whose declared parameter types lie strictly below, by subtyping.** It builds P-46's rule for a numeral at a call. P-46 does not word the order: the worker that built the rule chose subtyping, and the curator has read that choice as landed and let it stand, without wording a decision of his own. So `u = 0` and `0 = u` are `true`, and `u =/= 0` is `false`, for a zero `u` of `NN32`, `NN64` or `RR32`, but on the compiled path until the switch-over the checker refuses `u =/= 0` at `RR32` and `RR64` (row 1059) and `u = 0` at `RR32` overflows the stack (row 528); `h = 0.5` is `true` for `h: QQ = 1/2`; `k(5)` runs `k(x: NN32)` beside `k(x: Any)`; a `case` clause `0` matches a zero `NN32`; and a program's own number type with a numeral coercion compares with a numeral by its own `=`. `Equality[\T\]` declares `opr =/=(self, other:T)` as the negation of the type's `=` (`Library/FortressLibrary.fss:102`), which a type that extends `Equality` reaches before the `=/=` over `Any` (`:98`). The order between the declaration that the default fits and one that the coercion reaches is subtyping on the declared parameter types, not the coercion chapter's relation: `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` runs the `RR64` declaration, and `x^2` for an `RR64` keeps its integer power. A value's coercion is not ranked so. Where a call reaches two declarations only by coercion and they are not ordered, the one whose parameter the numeral's default fits as it is runs, whether they differ at the numeral alone or elsewhere too, so `1.0 s` for `s: ZZ32` checks against the one library at `RR64`'s juxtaposition. So a model line may compare a number of any type with a numeral, and write a float numeral beside an integer value, on both paths. The checker compares only where the declaration that fits has a numeral at a parameter that is not of the numeral's default type, so a call such as `i + 1` costs nothing more; the report says which choices walk keeps in its dispatch cache. Two departures: under walk a numeral beside a value typed `Any` is converted by the value's run-time type (row 1016), and on both paths a numeral at a bare type parameter's declaration does not go to a more specific one (row 1017). Source: `numeralAttempt` and `numeralTie` in `scala_src/typechecker/impls/Functionals.scala:980-1021`, `:1066`, `:1117`; `bestMatchForNumerals` and `belowByNumerals` in `interpreter/evaluator/values/OverloadedFunction.java:2422-2525`. Tests: `compiler_tests/NumeralMostSpecificCompiled`, `compiler_tests/NumeralEqualsNumberCompiled`, `compiler_tests/NumeralTieDefaultCompiled`, `tests/NumeralMostSpecificWalk`, `tests/NumeralEqualsNumberWalk`, `tests/NotEqualNumeral`. Detail: `compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why" and "5. Points to report".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the line citation of OverloadedFunction.java moved by climb batch 31's landing, checked at its members in the worktree (cites [S2])
- Written by the gather: 2026-11-17 09:20Z · rewritten · from `explorations/compile-ladder/rung-numeral-block-end/REPORT.md`, "Points to report" · by climb batch 31b gather: rung E of climb batch 31b: the compiled test of u = 0 at NN32, NN64 and RR32 against the prelude, rows 1059 and 528 (cites [S56])

Report sections that the entry cites: [S57] `compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why".

## F-367, changed

- Size: at the base 1957 characters; at the landing 1957 characters; now 1957 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-367 **Under walk a generic function is a value, received at the arrow type of its parameter or variable.** A function with static parameters has a type of its own as a value (`interpreter/evaluator/types/FTypeGenericArrow.java`), below `Any` and below each arrow type it can be received at. A parameter, of a function or a constructor, a local variable declared with an arrow type, and a variable of arrow type at an assignment, a mutable top-level variable among them, receive the instance that a direct call with arguments of the arrow's domain types runs (`interpreter/evaluator/values/Fcn.java`, `received`; `interpreter/evaluator/EvaluatorBase.java`, `instanceReceivedAt`). A generic callee's static parameters are fixed by its other arguments first, so the row lift `rows(rmsn, x)` runs with a sized `rmsn`. Where the arrow type leaves a static parameter of the function open, and at `Any`, a type parameter or an untyped place, the value stays generic and each application infers its static arguments, as a direct call does; the compiled checker refuses those forms (row 1021). An overloaded name keeps its whole overload set, and its type as a value holds its generic overloads, so `pick(twice)`, for an overloaded `twice` with a generic declaration, runs the `pick` declared over an arrow type and not `pick(x: Any)` (`interpreter/evaluator/values/OverloadedFunction.java:2970`); no test pins this choice. Not built: an immutable top-level variable keeps the generic value (row 1019), and a callee's type parameter fixed only by a value's run-time type refuses the function (row 1018). A function declared in a block with static parameters of its own does not run under walk at all, called or passed (row 1020). Tests: `tests/GenericFunctionAsValueWalk.fss`, `GenericFunctionRowLiftWalk.fss`, `GenericFunctionAssignedWalk.fss`. Detail: `compile-ladder/rung-generic-function-value/REPORT.md`, "The rule as built" and "Runs to report, not tests".

Now:

- F-367 **Under walk a generic function is a value, received at the arrow type of its parameter or variable.** A function with static parameters has a type of its own as a value (`interpreter/evaluator/types/FTypeGenericArrow.java`), below `Any` and below each arrow type it can be received at. A parameter, of a function or a constructor, a local variable declared with an arrow type, and a variable of arrow type at an assignment, a mutable top-level variable among them, receive the instance that a direct call with arguments of the arrow's domain types runs (`interpreter/evaluator/values/Fcn.java`, `received`; `interpreter/evaluator/EvaluatorBase.java`, `instanceReceivedAt`). A generic callee's static parameters are fixed by its other arguments first, so the row lift `rows(rmsn, x)` runs with a sized `rmsn`. Where the arrow type leaves a static parameter of the function open, and at `Any`, a type parameter or an untyped place, the value stays generic and each application infers its static arguments, as a direct call does; the compiled checker refuses those forms (row 1021). An overloaded name keeps its whole overload set, and its type as a value holds its generic overloads, so `pick(twice)`, for an overloaded `twice` with a generic declaration, runs the `pick` declared over an arrow type and not `pick(x: Any)` (`interpreter/evaluator/values/OverloadedFunction.java:3067`); no test pins this choice. Not built: an immutable top-level variable keeps the generic value (row 1019), and a callee's type parameter fixed only by a value's run-time type refuses the function (row 1018). A function declared in a block with static parameters of its own does not run under walk at all, called or passed (row 1020). Tests: `tests/GenericFunctionAsValueWalk.fss`, `GenericFunctionRowLiftWalk.fss`, `GenericFunctionAssignedWalk.fss`. Detail: `compile-ladder/rung-generic-function-value/REPORT.md`, "The rule as built" and "Runs to report, not tests".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the line citation of OverloadedFunction.java moved by climb batch 31's landing, checked at its member in the worktree, type() (cites [S2])

Report sections that the entry cites: [S58] `compile-ladder/rung-generic-function-value/REPORT.md`, "The rule as built".

## F-369, changed

- Size: at the base 1778 characters; at the landing 1769 characters; now 1769 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-369 **A top-level tuple binding compiles: each name is a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name.** The checker gives the tuple that it rebuilds from the checked elements their tuple type, from which each name's thunk reads its own (`scala_src/typechecker/impls/Decls.scala:272-277`); where only some names declare a type and the right side is no tuple expression of as many elements, it checks the right side again against each name's type (`Decls.scala:324-336`). The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>` and gives each name its own class, whose initializer takes its element out by the tuple's typed getter (`compiler/codegen/CodeGen.java:6528`); a wildcard binds nothing. Every compiled top-level variable is initialized at its first read, not at load as under walk, so a binding of wildcards alone never evaluates its right side (row 1011). So a model line of this form compiles as written, the model's lines 17 to 19 among them, and a name bound so is typed as a single binding's is: `explorations/run-c4/src/MicroGptFlat.fss:72`, `beta1 m`, is a new checker site against the one library (F-58). Under walk the same right side runs once for each name and once more (row 1026). A local tuple binding's declared name beside untyped names is still unchecked (row 1029), and a typed tuple binding over an `if` with tuple branches stops the code generator (row 1031). Tests: `compiler_tests/TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test`, `XXXTopLevelTupleBindingType.test`. Detail: `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" and "The binding as compiled".

Now:

- F-369 **A top-level tuple binding compiles: each name is a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name.** The checker gives the tuple that it rebuilds from the checked elements their tuple type, from which each name's thunk reads its own (`scala_src/typechecker/impls/Decls.scala:272-277`); where only some names declare a type and the right side is no tuple expression of as many elements, it checks the right side again against each name's type (`Decls.scala:324-336`). The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>` and gives each name its own class, whose initializer takes its element out by the tuple's typed getter (`compiler/codegen/CodeGen.java:6776`); a wildcard binds nothing. Every compiled top-level variable is initialized at its first read, not at load as under walk, so a binding of wildcards alone never evaluates its right side (row 1011). So a model line of this form compiles as written, the model's lines 17 to 19 among them, and a name bound so is typed as a single binding's is: `explorations/run-c4/src/MicroGptFlat.fss:72`, `beta1 m`, is a new checker site against the one library (F-58). Under walk the same right side runs once for each name and once more (row 1026). A local tuple binding's declared name beside untyped names is still unchecked (row 1029), and a typed tuple binding over an `if` with tuple branches compiles (row 1031, fixed). Tests: `compiler_tests/TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test`, `XXXTopLevelTupleBindingType.test`. Detail: `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" and "The binding as compiled".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the line citation of `CodeGen.java` moved by climb batch 31's landing, checked at its member in the worktree (cites [S2])
- Written by the gather: 2026-11-17 09:20Z · rewritten · from `explorations/compile-ladder/rung-numeral-block-end/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung E of climb batch 31b: row 1031 fixed (cites [S59])
- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

Report sections that the entry cites: [S60] `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why".

## F-372, changed

- Size: at the base 1752 characters; at the landing 2087 characters; now 2087 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-372 **The code generator writes each inherited method once into a trait's or an object's class, runs the declaration of the lowest type that declares it, and forwards to a body that an imported api's trait holds.** For the class of a trait or an object the code generator gathers the methods of the type and its supertypes without each declaration that a type strictly below its own declares again at the same parameter types, self apart, compared at the instance that the extends clauses give (`STypesUtil.allMethodsNotReplaced`). So the choice is a relation between two declarations, not the order of the gathered methods, and the library's shape of P-47, `MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below, no longer stops a class at load (row 990, fixed). A method that an imported api's trait declares without `abstract` counts as a body in that trait's class, so a trait that is not first in an extends clause gives its body, plain, generic and functional methods alike (row 732, fixed). A functional method with self not first is no longer written beside its dispatch method (row 571, fixed); behind it, an object's dispatch method still tests the receiver in place of the argument (rows 573 and 1038). The gatherings for the dispatch methods still use the schema comparison of `removeIdenticallyCoveredMethods`, and an object that reaches a generic trait's method along two paths, one through a trait that declares it again, is refused by the checker (row 1037). Tests: `compiler_tests/TraitOwnMethodBesideInheritedCompiled`, `ApiTraitMethodNotFirstCompiled`, `TraitMethodDiamondRedeclaredCompiled`, `FunctionalMethodMeetNarrowedSelfNotFirst`. Detail: `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".

Now:

- F-372 **The code generator writes each inherited method once into a trait's or an object's class, runs the declaration of the lowest type that declares it, and forwards to a body that an imported api's trait holds.** For the class of a trait or an object the code generator leaves out each declaration whose method a type strictly below the declaring type declares again at the same parameter types, self apart. A dispatch method's gathering still compares declarations as schemas over each trait's own bounds, not at the instance. So the choice is a relation between two declarations, not the order of the gathered methods, and the library's shape of P-47, `MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below, does not stop a class at load (row 990, fixed). A method that an imported api's trait declares without `abstract` counts as a body in that trait's class, so a trait that is not first in an extends clause gives its body, plain, generic and functional methods alike (row 732, fixed). A worker chose both readings, and the curator has not decided them; by the traits chapter's text, an object that reaches one method along two paths, one through a trait that declares it again, inherits both declarations, and the checker refuses that form where the traits are self-typed and generic (row 1037). A functional method with self not first is written once, not again beside the dispatch method of the same name (row 571, fixed), so such a class loads; but an object's dispatch method still tests the receiver in place of the argument, and where the receiver itself has the own declaration's parameter type, a call answers wrongly with no error: with `object Pq extends { K, P }` declaring `mark(x: K, self)` beside `P`'s `mark(x: Any, self)`, `mark(1, Pq)` gives 3 where walk gives 1 (rows 1038 and 573). Tests: `compiler_tests/TraitOwnMethodBesideInheritedCompiled`, `ApiTraitMethodNotFirstCompiled`, `TraitMethodDiamondRedeclaredCompiled`, `FunctionalMethodMeetNarrowedSelfNotFirst`. Detail: `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "2. The decisions that landed at a default" · from `explorations/compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the wrong answer behind row 571's fix (row 1038, found by rung M's skeptic) stated; the lower declaration and the api trait's body stated as a worker's choices (forks M1 and M2 of the batch's record); `STypesUtil.allMethodsNotReplaced`, the comparison at the instance and the dispatch methods' `removeIdenticallyCoveredMethods` left to the rung's report (cites [S9], [S61])

Report sections that the entry cites: [S61] `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".

## F-373, changed

- Size: at the base 2097 characters; at the landing 2104 characters; now 2104 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-373 **The compiled path runs `label` and `exit`: an exit is a thrown `LabelExit` that names one evaluation of its label block, and reaches it from a loop's body and from another task.** `CodeGen.forLabel` keeps a new `LabelExit.Target` in an immutable local under the label's name and takes, in a handler, the exits that name it; `CodeGen.forExit` throws `LabelExit.of(value, target)` (`compiler/codegen/CodeGen.java`, the two members above `defaultCase`; `runtimeSystem/LabelExit.java`). A function expression or a task whose body exits captures the target as it captures any immutable variable, because every identifier counts as a free variable (`compiler/codegen/FreeVariables.java:98`) and the checker lets no variable share a label's name (`scala_src/typechecker/impls/Misc.scala:704`). A group of forked arms joins the arms that it forked before the exit passes it: at four threads every forked iteration of a parallel `for` runs to its end or to its own exit, and the label's value is the exit of the first arm in the arms' order; at one thread the iterations after the exit do not run. No `catch` clause takes an exit. So the one library's `Indexed.indexOf` compiles in its own form (the test's `Holder.indexOf`), and row 81 is fixed. Four limits stand, each with its test: an exit out of an `atomic` block loses the block's writes (row 1039); a `finally` clause on the exit's way does not run (row 890); a label block as a call's later argument fails verification (row 322); a label block whose value joins a numeral with a number stops the code generator (row 340), so a number beside an exit's value is bound to a typed variable first. The paths differ on a `catch` of `Exception` around an exit (row 1040), on an exit after its label block has completed (row 1041) and on the evaluation that an exit leaves where the block is evaluated again inside itself (row 1042). Test: `compiler_tests/LabelExitCompiled`, which fails with 'Can't compile Label' without the two members. Detail: `compile-ladder/rung-label-exit/REPORT.md`, "What changed and why" and "Points to report reached".

Now:

- F-373 **The compiled path runs `label` and `exit`: an exit is a thrown `LabelExit` that names one evaluation of its label block, and reaches it from a loop's body and from another task.** `CodeGen.forLabel` makes a new target for each evaluation of the block and takes, in a handler, the exits that name it; `CodeGen.forExit` throws `LabelExit.of(value, target)` (`runtimeSystem/LabelExit.java`). A function expression or a task whose body exits captures the target as it captures any immutable variable. A group of forked arms joins the arms that it forked before the exit passes it: at four threads every forked iteration of a parallel `for` runs to its end or to its own exit, and the label's value is the exit of the first arm in the arms' order; at one thread the iterations after the exit do not run. No `catch` clause takes an exit. So the one library's `Indexed.indexOf` compiles in its own form (the test's `Holder.indexOf`), and row 81 is fixed. Three of the compiled answers were chosen as the path was built, and the curator has not decided them; walk answers each otherwise: which evaluation an exit leaves where the block is evaluated again inside itself, compiled the one in which the exit's function was made (row 1042); whether a `catch` of `Exception` takes an exit, compiled no (row 1040); and what an exit is after its label block has completed, compiled an uncaught `LabelExit` that ends the program (row 1041). Four limits stand, each with its test: an exit out of an `atomic` block loses the block's writes (row 1039); a `finally` clause on the exit's way does not run (row 890); a label block as a call's later argument fails verification (row 322); a label block whose value joins a numeral with a number stops the code generator (row 340), though by P-50 the numeral takes the label's expected type; a program binds the numeral to a typed variable first. Test: `compiler_tests/LabelExitCompiled`, which fails with 'Can't compile Label' without `forLabel` and `forExit`. Detail: `compile-ladder/rung-label-exit/REPORT.md`, "What changed and why" and "Points to report reached".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "2. The decisions that landed at a default" · from `explorations/reviews/batch-31-review.md`, "Findings for the record, with no decision of his changed" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the three answers on which the paths differ stated as chosen when the path was built (fork L1 of the batch's record, whose stated reason, walk's `forLabel`, is false; the review's finding 2); P-50 named beside row 340's label case; the handler's exception table, `FreeVariables.java:98` and `Misc.scala:704` left to the rung's report (cites [S9], [S62])

Report sections that the entry cites: [S63] `compile-ladder/rung-label-exit/REPORT.md`, "What changed and why".

## F-374, changed

- Size: at the base 1596 characters; at the landing 1746 characters; now 1746 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-374 **A compiled object's `var` field lives in a cell that the object holds, and an atomic expression is its body in an atomic block.** On the compiled path a `var` value parameter or `var` field of an object is a `MutableFValue` cell in a `public final` JVM field, made by the constructor; each read and write checks `BaseTask.inATransaction()` and goes through the transaction or the cell, by the code of a top-level `var` (`VarCodeGen.MutableFieldVar`, a `MutableStaticBinding`), and a loop body or a function expression in the object's method captures the cell, where before it captured a copy of the value. So an `atomic` block tracks a `var` field (row 319, fixed), and every access of one pays the transaction check, outside `atomic` too (row 641). A field without `var` holds its value and has no check. `atomic e` is compiled by `CodeGen.forAtomicBlock` on the block that holds `e` (row 875, fixed), with the block's limits (row 322); a numeral as its value at a place of declared type waits for the checker (row 1043). So a change of the transaction's variable code reaches fields with no second edit, and a new kind of nested context must capture a var field's cell as it does a top-level `var`'s. A `value` object with a `var` field, which the specification forbids and nothing refuses (row 112), is no longer strictly equivalent to another built alike. Tests: `compiler_tests/AtomicFieldCompiled`, `compiler_tests/VarFieldCapturedCompiled`, `compiler_tests/AtomicExprCompiled`. Detail: `compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why" and "The bytecode".

Now:

- F-374 **A compiled object's `var` field lives in a cell that the object holds, and an atomic expression is its body in an atomic block.** On the compiled path a `var` value parameter or `var` field of an object is a `MutableFValue` cell in a `public final` JVM field, made by the constructor; each read and write checks `BaseTask.inATransaction()` and goes through the transaction or the cell, by the code of a top-level `var`, and a loop body or a function expression in the object's method captures the cell. A worker chose the cell, and the curator has not decided it. So an `atomic` block tracks a `var` field (row 319, fixed), and every access of one pays the transaction check, outside `atomic` too (row 641). A field without `var` holds its value and has no check. `atomic e` is compiled by `CodeGen.forAtomicBlock` on the block that holds `e` (row 875, fixed), with the block's limits (row 322); a numeral as its value at a place of declared type is refused or fails verification, since the checker carries no declared type into it (row 1043). So a change of the transaction's variable code reaches fields with no second edit, and a new kind of nested context must capture a var field's cell as it does a top-level `var`'s. A `value` object with a `var` field, which the specification forbids and nothing refuses (row 112), is not strictly equivalent to another built alike: `V(1) === V(1)` is `false`, since `SEQV` compares the cells by identity. The one library declares one, `Lazy` (`Library/Lazy.fss:18`). Tests: `compiler_tests/AtomicFieldCompiled`, `compiler_tests/VarFieldCapturedCompiled`, `compiler_tests/AtomicExprCompiled`. Detail: `compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why" and "The bytecode".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "2. The decisions that landed at a default" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the cell stated as a worker's choice (fork A1 of the batch's record); the strict equivalence stated as it is, with row 112's mechanism and the one library's `Lazy`, in place of "no longer"; `VarCodeGen.MutableFieldVar` and the copy captured before left to the rung's report (cites [S9])

Report sections that the entry cites: [S64] `compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why".

## F-375, changed

- Size: at the base 1667 characters; at the landing 2172 characters; now 2172 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-375 **Walk's load check reads a generic declaration beside a plain one over an object type by the Return Type Rule, and its check of value types passes a type parameter.** A plain declaration whose domain lies inside an own generic's declared domain is read on the declared domains even where the lists differ only at object types: its result must lie below the generic's with the type parameters standing for themselves, or below an object type of its own that stands at a parameter of the type parameter that the generic returns, or below the generic's result at the instance that holds its domain where a static argument of a parameter type fixes each type parameter of that result (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed). A declaration that writes no return type is not judged there (row 1044), a `comprises` clause is not read (row 550), and two plain lists keep the team's shortcut (row 697). `FTraitOrObject.enforceValueness` refuses a declared type that is not a value type below a value type, and passes the symbolic type of a type parameter (row 997, fixed). So the merge of the number types with their objects meets neither defect. Four kinds of a program's own pair changed their verdict at load: two are now refused, and two now load. Tests: `ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.fss`, `GenericBesidePlainObjectValidWalk.fss`, `GenericBesidePlainEveryInstanceWalk.fss`, `TraitGenericMethodValueBoundWalk.fss`, `OverloadedGenericValueBoundWalk.fss`, `NonValueBelowValueTypeWalk.fss`. Detail: `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" and "Programs run old against new".

Now:

- F-375 **Walk's load check reads a generic declaration beside a plain one over an object type by the Return Type Rule, and its check of value types passes a type parameter.** A plain declaration whose domain lies inside an own generic's declared domain is read on the declared domains even where the lists differ only at object types, which the team's shortcut takes to exclude: the pair loads where the plain result lies below the generic's by one of three readings that the report gives, and is refused, in the rule's name, where none of them holds (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed). A declaration that writes no return type is not judged there (row 1044), a `comprises` clause is not read (row 550's pair at `ZZ64`, fixed since `ZZ64` is an object, F-379), and two plain lists keep the team's shortcut (row 697). `FTraitOrObject.enforceValueness` refuses a declared type that is not a value type below a value type, and passes the symbolic type of a type parameter (row 997, fixed). The coordinator chose to read no `comprises` clause and to leave unjudged a declaration that writes no return type; a worker chose the three readings and the check of value types; the curator has decided none of them. With the merge of the number types with their objects (P-178, F-379) every generic-beside-plain pair over the five is read on its declared domains: walk's suite loads every pair it loaded before, and of its expected-failure tests none moves between a refusal at load and a failure at run time (`compile-ladder/rung-number-objects/REPORT.md`, "Every pair that walk refuses at load after the change and loaded before"). Where the reading and the team's shortcut differ, some pairs are refused and others load; the report runs each old against new. Tests: `ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.fss`, `GenericBesidePlainObjectValidWalk.fss`, `GenericBesidePlainEveryInstanceWalk.fss`, `TraitGenericMethodValueBoundWalk.fss`, `OverloadedGenericValueBoundWalk.fss`, `NonValueBelowValueTypeWalk.fss`. Detail: `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" and "Programs run old against new".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Part 5. What changes run 2's sections" · from `explorations/reviews/batch-31-review.md`, "2. The decisions that landed at a default" · from `explorations/compile-ladder/rung-walk-value-bound/REPORT.md`, "Programs run old against new" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the merge clause bounded by the post-batch review's Part 5, "To add, 1"; the readings stated as chosen, `comprises` by the coordinator after the check of the record (fork V4), the rest by the worker (forks V1 and V2); the sentence on four kinds of pair whose verdict changed cut to what the reading does, with a pointer to the report's runs old against new; `returnRuleAtObjectArguments`' three conditions left to the rung's report (cites [S65], [S9], [S19])
- Written by the gather: 2026-11-17 09:18Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "Every pair that walk refuses at load after the change and loaded before" · by climb batch 31b gather: rung O of climb batch 31b: row 550 fixed, the pairs over the five measured after the merge (cites [S66])

Report sections that the entry cites: [S66] `compile-ladder/rung-number-objects/REPORT.md`, "Every pair that walk refuses at load after the change and loaded before"; [S18] `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why".

## F-376, changed

- Size: at the base 965 characters; at the landing 1098 characters; now 1098 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-376 **A compiled dispatcher of a generic declaration casts an arm's result to its own range.** Where an overload set's principal declaration returns one of its static parameters, the dispatcher that `OverloadSet` writes (`generateCall`, `generateLeafCall`) casts the result of each arm with another declared return type to that parameter, which the class loader instantiates; for an arm instantiated at run time the cast takes the place of the cast to the arm's declared return type. So a generic declaration beside a declaration on an object type verifies at every instance, where before the class of the generic's instance at another object type failed, 'VerifyError: Bad return type'. A dispatcher whose range is no static parameter has no such cast (row 699) and writes the bytecode that it wrote before. Test: the `run` step of `compiler_tests/OverloadReturnObjectDomain`. Detail: `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".

Now:

- F-376 **A compiled dispatcher of a generic declaration casts an arm's result to its own range.** Where an overload set's principal declaration returns one of its static parameters, the dispatcher that `OverloadSet` writes (`generateCall`, `generateLeafCall`) casts the result of each arm with another declared return type to that parameter, which the class loader instantiates; for an arm instantiated at run time the cast takes the place of the cast to the arm's declared return type. So a generic declaration beside a declaration on an object type verifies at every instance, where without the cast the class of the generic's instance at another object type fails, 'VerifyError: Bad return type'. A dispatcher whose range is no static parameter has no such cast (row 699). Test: the `run` step of `compiler_tests/OverloadReturnObjectDomain`; its call at `Box[\Square\]` fits two declarations, and whether its verdict can vary with the checker's order among tied generic candidates (row 499) is not established. Detail: `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "2. The decisions that landed at a default" · from `explorations/compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the fault before the cast stated as what the class does without it; the uncertainty of the one test stated, from the gate judge's third point (judge-gate.3), rows 499, 1046 and 1047 (cites [S9], [S11])

Report sections that the entry cites: [S11] `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".

## F-377, changed

- Size: at the base 1786 characters; at the landing 1928 characters; now 1928 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-377 **The compiled code casts `self` where the checker reads it as a listed type or as the self-type parameter.** `CodeGen.castToTypeBelow` casts a value that has self's type (the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait, at a single argument of a function, a method or a constructor (`evalArg`), at a typed binding and an assignment (`forExprsSerial`) and at a method's returned value (`generateActualMethodCode`), also where the value is a typecase whose arms each have self's type. So `den(self)` for `den(r: R)` in `trait Q comprises { R }` and `twin(self): S = self` in a self-typed trait verify and run (rows 991 and 695, fixed), as the one library's `QQ comprises { Ratio }` needs. Only `self` gets the reading: the checker refuses a variable declared at the trait where a listed type is expected. A closure's returned value and a conditional's arms get no cast (rows 1050 and 1051), and a trait that lists a type at a `where`-clause variable gets none (row 307). No cast is added where the value's type is a subtype of the declared type by `extends`; one is added, where the base emitted none and the class verified, at a declared trait type strictly below self's trait, since the verifier does not check an interface type. A later cast site gates on the expression's type before it compares types: asking the type analyzer at every argument stopped a link over a `bool` static argument. Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `compiler_tests/SelfTypeReturnSelfRun`, `compiler_tests/SelfTypeReturnSelfAtTraitRun`. Detail: `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why".

Now:

- F-377 **The compiled code casts `self` where the checker reads it as a listed type or as the self-type parameter.** `CodeGen.castToTypeBelow` casts a value that has self's type (the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait, at the argument of a call with one argument, of a function, a method or a constructor (`evalArg`; a call with several arguments casts each already), at a typed binding and an assignment (`forExprsSerial`) and at a method's returned value (`generateActualMethodCode`), also where the value is a typecase whose arms each have self's type. So `den(self)` for `den(r: R)` in `trait Q comprises { R }` and `twin(self): S = self` in a self-typed trait verify and run (rows 991 and 695, fixed), as the one library's `QQ comprises { Ratio }` needs. Only `self` gets the reading: the checker refuses a variable declared at the trait where a listed type is expected. A closure's returned value and a conditional's arms get no cast (rows 1050 and 1051), and a trait that lists a type at a `where`-clause variable gets none (row 307). An assignment from outside an object to its `var` field, of a value whose static type is a strict subtype of the field's type, fails at run time, `NoSuchMethodError`, also for `c.r := self` at a listed type (row 1053). No cast is added where the value's type is a subtype of the declared type by `extends`. One is added at a declared trait type strictly below self's trait, where the verifier, which checks no interface type, needs none; a worker chose it, and the curator has not decided it. Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `compiler_tests/SelfTypeReturnSelfRun`, `compiler_tests/SelfTypeReturnSelfAtTraitRun`. Detail: `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by climb batch 31 landing workflow (Opus): 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "2. The decisions that landed at a default" · from `explorations/reviews/batch-31-review.md`, "Part 4. Routing" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: the cast at a trait type below self's trait stated as it is and as a worker's choice (fork K1 of the batch's record, landed against its stated consequence, K.skeptic.1); row 1053 named beside the assignment; the cast site that asks the expression's type first, and the link it stopped, left to the rung's report (cites [S9], [S67])

Report sections that the entry cites: [S15] `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why".

## F-378, added

- Size: at the base none; at the landing 1360 characters; now 1360 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-378 **A compiled method's JVM parameters follow its declaration, and two bridges join an instance's boxed tuple to a body's elements.** One parameter of a declared tuple type is the tuple's elements, one JVM parameter each; one parameter whose declared type names a type parameter is one boxed JVM parameter at every instance, a tuple among them. The code generator writes a method of the boxed signature that calls a body at the tuple type with the elements (`CodeGen.tupleElementsBridge`), and the class loader, in an instantiated class, a method of the elements beside one whose template's parameter the instance makes a tuple (`runtimeSystem/Instantiater.java:119-165`); a dotted call passes the tuple boxed where the receiver's type holds only such declarations (`CodeGen.callTakesTupleBoxed`). So the shape of the one library's arrays of rank 2 and 3, a generic trait's methods over its index parameter given bodies at a pair or a triple, compiles and runs against the prelude; the one library's own arrays run compiled only after the switch-over. Still failing: an object's method overloaded at a pair (row 1054), an object's one pair value parameter (row 1055), a generic operator applied to a pair (row 1056). Test: `compiler_tests/TupleIndexMethodCompiled.test`. Detail: `compile-ladder/rung-tuple-parameter/REPORT.md`, "The convention as built".

History blocks of the range:

- Written by the gather: 2026-11-17 09:14Z · added · from `explorations/compile-ladder/rung-tuple-parameter/REPORT.md`, "The convention as built" · by climb batch 31b gather: rung T of climb batch 31b, folded from its record lines (cites [S68])
- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: the sentence claimed the one library's arrays, which no compiled run reaches before the switch-over; the test holds their shape (REPORT.md, "Programs run old against new", PGrid)

Report sections that the entry cites: [S68] `compile-ladder/rung-tuple-parameter/REPORT.md`, "The convention as built".

## F-379, added

- Size: at the base none; at the landing 1602 characters; now 1602 characters, over 600.
- Section now: "The library's arrays and algebra".

Now:

- F-379 **The one library and walk declare `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` each as one value object, whose native values walk builds from the glue class of the type's name, and a program's object below one is refused at load.** P-178's one-library half holds: the objects are `Library/FortressLibrary.fss:384`, `:846`, `:951`, `:1063`, `:1170`, walk's values made by the classes `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` of `interpreter/glue/prim/` (`interpreter/evaluator/BuildEnvironments.java:459-470`), and no `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong` is declared in the library or used by walk's Java; a typecase arm at one of those names takes every value (row 959). So `asif` at one of the five is the identity, walk's load check reads pairs over the five as over objects (rows 550, fixed, and 1044), and `object Mine extends ZZ32` is refused, 'Attempt to extend object type ZZ32'. The team split each into a trait and one native object of `FortressBuiltin` for `IntLiteral` and for nesting (`fca589bbb0`), which the flat tower and the numerals' own types removed. Under walk an object of a native component takes its values from the Java class of its name in the component's package (`interpreter/evaluator/BuildNativeEnvironment.java:42-48`), and the five, in `FortressLibrary`, so by a table. Seven of the eight number types are objects, `QQ` the trait; the compiler's prelude keeps its open traits (row 1003). Tests: `tests/NumberTypesAreObjectsWalk.fss`, `tests/NumberTypeExtendRefusedWalk.fss`. Detail: `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 09:18Z · added · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung O of climb batch 31b, folded from its record lines (cites [S28])
- Written by the gather: 2026-11-17 09:18Z · F-360 merged in, rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung O of climb batch 31b: F-360's five traits with one native object each are merged into their objects; the rule of walk's native objects kept (cites [S28])
- Written by the merged-diff review: 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: two comments of `interpreter/glue/prim/JavaBufferedReaderObject.java:18` and `JavaBufferedWriterObject.java:18` still name the object `Int`; no code uses the five names

Report sections that the entry cites: [S28] `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why".

## F-380, added

- Size: at the base none; at the landing 1237 characters; now 1237 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-380 **A numeral at the end of a block, or in a tuple, converts where it stands on the compiled path.** At a declared type (a return type, a typed binding, a parameter, an `if`'s other branch) the compiled checker converts a numeral that ends a block after a local declaration, and each numeral element of a tuple, by the type's own coercion of the numeral itself, so the code generator folds it into a constant (`scala_src/typechecker/impls/Functionals.scala`, `numeralResult` and `joinInto`); such a numeral outside the type's range is refused statically, as at a block's end without a declaration (`NumeralConversion.outOfRangeAt` in `scala_src/typechecker/CoercionOracle.scala`). At a place that fixes no type, a block after a local declaration keeps its numeral's own type, and a later conversion of the variable dies (row 1060). Tests: `compiler_tests/NumeralEndsBlockAfterDeclarationCompiled`, `BlockEndsInTupleOfNumeralCompiled`, `TupleBindingIfBranchesCompiled`, `NumeralJoinBeyondRange.fss` with `XXXNumeralJoinBeyondRange.test`; `XXXNumeralEndsUntypedBlockCompiled`. Detail: `compile-ladder/rung-numeral-block-end/REPORT.md`, "What changed and why"; `compile-ladder/rung-numeral-block-end/SKEPTIC.md`, "Findings and fixes".

History blocks of the range:

- Written by the gather: 2026-11-17 09:20Z · added · from `explorations/compile-ladder/rung-numeral-block-end/REPORT.md`, "What changed and why" · by climb batch 31b gather: rung E of climb batch 31b, folded from its record lines, with its skeptic's fact (cites [S59])

Report sections that the entry cites: [S59] `compile-ladder/rung-numeral-block-end/REPORT.md`, "What changed and why"; [S69] `compile-ladder/rung-numeral-block-end/SKEPTIC.md`, "Findings and fixes".

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] explorations/reviews/batch-31-review.md, "3. The measure: the declarations of the one library that the code generator refuses"

`facts-extract.sh 'doc:explorations/reviews/batch-31-review.md#3. The measure: the declarations of the one library that the code generator refuses'`

explorations/reviews/batch-31-review.md:125-137, 2590 bytes, cut at 2500.

~~~~
### 3. The measure: the declarations of the one library that the code generator refuses

The plan's measure is the number of declarations of the one library's fourteen components that the code generator refuses: 24 in 8 kinds before, 19 to 21 expected after run 1 (`CLIMB-BATCH-31.md:511-521`; the kinds, `compile-ladder/plan-31/PROBES.md:98-113`). L was to take off the 4 of `label` and A the 1 of the atomic expression; two of the four `label` declarations have a second wall behind the first.

**No stage of the run measured it on the merged tree.** The plan gives the measure to "the coordinator or the post-batch reviewer in a scratch worktree" after each run's landing (`CLIMB-BATCH-31.md:941`). No agent of the run ran `compile-ladder/plan-31/probes/planner/codegen-measure.sh`: its name stands in three transcripts, each time in a listing of the folder. The coordinating session did not run it after the launch. This review reads only. So the figure after run 1 is not known, and it is a step due before run 2.

**What the rungs' own runs show.** Each is a test against the compiler's prelude; no rung compiled a declaration of the one library.
- The four of `label`: `compiler_tests/LabelExitCompiled` compiles and runs the library's two forms, an `exit` out of a `for` in a method of a generic trait (`Holder.indexOf`, the form of `Library/FortressLibrary.fss:2189-2195`) and a label as a function's whole body with several exits (the form of `Library/String.fss:148-158`).
- The one of the atomic expression: `compiler_tests/AtomicExprCompiled` compiles and runs `OneShot`'s line (`Library/OneShotFlag.fss:18`).
- So by the tests the five first walls are gone, and 19 is within reach. Whether each of the five declarations then compiles is not shown. Two things can keep one refused: the second wall that the plan names (row 818 behind `SubString`'s `label`), and the limits that rung L itself left, of which one is near a library site: `simplestRationalBetween(a:QQ, b:QQ): QQ = label done` exits with numbers at a declared number type (`Library/FortressLibrary.fss:508-516`), the neighbourhood of row 340's label case.
- The measure's patch still applies to the landed tree: `git apply --check explorations/compile-ladder/plan-31/probes/planner/measure-hacks.patch` prints nothing on `main`, and `NN32`'s two getters stand as the script expects them (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:429-430`).

M, K, V and X do not move this number, as the plan says. Their walls are
~~~~

## [S2] explorations/reviews/batch-31-review.md, "Corrections owed in the record"

`facts-extract.sh 'doc:explorations/reviews/batch-31-review.md#Corrections owed in the record'`

explorations/reviews/batch-31-review.md:291-309, 2818 bytes, cut at 2500.

~~~~
### Corrections owed in the record

- **FACTS, false and not reworded by the gather:**
  - F-34 (`FACTS.md:38`): "refuses 24 declarations ... `label` 4 (row 81) ... `atomic` as an expression 1 (row 875)". Both rows are closed, and the figure is not measured again (section 3). Its sentence on the classes that fail when they load names rows 990, 991 and 732, which are closed.
  - F-352 (`FACTS.md:170`): "Not run: ... the library's `DOT` and `SUM` (row 732)" and "A test compiled against the prelude can show the first kind: ... `label` (row 81) ... a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732". Four of the rows are closed.
  - F-354 (`FACTS.md:199`): "a result that depends on the order can come and go between builds, as the choice between two copies of one method does (row 990)". The choice is made by a rule now (F-372).
  - F-361 (`FACTS.md:291`): its three gaps, rows 998, 997 and 542, are closed.
  - F-174 (`FACTS.md:306`): "In row 542, the checker refuses a generic declaration beside a plain one over an object type". It accepts the pair.
  - F-87 (`FACTS.md:91`): "`InferResultOnlyLabelBody`, a type-check test, since the code generator has no `label`". It has one.
  - F-240: "about 75 s" for the count stage against about 95 s, with no word that the rung's four whole-stage timings of that night were 88.5 s to 93.6 s. Its detail list has no review of this batch.
  - 15 line citations in 11 other entries moved (`moved31.py`): `CodeGen.java` in F-302, F-351, F-268, F-315 and F-369 by 107 to 133; `OverloadedFunction.java` in F-258, F-349, F-366 and F-367 by 97; `OverloadingOracle.scala` in F-258 by 40; `inference.tex` in F-173 by 1; `changes.tex` in F-175 by 10.
- **POSITIONS:** no sentence is made false by run 1, and no citation moved. P-68's clause on the two declarations of `round` becomes false with rung O, at finding 3's answer.
- **PLAN:**
  - "Where we stand", "Next" (`PLAN.md:13`): climb batch 31 "keeps five rungs" and "is planned with no go", and the merge is one "which no batch holds yet".
  - Phase 4's line of the batch (`PLAN.md:53`): "planned in two runs with no go"; rung L with "a name of its own for each closure class (rows 81, 315)"; no word of V, X, O and E.
  - F-34's line (`PLAN.md:66`): 24 declarations with rows 81 and 875 open, and "rungs L and A take off 7".
  - The rehearsal's line (`PLAN.md:68`): rows 990 and 991 among the walls "which climb batch 31 takes".
- **The review queue:** 
~~~~

## [S3] explorations/compile-ladder/rung-tuple-parameter/REPORT.md, "Points to report"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-tuple-parameter/REPORT.md#Points to report'`

explorations/compile-ladder/rung-tuple-parameter/REPORT.md:125-133, 1277 bytes.

~~~~
## Points to report

- The convention as built: above. Evidence: `CodeGen.java:901-982`, `:7333-7413`, `Instantiater.java:124-128`.
- Rows 992, 832 and 819: each reproducer fails on the landed tree and passes after (the table above; the tests' failing and passing runs).
- Existing tests that failed after the change: rows 397's and 840's expected failures, above, both promoted.
- The distance stage's shadow patch applies to the final `CodeGen.java`: exit 0.
- The specification's sentence changed: above, `changes.tex:3330-3333`.
- The files edited: above; `runtimeSystem/Instantiater.java` beyond those named.
- The reserved point, a change of a compiled method's JVM parameters where no tuple-typed parameter stands: reached by repair 6 only. An instantiated class of a component whose name begins `Tuple` no longer gets the twin, a method of the misread elements of a class that is no tuple (row 840; `TupleNamedComponentGenericParam`: old 'java.lang.VerifyError', new `PASS`). Everywhere else a descriptor changes only where a tuple stands at the instance. Repair 1 also changes how many values a forwarder loads, without changing its signature, for a method whose one parameter is `()`: it loads self alone, where before it read a parameter its signature does not have.
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

## [S5] explorations/compile-ladder/plan-31/probes/switch-rehearsal.md, "3. The code generator over the library today, against F-34"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/probes/switch-rehearsal.md#3. The code generator over the library today, against F-34'`

explorations/compile-ladder/plan-31/probes/switch-rehearsal.md:163-195, 3152 bytes, cut at 2500.

~~~~
## 3. The code generator over the library today, against F-34

`explorations/compile-ladder/plan-25/probes/codegen.sh`, the probe of F-34, run twice on the scratch tree.

On the seeded tree, unchanged: `FortressLibrary`, `FortressBuiltin` and `FlatString` are refused whole at the wrappers (row 874), and the other eleven components give 11 refused declarations in 6 kinds, 185 emitted.

With W2's tables, W3's search and W4's two lines, so with every helper string as landed (F-34 put the strings back on glue classes to get past row 874): **24 refused declarations in 8 kinds, 749 emitted, no component failure**, against F-34's 38 in 10.

    refused declarations 24 | emitted (OK lines) 749 | component failures 0
      FortressLibrary 12, List 4, String 4, CovariantCollection 1, Stream 1, OneShotFlag 1, FlatString 1
      7  Can't compile VarArgs yet  [String 3, FortressLibrary 2, List 1, FlatString 1]
      4  Can't compile Label  [FortressLibrary 3, String 1]
      4  <X> is not in the kind env  [List 2, FortressLibrary 1, CovariantCollection 1]
      4  Error trying to close method scope  [FortressLibrary 4]
      2  java.util.zip.ZipException: duplicate entry: <closure class>  [FortressLibrary 1, List 1]
      1  ClassCastException: IntersectionType to NamedType  [FortressLibrary 1]
      1  OptionUnwrapException at edu.rice.cs.plt.tuple.Null.unwrap:58  [Stream 1]
      1  Can't compile AtomicExpr  [OneShotFlag 1]

| kind | sites | row |
|---|---|---|
| varargs | `assert` and `deny` (`FortressLibrary.fss:307`, `:325`), `<|_|>` (`List.fss:177`), `CatString`, `EmptyString`, `stringifyChars` (`String.fss:75`, `:282`, `:337`), `FlatString` (its two calls of the varargs `assert`) | 624 |
| `label` | `simplestRationalBetween` (`FortressLibrary.fss:507`), `Indexed` (`:2117`), `Generator2` (`:4977`), `SubString` (`String.fss:353`) | 81 |
| kind env | `__bigOperator2` (`FortressLibrary.fss:1571`), `ArrayList` (`List.fss:252`), `app` (`List.fss:93`), `APPCOV` (`CovariantCollection.fss:30`) | 822, 812 |
| close method scope | the four range operators over pairs and triples (`FortressLibrary.fss:4369`, `:4370`, `:4412`, `:4413`) | 819 |
| duplicate closure class | `LexicographicOrder` (`FortressLibrary.fss:2216`), `List` (`List.fss:106`) | 315 by its text; not checked that the cause is the same |
| intersection | `__filter` (`FortressLibrary.fss:1404`) | 540 |
| varargs in a trait | `WriteStream` (`Stream.fss:33`) | 624 |
| `atomic` expression | `OneShot` (`OneShotFlag
~~~~

## [S6] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

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

## [S7] explorations/compile-ladder/rung-library-defects/REPORT.md, "Summary"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-library-defects/REPORT.md#Summary'`

explorations/compile-ladder/rung-library-defects/REPORT.md:11-24, 2704 bytes, cut at 2500.

~~~~
## Summary

I repaired the five api defects in Library/{RangeInternals,FortressLibrary,List}.fsi. The count stage reads 93 before and 103 after on this branch, not the record's 102. The difference is one decision, flagged for Pavol.
Defect 5 (QQ): I wrote comprises { AnyIntegral, ... }, not the record's comprises { AnyIntegral }. The component's QQ also comprises the private Ratio (FortressLibrary.fss:524, :599), and Specification/basic/components/source-code.tex:386-392 says an api clause may leave out a component-private type only by writing '...'.
The record's form moves the error rather than removing it. A probe of that shape is refused in the component (the private type is "not eligible to extend it"), and the export check (ExportChecker.scala:720-735) also rejects the mismatched lists.
The one error my clause keeps is a checker defect: TypeHierarchyChecker.scala:209-212 refuses any api trait that extends a trait whose comprises clause has '...', even one the clause lists. The team's own Compiled3.q has the same shape and gets the same refusal.
That defect now has a gated expected-failure test, compiler_tests/XXXComprisesEllipsisListed. It went red under a deliberate local checker fix and back to expected failure after the revert.
With that checker fix in place the stage reads 102, the record's number. Under rung P's placement, rebuilt from the triage's committed patches, my library reads 24 where the record's text reads 23. Condition.map's unmasked error is gone either way.
The manifest must declare expectedCheckerCount 103 for L, and the merged expectation with P becomes 24 (FortressLibrary row 6).
Nothing broke that I could measure. Thirteen interpreter programs are byte-identical before and after, apart from two timing lines. Across the nine compiled programs that import List and the eighteen microGPT components, phases and first errors are unchanged.
Precondition failure: neither my worktree nor my branch existed at launch. I created only mine, by remote-container.md:96-110, and pushed it.
The harness refused REPORT.md and record.md. Their content is in this result, and the RECORD items in notDone are ready for the coordinator to fold.

[Correction at the landing, the skeptic's correction 2: the expected-failure test `compiler_tests/XXXComprisesEllipsisListed` named above did not land. The team's `XXX3q.test` and `XXX10p.test` have the same shape and go red under the same listed-type fix, so they are row 354's gated home 2 (`probes/skeptic/junit-
~~~~

## [S8] explorations/compile-ladder/rung-numeral-types/REPORT.md, "What changed and why"

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

## [S9] explorations/reviews/batch-31-review.md, "2. The decisions that landed at a default"

`facts-extract.sh 'doc:explorations/reviews/batch-31-review.md#2. The decisions that landed at a default'`

explorations/reviews/batch-31-review.md:59-123, 12433 bytes, cut at 2500.

~~~~
### 2. The decisions that landed at a default

The record's section 3 holds 27 forks. Seventeen are run 1's (B1, B2, B3, H1, H2, S, M1, M2, K1, L1, L2, A1, V1, V2, V3, V4, X1), and run 1 also carried out O2 and O5. The run's result holds 36 items for the curator. Those that change what a program does or accepts follow. "Consequential" is the `coordinator` skill's rule (`SKILL.md`, "The curator's role and decisions").

**M1, the lower type's declaration replaces.**
- Landed: `STypesUtil.scala:1748-1770`. It is what the plan says, in the team's own wider form: a declaration of any type strictly below replaces, not only the trait's own. The worker first built the path-by-path reading of the specification, which wrote `m` twice into the plain diamond `object O extends { X, A, B }`, a program that prints the lower declaration on the base and under walk.
- No program that ran changes its answer. The plain diamond gives the lower declaration on the base and after (`compiler_tests/TraitMethodDiamondRedeclaredCompiled`, a plain test of today's answer with row 1037, the third way of `tests-writing.md`).
- Not consequential. What is open is a question that the batch did not decide: by the text of `Specification/basic/traits.tex:584-590` such an object inherits both declarations, and the checker refuses the self-typed generic form (row 1037; M.worker.1).

**M's consequence, row 1038: an error became a wrong answer.**
- Landed: since `CodeGen.java:873`, `object Pq extends { K, P }` with `mark(x: K, self)` beside `P`'s `mark(x: Any, self)` loads. `mark(1, Pq)` answers 3; walk answers 1. On the base the class did not load, 'Duplicate method name "mark?1"'. The site is row 573's, the dispatch method's test of the receiver, in `OverloadSet.java`.
- Not in the plan. The skeptic found it and gave it its expected failure (`compiler_tests/XXXFunctionalMethodSelfSecondReceiverTested`) and its place among his answers (`PLAN.md:143`, item 96).
- Not consequential by the rule: it bends no decision and can be undone. It is the one landed change that replaces a refusal by a silent wrong answer, so it is named in "For the curator".

**K1, and the cast at a declared trait type strictly below `self`'s trait.**
- Landed narrower than the fork's words: only a value that has `self`'s type is cast (`CodeGen.java:7451`), not every value whose static type is not a subtype by the `extends` clauses. The wider form stopped a link that passes today.
- Landed against the fork's stated consequence
~~~~

## [S10] explorations/reviews/batch-31-review.md, "What I did not do"

`facts-extract.sh 'doc:explorations/reviews/batch-31-review.md#What I did not do'`

explorations/reviews/batch-31-review.md:514-527, 1658 bytes.

~~~~
## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no code, test, specification text or entry of the record. I wrote this file and its line of `INDEX.md`.
- I did not take the batch's measure. The plan gives it to the post-batch reviewer as one way; this review reads only.
- I read the run's transcripts through scripts and the journal's results. For the two spans before the run I read only the transcripts' labels, times, models and writes. I read the coordinating session's transcript for its own writes by time, and for the turns of the go, the launch and the resume.
- A workflow's journal holds no times. The run's times are the agents' first and last records and the files' times.
- These are by reading, not run:
  - that the class of `StandardTotalOrder`'s default bodies at a number type fails verification after the merge (finding 1): the gather's measured program has the shape, and the library's lines have it;
  - that rung X's rule brings no refusal to the one library after the merge, and that rung V's reading refuses no pair of it (Part 5);
  - which of the library's `label` declarations would still be refused (section 3);
  - which rows fit run 2 (Part 5).
- I did not check each of the rungs' reported runs against their logs; the skeptics and the merged-diff review did, and I cite them. I read the six diffs of the source whole, and of the tests only the programs that the decisions name.
- I did not run `record.py check` or `ledger.py landing-check` again; the gather's, the review's and the commit stage's runs are cited.
- The skill's load is a rough count, not `skill-load.py`'s.
~~~~

## [S11] explorations/compile-ladder/rung-return-rule-object/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-return-rule-object/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-return-rule-object/REPORT.md:12-18, 3252 bytes, cut at 2500.

~~~~
## What changed and why

**The rule as built** (`OverloadingOracle.scala:114-122`, `:136-167`). `satisfiesReturnTypeRule(f, g)` builds, for `f` more specific than `g`, the special arrow `ra` over `f`'s static parameters and the static parameters of `g` that the domains do not force (the "kept" ones), with the domain `d1 ∩ d2` and `g`'s return type, and asks whether `f`'s arrow is a subtype of `ra`. Before this rung every instance of a kept parameter was compared. Now `meetingInstances(d1, d2, kept)` reads `g`'s domain `d2` and return type first: where a kept type parameter `T` of `g` is a whole parameter type of `d2` (the whole domain, or one element of its tuple) and `f`'s domain `d1` has an object type `C` at that position, `T` is replaced by `T ∪ C` in `d2` and in `g`'s return type. An object type is a `TraitType` whose index is an `ObjectTraitIndex`, with or without static arguments, or the self type of one. Where `T` stands at several positions, the union takes each object type found there. Nothing else is changed: a kept parameter inside a static argument, as `T` in `List[\T\]`, a size, a parameter whose position in `d1` is a trait, a tuple or an arrow type, and a domain with varargs or keywords are read as before.

**Where the paper's condition is read.** The paper counts the instances `U -> V` of the special arrow with `U` not `Bottom` (`Papers/Types/overloading-check.tick:180`). At a position where `f` has the object type `C` and `g` has `T`, the instance's domain holds `C ∩ T`. Below an object type there is only the object (`Specification/basic/types-vals-vars.tex:288`), so `C ∩ T` is not `Bottom` exactly where `C` is a subtype of `T`. The instances with `C <: T` are exactly the types `T ∪ C` for `T` within its bound (each such instance `T'` equals `T' ∪ C`; `f` more specific than `g` puts `C` within the bound). So the substitution keeps every instance whose domain can meet, and drops only instances whose domain is `Bottom`: the rule accepts no pair that the paper's rule refuses. It is one sufficient reading of "not `Bottom`", at object types only; the instances it still compares without need are those that only a `comprises` clause, a tuple type or a function type shows empty.

**The dispatcher's return** (`OverloadSet.java:1800`, `:1830`, `:1947`, `:1958-1971`). With the checker's repair alone the pair compiled and the run died as the class of the generic declaration's instance loaded: the dispatcher of `ident[\Square\]` holds the a
~~~~

## [S12] explorations/compile-ladder/rung-static-numerals/REPORT.md, "1. What changed and why"

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

## [S13] Specification/basic/inference.tex, "The Static Arguments of a Call"

`facts-extract.sh 'doc:Specification/basic/inference.tex#The Static Arguments of a Call'`

Specification/basic/inference.tex:45-348, 19843 bytes, cut at 2500.

~~~~
\section{The Static Arguments of a Call}
\seclabel{static-arg-inference}

The static arguments of a call that does not write them are found in two
steps: the declaration that the call invokes is chosen first, and it is
instantiated second.

\emph{Choice.}
The declaration is chosen as \secref{resolving-coercion} describes.
A declaration with static parameters is applicable to a call, without or with
coercion, if some instance of it whose static arguments satisfy their bounds is
applicable to the call.
Declarations are compared on the parameter types they declare, a declaration
with static parameters on its parameter types taken over every instance that
its bounds allow, and not on an instance inferred for the call.
So a coercion is applied only to make a call possible: it never changes which
declaration is chosen when one is applicable to the call without it.
The one exception is a numeral's own coercion, by which a numeral reaches a
declaration more specific than the one that fits it at its default
(\secref{coercion}).

\emph{Instantiation.}
The static arguments of the chosen declaration are then inferred, and with them
the instance of the declaration that the call invokes:
\begin{itemize}
\item A type parameter, or a \KWD{nat} or \KWD{int} parameter, that the
declared type of a parameter mentions other than as the whole type, as
\EXP{b\COLON\TYP{List}\llbracket{}T\rrbracket} mentions \VAR{T}, is fixed by
the argument at that position, whose type must be a subtype of the parameter
type of the instance.
\item Where the call has an expected type (below), a type parameter that the
declared return type mentions other than as the whole type is fixed by the
expected type as well.
\item A type parameter that is the whole declared type of one or more
parameters, as \VAR{T} is of \EXP{x\COLON{}T}, and that is not fixed as above,
takes, among the types of the arguments at those positions and the types to
which they can be coerced, the narrowest under $\morespecificeq$
(\secref{resolving-coercion}) that every one of those arguments is
substitutable for (\secref{applicability-with-coercion}) and that the bounds of
the type parameter permit.
For number arguments this is the narrowest type into which every one of them
converts: \EXP{\mathbb{Z}64} for a \EXP{\mathbb{Z}32} and a
\EXP{\mathbb{Z}64}, and also for a \EXP{\mathbb{Z}32} and an
\EXP{\mathbb{N}32}, though neither of them is a \EXP{\mathbb{Z}64}
(\secref{basic-integers}).
Where there is no such narrowest type, an
~~~~

## [S14] explorations/compile-ladder/rung-round-half-even/REPORT.md, "What landed"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-round-half-even/REPORT.md#What landed'`

explorations/compile-ladder/rung-round-half-even/REPORT.md:9-23, 1228 bytes.

~~~~
## What landed

Two tokens, one in each of the interpreter's two float `round` natives:

- `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java:384`, in `class Round extends R2L` (`:382-386`): `return Math.round(x);` becomes `return (long) Math.rint(x);`.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:326`, in `class Round extends F2L` (`:324-328`): `return (long) Math.round((double) x);` becomes `return (long) Math.rint((double) x);`.

And two new interpreter tests:

- `ProjectFortress/tests/RoundHalfEvenRungR.fss`: 21 assertions and a closing `PASS`, the rung's gate.
- `ProjectFortress/tests/XXXRoundNearTieNumeral.fss`, added in the repair round: four assertions of the specification's answers for four numerals near a tie, an expected failure today. It is the home-2 gate of the numeral defect the first skeptic measured (see "The numeral defect measured by the first skeptic").

`testSystem` goes from 384 to 386 tests (see "What else it touches").

Nothing else was edited: not `Floor`, `Ceiling`, `ICeiling`, `IFloor`, `Truncate` or `RawBits`, not the declarations in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:190-191` and `:341-342`, and not the compiled path.
~~~~

## [S15] explorations/compile-ladder/rung-comprises-cast/REPORT.md, "What changed and why"

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

## [S16] explorations/compile-ladder/climb-batch-31/RECORD.md, "The gather's own point"

`facts-extract.sh 'doc:explorations/compile-ladder/climb-batch-31/RECORD.md#The gather's own point'`

explorations/compile-ladder/climb-batch-31/RECORD.md:387-389, 1186 bytes.

~~~~
### The gather's own point

gather.1. Rung M's record says of a self-typed trait's body `mx(self, other: T): T = if lt(other, self) then self else other end` at an object instance that it 'waits for rung K after this rung' (`explorations/compile-ladder/rung-method-forwarders/REPORT.md`, "The self-return at an object type"), and its revival change keeps that limit. Rung K casts a method's returned value where the value has self's type, and no arm of a conditional (row 1051). On the merged tree the gather compiled and ran that trait with `object Late(x: ZZ32) extends { Tord[\Late\] }`: `bin/fortress compile` exits 0, and `bin/fortress run` dies, 'java.lang.VerifyError: Bad return type', 'Location: GTordLate$\=Tord?GTordLate\%Late?$DefaultTraitMethods.mx?0(...)', 'Type 'java/lang/Object' (current frame, stack[0]) is not assignable to 'GTordLate$Late''. The one library's `StandardTotalOrder` writes `MIN`, `MAX` and `MINMAX` in that shape (`Library/FortressLibrary.fss:291-294`). Row 1051 is noted; no test was written, the row's own expected failure holding the defect at a listed type. No text mismatch between one rung's specification text and another rung's code was found.
~~~~

## [S17] explorations/reviews/batch-31-review.md, "4. The gate, the count and the distance"

`facts-extract.sh 'doc:explorations/reviews/batch-31-review.md#4. The gate, the count and the distance'`

explorations/reviews/batch-31-review.md:139-147, 1972 bytes.

~~~~
### 4. The gate, the count and the distance

**The first gate was red on one test.** On `main` at `2c891b65b0`: `compiler_tests/XXXOverloadGenericObjectTwoParams`, an expected failure of rung X, reported 'Saw wrong failure' inside the suite's shared JVM; seven lone compiles gave the expected message. Everything else was green. The gate judge ruled a repair (`compile-ladder/climb-batch-31/JUDGE-gate.md`), the repair withdrew the test (`995993ceab`; section 2), and the whole gate ran again.

**The second gate is green,** as its agent returned it, on `main` at `995993ceab`: 63 suites, 3,484 tests, 0 failures (climb batch 32's 3,422): `CompilerJUTest` 1,616 to 1,667, the four system shards 856 to 867, all other suites unchanged; 24 atomic programs, 72 of 72 `PASS`, rung A's two among them; the ladder with no move; the checker count 0 over the same apis with no crash row, and the distance 0, both as at climb batch 32's gate. No row of the count's table is new or risen, so no rung edit is tied to one. microGPT's walk check gave 7 of 7 for both programs at the commit stage.

**The stages' seconds.** The distance stage took 136 s at the first gate and 143 s at the second (`FortressLibrary` 86 s), each beside the first minutes of `testFast`; F-240 says so. F-240 now gives the count stage as "about 75 s", from the times of two files of the gate's log, against climb batch 32's about 95 s, and the commit stage noted that the fall "stands in the entry without an explanation". Rung X and its skeptic timed the whole stage four times that night, on the base and on the change: 93.6 s, 93.2 s, 92.8 s and 88.5 s. So a fall of the stage is not shown; the two figures are not of the same span (Part 1, corrections).

**After the skeptics' fixes.** One skeptic fix changed code, K's (`f9bc4f2546`, the union case of `castToTypeBelow`); it ran its tests and no suite. X's skeptic's fix changed no code. The gate's suites and tables on the merged tree are their check.
~~~~

## [S18] explorations/compile-ladder/rung-walk-value-bound/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-value-bound/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-walk-value-bound/REPORT.md:11-16, 2302 bytes.

~~~~
## What changed and why

1. `FTraitOrObject.enforceValueness` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java:102-103) returns at once for a `SymbolicType`. The check refuses a type that is not a value type below a value type. The symbolic type that walk makes for a type parameter is a trait type that extends its bound, and where the bound is a value object the check refused it. A declared type that is not a value type is still refused below a value type.
2. The load check, `completeOverloadingCheck` (OverloadedFunction.java:513-527). The team's shortcut takes two parameter lists to exclude where every parameter at which they differ is an object type of one of them. For an own generic beside a declaration without static parameters whose domain lies inside the generic's declared domain (`plainInsideGeneric`, :837), the pair is now first read on its declared domains (`validOnDeclaredDomains`, :792). A reading that names a rule refuses the pair with that rule's message. A valid reading, and a reading that does not read the pair, leave the pair accepted as before. A Return Type Rule reading against a more specific declaration that writes no return type (`writesReturnType`, :862) is not acted on.
3. The reading on declared domains, plain declaration inside the generic one (OverloadedFunction.java:814-820). It was: the plain result below the generic result, its type parameters standing for themselves. It is now that, or `returnRuleAtObjectArguments` (:882): each static parameter that the generic's return type mentions is fixed by a static argument of one of its parameter types, or the generic returns that type parameter itself and the plain declaration has, at a parameter whose type in the generic is that type parameter, an object type below which its result lies; and the plain result lies below the result of the instance that holds the plain domain. An argument at an object type has that type itself, so every instance of the generic that applies returns a type at or above it. Below a trait type a lower argument selects a lower instance, so a trait type gives nothing.
4. `Specification/basic/inference.tex:267-268`: the box names the declared return type and the field of an object, row 1036, beside the immutable top-level variable.
~~~~

## [S19] explorations/compile-ladder/rung-walk-value-bound/REPORT.md, "Programs run old against new"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-value-bound/REPORT.md#Programs run old against new'`

explorations/compile-ladder/rung-walk-value-bound/REPORT.md:83-100, 2210 bytes.

~~~~
## Programs run old against new

Each under walk, new from the worktree and old by `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base35 <worktree>/tmp/old-caches P.fss`. The programs are scratch; each is given whole here.

| program | old | new |
|---|---|---|
| `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: NN32, b: ZZ64): NN32`, called on an `NN32` and a `ZZ64` | refused, 'fails the Return Type Rule' | loads, prints `4` |
| `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: NN32) = "two"` | loads, prints `two` | loads, prints `two` |
| `dup[\T extends NN32\](a: T): ZZ32` beside `dup(a: NN32): ZZ32` | stops, 'T@...: non-value subtype of value type NN32' | refused, 'fails because their parameter lists have the same types' |
| `object Ob` with `same(self): String`, beside top-level `same[\T\](a: T): T` | loads, prints `method` and `3` | refused, 'fails the Return Type Rule: the second is more specific ...' |
| `wrap[\T extends Number\](a: T): Box[\T\]` beside `wrap(a: NN32): Box[\NN32\]` | loads | refused, 'fails the Return Type Rule' |
| `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: ZZ64) = 2` | refused, 'fails the Return Type Rule' (`ZZ64->BOTTOM`) | the same |

The third row shows that the base also stopped a function's own type parameter bounded by a value object; the repair of the check covers it, and the pair is then a duplicate by the No Duplicates Rule. The fourth and fifth are refusals that the rule asks for and that the shortcut hid: at an `Ob` argument the instance at `Ob` returns an `Ob`, and `String` is not below it; `Box[\NN32\]` is not below `Box[\Number\]`, the result of the instance at `Number`, which applies to an `NN32`.

The planner's probes on the edit only: `PArrowRet.fss` and `PArrowField.fss` (explorations/compile-ladder/plan-31/probes/planner/) each print 'ran at size 2', as row 1036 gives for the base.

On the compiled path, from the base build (the checker is unchanged): `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: NN32) = "two"` is refused by `fortress compile`: 'the return type of NN32->String ... should be a subtype of the return type of [\T extends Number\]T->ZZ32'.
~~~~

## [S20] explorations/compile-ladder/rung-codegen-walls/REPORT.md, "1. What changed, and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-walls/REPORT.md#1. What changed, and why'`

explorations/compile-ladder/rung-codegen-walls/REPORT.md:9-18, 3508 bytes, cut at 2500.

~~~~
## 1. What changed, and why

Three changes in `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, and one helper that the second needs, nothing else of the original tree:

- `generateTypeReference`, its `AnyType` branch (base `:5795-5796`, now `:5845-5851`): it was empty and fell through to the throw 'Only handling some static args of generic types in extends clause' (base `:5802`). It now calls `generateTypeReference` with Any's own name, `NodeFactory.makeId(span, WellKnownNames.anyTypeLibrary(), WellKnownNames.anyTypeName)`, and no static arguments, and continues, as the `TraitType` branch does for a trait (`:5835-5837`). For a name without static arguments the method emits `GETSTATIC <its RTTI class>.ONLY` (`:5759-5767`), here `fortress/AnyType$Any$RTTIc.ONLY`, the field that the bootstrap class declares (`ProjectFortress/src/fortress/AnyType.java`, `RTTIc.ONLY`). The `BottomType`, `SelfType` and `AbbreviatedType` branches stay empty, each still ending in the throw (`:5833-5834`, `:5843-5844`, `:5852-5853`, throw `:5857`).
- `forTry` (base `:2019-2073`, now `:2019-2087`): the throw 'NYI: Forbid clauses are not yet implemented' (base `:2029-2030`) is gone. After the catch clauses, which are unchanged, each type of the forbid clause is tested in turn, as a catch clause tests its type (`DUP`, `FException.getValue`, `InstantiatingClassloader.generalizedInstanceOf`, `IFEQ`); on a match the exception's value is passed to `throwForbiddenException`. The rethrow (`ATHROW`) and the label `done` move out of the `if (catchClauses.isSome())` block (`:2041`, `:2078-2081`) and are emitted when the try has a catch clause or a forbid clause, so a try with neither emits what it emitted before.
- `throwForbiddenException` (new, `:2089-2122`): with the exception's value on the stack, it finds `ForbiddenException`'s constructor in the api index of `WellKnownNames.fortressLibrary()` (the component's own index when it is that library), takes its parameter type and its result, casts the value to the parameter's class, calls the constructor's static method through `idToPackageClassAndName` and `NamingCzar.jvmMethodDesc`, as a source call of `ForbiddenException(e)` is emitted, wraps the result in an `FException` as `forThrow` does (`NEW`, `DUP_X1`, `SWAP`, `INVOKESPECIAL`) and throws it. The api's own types are named unqualified in its index, so the descriptor is made with the library's api as the default: with the program's api the first run asked for `ForbidC
~~~~

## [S21] explorations/perf-probes/bound-any-compiled/REPORT.md, "The shapes by setting"

`facts-extract.sh 'doc:explorations/perf-probes/bound-any-compiled/REPORT.md#The shapes by setting'`

explorations/perf-probes/bound-any-compiled/REPORT.md:44-80, 4098 bytes, cut at 2500.

~~~~
## The shapes by setting

Each shape was written twice: U has no `extends` clause, and A has `extends Any` written, as a control. W writes the static argument and I leaves it to inference. "AME" stands for `AbstractMethodError`, "CCE" for `ClassCastException`, and "refused" for a checker error. Every program that compiled also loaded its classes; a failure is named where it happened.

| shape | U under (i) | A under (i) | U and A under (ii) |
|---|---|---|---|
| `id` at a pair, W | compiles (row 470), runs `id pair:  3   4` | runs | both run, `id pair:  3   4` |
| `id` at a pair, I | refused at the binding below the call: 'Right-hand side has type IntLiteral, but left-hand side is a tuple of 2 variables.' The call took `id(3)` (row 691, below) | runs | both run |
| `id` at an arrow, W | compiles (row 470), runs `id arrow:  4` | runs | both run |
| `id` at an arrow, I | refused: '[\T extends Object\]T->T is not applicable to an argument of type ZZ32->ZZ32.' | runs | both run |
| `id` at `()`, W | compiles (row 470), dies AME (row 339) | dies AME | both die AME |
| `id` at `()`, I | refused: '... not applicable to an argument of type ().' | dies AME | both die AME |
| `Box` at a pair, W | refused: 'Ill-formed type: Box[\(ZZ32, ZZ32)\] The static argument (ZZ32, ZZ32) does not satisfy the corresponding bound Object.' | runs `box pair:  3   4`, `box type:  Box[\(ZZ32,ZZ32)\]` | both run, same output |
| `Box` at a pair, I | refused: 'Right-hand side has type IntLiteral, ...' (row 691) | runs, `box type:  Box[\(IntLiteral,IntLiteral)\]` | both run, same output |
| `Box` at an arrow, W and I | refused (ill-formed type; not applicable) | runs `box arrow:  4`, `Box[\ZZ32->ZZ32\]` | both run |
| `Box` at `()`, W and I | refused | dies AME | both die AME |
| trait `Holder` extended at a pair, an arrow, `()` | refused, 2 errors each: 'Ill-formed type: Holder[\(ZZ32, ZZ32)\]' and the like | all run: `trait pair:  3   4`, `trait arrow:  4`, `trait unit: done` | all run |
| `over[\T\](x: T)` beside `over(x: String)`, at a pair | refused at `over(p)`, line 11: '[\T extends Object\]T->String is not applicable to an argument of type (ZZ32, ZZ32).' Lines 10 (`over((3, 4))`) and 12 (written) pass | refused: 'A functional which takes a single parameter of a parametric type bound by Any cannot be overloaded.' | U runs: `over String:  String`, then `generic` for the literal pair, the pair variable and the written pair. A is refused as under (i) |
| the same overload, at an arro
~~~~

## [S22] explorations/compile-ladder/rung-number-objects/REPORT.md, "Sentences of the specification"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-number-objects/REPORT.md#Sentences of the specification'`

explorations/compile-ladder/rung-number-objects/REPORT.md:168-180, 2530 bytes, cut at 2500.

~~~~
## Sentences of the specification

Changed, in the Effect of the entry on the natives' bindings, in place, as Appendix I's Effects are amended (`Specification/appendices/changes.tex:4808-4829`, `:4858-4862`):

- before: "374 of the 402 bindings of \library\ name a helper" / after: "373 of the 401 bindings ...".
- before: "\OPR{CHOOSE} of the traits ℤ32 and ℤ64" / after: "of the objects ℤ32 and ℤ64"; before: "but < of the trait ℤ" / after: "of the object ℤ".
- before: "the power of these three traits, of the trait ℕ64 and of the interpreter's object ℕ32" / after: "the power of these three objects and of the objects ℕ64 and ℕ32".
- before: "twenty-nine bindings of the trait ℕ64, its getter asNN32 among them, and of the interpreter's objects thirty-one of ℕ32, three of UnsignedLong, forty-one of Char, sixty-two of Float and fifty-one of ℝ32; the getters asString, asExprString and asFloat of the interpreter's objects Int, Long and BigNum" / after: "thirty-two bindings of the object ℕ64, its getter asNN32 among them, thirty-one of ℕ32, forty-one of Char, sixty-one of ℝ64 and fifty-one of ℝ32; the getters asString, asExprString and asFloat of ℤ32, ℤ64 and ℤ".
- before: "Where a binding declares ℕ32, ℕ64 or Char at a position at which its helper takes or answers a Java int or long, or UnsignedLong, the interpreter's object of ℕ64, at an argument, the compiler composes ..." / after: "... a Java int or long, the compiler composes ...".

Made false and not edited, for the gather: `Specification/appendices/changes.tex:4882-4886`, "and it reads the declaring type, not the value's, so a program's object that extends a carried trait of \library\ against its \KWD{comprises} clause, which the interpreter loads (row~551 of the revival's gap ledger), still reaches the helper with a value that no Java type carries": no carried type of the library has a `comprises` clause now (the five were the ones), and a program's object below one of the five is refused at load. No other Effect or note names the five objects (a grep of `Specification/` for the five names as words finds only these lines and the dimensions chapter's unrelated `Float` example). The trait wording of `Specification/basic-lib/basic-integers.tex:16`, `:106`, `:229` is the chapter's presentation of a built-in type, as for `Boolean`; it is listed under the questions.

Added by the skeptic: that sentence is brought in line on the branch, after the change, citing row 928 
~~~~

## [S23] .claude/skills/fortress-repo/references/interpreter.md, "Natives"

`facts-extract.sh 'doc:.claude/skills/fortress-repo/references/interpreter.md#Natives'`

.claude/skills/fortress-repo/references/interpreter.md:112-152, 5835 bytes, cut at 2500.

~~~~
## Natives

The library binds each of walk's natives by a declaration whose body is `builtinPrimitive("…")`. The string names one of these:

- A glue class, as `com.sun.fortress.interpreter.glue.prim.X`, in `interpreter/glue/prim/`. A glue class takes walk's `FValue` objects, so the compiled path cannot use it.
- A helper: a public static method of a class under `nativeHelpers/`, as `com.sun.fortress.nativeHelpers.simpleIntArith.<method>`. `interpreter/glue/StaticNativeApp.java` calls it by reflection, with a method's `self` first. The compiled path calls it too (`compiler.md`, "Natives"). Most bindings name a helper. The others name a glue class. F-299 counts both kinds (`records.md`, "Reading the record").

Walk carries each declared type of a helper's binding in one Java type:

- `ZZ32`, `NN32` and `Char` in `int`; `ZZ64` and `NN64` in `long`; `RR64` and `Float`, the library's object that extends `RR64`, in `double`; `RR32` in `float`; `Boolean` in `boolean`;
- `FlatString` and `JavaString` in `String`, and `String` too, except as a parameter other than `self`; `ZZ` in `BigInteger`; `()` in `void`; `JavaBufferedWriter` and `JavaBufferedReader`, the library's writer and reader traits, in `compiler/runtimeValues/FortressBufferedWriter` and `FortressBufferedReader`, which the checker reads back as the two traits.

In a method, walk carries `self` by the type that declares the method:

- a type of the list above, except `JavaString` and `()`, in the same Java type, but `FlatString` only where it is the library's own;
- the library's objects that extend number types, not the glue classes of the same names: `Int` (`ZZ32`) in `int`, `Long` (`ZZ64`) and `UnsignedLong` (`NN64`) in `long`, and `BigNum` (`ZZ`) in `BigInteger`.

A program can give its own type the name `FlatString` or `JavaString`. Walk tells the library's `FlatString` by the component that declares it, so a program's own type of either name carries no `self`. But walk carries a parameter declared at such a type in `String`, by the type's name alone, and does not refuse the binding. The native then receives the name of the type, not the value's text (ledger row 877). Give a program's own type another name.

Walk refuses a helper's binding at load in these cases. The message names the string, and contains the words below, which a `load_exception_contains` key can match:

- The class or the method does not exist: 'not found' or 'names no static method of'.
- The result type, or a parameter type oth
~~~~

## [S24] explorations/compile-ladder/climb-batch-28/RECORD.md, "The count of the bindings"

`facts-extract.sh 'doc:explorations/compile-ladder/climb-batch-28/RECORD.md#The count of the bindings'`

explorations/compile-ladder/climb-batch-28/RECORD.md:56-58, 1782 bytes.

~~~~
## The count of the bindings

A count of the `builtinPrimitive` strings of the one library's `.fss` files (`Library/` and `ProjectFortress/LibraryBuiltin/`, the `Compiler` files and `AnyType` left out) gives 444 strings, 341 naming a helper, at the base, one more than F-299's 443 live bindings: the glue string of `throwError` (`Library/FortressLibrary.fss:4818`), which F-299's 102 do not hold. Each rung's commit on `main` moves the count by its branch's own deltas: V −5 bindings, +6 helpers, −11 glue; R −15, +10, −25; A 0, +7, −7; H 0, +6, −6; S +1, +2, −1; K and T none. On the merged tree it gives 425 strings, 372 naming a helper, so by F-299's count **372 of the one library's 424 live bindings name a helper and 52 a glue class**: `IntLiteral`'s 21 and `FloatLiteral`'s 3 (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`) and `Reflect`'s 28 (`Library/Reflect.fss`). The batch record planned 422 and 370 with fork V1's three helper getters; rung V bound five, two of them on new helpers (V.worker.2). The gather revised Appendix I's natives effect to these numbers in rung S's commit, the last that moves a binding (`Specification/appendices/changes.tex:4627-4674`), each clause read against its binding: ZZ32's `big` (`Library/FortressLibrary.fss:860-861`), ZZ64's two getters (`:877-881`), NN64's `asNN32` (`:991-992`), ZZ's two (`:1097-1101`), the reader trait (`:1994-2014`), the two stores (`:2438-2453`), `Thread` and `abort` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:790-803`), `printTaskTrace` (`Library/FortressLibrary.fss:4689`), `args`' two (`Library/System.fss:32-33`), and the fifteen names the interpreter answers itself (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:47-65` and its rule for `arrayOps`).
~~~~

## [S25] explorations/compile-ladder/rung-natives-walk/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-walk/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-walk/REPORT.md:15-34, 4473 bytes, cut at 2500.

~~~~
## What changed and why

- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`, new, 225 lines: a `NativeMeth` for a string `com.sun.fortress.nativeHelpers.Class.method`. `find` (`:87-128`) loads the class, collects its public static methods of that name, and refuses at load: 'Native helper class … not found.', 'Native helper … names no static method of ….', '…: no Java type carries the declared type of parameter ….', '…: no Java type carries the declared result type.', '… has no overload that fits the declaration's types.', '… has N overloads that fit ….'. A method fits when its Java parameters are the declaration's at the Java types that carry them (`javaFor`, `:47-58`), one more in front for a dotted method's `self` (fork 9), `self` first for a functional method (fork 8), and its result type carries the declared one (fork 6). `call` (`:162-180`) unboxes each argument by the Java type (a `Char` as its code point), boxes the result at the declared type (`box`, `:205-224`: an `int` as `ZZ32`, `NN32` or `Char`, a `long` as `ZZ64` or `NN64`; fork 7), and turns a helper's `FortressImplementationError` 'fortress.<Api>$<Name>' into walk's `FortressError` of the library's `<Name>` (`raised`, `:182-191`; fork 11), as `Int.overflow()` raises `IntegerOverflow`.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:194-201`: the hook in `checkAndLoadNative`, before the glue class's load: a helper string goes to `StaticNativeApp`, a refusal is walk's `bug` at the declaration, as a missing glue class's (fork 10).
- `Library/FortressLibrary.fss:741-810`: 19 strings of trait `ZZ32` (`=`, `<`, the unary `-` and `DOTMINUS`, `+`, `DOTPLUS`, the binary `-` and `DOTMINUS`, `DOT`, `TIMES`, juxtaposition, `DOTTIMES`, `DIV`, `BITAND`, `BITOR`, `BITXOR`, `BITNOT`, `widen`, `unsigned`), and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:371`, `:373`, `Int`'s `asString` and `asExprString`, each naming the helper that the prelude binds or that computes it, by the patch's exact text (fork 12; `explorations/compile-ladder/plan-23/probes/movable-base.tsv`).
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`: `builtinPrimitive`'s comment revised, in its sixteen lines; `Specification/appendices/changes.tex`, the entry "A native binding that names a static helper" (`revival-native-helpers`); `explorations/compile-ladder/rung-natives-walk/decision-record.md`.
- Tests in `ProjectFortress/tests/`: the patch's five (
~~~~

## [S26] explorations/compile-ladder/rung-natives-self/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-self/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-self/REPORT.md:12-29, 3104 bytes, cut at 2500.

~~~~
## What changed and why

Walk's native loader read a method's `self` only by the helper's Java type. `StaticNativeApp.find` checked a `self` slot only for being a Java type that it carries, because the closures never told `NativeApp.checkAndLoadNative` which type declares the method (row 847). Now:

- `MethodClosure`'s two constructors pass their `definer`, and `FunctionalMethod`'s two pass their self type. They go through two new constructors of `FunctionClosure` (`FunctionClosure.java:61-71`) to `NativeApp.checkAndLoadNative(defn, isFunctionalMethod, declarer)` (`NativeApp.java:169`), which hands the type's name to `StaticNativeApp.find(s, defn, declarer)` (`NativeApp.java:201`). The two-argument `checkAndLoadNative` passes no type (`NativeApp.java:164-166`), so a top-level function, a local function and a function expression load as before.
- `StaticNativeApp.javaForSelf` (`StaticNativeApp.java:81-95`) gives the Java type that carries `self` for a declaring type. It covers `javaFor`'s names except `FlatString`, `JavaString` and `()`, plus the objects `Int`, `Long`, `UnsignedLong`, `Float` and `BigNum`.
- `find` with a declaring type (`StaticNativeApp.java:112-160`) refuses at load a type that `javaForSelf` does not carry (`:137-141`), with the message 'Native helper com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen: no Java type carries Holder, the type of self.' It takes only an overload that takes `self` first (`:147`) at that carrier (`:154`).

The planner's `rung-W.patch` applied clean. It is the whole change except for two lines:

1. **Self first.** The patch took `self`'s carrier only where the overload had one parameter more than the declaration (`off == 1`). So under a declaring type, a dotted method's helper that does not take `self` still loaded, and its call failed. Under a declaring type an overload must now take `self` first (`StaticNativeApp.java:147`, `:154`). This is the rule that the brief and fork 4 give ("takes only an overload whose first Java parameter is that carrier") and that `FortressBuiltin.fsi:19` states ("%self% first").
2. **Two names left out.** The patch carried `self` by `javaFor`'s names, which include `FlatString` and `JavaString`. A program can give its own type either name:
   - `JavaString` is declared only in the compiler's prelude (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:52`).
   - `FlatString` is declared in the component `FlatString` (`Library/FlatString.fss:34`), whose name the disambigua
~~~~

## [S27] explorations/compile-ladder/rung-string-natives/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-string-natives/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-string-natives/REPORT.md:9-47, 6053 bytes, cut at 2500.

~~~~
## What changed and why

Commits on `wip/rung-string-natives`: `15d81c1c1` (the tests, before the change), `19e9dbda5` (the change), `8b6fca9b5` (the line separator onto `stringOps`).

- **Walk's loader.** `NativeApp.java:201` passes `StaticNativeApp.find` the declaring type, not its name. `find(String, Applicable, FType)` (`StaticNativeApp.java:163`) reads `self`'s carrier through the new `javaForSelf(FType)` (`:122`): the object `FlatString` that the component `FlatString` declares at its top level, told by `declaringComponent` (`:136`) from the top level of the type's environment, carries `self` in a Java `String`; every other type is read by its name by `javaForSelf(String)` (`:103`), unchanged, so a program's own type named `FlatString` or `JavaString` still carries none. This is the probe's Java, hunk for hunk; the comment of `javaForSelf(String)` is reworded to say what the code does.
- **The last step, taken.** The new `javaForParameter` (`StaticNativeApp.java:70`) carries a parameter's declared type as `javaFor` does, except `String`: the loader refuses a helper parameter declared `String` at load, 'no Java type carries the declared type of parameter a.' (`:178-180`). A parameter declared `FlatString` or `JavaString`, and a result declared `String`, are still carried in a Java `String`.
- **`FlatString`'s methods**, 11 of 13 (`Library/FlatString.fss:35-101`), name helpers; `=` and `flatConcat(self, b:Char)` stay on `FlatString$Eq` and `FlatString$Concat` (item 331). `natLineSeparator` (`:25-26`) and `match` (`Library/FortressLibrary.fss:4615`) name helpers.
- **The five over `String` as pairs.** `printThreadInfo`, `printWithThread`, `printlnWithThread` (`Library/FortressLibrary.fss:4628-4644`, api `Library/FortressLibrary.fsi:2633-2639`) and `getEnvironment`, `getProperty` (`Library/System.fss:41-56`, api `Library/System.fsi:34-41`, with `import FlatString.{FlatString}` at `System.fss:14` and `System.fsi:14`) are each a public native over `FlatString` whose body is exactly `builtinPrimitive("...")`, beside an overload over `String` that flattens in the library's `typecase` and stops with `fail` in its `String` arm. `printThreadInfo(a:Number)` stays on `StringPrim$PrintThreadInfo`.
- **Helpers.** New, public and static, no state: in `stringOps.java` `asExprString` (`:44`, quoting through `Unprinter.enQuote` as `FString.toString` does, `interpreter/evaluator/values/FString.java:31-33`), `compareToIgnoreCase` (`:48`), `javaSubstr` (`:53`, Java's `sub
~~~~

## [S28] explorations/compile-ladder/rung-number-objects/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-number-objects/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-number-objects/REPORT.md:15-75, 10096 bytes, cut at 2500.

~~~~
## What changed and why

P-178 asks that each built-in number type be one `value object` under its own name, as `NN32` and `RR32` already are, and that walk's native objects `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` go. The one library had the pattern `trait ZZ32 ... excludes {...} comprises { Int }` with `value object Int extends ZZ32` in `FortressBuiltin`; a program could not name the object as a type to good effect, but it could extend the trait (row 551), and the trait's 56 bodies through `asFloat(self)` ran only under `asif RR64`.

### The library's text, by file (`git diff --numstat -M 647163a9c4 HEAD`)

| File | Added | Deleted | What |
|---|---|---|---|
| `Library/FortressLibrary.fss` | 164 | 80 | five `trait X ... excludes ... comprises { O }` become `value object X ...`; each takes its object's members |
| `Library/FortressLibrary.fsi` | 11 | 21 | the five headers; `abstract` off the five `asFloat` |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` | 1 | 186 | the five objects deleted; `RR32`'s `opr ^(self, b:Float)` names `RR64` (`:191`) |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` | 1 | 15 | the five objects' declarations deleted; `RR32`'s `^` at `RR64` (`:107`) |
| `Library/ReflectiveQuickCheck.fss` | 4 | 4 | the comment of `adaptType`: its example `Float` below `RR64` becomes `FlatString` below `String` |

The members each type took from its object (the merge was made by a script that matched members by name and parameter types, the object's `Float` read as `RR64`):

- `ZZ32` (`Library/FortressLibrary.fss:846`) from `Int`: the getters `asString` and `asExprString` (`simpleIntArith.intToString`), placed after `one`, since an object's getters stand before its methods; the body of `asFloat` (`intToDouble`) in place of the trait's abstract declaration.
- `ZZ64` (`:951`) from `Long`: `asString`, `asExprString` (`longToString`), `asFloat` (`longToDouble`).
- `ZZ` (`:1170`) from `BigNum`: `asString`, `asExprString` (`simpleArbitraryPrecisionArith.toString`), `asFloat` (`toDouble`).
- `NN64` (`:1063`) from `UnsignedLong`: the getters `zero` and `one`, which the trait lacked, and `asString`, `asExprString` (`unsignedLongToString`), before the trait's first getter; `asFloat` (`unsignedLongToDouble`).
- `RR64` (`:384`) from `Float`, 61 bindings: the getters `asString` and `asExprString` (new, after `one`); the bodies of the getters `isNaN`, `isInfinite`, `rawBits`, `signBit`, `nextUp`, `nextDown`; `asFloat(self) = self`; `nar
~~~~

## [S29] explorations/compile-ladder/rung-natives-float/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-float/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-float/REPORT.md:15-21, 3035 bytes, cut at 2500.

~~~~
## What changed and why

- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:51`, `javaFor`: `if (t.equals("RR64") || t.equals("Float")) return double.class;`. A `Float` is walk's run-time `RR64` (`FFloat`); `unbox` reads a Java `double` from any value by `getFloat()` (`:196`), and `box` makes an `FFloat` of a `double` whatever the declared name (`:218`), so the one line is the whole carry, for a parameter and for a result. Twelve of the 30 declare a parameter `Float`; without the line walk refuses the library at load.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:55-193`, `value object Float`, 30 strings, each the one line after its header, one line for one: `asString` and `asExprString` (`:56`, `:58`, `doubleToString`), `opr |self|` (`:80`, `doubleAbs`), `=`, `<`, `<=`, `>`, `>=` (`:82`, `:86`, `:88`, `:90`, `:92`; `doubleEQ`, `doubleLT`, `doubleLE`, `doubleGT`, `doubleGE`), the unary `-` (`:102`, `doubleNeg`), `+`, `-`, `DOT`, `TIMES`, juxtaposition, `/` (`:104`, `:106`, `:108`, `:110`, `:113`, `:115`; `doubleAdd`, `doubleSub`, `doubleMul` three times, `doubleDiv`), `SQRT` (`:117`, `doubleSQRT`), `^` at a `Float` and at an `RR64` exponent (`:155`, `:159`, `doublePow`), `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `log`, `exp` (`:165` to `:181`, `doubleSin` to `doubleExp`), `floor`, `ceiling` (`:183`, `:187`), `truncate`, `round` (`:191`, `:193`, `doubleTruncate`, `doubleRound`, at `ZZ64`, fork 11). Each line is the families table's (`families-base.tsv`, 30 of 30 checked by script); the edit's changed lines equal the patch's, 62 of them (`diff` of the two sorted sets prints nothing).
- Left on their glue classes, as the brief gives: `isNaN`, `isInfinite`, `rawBits`, `nextUp`, `nextDown`, `narrow`, `=/=`, `MIN`, `MAX`, the 18 directed roundings, `^` at an `RR32` and at an `AnyIntegral` exponent, `atan2`, `|\self/|` and `|/self\|`: 32. The 33rd `Float$Pow` string of the file, `:329`, is `RR32`'s `^` at a `Float` exponent, not `Float`'s.
- Counted over the library's one-line strings (`git grep -h -o 'builtinPrimitive("com.sun.fortress.nativeHelpers' -- Library ProjectFortress/LibraryBuiltin | wc -l`): 21 on the base, 51 on this tree; the strings under `com.sun.fortress.interpreter`, 392 and 362. By F-32's count of 449 live bindings: 51 name a helper and 398 a glue class, with this rung alone.
- Tests: `ProjectFortress/tests/NativeHelperFamilyFloatWalk.fss` (the walk guard, 146 assertions over the 30 on the worker's head, 22
~~~~

## [S30] explorations/compile-ladder/rung-natives-float-bits/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-float-bits/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-float-bits/REPORT.md:15-23, 4107 bytes, cut at 2500.

~~~~
## What changed and why

- `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:136-246`: 28 public static helpers at the class's end, each one line that returns what its glue class's `f` returns (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java:94-98`, `:136-242`, `:250-254`, `:280-290`, `:394-434`): `doubleIsNaN` and `doubleIsInfinite` (`Double.isNaN`, `Double.isInfinite`), `doubleRawBits` (`Double.doubleToRawLongBits`, a `long`), `doubleNextUp` and `doubleNextDown` (`DirectedRounding.nextUp`, `nextDown`), `doubleToFloat` (`(float) a`, a `float`), `doubleNE` (`a != b`), `doubleMin` and `doubleMax` (`Math.min`, `Math.max`), the ten NaN-free roundings and roots `doubleAddUpNoNaN`, `doubleSubUpNoNaN`, `doubleMulUpNoNaN`, `doubleDivUpNoNaN`, `doubleSqrtUp`, `doubleAddDownNoNaN`, `doubleSubDownNoNaN`, `doubleMulDownNoNaN`, `doubleDivDownNoNaN`, `doubleSqrtDown` (`DirectedRounding.addUpNoNaN` to `sqrtDown`), the eight IEEE ones `doubleAddUp` to `doubleDivDown` (`DirectedRounding.addUp` to `divideDown`), and `doubleFromRawBits` (`Double.longBitsToDouble`). Each is named `double` and its glue class's name, as the sample's `doubleAddUpNoNaN`; `narrow` and `=/=` take the brief's `doubleToFloat` and `doubleNE`, beside `floatToDouble` and `doubleEQ`. `DirectedRounding` is named in full, as the sample does, so that nothing but the class's end changes. Every parameter and result is `double`, `float`, `long` or `boolean`, which the compiler prelude's wrapper maps, and the prelude's library order made its five jars with the new methods in the wrapper.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:61-153`, `value object Float`, 27 strings, each the one line after its header, one line for one: `isNaN` `:61`, `isInfinite` `:64`, `rawBits` `:67`, `nextUp` `:71`, `nextDown` `:74`, `narrow` `:78`, `=/=` `:84`, `MIN` `:96`, `MAX` `:98`, `PLUS_UP` to `SQRT_DOWN` `:119` to `:137`, `IEEE_PLUS_UP` to `IEEE_SLASH_DOWN` `:139` to `:153`.
- `Library/FortressLibrary.fss:4535`: `fromRawBits`'s string, `doubleFromRawBits`.
- Left on glue classes, as the brief gives: `Float`'s `^` at an `RR32` and at an `AnyIntegral` exponent, `atan2`, `|\self/|` and `|/self\|` (`FortressBuiltin.fss:157`, `:163`, `:177`, `:185`, `:189`), item 331; `:329` is `RR32`'s `^`, rung P's.
- Counted (`git grep -h -o 'builtinPrimitive("com.sun.fortress.nativeHelpers' <rev> -- Library ProjectFortress/LibraryBuiltin | wc -l`): 173 at `97a416b18`, 201 at `c0b8dc0ed`
~~~~

## [S31] explorations/compile-ladder/rung-natives-integers/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-integers/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-integers/REPORT.md:11-26, 3902 bytes, cut at 2500.

~~~~
## What changed and why

P-58 has each native binding's string name a static helper of `nativeHelpers/`, step by step, checked by the compiled checker from the step that moves it; F-299 has walk load such a string beside its glue classes and raise a helper's `DivisionByZero` or `IntegerOverflow` as the library's own. This rung moves the next 36, in `Library/FortressLibrary.fss` only, one string per binding, the planner's `explorations/compile-ladder/plan-24/probes/rung-Z.patch` taken as it is (`git apply` on the base, 36 lines changed for 36):

- trait `ZZ64` (`:831-905`), 20: `=` and `<` on `simpleLongArith.longEQ` and `longLT`; the prefix `-` and `DOTMINUS` on `longOverflowingNeg` and `longWrappingNeg`; `+`, `DOTPLUS`, the infix `-` and `DOTMINUS` on `longOverflowingAdd`, `longWrappingAdd`, `longOverflowingSub` and `longWrappingSub`; `DOT`, `TIMES` and juxtaposition on `longOverflowingMul`, `DOTTIMES` on `longWrappingMul`; `DIV` on `longOverflowingDiv`; `BITAND`, `BITOR`, `BITXOR` and `BITNOT` on `longBitAnd`, `longBitOr`, `longBitXor` and `longBitNot`; `narrow` on `simpleIntArith.longWrappingToInt`; `unsigned` on `simpleUnsignedLongArith.makeNN64FromZZ64WithSpecialCompilerHackForNN64ResultType`; `big` on `simpleArbitraryPrecisionArith.makeZZfromZZ64`.
- trait `ZZ` (`:1007-1076`), 16, all of `simpleArbitraryPrecisionArith`: `=` on `eq`; the prefix `-` and `DOTMINUS` on `neg`; `+` and `DOTPLUS` on `add`; the infix `-` and `DOTMINUS` on `sub`; `DOT`, juxtaposition, `TIMES` and `DOTTIMES` on `mul`; `DIV` on `div`; `BITAND`, `BITOR`, `BITXOR` and `BITNOT` on `and`, `oor`, `xor` and `not`.

28 helpers in all. Left on their glue classes, as the brief has them: `ZZ64`'s `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE` (rung K), `LSHIFT`, `RSHIFT`, `^` and `partitionL` (`:873-899`); `ZZ`'s `cmp`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `LSHIFT`, `RSHIFT`, `shift`, `^`, `narrow` and `widen` (`:1020-1084`). None of the 36 is left on its glue class.

`longOverflowingDiv` raises `fortress.CompilerBuiltin$DivisionByZero` at a zero divisor (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java:78-82`), and so does `div` (`simpleArbitraryPrecisionArith.java:42-45`); walk's loader raises that as the library's `DivisionByZero` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:186-192`). So `ZZ64`'s and `ZZ`'s `DIV` by zero now throw `DivisionByZero`, which a `catch` sees, as the specification says. The glue classes they replace divide with
~~~~

## [S32] explorations/compile-ladder/rung-natives-small/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-small/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-small/REPORT.md:11-34, 2834 bytes, cut at 2500.

~~~~
## What changed and why

Under P-58, each native binding's string names a static helper of `nativeHelpers/`. The bindings move one family at a time, and from the step that moves a binding, the compiled checker reads it against the helper's Java signature. This rung moves the small rest: 8 strings, by the planner's `rung-S.patch` taken as it is.

| declaration | was | now |
|---|---|---|
| `value object Long`, `getter asString()` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:379-380`) | `Long$ToString` | `simpleLongArith.longToString` |
| `value object Long`, `getter asExprString()` (`:381-382`) | `Long$ToString` | `simpleLongArith.longToString` |
| `value object NN32`, `signed(self):ZZ32` (`:469-470`) | `NN32$ToInt` | `simpleUnsignedIntArith.makeZZ32FromNN32WithSpecialCompilerHackForNN32ArgumentType` |
| `value object BigNum`, `getter asString()` (`:566-567`) | `BigNum$ToString` | `simpleArbitraryPrecisionArith.toString` |
| `value object BigNum`, `getter asExprString()` (`:568-569`) | `BigNum$ToString` | `simpleArbitraryPrecisionArith.toString` |
| `value object Char`, `getter codePoint()` (`:616-617`) | `Char$CodePoint` | `simpleChar.charCodePointWithSpecialCompilerHackForCharacterArgumentType` |
| `trait NN64`, `signed(self):ZZ64` (`Library/FortressLibrary.fss:985-986`) | `UnsignedLong$ToLong` | `simpleUnsignedLongArith.makeZZ64FromNN64WithSpecialCompilerHackForNN64ArgumentType` |
| top-level `char(a:ZZ32):Char` (`Library/FortressLibrary.fss:4540`) | `Char$Chr` | `simpleChar.charMakeCharacterWithSpecialCompilerHackForCharacterResultType` |

Each helper computes what its glue class computed:

- `Long.toString(x)`: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java:19-21`, against `interpreter/glue/prim/Long.java:262-266`.
- `b.toString()`: `simpleArbitraryPrecisionArith.java:26-28`, against `BigNum.java:274-278`.
- The identity on the `int` or `long`: `simpleUnsignedIntArith.java:231`, `simpleUnsignedLongArith.java:228`, `simpleChar.java:57` and `:63`, against `NN32.java:239-243`, `UnsignedLong.java:239-243` and `Char.java:159-169`.

Walk carries `NN32` and `Char` in an `int` and `NN64` in a `long`, and answers each by the declared result (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:205-224`; F-299). So `char` answers a `Char`, and `signed` a `ZZ32` or `ZZ64`, as their glue classes did. The checker reads `int` as `NN32` or `Char`, and `long` as `NN64`, only for the six special names (`ProjectFo
~~~~

## [S33] .claude/skills/fortress-repo/references/compiler.md, "Natives"

`facts-extract.sh 'doc:.claude/skills/fortress-repo/references/compiler.md#Natives'`

.claude/skills/fortress-repo/references/compiler.md:77-101, 5185 bytes, cut at 2500.

~~~~
## Natives

`import java com.sun.fortress.nativeHelpers.{...}` in a `.fss` file binds static Java methods over plain Java values.

A body `builtinPrimitive("com.sun.fortress.nativeHelpers.Class.method")` binds one such method, a helper, too. In a compile, at the parse, the compiled path, and not walk, rewrites the body as a call of the method through a generated `import java`, with `self` first in a trait or object (`compiler/BuiltinPrimitiveRewriter.java`). The checker then checks the declaration against the method's Java signature. In a compile, it reads `int` as `ZZ32`, `long` as `ZZ64`, `float` as `RR32`, `double` as `RR64`, `boolean` as `Boolean`, `String` as `JavaString`, `BigInteger` as `ZZ` and `Object` as `Any` (`NamingCzar.fortressTypeForForeignJavaType`). The compile stops in these cases:

- If the string is in that package but names no public static method: 'builtinPrimitive names no static helper: …'.
- If the string names a glue class or anything else outside that package: 'Variable builtinPrimitive is not defined.'
- If the declaration has a varargs parameter: the same message (ledger row 849).
- If the declaration is a local function or a method of an object expression: the same message. The rewrite reaches only a component's declarations and the members of its traits and objects (ledger row 865).

The rewrite runs only in a JVM that has made a Fortress repository of the compiled path, the compiler's store of components, not this git repository. Walk's repository switches it off again. `fortress compile` makes one, and so do `disambiguate`, `grammar`, `desugar` and `typecheck` (`Shell.compilerPhases`). `fortress parse` and `fortress api` make none, so they rewrite a body only after a compile in the same JVM (ledger row 882). Alone, they pass a misspelt helper. Test a binding with `compile`. In a suite, the result of `parse` or `api` depends on whether a compile ran earlier in the same JVM.

To test a helper on the compiled path, write a compiled test whose own declarations bind it, as `compiler_tests/NativeHelperBindingCompiled.fss` does. Until the switch-over, a compiled test cannot reach the interpreter's library's bindings.

The count stage and the distance stage check the interpreter's library with the same rewrite. There, the checker differs from a compile in these ways:

- A string that names a glue class, or a declaration with a varargs parameter, does not stop the check. The body stays a call of `builtinPrimitive`, typed at the de
~~~~

## [S34] explorations/compile-ladder/climb-batch-27/RECORD.md, "The count of the bindings"

`facts-extract.sh 'doc:explorations/compile-ladder/climb-batch-27/RECORD.md#The count of the bindings'`

explorations/compile-ladder/climb-batch-27/RECORD.md:62-64, 776 bytes.

~~~~
## The count of the bindings

A count of the `builtinPrimitive` strings of walk's library, comments struck, gives 305 of 447 naming a helper and 142 a glue class at the base, against F-299's and F-32's 306 of 449 and 143: the same deltas on each branch as the rungs' own counts (I +16 helpers, -16 glue; F +9, -10, one binding fewer; C +1, -1; A +2, -3, one fewer; W +7, -11, four fewer). On the merged tree it gives 340 of 441 and 101, so by F-299's count 341 of the one library's 443 live bindings name a helper and 102 a glue class. The batch's brief planned 341 of 438: rung W left `FileWriteStream`'s 5 bindings on their glue (row 926). The gather revised Appendix I's natives effect to these numbers in rung W's commit (`Specification/appendices/changes.tex:4625-4658`).
~~~~

## [S35] explorations/compile-ladder/rung-natives-hard/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-hard/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-natives-hard/REPORT.md:11-17, 3072 bytes, cut at 2500.

~~~~
## 1. What changed and why

P-58 has each native binding name a static helper of `nativeHelpers/`, checked against its helper from the step that moves it. For a binding over `NN32`, `NN64` or `Char`, walk already carries the declared type in a Java `int` or `long` (F-299), but the compiled checker reads every helper's `int` as `ZZ32` and `long` as `ZZ64`, except for six transfer helpers with fixed names (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:368-390`, `:493-504`; F-298). Question 2 of the batch record took the hard-set probe's way 2b at its default (`explorations/coordinator/CLIMB-BATCH-24.md:90-100`): the compiled path's rewrite composes the call with those six transfers, as the team's prelude does.

- **The rewrite** (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java`, +95 −12). Each declaration is told its owner, the simple name of the enclosing trait or object, `""` for a generic one, `null` at the top level (`:75`, `:91`). `fn` records each argument's declared type by its simple name, `self` taking the owner's (`:113-127`). Where the string names exactly one public static method of that name and arity (`soleMethod`, `:196-206`), each argument whose helper parameter is an `int` or a `long` that `NamingCzar.fortressTypeForForeignJavaType` reads otherwise than the declared `NN32`, `NN64` or `Char` (`Character` in the compiler's prelude) is wrapped in the matching transfer, and so is the call where the declared result type differs from the reading of the helper's result (`transfer`, `:176-193`; `:135-157`). A position the helper's own name already reads at the declared type, as each transfer's, gets none. So `opr +(self,b:NN32):NN32 = builtinPrimitive("…unsignedIntOverflowingAdd")` is checked and compiled as `makeNN32FromZZ32(unsignedIntOverflowingAdd(makeZZ32FromNN32(self), makeZZ32FromNN32(b)))`. Walk is untouched: its repository has the rewrite off (F-298), and walk carries these types by the declaration (F-299).
- **The 76 strings**, each naming the binding's existing helper, line for line `explorations/compile-ladder/plan-24/probes/families-base.tsv`'s family H (a script read each of the 76 lines after the patch: 76 'ok'): value object `NN32`'s 20 (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:391-466`), trait `NN64`'s 17 (`Library/FortressLibrary.fss:917-984`), value object `Char`'s 39 (`FortressBuiltin.fss:612-722`). The library now has 97 bindings that name a helper, 36 in `FortressLibr
~~~~

## [S36] explorations/compile-ladder/rung-natives-hard/SKEPTIC.md, "The failure mode"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-hard/SKEPTIC.md#The failure mode'`

explorations/compile-ladder/rung-natives-hard/SKEPTIC.md:112-134, 1942 bytes.

~~~~
## The failure mode

The transfers are identities (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:230-231`), so the rewrite turns the checker's refusal of a binding over `NN32`, `NN64` or `Char` into a composition whatever the helper computes. SkHComp2, compiled:

    badLt(a:NN32, b:NN32):Boolean = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intLT")
    badAdd(a:NN32, b:NN32):NN32 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingAdd")
    … println("badLt(2^31, 1) = " badLt(h, one)) ; println("badAdd(2^31, 2^31) = " badAdd(h, h))   (h: NN32 = 2147483648)

On the old code, `old-fortress.sh … compile SkHComp2.fss` refuses it:

    Could not check call to function builtinPrimitive_simpleIntArith_intLT
    - (ZZ32, ZZ32)->Boolean is not applicable to an argument of type (NN32, NN32).
    File SkHComp2.fss has 2 errors.

On the new code, `bin/fortress compile SkHComp2.fss` and `bin/fortress run SkHComp2` give:

    compile rc=0
    badLt(2^31, 1) =  true
    FortressException: class fortress.CompilerBuiltin$IntegerOverflow with string Integer overflow

So a loud static error becomes a quiet value: `true` where the specification's order of `NN32` gives 2^31 > 1, and an `IntegerOverflow` where the `NN32` sum 2^32 does overflow, though as a signed sum. Walk already answers so (F-299). SkHWalk4, the same `badLt` under walk, prints 'badLt(2^31, 1) = true' and 'library 2^31 < 1 = false' on both codes. So the checker now reads such a binding as walk does. The guards, not the checker, show that each of the 76 names the unsigned helper. My reading of families-base.tsv, and the worker's 2,933 values and my 2,571, all old against new, show that it does.

This does not stop the rung. Way 2b is the team's device, taken by Question 2 (`explorations/coordinator/CLIMB-BATCH-24.md:90-100`). I added the sentence to the record's FACTS hand-over.
~~~~

## [S37] explorations/compile-ladder/rung-natives-rr32/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-rr32/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-rr32/REPORT.md:15-21, 3634 bytes, cut at 2500.

~~~~
## What changed and why

- `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleFloatArith.java`, new, 194 lines: 46 public static helpers over a Java `float` (`:11-193`), each one line that computes as its glue class in `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:102-388` does. `floatToString` (`Float.toString`); `floatIsNaN`, `floatIsInfinite`; `floatRawBits` (`Float.floatToRawIntBits`, an `int`, read as `ZZ32`); `floatNextUp`, `floatNextDown` (`DirectedRounding.nextUp`, `nextDown`); `floatAbs` (`Math.abs`); `floatEQ`, `floatNE`, `floatLT`, `floatLE`, `floatGT`, `floatGE`; `floatMin`, `floatMax` (`Math.min`, `Math.max`); `floatNeg`, `floatAdd`, `floatSub`, `floatMul`, `floatDiv`; `floatSQRT` (`(float) Math.sqrt`); the eight that round toward an infinity, `floatAddUpNoNaN` to `floatDivDownNoNaN`, and the two square roots `floatSQRTUp` and `floatSQRTDown`, for `PLUS_UP` to `SQRT_DOWN`; the eight `IEEE_` ones, `floatAddUp` to `floatDivDown`; each directed one calling the `float` overload of `com.sun.fortress.numerics.DirectedRounding` that the glue class calls; `floatPow` (`(float) Math.pow`) for `^` at an `RR32` exponent; `floatFloor`, `floatCeiling`; and the four that answer `ZZ64`, a `long`: `floatIFloor` and `floatICeiling` for `|\self/|` and `|/self\|`, `floatTruncate`, and `floatRound` (`(long) Math.rint((double) a)`). Every parameter and result is a `float`, `boolean`, `int`, `long` or `String`, which the wrapper generator maps, so a compiled program's import of the class compiles (the compiled guard's link). No prelude file imports it.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:210-342`, `value object RR32`, 49 strings, each the one line after its header, one line for one: `asString` `:210` and `asExprString` `:212` (`floatToString`), `isNaN` `:216`, `isInfinite` `:219`, `rawBits` `:232`, `nextUp` `:236`, `nextDown` `:239`, `|self|` `:245`, `=` `:247`, `=/=` `:249`, `<` `:251`, `<=` `:253`, `>` `:255`, `>=` `:257`, `MIN` `:267`, `MAX` `:269`, unary `-` `:274`, `+` `:276`, `-` `:278`, `DOT` `:280`, `TIMES` `:282`, juxtaposition `:285` (all three `floatMul`), `/` `:287`, `SQRT` `:289`, `PLUS_UP` to `SQRT_DOWN` `:291-309`, `IEEE_PLUS_UP` to `IEEE_SLASH_DOWN` `:311-325`, `^` at `RR32` `:327`, `floor` `:332`, `|\self/|` `:334`, `ceiling` `:336`, `|/self\|` `:338`, `truncate` `:340`, `round` `:342`. Walk carries a declared `RR32` in a `float` (`interpreter/glue/StaticNativeApp.java:52`), and the checker reads a `f
~~~~

## [S38] explorations/compile-ladder/rung-natives-asfloat/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-asfloat/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-asfloat/REPORT.md:9-23, 2802 bytes, cut at 2500.

~~~~
## What changed and why

Five bindings of walk's library move from glue classes onto static helpers of `nativeHelpers/` (P-58), and their declared result goes from walk's float object `Float` to `RR64`, the type of the library's abstract `asFloat` on `Number` (Library/FortressLibrary.fsi:291) and of the specification's text (numbers.tex:49):

| owner | line | was | now |
|---|---|---|---|
| `RR32` | FortressBuiltin.fss:241 | `asFloat(self): Float`, `RR32$AsFloat` | `asFloat(self): RR64`, `simpleDoubleArith.floatToDouble` |
| `Int` | :374 | `Float`, `Int$AsFloat` | `RR64`, `simpleIntArith.intToDouble` |
| `Long` | :383 | `Float`, `Long$AsFloat` | `RR64`, `simpleLongArith.longToDouble` (new) |
| `NN32` | :396 | `Float`, `NN32$AsFloat` | `RR64`, `simpleUnsignedIntArith.unsignedIntToDouble`, through the rewrite's NN32 transfer (F-308) |
| `BigNum` | :570 | `Float`, `BigNum$AsFloat` | `RR64`, `simpleArbitraryPrecisionArith.toDouble` (new) |

The two new helpers compute as their glue classes: `simpleLongArith.longToDouble` is `(double) a`, as `Long$AsFloat` (interpreter/glue/prim/Long.java:268-271); `simpleArbitraryPrecisionArith.toDouble` is `a.doubleValue()`, as `BigNum$AsFloat` (BigNum.java:280-283). The three existing helpers compute as theirs: `intToDouble` `(double) a` as `Int$AsFloat` (Int.java:244-246); `floatToDouble` `(double) f` as `RR32$AsFloat` (RR32.java:390-392); `unsignedIntToDouble` `(double) toLong(a)` (simpleUnsignedIntArith.java:226-228), the unsigned value, as `NN32$AsFloat`'s `Unsigned.toDouble(x)` (NN32.java:257-259). Walk boxes the helper's `double` at the declared `RR64` as the same `Float` object as before (F-303), so no value moves under walk: the walk guard passes on the base and on the edit with the same assertions.

I took rung-A.patch's text as it is in the library file, all five headers and strings; in the two Java files I kept its two helpers and their bodies and changed two things: their comments, and the place of `longToDouble`. The patch's comments named the glue class each helper copies ("as walk's Long$AsFloat computes it"); the glue classes go at the switch-over (F-32), so each comment now says what the helper computes ("the nearest double, ties to even", and for `ZZ` "an infinity past the double range"), which the guards assert. The patch put `longToDouble` under the comment "// The original \"Java-like\" arithmetic operators", which heads the arithmetic section that begins at `longAdd`; it is a conversion, so it now sits 
~~~~

## [S39] explorations/compile-ladder/rung-natives-remainders/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-remainders/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-remainders/REPORT.md:11-29, 3699 bytes, cut at 2500.

~~~~
## What changed and why

Rows 336 and 848: under walk, the ten bindings of `REM` and `MOD` on the five integer types named glue classes that divide with no zero test (`interpreter/glue/prim/Int.java:130-134`, `:158-162`; `Long.java:144-148`, `:170-174`; `NN32.java:137-141`, `:164-169`; `UnsignedLong.java:138-142`, `:164-169`; `BigNum.java:164-168`, `:200-208`), so a zero divisor ended the run with a Java `ArithmeticException`, which walk makes a `ProgramError` that no `catch` takes (F-24). P-58 has each binding name a static helper of `nativeHelpers/`, which both paths call; a helper's raise of `fortress.CompilerBuiltin$DivisionByZero` reaches a Fortress `catch` as the library's `DivisionByZero` (F-24), as `DIV` on the same five types already does (F-306, F-308).

The change is the planner's `explorations/compile-ladder/plan-25/probes/rung-R.patch`, applied with `git apply`, its five source comments rewritten (decision 1):

- Ten helpers, each pair right after its class's overflowing division helper (fork 2), each raising `fortress.CompilerBuiltin$DivisionByZero` at a zero divisor and computing every other value as the glue class it replaces (fork 4):
  - `simpleIntArith.intRem` (`a % b`) and `intMod` (`Math.floorMod`), `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:84-94`;
  - `simpleLongArith.longRem` and `longMod`, the same at `long`, `simpleLongArith.java:84-94`;
  - `simpleUnsignedIntArith.unsignedIntRem` and `unsignedIntMod`, both `Integer.remainderUnsigned`, `simpleUnsignedIntArith.java:67-76`;
  - `simpleUnsignedLongArith.unsignedLongRem` and `unsignedLongMod`, both `Long.remainderUnsigned`, `simpleUnsignedLongArith.java:80-89`;
  - `simpleArbitraryPrecisionArith.rem` (`BigInteger.remainder`) and `mod` (`BigInteger.mod`, negated through the divisor's absolute value where the divisor is negative, as `BigNum$Mod`), `simpleArbitraryPrecisionArith.java:47-58`.
- Ten strings moved, each one line: trait `ZZ32`'s `REM` and `MOD` (`Library/FortressLibrary.fss:781`, `:783`) to `simpleIntArith.intRem` and `intMod`; trait `ZZ64`'s (`:874`, `:876`) to `simpleLongArith.longRem` and `longMod`; trait `NN64`'s (`:957`, `:959`) to `simpleUnsignedLongArith.unsignedLongRem` and `unsignedLongMod`, through the `NN64` transfers (F-308); trait `ZZ`'s (`:1054`, `:1056`) to `simpleArbitraryPrecisionArith.rem` and `mod`; value object `NN32`'s (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:441`, `:443`) to `simpleUnsignedIntArith.unsignedIntRem
~~~~

## [S40] explorations/compile-ladder/rung-natives-unsigned/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-unsigned/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-natives-unsigned/REPORT.md:11-22, 3588 bytes, cut at 2500.

~~~~
## 1. What changed and why

The commits, on `wip/rung-natives-unsigned` from `97a416b18`: `e38365e40` the tests first; `114e35c29` the fix; `776a4e5d9` the two tests of the rewrite's limits; the commit of this report and `record.md`.

The planner's `explorations/compile-ladder/plan-25/probes/rung-U.patch`, applied as it stands (`git apply`, one warning for the file's own space-then-tab indent at `simpleUnsignedLongArith.java:114`):

- `simpleUnsignedLongArith.unsignedLongToString` prints by `Long.toUnsignedString` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java:23-25`), where it printed `Long.toString`, so 2^63 printed `-9223372036854775808`; `unsignedLongWrappingNeg` answers `-a` (`:113-115`), where it answered `a`; the new `unsignedLongToDouble` (`:27-32`), right after `unsignedLongToString`, answers an unsigned long's nearest double: a value at or above 2^63 is halved with its low bit kept as a sticky bit, converted and doubled, which rounds to nearest, ties to even, as walk's `Unsigned.toDouble` does. These compute as walk's `UnsignedLong$ToString`, `$WrappingNegate` and `$AsFloat` (`interpreter/glue/prim/UnsignedLong.java:251-261`, `:365-369`).
- `FNN32`'s `toString` and `asString` print by `Integer.toUnsignedString` (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FNN32.java:19-20`), and `FNN64`'s `toString` by `Long.toUnsignedString` (`FNN64.java:20`). `FNN32.asString` shadows the prelude's masking getter (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:759`), so it is the half of row 326 that a compiled `NN32` reaches; the prelude's `NN64` getter calls the fixed helper (`CompilerBuiltin.fss:825`).
- `BuiltinPrimitiveRewriter.transfer` gives an argument declared `UnsignedLong`, walk's object of `NN64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:475`), the `NN64` argument transfer (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:189-192`). In `value object UnsignedLong` the rewrite gives `self` the owner's name as its declared type (`:124-127`), so without the condition the checker read `self` as `UnsignedLong` against the helper's `long`, read as `ZZ64`, and refused the three bindings (row 873).
- Five strings move from glue classes onto helpers: `UnsignedLong`'s `asString` and `asExprString` onto `unsignedLongToString` (`FortressBuiltin.fss:478-481`) and its `asFloat`, declared at `RR64` as rung A declares the other five (fork 3), onto `unsignedLongToDouble` (`
~~~~

## [S41] explorations/compile-ladder/rung-natives-divisors/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-divisors/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-natives-divisors/REPORT.md:14-31, 2989 bytes, cut at 2500.

~~~~
## 1. What changed and why

P-58 has each binding name a static helper that both paths call; P-70 and P-73 give the values: `GCD` and `LCM` nonnegative, `IntegerOverflow` where a result does not fit its fixed width. Climb batch 25's fork 7 has each new helper compute as its glue class does. The commit `dcc1ee79b` moves the 18 strings and adds the 18 helpers:

| owner | binding | string at | helper |
|---|---|---|---|
| trait `ZZ32` | `GCD`, `LCM`, `partitionL` | `Library/FortressLibrary.fss:785`, `:787`, `:808` | `simpleIntArith.intGcd`, `intLcm`, `intPartition` (`simpleIntArith.java:417-434`) |
| trait `ZZ64` | `GCD`, `LCM`, `partitionL` | `:878`, `:880`, `:899` | `simpleLongArith.longGcd`, `longLcm`, `longPartition` (`simpleLongArith.java:355-378`) |
| trait `NN64` | `GCD`, `LCM`, `CHOOSE`, `partitionL` | `:961`, `:963`, `:965`, `:982` | `simpleUnsignedLongArith.unsignedLongGcd`, `unsignedLongLcm`, `unsignedLongOverflowingChoose`, `unsignedLongPartition` (`simpleUnsignedLongArith.java:233-266`) |
| trait `ZZ` | `cmp`, `GCD`, `LCM`, `CHOOSE` | `:1021`, `:1058`, `:1060`, `:1062` | `simpleArbitraryPrecisionArith.cmp`, `gcd`, `lcm`, `choose` (`simpleArbitraryPrecisionArith.java:132-163`) |
| top level | `nanoTime` | `:4522` | `simpleLongArith.longNanoTime` (`simpleLongArith.java:380-382`) |
| value object `NN32` | `GCD`, `LCM`, `partitionL` | `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:445`, `:447`, `:468` | `simpleUnsignedIntArith.unsignedIntGcd`, `unsignedIntLcm`, `unsignedIntPartition` (`simpleUnsignedIntArith.java:235-251`) |

Each helper's Java types carry the declared types (`int` for `ZZ32` and `NN32`, `long` for `ZZ64` and `NN64`, `BigInteger` for `ZZ`), `self` first; the `NN32` and `NN64` positions reach the helpers through the rewrite's transfers (F-308). Each raises `fortress.CompilerBuiltin$IntegerOverflow` where its glue class raises `IntegerOverflow`, which walk raises as the library's own (F-299). The glue computations they follow: `Int.java:136-150`, `:214-218`, `:308-358`; `Long.java:150-162`, `:226-230`, `:274-279`; `NN32.java:143-156`, `:221-225`; `UnsignedLong.java:144-162`, `:221-225`, `:263-324`; `BigNum.java:170-198`, `:268-272`, `:326-345` (all under `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/`). No glue class is edited, and none of the 18 is left on one.

No helper keeps state between calls: each works in its locals, and the two `CHOOSE` helpers loop over local accumulators; neither has a scratch array (`simp
~~~~

## [S42] explorations/reviews/batch-25-review.md, "Where the text, the brief or the principles split"

`facts-extract.sh 'doc:explorations/reviews/batch-25-review.md#Where the text, the brief or the principles split'`

explorations/reviews/batch-25-review.md:173-187, 5369 bytes, cut at 2500.

~~~~
### Where the text, the brief or the principles split

**1. Shared helpers repaired the prelude's values, where P-38's title says its defects are not repaired (rung U; fork 5).** P-38: "The compiler prelude's defects are not repaired: they go with it at the switch-over." (`POSITIONS.md:35`). Rung U fixed `simpleUnsignedLongArith.unsignedLongToString` and `unsignedLongWrappingNeg`, which the one library's bindings now name and the prelude binds too, so the prelude's `NN64` printing and its prefix `BOXMINUS` changed with them: 'BOXMINUS 1: 1' became 'BOXMINUS 1: 18446744073709551615' (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:825`, `:832`; `RECORD.md`, "Points to report", U; F-313). Fork 5 names the change (`CLIMB-BATCH-25.md:84`), and the record's "No question for the curator" says no fork bends a decision of his (`:72-74`); neither it nor the Fable review weighs P-38. The decision's body names the prelude's own text, its `Maybe` block, its `REM` guard and its reversed spellings, which stand; the helpers and the run-time classes `FNN32` and `FNN64` outlive the prelude, and the one library needs them right (P-58; P-37, "settles which files survive, not the designs inside them"). Climb batch 24's rung K did the same for the prelude's compiled `CHOOSE` (rows 521 and 855), read under P-37 (`reviews/batch-24-review.md`, rung K, standard 3). Default: as landed. So P-38's title is false in effect for rows 326's and 860's prelude halves, and for 521 and 855 before them; the decision stands for the prelude's text (finding 4).

**2. `nextUp` and `nextDown` at a signed zero (rungs D and P; row 880).** IEEE 754-2008's nextUp of `-0.0` is the smallest positive subnormal, as Java's `Math.nextUp` gives; the team's `DirectedRounding.nextUp`, which both glue classes and both rungs' helpers call, gives the successor in IEEE's totalOrder, `0.0` (`ProjectFortress/src/com/sun/fortress/numerics/DirectedRounding.java:111-127`, its `float` twin `:25-41`). The specification names no `nextUp`; its one word on the signed zeros, "-0 is considered to be smaller than +0", is said of `MIN` and `MAX` (`Specification/basic/operators/opr-overview.tex:252`; skeptic D, "Homes"). Row 880 is `CONTESTED`, and `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss` pins today's values. D.worker.1 with P.worker.2 (`PLAN.md:669`). Default: today's values.

**3. The `test` modifier on a method (rung C; its D6).** The specification's note gives `test` to a top-level function of type `() -> ()
~~~~

## [S43] explorations/compile-ladder/rung-natives-shift-power/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-shift-power/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-shift-power/REPORT.md:9-43, 5927 bytes, cut at 2500.

~~~~
## What changed and why

Each of the 16 declarations keeps its public header over `AnyIntegral` and its api line, converts its count or exponent in Fortress, and calls a public bare `builtinPrimitive` binding at the narrow header, which the api now declares beside it (P-162, the public spelling, fork I1). No stage refused a pair, so no bare half takes the private spelling. Commits: `c17db57e0` (the two tests), `e46dd6f40` (the edit), `baa3a18fb` (`ZZ`'s left shift onto the existing `shiftLeft`, finding 4 of `record.md`).

The bindings, each with its narrow header and its helper's Java signature:

| type | declaration over `AnyIntegral` | bare binding | helper | new? |
|---|---|---|---|---|
| `ZZ32` | `LSHIFT` (`FortressLibrary.fss:847`) | `opr LSHIFT(self,b:ZZ32):ZZ32` (`:845`) | `simpleIntArith.intBitLeftShift(int,int):int` (`simpleIntArith.java:369`) | existing |
| `ZZ32` | `RSHIFT` (`:850`) | `opr RSHIFT(self,b:ZZ32):ZZ32` (`:848`) | `simpleIntArith.intBitRightShift(int,int):int` (`:374`) | existing |
| `ZZ32` | `^` (`:855`) | `opr ^(self, b:ZZ32):ZZ32` (`:853`) | `simpleIntArith.intPower(int,int):int` (`:450`) | new |
| `ZZ64` | `LSHIFT` (`:943`) | `opr LSHIFT(self,b:ZZ64):ZZ64` (`:941`) | `simpleLongArith.longBitLeftShift(long,long):long` (`simpleLongArith.java:343`) | existing |
| `ZZ64` | `RSHIFT` (`:946`) | `opr RSHIFT(self,b:ZZ64):ZZ64` (`:944`) | `simpleLongArith.longBitRightShift(long,long):long` (`:348`) | existing |
| `ZZ64` | `^` (`:951`) | `opr ^(self, b:ZZ32):ZZ64` (`:949`) | `simpleLongArith.longPower(long,int):long` (`:403`) | new |
| `NN64` | `LSHIFT` (`:1029`) | `opr LSHIFT(self,b:ZZ64):NN64` (`:1027`) | `simpleUnsignedLongArith.unsignedLongBitLeftShift(long,long):long` (`simpleUnsignedLongArith.java:288`) | new |
| `NN64` | `RSHIFT` (`:1032`) | `opr RSHIFT(self,b:ZZ64):NN64` (`:1030`) | `simpleUnsignedLongArith.unsignedLongBitRightShift(long,long):long` (`:293`) | new |
| `NN64` | `^` (`:1037`) | `opr ^(self, b:ZZ32):NN64` (`:1035`) | `simpleUnsignedLongArith.unsignedLongPower(long,int):long` (`:300`) | new |
| `ZZ` | `LSHIFT` (`:1129`) | `opr LSHIFT(self, b:ZZ32): ZZ` (`:1127`) | `simpleArbitraryPrecisionArith.shiftLeft(BigInteger,int):BigInteger` (`simpleArbitraryPrecisionArith.java:111`) | existing |
| `ZZ` | `RSHIFT` (`:1132`) | `opr RSHIFT(self, b:ZZ32): ZZ` (`:1130`) | `simpleArbitraryPrecisionArith.bigBitRightShift(BigInteger,int):BigInteger` (`:185`) | new |
| `ZZ` | `shift` (`:1135`) | `shift(self, k:ZZ32): ZZ` (`:1133`) | `si
~~~~

## [S44] explorations/compile-ladder/rung-any-carrier/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-any-carrier/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-any-carrier/REPORT.md:11-33, 3084 bytes, cut at 2500.

~~~~
## What changed and why

Commit `f5be3b7e7` on `wip/rung-any-carrier` (cut from ed8652dc0; the worktree seeded by `seed-worktree.sh` in 3 s, exit 0).

- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:38-40`: `getter ilkName(): String = builtinPrimitive("com.sun.fortress.nativeHelpers.stringOps.typeName")`; `getter asString(): String = self.ilkName`, with no native. The api (`FortressBuiltin.fsi:33-34`) is unchanged.
- `Library/FortressLibrary.fss:4655-4656`: `opr SEQV(a:Any, b:Any):Boolean = builtinPrimitive("com.sun.fortress.nativeHelpers.equality.sEquiv")`; its api line is unchanged.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:41-53`: the table `OWN_OPERATIONS`, as written:

      static final java.util.Map<String, String> OWN_OPERATIONS = new java.util.HashMap<String, String>();
      static {
          OWN_OPERATIONS.put("com.sun.fortress.nativeHelpers.stringOps.typeName",
                             "com.sun.fortress.interpreter.glue.prim.ObjectPrims$ClassName");
          OWN_OPERATIONS.put("com.sun.fortress.nativeHelpers.equality.sEquiv",
                             "com.sun.fortress.interpreter.glue.prim.AnyPrim$SEquiv");
      }

  read at `:209-210`, right after the string is read and before the cache and `StaticNativeApp.isHelperString`: `String own = OWN_OPERATIONS.get(str); if (own != null) str = own;`. The glue classes stay, as walk's operations.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java:46-105`: `ClassName` answers `ilk(o.type())`. `traitOf` names `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` as `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64` when the type is an `FTypeObject`, no generic instance, whose environment's top level is the component `FortressBuiltin`; `ilk` renders a generic instance's static arguments, a tuple's elements and an arrow's domain and range by the same rule, with `FType.toString`'s delimiters (`[\`, `,`, `\]`, `(`, `)`, `->`), and every other type by `toString`. `ToString` stays, now bound by nothing in the library.
- `Library/FortressLibrary.fss:4616-4620`, `.fsi:2577`: `match(regex:String, some:String):Boolean = typecase (regex.asFlatString, some.asFlatString) of (r:FlatString, f:FlatString) ⇒ match(r, f); (r:String, f:String) ⇒ fail[\Boolean\]("match: asFlatString answered a string that is not flat") end`.
- The 48 lines of `ProjectFortress/tests/ArrayElementAlgebra.fss` and `ProjectFortress/tests/FlatTowerRungF.fss` (below).
- New tests: `Pr
~~~~

## [S45] explorations/compile-ladder/rung-io-writer/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-io-writer/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-io-writer/REPORT.md:9-33, 5698 bytes, cut at 2500.

~~~~
## What changed and why

Commits on `wip/rung-io-writer`: `3b3e83d59` (the change and its two tests), `85236bf98` (an expected failure for a defect measured on the way).

- `Library/FortressLibrary.fsi:1204-1224`, `.fss:1874-1897`, beside `IOFailure`: `object FileNotFoundException extends CheckedException`, with `asString` "File not found" (fork W4); `trait JavaBufferedWriter excludes { String, Number, Boolean, Char, JavaBufferedReader }` with `write(s: FlatString)`, `write(c: Char)`, `flush()` and `close()` as public natives on `fileOps.jbwWriteString`, `jbwWriteChar`, `jbwFlush` and `jbwClose`, and `write(s: String)`, which flattens by a `typecase` on `asFlatString` and calls the native, as `printlnWithThread` does; `trait JavaBufferedReader`, with the mirror excludes clause and no methods (fork W1); the factories `makeJavaBufferedWriter(name: FlatString)` on `jbwOpen`, and `makeJavaBufferedStdOut()` and `makeJavaBufferedStdErr()` on the new helpers.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:738-741` (the object at :740), at the component's end: `private object JavaBufferedWriterObject extends JavaBufferedWriter end`. Its native constructor, the new `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/JavaBufferedWriterObject.java`, registers itself in its Java constructor, as the glue's `Writer` does, so that it is ready when the environment is built; its nested class `Value` is walk's value of the trait and holds a `FortressBufferedWriter`. Walk makes the object's own singleton as it initialises the component (the first run of my test stopped at `FortressBuiltin.fss:740:1-741:2` while `makeNativeObject` raised an error), so `makeNativeObject` answers a `Value` that holds no writer, which no helper is passed. No `builtinPrimitive` string names the constructor.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`: `javaFor` carries `JavaBufferedWriter` by name in `FortressBufferedWriter` (:51-69); `carried` admits that class (:97-101); `unbox` takes the writer out of a `JavaBufferedWriterObject.Value` (:292-295) and `box` makes one from a helper's result (:318). `javaForSelf(String)` already falls through to `javaFor`; only its comment names the trait (:106). A program cannot declare a type of the name, since `FortressLibrary` declares it (`interpreter.md`, "What walk checks").
- `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:490-491`: the walk-world table maps `FortressBufferedReader` to `Fort
~~~~

## [S46] explorations/compile-ladder/rung-io-reader/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-io-reader/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-io-reader/REPORT.md:9-51, 8048 bytes, cut at 2500.

~~~~
## What changed and why

Commits on `wip/rung-io-reader`: `f27f6013` (the two tests, failing on the base), `14be0d36` (the change, the compiled guard's final form and the expected failure `XXXFileOpsRaiseCaughtCompiled`), then this report.

- `Library/FortressLibrary.fss:1959-1968`, `.fsi:1265-1279`: `trait JavaBufferedReader` gains the prelude's eight methods, each a public native in P-58's form on its `fileOps` helper; `.fss:1976-1979`, `.fsi:1284-1285`: `makeJavaBufferedReader(name: FlatString)` on `jbrOpen` and `makeJavaBufferedStdIn()` on the new `jbrStdIn`, after `makeJavaBufferedStdErr` (fork R4). The api's comment says what the reader answers at the end and after `consume`.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java:96-99`, beside `jbwStdErr`: `public static FortressBufferedReader jbrStdIn()`, a `FortressBufferedReader` named `<stdin>` over a `java.io.BufferedReader` over an `InputStreamReader` of `System.in` in UTF-8, made at each call, as the glue's `inputReader` reads `System.in` in UTF-8 (`interpreter/glue/prim/Reader.java:268-272`, `:57`).
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:793-796`, right after `JavaBufferedWriterObject`: `private object JavaBufferedReaderObject extends JavaBufferedReader end`. Its native constructor is the new `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/JavaBufferedReaderObject.java`, rung W's `JavaBufferedWriterObject.java` with the reader's names: it registers itself in its Java constructor, and its nested `Value` holds a `FortressBufferedReader`; the singleton that walk makes holds none and no helper is passed it.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`, four methods: `javaFor` carries `JavaBufferedReader` by name in `FortressBufferedReader` (`:71`, its comment `:55-58`), `carried` admits that class (`:104`), `unbox` takes the reader out of a `JavaBufferedReaderObject.Value` (`:300-303`), `box` makes one (`:327`); two imports (`:4`, `:13`). `javaForSelf(String)` falls through to `javaFor`, unchanged.
- `Library/File.fss` and `.fsi`: `component File`, no longer native, and without the glue's `language` and `package`. `object FileReadStream(fileName: String, under: JavaBufferedReader) extends { ReadStream, FileStream }` (`.fss:23-45`): `asString` is the glue's text, `"<Read handle to \"" || fileName || "\">"` (fork R5); `eof`, `ready`, `whenUnconsumed`, `consume`, `uncheckedReadLine`, `uncheckedRead(k)` and `close` call `under`
~~~~

## [S47] explorations/compile-ladder/rung-walk-language-types/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-language-types/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-walk-language-types/REPORT.md:10-20, 3718 bytes, cut at 2500.

~~~~
## What changed and why

Commits on `wip/rung-walk-language-types`, cut from b430f9f42 (the worktree seeded by `seed-worktree.sh` from `/home/user/fortress-base29`, exit 0, 3 s): `57bddc15c` the tests first, `bfdc5b74c` the fix, `1a48fc6cc` two `XXX` tests of what remains of rows 717 and 824.

- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/LanguageTypes.java:1-97`, new. A table of the nine objects, each with the trait it stands for and the component that declares it (`:30-41`): `Int`, `Long`, `BigNum`, `Float`, `UnsignedLong` of `FortressBuiltin` at `ZZ32`, `ZZ64`, `ZZ`, `RR64`, `NN64`; `FlatString` of `FlatString` and `CatString`, `EmptyString`, `SubString` of `String` at `String`. `traitName(FType)` (`:45-50`) answers the trait's name for an `FTypeObject` that is no generic instance, whose name is in the table and whose declaring component (`declaringComponent`, `:86-96`, the lines of `StaticNativeApp.declaringComponent`) is the table's; so a program's own `Int` or `FlatString` keeps its name. `numberTraitName` (`:53-56`) answers it for the five number objects only. `traitOf(FType)` (`:62-80`) maps a tuple type element by element through `FTypeTuple.make`, and returns for one of the nine the `FTypeTrait` of the trait's name among its transitive supertypes, else the type itself. `FloatLiteral` is not in the table (fork G2).
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java`: the three reads of a value's type, each now `LanguageTypes.traitOf(...)`: `inferWithCoercion`'s first pass, `FType at = LanguageTypes.traitOf(a.type());` (`:602`), whose `at` the varargs unification (`:606-611`) and the unification of a parameter type that mentions a static parameter (`:634-637`) read; `narrowest`'s candidates (`:783-785`); `inferByUnification`'s first pass (`:937`). Nothing else in the file changed; N's head of `inferAndInstantiateGenericFunction` (`:72-94`) is untouched.
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java:189-192`: a trait or object that is no generic instance prints `LanguageTypes.traitName(this)` where it has one, else its name. A generic instance prints its static arguments through their own text, a tuple type its elements', an arrow its domain's and range's, so the nine print by their traits everywhere walk makes a type's text: in every message that prints an `FType` or an object value (`FObject.getString`, `interpreter/evaluator/values/FObject.java:33-35`, a
~~~~

## [S48] Specification/basic/conversions-coercions.tex, "Coercion Resolution"

`facts-extract.sh 'doc:Specification/basic/conversions-coercions.tex#Coercion Resolution'`

Specification/basic/conversions-coercions.tex:524-739, 10411 bytes, cut at 2500.

~~~~
\section{Coercion Resolution}
\seclabel{resolving-coercion}
For a given functional call, we first determine whether there exists a
declaration that is applicable without coercion.  If so, the most
specific declaration is selected; if not, then coercions are
explicitly added to the functional call.  If more than one coercion is
possible then the coercion that yields the most specific type is
chosen.  \secref{restrictions-coercion} and
\chapref{overloaded-declarations} describe overloading rules for the
declarations of coercions and overloaded functionals that guarantee
there exists always a most specific coercion when two or more are possible.
A numeral's own coercion is the one exception to this order: a declaration that
it makes applicable, every other argument being applicable without coercion,
and that is more specific, on the parameter types declared, than the most
specific declaration applicable without coercion, is selected in its place
(\secref{coercion}).
A declaration with static parameters is applicable, without or with coercion,
when some instance of it whose static arguments satisfy their bounds is, and
declarations are compared on the parameter types they declare
(\secref{functional-applicability}, \secref{resolving-overloading}); the
declaration selected is then instantiated as \secref{static-arg-inference}
describes, with the rule for a numeral whose conversions tie
(\secref{numeral-default}).
\revision{revival-overloading}{The Working Draft of February 2011 did not say
here when a declaration with static parameters is applicable.
The revival decided on 28~September 2026 that a coercion makes a call possible
and never changes which declaration runs when one is applicable without it:
declarations are chosen in the order this section gives, on the parameter types
they declare, and the declaration chosen is then instantiated.
It decided on 10~November 2026 that a numeral's own coercion is the one
exception (\secref{revival-numerals}).}

We first define a notion of more specific types in the presence of coercion.
Recall from \secref{type-relations} that Fortress defines an
\emph{exclusion} relation between types which is denoted by $\excludes$.

For types $T$ and $U$, we say that $T$ \emph{rejects} $U$,
and write $T \rejects U$, if for all coercions to $T$, the type coerced
from excludes $U$:
\[
T \rejects U \iff \forall A: A \coercedefto T \implies A \excludes U.
\]
Note that $T \rejects U$ implies $U \not\coercesto T$.

We say that $T$ is \emp
~~~~

## [S49] explorations/compile-ladder/rung-numeral-leftovers/REPORT.md, "1. What changed and why"

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

## [S50] explorations/compile-ladder/rung-compiled-transaction/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-compiled-transaction/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-compiled-transaction/REPORT.md:11-45, 6801 bytes, cut at 2500.

~~~~
## What changed and why

The compiled path runs an `atomic` block as a transaction of one global sequence lock, buffered writes and validation by value (`runtimeSystem/Transaction.java`), inside a handler that `CodeGen.forAtomicBlock` writes. Six repairs, by declaration:

1. **The handlers of nested blocks and of nested try** (rows 934, 937, 888). `CodeGen.forAtomicBlock` (`CodeGen.java:1782-1814`) and `CodeGen.forTry` (`:2104-2120`) now call `visitTryCatchBlock` after the body's code. The JVM takes the first entry of the exception table that covers a throw, so the entry of a block or a try nested in the body, written when the body is visited, now comes first. `startTransaction` is emitted by `forAtomicBlock` itself, before the range, so the handler runs only when the block's transaction is the task's current one; `forAtomicBlockHelper` (`:1769-1773`) emits the body and `endTransaction`.
2. **A block's own writes** (row 933, fork X1). `Transaction.TXReadLocation` (`Transaction.java:228-248`) returns the transaction's own write before anything else and records nothing for it. A read of an ancestor's write is recorded with that write, and `validateReads` (`:255-268`) compares it with the nearest ancestor's write now, else with the committed value.
3. **A nested block's view** (row 950, fork X3). `Transaction.TXValidate` (`:275-284`) validates the transaction and then each ancestor, at one time of the global lock. `TXAbort` (`:186-189`) throws `TransactionAbortException(this)`, so the abort names the transaction whose read failed, which can be an ancestor of the one that found it. `BaseTask.leaveTransaction` (`BaseTask.java:273-294`) ends the block's own transaction and returns, so that the block starts again, only for an abort of that transaction; an abort that names an ancestor is thrown on.
4. **The shared sets** (row 949, fork X2). Every iteration of a read set or a write set is inside `synchronized` on that set: validation (`Transaction.java:256`), the write-back of a top-level commit (`:332`), the merge of reads (`:341`) and of writes (`:357`) into a parent. `Hashtable`'s own methods take the same monitor, so a put by another thread of the block waits for the iteration. A read and its record are one step under the read set's lock (`:237-246`).
5. **Two initializations of one element** (row 466's note, fork X5). The read of an element that holds nothing is recorded as `EMPTY` (`Transaction.java:77-80`, `:244`), a mark that validation reads as null (`:264
~~~~

## [S51] explorations/compile-ladder/plan-31/probes/switch-rehearsal.md, "2. The walls, in the order met"

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

## [S52] explorations/compile-ladder/plan-31/probes/model-closure-check.md, "4. The checker's time for one program"

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

## [S53] explorations/compile-ladder/plan-31/probes/probe-y.md, "6. A finding beside the question: the prelude's jars change with any change of the compiler"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/probes/probe-y.md#6. A finding beside the question: the prelude's jars change with any change of the compiler'`

explorations/compile-ladder/plan-31/probes/probe-y.md:125-137, 1804 bytes.

~~~~
## 6. A finding beside the question: the prelude's jars change with any change of the compiler

To see whether the second set disturbed the first, the five prelude jars of this tree were compared with the base build's, class by class, after the tree's path was rewritten in each class's constants.

    base build's jars against the base build's code, compiled again cold:        590 classes, 590 equal
    base build's jars against the base build's code over this tree's sources:    590 equal
    base build's jars against this tree's jars:                                  558 equal, 32 differ
    this tree's CompilerBuiltin, compiled twice:                                 312 classes, 16 differ
    the base build's code with -XX:hashCode=0, and with =1:                      312 classes, 18 differ each

The classes that differ hold the same methods in another order, and their dispatch methods test the same types in another order (`javap` of `CompilerBuiltin$EqualTo` and `CompilerBuiltin`). So the order in which the code generator writes methods and dispatch tests follows the JVM's identity hashes. The base's code gives the same bytes on each compile only because the default identity hash is the same sequence in each run; a changed hash mode moves the order, and this tree's code gives a different order on each compile. Which of the tree's edits unsettles it was not traced. The rehearsal saw the same for the one library ("Which copy comes first is not stable from one compile to the next", its W6).

For probe Y it means that a comparison of bytes cannot show that the prelude is undisturbed; the tests have to. For the work it means that a compiled test can pass or fail with the order (the rehearsal's W6 was such a case), and that no two builds of different code give comparable jars.
~~~~

## [S54] explorations/java-baseline/REPORT.md, "6. Fork/join: the baseline in the shape of the library and the compiled runtime"

`facts-extract.sh 'doc:explorations/java-baseline/REPORT.md#6. Fork/join: the baseline in the shape of the library and the compiled runtime'`

explorations/java-baseline/REPORT.md:195-286, 10751 bytes, cut at 2500.

~~~~
## 6. Fork/join: the baseline in the shape of the library and the compiled runtime

`variants/forkjoin/FlatArrays.java` gives the vocabulary's loops and sums the shape that the Fortress library and its compiled runtime give parallel work, on a `java.util.concurrent.ForkJoinPool`. What a piece computes once it is no longer split is the baseline's plain loop, so its time is a floor for what compiled Fortress could reach with this structure and unboxed arrays.

| Shape | In the tree | In the variant |
|---|---|---|
| a parallel range | `Library/RangeInternals.fss:1310-1345`: a range of more than `grainSize` = 16 elements (`:20`) splits at the highest power-of-two boundary inside it; the two parts are the arms of a `do ... also do` | `forRange`, used by the model's row loops (`rows(rmsn)`, `rows(sm)`, ...), by `adam`'s loop over the 4,192 elements, by the loop over the planes and by the elementwise passes |
| a reduction | the same split, the two results joined; at most 16 elements fold left to right (`:1365-1373`) | `dot`, `sum`, `max`: no shared accumulator |
| the matrix product | `Library/FortressLibrary.fss:3044-3102`: the largest of the three dimensions is halved by `partition` (the largest power of two below it); the halves of the rows and of the columns are forked, the halves of the summed dimension run in sequence; it stops at one element | `mma`, under `mul`, `mulT`, `addMulT`, `tMul` and on each plane under the three `heads*` |
| the arms | `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1717-1770` and `runtimeSystem/BaseTask.java`: every arm but the first becomes a task object; `forkIfProfitable` forks it if the pool has more than one thread and the worker's surplus of queued tasks is at most the spawn threshold (5, `FortressExecutable.java:26`); the first arm runs in place; `joinOrRun` joins the task or runs it in place | `Arm`: the same two methods; the program's body runs as a task of the pool |

Not given the shape: `gatherAdd`, `onehotTMul`, `addInto` and the elementwise loops written in `step` itself stay plain loops, and `onehotTMul` stays a scatter where the Fortress multiplies by a 0/1 matrix.

**Grains.** `baseline.grain` is the range's grain and `baseline.mmgrain` the product's: a product whose three dimensions are all at most that is one plain block. The library's own are 16 for the range and 1 for the product, which has no grain: it forks down to single elements. Timed: the library's (16, 1); (16, 16), the product g
~~~~

## [S55] explorations/compile-ladder/plan-31/probes/number-object-merge.md, "Measurements"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/probes/number-object-merge.md#Measurements'`

explorations/compile-ladder/plan-31/probes/number-object-merge.md:50-90, 2536 bytes, cut at 2500.

~~~~
## Measurements

Each command starts with the setup lines of `references/build-and-caches.md`, in the scratch tree.

**Walk, my own programs.** Small programs of mine, run on the merged tree with `bin/fortress P.fss` and on the old code with `old-fortress.sh /home/user/fortress-base32 <caches> P.fss`. One of them prints, on both, line for line the same:

    ZZ32 RR64 ZZ64 ZZ NN64 ZZ64 QQ            (typecase arms ZZ32, ZZ64, NN32, NN64, ZZ, RR64, RR32, QQ)
    ZZ32 RR64 ZZ64 ZZ NN64                    (ilkName of a value of each)
    Cell[\ZZ32\] Cell[\RR64\]                 (ilkName of Cell(3), Cell(1.5))
    18.5                                      ((b asif RR64) + 17)
    ArrayList[\ZZ32\]                         (<|1, 2, 3|>.ilkName)
    5050                                      (SUM[i <- 1#100] i)

**microGPT.** `explorations/coordinator/tools/mg-run.sh tmp/mg2 merge2`, after the last edit of Java:

    VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS      (MicroGptFlatQuick, rc=0)
    VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS      (MicroGptAplQuick, rc=0)

**Walk's suite.** `ant testSystem`, twice. The first run, on the merge alone, has three failures of 830: `NativeHelperFloatCarriedWalk` ('Float is undefined.'), `TraitGenericMethodInference` (obstacle 5) and `XXXGenericBesidePlainReturnParam` (obstacle 6). The second run, after the one-line fix of obstacle 5 and the test's two lines:

    Tests run: 207, Failures: 0   Tests run: 211, Failures: 0   Tests run: 202, Failures: 0
    Tests run: 210, Failures: 1   (XXXGenericBesidePlainReturnParam: "Expected failure or exception, saw none")

I did not run `ant testFast`, the demos or the full microGPT pair. The compiled tests compile against the compiler's prelude, which the merge does not touch.

**The checker count.** `explorations/coordinator/tools/checker-count/run.sh tmp/count1.txt tmp/count1`:

    FortressBuiltin	0
    FortressLibrary	0
    #total	0
    #locations	0
    #crash	none

**The distance.** `explorations/coordinator/tools/distance/run.sh tmp/dist1.txt tmp/dist1`:

    #total	0
    #kind	exclusion	0 ... #kind	export	0        (all nine kinds 0)
    #crash	none
    #shadow	every shadow edit matched the tracked sources

The count stage now checks the 62 bindings that were `Float`'s and the 12 of the other four objects, since they are in the `FortressLibrary` component (`references/compiler.md`, "Natives": the count stage checks only that component's bindings). Both stages ran before the one-line wa
~~~~

## [S56] explorations/compile-ladder/rung-numeral-block-end/REPORT.md, "Points to report"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-block-end/REPORT.md#Points to report'`

explorations/compile-ladder/rung-numeral-block-end/REPORT.md:152-162, 2374 bytes.

~~~~
## Points to report

1. **The cause as found**: in the checker, `Functionals.numeralResult` and `Functionals.joinInto` (`scala_src/typechecker/impls/Functionals.scala:1304-1313`, `:1334-1385`) had no case for a `LocalVarDecl`, a `LetFn` or a tuple, so `STypeChecker.checkExpr` (`STypeChecker.scala:538-539`) wrapped the whole block in the coercion, which `CoercionDesugarer.desugarTraitCoercion` (`CoercionDesugarer.scala:97-100`) wrote as a call on the block, and which `CodeGen.emitFnApp` (`CodeGen.java:8002-8013`) and `CodeGen.forFnRef` (`CodeGen.java:4252`) compiled as a call of the generic coercion's closure at its uninstantiated arrow type. A typed binding checks the numeral itself at its type (`impls/Decls.scala:407`), so its coercion's argument is the numeral, which the code generator folds (`CodeGen.java:7745-7768`).
2. **Rows 1014 and 1030**: each test fails on the base and passes after (above). **Row 1031**: its test passes after, and is promoted with the top-level form beside the block form.
3. **The three kin of rows 1043 and 340**: `XXXAtomicExprNumeralArms`, `XXXAtomicExprNumeralBody` and `XXXLabelNumeralValueCompiled` are unchanged, with the messages above.
4. **The compiled test of `u = 0` and `u =/= 0`**: `true` and `false` at `NN32` and `NN64` (`NumeralEqualsNumberCompiled`); at `RR32` the refusal 'Could not check call to operator NE' (`XXXNumeralNotEqualsFloatCompiled.test`, which also holds the same refusal at `RR64`), and the expected failure 'java.lang.StackOverflowError' of `c = 0` (`XXXNumeralEqualsRR32Compiled`); the Effect's sentence before and after, above.
5. **The bytecode of a function that returns a numeral with no local declaration before it**: `five(): ZZ32 = do 5 end` is `iconst_5`, `FZZ32.make`, `areturn` before and after; `six()` and `half()`, and the three classes of `PRunsToday`, are the same before and after by `javap -c -p`.
6. **The two stages** on the final tree: count 0 and distance 0 with `#crash none`, both equal to run 1's gate; the checker's time 109.5 s on the base and 98.4 s on the change, one run each, with identical results.
7. **A file edited beyond those named**: none. The edits are `scala_src/typechecker/impls/Functionals.scala`, the tests, and the named sentence of `changes.tex`.

None holds the push: no step was taken that cannot be undone or that acts against a decision on record.
~~~~

## [S57] explorations/compile-ladder/rung-numeral-most-specific/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-most-specific/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-numeral-most-specific/REPORT.md:13-33, 4518 bytes, cut at 2500.

~~~~
## 1. What changed and why

**The rule (P-46, P-49, P-173).** At a call, a numeral is applicable to a parameter that fixes no type, at its default, and to a parameter whose type declares a coercion from the numeral's type, by that coercion. Among the applicable declarations the most specific runs; where two are not ordered, the one that the default fits.

**The checker**, `scala_src/typechecker/impls/Functionals.scala`, in `typedApplicationOfChecked` only (`:807-848`, `:850`, `:944`), and `numeralTie` (`:884-928`):

- `numeralAttempt` (`:824-845`). Where the attempt by subtyping is kept and the call has a numeral argument, the most specific candidates of that attempt that need no coercion are its heads. Where a head has a numeral at a parameter whose type is not the numeral's default type, the attempt with coercion is taken with the same expected type, and of its candidates those are kept that need a coercion, only at numeral arguments (`onlyNumerals`, `:819-822`), and whose declared arrow lies strictly below every head's by subtyping of the declared domains (`coercions.moreSpecificDeclared`, `scala_src/typechecker/CoercionOracle.scala:85-88`). If there are such candidates and their result converts to the expected type, they are the call's candidates.
- `resolved` (`:850-942`) is the former tail of the function, from the candidates of an attempt to the call's candidates and type, as a local function. It is called quietly on the numeral candidates first; where they do not resolve to one declaration, it is called on the attempt that the function chose before, with its errors signalled as before (`:944`). So of two declarations not ordered, the one that the default fits stays.
- `numeralTie` (`:893`): the condition that the tied candidates differ only at numeral positions is gone; the call must have a numeral. The readings and the choice among the candidates that the readings fit are unchanged. This is fork N2: `mul(1.0, f)` and `1.0 s` resolve at the declaration that the float numeral's default, `RR64`, fits as it is.
- No signature changed. `retypedApplication`'s call (`:796-798`) stands where it was. Nothing in `checkApplicableWithInference` was touched; the rule needed no change there.

**Walk**, `interpreter/evaluator/values/OverloadedFunction.java`:

- `bestMatchForNumerals` (`:2325-2358`): after the declaration that fits the numeral as it is has been found (with the existing comparison against the one that the defaults alone fit), `belowByNumerals` is 
~~~~

## [S58] explorations/compile-ladder/rung-generic-function-value/REPORT.md, "The rule as built"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-generic-function-value/REPORT.md#The rule as built'`

explorations/compile-ladder/rung-generic-function-value/REPORT.md:23-30, 2140 bytes.

~~~~
## The rule as built

- **When.** At the binding of a parameter of a function or of a constructor (`NonPrimitive.buildEnvFromParams`; `F156s` for the constructor) and of a local variable declared with a type, after the place's type has matched the value.
- **From what.** From the place's run-time arrow type: the function's static arguments are those that a direct call with arguments of the arrow's domain types infers; the instance's type must be a subtype of the arrow type (so its range is checked too). A generic callee's own static parameters are fixed first, by its other arguments alone.
- **Open.** Where no declared parameter type mentions some static parameter of the function (`tag[\nat k\](x: ZZ32)`), where a type of the arrow's domain is unfixed, and at any place that is not of arrow type (`Any`, an untyped local, a type parameter), the value stays generic, and each application infers its static arguments from its arguments' run-time types, as a direct call does (`GenericFunctionOrConstructor.applyInnerPossiblyGeneric`, unchanged). P-48's rule for an unfixed parameter and walk's open parameter are untouched: the same inference runs.
- **No instance.** Where the arrow type fixes every static parameter and no instance fits, the place does not match the value, and walk answers the place's own refusal, which names the value's type: `Unification error: Closure/Constructor for app2 param 1 (f:Vector[\RR64,2\]->Vector[\RR64,3\]) got arg half[\nat n\](...) ... of type half[\n\]`. This departs from the section's words "the refusal that a direct call with those arguments gives": the match is a predicate that overload dispatch also asks, so it cannot raise the call's own error. Where the value stays generic, the refusal is the direct call's (`undefined variable [k]` for `tag`, below).
- **An overloaded name** is not instantiated at the binding. Each application chooses a declaration by its arguments' run-time types, as dispatch does everywhere in Fortress.
- **Not reached:** a top-level variable and an assignment (defect 2 below); a callee's type parameter that a value's run-time type fixes (defect 1 below).
~~~~

## [S59] explorations/compile-ladder/rung-numeral-block-end/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-block-end/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-numeral-block-end/REPORT.md:9-28, 4304 bytes, cut at 2500.

~~~~
## What changed and why

The base is 647163a9c4. The rung's commits on `wip/rung-numeral-block-end`: `7fb38bbe30` (the checker's edit and the tests), `20fe9f78c5` (Appendix I's sentence), `19e7e678e8` (the refusal test widened to `RR64`, and its new name in that sentence). One launch worked the rung.

**The cause as found.** A function's body is checked by `checkExpr(body, rt, ...)` (`scala_src/typechecker/impls/Decls.scala:230`). The block passes the expected type to its last element without converting it (`impls/Misc.scala:435`), and after a local declaration that last element is a `LocalVarDecl` (or a `LetFn`) whose own body is the rest of the block. So the block's type is the numeral's own type, `NaturalNumeral[\1,10,4\]`, and `STypeChecker.checkExpr` falls to its conversion (`scala_src/typechecker/STypeChecker.scala:538-539`): first `numeralJoinInto`, the join that converts each numeral of a result position where it stands, then `coercions.buildCoercion` of the whole expression. The join's test of whether a result position is a numeral, `numeralResult`, and its rewrite, `joinInto` (`impls/Functionals.scala:1304-1313`, `:1334-1385`), had cases for a block, `do`, `if`, `case` and `try`, and none for a `LocalVarDecl`, a `LetFn` or a tuple. So `buildCoercion` wrapped the whole `do` block in a `TraitCoercionInvocation` (the type-checked tree of `four()`, dumped by `fortress typecheck -out`, shows `(FnDecl ... _body=(Some _value=(TraitCoercionInvocation ... _arg=(Do ...`), and for a block that ends in `(1, k)` a `TupleCoercionInvocation` around the whole block. The coercion desugarer writes `_RewriteFnApp(coerce_ZZ32[\1,10,4\], block)` (`compiler/desugarer/CoercionDesugarer.scala:97-100`), or binds the tuple to fresh variables and calls the coercion on a variable (`:112-145`). The code generator folds a numeral's coercion only where its argument is the numeral itself (`numeralCoercionSiteDesc` and `isNumeralCoercionCall`, `compiler/codegen/CodeGen.java:7745-7768`); on a block or a variable it takes `emitFnApp`, whose call of a reference with static arguments is a closure call (`useClosure`, `CodeGen.java:8002-8013`), and `forFnRef` writes the reference as a function value: a `GETSTATIC` of the closure of the generic coercion at its uninstantiated arrow type, `NaturalNumeral[\n,r,v\] -> ZZ32` (`CodeGen.java:4252`). The run then loads that closure, whose body reads the static parameter `v` as a class, `fortress/CompilerBuiltin$v`. A typed binding does not tak
~~~~

## [S60] explorations/compile-ladder/rung-tuple-binding/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-tuple-binding/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-tuple-binding/REPORT.md:13-24, 2543 bytes, cut at 2500.

~~~~
## What changed and why

**The checker** (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:272-277`). A top-level variable's type is read lazily: `Thunker.primeVariables` gives each name of a declaration a thunk that checks the whole declaration once and takes the name's element out of the right side's type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Thunker.scala:198-205`). The checker has a case of its own for a binding of several names to a tuple expression of as many elements (`Decls.scala:250`). It checks each element against its name, then builds a new tuple from the checked elements with `ExprFactory.makeTupleExpr`, which gives the tuple no type. So the thunk read no type, for every name. That is where the names' types were lost. A reference to a name without a type returns its expression unchecked and reports nothing (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:634`): this is row 474's "accepted anywhere" and its block that ends without an error, and the unchecked expression is the intermediate node of row 988's stop. The repair gives the rebuilt tuple the tuple type of its checked elements. The case for any other right side, a call or a variable, already typed its names; it is not changed, and neither is a single binding or a local tuple binding.

**The code generator** (`CodeGen.java:6481-6570`). `forVarDeclPrePass` threw for a left side of more than one name. It now hands such a declaration to `forTupleVarDeclPrePass`:

- the right side becomes the value of one hidden top-level variable of the right side's tuple type, a class `<Component>$tuple$<first name>` made by the same `generateVarDeclInnerClass` that makes every top-level variable's class;
- each name gets its own class, as a top-level variable has, whose initializer reads the hidden variable's field and calls the tuple's typed getter for its element; a mutable name's field holds a `MutableFValue` cell, as a single mutable variable's does;
- `addTopLevelVarBinding` registers each name's binding before any code is generated, as it does for a single variable, so a name is visible to initializers above it and to importing components under the usual class name;
- a wildcard `_` binds nothing and gets no class; the hidden class is named after the first name that is no wildcard, and a binding of wildcards only emits nothing.

`generateVarDeclInnerClass` gained an overload that takes the code that pushes the value; th
~~~~

## [S61] explorations/compile-ladder/rung-method-forwarders/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-method-forwarders/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-method-forwarders/REPORT.md:11-17, 2515 bytes, cut at 2500.

~~~~
## What changed and why

Three edits of the code generator, in the members that the rung's section names.

1. **One method once (row 990; fork M1).** `CodeGen.dumpMethodChaining` gathered its candidates with `STypesUtil.allMethodsNotIdenticallyCovered`, which drops a declaration that a declaration of a strict subtype covers with an equivalent domain. It compared the two domains as schemas over each declaring trait's own static parameters, bounds included (`fullyReplacedMethodDomain`, STypesUtil.scala:1599). For `mx(self, other: T): T` in `Mmx[\T extends Mmx[\T\]\]` and in `Tord[\T extends Tord[\T\]\]` the two schemas differ in the bound, so neither covered the other, both stayed, and each got a forwarder under one name and descriptor. The gathering now calls the new `STypesUtil.allMethodsNotReplaced` (STypesUtil.scala:1748; CodeGen.java:980): a declaration is left out when another of the same name and kind, with self at the same position, is declared by a type strictly below its own and has the same parameter types without self, compared at the instance that the extends clauses give (`paramsWithoutSelfApart`, STypesUtil.scala:1780, the comparison of `providedAndOverridden`). The rule is a property of pairs of declarations, so the result does not depend on the order in which the methods are gathered.
2. **A body in an api's trait (row 732; fork M2).** The loop skipped every declaration without a body. A declaration read from an imported api never has one. `hasBodyInItsTrait` (CodeGen.java:1051) now keeps a body-less declaration whose declaring trait is named with an api and which has no `abstract` modifier, the reading of the checker's `isAbstractFnDecl`; a field's getter or setter stays skipped. The forwarder that `generateForwardingFor` then writes calls the static body, or for a generic method the closure finder, in the api trait's class of default methods, which the exporting component's jar holds.
3. **Self not first (row 571).** `generateForwardingFor` looks a forwarder up among the names and signatures of the object's dispatch methods, so as not to write it beside one. It built the signature to look up by removing parameter `selfIndex` from the static body's signature, whose self is always first; with self second it removed the first argument instead and found nothing, and the forwarder was written beside the dispatch method of the same name and descriptor. Where it is not narrowing it now removes parameter 0 (CodeGen.java:870-873). The narrowing cal
~~~~

## [S62] explorations/reviews/batch-31-review.md, "Findings for the record, with no decision of his changed"

`facts-extract.sh 'doc:explorations/reviews/batch-31-review.md#Findings for the record, with no decision of his changed'`

explorations/reviews/batch-31-review.md:276-289, 2620 bytes, cut at 2500.

~~~~
### Findings for the record, with no decision of his changed

- **Five sentences of the plan are not what landed.**
  - Rung L's example for him, "After: it compiles, and `find(3)` is 3" (`CLIMB-BATCH-31.md:371`): the program as printed, with `-1` as the block's last expression, does not compile after the rung (`compiler_tests/XXXLabelNumeralValueCompiled`; L.worker.3). With `none: ZZ32 = -1` bound first it compiles and runs.
  - "This refusal is the one change of run 1 that stops a program that runs today" (`:404`): two more kinds of pair are refused by rung V, each by the rule, and rung M turned one load failure into a wrong answer (row 1038).
  - Fork K1's consequence, fork X1's width and fork L1's reason (section 2).
- **P-50 covers the spelling that rung L left unbuilt, and the rung's briefing did not hold it.** By P-50 and P-173 the numeral that ends a label block at a declared number type takes that type in place. The row files the case under the code generator's crash (row 340's notes). The same family has three more members: a numeral at the end of a block (rows 1014 and 1030, rung E of run 2) and as the value of an atomic expression (row 1043). Part 5 gives them to rung E as kin.
- **A reserved point was reported as not reached when it was** (rung K: a cast at a place that verifies today). The skeptic's one program for each reserved point, which this batch's first reading asked for, found it.
- **Two cases landed inside expected-failure programs that stop before they reach them:** the `finally` clause on an exit's way (`compiler_tests/XXXFinallyOnEscape.fss:29`) and a label block as a call's later argument (`compiler_tests/XXXAtomicBlockLaterArgument.fss:20`). Each shows only when the program's earlier defect is repaired.
- **Three combinations of two rungs have no test,** by the merged-diff review's reading (review.2): an exit whose value is `self` at a listed type, `atomic self` returned at a listed type, and rung X's cast in the dispatch method of a generic trait.
- **Row 542 is closed while its second pair as written stays refused,** by P-45's positional rule (X.worker.1 holds the question).
- **The one library declares a `value` object with a `var` value parameter,** `Lazy` (`Library/Lazy.fss:18`), the form that rung A's cell changes (row 112).
- **Rung A ran `ant testQuick` where its section says "the whole compiled suite";** it gave its reason, and the gate ran `testFast`.
- **The repair's commit `995993ceab` touches the test folder of the
~~~~

## [S63] explorations/compile-ladder/rung-label-exit/REPORT.md, "What changed and why"

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

## [S64] explorations/compile-ladder/rung-atomic-expr-field/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-atomic-expr-field/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-atomic-expr-field/REPORT.md:11-15, 2051 bytes.

~~~~
## What changed and why

1. **The atomic expression** (`CodeGen.java:1977-1984`). The parser writes `atomic do ... end` as a `Block` marked atomic (`parser/DelimitedExpr.rats:155-163`) and `atomic e`, for any other body, as an `AtomicExpr` (`parser/Expression.rats:737-738`). The code generator compiled the first and had no case for the second, so `defaultCase` refused it. The new member `forAtomicExpr` makes the atomic block that holds the body alone, the node the parser makes for `atomic do e end`, and hands it to `forAtomicBlock`. The block's value is its last expression's (`doStatements`, `CodeGen.java:1651`), so the expression's value is its body's.
2. **A var field** (`CodeGen.java:4938-4961`, `:4976-5014`; `VarCodeGen.java:202-239`, `:325`). An object's `var` value parameter and `var` field of its body are kept in a `MutableFValue` cell. The object's JVM field holds the cell, is `public final`, and is written once, by the constructor (`MutableFieldVar.firstWrite`, `VarCodeGen.java:223`). `MutableFieldVar` is now a `MutableStaticBinding` whose cell is reached through the object, so a read and a write emit the code of a top-level `var`: the check `BaseTask.inATransaction()`, then `Transaction.TXRead`/`TXWrite` on the cell inside a transaction, or the cell's `getValue`/`setValue` outside one. A field that is not `var` is a `FieldVar`, as an immutable value parameter was, with the bytecode it had.
3. **A field captured by a loop body or a function expression.** Every nested code-generation context (a task, a closure) asks `isAMutableStaticBinding()` to decide whether it captures a cell or a copy (`CodeGen.java:5282`, `:5397`, `:5462` at the base). Because `MutableFieldVar` now is one, a loop body or a function expression inside an object's method captures the field's cell. On the base it captured a copy of the value, so a write from a loop body inside the object's own method was lost at one thread too. This defect was not in the ledger; the cell repairs it, and `compiler_tests/VarFieldCapturedCompiled` asserts it.
~~~~

## [S65] explorations/reviews/batch-31-review.md, "Part 5. What changes run 2's sections"

`facts-extract.sh 'doc:explorations/reviews/batch-31-review.md#Part 5. What changes run 2's sections'`

explorations/reviews/batch-31-review.md:465-512, 8072 bytes, cut at 2500.

~~~~
## Part 5. What changes run 2's sections

Run 2 holds T, O and E, and launches on this landed tree. The record says that its sections are read again first (`CLIMB-BATCH-31.md:925`). For its planner:

**Line numbers that moved** (the record's lines are of `c0c35b4f9e`, whose code is the base's).
- **T.** `Specification/appendices/changes.tex:3323`, which names row 832, is `:3333`. `forVarDeclPrePass`, on its "Not" list at `:6481`, is `CodeGen.java:6614`. Its members by name: `generateForwardingFor` `:793`, `forMethodInvocation` `:7071`, `receiverPrependedDomainType` `:7211`. `compiler/NamingCzar.java` is unchanged.
- **O.** `changes.tex:4812-4815` is `:4826-4829`, and `:4847` is `:4861`. Every other file that its section names is unchanged by run 1: `LanguageTypes.java`, `interpreter/glue/`, `BuildEnvironments.java`, `BuildNativeEnvironment.java`, `BuiltinPrimitiveRewriter.java`, `Library/`, `ProjectFortress/LibraryBuiltin/` and its three named tests.
- **E.** `changes.tex:5421-5427` is `:5435-5441`. `scala_src/typechecker/` is unchanged. The members of `CodeGen.java` that write a reference to a function as a value are `forFnRef` `:4101` and `forFunctionalRef` `:4182`.
- The briefing keys cite code by member; each is checked again with `facts-extract.sh --check`.

**Files that its rungs share with what landed.**
- **`compiler/codegen/CodeGen.java`: T edits it, E may, and M, L, A and K landed there.**
  - T builds on rung M's forwarders, as planned. Two members are new to its section: `STypesUtil.allMethodsNotReplaced` now decides which declarations get a forwarder (`CodeGen.java:980`), and `hasBodyInItsTrait` (`:1051`) which of them count as bodies. M's one line inside `generateForwardingFor` is `:873`.
  - K's `castToTypeBelow` (`:7436-7459`) acts at a single argument (`:7417`). T's bridge method joins a tuple's elements to one value; whether a `self` among them needs K's cast is T's to try.
  - K's cast at a returned value (`:3126`, through `declaredResult`, `:7424`) is the code that the record expected E to meet. E's repair keeps it.
- **`Specification/appendices/changes.tex`:** T, O and E each edit it; V, X and K landed there.
- **`interpreter/evaluator/values/OverloadedFunction.java` and `types/FTraitOrObject.java`:** on O's "Not" list. The landed check is `OverloadedFunction.java:513-527` and `:792-904`; the value check is `FTraitOrObject.java:102-103`.
- **`scala_src/useful/STypesUtil.scala`:** rung M added 76 lines; no rung of run 2 is given the fil
~~~~

## [S66] explorations/compile-ladder/rung-number-objects/REPORT.md, "Every pair that walk refuses at load after the change and loaded before"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-number-objects/REPORT.md#Every pair that walk refuses at load after the change and loaded before'`

explorations/compile-ladder/rung-number-objects/REPORT.md:162-166, 1115 bytes.

~~~~
## Every pair that walk refuses at load after the change and loaded before

None among the library and the plain tests: every test of `ant testSystem` loads the library, and all 869 passed. For the 163 expected-failure walk tests, which stay green whether their failure is a refusal at load or a failure at run time, the comparison of their outputs on the old code and the new was not made: the session's automatic permission check refused the run of the base build's `harness-one.sh` with `FORTRESS_HOME` set to the base build (the form of `worktrees.md`, "Running the old code"), "Destructive or Unwanted Actions", and by `session.md` that run was not tried another way. On the edit all 163 passed (`Saw expected failure` or `Saw expected exception`).

Added by the skeptic: the 163 expected-failure walk tests, run directly with `old-fortress.sh` and with `bin/fortress`, keep their failures; none moves between a refusal at load and a failure at run time. Their outputs differ only in lists of overloads and in the counts of one race, `XXXAtomicNestedReadsKeptWalk` (`SKEPTIC.md`, "The expected-failure tests").
~~~~

## [S67] explorations/reviews/batch-31-review.md, "Part 4. Routing"

`facts-extract.sh 'doc:explorations/reviews/batch-31-review.md#Part 4. Routing'`

explorations/reviews/batch-31-review.md:432-463, 5898 bytes, cut at 2500.

~~~~
## Part 4. Routing

The routing check of the manual's "After the landing: the coordinator's routing", step 2: each open row, record default and item for him has a home.

**Items for him: each has a home.** The 36 entries of the rungs, the gather, the review, the two judges and the two routed steps are 22 lines of `PLAN.md:826-847`, "Climb batch 31, listed for his review", and one item under his answers, M.skeptic.1 (`PLAN.md:143`, item 96). A worker's and its skeptic's entry on one question share a line.

**Open rows.**
- With a line of that group or of item 96: 1037, 1038, 1039, 1040, 1041, 1042, 1044, 1045, 1046, 1047, 1048, 1049 and 1051, and the rewritten rows 573, 340, 550 and 1036 by their items.
- **Four have no line of their own in `PLAN.md` or `review-queue.md`:** 1043, 1050, 1052 and 1053. Owed, as parked lines or with a batch (the homes are mine):
  - row 1043, a numeral as the value of an atomic expression: rung E of run 2, as kin by a run (Part 5);
  - rows 1050 and 1052, the closure and the call on a value of the self parameter: finding 1's rung, with row 1051;
  - row 1053, an assignment from outside to a `var` field of a value of a strict subtype: the code generator's next rung on a field, in the batch after.
- Rows 322, 890, 641, 112 and 115, rewritten or noted: each keeps its earlier lines, and needs none beyond its row.

**Record defaults: none of this run's forks is in the review queue.** The plan gives the 27 forks to the queue as new items after the landing (`CLIMB-BATCH-31.md:953`). Owed for run 1, each as an entry with its default as landed: B1, B2, B3, H1, S (with item 522), M1 (with M.worker.1), M2, K1 (with K.skeptic.1), L1 (with L.worker.4 and finding 2), L2 (with L.worker.1), A1, V1, V2, V3 (with V.worker.3), V4 (with X.skeptic.2) and X1 (with X.worker.2); O2 and O5 as the answers of items 517 and 520, which still read "Landed: Nothing"; and **a new item for fork H2,** the one consequential fork of the record, which no item holds yet.

**The coordinator's decisions between the go and the launch.** For each: whether a list holds it, and what landed.
1. **Fork V4, the second way of the check's point B1.** No line of the group names V4. Landed: kept. `OverloadedFunction.java:882-904` reads no `comprises` clause, and `tests/XXXGenericBesidePlainReturnParam.fss` is unchanged.
2. **The guard of the check's point B2,** a plain declaration with no written return type beside a generic one. The group holds its consequence, V.worker.1 (ro
~~~~

## [S68] explorations/compile-ladder/rung-tuple-parameter/REPORT.md, "The convention as built"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-tuple-parameter/REPORT.md#The convention as built'`

explorations/compile-ladder/rung-tuple-parameter/REPORT.md:22-31, 1387 bytes.

~~~~
## The convention as built

A compiled method's JVM parameters follow its declaration:

- one parameter of a declared tuple type: the tuple's elements, one JVM parameter each; the body makes the tuple again;
- one parameter whose declared type names a type parameter: one JVM parameter at every instance, the boxed tuple where the instance is a tuple, as the generic trait's interface declares it;
- several parameters: one JVM parameter each, a tuple among them boxed;
- a generic dotted method's closure: the receiver, then the declared parameters one each, so its one tuple parameter is boxed (`convertGenericMethodToClosureDecl`).

Where the instantiated signature and the body's differ, two bridges join them. The code generator writes, in the class that gives a body at the tuple type, a method of the interface's boxed signature that unpacks the tuple and calls the body virtually (`tupleElementsBridge`). The class loader writes, in an instantiated class, beside a method whose template's one parameter is a type parameter that the instance makes a tuple, a method of the elements that packs them and calls it (`Instantiater.visitMethod`). A dotted call chooses the boxed form by the declarations that the receiver's type holds (`callTakesTupleBoxed`); a call through an interface finds only the boxed form, so it must. A function or operator call passes the elements, as before.
~~~~

## [S69] explorations/compile-ladder/rung-numeral-block-end/SKEPTIC.md, "Findings and fixes"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-block-end/SKEPTIC.md#Findings and fixes'`

explorations/compile-ladder/rung-numeral-block-end/SKEPTIC.md:33-65, 5397 bytes, cut at 2500.

~~~~
## Findings and fixes

**1. A numeral out of range that ends a block after a local declaration compiles and dies at run time** (defect of the change: a sibling site its own repair owes). `NumeralConversion.outOfRangeAt` (`CoercionOracle.scala:591-603` at `301d40b54e`, the object beside the oracle in its file) walks the join's result positions and had no case for a `LetExpr`, which the rung added to `numeralResult` and `joinInto`. So for `nn(): NN32 = do k: ZZ32 = 3; 5000000000 end` the join declined the numeral, `buildCoercion`'s range test (`CoercionOracle.scala:186-187`) found nothing, and the oracle wrapped the whole block in the generic coercion: row 1014's crash, which the rung repairs for every numeral in range. `literals.tex`, section "Literals": "It is a static error if the numeral's value lies outside the range of that type, or rounds to an infinity there" (`Specification/basic/expressions/literals.tex:209-210`); P-173: "a numeral outside the type's range is refused statically". The ways: `outOfRangeAt` reads a `LetExpr` by its body, as the join now does (taken: one line, the pairing of the two walkers that `a26e74f5c8` made); the join returning the refusal itself (it returns an `Option` of the tree, with no message, and the error path already reads `outOfRangeAt`, `STypeChecker.scala:540-543`); a ledger row and an expected-failure test (it would leave a crash at the very place the rung repairs). Test: two cases added to `compiler_tests/NumeralJoinBeyondRange.fss` (`viaDecl` at `:20-23`, `viaDeclTuple` at `:24-27`, after `run()` so that the lines that `XXXNumeralJoinBeyondRange.test` pins do not move), and two lookaheads in its `.test`.

       ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skeptic-head ProjectFortress/compiler_tests XXXNumeralJoinBeyondRange.test ...    (08:55:04Z, the worker's head, before my edit)
        Saw failure, but did not satisfy compile_err_WImatches; expected
       1) ProjectFortress/compiler_tests/NumeralJoinBeyondRange(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
       Tests run: 7,  Failures: 1,  Errors: 0
       old-fortress.sh /home/user/fortress-base36 .../tmp/old-caches junit .../XXXNumeralJoinBeyondRange.test ...    (08:55:23Z, the base's code)
       3) .../NumeralJoinBeyondRange(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
       ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skeptic-
~~~~
