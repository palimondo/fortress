# Cold read 2 of the orientation (climb-batch-26)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and `explorations/compile-ladder/climb-batch-26/orientation/orientation.md`. Nothing else was opened. Quotes are from the orientation.

## 1. What I would do differently, section by section

**Opening (three paragraphs before "Dispatch and overloading")**
- I would sort every sentence into one of three kinds before acting on it. A bold rule is the rule of this tree. A sentence with a P-N is a curator decision, and I may cite it as one. A sentence with a ledger row is a known departure of one path, and I must not assert it in a test. Limit: a sentence with neither a P-N nor a row is a rule I build on but do not cite as a decision.
- I would not fix an "Until the switch-over" limit in the compiler's prelude.
- I would not trust old notes, team tests or my own training on three points: the number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.
- Before calling a disagreement a conflict, I would search FACTS and POSITIONS.
- Where the papers and the early specification text disagree, I would follow the papers (P-26).

**Dispatch and overloading**
- I would allow overloads that differ only in their static parameter bounds (P-45). I would judge them on declared domains, and I would require the return-type subtyping at every instance.
- For generic overloads, I would judge exclusion over the whole tuple of parameter types (P-152). I would expect both paths to refuse a pair where nothing ties one static parameter to another.
- I would not use walk's load check as evidence that a pair is valid or invalid. I would look the case up in `interpreter.md`, "What walk checks", first.
- I would treat `f(self, y: S)` and `f(x: S, self)` as duplicates. I would also treat an abstract and a concrete method with the same parameter types as duplicates. An object that takes an abstract method from one trait and its body from another must redeclare the method (P-149).
- I would count abstract functional methods when I check that something covers the meet of two overloads.

**Traits and objects**
- I would never let a type extend two instantiations of one generic trait (P-43, P-97). I would not copy the specification examples marked "Not allowed". Limit: walk runs such a type anyway (row 416).
- I would read `comprises` as a statement about values, not as a Java `permits` list (P-60).
- I would use `override` only to widen an inherited declaration. To replace a declaration at its own types, I would redeclare it without `override`. I would never put a Java-style `override` in the library, because walk then refuses every program at load.
- An object must cover an inherited abstract method with one body, or with several narrower bodies (P-147). I would avoid a cover by several bodies where static parameters are involved (row 725).
- In a self-typed trait, I would write `self` where `X` is expected without a cast (P-146). Limit: a compiled body that returns `self` fails JVM verification (row 695).
- I would bound every index parameter by `I extends Index` (P-156). At an `Index` parameter, I would pass a `ZZ32` variable, not a numeral. I would remember that `ZZ64` is not an `Index`, and that `Index` does not compile before the switch-over.
- I would only order pairs, triples and lists whose element types meet the stated order traits. I would never order a `List[\RR64\]` (P-154).

**Static parameters, `where` clauses and sizes**
- I would expect an unfixed type parameter to take its bound, not `Nothing` (P-48). Under walk I would expect to see `OPEN`, and to see `Bottom` in three listed cases.
- Under walk, I would write the static argument at an inner generic call, as `mk[\ZZ64\]()` (P-51, row 705).
- I would use only the three `where` forms that are built (P-151). Any other `extends ... where` is silently unconditional. I would not rely on a declaration's own `where` clause on the compiled path: it is not checked, and calls whose clause introduces a variable die (row 867).
- I would compare sizes by their written form only (P-55). I would not expect `s0 s1` to equal `s1 s0`.
- I would not attempt a compiled call that takes a run-time size through `NatReflect`, either before or after the switch-over (row 307).

**Numbers**
- I would read "the tower" in the record as a name only, not as a claim that the number types nest. "Route A" is the flat choice (P-43).
- Under walk, I would write explicit static arguments for `array1` and `array2` (row 721). I would not expect `Box[\Int\]` to equal `Box[\ZZ32\]` (row 364).
- I would expect generic calls to promote to the narrowest common type (P-74). I would expect walk to take the join, not to promote, for tuples and varargs.
- For a fractional power, I would write `2.0^(-1)` or a `QQ` base, never `10^(-k)` (P-153).
- I would use `DIV` for truncating division, because `/` on two integers gives a `QQ`. For a float, I would write `(1.0 s) / n` or use `asFloat`. Before the switch-over, a compiled `7 / 2` is a static error.

**Reductions and comprehensions**
- I would write the static argument in every clause form of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, as `SUM[\ZZ32\][...]` (row 731).
- Under walk, I would give the reduction a declared local type or a function return type. A method return type, a field or an assignment does not direct it.
- I would declare `simpleJoin` at `R`, never at `Any` or untyped. I would not copy the team's tests here.

**Implementation limits**
- I would write every parameter type, including on local functions ("Missing parameter type for").
- I would never write a `Maybe` as an `if` condition, even though walk accepts one.
- I would not take a program that runs under walk as well-typed (P-12).

## 2. Passages that could mislead, read two ways, or use a term the core does not give

