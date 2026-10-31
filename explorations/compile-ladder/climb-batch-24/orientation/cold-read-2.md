# Cold read 2 of the climb-batch-24 orientation

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and `explorations/compile-ladder/climb-batch-24/orientation/orientation.md` (101 lines). No other file was opened. Line numbers below are the orientation's.

## 1. What I would do differently, by section

### Preamble (lines 1–7)

- Read each bold sentence as the rule of this tree. A sentence naming P-N is a curator decision that I build on and cite. A sentence without one I build on but do not cite as a decision.
- A sentence citing a ledger row describes a path that departs from the rule. I would not assert that behaviour as correct in a test.
- A sentence opening "Until the switch-over" is a limit of the compiler's library. I would not fix it in the compiler's prelude.
- If two sources disagree and this file is silent, I would search FACTS and POSITIONS before calling it a conflict.
- On three points I would distrust team tests, old notes and my training: the number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.
- Where the papers and the specification differ, most rules follow the papers (P-26).
- "Working Draft" means `Specification-1.0-frozen/`. Text of the specification that a rule changed is kept in Appendix I.
- Limit: the row convention does not cover every departure (item D in part 2).

### Dispatch and overloading

- Two overloads may differ only in their static parameters (P-45). I would judge the pair on declared domains: every type the parameter types accept at some instance within the bounds. The more specific one's return type must be a subtype of the other's at every instance.
- With static parameters, I would test exclusion over the whole tuple (P-152). Generic positions shared by both domains force equal static arguments. The pair excludes only where those equalities cannot all hold, or where some position excludes at the forced instance. A pair that leaves a parameter free is refused on both paths.
- In the exclusion test the checker replaces a parameter by the meet of its bounds. This applies where the parameter is a whole parameter type, a tuple element, or a member of an intersection or union, and not inside a static argument (P-157).
- Under walk, the order of declarations never decides a call.
  - A dotted generic method infers its static arguments from the run-time types of its arguments.
  - "Cannot unify" means an argument is outside a bound.
- I would not change code just to pass walk's load check, and I would not treat its acceptance as proof. I would first look up the case in `interpreter.md`, "What walk checks".
- Two functional methods with equivalent parameter types are duplicates wherever `self` stands. Both paths refuse:
  - an abstract and a concrete method with the same parameter types in one trait;
  - an object that takes an abstract functional method from one trait and its body from another, unless the object declares it (P-149). This breaks my Scala intuition.
- An abstract functional method needs a cover for its meet with a top-level overload, as in `h(self)` beside `h(x: String)`.

### Traits and objects

- The compiled checker refuses a type that extends two instantiations of one generic trait (P-43, P-97). Walk runs such a type, and refuses overloads on `Tg[\3\]` / `Tg[\4\]` (row 416). I would never copy a specification example marked "Not allowed".
- A `comprises` clause covers values (P-60), so I would not list every subtype. Walk checks extenders only against the main component's clauses (row 551).
- `override` is only for widening. To replace an inherited method at the same parameter types, I would redeclare it without `override`. A Java-style `override` makes walk refuse at load. The checker accepts it (row 653), and the code generator refuses every `override` (row 650). So no compiled program can use the modifier today.
- An object can implement an abstract method with several narrower bodies that together cover it, `comprises` read (P-147).
  - Walk does not check this for a generic object (row 665).
  - The checker refuses a cover of several bodies where static parameters are involved (row 725).
- A self-typed trait has no `comprises` clause, or one that lists only `...`. Its parameter `X` is bounded by the trait itself (P-146) or by a self-typed parent at `X`.
  - In its bodies `self` is `T[\X\]` met with `X`, so `= self` needs no cast. A compiled body returning `self` fails verification at class load (row 695).
  - The checker refuses a type that extends `T[\A\]` but is not an `A`.
  - In the overloading rules `self` is `T[\X\]`. In the exclusion test it is the intersection (P-157).
  - Walk refuses array/number `+` pairs declared in a program's own component (row 804).
- In the interpreter's library, I would bound every index parameter by `I extends Index` (P-156). Only `ZZ32` among the integer types is an `Index`, and `Range` is not.
  - The checker rejects `f(3)` for `f(x: Index)`. I would pass a `ZZ32` value. `a[3]` is fine.
  - `m[i, j]` is one tuple index. `()` is no `Index`, and a tuple of indices is no `Object`.
  - Until the switch-over, compiled code cannot name `Index`.
  - The checker refuses a tuple at an `Index` parameter but takes one at `I extends Index` (row 805).
