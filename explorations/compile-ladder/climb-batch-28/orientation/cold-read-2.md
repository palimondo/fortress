# Cold read 2 of the orientation (climb-batch-28)

I read `CLAUDE.md`, the core (`.claude/skills/fortress-repo/SKILL.md`) and `explorations/compile-ladder/climb-batch-28/orientation/orientation.md` whole, and opened no other file. Line numbers below are orientation.md's. Confidence is my estimate that the passage would mislead a worker, or would be read in more than one way.

## 1. What I would do differently, section by section

### Preamble (lines 3-7)

The rule: the specification, walk with the interpreter's library, and the compiled path with the compiler's library disagree, and the bold rules settle the disagreements. Each sentence is one of these kinds:

- a bold rule: the rule of this tree;
- a sentence naming P-N: a decision of the curator, which I can cite as one;
- a sentence with no P-N: I can build on it, but must not cite it as a decision;
- a sentence citing a ledger row: a departure of one path, which I must never assert as correct in a test;
- a sentence opening "Until the switch-over": a limit of the compiler's library, which I must not fix in the compiler's prelude.

What I would do differently:
- Before I cite a sentence or write a test against it, I would sort it into one of those kinds.
- I would search FACTS and POSITIONS before I call a disagreement a conflict.
- I would distrust old notes, team tests and my training on three points: the number types nest, fixed-width arithmetic wraps, and walk does not convert arguments. All three are false here.
- I would read `Specification-1.0-frozen/` as the unrevised Working Draft and Appendix I as the original text of passages that changed. Where the two disagree, I would take the later type papers over the specification's early text (P-26).

Limits: the kinds are defined sentence by sentence, but some paragraphs mix them (2.1-2.3).

### Dispatch and overloading (lines 9-24)

The rule:
- Overloads may differ only in their static parameters (P-45). Validity is judged on declared domains, and the more specific declaration's return type must be a subtype of the other's at every instance.
- With static parameters, exclusion is read over the whole tuple of parameter types (P-152).
- In the exclusion test, a static parameter that stands as a whole parameter type, a tuple element, or a member of an intersection or union is replaced by the meet of its bounds. Inside a static argument it stays (P-157).
- Walk chooses by declared types, never by the order of declarations, and its load check is not the verdict.
- Functional methods with equivalent parameter types are duplicates, wherever `self` stands.
- An object that inherits an abstract functional method from one trait and its body from another must declare the method itself (P-149).

What I would do differently:
- To overload generic declarations on different bounds, I would tie their static parameters at one position (a shared `Box[\T\]`) and make another position exclude. If a static parameter is left free, both paths refuse the pair.
- I would never reorder declarations to steer dispatch.
- Before changing code to pass walk's load check, or taking its acceptance as proof, I would look up the case in `interpreter.md`, "What walk checks".
- In an object that extends both such traits, I would declare the method again.
- In a trait of mine with a functional `+`, `-`, `MIN` or `MAX`, I would write `excludes { Number }` or `excludes { HasRank }`, or put the operator in an object. Without that, walk refuses the program with "fails the Meet Rule". The checker accepts it against the library's `+` (row 918), so a clean compile proves nothing.

Limits: the checker decides validity; walk's departures are listed in `interpreter.md`, not here. When a self-typed trait needs the `excludes` is unclear (2.5).

### Traits and objects (lines 26-62)

The rule:
- No type extends two instantiations of one generic trait. The checker enforces this (P-43, P-97); walk does not.
- A `comprises` clause speaks of values, so it need not list each direct subtype (P-60).
- `override` only widens: it overrides an inherited declaration only where the inherited parameter types are strictly narrower.
- An object covers each inherited abstract method with bodies that together cover its parameter types (P-147).
- In a self-typed trait, `self` is `T[\X\]` met with `X`.
- An indexed type's index parameter is bounded by `Index` (P-156). Only `ZZ32` and tuples of `Index` types are `Index`.
- Pairs and triples order only where every element type extends `StandardPartialOrder`. A list orders only where `E extends StandardTotalOrder[\E\]` (P-154).
- Where a type declares no `=`, `=` is `SEQV` (P-168).

