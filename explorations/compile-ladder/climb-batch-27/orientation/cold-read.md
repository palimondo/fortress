# Cold read of the orientation (climb-batch-27)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and `orientation.md` in this folder. Nothing else was opened. Line numbers are those of `orientation.md`.

## 1. What I would do differently, section by section

### Preamble (lines 1-7)

- Read each sentence by its marker. A bold line is the rule of the tree. A sentence with a P-N is a curator decision: I build on it and reopen it only on new evidence. A sentence with a ledger row is a current departure of a path: I never assert that behaviour as correct in a test. A sentence that opens "Until the switch-over" is a limit of the compiler's library: I do not fix it in the compiler's prelude.
- Before I call a disagreement between the specification and an implementation a conflict, search FACTS and POSITIONS.
- Where the specification's early text and the later type papers disagree, expect the rule to follow the papers (P-26). Limit: "most rules", so I would still check POSITIONS for the case.
- Distrust old notes, team tests and my training on three points: the number types do not nest, fixed-width arithmetic raises instead of wrapping, and walk converts arguments.
- For a rule's original text, look in Appendix I or the Working Draft (`Specification-1.0-frozen/`), not in `Specification/`.

### Dispatch and overloading (lines 9-24)

- Overload on static-parameter bounds alone when I need to (P-45). Make the more specific overload's return type a subtype at every instance.
- With generic overloads, make the domains exclude through a static argument that both share (`Box[\T\]` in both). Then one position must exclude at the instance that sharing forces. If a static parameter is left free (`U`), both paths refuse the pair. In the checker's exclusion test, a bare type parameter becomes the meet of its bounds. Inside a static argument it stays (P-157).
- Never rely on declaration order under walk.
- When walk's load check refuses or accepts a pair, do not edit code or treat it as proof. Look up the case in `interpreter.md`, "What walk checks", first.
- Never declare `f(self, y: S)` beside `f(x: S, self)`. Never declare an abstract and a concrete method with the same parameter types in one trait. In an object that inherits an abstract functional method from one trait and its body from another, declare the method again in the object (P-149). Scala would accept it; Fortress does not.
- When my trait declares a functional `+` (and, by the stated form, `-`, `MIN`, `MAX`), declare it `excludes { Number }` or make it exclude arrays. If I do not, walk refuses the program at load with "fails the Meet Rule". A clean compile does not show the pair is valid, because the checker accepts it against the library's `+` (row 918).
- A trait's abstract `h(self)` beside a top-level `h(x: String)` needs a cover of the meet, or an exclusion between the two types.

### Traits and objects (lines 26-61)

- Never let a type extend two instantiations of one generic trait. Under walk, do not overload on `Tg[\3\]` against `Tg[\4\]` (row 416). Do not copy the specification's examples marked "Not allowed".
- Write `comprises` as a statement about values. It need not list each direct subtype, and it can complete a cover for the Meet Rule. Walk checks extenders at load only against the main component's clauses (row 551).
- Write `override` only when my parameter types are strictly wider than the inherited ones. To replace an inherited declaration at the same types, declare it again with no `override`. Never put a Java-style `override` in the library, because walk then stops every program. Limit: the code generator refuses every `override` (row 650), so any `override` breaks a compiled program today.
- In an object, cover each inherited abstract method with one body, or with narrower bodies that cover it with `comprises` read. Where the abstract method or a covering method is generic, use one body (row 725). Walk does not check covers in a generic object (row 665).
- In a self-typed trait, use `self` as `T[\X\]` intersected with `X`, with no cast. Make each implementing type an `A` when it extends `T[\A\]`. A compiled body that returns `self` fails JVM verification today (row 695).
- In library code and generics over indexed types, write `I extends Index`. Pass a `ZZ32` variable, not a numeral, where the checker expects `Index`. `a[3]` stays valid. Use `m[i, j]` as one tuple index. Do not overload on `Index` against a tuple of `Index` types. Limit: until the switch-over, a compiled program that names `Index` does not compile.
- Order a tuple only when each element type is a `StandardPartialOrder`, and under walk only when each position holds one run-time type (row 511). Order a list only when its elements are a `StandardTotalOrder[\E\]`, so a `List[\RR64\]` has no order under the checker (P-154).
- Give each value object that holds a string or a reference object its own `=`, or compare its parts. With no `=` declared, `=` is `SEQV`, which compares such fields by identity (P-168). Treat tuples of four or more elements the same way (row 923).