- Pairs and triples are ordered only where each element type extends `StandardPartialOrder`.
  - Under walk, comparing two run-time number types at one position fails (row 511).
  - A `List[\E\]` is ordered only for `E extends StandardTotalOrder[\E\]` (P-154). So I would never order a `List[\RR64\]` in checked code, though walk orders it (row 774).

### Static parameters, `where` clauses and sizes

- A parameter that a call does not fix takes the intersection of its bounds, narrowed by the expected type (P-48). Under walk, a self-naming bound shows as `OPEN`. I would expect `Bottom` in the three row cases (591, 612, 587).
- The checker gives an argument call the context of the enclosing call (P-51). Under walk I would write the static argument, as in `mk[\ZZ64\]()` (row 705).
- I would use only the three built `where` forms (P-151): conditional extension that binds no variable; a call-site condition on a function's or method's own static parameters; a `where`-bound variable in `comprises`.
  - Any other `extends … where` is silently unconditional to the checker.
  - Walk and the compiled run time apply a conditional extension at every instance (row 774).
  - Walk runs a dotted call that breaks a condition (row 777).
  - The code generator emits no check, and a compiled call of a function whose clause introduces a variable dies (row 867). So in compiled code I would avoid `where [\nat n\]` on functions.
- Sizes compare by their written form after numeral arithmetic (P-55): `s0 s1` is not `s1 s0`, and a `typecase` arm against a numeral stays reachable.
  - The checker refuses a size exponent above 4096. Walk refuses a negative one, and the class loader throws on one (row 675).
- A size known only at run time comes from `reflect` and `NatParam`, and works only under walk. A compiled program fails now (`NatReflect` is not linked). It also fails after the switch-over, for any trait whose `comprises` lists a type at a `where`-size (row 307), including my own.

### Numbers

- The number types are flat siblings (P-43). In the record, "route A" is this choice and "the tower" is only a name.
- The checker types a numeral as `IntLiteral`, which converts to the integer types, `QQ` and `RR64` (P-76).
  - Under walk a numeral's class is `Int`/`Long`/`BigNum`. `Box[\Int\]` is not `Box[\ZZ32\]` (row 364), and `IntLiteral` arithmetic gives `ZZ32` (row 578).
  - I would always write the static arguments of `array1` and `array2`, or walk gives a plain array whose `+` and `-` fail (row 721).
- Walk picks a coercion at run time and the checker picks it statically (P-59).
  - A generic call promotes to the narrowest common coercion target (P-74).
  - Walk takes the join of tuple and varargs elements instead (rows 395, 511).
  - Where none is more specific, the result is "Ambiguous coercion". A numeral that is the only difference reads as `ZZ32`.
