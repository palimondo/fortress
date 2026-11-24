<!-- The claims of each FACTS entry of the chunk `landed-2` ("Landed semantics", F-222 to F-347, 31 entries), each with its subject, its kind, the other entries that say the same, and what today's checks say of it, as the first step of the sorting map for the batch mode of the record's consolidation; written 2026-11-24 under `brief-claims.md`, judging nothing new. -->

# Claims of the chunk `landed-2`

Conventions. Each claim is `cN · kind · subject · sentence`. "Overlap" lists, for each claim of the kinds property, defect and choice, the other FACTS entries that say the same or overlap, found by grepping the whole of `FACTS.md` (as of 2026-11-24) for the quoted words. "Checks" copies the finding of `evidence/consolidation/scout-landed-2.md` (abbreviated "scout"), of `evidence/stale-claims.md` ("stale") and, for F-252, of the pilot through stale-claims. Stale-claims says that this chunk had no writer: the scout checked only that the tests, files, rows and headings exist, and "a scout's 'found' is not a check that the entry is true". So "no finding" below means that only existence was checked. Rows are rows of the gap ledger. "The shared phases" names the phases that both paths run (fold, desugaring); the brief's list of areas has none for them, so I flag the label.

## F-222, "Walk computes a power in a size exactly"

- Claims:
  - c1 · property · walk: size arithmetic · Walk computes a power in a size exactly, as the compiled path does.
  - c2 · property · walk: size arithmetic · Walk refuses a negative exponent, which can come only from a static parameter.
  - c3 · property · walk: size range · A power beyond its parameter's kind is refused at binding, as any size is (F-140).
  - c4 · defect · the compiled runtime: class loader size checks · The class loader checks no size it computes against its kind, and stops on a negative exponent with a Java exception (row 675).
  - c5 · tests · walk: size arithmetic · Gated by `NatArithPowerWalk` and `NatPower*Walk`.
  - c6 · pointer · · Detail in `rung-popl-examples/REPORT.md` sections 3 and 6.
- Overlap:
  - c1: F-176 ("F-222 walk's arithmetic"), F-140 ("Walk reads and computes a size exactly"). Searched `power in a size`, `exactly`, `NatPower`.
  - c2: the skill (revival-changes.md:83 "Walk refuses a negative exponent"). Searched `negative exponent` (F-261, F-262, F-263 use it for integer powers).
  - c3: F-140 (whole claim). Searched `refused at binding`, `binds`.
  - c4: F-140 ("The compiled class loader checks no size that it computes ... (row 675; F-222)"), F-146 (row 675). Searched `row 675`.
- Checks: no finding. Scout: tests found; row 675 agrees.
- Shape: one subject (sizes) across two paths. Title: walk's exact power and refusal of a negative exponent; the body serves it, with c3 and c4 F-140's.

## F-228, "Under walk, a reduction or a comprehension that writes no static argument instantiates its big operator"

- Claims:
  - c1 · property · walk: reduction instantiation · Under walk a reduction or comprehension with no static argument instantiates its big operator by a declared type, else its elements' join, else its bound, an F-bounded parameter staying open.
  - c2 · pointer · · It builds P-48.
  - c3 · property · walk: reduction instantiation · The declared type is a local variable's or a function's declared return type, also where the clause form ends a block; eight other contexts do not direct it.
  - c4 · property · walk: reduction instantiation · Otherwise the clauses run once into `__elemsOf`, which keeps the elements in order at their join, and the reduction runs over them, each body once.
  - c5 · property · walk: reduction instantiation · A type or join that does not fit falls back to the bound, or open for an F-bound (F-143), so a `SUM` of `ZZ32` and `RR64` runs each `+` at its operands' types.
  - c6 · property · the library: big operator bodies · So instantiated, the library types `__bigOperator`'s local `body(i: I)` at the element type `I`.
  - c7 · history · walk: reduction instantiation · A big operator whose declared result is a trait of its own is read through the trait it extends (row 718, fixed).
  - c8 · defect · walk: reduction instantiation · An empty clause form that no declared type directs takes its bound or stays open (row 716).
  - c9 · defect · walk: reduction instantiation · A comprehension that no declared type reaches is built at its elements' join, which a declared `List[\Shape\]` of `Circle`s refuses (row 717).
  - c10 · defect · walk: reduction instantiation · A clause form that is a call's argument gets no declared type (rows 510, 705).
  - c11 · tests · walk: reduction instantiation · Gated by seven tests, `UnwrittenListMapComprehensionWalk` to `UserBigOperatorResultTraitWalk`.
  - c12 · pointer · · Detail in `rung-walk-elements/REPORT.md` (decision 6) and `rung-walk-overload-if/REPORT.md`.