### Static parameters, `where` clauses and sizes (lines 63-82)

- Expect an unfixed type parameter to take its bound, never `Nothing`. Under walk, a self-bounded parameter prints as `OPEN`. Three cases still get `Bottom` (rows 591, 612, 587). Write the static argument when it matters.
- Under walk, write the static arguments of a call nested as an argument (`mk[\ZZ64\]()`), because walk gives the inner call no context (row 705).
- Use only the three `where` forms. Any other `where` on an `extends` entry is silently unconditional to the checker. Neither walk nor the compiled runtime enforces a method's own `where` condition. In compiled code, avoid a clause that introduces a variable, such as `where [\nat n\]`, because the call dies at run time (row 867).
- Write sizes in one canonical order (`s0 s1` is not `s1 s0`). Expect a `typecase` arm on a numeral size to stay reachable. Keep size powers at or below exponent 4096 and never negative.
- Get run-time sizes from `reflect` in `NatReflect.fsi`, under walk only. In compiled code, do not pass a value of a trait whose `comprises` lists a type at a `where`-clause size where a listed type is expected (row 307).

### Numbers (lines 84-96)

- Read "route A" and "the tower" in the record as the flat design. "Route C" is the design that was not chosen.
- Under walk, do not trust printed types (`Cell[\ZZ32\]` is a `Cell[\Int\]`), and expect errors to say `Int`. Write the static argument of `array1` or `array2` to get a `Vector` or a `Matrix` (row 721).
- Expect coercion at a call, a typed binding and an assignment, and promotion of a generic call to the narrowest common type (P-59, P-74). Under walk, coerce tuple and varargs elements myself (rows 395, 511). Read "Ambiguous coercion" as a tie that only coercion decides.
- In generic code over `T extends Number`, call nothing on a `T`. Compare values of different number types with `asFloat(x) = y`. `1/2 = 0.5` is silently `false`.
- Expect `^` to answer its base's type, and a negative exponent to raise unless the base is 1 or -1. Write `2.0^(-1)` or a `QQ` base. In compiled code today, use powers only at `ZZ32`, `NN32` and `NN64` with an exponent of the same type, or `RR64` with an `RR64` or `ZZ32` exponent. Avoid a negative exponent and a base of 0 (rows 441, 523).
- Expect `/` on two integers to answer a `QQ`. Use `DIV`, which rounds toward zero, to truncate. Get a float with `(1.0 s) / n`, or with `asFloat` on `ZZ64` operands. A compiled `7 / 2` is a static error until the switch-over.

### Reductions and comprehensions (lines 98-108)