- `^` answers the base's type (P-153).
  - With a negative exponent, the bases 1 and -1 work, 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`.
  - For a fractional result I would write `2.0^(-1)` or a `QQ` base.
  - In compiled code today, only `ZZ32`, `NN32` and `NN64` have integer powers, each with an exponent of its own type, and `RR64` takes a `ZZ32` exponent.
- I would never write `/` for integer division: it answers a `QQ`.
  - To truncate I would use `DIV`, which rounds toward zero.
  - For a float I would write `(1.0 s) / n` with `ZZ32` operands, or `asFloat(s) / asFloat(n)` with `ZZ64` operands.
  - In compiled code today, an integer `7 / 2` is a static error.

### Reductions and comprehensions

- I would write the static argument in every clause form of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, because the checker cannot infer it (row 731).
- Under walk, the instance comes from:
  - the declared type of a local variable;
  - the return type of a top-level or local function, also at a block's end;
  - never from a method's return type, a field, a top-level variable, a parameter or an assignment;
  - otherwise, the join of the elements' run-time types.
- "body param 1" in `__bigOperator` means an element failed to convert.
- The departures I would expect:
  - an untyped empty `SUM` gives 0 (row 716);
  - an inner comprehension is built at its elements' run-time types (rows 20, 717);
  - a static argument that is not a number type gives `CastError` on an empty `SUM` (row 436).
- For a reduction without an identity, I would declare `simpleJoin` at `R`, never at `Any` or untyped, and would not copy the team's tests that do.

### Implementation limits

- Walk has no static types (P-12), so a walk run proves nothing about typing.
- I would use only `Boolean` conditions, never a `Maybe`.
- I would write every parameter type ("Missing parameter type for" on the compiled path). A function that leaves out its return type takes the api's declaration at its parameter types. With no matching declaration, or several, the checker types the body.

## 2. Passages that send a worker wrong, read two ways, or use a term the core does not give

**A. Line 5: what to cite for a sentence without P-N** (medium)

"Build on a sentence without one, but do not cite it as a decision." The core requires a source for every claim, and the only sources it lists are the brief, the record and primary sources. The skill is none of these.

- A worker cannot tell what to cite when a claim rests on a sentence without P-N.
- A worker cannot tell whether a P-N in a bold sentence covers the rest of its paragraph. For example, line 11 names P-45 in the bold sentence, but the definition of the declared domain and the every-instance return rule that follow do not name it.

**B. Line 5: does P-26 settle every spec-paper disagreement?** (medium)

"Most rules follow the team's later type papers … over the specification's early text (P-26)" has two readings:

- a standing tie-break: by the core's definition of a conflict, any disagreement between the specification and the papers is then already settled;
- an account of how most of these rules were decided: "most" implies exceptions, and the file does not say which.

A worker may settle a new disagreement alone, or explore one that P-26 already decides.

**C. Line 5: where the unrevised specification lives** (low–medium)

The Working Draft is the "unrevised specification" in `Specification-1.0-frozen/`, and Appendix I also "keeps the original text". "Unrevised" can mean before the revival's edits, or the team's frozen 1.0 that the team later revised in `Specification/`. A worker who wants the team's own last text cannot tell which of the two to cite.

**D. Line 7: the row convention misses some departures** (medium–high)

Line 7 says a sentence that cites a ledger row states a departure. Several sentences describe behaviour that departs from the specification or from a bold rule, yet cite no row:

- line 67: "The checker reads an `extends` entry with any other `where` clause as unconditional, without a message";
- line 99: walk takes a `Maybe` as an `if` condition;
- line 54: under walk, a type holding `OPEN` admits only what it admits at `Bottom`;
- line 71: "Such a call does not run compiled yet";
- line 69: "Walk refuses a negative exponent", where the checker's own rule for negative size exponents is not stated.

A worker cannot tell whether each is a rule to assert in a test, a departure not to assert, or a gap the record lacks. Under the core's "If you record a defect that the record does not hold", such a worker would file a new ledger row, perhaps a duplicate.

**E. Line 81 against line 7: rows inside an "Until the switch-over" passage** (medium)

The passage on the compiler's power opens with "Until the switch-over" and ends with "rows 441, 523", which describe a Java exception at base 0 that no `catch` sees. Line 7 gives the two kinds of sentence opposite instructions: a departure that a fix can change, and a limit not to fix in the prelude. The worker cannot tell which applies to this defect.

**F. Line 45: `I extends Index` against a compiler that cannot name `Index`** (medium–high)

"In the library, and in your own generic over such a type, write `I extends Index`." Later in the same paragraph: "Until the switch-over, the compiler's prelude declares no `Index`, so a program that names it does not compile."

A worker writing a compiled test, or a compiled helper for the model program, follows the first sentence and gets a compile failure. The limit belongs on the instruction itself: only code checked against the interpreter's library, meaning walk and the count stage.

**G. Line 45: the reason given for `a[3]`** (low–medium)

"`a[3]` stays valid, because an array indexed by `ZZ32` takes a `ZZ32`." A numeral is an `IntLiteral`, which is no `ZZ32` either. `a[3]` is valid because `IntLiteral` converts to `ZZ32` and not to `Index` (P-76). Line 77 introduces `IntLiteral` and its conversions only later, so here the stated reason misleads.

**H. Line 32: `override`** (medium)

- "Overrides an inherited declaration only where the inherited parameter types are strictly narrower than its own" has two readings. "Where" can set a condition on the pair (an `override` must widen, and at equal types it overrides nothing), or a region of the argument space (it takes effect only on argument types inside the inherited domain).
- Row 650: the code generator refuses every `override`. A worker editing the interpreter's library, which becomes the one library, cannot tell whether to write a correct widening `override`, which walk needs, or avoid the modifier so that the code can compile.

**I. Line 24: what "counts for it" means** (low–medium)

"An abstract functional method also counts for it" can mean that it counts as one of the two overloads that need a cover, as in the example. It can also mean that it counts as the declaration that covers the meet. A worker who fixes the `h` example by adding an abstract `h` at the meet cannot tell whether that satisfies the rule.

**J. Lines 13 and 28: two senses of "exclusion"** (low–medium)

The bold "exclusion is read over the whole tuple" is about two domains excluding each other. The next sentence, "By the exclusion rule", means the core's rule that no type extends two instantiations of one generic trait, which line 28 also calls "instantiation exclusion". Naming the second "the instantiation rule" would remove the double sense.

**K. Line 54: the `pick` example** (medium)

"Beside `pick(x: Any)`, `pick(x: (T,T))` takes no `(1, 2)`" does not show `T`'s declaration. `OPEN` arises only for a bound that names the parameter itself, and an unbounded `T` would not produce it, so the example reads as a different case.

The sentence also cites no row, so it is unclear whether this dispatch is the rule or a departure. Item D covers the row question.

**L. Line 60: is walk's lack of context the decision or a departure?** (medium)

The bold rule, "Only the checker gives a call written as an argument the enclosing call's context (P-51)", places walk's behaviour inside a curator decision. The same paragraph cites row 705 for that behaviour as a departure. A worker cannot tell whether giving walk the context is a fix to make or a change against P-51.

**M. Line 89: the bold reduction rule states no rule** (low–medium)

"A reduction's static argument depends on the path" states a difference between the paths, not the rule of this tree. Row 731 marks the checker's failure to infer the argument as a departure, but nothing says what the checker should do.

- "Write it in every clause form" leaves unclear whether forms without brackets, such as `SUM a` or `BIG MAX v`, need it too.
- "Other reductions take their bound, or the expected type" does not say on which path.

**N. Lines 89 and 95: two senses of "join"** (low–medium)

- Line 89 uses the core's sense, the least common supertype.
- Line 95 uses it for a call of `simpleJoin`: "A generic one stops at its first join".

"Stops" can mean refused, raises or hangs, and the file does not say which.

**O. Line 95: an empty `BIG MAX`** (medium)

The reduction "lifts its elements to `Maybe[\R\]` inside the reduction" and "still answers `R`". The file never says what an empty `BIG MAX`, `BIG MIN` or `BIG //` gives: which exception, or what value. That is the case a worker writing a test or model code most needs.

