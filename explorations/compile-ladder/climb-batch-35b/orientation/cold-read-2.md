# Cold read 2 of the orientation (climb-batch-35b)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and `explorations/compile-ladder/climb-batch-35b/orientation/orientation.md` (137 lines, titled "What the revival changed in the team's Fortress"). Nothing else was opened. Line numbers below are the orientation's.

## 1. What I would do differently, section by section

### Opening (lines 1-7)

- I would read every sentence by its marker. A P-N sentence is a curator decision that I may cite as one. A sentence with no P-N I build on but do not cite as a decision. A sentence citing a ledger row (or an F-N in place of a row) is unsettled: where the rules decide the case I write an `XXX` test asserting the rule's answer; where they do not, I write a plain test asserting today's behaviour and cite the row. A sentence opening "Until the switch-over" is a limit of the compiler's library: I do not fix it in the prelude.
- I would not call a disagreement among the specification, walk and the compiled path a conflict before searching FACTS and POSITIONS.
- I would distrust old notes, team tests and my own training on three points: the number types do not nest, fixed-width arithmetic raises instead of wrapping, and walk converts arguments.
- Limits I can state: the classification does not say what to do with a sentence that carries both "Until the switch-over" and a row, or a departure that carries neither (section 2, items 1-2).

### Dispatch and overloading (lines 9-24)

- I would allow two overloads that differ only in their static parameters' bounds, and judge them on declared domains (all argument types accepted at some instance within the bounds). The more specific one's return type must fit at every instance, not one.
- With generics, I would judge exclusion over the whole parameter tuple: a generic type named at the same position in both forces equal static arguments; if exclusion then needs a parameter that nothing ties, both paths refuse the pair.
- I would never rely on declaration order for choice, and never take walk's load check as the verdict either way; I would look the case up in `interpreter.md`, "What walk checks", before changing code to satisfy walk.
- I would treat two functional methods with equal parameter types as duplicates wherever `self` stands; never put an abstract and a concrete method with equal types in one trait; and redeclare in the object a functional method whose abstract comes from one trait and body from another (Scala accepts that, Fortress does not).
- When a program's trait declares its own functional `+`, `-`, `MIN` or `MAX`, I would add `excludes { Number }` (or `excludes { HasRank }` if the trait extends `Number`), or put the operator in an object. Otherwise walk refuses at load with "fails the Meet Rule", even though the checker accepts it (row 918).

### Traits and objects (lines 26-64)

- I would never let a type extend two instantiations of one generic trait (the checker refuses it, walk runs it), and not copy the specification's "Not allowed" examples. Under walk I would not overload on two instantiations of one trait (row 416).
- I would read `comprises` as a statement about values, and accept several declarations that jointly cover a meet.
- **`override`**: I would write `override` only when my parameter types are strictly wider than the inherited ones. To replace a method at the same types I would redeclare it without `override`; a Java-style `override` overrides nothing and both paths refuse it (under walk, in the library it stops every program). This is the rule I would most likely get wrong from training.
- For an object implementing an abstract method, I would give bodies that together cover the abstract's parameter types, and prefer one body at those types where static parameters take part (the checker refuses a multi-body cover there, row 725; walk skips the check for generic objects, row 665).
- Self-typed traits: inside one, `self` is `T[\X\]` met with `X`, so I return `self` at `X` without a cast, and I never declare a type extending `T[\A\]` that is not an `A`. In compiled code I would avoid a `typecase` returning `self` in one arm and another value in the other, binding `do r: X = self; r end` instead (row 1070). Before a compiled program relies on a body of `T` calling a method on an `X` in a generic object that lists `T` first, I would write a compiled test (row 1052). Where an object redeclares an abstract dotted method of `T` at the same parameter types, I would keep `T`'s return type (row 1094), or use getters for a method without parameters.
- `Index`: I would index with `ZZ32` or tuples of `Index` types only (`ZZ64` is no `Index`, `()` is none, `Range` excludes it), write `I extends Index` in generics checked against the interpreter's library, and pass a tuple expression at an `I extends Index` parameter rather than at `Index` (row 805). I would not give a function over `Index` and one over a tuple of `Index` types without a cover of their meet.
- Ordering: I would compare tuples only where every element type extends `StandardPartialOrder`, not mix number types at one position under walk (row 511), and not sort a list of `RR64` on the compiled path (P-154).
- Equality: I would expect `=` on a type without its own `=` to be `SEQV`: strings by identity, floats by bits, value objects field by field. So I would give every value object with a string field its own `=`, never compare tuples of four or more by `=` (row 923), and never use `EQV`/`≡` on non-booleans.

