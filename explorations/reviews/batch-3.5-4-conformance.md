<!-- Conformance review of climb batches 3.5 (rung B ce0c7f453, rung I d6faad28f, the merged-diff review's repair c9faa7df4) and 4 (rung C b628871a2, rung N 3f297441c, rung K 57600bc27, rung O's record 488b47934), asked for by Pavol on 2026-09-27 in the form of batch 5's review of the same day; written by a review worker reading only, on main at 595c5fdec, nothing built or run. -->

# Climb batches 3.5 and 4 against the specification, the team's built intent, the design record and the plan

## Method

The method is batch 5's review (`explorations/reviews/batch-5-conformance.md`, `fb701ff2e` on the branch `review-batch-5`), which is the method of `explorations/reviews/rung-conformance-1-4.md` with global questions added. For each rung:
- `git show <hash>` first, then its `REPORT.md`, `record.md`, `SKEPTIC.md` and `JUDGE.md`, and the batch records (`explorations/coordinator/CLIMB-BATCH-3.5.md` with `explorations/compile-ladder/climb-batch-3.5/RECORD.md`, `JUDGE-review.md` and `REPAIR-review.md`; `explorations/coordinator/CLIMB-BATCH-4.md` with `explorations/compile-ladder/climb-batch-4/RECORD.md`);
- then the landed code as it stands on `main` at `595c5fdec`, after batch 5 and batch 6's rungs F and T;
- then the specification and the team's own code the rung touches.

