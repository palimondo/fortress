# Check of c42, run c-run2, base c124c6b65

mech.py: 7 lines, 0 failing. No closes, duplicates, pairs or silent rows; questions.md asks no measurement (its XXX note checked: `Types.java:372-377` still `NI.nyi()`, CompilerLibrary declares no `__cond`).

## Row 59: fail (cold read)
- Fidelity: pass. `SkMySumThreads.fss` is in `ab067d9b6^`; `reduction.tex:15` holds "\note{Reduction variables are not yet supported.}"; `ProjectFortress/compiler_tests/AtomicTopLevelVar.{fss,test}` at the base.
- Nothing lost: `AtomicTopLevelVar` is kept (`compiler_tests/AtomicTopLevelVar`; mech's list is a false positive on the path prefix). "until repair batch R1": story, home is history row 59.
- Present, reproducer, status, form: pass.
- Cold read, failure: the reader asked whether the gap is walk's only, since the notes give a lost sum on both paths (walk 3343924325, compiled 4986607299), while the claim names no path and the class says walk. A worker would stumble on this. Correction: in the claim, after "above one thread", insert ", on walk and on the compiled path,"; keep the class.

## Row 79: pass
- P-76 is `POSITIONS.md:84` at the base and lists "a numeral that walk matches as a `ZZ32` in a `typecase` or an overload (row 79)" among walk gaps; `p33.fss` is in `c69cb2064^`. "Q-walk" has its home in P-76. Cold-read items are language concepts, not stumbles for a worker.

## Row 82: pass
- `FortressBuiltin.fsi:287` holds `object Thread[\T\](fcn:()->T)`, `FortressBuiltin.fss:725` holds it; old pins `:286`/`:722` replaced, not lost. `p32.fss` is in `c69cb2064^`.

## Row 111: pass (keep)

## Row 319: pass
- `CodeGen.java:4620-4636` at the base holds the TODO "need to spot for \"final\" fields" and `new VarCodeGen.MutableFieldVar` for every `VarDecl`; old pin `:4343-4360` replaced.

## Row 463: fail (keep hides a change)
- Passage: "(`Library/FortressLibrary.fss:1269-1273`)". At c124c6b65 the lines shifted +1 since e553d8949 (evidence/463.md): `:1269` is blank, `__cond` is at `:1270-1271`, and `__whileCond` at `:1274-1275`, outside the pin, so the cited range no longer holds "declares both". The writer rewrote rows 82 and 480 for the same kind of drift.
- Correction: rewrite, replacing "(`Library/FortressLibrary.fss:1269-1273`)" with "(`Library/FortressLibrary.fss:1270-1275`, at c124c6b65)"; nothing else changes.

## Row 480: pass
- `Functionals.scala:1396-1402` holds `isContainsSubtype`, `case tt: TraitType => (self.analyzer.ancestors(tt) + tt).exists(Types.isContainsType(_))`, `case _ => false`; `Evaluator.java:416` holds the `extendsGenericTrait(..., containsTypeName)` test. "Row 476" has its home in history row 480 and FACTS; "the one-library world"/"the compiler's world" are record terms (F-7, "The two worlds").

## Row 482: pass
- `Functionals.scala:1413-1420` is the extremum branch ("case most < of ... end", `Types.makeTotalOperatorOrder`); `Types.java:372-377` still `NI.nyi()`. Reproducer `XXXExtremumRungJ.test` exists, an expected failure.

## Row 746: fail (cold read, two items)
- Fidelity: pass. `Evaluator.java:595` holds `if (maybeType(clauseVal.type()))`; `maybeTest.fss` and `naturalsTest.fss` lines 21-22 at 5a68404fd both hold `if a then fail("Nothing holds in if") end` / `if b then () else ...`; F-239 (`FACTS.md:208`) states this reading as "a default, the coordinator's call at climb batch 16", so the CLIMB-BATCH-16.md pointer has its home there. Status `deliberate` with NEGATIVE-VERIFIED unchanged: pass.
- Failure 1: "the chapter has no revision box for this reading" - the reader could not find what a revision box is. Source: `Specification/fortress/fortress.tex:86-92` defines `\revision` and its `revisionbox`. Correction: replace "the chapter has no revision box for this reading" with "`if.tex` has no `\revision` box for this reading".
- Failure 2: the Specification cell "`basic/expressions/if.tex`" lacks its prefix, unlike every other row's cell. Correction: make the cell "`Specification/basic/expressions/if.tex`, \"If Expressions\"".
