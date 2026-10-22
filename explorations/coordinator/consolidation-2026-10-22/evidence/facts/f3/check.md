<!-- The clarity workflow's check of FACTS chunk f3: each rewritten entry of proposals.md (F-40 to F-51, and F-?1 to F-?3 split from F-42 and F-48) compared with the record's entry and its sources, and the cold reader's answers compared with the source meaning; read on main at 34fbf49d4. -->

# FACTS chunk f3: the check

Base: `main` at `34fbf49d4`; FACTS.md's twelve entries are as `assessment.md` read them. I read each entry with `facts-extract.sh`, its history where a claim moved, and the sources it cites: the notes' sections, the tests, the ledger rows and the code lines. `clean.txt`, `proposals.md` and `proposals.apply` hold the same fifteen entries, character for character. I ran no program.

Classes, as the brief sets them: **concept** (a concept the reader lacked, and where to define it), **wording** (with the wording proposed), **uncertain fidelity** (with the source that settles it). A fidelity failure is classed by its repair, which here is always wording.

Summary:

| Entry | Fidelity | Comprehension | Failures |
|---|---|---|---|
| F-40 | two figures stated wider than the source | designs A and B, "a few kilobytes", "table lookup" | wording 4; concept 1 (in the entry) |
| F-41 | static order generalised | "the test is" ambiguous | wording 2 |
| F-42 | pass | "unit" | wording 1 (minor) |
| F-43 | pass | "build order", the switch's form | wording 1 (minor) |
| F-44 | "in three places" made exhaustive | row 416, `ANDCOND`, relational predicate | wording 3 |
| F-45 | a condition dropped from FACTS (`opr`, `nat`) | "its own static arguments", "lower", a shadow's result | wording 3; concept 1 (listed) |
| F-46 | overflow measured off the tree's checker | "a return to it", the 25 pairs, "shadow checker" | uncertain fidelity 1 (settled); wording 2; concept 1 (new) |
| F-47 | pass | "generic coercion" against "coercion in the generic trait", the alternatives' shapes | wording 3 |
| F-48 | row 414's outcome and site folded into row 406's | the bool and symbolic gaps read as untested | wording 2 |
| F-49 | pass | `c[1] = 11` | wording 1 (minor) |
| F-50 | "never checks symbolic operators" wider than row 584 | `CAP` shape, positional rule, open traits | wording 3; concept 1 (new) |
| F-51 | pass | pass | pass |
| F-?1 | row 405 stated as "the top-level case on both paths" | "there" | wording 2 |
| F-?2 | pass | pass | pass |
| F-?3 | pass | the checker's view | wording 1 (minor) |

Two provenance slips in the apply file's note lines, outside the entries: F-50's note cites row 539 for the checker refusing a pair the paper accepts, and F-?1's calls row 405 "the top-level one" (both under their entries below).

## F-40

**Fidelity.** The bounds the assessment asked for are in: designs A and B, the build of 2026-09-24, the built design unmeasured. Four sentences say more than `size-cost.md` or the rung's report:

1. "The built design's rung measured only its table lookup at the dispatcher: 0.9 to 2.6 ns, on a dispatched call of about 23 ns." `rung-size-runtime/REPORT.md` section 12 gives two figures, not a range: "2.6 ns on the build of `391f444d2` and, applied to the landing build's lines at the merged-diff review, 0.9 ns, whose six values run from -2.2 to 7.0 ns, on a dispatched call of about 23 ns". Only 0.9 ns is the landed design's, and it is within its own noise. The lookup is the one for an arm with a literal size ("the literal leaf's table lookup", section 1; "the literal-size arm's dispatched-minus-static time less the no-size arm's", section 12). The rewrite drops "literal".
2. "a loop bounded by the size constant ran no faster than one bounded by the storage's length". The source: "not measurably faster", and section 6, "The measured statement is narrower: in this code shape, the constant bound is not measurably faster than the bound read at run time." The old entry said "is no faster" too, so this is not a change of the record, but the rewrite was the place to bound it.
3. "boxing and a transaction check on each read and write of a local cost about 31 ns per element." The source measures the loop at 31 ns per element and then reads the bytecode for "where it goes": the transaction checks, the boxes, and a method call on `FZZ32Vector` for each element read with the JVM's bounds check (section 3). The share of each is not measured. The old entry has the same attribution.
4. "By reading the code, no optimization uses a size" reads as today's tree, which F-20 supports; "a dispatched call tests a size once per overload arm tried" is the reading of 2026-09-24 under designs A and B ("At a dispatched call, the size is tested on every call, once per arm tried", "The answers" (d)). The built dispatcher's literal leaf (`OverloadSet.java`, `SizeLiteralStructure`) also tests once per arm, so the sentence still holds, but it should say whose code.