What I would do differently:
- I would not copy Working Draft examples marked "Not allowed".
- Under walk, I would not overload on two instantiations of one trait (row 416).
- I would never write `override` to replace a declaration at the same parameter types; I would declare it again without the modifier. In code that must compile, I would write no `override` at all (row 650).
- In a generic object, I would give one body at the abstract method's own types, because walk skips the cover check there (row 665) and the checker refuses covers by several bodies (row 725).
- No type of mine would extend `T[\A\]` without being an `A`. I would expect a compiled self-typed body that returns `self` to fail verification (row 695).
- I would write `I extends Index` only in code that runs under walk or is checked against the interpreter's library, never in a compiled program before the switch-over.
- I would pass a `ZZ32` value, not a numeral, to an `Index` parameter.
- I would not overload a function over `Index` beside one over a tuple of `Index` types without covering their meet.
- I would not expect `<` on a tuple of `()`, or on a list of `RR64` under the checker.
- To compare a value object by content, I would give it its own `=`.
- For boolean equivalence I would write `a <-> b`, never `≡`/`EQV`.
- Unless the type extends `Equality`, I would write `assert(x = y, msg)`, not `assert(x, y, msg)` or `≠`.
- In a test that runs compiled before the switch-over, I would not assert anything about `SEQV` or tuple `=` (row 908).

Limits: walk checks `comprises` only against the main component's clauses (row 551). Walk's and the checker's cover searches stop at limits given in `interpreter.md`.

### Static parameters, `where` clauses and sizes (lines 64-83)

The rule:
- A type parameter that a call does not fix takes its bound (P-48).
- Only the checker types an inner call against the enclosing call's parameter types (P-51).
- Three `where` forms are built (P-151): conditional extension; a condition on a function's or method's own static parameters; a `where` type variable in a `comprises` clause.
- Sizes are equal only when they are written alike after numeral arithmetic (P-55).
- A size known only at run time comes from `reflect`.

What I would do differently:
- Under walk, I would write static arguments on a generic call nested as an argument: `mk[\ZZ64\]()`.
- I would write no other `where` form, because the checker drops it silently.
- I would not rely on a declaration's own `where` clause being checked in compiled code.
- I would not compile a call whose callee's clause introduces a variable, such as `where [\nat n\]` (row 867).
- I would write size products in one fixed order, since `s0 s1` is not `s1 s0`.
- I would keep size exponents between 0 and 4096, and never negative.
- I would use `reflect`/`NatParam` only under walk. I would not give a compiled program's own trait a `comprises` clause that lists a type at a `where`-clause size (row 307).

Limits: walk still gives `Bottom` in three listed cases (rows 591, 612, 587), and treats self-bounded parameters as `OPEN`.

### Numbers (lines 85-99)

The rule:
- The number types are flat siblings (P-43). The record's "route A" and "the tower" do not mean that they nest.
- To the checker, a numeral is an `IntLiteral` (P-76). Under walk it has the class `Int`, `Long` or `BigNum`, printed as `ZZ32`, `ZZ64` or `ZZ`.
- Arguments convert by declared coercions (P-59), and generic calls promote to the narrowest common target (P-74).
- Integers convert by the checked getters `as…` or the low-bits functions `narrow`, `widen`, `signed`, `unsigned` and `big` (P-161).
- `Number` declares nothing (P-165).
- An integer power answers its base's type (P-153).
- `/` on two integers gives a `QQ`.

