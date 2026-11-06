# Chunk c8 (c-run4), base c124c6b65

Marks: scope / present meaning / evidence / comprehension / ownership / consistency.

## 896: rewrite
- scope pass; present meaning FAIL: "On climb batch 26's base a flat `""` raised so through the glue class, and an `EmptyString` name was read as the key `EmptyString`" tells the earlier tree, not the present; evidence pass (a run, the reproducer `none` with its program); comprehension pass; ownership pass; consistency pass.
- Change: the batch-26 story cut; the `EmptyString` route at the base stated by reading (`Library/System.fss:52-56`, its `typecase` over `asFlatString`, read at c124c6b65); `ProjectProperties.java:207-208` and `StringMap.java:164` separated, since `System.getProperty` is at the latter.
- Dropped: the old route through the glue class and the old `EmptyString`-as-key reading; home: history, row 896 (the old line kept whole by `rewrite`).
- Beyond evidence: `git show c124c6b65:Library/System.fss`, `ProjectProperties.java` 200-225.

## 368: rewrite
- scope pass; present meaning pass; evidence pass; comprehension pass; ownership pass; consistency FAIL: "siblings: 895, the checker's whole-class read" sits at the end, not first; 874 (the same whole-class wrapper read, at one-library types) is not named.
- Change: `siblings: 895, 874.` first; `cr.accept(fa, 0)` beside `FortressTransformer.java:53` (the word `FortressTransformer` is at :32); pinned at c124c6b65.
- Dropped: nothing; "the checker's whole-class read" is 895's claim.
- silent: defect.

## 377: measure
- scope pass; present meaning FAIL/unknown: one run of 2026-09 on climb batch 3's tree, `CodeGen.java` +289 -9 lines since the pin; evidence FAIL: "Probes ... Sk2OldNew.fss, Sk2NewOne.fss, in the parent of ab067d9b6" are gone from the tree (recovered: `git show ab067d9b6^:...`); comprehension pass; ownership pass; consistency pass.
- Disposition: measure; question in questions.md. silent: defect.
- Beyond evidence: the two probe programs from ab067d9b6^; `stringOps.asString` and `defaultAsString` still exist (`nativeHelpers/stringOps.java:76`, `:108`); the throw now at `CodeGen.java:2874`.

