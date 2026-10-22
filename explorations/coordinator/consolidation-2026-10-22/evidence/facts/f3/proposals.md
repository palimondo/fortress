<!-- The FACTS clarity pass, chunk f3, 2026-10-22: F-40 to F-51 rewritten from the chunk's assessment and fixed from its cold read and check, with three new entries split from F-42 and F-48, each with its change of meaning, the source of each sentence and its questions. -->

# FACTS chunk f3: the rewrite

The base is `main` as `assessment.md` read it. All twelve entries are rewritten; the assessment keeps none. F-42 and F-48 are split: F-?1 comes from F-42, and F-?2 and F-?3 from F-48. No entry outside the chunk points to F-42 or F-48 (`git grep`), so no pointer needs repointing. Each sentence's source was read again for this pass, except where a line below says it rests on the assessment's reading. A section number is that of the report named. Concepts that the entries use and that every worker needs are in `concepts.md`.

The second round follows `check.md` and `cold-read.md`. Each entry's "Second round" line says what changed.

The twelve entries hold 7,011 bytes in the record. Here the fifteen hold 15,180. The growth is the measurement's bounds (F-40), the names of the supertypes and probes (F-44, F-41), a definition of the specialisation hole (F-45), the shapes of the alternatives (F-47), and the conditions that the old text left out.

## F-40

> - F-40 **Measured on 2026-09-24 for two size designs that were not built, a size cost a few kilobytes at load and nothing in a hot loop, and only the overload dispatcher read a size off a value.** The two designs were design A, descriptor classes stamped for each size of each generic, and design B, a class for each number, passed to the generic's descriptor factory; both ran on the size probes' private build (`perf-probes/nat/size-cost.md` section 1). The built design, one descriptor object per size value from `RTTIsize.of` (F-129), is neither, and nobody has measured its load size or its loops. Under either design, a size's classes came to a few kilobytes, against the 8.6 MB of classes that every run loads. A loop bounded by the size constant was not measurably faster than one bounded by the storage's length read at run time. The loop cost about 31 ns per element, which the bytecode shows going to a transaction check on each read and write of a local, to boxing, and to a method call for each element read. A call dispatched on a size cost about 4 to 20 ns more than the same call that the checker resolved at compile time. The built design's rung measured only the dispatcher's lookup of a literal size's descriptor: 0.9 ns on the landed build, its six runs from -2.2 to 7.0 ns, and 2.6 ns on an earlier build, on a dispatched call of about 23 ns. By reading the code of 2026-09-24, no optimization uses a size (F-20 holds it for today's tree), and a dispatched call tests a size once per overload arm tried, as the built dispatcher's literal leaf also does (`OverloadSet.java`, `SizeLiteralStructure`). Detail: `size-cost.md`, "The answers"; `compile-ladder/rung-size-runtime/REPORT.md` section 12.

Meaning: scoped to its measurement. The old title stated the cost of a size in the tree. The figures are designs A and B on the size probes' build of 2026-09-24, and the built design is neither (P-41, F-129). Nobody has measured the built design's load size or loops; its rung measured only the lookup at the dispatcher. "The checker checks a shape once per call site" is dropped: the note's (d) says that the first rung's shadow checker did, and "The tree's checker does not"; F-67 now holds what the tree's checker checks. The "type test" clause is dropped with it, since F-37 holds the compiled `typecase` on a size.

Second round:
- Designs A and B are defined in place; only this entry uses them.
- The lookup is no longer a range, "0.9 to 2.6 ns". It is two figures: 0.9 ns for the landed design, within its own noise, and 2.6 ns on an earlier build. The lookup is that of a literal size.
- "Ran no faster" is now "was not measurably faster", as the note and the rung's section 6 have it.
- The 31 ns is the loop's cost. Its causes are read from the bytecode, not measured apart; the entry now says so and adds the method call per element read.
- "A few kilobytes" is set against the 8.6 MB that every run loads. "Under both designs" now bounds the 4 to 20 ns.
- The reading of the code is dated. F-20 holds "no optimization" for today's tree, and the built dispatcher's literal leaf also tests once per arm.

