# Cold read of the orientation (climb-batch-31)

File read: `explorations/compile-ladder/climb-batch-31/orientation/orientation.md`. I read nothing else except `CLAUDE.md` and the core of the `fortress-repo` skill (`.claude/skills/fortress-repo/SKILL.md`). Line numbers below are the orientation's.

## 1. What I would do differently, section by section

Each entry gives the rule and its limits as I can state them from the text alone, with no source opened.

### Preamble (lines 1-7)

- I would read each bold sentence as a rule of this tree. A sentence that names a P-N is a curator's decision, and I would cite it as one. A sentence with neither a P-N nor a row is a rule that I build on but do not cite as a decision.
- A sentence that cites a ledger row is unsettled, so I would assert it only in an `XXX` test, never in a plain one.
- A sentence that opens "Until the switch-over" is a limit of the compiler's library. I would never fix one in the compiler's prelude.
- Before I call a disagreement a conflict, I would search FACTS and POSITIONS.
- Where an old note, a team test or my training disagrees with this file on three points, I would trust this file: the number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.
- Where the papers and the early specification text differ, I would follow the later papers (P-26). I would not treat `Specification-1.0-frozen/` (the Working Draft) as the specification. Appendix I holds the original text of any rule that changed it.

### Dispatch and overloading (lines 9-24)

- Two overloads may differ only in the bounds of their static parameters (P-45). The checker judges each one by its declared domain. The more specific one's return type must fit at every instance, not at one only.
- With static parameters, exclusion is judged over the whole tuple of parameter types (P-152). A generic type that appears at the same position in both declarations forces the two static arguments to be equal. A pair whose exclusion depends on a static parameter that nothing ties is refused on both paths. In its exclusion test, the checker puts the meet of a parameter's bounds in its place where the parameter is a whole parameter type, a tuple element or a member of a union or intersection, but not inside a static argument (P-157).
- I would never rely on the order of declarations under walk. Walk fails a call to a generic method with an argument outside its bound as "Cannot unify".
- I would not change code just to pass walk's load check, nor take walk's acceptance as proof, before I look the case up in `interpreter.md`, "What walk checks".
- Two functional methods whose parameter types are equivalent are duplicates, wherever `self` stands, and abstract declarations count. If an object inherits an abstract functional method from one trait and its body from another, I would redeclare the method in the object (P-149), unlike in Scala.
- If a program's own trait declares a functional `+`, `-`, `MIN` or `MAX`, I would add `excludes { Number }` or `excludes { HasRank }`, or move the operator into an object. Otherwise walk refuses the program: "fails the Meet Rule". The checker's acceptance against the library proves nothing here (row 918).

### Traits and objects (lines 26-70)

- The checker refuses a type that extends two instantiations of one generic trait. Walk runs such a type, but refuses overloads on `Tg[\3\]` against `Tg[\4\]` (row 416). I would not copy the specification's "Not allowed" examples.
- `comprises` speaks of values, so several declarations can together cover a meet. Walk checks extenders only against the clauses of the main component (row 551).
- `override` only widens. To replace an inherited declaration at the same parameter types, I would redeclare it without `override`, and I would never write a Java-style `override`. Walk refuses one at load, and one in the library stops every program. The code generator refuses every `override` (row 650), so I would keep `override` out of compiled tests or mark them `XXX`.
- An object must cover each inherited abstract method with its bodies (P-147). Walk skips this check for a generic object (row 665). The checker refuses a cover by several bodies where static parameters are involved (row 725).
- In a self-typed trait, `self` is `T[\X\]` met with `X`, so no cast is needed. An extender of `T[\A\]` must be an `A`. Three compiled shapes fail at class load (rows 1050-1052), and I would avoid them. The workaround is unclear (see 2.1).
- `I extends Index`: I would write it in library code and in walk-only code, but not in a program compiled before the switch-over. Only `ZZ32` among the integers is an `Index`. A tuple of `Index` types is an `Index` but not an `Object`, and `()` is not an `Index`. I would pass a tuple index through a generic `I extends Index`, not through a parameter of type `Index` (row 805).
- Pairs and triples are ordered only when every element type extends `StandardPartialOrder`. An `Unordered` comparison gives `false`. The checker orders a `List[\E\]` only when `E` is a `StandardTotalOrder[\E\]` (P-154), so I would not compare `RR64` lists in compiled tests.
- Where a type declares no `=`, `=` is `SEQV`. I would never write `EQV`/`≡`, and would write `<->` instead (row 184). I would give a value object with string fields its own `=`, because separately computed equal strings are not `SEQV`. Literals with one text are one object (P-171). Tuples longer than three fall back to `SEQV` (row 923). The compiler's library has no `=` over `Any` and none on tuples.

