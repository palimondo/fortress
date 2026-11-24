# Cold read of the orientation (climb-batch-36)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and
`explorations/compile-ladder/climb-batch-36/orientation/orientation.md`. Nothing
else was opened. Line numbers below are those of `orientation.md`.

## 1. What I would do differently, section by section

### Preamble (lines 1-7)

- Read each bold sentence as the rule of this tree; a sentence with a P-N as a
  curator decision; a sentence with a row or an F-N as unsettled behaviour.
- For a row case that the rules decide, write an `XXX` test that asserts the
  rule's answer. For one they do not decide, write a plain test of today's
  behaviour and cite the row (or the F-N).
- Leave every limit that opens "Until the switch-over" alone in the compiler's
  prelude; it ends when the compiled path moves to the interpreter's library.
- Search FACTS and POSITIONS before calling a disagreement a conflict.
- Distrust old notes, team tests and my own training on three points: the
  number types do not nest, fixed-width arithmetic does not wrap, walk
  converts arguments.
- Limits: when sources disagree, the later type papers usually beat the early
  specification text (P-26). The original specification text sits in
  `Specification-1.0-frozen/` (the Working Draft) and in Appendix I.

### Dispatch and overloading (lines 9-24)

- I may overload on static-parameter bounds alone
  (`ident[\T extends Shape\]` beside `ident[\T extends Round\]`), judged on
  declared domains. The more specific overload's return type must fit the
  other's at every instance the arguments allow, not just one (P-45).
- For generic overloads that rely on exclusion, I would tie the static
  parameters through a shared generic type at some position (`Box[\T\]` in
  both). If the exclusion needs a parameter that nothing ties, both paths
  refuse the pair (P-152). In the exclusion test the checker replaces a bare
  parameter by the meet of its bounds, but not one inside a static argument
  (P-157).
- I would never rely on declaration order under walk. I would not take walk's
  load check as a verdict in either direction; I would look the case up in
  `interpreter.md`, "What walk checks".
- I would not declare `f(self, y: S)` beside `f(x: S, self)`. I would not put
  an abstract and a concrete method with the same parameter types in one
  trait. When an object inherits an abstract functional method from one trait
  and its body from another, I would redeclare the method in the object
  (P-149), unlike Scala.
- For a program trait with its own functional `+`, `-`, `MIN` or `MAX` I would
  add `excludes { Number }` (or `excludes { HasRank }` if the trait extends
  `Number`), or declare the operator in an object. Otherwise walk refuses the
  program at load, and the checker does not warn me (row 918).

### Traits and objects (lines 26-64)

- I would never let a type extend two instantiations of one generic trait. Only
  the checker catches it. Under walk, overloads on `Tg[\3\]` and `Tg[\4\]` are
  refused (row 416). I would not copy spec examples marked "Not allowed".
- A `comprises` list need not name every subtype; several declarations can
  cover a meet together (P-60).
- I would use `override` only to widen. To replace an inherited method at the
  same parameter types, I would redeclare it without `override`. A Java-style
  `override` is an error on both paths, and in the library it stops every
  walk program.
- I would cover each inherited abstract method in an object with one body or
  several narrower ones (P-147). Walk does not check generic objects
  (row 665). The checker refuses a cover by several bodies when static
  parameters take part (row 725).
- Self-typed traits: in a body, `self` is `T[\X\]` ∩ `X`, so no cast is needed.
  For a `typecase` that returns `self` in one arm, I would bind
  `do r: X = self; r end` (row 1070). I would write a compiled test before
  relying on a call of an `X` method in a generic object that lists `T`
  first (row 1052). Where an object redeclares an abstract dotted method of
  `T`, I would keep `T`'s return type, or use getters for a method without
  parameters (row 1094).
- `Index`: in the library and in code checked against the one library I would
  write `I extends Index`. I would remember that only `ZZ32` is an `Index`,
  that a tuple of `Index` types is one, that `()` is not, and that the
  compiler's prelude has no `Index` yet.
- Ordering: I would compare tuples only when every element is a
  `StandardPartialOrder`. Under walk I would not mix numeric types at one
  position (row 511). I would not expect a `List[\RR64\]` to be ordered in the
  checker (P-154).
