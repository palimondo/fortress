<!-- The judgement of PLAN item 43, ledger row 634: the one library's tuple comparisons and `LexicographicOrder`, whose bodies compare values of an unbounded type parameter, 18 of the 153 sites of the distance. Written 2026-10-09 by a top-tier judge on the curator's go, for Pavol (his section is last) and the coordinating session. It weighs the ways of `reviews/tuple-comparisons-ways.md` (commit `946ec63a9`, "the ways note" below) against POSITIONS, the specification, the team's later Types chapter and the library's own devices, and recommends one way with a default. Base: `main` at `f1f3e2694`, whose `Library/`, `ProjectFortress/` and `Specification/` are climb batch 12's landing (`32b88cd3b`; the last landed gate's distance is 153, `compile-ladder/climb-batch-12/gate/distance.txt:2`). Nothing was built, run or measured. Evidence is cited from the ways note and the record, and a source was opened only to check a claim this judgement rests on (section 9). Readings of my own are marked "by reading". -->

# Tuple comparisons and `LexicographicOrder`: the judgement

## In short

- **The question.** The library's `<`, `<=`, `>`, `>=` and `CMP` on pairs and triples, and `LexicographicOrder`'s `CMP`, compare elements whose type parameter has no bound. The compiled checker finds no `CMP` on an unbounded parameter: 18 sites (the ways note, section 1), and 8 more clauses it has not read yet behind the `typecase`s.
- **The recommendation.** Two ways, one for each kind, both arms of the fork PLAN item 43 already names.
  - Tuples, now: the ways note's way 1b. Each element type of a pair or triple is bounded by `StandardPartialOrder` (the library's own device for the tuple comparison it typed, `PCMP`, and for the tuple reductions); `Comparison` gains the lazy `LEXICO` that `TotalComparison` already has and the team's compiler prelude declares; each `typecase` gains an `Unordered` clause. 17 sites clear. No checker, walk or specification edit.
  - Lists, at the `where`-clause line: way 3, conditional extension, `List[\E\]` ordered exactly when `E` is, the team's own unbuilt feature, which PLAN's `where`-clause line already names as "item 43's first way". Its one site stays until then.
- **The cost.** One value walk prints changes: `((1,2),3) < ((1,3),0)` answers `true` today and will be refused, because a tuple is outside every trait by the team's own rule, so no bound admits it. Pairs of floats, integers, strings, characters, booleans and lists keep their values. Neither model program compares a tuple or a list.
- **What it reverses or bends.** Nothing on record. It takes item 43's fork by kind, keeps "The implicit bound of an unbounded type parameter is `Any`" whole, and puts the one changed walk value to Pavol before the work, as "Which decisions taken inside the work reach Pavol" asks.
- **The rung.** A library rung of batch 14, one worker, about 20 header lines, 8 clauses, 3 lines of `LEXICO`, one pin replaced, one test added (section 6).

## 1. The question, in plain words

Terms first.

