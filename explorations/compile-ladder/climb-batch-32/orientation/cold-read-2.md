# Cold read 2 of `orientation.md`

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), `orientation.md`. Nothing else opened, no source, nothing run. Confidence is my confidence that the passage is a real problem for a new worker: high, medium or low.

## 1. What I would do differently, section by section

### Opening (lines 1-7)

- Rule: the text is the tree's rule, over the specification, the team's tests, old notes and my training. A sentence with P-N is a curator decision and can be cited as one; a sentence without is to be built on but not cited as a decision. I question a rule only on new evidence.
- A sentence with a ledger row is unsettled: I do not assert it in a plain test, only in an `XXX` test.
- "Until the switch-over" marks a limit of the compiler's library: I do not fix it in the compiler's prelude.
- Before I call a disagreement a conflict, I search FACTS and POSITIONS.
- Limits: it does not say what a sentence about a departure with neither P-N nor row is (see 2.1).

### Dispatch and overloading

- I may write overloads that differ only in static parameters and bounds; the Working Draft's ban is gone. The more specific one's return type must fit at every allowed instance.
- With generic parameter types, two overloads are valid if a value in both would force static arguments that cannot be equal, or force an instance where a position excludes. A pair that leaves a static parameter untied is refused on both paths.
- Declaration order never matters under walk.
- Walk's acceptance or refusal at load proves nothing about validity: I look the case up in `interpreter.md`, "What walk checks", before I change code to satisfy it.
- I do not write two functional methods with the same parameter types with `self` at different positions, nor an abstract and a concrete at the same types; an object that gets an abstract functional method from one trait and the body from another must declare the method itself.
- A trait of mine with a functional `+`, `-`, `MIN` or `MAX` gets `excludes { Number }` or `excludes { HasRank }`, or I declare the operator in an object. A functional method in a trait beside a top-level function of the same name on an unrelated type needs a cover for the meet.
- Limits: the checker lets the trait-against-library case through (row 918), so a compile that passes does not show the pair is valid.

### Traits and objects

- No type extends two instantiations of one generic trait; walk will not stop me, the checker will. I do not copy the Working Draft's "Not allowed" examples, and under walk I do not overload on two instantiations (row 416).
- `comprises` is about values: a cover of a meet can be several declarations; a generic trait need not be listed.
- `override` only where my parameter types are strictly wider than the inherited ones; to replace at the same types, redeclare without `override`. A Java-style `override` in the library breaks every walk run. In a program that must compile I write no `override` at all (row 650).
- An object must cover each inherited abstract method's parameter types, by one body or several.
- In a self-typed trait, `self` is also the implementing type, so no cast for `floor(self): I = self`; but a compiled body that returns `self` fails verification (row 695).
- Index parameters are `I extends Index` in the interpreter's library and in code checked against it; not in code compiled against the compiler's prelude. `m[i, j]` passes one tuple. Only `ZZ32` among integers is an `Index`.
- Tuples compare by `<` only with `StandardPartialOrder` element types; lists of `RR64` have no order for the checker.
- `=` on a type with no `=` is `SEQV`: strings inside a value object compare by identity, so I give a value object its own `=` or compare the parts. Tuples longer than three fall back to `SEQV`. I write `<->`, not `≡`, for boolean equivalence.
- Limits: the compiler's library has no `=` on `Any` or tuples, and its `===` compares by `=` (row 908).

### Static parameters, `where` clauses and sizes

- An unfixed type parameter is its bound, not `Nothing`. Under walk I write the static argument on an argument call such as `mk[\ZZ64\]()`, since walk gives no expected type.
- Only three `where` forms mean anything. Any other `where` on `extends` is silently ignored by the checker. Nothing at run time enforces a `where` clause; a compiled call of a function whose clause introduces a `where` variable dies (row 867), so I use a static parameter instead.
- Sizes are equal only as written after numeral arithmetic; I do not rely on `s0 s1` equalling `s1 s0`, and I do not treat a `typecase` arm on a numeral size as dead.
- `reflect` and `NatParam` are walk-only, now and after the switch-over; I do not pass a value of a trait that comprises a type at a `where`-clause size where the listed type is expected, in compiled code.

### Numbers

- No widening by subtyping and no numeral values at run time. A numeral converts at a typed place (binding, assignment, field, parameter, declared return type), exactly, or with one rounding to a float; otherwise it takes a default (`ZZ32`, `ZZ64`, `ZZ`, `RR64`) and that default is then the value's type for good.
- Out-of-range numerals are refused, statically by the checker, at run time by walk. For an infinity I overflow run-time arithmetic.
- A numeral type appears only as the parameter type of a coercion or operator. My own number type needs a coercion generic over `n, r, v` (and `m`), and a `coerce(q: QQ)` or other default-type coercion for folded constants.
- Numeral-only expressions fold exactly before checking: a test of overflow, float rounding or concatenation needs a variable operand.
- Promotion: a generic call runs at the narrowest type all arguments coerce into; not for tuple elements or varargs under walk.
- Integer conversion: `x.asZZ32` and its kin to check, `narrow`/`widen`/`signed`/`unsigned`/`big` to keep low bits. `ZZ` has only `big`.
- Generic code over `T extends Number` can call nothing numeric on a `T`; I declare the function once per number type. `=` across types without a coercion is silently `false`: I write `asFloat(x) = y`.
- `^` on integers answers the base's type; `/` on integers is a `QQ`; `DIV` truncates. `ZZ64` to `RR64` needs `asFloat`.
- Limits: the compiler's library has no `QQ`, no `TIMES`, no `isInfinite`, few getters, few powers, `/` only at `RR64`.

