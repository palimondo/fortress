# Cold read 2 of the orientation

Reader: a new worker who has read only `CLAUDE.md`, the core (`.claude/skills/fortress-repo/SKILL.md`) and `orientation.md`, which is headed "What the revival changed in the team's Fortress". I opened no source. Line numbers are those of `orientation.md` as I read it on 2026-10-22.

## 1. What I would do differently, section by section

### Preamble (lines 1-7)

- When the specification, walk with the interpreter's library, and the compiled path with the compiler's library disagree, I would look here first, then search FACTS and POSITIONS. Only after that would I call it a conflict and switch to exploring.
- I would cite a sentence as a curator decision only if it names a P-N. I would build on the other sentences, but not cite them as decisions.
- I would read a sentence that cites a ledger row as a departure of one path from its rule. I would never assert that behaviour as correct in a test. From the core's pointer to `XXX` expected failures, I infer that the test should assert the rule and be marked as an expected failure.
- I would not trust old notes, team tests or my own training on three points: the number types do not nest, fixed-width overflow raises `IntegerOverflow` instead of wrapping, and walk converts arguments.
- For the original wording of a changed rule I would read Appendix I. For the unrevised text I would read `Specification-1.0-frozen/`. I would not copy a Working Draft example.
- Limit: this section does not say what to cite for a rule that has neither a P-N nor a row (see 2.5).

### Dispatch and overloading (lines 9-23)

- I would accept overloads that differ only in the bounds of their static parameters (P-45). I would judge them by their declared domains, meaning the union over all instances within the bounds, using the core's three conditions. The more specific declaration's return type must be a subtype of the other's at every instance.
- For generic overloads I would read exclusion over the whole tuple of parameter types. When one generic type appears at several positions, its static arguments are forced to be equal (P-152). I would expect both paths to refuse a pair that leaves a static parameter unconstrained.
- Under walk I would never rely on the order of declarations. Walk infers a dotted generic method's static arguments from run-time types. I would read "Cannot unify" as an argument outside a generic method's bound.
- I would not take walk's load check as the verdict, whether it refuses or accepts. Before changing code to satisfy it, I would look the case up in `interpreter.md`, "What walk checks".
- I would treat two functional methods with equivalent parameter types as duplicates, wherever `self` stands, and count abstract declarations. When an object inherits an abstract functional method from one trait and its body from another, I would declare the method in the object itself (P-149), which Scala does not require.
- Limit: the duplicate rules are stated for the checker, except P-149, which covers both paths. Walk's behaviour on them is not given.

### Traits and objects (lines 25-42)

- I would not write a type that extends two instantiations of one generic trait. The checker refuses it; walk runs it (row 416). Under walk I would expect overloads on `Tg[\3\]` and `Tg[\4\]` to be refused. I would not copy the specification's examples marked "Not allowed".
- I would read `comprises` as a statement about values. A generic trait need not be listed if every type below it is below a listed type. Several declarations together can cover an overload meet. Under walk, only the main component's clauses are checked at load.
- I would write `override` only to widen, that is, where the inherited parameter types are strictly narrower than mine. To replace a declaration at the same types I would declare it again without `override`. I would never add a Java-style `override` to the library: walk refuses it at load, and that stops every program. Today the code generator refuses every `override` (row 650), and the checker accepts one that overrides nothing (row 653).
- I would give an object bodies that together cover each inherited abstract method's parameter types (P-147), with `comprises` read. Walk does not check a generic object (row 665). The checker refuses a cover by several bodies when static parameters are involved (row 725). The search limits are in `interpreter.md`.
- In a self-typed trait I would rely on `self` having type `T[\X\]` meet `X` in bodies, with no cast, while signatures keep `T[\X\]`. A type that extends `T[\A\]` must itself be an `A`. In compiled code I would avoid a body that returns `self`, because its class fails verification at load (row 695).
- I would compare pairs and triples only when every element type extends `StandardPartialOrder`. Under walk I would not compare mixed numeric run-time types at one position (row 511). In checked code I would not order a `List[\RR64\]` (P-154), even though walk allows it (row 774). `=` on lists compares element by element.

### Static parameters, `where` clauses and sizes (lines 44-63)

