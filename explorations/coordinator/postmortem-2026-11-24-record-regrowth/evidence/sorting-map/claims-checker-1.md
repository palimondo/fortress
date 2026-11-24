<!-- The claims of each FACTS entry of chunk checker-1 (F-32 and F-34 to F-62, section "The checker and the one library"), each with its subject, its kind, the other entries that say the same, and what today's checks say of it, as the first step of the sorting map for the batch-mode consolidation of 2026-11-24; written by a worker that read FACTS as it stood on 2026-11-24 and judged nothing new. -->

Conventions. Each claim: its sentence; then *subject* | *kind*. "Overlap" is given for the kinds property, defect and choice, from a grep of every FACTS entry for the words given in quotes ("searched"). "Checks" copies today's findings: S1 = `evidence/consolidation/scout-checker-1.md`, SC = `evidence/stale-claims.md`, both in the post-mortem folder. "Sound" means the scout found the cited thing and that it agrees; "not checked" means neither source speaks of the claim. Rows are gap-ledger rows; their status is the scout's.

## F-32 "The compiled path cannot reuse walk's glue classes"

Claims:
1. The compiled path cannot call walk's glue classes; 28 of the one library's 401 live native bindings still name one. *the compiled runtime: native bindings* | property
2. A native binding's string names either a glue class over walk's values or a static helper of `nativeHelpers/` that both paths call. *the library: native bindings* | property
3. At `a1f8c4b8b` the 449 bindings split 154 / 59 / 158 / 78 by how much work each needed to reach a helper, 23 of the 59 under a prelude name for another helper (row 348). *the library: native bindings* | history (with detail)
4. 29 of the 449 were `IntLiteral`'s and left with it. *the library: native bindings* | history
5. `println` writes through `stdOut`, whose natives name `fileOps` helpers. *the library: native bindings* | pointer (F-330)
6. `nanoTime` and `System`'s `args` name helpers. *the library: native bindings* | pointer (F-314, F-337)
7. Of the 42 with no compiled analogue: `NativeArray`'s 7, `Thread`'s 4, `abort`, `printTaskTrace` name helpers, `getProgramArgsPrim` is deleted, `Reflect`'s 28 name glue classes. *the library: native bindings* | detail (pointers F-333, F-335, P-170)

Overlap:
- 1: F-299 ("401 live", the 373 that name a helper and so the 28 that do not); F-298 (a string outside `nativeHelpers/` is refused by a compile). Searched "glue class", "401 live", "builtinPrimitive".
- 2: F-298, F-299 (the same two kinds of string, and their loading on each path); also F-303, F-306 to F-314, F-333 name glue classes per type.
- 3 (row 348): F-306, F-130 (wrapping operators). Searched "row 348".

Checks: row 348 NEGATIVE-VERIFIED, agrees with claim 3 (S1). Detail headings "On the new base" and "The count" of `CLIMB-BATCH-23.md` not found: cites a thing that is gone (SC, F-32; S1). Other claims: not checked.

Shape: several subjects (the compiled runtime: native bindings; the library: native bindings); mostly history (the 449 at `a1f8c4b8b`). Title: the compiled path cannot reuse glue classes, 28 of 401 still name one; the body mostly tells the older count of 449 and the fate of single bindings, which does not serve the title; claims 1 and 2 restate F-298 and F-299.

## F-34 "Against the interpreter's library, the code generator refuses none"

Claims:
1. Against the interpreter's library, the code generator refuses none of the declarations of the fourteen components that the distance checks. *the code generator: the fourteen components* | property
2. The measure counted 0 refused and 754 emitted on `f3439cf7ce` without its patch, as on `285efad802` with it. *the code generator: the fourteen components* | detail
3. `OneLibraryComponents.test`, run first in the onelibrary track of every gate, compiles the fourteen to jars, so a refused declaration turns the gate red. *the harness and the gate: one-library tests* | tests
4. The measure's script skips dispatch methods and so does not reach `String`'s two calls with a type assumption; `String`'s real compile ends clean and both call the `(String, String)` body. *the code generator: type assumptions* | property
5. A declaration counts at its first wall. *the tools: codegen measure* | detail
6. The script runs no class it emits, so it cannot see a load or verifier failure, such as row 1137's. *the tools: codegen measure* | property (with defect row 1137)
7. Measured once on each code; the command and that its patch no longer applies whole. *the tools: codegen measure* | detail

Overlap:
- 1: F-396 ("OneLibraryComponents", the one library compiles to jars); F-288 (the fourteen closed under import, the checker finds no error). Searched "OneLibraryComponents", "fourteen".
- 4: F-325 (code generator compiles type assumptions; F-34 points to it). Searched "type assumption".
- 6: F-396 (row 1137 stands between the jars and a run). Searched "row 1137".

Checks: `OneLibraryComponents.test`, `OneLibraryJUTest.java:44`, `String.fss:67`, `:69`, the measure script: sound (S1). Row 1137 NEGATIVE-VERIFIED, agrees (S1). Counts not re-measured. No SC finding.

Shape: several subjects (the code generator: the fourteen components; the tools: codegen measure). Title: the code generator refuses none of the fourteen and a gate test compiles them; the body serves it, with the measure's limits as detail.

## F-35 "The `FortressLibrary` api has 9 declarations with a dead size"

Claims:
1. The `FortressLibrary` api has 9 declarations with a size parameter that occurs in no parameter or return type. *the library: dead sizes* | property
2. They are the five `subarray` methods and `Rank`, `Indexed1` to `Indexed3`, whose size tells instantiations apart. *the library: dead sizes* | detail
3. The component's `subarray` bodies read their offsets as values. *the library: dead sizes* | property
4. The api declarations check clean, since a size that reaches nothing is no error (P-40). *the checker: sizes* | property
5. The census of 2026-09-21 found 25 and missed one; 17 vector and matrix operators lost their sizes since. *the library: dead sizes* | history
6. The export checker reports an api declaration as missing where the component leaves out its dead size, since it compares static-parameter lists by length, name and kind. *the checker: export check* | defect (no row)