- Overlap:
  - c1: F-141 ("A reduction or comprehension that writes no static argument fixes its big operator's parameter by the declared type of its value, else by its elements' join (F-228)"), F-143, F-144, the skill (SKILL.md and revival-changes.md:122). Searched `reduction or comprehension`, `join of`, `elements' join`.
  - c3: the skill (revival-changes.md:122). Searched `declared return type`.
  - c4: none found (searched `__elemsOf`).
  - c5: F-143 (open F-bound reaches only these cases). Searched `F-bound`.
  - c6: none found (searched `__bigOperator`: F-85 names `__bigOperator2`'s fused branch, another subject).
  - c8: F-143 ("an empty `SUM` or `PROD` that no declared type directs, which takes `ZZ32`'s identity", row 716). Searched `row 716`.
  - c9: none found (searched `row 717`).
  - c10: F-137 (row 510), F-221 ("Walk gives such an argument no expected type (row 705)"), F-55 (row 510). Searched `row 510`, `row 705`.
- Checks: no finding. Scout: tests found; rows 510, 705, 716, 717 agree, 718 FIXED agrees.
- Shape: one subject (walk: reduction instantiation). Title: the three-step instantiation; the body serves it.

## F-230, "`IntMap`'s `UPLUS` throws `KeyOverlap` on any shared key"

- Claims:
  - c1 · property · the library: IntMap union · `IntMap`'s `UPLUS` throws `KeyOverlap` on any shared key, in either order.
  - c2 · property · the library: IntMap union · So every `IntMap` comprehension and map expression with a repeated key throws, since `fromCC` builds them by `UPLUS`.
  - c3 · detail · the library: IntMap union · The paths are `NodeIM`'s `UPLUS` with a `SingletonIM` (`IntMap.fss:520`) and `nodeNode` for two many-entry maps.
  - c4 · property · the library: IntMap union · A key repeated with the same value throws too, as in `Map`'s comprehension (`Map.fss:161-168`).
  - c5 · property · the specification: comprehensions · The specification names only a different value as an error (`comprehensions.tex`).
  - c6 · tests · the library: IntMap union · Gated by `IntMapUplusSingleton`, `IntMapUplusManyEntry` and `IntMapComprehensionRepeatedKey`.
  - c7 · pointer · · Detail in `rung-library-factories/REPORT.md`.
- Overlap:
  - c1, c2, c4: none found (searched `UPLUS`, `KeyOverlap`, `IntMap`, `repeated key`); F-228 names only the test `IntMapComprehensionTypedWalk`.
  - c5: none found (searched `comprehensions.tex`, `different value`).
- Checks: no finding. Scout: tests and files found; the skill's sources.md:654 cites a revival-changes.md section "`UPLUS` of `IntMap`s on a shared key" that the scout did not find in revival-changes.md.
- Shape: one subject, with a departure from the specification unnamed by any row (c4 against c5). Title: `UPLUS` throws on any shared key; the body serves it.

## F-239, "Under walk, an `if` clause without a binding takes a `Boolean` by its value"

- Claims:
  - c1 · property · walk: if-clause conditions · Under walk an `if` clause without a binding takes a `Boolean` by its value, a `Just` of a `Maybe` as true and a `Nothing` as false.
  - c2 · property · walk: if-clause conditions · Walk refuses every other value, "If clause did not return boolean": a number, a string, `()`, a tuple, a function, another object.
  - c3 · property · walk: if-clause conditions · Walk tests the names only, so a `Just` is true whatever it holds, and a program's own `Just` below its own `Maybe` counts.
  - c4 · property · walk: if-clause conditions · A refusal while a top-level variable is initialised counts as a refusal at load.
  - c5 · defect · walk: if-clause conditions · The specification's `if` chapter allows a `Boolean` only (`if.tex:54`; row 746).
  - c6 · choice · walk: if-clause conditions · This reading is a default, the coordinator's call at climb batch 16.
  - c7 · tests · walk: if-clause conditions · Gated by `IfClauseObjectWalk`, `IfClauseNumberWalk`, `IfClauseStringWalk`, `maybeTest` and `naturalsTest`.
  - c8 · pointer · · Detail in `rung-walk-overload-if/REPORT.md`, "Row 673".
- Overlap:
  - c1, c2: F-7 ("such as F-239's refusal of an `if` on a value that is not a `Boolean`"); the skill (revival-changes.md:134 "walk takes a `Maybe` as an `if` condition"). Searched `If clause`, `Just`, `if` on.
  - c3, c4: none found (searched `Just`, `refusal at load`).
  - c5: none found (searched `row 746`).
  - c6: none found (searched `climb batch 16`, `coordinator's call`: F-141 uses it for another rule).
- Checks: no finding. Scout: tests and `if.tex` found; row 746 agrees. History: the scrape "at the curator's word of 2026-10-22"; the entry calls the reading a default.
- Shape: one subject. Title: what walk takes as an `if` condition; the body serves it.

## F-248, "Under walk, the team's generic `distribute` over `K`, with the `Any` method gone, keeps every fused answer"

- Claims:
  - c1 · property · the library: generic distribute · Under walk the team's generic `distribute` over `K`, the `Any` method gone, keeps every fused answer.
  - c2 · property · the library: generic distribute · `GeneratorDeclarations` and microGPT's quick pair keep their answers, and `MAX`/`MIN` over `SUM` and `SUM` over `PROD` still fuse.
  - c3 · defect · walk: generic method inference · A `SUM` of `SUM`s over a generator of generators stops without walk's inference of a generic method's static arguments (row 21).
  - c4 · history · walk: generic method inference · With that inference, on the tree that holds both, `NestedReductionFusion`'s `SUM` of `SUM`s is 11.
  - c5 · defect · the library: generic distribute · The team's explicit `r.distribute[\L1\](q)` stops every fused pair (row 744).
  - c6 · pointer · · Detail in `perf-probes/generic-distribute/REPORT.md` section 5.
- Overlap:
  - c1, c2: F-242 (`ActualReduction`'s generic `distribute`, clearing the fusion pairs' errors), F-243, F-250 (the library edits of the generic `distribute`), F-85 (`GeneratorDeclarations` and `NestedReductionFusion` run the arm fused). Searched `distribute`, `fus`.
  - c3: F-253 ("This inference lets the team's generic `distribute` over `K` run nested reductions under walk (F-248)"); F-20 cites row 21 for "Cannot unify". Searched `row 21`, `NestedReductionFusion`.
  - c5: F-405 (row 744, for another subject). Searched `row 744`.
- Checks: no finding. Scout: no "Gated by" list; `GeneratorDeclarations.fss`, `NestedReductionFusion.fss` and the quick pair found; row 744 agrees. Row 21 is stated as open in c3 while c4 says the tree holds the inference (F-253); the scout did not check row 21.
- Shape: mostly history or plan (a probe's result), with two subjects (the library: generic distribute; walk: generic method inference). Title: the generic `distribute` keeps every fused answer; the body serves it, but c3 depends on F-253's later inference.

## F-249, "Under walk, a program that imports only the prelude reaches the string objects' own `||`"

- Claims:
  - c1 · property · walk: string concatenation dispatch · Under walk the top-level `opr ||(a:String, b:String)` reaches the string objects' own `||` through its `typecase`.
  - c2 · property · the library: string concatenation · The objects' own `||` are `FlatString`'s and `EmptyString`'s, and `Concatenable`'s for `CatString` and `SubString`.
  - c3 · property · the library: string concatenation · `FortressLibrary` sees them only where an imported api states them, as `FlatString`'s api and `String.fsi:17-19`, `:29-31` do.
  - c4 · property · walk: string concatenation dispatch · So `"ab" || t` is a `FlatString` of depth 0, as while `String`'s abstract `||` stood (F-276).
  - c5 · pointer · · A concatenation of two literals is folded before walk (F-343).
  - c6 · history · walk: string concatenation dispatch · A probe's top-level meet with `Concatenable`'s body gave a `CatString` of depth 1.
  - c7 · tests · walk: string concatenation dispatch · Gated by `StringConcatenationFamiliesWalk.fss`.
  - c8 · pointer · · Detail in `rung-symbolic-library/REPORT.md` and `perf-probes/symbolic-operators/REPORT.md`.
- Overlap:
  - c1, c3, c4: F-276 ("the `(String, String)` `||` reaches `FlatString`'s and `Concatenable`'s own `||` by `typecase`, which String's api states (`Library/String.fsi:17-19`, `:29-31`), so under walk `"ab" || "cd"` stays a `FlatString` of depth 0"). Searched `Concatenable`, `depth 0`.
  - c2: F-83, F-286, F-344 name the four string objects. Searched `CatString`, `FlatString`.
- Checks: no finding. Scout: test and `String.fsi` found; no skill sentence.
- Shape: one subject. Title: the top-level `||` reaches the objects' own; the body serves it, and F-276 says the same.

## F-252, "Under walk, where the parameter-by-parameter check refuses two declarations with static parameters of their own"

- Claims:
  - c1 · property · walk: generic pairs at load · Where the parameter check refuses two own generics, or one beside a generic trait's functional method with none of its own, walk reads the pair again on its declared domains by the No Duplicates, Return Type and Meet Rules.
  - c2 · property · walk: generic pairs at load · A declaration has static parameters of its own if it is a generic function, a generic object's constructor, or a functional method with static parameters in a non-generic type.
  - c3 · property · walk: generic pairs at load · A pair that the parameter check finds excluding loads, except a plain declaration inside an own generic's domain differing only at object types (F-375).
  - c4 · property · walk: exclusion of generic pairs · Two generic functions of one name and one list are read at one shared symbolic instantiation, and two instances of one generic object as excluding object types.
  - c5 · defect · walk: exclusion of generic pairs · So `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])` excludes at one `T`, though a type extending `P[\ZZ32\]` and `Q[\String\]` has both.
  - c6 · property · walk: exclusion of generic pairs · Walk then withdraws such an exclusion where the instances do not exclude: instances of one generic type exclude only where their static arguments cannot be equal.
  - c7 · property · walk: exclusion of generic pairs · Any other exclusion stands where the pair still excludes with static parameters renamed apart, or where shared generic supertypes force equal arguments, as `Array` and `ImmutableArray` through `ReadableArray`.
  - c8 · property · walk: generic pairs at load · A withdrawn or refused pair is read on its declared domains, each over all its own instances, and loads if it meets the three rules.
  - c9 · property · walk: generic pairs at load · An own generic beside such a functional method is read as two own generics (F-318).
  - c10 · pointer · · A pair the parameter check orders is read only for No Duplicates (F-274); F-275 holds the Return Type Rule.
  - c11 · defect · walk: exclusion of instantiations · The parameter check does not find `Tg[\3\]` and `Tg[\4\]` excluding, so two plain declarations so typed are refused (row 416).
  - c12 · property · walk: exclusion of generic pairs · Two own generics so typed load where the whole-type reading finds the instances apart, as the `h[\I\]`/`h[\J\]` `Array` pair (F-155, F-258).
  - c13 · defect · walk: Meet Rule at load · For the Meet Rule walk looks for a covering third declaration only where each position is equal, a static parameter, or matching instances of one generic (row 539).
  - c14 · property · walk: Meet Rule at load · This search reads a self-naming bound from the declarations, so two such bounds meet, and unifies a symbolic size with a size parameter.
  - c15 · property · walk: exclusion of generic pairs · A pair whose domains exclude read whole also loads, where neither declaration has its own `where` clause (F-258; row 787).
  - c16 · property · walk: load check messages · A pair with a varargs parameter is not read again and keeps the parameter check's refusal (F-257).
  - c17 · property · walk: dispatch on declared domains · At a call, walk compares a functional method of a generic type on the call's instance; F-253 gives the generic dotted method.
  - c18 · tests · walk: generic pairs at load · Gated by fourteen tests in three groups (load and dispatch, the expected failure `XXXOverloadExistentialMeetWalk`, refusals and programs that load).
  - c19 · pointer · · Detail in `rung-walk-generic-pairs/REPORT.md` and `rung-walk-overload-if/REPORT.md`.
- Overlap:
  - c1, c8: F-27 ("Two generic declarations are read on their declared domains too (F-252: the No Duplicates, Return Type and Meet Rules, each over its own instances)"), F-257 (which pairs are read), F-405 (generic dotted methods at load), the skill (interpreter.md:61). Searched `declared domains`, `No Duplicates`.
  - c2: F-26 (the same definition: "A declaration has static parameters of its own if it is a generic function or constructor, or a functional method with static parameters in a trait or object without any"). Searched `static parameters of its own`.
  - c3: F-375 (whole). Searched `object types`.
  - c4-c7, c12, c15: F-258 (exclusion over the whole parameter type, `domainsExcludeTogether`), F-155 (the `h` pair loads), F-44 (no type extends two instantiations). Searched `exclude`, `domainsExcludeTogether`, `existential`, `row 787`.
  - c5: none found as a stated defect (searched `P[\T\]`, `shared symbolic`).
  - c9: F-318 (whole). Searched `genericPairValid`.
  - c11: F-129 c12, F-44, F-91, F-155 (row 416). Searched `row 416`.
  - c13: F-27 ("Walk still refuses the valid example of the POPL 2019 paper ... (row 539)"), F-174 (row 539). Searched `row 539`.
  - c14: none found (searched `symbolic size`).
  - c16: F-257 (whole). Searched `varargs`.
  - c17: F-26 (whole claim), F-253. Searched `on the instance`.
- Checks: stale (from the pilot): "'unifies a symbolic size with a size parameter' is in none of the sections the old text cites (its source is `rung-walk-overload-if/SKEPTIC.md` section 2, commit `aa4b46d6e`, gated by `tests/GenericSizePairNestedWalk.fss`). Kind: beyond its support. Source: pilot/pilot.md, F-252, Findings 2." And: "'loads and runs (F-155, F-258)' for the `h` pair has no test and was observed once ...; the cited section 5 ... shows the pair 'refused, the same (row 416)' and predates the whole-type reading. Kind: beyond its support. Source: pilot/pilot.md, F-252, Findings 1." Two sources differ: the scout found all 14 tests and rows 416, 539, 787 agreeing.
- Shape: several subjects (walk: generic pairs at load; exclusion of generic pairs; Meet Rule at load; exclusion of instantiations; dispatch on declared domains). Title: the load check reads refused own-generic pairs again by the three rules; the body serves it but holds the exclusion and withdrawal rules, which F-258 also owns.

## F-253, "Under walk, a call of a generic method that writes no static argument infers the method's own static arguments"

- Claims:
  - c1 · property · walk: generic method inference · Under walk a generic method call with no static argument infers the method's own static arguments from the arguments' run-time types, dotted or not, alone or among overloads.
  - c2 · property · walk: dispatch on declared domains · Among a receiver's overloads, where one is a generic dotted method and exactly one declared domain lies inside the other, walk chooses the inner one, else compares on the call's instance (F-252).
  - c3 · defect · walk: dispatch on declared domains · Two generic dotted methods whose bounds differ only in the api of one simple type name keep the object's (row 1134, F-405).
  - c4 · property · walk: generic method inference · A trait's generic method reads its bounds and conversion targets in the trait's method environment, so it takes the same instance as an object's: `ZZ32` and `ZZ64` give `Box[\ZZ64\]`.
  - c5 · property · walk: generic method inference · A bounded type parameter that nothing fixes takes its bound.
  - c6 · property · walk: generic method inference · An inherited generic functional method is chosen beside the object's plain one where only it applies.
  - c7 · property · walk: generic method inference · Where inference with conversion finds no instance, walk falls back to unification.
  - c8 · defect · walk: generic method inference · For a trait's method, unification reads the parentless member environment, not the bound, and fails with 'Cannot unify ZZ32 ... with Shape'; an object's fails with 'Meet(ZZ32, Shape) not a singleton'.
  - c9 · pointer · · This inference lets the team's generic `distribute` run nested reductions (F-248).
  - c10 · tests · walk: generic method inference · Gated by six tests, `MethodStaticArgInference.fss` to `InheritedGenericFunctionalMethodBesidePlain.fss`.
  - c11 · pointer · · Detail in `rung-walk-method-sargs` and `rung-walk-trait-method-bounds` reports.
- Overlap:
  - c1: the skill (interpreter.md:14, for generic functions); F-137 (inference with coercion for generic calls); F-405 ("A call that writes no static argument infers them and dispatches among the instances"). Searched `MethodStaticArg`, `infers`.
  - c2: F-26 ("a generic dotted method is chosen by F-253 (a generic method at a dotted call, also chosen on declared domains)"), F-405 ("the inner declared domain first"), the skill (revival-changes.md:15). Searched `declared domains`, `inner`.
  - c3: F-26 and F-405 (row 1134, the same words). Searched `row 1134`.
  - c4: F-137 (`ZZ32` with `ZZ64` gives `ZZ64`). Searched `Box[\ZZ64`.
  - c5: F-141. Searched `takes its bound`.
  - c6: none found (searched `InheritedGenericFunctionalMethod`).
  - c7, c8: F-20 ("Cannot unify", another case). Searched `Cannot unify`, `not a singleton`.
- Checks: no finding. Scout: tests found; row 1134 agrees.
- Shape: several subjects (walk: generic method inference; walk: dispatch on declared domains). Title: walk infers a generic method's static arguments; c2 and c3 (dispatch) are F-26's and F-405's.

## F-257, "Under walk, a pair of declarations that the load check refuses after it reads the pair on its declared domains is refused in the name of the rule"

- Claims:
  - c1 · property · walk: load check messages · A pair refused after reading on its declared domains is refused in the name of the rule it breaks.
  - c2 · property · walk: generic pairs at load · The pairs read on declared domains are the own-generic pairs (F-252, F-27, F-318), plain-inside-generic at object types (F-375), and two nested generic dotted methods (`methodPairValid`).
  - c3 · pointer · · A pair that the check orders is read only for No Duplicates (F-274).
  - c4 · property · walk: load check messages · The messages open "fails the Return Type Rule:", "fails the Meet Rule:" and "fails because their parameter lists have the same types".
  - c5 · defect · walk: generic pairs at load · The first two contain "not found" because walk's reading is narrower than the rules: rows 539 and 779 hold valid pairs walk refuses.
  - c6 · property · walk: load check messages · A pair not read on declared domains keeps the parameter check's message: varargs, lengths that differ, an error reading instances, two functional methods of generic traits (row 780), or an explicit instantiation's pair (`XXXGenericOverload2`).
  - c7 · property · walk: load check messages · The message does not decide which pairs load.
  - c8 · tests · walk: load check messages · Gated by nine tests in three groups (Return Type, Meet, No Duplicates).
  - c9 · pointer · · Detail in `rung-walk-trait-method-bounds/REPORT.md`.
- Overlap:
  - c1, c4: none found beyond F-274's quotation of the No Duplicates message. Searched `fails the`, `same types`.
  - c2: F-252 (c1), F-27, F-318, F-375, F-405 (generic dotted methods at load). Searched `declared domains`, `methodPairValid`.
  - c5: F-27, F-174, F-252 (row 539); F-174 ("In rows 779 and 780, walk fai..."). Searched `row 539`, `row 779`.
  - c6: F-405 (row 780), F-174. Searched `row 780`, `XXXGenericOverload2`.
- Checks: no finding. Scout: tests found; rows 539, 779, 780 agree.
- Shape: one subject (walk: load check messages), with F-252's scope repeated in c2. Title: refused in the rule's name; the body serves it.

## F-258, "Walk and the compiled checker read exclusion between two declarations ... over the whole parameter type, by existential reduction"

- Claims:
  - c1 · property · walk: exclusion of generic pairs · Walk and the checker read exclusion of two declarations with static parameters over the whole parameter type, by existential reduction.
  - c2 · property · walk: exclusion of generic pairs · Two domains exclude where the equalities that shared generic supertypes force cannot hold together, or where at the forced instance some position excludes.
  - c3 · detail · walk: exclusion of generic pairs · Walk's Meet branches ask `domainsExcludeTogether` (`OverloadedFunction.java:935`), which reads bounds and no `where` clause, varargs or lengths that differ, and `excludesAtMeet` (`:1041`).
  - c4 · property · the checker: exclusion of generic pairs · The checker's `OverloadingOracle.excludes` asks `emptyED` beside `subtypeED`, the reduction's first premise without bounds, and `meetEmptyWithBounds` (F-277).
  - c5 · detail · the checker: exclusion of generic pairs · On the interpreter's library `emptyED` is never reached: `subtypeED` shows all 691 meets the count stage tests empty.
  - c6 · defect · the checker: exclusion of generic pairs · The paths differ on two type parameters whose bounds exclude (row 786).
  - c7 · defect · walk: exclusion of generic pairs · Walk refuses a pair one of whose declarations has a `where` clause, which the checker accepts (row 787).
  - c8 · defect · walk: exclusion of generic pairs · Walk's parameter check reads `g[\T\](x: Box[\T\], y: ZZ32)` apart from `g(x: Box[\ZZ32\], y: Any)`, which walk loads and the checker refuses (row 788).
  - c9 · tests · walk: exclusion of generic pairs · Gated by four tests that load and three that are refused, on both paths.
  - c10 · pointer · · Detail in `rung-existential-reduction/REPORT.md`.
- Overlap:
  - c1, c2: F-252 (c4-c7, c15), F-27 ("declared domains that exclude each other read whole (F-258, exclusion over the whole parameter type)"), F-155. Searched `existential`, `exclude`, `whole parameter type`.
  - c3: F-318 (`domainsExcludeTogether`'s meet reads self-typed `self`). Searched `domainsExcludeTogether`, `genericPairValid`.
  - c4: F-277 (the checker's exclusion test, `meetEmptyWithBounds`). Searched `emptyED`, `meetEmptyWithBounds`.
  - c6: F-277 (`tint` refused, row 786). Searched `row 786`.
  - c7: F-252 (row 787). Searched `row 787`.
  - c8: none found (searched `row 788`).
- Checks: no finding. Scout: tests and the three source files found; rows 786 CONTESTED, 787, 788 agree. Line numbers inside the entry were not re-read (stale-claims, last paragraph).
- Shape: several subjects (walk: exclusion of generic pairs; the checker: exclusion of generic pairs). Title: both paths read exclusion over the whole type; the body serves it, with code sites (c3, c5) that are detail.

## F-259, "An object or trait whose `extends` clause names `Any` alone is an `Object` on both paths"

- Claims:
  - c1 · property · the shared phases: extends Any as Object · An object or trait whose `extends` clause names `Any` alone is an `Object` on both paths, by the pre-disambiguation desugaring.
  - c2 · property · the shared phases: extends Any as Object · The desugaring leaves `Any`'s, `Object`'s and `Index`'s own declarations as written, and gives a clause naming only `Index` an `Object` beside it.
  - c3 · property · walk: extends Any as Object · The library's `Index` (F-278) and such an object expression under walk are the exceptions of the title.
  - c4 · property · the library: string conversion of Any · `opr ||(a:Any, b:String)` is `("" || a) || b`, and `opr ||(a:String, b:Any)` is `a || cast[\Object\](b).asString` (top-level since F-276).
  - c5 · property · the library: string conversion of Any · `FlatString`'s api states its component's header, with no `opr ||(a:FlatString, self)`.
  - c6 · property · the library: string conversion of Any · So a tuple or `()` concatenates on the left of a string, and a function or a tuple of seven or more elements beside one raises `CastError`.
  - c7 · history · the library: string conversion of Any · The team test `extendAny` prints `Infinity`, and the distance's three `String` sites are gone: 34 to 31, the count 30 to 28.
  - c8 · tests · the shared phases: extends Any as Object · `ExtendsAnyIsObjectWalk.fss`, `ExtendsAnyIsObject.test`, `ConcatAnyOnLeftWalk.fss`, and the distance stage.
  - c9 · pointer · · Detail in `rung-string-conversion/REPORT.md`.
- Overlap:
  - c1, c2: none found (searched `extends Any`, `{Object}`, `ExtendsAnyIsObject`); F-291, F-265, F-174 use `extends Any` for a type parameter's bound, another subject.
  - c3: F-278 (the library's `Index`, cited). Searched `Index`.
  - c4: F-276 ("`||`, `|||`, `//` and `///` are declared at `(Any, String)`, `(String, String)` and `(String, Any)`"). Searched `opr ||(a:Any`, `(Any, String)`.
  - c5, c6: none found (searched `CastError`, `seven`).
- Checks: no finding. Scout: tests found; sources.md:740 cites a revival-changes.md section "An object or trait declared `extends Any`" that the scout did not find.
- Shape: several subjects (the shared phases: extends Any as Object; the library: string conversion of Any). Title: `extends Any` is `Object`, with three exceptions; the title is hard to read, and c4 to c7 (string conversion) are a separate subject.

## F-261, "Under walk, `unsigned` reinterprets the bits"

- Claims:
  - c1 · property · walk: integer conversions · Under walk `unsigned` reinterprets the bits: `unsigned(-1)` is `4294967295`.
  - c2 · property · walk: integer power · So a negative exponent converted for an unsigned power overflows: `2^unsigned(-1)` raises `IntegerOverflow`, not a sign error.
  - c3 · defect · walk: integer power · No test checks it.
  - c4 · pointer · · Detail in `reviews/integer-power-fable-judgement.md` sections 8 and 9.
- Overlap:
  - c1: F-331 ("`narrow`, `widen`, `signed`, `unsigned` and `big` keep the bits"), F-172 (the same in the specification), F-132 (low-bits conversions raise nothing). Searched `unsigned`, `unsigned(-1)`.
  - c2: F-263 (a power at any other base raises `IntegerOverflow`), F-132. Searched `2^unsigned`, `negative exponent`.
- Checks: no finding. Scout: no test named, as the entry says.
- Shape: one subject, a consequence of F-331 and F-263. Title: `unsigned` reinterprets bits, so the power overflows; the body serves it.

## F-262, "A numeral's sign does not reach its type on either path"

- Claims:
  - c1 · property · the checker: numeral types · A numeral's sign does not reach its type on either path, so no overload on a numeral exponent's type can tell `x^16` from `x^(-16)`.
  - c2 · property · the specification: numerals · The numeral itself has no sign (`lexical-structure.tex:1053-1080`).
  - c3 · property · the checker: numeral types · The checker types every integer numeral by `NaturalNumeral[\n, r, v\]`, whose static arguments hold no sign, under both libraries (`Misc.scala:469-472`).
  - c4 · property · the shared phases: numeral fold · Both paths fold prefix `-` on a numeral into a negative numeral node, and `^` of numerals by an integer numeral up to 4096 (F-339).
  - c5 · property · the shared phases: numeral fold · They leave an integer base at a negative exponent: `10^(-16)` stays an operation (`IntegerLiteralFoldingVisitor.java:315-325`).
  - c6 · pointer · · Walk's numeral is its default, a `ZZ32` value (F-74, F-341).
  - c7 · property · the shared phases: numeral fold · A negated numeral at a program's own type is the type's prefix `-` applied to the coercion's result, on both paths (P-174).
  - c8 · detail · the checker: numeral types · That no overload can tell the two exponents apart is by reading.
  - c9 · pointer · · Detail in `reviews/integer-power-fable-judgement.md` section 9.
- Overlap:
  - c1: none found (searched `numeral's sign`, `x^16`).
  - c3: F-79 ("The compiled checker's `Types.INT_LITERAL` and `FLOAT_LITERAL` name these two types"), F-342 (the checker gives a numeral its numeral type). Searched `NaturalNumeral`.
  - c4: F-339 (`^` by an integer numeral up to 4096, prefix `-`). Searched `4096`, `fold`.
  - c5: F-263 ("the numeral fold leaves an integer base at a negative exponent (F-262)"). Searched `negative exponent`.
  - c7: none found (searched `NegativeNumeralOwnType`, `NumeralStaticDesignWalk`: F-79 names the second test).
- Checks: no finding. Scout: files and tests found; the entry names no gating test.
- Shape: several subjects (the checker: numeral types; the shared phases: numeral fold). Title: no overload can tell the exponents apart; the body serves it, partly by reading.

## F-263, "In the interpreter's library each integer power is declared to answer its base's own type"

- Claims:
  - c1 · property · the library: integer power · In the interpreter's library each integer power answers its base's own type.
  - c2 · property · walk: integer power · Under walk, at a negative exponent, 1 and -1 give their exact power, 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`, on five types and any integer exponent type.
  - c3 · pointer · · It builds P-153.
  - c4 · property · walk: integer power · So `2^(-1)` raises `IntegerOverflow`, a numeral being a `ZZ32` (F-74) and the fold leaving it (F-262).
  - c5 · property · the library: integer power · `QQ`'s power takes any integer exponent type; for a fraction, write `2.0^(-1)` or `(2/3)^(-1)`.
  - c6 · property · the checker: integer power · The compiled checker accepts the library's own uses of these powers (the distance stage).
  - c7 · detail · the library: integer power · microGPT's only integer power is in `strToInt`, at a nonnegative exponent.
  - c8 · defect · the compiled runtime: integer power · The compiled library's `ZZ32` power gives 0 at a negative exponent for bases other than 0, 1, -1, and a raw `RuntimeException` at 0 (row 441).
  - c9 · defect · the compiled runtime: integer power · Its overflow throws a raw Java exception or saturates quietly (row 523), which P-153 lists.
  - c10 · tests · walk: integer power · `IntegerPowerContractWalk.fss`, `QQPowerExponent.fss`; compiled, the expected failure `XXXIntegerPowerContractCompiled.test`.
  - c11 · pointer · · Detail in `rung-integer-power/REPORT.md` and `perf-probes/integer-power/REPORT.md`.
- Overlap:
  - c1, c2: F-172 ("At a negative power, the bases 1 and -1 give their exact power, a base of 0 throws `DivisionByZero` ... The library follows the same power rule under walk; the compiled path's own library does not (F-263)"), F-327 (P-153 holds at the bare bindings), the skill (revival-changes.md:114). Searched `DivisionByZero`, `P-153`, `negative exponent`.
  - c4: F-262 (the fold leaves the base), F-261 (`2^unsigned(-1)` raises). Searched `2^`.
  - c6: none found (searched `distance stage` with power).
  - c8: none found (searched `row 441`).
  - c9: F-132 ("`^` saturates, throws an uncatchable Java exception or adds (rows 523 to 525)"). Searched `row 523`.
- Checks: no finding. Scout: tests found; rows 441, 523 agree. History: the scrape "at the curator's word of 2026-10-22".
- Shape: several subjects (the library and walk: integer power; the compiled runtime: integer power). Title: each power answers its base's type, with walk's negative-exponent rule; the body serves it.

## F-270, "The compiled checker opens a value of a trait whose `comprises` clause lists a type at a `where`-clause size"

- Claims:
  - c1 · property · the checker: comprises where-clause opening · The compiled checker opens a value of a trait whose `comprises` lists a type at a `where`-clause size, giving each `nat` and `int` size a fresh name for the call.
  - c2 · detail · the checker: comprises where-clause opening · In `NatParam comprises { N[\n\] } where [\ nat n \]`, a `NatParam` passed for `N[\$n\]` binds `$n` to the fresh size, and the result type carries it.
  - c3 · property · the checker: comprises where-clause opening · An opened size is not known to differ from any size.
  - c4 · property · walk: comprises where-clause sizes · Walk's `comprises` check at load reads such a size as any size, and at a call binds the argument's own size.
  - c5 · plan · the specification: array design · This is way 4a of fork 3 of the array design, reading a run-time size as fixed for the call; P-85 leaves the three questions open with no default, and way 4a is the one way built.
  - c6 · defect · the code generator: comprises where-clause sizes · The code generator compiles such a trait, but a call that opens its value fails verification (row 307; `XXXNatOpenRun`).
  - c7 · defect · the checker: comprises where-clause opening · The checker refuses `f(x: NatParamT)` beside `f[\nat n\](x: Nt[\n\])` as one parameter type, where walk runs the pair (row 682, contested).
  - c8 · pointer · · F-251 holds the same opening for a type variable.
  - c9 · tests · the checker: comprises where-clause opening · Gated by `NatOpenChecker`, and under walk by `NatOpenWalk` and `NatOpenUnlistedExtender`.
  - c10 · pointer · · Detail in `rung-size-expressions/REPORT.md` section 1 and 12.
- Overlap:
  - c1: F-251 ("as the compiled checker already does for a listed type's `nat` and `int` sizes (F-146)"), F-146, F-121 c3, the skill (compiler.md:184). Searched `opens`, `fresh`, `NatParam`.
  - c3: F-146 (sizes not known to differ), F-176. Searched `not known to differ`.
  - c4: none found (searched `NatOpenWalk`).
  - c6: F-181 ("A trait whose `comprises` clause lists a type at a `where`-clause size, of `NatParam`'s shape, compiles; a call that opens its value to the size fails verification (row 307)"), F-129 c7, F-377 (row 307). Searched `row 307`.
  - c7: none found (searched `row 682`).
- Checks: stale: "'Fork 3, way 4a, under Q13.3' is not a heading of `rung-size-expressions/REPORT.md` (a bold lead at line 23, inside section 1). Kind: cites a thing that is gone or moved. Source: scout-landed-2.md, F-270, Sources." Scout: tests found; rows 307, 682 CONTESTED agree. History: split from F-146; applied at the curator's word "apply all the improvements drafted" without review of each change.
- Shape: several subjects (the checker: comprises where-clause opening; walk: comprises where-clause sizes; the code generator; the specification: array design). Title: the checker opens such a value with fresh sizes; the body serves it, and c5 is a plan.

## F-274, "Under walk, two declarations whose declared domains are equal are refused by the No Duplicates Rule"

- Claims:
  - c1 · property · walk: No Duplicates Rule at load · Under walk two declarations with equal declared domains, one with static parameters of its own, are refused by the No Duplicates Rule, whether or not the parameter check orders them.
  - c2 · defect · walk: generic pairs at load · The parameter check reads a type parameter as strictly below its bound, so it orders `h[\T extends Number\](x: T, y: T)` before `h(x: Number, y: Number)`.
  - c3 · property · walk: No Duplicates Rule at load · Walk compares the declared domains over all instances and refuses: "fails because their parameter lists have the same types" (F-257).
  - c4 · property · walk: No Duplicates Rule at load · A parameter bounded by `Any` counts: walk refuses `g[\T\](a: T)` beside `g(a: Any)`.
  - c5 · property · the checker: No Duplicates Rule · The compiled checker refuses that pair too (row 759; `XXXNoDuplicatesRuleUnboundedBesideAny.test`).
  - c6 · tests · walk: No Duplicates Rule at load · Gated by `GenericBesideGenericSameDomain`, `GenericBesidePlainSameDomain`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk`.
  - c7 · pointer · · Detail in `rung-walk-generic-pairs` and `rung-existential-reduction` reports.
- Overlap:
  - c1, c3: F-27 ("Equal declared domains are refused"), F-252 (c10), F-257 (the message), F-223 ("those two refusals by `tests/GenericBesidePlainSameDomain` and `GenericBesideGenericSameDomain`"). Searched `No Duplicates`, `GenericBesideGenericSameDomain`.
  - c2: none found (searched `strictly below its bound`).
  - c4, c5: F-296 ("The No Duplicates Rule now refuses `g[\T\](a: T)` beside `g(a: Any)` on the compile command too (row 759)"), F-223 (the checker applies the rule). Searched `row 759`.
- Checks: no finding. Scout: tests found; row 759 FIXED (`1bc0a9083`); the named `XXX...` file exists beside the row's reproducer.
- Shape: one subject (the No Duplicates Rule), across paths. Title: walk refuses equal declared domains; the body serves it.

## F-275, "Under walk, ... the load check reads the Return Type Rule at one instance of the outer one"

- Claims:
  - c1 · property · walk: Return Type Rule at load · Where the parameter check refuses two own generics and one lies inside the other, walk reads the Return Type Rule at one instance of the outer one, found by inference at the inner one's parameter types.
  - c2 · property · walk: Return Type Rule at load · Walk refuses the pair unless that instance stands for every applicable instance, since an argument of the inner one can select a smaller instance.
  - c3 · property · walk: Return Type Rule at load · The instance stands for all where each static parameter in the outer return type is fixed by a parameter type's static argument.
  - c4 · property · walk: Return Type Rule at load · Or where the outer one returns its own type parameter and the inner one returns a matching type parameter of its own, or has an object type below its return type at such a position.
  - c5 · property · walk: Return Type Rule at load · Otherwise walk refuses the pair, "fails the Return Type Rule" (F-257).
  - c6 · property · the checker: Return Type Rule · The two `Shape`/`Round` example pairs are refused by walk and by the compiled checker.
  - c7 · tests · walk: Return Type Rule at load · Gated by `GenericReturnRuleOuterParamWalk`, `GenericReturnRuleInvariantWalk` (refused) and `GenericReturnRuleHoldsWalk`.
  - c8 · pointer · · Detail in `rung-walk-generic-pairs/SKEPTIC.md` section 2.
- Overlap:
  - c1-c5: F-252 (c10: "F-275 holds the Return Type Rule"), F-257 (the message), F-27 ("the inner one's return type lies below the outer one's", for generic beside plain), F-375 (generic beside plain at object types). Searched `Return Type Rule`, `GenericReturnRule`, `one instance of the outer`.
  - c6: F-44, F-50, F-75, F-225, F-394 (the checker's Return Type Rule in other cases). Searched `Return Type Rule`.
- Checks: no finding. Scout: tests found.
- Shape: one subject. Title: the rule read at one instance of the outer declaration; the body serves it.

## F-280, "The library's `=/=` over `Any` and its three-argument `assert` see a value's own `=` only through a `FortressLibrary` trait"

- Claims:
  - c1 · property · the library: equality and =/= · The library's `=/=` over `Any` and its three-argument `assert` call `=` in `FortressLibrary`'s scope (`FortressLibrary.fss:98`, `:308`).
  - c2 · defect · the library: equality and =/= · A type's own `=` reaches them only through a `FortressLibrary` trait's `=`, such as `Equality`'s; otherwise they compare by identity (row 807).
  - c3 · property · the library: equality and =/= · A type extending `Equality` reaches `Equality`'s `=/=`, the negation of its `=` (`:102`; F-366), before the one over `Any`.
  - c4 · property · the library: list equality · `List` extends `Equality[\List[\E\]\]` outside its conditional order (`List.fsi:67`), so a list's `=` stays elementwise whatever the condition.
  - c5 · tests · the library: equality and =/= · `XXXNotEqualOwnEquality`, `ListEqualityElementwise`.
  - c6 · pointer · · Detail in `rung-slices-list-equality/REPORT.md`.
- Overlap:
  - c1, c2: the skill (tests-writing.md:32 "It and `=/=` call a type's own `=` only if the type extends a `FortressLibrary` trait that declares `=`, such as `Equality` (ledger row 807)"). Searched `row 807`, `=/=`.
  - c3: F-366 ("`Equality[\T\]` declares `opr =/=(self, other:T)` as the negation of the type's `=` (`Library/FortressLibrary.fss:102`), which a type that extends `Equality` reaches before the `=/=` over `Any` (`:98`)"). Searched `Equality[\`, `=/=`.
  - c4: none found (searched `ListEquality`, `List.fsi:67`).
- Checks: no finding. Scout: tests and files found; row 807 agrees.
- Shape: one subject (the library: equality), with c4 its consequence for `List`. Title: `=/=` and `assert` see a type's `=` only through a library trait, so `List` extends `Equality`; the body serves it.

## F-304, "On both paths a numeral with a radix point becomes its `RR64` or `RR32` by one rounding"

- Claims:
  - c1 · property · the code generator: float numerals · On both paths a radix-point numeral becomes its `RR64` or `RR32` by one rounding of its exact value.
  - c2 · detail · the code generator: float numerals · Compiled, `CodeGen.forFloatLiteralExpr` rounds the exact quotient once (`roundToDouble`, `roundToFloat`; F-340).
  - c3 · detail · walk: numerals at places · Walk rounds once through `numeralToDouble` and `numeralToFloat` (F-79).
  - c4 · property · the specification: float literals · The specification asks "at most one floating-point rounding error" (`literals.tex`).
  - c5 · tests · the code generator: float numerals · `FloatNumeralOneRounding.test`.
  - c6 · pointer · · Detail in `rung-natives-float/REPORT.md`.
- Overlap:
  - c1: F-79 ("`RR64` and `RR32` from both by one rounding through `simpleDoubleArith.numeralToDouble` and `numeralToFloat`"), F-340 ("a float rounded once from its exact value"), F-341 (walk's radix-point numeral the `RR64` nearest its value), the skill (revival-changes.md:95). Searched `one rounding`, `roundToDouble`, `numeralToDouble`, `FloatNumeralOneRounding`.
- Checks: no finding. Scout: test and `literals.tex` found.
- Shape: one subject; each of its claims is said in F-79 or F-340. Title: one rounding on both paths; the body serves it.

## F-305, "`CHOOSE` on `ZZ32` and `ZZ64` names its helper on both paths"

- Claims:
  - c1 · property · the library: CHOOSE helpers · `CHOOSE` on `ZZ32` and `ZZ64` names its helper on both paths, `intOverflowingChoose` and `longOverflowingChoose` (`FortressLibrary.fss:918`, `:1030`).
  - c2 · pointer · · It builds P-73.
  - c3 · property · the library: CHOOSE helpers · The prelude binds them too, `NN32`'s compiled `CHOOSE` through the `ZZ64` helper; the one library's `NN32` names `unsignedIntOverflowingChoose` (F-313).
  - c4 · property · the library: CHOOSE helpers · The helpers are exact and raise `IntegerOverflow` past their tables, from `34 CHOOSE 17` on `ZZ32` and `68 CHOOSE 34` on `ZZ64`.
  - c5 · history · the library: CHOOSE helpers · Each slow-path call has its own scratch array, so parallel calls no longer corrupt each other.
  - c6 · detail · the library: CHOOSE helpers · Swept against the exact value, 64,649,240 `ZZ64` pairs and 6,023,925 `ZZ32` pairs give walk's glue arithmetic; code lines `simpleIntArith.java:174-175`, `:222-225` and others.
  - c7 · tests · the library: CHOOSE helpers · Five helper tests and two guards, `ChooseHelperWalk.fss` to `ChooseZZ64Walk.fss`.
  - c8 · pointer · · Detail in `rung-natives-choose/REPORT.md`.
- Overlap:
  - c1: F-299 (the binding counts: "their `CHOOSE` F-305"), F-306, F-314 (other `CHOOSE` bindings). Searched `CHOOSE`, `OverflowingChoose`.
  - c3: F-313 ("`NN32`'s `CHOOSE` name helpers"). Searched `NN32`'s `CHOOSE`.
  - c4: F-132 ("Its `CHOOSE` raises `IntegerOverflow` as walk's does (F-305)"), F-316 (a `CHOOSE` result that does not fit raises), F-172. Searched `IntegerOverflow`, `ChooseHelper`.
- Checks: no finding. Scout: tests and files found.
- Shape: one subject. Title: `CHOOSE` names its helper, exact and stateless; the body serves it.

## F-316, "Under walk, `GCD` and `LCM` are nonnegative, `0 LCM 0` is 0"

- Claims:
  - c1 · property · walk: GCD, LCM and CHOOSE · Under walk `GCD` and `LCM` are nonnegative and `0 LCM 0` is 0, on the four fixed widths and on `ZZ`.
  - c2 · property · walk: GCD, LCM and CHOOSE · On the four fixed widths `n CHOOSE k` answers 0 for `k < 0` or `k > n`.
  - c3 · defect · walk: GCD, LCM and CHOOSE · On `ZZ`, `CHOOSE` answers 1 there, where the specification gives 0 (row 887, `XXXChooseZZOutOfRangeWalk.fss`).
  - c4 · property · walk: fixed-width overflow · A `GCD`, `LCM` or `CHOOSE` result its type cannot hold, such as `MIN GCD 0`, raises `IntegerOverflow` (F-132).
  - c5 · property · the library: GCD and LCM sign · `LCM` carries no sign, so code that takes a direction from it computes the sign itself, as the team's `RangePrototype.fss` does.
  - c6 · property · the library: scalar ranges · The library's ranges do not depend on that sign.
  - c7 · tests · walk: GCD, LCM and CHOOSE · Gated by `IntSemanticsRungI.fss` (rows 334, 385, fixed) and `PowChooseLcmRungE.fss` (row 337, fixed).
  - c8 · pointer · · Detail in `rung-int-semantics-walk/REPORT.md`.
- Overlap:
  - c1: F-172 ("`GCD` and `LCM` are nonnegative, and one that a fixed-size type cannot hold throws `IntegerOverflow`"), F-314 (`GCD`, `LCM` name new helpers). Searched `GCD`, `nonnegative`, `0 LCM 0`.
  - c2: F-339 (the fold computes `CHOOSE` over integers). Searched `CHOOSE`.
  - c3: F-314 ("`ZZ`'s `CHOOSE` keeps the 1 of walk's former glue ... where the specification gives 0 (row 887)"). Searched `row 887`.
  - c4: F-132, F-172. Searched `IntegerOverflow`.
  - c5, c6: none found (searched `RangePrototype`, `sign`).
- Checks: no finding. Scout: tests and files found; rows 334, 337, 385 FIXED and 887 agree. History: split from F-125.
- Shape: one subject. Title: `GCD`, `LCM`, `CHOOSE` rules under walk; the body serves it.

## F-318, "Under walk, the load check reads an own generic beside a functional method of a generic trait on their declared domains"

- Claims:
  - c1 · property · walk: generic pairs at load · Under walk the load check reads an own generic beside a generic trait's functional method on declared domains, as two own generics (`genericPairValid`).
  - c2 · pointer · · It builds P-157 and P-152.
  - c3 · property · walk: self-typed traits at load · In `domainsExcludeTogether`'s meet, `self` of a trait self-typed directly is read as `C[\X\] & X`.
  - c4 · property · walk: self-typed traits at load · So a program's generic operators between a number array and a number, beside a self-typed additive group's own, load and run as on the compiled path.
  - c5 · history · walk: self-typed traits at load · In a scratch copy with `Number`'s `comprises` removed, before F-324 removed it, walk loaded and ran `BooleanOps`, `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary`, `extendNumber`.
  - c6 · defect · walk: self-typed traits at load · A trait self-typed through another, and a method with its own static parameters, are not read so and keep the refusal (row 999).
  - c7 · defect · walk: self-typed traits at load · Walk applies no extender rule of P-146, so an object extending a self-typed trait at a wrong type loads and runs one of two fitting declarations (row 893).
  - c8 · defect · the checker: self-typed traits · The checker refuses a generic function more specific than such a method, which walk loads (row 894).
  - c9 · tests · walk: self-typed traits at load · Gated by four load-and-dispatch tests and two refusals, `ExclusionVectorScalarWalk` to `GenericInsideTraitMethodReturnRuleWalk`.
  - c10 · pointer · · Detail in `rung-walk-vector-scalar/REPORT.md`.
- Overlap:
  - c1: F-252 (c9: "An own generic beside such a functional method is read as two own generics ... (F-318)"), F-257, F-258 (`genericPairValid`). Searched `genericPairValid`.
  - c3: F-277 (the checker reads `self` of an F-bounded self type as `C[\X\] & X`), F-225 (`self` in bodies as `C[\X\] & X`). Searched `C[\X\] & X`, `self-typed`.
  - c4: F-119 (the scalar extension), F-151. Searched `ArrayScalarExtension`.
  - c7: F-225 (the checker refuses an extender at another type, P-146), the skill (interpreter.md:74). Searched `P-146`, `row 893`.
  - c6, c8: none found (searched `row 999`, `row 894`).
- Checks: no finding. Scout: tests found; rows 893 NEGATIVE-VERIFIED, 894 CONTESTED, 999 NEGATIVE-BOUNDED agree.
- Shape: several subjects (walk: generic pairs at load; walk: self-typed traits at load; the checker: self-typed traits). Title: the load check reads the pair on declared domains with `self` as an intersection; the body serves it.

## F-324, "The one library's `Number` declares nothing"

- Claims:
  - c1 · property · the library: the trait Number · The one library's `Number` declares nothing: its `comprises`, `asFloat`, `=` and `exactValue` are struck (`FortressLibrary.fss:381-382`, `.fsi:289-290`).
  - c2 · pointer · · It builds P-160's second step and P-165.
  - c3 · defect · the library: the trait Number · The types declare `asFloat`, not P-165's getter `asRR64` (no row).
  - c4 · property · the library: equality between number types · 42 declarations give a pair of `=` for each of the 21 coercions, so two numbers of different types compare by value where a coercion joins them.
  - c5 · property · the library: equality between number types · Otherwise they compare by the fallback `a SEQV b` or a written `asFloat(x) = y`; a program's own number type by its own `=` or the fallback.
  - c6 · property · the library: the trait Number · The vector norm is declared at each of the eight types, and the reflective generator chooses among the five formerly listed types.
  - c7 · tests · the library: the trait Number · Six walk tests and the team's `ReflectiveQuickCheckTest`.
  - c8 · pointer · · Detail in `rung-number-open/REPORT.md`.
- Overlap:
  - c1: F-131 ("`Number` declares no `=`; each number type declares one ... (F-324)"), F-151 ("`Number` ... has no `comprises` clause now (F-324)"), F-227 (stale: "`Number` has no `comprises` clause now"), the skill (revival-changes.md:112). Searched `Number` declares, `exactValue`.
  - c3: F-323 ("another number type writes `asFloat(x)`, where P-165 names the getter `x.asRR64`, which no type declares (no row)"); the skill says "`x.asRR64`". Searched `asRR64`.
  - c4: F-366 (numerals and `=` at mixed types). Searched `21 coercions`, `NumberMixedEquality`.
  - c5: F-326 (`SEQV`). Searched `SEQV`.
  - c6: none found (searched `vector norm`, `reflective`).
- Checks: no finding. Scout: tests found. The scout quotes revival-changes.md:112 as saying each type "converts into `RR64` by its own getter, `x.asRR64`", which c3 says no type declares; the scout did not judge it.
- Shape: one subject (the library: `Number` and the types' equality). Title: `Number` declares nothing, each type declares `asFloat` and `=`; the body serves it.

## F-326, "Both paths answer `SEQV` by the specification's rule"

- Claims:
  - c1 · property · walk: strict equivalence · Both paths answer `SEQV` by the specification's rule: different types never, value objects field by field, floats by bits, reference objects and strings only with themselves.
  - c2 · detail · walk: strict equivalence · Walk does it in its value classes and `FTypeObject`'s field list.
  - c3 · property · the compiled runtime: strict equivalence · The compiled path does it in `equality.sEquiv`, reading a `value` object by the mark `ValueObjectMark` that the code generator adds, and tuples element by element.
  - c4 · defect · the compiled runtime: strict equivalence · Until the switch-over a compiled `===` reaches the prelude's family first, which compares numbers, strings and booleans by `=` (P-38, row 908).
  - c5 · property · walk: numerals at places · Under walk a float numeral bound to `RR64` converts, so it is `SEQV` a computed `RR64` of the same bits (F-341).
  - c6 · pointer · · Two string literals of one text are one object on both paths (F-343).
  - c7 · defect · walk: strict equivalence · A tuple of four or more compares by `SEQV` (row 923).
  - c8 · tests · walk: strict equivalence · `StrictEquivalenceRuleWalk.fss`, `ValueObjectCC64Walk.fss`, `StrictEquivalenceRuleCompiled.fss`.
  - c9 · pointer · · Detail in `rung-seqv-meaning/REPORT.md`.
- Overlap:
  - c1: F-328 (`SEQV` over `Any` bound to `equality.sEquiv`), F-374 ("`SEQV` compares the cells by identity"), the skill (revival-changes.md:57, SKILL.md on value objects). Searched `SEQV`, `StrictEquivalence`.
  - c3: the skill (compiler.md:95 `ValueObjectMark`). Searched `ValueObjectMark`.
  - c4: none found (searched `row 908`, `===`).
  - c5: F-341 ("`y: RR64 = 0.5` is `SEQV` a computed 0.5"). Searched `SEQV`.
  - c7: none found (searched `row 923`).
- Checks: no finding. Scout: tests found; rows 908, 923 agree. History: the curator asked on 2026-11-08 that accidental divergences not be recorded as language features.
- Shape: several subjects (walk: strict equivalence; the compiled runtime: strict equivalence), one topic. Title: both paths follow the specification's `SEQV`; the body serves it.

## F-329, "A `Char`'s `asExprString` writes one text on both paths"

- Claims:
  - c1 · property · the library: Char asExprString · A `Char`'s `asExprString` writes one text on both paths, which the parser reads back at every code point.
  - c2 · detail · the library: Char asExprString · Walk's binding and the prelude's name `simpleChar.charToExprString` (P-163), with its list of escapes and code forms, as `'é 00e9'`.
  - c3 · property · the parser: character literals · The parser reads codes of four to six digits in either case (`Literal.rats:460-466`).
  - c4 · defect · the parser: character literals · A character past U+FFFF written as itself does not parse (row 924).
  - c5 · tests · the library: Char asExprString · `NativeHelperFamilyCharWalk`, `NativeHelperFamilyCharCompiled`, `CharExprStringReadBack`; `XXXCharLiteralSupplementary`.
  - c6 · pointer · · Detail in `rung-char-expr-string/REPORT.md`.
- Overlap:
  - c1, c2: F-308 ("`Char`'s `asExprString` names `simpleChar.charToExprString` (F-329)"). Searched `charToExprString`, `asExprString`.
  - c3, c4: none found (searched `row 924`, `FFFF`, `Literal.rats`).
- Checks: no finding. Scout: tests and `Literal.rats` found; row 924 agrees.
- Shape: one subject, with a parser side claim. "The parser" is not an area of the brief's list; flagged. Title: one text, read back; the body serves it.

## F-331, "The integer types convert by checked `as…` getters ..."

- Claims:
  - c1 · property · the library: integer conversions · On the five integer types the getters `asZZ32` to `asZZ` keep the value or raise `IntegerOverflow`.
  - c2 · detail · the library: integer conversions · Of the 25 getters, 5 are identities, 7 equal the coercions, 13 can raise (8 Fortress bodies, 5 bare helper bindings).
  - c3 · property · the library: integer conversions · `bitsAsNN32`/`bitsAsNN64` equal `unsigned`, and `bitsAsZZ32`/`bitsAsZZ64` equal `signed`.
  - c4 · property · the library: integer conversions · `narrow`, `widen`, `signed`, `unsigned` and `big` keep the bits on every type where they apply, and return a value already of the result type.
  - c5 · property · the library: integer conversions · `ZZ` has `big` only, so `narrow(z)` of a `ZZ` finds no declaration (write `z.asZZ32`).
  - c6 · property · walk: integer conversions · Under walk no conversion goes through a coercion.
  - c7 · defect · the compiled runtime: integer conversions · Until the switch-over the compiled prelude has 8 of the 25 getters and no `big` (row 349).
  - c8 · pointer · · F-299 counts the bindings.
  - c9 · tests · the library: integer conversions · `IntegerConversionsWalk`, `IntegerConversionHelpersCompiled`, `XXXZZNarrowRungP`.
  - c10 · pointer · · Detail in `rung-integer-conversions/REPORT.md`.
- Overlap:
  - c1: F-172 ("The getters `asZZ32` ... keep the value or throw `IntegerOverflow`"), F-124 (`asZZ32` throws out of range), F-132, the skill (revival-changes.md:110). Searched `asZZ32`, `getter`.
  - c3: none found (searched `bitsAs`).
  - c4: F-172 ("`narrow`, `widen`, `signed`, `unsigned` and `big` keep the bits and throw nothing"), F-132, F-124 (`narrow` keeps the low 32 bits), F-261 (`unsigned` reinterprets). Searched `narrow`, `unsigned`.
  - c5: F-172 ("`ZZ` has neither `narrow` nor `widen`"). Searched `` `big` ``.
  - c7: none found (searched `row 349`).
- Checks: no finding. Scout: tests found; row 349 agrees.
- Shape: one subject. Title: checked getters, bit getters, low-bits names, and `ZZ` out only by getters; the body serves it, and F-172 says most of it of the specification.

## F-339, "Both paths fold an expression of numerals alone exactly into a numeral before the checker"

- Claims:
  - c1 · property · the shared phases: numeral fold · Both paths fold an expression of numerals alone exactly into a numeral before the checker.
  - c2 · detail · the shared phases: numeral fold · The fold phase is in walk's phase order too, INTEGERLITERALFOLDING after PRETYPECHECKDESUGAR (`PhaseOrder.java`).
  - c3 · property · the shared phases: numeral fold · It folds the arithmetic and comparison operators exactly (`/` by a nonzero numeral, `^` by an integer numeral up to 4096), and `DIV` to `MINMAX` over integers.
  - c4 · property · the shared phases: numeral fold · It leaves the wrapping, saturating and bitwise operators, the shifts, a division by zero and a possible `-0.0`.
  - c5 · property · the shared phases: numeral fold · A result is an integer numeral, a decimal, a quotient or a boolean, so under walk `2147483647 + 1` is 2147483648 and `0.1 + 0.2` is `0.3`.
  - c6 · property · the harness and the gate: tests of fixed-width arithmetic · A test that means fixed-width arithmetic writes typed operands.
  - c7 · tests · the shared phases: numeral fold · `NumeralFoldWalk.fss`, `LiteralFoldCompiled.test`, `NumeralFoldJUTest`.
  - c8 · pointer · · Detail in `rung-literal-fold/REPORT.md`.
- Overlap:
  - c1: the skill (SKILL.md "The phases", step 4; revival-changes.md:101; SKILL.md "an expression of numerals alone folds exactly"), F-262 (c4), F-402 (another fold, `||` of numerals, same tests). Searched `fold`, `NumeralFold`, `INTEGERLITERALFOLDING`.
  - c3, c4: F-262 ("fold `^` of numerals by an integer numeral up to 4096 (F-339)"). Searched `4096`.
  - c5: the skill (revival-changes.md:101 "`2147483647 + 1` is the `ZZ64` 2147483648"). Searched `2147483647 + 1`, `0.1 + 0.2`.
  - c6: none found (searched `typed operands`).
- Checks: no finding. Scout: tests and `PhaseOrder.java` found.
- Shape: one subject. Title: both paths fold numerals exactly before the checker; the body serves it, and the skill states it.

## F-340, "On the compiled path a folded constant at a typed place ... is that type's constant"

- Claims:
  - c1 · property · the code generator: numeral constants · On the compiled path a folded constant at a typed place of the seven number types is that type's constant, a float rounded once from its exact value.
  - c2 · property · the code generator: numeral constants · A numeral as written there is its type's own coercion folded (F-347).
  - c3 · detail · the checker: numeral coercions · The coercion desugarer types a folded constant at the place's type and leaves a numeral as written its coercion call (`CoercionDesugarer.scala`).
  - c4 · detail · the code generator: numeral constants · The code generator emits `make` for the first, a float from `roundToDouble`/`roundToFloat`, and folds the coercion's body for the second, so `x: RR64 = 0.9999999999999999` is below 1.0.
  - c5 · property · the code generator: numeral constants · A place whose value is no JVM constant is a static field `numeral$coercion$N` filled in the static initializer, and a raising coercion stops the program before `run()`.
  - c6 · defect · the code generator: numeral constants · A place whose type names a type parameter is not hoisted (row 957).
  - c7 · tests · the code generator: numeral constants · `FloatNumeralOneRounding.test`, `NumeralCoercionOnceCompiled.test`, `NumeralCoercionRaisesCompiled.test`, `NumeralFoldFloats.test`.
  - c8 · pointer · · Detail in `rung-literal-fold` and `rung-static-numerals` reports.
- Overlap:
  - c1: F-118 ("A folded constant that the coercion desugarer types at a library number type is that type's constant (F-340)"), F-304 (one rounding, `roundToDouble`). Searched `forIntLiteralExpr`, `roundToDouble`, `folded constant`.
  - c2, c5: F-347 (whole: a place is one value made before the program runs, a JVM constant or a static final), the skill (compiler.md:93). Searched `numeral$coercion`, `static initializer`.
  - c6: F-347 (row 957). Searched `row 957`.
- Checks: no finding. Scout: tests and files found; row 957 agrees.
- Shape: one subject (the code generator: numeral constants), shared with F-347. Title: a folded constant is the type's constant, a numeral its coercion folded; the body serves it.

## F-341, "Walk's numeral is its default, carrying the numeral's four numbers"

- Claims:
  - c1 · property · walk: numerals at places · Walk's numeral is its default, carrying its four numbers: an integer numeral a `ZZ32`, `ZZ64` or `ZZ` by value, a radix-point one the nearest `RR64`, one value per site (`Numerals.java`).
  - c2 · property · walk: numerals at places · At a typed binding, assignment, field, parameter, declared return or coercion it converts through the place type's coercion from the numeral type, with the four numbers converting where they stand (F-407), one result per site and type.
  - c3 · property · walk: numerals at places · A folded constant at a library number type converts from its exact value, outside the coercion.
  - c4 · property · walk: numerals at places · A numeral out of range, rounding to an infinity, at a type with no coercion from it, or outside its coercion's `where` clause is refused when it runs; a store keeps its default.
  - c5 · property · walk: dispatch on numerals · Dispatch fits it at its default, unless its own coercion reaches a declaration strictly below (F-366), else by its type's coercions, reading a tie at the default.
  - c6 · property · walk: static argument inference · A type parameter that several numerals fix takes the narrowest default holding them all.
  - c7 · detail · walk: numerals at places · So `q: QQ = 0.1` is 1/10, `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `h = 0.5` is `true` for `h: QQ = 1/2` by `QQ`'s `=` (F-366).
  - c8 · property · walk: numeral types refused at load · At load walk refuses a numeral type written as an extended or listed type, a static argument, or a return, variable, field or value-parameter type; as a bound or a `typecase` arm's type it loads (row 1135).
  - c9 · tests · walk: numerals at places · Ten numeral tests and the load check's `NumeralType*Walk.fss`.
  - c10 · pointer · · Detail in five rung reports.
- Overlap:
  - c1: F-74 ("an integer numeral where nothing fixes a type takes its default by its value"), F-342 (the checker's twin), the skill (SKILL.md "Numbers"; revival-changes.md:93, :97). Searched `default`, `Numerals.java`.
  - c2: F-79 ("Under walk a numeral reaches these declarations where its place fixes a type (F-341)"), F-407 (the four numbers convert where they stand). Searched `four numbers`, `F-407`.
  - c3: F-347 ("Under walk a folded constant at a library type converts from its exact value"), F-340. Searched `exact value`.
  - c4: F-342 (the checker refuses a numeral out of range or rounding to an infinity). Searched `infinity`, `out of range`.
  - c5: F-366 (whole rule). Searched `strictly below`.
  - c6: F-342 and F-73 ("A type parameter that numerals alone fix ... takes the narrowest default that holds them all"). Searched `narrowest default`.
  - c8: F-342 (the checker: a numeral type written only as a parameter's type), the skill (interpreter.md:29, row 1135). Searched `row 1135`, `NumeralType`.
- Checks: no finding. Scout: tests and `Numerals.java` found; row 1135 agrees.
- Shape: several subjects (walk: numerals at places; dispatch on numerals; static argument inference; numeral types refused at load). Title: walk's numeral is its default and converts where its place fixes a type; c5, c6 and c8 go past the title.

## F-343, "Two string literals of one text are one object on both paths"

- Claims:
  - c1 · property · walk: string literal identity · Two string literals of one text are one object on both paths: walk interns a literal's text and compares flat strings by their Java strings.
  - c2 · property · the compiled runtime: string literal identity · The compiled path loads a literal with `ldc`, and `equality.sEquiv` compares two `FJavaString`s' strings by `==`.
  - c3 · property · the shared phases: string literal fold · The pre-typecheck desugaring folds infix `||` of string literals, or of string and character literals with a string among the first two.
  - c4 · defect · the library: character concatenation · `'a' || 'b'` is not folded: neither library declares `||` on two characters, and both paths refuse the call.
  - c5 · choice · the library: character concatenation · A worker left it so (climb batch 29's rung S, its decision 4).
  - c6 · property · walk: string literal identity · So `"ab" SEQV "ab"` and `("foo" || "bar") SEQV "foobar"` are `true`, and a string built at run time is a new object, except where Java answers the same string.
  - c7 · property · the harness and the gate: tests of ropes · A concatenation of literals is a flat literal, so a test that needs a rope joins a literal with a variable.
  - c8 · tests · walk: string literal identity · `StringLiteralIdentityWalk.fss`, `StringLiteralIdentityCompiled.test`.
  - c9 · pointer · · Detail in `rung-string-literals/REPORT.md`.
- Overlap:
  - c1, c2, c6: F-326 ("two string literals of one text are one object on both paths (F-343)"), the skill (revival-changes.md:64, P-171). Searched `intern`, `StringLiteralIdentity`, `SEQV`.
  - c3: F-249 ("a concatenation of two literals is folded into one before walk, F-343"). Searched `folded`.
  - c4: none found (searched `two characters`, `'a' || 'b'`).
  - c5: none found (searched `climb batch 29`; F-402 cites the batch for another point).
- Checks: no finding. Scout: tests and files found.
- Shape: several subjects (string literal identity on each path; the shared phases: string literal fold; the library: character concatenation). Title: literal identity and the fold of `||`; the body serves it.

## F-347, "Every numeral's place on the compiled path whose type names no type parameter is one value made before the program runs"

- Claims:
  - c1 · property · the code generator: numeral constants · A compiled numeral place whose type names no type parameter is one value made before the program runs: a JVM constant where the coercion's fold ends in a primitive, else a static final filled once.
  - c2 · detail · the code generator: numeral constants · The code generator folds the coercion's body over a fragment of constants, bound names, natives and calls (`NumeralCoercionFold.java`).
  - c3 · property · the code generator: numeral constants · The method `coerce_T№natural` or `coerce_T№point` is compiled once in the declaring component and called from any component; a program type's minus on a negative constant runs once with it.
  - c4 · property · the code generator: numeral constants · A number of the four typed at a bounded number type converts from its `ZZ` in the method and in the fold (F-407).
  - c5 · defect · the code generator: numeral constants · A place whose type names a type parameter calls the method at each evaluation (row 957).
  - c6 · property · the compiled runtime: tasks in static initializers · A coercion body with two calls of the program's functions in one operator or argument list spawns a task, which runs in place inside the root task initializing the class (F-348).
  - c7 · property · walk: numerals at places · Under walk a folded constant at a library type converts from its exact value.
  - c8 · tests · the code generator: numeral constants · `NumeralCoercionFoldJUTest`, `NumeralFoldIntegers`, `NumeralFoldFloats`, `NumeralAcrossComponent`, `NumeralMinusOnceCompiled`, `NumeralCoercionOnceCompiled`.
  - c9 · pointer · · Detail in `rung-static-numerals/REPORT.md`.
- Overlap:
  - c1: F-340 (c2, c5: a numeral as written is its coercion folded; a static field filled in the static initializer), F-118 (c4), the skill (compiler.md:93). Searched `NumeralCoercionFold`, `static final`, `numeral$coercion`.
  - c3: none found (searched `coerce_T`).
  - c4: F-407 (whole), F-342. Searched `F-407`, `four numbers`.
  - c5: F-340 (row 957). Searched `row 957`.
  - c6: F-348 (cited; root task). Searched `root task`, `F-348`.
  - c7: F-341 (c3). Searched `exact value`.
- Checks: no finding. Scout: tests and files found; row 957 agrees. Stale lists F-348 as not re-checked by its writer (exec chunk).
- Shape: one subject (the code generator: numeral constants), shared with F-340. Title: each place is one value made before the run; the body serves it.

## Subject labels used

- the checker: comprises where-clause opening: F-270
- the checker: exclusion of generic pairs: F-258
- the checker: integer power: F-263
- the checker: No Duplicates Rule: F-274
- the checker: numeral coercions: F-340
- the checker: numeral types: F-262
- the checker: Return Type Rule: F-275
- the checker: self-typed traits: F-318
- the code generator: comprises where-clause sizes: F-270
- the code generator: float numerals: F-304
- the code generator: numeral constants: F-340, F-347
- the compiled runtime: class loader size checks: F-222
- the compiled runtime: integer conversions: F-331
- the compiled runtime: integer power: F-263
- the compiled runtime: strict equivalence: F-326
- the compiled runtime: string literal identity: F-343
- the compiled runtime: tasks in static initializers: F-347
- the harness and the gate: tests of fixed-width arithmetic: F-339
- the harness and the gate: tests of ropes: F-343
- the library: big operator bodies: F-228
- the library: character concatenation: F-343
- the library: CHOOSE helpers: F-305
- the library: Char asExprString: F-329
- the library: equality and =/=: F-280
- the library: equality between number types: F-324
- the library: GCD and LCM sign: F-316
- the library: generic distribute: F-248
- the library: integer conversions: F-331
- the library: integer power: F-263
- the library: IntMap union: F-230
- the library: list equality: F-280
- the library: scalar ranges: F-316
- the library: string concatenation: F-249
- the library: string conversion of Any: F-259
- the library: the trait Number: F-324
- the parser: character literals (flagged: not an area of the brief's list): F-329
- the shared phases: extends Any as Object (flagged): F-259
- the shared phases: numeral fold (flagged): F-262, F-339
- the shared phases: string literal fold (flagged): F-343
- the specification: array design: F-270
- the specification: comprehensions: F-230
- the specification: float literals: F-304
- the specification: numerals: F-262
- walk: comprises where-clause sizes: F-270
- walk: dispatch on declared domains: F-252, F-253
- walk: dispatch on numerals: F-341
- walk: exclusion of generic pairs: F-252, F-258
- walk: exclusion of instantiations: F-252
- walk: extends Any as Object: F-259
- walk: fixed-width overflow: F-316
- walk: GCD, LCM and CHOOSE: F-316
- walk: generic method inference: F-248, F-253
- walk: generic pairs at load: F-252, F-257, F-274, F-318
- walk: if-clause conditions: F-239
- walk: integer conversions: F-261, F-331
- walk: integer power: F-261, F-263
- walk: load check messages: F-252, F-257
- walk: Meet Rule at load: F-252
- walk: No Duplicates Rule at load: F-274
- walk: numeral types refused at load: F-341
- walk: numerals at places: F-304, F-326, F-341, F-347
- walk: reduction instantiation: F-228
- walk: Return Type Rule at load: F-275
- walk: self-typed traits at load: F-318
- walk: size arithmetic: F-222
- walk: size range: F-222
- walk: static argument inference: F-341
- walk: strict equivalence: F-326
- walk: string concatenation dispatch: F-249
- walk: string literal identity: F-343

## Entries that overlap

- Walk's load check of generic pairs: F-252 (the hub), F-257 (messages), F-258 (exclusion over the whole type), F-274 (No Duplicates), F-275 (Return Type), F-318 (beside a trait's functional method), with F-26, F-27, F-375, F-405, F-155, F-223, F-296, F-174, F-277. The `h` pair is said in F-252 and F-155, each citing the other (stale).
- Walk's dispatch and inference for generic methods: F-253 with F-26 and F-405 (row 1134 in all three), F-137, F-141, and F-248 c3 (row 21 against F-253's inference).
- Reduction instantiation: F-228 (owner) with F-141, F-143, F-144, F-131, F-221 (row 705), F-137 and F-55 (row 510).
- Numerals: F-341, F-347, F-340, F-304, F-339, F-262, F-263 c4, F-326 c5, with F-74, F-79, F-118, F-342, F-366, F-402, F-407. F-304 says nothing that F-79 and F-340 do not.
- The compiled numeral place: F-340 and F-347 (row 957 in both; the static field), with F-118.
- Integer rules: F-261, F-263, F-305, F-316, F-331 with F-172 (the specification's integer chapter, which says most of F-316 c1, F-331 c1/c4/c5 and F-263 c2), F-124, F-132, F-314 (row 887), F-327 (P-153), F-299, F-313.
- String concatenation: F-249 and F-276 (the same `typecase` route and depth 0), F-259 c4 and F-276 (the `||` over `Any`), F-343 c3 with F-249 c5.
- Equality: F-280 c3 and F-366 (`Equality`'s `=/=` at `:102` before `:98`), F-324 c4 with F-366 and F-131, F-326 with F-328, F-374, F-341, F-343.
- `Number`'s declarations: F-324, F-131, F-151, F-227, F-323 (`asRR64` named by P-165, declared by no type).
- Sizes: F-222 with F-140, F-146, F-176 (row 675); F-270 with F-121, F-146, F-251, F-181, F-129, F-377 (row 307).
- The generic `distribute`: F-248 with F-242, F-243, F-250, F-85, F-253.
- `Char`'s `asExprString`: F-329 and F-308.
- `if` on a non-`Boolean`: F-239 and F-7.

## Not settled by the search

- F-230 c4 against c5: a key repeated with the same value throws, where the specification names only a different value; no entry or row says whether this is a departure (searched `UPLUS`, `KeyOverlap`, `repeated key`). The skill's sources.md cites a revival-changes.md section the scout did not find.
- F-248 c3: whether row 21 still stops the `SUM` of `SUM`s on today's tree, given F-253's inference; the scout did not look up row 21.
- F-252 c12 and c14: beyond their support (pilot, through stale-claims); the scout found the tests, so the two sources differ.
- F-259 c1-c2: no other entry and no skill sentence found (the scout reports the cited revival-changes.md section missing).
- F-262 c1 and F-263 c6: by reading or by the distance stage only; no other entry repeats them.
- F-324 c3 against the skill: revival-changes.md:112, as the scout quotes it, gives `x.asRR64` as each type's getter, while F-324 and F-323 say no type declares it.
- F-343 c4-c5: no row and no other entry for `'a' || 'b'`.
