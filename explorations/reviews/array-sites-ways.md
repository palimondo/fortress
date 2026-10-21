<!-- Every way to clear the 21 array sites of the distance that no array fork clears (the bodies typed by their parent trait, 14; the sizes tested in a branch, 3; row 678's `Col` and `Row`, 2; the two export errors of `FortressLibrary`), written 2026-10-20 by an Opus worker for the coordinating session, for the question the coordinator puts to the curator (ask 3, `coordinator/BOOT.md`). It lists the ways and decides nothing. The library's own way comes first; each group follows the nine steps 1 to 8 of the `coordinator` skill's `references/road.md`, and no step 9 is taken. Base: `main` at `cfa9525eb`, whose `Library/`, `ProjectFortress/` and `Specification/` equal climb batch 18's landing `e51759f57` (`git diff --stat e51759f57 HEAD` over them is empty), so batch 18's gate tables (`compile-ladder/climb-batch-18/gate/distance.txt`, 34 errors) and the per-site list `compile-ladder/gate/distance-sites.tsv` (last written at `e51759f57`) describe this tree. The record's diagnosis is taken as given: `reviews/array-forks-now.md`, "None of the six", on the tree of 2026-10-09; the forks and their ways, `reviews/array-design-ways.md`. Run: five small programs, each under `nice -n 19` with a fresh private caches folder, from the main tree's build (`ProjectFortress/build/`, built 2026-10-18 04:29 UTC, after the last implementation commit `5b11849c6`): two under walk, three through the compiled checker's `fortress typecheck` against the compiler's prelude (section 6). No build, suite, count or distance stage was run; no tracked file but this one was written; nothing was committed. Readings of my own are marked "(my reading)". -->

# The array sites' ways

## In short

- **The 21 are where the per-site list puts them** (section 0). The 10-09 note's lines are 130 to 158 lower now; its 13 bodies are 14, the fourteenth (`Vector.scale`, `:2530`) uncovered by fork 2's bound as the note foresaw.
- **Bodies typed by their parent trait, 14.** The library's own ways need no decision. `fill` and `tabulate` can be redeclared at the leaf's own type, as `Array1`, `Array2` and `ImmutableArray1` redeclare `copy`, `map`, `fill` and `tabulate`. That clears 5. The library's `cast` can then wrap the other 9 `map` and `ivmap` bodies; used alone, `cast` clears all 14. Under walk the casts succeed at the four element types measured, the transposed matrix included (measured); by reading, they succeed at all eight that the bound admits.
- **Sizes tested in a branch, 3.** The `cast` in the arm needs no decision (measured under walk). A checker that learns `b0 = 0` in the arm is a new type rule, so it is his to decide. The specification implies the rule through typecase's intersection and instantiation exclusion, but never states it.
- **`Col` and `Row`, 2.** Two ways need no decision: a `cast` of the subscript's value, which is a sized `Array2` at run time (measured), or a `SubArray2` built at the run-time offset. The receiver's own `subarray`, with the offset opened by `reflect`, waits on fork 3's answer, which P-55 holds at 4a.
- **The two export errors.** The first error's 14 dead-size operators have three ways:
  - Decision E's diff (P-40), which is his.
  - The component writing the api's dead sizes, which needs no decision by P-40's letter. Walk runs such declarations (measured).
  - An export check that ignores the dead sizes. It contradicts the specification's "same header", so it is his.

  The first error's other 3 entries:
  - The two `immutableArray` ranks are commented out in the team's own component.
  - The `array3` entry has a cause I did not trace. A probe of its overload shape is not refused (measured).

  The second error covers 44 traits and objects; 32 of them are not arrays. Its ways are a library-wide api match and the export checker brought to the specification's rule for abstract members.
- **Ask 3.** Each of groups 1 to 3 has a way that needs no decision of his. Group 4 does too for 16 of its first error's 17 entries, with the caveats of section 5, and for the second error's mechanical half. The rest of group 4 is decision E's diff or the library-wide api match (section 5).

## 0. The sites today, against the record

Each site was read in `Library/FortressLibrary.fss` at `cfa9525eb`, against the per-site list's message.

| Group | Sites today (`FortressLibrary.fss`) | The 10-09 note (`array-forks-now.md:54-70`) |
|---|---|---|
| Bodies typed by the parent trait | `Vector`: `:2526` (`+`), `:2528` (`-`), `:2529` (unary `-`), `:2530` (`scale`), `:2532` (`pmul`); factories `vector(v)` `:2596`, `tabulatedVector` `:2598`; `Matrix.rmul` `:2903`, `lmul` `:2908`; `Matrix`: `:2839`, `:2841`, `:2842`, `:2843`; `matrix(v)` `:2977` | 13: `:2396`, `:2398`, `:2399`, `:2402`, `:2457`, `:2459`, `:2752`, `:2757`, `:2704`-`:2708`, `:2819`; plus `:2400`, which fork 2's bound would uncover |
| Sizes tested in a branch | `__builtinFactory1` `:2551`, `__immutableFactory1` `:2562`, `__builtinFactory2` `:2946` | `:2421`, `:2432`, `:2795` |
| Row 678 | `Col` `:2697`, `Row` `:2701` | row 678: `:2561`, `:2565` at `9d323883f` |
| Export | `:12`, twice | `:12`, twice |

- Every site of the per-site list is where it says.
- The 14th body is `scale`, `:2530`. The note foresaw it: fork 2's bound, built by climb batch 13b (`749ec523e`), uncovered it.
- Two unreachable-arm errors that the note listed beside the branch sites are gone. P-55's part (b) is built (F-146).
- One citation of the note has moved and is not the team's. It wrote that "`ImmutableArray1` redeclares both at its own type", citing api `:1567-1568` and component `:2276-2283`. Today those lines are api `:1578-1579` and component `:2407-2414`. They are the revival's, `f3b62bc83`, the build of P-89 (answer 10). The team's own leaf redeclarations are `copy`, `map`, `ivmap` and `replica` (section 1, step 4).

## 1. Bodies typed by their parent trait (14)

**The sites.**

- `Vector[\T,s0\]` and `Matrix[\T,s0,s1\]` extend `Array1[\T,0,s0\]` and `Array2[\T,0,s0,0,s1\]` (`:2522-2524`, `:2835-2837`).
- Their bodies call methods that the parent declares at the parent's type:
  - `map[\R\]` and `ivmap[\R\]` answer `Array1[\R,b0,s0\]` (`:2469-2472`) and `Array2[\R,b0,s0,b1,s1\]` (`:2735-2738`).
  - `fill` and `tabulate` answer `T`, the F-bound of `StandardMutableArrayType[\T,E,I\]` (`:2304-2323`), which `Array1` and `Array2` instantiate at themselves (`:2427-2429`, `:2631-2633`).
- So `ivmap[\T\](…)` in `Vector`'s `+` is an `Array1[\T,0,s0\]` where `Vector[\T,s0\]` is declared.
- `vector[\T,s0\]().fill(v)` is the same: `vector` answers `Vector`, and `.fill` answers `Array1`.
- `matrix(v)` calls `array2[\T,s0,s1\]()`, which answers `Array2`, then `.tabulate` (`:2977`). The team wrote `array2[\T,s0,s1\]().fill(fn …)` (`a874948ac`, `FortressLibrary.fss:2616`). The revival renamed `fill` to `tabulate` (`f3b62bc83`) and wrote `v.zero` (`749ec523e`).

**1. The mathematics.**

- An elementwise map `T -> T` over a vector of `s0` numbers gives a vector of `s0` numbers: Tⁿ is closed under componentwise maps.
- With `f: T -> R` for a non-number `R`, the image is an `s0`-tuple of `R`: an array, not a vector.
- So the precise type of `map` is a function of `R`'s kind: `Vector` when `R` is a number type, `Array1` otherwise (my reading). A type system expresses that in one of three ways: by overloading on `R`'s bound, by a type-level function of the collection, or by the supertype plus a run-time test.

**2. What each path does today.**

- The checker reports the 14, by the gate (`distance-sites.tsv`).
- Walk dispatches on the value. `ivmap` builds its result through `replica[\R\]().tabulate(…)` (`:2469-2472`).
  - `__DefaultVector`'s `replica` is `array1[\U,s0\]()` (`:2542`), whose witness `typecase` returns a `vector` at each of the eight number types through `cast` (`:2575-2586`).
  - So the value is a `Vector` at run time.
- Measured here (section 6, M1): `cast[\Vector[\T,s0\]\]` of `ivmap` and `map` succeeds under walk at `RR64`, `ZZ32`, `NN32` and `RR32`. `cast[\Matrix[\T,s0,s1\]\]` of `ivmap` succeeds on a `__DefaultMatrix` and on a `TransposedMatrix`, and the parent's `map` on a transposed matrix is a `Matrix`.
  - `T extends { Number, MultiplicativeRing[\T\] }` admits exactly the eight types of `array1`'s arms, since `Number` is closed and `IntLiteral` is no ring (`FortressLibrary.fsi:286-287`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:178`). So the cast cannot fail on a library vector (my reading).

**3. The specification, under every spelling.**

- "A one-dimensional array whose elements are a subtype of `Number` is a vector", and of two dimensions "is a matrix". The margin note, Jan Maessen's: "can be coerced to a vector" (`Specification/basic/expressions/aggregate.tex:152-170`). So the text makes the mapped array a vector; the library realises that at run time through `array1`.
- The text has no casting operator. "The effect of a cast can be provided by the following function", which `typecase` defines (`basic/expressions/casting.tex:12-38`).
- A typecase clause types its identifier as "the intersection of `T` and the corresponding guarding type" (`basic/expressions/typecase.tex:93-100`).
- A coercion "occurs only when the declared type of the corresponding parameter … is exactly the type `U`" (`basic/conversions-coercions.tex:98-101`). A body's result is not a parameter, so the margin note's coercion has no place at these sites (my reading).
- Overloads may differ in their static parameters (P-45; `advanced/overloading.tex`, "Declarations with Static Parameters").
- Nothing in the text says what `map` on a vector answers.

**4. What the library does in the same family.**

- The team redeclares `map` and `ivmap` at every level for a more precise result. The chain is `Indexed` (`FortressLibrary.fsi:1321-1322`), `ReadableArray`, `ImmutableArray` and `Array` (`:1431-1432`, `:1458-1459`), `ImmutableArray1` and `Array1` (`:1582-1583`, `:1607-1608`), then `Array2` with the team's comment "Copied here for better return type information" (`:1722-1724`; component `:2734-2738`) and `Array3` (`:1851-1852`).
- `copy`, `replica` and `freeze` are redeclared per leaf in the same way: `ImmutableArray1` and `Array1`, `fsi:1575-1583`, `:1603-1608`.
- The revival's build of answer 10 redeclares `fill` and `tabulate` at `ImmutableArray1`'s own type, beside the meet in `StandardMutableArrayType` (`fsi:1578-1579`, `fss:2407-2414`; `f3b62bc83`; F-158).
  - P-89 as first recorded: "The diamond is fixed by redeclaring `fill` in the leaf array traits, as the library does for `copy`, `map` and `replica`" (`facts-extract.sh 'history:P-89'`).
  - Review-queue item 112 holds the landed placement, at the meet and not in each leaf, for his confirmation.
- The library's `cast` (`fss:33-37`) is the team's, and so is its use to give a body's value its precise type: `List.fss:313`, `cast[\T\](underlying.get(i))` (the team's `a874948ac` `List.fss:312`). The revival's witness factories return through it: `array1`, `array2` (`a0f839ad7`; `:2575`, `:2954`) and `additiveIdentity` (`d846e3644`; `:3362`).
- A redeclaration of `map[\R\]` at `Vector[\R,s0\]` is not open to the library: `R` is unbounded and `Vector`'s `T` is bounded, so `Vector[\R,s0\]` is ill-formed (my reading).

