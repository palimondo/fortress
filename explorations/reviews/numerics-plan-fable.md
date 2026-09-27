<!-- The numerics plan: are the numeric problems on record one issue, what fixes it on both paths, what moves the needle most toward microGPT compiled, and what becomes of climb batches 6.5, 7 and 7b. Written 2026-09-27 for Pavol by a Fable planner on his go (POSITIONS 2026-09-27, the boot note cbb684be8), blinded to the coordinator's plan, on main at 219cd7038 with the tree's Library/, ProjectFortress/ and Specification/ as landed by climb batch 6b (917bb7b32). Its probes, scripts and captures are under explorations/reviews/numerics-plan-fable/ (its README says what each is); private caches, no ant, no tracked file changed. Read FACTS.md, POSITIONS.md, INDEX.md, PLAN.md, the distance measurements and the ledger's numeric rows first; this note does not restate them. -->

# The numerics on the way to compilation: one issue, and what to do first

## 1. The answer

Pavol is right about the root and the record is right about the build. Every complaint he keeps hearing, "unknown types and coercion", is one gap: the specification never wrote the rule by which a value meets a type the program did not write. Its type-inference chapter is a stub, its numeral hierarchy is a note that says "we need to describe the Numeral type hierarchy", and its coercion chapter defines a coercion only into a type that is already known exactly. Each path improvised its own rule, so the gap shows in three faces: inference that ignores coercion (row 388, the container shape, mixed widths, numerals at a bound), a numeral whose type is modelled three ways (rows 79, 443, 432, 437 and the library's 149 numeral errors), and inference with nothing to infer from (364 native bindings, rows 424, 425, 447). One design closes the first two faces together and a second small checker fix closes the third; they are one specification chapter, built as one batch of four rungs (checker, walk, library, specification). The record's "separate problems in different places" describes where the fixes go, not what they are.

What moves the needle is not the numerics. Measured this afternoon: microGPT's own two programs, put through the compiled checker against the one library, report 24 (C4) and 35 (APL) errors of their own, and not one is a numeral or a mixed-width coercion. What stops them is the model's unsized static types (decision D), 15 and 15 of those errors, and small things. What stops the switch-over is the library's 1.7K errors, of which the numeric family is about a quarter (274 integers-in-generic-code, 50 of row 421, 44 of arrays bounded by `Number`, 28 of the self-type idiom). The biggest single levers on that count are not numeric: the natives' result type (340), `fill` (302), the overload families (139 plus 52), the Meet Rule (100).

Two things the plan misses today, both Pavol's instinct. The numeral switch as decided (the compiler library's `IntLiteral` into the one library) would refuse every range that starts with a numeral in both microGPT programs, 13 declarations in C4 and 11 in the APL program measured, unless the inference rule lands with it; so the switch is safe only inside the numerics batch. And ranges over `ZZ32` alone, his own view and the compiler library's practice, would clear about 330 of the library's errors by reading, more than any planned rung.

Batches: 7 (H, A) goes first as planned, it is the largest measured lever. The numerics batch (N: checker, walk, library, specification) goes second, before 7b, and takes the numeral switch and the ranges decision inside it. 6.5's G and V stay early (G holds row 426, the compiled sum's identity, on microGPT's path); E and P are correct and small and go wherever a slot is free. 7b stays whole after N. Pavol is right that E and P are a corner; he is wrong about G and about batch 7.

## 2. Refresher

Four terms this note uses.

