# Cold read 2 of the orientation (climb-batch-33)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and
`explorations/compile-ladder/climb-batch-33/orientation/orientation.md`. Nothing else
was opened. Line numbers are the orientation's.

## 1. What I would do differently, by section

### Lead (lines 1-7)

- Read each bold sentence as the tree's rule, a sentence with a P-N as a curator
  decision that I may cite as one, and an unmarked sentence as something to build
  on but not to cite as a decision.
- Read a sentence that cites a ledger row as unsettled. I would not write a plain
  test (no `XXX` prefix) that asserts it as correct. Where a rule decides the
  case, I would write an `XXX` test that asserts the rule's answer. Where no rule
  decides it, I would write a plain test of today's behaviour that cites the row.
  Limit: the row sentence does not say which of the two cases it is (2.1).
- Read a sentence that opens "Until the switch-over" as a limit of the compiler's
  library, and not fix it in the compiler's prelude.
- Search FACTS and POSITIONS before I call a disagreement a conflict.
- Distrust old notes, the team's tests and my training on three points: the
  number types do not nest, fixed-width arithmetic raises and does not wrap, and
  walk converts arguments.
- Read "the Working Draft" as `Specification-1.0-frozen/`, the unrevised text
  that the rules here override.
- Take the team's later type papers over the specification's early text. Limit:
  "Most rules" does not say whether I may apply this to a new conflict (2.3).

### Dispatch and overloading (lines 9-24)

- Allow overloads that differ only in their static parameters' bounds. Check the
  more specific overload's return type at every instance that the argument types
  allow, not at one.
- Make generic overloads exclude through positions that name the same generic
  type, which tie their static arguments, together with an exclusion at the
  instance that this forces. A static parameter left free by those ties makes
  the pair invalid on both paths.
- Never reason from the order of declarations: walk picks by declared parameter
  types. Expect "Cannot unify" from a trait's generic method called outside its
  bound.
- Not take walk's load refusal or acceptance as the verdict. Before I change code
  to get past it, look up the case in `interpreter.md`, "What walk checks".
- Never declare two functional methods with equivalent parameter types, whatever
  position `self` is in. Never declare an abstract and a concrete method with the
  same parameter types in one trait. Declare the method in the object itself
  where it inherits the abstract method from one trait and the body from another.
- When a trait of mine declares a functional method, check its meet with every
  top-level overload of that name, the library's included. For a trait with a
  functional `+`, `-`, `MIN` or `MAX`: declare `excludes { Number }`, or
  `excludes { HasRank }` where the trait extends `Number`, or put the operator in
  an object. Limit: against the library's `+`, the checker does not catch it
  (row 918); walk refuses at load with "fails the Meet Rule".

### Traits and objects (lines 26-64)

- Never extend two instantiations of one generic trait, and never copy the
  examples that the specification marks "Not allowed". Under walk, avoid
  overloads on two instantiations (`Tg[\3\]`, `Tg[\4\]`), which walk refuses
  (row 416).
- Not list every subtype in a `comprises` clause: it speaks of values. Several
  declarations may together cover a meet. Walk checks extenders only against the
  main component's clauses (row 551).
- Write `override` only to widen: my parameter types strictly wider than the
  inherited declaration's. To replace an inherited declaration at its own types,
  declare it again without `override`. Never write a Java-style `override` (the
  same types) in the library, since walk then refuses every program at load. Never
  write `override` in a program that must compile (row 650). Limit: the text does
  not say whether the library may hold `override` after the switch-over (2.6).
- Cover an inherited abstract method with one body, or several narrower bodies
  that together cover it, `comprises` clauses read. Where the abstract or a
  covering method has static parameters, write one body: the checker refuses a
  cover by several (row 725). Walk does not check a generic object's cover
  (row 665).
- Self-typed traits: write `trait T[\X extends T[\X\]\]` with no `comprises`
  (or only `...`), return `self` at `X` with no cast, and extend it only as
  `object A extends T[\A\]`. In compiled code, avoid a `typecase` with `self` in
  one arm and another value in another, or bind `self` at the returned type
  (`do r: R = self; r end`). Limit: the scope of that failure is unclear (2.7).
  Expect walk to refuse a valid pair where `T` is self-typed only through another
  trait, or where the method has static parameters of its own (row 999).
