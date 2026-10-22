# Cold read: positions, part 3 (P-42 to P-53)

File read: `explorations/coordinator/consolidation-2026-10-22/evidence/positions/p3/clean.txt`.
Context used: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and in its `references/`: `library.md`, `compiler.md`, `interpreter.md`, `exploring.md`, plus greps of `records.md`, `specification.md` and `tests-writing.md` for terms. Nothing else.

---

## P-42 "A type parameter declared without a bound has the implicit bound `Any`"

**Decided:** A type parameter written with no `extends` clause is bounded by `Any`, the top type, and not by `Object`. The reason is that `Any` includes tuples, functions and `()`, which `Object` excludes, and the library needs generics instantiated at tuples (for example an array whose index type is the pair `(ZZ32,ZZ32)`).

**Applies:** To every type parameter declared without a bound, in the language as specified and in both paths. The specification already says `Any`, with a callout noting that the Working Draft of February 2011 said `Object`. Limit: the compiled path does not follow it yet. It bounds such a parameter by `Object`, so it refuses any generic instantiated at a tuple type (ledger row 412). This matches `compiler.md`, "Traps of the compiled path".

**Requires:** Treat `Any` as the bound in walk, the library and the specification. Do not "fix" the specification back to `Object`. On the compiled path, expect a generic at a tuple type to be refused until this is fixed. Do not work around it by narrowing the library's tuple-indexed containers.

**Unfinished:** The compiled path's bound (`Object` to `Any`), ledger row 412.

**Could not resolve:**
- "departs from it until the switch-over": unclear wording. It can be read as "the switch-over itself ends the departure" or as "the departure must be fixed before the switch-over can happen". The skill says the switch-over comes when the checker accepts the interpreter's library, and that library instantiates at tuples. So the second reading looks forced, but the entry does not say who fixes the bound or when, and has no "Still to build" line.

---

## P-43 "The compiled checker keeps the exclusion rule, so the library's number types are siblings, not a tower (route A)"

**Decided:** The compiled checker keeps the rule that no type may extend two instantiations of one generic trait. Because a number tower breaks that rule (a `ZZ32` nested in `ZZ64` would be `Equality[\ZZ32\]` and also `Equality[\ZZ64\]`), the number types are flat siblings under `Number`, each with its own algebraic traits, as the team flattened the compiler's prelude in 2009 and 2010. `Number` declares no operator that serves all number types at once. This choice is called route A.

**Applies:** To the library's number types and to the checker's rule. Limit: `Number` still has one catch-all operator, `=`, kept provisionally until the curator reviews it (review-queue item 22). Route C, the forest rule of the team's 2012 patents, is not taken but is held open by P-95; F-46 gives the cost of going there.

**Requires:** Do not add a subtype relation between number types, and do not add a catch-all operator to `Number`. Do not relax the exclusion rule in the checker. Leave `Number`'s `=` as it is until the review is decided. A question that wants route C goes through P-95, not through this entry.

**Unfinished:** Only the review of `Number`'s `=` (review-queue item 22). Otherwise built.

**Could not resolve:**
- "The fixed-width types, `ZZ`, `QQ` and `RR64`, are siblings": unclear wording. The commas read as an apposition, which would call `ZZ`, `QQ` and `RR64` the fixed-width types; but `ZZ` and `QQ` are not fixed-width. Read as a list of four, it still names `RR64` but not `RR32`, though `RR64` is itself fixed-width and the skill lists `RR32` as a sibling too. I cannot tell which types the sentence enumerates.
- "route A", "route C": unclear wording. Only A and C are named; the entry does not say what a route is, nor whether there is a route B.
- "the forest rule": a language concept I lack. The skill names the patents' reading file but does not define the rule, and the entry does not either.
- "P-95 keeps it open": two readings. "It" can be route C (kept as an option) or the question (kept undecided).
- "what a return to it would cost": unclear wording. "Return" suggests the project or the team was once on route C; nothing else says so.
- "its route leads to the POPL 2019 paper" and "the Fortress way": vague. I read them as "the line of work that the flattened prelude started goes on to the POPL 2019 paper", but "the Fortress way" has no content I can check.
- "The curator cares that specialised code runs fast, not how a specialisation is chosen": unclear wording. I cannot see how this supports route A over route C. The entry does not say that route C differs in how a specialisation is chosen.
- "a default that waits for the curator's review": two readings. "Default" can mean a provisional choice (keep `=` for now) or a default implementation of `=` on `Number`. I took the first.
- "each with its own algebra": I read this as each type extends its own instances of the algebraic traits (such as `AdditiveGroup[\ZZ32\]`). The entry does not say so.

---

## P-44 "`AnyIntegral` stays closed by its `comprises` clause"

**Decided:** The library's `AnyIntegral` keeps its `comprises` clause listing the integer types, with its team-worded `NOT YET` comment. `Integral[\I\]` extends `AnyIntegral` but is not listed. The compiled checker accepts such an unlisted generic trait below a closed trait when every type the checker can see below the generic trait is itself in the list. This follows the team's 2012 texts, their later word (P-26).

