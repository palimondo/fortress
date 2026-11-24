<!-- The claims of each of the 30 FACTS entries of chunk `landed-3` (section "Landed semantics", F-349 to F-407), each with its subject, its kind, the other entries that say the same, and what today's checks say of it: the first step of the sorting map for the consolidation of 2026-11-24, by a worker that judged nothing new. -->

# Claims of chunk `landed-3`

How to read this file:

- Each claim line: the claim in one sentence — its subject label — its kind. A defect gives its ledger row; a row the entry calls fixed makes the claim history.
- Subject labels start with an area of the brief's list, and with one more, "both paths", for a claim about a phase that walk and the compiled path share (the parser, the disambiguator, the desugarer, the folding of numerals).
- "Overlap" covers the claims of kind property, defect and choice. A search is a grep of every entry of `FACTS.md` for the words given in brackets; the entry itself is left out. A hit that only names the entry by its number is a pointer, not an overlap, and is left out.
- "Checks": the scout's file is `evidence/consolidation/scout-landed-3.md`; the list of stale claims is `evidence/stale-claims.md`. The scout checked only that each cited file, test, row and report heading exists and that each row's status agrees with the entry's words; it found all of them for every entry of this chunk, and the list of stale claims holds no finding for any entry of this chunk ("The scout found none missing"; this chunk had no writer). So "sound as checked" below means that, and no more: no claim was read against the tree.

## F-349 "Walk chooses among declarations applicable with coercion by specificity"

Claims:
1. Walk chooses among declarations applicable only by coercion the one than which no other is more specific, reading specificity through other applicable declarations, where the relation has no cycle — walk: dispatch by coercion — property
2. That rule is the specification's, in "Coercion Resolution" — the specification: coercion resolution — property
3. A call with three declarations in a chain of coercions runs the first under walk, as compiled, with no 'Ambiguous coercion', shown by a probe without a test — walk: dispatch by coercion — property
4. A float numeral to the left of an `RR32` operand runs `RR32`'s operator — walk: dispatch by coercion — property
5. Walk's rule for a numeral at a call runs before this one (it is F-366's) — both paths: numeral at a call — pointer
6. Source lines `OverloadedFunction.java:2545`, `:2608-2628` — walk: dispatch by coercion — detail
7. Test `tests/NumeralLeftOfRR32Walk` — walk: dispatch by coercion — tests
8. Detail in `rung-numeral-leftovers/REPORT.md`, section 1 — walk: dispatch by coercion — pointer

Overlap:
- 1, 3: F-73 ("A tie among coerced declarations is refused, 'Ambiguous coercion'", the checker's side); F-408 (the checker chooses among a call's declarations by specificity). Searched [Ambiguous coercion], [more specific … coercion].
- 2: F-272 (the example of "Coercion Resolution" and its exclusions). Searched [Coercion Resolution].
- 4: none found. Searched [NumeralLeftOfRR32], [numeral … left of].
- Skill: `revival-changes.md:103` says that where none is more specific both paths stop, "Ambiguous coercion" (scout item 5).

Checks: sound as checked.

Shape: one subject (walk: dispatch by coercion), with a pointer to the numeral rule.
Title: walk's choice by specificity through other applicable declarations; the body serves it, claims 1 to 4.

## F-362 "The signs for sum and product are accumulators, and an api's operator header takes what a component's takes"

Claims:
1. U+2211 and U+220F parse as `SUM` and `PROD` in a reduction and in an operator's declaration, and are no `Op` anywhere — both paths: the sum and product signs — property
2. So a program's own `opr ∑` declares `BIG +` — both paths: the sum and product signs — property
3. An infix or postfix use of either sign is a `Syntax Error` — both paths: the sum and product signs — property
4. `opr ∑` in an import's list is a `Syntax Error`, a gap (row 42) — both paths: the sum and product signs — defect
5. An api declares `opr (x: T)^T` and the other postfix exponent operators as a component does — both paths: operator declarations in an api — property
6. The build after a grammar edit regenerates the two tracked parsers, and the edit's commit holds them — the repository: generated parsers — property
7. On both paths a model line can write `∑` for `SUM`, and the helper file's api can declare `^T` — the repository: microGPT's lines — property
8. C4 does both, at `MicroGptFlat.fss:23`, `:38`, `:47` and `FlatArrays.fsi:30-31` — the repository: microGPT's lines — detail
9. No test applies the sign to an array; the model's lines 23 and 47 do, and its quick check passes under walk — the harness and the gate: coverage of the sum sign — detail
10. Tests `SumSignAccumulator`, `ApiPostfixExponentOp` and their compiled twins — both paths: the sum and product signs — tests
11. Detail in `rung-parser-declarations/REPORT.md` — both paths: the sum and product signs — pointer

