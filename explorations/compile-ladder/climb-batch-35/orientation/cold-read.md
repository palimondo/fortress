# Cold read of the orientation (climb-batch-35)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and
`explorations/compile-ladder/climb-batch-35/orientation/orientation.md`. Nothing
else was opened. Line numbers below are the orientation's.

## 1. What I would do differently, section by section

### Preamble (lines 1-7)

- Sort every sentence by what it cites before acting on it: a bold sentence is
  this tree's rule; a P-N sentence is a curator decision and may be cited as
  one; an uncited sentence is built on but never cited as a decision; a
  ledger-row sentence is unsettled and may change; an "Until the switch-over"
  sentence is a limit of the compiler's library that I must not fix in the
  compiler's prelude.
- For a ledger-row case: if the rules decide it, my test asserts the rules'
  answer under the `XXX` prefix; if they do not, a plain test asserts today's
  behaviour and cites the row.
- Before calling a disagreement among the specification, walk and the compiled
  path a conflict, search FACTS and POSITIONS.
- Distrust old notes, team tests and my training on three points: number types
  do not nest, fixed-width arithmetic does not wrap, walk converts arguments.
- Prefer the later type papers over the early specification text (P-26). Read
  `Specification-1.0-frozen/` as the unrevised Working Draft, not as the rule;
  Appendix I holds replaced text.
- Limit: question a rule only on new evidence.

### Dispatch and overloading (lines 9-24)

- Overloads may differ only in their static parameters (P-45). I would judge a
  pair by declared domains, and check the Return Type Rule at every instance
  the argument types allow, not at one.
- For generic overloads, exclusion is read over the whole parameter tuple: a
  shared generic type at one position forces equal static arguments, and the
  pair is valid only if the forced equalities make the domains disjoint. A pair
  that needs a free static parameter to exclude is refused on both paths. The
  checker puts the meet of bounds in place of a whole-type, tuple-element or
  intersection/union-member parameter, never inside a static argument (P-157).
- I would never reorder declarations to change walk's choice; walk picks by
  declared types.
- I would not change code just to pass walk's load check, nor treat its
  acceptance as proof; I would look the case up in `interpreter.md`, "What walk
  checks", first (e.g. row 780: generic trait/object functional methods are
  compared at each call, not at load).
- No `f(self, y: S)` beside `f(x: S, self)`; no abstract and concrete method at
  one parameter type in one trait; an object that inherits an abstract
  functional method from one trait and its body from another redeclares it
  (P-149), though Scala would accept it.
- An abstract functional method takes part in the Meet Rule: `h(self)` in trait
  `S` beside top-level `h(x: String)` needs a cover or an exclusion.
- A program trait with its own functional `+`, `-`, `MIN` or `MAX` gets
  `excludes { Number }`, or `excludes { HasRank }` if it extends `Number`, or
  the operator goes in an object. Otherwise walk refuses the program at load
  ("fails the Meet Rule") even though the checker accepts it against the
  library (row 918).
- "Cannot unify" from walk on a generic trait method means an argument is
  outside a bound.

### Traits and objects (lines 26-64)

- No type of mine extends two instantiations of one generic trait, even though
  walk runs it (P-43, P-97). Overloads on two instantiations such as
  `Tg[\3\]`/`Tg[\4\]` are valid but walk refuses them (row 416). I would not
  copy specification examples marked "Not allowed".
- `comprises` is about values (P-60): several declarations that together cover
  a meet suffice. Walk checks extenders only against the main component's
  clauses (row 551), so walk's silence about an imported component proves
  nothing.
- `override` only widens: use it only when the inherited parameter types are
  strictly narrower than mine. To replace at the same types, redeclare without
  `override`. A Java-style `override` is refused by both, and in the library it
  stops every program. Gap: row 1037.
- An object covers each inherited abstract method with its own body or several
  covering bodies (P-147). Where the abstract or a covering method is generic,
  use one body (row 725). Walk does not check generic objects (row 665).
- Self-typed traits (definition lines 37-39): `self` is `T[\X\]` met with `X`,
  so no cast; a type extending `T[\A\]` must be an `A`. In compiled code, a
  `typecase` with `self` in one arm and another value in the other fails
  verification (row 1070): bind `r: X = self` first. Before compiled code relies
  on a `T` body that calls a method on an `X` from a generic object listing `T`
  first, write a compiled test (row 1052). An object that redeclares an
  abstract dotted method of `T` at the same parameter types keeps `T`'s return
  type with `X` := the object (row 1094), or uses getters when the method has no
  parameters. Walk wrongly refuses valid pairs when `T` is self-typed only
  through a parent, or the method has its own static parameters (row 999).
