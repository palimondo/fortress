# Cold read 2 of the orientation

What I read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and `explorations/compile-ladder/climb-batch-29b/orientation/orientation.md`. Nothing else. Line numbers (L) refer to `orientation.md`.

## 1. What I would do differently, section by section

### Opening (L3-7)

- I would read each sentence by its tag. Bold means the rule of this tree. A P-N means a curator decision, which I would cite from POSITIONS. A row number means a departure of one path, which I would not assert as correct in a test. A sentence that opens "Until the switch-over" means a limit of the compiler's library, which I would not fix in the compiler's prelude.
- Before I called two sources a conflict, I would look here, then in FACTS and POSITIONS.
- On three points I would distrust team tests, old notes and my own training: the number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.
- Limits: the scheme does not cover a sentence about walk, the checker or the code generator that has no tag (item 2.A). It also does not say what to cite when I build on an untagged sentence (item 2.B).

### Dispatch and overloading (L9-24)

- I would accept two overloads that differ only in the bounds of their static parameters. I would require the more specific one's return type to be a subtype of the other's at every instance.
- I would test whether two declarations exclude each other over the whole tuple of parameter types. I would refuse a pair in which a static parameter is left free (`o[\T,U\]`).
- Under walk I would never rely on the order of declarations.
- I would not change code only to pass walk's load check. First I would find the case in `interpreter.md`, "What walk checks".
- I would not declare `f(self, y: S)` beside `f(x: S, self)`, nor an abstract and a concrete method with the same parameter types in one trait. In an object that takes an abstract method from one trait and its body from another, I would declare the method again in the object.
- Whenever a program's trait declares a functional `+`, `-`, `MIN` or `MAX`, I would add `excludes { Number }` or `excludes { HasRank }`, or move the operator into an object. I would expect the checker to miss this case (row 918) and walk to catch it.
- Limits: the section does not say whether a self-typed trait needs this fix (item 2.C). It does not say whether other operators that the library declares between an array and a number need it. It does not say what walk does with the P-157 bound substitution.

### Traits and objects (L26-62)

- No type of mine would extend two instantiations of one generic trait. Under walk I would not overload on two instantiations (row 416).
- I would read `comprises` as covering values, not as a list of direct subtypes. Under walk, the clauses of library traits are not checked against my program's extenders (row 551).
- I would write `override` only when the new declaration widens the inherited parameter types. To redefine a method at the same types, I would declare it again without `override`. In code that must compile, I would write no `override` at all (row 650).
- An object may cover an inherited abstract method with several narrower bodies. Where static parameters are involved I would use one body (row 725).
- In a self-typed trait I would use `self` as `X` without a cast. I would not return `self` from a body that will be compiled (row 695).
- `Index`: I would index with `ZZ32` values, and read `m[i, j]` as a single tuple index. I would not overload `f(x: Index)` against a tuple of `Index` types without a declaration that covers their meet. I would write `I extends Index` only in code that runs under walk or is checked against the interpreter's library (item 2.F).
- Order: pairs and triples are ordered only when every element type is a `StandardPartialOrder`. In the checker, a list is ordered only when its element type is a `StandardTotalOrder`, so a `List[\RR64\]` cannot be sorted there.
- Equality: where a type declares no `=`, `=` means `SEQV`. I would give an `=` to every value object that holds strings or other reference objects. For boolean equivalence I would write `<->`, never `EQV`. I would not expect `=` on tuples longer than three to compare their contents.

### Static parameters, `where` clauses and sizes (L64-83)

- A static parameter that a call does not fix takes its bound, not `Nothing`. Under walk, a parameter whose bound names itself is `OPEN`. In code that runs under walk I would write static arguments explicitly, as `mk[\ZZ64\]()`.
- I would use only the three `where` forms that are built. The checker gives no message for any other form. The compiled runtime enforces no `where` clause, so I would not count on one. In compiled code I would avoid a `where` clause that introduces a variable, as `where [\nat n\]` does (row 867).
- Sizes are compared by their written form, so I would write each size in one fixed form throughout: `s0 s1` everywhere, never `s1 s0` in some places.
- I would not use `NatReflect` in compiled code, before or after the switch-over.