Sources:
- Title, the designs and the date: `size-cost.md`, header, section 1 and "The answers" (a) to (c).
- A few kilobytes and the 8.6 MB: "The answers" (a).
- The built design: F-129; `rung-size-runtime/REPORT.md` section 1.
- The lookup: `rung-size-runtime/REPORT.md` section 12, "2.6 ns on the build of `391f444d2` and, applied to the landing build's lines at the merged-diff review, 0.9 ns, whose six values run from -2.2 to 7.0 ns, on a dispatched call of about 23 ns"; section 1, "the literal leaf's table lookup".
- The loop: "The answers" (b), "not measurably faster"; `size-cost.md` section 3, the bytecode; `rung-size-runtime/REPORT.md` section 6.
- No optimization; once per arm tried: "The answers" (d), read from the code; F-20; `OverloadSet.java`, `SizeLiteralStructure`.

Questions for the curator: none.

## F-41

> - F-41 **The compiled dispatcher tests a size that two parameters share, in `DOT`'s shape, for equality in both directions before it chooses the arm that shares it.** `compiler_tests/NatRtDot` declares `dot[\nat n\](a: Vec[\RR64,n\], b: Vec[\RR64,n\])` over a user object `Vec`, beside a catch-all `dot(a: Any, b: Any)`. Sizes 3 and 4 reach the catch-all: typed statically, in the one order that the test makes, and dispatched at run time, in both orders. Walk printed the same in the probe. A static mismatch compiles with no error: the checker gives it the catch-all's signature. The dispatcher's equality test is the team's own check for a type variable in two invariant positions (`OverloadSet.java`). The library's `DOT` was not run compiled; by reading, the matrix product's shared inner size takes the same check. Gated by `compiler_tests/NatRtDot`, which checks the four outputs. Detail: `perf-probes/nat/size-rung-probes.md` section 3.

Meaning: one claim dropped, the title narrowed. The old title named `DOT`. The test is a user `dot` over a user `Vec` in `DOT`'s shape, and the library's `DOT` was not run compiled; the entry now says so. "A size made by `array[E](n)` gets one descriptor per number from `RTTIsize.of`" is dropped. `array[\E\](n)` makes no size: it returns `Array[\E,ZZ32\]` (`FortressLibrary.fsi:1494`). Every call of `RTTIsize.of` in the tree takes a literal's text (the assessment's reading of `MethodInstantiater.java:133-134`, `:157-161`, `CodeGen.java:5819`, `OverloadSet.java:1112`). The note read the sentence as a future case, "Read from the code, not measured" (section 2.6). It also belonged to F-129's subject.

Second round:
- "In either order" now holds for the dispatched call only. The static call is made in one order, `dot(v3, w4)`.
- Walk's output is the probe's (`r6-walk.txt`). `NatRtDot.test` runs the compiled path only.
- "The test" is now "the dispatcher's equality test", apart from the harness test.
- "Gated by" is restored, as the old entry had it.

Sources:
- The test: `compiler_tests/NatRtDot.fss` and `.test`, which expect (i) 3, (ii) -1, (iii) 3, (iv) -1 -1.
- Equality in both directions, the invariant check, walk's output, the static mismatch: `size-rung-probes.md` section 3.
- The matrix product, by reading: the same section.

Questions for the curator: none.

## F-42 and F-?1

> - F-42 **The compiled checker skips a compilation unit's (an api's or a component's) overloading and return-type checks when an earlier stage of that unit has reported an error.** `StaticChecker` returns before `OverloadingChecker` if the earlier stages found errors (`StaticChecker.java:268-279`). So clearing an early error can raise the checker count, which sees only the errors before each unit's early return (F-53). The distance runs every stage of every unit whatever the earlier stages reported, so these errors are not hidden from it (`tools/distance/run.sh`, header). Detail: `perf-probes/nat/zero.md`, its opening section.