- Write the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` in every clause form (row 731).
- For other reductions under walk, know what sets the instance. A local variable's type does, and so does a top-level or local function's return type. A method's return type, a field, a top-level variable, a parameter and an assignment do not.
- Under walk, read `__bigOperator`, "body param 1", as an element that does not convert to the instance. An empty `SUM` with no declared type gives the integer 0 (row 716). An empty `SUM` with a written static argument that is not a number type ends in `CastError` (row 436).
- Declare my own identity-free reduction's `simpleJoin` at `R`, in a generic reduction. Do not copy the team tests' untyped or `Any` declarations.

### Implementation limits (lines 110-114)

- Use only a `Boolean` as an `if` condition, never a `Maybe`, even though walk accepts one.
- Write every parameter type, also of local functions. Leave out a component function's return type only where its api declares the function once at those parameter types.
- Do not switch the checker on in walk before the switch-over (P-12).

## 2. Passages that send a worker wrong, read two ways, or use a term the core does not give

1. **Line 48, `Index` (high).** The rule says to write `I extends Index` "in your own generic over such a type". The same paragraph says a program that names `Index` does not compile until the switch-over. A worker writing a compiled test or a microGPT generic gets two opposite instructions. The rule should say for which code (the library, walk-only programs) to write the bound now.
2. **Line 32, `override` (medium).** The bold rule tells a worker to write `override` when widening. The last clause says the code generator refuses every `override` (row 650). A worker who follows the rule in compiled code breaks the compile. After the switch-over, any library `override` blocks the compiled path. The passage gives no action for compiled code.
3. **Line 5, citing rules without a P-N (medium).** "Build on a sentence without one, but do not cite it as a decision." The core requires a source for every claim (brief, record or primary source) and forbids loading `sources.md` for a task. So a worker who relies on a bold rule without a P-N, such as "`/` on two integers answers a `QQ`", has nothing it is allowed to cite. "Without one" also covers sentences that cite rows, which line 7 says not to build on as correct.
4. **Line 7 against lines 61 and 94, two markers on one sentence (medium).** "Until the switch-over, a compiled `===` reaches the prelude's operators ... (row 908)" carries both markers. "Until the switch-over" means do not fix it in the prelude. A row means a fix can change it. Line 94 opens one sentence with "Until the switch-over", and the next two sentences about the same library cite rows 441 and 523 without that opening. Read by line 7's convention, those two look fixable in the prelude.
5. **Line 61, terms not given (high).** `===` appears nowhere else in the core or the orientation: is it `SEQV`, `=`, or a third operator? "The four number types" of the compiler's library are never named. The core and line 88 speak of eight.
6. **Line 61, "Nor is a tuple of four or more elements" (medium).** One reading: a 4-tuple holding a string is not `=` to an equal one built apart. The other: no 4-tuple is `=` to an equal one. Row 923 also marks the behaviour as a departure, so it is unclear whether a test may rely on it.
7. **Line 13, "exclusion" with two meanings (medium).** The bold line's "exclusion" is the `excludes` relation between domains. The next sentence's "the exclusion rule" is the rule against extending two instantiations of one generic trait (the core's meaning). A cold reader reads the second as the first, and the inference ("so those instances' static arguments are equal") becomes unreadable.
8. **Line 65, `OPEN` (medium).** "Every value passes `OPEN` itself" and "a type that holds `OPEN` admits only what it admits at `Bottom`" read as a contradiction. The difference between passing an argument and comparing overloads is not stated. The example `pick(x: (T,T))` does not show `T`'s self-naming bound, so it does not show why `OPEN` arises.
9. **Bold lines that describe a path, against line 5 (medium).** Line 5 says "Each bold rule states the rule of this tree". But "Under walk a numeral has a run-time class", "Walk chooses by ...", "Walk's load check is not the verdict", "A reduction's static argument depends on the path" and "Walk has no static types" describe one path. A worker can take walk's `Int` numerals as the intended rule and assert them in a test. That conflicts with the checker's `IntLiteral` (P-76).
10. **Departures without a row, against lines 7 and 17 (medium).** Line 78: the code generator emits no code for a `where` clause, so the compiled runtime does not check it. Lines 43-46: walk "still refuses the pair in two cases". Both are plainly gaps but cite no row. By line 7 they read as rules to build on. Line 17 says a case that cites a row is a departure of walk, so a cold reader takes these two refusals as correct, while line 43 calls them "not the verdict".
11. **Line 7, the compiler's library against its prelude (medium).** The core says the prelude is three files of the compiler's library. Line 7 forbids fixing a switch-over limit "in the compiler's prelude". Lines 94 and 96 place the limits in "the compiler's library". The passage does not say whether the library's other files may be fixed.
12. **Line 88, "Walk answers `IntLiteral`'s arithmetic as a `ZZ32` (row 578)" (medium).** The same paragraph says walk gives numerals `Int`, `Long` or `BigNum`, not `IntLiteral`, so what this sentence means under walk is unclear. The closing "Write the static argument." reads either as general advice for generics instantiated by numerals or as advice for `array1` and `array2` only.
13. **Line 92, `asFloat` advice (medium).** "Generic code over `T extends Number` can call nothing on a `T`, not even `asFloat`." Then: "To compare values across types, write `asFloat(x) = y`." In generic code, which is where the comparison problem comes up, that advice does not compile. It should say "for concrete types".
14. **Line 5, P-26 (low-medium).** "Most rules follow the team's later type papers ... over the specification's early text (P-26)." This can be read as a general tie-break, so that a worker skips exploring a new disagreement between a paper and the specification. Read as a description of the rules here, it gives no tie-break. "Most" leaves the exceptions unnamed.
15. **Line 7, what a test asserts (low-medium).** "Do not assert it as correct in a test" does not say what to assert instead, for example the bold rule, marked as an expected failure (`XXX`) on that path.
16. **Line 17 and line 43, "the verdict" (low-medium).** The term is not given. The checker also differs from walk's check, but the checker has its own rows (918, 653, 725), so neither path is the verdict. Only the bold rules are, and the text never says so.
17. **Line 24 (low-medium).** In "An abstract functional method also counts for it", "counts" can mean it counts as an overload that needs a cover, or as a cover. The example (`h(self): ZZ32`, with no body) is not marked abstract. In "or make it exclude arrays", the array trait to name is not given.
18. **Line 43, "such a pair" / "the pair" (low-medium).** Is it the library's generic `+` beside `AdditiveGroup`'s, or a program's own self-typed trait method beside some overload? The two cases that follow depend on which.
19. **Line 80, "size power" (low-medium).** The term is not given. "Except of 0, 1 or -1" suggests negative sizes, which "sizes" (the core's `nat`) does not lead a reader to expect. The passage does not say whether the checker accepts a negative exponent, which would decide whether row 675 is reachable from a checked program.
20. **Line 102, "Other reductions take their bound, or the expected type where the bound does not fit" (low).** What "does not fit" means is unclear.
21. **Line 108, "A generic one stops at its first join" (low).** "Stops" can mean a run-time error or that it returns early. `BIG //` is not in the core.
22. **Line 11 (low).** In "at every instance", whose instances are meant: the more specific declaration's, or each instance where both apply? The `ident` example relies on an unstated `Round extends Shape`.
23. **Line 48, "the count stage" (low).** The core names it once and never defines it. The reader cannot tell that it checks programs against the interpreter's library.
24. **Line 78 against line 7 (low).** Row 774 is cited for a departure of "walk and the compiled runtime", while line 7 says a row is a departure of one path.
25. **Line 7, "old note" (low).** The term is not given. The core says to take the record's facts as given, so the reader cannot tell which notes are "old".
26. **Line 7, "fixed-width arithmetic does not wrap" (low).** The core lists "wrapping" among the topics of `library.md`, so explicit wrapping operations presumably exist. The bare "does not wrap" can be over-read.
27. **Lines 65 and 112, `Nothing` (low).** "Scala's `Nothing`" (the bottom type) and Fortress's `Nothing` (the empty `Maybe`) share a name. The qualifier mostly saves it.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