Each rung is judged against three standards, kept apart: the specification (`Specification/`); the team's built intent (the library's practice, the two paths as the team left them, their drafts); the design record outside the specification (`explorations/coordinator/map/design-intent-sources.md`, Pavol's principles in `explorations/coordinator/POSITIONS.md`).

Then the global questions:
- Was a choice made inside the rung that was Pavol's?
- Does the rung conflict with a later phase of `explorations/coordinator/PLAN.md` (the checker at a true zero, the switch-over, microGPT's static types and the array design, unboxing) or with a decision he made since?
- Is anything built twice, or built so that a later phase must undo it?
- Did the rung use the library's own way for the same family, or a local device?
- Did anything that should have reached him stop in a report?

**A structural fact first.** Every rung of both batches builds a decision Pavol took by name: batch 3.5 builds rows 335, 334, 333 and 346 (`POSITIONS.md:53-56`) with the riders of `:59`; batch 4 builds route A's first rung (`:69`), the `nat` plan (`:46`, `:70`), row 379's count (`:65`) and rows 380 and 381 (`:66`). So the review separates what he decided from what a rung decided inside itself, and judges only the second as the rung's.

**One decision is not yet on record.** The brief for this review carries Pavol's decision of 2026-09-27 on a size's range: a `nat` is an ℕ32 value, as `Specification/basic/trait-parameters.tex:82-90` says. `POSITIONS.md` at `595c5fdec` does not hold it yet. It is used below as the brief states it.

Claims marked "by reading" were not run. Nothing was built and no program was run for this review.

## The verdicts

- **Rung B, the compiled integer rules: in the spirit.**
- **Rung I, the interpreter's integer rules: in the spirit.** Two observations its judges left "to the coordinator" have no ledger row.
- **Rung C, coercion in the interpreter: in the spirit.** Two of its four points for Pavol were parked with one line each, and the specification repair it handed to rung S was never made.
- **Rung N, sizes in the checker: in the spirit**, as the minimal design Pavol approved. That design refuses a product of sizes, and the one library's own rank-2 and rank-3 storage is written with one. No list names that fork.
- **Rung K, the shift count: in the spirit.**
- **Rung O, overflow under walk: the stop was right, and what it left is in order.** Its count was a probe that planning could have run.

## Batch 3.5, rung B, `ce0c7f453` (with the repair `c9faa7df4`)

### What landed

- `LSHIFT`/`RSHIFT` on the compiler prelude's `ZZ32` and `ZZ64` call four new natives with the smart-shift rule: `intBitLeftShift`/`intBitRightShift` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:353-362`) and the `long` twins (`simpleLongArith.java:322-331`). They are bound at `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:72-73` and `:198-199` and called from the bodies at `:647-648` and `:736-737`.
- All sixteen `x == -x` guards are gone. Twelve test the minimum (`simpleIntArith.java:80`, `:85`, `:90`, `:274`, `:279`, `:284`; `simpleLongArith.java:80`, `:85`, `:90`, `:249`, `:254`, `:259`). The two long multiplies are `Math.multiplyExact` (`simpleLongArith.java:72`, `:241`).
- `ZZ64.narrow` and `NN64.narrow` keep the low 32 bits, through the wrapping natives the prelude already imported. Rung W's five throw assertions are reversed.
- Test: `ProjectFortress/compiler_tests/IntSemanticsRungB.fss`. At the review's repair, the compiled `ZZ`'s `<<<` refuses an unrepresentable shift before allocating it (`simpleArbitraryPrecisionArith.java:93-102`, row 386).

### Standard 1: the specification

- Zero is not an overflow. The specification throws only when an integer result does not fit (`Specification/basic/operators/opr-overview.tex:155`, `:196`). So `|0|`, `-0`, `0 DIV -1` and a zero factor answer 0. B follows it.
- `LSHIFT`, `RSHIFT` and `narrow` are named nowhere in `Specification/basic` or `Specification/basic-lib` (grep, this review). The rules are Pavol's (`POSITIONS.md:53`, `:56`). B says so in its provenance block (`explorations/compile-ladder/rung-int-semantics-compiled/REPORT.md:4`).

No finding against the specification.

### Standard 2: the team's built intent

- **Shifts.** The team's signed-count natives test a negative count first and saturate a far-negative one before negating (`intShift`, `simpleIntArith.java:365-378`). B's natives copy that order. They drop its throw on a lost bit, as decided. The saturation at the width is what the team's gated walk tests pin since 2007 (`ProjectFortress/tests/BitTwiddle.fss:33-39`, cited at `CLIMB-BATCH-3.5.md:17`).
- **Guards.** The minimum is spelled as the file already spells it (`simpleIntArith.java:258`).
- **`narrow`.** The team's wrapping natives were imported and unused (`CompilerBuiltin.fss:51`, `:96`), and Steele's own test asserts truncation (`ProjectFortress/tests/UnsignedTest.fss:210-211`).
- **The rider.** The siblings were Pavol's rider (`POSITIONS.md:59`). `Math.multiplyExact` was one of the two ways the batch record offered (`CLIMB-BATCH-3.5.md:35`), and B showed the other way kept a second defect (a product equal to the minimum threw).

### Standard 3: the design record

- Pavol's principle of 2026-09-22 (`POSITIONS.md:52`): the machine word is shifted and nothing goes through ℤ, which is his reservation for the code generator (`:53`).
- The rule's peer check was his: every peer lets shifted-out bits fall off (`POSITIONS-history.md:73`). For the record, Swift calls the same rule its "smart shift" on fixed-width integers (from Swift's documentation, not checked in this tree).

### The global questions

- **Later phases: the switch-over.** B's four prelude bodies and four import lines leave with the prelude (`PLAN.md:62`). Its natives stay and are the natural helpers for the one library's shift bindings. But they take a primitive count (`intBitLeftShift(int a, int b)`), and since rung K the one library's `ZZ32` pair takes `b:AnyIntegral` (`Library/FortressLibrary.fsi:537-538`). So the compiled binding needs a count reader in front of them, the compiled twin of walk's `Int.shiftCount` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:261-272`). Also, `GCD` and `LCM` have no compiled helper at all: the compiled rules are Fortress bodies in the prelude (`CompilerBuiltin.fss:609-622`, `:694-707`), and `nativeHelpers/` has no `gcd` or `lcm` (grep). The plan's "29 of walk's 108 bindings" (`PLAN.md:61`) predates this batch and should be re-read with it, as batch 5's review said for rung D.
- **Later phases: unboxing.** B's natives take and return primitives, the shape phase 6 needs, and the checked multiply is the JVM's own.
- **microGPT.** Neither microGPT program names a shift, `GCD`, `LCM` or `narrow` (grep of `explorations/run-c4/src/`).
- **Built twice.** By design: the batch was split by path because that was the only split with disjoint files (`CLIMB-BATCH-3.5.md:13`), and one shared table makes the paths agree. The review measured 22 further cases agreeing on the merged tree (`climb-batch-3.5/RECORD.md:69`).
- **The library's way.** Yes.
- **What reached Pavol.** B's report says that `NN64` is left with no checked narrowing on the compiled path (`REPORT.md` section 7). That stayed in the report. The wider fact is below, finding 4: after the switch-over nothing in the library narrows with a check.
- **One switch-over note.** `IntSemanticsRungB.fss:132-134` pins `DOTCROSS` saturating, the prelude's reversed spelling. The file is on the respelling list of row 348 (`explorations/reviews/wrap-dependent-code.md:171`). But the one library declares no saturating family yet (`POSITIONS.md:81`, "The saturating family waits for a step of its own"), so those lines need a home when that step comes, not only a respelling.

### Verdict: in the spirit

Every rule is Pavol's, each native follows a team precedent in its own file, and the rider's shape was one the record offered.

## Batch 3.5, rung I, `d6faad28f` (with the repair `c9faa7df4`)

### What landed

- The four fixed widths' shifts reverse on a negative count (`Int.java:180-192`, `Long.java:192-205`, and the `NN32` and `UnsignedLong` pairs). The count is read once, by the class of its value (`Int.shiftCount`, `Int.java:261-272`).
- ℤ's shift count is exact at any size. An unrepresentable left shift raises a catchable `IntegerOverflow`, refused by a bit-length check before the JVM allocates it (`BigNum.java:240-254`, the check at `:247`).
- `GCD` and `LCM` are nonnegative, with a catchable overflow (`Int.java:134-148`, `:274-284`; `Long.java:148-162`; `BigNum$Lcm`). At the repair, `NN32` and `NN64` `0 LCM 0` answer 0 (row 385).
- `ZZ64.narrow` truncates (`Long.java:248-252`).
- A native can raise a Fortress exception: `Int.overflow()` (`Int.java:256-259`), with the name as a `WellKnownNames` constant (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:86`).
- The specification's `shift(self, k:AnyIntegral): ZZ` is declared on `trait ZZ` (`Library/FortressLibrary.fsi:605`, body `Library/FortressLibrary.fss:983`). The 49 parameters and one local named `shift` in the library are renamed `amount`.
- `BigNum.toB` reads an `NN64` of 2^63 or more exactly. Two lines of the team's `ProjectFortress/tests/RangePrototype.fss` (`:66`, `:171`) compute the signed stride explicitly.
- Test: `ProjectFortress/tests/IntSemanticsRungI.fss`. At the repair: row 379's expected failure `ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss` and row 383's `ProjectFortress/compiler_tests/XXXShiftDeclRungI.fss`.

