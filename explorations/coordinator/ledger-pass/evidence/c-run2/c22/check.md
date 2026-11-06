# c22 check (run c-run2, base c124c6b65)

mech.py: 10 lines, 0 failing. Every cited `file:line` below was opened with `git show c124c6b65:<path>`.

## 570: pass
`OverloadingChecker.scala:361-362` holds `typesInComp = compilation_unit.typeConses` and the loop over named traits and objects; `AbstractMethodChecker.scala:217` holds the lifting comment; `compiler_tests/XXXFunctionalMethodMeetObjectExpression.test` asserts `compile_exception_contains=emitDesc of type AND(A,B) failed`; `tests/FunctionalMethodMeetObjectExpressionWalk.fss` exists. Dropped `:367-368` is the old pin. Cold read: nothing a worker would stumble on.

## 416: fail
1. Fidelity. Passage: "Generic declarations that differ only in an element type fail the Meet Rule instead (F-155). So the library's bounds check is named by rank". Source: F-155 at the base (FACTS.md:232): "two plain declarations of one name that differ only in the element type are refused at load, and two generic ones load", `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` "loads and runs" (also F-252). The sentence states the opposite, and the cold read could not tell what the "So" follows from. Correction: replace those two sentences with "Two generic declarations that differ only in an element type load (F-155). The library's bounds check is named by rank".
2. Cold read. Passage: "the type twin," in the claim. No test or source at the base names it (`XXXNatSizeExclusionWalk.fss` holds only the `nat` pair); the reader had two readings. Correction: delete "the type twin," from the claim, or name its program.
Other: `OverloadedFunction.java:589-604` holds the "are unrelated" refusal; `FType.java:197-210` is `excludesOther`; `RangeInternals.fss:125-172` holds the three `checkSelection` names; F-91 agrees.

## 697: fail
1. Cold read. Passage: "Walk prints `C`;". Source: the reproducer `tests/XXXReturnRuleObjectParamWalk.fss` is the slide-4 `m1` program, which prints `ran`, its key `load_exception_contains=the first result is not a subtype of the second`; no program at the base prints `C`. Correction: "Walk loads the claim's pair and runs it; the checker refuses it."
2. Cold read. Passage: "(`reviews/popl2019-examples.md`)". Source: the file is `explorations/reviews/popl2019-examples.md`. Correction: write that path.
Other: `:511` holds `distinct |= unequal && (allObjInstance1 || allObjInstance2)`, `:439-444` the `coincide` comment and its use; the last sentence is supported by `explorations/coordinator/CLIMB-BATCH-19.md:189`. Dropped `SumReduction`, `distribute`, `CLIMB-BATCH-16.md`, row 433 (FIXED): a story; home the history.