- I would expect a static parameter that a call leaves unfixed to take its bound, not `Nothing`. The checker uses the intersection of the upper bounds, narrowed by the expected type. Under walk I would read `OPEN` in output as a self-bounded parameter left open. I would expect `Bottom` under walk in three cases (rows 591, 612, 587).
- Under walk I would write the static arguments of a generic call used as an argument, as in `mk[\ZZ64\]()`. Walk gives arguments no expected type (row 705); the checker re-types them against the enclosing call (P-51).
- I would use only the three built `where` forms (P-151):
  - a conditional `extends` that binds no variable and states only `T extends Trait` constraints;
  - a condition that a function or method puts on its own static parameters or its trait's;
  - a type variable of a `where` inside `comprises`.

  I would write no other `where` on an `extends`, because the checker silently drops it. At run time I would not rely on a conditional extension being conditional (row 774). Under walk I would not rely on a dotted call's condition being checked (row 777). In compiled code I would not put a `where` on a declaration (row 701).
- I would compare sizes as they are written, after numeral arithmetic, so `s0 s1` is not `s1 s0`, and a `typecase` arm on a numeral stays reachable. I would keep size exponents between 0 and 4096, except for bases 0, 1 and -1.
- I would get a size known only at run time from `reflect` in `NatReflect.fsi`, which gives a `NatParam`. A call that uses one runs only under walk until the switch-over.

### Numbers (lines 65-73)

- I would treat the number types as siblings. In the record, "route A" and "the tower" mean the flat design, and "route C" is the rejected nested one.
- Under walk I would write explicit static arguments when a generic is instantiated from a numeral, because `Box[\Int\]` is not `Box[\ZZ32\]` (row 364). I would expect arithmetic on numerals to answer `ZZ32` (row 578).
- I would give `array1` and `array2` a number type as their static argument, so that they return a `Vector` or `Matrix` whose `+` and unary `-` work under walk (row 721).
- I would expect arguments to convert by declared coercions at calls, typed bindings and assignments. Walk chooses the coercion by the run-time value; the checker chooses it statically (P-59). A generic call promotes to the narrowest common target (P-74). Under walk, tuple and varargs elements are joined, not promoted (rows 395, 511). When several declarations apply only by coercion, both paths stop with "Ambiguous coercion".
- Powers (P-153): `^` answers the base's type. A negative exponent works only for bases 1 and -1; base 0 raises `DivisionByZero` and other bases raise `IntegerOverflow`. For a fraction I would write `2.0^(-1)` or use a `QQ` base. In compiled code before the switch-over, powers exist only at `ZZ32`, `NN32` and `NN64`, with an exponent of the same type. There a negative exponent gives 0, and base 0 throws a Java exception that no `catch` sees (rows 441, 523).

### Reductions and comprehensions (lines 75-85)

- In compiled code I would write the static argument on every `SUM`, `PROD`, `BIG MAX` and `BIG MIN` written in clause form (row 731).
- Under walk I would control a reduction's instance by declaring the type of its value: a local variable, or a top-level or local function's return type. A method's return type, a field, a top-level variable, a parameter and an assignment do not count. Otherwise walk uses the join of the run-time types. I would read `__bigOperator`, "body param 1" as an element that does not convert to the instance.
- I would expect three walk departures: an empty `SUM` with no declared type gives the integer 0 (row 716); a nested comprehension is built at run-time element types (rows 20, 717); and an empty `SUM` whose static argument is not a number type raises `CastError` (row 436).
- For a reduction without an identity I would extend `AssociativeReduction[\R\]` and type `simpleJoin` at `R`, never at `Any` or untyped. I would not copy the team's tests that do otherwise.

### Implementation limits (lines 87-91)

- I would not take walk's acceptance of a program as proof that it is well-typed (P-12). I would never write a `Maybe` as an `if` condition; only `Boolean` is allowed.
- I would type every parameter of functions, methods and local functions. The compiled path stops with "Missing parameter type for". Walk tolerates a missing type, except in a method that implements an abstract one (row 405).
- I would expect a component function written without a return type to take its api's return type at matching parameter types. If there is none, or more than one, the checker infers it from the body.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

