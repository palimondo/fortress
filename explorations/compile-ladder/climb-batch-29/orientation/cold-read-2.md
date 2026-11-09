# Cold read 2 of the orientation

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and `explorations/compile-ladder/climb-batch-29/orientation/orientation.md` (121 lines). Nothing else was opened. Line numbers below are the orientation's.

## 1. What I would do differently, section by section

### Preamble (lines 1-7)

- I would take the bold rules as the tree's answer wherever the specification, walk with the interpreter's library and the compiled path with the compiler's library disagree, and not resolve a disagreement myself.
- I would read each sentence by its marker. A sentence with P-N is a curator decision: I carry it out, and question it only on new evidence. A sentence with no marker is a rule I build on, but I would not cite it as a decision. A sentence with a ledger row is a defect of one path: I would not assert that behaviour as correct in a test. A sentence that opens "Until the switch-over" is a limit of the compiler's library: I would not fix it in the compiler's prelude.
- Before I called something a conflict, I would search FACTS and POSITIONS. Where a team test, an old note or my training disagrees with this file on nesting of numbers, wrapping arithmetic or argument conversion, I would trust this file.
- I would use `Specification-1.0-frozen/` only as the unrevised text, and prefer the later type papers over the specification's early text (P-26).
- Limits: the markers work sentence by sentence, but the file does not say what I cite for an unmarked rule, or which text wins when a P-N paraphrase here differs from POSITIONS (section 2, items 1-3).

### Dispatch and overloading (lines 9-24)

- I would accept overloads that differ only in the bounds of their static parameters (P-45). I would judge them by declared domains, and check that the more specific return type is a subtype at every instance.
- I would check exclusion over the whole tuple of parameters (P-152): a shared `Box[\T\]` position ties the instances together, and a static parameter that no position ties makes the pair invalid on both paths. In its exclusion test, the checker puts the meet of the bounds in place of a bare parameter, but not inside a static argument (P-157).
- I would never rely on the order of declarations under walk.
- I would not treat walk's load check as the verdict, either to change code until it passes or to prove validity. I would look up the case in `interpreter.md`, "What walk checks", first.
- I would treat `f(self, y: S)` and `f(x: S, self)` as duplicates, and an abstract and a concrete method at the same types as duplicates. An object that inherits an abstract method from one trait and its body from another must declare the method itself (P-149), which Scala does not require.
- I would expect the Meet Rule to count abstract functional methods. For a program's trait that declares its own functional `+`, `-`, `MIN` or `MAX`, I would add `excludes { Number }` or `excludes { HasRank }`, or move the operator into an object (P-160). A clean compile is not proof, because the checker accepts the clash against the library's `+` (row 918).

### Traits and objects (lines 26-62)

- I would never let a type extend two instantiations of one generic trait (P-43, P-97). I would not copy the specification's examples marked "Not allowed". Walk runs such a type, and refuses `g(Tg[\3\])` beside `g(Tg[\4\])` (row 416).
- I would read `comprises` as a statement about values, not a list of direct subtypes (P-60).
- I would use `override` only to widen parameter types, and redeclare without `override` to replace a method at its own types. I would never put a Java-style `override` into the library, since walk then refuses every program. I would keep `override` out of compiled code (row 650).
- In an object, I would cover each inherited abstract method with one or more bodies (P-147). I would not count on walk to catch a gap in a generic object (row 665).
- In a self-typed trait, I would use `self` as `T[\X\]` met with `X` and leave out the cast. I would expect a compiled body that returns `self` to fail verification (row 695).
- In generic code over an indexed type, I would write `I extends Index` (P-156), but not in a compiled program before the switch-over. Only `ZZ32` among the integer types is an `Index`, so a `ZZ64` cannot index. A tuple of `Index` types is an `Index`, so `m[i, j]` passes one pair, and `()` is not one.
- I would order tuples only where every element type is a `StandardPartialOrder`, and lists in checked code only over a `StandardTotalOrder` (P-154).
- Equality is the largest change. Where a type declares no `=`, `=` is `SEQV` (P-168). Strings are reference objects, so a value object with a string field compares `false` against an equal copy built by another computation. Tuples longer than three fall back to `SEQV`. For a value object I would declare `=`, or compare the fields. For booleans I would write `<->`, never `EQV` or `≡` (row 184). I would remember that the compiled `===` compares by `=` (row 908).

