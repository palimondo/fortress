# Cold read 2 of the orientation (climb batch 35)

I am a new worker. I read `CLAUDE.md`, the skill's core (`.claude/skills/fortress-repo/SKILL.md`) and `orientation.md`, and nothing else. Line numbers below are lines of `orientation.md`. "Core" means `SKILL.md`. Confidence is how likely I think it is that a worker would actually go wrong or stop to ask.

## 1. What I would do differently, by section

### Opening (lines 1-7)

- Read each sentence by its marker before I act on it:
  - bold: the rule of this tree;
  - names a P-N: a curator's decision, which I may cite as one;
  - no marker: something I build on but never cite as a decision;
  - cites a ledger row or an F-N: unsettled behaviour that can change;
  - opens "Until the switch-over": a limit of the compiler's library, which I must not fix in the compiler's prelude.
- When a test of mine meets a cited row:
  - if the rules decide the case, write an `XXX` test that asserts the rules' answer;
  - if they do not, write a plain test that asserts today's behaviour and cites the row.
- Search FACTS and POSITIONS before I call a disagreement between team sources a conflict.
- Prefer the later type papers to the early specification text (P-26). Treat `Specification-1.0-frozen/` (the Working Draft) as superseded. Look in Appendix I for the original text of a rule that changed.
- Stop trusting old notes, team tests and my training on three points: the number types do not nest, fixed-width arithmetic does not wrap, and walk does convert arguments.
- Limit: the section does not say what I should cite when I build on an unmarked sentence (part 2, A).

### Dispatch and overloading (9-24)

- I may overload declarations that differ only in their static parameters' bounds (P-45). The more specific declaration's return type must be a subtype at every instance, not just one.
- For generic overloads, exclusion is read across the whole parameter tuple (P-152). A shared generic position such as `Box[\T\]` ties the parameters together. If exclusion depends on a parameter that nothing ties, both paths refuse the pair.
- I never depend on the order of declarations. Walk chooses by declared parameter types.
- I never take walk's load check as the verdict on validity, whether it accepts or refuses. Before I change code to satisfy it, I look the case up in `interpreter.md`, "What walk checks". Limit: walk checks a generic trait's functional methods at each call, not at load (row 780).
- These are duplicates, whatever position `self` takes:
  - two functional methods with equivalent parameter types;
  - an abstract and a concrete method at the same parameter types in one trait.
- If an object inherits an abstract functional method from one trait and its body from another, the object must declare the method itself (P-149). A Scala-style mixin is refused.
- If a trait of mine declares its own functional `+`, `-`, `MIN` or `MAX`, I give it `excludes { Number }`. If it extends `Number`, I give it `excludes { HasRank }` instead. Or I declare the operator in an object. Otherwise walk refuses the program at load ("fails the Meet Rule"), and the checker misses the clash against the library (row 918).

### Traits and objects (26-64)

- No type of mine extends two instantiations of one generic trait (P-43, P-97). Walk runs such a type but cannot overload on `Tg[\3\]` beside `Tg[\4\]` (row 416). I do not copy the Working Draft examples that the specification marks "Not allowed".
- A `comprises` clause need not list every direct subtype. Several declarations that together cover a meet satisfy the Meet Rule. Limit: walk checks extenders only for the main component's clauses (row 551).
- `override` means widening: I write it only when my parameter types are strictly wider than the inherited ones. To replace an inherited declaration at the same types, I redeclare it without `override`. A Java-style `override` in the library stops every walk program. Limit: there is a checker gap for objects that reach a generic self-typed trait's method along two paths (row 1037).
- An object must cover each inherited abstract method, with one body or with several bodies that together cover it. Where the abstract method or a covering method has static parameters, I use one body, because the checker refuses a multi-body cover there (row 725). Walk does not check generic objects at all (row 665).
- Self-typed trait `T[\X\]`: in `T`'s bodies, `self` is `T[\X\] ∩ X`, so I need no cast.
  - In compiled code, if a `typecase` puts `self` in one arm and another value in another, I first bind `self` at `X`, as `do r: X = self; r end` (row 1070).
  - Before compiled code relies on a body of `T` that calls a method on an `X`, I write a compiled test of it (row 1052).
  - If an object redeclares an abstract dotted method of `T`, I keep `T`'s return type with the object's type substituted for `X`, or I make both methods getters (row 1094).
- Indexing:
  - I index only with `ZZ32`, the only integer type that extends `Index`.
  - `m[i, j]` passes one tuple as the index.
  - I write `I extends Index` in the library and in code that runs under walk or is checked against the interpreter's library. I do not write it in a program compiled against the compiler's prelude today.
  - At an `Index` parameter, the checker refuses a tuple expression; I use a parameter of type `I`, with `I extends Index`, instead (row 805).