The drops are sound: "The checker checks a shape once per call site" was the first rung's shadow checker ("The tree's checker does not"), and the type test is F-37's.

**Comprehension.** The cold reader's account matches the source. Where it could not resolve:
- "designs A and B": the entry never says what they are. `concepts.md` says "F-40 now says so in place", but F-40 says only that they were not built. The concept belongs to this entry alone (P-41 and F-37 name the built design, not A and B).
- "a few kilobytes at load": of what. The source: the classes loaded, a few kilobytes out of the 8.6 MB that every run loads, for programs with one to eight sizes.
- "4 to 20 ns": whether A and B only. The source: "under either design, for literal arms and for B's size-generic arm alike".
- "its table lookup": which table (item 1 above).
- "one descriptor per number": the reader guessed right, one descriptor object per size value.

**Classes.**
- concept, in the entry: designs A and B. Proposed: "design A, a descriptor class stamped for each size of each generic, and design B, a class for each number passed to the generic's descriptor factory (`size-cost.md` section 1)".
- wording (item 1): "The built design's rung measured only the dispatcher's lookup of a literal size's descriptor: 0.9 ns on the landed build, its six runs from -2.2 to 7.0 ns, and 2.6 ns on an earlier build, on a dispatched call of about 23 ns."
- wording (items 2 and 3): "Under both designs, a loop bounded by the size constant was not measurably faster than one bounded by the storage's length read at run time. The loop cost about 31 ns per element, which the bytecode shows going to a transaction check on each read and write of a local, to boxing, and to a method call for each element read."
- wording (the reader's points): "a size cost a few kilobytes more of the 8.6 MB of classes that every run loads"; "Under both designs, a call dispatched on a size cost about 4 to 20 ns more"; "one descriptor object per size value"; "By reading the code of 2026-09-24, no optimization uses a size (F-20 holds it for today's tree)".

## F-41

**Fidelity.**
- "Two vectors of sizes 3 and 4 reach the catch-all in either order, whether the call is typed statically or dispatched at run time". `NatRtDot.fss` makes the static call in one order, `dot(v3, w4)`, and the dispatched call in both, `dot(a, c)` and `dot(c, a)`; `size-rung-probes.md` section 3 has the same four calls. "Either order" holds for the dispatched call only.
- "and walk prints the same" is the probe's walk run (`r6-walk.txt`); `NatRtDot.test` runs the compiled path only. The old entry said "on both paths" with the same basis, so this is not a change, but the sentence sits after the test's description and reads as gated.
- The drop of "A size made by `array[E](n)` ..." is right: section 2.6 is "Read from the code, not measured", about variant (b) and a case that waits on the array review; `array[\E\](x:ZZ32)` returns `Array[\E,ZZ32\]` (`FortressLibrary.fsi:1494`). That reading now survives only in the note, which is enough.

**Comprehension.** The reader's account matches. "For equality in both directions" was read correctly (two `runtimeSupertypeOf` tests, one each way; section 3). "The test is the team's own check" was ambiguous: the sentence before it names the harness test `NatRtDot`. The reader also noted that the entry no longer says the test gates it: the old "Gated by `compiler_tests/NatRtDot`" became "`compiler_tests/NatRtDot` declares".

**Classes.**
- wording: "Sizes 3 and 4 reach the catch-all: typed statically, in the one order the test makes, and dispatched at run time, in both orders. Walk printed the same in the probe."
- wording: "The dispatcher's equality test is the team's own check for a type variable in two invariant positions (`OverloadSet.java`)." and "Gated by `compiler_tests/NatRtDot`, which checks the four outputs."

## F-42

**Fidelity.** Pass. `StaticChecker.java:268-279` returns before `OverloadingChecker` when `errors` is not empty; the distance's header says every stage of every unit runs "so that nothing hides behind an early return"; `zero.md`'s opening holds the early return and the 43 errors that batch 3's fixes unmasked.

**Comprehension.** Matches. The reader lacked "unit".

**Classes.** wording (minor): "a compilation unit's (an api's or a component's)".

## F-43

