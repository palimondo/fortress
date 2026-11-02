<!-- The decisions on record that followed walk's library or the specification's early text, read under the rule of the team's later word that the curator chose on 2026-11-02 (option 3 of `later-word-ask.md`), with the POPL 2019 points on `where`, `comprises`, `extends` and the self type, written 2026-11-02. -->

# The walk-leaning decisions, read under the rule of the team's later word

## In short

**The rule.** The rule is option 3 of `explorations/reviews/later-word-ask.md`. The team's later decision wins over its earlier one, in a text or in code. Code is a decision where the team wrote it on purpose, built it alike across its types, or stated it in a commit message, a comment or a checker rule. A stub by its author's words, or a way around a limit of the JVM or of the checker, is not a decision. "Later" is the date of the team's work on the point. Where a later decision conflicts with the team's earlier code, the one library follows it.

**Words.** Walk is the interpreter. Its library is the interpreter's library, which becomes the one library at the switch-over, when the compiled path moves onto it. The prelude is the compiled path's own small library (`CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`). The paper is Park, Hong, Steele and Ryu, POPL 2019, with its report in `Papers/Variance/`; its calculus is called FGFV. An F-bound is a bound on a type parameter that names the parameter itself, as in `I extends Integral[\I\]`. A method type parameter is a static parameter of a function or a method, not of a trait.

**What I read.** I read all 84 entries of POSITIONS. 29 of them do not choose between two words of the team: P-7, P-8, P-9, P-10, P-11, P-17, P-19, P-25, P-26, P-27, P-28, P-29, P-30, P-32, P-33, P-37, P-39, P-79, P-85, P-87, P-88, P-95, P-96, P-102, P-103, P-124, P-125, P-148 and P-150. I weighed the other 55.

**The result.** The rule confirms 50 decisions. It reopens or changes 5. In the order they bear on the work:

1. P-146, the self type. The team's later form is the `comprises` idiom, and P-146 kept walk's library form of 2008.
2. P-156, the tuple rule. A later team text forbids it, and one reason against the other way is a limit of the build that has since gone.
3. P-78, with the library's other F-bounded functions. The paper's restriction (2) forbids the form.
4. P-45, its positional sentence. It states a code generator's habit as a rule of the language.
5. P-77, ranges over `ZZ32` only. This is the other direction: the decision took a prelude stub and a JVM limit.

None of the five blocks the switch-over. P-146 goes first because it touches the library and the checker rule that the switch-over runs on.

**The POPL 2019 points.** The paper has no self types, no `comprises` clauses and no `where` clauses. It says that closed types "could be added back to FGFV in an obvious way" (`intro.tex:204`; `related.tex:17`). It admits an F-bound on a trait's type parameter ([D-Trait]). It forbids a method type parameter in any upper bound (`lang.tex:437-446`). So:

- The forms of P-42, P-43 and P-152 are the paper's own.
- The forms of P-44, P-60, P-147, P-151 and P-154 are additions in the area that the paper leaves out.
- P-146's F-bound is a form that the paper admits. Its self type is an addition.
- Three forms depart from the paper: P-78's F-bound on a method type parameter, P-156's tuple rule, and P-45's positional rule.

Two places match his worry. On the self type, the record set the team's own form, the `comprises` idiom, aside for its costs, and P-146 gives walk's earlier library as its reason (section 1). On P-156, the record set the `where` constraint aside in part for a code generator's refusal, a limit of the build that has since gone (section 2).

**Found on the way.** F-121 and `type-decisions-review/judgement.md`, V8, call `comprises Integral[\I\] where [\I\]` "the team's spelling" of `AnyIntegral`'s clause. The team never wrote it: the revival wrote it in the team's "not yet" form (`c2b4e2c95`, 2026-09-23), after the team's markers on `AnyMaybe`, `HasRank` and `AnyList`. The team's `AnyIntegral` extended `QQ`. I edited no record.

## 1. P-146: the self type

**The decision.** In a self-typed trait, such as `Integral[\I extends Integral[\I\]\]`, the checker types `self` in the method bodies as `C[\X\] & X`. It reads this from the F-bound. An F-bound is a bound that names the parameter itself. The extender rule refuses a type that extends `C[\A\]` and is not an `A`. The signatures keep the plain trait type, except in the exclusion test (P-157). "The library's text gains no self type and no `comprises` clause, and walk is unchanged." Why: "the checker reads the library as the team wrote it."

