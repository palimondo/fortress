<!-- The top-tier judgement on the self-typed bodies, the 30 sites of the distance in classes S1 and R4 (climb batch 8's Q2, climb batch 12's Q5), written 2026-10-09 by a top-tier judge on the curator's go ("let's bring some big guns to this fight"), reading only, nothing built or run; every number is cited from the record. Read whole: reviews/self-typed-bodies-ways.md (03118ae7b, "the ways note" below); POSITIONS.md; process-engineering/library-extension-rule-archaeology.md sections 5 and 7; reviews/anyintegral-comprises-judgement.md; research/extracts/ParkPOPL2019-extract.md; Documentation/Specification/Prose/Language/types.tick; Papers/Types/journal/justificationOfRTR.tex:568-633; Papers/Welterweight/fig-grammar.tick, fig-wellformeddecls.tick, dispatch.tick:195-210; CLIMB-BATCH-8.md Q2; CLIMB-BATCH-12.md Q5; FACTS "Route C built whole as a shadow", "The exclusion fork, priced three ways and dated", "The distance to the switch-over by root cause", "The tower closure of 02d09a39f has no spelling the compiler's checker accepts"; ledger rows 407, 421, 426, 551; compile-ladder/climb-batch-12/gate/distance.txt and compile-ladder/gate/distance-sites.tsv; compile-ladder/rung-spec-comprises/decision-record.md. Opened at the line: Library/FortressLibrary.fss and .fsi, Library/CompilerAlgebra.fsi and .fss, ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi, Specification/basic/expressions/var-ref.tex, Specification/basic/traits.tex, Specification/basic/trait-parameters.tex, Specification/basic/expressions/typecase.tex, the checker's SelfParamDisambiguator.scala, TypeAnalyzer.scala, OverloadingOracle.scala, TypeHierarchyChecker.scala, SelfTypeBoundsInserter.java, SNodeUtil.scala, ExclusionOracle.scala, CoercionOracle.scala, VarianceChecker.scala, OverloadSet.java and CodeGen.java, walk's FType.java, the team's tests Compiled17ee.fss, Compiled17defgh.test, Compiled10.k.fss, XXX10k.test, AfterTypeChecking.test, Compiled10.l.fss, Compiled10.m.fss, parametricManiaCompr.fss, SelfTypeTest.fss and MatchErrorBug1.fss, and the extenders of the self-typed traits in Library/, LibraryBuiltin/, tests/, library_tests/, demos/ and run-c4/src/ by grep. Base: main at f8dbae5aa; the library is that of batch 12's landing, so the per-site list's lines are the source's lines. -->

# The self-typed bodies: the judgement

## 1. The question, in plain words

Terms first.

- A **self-typed trait** is a generic trait whose type parameter stands for the implementing type itself: `trait Integral[\I extends Integral[\I\]\]` (`Library/FortressLibrary.fss:680`). Each integer type implements it at itself, `trait ZZ32 extends { AnyIntegral, Integral[\ZZ32\] }` (`:724`). The bound `I extends Integral[\I\]` is an **F-bound**: the parameter's bound names the parameter.
- Inside such a trait, the specification types `self` as the trait's own type, `Integral[\I\]` (`Specification/basic/expressions/var-ref.tex:53-54`). Nothing in that rule says that `self` is an `I`.
- A **self type** is a further fact a language may give `self`: that it is also an `I`. Scala declares it (`this: S =>`), Rust builds it in (`Self`), the Fortress team's compiled-world idiom declares it with `comprises I`, and under it the checker types `self` as the intersection `Integral[\I\] & I` (`var-ref.tex:63-69`; `SelfParamDisambiguator.scala:56-75`; `TypeAnalyzer.removeSelf`, `:488-501`).

The error. 30 of the last landed distance's 153 are bodies of self-typed traits that return `self` where `I` is declared, pass `self` where an `I` is expected, or convert `self` into `ZZ` (`compile-ladder/climb-batch-12/gate/distance.txt:21-22`: S1 29, R4 1). The message is "Function body has type Integral[\I\], but declared return type is I." (`compile-ladder/gate/distance-sites.tsv:109-114`). Walk runs every one of them, since it has no static types. The ways note's section 1 lists the sites: by trait, the orders 16, `AdditiveGroup` 2, `Integral` 8, `StandardMutableArrayType` 4; by shape, A (`self` passed, 11 errors plus 5 cascades), B (`self` returned, 13), C (`self` converted into `ZZ`, 1, at `:685`). I take that list as the sites and do not re-gather it.

The question for him: which way makes the 30 check without changing what walk computes.

## 2. What the sources say, in the order his decisions weigh them