## 812: rewrite
- scope pass; present meaning FAIL: "Hidden on the base by 809" (809 and 775 are FIXED: the signal siblings-closed); evidence: "`fortress compile -debug stacktrace` of the program" does not say which program (it is `compiler_tests/ComprisesWhereFunctionalMethodChecker.fss`, read at the base); comprehension pass; ownership pass; consistency FAIL: pin `ed4782762` is not in the base's history.
- Change: siblings 822 (open, same kind-env site) in place of the closed 809, 775; the program named; pins at c124c6b65 (`STypesUtil.scala:1587` unchanged; `CodeGen.<init>`'s call now at `CodeGen.java:488`, +3).
- Dropped: siblings 809, 775 and "Hidden on the base by 809": both rows are FIXED, so nothing hides it now; home: history, and rows 809, 775 themselves.
- FACTS.md:120 and :268 agree (the code generator still crashes there).

## 818: rewrite
- scope pass; present meaning FAIL: "7 declarations of the one library ... are refused" is a count of 32242b80d, stated as now (the library changed since; `String.fss` has 6 lines with `asif` at the base, not 8); evidence FAIL: the reproducer `explorations/perf-probes/codegen-distance/REPORT.md` is a report, not a test or probe; comprehension pass; ownership pass; consistency pass (FACTS.md:31 names row 818 for `asif`).
- Change: claim without the count; the count and the 13 sites pinned "At 32242b80d"; reproducer `none`, the probe named uncommitted, its text and output kept; `defaultCase` pinned at `CodeGen.java:1675-1677` at c124c6b65; path shortened to `compiler/codegen/...` and `perf-probes/...`.
- Dropped: nothing.

## 819: rewrite
- scope pass; present meaning pass; evidence FAIL: reproducer is the report, not a program; consistency FAIL: the library sites `FortressLibrary.fss:4193`, `:4194`, `:4236`, `:4237` now point at other text (+6 lines) and `CodeGen.java:2821` is a comment.
- Change: reproducer `none`; sites `:4199`, `:4200`, `:4242`, `:4243` (read at c124c6b65); throw at `CodeGen.java:2874` at c124c6b65; probe named uncommitted.
- Dropped: "(the message, other causes)" shortened to "(its message)"; "compiles and prints `3`" to "prints `3`" (printing implies it compiled).

## 822: rewrite
- scope pass; present meaning FAIL: "siblings: 812, 557, 789" and "Rows 557 and 789 hold the message in the checker": 557 is FIXED; evidence FAIL: reproducer is a report; consistency FAIL: `CodeGen.java:485` now names another line (+3) and `List.fss:252` is ambiguous among three `List.fss`.
- Change: siblings 812, 789; reproducer `none` with the report's path and section in notes; `Library/List.fss:252`; `CodeGen.java:488` at c124c6b65.
- Dropped: 557 as sibling and as a holder of the message; home: row 557 (FIXED) and history.

## 874: keep
- All six pass. The reproducer is a probe path in the tree (`explorations/compile-ladder/plan-25/probes/codegen.sh`, present at the base); the mechanism's lines, `repository/ForeignJava.java:807` (`FortressTransformer.transform`) and `FortressMethodAdapter.java:250-268` (`toImplFFFF`), hold at the base, both files unchanged since its pin 25238e60c; siblings first; the counts (173 helper strings, 482 declarations) are the probe's measured figures. silent: defect.

## 875: keep
- All six pass. Its pins are at 25238e60c and true there: the atomic do-block is now at `CodeGen.java:1720-1770` and `defaultCase` at `:1675`, both shifted, and the code still has no `AtomicExpr` case (grep at the base: none); `Library/OneShotFlag.fss:18` is still `atomic if canTryIt ...`. A later rewrite may re-pin; not owed by the template.

## 895: rewrite
- scope pass; present meaning FAIL: "The distance stage with `Library/FlatString.fss:25-26` naming `systemOps.lineSeparator`" reads as if FlatString names systemOps now; it names `stringOps.lineSeparator` at the base (FlatString.fss:26); consistency FAIL: pin `8b6fca9b5` is not in the base's history (its change landed in 93884be8d, the commit whose message names FlatString's line separator onto stringOps and that last wrote the row).
- Change: pin 93884be8d; the run stated as the edited FlatString, with "(it names `stringOps`)". FACTS.md:147 agrees. silent: defect.

## 340: rewrite
- scope pass; present meaning pass; evidence pass (`XXX` test); comprehension pass; ownership pass; consistency FAIL: siblings 498, 526 named inline, not first; `CodeGen.java:3425-3427` and `:2820-2821` now name a comment (+52, +53).
- Change: `siblings: 498, 526.` first; `methodReturnAndFinish` at `CodeGen.java:3477-3481`, the throw at `:2874`, at c124c6b65; "Same crash" shortened to "Same".
- Dropped: nothing (the refused note of batch 11, the `try` body with a numeral `catch`, was already in the line and stays).

## 498: rewrite
- scope pass; present meaning pass; evidence FAIL: "Probe `SkPatternBind.fss`, gone." gives no old path; consistency FAIL: row 340 is named inline, not as a sibling.
- Change: `siblings: 340.` first; the probe's old path and its source (`ab067d9b6^`); `checkClause` beside the PatternMatchingDesugarer lines. FACTS.md:190 agrees (open). silent: defect.

## Pairs and duplicates
- No duplicates: 340, 377, 819 share the message 'Error trying to close method scope' with three causes (siblings); 812, 822 share the kind-env site with two shapes (siblings); 368, 874, 895 share the whole-class read with three mapping failures (siblings).
- No pairs for the reconcile run: the overlaps outside this chunk (318, 460, 526, 746, 789, 799, 903, 113, 332, 353, 375) state other defects.

## mech.py
- Last line: "MECH: 9 lines, 0 failing, every check passes."
- Tokens of old lines that the new lines lack: re-pinned lines (CodeGen.java :485, :1672, :2821, :3425-3427, :2820-2821; FortressLibrary.fss :4193, :4194, :4236, :4237), each replaced by its line at c124c6b65; full `ProjectFortress/src/com/sun/fortress/` prefixes shortened to `compiler/...` and `scala_src/...` in 812 and 818 for length; `List.fss` made `Library/List.fss`; rows 557, 775, 809 (FIXED) dropped as siblings; the probe file names un-backticked (uncommitted files), 498's bare `SkPatternBind.fss` replaced by its old path.
