<!-- The clarity workflow's check of chunk f15 (facts): each rewritten entry against the record and its sources, and the cold reader's answers against the source meaning, with each failure classed. -->

# Chunk f15: check

Read: `proposals.md`, `clean.txt` (the same entry text as `proposals.apply`, checked with `diff`), `cold-read.md`, `assessment.md`, `concepts.md`; each entry as the record holds it (`facts-extract.sh 'F-N'`) and the history of F-159, F-165 and F-229; the cited report sections; the probes of `reviews/array-design-ways/probes/` at `84aef6a4f^` and `rung-spec-integer-rules/probes/examples/SpecZZExcl.*` at `9269f7bd2^`; ledger rows 331, 364, 394, 406, 407, 414, 485-490, 721, 722, 729; the library and specification lines named below. Nothing was run but read-only `git` and the record's queries.

One finding crosses entries: in F-159, F-165, F-172 and F-229 the rewrite keeps a sentence of the current entry that the sources contradict or that says more than they do. The assessment passed those sentences; following the sources the rewrite now cites shows them. Each is below, with its source.

## F-159

**Fidelity.**
- "A plain factory beside the generic one also worked compiled; walk's load check (F-27) was not run on that pair." Inside an entry now framed as "In probes of 2026-09-29", this reads as: the probes never ran the pair under walk. They did, and walk refused it at load: `WayASpec.walk.txt` at `84aef6a4f^`, "has a parameter with generic type, at least one pair of parameters must have excluding types"; report section 3, "Walk refuses the pair when it loads the program". F-27's check landed later (`8f7e183d4`, 2026-09-30, after the probes' base `6bc21c364` of 2026-09-29); the report's A2 says "whether it then takes this pair is not measured". The current entry says "has not been run", which is true of F-27's check; the past tense makes it read as false of the probes. The cold reader took it so: "Nobody ran walk's load-time overload check (F-27) on the plain-plus-generic pair".
- "Where walk infers the element type from a value, the library's factories use a witness of their result type instead (F-229)." Two problems. "The library's factories" is broader than F-229, which says this of `array1` and `array2` only; `array`, `primitiveArray` and the others still pass `__thrower[\E\]`, a witness of the element type (`Library/FortressLibrary.fss:2247`, `:2284`). And "Where ..." makes the reason a condition: the two factories take the result-type witness at every element type. The reader saw both readings.
- "Wrapped in the library's `cast`": on the compiled side the `cast` is the compiler prelude's (`Library/CompilerLibrary.fss:39`), since the compiled runs used that prelude, as the entry says. The report's own words, so not a change of meaning, but the reader asked which library.
- The rest holds: the trait, the two stores, the refusal "Function body has type OR(DStore,BStore[\T\]), but declared return type is Arr[\T\]" (`WayANoCast.compile.txt`), the outputs "RR64 DStore 1.5" and "ZZ32 BStore 7" (`WayACast.run.txt`, `.walk.txt`), the calls `mk[\RR64\](r)` with `r: RR64 = 1.5`, and no claim that the device throws at an inferred element type.

**Comprehension.** The reader's "Established" matches, except the plain factory (above). Unresolved: `cast`, `additiveIdentity`, `r`, what the body's type was checked against, "worked", the "Where ..." sentence, decision A.

