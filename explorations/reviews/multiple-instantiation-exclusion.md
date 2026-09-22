# Multiple instantiation exclusion: the ground for the decision

Gathered 2026-09-22 for Pavol's decision after rung P of climb batch 3 stopped: does the compiled path keep the designers' rule that no type may extend two instantiations of one generic? Nothing here decides. Sources are the rung's stop report and judge's ruling on `origin/wip/rung-exclusion-relax` (`explorations/compile-ladder/rung-exclusion-relax/REPORT.md`, `JUDGE.md`), the papers, the checker, the interpreter, the specification, and seven interpreter probes in `mie-probes/` (each `X.fss` with its capture `X.walk.txt`).

Terms. **Multiple instantiation inheritance**: a type extends two instantiations of one generic, for example `object Both extends { Tag[\String\], Tag[\ZZ32\] }`. **Multiple instantiation exclusion**: the rule that forbids this. **A specialised generic overload**: a generic declaration with a non-generic one beside it for one instantiation, `pick[\X\](t: Tag[\X\])` beside `pick(t: Tag[\ZZ32\])`. **Return type rule**: when a more specific overload can be chosen at run time, its return type must fit the less specific one's.

## 1. The rule in the designers' words

- The OOPSLA 2011 paper, `Papers/Types/exclusion.tick:141-152`: "Fortress imposes a rule that forbids *multiple instantiation inheritance*, in which a type (other than Bottom) is a subtype of distinct applications of a type constructor. ... We call this rule *multiple instantiation exclusion* and adopt it here." A footnote limits it to invariant parameters (`:145-150`). The stated cost is `:154-156`: "easy to enforce statically, and experience suggests that it is not onerous in practice: it is already required in Java".
- The problem it solves, from Karl Naden's writeup of 2012-08-31 (`Papers/Types/journal/justificationOfRTR.tex`). The overloads `tail[\X\](x: List[\X\]): List[\X\]` and `tail(x: List[\ZZ\]): List[\ZZ\]` (`:76-81`) are unsound if some `BadList` extends both `List[\String\]` and `List[\ZZ\]`: "at runtime the more specific function for List[ZZ] would be chosen and return a List[ZZ] which is not a subtype of List[String] thus breaking type safety" (`:94-98`). Under the rule such a type "is equivalent to Bottom" (`:344-347`). With the rule in place, the return type rule may trust one instantiation: the rule "rules out any instantiation other than the one known at compile time ... We can therefore trust the instantiation known at compile time" (`:457-460`).
- What it costs: "we cannot define hasStringAndInt <: { Has[String], Has[ZZ] }" (`:470-472`). The trade-off is "specialization of generic functions or multiple instantiation inheritance, but not both" (`:477-478`). The outcome: "Ultimately, Fortress implements blanket multiple instantiation exclusion for the semantic benefits and the simplicity of the restriction" (`:496-497`).
- The alternatives Naden discusses:
  - Filtering at run time by the expected return type, or splitting overload sets per call site (`:241-281`). He rejects both because "programmers can no longer understand the execution of a program without static type information" (`:288-290`).
  - Per-trait syntax: "allow some generic traits to be multiple instantiation excluded and others not" (`:475-477`).
  - A covariant relaxation that needs a minimal instantiation (`:536-537`).
  - The numeric tower, `:568-632`: "This restriction is problematic for expressing certain types of relationships such as the numeric hierarchy" (`:570-571`). He suggests the self type as a bound, `add[\X <: Ring[X]\](X,X): X` (`:618-624`), and ends: "more work needs to be done in order to understand how to best support the numerical hierarchy in the Fortress type system" (`:631-632`). The designers left the conflict with the tower open.

## 2. The compiled checker enforces the rule and relies on it

