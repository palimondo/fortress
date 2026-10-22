# Cold read 2 of f15/clean.txt

Read with only `CLAUDE.md`, the `fortress-repo` skill's `SKILL.md`, and these references, for terms: `library.md`, `records.md`, `specification.md`, `compiler.md`, `interpreter.md`, `tests-writing.md`, `tests-running.md`, `exploring.md` ("Weighing the sources"). I did not read `revival-changes.md` or `sources.md`. All fourteen entries are facts. `F-?1` and `F-?2` are entries that have no number yet. I read their cross-references (F-166 to F-?1, for example) as pointing to the entries of this file.

---

## F-159, "In probes of 2026-09-29, a generic factory with a written static argument selected a store written for `RR64` alone ..."

**Established:** In some probes, a generic factory `mk[\T\]` returned a store made only for `RR64` (`DStore`) when it was called at `RR64`, and a generic store (`BStore[\T\]`) at other types. It did this on both walk and the compiled path. It chose the store with a `typecase` on a witness, `__thrower[\T\]`, which is a function `() -> T` that is never called, so the branch is picked by the static type alone. For the compiled checker to accept the code, the `RR64` branch's result has to be passed through `cast[\Arr[\T\]\]`. Without the `cast`, walk ran the code, but the checker refused it: it took the body's type to be `OR(DStore,BStore[\T\])` and would not accept that against the declared `Arr[\T\]`. The other way, a plain (non-generic) `RR64` overload next to the generic one, was accepted by the compiled checker and dispatched to the plain overload. Walk refused that pair at load at the time.

**Conditions:** The probes used their own one-method trait `Arr[\T\]` and their own stores, not the library's array traits. The compiled runs used the compiler's prelude. The calls shown write the static argument (`mk[\RR64\](r)`, `mk[\ZZ32\](z)`). Walk's load check has changed since then (F-27) and has not been run on the plain-overload pair, so I cannot tell whether walk would refuse it today. This is a result of past probes: no gated test holds it.

**Consequence:** A worker who wants a generic factory to give an `RR64`-only store can use the shape that the library's `additiveIdentity` uses: a witness `typecase` with `cast` on the special branch. Before relying on the plain-overload way under walk, the worker must run the present load check on it. Since no test holds the fact, the worker should probe again before building on it. It is input to the open array decision P-85. It does not settle that decision.

**Evidence:** The probes of 2026-09-29, which are in the history before `84aef6a4f`, and `reviews/array-design-ways.md` sections 0 and 3. No gated test.

**Could not resolve:**
- "a generic factory with a written static argument": this could mean the call writes `[\RR64\]` out, or that the declaration does. I read it as the call. The entry does not say whether the choice also works when the argument is inferred. (Unclear wording.)
- `mk` is used without first being named as the factory. It can be inferred. (Unclear wording, minor.)
- "A witness `typecase` whose `RR64` branch returns `DStore` ran under walk": the entry does not say what this uncast version returned under walk. I assume `DStore`. (Unclear wording, minor.)
- `__thrower`: I cannot tell whether it belongs to the library, to the compiler's prelude, or to the probes. (Unclear wording.)
- "A plain factory for `RR64` beside the generic one, called from generic code": the entry does not say what the generic caller was instantiated at, or what it passed. I read it as generic code running at `RR64`, with dispatch picking the plain declaration. (Unclear wording.)
- "on their declared domains": the skill defines "declared domain" only in `revival-changes.md`, which I may not read. (A language concept I lack.)
- "array decision A, how a `double[]` store goes under a float vector": the label "decision A" is not defined here. I read "goes under" as "is used as the storage beneath", and "float vector" as a vector of `RR64`. (Unclear wording.)
- "the probes are in the history before `84aef6a4f`": I read this as saying that commit `84aef6a4f` removed them, so they can be read at its parent. No path is given. (Unclear wording, minor.)

## F-229, "`array1` and `array2` give a vector and a matrix only at the eight number types ..."