**Class.**
- Uncertain fidelity, settled from the probe's walk capture and F-27's landing: wording. "A plain factory for `RR64` beside the generic one, called from generic code, was accepted by the compiled checker and dispatched to the plain declaration for `RR64`. Walk refused that pair at load; its present load check (F-27), which reads a generic declaration beside a plain one on declared domains, has not been run on it."
- Wording: "The library's `array1` and `array2` take a witness of their result type, not of the element type, for the reason F-229 gives."
- Wording: "... the compiled checker refused the body, whose type is the union `OR(DStore,BStore[\T\])`, against the declared result `Arr[\T\]`. With that branch's result passed through `cast[\Arr[\T\]\]`, as `additiveIdentity` does, it checked, and both paths gave `DStore` for `mk[\RR64\](r)`, with `r: RR64`, and `BStore` for `mk[\ZZ32\](z)`." (The cast wraps the branch's result, not the `typecase`; the reader read "the whole result passed through `cast`".)
- Wording: "It bears on array decision A, how a `double[]` store goes under a float vector, which is open (P-85)." (P-85's own words.)
- Concepts the reader lacked, for `references/library.md`: the witness `__thrower[\X\]`, a function of type `() -> X` that is never called, and what a `typecase` on it matches (report section 0 defines it so; the entry's "a value whose type carries the static argument" let the reader in F-229 look for a value of the result type); `cast[\T\](x)`; `additiveIdentity`'s shape, a branch per number type each returning through `cast` (`Library/FortressLibrary.fss:3375-3394`). `concepts.md` lists the witness and `cast`; add `additiveIdentity`'s shape.
- Not a failure: the reader's note that the dated title breaks `references/records.md:38` ("no dates"). The standard allows a historical measurement "explicitly scoped to that measurement" (`reviews/revival-record-synthesis.md:383`), and the assessment asked for the day. The skill's sentence and the standard disagree; that is for the orientation, not this entry.

## F-229

**Fidelity.**
- "Walk's `Int`, the type that walk infers for an integer value (row 364)": broader than the sources. `Int` is the class at which walk instantiates `T` from a `ZZ32` value, `ZZ32`'s one listed type (report section 1; `Library/FortressLibrary.fsi:532-534`, `comprises { Int }`; `FortressBuiltin.fsi:125`, `value object Int extends ZZ32`). Row 721: walk instantiates "at the classes of `ZZ64` and `RR64` values alike", which are not `Int`.
- "(F-151; row 721)" sits on the `Number` sentence. Row 721 is the `Int` case: under walk, at a `T` inferred from a value, the factories give a plain array "where the specification ... gives a vector" (NEGATIVE-VERIFIED, `XXXArrayInferredElementVectorWalk`). The split moved the row off its claim, and the `Int` sentence now reads as plain library behaviour, not a recorded walk gap. The reader guessed: "probably not what the user wants".
- "a witness of the element type would match `Int`, a type below `ZZ32`": inverted. The report: "`() -> Int` matches the arm `() -> ZZ32`, and the `ZZ32` vector is not an `Array1[\Int,0,3\]`" (section 4). The reader flagged it.
- "Gated ... for the compiled checker by the distance stage." The distance stage does not gate: "The gate reports the checker count in every batch, and the distance in phase 3. Neither turns the gate red" (`.claude/skills/coordinator/references/batch.md:50`; `tools/distance/run.sh` header, "a report-only stage"). The current entry has the same word; the rewrite makes it a gate of the compiled checker. The reader could not tell whether a refusal would fail the gate.
- The rest holds against `Library/FortressLibrary.fss:2582-2596`, `:2970-2983` and report sections 1, 3 and 4.

**Comprehension.** Matches the source, except the reader's reading of the distance stage and of `Int`'s result. Unresolved: `cast`, `additiveIdentity`, "the family's element bound", `AnyIntegral`, the witness, the inverted clause.

**Class.**
- Wording (pointer and scope): "Under walk, a type parameter inferred from a `ZZ32` value is `Int`, the one type that `ZZ32` comprises (row 364). It also gets a plain array, where the specification gives a vector (row 721): `Array1` and `Array2` are invariant, so a branch matches only its own number type exactly." The last clause is report section 1's.
- Wording: "The witness is of the result type because at `T = Int` a witness of the element type, `() -> Int`, would match the `ZZ32` branch, and the `cast` of the `ZZ32` vector to an array of `Int` would throw `CastError`, as `openRange` does (row 722)."
- Uncertain fidelity, settled by the coordinator's `batch.md:50`: wording. "Gated under walk by `tests/ArrayFactoryNumberTypes` and `ArrayFactoryAbstractNumber`. The distance stage measures the compiled checker's acceptance; it reports and does not turn the gate red."
- Wording: "under the element bound `T extends { Number, MultiplicativeRing[\T\] }` of `Vector` and `Matrix` (F-151)".
- Concepts the reader lacked: walk's `Int`, for the `fortress-repo` core's bullet "Numbers are siblings, not a tower", since without it "a type below `ZZ32`" contradicts that bullet (`concepts.md` proposes `references/interpreter.md`; `Int` is a type of the api, so the core's bullet is the better home); `AnyIntegral`, `cast`, the witness and `additiveIdentity`'s shape, for `references/library.md`; that the distance stage reports and never turns the gate red, for the core's glossary entry "distance".

## F-162

**Fidelity.** Holds: `Specification/library/structure.tex:25-31`; `Specification/fortress/build.xml:128-156` runs `fortex` over `library.api.home` and `library.builtin.home` and moves the results into `library.api`; `Specification/library/` holds no `apis/`; `references/specification.md:13`.

**Comprehension.** Matches.

**Class.** Pass.

## F-163

**Fidelity.** Holds. `git diff --quiet 2f8b4331a:Specification c02fa44d0:Specification-1.0-frozen` exits 0; `2f8b4331a` is dated 2011-02-02. `Specification-1.0-frozen/appendices/changes.tex` is 16 lines, a note pointing to a changeset; `Specification/appendices/changes.tex` is 4,149 lines. "The one to search and change" agrees with `references/specification.md:5-6` ("Leave this copy unchanged").

**Comprehension.** Matches. The reader inferred that `2f8b4331a` is the team's commit of 2011-02-02.

**Class.** Pass. Optional wording: "`git diff --quiet 2f8b4331a:Specification c02fa44d0:Specification-1.0-frozen`, the team's last commit of the draft (2011-02-02) against the copy, succeeds."

## F-165

**Fidelity.**
- "One running piece stays, the `FTypeArrayList` fix for the JDK 8 `TreeSet` crash; `lineage.md` lists the rest for removal." The section that the rewrite now cites for "the removal list" says otherwise: "Removable with no behaviour change, for the cleaner pass: the `FTypeArrayList` fix replaced by `clean-ladder`'s two lines, the dead jars, the Atom package, `global.map` ..., the dead `build.xml` lines, the cosmetic edits; untracking the generated sources changes the workflow" (`coordinator/lineage.md`, "Verification ...", "Verdict"). So the list holds the fix too, by replacement, and does not hold the generated sources as removable. The earlier text said so ("which `clean-ladder` makes in two lines ...; `lineage.md` lists them for removal", FACTS-history.md:1435); the consolidation's cut changed it, and the rewrite keeps the cut. The reader concluded the opposite of the source: "The `FTypeArrayList` fix is load-bearing, so do not remove it."
- The rest holds against "The facts" and the assessment's ancestry checks.

**Comprehension.** Differs on the fix, for the reason above. The reader also could not tell whether the removal is decided: it is the cleaner pass of `main`, parked (PLAN, "Off the path, parked", the housekeeping line).

**Class.** Uncertain fidelity, settled by `lineage.md`'s verdict: wording. "Of the port's code, only the `FTypeArrayList` fix for the JDK 8 `TreeSet` crash still runs. `lineage.md` lists what can go with no change of behaviour, for the cleaner pass that PLAN parks: that fix, replaced by `clean-ladder`'s two-line repair, and the port's dead jars, dead files and cosmetic edits."

## F-166

**Fidelity.** Holds against `coordinator/spec-lineage.md` section 6 and its "Coordinator's check (2026-09-26)", with one carried breadth. "On static parameters, traits, exceptions, components and the numeric library, `Specification/` is the only statement": the coordinator's check corrects section 6, since `types.tick:320-339` and `:353-376` restate the exclusion rule and add `covariant`, which are static-parameter topics; and section 6 says "traits and objects beyond a stub", so the restart has a stub. The title's "on the topics of its Types chapter" covers the first in part; the reader saw the blur.

**Comprehension.** Matches, with two open points that the record settles elsewhere: what weight "latest word" carries, and whether `covariant` is due. Section 6 itself says that the reading "does not by itself say which text should govern"; P-25 says how a worker cites the chapter and that `covariant` is future work (P-62).

**Class.** Wording.
- "On the rest of static parameters, and on traits beyond a stub, exceptions, components and the numeric library, `Specification/` is the only statement."
- Add the pointer with its few words: "Which text governs is the curator's: `Specification/` stays the standard, the Types chapter is cited beside it, and `covariant` is future work (P-25)."

## F-?1 (split from F-166)

**Fidelity.** Holds against `research/extracts/ParkPOPL2019-extract.md` section 6 ("Method type parameters may not appear in upper bounds, so F-bounded method parameters are outside the calculus (p. 11:11)"; "Functional methods and top-level functions ... are out", pp. 11:3, 11:25) and section 8 (the instance where the value does not fix it: "the intersection of the upper bounds", p. 11:19, which is P-48's rule). The added limit is in the source, and the entry keeps the trait parameters, which the paper admits F-bounded, outside its claim.

**Comprehension.** Matches. Unresolved: what P-48's rule is.

**Class.** Wording (a pointer with its few words): "gives P-48's instance rule, by which a type parameter that a call's arguments do not fix takes the intersection of its upper bounds". The number F-?1 is for the coordinator to assign.

## F-167

**Fidelity.**
- Title, "each example that the rule refuses now shows the library's shape beside it", and body, "The refused examples include ... a subtrait of every instantiation ... Each stays, marked "Not allowed", beside the library's shape". A subtrait of every instantiation (E2) has no library shape beside it: it is "kept as the counterexample that introduces the rule, with the sentence that it is not allowed and why" (`rung-spec-route-a/decision-record.md` section 1, item 2; section 3.4; `Specification/basic/trait-parameters.tex:460-491`). The internal appendix's refused examples (E8, E10) get a callout each, no shape (section 3.8). The current entry was as broad ("its refused examples are the library's shapes"); naming E2 in the list makes the claim false of a named example. P-97, the curator's decision, is worded as broadly, but this is a fact about the text.
- The rest holds: the rule (`types-vals-vars.tex:242`, `traits.tex:381`), the `where`-clause sentence (`trait-parameters.tex:397-398`), the four calculi's callouts (section 4.2, "Decided 2026-09-26"), rows 331, 406 and 414 as described.

**Comprehension.** Matches, except "the root's algebra", which the reader could not resolve, and "one of whose arguments", which the reader read correctly but called ambiguous.

**Class.**
- Uncertain fidelity, settled by the decision record's sections 3.4 and 3.8: wording. Title: "The specification states instantiation exclusion and keeps each example that the rule refuses, marked "Not allowed"; the calculi of Appendix A carry a callout that they predate the rule." Body: "The covariance example, the empty list, the empty optional value and the root type `Object`'s algebraic supertraits each stand beside the library's shape, which runs on both paths except `Nothing[\String\]` on the compiled prelude (row 331). A subtrait of every instantiation stays as the counterexample that introduces the rule, and the internal appendix's refused examples get a callout each."
- Wording: "... and one that extends two instantiations of one trait where one instantiation's argument is the object's own static parameter, such as `O[\nat n\] extends { Vec[\n\], Vec[\3\] }` (row 414)." (Row 414's example.)

## F-168

**Fidelity.** Holds against `rung-spec-numbers/decision-record.md` section 3, `Specification/basic-lib/numbers.tex:31-56`, `:224-229`, P-74 and P-80. The two changes of meaning are supported: the negative power is in the specification since `5ad4a9957` (`basic-integers.tex:534-537`), and no number chapter names `SUM` or `PROD` (`grep`); the reductions callout (`basic/expressions/reductions.tex:27-`) is outside them, so dropping "The chapters state P-78" removes an unsupported claim.

**Comprehension.** Matches. Two small open points: whether the advanced chapter carries a mark, and which four traits.

**Class.** Pass. Optional wording: "stays word for word under a callout that marks it superseded (`numbers-advanced.tex:14`)"; "`QQ` extends the four algebraic traits that the library declares on it, `StandardPartialOrder`, `StandardMinMax`, `AdditiveGroup` and `MultiplicativeRing`".

## F-169

**Fidelity.** "It described numeral types, such as `NaturalNumeral[\n,10,v\]`, but did not relate them to the number types." The writer added this sentence, and its second half says more than the Working Draft supports. The Working Draft does relate numerals to the number types, through the libraries: "Numerals are not directly converted to any of the number types ... \Library\ define coercions from numerals to integers (for simple numerals) and rational numbers (for compound numerals)" (`Specification-1.0-frozen/basic/expressions/literals.tex:132-148`). What it leaves undescribed, by its own note, is the numeral types' hierarchy and "their relations to each other" (`:87-96`), and it names no type that a library gives a numeral (`Specification/basic/expressions/literals.tex:154-156`). The title and the rest hold (evidence-B sections 1.1, 1.2, 1.4 and 2).

**Comprehension.** Matches the entry, so the reader took the overstatement as given.

**Class.** Uncertain fidelity, settled by the frozen `literals.tex`: wording. "It described numeral types, such as `NaturalNumeral[\n,10,v\]`, and said that libraries define coercions from numerals to integers and rationals, but a note of its own leaves the numeral types' hierarchy undescribed, and it names no type that a library declares for a numeral."

## F-170

**Fidelity.** Holds against `Specification/basic/expressions/ranges.tex:42-58` and `:88-109`, row 485 (FIXED) and F-114. The sentence on walk's `nat` at an `NN32` binding is still held by row 486 and P-76's walk gaps, so moving it out loses nothing from the record.

**Comprehension.** Matches. The reader read "a range's ℤ32 components" as its bounds, and noted the clash with the skill's term "component" (a unit of Fortress code).

**Class.** Wording (minor): "An integer numeral, and a `nat` or `int` parameter, used as an operand of an explicit range, such as `a` or `n` in `a#n`, converts to ℤ32 (row 485, fixed). An operand of any other integer type is a static error."

## F-171

**Fidelity.** Holds against `Specification/basic/traits.tex:235-258`, the decision record's section 2 and rows 407, 487, 489 and 490, with one carried omission: the text has two ways for an extender to go unlisted, a trait with a `comprises` clause of its own whose listed types meet the requirement, and a trait with static parameters under the stated condition (`traits.tex:247-255`). The entry gives only the second, so the reader asked whether a trait without static parameters must be listed.

**Comprehension.** Matches, except the open question above. The reader's "must not list a bare type variable" reads more than the entry says (the text is silent; walk overflows), but the entry is clear.

**Class.** Wording: "A trait or object that extends the closed trait must be below a listed type, unless it is a trait with a `comprises` clause of its own whose listed types are, or a trait with static parameters that at least one type extends and whose every extender is below a listed type."

## F-172

**Fidelity.**
- "A fixed-size result that the type cannot hold throws `IntegerOverflow`." Broader than the source, and contradicted by the same chapter for two of the rules the entry names: "`narrow` ... any other wraps, and no `IntegerOverflow` is thrown"; `LSHIFT` on a fixed-size type: "the bits shifted out are lost, and no `IntegerOverflow` is thrown" (`Specification/basic-lib/basic-integers.tex:39-62`). In the decision record the sentence is the `GCD` and `LCM` rule (section 2's table, "a `GCD` or `LCM` that the fixed-size type cannot hold throws `IntegerOverflow`"; `Specification/basic/operators/opr-overview.tex:262-268`). The current entry has the same sentence. The reader concluded "Expect `IntegerOverflow` rather than wrap-around on fixed-size results", which is wrong for `narrow` and `LSHIFT`.
- The negative power holds against `basic-integers.tex:534-537`.

**Comprehension.** Differs on overflow, for the reason above. Unresolved: what `narrow`, `LSHIFT`/`RSHIFT` and `shift` do, and whether walk's power agrees (F-263: it does; the compiled path's own library does not, row 441).

**Class.**
- Uncertain fidelity, settled by `basic-integers.tex:39-62` and the decision record's table: wording. "`narrow` keeps a value's low 32 bits, and `LSHIFT` on a fixed-size type loses the bits shifted out; neither throws. On `ZZ`, `LSHIFT` and `RSHIFT` are `shift`, which is exact at any count. `GCD` and `LCM` are nonnegative, and one that a fixed-size type cannot hold throws `IntegerOverflow`, by the specification's rule for integer results."
- Wording (a pointer with its few words): "The library follows the same power rule under walk; the compiled path's own library does not (F-263)."

## F-?2 (split from F-172)

**Fidelity.**
- "Under walk, `tests/CoercionMostSpecificRungC.fss` gates it (row 394, fixed)." Says more than the source. The test is not the example: it declares `Small`, `Mid` and `Big`, each excluding both others (`ProjectFortress/tests/CoercionMostSpecificRungC.fss:6-15`), the spelling that decision 6 rejects as option (b), "each trait listing both others", and its assertions cite row 19, walk's coercion resolution. It is row 394's listed reproducer, of the shape, not the printed example. The current entry did not name a test; the assessment said only that the test "runs under walk", and the rewrite made it a gate of the example.
- "Detail: ... section 2, decision 6": decision 6 is in section 4, "Decisions taken inside the rung" (`decision-record.md:37`, `:44`), not in section 2. The current entry and the assessment cite section 2 too.
- "the revised example ran as printed on both paths, `f(S32Of) = 1`": the record's words, but the probe renamed the types `S32`, `S64` and `S128`, "since ZZ32 and ZZ64 are the libraries' own" (`SpecZZExcl.fss` at `9269f7bd2^`). Without that, `S32Of` has no referent; the reader asked.
- The rest holds: the two clauses (`conversions-coercions.tex:579-590`, decision 6), rejection and "no less specific" (`:502-516`).

**Comprehension.** The reader took the walk test as a gate of the example (from the entry), could not tell whether `ZZ128` and the others are the library's types (they are the example's own traits), and lacked "rejection".

**Class.**
- Uncertain fidelity, settled by the test file and decision 6: wording. "No gated test runs the printed example. Row 394, fixed, names `tests/CoercionMostSpecificRungC.fss`, a walk test of the choice of the more specific coercion over three traits of the example's shape, each of which excludes both others."
- Wording (route): "Detail: `compile-ladder/rung-spec-integer-rules/decision-record.md` section 4, decision 6".
- Wording: "The example declares its own traits `ZZ32`, `ZZ64` and `ZZ128`. In the rung's probe, with them renamed `S32`, `S64` and `S128` since the first two are the library's, the revised example ran on both paths and `f(S32Of)`, on an `S32` value, chose `f` on `S64`, giving 1."
- A concept the reader lacked that belongs to this entry alone (no other FACTS or POSITIONS entry names it): define it in the entry. "A type `T` rejects `U` when every type that coerces to `T` excludes `U`; `T` is no less specific than `U` when it is a subtype of `U`, or excludes, coerces to and rejects it (`conversions-coercions.tex:502-516`)." `concepts.md` proposes `references/specification.md`; the entry is enough until a second entry needs it.

## The concepts list

`concepts.md` holds the right terms, with four changes from this check:
- Walk's `Int` belongs in the core's bullet "Numbers are siblings, not a tower", not `references/interpreter.md`: `ZZ32 comprises { Int }` and `value object Int extends ZZ32` are api declarations, and walk instantiates a type parameter at `Int` from a `ZZ32` value (row 364).
- Add to the core's glossary entry "distance": the stage reports, and neither it nor the checker count turns the gate red (`.claude/skills/coordinator/references/batch.md:50`).
- Add to `references/library.md`, beside the witness and `cast`: `additiveIdentity`'s shape; that a `typecase` on `__thrower[\X\]` matches a branch `() -> Y` when `X` is below `Y`, so an invariant result type matches only exactly; and `AnyIntegral`.
- Rejection moves from the list into F-?2 (above).