### Static parameters, `where` clauses and sizes (lines 66-85)

- I would expect an unfixed type parameter to take its bound (not `Nothing`), and under walk a self-bounded one to be `OPEN`; I would remember the three cases where walk still gives `Bottom`.
- I would write the static arguments of a generic call nested as another call's argument (`mk[\ZZ64\]()`), since walk gives it no expected type (row 705).
- I would use only the three built `where` forms, knowing any other `extends ... where` is silently unconditional, that walk and the compiled runtime do not enforce conditions (rows 774, 777), and that a compiled call of a function whose own clause introduces a variable such as `where [\nat n\]` dies at run time (row 867).
- I would compare sizes only by written form after numeral arithmetic, keep size exponents in 0..4096, and keep `reflect`/`NatParam` out of compiled code (row 307), also after the switch-over.

### Numbers (lines 87-116)

- I would declare a program's number type below `Number`, never below one of the seven value-object number types; I would remember `QQ` is a trait whose values are `Ratio`, and that the record's "tower" does not nest.
- I would replace `Int`, `Long`, `Float`, `BigNum`, `UnsignedLong` by `ZZ32`, `ZZ64`, `RR64`, `ZZ`, `NN64`, and write a catch-all `typecase` arm as `x: Any =>`.
- I would bind a numeral at a typed place to get exact conversion (`q: QQ = 0.1` is 1/10), knowing an untyped binding fixes the default (`x = 0.1` is an `RR64` for good) and that a `nat`/`int` parameter used as a value is a `ZZ32`.
- For my own number type I would declare a numeral coercion generic over `NaturalNumeral[\n, r, v\]` (and `RadixPointNumeral[\n, m, r, v\]`), bound it with `where`, and under walk convert with `v.asZZ32`; I would know its body runs once per written place (compiled: at class load), and that negative constants need my type's prefix `-`.
- In a test of run-time arithmetic or concatenation I would always use a typed variable operand, because expressions of numerals alone (and `||` of string literals) fold before the checker.
- I would not rely on walk converting at a return type (row 387) or between arrow types (row 1083); I would expect promotion at the narrowest common coercion target, "Ambiguous coercion" where coercions tie, and a numeral to pick a strictly more specific declaration that its coercion reaches.
- I would convert integers with checked getters (`asZZ32` ...) where overflow must raise, and with `narrow`/`widen`/`signed`/`unsigned`/`big` only where I want low bits; for a `ZZ`, only `big` and the getters exist.
- I would write `asFloat(x)` (not `x.asRR64`) under the one library, never call arithmetic on a `T extends Number` (declare per type instead), and never compare a `ZZ64` with an `RR64` by `=`, which silently answers `false`.
- I would write `2.0^(-1)` or a `QQ` base for negative exponents, expect `/` on integers to give a `QQ`, and truncate with `DIV`.

### Reductions and comprehensions (lines 118-130)

- I would write the static argument of `SUM`, `PROD`, `BIG MAX`, `BIG MIN` in any program meant for both paths, at least at a method's return type, a field, a top-level variable and an assignment (row 1008), and both arguments of `BIG MIN_MAX` (row 1007).
- When declaring my own reduction without an identity I would type `simpleJoin` at `R`, never `Any` or untyped, and not copy the team's tests.

### Implementation limits (lines 132-136)

- I would never write a `Maybe` as an `if` condition, and would write every parameter type (the checker refuses an untyped parameter unless the exported api gives it).

## 2. Passages that send a worker wrong, read two ways, or use a term the core does not give

1. **Lines 7 with 64, 110, 114: a sentence with both markers.** Line 7 sorts sentences into "cites a row" (write an `XXX` or plain test) and "opens Until the switch-over" (a prelude limit, do not fix). Lines 64 (row 908), 110 (row 349) and 114 (rows 441, 523) open "Until the switch-over" and cite rows. A worker cannot tell whether to write a test against the prelude's behaviour or leave it alone. Confidence: high. Fix: say that "Until the switch-over" wins and the row only records it, or drop the rows from those sentences.

2. **Line 7 with 81, 85, 89: departures with no marker.** Line 5 says to build on a sentence without a P-N as settled. Line 81 ("The code generator accepts a declaration's own `where` clause but emits no code for it, so the compiled runtime does not check it"), line 89 ("The compiler's prelude declares no `QQ`") and line 85 ("Such a call runs only under walk, also after the switch-over") are departures or limits with neither a row nor "Until the switch-over". Read literally, line 81 is a settled fact to build on, not a gap. Confidence: medium.

