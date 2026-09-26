# Row 388 with a container-fixed type variable: the `Box` probe

This probe settles the prediction in section 3 of
[the integration review](../numeric-hierarchy-integration-review.md): a spelling that
forwards to a coercion-accepting method can still refuse the coercion, because its
own static parameters are inferred. It was run on 2026-09-26 at `3d5be3142` through
`3abddc039`; the commits in between touch only documents under `explorations/`.

## What was run

Four probe files share their declarations and differ only in `run()`: `BoxMethod.fss`,
`BoxExplicit.fss`, `BoxInferred.fss` and `BoxJuxt.fss`.

- `Wide` and `Narrow` are rung C's (`ProjectFortress/tests/Coercion*RungC.fss`).
  `Wide` declares `coerce(x: Narrow)`, the two exclude each other, and `big`/`small`
  are `ZZ32`, as in the compiled rung C test.
- `object Box[\T\]()` declares `accept(x: T): T = x`, so it is invariant in `T`.
- `acceptBox[\T\](b: Box[\T\], x: T): T = b.accept(x)`.
- `opr juxtaposition[\T\](b: Box[\T\], x: T): T = b.accept(x)`. This is the shape of the
  library's scalar products, `Library/FortressLibrary.fss:2650-2660` for `Matrix` and
  `:2273-2283` for `Vector`.
- The variables are explicitly typed: `b: Box[\Wide\]`, `w: Wide = WideOf(1)` and
  `n: Narrow = NarrowOf(3)`. Each file first calls its spelling with `w` as a control,
  then with `n`, and binds the result to `r: Wide` and prints `r.big`. A result that
  had not been converted would have no `big`.

`run.sh` runs each file on walk (`bin/fortress <Name>.fss`) in a private cache. For the
compiled path it compiles into a copy of a private cache, where `AnyType`,
`CompilerBuiltin`, `CompilerAlgebra`, `CompilerLibrary` and `CompilerSystem` were
compiled first, in that order. It then runs `MainWrapper <Name>` on that cache. The
captures are `<Name>.walk.txt` and `<Name>.comp.txt`, in this directory, with
`FORTRESS_THREADS=1`.

## Results

| # | spelling | walk | compiled |
|---|---|---|---|
| 1 | `b.accept(n)` | converts, `.big` = 3 | converts, `.big` = 3 |
| 2 | `acceptBox[\Wide\](b, n)` | converts, `.big` = 3 | converts, `.big` = 3 |
| 3 | `acceptBox(b, n)` | refused | refused by the checker |
| 4 | `b n` | refused | refused by the checker |
| 5 | `b n`, with the operator declared in `Box` (`BoxSelfJuxt.fss`, added) | refused | converts, `.big` = 3 |

Every control prints `1`, on every spelling and on both paths. So each refusal is a
refusal of the conversion; the spelling itself works.

The exact errors:

- **Case 3, walk** (`BoxInferred.walk.txt:4-5`):
  `Unification error: Closure/Constructor for acceptBox param 1 (b:Box[\Object\]) got arg Box[\Wide\] of type Box[\Wide\]`.
  Walk's inference does not stop at `n`. It instantiates `T` as `Object` and then fails
  to bind the invariant `Box` parameter (`NonPrimitive.java:256-258`). Row 388's own
  walk message names the converted argument instead (`Cannot unify NarrowOf ... with Wide`).
- **Case 3, compiled** (`BoxInferred.comp.txt:3-4`):
  `Could not check call to function acceptBox` /
  `[\T extends Object\](Box[\T\], T)->T is not applicable to an argument of type (Box[\Wide\], Narrow).`
  This has the form of row 388's compiled message.
- **Case 4, walk** (`BoxJuxt.walk.txt:4-5`):
  `Failed to find any matching overload, args = (Box[\Wide\],NarrowOf)`, followed by the
  whole `juxtaposition` overload set, the probe's generic operator first.
- **Case 4, compiled** (`BoxJuxt.comp.txt:3-12`):
  `Could not check call to operator juxtaposition`. Among nine not-applicable lines is
  `[\T extends Object\](Box[\T\], T)->T is not applicable to an argument of type (Box[\Wide\], Narrow).`
- **Case 5, walk** (`BoxSelfJuxt.walk.txt:4-5`): the same
  `Failed to find any matching overload, args = (Box[\Wide\],NarrowOf)`. The in-trait
  operator is listed as `Box[\T\](uninstantiated)[\T\].juxtaposition(self:Box[\T\],x:T):T`.
  It is a `GenericFunctionalMethod`, which implements `GenericFunctionOrMethod`, and the
  interpreter's coercion pass skips exactly those (`OverloadedFunction.java:826`).