**What walk's library does.** It has F-bounds and no self type. Maessen wrote `trait StandardTotalOrder[\Self extends StandardTotalOrder[\Self\]\]` on 2008-03-24 (`1d2680d4d`) and `AdditiveGroup` in the same form on 2008-05-08 (`dc0f919ce`). By 2011-12-06 the parameter was renamed `T`, when `Self` became a keyword (`26718e298`, a parentless snapshot).

**What the team's later work does.** The team's form is the self-type idiom: a trait lists its own type parameter in its `comprises` clause. A `comprises` clause says that every value of the trait is a value of a listed type. With the idiom, `self` has the type of the trait met with the parameter.

- The Working Draft states the idiom under the comment "The new self-type idiom": with a clause, "the type of `self` is instead `T ∩ (U1 ∪ … ∪ Un)`" (`Specification-1.0-frozen/basic/expressions/var-ref.tex:63-69`).
- The team's checker builds it. Ryu added the "[self type idiom]" tests on 2009-10-25 (`e0add930c`). `Compiled10.k.fss` states the rule in a comment: for each naked type variable `V` in a trait's clause, the trait's own instance "is implicitly regarded as one of the bounds on that static parameter `V`" (`compiler_tests/Compiled10.k.fss:14-20`). `XXX10k.test:13-29` pins `self` as `(T[\U\] & {U})`. So the clause implies the F-bound.
- The prelude spells its two algebra traits with the idiom. `Equality[\T\] comprises T` is in place by 2011-12-06 (`26718e298`, a snapshot, so its author cannot be recovered). On 2012-06-05 Steele added `comprises T` to `StandardTotalOrder` (`655e65d53`). On 2012-06-06 he removed its F-bound, which the clause implies (`59fdeff62`). At the team's last commit the prelude has `trait StandardTotalOrder[\T\] extends {Equality[\T\], AllStandardTotalOrders} comprises T` (`a874948ac:Library/CompilerAlgebra.fsi:16`, `:24`).
- New evidence: in `655e65d53`, item (3), Steele made the specificity test of two functional methods use the declaring trait, "Using just the self type does not do the job, because it may be an intersection of the declaring trait and the comprises clause" (`OverloadingOracle.lteq`, `STypesUtil.makeSpecialArrowFromFunctionalMethod`). So the team read `self` as the plain trait type for specificity, as P-146's signatures do. The record does not cite this change.

**The rule's test.** The idiom passes it. The team wrote it on purpose: it is in the specification's text, in a checker rule with its tests, and in Steele's message. It is built alike on both prelude traits. No author calls it a stub, and it works around no limit.

**The later texts.** They split.

- Welterweight (Steele, 2012-03-27 and 2012-03-28) lists only constructed types in a clause (`Papers/Welterweight/fig-grammar.tick`). It types `self` as the plain trait type, and it left its self-typed dispatch step unfinished.
- The 2012 Types chapter (2012-05-31) says that a clause names "a set of types and generic types determined by the generic type of the declaration" (`types.tick:384-389`).
- Naden (2012-08-31), the latest, says: "The self-type idiom is realized with the comprises clause" (`justificationOfRTR.tex:580`). He then says that it "should be more than simply an idiom and instead a separate construct which cannot be used as a first class type, but instead only in bounds", and that "more work needs to be done" (`:627-632`). That construct was never built.

By date, the idiom is later than walk's 2008 F-bounds at every step: in the checker from 2009, in the Working Draft's text, and in the prelude to 2012-06. Its last built form and Naden's description of it are also later than Welterweight's grammar. So under the rule the idiom is the team's later decision, and P-146's ground, the library as the team wrote it, is the earlier code.

**The paper.** It has no self types and no `comprises` clauses. P-146's F-bound on a trait parameter is a form that the paper admits ([D-Trait]). The idiom is outside the paper. In either form, `self` as an intersection is an addition that the paper does not discuss. The paper's completeness lemma for matching (`resolve.tex:723-747`) assumes that no declared type holds a type parameter inside an intersection. It bears on phase 5's dispatcher, not on the static checks.