3. **No statement of which library a compiled program or test targets today (lines 48, 112, 116, and every "Until the switch-over").** The core says each path has its own library and `FORTRESS_LIBRARY=one` switches `fortress compile` to the interpreter's. The orientation never says which a worker uses. So line 48 ("write `I extends Index`") and its last sentence ("the compiler's prelude declares no `Index`, so a program that names it does not compile") pull opposite ways for a program meant for both paths; line 112 says to write `asFloat(x)` and then that the prelude has no `asFloat`, leaving no way given to reach `RR64` on the prelude. Line 48's motive also misleads: "your own generic ... that runs under walk ... write `I extends Index`. Walk runs the code without the bound." Confidence: high that a worker cannot apply these; medium that one is sent wrong.

4. **Lines 22 and 32: how an object "declares the method itself".** Line 22 requires the object to redeclare a functional method inherited abstract from one trait and concrete from another. A Java-trained worker writes `override` there; line 32 says an `override` at the same parameter types overrides nothing and is refused. The two are ten lines apart with no link. Confidence: medium. Fix: add "without `override`" at line 22.

5. **Line 5: "Each bold rule states the rule of this tree."** Three bold sentences describe walk, not the language: "Walk chooses by declared parameter types ..." (15), "Walk's load check is not the verdict of these rules" (17), "Walk has no static types" (134). A worker can take "Walk has no static types" as a rule to preserve, or line 15's walk behaviour as binding on the checker. Confidence: low-medium.

6. **Line 5: "Most rules follow the team's later type papers (`Papers/`) over the specification's early text (P-26; `exploring.md`)."** Reads either as a description of how the existing rules were made or as a precedence a worker may apply to a new conflict. The core says a conflict with no curator decision sends the worker to exploring. Confidence: medium. Fix: say whether P-26 itself settles future paper-versus-specification conflicts.

7. **Lines 57-64: "`SEQV` follows the specification on both paths".** Line 64 then says the compiler's library's `≣` compares strings and four number types by `=`, not by identity or bits (row 908). "Both paths" holds only with the interpreter's library on the compiled path. A worker compiling against the prelude would expect identity on strings. Confidence: medium.

8. **Line 99: "Under walk, write `Byte(v.asZZ32)`".** The sentence before says walk, the checker and the code generator all read `v` as a `ZZ`. Then `Byte(v)` should fail the checker too, and the workaround is for both paths, but the text limits it to walk. In the same passage, "A numeral whose number does not fit there is refused statically" mixes the numeral at the use site with the static argument in the body. Confidence: medium.

9. **Line 43: four references with two readings.** "Declare the object's method at `T`'s return type, with the object's type for `X`" (the object's own type as return type, or `T[\Obj\]`?); "which the rule accepts" (which rule: overriding, or the overloading rules?); "Walk reads `self` in the same way" (as the checker's overloading rules, `T[\X\]`, or as its exclusion test, the meet?); "refuses the valid pair (row 999)" (which pair?). Confidence: medium.

10. **Line 15: "Otherwise it compares the instances that the call makes."** Does "otherwise" cover equal domains as well as overlapping ones, and does walk then pick the more specific instance, or refuse? Confidence: medium.

11. **Line 122: "Where a reduction's bound names its parameter".** "Bound" here is the bound of the reduction's static parameter, which the reader must infer. "A reduction whose bound does not name its parameter takes its bound, or the expected type where the bound does not fit": does not fit what, the expected type or the elements? Confidence: medium.

12. **Line 116: "a compiled `7 / 2` is a static error" because the prelude declares `/` only at `RR64`.** By line 101, `7 / 2` folds to the constant 7/2 before the checker, so `/` is never reached. The operative reason is the prelude's missing `QQ` (line 89). A worker who tests `/` with literals tests the fold instead (as line 101 itself warns). Confidence: medium-low.

13. **Line 91: undefined names in tuple arms.** "Read as a binder that takes any element, on both paths" is followed by "Compiled, with an `Any` selector, the checker refuses that arm: ... unreachable." If the arm takes any element, why is it unreachable? The case that makes both true is not given. Confidence: medium-low.

14. **Line 30: "So a generic trait need not be listed if every type below it is below a listed type, as `Integral[\I\]` below `AnyIntegral`."** Which trait's `comprises` clause does not list it? "Extenders" (same line) is not defined, and what walk checks at load about them is not said. Confidence: low-medium.

