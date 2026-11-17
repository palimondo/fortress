# Cold read 2 of the orientation

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and `explorations/compile-ladder/climb-batch-31b/orientation/orientation.md`. Nothing else was opened. Line numbers below are those of `orientation.md`.

## 1. What I would do differently, section by section

### Preamble (lines 1-7)

- Take a bold sentence as the rule of this tree. Cite a sentence as a curator decision only if it names a P-N. Build on an uncited sentence, but do not call it a decision.
- Do not assert, in a test without `XXX`, a behaviour from a sentence that cites a ledger row. Where the rules decide the case, write an `XXX` test that asserts the rule's answer.
- Do not fix in the compiler's prelude a limit from a sentence that opens "Until the switch-over".
- Prefer the later type papers to the specification's early text (P-26). Take `Specification/` as the specification, not `Specification-1.0-frozen/` (the Working Draft). Look in Appendix I for replaced text.
- Search FACTS and POSITIONS before calling a disagreement a conflict.
- Distrust old notes, team tests and my training on three points. The number types do not nest. Fixed-width arithmetic raises and does not wrap. Walk converts arguments.
- Limit: the preamble does not say how to read a departure that cites no row (see 2.1 and 2.6).

### Dispatch and overloading (lines 9-24)

- Overloads may differ only in their static parameters (P-45). I would judge them by declared domains, meaning all instances within the bounds. The more specific declaration's return type must fit at every instance.
- For generic overloads, read exclusion across the whole tuple. A generic type shared at one position forces its arguments equal. If the exclusion needs a static parameter that nothing ties, both paths refuse the pair (P-152). In the checker's exclusion test, a bare parameter becomes the meet of its bounds. A parameter inside a static argument does not (P-157).
- Never depend on the order of declarations under walk.
- Do not treat walk's load check as the verdict. Look the case up in `interpreter.md`, "What walk checks", before changing code to pass it or citing its acceptance.
- Functional methods whose parameter types are equivalent are duplicates, wherever `self` stands. Never declare an abstract and a concrete method with the same parameter types in one trait. If an object takes an abstract method from one trait and its body from another, declare the method again in the object (P-149).
- An abstract functional method counts in the Meet Rule.
- A program's trait that declares its own functional `+`, `-`, `MIN` or `MAX` gets `excludes { Number }`. If the trait is itself a number type below `Number`, it gets `excludes { HasRank }`. Otherwise I put the operator in an object. Without this, walk refuses the program at load. The checker's acceptance against the library's `+` (row 918) proves nothing.

### Traits and objects (lines 26-70)

- Never extend two instantiations of one generic trait, even though walk runs it. Do not copy specification examples marked "Not allowed". Do not expect walk to accept overloads on `Tg[\3\]` beside `Tg[\4\]` (row 416).
- Read `comprises` as a claim about values. Several declarations that together cover a meet satisfy the Meet Rule.
- Write `override` only on a redeclaration whose parameter types are strictly wider than the inherited ones. To redeclare at the same types, leave `override` out. Never put a Java-style `override` in the library, because it stops every program. Write no `override` in a program that must compile (row 650).
- To implement an inherited abstract method in an object, give one body at its parameter types or several bodies that cover them. If static parameters are involved, give one body (row 725). Walk does not check generic objects (row 665).
- Recognise a self-typed trait. In its bodies, `self` is `T[\X\]` met with `X`, so it needs no cast. For compiled code:
  - bind `s: X = self` before returning `self` from a closure, from a local function, or from one arm of a conditional;
  - if a trait body calls a method on an `X`, move the body into the object and leave `T`'s declaration abstract;
  - declare my own `MIN` and `MAX` in a `StandardTotalOrder` type that must run compiled.
- Write `I extends Index` on an index parameter in library code, in walk-only code, and in code checked against the interpreter's library. Leave it out of code compiled before the switch-over. Only `ZZ32` indexes. A tuple of `Index` types is an `Index`; `()` is not. Overloads over `Index` and over a tuple of `Index` types need a cover for their meet.
- Compare tuples with `<` and the like only where every element type extends `StandardPartialOrder`. Do not sort a `List[\RR64\]` in checked code.
- A type that declares no `=` gets `SEQV`. Give a value object that holds strings or other reference objects its own `=`. Compare tuples of four or more elements part by part. Write `<->`, not `EQV`/`≡`, for boolean equivalence. In a compiled test before the switch-over, `===` compares by `=` (row 908).

### Static parameters, `where` clauses and sizes (lines 72-91)

- Expect a parameter that the call leaves unfixed to take its bound, not `Nothing`. Under walk, I would write the static arguments myself wherever walk would give `OPEN` or `Bottom`. That is my inference; the section names no workaround.
- Under walk, write the static arguments of a generic call that sits inside another call's arguments (`mk[\ZZ64\]()`).
- Write only the three `where` forms that are built. At run time, never rely on a `where` condition being checked. In compiled code, avoid functions whose `where` clause introduces a variable (row 867).
- Write each size in one fixed form, because sizes do not commute. Keep size exponents at or below 4096 and never negative.
- Use `reflect` and `NatParam` only under walk, including after the switch-over.

