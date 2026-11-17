# Cold read of the orientation (climb-batch-31b)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` (the core), and `explorations/compile-ladder/climb-batch-31b/orientation/orientation.md` (the orientation). Nothing else was opened. Line numbers below are the orientation's.

## 1. What I would do differently, section by section

### Preamble (lines 1-7)

- Read each sentence by its marker. A bold rule is this tree's rule. A sentence with P-N is a curator decision: carry it out. A sentence with no marker: build on it, never cite it as a decision. A sentence with a ledger row is unsettled: never assert it in a plain test, only in an `XXX` test. A sentence opening "Until the switch-over" is a limit of the compiler's library: never fix it in the compiler's prelude.
- Where the specification and the type papers disagree, follow the papers (P-26). Treat `Specification-1.0-frozen/` as the Working Draft, the unrevised text, never as this tree's rule. Appendix I holds the original text of a changed rule.
- Before I call a disagreement a conflict, search FACTS and POSITIONS for a change the orientation does not hold.
- Distrust an old note, a team test or my training on three points: the number types do not nest, fixed-width arithmetic does not wrap, walk converts arguments.
- Limits: the markers work per sentence, and some sentences carry two (see 2.1, 2.2).

### Dispatch and overloading (lines 9-24)

- Accept overloads that differ only in their static parameters' bounds (P-45). Judge them on declared domains: the argument types accepted at some instance within the bounds. Check the Return Type Rule at every instance the arguments allow, not at one.
- For generic pairs, work out exclusion over the whole tuple (P-152): a shared generic type at one position forces its static arguments equal, and exclusion must follow from those equalities. Refuse a pair whose exclusion needs a parameter left free. In the exclusion test the checker uses the meet of a parameter's bounds where the parameter is a whole parameter type, a tuple element or an intersection/union member, but leaves it inside a static argument (P-157).
- Never rely on declaration order under walk. Never take walk's load check as the verdict, in either direction: look the case up in `interpreter.md`, "What walk checks".
- Never declare two functional methods whose parameter types are equivalent, wherever `self` stands. Never put an abstract and a concrete method with the same parameter types in one trait. When an object inherits an abstract functional method from one trait and its body from another, declare the method in the object (P-149).
- When a program's trait declares its own functional `+`, `-`, `MIN` or `MAX`, give it `excludes { Number }` or `excludes { HasRank }`, or declare the operator in an object (P-160). Otherwise walk refuses at load ("fails the Meet Rule"). The checker does not catch it against the library's `+` (row 918), so a clean compile proves nothing.
- Limits: walk compares a generic trait's or object's functional methods at each call, not at load (row 780). A generic method called outside its bound fails with "Cannot unify".

### Traits and objects (lines 26-70)

- Never let a type extend two instantiations of one generic trait, even though walk runs it (P-43, P-97). Do not overload on two instantiations of one generic, as walk refuses that pair (row 416). Do not copy the specification's examples marked "Not allowed".
- Read `comprises` as a statement about values (P-60): a generic trait need not be listed, and several declarations together may cover a meet. Walk checks extenders only against the main component's clauses (row 551).
- Write `override` only to widen: it overrides only where the inherited parameter types are strictly narrower. To replace at the same types, redeclare without `override`. Never write a Java-style `override`: walk refuses it at load (the checker accepts it, row 653). A program that must compile cannot carry any `override` (row 650).
- Give an object bodies that together cover each inherited abstract method's parameter types (P-147). Walk does not check this for a generic object (row 665); the checker refuses a several-body cover with static parameters (row 725).
- In a self-typed trait, return `self` at `X` without a cast. In compiled code, never return `self` at `X` from a function expression or local function (row 1050) or from one arm of a conditional (row 1051): bind `s: X = self` first. On a `ClassCircularityError` (row 1052), move the body from the trait into the object, and do not keep both. A type that extends `StandardTotalOrder` and runs compiled declares its own `MIN` and `MAX`.
- In generic code over an indexed type write `I extends Index` (P-156), except in a program compiled against the compiler's prelude today, which has no `Index`. Index only with `ZZ32` or a tuple of `Index` types; `ZZ64`, `NN32`, a `Range` and `()` are not `Index`. Do not overload `Index` beside a tuple of `Index` types without a cover.
- Compare pairs and triples only where each element type extends `StandardPartialOrder`. Under walk do not mix number types at one position (row 511). Do not order a list of `RR64` in checked code (P-154), though walk orders every list (row 774).
- Expect `=` to be `SEQV` on a type without its own `=` (P-168). Give a value object holding strings or floats its own `=`. Write `<->`, never `EQV`/`≡`, for boolean equivalence (row 184). Tuples longer than three compare by `SEQV` (row 923). Equal literal strings are one object (P-171). On the compiled path today `===` compares by value (row 908).