Overlap:
- 1, 2, 3: F-58 and F-59 name `∑` for `SUM` at the model's lines (F-58: "`∑` for `SUM`) add no site"; F-59: "`∑[j <- 0#i] matCount(j)`"). Searched [∑], [SumSign], [U+2211].
- 4: none found. Searched [row 42].
- 5: none found. Searched [ApiPostfixExponent], [^T` is declared].
- 6: none found. Searched [regenerat], [parser/Fortress.java], [TemplateParser].
- 7: F-58 (the model's sites under the checker, which these spellings leave unchanged). Searched [∑].

Checks: sound as checked; row 42 NEGATIVE-VERIFIED agrees.

Shape: several subjects (both paths: the sum and product signs; both paths: operator declarations in an api; the repository: generated parsers; the repository: microGPT's lines).
Title: two unrelated parser facts joined by "and"; the body serves both halves, and adds the rule on tracked parsers, which serves neither.

## F-363 "A superscript follows a dotted access and a parenthesised call on both paths"

Claims:
1. `p.wq^T`, `B.n^2`, `B.f()^T` and `B.data[5]^2` parse as the operator applied to the whole dotted primary to its left — both paths: superscript after a primary — property
2. `(f(x))^T`, `(f(x))!` and `(a^b)!` run under walk as they do compiled — both paths: superscript after a primary — property
3. `f(x)^T` and `f(x)^2` stay a static error on both paths, with walk's and the checker's messages — both paths: superscript after a primary — property
4. The parser reads a primary with a dot as the front of the math items that follow it (`Expression.rats:386-400`) — both paths: superscript after a primary — property
5. So a subscript, a parenthesised item or a tight identifier after a dotted method call parses too, and one test compiles a subscript, `Maker.f()[5]^2` — both paths: superscript after a primary — property
6. The parser builds for a single item the node kind that the parenthesised spelling built, so neither the checker nor the code generator changed — both paths: superscript after a primary — history
7. Walk's postfix branch evaluates an operand in parentheses as one expression (`Evaluator.java:965-970`) — walk: postfix operators — property
8. So a model line may write `p.wq^T x` and `(onehot(ks, 5))^T dx` — the repository: microGPT's lines — property
9. A selector after a superscript, `B.data^T.v`, is still a syntax error — both paths: superscript after a primary — defect (no row named)
10. A superscript after a subscript that is a math item of its own compiles and runs under walk (F-387, F-398) — both paths: subscript as a math item — pointer
11. In `B.data[5]^2` the subscript is part of the dotted primary — both paths: superscript after a primary — property
12. Tests: three walk tests and three compiled tests — both paths: superscript after a primary — tests
13. Detail in `rung-superscript-after/REPORT.md` — both paths: superscript after a primary — pointer

Overlap:
- 1 to 5, 11: F-387 and F-398 (the reassociation of math items after a subscript, "Superscript" in their tests). Searched [Superscript], [p.wq^T], [f(x)^T], [Expression.rats], [dotted primary]. Skill: `tests-writing.md:34` states 1 and 3.
- 7: none found. Searched [Evaluator.java:965].
- 8: none found. Searched [p.wq^T].
- 9: none found. Searched [data^T], [selector after].

Checks: sound as checked; the scout notes that "with its `.test`" is a fragment of the list, not a missing file.

Shape: one subject (both paths: superscript after a primary), with a walk detail and a model consequence.
Title: a superscript after a dotted access and a parenthesised call; the body serves it, and claim 10 points to the subscript case owned by F-387 and F-398.

## F-366 "On both paths a numeral at a call leaves the declaration that fits it at its default only for one that its own coercion reaches"

Claims:
1. On both paths a numeral at a call leaves the declaration that fits it at its default only for one that its own coercion reaches and whose declared parameter types lie strictly below, by subtyping — both paths: numeral at a call — property
2. It builds P-46's rule for a numeral at a call — both paths: numeral at a call — pointer
3. P-46 does not word the order; the worker that built the rule chose subtyping, and the curator read the choice as landed and let it stand without a decision of his own — both paths: numeral at a call — choice
4. `u = 0` and `0 = u` are `true`, and `u =/= 0` is `false`, for a zero `u` of `NN32`, `NN64` or `RR32` — both paths: numeral at a call — property
5. On the compiled path until the switch-over the checker refuses `u =/= 0` at `RR32` and `RR64` (row 1059) and `u = 0` at `RR32` as an ambiguous coercion (row 528) — the checker: numeral at a call — defect (rows 1059, 528)
6. `h = 0.5` is `true` for `h: QQ = 1/2`, `k(5)` runs `k(x: NN32)` beside `k(x: Any)`, a `case` clause `0` matches a zero `NN32`, and a program's own number type compares with a numeral by its own `=` — both paths: numeral at a call — property
7. `Equality[\T\]` declares `=/=` as the negation of the type's `=` (`FortressLibrary.fss:102`), reached before the `=/=` over `Any` (`:98`) — the library: equality operators — property
8. The order between the default's declaration and the coercion's is subtyping on declared parameter types, not the coercion chapter's relation: `f(1.5)` runs the `RR64` declaration beside `RR32`, and `x^2` keeps its integer power — both paths: numeral at a call — property
9. A value's coercion is not ranked so — both paths: numeral at a call — property
10. Where a call reaches two unordered declarations only by coercion, the one whose parameter the numeral's default fits runs, so `1.0 s` for `s: ZZ32` checks at `RR64`'s juxtaposition — both paths: numeral at a call — property
11. So a model line may compare a number of any type with a numeral and write a float numeral beside an integer value, on both paths — the repository: microGPT's lines — property
12. The checker compares only where the fitting declaration has a numeral at a parameter not of the numeral's default type, so `i + 1` costs nothing more — the checker: numeral at a call — property
13. The report says which choices walk keeps in its dispatch cache — walk: dispatch cache — pointer
14. Under walk a numeral beside a value typed `Any` is converted by the value's run-time type (row 1016) — walk: numeral at a call — defect (row 1016)
15. On both paths a numeral at a bare type parameter's declaration does not go to a more specific one (row 1017) — both paths: numeral at a call — defect (row 1017)
16. Source: `numeralAttempt` and `numeralTie` in `Functionals.scala`, `bestMatchForNumerals` and `belowByNumerals` in `OverloadedFunction.java`, with lines — both paths: numeral at a call — detail
17. Tests: three compiled, three walk — both paths: numeral at a call — tests
18. Detail in `rung-numeral-most-specific/REPORT.md` — both paths: numeral at a call — pointer

Overlap:
- 1, 8, 9, 10: F-341 ("unless its own coercion reaches a declaration strictly below, which then runs (F-366)"); F-349 (restates the numeral rule as running before the coercion rule); F-57 (a numeral's type by path and library); F-342 (the checker's conversion where nothing fixes a type). Searched [strictly below], [numeralTie], [P-46]. Skill: `revival-changes.md:105` states 1.
- 3: none found among FACTS; the curator's words are in the history (scout item 6). Searched [chose subtyping], [let it stand].
- 4, 6: F-280 ("The library's `=/=` over `Any` … see a value's own `=` only through …"); F-341 ("`h = 0.5` is `true` for `h: QQ = 1/2`"); F-303 lists `=` and `=/=` among natives. Searched [`=/=`], [h = 0.5].
- 5: F-139 (row 528: "`=` at the prelude's `RR32` overflows the stack, save `c = 0`, refused statically (row 528)"). Searched [row 528], [row 1059]. Skill: `compiler.md:134`.
- 7: F-280 (the library's `=/=` over `Any`). Searched [`=/=`], [FortressLibrary.fss:102].
- 10, 11: F-58 ("line 77's `1.0 s` … check at `RR64`'s"). Searched [1.0 s].
- 12: none found. Searched [i + 1], [costs nothing].
- 14, 15: none found. Searched [row 1016], [row 1017].

Checks: sound as checked; rows 528, 1016, 1017 and 1059 are NEGATIVE-VERIFIED and agree.

Shape: several subjects (both paths: numeral at a call; the checker: numeral at a call; the library: equality operators; walk: numeral at a call), with one worker's choice.
Title: the numeral's move to a declaration below by its own coercion; most of the body serves it, but claims 5, 7 and 12 to 15 are separate facts of the checker, the library and walk.

## F-367 "Under walk a generic function is a value, received at the arrow type of its parameter or variable"

Claims:
1. Under walk a function with static parameters has a type of its own as a value (`FTypeGenericArrow`), below `Any` and below each arrow type it can be received at — walk: generic function as a value — property
2. A parameter, a local variable declared with an arrow type, and a variable of arrow type at an assignment receive the instance that a direct call with arguments of the arrow's domain types runs — walk: generic function as a value — property
3. A generic callee's static parameters are fixed by its other arguments first, so `rows(rmsn, x)` runs with a sized `rmsn` — walk: generic function as a value — property
4. Where the arrow type leaves a static parameter open, and at `Any`, a type parameter or an untyped place, the value stays generic and each application infers its static arguments — walk: generic function as a value — property
5. The compiled checker refuses those open forms (row 1021) — the checker: generic function as a value — defect (row 1021)
6. An overloaded name keeps its whole overload set as a value, with its generic overloads, so `pick(twice)` runs the `pick` declared over an arrow type, not `pick(x: Any)`; no test pins this — walk: generic function as a value — property
7. An immutable top-level variable keeps the generic value (row 1019) — walk: generic function as a value — defect (row 1019)
8. A callee's type parameter fixed only by a value's run-time type refuses the function (row 1018) — walk: generic function as a value — defect (row 1018)
9. A function declared in a block with static parameters of its own does not run under walk, called or passed (row 1020) — walk: local generic functions — defect (row 1020)
10. Source names `Fcn.received`, `EvaluatorBase.instanceReceivedAt`, `OverloadedFunction.java:3067` — walk: generic function as a value — detail
11. Tests: three walk tests — walk: generic function as a value — tests
12. Detail in `rung-generic-function-value/REPORT.md` — walk: generic function as a value — pointer

Overlap:
- 1 to 4, 6: F-365 (the checker's side: "instantiates a reference to a generic function by the arrow type that receives it"). Searched [GenericFunction], [FTypeGenericArrow], [generic function … value], [instanceReceivedAt]. Skill: `interpreter.md:16`.
- 5: F-365 (its own refusals, `XXXGenericFunctionAsValueOpen`). Searched [row 1021].
- 7, 8, 9: none found. Searched [row 1018], [row 1019], [row 1020].

Checks: sound as checked; rows 1018 to 1021 NEGATIVE-VERIFIED agree.

Shape: one subject (walk: generic function as a value), with four gaps, one of them the checker's.
Title: a generic function as a value under walk, received at an arrow type; the body serves it.

## F-369 "A top-level tuple binding compiles"

Claims:
1. A top-level tuple binding compiles: each name is a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name — the code generator: tuple bindings — property
2. The checker gives the tuple rebuilt from the checked elements its tuple type, from which each name's thunk reads its own (`Decls.scala:272-277`) — the checker: tuple bindings — property
3. Where only some names declare a type and the right side is no tuple expression of as many elements, the checker checks the right side again against each name's type (`Decls.scala:324-336`) — the checker: tuple bindings — property
4. The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>` and gives each name its own class, reading its element by the tuple's typed getter; a wildcard binds nothing — the code generator: tuple bindings — property
5. Every compiled top-level variable is initialized at its first read, not at load as under walk — the compiled runtime: top-level variable initialization — property
6. So a binding of wildcards alone never evaluates its right side (row 1011) — the compiled runtime: top-level variable initialization — defect (row 1011)
7. A model line of this form compiles as written, lines 17 to 19 among them, and a name bound so is typed as a single binding's is — the repository: microGPT's lines — property
8. `MicroGptFlat.fss:72`, `beta1 m`, is a new checker site against the one library (F-58) — the checker: microGPT's sites — detail
9. Under walk the same right side runs once too (F-398) — walk: tuple bindings — pointer
10. The checker checks a local tuple binding's declared names beside untyped names in the same way (row 1029, fixed) — the checker: tuple bindings — history
11. A typed tuple binding over an `if` with tuple branches compiles (row 1031, fixed) — the checker: tuple bindings — history
12. Tests: four compiled tests, and two more for the local binding — the code generator: tuple bindings — tests
13. Detail in `rung-tuple-binding/REPORT.md` — the code generator: tuple bindings — pointer

Overlap:
- 1, 4: F-398 ("binds a tuple binding's names from one run of its right side", walk's twin); F-380 (row 1075, a tuple binding of `case` or `try` numeral tuples). Searched [tuple binding], [$tuple$].
- 2, 3: F-58 ("the typed names of the tuple bindings of lines 17 to 19 uncovered (F-369)"). Searched [tuple binding].
- 5, 6: none found. Searched [row 1011], [first read].
- 7, 8: F-58 ("at line 72 `beta1 m` and `(1 - beta1) g`"). Searched [beta1 m].

Checks: sound as checked; row 1011 NEGATIVE-BOUNDED, rows 1029 and 1031 FIXED, agree.

Shape: several subjects (the code generator: tuple bindings; the checker: tuple bindings; the compiled runtime: top-level variable initialization; the checker: microGPT's sites).
Title: a compiled top-level tuple binding, its names and its one evaluation; the body serves it, and adds the lazy initialization of every top-level variable, a wider fact, and a count site.

## F-372 "The code generator writes each inherited method once into a trait's or an object's class"

Claims:
1. For a trait's or object's class the code generator leaves out each declaration that a type strictly below redeclares at the same parameter types, self apart, and runs the lowest type's declaration — the code generator: inherited methods in a class — property
2. A dispatch method's gathering still compares declarations as schemas over each trait's own bounds, not at the instance — the code generator: functional method dispatch — property
3. So the choice is a relation between two declarations, and the library's shape of P-47 (`MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below) does not stop a class at load (row 990, fixed) — the code generator: inherited methods in a class — history
4. A method that an imported api's trait declares without `abstract` counts as a body in that trait's class, so a trait not first in an extends clause gives its body (row 732, fixed) — the code generator: inherited methods in a class — property
5. The batch's planner chose both readings as defaults, and the curator has not decided them — the code generator: inherited methods in a class — choice
6. By the traits chapter, an object that reaches one method along two paths, one through a trait that redeclares it, inherits both declarations, and the checker refuses that form where the traits are self-typed and generic (row 1037) — the checker: inherited declarations on two paths — defect (row 1037)
7. A functional method with self not first is written once, not again beside the dispatch method of its name (row 571, fixed), so such a class loads — the code generator: functional method dispatch — history
8. Its dispatch method reads each argument at its own local (F-399) — the code generator: functional method dispatch — pointer
9. Tests: four compiled tests — the code generator: inherited methods in a class — tests
10. Detail in `rung-method-forwarders/REPORT.md` — the code generator: inherited methods in a class — pointer

Overlap:
- 1, 4: F-409 ("A class that the code generator writes holds each method once …: a bridge, a forwarder to an inherited body and a dispatch method among inherited declarations are written only where …"); F-352 (rows 990 and 732 as hacks of the scratch tree, "a method written twice (row 990)"). Searched [inherited method], [row 990], [row 732], [same parameter types].
- 2: F-409 (dispatch method among inherited declarations); F-354 (the order of a dispatch method's tests). Searched [dispatch method].
- 5: none found. Searched [planner chose both].
- 6: none found. Searched [row 1037], [TraitMethodDiamond].
- Skill: none (scout item 5).

Checks: sound as checked; rows 571, 732 and 990 FIXED, row 1037 NEGATIVE-VERIFIED, agree.

Shape: several subjects (the code generator: inherited methods in a class; the code generator: functional method dispatch; the checker: inherited declarations on two paths), with a planner's choice.
Title: inherited methods written once, the lowest declaration, and forwarding to an api trait's body; the body serves it, and adds the self-not-first repair, which F-399 owns.

## F-373 "The compiled path runs `label` and `exit`"

Claims:
1. The compiled path runs `label` and `exit`: an exit is a thrown `LabelExit` that names one evaluation of its label block, and reaches it from a loop's body and from another task — the code generator: label and exit — property
2. `CodeGen.forLabel` makes a new target for each evaluation and takes the exits that name it in a handler; `CodeGen.forExit` throws `LabelExit.of(value, target)` — the code generator: label and exit — detail
3. A function expression or a task whose body exits captures the target as it captures any immutable variable — the code generator: label and exit — property
4. A group of forked arms joins the arms it forked before the exit passes it: at four threads each forked iteration of a parallel `for` runs to its end or its own exit, and the label's value is the first arm's exit in the arms' order; at one thread later iterations do not run — the compiled runtime: label and exit in tasks — property
5. No `catch` clause takes an exit — the code generator: label and exit — property
6. An exit out of an `atomic` block commits the block's transaction (F-401) — the compiled runtime: transactions — pointer
7. So the one library's `Indexed.indexOf` compiles in its own form, and row 81 is fixed — the code generator: label and exit — history
8. Three compiled answers were chosen as the path was built and the curator has not decided them; walk answers each otherwise — the code generator: label and exit — choice
9. Where the block is evaluated again inside itself, an exit leaves the evaluation in which its function was made (row 1042) — the code generator: label and exit — defect (row 1042, CONTESTED)
10. A `catch` of `Exception` does not take an exit compiled (row 1040) — the code generator: label and exit — defect (row 1040)
11. An exit after its label block has completed is an uncaught `LabelExit` that ends the program (row 1041) — the code generator: label and exit — defect (row 1041, CONTESTED)
12. A `finally` clause on the exit's way does not run (row 890) — the code generator: label and exit — defect (row 890)
13. A label block as a call's later argument fails verification (row 322) — the code generator: label and exit — defect (row 322)
14. A label block whose value joins a numeral with a number stops the code generator (row 340), though by P-50 the numeral takes the label's expected type; a program binds the numeral to a typed variable first — the code generator: label and exit — defect (row 340)
15. Test `compiler_tests/LabelExitCompiled`, which fails with 'Can't compile Label' without the two methods — the code generator: label and exit — tests
16. Detail in `rung-label-exit/REPORT.md` — the code generator: label and exit — pointer

Overlap:
- 1, 3, 5: F-351 ("commits the transaction on an exit, a `LabelExit`, and throws the exit on"); F-401 (the exit through an `atomic` block); F-87 (the checker's contexts include "a `label` body and each value that an `exit` gives"); F-393 (a local variable at a label, `rung-label-local-verify`). Searched [LabelExit], [label].
- 4: none found. Searched [forked arms], [first arm].
- 8: none found. Searched [curator has not decided them] with [label].
- 9, 11: F-401 ("Neither path tells an exit to an enclosing label from one to a label block that has completed … (row 1041)"). Searched [row 1040], [row 1041], [row 1042].
- 10: none found in FACTS. The scout quotes `compiler.md:151` "Under walk, a `catch` clause of the library's `LabelException` takes it", where the entry names `Exception`; reported, not judged.
- 12: F-315 ("the `finally` clause does not run (row 890)"). Searched [row 890].
- 13: F-374 ("with the block's limits (row 322)"). Searched [row 322].
- 14: F-37 ("fails in code generation, with a size or without (row 340)"). Searched [row 340].
- 7: F-352 (`label` (row 81) among the scratch tree's hacks). Searched [row 81].

Checks: sound as checked; row 81 FIXED; rows 322, 340, 890, 1040 NEGATIVE-VERIFIED; rows 1041, 1042 CONTESTED, which the entry calls "chosen … the curator has not decided", agree by the scout.

Shape: mostly a defect: one subject (the code generator: label and exit) with six rows and three undecided choices.
Title: compiled `label` and `exit` by a thrown `LabelExit`; the body serves it, but half of it lists rows.

## F-374 "A compiled object's `var` field lives in a cell that the object holds, and an atomic expression is its body in an atomic block"

Claims:
1. On the compiled path a `var` value parameter or `var` field of an object is a `MutableFValue` cell in a `public final` JVM field, made by the constructor — the code generator: var fields — property
2. Each read and write checks `BaseTask.inATransaction()` and goes through the transaction or the cell, by the code of a top-level `var`, and a loop body or function expression in the object's method captures the cell — the code generator: var fields — property
3. The batch's planner chose the cell as a default, and the curator has not decided it — the code generator: var fields — choice
4. So an `atomic` block tracks a `var` field (row 319, fixed) — the compiled runtime: transactions — history
5. Every access of a `var` field pays the transaction check, outside `atomic` too (row 641) — the code generator: var fields — defect (row 641)
6. A field without `var` holds its value and has no check — the code generator: var fields — property
7. `atomic e` is compiled by `CodeGen.forAtomicBlock` on the block that holds `e` (row 875, fixed), with the block's limits (row 322) — the code generator: atomic expressions — property
8. A numeral as an atomic expression's value at a place of declared type is refused or fails verification, since the checker carries no declared type into it (row 1043) — the checker: atomic expressions — defect (row 1043)
9. So a change of the transaction's variable code reaches fields with no second edit, and a new kind of nested context must capture a var field's cell as it does a top-level `var`'s — the code generator: var fields — property
10. A `value` object with a `var` field, which the specification forbids and nothing refuses (row 112), is not strictly equivalent to another built alike: `V(1) === V(1)` is `false` — the code generator: var fields — defect (row 112)
11. The one library declares one such object, `Lazy` (`Library/Lazy.fss:18`) — the library: value objects with var fields — detail
12. Tests: three compiled tests — the code generator: var fields — tests
13. Detail in `rung-atomic-expr-field/REPORT.md` — the code generator: var fields — pointer

Overlap:
- 1, 2, 6, 9: F-353 (`MutableFValue` among the classes named against a prelude class); F-377 ("An assignment from outside an object to its `var` field passes the value at the field's type", F-406). Searched [MutableFValue], [`var` field]. Skill: `compiler.md:103`, `SKILL.md:124`.
- 3: none found. Searched [chose the cell].
- 5: F-358 ("the transaction check and the box on the accumulator (F-12, row 641)"); F-12 (the transaction check on a top-level `var` accumulator). Searched [row 641].
- 7: F-373 (row 322 on a label block). Searched [row 875], [row 322].
- 8: none found. Searched [row 1043].
- 10: F-330 (a worker avoided a buffer in a `var` field). Searched [row 112], [Lazy]. Skill: `compiler.md:152` states 10.

Checks: sound as checked; rows 319 and 875 FIXED; rows 112, 322, 1043 NEGATIVE-VERIFIED; row 641 NEGATIVE-BOUNDED; agree.

Shape: several subjects (the code generator: var fields; the code generator: atomic expressions; the checker: atomic expressions), with a planner's choice.
Title: two facts joined by "and", the `var` field's cell and `atomic e`; the body serves both, and adds the `value`-object equivalence gap.

## F-375 "Walk's load check reads a generic declaration beside a plain one over an object type by the Return Type Rule"

Claims:
1. Under walk a plain declaration whose domain lies inside an own generic's declared domain is read on the declared domains even where the lists differ only at object types — walk: load check of overloads — property
2. The pair loads where the plain result lies below the generic's by one of three readings, and is refused in the rule's name where none holds (`returnRuleAtObjectArguments`; row 998, fixed) — walk: load check of overloads — property
3. The reading at object arguments compares a tuple result element by element (row 1058, fixed) — walk: load check of overloads — property
4. A declaration that writes no return type is not judged there (row 1044) — walk: load check of overloads — defect (row 1044)
5. A `comprises` clause is not read (row 550's pair at `ZZ64` is fixed since `ZZ64` is an object, F-379) — walk: load check of overloads — defect (no open row named; row 550 FIXED)
6. Two plain lists keep the team's shortcut (row 697) — walk: load check of overloads — defect (row 697)
7. `FTraitOrObject.enforceValueness` refuses a declared type that is not a value type below a value type, and passes a type parameter's symbolic type (row 997, fixed) — walk: value types — property
8. The coordinator chose to read no `comprises` clause and to leave unjudged a declaration with no return type; the planner chose the value check and both repairs in one step; a worker chose the three readings; the curator has decided none — walk: load check of overloads — choice
9. With the five number types merged with their objects (P-178, F-379), every generic-beside-plain pair over them is read on its declared domains — walk: load check of overloads — property
10. Walk's suite loads every pair that it loaded before, and none of its expected-failure tests moves between a refusal at load and a failure at run time — walk: load check of overloads — history
11. The reports run the pairs found to change, old against new — walk: load check of overloads — pointer
12. Tests: seven walk tests — walk: load check of overloads — tests
13. Detail in three reports — walk: load check of overloads — pointer

Overlap:
- 1, 2, 3, 9: F-27 ("Walk's load check reads again two kinds of overload pair … (generic beside plain)"); F-252 ("reads the pair again on its declared domains, by the No Duplicates, Return Type and Meet Rules"); F-257 (the messages of refused pairs); F-258 (`validOnDeclaredDomains`'s generic-beside-plain reading); F-361 ("generic beside a plain declaration at an object type (row 998)"); F-379 ("a valid generic-beside-plain pair at `ZZ64` loads (row 550, fixed)"). Searched [Return Type Rule], [generic beside plain], [row 998], [row 1058], [row 550].
- 4: F-379 ("a declaration with no written return type beside a generic one (row 1044)"). Searched [row 1044].
- 5: F-361, F-379 (row 550). Searched [row 550].
- 6: F-379 ("`f(x: Number): ZZ32` beside `f(x: ZZ64): String` (row 697)"). Searched [row 697].
- 7: F-361 ("a type parameter bounded by a value type through a trait's generic method (row 997, passed in the scratch tree …)"). Searched [row 997], [enforceValueness].
- 8: none found. Searched [three readings], [coordinator chose].

Checks: sound as checked; rows 550, 997, 998, 1058 FIXED; rows 697, 1044 NEGATIVE-VERIFIED; agree.

Shape: several subjects (walk: load check of overloads; walk: value types), with choices of three actors.
Title: walk's Return Type Rule on a generic beside a plain declaration at object types, and the value-type check; the body serves both, and claims 9 and 10 retell the merger of the number types, which F-379 owns.

## F-377 "The compiled code casts `self` where the checker reads it as a listed type or as the self-type parameter"

Claims:
1. `CodeGen.castToTypeBelow` casts a value of self's type (a `TraitSelfType` with a non-empty list) to a declared trait type or type variable strictly below its trait — the code generator: casts of self — property
2. It casts at a one-argument call's argument (including where the chosen declaration takes `self` at a listed type, F-408), a typed binding, an assignment, a method's returned value, each arm of a conditional or `case`, the conditional's type, and a function expression's or local function's result, also through a typecase whose arms each have self's type — the code generator: casts of self — detail
3. So `den(self)`, `twin(self): S = self` and `mx(self, other: T): T` in the shapes given verify and run (rows 991, 695, 1050, 1051, fixed) — the code generator: casts of self — history
4. The one library's `QQ comprises { Ratio }` and `StandardTotalOrder`'s `MIN` and `MAX` need this — the library: self-typed and closed traits — property
5. A conditional or typecase whose arms are pairs holding `self`, `MINMAX`'s shape, verifies and runs with no cast, since the tuple type is a JVM interface and the caller converts — the code generator: casts of self — property
6. A typecase whose arms are all `self` has a one-element union, which is cast — the code generator: casts of self — property
7. Only `self` gets the reading: the checker refuses a variable declared at the trait where a listed type is expected — the checker: self at a listed type — property
8. A typecase with `self` in one arm and another value in the other gets no cast (row 1070) — the code generator: casts of self — defect (row 1070)
9. A trait that lists a type at a `where`-clause variable gets no cast (row 307) — the code generator: casts of self — defect (row 307)
10. An assignment from outside an object to its `var` field passes the value at the field's type, `self` cast (F-406) — the code generator: setters and overload methods — pointer
11. No cast is added where the value's type is a subtype of the declared type by `extends` — the code generator: casts of self — property
12. Two casts are added where the verifier needs none: at a declared trait type strictly below self's trait (a planner's default), and at a `self` arm where the conditional stands at a trait type (a worker's choice beyond the plan); the curator has decided neither — the code generator: casts of self — choice
13. Tests: ten compiled tests — the code generator: casts of self — tests
14. Detail in four reports and a probe — the code generator: casts of self — pointer

Overlap:
- 1, 2, 5, 6, 11: F-225 ("A compiled default body that returns `self` at the self-type parameter runs … F-377 gives the cast that does it"); F-385 (a default body calling a method on a value of the self-type parameter). Searched [castToTypeBelow], [TraitSelfType], [self-type parameter], [MINMAX].
- 7: F-225 (the checker's reading of self in a self-typed trait). Searched [self-type parameter].
- 8: none found. Searched [row 1070]. Skill: `revival-changes.md:41`.
- 9: F-129, F-181, F-270 (row 307 as a verification failure of a size opened in a `comprises`/`where` clause). Searched [row 307].
- 12: none found. Searched [checkcast R], [beyond the plan] with [cast].

Checks: sound as checked; rows 695, 991, 1050, 1051 FIXED; rows 307, 1070 NEGATIVE-VERIFIED; agree.

Shape: one subject (the code generator: casts of self), with a planner's default and a worker's choice.
Title: the cast of `self` at a listed type or the self-type parameter; the body serves it.

## F-378 "A compiled method's JVM parameters follow its declaration, and two bridges join an instance's boxed tuple to a body's elements"

Claims:
1. One parameter of a declared tuple type is the tuple's elements, one JVM parameter each — the code generator: tuple parameters — property
2. One parameter whose declared type names a type parameter is one boxed JVM parameter at every instance, a tuple among them — the code generator: tuple parameters — property
3. The code generator writes a method of the boxed signature that calls a body at the tuple type with the elements — the code generator: tuple parameters — property
4. The class loader writes, in an instantiated class, a method of the elements beside a method whose template's parameter the instance makes a tuple — the compiled runtime: class loader instantiation — property
5. A dotted call passes the tuple boxed where the receiver's type holds only declarations whose parameter is a type parameter — the code generator: tuple parameters — property
6. So the shape of the one library's arrays of rank 2 and 3 compiles and runs against the prelude; the one library's own arrays run compiled only after the switch-over — the library: arrays of rank 2 and 3 — property
7. An object's method overloaded at a pair still fails (row 1054) — the code generator: tuple parameters — defect (row 1054)
8. An object's one pair value parameter still fails (row 1055) — the code generator: tuple parameters — defect (row 1055)
9. A generic operator applied to a pair still fails (row 1056) — the code generator: tuple parameters — defect (row 1056)
10. Test `TupleIndexMethodCompiled.test` — the code generator: tuple parameters — tests
11. Detail in `rung-tuple-parameter/REPORT.md`, which names the bridges' members — the code generator: tuple parameters — pointer

Overlap:
- 1 to 5: none found in FACTS. Searched [tuple parameter], [boxed tuple]. F-128 and F-137 name a tuple parameter under walk only. Skill: `compiler.md:135` states 1.
- 6: F-89, F-91 (the one library's ranges of rank 2 and 3); F-352 ("an array of rank 2 or 3 (row 992, fixed since)"). Searched [rank 2].
- 7: F-393 (row 1054: "2 methods in all, both in `RangeInternals`"). Searched [row 1054].
- 8: none found. Searched [row 1055].
- 9: F-291 ("applied to a tuple (row 1056)"). Searched [row 1056].

Checks: sound as checked; rows 1054 to 1056 NEGATIVE-VERIFIED agree.

Shape: one subject (the code generator: tuple parameters), with a class-loader part.
Title: the JVM parameters of a tuple parameter and the two bridges; the body serves it.

## F-380 "A numeral at the end of a block, or in a tuple, converts where it stands on the compiled path"

Claims:
1. At a declared type the compiled checker converts a numeral that ends a block after a local declaration, and each numeral element of a tuple, by the type's own coercion, so the code generator folds it into a constant — the checker: numeral conversion at its place — property
2. Such a numeral outside the type's range is refused statically, as at a block's end without a declaration — the checker: numeral conversion at its place — property
3. At a place that fixes no type, a numeral that ends a block after a local declaration or local function, and each numeral element of a tuple there, takes a numeral's default type (row 1060, fixed) — the checker: numeral conversion at its place — property
4. At such a place a `try` that ends in numerals keeps the numeral's own type and is refused (row 1074) — the checker: numeral conversion at its place — defect (row 1074)
5. A `case` or `try` whose branches are numeral tuples at an untyped tuple binding is refused (row 1075) — the checker: numeral conversion at its place — defect (row 1075)
6. Tests: five compiled tests — the checker: numeral conversion at its place — tests
7. Detail in `rung-numeral-block-end/REPORT.md` and its `SKEPTIC.md` — the checker: numeral conversion at its place — pointer

Overlap:
- 1, 2, 3: F-342 ("A numeral outside a bounded number type's range, or rounding to an infinity, is a static error, also as a tuple's element at a tuple type and in a result position of an `if`, a `case`, a `do` block or a `try`"); F-347 (every numeral's place compiled whose type names a coercion). Searched [numeral … block], [end of a block], [row 1060].
- 4, 5: none found in FACTS; F-369 points to row 1075's shape only by "tuple binding". Searched [row 1074], [row 1075]. Skill: `compiler.md:145`.

Checks: sound as checked; row 1060 FIXED, rows 1074 and 1075 NEGATIVE-VERIFIED, agree.

Shape: one subject (the checker: numeral conversion at its place).
Title: a numeral at a block's end or in a tuple converts where it stands, compiled; the body serves it.

## F-382 "A `typecase` arm whose name names no type is a static error on both paths"

Claims:
1. A `typecase` arm whose name names no type is a static error on both paths, 'X is undefined.' — both paths: typecase arm names — property
2. An arm at a type parameter in scope tests against its static argument — both paths: typecase arm names — property
3. The disambiguator resolves a clause's type as every other type, so a bare arm `Id =>`, or a name in an arrow type or static argument inside the arm, that names nothing in scope is a static error (`TypeDisambiguator.java`) — both paths: typecase arm names — property
4. So a binder over every value is written `x: Any =>` — both paths: typecase arm names — property
5. An element of a tuple of names, `(x, y) =>`, is the team's binding form and binds — both paths: typecase arm names — property
6. So under walk an undefined name there takes a value of every type (row 1064) — walk: typecase arm names — defect (row 1064, CONTESTED)
7. Tests: three walk tests and three compiled tests — both paths: typecase arm names — tests
8. Detail in `rung-typecase-unbound-arm/REPORT.md` — both paths: typecase arm names — pointer

Overlap:
- 1, 3: F-379 ("a case arm at one of those names is refused on both paths, 'Int is undefined.' (row 959, fixed; F-382)"); F-361 ("such as `Int`, matches every value with no message (row 959)"). Searched [is undefined], [row 959], [TypeDisambiguator].
- 2, 4, 5: none found. Searched [x: Any =>], [tuple of names].
- 6: none found in FACTS. Searched [row 1064]. Skill: `revival-changes.md:91`.

Checks: sound as checked; row 1064 CONTESTED, which the entry states as a plain consequence; the scout records it as agreeing ("for every row it calls a limit or gap the status is open").

Shape: one subject (both paths: typecase arm names), with walk's gap.
Title: an undefined typecase arm name is a static error on both paths; the body serves it.

## F-384 "The code generator's kind environment holds the static parameters in scope"

Claims:
1. The code generator's kind environment holds the static parameters in scope where it reads a declaration's types: a type's inherited methods with the type's static parameters and `where` clause, a generic body with its own — the code generator: kind environment — property
2. `forTypecase` binds each name of a clause's tuple pattern to its element on the compiled path — the code generator: typecase bindings — property
3. So a generic trait's member under a `where`-clause `comprises`, a call of it in a generic body, and a `typecase` of `app`'s form whose arms call no method on an intersection-typed name compile and run (rows 812, 822, 1066, fixed) — the code generator: kind environment — history
4. A method call on a name typed by an intersection compiles by F-386's cast — the code generator: intersection receivers — pointer
5. No test calls such a method on a tuple pattern's name, the form of `app`'s arms 2 and 3 — the code generator: typecase bindings — detail
6. F-34 gives the code generator's measure on the one library since this repair — the code generator: measure on the one library — pointer
7. A clause's name bound at a trait above its selector's object type fails verification at a method call on it (row 1067) — the code generator: typecase bindings — defect (row 1067)
8. Tests: three compiled tests — the code generator: kind environment — tests
9. Detail in `rung-kind-env-generic/REPORT.md` — the code generator: kind environment — pointer

Overlap:
- 1: F-181 and F-281 ("compiles where a listed generic type gives a member's body (row 812, fixed; F-384)"); F-184 (`T is not in the kind env` for a generic object without static arguments); F-365 (the checker's kind environment). Searched [kind env], [row 812], [row 822], [row 1066].
- 2: F-386 (the one library's `app` and a `typecase` binder's intersection). Searched [forTypecase], [`app`].
- 7: none found in FACTS. Searched [row 1067]. Skill: `compiler.md:157`.

Checks: sound as checked; rows 812, 822, 1066 FIXED, row 1067 NEGATIVE-VERIFIED, agree.

Shape: several subjects (the code generator: kind environment; the code generator: typecase bindings).
Title: two facts joined by "and", the kind environment and the tuple-pattern names; the body serves both.

## F-385 "The class loader chooses a compiled call's opcode from the owner's class file, without loading the owner"

Claims:
1. Where an instantiated template calls a method by `invokeinterface` on a type that becomes a plain class name, `MethodInstantiater.visitMethodInsn` reads `ACC_INTERFACE` from that name's class file and uses `invokevirtual` for a class — the compiled runtime: class loader instantiation — property
2. So an object that lists a self-typed trait first runs a default body that calls a method on a value of the self-type parameter (row 1052, fixed) — the compiled runtime: class loader instantiation — history
3. By reading, not measured nor tested: the read keeps no cache, so each such call site of each expansion reads a class file — the compiled runtime: class loader instantiation — property
4. By reading: a class that the loader generates has no class file and is loaded as before, so a generic object that lists a self-typed trait first may still fail as row 1052 did — the compiled runtime: class loader instantiation — defect (no open row; row 1052 FIXED)
5. Test `compiler_tests/SelfTypeParameterReceiverRun` — the compiled runtime: class loader instantiation — tests
6. Detail in `rung-self-arm-closure/REPORT.md` and `reviews/batch-33-review.md` — the compiled runtime: class loader instantiation — pointer

Overlap:
- 1, 3: F-39 (a change to `MethodInstantiater`, measured, not landed); F-129 (`MethodInstantiater.java:225-237`, a size). Neither says the same. Searched [MethodInstantiater], [invokeinterface], [invokevirtual].
- 4: F-225 ("where the object lists the trait first (row 1052, fixed); F-385 gives how, and the generic object for which …"). Searched [row 1052]. Skill: `revival-changes.md:41` says no test covers the generic object (row 1052), though row 1052 is FIXED (scout item 5).

Checks: sound as checked; claims 3 and 4 are "by reading" in the entry itself; the scout notes the skill's sentence on row 1052.

Shape: one subject (the compiled runtime: class loader instantiation).
Title: the opcode from the owner's class file; the body serves it.

## F-386 "A dotted call on a value whose static type is an intersection … compiles as a call on the conjunct"

Claims:
1. A dotted call on a value typed by an intersection in which no conjunct lies below the others compiles as a call on the conjunct that has the declaration the checker chose — the code generator: intersection receivers — property
2. Such a type comes from a call typed by the intersection of its candidates' return types (P-60) and from a `typecase` binder whose arm's type is neither below nor above the selector's — the checker: intersection types — property
3. The code generator casts the receiver to that conjunct, the most specific where several qualify, else the first; the value's own method runs, as under walk — the code generator: intersection receivers — property
4. Where the conjuncts are two instances of one generic trait, as in `app`, the choice changes no answer, by reading (P-43); no test calls such a method — the code generator: intersection receivers — property
5. A getter goes to a conjunct whose method of that name takes no argument; a method overloaded across conjuncts and a generic method compile too — the code generator: intersection receivers — property
6. On the one library this emits `__filter` — the code generator: measure on the one library — detail
7. The checker refuses a method of a type parameter's bound on such a value where a conjunct is the parameter (row 1072) — the checker: intersection types — defect (row 1072)
8. Tests: two compiled tests — the code generator: intersection receivers — tests
9. Detail in `rung-intersection-receiver/REPORT.md` — the code generator: intersection receivers — pointer

Overlap:
- 1, 3, 5: F-384 ("A method call on a name typed by an intersection compiles by F-386's cast"). Searched [intersection], [__filter].
- 2: F-76 ("by the intersection of the return types of its most specific declarations"); F-408 ("P-60's tie is typed by its intersection"); F-175 (the specification's reading, "its type is the intersection of its most specific declarations' return types"); F-227 (a closed trait among an intersection's conjuncts). Searched [intersection].
- 4: F-44 (the exclusion rule, P-43). Searched [two instances of one generic trait].
- 7: none found in FACTS. Searched [row 1072]. Skill: `compiler.md:158`.

Checks: sound as checked; row 1072 NEGATIVE-VERIFIED agrees.

Shape: one subject (the code generator: intersection receivers), with the checker's source of such types and its gap.
Title: a call on an intersection-typed receiver goes to the chosen declaration's conjunct; the body serves it.

## F-387 "The compiled path compiles a primary whose math items all apply in turn to its front"

Claims:
1. The compiled path compiles `x[5]^2` as `(x[5])^2` and `g[1][2]` as `(g[1])[2]`, and `x[5]k` as `(x[5]) k` — the checker: subscript as a math item — property
2. The checker checks the one application that the reassociation leaves, at the expected type, and writes each subscript as a call of the subscript operator's method (`Operators.scala`) — the checker: subscript as a math item — property
3. Walk runs these forms too (F-398), so a program for both paths may write them unparenthesised — both paths: subscript as a math item — pointer
4. Test `SubscriptThenSuperscriptCompiled.test` — the checker: subscript as a math item — tests
5. Detail in `rung-checker-small-gaps/REPORT.md`, item 2 — the checker: subscript as a math item — pointer

Overlap:
- 1, 2: F-398 ("`x[5]^2` is `(x[5])^2` … under walk as on the compiled path (F-387)"); F-363 (a superscript after a subscript, and `B.data[5]^2`). Searched [math item], [x[5]]. Skill: `tests-writing.md:34`.

Checks: sound as checked.

Shape: one subject (the checker: subscript as a math item).
Title: the compiled reassociation of math items after a subscript; the body serves it.

## F-388 "The compiler's prelude declares its seven number types as value objects"

Claims:
1. `ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64`, `RR32` and `RR64` are `value object`s in `CompilerBuiltin` — the library: the compiler's prelude — property
2. Each object's class extends the abstract payload class `compiler/runtimeValues/F<T>`, which holds the JVM value — the code generator: number value objects — property
3. Descriptors, stamped instances and the RTTI's `className()` name the type by the payload class, while the RTTI's class stays the object's, so the type lies below its traits at run time — the compiled runtime: number value objects — property
4. A dotted call casts its receiver to the object's class — the code generator: number value objects — property
5. `F<T>.make` reaches the object class's `make` by the name that `LibraryNames` gives; under the selection the code generator writes the one library's seven over the same payload classes, by the second set's `LibraryNames` (F-396) — the compiled runtime: number value objects — property
6. So a program's object below a number type is refused at the compile — the checker: number value objects — property
7. An overloading at `ZZ32` beside one at a program's trait is valid — the checker: number value objects — property
8. A `typecase` clause at such a trait over a number is refused as unreachable (row 1081) — the checker: number value objects — defect (row 1081, CONTESTED)
9. A number type named as a value does not compile (row 1082) — the code generator: number value objects — defect (row 1082)
10. Tests: three compiled tests — the code generator: number value objects — tests
11. Detail in two reports, "The design as built (a point to report)" — the code generator: number value objects — pointer

Overlap:
- 1: F-379 ("the compiler's prelude declares the same seven as value objects (F-388)"); F-359 (the prelude's number types were objects, then traits: their history). Searched [value object], [CompilerBuiltin], [prelude … seven].
- 2, 3, 5: F-302 ("the class of its value object, over the payload class `FZZ32`"); F-353 ("its seven number types need no second set, since their payload classes over `FValue` serve the object classes"); F-396 ("objects whose classes the code generator writes over payload classes"); F-136 ("name the type alike, by its payload class (F-388)"); F-301 ("`make` now calls the `make` of the number's value object"). Searched [payload class], [LibraryNames].
- 6, 7: none found. Searched [object below a number type].
- 8: none found in FACTS. Searched [row 1081]. Skill: `compiler.md:148`.
- 9: F-395 ("the compiled path's refusal of a number type named as a value (row 1082) has no site there"). Searched [row 1082].

Checks: sound as checked; the scout notes `F<T>` as a placeholder (the classes `FZZ32` … `FRR64` exist); row 1081 CONTESTED, row 1082 NEGATIVE-VERIFIED, agree by the scout.

Shape: several subjects (the library: the compiler's prelude; the code generator: number value objects; the compiled runtime: number value objects; the checker: number value objects).
Title: the prelude's number types as value objects over payload classes; the body serves it.

## F-389 "The code generator names the class of a function expression or a local function by its component and its source span"

Claims:
1. The code generator names a closure's class by its component and source span, and a later one at a span already named takes `#2`, `#3`, in the order the code generator meets them — the code generator: closure class names — property
2. Closures share a span in three forms: a conditional operator's thunk and a reduction that is its operand, a binding `if`'s else thunk over a reduction, and an arrow coercion's wrapper around a function expression; the thunk or wrapper keeps the plain name — the code generator: closure class names — detail
3. The names are made once per compile of a component (`NamingCzar.gensymArrowClassName`, `CodeGen.closureClassNames`), so they are the same from compile to compile and under another identity-hash mode — the code generator: closure class names — property
4. So F-34's measure emits the one library's `LexicographicOrder` — the code generator: measure on the one library — history
5. Tests: three tests — the code generator: closure class names — tests
6. Detail in `rung-closure-name-once/REPORT.md` — the code generator: closure class names — pointer

Overlap:
- 1, 2: F-352 ("a closure class written twice (row 315)"); F-320 (a block's local functions as closure classes). Searched [closure class], [gensym], [#2].
- 3: F-354 ("Under another hash mode 18 of `CompilerBuiltin`'s 312 classes differ": the order of methods, a related claim of determinism). Searched [hash mode], [hashCode].

Checks: sound as checked.

Shape: one subject (the code generator: closure class names).
Title: closure classes named by component and span, with `#2` for a shared span; the body serves it.

## F-397 "A numeral with a radix point keeps its digits as written"

Claims:
1. A radix-point numeral keeps its digits as written in the node that both paths read, so its digit count `n` counts leading zeros: `00.5` is `RadixPointNumeral[\3, 1, 10, 5\]` — both paths: numeral digit counts — property
2. It builds P-174's digit count — both paths: numeral digit counts — pointer
3. `ExprFactory.makeFloatLiteralExpr` removes only apostrophes and U+202F, as `makeIntLiteralExpr` does, and `NumeralNumbers.of` counts `n` from that text for both paths; the value, `m` and `v` are read as before — both paths: numeral digit counts — detail
4. A message that quotes the numeral shows it as written — both paths: numeral digit counts — property
5. A folded `MIN`, `MAX` or `|x|` whose answer is a written radix-point operand keeps that operand's text, and a folded `+` takes its value's digits — both paths: numeral folding — property
6. This rule for folded constants is a worker's choice, not a decision of the curator — both paths: numeral folding — choice
7. No coercion reads a folded constant's numbers (P-174) — both paths: numeral folding — property
8. Tests: one walk, one compiled — both paths: numeral digit counts — tests
9. Detail in `rung-radix-point-leading-zeros/REPORT.md` — both paths: numeral digit counts — pointer

Overlap:
- 1, 4: F-57, F-79, F-131, F-341, F-342 and F-345 name `RadixPointNumeral[\n, m, r, v\]`; none counts leading zeros. F-402 keeps leading zeros of a natural numeral concatenated by `||`. Searched [RadixPointNumeral], [leading zeros], [NumeralNumbers], [makeFloatLiteralExpr]. Skill: `revival-changes.md:93` gives the four numbers, without leading zeros.
- 5, 7: F-339 (both paths fold an expression of numerals alone exactly, `MIN`, `MAX`); F-347 (a coercion of the four numbers at a folded place). Searched [folded constant], [MIN].
- 6: none found. Searched [worker's choice] with [folded].

Checks: sound as checked.

Shape: several subjects (both paths: numeral digit counts; both paths: numeral folding), with a worker's choice.
Title: a radix-point numeral's digit count counts leading zeros; the body serves it, and adds the digits of folded constants.

## F-398 "Walk applies a subscript that is a math item with all its indices, and binds a tuple binding's names from one run of its right side"

Claims:
1. Under walk `x[5]^2`, `m[3,7]^2`, `g[3][7]` and `x[5]k` reassociate as on the compiled path (F-387) — walk: subscript as a math item — property
2. `evalAndInvokeMethod`, the one helper of `mathItemApplication`, evaluates every index as `forSubscriptExpr` does (`Evaluator.java:1069-1071`) — walk: subscript as a math item — detail
3. A tuple binding at the top level or as a field runs its right side once: a tuple expression of as many elements binds each name to its own element, and any other right side binds a temporary at the names' types, read through the desugarer's `Local` or `Member` reference — walk: tuple bindings — property
4. Source lines of `DesugarerVisitor.java` — walk: tuple bindings — detail
5. Walk does as the compiled path does (F-369) — walk: tuple bindings — pointer
6. A numeral converts to its name's declared type, as at a single binding — walk: tuple bindings — property
7. Where such a right side does not convert, walk's message names the temporary, not the name — walk: tuple bindings — property
8. This message is a worker's choice, not a decision of the curator — walk: tuple bindings — choice
9. An array literal inside a right side that is not a tuple expression, bound at an array type, is not built and stops at load (row 1105) — walk: tuple bindings — defect (row 1105)
10. So a program for both paths writes these forms unparenthesised, and binds a call's tuple to names directly — walk: tuple bindings — property
11. Tests: four walk tests — walk: tuple bindings — tests
12. Detail in `rung-walk-subscript-tuple-binding/REPORT.md` — walk: tuple bindings — pointer

Overlap:
- 1: F-387 (the compiled twin); F-363 (`B.data[5]^2`). Searched [math item], [x[5]], [Superscript]. Skill: `tests-writing.md:34`.
- 3, 6, 10: F-369 ("Under walk the same right side runs once too: a tuple expression binds each name to its own element, and any other right side binds a temporary at the names' types (F-398)"). Searched [tuple binding], [right side], [runs once].
- 7, 8: none found. Searched [*tuple_], [names the temporary].
- 9: none found. Searched [row 1105].

Checks: sound as checked; row 1105 NEGATIVE-VERIFIED agrees.

Shape: several subjects (walk: subscript as a math item; walk: tuple bindings), with a worker's choice.
Title: two unrelated walk repairs joined by "and"; the body serves both halves, which share only the batch.

## F-399 "The dispatch method of a trait's or an object's functional method reads each argument at its own local, wherever self stands"

Claims:
1. The dispatch method of a trait's or object's functional method is an instance method of the receiver's class, with self in local 0 and the other arguments after it in their order — the code generator: functional method dispatch — property
2. `OverloadSet.argumentLocal`, overridden in `ForTraitOrObject`, gives an argument before self's place the local after its own place, for type tests and casts alike — the code generator: functional method dispatch — property
3. Line numbers in `OverloadSet.java` — the code generator: functional method dispatch — detail
4. A call reaches the dispatch method where the declaration that the top-level dispatch chooses has a more specific one below it in the type; a declaration with none below is called at its exact signature — the code generator: functional method dispatch — property
5. It does not reach a generic functional method overloaded beside a plain one, on which the code generator stops first (row 724) — the code generator: functional method dispatch — defect (row 724)
6. Nor a generic functional method with self not first, which dies elsewhere (row 594) — the code generator: functional method dispatch — defect (row 594)
7. So an object or trait may overload an inherited functional method with self anywhere — the code generator: functional method dispatch — property
8. Tests: four compiled tests — the code generator: functional method dispatch — tests
9. Detail in `rung-self-not-first-dispatch/REPORT.md` — the code generator: functional method dispatch — pointer

Overlap:
- 1, 2, 4, 7: F-372 ("A functional method with self not first is written once … its dispatch method reads each argument at its own local (F-399)"); F-325 (the call takes the resolved declaration's dispatch method); F-409 (a dispatch method among inherited declarations). Searched [dispatch method], [argumentLocal], [self not first].
- 5, 6: none found. Searched [row 724], [row 594].

Checks: sound as checked; rows 594 and 724 NEGATIVE-VERIFIED agree.

Shape: one subject (the code generator: functional method dispatch).
Title: the dispatch method reads each argument at its own local wherever self stands; the body serves it.

## F-400 "The code generator compiles the modifier `override` … and the checker refuses an `override` that overrides nothing"

Claims:
1. The code generator compiles `override` by the checker's table of what an override keeps from being inherited — the code generator: override — property
2. A class holds the override and, at each hidden declaration's JVM signature, a bridge that runs it; no method runs the hidden declaration, and a dispatch over the override and the declarations it does not override is still written — the code generator: override — property
3. Source names and lines: `overriddenNotProvided`, `overrideBridges`, `dumpOverloadedMethodChaining` — the code generator: override — detail
4. The checker refuses an `override` in no overriding pair of `providedAndOverridden`, equal parameter types included, as the traits chapter and walk do, with its message — the checker: override — property
5. An override of or by a method with static parameters of its own, and one in a generic type whose parameter types name a static parameter, stay code-generator walls (row 1106) — the code generator: override — defect (row 1106)
6. The checker refuses an override that overrides a declaration inherited under a conditional extension only by the clause's bound, which walk runs (row 1107) — the checker: override — defect (row 1107)
7. The checker does not check an override in an object expression (row 1108) — the checker: override — defect (row 1108)
8. Under walk an object's override hides every inherited declaration of its name (row 1109) — walk: override — defect (row 1109)
9. So a program may write `override` on the compiled path wherever no static parameter is involved — the code generator: override — property
10. Tests: three compiled tests — the code generator: override — tests
11. Detail in `rung-override-compiled/REPORT.md` — the code generator: override — pointer

Overlap:
- 1, 2, 9: F-88 ("The code generator compiles `override` by the same reading (F-400)"); F-315 (the guard of modifiers admits `override`); F-409 (bridges written only where the class needs them). Searched [`override`], [overrideBridges], [providedAndOverridden].
- 4: F-147 ("Walk refuses an `override` that overrides nothing"); F-142, F-145 (walk's checks around `override`). Searched [`override`]. Skill: `revival-changes.md:32`, `compiler.md:84`.
- 5 to 8: none found. Searched [row 1106] to [row 1109].

Checks: sound as checked; rows 1106 to 1109 NEGATIVE-VERIFIED agree.

Shape: several subjects (the code generator: override; the checker: override; walk: override).
Title: compiled `override` and the checker's refusal of an override of nothing, joined by "and"; the body serves both.

## F-401 "An exit out of an `atomic` block commits the block's transaction and keeps its writes, on both paths"

Claims:
1. An exit out of an `atomic` block commits the block's transaction and keeps its writes, on both paths — the compiled runtime: transactions — property
2. Compiled, `BaseTask.leaveTransaction` commits on a `LabelExit` as `endTransaction` does; walk's `FortressTaskRunner.doItOnce` commits on a `LabelException` as at a normal end (with lines) — walk: transactions — detail
3. A commit that fails runs the block again, and an exception other than an exit still discards the writes — the compiled runtime: transactions — property
4. A nested block's commit hands its writes to the outer one, whose commit on the same exit stores them — the compiled runtime: transactions — property
5. Neither path tells an exit to an enclosing label from one to a completed label block, so such a late exit also commits the atomic blocks it passes (row 1041) — the compiled runtime: transactions — defect (row 1041, CONTESTED)
6. Under walk an exit or an exception out of a `tryatomic` block that no `atomic` block encloses is wrapped in a `RuntimeException` and reaches neither its label nor a `catch` (rows 1110, 1111) — walk: transactions — defect (rows 1110, 1111)
7. So a program may exit out of an atomic block (`atomic.tex:59-63`) — the compiled runtime: transactions — property
8. Tests: one walk, one compiled — the compiled runtime: transactions — tests
9. Detail in `rung-exit-out-of-atomic/REPORT.md` — the compiled runtime: transactions — pointer

Overlap:
- 1, 3, 4: F-351 ("The block's handler takes every exception (`BaseTask.leaveTransaction`) … commits the transaction on an exit, a `LabelExit`"); F-373 (points here). Searched [atomic], [leaveTransaction], [LabelExit].
- 5: F-373 (row 1041, an exit after its label block has completed). Searched [row 1041].
- 6: F-103 (cites `rung-tryatomic/REPORT.md`, the mechanism of expected failures, not this defect). Searched [tryatomic], [row 1110], [row 1111]: none found for the claim.

Checks: sound as checked; row 1041 CONTESTED, rows 1110, 1111 NEGATIVE-VERIFIED.

Shape: one subject, on both paths (the compiled runtime: transactions; walk: transactions).
Title: an exit out of `atomic` commits, on both paths; the body serves it.

## F-402 "Both paths fold two natural numerals of one radix joined by `||` into one natural numeral"

Claims:
1. Both paths fold two natural numerals of one radix joined by `||` into one natural numeral, before the checker: `deadc_16 || 0de_16` is `deadc0de_16`, digits in order, leading zeros kept — both paths: numeral folding — property
2. This follows the constant chapter (`constant.tex:80-82`), and the constant chapter's revision box states it — the specification: static numerals — property
3. The fold is in `IntegerLiteralFoldingVisitor.java` — both paths: numeral folding — detail
4. P-174 leaves out the binary chapter's numeral coercion and its `opr ||` with a numeral, and does not name this concatenation — the specification: static numerals — property
5. Folding it is a planner's default that rung F built (batch 29's fork F4, with rung T's text, fork T2), not a decision of the curator — both paths: numeral folding — choice
6. The way not taken drops it, so that `deadc_16 || 0de_16` finds no `||`, as on the base under walk — both paths: numeral folding — history
7. Tests: one walk, one compiled, one JUnit — both paths: numeral folding — tests
8. Detail in `coordinator/CLIMB-BATCH-29.md`, point 2 — both paths: numeral folding — pointer

Overlap:
- 1, 3: F-339 (both paths fold an expression of numerals alone exactly); F-343 ("a concatenation by `||` of string and character literals is one string literal"); F-262 (`IntegerLiteralFoldingVisitor.java`, a numeral's sign). Searched [`||`], [IntegerLiteralFolding], [concatenat], [leading zeros]. Skill: `revival-changes.md:64`, `:101` (strings only).
- 2, 4: F-345 ("The binary chapter's numeral declarations are expressible now and left out"; "The constant chapter gives the fold"). Searched [constant.tex], [binary chapter].
- 5: none found. Searched [fork F4], [planner's default] with [||].

Checks: sound as checked.

Shape: one subject (both paths: numeral folding), with a planner's default and its history.
Title: the fold of two natural numerals by `||`; the body serves it.

## F-403 "The one library declares `EQV` (`≡`) and `NEQV` (`≢`) over two booleans"

Claims:
1. The one library declares `EQV` and `NEQV` over two booleans as top-level operators beside `<->`, and walk and the compiled path under the one library run them — the library: boolean equivalence — property
2. On a program's own objects each is a type error — the library: boolean equivalence — property
3. `EQV`'s body is `if a then b else NOT b end`, which calls no `=`, and `NEQV`'s is `NOT (a EQV b)`, the specification's definition — the library: boolean equivalence — detail
4. The specification and the compiler's prelude write both as methods of `Boolean`; the one library keeps top-level operators for the boolean operators, within P-37 — the library: boolean equivalence — property
5. That form is a default of the batch's plan, which the curator has not decided — the library: boolean equivalence — choice
6. The messages under walk and compiled for `a ≡ b` on a program's objects — the library: boolean equivalence — detail
7. Under walk, a program that imports `AplCore` gets its `≡` and `≢` over `RR64` and arrays in one overload set with the library's two; its own calls give what they gave, and `t ≡ f`, `t ≢ f` print `false`, `true` — walk: overload sets across imports — property
8. No gated program and no line of microGPT imports `AplCore` — the repository: microGPT's lines — detail
9. That one overload set is what P-181 asks: every visible declaration of the name — walk: overload sets across imports — pointer
10. Under walk an equivalence operator that nothing declares, as `APPROX`, loads and stops at its call with an internal error (row 1118) — walk: undeclared operators — defect (row 1118)
11. The one library declares none of `Boolean`'s `⊕`, `⊼` and `⊽`, and no library `majority` (row 1121) — the library: boolean operators — defect (row 1121)
12. Tests: one walk, one one-library test — the library: boolean equivalence — tests
13. Detail in `rung-boolean-equivalence/REPORT.md` — the library: boolean equivalence — pointer

Overlap:
- 1 to 4: none found in FACTS. Searched [EQV] (hits are `SEQV` only: F-299, F-324, F-326, F-328, F-341, F-343), [≡], [<->], [boolean operators], [P-37]. Skill: `revival-changes.md:57` states 1 and 2.
- 5: none found. Searched [P-37], [default of the batch's plan] with [Boolean].
- 7: F-408 (the checker departs from P-181). Searched [AplCore], [P-181].
- 10, 11: none found. Searched [row 1118], [row 1121], [APPROX], [majority].

Checks: sound as checked; rows 1118 and 1121 NEGATIVE-VERIFIED agree.

Shape: several subjects (the library: boolean equivalence; walk: overload sets across imports; walk: undeclared operators; the library: boolean operators), with a planner's default.
Title: the library's `EQV` and `NEQV` over booleans; claims 1 to 6 serve it, claims 7 to 11 do not.

## F-405 "Walk runs the generic dotted methods of one name that a trait or an object declares together"

Claims:
1. Walk runs the generic dotted methods of one name that a trait or object declares together, each as its instance at symbolic static arguments — walk: generic methods of one name — property
2. An object takes each generic method of a name with one symbolic instantiation per name and, per static parameter, kind and bounds, compared by position, not name (`Constructor.genericKey`) — walk: generic methods of one name — property
3. So an object's redeclaration of a trait's generic method at the same bounds under other names hides it, and two that differ in bounds are overloads — walk: generic methods of one name — property
4. Except bounds that differ only in the api of a type of one simple name (row 1134) — walk: generic methods of one name — defect (row 1134)
5. At load walk reads two such instances on their declared domains where one lies inside the other — walk: load check of overloads — property
6. A set whose overlap only a third covers is refused (row 1133) — walk: load check of overloads — defect (row 1133)
7. A nested pair of a generic trait's generic functional methods is refused when an extending object's first instance is made (row 780) — walk: load check of overloads — defect (row 780)
8. An object that inherits two such methods of one name from two traits, neither more specific, with no declaration at their meet, loads and runs, where the Meet Rule refuses the set (row 1139) — walk: load check of overloads — defect (row 1139)
9. A call that writes no static argument infers them and dispatches among the instances, the inner declared domain first — walk: generic methods of one name — property
10. A call that writes static arguments instantiates each generic method that takes them by number and kinds, and chooses among those instances by the arguments, as a top-level generic call does — walk: generic methods of one name — property
11. A call on a receiver assumed at the trait stops (row 1126) — walk: generic methods of one name — defect (row 1126)
12. Where a plain method shares the name with a generic one, a call that writes static arguments stops (row 744) — walk: generic methods of one name — defect (row 744)
13. Of two generic functional methods of one name and one number of parameters, the second is never chosen (row 1123) — walk: generic methods of one name — defect (row 1123)
14. Tests: four walk tests, one of which asserts walk's answers for row 1139's set — walk: generic methods of one name — tests
15. Detail in two reports — walk: generic methods of one name — pointer

Overlap:
- 1, 2, 3, 9, 10: F-253 ("a call of a generic method that writes no static argument infers …"; "differ only in the api of a type of one simple name … (row 1134, F-405)"); F-26 ("Its declared domain, walk's symbolic instance, …"; row 1134). Searched [genericKey], [symbolic], [generic … methods of one name].
- 4: F-26, F-253 (row 1134). Searched [row 1134].
- 5 to 8: F-257 ("as two functional methods of generic traits (row 780)"); F-252, F-375 (declared-domain readings at load); F-174 (rows 779 and 780 as the specification's departures). Searched [row 780], [row 1133], [row 1139], [Meet Rule].
- 11, 13: none found. Searched [row 1126], [row 1123].
- 12: F-248 ("`r.distribute[\L1\](q)` stops every fused pair (row 744)"). Searched [row 744].

Checks: sound as checked; rows 744, 780, 1123, 1126, 1133, 1134, 1139 NEGATIVE-VERIFIED agree.

Shape: several subjects (walk: generic methods of one name; walk: load check of overloads), mostly gaps: seven rows.
Title: walk runs generic dotted methods of one name as symbolic instances; the body serves it, with its load check and seven gaps.

## F-406 "A compiled setter's call passes its value at the field's type, and a compiled call of several declarations names an overload method that the class holds"

Claims:
1. The code generator passes the value of `c.t := v`, a call with no arrow, at the setter's parameter type at the receiver's instance (`CodeGen.setterParamType`), also on a receiver typed by a type variable whose bounds hold the setter, cast below self's trait where it has self's type (F-377) — the code generator: setters and overload methods — property
2. It writes the overload method that a call names where the checker leaves several declarations, its set split with its principal member (`for_RewriteFnOverloadDecl`) — the code generator: setters and overload methods — property
3. Where the call's arrow is not the principal member's, it writes a method at the call's signature that passes its arguments on (`forwardToPrincipal`) — the code generator: setters and overload methods — property
4. The written method is a default of the batch's plan, and the forwarder a worker's choice beyond the plan; the other way was to make each call through the trait; the curator has decided neither — the code generator: setters and overload methods — choice
5. So `c.t := High`, `s.r := self` at a listed type, `num(R)` beside `num(self)`, a call on `self` in such a trait, and a call taken by one declaration without coercion and another by a coercion run compiled — the code generator: setters and overload methods — property
6. The one library's `FortressLibrary` holds the overload methods `numerator{...}` and `denominator{...}` — the code generator: measure on the one library — detail
7. A comprised object's functional method at a narrower return type than its trait's type checks, since the signatures read `self` at the trait (F-408) — the checker: self at a listed type — property
8. Tests: four compiled tests — the code generator: setters and overload methods — tests
9. Detail in `rung-compiled-missing-methods/REPORT.md` — the code generator: setters and overload methods — pointer

Overlap:
- 1: F-377 ("An assignment from outside an object to its `var` field passes the value at the field's type, `self` at a listed type cast to it (F-406)"). Searched [setter], [setterParamType], [`var` field].
- 2, 3, 6: F-225 ("`Integral`'s `numerator`, which each integer type declares instead"), a related site only. Searched [overload method], [forwardToPrincipal], [numerator].
- 4: none found. Searched [beyond the plan] with [forwarder].
- 7: F-408 (the checker's choice among declarations at a listed type); F-225 (narrower return type in a self-typed trait). Searched [narrower return type].

Checks: sound as checked.

Shape: several subjects (the code generator: setters and overload methods; the checker: self at a listed type), with a planner's default and a worker's choice.
Title: two code-generator facts joined by "and", the setter's value type and the overload method; the body serves both.

## F-407 "A numeral coercion's four numbers convert where they stand, on both paths, a `ZZ` where nothing fixes a type"

Claims:
1. A numeral coercion's four numbers convert where they stand, on both paths, and are a `ZZ` where nothing fixes a type — both paths: numeral coercion bodies — property
2. It builds P-174's rule for a coercion's body, with P-173's conversion — both paths: numeral coercion bodies — pointer
3. Walk binds each as a static number whose default is a `ZZ` (`Numerals.java`), which converts where its place fixes a type as a folded constant does and is refused there when the place runs — walk: numeral coercion bodies — property
4. The checker types it `ZZ`, keeps it so at a call that a declaration takes so, converts it where its place fixes a bounded number type, also in a result position of a join, and refuses a number that does not fit, for a coercion of the numeral's own component — the checker: numeral coercion bodies — property
5. The code generator converts it from the `ZZ` — the code generator: numeral coercion bodies — property
6. So `ZZ32`'s coercion is `= v` and a byte type's `Byte(v)` — the library: numeral coercions — property
7. A number that does not fit, in another component's coercion, is not refused statically on the compiled path (row 1131) — the checker: numeral coercion bodies — defect (row 1131)
8. A number at a call runs the declaration that takes a `ZZ` on the compiled path (row 1132) — the checker: numeral coercion bodies — defect (row 1132)
9. Tests: three walk tests and two compiled tests — both paths: numeral coercion bodies — tests
10. Detail in `rung-numeral-coercion-body/REPORT.md` — both paths: numeral coercion bodies — pointer

Overlap:
- 1, 3, 4, 5: F-342 ("one of a numeral coercion's four numbers is a `ZZ` where nothing fixes a type and converts where a place fixes one"); F-341 (walk's numeral carries the four numbers, `Numerals.java`); F-347 ("filled once by the coercion's method of the four numbers as `ZZ` values"; "folds the body of the coercion"); F-340 ("folds the coercion's body"); F-74, F-79. Searched [four numbers], [coercion's body], [Numerals.java].
- 6: none found. Searched [Byte(v)], [= v].
- 7, 8: none found. Searched [row 1131], [row 1132].

Checks: sound as checked; rows 1131 and 1132 NEGATIVE-VERIFIED agree.

Shape: one subject (both paths: numeral coercion bodies), with a part for each path.
Title: a coercion's four numbers convert where they stand, a `ZZ` by default; the body serves it.

## Subject labels used, with their entries

- walk: dispatch by coercion: F-349
- both paths: numeral at a call: F-349, F-366
- the checker: numeral at a call: F-366
- walk: numeral at a call: F-366
- the library: equality operators: F-366
- both paths: the sum and product signs: F-362
- both paths: operator declarations in an api: F-362
- the repository: generated parsers: F-362
- the repository: microGPT's lines: F-362, F-363, F-366, F-369, F-403
- the harness and the gate: coverage of the sum sign: F-362
- both paths: superscript after a primary: F-363
- walk: postfix operators: F-363
- both paths: subscript as a math item: F-363, F-387
- the checker: subscript as a math item: F-387
- walk: subscript as a math item: F-398
- walk: generic function as a value: F-367
- the checker: generic function as a value: F-367
- walk: local generic functions: F-367
- the code generator: tuple bindings: F-369
- the checker: tuple bindings: F-369
- walk: tuple bindings: F-369, F-398
- the compiled runtime: top-level variable initialization: F-369
- the checker: microGPT's sites: F-369
- the code generator: inherited methods in a class: F-372
- the code generator: functional method dispatch: F-372, F-399
- the checker: inherited declarations on two paths: F-372
- the code generator: label and exit: F-373
- the compiled runtime: label and exit in tasks: F-373
- the compiled runtime: transactions: F-373, F-374, F-401
- walk: transactions: F-401
- the code generator: var fields: F-374
- the code generator: atomic expressions: F-374
- the checker: atomic expressions: F-374
- the library: value objects with var fields: F-374
- walk: load check of overloads: F-375, F-405
- walk: value types: F-375
- the code generator: casts of self: F-377
- the checker: self at a listed type: F-377, F-406
- the library: self-typed and closed traits: F-377
- the code generator: setters and overload methods: F-377, F-406
- the code generator: tuple parameters: F-378
- the compiled runtime: class loader instantiation: F-378, F-385
- the library: arrays of rank 2 and 3: F-378
- the checker: numeral conversion at its place: F-380
- both paths: typecase arm names: F-382
- walk: typecase arm names: F-382
- the code generator: kind environment: F-384
- the code generator: typecase bindings: F-384
- the code generator: intersection receivers: F-384, F-386
- the code generator: measure on the one library: F-384, F-386, F-389, F-406
- the checker: intersection types: F-386
- the library: the compiler's prelude: F-388
- the code generator: number value objects: F-388
- the compiled runtime: number value objects: F-388
- the checker: number value objects: F-388
- the code generator: closure class names: F-389
- both paths: numeral digit counts: F-397
- both paths: numeral folding: F-397, F-402
- the specification: static numerals: F-402
- the specification: coercion resolution: F-349
- the code generator: override: F-400
- the checker: override: F-400
- walk: override: F-400
- the library: boolean equivalence: F-403
- the library: boolean operators: F-403
- walk: overload sets across imports: F-403
- walk: undeclared operators: F-403
- walk: generic methods of one name: F-405
- both paths: numeral coercion bodies: F-407
- walk: numeral coercion bodies: F-407
- the checker: numeral coercion bodies: F-407
- the code generator: numeral coercion bodies: F-407
- the library: numeral coercions: F-407

## Entries that overlap

- The numeral at a call: F-366 with F-341, F-349, F-57, F-342; F-366's `1.0 s` with F-58; F-366's row 528 with F-139.
- A numeral coercion's four numbers and a numeral's conversion at its place: F-407 with F-341, F-342, F-347, F-340; F-380 with F-342, F-347.
- Math items after a subscript or a dotted primary: F-363, F-387, F-398 (three entries, one subject over both paths).
- Tuple bindings: F-369 with F-398 (the two paths), and F-58 (the model's lines 17 to 19 and 72).
- Generic function as a value: F-367 (walk) with F-365 (the checker).
- Exit and transactions: F-373, F-401, F-351, with row 1041 in F-373 and F-401.
- Inherited methods and dispatch methods in a compiled class: F-372, F-399, F-409, F-400 (bridges), F-88, F-325, F-354.
- Casts of self and listed types: F-377 with F-225, F-385, F-406, F-408.
- Intersection types: F-386 with F-384, F-76, F-408, F-175, F-227.
- The number value objects and payload classes: F-388 with F-379, F-302, F-353, F-396, F-136, F-301, F-395, and its history in F-359.
- Walk's load check of overloads: F-375 and F-405 with F-27, F-252, F-257, F-258, F-361, F-379, F-26, F-253, F-174 (rows 779 and 780).
- `override`: F-400 with F-88, F-147, F-142, F-145, F-315.
- Numeral folding: F-397 and F-402 with F-339, F-343, F-345.
- The sum sign at the model's lines: F-362 with F-58, F-59.
- Tuple parameters and arrays of rank 2 and 3: F-378 with F-89, F-91, F-291 (row 1056), F-393 (row 1054).
- Rows named by more than one entry: 322 (F-373, F-374), 340 (F-373, F-37), 641 (F-374, F-358, F-12), 890 (F-373, F-315), 307 (F-377, F-129, F-181, F-270), 744 (F-405, F-248), 780 (F-405, F-257, F-174), 1041 (F-373, F-401), 1044, 697, 550 (F-375, F-379), 1134 (F-405, F-26, F-253).

## What the search could not settle

- F-373, claim 10: the entry says that walk's `catch` of `Exception` takes an exit (row 1040); the skill (`compiler.md:151`, quoted by the scout) says a `catch` of the library's `LabelException` takes it under walk. Whether these differ was not judged.
- F-385, claim 4, and the skill's `revival-changes.md:41`: the skill says no test covers the generic object of row 1052, while row 1052 is FIXED; whether the generic object's case needs a row of its own was not judged.
- F-382 (row 1064), F-388 (row 1081), F-373 (rows 1041, 1042) and F-401 (row 1041) name CONTESTED rows; the scout counts the entries' words as agreeing, and the list of stale claims holds nothing for them, unlike F-175 in chunk `spec`. Whether each entry should say "contested" was not settled.
- F-366, claim 3: whether the curator's words of 2026-11-16 ("Good. Makes sense.") make the subtyping order a decision or leave it a worker's choice; the entry and the scout both say it is no stated decision.
- Every behavioural claim of this chunk: no source read it against the tree (the list of stale claims, last section), so "sound as checked" means only that the cited items exist.