- A *static parameter* is a type or a size a declaration is generic in: `same[\T extends Number\](a: T, b: T)`. *Static-argument inference* is how a call that writes no `[\...\]` gets `T`: the checker (compiled) or the interpreter (walk) solves `T` from the arguments' types. The specification says this happens "as described in the type-inference chapter" (`Specification/basic/overloading.tex:173-175`), and that chapter is one paragraph of notes (`Specification/basic/inference.tex:15-25`).
- A *coercion* is a conversion a type declares from another: `RR64` declares `coerce(x: ZZ32)`, so a `ZZ32` may be passed where an `RR64` is declared, and the library converts it. The specification allows it only where the parameter's declared type is exactly the target (`Specification/basic/conversions-coercions.tex:90-97`). With a static parameter the parameter's type is not known until inference has run, and the specification says nothing about the two together.
- A *numeral* is a number written in the program, `0` or `46`. The specification gives it a type of its own, with the library defining coercions from it into the number types (`literals.tex:127-148`). The compiler's library does that: `IntLiteral` is a sibling of the number types, and each declares `coerce(x: IntLiteral)` (`CompilerBuiltin.fsi:390-429`). The one library does not: its `IntLiteral` is an object *below* `ZZ32` (`FortressBuiltin.fsi:117`, `object IntLiteral extends { ZZ32 }`), and walk gives a numeral the run-time class `Int`, `Long` or a big integer by its width (`FIntLiteral.java:40-56`). The compiled checker types a numeral as whatever the library it reads calls `IntLiteral` (`Types.java:62`): a sibling on the compiler's library today, a `ZZ32` on the one library after the switch-over.
- The *promotion rule* (answer 8) is the missing inference rule for numbers: a generic call over two number types infers the narrowest type both coerce into. `same(z, w)` with a `ZZ32` and a `ZZ64` infers `ZZ64` and converts `z`. Nothing on either path does this today; the compiled checker infers a union, walk infers a common supertype and converts nothing.

## 3. The audit

Every count is a distinct checker error of the distance measurement on the flat library (`perf-probes/prelude/distance-triage.md`, control 1,738 under walk's setting, 1,533 under the compile path's, classes as its section 2 names them), unless a line says "this plan" (measured here, `numerics-plan-fable/probes/`) or "by reading".

### 3.1 Face A: inference does not consider coercion

Cause: both paths infer a static parameter by subtyping alone and never retry with coercion. Compiled: `checkApplicableWithInference` (`Functionals.scala:175-270`) has no coercion step, while `checkApplicableWithoutInference` (`:278-340`) builds one. Walk: `EvaluatorBase.inferAndInstantiateGenericFunction` (`:50`) unifies run-time classes, and the coercion pass skips every generic declaration (`OverloadedFunction.java:826`, `if (sfn instanceof GenericFunctionOrMethod) continue;`).

- Row 388, a generic function's declared non-generic parameter not converted, both paths. The container form, `scale[\T\](b: Box[\T\], x: T)` with `Box[\RR64\]` and a `ZZ32`: this plan's probe `ScaleZ` and `Scale3` fail under walk with "Unification error ... (b:Box[\Number\]) got arg Box[\RR64\]", and `ScaleN` is refused compiled, while `b.accept(z)` and `bw.accept(n)` convert on both. This is the library's `Matrix`-scalar operators' shape (`m i` refused on the flat library, FACTS). Library errors: 0 today (the operators are declared, not called, in the library); tests respelled: 3 lines; microGPT: 0 sites.
- Row 389, a generic trait's coercion not applied under walk (the lifted coercion's own static arguments are inferred before the target's are set).
- Mixed widths in a generic call. This plan: walk accepts `same(z, w)`, `same(z, r)`, `same(3, w)` and `lohi(z, w)`, `lohi(z, u)` with `T` at a common supertype and converts nothing (the printed run-time types stay `ZZ32,ZZ64`); the leaf operator then converts by rung C's pass (`sameAdd(z, w)` gives a `ZZ64`, `sameAdd(z, r)` an `RR64`). Compiled: `same(z, w)` infers a union and runs while no arithmetic is done; `lohi(z, w)`-shaped ranges are refused (`z:w`, `0#w`: "(ZZ32, ZZ32)->Range is not applicable to (ZZ32, ZZ64)"). Library errors: 0 ("no error today is a generic call over two different number types", the triage's answer 4). MicroGPT: 0 (both programs keep every index `ZZ32` and widen the step counter once, `1.0 s`).
- The dummy device, class I2, 18 errors: the library's own hand-written promotion, `0 asif ZZ32` passed to the range helpers "to ensure that the result type is at least ZZ32" (`FortressLibrary.fss:3910-3959`), which the flat tower makes infer `OR(ZZ32, I)`. The promotion rule is what it stood in for.
- Row 432, `SUM <|1, 2, 3|>` refused under walk: walk takes a list literal's element type from the elements' run-time class `Int`, which is a `ZZ32` but not an `AdditiveGroup[\Int\]`, so the reduction's bound fails. The same inference weakness from the other side: the inferred type should be the one at which the bound holds. This plan reproduces it (`SumLit`) and its written form runs (`SumLitT`).
- Numerals at a generic bound, conditional on the numeral's model (face B): with the compiler library's sibling `IntLiteral`, `lohi(2, 46)` and `lohi(2, z)` are refused compiled (this plan; `compile-ladder/plan-6.5/probes/numeral/GenNumeral`), and the one library's ranges `#[\I extends AnyIntegral\](lo: I, ex: I)` refuse `0#n`. Under walk with today's model they run (`lohi(2, 46)`, `0#w`, `2:46`, this plan).

