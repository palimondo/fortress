# Climb batch N, run 1: the judge's ruling on the merged-diff review

Written 2026-09-29 on `main` at `bd200b4ce`, which holds rung I's landing `8dc1a74d9`, rung K's `041682188`, rung T's `f54ffac90`, rung M's `2770550c3` and the review's corrections. The review refused approval with two blocking findings, row 516 and row 325. This ruling reads the merged tree, the review's result, the gather's record (`explorations/compile-ladder/climb-batch-N/RECORD.md`), the four rungs' reports, skeptics and records, and the briefing slices the judge's brief names. It runs nothing: every measurement cited is a capture already committed.

**Decision: repair.** Both findings hold, and both are repaired now, by tests and records only:
- **Row 516.** The decisions settle it, for the chapter's union: the specification's text stays, and each implementation gets its gated expected failure, `ProjectFortress/compiler_tests/XXXInferLoneBoundUnion` (the checker, a written bound) and `ProjectFortress/tests/XXXInferLoneUnionWalk.fss` (walk, no bound). The row is re-filed from home 3 to home 2.
- **Row 325.** The two faces the specification settles get the two-file pair each: `XXXNumeralBeyondWidthMax` (the `MAX` face, rung M's skeptic) and `XXXNumeralBeyondZZ32Range` (a numeral beyond ℤ32 as a range component, rung T's skeptic), each with its `…Link.test`. The third face, a `nat` size beyond ℤ32 used as a range component, stays home 3, for the reason in section 2.3.

No source file, library file or line of `Specification/` changes, so `Specification/fortress.pdf` is not rebuilt and no citation moves. Six tests are added: five `.test` files in `compiler_tests/` (877 to 882) and one file in `tests/`. The gate that is running beside this ruling does not include them; the push waits for a gate that does (section 4).

## 1. Row 516: a lone type parameter's candidates

### 1.1 What is measured

- The chapter: a type parameter that is the whole declared type of parameters, fixed by nothing else, takes "among the types of the arguments at those positions and the types to which they can be coerced, the narrowest under ⪯ … that every one of those arguments is substitutable for … and that the bounds of the type parameter permit"; where there is none, "the union of the types of those arguments …, if its bounds permit that, and none of those arguments is converted" (`Specification/basic/inference.tex:83-98`).
- Rung I's checker tries the arguments' types, the types they coerce to and "its declared bound when that is a plain trait type other than `Object` or `Any`" (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:336-343`; `explorations/compile-ladder/rung-inference-checker/REPORT.md:89`). It does so in promote mode whenever the first attempt, by subtyping, has bound a union (`Functionals.scala:344-349`), so the bound replaces the union whenever it admits every argument.
- Rung K's walk tries every supertype of each argument's run-time type, the coercion targets and the bounds (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:259-261`; `explorations/compile-ladder/rung-inference-walk/REPORT.md:140-151`, decision B).
- On the merged tree, `pick[\T extends Number\](w, r)` for a `ZZ64` and an `RR64` is a `BoxT[\Number\]` compiled and under walk; `g[\T extends Number\](w, r, z)` is a `BoxT[\Number\]` compiled; the unbounded `pick0(w, r)` is `BoxT[\OR(ZZ64,RR64)\]` compiled (`explorations/compile-ladder/climb-batch-N/merged-tests/both-GatherStmt5-IK.txt`, `s1`, `s2`, `s5`). Walk runs the unbounded `pickK(l, r)` at `Number`, nothing converted (`rung-inference-walk/REPORT.md:147-151`; `ProjectFortress/tests/InferCoercionRungK.fss:47`).

### 1.2 What settles it

The specification and the decisions settle it, for the union. The point at issue is not silent.

