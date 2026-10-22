# Cold read 2: facts f7 (F-90, F-220, F-225, F-226, F-227)

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and lookups in `references/library.md`, `records.md`, `tests-writing.md`, `specification.md`, `compiler.md`, `interpreter.md`, `gate.md` (not `revival-changes.md` or `sources.md`). Nothing else.

## F-90 "In the interpreter's library, several array and matrix declarations and `SUFFIX_SUM` ..."

**Established:** Some declarations in the interpreter's library have been put into a form that the compiled checker accepts:
- `__DefaultVector`, `__DefaultMatrix` and `TransposedMatrix` state the bound that the whole array family uses, `T extends { Number, MultiplicativeRing[\T\] }`. That bound itself is described by F-151.
- `__immutableFactory1` declares its return type as `ImmutableArray1`. Its code path for an array whose lowest index is 0 casts its result to that type (F-264 covers the cast).
- `__ImmutableSubArray1` declares no `put` method.
- `Matrix`'s `mul` used to make its two parallel calls as a tuple of type `((), ())`. It now makes them in a parallel `do … also do … end` block of type `()`.
- `TransposedMatrix`'s `add`, `subtract` and `negate` call `Matrix`'s operators.
- The `SUFFIX_SUM` unary operator on a `ZZ32` array (declared in `FortressLibrary.fsi`) loops over `seq((0 # (|x| - 1)).reverse)`. It does not use `seq(a:b:c)`, because a strided range `a:b:c` has the declared type `Range[\ZZ32\]`, which is not a generator, so the checker refuses `seq` of it. That refusal is ledger row 661, still open.

The same change also did two more things. `String`'s `left` and `right` now return `Just(c)`; this builds P-53. `QQ`'s `ceiling` and `truncate` raise `DivisionByZero` at +∞, −∞ and 0/0, which is the rule P-54 sets for now. P-54 also asks for a later change, after the switch-over, and that change is not built.

**Conditions:** This holds for the interpreter's library as it stands. "Accepts" is measured by the distance stage, not by a compiled test. The `QQ` rule is P-54's rule for the time before the switch-over. A different rule is owed after it.

**Consequence:** Keep these declarations in their present form. In particular, do not loop with `seq(a:b:c)` over a strided range; use a `#` range with `.reverse` as `SUFFIX_SUM` does, until row 661 is fixed. Do not put the tuple form back into `mul`. Changing the bound breaks no test. Only the distance stage would show it, so check that stage after any edit there. P-54's post-switch-over change is still owed; P-54 gives the details.

**Evidence:** The distance stage reports none of its error sites in these declarations; F-53 lists the five sites it has. Walk tests: `tests/TransposedMatrixAndFreeze.fss` checks the values of `mul`, of `replica` and `freeze` (which call the factory), of the sub-array and of the transposed arithmetic. `tests/IntegerOrderNumerals.fss` checks `SUFFIX_SUM`'s values. `tests/StringPieces.fss` checks the `String` part and `tests/NumberOrderListDeclarations.fss` the `QQ` part. No test covers the bound. Detail: `compile-ladder/rung-library-slips/REPORT.md` sections 1 and 6.

**Could not resolve:**
- "which F-151 owns": I read this as "F-151 is the entry that describes this bound". "Owns" could also mean that F-151 decides who may change the bound. The wording is unclear.
- "once a tuple typed `((), ())`": I read "once" as "formerly". It could also be read as "at one point in the code". The wording is slightly unclear.
- "answer `Just(c)`": the entry does not say what `c` is (the first or last character? a parameter?), or what `left` and `right` returned before. The wording is unclear; P-53 presumably has the answer.
- "The same change": no change is named before this point. I take it to be the change that wrote the declarations in the title. The wording is unclear. The entry also does not say whether the `String` and `QQ` edits were made for the checker too, or only landed in the same change.
- "none of its sites is in them (F-53, which lists the five)": "its sites" is presumably the distance stage's error sites, and "the five" the current count of those sites. "The five" has no noun before it, so I am inferring that. The wording is unclear.
- "these declarations" (in the distance-stage sentence): it is unclear whether this includes the `String` and `QQ` edits or only the array, matrix and `SUFFIX_SUM` ones.
- `0 # (|x| - 1)`: from the skill's `SUM[\ZZ32\][j <- 0#n]` I read `a # n` as "n elements starting at a", and `|x|` as the array's size. This is a language concept that the skill shows only by example.
- "open" (row 661): this is not one of the seven ledger statuses. I read it as "not closed". The wording is minor.

## F-220 "`__bigOperator`'s local function `body` declares its parameter's type ..."

**Established:** In `Library/FortressLibrary.fss`, `__bigOperator` has a local function written `body(i: I): L`, with its parameter's type stated. The compiled checker accepts this line.

**Conditions:** This holds for the current library and checker. `I` and `L` are presumably `__bigOperator`'s static parameters; the entry does not say so.

**Consequence:** Leave the parameter's type in place. The line is not among the checker's remaining errors. For how walk runs this code, see F-228: a reduction or comprehension with no static argument written gets its value's declared type, or else the join of its elements' types, or else its bound.

