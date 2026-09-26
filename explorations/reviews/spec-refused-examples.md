<!-- Review written 2026-09-26 by a delegated worker session, for Pavol: which of the specification's own examples the kept multiple instantiation exclusion rule (route A) refuses, and what each should become. Built fresh from Specification/, the two libraries, Papers/ and the git history; the revival's planning notes on this question (CLIMB-BATCH-4.md, notes mentioning S2) were not read. Revised the same day with the alternatives' runs (round 2 by the coordinator on the tree carrying climb batch 4, round 3 by this session). Probes and captures under explorations/reviews/spec-refused-examples/. -->

# The specification's examples that route A refuses, and what each should become

## The question, and the words used

- **Route A** is Pavol's decision of 2026-09-24 (`coordinator/POSITIONS.md:92`): the compiled type
  checker keeps the designers' rule, the library's numeric tower is flattened, the interpreter
  learns coercion, and the specification is revised to match.
- **The rule**, which the team calls *multiple instantiation exclusion*: a type may not be a
  subtype of two different instantiations of one generic. A *generic* is a trait with static
  parameters, such as `List[\T\]`; an *instantiation* is the generic with the parameters filled
  in, such as `List[\ZZ32\]` or `List[\String\]`. So nothing may be both a `List[\ZZ32\]` and a
  `List[\String\]` (`Papers/Types/exclusion.tick:141-152`).
- A **where-clause variable** is a type name that a `where` clause introduces which is not one of
  the declaration's own static parameters (`Specification/basic/trait-parameters.tex:309-316`).
  Written in an `extends` clause, as in `object Empty extends List[\T\] where {T extends Object}`,
  it means "for every `T`": `Empty` is a `List[\T\]` for every `T` at once, infinitely many
  instantiations. That is exactly what the rule forbids.
- **Covariance**: a generic is covariant in a parameter when `C[\Dog\]` is a subtype of
  `C[\Animal\]` whenever `Dog` is a subtype of `Animal`. *Contravariance* is the reverse. A
  parameter that is neither is *invariant*.
- The **bottom type** is the type below every type, with no values (the specification's
  `BottomType`).
- A **coercion** is a conversion that a trait declares from another type (`coerce(x: T) = ...`)
  and that the language applies without being asked.
- **walk** is the interpreter (`fortress x.fss`); the **compiled path** is `fortress compile` then
  `fortress run`; only the compiled path runs the type checker (`FACTS.md` § Execution model).

How claims are marked below: **[measured]** means run in this review (probe and capture named);
**[measured earlier]** means measured by an earlier record, cited; **[read]** means read from the
source at the cited line or commit; **[inferred]** means my reasoning, not checked.

## What was found

Twenty-four probes, all run one at a time under walk and through compile and run, in a private
cache outside the repository (`spec-refused-examples/run.sh`, JDK 25). They ran in three rounds:
- **Round 1, 14 probes.** Run by this review on `main` at `4d5c4c492`, with the
  `ProjectFortress/build` of 2026-09-24 03:02. These are the examples as written, plus the shapes
  that reach the rule. None of them compiled, so the runner's run step was never exercised.
- **Round 2, the 8 alternatives.** The permission system refused them to this review; the
  coordinator ran them on the tree carrying climb batch 4:
  - rung C, coercion in the interpreter (`b628871a2`,
    `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java`);
  - rung N, `nat` checking in the compiled checker;
  - rung K, the `ZZ32` shift pair.

  The coordinator also mended the runner's run step, which now goes through `MainWrapper` with
  the private cache on the class path, since `bin/fortress run` does not read a private cache.
  The 14 round-1 captures came out byte-identical (`git diff 609053b6f 7723ab5ce` touches none
  of them), so batch 4 changed nothing measured there.
- **Round 3, two probes** that explain two of round 2's results. Run by this review on `main`
  at `e4a8234f8`, with the build of 2026-09-26 06:08, which carries rung C.

Where the rounds changed a claim of the first version of this note, the text says **confirmed**
or **overturned**.

The examples the rule refuses, grouped by where they sit:

1. **The language chapter's three where-clause examples**, `Specification/basic/trait-parameters.tex`:
   - **E1, the covariance example**, `:339-353`: `trait C[\S\] extends C[\T\] where {S extends T, T extends Object}`.
     `C[\Dog\]` would be a `C[\T\]` for every supertype `T` of `Dog`. **[read]**
   - **E2, "a subtrait of every instantiation"**, `:355-376`: `trait C extends D[\T\] where {T extends Object}`. **[read]**
   - **E3, the `Empty` list**, `:382-399`: `object Empty extends List[\T\] where {T extends Object}`. **[read]**
2. **E4, the specification's `Nothing`**, `Specification/basic-lib/convenience.tex:37-53`:
   `object Nothing extends Maybe[\T\] excludes Just[\T\] where {T extends Object}`, and its bare uses
   `= Nothing` in `basic/exceptions.tex:110-129` and `basic-lib/exception.tex:22-23`. **[read]**
   Found on the way: the declaration is also ill-formed by the specification's own grammar, which
   gives an object no `excludes` clause (`basic/objects.tex:84-86`, `appendices/grammars/concrete-syntax.tex:242-244`);
   both paths stop at a syntax error there **[measured, `SpecNothing`]**.