Fix, one design on both paths, in the specification's terms: infer the static parameters from the argument positions that fix them by subtyping; then admit each remaining argument by substitutability, subtype or coercion, against the instantiated parameter type (`conversions-coercions.tex:417-421` already defines substitutability for the non-generic case); where a bare type parameter is fixed only by arguments of several number types, take the narrowest type they all coerce into (answer 8's rule, and Julia's promotion). Compiled: a coercion retry in `checkApplicableWithInference` after `inferStaticParams`, and the promotion case in the solver's join. Walk: `inferAndInstantiateGenericFunction` unifying with coercion targets, the `continue` at `OverloadedFunction.java:826` removed for the instantiated declaration, and `Coercions.coercionFor` instantiating a generic target first (row 389's sketch). Where the library gets around the missing rule today: `widen`, `narrow`, `big`, `asFloat` at the call, the `0 asif ZZ32` device, and a written static argument (answer 8's interim rule, `basic-integers.tex:51-65`).

### 3.2 Face B: a numeral's type is modelled three ways

Cause: the specification's numeral types were never finished (`literals.tex:83-95`), so the compiler's library and the interpreter's library each declared an `IntLiteral` of its own, and walk types a numeral by its width at run time.

- Row 79: `typecase` on a numeral answers `other` compiled and `ZZ32` under walk; `ee(5)` with a sized `ZZ32` arm beside an `Any` arm dispatches differently. This plan: `same(3, 4)` compiled prints `other` for both arguments.
- Row 443: `s: RR64 = 3000000000` refused under walk ("RHS expression type Long"), because a numeral beyond `ZZ32` gets a `Long` and `RR64` coerces from `ZZ32` only. This plan reproduces it (`Bind3G`); `s: RR64 = 3` converts (`Bind3`).
- Row 437: `matrix(v)`'s `0` cannot reach `T` for unsigned elements.
- Row 426's numeral half: the identity functions pass `cast[\T\](0)` and a compiled numeral is not a `ZZ32`.
- Class I3, 149 errors, 138 in `RangeInternals`: a numeral where a type parameter is expected, `ex > 0` with `ex: I`, `n : I := 1`. On the nested tower these passed through `Number`'s catch-alls typed `(Number, IntLiteral)`; the flat tower has none. No coercion into a type parameter can be declared (a generic coercion is refused as cyclic, FACTS), so the library's own way is `x.zero` and `x.one` (`Integral`'s `DIVIDES` writes `self.zero`), about 130 sites; a checker rule that converts a numeral into a type parameter bounded by `Integral` clears 126 of the 138 (the triage's shadow, measured).
- The numeral switch as decided (POSITIONS 2026-09-27; batch 6.5's Q1). Measured on the library: the sibling `IntLiteral` adds 35 errors, 24 of them the enabled `IntLiteral` natives and 15 ranges over numerals (`compile-ladder/plan-6.5/NOTES.md`; the triage's A0). Measured on microGPT, this plan: against the A0 copy, the checker refuses every range in C4 that starts with a numeral, "operator # ... not applicable to (IntLiteral, ZZ32)", at 13 declarations (5 in `FlatArrays`, 4 in `FlatData`, 2 in `MicroGptFlat`, 2 in the check program), where today's library gives 0, and every one of the APL program's the same way, 11 declarations (3 in `FlatArrays2`, 4 in `FlatData2`, 2 in `MicroGptApl`, 2 in its check program); by a grep, 25 such ranges in each program (a declaration holds several). Under walk the switch does not load the library at all (`NOTES.md` section 1). So the switch cannot land alone on either path; with face A's rule it can.
- Why today's library passes: its `IntLiteral extends ZZ32`, so the checker infers `I = ZZ32` for `0#n` and `LeftRange[\IntLiteral\]` for `2:46` (the 15 "ranges over numerals" of the triage are that). After the switch-over the compiled checker reads this declaration, so the compiled path's numeral model becomes the one library's whatever walk does; the compiled run-time class `FIntLiteral` must then implement the library's `IntLiteral` (phase 4, the natives), which closes row 79's split in walk's favour by construction. That is the second reading of Pavol's decision, and it is measured cheaper.

