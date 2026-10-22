<!-- The FACTS clarity pass, chunk f6, 2026-10-22: F-76 and F-79 to F-87 rewritten from the chunk's assessment, so that a reader without the batches behind them can tell what is established, under which conditions and on what evidence, with each entry's changes of meaning, the source of each sentence, and the points left for the coordinator. -->

# FACTS chunk f6: the rewrite

The base is `main` at `5ca623461`; the assessment read at `a898e1baf`. The assessment keeps F-77 and F-78, so this file holds the other ten: seven to reword, and F-84, F-85 and F-86 to reorganize. A section number is that of the report named. Concepts that the entries use and that every worker needs are in `concepts.md`. `clean.txt` holds the clean entries alone, and `proposals.apply` the lines for `record.py apply`.

The ten entries hold 6,739 characters in the record and about 9,700 here. The growth is the four open items of F-76 spelled out, the limits that F-80 to F-82 and F-84 lacked, and words that say what each pointer holds. In F-84, F-85 and F-86 the moved claims make room for that. I could not run `record.py`: this session needs approval for it. So `record.py apply` and `record.py check` on a scratch copy are still to run.

One wording change runs through the chunk: "the one library" becomes "the interpreter's library", as in chunk f0.

## F-76

> - F-76 **The compiled checker accepts the specification's `comprises` example of the Meet Rule by a coverage check used only in overload checking, and types a call whose argument's static type stands between closed traits and their listed types by the intersection of its candidates' return types.** It builds P-60, which reads `comprises` at the level of values: several declarations below two overloads serve as their meet if together they cover it. Open: a family whose declarations have static parameters is refused (row 546), or its call is typed by one candidate chosen by a sort, not by the intersection (row 543, deliberate). On the compiled path, a method call on a value typed by the intersection crashes the code generator (row 540), and a generic declaration instantiated at an intersection type dies as it loads (row 559). The checker checks a `comprises` clause only at the closed trait's immediate subtypes, so a type in another component below a generic subtrait escapes it (row 487). Its verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Gated by `compiler_tests/*Comprises*` and `*CoverageReturn*`. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 3 and 4.

Meaning: unchanged. "Between two closed traits" becomes P-60's "between closed traits and their listed types", with "static type" restored, as the assessment asks.

Sources: title, the decision record, sections 3 and 4, and P-60's wording; coverage, P-60; each open item, its gap-ledger row (546, 543, 540, 559, 487, 547); the tests, the assessment's check that they exist.

Not added: the decision record's section 4 types the tie by the intersection only for candidates that fit without coercion. The assessment calls the case narrow, and P-60 states the bound. A worker who needs it follows P-60.

## F-79

> - F-79 **In the interpreter's library, `IntLiteral`, the type that the compiled checker gives an integer numeral, is declared on the model of the compiler's prelude: a sibling of the number types under `Number`, which each integer type, `QQ`, `RR64` and `AnyIntegral` convert from by coercion.** It builds the library half of P-76. Under walk a numeral is still a `ZZ32`, `ZZ64` or `ZZ`, so no numeral reaches these declarations until walk's half is built (F-74). `IntLiteral` declares `Integral[\I\]`'s members, `zero` and `one` itself, since no declaration of `Integral` applies to it, even with coercion. Each integer type declares its own comparisons, `CMP`, `MAXNUM` and `MINNUM`, and a `^` with an `IntLiteral` exponent. Without them, a typed integer with a numeral operand ties between a declaration inherited from a generic trait and the other number types' own. `ZZ32`'s getters `minimum` and `maximum` do not reach a numeral: `(3).minimum` is refused (row 581). Gated by `tests/IntegerOrderNumerals.fss`. Detail: `compile-ladder/rung-numeral-library/REPORT.md` sections 4 and 6.

Meaning: one correction, as the assessment asks. The old text called `IntLiteral` "the compiler library's", which reads as a type taken from the compiler's prelude. The interpreter's library declares its own, on the prelude's model (P-76; `FortressBuiltin.fsi:179`, `object IntLiteral extends { Number }`). The path is now stated: the compiled checker types the numeral so, and walk does not (P-76, F-74).

Sources: the conversions, `coerce(x: IntLiteral)` in `FortressLibrary.fsi` at `:302`, `:404`, `:443`, `:490`, `:536`, `:594`, `:653`; walk's numeral types, P-76; `IntLiteral`'s own members, the report's section 6 and its judge's reading of `conversions-coercions.tex`; the comparisons and the `^` and why they tie, sections 5 and 6 (`^(self, b:IntLiteral)` at `FortressLibrary.fsi:526`, `:579`, `:637`, `:675`); row 581, the gap ledger, which names `ZZ32`'s getters.

