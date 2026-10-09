<!-- The judgement of array fork 3, a size known only at run time, written 2026-10-09 by a top-tier worker on the curator's go, for Pavol (his section is last) and the coordinating session. It judges the ways of `reviews/array-design-ways.md` section 5 (4a to 4e) by the nine steps and recommends one, with a default, its cost, and the shape of a batch 13 rung beside item 15's. Base: `main` at `0bf0c0a4c`, whose `Library/`, `ProjectFortress/` and `Specification/` are climb batch 12's landing (the last landed gate's distance is 153, `compile-ladder/climb-batch-12/gate/distance.txt:2`). Evidence cited, not re-gathered: the two array notes, the record's entries the brief names, batch 12's gate and review, the library, the checker, walk, the code generator, the parser, the specification, the papers and the commits, each at file:line. Nothing was built, run or measured: no measurement decides between two of the ways before the switch-over (section 7). Readings of my own are marked "by reading". -->

# Array fork 3, a size known only at run time: the judgement

## In short

- **The question.** How a number computed when the program runs becomes a size that the compiled checker accepts and the compiled path runs. Today `reflect(x)` answers the trait `NatParam`, and the checker does not know that every `NatParam` is some `N[\n\]`, so it refuses the library's own run-time factories and subarrays: 10 sites of the 153 (section 1), 4 more hidden behind two checker crashes, and the model's three bridges later.
- **The judgement.** Way 4a: the team's own clause, `trait NatParam comprises { N[\n\] } where [\nat n\]`, written as a comment in 2007 and never built, uncommented; the checker taught the one rule it states: an argument of type `NatParam` passed where `N[\n\]` is expected opens `n` as that value's own size, for that call. It is the library's own device to the letter, the papers' existential subtyping rule applied to a size, the specification's own `where`-clause variable, and what the peers do (Haskell's `someNatVal`). Way 4b, `reflect` built in as a primitive, clears nothing more once item 15's rule accepts `reflect`'s body, and its run-time economy cannot be measured before the switch-over: deferred, not refused. Ways 4c, 4d and 4e each leave the library's own factories refused or wait on `where` constraints.
- **The default.** 4a as the team wrote it; 4b when a compiled measurement asks for it.
- **The cost.** One checker rung of item 15's size: three checker files, two library lines, about ten lines in walk's loader, two specification sentences and an Appendix I entry, tests first. The compiled half (a call whose size is read off the argument's descriptor, through the dispatcher's own closure-table device) waits for the switch-over, as item 15's loader half does.
- **The order.** Beside item 15's rung, in batch 13's gate. Its library line must not land before item 15's part (b), or the checker would hold that `NatParam` excludes `N[\0\]` (section 5).
- **What it bends.** One sentence the revival itself wrote on 2026-09-28 (a listed type may not name a `where`-clause variable) is widened by a clause; his "Sizes" entry is read anew (an opened size is bound, not unknown). Nothing of his is reversed.

## 0. Words

- A *size* is a `nat` static parameter: a number in a type, the `16` of `Vector[\RR64, 16\]`. A *sized* type carries one; the *unsized* `Array[\E, ZZ32\]` does not.
- A *run-time size* is a size known only when the program runs: a file's length, the batch's rows, the parameter vector's length.
- A *witness* is an argument that carries a static argument and nothing else: `N[\n\]`, an object whose type carries a size (`ProjectFortress/LibraryBuiltin/NatReflect.fsi:27`), and `__thrower[\E\]`, a function never called (`Library/FortressLibrary.fss:2439`).
- `reflect(x)` turns a `ZZ32` into a witness: it answers the trait `NatParam`, whose every value is an `N[\n\]` (`NatReflect.fss:15-31`).
- *Opening* a size is binding a size name to a number known only at run time, inside the code that runs with it. The type theory calls the type "there is an `n` such that this is an `N[\n\]`" an *existential*, and opening it *unpacking*.
- A *skolem* is the fresh name the checker gives an opened size: equal to itself and to nothing else.
- A *`where`-clause variable* is a static variable that is not a static parameter, bound in a `where` clause (`Specification/basic/trait-parameters.tex:324-328`).
- *The distance* is the checker's error count on the one library; a *site* is one error's file and line (`compile-ladder/gate/distance-sites.tsv`).