**5. Where the designers departed from Java.**

- Java has covariant return types on override and the F-bounded self type (`Enum<E extends Enum<E>>`), as the library's `StandardMutableArrayType` does.
- Like Java, Fortress forbids a type that extends two instantiations of one generic trait (`types-vals-vars.tex:235-252`), so `Vector` cannot also extend `StandardMutableArrayType[\Vector[\T,s0\],…\]`.
- The departures:
  - `cast` is a library function, not an operator.
  - `Vector` is a sized numeric subtype that Java has no counterpart for.

**6. The peers.**

- Scala 2.13's `BitSet` overloads `map` at the restricted element type beside the generic one: `def map(f: Int => Int): BitSet` and `def map[B](f: Int => B): Set[B]` (https://www.scala-lang.org/api/2.13.x/scala/collection/immutable/BitSet.html, fetched here). This is the static form of `array1`'s run-time choice.
- Julia's `similar`: "Create an uninitialized mutable array with the given element type and size, based upon the given source array" (https://docs.julialang.org/en/v1/base/arrays/, fetched here). This is the team's `replica`. Julia checks no result type statically.

**7. The commits.**

- The bodies and `replica` are the team's (before the conversion's cut, `5a68404fd`).
- `tabulate` and the leaf `fill` at `ImmutableArray1`: `f3b62bc83`, P-89.
- The ring bound that uncovered `:2530`: `749ec523e`, climb batch 13b.
- No row names these sites (`array-forks-now.md:58`).

**8. The derivation from the principles.**

