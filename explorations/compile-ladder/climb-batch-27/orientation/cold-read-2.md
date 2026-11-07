# Cold read 2 of the orientation

I read only `CLAUDE.md`, the core (`.claude/skills/fortress-repo/SKILL.md`) and `explorations/compile-ladder/climb-batch-27/orientation/orientation.md`. Line numbers below are the orientation's. I opened no source, record file or reference part.

## 1. What I would do differently, section by section

### Preamble (lines 1–7)

- I would sort each sentence by its marker before I act on it:
  - a P-N sentence is a curator's decision, and I may cite it as one;
  - a sentence that cites a ledger row is one path's departure, which I would never assert as correct in a test;
  - a sentence that opens "Until the switch-over" is a limit of the compiler's library, which I would not fix in the compiler's prelude;
  - an unmarked sentence is a rule of the tree: I build on it but do not cite it as a decision.
- Before I call a disagreement between the team's sources a conflict, I would search FACTS and POSITIONS. I would question a rule only on new evidence.
- On three points I would distrust old notes, team tests and my own training: number types do not nest, fixed-width arithmetic raises instead of wrapping, and walk converts arguments.
- I would read `Specification-1.0-frozen/` as the unrevised Working Draft and look in Appendix I for the original text of a changed passage. Where the papers and the specification's early text disagree, I would follow the papers (P-26).
- Limit: these markers classify sentences. The bold sentences do not all fit them (item 1 of section 2).

### Dispatch and overloading (9–24)

- Overloads may differ only in their static parameters (P-45). I would judge such a pair on its declared domains, and require the more specific declaration's return type to be a subtype at every instance.
- With static parameters, I would decide exclusion over the whole tuple of parameter types (P-152):
  - a pair whose equalities leave a static parameter free is refused on both paths;
  - in the exclusion test, the meet of a parameter's bounds replaces the parameter where it stands as a whole parameter type, a tuple element, or a member of an intersection or union, but not inside a static argument (P-157).
- I would not rely on the order of declarations.
- I would not take walk's load check, whether it accepts or refuses, as the verdict on a pair. Before I change code to satisfy walk, I would look up the case in `interpreter.md`, "What walk checks".
- I would not declare:
  - two functional methods whose parameter types are equivalent once `self` is moved;
  - an abstract method and a concrete one at the same types in one trait;
  - an object that takes an abstract functional method from one trait and its body from another without declaring the method itself (P-149). Scala accepts this; Fortress does not.
- An abstract functional method triggers the Meet Rule. A trait method `h(self)` beside a top-level `h(x: String)` needs a cover.
- If a program's trait declares a functional `+`, `-`, `MIN` or `MAX`, I would declare the trait `excludes { Number }` (P-160). Otherwise walk refuses the program at load with "fails the Meet Rule". The checker's acceptance across components is a departure (row 918), not evidence.

### Traits and objects (26–61)

- No type of mine would extend two instantiations of one generic trait, even though walk runs one. I would not copy the specification's examples marked "Not allowed". Under walk, overloads on `Tg[\3\]` and `Tg[\4\]` are refused (row 416), so I would avoid them.
- I would read `comprises` as a statement about values (P-60): the list need not name every direct subtype. Walk checks only the clauses of the main component (row 551).
- I would write `override` only to widen. To replace a declaration at its own parameter types, I would declare it again without `override`. A Java-style `override` in the library stops every walk program. The code generator refuses every `override` (row 650), so compiled code cannot use it at all.
- Every object must cover each inherited abstract method, with one body or with narrower bodies that cover it together (P-147). Limits:
  - walk skips this check for generic objects (row 665);
  - the checker refuses a cover by several bodies where static parameters are involved (row 725).
- In a self-typed trait (P-146), I would return `self` at the trait type without a cast. A compiled body that returns `self` fails the JVM's verification (row 695). A type that extends `T[\A\]` must itself be an `A`.
- I would write `I extends Index` only in code that runs under walk or is checked against the interpreter's library (P-156). I would also:
  - index with `ZZ32` values or tuples of `Index` types only;
  - pass a `ZZ32` value, never a numeral, to an `Index` parameter;
  - not expect a function over `Index` to exclude one over a tuple of `Index` types.