**Applies:** To `AnyIntegral` and, by the rule, to any generic trait under a closed trait in the checker. Limit: the rule has a hole. A program's own subtype of `Integral`, declared in a component the checker does not see while checking the library, is accepted even though no listed type is above it (ledger row 487). Every way of closing `AnyIntegral` has this hole except the team's 2008 way, a `comprises` clause on `Integral[\I\]` itself, which is not taken.

**Requires:** Do not change the clause's text in the library or walk's handling of it. Do not close the hole under this decision (for example by adding a `comprises` to `Integral[\I\]`); it is recorded, not to be fixed here.

**Unfinished:** Nothing to build under this decision. The hole stays open in row 487.

**Could not resolve:**
- "`AnyIntegral comprises { ... }`": two readings. The `...` can be the entry eliding the list, or Fortress's own syntax (I recall an elided `comprises { ... }` exists in apis, but the skill does not say). "Which lists the integer types" favours elision.
- "a `NOT YET` comment in the team's wording": unclear wording. I do not know what is "not yet": the check of the clause, the list, or something else.
- "the team's 2012 texts": unclear wording. The texts are not named, so I cannot tell which of the team's sources this rests on.
- "every type that the checker knows below it": I read "knows" as "has in the components being checked", which is what makes the hole. The entry does not define it.

---

## P-46 "A conversion only makes a call possible: it never changes which declaration runs when one already fits"

**Decided:** Overload choice uses only the declared parameter types: first the declarations that apply without conversion, then the most specific of them (P-45). A generic declaration applies if some instantiation within its bounds accepts the arguments. Only after that choice is the winner instantiated, at the narrowest type into which its arguments coerce (P-74), with the conversions inserted statically. The curator's broader alternative, to coerce whenever that reaches a more specific declaration, is rejected. The aim is fast generic code that a JVM can specialise.

**Applies:** To every call that both paths resolve. Example: with `f(x: Any, y: Any)` and `f[\T extends Number\](x: T, y: T)` (my reconstruction of the signatures), a call with a `ZZ32` and a `ZZ64` finds the generic applicable at `T = Number`; it is more specific, so it wins; it then runs at `T = ZZ64`. Walk and the checker both infer static arguments with coercion by the same promotion. P-49 gives the order in which the checker tries a call. Limit: compiled dispatch between two generic declarations of one name with different bounds is not built and a run with it dies (row 537).

**Requires:** Do not let a coercion pull the choice toward a more specific declaration when one already applies. Do not change P-45's specificity order to get a conversion in. Instantiate at the promoted type after the choice.

**Unfinished:** The compiled dispatch between two generic declarations with different bounds (ledger row 537), planned for PLAN.md phase 5, "microGPT compiles".

**Could not resolve:**
- The example's signatures: unclear wording. "A plain declaration over `Any`" and "a generic one over `T extends Number`" do not give the parameter lists. I reconstructed two parameters of type `T`; with one parameter the example would not work.
- "promotion": a language concept I lack. The skill uses "promote" only for `XXX` tests. I read it as P-74's "narrowest type into which the arguments coerce", but the entry defers to P-74 without saying.
- "with the conversions inserted statically" beside "Walk and the compiled checker both infer ... by the same promotion": unclear wording. Walk has no static types and chooses a coercion at run time (`interpreter.md`). I take it that walk reaches the same instance at run time, but the entry does not say so.
- "PLAN.md, phase 5": a reader of the skill meets "phase 5" first as the Desugar phase in "The phases". The PLAN.md prefix settles it, but the two numbering schemes collide.

---

## P-47 "Each integer type declares its own `MIN`, `MAX` and `MINMAX`"

**Decided:** Each integer type declares its own `MIN`, `MAX` and `MINMAX` operators, rather than inheriting them from the generic order traits. This follows the library's own practice: `QQ`, `RR64` and the compiler's prelude declare all three, and the specification's `ZZ` declares `MIN` and `MAX`.

**Applies:** To the integer types. The reason is walk: an inherited `MAX` would tie with `QQ`'s, so `b MAX 1` with `b: ZZ64` would stop with "Ambiguous coercion". With their own declarations, the operators answer at the promoted type of their arguments (P-74), as `b + 1` does.

**Requires:** Keep the per-type declarations; do not remove them in favour of the inherited ones. A new integer type declares its own three as well (my inference).

**Unfinished:** Nothing; built.

**Could not resolve:**
- "would tie with `QQ`'s": unclear wording. The entry does not say why the two would tie. I guess that both apply only after coercing the arguments (`b` and `1` into `QQ` for one, `1` into `ZZ64` for the other), so neither is more specific; but that is my reconstruction.
- "the generic order traits": unclear wording. They are not named, so I cannot find the inherited declarations.
- "`MINMAX`": a language concept I lack. I guess it returns both the minimum and the maximum, but neither the skill nor the entry defines it.
- "integer type": does it include `NN32`, `NN64` and `ZZ`, or only the fixed-width signed ones? The entry does not list them.

---

## P-48 "A type parameter that a call's arguments do not fix takes its bound, never `Bottom`"