### Static parameters, `where` clauses and sizes (lines 72-91)

- A static parameter that a call does not fix takes its bound. The checker uses the intersection of the bounds, narrowed by the expected type (P-48). Under walk, a self-bounded parameter stays `OPEN`, and an `OPEN` position compares as `Bottom` in overload choice (row 663). Rows 591, 612 and 587 list the cases where walk still gives `Bottom`.
- Under walk I would write the static arguments of a generic call nested as an argument (`mk[\ZZ64\]()`), because only the checker retypes it against the parameter (P-51, row 705).
- Only three `where` forms exist (P-151). The checker silently treats any other `extends ... where` as unconditional. Walk and the compiled runtime ignore the condition of a conditional extension (row 774), and walk runs a dotted call that breaks its condition (row 777). The compiled runtime does not check a declaration's own `where`. A compiled call that introduces `where [\nat n\]` dies at run time (row 867).
- Sizes compare by their written form after numeral arithmetic, with no commutativity, so a `typecase` arm against a numeral stays reachable (P-55). The exponent of a size power is at most 4096, and walk refuses a negative one.
- A size known only at run time comes from `NatReflect.reflect`, and works only under walk. On the compiled path it fails both before and after the switch-over (row 307).

### Numbers (lines 93-120)

- "Route A" and "the tower" in the record mean the flat siblings, not a nesting.
- A numeral converts at a typed place: a typed binding, an assignment, a field, a parameter or a declared return type. It converts exactly into the integer types and `QQ`, and with one rounding into the floats. Anywhere else it takes its default (`ZZ32`, then `ZZ64` or `ZZ`; `RR64` with a point), and the default stays the variable's type: after `x = 0.1`, `q: QQ = x` is refused. A numeral out of range is refused statically by the checker and at run time by walk.
- A `nat` or `int` parameter used as a value is a `ZZ32`. From 2^31 up it is a `ZZ64` under walk and an error on the compiled path (row 962).
- I would write a numeral type only as the parameter type of a coercion or an operator. For a program's own number type, I would write a coercion generic over the numeral's numbers, with a `where` bound, and add a prefix `-` if negatives are wanted. `array1` and `array2` give plain arrays at such a type.
- To test run-time arithmetic, I would use a variable operand, because an expression of numerals alone folds exactly (P-173). A program's own type takes a folded constant only through a coercion from the constant's default type.
- Under walk a coercion applies at a call, a typed binding and an assignment, but not at a return (row 387). A generic call promotes to the narrowest common target (P-74). Walk takes the join for tuples and varargs instead (rows 395, 511). A tie between coercions is "Ambiguous coercion", unless one candidate takes the numerals at their default.
- A numeral can choose a strictly more specific declaration that its coercion reaches (P-46). Rows 1016 and 1017 are the departures.
- I would convert integers with the checked getters (`asZZ32` and the rest) or the low-bits functions (`narrow` and the rest, which wrap). On a `ZZ` I would use `z.asZZ32`, not `narrow`. The compiler's prelude has only a subset (row 349).
- I would not write generic code over `T extends Number` that calls arithmetic or `asFloat`: I would declare one version for each type. A cross-type `=` without a coercion between the types answers `false` silently.
- An integer `^` answers in its base's type, and an integer base at a negative exponent raises an exception. I would use `2.0^(-1)` or a `QQ` base. The compiled prelude has only a subset of powers.
- `/` on two integers gives a `QQ`, and `DIV` truncates toward zero. For a float result I would make one operand a float, and pass each `ZZ64` operand through `asFloat`. On the compiled path, `7 / 2` is a static error.

### Reductions and comprehensions (lines 122-134)