## 1. The sites

**On the 153**, by the per-site list (`compile-ladder/gate/distance-sites.tsv:12-21`), each "Could not check call to function ... is not applicable to an argument of type (..., NatReflect.NatParam, ...)":

- The six run-time factories, `__arr1`, `__arr2`, `__arr3`, `__imm1`, `__parr`, `__piarr`, each called with `reflect(x)` where `N[\n\]` is declared (`Library/FortressLibrary.fss:2114`, `:2116`, `:2118`, `:2132`, `:2151`, `:2156`; the declarations `:2122-2127`, `:2142-2143`, `:2152-2153`, `:2157-2158`).
- The four rank-1 subarrays: `ImmutableArray1`'s `shift` and range subscript (`:2249`, `:2257`) and `Array1`'s (`:2307`, `:2315`), calling `__subarrayI` and `__subarray` (`:2345`, `:2350`) with `reflect(o)`, `reflect(|r'|)` and `reflect(r'.left.get)`. Row 664 records them. The brief's "9" is the count of `reviews/array-forks-now.md` before batch 12's rung R typed `r'.lower` and uncovered `:2257` (`reviews/batch-12-review.md:14`).

**Hidden.** Two crash rows stop the checker on the whole of `Array2` (`:2491-2605`) and `Array3` (`:2880-2993`) at their `asString`'s local `row`, whose parameter `i` has no type (`:2500`, `:2899`; `climb-batch-12/gate/distance.txt:33-34`, `summary.txt:130-133`). By reading, the two traits hold four live calls of the same shape: `Array2`'s range subscript and `shift` (`:2537`, `:2574`) and `Array3`'s (`:2948`, `:2959`). The fifth the forks note counted (`:2549`) is inside the comment at `:2543-2559`. Typing the two parameters is a one-line slip each; whatever else the traits hold then reaches the distance too.

