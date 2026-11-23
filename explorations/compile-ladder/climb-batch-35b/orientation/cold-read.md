# Cold read of the orientation

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and
`explorations/compile-ladder/climb-batch-35b/orientation/orientation.md`. Nothing else was opened.
Line numbers below are the orientation's.

## 1. What I would do differently, section by section

### Opening (lines 1-7)

- I would sort each sentence by its marker before I act on it. Bold means the intended rule. A P-N means a curator's decision, which I can cite as one. A sentence with no marker is one I build on but do not cite as a decision. A ledger row or an F-N means the behaviour is not settled: I write an `XXX` test that asserts the rule's answer where the rules decide the case, and otherwise a plain test that asserts today's behaviour and cites the row. "Until the switch-over" means a limit of the compiler's library, which I leave alone in the compiler's prelude.
- Before I call a disagreement a conflict, I search FACTS and POSITIONS.
- I would distrust old notes, team tests and my training on three points: number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.
- Limits: the scheme does not say what I cite when I build on a sentence with no marker. The core accepts only a brief, the record or a primary source. The scheme also does not cover a sentence that carries two markers (2.1).

### Dispatch and overloading (lines 9-24)

- Overloads may differ only in the bounds of their static parameters (P-45). I judge exclusion, specificity and the meet on declared domains. The more specific overload's return type must fit at every instance the argument types allow, not at just one.
- With static parameters, exclusion is read over the whole tuple of parameter types (P-152). Each static parameter that the exclusion needs must be tied by a generic type that both declarations name at the same position. Otherwise both paths refuse the pair.
- I would never rely on the order of declarations. Under walk, a trait's generic method called with an argument outside a bound fails with "Cannot unify".
- I would not take walk's load check as proof in either direction. I would look the case up in `interpreter.md`, "What walk checks", first.
- Functional methods with equivalent parameter types are duplicates wherever `self` stands. One trait must not hold an abstract and a concrete method at the same types. An object that inherits the abstract method from one trait and the body from another must declare the method itself (P-149).
- If a program's trait has its own functional `+`, `-`, `MIN` or `MAX`, I would add `excludes { Number }`, or `excludes { HasRank }` when the trait extends `Number`, or I would declare the operator in an object. The checker will not catch the overlap with the library (row 918). Walk refuses it at load with "fails the Meet Rule".
- Limit: the section does not say whether my own self-typed trait needs this fix (2.5).

### Traits and objects (lines 26-64)

- I would never let a type extend two instantiations of one generic trait: the checker refuses it, even though walk runs it. Under walk I would not overload on two instantiations (row 416), and I would not copy the specification's examples marked "Not allowed".
- A `comprises` clause speaks of values, so several declarations can together cover a meet. Walk checks only the clauses of the main component (row 551).
- `override` only widens. To replace an inherited declaration at the same parameter types, I redeclare it without `override`. I would never write a Java-style `override`: in the library, it stops every program under walk.
- An object without static parameters must cover each inherited abstract method. Walk does not catch the gap in a generic object (row 665). I would avoid a cover by several bodies when static parameters take part (row 725).
- Self-typed traits:
  - Only an `A` may extend `T[\A\]`.
  - In a `typecase` arm that returns `self`, I bind `self` first: `do r: X = self; r end` (row 1070).
  - Before a generic object relies on a body of `T` that calls a method on an `X`, I write a compiled test of it (row 1052).
  - When an object redeclares an abstract dotted method of `T`, I keep `T`'s return type with the object's type for `X`, or I use getters (row 1094).
- `Index`: I bound index parameters with `I extends Index` in the library and in code that runs under walk, but not in code compiled against today's prelude. I index only with `ZZ32` and convert other types first. `m[i, j]` passes a single tuple index.
- Ordering: a tuple compares only where each element type is a `StandardPartialOrder`. Under walk I would not compare positions that hold numbers of two types (row 511). In the checker, a list of `RR64` has no order (P-154).
- Equality: a value object without its own `=` compares the strings inside it by identity. I would give an `=` to every value object that is compared by content. Tuples longer than three fall back to `SEQV` (row 923). `EQV` is boolean logic, not identity.
- Limit: until the switch-over, the compiler's `===` compares by `=` (row 908), so a compiled test of `SEQV` today checks something else.

