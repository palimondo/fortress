# Chunk c45, assessment (base c124c6b65)

Marks: scope / present meaning / evidence / comprehension / ownership / consistency.

## 268 — rewrite
- scope pass; present meaning pass (nine non-SXX `*Use.fss` counted in `transformer/`; `build.xml:1507` testsyntax, `:1564` testNightly hold); evidence pass; comprehension FAIL: "`Syntax.rats:85-92`" is ambiguous (two `Syntax.rats` in the tree; `parser/Syntax.rats` holds the cited productions, checked at 85-92, 148-153, 186-199); ownership pass; consistency pass.
- Change: `parser/Syntax.rats`, the build.xml pin moved to c124c6b65 (lines unchanged since 63e420a33), the glob tokens (`*Use.fss`, `b_Syntax*Use.out`) written as plain words or one real history path, since the mechanical check reads them as paths. Dropped: the glob of outputs (home: history, row 268; the parent of 7c3218956 holds them). The `Use.fss`/`Use.out` "gone" signals are glob fragments, not paths. repro-promoted signal: the file was renamed out of `static_tests/XXX…` in 25064af74; it still fails to parse per the row and is not run by any suite, as the claim says.

## 271 — keep
- all pass. `ProjectFortress/syntax_abstraction_tests/For.fsi` exists; the probes' old paths and commits are in the notes, as the template allows for `none`. No pinned mechanism line exists to give (design limit; the diagnostic is quoted).

## 275 — keep
- all pass. `TemplateVarRewriter.java` 122-147 with the `Unrecognized constructor name` throw at 145, and `Transform.java` 752-762 with `// Nothing else implemented yet` at 760, both hold at the base (read in the tree).

## 291 — rewrite
- present meaning FAIL: "`STypesUtil.scala:1991`" (now a comment; `assertAfterTypeChecking` at :2150, its `OutAfterTypeChecking` test :2154) and "`TypeWellFormedChecker.scala:144`" (the `SVarType` "Unbound type" error is now :252); comprehension FAIL: "`StaticChecker.java`" ambiguous with the checker-count shadow copy. StaticChecker :264 (assertAfterTypeChecking call) and :126 (checkCompilationUnit) hold; `TypeCheckPhase.java:43` holds; no `TemplateGap`/`_SyntaxTransformation` under `scala_src/typechecker/` (grep). Other checks pass.
- Read beyond evidence: the four source files above.
- Dropped: "Repair: see `explorations/reviews/template-checking-plan.md`" (repair design, and needed for the 700 limit). Home: the history's old line, and INDEX.md lists the plan.
- The claim's failure is not re-run; the cited checker code is the same mechanism at new lines, so the gap stands by reading. Commits since (export and overloading checks) do not add template cases.

## 702 — keep
- all pass; every citation holds, FACTS entry agrees.

## 67 — keep
- all pass. `bin/fortress:28-29` still sets `-Xmx256m  -Xss32m` when `JAVA_FLAGS` is empty; FACTS.md:161 agrees.

## 119 — keep
- all pass. `DesugarerVisitor.java:1547` and `:1565-1569` (the qualified `FortressLibrary.true`) unchanged since the row; efd6bb2f2 touched the file elsewhere.

## 121 — keep
- all pass. `OtherDecl.rats:117` holds; FACTS.md:269 agrees.

## 123 — rewrite
- evidence/comprehension FAIL (incomplete): the row says TestSuite is absent "under any spelling" in FortressLibrary, true, but omits that the team's draft declares `test object TestSuite(testFunctions = {})` at `Library/incomplete/basic/Fortress.Standard.fss:52` and `.fsi:92`, which no build reads (grep of build.xml files: no `incomplete`; no other file names `Fortress.Standard` as an import). A worker restoring it needs that.
- Change: one sentence added. Nothing dropped.

## 532 — rewrite
- present meaning FAIL: "the comparison runners' 600-second limit" names runners that are gone (`walk-pass.sh`, the rungs' copies); the live runner is `explorations/coordinator/tools/count-run/count-run.sh:57` (`timeout -k 10 600`), which the gate reference names for comparisons. Notes FAIL the no-story check: "Rung V's three passes", "base A", "the skeptic's base and edit", "Rung E's passes". Reproducer: the gated walk test (newest gate a12ab5c60 holds), which is the test the claim times; kept.
- Dropped: rung and skeptic names and the A/B labels (story); `walk-pass.sh` (gone). Home: history, row 532; the two REPORT.md files, which exist at the base and keep the passes.

## 745 — keep
- all pass. `Library/Set.fss:124:46` is a line:column (the `UNION` of `join`), unchanged since the row; no commit since touches Set.fss. `ant testSystem` runs four shards (tests-running.md), so the gate does not run the folder in one JVM and has not measured this claim; the command is in the notes. `SystemJUTest` is a Java class, not a test file; `testFile.txt` is a file the run writes. NEGATIVE-BOUNDED with "Mechanism not traced" is right.

## 757 — rewrite
- evidence FAIL: no pinned mechanism ("By reading, the typecheck's entry ... lets the compile take the file as done"); notes carry "since rung A" (story); `old-fortress.sh` unqualified.
- Read beyond evidence: `repository/GraphRepository.java` 243-294, 359-370, 609-649: a component's cached analysis is taken when its date is no older than the source (:283), and `isStale` (:614) compares source and cache dates only; no jar check. Also `Shell.java` 942-1010.
- Change: pinned the mechanism, by reading; full tool path; "the probe was never committed". Dropped: "and since rung A" (story; home: history row 757). Claim's meaning unchanged; the placeholder `P.fss` spellings and cache-folder tokens are written as plain words so they are not read as paths, and the probe's unrecorded name is unquoted.

mech.py's last line: `MECH: 5 lines, 0 failing, every check passes.`