**Fidelity.** Pass. The memo's default is `true` (`OverloadingChecker.scala:79`); both gate stages pass `-Dfortress.analyzer.overload.cache=false` (`checker-count/run.sh:54`, `:70`; `distance/run.sh:83`). "An ordinary `fortress compile` can miss these errors" is an inference from that default and `triage.md` section 1, where every memo-on list is a subset of the memo-off 203; it is sound.

**Comprehension.** Matches. The reader asked what "build order" orders, and how the switch is passed. `triage.md` section 1: the memo caches a "valid" verdict per pair of declarations, a pair inherited by several traits is checked once per trait "in hash-set order", and the count changes from one build of the checker to another. The title's "every count" means the gate's two counting stages.

**Classes.** wording (minor): "The overloading checker's memo hides errors in an order that changes from one build of the checker to another, so the gate's checker count and distance run with it off." and "the JVM property `-Dfortress.analyzer.overload.cache=false`".

## F-44

**Fidelity.**
- "The library meets it in three places" makes the list exhaustive. `multiple-instantiation-exclusion.md` section 5 gives four families where the rule refused the library: the numeric tower (13 declarations), the comparisons (4), `Maybe` (4) and the reductions (2). The tower met the rule by its flattening (P-43), and the reductions are now generic (`object SumReduction[\T extends AdditiveGroup[\T\]\]`, `FortressLibrary.fsi:1979`). The three named changes are those of `952892a00`; they are not all of how the library meets the rule. The old entry's "meets it through" listed them without the count.
- The three changes themselves are right: `git show 952892a00` removes `StandardTotalOrder[\TotalComparison\]` and `Equality[\AnyMaybe\]`, and `andCondCombine` (`FortressLibrary.fss:4861-4867`) picks `andRelCond` by a `typecase`. `TotalComparison` extends `StandardMinMax[\TotalComparison\]` today (`.fsi:121-123`), added after that commit. The same commit also dropped `RelationalPredicateCondition`'s `excludes Condition[\()\]`, which is why the second `ANDCOND` had to go (row 458's notes); the entry does not need it.
- "Walk does not apply the rule (row 416)": row 416 is walk's overloading check, which does not treat `Tg[\3\]` and `Tg[\4\]` as excluding; the review's section 3 adds that walk also accepts a type that extends two instantiations. The sentence is right; its pointer covers half of it.

**Comprehension.** The reader read "Walk does not apply the rule" as "walk does not enforce it", which section 3 supports. The reader lacked `ANDCOND`, `andRelCond` and "relational predicate", and could not tell a program's call of `ANDCOND` from its own declaration (row 458: "a program's own `p1 ANDCOND p2`", a call). The reader asked why the consequence is under walk only: the one library runs only under walk before the switch-over, which the skill holds.

**Classes.**
- wording (exhaustive count): "Besides the flat number tower of P-43, the library meets it by three changes of `952892a00`: ..."
- wording (row 416): "Walk applies no instantiation exclusion: it accepts a type that extends two instantiations, and its overloading check does not count them as excluding (row 416; the review's section 3)."
- wording (row 458): "So under walk, a program's `p1 ANDCOND p2` of two relational predicates, conditions built from a relation over a generator, which `filter` fuses, is no longer itself a relational predicate (row 458)."

## F-45

**Fidelity.**
- A condition leaves FACTS. "The call at the dispatcher's static arguments is built for template dispatchers only (F-136)." F-136 holds rows 495 and 496 but says "The arm's kinds are not checked", and nothing about a dispatcher with an `opr` or `nat` static parameter. `rung-generic-runtime/REPORT.md` section 9: "the change guards out a dispatcher that has one, by `KindType` at `OverloadSet.java:1350`", by reading, not measured, with functional methods in a top-level set also not covered. A reader who follows the pointer concludes that every template dispatcher has the call. The writer flagged this for F-136; until F-136 takes it, F-45 should keep it.
- "Compiled, such a run dies with `IncompatibleClassChangeError`": `patents-forest-rule.md` section 3 ran `ForestTower` under the forest shadow (`-Dprobe.forest=fbound`). The tree's checker refuses such a program, so the condition matters to the sentence. The entry's "Alone, the forest rule" implies it but does not say that the run was a shadow's.
- "Route C adds a return-type rule that closes the hole": `route-c-experiment.md` answer 1 credits C-full, the forest rule, the covariant reading, the return type rule over the chain and the call-site fix, "by refusal and completion". F-46 gives the whole; the sentence is acceptable with its pointer.
- The definition of the hole is faithful to section 3 ("A caller the checker types at `X = Narrow` is promised a `Narrow` and gets `M`").

