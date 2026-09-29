<!-- The array questions of PLAN.md R6 (the review of Pavol's decisions, explorations/reviews/decisions-review/judgement.md section 3, omissions 2 to 4, and section 6, item 6; approved by Pavol 2026-09-29), written 2026-09-29 by an Opus worker on branch wip/array-ways, for Pavol, who decides them one per message through the coordinator, and for the coordinator. Every way the language and the library offer, the library's own way first, with the nine steps of protocol principle 2. What the record had measured is cited, not re-run; what was new was measured here, in a worktree with its own build and private caches: decision D's diff re-based and re-measured, four decision A probes on both paths, library copies through the gate's distance stage and under walk, two Java pairs for the element width. Scripts, patches and captures: explorations/reviews/array-design-ways/ and explorations/reviews/decision-d-diff/rebase-2026-09-29/. Nothing tracked outside those two directories and this file was changed. Readings of my own are marked "(my reading)". Nothing here is recommended. -->

# The array questions: every way, the library's own first

## In short

- **Decision D, the model's sized types.** D1 sizes in the model's types through the library's own devices (the re-based diff); D2 the vocabulary over the unsized `Array`, the model unchanged; D3 D1 in the specification's `T^n` notation; D4 every size static from the top, the batch size fixed at compile time.
- **Decision A, `double[]` under the generic traits.** A1 the library's witness `typecase` in the generic factories, returning an `RR64` store through the library's `cast`; A2 a plain `RR64` factory beside the generic one, chosen by dispatch; A3 a factory name per element type; A4 the loader stamps an `RR64` class, the team's `Unbox` direction; A5 a special type, as `ZZ32Vector`.
- **Item 15, arithmetic in a size.** 15a the checker compares size expressions by structure and folds numerals; 15b the storing objects make their field at run time with the library's `primitiveArray`; 15c the specification's static arithmetic in full; 15d a native store per rank.
- **A size known only at run time.** 4a the library's `reflect`, with the checker taught the team's commented rule for opening it; 4b `reflect` built in over design B's size factory; 4c run-time sizes stay unsized; 4d no run-time sizes in the step; 4e a `typecase` that binds a size, after `where` clauses.
- **The element width.** 5a `RR64` as written; 5b `RR32` throughout, with float32 goldens from the reference; 5c the model generic in its width; 5d the width named once by a type alias; 5e `RR32` storage with `RR64` sums, the draft's `Extended`.
- **The bounds of `Vector` and `Matrix`.** 6a `T extends Number` as landed; 6b the storing objects take their traits' bound, a slip under every way; 6c the library's `MultiplicativeRing[\T\]`, alone or beside `Number` in the library's two-trait form; 6d a bound per operation, the products moved out of the traits; 6e the specification's algebra, after `where` clauses; 6f arithmetic on `Number`, against route A.
- **The re-based diff, measured today.** The model: 21 lines out, 29 in, the same lines as on 2026-09-27. C4's own errors on the compiled checker: 26 as written, 14 with the diff (24 and 12 on 2026-09-27; the three `fail` errors are gone and five numeral powers are newly refused as an ambiguous coercion). The diagnostic copies: 28 and 18 with the tuple bindings split; 14 with the dead sizes also deleted; 7 when the powers are written so one declaration applies, the old 10 less the three `fail` errors. Walk: 40 of 40, every value identical.
- **Measured here for the first time.** The library's selection device returns a store written for `RR64` alone through the library's `cast`, and it checks and runs on both paths, sized too; a plain factory beside the generic one compiles and dispatches, and walk refuses the pair. The storing objects' missing bound is a slip: fixed, 19 of V1's 36 errors go and none is new. The ring bound on `Vector` and `Matrix` clears all 36 and brings 8 new errors, because `MultiplicativeRing` is open where `Number` is closed; on the scalar-extension block walk refuses it. The storing objects made at run time with `primitiveArray` clear the 8 storage errors of item 15 with none new, and C4 runs unchanged. `RR32` and `RR64` kernels on the JVM show no difference beyond their noise.
- **The forks, in the order they need deciding** (section 8): item 15; the bounds; a run-time size; the element width; decision D; decision A.

## 0. Words used below

- A *size* is a `nat` static parameter: a number in a type, as in `Vector[\RR64, 16\]`. A *sized* type carries one; an *unsized* type, `Array[\RR64, ZZ32\]`, does not.
- A *store* is the object that holds an array's elements. Today every store is `PrimitiveArray[\T, n\]`, a boxed Java array under walk (`ProjectFortress/LibraryBuiltin/NativeArray.fss:18-30`).
- *Boxing* is holding each number as its own heap object; on the compiled path an `RR64` is an `FRR64` object (FACTS § Execution model, line 12).
- *Stamping* is the class loader writing one class per instantiation of a generic from its template, by substituting names (`coordinator/array-design.md` § 0).
- A *witness* is an argument that carries a static argument and nothing else. The library has two: `__thrower[\T\]`, a function of type `() -> T` never called (`Library/FortressLibrary.fss:2372`), and `N[\n\]`, an object whose type carries a size (`ProjectFortress/LibraryBuiltin/NatReflect.fsi`).
- *Opening* a size is binding a size parameter to a number known only at run time, inside the code that runs with it. The type theory calls it unpacking an existential.
- A *bound* is the `extends` clause of a type parameter: `T extends Number` admits only number types for `T`.
- *The distance stage* is the gate's full checker measurement of the one library (`coordinator/tools/distance/run.sh`); its classes V1, V2 and Z1 are the array ones (`coordinator/tools/distance/classify.py:59-104`).

## 1. What was measured for this note

- The machine: 4 CPUs, Intel Xeon @ 2.10 GHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`, load 1 to 10 (other workers' runs; the VM restarted at 14:35 UTC and every run it cut was run again). Every capture's first lines name the load at its start. No timing below compares two runs; each width pair is taken in one JVM.
- The tree: `main` at `6bc21c364`. Nothing under `Library/`, `ProjectFortress/LibraryBuiltin/` or `ProjectFortress/src/` has changed since `2770550c3` (batch N's rung M), so the batch N gate's distance table is today's (`compile-ladder/climb-batch-N/gate/distance.txt`, 627 errors; its sites `distance-sites.tsv`).
- The new measurements, each with its script and captures:
  - Decision D's diff re-based past climb batch 7's rename and checked on six copies (C4 as written, with the diff, their two split copies, the split copy beside the E3 library copy, and that copy with the powers written to one declaration), plus one with two planted errors; walk's check program on the patched copy. `reviews/decision-d-diff/rebase-2026-09-29/` (`run.sh`, `pow-variant.py`, `measure/`, `walk-threads1.txt`).
  - Four decision A probes, compiled and run in the compiler's own world and run under walk (`reviews/array-design-ways/probes/`, `run.sh`, `*.compile.txt`, `*.run.txt`, `*.walk.txt`).
  - Four library copies and an unchanged one through the gate's distance stage, each copy's sites compared with the unchanged one's (`reviews/array-design-ways/lib-variants.py`, `distance-copy.sh`, `sites-vs.py`, `captures/distance-*.table`, `captures/sites-*-vs-L0.txt`); the team's array tests under walk against five copies and an unchanged one (`walk-copy.sh`, `captures/walk-*.txt`); C4's check program under walk against one copy (`walk-c4-copy.sh`, `captures/walk-c4-STORE.txt`). The unchanged copy gives 625 errors where the gate gave 627, within the stage's stated run-to-run variation (`coordinator/tools/distance/run.sh`, its header); the big-operator class differs between any two runs at sites that name no array.
  - Two Java pairs for the element width, one JVM each (`probes/width/`).

## 2. Question 1, decision D: the model's own sized types

**The question.** C4's arrays are unsized in the model's own types, and the library's operators that the model applies to them are sized. On the compiled path, which checks the static types, the two meet at every such application. How do sizes enter the model's text?

**The mathematics.** A shape is part of an operation's type: an m × n matrix times an n × p matrix is m × p, and a dot product takes two vectors of one length. A shape error is a type error, found without running anything.

**What each path does today, measured today** (the re-based diff and its driver are `reviews/decision-d-diff/rebase-2026-09-29/`; captures under its `measure/`):

- Walk dispatches on the run-time object. C4 builds its arrays with `array[\RR64\](n)`, whose objects are `Vector` and `Matrix` underneath (`Library/FortressLibrary.fss:2047`, `:2375-2379`), so C4 runs; its check program passes 40 of 40 (FACTS § The library's arrays and algebra, line 137).
- The compiled checker against the one library, C4 as written: 26 errors of C4's own (`measure/base.own.txt`).
  - 15 are decision D: the four row lifts, `plane` and the three `reflect` bridges in `FlatArrays`, `parseRow` twice in `FlatData`, `gather` twice and `DOT` three times in the model.
  - 5 are new since 2026-09-27: `10.0^(-5)` on the hyperparameter line (its second power, `10.0^(-8)`, is not reached), `10.0^10` in the mask, and the check program's three tolerances, each refused as an ambiguous coercion. `RR64`'s `^` on an `RR64` and `MultiplicativeRing`'s `^` on a `ZZ64` both apply only by converting the integer, and since batch N's rung I such a tie is refused (FACTS § The checker and the one library, line 79; `8dc1a74d9`). No ledger row names these sites; walk takes them.
  - 6 are the old small ones: `Character.codePoint`, `Diag`'s product body, the varargs `SUM` in `flat`, the varargs export, `matShape`'s body (row 474), `view`'s arity.
  - The 3 `fail[\T\]` errors of 2026-09-27 are gone (batch 7's rung B, `de22fd928`).
- The old counts were 24 before and 12 after (`reviews/decision-d-diff.md` § 5). Today's differ from them by those two changes on every copy:
  - C4 as written: 24 → 26.
  - With the diff: 12 → 14 (`measure/d.own.txt`). All 15 of decision D are gone as such; 3 `DOT`s fail on the library api's dead sizes (decision E's E3), 1 is the `adam` bridge, 1 is `numbersOf`'s discarded count, 5 are the powers, 4 are old small items.
  - The diagnostic copies, which write C4's three top-level tuple bindings as single bindings on the same lines (row 474's silent stop; not a model change): 25 → 28 before the diff, 15 → 18 after (`measure/base-split.own.txt`, `measure/d-split.own.txt`).
  - The split copy after the diff, beside a library copy without the 17 dead sizes (E3): 10 → 14 (`measure/d-split-e3.own.txt`). Here the powers do more than add errors. A refused power ends the check of its block, so `stepN` is now checked only to its mask line (`MicroGptFlat.fss:61` of the patched copy) and `adamN` to its update line (`:87`), where on 2026-09-27 the whole of `stepN` checked clean.
  - With the powers also written so that one declaration applies (a diagnostic copy, `rebase-2026-09-29/pow-variant.py`, not a model change): 7 (`measure/d-split-e3-pow.own.txt`). They are the old 10 less the three `fail` errors: the two bridges, `adamN`'s vector-plus-scalar division (row 475), `numbersOf`'s discarded count, the varargs `SUM` and export, `codePoint`. Two planted errors, one inside `rmsn_b` and one after `stepN`'s last statement, are both reported (`measure/d-split-e3-pow-plant.own.txt`), so the check reaches the end of the step: the forward and backward passes check clean at their sizes.
- Walk runs the patched C4: `MicroGptFlatCheck`, private cache, `FORTRESS_THREADS=1`, 40 PASS of 40 in 826 s at a load of 6 at the start, every line identical to `run-c4/checks/threads1.txt` once the timings are masked (`rebase-2026-09-29/walk-threads1.txt`). Not run: four threads.

**The specification, under every spelling.**

- The sized array type: "The type of a k-dimensional array expression is Array k[T, 0, n0, ..., 0, n(k-1)] ... This type can be abbreviated as T[n0, ..., n(k-1)]" (`Specification/basic/expressions/aggregate.tex:130-137`).
- The vector and matrix types, with sizes as exponents: "a vector of length n with element type T is written T^n" (`Specification/preliminaries/overview.tex:1075-1079`); `Matrix[T][n0 × ... × n(k-1)]`, abbreviated `T^(n0 × ... × n(k-1))`, in a margin note (`aggregate.tex:152-170`). Under walk `T^n` parses and denotes the library's `Number`-only `Vector` (row 24).
- A size in a signature: `makeVector`, "a nat parameter s0, which appears in both the parameter type and return type" (`Specification/basic/trait-parameters.tex:94-97`); a size "may be used ... in any context that a variable of type ℕ32 can appear" (`:83-86`).
- Two factories side by side: `array[E](size)` for "the specified runtime-determined size" and `array1[E,n]()` for "statically determined size n" (`Specification/advanced/parallelism-locality/arrays-distributed.tex:42-48`).
- A generic function named without its static arguments: "most identifier references do not include them; the static arguments are statically inferred from the context of the function call" (`Specification/basic/expressions/var-ref.tex:35-40`). The inference chapter as batch N's rung T wrote it leaves "an expected type in any context other than those listed above, such as an argument of another call" undescribed (`Specification/basic/inference.tex:201-205`).

**The library's own practice.**

- Sized results with shared sizes on every product: `opr DOT[\T extends Number, nat n, nat m, nat p\](me: Matrix[\T,n,m\], other: Matrix[\T,m,p\]): Matrix[\T,n,p\]` (`Library/FortressLibrary.fsi:1701-1703`; FACTS line 131).
- An unsized public face for a size known only at run time, opened into a generic helper by `reflect`: `array[\E\](x:ZZ32):Array[\E,ZZ32\] = __arr1(__thrower[\E\],reflect(x))` (`Library/FortressLibrary.fss:2047`, `:2055-2056`). Ledger row 25 calls this "the sanctioned escape".
- The sized factories `vector[\T,s0\]()`, `matrix[\T,s0,s1\]()`, `array3[\T,s0,s1,s2\]()` (`FortressLibrary.fsi:1578`, `:1688`; `FortressLibrary.fss:2955`).
- The focused APL base's `FlatArrays2` already declares the model's operations with their sizes (FACTS line 131).

**The peers** (the record's survey, `reviews/size-runtime-design-brief.md` § 6): C++, Rust and Chapel put sizes in types and make each instantiation its own code; Julia makes a size a type parameter and specialises per value at run time; Haskell carries type-level sizes and reflects a run-time number with `someNatVal`. Futhark writes sizes in function types and gives a function whose result length is known only at run time an existential size, "?[m].[m]t" (https://futhark.readthedocs.io/en/latest/language-reference.html, section 3.10.1).

**The commits.** The team's library declared the sized traits and products and never checked them; the checker has checked sizes since climb batch 4's rung N (`3f297441c`), and the compiled run carries them since batch 5's rung Z (`e893a3e00`).

**The ways.**

1. **D1, sizes in the model's types through the library's own devices** (the re-based diff, `rebase-2026-09-29/decision-d.patch`). The model: 21 lines out, 29 in, the same lines as on 2026-09-27; no operator changes. The vocabulary: `FlatArrays.fsi` 30 lines out, 46 in; `FlatArrays.fss` 57 out, 65 in; `FlatData` 11 out, 12 in. The re-base changed only what climb batch 7's rename forced: 11 vocabulary lines now call `tabulate` and `tabulatedVector` where the old patch called `fill(f)` and the function form of `vector`, and one comment. What forces the model's 29 lines, by reading the diff (my reading):
   - 5 are the model's own functions with sized signatures: `rmsn`, `sm`, `rmsn_b`, `sm_b` and the `view` helper.
   - 2 are the local helpers `h` and `u`, sized and taking witnesses.
   - 10 open sizes known only at run time (question 4): the import of `NatReflect`, the two comment lines naming the sizes, the `step` bridge (2 lines) and `stepN`'s header (2), the `adam` bridge (1) and `adamN`'s header (2).
   - 5 write a size that no argument carries: `corpus.tokens[\R\]`, the nine `view[\V,E\]`, the two `onehot(…, N[\V\])` lines, and the mask moved into the step, whose size `T` is the step's parameter.
   - 7 write the size of a generic function passed to the row lift, `rows(rmsn[\E\], x)`. Both paths refuse a generic function as a value without it (row 156). The specification says such arguments are inferred from context (`var-ref.tex:35-40`), and its inference chapter does not yet describe that context (`inference.tex:201-205`). With that inference built, these 7 lines would stay as they are today (my reading).
2. **D2, the vocabulary over the unsized `Array`, the model unchanged.** The products the model uses (`DOT`, juxtaposition, `rows`, `gather`, `diag`) declared over `Array[\RR64,I\]` beside the library's sized ones. No model line changes. The checker then never sees a shape, and the sized products are not what the model runs: this is the sidestep his ruling of 2026-09-19 refuses ("I don't know [that] we can sidestep the nat issue", POSITIONS line 38).
3. **D3, the specification's own spelling of the same types.** D1 with `RR64^s` for `Vector[\RR64,s\]` and `RR64^(r × c)` for `Matrix[\RR64,r,c\]` (`overview.tex:1078`, `aggregate.tex:152-170`). The same lines change; they read shorter. Measured on a six-line program (`reviews/array-design-ways/probes/pow/TPow.fss`): the compiled checker against the one library stops the component, "Desugaring MatrixType at TPow.fss:7.19 to TraitType is not yet supported" (`TPow.check.txt`); walk parses the signature and fails at the call, "Cannot unify __DefaultVector[\RR64,3\] ... with MatrixType" (`TPow.walk.txt`). Neither path takes the spelling today; it needs the type `T^n` desugared to `Vector[\T,n\]` on both.
4. **D4, sizes static from the top** (my reading, not measured). Every size of the step is a literal somewhere up the call chain if the batch size is a static choice: the check program calls the step at batch 1 and batch 4. The step then takes its sizes as static parameters from its callers, and the `reflect` bridges go; the model's api `MicroGptFlat.fsi` and the check program's calls change instead. It fixes the batch size at compile time.

**What each costs.**

- D1 changes 29 model lines, each shown to him as a diff (POSITIONS 2026-09-19). What is left for the model's gate after it, measured: the api's 17 dead sizes (decision E's E3; the regenerated patch `rebase-2026-09-29/library-e3.patch` applies to today's tree), a rule to open a run-time size (question 4), the powers' tie, the tuple-binding defect (row 474), the vector-plus-scalar `+` (row 475), the `Character` crash (row 477), and four small items.
- D2 changes no model line and gives up the checked shapes.
- D3 is D1 with the specification's notation, and first the desugaring of `T^n` on both paths.
- D4 moves the change from the model's step into its api and caller, and removes the run-time sizes the step opens.

## 3. Question 2, decision A: what puts `double[]` under the library's generic array traits

**The question.** His decision of 2026-09-19 makes the store a JVM `double[]`, and the library's arrays are generic in their element type: `Vector[\T, nat s0\]` keeps its elements in `mem: PrimitiveArray[\T,s0\]` (`Library/FortressLibrary.fss:2339-2345`). What makes a `Vector[\RR64, 16\]` hold a `double[]` while a `Vector[\T, 16\]` of another `T` keeps a boxed store?

**The mathematics.** None: the choice changes how the numbers are held, not what they mean.

**What each path does today.**

- Walk: every store is `PrimitiveArray`, boxed values in an `AtomicArray` (`coordinator/array-design.md` § 1). The team wrote one unboxed store: `object PrimImmutableRR64Array[\nat s0\]() extends ImmutableArray1[\RR64,0,s0\]` over a Java `double[]` (`ProjectFortress/LibraryBuiltin/NativeArray.fss:43-52`; `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/PrimImmutableRR64Array.java`). Jan Maessen, 2008-07-28: "Immutable arrays of unboxed RR64. When you request an immutable array of RR64 these should be used in preference to the boxed version" (`353818213`). No library file names it; nothing selects it.
- The compiled path: stamping renames classes and cannot produce a `double[]` field (`coordinator/array-design.md` § 2, probe 1). The only unboxed stores are two hand-written Java classes, `FZZ32Vector` over an `int[]` and `FStringVector`, lowered straight to their classes by a table in the code generator; every element read is boxed through seven frames; a native helper cannot take a Java array (FACTS § The territory map, line 160).
- What an unboxed store buys alone, measured on 2026-09-20: nothing. The dot product over a `double[]` read and written through a boxing accessor is 8.9 times primitive, against 6.4 times for boxed storage; the matrix product 6.6 against 6.2 (`reviews/array-design-review.md`, Serious 4; `compiler-probes/array-design-review/java-medians.tsv`). The traffic is unboxed only by decision B, phase 6 (PLAN.md).
- The library's selection device, measured here on both paths (`reviews/array-design-ways/probes/`, one private cache per path; the compiled path in the compiler's own world, since the switch-over has not happened):
  - `WayANoCast.fss`: a generic factory with the library's witness `typecase` (`array1`'s, `FortressLibrary.fss:2375-2379`) whose `RR64` arm returns a store written for `RR64` alone. The checker refuses it, "Function body has type OR(DStore,BStore[\T\]), but declared return type is Arr[\T\]", as on 2026-09-20; walk runs it and picks `DStore` for `RR64`.
  - `WayACast.fss`: the same arm through the library's `cast`, `cast[\Arr[\T\]\](DStore(...))`, the device of `additiveIdentity` (`FortressLibrary.fss:3140-3155`). The checker accepts it. The compiled run and walk both print `RR64 DStore 1.5` and `ZZ32 BStore 7`.
  - `WayACastSized.fss`: the same with sizes, `vec[\T, nat n\]` returning `cast[\Vec[\T,n\]\](DVec[\n\](...))`. Accepted; both paths pick `DVec[\16\]` for `RR64` and the generic store for `ZZ32`, and a function with a shared size takes two of them.
  - `WayASpec.fss`: specialisation by overloading, a plain `mk(w: () -> RR64, x: RR64)` beside the generic `mk[\T\](w: () -> T, x: T)`, called from generic code with the library's witness. The checker accepts it and the compiled run dispatches to the plain declaration for `RR64` and to the generic one for `ZZ32`. Walk refuses the pair when it loads the program, "has a parameter with generic type, at least one pair of parameters must have excluding types", its declaration-time family check (rows 159 and 475).

**The specification.**

- "Fortress arrays are complex data structures; simple linear storage is encapsulated by the HeapSequence type, which is used in the implementation of arrays" (`Specification/advanced/parallelism-locality/arrays-distributed.tex:18-22`), marked not yet supported (`:15-16`).
- Jan Maessen's note on unboxed types, recorded in the draft: "Do we want to permit arrays of fixed bounds to be unboxed? No. Unboxed arrays are a different other thing. Among other things, an array of fixed bounds may be a segment of another array" (`Specification/appendices/future.tex:42`). The sized array is a structure; the linear store under it is what is unboxed.
- Jan's own example of the selection, in the draft's future work on overloading by static parameters: `array1[\T extends Object, nat s0\]()` beside `array1[\T extends Number, nat s0\](): Vector[\T,s0\]` (`future.tex:236-246`). The library's `array1` does it with the witness `typecase` meanwhile, "TODO: fix when Number is covariant" (`FortressLibrary.fss:2374`).
- The compiled encoding: "mentions of static parameters are replaced with their upper bounds" (`Papers/Implementation/MethodMapping.tex:134`), which is why stamping renames and nothing more.

**The commits.** David Chase's unboxing plan, "Cases for unboxing: 1) primitive. ZZ{8,16,32,64}, RR{32,64}, Boolean ... 3) unboxed fields" (`ProjectFortress/src/com/sun/fortress/compiler/optimization/Unbox.java:21-27`, first in `bce8b45ae`, 2009-03-07), referenced by nothing; and the loader's place for it, "if (false) { // Here will go all the magic expando-stuff." (`ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java:168-172`, first in `4179cee84`, 2009-07-29).

**The peers.**

- .NET: "When a generic type is first constructed with a value type as a parameter, the runtime creates a specialized generic type ... Specialized generic types are created one time for each unique value type"; for reference types one shared version (https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/generics/generics-in-the-run-time). A loader-made class per instantiation.
- Java: "JEP 218: Generics over Primitive Types", status Candidate: "extend generic types to support the specialization of generic classes and interfaces over primitive types" (https://openjdk.org/jeps/218).
- Scala: `@specialized` makes the compiler "generate specialized versions of generic code for specified types" (https://www.scala-lang.org/api/2.13.x/scala/specialized.html); Spire warns that "specialization will increase bytecode size by a factor of x2-10" (https://spire-math.org/guide.html).
- Haskell: `Data.Vector.Unboxed` "picks an efficient, specialised representation for every element type" through a data family chosen by the `Unbox` class (https://hackage-content.haskell.org/package/vector-0.13.2.0/docs/Data-Vector-Unboxed.html). A representation per element type, selected by the type.
- Julia, C++ and Rust compile a copy per concrete type (`reviews/size-runtime-design-brief.md` § 6).

**The ways.** Every way but A4 needs a hand-written Java store over `double[]`, on the `FZZ32Vector` pattern, and a Fortress object for it written for `RR64` alone, as `PrimImmutableRR64Array` is; they differ in what selects it.

1. **A1, the library's selection device with the library's `cast`** (`WayACast`, `WayACastSized`, measured). The generic factories `vector`, `matrix`, `array1` to `array3` and their tabulated forms test the witness and return the `RR64` store through `cast` for `RR64`, the generic store otherwise. The library's text keeps its generic types; the model's `vector[\RR64,s\]` gets the unboxed store with no line of its own. The cast is one run-time type test per array made, not per element (my reading). The draft's own spelling of the same selection is overloading by the element type's bound (`future.tex:236-246`); it still needs the cast to return a store written for one type (my reading).
2. **A2, specialisation by overloading on the witness** (`WayASpec`, measured). A plain factory for `RR64` beside the generic one; dispatch chooses from generic code. No cast. Walk refuses the pair at load today; answer 9's walk rung (batch 7b's W, "walk's choice by declared domains", PLAN.md) is where walk's family check changes, and whether it then takes this pair is not measured.
3. **A3, a factory name per element type,** `rr64Vector[\s0\]()` beside `vector[\T,s0\]()` (`reviews/array-design-review.md` § 3, decision A's A3). No selection at run time; the model names the `RR64` factory, and `vector[\RR64,s\]` stays boxed. The library's precedent is a factory name per kind of array: `array1`, `vector`, `primitiveArray`, `immutableArray` (`FortressLibrary.fsi:1428-1438`, `:1571-1579`).
4. **A4, the loader stamps a different class for an `RR64` instantiation,** the team's direction (`Unbox.java` cases 1 and 3, the loader's stub). `PrimitiveArray⟦FRR64,n⟧` gets a `double[]` field; no library line changes and nothing selects. The peers' shape (.NET, JEP 218, `@specialized` at compile time). The largest change, in the loader and the code generator; nothing of it exists and no probe has been run. An element read through the generic trait's `get` still returns a box unless decision B unboxes by static type (my reading).
5. **A5, a special type,** the compiled world's own precedent: an `RR64Vector` lowered to its Java class by the code generator's table, as `ZZ32Vector` is (FACTS line 160). A type the specification does not have; the model names it.

**What each costs.** A1: the store class and object, the bodies of the generic factories (`vector`, `matrix`, `array1` to `array3` and their value and function forms), a cast per array made; measured to check and run on both paths. A2: the same store, one plain factory per native element type, and walk's family check. A3: the store and one factory per element type; a model line wherever a factory is named. A4: loader and code-generator work of unknown size. A5: a type outside the specification. None changes the speed alone; decision B does (the measurement above).

## 4. Question 3, PLAN item 15: arithmetic in a size

**The question.** The one library stores every rank-2 and rank-3 array in a field whose size is a product of sizes, `mem:PrimitiveArray[\T, (s0 s1)\]` (`Library/FortressLibrary.fss:2552`, `:2700`, `:2923`), and `reflect` computes its sizes, `__refl'[\r+b, b+b\]` (`ProjectFortress/LibraryBuiltin/NatReflect.fss:45`, `:47`). The compiled checker refuses arithmetic in a size by name (climb batch 4's rung N). What gives the library its storage?