Fix: one declaration in the one library (which `IntLiteral` it carries, decision 2 below), the numeral coercions of the compiler library where the sibling is chosen, walk's `FIntLiteral.make` giving a numeral the library's type, and the specification's numeral section written to the model chosen (S1 form). Built only together with face A's rule.

### 3.3 Face C: inference with nothing to infer from

Cause: the checker's solver binds a type variable it cannot fix to `BottomType` (`STypesUtil.scala:1937-1940`, `Formula.scala:524`) and never consults the context (the declared return type, the binding's type); walk erases such a variable to `BOTTOM` ("Choosing to erase to bottom", `EvaluatorBase.java:224-226`).

- Class N1, 340 errors under walk's setting and under the switch-over's default (bound `Any`): every `builtinPrimitive[\T\](name): T` body, whose `T` is fixed only by the declared return type; under the bound `Object` the checker solves it. Class N2, 24: `fail[\T\](s): T`. MicroGPT, this plan: 3 `fail` sites in C4 and 3 in the APL program.
- Rows 424 and 425: a big operator's unwritten static argument bound to `Bottom` on both paths (the clause form writes it since rung F).
- Row 447: a return-only type parameter bound to `Bottom`, and the compiled instance crashes at load.
- Row 21 and the inference probe (`compiler-probes/maybe-inference/inference.md`): a declared type never fixes a static argument on either path; the bare `Nothing`.
- Rows 400 and 446, the unknown size in an overload arm: decided by answer 12 (refuse), built by rung R; the dynamic form stays.

Fix: the solver takes the expected type as a constraint on the result (`inferStaticParams` already accepts a `context`, `STypesUtil.scala:928-946`; the callers pass none for these shapes), on the checker; walk's erasure to `BOTTOM` replaced by the declared type where one is in hand. This is a checker rung of its own inside the numerics batch, Scala only, and it clears 364 errors under the setting the switch-over takes, more than any library rung. The library's one-line way, `builtinPrimitive[\T extends Object\]`, clears the 340 and is a hack that excludes tuple and arrow results (none exists); it is the fallback if the checker rung slips.

### 3.4 Numeric slips on the flat tower, each its own row, none of the issue

- Row 421, `StandardMinMax`'s `(T,T)`: 50 errors (R1 32, R4 18); four lines; rung L.
- Row 358, the bounds `AnyIntegral` or none where `Integral[\I\]` is used: class I1, 81 errors; 138 bound rewrites in four files, measured to clear 77; planned nowhere.
- Classes I5 (`Integral` declares no `|self|`, 15), I6 (`[\ZZ32,ZZ32\]` for `[\I,J\]`, 8), I4 (3): library slips in the generic range code; planned nowhere.
- Class S1, 28: `floor(self): I = self` in `Integral[\I\]`, whose `self` is an `Integral[\I\]` and not an `I`; the self-typed idiom `comprises T` overflows the checker (FACTS, route C). Library respelling into the leaves; planned nowhere.
- Class V1, 44 in the library and 11 in the APL vocabulary (this plan: `a.map[\T\](fn (e) => e / s)` over `T extends Number`, `FlatArrays2.fss:23-39`): generic bodies over a `T extends Number` that declares no arithmetic. The bound each body needs (`MultiplicativeRing[\T\]`, an order) is the array design's element bound, phase 5; the naive respelling of the whole family did not finish in the checker (the triage's VEC).
- Row 433 (the fusion pairs, 4), rows 438, 439, 445 (declared types of `^` and `signed`), 434 (`Number`'s `=`), 440 (`0/0`), 441 (a negative power), 449 (a demo), 450-453 (range bodies at the integer bounds, the compiler prelude's midpoint), 431 (`perturb`): each a library or prelude body, each its own fix, none a checker rule.
- Row 435, `RR32` below `RR64`: rung V. Row 418 and `NN32`'s `LCM`: rung E.
- Closed already: 146 (rung F), 379 (rung O), 380 and 381's walk half (rung K), 386, 19's walk half (rung C), 394's text (rung P will).

### 3.5 What the distance is made of, and what is numeric