**What would change.**

- The tree: the one library declares `comprises T` on its seven self-typed traits: `StandardPartialOrder`, `StandardTotalOrder`, `LexicographicOrder`, `AdditiveGroup`, `MultiplicativeRing`, `Integral` and `StandardMutableArrayType` (`self-typed-bodies-ways.md`, way 5). The F-bounds can stay, because the clause implies them.
- Walk: row 407 is fixed first. Walk overflows its stack on `comprises T`, and a 6-line edit in `BuildEnvironments.finishTrait` repairs it.
- The checker: it reads `self` from the clause by the team's own rule. The extender rule then becomes the clause's own check.
- The specification: the self-type paragraph already stands. The text on the clause's grammar must admit a type variable, which F-171 records as unsaid.
- The record: P-146 and F-225 are rewritten. The specificity half of P-146's plain signatures stays, now on Steele's ground. P-157's exclusion reading comes from the clause.

The cost on record: the clause also closes each trait to its parameter, so walk's exclusion verdicts at load can move. On the nested number tower, eight such clauses overflowed the checker. On the flat library this is unmeasured.

**Default.** Run a probe of the idiom on the flat library: the seven clauses, with walk's row 407 edit as a shadow, measured by the count and the distance (the checker's two counts of errors on the library, F-53) and by the checker's time. If it is clean, the library takes the idiom, and P-146 is restated as the team's rule read from the clause. Either way, P-146's "Why" changes now, because its present ground is the earlier code. The probe can run beside phase 4.

## 2. P-156: the index bound and the tuple rule

**The decision.** Every index parameter is bounded `I extends Index`. `Range` excludes `Index`. "A tuple type whose elements are all `Index` types is itself an `Index`." A `where` constraint `I excludes Range[\I\]`, called S5, "was weighed and not taken: the team left such a constraint as an open question, and the code generator refuses a `where` clause in a declaration's header."

**What walk's library and the early text do.** Walk's library indexes its rank-2 and rank-3 arrays by a tuple type, passed as one `I`. In the Working Draft, Ryu (2009-11-11, `93f5018fd`) wished for an `Index` that excludes `Range`, and he saw the obstacle: the tuple in `a[1, 2, 3]` would need "a magic to convert that tuple argument expression to something of type `Index`" (`Specification-1.0-frozen/appendices/future.tex:198-207`).

**What the later texts do.** The 2012 Types chapter says that "every trait type excludes … every tuple type" and "a tuple type excludes … every trait type" (`types.tick:341`, `:424`). The paper's matching rule [M-Tuple-Trait] (`appendix.tex:559-560`) never matches a tuple against a trait. So the tuple rule, which is the revival's own, departs from a later team text. S5 departs only from earlier text: the Working Draft's list of constraint forms (`trait-parameters.tex:319-331`), and P-151's own scope.

**The rule's test.** The code generator's refusal of a header `where` clause was a limit of the build, which the rule does not count. The refusal has also gone: rung G of climb batch 24 (`c324b841c`) compiles such clauses (`compiler_tests/WhereBoundMethodCompiled`; row 701 now holds only contracts). The only team code on the point is the prelude's two-parameter subscript, `opr[i:ZZ32, j:ZZ32]` on the monomorphic `ZZ32Vector`. It is a stub for a vector that has no generic element type.

**The paper.** It writes a subscript of two indices as a method whose domain is a tuple of parameter types, which is the prelude's form. `Index` as a trait that excludes `Range` uses the nominal exclusion that the paper leaves out and says can be added. The tuple rule departs from [M-Tuple-Trait]. S5 is outside the paper, which has no `where` clauses.

**What would change.** If S5 is taken: the `Index` bound and the tuple rule go, the 40 library edits are reversed, rows 805 and 806 close, and the parser, the checker and walk gain an `excludes` constraint, with the specification gaining a constraint form. If P-156 is kept: only its "Why" changes.

**Default.** Keep the tuple rule. Every way departs from a team text or from P-151 (`perf-probes/symbolic-operators-2/REPORT.md`, section 3.1), so the goal decides (P-8). The tuple rule is the way that is built and costs least. Restate the "Why": the tuple rule departs from the 2012 Types chapter and from the paper's matching. Cut the code generator's reason. Question 3 of `popl2019-rules-map.md`, the dispatcher case in phase 5, stays.

