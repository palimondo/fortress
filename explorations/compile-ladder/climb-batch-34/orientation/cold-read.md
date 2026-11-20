# Cold read of the orientation (climb-batch-34)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and `orientation.md`. No other file was opened. Line numbers are those of `orientation.md`. I read Astra's two questions as: does the passage change an action, and does it prevent a misunderstanding?

## 1. What I would do differently, section by section

### Preamble (lines 1-7)

- I would sort each sentence before I lean on it. A bold sentence is a rule of this tree. A sentence with P-N is a curator decision, and I may cite it as one. A plain sentence is something to build on, but I would not cite it as a decision. A sentence with a ledger row is unsettled. If the rules decide its case, I would assert the rules' answer in an `XXX` test. If they do not, I would assert today's behaviour in a plain test that cites the row. A sentence that opens "Until the switch-over" is a limit of the compiler's library, and I would not fix it in the prelude.
- I would distrust old notes, team tests and my training on three points: the number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.
- Before calling a disagreement a conflict, I would search FACTS and POSITIONS. I would question a rule only on new evidence.
- The spec's original text is in Appendix I. The unrevised spec (the "Working Draft") is `Specification-1.0-frozen/`, not `Specification/`.
- Limit: the orientation lists the departures. A change missing from it does not prove that nothing changed.

### Dispatch and overloading (lines 9-24)

- Overloads may differ only in their static parameters (P-45). The checker judges a pair by its declared domains, the argument types accepted at some instance within the bounds. The more specific declaration's return type must fit at every instance the arguments allow, not just one.
- Exclusion is read over the whole tuple of parameter types (P-152). A shared generic type at one position ties the two static arguments, which can make another position exclude. If the exclusion needs a parameter that nothing ties, both paths refuse the pair. In the exclusion test the checker replaces a bare parameter (a whole parameter type, a tuple element, or a member of an intersection or union) with the meet of its bounds. It does not do this inside a static argument (P-157).
- Walk dispatches by declared types, never by declaration order. It infers a dotted generic method's static arguments from run-time types. An argument outside a bound fails with "Cannot unify".
- Walk's load check is not the verdict. Before I change code to satisfy it, or take a load as proof, I would look the case up in `interpreter.md`, "What walk checks".
- Two functional methods are duplicates wherever `self` sits, and abstract declarations count. One trait must not hold an abstract and a concrete method with the same parameter types. An object must not take an abstract functional method from one trait and its body from another unless it redeclares the method (P-149).
- If a program's trait declares its own functional `+`, `-`, `MIN` or `MAX`, I would add `excludes { Number }` (or `excludes { HasRank }` if the trait extends `Number`), or declare the operator in an object. Limit: the compiled checker does not catch the overlap with the library's `+` (row 918). Only walk's load check does, so the pair needs a walk run.

### Traits and objects (lines 26-64)

- Never extend two instantiations of one generic trait. The checker refuses it. Walk runs such a type but refuses overloads on two instantiations (row 416). I would not copy the spec's examples marked "Not allowed".
- `comprises` is about values (P-60). Several declarations can together cover a meet. Walk checks extenders only against the main component's clauses (row 551).
- `override` widens. It replaces an inherited declaration only where the inherited parameter types are strictly narrower than its own. To replace one at the same types, I would redeclare it without `override`. Never write a Java-style `override`: walk refuses it at load, and one in the library stops every program. Never write `override` at all in code that must compile, because the code generator refuses every one (row 650). The checker misses a Java-style one (row 653).
- An object covers an inherited abstract method with one body at its types, or with several narrower bodies (P-147). Walk does not check generic objects (row 665). The checker refuses a cover by several bodies once static parameters are involved (row 725), so there I would give one body at the abstract's types.
- Self-typed trait: no `comprises` clause (or only `...`), and a parameter bounded by the trait itself or by a self-typed parent. In its bodies, `self` is `T[\X\]` met with `X`, so returning `self` at `X` needs no cast. When compiled, a `typecase` with `self` in one arm and another value in the other fails verification (row 1070), so I would bind `self` first: `do r: X = self; r end`. Before a compiled program relies on a default body that calls `X`'s methods from a generic object listing `T` first, I would write a compiled test (row 1052). If an object redeclares a dotted method of `T` at the same parameter types, I would keep `T`'s return type or make the method a getter (row 1094). If walk refuses a valid pair because the trait is self-typed only through a parent, or because the method has its own static parameters, the cause is row 999.
- Index (P-156): I would write `I extends Index` in the library and in my own generics over indexed types. I would not write it in code that must compile against the prelude today, which has no `Index`. Only `ZZ32` is an `Index`, so a `ZZ64`, `NN32` or `ZZ` must be converted before it can subscript. `Range` excludes `Index`. A tuple of `Index` types is an `Index`, so `m[i, j]` passes one pair, but `()` is not an `Index`. When compiled, I would not pass a tuple expression at a parameter typed `Index` (row 805).
- Tuple order works only where every element type extends `StandardPartialOrder`. Walk refuses mixed number types at one position (row 511). Compiled, a list of `RR64` has no `<` (P-154), but walk orders every list (row 774).
- `=` falls back to `SEQV` (P-168). A value object without its own `=` holding separately computed equal strings is not `=` its twin. I would give each value object compared by content its own `=`. Tuple `=` exists only for pairs and triples (row 923). `EQV`/`≡` is boolean equivalence and is undeclared, so I would write `<->`. Compiled today there is no `=` over `Any` or on tuples, and `===` compares by `=` (row 908).