**P. Line 101: parameter types** (medium)

- "Walk runs it, except in a method that implements an abstract one (row 405)": it is unclear which behaviour is the departure, walk running a parameter without a type or walk refusing one in an implementing method.
- The bold "Write every parameter type" is advice, not a rule, so a worker cannot tell whether an untyped parameter is legal Fortress in this tree.
- The last two sentences, on return types taken from the api, say nothing about walk.

**Q. Line 99: when walk gains static types** (low)

"Until it runs the checker after the switch-over" is a claim beyond the core, which says only that the compiled path moves onto the interpreter's library at the switch-over. "After" leaves open whether walk gains static types at the switch-over or at some later step.

**R. Line 38: `comprises` that lists only `...`** (low–medium)

The `...` form is given neither by the core nor by this file. A worker without Fortress training cannot read the self-typed condition.

**S. Terms the core does not give** (low)

- "Instance" (lines 11, 13, 41, 89): the core says "instantiation".
- "Nest" (line 24): here it means "one is strictly more specific", while lines 7 and 75 use "nest" for subtyping between number types.
- "Wall" (line 71): figurative.
- "Overloads on two instantiations" (line 28): compressed, and it means overloads whose parameter types are two instantiations of one generic.

**T. Line 7: "fixed-width arithmetic does not wrap"** (low)

The statement is absolute, while the core's pointer to `library.md` mentions "wrapping". A worker may conclude that no wrapping operation exists at all.

**U. Line 77: numeral conversions and arithmetic** (low–medium)

- "Converts to the integer types, `QQ` and `RR64`" omits `RR32`, and nothing says whether that omission is deliberate.
- "Walk answers `IntLiteral`'s arithmetic as a `ZZ32` (row 578)" does not state the rule's own answer: what the checker types `3 + 4` as. A worker cannot write the test that row 578 needs.

**V. Line 81: which exponent the base-0 exception needs** (low)

"At a base of 0 it throws a Java exception" can mean at a negative exponent only, or at every exponent.

**W. Line 34: the limit on the cover search** (low–medium)

"Walk stops its search for a cover at limits that `interpreter.md` gives, and the checker at the same limits" does not say what happens at the limit: refusal or acceptance.

**X. Pointer mismatch between the core and this file** (low)

The core sends readers to `revival-changes.md`, "Static parameters". The heading here is "Static parameters, `where` clauses and sizes".

## 3. Repair history or detail that changes no action (Astra's two questions)

- **Line 75**, "The record calls this choice route A. Route C is the way not chosen: a checker rule under which the number types could nest again." (medium) This is the history of the choice. A worker building on P-43 does nothing with route C. Keep the "tower" sentence, which prevents a misreading of the record. Cut route C, or move both route names to the vocabulary of `records.md`.
- **Line 34**, the sentence on the limits of the cover search (low–medium). As written it changes no action. Say what happens at the limit, or cut it (see W).
- **Line 43**, second sentence, "With this reading … the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own." (low) It reads as the case that motivated P-157. Only the walk clause after it (row 804) changes what a worker writes. Keep that clause.
- **Line 17**, the example of row 780 (low). The action is to look the case up in `interpreter.md`, and the sample does not change it.

Everything else either states an action or prevents a known misreading.