Overlap:
- 1, 3: none found. Searched "dead size", "subarray" (F-68, F-279 name `subarray` for other points).
- 4: F-67 (the checker checks sizes, P-40). Searched "P-40".
- 6: none found; F-282, F-297 hold the export check's matching of members, not of static-parameter lists. Searched "export checker", "export check".

Checks: `FortressLibrary.fsi:1355` agrees (S1). No SC finding. Not checked: the count of 9, the export-checker claim.

Shape: one subject (the library: dead sizes), with one defect of the export checker beside it. Title: 9 dead-size declarations; the body serves it, except claim 6, a defect without a row.

## F-36 "The code generator's `FnNameInfo.boundsFor`"

Claims:
1. `FnNameInfo.boundsFor` gives a size parameter a size argument and every other kind a type argument. *the code generator: static-parameter kinds* | property
2. A `bool`, `dim`, `unit` or `opr` parameter so gets a type argument, a latent defect; the checker refuses the first three by name. *the code generator: static-parameter kinds* | defect (no row)
3. A size symbol stays in the mangled name and needs no descriptor; only a literal size reaches the class loader, which takes its descriptor from `RTTIsize.of`. *the compiled runtime: sizes at run time* | property

Overlap:
- 1: none found. Searched "boundsFor".
- 2: F-67 (the checker refuses to infer a `bool`, `dim` or `unit` argument). Searched "XXXNatBoolChecker", "dim".
- 3: F-129 (a size carried as a descriptor from `RTTIsize.of`), F-18, F-40. Searched "RTTIsize".

Checks: `FnNameInfo.java:168`, `RTTIsize.java:24` found (S1). No SC finding.

Shape: one subject (the code generator: static-parameter kinds) with a run-time claim beside it. Title: the kinds `boundsFor` gives; the body serves it.

## F-37 "On the compiled path, a `typecase` clause on a sized type"

Claims:
1. A compiled `typecase` clause on a sized type tests the value's own class with one `INSTANCEOF`, also when the size is a static parameter of the enclosing function. *the compiled runtime: sizes at run time* | property
2. In a generic function the class loader puts in the size when it makes the instance, so no descriptor is read. *the compiled runtime: sizes at run time* | property
3. A `typecase` that is a whole function body with clauses that need a coercion fails in code generation (row 340). *the code generator: typecase* | defect (row 340)
4. `NatRtCase`, `NatRtCaseGen`. *the compiled runtime: sizes at run time* | tests

Overlap:
- 1, 2: F-129 (sizes at run time, a supertype only of an equal size), F-20. Searched "NatRtCase", "INSTANCEOF", "typecase` clause on a sized".
- 3: F-373 names row 340. Searched "row 340".

Checks: the two tests found; row 340 NEGATIVE-VERIFIED, agrees (S1). No SC finding.

Shape: one subject (the compiled runtime: sizes at run time). Title: typecase tests the class; the body serves it.

## F-38 "The compiled dispatcher chooses an overload arm generic in a size"

Claims:
1. The compiled dispatcher chooses an arm generic in a size by the value's size, read off its descriptor when the argument is typed `Any`, and the arm reads its size. *the compiled runtime: sizes at run time* | property
2. The checker's return-type rule compares the arms' own sizes (row 410). *the checker: sizes* | property (row 410 fixed)
3. The dispatcher skips a size parameter's bound. *the compiled runtime: sizes at run time* | property
4. `NatRtDisp`, `NatRtDispSize`, `NatRtDispTrait`. *the compiled runtime: sizes at run time* | tests

Overlap:
- 1, 3: F-129 ("loads, dispatches and runs compiled"), F-41 (dispatch on a shared size). Searched "NatRtDisp", "dispatcher".
- 2: F-68 (the return-type rule reads a size as a type parameter). Searched "row 410", "return-type rule".

Checks: `OverloadSet.java:1561-1562` agrees; the three tests found; row 410 FIXED, agrees (S1). No SC finding.

Shape: one subject (the compiled runtime: sizes at run time). Title: dispatch by size; the body serves it.

## F-39 "An operator static argument is a name substituted"

Claims:
1. An `opr` static argument is a name substituted at instantiation, by the specification and on both paths; no code reads it at run time. *the specification: opr static parameters* | property
2. The compiled path carries it in the instantiation's class name; it has no descriptor. *the compiled runtime: opr static arguments* | property
3. No live declaration of the one library has an `opr` parameter; `embiggen`'s and `Monoid`'s are in comments. *the library: opr static parameters* | property
4. Nine test files in three test folders declare one. *the harness and the gate: test corpus* | detail
5. Compiled, `Op[\+\]()` dies with `NoSuchMethodError` on the descriptor's factory, where walk prints it (row 366, `XXXOprParamRungS`). *the compiled runtime: opr static arguments* | defect (row 366)
6. A three-line `MethodInstantiater` change, not landed, fixes row 366's probe program; the gated test was not run with it. *the compiled runtime: opr static arguments* | plan

Overlap:
- 1, 2: none found beyond P-41. Searched "opr` static", "OprParam".
- 5: none found. Searched "row 366".

Checks: `XXXOprParamRungS.test` found; row 366 NEGATIVE-VERIFIED, agrees; the library's comments agree (S1). The probe `SkOprParam.fss` is gone: cites a thing that is gone (SC, F-39; S1). "Nine test files": unsettled, a loose grep gives 15, a strict one 2 (SC, F-39; S1).

Shape: several subjects (the specification: opr static parameters; the compiled runtime: opr static arguments; the library: opr static parameters). Title: an operator argument is a substituted name, read by nothing at run time; the defect and the unlanded fix are beside the title.

## F-40 "Measured on 2026-09-24 for two size designs that were not built"

