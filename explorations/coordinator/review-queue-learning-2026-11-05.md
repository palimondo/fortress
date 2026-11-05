<!-- The review queue's learning items, moved out of explorations/coordinator/review-queue.md at its cleanup of 2026-11-05: the 117 decisions that landed at a default that no planned work needs the curator's word on again, by theme, each with its number, its title, the default as landed and a plain account of what was decided, as the material for a page that he reads to learn what the workers changed in what a program does and in how the language reads. The verdicts are three sort workers' on the queue of `40826f355`, checked by a judge; the accounts are the sorts' words. Each item's whole text, with the other way, its cost and its home, is in the queue at that commit (`git show 40826f355:explorations/coordinator/review-queue.md`). -->

# What was decided: the review queue's learning items, 2026-11-05

Each item below is a decision that landed at a default while a batch ran, and that nothing in PLAN needs his word on again. It is here so that he can see what changed, not to review it. One word of his still changes any of them; the number names it. "Landed" is the default as it stands; the second line says what was decided and why, in plain words, with a Fortress example where one helps, and an entry of the record or a ledger row in brackets at its end.

## The compiler's type checker: typing and inference (7)

- **4. Does the inference chapter solve a call's type parameters together?**
  - Landed: No default on record. Walk's answer is pinned by a plain test (row 613), and the chapter's box for the interpreter says nothing of the case.
  - What was decided: For `loneT[\S, T extends S\](a: T, b: T, s: S)` called with an Apple, a Pear and a Pear, the interpreter solves the two type parameters together and gives both `Fruit`; read one parameter at a time, the inference chapter would give `S` the type of `s` alone and leave `T` with no instance. No rule was chosen: the interpreter's answer is held by a test and the chapter says nothing of the case. [row 613; F-141]
- **5. Do `try`, `catch` and `atomic` bodies take the expected type?**
  - Landed: No: the checker gives them no expected type, and joins the `finally` block's type into the `try`'s, which the text does not. The chapter's "not yet described" item names them.
  - What was decided: A `typecase` clause and a `label` body take the expected type of the whole expression, by his ruling; a `try` block with its `catch` clauses and an `atomic` body do not, and the compiler's type checker also joins a `finally` block's type into the `try`'s type, which the text does not. The inference chapter lists them among the contexts "not yet described". [`compile-ladder/rung-checker-contexts/REPORT.md`, section 10]
- **52. How the checker ranks a generic declaration among those reached only by coercion.**
  - Landed: As built, a judge's choice under a silent text, on the ground of his conversion decision.
  - What was decided: When a call can reach several declarations only by converting its arguments, and some are generic, the checker ranks them by their declared parameter types where those compare, and otherwise by the order that the coercion chapter gives on their instances. The text says nothing here; this order keeps a plain declaration ahead of a generic one's narrow instance, as his rule that a conversion never changes which declaration runs requires, and keeps `ZZ32` ahead of `ZZ64`. [P-46]
- **53. What the checker reports when no attempt at a call holds: the first attempt that has a candidate.**
  - Landed: As built, so that a binding reports a call the rule accepts.
  - What was decided: The checker tries a call in up to four ways (plain, with inferred static arguments, with coercion, and so on); when all fail, it reports the first way that had a candidate declaration, so the message names a call the rule could accept. Only one compiled test's message depends on it.
- **55. A `spawn` inside an `atomic` body is refused also inside a typed function expression there, by where the code is written, as the team's checker reads it.**
  - Landed: Refused; the program crashed the checker before.
  - What was decided: A `spawn` written inside an `atomic` block is a static error, and the checker now finds it also when it sits inside a function expression written within that block, by where the code is written; before, such a program crashed the checker. No compiled program gains or loses a run, since the code generator has no `spawn`.
- **175. Where a conditional extension's condition holds: the other `extends` entries.**
  - Landed: As ruled: a conditional entry's condition holds in that entry and in the members only (P-151; `Specification/basic/trait-parameters.tex:371-378`). Default, taken: as ruled.
  - What was decided: A trait or object may extend a type only under a condition; each such conditional entry is now checked with its own condition, and the members with all the conditions. So `object Bad[\E\](x: E) extends { Wrap[\E\], Shows where { E extends Ord[\E\] } }`, which the first version of this check accepted and whose run then died at link time, is refused again, as it was before conditional extension was built. [P-151; `Specification/basic/trait-parameters.tex:371-378`]
