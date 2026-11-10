<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that b5b0f82c1..f629cd2dd added, changed or removed (the batch 29b, landed at a2be3e9e1, and the landing's own steps to f629cd2dd), written by evidence.py. -->

# The entries that the range changed

- The batch, b5b0f82c1..a2be3e9e1: 18 entries: F-53, F-57, F-79, F-112, F-118, F-168, F-169, F-173, F-175, F-240, F-262, F-272, F-340, F-341, F-342, F-345, F-346, F-347
- After the landing, a2be3e9e1..f629cd2dd: 0 entries
- Now over 600 characters: 18 of 18: F-53, F-57, F-79, F-112, F-118, F-168, F-169, F-173, F-175, F-240, F-262, F-272, F-340, F-341, F-342, F-345, F-346, F-347

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-53, changed

- Size: at the base 1489 characters; at the landing 1490 characters; now 1490 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 29's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). Row 731's checker gap, which the library's text avoids, stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 29b's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). Row 731's checker gap, which the library's text avoids, stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-10 00:38Z · rewritten · by climb batch 29b commit stage: the last landed gate's figures from compile-ladder/climb-batch-29b/gate/distance.txt (its #total 0 and its first line's 14 components) and checker-count.txt (its #total 0); the batch in the title is now 29b

Report sections that the entry cites: [S1] `references/batch.md`, "The checker count and the distance".

## F-57, changed

- Size: at the base 1407 characters; at the landing 1495 characters; now 1495 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-57 **A numeral's type depends on the path and on the library in scope, and in generic code only the getters `x.zero` and `x.one` and the witness `typecase` give a `T` on both paths.** The witness `typecase` is a `typecase` over a function of type `() -> T`, with one clause for each number type (P-78). The checker types a numeral by its form, `IntLiteral` or `FloatLiteral` under the compiler's prelude and `NaturalNumeral` or `RadixPointNumeral` under the one library (F-79), and converts it into its default where nothing fixes a type (F-342). Where nothing fixes a type, walk gives an integer numeral its default by its magnitude, a `ZZ32`, `ZZ64` or `ZZ`, which it prints by those names; where its place fixes a type, walk converts it (F-341). In code generic over `T extends Integral[\T\]`, `x + 1` fails the checker but runs under walk: no coercion from a numeral into an arbitrary such `T` can be declared, since a generic coercion is refused as a cyclic hierarchy. The checker refuses a numeral outside a bounded number type's range, or rounding to an infinity, statically, and walk refuses an integer numeral out of range when it runs, at the place it does not fit (F-342, F-341). Detail: `perf-probes/prelude/distance-triage.md` section 2.3; `reviews/numerics-plan-coordinator/evidence-B.md` sections 3.1, 4.1 and 6.2, measured on an earlier library (F-79); `x.zero` by reading, not measured.

Now:

- F-57 **A numeral's type depends on the path and on the library in scope, and in generic code only the getters `x.zero` and `x.one` and the witness `typecase` give a `T` on both paths.** The witness `typecase` is a `typecase` over a function of type `() -> T`, with one clause for each number type (P-78). The checker types a numeral by its own numeral type, `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[\n, m, r, v\]`, which the compiler's prelude and the one library each declare (`compiler/Types.java`, `useCompilerLibraries` and `useFortressLibraries`; F-79), and converts it into its default where nothing fixes a type (F-342). Where nothing fixes a type, walk gives an integer numeral its default by its magnitude, a `ZZ32`, `ZZ64` or `ZZ`, which it prints by those names; where its place fixes a type, walk converts it (F-341). In code generic over `T extends Integral[\T\]`, `x + 1` fails the checker but runs under walk: no coercion from a numeral into an arbitrary such `T` can be declared, since a generic coercion is refused as a cyclic hierarchy. The checker refuses a numeral outside a bounded number type's range, or rounding to an infinity, statically, and walk refuses an integer numeral out of range when it runs, at the place it does not fit (F-342, F-341). Detail: `perf-probes/prelude/distance-triage.md` section 2.3; `reviews/numerics-plan-coordinator/evidence-B.md` sections 3.1, 4.1 and 6.2, measured on an earlier library (F-79); `x.zero` by reading, not measured.

History blocks of the range:

- Written by the merged-diff review: 2026-11-10 00:31Z · rewritten · from `explorations/compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why" · by climb batch 29b's merged-diff review: made true of climb batch 29b's merged tree at 17e93a7da8, where the static numerals removed what the entry named (cites [S2])

## F-79, changed

- Size: at the base 1340 characters; at the landing 1392 characters; now 1392 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-79 **In the interpreter's library, the numeral types are `NaturalNumeral` and `RadixPointNumeral`, value objects below `trait Numeral`, a sibling of the number types under `Number`, whose fields are the four numbers, and each of the eight number types converts from them with an `=` pair both ways.** It builds P-76's and P-172's conversions in the one library (`Library/FortressLibrary.fsi`, `Numeral`), with the four numbers as fields where P-174 makes them static parameters (row 969): the five integer types and `QQ` convert from `NaturalNumeral` exactly, `QQ` from `RadixPointNumeral` as `digitValue / radix^fractionDigits`, and `RR64` and `RR32` from both by one rounding through `simpleDoubleArith.numeralToDouble` and `numeralToFloat`; `RR64` comprises `Float` alone. The compiled checker's `Types.INT_LITERAL` and `FLOAT_LITERAL` name these two types under the one library and the prelude's `IntLiteral` and `FloatLiteral` under the compiler's (`compiler/Types.java`). Under walk a numeral reaches these declarations where its place fixes a type (F-341). The compiled checker refuses `(3).minimum` and `(3).maximum`, `ZZ32`'s getters (row 581). Tests: `ProjectFortress/tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, and the count stage's 0. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why".

Now:

- F-79 **In the interpreter's library, the numeral types are `NaturalNumeral[\n, r, v\]` and `RadixPointNumeral[\n, m, r, v\]`, traits whose static parameters are the four numbers, below `Numeral`, a sibling of the number types under `Number`, and each number type converts from them by a coercion generic over the four numbers.** It builds P-174's numeral types in the one library (`Library/FortressLibrary.fsi:457-465`): `NaturalNumeral` lies below `AnyNaturalNumeral` and `RadixPointNumeral` below `AnyRadixPointNumeral`, which exclude each other; none declares a method, no value of them exists when a program runs, and no `=` pair ties them to a number type. The five integer types and `QQ` convert from `NaturalNumeral` exactly, `QQ` from `RadixPointNumeral` exactly, and `RR64` and `RR32` from both by one rounding through `simpleDoubleArith.numeralToDouble` and `numeralToFloat`; `RR64` comprises `Float` alone. The compiled checker's `Types.INT_LITERAL` and `FLOAT_LITERAL` name these two types under both libraries (`compiler/Types.java:85-95`), the prelude declaring them too. Under walk a numeral reaches these declarations where its place fixes a type (F-341). Tests: `ProjectFortress/tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralStaticDesignWalk.fss`, and the count stage's 0. Detail: `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 23:29Z · rewritten · from `explorations/compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why" · by climb batch 29b's gather: the field numerals' value objects, fields and = pairs and the prelude's IntLiteral and FloatLiteral are gone with the static numerals (rung A's record, For FACTS) (cites [S2])

Report sections that the entry cites: [S2] `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

## F-112, changed

- Size: at the base 756 characters; at the landing 798 characters; now 798 characters, over 600.
- Section now: "The harness and the gate".

At the base:

- F-112 **The test corpora cite the specification by file and section, never by line.** A test names the heading of the section that it cites. In the library chapters, it names the trait or method entry too. A rung that renames or removes a cited section updates the citation in the same commit. One comment still cites a line, left as it was: `library_tests/IntLiteralArithRung7.fss:19` cites `Specification/library/apis/CompilerBuiltin.tex:374-383`, a generated file that is not in the tree (F-162: such a listing restates the library's own api files, so it cannot justify them). Source: the one-time strip of `.tex` line numbers, commit `dc0eee2fe`. The `fortress-repo` skill gives the rule to workers (`tests-writing.md`, "Names, comments, citations").

Now:

- F-112 **The test corpora cite the specification by file and section, never by line.** A test names the heading of the section that it cites. In the library chapters, it names the trait or method entry too. A rung that renames or removes a cited section updates the citation in the same commit. No test comment names a `.tex` file with a line number: `grep -rnE '\.tex:[0-9]+'` over `ProjectFortress/tests`, `compiler_tests`, `library_tests`, `other_compiler_tests` and `parser_tests` prints nothing; one bare `:400-401` stays after the section that `compiler_tests/IntLiteralWrapRepairR2.fss:12-14` cites, left as it was. Source: the one-time strip of `.tex` line numbers, commit `dc0eee2fe`. The `fortress-repo` skill gives the rule to workers (`tests-writing.md`, "Names, comments, citations").

History blocks of the range:

- Written by the merged-diff review: 2026-11-10 00:31Z · rewritten · from `explorations/compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why" · by climb batch 29b's merged-diff review: made true of climb batch 29b's merged tree at 17e93a7da8, where the static numerals removed what the entry named (cites [S2])

Report sections that the entry cites: [S3] `tests-writing.md`, "Names, comments, citations".

## F-118, changed

- Size: at the base 1455 characters; at the landing 1206 characters; now 1206 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-118 **A numeral's value reaches the compiled code intact, and the compiled path prints a large `NN32` or `NN64` value unsigned, but it cannot compare two `IntLiteral` values beyond `ZZ64`.** The code generator carries a numeral of its own type as an `int`, a `long` or its decimal string, by its exact bit length, and a numeral that the coercion desugarer types at a library number type as that type's constant (F-340). So on the compiled path `4294967295` and `18446744073709551615` keep their values, as walk does at `ZZ` and `ZZ64` (walk converts a numeral bound to `NN32` or `NN64`, F-341). The compiled path prints an `NN32` or `NN64` value above its type's signed half unsigned (F-313; test `compiler_tests/UnsignedPrintingCompiled`). It compares two `IntLiteral` values at `ZZ64`, so `lt(18446744073709551615, 5)` for `lt(a: IntLiteral, b: IntLiteral): Boolean = a < b` fails with `Not in range for ZZ64` (row 328), which no test pins; an untyped binding of such a numeral is a `ZZ`, its default (F-342). An `IntLiteral` arithmetic result of 64 bits or more also keeps its value compiled: observed in the report's probe, and no test gates it. Walk stops the same program at `x + x` with `IntegerOverflow`, since its fixed-width addition raises (F-132). Gated, for the numerals at `ZZ`, `ZZ64`, `NN32` and `NN64`, by `compiler_tests/IntLiteralWrapRepairR2`. Detail: `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

Now:

- F-118 **A numeral's value reaches the compiled code intact, and the compiled path prints a large `NN32` or `NN64` value unsigned.** A numeral that no place types becomes its default by its exact bit length, a `ZZ32`, `ZZ64` or `ZZ` (`compiler/codegen/CodeGen.java`, `forIntLiteralExpr`); a folded constant that the coercion desugarer types at a library number type is that type's constant (F-340); and a numeral as written at a number type is its type's coercion folded to a constant or made once for the place (F-347). So on the compiled path `4294967295` and `18446744073709551615` keep their values, as walk does at `ZZ` and `ZZ64` (walk converts a numeral bound to `NN32` or `NN64`, F-341); an untyped binding of the second is a `ZZ`, its default (F-342), and compares with `5` at `ZZ`. The compiled path prints an `NN32` or `NN64` value above its type's signed half unsigned (F-313; test `compiler_tests/UnsignedPrintingCompiled`). Gated, for the numerals at `ZZ`, `ZZ64`, `NN32` and `NN64`, by `compiler_tests/IntLiteralWrapRepairR2`. Detail: `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question"; `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-10 00:31Z · rewritten · from `explorations/compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why" · by climb batch 29b's merged-diff review: made true of climb batch 29b's merged tree at 17e93a7da8, where the static numerals removed what the entry named (cites [S2])

Report sections that the entry cites: [S4] `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question"; [S2] `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

## F-168, changed

- Size: at the base 973 characters; at the landing 973 characters; now 973 characters, over 600.
- Section now: "The specification and the repository's lineage".

At the base:

- F-168 **The specification's number chapters describe the flat library, and its advanced chapter on rational quantities stays word for word under a callout that marks it superseded.** The eight number types are siblings under `Number` (F-131). They convert by the library's coercions (P-74), and every other conversion is explicit, such as `asFloat(x)`. The sign-refined types, such as positive ℚ, are gone; a program tests a value's sign at run time (P-80). ℚ holds +∞, −∞ and 0/0, and claims neither a field nor a total order. `QQ` extends the four algebraic traits that the library declares on it, `StandardPartialOrder`, `StandardMinMax`, `AdditiveGroup` and `MultiplicativeRing`, and their laws hold for the finite rationals. F-172 gives the integer chapter's rules. Detail: `compile-ladder/rung-spec-numbers/decision-record.md` section 3; `Specification/basic-lib/numbers.tex:243-248` (ℚ's traits); `Specification/advanced-lib/numbers-advanced.tex:14` (the callout).

Now:

- F-168 **The specification's number chapters describe the flat library, and its advanced chapter on rational quantities stays word for word under a callout that marks it superseded.** The eight number types are siblings under `Number` (F-131). They convert by the library's coercions (P-74), and every other conversion is explicit, such as `asFloat(x)`. The sign-refined types, such as positive ℚ, are gone; a program tests a value's sign at run time (P-80). ℚ holds +∞, −∞ and 0/0, and claims neither a field nor a total order. `QQ` extends the four algebraic traits that the library declares on it, `StandardPartialOrder`, `StandardMinMax`, `AdditiveGroup` and `MultiplicativeRing`, and their laws hold for the finite rationals. F-172 gives the integer chapter's rules. Detail: `compile-ladder/rung-spec-numbers/decision-record.md` section 3; `Specification/basic-lib/numbers.tex:245-250` (ℚ's traits); `Specification/advanced-lib/numbers-advanced.tex:14` (the callout).

History blocks of the range:

- Written by the gather: 2026-11-09 23:32Z · rewritten · from `explorations/compile-ladder/rung-static-numerals-spec/REPORT.md`, "What changed and why" · by climb batch 29b's gather: a citation that rung T's edit moves (rung T's record, finding 4) (cites [S5])

## F-169, changed

- Size: at the base 1249 characters; at the landing 1191 characters; now 1191 characters, over 600.
- Section now: "The specification and the repository's lineage".

At the base:

- F-169 **The Working Draft never wrote static-argument inference, never named the type that a library gives an integer numeral, and never named a range's integer type; the specification's text on these is the revival's.** The Working Draft's inference chapter is a heading and notes. It described numeral types, such as `NaturalNumeral[\n,10,v\]`, and said that libraries define coercions from numerals to integers and rationals. But a note of its own leaves the numeral types' hierarchy undescribed, and it names no type that a library declares for a numeral. Its ranges section names no integer type. The later restart adds nothing on the three. So a citation of the specification on them cites the revival, not the team. The revised text states F-173's inference rule and F-170's ranges, and gives an integer numeral the type `IntLiteral`, the implementations' name, where P-76 and P-174 take the Working Draft's `NaturalNumeral`, its four numbers as static parameters. Detail: `reviews/numerics-plan-coordinator/evidence-B.md` sections 1 and 2; `Specification-1.0-frozen/basic/expressions/literals.tex:87-96` and `:132-148` (the note and the coercions); `Specification/basic/expressions/literals.tex:154-156` (the callout on the numeral types).

Now:

- F-169 **The Working Draft never wrote static-argument inference, never named the type that a library gives an integer numeral, and never named a range's integer type; the specification's text on these is the revival's.** The Working Draft's inference chapter is a heading and notes. It described numeral types, such as `NaturalNumeral[\n,10,v\]`, and said that libraries define coercions from numerals to integers and rationals. But a note of its own leaves the numeral types' hierarchy undescribed, and it names no type that a library declares for a numeral. Its ranges section names no integer type. The later restart adds nothing on the three. So a citation of the specification on them cites the revival, not the team. The revised text states F-173's inference rule and F-170's ranges, and gives an integer numeral the Working Draft's `NaturalNumeral[\n, r, v\]`, its four numbers as static arguments (P-174). Detail: `reviews/numerics-plan-coordinator/evidence-B.md` sections 1 and 2; `Specification-1.0-frozen/basic/expressions/literals.tex:87-96` and `:132-148` (the note and the coercions); `Specification/basic/expressions/literals.tex:146-161` (the callout on the numeral types).

History blocks of the range:

- Written by the gather: 2026-11-09 23:32Z · rewritten · from `explorations/compile-ladder/rung-static-numerals-spec/REPORT.md`, "What changed and why" · by climb batch 29b's gather: its last sentence and its citation of the callout, which rung T's edit moves (rung T's record, finding 4) (cites [S5])

## F-173, changed

- Size: at the base 1718 characters; at the landing 1718 characters; now 1718 characters, over 600.
- Section now: "The specification and the repository's lineage".

At the base:

- F-173 **The specification's type-inference chapter states the rule that the compiled checker builds: the declaration is chosen first, then its static arguments are inferred.** It states P-46, P-48 and P-49. A type parameter that a parameter's declared type mentions inside another type, as `List[\T\]` mentions `T`, is fixed by the argument at that position. One that is the whole declared type of one or more parameters, as `T` is of `x: T`, and that nothing else fixes, takes the narrowest type, within its bounds, that every one of those arguments has or converts into: `ZZ64` for a `ZZ32` and an `NN32`. Where there is none, and no numeral settles the tie, it takes its bound, narrowed by what the call's expected type requires of the return type (P-48). So does a type parameter that neither an argument nor the expected type fixes. Inference never gives a type parameter `BottomType`. The compiled path departs from the chapter in these ways, among others. Its prelude lacks the coercion of `NN32` into `ZZ64`, so a `ZZ32` and an `NN32` instantiate a type parameter at `ZZ`, not `ZZ64`; no callout names this (row 442, `compiler_tests/XXXInferPromoteNN32`). The callouts at `Specification/basic/inference.tex:237-299` and `:395-456` also give walk's departures, such as the return type `BottomType` that walk gives a function expression that declares none (row 587). Plain tests gate the rule for a type parameter that is a parameter's whole type, at its bound where no argument type is narrowest, on both paths: `compiler_tests/InferLone*` and `tests/InferLone*Walk.fss`. Detail: `compile-ladder/rung-instance-bound/REPORT.md` (the bound rule); `Specification/basic/inference.tex:45-122` (the chapter's rule).

Now:

- F-173 **The specification's type-inference chapter states the rule that the compiled checker builds: the declaration is chosen first, then its static arguments are inferred.** It states P-46, P-48 and P-49. A type parameter that a parameter's declared type mentions inside another type, as `List[\T\]` mentions `T`, is fixed by the argument at that position. One that is the whole declared type of one or more parameters, as `T` is of `x: T`, and that nothing else fixes, takes the narrowest type, within its bounds, that every one of those arguments has or converts into: `ZZ64` for a `ZZ32` and an `NN32`. Where there is none, and no numeral settles the tie, it takes its bound, narrowed by what the call's expected type requires of the return type (P-48). So does a type parameter that neither an argument nor the expected type fixes. Inference never gives a type parameter `BottomType`. The compiled path departs from the chapter in these ways, among others. Its prelude lacks the coercion of `NN32` into `ZZ64`, so a `ZZ32` and an `NN32` instantiate a type parameter at `ZZ`, not `ZZ64`; no callout names this (row 442, `compiler_tests/XXXInferPromoteNN32`). The callouts at `Specification/basic/inference.tex:237-299` and `:399-460` also give walk's departures, such as the return type `BottomType` that walk gives a function expression that declares none (row 587). Plain tests gate the rule for a type parameter that is a parameter's whole type, at its bound where no argument type is narrowest, on both paths: `compiler_tests/InferLone*` and `tests/InferLone*Walk.fss`. Detail: `compile-ladder/rung-instance-bound/REPORT.md` (the bound rule); `Specification/basic/inference.tex:45-122` (the chapter's rule).

History blocks of the range:

- Written by the gather: 2026-11-09 23:32Z · rewritten · from `explorations/compile-ladder/rung-static-numerals-spec/REPORT.md`, "What changed and why" · by climb batch 29b's gather: a citation that rung T's edit moves (rung T's record, finding 4) (cites [S5])

## F-175, changed

- Size: at the base 1298 characters; at the landing 1298 characters; now 1298 characters, over 600.
- Section now: "The specification and the repository's lineage".

At the base:

- F-175 **The specification reads a `comprises` clause at the level of values in every passage.** It builds P-60. Appendix I's entry "Traits with comprises clauses read at the level of values" records the change. A call whose argument's static type stands between two closed traits runs the declaration that covers its value. Where its declarations have no static parameters, its type is the intersection of its most specific declarations' return types. Appendix I names five places where the compiled path departs. The checker checks a `comprises` clause at the closed trait's immediate subtypes only (row 487). The code generator crashes on a method call on a result typed by that intersection (row 540). Where any declaration of the overload set has static parameters, the checker types such a call by one of its most specific declarations instead, a deliberate choice (row 543). The checker refuses the Meet Rule's example for closed traits when its declarations have static parameters (row 546). The checker's verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Detail: `Specification/appendices/changes.tex:3338-3534`, with the rows at `:1616-1619` and `:3604-3611`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 8 and 9.

Now:

- F-175 **The specification reads a `comprises` clause at the level of values in every passage.** It builds P-60. Appendix I's entry "Traits with comprises clauses read at the level of values" records the change. A call whose argument's static type stands between two closed traits runs the declaration that covers its value. Where its declarations have no static parameters, its type is the intersection of its most specific declarations' return types. Appendix I names five places where the compiled path departs. The checker checks a `comprises` clause at the closed trait's immediate subtypes only (row 487). The code generator crashes on a method call on a result typed by that intersection (row 540). Where any declaration of the overload set has static parameters, the checker types such a call by one of its most specific declarations instead, a deliberate choice (row 543). The checker refuses the Meet Rule's example for closed traits when its declarations have static parameters (row 546). The checker's verdict on an overload set can depend on the components compiled before it in the same JVM (row 547). Detail: `Specification/appendices/changes.tex:3346-3542`, with the rows at `:1616-1619` and `:3612-3619`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 8 and 9.

History blocks of the range:

- Written by the gather: 2026-11-09 23:32Z · rewritten · from `explorations/compile-ladder/rung-static-numerals-spec/REPORT.md`, "What changed and why" · by climb batch 29b's gather: citations that rung T's edit moves (rung T's record, finding 4) (cites [S5])

## F-240, changed

- Size: at the base 2032 characters; at the landing 2034 characters; now 2034 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 125 s and its distance stage 224 s at the last landed gate, climb batch 29's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 141 s), over fourteen components, ran at a start load of 0.07, against 205 s (135 s) at 3.42 at climb batch 28's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-29/gate/distance.txt`. Detail: `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 105 s and its distance stage 190 s at the last landed gate, climb batch 29b's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 117 s), over fourteen components, ran at a start load of 0.26, against 224 s (141 s) at 0.07 at climb batch 29's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-29b/gate/distance.txt`. Detail: `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-10 00:38Z · rewritten · by climb batch 29b commit stage: the count stage's about 105 s from the file times of the gate's log (checker-count/run.txt less javac.txt, 104 s); the distance stage's 190 s and FortressLibrary 117 s from compile-ladder/climb-batch-29b/gate/distance.txt's #seconds line, its start load 0.26 from the #machine line's first load, fourteen components from its first line; compared against climb batch 29's 224 s (141 s) at 0.07; the batch in the title and the cited path are now 29b

## F-262, changed

- Size: at the base 1171 characters; at the landing 1291 characters; now 1291 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-262 **A numeral's sign does not reach its type on either path, so no overload on a numeral exponent's type can tell a positive exponent from a negative one, as in `x^16` and `x^(-16)`.** The numeral itself has no sign (`Specification/basic/lexical-structure.tex:1053-1080`). The checker types every integer numeral by its numeral type, `IntLiteral` under the compiler's prelude and `NaturalNumeral` under the one library (`Misc.scala:468-469`), before it converts it (F-342). Both paths fold `prefix -` on a numeral into a numeral node of negative value before the checker, and fold `^` of numerals by an integer numeral up to 4096 (F-339), but leave an integer base at a negative exponent: `10^16` is a numeral, and `10^(-16)` stays an operation whose exponent is a numeral (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:292-302`). Walk's numeral is its default, an `Int` value read at `ZZ32` (F-74, F-341); a negative constant at a program's own type reaches its coercion as a `NaturalNumeral` of negative value under walk (row 968), and with its sign on the compiled path (row 961). By reading. Detail: `reviews/integer-power-fable-judgement.md` section 9.

Now:

- F-262 **A numeral's sign does not reach its type on either path, so no overload on a numeral exponent's type can tell a positive exponent from a negative one, as in `x^16` and `x^(-16)`.** The numeral itself has no sign (`Specification/basic/lexical-structure.tex:1053-1080`). The checker types every integer numeral by its numeral type, `NaturalNumeral[\n, r, v\]`, whose static arguments hold no sign, under the compiler's prelude and the one library alike (`scala_src/typechecker/impls/Misc.scala:469-472`), before it converts it (F-342). Both paths fold `prefix -` on a numeral into a numeral node of negative value before the checker, and fold `^` of numerals by an integer numeral up to 4096 (F-339), but leave an integer base at a negative exponent: `10^16` is a numeral, and `10^(-16)` stays an operation whose exponent is a numeral (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:315-325`). Walk's numeral is its default, an `Int` value read at `ZZ32` (F-74, F-341); a negated numeral at a program's own type is the type's own prefix `-` applied to the coercion's result for the numeral, on both paths (P-174; tests `tests/NumeralStaticDesignWalk.fss`, `compiler_tests/NegativeNumeralOwnType.test`). By reading. Detail: `reviews/integer-power-fable-judgement.md` section 9.

History blocks of the range:

- Written by the merged-diff review: 2026-11-10 00:31Z · rewritten · from `explorations/compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why" · by climb batch 29b's merged-diff review: made true of climb batch 29b's merged tree at 17e93a7da8, where the static numerals removed what the entry named (cites [S2])

## F-272, changed

- Size: at the base 1148 characters; at the landing 1148 characters; now 1148 characters, over 600.
- Section now: "The specification and the repository's lineage".

At the base:

- F-272 **The coercion example of the specification's "Coercion Resolution", over its own traits `ZZ32`, `ZZ64` and `ZZ128`, declares the exclusions that the chapter's definitions need: `ZZ32 excludes { ZZ64, ZZ128 }` and `ZZ64 excludes { ZZ128 }`.** A type `T` rejects `U` when every type that coerces to `T` excludes `U`. `T` is no less specific than `U` when it is a subtype of `U`, or excludes, coerces to and rejects it. So the choice of the more specific declaration depends on the exclusions. In the rung's probe, with the traits renamed `S32`, `S64` and `S128`, since the first two names are the library's, the revised example ran on both paths: `f(S32Of)`, on an `S32` value, chose `f` on `S64` and gave 1. No gated test runs the printed example. Row 394, fixed, names `tests/CoercionMostSpecificRungC.fss`, a walk test of the choice of the more specific coercion over three traits of the example's shape, each of which excludes both others. Detail: `compile-ladder/rung-spec-integer-rules/decision-record.md` section 4, decision 6; `Specification/basic/conversions-coercions.tex:521-537` (the definitions) and `:601` onward (the example).

Now:

- F-272 **The coercion example of the specification's "Coercion Resolution", over its own traits `ZZ32`, `ZZ64` and `ZZ128`, declares the exclusions that the chapter's definitions need: `ZZ32 excludes { ZZ64, ZZ128 }` and `ZZ64 excludes { ZZ128 }`.** A type `T` rejects `U` when every type that coerces to `T` excludes `U`. `T` is no less specific than `U` when it is a subtype of `U`, or excludes, coerces to and rejects it. So the choice of the more specific declaration depends on the exclusions. In the rung's probe, with the traits renamed `S32`, `S64` and `S128`, since the first two names are the library's, the revised example ran on both paths: `f(S32Of)`, on an `S32` value, chose `f` on `S64` and gave 1. No gated test runs the printed example. Row 394, fixed, names `tests/CoercionMostSpecificRungC.fss`, a walk test of the choice of the more specific coercion over three traits of the example's shape, each of which excludes both others. Detail: `compile-ladder/rung-spec-integer-rules/decision-record.md` section 4, decision 6; `Specification/basic/conversions-coercions.tex:527-543` (the definitions) and `:607` onward (the example).

History blocks of the range:

- Written by the gather: 2026-11-09 23:32Z · rewritten · from `explorations/compile-ladder/rung-static-numerals-spec/REPORT.md`, "What changed and why" · by climb batch 29b's gather: citations that rung T's edit moves (rung T's record, finding 4) (cites [S5])

## F-340, changed

- Size: at the base 971 characters; at the landing 1350 characters; now 1350 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-340 **On the compiled path a numeral at a typed place of `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `RR64` or `RR32` is that type's constant, a float rounded once, and a program's coercion from a numeral runs once per site, in the component class's static initializer.** The coercion desugarer types the numeral at the place's type (`compiler/desugarer/CoercionDesugarer.scala`), and the code generator emits the type's `make` with a float from `roundToDouble` or `roundToFloat` (`compiler/codegen/CodeGen.java`), so `x: RR64 = 0.9999999999999999` is below 1.0; each site's coercion result is a static field `numeral$coercion$N` of the component's class, and a coercion that raises stops the program before `run()`. A program's generic type is not hoisted (row 957). Tests: `compiler_tests/FloatNumeralOneRounding.test`, `NumeralCoercionOnceCompiled.test`, `NumeralCoercionRaisesCompiled.test`. Detail: `compile-ladder/rung-literal-fold/REPORT.md`, "What changed and why".

Now:

- F-340 **On the compiled path a folded constant at a typed place of `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `RR64` or `RR32` is that type's constant, a float rounded once from its exact value, and a numeral as written there is its type's own coercion folded (F-347).** The coercion desugarer types a folded constant, a negative one among them, at the place's type, and leaves a numeral as written its call of the type's numeral coercion (`compiler/desugarer/CoercionDesugarer.scala`); the code generator emits the type's `make` for the first, a float from `roundToDouble` or `roundToFloat` (`compiler/codegen/CodeGen.java`, `forIntLiteralExpr`, `forFloatLiteralExpr`), and folds the coercion's body for the second, so `x: RR64 = 0.9999999999999999` is below 1.0. A place whose value is no JVM constant is a static field `numeral$coercion$N` of the component's class, filled in its static initializer, and a coercion that raises stops the program before `run()`. A place whose type names a type parameter is not hoisted (row 957). Tests: `compiler_tests/FloatNumeralOneRounding.test`, `NumeralCoercionOnceCompiled.test`, `NumeralCoercionRaisesCompiled.test`, `library_tests/NumeralFoldFloats.test`. Detail: `compile-ladder/rung-literal-fold/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-10 00:31Z · rewritten · from `explorations/compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why" · by climb batch 29b's merged-diff review: made true of climb batch 29b's merged tree at 17e93a7da8, where the static numerals removed what the entry named (cites [S2])

Report sections that the entry cites: [S6] `compile-ladder/rung-literal-fold/REPORT.md`, "What changed and why"; [S2] `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

## F-341, changed

- Size: at the base 1233 characters; at the landing 1699 characters; now 1699 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, called with the numeral object, one result per site and type; a numeral out of the type's range, or at a type with no coercion from it, is refused there when it runs; a store keeps its default alone. Dispatch fits it as it is at its own type or its default, then by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10, `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `h = 0.5` is `true` for `h: QQ = 1/2`. Tests: `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why".

Now:

- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, run with the four numbers bound as values of type `ZZ`, one result per site and type; a folded constant at a library number type converts from its exact value, outside the coercion; a numeral out of the type's range, at a type with no coercion from it, or outside its coercion's `where` clause is refused there when it runs; a store keeps its default alone. Dispatch fits it as it is at its default, then by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10 and `y: RR64 = 0.5` is `SEQV` a computed 0.5, but `h = 0.5` is `false` for `h: QQ = 1/2`, the library's `=` over `Any` fitting the numeral at its default `RR64` (row 973; a walk program on climb batch 29b's merged tree printed 'h = 0.5: false', no test pins it). Tests: `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-10 00:31Z · rewritten · from `explorations/compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why" · by climb batch 29b's merged-diff review: made true of climb batch 29b's merged tree at 17e93a7da8, where the static numerals removed what the entry named (cites [S2])

Report sections that the entry cites: [S7] `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; [S2] `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

## F-342, changed

- Size: at the base 1431 characters; at the landing 1812 characters; now 1812 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-342 **The compiled checker converts a numeral where nothing fixes a type into its default, refuses one out of range, and refuses a numeral type written other than as a parameter's type.** Where no place's type has a coercion from the numeral's type or is a numeral type (an untyped binding, `Any`, `Object`, `Number`, an unbounded type parameter, a receiver, a join, a result with no declared return type), a numeral becomes a `ZZ32`, or a `ZZ64` or `ZZ` by its value, or an `RR64` with a radix point; a type parameter that numerals alone fix takes the narrowest default holding them all; the conversion into the default ranks as no coercion; a numeral outside a bounded number type's range, or rounding to an infinity, is a static error, also as a tuple's element at a tuple type; a program's type with no coercion from the numeral's type refuses a numeral; `IntLiteral` and `FloatLiteral` are written in a program only as a parameter's type; a `nat` or `int` parameter read as a value is a `ZZ32`. It builds P-173's checker, P-174's written-only rule and P-40's size value; a `typecase`'s selector keeps the numeral's type (row 963). Tests: `compiler_tests/LiteralDefaultCompiled`, `LiteralDefaultResultCompiled`, `XXXLiteralTypeUnwritable.test`, `XXXNumeralBeyondZZ32Range.test`, `XXXNumeralBeyondRangeInTuple.test`, `NatValueZZ32Compiled`. Detail: `compile-ladder/rung-numeral-checker/REPORT.md`, "1. What changed and why".

Now:

- F-342 **The compiled checker converts a numeral where nothing fixes a type into its default, refuses one out of range, and refuses a numeral type written other than as a parameter's type.** Where no place's type has a coercion from the numeral's type (an untyped binding, `Any`, `Object`, `Number`, an unbounded type parameter, a receiver, a join, a result with no declared return type), a numeral becomes a `ZZ32`, or a `ZZ64` or `ZZ` by its value, or an `RR64` with a radix point; a type parameter that numerals alone fix takes the narrowest default holding them all; the conversion into the default ranks as no coercion; a numeral outside a bounded number type's range, or rounding to an infinity, is a static error, also as a tuple's element at a tuple type and in a result position of an `if`, a `case`, a `do` block or a `try`; a program's type with no coercion from the numeral's type refuses a numeral; `NaturalNumeral` and `RadixPointNumeral` are written in a program only as a parameter's type, never as a type that an object or a trait extends; a `nat` or `int` parameter read as a value is a `ZZ32`, but a `ZZ` where it is one of a numeral coercion's four numbers (`scala_src/typechecker/staticenv/KindEnv.scala`, `getType`). It builds P-173's checker, P-174's written-only rule and four numbers, and P-40's size value; a `typecase`'s selector keeps its own numeral type (row 963). Tests: `compiler_tests/LiteralDefaultCompiled`, `LiteralDefaultResultCompiled`, `XXXLiteralTypeUnwritable.test`, `XXXNumeralBeyondZZ32Range.test`, `XXXNumeralBeyondRangeInTuple.test`, `XXXNumeralJoinBeyondRange.test`, `XXXNumeralTypeExtendedRefused.test`, `NatValueZZ32Compiled`, `NumeralStaticDesignCompiled` (a `v` beyond `ZZ64`). Detail: `compile-ladder/rung-numeral-checker/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 23:29Z · rewritten · from `explorations/compile-ladder/rung-static-numerals/SKEPTIC.md`, "6. Fixes and corrections" · by climb batch 29b's gather: the written-only rule names the static numeral types and the extends clause, and the range refusal reaches a join's result positions (rung A's record, For FACTS, and its skeptic's fix 0923b029e0) (cites [S8])
- Written by the merged-diff review: 2026-11-10 00:31Z · rewritten · from `explorations/compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why" · by climb batch 29b's merged-diff review: made true of climb batch 29b's merged tree at 17e93a7da8, where the static numerals removed what the entry named (cites [S2])

Report sections that the entry cites: [S9] `compile-ladder/rung-numeral-checker/REPORT.md`, "1. What changed and why".

## F-345, changed

- Size: at the base 1043 characters; at the landing 1539 characters; now 1539 characters, over 600.
- Section now: "The specification and the repository's lineage".

At the base:

- F-345 **The specification states, in the revision form, a numeral design with the four numbers as fields, where P-174 makes them static parameters (row 969), and P-171's string literals.** The literals chapter gives `Numeral` comprising `NaturalNumeral` and `RadixPointNumeral`, the four numbers as fields, the conversion where a place fixes a type, the default elsewhere, a program's type through its own coercion once per place, and the numeral types written only as parameter types (`Specification/basic/expressions/literals.tex`); the constant chapter's fold into a signed constant with three defaults (`constant.tex`); the coercion chapter's default beside coercion; the inference chapter's numeral section; and Appendix I's `revival-numerals` and `revival-string-literals` (`Specification/appendices/changes.tex`), whose Effects name each departure with its row. Test: the specification's build (`ant genSource`, `ant tex`), 0 warnings by the skill's grep. Detail: `compile-ladder/rung-literals-spec/REPORT.md`, "What changed and why".

Now:

- F-345 **The specification states, in the revision form, the static numerals (P-174, P-176) and P-171's string literals.** The literals chapter gives a numeral a numeral type that exists only at compile time, `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[\n, m, r, v\]` below a `Numeral` without static parameters, the four numbers its static arguments, naturals of any size; every number type's coercion generic over the four numbers, read as `ZZ` and folded, one value per place; the conversion where a place fixes a type and the default elsewhere; a program's type receiving a numeral as written, its minus on the coercion's result, any other static expression through its coercion from the default's type; a `where` clause over the four numbers refusing statically; the numeral types written only as parameter types (`Specification/basic/expressions/literals.tex:98-285`); the constant chapter's fold, converted from its exact value at a library type (`constant.tex:80-126`); the numbers chapter's coercions, with no `=` pairs and no `asFloat` on a numeral type (`basic-lib/numbers.tex:47-71`); the binary chapter's numeral declarations, expressible now and left out; and Appendix I's `revival-numerals` and `revival-string-literals` (`Specification/appendices/changes.tex`), whose Effects name each departure of the two implementations with its row. Test: the specification's build (`ant genSource`, `ant tex`), 0 warnings by the skill's grep. Detail: `compile-ladder/rung-static-numerals-spec/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 23:32Z · rewritten · from `explorations/compile-ladder/rung-static-numerals-spec/REPORT.md`, "What changed and why" · by climb batch 29b's gather: the field numerals' text replaced by the static numerals (rung T's record, For FACTS) (cites [S5])

Report sections that the entry cites: [S5] `compile-ladder/rung-static-numerals-spec/REPORT.md`, "What changed and why".

## F-346, changed

- Size: at the base 779 characters; at the landing 1005 characters; now 1005 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-346 **The library's `=/=` over `Any` meets a numeral at its default, against `e =/= e'` being `NOT (e = e')`.** Under walk `u =/= 0` is `true` for a zero `u` of `NN32`, `NN64` or `RR32`, and `q =/= 0.5` for `q: QQ = 1/2`, since `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98`) has no pairs beside the `=` pairs (P-165), while `u = 0` and `q = 0.5` are `true` through those pairs; `basic/operators/opr-overview.tex` ("GCD, LCM, and CHOOSE Operators") makes `e =/= e'` `NOT (e = e')` (row 966). The compiled path until the switch-over answers `false` through the prelude's `=/=` on each integer type. Test: `ProjectFortress/tests/XXXNotEqualNumeral.fss` (an expected failure). Detail: `compile-ladder/rung-literals-spec/REPORT.md`, "What changed and why".

Now:

- F-346 **The library's `=/=` over `Any` meets a numeral at its default, against `e =/= e'` being `NOT (e = e')`.** Under walk `u =/= 0` is `true` for a zero `u` of `NN32`, `NN64` or `RR32`, and `q =/= 0.5` for `q: QQ = 1/2`, since `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98`) takes the numeral at its default, and so does `=`: with no `=` pairs between a numeral type and a number type (P-174), `u = 0` and `q = 0.5` are `false` there too (row 973), where `basic/operators/opr-overview.tex` ("GCD, LCM, and CHOOSE Operators") makes `e =/= e'` `NOT (e = e')` (row 966). The compiled path until the switch-over answers `false` for `u =/= 0` through the prelude's `=/=` on each integer type. Test: `ProjectFortress/tests/XXXNotEqualNumeral.fss` (an expected failure), with `XXXNumeralEqualsNumberWalk.fss` for `u = 0`. Detail: `compile-ladder/rung-literals-spec/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "11. Defects, each with its home".

History blocks of the range:

- Written by the merged-diff review: 2026-11-10 00:31Z · rewritten · from `explorations/compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why" · by climb batch 29b's merged-diff review: made true of climb batch 29b's merged tree at 17e93a7da8, where the static numerals removed what the entry named (cites [S2])

Report sections that the entry cites: [S10] `compile-ladder/rung-literals-spec/REPORT.md`, "What changed and why"; [S11] `compile-ladder/rung-static-numerals/REPORT.md`, "11. Defects, each with its home".

## F-347, added

- Size: at the base none; at the landing 1473 characters; now 1473 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-347 **Every numeral's place on the compiled path is one value made before the program runs: a JVM constant where the fold of its type's own numeral coercion ends in an `int`, `long`, `float` or `double`, else a static final filled once by the coercion's method of the four numbers as `ZZ` values.** The code generator folds the body of the place's type's coercion, the library's or a program's, over a fragment of constants, bound names, natives over the built-in types' representations and calls of functions and methods in the fragment (`compiler/codegen/NumeralCoercionFold.java`); the method, `coerce_T№natural` or `coerce_T№point`, is compiled once in the declaring component and called from any component, and a program type's minus on a negative constant runs once with it (`compiler/codegen/CodeGen.java`, `numeralCoercionSiteDesc`, `emitFoldedNumeral`, `numeralCoercionMethods`, `emitNumeralCoercionCall`, `negatedNumeralSite`). A place whose type names a type parameter calls the method at each evaluation (row 957), and a coercion that spawns a task fails the class's load (row 971). Under walk a folded constant at a library type converts from its exact value. Tests: `compiler/desugarer/NumeralCoercionFoldJUTest`, `library_tests/NumeralFoldIntegers`, `NumeralFoldFloats`, `compiler_tests/NumeralAcrossComponent`, `NumeralMinusOnceCompiled`, `NumeralCoercionOnceCompiled`. Detail: `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 23:29Z · added · from `explorations/compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why" · by climb batch 29b's gather (cites [S2])

Report sections that the entry cites: [S2] `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

`facts-extract.sh 'doc:.claude/skills/coordinator/references/batch.md#The checker count and the distance'`

.claude/skills/coordinator/references/batch.md:58-65, 844 bytes.

~~~~
## The checker count and the distance

Until the switch-over lands, the gate of every batch reports the checker count and the distance. Neither turns the gate red.

- If a rung's test is the checker count or the distance, it takes the last landed gate's tables as its starting values.
- If every file that a rung changes lies outside what the two measures read, the rung runs neither and lists those files (`STAGE_BLIND`). Its skeptic checks the list against the branch's diff.
- The review after the batch ties every new or risen row of the count's table to a named rung edit.
- The gate's comparisons hide Java line numbers, identity hashes and moved library positions. Put every difference that they hid on the review list. Put there too each line of the team's tests that a rung rewrote to keep its checked value, with its before and after.
~~~~

## [S2] explorations/compile-ladder/rung-static-numerals/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-static-numerals/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-static-numerals/REPORT.md:11-66, 13554 bytes, cut at 2500.

~~~~
## 1. What changed and why

The rung's commits, on `wip/rung-static-numerals` from `b5b0f82c13`:

| commit | what |
|---|---|
| 8ec860f0b7 | the probe's patch, as applied (`git apply`, one whitespace warning, 90 paths, unchanged) |
| 9f33376ad4 | the prelude's `NN64` numeral coercion reads `v` as unsigned 64 bits (a file of the patch) |
| c4c9deb6bb | the fold's evaluator, `compiler/codegen/NumeralCoercionFold.java`, and its unit test |
| b35cf99c6c | the code generator's numeral places: the library's types by their own coercion, folded; one method per numeral coercion; the minus with the coercion; the static initializer's fill on demand (a file of the patch) |
| dfe04ba962 | `CoercionDesugarer.foldsTo` for folded constants only; the rung's compiled and library tests |
| 063495022b | `NumeralStaticDesignCompiled`'s `Written` coercion binds its operands first, row 971's workaround (a file of the patch) |
| 1484bf7dc9 | walk converts a folded constant at a library type from its exact value (`Numerals.java`, a file of the patch); two walk guards |
| 9af764850d | fork A8: the compiled path's `IntLiteral` and `FloatLiteral` classes and names deleted |
| 4c1a8de543 | row 957's second case as an `XXX` run pair |
| dde414aba4 | the unit test sets the compiler's library names before it reads the analyzed prelude |

**Step 1, the probe's build.** `git apply explorations/compile-ladder/plan-30/probes/draft-numerals.patch` applied with one warning, `draft-numerals.patch:432: trailing whitespace.` on `CompilerBuiltin.fsi`'s `trait ZZ` line, which the base has; no hunk failed; 90 paths, `git status --short | wc -l` printing 90. Built by `ant compileAll` and the library order: "BUILD SUCCESSFUL / Total time: 46 seconds", the five jars. Later changes to files of the patch: `CompilerBuiltin.fss` (9f33376ad4, the `NN64` coercion), `CodeGen.java` (b35cf99c6c), `NumeralStaticDesignCompiled.fss` (063495022b, row 971), `Numerals.java` (1484bf7dc9, fork A3); each reason is in its commit and below.

**Step 2, a numeral as written at a library type through the type's own coercion, folded from its body (fork A1).** `CoercionDesugarer.foldsTo` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala:44-60`) retypes only a folded constant at its library type; a numeral as written keeps its call of the type's numeral coercion, generic over its four numbers. The code generator's site rule (`CodeGen.java:7224-7237`, `numeralCoercionSiteDesc`) no longer excludes 
~~~~

## [S3] tests-writing.md, "Names, comments, citations"

`facts-extract.sh 'doc:tests-writing.md#Names, comments, citations'`

Does not resolve: facts-extract: part 1 of 1. Its 1 part prints 349 bytes, about 300 tokens.
Asked for, and where it is:
  doc:tests-writing.md#Names, comments, citations            NOT FOUND: no such file: tests-writing.md
Not found (1): doc:tests-writing.md#Names, comments, citations -> no such file: tests-writing.

## [S4] explorations/compile-ladder/repair-r2-literal-wrap/REPORT.md, "The failure-mode question"

`facts-extract.sh 'doc:explorations/compile-ladder/repair-r2-literal-wrap/REPORT.md#The failure-mode question'`

explorations/compile-ladder/repair-r2-literal-wrap/REPORT.md:316-342, 1895 bytes.

~~~~
## The failure-mode question

**One loud failure becomes a quiet value, and this report first did not say so.**
`FIntLiteral.asNN64`'s pre-image was `if (largerVal == null) return
FNN64.make((long)smallerVal); throw outOfRange("NN64");` -- it threw for *every*
string-carried numeral -- and `simpleIntLiteralArith.fromBigInteger` sends every `IntLiteral`
arithmetic result of bit length 64 or more to the string branch (`:31-32`), a path this rung
does not touch.  So the transition is reachable without a numeral of bit length 64 anywhere
in the source.  The skeptic's probe `probes/skeptic/s3.fss` is the case: `x =
9223372036854775807` then `n: NN64 = x + x + 1` raised `Error: Not in range for NN64:
18446744073709551615` before this rung and now computes the value, which
`probes/skeptic/s3.compiled` shows **rendered as `-1`**.

The value is the specification-correct one -- `literals.tex:83-86` gives the numeral its
exact value and $2^{64}-1$ is inside `NN64` -- so the quiet answer is right where the loud
failure was wrong.  The cost is nonetheless real and is the reason this belongs with the
rendering row rather than beside it: the error that *named* the true value is gone, and what
replaces it prints as `-1`, because `FNN64.toString` is signed (`runtimeValues/FNN64.java:20`).
That is ledger row 326, and the two facts are one situation.  `walk` has no counterpart: it
refuses the coercion outright (`probes/skeptic/s3.walk`, "RHS expression type Long is not
assignable to LHS type NN64").

In the other direction -- a quiet wrong value becoming a loud failure -- there are four:
`asZZ32`, `asZZ64` and `asNN32` now raise `Not in range for ...` where they silently
truncated, which row 325 records for annotated declarations; `asNN32` on a string-carried
numeral now raises where it returned the `BOGUS` sentinel's low half
(`probes/skeptic/s2`); and `p37`'s comparison, row 328.
~~~~

## [S5] explorations/compile-ladder/rung-static-numerals-spec/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-static-numerals-spec/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-static-numerals-spec/REPORT.md:13-34, 13820 bytes, cut at 2500.

~~~~
## What changed and why

The decisions on record, the static numerals (P-174, P-176), with P-173's conversion, default and fold, P-40's bound for sizes, P-165's `asFloat`, P-37's exception for the prelude, and P-96's revision form, are written into the specification. The field numerals' sentences and boxes, climb batch 29's (`7daf51fe8a`), are replaced; Appendix I's `revival-numerals` is rewritten in place (fork T1), and no box names the field numerals. The Effects state the implementations as rung A leaves them (`CLIMB-BATCH-29b.md:222-256` and forks A1 to A8, `:191-206`), with rows 957's second case and 971 written as open (forks A5, A6); the gather corrects them to what lands.

Passage by passage (lines after the change; "before" at b5b0f82c13):

1. **The numeral types** (`literals.tex:98-122`; before `:98-116`). Before: "Every numeral has the type \TYP{Numeral} ... through one of the two types that \TYP{Numeral} comprises ... \Library\ declare these numbers as the getters \VAR{digits}, \VAR{fractionDigits}, \VAR{radix} and \VAR{digitValue} ... They are fields of the numeral's value, not static parameters of its type: the three numeral types have no static parameters." After: "Every numeral has a \emph{numeral type} of its own, which exists only when the program is compiled: no value of a numeral type exists when the program runs. The static arguments of a numeral type are the numeral's \emph{four numbers}: ... Each of the four is a natural number, of any size. A numeral containing only digits has the type `NaturalNumeral[\n,r,v\]`, and a numeral containing a radix point has the type `RadixPointNumeral[\n,m,r,v\]`. So `3.125` has the type `RadixPointNumeral[\4,3,10,3125\]`, `007` the type `NaturalNumeral[\3,10,7\]`, and `3000000000` the type `NaturalNumeral[\10,10,3000000000\]`." The hierarchy: `Numeral` extends `Number` with no static parameters; `NaturalNumeral` below `AnyNaturalNumeral`, `RadixPointNumeral` below `AnyRadixPointNumeral`, which exclude each other; none declares a method. Reason: P-174; PROBE `12. Decisions`, decision 1; fork A4 (`CLIMB-BATCH-29b.md:202`); the team's two notes kept (`literals.tex:123-138`). Box: `revival-numerals` at `:146`.
2. **The radix** (`literals.tex:140-145`; before `:134-138`). Before: "such a numeral has the same type as one without an indicator. So `deadc_16` is a \TYP{NaturalNumeral} whose four numbers are $5$, $0$, $16$ and $912092$." After: "such a numeral has one of the same two numeral types, with its rad
~~~~

## [S6] explorations/compile-ladder/rung-literal-fold/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-literal-fold/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-literal-fold/REPORT.md:14-80, 11358 bytes, cut at 2500.

~~~~
## What changed and why

Commits on `wip/rung-literal-fold`: `8e4ca7b070` (the fold, the phase order, the typed constants, the once-per-site call, the harness key, the tests), `f58c027526` (five tests respelled with typed operands), `1bf56ffa92` (`XXXNumeralFoldNoPrefixMinusWalk`). The code is `8e4ca7b070`'s; the two later commits change tests only.

**The phase order** (`PhaseOrder.java:125-136`). Walk's order was PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR, TYPECHECK (switched off under walk), DESUGAR, OVERLOADREWRITE_FOR_INTERPRETER. It now has INTEGERLITERALFOLDING after PRETYPECHECKDESUGAR, as the compiler's order has had it: PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR, INTEGERLITERALFOLDING, TYPECHECK, DESUGAR, OVERLOADREWRITE, CODEGEN (unchanged). The count and distance stages run the compiler's order up to TYPECHECK (`explorations/coordinator/tools/checker-count/run.sh`, header), so they read the folded library.

**The fold** (`IntegerLiteralFoldingVisitor.java`, rewritten). An expression of numerals alone, or of the forms the fold writes, folds exactly into a `Constant` (numerator, positive denominator in lowest terms, and a kind: integer, quotient, radix point). The kind sets the default P-173 gives: a radix point among the operands makes the result a radix-point constant, else a `/` makes it a quotient, else it is an integer.

The operators folded, each over integer and radix-point operands unless said, by canonical name through `PrecedenceMap.canon` (`:80-87`):
- `+`, `-`; multiplication `DOT`, `TIMES` (canonical `BY`, as `×`), and a juxtaposition of numerals alone (`:416-434`): exact rational arithmetic.
- `/` by a nonzero numeral: a quotient, or a radix-point constant where an operand has a radix point.
- `^` by an integer numeral of magnitude at most 4096; an integer base takes no negative exponent (P-153: such a power raises at run time); a radix-point or quotient base takes one, so `10.0^(-5)` is `0.00001`.
- prefix `-` and `|_|`.
- `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `MINMAX`: integers only, with the answers of `simpleIntArith` and `simpleArbitraryPrecisionArith` (`DIV` truncates, `REM` has the dividend's sign, `MOD` the divisor's, `GCD` is nonnegative, `LCM` of a zero is 0); `CHOOSE` folds where 0 ≤ k ≤ n and gives 0 otherwise, as walk's `ZZ32` answers (`ProjectFortress/tests/ChooseZZ32Walk.fss:36-37` at b430f9f428).
- `MIN`, `MAX` and the comparisons `<`, `<=`, `>`, `>=`, `=`, 
~~~~

## [S7] explorations/compile-ladder/rung-numeral-types/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-types/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-numeral-types/REPORT.md:11-39, 7574 bytes, cut at 2500.

~~~~
## What changed and why

**The library.** `Library/FortressLibrary.fsi:454-494` and `.fss:668-721` declare, beside `Ratio`, `trait Numeral extends Number comprises { NaturalNumeral, RadixPointNumeral }` with the four getters abstract (`digits`, `fractionDigits` and `radix` at `ZZ32`, `digitValue` at `ZZ`), and the value objects `NaturalNumeral(digits: ZZ32, radix: ZZ32, digitValue: ZZ)`, whose `fractionDigits` is 0, and `RadixPointNumeral(digits: ZZ32, fractionDigits: ZZ32, radix: ZZ32, digitValue: ZZ)`. Each has `asString`, the numeral as the Working Draft writes one (its digits in its radix, at least `digits` of them, upper case, the radix point after `digits - fractionDigits` of them, `_r` where the radix is not ten), `asFloat(self): RR64` by one rounding, and its reversed `=` pairs: `NaturalNumeral` at the eight number types, `RadixPointNumeral` at `RR64`, `QQ` and `RR32`, each `do c: T = self; (c = b) end` as the library writes its pairs (`.fss:418` at the base). The number types' coercions, renamed or new, each with its pair:

| type | coercions from the numeral types, and their bodies | pair |
|---|---|---|
| `RR64` | `coerce(x: NaturalNumeral) = asFloat(x)`, `coerce(x: RadixPointNumeral) = asFloat(x)` (`.fss:389-390`) | both (`.fss:419-420`) |
| `QQ` | `Ratio(x.digitValue, 1)`; `x.digitValue / r^(x.fractionDigits)` for `r: ZZ = big(x.radix)`, reduced by `ZZ`'s `/` (`.fss:565-569`) | both (`.fss:588-589`) |
| `AnyIntegral` | `ZZ32`, `ZZ64` or `ZZ` by the value, which is never negative (`.fss:723-728`) | none, as at the base |
| `ZZ32`, `ZZ64`, `NN64`, `ZZ` | `x.digitValue.asZZ32`, `.asZZ64`, `.asNN64`, `x.digitValue` (`.fss:829`, `:935`, `:1045`, `:1155`) | `NaturalNumeral` (`:845`, `:956`, `:1064`, `:1175`) |
| `NN32` | `x.digitValue.asNN32` (`FortressBuiltin.fss:430`) | `NaturalNumeral` (`:453`) |
| `RR32` | `numeralRR32(x.digitValue, x.radix, 0)` and `numeralRR32(x.digitValue, x.radix, x.fractionDigits)` (`FortressBuiltin.fss:214-215`) | both, new (`:258-259`) |

`RR64` comprises `{ Float }` (`.fsi:294`); `Float`'s `asFloat(self): RR64` (`FortressBuiltin.fss:82`); the `^` over the numeral in `ZZ32`, `ZZ64`, `NN64`, `ZZ` and `NN32` renamed, its body `self^(b.digitValue.asZZ32)`; `pi` and `e` at `RR64` (`Library/Constants.fsi:16-17`, `.fss:15-16`); `ReflectiveQuickCheck.fss:40` chooses `theType[\ZZ32\]()` where it chose `IntLiteral`, and the arm `theType[\IntLiteral\]() => Just[\AnyGen\](genZZ32)` (`:157` at the base), which repeated the `ZZ32` arm
~~~~

## [S8] explorations/compile-ladder/rung-static-numerals/SKEPTIC.md, "6. Fixes and corrections"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-static-numerals/SKEPTIC.md#6. Fixes and corrections'`

explorations/compile-ladder/rung-static-numerals/SKEPTIC.md:61-69, 4472 bytes, cut at 2500.

~~~~
## 6. Fixes and corrections

1. **Defect, settled: the compiled checker did not refuse a numeral out of its type's range in a join's result position, and the code generator or the run crashed instead** (program 6). Fix `0923b029e0`: `NumeralConversion.outOfRangeAt` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:584-601`) also reads the result positions of an `if` with `else`, a `case`, a `do` block, a block and a `try` without `finally`, the positions `Functionals.joinInto` converts; `buildCoercion` then builds no whole-join coercion, and the binding's or the return's check signals the numeral's range message. Settled by P-173, "A numeral converts where it stands" (`explorations/coordinator/POSITIONS.md:104`): "a numeral outside the type's range is refused statically"; and by fork A1, "The range refusal at a library type stays the checker's, by the exact value, before the fold, for a numeral as written and a folded constant alike" (`explorations/coordinator/CLIMB-BATCH-29b.md:196`). The section's "stays as the patch keeps it" I read as the mechanism, the checker's exact-value check before the fold, which the fix keeps and extends to positions the patch's check missed; the file is one of the patch's 90 paths. Test `compiler_tests/XXXNumeralJoinBeyondRange.test` with `NumeralJoinBeyondRange.fss`: red on the worker's head through `junit.sh` (with the library order run first in the tree's empty caches), ". compile .../NumeralJoinBeyondRange / UNEXPECTED exception / java.lang.Error: Desugarer found no case clauses in a case expression, please report. / Tests run: 3,  Failures: 1"; red on the base, `old-fortress.sh ... junit .../XXXNumeralJoinBeyondRange.test`, "Saw failure, but did not satisfy compile_err_WImatches; expected"; green after the build, `junit.sh fixpass`, the five refusals at lines 6, 7, 10, 11 and 12 and "File NumeralJoinBeyondRange.fss has 5 errors. / Saw expected failure", with `XXXNumeralBeyondZZ32Range`, `NumeralDivByZeroCompiled`, `XXX3u`, `XXX6bi`, `XXX9q` and `NumeralStaticDesignCompiled` beside it, "OK (12 tests)". Whole suite: `ant testQuick` on that code state, compiler "Tests run: 1525, Failures: 0, Errors: 0", library "Tests run: 86", othercompiler "Tests run: 263", "BUILD SUCCESSFUL / Total time: 6 minutes 39 seconds"; the code then committed unchanged, head `7d13b8a378` and this file's commit after it. Walk is unchanged: it refuses such a numeral when the place runs (P-176, until P-12).
2. **Correc
~~~~

## [S9] explorations/compile-ladder/rung-numeral-checker/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-checker/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-numeral-checker/REPORT.md:13-41, 7706 bytes, cut at 2500.

~~~~
## 1. What changed and why

The commits: `7bd7c7dfc7` (the change and its tests), `fe5d146a86` (the `XXX` test of the one fork not built, row 961), `fa13e6383c` (three revival tests the suite showed broken, respelled). The code of `7bd7c7dfc7` is the final code; the later commits change tests only.

**The default (P-173, fork C1).** A numeral, an `IntLiteralExpr` or `FloatLiteralExpr` node as written or as the fold made it, where nothing fixes a type converts into its default: `ZZ32`, or `ZZ64` or `ZZ` by its value, `RR64` with a radix point. The default applies to a numeral node, never to an expression of a numeral type, so `t = x` inside `coerce(x: IntLiteral)` stays an `IntLiteral`. The sites:

- an untyped binding, top level and local, one variable or several (`scala_src/typechecker/impls/Decls.scala:252`, `:289`, `:343`, `:384`), through `defaultNumeral` (`impls/Functionals.scala:1016`): a numeral alone; each element of a tuple on its own; the branches of an `if` with `else`, a `case`, a block's last expression or a one-block `do`, when every result is a numeral, together into the narrowest default holding them all (`joinNumerals`, `joinInto`, `:1030`, `:1046`);
- a parameter or a typed place whose type holds the numeral without conversion and fixes no type, `Any`, `Object`, `Number`, where the default fits too (`defaultAtUnfixed`, `:1078`): in `checkApplicableWithoutInference` (`:490`), its `Any`-domain branch (`:512`), after the subtyping inference (`:279`), in the coercion attempt (`:410`), and at every typed binding, assignment, field and return through `STypeChecker.checkExpr` (`scala_src/typechecker/STypeChecker.scala:506`);
- a parameter or typed place whose type declares no coercion from the numeral's type but holds its default, as `Index` holds `ZZ32` (`defaultFits`, `:1093`; `STypeChecker.scala:510`, `Functionals.scala:411`, `:491`);
- a type parameter that numerals alone fix, with no expected type: before the subtyping inference (`preDefault`, `:1121`, called at `:198`), and as the coercion attempt's one choice for that parameter (`:385`), the narrowest default holding every value (`numeralDefault`, `:998`), with the attempt's ordinary choices as a fallback where the default finds no candidate (`:417-423`);
- a dotted receiver written as a numeral, where the default type has the member (`defaultReceiver`, `:1105`; called at `:1360` and `impls/Misc.scala:347`), the prototype's receiver rule, so the prelude's `(1).asNN32` keeps its numeral.


~~~~

## [S10] explorations/compile-ladder/rung-literals-spec/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-literals-spec/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-literals-spec/REPORT.md:12-33, 7290 bytes, cut at 2500.

~~~~
## What changed and why

The decided design (P-173, P-174, P-76, P-172, P-171, P-165, P-40) is written into the specification in the revision form (P-96), with two new Appendix I entries and four revised. T writes the decided design, not the rungs' code (fork T3); the rungs' forks whose behaviour the text states are N1-N12, C1-C8, F1-F8 and S1-S2 (`CLIMB-BATCH-29.md:347-395`).

Passage by passage (the full reasoning P-96 asks for; each original is quoted in the entry named):

1. **A string literal, one object** (`Specification/basic/expressions/literals.tex:72-86`, box `:83` to `revival-string-literals`). New: two literals of one text denote one object; a string built at run time is another object unless the operation answers an existing string; strings stay reference objects; a concatenation of literals is a literal. Reason: P-171. Original: none (the Draft is silent; `Specification-1.0-frozen/basic/expressions/literals.tex:57` stands). Way back: each evaluation constructs a new string.
2. **The numeral types** (`literals.tex:98-118`, `:134-150`, box `:139` to `revival-numerals`). New: `Numeral` comprises `NaturalNumeral` and `RadixPointNumeral`; the four numbers `n`, `m`, `r`, `v` are fields, the getters `digits`, `fractionDigits`, `radix`, `digitValue` (`ZZ32`, `ZZ32`, `ZZ32`, `ZZ`); the explicit-radix types fold into the radix, `Literal[\v\]` into the digit count; the team's two draft notes stand and the box answers them. Reason: P-174, fork N1, N3; the judgement's "Changed in form: `:83-129`" (`reviews/literal-design-judgement-2026-11-08.md:24-29`). Original: `Specification-1.0-frozen/basic/expressions/literals.tex:83-86`, `:104-129`. Way back: static parameters again, which no library can declare.
3. **"Numerals are not directly converted"** (`literals.tex:156-163` rewritten; `:164-171` the Draft's `:141-148` kept as written). New: a numeral is converted where it stands, into the type its place fixes, and not before. Reason: P-173; the judgement keeps `:141-148` and contradicts `:132-141` at places that fix no type. Original: `Specification-1.0-frozen/basic/expressions/literals.tex:132-141`, quoted in `revival-numerals`.
4. **The conversion and the default** (`literals.tex:172-235`, box `:230`, replacing the box `revival-numeral-type` of `:149-165` at b430f9f428). New: each of the eight number types coerces from `NaturalNumeral`, `QQ`, `RR64`, `RR32` from `RadixPointNumeral`, exact or one rounding; a place fixes a type when its declared type declares
~~~~

## [S11] explorations/compile-ladder/rung-static-numerals/REPORT.md, "11. Defects, each with its home"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-static-numerals/REPORT.md#11. Defects, each with its home'`

explorations/compile-ladder/rung-static-numerals/REPORT.md:173-182, 2306 bytes.

~~~~
## 11. Defects, each with its home

1. The field numerals in the one library and walk (row 969), the compiled `IntLiteral` without the four numbers (970), the sign at a program's type (961 compiled, 968 walk), a numeral at a program's generic type whose type names no type variable (957's first case), `IntLiteral`'s stubbed operators (318), the `FloatLiteral` value's rendering (362), the cache tables' class (972): home 1, the patch's repair, closed by the tests of section 12.
2. The patch's `NN64` numeral coercion raised `IntegerOverflow` for `v` of 2^63 or more (`jBigToZZ64`); latent while the code generator folded by the target type, it stopped a program's load once the coercion ran: home 1, repaired in 9f33376ad4; tests `NumeralCoercionFoldJUTest.testNN64` and `library_tests/NumeralFoldIntegers` (18446744073709551615 at `NN64`).
3. A place that the static initializer read before its turn was null (`BF16`'s coercion reading `powZZ`'s numerals at `ZZ`): found in this rung's own first build, home 1, repaired in b35cf99c6c; test `compiler_tests/NumeralStaticDesignCompiled.test`.
4. The unit test failed in a JVM with empty caches, its prelude compile seeing the interpreter's library names that `NamingCzar` had fixed: home 1, repaired in dde414aba4; test the misc track's run of `NumeralCoercionFoldJUTest`.
5. Row 957's second case, a place whose type names a type parameter, one value per instance: home 2, `compiler_tests/XXXNumeralGenericPlaceCompiled.test` (P-176 settles it); row 957 rewritten to it.
6. A coercion that spawns fails its component class's load (row 971), now also wherever a coercion's body has an operand the parallelism analyzer spawns, since the one method keeps its choices: home 3, the existing row, rewritten; `NumeralStaticDesignCompiled` takes its workaround. Fork A6 leaves it.
7. `u = 0`, `0 = u` and `f = 0` false under walk for a zero of `NN32`, `NN64` or `RR32`: the curator's question 1; walk's answer pinned by the patch's `tests/XXXNumeralEqualsNumberWalk.fss`, which asserts the snapshot's answer; a new row, 973, `CONTESTED`. Row 966's `=/=` rewritten beside it.
8. An integer numeral at `RR64` or `RR32` is refused on the compiled path, on the base and after: the prelude declares no coercion from a natural numeral there (row 442, open, unchanged).
~~~~