- Equality: where a type has no `=`, `=` is `SEQV` (P-168). So I would give
  every value object that holds strings or other reference objects its own
  `=`. I would not rely on `=` for tuples longer than three (row 923). I would
  not confuse `≣`/`SEQV`/`===` with `≡`/`EQV`, which is defined on booleans
  only.

### Static parameters, `where` clauses and sizes (lines 66-85)

- A static parameter that a call does not fix takes its bound, not `Nothing`
  (P-48). Under walk it can be `OPEN` or `Bottom` in the three listed cases.
- Under walk I would write the static arguments of a generic call that is
  itself an argument (`mk[\ZZ64\]()`), since walk gives it no expected type
  (P-51, row 705).
- I would use only the three `where` forms (P-151). The checker silently
  treats any other `where` on an `extends` entry as unconditional. I would not
  count on any `where` being checked at run time, and I would keep calls that
  introduce `where [\nat n\]` out of compiled code (row 867).
- I would write sizes in one fixed order: `s0 s1` is not `s1 s0` (P-55).
  Size exponents stay at or below 4096 and are never negative.
- I would keep `NatReflect.reflect` out of compiled programs (row 307).

### Numbers (lines 87-116)

- I would never extend a number type; a program's own number type goes below
  `Number` (P-160). I would replace `Int`/`Long`/`Float`/`BigNum`/
  `UnsignedLong` with `ZZ32`/`ZZ64`/`RR64`/`ZZ`/`NN64`, and write a catch-all
  arm as `x: Any =>`.
- I would type a binding that should not get a numeral's default
  (`q: QQ = 0.1`, not `x = 0.1` then `q: QQ = x`). A numeral at `Any`,
  `Object`, `Number`, `Index` or an unbounded parameter takes its default.
- I would declare a program number type's numeral coercion generic over
  `NaturalNumeral[\n, r, v\]` with a `where` bound. I would add a `QQ`
  coercion if it should take folded quotients (P-174).
- In tests of run-time arithmetic or `||`, I would give one operand as a
  typed variable so that folding does not decide the result (P-173).
- Under walk I would not rely on conversion at a declared return type
  (row 387) or on arrow-type conversion of a function argument (row 1083).
- To convert between integer types I would use the `asZZ32`-style getters
  (they raise) or the low-bits functions (they wrap) (P-161). In the one
  library I would write `asFloat(x)`, not `x.asRR64` (F-324). I would write no
  arithmetic on a `T extends Number`.
- I would use `DIV` for integer division, `(1.0 s) / n` for a float quotient,
  and a float or `QQ` base for negative powers. A compiled `7 / 2` is a static
  error until the switch-over.

### Reductions and comprehensions (lines 118-130)

