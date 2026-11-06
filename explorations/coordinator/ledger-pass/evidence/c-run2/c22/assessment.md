# c22 assessment (run c-run2, base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. Beyond the evidence files I read, at c124c6b65: `OverloadedFunction.java` (:425-548, :589-604, :640-654, :772-800), `FType.java:195-250`, `OverloadingChecker.scala:355-368`, `AbstractMethodChecker.scala:215-217`, `CodeGen.java` (grep for `forObjectExpr`, `forTryAtomicExpr`, `defaultCase`), `Shell.java:262-264`, `:440-447`, `ExprDisambiguator.scala:329-350`, `Library/RangeInternals.fss` (:178-202, :1004-1058, :1456-1467, :1713-1719), `Library/FortressLibrary.fss` (`opr =` of `Nothing`, `NotUnique`), `Library/Pairs.fss:85-91`, `tests/FileConversion.fss:74-77`, `tests/ExclusionVectorScalarWalk.fss`; FACTS F-269; ledger rows 98, 342, 804; `git show --stat c41c3d2b0`; the deletion commit of the tryatomic probes (ab067d9b6).

## 570: rewrite
- scope pass; present meaning pass; evidence pass (compiled `XXX` test, keys assert the emitDesc stop); comprehension pass; ownership pass; consistency pass (FACTS.md:77 agrees).
- fails: the pin, "`OverloadingChecker.scala:367-368`, at d4d454f9d": `typeConses` now at :361; d4d454f9d is a boot-note commit. New line pins :361-362 at c124c6b65.
- dropped: nothing. The refused batch-11 note ("Walk's half, row 618, is fixed (c0b2888f2)") is a repair story; the walk refusal it reports is already in the notes; the story's home is `explorations/compile-ladder/climb-batch-11/RECORD.md:139` and the history.

