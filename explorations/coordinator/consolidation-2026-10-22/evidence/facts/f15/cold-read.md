<!-- Cold read of evidence/facts/f15/clean.txt: what each entry means to a reader with only CLAUDE.md and the fortress-repo skill. -->

# Cold read: f15

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and from `references/`: `library.md`, `specification.md`, `records.md`, `interpreter.md`, `compiler.md`, `gate.md`, `exploring.md`, `tests-writing.md` (a grep of the rest for the entries' terms). Nothing else. All fourteen entries are facts.

---

## F-159, "In probes of 2026-09-29, a generic factory with a written static argument ..."

**Established:** You can write a generic factory, here `mk[\T\](r)`, that returns a store specialised for `RR64` (`DStore`) when it is called with the static argument `RR64` written out, and a generic store (`BStore[\T\]`) otherwise. The way that works: a `typecase` over a witness, a value whose type carries `T`, with an `RR64` branch that returns `DStore`, the whole result passed through the library's `cast`. That is the pattern `additiveIdentity` uses. Without `cast`, walk runs the plain `typecase`, but the compiled checker refuses it, because the body's type is the union `OR(DStore,BStore[\T\])`, which (I take it) does not fit the declared result type. With `cast`, both paths accept it and pick `DStore` only for `mk[\RR64\](r)`. A non-generic factory overloaded beside the generic one also worked compiled.

**Conditions:** This was a probe, not a test. Its types were its own: a one-method trait `Arr[\T\]` and the two stores, with none of the library's array traits. The compiled runs used the compiler's prelude, not the interpreter's library. The static argument was written, not inferred. Nobody ran walk's load-time overload check (F-27) on the plain-plus-generic pair, so under walk that pair could still be refused at load. The library's own factories do not take the element type from a value, as walk's inference would. They use a witness of their result type (F-229).

**Consequence:** A worker can take witness `typecase` plus `cast` as a pattern that gets past the compiled checker and picks a specialised store on both paths. That matters for array decision A (P-85). A worker must not treat it as guarded: no gated test holds it, the plain-plus-generic pair has not been checked under walk, and it has not been shown on the library's real array traits.

**Evidence:** The probe programs, which are in git history before `84aef6a4f` (so `84aef6a4f` deleted them). No gated test, and no command or output in the entry. Detail: `reviews/array-design-ways.md` section 3.

**Could not resolve:**
- "the library's `cast`": the skill never defines `cast`. I read it as a checked conversion that throws `CastError` on a mismatch (F-229 suggests this). There is also the question of which library: the compiled runs used the compiler's prelude, so on that path "the library's `cast`" must be the prelude's, or else something else is meant. That is a library concept missing from the skill, plus unclear wording.
- "as `additiveIdentity` does": `additiveIdentity` is not in the skill. Its shape is used as the reference but never described. Library concept I lack.
- "`mk[\RR64\](r)`": the name `mk` first appears here, and the entry never says what `r` is. Is `r` the witness, or a value argument? Unclear wording.
- "the compiled checker refused the type of its body": the entry does not say what that type was checked against. I assume the declared return type `Arr[\T\]`. Unclear wording.
- "A plain factory beside the generic one also worked compiled": I read "plain" as non-generic and "beside" as an overload of the same name. "Worked" could mean it compiled, or that it selected `DStore`. Unclear wording.
- "Where walk infers the element type from a value, the library's factories use a witness of their result type instead": this reads two ways. Either "whereas walk infers ..., the factories instead ..." or "in the cases where walk would infer ..., the factories ...". It is also unclear whether the probe's own witness was a value of the element type. Unclear wording.
- "array decision A (P-85)": the entry never says what decision A is, or how the fact "bears on" it. A record pointer I cannot follow cold.
- Note on form: the title carries a date, which `records.md` ("POSITIONS and FACTS") rules out for FACTS.

---

## F-229, "`array1` and `array2` give a vector and a matrix only at the eight number types ..."

**Established:** The library factories `array1` and `array2` return a `Vector` or a `Matrix` only when the element type is one of `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` or `RR64`. The choice is made by a `typecase` with one branch per number type. Each branch builds the array at its type and returns it through `cast`, as `additiveIdentity` does. At any other element type you get a plain array. That includes `Number` and `AnyIntegral`, because `Vector[\Number,n\]` violates the Vector family's bound on its element type (F-151, row 721). It also includes walk's `Int`, the type walk infers for an integer value (row 364), because no branch is exactly `Int`. The specification ("Array Expressions") says an array of `Number` elements is a vector. That disagreement is ledger row 729, status CONTESTED. The `typecase` is over a witness of the result type, not of the element type. With an element-type witness, walk's `Int`, which is below `ZZ32`, would take the `ZZ32` branch, and the `cast` would then throw `CastError`. `openRange` fails in exactly that way at `Int` (row 722).

**Conditions:** The behaviour is tested under walk. On the compiled side, all that is covered is that the compiled checker accepts these declarations, via the distance stage. Until the switch-over, compiled programs do not run the interpreter's library (`compiler.md`). Walk's `Int` gets the plain-array result, which for an inferred integer element type is probably not what the user wants.

**Consequence:** A worker who calls `array1`/`array2` and wants a vector or matrix must write the element type as one of the eight number types. Under walk, an inferred integer element type (`Int`) gives a plain array. A worker writing a similar factory should use a witness of the result type, not of the element type, or `CastError` follows at `Int`. The `Number` case is a CONTESTED disagreement with the specification. It is not settled.

**Evidence:** Gated under walk by `tests/ArrayFactoryNumberTypes` and `tests/ArrayFactoryAbstractNumber`. The compiled checker's acceptance is covered by the gate's distance stage. Detail: `compile-ladder/rung-library-factories/REPORT.md` section 1 (the change), sections 3 and 4 (the ways measured).

**Could not resolve:**
- "in `additiveIdentity`'s shape" and "`cast`": same gap as in F-159. Library concepts the skill lacks.
- "the family's element bound": the bound is never named, so I cannot tell why `Number` fails it but `RR64` meets it. F-151 presumably says. Library concept I lack.
- "`AnyIntegral`": not in the skill. I read it as an abstract integer trait above the integer types. Library concept I lack.
- "a witness of their result type": I cannot see how a value of the result type exists before the array is built, or whether the witness is a dummy value or a type. Not needed to use the fact. Unclear wording.
- "a witness of the element type would match `Int`": this is backwards. The `ZZ32` branch would match a witness of type `Int`, not the other way round. "`Int`, a type below `ZZ32`" is also news against the skill's sibling picture, which never mentions `Int`. Mostly a language concept I lack (walk's `Int`), with some unclear wording.
- "for the compiled checker by the distance stage": the skill says the distance stage counts the checker's errors. It does not say that a rise in the count turns the gate red, and `gate.md`'s seven steps do not include a distance stage. So I cannot tell whether a checker refusal of these factories would fail the gate or only move a number. Unclear gate semantics.

