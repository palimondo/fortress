# Cold read 2 of positions/p3/clean.txt

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and greps of `references/compiler.md`, `library.md`, `specification.md`, `session.md`, `interpreter.md` (not `revival-changes.md`, not `sources.md`). Terms found there: walk, compiled path, switch-over, compiler's prelude, gap ledger, exclusion rule, `comprises`, self-typed traits, `Bottom`, callout (`specification.md`: a box that prints in every build), batch (`session.md`: a run of other agents). Terms found nowhere in that context: the review queue, PLAN.md, "the ask", Welterweight, route A/C as labels, `PCMP` (explained by the entry itself).

---

## P-42: an unbounded type parameter is bounded by `Any`, not `Object`

- **Decided:** A type parameter with no written bound has the implicit bound `Any`. `Object` is not the default, because `Any` also holds tuples, functions and `()`. The library needs this because it instantiates generic containers at tuple types, such as arrays indexed by `(ZZ32,ZZ32)`. The specification says `Any` and has a callout recording that the February 2011 Working Draft said `Object`.
- **Applies:** Every type parameter declared without a bound, in the library, walk and the specification. The compiled path is the exception until the switch-over. While it runs on the compiler's prelude it bounds such a parameter by `Object`, so it refuses any generic instantiated at a tuple (gap-ledger row 412). The switch-over ends that.
- **Requires:** Treat an unbounded parameter as `Any`-bounded. Do not add `extends Object` to "fix" one. Expect compiled-path refusals of tuple instantiations before the switch-over, and do not take them as new defects (row 412 holds them).
- **Unfinished:** No separate build is named. The compiled path's departure goes away at the switch-over.
- **Could not resolve:** Nothing that blocks. "which ends the departure" sits awkwardly in the middle of the sentence, but the meaning is clear: the departure lasts until the switch-over.

## P-43: the exclusion rule stays, so number types are flat siblings (route A)

- **Decided:** The compiled checker keeps the multiple instantiation exclusion rule: no type extends two instantiations of one generic trait. A nested tower (`ZZ32` under `ZZ64`) would break it, since `ZZ32` would be `Equality` at both `ZZ32` and `ZZ64`. So the library's number types are flat siblings under `Number`, with the integer types grouped under `AnyIntegral`. Each type carries its own self-typed algebra traits at its own type (`Integral[\ZZ32\]` for `ZZ32`). `Number` declares no catch-all operators. This is the team's own flattening of 2009 and 2010. The alternative, route C, would keep the tower and relax the rule by the 2012 patents' forest rule. It was not chosen, but P-95 keeps it open.
- **Applies:** The library's number types (the list is in F-131, which I cannot see; the skill lists `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32`, `RR64`) and the compiled checker's rule. One exception: `Number` still has a catch-all `=`, which a batch kept without the curator's word (review-queue item 22).
- **Requires:** Do not make one number type a subtype of another. Do not relax the exclusion rule in the checker. Do not add catch-all operators to `Number`. Give each number type its own instance of the algebra traits.
- **Unfinished:** Nothing to build. The fate of `Number`'s `=` waits for review (item 22).
- **Could not resolve:**
  - "route A", "route C", "the ask that he answered": unclear wording. "The ask" is never defined. Routes A and C are named, but no route B is mentioned, so it is unclear whether a third option existed or was dropped.
  - "its route leads to the POPL 2019 paper": unclear wording. I read it as "the flat approach is the line the POPL 2019 paper continues", but "leads to" could also mean the paper was derived from it.
  - "The curator cares that specialised code runs fast, not how a specialisation is chosen": I cannot tell how this sentence supports route A over route C. It reads like a reason that does not prefer either one.
  - "P-95 keeps route C open": what "open" commits a worker to (may they pursue it? only if asked?) depends on P-95, which is not in this file.
  - "a self-typed generic trait stand at several instantiations along a chain": I could only partly resolve this language concept, and the skill does not cover the forest rule. I read "chain" as a chain of subtypes.

## P-44: `AnyIntegral` stays closed, and the checker accepts `Integral[\I\]` below it

