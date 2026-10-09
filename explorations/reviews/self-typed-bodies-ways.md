<!-- The self-typed bodies, the 30 sites of the distance in classes S1 and R4: every way the language and the library offer to make them check without changing what walk computes, the library's own first, with the nine steps in short, for the Fable judge and then Pavol; written 2026-10-09 by an Opus ways worker, reading only, nothing measured (the brief), no recommendation but a marked reading. Base: main at 0bf0c0a4c (the library is unchanged since batch 12's landing, 32b88cd3b, so the per-site list's lines are the source's lines). Cited and not re-gathered: CLIMB-BATCH-11.md and CLIMB-BATCH-12.md Q5; CLIMB-BATCH-8.md Q2 and its answer; reviews/anyintegral-comprises-judgement.md sections 2 to 4 and reviews/anyintegral-comprises-ways.md way 3; PLAN.md batch 8's line; FACTS "The tower closure of `02d09a39f` has no spelling the compiler's checker accepts", "Route C built whole as a shadow", "The exclusion fork, priced three ways and dated", "The distance to the switch-over by root cause"; POSITIONS "The exclusion rule stays and the tower is flat (route A).", "The library's own practice is the standard.", "`AnyIntegral`'s closure and how the checker reads `comprises`.", "No re-measuring what the record holds."; ledger rows 407, 421, 426, 351; reviews/mie-probes/literature.md and patents-forest-rule.md; compile-ladder/rung-spec-comprises/decision-record.md. Opened at the line: Library/FortressLibrary.fss and .fsi, Library/CompilerAlgebra.fsi, CompilerLibrary/FortressLibrary.fsi, the parser's .rats files, SelfParamDisambiguator.scala, TypeAnalyzer.scala, SelfTypeBoundsInserter.java, TypeHierarchyChecker.scala, walk's FTypeGeneric.java, FType.java and BuildEnvironments.java, Specification/basic/expressions/var-ref.tex, trait-parameters.tex, traits.tex, typecase.tex, Documentation/Specification/Prose/Language/types.tick, Papers/Types/journal/justificationOfRTR.tex, Papers/Welterweight (fig-grammar, fig-wellformeddecls, dispatch), research/extracts/ParkPOPL2019-extract.md, and the team's tests that spell `Self`. Run: only explorations/coordinator/tools/distance/classify.py -d over the committed per-site list, to label its rows; no build, no checker, no walk. -->

# The self-typed bodies: every way, with the nine steps in short

## For the judge

- **The question.** In a self-typed trait, `trait Integral[\I extends Integral[\I\]\]`, the compiled checker types `self` as `Integral[\I\]`, not as `I`. A body that returns `self` where `I` is declared, or passes `self` where an `I` is expected, is refused. Walk runs every one of them. Which ways make them check without changing what walk computes?
- **The count.** 30 of the 153 errors of the last landed distance (`compile-ladder/climb-batch-12/gate/distance.txt`: S1 29, R4 1). Only 8 are `Integral`'s; 18 are the orders' and `AdditiveGroup`'s, 4 are `StandardMutableArrayType`'s (the same split as `CLIMB-BATCH-12.md` Q5).
- **By shape** (section 1): **A**, `self` passed where the parameter is expected, 11 errors at 11 lines plus 5 cascades of the same calls, 16; **B**, `self` returned where the parameter is declared, 13; **C**, `self` converted to `ZZ`, 1.
- **The ways** (section 2), the library's own first. "Clears" is by reading: nothing was run.