**The mathematics.** An r × c matrix laid out row by row is a vector of r·c elements. Two size expressions are equal when they denote the same number for every value of their symbols: `s0 s1` equals `s1 s0`, which a comparison of the written forms does not see.

**What each path does today.**

- Walk evaluates a size expression when it instantiates, juxtaposition, `+` and `-` included (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:457-464`). Every matrix C4 makes lives in such a field.
- The checker, the batch N gate: class Z1, 11 errors, "Arithmetic on nat static arguments is not supported by the type checker; use a nat parameter or a literal". Six are the three fields' types and their constructor calls (`FortressLibrary.fss:2552`, `:2700`, `:2923`), two the same types reported at `NativeArray.fsi:12`, three `reflect`'s helper (`NatReflect.fss:45`, `:47` twice) (`compile-ladder/climb-batch-N/gate/distance-sites.tsv`, classified).
- The compiled run: the name mangler spells a size expression as its operator node (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1899-1904`); design B's `RTTIsize.of` makes a descriptor from a number's text (FACTS line 114); nothing evaluates an expression at stamping. No compiled program has a product in a size.
- 15b, measured on a library copy (`reviews/array-design-ways/lib-variants.py STORE`): through the distance stage the total goes 625 → 613 against an unchanged copy run through the same driver (`captures/distance-STORE.table`, `captures/distance-L0.table`). By site (`captures/sites-STORE-vs-L0.txt`): the 8 storage errors of Z1 go, `reflect`'s 3 stay, and no error is new; the other differences are big-operator sites that differ between any two runs and name no array. Under walk the team's seven array tests print the same against the copy (`captures/walk-STORE-*.txt`), and C4's check program passes 40 of 40 with every printed value identical to `run-c4/checks/threads1.txt` once timings are masked (`captures/walk-c4-STORE.txt`, 754 s at a load of 6).