- Indexed types: write `I extends Index` in the library and in code that runs
  under walk. Leave the bound out of code that compiles against the prelude
  today. Index with `ZZ32` only: no other integer type is an `Index`. A tuple of
  `Index` types is an `Index` (`m[i, j]`), and `()` is not. Never count on an
  overload over `Index` excluding one over a tuple of `Index` types. In compiled
  code, pass a tuple expression only at a parameter typed `I extends Index`
  (row 805).
- Compare pairs and triples only where each element type extends
  `StandardPartialOrder`. Under walk, never with two number types at one position
  (row 511). In compiled code, never order a `List[\RR64\]`.
- Equality: for a value object that declares no `=`, `=` is `SEQV`, field by
  field, with strings by identity. So I would give a value object that holds
  strings or computed values its own `=`, or compare its parts. For tuples longer
  than three, compare the parts. Never write `EQV` or `≡` on booleans: write
  `<->`. In a test, build strings at run time, since equal literals are one
  object and `||` of literals folds. In compiled code today, `===` compares
  strings and four number types by `=` (row 908).

### Static parameters, `where` clauses and sizes (lines 66-85)

- Expect a type parameter that no call fixes to take its bound. Under walk,
  expect a self-bounded parameter to stay `OPEN`: it accepts every value, but it
  compares at overloads as `Bottom` (row 663). In the three `Bottom` cases (two
  unrelated bounds, an upper bound naming another parameter, a function
  expression's result alone) I would write the static argument. That action is
  my inference: the text gives none (2.19).
- Under walk, write the static arguments of a generic call that stands as an
  argument: `mk[\ZZ64\]()`.
- Use only the three built `where` forms. Never write another `where` clause on an
  `extends` entry: the checker drops its condition without a message. Never
  count on a `where` condition at run time on either path. In compiled code,
  never introduce a `where`-clause variable in a function's own clause (row 867).
- Write each size product in one order everywhere: sizes are equal only when
  written alike after numeral arithmetic.
- Use `reflect` and `NatParam` only under walk, also after the switch-over. In
  compiled code, never pass a value of a trait whose `comprises` lists a type at a
  `where`-clause size where a listed type is expected (row 307).

### Numbers (lines 87-116)

- Never extend a number type. Declare my own number type as a value object below
  `Number`. Do not trust the checker's acceptance of `extends ZZ32` on the
  compiled path: the object dies when its class loads (row 866).
- Translate the team's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` to
  `ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64`. Write a catch-all `typecase` arm as
  `x: Any =>`, never `x =>`. Never write an undefined name in a tuple arm.
- Declare the type where I want a numeral to be `QQ`, `NN32`, `RR32` or another
  type. A numeral converts at a typed binding, an assignment, a field, a
  parameter or a declared return type, exactly into the integer types and `QQ`,
  and with one rounding into the floats. Elsewhere it takes its default and keeps
  it (`x = 0.1`, then `q: QQ = x`, is refused). Expect out-of-range numerals to be
  refused: statically by the checker, at the place under walk.
- Write a numeral type only as a coercion's or an operator's parameter type. For
  my own number type, write the generic numeral coercion with a `where` bound,
  give the type a prefix `-` if it must take negative numerals, and expect a plain
  array, not a `Vector` or `Matrix`, from `array1` and `array2`.
- In a test of run-time arithmetic or concatenation, use a typed variable
  operand: an expression of numerals alone folds exactly (`2147483647 + 1` does
  not overflow; `0.1 + 0.2 = 0.3` is `true`; `1/1000` is a `QQ` under walk). My
  own type takes a folded constant only through a coercion from the constant's
  default type.
- Expect walk to convert non-numeral arguments at calls, typed bindings and
  assignments by the run-time value, but not at return types (row 387). A generic
  call promotes to the narrowest common type, but walk takes the join of tuple and
  varargs elements. Expect "Ambiguous coercion" where only coercions apply and
  none is more specific.
- Expect a numeral to run a strictly more specific overload that its coercion
  reaches (`k(5)` runs `NN32` over `Any`), but not a sibling's (`f(1.5)` runs
  `RR64`, not `RR32`). Rows 1016 and 1017 are the exceptions.
- Convert integers with the checked getters (`asZZ32` and the others) or the
  low-bits functions (`narrow`, `widen`, `signed`, `unsigned`, `big`), knowing
  that `narrow` wraps silently. On a `ZZ`, write `z.asZZ32`, not `narrow(z)`.
- Call nothing on a `T extends Number` in generic code: write one overload per
  number type. Never compare two number types by `=` unless a coercion joins
  them: `ZZ64` against `RR64` is silently `false`. Compare with `asFloat(x) = y`.
