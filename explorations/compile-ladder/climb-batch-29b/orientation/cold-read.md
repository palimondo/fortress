# Cold read: climb-batch-29b orientation

Read only `CLAUDE.md`, the core (`.claude/skills/fortress-repo/SKILL.md`) and `orientation.md` in this folder. I opened no other file. "Line N" means a line of `orientation.md`.

## 1. What I would do differently, section by section

### Preamble (lines 1-7)

- I would sort each sentence before I act on it. A bold sentence is a rule of this tree. A sentence that cites P-N is a curator decision, and I may cite it as one. A sentence that cites a ledger row is a departure of one path: a fix can change it, so a test asserts the bold rule and never the departure. A sentence that opens "Until the switch-over" is a limit of the compiler's library: I work around it in compiled code and do not patch the compiler's prelude.
- I would search FACTS and POSITIONS before I call any disagreement a conflict.
- I would distrust old notes, team tests and my own training on three points: the number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.
- For the specification: `Specification/` (revised) wins over `Specification-1.0-frozen/` (the Working Draft), and the papers win over the specification's early text (P-26). Appendix I keeps the text that was replaced.
- Limit: I question a rule only on new evidence. I build on a bold rule that cites no P-N, but I do not cite it as a decision.

### Dispatch and overloading (lines 9-24)

- I would accept overloads that differ only in their static parameters or bounds (P-45). I would judge each pair on its declared domains. The more specific declaration's return type must be a subtype of the other's at every instance.
- For generic overloads, I would test exclusion over the whole tuple of parameter types. A generic type shared at one position forces equal static arguments. The pair is valid if some position excludes at the forced instance. Both paths refuse the pair if a static parameter is left free (P-152).
- I would never rely on the order of declarations. Walk chooses by declared parameter types.
- Walk's load check is not the verdict. Before I change code to pass it, or take its acceptance as proof, I would look the case up in `interpreter.md`, "What walk checks" (row 780 is one such case).
- Two functional methods with the same parameter types are duplicates, wherever `self` stands. Both paths refuse an abstract and a concrete method of the same types in one trait. An object that inherits the abstract method from one trait and the body from another must declare the method itself (P-149).
- A program's trait that declares its own functional `+`, `-`, `MIN` or `MAX` needs `excludes { Number }` or `excludes { HasRank }`, or the operator must go in an object. Otherwise walk refuses the program at load with "fails the Meet Rule". Limit: the checker accepts such a pair against the library's `+` (row 918), so a clean compile proves nothing here.

### Traits and objects (lines 26-62)

- I would never extend two instantiations of one generic trait, and never copy a Working Draft example marked "Not allowed" (P-43, P-97). Under walk, I would avoid overloads on two instantiations such as `Tg[\3\]` and `Tg[\4\]`: walk refuses them (row 416).
- A `comprises` clause covers values (P-60). A generic trait that lies below a listed type need not be listed. Limit: walk checks extenders only against the main component's clauses (row 551).
- I would write `override` only to widen, where the inherited parameter types are strictly narrower than mine. To replace a declaration at the same parameter types, I would declare it again without `override`. I would never add a Java-style `override` to the library, because walk then refuses every program. Limits: the checker accepts the bad `override` (row 653). The code generator refuses every `override` (row 650), so compiled code cannot use `override` at all.
- An object must cover each inherited abstract method, with one body or several narrower bodies, reading `comprises` clauses (P-147). Limits: walk skips this check for generic objects (row 665). The checker refuses a cover by several bodies when static parameters are involved (row 725).
- In a self-typed trait, `self` is `T[\X\]` met with `X`, so `= self` needs no cast. The checker refuses a type that extends `T[\A\]` and is not an `A`. Limit: a compiled body that returns `self` fails JVM verification (row 695). Walk's load check still refuses two kinds of pair: a trait that is self-typed only through another trait, and a method with static parameters of its own.
- Index (P-156): in code that runs only under walk or is checked against the interpreter's library, I would bound a generic's index parameter `I extends Index`. Only `ZZ32` is an `Index`. A tuple of `Index` values is an `Index`, so `m[i, j]` passes one index, but `()` is not one. `f(x: Index)` and `f` over a tuple of `Index` types overlap. Limit: compiled code must not name `Index` until the switch-over. Rows 805 and 806 are departures.
- Ordering: only pairs and triples are ordered, and only where every element type extends `StandardPartialOrder`. Under walk, numbers of two run-time types at one position are refused (row 511). The checker orders a list only where its element type extends `StandardTotalOrder` (P-154), so a list of `RR64` has no order. Walk orders every list (row 774).
- Equality: where a type declares no `=`, `=` is `SEQV` (P-168). A value object holding computed strings is therefore `=` only to itself, so I would give it its own `=`. For a 4-tuple or longer, `=` is `SEQV`. I would never write `≡`/`EQV` for equivalence of booleans: I would write `<->`, because walk stops on `≡` (row 184). Equal string literals are one object (P-171). Limit: until the switch-over, the compiler has no `=` over `Any` and none on tuples, and its `===` compares by `=` (row 908).

