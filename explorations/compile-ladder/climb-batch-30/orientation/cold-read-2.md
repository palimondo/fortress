# Cold read 2 of the orientation

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and `orientation.md` in this folder. Nothing else was opened, and no source was run. Every statement below is what the text made me believe, not a check of the tree.

## 1. What I would do differently, section by section

### The opening (three paragraphs)

- I would treat a bold sentence as the rule of this tree, a sentence with P-N as the curator's decision, and a sentence without one as something to build on but not to cite as a decision.
- I would not assert in a plain test a behaviour that the text ties to a ledger row: a fix can change it.
- I would not repair a limit that opens "Until the switch-over" in the compiler's prelude.
- Before I call a disagreement a conflict, I would search FACTS and POSITIONS.
- I would distrust old notes, the team's tests and my training on three points: the number types do not nest, fixed-width arithmetic raises and does not wrap, and walk converts arguments.
- Limit: I may question a rule only on evidence that the decision did not use.

### Dispatch and overloading

- I may write overloads that differ only in their static parameters or bounds. The return type of the more specific one must be a subtype at every instantiation that the arguments allow.
- For generic overloads, I would test exclusion over the whole parameter tuple: a generic type shared at one position forces the static arguments equal, and exclusion at another position then counts. A pair that leaves a static parameter untied is refused.
- I would not rely on the order of declarations under walk.
- I would not change code to satisfy walk's load check, nor take its acceptance as proof, before I find the case in `interpreter.md`, "What walk checks".
- I would not write two functional methods with equivalent parameter types that differ only in where `self` stands, nor an abstract and a concrete one at the same types in one trait. An object that takes an abstract functional method from one trait and the body from another must declare the method itself.
- I would count an abstract functional method as an overload for the Meet Rule.
- A trait of mine that declares a functional `+`, `-`, `MIN` or `MAX` needs `excludes { Number }` or `excludes { HasRank }`, or the operator goes into an object.
- Limits: walk's check and the checker differ on some pairs; the checker accepts the pair against the library's `+` (row 918), so a compile that passes does not show that walk loads the program.

### Traits and objects

- I would not write a type that extends two instantiations of one generic trait, nor copy the Working Draft's examples that do. Under walk, I would not overload on two instantiations of one trait (row 416).
- I would read `comprises` as a statement about values: a generic trait below a listed type need not be listed, and several declarations may cover a meet together.
- I would write `override` only where the inherited parameter types are strictly narrower than mine. At the same types I would declare the method again without the modifier. I would write no `override` in code that must compile (row 650), and none of the Java kind in the library, where it stops every program under walk.
- An object must cover each inherited abstract method, by one body or by several narrower ones. With static parameters on either side, the checker refuses a cover by several bodies (row 725).
- In a self-typed trait I would return `self` at the parameter's type without a cast, but not in a body that must compile (row 695).
- In a generic over an indexed type I would write `I extends Index`, but only in code that runs under walk or is checked against the interpreter's library. I would use only `ZZ32`, or a tuple of `Index` types, as an index.
- I would order pairs and triples only where each element type extends `StandardPartialOrder`, and lists only of a total order.
- I would not expect `=` to compare content where a type declares none: it is `SEQV`. A value object with a string field needs its own `=`, as does a tuple of four or more. I would write `a <-> b` for logical equivalence, not `≡`.
- Limit: until the switch-over, the compiler's library has no `=` over `Any` or on tuples, and its `===` compares by `=`.

### Static parameters, `where` clauses and sizes

- I would not expect `Nothing` or `Bottom` for a type parameter that a call leaves free: it takes its bound. Under walk I would write the static argument in the three listed cases, and for a generic call written as an argument (`mk[\ZZ64\]()`).
- I would write only the three built `where` forms. I would not trust any path to enforce a condition at run time, and I would not expect a message from the checker for an `extends` entry with another `where` clause. I would not compile a call of a function whose own clause introduces a variable (row 867).
- I would write sizes that must be equal in the same form: `s0 s1` and `s1 s0` differ.
- I would use `reflect` from `NatReflect` only under walk, and I would not pass, in compiled code, a value of a trait that `comprises` a type at a `where`-clause size where the listed type is expected (row 307).

### Numbers