**Comprehension.** The reader's account matches the source except where the wording is open:
- "call its generic arms at its own static arguments": the reader guessed "the call site's", which is right (`scope-call-site-dispatch.md`: "The generic dispatcher is already loaded under the call site's static arguments; only its arms ignore them"), but could not tell what dispatchers do today (they read the arguments off the value).
- "a lower level of the chain": the direction. In the source the specialisation is at `Mid` and the value at `Narrow`, a subtype.
- "template dispatcher" and "Route C" were lacked; both are in `concepts.md`.

**Classes.**
- wording (the dropped condition): "The call at the dispatcher's static arguments is built for template dispatchers (F-136), and, by reading, not for one with an `opr` or `nat` static parameter (`rung-generic-runtime/REPORT.md` section 9)."
- wording: "every dispatcher would have to call its generic arms at the call site's static arguments, which the loader has already given the dispatcher, instead of at arguments read from the value"; "runs for a value at a narrower level of the chain, a subtype"; "Compiled under a shadow checker with the forest rule, such a run dies with `IncompatibleClassChangeError`".
- concept: template dispatcher, already listed for `references/compiler.md`.

## F-46

**Fidelity.**
- Uncertain, and settled by the note: "`comprises T` ... overflows the checker's stack". The note's answers say "overflows today's checker", but section 2b measured it on the zero probe's stack ("Whether the tracked checker overflows too cannot be measured on the library without that stack"), whose `Formula.scala` "differs there only in `And`'s arity". So the overflow is in code that the tracked checker shares, measured on a copy. The old entry has the same claim.
- "refuses 25 pairs at 21 of the nested number tower's declarations": section 2b's deep instrument, on a library copy with the reduction markers dropped. The gate's own checker count cannot see the rule (section 4: "the library's api never reaches its overloading check there"). The old entry dropped this too.
- "a forwarding method for each middle level of a chain, without which the chain dies with `AbstractMethodError`": section 2a reads the cause "from the error text and that comment, not traced", and section 4 says "a method for every level of a chain, not sized". The rewrite states the cause as established.
- The rest is faithful: the seven declarations and the identification (answer 1, section 2b), the unbuilt hierarchy check (sections 4 and 5), the work list (section 4).

**Comprehension.** Matches. The reader could not tell:
- whether "a return to it" means route C was once taken. The library's tower was nested before route A flattened it (P-43, F-47's E5), so "return" is to the nested tower;
- what the 25 refusals mean: specialisations that a level below does not cover, which the seven declarations and the identification complete (section 2b);
- whether the hierarchy check and "a way past the checker's overflow" are one item: they are two ways to the identification (section 5);
- "shadow checker": not in the skill, and used across the record.

**Classes.**
- uncertain fidelity, settled: section 2b. Proposed: "but it overflows the checker's stack (measured on the zero probe's copy of the checker, in the recursion of `Formula.scala` that the tree shares)".
- wording: "Built as a shadow checker on 2026-09-24 and run through the zero probe's stack on a library copy without the reduction markers, it refuses 25 pairs at 21 of the nested tower's declarations: specialisations that a level below does not cover." and "Leaving route A for route C also needs: ... in the code generator, a method for each middle level of a chain, whose absence, by the error text, makes such a chain die with `AbstractMethodError` ..."
- concept, new: **shadow**, a patched copy of tracked sources put ahead of the build on the class path, measured and never landed. Used by F-40, F-45, F-46 and many other entries. Where: the `fortress-repo` core, beside the record's words, or `references/records.md`.

## F-47

**Fidelity.** Pass. The route C sentence is bounded and marked as the note marks it (`spec-refused-examples.md:497-502`: "Route C would not rescue E1-E4 or E8 either ... [inferred from the forest rule as `FACTS.md` records it]"; "only E5 and E7 ... would read differently under route C"). The alternatives' scope matches "What was found" (`AltEmptyParam` and `AltCovariantBounded`, 0, 0, 0). Row 331's exception is F-167's. Row 389 is fixed for a coercion whose static parameters are the trait's own, so "walk applies such a coercion" holds today.