**Outside the distance.** `Library/ChunkedSparseArray.fss:124-126`, `chunkedSparseArray` calling `csa(reflect(n), ...)` (the team's `sparseMatrix` test); the model's three bridges in its vocabulary, `view`, `heads` and `unheads`, each passing `reflect` results to a sized twin (`explorations/run-c4/src/FlatArrays.fss:61-64`, `:91-96`, `:104-109`); decision D's `step` bridge, which would do the same with seven (`reviews/array-design-ways.md` section 2, D1). The brief is right that this fork is the bridge the model's sized types need.

**Not this fork's.** `reflect`'s own body, `__refl'[\r+b, b+b\]` (`NatReflect.fss:45`, `:47`), 3 sites of class Z1, and the two `typecase N[\b0\] of N[\0\]` arms called unreachable (`FortressLibrary.fss:2423`, `:2434`): item 15's, answered today (POSITIONS, "Arithmetic in a size ... (item 15, 15a with (b))").

## 2. The nine steps

### 2.1 The type theory

A value whose length is known only at run time has the type "there is an `n` such that it is an `N[\n\]`": an existential, `∃n. N[\n\]`. To use `n`, a scope opens the existential, naming `n` afresh, works with it, and may return a type that mentions `n` only below a type that holds every `n` (`Array1[\E,0,n\]` returned as `Array[\E,ZZ32\]`), or else the name escapes its scope. The subtyping rule for existentials says exactly when an argument of such a type fits a parameter: `∃X. T <: ∃Y. U` holds when, with `X` fresh, `T <: U[V/Y]` for some `V` (`Papers/Types/fig-existential.tick`, "Existential Subtyping"; `Papers/Welterweight/fig-quantified.tick`, rule E-Sub). Here `T` is `N[\n\]` with `n` fresh, `U` is `N[\$n\]` with `$n` the call's inference variable, and `V` is `n`. The opened name is a skolem: it equals itself and nothing else, which is what keeps it from escaping into a declared type (section 2.9).

### 2.2 What each path does today

- **Walk** builds the witness by taking `z` apart into binary digits through a generic helper whose sizes it computes (`NatReflect.fss:42-57`), then binds `n` at dispatch: `IntNat.unifyStaticArg` requires a literal to be equal and binds a symbol (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/IntNat.java:127-147`). Every array microGPT makes goes through it; batch 11's walk check passed 7 of 7 (`reviews/array-forks-now.md` section 2).
- **The checker** infers a call's static arguments by constraining `argType <: domain` with inference variables in the domain (`scala_src/useful/STypesUtil.scala:941-960`). `NatParam <: N[\$n\]` is false: `NatParam` is a trait whose supertypes do not include `N`, and the checker's `comprises` knowledge enters subtyping only against a union type (`scala_src/types/TypeAnalyzer.scala:154-159`, `comprisedTypes`), never to open a listed instantiation. So the ten sites. The team's clause is a comment (`NatReflect.fsi:23`, `.fss:24`); were it uncommented, the checker would stop at the trait's header, since a non-type `where` binding is "not yet implemented" (`scala_src/typechecker/staticenv/KindEnv.scala:117-126`).
- **The compiled run** has what an opened size needs at run time: a size is a descriptor from `RTTIsize.of` (`compiler/runtimeValues/RTTIsize.java:24`; FACTS, "A size is carried at run time as a descriptor from `RTTIsize.of` ..."), "a size symbol is read off the value's descriptor as a type variable is" (the same entry), and the dispatcher already calls a generic arm at static arguments read off its arguments' descriptors, through the arm's closure table, `RTHelpers.loadClosureClass(table, name, RTTI...)` (`compiler/OverloadSet.java:1029-1068`, `:1735-1803`). What it lacks is the emission of that call outside a dispatcher, at a plain call of a generic function whose size argument is opened; and `NatReflect` is not in the compiled library, so no compiled program runs `reflect` (row 307). The code generator also refuses any trait, object or function with a `where` clause (`compiler/codegen/CodeGen.java:5024-5033`, `:4104-4115`, `:2966-2975`).
- **The parser** takes the team's spelling on both paths, by the grammar: a trait header's clauses are `Excludes | Comprises | Where` (`parser/TraitObject.rats:31-45`, `:100-105`; `Specification/basic/traits.tex:44-46`), and a `where` clause binds a size with `where [\ nat n \]` (`parser/NoNewlineHeader.rats:147-170`, `WhereBinding ::= nat w Id`). The `comprises` clause itself takes no `where` (`NoNewlineHeader.rats:96-145`), so the clause is written as the team wrote it in 2007, `comprises { N[\n\] } where { nat n }` (`da43f8872`), now in the binding form of `NatReflect.fss:24`.
- **Walk's loader** reads a trait's `where` clause for its constraints only, and binds a type for each `extends` constraint; it reads no bindings (`interpreter/evaluator/BuildEnvironments.java:899-909`, `:927-945`). By reading, the uncommented clause would stop walk at load with `n is undefined` when it evaluates `comprises { N[\n\] }` (row 25's message), until the loader binds the `where`-bound size.

### 2.3 The specification

- A size is a run-time value: `nat` parameters "are instantiated at runtime with numeric values" (`Specification/basic/trait-parameters.tex:94`).
- The device for a static variable that no parameter list declares is the `where` clause: "A `where` clause may introduce new static variables, i.e., identifiers for types and other static entities that may not be static parameters" (`:324-325`); "The `where`-clause variables must be bound in a `where` clause" (`:328`); "All static variables in a trait, object, or functional declaration must occur either as a static parameter or as a `where`-clause variable" (`:346-347`). `where` clauses are marked not yet supported (`Specification/basic/conversions-coercions.tex:15`).
- The `comprises` rule as the revival revised it on 2026-09-28: "every value of type T is a value of one of the listed types. A listed type may be an instantiation of a parameterized trait, provided that every static variable that occurs in its static arguments is a static parameter of T" (`Specification/basic/traits.tex:235-240`; Appendix I, `Specification/appendices/changes.tex:1296-1345`, "The traits that extend a closed trait"). The proviso follows the Types chapter's "G determines G' if every parameter of G' is a parameter of G"; it does not consider a `where`-clause variable, which the same specification allows a trait declaration to bind. The team's clause is exactly a listed instantiation at a `where`-clause variable: "every value of `NatParam` is an `N[\n\]` for some `n`".
- The library's two factories side by side: `array[E](size)` for "the specified runtime-determined size" and `array1[E,n]()` for "statically determined size n" (`Specification/advanced/parallelism-locality/arrays-distributed.tex:42-48`). The first is this fork's site.
- The team's Q&A on sizes: `f(x: T[\n+1\])` beside `f(x: T[\0\])` "Not allowed", `T[\1\]` beside `T[\0\]` "Allowed" (`Specification/appendices/internal-document.tex:167-198`): a name is not known to differ from a numeral, item 15's part (b).
- What the specification does not say: how a value of an existential type is opened. The rule to document is the team's comment's "within that function n becomes a static nat parameter" (`NatReflect.fss:19-21`).

### 2.4 The papers

- The Types paper (Allen, Hilburn, Kilpatrick, Luchangco, Ryu, Chase, Steele, OOPSLA 2011) gives the subtyping of existential types (`Papers/Types/fig-existential.tick`) and uses it for applicability: "the domain type of an abstract function (the tuple of argument types, with any type parameters of the function existentially quantified)" (`Papers/Welterweight/static.tick:45`, citing it). The checker implements that machinery for overloading, "Subtyping for existential domains" (`scala_src/types/TypeSchemaAnalyzer.scala:150-200`, `reduceED` at `:366`), while noting that it "cannot tell the difference between parameters that are supposed to be universally and existentially quantified" (`:41-50`).
- Welterweight Fortress (2012) reads a `comprises` clause at the level of values, "no value can belong to the trait unless it also belongs to one of the comprised types" (`changes.tex:1330-1335`, quoting `Papers/Welterweight/grammar.tick:21-22`), and gives E-Sub with the opened variables added to the environment as fresh constants (`fig-quantified.tick`, E-Sub, Δ' = Δ ∪ {P ...}).
- So the rule 4a asks for is the papers' own rule applied once more: the argument's type `NatParam` read as `∃n. N[\n\]` by its clause, opened against the domain by E-Sub. Nothing in the papers treats a size differently from a type here; sizes already take the type variable's path in inference (`scala_src/typechecker/Formula.scala:95-108`: a size variable is bound to "a static parameter or a literal", `isNatTerm`).

### 2.5 The library's own way, first

- `reflect` and one hoisted generic per shape taking `N[\n\]`: `array[\E\](x) = __arr1(__thrower[\E\], reflect(x))`, with the comment "This should be local to array, but we don't support local parametric methods" (`FortressLibrary.fss:2114`, `:2120-2127`). Row 25 names it "the sanctioned escape". `ChunkedSparseArray` does the same (`:124-126`), and the model's vocabulary copies the idiom (`FlatArrays.fss:61-64`).
- The team's own statement of the rule, as a comment on the declaration: `trait NatParam (* comprises { N[\n\] } where [\ nat n \] *)` (`NatReflect.fsi:22-25`, `.fss:23-26`), with "Really this just proves that it can be done without extending the language. Having proven that, we ought to build it in and document it in the spec for clarity and sanity's sake" (`.fss:38-40`).
- The same device for a type, also commented: "Not yet: comprises List[\E\] where [\E\]" (`Library/List.fsi:56`; row 636), and `AnyIntegral`'s "not yet: comprises Integral[\I\] where [\I\]" (`changes.tex:1343-1345`). Three places where the team reached for a `where`-bound listed instantiation and backed off because nothing built it.
- Where a value of an unsized type must be used at a sized one, the library's device is `cast[\T\]`, a run-time test (`FortressLibrary.fss:33-37`). That is decision D's `adam` bridge's device, not this fork's: this fork's sites all go the other way, from a sized result into an unsized declared type.
- The team's test of the rule under walk: `foo(x: N[\42\])` beside `foo(x: NatParam)`, `foo(reflect(42))` printing "OK" (`ProjectFortress/tests/NatReflectTest.fss:17-28`).

### 2.6 The peers

- Haskell: `someNatVal` "converts an integer into an unknown type-level natural", and a pattern match on `SomeNat` opens it; `KnownNat` reflects it back (`reviews/size-runtime-design-brief.md` § 6; `reviews/nat-checking-plan.md` § g). This is `reflect`, `N[\n\]` and `toZZ`, and 4a's opening is the pattern match.
- Futhark: a function whose result length is known only at run time has an existential size in its type, `?[m].[m]t` (`reviews/array-design-ways.md` section 5). The type is written; Fortress writes it through the `comprises`-with-`where` clause.
- Julia: `Val(n)` from a run-time `n` works by dynamic dispatch, "the same problem all over again" (design brief § 6). That is walk today.
- Swift (SE-0452) and Chapel keep run-time extents as values on the object or in metadata; Rust's const generics have no run-time size in a type at all (design brief § 6). Fortress's sized types put it in the type, so the existential is the honest spelling.
- Scala's `ValueOf[T]` passes the value of a literal type as an implicit argument (design brief § 6): the witness as an argument, which is the library's `N[\n\]` parameter.

### 2.7 The commits

- 2007-05-17, Jan-Willem Maessen (`da43f8872`; `research/authorship.md:45`): `reflect`, `NatParam`, `N` and the two comments enter `FortressLibrary.fss`, the clause already a comment, `comprises { N[\n\] } where { nat n }`.
- By 2012-05-09 (`e3a5358b6`, David Chase) it is the component `NatReflect` in `LibraryBuiltin`. The team's compiler never took it: the compiler's prelude names neither `NatParam` nor `reflect` (grep of `ProjectFortress/LibraryBuiltin/Compiler*.fs?`), and `NatReflectTest` stops at load on the compiled path (row 307).
- The revival: rung N taught the checker sizes as symbols and literals (`3f297441c`); rung Z carried them at run time as descriptors (`e893a3e00`); batch 6.5b's rung E made walk compute a size exactly and both paths range-check it (`413f36ac0`); batch 10's rung N cleared the witness's own refusal (`a1b5c253d`); batch 12's rung R uncovered `:2257` (row 664). The code that reads a static parameter off a value's descriptor and calls a generic arm through its closure table is the team's (`OverloadSet.java:1029-1068`, `:1735-1803`), used by the size rung for the dispatcher's literal leaf (`:1112`).

### 2.8 The derivation from his positions

- "The library's own practice is the standard": the library's way is `reflect`, the hoisted generic and the clause the team wrote beside it. 4a builds that way and no other. 4c and 4d each leave the library's own `array[\E\](x)` refused by the checker for good, which no reading of this entry allows.
- "Storage is `double[]`, unboxed": the `nat` sizes "are not sidestepped or layered in later". 4c sidesteps them for every run-time size, and that is most of the model's sizes (the batch's rows, the parameter vector). 4a keeps them.
- "The model's text is the notation" and decision D after the switch-over: 4d is decision D's D4, the batch size fixed at compile time, his to take there; it answers a different question (how sizes enter the model) and leaves this one.
- "Sizes": "A size left unknown after inference is an error only when it reaches a type, a name or a value". An opened size is not left unknown: inference binds it to the argument's own, as a type parameter is bound to an argument's type. This judgement reads the entry so; the reading is his to confirm (section 6).
- "The run-time size design is B": an opened size at run time is the descriptor already on the `N` value's RTTI, read as the dispatcher reads one. 4a adds no run-time kind. 4b would add a primitive over `RTTIsize.of`, the entry's own factory.
- "Arithmetic in a size ... 15a with (b)": 15a accepts `reflect`'s body; (b), a size name may equal a numeral, is what keeps `NatParam` from excluding `N[\0\]` once its clause lists `N[\n\]` (section 5).
- "The specification stays the standard" and "The S1 form": the clause the team commented is the specification's own `where`-clause variable; the sentence to revise is the revival's of 2026-09-28, in the S1 form with an Appendix I entry, route C being the team's comment.
- "Which decisions taken inside the work reach Pavol": this fork touches the checker, walk, the library and the specification, so it is his; the two readings it makes are named in section 6.

### 2.9 The ways, judged

1. **4a, the team's clause and rule.** Uncomment `comprises { N[\n\] } where [\nat n\]` in `NatReflect.fsi:23` and `.fss:24`. The checker: when an argument's type is a trait whose `comprises` clause lists an instantiation at `where`-clause variables, open each variable as a skolem and check the listed type against the parameter; a size inference variable then binds to the skolem (`TypeAnalyzer.scala:358-360`, `Formula.scala:107-108`), the call's result type carries it, and the body's type is checked against the declared type as usual. For every site on file the declared type is unsized (`Array[\E,ZZ32\]`, `ImmutableArray[\T,ZZ32\]`, `Array[\RR64,(ZZ32,ZZ32)\]`), which `Array1[\E,0,n'\]` meets by its `extends` clause. A skolem that reaches a declared type is refused by the ordinary size rule, since it equals only itself (`Formula.scala:100-105`): `y: N[\3\] = take2(reflect(x))` is refused, as it should be, and walk would refuse the same at dispatch only if the number differed. Escape is impossible by construction: no programmer can write the skolem's name. One value opened twice in one call gets two skolems, so `f(s, s)` with `f[\nat n\](a: N[\n\], b: N[\n\])` is refused where walk binds both to one number; no site on file does this (every site reflects fresh at the call). By reading it clears the 10 sites, the 4 hidden, `ChunkedSparseArray`, the model's three bridges and D1's `step` bridge. On the compiled path it needs, after the switch-over, the call emitted through the closure table with the size read off the argument (section 5, "What it leaves").
2. **4b, `reflect` built in, as the comment's second half asks.** The native would be `RTTIsize.of(String.valueOf(z))` and an `N` at that descriptor (FACTS, "The two probes ...": "a size made at run time (`array[E](n)`) gets its descriptor directly"). It replaces the binary decomposition, which under 15a compiles as it stands, one stamped helper instance per binary digit and about `2 log2(n)` generic calls per `reflect`, each ending in the same stamped `N[\z\]` class the native would need. With item 15 answered 15a, 4b clears no site. Its gain is run-time economy per array made, against the array's own fill of `n` elements: small by reading, unmeasurable until the compiled path imports `NatReflect` (row 307). It needs 4a's rule in any case. Judged: deferred, with its measurement named (section 5).
3. **4c, run-time sizes stay unsized.** The checker never accepts the library's own factories; the model's step stays unchecked in its shapes (D2). Refused by "Storage is `double[]`" and "The library's own practice is the standard".
4. **4d, no run-time sizes in the step.** Decision D's D4: changes the model's api and its caller, fixes the batch size at compile time, and still leaves the library's own ten sites. Not this fork's answer.
5. **4e, a `typecase` clause that binds a size.** No spelling exists: a clause binds a value name, and the draft's device for a new static variable is the `where` clause, whose constraints neither path supports. 4a uses the `where` clause's binding form, which both parsers take and which needs no constraint solving; 4e would need the rest.

## 3. The recommendation and the default

**4a.** Build the team's clause and its rule: the checker opens a `NatParam` at the call, as "within that function n becomes a static nat parameter" says. It is the library's own way, the papers' rule, the specification's device, and the peers' practice, and it clears every site this fork holds.

**The default he can accept without reading the argument:** 4a as the team wrote it, nothing added; 4b not built until a compiled measurement asks for it.

## 4. What it changes and what it costs

- **The library, two lines:** the comment marks removed at `NatReflect.fsi:23` and `NatReflect.fss:24`. No factory, subarray or test line changes. The idiom stays: `reflect` plus a hoisted generic per shape (row 25 stands).
- **The checker, three files, by reading about sixty lines:** `KindEnv.extractNodeBindings` takes a `nat` (and `int`) `where` binding (`KindEnv.scala:117-126`); `TypeAnalyzer.pSubInner` gets the opening case for a trait against a listed instantiation at `where`-clause variables (`TypeAnalyzer.scala:130-169`, beside the union case at `:154-159`, with `comprisesClause` at `:727-734` leaving `where`-bound names free); `TypeHierarchyChecker`'s `comprises` check accepts `N[\nat n\] extends NatParam` against the listed `N[\n\]` at every `n` (`TypeHierarchyChecker.scala:60-92`, `:242-272`). No change to `Formula`: a skolem is an `IntRef` with a fresh name, already a legal solution (`Formula.scala:100-108`).
- **Walk, about ten lines:** `processWhereClauses` binds each `where` binding of kind `nat` to a symbolic size in the trait's environment, so that `comprises { N[\n\] }` evaluates, and the load check of `comprises` clauses (`BuildEnvironments.java:1127`, `:1331`) reads the listed `N[\n\]` as `N` at every `n` (`:899-909`, `:927-945`). Walk's dispatch is untouched.
- **The specification, two sentences and an entry:** `traits.tex:238-240` widened, "... is a static parameter of T or a `where`-clause variable of T's declaration, which the listed type then holds at every value of"; one sentence in "Nat and Int Parameters" (`trait-parameters.tex:80-100`) stating the opening: an argument of such a trait's type, passed where a listed instantiation with a static parameter in the variable's place is expected, binds that parameter to the value's own size for that call. An Appendix I entry in the S1 form amending "The traits that extend a closed trait" (`changes.tex:1296-1345`), its route C the team's comment and the checker's refusal.
- **Tests, first** (section 5). **Sites:** the 10, the 4 hidden once `row`'s parameters are typed, none new by reading. **Rows:** 664 closes; 25 stands (the escape is now accepted, not removed); 307 stays open for the compiled run; 636 is the same rule for a type, not this rung's.
- **Cost of the compiled half, later:** the code generator emits, at a call whose inferred size is a skolem, the dispatcher's device, `loadClosureClass` with the size's RTTI read off the argument that carries it (`OverloadSet.java:1735-1803`), and `forTraitDecl`'s refusal of a `where` clause is narrowed to clauses with constraints (`CodeGen.java:5024-5033`). It waits for the switch-over with item 15's loader half; `NatReflectTest.fss` compiled is its test (row 307's reproducer).
- **4b's cost, if ever:** one native declaration in `NatReflect`, about twenty lines of Java over `RTTIsize.of` and the loader's instantiation of `N`, and a compiled measurement first: `reflect` per array made against the array's fill, in one JVM.

## 5. How a batch 13 rung builds it, beside item 15's

**Files.**
- `ProjectFortress/LibraryBuiltin/NatReflect.fsi:23` and `NatReflect.fss:24` (the clause).
- `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala` (`:117-126`), `scala_src/types/TypeAnalyzer.scala` (`pSubInner`, `:130-169`), `scala_src/typechecker/TypeHierarchyChecker.scala` (`:60-92`, `:242-272`).
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java` (`:899-909`, `:927-945`, `:1127`, `:1331`).
- `Specification/basic/traits.tex:238-240`, `Specification/basic/trait-parameters.tex` ("Nat and Int Parameters"), `Specification/appendices/changes.tex` (the entry at `:1296-1345`).
- `Library/FortressLibrary.fss:2500` and `:2899`, `row(i)` typed `row(i: ZZ32)`: the two slips that unhide `Array2` and `Array3`. Best in this rung, so that its rule is measured on all fourteen calls; a pile-1 rung before it does as well.

**Tests, first.**
- `ProjectFortress/compiler_tests/XXXNatOpenChecker.fss` and `.test`: a program of the compiler's own world (it cannot import `NatReflect`, row 307) that declares its own `trait NatParamT comprises { NT[\n\] } where [\nat n\]`, `value object NT[\nat n\]`, a maker `mk(): NatParamT = NT[\3\]`, and a generic `take[\nat n\](x: NT[\n\])` that answers `n` as a `ZZ32` and a sized result widened to an unsized parent; a refused line, `y: NT[\3\] = keep(mk())` with `keep[\nat n\](x: NT[\n\]): NT[\n\] = x`, expected as an error; and `typecase mk() of NT[\0\] => ... else => ... end`, reachable under (b). Seen failing at the header ("not yet implemented", `KindEnv.scala:126`) on the base; passing at the checker after. Its run is the compiled half's test, later; the file is promoted when both halves are in.
- The distance stage before and after, by row and line (row 577): the 10 gone and none come; with `row`'s parameters typed, the two crash rows gone and the traits' sites listed, the 4 calls among them gone.
- `ProjectFortress/tests/NatReflectTest.fss` under walk: by reading it stops at load on the base with the clause uncommented, and keeps its two "OK" after walk's edit. The seven array tests and `sparseMatrix` keep their verdicts.
- Keep their verdicts: the 17 `compiler_tests/NatRt*`, `NatArgRungS`, `NatDispArmChecker`, `NatOverrideChecker` (FACTS, "A size is carried at run time ...").
- After the edit: the interpreter suite once (walk's loader and the library changed), the count and distance stages once.

**Sites it clears.** 10 on the 153, 4 more unhidden; row 664 closes. **What it leaves.** The compiled run of an opened size and of `reflect`'s body (the generator's closure-table emission and item 15's loader half, after the switch-over); 4b; row 636's type case of the same rule; decision D's bridges, which clear by the same rule when the model compiles in phase 5.

**Order against item 15's rung.** Beside it, in one batch and one gate. The files do not overlap but `TypeAnalyzer.scala`, in different functions (`pEqv` for sizes, `:355-362`, is item 15's; `pSubInner` is this rung's) and `changes.tex`, each rung its own entry. One dependency: the library clause must not land before part (b). With `N[\n\]` listed, the checker's exclusion through `comprises` clauses (`TypeAnalyzer.scala:443-449` with `:457-470`) reads "`NatParam` excludes `N[\0\]`" under today's rule that a symbol is not any literal (`:355`), which is false and would make `typecase reflect(x) of N[\0\]` unreachable everywhere. Under (b) a name may equal a numeral, and the clause is sound. The rung's skeptic checks it on the merged tree. The `reflect` body's 3 sites are item 15's; neither rung needs the other for its own sites.

## 6. Decisions and points for the curator

- **A reading of "Sizes".** "A size left unknown after inference is an error only when it reaches a type, a name or a value": this judgement reads an opened size as bound, not unknown, since inference binds it to the argument's own as it binds a type parameter. If he reads the entry as refusing any size the call's text does not fix, 4a needs his word, and 4c is what remains.
- **A revision of the revival's own sentence.** `traits.tex:238-240`, written 2026-09-28 ("provided that every static variable that occurs in its static arguments is a static parameter of T"), is widened to admit a `where`-clause variable of the declaring trait. It reverses nothing of his: the sentence followed the Types chapter's determination rule, which did not consider `where`-clause variables; the specification's own `where` section allows them.
- **An array fork built before the switch-over.** Item 15's decision today made batch 13 the first array fork's rung; this follows it and bends nothing further.
- **Walk edited for a checker fork.** About ten lines in walk's loader, so that the library's clause loads. It is the walk half of the same rule and belongs in the rung.
- **Not taken:** 4b. Its measurement is named in section 4; it comes to him with the result, after the switch-over, if the result asks.
- **A line owed to INDEX** for this note, which the brief's "commit only that file" leaves to the coordinator.

## 7. What was measured

Nothing. The brief allows one measurement where it decides between two ways and is not on file. None does: 4a against 4b turns on `reflect`'s run-time cost compiled, which no tree can run before the switch-over (row 307); 4a against 4c and 4d turns on his positions; the parser's acceptance of the clause is settled by the grammar (`TraitObject.rats:100-105`, `NoNewlineHeader.rats:152-170`); walk's stop at load is a reading of `BuildEnvironments.java:927-945`, which the rung's first test shows.

## For Pavol

**The question.** A *size* is a number inside a type, the 16 of `Vector[\RR64, 16\]`. Some sizes are known only when the program runs. The library turns such a number into a size with `reflect(x)`. Walk accepts it. The compiled checker refuses it at ten library lines, because it does not know that `reflect`'s result, a `NatParam`, is always some `N[\n\]`.

**What the team left.** Jan-Willem Maessen wrote `reflect` in 2007 with the rule as a comment, `comprises { N[\n\] } where [\nat n\]`, and "we ought to build it in and document it in the spec".

**The ways.**

- 4a. Uncomment the team's clause. The checker learns: an argument of type `NatParam`, passed where `N[\n\]` is expected, binds `n` to that value's own size for that call.
- 4b. Also make `reflect` a run-time primitive. It clears nothing more, since item 15 accepts `reflect`'s body; its gain is speed, measurable after the switch-over.
- 4c. Leave such sizes unsized. The library's own `array[\E\](x)` stays refused.
- 4d. No run-time sizes, the batch size fixed at compile time: decision D's D4, which changes the model's api.
- 4e. A `typecase` that binds a size. No spelling exists; it needs `where` constraints first.

**Cost of 4a.** One checker rung of item 15's size: three checker files, two library lines, ten lines in walk, two specification sentences, an Appendix I entry. It clears the ten sites, four hidden in `Array2` and `Array3`, and later the model's three bridges.

**What it bends.** It widens one revival sentence of 28 September. It reads your "Sizes" entry anew: an opened size is bound, not unknown.

**Order.** Beside item 15's rung, in batch 13's gate; its library line not before item 15's part (b).

**Recommendation.** 4a, the team's clause and rule. Default 4a; 4b deferred.
