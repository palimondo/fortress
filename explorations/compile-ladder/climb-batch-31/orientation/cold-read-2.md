# Cold read 2 of the orientation (climb-batch-31)

What I read: `CLAUDE.md`, the core (`.claude/skills/fortress-repo/SKILL.md`) and `orientation.md`. I opened nothing else. Line numbers below are `orientation.md`'s. Confidence: high, medium or low.

## 1. What I would do differently, section by section

### Preamble (lines 1-7)

- I would read a bold sentence as a rule of this tree. I would cite a sentence with a P-N as a curator's decision. I would build on a sentence without a P-N, but not cite it as a decision.
- I would treat a sentence that cites a ledger row as unsettled, and never assert it in a plain test (one without `XXX`).
- I would not fix a limit that opens "Until the switch-over" in the compiler's prelude.
- Before I called a disagreement a conflict, I would search FACTS and POSITIONS.
- On three points I would distrust old notes, team tests and my training: the number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.
- Limits: the preamble does not say what to cite for a rule that has no P-N (2.1), or what a test may assert about a ledger-row behaviour. "Most rules follow the papers" covers most rules, not all (2.17).

### Dispatch and overloading (9-24)

- I would let two overloads differ only in their static-parameter bounds (P-45). I would judge them by declared domains, and require the more specific one's return type to be a subtype at every instance the argument types allow.
- To judge whether two generic overloads exclude each other:
  - I would first look for a position where both name the same generic type, which forces their static arguments equal.
  - Then I would check whether some other position excludes at that forced instance.
  - I would refuse a pair whose exclusion needs a parameter that nothing ties (P-152).
  - The checker puts the meet of a parameter's bounds where the parameter is a whole parameter type, a tuple element, or a member of an intersection or union. Inside a static argument it does not (P-157).
- I would never reason from declaration order. Walk compares declared domains first, then the instances that the call makes. When walk says "Cannot unify" on a trait's generic method, I would look for an argument outside a bound.
- I would not change code just to pass walk's load check, and I would not take its acceptance as proof. First I would look the case up in `interpreter.md`, "What walk checks".
- I would treat `f(self, y: S)` and `f(x: S, self)` as duplicates. Abstract declarations count. An object that inherits an abstract method from one trait and its body from another must declare the method itself (P-149).
- If a trait of mine declares a functional `+`, `-`, `MIN` or `MAX`, I would add `excludes { Number }` or `excludes { HasRank }`, or declare the operator in an object. I would not trust the checker's acceptance of it against the library (row 918).
- Limits:
  - The section does not say whether walk also substitutes bounds as P-157 describes.
  - The `ident` example works only if `Round` lies below `Shape`, which it does not state.

### Traits and objects (26-70)

- **Generic instantiations.** No type of mine would extend two instantiations of one generic trait. I would not copy the Working Draft's examples marked "Not allowed", and I would not expect walk to catch such a type. Under walk I would avoid overloads on two instantiations, such as `Tg[\3\]` beside `Tg[\4\]` (row 416).
- **`comprises`.** I would read a `comprises` clause as a statement about values. Several declarations, one for each listed type, can cover a meet together.
- **`override`.** I would write `override` only to widen: only where the inherited parameter types are strictly narrower than mine. At the same parameter types I would declare the method again without `override`. In a program that must compile I would write no `override` at all (row 650).
- **Inherited abstract methods.** I would cover one with a single body at its parameter types. I would use several narrower bodies only when neither the abstract method nor the bodies have static parameters (row 725). Walk does not check generic objects (row 665).
- **Self-typed traits.** Inside the trait's bodies I would type `self` as `T[\X\]` met with `X`, with no cast. On the compiled path I would avoid three shapes:
  - a function expression or local function that returns `self` at `X`;
  - a conditional with `self` in one arm;
  - a default body that calls a method on an `X` while `T` is listed first in the object's `extends` clause.

  For the first two I would use `s: X = self` and test it, since it is not yet proven (2.6). For the third I would declare the method in the object. In the two shapes where walk refuses a valid pair, I would not change the pair to suit walk.