### Static parameters, `where` clauses and sizes (lines 72-91)

- Expect an unfixed type parameter to take its bound, not `Nothing` (P-48). Under walk, recognise `OPEN` for a self-bounded parameter, and the three cases still given `Bottom` (rows 591, 612, 587).
- Under walk, write the static arguments of a generic call that stands as an argument, as `mk[\ZZ64\]()` (P-51, row 705).
- Write `where` clauses only in the three built forms (P-151). Any other `where` on an `extends` entry is taken as unconditional without a message. Do not rely on a condition being checked at run time: walk and the compiled runtime ignore a conditional extension's condition (row 774), walk runs a dotted call that breaks one (row 777), the code generator emits no check. Avoid a compiled call of a declaration whose own `where` introduces a variable (row 867).
- Compare sizes by written form after numeral arithmetic (P-55): `s0 s1` is not `s1 s0`. Keep size powers at exponent 4096 or below and never negative (row 675).
- Use `reflect` for a run-time size only under walk. In compiled code never pass a value of a trait whose `comprises` lists a type at a `where`-clause size where a listed type is expected (row 307).

### Numbers (lines 93-122)

- Never extend a number type; declare a program's own number type below `Number` (P-160). The checker accepts an extension today and the class dies at load (rows 1003, 866), so a compile proves nothing.
- Replace `Int`, `Long`, `Float`, `BigNum`, `UnsignedLong` by `ZZ32`, `ZZ64`, `RR64`, `ZZ`, `NN64`, above all in `typecase` arms, where they silently match everything (row 959).
- Expect a numeral to convert at a typed binding, assignment, field, parameter or declared return type (P-173), and to be refused when out of range. Elsewhere it takes its default (`ZZ32`, then `ZZ64`/`ZZ`, `RR64` with a point), and the default sticks: `x = 0.1` then `q: QQ = x` is refused. A `nat`/`int` parameter used as a value is a `ZZ32` (row 962 for 2^31 and up).
- Write a numeral type only as a coercion's or an operator's parameter type (P-174). Give a program's own number type a numeral coercion generic over `n, r, v` with a `where` bound, a prefix `-` for negatives, and a `coerce` from `QQ` (or the default type) for folded constants, since coercions do not chain.
- Test run-time arithmetic or concatenation through a variable operand: an expression of numerals alone, or `||` of literals, folds exactly before the checker.
- Convert integers by a checked getter (`asZZ32` and kin, raises `IntegerOverflow`) or a low-bits function (`narrow`, `widen`, `signed`, `unsigned`, `big`, never raises) (P-161). On a `ZZ` use `z.asZZ32`, not `narrow(z)`. Today's compiled prelude has fewer of these (row 349).
- In generic code over `T extends Number` call nothing on a `T` (P-165): declare the function once per number type. Compare across number types only where a coercion links them; otherwise `=` is `SEQV` and silently `false`, so write `asFloat(x) = y`.
- For a non-integer power write `2.0^(-1)` or a `QQ` base, never an integer base at a negative exponent (P-153). Expect `/` on integers to give a `QQ`; truncate with `DIV`; convert a `ZZ64` with `asFloat` before float division. Compiled `7 / 2` is a static error until the switch-over.
- Expect promotion to the narrowest common coercion target (P-74), "Ambiguous coercion" when no coerced declaration wins, and a numeral to reach a strictly more specific declaration (P-46), with rows 1016 and 1017 as known departures.

### Reductions and comprehensions (lines 124-136)

- In a program for both paths, write a reduction's static argument where its value lands in a method's return type, a field, a top-level variable or an assignment, because the two paths sum in different types there (row 1008). Write both static arguments of `BIG MIN_MAX` (row 1007).
- Expect the checker to sum in the expected type (`x: RR64 = SUM ...` sums in `RR64`) and walk in a local variable's or a function's declared return type, else in the join of the elements. As a call's argument, a reduction sums in its body's type on both paths.
- Do not assert an empty `SUM` without a declared type (row 716), a nested comprehension's type (row 717) or a non-number static argument on an empty `SUM` (row 436) in a plain test.
- When writing a reduction without an identity, extend `AssociativeReduction[\R\]` and type `simpleJoin` at `R`; never copy the team tests' untyped `simpleJoin`.