- **Decided:** `AnyIntegral`'s `comprises` clause lists the five integer types, `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64`, and stays as written. The team's `NOT YET` comment beside it also stays: `comprises Integral[\I\] where [\I\]`, a form the language cannot express yet. `Integral[\I\]` extends `AnyIntegral` but is not listed. The compiled checker accepts it anyway, because every type that the checker knows below it is listed. The library text and walk are unchanged. The reason given is that the team's 2012 texts (Luchangco's Types chapter, Welterweight) read the clause this way.
- **Applies:** The compiled checker's reading of a generic trait that sits below a closed trait without being listed. The limit: the hole in gap-ledger row 487. A program's own subtype of `Integral`, declared in another component, is accepted even though no listed type is above it. Every way of closing `AnyIntegral` has this hole except the team's 2008 way, a `comprises` clause on `Integral[\I\]` itself. This decision does not close it.
- **Requires:** Leave the clause and the `NOT YET` comment as they are. Do not add `Integral` to the list, and do not rewrite walk's handling. Do not treat the row-487 hole as new.
- **Unfinished:** Built. The hole (row 487) stays open, and no task to close it is named.
- **Could not resolve:**
  - "every type that the checker knows below it is listed": the antecedent of "it" reads two ways. It could be the generic trait (`Integral[\I\]`) or the closed trait (`AnyIntegral`). Only the first reading is consistent, since `Integral` itself is below `AnyIntegral` and unlisted. "that the checker knows" also leaves the scope unclear: the current component and its imports, or all compiled components? The hole suggests the first.
  - "Welterweight": a language concept or document I lack, not in the skill. I cannot tell whether it is a calculus, a paper or a chapter.
  - "the team's 2012 texts ... are its later word (P-25, P-26)": "its" means the team, but the claim depends on P-25 and P-26, which are not here.
  - The sentence about the hole is hard to follow: the "except the team's 2008 way, a `comprises` clause on `Integral[\I\]` itself:" part sits between the subject and the colon that introduces the hole, so the text after the colon at first reads as a description of the 2008 way. Unclear wording.
  - "reads the clause as the team's 2012 texts do": the entry never says outright that the acceptance rule is the 2012 reading. It says only that "by them the clause is right as written". I inferred the link.

## P-46: a conversion never changes which declaration runs

- **Decided:** Overload resolution ignores conversions. Among the declarations that apply, the most specific is chosen by declared parameter types (P-45). A generic declaration applies if some type within its bounds takes the arguments. Only after that choice is the winner instantiated by promotion, at the narrowest type into which the arguments coerce (P-74). Example: with `op(a: Any, b: Any)` beside `op[\T extends Number\](a: T, b: T)`, a call on a `ZZ32` and a `ZZ64` finds the generic one applicable at `T = Number`. It is the more specific, so it is chosen, and it runs at `T = ZZ64`. The curator's own broader rule (try any conversion that reaches a more specific declaration, and fall back otherwise) was not adopted.
- **Applies:** Every call with overloads, on both paths. The compiled path inserts the conversions statically. Walk promotes from run-time types, a choice made without the curator's word (review-queue item 85). The order in which the checker tries a call is P-49's.
- **Requires:** Do not let coercion pick or change the winning declaration. Use coercion only to set the instance of the declaration already chosen. Do not settle walk's run-time promotion while item 85 is open.
- **Unfinished:** Compiled dispatch between two generic declarations of one name with different bounds. Such a run dies today (gap-ledger row 537; PLAN.md phase 5, microGPT compiles).
- **Could not resolve:**
  - "some type within its bounds takes the arguments": "takes" reads two ways, by subtyping only or by coercion too. The example works by subtyping (`ZZ32 <: Number`), and the title implies subtyping only, but it is not stated. Unclear wording that matters, since it decides applicability.
  - "fall back to a plain one": "plain" reads two ways, a non-generic declaration or one that fits without conversion. Unclear wording (it only describes the rejected rule, so it is low impact).
  - "His own broader rule is not taken": who chose not to take it is not stated, but the result is clear.

## P-47: each integer type declares its own `MIN`, `MAX` and `MINMAX`

- **Decided:** Each of the five integer types (`ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64`) declares its own `MIN`, `MAX` and `MINMAX` rather than relying on the ones inherited through `Integral` from `StandardTotalOrder` and `StandardMin`, `StandardMax` and `StandardMinMax`. `a MINMAX b` is `(a MIN b, a MAX b)`. The reason: the inherited `MAX` types `self` as the order trait, so for a `ZZ64` it is no more specific than `QQ`'s `MAX`, and neither is `QQ`'s more specific than it. Under walk, `b MAX 1` with `b: ZZ64` then stops with "Ambiguous coercion". With their own declarations, the operators answer at the promoted type (P-74), like `b + 1`. This follows the library's own device (`QQ`, `RR64`, the compiler's prelude, and the specification's `ZZ`).
- **Applies:** The five integer types and these three operators.
- **Requires:** Keep these per-type declarations. A new integer-like type should declare its own `MIN`, `MAX` and `MINMAX` too (my inference from "the library's own device").
- **Unfinished:** None. Built.
- **Could not resolve:**
  - "the `StandardMin`, `StandardMax` and `StandardMinMax` that it extends": the antecedent of "it" reads two ways, `StandardTotalOrder` or `Integral`. Unclear wording, low impact.
  - "types `self` as the order trait, so neither it nor `QQ`'s `MAX` is more specific": I could only partly resolve this language concept. I take it that `self` has type `StandardTotalOrder[\…\]` rather than `ZZ64`. But the entry does not say why `QQ`'s `MAX` competes for a `ZZ64` call at all (presumably because `ZZ64` and the literal coerce into `QQ`). The skill does not cover how walk weighs a coercion-reached candidate.
  - Whether the compiled path showed the ambiguity too is not stated. Only walk is mentioned.