**The specification.**

- "Static expressions are not yet supported" (`Specification/basic/expressions/constant.tex:15`); "Static expressions which use a restricted subset of operations can occur as static arguments" (`:23-24`), the subset never listed; numeric static expressions combine with `+`, `-`, `×`, `·`, `/`, `!`, `MIN`, `MAX`, `√`, `floor`, `ceiling`, `gcd` and more (`:110-133`). A `nat` parameter's value has type `NaturalStatic` (`:96-97`).
- The team's meeting: overloading `f(x: T[\n+1\])` beside `f(x: T[\0\])`, "now that n+1 is necessarily nonzero": "Not allowed" (`Specification-1.0-frozen/appendices/internal-document.tex:167-182`).
- The chapter on static parameters opens "Non-type static parameters and static expressions are not yet supported" (`Specification/basic/trait-parameters.tex:15-17`).

**The library's own practice.** The three fields and `reflect` are the only arithmetic in sizes in the library (`reviews/array-design-review.md`, Serious 5). A run-time size is made by the library's own factory `primitiveArray[\E\](x: ZZ32): Array[\E,ZZ32\]` (`FortressLibrary.fsi:1438`, `FortressLibrary.fss:2084-2086`), which returns the unsized `Array` and hides the size behind `reflect`. A size read as a value is a `ZZ32` (POSITIONS 2026-09-28, item 25), so `s0 s1` computed as a number is ordinary arithmetic.

