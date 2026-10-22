<!-- The FACTS clarity pass, chunk f4, 2026-10-22: F-52 to F-61 and F-63 rewritten from the chunk's assessment and fixed from its cold read and check, each with its change of meaning, the source of each sentence and its questions. -->

# FACTS chunk f4: the rewrite

The base is `main` as `assessment.md` read it. The assessment keeps F-62, so this file holds the other eleven. No entry is split or merged. Moved sentences go to the history, or to an entry in this chunk (F-54's numeral sentence into F-57). Two move to entries outside the chunk; see "For the coordinator". Each sentence's source was read again for this pass, except where a line below says it rests on the assessment's reading. Concepts that the entries use and that every worker needs are in `concepts.md`.

The second round follows `check.md` and `cold-read.md`. Each entry's "Second round" line says what changed.

The eleven entries hold 7,227 bytes in the record and 11,819 here.

## F-52

> - F-52 **Neither path can use `RationalQuantity` as the specification declares it: the advanced numbers chapter's rational type, refined by `bool` static parameters for its sign, infinities and NaN (`Specification/advanced-lib/numbers-advanced.tex`).** The team's `ProjectFortress/tests/conditionalExtension.fss` declares it as the chapter does: a trait that extends its own instantiations with weaker flags, under a `where` clause. The compiled checker refuses it, "Cyclic type hierarchy: Type RationalQuantity transitively extends itself". Walk runs that test only because nothing instantiates the trait; a probe that instantiates it fails under walk. Measured by the note's probes, which `84aef6a4f` removed (`reviews/flattening-questions-ways/Q3*.txt` in its parent). Detail: `reviews/flattening-questions-ways.md`, "Question 3", section 2.

Meaning: three claims leave the entry, one stays.
- Kept: neither path can build `RationalQuantity`. It is now glossed and its two failures given.
- The identity clause goes: F-59 and F-60 own it. The old title's "an empty reduction's identity comes from its static argument" held only for `SUM` and `PROD`.
- The mixed widths go: F-55 and P-74 own them.
- "A form with no argument cannot be overloaded by its result type alone" goes to its source, `flattening-questions-ways.md`, Question 1, section 2. It was measured only on the compiled path with the compiler's library (`Q1NullaryComp`), and F-59, to which the old text pointed, does not hold it.
- The authorship sentence, on the 2009 and 2010 flattening and "Steele's operators of 2011", is history.

Second round: "sign flags" is now the chapter's six `bool` flags, which also cover the infinities and NaN (`numbers-advanced.tex:15-27`). The chapter's file is named. "Measured" now says where the probes' captures are. The test's path is written from the root. "Build" is now "use as the specification declares it".

Sources: `flattening-questions-ways.md`, "Question 3", "The designs" and section 2 (`Q3ConditionalExtension.walk.txt`, `.comp.txt`, `Q3RefineWalk.walk.txt`); `numbers-advanced.tex:15-27`; `git log` for `84aef6a4f`.

Questions for the curator: none.

## F-53

> - F-53 **At the last landed gate, the distance to the switch-over is 5 errors and the checker count is 3.** The distance counts the compiled checker's distinct errors over the interpreter's library, its twelve apis and their twelve components, running every stage of each whatever the earlier stages reported, and classes them by root cause (F-54). Its five are: the one export error, where the `FortressLibrary` component differs from its api (class X1); two `BIG MIN` sites of row 731 (class BR); and in class OT, the other body errors, row 731's site at `List.fss:146` and the fused arm of `__bigOperator2`, the library's function for two nested big operators, which no desugaring calls: its `typecase` arm answers `I0` where `O0` is declared (row 632; PLAN, "Pavol's answers, in the order they are needed", item 46; review-queue item 40). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing stage. Nothing crashes now (F-233), so its 3 are that component's type errors: the fused arm and the two `BIG MIN` sites. Every api counts 0. A rise in either is reported and turns no gate red on its own; the count's stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Meaning: unchanged.
- "The api's second export error" is now the one export error: the first went in climb batch 20.
- "Item 46's fused arm" is named by its function and row.
- "Both are reported, never red" now says what P-39 says, with its exception.
- The last sentence did not parse. It is now a pointer to `batch.md`, which says that a rung measured by either takes the last landed gate's tables as its starting values.

Second round:
- The first round cited "review-queue item 46", which is another subject. The fused arm is PLAN's item 46 under "Pavol's answers", and review-queue item 40.
- P-39 adds that the count's stage can still turn the gate red on the faults of F-66. The entry now says so.
- The count's 3 needed its reason. The count checks only the `FortressLibrary` component and its apis, and each unit stops at its first failing stage, so the count never reaches the component's export check. The distance's "whatever the earlier stages reported", which carries the contrast, is restored.
- The list of the count's 3 now reads as three items. OT and the fused arm are glossed. The tables' paths are written in full.

Sources:
- The values, the classes and the sites: `compile-ladder/climb-batch-20/gate/distance.txt` (`#total 5`, X1 1, BR 2, OT 2, `#crash none`); `checker-count.txt` (`#total 3`, every api 0); `distance-sites.tsv`; `reviews/batch-20-review.md` section 1.
- The distance's scope: `coordinator/tools/distance/run.sh:3-4`.
- The count's scope and early return: `coordinator/tools/checker-count/run.sh`, `TARGET=Library/FortressLibrary.fss`; `StaticChecker.java:249`, `:268-271`, `:281-284`.
- Row 632 and the fused arm: row 632; `PLAN.md:154`; `review-queue.md:396`.
- No red, and its exception: P-39; F-66.
- The starting values: `batch.md`, "The checker count and the distance".

Questions for the curator: none.

## F-54

> - F-54 **The gate classes the distance to the switch-over by root cause.** The `#class` rows of each gate's `distance.txt` hold the count of each class, such as X1 for an export error, BR for a big operator's body, and OT for the other body errors, one-off library slips and checker limits; `explorations/coordinator/tools/distance/classify.py` assigns them. F-53 gives the last gate's. That gate's `distance.txt` reads `#crash none`: the checker checks the `FortressLibrary` component to its end, `Array3`'s body included, without a crash (F-233). Detail: `perf-probes/prelude/distance-triage.md` section 2.

Meaning: the title's claim kept; three sentences moved out.
- The numeral sentence goes into F-57, so the two entries no longer list different ways.
- Row 680's repair is history. The present property, `#crash none`, stays.
- The timing with `StandardMinMax[\T\]` in the array bound, "past 15 minutes when measured, before row 688's memo", is F-94's subject. It goes to the history and stays in `distance-triage.md` section 3.4. Whether it still exceeds the limit with the memo is not measured.
- I did not merge F-54 into F-53, although the assessment allows it. Two places point to F-54: F-53, and PLAN's "The live thread". Keeping F-54 keeps both pointers valid.

Second round: OT is glossed. "The component's check runs through `Array3`" now names the component and says what it means.

Sources: the gate's `distance.txt` (`#class` rows and `#crash none`); `classify.py`, as `batch-20-review.md` section 1 cites it; `distance-sites.tsv`, which lists no `Array3` site; `rung-checker-bounds/REPORT.md` section 6, "None lies in `Array3`"; F-233.

Questions for the curator: none.

## F-55

> - F-55 **Static arguments are inferred with coercion on both paths: the compiled checker from the arguments' static types and the expected type, walk from their run-time types.** So a mixed-width call takes the narrowest type into which its arguments convert, as P-74 decides. F-73 gives the checker's rule and F-137 walk's; F-87 lists where the checker has an expected type. Under walk, a typed binding converts a call's result after the call and does not fix the call's static arguments: `a: BoxK[\ZZ64\] = wrapK(3)` infers `T` from `3` as `Int` and is refused, since no coercion converts a `BoxK[\Int\]` (row 510). On the compile path, a parameter with no written bound is bounded by `Object`, not `Any` (row 412), so a parameter that nothing fixes takes `Object` there (F-78). Gated by `compiler_tests/InferCoercionShapes` and `tests/InferCoercionRungK`. Detail: `compile-ladder/rung-inference-checker/REPORT.md` section 3.2; `compile-ladder/rung-inference-walk/REPORT.md` sections 2 and 9.

Meaning: unchanged; F-55 is now the summary across the two paths.
- It names F-73 and F-137, which own each path's rule.
- The detail moves to the two rungs that built the inference. The old detail, `evidence-B.md`, was taken at `219cd7038`, before the inference was built.
- Row 412 now says why it is there: a parameter that nothing fixes takes its bound, which is `Object` on the compile path (F-78, P-48).
- `InferCoercion*` is spelled out as its two tests.

Second round: "a static argument that only the result names is not fixed" now says what happens instead, with row 510's example.

Sources: F-73, F-137, P-74, F-87; rows 510 and 412; F-78; the two rung reports as F-73 and F-137 cite them.

Questions for the curator: none.

## F-56

> - F-56 **The compiled checker keeps the expected type, for inferring the call's static arguments, at a call written `f(x)`, which the parser builds as a tight juxtaposition: `f` and `(x)` with no space between.** It keeps it at a method call and an operator too; F-87 lists the other contexts. Only desugarings reach the `fnApp = true` path of `scala_src/typechecker/impls/Operators.scala:88-90`, so an edit of that path alone changes nothing for a call written `f(x)`. Gated by `compiler_tests/InferCoercionShapes`. Detail: `reviews/numerics-plan-coordinator/measure-D.md` section 1.

Meaning: one sentence moved out. "The overloading check's comparison of type schemas binds an open variable to `BottomType`, which a call's solver never does (P-48)" goes to the history. Its subject, the instance that an open variable takes, is F-78's. Its source is `compile-ladder/rung-instance-bound/REPORT.md`, decision D1, not the cited `measure-D.md`. P-48 is a ruling, not evidence. See "For the coordinator".

Second round: "tight juxtaposition" is glossed in place, and "keeps the expected type" says what for. `Operators.scala` has its path and lines.

Sources: `measure-D.md` sections 1 and 1.2; `InferCoercionShapes`; `Operators.scala:75-90`, which passes `expected` on both branches.

Questions for the curator: none.

## F-57

> - F-57 **A numeral's type depends on the path and on the library in scope, and in generic code only the getters `x.zero` and `x.one` and the witness `typecase` give a `T` on both paths.** The witness `typecase` is a `typecase` over a function of type `() -> T`, with one clause for each number type (P-78). The checker types a numeral `IntLiteral` or `FloatLiteral` by its form, as the builtin library in scope declares those types (F-79). Walk types an integer numeral by its magnitude, as a `ZZ32`, `ZZ64` or `ZZ`, which it prints `Int`, `Long` and `BigNum`. In code generic over `T extends Integral[\T\]`, `x + 1` fails the checker but runs under walk: no coercion from a numeral into an arbitrary such `T` can be declared, since a generic coercion is refused as a cyclic hierarchy. A numeral bound to `NN32` or `NN64` fails under walk, and `1.5` bound to `RR32` fails on both paths (row 454). Neither path refuses an out-of-range numeral statically: the compiled run raises `Not in range for ZZ32` at run time, and walk refuses it when it runs, at the typed binding it does not fit (row 325). Walk also refuses, against the specification, a numeral beyond `ZZ32`'s range bound to `RR64`, which should hold the float (row 443). Detail: `perf-probes/prelude/distance-triage.md` section 2.3; `reviews/numerics-plan-coordinator/evidence-B.md` sections 3.1, 4.1 and 6.2, measured before the numeral switch (F-79); `x.zero` by reading, not measured.

Meaning: one correction, one sentence taken in.
- "Only walk checks a numeral's range (rows 325, 443)" is now what the rows hold. Row 325: compiled, an out-of-range numeral compiles clean and raises at run time; walk refuses it at the point of use. Neither path refuses statically, as the specification asks.
- F-54's numeral sentence is taken in, with its reason. The title's list of ways now holds `x.zero` as well as `x.one`, as F-54 had it.
- The detail marks `evidence-B.md` as measured before the numeral switch.

Second round:
- The reason for `x + 1` is in `distance-triage.md` section 2.3, not 2.2; the citation is corrected, and the reason now includes the cyclic hierarchy, as that section has it.
- `x.one` and the witness were measured on both paths (`evidence-B.md` section 6.2). `x.zero` rests on reading: section 2.3, and `Integral`'s `DIVIDES`, which writes `self.zero` in the library that walk runs. The entry now marks it.
- Row 443 sat among the range checks and read as a correct refusal. It is a defect: the specification makes the binding hold the float. The entry now says so.
- "The library in scope" now says how it acts: the checker resolves `IntLiteral` and `FloatLiteral` in the builtin library in scope. Walk's `Int`, `Long` and `BigNum` are named as what walk prints for its three integer types. The witness `typecase` is glossed. "Where it is used" is now "when it runs, at the typed binding it does not fit".

Sources:
- F-79; row 454; rows 325 and 443.
- The coercion into `T` and `x.zero`: `distance-triage.md` section 2.3; `FortressLibrary.fss:674`.
- The library in scope: `compiler/Types.java:61-62`; `evidence-B.md` section 3.1, "one checker line gives two different types".
- Walk's numeral types and printed names: `evidence-B.md` section 4.1.
- `x.one` and the witness on both paths: `evidence-B.md` section 6.2.

Questions for the curator: none.

## F-58

> - F-58 **When measured, on an earlier library, microGPT's flat program, C4, had 26 errors of its own under the compiled checker, and none came from a numeral's type.** 15 were arrays without sizes: `Array[\RR64,ZZ32\]` where the library wants `Vector`, `Matrix` or `Array3`. 5 were numeral powers such as `10.0^(-5)`, refused as ambiguous because two declarations of `^` each needed the integer converted (row 533). 6 were small slips. On a copy patched with decision D's diff, which sizes the model's arrays and is not applied before PLAN's phase 5 (P-87), 14 remained: the 5 powers, 3 `DOT` calls that failed on the api's unused sizes, 1 bridge, `adam`'s, that passes arrays sized only at run time, and 5 small slips. Since then the 17 vector and matrix operators' unused sizes are gone (F-35), so by reading the 3 `DOT` refusals are cleared. Since then too, `MultiplicativeRing`'s `^` takes an `AnyIntegral` exponent, and `RR64` declares `^(self, b:AnyIntegral)` beside its `^(self, b:RR64)` (`Library/FortressLibrary.fsi:283`, `:365-366`). Whether the powers still tie, and between which two declarations, is not measured. Each count is a floor, since the checker stops a block at its first failing statement (row 474). Detail: `reviews/array-design-ways.md` section 2; `compile-ladder/rung-integer-power/REPORT.md` section 7.

Meaning: scope bounded; one gap added.
- The title stated a current count. It is now bounded to its measurement, in the past tense.
- "Gone since climb batch 20's rung A" is now a reading from F-35, as `rung-array-sites/REPORT.md` section 7 has it.
- Added: since the integer-power rung, the declarations of `^` have changed, and the power rung's report says that whether the powers still tie "is not measured".
- "Decision D's diff" is named by what it does, with P-87.

Second round:
- The first round said that both declarations of `^` that row 533 names have changed. That is false. `MultiplicativeRing`'s `^` changed, and `RR64` gained a third declaration; `RR64`'s `^(self, b:RR64)` stands at `FortressLibrary.fsi:365`. The entry now says what changed.
- "The unused sizes are gone" was broader than F-35, which keeps 8 dead sizes in the api. What went were the 17 vector and matrix operators' sizes, on which the `DOT` calls failed.
- The 14 were measured on a copy patched with decision D's diff, which P-87 does not apply before phase 5. The cold reader took 14 as a lower bound on C4's count today; the entry now says that the diff is not applied.
- The bridge is named as `adam`'s.

Sources: `array-design-ways.md` section 2 ("1 is the `adam` bridge"); F-35; `rung-array-sites/REPORT.md:160`; `rung-integer-power/REPORT.md` section 7; `FortressLibrary.fsi:283`, `:365-366`; P-87; rows 533 and 474.

Questions for the curator: none.

## F-59

> - F-59 **`SUM` and `PROD` take their identity from the static argument, and the compiled checker needs that argument written in every clause form.** It builds P-78, with a witness `typecase`, a `typecase` over a `() -> T` function with one clause for each number type. The compiled checker takes the element type from neither the clauses nor a declared type that receives the value (row 731; P-78). So for a generic big operator whose bound names its parameter, such as `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, an unwritten static argument has no instance at its bound, and the call is refused. A plain-bounded big operator takes its bound, or the reduction's expected type where the bound does not fit (F-221). Walk runs such a call: it instantiates the big operator at its value's declared type, else at its elements' join, and leaves the parameter open only with neither (F-228, F-143). C4 writes the static argument, as the team's tests do: `SUM[\ZZ32\][j <- 0#i] matCount(j)`. `SUM e` over a collection `e`, and `x DOT y`, need none (P-78). Gated, for the witness and a plain bound, by `compiler_tests/WitnessIdentityRungG` and `InferBigOperatorUnwritten`; the refusal is row 731's, and no test pins it. Detail: `reviews/sum-replacement-judgement.md` section 5, Table 2, measured before P-48; row 731 gives today's mechanism.

Meaning: two corrections of scope, one of mechanism.
- "Every generic big operator" is now those whose bound names the parameter, such as the four named; `BIG MINMAX`'s bound names its parameter too (`FortressLibrary.fsi:1984-2019`). F-221 gives the plain-bounded case.
- "Where nothing at the call fixes the element type" is now every clause form. The checker never takes the element type from the clauses (row 731; the judgement's Table 2, `SUM[j <- lo#i] (3 j)` "refused") nor from a declared type that receives the value (P-78). The record's text and the first round both let a reader think that the clauses can fix it.
- Walk's mechanism is now F-228's: walk leaves the parameter open only where the reduction has neither a declared type nor an element. The old "walk leaves an F-bounded `T` open" predates F-228.

Second round: the three changes above; the plain-bounded case now takes its bound first, as F-221 and `InferBigOperatorUnwritten` have it; the gates are said not to pin the refusal; "F-bounded" is now the core's phrase, "whose bound names its parameter"; the witness `typecase` and `SUM e` are glossed.

Sources: P-78; row 731; the judgement section 5, Table 2; F-221; F-228; F-143; `revival-changes.md`, "A type parameter whose bound names itself, under walk"; `run-c4/src/MicroGptFlat.fss:43`; the gates.

Questions for the curator: none.

## F-60

> - F-60 **The coercions between number types carry a sum's zero and a product's one into every wider type by themselves, but not a maximum's identity.** A coercion keeps the arithmetic, on both paths. A maximum's identity is its type's least element, which a coercion does not carry; `ZZ` and `QQ` have none. The library's generic `BIG MAX` and `BIG MIN` have no identity, so an empty one raises `EmptyReduction`. `tests/simpleSum` asserts it for `BIG MIN`; an empty `BIG MAX` raised under walk when measured (`reviews/flattening-questions-ways.md`, "Question 1", section 2). A reduction makes its identity at its own type (P-78). Detail: `reviews/max-min-identities-judgement.md` sections 1 and 2.

Meaning: unchanged; one citation corrected. `tests/simpleSum` asserts the empty `BIG MIN`, not `BIG MAX`. No test asserts an empty `BIG MAX`; the flattening note measured it under walk. `BIG MIN` is named beside `BIG MAX`, as P-78 has it.

Second round: no change; the check passes it.

Sources: the judgement sections 1 and 2; `simpleSum.fss:57-59`; the flattening note, Question 1, section 2; P-78.

Questions for the curator: none.

## F-61

> - F-61 **`perf-probes/prelude/REPORT.md` named three steps to making the interpreter's library the compiler's: the checker's sizes and the tower's errors are done, and the natives are PLAN's phase 4.** The steps are: the checker checks `nat` and `int` static parameters (F-67); the library api's errors from the number and comparison tower are cleared (F-131); and the native bindings move to the compiled path's helpers (F-32; PLAN phase 4, "The natives"). The report's run stopped in the library's apis, before the component, desugaring and code generation (section 5). The component's errors since are the distance, which must also reach zero before the switch-over (F-53; PLAN phase 3). No minimal `Array` or `Vector` added to the compiler's prelude can serve C4's `FlatArrays` (`run-c4/src/FlatArrays.fss`), which extends the library's array hierarchy and uses its whole protocol. Such a shim would reproduce `NativeArray.fss` and about 1,000 lines of the library above it. Detail: the same report, sections 5 (the steps) and 4 (the shim).

Meaning: one correction of scope. The record's "takes three steps" read as the whole way. The report named three steps from a run that stopped in the library's apis; it never reached the component, desugaring or code generation ("DESUGAR and CODEGEN: untested"). The entry now says that the report named them, and that the distance is further work. The three steps are named by what they are, from the report's section 5.

Second round: the change of scope above; the shim is now one for the compiler's prelude, and `FlatArrays` is named as C4's file, which extends the library's array hierarchy (section 4).

Sources: `perf-probes/prelude/REPORT.md` sections 4 and 5, "92 errors at TYPECHECK, in the library's *apis*, before the component is opened", "DESUGAR and CODEGEN: untested"; F-67, F-131, F-32, F-53; PLAN phases 3 and 4.

Questions for the curator: none.

## F-63

> - F-63 **The one library's api declares `String`'s `split` and `splitWithOffsets` once, abstract; redeclares no `zip` in `List`, where the inherited `ZeroIndexed.zip` serves; has `Condition.map` return `Condition[\G\]`, the component's type; and closes `QQ` by `comprises { ... }`.** `Condition` is the sequential generator trait at `Library/FortressLibrary.fsi:913`. In their earlier forms, the pair declared twice and `List`'s `zip[\F\](other: List[\F\])`, the checker refused the api (measured). The other repairs tried, the plain pair kept once and a `zip` narrowed to `ZeroIndexed`, read the same count; the forms kept follow the specification's export rules (the report's Decisions). The `Condition.map` error was seen only under a checker change that did not land; otherwise it is read from the export check's comparison of return types, and no test gates that edit. `QQ`'s clause lists no type, since its one value type `Ratio` is private to the component, and an api may leave out a private type only by `...` (`Library/FortressLibrary.fsi:398`). No api-declared type extends `QQ`, so F-64's refusal, which falls on such a type, does not arise. Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Summary", "Decisions" and "Defects and their homes".

Meaning: two corrections of evidence; the `QQ` clause in the title.
- "Declared otherwise, each is an error of the checker on the api" is split by its evidence. The `Condition.map` error was seen only under rung P's relaxation, which did not land, and is otherwise read from the export check (`ExportChecker.scala:598-610`).
- "With the `split` pair or `zip` declared otherwise, the checker refused the api" claimed more than was measured. The rung measured only the earlier forms. The other repairs it tried read the same count as the kept ones, and the kept forms follow the specification's export rules. The entry now says so.
- `QQ`'s clause is given from the tree, `comprises { ... }` at `FortressLibrary.fsi:398`. The report's "What changed" gives `comprises { AnyIntegral, ... }`. The reason for `...`, a private type, is in the report's Summary.

Second round: the second correction above; the pair is named as `split` and `splitWithOffsets`, the `zip` by its earlier declaration and the inherited one; `Condition` is placed; "F-64's refusal misses it" now says why.

Sources: the report's Summary, Decisions ("Both choices read 103"; "Both read 103 (zipnarrow-noP)") and "Defects and their homes", families D and F; `Specification/basic/components/source-code.tex:372-384`, `:399-404`, as the Decisions cite them; `FortressLibrary.fsi:396-398`, `:913`, `:1333`, `:2483-2484`; `FortressLibrary.fss:580`; `ExportChecker.scala:598-610`; F-64.

Questions for the curator: none.

## For the coordinator

- **F-78 and the `BottomType` sentence.** F-56's sentence, that the overloading check's comparison of type schemas binds an open variable to `BottomType`, is now only in F-56's history. F-78 owns the subject. Its source is `compile-ladder/rung-instance-bound/REPORT.md`, decision D1. F-78 is not in this chunk.
- **F-94 and the timing.** F-54's pre-memo timing of the array bound with `StandardMinMax[\T\]` is now only in F-54's history and in `distance-triage.md` section 3.4. F-94 owns the subject.
- **The core's glossary on the count stage.** It says that the count "counts the errors up to each component's first error". It does not say that the count checks only the `FortressLibrary` component. See `concepts.md`.
- **Evidence gaps**, each needing a run:
  - whether today's count stage refuses the api if `Condition.map` returns another type (F-63);
  - whether C4's powers still tie, and between which two declarations of `^` (F-58);
  - whether the array bound with `StandardMinMax[\T\]` still exceeds the count stage's limit with row 688's memo (F-94).
- **Not run.** `record.py apply` and `check` were not run on `proposals.apply`, since this session's permissions refuse `record.py`.
