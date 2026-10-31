# Cold read of the climb-batch-24 orientation

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and `explorations/compile-ladder/climb-batch-24/orientation/orientation.md`. Nothing else opened. Line numbers are the orientation's.

## 1. What I would do differently, section by section

### Opening (lines 1-7)

- I sort every sentence into one of four kinds before I act on it. A bold sentence is the tree's rule. A sentence with P-N is a curator decision, and I may cite it as one. A sentence with no P-N is something I build on but do not cite as a decision. A sentence that cites a ledger row is a known departure of one path, and no test of mine asserts it as correct. A sentence that opens "Until the switch-over" is a limit of the compiler's library, and I do not fix it in the compiler's prelude.
- Before I call two sources a conflict, I look here and then in FACTS and POSITIONS. Where the papers and the specification's early text disagree, the papers usually win (P-26).
- I distrust team tests, old notes and my own training on three points: the number types do not nest, fixed-width arithmetic raises instead of wrapping, and walk converts arguments.
- The team's original specification text is in `Specification-1.0-frozen/` (the "Working Draft"), and Appendix I of `Specification/` holds the text of each passage a rule changed.
- Limit: I cannot tell what to cite for an un-numbered rule (section 2, item 1).

### Dispatch and overloading (lines 9-24)

- I may write overloads that differ only in the bounds of their static parameters (P-45). I judge exclusion and specificity on declared domains: every argument type that the parameter types accept at some instance within the bounds. The more specific declaration's return type must be a subtype at every instance.
- When a declaration has static parameters, I test exclusion over the whole parameter tuple. Generic types shared across positions force their static arguments to be equal. A pair that leaves a static parameter untied is refused on both paths (P-152). In the exclusion test, a type parameter that stands as a whole parameter type, a tuple element, or a member of a union or intersection is replaced by the meet of its bounds. Inside a static argument it stays as it is (P-157).
- Under walk I never rely on declaration order. Walk infers a dotted generic method's static arguments from run-time types, and an argument outside a bound fails with "Cannot unify".
- I do not take walk's load check as the verdict, either when it accepts or when it refuses. Before I change code to satisfy it, I look the case up in `interpreter.md`, "What walk checks".
- `self`'s position does not matter: two functional methods with equivalent parameter types are duplicates. An abstract and a concrete method with the same types in one trait are refused. An object that inherits the abstract from one trait and the body from another must declare the method itself (P-149), unlike in Scala.
- A trait's functional method `h(self)` clashes with a top-level `h(x: String)` unless the types exclude, nest, or a third declaration covers their meet. I would declare the exclusion or rename, and not expect it to just work.

### Traits and objects (lines 26-50)

- No type of mine extends two instantiations of one generic trait (P-43, P-97). I do not copy specification examples marked "Not allowed". I do not take walk running such a type as evidence that it is valid (row 416).
- A `comprises` clause speaks of values, so it need not list every subtype (P-60). Walk checks it only in the main component (row 551).
- I never write a Java-style `override` at the inherited declaration's own parameter types. Walk refuses it at load, and in the library that stops every program. `override` is only for widening. To replace a declaration at the same types, I redeclare it without `override`. In anything compiled, I write no `override` at all (row 650).
- An object must cover each inherited abstract method with one body, or with several narrower bodies read with `comprises` (P-147). Walk does not check this for a generic object (row 665). The checker refuses a cover of several bodies when a static parameter is involved (row 725).
- A self-typed trait is used as `object Foo extends T[\Foo\]`; anything else is refused. In its bodies `self` is `T[\X\]` met with `X`, so no cast is needed. On the compiled path, though, I avoid a body that returns `self`: it fails JVM verification (row 695). For the overloading rules `self` is `T[\X\]`, except in the exclusion test (P-157).
- In library code I bound an index parameter by `I extends Index` (P-156). Only `ZZ32` is an `Index`. A numeral is not one to the checker, so I pass a `ZZ32` value to an `Index` parameter. A tuple of `Index` types is an `Index`, and `()` is not. Until the switch-over, a compiled program cannot name `Index`.
- I compare tuples only when every element type extends `StandardPartialOrder`. I do not order a `List[\RR64\]` (P-154), and no test of mine relies on walk ordering every list (row 774).