### Reductions and comprehensions

- For `SUM`, `PROD`, `BIG MAX`, `BIG MIN` without a static argument, the checker sums in the expected type and walk in the declared type of a local variable or a function's return type only. At a method's return type, a field, a top-level variable or an assignment I write the static argument, in any program for both paths. I always write both arguments of `BIG MIN_MAX`.
- I do not rely on an empty untyped `SUM` or on a nested comprehension's type under walk.
- My own reduction without an identity declares `simpleJoin` at `R`, not `Any` or untyped; I do not copy the team's tests.

### Implementation limits

- I write every parameter type. I never use a `Maybe` as an `if` condition though walk takes one. A component function without a return type takes the api's.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core lacks

2.1 Line 7, "A sentence that cites a ledger row states a behaviour that is not settled". Many sentences state a walk or checker departure with neither P-N nor row: "In two cases walk does not read `self` so, and its load check refuses the valid pair" (43-46); "Walk runs the code without the bound" (48); "Walk refuses a negative exponent" (83); "The code generator accepts a declaration's own `where` clause but emits no code for it" (81); "The checker reads an `extends` entry with any other `where` clause as unconditional" (81); "Besides a `Boolean`, walk takes a `Maybe`" (132). By the opening they are settled and I may assert them in a plain test, yet several are plainly gaps. Either give them rows or say what an unrowed departure is. Confidence: high.

2.2 Line 48, `Index`. "In the library, and in your own generic over such a type, write `I extends Index`" against "write the bound only in code that runs under walk or is checked against the interpreter's library". "The library" is two libraries until the switch-over, and a model program runs on both paths: a worker cannot tell whether a generic in a both-paths program gets the bound (it then does not compile) or omits it (the count stage then refuses it). State the case of code for both paths. Confidence: high.

2.3 Lines 91-99, which path. P-173 examples use `QQ` (`q: QQ = 0.1`, `h = 0.5`, "defaults to a `QQ`") and say "on both paths", but only line 114 says the compiler's library has no `QQ`. Is a compiled `lr: RR64 = 1/1000` a folded constant that converts with one rounding, or the "static error" of line 114? Line 99 says the fold is before the checker on both paths, line 114 says a compiled `7 / 2` is a static error; both can hold (untyped quotient defaults to the missing `QQ`), but the typed case is the one a model line meets and it is not stated. Confidence: high.

2.4 Line 32, `override`. The code generator refuses every `override` modifier (row 650), and walk stops on a wrong one in the library. After the switch-over the compiled path compiles the interpreter's library. The passage does not say whether a library edit may add `override` at all. A worker editing the library reads "use it only where it widens"; a worker thinking of the switch-over reads "never". Confidence: medium.

2.5 Line 13, P-152 and P-157. "exclusion" is used in two senses in adjacent sentences: the exclusion rule (no two instances of one generic type) and domains that exclude. "or where some position excludes at the instance that they force" I could not restate without the example. The P-157 sentence ("puts the meet of a static parameter's declared bounds in the parameter's place where the parameter is a whole parameter type, an element of a tuple or a member of an intersection or union") gives no example and no consequence for someone writing overloads; I take it to mean that `f[\T extends A\](x: T)` beside `f[\U extends B\](x: U)` is valid when `A` excludes `B`, but that is a guess. Confidence: high that it is opaque; medium on my reading.