- `checkP` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:443-456`): two trait types exclude when any pair of their ancestors has the same constructor with type arguments that are not equivalent (`pEqv`, `:450`). It is one of four clauses joined at `:457`. It cannot simply be deleted: with `negate` set, the same clause gives the equality constraints that static-argument inference uses (`explorations/perf-probes/prelude/exclusion-trace.md:214-217`).
- Two hierarchy checks enforce it: `scala_src/typechecker/TypeHierarchyChecker.scala:178` ("Types … exclude each other. … must not extend them") and `:187` ("Type … excludes … but it extends …"). `ProbeMIEPick` gets four such errors (the rung's `probes/probe-matrix.txt:22-31`).
- The return type rule relies on it. `scala_src/overloading/OverloadingOracle.scala:81-105` (under `overloading/`, not `typechecker/`) solves for one instantiation of the less specific declaration (`subEDsolution`, `:88`), substitutes it into that declaration's return type (`:93-95`), and checks only that one arrow (`:97`). Relaxing `checkP` alone lets `ProbeMIEPick` link, and it then dies with `IncompatibleClassChangeError: Class ProbeMIEPick$IntTag does not implement the requested interface` (`probe-matrix.txt:64-67`, and the same under every placement).

## 3. The interpreter: accepts the type, picks one instantiation, refuses the specialised overload (measured)

- Its exclusion (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:197-297`) has no instantiation clause. The last test compares the leaves of `comprises` clauses (`:281-297`).
- Its overload check marks a generic parameter pair that neither subtype relation orders (`interpreter/evaluator/values/OverloadedFunction.java:451-455`). It refuses that pair unless some parameter pair excludes (`:495-500`, "non-ground types need exclusion"), with the message "with generic type, at least one pair of parameters must have excluding types" (`:527`).
- Probes. All ran under `bin/fortress walk` on `main` `cfdc67f73`, JDK 25, `FORTRESS_THREADS=1`, with a fresh `FORTRESS_CACHES` that the first run filled:
  - `MieDecl`: the declaration is accepted. `Both` binds to a `Tag[\String\]` variable and to a `Tag[\ZZ32\]` variable, and `typecase` says it is each (`MieDecl.walk.txt:2-4`).
  - `MieInfer` has one generic function and no overloading. The interpreter infers `X` from the run-time value and takes the instantiation `Both` lists first, whatever the variable's type: `which(z)` with `z: Tag[\ZZ32\]` gives `Marker[\String\]` (`MieInfer.walk.txt:5`). Written explicitly, `which[\ZZ32\](Both)` gives `Marker[\ZZ32\]` (`:7`). `MieInferSwap` reverses the extends order, and the answer flips to `ZZ32` (`MieInferSwap.walk.txt:2-3`). The mechanism is `FType.java:568-574`, "We want to unify with the most specific subtype possible": the first supertype that unifies wins.
  - `MieInferRet` has no overloading either. `rz: Tag[\ZZ32\] = mk(z)` dies at run time: "RHS expression type Mk[\String\] is not assignable to LHS type Tag[\ZZ32\]" (`MieInferRet.walk.txt:3-4`).
  - `MieHeadOrId` is Naden's `headOrID` shape (`justificationOfRTR.tex:483-494`): a catch-all `headOrId(x: Any)` beside `headOrId[\X\](x: Tag[\X\]): Tag[\X\]`. The overload check accepts it, and it dies the same way (`MieHeadOrId.walk.txt:4-5`).
  - `ProbeMIEPick`, the rung's program copied unchanged, is refused at load with the `:527` message (`ProbeMIEPick.walk.txt:2-6`). It never reaches dispatch.
  - `MieTower` runs on the library's own tower. A `ZZ32` value gives `ZZ32` for `Integral`, `StandardTotalOrder` and `Equality`, and a `ZZ64` value gives `ZZ64` (`MieTower.walk.txt:2-3`). The value's own level wins.
- Answer: the interpreter accepts the declaration and picks one instantiation, the first listed. A wrong pick shows up only as a type error at the next typed binding. The interpreter refuses the specialised overload.

## 4. The specification

