# c5 assessment (base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. P pass, F fail.

## 434: rewrite
P, F, P, P, P, P. Present meaning: "`Library/FortressLibrary.fss:383-392` at 052a7c3fe" and "(`:380-382`)": the `=` is now at `:386-392`, its doc comment at `:383-385` (+3). Repair story: "kept by rung F's decision D1" dropped (home: history, row 434). Reproducer `none` with the probe's old path, allowed. Silent: choice.

## 371: rewrite
P, P, F, P, P, P. Evidence: "`StaticChecker.java:166-190`" is ambiguous with the checker-count shadow copy; now the full path. The `TypeHierarchyChecker.scala:298-300`, `:307-308` messages hold at d4d454f9d (unchanged). Batch 19's refused note (Tx excludes Object) is already in the line. Dropped: "One size form passes the checker too (row 414)" for length; home: row 414 itself (the evidence's "Rows it names").

## 372: rewrite
P, F, F, P, P, P. Present meaning: "`TypeHierarchyChecker.scala:119`, `:158`" now point at other code; the cyclic message is at `:199-200` (and `:239-240`, "extends/coerces"). Evidence: "Probes `SkWalkCyclePlain.fss`, `SkSelfExtBound.fss` (`explorations/compile-ladder/`), gone" did not resolve; now full paths, both deleted in ab067d9b6 (`git log --diff-filter=D`). Notes now state the failure (`StackOverflowError`), from the old line's capture. Dropped: the full checker message text; home: history, row 372.

## 407: rewrite
P, P, P, P, F, P. Ownership: commit 96b92dba9 left an unapplied walk repair (`BuildEnvironments.java`) and a test, `explorations/perf-probes/self-type-idiom/self-type-idiom.patch` (read its stat and hunks); a worker needs it, now cited. Lines `FType.java:209`, `:288-294` and `SymbolicType.java:80` read the same at the base, pinned at c124c6b65. Dropped: "A self-typed trait needs no such clause on the compiled path (P-146)" for length; home: POSITIONS P-146 and history, row 407. Related, not the same defect: row 879 (CONTESTED, the checker's reading of such a clause). Silent: defect.

## 487: rewrite
P, F, P, P, P, P. Present meaning: "`everyKnownSubtypeListed` (`TypeHierarchyChecker.scala:313-325`)": the function is now `:405-415`. XXX test gated green under a12ab5c60. FACTS F-29, F-76, F-171, F-175 and POSITIONS line 41 agree (the record-says-fixed signals are false: each states the hole open). No fact dropped.

## 489: rewrite
P, F, P, P, P, P. "`TypeHierarchyChecker.scala:321-322` checks the extender against `subst_comprises` (`:237-240`)": now the check is `:333` and `subst_comprises` `:327` (read at the base; touched by 396e4ed8d's where-clause work). The `XXX` compile test asserts today's wrong refusal and is gated. No fact dropped.

## 490: rewrite
P, F, P, P, P, P. "`TypeHierarchyChecker.scala:317`": the name match is at `:410`. Siblings gain 487 (FACTS F-171 names the three together). Dropped: "with row 489's repair" in the fix sentence, for length; home: row 489.

## 551: rewrite
P, F, P, P, F, P. Present meaning: "`checkComprisesClauses` skips another unit's clause (`BuildEnvironments.java:1191`)": the skip is `ComprisesCheck.check`'s `h.unit != main` at `:1303` (read at the base). Ownership: "Main component's half fixed `7ed2a8387` (climb batch 9, rung K)" a batch story; now "Main's clauses are checked (`7ed2a8387`)". Row 22 is DUPLICATE, its program stays as a fact. No fact dropped.

## 595: rewrite
P, F, F, P, P, P. Present meaning: `Reflect.fss:304` and `:20-22` are now `:305` and `:21-23`. Evidence: the reproducer named a report, not a test or probe; now `none`, the report's section 5 and its 'BREACH same Reflect.Reflect extends Reflect.Type' line in the notes (`REPORT.md:184`). Dropped: "since its closure check reads only the main component's clauses" (it is row 551's claim, which the line names).

## 596: rewrite
P, F, F, P, P, P. Present meaning: "`Library/FortressLibrary.fss:377-378`" now reads `opr ^`; `Number`'s clause is `:380-381`. Evidence: reproducer a report; now `none`, the report's 'BREACH cross' lines (`REPORT.md:187-189`) in the notes. Dropped: "nor does the specification's prose (`Specification/basic-lib/numbers.tex`)" for length; home: history, row 596. The demos' lines hold `Exception` (the script's "moved" looked for `Number`).

## 597: rewrite
P, P, P, P, F, P. Ownership: "The checker's half is fixed by `aa07efb31` (climb batch 10, rung C)" a batch story; the checker's refusal now cited by function (`checkObjectExprComprises`, `TypeHierarchyChecker.scala:64`, `:73`), the test that asserts it (`compiler_tests/XXXObjectExpressionUnlistedExtender.test`, `compile_err_contains`, read) and its guard; walk's check pinned at `BuildEnvironments.java:1299-1313`. No fact dropped.

## 598: rewrite
P, P, P, F, P, P. Comprehension: no mechanism with a pinned line for walk; now `ComprisesCheck.check` (`BuildEnvironments.java:1299-1313`) checks extenders against the list only. "Rung K's report argues" now "The report argues". No fact dropped.

## Beyond the evidence
Read at the base: `TypeHierarchyChecker.scala` (199-200, 270-336, 386-415), `BuildEnvironments.java` (1160-1313), `FType.java` (200-296), `FortressLibrary.fss:379-386`, `Reflect.fss:305`, the two compiled `ObjectExpression*` tests and `XXXComprisesGenericRenamed.test`, commit 96b92dba9 and its patch's hunks, batch 13, 14, 19 records' refused notes, `rung-walk-load-check/REPORT.md` BREACH lines. `git diff c124c6b65 HEAD` over the source, library and test folders is empty, so the tree read is the base's.

No pairs, closes, duplicates or measures. mech.py: "MECH: 12 lines, 0 failing, every check passes."
