# Record lines: climb batch 12, rung C (`rung-checker-contexts`)

## FACTS

Rewrite in place the entry of "The checker and the one library" whose title begins "The compiled checker gives a call its expected type in a clause of an `if` without `else`". Its new text:

- **The compiled checker gives a call its expected type in these contexts: a clause of an `if` without `else` (`()`), a block's last expression after local declarations, a `typecase` clause, a loose juxtaposition, an operator repeated between three or more operands, and the body of a `label` and its exits' `with` values. It renames an inherited method's own static parameters apart from the receiver's static arguments, and it checks a written static argument of a method against its bounds with the written arguments put in** (`compile-ladder/rung-checker-expected-type/REPORT.md`, `compile-ladder/rung-checker-contexts/REPORT.md`; rows 560, 627, 642, 644 and 651 fixed).
  - The sites in `impls/Misc.scala`: `:583-584` (the `if` without `else`); `:326`, `:340` and `:662-667` (the `typecase`); `:704-739` (the `label`). The label's body gets the type directly. Each exit's `with` value gets it through the label's entry in `labelExitTypes`, a `LabelExitTypes` that keeps the expected type (`:994`).
  - The other sites: `impls/Decls.scala:51-58` (`checkLetBody`), `impls/Operators.scala:170-197` (the loose juxtaposition) and `:382-393` (the repeated operator). In both of the last two, whether the multifix application applies is decided without the expected type. The type is then given to the multifix application where it fits, and otherwise to the left-associated binary fallback.
  - `STypesUtil.instantiateMethodApart` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1822-1863`) instantiates each method that `commonInheritedMethods` returns. It first renames to `name$i` each of the method's own static parameters whose name the arguments mention, so the method invocation and a call by name inside a trait are repaired alike.
  - `staticArgsMatchStaticParamsForApp` (`STypesUtil.scala:771-800`) puts the written arguments into each bound with a `StaticTypeReplacer`, as `TypeWellFormedChecker.scala:157-162` does for a trait type's arguments. An argument that misses its bound is refused: 'No such method O.gen.'
  - The checker still gives no expected type to an argument of another call (row 455, `XXXInferContextDrops`).
  - Gated by `compiler_tests/InferResultOnlyIfWithoutElse`, `InferResultOnlyAfterLocalDecl`, `InferResultOnlyTypecaseBranch`, `InferLooseJuxtContext`, `InferRepeatedOperatorContext`, `InferResultOnlyLabelBody` (a `typecheck` test, since the code generator has no `label`), `MethodStaticArgReceiverSameName`, `MethodStaticArgsBoundNamesOther`, `MethodStaticArgsBoundNamesOtherSameName` and `InheritedMethodByNameStaticParamSameName`, and by `XXXLooseJuxtMultifixExpectedType`, a refusal.

## Ledger

- **Row 644.** Append this note, then close it: `ledger.py close 644 --commit d4697808b --test InferRepeatedOperatorContext`.
  Note: "The multifix application, where a declaration accepts the operands, had the same defect. `y: BoxV[\ZZ64\] = 1 OTIMES 2 OTIMES 3`, with only `opr OTIMES[\T\](a: ZZ32, b: ZZ32, c: ZZ32): BoxV[\T\]` declared, was refused on 7fa767d48: 'Right-hand side has type BoxV[\Object\], but declared type is BoxV[\ZZ64\].' The same change repairs it, and the same test asserts it (climb batch 12 rung C)."
- **Row 651.** Append this note, then close it: `ledger.py close 651 --commit d4697808b --test MethodStaticArgsBoundNamesOther`.
  Note: "Both shapes are repaired by climb batch 12 rung C: `staticArgsMatchStaticParamsForApp` puts the written arguments into the bounds (`STypesUtil.scala:771-800` at d4697808b). Compiled, `MethodStaticArgsBoundNamesOther` asserts 1 and `MethodStaticArgsBoundNamesOtherSameName` asserts 11. An argument that misses its substituted bound is refused: 'No such method O.gen.'"
- **Row 642.** Append this note, then close it: `ledger.py close 642 --commit d4697808b --test InferResultOnlyLabelBody`.
  Note: "This follows the curator's answer to Q48(a) (POSITIONS, 'A `label` body takes the expected type of the whole `label`'). The body and each exit's `with` value take the label's expected type (`impls/Misc.scala:704-739` at d4697808b). `Library/String.fss:431` clears, and the distance goes from 207 to 206. The test is a `typecheck` test, because a compiled label stops at the code generator: 'Can't compile Label'."
- **Row 455.** Append: "Climb batch 12 rung C gives the expected type to a label body and its exits and to a repeated operator, not to an argument. Q48(b) is unanswered, and `XXXInferContextDrops` keeps both argument faces ('Saw expected failure' in the rung's `ant testQuick`)."
- **Row 560.** Append: "Item 36's thirteenth site, `Library/String.fss:431`, clears with row 642's repair (climb batch 12 rung C, d4697808b). The site is gone from the per-site list (`distance-sites.tsv:117`)."
- **Row 627.** Append: "Row 651's second shape, which this renaming exposed, is repaired by climb batch 12 rung C (d4697808b) and gated by `MethodStaticArgsBoundNamesOtherSameName`. The renaming stays."

## New rows

None.

## Handover

Climb batch 12 rung C (`wip/rung-checker-contexts`; d4697808b, 7572db348):
- The compiled checker now gives an expected type to a repeated operator (row 644, the multifix shape too) and, under Q48(a), to a label body and its exits' `with` values (row 642).
- It checks a written static argument against its bounds with the written arguments put in (row 651).
- Four expected failures were promoted. The inference chapter's two lists and Appendix I's entry "The contexts that give a call an expected type" were amended.
- `ant testQuick` is green (compiler 1084). The count is unchanged at 1. The distance went from 207 to 206 (`String.fss:431`).
- Open: Q48(b) (row 455), and whether `try`/`catch` and `atomic` bodies take the expected type (a question for the curator). The tight juxtaposition's multifix reading (`impls/Operators.scala:362-374`) was counted, not measured.

## Revival change

Revival change: none. The change makes the compiled checker do what the revival's list of contexts says (`Specification/basic/inference.tex:129-148`) and what the team's text already requires (`label.tex:66-70`, `chained-multifix.tex:42-48`, `method-invocation.tex:40`). The Working Draft's inference chapter held only a heading and two draft notes, and walk has no static types. The team's checker's omissions are gaps repaired, as rung E's record gave for the same entry's first revision (`explorations/compile-ladder/climb-batch-11/RECORD.md:88`, "E gives none").
