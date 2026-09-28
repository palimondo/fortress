<!-- Which declaration runs when conversions are involved: the nine steps and every way, for the Fable judgement and then Pavol, written 2026-09-28 by an Opus worker, finished at 14:31 UTC, on main (0e6769ae3 at the start, 0eb44316f when the soundness check landed; batch 7C running in its own worktrees, untouched). The question is probe K's item 9 widened by Pavol's request of 13:51 UTC for one global rule (POSITIONS 2026-09-28). Read: protocol and the coordinator's record; the specification's coercion, overloading and inference chapters with the proof appendix; the Types paper, Welterweight and the implementers' dispatch plan; the checker's ranking and dispatch-set code; walk's dispatch as the records describe it; the one library and the compiler library; the records before-n-questions.md, option-2-soundness.md (cited for every measured shape of options 1 and 2), inference-rule-shadow.md, PROBE-K.md, flattening-questions-ways.md and overloading-judgement.md; git history across the cut links (git log --all --full-history, pickaxe). Measured here: nothing on either Fortress path; ant was not run. One reading-only script over the library's api files (conversion-overloading-ways/catchall-grep.py, output catchall-grep.txt). Peers read from primary documents at the URLs given (the C# standard's draft-v8 text and Swift's TypeChecker.md downloaded into the session scratch directory and read there, not committed); the two type-theory papers are cited by their bibliographic records, not re-read. A reading of mine is marked "my reading". -->

# Conversions and overloading: one rule for which declaration runs

## For Pavol

**Where you are.** At 13:32 UTC you chose option 2 on a condition: that it is sound. At 13:37 and 13:51 UTC you asked for the wider picture and for one global rule before deciding. The soundness check has landed (`option-2-soundness.md`). This note takes it from there.

**Overloading here.**
- One name can have several declarations. A call runs the most specific one that fits.
- "Fits" means each argument's type is the parameter's type or a subtype of it.
- "Most specific" means its parameter types are narrower than the others'.

**Conversion here.**
- A type can declare that it accepts another type by conversion: `ZZ64` declares `coerce(x: ZZ32)`.
- Since answer 8, only exact conversions are automatic: `ZZ32` into `ZZ64` or `RR64`, and so on.

**Two rules decide today, and they point in opposite directions.**
- The specification's coercion chapter: if any declaration fits without converting, pick among those. Convert only when nothing fits.
- Your answer 8, for a generic call over mixed widths: convert to the narrowest common type (`ZZ64`), rather than keep the common parent type (`AnyIntegral`) without converting.
- So inside one generic declaration, "convert to a narrow type" wins. Between two declarations, "don't convert" wins.
- Your fork is where the two meet. The generic's `ZZ64` copy needs a conversion. The plain arm over `Any` needs none.

**Why now.** Before the flattening, `ZZ32` was a subtype of `ZZ64`, so nothing needed converting. The flattening made them siblings, and answer 8 made inference convert.

**What the choice changes for speed.**
- The generic at `ZZ64` runs through a class the compiled path stamps for `ZZ64`, with no run-time test. Its values stay boxed, and it adds one conversion per call.
- The plain arm over `Any` is reached through a dispatcher that tests the arguments' types at run time.
- The generic at the common parent type (today) runs on an abstract type.
- "Most specific" is not always "fastest". It is fast when the library declares a fast arm at that type.

**What the soundness check found.**
- Option 2, read the way answer 9 already words it ("reading A"), is sound. It needs one sentence in the coercion chapter.
- But reading A does not reach the library's usual generics, whose bound names the type itself (`T extends Integral[\T\]`). There the plain arm still runs.
- The stronger reading ("the promotion's conversion never counts", "reading B") reaches them but is not sound: some valid declarations then have calls with no single answer.

**The rule I recommend (my reading), in plain words.**
- List every declaration, and every copy of a generic declaration, that fits the call with or without conversions.
- If one of them is more specific than all the others, run it, converting what it needs. "More specific" is the relation the coercion chapter already defines: a subtype, or a type that converts into the other one and not back.
- If no single one is more specific than all the others, fall back to the chapter's present order: prefer the ones that need no conversion.
- Conversions are chosen at compile time. The run-time dispatch then works on the converted values, as today.

**What it does.**
- Your fork runs the generic at `ZZ64`, with either kind of bound. So it reaches the library's usual generics.
- Answer 8 becomes a special case of it, not a second rule.
- The rule itself never turns a call the chapter's order resolves into an error. One planned call does become an error through another rule: rung R's size refusal meets row 79's `ee(5)`.
- Every example the coercion chapter prints gets the same answer as today.
- It is your idea of 13:51 UTC in a sound form, and it is close to C#'s rule.

**What it costs.**
- It changes the coercion chapter's rule "convert only when nothing fits", the designers' own, where a converted arm is more specific than every other. That includes plain arms: `f(x: ZZ64)` beats `f(x: Any)` for a `ZZ32`.
- In the library, `z = w` then reaches `ZZ64`'s own `=` instead of the rational comparison. But `z1 =/= z2` would reach `QQ`'s `=/=` and compare as rationals, until one library line removes `QQ`'s redundant `=/=`.
- Two gated tests from rung C and one planned rung Q assertion pin the old order and would be restated.
- Walk still differs from the compiled path where declared types are abstract, such as inside a generic function's body.
- A probe of both paths over the tests, demos and microGPT, as probe K did, before any batch.
- The checker needs an ambiguity check it lacks today. The numeral's default and row 484 already call for one.

**Found on the way, for rung Q whatever you choose.** After the numeral switch, a numeral is a `Number` but not a `ZZ32`. Under the present order, `x = 0` for a `ZZ32` `x` then runs `Number`'s own `=` (rung F's), whose helper has no case for a numeral. By reading, it would answer wrongly. Probe Q should check it.

**The fallback.** If the judge keeps the designers' order, reading A is sound and needs one sentence. Its price: generics with a self-naming bound lose to a catch-all, and mixed calls keep reaching catch-alls such as `Number`'s `=`.

## 1. The mathematics and the type theory