> - F-?1 **The compiled checker refuses a local function's parameter that has no type, "Missing parameter type for i", as it refuses a top-level function's.** Write the type: the specification asks for inference of a type that a declaration leaves out, and does not describe it (`Specification/appendices/changes.tex`, "The type of a parameter that a declaration leaves out"). Before the fix, such a local function crashed the checker (rows 620 and 621, fixed). Row 405 holds the case elsewhere: compiled, an untyped parameter is refused wherever it appears; under walk, it fails only when its method implements an abstract declaration. Gated by `compiler_tests/XXXLocalFunctionUntypedParam` and `XXXLocalFunctionUntypedParamInLoop`. The code is `STypeEnv.scala:75` (local) and `:200` (top level).

Meaning: split, and two readings corrected.
- The early return and the untyped local parameter change apart: the first with the order of `StaticChecker`'s stages, the second when inference of parameter types is built. Each now has an entry.
- "Clearing an early error can raise a count" now names the checker count. The distance runs every stage of every unit, so the early return hides nothing from it (`tools/distance/run.sh`, header).
- "As at top level (rows 620, 621)" read as if the rows held the top-level case. Rows 620 and 621 are the local case, fixed. Row 405 holds the case elsewhere.

Second round:
- F-42: "unit" is named as a compilation unit.
- F-?1: the first round said that row 405 holds "the top-level case on both paths". Walk runs that case. The entry now says what row 405 holds on each path.
- F-?1: the specification asks for the inference and does not describe it; "there" is gone.

Sources:
- The early return: `StaticChecker.java:268-279`; `zero.md` lines 17-19.
- The count and the distance: F-53; `tools/distance/run.sh`, header.
- The refusal and its message: rows 620 and 621; `compiler_tests/XXXLocalFunctionUntypedParam.test`.
- Row 405: "refused on the compiled path wherever it appears, and under walk fails when its method implements an abstract declaration"; "Walk runs a top-level function and a method implementing nothing".
- Appendix I: `Specification/appendices/changes.tex:3750-3775`.
- The code lines: `STypeEnv.scala:75` (`extendWithBindingsFromFnList`) and `:200` (`extractNodeBindings`).

Questions for the curator: none.

## F-43

> - F-43 **The overloading checker's memo hides some errors, and which ones changes from one build of the checker to another, so the gate's checker count and distance run with the memo off.** The memo keeps a "valid" verdict per pair of declarations. A pair that several traits inherit is checked once per trait, at that trait's instantiation, in hash-set order, so a pair valid for one trait is taken as valid for the next (`perf-probes/nat/triage.md` section 1). The memo is on by default (`OverloadingChecker.scala:79`), so an ordinary `fortress compile` can miss these errors. The JVM property `-Dfortress.analyzer.overload.cache=false` turns it off; the gate's checker count and distance stages set it.

Meaning: unchanged. The F-226 sentence, left from the split of 2026-10-14, is dropped. The memo's default is added, so a reader knows that an ordinary compile can miss these errors.

Second round: "depending on the build order" now says what changes and why, from the triage's section 1. "Every count" is now the gate's two stages. The switch is named as a JVM property. The detail line went into the sentence on the memo.

Sources: `OverloadingChecker.scala:79`; `triage.md` section 1 (`validOverloadingMemo`, `OverloadingChecker.scala:441-462`, "a pair inherited by several traits is checked once per trait ... in hash-set order"); `checker-count/run.sh:54`, `:70` and `distance/run.sh:83`.

Questions for the curator: none.

## F-44