2.6 Line 24. The Meet Rule paragraph sits under the bold rule about duplicates, with no bold rule of its own, though it is the paragraph with the most action (a program's trait with `+`). "The checker refuses such a pair in one component, but accepts it against the library's `+` (row 918)": against which library? If the compiler's library merely lacks the array `+`, this is an "Until the switch-over" limit, not a departure. `HasRank` is not in the core; usable as a literal. Confidence: medium.

2.7 Line 19, "Abstract declarations count:". Count as what? The first bullet is a duplicate; the second (abstract from one trait, body from another) is not a duplicate in any sense the rule gives, so the reason and the limits of the refusal are unclear (does a dotted method behave the same?). Confidence: medium.

2.8 Line 30, "So where the Meet Rule asks for a declaration at the meet ... several declarations that together cover the meet serve." The "So" does not follow from the sentence before it (a Java `permits` comparison). Also "walk checks extenders only against the clauses of the program's main component": "extenders" is not defined; I read it as "types that extend a trait with a `comprises` clause". Confidence: low.

2.9 Line 41 against line 41. `floor(self): I = self` "is valid without a cast", then "A compiled body of `T` that returns `self` fails the JVM's verification" (row 695). A worker takes the example as the pattern to write; say what to write on the compiled path. Confidence: medium.

2.10 Line 68, `OPEN`. "Every value passes `OPEN` itself" then "a type that holds `OPEN` admits only what it admits at `Bottom`". The example rescues it, but "admits" and "passes" are two words for what looks like one test, and the first reading is a contradiction. Confidence: medium.

2.11 Line 83, "`typecase N[\b0\] of N[\0\] => ...`". `typecase` takes an expression as I understand the form; `N[\b0\]` reads as a type. I cannot tell what to write. Confidence: low (my Fortress is thin).

2.12 Line 93, "`t TIMES 10.0`". Why `TIMES` and not juxtaposition? If `t 10.0` behaves differently a worker needs to know; if not, the example teaches an unexplained spelling, and then the next sentence says the prelude lacks `TIMES`. Confidence: low.

2.13 Line 97, last two sentences. `array1`, `array2`, `Vector`, `Matrix` and "plain array" are not in the core, and the sentence is about array factories inside a paragraph on numeral coercions. Confidence: medium that it is misplaced.

2.14 Lines 97 and 99, negative constants. Line 99 says a numeral-only expression folds into one exact constant; line 97 says `-3` reaches a program's own type as prefix `-` on the coercion of `3`. For the eight number types, is `-3` the folded constant (so `x: ZZ32 = -2147483648` binds)? I assume yes; it is not said. Confidence: medium.

2.15 Line 106, row 1017: "`g(5)` runs `g[\T\](x: T)` beside `g(x: NN32)`" listed as a departure. By the rule as stated I cannot tell without thought that `g(x: NN32)` should run (its type is a strict subtype of `T`'s bound). One clause saying which should run would settle it. Confidence: low.

2.16 Line 120. "A reduction with a plain bound takes its bound, or the expected type where the bound does not fit" stands between a checker sentence and a walk sentence; I read it as the checker, but it could be both paths. "if it is outside the reduction's bound, each `+` runs at its operands' types" I cannot turn into an expectation. The rule's title covers only reductions whose bound names the parameter, but the section is also "comprehensions", for which only row 717 says anything. Confidence: medium.

2.17 Line 128. "lifts its elements to `Maybe[\R\]` inside the reduction ... `BIG MAX` over a generator still answers `R`": then what does an empty `BIG MAX` answer or raise? The lifting invites the question and the passage does not answer it. `AssociativeReduction`, `simpleJoin` are not in the core (fine if `library.md` is loaded). "A generic one stops at its first join": I read "a generic reduction that declares `simpleJoin` at `Any` fails at run time, at its first join". Confidence: medium.

2.18 Line 132. The `Maybe` condition is under the bold rule "Walk has no static types", which it does not follow from. A worker scanning bold rules will not find it. Confidence: medium.

2.19 Line 57. "The interpreter's library declares it for no type, and walk stops on it": "it" is `≡`, two sentences back, after a sentence about `≣`. With two near-identical glyphs a wrong reading is easy. Confidence: medium.

2.20 Line 1, title. "What the revival changed in the team's Fortress" against the stated purpose (what a worker must know before work). The content is also walk-against-checker departures, which the revival did not all change. Confidence: low.

2.21 Line 101, "Walk converts a value other than a numeral at a call, a typed binding and an assignment". Fields are in the numeral list (line 93) but not here; I cannot tell whether a field converts a non-numeral value. Confidence: low.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

- Line 22: "The Scala language accepts it." No action.
- Line 13: the P-157 sentence, as written, is checker mechanism. Keep only with an example a writer of overloads can use (2.5).
- Line 5: "Most rules follow the team's later type papers ... over the specification's early text (P-26; `exploring.md`)". It belongs to exploring; here it changes nothing I do.
- Line 83: "The class loader computes a size without checking its kind, and stops on a negative exponent with a Java exception (row 675)", and "except of 0, 1 or -1". Edge detail; a worker who meets it finds the row.
- Line 85: "`NatParam` is declared `comprises { N[\n\] } where [\nat n\]`, which lists a type at a `where`-clause size." Mechanism; the two rules around it (walk-only; do not pass such a trait's value in compiled code) carry the action.
- Line 89: "The record calls this choice route A. It still calls ... 'the tower'". Useful only for reading the record; one clause would do. "still" is history.
- Line 112: "Its `ZZ32` power gives 0 at a negative exponent for other bases. At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523)." Detail of a library that is to be deleted and that I am told not to fix.
- Line 108: the list of which getters the compiler's prelude has. Same reason; "it has few: see row 349" would serve.
- Line 132: "Walk will run the checker only after the switch-over (P-12)." A plan; the core already says walk switches the checker off.
- Line 68 and 128: "Walk still gives `Bottom`", "still answers `R`". "still" implies an earlier state the reader does not have.
- Line 93: "Walk's message depends on the place: a top-level binding gives 'Type mismatch binding', a parameter 'got arg'." Borderline: it helps only a test that asserts the message.

Not history, and worth keeping: every "do not copy" (lines 28, 128), the variable-operand rule (99), the silent `false` of `=` across types (110), the both-paths advice for reductions (122).