### Static parameters, `where` clauses and sizes (lines 64-83)

- I would expect a type parameter that no argument fixes to take its bound (P-48). Under walk, a self-bounded parameter shows as `OPEN`. I would watch for the three cases where walk still gives `Bottom` (rows 591, 612, 587).
- Under walk, I would write the static arguments of a generic call that is itself an argument, as `mk[\ZZ64\]()` (row 705).
- I would use only the three `where` forms (P-151). Any other `where` on an `extends` entry is read as unconditional, with no warning. I would not rely on a conditional extension or a method's `where` condition being checked at run time on either path, and I would keep `where [\nat n\]` out of compiled calls (row 867).
- I would compare sizes by how they are written (P-55): `s0 s1` is not `s1 s0`, and a `typecase` arm on a numeral size is reachable.
- I would get a size known only at run time from `reflect`, under walk only. I would not expect the switch-over to make it run compiled (row 307).

### Numbers (lines 85-103)

- I would read "route A" and "the tower" in the record as names. Neither means that the number types nest (P-43).
- I would expect a numeral to convert exactly at a typed place (P-173): a typed binding, an assignment, a field, a parameter or a declared return type. Anywhere else it takes its default, and that default stays: after `x = 0.1`, the binding `q: QQ = x` is refused.
- I would write a numeral type only as the parameter type of a coercion or an operator (P-174). A number type of my own would get numerals through `coerce(x: NaturalNumeral)`, or through `coerce(x: IntLiteral)` in compiled code before the switch-over. That coercion runs once for each place where a numeral is written.
- Constant folding is the key trap for tests. Expressions of numerals alone fold exactly before the checker, so a test of overflow or of run-time concatenation needs a typed operand, as `m: ZZ32 = 2147483647`, then `m + 1`.
- I would expect a generic call to promote to the narrowest common type (P-74). Under walk, a value is not converted at a declared return type (row 387).
- To convert between integer types, I would use the checked `asZZ32`-style getters, and `narrow` or `widen` only where I want the low bits kept. A `ZZ` has only `big`.
- I would call nothing on `T extends Number` (P-165). A `ZZ64` against an equal `RR64` is silently `false` under `=`, so I would compare with `asFloat`.
- `^` answers its base's type, and a negative exponent raises unless the base is 1 or -1 (P-153). For a fraction, I would write a float or `QQ` base.
- `/` on two integers gives a `QQ`, so I would truncate with `DIV`. In compiled code before the switch-over, `/` exists only at `RR64`.

### Reductions and comprehensions (lines 105-115)