### Implementation limits (lines 138-142)

- Expect walk to find no type error before run time. Never write a `Maybe` as an `if` condition.
- Write every parameter type, even where walk runs without one (row 405). A component function may leave out its return type when its api gives exactly one matching declaration.

## 2. Passages that would send a worker wrong, read two ways, or use a term the core does not give

1. **Departures stated without a ledger row** (lines 49-52, 87, 89, 140). Confidence: high that the convention breaks, medium that it misleads. The preamble (line 7) says a departure cites a row and an uncited sentence can be built on. But "In two cases walk does not read `self` so, and its load check refuses the valid pair" (49-52), "The code generator accepts a declaration's own `where` clause but emits no code for it" (87), "Walk refuses a negative exponent" (89) and "walk takes a `Maybe` as an `if` condition" (140) are departures or limits with no row. By the preamble's rule I could assert them in a plain test.
2. **Sentences that mix a settled clause with a row** (line 70). Confidence: medium. "`(s, 1, 2, 3) = (t, 1, 2, 3)` falls back to `SEQV` and is `false`; row 923 holds the question of longer tuples." The rule is per sentence, so it is unclear whether "is `false`" may go in a plain test. Lines 32 and 95 have the same mix.
3. **What an `XXX` test asserts** (line 7). Confidence: medium-low. "Do not assert it as correct in a plain test" says what not to do. It does not say whether an `XXX` test asserts the rule's behaviour (a known departure) or nothing (a case the rules do not decide). The core names `XXX` expected failures only in its description.
4. **How to cite an unmarked sentence** (line 5). Confidence: medium-low. "Build on a sentence without one, but do not cite it as a decision." The core requires a citation from the brief, the record or a primary source, and an orientation sentence is none of these. The worker does not learn what to cite, and the core forbids loading `sources.md`.
5. **`RR64` and `StandardTotalOrder`** (line 44 against line 61). Confidence: medium. Line 44: "a type that extends `StandardTotalOrder` and runs compiled declares its own `MIN` and `MAX`, as the integer types, `QQ` and `RR64` do" reads as if `RR64` extends `StandardTotalOrder`. Line 61: "a list of `RR64` has no order there (P-154)", where order needs `E extends StandardTotalOrder[\E\]`, says it does not.
6. **When the `StandardTotalOrder` advice applies** (line 44). Confidence: low-medium. "From the switch-over, `StandardTotalOrder`'s `MIN` and `MAX` have this shape. So a type that ... runs compiled declares its own" can be read as applying from the switch-over or as applying today.
7. **Default of a folded expression of radix-point numerals** (lines 103, 107, 120). Confidence: medium. A radix-point numeral defaults to `RR64`, but "a quotient that is not whole stays `n / d` ... and defaults to a `QQ`". So `x = 0.5 + 0.25`, `scale = 1.0 / 2.0` or the recommended `2.0^(-1)` (line 120) may be a `QQ`, and `0.5 + 0.5` a `ZZ32`. Nothing says whether the fold keeps the radix point. A worker writing untyped float constants could get either type.
8. **Fix for a trait's own `+` when the trait is a number type** (line 24 against line 95). Confidence: medium. Line 24 offers `excludes { Number }`, but line 95 says to declare a program's own number type below `Number`, and such a type cannot exclude `Number`. Only `excludes { HasRank }` or an object fits that case, and the text does not say which option fits which case. `HasRank` is not given by the core; the text only implies it is the array trait.
9. **`override` on the compiled path** (line 32). Confidence: medium. "The code generator refuses every `override` modifier" leaves open what to write when compiled code needs a widening override. It also leaves open whether the interpreter's library may keep `override` once both paths use it. "The checker refuses this where an object reaches the method ... along two paths (row 1037)" has an unclear "this": it is probably redeclaring without `override`, but it could be the widening `override`.
10. **Where to find the checker's limits for a cover** (line 34). Confidence: low. "Walk and the checker stop the search for a cover at the limits that `interpreter.md`, 'What walk checks', gives" sends a worker to walk's part for the checker's limit. The core puts the checker in `compiler.md`.
11. **Is reordering a fix for row 1052?** (lines 45-47). Confidence: low. The failure happens "where the object lists `T` first in its `extends` clause", but the workaround offered is only to move the body. A worker will try reordering, and the text does not say whether that works.
12. **Writing the `Index` bound today** (line 54). Confidence: medium-low. Line 54 says to write `I extends Index` in your own generic code, and to write it only in code that runs under walk or is checked against the interpreter's library. For a program that must compile today and also pass the count-stage checker, the two instructions conflict. Which one wins is left unsaid.
13. **`OPEN` itself against "a type that holds `OPEN`"** (line 74). Confidence: low-medium. It is unclear whether a bare `T` parameter whose `T` is open admits every value or only `Bottom` when walk compares overloads.
14. **`TIMES` and compiled multiplication** (line 101). Confidence: low-medium. `TIMES` is used with no gloss, where `*` or juxtaposition would be expected. "The compiler's prelude declares neither `TIMES` nor `isInfinite`" leaves a worker unsure how to multiply in compiled code.
15. **What `BIG MAX` gives on an empty generator** (line 136). Confidence: low-medium. "lifts its elements to `Maybe[\R\]`" and "still answers `R`" do not say what an empty generator gives.
16. **Unclear wording in the reduction and walk rules** (lines 15, 128). Confidence: low. Two phrases are unclear: "Otherwise it compares the instances that the call makes" (15), and "takes its bound, or the expected type where the bound does not fit" (128, which does not say what fails to fit what).
17. **Functional or any method?** (line 21). Confidence: low. "An abstract and a concrete method with the same parameter types" sits under a rule about functional methods, so it is unclear whether dotted methods count.
18. **Conversion at a declared return type** (line 101 against line 109). Confidence: low. Line 101 lists a declared return type among the places where a numeral converts. Line 109 says walk does not convert at a declared return type (row 387). Only the words "other than a numeral" reconcile them.
19. **The "Until the switch-over" marker used where nothing ends** (lines 91, 99). Confidence: low. Line 99, "follows the same design (P-37)", states no limit, and on line 91 the call "still fails" after the switch-over. The preamble's reading of the marker ("the limit ends", "do not fix it in the prelude") fits neither.
20. **"declares no `=`"** (line 63). Confidence: low. It is unclear whether an inherited `=` counts.
21. **Terms the core does not give.** Confidence: low unless noted.
    - `HasRank` (medium-low, see 8).
    - `...` as a `comprises` entry (line 38, medium-low).
    - `StandardPartialOrder` / `StandardTotalOrder` and `Unordered`.
    - `TIMES`.
    - `AssociativeReduction` and `simpleJoin`.
    - `BIG //`.
    - `0#n`.
    - `<->`.
    - `__bigOperator`.
    - "where-clause variable".
    - "meet", which the core uses but does not define, though it defines "join".
    - "count stage", which the core names only in passing.
    - "route A" and "the tower", which line 95 defines.

