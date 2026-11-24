<!-- The claims of each FACTS entry of chunk checker-2 (F-63 to F-92, section "The checker and the one library"), each with its subject, its kind, the other entries that say the same, and what today's checks say of it, as the first step of the sorting map for the batch-mode consolidation of 2026-11-24; written by a worker that read FACTS as it stood on 2026-11-24 and judged nothing new. -->

Conventions. Each claim: its sentence; then *subject* | *kind*. "Overlap" is given for the kinds property, defect and choice, from a grep of every FACTS entry for the words given in quotes ("searched"). "Checks" copies today's findings: S2 = `evidence/consolidation/scout-checker-2.md`, SC = `evidence/stale-claims.md`, both in the post-mortem folder. "Sound" means the scout found the cited thing and that it agrees; "not checked" means neither source speaks of the claim. Rows are gap-ledger rows; their status is the scout's.

## F-63 "The one library's api declares `String`'s `split` and `splitWithOffsets` once, abstract"

Claims:
1. The api declares `String`'s `split` and `splitWithOffsets` once, abstract. *the library: api declarations* | property
2. `List` redeclares no `zip`; the inherited `ZeroIndexed.zip` serves. *the library: api declarations* | property
3. `Condition.map` returns `Condition[\G\]`, the component's type. *the library: api declarations* | property
4. `QQ` is closed by `comprises { ... }`, since its one value type `Ratio` is private. *the library: api declarations* | property
5. In their earlier forms the pair and `List`'s `zip` made the checker refuse the api; the other repairs tried read the same count. *the library: api declarations* | history
6. The forms kept follow the specification's export rules (the report's Decisions). *the library: api declarations* | choice
7. The `Condition.map` error was seen only under a checker change that did not land; otherwise it is read from the export check, and no test gates the edit. *the library: api declarations* | history
8. No api-declared type extends `QQ`, so F-64's refusal does not arise. *the checker: ellipsis comprises* | property

Overlap:
- 1: F-286 (the api writes `abstract` on `split`, `splitWithOffsets`), F-297 (the 12 members the component lacked, among them both). Searched "splitWithOffsets".
- 2: none found (F-396 names `zip` for another point). Searched "zip".
- 3: none found. Searched "Condition.map", "Condition[\G\]".
- 4, 8: F-64 (row 354), F-72. Searched "comprises { ... }", "row 354".
- 6: none found. Searched "export rules".

Checks: claim 1's reason (the component defines neither `split`) is stale since `cc47b637d8`, the form holds: false today (SC, F-63, pilot). "No test gates that edit" stale in part: false today (SC, F-63). The report's `QQ` clause differs from the tree: cites a thing that is gone (SC). The ground of the `Condition.map` error (override rule or export check) is unsettled (SC). The referents of claims 5 and 7 are not in the entry: unsettled (SC). The cited line of `trait Condition` moved, now `:1008`: cites a thing that is gone (SC; S2). Same claim as F-286 and F-297, rows 355 and 357 not named: unsettled (SC). Rows 355 and 357 are open (SC, F-63).

Shape: several subjects inside the library's api (four separate repairs) and mostly history. Title: four api forms; the body tells how each came about, which serves the title only in part.

## F-64 "The compiled checker refuses every type that an api declares ... that extends a trait whose `comprises` clause has `...`"

Claims:
1. The checker refuses every api-declared type that extends a trait whose `comprises` has `...`, listed or not (row 354). *the checker: ellipsis comprises* | defect (row 354)
2. So `comprises { T, ... }` cannot stand in an api that declares `T`. *the checker: ellipsis comprises* | property
3. The refusal runs only when the checker checks an api, so a component's types may extend such a trait. *the checker: ellipsis comprises* | property
4. The specification allows `...` in an api and a listed extender; only a draft note refuses it, and a release build leaves draft notes out. *the specification: ellipsis comprises* | property
5. `XXX3q` and `XXX10p` pin the refusal, so a fix for listed types turns them red. *the checker: ellipsis comprises* | tests

