# Cold read of the climb-batch-29 orientation

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and `orientation.md` (121 lines) in this folder. Nothing else was opened. Line numbers are those of `orientation.md`. "Core" means `SKILL.md`.

## 1. What I would do differently, section by section

### Preamble (lines 1-7)

- Take each bold sentence as this tree's rule over the specification, a team test, an old note or my training. Question one only with evidence that its decision did not use. Limit: a sentence with no P-N can be built on but not cited as a curator decision.
- Cite a sentence that names P-N as a decision of the curator.
- Never write a test that asserts as correct a behaviour that a sentence ties to a ledger row. Limit: the file does not say what the test should assert instead, for example the bold rule marked as an `XXX` expected failure.
- Leave a limit that opens "Until the switch-over" unfixed in the compiler's prelude, and keep such code out of compiled tests. Limit: the core says the prelude is three files of the compiler's library, and the file does not say whether its other files are off limits too (2.8).
- Before I call a disagreement a conflict, search FACTS and POSITIONS.
- Drop three priors even when an old note or a team test supports them: the number types nest, fixed-width arithmetic wraps, and walk passes arguments without converting them.
- Do not cite `Specification-1.0-frozen/` (the Working Draft) as the specification. Look in Appendix I for the text that a rule replaced.

### Dispatch and overloading (lines 9-24)

- Accept overloads that differ only in their static-parameter bounds (P-45). Check that the more specific one's return type is a subtype of the other's at every instance.
- Judge exclusion between generic overloads over the whole parameter tuple. A generic type shared at one position, such as `Box[\T\]` in both, forces equal static arguments. A parameter that nothing ties, such as `U` against `T`, means both paths refuse the pair. Limit: P-157's substitution of the bounds' meet is stated for the checker only (2.16).
- Never rely on declaration order under walk. Read "Cannot unify" as an argument outside the bound of a trait's generic method.
- Never take walk's loading of a program as proof that it is valid, and never change code only to pass walk's load check. Look up `interpreter.md`, "What walk checks", first.
- Never declare two functional methods with equivalent parameter types and `self` in different positions. Never put an abstract and a concrete method with the same parameter types in one trait. When an object inherits an abstract functional method from one trait and its body from another, declare the method in the object, even though Scala would not ask for it (P-149).
- Give a program's trait that declares its own functional `+`, `-`, `MIN` or `MAX` an `excludes { Number }` or an `excludes { HasRank }`, or move the operator into an object. Otherwise expect "fails the Meet Rule" under walk. Never take a compiled success as proof (row 918). Limit: line 43 seems to exempt self-typed traits (2.2).

### Traits and objects (lines 26-62)

- Never write a type that extends two instantiations of one generic trait. Never copy a specification example marked "Not allowed". Expect walk to refuse overloads on `Tg[\3\]` and `Tg[\4\]` (row 416).
- Do not list every subtype in a `comprises` clause. Do not trust walk's load check of extenders outside the main component (row 551).
- Never write a Java-style `override` at the inherited parameter types: declare the method again without `override`. In the library such an `override` stops every program. Use `override` only to widen. Limits: the code generator refuses every `override` (row 650), so no compiled test can carry one, and the checker accepts the Java-style form (row 653). The file does not say what a widening `override` does at dispatch (2.14).
- To implement an inherited abstract method in an object, give it one body or several narrower bodies that cover its parameter types, reading `comprises` clauses. Avoid a cover by several bodies where the checker runs and any of the methods has static parameters (row 725). Do not expect walk to check a generic object (row 665).
- In a self-typed trait, use `self` as the implementing type without a cast. Never extend `T[\A\]` from a type that is not an `A`. Keep a body that returns `self` out of compiled code (row 695). Expect walk's load check to refuse such a trait's operator beside the library's array-number one in the two listed cases.
- Bound an index parameter by `Index`, but only in code that runs under walk or is checked against the interpreter's library, never in a compiled program before the switch-over. Pass `m[i, j]` as one tuple index. In checked code, take a tuple index at `I extends Index`, not at `Index` (row 805). Do not treat `()` as an index.
- Order tuples only when every element type extends `StandardPartialOrder`. Under walk, never compare numbers of two run-time types at one position (row 511). In checked code, never order a `List[\RR64\]`.
- Assume `=` is `SEQV` on a type that declares no `=`, so strings compare by identity there. Give a value object that holds strings its own `=`. For equivalence of booleans write `<->`, never `EQV` or `≡`. Expect tuples longer than three to fall back to `SEQV`. Before the switch-over, a compiled `===` compares by `=` (row 908).