### Numbers (lines 93-121)

- Never extend a number type. Declare a program's own number type below `Number` and give it the following:
  - a numeral coercion generic over `n, r, v`, with a `where` bound;
  - a prefix `-` if it should take negative constants;
  - `coerce(q: QQ)` if it should take quotient constants.
- Replace `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` with `ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64`, above all in `typecase` arms, where the old names take every value silently.
- Write a numeral type only as the parameter type of a coercion or an operator.
- A numeral converts at a typed place and takes its default elsewhere. After `x = 0.1`, `x` is an `RR64` for good.
- A test of run-time arithmetic or concatenation gets a variable operand. Numerals alone fold, and do not overflow.
- `/` on two integers gives a `QQ`. Use `DIV` to truncate, a float operand for a float result, and `asFloat` on each `ZZ64` operand. Under walk, `lr = 1/1000` is a `QQ`. For microGPT, write `lr: RR64 = ...` or a float numeral.
- Convert between integer types with the checked getters (`asZZ32` and the rest). `narrow`, `widen`, `signed`, `unsigned` and `big` wrap silently. A `ZZ` value has only `big`.
- In generic code over `T extends Number`, call nothing. Declare one function for each number type instead.
- Comparing numbers of different types with `=` silently gives `false` unless a coercion joins the two types. Write `asFloat(x) = y` instead.
- An integer base at a negative exponent raises. Use a float or `QQ` base.
- Before the switch-over, the compiled path has no `QQ`, has `/` only at `RR64`, has few powers and getters, and has no `TIMES` and no `isInfinite`.

### Reductions and comprehensions (lines 123-135)

- At a method's return type, a field, a top-level variable or an assignment, write the reduction's static argument (`SUM[\RR64\]`) in any program meant for both paths. A local variable's type or a function's return type directs walk. A reduction passed as an argument sums in its body's type.
- Always write both static arguments of `BIG MIN_MAX`.
- In my own reduction without an identity, type `simpleJoin` at `R`, never at `Any` and never untyped. Do not copy the team's tests.
- Under walk, an empty untyped `SUM` gives the integer 0.

### Implementation limits (lines 137-141)

- Never use a `Maybe` as an `if` condition, even though walk takes one.
- Write every parameter type. A return type may be left out where the api declares one.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