- Expect `^` to stay in the base's type, and a negative exponent to raise except
  at 1 and -1. For a fractional result, write `2.0^(-1)` or a `QQ` base.
- Expect `/` on two integers to give a `QQ`. Truncate with `DIV` (toward zero).
  For a float, make one operand a float, and convert each `ZZ64` operand with
  `asFloat`. In compiled code today, `7 / 2` is a static error.

### Reductions and comprehensions (lines 118-130)

- In a program for both paths, write the static argument of `SUM`, `PROD`,
  `BIG MAX` and `BIG MIN` where the value lands in a method's return type, a
  field, a top-level variable or an assignment (row 1008). Always write both
  arguments of `BIG MIN_MAX` (row 1007). As a call's argument, a reduction sums
  at its body's type on both paths.
- Under walk, give an empty `SUM` a declared type (row 716). Expect a nested
  comprehension to be built at run-time types (row 717).
- For my own reduction without an identity, extend `AssociativeReduction[\R\]` and
  declare `simpleJoin` at `R`, never at `Any` or untyped. Do not copy the team's
  tests.

### Implementation limits (lines 132-136)

- Never write a `Maybe` as an `if` condition.
- Write every parameter type, even where walk runs without one.

## 2. Passages that send a worker wrong, read two ways, or use a term the core does not give

2.1. Line 7, plain and `XXX` tests (confidence 0.8). "So do not assert it as
correct in a plain test" is followed two sentences later by "a plain test asserts
today's behaviour beside the row". On a first read these contradict each other.
The difference rests on "as correct" and on "beside the row", which is not
defined: in the same file, or with the row cited in a comment? Worse, a sentence
that cites a row does not say whether it is a departure from a rule (so an `XXX`
test) or a case that no rule decides (so a plain test). Example: "with no
declared type, an empty `SUM` gives the integer 0 (row 716)". So the worker
cannot pick the test form from the sentence. Fix: mark each row sentence as a
departure or as undecided, or say how to tell.

2.2. Lines 7, 64, 89, 95, 110, 114, 116, "compiler's library" against "compiler's
prelude" (confidence 0.6). The text uses the two words in turn for the same
limits ("Until the switch-over, the compiler's prelude declares neither `TIMES`
..."; "Until the switch-over, the compiler's library has integer powers ...").
The core says the prelude is three files of the compiler's library. So "do not
fix it in the compiler's prelude" leaves open whether the compiler library's
other files may be fixed. A worker may also take row 1003 (line 89), a prelude
limit that cites a row and does not open "Until the switch-over", as something to
fix in the prelude.

2.3. Line 5, "Most rules follow the team's later type papers (`Papers/`) over the
specification's early text (P-26)" (confidence 0.6). This reads as a description
of the rules here, or as a standing decision that settles any conflict between
the specification and the papers. Under the core, the second reading means such a
conflict is not one to explore. "Most" suggests the first reading; the P-26
citation suggests the second.

2.4. Line 5, two homes of the original specification (confidence 0.4).
`Specification-1.0-frozen/` is "the unrevised specification", and Appendix I
"keeps the original text". The text does not say which one to cite. The core's
definition of the original tree names only `Specification/`, so it is not clear
whether the frozen copy is team material or a revival copy.

2.5. Line 32, "self-typed" (confidence 0.3). Row 1037's sentence uses
"self-typed" four paragraphs before line 36 defines it.

2.6. Line 32, `override` and the switch-over (confidence 0.5). "The code generator
refuses every `override` modifier, so a program that writes one does not
compile." Walk needs `override` to widen over an inherited narrower declaration,
and after the switch-over the compiled path compiles the interpreter's library.
The text does not say whether the library may hold an `override`, or how a
program for both paths widens. A worker who edits the library may add one that
walk needs and break the switch-over, or remove one and break walk.

2.7. Line 41, row 1070 and `comprises { R }` (confidence 0.7). The section defines
a self-typed trait as one with no `comprises` clause, or one that lists only
`...`. Yet the row's test returns `self` at `R`, "the type that its trait's
`comprises { R }` lists". That trait is not self-typed, so the reader cannot tell
whether the verification failure belongs to self-typed traits, to traits with a
`comprises` clause, or to any trait. "In that arm" does not say which arm, the
`self` arm or the other.

2.8. Line 41, row 1052 (confidence 0.6). "A compiled body that `T` gives one of its
methods can call a method on a value of type `X`." "Can" reads as "is allowed
to" or as "works". The next sentence says no test covers a generic object that
lists `T` first and that it "may fail". It gives no action: avoid listing `T`
first, avoid such calls, or test before relying on it.

2.9. Line 48, `Index` on both paths (confidence 0.55). "In the library, and in your
own generic over such a type, write `I extends Index`" against "write the bound
only in code that runs under walk or is checked against the interpreter's
library". For a program that must run under walk and also compile today, the two
instructions conflict. The worker has to infer that the bound is left out until
the switch-over.

2.10. Line 91, undefined name in a tuple arm (confidence 0.6). "Still binds on both
paths, with no message" and then "Compiled, with an `Any` selector, the checker
refuses that arm". "Binds" is not explained (as a pattern variable? as a match
of anything?), and under the first reading the arm would be reachable. The action
(never write such a name) is clear, but the described behaviour is not.