### Static parameters, `where` clauses and sizes (lines 64-83)

- A type parameter that a call does not fix takes its bound, not Scala's `Nothing` (P-48). Under walk, a parameter whose bound names itself becomes `OPEN`. Where walk compares overloads, a type that holds `OPEN` admits only what it would admit at `Bottom`. In the three cases where walk gives `Bottom` (rows 591, 612, 587), I would write the static arguments myself.
- Only the checker types an argument call against the enclosing call's context (P-51). Under walk, I would write `mk[\ZZ64\]()` (row 705).
- I would write only the three built `where` forms (P-151). The checker reads any other `extends ... where` as unconditional, without a warning. I would not rely on any check of a `where` condition at run time:
  - walk and the compiled runtime apply a conditional extension at every instance (row 774);
  - walk runs a dotted call that breaks a condition (row 777);
  - the code generator emits no code for `where`;
  - a compiled call whose clause introduces a variable, such as `where [\nat n\]`, dies (row 867).
- Sizes are equal only when they are written alike after numeral arithmetic (P-55). A static parameter is never known to differ from a numeral. The checker refuses a size exponent above 4096 (except on a base of 0, 1 or -1), walk refuses a negative exponent, and the class loader throws a Java exception on one (row 675).
- I would take a size known only at run time from `reflect` in `NatReflect.fsi`, under walk only. On the compiled path, passing a value of a trait whose `comprises` lists a type at a `where`-clause size, where the listed type is expected, fails verification (row 307). This holds for my own traits too.

### Numbers (lines 85-103)

- The number types are flat (P-43). "Route A" and "the tower" are words of the record; neither means that the types nest.
- A numeral converts at a typed binding, an assignment, a field, a parameter or a declared return type whose type has a coercion from it (P-173). Anywhere else it takes its default: `ZZ32`, or `ZZ64` or `ZZ` when it does not fit, and `RR64` with a radix point. The default then stays: after `x = 0.1`, `q: QQ = x` is refused.
  - An out-of-range numeral is refused, statically by the checker and at the binding by walk ("Type mismatch binding"). A numeral that rounds to an infinity is refused by the checker, but walk gives `Infinity` (row 967).
  - On the compiled path, I would write `3.0` for an `RR64` or `RR32` (row 442).
  - A size parameter used as a value is a `ZZ32`, so `u: NN32 = n` is refused.
