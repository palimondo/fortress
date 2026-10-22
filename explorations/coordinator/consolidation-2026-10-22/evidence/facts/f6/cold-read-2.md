# Cold read 2 of f6/clean.txt (F-76 to F-87)

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and the skill's `references/records.md`, `compiler.md`, `library.md`, `interpreter.md` (section "What walk checks") and `tests-writing.md` (the `XXX` parts). Nothing else.

Pointers to other entries (P-nn, F-nn) and ledger rows could not be followed under the brief. An entry is marked clear below when it can be acted on without following them.

## F-76

**Established:** The compiled checker accepts the `comprises` example that the specification gives for the Meet Rule for Functions. It does this with a coverage check: two overloads whose meet has no declaration of its own are still accepted when several declarations below them, taken together, cover that meet, judged by the values that the `comprises` clauses allow. Only the overload check uses this coverage. The checker's subtype test does not, so it does not treat a closed trait as the union of the types that it lists. When a call's argument has a static type that is below closed traits and above the types that they list, and the call's most specific applicable declarations tie, the call's type is the intersection of those declarations' return types. This is how P-60 is built.

**Conditions:** The intersection typing holds only when the most specific declarations tie "without coercion". Open limits:
- Coverage refuses a pair if one of the declarations that it compares has static parameters (row 546).
- In an accepted overload family that also has another generic declaration, such a call gets the type of whichever declaration comes first in a sort, not the intersection. The sort follows declaration order and can differ from run to run (row 543).
- The narrower scope than P-60's is a default that waits for the curator's review (review-queue item 58).
- Compiled path: a method call on a value whose type is the intersection crashes the code generator (row 540), and a generic declaration instantiated at an intersection type fails when its class loads (row 559).
- The checker checks a `comprises` clause only at the closed trait's direct subtypes. A type in another component that extends a generic subtrait of the closed trait is not checked against the clause (row 487).
- The checker's verdict on an overload set can depend on which components were compiled before it in the same JVM (row 547).

**Consequence:** A worker can rely on the coverage form of the Meet Rule for non-generic declarations. A worker must not expect it for generic ones, must not expect intersection typing in a family that has another generic declaration, and must not expect intersection-typed values to compile and run on the compiled path. The narrower scope is a default, not a curator's decision, so do not build on it as settled. A checker result on an overload set may change with compile order, so a single compile does not prove a verdict.

**Evidence:** `compiler_tests/*Comprises*` and `*CoverageReturn*`. Detail in `compile-ladder/rung-return-type-rule/decision-record.md`, sections 3 and 4.

**Could not resolve:**
- "closed traits": not defined in the skill. I read it as a trait with a `comprises` clause, from SKILL.md's line on `comprises`. Unclear wording, not a missing concept.
- "lies below closed traits and above the types that they list": below all of them or any? Above every listed type, or some? Unclear wording. Without the specification's example I cannot tell exactly which argument types are meant.
- "its most specific declarations": the declarations that apply to the static type and tie (the two overloads), or the covering declarations below them? I read it as the applicable ones that tie. This is two readings.
- "when they tie without coercion": either "when they tie and no coercion is involved in the call", or "when they tie as long as coercion is left out of the comparison". Two readings.
- "any other generic declaration": other than which declarations? The tied ones, or the ones being covered? Unclear wording.
- "follows declaration order and can vary between runs": if the sort follows declaration order, it is unclear what varies between runs. The wording seems to contradict itself.
- "That narrower scope than P-60's": unclear which limit it means. It could be the refusal of generic declarations (row 546), the head-of-sort typing (row 543), the "without coercion" condition, or all of them. So I cannot tell which part review-queue item 58 covers.
- "a type in another component below a generic subtrait": is the hole only for generic subtraits, or for any subtrait that is not a direct subtype? Unclear wording.
- `*CoverageReturn*`: the folder is not given (probably `compiler_tests/`). The Detail path is relative, probably to `explorations/`. Minor.

## F-79

