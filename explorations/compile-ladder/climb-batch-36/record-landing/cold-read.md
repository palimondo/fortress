# Cold read of clean.txt (23 entries)

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and term lookups in `references/compiler.md` (count stage, distance stage, prelude), `references/tests-running.md` (track, onelibrary), `references/tests-writing.md` (`XXX`), `references/records.md` (ledger rows), `references/interpreter.md` (walk's load check, symbolic stand-in, its messages), `references/specification.md` (Working Draft, Appendix I). Nothing else.

Entries that cite other entries not in this file (F-27, F-75, F-252, F-253, F-254, F-274, F-318, F-348, F-375, F-385, F-386, F-394, F-406, P-40, P-42, P-46, P-76, P-146, P-157, P-172, P-173, P-176) are read only as far as their inline gloss goes.

## 1. F-26 (fact): walk's choice between a generic and another declaration

**Established:** Under walk, when a call has two applicable declarations and at least one is generic in its own right, walk picks the one whose declared domain lies strictly inside the other's, independent of source order. A declaration's "declared domain" is its parameter types with each of its type parameters left symbolic under its bound (walk's "symbolic instance"). "Static parameters of its own" means a generic function or constructor, or a functional method that has static parameters while its trait or object has none. Where the domains do not nest, are equal, or neither declaration has own static parameters, walk falls back to comparing the instances the call creates. After the choice, if the chosen declaration is generic and its instance accepts an argument only through a coercion, walk coerces and re-dispatches, so the most specific declaration for the coerced values runs.

**Conditions:** Walk only. Falls back to instance comparison: (a) for a functional method of a generic trait or object (its parameters are the trait's, not its own); (b) when the two domains do not nest strictly. Exception to (a): two generic functional methods of a generic trait whose domains nest "stop at an extending object's first instance" (F-405). Generic dotted methods are chosen by F-253 (also by declared domains), except two whose bounds differ only in which api a same-named type comes from: the object's one is kept (row 1134). No re-dispatch after coercion for an overloaded dotted method, or for an argument position whose coercion `Coercions.coercionFor` does not find (example: a tuple coerced element by element); there the chosen instance runs. Two generic overloads with the same static parameters by name, kind and bound share one symbolic instance even if their `where` clauses differ; no test or library declaration has such a pair (row 478).

**Consequence:** A worker can rely on walk choosing a nested generic/plain pair by declared types, and on coerced arguments reaching the most specific declaration, except in the listed cases. Writing two generic overloads that differ only in `where` clauses risks row 478.

**Evidence:** Builds P-45. Gated by `tests/DispatchDeclaredDomain.fss` and `DispatchConvertedAgain.fss`. Detail: `compile-ladder/rung-walk-dispatch/REPORT.md` sections 5.1, 5.2, 5.5.

**Could not resolve:**
- "stop at an extending object's first instance": unclear wording. Read two ways: walk halts with an error when the first instance of an extending object is made, or the comparison stops after (uses only) that first instance. F-405 says such a pair "is refused" there, F-174 says walk "stops" there, so the outcome (load refusal vs. run-time failure) is not pinned down.
- "differ only in the api of a type of one simple name": unclear wording; I read it as "bounds naming same-simple-name types from different apis", but the phrase is hard to parse, and "the object's is kept" leaves open what happens to the trait's (hidden? an error?).
- "share one symbolic instance": unclear consequence. It does not say what sharing does to dispatch (are the `where` clauses ignored when comparing, so the pair reads as duplicates?), nor whether row 478 is a defect.

## 2. F-76 (fact): the checker's coverage check for `comprises` and the intersection-typed tie

**Established:** The compiled checker accepts the specification's `comprises` example of the Meet Rule by testing whether several declarations below two overloads together cover their meet. It uses this coverage test only when checking overload sets, never in its general subtype test. For a call whose argument's static type sits between closed traits and the types they list, and whose most specific declarations tie without needing a coercion, the checker types the call as the intersection of those declarations' return types.

**Conditions:** Intersection typing only when the tied declarations, and every more specific declaration the call could run, have no static parameters (this boundary is in the spec text, Appendix I `revival-meet`). Other ties: F-408. Open gaps: coverage refuses a pair if any compared declaration has static parameters (row 546); a generic declaration instantiated at an intersection type fails when its class loads (row 559); `comprises` is checked only at the closed trait's immediate subtypes, so a type in another component under a generic subtrait is not checked (row 487); the verdict on an overload set can depend on which components were compiled earlier in the same JVM (row 547). On the compiled path a method call on a value of intersection type runs on the conjunct holding the declaration the checker chose (F-386).

**Consequence:** A worker may rely on closed-trait coverage only for overload sets of non-generic declarations without coercion; must not expect it in subtyping; must avoid instantiating generics at intersection types on the compiled path; should not trust an overload verdict as independent of compile order.

**Evidence:** Builds P-60. Gated by `compiler_tests/*Comprises*` and `*CoverageReturn*`. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 3, 4.

**Could not resolve:**
- "closed traits": a language concept not defined in the skill; I take it to mean a trait with a `comprises` clause (P-60 uses it the same way), but it is not stated.
- "runs on the conjunct that has the checker's chosen declaration": unclear wording. Which value is "typed by the intersection" (the tied call's result?) and which choice is "the checker's chosen declaration" (for the later method call, since the tie itself has no single choice) are both inferred.
- "dies as it loads": I read it as a class-loader failure at instantiation; the error kind is not named.

## 3. F-225 (fact): how the checker types `self` in a self-typed trait

**Established:** In a self-typed trait `C[\X\]` (its parameter `X extends C[\X\]`) that has no `comprises` clause or only `comprises { ... }`, the compiled checker types `self` inside method bodies as `C[\X\] & X`, taken from the F-bound. Method signatures keep `self` as plain `C[\X\]` except (a) in the overloading exclusion test (F-277) and (b) in the Return Type check where an object's dotted method redeclares the trait's method at the same parameter types, which then refuses a narrower return type (row 1094, a departure from P-146 and P-157; a getter redeclared that way keeps the plain type and compiles, F-394). The checker refuses an extender instantiated at another type: `object Bad extends Integral[\ZZ32\]` is refused because `Bad` is not a `ZZ32`. For a trait whose `comprises` clause lists types, `self` in bodies is the trait met with the union of the listed types; signatures stay plain, and the exclusion test reads the meet.

**Conditions:** Compiled checker only; walk has no such rule and loads what the checker refuses. The `comprises`-listing reading is a batch plan's default, not a curator decision (P-146 covers self-typed traits only). Accepting a parameter bounded by a self-typed trait that the trait extends at that parameter (as the team's `Containment` mixins do) is "a default of the coordinator's". Every self-typed body in the library is accepted except `Integral`'s `numerator`, which each integer type declares instead. The team's `PureList`'s `List` is rightly refused (row 355). Fixed on the compiled path: a default body returning `self` at the self-type parameter, also at an object type such as `object Pt(...) extends Shape[\Pt\]` (row 695), at a conditional's arm and a closure's result (rows 1051, 1050; the cast is F-377); a default body calling a method on a value of the self-type parameter, also when the object lists the trait first (row 1052; F-385, which names a generic object where it may not hold). The prelude's `comprises T` spelling on `StandardTotalOrder` and `Equality` (`Library/CompilerAlgebra.fsi`) does not govern the one library.

**Consequence:** Make every type that extends a self-typed trait `C[\A\]` an `A`; expect bodies to see `self` as the meet; do not narrow the return type of a redeclared dotted method of a self-typed trait (row 1094); write the self type through the F-bound, not with the prelude's `comprises T`; do not rely on walk to catch a wrong extender.

**Evidence:** Builds P-146. Naden's last text (`Papers/Types/journal/justificationOfRTR.tex:626-630`) and Steele's message on commit `655e65d53` are cited for the F-bound reading. Gated by `compiler_tests/SelfType*` and `XXXSelfType*`. Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4, 7; `compile-ladder/rung-self-type-exclusion/REPORT.md` section 1.

**Could not resolve:**
- "The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter": unclear wording. "takes" may mean "accepts as well-formed" or "reads as the self-type parameter"; which trait is "the trait" (the self-typed one or the mixin) is ambiguous. Without the `Containment` source I cannot reconstruct the shape.
- "a default of the coordinator's" vs "a default of a batch's plan": unclear wording. "coordinator" and "batch" are not defined in the skill core (CLAUDE.md mentions a coordinating session). I read both as "not decided by the curator", but whether they differ in standing is unclear.
- "where the object lists the trait first": unclear wording. First in its `extends` list? Why the order matters is not said.
- "that spelling does not bind the one library": two readings: "the one library is not obliged to use it" (my reading) or a technical name-binding sense.
- "Naden", "Steele": people, not defined in the skill; I take them to be team members/authors. Not blocking.
- "the generic object for which it may not hold" (F-385): left to another entry; not blocking.

## 4. F-232 (fact): syntax tree hashes do not depend on identity hashes

**Established:** Hashes of syntax tree nodes are deterministic, not taken from the JVM's identity hashes, with three exceptions: inference variables, walk's wrapped values, and nodes containing either. Every generated node class seeds its hash from the hash of its class name (written by makeAST's post-processing of ASTGen output and by the in-repo generators, `build.xml:698-716`). Any field whose type contains an `Option` is hashed by `NodeHash.of`, because the PLT `Option` classes hash by identity. So hash maps and sets of nodes free of the exceptions iterate in a fixed order regardless of earlier identity-hash calls, and `StaticChecker.checkApis` takes apis in a fixed order.

**Conditions:** Exceptions: an inference variable's id is a bare `Object` (`nodes_util/NodeFactory.java:1166-1184`), though no output of the count stage flows through that hash; walk's `_WrappedFValue` hashes its `FValue` with walk's own hash, which can be an identity hash (`_WrappedFValue.java:170-177`; row 430). `DeclaredFunction`s (checker index entries, not nodes) still hash by identity, but after row 737's repair no `ApiTypeExtractor` choice depends on their order (F-254), and no choice among a call's declarations does (F-408).

**Consequence:** A worker can expect checker results that iterate over node collections to be reproducible across runs, except where inference variables or walk's wrapped values are involved. A new node field holding an `Option` must hash through `NodeHash.of`.

**Evidence:** Gated by `NodeHashJUTest`; row 737's repair by `OmittedReturnTypeFromApi`. Detail: `compile-ladder/rung-ast-hashes/REPORT.md` sections 4.2-4.4.

**Could not resolve:**
- "makeAST", "ASTGen", "PLT `Option`": tool and library names not in the skill (I infer the AST generator and an external `Option` library). Not blocking.
- The second consequence above (that a new `Option` field must use `NodeHash.of`) is my inference; the entry states only the current mechanism.

## 5. F-277 (fact): the checker's overloading exclusion test reads `self` and bounds

**Established:** In its overloading exclusion test (deciding whether two declarations' domains share no value) the compiled checker (a) reads `self` of a trait whose self type comes from its F-bound as `C[\X\] & X`, and of a `comprises`-listing trait as the trait met with the listed types (F-225); (b) reads each static parameter "at the top of" the two domains' meet as its declared bounds. Every other overloading rule uses the plain signatures.

**Conditions:** Mechanism: a "second arrow" is built from the declaration's own parameters (`FunctionalMethod.ast`) only where they differ from `parameters()` (`OverloadingChecker.scala`); the bounds enter as one more conjunct of the reduction's constraint, "alone and never beside the parameter" (`TypeSchemaAnalyzer.scala`, `meetEmptyWithBounds`, a third way for `OverloadingOracle.excludes` to be valid). Results: under "the full check", the 8 pairs between `AdditiveGroup`'s `+`/`-` and "the generic scalar block" clear (191 to 183, no library line changed); the count stage under it is 98. Still refused: `tint`, since `Box[\Bottom\]` is an instance of both domains (row 786). Row 713's pair is accepted and runs; walk refuses it at load. Walk loads "the vector pairs' shape" in a program's own component too, reading `self` the same way in its own exclusion test (F-318).

**Consequence:** A worker may declare overloads that exclude only through the self type or through the bounds of a top-level static parameter; other rules (Meet, Return Type) still see plain signatures. Row 713 is a known walk/checker disagreement.

**Evidence:** Builds P-157. Gated by `compiler_tests/Exclusion*`, `XXXExclusion*`, `OverloadTwoBoundsClosedTraitExclusion`. Detail: `compile-ladder/rung-self-type-exclusion/REPORT.md` sections 1, 2, 4.

**Could not resolve:**
- "each static parameter at the top of the two domains' meet": unclear wording. "At the top" may mean a parameter type that is a bare type variable (not nested in another type), or something about the meet's structure.
- "The second arrow": unclear wording; no first arrow is named. I guess the arrow type used for the exclusion test with `self` read as the meet, but the entry does not say.
- "one more conjunct of the reduction's constraint, alone and never beside the parameter": unclear wording; "the reduction" and "beside the parameter" have no referent I can find.
- "With the full check on", "the generic scalar block", "the vector pairs' shape", "`tint`": undefined names. I cannot tell what the full check is (a switch? which?), which declarations the scalar block or vector pairs are, or what `tint` is (a test? a declaration?).
- "(191 to 183, no library line), and the count stage under it is 98": unclear. Two counts, but which measure each is (error total under the full check vs. count stage total) and what "under it" refers to are guesses.

## 6. F-334 (fact): the checker orders candidates by a linear extension of the partial order

**Established:** The compiled checker orders a call's candidate declarations, a coercion's candidates and a trait's ancestors by a linear extension of their "more specific than" partial order, comparing each pair once. So no call with 32 or more candidates stops the checker any more.

**Conditions:** `scala_src/useful/PartialOrder.scala` supplies `minimal` and `linear`, used at `Functionals.scala:972`, `:1101-1121`, `CoercionOracle.scala:363-382`, `Formula.scala:610`. A call's candidates start in the order of their declarations' places; F-408 gives how a tie among the most specific is decided, refused or kept by place. On the one library the checker's results match those of the sort it replaced, and the distance stage checks `value object Char` to its end (`#crash none`).

**Consequence:** A worker need not fear a crash or stop at large overload sets in the checker, and can expect results unchanged from before on the one library.

**Evidence:** Tests `compiler_tests/PartialOrderCandidatesCompiled`, `compiler_tests/TieAmongMostSpecificCompiled`, `PartialOrderJUTest`, the distance stage. Detail: `compile-ladder/rung-checker-partial-order/REPORT.md` sections 1, 2, 6, 8.

**Could not resolve:**
- "so no call stops it at 32 candidates or more": unclear wording, mildly. It implies the old sort stopped the checker at 32+ candidates, but not how (an exception? a wrong order?). The new property is clear.

## 7. F-342 (fact): the checker's numeral defaults, range checks and where numeral types may be written

**Established:** The compiled checker: (1) gives a numeral its default type wherever no type with a coercion from the numeral's type fixes it (untyped binding, `Any`, `Object`, `Number`, unbounded type parameter, receiver, join, result with no declared return type): an integer numeral becomes `ZZ32`, else `ZZ64` or `ZZ` by size; a numeral with a radix point becomes `RR64`. A type parameter fixed only by numerals takes the narrowest default holding all of them, and conversion to the default counts as no coercion when ranking. (2) Statically refuses a numeral out of a bounded number type's range or rounding to infinity, also as a tuple element at a tuple type and in a result position of `if`, `case`, `do` or `try`; and refuses a numeral at a program's type that has no coercion from it. (3) Accepts `NaturalNumeral` and `RadixPointNumeral` only written as a parameter's type, never as a type extended by an object or trait. A `nat`/`int` parameter read as a value is `ZZ32`. Each of a numeral coercion's four numbers is `ZZ` where nothing fixes its type and converts where its place fixes a bounded number type.

**Conditions:** Compiled checker. P-174's four-number rule is built except at a call and across components (F-407). A `typecase`'s selector keeps its own numeral type (row 963).

**Consequence:** A program on the compiled path can rely on numerals defaulting as walk's do (F-341), must keep numerals within the target type's range, and may write numeral types only as parameter types.

**Evidence:** Builds P-173 (checker part), P-174 (written-only rule; four numbers), P-40 (size value). Sources: `KindEnv.scala` `getType`, `CoercionOracle.buildCoercion`. Tests: `compiler_tests/LiteralDefaultCompiled`, `LiteralDefaultResultCompiled`, `XXXLiteralTypeUnwritable.test`, `XXXNumeralBeyondZZ32Range.test`, `XXXNumeralBeyondRangeInTuple.test`, `XXXNumeralJoinBeyondRange.test`, `XXXNumeralTypeExtendedRefused.test`, `NatValueZZ32Compiled`, `NumeralStaticDesignCompiled`. Detail: `compile-ladder/rung-numeral-checker/REPORT.md`, "1. What changed and why".

**Could not resolve:**
- "bounded number type": a language concept not defined in the skill. I read it as a number type with a finite range (`ZZ32`, `ZZ64`, `NN32`, `NN64`, `RR32`, `RR64`, not `ZZ` or `QQ`), but that is a guess.
- "a typecase's selector keeps its own numeral type (row 963)": unclear whether this is a defect or intended, and what follows from it for a program (refused? runs a numeral-typed arm?).
- "written ... only as a parameter's type" here vs. P-174's "only as a coercion's or an operator's parameter type": the two entries differ on which parameters qualify (any parameter, or only a coercion's or an operator's). Unclear wording or an inconsistency between entries.
- `XXXLiteralTypeUnwritable.test` etc. are listed among "Tests" for a fact that states the rule as built; an `XXX` test records a defect, so which parts of the fact are not yet true is unclear to me.

## 8. F-376 (fact): a compiled dispatcher casts an arm's result to a static-parameter range

**Established:** When an overload set's principal declaration returns one of its own static parameters, the dispatcher that `OverloadSet` writes (`generateCall`, `generateLeafCall`) casts each arm's result whose declared return type differs to that parameter (which the class loader fills in per instance). For an arm instantiated at run time this cast replaces the cast to the arm's declared return type. So a generic declaration beside one on an object type passes JVM verification at every instance; without the cast, the generic's instance at a different object type fails with `VerifyError: Bad return type`.

**Conditions:** Compiled path only. A dispatcher whose range is not a static parameter gets no such cast (row 699).

**Consequence:** A worker can overload a generic with a declaration on an object type and expect it to verify, where the principal declaration's range is a static parameter.

**Evidence:** The `run` step of `compiler_tests/OverloadReturnObjectDomain`: a call at `Box[\Square\]` fits `keep[\T\]` and `Box`'s `keep(self)`; the second is more specific by its declared parameter type and so "by reading" is the checker's choice (F-408). Detail: `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".

**Could not resolve:**
- "principal declaration": a term not defined in the skill or the entry. Which declaration of an overload set is principal (the most general? the first?) I cannot tell.
- "an arm instantiated at run time": unclear wording; I read it as a generic arm whose class the loader makes, but not sure.
- "row 699": unclear whether the missing cast for a non-static-parameter range is a defect (a known `VerifyError`) or just a note.
- "by reading, the checker's choice": unclear. I read it as "inferred from F-408's rules, not observed", which weakens the evidence, but the entry does not say so outright.

## 9. F-396 (fact): the one library compiles and runs on the compiled path

**Established:** With `FORTRESS_LIBRARY=one`, the one library's fourteen components compile to jars against a second set of run-time classes, and a program compiled against them runs on the compiled path with the JVM verifier on (printing a line, calling a varargs declaration, reducing over a range, comparing two strings; `Hello` runs). The onelibrary track compiles the fourteen first in one `.test` (`OneLibraryJUTest.java:44`). The run-time classes naming library types come in two sets under the same names: `ProjectFortress/build` for the prelude, and `ProjectFortress/build-one` (built from `ProjectFortress/src-one` by `ant compileAll`) for the one library, put first on the class path under the selection. The one library's seven number types, `Boolean`, `Char` and `FlatString` are objects whose classes the code generator writes over payload classes (`NamingCzar.java`); all are value objects except `FlatString`, a reference object (`Library/FlatString.fss:32`). A helper raises an exception by its simple name, mapped to the library's class by each set's `LibraryNames`. A call on `self` in `QQ comprises { Ratio }` takes `Ratio`'s declaration in every JVM (F-408).

**Conditions:** Remaining departures from walk against the one library: `println` of a number or boolean (row 1098); `u.asString` in a generic body at `U extends ZZ32` (row 1101); the report of an uncaught exception (row 1102); catching an exception that a helper raises (row 1103); a reduction over a zip of two lists, or `=` of two lists (row 1137); `Vector`'s `+`, `-` (row 643) and `copy` (row 1138); a failing `assert` with a message dies with `AbstractMethodError` instead of its `FAIL` line (row 1140).

**Consequence:** A worker can write `one_library_tests/` programs that run, avoiding the listed constructs, and must keep `src` and `src-one` copies of runtime classes in step.

**Evidence:** Tests `one_library_tests/OneLibraryComponents.test`, `OneLibraryRunHello.test`, `OneLibraryCatchHelperRaises.test`, `OneLibraryRunStringEquality.test`, `OneLibraryVarargsArguments.test`, `OneLibraryRangeReduction.test`, `OneLibraryArr.test`. Detail: `compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)"; `compile-ladder/rung-one-library-run-walls/REPORT.md`.

**Could not resolve:**
- "which the export check's rule decides as much as the code generator" (row 1098): "export check" is not defined in the skill or the entry; I cannot tell what decides `println`'s behaviour or what the departure is.
- "a caught exception that a helper raises, which is not its object" (row 1103): unclear wording; two readings: the caught value is not the library's exception object, or the helper's raise does not produce the declared object. I lean to the first.
- "The track compiles the fourteen first since its programs use them": repeats an earlier sentence; not blocking.
- Most departures say what differs only by row number, not what the compiled path does instead; acceptable for a fact, but a worker cannot act on them without the rows.

## 10. F-408 (fact): how the checker picks among a call's declarations

**Established:** The compiled checker chooses among a call's declarations by their declared signatures (with `self` as F-225 reads it), considers them in order of their places (file, then line, then column), and refuses a tie that the rules leave open. Within a tie, a declaration reached twice counts once, and one more specific than all the others on its declared arrow wins. P-60's tie is typed by the intersection of return types when the tied declarations, and every more specific one the call may run, have no static parameters. Any other tie is an error 'Ambiguous call ...', except one the overloading check is responsible for (among the unit's own declarations, or duplicates): there, an undecided tie among the unit's own declarations in a set the overloading check accepts is resolved by place, with no error (row 1136). The code generator casts `self` where the chosen declaration takes a listed type (F-377). So a call's choice and type no longer depend on JVM identity hashes, and the one library's calls on `self` in `QQ` take `Ratio`'s declarations.

**Conditions:** The place order is a batch plan's default, not a curator decision.

**Consequence:** A worker can expect deterministic choices; must resolve ambiguous calls by declaring a more specific declaration; should know that some undecided ties are silently resolved by place (row 1136).

**Evidence:** Builds P-45 and P-60's tie. Tests `compiler_tests/GenericTiesDeclaredCompiled`, `ComprisesSelfListedTypeCompiled`, `ComprisesFunctionalMethodNarrowedReturn`, `CoverageReturnGenericFamily`, `OverloadGenericObjectTwoParams`. Detail: `compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why".

**Could not resolve:**
- "kept by place": unclear wording. Which declaration is kept (the first by place, presumably) is not stated.
- "the unit": not defined in the skill; I read it as the component (compilation unit) being checked.
- "save one that the overloading check judges": unclear wording. I read it as "a tie that the overloading check is responsible for refusing is not reported again at the call", but "judges" could also mean the overloading check decides it.
- "a declaration met twice": I read "reached twice" (e.g. inherited along two paths); not certain.

## 11. F-409 (fact): a generated class holds each method once

**Established:** Each class the code generator writes holds each method only once per name and descriptor. Bridges, forwarders to an inherited body, and dispatch methods among inherited declarations are written only where the class's own methods leave that name and descriptor free, and a bridge that two parents both supply is written once. The class writer (`compiler/codegen/CodeGenClassWriter.java`) keeps a record and defers these methods to the class's end. This follows `Specification/basic/traits.tex`, "Method Declarations": the type's own declaration replaces an inherited one at the same parameter types.

**Conditions:** Two methods whose descriptors become equal only in an instance of a generic class are not caught. On the base, the one library's 2208 classes held 25 duplicated methods; now none.

**Consequence:** A worker can rely on no duplicate-method class from ordinary inheritance; a generic class whose instance merges two descriptors remains a risk (the failure it would give is not stated).

**Evidence:** Tests `one_library_tests/OneLibraryVarargsArguments.test`, `OneLibraryRangeReduction.test`, `OneLibraryArr.test`, `OneLibraryDot.test`, `compiler_tests/TraitBridgesWrittenOnce.test`. Detail: `compile-ladder/rung-one-library-run-walls/REPORT.md`, "What changed and why"; `SKEPTIC.md` beside it.

**Could not resolve:** nothing blocking. Minor: "are not caught" does not say what goes wrong then (a `ClassFormatError`?), nor whether a ledger row holds it.

## 12. F-139 (fact): `RR32` and `RR64` are siblings

**Established:** `RR32` and `RR64` are siblings under `Number`; `RR64` has a coercion from `RR32`, and nothing coerces into `RR32`. Under walk, arithmetic on two `RR32`s gives `RR32`; `RR32` with an `RR64`, a float numeral or a `ZZ32` gives `RR64`. A typed binding converts an `RR32` (to the declared type), but a declared return type does not (row 387).

**Conditions:** On the compiled path (prelude): `=` at `RR32` overflows the stack (row 528), except `c = 0`, which is refused statically; two `RR32`s give an `RR64` (row 529).

**Consequence:** A worker must not expect `RR32` to widen at a return; on the compiled path avoid `=` on `RR32` (bind to `RR64` first) and expect `RR64` results from `RR32` arithmetic until the switch-over.

**Evidence:** Gated by `tests/RR32SiblingRungV.fss`. Detail: `compile-ladder/rung-rr32-sibling/REPORT.md` sections 1 and 11.

**Could not resolve:** nothing blocking. Minor: "a declared return does not" convert, but the entry does not say whether that is refused, fails at run time, or returns an `RR32` unconverted.

## 13. F-257 (fact): walk's load check names the broken rule

**Established:** Under walk, when the load check refuses a pair of declarations after reading them on their declared domains, its message names the overloading rule the pair breaks: "fails the Return Type Rule:", "fails the Meet Rule:", or for No Duplicates, "fails because their parameter lists have the same types". The first two contain the words "not found", because walk's reading is narrower than the rules (rows 539, 779 hold valid pairs walk refuses). A pair not read on declared domains keeps the team's parameter-check message, e.g. "with generic type, at least one pair of parameters must have excluding types". The message does not change which pairs load.

**Conditions:** The load check reads a pair on declared domains when: (a) the parameter-by-parameter check refuses it and both declarations have own static parameters, or one has them and the other is plain or a generic trait's functional method declaring none of its own (F-252, F-27, F-318); (b) that check "finds a plain declaration inside an own generic's declared domain excluding at object types alone" (F-375); (c) two generic dotted methods whose symbolic instances' declared domains nest (`methodPairValid`); (d) only for No Duplicates, a pair the check orders (F-274). Not read so: a varargs parameter, parameter lists of different lengths, an error while reading the instances, a pair of none of these kinds (e.g. two functional methods of generic traits, row 780), or the instances made by an explicit instantiation such as `f[\A, B\]` of two generic declarations of one name (`XXXGenericOverload2`).

**Consequence:** A worker writing a load-refusal test can match `load_exception_contains` on the rule-naming prefix for pairs of these kinds, and on the parameter-check message for the others.

**Evidence:** Gated by `tests/GenericReturnRuleInvariantWalk`, `GenericReturnRuleOuterParamWalk`, `GenericBesidePlainReturnRuleWalk`, `GenericPairTupleReturnWalk` (Return Type); `GenericOverloadInstancesApartWalk`, `GenericBoundsNoMeetWalk`, `GenericBesidePlainNoMeetWalk` (Meet); `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk` (No Duplicates). Detail: `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1, 3.

**Could not resolve:**
- "where that check finds a plain declaration inside an own generic's declared domain excluding at object types alone": unclear wording. I cannot tell what excludes what: whether the plain declaration lies inside the domain and the two exclude only at object-type positions, or whether the check reads exclusion only at object types.
- "a pair that the check orders only for the No Duplicates Rule": unclear wording; two readings: "a pair the check finds ordered is read on declared domains only to test No Duplicates", or "a pair ordered solely for the purpose of No Duplicates".
- "contain the words 'not found' because walk's reading is narrower than the rules": unclear. The causal link (why narrower reading yields those words) and where in the message they appear are not given; I read it as the message hedging ("... not found") rather than asserting the rule fails.

## 14. F-341 (fact): walk's numeral value and its conversions

**Established:** Under walk a numeral evaluates to its default value, carrying its four numbers, and converts when its place fixes a type. Default: integer numeral is `ZZ32`, `ZZ64` or `ZZ` by size; radix-point numeral is the nearest `RR64`; one value per site (`Numerals.java`). At a typed binding, assignment, field, parameter, declared return type or coercion, it converts through the place type's coercion from `NaturalNumeral`/`RadixPointNumeral`, run with the four numbers bound as numbers that themselves convert where they stand (`ZZ` where nothing fixes a type, F-407), one result per site and type. A folded constant at a library number type converts from its exact value, outside the coercion. A numeral out of the type's range, rounding to infinity at `RR32`/`RR64`, at a type with no coercion from it, or outside its coercion's `where` clause is refused at that place when it runs. "A store keeps its default alone." In dispatch, it fits at its default unless its own coercion reaches a declaration strictly below, which then runs (F-366); "else by its own type's coercions only"; it "reads a tie at the default". A type parameter fixed by several numerals takes the narrowest default holding them all. Examples: `q: QQ = 0.1` is exactly 1/10; `y: RR64 = 0.5` is `SEQV` a computed 0.5; for `h: QQ = 1/2`, `h = 0.5` is `true` through `QQ`'s `=` (not the library's `=` over `Any`). At load walk refuses a numeral type written as an extended type, a `comprises`-listed type, a static argument, or in a return type, a variable's, a field's or an object value parameter's type.

**Conditions:** Walk. Departure: a numeral type as a static parameter's bound or a `typecase` arm's type loads (row 1135).

**Consequence:** A model line may write numerals at any number type and get exact conversions under walk; range errors surface at run time, not load.

**Evidence:** Tests `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`, `NumeralRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityAtParameterWalk.fss`, `NumeralFoldedRoundsToInfinityWalk.fss`, the load check's `NumeralType*Walk.fss`, `NumeralEqualsNumberWalk`. Detail: five reports (`rung-numeral-types`, `rung-static-numerals`, `rung-numeral-leftovers`, `rung-walk-load-check-generic-numeral` "Row 981", `rung-walk-bounds-tuple-numeral-type`).

**Could not resolve:**
- "a store keeps its default alone": unclear wording. "store" is not defined; it might be an array element store, an untyped variable, or a write into a container. And "alone" may mean "without the four numbers" or "without conversion".
- "else by its own type's coercions only, and reads a tie at the default": unclear wording. I read "if the default fits nothing, convert only by the numeral type's coercions (not the default type's)", and "break a tie as if at the default type", but both are guesses.
- `SEQV`: a language concept not in the skill; I take it as identity/bitwise-same comparison.
- "refused there when it runs": I read it as a run-time error at that place; the error kind is not given.

## 15. F-347 (fact): compiled numerals are made once, before the program runs

**Established:** On the compiled path, each numeral place whose type mentions no type parameter becomes one value made before the program runs: a JVM constant where folding the type's numeral coercion ends in an `int`, `long`, `float` or `double`; otherwise a static final field filled once by calling the coercion's method with the four numbers as `ZZ` values. The code generator folds the coercion body (library's or the program's) over a fragment of constants, bound names, natives over the built-in types' representations, and calls of functions and methods within that fragment (`compiler/codegen/NumeralCoercionFold.java`). The method, `coerce_T№natural` or `coerce_T№point`, is compiled once in the declaring component and called from any component; a program type's prefix minus on a negative constant runs once with it (`CodeGen.java`). A four-number value the checker typed at a bounded number type converts from its `ZZ` in the method, and in the fold into the type's representation (F-407).

**Conditions:** A place whose type mentions a type parameter calls the method on every evaluation (row 957). A coercion body with two calls of the program's own functions in one operator or argument list (e.g. `small(n) - small(m)`) spawns a task, which runs in place inside the root task that initializes the component's class (F-348). Under walk, a folded constant at a library type converts from its exact value.

**Consequence:** Numerals cost nothing at run time on the compiled path except inside generic code (row 957); a worker writing a program type's coercion can expect it to run once per site.

**Evidence:** Tests `compiler/desugarer/NumeralCoercionFoldJUTest`, `library_tests/NumeralFoldIntegers`, `NumeralFoldFloats`, `compiler_tests/NumeralAcrossComponent`, `NumeralMinusOnceCompiled`, `NumeralCoercionOnceCompiled`. Detail: `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

**Could not resolve:**
- "calls of functions and methods in the fragment" vs P-174's "A coercion's body is a computation at compile time, with no method invocation": the two entries seem to disagree on whether a coercion body may call methods. Unclear wording or an inconsistency.
- "bounded number type": as in F-342, not defined.

## 16. F-366 (fact): a numeral at a call moves to a more specific declaration only by subtyping

**Established:** On both paths, a numeral argument goes to the declaration its default type fits, unless its own coercion reaches a declaration whose declared parameter types lie strictly below by subtyping; then that one runs. The ordering is subtyping on declared parameter types, not the coercion chapter's relation: `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` runs the `RR64` one; `x^2` for an `RR64` keeps its integer power. A non-numeral value's coercion is not ranked this way. Where a call reaches two unordered declarations only by coercion, the one whose parameter the numeral's default fits as is runs, whether they differ at the numeral alone or elsewhere too (so `1.0 s` for `s: ZZ32` checks at `RR64`'s juxtaposition against the one library). Examples: `u = 0` and `0 = u` are `true`, `u =/= 0` is `false`, for a zero `u` of `NN32`, `NN64`, `RR32`; `h = 0.5` is `true` for `h: QQ = 1/2`; `k(5)` runs `k(x: NN32)` beside `k(x: Any)`; a `case` clause `0` matches a zero `NN32`; a program's own number type compares with a numeral by its own `=`. `Equality[\T\]` declares `=/=` as the negation of `=` (`FortressLibrary.fss:102`), reached before the `=/=` over `Any` (`:98`). The checker compares only "where the declaration that fits has a numeral at a parameter that is not of the numeral's default type", so `i + 1` costs nothing more.

**Conditions:** P-46 does not word the order; the worker chose subtyping, and the curator has accepted it as landed without stating a decision. On the compiled path until the switch-over, the checker refuses `u =/= 0` at `RR32` and `RR64` (row 1059) and `u = 0` at `RR32`, an ambiguous coercion (row 528). Departures: under walk a numeral beside a value typed `Any` converts by that value's run-time type (row 1016); on both paths a numeral at a bare type parameter's declaration does not move to a more specific one (row 1017).

**Consequence:** A model line may compare a number of any type with a numeral and write a float numeral beside an integer value, on both paths. Workers should treat the subtyping order as standing, though not as a worded curator decision.

**Evidence:** Builds P-46. Sources: `numeralAttempt`, `numeralTie` in `Functionals.scala:980-1021`, `:1066`, `:1143`; `bestMatchForNumerals`, `belowByNumerals` in `OverloadedFunction.java:2422-2525`. Tests `compiler_tests/NumeralMostSpecificCompiled`, `NumeralEqualsNumberCompiled`, `NumeralTieDefaultCompiled`, `tests/NumeralMostSpecificWalk`, `NumeralEqualsNumberWalk`, `NotEqualNumeral`. Detail: `compile-ladder/rung-numeral-most-specific/REPORT.md`, "1." and "5. Points to report".

**Could not resolve:**
- "the coercion chapter's relation": a language concept not in the skill; I infer a specification ordering of declarations by coercion distance, but cannot say what it would choose instead.
- "where the declaration that fits has a numeral at a parameter that is not of the numeral's default type": unclear wording; a declaration does not "have a numeral". I read it as "where a numeral argument sits at a parameter whose declared type is not the numeral's default", but am not sure.
- "the curator has read that choice as landed and let it stand, without wording a decision of his own": clear in intent (not a position), but its standing for a worker (bound by it or free to revisit?) is left to inference.
- "the report says which choices walk keeps in its dispatch cache": a pointer only; not blocking.

## 17. F-377 (fact): the compiled code casts `self` to a listed type or the self-type parameter

**Established:** Where the checker reads `self` as one of a trait's listed types or as its self-type parameter, the compiled code inserts a cast. `CodeGen.castToTypeBelow` casts a value of self's type (the checker's `TraitSelfType` with a non-empty list: a `comprises`-listing trait, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait. Cast sites: a one-argument call's argument (several-argument calls already cast each), including where the chosen declaration takes `self` at a listed type (`QQ`'s calls taking `Ratio`'s, F-408); a typed binding; an assignment; a method's return value; each arm of a conditional or `case`; the conditional's type; a function expression's or local function's result, also where the value is a typecase whose arms each have self's type. So `den(self)` for `den(r: R)` in `trait Q comprises { R }`, `twin(self): S = self`, and `mx(self, other: T): T = if lt(other, self) then self else other end` in a self-typed trait verify and run (rows 991, 695, 1050, 1051 fixed), as the one library's `QQ comprises { Ratio }` and `StandardTotalOrder`'s `MIN`/`MAX` need. A conditional or typecase whose arms are pairs holding `self` (`MINMAX`'s shape) needs no cast (tuple type is a JVM interface; the caller converts); a typecase whose arms are all `self` has a one-element union, which is cast. Only `self` gets this reading: a variable declared at the trait where a listed type is expected is refused. An assignment from outside an object to its `var` field passes the value at the field's type, casting `self` at a listed type (F-406). No cast where the value's type is a subtype by `extends`.

**Conditions:** No cast (open): a typecase with `self` in one arm and another value in the other (row 1070); a trait listing a type at a `where`-clause variable (row 307). Two casts added though the verifier (which checks no interface type) needs none: at a declared trait type strictly below self's trait (a planner's default), and at a `self` arm where the conditional stands at a trait type, e.g. `atQ(c: Boolean): Q = if c then self else R(0, 0) end` gains `checkcast R` (a worker's choice beyond the plan). The curator has decided neither.

**Consequence:** A worker can write `self` where a listed type or the self-type parameter is expected in the listed positions on the compiled path; avoid the mixed-arm typecase and the `where`-clause listing; the two extra casts may be revisited.

**Evidence:** Tests `compiler_tests/ComprisesValueAtListedTypeCompiled`, `ComprisesValueAtConditionalArmRun`, `ComprisesValueFromClosureRun`, `SelfTypeReturnSelfRun`, `SelfTypeReturnSelfAtTraitRun`, `SelfTypeArmRun`, `SelfTypeFromClosureRun`, `VarFieldAssignedSubtypeRun`, `ComprisesSelfListedTypeCompiled`, `ComprisesSelfAbstractFunctionalMethodCall`. Detail: `rung-comprises-cast/REPORT.md`, `rung-self-arm-closure/REPORT.md`, `reviews/model-comparison/probe-2026-11-18.md` "Point 1", "Point 2", `rung-checker-most-specific/REPORT.md`.

**Could not resolve:**
- "at each arm of a conditional or a `case` expression, at the conditional's type": unclear wording. "at the conditional's type" may mean a cast of the whole conditional's value, or the cast target for each arm; I cannot tell which.
- "gets no cast (row 1070)", "gets none (row 307)": the effect (a `VerifyError`? a wrong value?) is not stated.
- "a planner's default": "planner" not defined in the skill; read as "not a curator decision".

## 18. F-405 (fact): walk's generic dotted methods of one name

**Established:** Walk runs a trait's or object's generic dotted methods of one name each as an instance at symbolic static arguments. An object keys each generic method of a name by the name and, per static parameter, its kind and bounds, "read up to the names of the method's own static parameters" (`Constructor.java`, `genericKey`): so an object's redeclaration of a trait's generic method at the same bounds under other parameter names hides it, and two with different bounds are overloads, except bounds that differ only in the api of a type of one simple name (row 1134). At load walk reads two such instances on their declared domains where one lies inside the other. A call with no static arguments infers them and dispatches among the instances, inner declared domain first; a call with static arguments instantiates each generic method whose static parameters (by number and kinds) take them and chooses among those by the arguments, as for a top-level generic function. An object that inherits two such methods of one name from two traits, neither more specific, with no declaration at their meet, loads and runs.

**Conditions:** Refused: a set whose overlap only a third method covers (row 1133); a nested pair of a generic trait's generic functional methods, at an extending object's first instance (row 780). Stops: a call on a receiver "assumed at the trait" (row 1126); where a plain method shares the name with a generic one, a call writing static arguments (row 744). Of two generic functional methods of one name and parameter count, the second is never chosen (row 1123).

**Consequence:** A worker can overload generic dotted methods by bounds under walk, but should avoid the listed shapes; renaming a static parameter in a redeclaration does not create an overload.

**Evidence:** Tests `tests/GenericMethodOverloadArity.fss`, `GenericMethodOverloadSetWalk.fss`, `GenericOverloadStaticArgKindsWalk.fss`, `GenericMethodBoundsDifferWalk.fss` (whose object `Both` pins row 1139's set as valid). Detail: `rung-walk-load-check-generic-numeral/REPORT.md`, "What changed and why" and "Programs run old against new"; `rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1.".

**Could not resolve:**
- Row 1139: the entry says the inherited pair "loads and runs, where the Meet Rule refuses the set (row 1139)", and then that the test "pins row 1139's set as valid". Two readings: the set breaks the Meet Rule and walk's loading it is a departure the test pins as current behaviour, or the set is valid and the Meet Rule (as checked elsewhere) is wrong to refuse it. Contradictory wording.
- "is refused ... at an extending object's first instance" (row 780) here vs. "stop at" (F-26) and "stops at" (F-174) for the same row: unclear whether this is a load refusal or a run-time stop.
- "read up to the names of the method's own static parameters": unclear wording; I read "up to" as "modulo renaming of", not "as far as".
- "a receiver assumed at the trait": unclear wording; I guess a receiver typed at the trait through `asif` (`compiler.md` speaks of "a call at an assumption"), but the entry does not say.
- "stops": the kind of failure (error at run time?) is not named.

## 19. F-407 (fact): a numeral coercion's four numbers convert where they stand

**Established:** Inside a numeral coercion's body, each of the four numbers (`n`, `m`, `r`, `v`) converts to the type its place fixes, on both paths, and is a `ZZ` where nothing fixes a type. Walk binds each as a static number with default `ZZ` (`Numerals.java`), converting like a folded constant and refused when the place runs if it does not fit. The checker types it `ZZ`, keeps `ZZ` at a call whose declaration takes `ZZ`, converts it where its place fixes a bounded number type (also in a result position of a join there), and refuses at the numeral's place a number that does not fit, for a coercion in the numeral's own component. The code generator converts from the `ZZ`. So `ZZ32`'s coercion can be `= v`, and a byte type's `Byte(v)`.

**Conditions:** Compiled-path departures: a non-fitting number in another component's coercion is not refused statically (row 1131); a number at a call runs the declaration that takes a `ZZ`, not a more specific one (row 1132).

**Consequence:** A worker writing a number type's coercion can use the four numbers directly as values of the target type.

**Evidence:** Builds P-174's rule for a coercion body, with P-173's conversion. Tests `tests/NumeralCoercionBodyWalk.fss`, `NumeralCoercionNumberRangeWalk.fss`, `NumeralCoercionNumberAtCallWalk.fss`, `compiler_tests/NumeralCoercionBodyCompiled`, `XXXNumeralCoercionNumberRangeCompiled.test`. Detail: `compile-ladder/rung-numeral-coercion-body/REPORT.md`, "What changed and why".

**Could not resolve:**
- "also in a result position of a join there": unclear wording; I cannot tell what join (of a conditional's arms?) and what "there" refers to.
- "bounded number type": as in F-342.

## 20. F-174 (fact): what the specification states about overloading with static parameters

**Established:** The specification (`Specification/advanced/overloading.tex`) states the type group's 2011 overloading model: declarations of one name may differ in their static parameters, and a generic declaration counts as one declaration over all its instances within its bounds. Section "Declarations with Static Parameters" states the OOPSLA 2011 paper's three rules (No Duplicates, Return Type, Meet), plus one restriction given as the compiled path's, not the language's: where one generic declaration is more specific than another with as many static parameters, both must declare them of the same kinds, position by position. Also, the more specific one's return type must be a subtype of the other's with static parameters matched by position, so the checker refuses an override whose return type reorders its static parameters (row 398, fixed). Section "Principles of Overloading" forbids overloading a functional whose single parameter's type is a type parameter with `extends Any` written; a type parameter with no `extends` clause is exempt. Both paths refuse such an overload (`OverloadingChecker.checkBoundAny`; walk since row 534's fix).

**Conditions:** Neither path runs every set the rules allow; Appendix I's entry "Overloading with static parameters" names them: row 1048 (checker refuses a generic beside a plain declaration over a tuple of object types), row 537 (code generator fails on two generics with different bounds), row 539 (walk refuses at load the 2019 paper's valid set over an array list and a list), rows 779/780 (walk on two generic functional methods with nested declared domains: refused at load in a trait/object without static parameters; "stops at an extending object's first instance" in a trait with them).

**Consequence:** A worker can cite the specification for the 2011 model and its three rules, must treat position-by-position kind matching as a compiled-path restriction, must not write `T extends Any` on a single-parameter overload, and should expect the listed rows to fail.

**Evidence:** States P-45 and P-42. Detail: `Specification/advanced/overloading.tex:134-150`, `:531-674`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 3, 4.

**Could not resolve:**
- "Also, the more specific one's return type must be a subtype ...": unclear whether this second requirement is part of the compiled path's restriction or a language rule.
- Row 539: here it is "the 2019 paper's valid set" and only walk is said to refuse it; P-45 says "both paths refuse the paper's own valid example (row 539)", where "the paper" reads as the 2011 paper. The entries disagree on which paper and which paths. Inconsistency between entries.
- "stops at an extending object's first instance": as in F-26 and F-405, refusal vs. run-time stop unclear.
- "a functional": I read it as a function or functional method; not blocking.

## 21. P-45 (position): overloaded declarations may differ in their static parameters

**Decided:** Overloads may differ in their static parameters. The specification drops its sentence forbidding this (kept as superseded text) and states the 2011 type-group paper's model, which the compiled checker already used. The checker keeps the paper's three rules (No Duplicates, Meet, Return Type) and checks the Return Type Rule over every instance the argument types allow, not one guessed instance. One rule of the old sentence survives: if one generic declaration is more specific than another, their static parameters must line up position by position (like Java's rule for overriding a generic method). Walk chooses among overloads by declared parameter types, not textual order. At load walk judges each pair of generic declarations by the checker's rules on their declared parameter types, and does not refuse a pair merely because no parameter types exclude (e.g. when one is more specific).

**Applies:** All overload sets, on both paths. The position-by-position rule is tested by the compiled checker only where the two declarations have as many static parameters of their own (F-75).

**Requires:** Walk and the checker must accept the same pairs. Overload sets that the checker refused are repaired by the library's own declarations; no line of microGPT's two programs may change.

**Unfinished:** Walk compares two functional methods of a generic trait or object on the call's instance (F-26); both paths refuse the paper's valid example (row 539); walk refuses two nested generic functional methods of a trait without static parameters, and stops at an extending object's first instance on such a pair in a generic trait (rows 779, 780); walk and the checker disagree on three kinds of pair (rows 786-788).

**Could not resolve:**
- "both paths refuse the paper's own valid example (row 539)" vs F-174's "the 2019 paper's valid set", refused by walk: which paper, and whether the checker also refuses it, is inconsistent between the entries.
- "The library repairs, by declarations of its own, the overload sets that the checker refused": present tense; two readings: a requirement on future library work, or a report that it is done. Unclear wording.
- "At load, walk judges each pair of two generic declarations": the entry speaks of two generics only, while F-26 and F-257 extend the reading to a generic beside a plain declaration. Whether the position covers that case is unclear.

## 22. P-60 (position): `comprises` is read at the level of values

**Decided:** `trait S comprises { U, V }` means every value of `S` is a value of `U` or `V`, so another trait may sit between `S` and its listed types. The specification defines "covers" once: a type covers another when every value of the second is a value of the first. The Meet Rule gains a case for closed traits: where it asks for a declaration at the meet of two overloads' parameter types, several declarations below both may serve if together they cover the meet. Consequently a call whose argument's static type lies between closed traits and their listed types may have several most specific declarations; its type is the intersection of their return types, and the one that runs is fixed only at run time.

**Applies:** Coverage is used by the compiled checker only in its overloading rules (accepting an overload set; justifying a call's tie), never in its general subtype test. The intersection typing is limited to ground declarations (types with no type variable; `G[\ZZ32\]` is ground) at calls needing no coercion, the scope of the proof addendum (`reviews/comprises-type-level-proof-addendum.md`). A declaration with static parameters is outside the proof (one instance would have to meet every return type at once), so the typing is not extended to it, and the specification states that boundary. A call needing a coercion is outside the proof too.

**Requires:** Do not use coverage in the subtype test; do not extend intersection typing to generic declarations or coercing calls without a review of its own.

**Unfinished:** Row 551: walk checks no `comprises` clause declared outside the main component. (F-76 lists the checker's own gaps.)

**Could not resolve:**
- "closed traits": as in F-76, not defined; read as traits with a `comprises` clause.
- "(F-76 gives what the compiled checker does there)": F-76 says only that it types ties "without coercion" by the intersection, and points to F-408 for other ties; F-76 itself does not say what happens at a coercing call. The pointer leads one entry further than stated.
- "Row 551": the entry does not say whether it is a gap this position asks to close or only a known limit.
- "one instance would have to meet every one of the return types at once": terse reasoning; I follow it only loosely. Not blocking.

## 23. P-174 (position): numeral types exist only at compile time

**Decided:** A numeral's type exists only at compile time: `NaturalNumeral`, or with a radix point `RadixPointNumeral`, below `Numeral` (from the Working Draft), with its numbers as static parameters. Every number type, the library's included, accepts a numeral through a coercion generic over those numbers. The four numbers are digit count `n`, digits after the radix point `m`, radix `r`, and the digits read as one integer `v`; `3.125` is `RadixPointNumeral[\4, 3, 10, 3125\]`. They are naturals of any size; the `NN32` bound of P-40 is for sizes only. A coercion's body is computed at compile time with no method invocation: a number used as a value converts where it stands (P-173) to the type its place fixes, and is refused statically if it does not fit (e.g. `Byte`'s `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v)`); where nothing fixes a type it is an exact `ZZ`. The body calls the type's constructor on values computed from the numbers (e.g. `Interval(roundDown(v, r, m), roundUp(v, r, m))`), and the compiler instantiates and folds it (P-176). No numeral value exists at run time: a numeral type has no getters, `asFloat`, `asString`, or `=` with a number type, and is written only as a coercion's or an operator's parameter type. A numeral has no sign: `-3` at a program's type is the type's own prefix `-` applied to the coercion's result for `3`, and a type without `-` refuses it. Any other expression of numerals alone folds first (P-173) and reaches such a type only through its coercion from the folded value's type (e.g. `QQ` for `1/2`), since coercions do not chain. The binary chapter's numeral coercion and `opr ||` are left out.

**Applies:** Every number type and every numeral, both paths. Replaces the implementations' `IntLiteral` (P-76) and `FloatLiteral` (P-172). Why: the Draft gives numerals their own types so library designers decide numerals' interaction by coercions (`literals.tex:132-148`).

**Requires:** Write each number type's numeral acceptance as such a coercion; never write a numeral type except as a coercion's or operator's parameter type; do not rely on a run-time numeral value; give a type a prefix `-` if it must accept negative numerals; do not chain coercions.

**Unfinished:** Walk loads a numeral type written as a static parameter's bound or a `typecase` arm's type (row 1135). On the compiled path, a number at a call in a coercion body runs the declaration taking a `ZZ`, not a more specific one its conversion reaches (row 1132); a numeral at another component's type whose coercion converts a non-fitting number is not refused statically (row 1131).

**Could not resolve:**
- "with no method invocation" vs. the body calling `roundDown`/`roundUp` and a constructor, and F-347's fold of "calls of functions and methods": unclear whether "method" here means dotted methods only, or whether F-347 contradicts it.
- "with its four numbers as static parameters" vs. `NaturalNumeral[\n, r, v\]`, which has three: unclear wording; I read the fourth (`m`) as present only for `RadixPointNumeral`.
- "written only as a coercion's or an operator's parameter type" vs. F-342's "only as a parameter's type": the entries differ on which parameters qualify.
- "this implementation's `NN32` bound (P-40) is for sizes": unclear wording; I read "the `NN32` bound on `nat` parameters applies to size parameters, not to the four numbers", but P-40 is not in this file.
- "the binary chapter": read as the specification's chapter on binary (bit) numbers; not blocking.

## Summary

| # | Entry | Verdict |
|---|---|---|
| 1 | F-26 | partly blocked: "stop at an extending object's first instance"; "api of a type of one simple name"; effect of sharing one symbolic instance |
| 2 | F-76 | mostly clear; "closed traits" undefined; "the checker's chosen declaration" for an intersection-typed value |
| 3 | F-225 | partly blocked: the `Containment` sentence ("takes a parameter bounded by..."); "lists the trait first"; "does not bind the one library" |
| 4 | F-232 | clear (tool names makeAST/ASTGen/PLT unknown, not blocking) |
| 5 | F-277 | blocked: "the second arrow", "at the top of the meet", "the reduction's constraint", "the full check", "generic scalar block", "vector pairs", `tint`, the 191/183/98 counts |
| 6 | F-334 | clear |
| 7 | F-342 | mostly clear; "bounded number type" undefined; row 963 status; "parameter's type" differs from P-174 |
| 8 | F-376 | partly blocked: "principal declaration" undefined; row 699 status; "by reading" |
| 9 | F-396 | mostly clear; "export check" undefined; "which is not its object" |
| 10 | F-408 | mostly clear; "kept by place" (which one); "the unit"; "judges" |
| 11 | F-409 | clear |
| 12 | F-139 | clear |
| 13 | F-257 | partly blocked: condition (b) "plain declaration inside ... excluding at object types alone"; "orders only for No Duplicates"; "not found" |
| 14 | F-341 | partly blocked: "a store keeps its default alone"; "else by its own type's coercions only, and reads a tie at the default"; `SEQV` |
| 15 | F-347 | mostly clear; "methods" in the fold vs P-174's "no method invocation" |
| 16 | F-366 | mostly clear; "the coercion chapter's relation"; "the declaration that fits has a numeral at a parameter" |
| 17 | F-377 | mostly clear; "at the conditional's type"; effect of the missing casts (rows 1070, 307) |
| 18 | F-405 | partly blocked: row 1139 contradictory (Meet Rule refuses vs. pinned as valid); refused vs. stops for row 780; "assumed at the trait" |
| 19 | F-407 | mostly clear; "a result position of a join there" |
| 20 | F-174 | mostly clear; row 539 disagrees with P-45 (paper, paths); scope of "Also" |
| 21 | P-45 | mostly clear; row 539 disagrees with F-174; "The library repairs" (done or required) |
| 22 | P-60 | clear; pointer to F-76 for coercing calls lands on F-408; row 551's status |
| 23 | P-174 | mostly clear; "no method invocation" vs F-347; "four numbers" vs three on `NaturalNumeral`; parameter-type scope vs F-342 |
