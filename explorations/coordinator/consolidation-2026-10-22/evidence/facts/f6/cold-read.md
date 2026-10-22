<!-- Cold read of facts/f6/clean.txt (F-76, F-79 to F-87), with only CLAUDE.md and the fortress-repo skill (core and allowed references). -->

# Cold read: F-76, F-79 to F-87

Context used: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and the references `compiler.md`, `library.md`, `records.md`, `tests-writing.md`, `interpreter.md` and part of `tests-running.md`. All ten entries are facts.

Terms the skill gave me: the Meet Rule (SKILL.md, "Dispatch is on every argument": two overloads are accepted if a third covers their meet); the Meet Rule for Functional Methods and the No Duplicates Rule (interpreter.md, "What walk checks"); `comprises`; coercion; the distance; the compiler's prelude; the switch-over; `XXX` tests (expected failures that assert the specification's answer); ledger rows. Terms it did not give me: "closed trait", "IntLiteral", "AnyIntegral", "export error", "rank" of a range, `FullRange`, "expected type" (I took it in its usual bidirectional-typing sense).

---

## F-76, "The compiled checker accepts the specification's `comprises` example of the Meet Rule ..."

- **Established:** The compiled checker accepts two overloads whose meet no single declaration covers, if several declarations below the two overloads together cover the meet once `comprises` clauses are read (every value of a closed trait has one of its listed types). This coverage check runs only when the checker checks overloads. A call whose argument has a static type between closed traits and their listed types (so that several of the covering declarations may run) gets the intersection of those declarations' return types as its type. This builds P-60.
- **Conditions:** Holds on the compiled checker, for families without static parameters. A family with static parameters is refused (row 546), or its call is typed by one candidate picked by a sort (row 543, called deliberate). The `comprises` clause is checked only at the closed trait's immediate subtypes, so a type in another component below a generic subtrait is not checked against it (row 487). The checker's verdict on an overload set can change with the components compiled earlier in the same JVM (row 547).
- **Consequence:** A worker can rely on such a family being accepted and a call on it typed by the intersection, but not on the compiled path running it: a method call on a value of that intersection type crashes the code generator (row 540), and a generic declaration instantiated at an intersection type dies at class load (row 559). Generic families do not get this treatment. A checker verdict seen in a one-JVM run may differ from one in a fresh JVM, so compare runs with the same set of components before.
- **Evidence:** Tests `compiler_tests/*Comprises*` and `*CoverageReturn*`; detail in `compile-ladder/rung-return-type-rule/decision-record.md` sections 3 and 4; rows 487, 540, 543, 546, 547, 559.
- **Could not resolve:**
  - "closed traits": not defined in the skill. I read it as a trait with a `comprises` clause. Language concept I lack, though it can be inferred.
  - "whose argument's static type stands between closed traits and their listed types": the plural can be read as "below several closed traits at once" (such as the meet of two closed traits) or as "below one closed trait and above the types it lists". Unclear wording.
  - "its candidates": the declarations that cover the meet, or every declaration that applies to the argument's type? Unclear wording.
  - "a coverage check used only in overload checking": the limit does not say what the check is kept out of (for example a check that inherited abstract methods are covered, or a `typecase`). Unclear wording.
  - "a family whose declarations have static parameters is refused (row 546), or its call is typed by one candidate chosen by a sort": "or" can be read as two outcomes for a generic family (with no word on which one happens when) or as two separate open items, the second for any family. "chosen by a sort" does not say what the sort orders by. "deliberate" does not say whose choice it is, or why a deliberate behaviour is listed under "Open". Unclear wording.
  - "a type in another component below a generic subtrait": it does not say why "generic" matters, or whether a non-generic subtrait in another component is checked. Unclear wording (minor).
  - "the specification's `comprises` example": no file or section is given for the example. Minor.

## F-79, "In the interpreter's library, `IntLiteral`, the type that the compiled checker gives an integer numeral ..."