- I would write a numeral type only as the parameter type of a coercion or an operator (P-174). For my own number type, I would write a coercion generic over the numeral's numbers. A negative literal needs the type's prefix `-`. The coercion's value is computed once for each written place and reused on every run of it (P-176), which matters if it is a reference object. `array1` and `array2` give a `Vector` or `Matrix` only at the eight library number types.
- An expression of numerals alone folds exactly before the checker. So to test run-time overflow or concatenation, I would use a typed variable operand. My own type takes a folded constant only through a coercion from the constant's default type, such as `coerce(q: QQ)`.
- Walk converts arguments by their run-time values at calls, bindings and assignments, but not at returns (row 387). A generic call promotes its arguments to the narrowest common target (P-74). Walk does not promote tuple or varargs elements (rows 395, 511). "Ambiguous coercion" means that a tie remained.
- To convert an integer, I would use the checked getters `asZZ32` and the rest, or the low-bits functions `narrow`, `widen`, `signed`, `unsigned` and `big`, which wrap. A `ZZ` value has only `big`, so `narrow(z)` does not resolve. Limit: the compiler's prelude has only a subset (row 349).
- `Number` declares nothing (P-165). So I would not call `asFloat` on a `T extends Number`; I would overload once for each number type instead. `=` across two types works only where a coercion joins them. Otherwise it is a silent `false`, as for a `ZZ64` against an `RR64`. For `NN32` and `NN64`, I would bind the literal first (`z: NN32 = 0`, then `u = z`) (row 973).
- `^` answers its base's type. A negative exponent raises unless the base is 1 or -1, so I would write `2.0^(-1)` or `(2/3)^(-1)`, never `10^(-k)`. The compiler's library differs (rows 441, 523).
- `/` on two integers gives a `QQ`. `DIV` truncates toward zero. For a float result, one operand must be a float, and a `ZZ64` operand needs `asFloat`. On the compiled path, `/` exists only at `RR64`, so `7 / 2` is a static error there.

### Reductions and comprehensions (lines 105-115)