- **`Index`.** I would write `I extends Index` in the library and in code that runs under walk. I would leave it out of a program that must compile today (2.5). I would index only with `ZZ32`. I would read `m[i, j]` as a pair passed as one index, and remember that `()` is no `Index`.
- **Ordering.** I would order tuples only where each element type extends `StandardPartialOrder`. Under the checker, a `List` is ordered only where its element type is a `StandardTotalOrder`, so not a list of `RR64`.
- **Equality.** By default, `=` is `SEQV`. So I would give a value object an `=` whenever its content must compare. I would not compare tuples of four or more by `=`. I would write `<->`, not `≡`, `EQV` or `EQUIV`. In identity tests I would remember that equal string literals are one object, and that `||` of literals folds.
- Limits: the claim about the compiled path is contradicted (2.2), and three topics here are hard to find (2.18).

### Static parameters, `where` clauses and sizes (72-91)

- **Unfixed parameters.** I would expect a type parameter that a call does not fix to take its bound, not Scala's `Nothing`. Under walk, a parameter whose bound names itself stays `OPEN`. I would know the three cases in which walk gives `Bottom` (rows 591, 612, 587).
- **Generic calls as arguments.** Under walk I would write the static arguments of a generic call that is an argument of another call, as `mk[\ZZ64\]()` (P-51).
- **`where` clauses.**
  - I would use only the three `where` forms. The checker reads any other `where` on an `extends` entry as unconditional, and says nothing.
  - I would not rely on walk or the compiled runtime to enforce a conditional extension (row 774), or a method's condition on a dotted call (row 777).
  - I would not compile a call to a function or method whose own clause introduces a `where`-clause variable (row 867).
- **Sizes.**
  - I would write size expressions in one fixed order, because sizes are equal only when they are written alike (P-55).
  - I would expect a `typecase` arm on a numeral size to be reachable.
  - I would keep size powers at an exponent of 4096 or less, and never negative.
- **Run-time sizes.** I would use run-time sizes, `reflect` from `NatReflect`, only under walk. In compiled code I would not pass a value of a trait like `NatParam`, mine included, where one of its listed types is expected (row 307).

### Numbers (93-120)

- **No tower.** I would never assume one number type is a subtype of another. When the record says "the tower" or "route A", I would read it as a name, not a nesting.
- **Numerals at typed places.** I would expect a numeral to convert exactly where its place is typed: a typed binding, an assignment, a field, a parameter or a declared return type. A numeral elsewhere takes its default, and that includes `Any`, `Object`, `Number`, `Index` and an unbounded parameter.
- **The default sticks.** So I would type the binding: after `x = 0.1`, `q: QQ = x` is refused.
- **Numeral types.** I would never write a numeral type as the type of a variable, a field or a return.
- **A number type of my own** needs these:
  - a coercion that is generic over the numeral's numbers and bounded by a `where` clause;
  - a prefix `-`, or it refuses negative constants;
  - a coercion from `QQ`, or from another default type, for folded constants (`h: Half = 10/20`).
  I would also know that the coercion's result is reused at each place where the numeral is written.
- **Testing run-time arithmetic.** I would always put a typed variable among the operands. Expressions of numerals alone fold: `2147483647 + 1` is a `ZZ64`, and `0.1 + 0.2 = 0.3` is `true`. `||` of literals folds too.
- **Coercions.** I would expect walk to convert arguments other than numerals by their run-time value. A generic call promotes to the narrowest type that all its arguments coerce into, except tuples and varargs under walk. I would expect "Ambiguous coercion" when several declarations apply only by coercion.
- **Numerals in dispatch.** I would expect `k(5)` to pick `NN32` over `Any`, but `f(1.5)` to pick `RR64` over `RR32`.
- **Converting integers.** For a checked conversion I would write a getter. For a low-bits one, which never raises, I would write `narrow`, `widen`, `signed`, `unsigned` or `big`. For a `ZZ` value I would write `z.asZZ32`, never `narrow(z)`. On the compiled path today I would use only the short list of getters.
- **`Number` declares nothing.** In generic code over `T extends Number` I would call nothing on a `T`, and would declare my function once for each number type instead. I would never compare across types with `=` where no coercion links them, because it answers `false` silently. I would compare with `asFloat(x) = y`.
- **`^`, `/` and `DIV`.** I would expect `^` to answer its base's type, and `/` on two integers to answer a `QQ`. I would truncate with `DIV`. For a float result I would write `1.0 s`, or `asFloat` for each `ZZ64` operand. In compiled code today I would never use `QQ`.
- Limits: two passages are unclear about which paths they cover (2.11, 2.16).

