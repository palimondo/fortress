# Cold read 2: `climb-batch-33b/orientation/orientation.md`

What I read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core) and the orientation. I opened nothing else. Line numbers are the orientation's.

## 1. What I would do differently, by section

### Preamble (lines 1-7)

- I would sort each sentence before I act on it. A sentence that names P-N is a curator decision, and I would cite it as one. A sentence that cites a ledger row is unsettled: it is a known departure or an undecided case, and it can change. A sentence with neither is something to build on, but not to cite as a decision.
- For a row sentence where the rules decide the case, I would assert the rule's answer in an `XXX` test. Where the rules do not decide it, I would assert today's behaviour in a plain test and cite the row.
- A sentence that opens "Until the switch-over" is a limit of the compiler's library. I would not fix it in the compiler's prelude.
- Before I call two sources a conflict, I would check this file, then FACTS and POSITIONS.
- I would not trust old notes, team tests or my training on three points: the number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments. Where the specification's early text and the type papers disagree, I would follow the papers. The Working Draft is in `Specification-1.0-frozen/`. Appendix I holds the original text of passages that a rule changed.
- Limits: the sorting works sentence by sentence, but some departures carry no row (section 2, items 2 and 4). The preamble does not say what to cite for a plain sentence.

### Dispatch and overloading (lines 9-24)

- I would accept overloads that differ only in their static-parameter bounds. I would judge specificity by declared domains. I would check the return-type rule at every instance that the argument types allow, not at one.
- I would read exclusion over the whole tuple of parameter types. Where both declarations name the same generic type at a position, the two static arguments are equal. A pair whose exclusion needs a static parameter that nothing ties stays invalid on both paths. In the checker's exclusion test, the meet of a parameter's bounds takes the parameter's place, except inside a static argument.
- Under walk, I would expect the choice to follow declared types, not the order of declarations. I would expect "Cannot unify" when a generic method's argument is outside a bound.
- I would not change code to pass walk's load check, or take walk's acceptance as proof, until I had found the case in `interpreter.md`, "What walk checks".
- The position of `self` does not make two functional methods different. One trait may not hold an abstract and a concrete method with the same parameter types. An object that gets an abstract method from one trait and its body from another must declare the method itself.
- When a program's trait declares its own functional `+`, `-`, `MIN` or `MAX`, I would add `excludes { Number }`, or `excludes { HasRank }` if the trait extends `Number`, or declare the operator in an object. Otherwise walk refuses the program with "fails the Meet Rule", and the checker does not catch it against the library (row 918).
- Limits: the section does not say what walk does with the `self`-position duplicate. It is unclear whether a program's self-typed trait needs the fix (section 2, item 6).

### Traits and objects (lines 26-64)

- I would never make a type extend two instantiations of one generic trait. The checker refuses it. Walk runs it, but cannot overload on the two instantiations (row 416). I would not copy specification examples marked "Not allowed".
- I would read `comprises` as a statement about values. Several declarations together may cover a meet. Walk checks extenders only against the main component's clauses (row 551).
- `override` only widens. To redefine a method at the same parameter types, I would redeclare it without `override`. A Java-style `override` in the library stops every program under walk. The code generator refuses every `override` (row 650), so a program that must compile writes none.
- An object may cover an inherited abstract method with one body or with several narrower bodies. Walk skips this check for a generic object (row 665). The checker refuses a cover by several bodies when static parameters are involved (row 725).
- In a self-typed trait, `self` has the type `T[\X\]` met with `X`, so no cast is needed. A type that extends `T[\A\]` must be an `A`. In a compiled `typecase` that returns `self`, I would bind `self` first: `do r: X = self; r end` (row 1070). Before compiled code relies on a body of `T` that calls a method on an `X` (row 1052), I would write a compiled test of it.
- I would bound index parameters with `Index`. Of the integers, only `ZZ32` is an `Index`. A tuple of `Index` types is an `Index`, but `()` is not. `m[i, j]` passes one pair. I would not overload a function over `Index` beside one over a tuple of `Index` types.
- Pairs and triples compare only where every element type extends `StandardPartialOrder`. The checker gives no order to a list of `RR64`.
- Where a type declares no `=`, `=` is `SEQV`. So value objects that hold strings from two computations, and tuples longer than three (row 923), compare `false`. I would give such a value object its own `=`, or compare the parts. Under walk I would write `a <-> b`, not `EQV` or `≡` (row 184).
- Limits: the advice on `Index` contradicts itself for a program that runs on both paths today (section 2, item 1). Ordering and equality are filed under this heading, though they are not about traits.