- I would order tuples only where every element extends `StandardPartialOrder`. In checked code, I would order lists only where `E extends StandardTotalOrder[\E\]` (P-154): a list of `RR64` has no order there, although walk orders every list (row 774).
- Where a type declares no `=`, `=` is `SEQV` (P-168). So `false` is correct for:
  - a value object without its own `=` that holds a string;
  - a tuple of four or more elements that holds such an object.
  To compare by content, I would give the value object its own `=`. Under walk, I would write `assert(x = y, msg)` unless the type extends `Equality` (row 807).

### Static parameters, `where` clauses and sizes (63–82)

- A parameter that a call does not fix takes its bound (P-48). Where walk would give it `Bottom` (rows 591, 612, 587) or leave it `OPEN`, I would write the static argument. Under walk, a call nested as an argument gets no expected type, so I would write it as `mk[\ZZ64\]()` (row 705).
- I would use only the three built `where` forms (P-151). The checker silently treats any other `where` on an `extends` entry as unconditional. Limits:
  - I would not rely on the compiled runtime to check a declaration's own `where` clause;
  - I would not compile a call to a function whose own clause introduces a `where`-clause variable (row 867).
- I would compare sizes by their written form (P-55): `2 3` equals `6`, but `s0 s1` does not equal `s1 s0`. I would treat a `typecase` arm on a numeral as reachable. Size powers must stay at or below an exponent of 4096 and must not be negative.
- Neither now nor after the switch-over would I compile a call that passes a reflected `NatParam`. In compiled code, I would not pass a value of a trait whose `comprises` lists a type at a `where`-clause size to a place that expects a listed type (row 307).

### Numbers (84–96)

- I would never make number types nest or rely on widening (P-43). "Route A" means the flat choice. "The tower" names the trait family, not a nesting.
- Under walk, a numeral's instance is its run-time class, whatever the printout shows. So I would write static arguments, as `Cell[\ZZ32\](3)`, and give `array1` and `array2` their element type (row 721).
- I would expect a generic call to promote to the narrowest type that every argument coerces into (P-74), and "Ambiguous coercion" on a tie (P-59). Walk does not promote the elements of a tuple or varargs (rows 395, 511).
- In generic code over `T extends Number`, I would call nothing that the number types declare, `asFloat` included (P-165). Instead I would declare the function at each number type. To compare across types, I would use `asFloat`. `1/2 = 0.5` is correctly `false`.
- A negative exponent goes only on a float or `QQ` base (P-153). In compiled code, I would avoid powers outside `ZZ32`, `NN32` and `NN64`, and avoid negative exponents (rows 441, 523).
- To truncate, I would use `DIV`. `/` on integers gives a `QQ` under walk and is a static error compiled. For a float result, I would convert each `ZZ64` operand with `asFloat`.

### Reductions and comprehensions (98–108)