### Static parameters, `where` clauses and sizes (lines 52-71)

- An unfixed type parameter takes its bound, not `Nothing` (P-48). Under walk, a parameter bounded by itself shows as `OPEN`, and in three listed cases it becomes `Bottom`. In walk programs I write static arguments, including on inner calls (`mk[\ZZ64\]()`), because walk gives an argument no expected type (row 705).
- I use only the three `where` forms (P-151). Any other `where` on an `extends` entry is silently treated as unconditional by the checker, so I would never write one and expect it to restrict anything. No test of mine relies on a condition being enforced at run time (rows 774, 777). I do not compile a call to a declaration whose `where` clause introduces a variable (row 867).
- Sizes are equal only when written alike after numeral arithmetic (P-55). `s0 s1` is not `s1 s0`, and a `typecase` arm on a numeral stays reachable. The exponent of a size power is at most 4096 and never negative.
- A size known only at run time comes from `reflect`, and only under walk.

### Numbers (lines 73-83)

- When the record says "route A" or "the tower", I do not read either as nesting.
- Under walk a numeral is an `Int`, `Long` or `BigNum`, so `Box[\Int\]` is not `Box[\ZZ32\]` (row 364). I always write the static arguments of `array1` and `array2`. Without them, walk builds a plain array with no `+` (row 721).
- Coercions apply at calls, typed bindings and assignments (P-59). A generic call is promoted to the narrowest type that all its arguments coerce into (P-74), but walk does not promote tuple or varargs elements. A tie between coercions stops with "Ambiguous coercion".
- An integer `^` answers in its base's type (P-153). A negative exponent raises an error except on bases 1 and -1. For a fractional result I write `2.0^(-1)` or a `QQ` base, never `10^(-k)`. Compiled powers stay limited until the switch-over.
- `7 / 2` is a `QQ`, and `DIV` truncates toward zero. For a float I write `(1.0 s) / n` when `s` is a `ZZ32` and `asFloat` when it is a `ZZ64`. A compiled `/` on two integers is a static error until the switch-over.

### Reductions and comprehensions (lines 85-95)