What I would do differently:
- With a numeral argument, I would write static arguments explicitly: `Cell[\ZZ32\](3)`, and `array1`/`array2` with the element type written. I would not trust a printed type under walk.
- I would expect "Ambiguous coercion" where several declarations apply only by coercion.
- I would convert with `asZZ32` and the other getters when a value must be kept, and use `narrow` only where wrapping is meant. On `ZZ` I would write `z.asZZ32`.
- In compiled code, I would check which of the 8 getters the prelude has.
- I would not call `asFloat` or any operator on a `T extends Number`. I would write one declaration per number type.
- I would never compare numbers of two types with `=` unless a coercion joins them. I would write `asFloat(x) = y`.
- For a fractional power I would write `2.0^(-1)` or a `QQ` base. I would not write `10^(-k)`.
- I would truncate with `DIV`.
- For a float division I would write `(1.0 s) / n`, or `asFloat` on each `ZZ64`.
- I would not write integer `/` or a `QQ` in compiled code before the switch-over.

Limits: before the switch-over, the compiler's library has integer powers only at `ZZ32`, `NN32` and `NN64`. Its `ZZ32` power gives 0 at a negative exponent, and at base 0 it throws a Java exception that no `catch` sees (rows 441, 523).

### Reductions and comprehensions (lines 101-111)

The rule:
- The checker does not infer the static argument of `SUM`, `PROD`, `BIG MAX` or `BIG MIN` (row 731).
- Walk instantiates at the declared type of a local variable, or at a top-level or local function's return type. Otherwise it takes the join of the elements' run-time types.
- Reductions without an identity extend `AssociativeReduction[\R\]`, with `simpleJoin` at `R`.

What I would do differently:
- I would write `SUM[\ZZ32\][...]` and the like in every clause form.
- I would bind a walk reduction to a typed local variable, not to a field, a method's result or an assignment.
- I would read "body param 1" in `__bigOperator` as an element that does not convert.
- In any reduction of my own, I would declare `simpleJoin` with typed parameters at `R`, and not copy the team's tests.

Limits: an empty `SUM` with no declared type gives the integer 0 (row 716). A nested comprehension is built at run-time types (rows 20, 717). A written non-number static argument ends an empty `SUM` in `CastError` (row 436).

### Implementation limits (lines 113-117)

The rule:
- Walk has no static types until the switch-over (P-12).
- Every parameter must have a type.

What I would do differently:
- I would never use a `Maybe` as an `if` condition.
- I would write a type on every parameter, local functions included.
- I would leave out a component function's return type only where the api declares exactly one matching declaration.

Limits: walk tolerates an untyped parameter except in a method that implements an abstract one (row 405).

## 2. Passages that would mislead, read two ways, or use terms the core does not give

2.1. Lines 5 and 7: are the conventions per sentence or per paragraph? A bold rule that names P-N (line 11, P-45) is followed by sentences without P-N. Are those part of the decision? Some sentences continue an "Until the switch-over" sentence without opening with it. One is line 97: "Its `ZZ32` power gives 0 ... At a base of 0 it throws ...". By line 7's wording, the instruction not to fix these in the prelude does not cover them. The same holds for line 93's second "Until" sentence and line 62's "Its own `≣`". Confidence: medium-high (70%).

2.2. Line 7: some sentences both cite a row and describe the compiler's library: rows 349 (line 93), 441/523 (line 97) and 908 (line 62). Two instructions then apply: "A fix can change it" and "do not fix it in the compiler's prelude". The part does not say which wins. "Compiler's library" and "compiler's prelude" are also used as if interchangeable. The core says the prelude is three files *of* that library, so a worker cannot tell whether a limit outside those files may be fixed. Confidence: medium (60%).

2.3. Line 5 says "Each bold rule states the rule of this tree". Several bold sentences, however, state a path-specific fact or a departure, not a rule:
- line 89, "Under walk a numeral has a run-time class": row 364 makes it a departure;
- line 105, "A reduction's static argument depends on the path": row 731;
- line 72, "Only the checker gives ... (P-51)": walk's side is row 705;
- line 115, "Walk has no static types";
- line 15, "Walk chooses by declared parameter types".

A worker who takes line 5 at its word could assert walk's numeral class, or the path dependence, as correct in a test. Confidence: medium (60%).

2.4. Line 24, "An abstract functional method also counts for it". Does it count as one of the two overloads that need a cover, or as a declaration that covers the meet? The example `h(self): ZZ32` settles it only if the reader sees that `h` is abstract, and the text never says so. Confidence: medium (60%).