## 785: fail
1. Fidelity / cold read. Passage: "The declaration's result reads as `BOTTOM` ('C->BOTTOM'), and the Subtype Rule's branch of `completeOverloadingCheck` finds it no subtype of the other's". Source: walk's `BottomType.subtypeOf` returns `true` (`interpreter/evaluator/types/BottomType.java:20-22`), and the branch tests the more specific result against the other's (`OverloadedFunction.java:519-527`: `!r1.subtypeOf(r2)` / `!r2.subtypeOf(r1)`, chosen by `p1better`/`p2better`, set at `:486-493`). As written, a `BottomType` result would pass, so the line contradicts the code; the cold reader stumbled on it. Correction: "The refusal prints the declaration as 'C->BOTTOM' and comes from the Subtype Rule's branch of `completeOverloadingCheck` (`...OverloadedFunction.java:519-527`, message `:646` or `:654` by the pair's order, at c124c6b65); by reading, `BottomType.subtypeOf` answers true (`BottomType.java:20-22`), so which comparison fails is not settled by reading." (`:646` because CLIMB-BATCH-19.md:189 quotes the library pairs' message as "the first result is not a subtype of the second".)
2. Reproducer `none`: the notes give the program and its output but no command. Correction: add "(under walk, `bin/fortress P.fss`)" after the claim's program, or in the notes.
3. Passage: "(`coordinator/CLIMB-BATCH-19.md` section 4)". Correction: `explorations/coordinator/CLIMB-BATCH-19.md`.
If the length runs over 1,200, drop "the checker infers the body's type".
Other: `FortressLibrary.fss:1690`, `:1737`, `Pairs.fss:85-91`, `tests/FileConversion.fss:76` hold the cited declarations.

## 788: fail
1. Cold read. Passage: "Through a bound: `XXXGenericBoundObjectOverlapWalk`, 'Invalid overloading of h' compiled." No folder; "compiled" read two ways. Source: `ProjectFortress/tests/XXXGenericBoundObjectOverlapWalk.fss` exists, an `XXX` walk test whose key expects 'fails the Meet Rule'. Correction: "Through a bound, `ProjectFortress/tests/XXXGenericBoundObjectOverlapWalk.fss`: walk loads the pair, and `fortress compile` refuses it, 'Invalid overloading of h'."
Other: `FType.java:214` (`cannotBeExtended` both), `:236-245`, `OverloadedFunction.java:441` (`ownPair && instancesMayCoincide`), `:470` (`excludes && ownPair`) hold the mechanism; the reproducer matches the claim. Dropped run story: home the history.

## 522: pass
`RangeInternals.fss` at the base: `:1045-1055` `imposeStride`, `:1048` `dist = r-l` before the sign test; `:195-202` `check()`, `:199` `(l-r) MOD str`; `:1713-1719` `fullScalarRange` calls `f.check()` for stride 1 and others; `:1458-1460` `size`'s `right.get-left.get`. The reproducer asserts the three ranges. Dropped siblings 450, 451 are FIXED.

## 789 (measure): fail
Question: the command does not run from the main tree. Passage: "from the program's folder with `FORTRESS_CACHES` at the copied caches: `bin/fortress compile P789.fss`". Source: `bin/fortress` is relative to `/home/user/fortress`; `build-and-caches.md:71` says `fortress compile` reads `default_repository/caches`, not a private folder. Correction: "From `/home/user/fortress`: `bin/fortress compile <folder>/P789.fss` (and, if it compiles, `bin/fortress run P789`)". The program and the outcomes are narrow and each maps to a line or a close.

## 341 (measure): fail
Question: the command is not runnable. Passage: "`FORTRESS_CACHES=<new empty folder> ... bin/fortress P341.fss`", from the program's folder. Correction: "From `/home/user/fortress`: `FORTRESS_CACHES=<new empty folder> bin/fortress <folder>/P341.fss`, then the same command again". Outcomes map to a rewrite or a close. Pairs 341-342 (342 holds the cold-cache mechanism, FACTS F-269) and 341-804 (804 FIXED by c41c3d2b0, a possible fix of the sized half): plausible.

## 127: pass
`ExprDisambiguator.scala:308-313` (`SVarDecl` adds to `topVars` when `!inTraitOrObject`), `:329-348` (`SObjectExpr` never sets it), `:185-190` (`SObjectDecl` sets it). The three probes exist in `22ea0cd90^:explorations/run-b2/probes/`. Note, not a failure: the row names no path; the disambiguator runs on both.

## 128: pass
`SyntaxChecker.java:340-344` (`forBlock` sets `inBlock`), `:285-288` (the modifier refusal, which does not read `inObject`; `inObject` is read at `:289` for the body check only), `forObjectExpr` sets `inObject` (`:170-174`). Probes exist in `22ea0cd90^`.

## 375: pass
`CodeGen.java:1675-1677` `defaultCase` throws `sayWhat(x)`; no `forObjectExpr` or `forTryAtomicExpr` in `CodeGen.java`; `Shell.java:262-264` `getObjExprDesugaring`, `:446` `setObjExprDesugaring(true)` in the `desugar` branch; `XXXObjExprRungS.test` asserts `Can't compile ObjectExpr`. Dropped test name lives in row 570.

## 353: pass
`XXXTryAtomicCodegenRungB.test` asserts `Can't compile TryAtomicExpr`; `CodeGen.java:1675-1677` as above; both probes exist in `ab067d9b6^:explorations/compile-ladder/rung-tryatomic/probes/skeptic/`; `tests/tryatomicTest.fss`, `tests/nestedTransactions3.fss` exist. Dropped `Parallel.Abort.b.fss` sentence: home the history and `transactions.tex`.

## Counts
pass 6 (570, 522, 127, 128, 375, 353); fail 6 (416, 697, 785, 788, 789, 341). Closes, duplicates, keeps: none.
