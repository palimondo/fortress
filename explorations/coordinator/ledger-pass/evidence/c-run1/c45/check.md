# Chunk c45, check (base c124c6b65)

mech.py: `MECH: 5 lines, 0 failing, every check passes.` Cited lines below were read with `git show c124c6b65:<path>`.

## 268, rewrite: FAIL (2)
Fidelity holds otherwise: eleven `*Use.fss` in `transformer/`, two `SXX`, nine others; `SyntaxHelloWorld.fsi:18` and `SyntaxTest.fsi:20` read `Expr |Expr:=`; `parser/Syntax.rats` is the cited grammar; `SyntaxAbstractionJUTestAll.java:36,39` list the top directory only; `build.xml:1507` `testsyntax`, reached only from `:1564` `testNightly`; `git show 7c3218956^:explorations/apl-probes/existing-tests/b_SyntaxHelloWorldUse.out` prints `SyntaxHelloWorld.fsi:18:11: Syntax Error`. Dropped tokens: `63e420a33` (pin moved, lines unchanged), the globs and `Use.fss`/`Use.out` (fragments, not paths), `Syntax.rats` (now `parser/Syntax.rats`): all kept or have a home (history, row 268).
1. Passage: "so a green suite says nothing of syntax abstraction". Source: `.claude/skills/fortress-repo/references/tests-running.md:80` (the misc track runs `syntax_abstraction_tests/ForUse.fss`'s phases), as the cold read found. It overclaims. Correction: "so no gated suite runs them".
2. Passage: "beside two `SXX` expected failures". Cold read could not resolve `SXX`, and a worker would also stumble on it. Source: `SyntaxAbstractionJUTestAll.java:40-41` (`filename.contains("SXX")` → `assertFails`). Correction: "beside the two `SXX` files that the lister below expects to fail". With both corrections the notes are 691 of 700.

## 271, keep: pass
`For.fsi` exists; probes from history; no commit touches the cited files.

## 275, keep: pass
`TemplateVarRewriter.java:145` throws `Unrecognized constructor name`; `Transform.java:760` reads `// Nothing else implemented yet`.

## 291, rewrite: pass
`STypesUtil.scala:2150` is `def assertAfterTypeChecking` (its walker tests `OutAfterTypeChecking` at :2154); `compiler/StaticChecker.java:264` calls it, `:126` calls `checkCompilationUnit`; `TypeCheckPhase.java:43` calls `checkApis`; `TypeWellFormedChecker.scala:252` is the `SVarType` `Unbound type` error; `git grep TemplateGap|_SyntaxTransformation` under `scala_src/typechecker/` finds nothing. Dropped tokens: `STypesUtil.scala:1991` and `TypeWellFormedChecker.scala:144` (false at the base, now :2150 and :252), `StaticChecker.java`/`:264` (now a full path), `explorations/reviews/template-checking-plan.md` (repair design; home: history, row 291, and INDEX.md). Cold-read items (template vs generic template, "No import fixes it", rows 270/282/285) can be resolved from the `<[ … ]>` in the notes and from those rows; none blocks a worker.

## 702, keep: pass
`RatsUtil.java:138-145` calls `IOUtil.createAndMarkTempDirectory`; env.sh and harness-one.sh citations hold.

## 67, keep: pass
`bin/fortress:28-29` sets `-Xmx256m  -Xss32m` when `JAVA_FLAGS` is empty; FACTS.md:161 agrees.

## 119, keep: pass
`DesugarerVisitor.java:1547` is `translateEnsures`; `:1565-1569` builds `makeVarRef(..., fortressLibrary(), "true")`. efd6bb2f2 does not move these lines.

## 121, keep: pass
`OtherDecl.rats:117` holds the `TestDecl ::= test w Id w [ ... ]` production; FACTS.md:269 agrees.

## 123, rewrite: FAIL (1)
`Fortress.Standard.fss:52` and `.fsi:92` read `test object TestSuite(testFunctions = {})`; no build file or other component names `Fortress.Standard`; `TestSuite` appears nowhere in `Library/`, `ProjectFortress/LibraryBuiltin/` or `CompilerLibrary/` outside `Library/incomplete/`. Nothing dropped.
1. Passage: "Not in `Library/FortressLibrary.fss` under any spelling". The row names no path (fortress-repo SKILL.md: a row says which paths show the defect), and the cold read flagged this. Source: `git grep TestSuite c124c6b65 -- CompilerLibrary ProjectFortress/LibraryBuiltin` finds nothing. Correction: "Not in `Library/FortressLibrary.fss` under any spelling, nor in the compiled path's `CompilerLibrary/`; the error is walk's."

## 532, rewrite: FAIL (2)
`count-run.sh:57` holds `timeout -k 10 600`; `rung-rr32-sibling/REPORT.md` section 7 item 6 holds the 581/173/600-cut/261 s runs; `rung-size-range/REPORT.md` section 11 has both QuickCheck tests cut in all three passes and exiting 0 when run to the end. Dropped tokens: `walk-pass.sh` (gone; home: history and that REPORT.md), `ReflectiveQuickCheckTest` (still in the claim and reproducer).
1. Present/fidelity. Passage: "Workaround: a longer limit, or list both with the load-sensitive tests." Both tests have been listed since 89c32f0b5, in `explorations/coordinator/tools/count-run/unstable.txt:9-10`, and `compare-normalised.py:165-171` reports an `rc` change of a listed test as UNSTABLE, not changed. The cold read could not find the list. Correction, the whole notes (700 of 700): "The limit: `explorations/coordinator/tools/count-run/count-run.sh:57` (`timeout -k 10 600`) at c124c6b65. At 600 s: 581 s and 173 s on one tree; cut at a one-minute load near 24, then 261 s, `rc=0`, the same output; 146 s and 148 s side by side, the same output (`explorations/compile-ladder/rung-rr32-sibling/REPORT.md`, section 7, changed output 6). `QuickCheckTest` too: cut in three passes, both exit 0 run to the end (`explorations/compile-ladder/rung-size-range/REPORT.md`, section 11). Both are in `count-run/unstable.txt`, which `compare-normalised.py` masks as UNSTABLE; the cut loses the output. Workaround: a longer limit. Captures in the parent of `ab067d9b6`; full text: history, row 532"
2. Form. Passage, found by: "climb batch 6.5b rung V's skeptic". The ledger template (`explorations/fortress-gap-ledger.md:24`) says found by has "no date and no role", and "skeptic" is a role. Correction: "climb batch 6.5b rung V".

## 745, keep: pass
`Library/Set.fss:124:46` is a line:column and has not moved; the commits listed against the tests folder (natives, the load check of array/number operators, codegen) do not touch Set.fss or the `CUP` overloads. NEGATIVE-BOUNDED with "Mechanism not traced" stands.

## 757, rewrite: FAIL (2)
`GraphRepository.java:283` (`if (cache_date >= getComponentFileDate(node))`, then loads the cached component) holds. Dropped tokens: the placeholder `P.fss`/`fortress ... P` spellings (still in the claim as `P`), `SkTcThenCompile.*` (the probe, still named, uncommitted), cache folders (still named as words), `old-fortress.sh` (now its full path): all kept.
1. Fidelity. Passage: "and `isStale` (`:614`) compares only those dates, never the jar". Source: `GraphRepository.java:614-616`: `stale1` compares `youngestSourceDependedOn` (the node's own and its dependencies' sources) with the cache date, and `stale2 = foreignChange.contains(node)`. "Only those dates" claims more than the code shows. Correction: "and `isStale` (`:614`) compares source dates, its dependencies' included, with the cache's and checks a foreign change, never the jar".
2. Form. Passage, found by: "climb batch 17 rung A's skeptic". Source: ledger template line 24, "no date and no role". Correction: "climb batch 17 rung A".

## Closes, duplicates, questions, pairs
None in the chunk; `questions.md` says none is needed, which holds: no row's reproducer is an XXX test, and the claims stand by reading.