**The prediction holds on both paths:** cases 1 and 2 convert, and cases 3 and 4 are
refused. The only difference from its wording is walk's case 3, which fails after
inference has chosen `T` = `Object`, not in inference itself. Case 5 bears on the
review's caution not to generalise the result to methods of a generic trait. That
caution is right for the compiled path. Under walk, an operator declared in a generic
trait fails the same way as the top-level one.

## Controls with the libraries' own types

**`Box[\RR64\]` with an `i: ZZ32 = 3` argument** (`BoxRR64.fss`):

- **Walk:** all four spellings are accepted, and each prints `3`. A `z: RR64 = 3.0`
  printed on the same run gives `3.0`. The calls are accepted by subtyping in today's
  nested tower, which runs `ZZ32 <: ZZ64 <: ZZ <: … <: AnyIntegral <: QQ <: RR64`
  (`Library/FortressLibrary.fsi:465`, `:499`, `:537`, `:409`, `:373`). Nothing is
  converted: the `RR64`-typed result holds the integer.
- **Compiled:** all four are refused, cases 1 and 2 included
  (`RR64->RR64 is not applicable to an argument of type ZZ32`). The compiled prelude is
  already flat here, since `ZZ32` excludes `RR64` (`CompilerBuiltin.fsi:210`). `RR64`
  declares coercions only from `FloatLiteral` and `RR32` (`:433-435`).

**`Box[\RR64\]` with an `i: RR32 = 1.5` argument** is compiled only, because walk
refuses the binding itself (`RHS expression type FloatLiteral is not assignable to LHS
type RR32`, `BoxRR32.walk.txt:3`). The compiled prelude already has the `Wide`/`Narrow`
shape here: `RR64.coerce(RR32)`, with the two types excluding each other.

- `BoxRR32.fss` has two checker errors, on cases 3 and 4, with the same messages as
  above but with `(Box[\RR64\], RR32)`.
- `BoxRR32Fixed.fss` keeps cases 1 and 2. It compiles, runs and prints `1.5` for both.

So the result holds today on a library type, not only on test traits.

## Row 388: an extension, not a new case

The compiled mechanism is row 388's: `checkApplicableWithInference` infers by
subtyping and does not retry with coercion. The walk entry points are row 388's too:
`EvaluatorBase.inferAndInstantiateGenericFunction` and the skip of generic overloads
at `OverloadedFunction.java:826`. The row's note should gain:

1. **The shape.** The converted parameter can be typed by a bare type variable that
   another argument fixes exactly, here an invariant container. It need not have a
   declared non-generic type. Both paths refuse it (cases 3 and 4, with the probe files
   and captures above).
2. **The walk message for that shape.** Inference instantiates `T` as `Object`, and the
   error names the container parameter, not the converted argument. At an operator, the
   message is `Failed to find any matching overload`.
3. **The fix sketch, widened.** "Infer with the positions whose declared type has a
   coercion set aside" does not reach `x: T`, because `T` has no coercion. `T` must be
   inferred from the positions that fix it. The remaining positions are then checked,
   with coercion allowed, against the instantiated type. This applies on both paths.
4. **Walk, generic traits.** Walk's skip also covers an operator declared as a
   functional method of a generic trait (case 5). The compiled path converts there.
5. **A library instance on the compiled path today:** `Box[\RR64\]` with `RR32`.

## What it means for the library's operator spellings after flattening

The library's scalar products are top-level generic operators. `T` comes from the
container, and the scalar is `other: T` (`FortressLibrary.fss:2273-2283`,
`:2650-2660`). Today walk accepts `m i`, with `m` a `Matrix[\RR64,…\]` and `i` a
`ZZ32`, by subtyping (the `BoxRR64` control).

After flattening, `ZZ32` is no longer a subtype of `RR64`. With `RR64.coerce(ZZ32)`
added, `m.scale(i)` has case 1's shape and converts. `m i` has case 4's shape and is
refused on both paths while row 388 stands. The two spellings then no longer accept the
same arguments, although one forwards to the other.

Explicit static arguments (case 2) avoid the refusal on both paths, but a user does not
write them on an operator. Moving the operator into the trait, as `MultiplicativeRing`
does (`FortressLibrary.fss:347`), helps only the compiled path today (case 5).

So mixed-width scalar products that rely on the new coercions need row 388 fixed on both
paths, with the widening in items 3 and 4. This note measures no alternative spelling
beyond case 5 and chooses none.
