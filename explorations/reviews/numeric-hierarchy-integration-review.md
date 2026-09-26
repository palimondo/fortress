<!-- Source review of route A through C4's scalar-to-matrix path, prepared 2026-09-26 by an OpenAI assistant. Baseline c5eada1b27dcc9c925cbace6c960e48b201dd1f3. Repository sources and existing captures were read; no compiler, interpreter, numerical probe or gate was run for this review. Proposed checks below are not results. -->

# Numerical flattening: the scalar-to-matrix integration contract

**Conclusion:** route A gives concrete scalar types useful self-typed algebra, but that does not by itself justify the existing generic array bodies. The library needs an explicit account of which operations close over an element type, how their generic call sites admit coercion, and how reductions obtain a correctly typed identity. These are acceptance obligations for the agreed route, not a proposal to reopen the exclusion decision.

This review follows C4's `x1 wq^T` through matrix views to scalar arithmetic, with its normalization and empty offset sum as adjacent clients. It contributes one concrete consequence of the known generic-coercion gap and sharpens two obligations already implicit in the library work. It does not establish a new compiler failure by execution.

## Baseline and what changed during the review

The review began at `0b4568a3d` and was resumed, at Pavol's request, on `c5eada1b2`. The analysis branch was fast-forwarded before continuing. On that second baseline:

- Interpreter coercion is landed, with explicit limitations and expected-failure tests. Saying that the interpreter has no coercion is now wrong. [C1]
- `Diag` now overrides `Matrix.mul`; the library's ordinary product dispatch reaches it. This is implemented, not an outstanding design suggestion. [M2]
- The approved plan puts flattening and the number chapters in batch 6. The reported checker count is 125; the estimate after flattening is about 44, not the older 22, and neither count establishes component-body correctness. The plan already places generic array design and the model's static types later. [P1]

The code observations below were rechecked on the second baseline. Two delegated read-only traces covered algebra/inheritance and coercion/applicability; the coordinator checked the key source excerpts and synthesized this note. Neither trace was blinded from prior project research. No transcript recovery, executable changes, or long computation was attempted.

## 1. One real implementation chain

The model declares `^T` over `Matrix[\RR64,r,c\]` and writes `x1 wq^T`. Its weight view is a `PView` extending the standard `Matrix[\RR64,r,c\]`. `PView` implements access to the flat parameter storage and the allocation hook; it inherits matrix arithmetic. [M1, M2]

The path is concrete:

1. The model's `^T` calls `transpose`, which calls `Matrix.t()`.
2. The library's matrix juxtaposition calls `me.mul[\p\](other)`.
3. `Matrix.mul` reads elements through the views, multiplies them, and accumulates into element type `T`.
4. With C4's `RR64` elements, the scalar operations eventually reach floating-point implementations. Today's `Number` catch-alls cover combinations not accepted by the narrower native `Float` signatures. Route A moves that responsibility to the scalar leaves and coercions. [M3, A1, A2]

This is shared implementation through ordinary library interfaces. The matrix expression and indexed accesses participate in the same implementation; the renderer is not choosing the algorithm or proving equivalence. The now-landed `Diag.mul` makes the same point: a different product implementation sits behind the existing matrix product spelling. [M2, M3]

The current model exposes many values as unsized `Array` types. Its interpreter success does not settle the compiler's separate problem of recovering the required sized interfaces. That is already recorded in the plan and is not a new consequence of flattening. [P1]

## 2. A valid element bound is not a proof of closure

The current vector bodies require `T + T -> T`, subtraction returning `T`, multiplication returning `T`, and a dot product returning `T`. The matrix multiplication body makes the requirement especially visible:

```fortress
pr : T = get(a,b) other.get(b,c)
res.put((a,c), res.get(a,c) + pr)
```

Yet their declaration says only `T extends Number`. Today's `Number` arithmetic returns `RR64`, and today's `SUM` returns `Number`. Neither signature establishes a result of every possible subtype `T`. After flattening, `Number` supplies no arithmetic at all. [A1, M3, R1]

**This is partly a pre-existing unchecked obligation, not a soundness defect newly created by route A.** The old count measured hierarchy/API checks and never reached the component bodies. Equipping `RR64` with `AdditiveGroup[\RR64\]` and `MultiplicativeRing[\RR64\]` supplies evidence for that particular scalar type; a body checked under only `T extends Number` cannot assume every leaf has those contracts. [A3, P2]

The earlier account that `Vector[T extends Number]` “stays valid” needs this qualification: numeric membership and the declaration's spelling survive; generic arithmetic-body validity has not been established. A copying operation such as C4's generic `gather` and an arithmetic operation such as `Matrix.mul` do not have the same requirements. [P3, M2]

A tempting blanket repair, requiring `MultiplicativeRing[T]` on every numeric container, is not justified by the chosen design either. The flat sketch gives `Integral[I]` `AdditiveGroup[I]`, not `MultiplicativeRing[I]`. Its multiplication returns `I`, but its exponentiation returns `RR64`, whereas the ring trait demands a result of `T`. C4 also needs integer vectors for keys and indices. Such a bound would exclude useful existing clients. [A1, A3, M2]