### Static parameters, `where` clauses and sizes (lines 66-85)

- A parameter that a call does not fix takes its bound (P-48), never `Nothing`. Under walk, a self-bounded parameter stays `OPEN`. When walk compares overloads, a type holding `OPEN` admits only what it would admit at `Bottom` (row 663). Three other cases still get `Bottom` (rows 591, 612, 587).
- Only the checker gives an argument call the enclosing call's context (P-51). Under walk I would write static arguments explicitly: `mk[\ZZ64\]()`.
- `where`: only three forms are built (P-151). Any other `where` on an `extends` entry is silently unconditional. At run time, conditions are not applied (rows 774, 777), and the compiled runtime checks no `where` clause at all. In compiled code I would avoid a declaration whose own `where` introduces a variable such as `[\nat n\]`, because the call dies (row 867).
- Sizes are equal only when written alike after numeral arithmetic (P-55), so I would write size products in one fixed order. A `typecase` arm on a numeral size is reachable from a parameter. I would avoid size exponents above 4096 and negative ones (row 675).
- `reflect`/`NatParam` is walk only, also after the switch-over. When compiled, I would never pass a value of a trait that lists a type at a `where`-clause size where the listed type is expected (row 307). This holds for my own traits too.

### Numbers (lines 87-116)

- The number types are flat siblings (P-43). Seven are value objects (P-178). `QQ` is a trait whose values are `Ratio` (P-166), and the prelude has no `QQ`. I would never extend a number type; my own number type goes below `Number` (P-160).
- Replace `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` with `ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64`. Write a catch-all arm as `x: Any =>`. I would spell tuple-arm types with care, because an undefined name there silently binds anything (row 1064).
- A numeral converts at a typed binding, an assignment, a field, a parameter and a declared return type (P-173). It converts exactly into the integer types and `QQ`, and with one rounding into the floats. Out-of-range numerals are refused: statically by the checker, at run time by walk. Everywhere else the default applies (`ZZ32`, `ZZ64`, `ZZ`, `RR64`) and it sticks, so I would type the binding where the numeral is written. A `nat`/`int` parameter used as a value is a `ZZ32`.
- A numeral type appears only as the parameter type of a coercion or an operator. My own number type takes numerals through a coercion that is generic over the numeral's numbers, with a `where` bound. A negative constant arrives through prefix `-`. The coercion gives one value per source position (P-176). `array1`/`array2` give a plain array for my own type.
- An expression of numerals alone folds exactly before the checker (P-173): `2147483647 + 1` is a `ZZ64`, `0.1 + 0.2 = 0.3` is true, and `1/1000` is a `QQ`. To test run-time arithmetic or concatenation, I would put one operand in a typed variable. My own type takes a folded constant only through a coercion from the constant's default type.
- Coercions apply at calls, bindings and assignments (P-59). Walk does not apply them at a return (row 387) or to an arrow-typed argument (row 1083), so I would declare a function at the parameter's arrow type. A generic call promotes (P-74), but walk takes the join for tuples and varargs (rows 395, 511).
- A numeral can run a more specific declaration (P-46). Exceptions: rows 1016 and 1017.
- Convert integers with the checked getters `asZZ32` and the like. The low-bits functions (`narrow`, `widen`, `signed`, `unsigned`, `big`) wrap silently (P-161). For a `ZZ` value I would write `z.asZZ32`, never `narrow(z)`. The prelude has fewer of both (row 349).
- `Number` declares nothing (P-165), so I would not write numeric code over `T extends Number`. `=` across number types that no coercion joins is silently `false`, so I would compare by `asFloat(x) = y`.
- `^` returns its base's type (P-153). For a fractional result I would write a float base or a `QQ` base, never `10^(-k)`. `/` on integers gives a `QQ`. `DIV` truncates toward zero. For a float result I would use `(1.0 s) / n`, or `asFloat` on `ZZ64` operands. A compiled `7 / 2` is a static error today.