1. **"`override` widens"**: the rule conflicts with row 650. The rule tells me to use `override` to widen. Row 650 says "the code generator refuses every `override` modifier". On the compiled path, the target of the revival, I cannot tell what to write when I must widen. Should I write `override` and accept that it will not compile? Avoid widening? Redeclare without the modifier? Confidence: high that a worker would stall here.
2. **"To replace an inherited declaration at its own parameter types"**: "its own" can mean the inherited declaration's types or the new declaration's types. It probably means the inherited ones, since the two are equal in this case, but the sentence makes the reader stop. Confidence: medium.
3. **Self-typed traits, "Walk's load check ... still refuses the pair in two cases"**: neither case cites a ledger row. By the opening's convention, a departure cites a row, so I cannot tell whether these refusals are known departures or part of the rule. Confidence: medium-high.
4. **The P-152 paragraph and its `o` example**: the example's validity hangs on the unstated point that `P[\T\] excludes { Q[\T\] }` holds only at one shared instance, which `Box[\T\]` forces. Without that point, a reader thinks the first position alone excludes and misses why the whole tuple matters. "By the exclusion rule" can also be confused with the `excludes` clause. The core names "this exclusion rule" only for the two-instantiations ban. Confidence: medium.
5. **"Walk answers `IntLiteral`'s arithmetic as a `ZZ32` (row 578)"**: the sentence before it says walk gives a numeral the class `Int`, `Long` or `BigNum`. So walk has no `IntLiteral`, and it is unclear what "walk answers `IntLiteral`'s arithmetic" refers to. It may mean arithmetic declared on `IntLiteral` in the library. Confidence: medium.
6. **Pairs and triples**: the passage says "Walk refuses another element type at the call" and also "Unordered deciding elements give `false`". These read as contradictory until one sees that "unordered" means two values of a partial order that are incomparable, not values of an unordered type. "Refuses at the call" does not say whether that means a load-time refusal or a run-time dispatch failure. Confidence: medium.
7. **"A reduction without an identity lifts its elements to `Maybe[\R\]` ... whose `simpleJoin` takes and answers `R`"**: the elements become `Maybe`, yet the join takes `R`. The passage does not say where the lifting happens. A worker writing a reduction cannot tell which signature to write. "Lifts" is not a term the core gives. Confidence: medium.
8. **"A generic one stops at its first join"**: one of what, a reduction with static parameters that declares `simpleJoin` at `Any`? And "stops" how, with which error? Confidence: medium.
9. **`comprises`, "as `Integral[\I\]` below `AnyIntegral`"**: the passage does not say which trait declares the clause. Nor does it say which listed type `Integral[\I\]`'s subtypes lie below. I cannot rebuild the example. Confidence: medium.
10. **"`pick(x: (T,T))` takes no `(1, 2)`"**: this holds only if `T`'s bound names `T` itself, and the passage does not say so. Confidence: low-medium.
11. **"Duplicates ... So the checker refuses `f(self, y: S)` beside `f(x: S, self)`"**: the bullets that follow say "both paths", but this sentence names only the checker. Does walk accept the pair? Confidence: low-medium.
12. **Terms the core does not give**: "Working Draft" is defined in place, but it lives in `Specification-1.0-frozen/`, which neither the core nor CLAUDE.md mentions. A reader may confuse it with `Specification/`. "Appendix I" appears in the core only as a part's subject. "Meet Rule" is capitalised here as if it were a name, but the core describes it without naming it. Also not in the core: "declared domain" (defined here), "instance" (used without definition), "route A/C", `OPEN`, `NatParam`, "clause form" (defined here) and "promotion" (defined here). Confidence: low that any of these sends a worker wrong. The most likely to confuse are "Working Draft" against `Specification/`, and "instance".
13. **The opening's "fixed-width arithmetic does not wrap"**: the core says `references/library.md` gives "wrapping". A reader can take this to mean that wrapping operators exist, or that they do not. The orientation should say which. Confidence: low-medium.
14. **"Of the integer types, only `ZZ32` extends `Index`"**: this is a strong practical limit for large arrays, which in microGPT are 64-bit sizes. The passage gives no workaround. A worker may go looking for a `ZZ64` index that does not exist. Confidence: low.

## 3. Passages with repair history, or detail that changes no action and prevents no misunderstanding

- **Self-typed traits**: "With this reading ... the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own". This is a justification and the story of a repair. It does not change what a worker writes.
- **Duplicates**: "The Scala language accepts it." This is borderline. It guards against a Scala intuition, but the rule already states the behaviour.
- **Numbers**: "Route C is the way not chosen: a checker rule under which the number types could nest again." This is history. Only "route A" and "the tower" are needed to read the record.
- **`NatReflect`**: the second reason after the switch-over (`comprises ... where [\nat n\]` and verification, row 307) is repair detail. The action is simply that such a call does not run compiled, before or after the switch-over. The closing "This holds for a program's own trait too" does carry an action and should stay.
- **Powers**: in the compiler-library limits, "At a base of 0 it throws a Java exception that no `catch` sees" is diagnostic detail for a limit that the worker must not fix anyway. It is borderline: it helps someone recognise a crash.
- **Index**: "The Working Draft lets no trait type hold a tuple, but here ..." The Working Draft half is history. The rule that a tuple of `Index` types is an `Index` is enough.
- **Reductions**: the walk-instantiation sentences ("Walk instantiates a reduction at its value's declared type ...") largely repeat the core's "Static parameters" bullet. They are kept for the added detail (the method return type, the field, the parameter).