**Evidence:** The distance stage reports no error at the line, and the checker count's three errors (listed in F-53) do not include it. No test is named. Detail: `compile-ladder/rung-walk-elements/REPORT.md` section 6.

**Could not resolve:**
- Why F-228 matters here: the entry does not say how stating `i: I` connects to walk's rule for instantiating a reduction. For example, it does not say whether stating the type made walk need that rule. A worker cannot tell from this entry what would break if the type were removed. The wording is unclear.
- "else its bound": the skill (SKILL.md, "Static parameters") gives the declared type and then the join, and says some other cases get `Bottom`. It does not give "its bound" as a third step. That may be new information from F-228 or a conflict with the skill. I cannot tell which.
- No test and no command output are named, only "the distance stage finds no error". The entry does not say that no test checks the fact. That is a gap in evidence rather than in wording.

## F-225 "In a self-typed trait with no `comprises` clause, or one that lists only `...` ..."

**Established:** A self-typed trait is `C[\X\]` where `X extends C[\X\]`. If such a trait has no `comprises` clause, or one that lists only `...`, the compiled checker gives `self` the type `C[\X\] & X` inside method bodies: the trait intersected with the implementing type, taken from the F-bound. In the method signatures, `self` stays `C[\X\]`. The checker refuses an extender that instantiates `X` at a type other than its own. For example, `object Bad extends Integral[\ZZ32\]` is refused because `Bad` is not a `ZZ32`. If the trait's `comprises` clause lists types, `self` is instead the trait intersected with the union of those types. This builds P-146.

The checker also does something extra, which is the coordinator's default and waits for the curator's review (review-queue item 212). It handles a parameter whose bound is a self-typed trait that the declaring trait extends at that parameter, as in the team's `Containment` mixins.

Under this rule, every self-typed body in the library is accepted except `Integral`'s `numerator`. Each integer type declares `numerator` itself instead, per P-146. Walk has no such rule and loads programs that the checker refuses.

There are also known defects:
- A compiled default body that returns `self` fails at class load with a `VerifyError` when the self-type parameter is an object type, such as `object Pt(…) extends Shape[\Pt\]`. This is open, row 695.
- The rule correctly refuses two of the team's declarations, each an open row: `generator` in the demo `trips.fss` (row 710) and `PureList`'s `List` (row 355).

**Conditions:** This applies to the compiled checker only, not to walk. The `C[\X\] & X` typing applies to traits with no `comprises` clause or `comprises { ... }`. A trait whose clause lists types gets the union form. The `Containment` extension is a default, not a curator decision, so it could change after review.

**Consequence:**
- Do not write an extender that instantiates a self-typed trait at another type.
- Expect walk to accept such programs, so walk alone does not test this rule.
- Do not change the rule to accept `trips.fss`'s `generator` or `PureList`'s `List`; those declarations are what is wrong (rows 710 and 355).
- A compiled default body that returns `self` from a trait instantiated at an object type will hit row 695.
- Treat the `Containment` handling as provisional until item 212 is reviewed.

**Evidence:** When the rule landed, the distance stage's self-type class fell from 29 errors to 0, and the total distance from 85 to 55. That was one measurement on that tree. Gated by `compiler_tests/SelfType*` and `XXXSelfType*`. Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4 and 7.

**Could not resolve:**
- "The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter": "takes" can be read two ways. It may mean "accepts as a self-type parameter", so that `self` there is also typed `D[\X\] & X`. Or it may mean "accepts such a declaration without error". The phrase is also hard to parse: which trait is "the trait"? I read it as `trait D[\X extends C[\X\]\] extends C[\X\]`, but I am not sure. The wording is unclear, and the `Containment` mixins are not in the skill.
- "the distance from 85 to 55": that is a drop of 30, but the class fell by 29. The entry does not explain the extra error. This is unclear wording or a missing note.
- Which test pins the `VerifyError` (row 695): `tests-writing.md` says such a deferred defect gets a gated `XXX` test, and `XXXSelfType*` may be it, but the entry does not say so. Minor.
- "closed"/`comprises` lists only `...`: I read `...` as an open-ended comprises list. That is a language concept I inferred; the skill does not cover it.

## F-226 "The compiled checker renames an inherited method's own static parameters apart ..."

**Established:** Before it uses an inherited method, the compiled checker renames that method's own static parameters so that they cannot clash with other names. It does this in two places:
- In the overloading check, it keeps them apart from the static parameters of the trait or object that inherits the method. So `Generator.generate[\R\]`, inherited by `PossibleReductionPair[\R\]`, keeps its own `R` (row 561).
- At a call, `commonInheritedMethods` in `scala_src/useful/STypesUtil.scala` instantiates each inherited method at the static arguments of the trait that declares it. First it renames each of the method's own static parameters whose name appears in those arguments to `name$i`, where `i` is the smallest positive integer that gives an unused name. The checker's error messages show these renamed forms (row 627).