### Standard 1: the specification

- **`GCD` and `LCM`.** "The result is always nonnegative" (`Specification/basic-lib/basic-integers.tex:512-518`). The same lines say "the result equals the other argument" for a zero or one argument. The chapter's own commented declarations return ℕ (`:507-508`), which reconciles the two. The rung followed that reading, which is also Pavol's (`POSITIONS.md:54`).
- **`shift`.** It is the specification's functional method on ℤ (`basic-integers.tex:674-680`). The renames are forced by the specification's rule against shadowing (`Specification/basic/declarations.tex:426-436`, `:454-461`, `:533`). The rung judge ruled exactly this and not a fork (`explorations/compile-ladder/rung-int-semantics-walk/JUDGE.md` sections 2-3). Right.
- **The overflow of an unrepresentable ℤ shift.** ℤ has no width, but the JVM gives it one. `IntegerOverflow` is the specification's exception for a result that does not fit (`opr-overview.tex:155`), and not fighting the JVM is Pavol's principle (`POSITIONS.md:52`). Defensible, and recorded as the rung's decision (`REPORT.md` section 4.4).

### Standard 2: the team's built intent

Every device is one the file or the tree already has:
- `Int.overflow()` builds its exception as `Evaluator.java:224-226` builds the try-atomic failure;
- the `WellKnownNames` constant is the shape of `StringPrim.java:130-133`;
- the shift-only native classes `LC2L` and `UC2U` follow `ZL2Z` and `NL2N`;
- `toB`'s `NN64` branch is `makeZZfromNN64`'s spelling (`simpleArbitraryPrecisionArith.java:124-126`);
- the team's dormant draft has `shift` beside `even` and `odd` (`Library/incomplete/basic/Fortress.Number.fsi:162`).

### Standard 3: the design record

- "The spec's arithmetic `shift` is exact on ℤ" (`POSITIONS.md:53`): built.
- `GCD` and `LCM` as the lattice operators (`basic-integers.tex:522-530`): nonnegative results keep those properties true.

### The global questions