### Static parameters, `where` clauses and sizes (lines 66-85)

- A type parameter that a call does not fix takes its bound, not `Nothing`. Under walk, a parameter whose bound names itself prints `OPEN`. A parameter gets `Bottom` in the three listed cases.
- Under walk, I would write the static arguments of a call that is itself an argument, such as `mk[\ZZ64\]()`.
- I would use only the three built `where` forms. Neither path applies the condition of a conditional extension at run time (row 774). Compiled code does not check a declaration's own `where` clause. On the compiled path I would avoid functions whose clause introduces a variable, such as `where [\nat n\]` (row 867).
- Sizes are equal only when they are written alike after numeral arithmetic. A size power may not exceed 4096 and may not be negative.
- I would use `reflect` and `NatParam` only under walk, also after the switch-over (row 307).

### Numbers (lines 87-116)

- I would never extend a number type. A program's own number type goes below `Number`.
- I would replace the team's names: `Int` with `ZZ32`, `Long` with `ZZ64`, `Float` with `RR64`, `BigNum` with `ZZ`, `UnsignedLong` with `NN64`. A catch-all `typecase` arm is `x: Any =>`. An undefined name in a tuple arm silently binds anything (row 1064).
- I would declare a type wherever a numeral's type matters, because the default sticks: after `x = 0.1`, `q: QQ = x` is refused. Under walk, `lr = 1/1000` is a `QQ`, so I would write `lr: RR64 = ...`.
- A numeral type may appear only as the parameter type of a coercion or an operator. A program's own number type takes numerals through the generic coercion pattern of the `Byte` example. Negation reaches the type through its prefix `-`. A folded constant reaches it only through a coercion from the constant's default type.
- To test run-time arithmetic or concatenation, I would use variable operands, because an expression of numerals alone folds exactly.
- Walk chooses a coercion by the run-time value. A generic call promotes to the narrowest type into which all its arguments coerce. An ambiguous coercion stops both paths. A declaration that takes the numerals at their default wins.
- To convert between integer types, I would use the checked getters (`asZZ32` and the others). `narrow`, `widen`, `signed`, `unsigned` and `big` keep the low bits and never raise. For a `ZZ`, I would write `z.asZZ32`. Until the switch-over, the compiler's prelude has only a subset of these (row 349).
- Generic code over `T extends Number` can call nothing on a `T`, so I would write one overload for each number type. `=` between types that no coercion joins is silently `false`, as for a `ZZ64` against an `RR64`, so I would compare through `asFloat`.
- Integer `/` gives a `QQ`, so I would use `DIV` to truncate. For a float result I would make one operand a float. A `ZZ64` operand needs `asFloat`. For a fractional power I would use a float or `QQ` base, never `10^(-k)`.

### Reductions and comprehensions (lines 118-130)