**Established:** The library's `array1` returns a `Vector`, and `array2` returns a `Matrix`, only when the element type is exactly one of `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` or `RR64`. At any other element type they return a plain `Array1` or `Array2`. They choose with a `typecase` on a witness of the result type (an array type), not of the element type. Each branch builds the array at its own number type and returns it through `cast`. Because `Array1` and `Array2` are invariant, a branch matches only its own type. `Number` and `AnyIntegral` get plain arrays, because `Vector[\Number,n\]` breaks `Vector`'s element bound (F-151). The specification says an array of `Number` is a vector (row 729, contested). Under walk, a type parameter inferred from a value is not the number type itself: from a `ZZ32` value it is `Int`, and from a `ZZ64` or `RR64` value it is the value's run-time class. So generic code under walk gets a plain array where the specification gives a vector (row 721). The witness has to be of the result type: an element-type witness at `T = Int` would match the `ZZ32` branch, and the `cast` would then throw `CastError` (row 722, like `openRange`).

**Conditions:** This is the library's behaviour under walk, which the two tests gate. The compiled checker's acceptance of these factories is only counted by the distance stage. It does not fail the gate.

**Consequence:** To get a vector or a matrix, a worker must write one of the eight exact number types as the element type. Generic code whose type parameter walk infers from a value gets a plain array. Code that needs vector operations there must expect this, or write the type out. The witness must not be changed to an element-type witness. The difference from the specification at `Number` (row 729) and at inferred parameters (row 721) is recorded, not repaired.

**Evidence:** `tests/ArrayFactoryNumberTypes` and `tests/ArrayFactoryAbstractNumber` (under walk), rows 364, 721, 722 and 729, and `compile-ladder/rung-library-factories/REPORT.md` sections 1, 3 and 4.

**Could not resolve:**
- "that value's run-time class": I cannot tell whether this is a Java class (such as `FRR64`) or a Fortress type, or what it is called. I can only infer that it is not `ZZ64` or `RR64`, since it gets a plain array. (Unclear wording. It may also be a walk concept I lack.)
- Why `() -> Int` matches the `ZZ32` branch: this needs function types to be covariant in their result, with `Int` below `ZZ32`. The skill says generics are invariant but does not say how arrow types vary. I inferred it. (A language concept I partly lack.)
- "in `additiveIdentity`'s shape": `additiveIdentity` is not described here. I took the shape from F-159. (Minor.)
- "contested": the meaning of the ledger status `CONTESTED` is in the row template, which I did not read. I read it as "disputed whether this is a defect". (A record concept.)
- The entry does not say whether the compiled checker accepts `array1` and `array2` today, only that the distance stage measures it. (Unclear wording, or the fact is missing.)

## F-162, "Citing `Specification/library/apis/*.tex` as an independent standard is circular."

**Established:** The api listings of the specification's library part are generated from the library's own `.fsi` files when the specification is built. They are not stored in the tree.

**Conditions:** This holds for every listing under `Specification/library/apis/`.

**Consequence:** A listing cannot justify an edit of an `.fsi` file, because the edit would change the listing. Cite the `.fsi` line instead.

**Evidence:** The team's statement in `Specification/library/structure.tex:25-31`, and how the build renders the listings. The rule is also in `references/specification.md`.

**Could not resolve:** Nothing. Clear.

## F-163, "Of the two copies of the specification, `Specification/` is the one to search and change ..."

**Established:** `Specification/` is the copy to search and edit. `Specification-1.0-frozen/` is identical to the team's Working Draft as of their last draft commit, `2f8b4331a` (2011-02-02). The one exception is the release text: within that folder, only `fortress.1.0.pdf` is the 1.0 release. The frozen copy's Appendix I is the team's stub. In `Specification/`, Appendix I lists the revival's changes (P-96). `Specification/fortress.pdf` is a draft build, so it prints the `\note` boxes. The team's unfinished restart is a third text, and it is later on some topics (F-166).

**Conditions:** The identity is shown by a `git diff` between two commits.

**Consequence:** Search and change `Specification/`. Cite the frozen copy as the Working Draft, and cite only its PDF as 1.0. Leave the frozen copy unchanged. Expect notes in `Specification/fortress.pdf`.