- I would not write a subtype relation between number types.
- I would give a numeral a typed place when I want another type than its default (`ZZ32`, then `ZZ64`, then `ZZ`; `RR64` with a radix point). I would not expect `x = 0.1` followed by `q: QQ = x` to pass.
- I would write a numeral type only as the parameter type of a coercion or an operator. For my own number type I would declare the generic `coerce` over `n`, `r`, `v` (and `m`), with a `where` clause for the range, and read `v` as a `ZZ`.
- In a test of run-time arithmetic or concatenation, I would put one operand in a variable: an expression of numerals alone, or of string literals alone, folds before the checker and never overflows.
- I would convert integers with the getters (`x.asZZ32`), which raise, and use `narrow`, `widen`, `signed`, `unsigned` and `big` only where I want the low bits. On a `ZZ` I would use the getter.
- I would not call `asFloat` or an operator on a `T extends Number`: I would declare the function once for each number type.
- I would not compare a `ZZ64` with an `RR64` by `=`: it answers `false` without an error. I would write `asFloat(x) = y`. Under walk I would bind a numeral at `NN32` before I compare it with an `NN32` (row 973).
- I would write `DIV` for a truncating division, and a float operand, or `asFloat` on a `ZZ64`, for a float quotient. For a power that is not an integer, I would write a float or a `QQ` base.
- Limits until the switch-over: the prelude has no `QQ`, few getters, no `big`, integer powers at three types only, and `/` only at `RR64`.

### Reductions and comprehensions

- I would write the static argument in every clause form of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, as `SUM[\ZZ32\][j <- 0#n] f(j)`.
- Under walk, without it, I would expect the instance to come only from a local variable's declared type or a function's return type, not from a method's return type, a field, a top-level variable, a parameter or an assignment.
- In a reduction of my own without an identity, I would extend `AssociativeReduction[\R\]` and declare `simpleJoin` at `R`, not at `Any` or untyped, and I would not copy the team's tests.

### Implementation limits

- I would not write a `Maybe` as an `if` condition, though walk runs it.
- I would write the type of every parameter, also in a local function.
- I would not take a run under walk as proof that a program is well typed.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core lacks

Confidence is that the passage is a real problem for a new worker.

1. **"instance" for an instantiation (throughout; first in "Dispatch and overloading").** The core says "instantiation" (`Box[\RR64\]`). The orientation says "at some instance within its bounds", "a value has one instance of a generic type", "the instances that the call makes". In "a value has one instance of a generic type", "instance" reads first as a value of the type. One word, as in the core, would remove the doubt. Confidence: high.

2. **Self-typed traits, the two cases where walk "does not read `self` so" ("Traits and objects").** They cite no ledger row. By the opening's own rule, a sentence without a row is not a known departure, so I cannot tell whether these are recorded defects of walk, limits to respect, or unrecorded gaps that I should enter in the ledger. The text also gives no way round them. Confidence: high.

3. **`pick(x: (T,T))` beside `pick(x: Any)` "takes no `(1, 2)`" (P-48 paragraph).** It does not say which of the two takes none, nor what the call then does: does it run the `Any` declaration, or fail? Confidence: high.

4. **A quotient of numerals that is whole.** "A quotient that is not whole stays `n / d` ... and defaults to a `QQ`" implies that `10/5` folds to the numeral 2 and defaults to `ZZ32`, while "`/` on two integers answers a `QQ`" says a run-time `a / b` with the same values is a `QQ`. If that is right, it is a trap and deserves its own sentence; if it is wrong, the fold's sentence misleads. Confidence: medium-high.

5. **A numeral at a parameter when another declaration fits without conversion.** "Parameter" is in the list of places that fix a type. The core says a conversion never changes which declaration runs when one already fits. So for `f(x: RR64)` beside `f(x: Any)`, I do not know whether `f(3)` runs the first with 3.0 or the second with a `ZZ32`. The `u = 0` sentence adds to the doubt: the rule says the `NN32` declaration wins over the `=` on `Any`, and walk departs (row 973). Is row 973 special to `=`, or does walk do the same at `u + 1` and `u < 1`? Confidence: medium-high.

6. **"Declare the trait `excludes { Number }`, or make it exclude arrays, `excludes { HasRank }`" (Meet Rule paragraph).** Is either enough, or are they fixes for different cases? `HasRank` is not in the core; the gloss "exclude arrays" carries it, but not why one position is enough. The same paragraph names `+`, `-`, `MIN` and `MAX` only: a worker who declares a functional multiplication or juxtaposition in a trait cannot tell whether those are free of the problem. Confidence: medium.

7. **A program's own `+` against the self-typed paragraph.** The Meet Rule paragraph says a trait with its own functional `+` overlaps the library's array `+`. The self-typed paragraph says the library's array `+` and `-` are "valid beside `AdditiveGroup`'s own". A worker whose trait extends `AdditiveGroup[\T\]`, or is self-typed, cannot tell whether the `excludes` clause is still needed. Confidence: medium.

8. **"Both paths refuse" in the P-152 paragraph, against row 416 in the next section.** The P-152 paragraph gives a valid pair (`P[\T\]`, `Q[\T\]` with `Box[\T\]`) and says both paths refuse the untied pair. The next section says walk does not apply the exclusion rule and refuses overloads on two instantiations. So does walk load the valid P-152 pair? The text does not say. Confidence: medium.

