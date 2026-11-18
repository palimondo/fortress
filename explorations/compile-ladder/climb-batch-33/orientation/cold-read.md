# Cold read: climb-batch-33 orientation

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core) and `explorations/compile-ladder/climb-batch-33/orientation/orientation.md`. I opened nothing else. Line numbers below are the orientation's.

The file calls itself "This part" (line 3). Its title and contents match the part that the core lists as `references/revival-changes.md`. The core cites its sections by name: "Numbers" matches, but "Static parameters" is now "Static parameters, `where` clauses and sizes". I read it as that part, promoted to the orientation.

## 1. What I would do differently, section by section

Each rule is stated as I understood it from the orientation alone, with its limits.

### Preamble (lines 3-7)

- I would sort every sentence by its marker before I act on it.
  - A `P-N` is a curator decision, and I may cite it as one.
  - A ledger row marks something unsettled. I would never assert it as correct in a plain (non-`XXX`) test. Where the rules decide the case, I would write an `XXX` test of the rules' answer. Where they do not, I would write a plain test of today's behaviour and record it next to the row.
  - "Until the switch-over" is a limit of the compiler's library. I would work around it and not fix it in the prelude.
  - A sentence with no marker is something to build on, but not to cite as a decision.
- Before I call a disagreement a conflict, I would search FACTS and POSITIONS.
- Where the specification's early text and the later type papers disagree, I would expect the papers to win (P-26).
- The Working Draft is `Specification-1.0-frozen/`. Appendix I keeps the text that a rule replaced.
- I would not trust old notes, team tests or my training on three points: the number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.
- Limit: the markers do not sort every sentence (section 2, items 3, 4 and 8).

### Dispatch and overloading (lines 9-24)

- I would allow overloads that differ only in their static-parameter bounds (P-45).
- I would judge every pair on declared domains, and check the Return Type Rule at every instance, not at one.
- With static parameters, I would read exclusion over the whole parameter tuple (P-152). Where both declarations name the same generic type at a position, their static arguments are equal. A pair whose exclusion needs a parameter that nothing ties down is refused on both paths, so I would tie the parameters through a shared position.
- In the exclusion test, the meet of a parameter's bounds stands in for the parameter only where the parameter is a whole parameter type, a tuple element or a member of a union or intersection. Inside a static argument it does not (P-157).
- I would never rely on declaration order. A generic trait method called with an argument outside its bound fails with "Cannot unify".
- I would not change code just to pass walk's load check, and I would not take walk's acceptance as proof. First I would look the case up in `interpreter.md`, "What walk checks".
- Functional methods with equivalent parameter types are duplicates, wherever `self` stands. An abstract and a concrete method at the same types in one trait are refused. An object that takes an abstract method from one trait and its body from another must declare the method itself (P-149), unlike in Scala.
- An abstract functional method counts in the Meet Rule. So `h(self)` in a trait `S`, beside a top-level `h(x: String)`, needs a cover of the meet or an exclusion.
- A program's trait with its own functional `+`, `-`, `MIN` or `MAX` needs one of these fixes:
  - `excludes { Number }`;
  - `excludes { HasRank }`, if the trait extends `Number`;
  - declaring the operator in an object instead.

  Otherwise walk refuses the program at load with "fails the Meet Rule". The checker accepts the pair against the library (row 918), so a clean compile does not show that the program loads under walk.

### Traits and objects (lines 26-64)

- **Generic traits.** I would never extend two instantiations of one generic trait. The checker refuses it; walk runs it (row 416). In code for walk, I would not overload on `Tg[\3\]` beside `Tg[\4\]`. I would not copy specification examples marked "Not allowed".
- **`comprises`.** It is about values. Several declarations together can cover a meet. Walk checks only the main component's clauses (row 551).
- **`override`.** I would write `override` only to widen, where the inherited parameter types are strictly narrower. To replace a declaration at the same types, I would redeclare it without `override`. Walk refuses a Java-style `override` at load. The checker accepts it (row 653). The code generator refuses every `override` (row 650). So in a program that must compile, I would write no `override` at all.
- **Inherited abstract methods.** An object must cover them, with `comprises` read. Walk checks this only for objects without static parameters (row 665). Where the abstract or a covering method is generic, I would give one body at the full parameter types (row 725).
- **Self-typed traits.** I would return `self` at `X` without a cast. I would avoid a `typecase` with `self` in one arm and another value in another; I would bind `self` to a typed local first (row 1070). If a generic object that lists the trait first fails at class load, I would suspect row 1052. I would not "fix" walk's refusals in the two row-999 cases by changing valid library code.
- **`Index`.**
  - I would write `I extends Index` in the library and in code that runs under walk. Until the switch-over, I would leave it out of compiled programs, because the prelude has no `Index`.
  - I would index with `ZZ32` only; `ZZ64` is no `Index`.
  - `m[i, j]` passes one tuple index. `()` is no `Index`.
  - I would not overload over `Index` beside a tuple of `Index` types without a cover.
  - The checker refuses a tuple expression at an `Index` parameter, but takes one at a parameter `I extends Index` (row 805).