- Exclusion is the smallest relation: "the relations are the smallest ones that satisfy all the properties given in those sections (and this one)" (`Specification/basic/types-vals-vars.tex:187-189`). None of the listed properties makes two instantiations exclude (`:163-164`, `:212-216`, `:222-224`). So the type is allowed.
- "Trait declarations are allowed to extend other instantiations of themselves" (`Specification/basic/trait-parameters.tex:339-340`). Its example is covariant (`:349-351`), which Naden's refinement also allows. The invariant cases are `:365-367`, "trait C is a subtrait of *every* instantiation of parametric trait D. Thus, trait C has all of the methods of every instantiation of D", and `:383-397`, `object Empty extends List[\T\] where {T extends Object}`. `Empty` is `BadList` written on purpose (JUDGE.md §1).
- Overloads share their static parameters: "it is an error for their static parameters to differ (up to α-equivalence), or for one declaration to have static parameters and another to not have them. Hence, static parameters do not enter into the determination of which declarations are applicable" (`Specification/basic/overloading.tex:100-107`). Static arguments are fixed at the call site: "It must be possible to infer which method is referred to at the call site" (`trait-parameters.tex:374`).
- In one sentence: the specification allows the type and forbids the specialised overload, which is the other side of Naden's trade-off, and it instantiates at the call site. On the type it agrees with the interpreter. On overloads it is stricter than both paths: the interpreter accepts `MieHeadOrId`'s pair. On inference it differs from the interpreter, which instantiates from the run-time value (`MieInferRet`).

## 5. Where the rule bites the library

