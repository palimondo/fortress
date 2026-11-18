# Cold read of the orientation (climb-batch-33b)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and
`explorations/compile-ladder/climb-batch-33b/orientation/orientation.md`, and nothing else.
Line numbers (Lnn) are lines of `orientation.md`.

## 1. What I would do differently, section by section

### Preamble (L1-7)

- I would read each bold sentence as a rule of this tree, a sentence with a P-N as a curator
  decision that I may cite as one, and an unmarked sentence as something to build on but not
  cite as a decision. Limit: I may question a rule only on evidence that the decision did not use.
- I would treat a sentence that cites a ledger row as unsettled. For a departure (the rules
  decide the case), I would write an `XXX` test that asserts the rules' answer. For a case the
  rules do not decide, I would write a plain test of today's behaviour next to the row.
- I would not fix in the compiler's prelude any limit that opens "Until the switch-over".
- Before I called a disagreement a conflict, I would search FACTS and POSITIONS.
- I would distrust old notes, team tests and my own training on three points: the number types
  do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.
- I would read `Specification-1.0-frozen/` as the Working Draft (unrevised), and look in
  Appendix I for the original text of anything a rule changed.

### Dispatch and overloading (L9-24)

- I would allow overloads that differ only in their static parameters (P-45). I would judge
  specificity and exclusion on declared domains. The more specific overload's return type must
  fit at every instance that the argument types allow, not at just one.
- When I judge exclusion with generics (P-152), I would read the whole tuple: a shared generic
  type at one position forces equal static arguments. I would expect both paths to refuse a pair
  whose exclusion needs a parameter that those equalities leave free. For the exclusion test, a
  parameter is replaced by the meet of its bounds when it stands as a whole parameter type, a
  tuple element or a member of a union or intersection (P-157). Inside `Box[\T\]` it stays as is.
- I would never rely on the order of declarations for walk's dispatch.
- I would not take walk's load check as the verdict. Before I changed code to satisfy it, I
  would look the case up in `interpreter.md`, "What walk checks".
- I would treat functional methods with equivalent parameter types as duplicates wherever `self`
  stands. Abstract declarations count. An object that inherits an abstract method from one trait
  and its body from another must declare the method itself (P-149).