- **Later phases: the flattening.** Batch 6 kept I's declarations. `shift` is declared on ℤ only. On the flat tower a `ZZ32` receiver reaches it by coercion (ℤ coerces from the four fixed widths, `Library/FortressLibrary.fsi:594-600`), which the gated `IntSemanticsRungI.fss:104` still asserts.
- **Later phases: the switch-over.** `shift` becomes a reserved name on the compiled path then (`POSITIONS.md:67`), and row 383's gated file is to be promoted. That file builds its receiver with `(3).asZZ` (`XXXShiftDeclRungI.fss:8`), a getter of the compiler prelude that the one library does not declare. So at the switch-over it fails on that name before it can be promoted. One respelled line. The compiled helpers for I's rules are B's section above.
- **Pavol's choices.** None taken by the rung beyond what the brief left it: the renames are the specification's, and the ℤ overflow was left to the rung (`CLIMB-BATCH-3.5.md:43`).
- **Built twice.** By design, as for B.
- **The library's way.** Yes, throughout.
- **What stopped in a report.** Two observations the judges left for "the coordinator's call" have no ledger row:
  - the library's tuple shifts subtract the whole tuple where one component was meant, `l_k-amount` for `shift_k` (`Library/RangeInternals.fss:663`, `:667`, `:783`, `:787`, `:1355`, `:1359`; `rung-int-semantics-walk/JUDGE.md` section 7);
  - `NN32$Lcm` hands its `int` operands to `UnsignedLong.gcd` sign-extended (`NN32.java:147`), where `NN32$Gcd` widens them first (`:141`; `climb-batch-3.5/JUDGE-review.md:218`). By hand arithmetic, not run: for `2147483648 LCM 7` the sign-extended value is 2^64 - 2^31, which 7 divides, so the divisor comes out 7 where it is 1, and the answer is 2147483646 where the true multiple, 15032385536, does not fit and should raise.
- **A team test changed without being listed.** Rung I rewrote two lines of `RangePrototype.fss` (`:66`, `:171`), keeping the test's values, and recorded it as its decision (`REPORT.md` section 7). Pavol's later rule for team-test lines is a list with before and after (`POSITIONS.md:118`). For the record.

### Verdict: in the spirit

It builds the specification's `shift` with the specification's own consequence, and every native follows its file's pattern. What it left unrecorded is small.

## Batch 3.5 as a whole: the specification is silent on what it built

The batch built the rules for `LSHIFT`, `RSHIFT` and `narrow` and the overflow of an unrepresentable ℤ shift. None of them is in the specification's prose, and the library's api carries no comment on them (`Library/FortressLibrary.fsi:454-455`, `:537-538`). Rung T's revised integer chapter now says "every other conversion between integer types is written explicitly" (`basic-integers.tex:36-37`) and names no such conversion. Pavol asked on 2026-09-24 that the specification record what the revival changes (`POSITIONS.md:63`). Finding 3 below.

## Batch 4, rung C, `b628871a2`

### What landed

- Under walk, a value that its declared type's lifted `coerce_` accepts is converted in three places: a single function's, constructor's, method's or native's parameter; an overloaded call once no overload applies without coercion; a typed binding or assignment, a tuple element by element.
- The overloaded case sits at the team's TODO: `bestMatch` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:787-802`) calls `bestMatchWithCoercion` (`:821-852`). The converted arguments are dispatched as an ordinary call (`Coercions.java:199` onward).
- A new file, `Coercions.java` (271 lines). Twelve interpreter tests and four compiled ones, eleven rows (387-397).

### Standard 1: the specification

- **The places and the choice.** The places are the specification's (`Specification/basic/conversions-coercions.tex:98-110`). "Applicable without coercion first, then the most specific coercion" is `:455-460` with `:469-484`.
- **The run-time choice.** The specification resolves a coercion statically (`:567-570`). Walk resolves it on the value. That is route A's decided price (`POSITIONS.md:69`; `explorations/reviews/exclusion-design-brief.md:140`), gated as two expected failures.
- **The re-dispatch.** The judge read `:532-536` as naming the static call's declaration, which run-time dispatch refines, and grounded it in `Specification/advanced/overloading.tex:73-78` and `:466-468` (`REPORT.md` section 4). That reading is the specification's own rule for every call. Right.
- **The ambiguity refusal.** A call with no most specific coercion is refused at the call, where the specification refuses the declarations (`advanced/overloading.tex:196-216`). Walk has no checker, so this is the only place it can refuse. Argued, and recorded as a decision.

### Standard 2: the team's built intent