### Static parameters, `where` clauses and sizes (lines 66-85)

- A type parameter that the call does not fix takes its bound in the checker. Under walk, it stays `OPEN`, or becomes `Bottom` in the three listed cases. Under walk I would write the static arguments of a generic call that is itself an argument, as `mk[\ZZ64\]()` (row 705).
- I would use only the three built `where` forms. Any other `where` on an `extends` entry silently becomes unconditional. I would never rely on a `where` clause being checked at run time: compiled code checks none, and walk does not check a dotted call's condition (row 777). In compiled code I would avoid a `where [\nat n\]` variable (row 867).
- I would write each size in one form, since `s0 s1` is not equal to `s1 s0`. A `typecase` arm on a size stays reachable. A size exponent must be between 0 and 4096.
- `reflect` and `NatParam` work only under walk, also after the switch-over. The same holds for my own trait whose `comprises` clause lists a type at a `where`-clause size (row 307).

### Numbers (lines 87-116)

- I would never extend a number type. A program's own number type is a value object below `Number`. It declares a numeral coercion that is generic over the numeral's numbers, with a `where` clause that bounds them. Today its body must be `Byte(v.asZZ32)` (F-341, F-342, F-347). It needs a prefix `-` to take negative constants. The coercion must have no side effects, because it runs once per place: under walk at the place's first run, on the compiled path when the class loads.
- I would write `ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64` for the team's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong`, and `x: Any =>` for a catch-all `typecase` arm.
- A numeral converts only at a place that fixes a type. An untyped binding fixes the default: after `x = 0.1`, `x` is an `RR64` and `q: QQ = x` is refused.
- I would use a numeral type only as the parameter type of a coercion or an operator.
- An expression of numerals alone folds exactly: `lr = 1/1000` is a `QQ`, and `2147483647 + 1` does not overflow. To test run-time arithmetic, I use an operand that is a typed variable.
- Walk converts arguments at calls, typed bindings and assignments, but not at a declared return type (row 387), and it does not convert a function argument to the parameter's arrow type (row 1083). I would declare a function argument at the parameter's arrow type.
- Conversions:
  - `.asZZ32` and the other getters are checked and raise `IntegerOverflow`;
  - `narrow`, `widen`, `signed`, `unsigned` and `big` keep the low bits;
  - on a `ZZ` there is only `big`.
- Generic code over `T extends Number` can call nothing on a `T`, so I would write one function per number type. To convert into `RR64`, I would write `asFloat(x)` under the one library. `=` between a `ZZ64` and an `RR64` silently answers `false`.
- An integer base at a negative exponent raises. I would write `2.0^(-1)` or a `QQ` base instead.
- `/` on two integers answers a `QQ`, and `DIV` truncates. For float division I would write `(1.0 s) / n`, or use `asFloat`.
- Limit: the section gives no way to convert into `RR64` on today's compiled path (2.6).

### Reductions and comprehensions (lines 118-130)