- A *tuple* is `(a, b)` or `(a, b, c)`. A *type parameter* is the `A` in `opr <[\A,B\](t1:(A,B), t2:(A,B))`. A *bound* is a requirement written on it, `A extends StandardPartialOrder[\A\]`; without one, the parameter's implicit bound is `Any`, the top of the type system (POSITIONS, "The implicit bound of an unbounded type parameter is `Any`").
- *Walk* is the interpreter. It has no static types: a call chooses its declaration from the run-time values. So the body `a1 CMP a2` runs today whatever `A` is, and fails only on a value with no `CMP`.
- The *checker* is the compiled path's static type checker. It checks a generic body once, under its bounds. With `A` bounded by `Any`, no `CMP` applies, so it refuses the 18 calls: "operator CMP ... is not applicable to an argument of type (A, A)" (the ways note, section 1; `compile-ladder/gate/distance-sites.tsv`, the 18 `typecheck` lines of class G1).
- The *distance* is the checker's error count on the one library, 153 at the base; phase 3's "true zero" is that count at zero.
- `StandardPartialOrder[\T\]` is the trait of the types with `<`, `>`, `<=`, `>=` and a `CMP` that may answer `Unordered`; `StandardTotalOrder[\T\]` is below it, with a `CMP` that never does (`Library/FortressLibrary.fsi:172-230`). Integers, `String`, `Char` and `Boolean` are total; `RR64` and `QQ` are partial (`.fsi:293`, `:391`, `:443`, `:2419`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:224-228`).
- *Lexicographic order* compares the first elements, and the second only when the first are equal. It exists on a product exactly when the factors are ordered, and it composes: a pair of pairs is ordered when the inner elements are (the ways note, section 3, step 1).

The root (the ways note, "In short", third point): a tuple type excludes every trait type (`Specification/basic/types-vals-vars.tex:306`; the team's later word, "Every trait type excludes \Void, \Bottom\ and every tuple type", `Documentation/Specification/Prose/Language/types.tick:341`, and `:424`). So no bound on a trait admits a pair as an element of a pair. Whatever bound is chosen, the pair of pairs is lost unless the type system changes or the check moves to run time.

## 2. The ways, weighed

The ways note lists eleven (its section 2). I weigh each against the four positions the brief names, the specification, the later Types chapter and the library's own devices.

**Way 1, bound each element type.** The library's own way for the tuple comparison it typed: Maessen wrote `PCMP` unbounded in 2007 and bounded it per element when he moved it into `RangeInternals` in 2008 (`0948c2b1c`; the ways note, way 1, "The precedent"). The tuple reductions bound each component (`BIG MIN_MIN[\T extends StandardMinMax[\T\], U extends StandardMinMax[\U\]\]`, `.fsi:2011-2027`). The ordered containers bound their element (`Set.fss:25`, `Avl.fss:16`, `QuickSort.fsi:18`, `PrefixMap.fss:37`). At the sites themselves, the type-checker developer's 2008 comment asks for exactly this: "Shouldn't these operators have to extend something? A,B,C?" (`Library/FortressLibrary.fss:4448`; Beckman, `b714f9c9e`). This is "The library's own practice is the standard." at its plainest: the same family, the same kind of declaration, the library author's own later hand. It is also "fast code a JVM can specialise" (POSITIONS, "Conversions never change which declaration runs."): a bounded generic is one template class, instantiated per element type by the class loader, each `CMP` a direct call.

- *1a, total bounds*, loses pairs of floats and rationals (`RR64` and `QQ` are only partial, `.fsi:293`, `:391`): the pin `(1.5, 2) < (2.5, 1)` stops. It also changes the pair `CMP`'s declared type, `Comparison` (`.fsi:2629`), which Maessen fixed to that partial type in 2008 (`98aa8b653`). Not taken.
- *1b, partial bounds*, keeps floats and the declared `Comparison`. Its two extra needs are both in the library's own shape: the lazy `LEXICO` on `Comparison`, which `TotalComparison` and `EqualTo` already declare (`.fss:177`, `:211`) and the team's compiler prelude declares on `Comparison` itself (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:704`, `.fss:1496-1497`, Steele 2011); and an `Unordered` clause in each `typecase`, since under a partial bound the scrutinee's type is `Comparison`, whose `Unordered` case the checker will one day refuse as non-exhaustive ("TODO: A nonexhaustive typecase is an error.", `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:676`). **Taken for tuples.**
- *1c, the same bound on `LexicographicOrder`'s element*, forces `List[\E\]` to bound its `E` (`Library/List.fsi:67`), so lists of tuples, functions and `()` could not be written. That contradicts "The implicit bound of an unbounded type parameter is `Any`" ("the library's generic containers are instantiated at tuples") and stops the pins at `ProjectFortress/tests/ResultBoundsRungB.fss:48-59`. Not taken.

**Way 2, lists' order on bounded top-level operators, `Set`'s shape.** It takes `List` out of `StandardTotalOrder`: a `Set`, `Avl` or `quicksort` over lists is refused, lists of lists lose their order, and `List` must regain an `=` of its own or every list assertion falls to identity (`opr =(a:Any, b:Any) = a SEQV b`, `.fss:96`). A restructuring with losses, for one site. Not taken.