3. **The library chapters' type declarations**, which the rule refuses through a type reaching one
   generic at two levels:
   - **E5, the nested numeric tower.** `trait ZZ extends { QQ, ZZ_star, IntegerLike[\ZZ\], CommutativeRing[\ZZ,+,-,juxtaposition\], ... }`
     (`basic-lib/basic-integers.tex:86-97`, rendered at `:194`) and `trait QQ extends { RR, QQ_star, Field[\QQ,QQ_NE,+,-,DOT,/\], ... }`
     (`basic-lib/numbers.tex:107-113`, rendered at `:176`), with the prose lists "it is a subtype
     of" (`basic-integers.tex:28-60`, `numbers.tex:36-60`). `ZZ` reaches the algebra at `ZZ` and,
     through `QQ`, at `QQ`. This is the tower route A flattens. **[read; the shape measured, `NestedTower`]**
   - **E6, `RationalQuantity`'s conditional self-extension**, `advanced-lib/numbers-advanced.tex:71-260`:
     `trait RationalQuantity[\U, bool ninf, ...\] extends { RationalQuantity[\U, ninf', ...\] where { bool ninf', ..., ninf -> ninf', ... }, ... }`,
     the covariance idiom of E1 over boolean parameters, used to make `QQ_GT` a subtype of `QQ_GE`
     and `QQ`. **[read]**
   - **E7, the root `Object`'s algebra**, `basic-lib/objects.tex:134-140` (and `Tuple`, `:149-156`):
     `trait Object extends { Any, EquivalenceRelation[\Object,===\], IdentityOperator[\Object\] }`,
     while the algebra chapter makes every algebraic type an `EquivalenceRelation[\T,=\]`
     (`advanced-lib/algebraic-constraints.tex:666-667`, reached from `CommutativeRing` through
     `CommutativeMonoid`, `:1378-1380`, `:1580-1584`). So `ZZ`, which extends `Object` implicitly
     (`basic/traits.tex:181-183`), is an `EquivalenceRelation[\Object,===\]` and an
     `EquivalenceRelation[\ZZ,=\]`. **[read; inferred that the checker refuses it, from the same
     shape measured in `NestedTower` and from `checkP`, `TypeAnalyzer.scala:443-455`]**
   - Not refused, but needing a sentence: one generic instantiated several times that differ only
     in an **operator** argument (`Boolean` extends eight `BooleanAlgebra[\Boolean,...\]`,
     `basic-lib/booleans.tex:18-36`; `ZZ` six `CommutativeRing`s; a ring is a `Monoid` at `+` and
     at `TIMES`). The checker's rule compares only type arguments ("Todo: Handle int, nat, bool
     args", `TypeAnalyzer.scala:448-452`) **[read]**, and the compiled path refuses these shapes for
     an unrelated reason: it does not substitute an operator argument into an inherited abstract
     operator method, even for **one** instantiation (`The inherited abstract method ODOT ... has no
     concrete implementation`) **[measured, `OprSingle`, `OprInstancesOplus`]**; walk runs them.
     Whether the rule counts operator arguments is a definition the revision has to state.
4. **The internal appendix** (`appendices/internal-document.tex`, which the default build prints:
   it is left out only when `\release` is defined, `fortress/fortress.tex:24-33`,
   `appendices/appendices.tex:24-27`):
   - **E8, "Disjunctive Constraints"**, `:305-362`: `object Parent extends {Plussable[\Right\], Plussable[\Wrong\]}`,
     offered as a program a checker should accept. The rule refuses it **[measured, `DoubleInstance`]**.
   - **E9, "Weirdness with Multiple Inheritance and Polymorphism"**, `:363-417`: `object badChild extends { Parent[\ZZ32\], Parent[\String\] }`,
     offered as the problem. It is the case for the rule, and consistent with route A. **[read]**
   - **E10, "Conditional Subtyping"**, `:483-512`: the internal copy of E6. **[read]**
   - And a remark in the future-work appendix, `appendices/future.tex:127-146`, where Maessen
     notes that "stuff like `Empty`" spoils binding a type variable in a `typecase`: the team's own
     early sight of the rule's reason. **[read]**

Found by scanning every `extends` clause and every `where` clause in `Specification/`, the rendered
and the commented Fortress text alike, and the specification's runnable examples in
`SpecData/examples/` (none of those is refused).

## First step: every way the language and the library offer

Three ideas are behind the refused examples. For each, every way found in the specification, the
two libraries, the papers and the history, the library's own way first.

### Idea 1: one value, or one trait, that belongs to every instantiation (E2, E3, E4, E8)

1. **A parametric object, one per instantiation, with a factory function**: the library's way.
   `value object Nothing[\T\] extends Maybe[\T\]` (`Library/FortressLibrary.fsi:864`, written 42
   times as `Nothing[\T\]` in `FortressLibrary.fss`), `object Empty[\T\] extends CovariantCollection[\T\]`
   (`Library/CovariantCollection.fss:96`), `emptyList[\E\](): List[\E\]` (`Library/List.fsi:121`),
   `object NoReductionPair[\R\]` (`FortressLibrary.fsi:1748`). Every use names the type argument,
   directly or through the factory. **[read]**
   - **Runs on both paths [measured, `AltEmptyParam`].** Walk and the compiled run each print
     `1` and `0`.
   - **Confirmed:** without the argument written it fails on both paths, as the record said
     [measured, `AltEmptyParamBare`]. Walk gives `InterpreterBug: Couldn't figure out
     SEmpty[\T extends Any\](uninstantiated) <: SList[\ZZ32\]`; compile gives `T is not in the
     kind env`, reported at the object's declaration.