- P-27 points to the library's own device for each half:
  - the leaf redeclaration, where the result's element type is the trait's own (`fill`, `tabulate`);
  - `cast`, where it is a parameter (`map[\R\]` called at `R = T`).
- P-84 keeps the sizes, and every way below keeps them.
- P-86 asks that the generic bodies be checked per operation. Under a cast the arithmetic inside each closure is still checked statically; only the result's type is tested at run time (my reading).
- P-87: no way below changes a model line, except 1e (below).

**The ways.**

1. **1a, `fill` and `tabulate` redeclared at the leaf's own type** (the library's own way, step 4).
   - Edits:
     - in `Vector`: `fill(v:T): Vector[\T,s0\]` and `tabulate(f:ZZ32->T): Vector[\T,s0\]`, with `StandardMutableArrayType`'s two bodies, which end in `self`;
     - in `Matrix`, the same at `Matrix[\T,s0,s1\]`;
     - the 4 api lines beside them, since importers see the api's;
     - `matrix(v)`'s body calls `matrix[\T,s0,s1\]()` where it calls `array2[\T,s0,s1\]()`.
   - About 20 component lines and 4 api lines (my reading).
   - Clears 5: `:2596`, `:2598`, `:2903`, `:2908`, `:2977`.
   - Decision: none.
     - It is P-89's first wording, "redeclaring `fill` in the leaf array traits", applied to two more leaves.
     - It keeps the meet as landed, so either answer to review-queue item 112 stands (my reading).
   - Walk:
     - A subtrait of `Array1` that redeclares `tabulate` and `fill` so loads and answers its own type (M1, `LeafVec`).
     - `array2` at a number type already returns `matrix`'s object through `cast` (`:2954-2965`), so `matrix(v)`'s value class is unchanged.
     - Values unchanged (my reading).
   - Tests:
     - the walk tests that build or tabulate vectors and matrices, among them `vectorOps`, `matrixOps`, `TabulateRungA`, `ArrayElementAlgebra` and `ArrayScalarExtension`;
     - and the about 40 tests under `ProjectFortress/tests/` that name `Vector`, `Matrix` or `DOT`.
     - The compiled tests do not import this library.
   - microGPT:
     - C4's vocabulary calls `array[\RR64\](n).fill(0.0)` and `.tabulate(f)` on vectors at run time (`run-c4/src/FlatArrays.fss:14-17`). These now run the leaf's copy of the same body.
     - Its views `RowView`, `PView`, `Diag`, `PlaneView` inherit the redeclarations (`:36-122`).
     - No model line changes.
   - Cost: part of one library rung.
2. **1c, the parent's result through the library's `cast`.**
   - Edits: each `ivmap[\T\](…)` or `map[\T\](…)` body becomes `cast[\Vector[\T,s0\]\](…)` or `cast[\Matrix[\T,s0,s1\]\](…)`.
   - With 1a, 9 lines. Alone, the factories too: 14 lines, no api line.
   - Clears the 9 bodies (`:2526`, `:2528`, `:2529`, `:2530`, `:2532`, `:2839`, `:2841`, `:2842`, `:2843`), or all 14 alone.
   - Decision: none.
     - It keeps the team's `replica`, the "replica of the array (similar layout etc.)" (`:2401-2402`, `:2459-2460`).
   - Walk:
     - one type test per array operation, not per element;
     - the same object returned;
     - values unchanged (M1, measured at four element types and on a transposed matrix).
   - Tests and microGPT: as for 1a. C4's `+`, `-` and scalar products between arrays reach these bodies at run time.
   - Compiled path, after the switch-over: the same cast `array1` already needs (my reading).
   - Cost: the same library rung.
   - Fork 2's pending answer:
     - Should he take 6d, which moves the products out of the traits (`array-design-ways.md:303`), `scale`, `pmul`, `rmul`, `lmul` and `Matrix.scale` (`:2530`, `:2532`, `:2903`, `:2908`, `:2843`) move with them.
     - Their repair would then be redone in the new place (my reading).
     - This holds for 1a and 1b too.
3. **1b, the bodies built through the leaf's own `tabulate`** (needs 1a).
   - Edits: the 9 bodies respelled, for example `opr +(self, v) = vector[\T,s0\]().tabulate(fn (i:ZZ32):T => get(i) + v.get(i))`. 9 team lines.
   - Clears the 9.
   - Decision: one, by my reading.
     - It replaces the team's `replica` by the factory, so every operation's result store is chosen by `vector` and `matrix`, not by the receiver.
     - That is the direction of P-85's first question, "a store per element type chosen by the factory". It also departs from the library's `map` (P-27).
   - Walk:
     - The result is a `__DefaultVector` or `__DefaultMatrix` where a `TransposedMatrix` receiver gave a transposed store. The values are the same (my reading).
     - M1 measured the shape on a `LeafVec`.
   - Cost: the same library rung.
4. **1d, `map` and `ivmap` overloaded at the element type**, Scala's `BitSet` way: `map(f:T->T): Vector[\T,s0\]` beside the inherited `map[\R\]`.
   - Edits: 2 or 4 new api members per trait, and the 9 bodies call the plain form without `[\T\]`.
   - Clears 9.
   - Decision: his, one the record does not hold (my reading). It adds public overloads beside the team's; P-45 allows a generic and a plain overload, and P-85 and P-55 do not touch it.
   - Walk refuses an object's generic dotted method beside a plain one at load (row 760). A trait's pair is not measured.
   - Cost: a walk rung (row 760 or its trait sibling), a checker probe, and the library rung.
5. **1e, a self type on the leaves.** `Array1` and `Array2` take their own type as a static parameter, as `StandardMutableArrayType` does, so that `Vector` instantiates it at itself.
   - Edits: every declaration that names `Array1` or `Array2`, in the library and in C4's vocabulary (`replica[\U\](): Array1[\U,0,c\]`, `FlatArrays.fss:71`, `:78`).
   - Clears 14.
   - Decision: his. P-87 requires a diff of the vocabulary's lines, and this is a restructure of the array traits' api.
   - Cost: several rungs (my reading).
6. **No checker change clears them.** `Array1[\T,0,s0\]` is a supertype of `Vector[\T,s0\]`, and a rule that accepted it as `Vector` would accept a non-vector array there (my reading).

## 2. Sizes tested in a branch (3)

**The sites.**