## 3. P-78 and the library's F-bounded functions

**The decision.** `SUM` and `PROD` are each one generic reduction over the algebra: `opr SUM[\T extends AdditiveGroup[\T\]\](g: Generator[\T\]): T` (`Library/FortressLibrary.fsi:1993`). They follow the form of walk's library, whose `BIG MIN` and `BIG MAX` are F-bounded in the same way.

**What walk's library does.** Maessen wrote `opr BIG MIN[\T extends StandardMin[\T\]\]` on 2008-05-06 (`cfe16b43b`). The api now holds about 30 such functions, and the array family added 38 more (`array-judgements-popl-check.md`, section 1).

**What the later work does.** A method type parameter is a static parameter of a function or method, not of a trait.

- Naden (2012-08-31) proposes this very form, with the self type "a bound rather than the parameter type": `add[X <: Ring[X]](X,X): X` (`justificationOfRTR.tex:618-623`).
- The paper, later still, makes it ill-formed. Its restriction (2) is that "no reference to a method type parameter appears in any of the upper bounds" (`lang.tex:437-446`). Its stated reason is that restriction (2) makes dispatch consistent (`lang.tex:444-445`). Of restriction (1), the scoping of method type parameters, the paper says that it is "a relatively small sacrifice of expressivity for a large gain in dynamic efficiency" (`resolve.tex:1105-1112`).
- The one form of team code that the paper admits is Steele's unwired `object MapReduceReduction[\R extends Any\](j:(R,R)->R, id:R)` (`a874948ac:Library/GeneratorLibrary.fsi:267`, `e177c3e2c`, 2012-05-22). That reduction carries its operation and its identity as values, and no `SUM` was written against it.

**The rule's test.** Restriction (2) is a well-formedness rule, stated on purpose with its reason. It is not a workaround. It is the latest word on the point. Read to the letter, the rule puts it over walk's 2008 code and over Naden's 2012 proposal.

**The paper.** P-78's form departs from it. A trait-parameter F-bound would be admitted.

**What would change if the paper is followed.** Every F-bounded function moves its bound elsewhere. No team text gives that form for a self-typed algebra. The only form of the paper's kind is the reduction object, which is the operator-parameter algebra that the library does not use. microGPT calls `SUM`.

**Default.** Keep the F-bounds, and add the checker rule of way (a) of question 4 in `popl2019-rules-map.md`, when phase 5's dispatcher is designed. By that rule, an F-bounded method type parameter must be fixed by an invariant position of an argument, or be written at the call. Then the parameter is ground before the dispatcher's one-pass solve, which is what the restriction protects. Every call in microGPT already meets the rule. This default departs from the letter of the paper's rule, and the record must say so. It is his decision.

## 4. P-45: the positional sentence

**The decision.** "One rule of the old sentence survives: if one generic declaration is more specific than another, their static parameters must line up position by position, as Java's rule for overriding a generic method requires."

**What the early text does.** The Working Draft's sentence forbade overloads that differ in their static parameters. P-45 dropped the sentence and kept this one rule from it.

**What the later word does.** The check is the revival's: `satisfiesPositionalRule` (`scala_src/overloading/OverloadingOracle.scala:153-175`, `e2f1aa7e8`, 2026-09-30). Its reason is a habit of the team's code generator. The code generator hands a call's written static arguments, by position, to whichever declaration dispatch reaches (rows 398 and 499; `OverloadSet.java:1342-1353`). That is a limit of the build. The paper decides return types by [Return-Test] alone (`rules.tex:81-95`), renames static parameters freely, and instantiates a dispatched declaration by substitution ([Dispatch]; `decisions-review/popl-recheck.md`, section 1.3). The revised specification already says: "The compiled implementation adds one restriction that is not a rule of the language" (`Specification/advanced/overloading.tex:644-652`; `appendices/changes.tex:2831-2837`).

**The paper.** The positional rule departs from it.

**What would change.** No code changes now. P-45's sentence becomes a restriction of the compiled implementation, which ends when phase 5's dispatcher instantiates by substitution. Then the check goes, which is way (c) of question 5 in `popl2019-rules-map.md`. Row 499 is tied to that dispatcher.