### Reductions and comprehensions (lines 118-130)

- When a reduction's static argument is not written, the two paths fix it differently. The checker follows the expected type. Walk follows only a local variable's declared type or a top-level or local function's return type, and otherwise takes the join of the elements' run-time types. At a method return, a field, a top-level variable or an assignment the two paths differ (row 1008), so in a program for both paths I would write the argument there: `SUM[\ZZ32\][...]`. As a call argument, both paths sum in the body's type. Write both arguments of `BIG MIN_MAX` (row 1007). Walk differs on an empty `SUM` (rows 716, 436) and on nested comprehensions (row 717).
- For my own reduction without an identity, I would declare `simpleJoin` at `R`, never at `Any` or untyped, and I would not copy the team's tests.

### Implementation limits (lines 132-136)

- I would never write a `Maybe` as an `if` condition, even though walk takes one.
- I would write every parameter type. The compiled checker refuses an untyped parameter unless the api gives its type. A return type may be left out where the api declares it.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

1. **Line 7, how to read row sentences (medium-high).** The preamble asks the worker to tell a departure (assert the rules' answer in an `XXX` test) from an undecided case (assert today's behaviour in a plain test). Many row sentences do not say which they are:
   - row 1008 (line 124) says only that "the two paths sum in different types";
   - also rows 1064, 551, 663, 307, 675 and 962;
   - row 1052 (line 41) fits neither class: it records a test-coverage gap, not a behaviour.

   As written, a worker cannot choose the test. Suggest labelling every row sentence as a departure or an undecided case, or stating a default ("a row sentence is a departure unless it says the rules do not decide").