- **Order.** I would compare tuples only where every element type is ordered; an `Unordered` comparison gives `false`. Under the checker, lists need `StandardTotalOrder`, so a `List[\RR64\]` has no `<` there (P-154).
- **Equality.**
  - Where a type declares no `=`, `=` is `SEQV`.
  - I would give every value object that compares by content its own `=`. Without one, equal strings from two computations make `V(s) = V(t)` false.
  - Tuples of four or more elements compare by `SEQV` (row 923).
  - I would never write `≡`, `EQV` or `EQUIV`; I would write `a <-> b`.
  - Equal literals are one object, and `||` of two literals folds into one.
  - The compiler's library differs (row 908).

### Static parameters, `where` clauses and sizes (lines 66-85)

- A type parameter that a call does not fix takes its bound, not `Nothing`. Under walk, a parameter bounded by itself stays `OPEN`. In the three `Bottom` cases (rows 591, 612, 587), and for a generic call written as an argument (row 705), I would write the static arguments, as `mk[\ZZ64\]()`.
- I would use only the three `where` forms (P-151). The checker reads any other `where` on an `extends` entry as unconditional, without a message. I would not count on a condition being checked at run time (rows 774, 777; the code generator emits no code for the clause). In compiled code, I would avoid functions whose own clause introduces a variable, as `where [\nat n\]` does (row 867).
- I would write each size in one canonical form, because sizes are equal only by written form after numeral arithmetic. I would treat a numeral arm in a `typecase` over sizes as reachable. Size exponents stay at 4096 or below, and none is negative.
- I would use `reflect` and `NatParam` only under walk. In compiled code, I would not pass a value of a trait that lists a type at a `where`-clause size where the listed type is expected (row 307).

### Numbers (lines 87-116)

- **Number types.** I would never extend a number type. A program's own number type goes below `Number`. Walk refuses an object below one of the seven at load. The checker accepts it, and it dies at class load (row 866).
- **Old type names.** I would replace `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` with `ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64`. A catch-all `typecase` arm is `x: Any =>`, never `x =>`.
- **Numerals.**
  - A numeral converts at a typed binding, an assignment, a field, a parameter and a declared return type. Out of range, it is refused there.
  - Anywhere else it takes its default: `ZZ32`, then `ZZ64` or `ZZ` where it does not fit, and `RR64` with a radix point. The default sticks: after `x = 0.1`, `q: QQ = x` is refused.
  - A `nat` or `int` parameter used as a value is a `ZZ32`.
  - I would write a numeral type only as the parameter type of a coercion or an operator.
- **A program's own number type.** It takes numerals by a generic coercion, with a `where` bound on the numerals it accepts. It needs a prefix `-` to take `-3`. The coercion runs once per site, and each run of the site reuses the value.
- **`array1` and `array2`.** At a program's own number type they give a plain array, not a `Vector` or a `Matrix`.
- **Tests and the fold.** An expression of numerals alone folds exactly before the checker. So a test of run-time arithmetic or concatenation needs a typed variable operand, as `m: ZZ32 = 2147483647`, then `m + 1`. After the fold, a program's own type takes a constant only through a coercion from the constant's default type (`coerce(q: QQ)` for `10/20`). A negated numeral is the exception: it goes through the type's prefix `-`.
- **Conversion at calls.** Walk converts a value other than a numeral by its run-time type. It does not convert at a declared return type (row 387). A generic call promotes to the narrowest common coercion target. Under walk, tuple and varargs elements are not promoted (rows 395, 511). A numeral can choose a strictly more specific overload through its coercion (P-46), with the departures at rows 1016 and 1017.
- **Integer conversion.** I would convert with the checked getters (`asZZ32` and the others), or with the low-bits functions where wrapping is wanted. For a `ZZ` value, I would write `z.asZZ32`, not `narrow(z)`. On the compiled path, only the subset in row 349 exists.
- **`Number`.** I would never call `asFloat`, or any other method or operator, through `T extends Number`. I would declare the function once for each number type. Across types, `=` works only where a coercion links the two types. Otherwise it is a silent `false`, as for a `ZZ64` against an `RR64`. I would compare such values with `asFloat(x) = y`.
- **Division and powers.**
  - An integer `^` answers its base's type. At a negative exponent it raises, so I would write `2.0^(-1)` or use a `QQ` base.
  - `/` on two integers answers a `QQ`, and `DIV` truncates toward zero.
  - For a float result, I would write `(1.0 s) / n`, and `asFloat` on each `ZZ64` operand.
  - Until the switch-over, the compiled path has no `QQ`.