Claims:
1. On 2026-09-24, two size designs that were not built cost a few kilobytes at load and nothing in a hot loop. *the compiled runtime: sizes at run time* | history (a measurement of designs not built)
2. The built design, one descriptor per size from `RTTIsize.of`, is neither, and its load size and loops are not measured. *the compiled runtime: sizes at run time* | property
3. A loop bounded by the size constant was not faster than one bounded by the storage's length. *the compiled runtime: sizes at run time* | detail
4. The loop cost about 31 ns per element, to a transaction check per local, boxing and a call per read. *the compiled runtime: loop costs* | detail
5. Once C2 compiles a hot loop, a helper call is inlined and the boxes of its mutable variables stay. *the compiled runtime: loop costs* | pointer (F-301)
6. A call dispatched on a size cost about 4 to 20 ns more than a resolved one. *the compiled runtime: sizes at run time* | detail
7. The built dispatcher's lookup of a literal size's descriptor measured 0.9 ns (2.6 ns on an earlier build). *the compiled runtime: sizes at run time* | detail
8. By reading, no optimization uses a size, and a dispatched call tests a size once per arm tried. *the compiled runtime: sizes at run time* | property

Overlap:
- 2: F-129 (the descriptor from `RTTIsize.of`). Searched "RTTIsize".
- 8: F-20 ("no optimization uses them (F-40)"). Searched "no optimization".
- 4: F-12, F-358, F-374 (transaction check, boxing in compiled loops). Searched "transaction check".

Checks: `SizeLiteralStructure` found (S1). "No optimization uses a size" rests on a code reading of 2026-09-24: unsettled, filed under F-20 (SC, F-20). No SC finding for F-40 itself.

Shape: mostly history (a measurement of designs that were not built). Title: what two unbuilt designs cost; the body serves it, and claims 2 and 8 are the present properties inside it.

## F-41 "The compiled dispatcher tests a size that two parameters share"

Claims:
1. The compiled dispatcher tests a size that two parameters share, in `DOT`'s shape, for equality both ways before it chooses the arm. *the compiled runtime: sizes at run time* | property
2. In `NatRtDot`, sizes 3 and 4 reach the catch-all, statically and dispatched, in both orders; walk printed the same. *the compiled runtime: sizes at run time* | detail
3. A static mismatch compiles with no error: the checker gives it the catch-all's signature. *the checker: sizes* | property
4. The equality test is the team's check for a type variable in two invariant positions. *the compiled runtime: sizes at run time* | property
5. The library's `DOT` was not run compiled; by reading, the matrix product takes the same check. *the library: DOT* | plan
6. `NatRtDot`. *the compiled runtime: sizes at run time* | tests

Overlap:
- 1, 4: F-38 (dispatch by size), F-129. Searched "NatRtDot", "shared size".
- 3: none found. Searched "catch-all".

Checks: `NatRtDot` found (S1). No SC finding.

Shape: one subject (the compiled runtime: sizes at run time). Title: equality test of a shared size; the body serves it.

## F-42 "The compiled checker skips a compilation unit's overloading and return-type checks"

Claims:
1. `StaticChecker` skips a unit's overloading and return-type checks when an earlier stage of that unit reported an error. *the checker: stage order* | property
2. So clearing an early error can raise the checker count. *the harness and the gate: checker count and distance* | property
3. The distance runs every stage of every unit, so these errors are not hidden from it. *the harness and the gate: checker count and distance* | property