Of the 1,738 (walk's setting): overloading conformance 587 (`fill` 302, the Meet Rule 100, the sentence's families 85, same-parameter pairs 15, row 421's 50, other return-type slips 40); the natives' `T` 364 (face C); the integer family 274 (faces A and B, and the slips of 3.4); the arrays 97; api-and-component gaps 94; the self type 28; exclusion and `comprises` 40; the residue 116 and about 100 in small classes. Numeric in the sense of this note, faces A, B and the slips: about 400, 23 %. Under the compile path's own setting the natives' 364 go and 372 `bound Object` errors come instead; the numeric share is the same.

`RangeInternals` alone: 411 of the 1,738 (this plan, from the triage's `classes-walk.txt`): I3 138, I1 79, L1 56, RG 29, OT 23, D2 18, I5 15, TS 8, I6 8, N2 7, R3 6, I2 6, R4 5, NM 5, M1 3, I4 3, X1 2. Every one of the integer classes there (249), the abstract-method class D2 (18) and the `CAP` families (L1's 56) exist because the scalar ranges are generic in an integer type `I`; by reading, ranges over `ZZ32` alone remove them, about 330 errors, and leave the range-method slips (RG 29), the residue and `fail` (N2 7).

### 3.6 What stops microGPT itself, measured

This plan's `probes/microgpt-distance/`, the checker over the programs against the one library under the switch-over's default setting:

- C4's four components: 46 errors. 22 are the library's, seen through C4's seven view objects that extend the array traits (the `fill` diamond 18, `shift`'s declared type 4; rung A and batch 8). 24 are C4's own: 15 are decision D, the model's unsized `Array[\RR64,ZZ32\]` where the library's `DOT`, `gather`, `row`, `plane`, `parseRow` and the `reflect` views want `Vector`, `Matrix`, `Array3` (`reviews/array-design-review.md` predicted this); 3 are `fail[\T\]` (face C); 6 are small: `Character.codePoint` (an api gap), `diag`'s body `Array2` against `Matrix`, a varargs `SUM[\ZZ32\][m <- ms]` typed at the element, the varargs export, `matShape`'s `if` body typed `((), ())`, `view`'s arity. The check program: 0.
- The APL program's six components: 53 errors; 18 the library's, 35 own: decision D 15 (`DOT` 3, juxtaposition 1, `row` 2, `viewN` 1, `parseRow` 2, `diag` 1, `sizes` on the unsized `Array` 5), the generic vocabulary's bodies over `T extends Number` 11 (class V1), `fail` 3, and one each of `Character.codePoint`, the varargs sum, the varargs export, the `if` body, a grammar's function expression.
- No error in either program is a numeral, a mixed width or a missing coercion, on today's library. Under the numeral switch as decided, 13 more declarations in C4 (3.2).

So microGPT's own gate after the switch-over is decision D plus about a dozen small items, not the numerics. The numerics decide whether the switch-over's library can be checked and whether the numeral decision lands without breaking the programs.

## 4. The plan

Units: a rung is 3 to 5 agents, 1M to 2M tokens; a batch's tail (gather, review, gate) 8 agents, 2M; a worker session 0.4M to 0.8M (the record's arithmetic, `CLIMB-BATCH-7.md` section 1).