### Static parameters, `where` clauses and sizes (lines 64-83)

- Expect a type parameter that a call does not fix to take its bound. Under walk, write the static argument wherever the checker would take it from the enclosing call, as `mk[\ZZ64\]()` (row 705). Expect `Bottom` in the three listed cases.
- Write a conditional extension only as `extends P where { T extends X }`. Expect the checker to ignore any other `where` on an `extends` entry without a message. Never rely on either run time to honour a conditional extension or a method's `where` condition. Keep a function with `where [\nat n\]` out of compiled programs (row 867).
- Treat two sizes as equal only when they are written alike after numeral arithmetic, so `s0 s1` is not `s1 s0`. Do not assume an arm on `N[\0\]` is unreachable. Keep size powers non-negative and at most 4096, except for 0, 1 and -1.
- Use `reflect` from `NatReflect` only under walk, now and after the switch-over. In compiled code, never pass a value of a trait whose `comprises` lists a type at a `where`-clause size where that listed type is expected (row 307).

### Numbers (lines 85-103)

- Read "route A", "route C" and "the tower" in the record as names. None of them means that the number types nest.
- Rely on a numeral converting at a typed binding, an assignment, a field, a parameter or a declared return type. Expect the default everywhere else, and never move a defaulted value into another type (`q: QQ = x`). Read a `nat` or `int` parameter's value as a `ZZ32` (2.1).
- Never use `NaturalNumeral` or `RadixPointNumeral` as the type of a variable, a field or a return. Give my own number type a `coerce` from each. Expect `array1` and `array2` to give a plain array at that type.
- In a test of run-time arithmetic or concatenation, bind a typed operand first: an expression of numerals alone folds exactly (`2147483647 + 1` does not overflow).
- Expect a generic call to promote to the narrowest common coercion target, but under walk not across the elements of a tuple or varargs (rows 395, 511). Expect "Ambiguous coercion" when overloads apply only by coercion.
- Convert integers with an `asZZ32`-style getter when a value must be checked, and with `narrow`, `widen`, `signed`, `unsigned` or `big` when wrapping is wanted. For a `ZZ`, use the getters. Before the switch-over, expect the compiled prelude to have only the listed getters (row 349).
- Never write arithmetic generic over `T extends Number`: declare it once per number type. Never compare across number types with `=` unless a coercion exists between them, because a `ZZ64` against an equal `RR64` is silently `false`. Use `asFloat`.
- Expect `^` to answer its base's type and to raise at a negative exponent. Write `2.0^(-1)` or a `QQ` base. Keep integer powers out of compiled code beyond the listed types (rows 441, 523).
- Expect `/` on integers to give a `QQ`. Truncate with `DIV`. Get a float with `(1.0 s) / n` for `ZZ32` operands, or with `asFloat` for `ZZ64` ones. Never write integer `/` in compiled code before the switch-over.

### Reductions and comprehensions (lines 105-115)