### Reductions and comprehensions (lines 118-130)

- Where a reduction's type is set by a method's return type, a field, a top-level variable or an assignment, I would write its static argument, as `SUM[\RR64\]...`, in any program for both paths (row 1008). For `BIG MIN_MAX`, I would write both arguments (row 1007).
- As a call's argument, a reduction sums in its body's type on both paths.
- Under walk, an empty `SUM` with no declared type is the integer 0 (row 716).
- In my own reduction without an identity, I would declare `simpleJoin` at `R`, never at `Any` or untyped. I would not copy the team's tests here.

### Implementation limits (lines 132-136)

- I would never write a `Maybe` as an `if` condition.
- I would write every parameter type. A return type may be left out where the api declares it, or where the checker can type the body.

## 2. Passages that would mislead, read two ways, or use a term the core does not give

1. **Line 57, against line 64. `SEQV` "follows the specification on both paths."** Line 64 then says that, until the switch-over, the compiler's library has no `=` over `Any` and no `=` on tuples. Its `===` compares strings by `=`, not by identity (row 908). Read literally, line 57 has a worker write a compiled test asserting that two computed equal strings are not `SEQV`, and the test is wrong today. "Both paths" seems to mean "both paths, each on the interpreter's library", but it does not say so. Confidence: high.

2. **Line 24, against line 43. A program's trait with its own functional `+`.** Line 24 says such a trait overlaps the library's array-number `+`, and that walk refuses the program unless the trait excludes `Number` or `HasRank`. Line 43 says that, with `self` read as `T[\X\]` ∩ `X`, the library's array-number `+` is valid beside `AdditiveGroup`'s own. It adds that walk "loads such a pair in the library and in a program's own component". A worker with a self-typed program trait that declares `+` cannot tell which passage applies: does it need `excludes { Number }`, or not? Confidence: medium-high.

3. **Line 7. The sentence classes overlap and leave gaps.**
   - Rows 908, 349 and 441/523 sit inside "Until the switch-over" sentences. So each is both "unsettled, write an `XXX` or a plain test" and "a prelude limit, do not fix".
   - Line 89 states prelude limits (rows 1003, 866) without "Until the switch-over". A worker may fix them in the prelude, which line 7 forbids only for the other class.
   - Line 7 says not to fix such limits "in the compiler's prelude". The core says the prelude is three files of the compiler's library. So it is unclear whether a limit in the library's other files may be fixed.

   Confidence: medium.

4. **Line 5. "Each bold rule states the rule of this tree."** Several bold sentences state a behaviour or a difference between the paths, not a rule:
   - line 17: "Walk's load check is not the verdict";
   - line 74: "Only the checker gives...", where walk's side is row 705;
   - line 122: "the two paths fix an unwritten static argument from different places", where the difference is row 1008;
   - line 134: "Walk has no static types".

   For line 122 especially, a worker cannot tell which path holds the rule. An `XXX` test of the rules' answer would need that answer. Confidence: medium.

5. **Line 7. "do not assert it as correct in a plain test", against "a plain test asserts today's behaviour beside the row".** These read as a contradiction until "as correct" and "beside the row" are weighed. A first read takes the first sentence to forbid plain tests of any ledger-row behaviour. Confidence: medium-low.

6. **Lines 116 and 101. The `/` paragraph says that "a compiled `7 / 2` is a static error" because the library "declares `/` only at `RR64`".** By line 101, `7 / 2` folds to the constant `7/2` before the checker. So the error must come from `QQ`'s absence, not from `/`. The example teaches the wrong cause. It also leaves two questions open:
   - Does `s / n` on `ZZ32` variables run at `RR64` on the compiled path, through a coercion, or is it refused?
   - What does an untyped `lr = 1/1000` do on the compiled path? The text says "under walk ... is a `QQ`" and says nothing of the other path.

   This matters for the model program's constants. Confidence: medium.

7. **Line 32. "`override` widens."** The bold rule tells a worker when to write `override`. Only the last clause says that the code generator refuses every `override` (row 650). The net rule for a compiled program, "write no `override`", is never stated, and a worker who follows the bold rule breaks the compile. Line 32 also says "along two paths" (inheritance paths) in a part where "the two paths" otherwise means walk and the compiled path. And it uses "self-typed trait" before line 36 defines it. Confidence: medium (the net rule); low (the wording).

8. **Line 85. "Such a call runs only under walk, also after the switch-over."** There is no row on this sentence, so by line 7 it is a settled rule. The next sentence ties the compiled failure to row 307, which is an open gap. Is walk-only the design, or the gap? Confidence: medium-low.