2. **A non-parametric marker object plus a coercion in the generic trait**: Steele's shape of 2011
   for the compiler world. `object Nothing end` with `coerce(_: Nothing) = NothingObject[\T\]`
   (`not_working_library_tests/MaybeTest1.fss:57-58, :83`, `7a86ba79c`, 2011-04-19), the
   commented compiler-prelude block (`b2f311d66`, 2011-09-02) that the revival's rung M uncommented
   (`Library/CompilerLibrary.fsi:223-236`, `6823d52b6`), and `Option`/`None`
   (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:680-691`, on the trunk since `f85e96424`,
   2012-05-30). The use site keeps a bare `Nothing`. **[read]**
   - **Compiled path: compiles and runs [measured, `AltEmptyCoerce`].** It prints `1` and `0`.
   - **Walk: refused, even with rung C [measured, `AltEmptyCoerce`].** The typed binding fails
     with `RHS expression type SEmptyMark is not assignable to LHS type SList[\ZZ32\]`.
   - **Why:** under walk a coercion declared in a *generic* trait is not applied. Rung C left
     this open as ledger row 389, with the expected-failure test
     `ProjectFortress/tests/XXXCoercionGenericTraitRungC.fss`.
   - **What it is not:** round 3's `AltGenericCoerceArg` puts the trait's parameter into the
     coercion's argument type (`coerce(m: Mark[\T\])`). Walk still refuses it, and the compiled
     path runs it [measured]. So the cause is row 389 itself, not the fact that `SEmptyMark`
     leaves `T` to be found from the declared type.
   - **Overturned:** the first version said walk would get this way from batch 4's coercion
     rung. Rung C landed and does not give it; row 389 must be fixed first.
3. **A covariant generic and one object at the bottom type**, Scala's `Nil` and Kotlin's
   `EmptyList`: `trait List[\covariant T\]`, `object Empty extends List[\BottomType\]`. The
   `covariant` keyword exists (below). The bottom type cannot be written: the specification's
   internal FAQ says "Can a programmer write `BottomType`? No." (`appendices/FAQ.tex:148-151`),
   and the parser and disambiguator have no such name; only the error-message printer and the
   interpreter's internal type use it. **[read]**
   - **Confirmed [measured, `AltEmptyBottom`]:** both paths stop at `BottomType is undefined`.
   - Even with the name bound, the covariance under it runs on neither path (Idea 2, way 2).
4. **A contravariant generic and one instantiation at the top**: when the trait's parameter is
   only consumed, `trait D[\contravariant T\]` and `trait C extends D[\Any\]` make `C` a `D[\T\]`
   for every `T`. It fits E2's shape, not E3's or E4's. **[inferred]**
   - **Overturned: it runs on neither path.**
   - `AltEveryContra` [measured]: the compiled checker accepts it, then the code generator crashes
     with `CompilerError: Only handling some static args of generic types in extends clause`.
     `Any` as a static argument in an extends clause falls through its cases
     (`CodeGen.java:5771-5778`).
   - `AltEveryContraObject`, round 3, with `D[\Object\]` in place of `D[\Any\]` [measured]: it
     compiles, then dies at run time with `IncompatibleClassChangeError: Class ...$O does not
     implement the requested interface ...D?...FZZ32?`.
   - Walk refuses both at the typed binding: `RHS expression type O is not assignable to LHS
     type D[\ZZ32\]`.
5. **A non-parametric root trait above every instantiation**: `AnyMaybe`, "This trait makes excludes
   work without where clauses, and allows opr = to remain non-parametric"
   (`FortressLibrary.fsi:814-822`), `AnyList` (`List.fsi:55-60`), `AnyCovColl` and `AnyEmpty`
   (`CovariantCollection.fss:71-96`), each with a "Not yet: `comprises List[\E\] where [\E\]`"
   note. It names every instantiation from **above**, a supertype, so it serves exclusion,
   equality and untyped plumbing, not membership in each instantiation. **[read]**
6. **Inference of the static argument at the use**, so that a bare `Empty` or `Nothing` means
   `Empty[\ZZ32\]` where a `List[\ZZ32\]` is expected. Not implemented on either path
   **[measured earlier: `FACTS.md` § Execution model, the entry of 2026-09-19 on generic objects
   without static arguments]**; the specification's inference chapter is a stub
   (`basic/inference.tex`, ledger row 21). **[read]**
7. **Binding the where-clause variable**, the specification's own way, which ledger row 331 and
   worklist item 12 (`fortress-gap-ledger.md:601`) hold as future work. Under route A this way
   is closed, not only postponed: a bound `T` in an extends clause makes the type a member of
   every instantiation, which is what the rule refuses. **[inferred from the rule's definition;
   the rule measured on two instantiations in `DoubleInstance`]**
8. **An explicit conversion**, the specification's `coerce_[\T\](x)` (`basic-lib/convenience.tex:24-28`)
   or a method. Not an empty value by itself; it converts one. **[read]**

### Idea 2: covariance (E1, E6, E10)

1. **Invariant parameters and an explicit widening function whose bounded parameters say `S extends T`**:
   the library's way. `private upward[\R, I extends R, T extends R\](_: Empty[\I\], s: Empty[\T\]): Empty[\R\]`
   and `opr APPCOV[\T, A extends T, B extends T\](a: CovariantCollection[\A\], b: CovariantCollection[\B\]): CovariantCollection[\T\]`
   (`CovariantCollection.fss:14-35`, Maessen, `e22945bc7`, 2008-11-01). **[read]**
   - **Runs on both paths [measured, `AltCovariantBounded`].**
     `widen[\T extends Any, S extends T\](c: C[\S\]): C[\T\] = CImpl[\T\](c.item)`, called as
     `widen[\Animal, Dog\](d)`, prints `dog` under walk and in the compiled run.
   - The one alternative for covariance that runs anywhere.
2. **Declaration-site variance**: `trait C[\covariant S\]` or `[\contravariant S\]`. Keywords
   added by Jean-Baptiste Tristan (`26718e298`, 2011-12-06); subtyping made variance-aware by
   Tristan King (`20a8febe9`, 2012-02-29; `TypeAnalyzer.scala:237-258`); a variance checker
   (`VarianceChecker.scala`, wired in at `compiler/StaticChecker.java:290`); nine tests
   (`compiler_tests/VarianceTest.test`, `1dc6cb3bf`, 2012-03-14) that pass the gate's type check
   **[measured earlier: `compile-ladder/climb-batch-1/gate/testFast.out:384-392`]**. The tests
   only type-check; no code under `interpreter/` or `compiler/codegen/` reads a parameter's
   variance **[read]**.
   - **Measured, `AltCovariantVariance`: variance lives in the compiled checker only.** The
     checker accepts `a: C[\Animal\] = d` with `d: C[\Dog\]`, and the compiled run then dies with
     `IncompatibleClassChangeError: Class ...CImpl?...Dog? does not implement the requested
     interface ...C?...Animal?`. The code generator gives `CImpl[\Dog\]` only its own
     instantiation's interface **[inferred from the error]**.
   - Walk refuses the binding: `RHS expression type CImpl[\Dog\] is not assignable to LHS type
     C[\Animal\]`.
   - This is the same kind of run-time failure the record already has for route C's specialisation hole
     (`FACTS.md`, the entry of 2026-09-24).
   - **Overturned:** the first version left open whether the paths honour variance. Neither does.

   Formalised by the team in Welterweight
   Fortress (`Papers/Welterweight/grammar.tick:48-49`, "Type parameters of traits can be
   covariant, contravariant, or invariant", `paper.tick:556`), with the rule generalised as the
   **Ancestors Meet Rule**: a trait may extend two instances of one trait only if it also extends
   an instance below both (`static.tick:83-89`). Naden's write-up of 2012-08-31 (`8015b17f4`,
   `Papers/Types/journal/justificationOfRTR.tex:499-566`) adopts the same: "Fortress supports
   variant generic types", covariant multiple instantiation exclusion, plus a restriction on
   crossed instantiations.
3. **A lower bound on a method's parameter**, the companion of a covariant container's methods:
   `f[\U dominates T\](x: U): U` (`compiler_tests/VarianceTest4.fss:16`, Welterweight's lower
   bounds, `grammar.tick:44-47`). **[read]**
4. **A generic coercion between instantiations**, the specification's own spelling:
   `coerce[\S extends Number\](x: Vector[\S\]) where {T widens or coerces S}`
   (`basic/conversions-coercions.tex:213-216`). **[read]**
   - **Refused on both paths [measured, `AltCovariantCoerce`].**
   - The compiled checker reports `Cyclic type hierarchy: Type C transitively extends/coerces to
     itself.` Its acyclicity check records a coercion's source by trait name only, dropping the
     static arguments (`TypeHierarchyChecker.scala:102-121`). So `C[\T\]`'s coercion from
     `C[\S\]` reads as `C` coercing from `C`. **[read]**
   - Walk refuses the binding, by ledger row 389, as in Idea 1's way 2.
   - **New finding:** the specification's own example of this spelling, `Vector[\T\]` coercing
     from `Vector[\S\]` (`conversions-coercions.tex:213-216`), is the same shape. By that code the
     compiled checker would refuse it too. **[inferred from the probe and the code; the
     specification's text itself not run]** This defect is not route A's; it is not in the ledger
     as far as I found.
5. **A non-parametric root with `Any`-typed operations**: `opr APPCOV(a: AnyCovColl, b: AnyCovColl): AnyCovColl`,
   `CVReduction extends MonoidReduction[\AnyCovColl\]` (`CovariantCollection.fsi:16`, `:45-48`),
   `List`'s `CVConcat` (`List.fss:237-242`): covariance recovered at run time, not in types. **[read]**
6. **Matching on a function's return type in a `typecase`**, the library's deprecated trick
   (`Library/TypeProxy.fsi:14-35`). Its `__Proxy` carries the specification's covariance idiom as
   a comment, `(* extends { __Proxy[\U\], Object } where { U extends Any } *)`, commented out from
   the day it was written (`58556c0fb`, 2007-03-27, Maessen). **[read]**

### Idea 3: a type at two levels of a self-typed generic (E5, E6, E7)

1. **Flat numeric types under `Number`, each carrying its own algebra, with a `coerce` on the wider
   type from the narrower**: Steele's 2011 compiler prelude, and route A's decision
   (`POSITIONS.md:92`). **[read]**
2. **An abstract name above, concrete leaves below, no algebra on the abstract name**: the
   interpreter library's `Object extends Any` alone (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:32`),
   identity as a top-level `opr SEQV(a:Any, b:Any)` (`FortressLibrary.fsi:2474`), equality by the
   self-typed `Equality[\T\]` on the types that want it (`FortressLibrary.fsi:73`). **[read]**