## P-48: a type parameter that the arguments do not fix takes its bound, never `Bottom`

- **Decided:** If a call's arguments do not fix a type parameter, its instance is the intersection of its upper bounds (`Any` if it has none). That happens in three cases: the parameter occurs only in the result type; two arguments meet at it with no narrowest common conversion target; or run-time dispatch picks a generic declaration and must pick its instance. At checking, the expected type (P-49) narrows the instance through the declared return type. At run time, the static type the checker gave the call narrows it. The instance is never `Bottom`, never the union of the argument types, and never "the value's type alone". The rule sets the instance, not which declaration runs (P-46). The source is the POPL 2019 paper, which the curator trusts above his own view (P-26).
- **Applies:** Unfixed type parameters on the compiled path. Walk is an exception: it always takes the value's type at dispatch, since it has no static types. The rule changes nothing in microGPT, whose types are concrete. The library's `fail`, `builtinPrimitive` and `List`'s empty comprehension stay unbounded as the team wrote them, without the `extends Object` a batch had added.
- **Requires:** Do not instantiate an unfixed parameter at `Bottom` or at a union. Do not re-add `extends Object` to those three library declarations.
- **Unfinished:**
  - A compiled dispatcher that carries the call's static type, so a generic reached only at run time gets this instance (gap-ledger row 538; PLAN.md phase 5).
  - Three walk cases that still give `Bottom` (rows 587, 591, 612).
  - Row 591's `Bottom` is also held for review (review-queue item 81).
- **Could not resolve:**
  - "never the value's type alone" versus "Under walk, dispatch takes the value's type, and always will": these read as a contradiction unless the "never" holds only for the compiled path. "the value's type" also reads two ways, the argument's run-time type or the call result's type. Unclear wording that matters, because it decides what walk must do.
  - Row 591 is listed both as "still to build" and as "kept without the curator's word, for his review" (item 81). It is unclear whether a worker should fix row 591 or leave it until the review. Unclear wording.
  - "intersection of its upper bounds": clear, but "narrowed by what the call's expected type requires of the declared return type" does not say how the narrowing is computed. A worker could guess (solve the return type against the expected type) but might guess wrong.

## P-49: the checker tries subtyping before coercion

- **Decided:** The compiled checker first checks a call by subtyping alone, without the expected type (the type that the call's context requires). It keeps that attempt if the result converts to the expected type, by coercion if needed. Otherwise it tries coercing the arguments, with the expected type. So a declaration that fits as-is is never passed over for one that coercion reaches. In the curator's words, coercion is for when there are no matches.
- **Applies:** The compiled checker's handling of every call. Built order (decision record D4): (1) subtyping without the expected type; (2) subtyping with the expected type, which has no curator approval (review-queue item 2); (3) coercion with the expected type; (4) coercion without the expected type.
- **Requires:** Keep subtyping ahead of coercion. Do not reorder the attempts while item 2 is open.
- **Unfinished:** None to build. The second attempt waits for review.
- **Could not resolve:**
  - Whether the fourth attempt (coercion without the expected type) has the curator's word: only the second is flagged as unapproved, so I assume the fourth is approved, but the entry does not say. Unclear wording.
  - "when that attempt is not kept" versus the curator's "when there are no matches": "not kept" also covers a match whose result does not convert to the expected type, which is broader than "no matches". The wording leaves it unclear whether the two are meant to be the same.
  - The case where the context requires no type is not covered. I assume attempts 1 and 2 collapse into one.

## P-52: `narrowToRange` on rank 2 or 3 checks corner by corner

- **Decided:** `r.narrowToRange(other)` raises `IndexOutOfBounds` when `other` reaches outside `r` on any axis. The check compares lower corners with each other, and upper corners with each other, by `PCMP`, the ranges' own point order, which compares each axis on its own. It does not use lexicographic tuple order. Example: `((0,0):(9,9)).narrowToRange((2,-1):(5,5))` raises, because -1 < 0 on the second axis.
- **Applies:** Ranges of rank 2 and 3. Rank 1 is not mentioned; I assume it is trivially the same.
- **Requires:** Use `PCMP` and not lexicographic order for range containment.
- **Unfinished:** None. Built.
- **Could not resolve:** Nothing that blocks.

## P-53: `String`'s `left` and `right` answer `Maybe[\Char\]`

- **Decided:** For a non-empty string, `left` answers `Just` of the first character and `right` answers `Just` of the last. For an empty string, both answer `Nothing`. This matches the declared result type `Maybe[\Char\]` and the `left` and `right` of ranges and lists. Walk prints `Just(a)` for `"abc".left`.
- **Applies:** `String`'s `left` and `right`. It is stated for walk; the compiled path is not mentioned.
- **Requires:** Callers unwrap the `Maybe`. An implementation must not return a bare `Char`.
- **Unfinished:** None. Built.
- **Could not resolve:** Nothing that blocks.
