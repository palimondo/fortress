# Cold read 2 of the orientation

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and
`explorations/compile-ladder/climb-batch-34/orientation/orientation.md`, nothing else.
Line numbers are those of `orientation.md` as read. Confidence is how sure I am
that a fresh worker would be misled or would stall, not whether the rule is true:
I opened no source to check the rules.

## 1. What I would do differently, section by section

### Opening (lines 1-7)

- When the specification, a team test, an old note or my own training disagrees
  with this file, I follow this file. Its limit: only for what it covers. For a
  case it does not cover, I search FACTS and POSITIONS before I call the
  disagreement a conflict.
- I cite a curator's decision only where the sentence names a P-N. I build on a
  bold rule without a P-N, but I do not cite it as a decision.
- I read a sentence that cites a ledger row as unsettled. When I write a test
  of such a case: if the rules decide it, an `XXX` test asserts the rules'
  answer. If they do not, a plain test asserts today's behaviour and cites the row.
- A sentence that opens "Until the switch-over" is a limit of the compiler's
  library. I do not fix it in the compiler's prelude.
- When I explore, I weigh the later type papers above the specification's early
  text (P-26). I never take `Specification-1.0-frozen/` (the Working Draft) as
  current.
- Three habits to drop: assuming the number types nest, assuming fixed-width
  arithmetic wraps, and assuming walk passes arguments unconverted.

### Dispatch and overloading (lines 9-24)

- I may overload on static-parameter bounds alone (P-45). I check the Return
  Type Rule at every instance that the argument types allow, not at one.
- With static parameters, I judge exclusion over the whole tuple of parameter
  types. Where both overloads name the same generic type at a position, the
  static arguments are equal. A pair whose exclusion needs a parameter that no
  such equality ties is refused on both paths (P-152). In its exclusion test,
  the checker puts a bare parameter's meet of bounds in its place, but not
  inside a static argument (P-157). Limit: this is stated for the checker only.
- Under walk, I never rely on the order of declarations.
- I neither change code to pass walk's load check, nor take its acceptance as
  validity, until I have looked the case up in `interpreter.md`, "What walk
  checks". A walk test of two functional methods of a generic type needs a
  call, because walk compares them only at a call (row 780).
- Two functional methods with equivalent parameter types are duplicates,
  wherever `self` stands. One trait must not hold an abstract and a concrete
  method at the same types. An object that takes an abstract method from one
  trait and its body from another must declare the method itself (P-149),
  unlike in Scala.
- An abstract functional method counts for the Meet Rule. When my own trait
  declares a functional `+`, `-`, `MIN` or `MAX`, I add `excludes { Number }`,
  or `excludes { HasRank }` if the trait extends `Number`, or I put the
  operator in an object. A clean compile proves nothing here: the checker
  misses the overlap with the library's `+` (row 918), and walk refuses the
  program at load.

### Traits and objects (lines 26-64)

- I never make a type extend two instantiations of one generic trait. I never
  copy a specification example that is marked "Not allowed". Overloads on
  `Tg[\3\]` and `Tg[\4\]` are valid by the rule, but walk refuses them (row 416).
- In a `comprises` clause I list types that cover the values, not each direct
  subtype. Several declarations can together cover a meet. Walk checks
  extenders only against the main component's clauses (row 551).
- I write `override` only to widen an inherited declaration. To replace a
  declaration at its own parameter types, I redeclare it without `override`.
  I write no `override` at all in a program that must compile (row 650). I
  never add a Java-style `override` to the library, because walk then refuses
  every program. The checker accepts an `override` that overrides nothing
  (row 653), so its acceptance proves nothing.
- An object can implement an inherited abstract method with one body, or with
  several bodies that cover its types. Where static parameters are involved, I
  use one body (row 725). Walk does not check a generic object's cover (row 665).
- I can recognise a self-typed trait: no `comprises` clause, or one listing only
  `...`, and a parameter bounded by the trait itself. In its bodies, `self` is
  `T[\X\]` met with `X`, so returning `self` at `X` needs no cast. On the
  compiled path, I avoid a `typecase` with `self` in one arm and another value
  in another (row 1070). I bind it instead: `do r: X = self; r end`. Before a
  compiled generic object that lists `T` first relies on a body of `T` calling
  a method on an `X`, I write a compiled test of it (row 1052).
- When an object redeclares an abstract dotted method of a self-typed `T` at
  the same parameter types, I use `T`'s return type, or getters for a method
  with no parameters (row 1094). Walk refuses some valid pairs: where `T` is
  self-typed only through another trait, or where the method has its own static
  parameters (row 999).