---

## F-162, "Citing `Specification/library/apis/*.tex` as an independent standard is circular."

**Established:** The API listings in the specification's library part are produced at build time from the library's own `.fsi` files (`Library/` and `ProjectFortress/LibraryBuiltin/`). They are not checked into the tree. The team said as much in `Specification/library/structure.tex:25-31` ("largely automatically generated from the API code").

**Conditions:** This applies to the generated api listings (`Specification/library/apis/*.tex`), not to the hand-written chapters of the specification.

**Consequence:** A listing cannot justify editing a `.fsi` file, because the edit just changes the listing in the next PDF. Cite the `.fsi` line instead. `references/specification.md` states the same rule.

**Evidence:** The team's sentence at `Specification/library/structure.tex:25-31`, and the build's generation of the listings from the `.fsi` files.

**Could not resolve:** Nothing.

---

## F-163, "Of the two copies of the specification, `Specification/` is the one to search and change ..."

**Established:** `Specification/` is the working copy, the one to search and to revise. `Specification-1.0-frozen/` is an exact copy of the team's Working Draft of 2011-02-02. In it, only `fortress.1.0.pdf` is the 1.0 release text. The `.tex` sources there are the later draft. In the frozen copy, Appendix I (changes) is the team's empty stub. In `Specification/`, it records the revival's changes (P-96). `Specification/fortress.pdf` is a draft build, so the team's `\note` boxes show in it. The team's unfinished restart is a third text, and it is later than both on some topics (F-166).

**Conditions:** The byte-for-byte equality is between `Specification/` at commit `2f8b4331a` and `Specification-1.0-frozen/` at `c02fa44d0`. Neither the restart nor the revival's later edits are part of it.