| Way | What changes | Clears, by reading | Walk's values | First risk |
|---|---|---|---|---|
| 1. `self` in the self position (`self + self.zero`), the `x.zero` device | library, 8 lines | 8 (`Integral` 7, `AdditiveGroup` 1) | same; one more `+` per call | not the library's practice for retyping `self`; reaches no order |
| 2. `cast[\I\](self)`, the team's `cast` | library, 21 lines | 29 (all but `:685`) | same; one typecase per default body | walk's binding of a trait's parameter inside a functional method; a run-time check where a static one was meant |
| 3. An abstract getter answering the parameter, at each leaf (the shape of `zero` and `one`; Java's `getThis`) | library api, every extender | 29, and `:685` with a getter at `ZZ` | same for the library's types | every program type that extends an order must define it: the team's tests `parametricManiaCompr` and `parametricListCompr` would not load |
| 4. Per-type bodies, the defaults removed (route A's "each carrying its own algebra") | library | all 30 if every default goes | same for the library's types | the orders' "minimal complete definition" is lost: the same two team tests |
| 5. The self-type idiom, `comprises I` / `comprises T` | library, walk (row 407's edit), specification | (a) `Integral` alone: 7; (b) seven traits: 29 | same by reading, if walk's exclusion verdicts do not move | (b) overflowed the checker on the nested tower; the record reads route A as admitting no self type |
| 6. A checker rule: `self` is `C[\X\] & X` in a trait whose parameter is bounded by the trait at itself, with a check at each extender (Scala's self types, Rust's `Self`) | checker, specification | 29 | unchanged (walk has no static types) | a rule of ours; the team's definition of "self-typed" is the clause, not the bound |
| 7. Bodies as top-level generic functions with the self type as a bound (Naden's rewrite) | library | `Integral` 7, `AdditiveGroup` 1, the orders only with their api redrawn | can change dispatch | overloading a top-level generic beside per-type functional methods |
| 8. Weaken a declared type to the trait type (the team's `SelfTypeTest` comment) | library api | the body sites | can change dispatch | moves the errors to the callers |
| 9. Leave them (the default on record) | nothing | none | same | they block the switch-over |

- `:685`, shape C, is a different question: a generic value converted into `ZZ`. Ways 2, 5 and 6 do not reach it, for the reason the record gives for class I3 in reverse: no declaration states a coercion from an arbitrary `I` (FACTS, "The distance to the switch-over by root cause"). It needs a per-type body (way 4), a getter at `ZZ` (way 3), or a typecase over the five integer types (section 2, "Shape C").
- **No measurement is on file for any way on the flat library.** Each way below names the one that would settle it.

## 1. The sites, by shape

All in `Library/FortressLibrary.fss`. Read with `classify.py -d` from `explorations/compile-ladder/gate/distance-sites.tsv`, which batch 12's gate committed. The library has not changed since that landing, so the lines are the source's lines.

**Shape A. `self` passed where the parameter type is expected: 11 errors, plus 5 cascades.** The message is "Could not check call to operator … not applicable to an argument of type (T, StandardTotalOrder[\T\])". Where the call is an `if` condition, the checker also reports "Filter expressions in generator clauses must have type Boolean" at the same line. The classifier files that report under the line's class (`classify.py:431-443`), and it goes when the call checks.

| Line | Trait, declaration | Call | Errors | Written |
|---|---|---|---|---|
| `:223` | `StandardPartialOrder`, `CMP` | `elif other < self` | 1 + 1 cascade | team |
| `:228` | `StandardPartialOrder`, `>` | `other < self` | 1 | team |
| `:230` | `StandardPartialOrder`, `<=` | `other >= self` | 1 | team |
| `:282` | `StandardTotalOrder`, `CMP` | `elif other < self` | 1 + 1 | team |
| `:286` | `StandardTotalOrder`, `<=` | `NOT (other < self)` | 1 | team |
| `:287` | `StandardTotalOrder`, `MIN` | `if other < self` | 1 + 1 | team |
| `:288` | `StandardTotalOrder`, `MAX` | `if other < self` | 1 + 1 | team |
| `:290` | `StandardTotalOrder`, `MINMAX` | `if other < self` | 1 + 1 | team |
| `:357` | `AdditiveGroup`, getter `zero` | `self - self` | 1 | team |
| `:360` | `AdditiveGroup`, unary `-` | `self.zero - self` | 1 | team |
| `:710` | `Integral`, `DIVIDES` | `(b MOD self)` | 1 | team |

**Shape B. `self` returned where the parameter is declared: 13.** The message is "Function body has type Integral[\I\], but declared return type is I."

| Line | Trait, declaration | Body | Errors | Written |
|---|---|---|---|---|
| `:287`, `:288` | `StandardTotalOrder`, `MIN`, `MAX` | `… else self`, `then self …` | 2 | team |
| `:290` | `StandardTotalOrder`, `MINMAX` | `(other, self)` or `(self, other)`, declared `(T,T)`; class R4 | 1 | team |
| `:688-690` | `Integral`, `floor`, `ceiling`, `truncate` | `= self` | 3 | revival, `d846e3644` (Integral left `QQ`, which had carried them) |
| `:719-721` | `Integral`, `\|\self/\|`, `\|/self\\|`, `round` | `= self` | 3 | team |
| `:2175`, `:2179` | `StandardMutableArrayType`, `assign` (two) | `…; self` | 2 | team |
| `:2183`, `:2187` | `StandardMutableArrayType`, `tabulate`, `fill` | `…; self` | 2 | revival, `f3b62bc83`; the team's `fill` bodies had the same shape in `StandardImmutableArrayType` (`a874948ac:Library/FortressLibrary.fss:1974-1981`) |

**Shape C. `self` converted to a concrete type: 1.** `:685`, `Integral`'s `numerator(self):ZZ = do z: ZZ = self; z end`: "Right-hand side has type Integral[\I\], but declared type is ZZ." Written by the revival, `d846e3644`. Walk converts at run time by `ZZ`'s coercions (`:985-992`).

"Team" means present at the import of 2012-07-19, `5a68404fd`. The author before that is not recorded, since the conversion cut the history (`git blame`).

**By trait:** the orders 16 (`StandardPartialOrder` 4, `StandardTotalOrder` 12), `AdditiveGroup` 2, `Integral` 8, `StandardMutableArrayType` 4.

**What checks today, for contrast.** Every self-typed body with `self` only in the self position of a method answering the parameter checks:

- `opr -(self, other: T): T = self + (-other)` (`:359`);
- `opr juxtaposition(self, other:T): T = self TIMES other` (`:372`);
- `StandardMinMax`'s `MIN` through `self MINMAX other` (`:268`);
- `even(self) = (self MOD (self.one + self.one)) = self.zero` (`:694`).

The 30 are the bodies that swap the operands, return `self`, or convert it.

## 2. The ways

Each way gives four things. **Changes**: library, checker, walk, specification. **Clears**: which of the 30, by reading. **Risks.** **One measurement**: the measurement that would settle it. Unless stated, a measurement is on a shadow of the base. The distance stage there takes about 22 minutes, 739 s of it `FortressLibrary`'s (`climb-batch-12/gate/distance.txt:35`). "Walk's suites" means the interpreter tests and both microGPT walk checks.

### Way 1. `self` in the self position: the `x.zero` device (the library's own, stretched)

- **What.** Rewrite each body so that `self` occurs only as the self argument of a method that answers the parameter. `self + self.zero` has type `I` in `Integral` and `T` in `AdditiveGroup`: `+` takes `(self, b:I):I` (`:697`), and `self.zero` is an `I` (`:681`, `:357`).
  - `floor(self):I = self + self.zero`, the same for `ceiling`, `truncate`, `|\self/|`, `|/self\|` and `round`.
  - `DIVIDES`: `(b MOD (self + self.zero))`.
  - Unary `-`: `self.zero - (self + self.zero)`.
- **The library's practice.** The library's device for "a value of the parameter type with no element in hand" is `x.zero` and `x.one`. `DIVIDES` writes `self.zero` (`:710`) and `even` writes `self.one` (`:694`); the FACTS distance entry calls it the library's own device. No library body uses it to retype `self` itself. That use is a stretch of the device, not a copy of it.
- **Changes.** Library only, 8 lines.
- **Clears.** 8: `Integral`'s `:688-690`, `:710`, `:719-721`, and `AdditiveGroup`'s `:360`.
- **Does not clear.**
  - `:357`. `zero` cannot use itself. `self + (-self)` types, but it loops for a type that defines `+` and binary `-` only: unary `-` defaults to `self.zero - self`, which calls `zero` again. The trait's comment allows exactly that minimal definition (`:355`, "Must define + and either unary or binary -").
  - The orders. They have no method answering `T` that takes `self` alone.
  - `StandardMutableArrayType`. Its only method answering `T` without a `T` argument is `copy()`, which returns a different array, and the callers rely on getting the same array back.
  - `:685`.
- **Walk.** Values the same: `x + 0 = x` for every integer type and cannot overflow. Each call does one more `+` and one more getter.
- **Risks.** Reads as a trick. A program's own `Integral` whose `+` is not the identity at `zero` would change; the closed `AnyIntegral` forbids such a type, but the checker does not catch it (POSITIONS, "`AnyIntegral`'s closure …", the hole's ledger row).
- **One measurement.** Walk's suites on the shadow, values by construction. The distance falls by 8 by reading.

### Way 2. `cast[\I\](self)`: the team's `cast`, or its inline typecase

- **What.**
  - `floor(self):I = cast[\I\](self)`.
  - The orders: `other < cast[\T\](self)`, and the same for `MIN`, `MAX` and `MINMAX` (`(other, cast[\T\](self))`).
  - `AdditiveGroup`: `self - cast[\T\](self)` and `self.zero - cast[\T\](self)`.
  - `StandardMutableArrayType`: `…; cast[\T\](self)`.
  - The inline form is a binding and a typecase, `s = self; typecase s of s':I => s' else => throw CastError end`. The parser refuses `typecase self of` itself: "Use a binding such as 'x = self' instead" (`ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:132-139`).
- **The library's practice.** The team's devices of the same kind:
  - `cast[\T extends Any\](x:Any):T = typecase x of x':T => x' else => throw CastError end` (`Library/FortressLibrary.fss:33-37`, `.fsi:24`, present at `5a68404fd`).
  - A typecase on a trait's own parameter inside a functional method of that trait, `Contains[\T\]`'s `MATCH` (`:1093-1098`, present at `5a68404fd`).
  - The witness typecase over `__thrower[\T\]` (`array1`, `:2441-2446`, team; `additiveIdentity` and `multiplicativeIdentity`, `:3223-3255`, revival). It answers "which type is `T`", not "this element as a `T`". On its own it clears no site; it serves only shape C (below).
- **Changes.** Library only, 21 lines (every site line but `:685`).
- **Clears.** 29 by reading. Each call `cast[\I\](self)` has its static argument written, so it answers `I`; its argument `self` fits `Any`. The 5 cascades go with their calls, and R4's tuple becomes `(T, T)`. Not `:685`: `cast[\I\]` still gives an `I`, which has no coercion into `ZZ`, and `cast[\ZZ\](self)` would throw on a `ZZ32` where walk now converts.
- **Walk.**
  - Values the same if walk binds the trait's parameter where the body runs. In a dotted method (`StandardMutableArrayType`'s four) it does: each instantiation's environment binds the parameters (`interpreter/evaluator/types/FTypeGeneric.java:204-205`).
  - The orders' and `Integral`'s bodies are functional methods. These are set up from the generic's own environment (`FTypeGeneric.java:225`, `initializeFunctionalMethods(gen.env)`), so the parameter is bound by walk's inference at the call.
  - Under walk a parameter whose bound names itself, left unfixed, stays open and every value passes it (the `fortress-repo` skill, "Static parameters"). Here that is harmless, since `self` is always such a value.
  - Each default body pays one typecase per call. For the orders that falls on `String`, `Char`, `Boolean`, `Reflect.Type`, `CaseInsensitiveString` and programs' own orders. All five integer types declare their own orders (`ZZ32` at `:734-750`; `NN32` in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:403-411`) and never reach the defaults.
- **Compiled path, at the switch-over.** `cast` at a generic function's parameter works since row 426's fix (`compiler_tests/CastBindRungG.fss`). `cast` at a trait's parameter inside a trait's default body is unmeasured.
- **Risks.**
  - A checked fact becomes a run-time check. A program's own `object Bad extends Integral[\ZZ32\]` would throw `CastError` in `floor(Bad)` instead of passing silently, a gain.
  - It states nothing about the types. The checker learns nothing it could use elsewhere.
  - Pavol may read it as a workaround (POSITIONS, "The library's own practice is the standard.": "No fix is designed … from a user-side workaround"). It is library code, though, and it uses the team's own device.
- **One measurement.** Walk's suites on the shadow with the 21 casts, which run `String`'s and `Char`'s orders and the integers' brackets. The deciding unknown is walk's binding of the parameter inside a functional method's body. The distance falls by 29 by reading.

### Way 3. An abstract getter that answers the parameter, implemented at each leaf

- **What.** For example `getter asSelf(): I` declared in the trait. Each leaf implements it as `self`, where `self` has the concrete type: `ZZ32`'s is `getter asSelf(): ZZ32 = self`. Each body writes `self.asSelf`.
- **The library's practice.** Its shape is that of `Integral`'s abstract `zero` and `one`, each implemented per type (`:681-682`, `:728`). It also resembles a leaf getter that returns `self`, as `FlatString`'s `getter asFlatString(): String = self` (`Library/FlatString.fss:39`). It is Java's "getThis" trick (Angelika Langer, *Java Generics FAQ*, "What is the "getThis" trick?", FAQ206, http://www.angelikalanger.com/GenericsFAQ/FAQSections/ProgrammingIdioms.html).
- **Changes.** The library's api: one getter per family, and one line in every extender.
  - The orders: `RR64`, `RR32`, `QQ`, `Comparison`, `TotalComparison`, `Range`, `String`, `Char`, `Boolean`, `Reflect.Type`, `CaseInsensitiveString`, the five integer types, and every program type.
  - `AdditiveGroup`: the numbers, `Vector`, `Matrix`.
  - `StandardMutableArrayType`: the traits `Array1`, `Array2`, `Array3`, where `self` is the trait's own instance.
  - One getter on a root of the orders (`Equality[\T\]`) can serve them all; `AdditiveGroup` is not under it.
- **Clears.** 29. With a second per-type getter at `ZZ`, such as `big(self): ZZ` declared on `Integral`, also `:685`. Today `big` is declared only on `ZZ32` and `ZZ64` (`.fsi:580`, `:636`).
- **Walk.** Values the same for the library's types.
- **Risks.**
  - An abstract member breaks every program type that relies on the orders' defaults. Two team tests define only `=` and `<` on their own order (`ProjectFortress/tests/parametricManiaCompr.fss:20-23`, `parametricListCompr.fss:18`); they would stop loading.
  - Giving the getter a default body needs way 2's `cast`, which makes way 3 an optimisation of way 2.
- **One measurement.** Walk's suites on the shadow; the two tests above decide by reading if no default is given.

### Way 4. Per-type bodies, the trait's defaults removed

- **What.** Make the 22 default bodies abstract, and write each in the leaves, where `self` is the concrete type:
  - `ZZ32`: `floor(self): ZZ32 = self`, …, `numerator(self): ZZ = do z: ZZ = self; z end` (`ZZ` already has `numerator`, `:996`);
  - `Array1`: `fill(v:T): Array1[\T,b0,s0\] = do …; self end`.
- **The library's practice.** This is route A's shape: "the fixed widths, `ZZ`, `QQ` and `RR64` siblings under `Number`, each carrying its own algebra" (POSITIONS, "The exclusion rule stays and the tower is flat (route A)."). `ZZ32` already declares its own `CMP`, `MIN`, `MAX`, `MINMAX`, `<=` and `>=` (`:734-750`). The revival gave `ImmutableArray1` its own `fill` and `tabulate` at the concrete type (`:2276-2283`, `f3b62bc83`).
- **Changes.** Library only.
  - `Integral`: 5 types × 8 bodies, less `ZZ`'s `numerator`; `NN32`'s go in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` (`:385`).
  - `StandardMutableArrayType`: `Array1`, `Array2`, `Array3`, × 4.
  - The orders and `AdditiveGroup`: every extender listed in way 3.
- **Clears.** All 30, `:685` included, if every default goes. The two closed families can go alone:
  - `Integral`, 8: `AnyIntegral` lists the five (`.fsi:433`), so no legitimate program type extends `Integral`.
  - `StandardMutableArrayType`, 4: its only extenders are the library's three array traits (`.fsi:1579`, `:1681`, `:1796`).
- **Walk.** Values the same for the library's types, the bodies being copies.
- **Risks.**
  - For the orders and `AdditiveGroup`, the documented minimal complete definitions go: "CMP or { <, = }" (`:217-218`), "either CMP or <" (`:274`), "Must define + and either unary or binary -" (`:355`). The two team tests of way 3 stop loading.
  - Each new per-type declaration is a new overload walk checks at load (the `fortress-repo` skill, "Designing a change").
  - The cost in lines is the largest of the library ways.
- **One measurement.** For the two closed families: walk's suites and the distance on a shadow with the closed families' per-type bodies (39 for `Integral`, 12 for the arrays) and their 12 defaults removed. By reading the distance falls by 12; walk should not move.

### Way 5. The self-type idiom: `comprises I` on `Integral`, `comprises T` on the other self-typed traits

- **What.** `trait Integral[\I extends Integral[\I\]\] extends { … } comprises I`, and the same on the other traits. The checker already gives `self` the type `Integral[\I\] & I` when a trait has such a clause:
  - `SelfParamDisambiguator.scala:63-75` builds a self type from the clause;
  - `TypeAnalyzer.removeSelf` (`scala_src/types/TypeAnalyzer.scala:488-501`) makes it the intersection;
  - `SelfTypeBoundsInserter.java` adds the trait as a bound of a parameter named in its own clause.
- **The team's practice.** It is the team's compiled-world idiom:
  - the compiler library's `Equality[\T\] comprises T` and `StandardTotalOrder[\T\] … comprises T` (`Library/CompilerAlgebra.fsi:16`, `:24`);
  - the team's tests `trait Equality[\Self\] comprises Self` (`ProjectFortress/not_working_library_tests/EqualityBug2.fss:15` and twelve more files there);
  - Steele's 2011 `StandardTotalOrder[\Self\] … comprises Self`, whose `MINMAX` body is the library's `:290` word for word (`not_working_library_tests/MatchErrorBug1.fss:31-37`, `82f5e2536`, filed as a checker `scala.MatchError`).
  - The judgement's way 3 is its one-trait form (`reviews/anyintegral-comprises-judgement.md` section 2; PLAN, batch 8's line).
- **Two forms.**
  - **(a) `Integral` alone.** It clears `Integral`'s 7, all but `:685`: `Integral[\I\] & I` still has no coercion into `ZZ`. The count stage finishes under it, 87, with one message printing the self type `(Integral[\I\] & {I})` (`reviews/anyintegral-comprises-ways.md`, way 3). The distance under it was never measured (the judgement, section 4).
  - **(b) Every trait with a site, and those the hierarchy rule then requires.** A trait extending a closed trait at its parameter must be below the listed type, or carry a clause of its own (`Specification/basic/traits.tex:241-248`). So `StandardPartialOrder`, `StandardTotalOrder`, `LexicographicOrder`, `AdditiveGroup`, `MultiplicativeRing`, `Integral` and `StandardMutableArrayType` all carry it, seven traits. The library's other extenders are each at themselves (`String`, `Range[\I\]`, `Vector`, `Array1`, …). This form clears 29.
- **Changes.**
  - Library: one line per trait.
  - Walk: walk overflows its stack at load on any `comprises T` (row 407: `FType.excludesOther`, the loop over comprised types at `interpreter/evaluator/types/FType.java:280-294`). The 6-line edit in `BuildEnvironments.finishTrait` (the ways note's `shadow-walk407.py`) stops it. With the edit C4's check loaded and 38 check lines were identical, for `Integral` alone; walk's suites were not run.
  - Checker: none.
  - Specification: a callout. A listed trait reference "is a declared trait identifier" (`traits.tex:163-165`), and the rung that revised the clause left a bare type variable open on purpose (`compile-ladder/rung-spec-comprises/decision-record.md:19`, `:48`).
- **Risks.**
  - Form (b) is route C's device. Over the eight self-typed traits of the nested tower it overflowed the checker in `Formula.tImplies`/`primImp` (FACTS, "Route C built whole as a shadow"). The flat library is unmeasured.
  - The clause also identifies `Integral[\ZZ32\]` with `ZZ32` for exclusion, in the checker and in walk. Overloading verdicts elsewhere on the distance, and walk's load verdicts, can move.
  - The record reads route A as admitting no self type: the judgement's reason 4 and `CLIMB-BATCH-8.md:113`, "no self type enters the library". POSITIONS' own words for route A name the exclusion rule and the flat tower, not self types. Whether `comprises T` without the forest rule is route C is Pavol's to say.
- **One measurement.** The distance stage on a shadow with form (b). It tells whether the checker finishes on the flat library, how many of the 29 go, and what else moves. Walk's suites with row 407's edit come second.

### Way 6. A checker rule: the self type read from the F-bound, checked at each extender

- **What.** In a trait `C[\X extends C[\X\]\]`, type `self` as `C[\X\] & X`, as the idiom does, without a clause. For soundness, add one check: a trait or object that extends `C[\A\]` must be a subtype of `A`, or a trait read the same way at `A`. This is Scala's self type with its conformance rule, and Rust's `Self`. One opt-in variant reads only parameters named `Self`:
  - the parser already reserves `Self` as a keyword and accepts it as a static parameter and a type (`Keyword.rats:130`, `Type.rats:193-204`, `NoNewlineHeader.rats:284`, `:343`);
  - the team named the parameter so in the dead compiler api (`CompilerLibrary/FortressLibrary.fsi:86`, `:180`, `:232`, `:265`; dead per `coordinator/map/modules-and-phases.md:207`) and in its tests;
  - but no code gives `Self` a meaning.
- **Changes.**
  - Checker: the self type at `SelfParamDisambiguator.scala:63-75`, and a new extender check beside the `comprises` checks in `TypeHierarchyChecker.scala`.
  - Specification: a sentence in `var-ref.tex` beside the idiom (`:63-69`), and the extender rule in the traits chapter.
  - Library: none (the opt-in variant renames the parameters).
  - Walk: none. Walk does no static typing, and no clause reaches its exclusion test, so row 407 does not arise.
- **Clears.** 29. By reading, every library extender of these traits passes the check:
  - each extends at itself (the greps of section 3, step 5);
  - `Integral[\I\]` and `LexicographicOrder[\T,E\]` pass through their own reading;
  - `TotalComparison` is below `Comparison`;
  - the team's test traits `A extends StandardTotalOrder[\A\]` pass.
- **Risks.**
  - A rule of the revival's. The team's own test of "self-typed" is the clause: the 2012 patents' "a generic in T also comprises exactly T" (`reviews/mie-probes/patents-forest-rule.md`, the definition). Naden wanted a dedicated construct: "the self-type idiom should be more than simply an idiom and instead a separate construct" (`Papers/Types/journal/justificationOfRTR.tex:626-630`).
  - Whether the intersection self type reaches the checker's exclusion test of an intersection, which stalled once (FACTS distance entry: `normConjunct` → `dExc` → `pExcInner`), is unmeasured.
  - It is one global rule taken from the peers, the kind POSITIONS asks for ("No re-measuring what the record holds.", last sentence).
- **One measurement.** A shadow checker with the rule over the flat library: the distance stage, and the compiler tests (does any team test extend an F-bounded trait at another type?).

### Way 7. The bodies as top-level generic functions, the self type a bound (Naden's rewrite)

- **What.** Move a default body out of its trait, as Naden proposes: "rewrite the overload so that the self-type is a bound rather than the parameter type", `add[\X <: Ring[\X\]\](X,X): X` (`justificationOfRTR.tex:618-627`). For example `floor[\I extends Integral[\I\]\](x: I): I = x`, beside `RR64`'s and `QQ`'s functional `floor`.
- **The library's practice.** The library already writes generic integer code this way: `partition[\I extends Integral[\I\]\](x:I)` (`a874948ac:Library/FortressLibrary.fss:2004`), `additiveIdentity[\T extends AdditiveGroup[\T\]\]`.
- **Changes.** The library's api.
- **Clears.**
  - `Integral`'s 7.
  - `AdditiveGroup`'s `:360`, as a top-level unary `-`.
  - The orders' defaults only if they become top-level operators beside every type's own.
  - Not `StandardMutableArrayType`'s four: its callers write the dotted `a.fill(v)`.
  - Not `:357`, a getter; not `:685`.
- **Walk.** Dispatch moves from inherited functional methods to a top-level generic beside per-type methods.
- **Risks.** The overloading checks and walk's load checks. Row 545 already records that a family mixing a top-level function with functional methods over two closed traits is refused by both paths.
- **One measurement.** The distance stage on a shadow for `Integral`'s 7: the new overloading errors against the 7 cleared.

### Way 8. Weaken a declared type to the trait type

- **What.** Change a declared type to the trait type:
  - a return type, `floor(self): Integral[\I\] = self`, `assign(v:T): StandardMutableArrayType[\T,E,I\]`;
  - or a parameter, `opr <(self, other: StandardPartialOrder[\T\])`.
  - The second is the team's own diagnosis in a 2008 test: "The idiom I was trying to copy from the libraries was in fact incorrectly typed. In muchLessThan, the type of other needs to be APO[\Self\] rather than Self" (`ProjectFortress/not_working_static_tests/SelfTypeTest.fss:15-18`, Nels Beckman, `6297a59c2`, 2008-08-21).
- **Changes.** The library's api.
- **Clears.** The body sites.
- **Risks.**
  - Every caller that needs the parameter type is refused instead: `array1[\T,s0\]().fill(v)` declared `Array1[\T,0,s0\]` (`:2447`), generic integer code over `|\x/|`.
  - A weakened parameter stops `ZZ32`'s `opr <(self, b:ZZ32)` overriding the trait's. The two become an overload pair under the Meet Rule.
- **One measurement.** The distance stage on a shadow: the errors moved to the callers against the 30.

### Way 9. Leave them

- The default on record: "the class waits until there is better information" (`CLIMB-BATCH-8.md` Q2, answered 2026-10-02; Q5 of batches 11 and 12).
- The 30 stay on the distance. They cannot stay past the switch-over, which comes when the checker accepts the interpreter's library (the `fortress-repo` skill, "How a program runs").

### Shape C, `:685`, apart

The ways that reach it:

- (i) way 4's per-type `numerator`, where `z: ZZ = self` converts by `ZZ`'s coercion from the concrete type;
- (ii) `big(self): ZZ` declared on `Integral`, with `NN32`, `NN64` and `ZZ` given one (way 3's shape);
- (iii) a typecase over the five, each arm converting as `exactValue` does for `QQ` (`:395-405`, written by the revival at `d846e3644`).

The one that does not:

- A coercion into `ZZ` from `Integral[\I\]` cannot be declared: a coercion names a concrete source type (`ZZ`'s, `:985-992`).

The others' reach:

- Way 1 cannot reach it.
- Way 2's cast to `ZZ` would throw on a `ZZ32`.
- Ways 5 and 6 leave `self` an `I`.

The one measurement: the distance stage with (i) or (iii), which by reading clears 1 and moves no walk value.

### Refused or empty

- **`typecase self of …`.** Refused by the parser (`DelimitedExpr.rats:132-139`). The specification's draft note of 2007 asks whether to allow it (`Specification/basic/expressions/typecase.tex:17-25`).
- **A second declaration of `<` with `self` second, `opr <(other: T, self)`.** At any instantiation it has the same domain as `opr <(self, other:T)`, so the two are an invalid overload pair. Steele tried it under `comprises Self` in 2011, and the checker crashed (`MatchErrorBug1.fss:34`, `82f5e2536`).
- **A coercion of `self` into its parameter.** A coercion is declared in its target type, and a type variable declares nothing.

## 3. The nine steps, in short

1. **The type theory.**
   - An F-bound, `I extends Integral[\I\]`, constrains the argument. It says nothing of `self`, which inside the trait is only an `Integral[\I\]`. Nothing makes every `Integral[\I\]` an `I`: `object Bad extends Integral[\ZZ32\]` satisfies the bound.
   - A body that treats `self` as an `I` is sound only under a further fact, which a language gets in one of four ways: a declared self type checked at each extender; a built-in `Self`; a closed world that lists `I` as the only member; or a run-time cast.
   - Greenman, Muehlboeck and Tate call these traits "shapes", and say they encode self types for "binary methods … as well as algebraic operations" (`reviews/mie-probes/literature.md:54`).
2. **What each path does today.**
   - The checker refuses the 30 (section 1).
   - Walk runs them: it has no static types.
   - The checker's self-type machinery exists, but only a `comprises` clause triggers it (way 5).
   - Walk overflows on such a clause (row 407). Walk's load check of `comprises` covers the main component only (row 551; `BuildEnvironments.java:1113-1330`).
3. **The specification.**
   - The type of `self` is the enclosing trait's type. With a `comprises` clause it is "T ∩ (U1 ∪ … ∪ Un)" (`Specification/basic/expressions/var-ref.tex:53-69`, "% The new self-type idiom"; in the text by 2009-10-29, `7e6e40458`, Sukyoung Ryu). The meaning of way 5 is therefore already written.
   - A naked type variable may appear anywhere a type can, except in an `extends` clause, a `throws` clause or a wrapped field's type (`basic/trait-parameters.tex:66-73`). A `comprises` clause is not among the exceptions.
   - The traits chapter wants a listed reference to be "a declared trait identifier" (`traits.tex:163-165`), which a type variable is not. Victor Luchangco's note asks what the term covers (`:166-170`), and the revision left a bare variable open (decision record `:19`, `:48`).
   - The later Types chapter lets a clause list "types and generic types determined by the generic type of the declaration" (`types.tick:384-389`). Victor's comment there: "all the types in extends/excludes/comprises clauses must be trait types" (`:245`).
   - The type group's 2012 texts (the type group's late positions, which the curator weighs above the earlier text):
     - Welterweight types `self` as `T[P]` in a trait (`Papers/Welterweight/fig-wellformeddecls.tick:55`). It admits only constructed types in a clause (`fig-grammar.tick:6-8`, `:33-37`), and its self-typed dispatch step is commented out (`dispatch.tick:195-210`).
     - Naden: "The self-type idiom is realized with the comprises clause … the type Ring[X] is identified as X" (`justificationOfRTR.tex:580-582`), and he would have it "a separate construct which cannot be used as a first class type, but instead only in bounds" (`:626-630`).
     - POPL 2019 has no self types (`research/extracts/ParkPOPL2019-extract.md:280`, `:328-329`).
4. **Where it sits in the type system.**
   - The 30 ask one thing: the type of the variable `self` in a trait body.
   - Way 6 changes only that typing rule.
   - Way 5 changes more: through the clause it changes subtyping and exclusion (`Integral[\ZZ32\]` is `ZZ32`), which is why it touches walk and the overloading checks.
   - Way 2 leaves the types as they are and checks at run time. Ways 1, 3, 4, 7 and 8 rewrite the library so that the question does not arise.
5. **What the library does in the same family.**
   - `self` only in the self position (section 1, "What checks today").
   - `x.zero` and `x.one` (`:694`, `:710`).
   - The team's `cast` (`:33-37`), and a typecase on a trait's own parameter inside its functional method (`Contains.MATCH`, `:1093-1098`).
   - The witness typecase (`:2441-2446`).
   - Per-type algebra on the flat tower (`ZZ32`, `:734-750`), and the arrays' per-type `fill` (`:2276-2283`).
   - The compiler library's `comprises T` (`CompilerAlgebra.fsi:16`, `:24`).
   - The extenders that the default bodies serve: `String`, `Char`, `Boolean`, `Reflect.Type`, `CaseInsensitiveString`, `Comparison`, `Range`, `Vector`, `Matrix`, `Array1-3`, and programs' own (`ProjectFortress/tests/parametricManiaCompr.fss:20`, `XXXEmptyGroupSumRungF.fss:6`). The integer types declare their own orders.
6. **What the peers do.** Two families.
   - **A built-in self type.**
     - Rust: "`Self` … In a trait definition, it refers to the type implementing the trait" (*The Rust Reference*, Paths, "`Self`", https://doc.rust-lang.org/reference/paths.html).
     - Swift's protocols have `Self` (not fetched).
     - Haskell's class defaults are typed at the instance, so the Prelude's `max x y` returns `x :: a` (Haskell 2010 Report, chapter 6, the `Ord` class; not fetched).
     - Under any of these the library's bodies check as written.
   - **An F-bound, `this` typed as the trait.**
     - Java uses `(T) this` or the "getThis" trick (FAQ206 above).
     - Scala declares a self type: "Inside the template, the type of `this` is assumed to be S"; "The self type of a class or object must conform to the self types of all classes which are inherited by the template" (*Scala Language Specification 2.13*, §5.1, Templates, https://www.scala-lang.org/files/archive/spec/2.13/05-classes-and-objects.html).
     - C#'s `INumber<TSelf>` declares its operators as static members over `TSelf` (literature note `:56`), which is way 7's shape.
     - Cecil, C#, Swift and Scala flatten the algebra (literature note §6).
   - Way 6 is Scala's rule. Way 5 is the closed-world form only Fortress has. Ways 2 and 3 are Java's.
7. **The history in the commits.**
   - 2008-08-21, Beckman's test diagnoses the swap (`6297a59c2`).
   - 2009-10-22, Ryu implements "the new self-type idiom proposal" (`3a8ad3b67`), and on 2009-10-29 adds the specification's paragraph (`7e6e40458`).
   - 2011-04-28, Allen fixes "insertion of bounds on self type parameters" (`dbc91f830`).
   - 2011-01-31, Steele's `comprises Self` order crashes the checker (`82f5e2536`).
   - 2011-12-06, the compiler library has `Equality[\T\] comprises T` at its first reachable copy (`26718e298`, the ways note section 4).
   - The interpreter's library never carried a clause on these traits. Its bodies were only ever run by walk.
   - 2026: the flattening added `:685` and `:688-690` (`d846e3644`), the arrays' rung added `:2183-2190` (`f3b62bc83`), and batch 8 deferred the class (Q2).
8. **The derivation from his principles.**
   - "The library's own practice is the standard" puts ways 1 to 4 first. Of them, only way 2 reaches all three families without changing the api, and only way 4 reaches `:685` without a new device.
   - Route A, as the record reads it, weighs against way 5 and leaves way 6 open, since way 6 adds no clause and no exclusion. That reading is not POSITIONS' own words, so the question goes to him.
   - The type group's later word (Welterweight, Naden) weighs against a type variable in a clause (way 5), and Naden asks for a dedicated construct, which way 6 is.
   - "One global rule … from type theory and the peers" (POSITIONS, "No re-measuring what the record holds.") fits way 6, or way 5 as the team's own.
9. **The ways.** Section 2.

## My reading (mine, not a decision)

- The 30 are three questions:
  - the two closed families, `Integral` and `StandardMutableArrayType`, 12 sites, whose extenders are all the library's;
  - the open families, the orders and `AdditiveGroup`, 18 sites, whose defaults serve programs' own types under a documented minimal complete definition;
  - `:685`, a conversion, not a self type.
- For the closed families, way 4 (per-type bodies) is the library's own route-A shape and needs no device.
- For the open families, only a self type (way 5 or 6) or a cast (way 2) keeps the api. Way 5 is the team's own idiom with its meaning already in the specification, at the price of walk's row 407 and a route question. Way 6 is the peers' rule at the price of being ours.
- The one measurement that would most narrow the choice is way 5(b)'s distance on the flat library. If the checker finishes, the team's idiom is open. If it overflows, way 6 must show that its intersection self type does not take the same path.

## What the record does not hold

- Any way's distance on the flat library. Any way's run under walk's suites. Way 5(b) on the flat tower.
- Whether walk binds a trait's parameter inside a functional method's body (way 2).
- Whether the code generator compiles `cast` at a trait's parameter inside a default body. This matters at the switch-over.
- Whether way 6's intersection self type reaches the checker's exclusion test of intersections.

## Files, and what was run

- This note only. Nothing was built or run but `python3 explorations/coordinator/tools/distance/classify.py -d explorations/compile-ladder/gate/distance-sites.tsv`, to label the committed list's rows; its output stayed under `tmp/selftyped/`.
- The note's INDEX line is not added: the brief commits only this note.