2.5. Lines 24 and 43 contradict each other on a program's own trait with a functional `+`. Line 24 says walk refuses it unless the trait excludes `Number` or arrays. Line 43 says walk "loads such a pair ... in a program's own component" when the trait is self-typed. It is unclear whether "such a pair" means the library's array-number `+` beside a program's self-typed `+`, or a pair that a program declares by analogy. A worker cannot tell whether a self-typed trait needs the `excludes`. Confidence: medium (55%).

2.6. Lines 43-46: walk's load check "still refuses the pair in two cases", and neither case cites a ledger row. Line 7's convention therefore marks them as rules, but the sentence calls them a failure of a check that "is not the verdict". Are they departures to fix or to work around? Confidence: medium (55%).

2.7. Lines 22 and 34: P-149 says a body inherited from another trait does not define a functional method, and the object must declare it. P-147 says an object defines an inherited abstract method "by bodies that together cover". Does an inherited body count as one of those bodies? And does P-149 hold for dotted methods? Confidence: low-medium (40%).

2.8. Line 55, "`SEQV` follows the specification on both paths". The same paragraph then contradicts this (line 62, row 908): before the switch-over, the compiler's `===` compares strings and numbers by `=`, not by identity or bits. A worker who stops at line 55 would write a compiled test on identity semantics. Confidence: high (80%).

2.9. Line 62, "Both false answers are the rule's: assert them as correct". The paragraph gives four `false` results: `V(s) = V(t)`, `"ab" SEQV "ab"`, `V("ab") = V("ab")` and `(s, 1, 2, 3) = (t, 1, 2, 3)`. Which two are "both"? Two of them rest on walk making a new string at each evaluation of a literal, marked "Under walk", and the compiled path answers otherwise (row 908). Read broadly, the sentence tells a worker to assert a walk-only result as the rule. Confidence: medium-high (65%).

2.10. Line 62 says a float numeral under walk is a `FloatLiteral`, "not equivalent to a computed `RR64`". That covers `SEQV`. It leaves open whether `x = 0.5`, for an `RR64` `x`, is `true` under walk. Line 95's "1/2 = 0.5 is false" sharpens the doubt, and the part never states `FloatLiteral`'s coercions. A test writer cannot tell whether `assert(x = 0.5, msg)` works. Confidence: medium (55%).

2.11. Line 66, "beside `pick(x: Any)`, `pick(x: (T,T))` takes no `(1, 2)`". `T`'s declaration and bound are not shown, and the call `(1, 2)` seems to fix `T`, so the reader cannot see why `OPEN` arises or what to avoid. Confidence: medium (55%).

2.12. Line 79: is a function's own clause that introduces a variable (`where [\nat n\]`) one of the three built forms of line 74 ("a condition ... on its own static parameters")? Row 867 suggests the checker accepts it and the compiled call dies, but line 74 lists only "conditions". Confidence: medium-low (45%).

2.13. Line 93, "Under walk, each fixed-width type has all five". The five are the low-bits functions, but the next sentences count "25 getters", which invites reading "five" as getters. "Under walk" also leaves open whether the checker sees the same declarations against the interpreter's library. Confidence: low-medium (40%).

2.14. Line 105, "Write it in every clause form". Does this mean only the four named reductions, or every reduction? Does a non-clause form such as `SUM v` need it? A related sentence on the same line is unclear: "Other reductions take their bound, or the expected type where the bound does not fit". What does "does not fit" mean? Confidence: low-medium (40%).

2.15. Line 111: the part says a reduction without identity "lifts its elements to `Maybe[\R\]`" and that `BIG MAX` "still answers `R`", but not what `BIG MAX` gives over an empty generator. A worker could expect `Nothing`. Confidence: low-medium (40%).

2.16. Line 17, "on their declared domains only at a call (row 780)". This could mean walk compares only at a call, not at load, or that at a call it compares only declared domains. Confidence: low-medium (40%).