- `__builtinFactory1` (`:2551`, the team's): `typecase N[\b0\] of N[\0\] => r else => r.subarray[\b0,s0,0\](1) end`.
  - `r` is `Array1[\T,0,s0\]`, so the union is `OR(Array1[\T,0,s0\],Array1[\T,b0,s0\])` against `Array1[\T,b0,s0\]`.
- `__immutableFactory1` (`:2562`), the same at `ImmutableArray1`. Its arm is the revival's spelling (`74b28e9d4`, climb batch 12's rung S).
- `__builtinFactory2` (`:2946`, the team's): `if b0=0 AND b1=0 then array2[\T,s0,s1\]() else __DefaultArray2[\T,b0,s0,b1,s1\]() end`.
- Walk calls these by name: `__builtinFactory<k>` for an array-typed binding (`interpreter/evaluator/LHSEvaluator.java:154-159`, `compiler/WellKnownNames.java:31-33`), and `__immutableFactory1` for varargs (`interpreter/evaluator/values/NonPrimitive.java:229`).
- Every `Array1` and `Array2` `replica` goes through them (`:2461`, `:2727-2728`; `__DefaultMatrix` inherits `Array2`'s).

**1. The mathematics.** In the branch where `b0 = 0` was tested and held, `Array1[T,0,s0]` and `Array1[T,b0,s0]` name one type. A checker that does not carry the equation into the branch forgets a fact the program established: case analysis on an index.

**2. What each path does today.**

- The checker reports the 3 (the gate).
- With P-55's part (b) built, the `N[\0\]` arm is reachable (F-146). The checker's typecase rule extends each clause with value bindings only, never a size equation (`scala_src/typechecker/impls/Misc.scala:326-342`), and joins the clause types (`:658-682`).
- Walk runs both arms. Measured (M1): the cast form of `__builtinFactory1` gives a `Vector` at `b0 = 0` and an `Array1` based at 2 at `b0 = 2`.

**3. The specification.**

- A typecase clause types its identifier as the intersection of the scrutinee's type and the guard (`typecase.tex:93-100`).
- Two instantiations of one trait exclude each other unless every static argument is "the same value for a `nat`" (`types-vals-vars.tex:235-252`, the revival's revision, after the type group's multiple instantiation exclusion).
- So `N[\b0\] ∩ N[\0\]` is empty unless `b0 = 0`, and a reached arm implies `b0 = 0` (my reading). The text states the intersection, not the equation.
- An `if` refines nothing (`basic/expressions/if.tex`).
- The team's Q&A: a name is not known to differ from a numeral (`appendices/internal-document.tex:167-198`).

**4. What the library does in the same family.**

- Where a witness `typecase` does not refine its static argument, the library returns through `cast` in the arm: `array1`'s and `array2`'s eight arms (`:2575-2586`, `:2954-2965`), `additiveIdentity` (`:3362-3376`) and `openRange` (`:4192-4196`).
- The team's own `typecase N[\b0\]` arms carried no cast, since walk checks no types.
- The comment above `__builtinFactory1` forbids overloading it: "must be a non-overloaded 0-parameter factory" (`:2545-2550`).

**5. Where the designers departed from Java.** Sizes are static parameters "instantiated at runtime with numeric values" (`trait-parameters.tex:82`). Java has no size in a type and no refinement by `instanceof` on a type argument.

**6. The peers.**

- GHC: "The key point about GADTs is that pattern matching causes type refinement", and "type refinement is only carried out based on user-supplied type annotations" (https://downloads.haskell.org/ghc/latest/docs/users_guide/exts/gadt.html, fetched here). The arm is checked against the declared result under the arm's equation.
- C++'s `if constexpr` is checked per instantiation, so the arm sees `B0 == 0` known (my reading; cppreference refused the fetch).
- Dependent ML refines indices on a Boolean test of them (my reading, not fetched).

**7. The commits.**

- The arms are the team's (`5a68404fd`).
- `__immutableFactory1`'s current form: `74b28e9d4`.
- P-55's (b), which made the arm reachable: `rung-size-expressions` (F-146).

**8. The derivation.**

- P-27 points to the `cast` in the arm.
- P-25 and P-26: the refinement rule follows from the text's intersection and from the type group's exclusion rule, but the text does not state it. Writing it is a revision of the type rules, which is his.

**The ways.**

1. **2a, `cast` in the arm** (the library's own way).
   - Edits: `N[\0\] => cast[\Array1[\T,b0,s0\]\](r)`, the same at `ImmutableArray1`, and `then cast[\Array2[\T,b0,s0,b1,s1\]\](array2[\T,s0,s1\]())`. 3 lines.
   - Clears 3.
   - Decision: none.
   - Walk: one type test per array allocation through the factory, the same object, values unchanged (M1, `bf1`).
   - Tests: every walk test with an array-typed binding or a `map`, `copy` or `thaw`.
   - microGPT: C4's arrays reach `replica` through these factories; no line changes.
   - Cost: part of a library rung.
2. **2b, the checker refines a size in the arm that tests it.**
   - Edits: in `checkClause`, when the scrutinee's type and the guard are instantiations of one trait that differ only in size arguments, the clause is checked under their equations. The clause's type is read under them, or replaced by the expected type once it checks against it, since the union is taken outside the clause (`Misc.scala:326-342`, `:658-682`).
   - Clears `:2551` and `:2562`. `:2946` also needs 2c', below.
   - Decision: his. It is a type rule the text implies but does not state, so it needs a revision of `typecase.tex` with an Appendix I entry.
   - Walk: none.
   - Cost: one checker rung and a specification sentence. Its compiled half is nothing, since the arms' code is unchanged (my reading).
   - 2c', for `:2946`: `if b0=0 AND b1=0` respelled as `typecase (N[\b0\], N[\b1\]) of (N[\0\], N[\0\]) => …`. 1 to 4 library lines. Values unchanged (my reading).
3. **2c, overloading on the witness.** A helper declared at `N[\0\]` and at a generic `N[\b\]`, called by the factory.
   - Edits: 2 to 3 helpers.
   - Clears 3.
   - Decision: two, both open. Walk refuses such a pair at load, since the pair's parameters do not exclude ("at least one pair of parameters must have excluding types"; measured on the A2 probe, `array-design-ways.md:113`).
     - Changing walk's family check is answer 9's walk rung, which PLAN names.
     - The checker's overloading of an opened size against a generic one is row 682 (contested), which hangs on fork 3's answer, the P-55 default awaiting his reading of P-40 (PLAN item 13.3).
   - Cost: a walk rung, a checker rung and the library lines.
4. **2d, no branch.** Rejected by my reading. `__builtinFactory1` always answering `r.subarray[\b0,s0,0\](1)` would make every array literal and every `replica` a `__SimpleSubArray1` where it is a `Vector` or `Matrix`. That changes walk's dispatch and its values.
5. **2e, an `if` on sizes refines them.**
   - Clears `:2946` without 2c'.
   - Decision: his. It is a new type rule with no word in the text.
   - Cost: a checker rung larger than 2b (my reading).

## 3. Row 678's `Col` and `Row` (2)

**The sites.**

- `opr[_:TrivialOpenRange, i1:ZZ32]: Array[\T,ZZ32\] = Col(self[(b0,i1)#(s0,1)])` (`:2697`) and its `Row` twin (`:2701`).
- The range subscript answers the unsized `Array[\T,(ZZ32,ZZ32)\]` (`:2668-2675`). `Col` and `Row` take a sized `Array2[\T,b0,s0,0,1\]` and `Array2[\T,0,1,b1,s1\]` (`:2811`, `:2822`).
- Row 678 lists four ways and takes none.

**1. The mathematics.** Column `i1` of an `s0 × s1` array is a vector of `s0` elements for every valid `i1`. Its length is static and only its offset is a run-time value, so the result's size depends only on static facts.

**2. What each path does today.**

- The checker refuses both calls (the gate).
- Walk:
  - `self[(b0,i1)#(s0,1)]` calls `__subarray(self, N[\0\], reflect(s0), N[\0\], reflect(1), reflect(b0), reflect(i1), 1, 1)`, four `reflect`s.
  - That runs the receiver's `subarray[\0,s0,0,1,b0,i1\](1,1)`; `Array2`'s builds `SubArray2[\T,0,s0,0,1,b0,s0,b1,s1\](self,1,b0,1,i1)` after its bounds check (`:2719-2723`).
  - Measured (M1): the subscript's value is a sized `Array2[\ZZ32,0,2,0,1\]` at run time, and its cast reads the same column as the library's `a[:,1]`.

**3. The specification.**

- Silent on subscripts and subarrays, as row 678 says.
- A size is a value at run time (`trait-parameters.tex:82`).
- The library chapter is the api rendered (`Specification/library/default-libraries.tex:27`).

**4. What the library does in the same family.**

- `Array2`'s own static `opr[_:TrivialOpenRange]` calls `subarray[\0,s0,0,s1,b0,b1\](1,1)` (`:2676-2677`).
- `shift` opens run-time offsets with `reflect` beside static sizes: `__subarray(self,reflect(o0),N[\s0\], reflect(o1),N[\s1\], N[\b0\],N[\b1\],1,1)` (`:2705-2712`).
- `SubArray2` takes its offsets as values (`:2789-2809`).
- The team's commented-out range forms show the same call (`:2678-2694`).

**5. Where the designers departed from Java.** Java's `List.subList` answers the unsized `List`, as the range subscript does. Fortress's sized `Array2` has no Java counterpart.

**6. The peers.** As for a size known only at run time (`array-design-ways.md` section 5).

**7. The commits.** Both lines are the team's (`5a68404fd`). The sites showed once `Array2`'s `asString` typed its `row` parameter (row 678; climb batch 13's rung N).

**8. The derivation.** P-84 keeps sizes in types, so a way that keeps `Col`'s sized field is nearer the team's design than one that drops it (my reading). P-27 points to `cast`, or to the library's own subarray devices.

**The ways.**

1. **3d, `cast` of the subscript's value** (row 678's third way, the library's device).
   - Edits: `Col(cast[\Array2[\T,0,s0,0,1\]\](self[(b0,i1)#(s0,1)]))` and its `Row` twin. 2 lines.
   - Clears 2.
   - Decision: none.
   - Walk: the same object, one type test, the four `reflect`s kept, values unchanged (M1).
   - Tests: `ProjectFortress/tests/subArray.fss:80-81` (the team's) and `tests/Array2SubscriptInBounds.fss:18-19` (the revival's).
   - microGPT: no `[:, j]` or `[i, :]` in `run-c4/src` (grep).
   - Cost: part of a library rung.
2. **3a, a `SubArray2` built at the run-time offset** (row 678's first way).
   - Edits: `boundsCheck = self.bounds.narrowToRange((b0,i1)#(s0,1))`, then `Col[\T,0,s0\](SubArray2[\T,0,s0,0,1,b0,s0,b1,s1\](self,1,b0,1,i1))`, the arguments the subscript reaches today. The same for `Row`. About 4 lines.
   - Clears 2.
   - Decision: none.
   - Walk:
     - no `reflect`;
     - the values are the same;
     - but a `TransposedArray2` or `SubArray2` receiver no longer runs its own `subarray` override, so the object built differs: a `SubArray2` over it, where today it is flattened or transposed (my reading). The two tests above check values.
   - Cost: part of a library rung.
3. **3b, the receiver's own `subarray` with static sizes and the offset opened.**
   - Edits: `Col(__subarray(self, N[\0\], N[\s0\], N[\0\], N[\1\], N[\b0\], reflect(i1), 1, 1))`. Its result `Array2[\T,0,s0,0,1\]` mentions no opened size, so fork 3's 4a types it precisely (F-146; `compiler_tests/NatOpenChecker.fss`). 2 lines.
   - Clears 2.
   - Decision: it rests on 4a, P-55's default for fork 3 while his reading of P-40 is asked.
   - Walk:
     - the same call chain as today with one `reflect` in place of four;
     - but `reflect(i1)` runs before the bounds check, so a negative `i1` fails with `reflect`'s "negative argument" (`ProjectFortress/LibraryBuiltin/NatReflect.fss:51-57`) where it fails with the bounds check today (my reading).
   - On the compiled path an opened size does not compile yet (row 307); today's subscript has the same wait.
   - Cost: part of a library rung.
4. **3c, `Col` and `Row` over the unsized array** (row 678's second way).
   - Edits: the two objects' field type and their `subarray` bodies (`Array` has `get`, `offset` and `toIndex`, `fsi:1420-1427`, but not `subarray`), and the two calls with explicit static arguments. About 8 lines; the api is untouched, since `Col` and `Row` are not in it.
   - Clears 2.
   - Decision: his, by my reading. It drops a size from the team's type, against P-84's "arrays keep the team's `nat` sizes".
   - Cost: part of a library rung.
5. **3e, a sized subscript result** (row 678's fourth way).
   - Edits: a range type that carries its extent as a size, so that `self[(b0,i1)#(s0,1)]` answers `Array2[\T,0,s0,0,1\]`.
   - Clears 2, and the range subscripts' other unsized results.
   - Decision: his. The subscript is a factory for a size known at run time that returns the unsized `Array`, P-85's third question.
   - Cost: several rungs (my reading).

## 4. The two export errors (2)

**The sites.** Both are at `FortressLibrary.fss:12`, `component FortressLibrary`. The `FlatString` export error of the same table is another component's, not one of the 21.

**1. The mathematics.**

- `∀T,n,m,p. Vector[T,n] × Vector[T,n] → T` and `∀T,n. Vector[T,n] × Vector[T,n] → T` denote the same functions, since `m` and `p` occur nowhere (∀m.A ≡ A when m ∉ fv(A)).
- An api and a component that state different types for one member are not the same contract. Which one is meant is a choice, not a fact.

**2. What each path does today.**

- The checker reports both (the gate).
- Walk runs the library with both mismatches: every walk suite passes on this base.
- Measured here:
  - Walk runs a declaration that carries the api's dead sizes, alone and as the api's overloaded pair: `dot1 14.0`, `dotD vector 14.0`, `dotD scalar [0#3][ 2.0 4.0 6.0 ]` (M2).
  - The compiled checker reports an api declaration that the component lacks, but not an api that declares `f[\T,…\]()` alone where the component defines both `f[\T,…\]()` and `f[\T,…\](v:T)`, the shape of `array3`, with a `ZZ32` or a sized generic result (M3, M4, M5).

**3. The specification.**

- "A matching definition of a declaration d is a definition d' with the same name as d that includes definitions for all declarations other than the methods or fields declared `abstract` in d. The header and type of d' must be the same as the header and type of d" (`basic/components/apis.tex:249-256`).
- "Whether a declaration includes the modifier `abstract` has a significant effect on its meaning" (`:160-162`).
- The checker quotes the text's trait rule: "When a trait has an abstract method declared, a satisfying trait declaration is allowed to provide a concrete declaration" (`scala_src/typechecker/ExportChecker.scala:327-339`).
- The library chapter, Part IV, is the api rendered (`Specification/library/default-libraries.tex:27`), so every api edit below is also an edit of Part IV (my reading of `rung-tabulate/REPORT.md` section 2).

**4. What the library does in the same family.**

- The team's api writes `abstract` where the component's member has no body: `MultiplicativeRing`'s `one` and `TIMES` (`fsi:279-280`), `ReadableArray`'s `ivmap` and `map` (`:1431-1432`), `StandardImmutableArrayType` (`:1513-1515`).
- It declares every form of `array1` and `array2` (`:1637-1639`, `:1747-1749`).
- The component writes the vector and matrix products without the dead sizes (`fss:2603-2619`, `:2982-3015`).
- The team's component comments out `immutableArray`'s ranks 2 and 3 and their helpers (`fss:2264-2280`), which the api declares (`fsi:1500-1501`). There is no `ImmutableArray2` or `ImmutableArray3` in the library. At `a874948ac`, too, the api had them and the component commented them out.

**5. Where the designers departed from Java.** Java has no api that a separate unit must match declaration by declaration. Fortress's apis and components are nearer ML's signatures and structures, whose matching allows a structure's value a more general type (my reading, not fetched). The text asks for the same header.

**6. The peers.** ML's signature matching, as above, would accept the component's `DOT[\T,n\]` for the api's `DOT[\T,n,m,p\]` (my reading).

**7. The commits.**

- `ExportChecker.scala`'s comparisons are the team's (`5a68404fd`).
- The dead sizes are the team's (F-35).
- `tabulatedArray3` was added to the api by `f3b62bc83`.
- The team's api had `array3()` alone and its component three forms (`a874948ac`, `FortressLibrary.fsi:1701`, `.fss:2814-2818`).

**8. The derivation.**

- P-40: the api's dead sizes "go only by a diff shown to him with the switch-over's design".
- P-27 points to the team's api practice (`abstract` written, every form declared).
- P-25: the export check is to follow `apis.tex`.

**The first error: 17 api declarations the component lacks.**

1. **4a, decision E's diff (E3).**
   - Edits: the api's vector and matrix `DOT` and juxtaposition lose `nat m` and `nat p` where they occur nowhere. That is 14 declarations (`fsi:1661-1677`, `:1774-1804`), and beside them the three vector `+` and `-` with a dead `nat m` (`fsi:1649-1656`). The matrix `+` and `-` use their `m` (`:1757-1764`). These 17 are the patch's 17 lines.
   - The patch of 2026-09-29 (`library-e3.patch` at `fb10482ba`, 17 lines) writes `T extends Number`. Since fork 2's bound landed, the api writes `T extends { Number, MultiplicativeRing[\T\] }`, so the patch must be re-based to apply (my reading).
   - Clears the 14. It also clears C4's three `DOT` refusals on its own gate (`array-design-ways.md:54`).
   - Decision: his. P-40 holds it for a diff shown to him with the switch-over's design.
   - Walk: none, since walk runs the component (my reading).
   - Cost: part of a library rung, after his answer.
2. **4b, the component writes the api's dead sizes.**
   - Edits: the 14 component headers take `nat m, nat p` as the api has them. 14 lines.
   - Clears the 14 (my reading).
   - Decision: none by P-40's letter, since the api's sizes stay. But it copies the api's slip into the team's correct component, against the direction P-40 sets and P-27 (my reading).
   - Walk runs such declarations (M2), so values are unchanged.
   - Checker:
     - The declarations check clean (F-35).
     - A call that cannot fix `m` and `p` is refused (P-40). `FortressLibrary.fss` calls no vector `DOT` (grep: the two `DOT`s at `:634-635` are `QQ`'s); its juxtapositions of vectors are not traced.
     - C4's three refusals stay.
   - Cost: part of a library rung.
3. **4c, the export check ignores a static parameter that occurs nowhere.**
   - A checker edit in `equalListStaticParams` (`ExportChecker.scala:613-628`).
   - Clears 14.
   - Decision: his. It departs from "the header and type of d' must be the same" (`apis.tex:253`), so it needs a revision.
   - It leaves C4's refusals.
   - Cost: a small checker rung and a revision.
4. **The two `immutableArray` ranks.**
   - 4d: the api's two lines commented out as the component's are. 2 lines; clears 2.
     - Decision: none by my reading, since the component never had them and no program can call them. It removes two factories from Part IV, so the coordinator may route it to him.
     - Walk: none, since a call has no definition today.
   - 4e: build `ImmutableArray2` and `ImmutableArray3` and the two factories.
     - Decision: his. It is a library extension the record does not hold (P-28's scope).
     - Cost: rungs.
5. **`array3`.**
   - Its cause is not traced. The component defines `array3()` with the api's header (`fss:3181`, `fsi:1860`). The api lacks the component's `array3(v:T)`, as it did at `a874948ac`.
   - My first reading was the cover step: `coverOverloading` drops a declaration that a more general one covers (`OverloadingChecker.scala:816-840`), applied to the component's set before matching (`ExportChecker.scala:266-325`). The probes did not bear it out: that overload shape alone is not refused against the compiler's prelude (M4, M5).
   - Ways:
     - 4f: the api declares `array3[\T, nat s0, nat s1, nat s2\](v:T)` as it declares `array1(v)` and `array2(v)`. 1 api line, no decision; whether it clears the entry is not known.
     - 4g: a trace of the export check on the library first. It needs the distance stage, which this note did not run.

**The second error: 44 traits and objects, by the cause the message gives.**

- Of the 44, 12 are arrays or indexing: `Indexed1`, `Indexed2`, `Indexed3`, `Indexed`, `ZeroIndexed`, `DelegatedIndexed`, `ReadableArray`, `ReadableArray1`, `ImmutableArray1`, `Array1`, `Array2`, `Array3`. 32 are not.
- The causes:
  - **The api's member is written without `abstract` and the component's has no body, so it is abstract: 16 entries.** `AnyUniqueItem`, `ReadableArray1`, `Reduction`, `StandardMin`, `StandardMax`, `FilterGenerator`, `RangeWithExtent`, `BoundedRange`, `RangeWithLeft`, `RangeWithRight`, `FullRange`, `Generator2`, `RelationalPredicateCondition`, `MultiplicativeRing`, `Number`, `Integral`. The message names the same member as "different method" and as an "abstract method … not declared in the API".
    - `equalFnHeaders` compares the modifiers with `ignoreAbstract` false (`ExportChecker.scala:598-611`, `:791-805`), and `allAbstractsMadePublic` (`:747-761`) reports the second half.
    - At least one of the 16 also differs in a type: `MultiplicativeRing`'s `^` takes `ZZ64` in the api (`fsi:283`) and `AnyIntegral` in the component (`fss:377`).
  - **The component has an abstract member the api lacks: 2.** `Comparison`'s `asString` and `OpenRange`'s `forward`. Three more entries mix this with a type difference: `ZeroIndexed`, `Array2` and `QQ`. `Array2`'s `bounds` answers `CompactFullRange[\(ZZ32,ZZ32)\]` in the api (`fsi:1696`) and `CompactFullRange2D` in the component (`fss:2637`).
  - **A member that differs only otherwise: 7.**
    - `Equality`'s `=` and `Indexed`'s `size` are `abstract` in the api and concrete in the component (`fsi:74`, `fss:101`; `fsi:1265`, `fss:1965`). The text allows this pairing (`apis.tex:251-252`), and the checker refuses it.
    - `EqualTo`'s `<`: the api has `LessThan` and `TotalComparison` forms, and the component a `GreaterThan` form (`fsi:163-164`, `fss:210`).
    - `RR64`'s floor and `Array3`'s `bounds` differ in type.
    - `Nothing`'s and `Just`'s `_[_]` are not traced.
  - **Different `extends` clauses: 7.**
    - `Indexed1` to `Indexed3` extend `HasRank` in the component only (`fss:1935-1939`, `fsi:1234-1238`).
    - `ReductionPair` extends `SomeReductionPair[\R\]` in the api and `SomeReductionPair[\L\]` in the component (`fsi:1909`, `fss:3252`).
    - `Maybe`, `Condition`, `String`.
  - **Missing members: 10.** The api trait lists more members than the component's: `DelegatedIndexed`, `ReadableArray`, `ImmutableArray1`, `Array1`, `ActualReduction`, `BigReduction`, `Comprehension`, `Range`, `AnyMaybe`, `String`.
    - The test counts members (`ExportChecker.scala:766-770`).
    - The text requires a satisfying declaration only for the api's non-abstract members (`:327-339`). So an api's abstract member that the component's trait inherits or omits is reported where the text does not ask for it (my reading).
  - These sum to more than 44, since an entry can carry several causes.

1. **4h, the api and the component aligned, trait by trait** (the library's own way).
   - Edits:
     - `abstract` written in the api where the component's member has no body: about 20 lines, no decision;
     - the slips where one side is plainly wrong, such as `ReductionPair`'s `L` for `R`: a few lines each, no decision by my reading;
     - the members whose two texts state different contracts. One side is chosen per member, and some touch decisions on record: `MultiplicativeRing`'s `^` exponent beside P-153's build of the integer power, the `Maybe` family beside P-90, and `String` beside PLAN item 38 and F-246 (my reading).
   - Clears the error only when all 44 clear.
   - Walk: none by my reading. Walk runs the component, and an api's `abstract` states what the component already does. Not measured.
   - microGPT: none on walk. On the compiled path, phase 5, C4 sees the api.
   - Cost: one or two library rungs (my reading).
2. **4i, the export check brought to the text's satisfaction rule.**
   - Edits:
     - a concrete component member satisfies an api's `abstract` one, by `equalFnHeaders`'s own `ignoreAbstract` argument at `equalMember` (`ExportChecker.scala:791-805`, where the team left a commented-out attempt);
     - an api's abstract member needs no satisfying declaration, in `equalListMembers` (`:766-789`).
   - It clears `Equality` and `Indexed` whole, and the abstract half of other entries (not counted).
   - Decision: none, since it is the text's own rule (`apis.tex:249-256`).
   - Walk: none.
   - Cost: a small checker rung, with 4h for the rest.

## 5. By group: the ways that need no decision, and the decisions the others need

| Group | No decision of the curator's | A decision that P-85 or P-55 holds open | A decision of his that the record does not hold, or holds for a diff |
|---|---|---|---|
| Bodies typed by the parent trait (14) | 1a, the leaf `fill` and `tabulate` (5 sites), with 1c, the `cast` (9); or 1c alone (14) | 1b, the bodies through the factory's `tabulate`: P-85's first question, which object chooses the store (my reading). Fork 2's pending answer (6d) would move 5 of the 14 | 1d, public `map` overloads at the element type, with walk's row 760 first; 1e, self-typed leaves (P-87 diff of C4's vocabulary) |
| Sizes tested in a branch (3) | 2a, the `cast` in the arm (3) | 2c, overloading on the witness: row 682, which hangs on fork 3's answer, with walk's family check | 2b, the checker learns the size in the arm (a type-rule revision), with 2c' for `:2946`; 2e, refinement by `if` |
| `Col` and `Row` (2) | 3d, the `cast` of the subscript's value (2); 3a, a `SubArray2` at the run-time offset (2) | 3b, the receiver's `subarray` with the offset opened: fork 3's 4a, P-55's default | 3c, unsized `Col` and `Row` (against P-84, my reading); 3e, a sized subscript (P-85's third question) |
| Export, first error (17) | 4b, the component carries the dead sizes (14), by P-40's letter but against its direction (my reading); 4d, the two ranks commented out of the api (2), which removes them from Part IV; 4f, `array3(v)` in the api, effect not known | none | 4a, decision E's diff (14), which P-40 holds for him with the switch-over's design; 4c, an export check that ignores dead sizes (a revision); 4e, immutable ranks 2 and 3 built |
| Export, second error (44 entries) | 4h's mechanical part (`abstract` written, plain slips); 4i, the export check to `apis.tex` | none | 4h's members whose two texts state different contracts, some beside P-153, P-90 and PLAN item 38 |

- **The no-decision ways together** come to two library rungs and one small checker rung (my reading):
  - the first library rung: 1a, 1c, 2a, 3d or 3a, 4b, 4d and 4f;
  - the second: 4h's mechanical part;
  - the checker rung: 4i.
- **The cost of a rung.** A rung cost 0.96M to 1.71M, all roles, over batches 14 to 18 (`reviews/batch-18-review.md:57`).
- **What they leave** are the second error's contract entries and the dead sizes' proper repair, E3 (P-40). With the rest, the 21 would leave the distance (my reading).
- **The checks.**
  - Each no-decision way keeps walk's values by reading. M1 measured that for 1a, 1c, 2a and 3d, and M2 for 4b.
  - None changes a model line.
  - The rung that builds them would run the walk tests named above and microGPT's quick check (`coordinator/tools/mg-run.sh`). The quick check runs `MicroGptFlatQuick.fss` from `run-c4/src` beside the APL twin; the full pair runs `MicroGptFlatCheck.fss`.

## 6. Measurements

**The setup.** Every run used a fresh private caches folder and `FORTRESS_THREADS=1`, from the main tree's build. The command, for each `DIR` and `P`:

```
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
export FORTRESS_HOME=/home/user/fortress FORTRESS_THREADS=1; unset JAVA_TOOL_OPTIONS
C=$DIR/run-XXXX/caches; T=$DIR/run-XXXX/tmp; printf '\0\0\0\0' > $C/global.map
export TMPDIR=$T FORTRESS_CACHES=$C JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$T"
cd $DIR && nice -n 19 timeout -k 10 900 $FORTRESS_HOME/bin/fortress [typecheck] P.fss
```

- The machine: nproc 4, Intel Xeon Processor @ 2.10GHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`. The loads at start, 8.2 to 19.7, came from climb batch 19's run, so no timing below is a measure.
- The probe programs were scratch and are not kept. Their declarations are quoted below.
- Three earlier runs of M1 stopped at load on slips of mine, and are not results:
  - a parameter named `label`, a keyword;
  - `PrimitiveArray` and `N` without `import NativeArray.{...}` and `import NatReflect.{...}`;
  - `Ratio`, which the api does not export, so the `QQ` case was dropped.

**M1, `ProbeLeafWays.fss` under walk** (load at start 15.78; rc=0, 28 s).

- The declarations:
  - `trait LeafVec[\T extends { Number, MultiplicativeRing[\T\] }, nat s0\] extends { Array1[\T,0,s0\] }` redeclares `tabulate(f:ZZ32->T): LeafVec[\T,s0\]` and `fill(v:T): LeafVec[\T,s0\]` with `StandardMutableArrayType`'s bodies, and `plusT` built through `tabulate`;
  - `object LeafStore` holds a `PrimitiveArray`, with `replica` `array1`;
  - `plusCast(a,b) = cast[\Vector[\T,s0\]\](a.ivmap[\T\](fn (i, e) => e + b.get(i)))`, `negCast` through `map`, `mPlusCast` through `Matrix`'s `ivmap`, `fillCast`;
  - `bf1[\T, nat b0, nat s0\]()`: `__builtinFactory1`'s body with `N[\0\] => cast[\Array1[\T,b0,s0\]\](r)`;
  - the column subscript `a[(0,1)#(2,1)]` of a 2 × 3 `ZZ32` array.
- The output:

```
1a tabulate answers the leaf type at run time: yes
1a fill answers the leaf type: yes
1b tabulate-built body answers the leaf type: yes
1c RR64 plus [0#3][ 0.0 1.0 2.0 ] neg [0#3][ -0.0 -0.5 -1.0 ]
1c ZZ32 plus [0#3][ 0 2 4 ] neg [0#3][ 0 -1 -2 ]
1c NN32 plus [0#3][ 0 2 4 ]
1c RR32 plus [0#2][ 3.0 3.0 ]
1c TransposedMatrix plus [0#3,0#2]
1c the parent's map on a transposed matrix is a Matrix: yes
2a arm at b0 = 0 gives a Vector: yes
2a arm at b0 = 2 gives an Array1 based at 2: yes
3d the column subscript's value is a sized rank-2 array of 2 by 1: yes
3d cast column 1 11 and the library's a[:,1] 1 11
```

**M2, `ProbeDeadSizes.fss` under walk** (load at start 9.21; rc=0, 30 s).

- The declarations: `dot1[\T extends { Number, MultiplicativeRing[\T\] }, nat n, nat m, nat p\](me: Vector[\T,n\], other: Vector[\T,n\]): T = me.dot(other)`, and the api's pair `dotD` (vector and scalar), both with the dead `m` and `p`. Each is called without static arguments.
- The output: `dot1 14.0`, `dotD vector 14.0`, `dotD scalar [0#3][ 2.0 4.0 6.0 ]`.

**M3, `ProbeCover2` through `fortress typecheck`** (load at start 19.68; rc=255, 9 s).

- The api declares `h(): ZZ32`, which the component lacks, and `f[\T, nat s0, nat s1, nat s2\](): ZZ32`. The component defines `f()` and `f(v: T)`.
- The output reports `h` alone:

```
Component ProbeCover2 exports API ProbeCover2
but does not define all declarations in ProbeCover2.
Missing declarations: {h():ZZ32 at …/ProbeCover2.fsi:4:1-6:64}
```

**M4, `ProbeCover` and M5, `ProbeCover3`, through `fortress typecheck`.** rc=0, no error, 13 s and 11 s.

- M4: the api declares `f[\T\](): ZZ32` alone and `g` in both forms; the component defines both forms of each.
- M5: the same shape with a sized generic result, `f[\T, nat s0\](): Box3[\T,0,s0\]` alone in the api, beside `f(v: T)` in the component.

## 7. Found on the way

- **The export check is stricter than `apis.tex` in two places** (my reading of `ExportChecker.scala:766-805` against `apis.tex:249-256` and the text it quotes at `:327-339`):
  - it refuses a concrete component member for an api's `abstract` one: `Equality`'s `=`, `Indexed`'s `size`;
  - it counts the api's abstract members as required.
  - No ledger row names them; I added none, since this brief writes only this note.
- **`array3`'s export entry is not the overload shape.** M3 to M5 show that an api declaring only the zero-argument form, beside a component with both, is not refused against the compiler's prelude. The cause in the library is untraced.
- **The E3 patch is stale.** `library-e3.patch` at `fb10482ba` writes `T extends Number`. The api now writes the two-trait bound, so E3 needs re-basing before it is shown to him.
- **Three dead-size declarations go unreported.** The api's vector `+` and `-` carry a dead `nat m` (`fsi:1649-1656`). The export error does not list them; the cause is not traced.
- **The note's leaf precedent is the revival's.** `array-forks-now.md:56` cites `ImmutableArray1`'s `fill` and `tabulate` as the library's own way. They are the revival's build of P-89 (`f3b62bc83`). The team's leaf redeclarations are `copy`, `map`, `ivmap` and `replica`.