**Evidence:** `git diff --quiet 2f8b4331a:Specification c02fa44d0:Specification-1.0-frozen` succeeds, and `reviews/spec-change-form.md` sections 5 and 7.

**Could not resolve:**
- `c02fa44d0` is not explained. I read it as a revival commit that holds the frozen copy. (Unclear wording, minor.)

## F-165, "The repository is a 2018 fork of `sirinath/fortress`, and `main` descends from `8fe1daa8f` ..."

**Established:** The repository was forked from `sirinath/fortress` in 2018. `main` descends from `8fe1daa8f`, which copied an unrelated third-party Java 9 port on top of the team's last commit, `a874948ac`. The port has no shared git history with this tree. Most of its 1,506 files have since been removed or redone. The only code of the port that still runs is the `FTypeArrayList` fix for a JDK 8 `TreeSet` crash. The branch `clean-ladder` (`8332bd34f`) is built on `a874948ac` without the port. It never replaced `main`.

**Conditions:** "What can go" is listed in `lineage.md` as removable with no change of behaviour: the `FTypeArrayList` fix, if it is replaced by `clean-ladder`'s two-line repair, and the port's dead jars, dead files and cosmetic edits. That cleanup is parked in PLAN, not scheduled.

**Consequence:** A worker must not treat the port's lines as the team's, or as anyone's credited work. A worker must not remove the `FTypeArrayList` fix without the replacement. The cleanup is not the worker's to do unless PLAN takes it up.

**Evidence:** `coordinator/lineage.md`, "The facts", and the items "Working code" and "Verdict" of its verification section.

**Could not resolve:**
- "the cleaner pass that PLAN parks": I read "cleaner" as "cleanup". It could also be read as a comparative. No PLAN section or item is cited. (Unclear wording, minor.)
- "rebuilds on `a874948ac` without the port": I cannot tell what `clean-ladder` holds, for example whether it is the revival's commits replayed without the port. (Unclear wording.)

## F-166, "On the topics of its Types chapter ... the team's latest word is the unfinished restart, not `Specification/`."

**Established:** The team's restart, `Documentation/Specification/`, was never adopted, but its Types chapter is the team's latest text on the topics it covers. It restates the exclusion rule as "instantiation exclusion", and it adds `covariant`. On other topics, `Specification/` is the only statement: the rest of static parameters, traits (the restart has only a stub), exceptions, components and the numeric library. The curator decided that `Specification/` stays the standard, that the Types chapter is cited beside it, and that `covariant` is future work (P-25). The POPL 2019 paper is later than both (F-?1).

**Conditions:** "Latest word" covers only the topics of the restart's Types chapter. The curator's decision governs which text is followed.

**Consequence:** Follow `Specification/`, and cite the Types chapter beside it on its topics. Do not build `covariant`.

**Evidence:** `coordinator/spec-lineage.md` section 6 and its coordinator's check, and P-25.

**Could not resolve:**
- "on the rest of static parameters, and on traits beyond a stub, exceptions, components and the numeric library": I read this list as "the restart has only a stub on traits, and nothing on the rest". (Unclear wording, minor.)
- "F-?1": a placeholder number. I took it to mean the entry below. (Record form.)

## F-?1, "The type group's POPL 2019 paper gives P-48's instance rule, and its soundness proof does not cover the library's F-bounded functions ..."

**Established:** The 2019 paper states the same rule as P-48: a type parameter that a call's arguments do not fix takes the intersection of its upper bounds. The paper is later than both the specification and the restart. Its calculus does not allow a method's type parameter in an upper bound, so F-bounded parameters (bounds that mention the parameter) are outside it. It also omits top-level functions and functional methods, and it has other limits.

**Conditions:** The paper supports P-48's rule only within its calculus. Its soundness proof covers neither F-bounded functions such as `SUM` and `BIG MAX`, nor top-level functions, nor functional methods.

**Consequence:** A worker may cite the paper for P-48's rule. The worker must not cite its soundness proof as covering `SUM`, `BIG MAX`, or other F-bounded, top-level or functional-method declarations. `reviews/decisions-review/popl-recheck.md` checks the curator's decisions against the paper.