**Established:** The interpreter's library declares `IntLiteral` the way the compiler's prelude does. `IntLiteral` is the type that the compiled checker gives an integer numeral. It is a sibling of the number types under `Number`, and every integer type, `QQ`, `RR64` and `AnyIntegral` coerce from it. `IntLiteral` declares as its own members those members of `Integral[\I\]` that a numeral could not otherwise reach: the getters `zero` and `one`, and `odd`, `even`, `floor` and `DIVIDES`, among others. There are three reasons. For some, no `Integral` declaration applies to a sibling type even with coercion. For others, the declarations that apply by coercion tie. And a getter has to be the type's own member. Each integer type declares its own comparisons, `CMP`, `MAXNUM`, `MINNUM`, and a `^` with an `IntLiteral` exponent. Without them, an operation between a value of an integer type and a numeral would tie between the declaration inherited from a generic trait and that operator's own declarations in `ZZ64`, `QQ` and `RR64`. This is the library half of P-76.

**Conditions:** Under walk, a numeral is still `ZZ32`, `ZZ64` or `ZZ`, so walk reaches none of the `IntLiteral` declarations until walk's half of P-76 is built (F-74). The compiled checker refuses `(3).minimum` and `(3).maximum`, which are `ZZ32`'s getters (row 581).

**Consequence:** A worker who adds a member to `Integral` or to the number types should expect a numeral to reach it only through `IntLiteral`. The member may need its own declaration in `IntLiteral`, and the integer types may need their own copies to avoid ties. Under walk, nothing yet exercises the `IntLiteral` declarations. Do not use `ZZ32`-only getters on a numeral where the compiled checker runs.

**Evidence:** `tests/IntegerOrderNumerals.fss`, run under walk. It checks each integer type's own comparisons, `MAXNUM` and `MINNUM`. Detail in `compile-ladder/rung-numeral-library/REPORT.md`, sections 4 and 6.

**Could not resolve:**
- "its own comparisons, `CMP`, `MAXNUM` and `MINNUM`": is this a list of what the comparisons are, or comparisons (`<`, `<=`, ...) plus three more? The gating test's list ("comparisons, `MAXNUM` and `MINNUM`") leaves out `CMP` and `^`, so I cannot tell whether those two are gated. Unclear wording.
- The entry does not say what checks the `IntLiteral` members themselves, since the walk test cannot reach them. Presumably the count stage, but that is not stated.
- Whether row 581 is an open defect or accepted behaviour is not stated. "refuses" alone does not say. Unclear wording.

## F-80

**Established:** The compiled checker applies the Meet Rule for Functional Methods to any two functional methods of the same name, abstract ones included, in every type that provides both. Such a type must provide a declaration on their meet, where the parameters are compared without the `self` parameter. If an abstract functional method and a concrete one in the same trait have the same parameter types, the No Duplicates Rule refuses them. The checker checks operators named in capitals, such as `CAP`, and eight operators named by words, `juxtaposition` among them. Its overloading memo is keyed on every input of the check, so a pair accepted at top level is still checked again in each trait that provides it.

**Conditions:** Not checked: a pair that only an object expression provides (row 570), and every operator whose name is a symbol, such as `+`, `<`, `||` or a subscript (row 584). F-245 measures what this skip hides. F-88 defines what a type provides.

**Consequence:** When a worker adds a functional method next to another of the same name, the type must declare the meet, unless the name is a symbol. Symbol-named operators can break the rule without the compiled checker reporting it, so their soundness is not established by a clean count.

**Evidence:** `compiler_tests/FunctionalMethodMeet*`. Two refusals the specification asks for are gated as expected failures: `XXXFunctionalMethodMeetAbstractSibling` and `XXXNoDuplicatesRuleAbstract`. Detail in `compile-ladder/rung-overloading-checker/REPORT.md`, sections 5 and 7, and `compile-ladder/rung-checker-abstract-callsite/REPORT.md`, section 1.

**Could not resolve:**
- "compared without the `self` parameter": does the comparison drop the `self` position entirely, or compare the remaining parameters only when `self` is at the same position? F-81 says that two functional methods with `self` at different positions have no meet, so the plain reading ("drop `self`") seems incomplete. Unclear wording.
- "operators named by capitals" against "eight named by words": the line between the two is unclear, since `CAP` is also a word. The eight are not listed, so a worker cannot tell whether a given word-named operator is checked. Unclear wording, and an incomplete list.
- "provides": defined only by F-88, which I could not read. I read it as "declares or inherits". A missing pointer, not a gap in the skill.
- The two `XXX` names have no folder or extension. I read them as `compiler_tests/` compile tests that must fail. Minor.