- **Decision 1** (POSITIONS 2026-09-28, the two decisions of the conversion judgement, "Both recommendations for batch N accepted") adopts the judgement's Instantiation: "a static parameter takes the narrowest type, under `⪯`, that every argument constraining it is substitutable for …, its bounds permitting; for number arguments this is the narrowest type every one of them converts into (answer 8)" (`explorations/reviews/conversion-overloading-judgement.md:113`). The bound *permits*; the sentence does not make it a candidate.
- **The union is a type, and it is the narrower one.** "There is also a type denoting a unique union of those types … they are used solely for type inference (as described in \chapref{type-inference})" (`Specification/basic/types-vals-vars.tex:572-580`, the Working Draft's own text). `T ⪯ U` holds when `T` is a subtype of `U` (`Specification/basic/conversions-coercions.tex:494-501`). Every argument that a bound admits is a subtype of it, so their union is a subtype of the bound and no less specific than it. Wherever the union is permitted, the bound is not the narrowest type, unless it equals the union. So a bound taken as a candidate changes the answer in exactly one case, the case of row 516, and there it gives a wider type than decision 1 permits.
- **Answer 8 is not in play** (POSITIONS 2026-09-26): `ZZ64` into `RR64` stays explicit, so no named type holds both a `ZZ64` and an `RR64` by conversion. The number case does not reach this pair.
- **The chapter states exactly this.** Its named candidate set is needed for another reason, answer 8's `ZZ64` for a `ZZ32` with an `NN32`: there `ZZ64` and `OR(ZZ32,NN32)` are incomparable under ⪯, because `ZZ64` is no subtype of that union and nothing coerces into a union. With the named set, the union becomes the fallback (`inference.tex:95-98`), which is decision 1 read over every type wherever that reading gives an answer.
- **The batch record's words** for rung T, "taking the narrowest of its arguments' types and its bound" (`explorations/coordinator/CLIMB-BATCH-N.md:245`), repeat its description of the shadow's device (`:113`). They are the record's paraphrase of the shadow, not a decision of Pavol's. Where a record's paraphrase and the decision's own words differ, the decision governs. The same sentence also bounds T by "as far as rung I builds it and no further". That is the reserved stop the review lists as met, and it is lifted by POSITIONS 2026-09-27, the stops.

### 1.3 The claims

- **The review, right:**
  - on the three candidate sets, and on the measurements;
  - that home 3 is only for a silent specification;
  - that the landed text is normative, so both implementations contradict it, and neither has a gated test.
  - Its option (b) is the ruling.
- **The review's option (a), rejected.** Naming "a declared bound" among the candidates would write the shadow's device into the specification against decision 1's words. The written bound would then widen the instance: `pick[\T extends Number\](w, r)` would give `Number`, while `pick[\T\](w, r)` gives the union for the same arguments. Rung I's own exclusion of `Object` and `Any` by name (`Functionals.scala:338-340`) shows the rule needs a carve-out to keep the unbounded case at the union. It would also cost a `Specification/` edit, a rebuild and the re-anchoring of every test citation of `inference.tex` below `:89`. And walk would still diverge in the unbounded case.
- **Rung T's decision 4, right in its outcome, wrong in two premises** (`explorations/compile-ladder/rung-spec-inference/decision-record.md` section 5, decision 4):
  - It says that the checker's first attempt keeps the union and that the attempt which tries the bound never runs for this shape. On the merged tree, rung I's promote mode reruns every union binding with the bound among the candidates (`Functionals.scala:344-349`).
  - It says that a `ZZ32` and a `ZZ64` have no narrowest type when the reading runs over every type. They do: `ZZ64` is a subtype of `OR(ZZ32,ZZ64)`, so it is ⪯ the union by ⪯'s subtype disjunct (`conversions-coercions.tex:498-501`). The pair where that reading fails is a `ZZ32` with an `NN32`.
  - The text it chose is still the one decision 1 gives.
- **The gather, wrong** that "the decisions do not settle it" (`climb-batch-N/RECORD.md:154`; ledger row 516's class and home 3). It was right to leave the text alone and to report the row as blocking.
- **Rung I and rung K, right** about what their code does (`rung-inference-checker/REPORT.md:89`, `:148`; `rung-inference-walk/REPORT.md:140-151`). Neither code is what the chapter states.
- **Walk's cause is deeper than rung K's candidate set.** Walk's type lattice has no union: `FType.join` returns the named minimal common supertypes (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:350-380`), and `TypeLatticeOps.join` requires a single one (`types/TypeLatticeOps.java:30-35`). So walk's fallback unification also binds a named common supertype, and on the base `pickK(l, r)` printed the same values (`rung-inference-walk/probes/shapes-base.txt:38`). Walk reaches the chapter only once it has union types and its candidates drop the supertypes.

### 1.4 Why the implementations are not repaired now

This was a decision. The alternative was to repair rung I in this round:
- drop the bound from `named` (`Functionals.scala:336-343`);
- add a union fallback to the coercion attempt, tried only after the named candidates and the numeral tie find none, so that answer 8's `ZZ32` with `NN32` keeps `ZZ64`.

The two edits must go together. Dropping the bound alone makes the checker refuse `g(w, r, z)` (`both-GatherStmt5-IK.txt`, `s2`), extending row 515 to a bounded parameter.

Rejected for this run, for three reasons:
- It is a change to the checker's instantiation after the gate. It needs a full `ant compileAll`, rung I's tests and the count and distance stages again, then a second gate.
- No library, demo or microGPT call reaches the shape. The difference is the static argument of an instance, not a value (row 516's notes).
- Row 515, which the same edit closes, is already home 2 (`ProjectFortress/compiler_tests/XXXInferUnionCoercedArg.fss`).

Walk's half needs a union type in walk's lattice, which no rung of this batch owns. So both halves are home 2: deferred, and settled by the specification.

**The tests.**
- The checker's test pins the bounded case. Its program is refused today because the two instances differ, and it is accepted once the checker gives the union.
- Walk's test pins the unbounded case, through a `typecase` on the instance, in the form of `ProjectFortress/tests/XXXDispatchRenamedArmWalkRungG.fss:19-22`.
- Each is shown red on a stand-in. The checker's stand-in calls the unbounded `pick0` in place of `pick`. Walk's writes the static argument `[\Any\]`, as the gather showed rung T's expected failures (`merged-tests/junit-T-standin.txt`, `walk-T-placed.txt`).

**One text point is left.** The interpreter's callout says walk "applies the same rule at dispatch", and lists what walk does not yet do (`inference.tex:149-160`). It does not say that walk binds a named common supertype where the rule gives a union.
- It is the revival's callout, not normative text.
- Adding the sentence now would cost a rebuild and move every test citation of the chapter below `:160`.
- It is recorded as a text point for the next rung that edits `inference.tex`, in the ledger and in the parked line.

## 2. Row 325: the faces this batch measured

### 2.1 Owed in this batch

Rung M's skeptic measured two faces on the compiled path, each compiling and then dying with the uncatchable `java.lang.Error`:
- `z MAX 3000000000` for a `ZZ32`, "Not in range for ZZ32: 3000000000";
- `w MAX 100000000000000000000` for a `ZZ64`, "Not in range for ZZ64".

The captures are `explorations/compile-ladder/rung-integer-minmax/probes/skeptic/compiled-out/CNumeralBigZZ32.txt` and `CNumeralHugeZZ64.txt`, re-measured on the merged tree (`merged-tests/both-M-skeptic-rows.txt`).

Rung T's skeptic measured two more:
- `seq(n#2)` with `bigFirst[\3000000000\]()`, a size above ℤ32;
- `seq(3000000000#2)`, the numeral itself.

Both are in `explorations/compile-ladder/rung-spec-inference/probes/skeptic/SkRange-base.txt:17`, `:70`.

The ruling of batches 6b, 7R and 7C puts a settled defect's gated test in the batch that measures it (`explorations/reviews/batch-7C-review.md:159`, `:179`). Earlier skeptics re-measured the row without adding one. That is the same slip, and it is no precedent. The row may not stand without a test where the specification settles a face this batch measured.

### 2.2 What the specification settles, face by face

- **The `MAX` face: `3000000000 : ZZ64` and `100000000000000000000 : ZZ`.**
  - A numeral's type carries its value (`Specification/basic/expressions/literals.tex:83-86`), and "Libraries define coercions from numerals to integers" (`:146-148`).
  - Read as a type-directed conversion, a numeral converts only into a type that holds its value. `ZZ32`'s `MAX` is then not applicable to `3000000000`, and the coercion chapter's resolution chooses `ZZ64`'s (`Specification/basic/conversions-coercions.tex:533-553`).
  - That is walk's answer (`rung-integer-minmax/probes/skeptic/walk-edit/NumeralBigZZ32.txt`, `NumeralHugeZZ64.txt`) and the magnitude reading of the numeral rule in decision 1.
  - The other reading, that the conversion is a static error, is row 325's own for a binding with one target. The pair gates that reading too, because its link test goes red if the checker refuses the program.
  - No reading gives what the compiled path does: a clean compile, then a run-time `java.lang.Error`.
- **The numeral range face: a static error.**
  - The components of an explicit range are ℤ32, "An integer numeral converts to ℤ32", and "it is a static error if any other component … has an integer type other than ℤ32" (`Specification/basic/expressions/ranges.tex:43-49`).
  - `3000000000` does not convert to ℤ32 (the reading above), so the range is refused statically.
  - The pair's link test is what goes red on that repair. The XXX run test goes red on any change that makes the program run, which the specification does not give either.

### 2.3 The `nat` size face stays home 3

Pavol's decision on a size used as a value says that it "converts to ℤ32 as a numeral does" (POSITIONS 2026-09-28, a size used as a value; `ranges.tex:44-47`). Neither the decision nor the specification says where an instance whose size its use cannot hold is refused. There are three possibilities:
- at the generic declaration, which would make every range bounded by a `nat` parameter an error without a `where` clause, against the specification's own ranges (row 485);
- at the instantiation, which the checker, checking a generic once, has no place for;
- at run time, as a catchable error.

That is silence on the exact point, so the face keeps its note on row 325 and its committed probe (`rung-spec-inference/probes/skeptic/SkRangeBig.fss`, `SkRange-base.txt:17`), and the note says why. Walk's own answer there, "Negative nats are unNATural: -1294967296" (`SkRange-base.txt:3-5`), shows that walk carries a size above 2^31 wrapped. The repair records it in the same note.

### 2.4 The form

The form is two `.test` files over one component: a plain link test and an `XXX` run test with `run_out_contains=REACHED` (FACTS.md, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only, and a run-time defect needs two `.test` files"). This batch's own pairs have the same form (`ProjectFortress/compiler_tests/InferContextKeepsFitLink.test`, `XXXInferContextKeepsFit.test`).

An `XXX` compile test cannot express either face, because both programs compile today. FACTS.md, "An `XXX` compile test pinned by `compile_err_contains` whose program compiles is reported as a wrong failure, not a missing one".

## 3. What the repair does not do

- It edits no source, library or specification file.
- It changes no assertion of an existing test.
- It meets none of the reserved stops.
- It opens no row: 516 is re-filed, and 515 and 325 gain notes and evidence.
- Every stop the review listed stays listed as it is.

## 4. The gate

The five new `.test` files and the walk file are outside the gate now running. The repair shows each of them through the harness on the merged tree, placed and on its stand-in. The coordinator's gate must then include them before the push:
- `ant testFast` with 882 compiler tests;
- `ant testSystem` with one more interpreter file.

The gate's checker count and distance are unaffected, since neither stage reads a test (`explorations/coordinator/tools/checker-count/run.sh:1-9`).

## 5. For Pavol, out of the loop

- **Row 516, the judge's reading of decision 1.** The lone parameter takes the union where no named candidate is narrowest (the chapter, `inference.tex:83-98`), not a written bound (rung I, the shadow, the record's words at `CLIMB-BATCH-N.md:245`) and not a common supertype (rung K). The reading rests on decision 1's "narrowest …, its bounds permitting" and on the Working Draft's union types.
  - Both implementations stay as landed, each with its gated expected failure.
  - Reversible. If he prefers the bound, `inference.tex:89-98` gains "and a bound written in its declaration" and `XXXInferLoneBoundUnion` is deleted, while walk's unbounded test stands.
- **Row 325, a decision under partial silence.** The `MAX` test asserts `ZZ64` by the reading that a numeral converts only into a type holding its value. The static-error reading would turn the link test red instead. The `nat` size face stays home 3, because nothing says where such an instance is refused.
- **A text point.** The interpreter's callout at `inference.tex:149-160` does not yet say that walk binds a named common supertype where the rule gives a union. It is left for the next rung that edits the chapter.