1. **Now, no decision: batch 7 (H, A).** As planned. Clears the exclusion remainder (40) and every `fill` refusal (302 under walk's setting, 58 under the compile path's, 22 of C4's and 18 of the APL program's own list), unmasks the `FortressLibrary` api's overloading check. Measured. Cost: one run, about 14 to 18 agents, 4M to 6M.
2. **Now, three worker sessions, no batch, in parallel with 7.** (a) The ranges shadow: a library copy with the scalar ranges over `ZZ32` alone through the distance stage, so that decision 3 rests on a measured count and not on the 330 by reading; cost one session. (b) The checker shadow for face A: a coercion retry after inference in `checkApplicableWithInference`, run on this plan's probes and on the A0 library copy, so that the numerics batch's checker rung has its shape and its count before it is briefed (Pavol's rule of 2026-09-22); one session. (c) Decision D's diff: the sized signatures of C4's vocabulary written as a diff against `run-c4/src/FlatArrays.fsi`, measured by this plan's driver (the 15 errors as its target), shown to Pavol before any array rung; one session.
3. **Batch N, the numerics, four rungs, before 7b.** N-check (Scala): face A's rule and face C's context in the checker; closes row 388's compiled half, row 425, row 447, clears N1 and N2 (364 under the switch-over's setting; 6 in microGPT) and, with a sibling `IntLiteral`, I3's 149 by the rule or nothing by the library's respelling. N-walk (Java): the same rule in `EvaluatorBase`, `OverloadedFunction` and `Coercions`; closes rows 388 (walk), 389, 432 and the walk half of answer 8; its test is this plan's walk cases turned into a corpus file with the specification's answers. N-lib: the numeral's declaration per decision 2, its coercions, row 358's bounds and the dummy device, row 421's four lines if L has not landed, or, under decision 3, the ranges over `ZZ32` in place of the bounds and the device; a library rung, large under decision 3. N-spec: the type-inference chapter written (the rule, the promotion rule, the numeral's type and its coercions), in the S1 form, landing only if N-check lands. Clears, measured or by reading: faces A and C wholly, face B's library half; 274 to 44 by the triage's own measurement on the integer family, 364 natives, or about 330 ranges under decision 3. Cost: one run of four, about 20 to 28 agents, 6M to 10M; N-walk and 7b's W both edit `OverloadedFunction.java`, so the two batches are sequential, not merged.
4. **Batch 6.5b (G, V), as drafted, after N or in the slot N leaves.** G is on microGPT's compiled path (row 426 is answer 7's identity on the compiled path; rows 417, 419, 420 are its parallel run). V is the last subtype in the tower. Batch 6.5a (E, P) whenever a slot is free; nothing waits on them.
5. **Batch 7b (S, C, W, L) as drafted**, with L's `StandardMinMax` lines already gone if N-lib took them. Clears 139 plus row 398's soundness. After N because W and N-walk share a file and because L's `CAP` family (56) is gone under decision 3.
6. **Batch 8: the Meet Rule (100, after P2), the one-line slips, S1's 28, the residue by class**, from the distance stage's table.
7. **The switch-over** (natives, names, the linker's row 41; the 225 code-generation refusals on the library, 175 of which follow the checker; the 12 dispatch sets, H's families; `LetFn`, row 304, `AsIfExpr`, `Label`, `VarArgs` as codegen rungs).
8. **MicroGPT compiles**: decision D applied from step 2(c), the dozen small items of 3.6, then the codegen holes (rows 304, 340) and phase 6.

## 5. Batches 6.5, 7 and 7b, rung by rung