**Decided:** When a call's arguments do not determine a type parameter, its instance is the intersection of its upper bounds (`Any` if it has none), narrowed by what the call's static return type requires. It is never `Bottom`, never the union of the argument types, and never the run-time value's type alone. This sets the instance only, not which declaration runs (P-46). The source is the POPL 2019 paper, the team's later word (P-26).

**Applies:** A parameter is unfixed when it appears only in the result type, when two unrelated arguments meet at it, or when dispatch picks the instance. It changes nothing in microGPT, whose types are concrete. The library keeps the team's declarations that leave such a parameter unbounded: `fail`, `builtinPrimitive` and `List`'s empty comprehension. Limit: walk has no static types, so where dispatch reaches a declaration it takes the value's type.

**Requires:** Do not instantiate an unfixed parameter at `Bottom` or at a union. Do not add bounds to `fail`, `builtinPrimitive` or `List`'s empty comprehension to avoid the case. Do not let this rule change the overload choice.

**Unfinished:** A compiled dispatcher that carries the call's static return type, so a generic declaration reached only at run time gets this instance (ledger row 538), planned for PLAN.md phase 5, "microGPT compiles".

**Could not resolve:**
- "when two unrelated arguments meet at it": unclear wording, and it may contradict P-46. `ZZ32` and `ZZ64` are siblings (P-43), so they look unrelated, yet P-46 instantiates `T` at `ZZ64` for them, not at the bound `Number`. Either "unrelated" means "with no type that both coerce into", or the two entries disagree. I cannot tell which.
- "when dispatch picks the instance": unclear wording. I cannot tell whether this means a declaration chosen at run time, or something else.
- "the call's static return type": two readings. It can be the expected type of the call's context (P-49's word) or the declaration's declared return type. The entry does not use P-49's term.
- "leave such a parameter unbounded": unclear wording. The rule is about unfixed parameters; "unbounded" is a second property. I read it as "unbounded and unfixed", which makes the instance `Any` narrowed by the return type.
- Walk: the entry says walk takes the value's type, which the rule forbids, but does not say whether that is accepted or a gap to close. The skill also says "some other cases still get the empty type `Bottom` under walk", which this entry does not mention. I cannot tell whether walk's `Bottom` cases are still to fix under this decision.

---

## P-49 "The compiled checker tries a call first without the expected type, and with coercion only after"

**Decided:** The checker checks a call first by subtyping alone, without the expected type (the type the context requires). It keeps that result if it converts to the expected type, by coercion if needed. Only if it keeps nothing does it try coercion with the expected type. So a declaration that fits the arguments as they are is not passed over for one that coercion reaches. This follows the curator's words: coercion is tried when there are no matches.

**Applies:** To the compiled checker's checking of calls. As built, there is a third attempt between the two, by subtyping with the expected type; it is provisional, pending the curator's review (review-queue item 2).

**Requires:** Keep this order. Do not try coercion of the arguments before the subtyping attempt. Leave the middle attempt in place until the review decides it.

**Unfinished:** Only the review of the middle attempt.

**Could not resolve:**
- "with coercion only after" in the title, against "converts to the expected type, by coercion if need be" in the first attempt: two readings. I take it that the first attempt may coerce the call's result, and only the last attempt coerces its arguments; but the title reads as "no coercion at all in the first attempt".
- "a default that waits for the curator's review": as in P-43, "default" can mean a provisional choice or a fallback behaviour. I took the first.

---

## P-52 "`narrowToRange` on a range of rank 2 or 3 checks containment corner by corner"

**Decided:** `r.narrowToRange(other)` must raise `IndexOutOfBounds` when `other` reaches outside `r` on any axis. Its bounds check compares the lower corners, and the upper corners, by `PCMP`, the ranges' point order, which compares each axis separately, not by the tuples' lexicographic order (which is for sorting).

**Applies:** To ranges of rank 2 and 3. Example: `((0,0):(9,9)).narrowToRange((2,-1):(5,5))` raises `IndexOutOfBounds`, because -1 is below 0 on the second axis.

**Requires:** Use `PCMP` for containment checks on multi-axis ranges; do not use lexicographic tuple comparison there.

**Unfinished:** Nothing; built.

**Could not resolve:** Nothing. (What `narrowToRange` returns when the check passes is not said, but it is not needed to follow the entry.)

---

## P-53 "`String`'s `left` and `right` answer `Just(c)`"

**Decided:** `String`'s `left` and `right` return `Maybe[\Char\]` values, as their declared type says: for a non-empty string, `Just` of the first and of the last character. This matches the library's ranges and lists.

**Applies:** To `String`'s `left` and `right`. Example: walk prints `Just(a)` for `"abc".left`, not `a`.

**Requires:** Treat the result as a `Maybe` and unwrap it; do not change these methods to return a bare `Char`.

**Unfinished:** Nothing; built.

**Could not resolve:**
- The empty string's result is not stated. I assume the `Maybe`'s empty case, as for ranges and lists, but the entry does not say.
- Only walk is named. I cannot tell whether the compiled path's `String` (the compiler's prelude) does the same, or is outside this entry.