## 789: measure
- scope pass; present meaning unknown; evidence fail: reproducer `none`, its only run "on 612869b4a and the rung's head", and `OverloadingChecker.scala` changed since by 64fa505c4 (the exclusion test reads the static parameters' bounds), which reads this very pair; comprehension pass; ownership pass; consistency pass.
- the notes' "on 612869b4a and the rung's head" is a run story; the line is written after the measure (questions.md).

## 416: rewrite
- reproducer `XXXNatSizeExclusionWalk` green as an expected failure under the holding gate a12ab5c60: the refusal stands. scope, evidence, ownership, consistency (FACTS.md:41, :88, :185, :211, :232 agree) pass.
- fails: comprehension/pin, "`OverloadedFunction.java:587-602` at d4d454f9d": the refusal is now :589-604 (message at :603); `FType.excludesOther` is :197-210. Repinned at c124c6b65.
- the refused batch-18 note (F-155's generic form "fails the Meet Rule") is already in the notes. Dropped nothing.

## 341: measure
- scope fail: two defects in one row, the cold-cache-only check (row 342's mechanism, row 98 now its duplicate) and the refusal beside the library's generic declarations; notes carry "Fixed: C4's own failure ..." (a fixed half, a repair story).
- present meaning unknown: walk's load check was rewritten since 2026-10-08 (6d187d069, 9879d4386, 14e91723f, c41c3d2b0; +939 lines), and c41c3d2b0 fixed row 804, the array-and-number generic operator beside a self-typed group's own, which is the claim's "sized `+` over `Array3` or `Vector`". The pins `:472-474`, `:523-524` at 052a7c3fe no longer hold their words (`overloadOk` now :532, :550).
- evidence fail: reproducer `none`; probe folder `explorations/run-c4/cold-cache/p4/` gone. Siblings 98 and 159 are closed.
- consistency: F-269 states the refusal of C4's former `MAX` pair as current.
- A question for the prober (questions.md); pairs 341-342 and 341-804 in pairs.txt. The rewrite waits on the run.

## 697: rewrite
- reproducer `XXXReturnRuleObjectParamWalk` green as an expected failure under the holding gate: the defect stands. scope, present meaning, evidence, ownership, consistency pass.
- fails: pin "`OverloadedFunction.java:509` at cdb84fba5" (the line is now :511; cdb84fba5 is a POSITIONS commit), and `:437-442` now :439-444; the notes end with a repair story, "By reading, removing the shortcut met `SumReduction`'s `distribute` pair (`coordinator/CLIMB-BATCH-16.md` § 4), since rewritten (row 433)" (row 433 FIXED).
- new line: repinned at c124c6b65; siblings gain 785; the story is replaced by the fact a worker needs now, that removing the shortcut alone makes walk refuse the library's pairs without a return type (row 785, whose notes list them).
- dropped: the `SumReduction` story; home: the history (row 697) and `explorations/coordinator/CLIMB-BATCH-16.md` § 4. The refused batch-19 note ("a generic face, `h[\T\](y: BoxR[\T\])` beside `h[\U\](y: R[\L[\U\]\])`, loads (row 788)") is not added: it is a pair of two own generics, not this shortcut's mechanism, and not 788's plain-beside-generic one either; home: `explorations/compile-ladder/climb-batch-19/RECORD.md:128`.

## 785: rewrite
- scope pass; present meaning pass by reading: the pair is two plain declarations, so `validOnDeclaredDomains` returns `NOT_READ` (:772-788) and the Subtype Rule branch (:519-527) decides, as when the row was written; no commit since 52f8bdffb changed that branch (c41c3d2b0 touches generic-beside-trait-method only).
- evidence: reproducer `none`, the claim quotes the refusal; no probe path survives. Kept `none` (no run here).
- fails: comprehension/pin, "(OverloadedFunction.java at ce752ed20)" has no line and ce752ed20 is a boot note; `FortressLibrary.fss:1684, :1731` no longer hold `Nothing`'s and `NotUnique`'s `opr =` (now :1690, :1737); the cells lack backticks around code. New line pins :519-527 and the message :654 at c124c6b65, and the library lines.
- consistency with 697 pass (siblings both ways). Dropped nothing.

## 788: rewrite
- reproducer `XXXGenericObjectInstanceBesidePlainWalk` green as an expected failure under the holding gate. scope, present meaning, evidence, ownership, consistency (FACTS.md:214, POSITIONS.md:42, :64 agree) pass.
- fails: pin "at 84957e6ef", a commit not in the base's history; `OverloadedFunction.java:439`, `:468` shifted to :441, :470; "Both on 612869b4a and the rung's head." is a run story.
- new line: repinned at c124c6b65, the mechanism stated (the `coincide` test and the withdrawal read only two own generics, `ownPair`), siblings gain 789 (the compiled side of a near pair, which names 788). Dropped: the run story; home: the history.

## 522: rewrite
- reproducer `XXXStridedSpanWalk` green as an expected failure under the holding gate. scope, present meaning, ownership, consistency (FACTS.md:189) pass.
- fails: every pin, at 052a7c3fe, has moved: `dist = r-l` now :1048 (`imposeStride` :1045-1055), `(l-r) MOD str` :199 (`check()` :195-202), `fullScalarRange` :1713-1719, `StridedFullScalarRange.size` :1458-1460; siblings 450 and 451 are both FIXED.
- dropped: `siblings: 450, 451` (closed rows); home: the history, row 522.

## 127: rewrite
- scope, present meaning (cited lines unchanged since the row's commit; `SObjectExpr` :329-348 sets no `inTraitOrObject`), ownership, consistency pass. Evidence: probes gone, their old path and commit stated (the template's allowance).
- fails: the pin: no commit for `ExprDisambiguator.scala:308-313`, and the file named only by its base name. New line gives the path and "at c124c6b65"; the specification sentence shortened. Dropped nothing.

## 128: rewrite
- as 127. fails: pins `SyntaxChecker.java:339-345`, `:283-289` without a commit or path; now `:340-344` (`forBlock`) and `:285-288` (the refusal), at c124c6b65. Dropped nothing.

## 375: rewrite
- reproducer compiled `XXX`, unrun here; by reading `CodeGen.java` at c124c6b65 has no `forObjectExpr` (grep), so the defect stands. scope, present meaning, ownership pass.
- fails: pins shifted (`defaultCase` now :1675-1677; `getObjExprDesugaring` :262-264; `setObjExprDesugaring(true)` :446), no commit pinned; consistency: "Rows 127 and 128 are walk's object-expression defects", though 127 is the disambiguator (class checker) and 128 the syntax checker (class parser), front-end phases both paths run. New line says so, adds `siblings: 570` (570 names 375), and shortens the emitDesc sentence (its test name stays in row 570).
- dropped: the test name `XXXFunctionalMethodMeetObjectExpression` from this row; home: row 570's reproducer cell.

## 353: rewrite
- reproducer compiled `XXX`, unrun; `CodeGen.java` has no `forTryAtomicExpr` at c124c6b65. scope, present meaning, ownership, consistency pass.
- fails: pin `CodeGen.java:1672-1673` shifted to :1675-1677, no commit; the probes `SkepTryAtomicVal.fss`, `SkepTryAtomicState.fss` gone with no old-path explanation (deleted by ab067d9b6); `nestedTransactions3.fss` ambiguous (tests/ and other_compiler_tests/).
- new line: repinned at c124c6b65; the probes "in the parent of `ab067d9b6`"; `tests/nestedTransactions3.fss`.
- dropped, for length: "`atomic` is definable by `tryatomic` (`SpecData/examples/advanced/Parallel.Abort.b.fss`)"; home: the history (row 353) and the specification it cites (`transactions.tex`, "Abortable Atomicity").

## Counts
keep 0, rewrite 10, close 0, duplicate 0, measure 2 (789, 341).