- Write the static argument in every clause form of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` (row 731). For other reductions under walk, declare the type at a local variable or at a function's return. A method's return type, a field, a parameter or an assignment does not direct it.
- Never assert walk's empty untyped `SUM` (row 716). Never give `SUM` a static argument that is not a number type (row 436).
- Declare `simpleJoin` at `R` in my own reduction without an identity, and never copy the team tests' `Any` or untyped form.

### Implementation limits (lines 117-121)

- Never write a `Maybe` as an `if` condition.
- Write the type of every parameter of a function, method or local function. Limit: the file does not say whether a function expression is covered (2.13).
- Let a component's function take its return type from its api, or write the type when the api has none or several declarations at those parameter types.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

2.1 Line 89 against the core. Line 89 says "A `nat` or `int` parameter used as a value is a `ZZ32`, so `u: NN32 = n` is refused (P-40)". The core, "Fortress as a language", says "sizes (`nat` is an `NN32` value, `int` a `ZZ32`)". A worker who read the core first writes `u: NN32 = n`. If the core means that the kind ranges over `NN32` values while the value is typed `ZZ32`, one of the two files must say so. Confidence high (75%).

2.2 Line 24 against line 43. Line 24: a program's trait that declares its own functional `+` overlaps the library's array-number `+`, and walk refuses it with "fails the Meet Rule" unless the trait excludes `Number` or `HasRank`. Line 43: with P-157's reading, walk "loads such a pair in the library and in a program's own component", except in two cases. For a program's self-typed trait, such as `trait Vec[\V extends Vec[\V\]\]` with `opr +(self, o: V)`, I cannot tell whether I must add the `excludes`. "Such a pair in a program's own component" also reads two ways: the program's trait against the library's `+`, or both declarations inside the program. Confidence medium-high (65%).

2.3 Line 7's convention against the rest of the file. Line 7 says that a sentence citing a ledger row states a departure, and that a sentence without one can be built on. Several departures cite no row, so a worker would take them as rules and assert them in tests:
- line 43, walk's load check refusing a valid pair in the two listed cases;
- line 66, a type holding `OPEN` admitting "only what it admits at `Bottom`";
- line 79, "the code generator ... emits no code for it, so the compiled runtime does not check it";
- line 81, "Walk refuses a negative exponent", which is a rule or a departure.
Going the other way, line 62 cites row 923 as "the question of longer tuples". That row holds an open question, not a departure, so I cannot tell whether `(s, 1, 2, 3) = (t, 1, 2, 3)` being `false` may be asserted. Confidence medium-high (70%).

2.4 Line 95, numerals between overloads. "Where several declarations apply only by coercion and none is more specific, both paths stop: 'Ambiguous coercion'. Where the tied declarations differ only at the positions of the call's numerals, the checker reads the numeral as `ZZ32`". Taken literally, walk stops on `f(3)` beside `f(x: ZZ32)` and `f(x: RR64)`, the commonest case of all. The other reading is that under walk the numeral is already a `ZZ32` when it runs, so `f(ZZ32)` fits without a coercion. The file does not say what a numeral is at run time under walk. Confidence medium (55%).

2.5 Line 66, the `pick` example. `pick(x: (T,T))` does not show `T`'s bound. The behaviour applies only to a parameter "whose bound names itself", so with `T` unbounded the example does not show the rule. "A type that holds `OPEN`" also reads two ways against "Every value passes `OPEN` itself": I cannot tell whether a bare `pick(x: T)` beside `pick(x: Any)` takes every value or none. "Where walk compares overloads", at load or at the call, is also open. Confidence medium (55%).

2.6 Lines 89, 62 and 93: `=` as binding and as equality. In line 89, `u: NN32 = 5` and `n = 3000000000` bind, while "`h = 0.5` is `true`" compares. The core teaches that "`x = e` declares an immutable variable", so a reader new to Fortress takes `h = 0.5` as rebinding `h`. Writing "`(h = 0.5)` evaluates to `true`" would remove the doubt. Confidence medium (55%).

2.7 Lines 89, 93 and 103: the default of a folded non-integer. Line 89's defaults are `ZZ32`, `ZZ64` or `ZZ`, and `RR64` with a radix point. Line 93 says "`7/2` is a `QQ`", and line 103 says "`7 / 2` is `7/2`". The fold's result is "one numeral, which converts or takes its default", and the default list has no case for a value that is not an integer and has no radix point. So the type of `x = 7/2` comes only from the example. Confidence medium (55%).

2.8 Lines 7, 48, 89, 97 and 101: "compiler's prelude" against "compiler's library". The core defines the prelude as three files of the compiler's library. The file uses both names for limits that end at the switch-over, and forbids fixes only "in the compiler's prelude". I cannot tell whether a fix in the compiler's other library files is allowed, or whether the two names mean the same thing here. Confidence medium-low (45%).

2.9 Line 93 against the core. The core says that `fortress compile` "folds integer literals" before the checker. Line 93 says that every expression of numerals alone folds, comparisons and powers and string `||` included, "on both paths". A worker who trusts the core expects walk not to fold, and expects `0.1 + 0.2 = 0.3` to be computed in floating point. The orientation is presumably the newer text, but the core should agree with it. Confidence medium-low (40%).

2.10 Line 48, `Index`. The paragraph opens "In the library, and in your own generic over such a type, write `I extends Index`", and only near its end limits this to code under walk or checked against the interpreter's library. A worker who acts on the first instruction writes `Index` into a compiled test, which then does not compile. "Walk runs the code without the bound" reads two ways: walk accepts code that leaves the bound out, or walk ignores the bound. Confidence medium-low (40%).

2.11 Line 72. The bold "Only the checker gives a call written as an argument the enclosing call's context" states a departure as the tree's rule, although the next sentences cite walk's behaviour as row 705. I cannot tell whether the rule is "arguments get context, and walk departs" or "only the checker does it". Confidence low-medium (40%).

2.12 Line 109. The bold "A reduction's static argument depends on the path" is a description, not a rule, which goes against line 5 ("Each bold rule states the rule of this tree"). The rule a worker needs is the instruction that follows it: write the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` in every clause form. The file does not say whether a written static argument also directs walk, though "Write it in every clause form" implies it. Confidence low-medium (35%).