- I would write the static argument in every clause form of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` (row 731).
- Under walk, a reduction's instance comes from a local variable's declared type or a function's return type. A method's return type, a field, a top-level variable, a parameter and an assignment do not count. Otherwise walk takes the join. The error `__bigOperator`, "body param 1", means that an element failed to convert to the instance. Rows 716, 717 and 436 are departures.
- In a reduction without an identity, I would declare `simpleJoin` at `R`, never at `Any` and never untyped, and I would not copy the team's tests.

### Implementation limits (lines 117-121)

- I would never take a run under walk as proof that a program is well typed. I would never write a `Maybe` as an `if` condition.
- I would write every parameter type: the compiled path refuses a missing one. Walk accepts a missing type, except in a method that implements an abstract one (row 405). A component's function without a return type takes the api's declaration.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

Ordered by how much harm they can do.

1. **The preamble's two labels collide** (line 7 against lines 62, 89, 97 and 101). High confidence.
   - Line 7 makes a ledger-row sentence a departure that "a fix can change", and an "Until the switch-over" sentence a limit not to fix in the compiler's prelude.
   - Four sentences are both. Each opens "Until the switch-over" and also cites a row:
     - row 442 (`3.0` for `RR64`);
     - row 908 (`===` compares by `=`);
     - row 349 (the prelude's getters);
     - rows 441 and 523 (`ZZ32` `^` at a negative exponent; a Java exception at base 0).
   - The follow-on sentences "Its own ≣ ..." and "Its ZZ32 power ..." do not open with the marker. Read literally, they are fixable departures of the prelude.
   - A worker cannot tell whether to fix the prelude or route around it.
   - The section should say which label wins, or drop the row from limit sentences.
2. **"`SEQV` follows the specification on both paths"** (line 55) is contradicted by line 62. There, the compiler's `===` compares strings and numbers "by `=`, not by bits or identity" (row 908). High to medium confidence.
   - A worker who trusts line 55 writes a compiled test that expects two computed equal strings not to be `SEQV`, and the test fails.
   - Line 55 should carry the "until the switch-over" exception.
3. **`u = 0` for a zero `u: NN32`** (line 99, row 973) does not say which path departs. Medium confidence that it reads two ways, and the stakes are high.
   - One reading gives `true`. Line 89 counts "a parameter" whose type has a coercion from the numeral as a place where the numeral converts, and `NN32` has one.
   - The other reading gives `false`. "No `=` ties a numeral type to a number type", together with the core's "A conversion never changes which declaration runs when one already fits" (`=` over `Any` fits), gives `false`.
   - The failure is a silent wrong answer under walk for every comparison of an `NN32` or `NN64` value with a literal, a likely pattern in model-program code.
   - The section should name the rule's answer, and state "bind the numeral at the type first" as a rule, not as a remedy at the end.
4. **A size parameter as a value: `ZZ32` or `ZZ`?** Medium confidence.
   - Line 89 and the core say that a `nat` or `int` size parameter used as a value is a `ZZ32`.
   - Line 91 says that a numeral coercion's body "reads the numbers as `ZZ` values of any size", and its example `Byte(v.asZZ32)` needs `v` to be a `ZZ`.
   - Both cite P-173 and P-40.
   - The section should say that a numeral coercion's parameters are the exception, and why.
5. **A program's trait with its own `+`** (line 24 against line 43). Medium to low confidence.
   - Line 24 says that such a trait overlaps the library's `+` between an array and a number, and needs `excludes`.
   - Line 43 says that a self-typed trait's `+` is valid beside that same library `+`, and that walk loads such a pair "in a program's own component".
   - A worker who writes a self-typed trait of their own cannot tell whether line 24's fix is needed.
6. **The `OPEN` example omits `T`'s bound** (line 66). Medium confidence.
   - `pick(x: (T,T))` "takes no `(1, 2)`" holds only if `T`'s bound names itself.
   - As printed, it reads as true of any `T`. That contradicts the same line's rule, under which a parameter takes its bound (`Any` for an unbounded one, which `(1, 2)` passes).
7. **"Build on a sentence without one, but do not cite it as a decision"** (line 5). Medium confidence.
   - The core lets a worker cite only a brief, a record entry or a primary source, and forbids loading `sources.md` for a task.
   - So a worker who builds on an unattributed bold rule has nothing to cite. It is unclear whether "this skill's orientation" counts as a source.
8. **"Only the checker gives a call ... the enclosing call's context (P-51)"** (line 72). Low to medium confidence.
   - The bold sentence states a difference between the paths as the rule, while row 705 marks walk's behaviour as a departure.
   - Read one way, walk is correct and must not be changed. Read the other way, walk is fixable.
9. **A size parameter of 2^31 or more** (line 89, row 962). Low to medium confidence. It "is a `ZZ64` under walk, and raises an error on the compiled path". The rule ("is a `ZZ32`") fits neither outcome, so the reader cannot tell which path departs.
10. **"Row 923 holds the question of longer tuples"** (line 62). Low to medium confidence.
    - Line 7 defines a row as a departure; this row is an open question instead.
    - So `(s,1,2,3) = (t,1,2,3)` being `false` reads either as a rule to assert in a test or as a departure to mark.
11. **"Write it in every clause form"** (line 109). Low to medium confidence on scope.
    - It is unclear whether this covers the four named reductions only, or all reductions.
    - It is unclear what applies to a form without a clause, such as `SUM v` over an array.
    - It is unclear whether the instruction holds on walk too, given that row 731 makes the checker's failure a departure.
12. **"Checked at a call"** (line 76). Low to medium confidence.
    - It does not say whether the check is static or happens at run time.
    - Line 79 then treats walk's missing run-time check as a departure (row 777), but the code generator's missing run-time check as plain fact, with no row.
13. **Departures with no row** (lines 45-46 and 79). Low confidence.
    - Walk's load check still refuses two kinds of pair (lines 45-46).
    - The checker reads any other `extends ... where` as unconditional, without a warning (line 79).
    - The code generator emits no code for a `where` clause (line 79).
    - By line 7's labels, these sentences are neither rules nor departures.
14. **"`Index`: write `I extends Index`"** (line 48). Low to medium confidence.
    - The line first gives "in your own generic over such a type, write `I extends Index`" with no condition.
    - Several sentences later, it limits the bound to code for walk or for the interpreter's library.
    - For a test that runs on both paths the instruction is reversed, and that limit is easy to miss.
15. **"The library" and "the checker" without a library named.** Low to medium confidence.
    - Lines 24, 55, 91, 99 and 101 say "the library" unqualified, though the preamble names two libraries. The core's word for the interpreter's library is "one library".
    - Lines 24 and 53 say what "the checker" accepts without saying which library it checks against. On a compiled run, that is the compiler's library until the switch-over.
16. **"An abstract functional method also counts for it"** (line 24). Low confidence. It does not say whether the method counts as an overload whose meet needs a cover, or as a declaration that can provide the cover. The example shows only the first.
17. **"The Scala language accepts it"** (line 22). Low confidence. The checker is written in Scala, so this can be misread as "the checker accepts it", the opposite of what the line means. Writing "Scala, the language, accepts it" or "a Scala program may do this" would remove the doubt.
18. **"At every instance, not at one only"** (line 11). Low confidence. It does not say which instances: those of the more specific declaration, or the pairs of instances that the two declarations share.
19. **"Both paths read the numeral as its default"** (line 95). Low confidence. It does not say what happens next: whether dispatch then runs as usual, or can still end in "Ambiguous coercion".
20. **"Write a numeral type only as the parameter type of ... an operator"** (line 91). Low confidence. No numeral value exists at run time, so a worker cannot see what an operator over a numeral type could do.
21. **"Fixed-width arithmetic does not wrap"** (line 7). Low confidence. It reads as "nothing wraps", yet line 93 names wrapping operators and line 97 says that `narrow` wraps silently. "The ordinary arithmetic operators do not wrap" would be exact.
22. **Terms that the core does not give.**
    - *meet* (lines 13, 24, 30, 43): medium. The core uses the word but defines only *join*.
    - *Meet Rule* (line 24): low. Line 24 names it and attributes the rule to `SKILL.md`, but the core states the rule without the name.
    - *nest*, of two overloads (line 24): low. It presumably means that one domain lies inside the other.
    - `comprises { ... }` (line 38): medium. Nothing says what `...` in a clause means.
    - *main component* and *extenders* (line 30): low.
    - *count stage*, and how to check code "against the interpreter's library" (line 48): medium. The core names the count stage, but neither file gives the command.
    - `AssociativeReduction` and `simpleJoin` (line 115): medium. No action can be taken on them without `library.md`.
    - `HasRank` (line 24): low. It is introduced as the trait to exclude for arrays.
    - *deciding elements* (line 53) and *bounds only from above* (line 69): low.
23. **The reductions without an identity** (line 115). Low to medium confidence.
    - The bold rule states a mechanism, and the action ("declare `simpleJoin` at `R`") is left to inference from "declares `simpleJoin` so: do not copy them".
    - What an empty `BIG MAX` answers is not stated.
24. **What the file calls itself.** Low confidence. It calls itself "this part", read after `SKILL.md`, and the core reaches it as `references/revival-changes.md`. If it becomes "the orientation", the core's three mentions of `revival-changes.md` and this file's opening must match.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

1. **Route A and route C** (line 87). Medium confidence. Route A and "the tower" are words a worker needs to read the record, so they prevent a misunderstanding. "Route C is the way not chosen: a checker rule under which the number types could nest again" changes no action and is history of a choice. I would cut it, or move the record's vocabulary to `records.md`.
2. **"Lifts its elements to `Maybe[\R\]` inside the reduction"** (line 115). Medium confidence. This is the library's mechanism and changes no action. The bold rule should be the action: declare `simpleJoin` at `R`, never at `Any` and never untyped; `BIG MAX` still answers an `R`.
3. **The narration of why `reflect` fails when compiled** (line 83). Low to medium confidence.
   - The line explains the one failure three times: "does not run compiled yet"; "until the switch-over ... do not link `NatReflect`"; "after the switch-over ... for a second reason".
   - Only one action follows: do not use `reflect` on the compiled path.
   - The row-307 rule for a program's own trait does change action. I would keep it and drop the narration.
4. **The derivation in the P-152 paragraph** (line 13), "By the exclusion rule, a value of both domains has one instance ...". Low confidence.
   - The two `o` examples carry the action, and the derivation only explains them.
   - The P-157 sentence on putting the meet of bounds in a parameter's place is checker internals. It matters only to someone who writes generic overloads in the library. Most workers can take no action on it.
5. **"Walk will run the checker only after the switch-over (P-12)"** (line 119). Low confidence. It is a plan, not a rule of today, and changes no action now. If its purpose is to tell workers to keep walk-only code checker-clean, it should say so.

I checked these against both questions and kept them, because each prevents a misunderstanding:

- "The Working Draft forbids such pairs" (line 11) and the Working Draft's tuple rule (line 48);
- "A Java `permits` list names each direct subtype" (line 30);
- "the tower" (line 87);
- walk's `Infinity` (line 89);
- the `bitsAs…` equivalence (line 97).