- **Established:** The interpreter's library declares `IntLiteral`, the compiled checker's type for an integer numeral, as the compiler's prelude does: a sibling of the number types under `Number`. Each integer type, `QQ`, `RR64` and `AnyIntegral` declares a coercion from it. This is the library half of P-76. `IntLiteral` declares the members of `Integral[\I\]`, `zero` and `one` itself, because no declaration of `Integral` applies to it, even through coercion. Each integer type declares its own comparisons, `CMP`, `MAXNUM`, `MINNUM`, and a `^` that takes an `IntLiteral` exponent.
- **Conditions:** Under walk a numeral is still a `ZZ32`, `ZZ64` or `ZZ`, so no numeral reaches these declarations until walk's half of P-76 is built (F-74). `ZZ32`'s getters `minimum` and `maximum` do not reach a numeral: `(3).minimum` is refused (row 581).
- **Consequence:** Do not remove the integer types' own comparisons and `^`: without them, an operation on a typed integer and a numeral is ambiguous, a tie between a declaration inherited from a generic trait and the other number types' own declarations. A dotted getter of an integer type cannot be called on a numeral directly. Do not expect walk to exercise `IntLiteral` through numerals yet.
- **Evidence:** Test `tests/IntegerOrderNumerals.fss`; detail in `compile-ladder/rung-numeral-library/REPORT.md` sections 4 and 6; row 581; F-74.
- **Could not resolve:**
  - `AnyIntegral`: not in the skill. I took it to be a library trait above the integer types. Language (library) concept I lack.
  - "`IntLiteral` declares `Integral[\I\]`'s members, `zero` and `one` itself": reads as "Integral's members, which are `zero` and `one`" or as "Integral's members, and also `zero` and `one`". Unclear wording.
  - "the other number types' own": own what? I read it as the same operator's declarations in `QQ`, `RR64` and the like, reached by coercion. Unclear wording (can be inferred).
  - "`(3).minimum` is refused": refused by the compiled checker, I assume, since under walk `3` is a `ZZ32`. The entry does not say which path. Unclear wording.
  - The gate is a walk test (`tests/`), but the entry says that under walk no numeral reaches these declarations. It does not say what the test asserts. Unclear wording.

## F-80, "The compiled checker judges two functional methods of one name, abstract declarations included, by the Meet Rule for Functional Methods ..."

- **Established:** For two functional methods of one name, abstract ones included, the compiled checker applies the Meet Rule for Functional Methods in each type that provides both (F-88 defines "provides"). The type must provide their meet, computed on the parameters other than `self`. An abstract functional method beside a concrete one with the same parameter type is refused under the No Duplicates Rule. The checker's overloading memo is keyed on all the inputs of the check, so a pair accepted at the top level is checked again in a trait that provides it.
- **Conditions:** Not checked: a pair that only an object expression provides (row 570), and every operator whose name is not a word of capitals, such as `+` or `||` (row 584; F-245 measures what this skip hides). Operators named by capital words, such as `CMP`, are checked.
- **Consequence:** In a library type that provides two such methods, declare their meet. Do not put an abstract and a concrete functional method with the same parameter type side by side. Do not trust the checker's silence on symbol operators or on object-expression pairs.
- **Evidence:** Tests `compiler_tests/FunctionalMethodMeet*`, `XXXFunctionalMethodMeetAbstractSibling` and `XXXNoDuplicatesRuleAbstract`; detail in `compile-ladder/rung-overloading-checker/REPORT.md` sections 5 and 7 and `compile-ladder/rung-checker-abstract-callsite/REPORT.md` section 1; rows 570, 584.
- **Could not resolve:**
  - The two `XXX` tests: an `XXX` test asserts the specification's answer and fails today, so `XXXNoDuplicatesRuleAbstract` suggests that refusing an abstract method beside a concrete one departs from the specification. The entry states the refusal as plain behaviour, and does not say whether it is a defect, or which defect `XXXFunctionalMethodMeetAbstractSibling` records. Unclear wording.
  - "with the same parameter type": with or without `self`, and with `self` at the same position? Unclear wording (minor).