- **Line 24, "The library's `-`, `MIN` and `MAX` have the same form, but only `+` was measured."** This is measurement history. With `excludes { Number }` already given as the fix, it changes no action. Either turn it into the instruction (declare the same exclusion for a functional `-`, `MIN` or `MAX`) or drop it.
- **Line 82, the two reasons a `reflect` call fails compiled (link now, row 307 after the switch-over).** The action does not depend on the reasons: it fails either way. Keep the one sentence that changes an action ("this holds for a program's own trait too") and the row. Drop the before/after account.
- **Line 61, row 908 (compiled `===` reaching the prelude's operators).** Under line 7's rule, nobody fixes the prelude, and the prelude is deleted at the switch-over. The sentence changes no action and adds an undefined term. Drop it, or define `===` and say what a compiled test sees.
- **Line 108, the bold "lifts its elements to `Maybe[\R\]` inside the reduction".** This is internal mechanism. The following sentence ("`BIG MAX` over a generator still answers `R`") exists only to undo the misunderstanding the bold line creates. The action is in the last three sentences, so make the bold line the action: declare `simpleJoin` at `R`, generically.
- **Line 80, "The class loader computes a size without checking its kind".** This is mechanism. "Do not write a negative size exponent" carries the action.
- **Line 48, "The Working Draft lets no trait type hold a tuple, but here" and "`Index` extends only `Any`, so such a tuple is still no `Object`".** The first is change history and the second changes no action that a worker would meet. Both are borderline. Keep the first only if workers read the Working Draft.
- **Line 86, "Route C is the way not chosen".** This is decision history. It earns its place only as vocabulary for reading the record, which the core says the parts must give. Keep it if the record still uses the names, and say what route B was, or the reader goes looking for it.
- **Line 112, "Walk has no static types ... So walk runs programs that the checker refuses."** This repeats the core ("How a program runs"). Only the `Maybe` condition and P-12 are new.
- **Line 65, the first two sentences.** These repeat the core's "Static parameters" bullet. The new content is `OPEN`'s printing, the overload comparison and the three `Bottom` rows.
- **Line 102, the list of contexts that direct walk's instance.** This mostly repeats the core. For the four reductions that must carry a written static argument anyway, it changes no action. It matters only for other reductions and comprehensions, so it could say so.