2.13 Line 121. "Walk runs it, except in a method that implements an abstract one (row 405)": I cannot tell whether the departure in row 405 is walk running an untyped parameter or walk failing in the implementing method. The list "a function, a method or a local function" leaves out a function expression (`fn x => ...`), which line 70 mentions. Confidence medium-low (45%).

2.14 Line 32, `override`. The file says when an `override` overrides, but not what overriding does under dispatch on every argument. Presumably the wider body then runs at the inherited, narrower types in place of the inherited body. A worker can follow "never Java-style" without being able to predict which body runs. Confidence medium-low (40%).

2.15 Line 91. "...through its own `coerce(x: NaturalNumeral)` ..., with one result for each place where the numeral is written" reads two ways: the coercion runs once for each written occurrence, or the coercion may give a different result depending on the place. Confidence medium-low (40%).

2.16 Lines 13 and 19: statements made for the checker alone. P-157's substitution of the meet of a parameter's bounds (line 13) and the refusal of `f(self, y: S)` beside `f(x: S, self)` (line 19) are stated for the checker, and walk is not mentioned. The bold rule at line 19 suggests that both paths should refuse the duplicate. Confidence low (30%).

2.17 Line 11. The example assumes, without saying so, that `Round` extends `Shape`. "At every instance, not at one only" does not say which instance of one declaration is paired with which of the other. Confidence low (30%).

2.18 Line 24. "An abstract functional method also counts for it": as one of the two overloads that need a cover, or as the cover itself. The example settles the first reading, but the second is not ruled out. Confidence low (30%).

2.19 Line 41, row 695. "A compiled body of `T` that returns `self`" does not say whether the failure is for every such body or only for one whose return type is the parameter `X`, as in `floor(self): I = self`. Confidence low (30%).

2.20 Line 103. It writes `(1.0 s) / n` for `ZZ32` operands and `asFloat` for `ZZ64` ones, but leaves out the reason: no coercion carries a `ZZ64` into `RR64`, which line 99 only implies. A worker who writes `(1.0 s) / n` with `ZZ64` operands cannot predict the result. Confidence low (30%).

