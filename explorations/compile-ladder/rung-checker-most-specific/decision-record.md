<!-- Decision record of climb batch 36's rung K (rung-checker-most-specific): the specification's passages that the rung changes, each with its original text, its new text, the reason and the way back, in the revision form of the skill's specification.md. The rung's report is REPORT.md beside this file. -->

# The type of `self` in the signatures of a trait with a `comprises` clause: decision record

The rung follows fork K1 of `explorations/coordinator/CLIMB-BATCH-36.md`, section 3, "Forks the batch takes", a default that the batch takes: a functional method's `self` parameter reads at its plain trait type in every declaration's signature, a `comprises` clause's trait and the prelude's `comprises T` spelling included; the bodies keep the meet, and so does the overloading check's exclusion test. No POSITIONS entry states the `comprises` case; P-146 states the rule for a self-typed trait, and the batch record's section 3, "The consequential fork", reads the specification as leaving the `comprises` case open.

## 1. `Specification/basic/expressions/var-ref.tex`, section "Identifier References", the self-type idiom

Original: the Working Draft of February 2011, `Specification-1.0-frozen/basic/expressions/var-ref.tex:64-69`, the same text at the base (`Specification/basic/expressions/var-ref.tex:64-69` at b5a758846d):

```latex
If the innermost enclosing such construct is a trait declaration (for a trait called,
say, `\EXP{T}'), and that trait declaration has a \KWD{comprises} clause,
and `\EXP{U_1}', `\EXP{U_2}', ..., `\EXP{U_n}' are the traits mentioned in
the \KWD{comprises} clause, then the type of \KWD{self} is instead
``\EXP{T \cap (U_{\mathrm{1}} \cup U_{\mathrm{2}}
\cup \ldots \cup U_{\mathrm{n}})}''.
```

New text (`var-ref.tex:64-84`): the type of `self` is the intersection "in the bodies of its methods", and the sentence goes on: "the \KWD{self} parameter keeps the type `\EXP{T}' in the signature of each method declaration, which overloading and the choice of a declaration at a call read, save the test of whether two overloaded declarations' parameter types exclude each other, which reads it as that intersection." A box, `\revision{revival-self-comprises}`, says that the Working Draft did not say whether the type held in the signatures, that read there it made a trait's own declaration and a listed type's equally specific, and that read at the trait the listed type's declaration is the more specific, as for a self-type parameter. The wording of the new clause is the next sentence's, on a self-type parameter (`var-ref.tex:85-95`, `\revision{revival-self-type}`).

Reason:

- The definition of "more specific" compares declared parameter types, a dotted method's receiver among them (`Specification/basic/overloading.tex:353-372`), and the type of `self` is the type of the trait being declared (`var-ref.tex:53-54`). The Working Draft's sentence on a `comprises` clause names no place.
- Read in the signatures, the meet makes the one library's `denominator(self)` of `QQ comprises { Ratio }` and `Ratio`'s one domain, `(QQ & {Ratio})->ZZ` beside `Ratio->ZZ` (`explorations/compile-ladder/climb-batch-35/REPAIR-gate.md`, "The site"); the checker kept the first of the tie in an order that followed the JVM's identity hashes, and the compiled call passed `self` where `Ratio` was expected, 'VerifyError: Bad type on operand stack' (ledger row 1100).
- Read at the trait, `Ratio`'s declaration is strictly more specific: a call on `self` takes it and its return type (row 1112), and an object's narrower return type is valid (row 1127). The tests `compiler_tests/ComprisesSelfListedTypeCompiled` and `ComprisesFunctionalMethodNarrowedReturn` pass; on the base they failed, 'Function body has type Q, but declared return type is R.' and 'should be a subtype of the'.
- The exclusion test keeps the meet, since every value of the trait is a value of a listed type (P-60), as it does for the self-typed traits (P-157). The change of `FunctionalMethod.parameters()` gives it the meet through the declaration's own parameters (`OverloadingChecker.scala`, `selfTyped`), and the count stage stays at 0 on the interpreter's library (REPORT.md, "The two stages").

The way back: keep the meet in the signatures too, and decide the tie of a trait's own declaration and a listed type's at one domain by another rule. Two were open: the declaration in the type below hides the trait's, as a redeclaration at the same parameter types does (`Specification/basic/traits.tex:584-590`), not probed; or the trait's own kept, as climb batch 35's gate repair did (`b7b5b0c02b`), which takes the trait's return type where the listed type's is narrower. Either needs the sentence back as the Working Draft has it, the box removed, and the Appendix I entry `revival-self-comprises` removed.

## 2. `Specification/appendices/changes.tex`, the entry "The Meet Rule for traits with comprises clauses" (`revival-meet`), its Effect

Original (`changes.tex:3750-3756` at b5a758846d): "The compiled type checker departs from this in three ways: it types such a call by the intersection only in a family none of whose declarations has static parameters, and otherwise by one of its most specific declarations (row~543 of the revival's gap ledger); it refuses the case for declarations with static parameters (row~546); and its verdict on a trait between the two that provides both declarations of a functional method can depend on the components it compiled before (row~547)."

New text (`changes.tex:3750-3753`): "The compiled type checker departs from this in two ways: it refuses the case for declarations with static parameters (row~546 of the revival's gap ledger); and its verdict on a trait between the two that provides both declarations of a functional method can depend on the components it compiled before (row~547)."

Reason: the checker now types such a call by the intersection where the tied declarations, and every declaration more specific than one of them that the call may run, have no static parameters, the text's boundary (fork K5); row 543's program, `compiler_tests/CoverageReturnGenericFamily`, compiles and runs, where the base refused it, 'but declared type is'. The way back: the clause restored, with row 543 reopened.

## 3. `Specification/appendices/changes.tex`, the new entry "The type of self in the signatures of a trait with a comprises clause" (`revival-self-comprises`)

New, after `revival-self-type`. It gives the change of section 1, its rationale, its effect on each path, the Working Draft's text, and its route C. Its effect names one departure: an object's dotted method that redeclares such a trait's dotted method at the same parameter types with a narrower return type is refused, since the overloading check reads the trait's receiver as the meet (row 1094's form for a `comprises` clause; `compiler_tests/XXXComprisesDottedMethodNarrowedReturn`). The way back is section 1's, with the entry removed.

The front matter's paragraph on the revision (`Specification/fortress/preamble.tex:60-70`) stays true and is unchanged.