2.11. Line 93, "a numeral type has no getters, no `asFloat`, no `asString`"
(confidence 0.6). Does `3.asString` or `asFloat(3)` fail, or does the numeral
take its default (line 97) or convert at `self`'s parameter type (line 95, "a
parameter")? A worker writing tests or model code meets this at once and can read
it either way.

2.12. Line 101, default type of a folded constant (confidence 0.7). "Any other
result is one exact constant, which ... takes its default", and "A quotient that
is not whole stays `n / d` in lowest terms and defaults to a `QQ`." Is
`x = 0.1 + 0.2` (exactly 3/10) an `RR64`, from the radix point, or a `QQ`, as a
quotient that is not whole? Is `x = 0.5 * 2` a `ZZ32` or an `RR64`? For
microGPT's constants (`lr = 0.01 / 4`) the answer decides whether walk runs in
`QQ`, slowly, without a word.

2.13. Lines 48-64, section placement (confidence 0.35). `Index`, the ordering of
tuples and lists, and `=`/`SEQV` sit under "Traits and objects". A worker looking
for equality or indexing will not look there. Line 112 has to point back to it.

2.14. Lines 103, 112 and 116, the coercions between number types (confidence 0.4).
Which coercions exist is given piecemeal: `ZZ32` to `ZZ64` (line 103), `ZZ32` to
`RR64` (line 103's `1.0 s`), no `ZZ64` to `RR64` (line 116). Line 112's "the
library declares `=` for each such pair" depends on this set, and a worker may
assume `ZZ32` to `RR32` or `NN32` to `ZZ32`. A table of the coercions would settle it.

2.15. Line 122, "A reduction whose bound does not name its parameter takes its
bound, or the expected type where the bound does not fit" (confidence 0.45). The
text does not say which reductions these are, or what the bound fails to fit:
the expected type or the body's type?

2.16. Lines 101 and 124, `MINMAX` and `BIG MIN_MAX` (confidence 0.35). These look
like two spellings of one operator, or a typo. Neither is in the core.

2.17. Line 130, `BIG MAX` on an empty generator (confidence 0.5). The elements are
lifted to `Maybe[\R\]`, but "`BIG MAX` over a generator still answers `R`". The
text does not say what an empty `BIG MAX` answers or raises.

2.18. Line 81, `where`-clause variables (confidence 0.5). Of the three built forms,
the second is "a condition of a function or method on its own static
parameters". A function's clause that introduces a variable (`where [\nat n\]`)
fits none of the three, yet the checker passes it and row 867 records a run-time
death. It is not clear whether this is a built form with a defect or an unbuilt
form that the checker fails to refuse. "Checked at a call" (line 78) beside "the
compiled runtime does not check it" also leaves open who checks: the checker,
statically, or nobody at run time.

2.19. Line 68, walk's three `Bottom` cases (confidence 0.4). The text lists the
cases but gives no action. A worker cannot tell whether to write the static
argument, avoid the form, or expect a failed dispatch.

2.20. Line 134, "Walk will run the checker only after the switch-over (P-12)"
(confidence 0.3). This reads as a plan ("will run it after") or as a limit
("runs it only then").

2.21. Line 11, `ident` example (confidence 0.3). The text does not say that
`Round` extends `Shape`. The example only works if it does.

2.22. Line 136, return types (confidence 0.35). The rule asks for every parameter
type, but not for return types. The core says walk instantiates a reduction at a
function's declared return type, so a function without one sums at the join. The
text does not tie the two together.

2.23. Line 3, frame (confidence 0.3). As the orientation, the file still calls
itself "This part" and points to `SKILL.md` as if from inside the skill's parts.

Terms that the core does not give:

- "plain test" is defined at line 7. "`XXX` prefix" appears in the core only in
  its description ("XXX expected failures"). "beside the row" is undefined (2.1).
  Confidence 0.6.
- "compiler's library" (the core says "its library" and "the compiler's
  prelude") (2.2). Confidence 0.5.
- "Meet Rule": the core says only "a third covers their meet" and names the
  Return Type Rule but not this one. Line 24 defines it by pointing at the core.
  Confidence 0.4.
- "extenders" and "main component" (line 30). Confidence 0.4.
- "count stage" (line 48): the core uses it without saying what it is.
  Confidence 0.35.
- "`TIMES`" (line 95): the text does not say why `TIMES` and not juxtaposition
  or `*`. Confidence 0.4.
- "`__bigOperator`, 'body param 1'" (line 122): a walk internal, given without
  saying it is where the error message points. Confidence 0.3.
- "route A" (line 89): a name from the record, with no other route given.
  Confidence 0.3.
- Library names given without a gloss: `StandardPartialOrder`,
  `StandardTotalOrder`, `LexicographicOrder`, `AssociativeReduction`,
  `simpleJoin`, `Ratio`, `NatParam`, `HasRank` (glossed), `Unordered`, `CMP`.
  These are fine for a worker who will open the library. Confidence 0.25.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

3.1. Line 41, "The row's test returns `self` at `R`, the type that its trait's
`comprises { R }` lists." This describes a ledger row's test, not a rule or an
action, and it confuses the reader (2.7). Replace it with the scope of the
failing shape. Confidence 0.75.

3.2. Line 41, "For a generic object that lists `T` first in its `extends` clause,
no test runs such a body, and it may fail when the class loads (row 1052)." This
is the state of test coverage. Turn it into an action or cut it (2.8).
Confidence 0.6.

3.3. Line 43, "With this reading and the bounds that the test reads ('Dispatch and
overloading'), the library's generic `+` and `-` between an array and a number
are valid beside `AdditiveGroup`'s own." This justifies P-157 by the library case
it was decided for. A worker does nothing with it. The next sentence ("Walk reads
`self` in the same way ...") is needed only as the lead-in to row 999.
Confidence 0.6.

3.4. Line 13, the last two sentences (P-157: the meet of a static parameter's
bounds put in its place, except inside a static argument). These are the
checker's internal mechanics. They change an action only for someone who edits
or debugs the checker's exclusion test, so `compiler.md` is their place.
Confidence 0.5.

3.5. Line 83, "The checker refuses a size power above the exponent 4096, except of
0, 1 or -1. Walk refuses a negative exponent. The class loader computes a size
without checking its kind, and stops on a negative exponent with a Java exception
(row 675)." These are edge limits that ordinary work does not meet; they belong
in `compiler.md` and `interpreter.md`. Confidence 0.5.

3.6. Line 17, "For example, walk compares two functional methods of a generic trait
or object at each call, not at load (row 780)." This is one instance of the rule
already stated, which points to `interpreter.md` for the list. Confidence 0.4.

3.7. Line 64, "A float numeral converts where `RR64` is declared ('Numbers'), so
`y: RR64 = 0.5` is `SEQV` a computed `RR64` 0.5." Nothing here surprises a
reader, so it prevents no misunderstanding. Confidence 0.4.

3.8. Line 134, "Walk will run the checker only after the switch-over (P-12)." This
is a future plan that changes no action today (2.20). Confidence 0.35.

3.9. Line 22, "The Scala language accepts it." This prevents a misunderstanding
only for a reader who would expect Fortress to follow Scala on inherited
abstract and concrete members. That is a weak case. Confidence 0.3.

3.10. Line 95, getting an infinity (`t TIMES 10.0` with `t: RR64 = 10.0^308`, and
`isInfinite`). This is a test-writing recipe for one narrow need, so
`tests-writing.md` is its place. Confidence 0.3.

3.11. Line 5, "Where a rule changed the specification, Appendix I keeps the
original text (`specification.md`)." This changes an action only when editing or
citing the specification, which `specification.md` already covers.
Confidence 0.3.

Not history, but repeated: line 68 (unfixed parameters, `OPEN`) and line 122
(walk's reduction instantiation) repeat the core's "Static parameters" bullet
nearly word for word, and line 89 repeats the core's "Numbers are siblings"
bullet. One of each pair can go. Line 64's `||` fold is stated again at line 101.

Kept on purpose, though it looks like history: line 89, "The record calls this
design route A, and still calls the number types 'the tower'". It passes the
second question, since it stops a misreading of the record.