## F-81

**Established:** In the interpreter's library, each Meet Rule pair that the compiled checker checks inside one type has a declaration on its meet. `String`'s juxtaposition is declared as three top-level operators, because two functional methods with `self` at different positions have no meet. The rung that added these meets also changed the declared types listed in its report section 1 to match what their bodies return.

**Conditions:** The checker skips symbol-named operators (row 584), and some of those pairs have no meet. `String`'s `||`, `|||`, `//` and `///` still have the shape that the specification refuses, `(a:Any, self)` beside `(self, b:Any)`, which goes unseen while the skip lasts (row 585). F-245 found other pairs without a meet, among them `Indexed`'s three subscripts in 17 types. Elsewhere in the library, some declared types still differ from what their bodies return, such as `__bigOperator2`'s fused branch (F-85).

**Consequence:** A clean checker run does not show that symbol-named operator pairs follow the rule. When the skip is removed, `String`'s four concatenation operators and the subscripts will be refused and need repair. For a new juxtaposition-like pair with `self` at different positions, follow `String`'s way and declare top-level operators.

**Evidence:** `tests/LibraryMeetDeclarations.fss`. Detail in `compile-ladder/rung-library-meets/REPORT.md`, section 1.

**Could not resolve:**
- "every Meet Rule pair inside one type that the compiled checker checks": does "that the compiled checker checks" attach to the pair or to the type? I read it as the pair. Two readings, though the second sentence supports the first.
- "these meets" in "The rung that added these meets": the rung is not named except through the Detail path. Minor.

## F-82

**Established:** In the interpreter's library, the range types declare a method on the meet for each Meet Rule pair of theirs that the compiled checker checks, and their declared types match what their bodies return. The meets include `CAP` at each rank, where rank is a range's number of dimensions (F-89 holds the kinds of the ranks), and an abstract `IN` in `FullRange`. Because of the abstract `IN`, a numeral `IN` a `#` or `:` range type-checks (row 580, fixed).

**Conditions:** The pairs of `Indexed`'s three subscripts are skipped, being symbol-named (row 584), and have no meet in the ranges (F-245). Open library bug (row 603): `map` on the full sequential ranges returns a `SimpleMappedSeqIndexed`, which is not a `MappedGenerator`, so its `reverse` is `Indexed`'s. The elements and their order are right, but the string form is wrong. `seq(0:6:2).map(fn x => x + 1).reverse.asString` prints `SimpleReversedIndexed(mapped(seq(1,3,5,7)))` instead of `mapped(7,5,3,1)`.

**Consequence:** A worker can rely on the range meets and declared types. Code must not depend on the string form of a reversed mapped sequential range. A fix of row 603 changes the string that `tests/RangeDeclarations.fss` pins, so that test must be updated with the fix.

**Evidence:** `tests/RangeDeclarations.fss` gates the meets and pins the wrong string. Detail in `compile-ladder/rung-range-meets/REPORT.md`, section 1.

**Could not resolve:**
- "the full sequential ranges": not a term in the skill. From the example I read it as ranges with both ends given, wrapped in `seq(...)`, but which range types are meant is not stated. A language or library concept I lack.
- "`CAP` at each rank": does this mean `CAP` between two ranges of the same rank, for each rank? I read it that way. Somewhat unclear.

## F-83

**Established:** `String.fss` and `FlatString.fss` contain no site of the distance (the compiled checker's errors in the interpreter's library, F-53). The rung's repairs of their refused declarations use forms the library already uses. The trait `String` is declared in `FortressLibrary`, not in `String.fss`. `String.fss` holds string objects and traits such as `CatString` and `SubString`. `String` appears, along with other declarations, in `FortressLibrary`'s export error for declarations that differ from the api's: its `extends` clause differs, and the component lacks members that the api lists. That site belongs to `FortressLibrary` and will clear with that export error (`reviews/array-sites-ways.md`, section 4). `FlatString`'s api declares the same header as its component, `extends { String, DelegatedIndexed[\Char, ZZ32\] }`, and does not declare `opr ||(a:FlatString, self)` (F-259).

**Conditions:** Open library bugs:
- `FlatString.rangeContains` finds only the first occurrence of the character (row 607).
- An implicit strided subscript `[:b:c]` takes its start from the axis's right end instead of its left (as `l:b:c` would): `"abcdef"[:3:2]` gives `bd`, not `ac` (row 609).