- **176. Where a conditional extension's condition holds: the header.**
  - Landed: Ruled by the review's judge and repaired (`5b11849c6`): the header is checked with the declaration's own `where` clause only, and the entries, the value parameters and the members with the conditions (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:192-236`). An object's contract never reaches the checker, since the disambiguator drops it (row 781), so `Decls` is unchanged and the ruling's contract test waits on that row. Default, taken: as repaired.
  - What was decided: A declaration's header (its static parameters and their bounds, its own `where` clause, `throws`, contract, `excludes` and `comprises`) is checked with the declaration's own `where` clause only; the conditional `extends` entries, the value parameters and the members are checked with the conditions. So an `excludes` entry, a `comprises` entry or a bound that is well formed only under a condition is refused again, as the checker refused it before the extension was built. Item 177 holds the one open part, the value parameters. [`5b11849c6`]

## Overloading: when declarations may share a name, and which one a call takes (12)

- **7. An identical coercion on every candidate.**
  - Landed: No: an "Ambiguous coercion" error, batch N's rule. The text also says that covering does not choose between two coercions, so the three declarations are not a valid overloading; the checker accepts them (row 391) and refuses the call.
  - What was decided: Overloads `choose(S, ZZ64)`, `choose(T, ZZ64)` and `choose(V, ZZ64)` called with a `ZZ32` all need the same conversion of the second argument, yet the compiler's type checker refuses the call as an "Ambiguous coercion" rather than typing it by the intersection of their return types. The three declarations themselves are accepted, though the text says that covering does not choose between conversions. [row 391; `Specification/advanced/overloading.tex:320-322`]
- **8. Coverage of functional methods below the providing type.**
  - Landed: As the text and the checker have it.
  - What was decided: Whether two functional methods over closed traits cover their overlap is judged in each type that provides both, over what that type itself provides. So a trait that sits between the two closed traits, provides both methods and declares nothing of its own is refused by the compiler and runs under the interpreter; the compiler's verdict can also depend on what the same run compiled before, so no test holds it. [row 547]
- **10. A written static argument on a name with a generic and a plain declaration.**
  - Landed: No rule. Walk's answer is pinned by a test.
  - What was decided: For `op[\ZZ64\](z, w)`, where `op` has both a generic and a plain declaration, the interpreter runs the generic declaration at `ZZ64` and compiled code runs the plain one. No rule was chosen; the text says nothing of a static argument written on such a name, and the interpreter's answer is held by a test. [row 504's notes; `ProjectFortress/tests/DispatchWrittenStaticArgWalk.fss`]
- **11. A family that mixes a function with functional methods.**
  - Landed: The Working Draft's text; the ledger row alone records it. Climb batch 21's rung S made `String`'s four families top-level operators alone, not beside `String`'s abstract functional `||`, since both paths refuse that mix (row 545; `compile-ladder/rung-symbolic-library/REPORT.md`, section 12, decision 2).
  - What was decided: A family of overloads over two closed traits that mixes a top-level function with functional methods is refused on both paths, since the chapter's rule for functions and its rule for functional methods both apply and neither says which governs. `String`'s concatenation families were made top-level operators only, to avoid the mix; the check of symbolic operators, now on, found no other such family in the library. [row 545; F-281]
- **13. The approved `comprises` check decides by names.**
  - Landed: The code as approved; one face gated by an expected failure (row 489).
  - What was decided: The 14 lines of the compiler's `comprises` check that he approved decide by how an extending type spells its type variable and by simple names: an unrelated trait of the same name counts, and a false clause can pass. The defect is recorded and one face is held by a test of the failure; nothing on microGPT's path waits on a repair. [rows 489, 490]
- **57. The checker's Return Type Rule is stricter than the paper where the more specific declaration's domain is an object type (row 542).**
  - Landed: The refusal, his decided construction for answer 9; gated.
  - What was decided: Where one overloaded declaration is more specific than another, its return type must fit the other's; the checker checks this over every instance of a generic declaration, and so also refuses a generic declaration beside a plain one whose parameter is an object type, a case the paper's rule would let through. That is the construction he chose when he decided how overloads may differ in their static parameters, and no library declaration is refused by it. [P-45; F-75; row 542]
- **59. The coverage check reads a functional method's self type by its trait, so that functional methods declared in the closed traits are covered.**
  - Landed: As built; it worked.
  - What was decided: When the checker asks whether a set of overloads covers every case of a closed trait (one with a `comprises` clause), it reads the `self` of a functional method declared inside each listed trait as that trait, so such methods count toward the cover.
- **63. The per-provider Meet Rule compares the `self` parameter as the dotted rule compares a receiver, wherever it sits.**
  - Landed: As built; it cleared six `IN` sites.
  - What was decided: When a type inherits overloads of one operator from several traits, the checker's check that any two of them have a declaration at their meet treats the `self` parameter of a functional method, wherever it sits in the parameter list, as it treats the receiver of a dotted method. This cleared six refused `IN` declarations in the library.
- **65. The checker's half of row 597 reads every closed trait above an object expression, one step beyond the row.**
  - Landed: As built, upheld under the traits chapter.
  - What was decided: When an object expression, `object extends T ... end`, extends a trait below a closed trait, the checker checks it against the `comprises` clause of every closed trait above it, not only those it names, as the traits chapter reads.
- **66. The checker checks a widening `override`'s return type at every instance.**
  - Landed: As built, read from the traits chapter; pinned.
  - What was decided: An `override` that widens an inherited method's parameter types, say from `ZZ32` to `Number`, must still return a type that fits the inherited method's return at every instance; before, every such widening `override` was refused. An object below a trait that declares an inherited method `abstract` again must now define it. No library declaration is refused.
- **228. Is the type group's paper of 2011 the reason for P-152?**
  - Landed: The entry's reason as it reads: "Why: the type group's 2011 paper decides exclusion between parameter types with static parameters by existential reduction (`Papers/Types/exc-reduction.tick`; P-26, the type group's later word outweighs the specification's early text), as the revised specification states (`Specification/advanced/overloading.tex`, "Declarations with Static Parameters")." Default: as it reads, until he answers.
  - What was decided: Two generic declarations whose parameter types exclude each other only as a whole form a valid pair on both paths: in `o[\T\](x: P[\T\], b: Box[\T\])` beside `o[\T\](x: Q[\T\], b: Box[\T\])`, `b` fixes one `T` for both, so no argument fits both declarations. He chose this on 2026-10-17 without giving a reason; the reason the entry now gives, the type group's 2011 paper on existential reduction, was written in after a review found that the earlier reason was the revival's own text. The reason can be struck at any time; the rule is built either way. [P-152; `14e91723f`]
- **276. Is the coverage condition in P-60's reasoning a requirement?**
  - Landed: Applied at `4d7df29c3`, at his word of 22:12 UTC, without his review of each change. The coordinator's default, as applied: the drafted text: the condition moves before the "Why" as a requirement; the "Why" says that the addendum shows soundness for coverage used only so, and that a call that needs a coercion is outside the proof too (F-76); the entry ends with rows 543 and 551, the parts that the tree lacks.
  - What was decided: P-60 now states as a requirement, not as reasoning, that the compiler's type checker uses coverage of closed traits only in its overloading rules, to accept an overload set and to justify a call's tie among several most specific declarations, and never in its general subtype test: the soundness proof covers only that use, and a call that needs a coercion is outside it too. This was the coordinator's default, applied at his word of 2026-10-22 without his review of each change. [P-60; F-76; rows 543, 551]

## The interpreter's checks when it loads a program (8)

- **15. Which `comprises` clauses walk checks at load.**
  - Landed: The main component only.
  - What was decided: When the interpreter loads a program it checks the `comprises` clauses of the main component only; the compiler's type checker reads every clause. Checking every clause under the interpreter would refuse every program that imports `Reflect`, and four team tests and two demos that extend `Number` or `Exception`. [rows 551, 595, 596, 597]
- **69. Which reading of "overridden" decides what a type inherits: walk counts only what the type's own `override` declarations override (row 615); the checker now agrees.**
  - Landed: As landed, pinned on both paths.
  - What was decided: A type inherits a declaration unless one of its own `override` declarations overrides it; an `override` somewhere else in the hierarchy does not hide it. Walk and the compiled checker read it this way, each pinned by a test. [row 615]
- **70. The chapter's clause on equal parameter types names no `self` position; walk reads it at the same position, as the checker does.**
  - Landed: As landed.
  - What was decided: When the traits chapter compares two declarations' parameter types, walk compares the `self` parameter at the same position, as the compiled checker does.
- **71. Walk refuses at load a program that names an undeclared type in a `typecase` arm, where it failed at run time only when the arm ran.**
  - Landed: As landed, through the shared disambiguator; the suites stayed green.
  - What was decided: A `typecase` arm that names a type no one declared is now refused when walk loads the program; before, it failed only when that arm ran. Example: `typecase x of Foo => 1 else => 0 end`, with no `Foo` declared, no longer loads.
- **72. A program's own reduction whose `simpleJoin` is declared at `Any`, the team's old spelling, is now refused at load; it ran on the base.**
  - Landed: As landed; no gated test or demo declares one, and a test pins the refusal.
  - What was decided: A reduction that a program declares must give its `simpleJoin` at its own types; the team's old spelling at `Any` ran before and is refused at load now. No test or demo declares one, and `ProjectFortress/tests/ReductionSimpleJoinAtAnyWalk.fss` pins the refusal.
- **73. An `override` at the inherited declaration's own parameter types overrides nothing, as the chapter's "strict subtype" says.**
  - Landed: Strict, built at the default given on the standing go; the top-tier check reads it as the standard as written, needing no decision.
  - What was decided: In Fortress an `override` declaration must widen the inherited parameter types (the chapter's "strict subtype"); one at the same types overrides nothing, and walk refuses the program at load, "does not override any inherited declaration". A plain redeclaration, without `override`, is the way to replace a method at the same types. Example: `trait A f(x: ZZ32): String = "A" end` with `object B extends A override f(x: ZZ32): String = "B" end` is refused (`ProjectFortress/tests/OverrideEqualTypesWalk.fss`). The compiled checker has no check of the modifier yet (row 653).
- **74. At an instance of a generic trait, an `override` whose types equal the inherited declaration's only there is not an error.**
  - Landed: As built.
  - What was decided: Walk checks an `override` once, at the generic declaration's own static parameters, not again at each instance; so an `override` that happens to equal the inherited types at one instance is accepted. [F-147]
- **75. A generic declaration's `override` at its parameter `T`, over an inherited declaration at a type below `T`'s bound, is a static error.**
  - Landed: As built; no program in the tree writes it.
  - What was decided: An `override f[\T extends Number\](x: T)` over an inherited `f(x: ZZ32)` is refused, even though some instances would override; no program in the tree writes it.

## The interpreter's choice of declaration and instance (7)

- **18. Walk's choice when another declaration applies without coercion.**
  - Landed: The base's choice, gated by an expected failure (row 589).
  - What was decided: With `g(a: Any, b: Any)` beside `g[\T extends Fruit\](a: T, b: T)`, a call with an Apple and a Cherry, which share more than one closest supertype, runs the plain declaration under the interpreter, as it did before; the generic one is not weighed at its bound. The unbounded pair is now refused at load by the No Duplicates Rule. [row 589; F-141]
- **19. The open type wins at dispatch.**
  - Landed: As landed; the tuple face pinned by a test.
  - What was decided: Under the interpreter, a type parameter whose bound names itself stays open when nothing fixes it, and a declaration over that open type is then the most specific: in a `Holder[\OPEN\]`, `take(x: T)` runs for 3 where `take(x: ZZ32)` ran, and accepts a string that it used to refuse. For tuples it goes the other way: `pick(x: Any)` wins over `pick(x: (T,T))`. Writing the static argument avoids both. [row 663]
- **83. Walk prints the open type as `OPEN`, as in `BoxU[\OPEN\]`.**
  - Landed: `OPEN`.
  - What was decided: Where walk cannot fix a type parameter, it now leaves it open, and prints it as `OPEN`, as in `BoxU[\OPEN\]`. The word can be renamed at any time.
- **84. With a `where` bound on an unbounded static parameter, walk now runs `p(x: ZZ32)` for `p(3)` where it ran the generic (row 692, fixed).**
  - Landed: As landed, following the overloading chapter.
  - What was decided: A `where` clause that bounds one trait's static parameter no longer leaks onto an unrelated declaration's parameter. Example: beside `trait W[\T\] where { T extends ZZ32 } ... end`, the overloads `p[\U\](x: U)` and `p(x: ZZ32)` now run the `ZZ32` one for `p(3)`, as the overloading chapter says (`ProjectFortress/tests/WhereBoundOverloadWalk.fss`). [row 692]
- **85. Walk promotes from run-time types, so where a variable is declared wider than its value the two paths run a generic at different instances (row 509).**
  - Landed: As landed; the values agree.
  - What was decided: Walk has no static types, so where a variable is declared wider than its value, say `x: Number = 3`, walk instantiates a generic call at the value's type and the compiled path at the declared one; the two run the same generic body at different instances, and the values agree. [P-46; F-137]
- **87. Answer 8's promotion reaches user-declared coercions, so a call's arguments can be converted by a program's own `coerce`.**
  - Landed: As landed; both paths agree.
  - What was decided: When a generic call's arguments have different types, both paths may convert them by a `coerce` that the program itself declares, not only by the library's, to reach a common instance.
- **210. Walk fixes an unwritten reduction's type parameter by its elements.**
  - Landed: As built (`20474c144`; F-228). Walk values that change, each to the specification's: an empty unwritten list comprehension is a `List[\Any\]`; `xs: List[\ZZ32\] = <| 2 k | k <- 0#3 |>` runs where walk refused it; `emptyRSum(0)`, declared `RR64`, is `0.0` where it was the integer `0`; `Set`'s unwritten `BIG UNION` runs where it stopped. Not yet before him: a hint that does not fit falls back quietly to the unhinted instance, so `u: Number = SUM[j <- 0#3] j` is `3 : Int`. Default: as built.
  - What was decided: When a reduction or a comprehension leaves its static argument unwritten, the interpreter fixes it by the declared type of the expression's value, else by the common supertype of its elements' run-time types, else by its bound, where it used to give the empty type. So `xs: List[\ZZ32\] = <| 2 k | k <- 0#3 |>` now runs, and `emptyRSum(0)`, declared `RR64`, is `0.0`, not `0`. Not shown to him before: a declared type that does not fit is dropped quietly, so `u: Number = SUM[j <- 0#3] j` is the integer 3. [F-228; `20474c144`]

## Numbers and numerals (14)

- **23. May a program extend `Number`?**
  - Landed: The library's clause kept; walk does not check it yet.
  - What was decided: `Number` is closed by a `comprises` clause in the library, so a program may not add its own number type below it; the specification gives `Number` no such clause. The team's test that says "We ought to be able to extend the builtin type Number" still runs only because the interpreter does not check the library's clauses at load (item 15). [rows 551, 596; `ProjectFortress/tests/extendNumber.fss:15`]
- **24. A float compared with NaN.**
  - Landed: False, as `RR64`'s own `<` does; the tuple comparisons follow it (row 672).
  - What was decided: A float compared with NaN by `<`, `<=`, `>` or `>=` answers false on both paths, as `RR64`'s own `<` does and as the rational chapter says "for compatibility with floating-point arithmetic"; the tuple comparisons follow it. The overview of operators says such a comparison raises `FloatingComparisonError`; both libraries declare that error and nothing raises it. [row 672]
- **25. ℚ's infinities, and `check` on `QQ`.**
  - Landed: No default. The chapter as batch 6 revised it; `QQ` as it is. His later ruling that `QQ`'s `ceiling` and `truncate` raise at the infinities stands.
  - What was decided: The number chapter as revised reads ℚ as holding +∞, −∞ and 0/0, so ℚ is neither a field nor totally ordered, and `QQ` no longer inherits `check` and `check_star` from `RR64`. His ruling that `QQ`'s `ceiling` and `truncate` raise at the infinities stands. No other way was chosen; today's chapter and library stand. [`reviews/batch-6-conformance.md`, finding 1]
- **28. A numeral within half an ulp of a tie.**
  - Landed: As both paths do it, gated by an expected failure.
  - What was decided: A numeral with a decimal point is rounded as its nearest double, not as the rational number it denotes: `round(2.50000000000000001)` is 2, not 3, on both paths. A test records the gap; no other way was chosen. [row 360]
- **89. A `ZZ32` with an `NN32` promotes to `ZZ64` on the one library (answer 8); `ZZ` on the compiled prelude until the switch-over.**
  - Landed: As landed on both paths.
  - What was decided: Neither `ZZ32` nor `NN32` holds every value of the other, so an operation on one of each, as `a + b` with `a: ZZ32` and `b: NN32`, runs at `ZZ64`, the narrowest type that holds both; the compiler's own prelude gives `ZZ` until the switch-over removes it. [P-38]
- **92. The float numeral is unchanged by the numeral switch.**
  - Landed: As landed.
  - What was decided: On the compiled path, integer numerals such as `3` now have their own type, which converts to whichever integer or float type a call needs (under walk a numeral is still a `ZZ32` until walk takes the checker's static types); numerals with a radix point such as `0.5` do not, and stay as the team left them.
- **94. `Integral`'s api `unsigned` was removed, and `ZZ64`'s api states its body's type.**
  - Landed: As landed, kept by the judge.
  - What was decided: The `Integral` trait no longer declares `unsigned` in its api, since its one declared return type would refuse a valid program; each integer type states its own, as `ZZ64` does.
- **96. A numeral too large for every declaration of a call is refused.**
  - Landed: Refused.
  - What was decided: If no overload of a call takes a numeral's value, as `f(5000000000)` with only `f(x: ZZ32)` and `f(x: NN32)`, the checker refuses the call, rather than choosing the narrowest declaration whose type would hold it.
- **97. A numeral converts only into a type that holds its value (row 325's faces).**
  - Landed: As gated.
  - What was decided: A numeral becomes a value of a type only if that type holds it, so `x: NN32 = -1` is an error; on the compiled path today that error comes at run time, where the specification makes it static (row 325, open).
- **196. A `ZZ` power beyond the 32-bit range raises `IntegerOverflow` under walk.**
  - Landed: As built. The skeptic reads the text as giving it already: "For integer results, overflow throws an IntegerOverflow", and the shift entry on `ZZ`, "a result too large for the implementation to represent throws an IntegerOverflow".
  - What was decided: `ZZ` has no fixed width, but a `ZZ` or numeral power whose exponent is beyond 2^31−1, or whose result Java's `BigInteger` cannot hold, raises `IntegerOverflow` for every base but 0, 1 and −1, as the operators chapter's "overflow throws an IntegerOverflow" reads.
- **201. The numeral type's `^` answers the numeral type (fork 10).**
  - Landed: As probed and landed.
  - What was decided: Each integer type's `^` answers its own type, the numeral's too, so `2^(-1)` throws as it does for `ZZ32`, rather than giving `0.5`; a fraction comes from a float or rational base. [P-153; P-76]
- **336. Does the specification's "division by zero produces a NaN value" for floating-point results mean NaN, or IEEE 754's infinity for a nonzero dividend, which both paths give and the team's code relies on (row 863)?**
  - Landed: The row `CONTESTED`; both paths give the infinity. Default: the row as it is; if IEEE 754 governs, a later prose rung revises the sentence.
  - What was decided: A floating-point division of a nonzero number by zero gives an infinity on both paths, as IEEE 754 says and as the team's `infinity : RR64 = 1.0 / 0.0` relies on, though the specification's sentence says it "produces a NaN value". The conflict is recorded; a later revision of the sentence is the default if IEEE 754 governs. [row 863; `Library/Constants.fss:17`]
- **344. Which reading of `nextUp` and `nextDown` at a signed zero governs on `RR64` and `RR32` (row 880)?**
  - Landed: Today's values, asserted by `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss`. Default: today's values.
  - What was decided: On `RR64` and `RR32`, `nextUp(-0.0)` is `0.0` and `nextDown(0.0)` is `-0.0`, since the team's `DirectedRounding` steps in IEEE's total order; IEEE 754-2008's nextUp of −0 is the smallest subnormal, as Java's `Math.nextUp` gives. A test asserts today's values; no directed rounding reaches the case. [row 880]
- **348. Should a later rung give `ZZ`'s `CHOOSE` the specification's 0 at `k < 0` or `k > n` for a natural `n` (row 887)?**
  - Landed: The glue's 1 kept, pinned by `ProjectFortress/tests/XXXChooseZZOutOfRangeWalk.fss:9`. Default: as landed.
  - What was decided: `ZZ`'s `CHOOSE` answers 1, the old glue's value, where the specification's zero rule and the four fixed-width types answer 0 (at `k < 0`, or `k > n` for a natural `n`); the value was kept when the binding moved onto a helper, with a test that records the gap. One guard would give 0. [row 887]

## Sizes and arrays (5)

- **32. Two size parameters that may be equal.**
  - Landed: Kept, gated by an expected failure (row 683, contested).
  - What was decided: In `two[\nat a, nat b\]` the compiler's type checker counts `a` and `b` as different sizes, so a `typecase` arm that needs them equal is refused as unreachable, though the team's own Q&A reasons that a parameter may equal what it may be instantiated at. A test records it, and nothing on the path builds on it. [row 683]
- **98. Under walk, a size written as arithmetic is refused at any operation that leaves `ZZ64`.**
  - Landed: As landed.
  - What was decided: A size such as `n + m` in a type is computed exactly enough for `ZZ64`; any step that leaves `ZZ64` stops the program with an error rather than wrapping silently. No program writes such sizes; the item's premise that the checker refuses all size arithmetic no longer holds.
- **198. The casts of `Vector` and `Matrix` rely on `replica`.**
  - Landed: As landed. Default (the post-batch review's; none on record): no new statement in the library.
  - What was decided: The library's vector and matrix operations (`+`, `-`, unary `-`, `scale`, `pmul`) now build their result through the argument's `replica` and cast it back; a user type extending `Vector` whose `replica` answers a plain array gets `CastError` there, where it once got that array. [F-264]
- **199. `Array2`'s column and row subscripts not in the api.**
  - Landed: Declared by climb batch 21b's rung E with the second export error's work, which aligned the api with the component trait by trait, as the default (climb batch 20's post-batch review's) asked (`Library/FortressLibrary.fsi:1730-1731`; `coordinator/CLIMB-BATCH-21.md`, section 2, fork 22).
  - What was decided: The api now declares a matrix's whole-row and whole-column subscripts, so `m[:, j]` (column `j`) and `m[i, :]` (row `i`) are visible to a checker that reads the api, not only to walk (`Library/FortressLibrary.fsi:1729-1730`). [row 465]
- **202. The api's `immutableArray` of rank 2 and 3 put in a comment (fork 5).**
  - Landed: As the patch: the built side wins, by the library's own standard.
  - What was decided: The library has no immutable arrays of rank 2 or 3, so the api's factories for them, which no program could call, are in a comment (`Library/FortressLibrary.fsi:1531-1534`) and leave the library chapter that renders the api.

## Ranges (5)

- **102. `MIN # 0` builds the library's own empty range, so its printed bounds are not the ones written.**
  - Landed: As landed.
  - What was decided: A range of length zero, written `MIN # 0` or the like, is now the library's one empty range, so its printed bounds are not those written.
- **103. Batch 9's range repairs turned runs that stopped into values.**
  - Landed: As landed.
  - What was decided: Under walk, `flip`, the subscripts of rank 2 and 3 with `bounds` and `indices`, a strided `seq`, shifts and `UniformDistribution` used to stop with an error and now give values.
- **104. The map of the full sequential ranges is a new object, not a `MappedGenerator`, so a reversed mapped range prints differently (row 603).**
  - Landed: The new string, elements and order unchanged.
  - What was decided: Mapping a function over a whole range, as `(0#4).map(f)`, now gives a new library object; its elements and order are unchanged, but reversing it prints differently. [row 603]
- **105. `(:) CMP (:)` answers `EqualTo`, where walk stopped.**
  - Landed: As landed.
  - What was decided: Comparing two whole open ranges, `(:) CMP (:)`, now answers `EqualTo`; walk stopped there before.
- **106. `truncL` and `truncR` are declared to return a bounded range, where the team declared ranges with a left or right end.**
  - Landed: As landed; the team's type is true, but no body can show it to the checker.
  - What was decided: `truncL` and `truncR`, which cut a range at one end, are declared to return a range bounded at both ends; the team's narrower types, a range with a left or right end, are true but no body could show them to the checker.

## The library: generators, strings, comparisons and reductions (21)

- **40. The fused big operator's declared type (item 46).**
  - Landed: The arm's result passed through `cast[\O0\]` (`Library/FortressLibrary.fss:1476`), the coordinator's call by the record, 2026-10-23, built by climb batch 22's rung R at `bd00ad997`; row 632 closed. Default: as built, the library's device for a branch whose type the `typecase` cannot show (F-264); the team's pattern stays, and so does when the arm fuses; no desugaring calls the function.
  - What was decided: The library's fused big operator, the fast path that combines a reduction with an outer one such as the maximum of sums, answered its input type where it declares its output type; its result now passes through `cast[\O0\]`, the library's device for a branch whose type a `typecase` cannot show. When the operators fuse is unchanged; widening the arm's pattern instead can be done at any time. [row 632, closed; F-285; `Library/FortressLibrary.fss:1476`]
- **109. `TotalComparison` extends `StandardMinMax`: he took it on recommendation and asked for a fuller explanation when he has the energy.**
  - Landed: As built; an explanation owed.
  - What was decided: The explanation he asked for: `TotalComparison` is the type of `LessThan`, `EqualTo` and `GreaterThan`; the library's `BIG MIN` and `BIG MAX` are declared only for types that extend `StandardMinMax`, the library's own device for "has `MIN` and `MAX`", so without that parent `BIG MIN [c <- cs] c` over comparisons found no declaration under walk (row 461). Adding the parent, as the library's other ordered types have it, makes them work and changes no other answer. [P-98]
- **111. A program's own `p1 ANDCOND p2` of two relational predicates is no longer a relational predicate under walk (row 458).**
  - Landed: As landed.
  - What was decided: A repair of the library's `Condition` declarations changed this under walk: combining two relational predicates with `ANDCOND` in a program gives a plain predicate, no longer a relational one. [row 458]
- **112. `fill` and `tabulate` sit where the array diamond meets, not in each leaf trait; since climb batch 20's rung A, `Vector` and `Matrix` also declare them at their own type.**
  - Landed: As landed; "his to confirm".
  - What was decided: `fill` and `tabulate` are declared where the array traits meet, so that a type inheriting from several array traits has one declaration; `Vector` and `Matrix` also declare them at their own type, so `v.fill(0.0)` on a vector gives a vector.
- **113. The factories' function forms are named `tabulatedArray1` to `tabulatedArray3` and `tabulatedVector`.**
  - Landed: As landed; "his to change".
  - What was decided: The array factories that build an array from a function of its index are named `tabulatedArray1`, `tabulatedArray2`, `tabulatedArray3` and `tabulatedVector`.
- **114. Batch 8's slip repairs changed walk values: mapped generators, `BIG MINMAX`, `split`, `avFlat`, `UniformDistribution`.**
  - Landed: As landed.
  - What was decided: Repairs of slips in the library changed what walk prints for mapped generators, `BIG MINMAX`, `split`, `avFlat` and `UniformDistribution`.
- **116. Batch 9's string repairs changed five walk values, and an implicit `:b:c` slice completes from the right end (row 609).**
  - Landed: As landed.
  - What was decided: Repairs of the string library changed five values walk prints; and an implicit slice `s[:b:c]` now counts from the string's right end. [row 609]
- **117. `String`'s default case-insensitive comparison uses the library's own `ensures` clause.**
  - Landed: As landed.
  - What was decided: `CASE_INSENSITIVE_CMP` on strings is defined as the library's own contract states it, not by a character case folding that no library string uses.
- **120. The `String` api exports `Concatenable`, `Balanceable` and `SubString`'s constructor header.**
  - Landed: As landed.
  - What was decided: The string api now exports three of the team's internal types, `Concatenable`, `Balanceable` and `SubString`'s constructor, so the components that build strings can name them.
- **121. Batch 10's rung N changed walk values.**
  - Landed: As landed.
  - What was decided: Under walk: `shouldRaise` when nothing is raised now throws a `ForbiddenException` that its own `catch` does not take; `assert` on tuples prints a `FAIL` line; `partition` at `ZZ64` is refused.
- **122. Batch 10's rung G made six declarations print what their bodies state, and turned an ill-typed reduction's 3 into a refusal.**
  - Landed: As landed.
  - What was decided: Six library declarations now print what their bodies say, and an ill-typed reduction that answered `3` is now refused.
- **125. `TransposedMatrix`'s `add`, `subtract` and `negate` type-check but nothing calls them.**
  - Landed: Kept as methods.
  - What was decided: A transposed matrix keeps three methods that now pass the checker though nothing calls them; its `+` runs `Matrix`'s operator, checked by its value.
- **126. A team declaration was removed: `__ImmutableSubArray1`'s `put`, which nothing calls.**
  - Landed: Removed.
  - What was decided: An immutable sub-array had a `put`, which nothing called and which contradicts immutability; it is removed, so such a call now fails at the call.
- **127. New library declarations, each shown its precedent line: batch 12's 16 range api declarations; batch 13's lazy `LEXICO` on `Comparison` and its `SimpleIndexValuePairs`.**
  - Landed: As landed.
  - What was decided: The library gained 16 range declarations in its api, a lazy `LEXICO` on `Comparison` and `SimpleIndexValuePairs`, each modelled on a declaration the team wrote.
- **128. `Reflect`'s `members` is now a list in declaration order, not a sorted set.**
  - Landed: As landed; the tuple bound required it.
  - What was decided: `members` of a reflected object now lists them in the order declared, not as a sorted set.
- **129. A slice of the default index-value pairs keeps each pair's index.**
  - Landed: Kept, as on the base.
  - What was decided: Slicing the index-value pairs of a list keeps each pair's original index, as before, rather than renumbering from 0 as a set's pairs do.
- **130. The default index-value pairs of a value indexed above 0 are indexed as the value is, while `ReadableArray`'s stay positional; the skeptic's fix changed two answers.**
  - Landed: As landed, which follows the arrays' own range subscript and the ranges chapter.
  - What was decided: For a value whose indices start above 0, its default index-value pairs carry those indices, following the arrays' range subscript and the ranges chapter; an array's own pairs stay positional. Two answers changed.
- **132. The relational predicate reads its target in its natural order, so `increasing((0#4).reverse)` now fails.**
  - Landed: As landed.
  - What was decided: A relational predicate such as `increasing` now reads a sequence in its own order, so `increasing((0#4).reverse)` is false, where it read positions 0 to n−1 before.
- **211. `LexicographicReduction.isLeftZero(Unordered)` is refused under walk since row 582's fix.**
  - Landed: The refusal (climb batch 13's rung O, `9ba86f7da`; its skeptic found it, `compile-ladder/rung-tuple-orders/SKEPTIC.md:142`, `:245`). Default: as landed.
  - What was decided: His answer on `isLeftZero` declared its `true` case over total comparisons, so `LessThan` and `GreaterThan` now answer `true` and `EqualTo` `false` (`Library/FortressLibrary.fss:122-123`); `Unordered`, a comparison that is not total, matches no declaration, and walk refuses `isLeftZero(Unordered)`. Nothing in the library calls it. [P-57]
- **213. The tuple comparisons, reopened (PLAN item 43; this list's item 38 until 2026-10-20).**
  - Landed: The tuple-comparisons judgement's way 1b (`reviews/tuple-comparisons-judgement.md`), built on the standing go while his answer was pending; 17 sites cleared. Two costs it did not weigh: `(1,()) < (2,())` answered true and is now refused; and walk refuses `(1,2) < (1,2.5)`, numbers of two types at one position. A pinned nested comparison, `((1,2),3) < ((1,3),0)`, is now refused too. Default: as built.
  - What was decided: The library's ten tuple comparison operators now require each element to be partially ordered, where they compared elements of any type, and `Comparison` gained a lazy `LEXICO`. His "Agreed." of 2026-10-20 took this without its costs: `(1,()) < (2,())`, true before, is now refused; the interpreter refuses `(1,2) < (1,2.5)`, two number types at one position; and the nested `((1,2),3) < ((1,3),0)` is refused too. A pair of floats stays ordered under every way; a `where` clause now buildable could lift the refusals at any time. [P-154; row 634, closed; `reviews/tuple-comparisons-judgement.md`]
- **269. P-78 says to write a reduction's static argument only where nothing fixes the element type; the worker skill and row 731 say to write it in every clause form. Which holds?**
  - Landed: Applied at `4d7df29c3`, at his word of 22:12 UTC, without his review of each change. The coordinator's default, as applied: the drafted text, which keeps his rule (write it where nothing at the call fixes the element type), says that the compiled checker fixes it from none of the generators, the body or a declared type and refuses every such `SUM` or `PROD` (row 731), and gives writing it in every clause form as row 731's workaround, apart from his rule.
  - What was decided: His rule: write a reduction's static argument where nothing at the call fixes its element type. Today the compiler's type checker fixes it from none of the generators, the body or a declared type, and refuses every such `SUM` or `PROD`, so the library and both microGPT programs write it in every form, as in the model's `matOffset(i: ZZ32): ZZ32 = SUM[\ZZ32\][j <- 0#i] matCount(j)`. [P-78; row 731]

## The library's native bindings (3)

- **309. P-58's "refuse a string that names no helper", read by climb batch 23's fork 3: only a string under the helpers' package is refused. Does he take that reading?**
  - Landed: Fork 3's reading, the rewrite and the refusal both keyed to the helpers' package. Default: as landed.
  - What was decided: On the compiled path a native binding's `builtinPrimitive` string is rewritten into a direct Java call, or refused when it names no such method, only when it names something under `com.sun.fortress.nativeHelpers.`. The 161 strings that still name the interpreter's glue classes stay plain calls, typed at their declared return type and checked against nothing, until they move; refusing them all now would stop the library before the move. [P-58; F-298; F-32]
- **311. The revised comment of `builtinPrimitive` has the compiler rewrite every body whose string names a helper, but rung C's rewrite leaves a declaration with a varargs parameter alone (row 849). Should the rewrite take, or refuse, such a declaration, or should the text name the exception?**
  - Landed: The text stands as rung W wrote it; the departure is row 849 (`CONTESTED`), named in the Effect of Appendix I's entry "A native binding that names a static helper" (`Specification/appendices/changes.tex:4499-4502`); `ProjectFortress/compiler_tests/XXXNativeHelperVarargsCompiled.test` pins today's refusal, since no test of the text's rule can pass while the departure shows (the review's finding 8). Default: as landed.
  - What was decided: A native binding with a varargs parameter is not rewritten into a helper call on the compiled path, though the revised comment says that every such body is; it stays a plain `builtinPrimitive` call, checked against no helper. Appendix I names the departure, and no library binding has the shape on a helper (the three in `Reflect` name glue classes). [row 849]
- **326. Climb batch 24's question 2, taken at the hard-set probe's default under his half-hour rule: the 76 bindings over `NN32`, `NN64` and `Char` read through the team's six transfers (way 2b). Does he take it, with its cost that the checker no longer checks which helper such a binding names?**
  - Landed: Way 2b, 93 bindings over `NN32`, `NN64`, `Char` and `UnsignedLong` moved, 76 by climb batch 24 and 17 by climb batch 25 (F-308); the count 0 and the distance 0 with them read through the transfers (`reviews/batch-25-review.md`, sections 1 and 6). Default: as landed.
  - What was decided: The 93 native bindings over `NN32`, `NN64`, `Char` and `UnsignedLong` reach their Java helpers through the team's six "trivial transfer functions", which the compiled path puts around each argument and result. Since those transfers return their argument unchanged, the compiler's type checker no longer checks which helper such a binding names: a binding over `NN32` pointed at the signed `intLT` compiles and answers true for 2^31 < 1. Tests on both paths check that each of the 93 names the unsigned helper, and a later family over these types needs such tests too. [F-308; `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:230-231`]

## The specification's text (18)

- **41. A `where`-clause variable in an `extends` clause (item 14).**
  - Landed: The sentence stands.
  - What was decided: The revised specification says that "a where-clause variable may not appear as a static argument in an extends clause". Its reason covers only a variable that may stand for more than one type; a variable pinned to one type by a constraint, as in `trait Foo[\S\] extends Bar[\T\] where {S extends Baz[\T\]}`, where each `S` extends at most one `Baz` and so gives one `Bar`, is allowed by the rule and refused by the sentence. Both paths refuse every such declaration today, so the text still describes what runs. This is the plain explainer he asked for; the sentence stands unless he narrows it. [`reviews/batch-5-conformance.md`, finding 4; `Specification/basic/trait-parameters.tex:339-344`]
- **133. The Meet Rule for dotted methods keeps its exact-meet form; Appendix I names the question.**
  - Landed: The Working Draft's form.
  - What was decided: Two overlapping dotted methods of one object or trait are still valid together only if a third method of that object is declared at exactly the intersection of their parameter types, as the 2011 Working Draft wrote it. The rules for top-level functions and functional methods were revised to the paper's reading, but no decision covered the dotted form, so it stays, and Appendix I names it as an open question (`Specification/advanced/overloading.tex:417-447`).
- **134. The `makeSet` example keeps the Working Draft's explanation, though under the chapter's rules the Return Type Rule refuses the pair.**
  - Landed: Unchanged.
  - What was decided: The overloading chapter still explains its `makeSet` pair as ambiguous at the call `makeSet(3, 4)`. Under the rules the chapter now states, one declaration is the more specific and the Return Type Rule, checked over every instance, refuses the pair where it is declared; the text was left as the team wrote it, since no decision asked for a new explanation (`compile-ladder/rung-spec-overloading/decision-record.md:90`).
- **135. Batch 7b's rung S revised three passages beyond its brief, as the decisions settle them.**
  - Landed: As landed.
  - What was decided: With the overloading chapters' revision, three further passages were rewritten to agree with the decisions: the sentence on when a dotted call is applicable, the chapter's assumption about a call's static variables, and the paragraph that promised the compiler can always identify the most specific declaration statically. That promise now carries an exception: where static parameters are involved, the most specific declaration may be known only at run time (`Specification/advanced/overloading.tex:79-91`).
- **136. The POPL recheck's five smaller sentences, as rung S wrote them.**
  - Landed: As landed; his decision on the instance lists them for review.
  - What was decided: Five short sentences tie the revised overloading text to the 2019 paper: a citation of its same-trait rule, the rule that compares two generic declarations position by position stated as a limit of the compiled implementation and not as a language rule, a note that the paper's soundness proof does not cover the library's `SUM`, `BIG MAX` and `Integral` families, a sentence on its main theorem, and the paper's default bound `Any` for a type parameter written without one (`compile-ladder/rung-spec-overloading/REPORT.md:108`).
- **137. Should the list of contexts name a block's non-last element, which the checker has always checked against `()`?**
  - Landed: The list unchanged.
  - What was decided: In `do f(x); g(y) end` every element but the last must have type `()`, and the compiled checker has always checked that. The inference chapter's list of the places where an expected type guides inference leaves this one out; it was kept as measured on the checker, with the other contexts named as not described.
- **138. The text keeps `HeapSequence` as the varargs parameter's type, with a box saying both implementations give `ImmutableArray`.**
  - Landed: The sentence unchanged.
  - What was decided: The specification says a varargs parameter `xs: T...` has type `HeapSequence[\T\]`, a type no library declares; walk and the compiled path both give it `ImmutableArray[\T, ZZ32\]`. The sentence stands with a revision box that says what both implementations do (`Specification/basic/functions.tex:179-185`).
- **139. Batch 7C's three wording choices in the `comprises` text, and the `SkTwoLevel` program the text refuses while walk runs it.**
  - Landed: As landed.
  - What was decided: A `comprises` clause is read at the level of values: every listed type must extend the closed trait, possibly through another trait, and a generic subtrait with the closed trait's own static parameters is allowed. The text, like both checkers, reads "every type that extends it" at the immediate extenders, so a program with a two-level subtrait whose every value is listed is refused although walk runs it (POSITIONS P-60).
- **140. Two notations: ℤ's factorial as a recurrence, and a midpoint as `lo + (hi − lo) DIV 2`.**
  - Landed: As landed.
  - What was decided: The integer chapter defines the factorial by `0! = 1` and `(m+1)! = (m+1) m!` in place of the Working Draft's product, and writes a midpoint as `lo + (hi − lo) DIV 2` in place of the team's `floorAverage`, which the one library does not declare.
- **141. A third passage, the adapted `BlockedRange`, was respelled over `ZZ32`.**
  - Landed: As landed.
  - What was decided: Since ranges became `ZZ32` ranges, the chapter on defining generators spells its adapted `BlockedRange` example over `ZZ32`, as the two earlier passages were, so that the example runs on today's library (`Specification/advanced/parallelism-locality/defining-generators.tex`).
- **142. ℚ's listing gained four algebraic traits, with a sentence on where their laws hold.**
  - Landed: As landed.
  - What was decided: The specification's listing of ℚ now extends the traits the library declares on `QQ`: `StandardPartialOrder`, `StandardMinMax`, `AdditiveGroup` and `MultiplicativeRing`. A new sentence says their laws hold for finite rationals and need not hold where `0/0` or an infinity takes part, as on `RR64` they need not hold with a NaN (`Specification/basic-lib/numbers.tex:224-231`).
- **143. `narrow` is stated on `ZZ`; `MaybeRungM`'s comment was reworded.**
  - Landed: As landed.
  - What was decided: The integer chapter now states `narrow` on `ZZ`, the conversion that takes an unbounded integer to a fixed width by truncation, as the library declares it; a test's comment was reworded to match (rows 349 and 442).
- **145. The text says a fixed-size `GCD` or `LCM` result that does not fit raises `IntegerOverflow`; walk does, the compiled half at the switch-over.**
  - Landed: As landed.
  - What was decided: A `GCD` or `LCM` whose result does not fit its fixed-width type raises `IntegerOverflow`, as all fixed-width integer arithmetic does. Walk does so on `NN32` and `NN64` today; the compiled path follows when it reads the one library at the switch-over (P-70; row 442).
- **146. The inference chapter describes type and size parameters only, naming `bool`, `dim`, `unit` and operator parameters as not described.**
  - Landed: As landed.
  - What was decided: The new chapter on inferring static arguments covers type parameters and the size kinds `nat` and `int`. It names `bool`, `dim`, `unit` and operator parameters as not described, rather than stating a general rule with refusals in a box.
- **147. Batch N's rung T's six text decisions in the inference chapter.**
  - Landed: As landed.
  - What was decided: The inference chapter now states how a call's static arguments are found: the declaration is chosen as coercion resolution describes; a lone type parameter takes the narrowest of its arguments' types and the types they convert to; where none is narrowest, as for a `ZZ64` and an `RR64`, it takes their union and nothing is converted. The expected type guides inference only in the listed contexts, and walk's inference from run-time types is stated in a box (`Specification/basic/inference.tex`).
- **190. `extends Any` read as `Object`, against the specification's own `Tuple`.**
  - Landed: The rule as built; name `Tuple` beside `Any` and `Object` when a library first declares it, and decide the algebraic roots with row 37 (the coordinator's default, as the post-batch review proposes).
  - What was decided: A trait or object declared `extends Any` is made an `Object`, as the traits chapter's rule says. The specification's own `trait Tuple extends Any excludes { Object }` and its algebraic roots such as `BinaryPredicate` do not fit that rule, but no library declares them yet; the default is to name `Tuple` beside `Any` and `Object` when a library first declares it. [`compile-ladder/climb-batch-19/RECORD.md`, gather.2]
- **200. The dimensions chapter's unit factors at a negative integer power.**
  - Landed: The chapter as the team wrote it. Default (the post-batch review's; none on record): leave it so, with a revision box that names the new rule, until a batch builds units.
  - What was decided: Since an integer raised to a negative power raises `IntegerOverflow` (P-153), the dimensions chapter's factors such as `2.54 × 10^(-2)` for the inch and `10^(-1)` to `10^(-24)` for the prefixes would raise if run. Dimensions and units are not built, so nothing runs them; the chapter stays as the team wrote it until a batch builds units.
- **333. The specification's `CHOOSE` property is false at `m = n = −1`. Restrict it to `m ≥ 0`, keep the text and record the conflict, or change the zero rule at a negative `m`?**
  - Landed: Nothing; the text stands. Default: no default on record.
  - What was decided: The specification's property `(m CHOOSE n) + (m CHOOSE (n+1)) = ((m+1) CHOOSE (n+1))` is false at `m = n = −1` under its own zero rule: `(-1) CHOOSE (-1)` and `(-1) CHOOSE 0` are 0, but `0 CHOOSE 0` is 1. Both paths follow the zero rule; no program states the property, and no way was chosen, so the text stands. [`compile-ladder/plan-24/probes/choose.md`, sections 2 and 9]

## Components and their apis (4)

- **291. May a component's function or method answer a narrower return type than its api declaration, as the specification allows (climb batch 22c's question 4, row 834)?**
  - Landed: The check's rule, as built, with row 834 (`CONTESTED`) and its reproducer `ProjectFortress/compiler_tests/XXXExportOperatorHeader.test`. Default: as landed.
  - What was decided: A component's function or method must declare exactly its api's return type: a narrower one, which the text allows, is refused by the compiler's export check, since a compiled call names the api's header and a narrower one would die with `NoSuchMethodError`. Appendix I names the departure; the library's lines already meet both rules. [row 834]
- **292. May a component rename an exported declaration's static parameter (row 836)?**
  - Landed: Equal names, as today, with row 836 (`CONTESTED`) and `ProjectFortress/compiler_tests/XXXExportOperatorStaticParamName.test` asserting the refusal. Default: as landed. The library writes one name on both sides.
  - What was decided: A component must name an exported generic declaration's static parameters as its api does: a component's `opr <->[\U\]` against an api's other name is refused, since compiled code names a generic template by its parameters and a client's call would fail to load it. The text names no rule; the library writes one name on both sides. [row 836]
- **293. May an api write `var` on an object's value parameter (row 838)?**
  - Landed: The syntax check's refusal stands, as row 838 (`CONTESTED`, reproducer `none`; the gated test it is owed is review-routed.2 under PLAN's "Climb batch 22c, listed for his review"). Default: none on record; the refusal stands. The post-batch review proposes as its default "the syntax check's refusal stands until he answers item 295", since the two are one question (its Part 4).
  - What was decided: An api may not write `var` on an object's value parameter: the team's parser refuses it, though the specification's api grammar admits it, and the prose says abstract field declarations take no `var`. The component may still write `var` there, as `OneShot( var canTryIt : Boolean )` does; item 295 holds whether the export rule allows that. [row 838]
- **294. Does a component trait's field satisfy an api's abstract getter, and an api's field a component's getter (row 842)?**
  - Landed: Way (a): an api getter written `abstract`, with no static parameters, parameters or `throws`, is matched by a component trait field of its name and type that is neither `hidden` nor `private` (the skeptic's `eee518f60`; `equalAbstractMember`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:864-870`; `ProjectFortress/compiler_tests/ExportAbstractGetterField`), on `Specification/basic/traits.tex:722-723` ('abstract field declarations that are implicit declarations of abstract getter methods'); the other direction refused, row 842 with `ProjectFortress/compiler_tests/XXXExportFieldByGetter`. Default: (a), as landed, and row 842 open.
  - What was decided: A component trait's field `x: ZZ32` satisfies the api's `abstract getter x(): ZZ32`, so such a program, which compiled and ran before the export check was made complete, still does; the other direction, an api's field met by a component's getter, which the text allows, is still refused. [row 842; F-297]

## Code generation and the run time (5)

- **44. `override` in the code generator.**
  - Landed: Refused; no default. A dotted call whose numeral needs a coercion keeps an overridden declaration (row 694).
  - What was decided: The code generator refuses a method declared `override`, so the team's `disp0.fss`, which the type checker now accepts, does not compile; what compiled dispatch does with a declaration that a type no longer provides is open. Neither the library nor microGPT declares an `override`. [rows 650, 694]
- **217. Is no defect of the compiler prelude repaired before the switch-over, or only five (P-38)?**
  - Landed: The entry as it reads: no prelude defect is repaired. Default: as it reads, until he answers. PLAN's line "The compiler prelude's own defects retire with it, each gated" (phase 4) plans the same for the prelude's range and `RR32` defects.
  - What was decided: The compiled path's own small library, the compiler's prelude, is not repaired: its known defects, such as its swapped wrapping and saturating operator spellings and its `ZZ64` shift, stay, each held by a test, until the switch-over deletes the prelude. Since 2026-11-03 the rule names the prelude's own text only: a Java helper that both libraries share, once fixed for the one library, changes the prelude's value too. [P-38]
- **334. The compiled `drandom` gives values that depend on the schedule above one thread. Must it be deterministic?**
  - Landed: The audit's (b): its draft row filed as row 876, and nothing else done. Default: as landed.
  - What was decided: The compiled `drandom`, whose name promises determinism, gives values that depend on how tasks were scheduled above one thread: a tree of tasks that draws at every node summed to three different values in three runs at four threads. It is no data race; only the compiler's prelude binds it, so it leaves at the switch-over; the interpreter's `random` is not reproducible by design, and microGPT draws no random numbers. [row 876]
- **341. A function or method whose own `where` clause introduces a `where`-clause variable compiles since climb batch 24's rung G, and its compiled call dies at run time (row 867). Should the code generator keep refusing that form until the template carries the variable?**
  - Landed: The form compiles; the deferred `XXX` run pair pins the crash, the record's course for the trait guard's `VerifyError` (fork 13). Default: as landed.
  - What was decided: A function or method whose own `where` clause introduces a new static variable now compiles and links, and its compiled call fails at run time with `NoClassDefFoundError`, where the code generator used to refuse it at compile time; the failure stays loud but moves from compiling to running. No library declaration has the form, and the refusal can be put back with one condition. [row 867; F-181]
- **349. The code generator's modifier guard now admits `test` on methods as well as on top-level functions. Keep the wider guard, or a narrower check?**
  - Landed: The wider guard, as the trait guard admits `test` for traits and objects (`Modifiers.java:146-149`). Default: as landed.
  - What was decided: A method may now be declared `test` on the compiled path, as on top-level functions: `test mt()` on an object compiles and runs. The specification's note speaks only of a top-level function of type `() -> ()`, but the parser already admits `test` on methods, and the guard follows the one that admits it for traits and objects (F-315).

## Tests and the team's demos (2)

- **304. Three lines of the team's tests that climb batch 22c's rung B rewrote to keep their checked values under the bound `Any`: does he accept each?**
  - Landed: Rewritten, each assertion kept (`1bc0a9083`); rung B also respelled nine of the revival's own compiled tests (the same section). Default: as landed.
  - What was decided: Since a type parameter written without a bound is bounded by `Any`, which holds `()` and tuples, the team's `doubledOverloading.fss` would be refused as written: `a[\E\](v: E)` could take `()`, the argument of its sibling `a()`. It now writes `a[\E extends Object\](v: E)` and `b[\F extends Object\](v: F)`, and two pinned messages lost their printed `extends Object`; each assertion is kept (`1bc0a9083`; F-296).
- **305. The gate's comparison hid a change of the first compile error in three rows of the APL microGPT program. Accept it as landed?**
  - Landed: As landed; no phase moved. Default: as landed.
  - What was decided: The APL microGPT program's first compile error moved from "DelegatedIndexed is undefined." to "ImmutableArray is undefined.", at the same phase: the `List` api now imports `CovariantCollection`, which names `ImmutableArray`, a type the compiler's own prelude lacks. The flat program does not import `List` and is unchanged; the error goes when the compiled path reads the one library.

## What each batch changed (6)

- **193. Climb batch 19's sixteen forks at their defaults, and its points for his sight.**
  - Landed: As the record set them.
  - What was decided: Batch 19 made both paths read the exclusion of two generic declarations over their whole parameter types, so a pair whose parameters exclude only taken together now loads under walk and compiles (P-152). An object or trait declared `extends Any` is an `Object` on both paths, and under walk a tuple or `()` now concatenates on the left of a string, where a function or a long tuple raises `CastError` (`coordinator/CLIMB-BATCH-19.md:77-82`).
- **203. Climb batch 20's twenty forks at their defaults, and its points for his sight.**
  - Landed: As the record set them.
  - What was decided: Each integer type's `^` now answers its own type, and a negative exponent raises `IntegerOverflow`, or `DivisionByZero` at a base of 0, where walk answered a float; `(1/2)^(big(3))` answers `1/8`. The vector and matrix api gained `fill`, `tabulate` and `array3(v)` and lost two `immutableArray` ranks and the unused sizes of 17 operators (P-153, P-40; `coordinator/CLIMB-BATCH-20.md:84-90`).
- **303. What climb batch 22c changed that its record lists for his sight, not as questions.**
  - Landed: As landed. Default: as landed.
  - What was decided: A component must now declare each `abstract` member of its api, at the api's header, or the checker refuses it. On the compiled path a type parameter written without a bound is bounded by `Any`, so tuples and functions can be static arguments: `id((3, 4))` is refused where it compiled as `id(3)`; until the switch-over, a compiled generic that prints or concatenates a value of such a parameter is refused, since the compiler's prelude declares `print` and `||` at `Object` (P-42; F-296). Under walk only where a failure is raised changed.
- **316. What climb batch 23 changed that its record lists for his sight, not as questions.**
  - Landed: As landed. Default: as landed.
  - What was decided: The first family of the library's native bindings now names static Java helpers that both paths can run, in place of classes only the interpreter runs. Under walk, `7 DIV 0` on `ZZ32` raises `DivisionByZero`, as the operators chapter says, where the run ended; a binding in a program's own code can now give a quiet value where it was refused at load (rows 846 and 847). The checker reads a moved binding as a call of its helper, so a misfitting helper is an error at the binding (P-58; row 336).
- **329. What climb batch 24 changed that its record lists for his sight, not as questions.**
  - Landed: As landed. Default: as landed.
  - What was decided: Under walk `DIV` by zero raises `DivisionByZero` on `ZZ64`, `ZZ`, `NN32` and `NN64` too (F-24). On the compiled path a `where` clause in a declaration's header now compiles, including an object's or a trait's own clause on its own static parameters, though the code generator emits nothing for any clause; a call whose own clause introduces a variable now dies at run time (row 867). The compiled `CHOOSE` past its table raises `IntegerOverflow`, and parallel calls of it no longer corrupt each other (F-181, F-305).
- **353. What climb batch 25 changed that its record lists for his sight, not as questions.**
  - Landed: As landed. Default: as landed.
  - What was decided: Under walk `REM` and `MOD` by zero now raise `DivisionByZero` on all five integer types (F-312). On the compiled path an `NN32` above 2^31 and an `NN64` above 2^63 print unsigned, and negating an `NN64` wraps; a trait or object may extend a generic trait at `Any`, a `try` may carry a `forbid` clause, and a function may be declared `test` (F-313, F-315). Five `asFloat` headers of the builtin library now return `RR64` where they named walk's `Float`.