- Ordering:
  - I order pairs and triples only when every element type extends `StandardPartialOrder`.
  - Under walk, each position must hold one run-time number type (row 511).
  - I do not order a `List[\RR64\]` in checked code (P-154), although walk orders it (row 774).
- Equality:
  - If a value object has no `=` of its own, `=` falls back to `SEQV`. Equal strings that were computed separately then compare unequal, so I give the value object an `=` or compare its parts.
  - Under walk, tuples longer than three compare by `SEQV` (row 923).
  - For boolean equivalence I write `<->`, never `EQV` or `≡` (row 184).
  - To test run-time concatenation, I use a typed variable, because literals joined with `||` fold.

### Static parameters, `where` clauses and sizes (66-85)

- Under walk, I write static arguments explicitly in these cases:
  - a call used as another call's argument, as `mk[\ZZ64\]()` (row 705);
  - a parameter with two unrelated bounds (row 591);
  - a parameter bounded from above by a bound that names another parameter (row 612);
  - a parameter fixed only by the result of a function expression without a return type (row 587).
- When `OPEN` shows in walk output, I recognise it as a self-bounded parameter that inference did not fix.
- I write only the three `where` forms that are built (P-151). Any other `where` on an `extends` entry is read as unconditional, with no message.
- I never depend on a `where` condition being checked at run time. Walk and the compiled runtime skip it (rows 774, 777), and the code generator emits no code for it.
- I avoid compiled calls to a declaration whose own `where` clause introduces a variable, such as `where [\nat n\]`: they die at run time (row 867).
- Sizes are equal only when they are written alike after numeral arithmetic: `s0 s1` is not `s1 s0`. A `typecase` arm on a numeral size stays reachable. Size powers are allowed up to exponent 4096, and never with a negative exponent.
- `reflect` and `NatParam` work only under walk, also after the switch-over. In compiled code, I never pass a value of a trait whose `comprises` clause lists a type at a `where`-clause size where a listed type is expected (row 307).

### Numbers (87-116)

- I replace the team's types: `Int` becomes `ZZ32`, `Long` becomes `ZZ64`, `Float` becomes `RR64`, `BigNum` becomes `ZZ`, `UnsignedLong` becomes `NN64`. A catch-all `typecase` arm is `x: Any =>`, never `x =>`.
- I never extend a number type.
- My own number type is an object below `Number` (P-160). It takes numerals through a coercion that is generic over the numeral's numbers.
  - Today, under walk, I write `Byte(v.asZZ32)`, not `Byte(v)` (F-341, F-342, F-347).
  - A negative constant reaches the type through the type's prefix `-`.
  - The coercion runs once for each place in the source, so its body must have no effects (P-176).
- A numeral takes the type of its place: a typed binding, an assignment, a field, a parameter or a declared return type. Anywhere else, it takes its default.
- An untyped binding fixes the default for good: after `x = 0.1`, the binding `q: QQ = x` is refused.
- I write a numeral type only as the parameter type of a coercion or an operator.
- An expression of numerals alone folds exactly before the checker, so `2147483647 + 1` does not overflow. To test run-time arithmetic, I use a typed variable operand.
- Coercions do not chain, so `h: Half = 10/20` needs `coerce(q: QQ)`.
- Integer conversions:
  - Checked getters (`asZZ32` and the others) raise `IntegerOverflow` when the value does not fit.
  - Low-bits functions (`narrow`, `widen`, `signed`, `unsigned`, `big`) never raise.
  - For a `ZZ` value, I write `z.asZZ32`, because `ZZ` has only `big`.
  - Compiled code today has fewer getters (row 349).
- For a float:
  - I use `asFloat(x)`, not `x.asRR64` (F-324).
  - No coercion carries a `ZZ64` into `RR64`.
  - `/` on two integers gives a `QQ`: I use `DIV` to truncate, or make one operand a float.
  - Integer `^` raises at a negative exponent, except for the bases 1 and -1, so I write `2.0^(-1)`.
- `=` between number types that no coercion links (`ZZ64` and `RR64`) answers `false` with no error.
- In generic code over `T extends Number`, I call no number method. I declare one function for each number type.
- Walk does not convert:
  - at a declared return type (row 387);
  - a function argument to the parameter's arrow type (row 1083);
  - tuple or varargs elements: walk takes their join (rows 395, 511).
- I know P-46's numeral dispatch: `k(5)` runs `k(x: NN32)`, and `f(1.5)` runs `f(x: RR64)`. I also know its two departures (rows 1016, 1017).

### Reductions and comprehensions (118-130)