- I would write the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`
  whenever the value lands at a method's return type, a field, a top-level
  variable or an assignment (row 1008). I would always write both arguments of
  `BIG MIN_MAX` (row 1007).
- For a reduction without an identity I would extend
  `AssociativeReduction[\R\]` and declare `simpleJoin` at `R`, not at `Any` or
  untyped as the team's tests do.

### Implementation limits (lines 132-136)

- I would never use a `Maybe` as an `if` condition.
- I would write every parameter type, even where walk tolerates a missing one.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

Confidence is my estimate that a worker would be misled or confused.

1. **Line 57 vs line 64: "`SEQV` follows the specification on both paths"**
   (confidence 0.7). Line 64 then says that the compiler's `≣` compares
   strings and the four fixed-width/float types by `=` (row 908), so a string
   equals an equal string compiled, and `0.0`/`-0.0`/NaN behave differently.
   The compiler's library also has no `=` over `Any`. So line 64's
   "`V(s) = V(t)` is `false`" does not hold on the compiled path today. A
   worker writing a both-path equality test from the bullet list would assert
   wrongly. The bullets need "under the one library", or the row cited at
   line 57.

2. **Bold rules stated as a difference between paths, then a row on one side**
   (confidence 0.7). Line 74 says "**Only the checker gives … context (P-51)**"
   and then "(row 705)". Line 122 says "**the two paths fix an unwritten static
   argument from different places**" and line 124 cites row 1008. The preamble
   says a bold rule is the rule of the tree and a row marks a departure. Here
   the bold rule describes the departure itself, so a worker cannot tell
   whether to write an `XXX` test (the checker's answer is the rule) or a plain
   test of each path.

3. **Line 48: "in your own generic … that runs under walk or is checked against
   the interpreter's library, write `I extends Index`"** (confidence 0.6). The
   next sentences say that walk runs the code without the bound and that the
   compiler's prelude has no `Index`. A worker writing a test for both paths
   would add the bound because "runs under walk", and the compiled half would
   then fail. The bound is needed only where the code is checked against the
   one library. The passage does not say what a both-path program writes
   before the switch-over (presumably no bound).

4. **Line 5/7: what to cite for a bold rule without a P-N** (confidence 0.5).
   The preamble says "Build on a sentence without one, but do not cite it as a
   decision". The core's citable sources are the brief, a record entry or a
   primary source, and the skill is none of them. Many rules carry neither a
   P-N nor a row (`override` widens, `/` gives `QQ`, tuple ordering, "Write
   every parameter type"). A worker does not know whether to cite the
   orientation, reproduce the behaviour, or look up a FACTS entry.

5. **Line 91: a tuple arm with an undefined name** (confidence 0.55). It reads
   as a binder "on both paths" that "takes any element". Yet "Compiled, with an
   `Any` selector, the checker refuses that arm: … unreachable." The two
   statements seem to contradict each other. It is unclear whether row 1064's
   departure (binder reading) holds in the checker at all, and why the arm is
   unreachable.

6. **Line 64: row 923** (confidence 0.5). The sentence is "`(s, 1, 2, 3) =
   (t, 1, 2, 3)` falls back to `SEQV` and is `false` (row 923)". By the bold
   rule (no `=` declared → `SEQV`), `false` is the rule's answer, so it is
   unclear what departs. Is the missing `=` on 4-tuples the departure? A
   worker cannot tell whether to assert `true` in an `XXX` test or `false` in a
   plain test.

7. **Line 17: "at an extending object's first instance (row 780)"**
   (confidence 0.5). "First instance" is undefined. It could be the first
   instantiation of a generic object, the first object constructed, or the
   first `extends` entry. "One inside the other" presumably means one domain
   inside the other.

8. **Line 122: "A reduction whose bound does not name its parameter takes its
   bound, or the expected type where the bound does not fit."**
   (confidence 0.45). "Fit" has no stated object. It could mean the bound
   does not fit the expected type or the body's type, or that the reduction
   cannot be instantiated at its bound.

9. **"Until the switch-over" marker missing or inconsistent** (confidence 0.4).
   Line 89, "The compiler's prelude declares no `QQ`", is a limit of the
   compiler's library but lacks the marker. Read by the preamble's rule, it is
   neither protected from a prelude fix nor clearly temporary. Lines 7, 64 and
   114 say "compiler's library" while the preamble's prohibition names the
   "compiler's prelude". The core says the prelude is three files of that
   library, so a worker may wonder whether a limit in a non-prelude file of
   the compiler's library may be fixed.

10. **Line 68: `OPEN`** (confidence 0.4). "Every value passes `OPEN` itself"
    is followed by "a type that holds `OPEN` admits only what it admits at
    `Bottom`". The difference between the whole type and a type that holds
    `OPEN` is easy to miss. The rule's own answer for `pick((1, 2))` is not
    given, so row 663 cannot become an `XXX` test.

11. **Line 30: "as `Integral[\I\]` below `AnyIntegral`"** (confidence 0.4). The
    example does not say which trait declares the `comprises` clause or what
    it lists, so the reader cannot check the claim it illustrates.

12. **Line 38: "a `comprises` clause … that lists only `...`"**
    (confidence 0.4). `comprises { ... }` is not given by the core, and its
    meaning (a hidden list in an api?) is not explained.

13. **Rows whose rule answer is not stated** (confidence 0.35). A worker needs
    the rule's answer to write the `XXX` test the preamble asks for. It is not
    given for:
    - line 55, row 511, `(1,2) < (1,2.5)`: true by promotion?
    - line 97, row 962, nat parameter ≥ 2^31: is walk's `ZZ64` the departure,
      or the compiled error, or both?
    - line 126, row 716, empty `SUM` without a declared type;
    - line 136, row 405: what walk does in "a method that implements an
      abstract one".

14. **Line 41: row 1052** (confidence 0.35). "No test covers such a body" is a
    coverage gap. It is neither a departure nor an undecided case, the two
    meanings the preamble gives a row. "Lists `T` first" implies that the
    order of `extends` entries matters on the compiled path, and nowhere else
    is this said.

15. **Line 85: "Such a call runs only under walk, also after the switch-over"**
    (confidence 0.35). This is a permanent claim, but the reason given is
    row 307, a departure that "can change" by the preamble's own terms.

16. **Line 15: "Otherwise it compares the instances that the call makes"**
    (confidence 0.35). It is vague: instances of which declarations, compared
    by what?

17. **Line 81 ("emits no code for it, so the compiled runtime does not check
    it") and line 134 (walk accepts a `Maybe` condition)** (confidence 0.3).
    Both describe a gap from the rule but cite no row. By the preamble they
    would be settled behaviour.

18. **Line 99: coercion timing** (confidence 0.3). "the compiled path when the
    class loads, before `run()`" leaves out the consequence. A coercion that
    raises (or prints) would do so before the program starts, outside any
    `try` in the program. If that is the point, it should say so.

19. **Line 110: "`big` … keep[s] the low bits"** (confidence 0.3). For an
    `NN64` with its top bit set, it is unclear whether `big` gives the
    unsigned value or a negative `ZZ`.

20. **Line 32: "a generic self-typed trait"** (confidence 0.3). It is used
    before "self-typed" is defined at line 36.

21. **Line 19: "So the checker refuses …"** (confidence 0.3). The duplicate
    case where `self` stands at different positions names only the checker,
    while the two bullets below say "both paths". It is unclear whether walk
    refuses the first case.

22. **Terms not given by the core** (confidence 0.25-0.3 each):
    - "nest" (line 24, for "one strictly more specific");
    - "meet" of bounds (line 13);
    - "extenders" (line 30);
    - `0#n` range syntax (line 120);
    - "the wrapping, saturating and bitwise operators" (line 101). The
      preamble promises "fixed-width arithmetic does not wrap", but no
      section names the wrapping operators;
    - `Unordered` (line 55);
    - "Appendix I keeps the original text" (line 5): of which document,
      `Specification/` or the frozen draft?
    - the references are cited without their `references/` prefix
      (`compiler.md`, `interpreter.md`). This is minor.