3. **The patents' forest rule** (route C): a self-typed generic may be carried at several
   instantiations that form a chain (`FACTS.md` § Execution model, the entries of 2026-09-23 and
   2026-09-24). Not taken; kept recoverable.

## The nine steps

### 1. The refresher

- **E3 `Empty`, E4 `Nothing`**: the empty list and the absent value are the same for every element
  type; in mathematics the empty set is a subset of every set. The specification wants one object
  that is a `List[\T\]`, a `Maybe[\T\]`, for every `T`.
- **E2**: the same idea at trait level: a trait all of whose objects are a `D[\T\]` for every `T`.
- **E1 covariance**: a read-only box of dogs can stand where a read-only box of animals is
  expected. The specification builds it out of subtyping between instantiations.
- **E5-E7**: the integers are a subset of the rationals, which are a subset of the reals; each set
  with its operations is a ring or a field. The specification builds this as nested traits, each
  also an instance of the algebra at its own level.
- **E8**: one object belonging to two unrelated instantiations.

### 2. What each path does today

- **The specification's where-clause declarations stop at name resolution on both paths, before
  any rule runs.** `SpecEmpty`, `SpecSubtraitOfEvery`, `SpecCovariant` and `SpecNothingNoExcludes`
  give the identical `T is undefined` from walk and from compile (rc 255), at the `T` in the
  extends clause **[measured]**. The spelling the grammar and parser now use, a binding list
  `where [\T extends Object\]` (`concrete-syntax.tex:496`, `parser/NoNewlineHeader.rats:147-166`),
  gives the same **[measured, the four `*Bound` probes]**. The reason: the type disambiguator puts
  only the declaration's own static parameters in scope for its extends clause
  (`compiler/disambiguator/TypeDisambiguator.java:86`, `:118`) **[read]**. The code generator
  would refuse an object with a where clause a second time (`CodeGen.java:4088`) **[measured
  earlier, `FACTS.md`, the entry on `Nothing`]**.
- **The specification's `Nothing` verbatim** is a syntax error on both paths, at its `excludes`
  **[measured, `SpecNothing`, `SpecNothingBound`]**.