The old sentence "states its comparisons, `CMP`, `MAXNUM`, `MINNUM` and `^` with an `IntLiteral`" could be read as all of them taking an `IntLiteral`. Only `^` does (`FortressLibrary.fsi`); the others are declared at the type's own type, and an `IntLiteral` operand reaches them by coercion (report section 6). The clean text says so.

## F-80

> - F-80 **The compiled checker judges two functional methods of one name, abstract declarations included, by the Meet Rule for Functional Methods in each type that provides both, unless their name is a symbol.** Such a type must provide their meet, compared without the `self` parameter. F-88 says what a type provides. An abstract functional method beside a concrete one with the same parameter type is refused by the No Duplicates Rule. Unchecked: a pair that only an object expression provides (row 570), and every operator whose name is not a word of capitals, such as `+` or `||`, since the checker skips them (row 584; F-245 measures what the skip hides). The checker's overloading memo is keyed on all the inputs of the check, so a pair accepted at the top level is not reused unchecked in a trait that provides it. Gated by `compiler_tests/FunctionalMethodMeet*`, `XXXFunctionalMethodMeetAbstractSibling` and `XXXNoDuplicatesRuleAbstract`. Detail: `compile-ladder/rung-overloading-checker/REPORT.md` sections 5 and 7; `compile-ladder/rung-checker-abstract-callsite/REPORT.md` section 1.

Meaning: narrower, as the assessment asks. The title and the "Unchecked:" list now name the operators that the checker skips. The memo's consequence is said.

Sources: the skip, row 584's text ("never checks an overloaded operator whose name is not a word of capitals") and the code (`OverloadingChecker.scala:742-746`, `isDeclaredName`; `NodeUtil.validOp` refuses a name of one character, a doubled character such as `||`, `SUM` and `PROD`); the abstract rung left operators as row 584 leaves them (`rung-checker-abstract-callsite/REPORT.md` section 1); the memo, `rung-overloading-checker/REPORT.md` section 7: the memo had answered "valid" for a pair whatever arrows, declarations and kind environment it was checked under, so a pair that the top level accepted was reused in every trait that provides it. I did not write that a verdict no longer depends on order: row 547, open, says that it can depend on the components compiled before it.

## F-81

> - F-81 **In the interpreter's library, each Meet Rule pair inside one type that the compiled checker reads has a declaration on its meet; pairs of operators whose names are symbols, which the checker skips (row 584), are not all met.** `String`'s juxtaposition is three top-level operators, since two functional methods with `self` at different positions have no meet. `String`'s `||`, `|||`, `//` and `///` keep that refused shape (row 585). F-245 gives the other unmet pairs that the skip hides, among them `Indexed`'s three subscripts in 17 types. The same work set some declared types to what their bodies answer, listed in report section 1. Others still differ, such as `__bigOperator2`'s fused branch (F-85). Gated by `tests/LibraryMeetDeclarations.fss`. Detail: `compile-ladder/rung-library-meets/REPORT.md` section 1.

Meaning: narrower, as the assessment asks. The meets hold for the pairs that the checker reads. The declared-type clause is limited to the rung's own list of slips.

Sources: the meets and `String`'s juxtaposition, `rung-library-meets/REPORT.md` section 1 (`Specification/advanced/overloading.tex:517-523`); row 585; F-245 and `perf-probes/symbolic-operators/REPORT.md` section 1.2 for the other pairs; the subscripts still declared so, `FortressLibrary.fsi:1297`, `:1309-1310`, as the assessment read; the fused branch, row 632 and F-85.

## F-82

> - F-82 **In the interpreter's library, the range types declare a method on the meet for each of their Meet Rule pairs that the compiled checker reads, and their declared types match what their bodies answer.** Among the meets are `CAP` at each rank (F-89 holds the ranks' kinds) and `FullRange`'s abstract `IN`, so a numeral `IN` a `#` or `:` range type-checks (row 580). The pairs of `Indexed`'s three subscripts, which the checker skips as operators whose names are symbols (row 584), have no meet in the ranges (F-245). Open library bug: the full sequential ranges' `map` answers a `SimpleMappedSeqIndexed`, which is no `MappedGenerator`, so its `reverse` is `Indexed`'s, and `seq(0:6:2).map(fn x => x + 1).reverse.asString` prints `SimpleReversedIndexed(mapped(seq(1,3,5,7)))`, not `mapped(7,5,3,1)` (row 603). Gated by `tests/RangeDeclarations.fss`. Detail: `compile-ladder/rung-range-meets/REPORT.md` section 1.