## F-81, "In the interpreter's library, each Meet Rule pair inside one type that the compiled checker reads has a declaration on its meet ..."

- **Established:** In the interpreter's library, every Meet Rule pair inside one type that the compiled checker checks has a declaration at its meet. Pairs of operators whose names are symbols, which the checker skips (row 584), are not all met. `String`'s juxtaposition is three top-level operators, because two functional methods with `self` at different positions have no meet. `String`'s `||`, `|||`, `//` and `///` still have that shape (row 585). F-245 lists the other unmet pairs that the skip hides, among them `Indexed`'s three subscripts in 17 types. Some declared types were set to what their bodies return (report section 1). Others still differ, such as `__bigOperator2`'s fused branch (F-85).
- **Conditions:** Holds for the pairs the checker reads. Symbol-named operator pairs are outside it.
- **Consequence:** A new pair of functional methods in one library type needs a declaration at its meet. Two functional methods with `self` at different positions cannot be met: write them as top-level operators, as `String`'s juxtaposition does. Expect unmet symbol-operator pairs to surface once the skip is removed (row 584, F-245).
- **Evidence:** Test `tests/LibraryMeetDeclarations.fss`; detail in `compile-ladder/rung-library-meets/REPORT.md` section 1; rows 584, 585; F-245, F-85.
- **Could not resolve:**
  - "each Meet Rule pair inside one type that the compiled checker reads": "that the compiled checker reads" can attach to "type" or to "pair". From the second clause I read it as pairs the checker checks, not skips. Unclear wording.
  - "keep that refused shape (row 585)": refused by what, if the checker skips symbol operators? I read it as "the shape that the rule refuses, kept because the skip lets it through". Unclear wording.
  - "The same work": the entry refers to the change that built it, which the reader does not have. Unclear wording.
  - "Others still differ": others among which declarations (the whole library, or those this work looked at)? Unclear wording.

## F-82, "In the interpreter's library, the range types declare a method on the meet for each of their Meet Rule pairs ..."

- **Established:** The interpreter's library range types declare a method at the meet of each of their Meet Rule pairs that the compiled checker checks, and their declared types match what their bodies return. Among these meets: `CAP` at each rank (F-89 gives the ranks' kinds) and `FullRange`'s abstract `IN`, so a numeral `IN` a `#` or `:` range type-checks (row 580).
- **Conditions:** `Indexed`'s three subscripts are skipped as symbol operators (row 584) and have no meet in the ranges (F-245). Open library bug (row 603): the full sequential ranges' `map` returns a `SimpleMappedSeqIndexed`, which is not a `MappedGenerator`, so its `reverse` is `Indexed`'s. `seq(0:6:2).map(fn x => x + 1).reverse.asString` prints `SimpleReversedIndexed(mapped(seq(1,3,5,7)))`, not `mapped(7,5,3,1)`.
- **Consequence:** A worker can use `IN` with a numeral on a range under the checker. Do not rely on `reverse` of a mapped sequential range: it gives an `Indexed` view, not a reversed mapped generator. A meet for `Indexed`'s subscripts in ranges is still owed.
- **Evidence:** Test `tests/RangeDeclarations.fss`; detail in `compile-ladder/rung-range-meets/REPORT.md` section 1; rows 580, 584, 603; F-89, F-245.
- **Could not resolve:**
  - "`CAP` at each rank", "the ranks' kinds": "rank" of a range is not in the skill. I guess it is the number of dimensions. "Kinds" may mean the kinds of a static parameter. Language concept I lack.
  - `FullRange`, "the full sequential ranges": "full" is not defined. I guess both bounds are given. Language (library) concept I lack.
  - "(row 580)": this does not say whether the row is closed by this work or still open. Unclear wording.
  - It does not say whether `tests/RangeDeclarations.fss` pins row 603's output. Minor.

## F-83, "In the interpreter's library, the string components `String.fss` and `FlatString.fss` hold no site of the distance ..."