**The peers.**

- Futhark: "Sizes can be any expression of type i64 that does not consume any free variables", yet "a range expression 0..<(n+1) will give produce an unknown size" (https://futhark.readthedocs.io/en/latest/language-reference.html, sections 3.10 and 3.10.1.3): a size expression is written freely and compared narrowly.
- Rust: `N + 1` in a type is refused on stable; it is the unstable `generic_const_exprs` (`reviews/nat-checking-plan.md` § g).
- Haskell: `+` and `*` on type-level naturals are solved only for closed literals; the algebra is a compiler plugin (`nat-checking-plan.md` § g).
- C++: a non-type argument "must be const or a constexpr expression", evaluated at each instantiation, so no symbolic equality is ever needed (`reviews/size-runtime-design-brief.md` § 6).

**The ways.**

1. **15a, the checker compares size expressions by their written structure and folds numeral products** (the default on record, `reviews/batch-3.5-4-conformance.md` finding 1; `coordinator/CLIMB-BATCH-7.md:43`, "batch 8 or later"). The three fields and `reflect`'s helper are well formed; a product is equal to the same product. By reading it clears the 11 Z1 errors; not measured. The compiled run then needs the loader to evaluate a size expression when it stamps, before `RTTIsize.of` (by reading, not built).
2. **15b, the library's own way around the rule: the field made at run time.** Each of the three storing objects makes its field with the library's run-time factory, `mem: Array[\T,ZZ32\] = primitiveArray[\T\](s0 s1)`, the product computed as a number. Three library lines, no checker change; the field's type loses its size, which nothing reads (the objects index it by `i s1 + j`). Measured below.
3. **15c, the specification's static arithmetic in full**: a normalising solver over `+`, `×` and the rest, so that `s0 s1 = s1 s0` is proved. The largest checker work; Haskell needs a plugin for it; nothing in the library or C4 needs more than 15a (my reading).
4. **15d, a native store per rank**, `PrimitiveArray2[\T, nat s0, nat s1\]` holding both sizes, so no type needs a product. The library has only a rank-1 native store (`NativeArray.fsi:12-16`); the compiled world's `FZZ32Vector` keeps a second dimension in one object (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32Vector.java:14-19`). New natives on both paths.

**What each costs.** 15a is one checker rung and a loader evaluation for the compiled run. 15b is three library lines and changes no rule. 15c is open-ended. 15d is two new natives per path.

## 5. Question 4: a size known only at run time

**The question.** Some sizes exist only when the program runs: the batch's rows `|b| blockSize`, a file's length, the flat parameter vector's length. The library turns such a number into a size with `reflect`. What makes that pass the checker and run compiled?

**The mathematics.** A value whose length is known only at run time has a type "there is an n such that it is a vector of length n", an existential. To use n, a scope names it (opens it), works with it, and returns nothing whose type still mentions it, unless that type holds every length.

**What each path does today.**

- Walk: `reflect(z)` builds an `N[\n\]` by taking `z` apart into binary digits through a generic helper whose sizes it computes, `__refl'[\r+b, b+b\](x-b)` (`ProjectFortress/LibraryBuiltin/NatReflect.fss:42-55`). Passing that object where a parameter of type `N[\n\]` is expected binds `n` at dispatch (walk's `IntNat.unifyStaticArg`, `coordinator/array-design.md` § 6b). C4 runs on it.
- The checker, measured by the batch N gate (class V2 of `compile-ladder/climb-batch-N/gate/distance-sites.tsv`, classified): `reflect` returns the trait `NatParam`, and a `NatParam` is not an `N[\n\]`, so the library's own run-time factories are refused, six of them: `__arr1`, `__arr2`, `__arr3`, `__imm1`, `__parr`, `__piarr` called from `array`, `immutableArray`, `primitiveArray` and `primitiveImmutableArray` (`Library/FortressLibrary.fss:2047-2091`). So are three `subarray` calls that pass witnesses, and two `typecase N[\b0\] of N[\0\]` clauses are reported unreachable (`:2355`, `:2366`).
- The checker on decision D's diff, measured today: the `step` bridge's call of `stepN` with seven `reflect` results (`MicroGptFlat.fss:54` of the split copy) and the `adam` bridge's call of `adamN` with unsized arrays (`:82`) are both refused (`measure/d-split.own.txt`).
- The compiled run: `reflect`'s own body computes in its sizes, which the checker refuses by name (3 of class Z1's 11: `NatReflect.fss:45`, `:47` twice). No compiled program runs `reflect`.

**The specification.**

- "These parameters are instantiated at runtime with numeric values" (`Specification/basic/trait-parameters.tex:82`): a size is a run-time value in the specification, not only a compile-time one.
- A `where` clause "may introduce new static variables" that are not static parameters (`trait-parameters.tex:312-316`). That is the draft's device for naming a static variable that no argument list declares. `where` clauses are not supported: "Widening and where clauses are not yet supported" (`Specification/basic/conversions-coercions.tex:15`), and code generation refuses any declaration with one (FACTS § The territory map, line 158).
- The team's own statement of the missing rule is a comment in the library, not the specification: `trait NatParam (* comprises { N[\n\] } where [\ nat n \] *)` (`NatReflect.fsi:23`, `NatReflect.fss:24`), and "Really this just proves that it can be done without extending the language. Having proven that, we ought to build it in and document it in the spec for clarity and sanity's sake" (`NatReflect.fss:38-40`). Jan Maessen wrote it by 2007-05-17 (`da43f8872`, the commit that adds the sentence).

**The library's own practice.** `reflect` and one generic helper per shape, taking `N[\n\]`: `array[\E\](x) = __arr1(__thrower[\E\], reflect(x))`, with the comment "This should be local to array, but we don't support local parametric methods" (`FortressLibrary.fss:2047`, `:2052-2056`). Ledger row 25 names it "the sanctioned escape". Where a value of an unsized type must be used at a sized one, the library's device is `cast[\T\]`, a run-time test (`FortressLibrary.fss:33-37`).

**The peers** (the record's survey, `reviews/size-runtime-design-brief.md` § 6, and `reviews/nat-checking-plan.md` § g):

- Haskell: `someNatVal` "converts an integer into an unknown type-level natural"; a pattern match opens it. This is `reflect`.
- Futhark: "The function returns an array of some existential size m, but it cannot be known in advance", written `?[m].[m]t` in the type (https://futhark.readthedocs.io/en/latest/language-reference.html, section 3.10.1).
- Julia: `Val(n)` from a run-time `n` works by dynamic dispatch, "the same problem all over again".
- Rust: a const generic is known at compile time; there is no run-time size in a type.
- Chapel and Fortran: the rank is static and the extents are run-time values on the object.

**The ways.**

1. **4a, the library's own `reflect`, with the checker taught the team's commented rule.** At a call, an argument of type `NatParam` where the parameter is `N[\n\]` opens `n` as a fresh size for that call. The call is accepted when its result type does not mention `n`, or mentions it only below a type that holds every size (`Array1[\E,0,n\]` returned as `Array[\E,ZZ32\]`). Touches the checker's application rule (rung N's size track in `Formula`, `compile-ladder/rung-nat-checker/REPORT.md`) and one sentence of the specification. By reading, it clears the six factories of class V2 and the `step` bridge; not measured. The `adam` bridge passes unsized arrays, not witnesses; under this way it becomes a helper taking `reflect(|p|)` whose body casts each array to `Vector[\RR64,n\]` with the library's `cast` (my reading; not probed).
2. **4b, `reflect` built in, as its comment asks.** The run-time half becomes a native: the number becomes the size's descriptor through design B's factory `RTTIsize.of` (FACTS § Landed semantics, line 114), and the object `N[\n\]` is made for it; FACTS line 43 records the size-rung probe worker's reading that under the factory "a size made at run time (`array[E](n)`) gets its descriptor directly". It replaces the binary decomposition, which stamps about two helper instances per binary digit on the compiled path (my reading of `NatReflect.fss:42-47`), and its three Z1 errors. The checker half is still 4a's rule. A `.java` rung; unprobed.
3. **4c, no opening: run-time sizes stay unsized.** The library's public `array[\E\](x)` already returns the unsized `Array`. The code that uses such an array stays unsized too; for the model that is decision D's D2 for the step.
4. **4d, no run-time sizes in the step** (decision D's D4). Every size is a literal somewhere up the call chain when the batch size is a compile-time choice; the checker and the compiled run need nothing new.
5. **4e, a `typecase` clause that binds a size** (`typecase b of N[\n\] => … n …`). There is no spelling: a clause binds a value name, not a static variable (FACTS § The checker and the one library, line 77), and the draft's device for a new static variable is the unsupported `where` clause.

**What each costs.** 4a is one checker rung and a specification sentence, and it is what the library's own factories need to pass the checker at all. 4b is a `.java` rung on top of 4a. 4c keeps the model's step unchecked in its shapes. 4d fixes the batch size at compile time and changes the model's api and its caller. 4e needs `where` clauses first.

## 6. Question 5: the element width, `RR32` or `RR64`

**The question.** microGPT's weights and activations are `RR64`. His premise (POSITIONS 2026-09-25, row 40's entry): language models are trained at 32-bit floats at most. Which width does the model use?

**The mathematics.** `RR32` is IEEE binary32: a 24-bit significand, about 7 decimal digits, unit roundoff 2^-24 ≈ 6e-8. `RR64` is binary64: 53 bits, about 16 digits, 2^-53 ≈ 1.1e-16. A sum of n terms can lose up to about n unit roundoffs; for the 4,192-term dot product that bound is about 2.5e-4 relative in `RR32` and 5e-13 in `RR64` (my reading of the standard bound).

**What each path does today.**

- The one library: `value object RR32 extends RR64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47`), a subtype, which the specification's "mutually exclusive" number types forbid. Its binary natives die when the other operand is any other number (row 435). A radix-point numeral at a typed `RR32` binding is refused on both paths, `a: RR32 = 1.5` (row 454), because a numeral with a radix point is a `FloatLiteral`, which extends `RR64` (`FortressBuiltin.fsi:44`). Batch 6.5b's rung V, in flight, makes `RR32` a sibling that `RR64` converts from, with its own arithmetic (`coordinator/CLIMB-BATCH-6.5.md:219-227`).
- The compiler's prelude: `RR32` a sibling, `RR64` coercing from it (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435`).
- C4 is `RR64` throughout: the type is named on 17 lines of `MicroGptFlat.fss`, 75 of `FlatArrays.fss` and 8 of `FlatData.fss`; 7 of the model's lines carry a radix-point numeral, among them `10.0^(-5)`, `0.0 MAX m0` and the `1.0 headDim` that turns a size into a float (`explorations/run-c4/src/MicroGptFlat.fss:18`, `:29`, `:59`, `:60`, `:64`, `:66`, `:82`).
- The check: the goldens are the reference at "batch 1, float64" (`explorations/experiment/run-c-goldens/README.md:5`), and the tolerances are 1e-12 on losses and gradients and 1e-8 on finite differences (`run-c4/src/MicroGptFlatCheck.fss:16-18`), which only `RR64` can meet (my reading).
- The reference itself takes the width as an option: "dtype=fp32", `DT = np.float32 if args.get('dtype', 'fp64') == 'fp32' else np.float64` (`explorations/apl/reference/hsu-flat/microgpt_flat.py:12`, `:23`). So `RR32` goldens can come from the same unmodified script.
- On the JVM, measured here: the dot and matrix kernels of `perf-probes/kernels/java/` over `double[]` and over `float[]`, interleaved in one JVM, each kernel's pass timed 20 times a round (`reviews/array-design-ways/probes/width/WidthPair.java`). Two runs, each a pair in one JVM:
  - at a load of 9 (other runs), seven rounds (`WidthPair-1.txt`): the dot product 1.00 ms a pass in `double` and 1.02 ms in `float` (medians; ranges 0.94-1.17 and 0.96-1.41), the matrix product 0.55 and 0.44 ms (ranges 0.33-0.73 and 0.34-1.25);
  - at a load of 1.3, nine rounds (`WidthPair-2.txt`): the dot product 0.95 and 0.95 ms (ranges 0.81-0.99 and 0.94-0.97), the matrix product 0.56 and 0.59 ms (ranges 0.53-0.83 and 0.42-0.74).
  - The faster width changes between rounds and between runs, so neither run shows a difference beyond its noise. The `float` dot product's running sum ends at 231146.2 against 231145.27 in `double`, a relative difference of 4e-6.
- Memory: the parameter vector is 4,192 numbers, 33 KB as `double[]` and 17 KB as `float[]`.

**The specification.**

- `RR32` and `RR64` are "32 and 64-bit IEEE 754 floating-point numbers", and the draft's future work adds two functions on float types: `Double[\F\]`, "twice the size", and `Extended[\F\]`, "sufficiently larger than the floating-point type F to perform summations of reasonable size" (`Specification/appendices/future.tex:77-86`). That is mixed precision, in the draft's future work and never built.
- Type aliases, which would name the width once, are specified (`Specification/basic/types-vals-vars.tex:631-650`), with the note that they are not yet supported (`:18`), and unimplemented (row 18); the 2012 restart comments the section out (`Documentation/Specification/Prose/Language/types.tick:1008-1035`).

**The library's own practice.** `RR64` is the library's float: `Number.asFloat(self): RR64` (`Library/FortressLibrary.fsi:284`), and the one unboxed store the team wrote is for `RR64` (`NativeArray.fss:43-52`). The witness `typecase`s list `RR32` as a leaf and make its values with `narrow(0.0)` (`Library/FortressLibrary.fss:3150`).

**The peers.** PyTorch: "When PyTorch is initialized its default floating point dtype is torch.float32" (https://docs.pytorch.org/docs/2.12/generated/torch.set_default_dtype.html). The reference defaults to float64 and offers float32 (above).

**The commits.** David Chase, 2009-08-31: "RR32 is NOT a subtype of RR64" (`6896886fb`, cited in `reviews/decisions-review/judgement.md` § 1).

**The ways.**

1. **5a, `RR64`, as written.** The goldens and tolerances stand, and the store is `double[]`, the words of his decision of 2026-09-19.
2. **5b, `RR32` throughout.** New goldens from the reference with `dtype=fp32`, tolerances restated at `RR32`'s scale. Every `RR64` in the model's and the vocabulary's types becomes `RR32`. Each radix-point numeral meets `RR32` through the library's explicit `narrow`, since a lossy conversion stays explicit (answer 8, POSITIONS 2026-09-26), unless the numeral types gain a conversion into `RR32`. The store is a `float[]` beside or in place of `double[]`, by question 2's mechanism. It waits for rung V.
3. **5c, the model generic in its width.** The model's functions take the element type as a static parameter. A numeral inside generic code becomes a `T` only through `x.one` or the witness `typecase` (FACTS line 61), so every constant of the model becomes a call (my reading; not measured).
4. **5d, the width named once by a type alias,** `type R = RR64`. One line switches the width. It needs type aliases built (row 18).
5. **5e, mixed: `RR32` storage with `RR64` accumulation,** the draft's `Extended[\F\]`. The library's reductions accumulate in the element's own type (`SUM` over `AdditiveGroup[\T\]`, FACTS line 116); the mixed products would be declarations such as a `DOT` of two `RR32` vectors answering `RR64`.

**What each costs.** 5a costs nothing now. 5b costs new goldens, every type line of the model and vocabulary, a narrowing at each float numeral, rung V, and a second store; it halves memory and changes the speed by the measured pair. 5c and 5d trade notation for a switch: 5c in every constant, 5d in a feature not yet built. 5e is new library declarations and a second store.

## 7. Question 6: the bounds that give `Vector` and `Matrix` their arithmetic

**The question.** `Vector[\T extends Number, nat s0\]` and `Matrix[\T extends Number, nat s0, nat s1\]` add, subtract and multiply values of `T` in their bodies (`Library/FortressLibrary.fss:2324-2336`, `:2632-2691`), and `Number` declares no arithmetic, only `asFloat` and `=` (`Library/FortressLibrary.fsi:281-289`). Which bound on `T` gives those bodies their arithmetic?

**The mathematics.** `+` and `-` on vectors need an additive group of elements. Scaling, the elementwise product, the dot product and the matrix product need a ring. Division by a scalar needs a field. The norm needs a square root, which the library takes after `asFloat` (`FortressLibrary.fss:2416`). An integer vector is a module over the integers: it adds and has a dot product, and does not divide.

**What each path does today.**

- Walk runs every `Vector` and `Matrix` operation for all seven number types on the flat library, except `matrix(v)` for `NN32` and `NN64`, whose numeral `0` reaches `T` by conversion (FACTS § The library's arrays and algebra, line 127).
- The checker, the batch N gate: class V1, 36 errors (`compile-ladder/climb-batch-N/gate/distance-sites.tsv`, classified).
  - 15 refuse arithmetic at `(T, T)`: `+`, `-` and juxtaposition in the `Vector` and `Matrix` bodies (`FortressLibrary.fss:2328-2336`, `:2636-2691`), "not applicable to an argument of type (T, T)".
  - 21 refuse a type, "The static argument T does not satisfy the corresponding bound Number". 19 of them are in the storing objects `__DefaultVector` (`:2339`), `__DefaultMatrix` (`:2698`) and `TransposedMatrix` (`:2706`), which declare their own `T` with no bound and extend `Vector[\T,…\]` or `Matrix[\T,…\]`; 2 are at the factories `vector` (`:2387`) and `matrix` (`:2748`).
- The slip, 6b below, measured on a library copy through the distance stage (`captures/distance-NUMOBJ.table`): the total goes 625 → 606 against the unchanged copy. By site (`captures/sites-NUMOBJ-vs-L0.txt`): 19 of V1's 21 well-formedness errors go and nothing is new; the 15 arithmetic refusals stay, and two well-formedness errors stay at the factories `vector` (`FortressLibrary.fss:2387`) and `matrix` (`:2748`), by a cause not traced here. Under walk the team's seven array tests (`vectorOps`, `matrixOps`, `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary`, `FlatTowerRungF`, `TabulateRungA`, `sparseMatrix`; assertion tests, silent when every assertion holds) print the same against the copy as against an unchanged one (`captures/walk-NUMOBJ-*.txt`, `captures/walk-L0-*.txt`).
- 6c, measured with the ring bound on `Vector` and `Matrix` alone (`lib-variants.py RINGVM`: the two traits, their three storing objects, their factories and their products: 32 api lines and 29 component lines; the scalar-extension block keeps `Number`). Through the distance stage the total goes 625 → 597 (`captures/distance-RINGVM.table`). By site (`captures/sites-RINGVM-vs-L0.txt`): all 36 of V1 go, and 8 are new.
  - 4 are overloading errors: the api's scalar juxtapositions of `Vector` and `Matrix` (`FortressLibrary.fsi:1604`, `:1610`, `:1724`, `:1730`) against the library's juxtapositions with a `String`, `(Any, String)` and `(String, Any)` (`:2412`, `:2414`). With `T extends Number` the element type excluded `String`, because `Number` is closed; `MultiplicativeRing[\T\]` is open, so the checker no longer sees the pair as disjoint.
  - 1 is the norm's `asFloat` on a `T` (`FortressLibrary.fss:2416`), which `Number` declares and the ring does not.
  - 1 is a body at `:2332` whose type loses its size in a join (class V2), which V1's refusal there had hidden.
  - 2 are the two factory sites of 6b, now naming the ring bound.
  - Under walk the seven tests print the same against the copy (`captures/walk-RINGVM-*.txt`); `FlatTowerRungF`'s 72 assertions over seven number types hold.
  - With the ring bound also on the scalar-extension block (`lib-variants.py RING`), walk refuses the block's `MAX` beside `StandardTotalOrder`'s when `vectorOps` loads, "have parameters with generic type, at least one pair of parameters must have excluding types" (`captures/walk-RING-vectorOps.txt`): the same loss of `Number`'s exclusions, in walk's family check. That copy was not measured through the distance stage.
- 6c with the library's two-trait form, `T extends { Number, MultiplicativeRing[\T\] }` in the same places (`lib-variants.py RINGNUM`). Under walk the seven tests print the same against the copy (`captures/walk-RINGNUM-*.txt`). Through the distance stage the checker had not finished after PENDING-RINGNUM-MIN minutes, where the unchanged copy's whole run took 13 (`captures/distance-L0.table`): its main thread sat at full CPU in the Meet Rule check of the component's overloads, `OverloadingChecker.meetRule` calling `OverloadingOracle.lteq`, twelve nested exclusion tests (`TypeAnalyzer.pExc`) deep through the `comprises` check (`captures/distance-RINGNUM-stack.txt`). PENDING-RINGNUM-RESULT

**The specification.**

- "An array of two dimensions whose elements are a subtype of Number is a matrix"; the same for a vector (`Specification/basic/expressions/aggregate.tex:152-170`); "all elements of vectors and matrices must be numbers" (`Specification/preliminaries/overview.tex:917`); the coercion chapter's example `trait Vector[\T extends Number\]` (`Specification/basic/conversions-coercions.tex:230-236`).
- The specified algebra, monoids, groups, rings and fields, with operators as static parameters and `where` clauses (`Specification/advanced-lib/algebraic-constraints.tex:1321-1769`). The library that states it exists only commented out, under `Library/incomplete/` (`reviews/decisions-review/judgement.md` § 1, "The libraries").

**The library's own practice.**

- `Vector` and `Matrix` are additive groups of themselves and exclude the multiplicative ring, because their juxtaposition is the inner product (`FortressLibrary.fsi:1547-1549`, `:1665-1667`; rows 64, 109, 293).
- Since answer 7 the library's generic arithmetic is bounded by its algebra traits: `SUM` over `AdditiveGroup[\T\]`, `PROD` over `MultiplicativeRing[\T\]` (FACTS line 116).
- On the flat tower every number type carries both traits at its own type: `RR64` and `QQ` extend `AdditiveGroup` and `MultiplicativeRing` (`FortressLibrary.fsi:291-292`, `:387-388`); `Integral[\I\]` extends `MultiplicativeRing[\I\]` (`:436`), and each integer type extends `Integral` at itself (`:476`, `:513`, `:558`, `:608`; `NN32` at `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:82`). `MultiplicativeRing[\T\]` extends `AdditiveGroup[\T\]` (`FortressLibrary.fsi:272-273`).
- Astra's source review, taken by him on 2026-09-26: the bodies are "checked per operation's required capability, with no blanket ring bound that would exclude integer arrays" (POSITIONS line 102). On the flat tower no integer type is outside the ring (my reading of the declarations above).

**The peers.**

- Rust's `ndarray`: `LinalgScalar: 'static + Copy + Zero + One + Add + Sub + Mul + Div`, "Elements that support linear algebra operations" (https://docs.rs/ndarray/latest/ndarray/trait.LinalgScalar.html).
- Scala's Spire: "Ring[A] provides commutative +, zero, -, *, and one", with parallel additive and multiplicative hierarchies (https://spire-math.org/guide.html).
- Julia checks no bound statically and dispatches the arithmetic at run time (`explorations/performance-roadmap.md:20`).

**The ways.**

1. **6a, `T extends Number`, as landed.** Walk runs every element type; the checker keeps V1's 36 errors, since the bodies' arithmetic has no evidence.
2. **6b, the storing objects take the bound their traits already have.** `__DefaultVector`, `__DefaultMatrix` and `TransposedMatrix` declare `T extends Number`. A slip of the library, not a design choice. Measured above.
3. **6c, `T extends MultiplicativeRing[\T\]`**, the library's own algebra trait, on both traits, their objects, their factories and their products (32 api lines, 29 component lines). It admits every number type of the flat tower. Measured above. Written as the library writes a bound with two traits, `T extends { Number, MultiplicativeRing[\T\] }` (`MaxSumReductionPair`, `FortressLibrary.fss:3179`), it keeps `Number`'s exclusions beside the ring's arithmetic; measured above.
4. **6d, a bound per operation.** `AdditiveGroup[\T\]` on the traits, for `+` and `-`; the ring only where a product is taken. The products are methods of the traits today (`dot`, `scale`, `pmul`, `mul`, `rmul`, `lmul`); the top-level operators already forward to them (`FortressLibrary.fss:2393-2416`, `:2756-2790`). The products move out of the traits into those operators, or into a sub-trait for ring elements, or the methods take a bound of their own on the trait's `T`, which needs a `where` clause (not supported). It touches `Diag`'s override of `mul`, the shape he found for the diagonal (POSITIONS 2026-09-24; row 299). Not measured.
5. **6e, the specification's algebra**, `Ring` and `Field` with operator parameters and `where` clauses. It needs `where` clauses and operator parameters in the checker first.
6. **6f, arithmetic declared on `Number`.** `opr +(self, other: Number): Number` loses `T`, and route A removed `Number`'s arithmetic by design (FACTS line 116); refused by the flat tower (my reading).

**What each costs.** 6a costs nothing and keeps 36 errors. 6b is three library lines. 6c is 61 library lines; measured, it trades V1's 36 errors for 8 new ones with `MultiplicativeRing[\T\]` alone, and for PENDING-RINGNUM-COST with the two-trait bound. 6d restructures the traits and their products and touches row 299's override. 6e waits for `where` clauses. 6f undoes route A.

## 8. The forks for Pavol, in the order they need deciding

The order follows what each answer unblocks (my reading of `coordinator/PLAN.md`): the first three sit on phase 3's road to the checker's true zero, which batch 8 drives class by class after batch 7b; the width fixes the types the model's diff writes; the model's diff opens with the run-time sizes it needs; the mechanism comes with the speed of phase 6. Each is one question with its ways; none is recommended here.

1. **Arithmetic in a size (item 15).** How does the library keep its rank-2 and rank-3 storage, whose field is sized by a product? Ways: 15a the checker compares size expressions by structure and folds numerals (the default on record, batch 8 or later); 15b the library makes the field at run time with its own `primitiveArray` (three lines; measured: the 8 storage errors go, none is new, walk and C4's check unchanged); 15c full static arithmetic; 15d a native store per rank. It holds 11 of the distance stage's errors and `reflect`'s own body.
2. **The bound of `Vector` and `Matrix` (question 6).** What gives their bodies arithmetic? Ways: 6a `Number` as landed; 6c the library's `MultiplicativeRing[\T\]` (measured); 6d a bound per operation, moving the products out of the traits; 6e the specification's algebra, after `where` clauses; 6f arithmetic on `Number`, against route A. 6b, the storing objects taking their traits' bound, is a slip under every way. It holds 36 of the distance stage's errors.
3. **A size known only at run time (question 4).** How does a number become a size the checker accepts and the compiled path runs? Ways: 4a the library's `reflect` with the checker taught the team's commented rule; 4b `reflect` built in over design B's factory, with 4a's rule; 4c run-time sizes stay unsized; 4d no run-time sizes in the step; 4e a `typecase` that binds a size, after `where` clauses. It holds the library's own `array[\E\](x)` (six of V2's errors) and decision D's two bridges.
4. **The element width (question 5).** `RR64` or `RR32`? Ways: 5a `RR64` as written; 5b `RR32` throughout, with new float32 goldens from the reference and rung V first; 5c the model generic in its width; 5d the width named once by a type alias, after aliases are built; 5e `RR32` storage with `RR64` sums, the draft's `Extended`. Every type line of decision D's diff and every store of decision A follows from it.
5. **The model's sized types (decision D).** How do sizes enter the model's text? Ways: D1 the re-based diff, 21 model lines out and 29 in; D2 the vocabulary over the unsized `Array`, the model unchanged and its shapes unchecked; D3 D1 in the specification's `T^n` notation; D4 sizes static from the top, the batch size fixed at compile time. D1's 10 bridge lines are question 4's answer, and its 7 `rows(rmsn[\E\], …)` lines are the inference of a generic function passed as an argument, which the specification promises and its inference chapter does not yet describe.
6. **What puts `double[]` under the generic traits (decision A).** Ways: A1 the library's witness `typecase` with its `cast` (measured on both paths); A2 a plain factory beside the generic one (compiled yes, walk refuses the pair today); A3 a factory name per element type; A4 the loader stamps an `RR64` class, the team's `Unbox` direction; A5 a special type, as `ZZ32Vector`. None is faster alone; decision B (phase 6) unboxes the traffic.

## 9. Found on the way

- **The model's numeral powers are refused by the compiled checker since climb batch N's rung I.** `10.0^(-5)`, `10.0^(-8)`, `-(10.0^10)` and the check program's three tolerances meet `RR64`'s `^` on an `RR64` and `MultiplicativeRing[\RR64\]`'s `^` on a `ZZ64`, both only by converting the integer; the tie is refused, and the refusal ends the check of its block (`rebase-2026-09-29/measure/base.own.txt`, `d.own.txt`, `d-split-e3.own.txt`). Walk takes them. No ledger row names it; the declarations are `Library/FortressLibrary.fsi:278` and `:358`.
- **The comment that decision D's note of 2026-09-27 called the library's own is the revival's.** "sized arrays under a compiler need per-shape declarations beside these" was written by the revival on 2026-09-23 (`c2b4e2c95`) and reworded on 2026-09-28 (`581356f32`); today it reads "a static checker sees only Array[\T,I\], so the rank and size of a sized argument are lost to it in the result" (`Library/FortressLibrary.fsi:2595-2600`). The team's own statement on per-type storage is Maessen's commit message of 2008 (section 3).
- **Decision E's patch applies again.** `rebase-2026-09-29/library-e3.patch` is the 17 dead sizes regenerated on today's library; `git apply --check` passes.

## 10. What is measured, what is read, what was not run

- **Measured here:** the re-based diff on seven checker copies and under walk (section 2); the four decision A probes on both paths (section 3); four library copies and an unchanged one through the distance stage, the team's array tests under walk against five copies, and C4's check program against one (sections 4 and 7); the width pair (section 6).
- **Cited from the record, not re-run:** the batch N gate's distance table and sites, today's tree (V1, V2, Z1); the boxing costs of `perf-probes/kernels/` and `reviews/array-design-review.md`; the design B size machinery (FACTS lines 42, 43, 114); the peers' survey of `reviews/size-runtime-design-brief.md` § 6 and `reviews/nat-checking-plan.md` § g.
- **Read, not measured:** the checker rules of 15a and 4a and what they would clear; 4b, A4 and A5, which need `.java` work; D4; 5c, 5d, 5e; 6d; the costs marked "my reading".
- **Not run:** the gate (nothing tracked outside this note's directories changed); the four-thread check; the compiled path for C4 beyond the checker; the APL program's twin of the diff (`apl/mg/FlatArrays2`).