> - F-44 **The compiled checker enforces the multiple instantiation exclusion rule and relies on it, and the one library meets the rule.** The rule: no type extends two different instantiations of one generic trait. The checker's Return Type Rule relies on it: with the rule relaxed alone, a program passes the checker and dies with `IncompatibleClassChangeError` (`OverloadingOracle.scala:81-105`; the probe `ProbeMIEPick`). F-48 gives the kinds of static argument that the rule compares. Walk applies no instantiation exclusion: it accepts a type that extends two instantiations, and its overloading check does not count them as excluding (row 416; the review's section 3). P-43 keeps the rule. Besides the flat number tower of P-43, the library meets it by three changes of `952892a00`: `TotalComparison` extends `Comparison` and `StandardMinMax[\TotalComparison\]`, no longer `StandardTotalOrder[\TotalComparison\]`; `AnyMaybe` extends `AnyUniqueItem` alone, no longer `Equality[\AnyMaybe\]` beside it; and `andCondCombine` chooses `andRelCond` by a `typecase`, in place of a second `ANDCOND`. So under walk, a program's `p1 ANDCOND p2` of two relational predicates, conditions built from a relation over a generator, which `filter` fuses, is no longer itself a relational predicate (row 458). The distance holds no exclusion error (F-53). Detail: `reviews/multiple-instantiation-exclusion.md` sections 1 to 3; `Library/FortressLibrary.fsi:121-123`, `:959`; `Library/FortressLibrary.fss:4861-4867`.

Meaning: unchanged, with the limits pointed to and the names given.
- The supertypes are named. Before `952892a00` (2026-09-28), `TotalComparison` extended `StandardTotalOrder[\TotalComparison\]`, and `AnyMaybe` extended `Equality[\AnyMaybe\]` as well as `AnyUniqueItem`. Today, `TotalComparison` extends `Comparison` and `StandardMinMax[\TotalComparison\]` (`FortressLibrary.fsi:121-123`).
- Row 461 was the walk failure of `BIG MIN` and `BIG MAX` that the change caused, now fixed. It goes to the history.
- F-48 now gives the rule's limits, rows 406 and 414.

Second round:
- "The library meets it in three places" made the list complete. The review's section 5 gives four families that the rule refused; the number tower met the rule by its flattening (P-43), and the reductions are now generic. The three changes are those of `952892a00`, now set beside the flat tower.
- Row 416 covers walk's overloading check. The review's section 3 adds that walk accepts a type that extends two instantiations. The entry now says both.
- The `ANDCOND` case is a program's call, and the entry says what a relational predicate is.

Sources:
- The rule and the checker's reliance: the review's sections 1 and 2; `OverloadingOracle.scala:81-105`.
- Walk: row 416; the review's section 3. P-43.
- The library: `FortressLibrary.fsi:121-123`, `:959`, `:1979` (`SumReduction[\T extends AdditiveGroup[\T\]\]`); `FortressLibrary.fss:4861-4867`; `git show 952892a00`; the review's section 5; row 458.
- No exclusion error: F-53.

Questions for the curator: none.

## F-45

> - F-45 **Without the exclusion rule, every dispatcher would have to call its generic arms at the call site's static arguments, and no published work resolves a value that is in two instantiations of one generic under run-time dispatch.** The loader already gives a generic dispatcher the call site's static arguments; without the rule, its arms would have to use them instead of arguments read from the value (`reviews/mie-probes/scope-call-site-dispatch.md` section 3). The call at the dispatcher's static arguments is built for template dispatchers (F-136), and, by reading, not for one with an `opr` or `nat` static parameter (`compile-ladder/rung-generic-runtime/REPORT.md` section 9). The team's 2012 patents allow a self-typed generic, one that comprises exactly its parameter, at several instantiations along a chain of subtypes: the forest rule (`reviews/mie-probes/patents-forest-rule.md` section 1). Alone, the forest rule leaves the specialisation hole open: a specialised declaration, more specific than the generic one, runs for a value at a narrower level of the chain, a subtype, and returns a type that a caller typed at that narrower level does not expect. Compiled under a shadow checker with the forest rule, a patched copy of the checker that never landed, such a run dies with `IncompatibleClassChangeError`; the tree's checker refuses such a program (the same note, section 3). Route C adds a return-type rule that closes the hole (F-46). Detail: `scope-call-site-dispatch.md` section 3; `reviews/mie-probes/literature.md`, "What the field settled and what it did not".