**Consequence for the library rung:** record the required capabilities per operation and check the actual generic bodies. Do not silently equate numeric membership, closed multiplication, ordering, and membership of the whole ring interface. Selecting a repair requires the project's normal design review; this note does not select a new trait or array architecture.

The inherited-code account also needs precision. `AdditiveGroup` declares `+` and supplies defaults for binary minus, unary minus and zero. `Vector` and `Matrix` implement all three addition/subtraction operators themselves and inherit zero; their views inherit those concrete container implementations. Complex `C`, by comparison, gets binary minus and juxtaposition from algebra defaults. These are distinct forms of reuse. None of those method signatures proves associativity or numerical stability. [A1, M3, A4]

## 3. Equivalent-looking spellings can have different applicability

Rung C already documents **row 388**: an inferred generic function can fail to accept a coercion even when one parameter's target type is known. Both paths have permanent expected-failure tests. This is not a new discovery here. [C1, C2]

The compiler explicitly separates static inference from the coercion-capable fixed-domain path. Inference constrains arguments by subtyping; failure does not trigger a generic-with-coercion retry. The interpreter likewise infers before calling a generic, and its fallback coercion pass skips generic overloads. Explicit static arguments can avoid this boundary; rung C already has a successful explicit-instantiation differential. [C3, C4]

The additional consequence concerns the library's own spelling choices:

```fortress
(* Inside Matrix[T,...], with no method static parameters: *)
scale(t1: T): Matrix[T,...] = ...

(* At top level, with T and sizes inferred: *)
opr juxtaposition[\T extends Number, nat n, nat m\]
    (me: Matrix[\T,n,m\], other: T): Matrix[\T,n,m\] = me.scale(other)
```

The first line is schematic; the actual declarations are at [M3]. For a receiver whose element type is fixed as `RR64` and an argument variable of type `ZZ32`, `m.scale(i)` can reach fixed-target coercion. The spelling `m i` first has to infer the top-level operator's parameters. After flattening, adding `RR64.coerce(ZZ32)` alone does not establish that this second spelling works.

**Prediction, not measured:** these two spellings may diverge in applicability even though one delegates to the other. The same concern applies to the library's generic array/scalar extension. Do not generalize it to every method on a generic trait: receiver-based inference is a separate path. [C3, M3]

The smallest useful check needs no matrix storage or runtime sizes. Reuse rung C's `Wide`/`Narrow` coercion with an invariant `Box[T]`, a non-generic method `accept(x:T):T`, and a top-level `acceptBox[T](b:Box[T],x:T):T`. Compare:

- `b.accept(n)`;
- `acceptBox[\Wide\](b,n)`;
- `acceptBox(b,n)`.

Use explicitly typed variables `b:Box[Wide]` and `n:Narrow`, and inspect the same returned `Wide` value. The prediction is that the first two convert and the third fails inference. It extends row 388 with a container-constrained type variable; it should not become a duplicate ledger defect. The real `m.scale(i)`/`m i` pair follows once the relevant library and size prerequisites are available.

This matters to evaluation of notation: delegation to one body establishes a relationship between implementations, but equivalent applicability also depends on each spelling's inference and coercion boundary.

## 4. Empty reductions need a type as well as a value

The empty-sum requirement is already decided: C4's `matOffset(0)` must remain zero. Its declared result is `ZZ32`. Separately, vector `dot` and matrix `rmul`/`lmul` promise a result of their element type `T`, while the existing reduction returns `Number`. [M1, M3, R1, P1]

The replacement therefore needs acceptance checks for both value and advertised result type, including empty `RR64` reductions. A getter `x.zero` does not alone solve an empty generator's identity: there is no element `x` to ask. It also does not turn the instance-level algebra interface into a type-level identity factory.

This narrows the pending reduction decision without choosing among its options. A per-type reduction or another source of a typed identity must be shown to preserve the intended callers. An explicit, supported result conversion could form part of that account; silently returning an integer and relying on today's subtype chain cannot.

## 5. Checks worth carrying into the existing work

These are proposals, not tests run by this review. Each isolates an obligation; none requires transformer training.

| Check | What it distinguishes | Where it belongs |
|---|---|---|
| Check a generic `T + T -> T` body under `T extends Number`, then under an appropriate algebra bound; retain concrete `RR64` and integer controls | A surviving type name versus sufficient evidence for the body; old deficiency versus changed behavior | Flattening/library-body checking |
| The three `Box` calls above, then actual matrix method/operator calls | Declared coercion versus inferred generic applicability | Existing row 388; matrix integration after prerequisites |
| Empty and nonempty `SUM` over `ZZ32` and `RR64`, `matOffset(0)`, and a dot product whose result is assigned to its declared element type | Correct identity value, result type and nonempty accumulation | Pending `SUM` replacement |
| A tiny `PView`/transpose product, with ordinary matrix and integer-key controls; retain the landed diagonal dispatch check | Shared library bodies, scalar closure, preserved integer containers and specialised dispatch | Library integration, reusing existing diagonal evidence |