- The placement is the team's "TODO add checks for COERCE, right here." (`OverloadedFunction.java:792` at `47437c65f`).
- The lookup of the lifted function copies `FTraitOrObjectOrGeneric.finishFunctionalMethods`.
- The specificity relation copies `CoercionOracle.scala:71-83`.
- The converted call re-enters the team's plain path.

No team draft of interpreter coercion exists beyond the TODO (`REPORT.md` section 3).

### Standard 3: the design record

Route A needs walk to convert before the tower is flattened (`POSITIONS.md:69`). It did: batch 6's flattening landed with walk converting (`FACTS.md:100`, "The one library's number tower is flat").

### The global questions

- **Later phases.**
  - Answer 8 waits on row 388, a generic function's parameter not converted: C skips generic overloads in its pass (`OverloadedFunction.java:826`). That is phase 3 work, as answer 8 says (`POSITIONS.md:107`).
  - Answer 9's walk rung, dispatch by declared domains (`POSITIONS.md:108`), rewrites the same `bestMatch` C extended. The coercion pass has to be carried into it.
  - If the checker is ever run on walk's programs (`POSITIONS.md:15`), static resolution replaces C's run-time choice and route A's price with it. Nothing to undo now.
- **Built twice.** The specificity relation now exists once per path (`Coercions.noLessSpecific` beside `CoercionOracle`). That is inherent to two paths.
- **The library's way.** Yes.
- **What reached Pavol.** C's judge sent four points (`explorations/compile-ladder/rung-interp-coercion/JUDGE.md:85-110`).
  - The stop (1) was answered: "(a), push" (`POSITIONS.md:80`).
  - Route A's price in its general form (2) and the judge's scope for tuples (3 in the report, 4 in the judge) went to the plan's parked list as one line each (`PLAN.md:122`; `explorations/coordinator/open-items-2026-09-26.md:119-123`, which itself says such a decision is to be flagged to him). The tuple scope is a judge's decision. By `POSITIONS.md:124`, a decision recorded in one line is not made. Finding 2.
  - The specification's own ZZ32/ZZ64/ZZ128 coercion example (3), row 394, was sent "for rung S's record". Neither rung S nor rung T made it. The example still contradicts the definition it illustrates (`conversions-coercions.tex:555-582` against `:477-484`), though T edited that file (`d9c415395`). Finding 3.
- **One wrong premise of the batch record,** that overloaded methods share the per-argument cache, was caught and noted at the gather (`climb-batch-4/RECORD.md:106`).

### Verdict: in the spirit

The team's TODO, the team's lifted functions and the team's own specificity relation, with the run-time choice Pavol took. Two of its points reached him only as a line each, and one specification repair it handed on was dropped.

## Batch 4, rung N, `3f297441c`

### What landed

- The compiled checker checks `nat` and `int` static parameters by the plan's minimal design: a size is a symbol or a literal, compared by equality, with no arithmetic.
- An unknown size is a new syntax-tree node, `_InferenceVarInt`, beside the checker's two inference variables. It has a third constraint track in `Formula` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:95-105`).
- `keep-size-params` is in. The return-type rule binds an escaped size as the less specific declaration's own parameter (`OverloadingOracle.scala:90-106`). `ExportChecker.equalIntExprs` compares sizes.
- Arithmetic in a size, and inference of `bool`, `dim` and `unit`, are refused by name (`TypeWellFormedChecker.scala:41-48`, `:107-108`, `:144-145`). A size left unknown at a call is refused there.
- The checker count went 103 → 125, 22 `fill` errors the crash had hidden.

### Standard 1: the specification

- Sizes are in the language (`Specification/basic/trait-parameters.tex:68-90`), and inference is a placeholder chapter (`Specification/basic/inference.tex:15`).
- Arithmetic in a static argument is in the language (`Specification/basic/expressions/constant.tex:23-24`), under the 2012 draft's own note "not yet supported" (`:15`). N refuses it as a limit and gates it as an expected failure, which is honest.
- The return-type rule: N followed the designers' paper (`Papers/Types/overloading-check.tick:166-172`), not the specification's shared static parameters (`advanced/overloading.tex:95-103`). The latter is Pavol's sentence of answer 9, and N neither enforced nor relaxed it. Right.

### Standard 2: the team's built intent

Each piece copies a team shape:
- the node sits beside `_InferenceVarType` and `_InferenceVarOp`;
- the size track copies the operator track's equality-only steps;
- the unification rule is the interpreter's `IntNat.unifyStaticArg` (`IntNat.java:126-146`);
- the two sites that made a `TypeArg` for every kind now call the kind-correct `staticParamToArg`.

