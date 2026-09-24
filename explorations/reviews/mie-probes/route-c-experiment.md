<!-- Route C of the exclusion fork built whole as a shadow and measured, 2026-09-24, by a delegated worker on main f2a603e61, JDK 25: the patents' forest rule with the covariant reading, a return type rule over the chain derived here, and the call-site fix (C-full), and the forest with specialisations allowed only at a chain's leaves (C-lite). Every run had private caches outside the repository; no tracked file was modified. Commands: route-c/route-c-run.sh. Shadows: route-c/c-full.patch, route-c/c-lite.patch. Library copies: route-c/lib-*.diff. Captures: route-c/probes/*.txt, probes-summary.txt, checker-count.txt, deep-count.txt, deep-errors.txt, compiler-tests.txt, prelude-compare.txt, flat-count.txt, overflow-stack.txt, size.txt. -->

# Route C built whole: the forest rule with its return type rule, measured

Terms as in `multiple-instantiation-exclusion.md` and `patents-forest-rule.md`. A **level** is a type on a chain of a self-typed trait: `ZZ32`, `ZZ64` and `ZZ` are levels of `Integral`'s chain. A level is **below** a specialisation when only part of the specialisation's arguments are at it: `ZZ32` is below `ZZ64`'s `TIMES`.

**What was built.** One shadow, `c-full.patch`, five tracked files copied and patched, 188 code lines:
- the patents' forest rule in `checkP`, with the library's F-bound accepted as "self-typed" (the forest shadow's hunk);
- the covariant reading of a trait that comprises exactly its parameter;
- a return type rule that checks every level of the chain, derived here (§ 1);
- the call-site fix of `scope-call-site-dispatch.md`, verbatim.

A second shadow, `c-lite.patch`, has the forest and a simpler rule: a specialisation may stand only at a leaf of the chain. Both were run on the 24 probes, on the library's checker count, and on the 43 generic-overload compiler tests. The library was copied and completed step by step: the markers dropped, then seven declarations added, then `comprises T` on the self-typed traits.

**The four answers.**
1. **C-full closes the specialisation hole, by refusal and completion.** The three hole probes are refused at compile time instead of dying with `IncompatibleClassChangeError`. The two completed programs link and give walk's answers: `ForestTowerCLeaf` prints exactly what walk prints for the unspecialised control. No dispatch change was needed beyond the call-site fix (§ 1, § 2a). On the library the rule refuses 25 pairs at 21 declarations: the patents note's seven, and fourteen more of `ZZ64`'s operators, which `ZZ32` declares itself but which count as covered only when `Integral` comprises its parameter. Seven declarations complete the tower; after them the rule refuses nothing with that identification assumed (§ 2b). All 43 generic-overload compiler tests print the same (§ 2c). The shadow is 188 code lines, the rule 109 of them (§ 2d).
2. **C-lite, a specialisation only at a leaf of its chain, refuses the tower's inner half.** 28 pairs at 23 declarations: `ZZ64`'s fifteen integer operators and its `CMP`, `QQ`'s `MIN`, `MAX` and `MINMAX`, and `Number`'s `MIN`, `MAX`, `MINMAX` and `CMP`. The leaves keep theirs: `ZZ32`'s, `NN64`'s, the comparison objects'. Of the 69 pairs the per-trait guard refused (`dispatch-and-route-c.md` § 2), C-lite refuses exactly the `ZZ64`, `Number` and `QQ` rows (§ 3).
3. **In plain words.** What the patents' rule gives that route A does not: the library keeps its shape. A `ZZ32` stays a `ZZ64`, a `ZZ`, a `QQ` and a `Number`, with the algebra at every level and `ZZ64`'s own arithmetic kept, and nothing needs coercion. What it does not do alone:
   - the rule it needs is derived here; the patents do not state it;
   - the rule needs seven more library declarations, and an identification of `Integral[\ZZ32\]` with `ZZ32` that only the patents' `comprises T` licenses, and `comprises T` overflows today's checker (§ 2b);
   - a chain with no specialisation at all still dies in compiled code with `AbstractMethodError` (§ 2a);
   - the interpreter refuses the specialised pairs and overflows on `comprises T`;
   - the compiled path and walk pick different levels for the same call, so they answer differently.
   The in-betweens are below.
4. **The reversal cost on record: confirmed in part, corrected in part.** C is probeable as a shadow, and its checker half is additive: on route A's flat library it changes no error. But C is more than a checker half plus a library rung in reverse. It also needs the code generator's call-site fix and a method for every level of a chain, interpreter work, and a way past the `comprises T` overflow. The library rung adds the seven declarations to un-flattening (§ 4).

**The counts, and what they mean.**

| library copy | stock | forest | C-full | C-lite | deep: forest | deep: C-full | deep: C-lite |
|---|---|---|---|---|---|---|---|
| the tree | 103 | 37 | 37 | 37 | | | |
| markers dropped | 90 | 24 | 24 | 24 | 203 | 228 (209 with the identification) | 231 |
| + the seven | 90 | 24 | 24 | 24 | | 230 (205) | |
| + `comprises T` | 89 | 23 | 23 | 23 | | overflow | |

The first four columns are the gate's instrument (`checker-count.txt`), comparable with 103, 37, 24 and 22 on record. It stops the `FortressLibrary` api at its hierarchy stage on errors every route keeps (`RelationalPredicateCondition` and `AnyIntegral`'s comprises), so it never reaches the overloading check where the rule lives. The deep columns are the zero probe's stack with this shadow on top (`deep-count.txt`). There the api does reach its overloading check. Its numbers are whole-unit errors, not comparable with the gate's. The difference a mode makes there is the count of refused pairs.

**The in-betweens.**
- *Supported:* C's checker half landed beside route A. On route A's flat library the C-full and C-lite shadows give the stock checker's 22 errors, error for error (`flat-count.txt`), so either can sit in the tree inert until wanted.
- *Supported:* the brief's hybrid, flat machine widths with ℤ ⊂ ℚ ⊂ ℝ kept as subtyping. The refusals split on that line: `ZZ64` over `ZZ32` (fifteen pairs, gone with flat widths), and `Number`/`QQ` over the integers (the `MIN` family, which the completions fix either way). It still needs all of C's other pieces. Not measured.
- *Supported with a cost named:* C-lite, where the tower's inner levels give up their specialised bodies.
- *Killed:* the forest without the rule (`IncompatibleClassChangeError`, `VerifyError`). A rule that checks only the levels below (`ForestLeafInv`). C written with the patents' `comprises T` in today's checker, until its overflow is fixed.

## 1. The return type rule over a chain, and the dispatch change

**The sources.** None of them states a rule for a chain.
- The specification's Subtype Rule: "If Ps ≺ Qs and Us <: Vs then f(Ps) and f(Qs) are a valid overloading" (`Specification/advanced/overloading.tex:162-166`). It is written for declarations whose static parameters are identical (`:95-96`), so it never meets two instantiations.
- Naden's general form, which the checker specialises: "Given a pair of function definitions d2 ≺ d1 in an overload set and a type T to which both are applicable. For every instance of d1 applicable to T with return type R1, there exists an instance of d2 that is applicable to T which has a return type R2 <: R1" (`Papers/Types/journal/justificationOfRTR.tex:320-322`).
- The checker: it solves for one instance of the generic (`scala_src/overloading/OverloadingOracle.scala:88`) and checks that one arrow (`:97`). Naden's proof says why one is enough under the exclusion rule: it "rules out any instantiation other than the one known at compile time" (`justificationOfRTR.tex:457-460`).

Under the forest rule a value is an instance of a self-typed generic at every level of its chain. So Naden's "every instance of d1 applicable to T" is one instance per level. The rule below is his sentence with that set written out. It adds one thing he did not need: a level can be served by a still more specific declaration, because dispatch runs that one there.

**The rule, exactly** (`c-full.patch`: `OverloadingOracle.forestLevels` and `forestCovers`, `OverloadingChecker.forestCheck` and `levelDeclares`, `TypeAnalyzer.forestChain`, `TraitTable.declaredNames`). Let f and g be declarations of one name, f more specific than g. Let the stock rule's solution put g's static parameters at A⃗. For every static parameter P of g that is bounded by S[P], with S self-typed, and whose argument A_P is a ground type M:
1. The **levels** are the declared non-generic traits and objects L ≠ M with L <: S[L] and L comparable with M: the other points of S's chain through M.
2. A level counts when f's domain and g's domain at P := L do not exclude.
3. At each counted level, f's return type must be a subtype of g's return type at P := L,
4. unless a declaration h is more specific than f and h's domain contains f's domain met with g's domain at P := L. h may be in the overload set, or declared by L itself (a level in another api, like `NN32` in `FortressBuiltin`). In that meet S[L] is read as L when S comprises exactly its parameter: the patents' "the two types include exactly the same sets of values" (US 8,843,887 col. 6 l. 41-55).
5. Otherwise the pair is refused: one error per pair, naming the levels.

The stock rule still checks M itself. Nothing is checked for a parameter solved to a type variable. That case is two generics with the same parameters, and the call-site fix makes the dispatcher take the call site's argument there. `-Dprobe.identify=true` also reads S[L] as L for an F-bounded S. That is sound only if nothing but L extends S[L], which is what `comprises T` enforces and the F-bound does not: `trait Odd extends { ZZ64, Integral[\ZZ32\] }` is legal under the forest.

Two things in the rule were not in the patents note's sketch. Both were found by measuring.
- **Levels above count too, not only the levels below.** Where the result holds the parameter invariantly, even a specialisation at the bottom of the chain breaks callers who see the value at a higher level. `ForestLeafInv` has `g(x: Eq[\Narrow\]): Marker[\Narrow\]` beside the generic. It links under the forest alone and dies with `VerifyError: Bad return type`: `Marker⟦Narrow⟧` "is not assignable to" `Marker⟦Wide⟧` (`probes/ForestLeafInv.txt:29-35`). Where the result is covariant in the parameter, the levels above always pass. `X`, `(T,T)` and every tower method are such results.
- **The solved level is not the specialisation's own level.** On a chain the solver picks the top. For `ZZ32`'s, `ZZ64`'s and `NN64`'s methods it picks `ZZ`; for `Number`'s `CMP` and `ZZ64`'s `CMP` beside `StandardPartialOrder`'s it picks `Number` (`deep-errors.txt`, the `M =` list). So "below" is decided per level against f's own domain: L is below f when f's domain, every S[A] read as A, is not inside g's domain at L. Only C-lite uses that distinction; C-full's verdict does not depend on it.

**The dispatch change: none beyond the call-site fix.** The patents note expected one. Under the covariant reading the checker can choose the generic's instance at a lower level while the dispatcher still runs the specialisation (`patents-forest-rule.md` § 3, `ForestTowerC` under `cov`). The rule removes that case. It checks every level, so a specialisation whose return type does not fit a lower level is refused, unless something more specific covers that level. And the dispatcher orders declarations with the same oracle (`compiler/OverloadSet.java:524`), so the covariant reading puts the covering declaration first by itself. Measured: `ForestTowerC` is refused under C-full, and `ForestGenericLeaf` and `ForestTowerCLeaf` link and answer right with the dispatcher unchanged (§ 2a).

## 2. The measurements

### 2a. The probes

Every probe under `forest/`, the `Mie*` probes, `ProbeMIEPick`, `RouteCProbe`, and rung P's other three, plus three new ones in `route-c/`. Each ran under walk and was linked and run under four modes: stock, forest (`-Dprobe.forest=fbound`), C-full and C-lite. One capture per probe, `probes/<name>.txt`; one line each in `probes-summary.txt`. The new probes:
- `ForestTowerCLeaf`: `ForestTowerC` completed with `f(x: Eq[\Narrow\]): Narrow = x.me()`.
- `ForestLeafInv`: a leaf specialisation whose result holds the parameter invariantly (§ 1).
- `ForestDispatch`: two generic overloads on a chain, `h` on `Eq[X]` beside the more specific `h` on `Tagged[X]`. `N` is a `Narrow` and a `Tagged[\Narrow\]`. This is the call-site fix on a chain, which the patents note did not probe.

| probe | walk | forest | C-full | C-lite |
|---|---|---|---|---|
| `ForestTower`, `ForestTowerC`, `ForestGeneric` | refused, or stack overflow | `IncompatibleClassChangeError` | refused by the rule: level `Narrow` | refused: `Narrow` below |
| `ForestTowerCLeaf`, `ForestGenericLeaf` | stack overflow | invalid overloading | link; `N N N N N M W N`, and `N N N` | refused |
| `ForestLeafInv` | stack overflow | `VerifyError` | refused: levels `Wide`, `Mid` | refused |
| `ForestDispatch` | `TagM[Narrow]` three times, then dies at `mw: Marker[\Wide\]` | `ClassCastException` | `TagM [Narrow]`, `EqM [Wide]`, `EqM [Wide]`, and `mw` holds `EqM [Wide]` | as C-full |
| `ForestTowerCNoSpec` (no specialisation) | `N N N N N M W N` | `AbstractMethodError` | `AbstractMethodError` | `AbstractMethodError` |
| `ForestInfer` | `Marker[Narrow]` six times | `Marker[Wide]` for the `Narrow`, `Mid`, `Wide` variables | the same | the same |

Sources: `probes/ForestTower.txt:43-51`, `:58-60`, `:68-70`; `ForestTowerCLeaf.txt:31`, `:43-50`; `ForestGenericLeaf.txt:43-45`; `ForestLeafInv.txt:29-35`, `:61-63`; `ForestDispatch.txt:2-6`, `:54`, `:59-62`; `ForestTowerCNoSpec.txt:2-9`, `:46`, `:53`, `:61`; `ForestInfer.txt:2-7`, `:49-54`.

**Does the hole close?** For the specialisation hole, yes.
- The three programs that died with `IncompatibleClassChangeError` are refused at compile time. The error names the level no declaration serves.
- The completed programs run. `ForestTowerCLeaf`'s eight answers are walk's eight answers for `ForestTowerCNoSpec`, the same program without the specialisation. Walk cannot run `ForestTowerCLeaf` itself: it overflows the stack on every program whose `Eq` comprises `T`, as the patents note found for `ForestTowerC`.

**Three things the rule does not reach.**
- **`AbstractMethodError` on a chain with no specialisation.** `ForestTowerCNoSpec` has the chain and the generic `f` only. Under the forest it prints two answers and dies: "Receiver class ForestTowerCNoSpec$N does not define or inherit an implementation of the resolved method 'abstract ForestTowerCNoSpec$Mid me()'" (`ForestTowerCNoSpec.txt:46`). The same happens under C-full and C-lite. Each instantiation of `Eq` is compiled as its own interface. `N` defines `me(): Narrow`, which in Fortress's terms overrides every level's `me`, but the JVM looks up `me(): Mid` for `Eq⟦Mid⟧` and finds none. The code generator adds a forwarding method only for a method the object does not override (`compiler/codegen/CodeGen.java:891-899`, condition 3), so it never writes that one. The cause is read from the error text and that comment, not traced. Whether the library's tower meets it was not probed; it would wherever a method of a self-typed trait is called through a middle level's instantiation. It comes with the chain itself, so route B, which also allows chains, would meet it too (reasoning, not measured). Not sized.
- **Which level a checked call takes.** The checker infers the top of the chain and walk the bottom. So compiled and walk answers differ on `ForestInfer` and `ForestDispatch`, the same program checked under both. Each answer fits the static type it was checked at, so neither path is unsound. But one library gives two answers.
- **The interpreter.** It refuses every specialised pair ("at least one pair of parameters must have excluding types", `ForestTower.txt:6`) and overflows on `comprises T`. C needs an interpreter rung of its own. Not sized.

The other probes behave as under the stock checker in every mode (`probes-summary.txt`). `Tag` and `G` are not self-typed, so `ProbeMIEPick`, `ProbeTypecaseMIE` and the `Mie*` probes are refused at the hierarchy. `ProbeMIEPickCtl`, `ProbeMIEOverload` and `RouteCProbe` link and run. `MieDispatchZZ32` keeps its `ClassCastException`, the `ZZ32` spelling defect. `MieTower` does not compile anywhere: it names the interpreter's `Integral`.

### 2b. The checker count over the library

**The library copies** (`route-c-run.sh` builds them from `lib-markers.diff`, `lib-seven.diff`, `lib-comprises.diff`, each on the one before):
- *markers*: `DistributesOver` dropped from `SumReduction` and `ProdReduction`, api and component. It is read nowhere.
- *seven*: the seven completing declarations (below).
- *comprises*: `comprises T` on `Equality`, `StandardPartialOrder`, `StandardMin`, `StandardMax`, `StandardMinMax`, `StandardTotalOrder`, and `comprises I` on `Integral`: the note's seven traits. `LexicographicOrder` had to get it too, or the checker refuses it: "StandardTotalOrder has a comprises clause but its immediate subtype LexicographicOrder is not eligible to extend it" (found while building the copy; not in a capture). So the clauses go on the whole family or on none of it.

**The gate's instrument.** The count is 37 under forest, C-full and C-lite alike (`checker-count.txt`). With the markers dropped it is 24, the count rung P's `broad` gives on today's tree (`patents-forest-rule.md` § 4). The seven change nothing there. `comprises` takes it to 23: `AnyIntegral`'s "immediate subtype Integral is not eligible" error goes (`deep-errors.txt`, the last list). Under every mode the `FortressLibrary` api stops at its hierarchy stage. The remaining errors are `RelationalPredicateCondition`'s excludes clause and `AnyIntegral`'s comprises clause (`checker-count.txt`, the last list). So the rule never runs on the library's own declarations in this instrument; only `RangeInternals` reaches its overloading check, and the rule refuses nothing there.

**The deep instrument.** The zero probe's stack (`perf-probes/nat/zero`), rebuilt on today's tree as `scope/scope-run.sh` rebuilds it. Its checker is the forest here, not `dropP`, so its library copies drop the markers too. The `FortressLibrary` api reaches its overloading check (`deep-count.txt`):

| library copy, mode | whole-unit errors | `FortressLibrary` api errors | pairs the rule refuses | specialisations |
|---|---|---|---|---|
| markers, forest alone | 203 | 320 | – | – |
| markers, C-full | 228 | 370 | 25 | 21 |
| markers, C-full, identification assumed | 209 | 332 | 6 | 4 |
| markers, C-lite | 231 | 376 | 28 | 23 |
| seven, C-full | 230 | 374 | 25 | 21 |
| seven, C-full, identification assumed | 205 | 324 | 0 | 0 |
| comprises, C-full | overflow | | | |
| comprises, rule dropped (`dropP`) | overflow | | | |

The forest alone gives 203, the zero stack's own figure with the rule dropped (`scope-call-site-dispatch.md` § 5). The seven add two errors that are not the rule's. The stock rule already complains that `StandardMinMax` declares `MIN` and `MAX` returning `(T,T)` (`.fsi:209-210`); those errors now also name `Integral`'s new `MIN` and `MAX` (`deep-errors.txt`, the last two sections).

**What the rule refuses, markers dropped, C-full** (`deep-count.txt`, the `markers-cfull` list):
- `ZZ64`'s fifteen letter-named integer operators beside `Integral`'s (`.fsi:518-532` beside `:418-433`), each at level `ZZ32`: `DOT`, `TIMES` (printed `BY`), `juxtaposition`, `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `BITAND`, `BITOR`, `BITXOR`, `LSHIFT`, `RSHIFT`, `BITNOT`. 15 pairs.
- `Number`'s `MIN`, `MAX`, `MINMAX` (`.fsi:289-291`) and `QQ`'s (`.fsi:388-390`), beside `StandardMin`'s `MIN`, `StandardMax`'s `MAX` and `StandardMinMax`'s three (`.fsi:185`, `:196`, `:208-210`), at levels `ZZ`, `ZZ64`, `ZZ32`, `NN64` and `NN32`. 10 pairs.

With the identification assumed, 6 pairs are left: `TIMES` at `ZZ32`, and `QQ`'s `MIN`, `MAX` and `MINMAX` at the five integer levels. `Number`'s pass then, because `QQ`'s cover them, and `QQ`'s are refused in their turn. The chain's levels are the ones the tower declares: every `Integral` level, and `NN32`, which is a `StandardTotalOrder` but not an `Integral` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:82`).

**The seven, derived from those refusals.** The note named them: `ZZ64`'s `TIMES`, and `QQ`'s and `Number`'s `MIN`, `MAX`, `MINMAX`. The refusals confirm them and name the levels each misses. `TIMES` misses `ZZ32`. The other six miss `ZZ`, `ZZ64`, `ZZ32`, `NN64` and `NN32`. The completion is seven declarations (`lib-seven.diff`):
- `opr TIMES(self,b:ZZ32):ZZ32` in `ZZ32`'s api; the component already has its body (`Library/FortressLibrary.fss:666`).
- `opr MIN(self,b:I):I`, `opr MAX(self,b:I):I`, `opr MINMAX(self,b:I):(I,I)` in `Integral`, with bodies in `StandardTotalOrder`'s own idiom (`.fss:279-282`). One generic declaration covers every `Integral` level.
- The same three on `NN32` in `FortressBuiltin`, the one level below `Number` that is not an `Integral`.

The other fourteen `ZZ64` refusals (`DOT`, `juxtaposition`, `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, the four bit operators and the two shifts) need no new declaration: `ZZ32` declares every one. (The checker prints `TIMES` as `BY`: `deep-count.txt`'s `BY` rows are `ZZ64`'s `TIMES` at `.fsi:519` beside `Integral`'s at `:419`.) They are refused only because covering needs the identification of `Integral[\ZZ32\]` with `ZZ32`, which only `comprises I` licenses. With `-Dprobe.identify=true` they pass, and the count falls from 228 to 209.

**`comprises T` overflows the checker.** With the eight clauses the api's overloading check dies with `StackOverflowError` (`deep-count.txt`, the `comprises` rows). It dies the same way with the rule dropped (`-Dprobe.zero.dropP=true`), so the forest shadow is not the cause. The recursion is `Formula.tImplies` and `primImp` calling each other, about 15K times each, under an exclusion question (`TypeAnalyzer.excludes`) at the top (`overflow-stack.txt`). The two functions are the tracked `scala_src/typechecker/Formula.scala:185-205`; the zero stack's copy differs there only in `And`'s arity. Whether the tracked checker overflows too cannot be measured on the library without that stack, since the gate's instrument stops before the overloading check. This is a different place from Steele's commented-out comprises rule of 2012 (`TypeAnalyzer.scala:268-271`, "Gets a stack overflow error"). It is the same symptom.

### 2c. The compiler tests

`scope/scope-run.sh`'s list and method: the 43 compiler tests that declare a generic overload, linked and run under stock, C-full and C-lite, each against its mode's own compiler prelude (`compiler-tests.txt`).
- Output: all 43 the same under C-full, and the same under C-lite.
- Classes: of the 35 that make a jar, 28 are byte-identical under C-full and 7 differ, and 7 under C-lite. The three the scope note found under `callsite` (`Compiled12.invariantInference`, `invariantInference2`, `Compiled180`) are among them.
- The prelude: `CompilerBuiltin` differs in 16 classes and `CompilerLibrary` in 6 (5 under C-lite); the rest are identical (`compiler-tests.txt`, first lines). Two stock compiles are identical, and the shadow with every switch off compiles a byte-identical prelude. `-Dprobe.forest=fbound` alone gives 22 differing classes, so the forest rule causes them (`prelude-compare.txt`).
- Of those 22, 11 differ only in the order of their instructions (10 under C-full). The ones looked at are dispatchers testing mutually exclusive arms in another order: `ReductionString` before `ReductionZZ32`, `FZZ32` before `FNN64`. In the others the tests themselves differ: `CompilerBuiltin$LessThan` tests `instanceof Comparison` where the stock class calls an arrow type's `isA`. Why the forest changes the compiler prelude, whose tower is flat, was not traced. The gate was not run.

### 2d. The size

From the patches (`size.txt`): C-full is 5 files, +241 −3 lines, 188 code lines. By piece:
- the forest in `checkP` and `forestSelfTyped`: 30, the forest shadow's own;
- the covariant reading: 3;
- the return type rule: 109 (`forestChain` 11 and its memo 2, `TraitTable` 7, `OverloadingOracle` 51, `OverloadingChecker` 38);
- the call-site fix: 46, scope-shadow.patch's 43 and its 3-line `skip`.

The rule is past the 40-70 estimate and inside the 120 the brief allowed. What made it larger: the levels above, the coverage by a level's own declarations across apis, and the level enumeration, which `TypeAnalyzer` did not have. C-lite is 5 files, 164 code lines; its rule is 88. None of this covers the `AbstractMethodError`, the interpreter, or the overflow.

## 3. C-lite: its definition and what it refuses

**Definition** (`c-lite.patch`, `-Dprobe.rtr=lite`). The forest rule, and in the return type rule a level below the specialisation is refused outright, whatever the return types. A level above is refused when the return type does not fit. So a specialisation of a generic over a self-typed trait may stand only at a **leaf** of the trait's chain: a level with nothing below it that carries the trait at itself.

**Why the leaf.** The patents' dispatch binds a value's parameter at its minimal instance (col. 10 l. 16-17). Only at a leaf is every value that reaches a specialisation at its minimal instance there. At an inner level the specialisation catches values whose callers were promised a lower level, which is the hole; C-full answers that by coverage, and C-lite forbids it. The top of a chain is the worst place for a specialisation, since it catches everything below. So "one level only" can only mean the bottom.

**What it refuses** (`deep-count.txt`, the `markers-clite` list): 28 pairs at 23 declarations.
- C-full's 25 pairs (§ 2b), every level below and none of them fitting;
- `ZZ64`'s `CMP` (`.fsi:513`) beside `StandardPartialOrder`'s and `StandardTotalOrder`'s (`:169`, `:222`), level `ZZ32` below, return type fitting;
- `Number`'s `CMP` (`.fsi:286-288`) beside `StandardPartialOrder`'s, levels `QQ`, `ZZ`, `ZZ64`, `ZZ32`, `NN64`, `NN32` below, return type fitting.

The two `CMP` rows are refused only because they sit above a lower level. Their return type, `TotalComparison` or `Comparison`, fits every level. The leaves keep theirs: `ZZ32`'s, `NN64`'s (for `Integral`'s methods `NN64` is a leaf), and the comparison objects'. Against the per-trait guard's 69 pairs (`routeC-library.txt`, by declaring trait: `ZZ64` 17, `NN64` 15, `ZZ32` 15, `Number` 6, `QQ` 5, the comparisons 11), C-lite's 28 are the `ZZ64`, `Number` and `QQ` rows.

**Does C-lite refuse the tower?** Its inner half. `ZZ64` loses its specialised integer operators and its `CMP`, and `Number` and `QQ` lose their `MIN`, `MAX`, `MINMAX` and `CMP`. The leaves keep theirs. The repair would be to delete those declarations and let the generic bodies of `Integral` and `StandardTotalOrder` run at `ZZ64`, `QQ` and `Number`: a speed cost at `ZZ64` and a change of meaning at `Number` and `QQ`, whose `MIN` is documented as NaN-aware (`FortressLibrary.fsi:286-287`). Symbolic operators escape the check here as everywhere (`OverloadingChecker.scala:546-550`). Were they checked, `ZZ64`'s `=`, `<`, `+`, `-` and the rest would be refused the same way. So C-lite's true count is larger than 28.

## 4. The reversal cost on record

On record (`POSITIONS.md`, 2026-09-24): switching from A to C later costs one library rung in reverse; C's checker half is additive; C can be probed as a shadow. From what was built:
- **Probeable as a shadow: confirmed**, with a caveat about the instrument. This is that shadow. But the gate's checker count cannot see the rule, since the library's api never reaches its overloading check there. A C probe needs the deep stack or a library clean enough to reach it.
- **The checker half is additive: confirmed for the checker.** On route A's flat library (`keep/make-flat-lib.py`'s `FLAT`) the C-full shadow gives the stock checker's 22 errors, the same list (`flat-count.txt`). The 43 tests print the same. With its switches off the shadow compiles a byte-identical prelude (`prelude-compare.txt`).
- **Corrected: C is not a checker half plus a library rung.** It also needs code-generator work: the call-site fix, 46 lines and measured, and a method for every level of a chain, not sized (`AbstractMethodError`, § 2a). It needs interpreter work: accepting the specialised pairs, and not overflowing on `comprises T`. Its literal spelling, `comprises T`, overflows today's checker (§ 2b). None of that is reversed out of A; each is new work whenever C is taken.
- **Qualified: the library rung is not A's rung run backwards.** Un-flattening restores the nesting, and on top of it C needs the seven declarations and the identification, as `comprises T` on eight traits or as a hierarchy check of its own. Anything written against the flat tower in the meantime stays to be undone: coercions in programs, methods restated on the leaves.

## 5. Not settled

- **The identification.** Covering a lower level needs `Integral[\ZZ32\]` read as `ZZ32`. The patents license that through `comprises T`, which overflows the checker. The alternatives are to fix the overflow (unsized), to enforce "whatever extends S[L] is an L" with a hierarchy check instead (not built), or to accept the F-bound (unsound, `Odd` above).
- **The `AbstractMethodError`.** Where the code generator should add the method each level needs, and how much that is.
- **Which level a checked call takes.** The checker takes the top and the interpreter the bottom; one of them has to move for the two paths to agree.
- **The prelude's changed tests** (§ 2c), and whether the gate stays green. The gate was not run.
- **Symbolic operators**, which neither rule sees.
- **Generic levels.** The level enumeration takes non-generic traits and objects only. No generic level of a self-typed chain exists in the library today.
- **The run script** ran in four invocations, not end to end in one: sections 0-4 and 6, then 5, 7 and 8. Section 5 ran on a revision of `c-full.patch` without the `-Dprobe.identify` switch; with the switch off the code is the same.

## Reproduce

    explorations/reviews/mie-probes/route-c/route-c-run.sh <work-dir outside the repository>
    # SECTIONS="0 1 2" for the probes only (about 15 minutes); the whole run is about two hours