1. **The library.** The 29 bodies of shapes A and B are the team's, present at the import of 2012-07-19 (`5a68404fd`), but for the six that the revival wrote in the same shape (`:688-690`, `d846e3644`; `:2183`, `:2187`, `f3b62bc83`; ways note section 1). The team wrote them as the orders' and the algebra's **minimal complete definitions**, the documented set of methods a type must define to get the rest for free: "Minimal complete definition: CMP or { <, = }" (`:217-218`), "either CMP or <" (`:274`), "Must define + and either unary or binary -" (`:355`). Two team tests rely on them (`ProjectFortress/tests/parametricManiaCompr.fss:20-23`, `parametricListCompr.fss:18`). The interpreter's library has no self type anywhere.
2. **The team's compiled world.** The compiler's library spells its orders with the idiom, `trait StandardTotalOrder[\T\] ... comprises T` and `trait Equality[\T\] comprises T` (`Library/CompilerAlgebra.fsi:16`, `:24`), with abstract operators only. Three gated team tests exercise the checker's self type today: `Compiled10.l` and `Compiled10.m` type-check (`AfterTypeChecking.test:33`), and `XXX10k.test` pins the checker's reading of `Compiled10.k` message by message, `self` typed `(T[\U\] & {U})`, `j(self)` with `j(x:U)` accepted and `k(self)` refused (`XXX10k.test:13-29`; `Compiled10.k.fss:14-21`, the team's own statement of the rule). And one breadcrumb: `Compiled17ee.fss` (copyright 2010) is the team's copy of the library's orders into a compiled test, the parameter renamed `Self`, with the same `MIN`, `MAX` and `MINMAX` bodies as `:287-290` and no `comprises Self` (`:167-180`); no `.test` file drives it (`Compiled17defgh.test:10` drives `17d`, `17e`, `17h`, `17i`). Why it was shelved is not recorded. Nels Beckman's 2008 test diagnoses the same shape: "the type of other needs to be APO[\Self\] rather than Self" (`not_working_static_tests/SelfTypeTest.fss:15-18`).
3. **The type group's late positions** (POSITIONS, "The type group's late positions outweigh the early text"). They do not speak with one voice here.
   - Welterweight (2012) types `self` in a trait as the plain trait type `T[P]` (`Papers/Welterweight/fig-wellformeddecls.tick:55`), admits only constructed types in a `comprises` clause (`fig-grammar.tick:6-8`, `:33-37`), and leaves its "Self-typed generics" dispatch step commented out with the placeholder "{\it Explanation of how this works}" (`dispatch.tick:195-210`).
   - Naden (2012-08-31, the latest dated text): "The self-type idiom is realized with the comprises clause ... the type Ring[X] is identified as X" (`justificationOfRTR.tex:580-582`); and, after showing that the idiom as a first-class type breaks the Return Type Rule on the nested tower, "the self-type idiom should be more than simply an idiom and instead a separate construct which cannot be used as a first class type, but instead only in bounds" (`:626-630`).
   - POPL 2019 has no self types and no tower (`research/extracts/ParkPOPL2019-extract.md:280`, `:328-329`).
   - The later Types chapter says nothing of `self`; its `comprises` sentence lists "types and generic types determined by the generic type of the declaration" (`types.tick:384-389`), and Luchangco's comment beside it wants every listed type to be a trait type (`:245`).
4. **The specification as it stands.** The type of `self` is the enclosing trait's type; with a `comprises` clause it is the intersection with the union of the listed traits (`var-ref.tex:53-69`, Ryu, 2009). A listed reference "is a declared trait identifier" (`traits.tex:163-165`), and the revival's `comprises` passage left a bare type variable in a clause open on purpose (`rung-spec-comprises/decision-record.md:19`, `:48`). A naked type variable may stand anywhere a type can but an `extends` clause, a `throws` clause and a `wrapped` field (`trait-parameters.tex:66-73`).
5. **The peers.** Rust: `Self` in a trait is the implementing type. Scala: a self type is declared, and "the self type of a class or object must conform to the self types of all classes which are inherited by the template" (ways note section 3, step 6, with the references). Java: `(T) this` or the `getThis` trick. Greenman, Muehlboeck and Tate name these traits "shapes" that encode self types for binary methods and algebra (`reviews/mie-probes/literature.md:54`).
6. **His decisions that bear.**
   - "The library's own practice is the standard": no fix from a reading of the specification alone or from a user-side workaround; the library's own way is named first (POSITIONS). The archaeology's reading: the library is extended where its own text shows a gap, in the shape it already has (`library-extension-rule-archaeology.md` section 5, point 2; section 7).
   - Route A: the exclusion rule stays, the tower is flat, "each carrying its own algebra". The record reads route A as admitting no self type (`CLIMB-BATCH-8.md:113`; `anyintegral-comprises-judgement.md`, section 3, reason 4); POSITIONS' own words name the rule and the flat tower, not self types.
   - "One global rule is sought from type theory and the peers' implementations rather than a rule slapped on a rule" (POSITIONS, "No re-measuring what the record holds", last sentence).
   - The `comprises` judgement, which he took: when the library is what the team meant and the checker's rule is the earlier reading, bring the checker to the group's semantics, not the library to the checker (`anyintegral-comprises-judgement.md`, section 3, reason 2; POSITIONS, "`AnyIntegral`'s closure and how the checker reads `comprises`").

The theory, in one paragraph (ways note section 3, step 1, which I confirm). An F-bound constrains the argument `I`, not `self`: `object Bad extends Integral[\ZZ32\]` satisfies it, and inside the body `self` may be a `Bad`. A body that treats `self` as an `I` is sound only under a further fact, which a language gets in one of four ways: a declared self type checked at each extender (Scala), a built-in `Self` (Rust), a closed world that lists `I` as the only member (the team's `comprises I`), or a run-time cast (Java). Ways 5, 6 and 2 are those three devices; ways 1, 3, 4, 7 and 8 rewrite the library so that the question does not arise.

## 3. The ways, weighed

The library's own ways first, as his rule asks. "Clears" is by reading; nothing was run. The ways note's section 2 has each way's detail; I add only what weighs.

### The library rewrites: ways 1, 3, 4, 7 and 8

- **Way 1**, `self + self.zero`: 8 lines, clears 8 (`Integral`'s 7 and unary `-`). It reaches no order and not `:357`, since `zero` cannot use itself. It is a trick: the library's `x.zero` device supplies an identity, never a retyped `self`. Not enough on its own.
- **Way 3**, an abstract getter at every leaf (Java's `getThis`): clears 29, at the price of a new abstract member on every order, group and array trait, which stops the two team tests that define only `=` and `<` on their own order from loading. Giving the getter a default body needs way 2's cast. Not taken.
- **Way 4**, per-type bodies with the defaults removed: route A's own shape, and the right shape for the two closed families, whose extenders are all the library's. For the open families it deletes the documented minimal complete definitions and breaks the same two team tests. Taken for `:685` only (below).
- **Way 7**, Naden's rewrite into top-level generics bounded by the self type: it is Naden's device for the Return Type Rule on the nested tower, not for typing `self`; it changes dispatch, and row 545 already records a mixed family refused on both paths. Not taken.
- **Way 8**, weakening a declared type to the trait type: Beckman's 2008 diagnosis, but it moves the errors to every caller that needs the parameter type, and a weakened parameter turns `ZZ32`'s override of `<` into an overload pair. Not taken.

So the library's own text offers no way that keeps the api and clears the open families. Under his rule, a fork resting on a refusal says what the library does instead: the library's answer is the per-type algebra of the flat tower (way 4), which serves the closed families and not the orders.

### Way 2: the team's `cast`

- Library only, 21 lines, clears 29; the team's own `cast[\T\]` (`:33-37`) and the team's own typecase on a trait's parameter inside its functional method (`Contains.MATCH`, `:1093-1098`). Nothing else changes.
- Against it. It is Java's answer: a static fact becomes a run-time check, at every call of every default body, and it tells the checker nothing, so every future body of the same shape pays it again. It is a per-site patch repeated 21 times, which is the "rule slapped on a rule" his position refuses, and it reads as the user-side workaround his library rule rules out. Its deciding unknown is walk's binding of a trait's parameter inside a functional method's body (ways note, way 2), and whether the code generator compiles a cast at a trait's parameter in a default body is unmeasured (row 426 covers a function's parameter only).
- Its place: the fallback if the recommended way's one measurement fails (section 6).

### Way 5: the team's idiom, `comprises T` on seven traits

- What it has. It is the team's own built device (Ryu, 2009, `3a8ad3b67`; Allen, 2011, `dbc91f830`), its meaning is already in the specification (`var-ref.tex:63-69`), the compiler library spells it, and Naden's 2012 text names it as the realisation of the idiom. The checker needs no change.
- What it costs. Three areas move. The library: one clause on each of seven traits in two files (the hierarchy rule forces `LexicographicOrder`, `MultiplicativeRing` and the orders to carry it together, `traits.tex:241-248`; route C's experiment found the same, "the clauses go on the whole family or on none of it", `route-c-experiment.md:104`). Walk: it overflows its stack at load on any `comprises T` (row 407, `FType.java:280-294`), so a 6-line edit in `BuildEnvironments.finishTrait` must land first, with its test; under that edit `Integral[\ZZ32\]` records `comprises { ZZ32 }`, so walk's exclusion verdicts at load can move (`anyintegral-comprises-ways.md`, way 3). The specification: it must legalise a type variable in a `comprises` clause, which the Working Draft's text does not admit ("a declared trait identifier") and the type group's 2012 calculus dropped from its grammar; the revival's `comprises` rung left exactly that door shut on purpose (`decision-record.md:48`, rejected wording 4).
- Its risk. The clause does more than type `self`: it closes each trait to its parameter, which changes exclusion and the hierarchy checks for every instantiation. On the nested tower, eight such clauses overflowed the checker's api overloading check in `Formula.tImplies`/`primImp` under an exclusion question, with the forest rule dropped as well (FACTS, "Route C built whole as a shadow"; `route-c-experiment.md:136`). The flat library is unmeasured. The one-trait form (a) finishes the count stage at 87 (`anyintegral-comprises-ways.md`, way 3) and reaches 7 sites.
- Against the record. It is the first self type in the library's text under route A, and the record's reading of route A is "no self type enters the library" (`CLIMB-BATCH-8.md:113`). Whether that reading is his is for him to say; section 7.

### Way 6: the self type read from the F-bound, checked at each extender

- What. Two rules, no new syntax.
  - (a) In a trait declaration `C[\X_1, ..., X_n\]`, a type parameter `X_k` whose `extends` clause lists `C[\X_1, ..., X_n\]`, the trait at its own parameters, is the trait's self parameter, and the type of `self` in the trait's methods is `C[\X_1, ..., X_n\] ∩ X_k`. This is the type the checker already gives `self` under `comprises X_k` (`SelfParamDisambiguator.scala:63-75`; `TypeAnalyzer.removeSelf`), read from the bound instead of a clause.
  - (b) A trait or object declaration, or an object expression, that extends an instantiation `C[\A_1, ..., A_n\]` of such a trait must have a self type that is a subtype of `A_k`, where a declaration's self type is its own type, or `D[\...\] ∩ Y` when the declaration has a self parameter `Y` by (a). A declaration that fails this is a static error. This is Scala's conformance rule, and it is what makes (a) sound: `object Bad extends Integral[\ZZ32\]` is refused, so inside `Integral[\I\]` every `self` is an `I`. Checking direct extensions at every declaration suffices, by induction up the hierarchy: a value of `C[\A\]` comes from an object whose every supertrait was checked.
- What it changes. The checker: the self type at `SelfParamDisambiguator.scala:63-75` (about 15 lines), and the extender check beside the `comprises` checks in `TypeHierarchyChecker.checkDeclComprises`'s loop over `extendsTypes` (`:208-258`, about 25 lines), with object expressions wherever their self type is formed (`getObjectExprType`). The specification: one sentence at `var-ref.tex:63-69` beside the idiom, the extender rule in the traits chapter, an Appendix I entry. The library: nothing. Walk: nothing, since walk does no static typing and no clause reaches its exclusion test, so row 407 does not arise.
- What stays the same, by reading of the checker. Everything but the typing of `self` in bodies. The overloading check strips a self type to its trait (`OverloadingOracle.scala:368`, `:380`, `:411-414`); so do the overload sets (`OverloadSet.java:793-795`), the exclusion oracle (`ExclusionOracle.scala:148-150`), the coercion oracle (`CoercionOracle.scala:176`), the variance checker (`VarianceChecker.scala:214-220`) and the code generator (`CodeGen.java:3672-3674`). `Integral[\ZZ32\]` stays a type of its own, not identified with `ZZ32`: no subtyping, exclusion or hierarchy verdict between trait types moves, which is why the route C overflow's cause (the clause's effect on `comprisesClause` under an exclusion question) is not reached. The intersection flows only where `self` flows: into subtyping, where `Integral[\I\] & I <: I` holds at once (`TypeAnalyzer.scala:163`), and into the exclusion test of an argument type (`pExcInner`, `:409`), which is the one path unmeasured (below).
- Clears. 29 by reading: every shape A and B site, the 5 cascades and R4's tuple with them. Every library extender passes (b): the five integer types, `RR64`, `RR32`, `QQ`, `String`, `Char`, `Boolean`, `CaseInsensitiveString`, `Range[\I\]`, `Vector`, `Matrix`, `Array1-3` extend at themselves (`Library/FortressLibrary.fsi:293`, `:391`, `:482-639`, `:1603`, `:1721`, `:1577-1796`, `:2163`, `:2419`; `FortressBuiltin.fsi:47`, `:131`, `:225-228`; `CaseInsensitiveString.fsi:21`); `Comparison` at itself and `TotalComparison` below it (`.fsi:101`, `:120-121`); `Integral[\I\]`, `MultiplicativeRing[\T\]` and `LexicographicOrder[\T,E\]` pass through their own self types (`:275`, `:443`, `:1334`); the test and model types extend at themselves too (`tests/parametricManiaCompr.fss:20`, `demos/trips.fss:51`, `library_tests/MaybeTest9.fss:19`, `EqualityRung1.fss:19`; C4's `Diag` is a `Matrix[\RR64,s,s\]`, `run-c4/src/FlatArrays.fss:36`). By grep, no gated test extends an F-bounded trait at another type.
- Not `:685` (below).
- Against it. It is a rule of the revival's: the team's own test of "self-typed" is the clause (the 2012 patents, `patents-forest-rule.md`), and no team text states (a) or (b). What answers that: (a) is the checker's own self type, built by the team in 2009 and pinned by their gated test `XXX10k`, read from the bound that the library has always written; (b) is Scala's rule verbatim; and Naden asked for exactly this, "a separate construct which cannot be used as a first class type, but instead only in bounds". It is one global rule from the theory and the peers, the kind his position asks for, not a rule on a rule.
- Its unknown. Whether the intersection self type, in the exclusion test of an argument type, takes the path that stalled once on an intersection bound (`normConjunct` → `dExc` → `pExcInner`, FACTS, "The distance to the switch-over by root cause"). The team's `XXX10k` passes `self` of type `(T[\U\] & {U})` to overloaded functions today, so the shape is not new to the checker; its weight on the whole library is unmeasured. Section 6 names the measurement.
- At the switch-over. The code generator compiles such a body with `self` as the trait type, as it compiles the prelude's `comprises T` traits today (`CodeGen.java:3672-3674`; `Library/CompilerAlgebra.fss:26`); whether a body returning `self` as `I` links and runs compiled is measured then, with everything else of the switch-over, not now.

### Way 9: leave them

The default on record since batch 8's Q2 ("the class waits until there is better information"). The better information is now on file. They cannot stay past the switch-over.

### `:685`, shape C, apart

`numerator(self):ZZ = do z: ZZ = self; z end` (`:685`, the revival's, `d846e3644`) converts a generic value into `ZZ`. No self type reaches it: an `I` has no coercion into `ZZ`, because a coercion names a concrete source type (`ZZ`'s, `:985-992`; FACTS, class I3's reason). The library's own shape for this is route A's per-type algebra, which `ZZ` already has for this very method: `numerator(self): ZZ` declared on `ZZ` in the api (`.fsi:669`) and in the component. So: `Integral`'s `numerator` stays declared and loses its default body, and `ZZ32`, `ZZ64`, `NN64` (`Library/FortressLibrary.fss`) and `NN32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`) each get `numerator(self): ZZ = do z: ZZ = self; z end`, where `z: ZZ = self` converts by `ZZ`'s coercion from the concrete type, with the api line each as `ZZ`'s. Four bodies, four api lines, one default removed. Walk's value is the same conversion at the concrete type. This is way 4 for one site, the library's own precedent at `.fsi:669`.

## 4. The recommendation

Way 6, the self type read from the F-bound with the extender rule, for the 29; the per-type `numerator` for `:685`. The library's 29 bodies stay as the team wrote them. Walk is untouched.

Why, in order of weight:

1. The library is what the team meant: the bodies are theirs, their comments document them as the minimal complete definitions, and their shelved `Compiled17ee` shows them trying the same bodies in the compiled world. The custodians' job is then the one he took for `comprises`: bring the checker to read what the library says, not rewrite the library round the checker (POSITIONS, "`AnyIntegral`'s closure and how the checker reads `comprises`").
2. It is the smallest change that clears the open families without a run-time check and without touching the library's api, walk or a walk value: two checker files, two specification passages, no library line.
3. It follows the type group's latest word where the late texts split: Naden's construct "only in bounds", realised on the checker's own 2009 self type, with the 2012 calculus's refusal of a type variable in a clause left standing.
4. It is one global rule from the theory and the peers (Scala's self type and its conformance rule; Rust's `Self`), the form his position asks for.
5. It stays inside route A as POSITIONS words it: the exclusion rule stays, the tower stays flat, no clause enters the library, and no type is identified with another.
6. Its fallback is cheap and library-only: way 2, the team's `cast`, if the one measurement finds a stall.

The alternative, if he prefers the team's code to a rule of ours: way 5(b), the clause on seven traits, after walk's row 407 edit and a distance run on the flat library, at the price of the specification legalising what the 2012 calculus dropped and of exclusion verdicts that can move on both paths. The two are compatible: under a clause the self type is the clause's, and (a) is never reached.

## 5. What it changes

- **Library.** Seven lines in `Library/FortressLibrary.fss` and `.fsi` and two in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` and `.fsi`, all for `numerator` (section 3, `:685`: four bodies, four api lines, one default removed). Nothing else.
- **Checker.** `scala_src/disambiguator/SelfParamDisambiguator.scala:63-75`: when a trait has no `comprises` clause and a static parameter bounded by the trait at its own parameters, build the self type with that parameter as its comprised list, so that `removeSelf` gives `C[\X\] ∩ X`. `scala_src/typechecker/TypeHierarchyChecker.scala`, in the loop over `extendsTypes` (`:208-258`): for each extended `C[\A\]` whose `C` has a self parameter, check `selfTypeOf(decl) <: A_k`, with the error "`D` extends `C[\A\]`, whose self parameter is `A`, but `D` is not a subtype of `A`"; the same for an object expression where its type is formed. About 40 Scala lines. `SelfTypeBoundsInserter.java` is untouched: the F-bound is already written.
- **Walk.** Nothing. Walk's row 407 stays open and untouched.
- **Specification.** In the S1 form (POSITIONS, "The S1 form"): at `var-ref.tex:63-69`, after the idiom's sentence, one sentence giving rule (a), with a `\revision` callout; in `traits.tex`, rule (b) beside the `comprises` passage (`:235-252`), with its callout; one Appendix I entry with the original text (`Specification-1.0-frozen/basic/expressions/var-ref.tex`, the `self` paragraph) quoted, the reason (sections 2 and 4 above) and route C (the clause form, section 3, way 5); the decision record in the rung's folder. The calculi of Appendix A are untouched, as the route A rung left them, with no new callout: they type `self` as the trait and admit no self type, which the existing callouts already say they predate.
- **Walk values that change.** None. The library's bodies do not change; `numerator`'s bodies are the same conversion at each concrete type.
- **Sites cleared.** 30 of 153 by reading: S1 29 and R4 1. The distance expected after the rung: 123, if nothing else moves.
- **What it costs.** One checker rung with its specification passages (a worker, a skeptic, the gate), the library's `numerator` lines in the batch's library rung, and one measurement before the rung is briefed (section 6). In tokens: one measurement worker, about 0.4M (batch 8's Q2 sized a probe of this kind so, `CLIMB-BATCH-8.md:42`), and the rung at a batch rung's usual spend.
- **What it leaves.** The hole every way but the 2008 clause shares: an object declared in another unit below a closed trait is not caught at its clause (row 551). Rule (b) is checked at every declaration the checker sees, so a program's own `object Bad extends Integral[\ZZ32\]` is refused wherever it is declared; walk still loads it (walk has no static types), which is walk's standing limit, not a new row.

## 6. The rung, and the one measurement

**The measurement, before the rung is briefed.** One probe, on a worktree seeded from the base build: rule (a) alone as a shadow edit of about 15 lines in `SelfParamDisambiguator.scala`, the checker built once, and the distance stage once (about 22 minutes of machine time at the last gate, `distance.txt:35`: 1,293 s, `FortressLibrary` 739 s). It reads three things: the 29 S1 and R4 sites gone; any new error, by site against the landed list; and whether the stage finishes without a stall in the exclusion test of an intersection (FACTS, "The distance to the switch-over by root cause", the `normConjunct` path). Size: one worker session, about 0.4M tokens, 25 minutes of machine time. If the stage finishes and the 29 go: brief the rung. If it stalls: the stall's seat is read from the thread dump, sized, and put to him with way 2 as the fallback for the open families. Rule (b) needs no probe: by grep, every extender in the tree is at itself (section 3, way 6, "Clears"). If he would rather skip the probe, the rung builds without it and the gate measures, at the risk of one lost batch slot.

**The rung of batch 14** (the form of batch 12's rung C, `CLIMB-BATCH-12.md:208-235`).

- **Files.** `ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala` (`:63-75`); `scala_src/typechecker/TypeHierarchyChecker.scala` (the loop at `:208-258`, and a helper `selfTypeOf`); the object-expression case where `getObjectExprType` is used; new files in `ProjectFortress/compiler_tests/`; `Specification/basic/expressions/var-ref.tex`, `Specification/basic/traits.tex`, `Specification/appendices/changes.tex`, and the rung's `decision-record.md`. Not: the library (the `numerator` lines go to the batch's library rung, which owns the number section), walk, the overloading oracle, the code generator.
- **Tests, first**, each through `junit.sh` on the base:
  - `SelfTypeFromBound`, compile and run: `trait Shape[\S extends Shape[\S\]\]` with `twin(self): S = self`, `opr MINS(self, other: S): S = if other < self then other else self end` and a `(S,S)` body, an object `Pt extends Shape[\Pt\]` with its `<`, and `run()` asserting `twin(Pt)` and `Pt MINS Pt` by `run_out_equals`. Seen failing on the base with "Function body has type Shape[\S\], but declared return type is S." (the sites' message), then passing.
  - `XXXSelfTypeExtenderWrong`, compile: `object Bad extends Shape[\Pt\]`, `compile_err_contains` the new message. Seen reporting "Saw wrong failure" on the base (the base accepts it), then the expected failure, and shown red once with `Bad` changed to extend `Shape[\Bad\]`.
  - `SelfTypeExtenderThroughOwn`, typecheck: `trait Lex[\T extends Lex[\T,E\], E\] extends Shape[\T\]` and `trait Below extends Lex[\Below, ZZ32\]` accepted; an object expression extending `Shape[\Pt\]` refused as `XXXSelfTypeObjectExprWrong`.
  - Keep their verdicts: `XXX10k` (the clause's reading unchanged), `Compiled10.l`, `Compiled10.m`, `EqualityRung1`, `MaybeTest9`, the team's `Compiled17defgh`, and the ladder's files. `Compiled17ee` stays undriven; a point to report if the worker finds it compiles.
  - After the edit: the compiler and library test tracks once; the count and distance stages once, the landed tables as the before (POSITIONS, "No re-measuring what the record holds").
- **The library rung's lines**, test first under walk: `NumeratorPerType`, asserting `numerator(x)` for one value of each of the five integer types against its `ZZ` value and `denominator(x)` against `1`; it passes on the base (walk converts the same way today), so it is seen passing, and the rung's test for the site is the distance stage's `:685` row.
- **Specification**, in the rung: the two passages, the callout at each, the Appendix I entry before "Passages not yet revised", the decision record; the gather folds `changes.tex` as it did for batch 12.
- **Ledger.** No row closes: the 30 are distance sites, not rows. One new row if the probe finds a stall. Row 407 untouched.
- **Overlaps.** No other rung edits the checker's disambiguator or hierarchy checker; the library rung's `numerator` lines share no declaration with the checker rung.

## 7. What it reverses or bends

- **Reverses nothing.** Route A stands: the exclusion rule, the flat tower, each type carrying its own algebra. The library's text gains no self type and no clause. Walk is untouched. The `comprises` reading he took is untouched, and under a clause the new rule is never reached.
- **Bends one reading on record, not a decision of his.** The record reads route A as "no self type enters the library" (`CLIMB-BATCH-8.md:113`; `anyintegral-comprises-judgement.md`, section 3, reason 4, my own earlier words). Under way 6 the library's text gains none, but the checker gives `self` a self type in every F-bounded trait, the library's seven among them. POSITIONS' route A entry names the exclusion rule and the flat tower, not self types, so this is a reading of the earlier judge's and the batch record's, and I say so plainly: if he meant route A to exclude every self type, this recommendation asks him to narrow that to "no clause and no identification of types", which is what route A's own reasons protect.
- **Bends "the library's own practice is the standard"?** No. The library's practice is the 29 bodies as the team wrote them; way 6 keeps them and makes the checker read them as walk does. The `numerator` site takes the library's own per-type precedent (`.fsi:669`).
- **"The type group's late positions outweigh the early text."** Followed where the late texts agree (no type variable in a clause, Welterweight's grammar), and Naden's latest word where they split; it departs from Welterweight's plain `T[P]` typing of `self`, which that calculus left beside a commented-out self-typed step it never finished.

## 8. What the record does not hold

- Any way's distance on the flat library. The measurement of section 6 is the first.
- Whether the intersection self type reaches the exclusion test's intersection path on the whole library (the measurement reads it).
- Whether a body returning `self` as `I` links and runs on the compiled path (the switch-over's).
- Walk's binding of a trait's parameter inside a functional method's body (way 2's unknown; only needed if the fallback is taken).

## For Pavol

**The question.** A self-typed trait is a generic trait whose parameter stands for the implementing type: `trait Integral[\I extends Integral[\I\]\]`. The checker types its `self` as `Integral[\I\]`, not `I`, so 30 library bodies that return or pass `self` as an `I` are refused. Walk runs them all.

**What the team left.**
- The 30 bodies are theirs, from 2008.
- Their compiled-world idiom was a `comprises` clause naming the parameter; the checker then reads `self` as both. It is in the specification since 2009.
- Their 2012 calculus dropped type parameters from such clauses. Naden wanted the idiom as a construct of its own, usable only in bounds.
- Scala and Rust use a rule with one check: whatever implements the trait at `A` is an `A`.

**The options.**
1. A checker rule: the self type read from the bound, with that check. Checker and specification change; library and walk do not. Clears 29.
2. The team's clause on seven traits. Library, walk and specification change; it once overflowed the checker. Clears 29.
3. A run-time cast, 21 library lines. Clears 29 at run time.
4. Leave them.

The thirtieth site converts an integer into `ZZ`; it gets one body per integer type.

**A yes commits you to** one measurement (one worker, 0.4M tokens, 25 machine minutes), then one checker rung in batch 14. No walk value changes. It bends a reading on record, "no self type enters the library", not route A.

**Recommendation.** Option 1, with the per-type body.

## The measurement

Run 2026-10-09 by an Opus probe worker on the coordinator's brief: section 6's probe, plus one variant beyond it, named as such below. The base is main at `7cb479984`. The checker, the library and the build are unchanged since the per-site list landed at `32b88cd3b`: `git diff --name-only 32b88cd3b 7cb479984 -- ProjectFortress Library build.xml` prints nothing. So the landed list and `climb-batch-12/gate/distance.txt` are the before, and the base was not run again (POSITIONS, "No re-measuring what the record holds."). The worktree `/home/user/fortress-selftype` was built at that commit with `ant compileAll` and the library order. Each shadow was then built with `ant compileAll` and measured once with `explorations/coordinator/tools/distance/run.sh`. Nothing of the shadow is committed; the worktree is removed.

Sites were compared row by row with `compile-ladder/gate/distance-sites.tsv`. The key is the kind, the location and the message's opening words, up to the first " - ". A message that lists candidate declarations now prints each self type as `(C[\X\] & {X})`, so its full text differs even at an unchanged site. `distance/compare.sh` against the landed table gives the class moves quoted below.

| | landed, batch 12 | rule (a) alone | rule (a), confined to bodies |
|---|---|---|---|
| total | 153 | 145 (−8) | 123 (−30) |
| S1 + R4 | 30 | 0 (`:685` filed under OT) | 0 (`:685` filed under OT) |
| cleared, of the 29 | — | 29 | 29 |
| new sites | — | 21 (R2 18, OT 3) | 0 |
| stage, s | 1,293 (FortressLibrary 739) | 1,249 (FortressLibrary 710) | 1,222 (FortressLibrary 701) |
| load at start | 2.07 | 1.51 | 2.60 |

The machine: nproc 4, Intel Xeon @ 2.10 GHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`, one JVM at `-Xmx4g`. Another worker may have been measuring in `/home/user/fortress-fork2` at the same time.

### Rule (a) alone, as section 6 asks

- **Cleared: all 29 of shapes A and B, R4 among them.**
  - `:223` (the call and its filter cascade, 2), `:228`, `:230`, `:282` (2), `:286`, `:287` (3), `:288` (3), `:290` (3, R4's tuple among them).
  - `:357`, `:360`.
  - `:688-690`, `:710`, `:719-721`.
  - `:2175`, `:2179`, `:2183`, `:2187`.
  - By family: the orders 16, `AdditiveGroup` 2, `Integral` 7, `StandardMutableArrayType` 4. The rule reaches dotted methods (the arrays') as well as functional ones.
- **Stays: `:685`**, shape C, as section 3 says. Its message is now "Right-hand side has type (Integral[\I\] & {I}), but declared type is ZZ.". `classify.py`'s S1 pattern reads the old text, so the table files the site under OT, and S1 shows 0.
- **New: 21 sites with one cause.**
  - 18 at the overloading stage, which the classifier files as R2. The message is "For CMP, the return type of ((StandardPartialOrder[\X\] & {X}), X)->Comparison @ FortressLibrary.fsi:174 should be a subtype of the return type of ((StandardTotalOrder[\X\] & {X}), X)->TotalComparison @ FortressLibrary.fsi:229".
    - 11 are at the api pair, with X = `String`, `Boolean`, `Char`, `NN32`, `NN64`, `ZZ32`, `ZZ64`, `ZZ`, `I`, `T` and `List[\E\]`. They are reported in the apis of FortressLibrary, FortressBuiltin, String, FlatString and List.
    - 7 are at the component pair `.fss:221`, `:280`, with X = `I`, `NN64`, `String`, `T`, `ZZ32`, `ZZ64` and `ZZ`.
  - 3 are bodies whose `CMP` call now types as `Comparison`:
    - `:1004`, `ZZ`'s `CMP`, and `:1930`, `LexicographicOrder`'s, both "Function body has type Comparison, but declared return type is TotalComparison.";
    - `:4178`, `String`'s `CMP`, "Could not check function application - TotalComparison->TotalComparison is not applicable to an argument of type Comparison".
- **The cause**, read in the checker and confirmed by the variant below.
  - The disambiguator writes the self type into the self parameter's declared type. That type is also the functional method's signature, so the self type reaches more than the body.
  - At any X below `StandardTotalOrder[\X\]`, the types `StandardPartialOrder[\X\] & X` and `StandardTotalOrder[\X\] & X` are equivalent. So `StandardTotalOrder`'s `CMP` is no longer more specific than the `StandardPartialOrder` `CMP` that it overrides.
  - `providedAndOverridden` pairs the two as equal, because it compares the parameters without self (`STypesUtil.scala:1663-1671`). `checkOverridingReturnType` then checks the Return Type Rule in both directions (`OverloadingChecker.scala:672-674`).
  - `satisfiesReturnTypeRule` reads both domains with the self type (`OverloadingOracle.scala:83-90`, `makeDomainWithSelfFromArrow`). It therefore asks whether `Comparison <: TotalComparison`, and that fails. Call resolution meets the same tie at the three bodies.
  - Section 3 reads that the overloading check strips a self type. That holds for `OverloadingOracle.compare` (`:365`, `:411-414`), but not for the Return Type Rule or for call resolution.
  - A small program of the same shape compiled clean under the shadow: two F-bounded traits, the subtrait narrowing an operator's return type (`tmp/probe/SelfOrd2.fss`, not committed). So for now the stage's rows above are this class's only reproduction.
- **The stall: none.** The overloading check's exclusion test of an intersection did not stall. Every target finished: FortressLibrary in 710 s, RangeInternals in 355 s, and the other ten in 179 s together. No thread dump was needed.

### Rule (a) confined to bodies (one change beyond section 6's probe)

- **What.** `compiler/index/FunctionalMethod.java` is the index entry that overloading, the Return Type Rule and call resolution read; `makeArrowFromFunctional` reads its `parameters()` (`STypesUtil.scala:161`). When the self type was read from the F-bound (a trait with no `comprises` clause), the entry now gives the self parameter the plain trait self type. A body's `self` is bound from the declaration's own parameters (`typechecker/impls/Decls.scala:198`), so it keeps the intersection. Under a `comprises` clause nothing changes, so `XXX10k`'s reading is not reached.
- **Result.**
  - 123 sites: the 29 cleared, no new site, and the 18 api and component errors gone (the apis report only `isLeftZero`, as landed).
  - `:685` stays, as above.
  - One more site went: `:130`, BR, "Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\]". This site has come and gone between landings: it is in 3 of the last 6 landed lists (`32b88cd3b`, `f9d3ec826`, `6416d216f`; absent at `ec718967a`, `cec70988b`, `b0eb41516`). So I read it as the stage's run-to-run variation ("the comparisons' … pairs", `run.sh`'s header), not as cleared.
  - The result is 123, as section 5 expects after the rung, but `:685` still stands, waiting for its per-type `numerator`. Allowing for `:130`, the rung's own expectation is 123 to 124 before `numerator`, and 122 to 123 after it.
- **No stall.** FortressLibrary 701 s, RangeInternals 347 s, the stage 1,222 s.
- **The compiler's library order** compiles under both shadows: five jars, at the clean tree's times.

### The compiled run of a body that returns `self` (section 3, "At the switch-over", measured)

- **The probe.** `trait Shape[\S extends Shape[\S\]\]` with `getter tag(): String` and `twin(self): S = self`, and `object Pt(t: String) extends Shape[\Pt\]`; `run` prints `twin(Pt("b")).tag`.
- **Under both shadows.** The probe compiles, and `fortress run` dies at class load with `VerifyError: Bad return type` in `Shape[\Pt\]$DefaultTraitMethods.twin`: "Type 'SelfTwin$\=Shape?SelfTwin\%Pt?' ... is not assignable to 'SelfTwin$Pt'". The default body returns the trait-typed `self` with no cast to the instance's `Pt`.
- **The team's idiom.** The same program with `comprises S` on the trait fails the same way.
- **Larger probes.** With `pick(self, other: S): S` and `pair(self, other: S): (S, S)` beside `twin`, the run dies with `ClassCircularityError: SelfProbe$Pt`. A `TOrd`/`POrd` pair with a body returning `self` fails the same way.
- **Controls.** The same trait and object with no body that returns `self` as `S` compile and run: with the F-bound and without it (`SelfCtl2`, `SelfCtl`).
- **What follows.**
  - Section 6's first test, `SelfTypeFromBound` "compile and run", cannot pass on today's code generator. The rung takes it as typecheck only, or the code generator's cast becomes a work item of its own.
  - The ledger has no row for it: `grep "Bad return type"` finds row 365, a function's `if` of two object types, a different shape. Whether to open one is the coordinator's call.
  - Walk is not affected.

### What it means for the rung

- **Way 6 is ready for a rung**, with rule (a) built with its confinement. That is the patch below, measured at 29 sites cleared, no new site and no stall. The fallback, way 2's `cast`, is not needed.
- **The rung still writes:**
  - rule (b), the extender check in `TypeHierarchyChecker.scala`, unbuilt here; section 6 says it needs no probe;
  - the object expression's case;
  - the specification passages;
  - the tests, with `SelfTypeFromBound` as typecheck only (above).
- **Its distance check.** The 21 sites of rule (a) alone are the regression to watch: if the rung builds rule (a) without the confinement, the stage shows them.
- **Its file list grows by one:** `ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java`, beside section 6's.
- **Tests to watch.** These test sources spell an F-bounded trait, so rule (a) reaches them: `compiler_tests/ComprisesGenericSubtrait.fss` and `Compiled17ee.fss` (undriven); `tests/ComprisesEligibleExtenders.fss`, `ComprisesGenericChildUnlistedExtender.fss` and `GenericBesidePlainOverlapShapes.fss` (walk only); `library_tests/MaybeTest9.fss`. The compiler test track was not run here.

### The patch

Two files, +63 −4, a 114-line diff against `7cb479984`. `SelfParamDisambiguator.scala` is rule (a): +29 −2, the probe section 6 asked for. `FunctionalMethod.java` is the confinement: +34 −2. Apply both with `git apply` from the tree's root.

```diff
diff --git a/ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java b/ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java
index 1efa6cd45..ae6dad884 100644
--- a/ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java
+++ b/ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java
@@ -40,11 +40,31 @@ public class FunctionalMethod extends Function implements HasSelfType, HasTraitS
     protected final int _selfPosition;
     private final boolean _declarerIsObject;
 
+    /* A self type read from the F-bound (a trait with no comprises clause whose self type
+     * lists its self parameter) types self in the body only: the declaration's signature,
+     * read by overloading, the Return Type Rule and call resolution, keeps the trait type. */
+    private final boolean _selfFromBound;
+
+    private static boolean selfFromBound(TraitObjectDecl d) {
+        if (!(d instanceof TraitDecl) || d.getSelfType().isNone()) return false;
+        Option<List<NamedType>> c = ((TraitDecl) d).getComprisesClause();
+        SelfType s = d.getSelfType().unwrap();
+        return (c.isNone() || c.unwrap().isEmpty()) && s instanceof TraitSelfType &&
+               !((TraitSelfType) s).getComprised().isEmpty();
+    }
+
+    private static SelfType plain(SelfType s) {
+        return s instanceof TraitSelfType
+            ? new TraitSelfType(s.getInfo(), ((TraitSelfType) s).getNamed(), Collections.<NamedType>emptyList())
+            : s;
+    }
+
     public FunctionalMethod(FnDecl ast, TraitObjectDecl traitDecl, List<StaticParam> traitParams) {
         _ast = ast;
         _declaringTrait = NodeUtil.getName(traitDecl);
         _traitParams = CollectUtil.makeList(IterUtil.map(traitParams, liftStaticParam));
-        _selfType = traitDecl.getSelfType();
+        _selfFromBound = selfFromBound(traitDecl);
+        _selfType = _selfFromBound ? Option.some(plain(traitDecl.getSelfType().unwrap())) : traitDecl.getSelfType();
         _declarerIsObject = traitDecl instanceof ObjectDecl;
         int i = 0;
         for (Param p : NodeUtil.getParams(ast)) {
@@ -65,6 +85,7 @@ public class FunctionalMethod extends Function implements HasSelfType, HasTraitS
         _declaringTrait = that._declaringTrait;
         _traitParams = params;
         _selfType = visitor.recurOnOptionOfSelfType(that._selfType);
+        _selfFromBound = that._selfFromBound;
         _selfPosition = that._selfPosition;
         _declarerIsObject = that._declarerIsObject;
         _thunk = that._thunk;
@@ -130,7 +151,18 @@ public class FunctionalMethod extends Function implements HasSelfType, HasTraitS
 
     @Override
     public List<Param> parameters() {
-        return NodeUtil.getParams(_ast);
+        List<Param> ps = NodeUtil.getParams(_ast);
+        if (!_selfFromBound) return ps;
+        List<Param> out = new java.util.ArrayList<Param>(ps.size());
+        for (Param p : ps) {
+            Option<TypeOrPattern> t = p.getIdType();
+            if (p.getName().equals(NamingCzar.SELF_NAME) && t.isSome() && t.unwrap() instanceof SelfType)
+                out.add(new Param(p.getInfo(), p.getName(), p.getMods(),
+                                  Option.<TypeOrPattern>some(plain((SelfType) t.unwrap())),
+                                  p.getDefaultExpr(), p.getVarargsType()));
+            else out.add(p);
+        }
+        return out;
     }
 
     /**
diff --git a/ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala b/ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala
index 24eec7bfb..78f46552f 100644
--- a/ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala
+++ b/ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala
@@ -67,8 +67,10 @@ class SelfParamDisambiguator extends Walker {
                                        staticParamsToArgs(toJavaList(sparams)))
       val self_type = comprisesC match {
         case Some(comprises@_::_) => NF.makeSelfType(type_name, toJavaList(comprises))
-        case _ => NF.makeSelfType(type_name)
-       
+        case _ => selfParam(name, sparams) match {
+          case Some(x) => NF.makeSelfType(type_name, toJavaList(scala.List[NamedType](x)))
+          case None => NF.makeSelfType(type_name)
+        }
       }
       replaceSelfParamsWithType(node, self_type).asInstanceOf[TraitDecl] match {
         case STraitDecl(info, header, _, excludes, comprises, ellipses) =>
@@ -87,6 +89,31 @@ class SelfParamDisambiguator extends Walker {
     case _ => super.walk(node)
   }
 
+  /* With no 'comprises' clause, a type parameter X_k of a trait C[\X_1, ..., X_n\]
+   * whose extends clause lists C[\X_1, ..., X_n\], the trait at its own parameters,
+   * is the trait's self parameter, and 'self' is typed '(C[\X_1, ..., X_n\] & X_k)',
+   * as under 'comprises X_k'.
+   */
+  def selfParam(name: IdOrOpOrAnonymousName,
+                sparams: scala.List[StaticParam]): scala.Option[VarType] = {
+    def same(a: StaticArg, p: StaticParam) = (a, p.getName) match {
+      case (STypeArg(_, _, SVarType(_, i, _)), j: Id) => i.getText == j.getText
+      case (SIntArg(_, _, SIntRef(_, _, i, _)), j: Id) => i.getText == j.getText
+      case (SBoolArg(_, _, SBoolRef(_, _, i, _)), j: Id) => i.getText == j.getText
+      case _ => false
+    }
+    def own(t: BaseType) = (t, name) match {
+      case (STraitType(_, i, args, _), j: Id) =>
+        i.getText == j.getText && i.getApiName.isNone && args.length == sparams.length &&
+          (args zip sparams).forall { case (a, p) => same(a, p) }
+      case _ => false
+    }
+    sparams.collectFirst {
+      case p@SStaticParam(_, _, i: Id, ext, _, _, _, _: KindType, _) if ext.exists(own) =>
+        NF.makeVarType(NU.getSpan(p), i)
+    }
+  }
+
   /**
    * Replaces Parameters whose name is 'self' with a parameter with
    * the explicit type given.
```