### Standard 3: the design record

- Sizes are "a central design point" (`POSITIONS.md:38`).
- The minimal design is the plan Pavol approved through the shadow (`POSITIONS.md:46`; `explorations/reviews/nat-checking-plan.md:349-391`), which leaves arithmetic to instantiation (`:347`).

### The global questions

- **Pavol's choices.**
  - Decision 3 (an unknown size refused at the call) reached him and stands (`POSITIONS.md:110`).
  - Decision 1, the node, he said was not his (`POSITIONS.md:46`).
  - Decision 2 is the rung's, reported. Answer 9's checker rung will rewrite the same function, `satisfiesReturnTypeRule`, to check the return-type rule over every instance (`POSITIONS.md:108`). N's twelve lines there have to be read then.
- **Later phases: the size-arithmetic fork.** This is the finding of this review for phase 3 and phase 5.
  - The minimal design refuses a product of sizes. The one library's own storage for rank 2 and rank 3 is declared with one: `__DefaultArray2` (`Library/FortressLibrary.fss:2517-2519`), `__DefaultMatrix` (`:2665-2667`) and `__DefaultArray3` (`:2888-2890`), each with `mem: PrimitiveArray[\T, (s0 s1)\]` or `(s0 (s1 s2))`.
  - W1 measured 11 errors of this kind ("Arithmetic on nat static arguments is not supported", `explorations/perf-probes/prelude/switch-over-distance.md:93`).
  - The array-design review called the choice "a decision, not a default": teach the checker the arithmetic, or rewrite the storing objects (`explorations/reviews/array-design-review.md:57-63`). Pavol's row-40 answer carried three of that review's findings to the array design, not this one (`POSITIONS.md:76`).
  - Phase 3 drives the full measurement down before the switch-over (`POSITIONS.md:111`), and its list names no item for these errors (`PLAN.md:53-55`). The draft of batch 7, phase 3's first batch, does not name them either (`explorations/coordinator/CLIMB-BATCH-7.md` on the branch `plan-batch-7`, `7090f9595`).
  - microGPT's matrices are this storage: its vocabulary makes them with `array2` (`explorations/run-c4/src/FlatArrays.fss:40`, `:59`).
  - Finding 1.
