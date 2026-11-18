<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that 160925800..a6e73b8d6 added, changed or removed (the batch 33, landed at d3747846c, and the landing's own steps to a6e73b8d6), written by evidence.py. -->

# The entries that the range changed

- The batch, 160925800..d3747846c: 43 entries: F-9, F-53, F-76, F-98, F-102, F-175, F-181, F-225, F-232, F-240, F-268, F-281, F-282, F-283, F-287, F-289, F-291, F-293, F-296, F-297, F-302, F-315, F-318, F-351, F-352, F-353, F-361, F-363, F-369, F-372, F-374, F-375, F-377, F-379, F-380, F-381, F-382, F-383, F-384, F-385, F-386, F-387, P-166
- After the landing, d3747846c..a6e73b8d6: 0 entries
- Now over 600 characters: 40 of 43: F-9, F-53, F-76, F-102, F-175, F-181, F-225, F-232, F-240, F-281, F-282, F-283, F-287, F-289, F-291, F-293, F-296, F-297, F-302, F-315, F-318, F-351, F-352, F-353, F-361, F-363, F-369, F-372, F-374, F-375, F-377, F-379, F-380, F-381, F-382, F-384, F-385, F-386, F-387, P-166

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-9, changed

- Size: at the base 549 characters; at the landing 745 characters; now 745 characters, over 600.
- Section now: "Execution model".

At the base:

- F-9 **`fortress typecheck` checks a program against the compiler's library, `Library/CompilerLibrary.fsi`, so it is no oracle for walk programs.** `Shell.java` calls `useCompilerLibraries()` for the command (row 69). P-12 has walk run the checker on its own programs after the switch-over, and walk cannot do so as it stands: it runs with type checking and the Scala checker off, the Java checker is gone (`compiler/StaticChecker.java:228-229`), and it has no case for the `CoercionInvocation` nodes that the checker inserts, by reading (row 833).

Now:

- F-9 **`fortress typecheck` checks a program against the compiler's library, `Library/CompilerLibrary.fsi`, unless `FORTRESS_LIBRARY=one` selects the one library, so by default it is no oracle for walk programs.** `Shell.java` calls `useCompilerLibraries()` for the command, which reads the one library where `FORTRESS_LIBRARY=one` selects it (F-381), so that under the selection `f(i: Index)` passes it (row 69). P-12 has walk run the checker on its own programs after the switch-over, and walk cannot do so as it stands: it runs with type checking and the Scala checker off, the Java checker is gone (`compiler/StaticChecker.java:228-229`), and it has no case for the `CoercionInvocation` nodes that the checker inserts, by reading (row 833).

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: rung S's selector makes typecheck read the one library under FORTRESS_LIBRARY=one (row 69's note; Shell.java:377-388)

## F-53, changed

- Size: at the base 1377 characters; at the landing 1376 characters; now 1376 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 31b's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 33's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-17 22:35Z · rewritten · by climb batch 33 commit stage: climb batch 33's gate: explorations/compile-ladder/climb-batch-33/gate/distance.txt, lines #total 0 (line 2), #crash none (line 12) and its first line's 14 components; checker-count.txt, lines #total 0 (line 16) and #crash none (line 18); the per-site list compile-ladder/gate/distance-sites.tsv holds its header alone; only the batch number in the title changes

Report sections that the entry cites: [S1] `references/batch.md`, "The checker count and the distance".

## F-76, changed

- Size: at the base 1597 characters; at the landing 1672 characters; now 1672 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-76 **The compiled checker accepts the specification's `comprises` example of the Meet Rule (`Specification/advanced/overloading.tex`, "The Meet Rule for Functions") by a coverage check used only in overload checking, not in its subtype test, and types a call whose argument's static type lies below closed traits and above the types that they list by the intersection of the return types of its most specific declarations, when they tie without coercion.** It builds P-60, which reads `comprises` at the level of values: several declarations below two overloads serve as their meet if together they cover it. Open: coverage refuses a pair when a declaration that it compares has static parameters (row 546). In an accepted family that has any other generic declaration, such a call is typed by its first minimal candidate in the call's order of overloadings, which follows the build (row 935), not by the intersection (row 543). That narrower scope than P-60's is a default. On the compiled path, a method call on a value typed by the intersection crashes the code generator (row 540), and a generic declaration instantiated at an intersection type dies as it loads (row 559). The checker checks a `comprises` clause only at the closed trait's immediate subtypes, so a type in another component below a generic subtrait escapes it (row 487). Its verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Gated by `compiler_tests/*Comprises*` and `*CoverageReturn*`. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 3 and 4.

Now:

- F-76 **The compiled checker accepts the specification's `comprises` example of the Meet Rule (`Specification/advanced/overloading.tex`, "The Meet Rule for Functions") by a coverage check used only in overload checking, not in its subtype test, and types a call whose argument's static type lies below closed traits and above the types that they list by the intersection of the return types of its most specific declarations, when they tie without coercion.** It builds P-60, which reads `comprises` at the level of values: several declarations below two overloads serve as their meet if together they cover it. Open: coverage refuses a pair when a declaration that it compares has static parameters (row 546). In an accepted family that has any other generic declaration, such a call is typed by its first minimal candidate in the call's order of overloadings, which follows the build (row 935), not by the intersection (row 543). That narrower scope than P-60's is a default. On the compiled path, a method call on a value typed by the intersection runs on the conjunct that has the checker's chosen declaration (`compiler_tests/CoverageReturnMethodCall.test`), and a generic declaration instantiated at an intersection type dies as it loads (row 559). The checker checks a `comprises` clause only at the closed trait's immediate subtypes, so a type in another component below a generic subtrait escapes it (row 487). Its verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Gated by `compiler_tests/*Comprises*` and `*CoverageReturn*`. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 3 and 4.

History blocks of the range:

- Written by the gather: 2026-11-17 21:36Z · rewritten · from `explorations/compile-ladder/rung-intersection-receiver/REPORT.md`, "1. What changed and why" · by climb batch 33 gather: row 540 fixed by rung I; the record's sentence (cites [S2])

Report sections that the entry cites: [S3] `Specification/advanced/overloading.tex`, "The Meet Rule for Functions".

## F-98, changed

- Size: at the base 498 characters; at the landing 498 characters; now 498 characters.
- Section now: "The harness and the gate".

At the base:

- F-98 **The harness's `run_out_WIcontains` key is whitespace-insensitive containment.** It collapses runs of whitespace in both the output and the expected string, where `_WImatches` collapses them in the output only. A key that `generalTestFailed` does not know sets no check, so a misspelt key checks nothing. A `run_out` with no check falls to the default: the output contains `pass` or `PASS`. Source: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:155-188`, `:276-282`.

Now:

- F-98 **The harness's `run_out_WIcontains` key is whitespace-insensitive containment.** It collapses runs of whitespace in both the output and the expected string, where `_WImatches` collapses them in the output only. A key that `generalTestFailed` does not know sets no check, so a misspelt key checks nothing. A `run_out` with no check falls to the default: the output contains `pass` or `PASS`. Source: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:156-189`, `:277-283`.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

## F-102, changed

- Size: at the base 783 characters; at the landing 783 characters; now 783 characters, over 600.
- Section now: "The harness and the gate".

At the base:

- F-102 **An `XXX*.fss` in the interpreter corpus is a gated expected-failure test.** `SystemJUTest` marks a file of `ProjectFortress/tests/` whose name starts with `XXX` as one that must fail, and the suite goes red when it passes. Such a test needs a `.test` file only to name a refusal at load, as any program of `tests/` does (F-29: walk's load check and its `load_exception_contains` key). An `XXX` test that imports an api with its component, as `XXXImportImportCollision.fss` does, takes them from `ProjectFortress/test_library/`, so it needs no new api folder. The compiled corpora's rule differs (F-103). Source: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:783-785` and `:394-412`; the `fortress-repo` skill's `tests-writing.md`, "How `XXX` works".

Now:

- F-102 **An `XXX*.fss` in the interpreter corpus is a gated expected-failure test.** `SystemJUTest` marks a file of `ProjectFortress/tests/` whose name starts with `XXX` as one that must fail, and the suite goes red when it passes. Such a test needs a `.test` file only to name a refusal at load, as any program of `tests/` does (F-29: walk's load check and its `load_exception_contains` key). An `XXX` test that imports an api with its component, as `XXXImportImportCollision.fss` does, takes them from `ProjectFortress/test_library/`, so it needs no new api folder. The compiled corpora's rule differs (F-103). Source: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:784-786` and `:395-413`; the `fortress-repo` skill's `tests-writing.md`, "How `XXX` works".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

Report sections that the entry cites: [S4] `tests-writing.md`, "How `XXX` works".

## F-175, changed

- Size: at the base 1298 characters; at the landing 1204 characters; now 1204 characters, over 600.
- Section now: "The specification and the repository's lineage".

At the base:

- F-175 **The specification reads a `comprises` clause at the level of values in every passage.** It builds P-60. Appendix I's entry "Traits with comprises clauses read at the level of values" records the change. A call whose argument's static type stands between two closed traits runs the declaration that covers its value. Where its declarations have no static parameters, its type is the intersection of its most specific declarations' return types. Appendix I names five places where the compiled path departs. The checker checks a `comprises` clause at the closed trait's immediate subtypes only (row 487). The code generator crashes on a method call on a result typed by that intersection (row 540). Where any declaration of the overload set has static parameters, the checker types such a call by one of its most specific declarations instead, a deliberate choice (row 543). The checker refuses the Meet Rule's example for closed traits when its declarations have static parameters (row 546). The checker's verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Detail: `Specification/appendices/changes.tex:3474-3670`, with the rows at `:1674-1677` and `:3740-3747`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 8 and 9.

Now:

- F-175 **The specification reads a `comprises` clause at the level of values in every passage.** It builds P-60. Appendix I's entry "Traits with comprises clauses read at the level of values" records the change. A call whose argument's static type stands between two closed traits runs the declaration that covers its value. Where its declarations have no static parameters, its type is the intersection of its most specific declarations' return types. Appendix I names four places where the compiled path departs. The checker checks a `comprises` clause at the closed trait's immediate subtypes only (row 487). Where any declaration of the overload set has static parameters, the checker types such a call by one of its most specific declarations instead, a deliberate choice (row 543). The checker refuses the Meet Rule's example for closed traits when its declarations have static parameters (row 546). The checker's verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Detail: `Specification/appendices/changes.tex:3474-3670`, with the rows at `:1674-1677` and `:3740-3746`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 8 and 9.

History blocks of the range:

- Written by the gather: 2026-11-17 21:36Z · rewritten · from `explorations/compile-ladder/rung-intersection-receiver/REPORT.md`, "7. Sentences of the specification made false" · by climb batch 33 gather: row 540 fixed by rung I; Appendix I's Effect names three ways now, corrected by its skeptic (cites [S5])

## F-181, changed

- Size: at the base 1636 characters; at the landing 1695 characters; now 1695 characters, over 600.
- Section now: "The territory map".

At the base:

- F-181 **The code generator compiles a function, method, object or trait declaration that carries a `where` clause in its own header, emitting nothing for the clause, and refuses every function or method with a contract (row 701).** The clause's constraints are the checker's. A trait's or object's contract does not reach the refusal: the disambiguator drops it (row 781); F-255 says how each path reads a `where` clause on an `extends` entry (row 774). Walk checks a function's `requires` clause and raises `CallerViolation`. The `fortress-repo` skill's `references/compiler.md`, "What the compiled path cannot compile yet", gives the refusal and the constructs that the code generator has no case for; an array comprehension has no case either. A local function compiles as a closure, except in the four forms that F-320 names. A trait whose `comprises` clause lists a type at a `where`-clause size, of `NatParam`'s shape, compiles; a call that opens its value to the size fails verification (row 307). Where a generic type that such a clause lists gives a member's body, the code generator crashes first (row 812). A function's or method's own clause that introduces a `where`-clause variable compiles, and the compiled call dies with `NoClassDefFoundError` (row 867). Tests: `compiler_tests/WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`; `XXXFunctionContractCodeGeneration`; the `XXXNatOpenRun` pair; the `XXXWhereVariableCallCompiled` pair. Detail: `compile-ladder/rung-codegen-where/REPORT.md`, sections 1, 2 and 5.

Now:

- F-181 **The code generator compiles a function, method, object or trait declaration that carries a `where` clause in its own header, emitting nothing for the clause, and refuses every function or method with a contract (row 701).** The clause's constraints are the checker's. A trait's or object's contract does not reach the refusal: the disambiguator drops it (row 781); F-255 says how each path reads a `where` clause on an `extends` entry (row 774). Walk checks a function's `requires` clause and raises `CallerViolation`. The `fortress-repo` skill's `references/compiler.md`, "What the compiled path cannot compile yet", gives the refusal and the constructs that the code generator has no case for; an array comprehension has no case either. A local function compiles as a closure, except in the four forms that F-320 names. A trait whose `comprises` clause lists a type at a `where`-clause size, of `NatParam`'s shape, compiles; a call that opens its value to the size fails verification (row 307). Where a generic type that such a clause lists gives a member's body, the code generator compiles it (row 812, fixed; F-384; `compiler_tests/ComprisesWhereMemberCompiled`). A function's or method's own clause that introduces a `where`-clause variable compiles, and the compiled call dies with `NoClassDefFoundError` (row 867). Tests: `compiler_tests/WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`; `XXXFunctionContractCodeGeneration`; the `XXXNatOpenRun` pair; the `XXXWhereVariableCallCompiled` pair. Detail: `compile-ladder/rung-codegen-where/REPORT.md`, sections 1, 2 and 5.

History blocks of the range:

- Written by the gather: 2026-11-17 21:31Z · rewritten · from `explorations/compile-ladder/rung-kind-env-generic/REPORT.md`, "What changed and why" · by climb batch 33 gather: row 812 fixed by rung V; its skeptic named the sentence (cites [S6])

Report sections that the entry cites: [S7] `references/compiler.md`, "What the compiled path cannot compile yet".

## F-225, changed

- Size: at the base 2754 characters; at the landing 2676 characters; now 2676 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-225 **In a self-typed trait with no `comprises` clause, or one that lists only `...`, the compiled checker types `self` in the method bodies as `C[\X\] & X`, the trait met with the implementing type, read from the trait's F-bound; the methods' signatures keep `self` at the plain trait type `C[\X\]`, save in the overloading check's exclusion test (F-277), and the checker refuses an extender at another type.** It builds P-146. A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`. The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's. In a trait whose `comprises` clause lists types, `self` is instead the trait met with the union of those types, and the exclusion test reads its signatures plain. For example, `object Bad extends Integral[\ZZ32\]` is refused, since `Bad` is not a `ZZ32`. The rule accepts every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares instead (P-146). Walk has no such rule and loads what it refuses. A compiled default body that returns `self` at the self-type parameter runs, also where the parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]` (row 695, fixed). F-377 gives the cast that does it and the shapes that still fail verification, among them a conditional that returns `self` in one arm and another value in the other, the shape of `StandardTotalOrder`'s `MIN` and `MAX` (row 1051). A default body that calls a method on a value of the self-type parameter dies at load with a `ClassCircularityError` where the object lists the trait first (row 1052). The rule refuses, rightly, a team declaration, `PureList`'s `List` (row 355); the demo `trips.fss`'s `generator`, which it refused, extends `StandardTotalOrder[\generator\]` since its repair (row 710; `ProjectFortress/demos/trips.fss:96`). The compiler's prelude writes the self type instead as `comprises T` on `StandardTotalOrder` and `Equality` (`Library/CompilerAlgebra.fsi:16`, `:24`; on `StandardTotalOrder` since Steele's `655e65d53`, 2012-06-05, and `59fdeff62`, 2012-06-06, which took its F-bound away), and that spelling does not bind the one library, since Naden's last text puts the self-type idiom in bounds only, not as a first-class type (`Papers/Types/journal/justificationOfRTR.tex:626-630`), and Steele's own message on `655e65d53` gives the self type as the trait met with the `comprises` clause, which this rule reads from the F-bound. Gated by `compiler_tests/SelfType*` and `XXXSelfType*`. Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4 and 7; `compile-ladder/rung-self-type-exclusion/REPORT.md` section 1.

Now:

- F-225 **In a self-typed trait with no `comprises` clause, or one that lists only `...`, the compiled checker types `self` in the method bodies as `C[\X\] & X`, the trait met with the implementing type, read from the trait's F-bound; the methods' signatures keep `self` at the plain trait type `C[\X\]`, save in the overloading check's exclusion test (F-277), and the checker refuses an extender at another type.** It builds P-146. A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`. The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's. In a trait whose `comprises` clause lists types, `self` is instead the trait met with the union of those types, and the exclusion test reads its signatures plain. For example, `object Bad extends Integral[\ZZ32\]` is refused, since `Bad` is not a `ZZ32`. The rule accepts every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares instead (P-146). Walk has no such rule and loads what it refuses. A compiled default body that returns `self` at the self-type parameter runs, also where the parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]` (row 695, fixed). F-377 gives the cast that does it, also at a conditional's arm, the shape of `StandardTotalOrder`'s `MIN` and `MAX`, and at a closure's result (rows 1051 and 1050, fixed). A default body that calls a method on a value of the self-type parameter runs, also where the object lists the trait first (row 1052, fixed; F-385). The rule refuses, rightly, a team declaration, `PureList`'s `List` (row 355); the demo `trips.fss`'s `generator`, which it refused, extends `StandardTotalOrder[\generator\]` since its repair (row 710; `ProjectFortress/demos/trips.fss:96`). The compiler's prelude writes the self type instead as `comprises T` on `StandardTotalOrder` and `Equality` (`Library/CompilerAlgebra.fsi:16`, `:24`; on `StandardTotalOrder` since Steele's `655e65d53`, 2012-06-05, and `59fdeff62`, 2012-06-06, which took its F-bound away), and that spelling does not bind the one library, since Naden's last text puts the self-type idiom in bounds only, not as a first-class type (`Papers/Types/journal/justificationOfRTR.tex:626-630`), and Steele's own message on `655e65d53` gives the self type as the trait met with the `comprises` clause, which this rule reads from the F-bound. Gated by `compiler_tests/SelfType*` and `XXXSelfType*`. Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4 and 7; `compile-ladder/rung-self-type-exclusion/REPORT.md` section 1.

History blocks of the range:

- Written by the gather: 2026-11-17 21:34Z · rewritten · from `explorations/compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why" · by climb batch 33 gather: rows 1051, 1050 and 1052 fixed by rung Q; the record's text, the entry on the class loader named by number (cites [S8])

## F-232, changed

- Size: at the base 1409 characters; at the landing 1409 characters; now 1409 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-232 **The syntax tree's hashes do not depend on the JVM's identity hashes, except at inference variables, walk's wrapped values and the nodes that hold them.** Every generated node's hash starts from the hash of its class's name: makeAST's post-processing of ASTGen's output writes that start, and so do the in-repo generators (`build.xml:679-697`). A field whose type holds an `Option` is hashed by `NodeHash.of` (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeHash.java`), since the PLT `Option` classes hash by identity. So hash maps and sets of nodes that hold neither exception iterate in one order whatever code asked for an identity hash before, and so do the apis that `StaticChecker.checkApis` takes in turn. The exceptions hash through identity hashes: an inference variable's id is a bare `Object` (`nodes_util/NodeFactory.java:1166-1184`), but no output of the count stage moves through its hash; walk's `_WrappedFValue` hashes its `FValue` by walk's own hash, which can be an identity hash (`interpreter/evaluator/_WrappedFValue.java:170-177`; row 430). `DeclaredFunction`s, entries of the checker's index and not nodes, still hash by identity, but since row 737's repair no choice of `ApiTypeExtractor` depends on their order (F-254). Gated by `NodeHashJUTest`, and row 737's repair by `OmittedReturnTypeFromApi`. Detail: `compile-ladder/rung-ast-hashes/REPORT.md` sections 4.2 to 4.4.

Now:

- F-232 **The syntax tree's hashes do not depend on the JVM's identity hashes, except at inference variables, walk's wrapped values and the nodes that hold them.** Every generated node's hash starts from the hash of its class's name: makeAST's post-processing of ASTGen's output writes that start, and so do the in-repo generators (`build.xml:698-716`). A field whose type holds an `Option` is hashed by `NodeHash.of` (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeHash.java`), since the PLT `Option` classes hash by identity. So hash maps and sets of nodes that hold neither exception iterate in one order whatever code asked for an identity hash before, and so do the apis that `StaticChecker.checkApis` takes in turn. The exceptions hash through identity hashes: an inference variable's id is a bare `Object` (`nodes_util/NodeFactory.java:1166-1184`), but no output of the count stage moves through its hash; walk's `_WrappedFValue` hashes its `FValue` by walk's own hash, which can be an identity hash (`interpreter/evaluator/_WrappedFValue.java:170-177`; row 430). `DeclaredFunction`s, entries of the checker's index and not nodes, still hash by identity, but since row 737's repair no choice of `ApiTypeExtractor` depends on their order (F-254). Gated by `NodeHashJUTest`, and row 737's repair by `OmittedReturnTypeFromApi`. Detail: `compile-ladder/rung-ast-hashes/REPORT.md` sections 4.2 to 4.4.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

## F-240, changed

- Size: at the base 2202 characters; at the landing 2201 characters; now 2201 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 85 s and its distance stage 150 s at the last landed gate, climb batch 31b's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 96 s), over fourteen components, ran at a start load of 0.31, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 143 s (86 s) at 0.08 at climb batch 31's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-31b/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 80 s and its distance stage 137 s at the last landed gate, climb batch 33's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 87 s), over fourteen components, ran at a start load of 0.50, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 150 s (96 s) at 0.31 at climb batch 31b's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-33/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-17 22:35Z · rewritten · by climb batch 33 commit stage: climb batch 33's gate: the count stage's 78 s from the file times of the gate's log, tmp/gate-batch-33/checker-count/javac.txt (22:31:11) and run.txt (22:32:29), written about 80 s; explorations/compile-ladder/climb-batch-33/gate/distance.txt, lines #seconds 137 (FortressLibrary 87), #machine (load at start 0.50) and its first line's 14 components; the stage ran 22:09:34 to 22:11:51, beside testFast's first minutes (testFast ended 22:18:47 after 8 min 53 s); climb batch 31b's figures (150 s, FortressLibrary 96 s, at 0.31) as the ones compared against