2. **Line 7 against lines 64, 110 and 114: the two classes collide (medium).** "Until the switch-over" sentences that also cite a row (908, 349, 441/523) fall in both classes. One says this is a limit not to fix in the prelude. The other says this is unsettled behaviour that needs an `XXX` or plain test. It is unclear whether a compiled test of today's behaviour is wanted.
3. **"compiler's prelude" and "compiler's library" (medium).** The two names are used for the same claim: line 89 says "the compiler's prelude declares no `QQ`", and line 116 says "the compiler's library has no `QQ`". The core says the prelude is three files of the compiler's library and that those three are deleted. A reader cannot tell whether limits stated of "the compiler's library" (lines 64, 114, 116) end at the switch-over or outlive it. Suggest one name throughout.
4. **Line 24 against line 43: a self-typed trait's own `+` (medium).** Line 24 says any program trait with its own functional `+` overlaps the library's array/number `+` and needs `excludes { Number }`. Line 43 says the self-typed reading makes `AdditiveGroup`'s `+` valid beside that same `+`, and that walk loads "such a pair ... in a program's own component". Reading A: every program trait needs the fix. Reading B: a self-typed trait does not. Say which.
5. **Line 48: `Index` in a program for both paths (medium-low).** "Write the bound only in code that runs under walk or is checked against the interpreter's library" can mean "only under walk" or "whenever walk is among the paths". For a model program, which runs under walk and compiles against the prelude, neither choice is clean: writing the bound breaks today's compile, and omitting it fails `FORTRESS_LIBRARY=one`. State what such a program writes today.
6. **Line 99 against lines 89 and 110: the `Byte` example (low-medium).** The example coercion calls `v.asZZ32` on a `ZZ` value. Line 110 says the prelude has `asZZ32` only on `ZZ32` and `ZZ64`, yet line 89 says a program's own number type "runs on both paths". Copying the example into a compiled program may fail. I could not check this without opening a source.
7. **Line 91: tuple arm with an undefined name (medium-low).** The passage says the name is read as a binder "on both paths", then says that compiled, the checker refuses the arm as unreachable. The two statements look contradictory unless the reason for the refusal is given.
8. **Line 122: "takes its bound, or the expected type where the bound does not fit" (medium-low).** It is not said what the bound must fit: the expected type, or the elements. Reads two ways.
9. **Line 32: "An `override` in a trait also overrides in every type below it" (low-medium).** Reading A: the override is inherited. Reading B: it also overrides narrower declarations made in subtypes.
10. **Line 68: bare `OPEN` against "a type that holds `OPEN`" (low-medium).** "Every value passes `OPEN` itself" and "admits only what it admits at `Bottom`" leave open how a bare `T` that stayed open behaves in overload comparison, for example `pick(x: T)`.
11. **Line 95: `TIMES` (low-medium; a term the core does not give).** The text never says that `TIMES` is ASCII for `×`. It also does not say whether juxtaposition (`t 10.0`) overflows the same way, so a reader may think only `TIMES` reaches an infinity.
12. **Line 93: "a numeral type has no getters, no `asFloat`, no `asString`" (low).** This can be read as saying `3.asString` fails. By line 97 the numeral takes its default there. Say that the sentence is about the numeral type, for example in a coercion's body.
13. **Lines 95 and 99: "place" in two senses (low).** In "a place fixes a type" (line 95) it means a typed context. In "each place where the numeral is written" (P-176, line 99) it means a source position.
14. **Line 30: "extenders" and "the program's main component" (low-medium; terms the core does not give).** Neither is defined.
15. **Lines 22 and 34: where covering bodies may live (low).** Line 22 forbids inheriting a functional method's body from another trait. Line 34 (P-147) does not say whether a dotted method's covering bodies may be inherited.
16. **Line 28: "The specification marks the Working Draft's examples ... 'Not allowed'" (low).** The marks are presumably in `Specification/`, so a worker reading `Specification-1.0-frozen/` sees no mark.
17. **Line 120: `0#n` (low; a term the core does not give).** The range notation (start and count) is not explained, and it can be misread as an inclusive range from 0 to n.
18. **Line 130: "reduction" in two senses, and empty `BIG MAX` (low).** "Reduction" means both the expression and the declared object. What `BIG MAX` gives over an empty generator is not stated.
19. **Line 136: the row 405 exception (low).** What walk does with an untyped parameter in a method that implements an abstract one is not stated. Leaving out a return type also interacts with walk's reduction rule (line 122 uses the function's return type), and this is not mentioned.
20. **Line 43: "So it refuses a narrower return type there" (low).** The "So" does not follow from the sentence before it without the reasoning (that `self` at `T[\X\]` met with `X` equals the object type).
21. **Lines 89, 95 and 112: "eight number types" (low).** In compiled context the prelude has seven, since it has no `QQ`.
22. **Line 24: "Meet Rule" and "meet" (low; terms the core does not give).** The core says "a third covers their meet" but names neither the rule nor "meet". Line 30 then lets several declarations cover a meet. This refines the core and is fine, but the refinement is not flagged as one.
23. **Line 55: `CMP` and `Unordered` (low; terms the core does not give).** Neither is defined.
24. **Line 101: "a result that can be `-0.0`" (low).** It is unclear what "can be" covers.

## 3. Repair history, or detail that changes no action and prevents no misunderstanding

- **Line 89: "The record calls this design route A, and still calls the number types 'the tower', though they do not nest."** This is record vocabulary carrying history ("still"). Keep it only as a one-line glossary entry, and only if the record's queries print those terms. (Medium)
- **Line 41: "A compiled body of `T` that returns `self` at `X` runs, also from an arm of a conditional or a `case` expression, a function expression or a local function."** This lists shapes that work, which reads like a log of past fixes. The action needs only the one shape that fails (row 1070). (Low-medium)
- **Line 43: "the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own. Walk reads `self` in the same way, so it loads such a pair in the library".** This justifies the library's own validity. The worker needs only the program-side consequence and the row 999 exceptions. The passage is also the source of item 4 above. (Low-medium)
- **Line 134: "Walk has no static types."** This restates the core (line 76 of `SKILL.md`). "Walk will run the checker only after the switch-over (P-12)" is a plan that changes no action today. (Low)
- **Line 136: "With none or several, the checker types the body."** This changes no action. (Low)

Passages I tested against the two questions and kept: the two exact error messages at line 89 and walk's messages at line 95 (they help a worker recognise a failure), "The Scala language accepts it" (line 22), "A Java `permits` list..." (line 30), and "The compiler's prelude follows the same design (P-37)" (line 93). Each of these prevents a misunderstanding.