Meaning: unchanged; two sentences moved out, one term defined.
- "The specialisation hole" is defined here, once, from `patents-forest-rule.md` section 3.
- "Double membership" is spelled out.
- "These prices decided P-43" goes to the history. P-43 gives its own reasons.
- F-136 owns what is built. "Generic dotted methods and other dispatchers lack it (rows 495, 496)" goes to the history; F-136 holds those rows.

Second round:
- The first round moved the `opr` and `nat` limit out, for F-136 to take. F-136 does not state it, so a reader would conclude that every template dispatcher has the call. The limit is back, by reading, from `rung-generic-runtime/REPORT.md` section 9.
- "Its own static arguments" is now the call site's, which the loader has already given the dispatcher.
- "A lower level" is now a narrower level, a subtype.
- The `IncompatibleClassChangeError` was seen under a shadow checker with the forest rule. The tree's checker refuses such a program. The entry says both.

Sources:
- Dispatchers without the rule: `scope-call-site-dispatch.md` section 3, "The generic dispatcher is already loaded under the call site's static arguments; only its arms ignore them".
- The `opr` and `nat` guard: `rung-generic-runtime/REPORT.md` section 9, "guards out a dispatcher that has one, by `KindType` at `OverloadSet.java:1350`".
- No published resolution: `literature.md`, "What the field settled and what it did not", "No published resolution of the tower conflict".
- The forest rule: `patents-forest-rule.md` section 1.
- The hole and `IncompatibleClassChangeError`: the same note, section 3 (`ForestTower`, `-Dprobe.forest=fbound`), "A caller the checker types at `X = Narrow` is promised a `Narrow` and gets `M`".
- Route C closes it: `route-c-experiment.md`, the four answers, 1.

Questions for the curator: none.

## F-46