- I always write the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` in a clause form (row 731).
- Under walk I steer a reduction's type through a typed local variable or a function's return type. A method's return type, a field, a top-level variable, a parameter or an assignment does not steer it.
- I read "`__bigOperator`, body param 1" as an element that failed to convert to the reduction's instance.
- No test of mine asserts the three walk departures (rows 716, 20/717, 436).
- In a reduction of my own without an identity, I declare `simpleJoin` at `R`, never at `Any` or untyped, and I do not copy the team's tests that do otherwise.

### Implementation limits (lines 97-101)

- I never use a `Maybe` as an `if` condition. I write every parameter type. An omitted return type comes from the api's declaration, and failing that the checker infers it from the body.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core lacks

1. **Line 5, "Build on a sentence without one, but do not cite it as a decision."** It leaves open what to cite. The core allows only the brief, a record entry or a primary source, and the skill is none of these. A worker either cites the skill, which the core does not allow, or goes digging for the primary source each time. Confidence: medium.
2. **Line 5 against the bold sentences.** Line 5 says "Each bold rule states the rule of this tree", but several bold sentences describe one path rather than a rule: "Walk's load check is not the verdict" (l.17), "Under walk a numeral has a run-time class" (l.77), "A reduction's static argument depends on the path" (l.89), "Walk has no static types until..." (l.99). Under the line 5-7 scheme, a worker cannot tell whether walk's numeral classes are a rule to keep or a departure to fix. Line 77 cites row 364 only for the consequence. Confidence: medium.
3. **Line 45, `Index`.** The line says "In the library, and in your own generic over such a type, write `I extends Index`", and later "Until the switch-over, the compiler's prelude declares no `Index`, so a program that names it does not compile." A worker writing a test meant to run on both paths, as the core requires for a shared phase, cannot obey both. The passage never says that the first instruction binds library code and walk programs now, and compiled programs only after the switch-over. "The checker refuses it when it checks against the interpreter's library" names a case that today arises only in the count stage, which a reader will not know. Confidence: medium-high.
4. **Line 45, "count stage".** The core mentions it once without defining it, and neither file says what it runs or when. Confidence: high that it is undefined; the impact is low.
5. **Line 32, `override` widens.** "Only where the inherited parameter types are strictly narrower than its own" does not say whether `self`'s type counts. In a subtrait `self` is always narrower, so for a functional method the comparison reads two ways. "The checker checks that an overriding return type is a subtype" does not say whether a redeclaration without `override` is also checked. There is a further tension with line 19: two functional methods with equivalent parameter types are duplicates, yet line 32 tells me to redeclare at the same types without `override`. Is an inherited declaration plus a redeclaration a duplicate? The text implies not, but never says so. Confidence: medium.
6. **Line 60, P-51.** The bold sentence "Only the checker gives a call written as an argument the enclosing call's context" makes walk's behaviour part of the rule, yet the same paragraph cites row 705 for it, which by line 7 makes it a departure. It reads two ways: is walk meant to change or not? The advice (`mk[\ZZ64\]()`) works either way. Confidence: medium.
7. **Line 81, powers.** "At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523)" sits inside an "Until the switch-over" passage, so it is both a prelude limit (do not fix it there) and a ledger row (a fixable departure). It is also unclear whether "at a base of 0" means at a negative exponent only or at any exponent. Confidence: medium on the first point, low-medium on the second.
8. **Line 54, `OPEN` in overload comparison.** The example `pick(x: (T,T))` does not show `T`'s bound, so a reader cannot see when `OPEN` arises. The sentence cites no row, which by line 5 makes "takes no `(1, 2)`" a rule to build on, though it reads like a limit of walk. A worker could assert it in a test. Confidence: medium.
9. **Line 71, `NatReflect`.** "Opens a value of a trait of this shape" uses "opens", which the core never gives, and "this shape" is vague. A worker cannot tell which of their programs hit row 307. "The object type `N[\n\]`" reads either as a placeholder or as a type that `NatReflect` declares. "Such a call does not run compiled" carries no row and no "Until the switch-over", so it is unclear whether it is a rule or a limit. Confidence: medium.
10. **Line 67, "A compiled call whose own clause introduces a variable".** A call has no `where` clause; it must mean a call of a declaration whose clause binds a variable. On line 64, "checked at a call" reads two ways: statically at the call site, or when the call runs. "The code generator compiles a declaration's own `where` clause and emits nothing for it" (no row) suggests run-time checking is not expected on the compiled path, while row 777 implies walk should check at run time. Confidence: medium.
11. **Line 77, "Walk answers `IntLiteral`'s arithmetic as a `ZZ32` (row 578)."** The same paragraph says that walk gives a numeral the class `Int`, `Long` or `BigNum`, so walk has no `IntLiteral`. What this sentence means, and when it bites (overflow of literal arithmetic?), cannot be recovered. Confidence: medium.
12. **Line 24, "An abstract functional method also counts for it."** It reads either as an abstract method being one of the two overloads that need a cover, which is what the example shows, or as an abstract method being able to serve as the covering declaration. No remedy is given; a reader has to infer `S excludes { String }` or a covering declaration. Confidence: medium-low.
13. **Line 45, "A function over `Index` and one over a tuple of `Index` types do not exclude each other."** Since such a tuple is an `Index`, the two nest, and the tuple overload is more specific. A worker may read "do not exclude" as "needs a meet declaration" and add one, or think the pair is invalid. Confidence: medium-low.
14. **Line 45, "Pass a `ZZ32` value there instead."** It does not say how to turn a numeral into a `ZZ32` value (a typed local? a conversion?). The reason that `a[3]` stays valid relies on `IntLiteral` converting to `ZZ32`, which appears only later, on line 77. Confidence: low-medium.
15. **Line 101, row 405.** It reads two ways: is the departure walk running an untyped parameter at all, or walk failing in a method that implements an abstract one? It is also silent on function expressions (`fn x => ...`), and silent on whether walk sees a return type taken from the api, which matters to the line 89 rule that a function's return type directs a reduction. Confidence: medium on the row, low-medium on the rest.
16. **Line 95, `BIG MAX`.** "Lifts its elements to `Maybe[\R\]`" together with "`BIG MAX` over a generator still answers `R`" leaves the empty generator unexplained: does it raise, or answer something else? Confidence: medium-low.
17. **Line 21, "an abstract and a concrete method with the same parameter types in one trait".** It does not say whether this covers dotted methods or only functional ones; the bold sentence above it speaks only of functional methods. Confidence: low-medium.
18. **Line 13, "Both paths refuse a pair where the equalities leave a static parameter free".** Line 17 says that walk checks generic functional methods only at a call (row 780), so "refuse" may mean at load or at a call. Confidence: low-medium.
19. **Line 11, "at every instance".** It does not say whose instances, the more specific declaration's or both, or how the other declaration is instantiated against them. Confidence: low.
20. **Line 89, "Other reductions take their bound, or the expected type where the bound does not fit".** Line 54 describes the checker's choice as "the intersection of its upper bounds, narrowed by the expected type". The two wordings do not obviously agree. Confidence: low.
21. **Line 69, size exponents.** "Walk refuses a negative exponent" and the class loader crashes (row 675), but nothing says what the checker does with one. Confidence: low.
22. **Line 30, "extenders" and "the program's main component".** The core gives neither term; both can be inferred. Confidence: low impact.
23. **Line 5, two homes for the original text.** `Specification-1.0-frozen/` and Appendix I both hold it, and the passage does not say which to cite. Confidence: low.
24. **Line 99, "until it runs the checker after the switch-over (P-12)".** This is new beside the core, which says only that walk switches the checker off. A reader may take it as a reason to make walk programs checker-clean now, or may miss it altogether. Confidence: low.
25. **Placement, line 50.** The order of pairs, triples and lists sits under "Traits and objects". A worker looking for comparison behaviour under Numbers or Reductions will not find it. Confidence: low.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

1. **Line 43, "With this reading and the bounds that the test reads ..., the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own."** This explains why the library already passes, which changes nothing a worker does. Only the next sentence (walk refuses such a pair in a program's own component, row 804) is actionable. Confidence: medium.
2. **Line 75, "Route C is the way not chosen: a checker rule under which the number types could nest again."** This is the history of a decision. It earns its place only if live record entries still say "route C". The silence on a route B invites the question. "The record still calls ... 'the tower'" is needed, because it prevents a misreading of the record. Confidence: medium-low.
3. **Line 99, "So walk runs programs that the checker refuses."** This repeats the core ("A program that runs under walk can be ill-typed"). Confidence: medium.
4. **Lines 56-58, the three `Bottom` cases (rows 591, 612, 587).** Each is a narrow walk case, and all three lead to the same action: write the static argument. They help a worker recognise a symptom but change no action beyond that. They could shrink to one sentence with the rows listed. Confidence: low-medium.
5. **Line 69, "above the exponent 4096, except of 0, 1 or -1".** This is a rare limit that matters only for very large size powers, and it will not touch the model program. It could go to `compiler.md`. Confidence: low.
6. **Line 45, "The Working Draft lets no trait type hold a tuple, but here ..."** The contrast with the Working Draft is history. The rule after it is what matters. It prevents a misreading only for someone reading the frozen specification. Confidence: low.

The orientation holds no batch-by-batch repair history; the phrases "still" (l.54, l.75) are its only traces.