1. **Line 3, "Read the part whole, after `SKILL.md`, before work."** The core's parts list says to load `references/revival-changes.md` only "when a team source, an old note or your training disagrees with this skill". A worker who follows the core reads this file only after a disagreement, but this file says to read it before any work. The two instructions conflict until the core's line changes. Confidence: high.
2. **Line 46, "A generic type that holds `OPEN` admits no more than at `Bottom`."** This seems to contradict core line 132, where an open parameter "stays open, and every value passes it". It is not clear what "admits" means here (an argument check, a type test, or a cast). Since `Bottom` is the empty type, a reader may conclude that nothing passes. The likely meaning is that the parameter itself accepts any value, while `BoxU[\OPEN\]` accepts only what `BoxU[\Bottom\]` would. The text does not say that. Confidence: high.
3. **Line 35, "if it has no `comprises` clause, or `comprises { ... }`, and a parameter `X`".**
   - (a) I cannot tell whether `{ ... }` is literal Fortress syntax (an open `comprises`) or the document leaving the list out. If it is an elision, the condition becomes "no `comprises`, or any `comprises`", which excludes nothing. Confidence: high.
   - (b) The grouping of "or" and "and" is ambiguous. Confidence: medium.
4. **Line 11, "(row 536)"** follows a rule sentence, not a departure. Under line 7's convention it marks a departure of one path, but the sentence names neither the path nor what it does wrong. If row 536 is already fixed, the citation is repair history. Confidence: medium-high.
5. **Line 5, "Each rule states the tree as it stands."** Line 7 says that row-citing sentences are departures of a path from a rule. The rule then does not describe the tree in those cases. Either the bold sentences state the design and the row sentences state the tree, or every sentence states the tree. A worker deciding whether a behaviour is a defect needs to know which. Confidence: medium.
6. **Line 5, "Build on a sentence without one, but do not cite it as a decision."** The core requires a source for every claim: the brief, an entry of the record, or a primary source. For a rule with neither a P-N nor a row, nothing here says what to cite: this part of the skill, FACTS, or code the worker must find. Confidence: medium.
7. **Line 5, "the type group's later papers".** "Type group" is in neither the core nor `CLAUDE.md`. Nothing says which papers count as "later", or what "the specification's early text" covers. Confidence: medium.
8. **Line 5, "The Working Draft is the unrevised specification, in `Specification-1.0-frozen/`."** The folder name says 1.0 and frozen, while "Working Draft" suggests a later draft. Line 5 also says that Appendix I keeps the original text. With two homes for the original, a worker may not know which to cite. Confidence: low-medium.
9. **Line 11, "must be a subtype of the other's at every instance".** The quantifier is unclear. It may mean every instance of the more specific declaration, compared with the other at the same static arguments, or every pair of instances. Confidence: medium.
10. **Line 11, the `ident` example.** The relation between `Shape` and `Round` is not stated, and whether the pair is valid depends on it (Round below Shape, or excluding it). Confidence: low-medium.
11. **Lines 19-22.**
    - In "the checker refuses an abstract functional method `h(self): ZZ32` beside a top-level `h(x: String): ZZ32`", the enclosing trait is not named. If it is `String` or a supertype, the example shows a duplicate. If it is unrelated, the example is the core's ordinary ambiguity rule and does not illustrate duplicates.
    - The three bullets say "the checker", except P-149, so a worker testing under walk cannot tell whether walk accepting the program is a departure.

    Confidence: medium.
12. **Line 13, "exclusion" has two senses in one paragraph:** exclusion of overload domains, and "the exclusion rule" about instantiations. Line 27 also calls the second "instantiation exclusion". Confidence: low.
13. **Line 27, "it refuses overloads on two instantiations, as at `Tg[\3\]` and `Tg[\4\]`".** `Tg` is not defined. The sentence reads as walk refusing a valid program, and it does not say whether this falls under row 416 or is a separate departure. Confidence: low-medium.
14. **Line 29, "Walk checks only the clauses of the program's main component at load."** It does not say what walk checks: that the listed types cover, or that no unlisted type extends the trait. It is also a departure with no row, against the convention of line 7. The same pattern appears at line 15 ("Cannot unify", if that is a departure) and line 89 (`Maybe` as a condition). A worker who meets one of these cannot tell whether it is recorded or a gap to explore. Confidence: medium.
15. **Line 31, "A trait's `override` holds for every type below it."** This could mean that subtypes inherit the widened declaration, or that it also overrides declarations that a subtype inherits from other traits. Confidence: low-medium.
16. **Line 40, "A compiled body that returns `self` fails the JVM's verification".** It is unclear whether this covers every body that returns `self` or only one whose declared result is `X`, as in the `floor` example just above. A worker may either avoid every `= self` in compiled code, or copy the `floor` example into it. Confidence: medium.
17. **Line 42, "Pairs and triples are ordered only ...".** It does not say whether tuples of four or more elements are unordered or follow the same rule. Confidence: low.
18. **Line 54, "Three `where` forms are built (P-151)".** It does not say where they are built. The code generator refuses form 2 (row 701), walk does not enforce it (row 777), and the run time does not apply the condition of form 1 (row 774). "Built" reads as working on both paths, but it holds only in the checker. Confidence: medium.
19. **Line 61.** The checker refuses size exponents above 4096, walk refuses negative ones, and the class loader throws on a negative one (row 675). Whether the checker refuses a negative exponent is not said. If it does not, such code passes the checker and dies when its class loads. Confidence: low-medium.
20. **Line 69, "Walk answers `IntLiteral`'s arithmetic as a `ZZ32` (row 578)."** The same paragraph says that walk gives each numeral the class `Int`, `Long` or `BigNum`, never `IntLiteral`. So I cannot tell what "`IntLiteral`'s arithmetic under walk" refers to: arithmetic on two numerals, or the operators declared on the type. Confidence: medium.
21. **Line 69.**
    - "converts to the integer types, `QQ` and `RR64`" leaves out `RR32`, and I cannot tell whether that is deliberate (does `x: RR32 = 1` compile?).
    - "Elsewhere they give a plain array, whose `+` and unary `-` fail dispatch under walk" does not say whether plain arrays also lack `+` on the compiled path.
    - The limit "not at a user subtype of `Number`" has no row, so I cannot tell whether it is a rule or a departure.

    Confidence: low-medium.