Overlap:
- 1: F-72 ("leaves the ellipsis refusal of F-64 (row 354, open)"), F-63. Searched "row 354", "ellipsis".
- 4: F-171 (the specification's reading of `comprises`). Searched "traits.tex".

Checks: tests found; row 354 NEGATIVE-VERIFIED, agrees; `traits.tex` heading found (S2). No SC finding.

Shape: mostly a defect (the checker: ellipsis comprises, row 354). Title: the refusal; the body serves it.

## F-65 "The checker memoizes `TypeAnalyzer.parents` and `excludesClause` per trait table"

Claims:
1. The checker memoizes `parents` and `excludesClause` per trait table, and the memo changes no answer. *the checker: trait-table memo* | property
2. `FORTRESS_ANALYZER_CLAUSES_CACHE=false` turns it off. *the checker: trait-table memo* | detail
3. By reading, both functions depend only on the table and the type. *the checker: trait-table memo* | property
4. A differential on climb batch 7C's tree gave the same 626 and 75 errors with the memo off and on. *the checker: trait-table memo* | history
5. With the memo off the count stage took 1,149 s against 112 s. *the checker: time* | detail
6. F-240 gives today's time with the memo on; with it off, not measured since. *the checker: time* | pointer

Overlap:
- 1, 3: F-255 (reads `excludesClause`; "none of these readers moved a result"). Searched "excludesClause", "parents", "memo" (F-43, F-80 are the overloading memo, another memo).

Checks: `TraitTable.scala:116-121` agrees (S2). The literal `FORTRESS_ANALYZER_CLAUSES_CACHE` is not in the source; the code reads `fortress.analyzer.clauses.cache`: cites a thing that is gone (SC, F-65; S2).

Shape: one subject (the checker: trait-table memo). Title: the memo changes no answer; the body serves it, with timings as detail.

## F-66 "The checker-count stage's table, `gate/checker-count.txt`, lands with every batch"

Claims:
1. The checker-count table lands with every batch beside the gate's `summary.txt`. *the harness and the gate: checker count and distance* | property
2. Its total at the last landed gate is F-53's count. *the harness and the gate: checker count and distance* | pointer
3. Step 8 of a batch's gate compares it with the newest landed table. *the harness and the gate: checker count and distance* | detail
4. The total is never red on its own (P-39), since a fix can raise it and two rungs' effects do not add. *the harness and the gate: checker count and distance* | property (pointer P-39)
5. The gate is red on an undeclared crash line, a table with no total, and a stale shadow `StaticChecker`. *the harness and the gate: checker count and distance* | property

Overlap:
- 1, 4, 5: F-53 (the tables, "turns no gate red on its own", "the faults that F-66 names"). Searched "checker-count.txt", "P-39", "expectedCheckerCrash", "shadow".

Checks: `run.sh`, the shadow copy and the tracked `StaticChecker` found (S2). "A `#stopped` table is red" was made true: false today (SC, F-66). `gate/checker-count.txt` is under `climb-batch-N/gate/`, not `compile-ladder/gate/`: cites a thing that is gone (SC, F-66; S2).

Shape: about how the project works (the gate's procedure), one subject. Title: the table lands with each batch; the body serves it.

## F-67 "The compiled type checker checks `nat` and `int` static parameters"

Claims:
1. The checker checks `nat` and `int` static parameters (P-40). *the checker: sizes* | property
2. A size is a parameter name, a literal or an operation on sizes; two sizes are equal when their written forms are once numerals are computed. *the checker: sizes* | pointer (F-146)
3. The checker refuses to infer a `bool`, `dim` or `unit` static argument. *the checker: sizes* | property
4. It does not compare `bool` arguments, so `Flag[\true\]` beside `Flag[\false\]` passes and code generation stops (row 406). *the checker: exclusion rule* | defect (row 406)
5. A call that leaves a size unknown is refused, "Could not infer static argument ... without context". *the checker: sizes* | property (pointer F-69)
6. The five `Nat*Checker` tests. *the checker: sizes* | tests

Overlap:
- 1: F-20 ("The compiled checker checks them (F-67)"), F-61. Searched "nat` and `int`".
- 2: F-146. Searched "m n".
- 3: F-36 ("the checker refuses the first three by name (F-67)"). Searched "XXXNatBoolChecker".
- 4: F-48, F-167 (the same example, row 406). Searched "row 406", "Flag[".
- 5: F-69 (same message). Searched "Could not infer static argument".

Checks: tests found; row 406 NEGATIVE-VERIFIED, agrees (S2). Status words cut ("still to build", "the curator has not decided", shared with F-75 and F-90): false today (SC, F-67).

Shape: one subject (the checker: sizes), with row 406 that F-48 owns. Title: sizes are checked; the body serves it.

## F-68 "The checker's return-type rule reads a size as it reads a type parameter"

Claims:
1. The checker's return-type rule reads a size as it reads a type parameter: an unsolved size of the less specific declaration stays its own parameter, as `overloading-check.tick` binds `Δ2`. *the checker: sizes* | property
2. So `Dn[\T,3,s\]` over `Up[\T,b,s\]` is refused, and the library's `subarray` override passes. *the checker: sizes* | detail
3. `NatOverrideChecker`, `XXXNatRetSizeChecker`. *the checker: sizes* | tests

Overlap:
- 1: F-38 ("the checker's return-type rule compares the arms' own sizes (row 410)"). Searched "NatOverrideChecker", "overloading-check.tick", "row 410".

Checks: tests and the paper file found (S2). No SC finding.

Shape: one subject (the checker: sizes). Title: sizes read as type parameters in the rule; the body serves it.

## F-69 "The compiled checker refuses a call whose most specific arm failed only on a size"

Claims:
1. The checker refuses a call whose most specific arm failed only on a size the call cannot fix, when that arm's parameter types are free of the size, "Could not infer static argument nat n without context". *the checker: sizes* | property
2. It drops instead an arm whose unknown size is in its own parameter types (row 400). *the checker: sizes* | defect (row 400)
3. It lets through a call whose argument's static type lies above the arm's domain, and the run dies reading the size (row 446). *the checker: sizes* | defect (row 446)
4. It builds P-40. *the checker: sizes* | pointer
5. `NatKnownSizeArm`, `XXXNatUnknownSize*`; rows 400 and 446 have no test. *the checker: sizes* | tests

Overlap:
- 1: F-67 (the same message). Searched "Could not infer static argument".
- 2: F-50 (row 400, walk runs such arms). Searched "row 400".
- 3: none found. Searched "row 446".

Checks: tests found; rows 400, 446 NEGATIVE-VERIFIED, agree (S2). No SC finding.

Shape: one subject (the checker: sizes); two defects with rows. Title: refusal on an unfixed size; the body serves it.

## F-70 "The compiled checker checks a static argument written at a dotted method call against its parameter's bound"

Claims:
1. At a dotted method call the checker checks written static arguments against their bounds and refuses a miss, "No such method" (row 651, fixed). *the checker: written static arguments* | property
2. At a top-level call it matches kinds only, so `n[\String\]("d")` passes for a `Number`-bounded parameter (row 470). *the checker: written static arguments* | defect (row 470)
3. `MethodStaticArgsBoundNamesOther*` accept; no test pins the refusal, a probe showed it. *the checker: written static arguments* | tests
4. Row 470 can have no gated test, since the harness has no form for a program the specification refuses and the checker accepts. *the harness and the gate: test forms* | property

Overlap:
- 2: F-291, F-244, F-250, F-256 (row 470). Searched "row 470".
- 1: none found. Searched "row 651", "No such method".
- 4: none found. Searched "no form".

Checks: tests found; row 470 NEGATIVE-VERIFIED, 651 FIXED, agree (S2). No SC finding.

Shape: one subject (the checker: written static arguments), with a harness limit beside it. Title: bound checked at dotted, not top-level, calls; the body serves it.

## F-71 "The compiled checker does not narrow the variable of the shorthand form `typecase x of T`"

Claims:
1. The checker does not narrow the variable of `typecase x of T => ...`; a clause that uses `x` as a `T` is refused, and runs under walk only. *the checker: typecase narrowing* | defect (row 460)
2. Neither path accepts `typecase x = e of`; it parses as the equality `x = e`, and only the specification's grammar has it, under the team's note (`typecase.tex:15`). *the specification: typecase binding form* | defect (row 460)
3. The clause-binding form `typecase e of y: T => ...` runs on both paths. *the checker: typecase narrowing* | property
4. So write the clause-binding form, as the library's `cast` does (F-134). *the library: typecase forms* | property
5. Row 460 records both refusals, and no test gates them. *the checker: typecase narrowing* | tests

Overlap:
- 1 to 3: none found. Searched "typecase x of", "typecase x =", "clause-binding", "row 460". F-382 holds a tuple binding form, another construct.

Checks: `typecase.tex:15` note found; row 460 NEGATIVE-VERIFIED, agrees (S2). No SC finding.

Shape: one subject (the checker: typecase narrowing, with the binding form on both paths), mostly a defect. Title: three forms and which runs; the body serves it.

## F-72 "The compiled checker reads a `comprises` clause for a generic subtrait as the team's 2012 texts do"

Claims:
1. The checker lets a generic subtrait extend a closed trait when the trait table knows at least one immediate extender and each is below a listed type (P-44). *the checker: comprises clauses* | property
2. This leaves F-64's ellipsis refusal (row 354) as it was. *the checker: ellipsis comprises* | pointer
3. An extender in another compilation unit escapes the check (row 487). *the checker: comprises clauses* | defect (row 487)
4. The verdict changes when the extender renames its type variable (row 489). *the checker: comprises clauses* | defect (row 489)
5. Extenders are found by the simple text of the trait's name (row 490). *the checker: comprises clauses* | defect (row 490)
6. `ComprisesGenericSubtrait`. *the checker: comprises clauses* | tests

Overlap:
- 1: F-62, F-171 (the specification states the rule). Searched "P-44", "ComprisesGenericSubtrait".
- 3: F-76, F-171, F-175 (row 487). Searched "row 487".
- 4, 5: F-171 (rows 489, 490: "the compiled checker departs in three ways"). Searched "row 489", "row 490".

Checks: test found; rows 354, 487, 489, 490 NEGATIVE-VERIFIED, agree (S2). No SC finding.

Shape: one subject (the checker: comprises clauses). Title: the rule for a generic subtrait; the body serves it, and its three defects repeat F-171.

## F-73 "The compiled checker infers a generic's static arguments with coercion"

Claims:
1. A type parameter that is the whole type of each parameter it occurs in takes the narrowest type that all its arguments convert into and its bound permits (P-74, P-49). *the checker: static-argument inference* | property
2. It looks among the arguments' types, their coercion targets and its bound, the bound only when a trait other than `Object` or `Any`. *the checker: static-argument inference* | detail
3. A coerced declaration ranks below one that needs no coercion; a tie among coerced ones is refused, "Ambiguous coercion", outside three cases. *the checker: overload choice with coercion* | property
4. A parameter fixed by numerals alone takes the narrowest default holding them. *the checker: numerals* | pointer (F-342)
5. Where tied declarations differ only at numeral positions, the checker reads the numeral as `ZZ32`, `ZZ64` or `ZZ` (P-173). *the checker: numerals* | property
6. The coercion attempt refuses a call with an untyped function argument (row 507). *the checker: static-argument inference* | defect (row 507)
7. It refuses a call beyond 64 combinations of candidate types (row 506). *the checker: static-argument inference* | defect (row 506)
8. Four tests. *the checker: static-argument inference* | tests

Overlap:
- 1: F-55, F-51, F-137 (walk's twin), F-173. Searched "narrowest", "P-74", "NatLitArgChecker".
- 3: F-349 (walk's choice among coerced declarations). Searched "Ambiguous coercion".
- 5: F-74, F-342, F-407 (P-173). Searched "P-173".
- 6: F-78 (row 507). Searched "row 507".
- 7: none found. Searched "row 506".

Checks: tests found; rows 506, 507 NEGATIVE-VERIFIED, agree (S2). No SC finding.

Shape: one subject (the checker: static-argument inference), with numeral and ranking rules beside it. Title: inference with coercion; the body serves it.

## F-74 "Under walk, an integer numeral where nothing fixes a type takes its default by its value"

Claims:
1. Under walk an integer numeral where nothing fixes a type is a `ZZ32`, `ZZ64` or `ZZ` by its value (P-173). *walk: numerals* | property
2. Where a place fixes a type walk converts it from its four numbers. *walk: numerals* | pointer (F-79, F-341)
3. Its run-time type is the one library's value object, so walk infers `Box(3)` as `Box[\ZZ32\]` and `<|1, 2, 3|>` as `ArrayList[\ZZ32\]`. *walk: numerals* | property (pointers F-379, F-344)
4. A size used as a value is a `ZZ32` up to 2^31-1 and a `ZZ64` above, where P-173 makes it a `ZZ32` (row 962). *walk: sizes as values* | defect (row 962)
5. The detail is a probe of an earlier design. *walk: numerals* | history

Overlap:
- 1, 2: F-341 ("An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value"), F-342, F-57. Searched "P-173", "by its value".
- 3: F-344, F-258, F-184 (`Box[\ZZ32\]`). Searched "Box[\ZZ32\]".
- 4: F-129, F-140 (row 962). Searched "row 962".

Checks: row 962 CONTESTED; the entry does not say so (S2 reports the status; SC lists no finding). `sources.md:1193` cites "row 962 (F-74, F-140)"; "F-74 is now F-341" (SC, skill sentences, from the writer of checker-2).

Shape: one subject (walk: numerals), with a size defect beside it. Title: walk's default by value; claims 1 and 2 repeat F-341.

## F-75 "The compiled checker checks the Return Type Rule over every instance ... and a positional rule"

Claims:
1. The checker checks the Return Type Rule over every instance, save those whose domain cannot meet an object type. *the checker: overloading rules* | property
2. It checks a positional rule: two generic declarations in the more-specific relation with as many static parameters agree in kind by position, and the return types compare by position. *the checker: overloading rules* | property
3. The equal-count scope and the comparison of kinds are the rung's choices. *the checker: overloading rules* | choice
4. The exception for instances that cannot meet is a worker's width, not the curator's. *the checker: overloading rules* | choice
5. The 2011 paper sets aside every instance whose domain is `Bottom`. *the specification: overloading model* | property
6. So `ident[\T\]` beside `ident(x: Circle)` is accepted and runs (row 542, fixed; F-376). *the checker: overloading rules* | property
7. At a tuple of object types the rule still compares instances that cannot meet, and wrongly refuses the pair (row 1048). *the checker: overloading rules* | defect (row 1048)
8. In the interpreter's library the two rules refuse no pair (F-53). *the harness and the gate: checker count and distance* | pointer
9. The accepting and refusing tests. *the checker: overloading rules* | tests

Overlap:
- 1, 2: F-174 (the specification gives the positional restriction as the compiled path's), F-50 ("by its Return Type Rule and by its positional rule"), F-44. Searched "positional rule", "Return Type Rule".
- 3, 4: none found as choices elsewhere. Searched "rung's choices", "a worker chose".
- 6: F-361, F-376 (row 542). Searched "row 542".
- 7: F-174 (row 1048). Searched "row 1048".

Checks: tests found; rows 542 FIXED, 1048 NEGATIVE-VERIFIED, agree (S2). Status words cut ("the curator has not decided", shared with F-67 and F-90): false today (SC, F-75).

Shape: one subject (the checker: overloading rules), with two worker's choices. Title: the two rules as built; the body serves it.

## F-76 "The compiled checker accepts the specification's `comprises` example of the Meet Rule"

Claims:
1. The checker accepts the specification's `comprises` example of the Meet Rule by a coverage check used only in overload checking (P-60). *the checker: Meet Rule by coverage* | property
2. It types a call whose argument lies between closed traits and their listed types by the intersection of its most specific declarations' return types, when they tie without coercion. *the checker: Meet Rule by coverage* | property
3. Coverage refuses a pair when a declaration has static parameters (row 546). *the checker: Meet Rule by coverage* | defect (row 546)
4. It takes the intersection only where the tied and more specific declarations have no static parameters; F-408 gives the other ties. *the checker: Meet Rule by coverage* | property (pointer)
5. A method call on a value typed by the intersection runs on the chosen conjunct (F-386). *the code generator: intersection receivers* | pointer
6. A generic declaration instantiated at an intersection type dies as it loads (row 559). *the compiled runtime: intersection types* | defect (row 559)
7. The checker checks `comprises` only at the closed trait's immediate subtypes (row 487). *the checker: comprises clauses* | defect (row 487)
8. Its verdict can depend on the components compiled before it in the same JVM (row 547). *the checker: Meet Rule by coverage* | defect (row 547)
9. `*Comprises*`, `*CoverageReturn*`. *the checker: Meet Rule by coverage* | tests

Overlap:
- 1, 2: F-175 (the specification reads `comprises` at the level of values; the intersection), F-27, F-408, F-386. Searched "P-60", "coverage", "intersection".
- 3, 8: F-175 (rows 546, 547). Searched "row 546", "row 547".
- 6: F-78 (row 559). Searched "row 559".
- 7: F-72, F-171, F-175 (row 487). Searched "row 487".

Checks: tests found; the specification's section and label found (S2). The entry calls rows 487, 546, 547, 559 open; row 547 is CONTESTED: a ledger row's status disagrees (SC, F-76; S2).

Shape: several subjects (the checker: Meet Rule by coverage; the checker: comprises clauses; the compiled runtime: intersection types). Title: the coverage check and the intersection typing; the defects are beside it, and three repeat F-175.

## F-77 "The one library repairs its refused overload families with its own exclusions"

Claims:
1. The one library repairs its refused overload families with its own exclusions (P-45). *the library: overload families* | property
2. The checker accepts its `seq` pairs by the rule for functional methods. *the checker: overloading rules* | pointer (F-80)
3. `StandardMin`, `StandardMax`, `SequentialGenerator`, `FilterGenerator` exclude `HasRank`, `String` excludes `AnyMultiplicativeRing`, `TotalComparison` extends `StandardMinMax` (P-98). *the library: overload families* | detail
4. Marker traits instead would give two ordered types several minimal common supertypes, which walk mishandles (rows 555, 589). *walk: several minimal supertypes* | defect (rows 555, 589)
5. `LibraryOverloadFamilies.fss`. *the library: overload families* | tests

Overlap:
- 1, 3: F-44 (`TotalComparison extends StandardMinMax`), F-286 (`String`'s `excludes` clause). Searched "HasRank", "TotalComparison", "AnyMultiplicativeRing".
- 4: F-141 (row 589). Searched "row 589", "row 555".

Checks: test found; rows 555 CONTESTED, 589 NEGATIVE-VERIFIED (S2). Row 555 was not called contested; it now is: a ledger row's status disagrees; the scout and the writer disagree (SC, F-77).

Shape: one subject (the library: overload families). Title: repairs by exclusions; the body serves it.

## F-78 "The compiled checker instantiates a type parameter that nothing at a call fixes at the intersection of its upper bounds"

Claims:
1. A type parameter that nothing at a call fixes takes the intersection of its upper bounds, never `BottomType` (P-48). *the checker: static-argument inference* | property
2. Where the call has an expected type, its attempts are: subtyping without it, subtyping with it, coercion with it, coercion without it. *the checker: static-argument inference* | property
3. The second lets a call whose untyped function argument only the expected type fixes check, since the coercion attempt cannot (row 507). *the checker: static-argument inference* | property (row 507)
4. P-49 decides the first and the third; the second and the fourth are the instance-bound rung's choice (D4). *the checker: static-argument inference* | choice
5. An argument of intersection type fixes a parameter at the whole intersection (row 541). *the checker: static-argument inference* | property (row 541 fixed)
6. The run time has no class for an intersection, so such an instance dies as it loads (row 559). *the compiled runtime: intersection types* | defect (row 559)
7. `InferResultOnly*`, `InferContextKeepsFit`. *the checker: static-argument inference* | tests

Overlap:
- 1: F-84 (P-48 "the intersection of its upper bounds"), F-141 and F-143 (walk's twins), F-173, F-271. Searched "BottomType", "P-48", "intersection".
- 2: F-87 (contexts of the expected type). Searched "D4", "InferResultOnly".
- 3: F-73 (row 507). Searched "row 507".
- 4: none found. Searched "D4", "an agent's choice".
- 6: F-76 (row 559). Searched "row 559".

Checks: tests found; rows 507 NEGATIVE-VERIFIED, 541 FIXED, 559 NEGATIVE-VERIFIED (S2). `Functionals.scala:962-966` does not hold the attempt order: cites a thing that is gone (SC, F-78; S2).

Shape: one subject (the checker: static-argument inference), with one run-time defect. Title: the instance at the bounds and the order of attempts; the body serves it.

## F-79 "In the interpreter's library, the numeral types are `NaturalNumeral` ... and `RadixPointNumeral`"

Claims:
1. In the interpreter's library the numeral types are `NaturalNumeral[\n, r, v\]` and `RadixPointNumeral[\n, m, r, v\]`, below `Numeral`, a sibling of the number types under `Number` (P-174). *the library: numeral types* | property
2. They lie below `AnyNaturalNumeral` and `AnyRadixPointNumeral`, which exclude each other; none has a method or a run-time value, and no `=` ties them to a number type. *the library: numeral types* | property
3. The integer types and `QQ` convert from `NaturalNumeral` exactly, `QQ` from `RadixPointNumeral` exactly, and `RR64` and `RR32` from both by one rounding through named helpers. *the library: numeral types* | property
4. `Types.INT_LITERAL` and `FLOAT_LITERAL` name these types under both libraries, the prelude declaring them too. *the checker: numerals* | property
5. Under walk a numeral reaches them where its place fixes a type. *walk: numerals* | pointer (F-341)
6. Three walk tests and the count stage's 0. *the library: numeral types* | tests

Overlap:
- 1, 2: F-57, F-342 (`NaturalNumeral` written only as a parameter's type), F-131, F-262. Searched "NaturalNumeral", "numeral types".
- 3: F-304 (one rounding; `numeralToDouble`). Searched "numeralToDouble".
- 4: F-57 (`compiler/Types.java`). Searched "INT_LITERAL", "useCompilerLibraries".

Checks: `FortressLibrary.fsi:456-464`, `Types.java:85-95` and the tests found (S2). No SC finding.

Shape: one subject (the library: numeral types). Title: the two numeral types and their coercions; the body serves it.

## F-80 "The compiled checker judges two functional methods of one name ... by the Meet Rule for Functional Methods"

Claims:
1. The checker judges two functional methods of one name, abstract ones included, by the Meet Rule for Functional Methods in each type that provides both, compared without `self`. *the checker: overloading rules* | property
2. F-88 says what a type provides. *the checker: inheritance and override* | pointer
3. An abstract functional method beside a concrete one with the same parameter types is refused by the No Duplicates Rule. *the checker: overloading rules* | property
4. A pair that only an object expression provides is unchecked (row 570). *the checker: overloading rules* | defect (row 570)
5. It checks every operator, symbolic ones and named ones (F-281). *the checker: overloading rules* | pointer
6. The overloading memo is keyed on all the inputs, so a top-level verdict is not reused in a trait. *the checker: overloading memo* | property
7. Tests and refusals. *the checker: overloading rules* | tests

Overlap:
- 1: F-142 (walk's twin), F-7, F-145. Searched "Meet Rule for Functional Methods", "provides".
- 3: F-223 (No Duplicates, abstract ones included), F-252, F-257, F-274. Searched "No Duplicates".
- 4: none found. Searched "row 570".
- 6: F-43 (the memo per pair hides errors across traits), which reads against it. Searched "memo".

Checks: tests found; row 570 NEGATIVE-VERIFIED, agrees (S2). No SC finding.

Shape: one subject (the checker: overloading rules), with a memo claim beside it. Title: the Meet Rule per providing type; the body serves it.

## F-81 "In the interpreter's library, every Meet Rule pair inside one type ... has a declaration on its meet"

Claims:
1. In the interpreter's library every Meet Rule pair inside one type that the checker checks has a declaration on its meet. *the library: meets* | property
2. The checker checks every operator (F-281). *the checker: overloading rules* | pointer
3. `String`'s juxtaposition is three top-level operators, since functional methods with `self` at different positions have no meet. *the library: strings* | property
4. `String`'s `||`, `|||`, `//`, `///` are three top-level operators each too (F-276). *the library: strings* | pointer
5. `Indexed`'s three subscripts were invalid in 17 types, valid since the index bound (F-278). *the library: meets* | history (pointer F-245)
6. The rung also set declared types to what bodies answer. *the library: meets* | history
7. `__bigOperator2`'s fused branch casts to `O0` (F-85). *the library: generators and reductions* | pointer
8. `LibraryMeetDeclarations.fss`, and the distance stage. *the library: meets* | tests

Overlap:
- 1: F-82 (ranges' meets), F-245, F-281. Searched "LibraryMeetDeclarations", "meet".
- 3: F-276 ("as juxtaposition's are"). Searched "juxtaposition".

Checks: test found (S2). No SC finding.

Shape: one subject (the library: meets), much of it pointers and history. Title: every pair has a meet; the body serves it in part.

## F-82 "In the interpreter's library, the range types declare a method on the meet"

Claims:
1. The range types declare a method on the meet for each Meet Rule pair that the checker checks, and their declared types match their bodies. *the library: meets* | property
2. Among them `CAP` at each rank and `FullRange`'s abstract `IN`, so a numeral `IN` a range type-checks (row 580, fixed). *the library: ranges* | property
3. `Indexed`'s subscripts need no meet since the index bound (F-278). *the library: meets* | pointer
4. The full sequential ranges' `map` answers a `SimpleMappedSeqIndexed`, no `MappedGenerator`, so its `reverse` prints a different string (row 603). *the library: ranges* | defect (row 603)
5. `RangeDeclarations.fss` pins that string and gates the meets. *the library: ranges* | tests

Overlap:
- 1: F-81, F-89 (the ranks' kinds). Searched "RangeDeclarations", "CAP".
- 2: none found. Searched "row 580".
- 4: none found. Searched "row 603", "SimpleMappedSeqIndexed".

Checks: test found; rows 580 FIXED, 603 NEGATIVE-VERIFIED, agree (S2). No SC finding.

Shape: several subjects (the library: meets; the library: ranges), with a defect. Title: ranges declare their meets; the `map`/`reverse` defect does not serve it.

## F-83 "In the interpreter's library, the string components `String.fss` and `FlatString.fss` hold no site of the distance"

Claims:
1. `String.fss` and `FlatString.fss` hold no site of the distance. *the library: strings* | property
2. The rung's repairs are in forms that the library already uses. *the library: strings* | choice
3. The trait `String` is declared in `FortressLibrary`, not in `String.fss`. *the library: strings* | property
4. `String`'s api writes `abstract` on members its component leaves bodiless, and its `excludes` is the component's, so no export error. *the library: strings* | pointer (F-286)
5. `FlatString`'s api declares its component's header and no `opr ||(a:FlatString, self)` (F-259). *the library: strings* | property
6. `FlatString.rangeContains` and `CatString`'s find only the first occurrence (row 607). *the library: strings* | defect (row 607)
7. An implicit strided subscript `[:b:c]` is completed from the right end: `"abcdef"[:3:2]` is `bd` (row 609). *the library: strings* | defect (row 609)
8. `StringPieces.fss` pins row 607's wrong answers; `XXXSubscriptImplicitStridedRange.fss` holds the specification's. *the library: strings* | tests

Overlap:
- 1: F-288, F-53. Searched "distance".
- 2: F-84, F-85 ("in forms that the library already uses"). Searched "forms that the library already uses".
- 4: F-286, F-297. Searched "rangeContains", "splitWithOffsets".
- 6: F-286 ("carries row 607's miss"). Searched "row 607".
- 7: none found. Searched "row 609".

Checks: tests and files found; rows 607, 609 NEGATIVE-VERIFIED, agree (S2). No SC finding.

Shape: several subjects inside the library's strings (api shape, two defects). Title: no distance site and repairs in known forms; the two defects do not serve it.

## F-84 "In the interpreter's library, the result-only type parameters of `fail`, `builtinPrimitive` and ... are unbounded"

Claims:
1. The result-only type parameters of `fail`, `builtinPrimitive` and `BIG <|[\T\]|>` are unbounded, as the team declared them. *the library: result-only parameters* | property
2. The same rung repaired 25 of the checker's 60 one-off sites, in forms the library already uses. *the library: number and order repairs* | history
3. P-48 gives a result-only parameter the intersection of its bounds, narrowed by the expected type, so where `()` is expected it is `()`. *the checker: static-argument inference* | property
4. `MatchFailure` is an unchecked exception (row 590). *the library: exceptions* | property (row 590 fixed)
5. The sites it left have rows. *the library: number and order repairs* | pointer
6. F-263 holds the powers' types, F-255 `List`'s ordering. *the library: number and order repairs* | pointer
7. The compiler's prelude has instead `fail(s: String): Zilch`, put there in `0886e9654` (2011). *the compiled runtime: prelude* | history
8. That form is not carried into the one library, since `Bottom` is inexpressible in a program by the team's later word, and walk cannot evaluate `Zilch`. *the library: result-only parameters* | choice
9. `NumberOrderListDeclarations.fss`. *the library: number and order repairs* | tests

Overlap:
- 1, 3: F-78 (the intersection of bounds), F-141, F-271, F-173. Searched "P-48", "result-only".
- 4: none found. Searched "MatchFailure", "row 590".
- 8: none found. Searched "Zilch".

Checks: `CompilerLibrary.fsi:33`, commit `0886e9654`, `FortressLibrary.fsi:1264` agree; row 590 FIXED, agrees; `ParkPOPL2019.txt:437-438` not checked (S2). No SC finding.

Shape: several subjects (the library: result-only parameters; the library: number and order repairs; the compiled runtime: prelude). Title: two claims joined by "and the same rung", a batch's origin; the body serves both in part.

## F-85 "In the interpreter's library, the rung's repairs of the generator, condition, reduction and nested-generator declarations"

Claims:
1. The rung's repairs of the generator, condition, reduction and nested-generator declarations are in forms the library already uses. *the library: generators and reductions* | choice
2. `__bigOperator2`'s fused branch passes its result through `cast[\O0\]` (`FortressLibrary.fss:1670`), so the checker no longer types it `OR(I0,O0)` (row 632). *the library: generators and reductions* | property
3. No site of these declarations is on the distance. *the harness and the gate: checker count and distance* | pointer (F-53)
4. Each `Condition` body that calls `cond` writes its static argument. *the library: generators and reductions* | property
5. The sites left were cleared by other work, held by F-250, F-93 (row 629) and F-144 (row 628). *the library: generators and reductions* | history
6. `GeneratorDeclarations.fss`, `NestedReductionFusion.fss`, and the distance stage. *the library: generators and reductions* | tests

Overlap:
- 2: F-285 ("`__bigOperator2`'s fused arm casts its result to `O0`"), F-81, F-264 (the cast device). Searched "__bigOperator2", "cast[\O0\]", "row 632".
- 1: F-83, F-84. Searched "forms that the library already uses".
- 4: none found. Searched "cond[".

Checks: `FortressLibrary.fss:1670` agrees; tests found; rows 628, 629, 632 FIXED, agree (S2). No SC finding.

Shape: one subject (the library: generators and reductions), with history. Title: repairs in known forms and the `cast[\O0\]`; the body serves it, and claim 2 repeats F-285.

## F-86 "The compiled checker types a varargs parameter as the team's `ImmutableArray[\T, ZZ32\]`"

Claims:
1. The checker types a varargs parameter as `ImmutableArray[\T, ZZ32\]`, and applies a varargs declaration by the specification's expansion rule. *the checker: varargs* | property
2. Over the interpreter's library a body uses the parameter as that array. *the checker: varargs* | property
3. The prelude declares no `ImmutableArray`, so under it the checker refuses each use (row 604) and the code generator refuses the declaration, "Can't compile VarArgs yet". *the code generator: varargs* | defect (row 604)
4. Under the one library the code generator compiles it (F-390). *the code generator: varargs* | pointer
5. `Varargs*`, `XXXVarargs*`. *the checker: varargs* | tests

Overlap:
- 1: F-390 (the code generator passes one `ImmutableArray[\T, ZZ32\]`, by the expansion rule). Searched "ImmutableArray[\T, ZZ32\]", "Varargs".
- 3: F-390 ("against the compiler's prelude ... it refuses the declaration"), F-320. Searched "row 604", "Can't compile VarArgs".

Checks: tests found; row 604 NEGATIVE-VERIFIED, agrees (S2). No SC finding.

Shape: several subjects (the checker: varargs; the code generator: varargs). Title: the checker's varargs typing; claims 3 and 4 repeat F-390.

## F-87 "Besides the contexts that it already had ... the compiled checker gives a call its expected type in ..."

Claims:
1. The checker gives a call its expected type in an `if` without `else`, a block's last expression, a `typecase` clause, a juxtaposition, a repeated operator, a `label` body and its `exit` values, and another call's argument by retry. *the checker: expected type* | property
2. The inference chapter lists every context. *the specification: inference* | pointer
3. In a juxtaposition or repeated operator, the expression's expected type goes to the application it makes. *the checker: expected type* | property
4. The `label` contexts build P-50. *the checker: expected type* | pointer
5. At another call's argument it retries the enclosing call per declaration (P-51, F-221). *the checker: expected type* | pointer
6. F-226 and F-70 hold related rules. *the checker: static-argument inference* | pointer
7. `InferResultOnly*`, `Infer*Context`. *the checker: expected type* | tests

Overlap:
- 1: F-56 (expected type at `f(x)`, method calls, operators), F-221 (the retry), F-364. Searched "if` without `else", "expected type", "P-51".

Checks: tests found; `inference.tex` section found (S2). "The expected type" is no heading of `inference.tex`: cites a thing that is gone (SC, F-87; S2).

Shape: one subject (the checker: expected type). Title: the list of contexts; the body serves it.

## F-88 "The compiled checker reads what a trait or object provides by the traits chapter's inheritance"

Claims:
1. The checker reads what a type provides by the traits chapter's inheritance: its own methods and its immediate supertypes', less those overridden or repeated. *the checker: inheritance and override* | property
2. It checks an overriding declaration's return type against the one it overrides. *the checker: inheritance and override* | property
3. So an object below a trait that redeclares an inherited method abstract must define it. *the checker: inheritance and override* | property
4. The code generator compiles `override` by the same reading (F-400). *the code generator: override* | pointer
5. `Override*`. *the checker: inheritance and override* | tests

Overlap:
- 1: F-142 (walk: what a type provides), F-80. Searched "provides".
- 2: F-394 (getter return type against the getter it keeps from inheritance), F-400, F-147 (walk). Searched "Override*", "override".

Checks: tests found (S2). No SC finding.

Shape: one subject (the checker: inheritance and override). Title: provision and override check; the body serves it.

## F-89 "The one library's ranges of rank 2 and 3 have bounded kinds"

Claims:
1. The ranges of rank 2 and 3 have bounded kinds: `BoundedRange2D` and `BoundedRange3D` are meets, and the left, right and full kinds extend them. *the library: ranges* | property
2. The generic range traits declare `CMP`, `FORWARD_CMP` and the compact kinds' size abstract, and the `ZZ32` kinds of rank 1 to 3 define them. *the library: ranges* | property
3. `#0`, `#(0,n)` and `#(0,n,m)` are empty. *the library: ranges* | property
4. `RangeKindBodies.fss`. *the library: ranges* | tests

Overlap:
- 1 to 3: F-82 points here for the ranks' kinds. Searched "BoundedRange2D", "#(0,n)", "RangeKindBodies".

Checks: test found (S2). No SC finding.

Shape: one subject (the library: ranges). Title: bounded kinds, comparisons, empty `#(0,n)`; the body serves it.

## F-90 "In the interpreter's library, several array and matrix declarations and `SUFFIX_SUM` are written so that the compiled checker accepts them"

Claims:
1. `__DefaultVector`, `__DefaultMatrix` and `TransposedMatrix` declare the array family's bound, which F-151 owns. *the library: arrays and matrices* | pointer
2. `__immutableFactory1` answers an `ImmutableArray1`, its 0-based branch cast (F-264). *the library: arrays and matrices* | property
3. `__ImmutableSubArray1` has no `put`. *the library: arrays and matrices* | property
4. `Matrix`'s `mul` writes its two parallel calls as a `do … also do … end` block. *the library: arrays and matrices* | property
5. `TransposedMatrix`'s `add`, `subtract`, `negate` call `Matrix`'s operators. *the library: arrays and matrices* | property
6. `SUFFIX_SUM` loops over `seq((0 # (|x| - 1)).reverse)`, since the checker refuses `seq(a:b:c)` on a strided range (row 661). *the library: ranges* | defect (row 661)
7. The same change made `String`'s `left` and `right` answer `Just(c)` (P-53). *the library: strings* | history
8. `QQ`'s `ceiling` and `truncate` raise `DivisionByZero` at infinities and 0/0, P-54's present rule; P-54's later change is still to build. *the library: rationals* | plan (and property)
9. The distance shows the checker accepts these declarations (F-53). *the harness and the gate: checker count and distance* | pointer
10. Tests under walk; no test covers the bound. *the library: arrays and matrices* | tests

Overlap:
- 1: F-151. Searched "TransposedMatrix", "MultiplicativeRing".
- 2: F-264 ("`__immutableFactory1` ... cast to its factory's declared result type"). Searched "__immutableFactory1".
- 6: none found. Searched "SUFFIX_SUM", "row 661".
- 8: none found. Searched "P-54".

Checks: tests found; row 661 NEGATIVE-VERIFIED, agrees (S2). Status words cut ("still to build", "the curator has not decided"): false today (SC, F-90). "(F-53, which lists the five)": F-53 lists no five: cites a thing that is gone (SC, F-90).

Shape: several subjects (the library: arrays and matrices; the library: ranges; the library: strings; the library: rationals), joined by one batch's change. Title: a list of edits that the checker accepts; the body is the list, which a rung's change unites, not a subject.

## F-91 "The one library's `narrowToRange` and its bounds check are declared at the range kinds over `ZZ32`"

Claims:
1. `narrowToRange` and its bounds check are declared at the range kinds over `ZZ32` of rank 1 to 3, each with the meet with an `OpenRange` that the checker requires. *the library: ranges* | property
2. The checks are named by rank, since walk refuses overloads of one name over two instantiations of `Range` (row 416). *walk: exclusion rule* | defect (row 416)
3. At rank 2 and 3 the check and the arrays' range subscripts build P-52. *the library: ranges* | pointer
4. `(:)`'s five cutting methods fail (P-56). *the library: ranges* | defect (pointer P-56)
5. `RangeNarrowKinds.fss`. *the library: ranges* | tests

Overlap:
- 2: F-44, F-129, F-155, F-252 (row 416). Searched "row 416".
- 1, 4: none found. Searched "narrowToRange", "checkSelection", "P-56".

Checks: test found; row 416 NEGATIVE-VERIFIED, agrees (S2). No SC finding.

Shape: one subject (the library: ranges), with walk's row 416 as the reason. Title: declared at the `ZZ32` kinds; the body serves it.

## F-92 "The one library's order operators on pairs and triples bound each element by `StandardPartialOrder`"

Claims:
1. The order operators on pairs and triples bound each element by `StandardPartialOrder`, so walk refuses at the call a tuple with an element of another type. *the library: tuple orders* | property
2. It refuses also where earlier elements decide, as `(1,()) < (2,())`. *the library: tuple orders* | property
3. Numbers of two run-time types at one position are refused, walk taking their join (row 511). *walk: static-argument inference* | defect (row 511)
4. Operands declared with one type convert and compare. *the library: tuple orders* | property
5. Unordered deciding elements give `false`, or `Unordered` for `CMP`. *the library: tuple orders* | property
6. `TupleOrder*`. *the library: tuple orders* | tests

Overlap:
- 1: F-168 (`StandardPartialOrder` in the number chapters, another point). Searched "StandardPartialOrder", "TupleOrder".
- 3: F-137 (row 511, mixed widths at a tuple parameter). Searched "row 511".
- 5: F-319 (a comparison at NaN answers `false`). Searched "Unordered".

Checks: tests found; row 511 NEGATIVE-VERIFIED, agrees (S2). The skill's `revival-changes.md` already states the rule and row 511; a sentence is to be added there and F-92 then leaves FACTS (SC, skill sentences, from the writer of checker-2).

Shape: one subject (the library: tuple orders). Title: elements bounded by `StandardPartialOrder`; the body serves it.

---

## Subject labels used, with their entries

- the checker: ellipsis comprises: F-63, F-64, F-72
- the checker: trait-table memo: F-65
- the checker: time: F-65
- the checker: sizes: F-67, F-68, F-69
- the checker: exclusion rule: F-67
- the checker: written static arguments: F-70
- the checker: typecase narrowing: F-71
- the checker: comprises clauses: F-72, F-76
- the checker: static-argument inference: F-73, F-78, F-84, F-87
- the checker: overload choice with coercion: F-73
- the checker: numerals: F-73, F-79
- the checker: overloading rules: F-75, F-77, F-80, F-81
- the checker: Meet Rule by coverage: F-76
- the checker: overloading memo: F-80
- the checker: inheritance and override: F-80, F-88
- the checker: varargs: F-86
- the checker: expected type: F-87
- the code generator: intersection receivers: F-76
- the code generator: varargs: F-86
- the code generator: override: F-88
- the compiled runtime: intersection types: F-76, F-78
- the compiled runtime: prelude: F-84
- walk: numerals: F-74, F-79
- walk: sizes as values: F-74
- walk: several minimal supertypes: F-77
- walk: exclusion rule: F-91
- walk: static-argument inference: F-92
- the library: api declarations: F-63
- the library: typecase forms: F-71
- the library: numeral types: F-79
- the library: overload families: F-77
- the library: meets: F-81, F-82
- the library: ranges: F-82, F-89, F-90, F-91
- the library: strings: F-81, F-83, F-90
- the library: result-only parameters: F-84
- the library: number and order repairs: F-84
- the library: exceptions: F-84
- the library: generators and reductions: F-81, F-85
- the library: arrays and matrices: F-90
- the library: rationals: F-90
- the library: tuple orders: F-92
- the specification: ellipsis comprises: F-64
- the specification: typecase binding form: F-71
- the specification: overloading model: F-75
- the specification: inference: F-87
- the harness and the gate: checker count and distance: F-66, F-75, F-85, F-90
- the harness and the gate: test forms: F-70

## Entries that overlap

- `String`'s abstract members and the export check: F-63, F-83, F-286, F-297.
- The ellipsis `comprises` refusal (row 354): F-63, F-64, F-72.
- `comprises` for generic subtraits and its three departures (rows 487, 489, 490): F-72, F-171, F-62; row 487 also in F-76, F-175.
- Coverage, the intersection and rows 546, 547: F-76, F-175, F-408, F-386.
- The checker count's table and the gate: F-66, F-53.
- Sizes in the checker: F-67, F-68, F-69, F-38, F-146, F-20, F-50; the message "Could not infer static argument" in F-67 and F-69; row 400 in F-69 and F-50.
- Row 406's `Flag` example: F-67, F-48, F-167.
- Row 470: F-70, F-291, F-244, F-250, F-256.
- Inference with coercion and the instance at the bounds: F-73, F-78, F-55, F-51, F-137, F-141, F-143, F-173, F-84; row 507 in F-73 and F-78.
- Numerals: F-74, F-79, F-341, F-342, F-57, F-407, F-304; F-74 and F-341 state the same default by value.
- Return Type Rule and positional rule: F-75, F-50, F-174, F-44; row 1048 in F-75 and F-174; row 542 in F-75, F-361, F-376.
- Row 559: F-76, F-78.
- Functional methods' Meet Rule and No Duplicates: F-80, F-142, F-223, F-252, F-274.
- The overloading memo: F-80, F-43 (they read against each other).
- Library meets: F-81, F-82, F-245, F-276, F-278.
- `__bigOperator2`'s cast to `O0`: F-85, F-81, F-285, F-264.
- Varargs: F-86, F-390, F-320.
- The expected type: F-87, F-56, F-221, F-364.
- Inheritance and override: F-88, F-394, F-400, F-142, F-147.
- Ranges: F-82, F-89, F-91, F-90; row 416 in F-91, F-44, F-129, F-155, F-252.
- Row 511: F-92, F-137.
- "Repairs in forms that the library already uses": F-83, F-84, F-85.

## What the search could not settle

- F-63: the ground of the `Condition.map` error, the referents of its history sentences, and its overlap with F-286 and F-297 and rows 355, 357 (SC, F-63, unsettled).
- F-74: whether its content now belongs to F-341 (SC's skill-sentence line says "F-74 is now F-341"); FACTS still holds F-74 as a separate entry, so the two state the same default.
- F-74: row 962 is CONTESTED, which the entry does not say; SC lists no finding for it.
- F-77: whether its words about row 555 were wrong; the scout and the writer disagree (SC, F-77).
- F-80 and F-43: whether the overloading memo is keyed on all inputs (F-80) or hides errors across traits (F-43).
- F-66, F-67, F-75, F-90: SC records status words cut and a `#stopped` rule made true without the words; which entry held which status word is not given.
- F-84: the citation `research/extracts/ParkPOPL2019.txt:437-438` was not checked by the scout.