- In a program for both paths, I would write the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` wherever the value lands in a method's return, a field, a top-level variable or an assignment (row 1008). I would write both static arguments of `BIG MIN_MAX` (row 1007). A reduction passed as an argument sums in its body's type.
- Under walk, I would not rely on an untyped empty `SUM` (row 716).
- In my own reduction, I would declare `simpleJoin` at a specific type, never at `Any` or untyped, and I would not copy the team's tests.

### Implementation limits (lines 132-136)

- I would never write a `Maybe` as an `if` condition.
- I would write every parameter type, because the compiled checker refuses a missing one unless the api supplies it.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

1. **Line 48, the `Index` bound (high confidence).** "Write `I extends Index` ... in your own generic over such a type that runs under walk", then "Until the switch-over, the compiler's prelude declares no `Index`, so a program that names it does not compile", then "Walk runs the code without the bound." For a program meant for both paths today (a suite test, a model line), these three sentences give opposite instructions, and the passage does not say which one wins. It should say plainly what to write for a program that both paths run before the switch-over.
2. **Lines 5 and 7: does a P-N cover its sentence or its paragraph? (medium confidence).** The preamble works sentence by sentence, but the P-N markers sit on bold rules, and the sentences after them carry none. One example is the return-type rule at every instance (line 11). Another is "declared domain". A strict reader takes those as rules to build on but not as decisions. A loose reader takes the whole paragraph as P-45.
3. **Line 5, "Build on a sentence without one, but do not cite it as a decision" (medium confidence).** The core says every claim cites the brief, an entry of the record or a primary source. This file is a skill part, not the record, so a worker cannot tell what to cite for a plain sentence.
4. **Departures that carry no row, so the preamble's sorting misreads them (medium confidence).**
   - Line 81: "The checker reads an `extends` entry with any other `where` clause as unconditional, without a message."
   - Line 81: "The code generator accepts a declaration's own `where` clause but emits no code for it."
   - Line 114: "Its `ZZ32` power gives 0 at a negative exponent". The rows appear only in the next sentence.
   - Line 89: "The compiler's prelude declares no `QQ`." This is a limit of the compiler's library that does not open "Until the switch-over". By line 7's convention it reads as settled, and a worker might add `QQ` to the prelude.
5. **Line 5, "Each bold rule states the rule of this tree" (medium confidence for line 122, low for the others).** Several bold sentences are not rules of the tree. Line 122 says only that "the two paths fix an unwritten static argument from different places". It does not say which path is the target outside the cases of row 1008. Lines 17 ("Walk's load check is not the verdict") and 134 ("Walk has no static types") describe walk.
6. **Line 24 against line 43 (medium confidence).** Line 24 says that a program's trait with its own functional `+` needs `excludes { Number }`. Line 43 says that a self-typed trait's own `+` (`AdditiveGroup`'s) is valid beside the library's `+` between an array and a number, and that walk loads "such a pair ... in a program's own component". A worker with a self-typed trait, such as `trait V[\X extends V[\X\]\]` with `opr +(self, o: X): X`, cannot tell whether line 24's fix applies.
7. **Line 55, `(1,2) < (1,2.5)` (medium confidence).** The passage names the departure (row 511) but not the rule's answer. Line 7 tells the worker to assert "their answer" in an `XXX` test, so the worker cannot write that test without opening sources.
8. **Lines 101 and 116, quotient constants on the compiled path (medium confidence; matters to microGPT).** The passage says that "a compiled `7 / 2` is a static error" and that "under walk `lr = 1/1000` is a `QQ`". By the fold rule, `lr: RR64 = 1/1000` should convert to `RR64` on both paths, but the passage never says so. A worker may over-generalise and avoid typed quotient constants. A second question (low confidence) is whether the compiled `s / n` for `ZZ32` variables reaches `RR64`'s `/` by coercion, while walk gives a `QQ`. If it does, the paths differ silently.
9. **Line 32, `override` (low to medium confidence).** First, "An `override` in a trait also overrides in every type below it" can mean two things: a plain consequence of inheritance, or an override that reaches types that inherit the method by another path. Second, since the code generator refuses every `override` (row 650), the widening rule cannot be used in a program that must compile. The section never says "write no `override` in a program for both paths" as an action, and it never says how to widen there.
10. **Line 91, tuple arms (low to medium confidence).** "On both paths" an undefined name in a tuple arm is read as a binder, yet the compiled checker refuses that arm as "unreachable". The passage does not say which reading the compiled path really takes, or why the arm becomes unreachable.
11. **Line 101, "the constant" (low to medium confidence).** The rule that a program's own type takes "the constant only through a coercion from its default type" also covers folded integers: `b: Byte = 2 + 3` would need a coercion from `ZZ32`, not the numeral coercion. The only example is a quotient, so a reader may take the rule to cover quotients only.
12. **Line 122, "takes its bound, or the expected type where the bound does not fit" (low to medium confidence).** The passage does not say what fails to fit what.
13. **Line 93, numerals and `=` (low confidence).** "No `=` with a number type" seems to contradict line 112, where `u = 0` is `true` through the coercion. A forward pointer to line 112 would remove the doubt.
14. **Line 130, generic reductions (low confidence).** "A generic one stops at its first join." The passage does not say how it stops (a run-time error?) or whether this is a departure (it cites no row). "`BIG MAX` over a generator still answers `R`" also invites a question it does not answer: what does an empty generator give?
15. **Line 19, duplicate functional methods (low confidence).** The rule that the position of `self` does not count is stated for the checker only. Walk's behaviour is not given.
16. **Line 41, "lists `T` first in its `extends` clause" (low confidence).** It implies that other orders are tested. It does not say whether listing `T` second is safe.
17. **Line 28, "Not allowed" (low confidence).** The specification marks the Working Draft's examples that break the rule as "Not allowed". A worker reading the Working Draft itself (`Specification-1.0-frozen/`) sees no mark. The usable rule is: any example that extends two instantiations of one generic trait is wrong.
18. **Line 7, which test cites the row (low confidence).** The plain test is told to cite the row, but the `XXX` test is not.
19. **Lines 7, 48 and 64 to 116: "the compiler's library" against "the compiler's prelude" (low confidence).** The core says the prelude is three files of the compiler's library, and this file uses both names. "Do not fix it in the compiler's prelude" then leaves the compiler library's other files unclear.
20. **Line 57, the compiled path's `<->` and `EQV` (low confidence).** The passage does not say whether the compiled path has `<->`, or what it does with `EQV`.
21. **Terms that the core does not give (low confidence each).**
    - "meet": the core uses it in passing but defines only "join".
    - "the Meet Rule": line 24 cites it to `SKILL.md`, which names only the Return Type Rule.
    - "instance" (lines 11, 13 and 15).
    - "self-typed": used at line 32 and defined only at line 36.
    - "extenders" (line 30).
    - `Unordered` (line 55).
    - "count stage" (line 48): the core mentions it once and never says what it is.
    - `TIMES` (line 95).
    - `0#n` (line 120).
    - the P-N numbering.
    - "route A" (line 89).