- **6.5 E** (a size beyond `NN32`, `NN32`'s `LCM`): keep; correct and decided; moves no error of the distance; not urgent. Pavol's "in one place the worker picked 64-bit integers" is `NatRtBigSize`'s sizes to 2^64-1, which E restates, and the `ZZ64` and `NN` range tests of rung O (rows 450-452), which decision 3 would make moot.
- **6.5 P** (the specification's integer rules, row 394, `QQ`'s listing, re-anchored messages, two owed tests): keep; text only; it shares `numbers.tex` with V and with N-spec, so it runs in a different batch from N-spec.
- **6.5 G** (the compiled loader's race, the parallel task, the generic method, the two dispatch defects, row 351 and row 426): keep and keep early. Row 426 is the compiled `SUM` identity; without it C4's `SUM e` throws compiled. Not a corner.
- **6.5 V** (`RR32` a sibling): keep; small, measured, the tower's last subtype, and it bears on unboxing by static type.
- **6.5 Q1**: option 1, and stronger than the record puts it: the switch as decided breaks 13 declarations of C4 at the checker (measured); it lands inside batch N with the rule, or not at all (decision 2).
- **7 H** (the flattening's remainder): keep, first.
- **7 A** (`tabulate`): keep, first; it also clears 22 of C4's and 18 of the APL program's errors (the diamond through their own objects).
- **7b S, C, W, L**: keep whole, after N. If decision 3 is yes, L loses its `CAP` family (56 errors go with the ranges) and keeps the array `MIN`/`MAX`, `String`'s juxtaposition, `openRangeHelper`, `seq` and row 421.

Where Pavol is wrong: batch 7 is the largest measured lever on the table, not a corner; and G is on microGPT's compiled path. Where he is right: E and P are corners; and the family he names, the numerics, is the largest class planned nowhere (274, plus the numeral decision's cost), and the batches as drafted skirt it.

## 6. Decisions for Pavol

### Decision 1. One design for inference with coercion, on both paths, as batch N

- The question: build the missing inference rule (face A) and the context rule (face C) as one batch of four rungs right after batch 7, ahead of 7b?
- Context: the specification's inference chapter is empty and cites itself for exactly this (`overloading.tex:173-175`); the compiled checker has the coercion step only for non-generic declarations (`Functionals.scala:278-340`), walk skips generics in its coercion pass (`OverloadedFunction.java:826`); the rule Pavol already took for numbers (answer 8) is this rule's number case; peers: Julia promotes, Java and C# widen at a known target only, Rust and Haskell infer and never coerce. Measured: the shape fails the same way on both paths (this plan, 3.1); face C is 364 errors under the switch-over's setting.
- Options: (1) batch N as section 4 step 3, after 7 and before 7b. (2) The same rungs folded into 7b (C widened with face A, W widened with N-walk, S with the inference chapter, L with N-lib): one batch of four larger rungs, 9 to 15 hours in one piece. (3) Leave it in batch 8 as the plan has it (answer 8 "in the checker phase", row 388 with it), after 7b.
- A yes to 1 commits him to a Scala rung and a Java rung in one run (as batches 3.5, 4 and 5 did), the specification's inference chapter written in the S1 form, and 7b moved one batch later. A no (option 3) costs nothing now and leaves the numeral switch and the ranges decision without their rule.
- Recommended: 1.

### Decision 2. Which `IntLiteral` the one library carries

- The question: does the one library take the compiler library's `IntLiteral`, a sibling under `Number` with coercions, as decided on 2026-09-27, or keep the team's interpreter shape, `object IntLiteral extends ZZ32`?
- Context: the specification wants a numeral's own type with library coercions (`literals.tex:127-148`) and never wrote the hierarchy; the compiler library is the implementers' sibling model (2009, "as we gradually migrate to a flat numeric hierarchy"); the interpreter library's object below `ZZ32` carries the team's own note "do not enable these until coercion is implemented", and coercion is implemented under walk since rung C. Measured: the sibling model adds 35 library errors and refuses every numeral-started range in microGPT unless decision 1 lands (this plan, 3.2); today's model gives the checker `I = ZZ32` for `0#n` and leaves rows 79, 443 and 437 open. After the switch-over the compiled checker reads the one library's declaration, whichever it is.
- Options: (1) The sibling, landed inside batch N with decision 1's rule, the numeral coercions declared as the compiler library declares them, walk's `FIntLiteral.make` giving every numeral the library's `IntLiteral`; closes rows 79, 443, 437, 432 and the identity functions' `cast[\T\](0)`. (2) Keep `IntLiteral extends ZZ32` and give a numeral beyond `ZZ32` the library's `ZZ64` or `ZZ` type under walk with `RR64` coercing from it explicitly as decided; rows 79 and 443 stay as documented divergences; no rule needed for numerals. (3) The switch as decided, ahead of the rule: refused by the measurement.
- A yes to 1 commits him to decision 1 first and to the library's numeral sites respelled (`0 asif ZZ32`, `getter zero(): ZZ32 = 0` under row 387, about 38 `asif` sites). A no keeps today's model, which every program on record runs on.
- Recommended: 1, only with decision 1; else 2.

### Decision 3. Ranges over `ZZ32` alone

- The question: make the library's scalar ranges (`RangeInternals`, the range operators of `FortressLibrary`) monomorphic over `ZZ32`, as the compiler library's ranges are (`CompilerLibrary.fsi:173-174`) and as Pavol said on 2026-09-27, instead of generic over `I extends AnyIntegral`?
- Context: the specification's ranges chapter speaks of "integer values" and names no width (`ranges.tex`); the one library's generic ranges are the 2008 design, the compiler library's `ZZ32` ranges the implementers' later one; a `nat` is an `NN32` and a JVM array index a `ZZ32` (POSITIONS 2026-09-27). The record holds no decision on range widths, only on a size's range. Measured: `RangeInternals` carries 411 of the library's 1,738 errors, 249 of them integer-generic code, 18 abstract methods at the objects' own types, 56 the `CAP` families (3.5); ranges over `ZZ64` or `NN32` appear in the corpus in one revival test (row 452's `XXXRangeSizeZZ64RungO`) and nowhere in the library, the demos or microGPT (a grep, this plan). By reading, about 330 errors go; the tuple ranges `(I,J)` become `(ZZ32,ZZ32)`; the two-thousand-line file is respelled mechanically; rows 450-452's `ZZ64` and `NN` faces close as moot.
- Options: (1) Yes: a library rung in batch N, briefed after step 2(a)'s shadow has measured it, replacing row 358's bounds, the dummy device and the numeral rule's library use. (2) No: keep the generic ranges, respell row 358's bounds and the device (measured 85), and take I3's 138 by the checker's numeral rule or the `x.zero` respelling.
- A yes commits him to a library that indexes with `ZZ32` only, the specification's ranges section saying so in the S1 form, and one revival test restated. A no keeps the 2008 design and pays for it with a checker rule or 130 respelled sites.
- Recommended: 1, after the shadow's number.

### Decision 4. The order of the batches

- The question: 7, then N, then 6.5b (G, V), then 7b, then 6.5a (E, P), then 8?
- Context: section 4; 7 is measured largest; N carries decisions 1 to 3; G holds row 426 on microGPT's compiled path; E and P move no error.
- Options: (1) That order. (2) The record's: 6.5 (E, P), 6.5b (G, V), 7, 7b, then N as batch 8. (3) 7 and N in one run of six.
- A yes to 1 moves E and P behind the batches that move the count; a no keeps the drafted order and delays N by two runs.
- Recommended: 1.

### Decision 5. Decision D's diff now, as a worker session

- The question: write the sized signatures of C4's vocabulary now, as a diff shown to him, before phase 5?
- Context: 15 of C4's 24 own errors and 15 of the APL program's 35 are the unsized `Array[\RR64,ZZ32\]` meeting sized library declarations (3.6); the array design review predicted it (`reviews/array-design-review.md`, decisive 1); the library-route judgement wanted the diff "as soon as step 3 lands"; the plan holds it in phase 5.
- Options: (1) One worker session now, this plan's driver as its measure, the diff parked until phase 5. (2) Wait for phase 5.
- A yes costs one session and buys the shape of microGPT's own gate before the switch-over is designed; a no costs nothing now.
- Recommended: 1.

### Decision 6. Face C by the checker, not by the library's line

- The question: the natives' result type (340) and `fail`'s (24 plus microGPT's 6) solved from the declared return type in the checker (N-check), or the one-line `builtinPrimitive[\T extends Object\]`?
- Context: 3.3; the line is a hack that fixes the natives only; the checker's fix also serves every program's `f[\T\](): T` under the switch-over's bound `Any`; at the switch-over the `builtinPrimitive` bodies are replaced anyway (row 309).
- Options: (1) The checker, in N-check. (2) The library line now, in batch 7 as a third rung.
- A yes to 1 puts 364 errors on N-check's count; a no clears 340 in batch 7 and leaves `fail` and the programs' shape.
- Recommended: 1.

## 7. What was measured, what is inferred, what was not checked

Measured (this plan, `numerics-plan-fable/probes/`, machine on each capture: nproc 4, Intel Xeon @ 2.10GHz, 2100 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`, load 0.2 to 3, nothing else running):

- The one shape on both paths, 27 walk cases and 17 compiled cases (`one-shape/`): the results of 3.1 and 3.2. Found on the way and reproduced, not new: an `Any` arm beside a coercion declared in the component crashes the compiled run (row 390; `comp2/`, `comp3/`); its minimal form without the coercion runs (`comp4/EeMin`).
- MicroGPT's own distance under the one library (`microgpt-distance/`): C4 46, APL 53, by stage and by line; against the numeral-switch copy A0: 13 declarations of C4 and 11 of the APL program newly refused at `#`, the two diffs beside them.
- `RangeInternals`' 411 errors by class, from the triage's own per-error list.
- Counts of numeral-started ranges (25 and 25) and of wider-than-`ZZ32` ranges in the corpus (one test), by grep.

Inferred, by reading:

- The 330 errors that ranges over `ZZ32` alone would clear (3.5); step 2(a) measures it.
- That face A's rule as sketched clears I3's 149 with a sibling `IntLiteral`; the triage's shadow measured a subtyping stand-in (126 of 138), not a converting rule; step 2(b) measures it.
- That the compiled run-time `FIntLiteral` will implement the one library's `IntLiteral` after the natives are rebound (3.2).
- The costs, by the record's arithmetic.

Not checked: the gate; walk on any respelled library; the design of N-walk's changes beyond the sites named; whether `matShape`'s `((), ())` and the varargs `SUM` are checker defects or the programs' (two small rows to open at the switch-over's design).