- **Later decisions: the size range of 2026-09-27.** N's checker accepts a literal size of any magnitude: there is no range case beside the arithmetic refusal, and `nEq` compares literals exactly (`Formula.scala:100-105`). The checker also types a size read as a value `IntLiteral` (the team's `KindEnv.getType`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:64-70`), not ℕ32 or ℤ32. Both now go against the decision. Rung Z built on the second (batch 5's review, finding 3). No new decision is needed. It is one small rung, finding 5.
- **Built twice.** No.
- **The library's way.** Yes.
- **One detail.** Since the grammar has no negative literal, an `int` size can only be negative through another parameter, and the named error says `nat` for an `int` parameter (row 307's note). For the record.

### Verdict: in the spirit

A faithful build of the approved minimal design, from the team's own shapes, and its one decision of consequence reached Pavol. The design's limit on arithmetic meets the library's own storage. That is a planning gap, not the rung's.

## Batch 4, rung K, `57600bc27`

### What landed

`ZZ32`'s `LSHIFT`/`RSHIFT` take `b:AnyIntegral` in the component and the api, and `ZZ64`'s api pair matches its component (today `Library/FortressLibrary.fsi:537-538`, `:586-587`; `Library/FortressLibrary.fss:740-743`, `:824-827`). One assertion, `IntSemanticsRungI.fss:89`.

### The three standards

- **The specification** names neither operator (`explorations/compile-ladder/rung-shift-count/REPORT.md:4`).
- **The team's built intent.** `Integral[\I\]` promises `opr LSHIFT(self,b:AnyIntegral):I` (`Library/FortressLibrary.fsi:454-455`), and every other integer trait already kept that promise. The skeptic added the Meet Rule argument: `ZZ32` owed the meet of its two inherited pairs (`Specification/advanced/overloading.tex:396-411`; `climb-batch-4/RECORD.md:59`).
- **The design record.** Pavol's decision (`POSITIONS.md:66`).

### The global questions

- **The flattening needed it anyway.** On the flat tower `ZZ32` no longer extends `ZZ64` (`Library/FortressLibrary.fsi:505`). So without K, a count other than a `ZZ64` would have reached only `Integral`'s abstract pair (by reading). Batch 6 kept K's lines.
- **The switch-over and unboxing.** The compiled binding takes a boxed `AnyIntegral` count, so it needs the count reader named under rung B. For phase 6, a shift's count then has the static type `AnyIntegral`, so unboxing it needs the generator to see the argument's own type, or an overload on `ZZ32`. Neither microGPT program shifts. A note for phase 6, not a defect.
- **Nothing was owed to Pavol.**

### Verdict: in the spirit

It is the library's own contract, two declarations, no Java.

## Batch 4, rung O, `488b47934` (the stop's record)

### What the stop left

- **In the tree.** No source. `XXXFixedWidthOverflowRungB.fss` stays row 379's expected failure; the rename was made and undone on the branch (`climb-batch-4/RECORD.md:119`). The 42 files of `explorations/compile-ladder/rung-walk-overflow/` came in, among them `natives.patch`. Batch 6's follow-up takes that patch as the signed half's shape (`explorations/coordinator/CLIMB-BATCH-6.md:187`).
- **In the record.** Row 403, the library's reliance on wrapping, opened on the judge's advice. Notes on rows 379 and 146. `FACTS.md:97` with its superseded note. A handover paragraph.
- **The glyph.** O's `REPORT.md` still writes the wraparound product as "⊙̇" (`:104`, `:106`, `:124`). The judge corrects it to ⨰ (`DOTTIMES`) (`JUDGE.md:56`). That is the method's way of keeping a worker's text, and `record.md` was corrected.

### The three standards

- **The specification** settles row 379 against walk (`opr-overview.tex:155`, `:196`) and gives code that means to wrap its own operators (`:172-176`, `:205-209`). The judge said exactly this (`JUDGE.md:14-17`).
- **The team's built intent.** The judge found the 2011 prelude's wrapping set as the team's precedent (`JUDGE.md:57-61`).
- **The design record.** The judge made the global point that keeping walk wrapping only postpones the repair to the switch-over, because the compiled path already throws (`JUDGE.md:52-55`).

### The global questions

- **It reached Pavol, as the stop required.** He chose the specification's own way (`POSITIONS.md:81`) and extended it to the unsigned types (`:99`). Rung D of batch 5 built the operators, and batch 6's follow-up carries the natives with the unsigned ones added (`CLIMB-BATCH-6.md:185-187`). This is the stop working as designed.
- **One process point.** The count was a measurement that planning could have run. Pavol's rule of 2026-09-22 is that a fork a probe can settle is probed before the batch is briefed (`POSITIONS.md:51`). The manifest itself predicted that wrapping code would make the count nonzero (`CLIMB-BATCH-4.md:27`). Running the count inside the batch cost the rung's worker and a judge. For the record.

### Verdict: the stop was right, and what it left is in order

## Findings that need Pavol

Each has what it would take to fix.

1. **The checker refuses the library's own matrix storage.** Rung N's checker refuses arithmetic in a size. The one library stores every rank-2 and rank-3 array, microGPT's matrices included, in a field typed with a product of sizes (`Library/FortressLibrary.fss:2519`, `:2667`, `:2890`). That is 11 errors in the full measurement. Phase 3 is to drive that measurement to zero, and its list does not name them.
   - The ways: (a) the checker compares a size expression by its structure, folding literal products, which by reading covers the three fields; (b) the storage objects are rewritten to carry the product at run time, a departure from the library's text; (c) full arithmetic in the checker.
   - Cost: (a) is one small checker rung in phase 3 and leaves the array design free to replace the store later. (b) belongs to the array design, after the switch-over. (c) is larger.
   - Default: (a), in phase 3.
2. **Two of rung C's points reached you only as a line each in the parked list.** One: walk and the compiled run pick different overloads whenever an argument's static type needs a coercion but its value already matches another overload (`XXXCoercionStaticNarrowRungC`). Two: the judge chose to convert plain tuple bindings and leave an overloaded function's tuple parameter and tuple-typed fields unconverted (row 395).
   - Fix: one message each, best with phase 3's walk dispatch rung, which rewrites the same code.
   - Default: take both as landed.
3. **The specification is behind these batches in two places.** The integer rules of 2026-09-22 (the smart shift, the reversed negative count, `narrow` truncating, the overflow of an unrepresentable ℤ shift) are written in no specification text and no api comment. And row 394, the specification's own coercion example that contradicts its definition, was sent to rung S and never revised.
   - Fix: comments on `Integral`'s shift pair and the `narrow`/`widen` declarations in `Library/FortressLibrary.fsi` (the specification's library chapter is generated from them), or one passage in `basic-integers.tex` in the S1 form; and the `excludes` clauses added to the example at `conversions-coercions.tex:555-582` with a callout.
   - Cost: one small specification rung with a PDF rebuild. No code.
4. **After the switch-over nothing in the library narrows with a check.** `narrow` truncates on every width on both paths (`Long.java:248-252`, `UnsignedLong.java:241-244`, `BigNum.java:286-289`), as you decided. The one checked spelling, the 2011 prelude's `asZZ32` getter (`CompilerBuiltin.fsi:150`, body `CompilerBuiltin.fss:581`), leaves with the prelude. Five compiled test files call such getters.
   - Fix: a checked narrowing in the library's own form, a getter that throws or a method that returns `Maybe` as `RR64.check` does (`Library/FortressLibrary.fsi:301-304`), chosen with the switch-over's respelling.
   - Cost: a few declarations and natives.
   - Default: carry the 2011 prelude's checked getters into the one library at the switch-over.
5. **Your size-range decision of today needs a small rung, and a line in POSITIONS.** The checker accepts a literal size of any magnitude and types a size read as a value as `IntLiteral`. Rung Z's test gates sizes up to 2^64-1, and walk's row 418 is framed around 32-bit reading.
   - Fix: refuse a literal size outside ℕ32 (ℤ32 for `int`) beside the arithmetic refusal. Type a size value as ℕ32 or ℤ32 in `KindEnv.getType`. Change `NatRtBigSize`'s expectations, and re-state row 418.
   - Cost: one small rung across the checker, the loader's value emission and three tests. No new decision.

## Smaller findings, for the record

- Two judges' observations have no ledger row: the tuple shifts of `Library/RangeInternals.fss:663`, `:667`, `:783`, `:787`, `:1355`, `:1359`, and `NN32$Lcm`'s sign-extended operands (`NN32.java:147`; by hand, `2147483648 LCM 7` gives 2147483646). A probe and a row each. The second fix is `Unsigned.toLong` on both operands, as `NN32$Gcd` does at `:141`.
- For the switch-over's native list: B's shift natives take a primitive count while K's pair takes `AnyIntegral`; `GCD`/`LCM` have no compiled helper; the unsigned shifts have none with I's rules. `PLAN.md:61`'s counts predate batch 3.5.
- Row 383's gated file uses the prelude getter `(3).asZZ` (`XXXShiftDeclRungI.fss:8`) and needs one respelled line before it can be promoted at the switch-over.
- `IntSemanticsRungB.fss:132-134` asserts saturation, a family the one library does not declare yet. It needs a home when that step comes.
- Answer 9's checker rung rewrites `satisfiesReturnTypeRule`, where rung N's decision 2 sits (`OverloadingOracle.scala:90-106`).
- Rung I changed two lines of the team's `RangePrototype.fss` without listing them for Pavol, the values kept.
- Rung O's count could have been a planning probe (`POSITIONS.md:51`; `CLIMB-BATCH-4.md:27`).
- `FACTS.md:92` cites the shift declarations at their pre-flattening lines (`Library/FortressLibrary.fss:688-691`, `.fsi:491-492`, `:431-432`, `:530-531`, `:544`). They are `.fss:740-743`, `.fsi:537-538`, `:454-455`, `:586-587` and `:605` today.
- An `int` size cannot be negative except through another parameter, and the refusal's message says `nat` for `int` (row 307's note).

## What went right, globally

- Batch 3.5's shared table made the two paths agree by construction, and the review found 22 more cases agreeing (`climb-batch-3.5/RECORD.md:69`).
- Rung O's stop worked as designed. Its judge saw past the rung to the switch-over and to the team's 2011 precedent, and Pavol chose the specification's own spelling from that.
- Rung C's stop held the batch's push until Pavol answered.
- The batch-level judges enforced the three-homes rule over rung-level reasons (rows 379 and 383 gated, rows 385 and 386 repaired).
- Rung K and rung N were built from the library's and the checker's own shapes. Rung N's one consequential decision reached Pavol and stands.

## What I did not do

- Built nothing, ran no program, edited no source, library, test, ledger or record file.
- The `NN32$Lcm` case is hand arithmetic, not a run. The claim that way (a) of finding 1 covers the three storage fields is by reading.
- Did not review batches 5 and 6, except where they changed what batches 3.5 and 4 landed.