- I would write the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` wherever the value lands in a method's return, a field, a top-level variable or an assignment (row 1008). I would write both arguments of `BIG MIN_MAX` everywhere (row 1007).
- Under walk, I would declare a type for an empty `SUM` (row 716). I would write the argument of an empty `SUM` only as a number type (row 436).
- A reduction of my own that has no identity extends `AssociativeReduction[\R\]`, with `simpleJoin` declared at `R`, never at `Any` or untyped. I would not copy the team's tests.
- Limit: the section does not say what an empty `BIG MAX` gives.

### Implementation limits (lines 132-136)

- I would never use a `Maybe` as an `if` condition.
- I would write every parameter type, even where walk runs the code without it.
- I would not expect walk to report a type error before the program runs.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

2.1 **One statement can carry two markers, and the opening's scheme sorts it two ways** (lines 7, 64, 89, 93, 110, 114).
- Line 110 opens "Until the switch-over" and also cites row 349. Under the scheme, the first marker means a limit to leave alone and the second means a departure to test.
- Some statements describe the compiler's library without opening "Until the switch-over":
  - line 114: "Its `ZZ32` power gives 0 ...", "At a base of 0 it throws ..." (rows 441, 523);
  - line 64: "Its own `≣` ... (row 908)";
  - line 89: "The compiler's prelude declares no `QQ`.";
  - line 93: "follows the same design (P-37)".
- So a worker cannot tell whether to write an `XXX` test against the compiled path, fix the prelude, or leave it.

Confidence: high.

2.2 **"Each bold rule states the rule of this tree" (line 5) reads two ways: what the tree does, or what it should do.**
- Several bold rules are followed by "The tree departs" (line 99) or "The one library departs" (line 112). A worker who reads them as what the tree does writes `x.asRR64` or `Byte(v)`, and the program fails.
- Some bold sentences are not rules:
  - "Walk's load check is not the verdict ..." (line 17);
  - "Walk has no static types." (line 134);
  - line 122 states a divergence, "the two paths fix an unwritten static argument from different places". Line 124 then cites the same divergence as unsettled (row 1008), so a worker cannot tell which path an `XXX` test should assert.

Confidence: medium-high.

2.3 **Departures stated with no row and no F-N.**
- Examples:
  - line 48: "Walk runs the code without the bound";
  - line 81: "The code generator accepts a declaration's own `where` clause but emits no code for it, so the compiled runtime does not check it";
  - line 83: "Walk refuses a negative exponent";
  - line 103: walk "chooses the coercion by the run-time value; the checker chooses it statically (P-59)". Does P-59 sanction both?
- By line 5, an unmarked sentence is to be built on. So a worker would treat "the compiled runtime does not check `where` clauses" as settled.
- The worker also cannot tell whether the ledger holds these departures. The core asks for a ledger search before investigating a defect.
- Line 5 gives nothing to cite for such a sentence: the core accepts only a brief, the record or a primary source.

Confidence: medium.

2.4 **`Byte(v)` (line 99).** The line reads: "walk, the checker and the code generator read each as a `ZZ`, so walk refuses `Byte(v)` ... Under walk, write `Byte(v.asZZ32)`".
- If the checker also reads `v` as a `ZZ`, the compiled path refuses `Byte(v)` as well.
- "Under walk" suggests that a compiled program may keep `Byte(v)`.

Confidence: medium.

2.5 **"such a pair" (line 43) against the fix of line 24.**
- Line 24 tells a program's trait with its own functional `+` to declare `excludes { Number }` or `excludes { HasRank }`.
- Line 43 says the library's array-number `+` is valid beside `AdditiveGroup`'s own. It then says "Walk reads `self` in the same way, so it loads such a pair in the library and in a program's own component."
- "Such a pair" reads two ways:
  - the library's pair, seen from a program; or
  - any pair in my own component in which one overload is a self-typed trait's method.
- On the second reading, my own self-typed trait needs no `excludes`, and adding `excludes { Number }` could wrongly exclude a number type that extends it.

Confidence: medium-low.

2.6 **No stated way into `RR64` on today's compiled path** (lines 112, 116).
- The rule's `x.asRR64` is not said to exist in either library, and "Until the switch-over, the compiler's prelude has no `asFloat`".
- So "write `asFloat(x) = y`" and "convert each `ZZ64` operand with the one library's `asFloat`" leave a program compiled against the compiler's library with no conversion. A worker who follows the line fails there.

Confidence: medium.

2.7 **The tuple `typecase` arm (line 91).**
- An undefined name in a tuple arm is "read as a binder that takes any element, on both paths".
- Yet compiled, with an `Any` selector, the checker calls the arm unreachable. A binder that takes any element would make the arm reachable.
- A worker cannot tell whether the compiled path reads the name as a binder, or whether "unreachable" is a second defect.

Confidence: medium-low.

2.8 **Row 923 (line 64).**
- `(s, 1, 2, 3) = (t, 1, 2, 3)` is `false`. If `=` falls back to `SEQV`, the bullets just above give `false` too: tuples compare element by element, and strings by identity.
- The passage does not say what the rule's answer is, so a worker cannot write the `XXX` test that line 7 asks for.

Confidence: medium-low.

2.9 **The compiled `Index` bound (line 48).**
- "In the library, and in your own generic over such a type, write `I extends Index`" sends a worker on the compiled path wrong until the next sentence withdraws it.
- "checked against the interpreter's library" does not name `FORTRESS_LIBRARY=one`, the core's name for that mode.

Confidence: low-medium.

2.10 **Row 962 (line 97).** A `nat` parameter of 2^31 or more is a `ZZ64` under walk and an error when compiled. The rule makes such a parameter a `ZZ32`, which cannot hold the value, so the rule's answer, and with it the `XXX` assertion, is not given.

Confidence: low.

2.11 **"compiler's library" against "compiler's prelude" (line 7).** The line reads "a limit of the compiler's library ... do not fix it in the compiler's prelude". The core makes the prelude three files of that library, and only those are deleted at the switch-over. It is unclear whether the ban covers the library's other files.

Confidence: low.

2.12 **Terms the core does not give.**
- "Meet Rule" (line 24): the core says "a third covers their meet" but gives the rule no name. "Meet" itself is never defined in the core, which defines only "join". Confidence: low.
- "self-typed" (line 32): used before its definition at line 36. Confidence: low.
- A `comprises` clause "that lists only `...`" (line 38): the core does not give the `...` form, so a worker cannot tell what it means. Confidence: medium-low.
- "extenders" and "main component" (line 30). Confidence: low.
- "dotted" method (lines 15, 43): the core only implies it by contrast with `f(x)`. Confidence: low.
- "getter" as a form of declaration (line 43, "declare both methods as getters"). The core mentions getters only as being desugared, and the passage does not give the syntax. Confidence: low.
- "count stage" (line 48): the core names it once without defining it. Confidence: low.
- `0#n` (line 120) and `run()` (line 99): the core gives neither. Confidence: low.