**Comprehension.** Matches, except:
- "a generic coercion" (refused as a cyclic hierarchy) and "a coercion in the generic trait" (runs compiled) read as the same thing. They differ: the first is `coerce[\S extends T\](c: C[\S\])`, a coercion with its own static parameter between two instantiations (`AltCovariantCoerce`); the second a marker object with a `coerce` in `SList[\T\]` (`AltEmptyCoerce`). Row 389 itself draws the line: "one with its own static parameter is row 513".
- the alternatives' shapes are not given, so a worker cannot write them.
- "would read differently": the note means that E5's and E7's original text would stand as route C's text ("needs to carry the original text of E5 and E7 as route C's text").
- whether "Disjunctive Constraints" is one of E1 to E10: it is E8.
- "the Working Draft's `Nothing`": `references/specification.md` defines the Working Draft; the reader did not load that part.

**Classes.**
- wording: "The compiled checker refuses a coercion with its own static parameter between two instantiations, `coerce[\S extends T\](c: C[\S\])`, as a cyclic hierarchy."
- wording: "a parametric object with a factory, such as `object Empty[\T\]` with `emptyList[\E\]()`, or a widening function, such as `widen[\T, S extends T\](c: C[\S\]): C[\T\]`".
- wording: "route C (F-46) would rescue neither the `where`-clause examples, `Nothing` nor E8, the internal appendix's "Disjunctive Constraints"; only the tower (E5) and the root `Object`'s algebra (E7) would keep their original text under it."

## F-48

**Fidelity.** The split and the test's subject are right: `XXXNatExcludeChecker` checks only "Types Vec[\3\] and Vec[\4\] exclude each other", and `cP` (`TypeAnalyzer.scala:539-546`) compares `STypeArg` pairs and two `IntBase` literals, else `pFalse()`. One sentence folds row 414 into row 406:
- "So `object F extends { Flag[\true\], Flag[\false\] }` passes the checker and dies in code generation" is row 406's outcome. Row 414's, `object O[\nat n\] extends { Vec[\n\], Vec[\3\] }`, passes and dies at load with `ClassFormatError` "Duplicate interface name". Row 414 also places its cause in `TypeHierarchyChecker`'s use of `definitelyExcludes` ("provably different", where the rule needs "not provably the same"), not only in `cP`, which the entry names as "The code".
- Rows 406 and 414 each have an expected-failure test, `compiler_tests/XXXBoolExtendsTwice.test` and `XXXNatExtendsTwice.test`. The entry names neither.

**Comprehension.** The reader concluded that "a boolean or symbolic-size double instantiation ... fails later, in code generation", and that the boolean gap "has no test named". Both follow from the wording: the symbolic case dies at load, and both gaps have tests.

**Classes.**
- wording: "Two boolean arguments count as no exclusion: `object F extends { Flag[\true\], Flag[\false\] }` passes the checker and dies in code generation (row 406, `XXXBoolExtendsTwice`). Nor does a static parameter beside another argument: `object O[\nat n\] extends { Vec[\n\], Vec[\3\] }` passes and dies at load with `ClassFormatError` (row 414, `XXXNatExtendsTwice`; its cause in `TypeHierarchyChecker`'s extends check)."
- wording: "Gated by `compiler_tests/XXXNatExcludeChecker`, for the refusal of two literal sizes."

## F-49

**Fidelity.** Pass. `fill-overloads-ways.md` section 2 holds walk's choice, `c[1] = 11` and `FillBoxAny`'s refusal; F-158 holds "`fill` takes a value and `tabulate` a function". The dropped diamond sentence was wrong on `copy` (`FortressLibrary.fsi:1518`, `:1528`; row 467 fixed) and is F-158's.

**Comprehension.** Matches. The reader could not tell what `c[1] = 11` shows.

**Classes.** wording (minor): "Given a function, `fill` on an array of element type `Any` stored the function's results, `c[1] = 11`, not the function."

## F-50

**Fidelity.**
- "the checker never checks symbolic operators (P-155, row 584)" is wider than its source. Row 584: "the compiled overloading checker never checks an overloaded operator whose name is not a word of capitals". The old entry said "never checks a pair of symbolic operators". The reader duly asked whether symbolic operators are type-checked at all.
- "walk runs an arm whose size the call leaves unfixed" drops "with that parameter unbound" (the note's defect 4, `NatArmShowN`: "undefined variable [n]"; the entry's former text). The old wording "unbound" was unclear; the fact under it is worth keeping.
- The new bound on "only" is right: F-75 holds row 542, and the positional rule is "a restriction of the compiled implementation" (`rung-return-type-rule/decision-record.md` section 2). The apply file's note and `proposals.md` cite row 539 as well, but row 539 is walk's refusal at load; on the compiled path that set links and dies at run time (row 537). Drop 539 from the note.