### Reductions and comprehensions (122-134)

- **Writing the static argument.** In code for both paths I would write the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` wherever the value lands in one of these places (row 1008):
  - a method's return;
  - a field;
  - a top-level variable;
  - an assignment.

  I would always write both arguments of `BIG MIN_MAX` (row 1007).
- **As an argument.** As a call's argument, I would expect a reduction to sum in its body's type.
- **Diagnosing under walk.** I would read "body param 1" in `__bigOperator` as an element that does not convert to the instance.
- **My own reductions.** In my own reduction I would declare `simpleJoin` at `R`, never at `Any` or untyped, and would not copy the team's tests.
- Limits:
  - The section does not say what an empty `BIG MAX` or `BIG MIN` answers.
  - Comprehensions get only one bullet.

### Implementation limits (136-140)

- I would never write a `Maybe` as an `if` condition.
- I would write every parameter type, also where the api gives it, because walk fails on a method without types that implements an abstract one (row 405).
- Limits: the P-12 sentence changes nothing that I would do (3.1).

## 2. Passages that send a worker wrong, read two ways, or use a term the core does not give

**2.1 (line 5) Nothing to cite for a rule without a P-N.** Confidence: high that the gap exists, medium that it misleads.
- The line says to build on such a sentence but not cite it as a decision. The core requires a source for every claim: the brief, the record or a primary source. It also forbids loading `sources.md` for a task.
- So for a rule like line 15 (walk chooses by declared types), line 32 (`override` widens) or line 120 (`/` gives `QQ`), the worker has nothing it may cite. The skill is not on the core's list.

**2.2 (lines 63 and 70) `SEQV` on the compiled path.** Confidence: high.
- Line 63 says "`SEQV` follows the specification on both paths". Line 70 says that until the switch-over the compiler's `===` compares by `=`, not by bits or identity (row 908).
- These contradict each other for the compiled path today. A compiled test of `SEQV` on NaN, -0.0 or string identity, written from line 65-67, would be wrong.

**2.3 (line 7 against lines 70, 91, 97, 114 and 118) The "Until the switch-over" convention does not hold.** Confidence: medium-high.
- Line 7 says such a sentence states a limit of the compiler's library that ends at the switch-over.
- Line 97 ("the compiler's prelude follows the same design (P-37)") states no limit.
- Line 91 states a limit that does not end ("After it, the call still fails").
- Lines 70, 114 and 118 pair the opening with a ledger row. Then both "do not fix it in the prelude" and "do not assert it in a plain test" apply, and the text does not say which one governs.

**2.4 (line 7) The prelude or the whole compiler's library?** Confidence: medium.
- Line 7 says "do not fix it in the compiler's prelude". The core defines the prelude as three files of the compiler's library.
- Lines 70, 118 and 120 speak of limits of "the compiler's library", and lines 54, 99 and 114 of "the compiler's prelude".
- If a limit lives in another file of that library, the passage can be read as allowing a fix there, or as forbidding one.

**2.5 (line 54) `Index` in compiled code.** Confidence: medium.
- The line first says "in your own generic over such a type, write `I extends Index`". Only later does it say that a program naming `Index` does not compile today.
- A worker who acts on the first sentence breaks a compiled program. The restriction belongs in the instruction itself.

**2.6 (line 47) The workaround's evidence.** Confidence: medium.
- The evidence for `s: X = self` is `r: R = self` in `trait Q comprises { R }`.
- By lines 38-39, a trait with a real `comprises` clause is not self-typed, and `R` there is a listed type, not `X`. So the workaround has never run in the case this passage is about.
- "Run it before you keep it" is right, but the example reads as the pattern to copy.

**2.7 (lines 51-52 and 87) Departures without a ledger row.** Confidence: medium.
- Lines 51-52 give two departures of walk without a ledger row. By line 7 a departure cites one, so a worker may take walk's refusal as settled, assert it in a plain test, or fail to find it with the ledger queries.
- Line 87 ("emits no code for it, so the compiled runtime does not check it") also has no row. It does not say whether this is a departure or a design choice (the checker checks statically).

**2.8 (line 32) `override` reads two ways.** Confidence: medium.
- "overrides an inherited declaration only where the inherited parameter types are strictly narrower" reads as a condition for writing `override`, or as the set of argument types where the override takes effect.
- Neither reading says what changes at dispatch: does the wider body now run for arguments in the inherited, narrower domain?
- With row 650, a compiled program cannot widen at all, and no way around it is given.

**2.9 (line 44) `StandardTotalOrder`'s `MIN` and `MAX`.** Confidence: medium-low.
- (a) `Library/`, which I take to be the interpreter's library from the core's cache example, is not loaded by the compiled path before the switch-over. So is this failure live today, or a blocker of the switch-over?
- (b) Line 61 implies that `RR64` is no `StandardTotalOrder`, since a list of `RR64` has no order. Then why must `RR64` declare its own `MIN` and `MAX`?
- (c) `RR32` is not mentioned.
- (d) The passage does not say what a worker's own type that extends `StandardTotalOrder` must do.

**2.10 (line 24) The `String` example.** Confidence: medium-low.
- `h(self)` in `S` beside `h(x: String)` is refused because "nothing covers the meet". The same paragraph says that an object excludes every trait that it does not extend.
- A Java reader takes `String` for a final class, that is, an object. Then the two would exclude, and the example would contradict the fix.
- The example holds only if `String` is a trait here. The passage should say so.

**2.11 (line 116) Which paths "both paths" covers.** Confidence: medium.
- The line says "on both paths ... `h = 0.5` is true for `h: QQ = 1/2`", but line 120 says the compiled path has no `QQ` until the switch-over.
- Here, as in 2.2, "both paths" can mean today or after the switch-over.

**2.12 (lines 111 and 116) `a = 0` and `u = 0` read as declarations.** Confidence: low-medium.
- The core teaches that `x = e` declares an immutable variable. Here `a = 0` is the `=` operator in a call.
- Writing "the comparison `(a = 0)`" removes the misreading.

**2.13 (lines 11, 13 and 15) "Instance" used for instantiation.** Confidence: medium-low.
- The lines say "at some instance within its bounds", "a value has at most one instance of a given generic type" and "the instances that the call makes".
- The core says "instantiation". In Java terms, "a value has at most one instance" is nonsense, because a value is an instance.

**2.14 (throughout) "Meet" is never defined.** Confidence: low.
- The core uses the word once and does not define it. The orientation uses "meet", "met with" and "the meet of ... bounds".
- Only line 41's "intersection type" lets a reader infer the meaning. One definition would fix it: the intersection, or greatest common subtype, as against the core's "join".

**2.15 Terms the core does not give.** Confidence: low.
- `TIMES` (line 99): the core teaches juxtaposition for multiplication. The line does not say why `TIMES` is used, or what compiled code writes instead.
- The range `0#n` (line 124 on).
- `BIG //` (line 134): "the string reduction", but its function is not given.
- `Unordered` (line 61).
- `HasRank` (line 24): its meaning, the array trait, comes only from context.