## 3. Passages that hold repair history, or detail that changes no action and prevents no misunderstanding

1. **Line 89, "The record calls this design route A" (medium confidence).** This is a nickname from the design history. The other half of the sentence, that the record "still calls the number types 'the tower'", does prevent a misreading of the record, so I would keep that half.
2. **Line 95, the recipe for an infinity (low to medium confidence).** It covers `10.0^308`, `t TIMES 10.0`, `isInfinite` and the prelude's lack of both. It serves a single kind of test and belongs in `tests-writing.md` or `library.md`.
3. **Line 114, the last two sentences (low to medium confidence).** The compiled `ZZ32` power gives 0 at a negative exponent, and a base of 0 throws a Java exception that no `catch` sees. These describe prelude behaviour that the worker is told not to fix and that ends at the switch-over. The action, no negative integer exponents, is already given.
4. **Line 64, the last sentence (low confidence).** The compiler's `===` compares by `=` (row 908). It is the same kind of switch-over detail as item 3.
5. **Line 83, the last sentence (low confidence).** The class loader stops on a negative size exponent with a Java exception (row 675). The action already follows from the size rules.
6. **Line 130, the bold sentence on lifting to `Maybe[\R\]` (low to medium confidence).** It describes an internal mechanism. The actions are to declare `simpleJoin` at `R` and to expect that `BIG MAX` still answers `R`.
7. **Line 41, "no test covers such a body" (low confidence).** This is the state of the test coverage, which is repair state. Only the action, "write a compiled test before relying on it", needs to stay.
8. **Line 134, "Walk will run the checker only after the switch-over (P-12)" (low confidence).** It states a plan and changes nothing a worker does today.
9. **Lines 89, 91 and 95, quoted message texts (low confidence).** The quotes are 'Attempt to extend object type ZZ32', 'Invalid type in extends clause', 'The typecase clause ... is unreachable', 'Type mismatch binding' and 'got arg'. They help a worker recognise an error, but they change no action. They are borderline, so keep them only if the orientation is also meant for debugging.
10. **Line 99, `array1` and `array2` at a program's own number type (low confidence).** This is a library detail that belongs in `library.md`.

I found no repair history beyond item 1.