- **Established:** `String.fss` and `FlatString.fss` have no compiled-checker errors counted in the distance (F-53). Their declarations that the checker refused were rewritten in forms the library already uses. The trait `String` is declared in the `FortressLibrary` api. It appears in `FortressLibrary`'s export error for traits whose component declaration differs from the api's: its `extends` clause differs, and the component lacks members the api lists. That error counts against `FortressLibrary`, and goes away when that export error is fixed (`reviews/array-sites-ways.md`, section 4). `FlatString`'s api states its component's header (F-259).
- **Conditions:** Open library bugs: `FlatString.rangeContains` finds only the first occurrence of the character (row 607), and a subscript `:b:c` is completed from the right end of the axis, not as `l:b:c` (row 609).
- **Consequence:** Count no `String` error against the string components: clear it through `FortressLibrary`'s export error. Do not rely on `rangeContains` for repeated characters, or on a subscript with an omitted lower bound. The test asserts row 607's current answers, so fixing row 607 turns it red, and the test must change with the fix.
- **Evidence:** Test `tests/StringPieces.fss`, which pins row 607's two answers; detail in `compile-ladder/rung-string-slips/REPORT.md` sections 4 and 8; rows 607, 609; F-53, F-259.
- **Could not resolve:**
  - "export error": not in the skill. I read it as one checker error per component that lists the traits whose declarations differ from the api's. Tool concept I lack, partly inferred.
  - "the component lacks members that the api lists": which component, `FortressLibrary.fss`? If `String` is declared in `FortressLibrary`, the entry does not say how `String.fss` relates to that trait. Unclear wording.
  - "`FlatString`'s api states its component's header": reads as "the api repeats the component's import/export header" or as "the api's declaration of `FlatString` matches the component's (its `extends` clause)". Unclear wording.
  - "a subscript `:b:c` ... not as `l:b:c`": I read it as a lower bound left out, `b` the upper bound, `c` the stride, and `l` the axis's lower index, but the skill does not give the range-subscript syntax, and "completed from the axis's right end" does not say what range results. Language concept I lack.
  - "pins row 607's two answers": which two answers? I take them to be today's wrong results for two inputs. It does not say whether row 609 is pinned. Unclear wording.

## F-84, "In the interpreter's library, the result-only type parameters of `fail`, `builtinPrimitive` and `List`'s empty comprehension are unbounded ..."

- **Established:** The result-only type parameters (ones that occur only in the result type) of `fail`, `builtinPrimitive` and `List`'s empty comprehension are unbounded, as the team declared them. P-48 gives such a parameter the intersection of its upper bounds, narrowed by the expected type, so where `()` is expected, it is instantiated at `()`. 25 declarations of numbers, orderings, `List` and natives that the compiled checker refused now declare the types their bodies return. `MatchFailure` extends `UncheckedException`. The refused declarations still left have ledger rows (report section 5).
- **Conditions:** Under walk, `IntLiteral`'s own arithmetic returns a `ZZ32` where `IntLiteral` is declared (row 578). F-263 covers the integer powers' types, and F-255 `List`'s ordering.
- **Consequence:** Do not bound these result-only parameters: inference from the expected type depends on it (for example `fail` where `()` is expected). Under walk, do not trust the declared result type of `IntLiteral` arithmetic. Look up the remaining refused declarations in their ledger rows before reworking one.
- **Evidence:** Test `tests/NumberOrderListDeclarations.fss`, under walk; detail in `compile-ladder/rung-number-order-slips/REPORT.md` sections 1 and 5; row 578; P-48.
- **Could not resolve:**
  - "`List`'s empty comprehension": I cannot tell which declaration this is. Library concept I lack.
  - "`MatchFailure` extends `UncheckedException`": the entry does not say why it is here, whether as one of the 25 corrections or as a separate fact. Unclear wording.
  - "under walk, `IntLiteral`'s own arithmetic answers a `ZZ32`": F-79 says no numeral reaches `IntLiteral`'s declarations under walk, so I cannot tell how this arithmetic runs under walk at all. Unclear wording (it looks like a conflict with F-79).