- Indexed types: write `I extends Index` in the library and in generic code
  checked against the interpreter's library (P-156); not in code compiled
  against the compiler's prelude until the switch-over. Only `ZZ32` is an
  `Index`; an all-`Index` tuple is an `Index`, `()` is not. To take a tuple
  index, use a parameter `I extends Index`, not `Index` (row 805).
- Tuple comparisons need `StandardPartialOrder` element types; `Unordered`
  gives `false`. Walk refuses mixed number types at one position (row 511). A
  `List[\RR64\]` has no order in the checker (P-154) though walk orders it (row
  774).
- With no declared `=`, `=` is `SEQV` (P-168). I would give every value object
  holding strings or other reference objects its own `=`, never use `≡`/`EQV`
  (write `<->`), and not rely on `=` for tuples of four or more (row 923).
  Literals of one text are one object (P-171). The compiler's library today has
  no `=` over `Any` or tuples, and its `===` compares by `=` (row 908).

### Static parameters, `where` clauses and sizes (lines 66-85)

- An unfixed type parameter takes its bound (P-48), not `Nothing`. Under walk I
  would write the static arguments explicitly where walk gives `Bottom` (rows
  591, 612, 587), and for a call written as an argument, such as
  `mk[\ZZ64\]()` (P-51, row 705). `OPEN` in walk output means a self-bounded
  parameter left open (row 663).
- I would use only the three built `where` forms (P-151); any other `where` on
  an `extends` entry is silently unconditional. I would not rely on a `where`
  condition at run time on either path (rows 774, 777; the compiled runtime
  never checks one), and would keep `where [\nat n\]`-style clauses that
  introduce a variable out of compiled code (row 867).
- Sizes are equal only by written form after numeral arithmetic (P-55). A
  `typecase` arm on a numeral size is reachable from a parameter size. Size
  powers: exponent at most 4096; a negative exponent makes walk refuse and the
  class loader throw a Java exception (row 675).
- Run-time sizes come only from `reflect` (`NatReflect.fsi`), which runs only
  under walk, even after the switch-over. In compiled code I would never pass a
  value of a trait whose `comprises` lists a type at a `where`-clause size
  where a listed type is expected (row 307).

### Numbers (lines 87-116)

- Number types are flat value objects (P-43, P-178); `QQ` is a trait whose
  values are `Ratio` (P-166), and the compiler's prelude has no `QQ`. A
  program's own number type goes below `Number` (P-160), never below a number
  type. I would recognise "route A" and "the tower" in the record as this
  design.
- `Int`, `Long`, `Float`, `BigNum`, `UnsignedLong` become `ZZ32`, `ZZ64`,
  `RR64`, `ZZ`, `NN64`. A catch-all `typecase` arm is `x: Any =>`. I would check
  the spelling of every type in a tuple arm, since a misspelt one silently
  matches anything (row 1064).
- Numerals are exact (P-173, P-174) and convert at a typed binding,
  assignment, field, parameter or declared return type; elsewhere they take
  their default (`ZZ32`/`ZZ64`/`ZZ`, `RR64` with a point), and the default
  sticks. So I would annotate bindings whose type matters (`lr: RR64 = ...`).
  Infinity comes from `Constants.infinity`, tested with `x.isInfinite`.
- Numeral types appear only as coercion or operator parameter types. A
  program's own number type takes numerals through a generic numeral coercion
  with a `where` bound; today its body must convert each number, as the
  library writes `v.asZZ32` (F-342). A negative constant needs the type's
  prefix `-`. Coercions do not chain, so a folded quotient needs a coercion
  from `QQ`.
- Expressions of numerals alone fold exactly before the checker: a test of
  run-time arithmetic or concatenation needs a typed variable operand. Under
  walk `1/1000` is a `QQ`.
- Walk converts arguments, bindings and assignments by run-time value, but not
  at a return (row 387) and not between arrow types (row 1083): I would declare
  a function argument at the parameter's exact arrow type. A generic call
  promotes to the narrowest common coercion target (P-74); walk takes the join
  for tuple and varargs elements (rows 395, 511).
- A numeral may run a strictly more specific overload its coercion reaches
  (P-46); departures rows 1016, 1017.