- I would write the static argument in every clause form of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` (row 731).
- Under walk, only a local variable's type or a function's return type directs the instance. A method's return type, a field, a top-level variable, a parameter and an assignment do not.
- I would declare `simpleJoin` at `R`, never at `Any` or untyped, and not copy the team's tests that do.

### Implementation limits (lines 117-121)

- I would not take a program that runs under walk as well typed. I would use only `Boolean` conditions, though walk also takes a `Maybe`.
- I would write every parameter type. A return type may be left out where the api declares one.

## 2. Passages that could send a worker wrong, read two ways, or use a term the core does not give

1. **Line 5, which sentences are decisions.** The marker works sentence by sentence, but most paragraphs put the P-N only on the bold sentence and follow it with unmarked sentences (for example lines 11, 30, 34, 66 and 89). Read literally, "A declaration's declared domain is ..." (line 11) is no decision. A worker cannot tell whether the P-N covers the whole paragraph. Confidence: medium-high.
2. **Line 5, "Build on a sentence without one, but do not cite it as a decision."** The core requires a source for every claim: the brief, the record or a primary source. This file is none of these. For an unmarked rule such as "`override` widens" (line 32) or "Walk chooses by declared parameter types" (line 15), the file does not say what the worker cites. Confidence: medium.
3. **Line 5, a paraphrase against POSITIONS.** The core says to carry out decisions "as the record states them". This file does not say which text wins if its paraphrase of a P-N differs from POSITIONS. Confidence: low-medium.
4. **Line 7, "do not assert it as correct in a test."** This reads two ways. It could mean: write the test for the bold rule as an `XXX` expected failure (the core names `XXX`). Or it could mean: leave the value unasserted. Confidence: medium-low.
5. **Line 7, sentences that carry two markers.** Several compiler's-library limits cite a row too, in a sentence that does not itself open "Until the switch-over": line 62 (`===`, row 908), line 97 (row 349) and line 101 (rows 441, 523). One convention says do not fix them in the prelude. The other says they are departures that a fix can change. Line 62's "row 923 holds the question of longer tuples" is an open question, not a departure, which matches neither convention. Confidence: medium.
6. **"compiler's library" and "compiler's prelude"** are used for the same thing (lines 7, 48, 62, 89, 91, 97, 101, 103). The core says that the prelude is three files of the compiler's library. A worker cannot tell whether a limit outside those three files is also left alone. Confidence: low-medium.
7. **Departures with no ledger row.** Line 17 says that "a case that cites a ledger row is a departure of walk". These sentences describe a path parting from a bold rule but cite no row:
   - line 43: walk's load check still refuses the pair in two cases;
   - line 79: the checker reads any other `extends`-`where` as unconditional "without a message", and the code generator "emits no code" for a declaration's own `where`;
   - line 66: under walk, `OPEN` is compared as `Bottom`;
   - line 81: walk refuses a negative size exponent, but the checker's limit is stated only above 4096;
   - line 119: walk accepts a `Maybe` condition.

   A worker cannot tell whether each is intended, a known gap or an unrecorded gap to file. Confidence: medium-high for lines 43 and 79, medium for the others.
8. **Line 72, "Only the checker gives a call written as an argument the enclosing call's context (P-51)."** The word "Only" makes walk's behaviour part of the rule, but row 705 marks it as a departure. Should walk be fixed? Confidence: medium.
9. **Line 89, "A `nat` or `int` parameter used as a value is a `ZZ32`".** This contradicts the core ("`nat` is an `NN32` value, `int` a `ZZ32`"). A worker who reads both cannot tell whether `u: NN32 = n` binds. In the same paragraph, "A size of 2^31 or more ... is a `ZZ64` under walk and raises compiled (row 962)" does not say which path is the departure. Confidence: high for the contradiction, medium for row 962.
10. **Line 66, the `pick` example.** The paragraph is about a self-bounded parameter, but the example gives `T` no bound. By P-48, an unbounded `T` would take `Any`, not `OPEN`. "Every value passes `OPEN` itself" sits beside "a type that holds `OPEN` admits only what it admits at `Bottom`". So it is unclear whether `pick((1, 2))` succeeds when `pick(x: (T,T))` is the only overload. The core's "every value passes it" does not have this qualification. Confidence: medium.
11. **Line 17, "walk compares two functional methods ... on their declared domains only at a call (row 780)."** This reads two ways. It could mean that walk compares them only at call time, not at load. Or it could mean that at a call, walk compares only the declared domains, not the instances. Confidence: medium.
12. **Line 48, `Index` on both paths.** The file says to write `I extends Index` in your own generic, and also to write it only in code that runs under walk or is checked against the interpreter's library. It does not say what a test meant for both paths should do. Without the bound, the count stage refuses it. With the bound, it does not compile. The core asks for tests on both paths in some cases. Confidence: medium.
13. **Line 28, "The specification marks the Working Draft's examples that break the rule 'Not allowed'."** This does not say which text carries the mark, `Specification/` or `Specification-1.0-frozen/`. Confidence: low-medium.
14. **Line 93, "under walk `lr = 1/1000` is a `QQ`".** The fold runs "on both paths", but line 103 says the compiled path has no `QQ`. The compiled result of a folded `1/1000` is left to inference. Confidence: low.
15. **Line 97, "Each `bitsAs…` getter equals `unsigned` or `signed`".** The `bitsAs…` getters are not introduced, and the line does not say whether to use them or avoid them. Confidence: low.
16. **Line 109, "Other reductions take their bound, or the expected type where the bound does not fit."** The subject is unclear: the checker or both paths. Confidence: low.
17. **Line 121, row 405.** This does not say which behaviour is the departure: walk running a parameter without a type, or walk refusing one in a method that implements an abstract one. The bold rule matches the refusal. Confidence: low-medium.
18. **Line 11.** `Round` is not stated to extend `Shape`. "At every instance" is unclear for two declarations whose instances range over different bounds. Confidence: low.
19. **Line 95, "(P-59)".** It is unclear whether walk's choice of coercion by run-time value is part of the decision or a departure. Confidence: low.
20. **Terms the core does not give (all low):**
    - `HasRank` (line 24; inferable as the arrays' trait);
    - Appendix I (line 5; the core names it only in its list of parts);
    - "count stage" (line 48; the core mentions it but does not define it);
    - `0#n` (lines 107 and 109; range syntax);
    - `StandardPartialOrder`, `StandardTotalOrder` and `Unordered` (line 53; it is unclear whether `Unordered` is a value or an exception);
    - `BIG //` (line 115);
    - `<->` (line 55; implied to be boolean equivalence);
    - "the five integer types" (line 89).