**Way 3, conditional extension.** `List[\E\] extends LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] }`: a list is ordered exactly when its elements are. It is the only way that gives the specification's sentence its meaning, "lexicographic order when used to compare lists whose elements support these same comparison operators" (`Specification/basic/operators/opr-overview.tex:294-295`), and the advanced library's "partial or total depending on whether the ordering of the elements is partial or total" (`Specification/advanced-lib/algebraic-constraints.tex:520-523`). The grammar has it (`concrete-syntax.tex:465`), the team's test parses it (`ProjectFortress/tests/conditionalExtension.fss`), the front matter lists it as unsupported (`Specification/fortress/preamble.tex:95`), and the 2012 wind-down post wished it had been explored (the ways note, way 3). Every typed peer states the list order this way (Haskell's instance context, Rust's conditional impl, Scala's implicit `Ordering`; section 3, step 6). It is a checker, walk and code-generator change, and POSITIONS already gates `where` clauses that bind in an extends clause ("`Maybe`'s empty case"), with PLAN's `where`-clause line naming "item 43's first way" beside rows 433, 636 and 436 (`coordinator/PLAN.md:112`). **Taken for lists, at that line.** One point its rung must carry, by reading: `LexicographicOrder`'s `=` (`.fss:1936-1938`) is the only `=` a list has; under conditional extension a list of pairs would lose it and fall to `SEQV`, and `NumberOrderListDeclarations.fss:48`, which compares lists of pairs by `=`, would fail. So that rung keeps a structural `=` on `List` outside the condition.

**Way 4, conditional members.** A method's `where` clause on its trait's parameter leaves `LexicographicOrder` extending `StandardTotalOrder[\T\]` unconditionally, so a list of functions would claim an order and lack its operation (the ways note, way 4). For tuples it is way 1. Not taken; way 3 covers it.

**Way 5, tuples ordered structurally by a language rule.** It would make a tuple type a subtype of `StandardTotalOrder[\(A,B)\]`, against "Tuple types cannot be extended by trait types" and "A tuple type excludes any non-tuple type other than `Any`" (`types-vals-vars.tex:299`, `:306`) and against the designers' later word (`types.tick:341`, `:424`; FACTS, "The team's latest word on types and on the exclusion rule is the unfinished restart"). A type-system change in every area to keep one pinned value. Not taken.

**Way 6, run-time dispatch through an `Any` fallback.** The library's device for `=` (`.fss:96`) and `distribute(r: Any)` (`.fss:3089-3091`). The precedent is weaker than it looks: `=` on `Any` answers a real value, identity, for every value; a `CMP` on `Any` can only throw, and the team's own word for the `distribute` arm is "a hack to avoid the error of overloaded methods". Against "fast code a JVM can specialise", it dispatches per element at run time over arms with F-bounded parameters. Its private form, 6b, needs the compiled dispatcher to choose among two generic arms of different bounds, the shape on which the compiled run dies today (row 537, "Unable to read serialized data", gated for phase 5). And for lists it either loses lists of floats (a total arm beside `Any`) or answers `Comparison` where `LexicographicOrder` must answer `TotalComparison`. It keeps every pin, which is its only strength. Not taken.

**Way 7, monomorphic comparisons**, is combinatorial and loses every unwritten combination. **Way 8, an explicit comparator**, has no precedent among the library's operators and loses the operators themselves. **Way 9, drop them**, discards the team's 2007 declarations where its 2008 comment asks for bounds. **Way 10, a checker that defers or re-checks per instance**, revises "If there is no such declaration, then the call is undefined, which is a static error" (`Specification/basic/overloading.tex:305-306`) and the checker's modular check, for 18 sites. **Way 11, leave them**, leaves 17 sites that the library's own device clears today. None taken.