- An indexed type's index parameter is `I extends Index` in the library and in
  walk-only code. I leave the bound out of compiled code until the
  switch-over. Only `ZZ32` is an `Index` among the integers. A tuple of `Index`
  types is an `Index` but not an `Object`, and `()` is not an `Index`. `Range`
  excludes `Index`.
- I order pairs and triples only where every element type extends
  `StandardPartialOrder`. I do not mix number types at one position under walk
  (row 511). An `Unordered` comparison gives `false`. A list of `RR64` has no
  order for the checker (P-154).
- I expect `=` to fall back to `SEQV` (P-168). A value object without its own
  `=` that holds separately computed equal strings is not `=`. A tuple of four
  or more elements falls back to `SEQV` (row 923). I give value objects an `=`.
  For equivalence of booleans I write `<->`, never `EQV` or `≡` (row 184). The
  compiler's `===` is different until the switch-over (row 908).

### Static parameters, where clauses and sizes (lines 66-85)

- A parameter that a call does not fix takes its bound (P-48), not `Nothing`.
  Under walk, I expect `OPEN` for a parameter bounded by itself, and `Bottom`
  in the three listed cases (rows 591, 612, 587).
- Under walk, I write the static arguments of a call that is itself an argument
  and is typed only by its context (row 705).
- I write only the three `where` forms (P-151). Any other form on an `extends`
  entry is silently unconditional. No run time checks a `where` condition. In
  compiled code I avoid calls whose own clause introduces a variable, such as
  `where [\nat n\]` (row 867).
- I compare sizes by their written form after numeral arithmetic: `s0 s1` is
  not `s1 s0`. A `typecase` arm at a numeral against a static parameter is
  reachable.
- I use `reflect` and `NatParam` for sizes known only at run time, and only
  under walk. In compiled code I never pass a value of such a trait where a
  listed type is expected (row 307).

### Numbers (lines 87-116)

- There are seven value-object number types, and `QQ` is a trait whose values
  are `Ratio`. The compiler's prelude has no `QQ`. I declare my own number type
  below `Number`, never below a number type.
- I write `ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64` for the team's `Int`, `Long`,
  `Float`, `BigNum` and `UnsignedLong`. A `typecase` catch-all is `x: Any =>`.
  In a tuple arm, a misspelled type name is silently a binder (row 1064).
- A numeral at a typed place converts exactly, or with one rounding for floats.
  Elsewhere it takes its default, and the default sticks: `x = 0.1`, then
  `q: QQ = x`, is refused. `lr = 1/1000` is a `QQ` under walk, so I type the
  binding where I want a float.
- My own number type takes numerals through a coercion generic over the
  numeral's numbers, bounded by `where`. A negative constant needs a prefix `-`.
  A folded constant needs a coercion from its default type. The coercion runs
  once for each place.
- A test of run-time arithmetic or concatenation needs a variable operand. An
  expression of numerals alone folds exactly, so `2147483647 + 1` does not
  overflow.
- Walk chooses a coercion by the run-time value, and the checker chooses it
  statically. Walk does not convert at a declared return type (row 387), or
  between arrow types (row 1083). A generic call promotes to the narrowest
  common type. For a tuple or varargs, walk takes the join (rows 395, 511).
- A numeral can choose a strictly more specific overload that its coercion
  reaches (P-46). Departures: rows 1016 and 1017.
- I convert integers with the checked `asZZ32`-style getters. `narrow`, `widen`,
  `signed`, `unsigned` and `big` keep the low bits and never raise. A `ZZ` has
  only `big`.
- I never write generic code over `T extends Number` that calls a
  number-type method. A cross-type `=` without a coercion is silently `false`,
  as for a `ZZ64` against an `RR64`, so I write `asFloat(x) = y`.
- `^` answers its base's type. A negative exponent raises, except at bases 1 and
  -1. For a fraction, I write a float base or a `QQ` base.
- `/` on two integers gives a `QQ`. I truncate with `DIV`, which rounds toward
  zero. I make a float with `1.0 s` or with `asFloat` (always for `ZZ64`). A
  compiled `7 / 2` is a static error until the switch-over.

### Reductions and comprehensions (lines 118-130)