**Evidence:** `research/extracts/ParkPOPL2019-extract.md` sections 6 and 8.

**Could not resolve:**
- "gives P-48's instance rule": I read "gives" as "states", and "instance rule" as the rule for choosing the instance when a parameter is not fixed. (Unclear wording, resolved by the next sentence.)
- "a method type parameter ... in an upper bound": `SUM` is a top-level function, not a method. I cannot tell whether the calculus treats such functions as methods, or whether `SUM` is outside it only because top-level functions are omitted. The conclusion is the same either way. (Unclear wording, minor.)
- "among other limits": the limits are not listed. (Minor.)

## F-167, "The specification states instantiation exclusion and keeps each example that the rule refuses, marked 'Not allowed' ..."

**Established:** The revised specification states the rule of instantiation exclusion: no type extends two instantiations of one generic trait. This is the landed form of P-97. The specification also forbids a `where`-clause variable among the static arguments of an `extends` clause. The examples that the rule refuses are kept, marked "Not allowed": the covariance example, the empty list, the empty optional value, and `Object` with algebraic supertraits. Each one stands next to the library's way of writing the same thing. Those library shapes run on both paths, except `Nothing[\String\]` on the compiled prelude (row 331). The example of a subtrait of every instantiation stays as the counterexample that introduces the rule. Appendix A's calculi carry a callout saying that they predate the rule. The refused examples of "the internal appendix" each get a callout. The checker does not yet refuse two cases: an object extending two instantiations that differ only in a `bool` argument (row 406), and an object extending, for example, `Vec[\n\]` and `Vec[\3\]`, where `n` is its own static parameter (row 414).

**Conditions:** Only these two cases are not yet refused. The compiled prelude does not run the `Nothing[\String\]` shape.

**Consequence:** A worker must write no type that extends two instantiations of one trait, and must write the library's shape instead. A worker must not rely on the checker to catch the two cases of rows 406 and 414. A worker who changes the specification must keep refused examples, marked, rather than delete them.

**Evidence:** `compile-ladder/rung-spec-route-a/decision-record.md` sections 2, 3 and 4.2, and rows 331, 406 and 414. No test is named for the rule itself.

**Could not resolve:**
- "It builds P-97": an unusual verb. I read it as "is the built form of P-97", by analogy with the state word "Built.". (Unclear wording.)
- "the root type `Object`'s algebraic supertraits": I cannot tell what this example shows, for example `Object` extending something like `Equality[\Object\]`. (Unclear wording.)
- "each stand beside the library's shape, which runs on both paths except `Nothing[\String\]`": I read `Nothing[\String\]` as the library's shape for the empty optional value. (Unclear wording, minor.)
- "the internal appendix": I cannot tell which appendix is meant, Appendix A or another one. (Unclear wording.)
- "The checker does not yet refuse": I read "the checker" as the compiled checker. The entry does not say whether walk refuses these cases. (Unclear wording, minor.)

## F-168, "The specification's number chapters describe the flat library ..."

**Established:** The specification's number chapters now match the flat library. The eight number types are siblings under `Number` (F-131). They convert only by the library's coercions (P-74). Every other conversion is explicit, such as `asFloat(x)`. Sign-refined types, such as positive ℚ, are gone, and a program checks a value's sign at run time (P-80). `QQ` includes +∞, −∞ and 0/0. It does not claim to be a field or a total order. It extends exactly `StandardPartialOrder`, `StandardMinMax`, `AdditiveGroup` and `MultiplicativeRing`, whose laws hold for the finite rationals only. The advanced chapter on rational quantities is kept unchanged, under a callout that marks it superseded.

**Conditions:** The laws of `QQ`'s traits are claimed only for finite values.

**Consequence:** A worker must not assume implicit conversions beyond the library's coercions, sign-refined types, or field or total-order laws on `QQ`. A worker must not cite the advanced chapter as current. F-172 gives the integer rules.