### Numbers (L85-103)

- I would declare the type at any place where a numeral's precision matters, as in `q: QQ = 0.1`. I would remember that `x = 0.1; q: QQ = x` is refused.
- In compiled code I would write `3.0`, not `3`, at `RR64` (row 442).
- I would never use a numeral type as the type of a variable, a field or a return value. My own number type would take numerals through a coercion that is generic over the numeral's numbers. For folded quotients I would add `coerce(q: QQ)`, and for negative constants a prefix `-`. I would not put side effects in such a coercion, because it runs once for each place where the numeral is written.
- When a test exercises run-time arithmetic or concatenation, I would give it a variable operand, since an expression of numerals alone folds before the checker.
- To convert between integer types I would use `asZZ32` and its siblings, which are checked. `narrow` and the other low-bits functions wrap silently. For a `ZZ` value I would write `z.asZZ32`.
- I would not write arithmetic in code generic over `T extends Number`. Instead I would declare the function once for each number type.
- To compare a typed value with a numeral, I would bind the numeral at the value's type first.
- For a power with a negative exponent I would use a float base or a `QQ` base.
- `/` on two integers gives a `QQ`. I would truncate with `DIV`, write `1.0 s` to get a float, and convert each `ZZ64` operand with `asFloat`.

### Reductions and comprehensions (L105-115)