For the final product check, two rows and a few columns with exactly representable values suffice. First verify component-body checking; only then treat execution as evidence for those checked declarations. Existing C4 goldens remain useful integration evidence, but cannot substitute for the missing static obligations.

**Requested follow-through:** attach these obligations to the flattening and reduction briefs, and relate the container test to row 388. Keep the already approved route and batch order. No new ledger row, source repair, changed model line, or launch is authorized by this report itself.

## Evidence map

Source line references use baseline `c5eada1b27dcc9c925cbace6c960e48b201dd1f3`; links are pinned where source movement would obscure the claim. Prior probe outcomes remain attributed to their original records.

- **[P1]** [Approved plan](../coordinator/PLAN.md), phases 1–5 and answers 6–8; [positions](../coordinator/POSITIONS.md), route A on 09-24 and plan on 09-26.
- **[P2]** [Price of keeping the rule](mie-probes/price-keep-the-rule.md), §§ 5–6: masked counts and component not checked. This review does not remeasure them. The latest switch-over-distance report was not yet present at this baseline.
- **[P3]** [Flat world for users](mie-probes/flat-world-for-users.md), § 2 on surviving bounds and § 4 on inherited operations; the qualifications above apply to those statements.
- **[M1]** [MicroGptFlat.fss](https://github.com/palimondo/fortress/blob/c5eada1b27dcc9c925cbace6c960e48b201dd1f3/explorations/run-c4/src/MicroGptFlat.fss#L23-L70): transpose, normalization, empty offset sum, projection and explicit backward pass. C4 uses `RR64` arrays; this witness is not the earlier scalar-autodiff port.
- **[M2]** [FlatArrays.fss](https://github.com/palimondo/fortress/blob/c5eada1b27dcc9c925cbace6c960e48b201dd1f3/explorations/run-c4/src/FlatArrays.fss): `Diag` 36–42, transpose 50, parameter view 55–64, gather and integer-key clients 169–178.
- **[M3]** [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/c5eada1b27dcc9c925cbace6c960e48b201dd1f3/Library/FortressLibrary.fss): vector 2195–2207, matrix bodies 2503–2566, transpose view 2579–2593, operator forwarding 2631–2660, array/scalar extension 4511–4521. API promises: [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/c5eada1b27dcc9c925cbace6c960e48b201dd1f3/Library/FortressLibrary.fsi#L1465-L1473) 1465–1473 and 1583–1593.
- **[A1]** [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/c5eada1b27dcc9c925cbace6c960e48b201dd1f3/Library/FortressLibrary.fss#L331-L407): algebra defaults 331–349, `Number` arithmetic 378–407; integer contracts 615–640. The marker traits have no operation bodies.
- **[A2]** [FortressBuiltin.fss](https://github.com/palimondo/fortress/blob/c5eada1b27dcc9c925cbace6c960e48b201dd1f3/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#L103-L115): native `Float` arithmetic.
- **[A3]** [Flat tower sketch](mie-probes/keep/flat-tower-sketch.fsi), 26–48, 77–81. It explicitly labels itself an excerpt, not a compilable API; it is a proposed contract, not landed source.
- **[A4]** [complex_ring.fss](../../explorations/complex_ring.fss), 8–15.
- **[R1]** [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/c5eada1b27dcc9c925cbace6c960e48b201dd1f3/Library/FortressLibrary.fss#L3031-L3070): `SumReduction.empty`, its `Number` result, and generic `SUM` 3053–3057.
- **[C1]** [Landed coercion report](../compile-ladder/rung-interp-coercion/REPORT.md), §§ 1, 8–9; [ledger](../fortress-gap-ledger.md), row 388. Known limitations remain distinct from the agreed runtime/static selection divergence.
- **[C2]** Permanent witnesses: [interpreter generic coercion test](../../ProjectFortress/tests/XXXCoercionGenericFnRungC.fss), [compiled counterpart](../../ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.fss). Existing successful explicit-instantiation differential: [SkGenericInst.fss](../compile-ladder/rung-interp-coercion/probes/skeptic/SkGenericInst.fss), 18–27; [capture](../compile-ladder/rung-interp-coercion/probes/skeptic/diff-1.txt), 184–209.
- **[C3]** Compiler [Functionals.scala](https://github.com/palimondo/fortress/blob/c5eada1b27dcc9c925cbace6c960e48b201dd1f3/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala), 160–163, 224–258, 285–291, 441–448, 645–648; [STypesUtil.scala](https://github.com/palimondo/fortress/blob/c5eada1b27dcc9c925cbace6c960e48b201dd1f3/ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala), 933–946, 1017, 1038–1061.
- **[C4]** Interpreter [OverloadedFunction.java](https://github.com/palimondo/fortress/blob/c5eada1b27dcc9c925cbace6c960e48b201dd1f3/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java), 790–792, 826, 871–889; `GenericFunctionOrConstructor.java` 51–57, `EvaluatorBase.java` 134–177, `NonPrimitive.java` 171–176 and 256–258 in the same interpreter tree.