## F-268, changed

- Size: at the base 598 characters; at the landing 598 characters; now 598 characters.
- Section now: "The checker and the one library".

At the base:

- F-268 **The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`.** It emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` (`CodeGen.java:6567-6571`). For `Holder[\(Any, ZZ32)\]` it stops with 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null' (row 889). Test: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" and "5. Programs run old against new, and the probes".

Now:

- F-268 **The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`.** It emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` (`CodeGen.java:6616-6620`). For `Holder[\(Any, ZZ32)\]` it stops with 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null' (row 889). Test: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" and "5. Programs run old against new, and the probes".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

Report sections that the entry cites: [S9] `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why".

## F-281, changed

- Size: at the base 1535 characters; at the landing 1547 characters; now 1547 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-281 **The compiled checker checks the overloading of every operator, symbolic ones included; with them checked, the distance and the count are 0, with no crash (F-53).** Its three loops, over the top-level set, a trait's provided methods and their overriding return types, read `isCheckedName`, which admits every operator (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:766-773`); the export check reads every operator too, each under its declared name only (F-287). An on-demand import adds an api's declarations once, and leaves out a name its `except` clause lists; the check still reads an on-demand api's declaration of a name the component imports by name from another api (row 813), and an `except` that lists an operator leaves it imported on both paths (row 814). Outside its trait, a self type whose `comprises` clause lists types at a `where`-clause variable is read as the trait type (`TypeAnalyzer.selfComprised`), so `AnyList`'s `||` is checked; such a program still stops in the code generator where a listed generic type gives a member's body (row 812). So the distance stage is the full check of F-245. Gated by `compiler_tests/XXXSymbolicOperatorOverloadUnrelated`, `ComprisesWhereFunctionalMethodChecker`, `XXXComprisesWhereFunctionalMethodBounds`, `OperatorPrefixInfixImport` and `ImportExceptOverload`, and by the stages (each '#total 0', '#crash none'). Detail: `compile-ladder/rung-symbolic-check/REPORT.md` sections 1, 3 and 5; `reviews/batch-28-review.md`, section 1.

Now:

- F-281 **The compiled checker checks the overloading of every operator, symbolic ones included; with them checked, the distance and the count are 0, with no crash (F-53).** Its three loops, over the top-level set, a trait's provided methods and their overriding return types, read `isCheckedName`, which admits every operator (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:766-773`); the export check reads every operator too, each under its declared name only (F-287). An on-demand import adds an api's declarations once, and leaves out a name its `except` clause lists; the check still reads an on-demand api's declaration of a name the component imports by name from another api (row 813), and an `except` that lists an operator leaves it imported on both paths (row 814). Outside its trait, a self type whose `comprises` clause lists types at a `where`-clause variable is read as the trait type (`TypeAnalyzer.selfComprised`), so `AnyList`'s `||` is checked; the code generator compiles such a program where a listed generic type gives a member's body too (row 812, fixed; F-384). So the distance stage is the full check of F-245. Gated by `compiler_tests/XXXSymbolicOperatorOverloadUnrelated`, `ComprisesWhereFunctionalMethodChecker`, `XXXComprisesWhereFunctionalMethodBounds`, `OperatorPrefixInfixImport` and `ImportExceptOverload`, and by the stages (each '#total 0', '#crash none'). Detail: `compile-ladder/rung-symbolic-check/REPORT.md` sections 1, 3 and 5; `reviews/batch-28-review.md`, section 1.

History blocks of the range:

- Written by the gather: 2026-11-17 21:31Z · rewritten · from `explorations/compile-ladder/rung-kind-env-generic/REPORT.md`, "What changed and why" · by climb batch 33 gather: row 812 fixed by rung V; its skeptic named the sentence (cites [S6])

## F-282, changed

- Size: at the base 2601 characters; at the landing 2801 characters; now 2801 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-282 **The compiled export check matches an api's members by name and header and reads `abstract`, and the `FortressLibrary` component matches its api.** It matches an api member with a component member of the same name and header, a field by its name, its modifiers other than `var` and its type, and an object's value parameter by its modifiers other than `var` and its type, not by its name (row 839; `compiler_tests/ExportVarObjectParameter`). It asks the component to declare each api member written `abstract`, at its header, with a body or without one, and an abstract getter also by a field of its name and type that is neither `hidden` nor `private` (F-297); it compares the component's abstract members against the api's. `FortressLibrary.fsi` states its component's members at the component's headers. That covers the 66 members written `abstract` (`String`'s nine among them), the follow-on lines, `Array2`'s subscripts, `TotalComparison`'s `=`, `RR64`'s `^`, `Condition` with `ZeroIndexed` and its range subscript, `Maybe`'s header, `Just`'s `SQCAP` and `SQCUP`, `ActualReduction`'s distributes, and `BigReduction`'s and `Comprehension`'s parameters. It leaves out the subscripts the component never built (`Just`'s and `Nothing`'s 1.0 range subscripts, the arrays' `OpenRange` subscripts). Where the api's type is the contract, the component takes it: `RR64`'s brackets and `truncate` at `ZZ64`, `DelegatedIndexed`'s `generator`, and `Array2`'s and `Array3`'s `bounds` and `zeroIndices`. `String`'s api writes `abstract` on the members its component's trait leaves without a body or does not declare, and its `excludes` clause is the component's (F-286). So among the members the export check reads, it finds no difference, and the distance holds no export error; it reads every top-level operator under its declared name (F-287). That zero holds with every api member counted. Gated by `compiler_tests/XXXExportMemberName`, `XXXExportFieldName`, `ExportVarFieldMatchesField`, `ExportComprisesEllipsisAbstract`, `ExportAbstractMemberDefined`, `XXXExportAbstractMemberAbsent`, `XXXExportAbstractMemberOtherHeader`, `ExportAbstractMemberBodyless` and `ExportAbstractGetterField`, and by the distance stage's per-site list. Walk's values of the moved members are gated by `ProjectFortress/tests/ExportAlignedMembersWalk.fss`. Detail: `compile-ladder/rung-export-align/REPORT.md` sections 1, 5 and 6; `compile-ladder/rung-export-last/REPORT.md` sections 1 and 2; `compile-ladder/rung-string-members/REPORT.md` section 5; `compile-ladder/rung-abstract-declared/REPORT.md` sections 1 and 5.

Now:

- F-282 **The compiled export check matches an api's members by name and header and reads `abstract`, and the `FortressLibrary` component matches its api.** It matches an api member with a component member of the same name and header, a field by its name, its modifiers other than `var` and its type, and an object's value parameter by its modifiers other than `var` and its type, not by its name (row 839; `compiler_tests/ExportVarObjectParameter`). It matches a top-level variable by its type, its modifiers other than `var`, and its mutability, which `var` or `:=` gives (`ExportChecker.scala:232-236`; `compiler_tests/TopLevelVarByAssignExport`). It asks the component to declare each api member written `abstract`, at its header, with a body or without one, and an abstract getter also by a field of its name and type that is neither `hidden` nor `private` (F-297); it compares the component's abstract members against the api's. `FortressLibrary.fsi` states its component's members at the component's headers. That covers the 66 members written `abstract` (`String`'s nine among them), the follow-on lines, `Array2`'s subscripts, `TotalComparison`'s `=`, `RR64`'s `^`, `Condition` with `ZeroIndexed` and its range subscript, `Maybe`'s header, `Just`'s `SQCAP` and `SQCUP`, `ActualReduction`'s distributes, and `BigReduction`'s and `Comprehension`'s parameters. It leaves out the subscripts the component never built (`Just`'s and `Nothing`'s 1.0 range subscripts, the arrays' `OpenRange` subscripts). Where the api's type is the contract, the component takes it: `RR64`'s brackets and `truncate` at `ZZ64`, `DelegatedIndexed`'s `generator`, and `Array2`'s and `Array3`'s `bounds` and `zeroIndices`. `String`'s api writes `abstract` on the members its component's trait leaves without a body or does not declare, and its `excludes` clause is the component's (F-286). So among the members the export check reads, it finds no difference, and the distance holds no export error; it reads every top-level operator under its declared name (F-287). That zero holds with every api member counted. Gated by `compiler_tests/XXXExportMemberName`, `XXXExportFieldName`, `ExportVarFieldMatchesField`, `ExportComprisesEllipsisAbstract`, `ExportAbstractMemberDefined`, `XXXExportAbstractMemberAbsent`, `XXXExportAbstractMemberOtherHeader`, `ExportAbstractMemberBodyless` and `ExportAbstractGetterField`, and by the distance stage's per-site list. Walk's values of the moved members are gated by `ProjectFortress/tests/ExportAlignedMembersWalk.fss`. Detail: `compile-ladder/rung-export-align/REPORT.md` sections 1, 5 and 6; `compile-ladder/rung-export-last/REPORT.md` sections 1 and 2; `compile-ladder/rung-string-members/REPORT.md` section 5; `compile-ladder/rung-abstract-declared/REPORT.md` sections 1 and 5.

History blocks of the range:

- Written by the gather: 2026-11-17 21:38Z · rewritten · from `explorations/compile-ladder/rung-checker-small-gaps/REPORT.md`, "What changed and why" · by climb batch 33 gather: rung C's record: rows 1005, 1029, 1060 and 1028 repaired in the checker (cites [S10])

## F-283, changed

- Size: at the base 989 characters; at the landing 989 characters; now 989 characters, over 600.
- Section now: "The harness and the gate".

At the base:

- F-283 **The 52 programs of the team's `DemoTests` reach their end under walk.** Run one at a time from `ProjectFortress/demos`, each exits 0 and prints no "fail", within a 600 s limit and on an empty input, with `wordcount2` run from the tree's root and `tennisRanking` given the three files of `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:809-818`. The demos run in no suite, so a batch that changes walk or its library runs them again (P-79). `Generator2Demo` draws its arrays by `random`, so a product of them can overflow in `PROD`, and one such `IntegerOverflow` stop in a run is not a regression (row 986). The compiled checker still refuses `trips.fss` (row 817). No gated test: the command is the driver in `compile-ladder/rung-team-demos/REPORT.md` section 13, and its output on the code that `4445d848b` committed is 'demos: 52 run, 52 reached their end'. Detail: the same report, section 3; `compile-ladder/climb-batch-27/REPAIR-review.md`, section 2.

Now:

- F-283 **The 52 programs of the team's `DemoTests` reach their end under walk.** Run one at a time from `ProjectFortress/demos`, each exits 0 and prints no "fail", within a 600 s limit and on an empty input, with `wordcount2` run from the tree's root and `tennisRanking` given the three files of `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:810-819`. The demos run in no suite, so a batch that changes walk or its library runs them again (P-79). `Generator2Demo` draws its arrays by `random`, so a product of them can overflow in `PROD`, and one such `IntegerOverflow` stop in a run is not a regression (row 986). The compiled checker still refuses `trips.fss` (row 817). No gated test: the command is the driver in `compile-ladder/rung-team-demos/REPORT.md` section 13, and its output on the code that `4445d848b` committed is 'demos: 52 run, 52 reached their end'. Detail: the same report, section 3; `compile-ladder/climb-batch-27/REPAIR-review.md`, section 2.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

## F-287, changed