15. **Line 11: "at every instance that the argument types allow".** Every instance of which declaration, allowed by which argument types (those in both domains)? Confidence: low-medium.

16. **Library names.** The file says "the interpreter's library" in most places, "the one library" at 99, 112 and 116, and bare "the library" at 24, 48, 64, 99 and 112. The core defines "one library" as the interpreter's library, but the two names inside one file read as two libraries, and the bare form reads as either path's. Likewise "compiler's library" (7, 64, 114) and "compiler's prelude" (elsewhere): the core makes the prelude three files of the compiler's library, so line 7 ("a limit of the compiler's library ... do not fix it in the compiler's prelude") leaves open whether the other files of the compiler's library may be fixed. Confidence: low-medium.

17. **Line 130: "`BIG MAX` over a generator still answers `R`."** The answer over an empty generator is not given, and "lifts its elements to `Maybe[\R\]`" suggests it might be `Nothing`. Confidence: low-medium.

18. **Terms not in the core or used before their definition.** "self-typed" at line 32, defined at 36. "Count stage" (48) is used, but not defined, in the core too. `0#n` (120) is not given (n elements from 0, or 0 to n?). What an `XXX` test does (an expected failure) is only named in the core's description. "Instance" (11, 15) is used for "instantiation", the core's word. Confidence: low.

19. **Line 105, row 1016: "as `a = 0` for `a: Any`".** The outcome is not stated, so the worker cannot recognise the departure or test it. Confidence: low.

20. **Line 19: "So the checker refuses `f(self, y: S)` beside `f(x: S, self)`".** Walk's verdict is not given and no row is cited, so a worker cannot tell whether walk agrees or departs. Confidence: low.

21. **Line 134: "Walk will run the checker only after the switch-over (P-12)."** Reads as a plan (walk will gain the checker) or as a limit (not before). Confidence: low.

## 3. Repair history and detail that changes no action and prevents no misunderstanding

The file holds no repair history in the strict sense: no passage says what was fixed when. The P-N, F-N and row citations carry the history by reference. The passages below are detail that changes no action of a worker writing or fixing code, and prevents no misunderstanding the rest of the file does not already prevent:

1. **Line 43:** "By this reading of the exclusion test, the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own." This justifies library code and gives the worker nothing to do.
2. **Line 93:** "The compiler's prelude follows the same design (P-37)." No action follows, before or after the switch-over.
3. **Line 32:** "The code generator refuses some forms where static parameters take part (`compiler.md`, row 1106)." It names no form, so it is only a pointer.
4. **Line 30:** "At load, walk checks extenders only against the clauses of the program's main component (row 551)." No action is stated. It would earn its place only as "walk's acceptance does not show that a library's `comprises` clause holds".
5. **Line 68:** the `OPEN`/`pick((1, 2))` example (row 663). A narrow walk dispatch case; it belongs in `interpreter.md`.
6. **Line 83:** "The class loader computes a size without checking its kind, and stops on a negative exponent with a Java exception (row 675)." The action (no negative size exponents) already follows from walk refusing them.
7. **Line 91:** the second half, from "In a tuple arm ..." to the checker's "unreachable" message. These are observations. The one action, "check every name in a tuple arm, since a misspelt type there matches anything under walk", is not written.
8. **Lines 110 and 114:** the inventory of the prelude's getters and powers, including "At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523)". By line 7 the worker must not fix these. They change an action only for a program compiled against the prelude, which the file never says a worker writes (section 2, item 3). If workers target the one library, these belong in `compiler.md`.
9. **Line 124:** the walk departures for rows 717 and 436 ("a written static argument that is not a number type ends an empty `SUM` in `CastError`"). Narrow; row 716 (empty `SUM` gives integer 0) is the only one a model-program worker is likely to meet.
10. **Line 105, row 1016:** with no outcome stated (section 2, item 19), it changes nothing as written.
11. **Line 134:** "Walk will run the checker only after the switch-over (P-12)." A plan, with no action today. The core already says walk switches the checker off.
12. **Line 5:** "Where a rule changed the specification, Appendix I keeps the original text (`specification.md`)." It belongs in `specification.md`. The definition of "Working Draft" in the same line is needed, since lines 11, 28 and 50 use it.

I checked these and kept them, because they each prevent a misunderstanding: "The Scala language accepts it" (22), "A Java `permits` list ..." (30), the `≣`/`≡` naming (57), "The record calls the number types 'the tower'" (89), and "The team's tests declare `simpleJoin` so: do not copy them" (130).