**Consequence:** Search and edit only `Specification/`. Leave the frozen copy alone, and cite it as the Working Draft of February 2011, except for its PDF, which is the 1.0 text. Do not treat the frozen `.tex` as 1.0. Expect `\note` boxes in `fortress.pdf`. `references/specification.md` says how to cite and change each copy.

**Evidence:** `git diff --quiet 2f8b4331a:Specification c02fa44d0:Specification-1.0-frozen` succeeds. Detail: `reviews/spec-change-form.md` sections 5 and 7.

**Could not resolve:**
- "`2f8b4331a`": the entry never says this is the team's commit of 2011-02-02, though the argument depends on it. I infer it. Unclear wording, minor.

---

## F-165, "The repository is a 2018 fork of `sirinath/fortress`, and `main` descends from `8fe1daa8f` ..."

**Established:** This repository was forked in 2018 from `sirinath/fortress`. `main` descends from `8fe1daa8f`, a commit that copied a third-party Java 9 port of the tree on top of the team's last commit, `a874948ac`. The port has no history in common with this tree. Most of its 1,506 files have since been removed or redone. One piece of it is still in use: the `FTypeArrayList` fix for a crash in JDK 8's `TreeSet`. `lineage.md` lists the port's remaining files for removal. A branch `clean-ladder` (`8332bd34f`) rebuilds on `a874948ac` without the port, but it never replaced `main`.

**Conditions:** This describes `main`'s ancestry. `clean-ladder` is a side branch, not the line work lands on.

**Consequence:** Expect port code in `main`. The `FTypeArrayList` fix is load-bearing, so do not remove it. Other port files are candidates for removal per `lineage.md`. Combined with `records.md`: give the port's lines no credit and name no author for them.