**2.16 (line 107 against line 99) Walk at a declared return type.** Confidence: low-medium.
- Line 107 says "The rule converts at a declared return type too, but walk does not (row 387)", right after "a value other than a numeral".
- Line 99 lists a declared return type as a place that fixes a numeral, with no exception for walk.
- So it is unclear whether row 387 also covers a numeral at a return type under walk.

**2.17 (line 5) Papers over the specification.** Confidence: low-medium.
- "Most rules follow the team's later type papers over the specification's early text (P-26)" can be read as a licence to settle a new conflict between them by preferring the papers.
- The core says such a conflict sends the worker to exploring. The line should say what P-26 decides, and that a conflict it does not cover is explored.

**2.18 (lines 54-70) Topics filed under the wrong heading.** Confidence: low; this is about finding things, not a wrong rule.
- `Index`, the ordering of tuples and lists, and `=`/`SEQV` all sit under "Traits and objects".
- Line 116 sends the reader there for `SEQV`. A worker looking for equality or indexing would not look under that heading.

**2.19 (line 103) `m` is left out.** Confidence: low. The line says "The coercion's body reads `n`, `r` and `v` as `ZZ` values". It omits `m`, the count of digits after the point.

**2.20 (line 105) `MINMAX` and "one exact constant".** Confidence: low. The line says that a folded result other than a comparison is "one exact constant". But `MINMAX` over integers is in the fold's list, and it gives a pair.