9. **Line 134. Walk takes a `Maybe` as an `if` condition.** This is a departure from the specification and the checker, given without a ledger row, so by line 7 it reads as settled. Confidence: low-medium.

10. **Line 41. "Its test returns `self` at the type that a `comprises` clause lists (row 1070). In that arm, bind `self` at the returned type, as `do r: R = self; r end`."** "Its test" has no clear referent: the row's test? `R` is not defined. It is unclear whether every `typecase` of that shape fails, or only one that returns `self` at a type a `comprises` lists. Confidence: medium.

11. **Line 93, against lines 101 and 112. "A numeral type has no getters, no `asFloat`, no `asString` and no `=` with a number type."** Yet `0 = u` is `true` (line 112), and a numeral as the receiver of a dotted call presumably takes its default ("elsewhere", line 97). So is `3.asString` valid or not? The sentence reads as if it is not. Confidence: medium-low.

12. **Line 95, against line 103. "Declared return type" is a place where a numeral converts. Walk "does not" convert at a declared return type (row 387).** The first is about numerals and the second about other values, but nothing marks the difference. A worker may conclude that walk refuses `f(): NN32 = 5`. Confidence: low-medium.

13. **Line 122. "A reduction whose bound does not name its parameter takes its bound, or the expected type where the bound does not fit."** The subject is unclear: the checker, walk, or both? And what does not fit what? Confidence: medium.

14. **Line 48. "In the library, and in your own generic over such a type, write `I extends Index`."** The instruction is unconditional. The paragraph's last sentence takes it back for compiled programs until the switch-over. A worker on the model program, a compiled program, who acts on the first sentence breaks the compile. Confidence: low-medium (the paragraph does correct itself).

15. **Line 5. "Build on a sentence without one, but do not cite it as a decision."** The core's rule says to cite a source for every claim: the brief, an entry of the record, or a primary source. A skill part is none of these, and the core forbids loading `sources.md` for a task. So what does a worker cite for an unmarked sentence? Confidence: medium-low.

16. **Terms that the core does not give:**
    - "the Meet Rule" (lines 24, 30), cited to `SKILL.md`, "Fortress as a language". The core says only "a third covers their meet" and names no Meet Rule; "meet" itself is not defined there. Confidence: medium.
    - "instance", meaning instantiation (lines 11, 13, 15, 122). The core says "instantiation", and an OO reader takes "instance" to mean a value. Confidence: low-medium.
    - "extenders" and "main component" (line 30). Confidence: medium.
    - `Unordered`, `StandardPartialOrder` and `StandardTotalOrder` (line 55). These are library names. `StandardPartialOrder` is written without its static argument, `StandardTotalOrder[\E\]` with one. Confidence: low.

17. **Line 11. The `ident` example never says that `Round` extends `Shape`.** Without that, the pair is valid only by exclusion or a meet, and the example does not illustrate P-45. Confidence: low.

18. **Line 19. "So the checker refuses `f(self, y: S)` beside `f(x: S, self)`."** The text does not say what walk does, or whether walk's behaviour is a departure. Confidence: low.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

The file holds almost no repair history: no batch numbers and no accounts of fixes. The candidates below are small.

1. **Line 134. "Walk will run the checker only after the switch-over (P-12)."** This is a future plan, and it changes no action today. "Walk has no static types" repeats the core (`SKILL.md`, "The phases"). Confidence: medium.

2. **Line 41. "Its test returns `self` at the type that a `comprises` clause lists"; "no test runs such a body".** These describe the test coverage of rows 1070 and 1052, not what a worker should write. The first also blurs the rule (section 2, item 10). Confidence: medium.

3. **Line 89. "The record calls this design route A."** "Route A" is a design-history label. The "tower" half of the sentence prevents a misreading of the record and is worth keeping. "Route A" earns its place only if workers meet it in FACTS. Confidence: low.

4. **Line 114. "Its `ZZ32` power gives 0 at a negative exponent... At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523)."** This is behaviour of a prelude due for deletion, and line 7 forbids fixing it. It helps only to diagnose a strange compiled result. Confidence: low.

5. **Line 95. "`t TIMES 10.0`... Until the switch-over, the compiler's prelude declares neither `TIMES` nor `isInfinite`."** It is niche, and it does not say why `TIMES` is used rather than `*`. It changes an action only for a test that needs an infinity. Confidence: low.

6. **Line 93. "The compiler's prelude follows the same design (P-37)."** It changes no action as written. Confidence: low.

7. **Line 32. "An `override` in a trait also overrides in every type below it."** This is what any reader assumes, so it changes no action. Confidence: low.