Meaning: narrower, as the assessment asks: the meets hold for the pairs that the checker reads. Row 603 is now called an open library bug, with the value it prints, as the row says.

Sources: the meets, `rung-range-meets/REPORT.md` section 1; row 580 (fixed) and its test; the subscripts, F-245 and its report's section 1.2; row 603's text.

Kept as written: "their declared types match what their bodies answer". The assessment found no fault in it for the range types, and I found no source that narrows it.

## F-83

> - F-83 **In the interpreter's library, the string components `String.fss` and `FlatString.fss` hold no site of the distance, the compiled checker's errors in that library (F-53); their declarations that the checker refused are repaired in forms that the library already uses.** The trait `String` is declared in the `FortressLibrary` api, and has an entry in that component's export error for traits whose declaration differs from the api's: its `extends` clause differs, and the component lacks members that the api lists. That site is `FortressLibrary`'s, and it clears with that export error (`reviews/array-sites-ways.md`, section 4). `FlatString`'s api states its component's header (F-259). Open library bugs: `FlatString.rangeContains` finds only the first occurrence of the character (row 607), and a subscript `:b:c` is completed from the axis's right end, not as `l:b:c` (row 609). Gated by `tests/StringPieces.fss`, which pins row 607's two answers. Detail: `compile-ladder/rung-string-slips/REPORT.md` sections 4 and 8.

Meaning: unchanged. The export error is named by its component and by what it compares, in place of "the api's second export error". The title names the two files, so a reader can reconcile it with `String`'s entry in that error.

Sources: no site in the two files, `compile-ladder/gate/distance-sites.tsv`, as the assessment read; the export error and `String`'s entries in it, `reviews/array-sites-ways.md` section 4 (its sites at `FortressLibrary.fss:12`; `String` under the different `extends` clauses and the missing members); rows 607 and 609; the test pins row 607 (assessment).

"Repaired in forms that the library already uses" is my plain wording of "in the library's own spelling" (see `concepts.md`, "A slip").

## F-84

> - F-84 **In the interpreter's library, the result-only type parameters of `fail`, `builtinPrimitive` and `List`'s empty comprehension are unbounded, as the team declared them, and 25 declarations of numbers, orderings, `List` and natives that the compiled checker refused are corrected to the types that their bodies answer.** A result-only parameter occurs only in the result type. P-48 gives it the intersection of its upper bounds, narrowed by the expected type, so where `()` is expected its instance is `()`. `MatchFailure` extends `UncheckedException`. The refused declarations that the work left have gap-ledger rows (report section 5). Limit: under walk, `IntLiteral`'s own arithmetic answers a `ZZ32` against its declared `IntLiteral` (row 578). F-263 holds the integer powers' types, and F-255 `List`'s ordering. Gated under walk by `tests/NumberOrderListDeclarations.fss`. Detail: `compile-ladder/rung-number-order-slips/REPORT.md` sections 1 and 5.

Meaning: narrower, as the assessment asks. The title held "numbers, orderings, `List` and natives answer their declared types" for the whole library. It now holds the rung's 25 repairs, and names row 578 as a number that does not answer its declared type under walk. The powers' and `LexicographicOrder`'s claims move to the entries that own them, F-263 and F-255, as bare pointers. F-84 stays the home of the unbounded result-only parameters, which F-70 and P-48 point to.

Sources: the parameters, `rung-number-order-slips/REPORT.md` section 1 (`FortressLibrary.fsi:37`, `FortressBuiltin.fsi:30`, `List.fsi:110`); the instance at `()`, P-48; `MatchFailure`, section 1 and `FortressLibrary.fsi:1166`; the 25 repairs and the sites left, sections 1 and 5; row 578 and F-263; the test's walk scope, its header (assessment).

The rung's "35 sites left" is a count of its day; it goes to the note line. The clean text says only that the sites left have rows.

## F-85

