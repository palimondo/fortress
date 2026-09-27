<!-- The synthesis of the two numerics plans, explorations/reviews/numerics-plan-fable.md (Fable, blinded, d7ca74708 and 39078a2a2) and explorations/reviews/numerics-plan-coordinator.md (Opus, 8f0f9f960, with its digests evidence-A.md and evidence-B.md and probes-B/), written 2026-09-27 for Pavol by the Fable planner on main at c9492fc8d after reading the coordinator's plan whole and checking each claim the plan rests on against the evidence; one probe of its own under explorations/reviews/numerics-plan-synthesis/ (block-stop). Pavol's assumption, that nothing in the coordinator's plan is taken on its word, was applied: every count it uses is traced to a capture or marked by reading, and the two disagreements that hinge on a number are left to the measurements the coordinator has running, named where they fold in. Register and parts as the two plans; part 7 is new: where they agreed, where they disagreed, how each was settled and on what. -->

# The numerics on the way to compilation: one plan from two

## 1. The answer

The two plans, written blind to each other, agree on the root and on the first move, and their one real disagreement was closed by the coordinator's own correction before this synthesis started.

- One root, three faces. Every "unknown types and coercion" complaint is the same gap: the specification never wrote how a value meets a type the program did not write (its type-inference chapter is a stub, its numeral hierarchy a note, its coercion rule stated only for a type known exactly). Both plans say so. The Fable plan names three faces: inference that ignores coercion, a numeral modelled three ways, inference with nothing to infer from. The coordinator's plan names two knots on the library's count: range code generic over its integer type, and type parameters nobody writes. Both are right about what they describe. The knots are where the library's 1.7K errors sit; the faces are what a fix has to be.
- What moves the needle is not a numerics design. Measured: microGPT's own two programs, through the compiled checker against the one library, report 24 and 35 visible errors of their own, none a numeral or a mixed width; what stops them is the model's unsized static types (decision D), 15 and 15, and the checker stops each block at its first failure, so those counts are lower bounds. On the library, the biggest levers are cheap and not numeric: the natives' result type (340, two written bounds), `fill` (302), row 421 (52, four lines), the exclusion remainder (40). One decision of Pavol's, ranges over `ZZ32` alone, clears the largest numeric class (between 330 and 500 by reading; the coordinator's shadow measures it).
- The general rule, inference with coercion and the promotion rule, is still needed, for one reason both plans now share: the numeral switch Pavol decided (walk to the compiler library's `IntLiteral`) refuses every range that starts with a numeral (13 declarations in C4, 11 in the APL program, measured) and every generic call that passes a numeral-typed binding to a declared `ZZ32` parameter (row 401; microGPT's `heads`, `unheads`, `onehot`, hidden behind decision D's errors), whatever the ranges become. So the switch lands only with the rule, as one batch of four rungs (checker, walk, library, specification), and that batch goes after the cheap levers, not before.
- Batches: 7 first, widened by one small rung (the two written bounds and row 421). Then the ranges batch on decision 1. Then the rule with the numeral switch (batch N). Then 7b whole. Then 8. Batch 6.5 runs whenever a decision holds the queue, G first. Pavol is right that E and P are a corner and that the numerics were planned nowhere; he is wrong about batch 7 and about G.

## 2. Refresher

Four terms; the two plans' refreshers hold the rest (`numerics-plan-fable.md` section 2, `numerics-plan-coordinator.md` section 2).

- The distance: the compiled checker's distinct errors on the one library, 1,738 under walk's setting and 1,533 under the compile path's (`perf-probes/prelude/distance-triage.md`). Zero is necessary for the switch-over, not sufficient.
- A static argument and its inference: the type or size that fills a generic's parameter; inferred from the arguments' types when the program writes none. On both paths the inference uses subtyping only and never the type the result must have.
- A coercion: a conversion a type declares from another (`RR64` from `ZZ32`); it applies only where the target type is known exactly, so never into a type parameter.
- A numeral's type: its own type by the specification; the compiler library's `IntLiteral`, a sibling that each number type converts from; the one library's `IntLiteral`, an object below `ZZ32`; walk's run-time class by width (`Int`, `Long`, big).

## 3. The audit, in short

The full audit is in the two plans: the Fable plan's section 3 by face, the coordinator's evidence A class by class with every site. Here, what each class is and who fixes it, in the order of what it clears. Counts are the triage's, walk's setting / the compile path's; "measured" means on a library copy through the distance stage.

- Inference with nothing to infer from (Fable's face C; the coordinator's knot 2): `builtinPrimitive`'s and `fail`'s result-only `T`, 340 and 24 / 0; the compile path's own `Object` bound, 0 / 372. Fix now: `T extends Object` written on the two declarations, measured to clear the 340 (evidence A part 2; it works by binding the unconstrained `T` to `Bottom`, which is below every declared return type, so the body goes unchecked, which is harmless for natives whose bodies the switch-over replaces). Fix later: the checker keeps the expected type at a call written `f(x)`, which it drops today (`Operators.scala:89-90`, verified) and keeps for methods and operators (evidence B, measured); that serves programs' `f[\T\](): T` too. The coordinator's probe of it is running.
- Overloading conformance, not numeric: `fill` 302 / 58 (rung A), the Meet Rule 100 (batch 8), the sentence's families 85 / 78 (rung L; 56 of them the range families), same-parameter pairs 15, row 421's 50 (four lines, measured 52 in all), other return-type slips 40.
- Range code generic over its integer type (the coordinator's knot 1; Fable's faces A and B as they meet the library): the integer family 274 (a numeral at a type parameter 149, the bounds of row 358 81, the dummy `0 asif ZZ32` 18, `|self|` 15, written `[\ZZ32,ZZ32\]` 8, a width into `I` 3), the range objects' abstract methods 18, the range methods' declared types 29, tuple shifts 8, and 56 of the sentence's families. 411 of the 1,738 sit in `RangeInternals`. Two fixes on the table: keep the generic ranges and respell (row 358's bounds and the device, measured 85; a numeral rule or about 130 `x.zero`/`x.one` sites for the 149; the slips one by one), or ranges over `ZZ32` alone as the compiler library declares them (330 to 500 by reading; the coordinator's shadow is running).
- The faces the library does not show but the programs and the decision do: inference that ignores coercion (row 388 both paths, the container shape of the `Matrix`-scalar operators, mixed widths; 0 library errors today, 0 microGPT sites) and the numeral's model (rows 79, 443, 437, 432; the switch's +35 on the library and its 13 plus 11 refused declarations in microGPT, measured; row 401's `heads` shape, measured on the compiler library and by evidence B on the one library's subtyping). One design closes both: infer from the positions that fix a parameter by subtyping, then admit the rest by substitutability against the instantiated type, with the narrowest common coercion target where a bare parameter is fixed only by number arguments (answer 8's rule). Compiled: a coercion retry in `checkApplicableWithInference` (`Functionals.scala:175-270`). Walk: `inferAndInstantiateGenericFunction`, the `continue` at `OverloadedFunction.java:826`, and `Coercions.coercionFor` instantiating a generic target first (row 389).
- Numeric slips, each its own row and fix, no rule: rows 421, 358, 433, 434, 438-441, 445, 449-453, 431, 435 (rung V), 418 (rung E); the arrays' `Number` bound, 97 (phase 5); the self-typed `Integral` bodies, 28.
- MicroGPT's own gate after the switch-over, measured (`numerics-plan-fable/probes/microgpt-distance/`): decision D's unsized types, 15 of C4's 24 visible errors and 15 of the APL program's 35; `fail` 3 and 3; the APL vocabulary's generic bodies over `T extends Number`, 11; a dozen small items. Every block stops at its first failure (`numerics-plan-synthesis/probes/block-stop`), so these are floors, and the row-401 shape is behind them.

## 4. The plan, in order

Units as the record's: a rung 3 to 5 agents and 1M to 2M tokens; a batch's tail 8 agents and 2M; a worker session 0.4M to 0.8M.

1. **Batch 7, widened** (H, A, and a small library rung N7): H and A as planned; N7 writes `extends Object` on `builtinPrimitive`'s and `fail`'s result parameter and takes row 421's four lines out of rung L; question 1 of batch 7 at its default (a), the bound `Any`. Clears, walk's setting: 340 and 24 measured, 302 and 40 by the briefs, 52 measured; about 750 of 1,750. The coordinator's tree 1 measures the whole. Needs no decision beyond batch 7's go and decision 2 below. Cost: one run of three rungs.
2. **Three worker sessions beside it, no batch.** (a) The ranges shadow, running on the coordinator's side: scalar ranges over `ZZ32` through the distance stage, under walk, and the corpus's uses of other widths. (b) The checker shadow for the rule: a coercion retry after inference, on the Fable plan's one-shape probes and the A0 library copy; it gives batch N its shape and count before its brief (Pavol's rule of 2026-09-22). (c) Decision D's diff: the sized signatures of C4's vocabulary, measured by the microGPT driver against its 15 errors, shown to Pavol, parked for phase 5.
3. **The ranges batch**, on decision 1: `RangeInternals` and the range operators over `ZZ32`, the specification's ranges section in the S1 form, the one revival test that ranges over `ZZ64` restated. Clears knot 1's bulk (measured by 2(a) before the brief). Cost: a library rung and a specification rung, one run.
4. **Batch N, the rule and the numeral**, four rungs: N-check (Scala: inference with coercion and the promotion rule; the expected type kept at `f(x)`, with a retry without it so that a binding's coercion still applies), N-walk (Java: the same rule in `EvaluatorBase`, `OverloadedFunction`, `Coercions`), N-lib (the sibling `IntLiteral` with its coercions in the one library, walk's `FIntLiteral.make` giving a numeral that type, the library's numeral sites respelled), N-spec (the type-inference chapter written, S1 form, landing only with N-check). Closes rows 79, 388, 389, 401, 425, 432, 443, 447, 437 and the numeral half of 426; retires batch 6.5's Q1. Its count on the library is small once steps 1 and 3 have landed; its value is the decision it lands and the programs it protects. Cost: one run of four, with a Scala and a Java rung as batches 3.5, 4 and 5 ran.
5. **Batch 7b** (S, C, W, L) as drafted, L without row 421 and without the `CAP` family if decision 1 is yes. After N because W and N-walk both edit `OverloadedFunction.java`.
6. **Batch 8**: the Meet Rule (100, after P2), the one-line slips, the self type (28), the residue by class from the distance stage.
7. **Batch 6.5** whenever a decision holds the queue: G first (rows 426 and 351 are the compiled `SUM`'s identity, on microGPT's compiled run; 417, 419, 420 its parallel run), then V, then E and P.
8. **The switch-over**, then microGPT compiles with decision D's diff from 2(c) and the dozen small items.

## 5. Batches 6.5, 7 and 7b, rung by rung

- 6.5 E: keep; clears 0; a corner, correct and decided. Pavol's "64-bit integers" is `NatRtBigSize`'s sizes, which E restates.
- 6.5 P: keep; text only; clears 0; its shared files put it in a different run from N-spec and V.
- 6.5 G: keep, first of 6.5; clears 2; needed before microGPT runs compiled (row 426: `SUM e` throws in `cast`), not before it compiles. Both plans agree.
- 6.5 V: keep; clears 3; the last subtype in the tower; bears on unboxing.
- 6.5 Q1: option 1, and stronger than the record puts it: the switch is unsafe without the rule on both paths (measured on the ranges, on record for row 401); it lands in batch N.
- 7 H and A: first, as planned; A also clears 22 and 18 of the programs' own visible errors (the `fill` diamond through their view objects). Plus N7 (decision 2).
- 7b S, C, W: clear 0 on the count and are soundness (row 398, the JVM verifier's "Bad return type"); keep whole. L: about 70 by reading after row 421 leaves it; less the `CAP` family under decision 1.

Where Pavol is wrong: batch 7 is the largest measured lever; G is on microGPT's compiled path. Where he is right: E and P; the numerics were planned nowhere; the numeral's type and ranges are two decisions that can be taken now and each in one fell swoop.

## 6. Decisions for Pavol

### Decision 1. Ranges over `ZZ32` alone

- The question: make the library's scalar ranges monomorphic over `ZZ32`, as the compiler library declares them (`CompilerLibrary.fsi:173-174`), instead of generic over an integer type `I`?
- Context: the specification's ranges chapter names no width ("integer values", `ranges.tex:43-44`); the compiler library's `ZZ32` ranges are the implementers' later practice; a size is an `NN32` and a JVM index a `ZZ32` (POSITIONS 2026-09-27); `RangeInternals` carries 411 of the 1,738 errors; no library body, demo or microGPT line ranges over another width, one revival test does (row 452's); the language cannot convert a numeral into a type known only as `I` (both plans, evidence B section 8). Peers: Java's `IntStream.range`/`LongStream.range`, Kotlin's `IntRange`/`LongRange`, Scala's `Range` over `Int` with `NumericRange` beside it, Rust generic over any integer.
- Options: (1) yes, one library rung and one specification rung after the shadow's count; (2) keep the generic ranges and repair them with the library's devices (85 measured, then the numeral rule or about 130 sites, then the slips); (3) two concrete families, `ZZ32` and `ZZ64`.
- A yes commits him to a language change recorded in the S1 form: a range over another integer type becomes a static error and such a loop is written another way. A no costs option 2's sites and makes the rule a condition of every numeral range.
- Recommended: 1, once the coordinator's shadow confirms the count.

### Decision 2. Batch 7 widened, question 1 at the bound `Any`

- The question: add rung N7 (the two written bounds, row 421's four lines) to batch 7, and take its question 1 at (a)?
- Context: measured, 340 and 52; the bound `Object` on `builtinPrimitive`'s `T` makes the checker bind `Bottom` and pass the body, which is what the compile path's own setting already does to these natives; the natives' bodies are replaced at the switch-over (row 309). Under (a) the 372 `Object` errors go and the 364 natives' errors come, which N7 then clears.
- Options: (1) yes; (2) batch 7 as drafted, the 400 left until the switch-over.
- A yes commits him to one more small library rung in the next run. A no costs nothing now and 400 errors on the count until the natives are rebound.
- Recommended: 1.

### Decision 3. The rule and the numeral switch as one batch, before 7b

- The question: build inference with coercion, the promotion rule and the expected type at `f(x)` on both paths, with the numeral switch and the type-inference chapter, as batch N right after the ranges batch and before 7b?
- Context: the switch he decided cannot land alone (13 and 11 refused declarations measured; row 401's shape behind decision D's errors); the rule is answer 8's, placed "in the checker phase" by the plan's batching, not by him; on the count it is small after steps 1 and 3; 7b's W and N-walk share a file, so the two are sequential either way.
- Options: (1) N before 7b, as section 4; (2) N after 7b, the coordinator's order; (3) N folded into 7b as four larger rungs, one run of 9 to 15 hours.
- A yes to 1 retires the numeral decision and 6.5's Q1 one batch sooner, and writes the inference chapter before S rewrites the overloading passages that cite it; a no (option 2) costs nothing on the count and delays the switch by one run.
- Recommended: 1; option 2 is acceptable if the checker shadow (2b) is not ready when the ranges batch lands.

### Decision 4. Decision D's diff now

- The question: one worker session now for the sized signatures of C4's vocabulary, shown to him as a diff, parked until phase 5?
- Context: 15 of each program's visible errors are the unsized `Array[\RR64,ZZ32\]` meeting sized library declarations; the array design review predicted it; the diff was wanted "as soon as step 3 lands" by the library-route judgement and is held in phase 5.
- Options: (1) yes; (2) wait for phase 5.
- A yes costs one session and buys the shape of microGPT's own gate before the switch-over is designed. A no costs nothing now.
- Recommended: 1.

### Decision 5. The order

- The question: 7 widened, the ranges batch, N, 7b, 8, with 6.5 in the slots a decision leaves (G first)?
- Options: (1) that order; (2) the record's: 6.5, 7, 7b, then the rest; (3) the coordinator's: 7 widened, ranges, 7b, N, 8, 6.5 in the slots.
- A yes to 1 moves E and P behind the batches that move the count and puts the numeral decision one run earlier than option 3. A no to 1 and yes to 3 costs nothing on the count.
- Recommended: 1.

## 7. Where the plans agreed, where they disagreed, and how each was settled

Agreed, both blind:

- One root, the unwritten rule; the same specification lines (`inference.tex:15-25`, `literals.tex:83-95`, `overloading.tex:173-175`).
- Batch 7 first and not a corner; 6.5 E and P a corner; G needed before microGPT runs compiled.
- The natives' 364 are not numeric in cause.
- Ranges over `ZZ32` as a decision for Pavol, the compiler library's practice.
- The numeral switch cannot land alone on either path.

Disagreed, and how settled:

- Whether the general rule is needed at all. The coordinator's first draft said neither knot needs it; its own evidence B (row 401 on `heads`, `unheads`, `onehot`; rows 388 and 401 whatever the ranges become) overturned that before the file was marked ready, and the committed plan says so. The Fable plan said it from its measurement of the switch on the ranges. Settled: needed, for the switch and the programs, not for the count. Evidence: `numerics-plan-fable/probes/microgpt-distance/c4-L0-vs-A0.diff` and `apl-L0-vs-A0.diff`; ledger row 401; evidence B sections 7.1 and 8.
- The natives' fix: the Fable plan preferred the checker (the expected type), the coordinator the two written bounds. Settled for the bounds now and the checker in N: the bounds are measured (340) and cost two lines; the checker's fix is verified in the source (`Operators.scala:89-90` drops `expected`) but needs a retry without the context so that a binding's coercion still applies (`r: RR64 = idt(3)` passes today by the binding's coercion and would fail under a constrained inference), so it is a rung, not a line. The coordinator's probe of it is running and folds in here.
- What ranges over `ZZ32` clear: Fable about 330 by reading (the classes located in `RangeInternals`), the coordinator about 500 by reading (adding the range operators of `FortressLibrary` and half the Meet Rule's 100). Checked: the range operators do go (their errors are the generic `I`'s); the Meet Rule's range pairs (`IN`, `FORWARD_CMP` across two range traits) are two traits with nothing on their meet and no exclusion, which removing `I` does not change, by reading. Expect 400 to 450; the coordinator's tree 2 decides, and folds in here.
- The order of N and 7b: count-neutral both ways; settled for N first by the decision it retires and the chapter S cites, with option 2 acceptable (decision 3).
- Where 6.5 goes: the Fable plan gave G and V a slot after N; the coordinator puts all of 6.5 in the queue's idle slots. Settled for the coordinator's, G first: nothing in 6.5 moves the count, and G's rows are on the compiled run, not the compile.

Found by one plan and verified before it was taken:

- By the Fable plan: microGPT's own distance (46 and 53 errors, decision D dominant; the switch's 13 and 11), which the coordinator lists as not checked. Verified by the synthesis to be a floor, not a total: the checker stops a block at its first failing statement (`probes/block-stop`: one shared block reports one of three independent failures, three separate blocks report three). So "no numeral error in the programs" in the Fable plan is corrected here to "none visible; row 401's shape is behind decision D's errors in `step`".
- By the coordinator's evidence B: the checker keeps the expected type for methods and operators and drops it for `f(x)`; the one library's `IntLiteral extends ZZ32` is what makes `0#n` and `heads(m, blockSize, ...)` check today; the written `Object` bound works by `Bottom`. Each verified in the source or by its capture (`Operators.scala:76-92`; `FortressBuiltin.fsi:117`; evidence B's `BBottomCk`, `BGenCk2` a06).
- By the coordinator's evidence A: the triage's I3 holds five errors that are not numerals, its "126 of 138" is 118 sites cleared plus 8 whose message changed, and its "274 to 44" is 53 by site. Taken as stated; they change no plan line.

## 8. Measured and inferred

Measured: everything in the Fable plan's section 7 and the coordinator's section 7; this synthesis adds `probes/block-stop` (one compiled probe, the machine on its first line). Running on the coordinator's side and folding in here when they arrive: tree 1 (batch 7 widened under walk's and the `Any` settings), tree 2 (ranges over `ZZ32`: the count, whether walk runs, the corpus's other widths), and the checker keeping the expected type at `f(x)`.

Inferred: the 400 to 450 for decision 1; that the rule as sketched clears the switch's refusals (the shadow of step 2(b) measures it); that the Meet Rule's range half survives ranges over `ZZ32`; the costs, by the record's arithmetic.

Not checked: the gate; walk on any respelled library; N-walk's design beyond the three sites named.