The split is by kind because the two kinds differ in what the library can state today. A tuple operator is a top-level function whose own parameters take bounds; the library has written that shape. A list's order is a trait's extends clause, and the condition it needs has no construct yet on either path (FACTS, "The specification's own declaration of `Nothing` compiles on neither path ...").

## 3. The recommendation, and what it changes

**Tuples: way 1b, now.**

- *Library.*
  - The ten order operators on pairs and triples take `[\A extends StandardPartialOrder[\A\], B extends StandardPartialOrder[\B\]\]`, and `C extends StandardPartialOrder[\C\]` on the triples, in the api (`Library/FortressLibrary.fsi:2625-2629`, `:2631-2635`) and the component (`Library/FortressLibrary.fss:4456`, `:4466`, `:4476`, `:4486`, `:4496`, `:4508`, `:4518`, `:4528`, `:4538`, `:4548`). The two `=` operators stay unbounded (`.fsi:2624`, `:2630`; `.fss:4450`, `:4502`): equality is total through `Any`.
  - `Comparison` gains `opr LEXICO(self, other:()->Comparison): Comparison`, in the shape of the strict form beside it: the api line after `.fsi:104`; the default `= Unordered` beside `.fss:138`; on `TotalComparison`, `opr LEXICO(self, other:()->Comparison): Comparison = self` beside `.fss:177` (api beside `.fsi:133`); on `EqualTo`, `= other()` beside `.fss:211` (api beside `.fsi:164`). The precedent lines are the `()->TotalComparison` arms at `.fss:177` and `:211`, and the team's `CompilerBuiltin.fsi:704`. The `TotalComparison` and `EqualTo` arms are needed, by reading: on the compiled path a thunk typed `()->Comparison` does not fit the `()->TotalComparison` arm, so without them `LessThan LEXICO: (b1 CMP b2)` would reach `Comparison`'s default and answer `Unordered`.
  - Each of the eight `typecase`s gains `Unordered => false` (`.fss:4459`, `:4469`, `:4479`, `:4489`, `:4511`, `:4521`, `:4531`, `:4541`). `false` is what `RR64`'s own `<`, `<=`, `>` and `>=` answer for a NaN (`.fss:439-442`, Java's comparison through `asFloat`), so a pair agrees with its elements. The alternative, keeping today's stop (a `MatchFailure`, below), is named for Pavol; `false` is the default.
  - The comment at `.fss:4448` is answered; the rung may drop it.