Overlap:
- 1: none found as a rule; F-53 states that each unit stops at its first failing stage in the count. Searched "early return", "OverloadingChecker", "first failing".
- 2, 3: F-53 (the count's and the distance's scopes), F-295 (the distance counts each api's errors). Searched "checker count", "distance".

Checks: `StaticChecker.java:268-279` agrees (S1). The pointer to F-53 for the early return no longer holds after the pilot's rewrite of F-53: cites a thing that is gone (SC, F-42). Detail cite "its opening section" has no number (S1).

Shape: one subject (the checker: stage order), with its effect on the gate's numbers. Title: the skip of later checks; the body serves it.

## F-43 "The overloading checker's memo hides some errors"

Claims:
1. The overloading checker's memo hides some errors, which ones changing from build to build. *the checker: overloading memo* | defect (no row)
2. It keeps a "valid" verdict per pair, so a pair valid for one inheriting trait is taken as valid for the next, in hash-set order. *the checker: overloading memo* | property
3. The memo is on by default, so a plain `fortress compile` can miss these errors. *the checker: overloading memo* | defect (no row)
4. `-Dfortress.analyzer.overload.cache=false` turns it off, and the gate's count and distance stages set it. *the harness and the gate: checker count and distance* | property

Overlap:
- 1 to 3: F-80 ("the checker's overloading memo is keyed on all the inputs of the check, so a pair accepted at the top level is not reused unchecked"), which reads against claim 2. Searched "memo", "overload.cache".
- 4: none found. Searched "overload.cache".

Checks: `OverloadingChecker.scala:79` (typechecker copy) agrees; `distance.txt` of climb batch 36 carries the property (S1). No SC finding.

Shape: one subject (the checker: overloading memo), mostly a defect without a row. Title: the memo hides errors and the gate turns it off; the body serves it.

## F-44 "The compiled checker enforces the multiple instantiation exclusion rule"

Claims:
1. The compiled checker enforces the rule that no type extends two instantiations of one generic trait, and relies on it. *the checker: exclusion rule* | property
2. With the rule relaxed alone, a program passes the checker and dies with `IncompatibleClassChangeError`. *the checker: exclusion rule* | property
3. The team's JVM type mapping relies on it too. *the code generator: type mapping* | property
4. Walk applies no instantiation exclusion (row 416). *walk: exclusion rule* | defect (row 416)
5. P-43 keeps the rule. *the checker: exclusion rule* | pointer
6. The library meets it by the flat tower and three changes of `952892a00` (`TotalComparison`, `AnyMaybe`, `andCondCombine`). *the library: exclusion-rule repairs* | history
7. So under walk, `p1 ANDCOND p2` of two relational predicates is no longer a relational predicate (row 458). *the library: exclusion-rule repairs* | defect (row 458)
8. The distance holds no exclusion error. *the harness and the gate: checker count and distance* | pointer (F-53)

Overlap:
- 1: F-167 (the specification states instantiation exclusion), F-48 (kinds the rule compares), F-131 (flat tower). Searched "exclusion rule", "two instantiations".
- 2: F-45 (`IncompatibleClassChangeError` under the shadow forest rule). Searched "IncompatibleClassChangeError".
- 3: none found. Searched "TypeMapping".
- 4: F-91 (walk refuses overloads over two instantiations of `Range`, row 416), F-129 ("Row 416 is walk's defect"), F-155, F-252. Searched "row 416".
- 7: none found. Searched "row 458", "ANDCOND".

Checks: `OverloadingOracle.scala:81-105`, `TypeMapping.tex:125`, the library lines agree; rows 458, 416 NEGATIVE-VERIFIED, agree (S1). The probe `ProbeMIEPick` is not in the tree: cites a thing that is gone (SC, F-44; S1).

Shape: several subjects (the checker: exclusion rule; walk: exclusion rule; the library: exclusion-rule repairs). Title: the checker enforces the rule and the library meets it; the walk defect and the `ANDCOND` consequence are beside it.

## F-45 "Without the exclusion rule, every dispatcher would have to call its generic arms"

Claims:
1. Without the exclusion rule, every dispatcher would have to call its generic arms at the call site's static arguments. *the compiled runtime: dispatch at call-site arguments* | property (by reading)
2. No published work resolves a value in two instantiations of one generic under run-time dispatch. *the specification: exclusion rule alternatives* | property (literature)
3. The call at the dispatcher's static arguments is built for template dispatchers, and by reading not for one with an `opr` or `nat` parameter. *the compiled runtime: dispatch at call-site arguments* | pointer (F-136)
4. The 2012 patents' forest rule allows a self-typed generic at several instantiations along a chain. *the specification: exclusion rule alternatives* | property
5. Alone, the forest rule leaves the specialisation hole open; a shadow checker with it gave `IncompatibleClassChangeError`, and the tree's checker refuses such a program. *the specification: exclusion rule alternatives* | property (measured on a shadow)
6. Route C adds a return-type rule that closes the hole. *the specification: exclusion rule alternatives* | pointer (F-46)

Overlap:
- 1, 3: F-136 (generic arm called at the dispatcher's own static parameters; not measured for `nat` or `opr`). Searched "F-136", "call site".
- 2, 4, 5: F-46, F-47 (forest rule, route C). Searched "forest rule", "specialisation hole".

Checks: all sources found; no test, file or row named (S1). No SC finding.

Shape: one subject (the specification: exclusion rule alternatives), a design study. Title: what dropping the rule would need; the body serves it.

## F-46 "Route C, the patents' forest rule with a return-type rule"

Claims:
1. Route C closes the specialisation hole. *the specification: exclusion rule alternatives* | property (shadow)
2. Going back to a nested tower under route C needs work beyond the checker. *the specification: exclusion rule alternatives* | plan
3. Built as a shadow checker on 2026-09-24, route C refused 25 pairs at 21 of the nested tower's declarations. *the specification: exclusion rule alternatives* | history (detail)
4. Completing the tower needs seven more declarations and the identification of `Integral[\ZZ32\]` with `ZZ32`. *the specification: exclusion rule alternatives* | plan
5. The patents' `comprises T` licenses the identification but overflows the checker's stack in `Formula.scala`. *the checker: comprises T* | defect (no row)
6. Leaving route A needs the tower nested again, the call-site fix in every dispatcher, a method per middle level in the code generator, walk's acceptance without overflow, and a way past the overflow. *the specification: exclusion rule alternatives* | plan

Overlap:
- 1: F-45, F-47. Searched "route C", "Route C".
- 5: F-62 and F-171 (walk overflows on `comprises I`, row 407), F-121. Searched "comprises I", "overflow".

Checks: sources found; no test, file or row named (S1). No SC finding.

Shape: mostly plan (what route C would need), on one subject (the specification: exclusion rule alternatives). Title: route C closes the hole but needs more work; the body serves it.

## F-47 "The exclusion rule refuses some of the specification's own examples"

Claims:
1. The exclusion rule refuses the specification's examples E1 to E10, among them three `where`-clause examples, `Nothing`, the nested tower and `RationalQuantity`. *the specification: refused examples* | property
2. The `where`-clause examples stop on both paths earlier, in name resolution. *the specification: refused examples* | property
3. A parametric object with a factory, or a widening function, runs on both paths as a user program. *the specification: refused examples* | property
4. The library's `Nothing[\String\]` does not run on the compiled prelude (row 331). *the compiled runtime: prelude* | defect (row 331)
5. A marker object with a `coerce` in the generic trait runs compiled, and walk applies it (row 389). *walk: coercions of generic traits* | property (row 389 fixed)
6. The 2012 `covariant` keyword passes the checker and dies at run time (row 404). *the checker: covariant* | defect (row 404)
7. The checker refuses a coercion with its own static parameter between two instantiations as a cyclic hierarchy. *the checker: coercions* | property
8. Inferred: route C would rescue only E5 and E7. *the specification: exclusion rule alternatives* | property (inferred)

Overlap:
- 1: F-167 (the specification keeps the refused examples marked "Not allowed"), F-52 (`RationalQuantity`). Searched "RationalQuantity", "where`-clause", "exclusion rule".
- 4: F-167, F-184 (row 331). Searched "row 331".
- 6: none found for row 404; F-166 (covariance on the team's latest word). Searched "row 404", "covariant".
- 7: F-57 ("refused as a cyclic hierarchy", the numeral coercion into `T`). Searched "cyclic hierarchy".
- 3, 5: none found. Searched "row 389", "widen".

Checks: rows 331, 404 NEGATIVE-VERIFIED and 389 FIXED, agree (S1). `AltEmptyCoerce` not searched (S1). No SC finding.

Shape: several subjects (the specification: refused examples; the checker: coercions; walk; the compiled runtime: prelude). Title: the rule refuses spec examples, and alternatives run; claims 4 to 7 are side facts on other subjects.

## F-48 "The compiled checker's exclusion rule compares type arguments"

Claims:
1. The checker's exclusion rule compares type arguments, and sizes only when both are literals. *the checker: exclusion rule* | property
2. Two boolean arguments count as no exclusion: `Flag[\true\]` and `Flag[\false\]` pass the checker and die in code generation (row 406). *the checker: exclusion rule* | defect (row 406)
3. A static parameter beside another argument counts as no exclusion and dies at load with `ClassFormatError` (row 414). *the checker: exclusion rule* | defect (row 414)
4. Two literal sizes do exclude (row 402, fixed). *the checker: exclusion rule* | property
5. `XXXNatExcludeChecker`, `XXXBoolExtendsTwice`, `XXXNatExtendsTwice`. *the checker: exclusion rule* | tests
6. The code is `TypeAnalyzer.scala:548-555`, "Todo: Handle bool args". *the checker: exclusion rule* | detail

Overlap:
- 2: F-67 (the same `Flag` example, row 406), F-167 (rows 406, 414). Searched "row 406", "Flag[".
- 3: F-129 (row 414), F-167. Searched "row 414".
- 1, 4: F-44 points here. Searched "row 402".

Checks: the three tests found; `TypeAnalyzer.scala:548-555` agrees; rows 406, 414 NEGATIVE-VERIFIED, 402 FIXED, agree (S1). No SC finding.

Shape: one subject (the checker: exclusion rule). Title: what the rule compares; the body serves it.

## F-49 "Under walk, a value form and a function form of one name"

Claims:
1. Under walk, a value form and a function form of one name are chosen by the argument's run-time type, so with element type `Any` a function goes to the function form. *walk: dispatch on run-time types* | property
2. The checker refuses such a pair under the bound `Any`. *the checker: bound Any* | property
3. The one library has no such pair: `fill` takes a value and `tabulate` a function. *the library: fill and tabulate* | pointer (F-158)

Overlap:
- 1: none found. Searched "value form", "FillBoxAny".
- 2: F-174 (both paths refuse overloading a single parameter typed by a parameter with the bound `Any`). Searched "bound `Any`", "checkBoundAny".

Checks: the probe `FillBoxAny` is not in the tree: cites a thing that is gone (SC, F-49; S1).

Shape: several subjects (walk: dispatch on run-time types; the checker: bound Any). Title: walk chooses by run-time type; the body serves it.

## F-50 "The compiled checker lets overloads differ in static parameters"

Claims:
1. The checker lets overloads differ in static parameters, as the OOPSLA 2011 model does and the specification states. *the checker: overloading rules* | property
2. It refuses as ambiguous only pairs it cannot prove unambiguous: pairs over open traits, and pairs that exclude only through the exclusion rule and a bound, as `CAP` on `ScalarRange` beside `Range2D`. *the checker: overloading rules* | property
3. It refuses some pairs the paper accepts, by its Return Type Rule and its positional rule. *the checker: overloading rules* | pointer (F-75)
4. Two generic arms on a bare type variable fail compiled (row 537). *the compiled runtime: generic arms* | pointer (F-174)
5. Walk runs an arm whose size the call leaves unfixed, where the checker drops it or refuses the call (row 400). *the checker: sizes* | pointer (F-69)

Overlap:
- 1: F-174 (the specification's 2011 model), F-26, F-252 (walk's side). Searched "static parameters", "P-45".
- 2: none found. Searched "open traits", "ScalarRange".

Checks: rows 537, 400 NEGATIVE-VERIFIED, agree (S1). No SC finding.

Shape: one subject (the checker: overloading rules), with three pointers. Title: overloads may differ in static parameters; the body serves it.

## F-51 "A generic call converts a narrower argument"

Claims:
1. A generic call converts a narrower argument for a parameter typed by a type variable that another argument fixes, on both paths (row 388, fixed). *the checker: static-argument inference* (and walk) | property
2. So under walk the library's array-scalar and matrix-scalar operators take a `ZZ32` scalar with `RR64` elements. *the library: array-scalar operators* | property
3. F-73 and F-137 give each path's rule. *the checker: static-argument inference* | pointer
4. `InferCoercionRungK`, `InferCoercionShapes`. *the checker: static-argument inference* | tests

Overlap:
- 1: F-55 (inference with coercion on both paths), F-73, F-137. Searched "InferCoercionRungK", "InferCoercionShapes", "row 388".
- 2: none found. Searched "array-scalar".

Checks: tests found (`InferCoercionRungK` is a `.fss` with no `.test`); row 388 FIXED, agrees (S1). No SC finding.

Shape: one subject (the checker: static-argument inference, with walk's twin). Title: narrower argument converted; the body serves it.

## F-52 "Neither path can use `RationalQuantity`"

Claims:
1. Neither path can use `RationalQuantity` as the specification declares it. *the specification: refused examples* | property
2. The checker refuses `conditionalExtension.fss`'s declaration as a cyclic type hierarchy. *the checker: conditional extension* | property
3. Walk runs that test only because nothing instantiates the trait; a probe that does fails. *walk: conditional extension* | property
4. Measured by probes that `84aef6a4f` removed. *the specification: refused examples* | history

Overlap:
- 1: F-47 (`RationalQuantity` among the refused examples), F-168 (its chapter stays under a superseded callout). Searched "RationalQuantity".
- 2: F-255 (conditional extension in the subtype relation). Searched "Cyclic type hierarchy", "conditional extension".
- 3: none found.

Checks: `conditionalExtension.fss` found; the probe files deleted by `84aef6a4f`, agrees (S1). No SC finding.

Shape: one subject (the specification: refused examples). Title: `RationalQuantity` unusable; the body serves it.

## F-53 "At the last landed gate, climb batch 36's, the distance to the switch-over is 0"

Claims:
1. At climb batch 36's gate the distance is 0 errors and the checker count is 0. *the harness and the gate: checker count and distance* | detail (a count that each landing changes)
2. The distance counts the checker's distinct errors over fourteen components of the interpreter's library and their apis. *the harness and the gate: checker count and distance* | property
3. It runs every stage of each component whatever earlier stages reported, and classes errors by root cause. *the harness and the gate: checker count and distance* | property
4. At that gate it checks `value object Char` to its end. *the checker: value object Char* | pointer (F-334)
5. The count checks only `FortressLibrary` with its imported apis, each unit stopping at its first failing stage; it reads 0, and nothing crashes. *the harness and the gate: checker count and distance* | property
6. A rise in either turns no gate red on its own; the count stage can still turn it red on F-66's faults (P-39). *the harness and the gate: checker count and distance* | pointer
7. A rung takes the last landed gate's tables as its starting values, at the paths given. *the harness and the gate: checker count and distance* | detail

Overlap:
- 2, 3: F-54 (classes by root cause), F-288 (the fourteen), F-295, F-42. Searched "distance", "checker count".
- 5: F-42 (each unit stops at its first failing stage), F-281 ("the distance and the count are 0, with no crash"). Searched "#crash", "first failing".
- 1: F-281, F-245 ("0 since climb batch 22"), F-61. Searched "is 0", "0 since".

Checks: climb batch 36's `checker-count.txt` and `distance.txt` read 0 and '#crash none'; `distance-sites.tsv` holds only its header (S1). "and nothing crashes (F-233)": F-233 does not hold it: beyond its support (SC, F-53).

Shape: one subject (the harness and the gate: checker count and distance). Title: the two numbers at the last gate; the body defines them and how to read them, which serves it.

## F-54 "The gate classes the distance to the switch-over by root cause"

Claims:
1. The gate classes the distance by root cause in `#class` rows, such as X1, BR and OT, assigned by `classify.py`; at 0 there are none. *the harness and the gate: checker count and distance* | property
2. F-53 gives the last total. *the harness and the gate: checker count and distance* | pointer
3. That gate's `distance.txt` reads '#crash none': `Char` and `FortressLibrary` are checked to their end. *the harness and the gate: checker count and distance* | pointer (F-334, F-233)

Overlap:
- 1: F-295 (classify.py), F-53 ("classes the errors by root cause (F-54)"). Searched "classify.py", "#class".
- 3: F-53, F-281, F-288, F-334. Searched "#crash".

Checks: `classify.py`, `table.py:112` agree; 0 `#class` rows and '#crash none' at climb batch 36 (S1). No SC finding; the same pointer to F-233 as F-53's (SC, F-53) applies to claim 3's words "the `FortressLibrary` component to its end too (F-233)" by the same reading, not stated by SC for F-54.

Shape: one subject (the harness and the gate: checker count and distance). Title: classes by cause; the body serves it, and repeats F-53.

## F-55 "Static arguments are inferred with coercion on both paths"

Claims:
1. Static arguments are inferred with coercion on both paths: the checker from static types and the expected type, walk from run-time types. *the checker: static-argument inference* (and walk) | property
2. A mixed-width call takes the narrowest type into which its arguments convert (P-74). *the checker: static-argument inference* | property
3. F-73, F-137 and F-87 give the rules and contexts. *the checker: static-argument inference* | pointer
4. Under walk a typed binding does not fix a call's static arguments, so `a: BoxK[\ZZ64\] = wrapK(3)` is refused (row 510). *walk: static-argument inference* | defect (row 510)
5. A parameter with no written bound is bounded by `Any` on both paths, so an unfixed one takes `Any`. *the checker: static-argument inference* | pointer (F-78)

Overlap:
- 1, 2: F-73, F-137, F-51, F-173. Searched "narrowest", "P-74".
- 4: F-137 (row 510). Searched "row 510".
- 5: F-296 (`fortress compile` bounds an unbounded parameter by `Any`), F-78. Searched "bounded by `Any`".

Checks: tests found; row 510 NEGATIVE-VERIFIED, agrees (S1). No SC finding.

Shape: one subject (the checker: static-argument inference, with walk's twin), much of it pointers. Title: inference with coercion on both paths; the body serves it, and repeats F-73 and F-137.

## F-56 "The compiled checker keeps the expected type ... at a call written `f(x)`"

Claims:
1. The checker keeps the expected type for inference at a call written `f(x)`, which the parser builds as a tight juxtaposition, and at a method call and an operator. *the checker: expected type* | property
2. Only desugarings reach the `fnApp = true` path of `Operators.scala:88-90`, so an edit of that path alone changes nothing for `f(x)`. *the checker: expected type* | detail
3. `InferCoercionShapes`. *the checker: expected type* | tests

Overlap:
- 1: F-87 (lists the other contexts). Searched "tight juxtaposition", "expected type".

Checks: `Operators.scala:88-90` agrees; test found (S1). No SC finding.

Shape: one subject (the checker: expected type). Title: expected type kept at `f(x)`; the body serves it.

## F-57 "A numeral's type depends on the path and on the library in scope"

Claims:
1. A numeral's type depends on the path and the library in scope. *the checker: numerals* (and walk) | property
2. In generic code only `x.zero`, `x.one` and the witness `typecase` give a `T` on both paths (P-78). *the library: generic numerals* | property
3. The checker types a numeral by its own numeral type, declared by both libraries, and converts it into its default where nothing fixes a type. *the checker: numerals* | pointer (F-79, F-342)
4. Walk gives an integer numeral its default by magnitude, and converts where its place fixes a type. *walk: numerals* | pointer (F-341)
5. Under `T extends Integral[\T\]`, `x + 1` fails the checker and runs under walk, since no coercion into `T` can be declared. *the checker: numerals* | defect (no row)
6. The checker refuses an out-of-range numeral statically; walk when the place runs. *the checker: numerals* | pointer (F-342, F-341)

Overlap:
- 1, 3, 4, 6: F-79, F-341, F-342, F-74, F-407. Searched "NaturalNumeral", "default".
- 2: F-59 (witness `typecase`), F-159, F-229. Searched "witness", "x.zero".
- 5: F-47 ("refused as a cyclic hierarchy", for a coercion with its own static parameter). Searched "cyclic hierarchy", "Integral[\T\]".

Checks: `Types.java` names found (S1). Claim 5 measured before the numeral types were redesigned: unsettled (SC, F-57). `x.zero` by reading only (entry's own words).

Shape: several subjects (the checker: numerals; walk: numerals; the library: generic numerals). Title: a numeral's type depends on path and library; claims 3, 4 and 6 repeat F-341, F-342 and F-79.

## F-58 "Under the compiled checker against today's one library, microGPT's flat program, C4, has 42 distinct error sites"

Claims:
1. On `c0c35b4f9e`, C4 has 42 distinct checker error sites of its own (31, 3, 8, 0 by file), each a floor. *the checker: microGPT's error sites* | detail (a count from one measurement)
2. 23 of them are the index bound that the helpers do not write (P-156). *the checker: microGPT's error sites* | detail
3. The model's four later diffs add and remove no site. *the checker: microGPT's error sites* | history
4. `MicroGptFlat`'s 8 are at the lines listed. *the checker: microGPT's error sites* | detail
5. Numeral powers, `1.0 s`, `matShape`'s `if` and line 38's sum are no sites. *the checker: microGPT's error sites* | detail (pointers F-366, F-364)
6. The checker reports nothing after line 52 of `step`, though it refuses `^T` on unsized arrays in a small program, so each count is a floor. *the checker: microGPT's error sites* | property
7. The APL program held 54 sites on `832f7d0d91`; none counted since. *the checker: microGPT's error sites* | history
8. In a scratch tree before batch 32, the compile command reported 17, 15 of them the model's unsized arrays (P-87). *the checker: microGPT's error sites* | history
9. Measured once; no test; the command. *the checker: microGPT's error sites* | detail

Overlap:
- 6: none found. Searched "42 distinct", "floor", "FlatArrays" (F-61, F-156, F-362 name the file for other points).

Checks: the command and the model's files found; counts not re-measured (S1). Whether the 42 sites, 23 the index bound, still hold after four library commits: unsettled (SC, F-58). `sources.md:1305` cites F-58 for `1.0 s`, should cite F-366 (SC, skill sentences).

Shape: mostly detail and history of one measurement (the checker: microGPT's error sites). Title: C4's 42 sites, a floor; the body serves it, with line lists that belong in the report.

## F-59 "`SUM` and `PROD` take their identity from the static argument"

Claims:
1. `SUM` and `PROD` take their identity from the static argument, by a witness `typecase` (P-78). *the library: reductions' identities* | property
2. The checker writes an unwritten static argument of a self-bounded big operator as the reduction's expected type, else its body's type. *the checker: reductions' static arguments* | pointer (F-364)
3. A plain-bounded big operator takes its bound, or the expected type where the bound does not fit. *the checker: reductions' static arguments* | pointer (F-221)
4. Walk instantiates the big operator at its value's declared type, else its elements' join, else leaves it open. *walk: reductions' static arguments* | pointer (F-228, F-143)
5. C4's one clause-form sum writes no static argument and both paths sum at `ZZ32`; the team's tests and the library write it. *the model program: reductions* | property (pointer F-285)
6. `SUM e` over a collection and `x DOT y` need none. *the library: reductions' identities* | property
7. `WitnessIdentityRungG`, `InferBigOperatorUnwritten`, `InferBigOperatorSelfBound`. *the checker: reductions' static arguments* | tests

Overlap:
- 1: F-57, F-159, F-229 (witness `typecase`), F-60. Searched "witness", "identity".
- 5, 6: F-364 ("the model's one clause-form sum does not (F-59)"), F-285. Searched "BIG MAX", "P-78", "SUM".

Checks: tests found (S1). "Table 2" is a bold line, not a heading: cites a thing that is gone (SC, F-59). `sources.md` cites F-59 for the reductions rule, should cite F-364, P-78 and F-285 (SC, skill sentences).

Shape: several subjects (the library: reductions' identities; the checker and walk: reductions' static arguments; the model program). Title: identity from the static argument and the checker's inference of it; claims 2 to 4 restate F-364, F-221, F-228.

## F-60 "The coercions between number types carry a sum's zero and a product's one"

Claims:
1. Coercions between number types carry a sum's zero and a product's one into every wider type, on both paths. *the library: reductions' identities* | property
2. They do not carry a maximum's identity, the type's least element; `ZZ` and `QQ` have none. *the library: reductions' identities* | property
3. The generic `BIG MAX` and `BIG MIN` have no identity, so an empty one raises `EmptyReduction`. *the library: reductions' identities* | property
4. `tests/simpleSum` asserts it for `BIG MIN`; `BIG MAX` raised under walk when measured. *the library: reductions' identities* | tests (and detail)
5. A reduction makes its identity at its own type (P-78). *the library: reductions' identities* | pointer

Overlap:
- 3: F-144 (the identity-less reductions are typed at their element type). Searched "EmptyReduction", "BIG MAX", "identity".

Checks: `simpleSum.fss` found, not run (S1). No SC finding.

Shape: one subject (the library: reductions' identities). Title: coercions carry zero and one but not a max's identity; the body serves it.

## F-61 "`perf-probes/prelude/REPORT.md` named three steps"

Claims:
1. A report named three steps to make the interpreter's library the compiler's: sizes in the checker, the tower's errors, the natives. *the repository: switch-over steps* | history
2. The first two are done. *the repository: switch-over steps* | plan
3. The steps point to F-67, F-131, F-32. *the repository: switch-over steps* | pointer
4. The report's run stopped in the library's apis. *the repository: switch-over steps* | history
5. The component's errors since are the distance, 0 since climb batch 22. *the harness and the gate: checker count and distance* | pointer (F-53)
6. No minimal `Array` or `Vector` added to the prelude can serve C4's `FlatArrays`, which would need about 1,000 lines of the library. *the compiled runtime: prelude* | property

Overlap:
- 5: F-53, F-245 ("0 since climb batch 22"). Searched "0 since", "distance".
- 6: F-11 (the prelude has no array type, row 305). Searched "shim", "NativeArray.fss", "FlatArrays".

Checks: the files cited found (S1). No SC finding. The curator's quoted question is in the history (S1, "Curator").

Shape: mostly history or plan. Title: a report's three steps, two done; claim 6 is a separate property that does not serve the title.

## F-62 "The tower closure, `AnyIntegral`'s `comprises` clause, checks as written"

Claims:
1. `AnyIntegral`'s `comprises` clause checks as written on the compiled checker, under the specification's reading (P-44). *the checker: comprises clauses* | property
2. The checker admits the unlisted `Integral[\I\]` by F-72's rule, which the specification states; the frozen 1.0 draft refuses it. *the checker: comprises clauses* | pointer (F-72, F-171)
3. Walk does not read the library's `comprises` clauses (rows 595, 596). *walk: comprises clauses* | defect (rows 595, 596)
4. The compiler library's `comprises I` idiom passes the checker and overflows walk's exclusion test (row 407). *walk: comprises clauses* | defect (row 407)

Overlap:
- 1, 2: F-72, F-171, F-121. Searched "AnyIntegral", "P-44".
- 3: F-29 (walk's load check on closed traits of the main component). Searched "rows 595", "row 595".
- 4: F-171 (walk overflows on a bare type variable, row 407), F-121. Searched "row 407", "comprises I".

Checks: rows 595, 596, 407 NEGATIVE-VERIFIED, agree (S1). No SC finding.

Shape: several subjects (the checker: comprises clauses; walk: comprises clauses). Title: the tower closure checks; the walk defects are beside it.

---

## Subject labels used, with their entries

- the checker: sizes: F-35, F-38, F-41, F-50
- the checker: exclusion rule: F-44, F-48
- the checker: export check: F-35
- the checker: stage order: F-42
- the checker: overloading memo: F-43
- the checker: overloading rules: F-50
- the checker: bound Any: F-49
- the checker: comprises T: F-46
- the checker: covariant: F-47
- the checker: coercions: F-47
- the checker: conditional extension: F-52
- the checker: static-argument inference: F-51, F-55
- the checker: expected type: F-56
- the checker: numerals: F-57
- the checker: microGPT's error sites: F-58
- the checker: reductions' static arguments: F-59
- the checker: comprises clauses: F-62
- the checker: value object Char: F-53
- the code generator: the fourteen components: F-34
- the code generator: type assumptions: F-34
- the code generator: static-parameter kinds: F-36
- the code generator: typecase: F-37
- the code generator: type mapping: F-44
- the compiled runtime: native bindings: F-32
- the compiled runtime: sizes at run time: F-36, F-37, F-38, F-40, F-41
- the compiled runtime: loop costs: F-40
- the compiled runtime: opr static arguments: F-39
- the compiled runtime: dispatch at call-site arguments: F-45
- the compiled runtime: prelude: F-47, F-61
- the compiled runtime: generic arms: F-50
- walk: exclusion rule: F-44
- walk: dispatch on run-time types: F-49
- walk: coercions of generic traits: F-47
- walk: conditional extension: F-52
- walk: static-argument inference: F-55
- walk: numerals: F-57
- walk: reductions' static arguments: F-59
- walk: comprises clauses: F-62
- the library: native bindings: F-32
- the library: dead sizes: F-35
- the library: opr static parameters: F-39
- the library: DOT: F-41
- the library: exclusion-rule repairs: F-44
- the library: fill and tabulate: F-49
- the library: array-scalar operators: F-51
- the library: generic numerals: F-57
- the library: reductions' identities: F-59, F-60
- the specification: opr static parameters: F-39
- the specification: exclusion rule alternatives: F-45, F-46, F-47
- the specification: refused examples: F-47, F-52
- the harness and the gate: one-library tests: F-34
- the harness and the gate: checker count and distance: F-42, F-43, F-44, F-53, F-54, F-61
- the harness and the gate: test corpus: F-39
- the tools: codegen measure: F-34
- the model program: reductions: F-59
- the repository: switch-over steps: F-61

## Entries that overlap

- Native bindings and their helpers: F-32, F-298, F-299 (the 401, the 373 and the 28; the two kinds of string).
- The code generator over the fourteen components: F-34, F-396, F-288.
- Sizes at run time on the compiled path: F-36, F-37, F-38, F-40, F-41, F-129, F-20.
- "No optimization uses a size": F-40, F-20.
- The exclusion rule and its kinds: F-44, F-48, F-167, F-131; row 406's `Flag` example in F-48, F-67, F-167; row 414 in F-48, F-129, F-167.
- Walk's row 416: F-44, F-91, F-129, F-155, F-252.
- Exclusion-rule alternatives (forest rule, route C): F-45, F-46, F-47; the call-site dispatch in F-45 and F-136.
- Refused specification examples: F-47, F-52, F-167, F-168.
- The checker count and the distance: F-42, F-43, F-53, F-54, F-281, F-245, F-288, F-295, F-61.
- The overloading memo: F-43 and F-80 (F-80's "keyed on all the inputs" reads against F-43's memo per pair).
- Inference with coercion: F-51, F-55, F-73, F-137, F-173; row 510 in F-55 and F-137.
- The expected type: F-56, F-87.
- Numerals: F-57, F-79, F-341, F-342, F-74, F-407.
- Reductions' static arguments and identities: F-59, F-364, F-285, F-221, F-228, F-60, F-144; witness `typecase` in F-57, F-59, F-159, F-229.
- `comprises` clauses and the tower closure: F-62, F-72, F-171, F-121; row 407 in F-62, F-171; `comprises T` overflow in F-46.
- Bound `Any` overloads: F-49, F-174.

## What the search could not settle

- F-39: whether nine test files declare an `opr` parameter (SC: 15 by a loose grep, 2 by a strict one).
- F-40 and F-20: "no optimization uses a size" rests on a code reading of 2026-09-24 (SC, F-20).
- F-43 and F-80: whether the overloading memo's key holds every input (F-80) or keeps a verdict per pair across traits (F-43); the two entries read against each other and no check today settles which holds.
- F-54: whether its "the `FortressLibrary` component to its end too (F-233)" carries the same unsupported pointer that SC finds in F-53; SC names only F-53.
- F-57: whether `x + 1` under `T extends Integral[\T\]` still fails the checker on today's library (SC, F-57).
- F-58: whether the 42 sites still hold (SC, F-58).
- F-35 claim 6 (export checker and dead sizes) and F-43's defect have no ledger row; the search found none under "export checker" or "overload.cache".