**2.21 (line 126) "Fit" what?** Confidence: low. The line says a reduction "takes its bound, or the expected type where the bound does not fit". It does not say what the bound fails to fit; presumably the expected type.

**2.22 (line 134) An empty reduction without an identity.** Confidence: low-medium. The line says that `BIG MAX` over a generator answers `R`, but not what an empty `BIG MAX` or `BIG MIN` does. A test of one cannot be written from this text.

**2.23 (line 34) The checker's limits sit in walk's part.** Confidence: low. The limits of the checker's search for a cover are in `interpreter.md`. A worker on the compiled path, who may not load `interpreter.md`, misses them.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

**3.1 (line 138) The plan of P-12.** Confidence: medium.
- The passage: "Walk will run the checker only after the switch-over (P-12)."
- Why: it is a plan, and no action of a worker today follows from it.
- Suggestion: cut it, or leave it to the record.

**3.2 (line 97) The prelude's numeral design.** Confidence: medium-low.
- The passage: "Until the switch-over, the compiler's prelude follows the same design (P-37)."
- Why: it changes no action, and it breaks line 7's convention (2.3).
- Suggestion: if it is kept to stop a reader expecting compiled numerals to differ, reword it without the opening "Until the switch-over".

**3.3 (line 44) The library's file and line numbers.** Confidence: medium.
- The passage: "(`Library/FortressLibrary.fss:291-292`). The integer types, `QQ` and `RR64` declare their own".
- Why: it describes the state of the library, cites line numbers that go stale, and states no action.
- Suggestion: turn it into an action for a worker's own type (2.9), or cut it.

**3.4 (line 47) Where the workaround ran.** Confidence: medium.
- The passage: "This workaround has run only in a trait with a comprises clause, as `r: R = self` in `trait Q comprises { R }`".
- Why: it records where the evidence came from. The action is only "run it before you keep it".
- Suggestion: keep the action, and drop the example (see 2.6).

**3.5 (line 49) Why the library's own pair is valid.** Confidence: low-medium.
- The passage: "With this reading ..., the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own."
- Why: it justifies the library's present state. The sentences about walk that follow carry the action.

**3.6 (lines 11 and 56) The Working Draft's history.** Confidence: low; borderline.
- The passages: "The Working Draft forbids such pairs." and "The Working Draft lets no trait type hold a tuple, but here...".
- Why: this is history. Line 5's pointer to Appendix I already covers a worker who reads the Working Draft.

**3.7 (line 95) "It still calls ... 'the tower'".** Not a cut: it prevents a misreading of the record. Only the word "still" is history.

**3.8 Narrow departures that the ledger search finds anyway.** Confidence: low.
- The rows:
  - row 551 (line 30);
  - row 675 (line 89);
  - row 663 and its `pick((1, 2))` example (line 74);
  - row 806 (line 59);
  - row 1017 (line 112);
  - rows 716, 717 and 436 (lines 130-132).
- Why: they change no code that a worker writes. They prevent a misdiagnosis only for the exact shape, and the core already makes a worker search the ledger before investigating a defect.
- Suggestion: these could shrink to "see the ledger".

**3.9 (line 103) The factories `array1` and `array2`.** Confidence: low.
- The passage: "The library's factories `array1` and `array2` give a `Vector` or a `Matrix` only at the eight number types; at a program's own number type they give a plain array."
- Why: it is out of place among the coercions for numerals. It changes an action only for a worker who builds matrices over a number type of their own.
- Suggestion: move it, or cut it.
