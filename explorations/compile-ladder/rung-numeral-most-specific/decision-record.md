<!-- The specification's passages that rung N of climb batch 32 changed, each with its original and new text, the reason and the way back. -->
# Decision record: a numeral at a call goes to the most specific declaration that takes it

The decision is P-46, with P-49 and P-173: at a call, a numeral is applicable to a parameter that fixes no type, at its default, and to a parameter whose type declares a coercion from the numeral's type, by that coercion; among the applicable declarations the most specific runs, and where two are not ordered, the one that the default fits. The Appendix I entry is `revival-numerals` (`Specification/appendices/changes.tex:5010`), which the three passages below belong to; no new entry was made, since the passages are that entry's own.

## 1. `Specification/basic/conversions-coercions.tex`, section "Principles of Coercion", `:111-135`

**The text before** (`:111-117` at db352c1776):

> At a call, a numeral is applicable without coercion to a parameter of its default type and to a parameter of a type that fixes no type for it; its conversion into any other type is a coercion (\secref{applicability-with-coercion}). So of the declarations h(x: ZZ32) and h(x: Any), both applicable to h(5) without coercion, the call invokes the first, which is the more specific.

**The text now.** A numeral is applicable to a parameter of its default type and to one that fixes no type, at its default, and to a parameter whose type declares a coercion from the numeral's type, by that coercion. Among the declarations applicable so, where every other argument is applicable without coercion, the call invokes the most specific on the parameter types they declare (\secref{resolving-overloading}); where two are not ordered, the one that the numeral's default fits. Four examples follow: `h(5)` as before; `k(5)` for `k(x: NN32)` beside `k(x: Any)`, which invokes the first; `u = 0`; `f(1.5)` for `f(x: RR32)` beside `f(x: RR64)`, which invokes the second; and `a = 0` for `a: Any`, where the numeral takes its default.

**The callout** `\revision{revival-numerals}` of the paragraph (`:137-154`) gains the decision of 10 November 2026 and what the paragraph said until then.

**The reason.** P-46: "`u = 0` is `true` for `u: NN32 = 0`, and no way that answers `false` is accepted". Before the change the library's `=` over `(Any, Any)` took the numeral at its default and answered `false` by `SEQV` (rows 973 and 966).

**What the text fixes that the decision's words leave open.** "The most specific" is read on the declared parameter types by subtyping, the order of \secref{resolving-overloading}, between a declaration that fits the numeral at its default and one that the numeral's coercion reaches. The coercion chapter's own relation, under which `RR32` is more specific than `RR64` because it coerces to it, is not used there: it would send `f(1.5)` to `f(x: RR32)` and so change what a float numeral's default chooses, which the rung's section reserves. Both implementations are built so (`ProjectFortress/compiler_tests/NumeralMostSpecificCompiled.fss`, `ProjectFortress/tests/NumeralMostSpecificWalk.fss`, the assertion on `width(1.5)`).

**The way back.** Restore the two sentences above; in `scala_src/typechecker/impls/Functionals.scala` drop `numeralAttempt` and its call at the end of `typedApplicationOfChecked`; in `interpreter/evaluator/values/OverloadedFunction.java` drop `belowByNumerals` and its call in `bestMatchForNumerals`; give the two walk tests their expected-failure names again.

## 2. `Specification/appendices/changes.tex`, entry `revival-numerals`, the Effect, `:5293-5313`

**The text before** (`:5286-5298` at db352c1776): a numeral compared by `=` with a number of a type that declares no `=` with the numeral's default type meets the top-level `=` of the libraries; the interpreter answers `u = 0` false and `u =/= 0` true for a zero `u` of `NN32`, `NN64` or `RR32` (rows 966 and 973), "and whether `u = 0` is true is open"; the compiled path's own library declares `=` and `=/=` on each integer type.

**The text now.** The numeral goes to the `=` of the number's type; both implementations answer `u = 0` true and `u =/= 0` false, with the tests named; `Equality` declares `=/=` as the negation of the type's own `=`. One departure is named: the interpreter reads the rule on the value, so for `a: Any` holding a zero `NN32` it answers `a = 0` true (the new row of the gap ledger and the expected failure `ProjectFortress/tests/XXXNumeralBesideAnyWalk.fss`).

**The Rationale** of the entry (`:5121-5126`) gains the decision of 10 November 2026.

**The way back.** Restore the clause; the departure's row and test go with the rule.

## 3. `Specification/appendices/changes.tex`, entry `revival-numeral-type`, the Effect, `:3817-3825`

**The text before** (`:3817-3825` at db352c1776): inequality was not stated in pairs: the top-level `=/=` over `Any` receives the numeral at its default, so on the interpreter `u =/= 0` is true for a zero `u` of `NN32` or `NN64`.

**The text now.** `Equality` declares `=/=` beside `=`; a numeral beside a value of a type that extends `Equality` goes to that declaration, converted into the value's type; `u =/= 0` is false and `u = 0` true.

**The reason.** The library's `Equality[\T\]` gains `opr =/=(self, other:T): Boolean = NOT (self = other)` (`Library/FortressLibrary.fss:102`), by the Working Draft's sentence that `e =/= e'` is `NOT (e = e')` (`Specification/basic/operators/opr-overview.tex`, subsection "GCD, LCM, and CHOOSE Operators", its last sentence).

**The way back.** Remove the declaration from `Library/FortressLibrary.fss` and `.fsi`, and restore the sentence.

## The front matter

`Specification/fortress/preamble.tex`'s paragraph on the revision is not made false: it names no rule of a numeral at a call.

## Added by the gather: the sentences that stated the old order

The rung's `REPORT.md`, section 8, lists the sentences outside its section that the rule makes false. The gather of climb batch 32 gave each the numeral's exception in one sentence or clause, in the rung's commit on `main`, and added `\secref{resolving-coercion}` to the affected sections of `revival-numerals`. No sentence of the Working Draft is removed or reworded; each addition is new text beside it.

- `Specification/basic/conversions-coercions.tex`, "Coercion Resolution": after the opening paragraph's order of attempts, a sentence that a numeral's own coercion is the one exception; in the callout `revival-overloading` of that paragraph, the decision of 10 November 2026; and after "to determine which element of Σ is called", the clause on an element of Σ' that only the numeral's own coercion puts there.
- `Specification/basic/inference.tex`, "The Static Arguments of a Call", *Choice*: after "it never changes which declaration is chosen when one is applicable to the call without it", the exception; and in "The Default of a Numeral", the tie rule's clause now reads "in the choice among declarations that are applicable to a call with a numeral only with coercion and that would otherwise be tied, whether they differ at the numeral alone or at another argument too" (fork N2), where it read "applicable to the call only with coercion and that the numeral would otherwise leave tied".
- `Specification/appendices/changes.tex`: the Rationales of `revival-inference` and `revival-overloading`, each after its statement of the decision of 28 September 2026; and the Effect of `revival-numeral-type`, whose sentence on a numeral beside a value of an integer type gains "or where the one that is applicable is less specific than that type's own".

**The way back.** Remove the additions with the rule (section 1).