2.13 **"lists `T` first in its `extends` clause" (line 41).** The passage does not say why the position matters, so a worker cannot tell whether listing `T` second is safe or worse.

Confidence: low.

2.14 **"A generic one stops at its first join" (line 130).** "Stops" could mean that it fails with an error, or that it ends the reduction early.

Confidence: low.

2.15 **"The specification marks the Working Draft's examples ... 'Not allowed'" (line 28).** It is unclear which copy holds the marks. If only `Specification/` does, then `Specification-1.0-frozen/` holds the same examples unmarked, and a worker reading there is not warned.

Confidence: low.

2.16 **"under walk `lr = 1/1000` is a `QQ`" (line 101).** The line does not say what happens when compiled. By lines 89 and 116, it is a static error there: the prelude has no `QQ`. That matters for a learning rate in the model program.

Confidence: low.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

- **Line 41**, "A compiled body of `T` that returns `self` at `X` runs, also from an arm of a conditional or a `case` expression, a function expression or a local function." This reads as a list of shapes that were fixed. A worker would write those shapes anyway. Only the failing shape (row 1070) changes an action. Confidence: medium.
- **Line 43**, "With the reading of the exclusion test and the bounds that the test reads ..., the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own." This justifies why the library is valid and changes nothing a worker does. The next sentence also creates the ambiguity in 2.5. Confidence: medium.
- **Line 13**, the last two sentences (P-157), on which places the checker fills with the meet of a parameter's bounds. These are internals of the checker's exclusion test. They matter to a worker who edits that test, not to one who writes overloads. Confidence: low-medium.
- **Line 15**, "It infers a dotted generic method's static arguments from the arguments' run-time types, as for a generic function." This looks like a repaired case, stated as working. It changes no action. Confidence: low.
- **Line 64**, the two `SEQV` chains: `("a" || "b") SEQV "ab"`, and `y: RR64 = 0.5` being `SEQV` a computed 0.5. These are edge cases with no action outside a test of `SEQV` itself. Confidence: low.
- **Line 83**, "The class loader computes a size without checking its kind, and stops on a negative exponent with a Java exception (row 675)." The action, to write no negative size exponent, is already given by walk's refusal. Confidence: low.
- **Line 91**, the compiled symptom of row 1064 ("... is unreachable"). It adds a message and no action, and it creates the confusion in 2.7. Confidence: low.
- **Line 93**, "The compiler's prelude follows the same design (P-37)." It changes no action. Confidence: low.
- **Line 114**, "At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523)." This is a prelude limit that ends at the switch-over, and the worker is told not to fix it. Confidence: low.