## 3. Repair history, and detail that changes no action and prevents no misunderstanding

I found no repair history: nothing names a batch, a date, an earlier fix or an earlier state. Lines 74, 91 and 95 say "still", which hints at history, but each states the present. Detail that fails both of Astra's questions, or nearly:

1. Line 91: "Until the switch-over, compiled programs do not link `NatReflect`. After it, the call still fails." The action is already in "Such a call runs only under walk"; these two sentences give only the cause, before and after. Confidence: medium.
2. Line 49: "With this reading and the bounds that the test reads ..., the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own. Walk reads `self` in the same way, so it loads such a pair in the library and in a program's own component." This is a proof that the library is valid. It changes no worker's action, except perhaps stopping a library editor from "fixing" the pair. Confidence: low-medium.
3. Line 120: "Its `ZZ32` power gives 0 at a negative exponent for other bases. At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523)." These are details of a prelude to be deleted. The action, never use an integer base at a negative exponent, is already given. Confidence: low-medium.
4. Line 89: "The class loader computes a size without checking its kind, and stops on a negative exponent with a Java exception (row 675)", with the 4096 limit before it. This is rarely met, and the action (no negative size exponent) is one clause. Confidence: low.
5. Line 99: "Until the switch-over, the compiler's prelude follows the same design (P-37)." No action follows from it. Confidence: low.
6. Line 95: "The record calls this design route A, and calls the number and order traits 'the tower': they do not nest." This is vocabulary for reading the record. Keep it only if the record's queries print these words; "they do not nest" repeats the bold rule. Confidence: low.
7. Line 140: "Walk will run the checker only after the switch-over (P-12)." A plan; today's action ("walk has no static types") is in the sentence before. Confidence: low.
8. Line 44: the citation `Library/FortressLibrary.fss:291-292` is a line-number pointer that will drift. It changes no action. Confidence: low.
9. Lines 74 and 128 restate the core's text on `OPEN` and on walk's reduction instance before adding to it. The restated part changes nothing for a reader of the core. Confidence: low.