- Concrete action: if my trait declares a functional `+`, `-`, `MIN` or `MAX`, I would add
  `excludes { Number }`, or `excludes { HasRank }` if the trait extends `Number`, or I would
  move the operator into an object. Otherwise walk refuses the program at load ("fails the Meet
  Rule"), even though the checker accepts it against the library (row 918).

### Traits and objects (L26-64)

- I would not make a type extend two instantiations of one generic trait. The checker refuses
  it. Walk runs it, but walk refuses overloads on `Tg[\3\]` and `Tg[\4\]` (row 416). I would
  not copy the "Not allowed" examples.
- I would read `comprises` as a statement about values (P-60): a generic subtrait need not be
  listed, and several declarations may together cover a meet. Walk checks extenders only against
  the main component's clauses (row 551).
- `override` widens. I would write it only where the inherited parameter types are strictly
  narrower. To replace a method at the same types, I would redeclare it without `override`.
  I would never write a Java-style `override` in the library, because walk then refuses every
  program. I would not write `override` at all in a program meant to compile, because the code
  generator refuses the modifier (row 650).
- In an object, I would cover every inherited abstract method, either with one body or with
  narrower bodies that together cover it (P-147). Where static parameters are involved, I would
  give one body, because the checker refuses a cover by several (row 725). Walk does not check a
  generic object (row 665).
- In a self-typed trait, I would return `self` at `X` without a cast. In a compiled `typecase`
  that mixes `self` with another value, I would bind `self` first (`do r: X = self; r end`,
  row 1070). Before a compiled program relied on a generic object with `T` first in its
  `extends` that calls a method on an `X`, I would write a compiled test of it (row 1052).
- I would write `I extends Index` on an index parameter (P-156), but only in code that runs under
  walk or is checked against the interpreter's library. Until the switch-over, the compiler's
  prelude has no `Index`. A tuple of `Index` types is an `Index`. `()` is not an `Index`, and
  `ZZ32` is the only integer type that is one.
- I would compare pairs and triples only where every element type is a `StandardPartialOrder`,
  and lists only where `E extends StandardTotalOrder[\E\]` (P-154). Walk orders every list
  (row 774).
- Equality traps: a value object without its own `=` compares strings inside it by identity
  (SEQV), and tuples of more than three elements fall back to SEQV (row 923). I would give such
  value objects an `=`. I would write `a <-> b`, not `EQV`, for boolean equivalence (row 184).

### Static parameters, `where` clauses and sizes (L66-85)

- Under walk, I would expect an unfixed parameter to take its bound, or `OPEN` when the bound
  names the parameter itself. I would write static arguments explicitly in the three `Bottom`
  cases (rows 591, 612, 587).
- Under walk, I would write a generic inner call's static argument, as `mk[\ZZ64\]()`. Only the
  checker types an argument call from its context (P-51, row 705).
- I would use only the three `where` forms (P-151). The checker silently treats any other
  `extends ... where` as unconditional. At run time, neither path checks a conditional extension
  (row 774) or a declaration's own `where` clause. A compiled call of a function whose own clause
  introduces a variable, as `where [\nat n\]`, dies (row 867), so I would avoid it in compiled
  code.
- Sizes compare by their written form after numeral arithmetic (P-55), so `s0 s1` is not
  `s1 s0`. I would keep size exponents at or below 4096 and never negative.
- I would use `reflect` (`NatReflect.fsi`) for run-time sizes only under walk, even after the
  switch-over. A compiled call that passes a `comprises ... where [\nat n\]` trait value where a
  listed type is expected fails verification (row 307).

### Numbers (L87-116)

- I would never extend a number type. I would declare my own number type below `Number` (P-160).
  I would write `ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64` for the team's `Int`, `Long`, `Float`,
  `BigNum` and `UnsignedLong`. I would write a catch-all `typecase` arm as `x: Any =>`, and I
  would check type names in tuple arms by hand, because a misspelled name there quietly becomes a
  binder (row 1064).
- A numeral converts at a typed place: binding, assignment, field, parameter or declared return
  (P-173). Elsewhere it takes its default (`ZZ32`, then `ZZ64` or `ZZ`, or `RR64` with a point),
  and that default stays: `x = 0.1` then `q: QQ = x` is refused. I would not write a numeral type
  except as the parameter of a coercion or an operator (P-174).
- For my own number type, I would declare a generic numeral coercion with a `where` bound.
  To accept folded quotients, I would add a coercion from the default type, because coercions do
  not chain. I would not expect `array1` or `array2` to give a `Vector` at my type.
- I would expect numeral-only expressions to fold exactly (P-173): `2147483647 + 1` is a `ZZ64`,
  and `1/1000` is a `QQ` under walk. In a test of run-time arithmetic or concatenation, I would
  put the operand in a typed variable first.
- Coercion and promotion: walk picks a coercion by run-time value, and the checker picks it
  statically (P-59). Walk does not convert at a return (row 387). A generic call promotes to the
  narrowest common coercion target (P-74), but walk takes the join over tuples and varargs.
- A numeral may select a strictly more specific overload through its coercion (P-46), with the
  exceptions in rows 1016 and 1017.
- I would convert integers with the checked getters (`asZZ32` and the others), or knowingly with
  `narrow`, `widen`, `signed`, `unsigned` or `big` (P-161). I would remember that the compiler's
  prelude has only a few of these (row 349).
- I would not call `asFloat` or any operator on a bare `T extends Number` (P-165). I would write
  one overload per number type, and compare across types with `asFloat(x) = y`.
- Integer `^` stays in the base's type (P-153). For a fractional result, I would write
  `2.0^(-1)` or a `QQ` base. `/` on integers is a `QQ`: I would use `DIV` to truncate,
  `(1.0 s) / n` for a float, and `asFloat` on each `ZZ64` operand. A compiled `7 / 2` is a
  static error until the switch-over.

### Reductions and comprehensions (L118-130)

- In any program meant for both paths, I would write the static argument of `SUM`, `PROD`,
  `BIG MAX` and `BIG MIN` (as `SUM[\RR64\][...]`) at a method's return, a field, a top-level
  variable or an assignment. At those places the two paths sum in different types (row 1008).
  I would always write both arguments of `BIG MIN_MAX` (row 1007).
- Under walk, I would expect an untyped empty `SUM` to give integer 0 (row 716). A written static
  argument that is not a number type crashes an empty `SUM` (row 436).
- When I write a reduction without an identity, I would declare `simpleJoin` at its type `R`,
  never at `Any` and never untyped. I would not copy the team's tests.

### Implementation limits (L132-136)

- I would never use a `Maybe` as an `if` condition, even though walk accepts one.
- I would write every parameter type. Walk tolerates a missing one, and the checker refuses it
  ("Missing parameter type for") unless the api gives it.

## 2. Passages that could mislead, read two ways, or use terms the core does not give

1. **L7, plain test vs `XXX` test (reads two ways; high).** "do not assert it as correct in a plain
   test" is followed two sentences later by "Where they do not, a plain test asserts today's
   behaviour beside the row". Read alone, the first sentence forbids any plain test of a
   row-cited behaviour, and the third then contradicts it. Suggest: "A departure gets an `XXX`
   test of the rules' answer; an undecided case gets a plain test of today's behaviour that cites
   the row; never a plain test that asserts a departure as correct."
2. **L5/L7, unmarked sentences treated as settled (could mislead; medium).** By the preamble's
   convention, a sentence with no ledger row is a rule to build on. Yet several unmarked
   sentences describe gaps, not rules:
   - L81: "The code generator accepts a declaration's own `where` clause but emits no code for it, so the compiled runtime does not check it."
   - L85: "Such a call runs only under walk, also after the switch-over."
   - L41: "One shape fails the JVM's verification..." cites row 1070, but the sentences around it do not.

   A worker could assert the L81 behaviour in a plain test as correct.
3. **L7, "compiler's library" vs "compiler's prelude" (reads two ways; medium-low).** The
   preamble defines an "Until the switch-over" limit as a limit of the *compiler's library* and
   says "do not fix it in the compiler's prelude". The core calls the prelude "three files of its
   library". The text does not say whether a limit in a non-prelude file of the compiler's
   library may be fixed. L64, L114 and L116 say "compiler's library"; L48, L95 and L110 say
   "compiler's prelude".
4. **L101 with L97, default type of a folded radix-point result (reads two ways; medium-high).**
   "A quotient that is not whole stays `n / d` ... and defaults to a `QQ`". The same paragraph
   folds `0.1 + 0.2` exactly, and L114 recommends `2.0^(-1)` as the way to get a non-integer
   result. The text does not say whether `x = 0.1 + 0.2` or `x = 2.0^(-1)` (untyped) is a `QQ`,
   as a non-whole quotient would be, or an `RR64`, as a radix-point numeral would be. This matters
   for model-program constants such as `scale = 1.0 / 8.0`.
5. **L95, `TIMES` (term not given; medium).** `t TIMES 10.0` appears with no gloss. The core
   gives juxtaposition as multiplication but not `TIMES`. The text does not say whether `t 10.0`
   or `t * 10.0` would also give `Infinity`, or raise. "The compiler's prelude declares neither
   `TIMES` nor `isInfinite`" then leaves open how a compiled test gets an infinity.
6. **L32, `override` on a program for both paths (could leave a worker stuck; medium).** Walk
   refuses an `override` that overrides nothing, and the code generator refuses every `override`
   modifier. The text does not say whether a widening redeclaration *needs* `override` under walk.
   If it does, no program for both paths can widen an inherited method, and the text should say
   so and give the workaround. Also, "An `override` in a trait also overrides in every type below
   it" reads as either inheritance of the override (trivial) or a rule about subtypes' own
   declarations (unclear).
7. **L30, "walk checks extenders only against the clauses of the program's main component"
   (reads two ways, term not given; medium).** "Extenders" is undefined. The phrase could mean
   walk checks only `comprises` traits declared in the main component, or only types declared in
   the main component.
8. **L41, "a generic object that lists `T` first in its `extends` clause" (reads two ways;
   medium-low).** "First" suggests that other positions are covered by tests, or behave
   differently. A worker cannot tell whether the advice "write a compiled test" applies only when
   `T` is first.
9. **L112, "on both paths ... `h = 0.5` is `true` for `h: QQ = 1/2`" (could mislead; medium-low).**
   The compiler's prelude declares no `QQ` (L89), so the `QQ` half of the example holds only
   under walk.
10. **L116, compiled `/` on `ZZ32` variables (gap; low-medium).** `/` exists compiled only at
    `RR64`, and `ZZ32` coerces into `RR64` (L103, L116). So a compiled `s / n` for `ZZ32`
    variables may be accepted at `RR64`, while walk answers a `QQ`. The text names only the
    static error for `7 / 2`. A worker could write code that gives different types on the two
    paths without warning.
11. **L48, "In the library, and in your own generic over such a type, write `I extends Index`"
    (could mislead; low-medium).** The sentence is unconditional, and it is limited only two
    sentences later. A worker writing a compiled program today would hit "does not compile".
    Suggest putting the limit in the same sentence.
12. **L122, "A reduction whose bound does not name its parameter takes its bound, or the
    expected type where the bound does not fit" (reads two ways; medium-low).** "Does not fit"
    what: the expected type, or the body's type? This also differs from the preceding sentence's
    order of preference (expected type first).
13. **L124, "A call's argument has no expected type where the call is accepted without one"
    (reads two ways; medium-low).** It depends on P-51 (L74) for its meaning: the checker retypes
    an argument only if the enclosing call fails. It does not say so, and as written it reads as
    circular.
14. **L130, "`BIG MAX` over a generator still answers `R`" (incomplete; medium-low).** It does
    not say what an empty `BIG MAX` or `BIG MIN` gives on either path, which is the case the
    `Maybe` lifting exists for.
15. **L91, tuple `typecase` arm (reads two ways; low).** "no message names it undefined", and then
    "the checker refuses that arm: ... is unreachable". It is unclear why an arm that "takes any
    element" is unreachable, and what happens with a selector that is not `Any`.
16. **L101, "Except for a negated numeral, as `-3` above" (reads two ways; low).** It is unclear
    whether a whole folded constant (say `2 + 3`) reaches a program's own type through its
    numeral coercion or only through a coercion from `ZZ32`. The "default type" wording implies
    the latter, which would surprise a worker who wrote a `Byte` numeral coercion.
17. **Terms the core does not give.**
    - "meet" (L13, L24, L30): the core uses it without definition; the file defines "join" through the core, but never "meet". (low-medium)
    - "count stage" (L48): the core names it, but defines it nowhere. (medium)
    - "Appendix I" (L5): named in the core's parts list, but not explained. (low)
    - "self-typed" (L32): used before its definition at L36. (low)
    - "dotted" method (L15, L81): the core uses the word without a gloss. (low)
    - `0#n` range syntax (L120 and later): the core sends ranges to `library.md`. (low)
    - `BIG //` (L130): unglossed. (low)
    - `__bigOperator` and "body param 1" (L122): fine as a message to recognise. (low)
    - `StandardPartialOrder`, `StandardTotalOrder`, `AssociativeReduction`, `simpleJoin` and `HasRank`: library names given only in passing, which is probably enough.
    - "Working Draft", "declared domain", "Meet Rule", `OPEN`, "clause form", "plain test", "route A" and "promotion" are defined in the file: no issue.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

Each passage is tested against Astra's two questions: does it change an action, and does it
prevent a misunderstanding?

1. **L41, "A compiled body of `T` that returns `self` at `X` runs, also from an arm of a
   conditional or a `case` expression, a function expression or a local function."** This reads
   as a list of shapes that were repaired. A worker would write these shapes anyway. The only
   actionable part is the `typecase` exception that follows. (medium-high)
2. **L43, "With this reading ..., the library's generic `+` and `-` between an array and a number
   are valid beside `AdditiveGroup`'s own. Walk reads `self` in the same way, so it loads such a
   pair in the library and in a program's own component."** This justifies the library to
   itself. Only the two bullets of row 999 change what a worker does. (medium)
3. **L64, "A float numeral converts where `RR64` is declared ..., so `y: RR64 = 0.5` is `SEQV` a
   computed `RR64` 0.5."** No action follows from it. It reassures about a case nobody would
   doubt once "a float by its bits" (L60) is read. (medium-low)
4. **L64, the compiler's `===` detail (row 908).** This is a pre-switch-over prelude behaviour
   that matters only to someone who writes a compiled `===` test before the switch-over. It
   borders on no-action. (low)
5. **L34, "Walk and the checker stop the search for a cover at the same limits, which
   `interpreter.md` ... gives."** This is a pointer with no rule in it. (low)
6. **L134, "Walk will run the checker only after the switch-over (P-12)."** This is future state.
   It changes nothing a worker does now. (low-medium)
7. **L89, "Walk refuses it at load: 'Attempt to extend object type ZZ32'. The compiled checker
   refuses it: 'Invalid type in extends clause: ZZ32'."** This one should stay: the messages let
   a worker recognise the refusal. It is borderline only. The same goes for L95's 'Type mismatch
   binding' and 'got arg'.
8. **L91, the compiled message for the tuple arm ("... is unreachable") with an `Any`
   selector.** This is detail beyond the one action, which is to spell type names correctly in
   tuple arms. (low-medium)
9. **Duplication of the core (no action beyond what the core gives).**
   - L68's opening repeats the core's "A type parameter that a call does not fix takes its bound... stays open".
   - L122's walk instantiation rule repeats the core's "Walk instantiates a reduction or a comprehension... at the type declared for its value".
   - L134 "Walk has no static types" repeats the core.

   Each could keep only what it adds: the excluded places, `OPEN`, and the `Maybe` condition.
   (medium)