**Evidence:** `compile-ladder/rung-spec-numbers/decision-record.md` section 3, `Specification/basic-lib/numbers.tex:224-229`, and `Specification/advanced-lib/numbers-advanced.tex:14`.

**Could not resolve:** Nothing that blocks. ("Rational quantities", the subject of the advanced chapter, is not explained, but I did not need it.) Clear.

## F-169, "The Working Draft never wrote static-argument inference, never named the type that a library gives an integer numeral, and never named a range's integer type ..."

**Established:** The team's Working Draft is silent on three things: how static arguments are inferred (its chapter has only a heading and notes), what type a library gives an integer numeral, and what integer type a range has. It describes numeral types, such as `NaturalNumeral[\n,10,v\]`, and says that libraries define coercions from numerals. But its own note leaves their hierarchy undescribed, and it names no type that a library declares for a numeral. The restart adds nothing. The current specification's text on these three things was written by the revival: F-173's inference rule, F-170's ranges, and `IntLiteral` as an integer numeral's type (P-76).

**Conditions:** The fact covers only these three topics.

**Consequence:** Citing the specification on these topics cites the revival's own decisions, not the team's. A worker must not present such a citation as team authority.

**Evidence:** `reviews/numerics-plan-coordinator/evidence-B.md` sections 1 and 2, `Specification-1.0-frozen/basic/expressions/literals.tex:87-96` and `:132-148`, and `Specification/basic/expressions/literals.tex:154-156`.

**Could not resolve:** Nothing. Clear.

## F-170, "The specification's ranges are over ℤ32, and its own ranges over wider integer types are respelled."

**Established:** In the specification, explicit ranges are over ℤ32. An integer numeral, or a `nat` or `int` static parameter, used as a range operand (such as `a` or `n` in `a#n`), converts to ℤ32 (row 485, fixed). An operand of any other integer type is a static error. A loop that needs a wider counter runs over ℤ32 and widens each element. The specification's two examples that built `ZZ64` ranges were rewritten to run over ℤ32. `ant testSpecData`, a step of the gate, runs both.

**Conditions:** Explicit ranges only.

**Consequence:** A worker writes ranges over `ZZ32` and widens inside the loop. The two rewritten examples are gated, through F-114.

**Evidence:** `ant testSpecData` (F-114), row 485, `compile-ladder/rung-spec-ranges/decision-record.md` sections 2 and 3, and `Specification/basic/expressions/ranges.tex:42-58` and `:88-109`.

**Could not resolve:**
- "respelled": I read it as "rewritten". (Unclear wording, minor.)
- I cannot tell whether "converts to ℤ32 (row 485, fixed)" and "is a static error" describe only the specification's rule, or also walk or the compiled checker, and on which path row 485 was fixed. (Unclear wording.)
- `a#n`: the form `#` is not defined here. I read it as a range of `n` elements that starts at `a`. (A language concept, minor.)

## F-171, "The specification reads a `comprises` clause as the restart's Types chapter does ..."

**Established:** In the specification, `comprises` means that every value of the trait is a value of one of the listed types. So anything that extends the closed trait must be a subtype of a listed type, with two exceptions. First, a trait with its own `comprises` clause may stay unlisted if all its listed types are below listed types of the closed trait. Second, a generic trait may stay unlisted if at least one type extends it and all its extenders are below listed types. A listed type may be an instantiation at the trait's static parameters or at `where`-clause variables. The text is silent on a bare type variable as a listed type. Walk overflows its stack on one (row 407). The compiled checker departs from the text in three ways. It checks only immediate subtypes (row 487). It reads the clause in the subtrait's type-variable names (row 489). It matches extenders by the simple text of their names (row 490). Whether the team's commented-out `comprises Integral[\I\] where [\I\]` is valid is open (F-121).

**Conditions:** The departures are known defects of the compiled checker. Bare type variables are unsettled.

**Consequence:** A worker must design closed hierarchies by this reading, and must not list a bare type variable. A worker must not trust the compiled checker's `comprises` verdicts in the three ways listed.

**Evidence:** `compile-ladder/rung-spec-comprises/decision-record.md` section 2, `Specification/basic/traits.tex:235-258`, and rows 407, 487, 489 and 490.