> - F-46 **Route C, the patents' forest rule with a return-type rule over every level of a chain, closes the specialisation hole (F-45), but going back to a nested number tower under it needs work beyond the checker.** The library's tower was nested before route A flattened it (P-43). Built as a shadow checker on 2026-09-24 and run through the zero probe's stack on a library copy without the reduction markers, route C refuses 25 pairs at 21 of the nested tower's declarations: specialisations that a level below does not cover. Completing the tower needs seven more declarations and the identification of `Integral[\ZZ32\]` with `ZZ32`. The patents' `comprises T` on the self-typed traits licenses that identification, but it overflows the checker's stack (measured on the zero probe's copy of the checker, in the recursion of `Formula.scala` that the tree shares). A hierarchy check of its own could enforce the identification instead; none is built. Leaving route A for route C also needs: the tower nested again; the call-site fix in every dispatcher (F-136); in the code generator, a method for each middle level of a chain, whose absence, by the error text, makes such a chain die with `AbstractMethodError`; walk to accept the specialised pairs without overflowing on `comprises T`; and, for the identification, a way past the checker's overflow or the hierarchy check. Detail: `reviews/mie-probes/route-c-experiment.md` sections 2 to 5.

Meaning: one correction. "Completing the tower needs `comprises T` on the eight self-typed traits" was too narrow. The note says that completing it needs seven more declarations and the identification of `Integral[\ZZ32\]` with `ZZ32`. `comprises T` licenses that identification, and it overflows the checker. A hierarchy check of its own could also enforce it, but none is built. The seven declarations are added to the work for a return.

Second round:
- The overflow was measured on the zero probe's copy of the checker. That copy differs from the tree's only in `And`'s arity, so the recursion is shared (section 2b). The entry now says where it was measured.
- The 25 refusals come from section 2b's instrument, on a library copy without the reduction markers; the gate's checker count cannot see the rule. The entry now says so, and what the refusals are.
- The `AbstractMethodError`'s cause is read from the error text, not traced (section 2a); the entry marks it.
- "A return to it" is now a return to the nested tower, which route A flattened. "Leaving P-43" is now "leaving route A".
- The hierarchy check and the way past the overflow are two ways to the identification; the list now says so.

Sources: `route-c-experiment.md`, header (2026-09-24), the four answers 1 and 3 to 4, sections 2a, 2b, 4 and 5; P-43; F-47's E5.

Questions for the curator: none.

## F-47

> - F-47 **The exclusion rule refuses some of the specification's own examples; in their place, a parametric object with a factory, or a widening function, runs on both paths as a user program.** The refused examples are E1 to E10 of `reviews/spec-refused-examples.md`, "What was found": among them three `where`-clause examples, the Working Draft's `Nothing`, the nested number tower and `RationalQuantity`. The `where`-clause examples stop on both paths before the rule, in name resolution, at `T is undefined`. The alternatives were measured as user programs that declare their own types: a parametric object with a factory, such as `object Empty[\T\]` with `emptyList[\E\]()`, and a widening function, such as `widen[\T, S extends T\](c: C[\S\]): C[\T\]`. The library's `Nothing[\String\]` does not yet run on the compiled path's prelude (row 331, F-167). A marker object with a `coerce` in the generic trait, as `AltEmptyCoerce` has in `SList[\T\]`, also runs compiled, and walk applies such a coercion (row 389). The 2012 `covariant` keyword passes the compiled checker and dies at run time (row 404). The compiled checker refuses a coercion with its own static parameter between two instantiations, `coerce[\S extends T\](c: C[\S\])`, as a cyclic hierarchy. Inferred from the forest rule: route C (F-46) would rescue neither the `where`-clause examples, `Nothing` nor E8, the internal appendix's "Disjunctive Constraints"; only the tower (E5) and the root `Object`'s algebra (E7) would keep their original text under it. Detail: the same note.

Meaning: one correction, scope stated.
- "Route C (F-46) would rescue none of these examples" was wider than its source. The note says that route C would not rescue E1 to E4 or E8, and that E5 and E7, the tower and the root's algebra, would read differently (`spec-refused-examples.md:497-502`). It marks this "[inferred from the forest rule as `FACTS.md` records it]".
- "F-167 lists them" is repointed: the note's E1 to E10 list them.
- The alternatives were measured as user programs. F-167's exception, the library's `Nothing[\String\]` on the compiled prelude (row 331), is now stated beside them.
- "Earlier" is now "before the rule, in name resolution".

Second round:
- "A generic coercion" and "a coercion in the generic trait" read as one thing. They differ, as row 389 draws the line: the compiled checker refuses a coercion with its own static parameter (`AltCovariantCoerce`, row 513); a marker object with a `coerce` in `SList[\T\]` runs (`AltEmptyCoerce`). The entry now gives each shape.
- The alternatives' shapes are given, so a worker can write them.
- "Would read differently" now says what the note means: E5's and E7's original text would stand as route C's text. E8 is named.

Sources: `spec-refused-examples.md`, "What was found" (E1 to E10, the alternatives `AltEmptyParam` and `AltCovariantBounded`, `AltEmptyCoerce` and `AltCovariantCoerce`, rows 389 and 404, the cyclic hierarchy at its line 237) and its route C paragraph (`:497-502`); F-167; rows 331, 389 and 513.

Questions for the curator: none.

## F-48, F-?2 and F-?3

> - F-48 **The compiled checker's exclusion rule compares type arguments, and sizes only when both are literals.** Two boolean arguments count as no exclusion: `object F extends { Flag[\true\], Flag[\false\] }` passes the checker and dies in code generation (row 406, `compiler_tests/XXXBoolExtendsTwice`). Nor does a static parameter beside another argument: `object O[\nat n\] extends { Vec[\n\], Vec[\3\] }` passes the checker and dies at load with `ClassFormatError` (row 414, `XXXNatExtendsTwice`; the row also places its cause in `TypeHierarchyChecker`'s check of `extends` clauses). Two literal sizes do exclude: the checker refuses `object V extends { Vec[\3\], Vec[\4\] }`, "Types Vec[\3\] and Vec[\4\] exclude each other" (row 402, fixed). Gated by `compiler_tests/XXXNatExcludeChecker`, for the refusal of two literal sizes. The code is `TypeAnalyzer.scala:539-546`, "Todo: Handle bool args". Detail: `reviews/spec-refused-examples-judgement.md` section 6.