- In a program for both paths, I would always write the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` when the value lands at a method's return type, a field, a top-level variable or an assignment, because the paths diverge there (row 1008). I would write both arguments of `BIG MIN_MAX` (row 1007). Under walk, an untyped empty `SUM` gives an integer 0 (row 716).
- A reduction of my own without an identity declares `simpleJoin(R, R): R`, never at `Any` or untyped. I would not copy the team's tests for this.

### Implementation limits (lines 136-140)

- Walk has no static types. I would never write a `Maybe` as an `if` condition, although walk accepts one.
- I would write every parameter type, because the checker refuses a missing one unless the api supplies it. A missing return type is taken from the api, or the checker types the body.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

1. **Line 47, the self-typed workaround (high).** "bind `self` at the type first, as `r: R = self`". Nothing introduces `R`, and "the type" has no referent. The next sentence says the workaround "has been tested only at a type that a `comprises` clause lists, not at `X`". So `R` is not `X`, yet the failing shapes in lines 43-44 are the ones that return `self` at `X`. A worker cannot tell whether to write `r: X = self` or how to apply the workaround in the generic case it was given for.
2. **Line 24 against line 49, a program's own `+` (medium-high).** Line 24 says any program trait with its own functional `+` overlaps the library's array-and-number `+` and needs `excludes { Number }` or `excludes { HasRank }`. Line 49 says that by P-157 `AdditiveGroup`'s own `+` is valid beside those overloads, and that walk "loads such a pair in the library and in a program's own component". It does not say whether a self-typed program trait still needs the `excludes` fix, or what the checker does with one. A worker will either add needless clauses or omit needed ones.
3. **Lines 51-52, 87, 89 and 138: departures with no row (medium).** Line 7 says a row marks an unsettled behaviour. Several departures carry no row:
   - line 51-52: walk refuses valid pairs in two self-typed cases;
   - line 87: "The code generator accepts a declaration's own `where` clause but emits no code for it";
   - line 89: walk "refuses a negative exponent" (rule or departure?);
   - line 138: walk takes a `Maybe` as an `if` condition.

   By the file's own convention these read as settled, so a worker could assert them in a plain test.
4. **Line 5, citing a rule without a P-N (medium).** "Build on a sentence without one, but do not cite it as a decision." The core requires a citation for every claim: the brief, the record or a primary source. A skill part is none of these. The file does not say what to cite for such a rule (a FACTS entry? the code?), and the core forbids loading `sources.md` for a task.
5. **Line 128, a reduction as a call's argument (medium).** "So as a call's argument, a reduction sums in its body's type on both paths." This holds only where the enclosing call is accepted without an expected type. Where the checker retypes the argument against a parameter type (P-51, line 80), the checker sums in that type. Walk ignores parameters (line 126), so the paths diverge. The "So" overgeneralizes.
6. **Line 54, `I extends Index` (medium).** "in your own generic over such a type, write `I extends Index`" is countermanded three sentences later: "write the bound only in code that runs under walk or is checked against the interpreter's library". A worker writing a test for both paths gets two instructions. "Checked against the interpreter's library" and "the count stage" name a way of checking that the core mentions only in passing and never says how to run.
7. **Line 120, coercions into `RR64` (medium).** "No coercion carries a `ZZ64` into `RR64`" contradicts the natural reading of the core's "A wider type declares a `coerce` from each narrower one". Neither text lists the coercions that do exist. Line 107 implies `ZZ32` to `RR64` exists, but a worker cannot tell whether `NN32`, `NN64`, `ZZ` or `QQ` reach `RR64`, so cannot extend the `asFloat` advice to them.
8. **Lines 7, 91 and 97, "compiler's library" and "compiler's prelude" (medium-low).** The core says the prelude is three files of the compiler's library and is deleted at the switch-over. The orientation uses the two names interchangeably, so a worker cannot tell whether a given limit lives in files that are deleted or in files that remain. Line 7 says an "Until the switch-over" sentence states a limit, but line 97, "Until the switch-over, the compiler's prelude follows the same design (P-37)", states no limit. Line 91 then adds "After it, the call still fails".
9. **Line 126, the `x: RR64 = SUM...` example (low-medium).** The example does not say that `x` is local. Copied into a top-level binding, which walk does not follow (line 128, row 1008), it diverges between the paths.
10. **Line 105, "under walk `lr = 1/1000` is a `QQ`" (low-medium).** The qualifier reads two ways. Either the fold's `QQ` default is walk-only, which contradicts "on both paths", or the compiled library simply lacks `QQ` (line 120). The reader has to join two distant sentences to find out.
11. **Line 105, "a program's own type takes the constant only through a coercion from its default type" (low-medium).** The only example is a quotient (`10/20`). Whether a whole-number fold such as `b: Byte = 200 + 50` also needs `coerce(x: ZZ32)` rather than the numeral coercion of line 103 is implied but not shown. A worker will likely assume the numeral coercion serves.
12. **Line 13, "Both paths refuse a pair where the equalities leave a static parameter free" (low-medium).** Read alone, this refuses every such pair, including one where another position excludes at every instance. The sentence before it says that exclusion at one position suffices. The rule should be limited to a pair whose exclusion depends on the free parameter.
13. **Line 140, "Walk runs it, except in a method that implements an abstract one (row 405)" (low-medium).** It is unclear which half is the departure that the row holds: walk running an untyped parameter, or walk refusing one in an implementing method.
14. **Line 134, "`BIG MAX` over a generator still answers `R`" (low-medium).** The file does not say what an empty generator gives, though that is the evident reason for lifting to `Maybe`.
15. **Line 116, cross-type `=` (low).** "the library declares `=` for each such pair" does not say whether the compiled path has these pairs before the switch-over.
16. **Line 32, "a Java-style `override` in the library stops every program" (low).** This can be read as a present fact about the library rather than a warning.
17. **Line 107 against line 99, conversion at a return (low).** Line 99 lists a declared return type as a place where a numeral converts. Line 107 says walk does not convert at a return (row 387). That sentence concerns values other than numerals, but a reader may carry it over to numerals.
18. **Line 19, duplicates wherever `self` stands (low).** "So the checker refuses `f(self, y: S)` beside `f(x: S, self)`" names only the checker, while the bullets that follow say "both paths". It is unclear whether walk refuses this case.
19. **Row numbers (low).** The core says the ledger has "one row each" but never that rows are numbered or how to look up "row 780" (a line number? an id?). A worker can probably find out through `records.md`.
20. **Terms the core does not give (low unless noted):**
    - "meet", and "Meet Rule": the core gives only "join";
    - "count stage" (medium, see 6);
    - `HasRank`: read as "arrays" from context;
    - `Unordered`, `TIMES`: why not juxtaposition?;
    - `StandardPartialOrder`, `StandardTotalOrder`, `LexicographicOrder`, `AnyIntegral`/`Integral`, `AssociativeReduction`/`simpleJoin`;
    - `NatReflect`/`NatParam`/`N[\n\]`, `__bigOperator`.

    Bare part names (`compiler.md`, `SKILL.md`) differ from the core's `references/compiler.md` form. The file defines its own terms well: P-N, plain test, Working Draft, declared domain, self-typed, clause form, `OPEN`, promotion and low-bits functions.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

The file holds no explicit repair history: no batch numbers, no dates, no "was fixed". The candidates below fail one or both of Astra's two questions.

1. **Line 49, first two sentences (medium).** As written, they explain why the library's array-and-number `+` and `-` are valid beside `AdditiveGroup`'s, and a worker takes no action from that. If they are meant to tell a worker something about a program's own self-typed trait, they should say so (see 2.2); if not, they can be cut.
2. **Line 118, "Its `ZZ32` power gives 0 at a negative exponent for other bases. At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523)." (medium).** This is misbehaviour of a prelude that will be deleted and must not be fixed. A worker should write no negative integer exponent anyway (lines 118-120). The list of which powers exist does change an action; this sentence does not.
3. **Line 97, "Until the switch-over, the compiler's prelude follows the same design (P-37)." (medium).** It changes no action and breaks the file's own "Until the switch-over" convention (see 2.8).
4. **Line 138, "Walk will run the checker only after the switch-over (P-12)." (low-medium).** This is planning. The core already says walk switches the checker off, so the sentence adds nothing to what a worker does now.
5. **Line 70, "A float numeral converts where `RR64` is declared ('Numbers'), so `y: RR64 = 0.5` is `SEQV` a computed `RR64` 0.5." (low-medium).** It follows from the Numbers rule and averts only a doubt that few would have.
6. **Line 103, "The coercion gives one value for each place where the numeral is written, and each run of that place reuses it (P-176)." (low).** It matters only for a coercion with effects or one that returns a reference object. Keep it only if such coercions are expected.
7. **Line 22, "The Scala language accepts it." (low).** The rule already says that both paths refuse. This sentence only contrasts with Scala, though that contrast is the core's stated purpose for such points.

Kept on purpose, though their wording looks historical:
- line 95, "route A" and "the tower": vocabulary for reading the record;
- line 41, "A compiled body ... that returns `self` at `X` runs": stops a worker avoiding a shape that works;
- line 11, "The Working Draft forbids such pairs";
- line 99, walk's messages by place: useful for tests that match messages.