- Size: at the base 1204 characters; at the landing 1204 characters; now 1204 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-287 **The export check reads every top-level operator of an api under its declared name, and the 157 top-level operator declarations of the twelve apis match their components.** It admits a name by `isCheckedName`, and only a key under which a declared function is filed by its own name, so the span key that the index also files each function under is never read (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:275`, `:597-606`). The 9 that differed are stated once on both sides, by the library's rule: the component's `#` and `:` at the api's `CompactFullRange` types, the api's `BIG ||` and `BIG |||` generic, and `List`'s api at its component's comprehension type. A narrower return type in the component is refused at the api's header, which the text accepts (row 834). Like a named function, an operator of an api is not satisfied by a functional method of the component (row 835), nor by a declaration whose static parameters the component names otherwise (row 836). Gated by `compiler_tests/XXXExportOperatorHeader`, `ExportOperatorMatch` and the distance stage's per-site list. Detail: `compile-ladder/rung-export-operators/REPORT.md` sections 1, 2 and 5.3.

Now:

- F-287 **The export check reads every top-level operator of an api under its declared name, and the 157 top-level operator declarations of the twelve apis match their components.** It admits a name by `isCheckedName`, and only a key under which a declared function is filed by its own name, so the span key that the index also files each function under is never read (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:278`, `:600-609`). The 9 that differed are stated once on both sides, by the library's rule: the component's `#` and `:` at the api's `CompactFullRange` types, the api's `BIG ||` and `BIG |||` generic, and `List`'s api at its component's comprehension type. A narrower return type in the component is refused at the api's header, which the text accepts (row 834). Like a named function, an operator of an api is not satisfied by a functional method of the component (row 835), nor by a declaration whose static parameters the component names otherwise (row 836). Gated by `compiler_tests/XXXExportOperatorHeader`, `ExportOperatorMatch` and the distance stage's per-site list. Detail: `compile-ladder/rung-export-operators/REPORT.md` sections 1, 2 and 5.3.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

## F-289, changed

- Size: at the base 601 characters; at the landing 601 characters; now 601 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-289 **The distance stage runs under the compile command's own setting, the bound `Any`, and gives 0.** `run.sh`'s default setting `compile` takes the extends-`Object` switch from `Shell.useCompilerLibraries()`'s first line at each run (`tools/distance/DistanceMulti.java:79-92`), and that line turns it off (`Shell.java:372`). With the switch on, the twelve gave 685 errors, 580 of them on the bound `Object`, on climb batch 22's code. Test: the stage's own run, '### order=check setting=compile (extendsObject=false ...)', '#total 0'. Detail: `compile-ladder/rung-bound-any/REPORT.md`, section 6.

Now:

- F-289 **The distance stage runs under the compile command's own setting, the bound `Any`, and gives 0.** `run.sh`'s default setting `compile` takes the extends-`Object` switch from `Shell.useCompilerLibraries()`'s first line at each run (`tools/distance/DistanceMulti.java:79-92`), and that line turns it off (`Shell.java:378`). With the switch on, the twelve gave 685 errors, 580 of them on the bound `Object`, on climb batch 22's code. Test: the stage's own run, '### order=check setting=compile (extendsObject=false ...)', '#total 0'. Detail: `compile-ladder/rung-bound-any/REPORT.md`, section 6.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

## F-291, changed

- Size: at the base 1322 characters; at the landing 1322 characters; now 1322 characters, over 600.
- Section now: "Execution model".

At the base:

- F-291 **With the bound `Any`, the compiled path compiles, loads and runs generics at tuple and arrow static arguments as it does with `extends Any` written; `()` fails whatever the bound (row 339), and so does a generic operator whose one parameter has the type parameter's type, applied to a tuple (row 1056).** Measured once: generic functions, objects and traits, dispatch to a generic arm and `typecase`, at a pair or an arrow, with the static argument written or inferred. The class loader made the same classes by name, and the program jars read the same under `javap`, as the same programs with `extends Any` written under the compile command's bound `Object`. So the switch to the bound `Any` costs the run time no work for these shapes; its test cost is F-292. A generic dotted method with one tuple-typed parameter runs (row 832, fixed since). Not run: the one library's own instantiations at tuples, tuples of three or more and nested ones, generic functional methods at a tuple, a native that receives a tuple. With `extends Object` written, they are refused, or pass unchecked where the static argument is written (row 470); the compile command's bound is `Any` (`Shell.java:372`). No gated test. Detail: `perf-probes/bound-any-compiled/REPORT.md`, "The shapes by setting" and "What the class loader makes".

Now:

- F-291 **With the bound `Any`, the compiled path compiles, loads and runs generics at tuple and arrow static arguments as it does with `extends Any` written; `()` fails whatever the bound (row 339), and so does a generic operator whose one parameter has the type parameter's type, applied to a tuple (row 1056).** Measured once: generic functions, objects and traits, dispatch to a generic arm and `typecase`, at a pair or an arrow, with the static argument written or inferred. The class loader made the same classes by name, and the program jars read the same under `javap`, as the same programs with `extends Any` written under the compile command's bound `Object`. So the switch to the bound `Any` costs the run time no work for these shapes; its test cost is F-292. A generic dotted method with one tuple-typed parameter runs (row 832, fixed since). Not run: the one library's own instantiations at tuples, tuples of three or more and nested ones, generic functional methods at a tuple, a native that receives a tuple. With `extends Object` written, they are refused, or pass unchecked where the static argument is written (row 470); the compile command's bound is `Any` (`Shell.java:378`). No gated test. Detail: `perf-probes/bound-any-compiled/REPORT.md`, "The shapes by setting" and "What the class loader makes".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

Report sections that the entry cites: [S11] `perf-probes/bound-any-compiled/REPORT.md`, "The shapes by setting".

## F-293, changed

- Size: at the base 590 characters; at the landing 661 characters; now 661 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-293 **`CompilerSystem` is a fourth file of the compiler's library, outside its prelude, and compiled tests import it by name.** `Library/CompilerSystem.fsi` and `.fss` are the compiled path's own `System` api (`args`, `getProperty`). No program imports it by default: the compiled path's default imports are the prelude's three files and `AnyType` (`WellKnownNames.useCompilerLibraries`). 27 programs of `compiler_tests/` and one of `other_compiler_tests/` import it. P-37 names only the prelude's three files. Read in the tree. Detail: `reviews/phase3-exit/zero-audit.md`, "A.2 Scope".

Now:

- F-293 **`CompilerSystem` is a fourth file of the compiler's library, outside its prelude, and compiled tests import it by name.** `Library/CompilerSystem.fsi` and `.fss` are the compiled path's own `System` api (`args`, `getProperty`). No program imports it by default: the compiled path's default imports are the prelude's three files and `AnyType` (`WellKnownNames.useCompilerLibraries`), and the one library's where `FORTRESS_LIBRARY=one` selects it (F-381). 27 programs of `compiler_tests/` and one of `other_compiler_tests/` import it. P-37 names only the prelude's three files. Read in the tree. Detail: `reviews/phase3-exit/zero-audit.md`, "A.2 Scope".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: under rung S's selection the default imports are the one library's (Shell.java:377-388)

Report sections that the entry cites: [S12] `reviews/phase3-exit/zero-audit.md`, "A.2 Scope".

## F-296, changed

- Size: at the base 1151 characters; at the landing 1151 characters; now 1151 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-296 **`fortress compile` bounds a type parameter declared without a bound by `Any`, as walk does.** `Shell.useCompilerLibraries()` turns the extends-`Object` pre-desugaring off (`ProjectFortress/src/com/sun/fortress/Shell.java:372`), so the twelve commands of `Shell.java:402-460` that call it, `compile`, `link`, `build`, `typecheck`, `api`, `compare`, `parse`, `unparse`, `disambiguate`, `desugar`, `grammar` and `test-coercion`, read an empty `extends` clause as `Any` (P-42). Tuple and arrow static arguments compile. The distance stage's default setting, `compile`, reads that line at each run and gives 0, `#crash none` (F-289). The No Duplicates Rule now refuses `g[\T\](a: T)` beside `g(a: Any)` on the compile command too (row 759). Until the switch-over, a generic that concatenates such a value onto a `String`, or prints it, bounds it by `Object`, for the prelude's `||`, `print` and `println` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:37`, `:55`, `:61`). Row 339 is reached and stays open; row 832 is fixed since. Test: `compiler_tests/ImplicitBoundAny`. Detail: `compile-ladder/rung-bound-any/REPORT.md`, sections 5 and 6.

Now:

- F-296 **`fortress compile` bounds a type parameter declared without a bound by `Any`, as walk does.** `Shell.useCompilerLibraries()` turns the extends-`Object` pre-desugaring off (`ProjectFortress/src/com/sun/fortress/Shell.java:378`), so the twelve commands of `Shell.java:411-469` that call it, `compile`, `link`, `build`, `typecheck`, `api`, `compare`, `parse`, `unparse`, `disambiguate`, `desugar`, `grammar` and `test-coercion`, read an empty `extends` clause as `Any` (P-42). Tuple and arrow static arguments compile. The distance stage's default setting, `compile`, reads that line at each run and gives 0, `#crash none` (F-289). The No Duplicates Rule now refuses `g[\T\](a: T)` beside `g(a: Any)` on the compile command too (row 759). Until the switch-over, a generic that concatenates such a value onto a `String`, or prints it, bounds it by `Object`, for the prelude's `||`, `print` and `println` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:37`, `:55`, `:61`). Row 339 is reached and stays open; row 832 is fixed since. Test: `compiler_tests/ImplicitBoundAny`. Detail: `compile-ladder/rung-bound-any/REPORT.md`, sections 5 and 6.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

## F-297, changed

- Size: at the base 1680 characters; at the landing 1680 characters; now 1680 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-297 **The compiled export check asks the component to declare each member its api writes `abstract`, at the api's header, with a body or without one, and the `FortressLibrary` component declares them all.** `equalListMembers` counts every api member (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:828`) and matches an abstract one through `equalAbstractMember`, `equalFnHeaders(..., true)` (`:860-872`), the team's 2009 comparison; a component that leaves one out is refused 'missing members of the trait/object in the component', one at another header 'different method'. An abstract getter is also matched by a component field of its name and type that is neither `hidden` nor `private` (`:864-870`), since a trait's field declaration declares its abstract getter (`Specification/basic/traits.tex:722-723`); an api's field met by a component's getter stays refused (row 842). The 12 members the component's traits lacked (`String`'s `depth`, `isBalanced`, `verify`, `rangeContains`, `splitWithOffsets`, `split`, `balanced`; `Range`'s `isEmpty`; `ReadableArray`'s `opr[_:TrivialOpenRange]`; `ActualReduction`'s `empty` and `join`; `AnyMaybe`'s `holds`) are declared bodyless; the compiler's prelude declares its 85. Walk compares no component with its apis (row 841). Gated by `compiler_tests/XXXExportAbstractMemberAbsent`, `XXXExportAbstractMemberOtherHeader`, `ExportAbstractMemberBodyless`, `ExportAbstractMemberDefined` and `ExportAbstractGetterField`, and by the distance stage's per-site list. Detail: `compile-ladder/rung-abstract-declared/REPORT.md`, sections 1, 3 and 5; `compile-ladder/rung-abstract-declared/JUDGE.md`, section 1.

Now:

- F-297 **The compiled export check asks the component to declare each member its api writes `abstract`, at the api's header, with a body or without one, and the `FortressLibrary` component declares them all.** `equalListMembers` counts every api member (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:831`) and matches an abstract one through `equalAbstractMember`, `equalFnHeaders(..., true)` (`:863-875`), the team's 2009 comparison; a component that leaves one out is refused 'missing members of the trait/object in the component', one at another header 'different method'. An abstract getter is also matched by a component field of its name and type that is neither `hidden` nor `private` (`:867-873`), since a trait's field declaration declares its abstract getter (`Specification/basic/traits.tex:722-723`); an api's field met by a component's getter stays refused (row 842). The 12 members the component's traits lacked (`String`'s `depth`, `isBalanced`, `verify`, `rangeContains`, `splitWithOffsets`, `split`, `balanced`; `Range`'s `isEmpty`; `ReadableArray`'s `opr[_:TrivialOpenRange]`; `ActualReduction`'s `empty` and `join`; `AnyMaybe`'s `holds`) are declared bodyless; the compiler's prelude declares its 85. Walk compares no component with its apis (row 841). Gated by `compiler_tests/XXXExportAbstractMemberAbsent`, `XXXExportAbstractMemberOtherHeader`, `ExportAbstractMemberBodyless`, `ExportAbstractMemberDefined` and `ExportAbstractGetterField`, and by the distance stage's per-site list. Detail: `compile-ladder/rung-abstract-declared/REPORT.md`, sections 1, 3 and 5; `compile-ladder/rung-abstract-declared/JUDGE.md`, section 1.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

## F-302, changed

- Size: at the base 1318 characters; at the landing 1318 characters; now 1318 characters, over 600.
- Section now: "Execution model".

At the base:

- F-302 **In those loops C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default, and a temporary box whose constructor chain passes the limit is no longer removed.** At JDK 25's default `MaxInlineLevel=15` a frame at depth d inlines when d is at most 16. The prelude's `+` reaches `Object.<init>` under its result's box at depth 12, a top-level binding at 10. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration, since its temporaries' chains no longer inlined. So an operator called from more than 4 further inlined frames keeps its temporary boxes. By reading, the one library's `ZZ32` springboard chain is two classes longer than the prelude's, `ZZ32`, `AnyIntegral`, `Number`, `AnyAdditiveGroup`, `Object`, `Any` (`Library/FortressLibrary.fss:846`, `:742`, `:381`, `:357`) against `ZZ32`, `Number`, `Object`, `Any` (`LibraryBuiltin/CompilerBuiltin.fsi:210`), since a springboard extends the springboard of its trait's first `extends` entry (`compiler/codegen/CodeGen.java:5728-5735`). If `FZZ32` extends the one library's springboard after the switch-over, the margin is 2 frames; not measured, since nothing compiles against the one library yet. Observed once (F-301). Detail: `perf-probes/helper-calls/REPORT.md` sections 3 and 4.

Now:

- F-302 **In those loops C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default, and a temporary box whose constructor chain passes the limit is no longer removed.** At JDK 25's default `MaxInlineLevel=15` a frame at depth d inlines when d is at most 16. The prelude's `+` reaches `Object.<init>` under its result's box at depth 12, a top-level binding at 10. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration, since its temporaries' chains no longer inlined. So an operator called from more than 4 further inlined frames keeps its temporary boxes. By reading, the one library's `ZZ32` springboard chain is two classes longer than the prelude's, `ZZ32`, `AnyIntegral`, `Number`, `AnyAdditiveGroup`, `Object`, `Any` (`Library/FortressLibrary.fss:846`, `:742`, `:381`, `:357`) against `ZZ32`, `Number`, `Object`, `Any` (`LibraryBuiltin/CompilerBuiltin.fsi:210`), since a springboard extends the springboard of its trait's first `extends` entry (`compiler/codegen/CodeGen.java:5892-5899`). If `FZZ32` extends the one library's springboard after the switch-over, the margin is 2 frames; not measured, since nothing compiles against the one library yet. Observed once (F-301). Detail: `perf-probes/helper-calls/REPORT.md` sections 3 and 4.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

## F-315, changed

- Size: at the base 1210 characters; at the landing 1210 characters; now 1210 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`.** An exception of a listed type that no catch clause took is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor, and the `finally` clause does not run (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:3311-3313`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it. `Bottom`, `Self` or an abbreviated type as that static argument, a tuple that holds `Any` (row 889), and the `override` modifier (row 650) are still refused. The library's `test stringifyChars` stops next at a varargs call (row 624). F-34 gives what the code generator still refuses in the library. Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`; for row 890, `XXXFinallyOnEscape.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.

Now:

- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`.** An exception of a listed type that no catch clause took is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor, and the `finally` clause does not run (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:3352-3354`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it. `Bottom`, `Self` or an abbreviated type as that static argument, a tuple that holds `Any` (row 889), and the `override` modifier (row 650) are still refused. The library's `test stringifyChars` stops next at a varargs call (row 624). F-34 gives what the code generator still refuses in the library. Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`; for row 890, `XXXFinallyOnEscape.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

Report sections that the entry cites: [S13] `reviews/batch-25-review.md`, "Where the text, the brief or the principles split".

## F-318, changed

- Size: at the base 2076 characters; at the landing 2086 characters; now 2086 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-318 **Under walk, the load check reads an own generic beside a functional method of a generic trait on their declared domains, `self` of a self-typed trait read as `C[\X\] & X` in the exclusion test.** It builds P-157 and P-152. Where the parameter-by-parameter check refuses an own generic function beside a functional method of a generic trait that declares no static parameters of its own, walk reads the pair as two own generics (`genericPairValid`), the trait's static parameters standing for the method's own; in `domainsExcludeTogether`'s meet, the self parameter of a trait self-typed directly (its parameter `X` bounded by the trait at `X`, no `comprises` clause or one that lists only `...`) excludes a type where the trait's instance or `X` does (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `validOnDeclaredDomains`, `traitMethodPairValid`, `selfTypeParameter`). So a program's generic operators between an array of a number type and a number, beside a self-typed additive group's own, load and run as on the compiled path, and with `Number`'s `comprises` clause removed, in a scratch copy before F-324 removed it from the library, walk loads and runs `BooleanOps`, `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary` and `extendNumber`. A trait self-typed through another self-typed trait, and a method with static parameters of its own, are not read so and keep the refusal. Walk applies no extender rule of P-146, so an object that extends a self-typed trait at a type it is not a subtype of now loads and runs one of two fitting declarations (row 893); the checker refuses a generic function more specific than such a method that walk loads (row 894). Gated by `tests/ExclusionVectorScalarWalk`, `ExclusionArrayScalarLibraryShapeWalk`, `GenericBesideTraitMethodInsideWalk` and `GenericInsideTraitMethodWalk` (load and dispatch), and the refusals `ExclusionVectorScalarOverlapWalk` and `GenericInsideTraitMethodReturnRuleWalk`. Detail: `compile-ladder/rung-walk-vector-scalar/REPORT.md` sections 1, 2 and 4.

Now:

- F-318 **Under walk, the load check reads an own generic beside a functional method of a generic trait on their declared domains, `self` of a self-typed trait read as `C[\X\] & X` in the exclusion test.** It builds P-157 and P-152. Where the parameter-by-parameter check refuses an own generic function beside a functional method of a generic trait that declares no static parameters of its own, walk reads the pair as two own generics (`genericPairValid`), the trait's static parameters standing for the method's own; in `domainsExcludeTogether`'s meet, the self parameter of a trait self-typed directly (its parameter `X` bounded by the trait at `X`, no `comprises` clause or one that lists only `...`) excludes a type where the trait's instance or `X` does (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `validOnDeclaredDomains`, `traitMethodPairValid`, `selfTypeParameter`). So a program's generic operators between an array of a number type and a number, beside a self-typed additive group's own, load and run as on the compiled path, and with `Number`'s `comprises` clause removed, in a scratch copy before F-324 removed it from the library, walk loads and runs `BooleanOps`, `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary` and `extendNumber`. A trait self-typed through another self-typed trait, and a method with static parameters of its own, are not read so and keep the refusal (row 999). Walk applies no extender rule of P-146, so an object that extends a self-typed trait at a type it is not a subtype of now loads and runs one of two fitting declarations (row 893); the checker refuses a generic function more specific than such a method that walk loads (row 894). Gated by `tests/ExclusionVectorScalarWalk`, `ExclusionArrayScalarLibraryShapeWalk`, `GenericBesideTraitMethodInsideWalk` and `GenericInsideTraitMethodWalk` (load and dispatch), and the refusals `ExclusionVectorScalarOverlapWalk` and `GenericInsideTraitMethodReturnRuleWalk`. Detail: `compile-ladder/rung-walk-vector-scalar/REPORT.md` sections 1, 2 and 4.

History blocks of the range:

- Written by coordinator's record writer (Opus): 2026-11-17 17:58Z · rewritten · from `explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md`, "10. Decisions" · by coordinator's record writer (Opus): the two cases that keep walk's refusal, a trait self-typed through another self-typed trait and a functional method with static parameters of its own, are row 999's; pointer added (cites [S14])

## F-351, changed

- Size: at the base 1768 characters; at the landing 1768 characters; now 1768 characters, over 600.
- Section now: "Execution model".

At the base:

- F-351 **A compiled transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names.** A compiled `atomic` block's transaction records no read of its own write; it records a read of an ancestor's write with that write, a read of the committed value with that value, and a read of an empty array element with a mark. Validation, at a read once the global lock has moved and at a commit that did not get the lock at its snapshot, covers the transaction and every ancestor. An abort names the transaction whose read failed; `abort()` names none. The block's handler takes every exception (`BaseTask.leaveTransaction`): it ends the block's transaction, starts the block again for an abort that names that transaction or names none (or any abort at the outermost block), and throws everything else on, after a nested transaction has handed its reads to its parent. A nested commit hands its parent its reads and its writes, also where it wrote nothing. The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first. Open: a nested block sees a plain write by another thread that runs its outer block (row 984). Source: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-367`, `runtimeSystem/BaseTask.java:293-314`,`compiler/codegen/CodeGen.java:2045-2077` (`forAtomicBlock`), `:2387-2391` (`forTry`). Tests: `compiler_tests/AtomicOwnWriteNestedCompiled`, `AtomicNestedSameBodyCompiled`, `NestedAtomicAbortCompiled`, `AtomicNestedViewCompiled`, `AtomicSharedReadsCompiled`, `AtomicThrowRevertsCompiled`, `AtomicNestedReadsKeptCompiled`, `NestedTryInnerCatch`; `ArrayStoreJUTest`. Detail: `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

Now:

- F-351 **A compiled transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names.** A compiled `atomic` block's transaction records no read of its own write; it records a read of an ancestor's write with that write, a read of the committed value with that value, and a read of an empty array element with a mark. Validation, at a read once the global lock has moved and at a commit that did not get the lock at its snapshot, covers the transaction and every ancestor. An abort names the transaction whose read failed; `abort()` names none. The block's handler takes every exception (`BaseTask.leaveTransaction`): it ends the block's transaction, starts the block again for an abort that names that transaction or names none (or any abort at the outermost block), and throws everything else on, after a nested transaction has handed its reads to its parent. A nested commit hands its parent its reads and its writes, also where it wrote nothing. The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first. Open: a nested block sees a plain write by another thread that runs its outer block (row 984). Source: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-367`, `runtimeSystem/BaseTask.java:293-314`,`compiler/codegen/CodeGen.java:2047-2079` (`forAtomicBlock`), `:2389-2393` (`forTry`). Tests: `compiler_tests/AtomicOwnWriteNestedCompiled`, `AtomicNestedSameBodyCompiled`, `NestedAtomicAbortCompiled`, `AtomicNestedViewCompiled`, `AtomicSharedReadsCompiled`, `AtomicThrowRevertsCompiled`, `AtomicNestedReadsKeptCompiled`, `NestedTryInnerCatch`; `ArrayStoreJUTest`. Detail: `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

Report sections that the entry cites: [S15] `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

## F-352, changed

- Size: at the base 2104 characters; at the landing 2160 characters; now 2160 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-352 **A compiled program has run against the interpreter's library only in a scratch tree with twelve marked hacks; on `main` the compile command selects the compiler's prelude alone.** In that tree, on `832f7d0d91`'s code, two lines of `Shell.useCompilerLibraries()` point the compiled path at the one library, and a one-line program then passes the checker and the code generator. Its run needs the library's fourteen components as bytecode, compiled by name in about 200 s. Three programs ran and printed walk's output: one that prints a line, one that builds and reads an `Array1`, and a dot product in the program's own loop over two `Array1`. Not run: an array of rank 2 or 3 (row 992, fixed since), the library's `DOT` and `SUM` (row 732, fixed since), and microGPT, which the checker stops (F-58). The runs met sixteen walls of two kinds. A test compiled against the prelude can show the first kind: the refusal of varargs (row 624), `label` (row 81), a closure class written twice (row 315), a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732; rows 81, 990, 991, 732 and 992 are fixed since, and rows 624 and 315 stand. Only a tree switched onto the one library shows the second kind: which run-time class carries each built-in type, a choice that reaches the code generator's naming (rows 874, 995 and 866); the trait table's search by the prelude's api names (row 942); the dispatch method's package (row 994); `NN32`'s two getters (row 993). Every run had the JVM's verifier off, so the number of emitted methods that the verifier refuses is not known. A program's check takes about a second under either library on warm caches, and 17 s against the one library on cold caches, one run each. Measured once; nothing landed, and no test holds it. Detail: `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met", "4. How far each program got" and "6. The walls grouped, against PLAN's phase 4 and phase 5 lines"; `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

Now:

- F-352 **A compiled program has run against the interpreter's library only in a scratch tree with twelve marked hacks; on `main` the compile command selects the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library (F-381).** In that tree, on `832f7d0d91`'s code, two lines of `Shell.useCompilerLibraries()` point the compiled path at the one library, and a one-line program then passes the checker and the code generator. Its run needs the library's fourteen components as bytecode, compiled by name in about 200 s. Three programs ran and printed walk's output: one that prints a line, one that builds and reads an `Array1`, and a dot product in the program's own loop over two `Array1`. Not run: an array of rank 2 or 3 (row 992, fixed since), the library's `DOT` and `SUM` (row 732, fixed since), and microGPT, which the checker stops (F-58). The runs met sixteen walls of two kinds. A test compiled against the prelude can show the first kind: the refusal of varargs (row 624), `label` (row 81), a closure class written twice (row 315), a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732; rows 81, 990, 991, 732 and 992 are fixed since, and rows 624 and 315 stand. Only a tree switched onto the one library shows the second kind: which run-time class carries each built-in type, a choice that reaches the code generator's naming (rows 874, 995 and 866); the trait table's search by the prelude's api names (row 942); the dispatch method's package (row 994); `NN32`'s two getters (row 993). Every run had the JVM's verifier off, so the number of emitted methods that the verifier refuses is not known. A program's check takes about a second under either library on warm caches, and 17 s against the one library on cold caches, one run each. Measured once; nothing landed, and no test holds it. Detail: `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met", "4. How far each program got" and "6. The walls grouped, against PLAN's phase 4 and phase 5 lines"; `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

History blocks of the range:

- Written by the gather: 2026-11-17 21:27Z · rewritten · from `explorations/compile-ladder/rung-library-selector/REPORT.md`, "Sentences of the specification made false" · by climb batch 33 gather: the selector landed with rung S (cites [S16])

Report sections that the entry cites: [S17] `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met"; [S18] `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

## F-353, changed

- Size: at the base 1577 characters; at the landing 1611 characters; now 1611 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-353 **One build can serve the compiled path with either library, shown in a scratch tree: the prelude's thirteen run-time value classes stay, and a second set under the same names, in a second class folder that the class path puts first, serves the one library.** The scratch tree is that of F-352 with its hacks, nine of them behind a selector that one environment variable sets at the compile and at the run. One JVM serves one library. There the one-line program runs against both libraries, and the `Array1` program and the dot loop against the one library, by hand and through `fortress junit`. A sample of 137 of the 876 files of `compiler_tests` shows no test that the second set disturbed; the whole compiled tracks and walk were not run. The second set's sources equal the first's under a map of eight names, since the classes differ only in the generated classes that they extend. The classes of the build that link against a prelude class by name are the thirteen, `FValue`, `MutableFValue`, `Utility`, `FException`, `FZZ32Vector` and `FStringVector`; every other mention of the prelude in the run time and the helpers is a string, 105 raise strings among them (read in the constant pools of `ProjectFortress/build`). In that build the one library's fourteen compiles took 204 s and the prelude's five 25 s, measured once on an idle machine. `main` has no selector and one set of classes. Nothing landed, and no test holds it. Detail: `compile-ladder/plan-31/probes/probe-y.md`, "1. What ran", "2. How the library is selected" and "5. What the second set costs".

Now:

- F-353 **One build can serve the compiled path with either library, shown in a scratch tree: the prelude's thirteen run-time value classes stay, and a second set under the same names, in a second class folder that the class path puts first, serves the one library.** The scratch tree is that of F-352 with its hacks, nine of them behind a selector that one environment variable sets at the compile and at the run. One JVM serves one library. There the one-line program runs against both libraries, and the `Array1` program and the dot loop against the one library, by hand and through `fortress junit`. A sample of 137 of the 876 files of `compiler_tests` shows no test that the second set disturbed; the whole compiled tracks and walk were not run. The second set's sources equal the first's under a map of eight names, since the classes differ only in the generated classes that they extend. The classes of the build that link against a prelude class by name are the thirteen, `FValue`, `MutableFValue`, `Utility`, `FException`, `FZZ32Vector` and `FStringVector`; every other mention of the prelude in the run time and the helpers is a string, 105 raise strings among them (read in the constant pools of `ProjectFortress/build`). In that build the one library's fourteen compiles took 204 s and the prelude's five 25 s, measured once on an idle machine. `main` has the selector (F-381), one set of run-time classes, and no second set. Nothing landed, and no test holds it. Detail: `compile-ladder/plan-31/probes/probe-y.md`, "1. What ran", "2. How the library is selected" and "5. What the second set costs".

History blocks of the range:

- Written by the gather: 2026-11-17 21:27Z · rewritten · from `explorations/compile-ladder/rung-library-selector/REPORT.md`, "Sentences of the specification made false" · by climb batch 33 gather: the selector landed with rung S (cites [S16])

Report sections that the entry cites: [S19] `compile-ladder/plan-31/probes/probe-y.md`, "1. What ran".

## F-361, changed

- Size: at the base 1476 characters; at the landing 1526 characters; now 1526 characters, over 600.
- Section now: "The library's arrays and algebra".

At the base:

- F-361 **With the five number traits merged with their objects in a scratch tree, the checker count and the distance stay 0, microGPT's quick checks pass, and walk's suite differs in one `XXX` test; on `832f7d0d91`'s code the merge widens three gaps, fixed since, to the five types.** The merge makes `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` value objects (F-379): 12 files, the library's text and 78 lines of walk's Java, with no checker or code-generator file and no model line. Of the 830 tests of `ant testSystem`, 829 pass, and `XXXGenericBesidePlainReturnParam` passes where a failure is expected (row 550), for a wrong reason: walk's load check loses a refusal for a generic beside a plain declaration at an object type (row 998). The other two gaps: a type parameter bounded by a value type through a trait's generic method (row 997, passed in the scratch tree by one line of walk), and the checker's refusal of a valid generic-beside-plain pair over an object domain (row 542, by reading). A `typecase` arm that names a removed object, such as `Int`, matches every value with no message (row 959). On `main` the five are value objects of the one library and walk (F-379), and rows 998, 997, 542 and 550 are fixed. Measured once on `832f7d0d91`, in a scratch tree that landed nothing; no test holds it; the compiled tests and `ant testFast` were not run. Detail: `compile-ladder/plan-31/probes/number-object-merge.md`, "Measurements" and "Obstacles, in the order met".

Now:

- F-361 **With the five number traits merged with their objects in a scratch tree, the checker count and the distance stay 0, microGPT's quick checks pass, and walk's suite differs in one `XXX` test; on `832f7d0d91`'s code the merge widens three gaps, fixed since, to the five types.** The merge makes `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` value objects (F-379): 12 files, the library's text and 78 lines of walk's Java, with no checker or code-generator file and no model line. Of the 830 tests of `ant testSystem`, 829 pass, and `XXXGenericBesidePlainReturnParam` passes where a failure is expected (row 550), for a wrong reason: walk's load check loses a refusal for a generic beside a plain declaration at an object type (row 998). The other two gaps: a type parameter bounded by a value type through a trait's generic method (row 997, passed in the scratch tree by one line of walk), and the checker's refusal of a valid generic-beside-plain pair over an object domain (row 542, by reading). On that code a `typecase` arm that names a removed object, such as `Int`, matches every value with no message (row 959). On `main` the five are value objects of the one library and walk (F-379), and rows 998, 997, 542, 550 and 959 are fixed: such an arm is refused (F-382). Measured once on `832f7d0d91`, in a scratch tree that landed nothing; no test holds it; the compiled tests and `ant testFast` were not run. Detail: `compile-ladder/plan-31/probes/number-object-merge.md`, "Measurements" and "Obstacles, in the order met".

History blocks of the range:

- Written by the gather: 2026-11-17 21:29Z · rewritten · from `explorations/compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "1. What changed and why" · by climb batch 33 gather: row 959 fixed by rung D; its skeptic left the sentence for the gather (cites [S20])

Report sections that the entry cites: [S21] `compile-ladder/plan-31/probes/number-object-merge.md`, "Measurements".

## F-363, changed

- Size: at the base 1798 characters; at the landing 1874 characters; now 1874 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-363 **A superscript follows a dotted access and a parenthesised call on both paths.** `p.wq^T`, `B.n^2`, `B.f()^T` and `B.data[5]^2` parse as the operator applied to the whole dotted primary to its left, and `(f(x))^T`, `(f(x))!` and `(a^b)!` run under walk as they do compiled; `f(x)^T` and `f(x)^2` stay a static error on both paths (walk: "the argument should not be immediately followed by a non-expression element"; the checker: "Item at this location must be an expression, not an operator."). The parser reads a primary with a dot as the front of the math items that follow it (`parser/Expression.rats:386-400`), so a subscript, a parenthesised item or a tight identifier after a dotted method call parses too, which no test asserts; the one node kind it builds for a single item is the one the parenthesised spelling built, so neither the checker nor the code generator changed. Walk's postfix branch evaluates an operand in parentheses as one expression (`interpreter/evaluator/Evaluator.java:965-970`). So a model line may write `p.wq^T x` and `(onehot(ks, 5))^T dx`; a selector after a superscript, `B.data^T.v`, is still a syntax error, and a superscript after a subscript that is a math item of its own, `x[5]^2` or `B.f()[5]^2`, still fails on both paths (row 1 under walk, row 1005 compiled); in `B.data[5]^2` the subscript is part of the dotted primary. Tests: `tests/SuperscriptAfterDottedAccess.fss`, `tests/SuperscriptAfterParenthesisedCall.fss`, `tests/SuperscriptAfterCallRefused.fss` with its `.test`, and `compiler_tests/SuperscriptAfterDottedAccessCompiled.test`, `SuperscriptAfterParenthesisedCallCompiled.test`, `XXXSuperscriptAfterCallRefusedCompiled.test`. Detail: `compile-ladder/rung-superscript-after/REPORT.md`, "Each form on the base and after" and "The trees".

Now:

- F-363 **A superscript follows a dotted access and a parenthesised call on both paths.** `p.wq^T`, `B.n^2`, `B.f()^T` and `B.data[5]^2` parse as the operator applied to the whole dotted primary to its left, and `(f(x))^T`, `(f(x))!` and `(a^b)!` run under walk as they do compiled; `f(x)^T` and `f(x)^2` stay a static error on both paths (walk: "the argument should not be immediately followed by a non-expression element"; the checker: "Item at this location must be an expression, not an operator."). The parser reads a primary with a dot as the front of the math items that follow it (`parser/Expression.rats:386-400`), so a subscript, a parenthesised item or a tight identifier after a dotted method call parses too, which no test asserts but `compiler_tests/SubscriptThenSuperscriptCompiled`, for the subscript, compiled (`Maker.f()[5]^2`); the one node kind it builds for a single item is the one the parenthesised spelling built, so neither the checker nor the code generator changed. Walk's postfix branch evaluates an operand in parentheses as one expression (`interpreter/evaluator/Evaluator.java:965-970`). So a model line may write `p.wq^T x` and `(onehot(ks, 5))^T dx`; a selector after a superscript, `B.data^T.v`, is still a syntax error, and a superscript after a subscript that is a math item of its own, `x[5]^2` or `B.f()[5]^2`, compiles and fails under walk (row 1); in `B.data[5]^2` the subscript is part of the dotted primary. Tests: `tests/SuperscriptAfterDottedAccess.fss`, `tests/SuperscriptAfterParenthesisedCall.fss`, `tests/SuperscriptAfterCallRefused.fss` with its `.test`, and `compiler_tests/SuperscriptAfterDottedAccessCompiled.test`, `SuperscriptAfterParenthesisedCallCompiled.test`, `XXXSuperscriptAfterCallRefusedCompiled.test`. Detail: `compile-ladder/rung-superscript-after/REPORT.md`, "Each form on the base and after" and "The trees".

History blocks of the range:

- Written by the gather: 2026-11-17 21:38Z · rewritten · from `explorations/compile-ladder/rung-checker-small-gaps/REPORT.md`, "What changed and why" · by climb batch 33 gather: rung C's record: rows 1005, 1029, 1060 and 1028 repaired in the checker (cites [S10])
- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: rung C's SubscriptThenSuperscriptCompiled asserts Maker.f()[5]^2, a subscript after a dotted method call

Report sections that the entry cites: [S22] `compile-ladder/rung-superscript-after/REPORT.md`, "Each form on the base and after".

## F-369, changed

- Size: at the base 1769 characters; at the landing 1869 characters; now 1869 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-369 **A top-level tuple binding compiles: each name is a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name.** The checker gives the tuple that it rebuilds from the checked elements their tuple type, from which each name's thunk reads its own (`scala_src/typechecker/impls/Decls.scala:272-277`); where only some names declare a type and the right side is no tuple expression of as many elements, it checks the right side again against each name's type (`Decls.scala:324-336`). The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>` and gives each name its own class, whose initializer takes its element out by the tuple's typed getter (`compiler/codegen/CodeGen.java:6776`); a wildcard binds nothing. Every compiled top-level variable is initialized at its first read, not at load as under walk, so a binding of wildcards alone never evaluates its right side (row 1011). So a model line of this form compiles as written, the model's lines 17 to 19 among them, and a name bound so is typed as a single binding's is: `explorations/run-c4/src/MicroGptFlat.fss:72`, `beta1 m`, is a new checker site against the one library (F-58). Under walk the same right side runs once for each name and once more (row 1026). A local tuple binding's declared name beside untyped names is still unchecked (row 1029), and a typed tuple binding over an `if` with tuple branches compiles (row 1031, fixed). Tests: `compiler_tests/TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test`, `XXXTopLevelTupleBindingType.test`. Detail: `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" and "The binding as compiled".

Now:

- F-369 **A top-level tuple binding compiles: each name is a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name.** The checker gives the tuple that it rebuilds from the checked elements their tuple type, from which each name's thunk reads its own (`scala_src/typechecker/impls/Decls.scala:272-277`); where only some names declare a type and the right side is no tuple expression of as many elements, it checks the right side again against each name's type (`Decls.scala:324-336`). The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>` and gives each name its own class, whose initializer takes its element out by the tuple's typed getter (`compiler/codegen/CodeGen.java:6825`); a wildcard binds nothing. Every compiled top-level variable is initialized at its first read, not at load as under walk, so a binding of wildcards alone never evaluates its right side (row 1011). So a model line of this form compiles as written, the model's lines 17 to 19 among them, and a name bound so is typed as a single binding's is: `explorations/run-c4/src/MicroGptFlat.fss:72`, `beta1 m`, is a new checker site against the one library (F-58). Under walk the same right side runs once for each name and once more (row 1026). A local tuple binding's declared name beside untyped names is checked in the same way (`Decls.scala:431-443`; `compiler_tests/LocalTupleBindingMixedTypes`, `LocalTupleBindingMixedRefused`), and a typed tuple binding over an `if` with tuple branches compiles (row 1031, fixed). Tests: `compiler_tests/TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test`, `XXXTopLevelTupleBindingType.test`. Detail: `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" and "The binding as compiled".

History blocks of the range:

- Written by the gather: 2026-11-17 21:38Z · rewritten · from `explorations/compile-ladder/rung-checker-small-gaps/REPORT.md`, "What changed and why" · by climb batch 33 gather: rung C's record: rows 1005, 1029, 1060 and 1028 repaired in the checker (cites [S10])
- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: the cited lines moved by the batch's hunks, re-anchored by content to main

Report sections that the entry cites: [S23] `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why".

## F-372, changed

- Size: at the base 2087 characters; at the landing 2110 characters; now 2110 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-372 **The code generator writes each inherited method once into a trait's or an object's class, runs the declaration of the lowest type that declares it, and forwards to a body that an imported api's trait holds.** For the class of a trait or an object the code generator leaves out each declaration whose method a type strictly below the declaring type declares again at the same parameter types, self apart. A dispatch method's gathering still compares declarations as schemas over each trait's own bounds, not at the instance. So the choice is a relation between two declarations, not the order of the gathered methods, and the library's shape of P-47, `MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below, does not stop a class at load (row 990, fixed). A method that an imported api's trait declares without `abstract` counts as a body in that trait's class, so a trait that is not first in an extends clause gives its body, plain, generic and functional methods alike (row 732, fixed). A worker chose both readings, and the curator has not decided them; by the traits chapter's text, an object that reaches one method along two paths, one through a trait that declares it again, inherits both declarations, and the checker refuses that form where the traits are self-typed and generic (row 1037). A functional method with self not first is written once, not again beside the dispatch method of the same name (row 571, fixed), so such a class loads; but an object's dispatch method still tests the receiver in place of the argument, and where the receiver itself has the own declaration's parameter type, a call answers wrongly with no error: with `object Pq extends { K, P }` declaring `mark(x: K, self)` beside `P`'s `mark(x: Any, self)`, `mark(1, Pq)` gives 3 where walk gives 1 (rows 1038 and 573). Tests: `compiler_tests/TraitOwnMethodBesideInheritedCompiled`, `ApiTraitMethodNotFirstCompiled`, `TraitMethodDiamondRedeclaredCompiled`, `FunctionalMethodMeetNarrowedSelfNotFirst`. Detail: `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".

Now:

- F-372 **The code generator writes each inherited method once into a trait's or an object's class, runs the declaration of the lowest type that declares it, and forwards to a body that an imported api's trait holds.** For the class of a trait or an object the code generator leaves out each declaration whose method a type strictly below the declaring type declares again at the same parameter types, self apart. A dispatch method's gathering still compares declarations as schemas over each trait's own bounds, not at the instance. So the choice is a relation between two declarations, not the order of the gathered methods, and the library's shape of P-47, `MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below, does not stop a class at load (row 990, fixed). A method that an imported api's trait declares without `abstract` counts as a body in that trait's class, so a trait that is not first in an extends clause gives its body, plain, generic and functional methods alike (row 732, fixed). The batch's planner chose both readings as defaults, and the curator has not decided them; by the traits chapter's text, an object that reaches one method along two paths, one through a trait that declares it again, inherits both declarations, and the checker refuses that form where the traits are self-typed and generic (row 1037). A functional method with self not first is written once, not again beside the dispatch method of the same name (row 571, fixed), so such a class loads; but an object's dispatch method still tests the receiver in place of the argument, and where the receiver itself has the own declaration's parameter type, a call answers wrongly with no error: with `object Pq extends { K, P }` declaring `mark(x: K, self)` beside `P`'s `mark(x: Any, self)`, `mark(1, Pq)` gives 3 where walk gives 1 (rows 1038 and 573). Tests: `compiler_tests/TraitOwnMethodBesideInheritedCompiled`, `ApiTraitMethodNotFirstCompiled`, `TraitMethodDiamondRedeclaredCompiled`, `FunctionalMethodMeetNarrowedSelfNotFirst`. Detail: `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by coordinator's record writer (Opus): 2026-11-17 17:58Z · rewritten · from `explorations/compile-ladder/climb-batch-31/record-landing/diff.md`, "For the coordinator" · from `explorations/coordinator/CLIMB-BATCH-31.md`, "Forks the batch takes" · from `explorations/reviews/batch-31-review.md`, "2. The decisions that landed at a default" · by coordinator's record writer (Opus): forks M1 and M2 were set by the batch's record, the planner's defaults taken at the go, and landed as the plan says (the review, M1); the choice stated as the planner's, not a worker's (cites [S24], [S25], [S26])

Report sections that the entry cites: [S27] `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".

## F-374, changed

- Size: at the base 1746 characters; at the landing 1770 characters; now 1770 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-374 **A compiled object's `var` field lives in a cell that the object holds, and an atomic expression is its body in an atomic block.** On the compiled path a `var` value parameter or `var` field of an object is a `MutableFValue` cell in a `public final` JVM field, made by the constructor; each read and write checks `BaseTask.inATransaction()` and goes through the transaction or the cell, by the code of a top-level `var`, and a loop body or a function expression in the object's method captures the cell. A worker chose the cell, and the curator has not decided it. So an `atomic` block tracks a `var` field (row 319, fixed), and every access of one pays the transaction check, outside `atomic` too (row 641). A field without `var` holds its value and has no check. `atomic e` is compiled by `CodeGen.forAtomicBlock` on the block that holds `e` (row 875, fixed), with the block's limits (row 322); a numeral as its value at a place of declared type is refused or fails verification, since the checker carries no declared type into it (row 1043). So a change of the transaction's variable code reaches fields with no second edit, and a new kind of nested context must capture a var field's cell as it does a top-level `var`'s. A `value` object with a `var` field, which the specification forbids and nothing refuses (row 112), is not strictly equivalent to another built alike: `V(1) === V(1)` is `false`, since `SEQV` compares the cells by identity. The one library declares one, `Lazy` (`Library/Lazy.fss:18`). Tests: `compiler_tests/AtomicFieldCompiled`, `compiler_tests/VarFieldCapturedCompiled`, `compiler_tests/AtomicExprCompiled`. Detail: `compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why" and "The bytecode".

Now:

- F-374 **A compiled object's `var` field lives in a cell that the object holds, and an atomic expression is its body in an atomic block.** On the compiled path a `var` value parameter or `var` field of an object is a `MutableFValue` cell in a `public final` JVM field, made by the constructor; each read and write checks `BaseTask.inATransaction()` and goes through the transaction or the cell, by the code of a top-level `var`, and a loop body or a function expression in the object's method captures the cell. The batch's planner chose the cell as a default, and the curator has not decided it. So an `atomic` block tracks a `var` field (row 319, fixed), and every access of one pays the transaction check, outside `atomic` too (row 641). A field without `var` holds its value and has no check. `atomic e` is compiled by `CodeGen.forAtomicBlock` on the block that holds `e` (row 875, fixed), with the block's limits (row 322); a numeral as its value at a place of declared type is refused or fails verification, since the checker carries no declared type into it (row 1043). So a change of the transaction's variable code reaches fields with no second edit, and a new kind of nested context must capture a var field's cell as it does a top-level `var`'s. A `value` object with a `var` field, which the specification forbids and nothing refuses (row 112), is not strictly equivalent to another built alike: `V(1) === V(1)` is `false`, since `SEQV` compares the cells by identity. The one library declares one, `Lazy` (`Library/Lazy.fss:18`). Tests: `compiler_tests/AtomicFieldCompiled`, `compiler_tests/VarFieldCapturedCompiled`, `compiler_tests/AtomicExprCompiled`. Detail: `compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why" and "The bytecode".

History blocks of the range:

- Written by coordinator's record writer (Opus): 2026-11-17 17:58Z · rewritten · from `explorations/compile-ladder/climb-batch-31/record-landing/diff.md`, "For the coordinator" · from `explorations/coordinator/CLIMB-BATCH-31.md`, "Forks the batch takes" · from `explorations/reviews/batch-31-review.md`, "2. The decisions that landed at a default" · by coordinator's record writer (Opus): fork A1 was set by the batch's record, the planner's default taken at the go, and landed as the plan says (the review, A1); the choice stated as the planner's, not a worker's (cites [S24], [S25], [S26])

Report sections that the entry cites: [S28] `compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why".

## F-375, changed

- Size: at the base 2139 characters; at the landing 2206 characters; now 2206 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-375 **Walk's load check reads a generic declaration beside a plain one over an object type by the Return Type Rule, and its check of value types passes a type parameter.** A plain declaration whose domain lies inside an own generic's declared domain is read on the declared domains even where the lists differ only at object types, which the team's shortcut takes to exclude: the pair loads where the plain result lies below the generic's by one of three readings that the report gives, and is refused, in the rule's name, where none of them holds (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed). A declaration that writes no return type is not judged there (row 1044), a `comprises` clause is not read (row 550's pair at `ZZ64`, fixed since `ZZ64` is an object, F-379), and two plain lists keep the team's shortcut (row 697). `FTraitOrObject.enforceValueness` refuses a declared type that is not a value type below a value type, and passes the symbolic type of a type parameter (row 997, fixed). The coordinator chose to read no `comprises` clause and to leave unjudged a declaration that writes no return type; a worker chose the three readings and the check of value types; the curator has decided none of them. With the five number types merged with their objects (P-178, F-379), every generic-beside-plain pair over them is read on its declared domains: walk's suite loads every pair that it loaded before, and none of its expected-failure tests moves between a refusal at load and a failure at run time. The reports run the pairs found to change, old against new. Tests: `ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.fss`, `GenericBesidePlainObjectValidWalk.fss`, `GenericBesidePlainEveryInstanceWalk.fss`, `TraitGenericMethodValueBoundWalk.fss`, `OverloadedGenericValueBoundWalk.fss`, `NonValueBelowValueTypeWalk.fss`. Detail: `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" and "Programs run old against new"; `compile-ladder/rung-number-objects/REPORT.md`, "Every pair that walk refuses at load after the change and loaded before" and "Programs run old against new".

Now:

- F-375 **Walk's load check reads a generic declaration beside a plain one over an object type by the Return Type Rule, and its check of value types passes a type parameter.** A plain declaration whose domain lies inside an own generic's declared domain is read on the declared domains even where the lists differ only at object types, which the team's shortcut takes to exclude: the pair loads where the plain result lies below the generic's by one of three readings that the report gives, and is refused, in the rule's name, where none of them holds (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed). A declaration that writes no return type is not judged there (row 1044), a `comprises` clause is not read (row 550's pair at `ZZ64`, fixed since `ZZ64` is an object, F-379), and two plain lists keep the team's shortcut (row 697). `FTraitOrObject.enforceValueness` refuses a declared type that is not a value type below a value type, and passes the symbolic type of a type parameter (row 997, fixed). The coordinator chose to read no `comprises` clause and to leave unjudged a declaration that writes no return type; the batch's planner chose the check of value types and the repair of both directions in one step, and a worker the three readings; the curator has decided none of them. With the five number types merged with their objects (P-178, F-379), every generic-beside-plain pair over them is read on its declared domains: walk's suite loads every pair that it loaded before, and none of its expected-failure tests moves between a refusal at load and a failure at run time. The reports run the pairs found to change, old against new. Tests: `ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.fss`, `GenericBesidePlainObjectValidWalk.fss`, `GenericBesidePlainEveryInstanceWalk.fss`, `TraitGenericMethodValueBoundWalk.fss`, `OverloadedGenericValueBoundWalk.fss`, `NonValueBelowValueTypeWalk.fss`. Detail: `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" and "Programs run old against new"; `compile-ladder/rung-number-objects/REPORT.md`, "Every pair that walk refuses at load after the change and loaded before" and "Programs run old against new".

History blocks of the range:

- Written by coordinator's record writer (Opus): 2026-11-17 17:58Z · rewritten · from `explorations/compile-ladder/climb-batch-31/record-landing/diff.md`, "For the coordinator" · from `explorations/coordinator/CLIMB-BATCH-31.md`, "Forks the batch takes" · from `explorations/compile-ladder/rung-walk-value-bound/REPORT.md`, "Decisions" · by coordinator's record writer (Opus): forks V1, the check of value types, and V2, both directions repaired in one step, were set by the batch's record, the planner's defaults taken at the go, and landed as the plan says (the review, V2); the three readings stay the worker's (the rung's decisions 2, 4 and 5) (cites [S24], [S25], [S29])

Report sections that the entry cites: [S30] `compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why"; [S31] `compile-ladder/rung-number-objects/REPORT.md`, "Every pair that walk refuses at load after the change and loaded before".

## F-377, changed

- Size: at the base 1928 characters; at the landing 2812 characters; now 2812 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-377 **The compiled code casts `self` where the checker reads it as a listed type or as the self-type parameter.** `CodeGen.castToTypeBelow` casts a value that has self's type (the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait, at the argument of a call with one argument, of a function, a method or a constructor (`evalArg`; a call with several arguments casts each already), at a typed binding and an assignment (`forExprsSerial`) and at a method's returned value (`generateActualMethodCode`), also where the value is a typecase whose arms each have self's type. So `den(self)` for `den(r: R)` in `trait Q comprises { R }` and `twin(self): S = self` in a self-typed trait verify and run (rows 991 and 695, fixed), as the one library's `QQ comprises { Ratio }` needs. Only `self` gets the reading: the checker refuses a variable declared at the trait where a listed type is expected. A closure's returned value and a conditional's arms get no cast (rows 1050 and 1051), and a trait that lists a type at a `where`-clause variable gets none (row 307). An assignment from outside an object to its `var` field, of a value whose static type is a strict subtype of the field's type, fails at run time, `NoSuchMethodError`, also for `c.r := self` at a listed type (row 1053). No cast is added where the value's type is a subtype of the declared type by `extends`. One is added at a declared trait type strictly below self's trait, where the verifier, which checks no interface type, needs none; a worker chose it, and the curator has not decided it. Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `compiler_tests/SelfTypeReturnSelfRun`, `compiler_tests/SelfTypeReturnSelfAtTraitRun`. Detail: `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why".

Now:

- F-377 **The compiled code casts `self` where the checker reads it as a listed type or as the self-type parameter.** `CodeGen.castToTypeBelow` casts a value that has self's type (the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait, at the argument of a call with one argument, of a function, a method or a constructor (`evalArg`; a call with several arguments casts each already), at a typed binding and an assignment (`forExprsSerial`), at a method's returned value (`generateActualMethodCode`), at each arm of a conditional at the conditional's type (`forIf`; a `case` expression is desugared into one), and at a function expression's and a local function's result (`forFnExpr`, `localFunctionClosure`), also where the value is a typecase whose arms each have self's type. So `den(self)` for `den(r: R)` in `trait Q comprises { R }`, `twin(self): S = self` and `mx(self, other: T): T = if lt(other, self) then self else other end` in a self-typed trait verify and run (rows 991, 695, 1050 and 1051, fixed), as the one library's `QQ comprises { Ratio }` and `StandardTotalOrder`'s `MIN`, `MAX` and `MINMAX` need. A conditional with no arm of self's type compiles as before; an arm that is `self` is cast at the conditional's own type, also where the conditional stands at the trait's type, which the verifier does not check (`atQ(c: Boolean): Q = if c then self else R(0, 0) end` gains `checkcast R`). Only `self` gets the reading: the checker refuses a variable declared at the trait where a listed type is expected. A typecase with `self` in one arm and another value in the other gets no cast (row 1070), and a trait that lists a type at a `where`-clause variable gets none (row 307). An assignment from outside an object to its `var` field, of a value whose static type is a strict subtype of the field's type, fails at run time, `NoSuchMethodError`, also for `c.r := self` at a listed type (row 1053). No cast is added where the value's type is a subtype of the declared type by `extends`. One is added at a declared trait type strictly below self's trait, where the verifier, which checks no interface type, needs none; a worker chose it, and the curator has not decided it. Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `compiler_tests/SelfTypeReturnSelfRun`, `compiler_tests/SelfTypeReturnSelfAtTraitRun`, `compiler_tests/SelfTypeArmRun`, `compiler_tests/ComprisesValueAtConditionalArmRun`, `compiler_tests/ComprisesValueFromClosureRun`, `compiler_tests/SelfTypeFromClosureRun`. Detail: `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why"; `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 21:34Z · rewritten · from `explorations/compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why" · by climb batch 33 gather: rows 1051 and 1050 fixed by rung Q; the record's text (cites [S8])

Report sections that the entry cites: [S32] `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why"; [S8] `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why".

## F-379, changed

- Size: at the base 1560 characters; at the landing 1602 characters; now 1602 characters, over 600.
- Section now: "The library's arrays and algebra".

At the base:

- F-379 **The one library and walk declare `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` each as one value object, and a program's object below one is refused at load.** P-178's one-library half holds: the objects are `Library/FortressLibrary.fss:384`, `:846`, `:951`, `:1063`, `:1170`, and walk builds their native values from the glue classes of the same names, such as `interpreter/glue/prim/ZZ32.java`, found by a table (`interpreter/evaluator/BuildEnvironments.java:459-470`). No `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong` is declared in the library or used by walk's Java; a typecase arm at one of those names takes every value (row 959). So `asif` at one of the five is the identity, and `object Mine extends ZZ32` is refused, 'Attempt to extend object type ZZ32'. Walk's load check reads pairs over the five as over objects: a valid generic-beside-plain pair at `ZZ64` loads (row 550, fixed), and so do two kinds of invalid pair: a plain declaration with no written return type beside a generic one (row 1044), and two plain lists whose more specific one returns a type not below the other's, against the Subtype Rule, such as `f(x: Number): ZZ32` beside `f(x: ZZ64): String` (row 697). With `NN32` and `RR32`, objects already, seven of the eight number types are objects, `QQ` the trait; the compiler's prelude keeps its open traits (row 1003). Tests: `tests/NumberTypesAreObjectsWalk.fss`, `tests/NumberTypeExtendRefusedWalk.fss`. Detail: `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" and "What a program sees differently".

Now:

- F-379 **The one library and walk declare `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` each as one value object, and a program's object below one is refused at load.** P-178's one-library half holds: the objects are `Library/FortressLibrary.fss:384`, `:846`, `:951`, `:1063`, `:1170`, and walk builds their native values from the glue classes of the same names, such as `interpreter/glue/prim/ZZ32.java`, found by a table (`interpreter/evaluator/BuildEnvironments.java:459-470`). No `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong` is declared in the library or used by walk's Java; a typecase arm at one of those names is refused on both paths, 'Int is undefined.' (row 959, fixed; F-382). So `asif` at one of the five is the identity, and `object Mine extends ZZ32` is refused, 'Attempt to extend object type ZZ32'. Walk's load check reads pairs over the five as over objects: a valid generic-beside-plain pair at `ZZ64` loads (row 550, fixed), and so do two kinds of invalid pair: a plain declaration with no written return type beside a generic one (row 1044), and two plain lists whose more specific one returns a type not below the other's, against the Subtype Rule, such as `f(x: Number): ZZ32` beside `f(x: ZZ64): String` (row 697). With `NN32` and `RR32`, objects already, seven of the eight number types are objects, `QQ` the trait; the compiler's prelude keeps its open traits (row 1003). Tests: `tests/NumberTypesAreObjectsWalk.fss`, `tests/NumberTypeExtendRefusedWalk.fss`. Detail: `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" and "What a program sees differently".

History blocks of the range:

- Written by the gather: 2026-11-17 21:29Z · rewritten · from `explorations/compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "1. What changed and why" · by climb batch 33 gather: row 959 fixed by rung D; its skeptic left the sentence for the gather (cites [S20])

Report sections that the entry cites: [S33] `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why".

## F-380, changed

- Size: at the base 1125 characters; at the landing 1339 characters; now 1339 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-380 **A numeral at the end of a block, or in a tuple, converts where it stands on the compiled path.** At a declared type (a return type, a typed binding, a parameter, an `if`'s other branch) the compiled checker converts a numeral that ends a block after a local declaration, and each numeral element of a tuple, by the type's own coercion of the numeral itself, so the code generator folds it into a constant; such a numeral outside the type's range is refused statically, as at a block's end without a declaration. At a place that fixes no type, a block after a local declaration keeps its numeral's own type, and a later conversion of a variable bound to that block dies (row 1060). Tests: `compiler_tests/NumeralEndsBlockAfterDeclarationCompiled`, `BlockEndsInTupleOfNumeralCompiled`, `TupleBindingIfBranchesCompiled`, `NumeralJoinBeyondRange.fss` with `XXXNumeralJoinBeyondRange.test`; `XXXNumeralEndsUntypedBlockCompiled`. Detail: `compile-ladder/rung-numeral-block-end/REPORT.md`, "What changed and why", which names the checker's members; `compile-ladder/rung-numeral-block-end/SKEPTIC.md`, "Findings and fixes".

Now:

- F-380 **A numeral at the end of a block, or in a tuple, converts where it stands on the compiled path.** At a declared type (a return type, a typed binding, a parameter, an `if`'s other branch) the compiled checker converts a numeral that ends a block after a local declaration, and each numeral element of a tuple, by the type's own coercion of the numeral itself, so the code generator folds it into a constant; such a numeral outside the type's range is refused statically, as at a block's end without a declaration. At a place that fixes no type, a numeral that ends a block after a local declaration or a local function takes its default, a tuple's elements theirs (`Functionals.scala:1290-1294`, `:1332-1333`); a `try` that ends in numerals keeps a numeral type and is refused (row 1074), and a `case` or a `try` whose branches are numeral tuples, at an untyped tuple binding, is refused (row 1075). Tests: `compiler_tests/NumeralEndsBlockAfterDeclarationCompiled`, `BlockEndsInTupleOfNumeralCompiled`, `TupleBindingIfBranchesCompiled`, `NumeralJoinBeyondRange.fss` with `XXXNumeralJoinBeyondRange.test`; `NumeralEndsUntypedBlockCompiled`. Detail: `compile-ladder/rung-numeral-block-end/REPORT.md`, "What changed and why", which names the checker's members; `compile-ladder/rung-numeral-block-end/SKEPTIC.md`, "Findings and fixes".

History blocks of the range:

- Written by the gather: 2026-11-17 21:38Z · rewritten · from `explorations/compile-ladder/rung-checker-small-gaps/REPORT.md`, "What changed and why" · by climb batch 33 gather: rung C's record: rows 1005, 1029, 1060 and 1028 repaired in the checker (cites [S10])

Report sections that the entry cites: [S34] `compile-ladder/rung-numeral-block-end/REPORT.md`, "What changed and why"; [S35] `compile-ladder/rung-numeral-block-end/SKEPTIC.md`, "Findings and fixes".

## F-381, added

- Size: at the base none; at the landing 1034 characters; now 1034 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-381 **The compile command reads the one library where `FORTRESS_LIBRARY=one` (or `-Dfortress.library=one`) selects it, keeps its caches in `default_repository/caches-one`, and its tests run in `testFast`'s onelibrary track.** The selection is read once per JVM (`ProjectProperties.compiledPathUsesOneLibrary`, which `WellKnownNames.compiledPathUsesOneLibrary` gives to the compiler); `Shell.useCompilerLibraries()` follows it, and the two class path scripts follow the variable only. Unset, every command reads the prelude as before. A program compiled under it does not run yet, since the one library has no jars (F-34; row 1062). Test: `ProjectFortress/one_library_tests/OneLibraryHalf.test` and `OneLibraryPrintBig.test`, which fail without the selector ('QQ is undefined.', 'Variable big is not defined.'), and `XXXOneLibraryRunHalf.test`, run by `ant testOneLibrary` and by `ant testFast`. Detail: `compile-ladder/rung-library-selector/REPORT.md`, "What changed and why" and "Wrong pairings, and the run under the selection".

History blocks of the range:

- Written by the gather: 2026-11-17 21:27Z · added · from `explorations/compile-ladder/rung-library-selector/REPORT.md`, "What changed and why" · from `explorations/compile-ladder/rung-library-selector/REPORT.md`, "Wrong pairings, and the run under the selection" · by climb batch 33 gather (cites [S36], [S37])
- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: OneLibraryPrintBig fails without the selector with 'Variable big is not defined.' (rung S's REPORT.md, the base's runs)

Report sections that the entry cites: [S36] `compile-ladder/rung-library-selector/REPORT.md`, "What changed and why".

## F-382, added

- Size: at the base none; at the landing 1136 characters; now 1136 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-382 **A `typecase` arm whose name names no type is refused when names are bound, on both paths: 'X is undefined.'; an arm at a type parameter in scope tests against its static argument, and only an element of a tuple of names still binds.** The disambiguator, which both paths run, resolves a clause's type as every other type: the bare arm `Id =>`, and a name in an arrow type or static argument inside the arm, that binds no type variable in scope and no declared type is a static error at the name (`compiler/disambiguator/TypeDisambiguator.java`, `forTypecaseClause` and `handleTypeName`). A binder over every value is written `x: Any =>`. An element of a tuple of names, as `(x, y) =>`, is the team's binding form and binds (row 1064). Tests: `tests/TypecaseUndefinedArmWalk.fss`, `compiler_tests/XXXTypecaseUndefinedArmCompiled.test`, `tests/TypecaseUndefinedNameInArmTypeWalk.fss`, `compiler_tests/XXXTypecaseUndefinedNameInArmTypeCompiled.test`, `tests/TypecaseTypeParamArmWalk.fss`, `compiler_tests/TypecaseTypeParamArmCompiled.test`. Detail: `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 21:29Z · added · from `explorations/compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "1. What changed and why" · by climb batch 33 gather (cites [S20])

Report sections that the entry cites: [S20] `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "1. What changed and why".

## F-383, added

- Size: at the base none; at the landing 526 characters; now 526 characters.
- Section now: "The harness and the gate".

Now:

- F-383 **Walk's harness counts a static error of the phases as a refusal at load, so a `.test` with `load_` keys names a refusal of the disambiguator as one of walk's load check.** `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java`, `InterpreterTest.thrownAtLoad`. Test: `tests/TypecaseUndefinedArmWalk.test`. A compiled refusal test is still `XXX`-named: a plain-named compile test is red whenever the compile reports errors. Detail: `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "10. Decisions".

History blocks of the range:

- Written by the gather: 2026-11-17 21:29Z · added · from `explorations/compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "10. Decisions" · by climb batch 33 gather (cites [S38])

Report sections that the entry cites: [S38] `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "10. Decisions".

## F-384, added

- Size: at the base none; at the landing 1487 characters; now 1487 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-384 **The code generator's kind environment holds the static parameters in scope where it reads a declaration's types, and a `typecase` clause's tuple-pattern names are bound on the compiled path.** A type's inherited methods are read with the type's static parameters and `where` clause (`compiler/codegen/CodeGen.java:498-502`); a generic function's or method's body is compiled with its own (`:2749-2756`); `forTypecase` binds each name of a clause's tuple pattern to its element (`:2578-2610`). So a generic trait's member under a `where`-clause `comprises`, a call of it in a generic body, and a `typecase` of the one library's `app` form whose arms call no method on a name typed by an intersection compile and run (rows 812, 822 and 1066); since row 540's repair such a call compiles (F-386), and no test calls one on a tuple pattern's name, the form of `app`'s arms 2 and 3. On rung V's own code F-34's measure finds no refusal at the kind environment (15 refused in 5 kinds; `ArrayList` and `APPCOV` emitted; `app` and `__bigOperator2` at row 540, repaired since); it is not taken on the merged tree. A clause's name bound at a trait above its selector's object type fails verification at a method call on it (row 1067). Tests: `compiler_tests/ComprisesWhereMemberCompiled.test`, `TypecaseGenericArmsCompiled.test`, `TypecaseTupleNamesCompiled.test`. Detail: `compile-ladder/rung-kind-env-generic/REPORT.md`, "What changed and why" and "The one library's four declarations".

History blocks of the range:

- Written by the gather: 2026-11-17 21:31Z · added · from `explorations/compile-ladder/rung-kind-env-generic/REPORT.md`, "What changed and why" · from `explorations/compile-ladder/rung-kind-env-generic/REPORT.md`, "The one library's four declarations" · by climb batch 33 gather (cites [S6], [S39])
- Written by the merged-diff review: 2026-11-17 22:28Z · rewritten · by the merged-diff review of climb batch 33: climb batch 33's merged-diff review: row 540 is fixed on the merged tree by rung I (F-386); no test calls a method on a tuple pattern's name typed by an intersection

Report sections that the entry cites: [S6] `compile-ladder/rung-kind-env-generic/REPORT.md`, "What changed and why".

## F-385, added

- Size: at the base none; at the landing 868 characters; now 868 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-385 **The class loader chooses a compiled call's opcode from the owner's class file, without loading the owner.** Where an instantiated template calls a method by `invokeinterface` on a type that becomes a plain class name, `MethodInstantiater.visitMethodInsn` reads `ACC_INTERFACE` from the class file that the loader would define for that name, and uses `invokevirtual` for a class; it loads the class only where it finds no class file. So an object that lists a self-typed trait first, whose JVM superclass is that trait's default methods at the object, runs a default body that calls a method on a value of the self-type parameter (row 1052, fixed). Source: `runtimeSystem/MethodInstantiater.java:268-272`, `:304`. Test: `compiler_tests/SelfTypeParameterReceiverRun`. Detail: `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why", item 3.

History blocks of the range:

- Written by the gather: 2026-11-17 21:34Z · added · from `explorations/compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why" · by climb batch 33 gather (cites [S8])

Report sections that the entry cites: [S8] `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why".

## F-386, added

- Size: at the base none; at the landing 1163 characters; now 1163 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-386 **A dotted call on a value whose static type is an intersection that none of its conjuncts lies below compiles as a call on the conjunct that has the declaration the checker chose.** Such a type comes from a call typed by the intersection of its candidates' return types (P-60) and from a `typecase` binder whose arm's type neither lies below nor above the selector's. The code generator casts the receiver to that conjunct, the most specific where several qualify, else the first in the intersection's order; the value's own method runs, as under walk. A getter, whose call has no arrow, goes to a conjunct whose method of its name takes no argument; a method overloaded across the conjuncts and a generic method compile too. On the one library this emits `__filter` (`Library/FortressLibrary.fss:1489`). The checker refuses a method of a type parameter's bound on such a value where a conjunct is the parameter (row 1072). Tests: `compiler_tests/CoverageReturnMethodCall.test`, `compiler_tests/TypecaseBinderMethodCall.test`. Detail: `compile-ladder/rung-intersection-receiver/REPORT.md`, "1. What changed and why" and "5. Programs run old against new".

History blocks of the range:

- Written by the gather: 2026-11-17 21:36Z · added · from `explorations/compile-ladder/rung-intersection-receiver/REPORT.md`, "1. What changed and why" · from `explorations/compile-ladder/rung-intersection-receiver/REPORT.md`, "5. Programs run old against new" · by climb batch 33 gather (cites [S2], [S40])

Report sections that the entry cites: [S2] `compile-ladder/rung-intersection-receiver/REPORT.md`, "1. What changed and why".

## F-387, added

- Size: at the base none; at the landing 762 characters; now 762 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-387 **The compiled path compiles a primary whose math items all apply in turn to its front: `x[5]^2` is `(x[5])^2` and `g[1][2]` is `(g[1])[2]`; and a subscript as a math item before a tightly juxtaposed item: `x[5]k` is `(x[5]) k`.** The checker checks the one application that the reassociation leaves, at the expected type, and writes each subscript as a call of the subscript operator's method, as the desugaring before it writes every other subscript (`scala_src/typechecker/impls/Operators.scala:313-321`, `:360-362`). Walk still fails on these forms (row 1), so a program for both paths writes `(x[5])^2`. Test: `compiler_tests/SubscriptThenSuperscriptCompiled.test`. Detail: `compile-ladder/rung-checker-small-gaps/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-17 21:38Z · added · from `explorations/compile-ladder/rung-checker-small-gaps/REPORT.md`, "What changed and why" · by climb batch 33 gather (cites [S10])

Report sections that the entry cites: [S10] `compile-ladder/rung-checker-small-gaps/REPORT.md`, "What changed and why".

## P-166, changed

- Size: at the base 1122 characters; at the landing 1147 characters; now 1147 characters, over 600.
- Section now: "Numbers".

At the base:

- P-166 **`ZZ`'s and `QQ`'s values are value objects, and the specification's list of reference objects stops naming arbitrary-precision numbers.** The library declares `value object ZZ` (`Library/FortressLibrary.fss:1170`), so every `ZZ` value is a value object, and `QQ`'s object `Ratio` (`Library/FortressLibrary.fss:719`) is a `value object` too. By the specification's rule two value objects of one type are strictly equivalent when their fields are, so two `ZZ` values built apart are `SEQV` when their integers are equal, `SEQV` converting each into its bits and comparing those, and two equal rationals built apart are `SEQV` in the same way. The specification's list in `Specification/basic/objects.tex` ("Reference objects include arbitrary-precision numbers") is revised to name them among the value objects, in the revision form (P-96) with one Appendix I entry. Why: the library's `value` declaration is the deliberate word, and where it is, the curator's rule brings the specification's example in line with the code. Detail: `reviews/any-carrier-2026-11-06.md`, section 2.4, point 11, which found the split.

Now:

- P-166 **`ZZ`'s and `QQ`'s values are value objects, and the specification's list of reference objects stops naming arbitrary-precision numbers.** Since the merge of P-178 the library declares `value object ZZ` (`Library/FortressLibrary.fss:1170`), so every `ZZ` value is a value object, and `QQ`'s object `Ratio` (`Library/FortressLibrary.fss:719`) is a `value object` too. By the specification's rule two value objects of one type are strictly equivalent when their fields are, so two `ZZ` values built apart are `SEQV` when their integers are equal, `SEQV` converting each into its bits and comparing those, and two equal rationals built apart are `SEQV` in the same way. The specification's list in `Specification/basic/objects.tex` ("Reference objects include arbitrary-precision numbers") is revised to name them among the value objects, in the revision form (P-96) with one Appendix I entry. Why: the library's `value` declaration is the deliberate word, and where it is, the curator's rule brings the specification's example in line with the code. Detail: `reviews/any-carrier-2026-11-06.md`, section 2.4, point 11, which found the split.

History blocks of the range:

- Written by coordinator's record writer (Opus): 2026-11-17 17:58Z · rewritten · from `explorations/reviews/batch-31b-review.md`, "Corrections owed in the record" · by coordinator's record writer (Opus): the curator's rule of 2026-10-31 for a sentence that the tree made false: the review's correction, that the ground of every ZZ value being a value object is now the merge (P-178), since the team's value object BigNum is gone; the landing repointed the declaration and left its ground; the Why kept word for word, the landing's question to him on it standing (cites [S41])

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

## [S2] explorations/compile-ladder/rung-intersection-receiver/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-intersection-receiver/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-intersection-receiver/REPORT.md:11-24, 2823 bytes, cut at 2500.

~~~~
## 1. What changed and why

`CodeGen.forMethodInvocation` took the receiver's static type, narrowed an intersection to its lowest conjunct where the conjuncts nest (`sanitizePossibleStupidIntersectionType`, `CodeGen.java:7420` on the base), and otherwise kept the intersection and cast it to `NamedType` (`:7323`) or, for a generic method, to `TraitType` (`:7270`, and again in `emitFindGenericMethodClosure`, `:7497`). The checker types a call whose argument stands between two closed traits by the intersection of its candidates' return types (P-60), and a `typecase` binder whose arm's type neither lies below nor above the selector's type by the intersection of the two, so every method call on such a value crashed the compile.

The edit, all in `CodeGen.java` (`git diff 1609258002b0 -- ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, 73 lines added, none removed):

- `forMethodInvocation` (`:7215-7221`): where the sanitized receiver type is still an `IntersectionType`, it is replaced by its owner, `intersectionMethodOwner`, and that trait is kept as `receiverCast`.
- After the receiver is evaluated, in the generic branch (`:7297`) and the plain branch (`:7323`), `castReceiver(receiverCast)` casts it to the owner. Everything after reads the owner as the receiver's type: the opcode and the class of `methodCall`, the closure's receiver type of a generic method, the tuple boxing test.
- `intersectionMethodOwner` (`:7461-7504`): the trait-type conjuncts, nested intersections opened (`traitConjuncts`, `:7506-7513`), the same conjuncts the checker searches (`traitTypesCallable`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Common.scala:90-104`). A conjunct qualifies if it declares or inherits a method of the call's name (`methodsNamed`), and, where the call's arrow carries a `MethodInfo`, one whose declaring trait is the trait that the arrow names (`sameTraitName`, `:7524-7529`); where it carries none, as a getter's call, one that takes the call's argument by its number of parameters (`takesArgumentOf`, `:7515-7522`, the skeptic's fix `e9718fa115`, SKEPTIC.md). Of the qualifying conjuncts, the one below all the others; else the first.
- `castReceiver` (`:7531-7535`): `generalizedCastTo` to the class that `methodCall` names (`NamingCzar.jvmTypeDesc(owner, thisApi(), false)`, as at `:629`), a `CHECKCAST` for a trait or object.

The checker is not touched: its typing stays (P-60, fork I1).

Commits on `wip/rung-intersection-recei
~~~~

## [S3] Specification/advanced/overloading.tex, "The Meet Rule for Functions"

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

## [S4] tests-writing.md, "How `XXX` works"

`facts-extract.sh 'doc:tests-writing.md#How `XXX` works'`

Does not resolve: facts-extract: part 1 of 1. Its 1 part prints 338 bytes, about 200 tokens.
Asked for, and where it is:
  doc:tests-writing.md#How `XXX` works                       NOT FOUND: no such file: tests-writing.md
Not found (1): doc:tests-writing.md#How `XXX` works -> no such file: tests-writing.md

facts-e

## [S5] explorations/compile-ladder/rung-intersection-receiver/REPORT.md, "7. Sentences of the specification made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-intersection-receiver/REPORT.md#7. Sentences of the specification made false'`

explorations/compile-ladder/rung-intersection-receiver/REPORT.md:119-123, 535 bytes.

~~~~
## 7. Sentences of the specification made false

- `Specification/appendices/changes.tex:3740-3747`, the Effect of "The Meet Rule for traits with comprises clauses": "The compiled type checker departs from this in four ways: ...; its code generator stops at a method call on a value of such a type (row~540); ...". The clause is false now; the sentence then names three ways. The skeptic corrected it on the branch (SKEPTIC.md); it is `:3740-3746` now.

None other: `grep -rn '540' Specification --include=*.tex` finds only this place.
~~~~

## [S6] explorations/compile-ladder/rung-kind-env-generic/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-kind-env-generic/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-kind-env-generic/REPORT.md:9-17, 3708 bytes, cut at 2500.

~~~~
## What changed and why

Three edits of `CodeGen.java`, at commit `18d5b51578` (tests first in `33f3e89713`):

1. **The constructor** (`CodeGen.java:498-502`). For each type of the component, the code generator reads the methods that the type inherits, to find the functional methods it must emit for it (`STypesUtil.properlyInheritedMethodsNotIdenticallyCovered`). It read them with the component's analyzer, whose kind environment holds no static parameter. Where a supertype's `comprises` clause lists a type at a `where`-clause variable, the subtype test that compares two inherited methods' owners opens that variable and compares it with the type's own parameter (`TypeAnalyzer.pSubInner`, `scala_src/types/TypeAnalyzer.scala:208` and `:225`, through `:281` and `:298`), and the lookup of that parameter stops: `TypeAnalyzer.scala:1102`. The edit reads them with the type's static parameters and `where` clause in the kind environment. This is row 812's site (`P812b`, below: 'Y is not in the kind env', `Y` the object `Ci`'s own parameter).
2. **A generic function's or generic method's body** (`GenericMethodBodyMakerFnDecl.generateGenericMethodBody`, `CodeGen.java:2749-2756`). The template's body was compiled by a `CodeGen` whose analyzer held only the enclosing trait's or object's parameters, never the function's own. The edit compiles it in a nested `CodeGen` whose analyzer holds the declaration's static parameters and `where` clause; for a generic method the declaration is `convertGenericMethodToClosureDecl`'s, whose parameters are the receiver's parameter, the method's own and the trait's (`CodeGen.java:2890-2893`). Behind the constructor's wall stood this one: a dotted call, in a generic body, of a member of a type below a `where`-clause `comprises`, at a type that names the function's parameter, stops in `methodsNamed` (`CodeGen.java:7077`), from `callTakesTupleBoxed` (`P812g`, below), the path that F-34 names behind `ArrayList` (`genericMethodTakesOneParameter` reaches `methodsNamed` too).
3. **`forTypecase`** (`CodeGen.java:2541-2546`, new members `namesTupleElements` and `bindElementsAndGenerateClauseBody` at `:2578-2610`). The code generator bound a clause's own name (`x: T =>`, row 351's repair) but left unbound the names of a clause's tuple pattern, `(a': T, b': U) =>`. A read of such a name fell to `forVarRef`'s fresh-import path, which treats the name as a top-level variable and normalizes its type (`CodeGen.java:6941`): in a generic function, where t
~~~~

## [S7] .claude/skills/fortress-repo/references/compiler.md, "What the compiled path cannot compile yet"

`facts-extract.sh 'doc:.claude/skills/fortress-repo/references/compiler.md#What the compiled path cannot compile yet'`

.claude/skills/fortress-repo/references/compiler.md:36-60, 3237 bytes, cut at 2500.

~~~~
## What the compiled path cannot compile yet

For a construct that it cannot compile yet, the code generator calls `sayWhat` or throws another `CompilerError`. Such a call or throw is a code-generator wall. The code generator has no case for these constructs:

- `spawn`;
- an object expression;
- an array literal, such as `[1 2 3]`.

It compiles a local function as a closure, also one that calls itself or another local function of its block. It refuses these forms (ledger row 304):

- a local function with static parameters of its own: 'Can't compile a local function with static parameters of its own yet';
- two local functions of one name in a block: 'Can't compile overloaded local functions yet';
- a local function with the `atomic` modifier: 'Can't compile a local function with this modifier yet'.

A type assumption `e asif T` has the value of `e`, but the call around it chooses its declaration as if `e` were a `T`, a supertype of `e`'s type (`Specification/basic/expressions/type-annotation.tex`). The code generator compiles one at a dotted call's receiver, at a call of a functional method or an overloaded function whose every argument is an assumption, and elsewhere as the value of `e`. It refuses these forms (ledger row 818):

- a call of a functional method or an overloaded function with an assumption at some of its arguments but not all: 'Can't compile a dispatched call whose arguments are not all type assumptions';
- a generic method on an assumed receiver: 'Can't compile a type assumption at the receiver of a generic method yet';
- a call of an overloaded generic function with an assumption at an argument: 'Can't compile a type assumption at a call of an overloaded generic function yet'.

It also refuses a function or method with a contract (`requires`, `ensures`, `invariant`). It compiles a declaration whose own header or `extends` entry has a `where` clause, and emits nothing for the clause. A call of a function or method whose own clause introduces a `where`-clause variable, as `where [\nat n\]` does, links, but dies at run time with `NoClassDefFoundError` (ledger row 867). `compiler_tests/XXXWhereVariableCallCompiled.test` records it: copy its form for such a call. The disambiguator, which both paths run, drops a trait's or object's contract, so the code generator never sees one, and walk does not check one either (ledger row 781). It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private`, `abstract` and `t
~~~~

## [S8] explorations/compile-ladder/rung-self-arm-closure/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-self-arm-closure/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-self-arm-closure/REPORT.md:11-58, 6104 bytes, cut at 2500.

~~~~
## 1. What changed and why

The checker reads `self` in a trait whose `comprises` clause lists types as also a value of the listed type (P-60), and in a trait with a self-type parameter `X` as `T ∩ X` (P-146). Rung K made the code generator cast such a `self` at a call's single argument, a typed binding, an assignment and a method's returned value. Three shapes were left, and each failed when its class loaded:

1. **A conditional's arms (row 1051).** `forIf` emitted each arm and joined them with no cast. One arm left the trait's interface on the stack and the other the listed type's or the parameter's class; the verifier merges them to `Object`, and the `areturn` at the declared type fails: 'VerifyError: Bad return type'. `castToTypeBelow` at the method's return read the conditional's type, which the checker gives as the winning arm's type (`scala_src/typechecker/impls/Misc.scala:529-583`), `R` or `T`, not self's, and emitted nothing. Now `forIf` takes the conditional's type (`CodeGen.java:4535`) and calls `castToTypeBelow` on each arm after its code (`:4558` for each `if` and `elif` clause, `:4568` for the `else`). A `case` expression is desugared into a conditional, so its clauses are cast too (a base failure, now passing; section 5).
2. **A closure's result (row 1050).** `forFnExpr` and the closure of a local function returned the body's value with no cast. Now each calls `castToTypeBelow(body, rt)` on the declared return type after the body (`CodeGen.java:3968` in `forFnExpr`, `:4127` in `localFunctionClosure`).
3. **The circular load (row 1052).** An object that lists a trait with a self-type parameter first extends, as its JVM superclass, that trait's default-method class at itself: `public final class …$Pt extends …$\=Shape?…%Pt?$DefaultTraitMethods implements …$\=Shape?…%Pt?` (javap of the test's jar). Defining `Pt` makes the JVM load that superclass, which the loader expands from its template (`InstantiatingClassloader.readAndExpandGenericThing`). In `tagOf(other: S) = other.tag` the template calls `tag` by `invokeinterface` on `S`; with `S` at `Pt`, `MethodInstantiater.visitMethodInsn` called `Class.forName("…$Pt", true, icl)` to learn whether `Pt` is an interface and so choose the opcode, while `Pt` was being defined: 'ClassCircularityError'. Now it reads that answer from the access flags of the class file that the loader would define for the name, through the loader's own resource lookup and ASM's `ClassReader.getAccess()`, and lo
~~~~

## [S9] explorations/compile-ladder/rung-codegen-walls/REPORT.md, "1. What changed, and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-walls/REPORT.md#1. What changed, and why'`

explorations/compile-ladder/rung-codegen-walls/REPORT.md:9-18, 3508 bytes, cut at 2500.

~~~~
## 1. What changed, and why

Three changes in `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, and one helper that the second needs, nothing else of the original tree:

- `generateTypeReference`, its `AnyType` branch (base `:5795-5796`, now `:5845-5851`): it was empty and fell through to the throw 'Only handling some static args of generic types in extends clause' (base `:5802`). It now calls `generateTypeReference` with Any's own name, `NodeFactory.makeId(span, WellKnownNames.anyTypeLibrary(), WellKnownNames.anyTypeName)`, and no static arguments, and continues, as the `TraitType` branch does for a trait (`:5835-5837`). For a name without static arguments the method emits `GETSTATIC <its RTTI class>.ONLY` (`:5759-5767`), here `fortress/AnyType$Any$RTTIc.ONLY`, the field that the bootstrap class declares (`ProjectFortress/src/fortress/AnyType.java`, `RTTIc.ONLY`). The `BottomType`, `SelfType` and `AbbreviatedType` branches stay empty, each still ending in the throw (`:5833-5834`, `:5843-5844`, `:5852-5853`, throw `:5857`).
- `forTry` (base `:2019-2073`, now `:2019-2087`): the throw 'NYI: Forbid clauses are not yet implemented' (base `:2029-2030`) is gone. After the catch clauses, which are unchanged, each type of the forbid clause is tested in turn, as a catch clause tests its type (`DUP`, `FException.getValue`, `InstantiatingClassloader.generalizedInstanceOf`, `IFEQ`); on a match the exception's value is passed to `throwForbiddenException`. The rethrow (`ATHROW`) and the label `done` move out of the `if (catchClauses.isSome())` block (`:2041`, `:2078-2081`) and are emitted when the try has a catch clause or a forbid clause, so a try with neither emits what it emitted before.
- `throwForbiddenException` (new, `:2089-2122`): with the exception's value on the stack, it finds `ForbiddenException`'s constructor in the api index of `WellKnownNames.fortressLibrary()` (the component's own index when it is that library), takes its parameter type and its result, casts the value to the parameter's class, calls the constructor's static method through `idToPackageClassAndName` and `NamingCzar.jvmMethodDesc`, as a source call of `ForbiddenException(e)` is emitted, wraps the result in an `FException` as `forThrow` does (`NEW`, `DUP_X1`, `SWAP`, `INVOKESPECIAL`) and throws it. The api's own types are named unqualified in its index, so the descriptor is made with the library's api as the default: with the program's api the first run asked for `ForbidC
~~~~

## [S10] explorations/compile-ladder/rung-checker-small-gaps/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-checker-small-gaps/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-checker-small-gaps/REPORT.md:11-20, 4087 bytes, cut at 2500.

~~~~
## What changed and why

Four gaps of the compiled checker, repaired in the order the brief gives, each test first.

1. **Row 1060, a block's numeral at an untyped binding** (commit 9df73b2d1b). The checker's default for a numeral at a place that fixes no type (`defaultNumeral`, `Functionals.scala:1259`) finds the numerals in a join's result positions through `joinNumerals`, and a tuple of them through `tupleJoin`. Neither had a case for a local declaration or a local function, whose body holds the rest of the block, so `x = do k: ZZ32 = 3; 4 end` left `x` a `NaturalNumeral[\1,10,4\]`, and `y: ZZ32 = x` died at run time. `joinNumerals` now reads a `LetExpr`'s body (`Functionals.scala:1332-1333`), and `tupleJoin` a `LocalVarDecl`'s and a `LetFn`'s (`:1290-1294`), as `numeralResult` (`:1317`) and `joinInto` (`:1373-1376`) do since row 1014's repair. The precedent's file has four members that walk a join's result positions; it repaired two, and this rung the other two.
2. **Row 1005, a subscript followed by a superscript** (commit d7ec58bdf3). The parser builds a `MathPrimary` of two or more math items for `x[5]^2`, and the checker reassociates it (`Operators.scala`, `checkExprOperators`, case `SMathPrimary`). Where every item applied in turn to the front, the reassociation left one application and no element after it; the checker then tried a juxtaposition of that one element, which no declaration takes, and returned the application unchecked, so the compile stopped: 'Result of typechecking still contains intermediate nodes.' The checker now checks that one application at the expected type (`Operators.scala:360-362`). With that, the code generator stopped on the subscript: 'Should not be a subscriptExpr here in codegen!' (`compiler/codegen/CodeGen.java:5729`), because the desugaring before the checker writes every subscript expression as a call of the subscript operator's method (`AssignmentAndSubscriptDesugarer.scala:75-80`) and the reassociation wrote a subscript expression. The reassociation now writes the call as the desugarer does (`Operators.scala:313-321`). The same repair compiles a subscript after a subscript, `g[1][2]`, which stopped the compile with the same message on the base (probe below), and `Maker.f()[5]^2`.
3. **Row 1029, a local tuple binding's declared name** (commit 102b1cd1fc). Where only some names of a local tuple binding declare a type and the right side is no tuple expression of as many elements, the checker typed the other names fr
~~~~

## [S11] explorations/perf-probes/bound-any-compiled/REPORT.md, "The shapes by setting"

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

## [S12] explorations/reviews/phase3-exit/zero-audit.md, "A.2 Scope"

`facts-extract.sh 'doc:explorations/reviews/phase3-exit/zero-audit.md#A.2 Scope'`

explorations/reviews/phase3-exit/zero-audit.md:31-55, 3390 bytes, cut at 2500.

~~~~
### A.2 Scope

- **The twelve** (`explorations/coordinator/tools/distance/run.sh:85-87`): `FortressLibrary`, `RangeInternals`, `FortressBuiltin`, `NativeArray`, `List`, `String`, `FlatString`, `Stream`, `NatReflect`, `TypeProxy`, `Writer` and `AnyType`.
- **The library has 54 components:** 50 in `Library/` without the three `Compiler*` files, and 4 in `ProjectFortress/LibraryBuiltin/` without `CompilerBuiltin`. The brief's 53 counts the `.fss` files of `Library/` with the compiler's three.
- **`List`'s two imports.** In the stock run their apis are checked only during the `List` target. That target runs with `probe.componentOnly` (`tools/distance/DistanceMulti.java:58`), so the tracked method checks them with no error lines (`add-patch.py:46`, `:70`). Their `@@TC API ... errors=0` lines say they are clean today. Their components are never checked. Checked once each, as the first target, with the stage's own driver:

      TARGETS=Library/CovariantCollection.fss <run.sh copy>   -> #total 12 (export 1, return-type 2, typecheck 9)
        #crash decl  ObjectDecl CovariantCollection.fss:123:1-134:2  TypeError  Cannot handle (LValue ...
        #crash stage component CovariantCollection thunker  TypeError  ...:125:5-126:6: Must provide type for initializer List(sz)
      TARGETS=Library/OneShotFlag.fss <run.sh copy>           -> #total 1 (export: ObjectDecl OneShot at OneShotFlag.fsi:14.1, due to different parameters for object constructors)

  The crash means the checker never typed that declaration, so more errors may sit behind it.
- **The model's four imports.** `explorations/compile-ladder/plan-23/probes/four-imports-base.tsv` and its `NOTES.md` give `System` 2, `File` 4, `FileSupport` 24 and `FortressAst` 1 (an export error over 203 generated objects), and `FortressSyntax` 0, on this code. The four are on microGPT's path: its I/O, its arguments and the APL program's syntax api.
- **The rest of the library, one census.** I ran the stage's driver over the 41 components outside the twelve, in one JVM, all but the compiler's three files and `GeneratorLibrary`:
  - `#total none`, because `Avl.fss`, an Executable kept in `Library/`, stops before the checker: "File Avl.fss has 25 errors.", 'Variable key is not defined.', also under walk.
  - Of the other 40: **624 distinct component errors in 30 components**. The most are in `ReflectiveQuickCheck` and `Random` (63 each), `SkipList` 58, `QuickCheck` 48 and `Heap` 40. `Constants`, `Containment`, `FortressSyntax`, 
~~~~

## [S13] explorations/reviews/batch-25-review.md, "Where the text, the brief or the principles split"

`facts-extract.sh 'doc:explorations/reviews/batch-25-review.md#Where the text, the brief or the principles split'`

explorations/reviews/batch-25-review.md:173-187, 5369 bytes, cut at 2500.

~~~~
### Where the text, the brief or the principles split

**1. Shared helpers repaired the prelude's values, where P-38's title says its defects are not repaired (rung U; fork 5).** P-38: "The compiler prelude's defects are not repaired: they go with it at the switch-over." (`POSITIONS.md:35`). Rung U fixed `simpleUnsignedLongArith.unsignedLongToString` and `unsignedLongWrappingNeg`, which the one library's bindings now name and the prelude binds too, so the prelude's `NN64` printing and its prefix `BOXMINUS` changed with them: 'BOXMINUS 1: 1' became 'BOXMINUS 1: 18446744073709551615' (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:825`, `:832`; `RECORD.md`, "Points to report", U; F-313). Fork 5 names the change (`CLIMB-BATCH-25.md:84`), and the record's "No question for the curator" says no fork bends a decision of his (`:72-74`); neither it nor the Fable review weighs P-38. The decision's body names the prelude's own text, its `Maybe` block, its `REM` guard and its reversed spellings, which stand; the helpers and the run-time classes `FNN32` and `FNN64` outlive the prelude, and the one library needs them right (P-58; P-37, "settles which files survive, not the designs inside them"). Climb batch 24's rung K did the same for the prelude's compiled `CHOOSE` (rows 521 and 855), read under P-37 (`reviews/batch-24-review.md`, rung K, standard 3). Default: as landed. So P-38's title is false in effect for rows 326's and 860's prelude halves, and for 521 and 855 before them; the decision stands for the prelude's text (finding 4).

**2. `nextUp` and `nextDown` at a signed zero (rungs D and P; row 880).** IEEE 754-2008's nextUp of `-0.0` is the smallest positive subnormal, as Java's `Math.nextUp` gives; the team's `DirectedRounding.nextUp`, which both glue classes and both rungs' helpers call, gives the successor in IEEE's totalOrder, `0.0` (`ProjectFortress/src/com/sun/fortress/numerics/DirectedRounding.java:111-127`, its `float` twin `:25-41`). The specification names no `nextUp`; its one word on the signed zeros, "-0 is considered to be smaller than +0", is said of `MIN` and `MAX` (`Specification/basic/operators/opr-overview.tex:252`; skeptic D, "Homes"). Row 880 is `CONTESTED`, and `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss` pins today's values. D.worker.1 with P.worker.2 (`PLAN.md:669`). Default: today's values.

**3. The `test` modifier on a method (rung C; its D6).** The specification's note gives `test` to a top-level function of type `() -> ()
~~~~

## [S14] explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md, "10. Decisions"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md#10. Decisions'`

explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md:123-133, 3008 bytes, cut at 2500.

~~~~
## 10. Decisions

1. The pair is read by `genericPairValid` with the own generic first (`traitMethodPairValid`), not by a new reading of its own. Ways not taken: a separate reading for a function beside a trait method (more code, the same rules); `genericPairValid` in the order met (its `domainsExcludeTogether` takes the self members on `g` only). Evidence: brief, "Read it as genericPairValid reads two own generics".
2. The intersection `C[\X\] & X` is read at the meet in `domainsExcludeTogether`, as two members each checked with `excludesAtMeet`. Ways not taken: a new case inside `excludesAtMeet` (walk has no intersection `FType` to dispatch on, `EvalType.java:407-411`); an intersection type in walk's model. Evidence: `EvalType.java:407-411`.
3. Only a functional method without static parameters of its own is read (`traitMethod`). Way not taken: also methods with their own (`GenericFunctionalMethod` with own static parameters), whose instantiation differs (`GenericFunctionalMethod.java:44-63`) and which no measured pair needs; they keep the refusal.
4. Self-typed is read in its direct form only (`selfTypeParameter`). Way not taken: P-146's indirect form, through a self-typed trait that the trait extends at `X`; a pair so typed keeps the refusal, which shows less and cannot refuse a pair walk loads.
5. `Apart.of` makes fresh arguments from `getStaticParams()`. Way not taken: leave it, under which a function of the trait method's name and static parameters would get an empty fresh list and keep its refusal. Evidence: the two lists are equal for every earlier caller (`FGenericFunction.java:171-173`).
6. The guard's key is the generic declaration's span, `ExclusionVectorScalarOverlapWalk.fss:20:1-`, held by both messages. Way not taken: a rule's message, which the base does not print.
7. The scratch measure ran with a private empty caches folder per program, so walk analysed the library each time (row 342). Way not taken: `harness-one.sh` with `COLD_CACHE=1`, which would have run the four as tests, beside one another in one JVM.
8. Neither the count stage nor the distance stage was run: every path changed is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/` or `explorations/` (`git diff --name-only 4d27fbcc5..HEAD`: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `ProjectFortress/tests/ExclusionArrayScalarLibraryShapeWalk.fss`, `ExclusionVectorScalarOverlapWalk.fss`, `Exc
~~~~

## [S15] explorations/compile-ladder/rung-compiled-transaction/REPORT.md, "What changed and why"

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

## [S16] explorations/compile-ladder/rung-library-selector/REPORT.md, "Sentences of the specification made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-library-selector/REPORT.md#Sentences of the specification made false'`

explorations/compile-ladder/rung-library-selector/REPORT.md:174-184, 2155 bytes.

~~~~
## Sentences of the specification made false

None. Three sentences say that the compiled path compiles against its own library until the switch-over: `Specification/appendices/changes.tex:4608-4609`, `:5123-5124`, `:5384-5385`. They stay true: without the selection the compile command reads the prelude as before, and under it a program compiles against the one library but does not run, so the compiled path is not switched over.

Out of the specification, these statements of the record and the skill are now out of date; the gather corrects them:

- F-352, "on `main` the compile command selects the compiler's prelude alone", and F-353, "`main` has no selector and one set of classes" (`explorations/coordinator/FACTS.md:170-171`).
- `.claude/skills/fortress-repo/references/compiler.md`, "The `fortress` commands": "Every other command calls `useCompilerLibraries()`. Each call points `WellKnownNames` and `Types` to its prelude" (now: the one library's names under `FORTRESS_LIBRARY=one`).
- `.claude/skills/fortress-repo/references/build-and-caches.md`, "The caches" and "Building": the runs that read `default_repository/caches`, and the build's stamp over that folder (now also `default_repository/caches-one`).
- `.claude/skills/fortress-repo/references/tests-writing.md`, "Where a test goes, and how it passes": the compiled test folders are `library_tests/`, `parser_tests/`, `compiler_tests/` and `other_compiler_tests/` (now also `one_library_tests/`, the compiled path against the one library, under the selection); and `tests-running.md`, "Compiled tests": "Compiled tests are the `.test` files in `compiler_tests/`, `library_tests/` and `other_compiler_tests/`" (now also `one_library_tests/`, whose files run in one JVM by `FORTRESS_LIBRARY=one FORTRESS_CACHES=<folder> ../bin/fortress junit`, not by `junit.sh`, which cleans `default_repository/caches` by name).
- `.claude/skills/fortress-repo/references/tests-running.md`, "The two suites": `ant testFast` "runs about 2,100 tests in four tracks" (now a fifth, `onelibrary`, started when one of the four ends), and "One unit-test class, or one track" (now also `ant testOneLibrary`).
~~~~

## [S17] explorations/compile-ladder/plan-31/probes/switch-rehearsal.md, "2. The walls, in the order met"

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

## [S18] explorations/compile-ladder/plan-31/probes/model-closure-check.md, "4. The checker's time for one program"

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

## [S19] explorations/compile-ladder/plan-31/probes/probe-y.md, "1. What ran"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/probes/probe-y.md#1. What ran'`

explorations/compile-ladder/plan-31/probes/probe-y.md:11-48, 3353 bytes, cut at 2500.

~~~~
## 1. What ran

All in `/home/user/fortress-probe-y`, after one `ant compileAll` (43 s, `BUILD SUCCESSFUL`) and the two library orders (section 5).

The three programs are the rehearsal's by its description (its section 4); its files were not kept, so they were written again. `Hello` is `run(): () = println("Hello, one library")`.

**The prelude** (no variable set, the tree's own `default_repository/caches`):

    $ ../../bin/fortress compile Hello.fss ; ../../bin/fortress run Hello
    Hello, one library                         (both exit 0)
    $ ../../bin/fortress compile Arr.fss
    Arr.fss:5:6-10: Array1 is undefined.       (exit 255; Dot.fss alike, 2 errors)

`Arr` and `Dot` cannot compile against the prelude in any build: it has no array type (row 305).

**The one library** (`FORTRESS_LIBRARY=one`, `FORTRESS_CACHES=<tree>/default_repository/caches-one`, and for each run the rehearsal's flags that switch the verifier off, its W7):

    $ ../../bin/fortress compile Hello.fss ; ../../bin/fortress run Hello
    Hello, one library
    $ ../../bin/fortress compile Arr.fss ; ../../bin/fortress run Arr
    a[5] = 25
    $ ../../bin/fortress compile Dot.fss ; ../../bin/fortress run Dot
    dot = 499500.0                             (every command exit 0)

With `-verbose:class`, the prelude's run of `Hello` loads no class whose name holds `FortressLibrary`, `FortressBuiltin` or `FlatStringC`, and the one library's run loads none whose name holds `CompilerBuiltin` or `CompilerLibrary` (each count 0).

**Through the harness, against the one library.** Three `.test` files (`link`, `run`, `run_out_contains=` the line above) for the three programs, in one `fortress junit` run with the same three settings:

    . run .../ArrOne (1375ms) a[5] = 25
    . run .../DotOne (1826ms) dot = 499500.0
    OK (6 tests)                               (16 s)

**Through the harness, against the prelude, in the same build** (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`, on `ProjectFortress/compiler_tests`):

- Twelve files chosen for what the second set touches (helpers that raise, the `NN32`, integer, `Char` and `asFloat` helper families, a caught `FileNotFoundException`, two `atomic` tests, one refusal of the code generator): `OK (22 tests)`.
- Every seventh file of the folder's sorted list, 125 files: `Tests run: 205, Failures: 4`. The four are `XXXFortToStringRungS`, `XXXGenericFunctionalMethodSelfSecond`, `XXXGenericTraitGenericFunctionalMethod` 
~~~~

## [S20] explorations/compile-ladder/rung-typecase-unbound-arm/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-typecase-unbound-arm/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-typecase-unbound-arm/REPORT.md:13-32, 3469 bytes, cut at 2500.

~~~~
## 1. What changed and why

`TypeDisambiguator`, the part of the phase that binds names, which walk and the compiler both run (`explorations/coordinator/map/modules-and-phases.md`, "B.4 Disambiguation"), resolved a `typecase` clause's type with a flag, `forTypecaseClause`, that let every name in the clause's type that names no type pass silently and set `rewriteTypecaseClause` (base `TypeDisambiguator.java:392-393`). Then `forTypecaseClause` made a bare arm `Id =>` the binder `Id: Any =>` (base `:246-250`), and a tuple arm a pattern of binders (`:251-258`), each element by `typeToPatternBinding`. A name in any other place of the arm's type, as in `NoSuch -> ZZ32` or `Maybe[\NoSuch\]`, was left unresolved: walk failed when the arm ran, 'Missing type NoSuch', and the compiled path refused the arrow form, 'Unbound type: NoSuch', but compiled the static-argument form with no message (section 5).

The edit (`TypeDisambiguator.java:59-61`, `:241-275`, `:398-406`):

- the flag becomes `typecaseTupleNames`, the set, by identity, of the names that are elements of a tuple arm, at any depth of nested tuples: exactly the names that `typeToPatternBinding` turns into binders (`:262-275`);
- `handleTypeName` spares only such a name; every other name that binds no type variable in scope and no declared type gets 'X is undefined.' at its span, the message of every undefined type name (`:401-406`);
- the bare-name binder rewrite is removed: a bare arm that names no type is now refused, so that branch would be reached only after the error.

A type variable in scope still binds the arm: `handleTypeName` asks `_env.hasTypeParam(n)` first and takes such a name as the variable before it looks for a declaration (`:392-393`); the clause keeps the `VarType`, which tests the value against the static argument, as the library's `instanceOf[\T\]` does (`Library/FortressLibrary.fss:39-43`).

The harness (`FileTests.java:868-878`): `InterpreterTest.thrownAtLoad` counted only an exception under `Driver.evalComponent` as a refusal at load, so the promoted test's `.test`, `load_exception_contains=NoSuchTypeHere is undefined`, read 'Failed after load' though walk refused the program as named: on the edit's first build, before this change, `harness-one.sh ... TypecaseUndefinedArmWalk.fss TypecaseUndefinedArmWalk.test` printed ' Failed after load' over '    NoSuchTypeHere is undefined.'. It now also counts a `StaticError` in the exception's chain: a static error of the phases refuses the progr
~~~~

## [S21] explorations/compile-ladder/plan-31/probes/number-object-merge.md, "Measurements"

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

## [S22] explorations/compile-ladder/rung-superscript-after/REPORT.md, "Each form on the base and after"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-superscript-after/REPORT.md#Each form on the base and after'`

explorations/compile-ladder/rung-superscript-after/REPORT.md:68-91, 1857 bytes.

~~~~
## Each form on the base and after (points to report)

One program for each form, run under walk and compiled, on the old code (`tmp/…/probes/run.sh old`, through `old-fortress.sh /home/user/fortress-base33`) and on the edit (`run.sh new`). "SE" is the bare `Syntax Error` at the `^`.

| form | base, walk | base, compiled | after, walk | after, compiled |
|---|---|---|---|---|
| `x.v^T` | SE | SE | 107 | 107 |
| `(B.data^T).v` | SE | SE | 101 | 101 |
| `B.n^2` | SE | SE | 9 | 9 |
| `(B.data^*).v` | SE | SE | 201 | 201 |
| `(B.twin^T).v`, a getter | SE | SE | 102 | 102 |
| `(B.f()^T).v`, a method call | SE | SE | 101 | 101 |
| `B.n^T d` | SE | SE | 206 | 206 |
| `B.data[5]`, guard | 6 | 6 | 6 | 6 |
| `(B.data!).v`, guard | 301 | 301 | 301 | 301 |
| `(f(3))^T` | refused, "a function argument should not be immediately followed by a non-expression element" | 104 | 104 | 104 |
| `(f(3))^T d` | refused, the same | 208 | 208 | 208 |
| `((f(3))^T) d` | refused, the same | 208 | 208 | 208 |
| `(f(3))^2` | 16 | 16 | 16 | 16 |
| `f(3)^T` | refused, "Syntax Error: the argument should not be immediately followed by a non-expression element." | refused, "Item at this location must be an expression, not an operator." | the same refusal | the same refusal |
| `f(3)^2` | refused, as `f(3)^T` | refused, as `f(3)^T` | the same | the same |
| `twice(B.n)^2` | refused, as `f(3)^T` | refused, as `f(3)^T` | the same | the same |

`(f(3))^2` ran under walk on the base: the infix `^` never entered the postfix branch. `(f(3))!` and `(d^3)!` are in the test and not in this table: the probe programs of the two declared `!` on another type; on the base walk refused both ("a function argument…", "an exponentiation should not be immediately followed by a non-expression element"), which the walk test's failing run does not reach past its first assertion.
~~~~

## [S23] explorations/compile-ladder/rung-tuple-binding/REPORT.md, "What changed and why"

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

## [S24] explorations/compile-ladder/climb-batch-31/record-landing/diff.md, "For the coordinator"

`facts-extract.sh 'doc:explorations/compile-ladder/climb-batch-31/record-landing/diff.md#For the coordinator'`

explorations/compile-ladder/climb-batch-31/record-landing/diff.md:82-92, 1595 bytes.

~~~~
## For the coordinator

- Skill update (`owed.md`, "For the coordinator"): false, `compiler.md:40`, `revival-changes.md:41` (C76), `gate.md:47`, `:49-54`; incomplete, `compiler.md:75`, `:106`, `:108`, `SKILL.md:124` and `:101`, `interpreter.md:18`, `:63-77`, `revival-changes.md` on dispatch and traits. To judge first: `tests-writing.md:85` (item 573).
- POSITIONS to name: none; P-68's `round` clause waits for item 518.
- Departures to confirm: 517 and 520 to (a) by their rows, O2 and O5 in 578; findings 1 and 2 one item each (572, 562); judge-gate.2 and .3 one item (574); row 1043 in 563; review-routed.1, .2 and judge-review.2 stay PLAN lines.
- Item 572's default, parked, is gather.1's; the review's line for rows 1050 and 1052 gives 1a. Confirm which.
- Steps before run 2: the measure on the landed head, which F-34 and PLAN:66 then take; the trace of `OverloadReturnObjectDomain.fss:26`; run 2's sections read again, with a new base build.
- Between batches: the review's process findings, first 2, 8 and 10; `995993ceab` has no `historical:` line.
- Boot note: "Running" for this run; "Next" as PLAN:13; the coordinator's decision of 23:09 UTC on 2026-11-16 to launch one run. Held list: nothing.
- For a later pass: F-372, F-374 and F-375 say "a worker chose" forks M1, M2, A1, V1, V2, which the record set and which landed "as the plan says"; F-34's "8 kinds" against seven groups (cold reader), untouched; item 576's Home names F-374, where F-377 holds row 1053.
- The workflow: `plan.md` missed :9 to :11, :53, :66 to :69, :95, :97, :824; `cites.md` finds only changed numbers.
~~~~

## [S25] explorations/coordinator/CLIMB-BATCH-31.md, "Forks the batch takes"

`facts-extract.sh 'doc:explorations/coordinator/CLIMB-BATCH-31.md#Forks the batch takes'`

explorations/coordinator/CLIMB-BATCH-31.md:600-632, 11715 bytes, cut at 2500.

~~~~
### Forks the batch takes

Of the forks below only H2 (item 5) is consequential, and its default builds nothing. Each other fork builds within a decision on record or chooses where the record leaves an implementation open, and each can be undone.

1. **B1. One record, two runs.** Run 1 is M, K, L, A, V and X; run 2 is T, O and E on run 1's landed tree. **Default: so.** Way not taken: one run of nine rungs, in which M and T would edit `CodeGen.generateForwardingFor` and `dumpMethodChaining` together, O would be built without V's two repairs, and E could meet K at a returned value. The reason: `references/batch.md`, "The go".
2. **B2. A's two compiled tests join the atomic runs.** **Default: `AtomicExprCompiled` and `AtomicFieldCompiled`, three runs each at four threads.** The reason: each is a test of a race.
3. **B3. Of the rows that climb batch 32's review offered, and rows 1032 to 1035, four are built and the others wait.** Rows 1014 and 1030 are rung E; rows 1031 and 1013 are tried by a run, in E and in M; rows 1028, 1029, 1005, 1007, 1009, 1010, 1012, 1015 and 1035 wait for the batch after; row 1032 waits for review-queue item 552; rows 1033 and 1034 are no work of a batch. **Default: so.** Way not taken: a checker rung for rows 1028 and 1029 in run 1, about 0.7M, for two gaps that are no wall on the path to the switch-over.
4. **H1. Varargs is left out.** **Default: so; first rung once a program compiles against the one library.** Way not taken: a rung that compiles only a declaration whose body does not read the parameter, which no line of the library has. The reason: PROBES, section 2.
5. **H2. The prelude's half of the merge is in no run.** P-178 and P-37's exception ask that the prelude's number types take the form of a `value object` before the switch-over. The declaration alone compiles and then stops every compiled program, since the hand-written run-time class of each type extends a class that the code generator writes only for a trait (PROBES, section 8). **Default: it waits for a probe of the smaller way, in which the code generator writes for these objects what it writes for a trait today, and is then one rung; `NN32` and `RR32` of the prelude, which are traits there, go with it.** Way not taken: a rung tonight without a probe; or the larger way, a value object with a JVM payload in the code generator, which the switch-over needs and the carriers' review sized at about three rungs. The one library's half does not wait for it: each half brin
~~~~

## [S26] explorations/reviews/batch-31-review.md, "2. The decisions that landed at a default"

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

## [S27] explorations/compile-ladder/rung-method-forwarders/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-method-forwarders/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-method-forwarders/REPORT.md:11-17, 2515 bytes, cut at 2500.

~~~~
## What changed and why

Three edits of the code generator, in the members that the rung's section names.

1. **One method once (row 990; fork M1).** `CodeGen.dumpMethodChaining` gathered its candidates with `STypesUtil.allMethodsNotIdenticallyCovered`, which drops a declaration that a declaration of a strict subtype covers with an equivalent domain. It compared the two domains as schemas over each declaring trait's own static parameters, bounds included (`fullyReplacedMethodDomain`, STypesUtil.scala:1599). For `mx(self, other: T): T` in `Mmx[\T extends Mmx[\T\]\]` and in `Tord[\T extends Tord[\T\]\]` the two schemas differ in the bound, so neither covered the other, both stayed, and each got a forwarder under one name and descriptor. The gathering now calls the new `STypesUtil.allMethodsNotReplaced` (STypesUtil.scala:1748; CodeGen.java:980): a declaration is left out when another of the same name and kind, with self at the same position, is declared by a type strictly below its own and has the same parameter types without self, compared at the instance that the extends clauses give (`paramsWithoutSelfApart`, STypesUtil.scala:1780, the comparison of `providedAndOverridden`). The rule is a property of pairs of declarations, so the result does not depend on the order in which the methods are gathered.
2. **A body in an api's trait (row 732; fork M2).** The loop skipped every declaration without a body. A declaration read from an imported api never has one. `hasBodyInItsTrait` (CodeGen.java:1051) now keeps a body-less declaration whose declaring trait is named with an api and which has no `abstract` modifier, the reading of the checker's `isAbstractFnDecl`; a field's getter or setter stays skipped. The forwarder that `generateForwardingFor` then writes calls the static body, or for a generic method the closure finder, in the api trait's class of default methods, which the exporting component's jar holds.
3. **Self not first (row 571).** `generateForwardingFor` looks a forwarder up among the names and signatures of the object's dispatch methods, so as not to write it beside one. It built the signature to look up by removing parameter `selfIndex` from the static body's signature, whose self is always first; with self second it removed the first argument instead and found nothing, and the forwarder was written beside the dispatch method of the same name and descriptor. Where it is not narrowing it now removes parameter 0 (CodeGen.java:870-873). The narrowing cal
~~~~

## [S28] explorations/compile-ladder/rung-atomic-expr-field/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-atomic-expr-field/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-atomic-expr-field/REPORT.md:11-15, 2051 bytes.

~~~~
## What changed and why

1. **The atomic expression** (`CodeGen.java:1977-1984`). The parser writes `atomic do ... end` as a `Block` marked atomic (`parser/DelimitedExpr.rats:155-163`) and `atomic e`, for any other body, as an `AtomicExpr` (`parser/Expression.rats:737-738`). The code generator compiled the first and had no case for the second, so `defaultCase` refused it. The new member `forAtomicExpr` makes the atomic block that holds the body alone, the node the parser makes for `atomic do e end`, and hands it to `forAtomicBlock`. The block's value is its last expression's (`doStatements`, `CodeGen.java:1651`), so the expression's value is its body's.
2. **A var field** (`CodeGen.java:4938-4961`, `:4976-5014`; `VarCodeGen.java:202-239`, `:325`). An object's `var` value parameter and `var` field of its body are kept in a `MutableFValue` cell. The object's JVM field holds the cell, is `public final`, and is written once, by the constructor (`MutableFieldVar.firstWrite`, `VarCodeGen.java:223`). `MutableFieldVar` is now a `MutableStaticBinding` whose cell is reached through the object, so a read and a write emit the code of a top-level `var`: the check `BaseTask.inATransaction()`, then `Transaction.TXRead`/`TXWrite` on the cell inside a transaction, or the cell's `getValue`/`setValue` outside one. A field that is not `var` is a `FieldVar`, as an immutable value parameter was, with the bytecode it had.
3. **A field captured by a loop body or a function expression.** Every nested code-generation context (a task, a closure) asks `isAMutableStaticBinding()` to decide whether it captures a cell or a copy (`CodeGen.java:5282`, `:5397`, `:5462` at the base). Because `MutableFieldVar` now is one, a loop body or a function expression inside an object's method captures the field's cell. On the base it captured a copy of the value, so a write from a loop body inside the object's own method was lost at one thread too. This defect was not in the ledger; the cell repairs it, and `compiler_tests/VarFieldCapturedCompiled` asserts it.
~~~~

## [S29] explorations/compile-ladder/rung-walk-value-bound/REPORT.md, "Decisions"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-value-bound/REPORT.md#Decisions'`

explorations/compile-ladder/rung-walk-value-bound/REPORT.md:129-138, 2490 bytes.

~~~~
## Decisions

1. **The value check passes every symbolic type** (fork V1). Ways not taken: make the symbolic type a value type where its bound is one, which changes what every later check of the type reads; override the check in `SymbolicType`, which needs the private method opened. Evidence: the probe's suite passed with the one line; `ant testSystem` passes.
2. **Where the shortcut would fire, the reading on declared domains decides, and anything but a named rule leaves the pair accepted.** Ways not taken: (a) withdraw the shortcut and let the check's ordinary flow run, in which a plain declaration better at a parameter without a symbolic type meets the team's Subtype Rule branch and row 785's refusal for an unwritten return type; (b) remove the shortcut for every pair, which is row 697 and refuses pairs of the library. Evidence: row 785; the brief's section, "the shortcut stays as it is for them".
3. **A more specific declaration that writes no return type is not judged at an object type.** Ways not taken: read its range as walk gives it, `Any`, which refused the brief's guard (seen in the first run after the edit); read it as `BottomType`, which changes `Simple_fcn` for every caller. No decision on record covers the unwritten return type; I acted on the brief's guard, and recorded the invalid pair that loads as row 1044.
4. **The new reading is added to the old one, not put in its place.** The old comparison, type parameters standing for themselves, is sound and settles results that mention no static parameter. Way not taken: the new reading alone; the old one is kept so that no pair read valid before is refused.
5. **The reading applies in `validOnDeclaredDomains` wherever the plain declaration lies inside the generic, not only where the shortcut would have fired.** So a plain declaration over a mix of object and trait types loads where it was refused. Way not taken: a flag that limits it to the shortcut's pairs, which would keep a refusal that the rule does not make.
6. **A `comprises` clause is not read** (fork V4). Row 550's pair at `ZZ64` stays refused.
7. **Two guards in two files, and a test of the value check's refusal added.** The brief names `XXXNonValueOfValue` as the test of the check; it is not (row 1045), so a plain test with a `load_exception_contains` key was written. The team's test is left as it is: it is beyond the files the section names.
8. **The Effect at changes.tex:2717 is not edited**: the section names the box alone.
~~~~

## [S30] explorations/compile-ladder/rung-walk-value-bound/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-value-bound/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-walk-value-bound/REPORT.md:11-16, 2302 bytes.

~~~~
## What changed and why

1. `FTraitOrObject.enforceValueness` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java:102-103) returns at once for a `SymbolicType`. The check refuses a type that is not a value type below a value type. The symbolic type that walk makes for a type parameter is a trait type that extends its bound, and where the bound is a value object the check refused it. A declared type that is not a value type is still refused below a value type.
2. The load check, `completeOverloadingCheck` (OverloadedFunction.java:513-527). The team's shortcut takes two parameter lists to exclude where every parameter at which they differ is an object type of one of them. For an own generic beside a declaration without static parameters whose domain lies inside the generic's declared domain (`plainInsideGeneric`, :837), the pair is now first read on its declared domains (`validOnDeclaredDomains`, :792). A reading that names a rule refuses the pair with that rule's message. A valid reading, and a reading that does not read the pair, leave the pair accepted as before. A Return Type Rule reading against a more specific declaration that writes no return type (`writesReturnType`, :862) is not acted on.
3. The reading on declared domains, plain declaration inside the generic one (OverloadedFunction.java:814-820). It was: the plain result below the generic result, its type parameters standing for themselves. It is now that, or `returnRuleAtObjectArguments` (:882): each static parameter that the generic's return type mentions is fixed by a static argument of one of its parameter types, or the generic returns that type parameter itself and the plain declaration has, at a parameter whose type in the generic is that type parameter, an object type below which its result lies; and the plain result lies below the result of the instance that holds the plain domain. An argument at an object type has that type itself, so every instance of the generic that applies returns a type at or above it. Below a trait type a lower argument selects a lower instance, so a trait type gives nothing.
4. `Specification/basic/inference.tex:267-268`: the box names the declared return type and the field of an object, row 1036, beside the immutable top-level variable.
~~~~

## [S31] explorations/compile-ladder/rung-number-objects/REPORT.md, "Every pair that walk refuses at load after the change and loaded before"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-number-objects/REPORT.md#Every pair that walk refuses at load after the change and loaded before'`

explorations/compile-ladder/rung-number-objects/REPORT.md:162-166, 1115 bytes.

~~~~
## Every pair that walk refuses at load after the change and loaded before

None among the library and the plain tests: every test of `ant testSystem` loads the library, and all 869 passed. For the 163 expected-failure walk tests, which stay green whether their failure is a refusal at load or a failure at run time, the comparison of their outputs on the old code and the new was not made: the session's automatic permission check refused the run of the base build's `harness-one.sh` with `FORTRESS_HOME` set to the base build (the form of `worktrees.md`, "Running the old code"), "Destructive or Unwanted Actions", and by `session.md` that run was not tried another way. On the edit all 163 passed (`Saw expected failure` or `Saw expected exception`).

Added by the skeptic: the 163 expected-failure walk tests, run directly with `old-fortress.sh` and with `bin/fortress`, keep their failures; none moves between a refusal at load and a failure at run time. Their outputs differ only in lists of overloads and in the counts of one race, `XXXAtomicNestedReadsKeptWalk` (`SKEPTIC.md`, "The expected-failure tests").
~~~~

## [S32] explorations/compile-ladder/rung-comprises-cast/REPORT.md, "What changed and why"

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

## [S33] explorations/compile-ladder/rung-number-objects/REPORT.md, "What changed and why"

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

## [S34] explorations/compile-ladder/rung-numeral-block-end/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-block-end/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-numeral-block-end/REPORT.md:9-28, 4304 bytes, cut at 2500.

~~~~
## What changed and why

The base is 647163a9c4. The rung's commits on `wip/rung-numeral-block-end`: `7fb38bbe30` (the checker's edit and the tests), `20fe9f78c5` (Appendix I's sentence), `19e7e678e8` (the refusal test widened to `RR64`, and its new name in that sentence). One launch worked the rung.

**The cause as found.** A function's body is checked by `checkExpr(body, rt, ...)` (`scala_src/typechecker/impls/Decls.scala:230`). The block passes the expected type to its last element without converting it (`impls/Misc.scala:435`), and after a local declaration that last element is a `LocalVarDecl` (or a `LetFn`) whose own body is the rest of the block. So the block's type is the numeral's own type, `NaturalNumeral[\1,10,4\]`, and `STypeChecker.checkExpr` falls to its conversion (`scala_src/typechecker/STypeChecker.scala:538-539`): first `numeralJoinInto`, the join that converts each numeral of a result position where it stands, then `coercions.buildCoercion` of the whole expression. The join's test of whether a result position is a numeral, `numeralResult`, and its rewrite, `joinInto` (`impls/Functionals.scala:1304-1313`, `:1334-1385`), had cases for a block, `do`, `if`, `case` and `try`, and none for a `LocalVarDecl`, a `LetFn` or a tuple. So `buildCoercion` wrapped the whole `do` block in a `TraitCoercionInvocation` (the type-checked tree of `four()`, dumped by `fortress typecheck -out`, shows `(FnDecl ... _body=(Some _value=(TraitCoercionInvocation ... _arg=(Do ...`), and for a block that ends in `(1, k)` a `TupleCoercionInvocation` around the whole block. The coercion desugarer writes `_RewriteFnApp(coerce_ZZ32[\1,10,4\], block)` (`compiler/desugarer/CoercionDesugarer.scala:97-100`), or binds the tuple to fresh variables and calls the coercion on a variable (`:112-145`). The code generator folds a numeral's coercion only where its argument is the numeral itself (`numeralCoercionSiteDesc` and `isNumeralCoercionCall`, `compiler/codegen/CodeGen.java:7745-7768`); on a block or a variable it takes `emitFnApp`, whose call of a reference with static arguments is a closure call (`useClosure`, `CodeGen.java:8002-8013`), and `forFnRef` writes the reference as a function value: a `GETSTATIC` of the closure of the generic coercion at its uninstantiated arrow type, `NaturalNumeral[\n,r,v\] -> ZZ32` (`CodeGen.java:4252`). The run then loads that closure, whose body reads the static parameter `v` as a class, `fortress/CompilerBuiltin$v`. A typed binding does not tak
~~~~

## [S35] explorations/compile-ladder/rung-numeral-block-end/SKEPTIC.md, "Findings and fixes"

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

## [S36] explorations/compile-ladder/rung-library-selector/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-library-selector/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-library-selector/REPORT.md:15-57, 6225 bytes, cut at 2500.

~~~~
## What changed and why

**The selector** (fork S1). `ProjectProperties.compiledPathUsesOneLibrary` (`ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java:283-291`) is true where the property `fortress.library`, or else the environment variable `FORTRESS_LIBRARY`, is `one`, read once when the class loads, as probe Y read it (`probe-y.patch:683-684`). Any other value, or none, is the prelude. `WellKnownNames.compiledPathUsesOneLibrary` (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:143-150`) gives it to the compiler. `Shell.useCompilerLibraries()` (`ProjectFortress/src/com/sun/fortress/Shell.java:373-388`) points `WellKnownNames` and `Types` at `FortressLibrary`, `FortressBuiltin` and `AnyType` where it is set, and at the prelude's names where not; the desugaring switches stay the compile command's. Nothing of the code generator follows it (`NamingCzar`, `CodeGen`, `runtimeValues/` unchanged).

The commands that follow it are those that call `useCompilerLibraries()` (`Shell.java:414-502`): `compile`, `link`, `build`, `api`, `compare`, `parse`, `unparse`, `disambiguate`, `desugar`, `grammar`, `typecheck`, `test-coercion`, `help` and the usage message, and `junit`, whose compiles and links go through `subMain`. `fortress run` follows it through the class path script's caches folder only (below). Walk, `test` and `typecheck-old` keep reading the interpreter's library; under the selection they keep their caches in the selection's folder too, since `ProjectProperties.CACHES` is one value for the JVM:

    FORTRESS_LIBRARY=one bin/fortress tests/BooleanOps.fss          (from ProjectFortress/)
    rc=0
    ls ../default_repository/caches-one/interpreter_cache | grep -c BooleanOps
    1

**The caches folder** (fork S2). `ProjectProperties.CACHES` (`ProjectProperties.java:293-302`) is the folder that the property `fortress.caches` or `FORTRESS_CACHES` names; else, under the selection, `${REPOSITORY}/caches-one`; else, as before, the configuration's `${FORTRESS_REPOSITORY}/caches`. `bin/fortress_classpath:25-31` and `bin/run_classpath:25-31` take the same default from `FORTRESS_LIBRARY`. `build.xml` gives the folder the stamp of `cache0` and `cache1`: the property `cacheOne` (`build.xml:44-47`), `cleanCache` (`:367`, `:376`), `checkCaches` (`:531-534`, `:553-558`, `:565`) and the end of `compileAll` (`:863`). `.gitignore:28-29` ignores the folder; without it every build would leave an untracked folder, and a base build whose `gi
~~~~

## [S37] explorations/compile-ladder/rung-library-selector/REPORT.md, "Wrong pairings, and the run under the selection"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-library-selector/REPORT.md#Wrong pairings, and the run under the selection'`

explorations/compile-ladder/rung-library-selector/REPORT.md:113-129, 1992 bytes.

~~~~
## Wrong pairings, and the run under the selection

No mark in a jar stops a wrong pairing (S3). Measured, from `ProjectFortress/`:

    FORTRESS_LIBRARY=one bin/fortress compile one_library_tests/OneLibraryHalf.fss    rc=0, 26.5 s; writes default_repository/caches-one/bytecode_cache/OneLibraryHalf.jar
    FORTRESS_LIBRARY=one bin/fortress run OneLibraryHalf
      Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String
      Caused by: java.io.IOException: Resource not found : fortress/FortressLibrary$String.class      rc=1
    bin/fortress run OneLibraryHalf                       (no selection: the prelude's caches folder)
      Could not load OneLibraryHalf
      Caused by: java.io.IOException: Resource not found : OneLibraryHalf.class                         rc=1
    FORTRESS_LIBRARY=one bin/fortress run Integer1        (a prelude program, its jar in default_repository/caches)
      Could not load Integer1 ... Resource not found : Integer1.class                                   rc=1
    FORTRESS_CACHES=X bin/fortress compile library_tests/Integer1.fss; FORTRESS_LIBRARY=one FORTRESS_CACHES=X bin/fortress run Integer1
      PASS                                                                                              rc=0

So a program run against the other library's caches folder is not found ('Could not load P'); with one caches folder named for both, a prelude program runs under the selection as without it, since the run's class path differs only by the caches folder (no second set of classes, S5); and a one-library program dies at its first library class. The property `fortress.library` steers a JVM; the scripts read only the environment variable, so `-Dfortress.library=one` in `JAVA_FLAGS` gives the compile `caches-one` and the run's class path `caches` (the `expand` lines above): a run then finds no jar. Under the selection the compile of a program writes only its own jar; the one library has none (new row 1062).
~~~~

## [S38] explorations/compile-ladder/rung-typecase-unbound-arm/REPORT.md, "10. Decisions"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-typecase-unbound-arm/REPORT.md#10. Decisions'`

explorations/compile-ladder/rung-typecase-unbound-arm/REPORT.md:159-172, 3655 bytes, cut at 2500.

~~~~
## 10. Decisions

1. **The refusal is in `TypeDisambiguator`, which both paths run.** Fork D1's default. Ways not taken: the checker only, which leaves walk's answer wrong (D1's way not taken); walk's `Evaluator.forTypecase`, walk only; the parser, which needs no mark (section 7).
2. **The exemption keeps exactly the names that a binding rewrite takes, the elements of a tuple of names; every other undefined name in an arm's type is refused, in an arrow type or a static argument too.** Ways not taken: refuse only the bare arm and keep the flag for every other name, which leaves `NoSuch -> ZZ32` failing only when run under walk and `Maybe[\NoSuch\]` compiled with no message (section 5); refuse the tuple's elements too, ending the team's binding form, which goes beyond D1's text, which names "a typecase arm whose name binds no type variable" and the bare arm of row 959, while rung C's judge names two binding forms (`rung-checker-overloading/JUDGE.md`, section 2, point 2) and a gated team test uses the tuple form (`AfterTypeChecking.test:16`). Left to the curator.
3. **The set of spared names is kept by identity, from the arm before it is resolved, with nested tuples.** Way not taken: a boolean flag over the tuple arm, which would spare a name inside an element's arrow type that no rewrite takes. `typeToPatternBinding` (`TypeDisambiguator.java:216-238`) recurs on nested tuples and binds only their `VarType` elements, as the set does.
4. **The bare-name binder rewrite is removed.** Way not taken: keep it; after the refusal it is reached only with the error already reported.
5. **The team's `Compiled7.PatternMatching.b` is respelled `x: Any =>`.** Ways not taken: drop it from `AfterTypeChecking.test`, or make it an expected failure, each losing the check that a binder arm typechecks. The respelling is the clause the old rewrite built.
6. **The walk harness counts a static error of the phases as a refusal at load.** Ways not taken: keep the walk test `XXX`-named with no keys, the team's negative-test form (`tests/XXXLabelShadowing.fss`), which checks no message and is not the promotion the brief asks for; leave the plain test red. Evidence: before the change the harness read walk's refusal as ' Failed after load' over '    NoSuchTypeHere is undefined.' (section 1).
7. **The compiled sibling is named `XXXTypecaseUndefinedArmCompiled`, not the brief's `TypecaseUndefinedArmCompiled`.** The harness reds a plain-named compile test whose compile reports errors, whateve
~~~~

## [S39] explorations/compile-ladder/rung-kind-env-generic/REPORT.md, "The one library's four declarations"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-kind-env-generic/REPORT.md#The one library's four declarations'`

explorations/compile-ladder/rung-kind-env-generic/REPORT.md:85-100, 2335 bytes.

~~~~
## The one library's four declarations

By reading, then by F-34's measure run once on this rung's code (`explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh` on a scratch worktree seeded at `18d5b51578`, 212 s), never on the base:

    refused declarations 15 | emitted (OK lines) 743 | component failures 0
    kinds 5
      9  Can't compile VarArgs yet  [String 4, FortressLibrary 3, List 1, FlatString 1]
      2  ClassCastException: com.sun.fortress.nodes.IntersectionType to com.sun.fortress.nodes.NamedType  [FortressLibrary 2]
      1  ClassCastException: com.sun.fortress.nodes.IntersectionType to com.sun.fortress.nodes.TraitType  [List 1]

F-34 on `c3b16ef2d1`: 17 in 5 kinds, 4 of them the kind environment. Now none:

- `ArrayList` (`Library/List.fss:252`): passes this wall and is emitted; both its walls were this rung's, row 812's at the constructor and the generic methods' bodies (`fill[\T\]`, `enlargeLeft[\T\]`, `:311-334`). Behind it the measure shows nothing; it skips the dispatch methods and runs no emitted class (F-34).
- `APPCOV` (`Library/CovariantCollection.fss:30`): passes and is emitted (`CovariantCollection refused 0 emitted 25`). Its `typecase` has no `else` clause, but the pre-typecheck desugarer gives it one that throws `MatchFailure` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/TypecaseExprDesugarer.java:43-49`, applied at `ProjectFortress/src/com/sun/fortress/compiler/PreTypeCheckDesugarer.java:118`), so a compiled fall-through throws `MatchFailure`, as the chapter says, and pushes no `()` (the skeptic's program `SkM`, `SKEPTIC.md`); no class of `APPCOV` is run.
- `app` (`Library/List.fss:93`): passes this wall; its arms 2 and 3 call a generic method on a value typed by an intersection, `a'.appendRC[\F\](b')` on `List[\E\] ∩ List[\T\]`, and stop at `CodeGen.forMethodInvocation`'s cast to `TraitType` (`@@CG FAIL FnDecl app ... ClassCastException CodeGen.forMethodInvocation:7377`, a line of the measure's patched scratch tree): row 540's wall, rung I's member.
- `__bigOperator2` (`Library/FortressLibrary.fss:1656`): passes this wall; `outer'.unwrap` on `BigOperator[\I0,O0,R0,L0\] ∩ BigOperator[\I0,I0,I0,L0\]` stops at the same member's cast to `NamedType` (`ClassCastException CodeGen.forMethodInvocation:7430`, the same tree): row 540, rung I.
~~~~

## [S40] explorations/compile-ladder/rung-intersection-receiver/REPORT.md, "5. Programs run old against new"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-intersection-receiver/REPORT.md#5. Programs run old against new'`

explorations/compile-ladder/rung-intersection-receiver/REPORT.md:82-102, 2880 bytes, cut at 2500.

~~~~
## 5. Programs run old against new

Each under `tmp/rung-intersection-receiver/probe/`, the old code through `old-fortress.sh` on `/home/user/fortress-base37`, the new in the worktree:

- `ProbeIntersectionOwner.fss` (`get` overloaded across the conjuncts, a generic method): old, `ClassCastException: ... IntersectionType cannot be cast to class com.sun.fortress.nodes.NamedType` at `CodeGen.forMethodInvocation(CodeGen.java:7323)`; new, prints `left int`, `right string`, `picked`, `PASS`.
- `ProbeGenericOnly.fss` (the generic method alone): old, `ClassCastException: ... cannot be cast to class com.sun.fortress.nodes.TraitType` at `CodeGen.java:7270`; new, runs.
- `ProbeTypecaseBinder.fss`, `ProbeTypecaseBinderGeneric.fss`: old, the `NamedType` cast at `:7323`; new, `marked square` / `marked box`, `plain`, `PASS`.
- `ProbeThreeConjuncts.fss` (three closed traits, `LeftSub` below `LeftResult`): new, `left sub`, `right`, `PASS`. An instrumented copy showed the checker gives the receiver `AND(LeftSub,RightResult)`: it drops `LeftResult` itself, so no program here reaches the rule's choice between two nested conjuncts.

The narrowing by the declaring trait, checked by a scratch copy of the edit without it (`if (true)` in its place): `ProbeIntersectionOwner` then prints `left int` and dies at `choose(m).get("a")` with `java.lang.NoSuchMethodError`, since `LeftResult`, the first conjunct with a `get`, has no `get(String)`. The instrumented copy printed the rule's inputs for every call of the test, as `OWNER-PROBE get in AND(LeftResult,RightResult) declaring=RightResult owners=[RightResult]` and `OWNER-PROBE tag in AND(LeftResult,RightResult) declaring=Tagged owners=[LeftResult, RightResult]`; a getter's call has no arrow (`declaring=null`).

The one library, through the planner's measure of F-34 (`explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh` on a scratch worktree seeded at `e0a5274db2`, the rung's code), run on the rung's code only; its before is F-34, measured on `c3b16ef2d1`, whose code is the base's (`git diff --name-only c3b16ef2d1 1609258002b0 -- ProjectFortress Library build.xml Specification bin` prints nothing):

    refused declarations 17 | emitted (OK lines) 743 | component failures 0
    kinds 4
      9  Can't compile VarArgs yet  [String 4, FortressLibrary 3, List 1, FlatString 1]
      5  <X> is not in the kind env  [List 3, FortressLibrary 1, CovariantCollection 1]
      2  java.util.zip.ZipException: duplicate entry: <closu
~~~~

## [S41] explorations/reviews/batch-31b-review.md, "Corrections owed in the record"

`facts-extract.sh 'doc:explorations/reviews/batch-31b-review.md#Corrections owed in the record'`

explorations/reviews/batch-31b-review.md:233-250, 2423 bytes.

~~~~
### Corrections owed in the record

- **POSITIONS, false and not reworded by the gather or the review:**
  - P-68 (`POSITIONS.md:83`): "and `round` is `ZZ64`, but `ZZ` in the `FortressLibrary` component's `trait RR64`". There is no `trait RR64`, and the one `round` is `ZZ64` (`Library/FortressLibrary.fss:548`). The record's own list for the record-landing names it (`CLIMB-BATCH-31.md`, "For the record-landing workflow").
  - P-166 (`POSITIONS.md:100`): "The library declares `value object BigNum extends ZZ` (`LibraryBuiltin/FortressBuiltin.fss:544`, `.fsi:196`), so every `ZZ` value is a value object". `BigNum` is gone; `ZZ` is itself a value object (`Library/FortressLibrary.fss:1170`). The conclusion stands; its ground is now the merge.
  - P-162 (`POSITIONS.md:72`) and P-165 (`:99`) name `Float`'s power, brackets and `^` as declarations; they are `RR64`'s now. A respelling, no change of meaning.
- **FACTS, false and not reworded:**
  - F-257 (`FACTS.md:241`): "rows 539, 550 and 779 hold valid pairs that walk refuses". Row 550 is fixed.
  - F-34 (`FACTS.md:38`): "the count on code with rows 81 and 875 fixed is not taken". It was taken before run 2, 21 (section 3); after run 2 it is not taken.
  - F-240 (`FACTS.md:110`): the clause "that time is not of one span with the whole stage, which rung runs of the same night timed longer, so it shows no fall since climb batch 31's gate" was written for a fall; the gate's figure is a rise, about 85 s against about 75 s (the commit stage's note).
  - F-140 (`FACTS.md:224`): 'got type Long' in row 527's message. The row reads 'got type ZZ64' since `12292add28` of 2026-11-09. This landing did not make it false, and no landing reworded it.
- **PLAN:**
  - "Next" (`PLAN.md:13`): run 1's record-landing and his word on forks O3 and O4 "before run 2 is launched".
  - Phase 4's line of the batch (`PLAN.md:53`): run 2 "was launched".
  - F-34's line (`PLAN.md:66`): 24 declarations, and "its record expects 19 to 21".
  - Items 97 and 98 under his answers (`PLAN.md:147-148`): forks O3 and O4 landed at their defaults; he reviews them now.
- **The review queue:** items 516 and 519 say "Landed: Nothing" (`review-queue.md:556`, `:1209`); rung O landed both defaults. Item 572 cites `Library/FortressLibrary.fss:291-294`, which still holds.
- **The ledger:** row 697 holds the case at the five types (rewritten); rows 1054 to 1060 are filed. Nothing further owed.
~~~~