2.21 Line 95 against line 89. Walk converts "at a call, a typed binding and an assignment", while line 89's places also include a field and a declared return type. It is unclear whether walk converts there. Confidence low (25%).

2.22 Line 7. "Do not assert it as correct in a test" gives no positive instruction, such as asserting the bold rule and marking the test `XXX`. Confidence low (30%).

2.23 Terms that the core does not give (low, 20-30% each):
- "meet": the core uses it in "a third covers their meet" but defines only "join";
- "the count stage" (line 48): the core names it without defining it;
- `...` in a `comprises` clause (line 38);
- `0#n` (line 107);
- `BIG //` (line 115);
- "extenders" (line 30);
- `HasRank` (line 24), which is glossed only by "make it exclude arrays";
- "route A" and "route C" (line 87): no route B is mentioned, so a reader looks for one.

Placement, which sends no one wrong: tuple and list ordering and `SEQV` (lines 53-62) sit under "Traits and objects", while a reader looking for equality of numbers starts in "Numbers". Line 99's back-reference partly covers this.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

3.1 Line 43, second sentence: "With this reading and the bounds that the test reads ..., the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own." This justifies the library after a checker repair (P-157). A worker who writes a program or a test takes no action from it, and only a checker worker needs it. Keep the two cases where walk still refuses the pair, which do change action, and give them a ledger row (2.3).

3.2 Line 87: "Route C is the way not chosen: a checker rule under which the number types could nest again." This is the history of a rejected option. A worker needs only the gloss: route A is flat numbers (P-43), route C a rejected alternative, and "the tower" the number and order traits.

3.3 Line 83: "After the switch-over, such a call still fails, for a second reason. `NatParam` is declared `comprises { N[\n\] } where [\nat n\]`...". This is the mechanism of a future failure. The action is the same now and after the switch-over: run-time sizes are walk-only. The last two sentences (row 307, "This holds for a program's own trait too") change action now, so keep them.

3.4 Line 62: "A float numeral converts where `RR64` is declared ..., so `y: RR64 = 0.5` is `SEQV` `p + p`, computed from `p: RR64 = 0.25`." Both operands are typed `RR64` and `0.25 + 0.25` is exact, so the example teaches nothing beyond "a float by its bits". It reads as a leftover from a time when a typed numeral kept a numeral type. If its point is that a numeral bound at `RR64` is an `RR64` under `SEQV`, one clause does it.

3.5 Line 115: "lifts its elements to `Maybe[\R\]` inside the reduction". This is an implementation mechanism. The actions are to declare `simpleJoin` at `R` and to expect `BIG MAX` to answer `R`, and the lifting changes neither.

3.6 Line 119, first and third sentences ("Walk has no static types", "So walk runs programs that the checker refuses"). These repeat the core, "How a program runs" ("The tree has no static types ... A program that runs under walk can be ill-typed"). Only P-12 and the `Maybe` condition are new.

3.7 Line 109, "Walk instantiates a reduction at its value's declared type: a local variable's, or a top-level or local function's return type". This repeats the core's "Static parameters" bullet. The new parts are "also where the clause form ends a block", the list of places that do not direct it, the fallback to the join, and the message "body param 1".

3.8 Line 66, first and third sentences. These repeat the same core bullet ("takes its bound", "stays open, and every value passes it"). The new parts are the name `OPEN`, the checker's intersection and the three `Bottom` rows.

3.9 Line 13, "By the exclusion rule, a value of both domains has one instance of each generic type at each position, so those instances' static arguments are equal." This is a derivation, and the rule and its two examples carry the action without it. It is borderline: it helps a worker predict untested cases, so it could stay if shortened.

Apart from 3.1 and 3.2, the file carries no repair narrative: no batch, fix or earlier state of the tree is described.