**Could not resolve:**
- "reads the clause in the subtrait's own type-variable names": I cannot tell exactly what goes wrong. I read it as the checker failing to substitute the subtrait's arguments for the closed trait's parameters. (Unclear wording.)
- "closed trait" is not defined. I read it as the trait that has the `comprises` clause. (Minor.)

## F-172, "The specification's integer chapter states the library's integer rules."

**Established:** The integer chapter states these rules:
- `narrow` converts `ZZ64` or `ZZ` to `ZZ32`, and `NN64` to `NN32`, by keeping the low 32 bits. It wraps and never throws.
- `LSHIFT` and `RSHIFT` work on the five integer types. On `ZZ` they are `shift`, which is exact at any count. On fixed-size types, `LSHIFT` drops the bits shifted out without throwing.
- `GCD` and `LCM` are nonnegative. A result that the type cannot hold throws `IntegerOverflow`.
- At a negative exponent, bases 1 and −1 give their exact power, base 0 throws `DivisionByZero`, and any other base throws `IntegerOverflow`.

The library follows the power rule under walk. The compiled path's library does not (F-263).

**Conditions:** The power rule holds under walk only.

**Consequence:** A worker can rely on these rules in the interpreter's library. On the compiled path, the worker must expect the power rule to differ until the switch-over.

**Evidence:** `compile-ladder/rung-spec-integer-rules/decision-record.md` section 2, `Specification/basic-lib/basic-integers.tex:39-62` and `:530-542`, and `Specification/basic/operators/opr-overview.tex:262-268`.

**Could not resolve:**
- `RSHIFT` on fixed-size types: the entry does not say whether it is sign-extending, or whether it ever throws. (Unclear wording, or the fact is missing.)
- The entry does not say whether `narrow`, the shifts, `GCD` and `LCM` hold on the compiled path's library. Only the power rule is said to differ. (Unclear wording.)

## F-?2, "The coercion example of the specification's 'Coercion Resolution' ... declares the exclusions that the chapter's definitions need ..."

**Established:** The example in "Coercion Resolution" uses its own traits `ZZ32`, `ZZ64` and `ZZ128`. It now declares `ZZ32 excludes { ZZ64, ZZ128 }` and `ZZ64 excludes { ZZ128 }`, which the chapter's definitions need. `T` rejects `U` when every type that coerces to `T` excludes `U`. `T` is no less specific than `U` when `T` is a subtype of `U`, or when `T` excludes `U`, coerces to `U` and rejects `U`. So the choice of the more specific declaration depends on the exclusions. In a probe, the revised example ran on both paths with the traits renamed `S32`, `S64` and `S128`. `f(S32Of)` chose the `S64` declaration and returned 1.

**Conditions:** No gated test runs the printed example. The gated test of row 394 (fixed), `tests/CoercionMostSpecificRungC.fss`, is a walk-only test of a similar three-trait shape in which each trait excludes both others.

**Consequence:** A worker who writes or edits coercion examples or declarations must declare the exclusions, or the choice of the more specific declaration fails. The printed example's behaviour is held only by a probe. The related gated test covers walk only.

**Evidence:** The rung's probe, row 394 with its test, `compile-ladder/rung-spec-integer-rules/decision-record.md` section 4, decision 6, and `Specification/basic/conversions-coercions.tex:500-516` and `:580` onward.

**Could not resolve:**
- The title says the example "declares" the exclusions, and the body says "the revised example". I infer that the revival added the exclusions, but the entry does not say so. (Unclear wording, minor.)
- "the rung's probe": no rung is named in the entry. I took it from the Detail path (`rung-spec-integer-rules`). (Unclear wording, minor.)
- `f(S32Of)` "chose `f` on `S64`": the probe's other overloads of `f` are not listed. I assume one on `S128`. I read `S32Of` as an object of type `S32`. (Unclear wording, minor.)
- The difference between row 394's test ("each of which excludes both others") and the printed example is unclear, since exclusion is symmetric and the example's declarations already make each trait exclude the other two. (Unclear wording.)