> - F-85 **In the interpreter's library, the generator, condition, reduction and nested-generator declarations that the compiled checker refused are repaired in forms that the library already uses, and one of their sites is still on the distance: `__bigOperator2`'s fused branch.** That branch, the `typecase` branch that runs a nested big operator through `generate2`, answers an `I0` where `O0` is declared (row 632; F-53 lists the distance's sites). Each default of `Condition` that calls `cond` writes the call's result type as its static argument, such as `cond[\Maybe[\G\]\]`. F-250 holds the identity functions' `cast` and the typed `embiggen`. F-93 holds how library code reads a generator's size and index (row 629), and F-144 how the reductions without an identity are typed at their element type (row 628). Gated by `tests/GeneratorDeclarations.fss`. Detail: `compile-ladder/rung-generator-slips/REPORT.md` sections 5 and 8.

Meaning: unchanged for what the entry owns. The `cast` and `embiggen` sentence, with "now", "clears its two sites" and "row 631 closed", leaves for F-250, which holds the identities' `cast`, the typed `embiggen` and the `CastError` of an empty `SUM` over a user group. "The reductions' `Any` devices" becomes what F-144 holds.

Sources: the fused branch, `rung-generator-slips/REPORT.md` section 5 (`__bigOperator2`, the arm that calls `generate2`) and row 632; still on the distance, F-53 and `distance-sites.tsv` (`FortressLibrary.fss:1465`, per the assessment); `cond`, section 5; F-93, F-144 and rows 628 and 629 by their titles and texts.

## F-86

> - F-86 **The compiled checker types a varargs parameter as the team's `ImmutableArray[\T, ZZ32\]`, and applies a varargs declaration by the specification's expansion rule.** The rule reads such a declaration as one declaration for each number of arguments that it can take (`Specification/basic/overloading.tex`, "Applicability for Functionals with Varargs and Keyword Parameters"). Over the interpreter's library, a body uses the parameter as that array. The compiled library declares no `ImmutableArray`, so under it each use of such a parameter is refused (row 604). The code generator refuses varargs (row 624). Gated by `compiler_tests/Varargs*`, and the refusals by the `XXXVarargs*` tests of rows 604 and 624. Detail: `compile-ladder/rung-checker-defects/REPORT.md` section 4.

Meaning: the two claims unrelated to varargs leave the entry, as the assessment allows. They are rows 605 and 597's checker half, both fixed by `aa07efb31`. They go to the note line. No other entry holds them, so see "For the coordinator".

Sources: the expansion rule, `Specification/basic/overloading.tex:246-262` and the report's section 4; the body over the interpreter's library, the report's section 4 as the assessment read it; rows 604 and 624; the tests, `ls compiler_tests/`.

## F-87

> - F-87 **The compiled checker gives a call its expected type in a clause of an `if` without `else`, a block's last expression after local declarations, a `typecase` clause, a juxtaposition, an operator repeated between three or more operands, a `label` body and each value that an `exit` gives the `label`, and, by a retry of the enclosing call, another call's argument.** The `label` contexts build P-50. At another call's argument, it retries the enclosing call against each declaration's parameter type, as P-51 decides (F-221). F-226 gives how it renames an inherited method's static parameters at a call, and F-70 where it checks a written static argument against its bound. Gated by `compiler_tests/InferResultOnly*`, among them `InferResultOnlyLabelBody` for the body and an exit's value, and `Infer*Context`. Detail: `compile-ladder/rung-checker-contexts/REPORT.md` section 1.

Meaning: one restoration, as the assessment asks: the values that a `label`'s exits give, which the text of 2026-10-13 named and P-50 decides.

Sources: the exits, `scala_src/typechecker/impls/Misc.scala:725-745` (the `with` value checked against `labelExitTypes`' expected type) and `compiler_tests/InferResultOnlyLabelBody.fss` (`leaveEarly` exits with `stop(s)`); "repeated operator", the assessment's reading of the older text; the rest unchanged.

## For the coordinator

- F-86's moved claims are held by no other entry: the checker lets an object's fields shadow its inherited getters (row 605, fixed), and the checker reads an object expression against a `comprises` clause (row 597's checker half, fixed). Ways: leave them to the history and the ledger, as the note line does; add the second as one sentence to an entry that owns the checker's `comprises` reading (F-76 is the nearest); or give each a new entry.
- F-74 calls walk's numeral an `Int`; P-76 and F-79 now say `ZZ32`, `ZZ64` or `ZZ`. Both are right; `concepts.md` asks the definition to give both names once. F-74 is outside this chunk.
- F-57 cites F-79 for "The checker types a numeral `IntLiteral` or `FloatLiteral` by its form". F-79 now says so for the interpreter's library; the pointer still holds.
- Run `record.py apply` of `proposals.apply` on a scratch copy, then `record.py check`; this session could not.

No question for the curator.