- At a method's return type, a field, a top-level variable or an assignment, I
  write a reduction's static argument, as `SUM[\RR64\][...]`. Otherwise the
  paths sum in different types (row 1008). As a call's argument, a reduction
  sums in its body's type on both paths. I always write both arguments of
  `BIG MIN_MAX` (row 1007). Under walk, an untyped empty `SUM` is the integer 0
  (row 716).
- A reduction of my own without an identity declares `simpleJoin` at `R`, never
  at `Any` or untyped. I never copy the team's reduction tests.

### Implementation limits (lines 132-136)

- I never write a `Maybe` as an `if` condition.
- I write every parameter type, even where walk would run without one (row 405).
- I do not switch walk's checker on before the switch-over (P-12).

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

1. **Line 74, P-51 against row 705: is walk's behaviour the rule or a
   departure?** (0.6) The bold rule says that only the checker gives an inner
   call its context. Walk not doing so then reads as part of the rule. Yet the
   sentence cites row 705, which by line 7 makes it unsettled. A worker who
   tests `takesBox64(mk())` under walk cannot tell between an `XXX` test
   (asserting the compiled answer) and a plain test (asserting the bound).
2. **Line 48, the `Index` bound: two instructions conflict for code on both
   paths.** (0.6) "In your own generic over such a type, write `I extends
   Index`" conflicts with "write the bound only in code that runs under walk or
   is checked against the interpreter's library". The core asks for tests on
   both paths in some cases, and the model program is meant to compile. Such
   code needs the bound against the interpreter's library and must not have it
   under the prelude. Nothing says what to write meanwhile.
3. **Lines 7, 48, 64, 95, 110, 114, 116: "compiler's library" and "compiler's
   prelude" used as if one.** (0.55) The core defines the prelude as "three
   files of its library", a part. Line 7 says that the limit is of the
   compiler's library, "so do not fix it in the compiler's prelude". Read
   strictly, a fix in the rest of the compiler's library is allowed. Read
   loosely, the two are the same thing. Later sentences swap the terms freely.
4. **Line 122, the bold sentence states a divergence between the paths "as the
   rule".** (0.5) Line 5 says that each bold rule states the rule of this
   tree. Line 122 makes "the two paths fix an unwritten static argument from
   different places" a bold rule, and line 124 then cites row 1008 for the
   same divergence. A worker cannot tell whether the divergence is settled (a
   plain test) or a departure (an `XXX` test, but asserting which path?).
5. **Line 68, `OPEN`: "Every value passes `OPEN` itself" against "a type that
   holds `OPEN` admits only what it admits at `Bottom`".** (0.5) It is not
   said whether a bare `T` that stayed open counts as "a type that holds
   `OPEN`" when walk compares overloads. So `pick(x: T)` beside `pick(x: Any)`
   can be read either way.
6. **Line 7 together with "Until the switch-over" sentences that also cite
   rows (lines 64, 110, 114).** (0.45) Two conventions overlap. A row makes the
   behaviour unsettled, so test it, `XXX` where the rules decide. "Until the
   switch-over" says not to fix it. A worker does not know whether to write an
   `XXX` compiled test that waits for the switch-over, or none.
7. **Line 32, `override` in the library.** (0.45) Walk wants `override` for a
   widening declaration. The code generator "refuses every `override`
   modifier" (row 650). After the switch-over both paths use the
   interpreter's library. A worker who edits the library cannot tell whether
   a widening `override` belongs there now. "An `override` in a trait also
   overrides in every type below it" (0.4) states no action: it seems obvious
   to a Java reader, so it reads as if it meant something more.
8. **Line 91, an undefined name in a tuple arm.** (0.45) The sentence says that
   it is read as a binder "on both paths", and the next says that the compiled
   checker refuses the arm as unreachable. The two sentences look
   contradictory. It is not said what a compiled program with a non-`Any`
   selector gets.
9. **Line 32, "along two paths".** (0.35) Here "path" means an inheritance
   path. Everywhere else, in the core and in this file, a "path" is walk or
   the compiled path. Write "by two inheritance routes" or similar.
10. **Line 81 and line 134: behaviour sentences that cite neither a row nor a
    P-N, but read as gaps.** (0.35) Examples: "The code generator accepts a
    declaration's own `where` clause but emits no code for it", and "walk
    takes a `Maybe` as an `if` condition". By line 5's convention, these are
    rules to build on. They read like departures, and a worker cannot tell
    which kind of test to write.
11. **Line 5 against the core's rule "Cite a source for each claim".** (0.35)
    "Build on a sentence without one, but do not cite it as a decision" leaves
    unsaid what a worker should cite instead: the skill part, FACTS, or a
    primary source.
12. **Line 112, "declare your function once for each number type instead".**
    (0.35) The core says that the algebra is self-typed traits such as
    `AdditiveGroup[\T\]`. This advice can push a worker into writing eight
    copies of a function where a bound on an algebraic trait would do. Say
    whether that bound is the intended route.
13. **Line 7 at the level of the sentence.** (0.35) Some sentences that cite a
    row join a settled half to a departure half. Examples: line 24, "The
    checker refuses such a pair in one component, but accepts it against the
    library's `+` (row 918)", and line 28, "it runs such a type, and refuses
    overloads ... (row 416)". The convention marks the whole sentence as
    unsettled.
14. **Line 30, "walk checks extenders only against the clauses of the
    program's main component".** (0.4) "Extenders" is not defined, and the
    check is not named. Is it the check that every extender is listed in the
    clause? What does a program get when it extends a library trait that has
    a `comprises` clause?
15. **Line 122, "A reduction whose bound does not name its parameter takes its
    bound, or the expected type where the bound does not fit".** (0.4) It is
    not said which path this is (it seems to be the checker), or what the bound
    must fit.
16. **Line 130, "`BIG MAX` over a generator still answers `R`".** (0.3) Elements
    are lifted to `Maybe[\R\]`, but the result for an empty generator is not
    given.
17. **Line 24, "The Meet Rule ... (`SKILL.md`, "Fortress as a language")".**
    (0.3) The core states the rule ("a third covers their meet") but never
    names it the Meet Rule. Walk's message uses that name, so a search of the
    core for it finds nothing.
18. **Terms the core does not give.** (0.25-0.3 each) The "count stage"
    (line 48; the core only mentions it). A `comprises` clause "that lists only
    `...`" (line 38). `TIMES` (line 95): the reader does not learn why it is
    used rather than juxtaposition. `0#n` (line 120). "Extenders" (line 30).
    "Route A" (line 89): no other route is named.