- Integer conversion: checked getters `asZZ32` etc. (raise `IntegerOverflow`),
  or low-bits `narrow`/`widen`/`signed`/`unsigned`/`big` (silent). On `ZZ` only
  `big` exists, so use `z.asZZ32`. Compiler's prelude: fewer (row 349).
- `Number` declares nothing (P-165): write `asFloat(x)`, not `x.asRR64`
  (F-324); write no arithmetic in code generic over `Number`; expect `=` across
  number types without a coercion to answer `false` silently.
- `^` keeps the base's type; a negative exponent raises except for 1 and -1
  (P-153). For fractions use `2.0^(-1)` or a `QQ` base.
- Integer `/` gives a `QQ`. Truncate with `DIV` (toward zero); for a float
  write `(1.0 s) / n`, and `asFloat` each `ZZ64` operand. Compiled integer `/`
  is a static error until the switch-over.

### Reductions and comprehensions (lines 118-130)

- In a program for both paths I would write the static argument of `SUM`,
  `PROD`, `BIG MAX`, `BIG MIN` wherever the value lands at a method's return
  type, a field, a top-level variable or an assignment (row 1008), since the
  checker uses the declared type there and walk does not. As a call argument,
  both paths sum in the body's type.
- `BIG MIN_MAX` always gets both static arguments (row 1007).
- Under walk, an untyped empty `SUM` gives integer 0 (row 716), a nested
  comprehension takes run-time element types (row 717), and a non-number static
  argument on an empty `SUM` gives `CastError` (row 436).
- A reduction of my own without an identity declares `simpleJoin` at `R`, never
  at `Any` or untyped, and does not copy the team's tests.

### Implementation limits (lines 132-136)

- A walk run is no type check (P-12), and I would never write a `Maybe` as an
  `if` condition.
- I would write every parameter type: the checker refuses a missing one unless
  the exported api gives it; walk refuses one in a method that implements an
  abstract one (row 405).

## 2. Passages that send a worker wrong, read two ways, or use a term the core does not give

1. Line 99, the `Byte` coercion (confidence 0.8). The example
   `coerce[\nat n, nat r, nat v\](...) where { v < 256 } = Byte(v)` is given as
   the way to write the coercion, then three sentences later "walk and the
   checker ... refuse `Byte(v)`". A worker copying the example gets a refusal.
   The same paragraph says "the body ... invokes no method" while the
   workaround it names, `v.asZZ32`, is a getter call. And "Each number converts
   where it stands" uses "number" for the numeral type's static arguments
   (`n`, `m`, `r`, `v`), which a reader takes for number values. The core
   (line 135) states as plain fact that such a parameter is a `ZZ`; the
   orientation calls that a departure from the rule. Fix: show the form that
   works today (`Byte(v.asZZ32)`) next to the rule's form, name the static
   arguments as such, and state the departure once.