## F-85, "In the interpreter's library, the generator, condition, reduction and nested-generator declarations that the compiled checker refused are repaired ..."

- **Established:** The generator, condition, reduction and nested-generator declarations that the compiled checker refused were rewritten in forms the library already uses. One of their errors still counts in the distance: `__bigOperator2`'s fused branch, the `typecase` branch that runs a nested big operator through `generate2`, returns an `I0` where `O0` is declared (row 632). Each default method of `Condition` that calls `cond` writes the call's result type as its static argument, such as `cond[\Maybe[\G\]\]`.
- **Conditions:** F-250, F-93 (row 629) and F-144 (row 628) cover the neighbouring pieces: the identity functions' `cast` and the typed `embiggen`, how library code reads a generator's size and index, and how reductions without an identity are typed at their element type.
- **Consequence:** Row 632 is still owed, and the distance cannot reach zero without it. When a `Condition` default calls `cond`, write the static argument explicitly.
- **Evidence:** Test `tests/GeneratorDeclarations.fss`; detail in `compile-ladder/rung-generator-slips/REPORT.md` sections 5 and 8; rows 628, 629, 632; F-53.
- **Could not resolve:**
  - "the identity functions' `cast` and the typed `embiggen`": I cannot tell what these are. They are pointers only, so this does not block the entry. Library concept I lack.
  - "Each default of `Condition`": I read "default" as a default method body in trait `Condition`. Unclear wording (minor).

## F-86, "The compiled checker types a varargs parameter as the team's `ImmutableArray[\T, ZZ32\]` ..."

- **Established:** The compiled checker gives a varargs parameter the type `ImmutableArray[\T, ZZ32\]`. It applies a varargs declaration by the specification's expansion rule: one declaration for each number of arguments it can take (`Specification/basic/overloading.tex`, "Applicability for Functionals with Varargs and Keyword Parameters").
- **Conditions:** Checked against the interpreter's library, a body can use the parameter as that array. The compiler's prelude declares no `ImmutableArray`, so against it every use of the parameter is refused (row 604). The code generator refuses varargs (row 624).
- **Consequence:** A varargs declaration type-checks now, but no compiled program can run one until the switch-over and a code-generator case. A compiled test of a varargs body is an `XXX` test.
- **Evidence:** Tests `compiler_tests/Varargs*`, and `XXXVarargs*` for rows 604 and 624; detail in `compile-ladder/rung-checker-defects/REPORT.md` section 4.
- **Could not resolve:** nothing.

## F-87, "The compiled checker gives a call its expected type in a clause of an `if` without `else` ..."

- **Established:** The compiled checker passes the expected type to a call in these places: a clause of an `if` without `else`, a block's last expression after local declarations, a `typecase` clause, a juxtaposition, an operator repeated between three or more operands, a `label` body and each value an `exit` gives the `label`. At another call's argument, it retries the enclosing call against each declaration's parameter type (P-51, F-221). The `label` cases build P-50.
- **Conditions:** Holds in the compiled checker. F-226 (renaming an inherited method's static parameters at a call) and F-70 (checking a written static argument against its bound) are related.
- **Consequence:** A result-only static parameter can be inferred from context in these places, with no static argument written. Elsewhere, write it.
- **Evidence:** Tests `compiler_tests/InferResultOnly*` (among them `InferResultOnlyLabelBody`, for the body and an exit's value) and `Infer*Context`; detail in `compile-ladder/rung-checker-contexts/REPORT.md` section 1; P-50, P-51.
- **Could not resolve:**
  - "a juxtaposition": the entry does not say which expected type a call inside a juxtaposition gets (the juxtaposition's own, or a parameter type of the juxtaposition operator). Unclear wording.
  - The code generator has no case for `label` and `exit` (`compiler.md`), so the `label` contexts can only be type-checked, not run. The entry does not say this. Unclear wording (minor).