- I would write the static argument in every clause form of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` (row 731).
- For other reductions under walk, I would direct the type through a local variable's declared type or a function's return type, never through a method's return type or a field.
- In a reduction of my own, I would declare `simpleJoin` with type `R`, not with `Any` and not untyped. I would not copy the team's tests here.

### Implementation limits (L117-121)

- I would never write a `Maybe` as the condition of an `if`.
- I would write the type of every parameter, including the parameters of local functions.
- Limit: the section gives no rule for return types (item 2.V).

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

Confidence is the probability that a worker would really be misled.

- **A. Untagged statements about a path (L7 against L15, L48, L79, L81, L91). 0.7.** L7 sorts sentences by tag: P-N, row, or "Until the switch-over". Several sentences describe one path's behaviour and carry none of these tags:
  - "Walk runs the code without the bound" (L48);
  - "The code generator accepts a declaration's own `where` clause but emits no code for it" (L79);
  - "Walk refuses a negative exponent" (L81);
  - "The checker does not refuse it yet (`compiler_tests/XXX...`)" (L91);
  - "fails with 'Cannot unify'" (L15).

  Under the L5 rule ("Build on a sentence without one"), a worker would treat these as rules and could assert in a test something that is plainly a departure, such as the missing `where` check. Each needs a row, or a word saying whether it conforms to the rule or departs from it.
- **B. What to cite for an untagged sentence (L5). 0.55.** L5 says to build on a sentence without a P-N but not to cite it as a decision. The core's citation rule ("Rules for every task") accepts only the brief, an entry of the record, or a primary source, and the orientation is none of these. The worker is left with a claim that it is allowed to use but not allowed to cite.
- **C. A program trait's own `+` (L24 against L43). 0.6.**
  - L24, without qualification: a program's trait that declares its own functional `+` overlaps the library's `+` between an array and a number, and walk refuses it at load unless the trait excludes `Number` or `HasRank`.
  - L43: walk "loads such a pair in the library and in a program's own component" when the trait is self-typed.

  A worker who models a trait on `AdditiveGroup` gets two answers. L24 should say whether it applies to self-typed traits.
- **D. "An abstract functional method also counts for it" (L24). 0.4.** The sentence can mean that the abstract method counts as one of the two overloads that need a cover, or that it counts as the covering declaration. The `h` example supports only the first reading, and the second reading is left open.
- **E. The `floor(self): I = self` example (L41). 0.45.** The example is called "valid without a cast". Two sentences later, a compiled body that returns `self` fails the JVM's verification (row 695). A worker who copies the example into compiled code meets that row. The warning belongs next to the example.
- **F. `I extends Index` in code for both paths (L48). 0.6.** "In your own generic over such a type, write `I extends Index`" conflicts with "a program that names it does not compile: write the bound only in code that runs under walk or is checked against the interpreter's library." The model programs must compile now and also run under walk, so a worker does not know which instruction governs them. A generic without the bound is also refused when it is checked against the interpreter's library, as the count stage does. Before the switch-over, no form satisfies both paths, and the passage does not say which one to choose.
- **G. The `OPEN` example (L66). 0.5.** `pick(x: (T,T))` does not show `T`'s bound. Only a bound that names `T` itself makes `T` `OPEN`. If a reader takes `T` as unbounded, the core says it takes `Any`, and then the claim that it "takes no `(1, 2)`" looks wrong. The bound should be written in the example.
- **H. "A numeral type has no getters, no `asFloat`, no `asString`" (L89). 0.5.** This can mean that `asFloat(3)` and `3.asString` are refused. It can also mean that the numeral takes its default (`ZZ32`) first, by the "Elsewhere the numeral takes its default" rule a few sentences later, and the call then works. The passage does not say which reading holds.
- **I. A radix-point numeral at an integer type (L89). 0.4.** "Converts from its exact value: exactly into the five integer types" does not say whether `i: ZZ32 = 3.0` binds, nor whether `i: ZZ32 = 2.5` is refused, rounded or truncated.
- **J. `-3` at a program's own type (L91 against L93). 0.6.**
  - L91: a negative constant reaches the type as the type's prefix `-` applied to the coercion's result for `3`.
  - L93: an expression of numerals alone, which includes the arithmetic operators, folds into one constant before the checker. A program's own type takes such a constant only through a coercion from the constant's default type.

  If `-3` folds, it becomes a `ZZ32` constant that needs `coerce(ZZ32)`, not a prefix `-` on the coercion for `3`. In the same way, L93 does not say whether a folded whole constant such as `2 + 3` reaches an own type's numeral coercion or needs a coercion from `ZZ32` ("converts as a numeral does at a library number type" names library types only).
- **K. The default type of a folded constant made from radix-point numerals (L93, L101). 0.6.**
  - "A quotient that is not whole stays `n / d` ... and defaults to a `QQ`" suggests that `x = 0.1 + 0.2` is a `QQ`, while `x = 0.3` is an `RR64`.
  - L101 recommends `2.0^(-1)` "for a result that is not an integer". By L93, that expression is made of numerals alone and its base is not an integer, so it folds to `1/2`, which by this rule is a `QQ`.

  The passages do not say whether a radix point in the operands keeps the `RR64` default. This matters for the model program's constants.
- **L. A folded quotient on the compiled path (L93, L89, L103). 0.55.** Take `lr: RR64 = 1/1000`. It folds into the constant `1/1000`, which "converts as a numeral does" at `RR64`. Before the switch-over, the compiler's `RR64` takes only a radix-point numeral (row 442) and the compiler has no `QQ`. L93's "under walk `lr = 1/1000` is a `QQ`" hints that the compiled path behaves differently, but the passage never says whether the line compiles. The same question applies to `(1.0 s) / n`, since the compiled `/` is declared only at `RR64`.
- **M. The rule's verdict on `u = 0` (L99). 0.5.**
  - Under walk the answer is `false` (row 973).
  - Before the switch-over, the compiled answer is `true`.
  - "No `=` ties a numeral type to a number type" (P-174).

  L7 says that a row marks a departure from a bold rule, but here the rule's own answer is not given: `true`, `false`, or a static error. So a worker cannot tell what a fix of row 973 should produce. The practical advice (bind the numeral first) is clear.
- **N. Limits of the compiler's library that do not open with "Until the switch-over" (L62, L101). 0.4.** Two sentences describe limits of the compiler's library but lack the phrase that L7 uses to forbid a fix in the prelude:
  - L62: "Its own `≣`, declared as `===`, compares ... (row 908)";
  - L101: "At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523)".

  Read by L7, each is only a row departure, so a worker might fix it in the prelude.
- **O. Where a reduction's static argument must be written (L109). 0.4.** "Write it in every clause form" leaves out the forms without generators, such as `SUM v` over an array, and the passage does not say whether they need it. "Other reductions take their bound, or the expected type where the bound does not fit" reads oddly: it is not clear what fails to fit what.
- **P. An empty `BIG MAX` (L115). 0.35.** "`BIG MAX` over a generator still answers `R`" does not say what an empty generator gives: an error, or something else. A worker with Haskell habits may expect an identity value.
- **Q. P-152 under walk (L13 against L28). 0.35.** L13 says "Both paths refuse" the pair with a free parameter, which implies that walk loads the valid `o` pair. L28 says that walk does not apply the exclusion rule and does not read two instantiations as excluding (row 416). The two passages leave unclear whether walk loads the valid pair.
- **R. What `override` does (L32). 0.45.**
  - The rule says where an `override` overrides, but not what happens there. Presumably the wider body replaces the narrower inherited one for narrower arguments as well. Under dispatch to the most specific declaration, a worker cannot predict which body runs.
  - The passage never concludes what follows from rows 650 and 653 together with walk's refusal: in practice a worker should write no `override` at all in code that must compile.
- **S. "As `Integral[\I\]` below `AnyIntegral`" (L30). 0.35.** The example does not say which trait declares the clause, nor what the clause lists. A reader cannot check the example against the rule.
- **T. `nat` parameters as values (L89 against L91). 0.35.** L89 makes a size parameter used as a value a `ZZ32`. L91 makes a numeral coercion's `nat n, r, v` values of type `ZZ`. The scope of the exception is unclear: does it apply only in a coercion whose parameter is a numeral type, or also in an operator with such a parameter? L91 allows both.
- **U. Terms the core does not give. 0.3 each.**
  - "row N": the core says that the gap ledger holds one row for each gap. It does not say that rows are numbered, nor that "row 780" is an ID rather than a line number.
  - "the count stage" (L48): the core mentions it once, in passing.
  - `StandardPartialOrder` and `StandardTotalOrder` (L53): the passage does not say whether `RR64` is a `StandardPartialOrder`, so it is unclear whether pairs of floats are ordered.
  - "The compiler's library" and "the compiler's prelude" are used interchangeably. In the core, the prelude is only three files of that library.
  - `array1` and `array2` (L91) are not explained.
- **V. Return types (L121). 0.3.** The section says that an omitted return type is taken from the api, or that the checker types the body. It gives no rule for writing return types, and does not say what walk does. This matters because L109 makes walk's reductions depend on a function's declared return type.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

The orientation holds almost no repair history. These passages fail both of Astra's questions, or come close to it:

- L81: "The checker refuses a size power above the exponent 4096, except of 0, 1 or -1 ... The class loader computes a size without checking its kind, and stops on a negative exponent with a Java exception (row 675)." These are corner limits. A worker who meets one sees the message, and the sentences change no action before that.
- L34: "Walk stops its search for a cover at limits that `interpreter.md` gives, and the checker at the same limits." This is a pointer, and it changes no action unless the limit is hit.
- L99: "A program may also declare its own number type below `Number` (P-160)." Nothing in that paragraph depends on it, and L24 already uses P-160.
- L119: "Walk will run the checker only after the switch-over (P-12)." This is a future plan that changes nothing now. The rest of the paragraph stands without it.
- L115: "lifts its elements to `Maybe[\R\]` inside the reduction" and "`BIG MAX` over a generator still answers `R`". This is mechanism that matters only to someone writing a reduction, and even then it gives no action. The `simpleJoin` rule after it does give one.
- L109: walk's inference chain, from "Else walk takes the join..." to "body param 1". For `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, the rule just before it already says to write the static argument, so the chain changes nothing there. It still helps to read a "body param 1" failure, and it governs other reductions. I would keep the error message and cut the rest.
- L11 "The Working Draft forbids such pairs." and L48 "The Working Draft lets no trait type hold a tuple, but here...". This is history of the specification. L5 already says that Appendix I keeps the original text. These sentences help only a worker who reads the Working Draft, so they are borderline.
- L87: "The record still calls the number and order traits 'the tower'." This is history of a name, but it prevents misreading the record, so I would keep it.
