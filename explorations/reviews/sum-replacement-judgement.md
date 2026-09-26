<!--
2026-09-26. The top-tier judgement on answer 7 of the plan (what replaces SUM's and PROD's
catch-all on Number), prepared for Pavol before anything is built, under his permission of
2026-09-26 (POSITIONS, answer 7). Sources: the clean list explorations/reviews/flattening-
questions-ways.md Question 1 and its probes; Astra's review numeric-hierarchy-integration-
review.md § 4; POSITIONS 2026-09-24 (route A) and 2026-09-26 (answers 8 and 10); FACTS § The
checker and the one library; Library/FortressLibrary.{fss,fsi}, Library/List.fss,
Library/CompilerLibrary.{fss,fsi}, ProjectFortress/BirdyLib/Bazaar.{fsi,fss}; the
specification's reductions.tex and defining-generators.tex; the interpreter's
EvaluatorBase.java and the checker's Functionals.scala; the team's tests and demos; and
ten new probes on both paths, and three of the team's tests run stock and under a one-class interpreter shadow, with their captures under sum-replacement-judgement/ (walk.sh,
check.sh, comp.sh, walk-shadow.sh, walk-stock.sh; the library copies made by variants/*.py
in a private scratch directory, nothing tracked touched). Machine for every capture: 4
cores, Intel Xeon 2.10 GHz, JDK 25.0.4, FORTRESS_THREADS=1, load 4 to 13 because climb
batch 5 ran beside the probes; no timing was taken and none is used.
-->

# The replacement for SUM's and PROD's catch-all: a judgement

## 1. The decision in two sentences

Replace the catch-all with one generic sum reduction and one generic product reduction,
each joining with the element type's own operator and taking its identity (the sum of
nothing) from the static argument alone through the library's own device for choosing by
a static argument, the `typecase` over a `() -> T` witness that `array1` uses; the bare
forms `SUM e`, `SUM vm` and the vector `DOT` need no change of text, and a sum written with
generator clauses whose element type nothing at the call fixes writes its static argument,
`SUM[\ZZ32\][j <- 0#i] matCount(j)`, as the team wrote it in their own tests and demos.
It lands in batch 6's flattening rung, with eleven library sites and 32 test lines written
the same way and two lines of C4's model, one of its vocabulary and five of its check
changed; two defects of the compiled path that it
uncovers (the library's `cast` and the checker's inference for a no-argument call) go to
the ledger as work before the switch-over, not as blockers of the rung.

## 2. The terms, once

- **Walk** is the interpreter, `bin/fortress X.fss`. **The checker** is the bytecode
  compiler's static type checker, which after the switch-over will read the interpreter's
  library (`Library/FortressLibrary.fss` and its api `.fsi`) instead of its own smaller
  prelude. **The compiled path** is that compiler end to end; today it runs only with its
  own prelude, so the compiled-run probes below use that prelude, where the number types
  are already siblings.
- **Route A** and **the flat tower** (POSITIONS 2026-09-24): the number types `ZZ32`,
  `ZZ64`, `ZZ`, `QQ`, `RR64` become siblings under `Number`, each with its own algebra, a
  wider type converts from a narrower one by `coerce`, and `Number` loses its
  **catch-alls**, the 52 operators on `Number` that take any number and answer as a float.
- **A reduction** is an object with `join(a, b)`, an associative operation, and `empty()`,
  its **identity**: the value `z` with `z + x = x`, what a sum of nothing is. A generator
  (a range, an array) folds its elements with `join` and may insert `empty()` any number
  of times, so `empty()` is asked for whenever a range is empty.
- **A big operator** is `SUM`, `PROD`, `BIG MAX` and the like. Its **bare form** is `SUM e`
  over a generator; its **clause form** is `SUM[j <- 0#i] body`. The clause form desugars
  (both paths use the same desugarer) to a call of the **no-argument form**, `SUM()`, whose
  result carries the reduction, wrapped by a library function that runs the clauses:
  `__bigOperator(SUM(), fn (r, u) => __generate(0#i, r, fn j => u(body)))`
  (`FortressLibrary.fss:1120-1128`; `PreTypeCheckDesugaringVisitor.java:358-372`).
- **A static argument** is a type written in `[\...\]` at a call, `SUM[\ZZ32\][j <- ...]`.
  When it is not written, each path infers it from the value arguments. The no-argument
  form has none, and both paths then bind the type parameter to **Bottom**, the type no
  value has: walk by choice ("Choosing to erase to bottom", `EvaluatorBase.java:224-226`,
  `:245`), the checker by its inference's last step (`STypesUtil.scala:1937`,
  `Formula.scala:524`).
- **The witness device**: a function `__thrower[\T\](): T` that only throws is a value of
  type `() -> T`, so a `typecase` on it can test what `T` is without any element of `T` in
  hand. The library uses it to pick a vector store when `T` is numeric
  (`FortressLibrary.fss:2241-2248`).
- **C4** is the microGPT program `explorations/run-c4/src/` (the model `MicroGptFlat.fss`,
  the vocabulary `FlatArrays.fss`, the check `MicroGptFlatCheck.fss`).

## 3. How the library solves this itself, today and elsewhere

The standard is the library's own practice (POSITIONS 2026-09-19), so this comes first.

1. **Today's `SUM`** is one object `SumReduction` over `Number`, `empty(): Number = 0`,
   `join(a, b) = a + b` through the catch-all, under the team's own comment "Hack to
   permit any Number to work non-parametrically" (`FortressLibrary.fss:3032-3057`; born in
   Maessen's 1c492019f, 2007-12-13, "the declarations are correct but don't yield as
   specific type information as one would like"). The result type is `Number` whatever the
   elements, and the empty sum is the integer `0` whatever the elements: over an empty
   `RR64` array, in a function declared `RR64`, and for the `DOT` of two empty `RR64`
   vectors (`flattening-questions-ways/Q1SumWalk.walk.txt`). It passes today only because
   an integer is an `RR64` in the nested tower; on the flat tower that is the defect
   Astra's check names (§ 4 of the review).
2. **`BIG MIN` and `BIG MAX`** are the library's generic pattern: `MinReduction[\T extends
   StandardMin[\T\]\]`, joined with `T`'s own operator, no identity, the empty case
   throws `EmptyReduction` (`:3117-3133`). The detail that matters below: the reduction is
   lifted to `AnyMaybe`, so no parameter of the object is typed `T` (`AssociativeReduction`,
   `:2907-2927`), and the list comprehension's reduction does the same with `AnyCovColl`
   (`List.fss:177-180`). That is what lets the clause form run on walk with `T` unknown.
3. **`BIG BITXOR`**: Steele wrote the generic reduction with `empty(): T = 0`, commented it
   out and shipped the `ZZ32`-only one (`:3281-3307`, 9fadbf62e, 2010). **`BIG MINNUM` and
   `BIG MAXNUM`** are `RR64`-only, built from a join and a written identity with
   `MapReduceReduction` (`:3149-3161`, `:3361-3365`). The compiled prelude's
   `ZZ32Addition` and its no-argument `BIG +()` are non-generic (`CompilerLibrary.fss:463-
   481`); the 2012 BirdyLib port gives the `RR64` sum another name, `BIG $`
   (`BirdyLib/Bazaar.fsi:20-22`).
4. **Choosing by a static argument alone** is the witness `typecase` of `array1`
   (`:2241-2248`); the team's own note on its limit is at `strToInt`: "there's no clean way
   to convert all the arithmetic to use a provided type without having an instance of that
   type in hand" (`:4180-4183`).
5. **Writing the static argument** on a clause form is the team's practice wherever the
   reduction's type is not fixed by an argument: `SUM[\Number\][ g <- gg ] SUM[ n <- g ] n^2`
   (`tests/setSum.fss:23`), `BIG STAR[\ZZ32\] [x<-0#10] x` (`tests/simpleBig.fss:37`),
   `BIG CONCAT[\ZZ32\][x <- li, ...]` (`tests/ArrayListQuick.fss:106`,
   `PureListQuick.fss:106`), `BIG UNIONPLUS[\ZZ32\][sd <- snipData]` (`demos/BirdCount*.fss`).
   Ledger row 135 records the failure when it is not written (`BIG UNION` over maps: "the
   reduction's empty element is built at BOTTOM and never unifies with the first real map").
6. **The specification** desugars a sum by the type `N` of the expression, `SUM[\N\]` with
   `SumReduction[\N\]` (`defining-generators.tex:147-157`); its reduction syntax has "an
   optional static arguments" after the big operator (`reductions.tex:23-25`); its worked
   example is the per-type `SumZZ32` (`SpecData/examples/advanced/Generators.ReductionClass.fss`);
   the empty reduction is the identity (`defining-generators.tex:42-61`).

So the library has three answers to a typed sum on record: one object per type (3), a
generic object that keeps `T` out of its parameters and has no identity (2), and a static
argument written by the caller (5). It has never had a generic reduction with a typed
identity; the one Steele wrote is commented out. The specification's design is the generic
one, driven by types the desugaring is supposed to know.

## 4. The options

### A. One generic reduction per operator, the identity from the static argument (recommended)

**The library.** In `FortressLibrary.fss` (and its api), `SumReduction`, `ProdReduction`
and the four `SUM`/`PROD` declarations (`:3032-3074`) become:

```fortress
additiveIdentity[\T extends AdditiveGroup[\T\]\](): T =
    typecase __thrower[\T\] of
        () -> ZZ32 => 0            () -> ZZ64 => widen(0)
        () -> NN32 => unsigned(0)  () -> NN64 => unsigned(widen(0))
        () -> ZZ   => big(widen(0))
        () -> QQ   => big(widen(0)) / big(widen(1))
        () -> RR64 => 0.0
        else => 0
    end
(* multiplicativeIdentity[\T extends MultiplicativeRing[\T\]\]() the same with 1 *)

object SumReduction[\T extends AdditiveGroup[\T\]\] extends CommutativeMonoidReduction[\T\]
    empty(): T = additiveIdentity[\T\]()
    join(a: T, b: T): T = a + b
end
opr SUM[\T extends AdditiveGroup[\T\]\](): BigReduction[\T,T\] = BigReduction[\T,T\](SumReduction[\T\])
opr SUM[\T extends AdditiveGroup[\T\]\](g: Generator[\T\]): T = __bigOperatorSugar[\T,T,T,T\](SUM[\T\](), g)
(* ProdReduction and PROD the same over MultiplicativeRing[\T\], joining by juxtaposition *)
```

The bound is the library's own for a generic reduction (`BIG MAX`'s `StandardMax[\T\]`),
and it is what the checker needs for `a + b` once `Number` has no `+`; every number leaf
carries it on the flat tower, and a sum of vectors comes free. The branches of the
identity function are typed `ZZ32`, `ZZ64`, ... where `T` is declared, which the checker
refuses as written (`Q1ZeroWitnessComp.comp.txt`); each branch value goes through
`cast[\T\]`, the library's own cast, which the checker accepts (`WitnessComp.comp.txt`,
compile rc=0). The `else` is the interpreter's case, see § 5. The five fusion pairs and the
`distribute` overloads (`:3007-3030`, `:3043-3050`, `:3067`) are restated in `T` or dropped
for the rung; the probe copy drops them, and no program uses nested-sum fusion. `BIG MAXN`,
`BIG MINN` and `BIG MINMAXN` (`:3076-3114`), whose identities are the rationals `-1/0` and
`1/0` that no `ZZ32` or `RR64` result can hold ("(what is -1/0?)", the team's comment),
have no caller in the library, the tests, the demos or the programs; the rung drops them,
or keeps the names with each type's least and greatest element by the same device if the
names are wanted. The library's eleven clause-form callers write their static argument:
`SUM[\T\]` in `Vector.dot` (`:2207`), `Matrix.rmul`/`lmul` (`:2557`, `:2562`) and
`Sparse.fss:96`; `SUM[\ZZ32\]` in `strToInt` (`:4192`), `strToFloat` (`:4208`),
`ChunkedSparseArray.fss:161,163`, `PrefixMap.fss:380`, `PrefixSet.fss:374`,
`SkipList.fss:208`. For the generic three the enclosing trait's bound must imply the
algebra (`Vector[\T extends Number\]` today), which is Astra's § 2 obligation already in
the flattening's brief.

**The tests.** Every clause-form `SUM` or `PROD` without a static argument writes one: 25
lines in 8 files of `ProjectFortress/tests` (18 of them `simpleSum.fss`, three of the
files the revival's own rung C tests), 7 lines in one file of `library_tests`; the 137
lines in 24 demos are not gated, and the rung counts which of them run today. The values
printed do not change: on walk a nonempty sum's value and run-time type are those of its
elements, and the empty sums in the tests are integer sums.

**The specification.** Nothing to rewrite: option A is the design of
`defining-generators.tex:147-157`, now carried out, and the "hack" comment goes. One
revival note in the S1 form (POSITIONS 2026-09-26, S1: the team's way of marking
unimplemented design) at `reductions.tex:23-25`, saying that the desugaring is not
type-directed on either implementation, so a clause form whose element type no argument
fixes writes its static arguments, as the team's tests do, with the ledger row.

**C4.** Two tiers, because walk and the checker need different lines. Walk, under option A,
needs the clause-form sums written now:

```diff
--- explorations/run-c4/src/MicroGptFlat.fss
-matOffset(i: ZZ32): ZZ32 = SUM[j <- 0#i] matCount(j)
+matOffset(i: ZZ32): ZZ32 = SUM[\ZZ32\][j <- 0#i] matCount(j)
--- explorations/run-c4/src/FlatArrays.fss
-    out = zeros(SUM[m <- ms] |m|)
+    out = zeros(SUM[\ZZ32\][m <- ms] |m|)
```

and in the check program `MicroGptFlatCheck.fss:56` (`SUM[\ZZ32\][i <- 0#nParams()] ...`)
and `:72` (both sums `SUM[\RR64\][d <- 0#4] ...`). The checker, in addition, needs every
clause-form big operator's static argument, since its no-argument inference binds Bottom
for `BIG MAX` as for `SUM` (§ 5, table 2); for the model this is one more line, and the
spelling can go bare, which the specification makes the same expression
(`reductions.tex:83-88`) and the flat tower makes run on walk (`RR64` becomes
`StandardMax[\RR64\]`; today `BIG MAX z` over an `RR64` array finds no overload,
`Q1MaxBareWalk.walk.txt`):

```diff
--- explorations/run-c4/src/MicroGptFlat.fss
-sm(z: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = do e = exp(z - (BIG MAX[t <- z] t)); e / (SUM e) end
+sm(z: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = do e = exp(z - (BIG MAX z)); e / (SUM e) end
```

and `MicroGptFlatCheck.fss:27, 36, 38` (`BIG MAX[\RR64\][...]`). The APL program has the
same lines (`MicroGptApl.fss:42, 59`, `FlatArrays2.fss:183`, `MicroGptAplCheck.fss:29, 38,
40, 58, 74`, `diag_fwd.fss:25, 34, 43, 47, 50, 52`). No other C4 line changes; `SUM e`,
`SUM vm`, every `x DOT y` and `1.0 s`-style mixing are bare forms or coercions (answer 8).

### B. One reduction object per type, each big operator under its own name

BirdyLib's `BIG +` for `ZZ32` beside `BIG $` for `RR64`; the compiled prelude's
`ZZ32Addition`. It is the only shape the compiled world ever ran, and it types on both paths
with no inference at all. Library: about eight objects and two names per operator; tests:
every real sum respelled; specification: a new operator name; C4: `SUM e`, `SUM vm`, both
check sums and every `DOT` inside the library become the real-sum spelling, six model and
vocabulary lines plus the library's own. It gives up the one generic `SUM` of the
specification for a spelling by width. Not recommended.

### C. A generic sum with no identity, the empty sum an error

`BIG MAX`'s pattern applied to `+`. Library: one object, no identity function, no test
line and no library site to write, since `T` stays out of the parameter positions and the
no-argument form keeps running unwritten on walk. C4: `matOffset(0)` throws, so
`matOffset(i: ZZ32): ZZ32 = if i = 0 then 0 else SUM[j <- 0#i] matCount(j) end`, and every
empty `DOT` throws. Against the specification's rule that the empty reduction is the
identity and against Pavol's "empty sum of 0" on record. Not recommended.

### D. Keep a reduction typed over `Number`, join by a hand-written `typecase`, cast the result

Today's shape kept, its join rewritten as a `typecase` over the leaf pairs because
`Number` will have no `+`, and the answer cast where a `ZZ32` or `RR64` is declared. It
keeps every unwritten clause form running on walk (the `Number` lifting dodges Bottom like
`AnyMaybe` does) and changes no test. But its result is `Number` on the checker, so C4's
`matOffset(): ZZ32` and every declared `RR64` sum need a cast at the call, the vector `dot`
promising `T` cannot be written, and every join boxes and dispatches by hand on every
element: the catch-all under another name, and the slow path for the one program that is
the measure. Not recommended.

### E. The specification's `Identity[\+\]` coerced into each type

`SumReduction[\N\]` with `empty(): N = Identity[\+\]` (`algebraic-constraints.tex:772-797`,
`numbers.tex:184-190`). It needs operator static parameters and `where { T coerces
Identity[\+\] }`, unsupported on both paths (`conversions-coercions.tex:15`), and walk does
not coerce a returned value (`tests/XXXCoercionReturnRungC.fss`). The road for later, when
where-clauses exist; it changes nothing in option A's callers.

## 5. What each path does with each option

Measured means a capture under `sum-replacement-judgement/` or, where named, under
`flattening-questions-ways/`; by reading means from the sources cited.

**Table 1. Option A on walk**, today's tower with the replacement in a private library copy
(`variants/sum.py`; `SumWalk.sum.walk.txt`), against today's library
(`Q1SumWalk.walk.txt`).

| Shape (the C4 line it stands for) | Today | Option A |
|---|---|---|
| clause form, `RR64` body, empty, static argument written, declared `RR64` | `0 : Int` (wrong type) | `0.0 : FloatLiteral` |
| clause form, `ZZ64` body, empty, written | `0 : Int` | `0 : Long` |
| bare `SUM a` over an empty `RR64` array (the type from the generator) | `0 : Int` | `0.0 : FloatLiteral` |
| bare `SUM a` over three `RR64`s (`sm`, `nv = SUM vm`) | `3.75 : Float` | `3.75 : Float` |
| clause form, written, over the empty `RR64` array | `0 : Int` | `0.0 : FloatLiteral` |
| `a DOT a` (the library's `Vector.dot`, a clause form) | `6.6875 : Float`; empty `0 : Int` | dies: `Unification error ... unlift param 1 (r:BOTTOM) got arg 0` at `FortressLibrary.fss:1127`, from `dot` at `:2207`, until `dot` writes `SUM[\T\]` |
| clause form, `ZZ32` body, unwritten (`matOffset(i)`) | `9 : Int`; empty `0 : Int` | dies at the first element, `join param 1 (a:BOTTOM) got arg 0` in the range's `generate` (`RangeInternals.fss:1032`), until `SUM[\ZZ32\]` is written (`SumWalkUnwritten.sum.walk.txt`) |

The mechanism, measured in `WitnessWalk.walk.txt` on today's library: a generic function
called with no argument and no written static argument gets `T = Bottom`; a `typecase` over
the `() -> T` witness then takes its first branch (`() -> Bottom` is a `() -> ZZ32`), so
the integer identity comes out, as today; with the argument written each branch is chosen
right (`zeroOf[\RR64\]() = 0.0`). Bottom is fatal not in the identity but in the reduction
object: instantiated at Bottom, its `unlift(r: T)` and `join(a: T, b: T)` accept no
argument (walk checks method arguments at the call), which is exactly why the library's
own generic reductions keep `T` out of their parameters (§ 3, item 2) and why row 135's
`BIG UNION` fails. A one-line change of walk's erasure from Bottom to the top type was
tried as a shadow class (`walk-shadow.sh`; `WitnessWalk.shadow.walk.txt`,
`SumWalk.sum.shadow.walk.txt`): it changed nothing for a plain bound, because the Bottom
comes from the bounding map, not from those lines, and it broke the self-typed bounds,
where Bottom is the only type that satisfies `T extends StandardMin[\T\]`: `simpleSum.fss`
and `setSum.fss` then fail at `BIG MIN` and the set comprehension where stock passes
(`simpleSum.{stock,shadow}.walk.txt`, `setSum.{stock,shadow}.walk.txt`;
`ArrayListQuick` unchanged). So walk's road, if one is wanted later, is a parameter whose
type erased to Bottom accepting any argument, unmeasured; the road taken now is the team's,
writing the argument.

**Table 2. Option A on the checker**, the flat tower with the replacement in a private
library copy (`variants/flat-sum.py`; `SumCheck.flat-sum.check.txt`), the library api's
own errors dropped so that the component is reached; the control is the flat tower with
today's `SUM` (`ShapesCheck2.flat.check.txt`). Today's nested tower is not usable for this
question: its exclusion errors leave the checker unable to apply even `#` to two `ZZ32`s
(`ShapesCheck2.check.txt`).

| Shape | Flat tower, today's `SUM` (control) | Flat tower, option A |
|---|---|---|
| `SUM[j <- lo#i] (3 j)` declared `ZZ32`, unwritten (`matOffset`) | refused: `__bigOperator` not applicable to `Comprehension[\BottomType,Number,Number,Number\]` | refused: `BottomType->BottomType is not applicable to an argument of type ZZ32` |
| the same with C4's literal `0#i` | (not run) | the same refusal, and no error on `#`: the literal beside a `ZZ32` is fine on the flat tower |
| `SUM[\ZZ32\][j <- lo#i] (3 j)` declared `ZZ32` | refused: result `Number` is not a `ZZ32` | accepted |
| bare `SUM a`, `a: Vector[\RR64,4\]`, declared `RR64` | accepted (as `Number` when so declared) | accepted |
| bare `SUM a`, `a: Array[\RR64,ZZ32\]` (C4's type), declared `RR64` | (not run) | accepted |
| `SUM[d <- lo#4] a[d]` declared `RR64`, unwritten / written | (not run) | refused (Bottom) / accepted |
| `Vector.dot`'s shape, generic `T`, unwritten / written `SUM[\T\]` | (not run) | refused (Bottom) / accepted |
| `SUM[i <- lo#n] (if i = 0 then 1 else 0 end)` declared `ZZ32`, unwritten | (not run) | refused (Bottom) |
| `PROD[j <- one#n] j` declared `ZZ32`, unwritten / written | (not run) | refused / accepted |
| bare `BIG MAX a` over `RR64` | accepted | accepted |
| `BIG MAX[t <- a] t` (C4's `sm`), unwritten / written | refused (Bottom) / accepted | refused (Bottom) / accepted |

The mechanism, by reading (`Functionals.scala:95-100`, `:205-215`, `:224`): the checker
types every argument before it infers the enclosing call, a lambda excepted, and a lambda
is typed only once its expected parameter types hold no inference variable; the no-argument
`SUM()` has nothing to infer `T` from, its `T` is erased to Bottom, and the lambda that
runs the clauses then has a parameter typed `Bottom -> ...` that accepts no element. The
compiled prelude never met this because its no-argument big operators are non-generic. To
infer the type from the clauses the checker would have to solve one inference across a
lambda's body, which its design avoids (`hasInferenceVars` guards); that is a checker
project for the switch-over, not a rung. The desugarer cannot supply the type: it has none.

**Table 3. The devices on the compiled path**, in the compiler's own world, where the
number types are siblings already (`comp.sh`).

| Device | Checker | Run |
|---|---|---|
| the witness `typecase` choosing by `T`, no cast, each branch a string (`WitnessComp2`) | accepted | `ZZ32`, `ZZ64`, `RR64` and `else` each chosen right |
| the same with each branch's value through `cast[\T\]` (`WitnessComp`) | accepted | `CastException` inside `cast` |
| the library's `cast[\T\]` alone: `cast[\ZZ32\](3 + 4)`, `cast[\RR64\](0.0)` (`CastComp`) | accepted | `CastException` at every concrete type, then `NoClassDefFoundError: fortress/CompilerLibrary$y` |
| a marker object `Ty[\T\]` with one overload arm per instantiation and a generic catch-all (`MarkerComp`) | accepted | `VerifyError: Bad return type`, `FRR64` where `FZZ32` is declared |
| the same marker device on walk (`WitnessWalk`) | | the catch-all arm every time, static argument written or not |

So the compiled path chooses the branch right and cannot yet type its value: the library's
`cast`, a `typecase` on the function's own type parameter, never matches on that path,
which also breaks today's `SUM` (`cast[\Number\]` is its unwrap, `:3054`) and every other
use of `cast` in the library. That is a defect of the compiled path to fix before the
switch-over, independent of this decision; its alternative is a checker refinement that
binds `T` inside a witness branch (`() -> ZZ32 => ...` refining `T` to `ZZ32`), which would
make the device statically sound and need no cast. The marker device is dead on both paths
as they are (the compiled dispatcher's return-type defect is on record in FACTS, "a generic
reached through a less specific declaration").

**The other options, in one line each.** B: types on both paths with no inference, by
reading, at the price in § 4. C: the empty case measured today as `EmptyReduction` for `BIG
MAX` (`Q1SumWalk.walk.txt`, last line) is what `matOffset(0)` would meet. D: the unwritten
clause form runs on walk, by reading (the `Number` lifting), and its result is `Number` on
the checker, measured as the control column of table 2. E: refused at the where-clause on
both paths, by reading.

## 6. Recommendation, alternatives, where it lands

**Recommendation: option A**, with the static argument written on every clause-form sum
whose element type nothing at the call fixes. It is what the library does in the same
family where the designers wanted a typed result (§ 3, items 3 and 5) and what the
specification's desugaring table says a sum is; it gives `matOffset(0)` the `ZZ32` zero
and every empty `RR64` sum the `RR64` zero, on both paths, with the type as well as the
value (Astra's check); the bare forms C4 leans on (`SUM e`, `SUM vm`, `DOT`) change no
text and type on the checker over C4's own `Array[\RR64,ZZ32\]`; and a sum over a
`Vector[\RR64\]` is one monomorphic reduction, the shape the goal (compiled and fast)
wants, not a boxed dispatch per element.

**Where it lands.** Batch 6's flattening rung, which the plan already charges with
replacing the catch-all (PLAN.md, phase 2): the library text of § 4 A with all eight leaves
in the identity functions; the eleven library sites and the 32 test lines written, the
test edits flagged as edits to the team's tests; C4's and the APL program's lines as in
§ 4 A, both tiers at once, so the programs are ready for both paths and the goldens are
re-measured once; the S1 note in `reductions.tex`. Three ledger rows at the gather: walk's
erasure of an unwritten static argument to Bottom, which any reduction typed in `T` cannot
survive (row 135 generalised); the checker's inference of a no-argument generic call, which
binds Bottom for every generic big operator's clause form; and the compiled path's
`cast[\T\]`, which never matches. The last two are work before the switch-over.

**Alternatives, for Pavol to weigh.**

1. Apply C4's second tier (the `BIG MAX` lines) later, at the switch-over, since walk does
   not need it; the cost is a second measurement of the goldens then. Recommended against:
   one change, one measurement.
2. Instead of writing the 32 test lines, a walk rung first: a parameter whose type erased
   to Bottom accepts any argument, so the unwritten clause form runs again for every
   generic reduction, row 135 included. Unmeasured; the naive erasure tried here broke the
   self-typed bounds, so the change is in the argument check, not the inference, and its
   gate is the whole interpreter suite. Recommended as later work, not as a condition of
   the rung: the written argument is the team's practice and costs 32 mechanical lines.
3. Keep `BIG MAXN`, `BIG MINN`, `BIG MINMAXN` under their names with each type's least and
   greatest element from the same device (`RR64`'s infinities, the integers' `minimum` and
   `maximum`, no identity for `ZZ` and `QQ`), instead of dropping three operators nobody
   calls. A few lines either way.
4. Option C for `SUM` alone, if Pavol would rather change `matOffset` than write static
   arguments anywhere: one guarded line in C4, no test line, no library site, and every
   empty `DOT` an error. Against the specification's identity rule; not recommended.

**What needs his decision:** A as recommended, or alternative 2 first; alternative 1; and
alternative 3. The two C4 diffs of § 4 A are the lines he asked to see.

## 7. Three checks that tell the options apart, still open

1. **Astra's third check on the rung's copy**, both paths: `matOffset(0)`, an empty and a
   nonempty `RR64` sum in a function declared `RR64`, an empty `RR64` `DOT` and a nonempty
   `ZZ32` `DOT`, each printed with its value and run-time type on walk, and the same file
   through the checker with its declared types accepted. `SumWalk.fss` and `SumCheck.fss`
   are that check for three leaves; the rung's copy has eight. A and D differ in the second
   column; A and C in the first line.
2. **The test suite's outputs** before and after the 32 written static arguments and the
   library's eleven, the rung's gate: it tells whether any test's value rested on the
   untyped identity or on a `Number`-typed result (option D's premise), and it measures
   which of the 24 demos run at all today.
3. **The compiled path's witness through a repaired `cast`**: `WitnessComp.fss` printing
   `0.0` for `zeroOf[\RR64\]()` once `cast[\T\]` matches on that path, or the checker
   refinement of a witness branch in its place. It tells whether option A's identity
   function is whole on the compiled path or needs the refinement; nothing in batch 6
   depends on it.

## Appendix. The probes and captures

All under `explorations/reviews/sum-replacement-judgement/`. `walk.sh <Name> [variant]`
runs a probe on walk in a private cache, on the tree's library or on a private copy edited
by `variants/<variant>.py` (`sum`: today's tower with the replacement, `T extends Number`
because on today's tower `ZZ32` is an `AdditiveGroup[\Number\]`, not its own; `flat`: the
keep note's flat copy; `flat-sum`: the flat copy with the replacement and the algebra
bounds); `check.sh <Name> [variant]` runs the checker to the type-checking phase with the
interpreter's library in scope and the api's errors dropped (`CheckDriver.java` with the
fill worker's shadow `StaticChecker`); `comp.sh <Name>` compiles and runs in the compiler's
world on the flattening worker's library cache; `walk-shadow.sh` and `walk-stock.sh` run a
file under a one-class interpreter shadow and stock. `run-round2.sh` and `run-round3.sh`
are the runs as they were made, one after another. Captures: `WitnessWalk.walk.txt`, `SumWalkUnwritten.sum.walk.txt`,
`ShapesCheck.check.txt`, `ShapesCheck2.check.txt`, `ShapesCheck2.flat.check.txt`,
`SumWalk.sum.walk.txt`, `SumCheck.flat-sum.check.txt`, `WitnessComp.comp.txt`,
`WitnessComp2.comp.txt`, `CastComp.comp.txt`, `MarkerComp.comp.txt`, and the shadow pairs
`WitnessWalk.shadow.walk.txt`, `SumWalk.sum.shadow.walk.txt`, `simpleSum.*`, `setSum.*`,
`ArrayListQuick.*`. Each capture's first line names the machine and the load when it
started.