19. **Line 93, "a numeral type has no getters, no `asFloat`, no `asString`".**
    (0.25) It can be read as forbidding `3.asString`. A numeral used as a
    receiver takes its default type, so the call is presumably valid, but the
    text does not say so.
20. **Line 19, "So the checker refuses `f(self, y: S)` beside `f(x: S, self)`".**
    (0.25) It says nothing of walk. The next lines say "both paths" for the
    abstract cases, so the silence about walk here stands out.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

1. **Line 41, "A compiled body of `T` that returns `self` at `X` runs, also from
   an arm of a conditional or a `case` expression, a function expression or a
   local function."** (0.5) This lists the forms that were fixed. The only
   action is the `typecase` exception. "Runs in every form but one" carries
   the same guard against overusing the workaround.
2. **Line 43, "With the reading of the exclusion test and the bounds that the
   test reads ..., the library's generic `+` and `-` ... are valid beside
   `AdditiveGroup`'s own. Walk reads `self` in the same way, so it loads such a
   pair in the library ...".** (0.45) This justifies the library's validity.
   For a worker, the action is in the two exceptions of row 999. Keep only the
   frame that they need: "walk reads `self` so too, except ...".
3. **Lines 110 and 114: the inventories of the compiler's prelude.** (0.4)
   These are the getters it has, its powers and their exponent types, `ZZ32`
   giving 0, and the Java exception at base 0 (rows 349, 441, 523). Line 7
   already says that such limits are not to be fixed. The detail changes an
   action only on the compiled path, so it belongs in `compiler.md`. Here, one
   sentence and a pointer would do.
4. **Line 41, "For a generic object that lists `T` first in its `extends`
   clause, no test covers such a body (row 1052)."** (0.3) This states test
   coverage, which is a ledger detail. The action (write a compiled test
   first) is all that a worker needs.
5. **Line 89, "The record calls this design route A, and still calls the number
   types "the tower", though they do not nest."** (0.3) "Route A" names a past
   choice between designs. The gloss on "the tower" does prevent a misreading
   of the record. Keep that half, and drop "route A" unless record entries
   still use it.
6. **Line 83, "The class loader computes a size without checking its kind, and
   stops on a negative exponent with a Java exception (row 675)."** (0.25)
   This is a detail of the class loader that rarely changes what a worker
   writes.
7. **Line 134, "**Walk has no static types.**"** (0.25) It repeats the core
   (SKILL.md, "The phases"). The rest of the paragraph is new: P-12 and the
   `Maybe` condition. The heading adds nothing.