The same function builds the method set that a trait's own body sees. So calling an inherited method by its bare name inside a trait is renamed the same way.

**Conditions:** This applies to the compiled checker, for inherited methods that have their own static parameters whose names collide with the inheriting type's parameters or with the receiver's static arguments.

**Consequence:** A worker can rely on an inherited generic method keeping its own static parameters even when the inheriting trait uses the same names. A `name$i` in a checker message is one of these renamed parameters, not a separate declaration. For the call side and a trait body's view, the code is `commonInheritedMethods`. The entry does not name the code of the overloading check.

**Evidence:** Gated by `compiler_tests/InheritedMethodStaticParamSameName`, `InheritedMethodByNameStaticParamSameName` and `MethodStaticArgReceiverSameName`. Detail: `compile-ladder/rung-overloading-checker/REPORT.md` section 6 (the overloading check) and `compile-ladder/rung-checker-expected-type/REPORT.md` section 1 (the call).

**Could not resolve:**
- Rows 561 and 627: the entry does not give their status. Row 561 is presumably fixed by this behaviour. For row 627, I cannot tell whether the `name$i` form in messages is an open defect (messages should print the source name) or only a documented behaviour. The wording is unclear.
- "unused name": unused where? In the method, among the arguments, or in the whole scope? This is minor.
- "renames ... apart": I read this as the usual capture-avoiding (alpha) renaming. That is clear enough.

## F-227 "The compiled checker replaces a closed trait among an intersection's conjuncts ..."

**Established:** Take an intersection that has, as one of its conjuncts, a closed trait (one whose `comprises` clause lists types). The compiled checker replaces that trait with those of its listed types that no other conjunct excludes. It does this only where the excluding conjunct contains no type variable or inference variable. So `K ∩ R[\T\]` is kept as written. The code is `normConjunct` in `scala_src/types/TypeAnalyzer.scala`.

Under a union, there are two rules, in `pSubInner` in the same file:
- An inference variable takes the whole union as a single upper bound.
- A type variable is checked both through its bound and against each member of the union.

Results:
- A call through a parameter bounded by a closed trait and by a second bound that excludes one of the trait's listed types type-checks.
- A generic declaration with such bounds, next to a declaration on the closed trait, is a valid overloading. This covers rows 686, 687, 689, 690 and 711.
- A call is still refused when its argument's type only contains the parameter, as in `Box[\T\]`, under a ground second bound. This is an open defect, row 712.

Before this change the checker expanded such intersections even when they contained variables. It thereby accepted an overloading that it now refuses. Appendix I lists the question of that overloading as not settled. Row 713 is CONTESTED, and `compiler_tests/XXXOverloadTwoBoundsClosedTraitExclusion` pins the current refusal.

**Conditions:** This applies to the compiled checker. The expansion applies only where the excluding conjunct is ground. The case in row 713 is unsettled and may change if the question is decided.

**Consequence:**
- A worker can bound a parameter by a closed trait plus a ground excluding bound and expect calls and overloadings to check.
- Do not expect `Box[\T\]`-style arguments to work yet (row 712).
- Do not treat the row-713 refusal as settled: it is contested and goes to the curator through Appendix I's open question.

**Evidence:** Gated by `compiler_tests/*TwoBoundsClosedTrait` and `*TwoGroundBounds*ClosedTrait`. `XXXOverloadTwoBoundsClosedTraitExclusion` pins the row-713 refusal. Detail: `compile-ladder/rung-checker-bounds/REPORT.md` sections 1 and 6.

**Could not resolve:**
- "only where that excluding conjunct names no type variable or inference variable" can be read two ways:
  - (a) The trait is replaced only when the other conjuncts are ground. If any conjunct names a variable, the whole intersection stays as written.
  - (b) Only ground conjuncts count as excluders, but the replacement still happens.

  The example "`K ∩ R[\T\]` stays as written" fits (a). Under (b), `K` would become the union of all its listed types. The phrase "that excluding conjunct" assumes there is a conjunct that excludes something, which `R[\T\]` may not. The wording is unclear.
- "A call whose argument's type only carries the parameter, `Box[\T\]`": I read this as "the argument's type mentions `T` inside another type rather than being `T`". "Only carries" is unclear wording.
- "Before the checker kept such an intersection as written": the sentence order is hard to follow. I read it as "Before the checker began to keep such intersections as written, it accepted, through the expansion, an overloading that it now refuses". The wording is unclear.
- "`XXXOverloadTwoBoundsClosedTraitExclusion` pins the refusal": per `tests-writing.md`, an `XXX` test asserts the specification's answer and is green while it fails. So this test seems to assert acceptance as the expected answer, which conflicts with "not settled". For an unsettled question, `tests-writing.md` item 3 asks for a test of today's behaviour plus a ledger row, not an `XXX` test. I cannot tell which answer the test treats as right. This is either a test concept applied inconsistently or unclear wording.
- "closed trait": not defined in the skill. I read it as a trait whose `comprises` clause lists types without `...`. This is a language concept I lack, partly inferred from F-225.