**Consequence:** To clear the `String` site, work on `FortressLibrary`'s export error, not the string components. Do not rely on `rangeContains` when the character occurs more than once, or on `[:b:c]` subscripts. A fix of row 607 must update `tests/StringPieces.fss`. A fix of row 609 should promote `tests/XXXSubscriptImplicitStridedRange.fss`.

**Evidence:** `tests/StringPieces.fss`, which pins row 607's two wrong `false` answers. `tests/XXXSubscriptImplicitStridedRange.fss` is an expected failure holding the specification's answer for row 609. Detail in `compile-ladder/rung-string-slips/REPORT.md`, sections 4 and 8.

**Could not resolve:**
- "the rung's repairs": the title names no rung. It is identifiable only from the Detail path. Unclear wording.
- "the component lacks members that the api lists": the `FortressLibrary` component as a whole, or its declaration of `String`? I read it as `String`'s declaration in the component. Two readings.
- Why the entry states `FlatString`'s api header and the missing `opr ||` is not said. Is it a repair the rung made, or a constraint a worker must keep? It needs F-259, which I could not read. Unclear purpose.
- "finds only the first occurrence of the character": what `rangeContains` should answer, and when the first-occurrence behaviour gives a wrong `false`, are not stated. I inferred it: an occurrence before the range hides one inside it. Unclear wording.

## F-84

**Established:** In the interpreter's library, the result-only type parameters of `fail`, `builtinPrimitive` and `List`'s comprehension operator `BIG <|[\T\]|>` are unbounded, as the team declared them. A result-only parameter appears only in the result type. By P-48 it gets the intersection of its upper bounds, narrowed by the expected type, so where `()` is expected it is instantiated as `()`. The same rung repaired 25 of the compiled checker's 60 one-off error sites in numbers, orderings, `List` and natives. Each repair is a declared type, a body or an api header, in forms the library already uses. It also made `MatchFailure` an unchecked exception, extending `UncheckedException` (row 590). Each site it did not repair has a gap-ledger row (report section 5).

**Conditions:** Under walk, the name `IntLiteral` also denotes a value, a zero that no numeral reaches, and arithmetic on it returns a `ZZ32` although `IntLiteral` is declared (row 578). F-263 holds the types of the integer powers, and F-255 `List`'s ordering.

**Consequence:** Do not add bounds to these result-only parameters. Rely on expected-type narrowing instead. A caller of `fail` or of code that throws `MatchFailure` need not declare it as a checked exception. The 35 remaining one-off sites are tracked in the ledger, not here.

**Evidence:** `tests/NumberOrderListDeclarations.fss`, run under walk. Detail in `compile-ladder/rung-number-order-slips/REPORT.md`, sections 1, 4 and 5.

**Could not resolve:**
- "the same rung": no rung is named earlier in the entry, so "same" has nothing to refer to. Unclear wording.
- "one-off error sites": not defined in the skill. It could mean sites that occur once and share no cause with others, or sites repaired one at a time. Unclear wording.
- The "Limit" sentence on `IntLiteral`: I cannot tell what it limits in this fact, or what the value is. Is there a declared object or constant named `IntLiteral` beside the type? "a zero that no numeral reaches" can be read as "its value is zero" or "it is the zero of `IntLiteral`". "its declared `IntLiteral`" can be read as the declared return type of its arithmetic or the value's declared type. F-79 calls `IntLiteral` a type, so this reads as a contradiction unless both exist. Unclear wording, and maybe a library construct I lack.
- "in numbers, orderings, `List` and natives": whether these are library components or kinds of declaration is not said. Minor.

## F-85

**Established:** In the interpreter's library, the rung repaired the generator, condition, reduction and nested-generator declarations that the compiled checker refused, using forms the library already uses. Each method body of `Condition` that calls `cond` writes the call's result type as its static argument, such as `cond[\Maybe[\G\]\]`. One site of those declarations is still on the distance: `__bigOperator2`'s fused branch, the `typecase` branch that runs a nested big operator through `generate2`. It returns an `I0` where an `O0` is declared (row 632; F-53 lists the distance's sites).