2. Line 57 vs line 64, `SEQV` (0.65). "`SEQV` follows the specification on
   both paths", then "Until the switch-over ... [the compiler's] `≣` ...
   compares strings ... by `=`, not by bits or identity (row 908)". Read
   literally, the first sentence is false on today's compiled path. Say "on
   walk and with the one library", or move the qualifier into the first
   sentence.

3. Line 7, citation classes (0.6). The preamble sorts sentences into P-N,
   uncited, ledger-row and "Until the switch-over", but lines 99 and 112 state
   departures that cite F-342 and F-324, which fit none of these. A worker
   cannot tell whether an F-cited departure is settled, whether to test it
   with `XXX`, or whether to fix it (e.g. add `asRR64`). The core never gives
   the F-N form either.

4. Line 7, mixed classes (0.45). Several "Until the switch-over" sentences
   also cite ledger rows (lines 64, 110, 114: rows 908, 349, 441, 523). One
   instruction says to assert the rules' answer in an `XXX` test, the other
   not to fix the compiler's prelude. Which wins for a compiled-path test is
   not said.

5. Line 7, "Build on a sentence without one, but do not cite it as a
   decision" (0.35). The core's citation rule allows only a brief, a record
   entry or a primary source, so a worker who builds on an uncited sentence
   has nothing to cite and is told not to load `sources.md`.

6. Line 122, a bold "rule" that is a divergence (0.5). The preamble says each
   bold sentence states the rule, but this one says only that the two paths
   choose differently. Row 1008 marks the departure without saying which
   path's answer the rules give, so a worker cannot write the `XXX` test the
   preamble asks for. In the same paragraph, "takes its bound, or the expected
   type where the bound does not fit" reads two ways: fit what?

7. Line 68, `OPEN` (0.45). "Every value passes `OPEN` itself" and "a type that
   holds `OPEN` admits only what it admits at `Bottom`" read as contradictory
   unless "holds" means "contains as a part". The core (line 135, "every value
   passes it") has only the first half, so the `pick((1, 2))` result surprises.

8. Line 91, tuple `typecase` arm (0.45). "On both paths" an undefined name in
   a tuple arm is read as a binder that takes any element, yet compiled "the
   checker refuses that arm ... unreachable". If it took any element it would
   be reachable from an `Any` selector. Say what the checker actually does.

9. Line 43, "such a pair" (0.4). After a sentence about the library's generic
   `+`/`-` beside `AdditiveGroup`'s, "it loads such a pair ... in a program's
   own component" leaves open what pair in a program's component is meant.

10. Line 116, "a compiled `7 / 2` is a static error" (0.35). Numerals alone fold
    before the checker, and line 101 says a folded constant converts at a
    declared `RR64`. A worker may read this as "`x: RR64 = 1/1000` does not
    compile". Say it holds where the quotient takes its `QQ` default, or for
    integer variables.

11. Lines 48-49, `Index` bound (0.3). "In your own generic over such a type,
    write `I extends Index`" is unconditional, and then "write the bound only
    in code that runs under walk or is checked against the interpreter's
    library". The two are consistent only after the second sentence; put the
    condition first.

12. Line 32, "An `override` in a trait also overrides in every type below it"
    (0.35). It could mean the override reaches declarations inherited by
    subtypes from other parents, or only that subtypes inherit the override.

13. Library names (0.3). "Compiler's prelude" and "compiler's library" are used
    for the same limits (lines 7, 48, 64, 110, 114, 116). The core says only
    the prelude, three files, is deleted at the switch-over, so a reader may
    think limits stated of "the compiler's library" outlast it. Unqualified
    "the library" (lines 24, 57, 99, 130) is ambiguous between the two
    libraries.

14. Terms the core does not give (0.2-0.35 each): "count stage" (line 48; the
    core names it but never says what it is a stage of); "Meet Rule" (line 24;
    the core states the rule but gives only the Return Type Rule a name); a
    `comprises` clause "that lists only `...`" (line 38); "wrapping, saturating"
    operators (line 101); `0#n` ranges (line 120); `HasRank`, `array1`/`array2`,
    `Vector`/`Matrix`, `AssociativeReduction`/`simpleJoin` (library names that
    need `library.md`).

15. Line 50, "A function over `Index` and one over a tuple of `Index` types do
    not exclude each other" (0.3). With line 50's own rule that such a tuple is
    an `Index`, the pair nests and is valid. Stated bare, it invites a needless
    `excludes` or a belief that the pair is refused.

16. Line 112, "write `asFloat(x) = y`" (0.25). This compares across types only
    when `y` is an `RR64`. For a `ZZ64` `y` it falls back to `SEQV` and is
    silently `false`, the trap the same paragraph describes.

## 3. History or detail that changes no action and prevents no misunderstanding

1. Line 41, "A compiled body of `T` that returns `self` at `X` runs, also from
   an arm of a conditional or a `case` expression, a function expression or a
   local function." A list of shapes that were repaired. Only the failing
   shape (row 1070) and its workaround change an action. (0.5)
2. Line 43, "With the reading of the exclusion test and the bounds that the
   test reads ..., the library's generic `+` and `-` between an array and a
   number are valid beside `AdditiveGroup`'s own." A justification of the
   library's validity. A worker acts the same without it; only the row-999
   cases after it matter. (0.5)
3. Line 134, "Walk has no static types" repeats the core (line 76). "Walk will
   run the checker only after the switch-over (P-12)" is a plan that changes
   nothing today. (0.45)
4. Line 83, size-power limits: exponent 4096 except of 0, 1, -1, and the class
   loader's Java exception on a negative exponent (row 675). Rarely met.
   Keep only the one-line warning that the class loader can throw here. (0.4)
5. Line 15, "It infers a dotted generic method's static arguments from the
   arguments' run-time types, as for a generic function." What any reader
   expects, recorded because it was once broken. (0.35)
6. Line 89, "The record calls this design route A". The repair's name; only
   the "the tower" mapping helps a reader of the record. (0.3)
7. Line 93, "The compiler's prelude follows the same design (P-37)." Changes no
   action beyond what line 95 already applies on both paths. (0.25)