- **When the double membership is written directly, the rule is what refuses it.** `DoubleInstance`
  (E8's shape): walk runs and prints `foo took a Plussable[Wrong]`; compile refuses with "Types
  Plussable[\Right\] and Plussable[\Wrong\] exclude each other. Parent must not extend them."
  **[measured]**. `NestedTower` (E5's shape): walk runs; compile refuses with five errors, "Type
  ZZx excludes QQx but it extends QQx" among them **[measured]**.
- **The alternatives**, rounds 2 and 3 **[measured]**. Exit codes are given in the order
  compile, compiled run, walk; "none" means the compiled run never happened.
  - `AltEmptyParam`, the parametric `Empty[\T\]` plus a factory: 0, 0, 0. It prints `1` and `0`
    on both paths.
  - `AltEmptyParamBare`, the same with the argument left to inference: 255, none, 1.
    - compile: `T is not in the kind env`;
    - walk: `InterpreterBug ... uninstantiated`.
  - `AltEmptyCoerce`, a marker object plus a `coerce` in `SList[\T\]`: 0, 0, 1. Walk fails by
    row 389: a generic trait's coercion is not applied.
  - `AltGenericCoerceArg`, the same with `T` in the coercion's argument: 0, 0, 1. Walk fails by
    row 389.
  - `AltEmptyBottom`, a covariant list with `Empty extends SList[\BottomType\]`: 255, none, 255.
    Both paths report `BottomType is undefined`.
  - `AltCovariantBounded`, the widening function `widen[\T, S extends T\]`: 0, 0, 0. It prints
    `dog` on both paths.
  - `AltCovariantVariance`, `trait C[\covariant S\]`: 0, 1, 1.
    - run: `IncompatibleClassChangeError`;
    - walk: the binding is not assignable.
  - `AltCovariantCoerce`, `coerce[\S extends T\](c: C[\S\])`: 255, none, 1.
    - compile: the checker reports `Cyclic type hierarchy`;
    - walk: row 389.
  - `AltEveryContra`, `D[\contravariant T\]` with `C extends D[\Any\]`: 1, none, 1.
    - compile: the code generator crashes on `Any`;
    - walk: the binding is not assignable.
  - `AltEveryContraObject`, the same with `D[\Object\]`: 0, 1, 1.
    - run: `IncompatibleClassChangeError`;
    - walk: the binding is not assignable.

  Rung C's coercion does apply at typed bindings under walk: `Coercions.coerceToDeclared`, one
  of the three places named in its commit. The walk failures of the two coercion rows are
  therefore row 389 and nothing more general.

  What the round-2 and round-3 results come to:
  - **Two ways run on both paths:** the library's parametric object and the library's widening
    function.
  - **One runs only compiled:** the compiled prelude's marker plus coercion.
  - **Everything that relies on variance runs on neither path.** The checker alone knows it.
  - Neither the bottom type nor the generic coercion gets as far as a run.
- **The library's ways, from the earlier record, agree with this:** a parametric object with its
  argument written compiles and runs on both paths, and a bare one fails on both **[measured
  earlier, `FACTS.md`, the entry of 2026-09-19; confirmed by `AltEmptyParam`,
  `AltEmptyParamBare`]**. The marker-plus-coercion `Nothing` runs on the compiled path in the gated
  test `ProjectFortress/library_tests/MaybeRungM.fss:15` (`coerced: Maybe[\ZZ32\] = Nothing`)
  **[read; gated]**.

### 3. What the specification's prose says, including under another spelling

- It permits what the rule forbids, in so many words: "Trait declarations are allowed to extend
  other instantiations of themselves" (`trait-parameters.tex:339-340`); "trait C is a subtrait of
  **every** instantiation of parametric trait D" (`:365-367`); a trait type "is a subtype of every
  type that appears in the extends clause of its definition" (`basic/types-vals-vars.tex:208-209`).
  Nowhere does it state the rule. **[read]**
- It already sees the cost: E2's paragraph says such a trait "really contains infinitely many
  methods" and that "it must be possible to infer which method is referred to at the call site",
  else the program is rejected (`trait-parameters.tex:365-379`). Luchangco's notes say "It is
  possible for a trait to explicitly extend itself using hidden type variables", "we could just
  rule this a special case" (`basic/traits.tex:174-180`). **[read]**
- It flags its own where clauses: "The where clause syntax in this section is out of date"
  (`trait-parameters.tex:287`, added `93f5018fd`, 2009-11-11), "Where clauses ... are not yet
  supported" (`basic/traits.tex:15-16`), and the core calculus with where clauses carries "Where
  clauses are not yet supported" (`appendices/calculi/where/calculus.tex:16`). Those `\note`s, like the internal appendix,
  print only in the non-release build, which is the default one. **[read]** The where calculus (`appendices/calculi/where/`)
  formalises where-clause variables in extends clauses; I did not check it in depth for a
  statement that would conflict with the rule.
- The same idea under another spelling: **coercion** (`basic/conversions-coercions.tex`), including
  a coercion with static parameters from another instantiation (`:213-216`), and the rule that a
  type may not declare a coercion from its own subtype (`:609-633`), which a flat tower satisfies
  and the nested one could not use. **[read]**
- Its internal FAQ: a programmer cannot write `BottomType` (`appendices/FAQ.tex:148-151`). **[read]**
- The rule's own sources: "Fortress imposes a rule that forbids multiple instantiation
  inheritance", with the footnote that extending it to covariant and contravariant parameters "is
  straightforward, but beyond the scope of this paper" (`Papers/Types/exclusion.tick:141-152`);
  Naden: "Ultimately, Fortress implements blanket multiple instantiation exclusion for the
  semantic benefits and the simplicity of the restriction" (`justificationOfRTR.tex:496-497`).
  **[read]**

### 4. Where each sits in the type hierarchy

- **E3, E4**: at the bottom of one generic's family, below every instantiation of `List` or
  `Maybe`; the family has no single bottom under invariance, so the object sits below infinitely
  many unrelated types.
- **E2**: the same, one level up, for a trait.
- **E1**: across a generic's instantiations, making them a lattice ordered like their arguments;
  the rule sees each `C[\T\]` above `C[\Dog\]` as another instantiation.
- **E5**: vertical: `ZZ` below `QQ` below `RR`, each also an instance of its algebra at its own
  level; the rule sees `CommutativeRing[\ZZ,...\]` and, through `QQ`, `Field[\QQ,...\]`'s own
  ancestors at `QQ`.
- **E6, E10**: the same tower expressed inside one generic by boolean parameters.
- **E7**: the root: every type below `Object` meets `EquivalenceRelation` at `Object` and at itself.
- **E8**: sideways, two unrelated instantiations.

### 5. What the library already does in the same family

- For E3 and E4, the library has never had the specification's shape. Its `Nothing` was
  parametric in the first commit (`72ae6881b`, 2007-01-04, `ProjectFortress/FortressLibrary.fss:78`,
  `object Nothing[\T\]() extends { Maybe[\T\] }`, with a non-parametric root `MaybeType`), and its
  comments say why: "This makes excludes work without where clauses" (`92de9961b`, 2007-02-16),
  "`Nothing` will become a non-parametric singleton when we get where clauses working"
  (`f861cca4d`, 2008-03-29, Maessen). Its covariant collection's empty is `Empty[\T\]`, its list's
  is `emptyList[\E\]()`. **The library's way: one parametric object per instantiation, a factory
  function, and an `Any`-prefixed root above.** **[read]**
- For E1, the library never wrote the idiom except as a comment (`TypeProxy`'s `__Proxy`) and never
  used the 2012 `covariant` keyword (no occurrence under `Library/`) **[read]**. **Its way:
  invariant parameters, a widening function with bounded parameters, and an untyped root for the
  run-time join.** That way is also the only one measured to run on both paths
  (`AltCovariantBounded`).
- For E5 to E7: the interpreter library keeps the nested tower (`NN64`, `ZZ32`, `ZZ64`, `ZZ` each
  `Integral[\...\]` at its own level, `FortressLibrary.fsi:412-537`), which is what route A
  flattens; its `Object` carries no algebra. The compiler prelude was flattened by Steele in 2011.
  **[read]**

### 6. What the peers do, by family

Whether a type may belong to two instantiations of one generic:
- JVM, forbidden. Java: "A class may not declare ... two direct superinterface types, which are,
  or which have supertypes which are, different parameterizations of the same generic interface"
  (JLS §8.1.5, <https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html>, fetched). Scala:
  "illegal inheritance; ... inherits different type instances of trait" (compiler diagnostic,
  <https://github.com/scala/bug/issues/8830>). Kotlin: `INCONSISTENT_TYPE_PARAMETER_VALUES`
  (<https://youtrack.jetbrains.com/issue/KT-74147>). X10, the HPCS sibling, keeps the rule too
  (from the revival's literature record, `FACTS.md`, the 2026-09-23 entry).
- .NET, allowed for a non-generic class: C# forbids only interface lists that could unify for
  some type arguments (C# standard §19.6.3,
  <https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/interfaces>, fetched).
- Close to the metal, allowed: Rust implements one generic trait at many arguments (`impl From<u8> for u32`,
  `impl From<u16> for u32`, <https://doc.rust-lang.org/std/convert/trait.From.html>, not fetched);
  it has no subtyping between types, only "variance with respect to lifetimes"
  (<https://doc.rust-lang.org/reference/subtyping.html>, fetched).
- Scientific, impossible by construction: in Julia "All concrete types are final and may only have
  abstract types as their supertypes", and parameters are invariant: "Even though Float64 <: Real
  we DO NOT have Point{Float64} <: Point{Real}" (<https://docs.julialang.org/en/v1/manual/types/>, fetched).

One empty value for every element type:
- Scala `case object Nil extends List[Nothing]` with `sealed abstract class List[+A]`
  (<https://github.com/scala/scala/blob/2.13.x/src/library/scala/collection/immutable/List.scala>, fetched);
  Kotlin `internal object EmptyList : List<Nothing>` and `fun <T> emptyList(): List<T> = EmptyList`
  (<https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/src/kotlin/collections/Collections.kt>, fetched):
  covariance plus a writable bottom type.
- Java `Collections.emptyList()`: a generic factory over one raw singleton, relying on erasure
  (JDK `java/util/Collections.java`, not fetched).
- C# `Enumerable.Empty<TResult>()`, Rust `Option::None` and `Vec::new()`, Swift `Optional.none`: one
  value per type argument, the argument inferred (not fetched).
- Haskell `data Maybe a = Nothing | Just a` (Haskell 2010 Report §6.1.8,
  <https://www.haskell.org/onlinereport/haskell2010/haskellch6.html>, fetched): one polymorphic
  constructor, no subtyping at all, so no rule is needed.

Covariance:
- Declaration-site: Scala `+A`, Kotlin `out` ("This is called declaration-site variance",
  <https://kotlinlang.org/docs/generics.html>, fetched), C# `out`, restricted "to generic interface
  and generic delegate types" (<https://learn.microsoft.com/en-us/dotnet/standard/generics/covariance-and-contravariance>, fetched).
- Use-site: Java wildcards `List<? extends Animal>` (JLS §4.5.1, not fetched); Julia
  `Point{<:Real}` (fetched, above).
- None: Rust for types, Haskell.

No peer expresses covariance by a type extending other instantiations of itself, as E1 does
**[inferred from the list above]**.

### 7. The history in the commits

The history is severed in 146 places, so dates below come from a binary search over the trunk's
commits by date for the first tree containing the text (`git grep` per commit), not from
`git log` on a path.
- **E3 `Empty`** is older than the repository: it is in the first commit, as a test that never
  passed, "(* pages 41-42 *)" of an early draft (`72ae6881b`, 2007-01-04,
  `ProjectFortress/not_passing_yet/examples.fss:376-390`). **[read]**
- The specification's LaTeX entered the repository on 2009-11-06, "Added the entire spec files.
  The next task is to integrate the technical decisions since 1.0." (`0f49d8698`, Sukyoung Ryu),
  with E1, E2 and E3 as they are now; the where-clause section got its "out of date" note five
  days later (`93f5018fd`); since then only a copyright header changed (`2f8b4331a`, 2011-02-02),
  and the revival changed none of these chapters. All three are in `Specification-1.0-frozen/`
  at the same lines (`basic/trait-parameters.tex:341, :357, :385`). **[read]**
- **E4 `Nothing`**'s shape was the specification-side standard library's in 2007
  (`StandardLibrary/Fortress.Convenience.fsi:23`, `3f92f1495`, 2007-08-18) and entered
  `convenience.tex` on 2009-11-03 (`6d53c0fc4`). The running library was parametric throughout
  (above). **[read]**
- **E8, E9** entered with the appendices on 2009-11-02 (`cec470a34`). **[read]**
- **The rule** entered the checker on 2010-05-28 (`5a6b7913b`) and took its present form on
  2010-07-26 (`e828b44b1`, "Made exclusion and subtyping work together as described in the
  paper"), both by jrhil47 (Justin Hilburn) **[read]**, after every example above was written. No
  commit revised an example afterwards.
- **Covariance** in the implementation: the commented `__Proxy` (2007), `CovariantCollection`
  (2008-11-01), the `covariant` keyword (2011-12-06), variance-aware subtyping and checker
  (2012-02-29, 2012-03-13), the tests (2012-03-14), Welterweight (submitted to OOPSLA 2012) and
  Naden's write-up (2012-08-31) **[read]**.

### 8. The derivation from Pavol's principles

The principles: route A (2026-09-24); the late implementation-informed positions of the type
group outweigh the early specification text (2026-09-23, `POSITIONS.md:80`); the library's
practice is the standard (2026-09-19, `POSITIONS.md:40`); the revision leaves no open discrepancy
and keeps the original text and route C recoverable (2026-09-24, `POSITIONS.md:85`).

- **Route A makes every example in the list illegal as written.** The where-clause examples are
  the rule's plainest case, infinitely many instantiations. They are refused today for a
  different reason (the variable is never bound); route A means binding it would not help. **[inferred]**
- **Route C would not rescue E1-E4 or E8 either.** The forest rule admits several instantiations
  only of a self-typed generic, and only along a chain; `List[\ZZ32\]` and `List[\String\]` are
  neither **[inferred from the forest rule as `FACTS.md` records it]**. So the language chapter's
  examples change whichever route is taken; only E5 and E7, the tower and the root's algebra,
  would read differently under route C. The decision record can say so, and needs to carry the
  original text of E5 and E7 as route C's text.
- **Late over early**: every example is 2007-2009 text; the rule is 2010, the flat compiler prelude
  and the marker coercion 2011, variance 2011-2012, Naden 2012. For E1, the type group's late
  spelling of covariance is the `covariant` keyword, not the self-extension. For E3 and E4 the
  group's late shapes are Steele's marker plus coercion (compiled world) and the parametric object
  (interpreter library, decided for the one library in row 331).
- **Library practice**: parametric objects with factories (E3, E4), invariant parameters with
  widening functions (E1), no algebra on `Object` (E7), and, after the flattening rung, flat
  numbers (E5, E6).
- **E1 was the one place where two principles pulled apart, and the probe has settled it.**
  - The type group's late position is declaration-site variance; the library never used it and
    uses widening functions.
  - The first version of this note left the fork to a probe, per his rule of 2026-09-22 that a
    fork a probe can settle is probed before it is decided (`POSITIONS.md:71`).
  - The probe says variance is the compiled checker's alone: it type-checks, dies at run time
    with `IncompatibleClassChangeError`, and walk refuses it (`AltCovariantVariance`,
    `AltEveryContraObject`) **[measured]**.
  - So writing `covariant` into the specification now would open exactly the discrepancy his
    09-24 requirement forbids: a specified construct that runs on neither path. The late
    position describes a checker feature the team never finished at run time.
  - The library's widening function runs on both paths (`AltCovariantBounded`). Late-over-early
    and library practice no longer conflict for anything that can be written today.
- **Row 331 is changed in meaning, not in outcome.** Its "future work gated on where clauses"
  (`POSITIONS.md:51`) now leads to a refusal. Under route A the specification's bare `Nothing`
  has only two roads left:
  - A coercion from a marker. It runs compiled today (`AltEmptyCoerce`, `MaybeRungM`). Walk needs
    ledger row 389 fixed, which rung C did not cover **[measured]**. The first version said
    "walk needs batch 4's coercion rung"; that is **overturned**.
  - Covariance plus a writable bottom type. That is a language addition, and both halves are now
    measured absent at run time.

  Worklist item 12, "bind where-clause variables in `extends`", stands in the same light.
  **[inferred]**
- **Two defects outside route A came up, and the revision should not lean on either:**
  - variance is not carried to run time;
  - the compiled checker's cycle check drops static arguments, which refuses the specification's
    own generic coercion example (`conversions-coercions.tex:213-216`).

  Neither is in the ledger as far as I found. They join the operator-argument failure
  (`OprSingle`) as candidate rows. **[measured for the probes' shapes; inferred for the
  specification's own example]**
- **No open discrepancy**: the specification must also say the rule (it says the opposite at
  `trait-parameters.tex:339-340` and `:365-367`), and, since the implemented rule ignores operator
  arguments, say whether operator arguments count. **[read; inferred]**
- **Recoverable**: the original wording of every example is in `Specification-1.0-frozen/` at the
  same lines and in the history; the form for showing each change is a separate question
  (`reviews/spec-change-form.md`).
- **Sequencing**: route A puts the specification rung in batch 4 and the flattening in the batch
  after (`POSITIONS.md:92`), so E5 and E6's final text cannot be written before the flat headers
  exist; the batch 4 rung can revise E1-E4, E7 and E8 and mark E5-E6 as following the library
  rung. **[inferred]**

### 9. The options, as they would be put to Pavol

**E3, the `Empty` list** (the example for "object declarations may include where clauses"):
1. The library's way: `object Empty[\T\] extends List[\T\]` and a factory `empty[\T\]()`, with the
   original shown as refused. Runs on both paths today (`AltEmptyParam`). Commits him to:
   - uses that name the element type until inference exists (`AltEmptyParamBare` fails on both
     paths);
   - a different example for a where clause on an object, one that constrains the object's own
     parameters. It is not yet written, and the code generator refuses any object with a where
     clause today (`CodeGen.java:4088`).
2. The compiled prelude's way: `object Empty end` and `coerce(_: Empty) = EmptyList[\T\]` in
   `List[\T\]`. Runs compiled; walk refuses it until ledger row 389 is fixed (`AltEmptyCoerce`).
   Commits him to:
   - the example moving to the coercion chapter;
   - a walk fix beyond rung C;
   - two names for one idea, against row 331's choice for `Nothing`.
3. Covariance and a bottom object, `object Empty extends List[\BottomType\]`. Measured dead on
   both paths: the name is unbound (`AltEmptyBottom`), and variance does not reach run time
   (`AltCovariantVariance`). Commits him to three new things:
   - a writable bottom type, which the FAQ says no to;
   - variance in the specification;
   - variance built into both paths.
4. Drop the example and state the rule. Commits him to: the where-clause section losing its
   object example.

**E2, "a subtrait of every instantiation"**:
1. Keep it as the rule's counterexample: the paragraph already explains the trouble; it gains one
   sentence that the declaration is refused. Commits him to nothing else.
2. Replace it with `trait C extends D[\Any\]` over a contravariant `D`. Measured dead on both
   paths:
   - with `D[\Any\]` the code generator crashes (`AltEveryContra`);
   - with `D[\Object\]` the compiled run dies with `IncompatibleClassChangeError`
     (`AltEveryContraObject`);
   - walk refuses both.

   Commits him to variance at run time on both paths, as E1's option 2, plus the code generator
   handling `Any` as a static argument in an extends clause.
3. Drop it.

**E1, covariance**:
1. The library's way: parameters are invariant; show the self-extension as refused and the
   widening function `widen[\T, S extends T\](c: C[\S\]): C[\T\]` as the way. Runs on both paths
   today, printing `dog` (`AltCovariantBounded`). Commits him to:
   - the specification describing what both paths run;
   - covariance staying a library pattern, with explicit static arguments at the call.
2. The type group's late spelling: `trait C[\covariant S\]`, with Welterweight's and Naden's rule
   for variant parameters. Measured: the checker accepts it; the compiled run dies with
   `IncompatibleClassChangeError`; walk refuses it (`AltCovariantVariance`). Commits him to:
   - grammar and prose in the specification;
   - building variance at run time on both paths: the code generator giving an object the
     interfaces of its supertype instantiations, and walk's subtyping reading variance;
   - later, the checker's exclusion test made variance-aware for a type that extends two
     instances of a covariant trait.

   Until that is built, this option is an open discrepancy of exactly the kind his 2026-09-24
   requirement forbids.
3. The coercion chapter's spelling: `coerce[\S extends T\](x: C[\S\])`. Measured refused on both
   paths (`AltCovariantCoerce`): the compiled checker reports `Cyclic type hierarchy` by its
   name-only cycle check, and walk fails by row 389. Commits him to:
   - fixing both;
   - noting that the coercion chapter's own `Vector` example has the same shape.

**E4, `Nothing`** (decided as row 331; what route A adds):
1. Write the library's `value object Nothing[\T\] extends Maybe[\T\]` into `convenience.tex`, drop
   the `excludes` clause (ill-formed on an object), keep `Maybe comprises { Nothing[\T\], Just[\T\] }`,
   spell the defaults in `basic/exceptions.tex:114-124` as `Nothing[\String\]` and
   `Nothing[\Exception\]`, and record that route A closes the where-clause road of row 331.
   Commits him to: explicit arguments until inference; the rung M lines and the gated
   `MaybeRungM` line 15 going at the switch-over, as already decided.
2. The compiled prelude's marker plus coercion in the specification. Commits him to:
   - reopening row 331, a closed decision;
   - fixing row 389 in walk (`AltEmptyCoerce`).

**E5 and E6, the tower** (decided by route A; the specification follows):
1. Rewrite the chapters' headers and "subtype of" lists to the flat library once the flattening
   rung lands; in batch 4 mark them as following that rung. Commits him to: two passes over these
   chapters, and the nested text preserved as route C's.
2. Mark `RationalQuantity`'s sign-refined types as refused and as future work by coercion, in line
   with the chapter's own "Future versions ... will include the exact details" (`basic-integers.tex:82-84`).

**E7, `Object`'s algebra**: follow the library, `trait Object extends Any` with identity as
`opr SEQV(a: Any, b: Any)`. Commits him to: the root chapter losing its algebraic description.

**E8 to E10, the internal appendix**: mark E8's premise as refused under the rule, point E9 at the
rule it motivates, and mark E10 as E6. Commits him to three sentences in a non-normative appendix.

**The operator-argument question**: state that the rule compares type arguments only, as the
implementation does. Add a ledger row for the compiled checker's failure on an inherited
abstract operator method (`OprSingle`). Commits him to one sentence and one row.

**Two further candidate ledger rows**, found by the alternatives and not caused by route A:
- variance is accepted by the compiled checker and carried to run time by neither path
  (`AltCovariantVariance`, `AltEveryContraObject`);
- the compiled checker's acyclicity check drops a coercion's static arguments, so a coercion
  between two instantiations of one generic reads as a cycle (`AltCovariantCoerce`,
  `TypeHierarchyChecker.scala:102-121`). By that code it refuses the coercion chapter's own
  example.

Each commits him to one row, or to a sentence saying the specification's text is ahead of both
paths.

My reading, not a decision:
- Rewrite E3 and E4 to the library's parametric objects.
- Turn E2 and the refused originals into counterexamples beside a first statement of the rule.
- Follow the library for E7 and, after its rung, for E5-E6.
- For E1, write the library's widening function as the way, and record the 2012 `covariant`
  keyword as the team's unfinished alternative that runs on neither path.

(The first version left E1 to the variance probe; the probe decided it.)

## Files

- This note: `explorations/reviews/spec-refused-examples.md`.
- The runner: `explorations/reviews/spec-refused-examples/run.sh`. It uses a private cache under
  the session's scratchpad, runs one probe per call, and does the compiled run through
  `MainWrapper` since the coordinator's mend.
- Probes, all run, with captures in `spec-refused-examples/captures/<name>.{walk,compile,run}.txt`
  (a `.run.txt` exists only where compile succeeded):
  - round 1: `SpecEmpty`, `SpecEmptyBound`, `SpecCovariant`, `SpecCovariantBound`,
    `SpecSubtraitOfEvery`, `SpecSubtraitOfEveryBound`, `SpecNothing`, `SpecNothingBound`,
    `SpecNothingNoExcludes`, `DoubleInstance`, `NestedTower`, `OprInstances`,
    `OprInstancesOplus`, `OprSingle`;
  - round 2, run by the coordinator: `AltEmptyParam`, `AltEmptyParamBare`, `AltEmptyCoerce`,
    `AltEmptyBottom`, `AltCovariantVariance`, `AltCovariantBounded`, `AltCovariantCoerce`,
    `AltEveryContra`;
  - round 3: `AltGenericCoerceArg`, `AltEveryContraObject`.
- The coordinator commits this note and the round-3 files.