> - F-?2 **The compiled checker refuses a subtrait that inherits an abstract method named by an operator static argument, even at one instantiation; the specification and walk substitute the name.** The abstract-method check matches an inherited abstract method to a concrete one by name, and does not first put in the operator argument (`AbstractMethodChecker.scala:100-101`, by reading). Observed in the probes `OprSingle` and `OprInstancesOplus`; no ledger row or test holds it. Detail: `reviews/spec-refused-examples-judgement.md` section 4.

> - F-?3 **The code generator throws on `Any` as a static argument in an `extends` clause, after the checker has accepted the program.** It stops with "Only handling some static args of generic types in extends clause" (`CodeGen.java:5805`). Observed in the probe `AltEveryContra`; no ledger row or test holds it. Detail: `reviews/spec-refused-examples-judgement.md` sections 3.1 and 9.

Meaning: split into three, and each claim's evidence stated.
- F-48 keeps the kinds of argument that the exclusion rule compares. Its test, `XXXNatExcludeChecker`, gates only the refusal of two literal sizes (row 402).
- F-?2, the abstract-method check, and F-?3, the code generator's throw, rest on the judgement's probes. Their candidate ledger rows, 3 and 5 of the judgement's section 9, were never entered. Each entry says so.

Second round:
- F-48: the first round gave row 406's outcome for both rows. Row 414's case dies at load with `ClassFormatError`, and the row places its cause in `TypeHierarchyChecker` too. Each row now has its own outcome and its expected-failure test.
- F-?3: the checker's acceptance is stated.

Sources:
- F-48: `TypeAnalyzer.scala:539-546` (`cP`); rows 402, 406, 414; `compiler_tests/XXXNatExcludeChecker.fss` and `.test`, `XXXBoolExtendsTwice.test`, `XXXNatExtendsTwice.test`; the judgement, section 6.
- F-?2: `AbstractMethodChecker.scala:100-101` (`meth2.name == meth.name`); the judgement, section 4, `OprSingle` and `OprInstancesOplus`.
- F-?3: `CodeGen.java:5798-5805`; the judgement, section 3.1 (`AltEveryContra`) and section 9, candidate 5.

Questions for the curator: none. Whether to enter the two candidate rows is for the coordinator.

## F-49

> - F-49 **Under walk, a value form and a function form of one name are chosen by the argument's run-time type, so with the element type `Any` a function passed as the value goes to the function form.** Given a function, `fill` on an array of element type `Any` stored the function's results, `c[1] = 11`, not the function. The compiled checker refuses such a pair under the bound `Any`: a functional whose one parameter has a parametric type bounded by `Any` cannot be overloaded (the probe `FillBoxAny`). The one library has no such pair: `fill` takes a value and `tabulate` a function (F-158). Detail: `reviews/fill-overloads-ways.md` section 2.

Meaning: one claim dropped. "Declared where the array diamond meets, the pair clears the diamond's refusals; declared in the leaves alone, as `copy` is, it does not" is dropped:
- `copy` is declared on the meet since row 467's fix (`0ae526b31`; `FortressLibrary.fsi:1518`, `:1528`);
- the note's "Way 0" says the opposite of its second half;
- F-158 owns the diamond.

Second round: `c[1] = 11` now says what it shows.

Sources: `fill-overloads-ways.md` section 2 (`c[1] = 11`; `FillBoxAny`); F-158.

Questions for the curator: none.

## F-50