**Comprehension.** Matches. The reader lacked:
- "the `CAP` shape": the library's `CAP` on `ScalarRange[\I\]` beside `Range2D[\I,J\]` and `Range3D[\I,J,K\]`, whose domains exclude only through the rule and the bound (the note's section 2.1). It belongs to this entry alone.
- "its positional rule": P-45's surviving rule, two generic declarations in the more-specific relation agree on their static parameters by position. Used by F-50, F-75, F-174 and P-45.
- "open traits": traits that no `excludes` or `comprises` clause closes.
- "the 2011 model" against "the 2011 paper": one source, the OOPSLA 2011 paper (`Papers/Types/`), whose model the specification now states (F-174).

**Classes.**
- wording: "its overloading check never reads a pair of symbolic operators such as `+` (P-155, row 584)"; "and walk runs an arm whose size the call leaves unfixed, with the size unbound, where the checker drops the arm or refuses the call (F-69, row 400)".
- wording: "as the library's `CAP` on `ScalarRange[\I\]` beside `Range2D[\I,J\]` does"; "as the OOPSLA 2011 paper's model, which the specification states (F-174), does".
- concept, new: **positional rule**. Where: `references/compiler.md`, beside the Return Type Rule.

## F-51

**Fidelity.** Pass. `InferCoercionRungK.fss:59-67` calls `a + z`, `z + a`, `a - z`, `z - a`, `a MIN z`, `z MAX a`, `m z`, `z m` and `m DOT z` on an `Array[\RR64,ZZ32\]` and a matrix; `InferCoercionShapes` checks `scale(bL, 3)` at `ZZ64`.

**Comprehension.** Matches; the reader's "integer literals" is one step past the test's `ZZ32` variable for the operators, but `scaleK(b, 3)` covers a numeral.

**Classes.** None.

## F-?1, split from F-42

**Fidelity.**
- "Row 405 holds the top-level case on both paths." Row 405: "a value parameter written without a type is refused on the compiled path wherever it appears, and under walk fails when its method implements an abstract declaration"; walk "runs a top-level function and a method implementing nothing". So row 405 is not the top-level case on both paths: walk runs that case. The apply note's "row 405 as the top-level one" has the same slip.
- "the specification does not describe inference of a parameter's type there". Appendix I's subsection (`changes.tex:3750-3775`): the specification asks for type inference over every construct that elides types, and does not yet describe it; the checker does not infer a parameter's type "at top level, in a trait or object, or local to an expression block". The entry's "there" limits it, and "does not describe" drops "asks for".
- The rest holds: both tests expect "Missing parameter type for" (`i`, `k`); `STypeEnv.scala:75` refuses in `extendWithBindingsFromFnList`; `:200` is `extractNodeBindings`, which the history calls the top-level site and which binds any parameter.

**Comprehension.** Matches, with the two points above unresolved by the reader.

**Classes.**
- wording: "Row 405 holds the case elsewhere: refused compiled wherever a parameter is untyped; under walk, a failure only when the method implements an abstract declaration."
- wording: "Write the type: the specification asks for inference of a type that a declaration leaves out, and does not describe it (Appendix I, ...)."

## F-?2, split from F-48

**Fidelity.** Pass. The judgement's section 4 and `spec-refused-examples.md` item 3 hold the refusal of `OprSingle` ("The inherited abstract method ODOT ... has no concrete implementation") and walk's run; `AbstractMethodChecker.scala:100-101` matches by `meth2.name == meth.name`. No ledger row holds `OprSingle` (`ledger-find`).

**Comprehension.** Matches.

**Classes.** None.

## F-?3, split from F-48

**Fidelity.** Pass. `CodeGen.java:5798-5805`: the `AnyType` branch is empty and falls to the throw. `AltEveryContra` (`C extends D[\Any\]`, with `D` contravariant) passed the checker and stopped in code generation. No ledger row holds it.

**Comprehension.** Matches. The reader noted that the checker's view is not stated.

**Classes.** wording (minor): "The code generator throws, after the checker accepts it, on `Any` as a static argument in an `extends` clause."

## Concepts for `concepts.md`

The writer's list stands. Two to add, and one correction:
- **shadow** (F-40, F-45, F-46): a patched copy of tracked sources put ahead on the class path, measured and never landed. The `fortress-repo` core or `references/records.md`.
- **positional rule** (F-50; also F-75, F-174, P-45): `references/compiler.md`, beside the Return Type Rule.
- **Designs A and B**: `concepts.md` says F-40 now defines them in place; it does not. Define them in F-40 (wording above).