- I would write the static argument in every clause form of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` (row 731). For walk, I would also give the result a declared type: a local variable or a function's return type, not a field or an assignment.
- I would recognise `__bigOperator` "body param 1" as an element that does not convert to the reduction's instance. I would not assert walk's departures (rows 716, 717, 20, 436).
- In my own reduction without an identity, I would declare `simpleJoin` typed at `R`, never at `Any` and never untyped. I would not copy the team's tests here.

### Implementation limits (110–114)

- I would write only `Boolean` conditions in `if`, never a `Maybe`.
- I would write every parameter type, of functions, methods and local functions.
- I would give a component's function a return type, or exactly one api declaration at its parameter types.

## 2. Passages that send a worker wrong, read two ways, or use a term the core does not give

1. **Bold sentences that describe one path (line 5).** Line 5 says "Each bold rule states the rule of this tree", yet several bold sentences describe a single path: lines 15, 17, 71, 88, 102 and 112.
   - Line 71, "Only the checker gives a call written as an argument the enclosing call's context (P-51)", reads as making walk's behaviour the rule. The same paragraph cites row 705 for that behaviour, which makes it a departure.
   - A worker writing a test cannot tell which one to assert.
   - Confidence: high.
2. **The two markers meet in one passage (line 7 against lines 61 and 94).** Each passage puts an "Until the switch-over" limit beside ledger rows on the compiler's library: row 908 on line 61, rows 441 and 523 on line 94. The preamble gives the two markers opposite orders: a departure "a fix can change", a limit "do not fix". It is unclear which order holds for `===`, or for the `ZZ32` power at base 0. Confidence: medium-high.
3. **Library or prelude (line 7).** The sentence says the limit belongs to the "compiler's library" and then says "do not fix it in the compiler's prelude". The core says the prelude is three files of that library. Two readings: other files of the compiler's library may be fixed, or none may be touched. Confidence: medium.
4. **Nothing to cite (line 5).** "Build on a sentence without one, but do not cite it as a decision." The core requires every claim to cite the brief, the record or a primary source. The orientation is none of these, so an unmarked sentence, such as line 88's printing rule or line 108's `simpleJoin` rule, gives the worker nothing to cite. Confidence: medium.
5. **"Row N" (throughout).** The core gives the ledger as "one row each", but not how a row is numbered or found. "Row 780" can be read as line 780 of the ledger file. The text should say it is the row's id and which query in `records.md` fetches it. Confidence: medium.
6. **"Exclusion" in two senses (line 13).** "Exclusion is read over the whole tuple" means two domains excluding each other. "By the exclusion rule" in the next sentence means the core's rule against two instantiations. Back to back, the first reads as if it were the exclusion rule too. Confidence: medium.
7. **"At every instance" (line 11).** It does not say whose static parameters: the more specific declaration's, the other's, or both jointly. Confidence: low-medium.
8. **"Only at a call" (line 17, row 780).** "Walk compares … on their declared domains only at a call" has two readings: walk does not check at load, or at a call walk compares only declared domains. Confidence: medium.
9. **Walk on duplicates (line 19).** The text says only that "the checker refuses" `f(self, y: S)` beside `f(x: S, self)`. The bullets that follow say "both paths". If walk accepts this pair, it is unclear whether that acceptance is a departure, since no row is cited. Confidence: low-medium.
10. **"Also counts for it" (line 24).** "An abstract functional method also counts for it" has two readings: the method is one of the overloads that need a cover, as the example shows, or it can also serve as the covering declaration. Confidence: medium.
11. **Unnamed traits and "open" (line 24).**
    - "Make it exclude arrays" and "the library's `+` between an array and a number" name no array trait. The core gives none, so a worker cannot write that `excludes` clause from this text.
    - "`Number` is open" uses "open" before line 92 explains it (no `comprises` clause). It also clashes with `OPEN` on line 65.
    - Confidence: medium.
12. **Whose clause (line 30).** In "as `Integral[\I\]` below `AnyIntegral`", it is unclear which declaration's clause is meant. The likely reading is that `AnyIntegral`'s `comprises` need not list `Integral[\I\]`, but the text does not say so. Confidence: low-medium.
13. **`override` in compiled code (line 32).** The code generator refuses every `override` (row 650), but the passage does not say what to write when the code must also compile. Dropping `override` changes its meaning under walk (it no longer widens), and keeping it breaks the compile. Confidence: medium.
14. **Walk's two refusals carry no row (lines 43–46).** These two refusals of the array/number `+` pair come with no ledger row, yet the text frames them as walk's check departing from the verdict. Read by line 5, they are rules of the tree, so a worker could assert the refusals as correct. Confidence: medium-high.
15. **Two instructions on `I extends Index` (line 48).** "In the library, and in your own generic over such a type, write `I extends Index`" reads as unconditional. Later, "write the bound now only in code that runs under walk or is checked against the interpreter's library". A worker reading the first will put the bound in a program meant to compile and fail. "The library" also does not say which library. Confidence: medium.
16. **"Pass a `ZZ32` value there instead" (line 48).** It does not say how to make a numeral into a `ZZ32` value that the checker accepts, for example a typed binding. Confidence: low.
17. **The `pick` example (line 65).** In "beside `pick(x: Any)`, `pick(x: (T,T))` takes no `(1, 2)`", the declaration of `T` is not shown. The rule applies only to a `T` whose bound names itself. The sentence also states a walk quirk without a row, which line 5 makes a rule to assert. Confidence: medium.
18. **"Checked at a call" (line 75).** It can mean a static check at the call site or a run-time check. Line 78 ("the compiled runtime does not check it") points to run time, yet that line cites no row, so by line 5 it reads as a rule rather than a departure. Confidence: medium.
19. **Function-level `where` (line 78).** A function's own `where [\nat n\]` is not plainly one of the three built forms on lines 73–76. Row 867 suggests that such a call runs under walk. The worker cannot tell whether to write one. Confidence: medium.
20. **"Size power" (line 80).** "Size power" and "except of 0, 1 or -1" are not core terms. Also unclear: does the checker refuse a negative exponent, or only walk? Confidence: low-medium.
21. **`N[\n\]` (line 82).** "The object type `N[\n\]`" is never introduced; the text does not say where `N` is declared. Confidence: low.
22. **Route B (line 86).** Routes A and C are glossed, B is not. A worker who meets "route B" in the record has no gloss. Confidence: low.
23. **`IntLiteral` under walk (line 88).** "Walk answers `IntLiteral`'s arithmetic as a `ZZ32` (row 578)" contradicts the same paragraph's account that walk gives numerals the classes `Int`, `Long` or `BigNum`, not `IntLiteral`. It is unclear what an `IntLiteral` is under walk. Confidence: medium.
24. **What `Int`, `Long` and `BigNum` are (line 88).** They could be Java classes of the interpreter or Fortress names. "Run-time class" is not a core term. Confidence: low.
25. **Walk on tied numerals (line 90).** "The checker reads the numeral as `ZZ32` …" leaves walk's behaviour in the same tie unstated. Confidence: low.
26. **Which number types coerce into which (lines 92 and 96).** The text never states the coercions, only implies them: line 96 implies that `ZZ32` coerces into `RR64` and `ZZ64` does not. A worker asserting `n = 1.0` for a `ZZ32` `n` must infer the answer. One sentence would settle it: which number types coerce into which, or a pointer to `library.md`. Confidence: low-medium.
27. **Whose rule for other reductions (line 102).** In "Other reductions take their bound, or the expected type where the bound does not fit", the subject could be the checker only or both paths. Confidence: low.
28. **Empty generator (line 108).** "`BIG MAX` over a generator still answers `R`" leaves the empty generator unaddressed. The `Maybe` lifting suggests `Nothing` inside the reduction, but the text does not say what the caller sees. Confidence: low-medium.
29. **Row 405 (line 114).** The row could attach to "Walk runs it" or to the exception "except in a method that implements an abstract one". The action, writing every type, is clear either way. Confidence: low.
30. **Two meanings of the switch-over (line 112).** "Walk will run the checker only after the switch-over (P-12)" adds a second meaning to the switch-over. The core defines it as the compiled path moving onto the interpreter's library. The text does not say whether these are the same event. Confidence: low.
31. **"Fixed-width arithmetic does not wrap" (line 7).** Read flatly, this could suggest that no wrapping operation exists, while the core says `library.md` covers "wrapping". Confidence: low.
32. **Topics under "Traits and objects" (lines 48–61).** This heading holds `Index`, the order of tuples and lists, and `=`, which are not traits-and-objects topics. A worker looking for `=` or `/` will look elsewhere first. Line 92 already has to point back to this heading for `SEQV`. Confidence: low.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

1. **Line 86, "Route C is the way not chosen: a checker rule under which the number types could nest again."** This is repair history. The glosses of "route A" and "the tower" are worth keeping: they prevent a misreading of the record. The account of route C changes no action. Confidence: medium.
2. **Line 43, "With this reading and the bounds that the test reads …, the library's generic `+` and `-` … are valid beside `AdditiveGroup`'s own. Walk reads `self` in the same way, so it loads such a pair in the library and in a program's own component."** This justifies the library's present state. The worker's only action is in the two refusal cases that follow. Confidence: medium.
3. **Line 82, "After the switch-over, such a call still fails, for a second reason" and the explanation after it.** The action is "do not compile such a call, and the same holds for your own trait". The post-switch-over reason could shrink to one clause. Confidence: low-medium.
4. **Line 61, "Its own operator `===` compares strings and `ZZ32`, `ZZ64`, `RR32` and `RR64` by `=`, not by bits or identity (row 908)."** This is about an operator of the compiler's library that the worker is told not to fix and that the interpreter's library lacks. It changes nothing for a worker who writes `=`. Confidence: medium-low.
5. **Line 112, "Walk will run the checker only after the switch-over (P-12). So walk runs programs that the checker refuses."** The first sentence is a plan. The second repeats the core ("A program that runs under walk can be ill-typed"). Confidence: low.
6. **Lines 65 and 102, the opening of the P-48 paragraph and walk's instantiation of a reduction at the declared type.** These repeat the core's "Static parameters" bullet nearly word for word. They add no action beyond the core. Confidence: low.
7. **Line 17, "For example, walk compares two functional methods … only at a call (row 780)."** This sample departure adds no action beyond "look in `interpreter.md`", and it is also ambiguous (item 8 above). Confidence: low.