**Evidence:** `coordinator/lineage.md`, section "The facts" (the fork, the graft, the port's files), and section "Verification against Pavol's recollection (the same worker, re-briefed)", items "Working code" and "Verdict" (the running piece and the removal list). No command is given.

**Could not resolve:**
- "most of its 1,506 files are removed or redone" / "lists the rest for removal": I cannot tell whether "the rest" means the port files still in `main` apart from `FTypeArrayList`, or all port files not yet redone. Nor can I tell whether the removal is decided work (a PLAN item, a position) or only a recommendation in `lineage.md`, so I do not know whether a worker may delete them. Unclear wording.
- "the JDK 8 `TreeSet` crash": not explained, and not in the skill. Not needed to act. Minor.
- "`clean-ladder` ... never replaced `main`": whether the branch still matters, or is a dead end, is not said. Unclear wording, minor.

---

## F-166, "On the topics of its Types chapter, such as the exclusion rule and covariance, the team's latest word is the unfinished restart ..."

**Established:** The team began a restart of the specification, `Documentation/Specification/`, and never finished or adopted it. On the topics its Types chapter covers, such as the exclusion rule and covariance, the restart is the team's most recent statement, more recent than `Specification/`. It restates the exclusion rule as "instantiation exclusion" and adds `covariant`. On static parameters, traits, exceptions, components and the numeric library, `Specification/` is the only statement. The type group's POPL 2019 paper is later than both (F-?1).

**Conditions:** "Latest" is about the restart's Types chapter only. Elsewhere `Specification/` is all there is.

**Consequence:** When citing the team on the exclusion rule or covariance, cite the restart's Types chapter beside `Specification/` as the designers' later word. That matches `specification.md`. On the other topics listed, cite only `Specification/`.

**Evidence:** Detail: `coordinator/spec-lineage.md` section 6.

**Could not resolve:**
- "latest word": I read this as latest in time. It does not say the restart governs. The entry does not say how much weight the restart carries against `Specification/` or the curator's decisions. Unclear wording.
- "adds `covariant`": the skill says "Generics are invariant: there is no `+T` or `-T`". The entry does not say whether the restart's `covariant` is adopted, refused or still open in the revival, so a worker who reads "latest word" may think covariance is due. Unclear wording, against a stated language rule.
- "On static parameters, traits, ... `Specification/` is the only statement": the exclusion rule is a rule about traits and instantiations, and covariance is about static parameters. So the line between "topics of its Types chapter" and "static parameters, traits" is blurry. I cannot tell which questions about traits the restart speaks to. Unclear wording.
- "F-?1": an unnumbered cross-reference. It is the next entry in the file. Fine here, but it needs its number.

---

## F-?1, "The type group's POPL 2019 paper gives P-48's instance rule, and its soundness proof does not cover the library's F-bounded functions ..."

**Established:** The POPL 2019 paper by the team's type group states the same instance rule the curator adopted in P-48. Its soundness proof does not reach F-bounded functions like `SUM` and `BIG MAX`, whose type parameter is bounded by a type that mentions the parameter itself, for example `T extends AdditiveGroup[\T\]`. The reason is that its calculus forbids a method's type parameter from appearing in an upper bound. The calculus also omits top-level functions and functional methods, among other things. The paper is later than both `Specification/` and the restart.

**Conditions:** The proof covers only what its calculus models. F-bounded method parameters, top-level functions and functional methods are outside it.

**Consequence:** A worker may cite the paper for P-48's instance rule. A worker must not cite its soundness result as covering `SUM`, `BIG MAX`, other F-bounded library functions, top-level functions or functional methods. `reviews/decisions-review/popl-recheck.md` checks the curator's decisions against the paper.

**Evidence:** Detail: `research/extracts/ParkPOPL2019-extract.md` sections 6 and 8.

**Could not resolve:**
- "P-48's instance rule": the entry never says what the rule is. I cannot tell what the paper "gives" without reading P-48. A record pointer the skill does not explain (the skill only uses P-48 as an example number).
- "a method type parameter occur in an upper bound": this could mean in its own upper bound (F-bounding) or in any parameter's upper bound. The conclusion holds either way. Unclear wording, minor.

---

## F-167, "The specification states instantiation exclusion, and each example that the rule refuses now shows the library's shape beside it ..."

**Established:** `Specification/` now states instantiation exclusion: no type may extend two instantiations of one generic trait. This implements P-97. The text also forbids a `where`-clause variable as a static argument in an `extends` clause. Each example that the rule now refuses stays in the text, marked "Not allowed", next to the way the library writes the same thing. The refused examples are: the covariance example, a subtrait of every instantiation, the empty list, the empty optional value and "the root's algebra". The library's versions run on both paths, except `Nothing[\String\]` on the compiled prelude (row 331). The calculi in Appendix A carry a callout saying they predate the rule. The compiled checker does not yet refuse two cases the rule forbids. One is an object extending two instantiations that differ only in a `bool` static argument (row 406). The other is an object extending two instantiations of one trait where one of the arguments is a static parameter (row 414).

**Conditions:** This describes the specification's text. Two departures remain in the compiled checker, and `Nothing[\String\]` fails on the compiled prelude.

**Consequence:** Write code by the library's shape, not the refused examples. Do not rely on the compiled checker to catch the `bool`-argument case or the static-parameter case: those are open rows. Do not trust Appendix A's calculi on instantiation exclusion.

**Evidence:** Rows 331, 406 and 414. Detail and examples: `compile-ladder/rung-spec-route-a/decision-record.md` sections 2 and 3. The calculi's callout: its section 4.2.

**Could not resolve:**
- "the root's algebra": I cannot tell what "the root" is. It could be `Number`, `Any`, or the root of some trait hierarchy in an example. Unclear wording, or a concept I lack.
- "It also bars": "It" could be the specification or the rule. The meaning barely changes. Minor.
- "one of whose arguments is a static parameter": the referent of "whose" is ambiguous, either one of the two instantiations or the trait. I read it as: one instantiation's argument is the object's own static parameter, e.g. `O[\T\] extends {L[\T\], L[\ZZ32\]}`. Unclear wording.

---

## F-168, "The specification's number chapters describe the flat library, and its advanced chapter on rational quantities stays word for word as a superseded design."

**Established:** The specification's number chapters now describe the library as it is. The eight number types are siblings under `Number` (F-131). They convert only through the library's declared coercions (P-74), and every other conversion is explicit, e.g. `asFloat(x)`. The sign-refined types, such as positive ℚ, have been removed; a program checks a value's sign at run time instead (P-80). ℚ (`QQ`) includes +∞, −∞ and 0/0, so it claims neither a field nor a total order. `QQ` extends the four algebraic traits the library declares on it, and those traits' laws hold for the finite rationals only. The advanced chapter on rational quantities was left verbatim, as a superseded design. F-172 has the integer chapter's rules.

**Conditions:** The laws of `QQ`'s traits hold only away from ±∞ and 0/0. The advanced rational-quantities chapter does not describe the library.

**Consequence:** Cite the number chapters for the flat library. Do not cite the advanced rational-quantities chapter as current design. Do not assume `QQ` is a field or totally ordered. Do not write sign-refined types. Test signs at run time instead.

**Evidence:** Detail: `compile-ladder/rung-spec-numbers/decision-record.md` section 3. `Specification/basic-lib/numbers.tex:224-229` lists ℚ's traits.

**Could not resolve:**
- "stays word for word as a superseded design": it is unclear whether the chapter carries a mark (a `\revision` callout) saying it is superseded, or whether a reader just has to know. Unclear wording.
- "the four algebraic traits": not named. One has to open `numbers.tex:224-229`. Minor.

---

## F-169, "The Working Draft never wrote static-argument inference, never named the type that a library gives an integer numeral, and never named a range's integer type ..."

**Established:** The team's Working Draft left three things unwritten: how static arguments are inferred, what type an integer numeral has in the library, and what integer type a range has. Its inference chapter is only a heading and notes. It described numeral types like `NaturalNumeral[\n,10,v\]` without tying them to the number types. Its ranges section names no integer type. The restart adds nothing on these three. So the current `Specification/` text on them is the revival's own. That text states F-173's inference rule and F-170's ranges, and gives integer numerals the type `IntLiteral` (P-76).

**Conditions:** This covers only these three topics.

**Consequence:** When you cite `Specification/` on static-argument inference, numeral types or range integer types, you are citing the revival, not the team. Do not present it as the team's design.

**Evidence:** Detail: `reviews/numerics-plan-coordinator/evidence-B.md` sections 1 and 2. `Specification/basic/expressions/literals.tex:154-156` has the callout on the numeral types.

**Could not resolve:** Nothing that blocks. (`IntLiteral` and `NaturalNumeral` are not in the skill, but the entry says enough.)

---

## F-170, "The specification's ranges are over ℤ32, and its own ranges over wider integer types are respelled."

**Established:** In `Specification/`, ranges are over ℤ32 only. An integer numeral, or a `nat` or `int` static parameter, converts into a range's ℤ32 bounds (row 485, FIXED). Any other integer type as a range bound is a static error. If a loop counter needs a wider type, run over a ℤ32 range and widen each element. The specification's two examples that built `ZZ64` ranges now run over ℤ32, and both run in `ant testSpecData`, a gate step (F-114).

**Conditions:** These are the specification's rules. `library.md` adds that walk stops at run time when it builds a non-ℤ32 range, so under walk it is not a static error.

**Consequence:** Do not write ranges over `ZZ64` or other wider types. Write a ℤ32 range and widen the element inside. The respelled examples are guarded by the gate.

**Evidence:** Row 485 (FIXED), and the two examples run in `ant testSpecData` (F-114). Detail: `compile-ladder/rung-spec-ranges/decision-record.md` sections 2 and 3. `Specification/basic/expressions/ranges.tex:42-58` and `:88-109`.

**Could not resolve:**
- "Another integer type is a static error": this is the specification's statement. The entry does not say what each path does today. `library.md` says walk stops when it builds one, at run time. Unclear wording, minor.
- "a range's ℤ32 components": I read "components" as the range's bounds, not Fortress components (the unit of code). Minor wording clash with the skill's term "component".

---

## F-171, "The specification reads a `comprises` clause as the restart's Types chapter does: every value of the trait is a value of a listed type."

**Established:** `Specification/` reads `comprises {A, B}` as "every value of this trait is a value of a listed type", the restart's reading. So a generic trait can extend the closed trait without being listed, provided at least one type extends it and every type extending it is below a listed type. A listed type may be an instantiation at the trait's own static parameters or at `where`-clause variables. The text is silent on listing a bare type variable, and walk overflows its stack on one (row 407). The compiled checker departs from this reading in three ways. It checks only the closed trait's immediate subtypes (row 487). It reads the clause using the subtrait's own type-variable names (row 489). It finds extenders by a name's plain text (row 490). Whether the team's commented-out `comprises Integral[\I\] where [\I\]` is valid is an open question (F-121).

**Conditions:** This is the specification's reading. The compiled checker does not yet follow it (rows 487, 489, 490). Bare type variables in the list are unspecified and crash walk.

**Consequence:** A worker can let a generic subtrait go unlisted under the stated condition. A worker must not list a bare type variable. Expect the compiled checker to give wrong answers in the three listed ways. Do not settle the `Integral[\I\]` clause, because it is open.

**Evidence:** Rows 407, 487, 489 and 490, and F-121. Detail: `compile-ladder/rung-spec-comprises/decision-record.md` section 2.

**Could not resolve:**
- "a trait with static parameters may extend the closed trait without being listed": I cannot tell whether "with static parameters" is a real limit (so a non-generic trait must be listed) or only the case the rule was written for. Unclear wording.
- "if at least one type extends it": the reason for this condition is not given. A trait with no extenders would satisfy "every value is of a listed type" vacuously. So I can apply it but not explain it. Unclear wording, minor.
- "reads the clause in the subtrait's own type-variable names": I take this as the checker failing to substitute the subtrait's arguments for the closed trait's parameters. It is a defect description, and the row would say. Minor.

---

## F-172, "The specification's integer chapter states the library's integer rules."

**Established:** The specification's integer chapter now matches the library. It states `narrow`, `LSHIFT` and `RSHIFT` on the five integer types (`ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, by my count). It states that `shift` is exact for any shift count, and that `GCD` and `LCM` are nonnegative. A fixed-size result too large for its type throws `IntegerOverflow`. At a negative exponent: bases 1 and -1 give their exact power, base 0 throws `DivisionByZero`, and every other base throws `IntegerOverflow`.

**Conditions:** These are the specification's rules. For the library's power under walk, see F-263.

**Consequence:** Expect `IntegerOverflow` rather than wrap-around on fixed-size results (wrap-around takes the dotted operators in `library.md`). Expect the stated negative-power behaviour. Cite the integer chapter for the library's rules.

**Evidence:** Detail: `compile-ladder/rung-spec-integer-rules/decision-record.md` section 2. `Specification/basic-lib/basic-integers.tex:530-542` covers the power.

**Could not resolve:**
- "`narrow`", "`LSHIFT` and `RSHIFT`" versus "`shift`": the entry does not say what `narrow` does, or how `LSHIFT`/`RSHIFT` differ from `shift`, e.g. whether they truncate where `shift` stays exact or throws. Library concepts the skill lacks.
- "F-263 gives the library's power under walk": I cannot tell whether walk's power agrees with the rule just stated, or departs from it. The title says the chapter "states the library's integer rules", which suggests agreement, but the separate pointer suggests a difference. Unclear wording.

---

## F-?2, "The coercion example of the specification's "Coercion Resolution", over `ZZ32`, `ZZ64` and `ZZ128`, declares the exclusions that the chapter's definitions need ..."

**Established:** The coercion example in the specification's "Coercion Resolution" section, which uses types `ZZ32`, `ZZ64` and `ZZ128`, now declares `ZZ32 excludes { ZZ64, ZZ128 }` and `ZZ64 excludes { ZZ128 }`. The chapter defines rejection, and from that which declaration is no less specific, in terms of exclusion, so the example needs these declarations to work as the text says. The revised example ran as printed on both paths, giving `f(S32Of) = 1`.

**Conditions:** The run on both paths was a probe. Only the walk side is gated. On the compiled side it presumably ran on the compiler's prelude.

**Consequence:** The example is now consistent with the chapter's definitions. A worker can rely on walk's behaviour on it, since it is gated, but not on the compiled side, which has no gated test.

**Evidence:** Under walk, `tests/CoercionMostSpecificRungC.fss` gates it (row 394, FIXED). The compiled run was a probe of "the rung". Detail: `compile-ladder/rung-spec-integer-rules/decision-record.md` section 2, decision 6. `Specification/basic/conversions-coercions.tex:500-516` and `:580` onward.

**Could not resolve:**
- "`ZZ128`": not among the library's eight number types. So the example presumably declares its own types named `ZZ32`, `ZZ64`, `ZZ128`, but the entry does not say whether they are the example's own or the library's. Unclear wording, with a concept I lack.
- "`S32Of`": not explained. Presumably a value or object of the example. Unclear wording.
- "rejection, and so which declaration is no less specific": "rejection" is a term of the coercion chapter that the skill does not define, and the clause is hard to parse. Language concept I lack, plus unclear wording.
- "In a probe of the rung": no rung is named until the Detail pointer (rung-spec-integer-rules). Unclear wording, minor.
- "F-?2": unnumbered. It needs its number.