- *Checker, walk, code generator:* none. The checker resolves an operator through an F-bounded parameter already: `MinReduction[\T extends StandardMin[\T\]\]`'s `a MIN b` (`.fss:3306`) is no site of the distance (by reading of `distance-sites.tsv`).
- *Specification:* none. The text is silent on tuples (`opr-overview.tex:276-295`; row 634's citation cell), and nothing it says is made false. Home 3.
- *Row 634:* a note on the tuple half's commit; the row closes at the `where`-clause rung with the list half.

**Lists: way 3, at the `where`-clause line.** The site `.fss:1932` stays, the 13th of that line's sites (12 today: rows 433, 636 and 436, `PLAN.md:112`). Its rung: `LexicographicOrder[\T extends LexicographicOrder[\T,E\], E extends StandardTotalOrder[\E\]\]` (1c's bound; the team's advanced library bounds the element so, `Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`), `List[\E\] extends { AnyList, LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] } }` (`List.fsi:67`, `List.fss:112`, `PureList.fss:41`), a structural `=` kept on `List`, the checker's hierarchy check and kind environment reading the clause (`TypeHierarchyChecker.scala:127`, `KindEnv.scala:117-127`), walk reading it at dispatch, the code generator's refusal lifted (FACTS, the codegen line), and the specification's section in the S1 form with an Appendix I entry and `preamble.tex:95` changed. A second entry under `StandardPartialOrder` would give lists of floats a partial order, as `algebraic-constraints.tex:520-523` says; its rung decides. Not this judgement's to brief.

## 4. The walk values that change

Pins, each with its before and after. All are the revival's lines (climb batch 10's rung N, `ProjectFortress/tests/NumberOrderListDeclarations.fss`; climb batch 6.5b's rung B, `ResultBoundsRungB.fss`); no team test compares a tuple or a list (the ways note, section 1).

- `NumberOrderListDeclarations.fss:40`, `(1,2) < (1,3)`: `true` before, `true` after. Walk unifies the argument's run-time type and then its supertypes against the bound ("We want to unify with the most specific subtype possible", `interpreter/evaluator/types/FType.java:568-574`), so `Int` meets `StandardPartialOrder[\A\]` through `ZZ32`'s `Integral[\ZZ32\]`.
- `:41`, `((1,2),3) < ((1,3),0)`: `true` before; after, the call is refused: 'Unification error: ... Cannot unify (Int,Int) ... with StandardPartialOrder[\A\]', the record's probe on a bounded copy (`compile-ladder/rung-number-order-slips/REPORT.md` section 5; `FType.java:576-583`, a tuple having no trait supertype to unify with). **The one pinned value that changes.** The pin line goes, and the refusal is pinned by the harness's own form for one: a top-level binding in a test of its own with a `.test` file, `load_exception_contains=Cannot unify` (`tests-writing.md`, "A failure while the top-level variables are initialised counts as a refusal").
- `:42`, `(1,2,3) CMP (1,2,2)`: `GreaterThan` before and after.
- `:43`, `(1.5, 2) < (2.5, 1)`: `true` before and after (`RR64 extends StandardPartialOrder[\RR64\]`, `.fsi:293`).
- `:44`, `<|1,2|> < <|1,3|>`: `true` before and after; `LexicographicOrder` is untouched.
- `:48` and `ResultBoundsRungB.fss:48-59`, lists at tuple, arrow, `()` and object types: unchanged.

Values not pinned, by reading:

- A pair whose first elements are unordered, `(0.0/0.0, 1) < (1.0, 1)`: today `RR64`'s `CMP` answers `Unordered` (`.fss:443-448`) and the `typecase` matches no clause, which throws `MatchFailure` (FACTS, "A typecase with no matching clause throws `MatchFailure`", row 558); after, `false`. The rung measures the before and lists both.
- `(1, 0.0/0.0) CMP (2, 0.0/0.0)`: `LessThan` before and after; the lazy `LEXICO` never evaluates the second comparison.
- A pair of pairs anywhere, and a pair with a function, `()` or an unordered object as an element: a refusal at the outer call, where today the first stops inside at `a1 CMP a2` and the second at the inner dispatch. A stop either way.
- Pairs and triples of integers, strings, characters, booleans, lists and comparisons: unchanged, each element type being a `StandardPartialOrder` (`.fsi:443`, `:2419`, `:100-101`; `FortressBuiltin.fsi:224-228`).

## 5. The sites it clears, and what may surface

- Clears S-a to S-d, 17 of the 18 (the ways note, section 1). Behind them, by reading, nothing surfaces: the eight unread clauses `b1 < b2`, `c1 < c2` and their kin find `<`, `<=`, `>`, `>=` on `StandardPartialOrder[\B\]` (`.fsi:174-179`); the seven `LEXICO:` calls find the new lazy arm on `Comparison`; the pair and triple `CMP` bodies answer `Comparison`, their declared type.
- S-e, `.fss:1932`, stays: 1 site. The distance, by reading, 153 to 136.
- Unmeasured until the rung runs: the overloading stage's answer to the three new `LEXICO` arms (the team's compiler prelude holds the same pair on `Comparison` and `TotalComparison`, `CompilerBuiltin.fsi:703-704`, `:723-724`, which that path's checker accepts), and walk's Meet Rule check of them at load (batch 10's rung W, per providing type).

## 6. How a library rung of batch 14 builds it

The brief names batch 14; PLAN has drafted neither batch 13 nor 14 (`PLAN.md`, batch 13's line), so this is the rung's shape wherever the coordinator drafts it. One worker, library declarations only, in the form of batch 12's rung R (`coordinator/CLIMB-BATCH-12.md`, section 3, R).

**Rows.** Row 634, the tuple half: 17 sites. Row 558's `MatchFailure` is the before of the NaN pair, not a repair.

**Files.**
- `Library/FortressLibrary.fsi`: `:104` (the lazy `LEXICO` on `Comparison`), `:133` and `:164` (its arms on `TotalComparison` and `EqualTo`), `:2626-2635` (the ten headers).
- `Library/FortressLibrary.fss`: `:138`, `:177`, `:211` (the three `LEXICO` bodies), `:4448-4556` (the comment, the ten headers and eight clauses).
- `ProjectFortress/tests/NumberOrderListDeclarations.fss:41` (the pin that goes).
- New: `ProjectFortress/tests/TupleOrderBounds.fss`, and `TupleOrderNestedRefused.fss` with its `.test`, named by topic.
- Not: `LexicographicOrder` (`.fss:1927-1937`, `.fsi:1333-1339`), `List`, `PureList`, the `=` operators on tuples, the checker, walk, the code generator, the specification, the team's tests.

**Tests, first.**
- The count and distance stages are the failing-then-passing test for the 17 sites: 153 before, read by row on the rung's tree after.
- `TupleOrderBounds.fss`, red on the base at its NaN line: asserts the values of `:40`, `:42` and `:43` (unchanged), a pair of strings, a pair of lists, a triple under `<=` and `>=`, `(1, 0.0/0.0) CMP (2, 0.0/0.0)` is `LessThan`, and `(0.0/0.0, 1) < (1.0, 1)` is `false`, each in the harness's own `assert`.
- `TupleOrderNestedRefused.fss`, red on the base (it runs clean today): `nested: Boolean = ((1,2),3) < ((1,3),0)` at top level, its `.test` with `load_exception_contains=Cannot unify`.
- Keep their verdicts: `NumberOrderListDeclarations` (but `:41`), `ResultBoundsRungB`, `RangeKindBodies`, the team's range and list tests.
- After the edit: the interpreter suite once, since walk reads the library.

**Specification.** None (section 3).

**Points to report.**
- The pin at `:41`, its before and after, and the NaN pair's measured before.
- Any site that surfaces behind the 17, by row.
- Walk's answer at load to the three `LEXICO` arms, and the overloading stage's.
- A library caller or a suite test that compares a pair of pairs or a pair with an unordered element, found by the interpreter suite.
- A new api declaration beyond the three `LEXICO` lines, or a team declaration removed.
- A checker or walk edit, or a site whose only repair is one.

**Overlaps.** None with the `where`-clause line, which touches `LexicographicOrder` and `List` only. Batch 13's array rungs touch the arrays section (`.fss:2175-2900`), hundreds of lines away.

## 7. What it reverses or bends

- Nothing of Pavol's. Item 43's fork is "a `where` clause or conditional member the checker reads, or bounds that give up nested tuples and lists of unordered elements"; this takes the second for tuples and the first for lists, giving up nested tuples and not lists of unordered elements.
- "The library's own practice is the standard.": followed, with the precedent lines named (`PCMP`, `BIG MIN_MIN`, the ordered containers, the lazy `LEXICO` on `TotalComparison`).
- "The implicit bound of an unbounded type parameter is `Any`": untouched; the parameters get written bounds, and the containers stay at `Any`.
- "Conversions never change which declaration runs." and its principle, fast code a JVM can specialise: followed; way 6 was the way against it.
- "The suite's verdict is the check.": the changed pin becomes a refusal pinned in the harness's own form; no output is compared.
- A value walk prints changes (`:41`), which rung N left to Pavol ("A repair that changes a value walk prints: left, row 634", `rung-number-order-slips/REPORT.md` section 5). Put to him here, before the work.

## 8. Findings by reading, and what stays open

- The one library's strict `LEXICO` on `Comparison` answers `Unordered` for `LessThan LEXICO Unordered`: the default `= Unordered` at `.fss:138` is the only applicable arm, since `TotalComparison`'s strict arm takes a `TotalComparison` (`.fss:176`). The team's compiler prelude answers `LessThan` ("if self=EqualTo then other else self", `CompilerBuiltin.fss:1494-1495`), as the first-non-equal rule does. Reachable only through `LexicographicPartialReduction` (`.fss:111`) or a direct call; no site, no pin. Not this rung's; a ledger row once measured. The lazy arms of section 3 avoid it by construction, `TotalComparison`'s answering `self`.
- Open until measured: the three points under "Unmeasured" in section 5, and the NaN pair's before.
- Open by design: S-e and the list order, at the `where`-clause line, with the structural `=` noted in section 2.

## 9. The claims checked against their sources

Opened to check a claim this judgement rests on, nothing re-gathered: `Library/FortressLibrary.fss:90-215`, `:436-460`, `:1920-1945`, `:3080-3095`, `:3304-3306`, `:4440-4560`; `Library/FortressLibrary.fsi:95-240`, `:288-296`, `:388-394`, `:440-446`, `:2008-2030`, `:2620-2640`; `Library/List.fsi:50-70`, `List.fss:108-116`, `PureList.fss:38-44`, `Set.fsi:20-30`, `:54-62`, `QuickSort.fsi:14-20`; `Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:110-145`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:695-712`, `.fss:1470-1548`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:222-230`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:650-690`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:555-600`; `ProjectFortress/tests/NumberOrderListDeclarations.fss`, `ResultBoundsRungB.fss:40-65`, `conditionalExtension.fss`; `Specification/basic/types-vals-vars.tex:290-312`, `basic/operators/opr-overview.tex:270-300`, `advanced-lib/algebraic-constraints.tex:490-565`, `basic/overloading.tex:300-310`, `basic/traits.tex:78-90`, `fortress/preamble.tex:90-100`; `Documentation/Specification/Prose/Language/types.tick:330-350`, `:415-430`; `compile-ladder/gate/distance-sites.tsv`; `compile-ladder/climb-batch-12/gate/distance.txt:1-6`; `compile-ladder/rung-number-order-slips/REPORT.md` section 5; `compile-ladder/rung-walk-instance/REPORT.md:55-70`; ledger rows 634, 537, 433, 636, 436, 412; POSITIONS, the four entries the brief names, "`Maybe`'s empty case" and "Which decisions taken inside the work reach Pavol, and how."; FACTS, "Walk chooses between a generic declaration and another ..."; `coordinator/PLAN.md` item 43, the `where`-clause line and batch 13's line; `coordinator/process-engineering/library-extension-rule-archaeology.md` sections 5 to 7; `coordinator/CLIMB-BATCH-12.md` sections 2 (Q5), 3 (R) and 5 (R).

## For Pavol

The question. The library compares pairs and triples element by element, and lists too. Its tuple operators say nothing about what the elements are. So the checker, the compiled path's static type checker, finds no order for them: 18 errors.

What I weighed. A bound is a written requirement on a type parameter, such as "has an order". Bounds are the library's own answer: its author bounded his own range-tuple comparison this way in 2008, and the tuple reductions are bounded too. The other library device, a catch-all over `Any` as `=` has, would decide at run time; it is slower, the team itself called it a hack, and the compiled dispatcher dies on its shape today. Letting a tuple itself count as ordered would contradict the team's rule that tuples are outside every trait. Lists can only be done right by conditional extension, a list ordered only when its elements are, the `where`-clause work already on the plan.

What changes. One value changes under walk, the interpreter: `((1,2),3) < ((1,3),0)` answers `true` today and will be refused. Pairs of floats, integers, strings and lists keep theirs. microGPT compares no tuple or list. 17 of the 18 clear now; the list site waits for `where` clauses. No checker, walk or specification edit. Nothing of yours is reversed or bent.

Recommendation. Bound each element of a pair or triple by a partial order now, in one library rung. Order lists by conditional extension when the `where` clauses come. Default: yes.