9. **"A function over `Index` and one over a tuple of `Index` types do not exclude each other."** It reads as a warning that the pair is invalid. But such a tuple is an `Index`, so the second domain seems to lie inside the first, and the pair would be valid as more specific. The sentence should say what follows for the pair. Confidence: medium.

10. **"Until the switch-over, the compiler's prelude follows the same design (P-37)" ("Numbers").** The opening says a sentence with this opening states a limit; this one states a likeness. "The same design" is also loose against the later limits (no `QQ`, so "exactly into ... `QQ`" cannot hold there). Confidence: medium.

11. **"At a base of 0 it throws a Java exception that no `catch` sees" (P-153, compiler's library).** By position it means a base of 0 at a negative exponent, but the sentence alone reads as any power of 0. Confidence: medium.

12. **"so a compiled `7 / 2` is a static error".** `7 / 2` is an expression of numerals alone, which folds before the checker. The error then comes from the missing `QQ`, not from `/`, and `x: RR64 = 7 / 2` may well compile. The example for the limit on `/` should have a variable operand, as the fold's paragraph itself asks of tests. Confidence: medium.

13. **A numeral at a declared return type under walk.** The numeral paragraph lists a declared return type as a place that fixes a type, on both paths by implication. The coercion paragraph says walk does not convert at a declared return type (row 387), "a value other than a numeral". So does walk convert the numeral in `f(): RR64 = 3`? Confidence: medium.

14. **"plain test" (opening).** The core has tests and `XXX` expected failures, not this term. The pointer to `tests-writing.md` helps, but the rule is meant to be usable from here: "a test that is not an expected failure" would say it. Confidence: medium.

15. **`typecase N[\b0\] of N[\0\] => ...` (sizes).** `b0` is not introduced (a static parameter in scope, I assume), and the form shows a type where I expect a value to be examined. I understand the rule (a static parameter may equal a numeral), not the example. Confidence: medium.

16. **"The checker checks sizes against their kind."** It does not say what the check refuses (an `int` where a `nat` is declared? a negative `nat`?). Confidence: medium-low.

17. **The Meet Rule's name.** The orientation points to `SKILL.md`, "Fortress as a language", for it, but the core gives the condition ("a third covers their meet") without the name. A worker who searches the core for "Meet Rule" finds nothing. Confidence: medium-low.

18. **"So where the Meet Rule asks for a declaration at the meet ..., several declarations that together cover the meet serve" (`comprises`).** The "So" follows from the first two sentences of the paragraph, not from the Java sentence that stands before it. Moving the Java sentence up would mend it. Confidence: low.

19. **"A type parameter that numerals alone fix takes the narrowest default that holds them all."** Clear for `(1, 3000000000)`. For `(1, 2.5)` I do not know whether the answer is `RR64` or a refusal. Confidence: low.

20. **`array1` and `array2` at a program's own number type.** The sentence stands at the end of the paragraph on a program's coercion from numerals, where a worker who builds a vector of his own type will not look for it. Confidence: low.

21. **The function form of the four reductions.** The rule covers "every clause form". It does not say whether `SUM` applied to a generator without a clause needs the static argument under the checker. Confidence: low.

22. **`BIG MAX` over an empty generator.** "`BIG MAX` over a generator still answers `R`" does not say what an empty one gives, which is the first question after "without an identity". Confidence: low.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

1. "A float numeral converts where `RR64` is declared ("Numbers"), so `y: RR64 = 0.5` is `SEQV` a computed `RR64` 0.5." (the `=` paragraph). Nobody would expect otherwise after "a float by its bits"; it reads as the answer to one past question.
2. "`BIG MAX` over a generator still answers `R`." The "still" answers a worry that the text has not raised. Either say what the lift changes for the caller (nothing, or the empty case), or drop it.
3. "Walk still gives `Bottom` to these parameters" (P-48). The "still" is history; "Walk gives `Bottom` to these parameters" is the present rule.
4. "Until the switch-over, the compiler's prelude follows the same design (P-37)." It changes no action as it stands (see 2.10).
5. Walk's inference for the four reductions: "also where the clause form ends a block", the list of what does not direct it, and "if it is outside the reduction's bound, each `+` runs at its operands' types". The rule above it says to write the static argument in every clause form of these four, and the core already gives walk's rule in short. This detail serves only a worker who reads existing code that leaves the argument out; it could move to `interpreter.md` with one pointer. Confidence that it is surplus here: medium.
6. "The record calls this choice route A." and the glyph names "(STRICTLY EQUIVALENT TO)", "(IDENTICAL TO ...)". I would keep both: the first lets a worker read the record, the second keeps `≣` and `≡` apart. I list them only because they are the nearest other candidates.

I found no passage that tells how a rule was reached at length: the text is nearly free of history.