- I write the static argument of a reduction, as in `SUM[\RR64\][...]`, wherever its value's type comes from one of these: a method's return type, a field, a top-level variable or an assignment (row 1008).
- I write both arguments of `BIG MIN_MAX` (row 1007).
- As a call's argument, a reduction sums in its body's type on both paths.
- Under walk:
  - an empty `SUM` with no declared type gives the integer 0 (row 716);
  - a nested comprehension is built at run-time types (row 717).
- A reduction of my own without an identity extends `AssociativeReduction[\R\]` and declares `simpleJoin` at `R`. I do not copy the team tests that declare `simpleJoin` at `Any` or untyped.

### Implementation limits (132-136)

- I never use a `Maybe` as an `if` condition.
- I write every parameter type, even where walk runs without one. A return type may come from the api's declaration.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

| # | Lines | Problem | Confidence |
|---|---|---|---|
| A | 5 | "Build on a sentence without one, but do not cite it as a decision." The core requires a source for each claim: a brief, a record entry or a primary source. It forbids loading `sources.md` for a task. So when I build on an unmarked sentence (for example, "only `ZZ32` extends `Index`"), I have nothing I may cite. I can read it two ways: cite the skill itself, or go and find a primary source. | medium (0.6) |
| B | 5 against 17, 122, 134, 85 | "Each bold rule states the rule of this tree", but several bold sentences state behaviour, not a rule. Line 122 is the worst case: "the two paths fix an unwritten static argument from different places" is set in bold, and line 124 then calls that divergence a departure (row 1008). Read by the key, the divergence is the rule. I cannot tell which path's answer an `XXX` test should assert. | medium-high (0.7) for 122; low for the others |
| C | 7 against 48, 64, 89, 110, 114, 116 | The key says "a limit of the compiler's library … do not fix it in the compiler's prelude". The core defines the prelude as three files of that library, and the section switches between "compiler's library" (64, 114) and "compiler's prelude" (48, 89, 110, 116). Two readings: is every limit of the compiler's library off-limits, or only the three prelude files? Also, line 89 ("The compiler's prelude declares no `QQ`") is such a limit but does not open "Until the switch-over", so by the key it reads as permanent. | medium (0.5) |
| D | 57 against 64 | "`SEQV` follows the specification on both paths" is stated without condition. Seven lines later: until the switch-over, the compiler's `===` compares strings and four number types by `=`, not by identity or bits (row 908). A worker who writes a compiled test today from the first sentence would expect a computed string not to be `SEQV` an equal literal, and would be wrong. | medium-high (0.65) |
| E | 99 | "The body computes from them and invokes no method." Is this a rule I must follow or a description? The same paragraph then prescribes `Byte(v.asZZ32)`, which invokes a getter. The paragraph also says walk, the checker and the code generator all read the numbers as `ZZ`, yet gives the workaround only "Under walk". Does a compiled `Byte(v)` work today? | medium-high (0.65) for "invokes no method"; medium (0.5) for "Under walk" |
| F | 99 against core | Core line 135: a `nat`/`int` parameter is "a `ZZ` where it is one of a numeral type's numbers", stated as the rule. The orientation says those numbers convert where they stand and are `ZZ` only where nothing fixes a type. Today's always-`ZZ` reading is a departure (F-341, F-342, F-347). So the core states the departure as the rule. | medium (0.55) |
| G | 99 | "naturals of any size, without the `NN32` bound of a size". The core gives no `NN32` bound on sizes; it says a `nat` used as a value is a `ZZ32`. This term and claim are not given anywhere I read. | medium (0.5) |
| H | 43 | "Walk reads `self` in the same way, except in two cases". The sentence follows the row-1094 departure, so "the same way" can mean that departure rather than P-157's reading. The paragraph also packs four things into one block: a rule, a departure, a workaround and a walk departure. | medium (0.55) |
| I | 91 | "an undefined name is still read as a binder … on both paths", then "Compiled … the checker refuses that arm … unreachable". "On both paths" and "the checker refuses" contradict each other as written. | medium (0.5) |
| J | 122 | "A reduction whose bound does not name its parameter takes its bound, or the expected type where the bound does not fit." I cannot tell what fails to fit what: the bound against the expected type, or the elements against the bound. | medium (0.45) |
| K | 48 | "In the library, and in your own generic over such a type, write `I extends Index`". Three sentences later: "write the bound only in code that runs under walk or is checked against the interpreter's library". For a program meant for both paths today, the first instruction is wrong, and nothing at the first instruction says so. "The count stage" is named in the core but never explained. | low-medium (0.4); 0.3 for the term |
| L | 41 | "For a generic object that lists `T` first … no test covers such a body (row 1052). Before a compiled program relies on one, write a compiled test of it." Does "one" mean any body of `T` that calls a method on an `X`, or only one inside a generic object that lists `T` first? | low-medium (0.4) |
| M | 93 against 97, 112 | "a numeral type has no getters, no `asFloat`, no `asString` and no `=` with a number type." Line 112 says a numeral reaches a number type's `=` by coercion, and line 97 implies a receiver takes the numeral's default. So I cannot tell whether `asFloat(3)` or `3.asString` works. The sentence reads as if they do not. | low-medium (0.4) |
| N | 112, 116 | Conversion to `RR64` is given only as the one library's `asFloat` (F-324). Nothing says how a program compiled against the compiler's library today converts a value to `RR64`. A worker who writes for both paths has no form to use. | low-medium (0.4) |
| O | 101 against 116 | "A quotient that is not whole stays `n / d` in lowest terms". Is that a folded constant or a `/` expression? Line 116 explains the compiled error for `7 / 2` by "`/` only at `RR64`". If `7 / 2` is still an expression, P-46 could coerce both numerals to `RR64` and give 3.5. If it is a folded constant, the error comes from the missing `QQ`. | low-medium (0.35) |
| P | 130 | "`BIG MAX` over a generator still answers `R`". What an empty generator gives is not stated: `Nothing`, an error, or something else? | low-medium (0.35) |
| Q | 89 | "Such a type runs on both paths" is stated without condition, but the same section lists departures that stop it today: `Byte(v)` (F-341, F-342, F-347), and the Meet Rule for a trait with its own `+` (row 918, line 24). | low-medium (0.35) |
| R | 32 against 43 | Redeclaring a self-typed trait's method in an object has two separate checker departures, one at line 32 (row 1037) and one at line 43 (row 1094), each with its own workaround. I cannot tell which one my case hits. Line 32 also uses "self-typed" before line 36 defines it. | low (0.3) |
| S | 95 against 103 | Line 95 lists "a declared return type" among the places where a numeral converts. Line 103 says walk does not convert at a declared return type (row 387). The difference is numeral against non-numeral value, and it is easy to miss. | low (0.3) |
| T | 112 | "In generic code over `T extends Number`, declare your function once for each number type instead." Read broadly, this pushes a worker into duplicating code where the core's algebraic traits (`AdditiveGroup[\T\]`) would serve. In context it is about comparing across types. | low (0.3) |
| U | 11, 15 | "at every instance that the argument types allow" (11) and "Otherwise it compares the instances that the call makes" (15) do not say which instances are meant or how they are compared. | low (0.3) |
| V | 28 | "The specification marks the Working Draft's examples … 'Not allowed'". Which document carries the mark: the revised specification, or the Working Draft? | low (0.3) |
| W | 30, 13, 24 | Terms the core does not give: "extenders" (30), and "meet" (13, 24). The core uses "their meet" but defines only "join". | low (0.25) |

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