**Conditions:** The other sites the rung left were cleared by other work: the identity functions' `cast` and the typed `embiggen` (F-250), how library code reads a generator's size and index (F-93, row 629), and how the reductions without an identity are typed at their element type (F-144, row 628).

**Consequence:** When writing a `Condition` method that calls `cond`, give the static argument explicitly. The fused branch of `__bigOperator2` remains a distance site to fix. Per `library.md`, no desugaring calls `__bigOperator2`, so the branch probably does not affect running programs, though the entry does not say so.

**Evidence:** `tests/GeneratorDeclarations.fss`. Detail in `compile-ladder/rung-generator-slips/REPORT.md`, sections 5 and 8.

**Could not resolve:**
- "the rung's repairs": as in F-83, the title names no rung. Unclear wording.
- "The sites that the rung left were cleared by other work" against "One site ... is still on the distance": either the fused branch is not among the sites the rung left, which contradicts the plain reading, or "the sites" means "the other sites". Unclear wording. I took the second reading.
- "fused branch": the meaning comes only from the appositive ("the `typecase` branch that runs a nested big operator through `generate2`"). That is enough, but "fused" is not a term in the skill. Minor.

## F-86

**Established:** The compiled checker gives a varargs parameter the type `ImmutableArray[\T, ZZ32\]`, as the team did. It applies a varargs declaration by the specification's expansion rule, which treats the declaration as one declaration for each number of arguments it can take (`Specification/basic/overloading.tex`, "Applicability for Functionals with Varargs and Keyword Parameters"). Over the interpreter's library, a body uses the parameter as that array.

**Conditions:** The compiler's prelude declares no `ImmutableArray`, so under it each use of a varargs parameter is refused (row 604). The code generator refuses varargs entirely (row 624).

**Consequence:** Varargs type-check only against the interpreter's library, and do not compile to bytecode yet. A compiled test that uses varargs must be an expected failure until rows 604 and 624 are fixed, and a worker must not write varargs in compiled code before the switch-over.

**Evidence:** `compiler_tests/Varargs*`. The refusals are gated by the `XXXVarargs*` tests of rows 604 and 624. Detail in `compile-ladder/rung-checker-defects/REPORT.md`, section 4.

**Could not resolve:**
- "the compiled library": I read it as the compiler's prelude (`compiler.md`). The skill does not use this exact term. Minor.
- How `compiler_tests/Varargs*` pass, given that the code generator refuses varargs and that under the prelude each use is refused, is not said. They are presumably type-check-only tests of calls. Unclear, but not blocking.

## F-87

**Established:** Besides the contexts it already had, such as the right-hand side of a typed declaration, the compiled checker now passes an expected type to a call in these positions:
- a clause of an `if` without `else` (expected type `()`);
- a block's last expression after local declarations;
- a `typecase` clause;
- a juxtaposition;
- an operator repeated between three or more operands;
- a `label` body, and each value that an `exit` gives the `label`;
- another call's argument, by retrying the enclosing call against each declaration's parameter type.

In a juxtaposition or a repeated operator, the whole expression's expected type goes to the application it becomes. The `label` contexts are the build of P-50. The retry at an argument is P-51's decision (F-221). F-226 says how the checker renames an inherited method's static parameters at a call. F-70 says where it checks a written static argument against its bound.

**Conditions:** The inference chapter lists every context (`Specification/basic/inference.tex`, "The Static Arguments of a Call", "The expected type"). The code generator has no `label`, so the `label` contexts are checked only by type-checking.

**Consequence:** A worker can omit static arguments on result-only calls in these positions and rely on the expected type. A `label` program still cannot be compiled to bytecode.

**Evidence:** `compiler_tests/InferResultOnly*`, among them the type-check-only test `InferResultOnlyLabelBody`, and `Infer*Context`. Detail in `compile-ladder/rung-checker-contexts/REPORT.md`, section 1.

**Could not resolve:**
- "the contexts that it already had": describes a change over time rather than the present. The full list of the old contexts is not given. Unclear wording.
- Whether the checker now covers every context in the inference chapter, or some remain unbuilt, is not stated. "The inference chapter lists every context" can be read as a pointer for reference or as a claim of completeness. Two readings.
- "the application that it makes": for a chain such as `a + b + c`, does only the outermost application get the expected type, or each one? Unclear wording.
- "expected type": not defined in the skill, but the specification section is named and the meaning is standard. Not blocking.
