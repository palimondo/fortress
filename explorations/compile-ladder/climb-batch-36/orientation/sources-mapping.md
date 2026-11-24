<!-- Climb batch 36's orientation update: for each changed passage of `revival-changes.md`, its new ground and the old source lines that it supersedes. -->

# Sources mapping: climb batch 36

The update changes three passages. Each change deletes or corrects a sentence that the landing made false. No section is added.

## A. "Dispatch and overloading", "Walk chooses by declared parameter types, never by the order of the declarations"

- Change: three sentences deleted, from "In a departure" to "(row 1125)." The rule now holds for two generic dotted methods that differ only in their bounds.
- Ground: F-405, F-26, F-253 as changed at climb batch 36's landing (rung G, `df5948e7b8`; record-landing `69750f4c24`). Ledger row 1125, FIXED at `df5948e7b`. `ProjectFortress/tests/GenericMethodBoundsDifferWalk.fss:10-12` and `:44` assert 3 for the `tk` shape.
- Supersedes: `references/sources.md:1606` (walk keeps the first of the two methods, row 1125) and `:1616` (walk drops one at load; the `tk` example; `tests/XXXGenericMethodBoundsDifferWalk.fss`, since promoted).

## B. "Dispatch and overloading", "Walk's load check is not the verdict of these rules"

- Change: the example's last sentence deleted. The first round rewrote it to row 780's new form. The fix round dropped it, because the cold read found "first instance" undefined and the example adds no action to the pointer to `interpreter.md`, "What walk checks".
- Ground: F-174, P-45 (row 780 clause, C43), and the row 780 clauses of F-26 and F-405. Ledger row 780 as rewritten (NEGATIVE-VERIFIED). `ProjectFortress/tests/XXXGenericTraitFunctionalMethodsNestedWalk.fss`. The message comes from `interpreter/evaluator/values/OverloadedFunction.java:601`. `reviews/batch-36-review.md`, section 5.
- Supersedes: `references/sources.md:1274`, the clause "row 780 'at each call, not at load'".
- Owed elsewhere: `references/interpreter.md:68` still says "at each call" for row 780. Rewrite only its row 780 clause: the valid pair stops when walk first makes an instance of an object that extends the trait. Keep its first two sentences for plain functional methods (P-45, F-26), or that departure leaves the skill (`preserve.md`).

## C. "Numbers", "A numeral converts where it stands (P-173)", the coercion paragraph

- Change: two sentences deleted, from "The tree departs" to "outside `ZZ32`'s range." The rule's own text, "So `Byte`'s body is `Byte(v)`", now holds on both paths.
- Ground: F-407, F-341, F-342, F-347 (rung N, `2a969fed6e`); P-174 as rewritten (C40, C41). `Library/FortressLibrary.fss:847` and `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:663` (`ZZ32`'s coercion is `= v`). `ProjectFortress/tests/NumeralCoercionBodyWalk.fss:43-44`. `ProjectFortress/compiler_tests/NumeralCoercionBodyCompiled` (compile, link, run, PASS).
- Fix round: "is refused statically" became "is refused: by the checker statically, by walk when the place runs", in the form of the section's other two refusals. Ground: F-407 (walk refuses "when the place runs"); `ProjectFortress/tests/NumeralCoercionNumberRangeWalk.fss` with its `.test`, `load_exception_contains=param 1 ($w:ZZ32) got arg 3000000000`.
- Supersedes: `references/sources.md:1569`, the clause on the departure of walk, the checker and the code generator and `Byte(v.asZZ32)` under walk, with its citation of `FortressLibrary.fss:847` for the getter. `:1591`, the clause "`asZZ32` raises `IntegerOverflow`".