I found no repair history: nothing says "formerly", "was changed", "batch" or gives a date. The candidates below are detail that answers neither of Astra's two questions for a worker who has just read the rule next to it.

1. Lines 13, last two sentences. They say where the checker puts the meet of a parameter's bounds, and that inside a static argument the parameter stays. These are checker internals. P-152's two examples already give a program writer the action. This belongs in `compiler.md`. (medium, 0.5)
2. Line 83, last three sentences: the 4096 limit on size powers and the exemption of bases 0, 1 and -1, walk refusing a negative exponent, and the class loader's Java exception (row 675). These are rare, and they change no step a worker takes. (medium, 0.45)
3. Line 91, the tuple-arm corner (row 1064) and the compiled "unreachable" message. The rule just before it already gives the action: write defined type names, and write `x: Any =>` for a catch-all. This corner also produces contradiction I in part 2. (medium, 0.45)
4. Line 68, the `pick((1, 2))` example and "admits only what it admits at `Bottom`". These are walk dispatch internals. The action ("recognise `OPEN`", "write static arguments") does not depend on them. (low-medium, 0.4)
5. Lines 110 (the getter inventory of the compiler's prelude), 114 (that library's powers, including "a Java exception that no `catch` sees", rows 441 and 523) and 64 (row 908's list of the types `===` covers). These are inventories of a library that will be deleted. The action for each could be one sentence: "compiled today, use only …". (low-medium, 0.4)
6. Line 34: "Walk and the checker stop the search for a cover at the same limits, which `interpreter.md` … gives." This is a pointer with no content. It changes nothing at this point in the text. (low, 0.35)
7. Line 41: "no test covers such a body (row 1052)". This is a test-coverage status. Only the instruction after it changes my action. (low, 0.35)
8. Line 89, walk's and the checker's exact messages for `object Mine extends ZZ32`. The rule "do not extend a number type" already prevents the case. The messages only help me recognise it. (low, 0.3)
9. Line 124, third departure: a non-number static argument ends an empty `SUM` in `CastError` (row 436). It is a corner that no worker action meets unless they are already debugging it. (low, 0.3)