**The objects** (read).
- A call has static argument types `A` (the checker's) and run-time types `X`, with `X <: A`.
- A candidate is a declaration, for a generic one an instance within its bounds, together with the conversions its parameter types need from `A`.
- Subtyping `<:`. Coercion `T →c U`: declared in `U`, one step, not chained (`Specification/basic/conversions-coercions.tex:144-149`). Substitutability `T ≼ U`: `T <: U` or `T` coerces to `U` (`:417-432`), not transitive.
- "No less specific" `T ⪯ U`: `T <: U`, or `T` excludes `U`, coerces to `U` and rejects `U` (`:486-500`); `T` rejects `U` when every type that coerces into `T` excludes `U` (`:490`). On tuples it is taken position by position (`:510-513`). It is reflexive and antisymmetric, and not transitive in general (`:503-509`).
- Overloading resolution picks a least element among the candidates in some order. The whole question is which order.

**Two orders are on record** (my reading, from the texts cited).
- Order C, the coercion chapter's: first "needs no conversion" beats "needs one"; within each group, the more specific parameter type (`:472-476`, `:533-553`). It is lexicographic, with the cost of conversion first. Java's invocation phases and Swift's solution score are orders of this kind (section 6).
- Order P, answer 8's promotion: among the instances of one generic declaration, take the instance whose parameter type is `⪯` every other's. For `(ZZ32, ZZ64)` and `T extends Number`, the instances that fit with or without conversion are `T` in `ZZ64`, `ZZ`, `QQ`, `AnyIntegral`, `Number`, `Any` and unions. `ZZ64` is a subtype of the abstract ones, and it excludes, converts into and rejects `ZZ` and `QQ` (every type that converts into `ZZ64`, `ZZ32` and `NN32`, excludes them). So `ZZ64` is `⪯` every other. "The narrowest type every argument converts into" is exactly the `⪯`-least instance. Answer 8 therefore already ranks "convert to a more specific type" above "no conversion at a more general type". That is C#'s order ("better conversion target", section 6).
- The fork is where the two orders meet. Applied across declarations, order P runs the generic's `ZZ64` instance and order C the plain arm. Every way in section 9 is a way of deciding which order governs where. With one order there is no fork.

**What keeps dispatch type-safe.**
- The specification's overloading resolution happens at run time: "we consider the declarations that are applicable to that call at run time" (`Specification/basic/overloading.tex:262-276`). Coercion is resolved statically, and the coerced call then runs (`conversions-coercions.tex:584-591`).
- Its promise: "the most specific declaration that is applicable to a dynamic call is more specific than the most specific declaration that is applicable to the corresponding static call" (`Specification/advanced/overloading.tex:466-468`). With the return-type rule, that makes the static type safe.
- The promise needs applicability closed downward: if a declaration applies to `A`, it applies to every `X <: A`. The Types paper's reading has it: a generic declaration "is applicable to a type if and only if at least one of its instances is" (`Papers/Types/setup.tick:393-397`).
- An applicability defined by the instance that inference picks does not have it. Under "the generic applies without conversion only if its promoted instance takes the arguments as they are" (option 1), the generic applies to `(Number, ZZ64)` (instance `Number`) and not to `(ZZ32, ZZ64)` (instance `ZZ64`, `z` converted), although `(ZZ32, ZZ64) <: (Number, ZZ64)`. Then the run-time choice can be less specific than the static one. That is option 1's defect, measured as a split on the arm (`option-2-soundness.md` section 2, `O2Wide`: compiled runs the generic at `Number`, walk under the rule the plain arm). My reading adds: with the generic returning `T` and the plain arm returning `Any`, a pair the Subtype Rule accepts, walk would return a value outside the call's static type.
- The designers' later model never converts when it instantiates at run time. The paper leaves dynamic instantiation "beyond the scope of this paper" (`Papers/Types/rules.tick:118-129`). Welterweight's dispatch computes each parameter's least lower bound, the join: "inference also aims to obtain the most specific instantiation of an applicable entrypoint" (`Papers/Welterweight/dispatch.tick:67`, `:187-193`). Chase's plan for the code generator infers the same join (`Papers/Implementation/MethodMapping.tex:309-319`).

**Coherence** (cited from the literature, not re-read here).
- Reynolds (1980, "Using category theory to design implicit conversions and generic operators", LNCS 94, pp. 211-258, https://link.springer.com/chapter/10.1007/3-540-10250-7_24) treats implicit conversions and generic operators together. The design is free of anomalies when converting and then applying the wider type's operator gives the same result as applying the narrower type's operator and then converting. Then choosing between a converted path and an unconverted one cannot change a program's meaning.
- Castagna, Ghelli and Longo (1995, "A calculus for overloaded functions with subtyping", Information and Computation 117(1), pp. 115-135, https://www.sciencedirect.com/science/article/pii/S0890540185710334) give the calculus of overloaded functions chosen by the argument's run-time type. Its conditions, result types that follow argument types and a best branch for every argument type, are the Fortress Return Type and Meet rules.
- For Fortress numbers (my reading): answer 8's exact conversions are embeddings, so they commute with `+`, `×`, `=` and `<`. The one exception is overflow: walk's `ZZ32` operators raise `IntegerOverflow` where the `ZZ64` ones answer (FACTS, the interpreter's integer rules). Converting gives the same answer, or the mathematically right one where the narrow operator would overflow. For a catch-all over `Any` or `Number`, coherence is the library author's to keep; no rule checks it.

**What each order needs for a single answer.**
- Order C: the overloading rules and the appendix's proof. The proof's lemma assumes that no declaration applies without coercion (`Specification/appendices/overloading-coercion.tex:75-96`).
- Order P across declarations: a candidate that needs no conversion can be incomparable with one that does (`O2Tie`, section 2). A pure order P needs a tie rule or a call-site error there.

## 2. What each path does today and under batch N's rule (cited)

- **Today, both paths**: the generic arm at the common supertype, nothing converted: `op generic[ZZ32,ZZ64]` (`before-n-questions.md` A.1).
- **Under batch N's rule as the two shadows built it**: the plain arm on both paths (A.1). The checker ranks a candidate that holds no coercion above one that does (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1085-1095`); walk's subtyping pass tests the promoted instance (`PROBE-K.md` section 6).
- **Static types wider than the values** (`n: Number` holding a `ZZ32`): compiled runs the generic at `Number`; walk under the rule runs the plain arm (`option-2-soundness.md` section 2, `O2Wide`). With no plain arm, walk still runs a different instance (`same(n, w)`: compiled `[ZZ32, ZZ64]`, walk `[ZZ64,ZZ64]`, `O2Lone`): that split is rung K's run-time promotion, not the fork's.
- **Arguments typed `Any`**: compiled runs the plain arm, because its dispatcher joins two run-time types only when one is a supertype of the other; walk stock runs the generic (`O2Lone`; `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1609`).
- **A self-naming bound** (`eqop[\T extends Equality[\T\]\]` beside `eqop(Any, Any)`): the plain arm on stock, rule and walk; the rough reading-B build runs the generic at `ZZ64` (`O2FbAny`).
- **Numerals on the compiled path** (its numeral is already the sibling `IntLiteral`): under the rule `op(1, w)` runs the plain arm; `op(1, 2)` the generic at `IntLiteral` (`O2Num`).
- **The compiled dispatcher.** The call site keeps the static winner and the statically applicable candidates more specific than it whose static parameters the winner's arguments fix (`STypesUtil.scala:1101-1130`). A converted call then dispatches again: the generic chosen at `ZZ64` beside `op(ZZ64, ZZ64)` runs the plain arm (`O2Z64`, rule). The same pair on the stock build dies, "Overloading instanceof match failure" (not on record; `option-2-soundness.md` section 7).
- **What the stamped `ZZ64` copy costs**: one static load, one conversion, one interface call, no run-time test, nothing unboxed (`option-2-soundness.md` section 6).
- **The plain analogue on the compiled path** (ledger row 390): `p(x: Wide)`, `p(x: Any)` and a `Narrow` argument die with `NoSuchMethodError`; walk prints `p(Any)`.
- **Row 484** (`b MAX 1` for a `ZZ64` `b`): walk stops, "Ambiguous coercion"; the checker has no ambiguity check and takes the head of its sorted list (`before-n-questions.md` B.1, B.3; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:460-463`).
- **Reach**: no test, demo or microGPT call reaches the fork (`PROBE-K.md:11`, `:17`).

## 3. What the specification says, under every spelling (read)

- **The order.** "This rewriting does not occur if there exists a declaration that is applicable to the call before the rewriting" (`conversions-coercions.tex:279-282`). "We first determine whether there exists a declaration that is applicable without coercion. If so, the most specific declaration is selected; if not, then coercions are explicitly added" (`:472-476`); with the sets Σ and Σ′ (`:533-553`).
- **The relation for converted candidates**: `⪯` with "rejects" (`:486-516`). It is already C#'s "better conversion target" in Fortress terms: `T` beats `U` when `T` converts into `U` and `U` cannot come back.
- **Where coercion may happen**: a parameter whose declared type is "exactly the type U being coerced to", not a supertype of it (`:94-99`). "Types named by type parameters do not have coercions" (`:363-365`).
- **Static resolution** and its example, `f(c)` with `c: C` holding a `D` calling `f(A)` although `f(B)` fits `D` (`:584-617`).
- **Restrictions**: no coercion from a subtype, no cycles (`:626-660`). Nothing forbids a type that converts into two excluding types, which batch N's sibling `IntLiteral` is (`CLIMB-BATCH-N.md` Q1).
- **Declarations that each need different conversions**: the Meet Rule's coercion clause. For every pair of types the two parameter types convert from, either they exclude or a declaration at their meet exists (`advanced/overloading.tex:247-274`). That is the specification's answer to `f(ZZ64, RR64)` beside `f(RR64, ZZ64)`: declare a meet, such as `f(ZZ32, ZZ32)`, for each source they share.
- **The uniqueness facts** (`advanced/overloading.tex:449-470`) and the proof, which covers the phase with coercion only when no declaration applies without it (the appendix lemma).
- **Inference order**: static parameters are "inferred ... before checking the applicability" (`basic/overloading.tex:170-175`, `:205-207`) and "before comparing" (`:292-295`). Answer 9 rewrites both: applicability and specificity on the quantified types; "inference instantiates the chosen declaration; it does not precede the comparison" (`overloading-judgement.md:84`).
- **The inference chapter** is a note (`basic/inference.tex:15`); rung T writes it.
- **The same idea spelled as widening.** A declaration that needs a coercion replaces one that needs none, "possibly at the expense of requiring a new coercion in a subexpression---but this is exactly the desired effect" (`conversions-coercions.tex:840-848`). It is driven by the context's expected type, only for `widens` coercions, "best left to expert library designers" (`:915`), never implemented, and deferred by answer 8. It is the one place where the designers let a converted declaration beat an unconverted one: for precision.
- **Every example of the chapter answers the same under order C and under the rule of my reading** (checked by hand): the `hack`, `foo` and `bar` table (`:284-346`; `bar(Q, Q)` stays, since `Q` converts into `X`, excludes it and rejects it); the `Frobboz` example; the `ZZ32`/`ZZ64`/`ZZ128` example (no declaration fits without coercion); the `f(c)` example (`f(B)` does not fit the static type `C`); and widening's `a · b` (`(RR32, RR32)` is `⪯ (RR64, RR64)`). The two orders differ only when an unconverted arm sits at a wider type than a converted one: a catch-all. The specification has no example of that shape.
- **The later sources.** The restart's Types chapter defines coercion (`Documentation/Specification/Prose/Language/types.tick:938-947`) and says nothing of overloading resolution; its `coercion.tick` and `type-inference.tick` are headers. The Types paper and Welterweight have no coercion (`before-n-questions.md` A.4).

## 4. Where it sits in the type system: three places a conversion can enter

1. **Choosing an instance** of a chosen generic declaration: inference, answer 8, rung T's chapter.
2. **Choosing a declaration**: coercion resolution, the coercion chapter.
3. **Run-time dispatch**: in the specification it never converts; it chooses by subtyping among the declarations that fit the (already converted) values. Walk has only run-time types, so it does places 1 and 2 at run time too.

The fork is place 1 feeding back into place 2 (my reading). Option 1 lets the instance of place 1 decide applicability in place 2. Option 2, reading A, keeps place 2 on declared domains and runs place 1 afterwards. The rule of my reading uses one order for places 1 and 2.

## 5. What the library already does in the same family

- **Per-type arms and conversions, no catch-all**: `+`. `z + w` reaches `ZZ64`'s own `+`, since no arm fits without conversion (`PROBE-K.md:34`).
- **Per-type arms beside catch-alls**: the one family on the number side of the one library, found by `conversion-overloading-ways/catchall-grep.py` (top-level functions and functional methods only). The script lists six names; by inspection `^`, `assert`, `juxtaposition` and `random` are not this family (exponent or string positions, or arms from the compiler library). What remains:
  - `=`: the top-level `opr =(a: Any, b: Any)` (`Library/FortressLibrary.fsi:69`), `Number`'s `opr =(self, other: Number)` (`:288`, rung F's, `d846e3644`), and per-type arms on `RR64`, `QQ`, `NN64`, `ZZ32`, `ZZ64` and `IntLiteral`.
  - `=/=`: the top-level `=/=` over `Any` (`:71`, body `NOT (a=b)`, `.fss:98`) and `QQ`'s (`:406`, body `NOT (self = other)`, `.fss:571`). No other type declares `=/=`.
- **What `Number`'s `=` does.** It is a catch-all that converts, like Julia's promotion methods, but into `QQ`: "two exact numbers of different types compare as rationals" (`FortressLibrary.fss:361-371`), through `exactValue`, a `typecase` over `QQ` and the five integer types with `else => Ratio(0, 0)` (`:374-383`). Under order C, by reading, a mixed `z = w` runs it, not `ZZ64`'s own `=`.
- **The numeral switch meets it** (by reading, for probe Q). The switch's library makes `object IntLiteral extends { Number }` (`explorations/compile-ladder/plan-6.5/probes/numeral/numeral-lib-A0.patch:144`). Under order C, `x = 0` with `x: ZZ32` then has `Number`'s `=` and the `Any` one fitting without conversion, and `ZZ32`'s own `=` only with it. So `Number`'s `=` runs, and `exactValue` of an `IntLiteral` falls to `Ratio(0, 0)`: a wrong answer. Neither the A0 patch nor `distance-triage/variants.py` touches `exactValue` (grep). Under the rule of my reading, concretely typed code reaches `ZZ32`'s own `=`. Inside a generic body, whose static type is a type parameter with no coercions, the compiled path reaches `Number`'s `=` under every rule. So `exactValue` needs an `IntLiteral` case in rung Q whatever is decided here.
- **The compiler library** declares no `=` on `Number` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:96`); its `IntLiteral` declares its own `=` (`:390`, `:412`).
- **Generic beside plain**: no library family has a generic arm bounded by a number type beside a plain arm over `Number` or `Any` (`before-n-questions.md` A.3).
- **Row 484's family**: the library's device is a per-type arm, on `QQ` and `RR64` in the one library and on every number type in the compiler library (`before-n-questions.md` B.2).

## 6. What the peers do, each with its global consequence

- **C#** (read: the standard's draft-v8 text, `standard/expressions.md` §12.6.3.13, §12.6.4.3, §12.6.4.5-7, https://github.com/dotnet/csharpstandard/blob/draft-v8/standard/expressions.md).
  - One phase. A member is better when, argument by argument, its conversion is never worse and at least once better. A conversion is better when it is an identity and the other is not; otherwise when its target is the better conversion target: "An implicit conversion from T₁ to T₂ exists and no implicit conversion from T₂ to T₁ exists".
  - Inference fixes a type variable to "a unique type V to which there is an implicit conversion from all the other candidate types": `long` for an `int` and a `long`.
  - A non-generic method beats a generic one only when their parameter types are identical.
  - A signed integral target beats an unsigned one (the last bullet of §12.6.4.7). That is batch N's Q1 default, written as a ranking rule.
  - Consequence: `Op<long>(long, long)` beats `Op(object, object)`; `F(long)` beats `F(object)` for an `int`. A call with no better member is an error at the call.
- **C++** (read: [over.ics.rank]/2 and /4, [over.match.best.general]/2, [temp.deduct.call]/4, https://eel.is/c++draft/).
  - Argument by argument, ranked kinds of conversion: an exact match beats a promotion, which beats a conversion; a standard conversion beats a user-defined one. A function is better when no argument is worse and one is better; a non-template beats a template only on a tie.
  - Template deduction wants the deduced type identical to the argument's, with three narrow exceptions, so `T` cannot be both `int` and `long`: `std::max(1, 2L)` does not compile.
  - Consequence: the fork's generic arm is not viable. A user-defined conversion (Fortress's `coerce`) ranks below a derived-to-base conversion.
- **Java** (JLS 15.12.2, measured by the earlier note, `before-n-questions/peers/java.txt`): phases, strict (subtyping and primitive widening), then loose (boxing), then varargs. Inference joins; it never converts to fit `T`. Consequence: the generic at the common supertype; `pr(long, long)` beats the generic because widening is strict and boxing loose.
- **Scala** (read, https://docs.scala-lang.org/scala3/reference/dropped-features/weak-conformance.html): Scala 2 used "a weak conformance relation when testing type compatibility or computing the least upper bound"; Scala 3 "drops the general notion of weak conformance" and keeps "Int literals are adapted to other numeric types if necessary".
- **Swift** (read, `docs/TypeChecker.md`, "Comparing Solutions" and "Solution Ranking", https://github.com/swiftlang/swift/blob/main/docs/TypeChecker.md): no implicit numeric conversion. Solutions are compared by a score vector, lexicographically, that counts implicit conversions and "Number of conversions to Any" among others; only then by subtypes of bindings and overloads. Consequence: order C's kind; mixed widths are an error; a catch-all over `Any` pays for its conversions.
- **Julia** (read, https://docs.julialang.org/en/v1/manual/conversion-and-promotion/): "the arguments of functions are never automatically converted". The library's catch-alls promote and call again: `+(x::Number, y::Number) = +(promote(x,y)...)`, which say "in the absence of more specific rules ... promote the values to a common type and then try again". The JIT then compiles a copy per concrete type. Consequence: your idea, as a library convention rather than a language rule.
- **Haskell** (read, Haskell 2010 Report §4.3.4): no implicit conversion; a numeric literal is overloaded; an ambiguous numeric type defaults by "default (Integer, Double)". Mixed widths are a type error.
- **Rust** (read, https://doc.rust-lang.org/rust-by-example/types/cast.html): "Rust provides no implicit type conversion (coercion) between primitive types." Generics are compiled per type. Mixed widths are an error.
- **Kotlin** (from `flattening-questions-ways.md` step 6): no implicit conversion of values; operators overloaded per width pair.
- **Summary** (my reading). Languages without implicit conversion (Swift, Rust, Haskell, Julia's core) make the fork an error or leave it to the library. Of those with conversions, C# ranks targets and would run the generic at `long`; C++ refuses to deduce; Java joins. None of them has Fortress's run-time multiple dispatch with static conversion, except Julia, which has no conversion in dispatch.

## 7. The history in the commits (git, read)

- **The coercion chapter** enters git with Sukyoung Ryu's import of the specification sources, 2009-11-06 (`0f49d8698`, "Added the entire spec files. The next task is to integrate the technical decisions since 1.0"); the proof appendix on 2009-11-02 (`cec470a34`). Its earlier history is outside git. A note in it cites "Victor's email titled Coercion between tuple types on 07/16/07" (`conversions-coercions.tex:22`). The 1.0 release of March 2008 has no coercion chapter: the text of `Specification-1.0-frozen/fortress.1.0.pdf` mentions coercion only in its list of reserved words, its grammar and one `Boolean` example (pdftotext of the PDF, read).
- **The checker's coercion oracle**: Justin Hilburn, 2009-04-02 (`ab00f28ad`), finished by Eric Allen, 2009-05-07 (`10af90c1b`).
- **The checker's order C ranking** ("If one did not use coercions and the other did, the one without coercions is more specific"): Hilburn, 2009-08-18 (`fc99e1ef2`, "Added coercions to function application"); refactored by Scott Kilpatrick, 2009-09-10 (`595f740e8`).
- **The Types paper, OOPSLA 2011** (Allen, Hilburn, Kilpatrick, Luchangco, Ryu, Chase, Steele, `Papers/Types/paper.tick:215-221`): generic overloading without coercion; dynamic instantiation left out. Welterweight, 2012: dispatch by the join. Chase's code-generator plan, 2012-05-21 (`4a839480f`): the join again.
- **The compiler library's flat coercions**, 2009-2012 (`flattening-questions-ways.md` step 7). Widening never implemented.
- **Walk** converted nothing until rung C (2026-09-26, `b628871a2`), which built order C: a subtyping pass, then a coercion pass ranked by the specification's relation (FACTS, "Under `walk`, the interpreter converts by coercion at its three kinds of type check").
- **The revival**: answer 8 (2026-09-26); rung F's `Number` `=` (2026-09-27, `d846e3644`); batch N's shadows (2026-09-27 and 28).
- My reading: the team wrote order C for plain declarations between 2007 and 2009, before generic overloading was settled (2011) and before any promotion rule existed. Nobody on the team met the fork.

## 8. The derivation from Pavol's principles, and his own idea

**The principles in play.**
- Fast code the JVM can specialise (13:10, 13:32 UTC).
- One global rule, not "rule on the rule" (13:51 UTC).
- Sound: nothing that checks may fail at run time, or answer differently on the two paths.
- Custodians: finish what the designers intended; where the specification is silent or early, the type group's later word weighs more (protocol principle 1).

**What they give** (my reading).
- The designers' order C is explicit for plain declarations and silent on generics with promotion. Their later model has no coercion. So on the fork itself, the record holds only answer 8, which is order P.
- One global rule means one order for places 1 and 2 of section 4. Order C everywhere would reverse answer 8 wherever another arm fits unconverted. Order P everywhere needs a tie rule (`O2Tie`). Order P with order C as the tie rule is the rule of my reading.
- "Fast" favours order P, with the caveat that it reaches the most specific declared arm, which is fast only if the library declares a fast one (`=/=`, section 9, way 4).

**His idea, stated precisely.** "If there is a conversion to a specific type, it should be applied. And only if all combinations are exhausted and we haven't reached a specific implementation, then we go to a plain implementation."
- As a rule: consider every declaration and every instance of a generic declaration, with every combination of one-step conversions of the arguments. If some candidate over "specific" types is reachable, run it, converting. Run a candidate over a general type (`Any`, `Number`, a join) only when no specific one is reachable.

**What it gets right.**
- It treats generic and plain arms alike, so it is one rule, not a patch for generics.
- It makes answer 8 a special case.
- It reaches the library's self-bounded generics, which reading A does not.
- It sends a numeral to its own type's arm rather than to a catch-all (section 5).
- C#, and Julia's catch-alls that promote and call again, reach the same answer on the fork.

**Where it breaks, taken literally.**
- "Specific" is not a relation of the type system. If it means "a type with no subtypes", the answer changes when a program adds a subtype.
- Two specific candidates, each reachable by a different conversion, have no order between them. The measured case is `O2Tie`: `g[\T extends ZZ64\](a: T, b: T)` beside `g(a: ZZ32, b: Any)`. Reading B, which exempts the promotion from counting, picks by the sort's input order there (`option-2-soundness.md` section 1).
- Walk would apply it to run-time types, where the compiled path cannot convert (a static type that is a type parameter or an abstract trait). The two paths then run different arms.
- "Most specific" is not "fastest". `QQ`'s `=/=` is more specific than the `Any` one, and it is rational arithmetic.
- It reverses the designers' order for plain arms as well (`option-2-soundness.md`, "What a judge would still have to decide").

**The sound version** is way 4 below: "specific" read as the chapter's own `⪯`, a candidate taken only when it is `⪯` every other, and order C as the fallback. That keeps his idea's reach and closes the first three breaks. The fourth becomes a library task. The fifth is its price.

## 9. The ways

Each way lists what it does, what it touches in the specification, the checker and walk, its cost, and its interactions with: answer 8's promotion; answer 9's rules (the return-type rule over every instance, the positional rule, walk choosing on declared domains, batch 7b's rung W); a numeral's own type and rung Q; row 388 (a conversion into a declared parameter of a generic); row 484; the Meet Rule; and the compiled dispatcher. "Measured" cites the capture; everything else is by reading.

### Way 1. The plain arm: option 1, batch N as built

- **What.** A generic arm counts as applicable without conversion only when its promoted instance takes the arguments as they are. Order C then puts the promoted generic in the coercion phase.
- **Specification.** A sentence saying the promoted instance decides applicability; it contradicts answer 9's "inference ... does not precede the comparison" (`before-n-questions.md` A.4).
- **Checker, walk.** Nothing beyond rungs I and K as built (measured, A.1).
- **Cost.** The least code; rung T's sentence; a note to rung W to keep judging applicability on the instance.
- **Interactions.**
  - Answer 8: applied only when no other arm fits unconverted.
  - Answer 9: against its text; rung W must not compare on declared domains.
  - Numerals: `op(1, w)` runs the plain arm (`O2Num`, rule); row 79's `ee(5)` runs the `Any` arm, as rung Q's planned test says; `x = 0` meets `Number`'s `=` (section 5).
  - Row 388: a generic reachable only by converting a declared parameter loses to any catch-all.
  - Row 484: unchanged.
  - Meet Rule: unchanged.
  - Dispatcher: unchanged.
- **Soundness.** Applicability is no longer closed downward, so the specification's promise that the run-time choice is at least as specific fails. The arm splits between the paths for wider static types (measured, `O2Wide`). With return types `T` and `Any`, walk can return a value outside the static type (by reading, section 1).

### Way 2. Reading A: option 2 as answer 9 words it

- **What.** Choose the declaration on declared domains, a generic's read as "some instance within its bound", by order C. Then answer 8 instantiates the chosen generic and converts.
- **Specification.** One sentence in the coercion chapter and one at its static-resolution paragraph (`option-2-soundness.md` section 1).
- **Checker.** Rank on declared domains whenever a promoted candidate is ranked (section 1 of that note).
- **Walk.** Choose on declared domains, convert, dispatch the converted call again. Between batches N and 7b, rung K needs an edit to `bestMatchInternal`, which its brief reserves (`CLIMB-BATCH-N.md:179`, `:191`).
- **Cost.** Small, in rungs I, K, T and W.
- **Interactions.**
  - Answer 8: applies to the chosen generic.
  - Answer 9: exactly its order; the return-type rule over every instance makes the converted re-dispatch safe (`O2Z64`); the positional rule is untouched.
  - Numerals: `op(1, w)` runs the generic at `ZZ64`; `ee(5)` the `Any` arm; `x = 0` meets `Number`'s `=`.
  - Row 388: a generic reachable only by converting a declared parameter loses to a catch-all.
  - Row 484: unchanged.
  - Meet Rule: does its job (`O2Meet`).
  - Dispatcher: unchanged.
- **Limit.** A generic whose bound names the type itself (`Integral[\T\]`, `Equality[\T\]`, `StandardTotalOrder[\T\]`) has no instance that holds a `ZZ32` and a `ZZ64` unconverted, so it enters the coercion phase and loses to a catch-all (measured, `O2FbAny`). Whether the fast arm runs depends on how the bound is written.
- **Soundness.** Sound (`option-2-soundness.md`). The walk split for wider static types becomes a split on the instance, which is rung K's.

### Way 3. Reading B: the promotion never counts

- **What.** A conversion made by answer 8's promotion does not count against a generic arm.
- **Specification.** A tie rule; the Meet Rule's coercion clause extended to the types a generic reaches by promotion; a new lemma in the proof (`option-2-soundness.md`, "What a judge would still have to decide").
- **Checker, walk.** An exemption that must name exactly which conversions go uncounted: only those at a lone type parameter the promotion chooses (the loose one flips `gg(5, w)`, `O2Pos`).
- **Interactions.** It reaches self-bounded generics; for plain arms, order C stands; so generic and plain arms follow different orders.
- **Soundness.** Not sound as it stands: `O2Tie` has no rule-given answer, and under the rough build `two(z, z)` checks and then stops at run time (`O2Excl`, the code generator's defect for two generic arms on bare type variables, `overloading-judgement.md:115`).

### Way 4. The most specific candidate, conversions counted by the chapter's own relation, order C as the fallback (Pavol's idea, sound)

- **What.** The rule of my reading, stated in full below. In short: if one candidate's parameter type is `⪯` every other candidate's, it runs, converted; otherwise order C decides.
- **Specification.** The coercion chapter's resolution section rewritten (`conversions-coercions.tex:470-553`), with the original kept in the S1 form; the static-resolution paragraph extended to say the converted call dispatches on the converted values; the inference chapter states answer 8 as this order on one declaration's instances; the proof appendix scoped: its lemma still covers the fallback. No example changes (section 3).
- **Checker.** On top of rung I: gather the candidates of both attempts before ranking; drop `moreSpecificCandidate`'s coercion-first test (`STypesUtil.scala:1085-1095`) in favour of the check "is the head `⪯` every other", falling back to today's comparison when it is not; break a tie between equal instantiated types on declared domains (answer 9); add the ambiguity check `checkApplication` lacks (`Functionals.scala:463`), which Q1 and row 484 need anyway. Tens of Scala lines, by reading; not built.
- **Walk.** On top of rung K: compute the converted candidates even when a plain match exists, apply the same test, else today's two passes. Walk's coercion pass already ranks by the specification's relation (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:163-190`). An overloaded method caches nothing (FACTS, rung C), so the extra work is paid per method call; measured by the rung.
- **Cost.**
  - A probe of both paths over the 422 interpreter tests, the demos, the compiler tests and the two microGPT checks, as probe K did, before a batch is briefed.
  - Two gated tests from rung C that pin order C, restated: `ProjectFortress/tests/CoercionOverloadRungC.fss:45` (`p(NarrowOf(1))` would print `p(Wide)`) and `compiler_tests/XXXCoercionAnyOverloadRungC.fss`.
  - Rung Q's planned `ee(5)` assertion (row 79). By reading, the `ZZ32` arm becomes the most specific candidate and its size cannot be fixed, so rung R's refusal applies (answer 12): `ee(5)` is then refused like `ee(z)` for a `ZZ32` `z`.
  - One library line: `QQ`'s `=/=` removed (its body is the `Any` one's), or a `=/=` per type. Otherwise every integer `z1 =/= z2` converts both sides to `QQ` (section 5).
- **Interactions.**
  - Answer 8: a corollary (section 1).
  - Answer 9: the return-type rule over every instance keeps the converted re-dispatch safe; the positional rule is untouched; walk's comparison on declared domains is used for ties and in the fallback.
  - Numerals: `op(1, w)` runs the generic at `ZZ64`; `x = 0` runs `ZZ32`'s own `=`; `gg(5, w)` runs the generic, converting the numeral at its declared `ZZ32` parameter (`O2Pos`). A numeral whose targets are incomparable (`ZZ32` and `NN32`) falls back to order C, so beside a catch-all it takes the catch-all; folding Q1's default into the order, as C# does for signed over unsigned, would give `ZZ32`.
  - Row 388: a generic reachable only by converting a declared parameter beats a wider catch-all.
  - Row 484: unchanged, since position 1 is incomparable (the inherited `self` is the trait); the library's per-type `MAX` settles it.
  - Meet Rule: unchanged; it keeps the fallback's coercion phase unique.
  - Dispatcher: unchanged mechanism. It sends calls to one of two generic arms where order C sent them to a plain arm (`two(z, z)`, `O2Excl`), so the code generator's defect for two generic arms must be fixed first, in batch 7b. Row 390's shape changes, since `p(Wide)` becomes the winner and `p(Any)` leaves the dispatch set; measured by the rung.
- **Soundness.**
  - One answer: the first step's winner is unique, because `⪯` is antisymmetric; the fallback is the specification's order with its proof.
  - Type safety on the compiled path: the conversions are inserted statically and the call dispatches by subtyping, as the specification's coercion phase does.
  - The ranking refuses nothing order C resolves. A candidate it selects can still meet another rule's refusal: rung R's, for a size the call cannot fix (`ee(5)` above).
  - Walk, deciding on run-time types, can take a more specific arm than the compiled path where the static type is abstract: a generic body, or a variable declared `Number`. In the one library every conversion goes between concrete number types, all below `Number`, so walk's arm is a subtype-more-specific one and the value stays in the static type. With a program's own conversions into a trait that excludes the static type, that could fail; the rung states the condition or restricts walk.

### Way 5. The same ranking with no fallback (C#'s single phase)

- **What.** Way 4 without order C: a call with no `⪯`-least candidate is an error at the call.
- **Cost.** New refusals of calls the specification resolves: `O2Tie`'s `g(z, w)`, and the specification's own `f(c)` example under walk (`f(A)` converted and `f(B)` unconverted are incomparable).
- **Otherwise** as way 4.

### Way 6. Argument-by-argument betterness (C#'s and C++'s exact form)

- **What.** Compare conversions position by position, and count an incomparable position as neutral (C#), or rank conversion kinds per position (C++: an exact match, then a subtype, then a user conversion).
- **Interactions.** Row 484: the C# form settles it, since position 2 (`ZZ64` against `QQ`) decides and position 1 is neutral. The fork: the C# form runs the generic at `ZZ64`; the C++ form makes it ambiguous (position 1 favours the unconverted `Any`, position 2 the generic).
- **Cost.** A second relation beside the chapter's `⪯`, with its own non-transitivity; the proof redone.

### Way 7. Today's answer kept: no promotion when another arm fits unconverted

- **What.** Order C everywhere: answer 8 applies only when no other arm fits without conversion (`before-n-questions.md` option 3).
- **Cost.** An exception to answer 8 in rungs I, K and T; whether a call converts depends on an unrelated arm. It reverses part of your answer 8, so it needs your word.

### Way 8. Refuse

- **At the call**: a call whose generic arm needs a promotion beside an unconverted plain arm is an error, and the program writes `op[\ZZ64\](z, w)` (answer 8's interim rule).
- **At the declaration**: a promotable generic beside a wider plain arm needs a declaration at the promoted instance, as the Meet Rule asks for plain arms.
- **Cost.** New errors on both paths, where the specification promises every call an arm.

### Way 9. Numeric promotion before resolution (Java's and C's rule for operators)

- **What.** Before resolving an operator call whose number arguments differ in type, convert them to answer 8's common type, then resolve by order C.
- **Interactions.** It settles `z = w` (then `ZZ64`'s `=`) and row 484 (`b MAX 1` and `w MAX z` then fit the inherited `MAX` at `ZZ64`).
- **Cost.** It breaks a mixed-type operator arm whose second operand is narrower than the first: `QQ`'s `^(self, other: ZZ64)` (`FortressLibrary.fsi:422`), since `q ^ z` would convert `z` to `QQ`, which that arm does not take. It also converts the arguments of any mixed-type operator a program declares, such as `opr OPLUS(a: ZZ32, b: ZZ64)`, so that operator no longer fits its own exact call. And it is a rule for operators only, beside another for calls.

### Way 10. The library's and the program's own devices (under any way)

- No catch-all beside a fast arm in performance code.
- A catch-all that promotes and calls again, as Julia's do: `Number`'s `=` could convert to the narrowest common type instead of `QQ`.
- Per-type arms: row 484's `MIN`, `MAX` and `MINMAX` (`before-n-questions.md` question B, option 1); a `=/=` per type.
- The written static argument.
- **Cost.** Library lines; no language change. It does not answer the language question; it composes with ways 1, 2 and 4.

### Way 11. Widening (the specification's `widens`)

- **What.** Extend widening, which lets a converted declaration replace an unconverted one when the context expects the wider type.
- **Limit.** It is driven by an expected type; `op(z, w)` alone has none. Unimplemented, and deferred by answer 8.

### Way 12. Resolution per stamped instance on the compiled path (C++ templates, Julia)

- **What.** Resolve an overloaded call inside a generic body again for each stamped instance, where the static type is concrete.
- **Interactions.** It closes walk's remaining split under way 4, since both paths would then decide from concrete types, and it is what makes Julia's generic code fast.
- **Cost.** It replaces "checked once" with "resolved per instance" in the checker and the code generator; a design change of its own, not this decision.

### How way 4 answers the soundness check's programs (by reading; not run)

- `O2Explicit`, `op(z, w)` with `T extends Number` beside `Any`: the generic at `ZZ64`.
- `O2FbAny`, `eqop(z, w)` with `T extends Equality[\T\]` beside `Any`: the generic at `ZZ64` (the rough build's answer, here by rule).
- `O2Z64`, the generic beside `op(ZZ64, ZZ64)`: `op(z, w)` has equal instantiated types; declared domains choose `op(ZZ64, ZZ64)`, statically.
- `O2Meet`: no candidate is `⪯` all others; the fallback runs the meet, unconverted, as every build did.
- `O2Tie`: no candidate is `⪯` all others; the fallback runs `g(ZZ32, Any)`, as stock and walk do.
- `O2Excl`: `lo(z, w)` runs the plain arm (`(ZZ32, ZZ64)` is `⪯ (ZZ64, ZZ64)`); `two(z, z)` runs the `ZZ64` generic, which needs the dispatcher's defect fixed.
- `O2Num`: `op(1, w)` the generic at `ZZ64`; `op(1, 2)` the generic at `IntLiteral` (`IntLiteral` converts into every number type and nothing converts into it, so it is `⪯` each).
- `O2Wide` and `O2Lone`: the same instance split as reading A, which is rung K's.

## My reading

**The rule**, written for the specification's coercion chapter (resolution) and inference chapter (instantiation):

> For a static call `f(A)` or `A₀.f(A)`, a *candidate* is a declaration of `f` in scope, or an instance of a generic declaration of `f` whose static arguments satisfy its bounds, that is applicable with coercion to the call (`conversions-coercions.tex:430-457`). Its parameter type is the instantiated one.
>
> 1. If there is a candidate whose parameter type is no less specific (`⪯`, `:486-513`) than the parameter type of every other candidate, that candidate is selected. Among candidates with the same parameter type, the one whose declaration is more specific on its declared domain is selected (answer 9's relation).
> 2. Otherwise, if some candidates are applicable without coercion, the most specific of them on their declared domains is selected, and a generic one is instantiated by step 1 restricted to its own instances.
> 3. Otherwise, the most specific candidate applicable with coercion is selected. If it is not unique, the call is a static error.
>
> The coercions the selected candidate needs are inserted into the call statically. The rewritten call is then evaluated as `\secref{resolving-overloading}` says: it dispatches, by subtyping and without further coercion, to the most specific declaration applicable to the converted values at run time.
>
> A static argument that step 1 selects for one generic declaration is the narrowest type, under `⪯`, that each argument it constrains is substitutable for: answer 8's promotion.

**Why this and not reading A.**
- It is one order for choosing an instance and for choosing a declaration, so answer 8 is no longer a second rule beside the coercion chapter.
- It reaches the self-bounded generics that are the library's idiom, soundly: it ranks with a relation the specification already has instead of exempting conversions, so it needs no new overloading rule or lemma.
- It composes better with the numeral switch: concretely typed numerals reach their type's own arm, not `Number`'s `=`.
- It keeps every example the designers printed, and the ranking itself refuses nothing order C resolves.
- It is close to C#'s order, a peer with user-declared implicit conversions and overloading, and to the one precedent inside the specification for a converted declaration beating an unconverted one (widening).

**Why it is still a judgement.** It overrides the designers' explicit sentence for the catch-all shape, and it moves plain arms, two gated tests and one planned assertion. Reading A is sound and smaller, and is the order the designers wrote.

**Conditions I would attach**, whichever way is taken:
- The checker's missing ambiguity check at the call (`Functionals.scala:463`).
- An `IntLiteral` case in `exactValue`, or `Number`'s `=` reshaped, in rung Q.
- The per-type `MIN`, `MAX` and `MINMAX` for row 484 (question B, option 1), since no ordering rule here settles it.
- Under way 4: `QQ`'s `=/=` removed, the code generator's two-generic defect fixed before a call can reach two generic arms, and a probe of both paths before the batch.

## What a judge must still decide

1. **Which order governs across declarations.** The designers' order C with reading A (sound, one sentence, self-bounded generics lose to a catch-all), or way 4 (one order, reaches them, reverses the designers' sentence where a converted arm is strictly more specific). This is a question of principle: the custodian's text against one rule and speed.
2. **Whether way 4's reach into plain arms is wanted.** `f(ZZ64)` over `f(Any)` for a `ZZ32`; `p(Wide)` over `p(Any)`; `ee(5)` refused. A rule for generics alone is way 3, which is not sound as it stands.
3. **What walk does at run time** (rung K's question, open under every way). Under way 4 walk converts from run-time types, and the paths may run different arms where static types are abstract. The alternative is walk instantiating a run-time choice without conversion, the designers' later model, which gives up answer 8 under walk wherever the checker is absent.
4. **Whether Q1's default joins the order** as a ranking of `ZZ32` over `NN32` for a numeral (C#'s signed-over-unsigned rule), or stays a separate default.
5. **The two findings for rung Q and batch 7b**, which stand under every way: `exactValue` and the numeral; the dispatcher's defect for two generic arms.
6. **Whether a probe precedes the batch.** No recorded call reaches the fork, but way 4 moves every catch-all family, and only a probe of the tests, demos and microGPT on both paths would show how many outputs change.

## Files, and what was run

- `conversion-overloading-ways/catchall-grep.py`: reads `Library/*.fsi` and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` and lists every name with both a top-level or functional arm over `Number`, `AnyIntegral`, `Any` or `Object` and an arm over concrete number types only; one declaration per line, so crude. Output: `catchall-grep.txt`, six names, four of them not this family on inspection (section 5).
- Nothing else was run. No Fortress program, no build, no JVM. Every measured shape is cited from `option-2-soundness.md`, `before-n-questions.md`, `PROBE-K.md` and `inference-rule-shadow.md`; way 4's answers on their programs are by reading.
- Peers: the C# standard's `expressions.md` (draft-v8) and Swift's `docs/TypeChecker.md` were fetched into the session scratch directory and read there; the C++ draft, the Julia manual, the Scala 3 reference, the Haskell 2010 Report and Rust by Example were read at the URLs given.