21. **Structure (low).** Equality (`SEQV`), tuple and list ordering, and `Index` sit under "Traits and objects". A worker looking for `=` on numbers starts in "Numbers", and line 99 sends them back. The core's own pointer, `revival-changes.md`, "Static parameters", matches this heading only by its prefix.
22. **Line 115.** The file does not say what an empty `BIG MAX` or `BIG MIN` answers, although a reduction without an identity is the subject. Confidence: low.

## 3. Repair history, and detail that changes no action and prevents no misunderstanding

The file holds almost no repair history: no "was fixed" or "no longer" narrative. Candidates under the two questions:

1. **Line 91, "Other departures from these rules are rows 958, 960, 966 and 968 under walk, and rows 957, 961, 963, 964 and 965 compiled."** This bare list of row numbers changes no action. The pointer to `interpreter.md` and `compiler.md` is enough. Confidence: medium.
2. **Line 87, "Route C is the way not chosen: a checker rule under which the number types could nest again."** This is the history of a decision. "Route A" and "the tower" decode the record's words and are worth keeping, but route C matters only if the record still proposes it. The missing route B also invites a question. Confidence: low-medium.
3. **Line 43, "With this reading and the bounds that the test reads ..., the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own. Walk reads `self` in the same way, so it loads such a pair in the library ..."** This justifies the library's present state. It helps only a worker who would otherwise "fix" that pair. Confidence: low.
4. **Line 62, "A float numeral converts where `RR64` is declared ("Numbers"), so `y: RR64 = 0.5` is `SEQV` a computed `RR64` 0.5."** This restates "Numbers" and adds no action. Confidence: low.
5. **Line 97, "Each `bitsAs…` getter equals `unsigned` or `signed`"** changes no action as written (item 15 above). Confidence: low.
6. **Line 119, "Walk will run the checker only after the switch-over (P-12)."** This is a future plan, with no action for current work. Confidence: low.
7. **Line 15, "It infers a dotted generic method's static arguments from the arguments' run-time types, as for a generic function."** This changes no action. Confidence: low.