22. **Line 71, "In a few cases the checker settles the tie by the numeral's type instead".** The cases are not named, so a worker cannot predict whether "Ambiguous coercion" or the numeral rule will apply. Confidence: medium.
23. **Line 79.**
    - "Write it in every clause form" leaves open whether the bracketless form (a reduction over a collection) also needs the static argument. Limiting the rule to clause forms suggests it does not, but the text does not say so.
    - In "or the expected type where the bound does not fit", it is not said what the bound must fit.

    Confidence: medium.
24. **Line 77, `0#n`.** The range syntax is not in the core, which points to `library.md`. A reader may take it as 0 to n inclusive. Confidence: low.
25. **Line 85.**
    - "BIG MAX over a generator still answers R" does not say what an empty `BIG MAX` answers or raises.
    - `simpleJoin` is not in the core.
    - "A generic one stops at its first join" could be read as every generic reduction stopping there, not only one whose `simpleJoin` is typed at `Any` or untyped.

    Confidence: medium.
26. **Line 91, "Write every parameter type".** `self` is never typed (core: `opr +(self, other: T)`), and function expressions are missing from "a function, a method or a local function". A literal reader might type `self`, or leave the parameters of a function expression untyped on the compiled path. Confidence: medium.
27. **Line 89, "until it runs the checker after the switch-over (P-12)".** The core says that the switch-over moves the compiled path onto the interpreter's library, but not that walk will then run the checker. A worker may wonder whether turning walk's checker on is part of switch-over work. Confidence: low.
28. **Line 35, "the trait met with the implementing type".** "Met" (from meet) is followed in the next sentence by "intersection type" for the same thing. The core uses "meet" without defining it. Confidence: low.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

1. **Line 27, "Without the rule, such programs die with `IncompatibleClassChangeError`."** This explains why the rule exists. The checker now refuses such types and walk runs them, so a worker meets the error only if the checker misses a case. It passes Astra's second question only if it is reworded as a diagnostic ("an `IncompatibleClassChangeError` points to a type with two instantiations"). Confidence: low-medium.
2. **Line 13, "The team's walk read exclusion position by position."** This is history of the team's walk, and line 7 already warns that team tests and notes can be wrong. It would change an action only if it said that team tests expecting such refusals are stale. Confidence: low.
3. **Line 11, "(row 536)".** If the row is fixed, this is repair history dressed as a departure (see 2.4). Confidence: medium that the citation is a problem, low that it is history.
4. **Line 71, "In a few cases the checker settles the tie ...".** As written, it does not let a worker predict anything, so it changes no action. It should name the cases or be cut (see 2.22). Confidence: low-medium.

The rest of the file passes both questions:
- the comparisons with Java, Scala and Haskell are what the part is for;
- the error strings ("Cannot unify", "Ambiguous coercion", "body param 1", "Missing parameter type for", `OPEN`) help diagnosis;
- the record's glossary terms (route A, route C, "the tower") prevent misreading;
- the P-N and row citations serve lookup.

The one gap in the glossary is that route B is never mentioned, so a reader of the record may wonder what it was.