- `checkP` causes 61 errors at 23 declarations on 26 lines (`exclusion-trace.md:24-28`, `:208`; `exclusion-trace/sites.tsv`, counted by declaration):
  - numeric tower, 13: `QQ`, `AnyIntegral`, `Integral`, `ZZ`, `ZZ64`, `ZZ32`, `NN64` (`Library/FortressLibrary.fsi:373-536`) and `Int`, `Long`, `NN32`, `UnsignedLong`, `IntLiteral`, `BigNum` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:76-145`);
  - comparisons, 4: `TotalComparison` and its three objects (`.fsi:121-153`);
  - `Maybe`, 4: `AnyMaybe`, `Maybe`, `Just`, `Nothing` (`.fsi:816-862`);
  - reductions, 2: `SumReduction`, `ProdReduction` (`.fsi:1815-1830`).
  Ten of the 23 are objects that only inherit the conflict. The generics named in the errors, several per error: `Equality` 48, `StandardPartialOrder` 38, `StandardMin`/`StandardMax`/`StandardMinMax` 26 each, `StandardTotalOrder` 20, `Integral` 17, `DistributesOver` 13 (`sites.tsv`, last column).
- Why: the algebra traits take their own subject type as the parameter (`trait Equality[\T extends Equality[\T\]\]`, `.fsi:73`), and `Number` itself carries four of them at `Number` (`.fsi:276-278`). Each nested level therefore adds an instantiation. `ZZ32` has `Equality` at `Number`, `QQ`, `ZZ`, `ZZ64` and `ZZ32` (`.fsi:277`, `:373`, `:536`, `:498`, `:464`).
- The comment "Hack to permit any Number to work non-parametrically" (`.fsi:1814`, `Library/FortressLibrary.fss:3023`) sits on `SumReduction`. `SumReduction` is a `CommutativeMonoidReduction[\Number\]` whose `join(a: Number, b: Number): Number = a+b` (`.fss:3033`) works only because `Number` carries the algebra at `Number`. It also lists `DistributesOver` at two instantiations in the api and four in the component (`.fss:3026-3029`, where `MaxReduction[\Number\]` appears twice). `DistributesOver[\E\]` has no methods; it is "marking for distributivity" (`.fsi:1768`). So the library uses multiple instantiation deliberately in two ways: the tower's self-typed traits, and marker facts.
- The compiler prelude kept inside the rule with a flat tower. `trait Number excludes { String }` carries no algebra (`CompilerBuiltin.fss:505`). `ZZ32 extends { Number, Equality[\ZZ32\], StandardTotalOrder[\ZZ32\] } excludes { ZZ64, RR32, RR64 }` (`:658`). Widening goes through `coerce` (`:574-575`, 15 `coerce` lines in the file). The interpreter's `extends` clauses on the comparison traits are commented out (`:1483`, `:1521`).

## 6. The peers (from general knowledge, not checked in this session)

- **Java** forbids a class from being a subtype of two parameterizations of one generic interface (JLS §8.1.5), because of erasure. `Integer` and `Long` are flat siblings under `Number`, each `Comparable` to itself only. This is the compiler prelude's tower.
- **Scala** forbids it ("illegal inheritance; … inherits different type instances of trait"). Its numbers are flat with implicit widening, and `Ordering[T]`/`Numeric[T]` are type-class values outside the type, so no numeric type extends one twice.
- **Kotlin** forbids it ("inconsistent values" for a supertype's type parameter). Its numbers are flat, each `Comparable<Self>`, and widening is explicit (`toLong()`).
- **Swift** allows one conformance per protocol. Protocols carry `Self` and associated types, not type arguments, so two instantiations cannot even be written. `Int32` and `Int64` are separate structs under `BinaryInteger`, which is the self type used as a bound (Naden `:618-624`).
- **Rust** allows `impl From<u8> for u64` beside `impl From<u16> for u64`. Coherence allows at most one impl per trait and argument list, and the impl is chosen at compile time, so nothing picks an instantiation at run time. Its numbers are flat, with explicit `From`/`as`.
- **Haskell** allows one instance per type for a one-parameter class, and many for multi-parameter classes (an extension). Instances are resolved statically. Its numbers are flat instances of `Num`, with explicit `fromIntegral`.
- **C#** (not asked for; its generics are reified like Fortress's) allows `IEquatable<A>` and `IEquatable<B>` on one class. Overloads are resolved statically, and generic math uses `INumber<TSelf> where TSelf : INumber<TSelf>` on a flat tower with implicit widening.
- What this means for the tower: no peer combines nested numeric subtyping with self-typed traits; every one has a flat tower plus conversions. The peers that allow multiple instantiation choose the instantiation statically, which is the specification's call-site model. Naden's hole appears only with dispatch at run time over reified generics, which is Fortress's combination.

## 7. History

- The brief's command, `git log -S'checkP' -- …/TypeAnalyzer.scala`, returns only the import root `5a68404fd` (2012-07-19). The older history is on the second parent of the merge `575fe64` (`268718eea`), where most 2011-2012 commits are parentless snapshots.
- On that lineage, exclusion of two instances of one invariant constructor (the pair itself only, "If a trait A[T] does not have variance annotations then A[B] excludes A[C] unless B=C") entered on 2010-05-28 (`5a6b7913b`, jrhil47). It was extended to all ancestors as `checkP` on 2010-07-26 (`e828b44b1`, jrhil47, "Made exclusion and subtyping work together as described in the paper").
- The paper's text followed on 2011-08-12 (`30c4abb9d`) and Naden's writeup on 2012-08-31 (`8015b17f4`).
- The library's nested tower is older and was written under the interpreter, which never had the rule:
  - `value object ZZ32 extends { StandardTotalOrder[\ZZ32\], ZZ64 }` on 2008-05-06 (`cfe16b43b`, jmaessen);
  - `Integral[\I\]` became parametric on 2008-07-02 (`82c85b03a`);
  - `trait ZZ32 extends { ZZ64, Integral[\ZZ32\] }` on 2008-07-15 (`fca589bbb`);
  - `library-scalar-extension-review.md:281-287` has the rest.
- The compiler prelude was flat from its start: Guy Steele commented out the comparison `extends` when adding them on 2011-07-15 (`b3c2e1342`), and `ZZ32`/`ZZ64` were siblings under `Number` by 2011-07-22 (`da5291587`).

## 8. The routes (none chosen)

- **A. Keep the rule on the compiled path; the library's tower changes.**
  - Checker: no change. `ProbeMIEPick` stays refused, and specialised overloads such as `ProbeMIEPickCtl` keep compiling and running (`probe-matrix.txt:18-21`).
  - Library: about 13 declarations are rewritten, in `.fsi` and `.fss`: `Number`, `QQ`, `Integral`, `ZZ`, `ZZ64`, `ZZ32`, `NN64`, `NN32`, `TotalComparison`, `AnyMaybe`, `Maybe` and the two reductions. The 10 inheriting objects follow. The tower takes the compiler prelude's shape (§5): siblings that exclude each other, the algebra on the leaves only, widening by `coerce`.
  - Costs: the interpreter has no coercion (`explorations/coordinator/FACTS.md:50`), so the one library needs coercion added to the interpreter, or explicit widening wherever the library and its tests rely on `ZZ32 <: ZZ64 <: ZZ <: QQ <: RR64` (unmeasured). "Any Number non-parametrically" goes, or `Number` keeps the algebra and the leaves lose theirs. The `DistributesOver` facts need another encoding (2 declarations).
  - Forecloses: the specification's `C extends D[\T\]` and `Empty` (§4), and the library route "one library, the interpreter's" (`explorations/coordinator/POSITIONS.md:45`). The judge struck this route for those reasons (JUDGE.md §3 item 1).
- **B. Drop the rule, and adopt the specification's model.**
  - Checker, part 1: relax `checkP` for the positive question, keeping it for inference. The rung's switch is 22 changed lines (`probes/measurement-switch.patch`). It must apply in every analyzer, because only the broad placement reaches `typecase` reachability and `normConjunct` (REPORT.md, "What the placement question looks like"). The library count falls from 93 to 33 (`probes/checker-count-off.txt`, `-broad.txt`).
  - Checker, part 2: close the return type rule's reliance on one instantiation. Either (a) enforce `overloading.tex:100-105` in the overloading checker, which refuses `Compiled12.invariantInference.fss:52-61`, `Compiled6.ak.fss:14-15`, `Library/Generator2.fss:52-57` and four interpreter tests, none of which has the hole (JUDGE.md §3 item 2). Or (b) one edit in `OverloadingOracle.satisfiesReturnTypeRule`: refuse a non-generic specialisation beside a generic whose return type depends on its parameter. (b) is sound only if the code generator instantiates dispatched generic overloads from the call site, which is unmeasured (JUDGE.md §6).
  - Consequence: `f(t: Tag[\ZZ32\])` beside `f(t: Tag[\String\])` becomes an error on the compiled path, as it already is under `walk` (`probes/probe-overload.txt:12-19`, `:36-39`).
  - What the probe then does: `ProbeMIEPick` is refused at compile time under (a) or (b) and becomes a gated compile-error test. The interpreter refuses the same program at load (`ProbeMIEPick.walk.txt`). No dispatch on `Both` ever runs on either path. The only choice left is inference. The interpreter picks the first-listed instantiation and can fail at run time (`MieInferRet`). The compiled checker takes `X` from the static type, `ZZ32` for `z: Tag[\ZZ32\]`, if the code generator passes the checker's static arguments (unmeasured).
  - On the tower this does not matter: the value's own level comes first (`MieTower`), and in the self-type idiom "the type Ring[X] is identified as X" (Naden `:582`, and `:612-615`).
  - Forecloses: `tail`-style specialisation, and the prelude's flat tower as a requirement.
- **C. Choose per trait (Naden `:475-478`).** Exempt the self-typed algebra traits, those whose parameter is bounded by the trait itself as in `.fsi:73`, from `checkP`, and refuse specialised overloads on those traits only.
  - Costs: a few lines in `checkP`, plus an overload-check rule of unmeasured size. `SumReduction`/`ProdReduction` stay in conflict unless markers are also exempt (13 of the 61 errors).
  - Keeps `tail`-style specialisation for `List`-like generics and the library's tower. Still refuses the specification's `Empty`.
  - Naden's note on self types warns that special treatment is "not sufficient" when the more specific definition is hidden behind an api (`:609-616`, `:630-631`).

## 9. Not found or not measured

- The commit that first wrote the compiler prelude's flattened `ZZ32`/`ZZ64`: the snapshots before `da5291587` were not walked.
- Whether the code generator dispatches a generic overload at the call site's instantiation or at the run-time value's. This fact decides B(b) and the compiled answer to `MieInferRet`.
- How many library bodies and tests rely on the nested subtyping (route A's real size), and route C's overload-check size.
- No compiled runs were made here (the brief says no `ant`). The compiled captures cited are the rung's.