**Default.** Restate the sentence so. Keep the check until phase 5.

## 5. P-77: ranges over `ZZ32` only (the other direction)

**The decision.** "Scalar ranges are over `ZZ32` only, as the compiler's prelude declares them." Why: a JVM array holds at most as many elements as the largest `ZZ32`.

**What the team's sources do.** Walk's library has ranges over any integer type, `opr :[\I extends AnyIntegral\](lo:I, hi:I)`, built alike across the integer types (`a874948ac:Library/FortressLibrary.fsi:2158-2179`). The prelude's `ZZ32` range is a stub by its author's words. Ryu wrote that it "should use a parameterized Generator type but it is not yet supported. Instead, we use GeneratorZZ32 for now" (`525264af1`, 2009-10-02).

**The rule's test.** A stub does not bind. A limit of the JVM changes the language only where the team made the limit the language's rule, and the team did not. So the ground "as the compiler's prelude declares them" falls. What is left is his own reason of the build, given on 2026-09-27 (P-77's history).

**The paper.** It has no numbers or ranges, and is silent.

**What would change if reverted.** The ranges become generic again (rung J of climb batch 7R, `3be1fecd7`, reversed), F-133 and P-56 are revisited, and microGPT is unchanged.

**Default.** Keep the decision, stated as his choice for the build target against the team's generic ranges, with the prelude's shape named as a stub. A reversal costs a rung and gives microGPT nothing.

## The confirmed decisions

Each line gives the decision and the ground on which the rule confirms it.

- P-12: walk has no static types, and the paper's dispatch needs the static types of calls at run time (`popl-recheck.md`, section 1.11), so walk's limit is only a limit.
- P-38: Steele's prelude spelling, with `BOXPLUS` wrapping and `DOTPLUS` saturating, passes the test: it is built alike on four types and asserted in his `Integer3` (`9ce7d8189`, 2011-09-08). But his own 2012 Operators chapter restates the Working Draft's spelling, "Wraparound … `\dotplus`" (`91e71e62e`, 2012-05-28; `operator-overview.tick:205-208`). The later text wins, so row 348 stays a defect.
- P-40: the checked sizes finish the team's sizes in types. The team's checker left them as "Todo", and no later word disagrees.
- P-41: the team's code generator already emitted the descriptor field for a size.
- P-42: Steele's implicit `Object` bound passes the test (`91e71e62e`, 2012-05-28, "amazingly, this was not yet implemented"). The later paper says "each type parameter has an upper bound Any" (`lang.tex:125`), so this is the paper's form.
- P-43: the flat numbers and the exclusion rule follow the prelude (2009 to 2012), the 2011 paper, the 2012 Types chapter and Naden. [Anc-Same-Trait] is the paper's own form.
- P-44: the team's `AnyIntegral` extended `QQ` (`a874948ac:Library/FortressLibrary.fsi:406`), and the prelude has none. The closure is read as the Types chapter reads a clause (`types.tick:384-389`). It is an addition in the area of closed types, which the paper leaves out.
- P-46: promotion fills a gap where no team text speaks.
- P-47: it takes the prelude's own `MIN`, `MAX` and `MINMAX`, built alike on each integer type.
- P-48: Steele's `fail(s: String): Zilch` (`0886e9654`, 2011-06-13) passes the test. But the later texts make `Bottom` inexpressible (`types.tick:151-153`; `lang.tex:236`), and [Solve-Step] is P-48's rule.
- P-49: the team's checker tried the expected type first (row 508). I found no team message or text that states that order as a rule.
- P-50: it fills the inference gap, and no team code or text speaks against it.
- P-51: as P-50.
- P-52: it is a library body with no prelude counterpart and no later word.
- P-53: as P-52.
- P-54: as P-52. The prelude has no `QQ`.
- P-55: the team's Q&A gives the reading of sizes (`Specification/appendices/internal-document.tex`).
- P-56: the prelude has no open range, and the decision follows from P-77 and P-42.
- P-57: as P-52.
- P-58: the prelude's `import java` is how the compiled path binds Java. The 2012 restart still lists, in a comment, a "Foreign function interface (esp. with respect to Java)" as an appendix to come (`Prose/Appendices/appendices.tick:20`). P-58 already uses the compiled path's static helpers.
- P-59: as P-12.
- P-60: the coverage widens the Types chapter's "covered by the union" and Steele's 2012 covers check (`59fdeff62`). It is an addition beyond the paper's proof, recorded, and question 2 of the rules map is open.
- P-62: variance is the Types chapter's and the paper's own road.
- P-66: it is a principle of the build, and no team word is in question.
- P-67: it is the specification's rule and IEEE 754's.
- P-68: the prelude's `RR64` brackets fail the test. They first appear in a parentless snapshot (`9f63f9859`, 2012-04-09), `RR32` has none, and `floor` and `ceiling` are commented out.
- P-69: the prelude declares no shifts.
- P-70: it is the specification's rule.
- P-71: it is a defect fix on both paths.
- P-72: it follows the team's test `UnsignedTest.fss`.
- P-73: it is the specification's rule, and the compiled path already raised the error.
- P-74: it takes the prelude's `coerce` from each narrower type. The prelude's lack of an integer-to-float coercion is a stated temporary state. Maessen wrote that the two "can't be commingled at all at the moment" (`116e5e6fa`, 2009-08-21).
- P-75: the rule does not move it. Its conflict with P-74 stays the open point of `type-decisions-review/judgement.md`, V7.
- P-76: it takes the prelude's `IntLiteral`, a working design.
- P-80: the sign-refined types are Working Draft text that no later team text revives.
- P-84: the library's `nat` sizes and the team's `Unbox.java` point the same way.
- P-89: the prelude's two `fill`s are on a monomorphic `ZZ32Vector`. At a generic element type bounded by `Any`, the pair breaks the team's own overloading rules.
- P-90: both libraries make `Nothing` generic. The prelude has `NoneObject[\E\]`.
- P-91: the compiled default is a stub by its author's words, "this can't be right! DRC" (`a874948ac:ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:38`).
- P-97: it takes the two parts of the 2012 Types chapter.
- P-98: the prelude's lack of `MIN` and `MAX` on comparisons is a workaround by its own words, "ought to be provided by" (`a874948ac:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1408`, `:1410`).
- P-147: Steele's 2012 abstract-method check and Welterweight's Covered rule.
- P-149: the specification's text and Welterweight. No later team code takes Scala's way.
- P-151: the three `where` forms are the team's own. The paper has no `where` clauses, so they are additions.
- P-152: existential reduction is the 2011 paper's and the POPL paper's own form (Fig. 6).
- P-153: option 3 keeps it as it reads.
- P-154: conditional extension reconciles the team's own `List` and `LexicographicOrder`. Chase's BirdyLib `List excludes AllStandardTotalOrders` (`d212b4643`, 2012-06-27, "to permit a particular overloading") is a device of a demo's library. In the paper, the condition would need a method F-bound, which restriction (2) forbids, so the form is an addition.
- P-155: the team's skip of symbolic operators has no stated reason, and the Working Draft calls the subscript pair "not really a valid overloading".
- P-157: the exclusion test reads `self` as the team's checker read it from 2009 (`XXX10k.test`), and it reads bounds as the paper's reduction does. Its source moves to the clause if section 1's default lands.
- P-158: it takes Chase's 2012 export check.

## What I could not settle by reading

- Whether the team's reading of `self` from a clause gives Return Type Rule errors on the flat library, as the 18 errors on `CMP` that the self-type probe found when it gave `self` the intersection in the signatures too (`self-typed-bodies-judgement.md`). The probe of section 1 settles it.
- Why Steele removed the F-bound on 2012-06-06. His message speaks only of the covers check. The team's rule in `Compiled10.k.fss` makes the bound redundant, which may be the reason.
- What form the paper would accept for `SUM` over a self-typed algebra. Neither the paper nor any team text gives one.
- Who wrote `Equality[\T\] comprises T` and when: it first appears in a parentless snapshot of 2011-12-06.
- Whether the inference decisions (P-46, P-49 to P-51) have a team rule that I missed: I searched the commit messages of `Functionals.scala` only.
- I ran nothing. Each "would change" above is a reading.