1. **Lines 49-52, walk's two refusals of a valid pair: no ledger row.** Line 7 marks unsettled behaviour by its ledger row. These two walk departures cite none, so a worker can take them as settled and assert them in a plain test, or not know which row to update. "The valid pair" also reads two ways. It could be the library's array/number `+` beside `AdditiveGroup`'s, which line 49 says walk loads. Or it could be a program's own analogous pair. The second reading must be meant, but the text does not say so. Confidence: medium-high that a row is missing; medium on the two readings.
2. **Line 74: "Every value passes `OPEN` itself" against "a type that holds `OPEN` admits only what it admits at `Bottom`".** It is unclear whether a bare parameter type `x: T`, with `T` open, "holds `OPEN`". If it does, the two sentences conflict. The `(T,T)` example settles only the tuple case. Confidence: medium.
3. **Line 32 uses "self-typed trait" before line 36 defines it.** The line also uses "reaches the method ... along two paths", which is not defined. In that case the paragraph's own instruction, redeclare without `override`, is refused (row 1037), and no other route is given. A worker who follows the rule is stuck. Confidence: high on the forward reference; medium on the missing route.
4. **Line 44: "`StandardTotalOrder`'s `MIN` and `MAX` in the interpreter's library have this shape. So declare your own ... in a type that ... must run compiled".** Until the switch-over, compiled code runs on the compiler's library (core, "How a program runs"). So it is unclear whether this applies today, or only after the switch-over and to checks against the interpreter's library. Confidence: medium.
5. **Lines 45 and 47, third shape.** The failure happens "where the object lists `T` first in its `extends` clause". That suggests reordering the `extends` clause as the fix, but the text gives a different one (move the body). A worker will try the reorder and cannot tell whether it is allowed or works. Confidence: medium-low.
6. **Line 7's "Until the switch-over" convention against line 95.** Line 95 states compiler-prelude limits: no `QQ`, and number types declared as traits (rows 1003, 866). It does not open with "Until the switch-over". Line 99 (P-37) is similar. Read literally, line 7 leaves a worker free to fix these in the prelude. Confidence: medium-low.
7. **"meet" (lines 13, 24, 30, 49) is never defined.** The core defines "join" but not "meet". A Java or Scala reader may not read it as the greatest common subtype, the intersection. Line 24 also uses "nest" for "one strictly more specific". Confidence: medium on "meet"; low on "nest".
8. **Line 24: "The checker refuses such a pair in one component, but accepts it against the library's `+` (row 918)."** "Such a pair" and "in one component" read two ways. They could mean both declarations sit in one program component, or that the checker refuses when it checks one component. Confidence: low-medium.
9. **Line 101 against line 109, on conversion at a declared return type.** Line 101 lists a declared return type among the places where a numeral converts. Line 109 says walk does not convert at a declared return type (row 387). Only "a value other than a numeral", earlier in line 109, separates the two. A quick reader concludes walk never converts at a return type. Confidence: low-medium.
10. **Line 127: "takes its bound, or the expected type where the bound does not fit."** "Does not fit" what? It could mean the bound is not a subtype of the expected type, or the expected type lies outside the bound. Confidence: medium-low.
11. **Line 135: what an empty `BIG MAX` gives.** The heading says elements are lifted to `Maybe[\R\]`, yet `simpleJoin` takes and answers `R`, and "`BIG MAX` over a generator still answers `R`". The result over an empty generator, the case a reader most wants after "lifts to `Maybe`", is never stated. "Still" also reads as history. Confidence: medium-low.
12. **Line 54: no form of the `Index` bound passes both paths before the switch-over.** "In your own generic over such a type, write `I extends Index`" sits beside "write the bound only in code that runs under walk or is checked against the interpreter's library". For a test meant for both paths before the switch-over, either form fails one of the two, and the text does not say which to drop. Confidence: medium-low.
13. **Lines 118 and 121 recommend `asFloat` with no compiled-path note.** `asFloat(s) / asFloat(n)` for `ZZ64` operands carries no "Until the switch-over" note. Line 116 lists the prelude's conversions, and `asFloat` is not among them. A microGPT worker on the compiled path cannot tell whether it exists there. Confidence: low-medium.
14. **Line 28: "The specification marks the Working Draft's examples ... 'Not allowed'".** This can be read as if the Working Draft carries the marks. They are presumably only in `Specification/`, so a worker reading `Specification-1.0-frozen/` sees no warning. Confidence: low-medium.
15. **Line 101: "`t TIMES 10.0`".** The core never gives `TIMES`. It is unclear whether `*` or juxtaposition would overflow the same way, and no route to an infinity is given for the compiled path. Confidence: low.
16. **Lines 120-121: no blank line between the `^` paragraph and the `/` rule.** Rendered Markdown merges them into one paragraph, so the bold rule no longer starts a paragraph. Confidence: high (formatting); low impact.
17. **Line 107 `MINMAX` against line 129 `BIG MIN_MAX`.** The spellings differ. It may be correct (binary operator against big operator) or a typo. Confidence: low.
18. **Line 5: two homes for the original text.** "Appendix I keeps the original text" and "the Working Draft ... in `Specification-1.0-frozen/`" give two places, and the line does not say which to cite as the team's text. Confidence: low.
19. **Terms the core does not give:**
    - "plain test" (line 7), which I read as a test without `XXX`;
    - "extenders" and "the program's main component" (line 30);
    - "count stage" (line 54; the core names it at line 80 but does not define it);
    - `CMP` and `Unordered` (line 61);
    - `HasRank` (line 24, glossed in place).

    Each can be inferred. Confidence: low.
20. **Line 97: "in that order".** It means a one-to-one correspondence, but it could be read as an order of preference. Confidence: low.
21. **Line 139: "Walk will run the checker only after the switch-over (P-12)".** It could mean a plan, that walk will start checking types, or only a statement that walk does not check today. If it is a plan, the action is missing: write well-typed programs even for walk. Confidence: low.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding (Astra's two questions)

The file holds little repair history. These passages fail both questions, or nearly:

- **Line 49, "With this reading and the bounds that the test reads ..., the library's generic `+` and `-` ... are valid beside `AdditiveGroup`'s own. Walk reads `self` in the same way, so it loads such a pair ..."** This is a design rationale for the library's validity. The two bullets after it carry the action. Medium.
- **Line 89, its last three sentences:** the 4096 limit on size powers, walk's refusal of a negative exponent, and the class loader's Java exception (row 675). They change no action beyond "keep size exponents small and non-negative", which fits in one clause. Medium-low.
- **Line 99, "The compiler's prelude follows the same design (P-37)."** No action follows from it. Low.
- **Line 139, "Walk will run the checker only after the switch-over (P-12)."** A future plan that changes no action now. Core lines 74-76 already say walk switches the checker off. Low-medium.
- **Line 95, last sentence ("route A", "still calls ... 'the tower'").** This is repair history: a design name chosen against alternatives, and lag in renaming. It passes the second question, because it decodes the record's words, so keep it as one clause. Low.
- **Departure catalogues with no action attached.** They help only when a worker meets the case, and they may belong in `interpreter.md`:
  - line 30's row 551;
  - line 74's three `Bottom` bullets (rows 591, 612, 587);
  - lines 113-114 (rows 1016, 1017);
  - line 129's three walk bullets (rows 716, 717, 436).

  Line 74 would pass the first question if it named the workaround (write the static argument). Low.
- **Repetition of the core.** Line 74's first sentences restate the core's "Static parameters" bullet (`OPEN`, `Bottom`). Line 127's walk half restates the same bullet's reduction rule. Line 24's first sentence restates the core's Meet Rule. None is history; each adds nothing for a reader who has the core. Low.