2.17. Lines 48 and 81: two walk statements cite no row: "Walk runs the code without the bound" (line 48) and "Walk refuses a negative exponent" (line 81). By line 7 they are rules, but they read as departures. For line 81, it is also unclear whether the checker accepts a negative exponent. Confidence: low (35%).

2.18. Line 99, `(1.0 s) / n`: the part says nothing on whether this resolves on the compiled path, where `/` is declared "only at `RR64`" and nothing says that `ZZ32` coerces to `RR64` there. Confidence: low (30%).

2.19. Terms the core does not give:
- **meet**: line 13 and passim. The core uses it undefined.
- **`HasRank`**: line 24, implied to mean arrays.
- **main component**: line 30.
- **a `comprises` that lists only `...`**: line 38.
- **`0#n`**: line 103.
- **`__bigOperator`, "body param 1"**: line 105.
- **`IntLiteral`**: used at line 48, defined only at line 89.
- **route A / route C**: line 87; route B is never mentioned.
- **nest, of overloads**: line 24.
- **count stage**: line 48. The core names it without defining it.

The library names (`StandardPartialOrder`, `StandardTotalOrder`, `Equality`, `AssociativeReduction`, `simpleJoin`, `NatParam`, `Unordered`) are clear in context. Confidence that any of these misleads: low (25%), except `IntLiteral` used before its definition (35%).

2.20. The core and the brief name the part differently. The core calls it `references/revival-changes.md` and cross-references a section "Static parameters", while the section here is "Static parameters, `where` clauses and sizes". The brief calls the part "the orientation", a term the core never uses. If the file is renamed, the core's references must move with it. Confidence: low (25%).

## 3. Repair history, and detail that changes no action and prevents no misunderstanding

- Line 87, "Route C is the way not chosen: a checker rule under which the number types could nest again": the history of a choice; "again" shows it. The bold rule repeats the core. The only part that helps a worker is the vocabulary for reading the record: "route A" and "the tower" do not mean the types nest. That fits in one sentence.
- Line 43, "With this reading and the bounds that the test reads ..., the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own": it explains why the library's current state passes. It changes no action unless the worker edits those declarations, and it causes the confusion of 2.5.
- Line 34, "and the checker at the same limits": the pointer to `interpreter.md` is the action, and this clause adds none.
- Line 81, "the runtime carries each as a descriptor": the core already gives descriptors, and this changes no action.
- Line 66, "The checker takes the intersection of its upper bounds, narrowed by the expected type": checker internals beyond "takes its bound". Borderline.
- Line 48, "`Index` extends only `Any`, so such a tuple is still no `Object`": only marginally changes an action (an `Object` parameter does not take an index tuple).
- Line 48, "The Working Draft lets no trait type hold a tuple": a contrast with the frozen text. It helps only a worker who reads that text.
- Line 81, "in `typecase N[\b0\] of N[\0\] => ...` the arm is reachable": no action follows, and its sense (the checker's view, not the run time's) is left implicit.
- Line 93, "the compiler's prelude has 8 of the 25 getters, `ZZ64`'s `asZZ32` among them": a partial count a worker cannot act on. Either list the 8 or point to `compiler.md`.
- Line 95, "A program may also declare its own number type below `Number` (P-160)": changes no action at this place. It restates line 24's point that `Number` has no `comprises`.
- Line 111, "lifts its elements to `Maybe[\R\]` inside the reduction" and "`BIG MAX` over a generator still answers `R`": the mechanism. The action is "declare `simpleJoin` at `R`, typed", and "still" hints at an earlier state.
- Line 115, "Walk will run the checker only after the switch-over (P-12). So walk runs programs that the checker refuses": a future plan, and a repeat of the core ("A program that runs under walk can be ill-typed"). Only the `Maybe` condition is new.
- Line 83, "After the switch-over, such a call still fails, for a second reason ...": forward-looking. Its last sentence ("This holds for a program's own trait too") is the action and should be kept; the lead-in could be cut.

I found no explicit repair history, such as "was fixed in" or "batch N" passages.
