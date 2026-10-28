<!-- A check of the two technical claims that the first draft of the reply to Prof. Ryu made, against the record and the tree at main, 2026-10-28. For the curator's learning queue; neither claim is in the letter. -->

# Two claims about the POPL 2019 paper, checked

## Claim 1. The paper's rule for a type parameter that the arguments don't fix is now in the type checker.

**Verdict: holds in part.** The checker builds the paper's instance, the intersection of the upper bounds and never `Bottom`. But the paper gives that rule for dispatch at run time, not for static checking, and the checker narrows it by a rule of the revival's own.

Evidence:

1. The paper: the solving step takes "the intersection of the upper bounds" and "never instantiates method type parameters with Bottom" (`research/extracts/ParkPOPL2019.txt:1004-1006`). The dispatcher "always chooses the intersection of the upper bounds" (`:1283-1284`).
2. The paper gives no static algorithm: "we do not present a specific static type …" (`research/extracts/ParkPOPL2019-extract.md:275`).
3. The decision: P-48, "A type parameter that a call's arguments do not fix takes its bound, never `Bottom`" (`explorations/coordinator/POSITIONS.md:45`). F-271 says that the paper gives P-48's rule (`FACTS.md:232`).
4. The checker: F-78, "instantiates a type parameter that nothing at a call fixes at the intersection of its upper bounds, never `BottomType`" (`FACTS.md:73`). Code: `Formula.solveToBounds` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:551-557`). Tests: `ProjectFortress/compiler_tests/InferResultOnly*` and `InferLone*`.
5. The specification states it, and says that the revival took the dispatcher's rule as the rule of static inference on 2026-09-29 (`Specification/basic/inference.tex:89-118`; F-173, `FACTS.md:227`).
6. What is in part only:
   - The bound is narrowed by what the call's expected type requires of the return type (P-49; `inference.tex:91-94`). The paper has no expected type.
   - Moving the rule from run time to static checking is the revival's decision, not the paper's.

## Claim 2. The library's reductions, such as `SUM`, fall outside the paper's soundness theorem.

**Verdict: holds.** They are outside the calculus that the theorem covers, on two counts. The theorem does not show that they are unsound.

Evidence:

1. The paper's well-formedness rule (2): "no reference to a method type parameter appears in any of the upper bounds" (`research/extracts/ParkPOPL2019.txt:567`).
2. The library's reductions are F-bounded: `opr SUM[\T extends AdditiveGroup[\T\]\](g: Generator[\T\]): T` (`Library/FortressLibrary.fsi:1993`). `BIG MIN` and `BIG MAX` are the same (`:2010`, `:2018`).
3. The calculus also leaves out top-level functions and functional methods (`ParkPOPL2019-extract.md:62-65`, `:281`), and every reduction is a top-level operator (`:474-479`).
4. The record says so: F-271, "its soundness proof does not cover the library's F-bounded functions, such as `SUM` and `BIG MAX`" (`FACTS.md:232`). The recheck: "the paper's Theorem 5.11 does not cover the library's reductions" (`explorations/reviews/decisions-review/popl-recheck.md:50`, and `:122`).
5. The limit: where an invariant argument such as `Generator[\T\]` fixes the parameter, the bound is checked, never solved, so the team's checker and the revival's both handle such calls (`popl-recheck.md:50`). The reductions rest on the 2011 rules as built, not on the 2019 proof (`:51`).