> - F-50 **The compiled checker lets overloads differ in static parameters, as the model of the OOPSLA 2011 paper does, which the specification now states (F-174); as ambiguous, it refuses only the pairs it cannot prove unambiguous.** It builds P-45. It cannot prove a pair over open traits, which no `excludes` or `comprises` clause closes, nor one whose domains exclude only through the exclusion rule and a bound, as the library's `CAP` on `ScalarRange[\I\]` beside `Range2D[\I,J\]` does. It also refuses some pairs that the paper accepts, by its Return Type Rule and by its positional rule, under which two generic declarations in the more-specific relation agree on their static parameters by position (F-75). Other gaps have their own owners: its overloading check never reads a pair of symbolic operators such as `+` (P-155, row 584); two generic arms on a bare type variable fail compiled (F-174, row 537); and walk runs an arm whose size the call leaves unfixed, with the size unbound, where the checker drops the arm or refuses the call (F-69, row 400). Detail: `reviews/overload-static-params-ways.md` sections 2 and 3.

Meaning: one correction of scope. "Refuses only the pairs it cannot prove unambiguous" is now bounded to refusals as ambiguous. By its Return Type Rule and its positional rule, the checker also refuses pairs that the paper accepts (F-75; row 542). Rows 584, 537 and 400 now point to their owners: P-155, F-174 and F-69.

Second round:
- "Never checks symbolic operators" was wider than row 584, which says that the overloading check never reads such a pair. The entry now says that.
- "With the size unbound" is back for row 400: walk reports "undefined variable [n]" (the note's defect 4, `NatArmShowN`).
- The `CAP` shape, open traits and the positional rule are explained in place. "The 2011 model" and "the 2011 paper" are one source, the OOPSLA 2011 paper, whose model the specification now states (F-174).
- The first round's note cited row 539 for a refusal of the compiled checker. Row 539 is walk's refusal at load; it is dropped from the note.

Sources: `overload-static-params-ways.md` sections 2.1 to 2.3 and defect 4; F-75; F-174; rows 542, 584, 537 and 400; P-155, F-69; `rung-return-type-rule/decision-record.md` section 2, "a restriction of the compiled implementation".

Questions for the curator: none.

## F-51

> - F-51 **A generic call converts a narrower argument for a parameter typed by a type variable that another argument fixes, on both paths.** For `scale[\T\](b: Box[\T\], x: T)` and `b: Box[\RR64\]`, `scale(b, 3)` takes `T = RR64` and converts the `3` (row 388, fixed). So under walk the library's array-scalar `+`, `-`, `MIN` and `MAX`, and the matrix-scalar juxtaposition and `DOT`, take a `ZZ32` scalar with `RR64` elements. F-73 and F-137 give each path's rule. Gated by `tests/InferCoercionRungK` and `compiler_tests/InferCoercionShapes`. Detail: `reviews/numeric-hierarchy-integration-review/row388-container-probe.md`.

Meaning: one correction of scope. "The library's vector and matrix operators" was too wide. `tests/InferCoercionRungK.fss` calls the array-scalar `+`, `-`, `MIN` and `MAX` on an `Array[\RR64,ZZ32\]`, and the matrix-scalar juxtaposition and `DOT`. It calls no `Vector`-scalar operator.

Second round: no change; the check passes it.

Sources: `InferCoercionRungK.fss:38-39`, `:59-67`; the old entry for the rest.

Questions for the curator: none.

## For the coordinator

- **F-136 and the `opr` and `nat` guard.** F-45 now states, by reading, that a dispatcher with an `opr` or `nat` static parameter does not get the call at its static arguments. F-136 owns the subject but does not state it. If F-136 takes it, F-45 can point there.
- **Two candidate ledger rows.** F-?2 and F-?3 are the only places in the record that hold the judgement's candidate rows 3 and 5. Entering them in the ledger would give both a home and a test.
- **Not run.** `record.py apply` and `check` were not run on `proposals.apply`, since this session's permissions refuse `record.py`. The new entries stand under `## The checker and the one library`, as `record.py`'s usage asks for new entries.