23. **Placement** (confidence 0.2). Tuple ordering and `SEQV` (lines 55-64)
    sit under "Traits and objects". A worker looking for equality or ordering
    would look under "Numbers" or for a section of their own.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

1. **Line 41: "runs, also from an arm of a conditional or a `case`
   expression, a function expression or a local function."** This reads as a
   list of shapes that were fixed one by one. The action needs only the one
   failing shape, the `typecase` (row 1070). Medium.
2. **Line 43: "With the reading of the exclusion test and the bounds that the
   test reads …, the library's generic `+` and `-` between an array and a
   number are valid beside `AdditiveGroup`'s own."** This justifies why the
   library passes. A worker takes no action on it, unless the point is "do
   not 'fix' this pair", which the sentence does not say. Low-medium.
3. **Line 17: the row 780 example.** The action is to look the case up in
   `interpreter.md`, and the example adds nothing to that. It is also unclear
   (item 2.7). Low-medium.
4. **Line 134: "Walk will run the checker only after the switch-over
   (P-12)."** This is a future plan. "Walk has no static types" repeats the
   core ("The tree has no static types"). The section's actionable content is
   the `Maybe` condition. Low-medium.
5. **Line 15: "It infers a dotted generic method's static arguments from the
   arguments' run-time types, as for a generic function."** This reads like
   the announcement of a fix. No action follows unless a worker expected
   otherwise. Low.
6. **Line 43: "There the intersection is the object's own type, so the two
   declarations have one domain"**. This explains the mechanism of row 1094.
   The action ("Declare the object's method at `T`'s return type") stands
   without it. Low; it may help a worker who fixes row 1094.
7. **Line 99: "walk computes it at the place's first run, the compiled path
   when the class loads, before `run()`"**. This is implementation detail with
   no stated action (see item 2.18). Keep it only if the consequence is
   written. Low.

Kept, though borderline:
- "The record calls the number types 'the tower'" (line 89): it prevents
  misreading the record.
- The quoted error messages (lines 89, 95, 124): they let a worker recognise
  the case.
- "The Scala language accepts it" (line 22) and "A Java `permits` list names
  each direct subtype" (line 30): they prevent the expected
  misunderstanding.
